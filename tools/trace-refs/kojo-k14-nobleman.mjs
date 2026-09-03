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
          /^\s*@EVENTTRAIN\s*$\n^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;初調教時 CFLAG:201\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF CFLAG:201 == 0\s*$\n^\s*DRAWLINE\s*$/m,
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
          /^\s*IF CFLAG:201 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*;男魔族\s*$\n^\s*IF TALENT:TARGET:122 && TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 经过多次改造后，%SAVESTR:TARGET%转生成为魔族了。\s*$\n^\s*PRINTFORMW %NAME:MASTER%前来看看情况，就看到%SAVESTR:TARGET%一脸焦虑地烦恼着发生在自己身上的事。\s*$\n^\s*PRINTFORMW （这种不可言喻的感觉…，啊！！这…这难道就是…暗之魔力…吗！！？）\s*$\n^\s*PRINTFORMW 「啊…魔、魔王大人…，嗯唔…！？魔…魔王…！！！不…！%SELF_CALL\(TARGET\)%是不会对你…！？啊…这…这绝对不可能…，我竟然会对你…！」\s*$\n^\s*PRINTFORMW 成为魔族了的%SAVESTR:TARGET%，想要发泄对于转生成魔族的怨恨。\s*$\n^\s*PRINTFORMW 但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0\s*$\n^\s*PRINTFORMW 经过多次改造后完全成为魔族的%SAVESTR:TARGET%对自己的模样感到绝望…\s*$\n^\s*PRINTFORMW 注意到来到房间了的你，不知所措地看着你。\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！！赶快把%SELF_CALL\(TARGET\)%的身体…，彻彻底底的变回去…！」\s*$\n^\s*PRINTFORMW 成为魔族的%SELF_CALL\(TARGET\)%，已经开始从本能上感觉到无法违抗身为魔族之王的你了………\s*$\n^\s*;魔族スイッチ２\s*$\n^\s*CFLAG:370 = 2\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$\n^\s*IF TALENT:85 \|\| TALENT:76\s*$\n^\s*;愛・淫乱\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「还…还真是抱歉呢…，因为%SELF_CALL\(TARGET\)%我…好像有点太容易就败给诱惑了呢…」\s*$\n^\s*;NTRスイッチ解除\s*$\n^\s*CFLAG:650 = 0\s*$\n^\s*ELSE\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「嗛…怎么又是你啊…！」\s*$/m,
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
        ref: '123-124',
        any: [
          /^\s*;愛・淫乱\s*$\n^\s*DRAWLINE\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「可恶的…魔王…！%SELF_CALL\(TARGET\)%是绝对不会输给你的…也不会顺从你的！！」\s*$\n^\s*CFLAG:201 = 2\s*$\n^\s*RETURN 1\s*$\n^\s*;屈服刻印Lv2\s*$\n^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「啊…，这种快乐而且微妙的感觉…真的是好棒啊…，但…但是…」\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:201 = 3\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「抱歉了…大家…，因为%SELF_CALL\(TARGET\)%已经…已经快要…」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「像这种舒适的快感…，%SELF_CALL\(TARGET\)%感觉到…好像已经、已经完全的要沦陷成为真正的女人了啊…」\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:201 = 4\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*;通常\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:201 = 5\s*$/m,
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
          /^\s*;淫乱\+魔族化\s*$\n^\s*;ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1\s*$\n^\s*;	DRAWLINE\s*$\n^\s*;	IF TALENT:TARGET:122\s*$\n^\s*;		;調教前から魔族\s*$\n^\s*;		IF CFLAG:370 == 1\s*$\n^\s*;			PRINTFORMW\s*$\n^\s*;			PRINTFORMW\s*$\n^\s*;			PRINTFORMW\s*$\n^\s*;			PRINTFORMW\s*$/m,
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
          /^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$\n^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽可能的帮上魔王大人的忙…想要在呆我所尊敬的魔王大人身边、支持着您…可以吗…！？」\s*$\n^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$\n^\s*PRINTFORMW 「好的…，那么就如魔王大人所愿。。。」\s*$\n^\s*PRINTFORMW 套弄抚摸着%SAVESTR:TARGET%已经勃起了的阴茎、你脸上浮现了扭曲的笑容…\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$/m,
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
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「魔…魔王大人…，%SELF_CALL\(TARGET\)%…，已经绝对不会再反抗您了。所…所以…」\s*$\n^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、想要尽自己全部的能力帮助魔王大人…，所以…我为了尊敬的魔王大人、不管是什么事情我都愿意去做！」\s*$\n^\s*PRINTFORMW 「就连这副身体…也请随便使用吧…、啊…！但是…像%SELF_CALL\(TARGET\)%这样原来是男人的女人…真的能接受么…？」\s*$\n^\s*PRINTFORMW 你听了%SAVESTR:TARGET%的愿望之后、向他传达了既然如此今后就好好侍奉的意思…\s*$\n^\s*PRINTFORMW 「好的…如魔王大人所愿%UNICODE\(0x2661\) \*1%」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、因为想被魔王大人夺走…所以有在好好的为您保存着呢哦…%UNICODE\(0x2661\) \*1%」\s*$\n^\s*PRINTFORMW 爱抚着满心欢喜的%SAVESTR:TARGET%的雌性身体、你脸上浮现了扭曲的笑容…\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「所以说不管是什么样的命令…%SAVESTR:TARGET%全部都会、按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '272-308',
        any: [
          /^\s*IF TALENT:TARGET:122\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「所以说不管是什么样的命令…%SAVESTR:TARGET%全部都会、按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…%UNICODE\(0x2661\) \*1%」\s*$\n^\s*PRINTFORMW 不久前还叫嚣着要讨灭你的男冒险者、现在完全转生成了誓死效忠你的魔族了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '274-284',
        any: [
          /^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「所以说不管是什么样的命令…%SAVESTR:TARGET%全部都会、按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%已经开发完全的菊穴、也请魔王大人毫不客气的使用吧…%UNICODE\(0x2661\) \*1%」\s*$\n^\s*PRINTFORMW 不久前还叫嚣着要讨灭你的男冒险者、现在完全转生成了誓死效忠你的魔族了。\s*$\n^\s*PRINTFORMW 你抱紧了%SAVESTR:TARGET%的身体、脸上浮现扭曲的笑容…\s*$\n^\s*CFLAG:201 = 8\s*$/m,
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
          /^\s*ELSEIF CFLAG:370 == 2\s*$\n^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$\n^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$\n^\s*SIF TALENT:TARGET:77 == 1\s*$\n^\s*PRINTFORMW 「所以也请魔王大人来更多的使用、%SAVESTR:TARGET%那已经开发完全的菊穴…！」\s*$\n^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$\n^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$\n^\s*CFLAG:201 = 8\s*$/m,
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
        ref: '292-298',
        any: [
          /^\s*PRINTFORMW 「所以也请魔王大人来更多的使用、%SAVESTR:TARGET%那已经开发完全的菊穴…！」\s*$\n^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$\n^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$\n^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$\n^\s*;陥落後に魔族\s*$\n^\s*ELSE\s*$/m,
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
          /^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*;調教前から魔族\s*$\n^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…%UNICODE\(0x2661\) \*1%」\s*$\n^\s*PRINTFORMW あなたの目の前でうっとりとした表情で跪く女性が、少し前まであなたに刃を向けようとしていた男勇者とは誰も思わないだろう。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '312-322',
        any: [
          /^\s*IF CFLAG:370 == 1\s*$\n^\s*PRINTFORMW 「啊啊…魔王大人…，之所以把%SELF_CALL\(TARGET\)%转化成了魔族的原因、其实就是为了这个对吧…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%正带着温柔的表情跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「伟大的魔王大人啊…，%SELF_CALL\(TARGET\)%我…，已经完全的接受了身为魔族的一切了哦…，并且…会永远…与您相伴到最后的…」\s*$\n^\s*PRINTFORMW 「按照魔王大人所愿去做的…」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、可是为了献给魔王大人…才一直留到现在的哦…%UNICODE\(0x2661\) \*1%」\s*$\n^\s*PRINTFORMW あなたの目の前でうっとりとした表情で跪く女性が、少し前まであなたに刃を向けようとしていた男勇者とは誰も思わないだろう。\s*$\n^\s*PRINTFORMW 你抱紧了%SAVESTR:TARGET%的身体、脸上浮现扭曲的笑容…\s*$\n^\s*CFLAG:201 = 8\s*$/m,
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
          /^\s*ELSEIF CFLAG:370 == 2\s*$\n^\s*PRINTFORMW 「嗯…？啊…！魔…魔王大人…！！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…」\s*$\n^\s*PRINTFORMW 你进入房间的时候、%SAVESTR:TARGET%虽然还有点迷茫、但还是跪在地上迎接你的到来。\s*$\n^\s*PRINTFORMW 「嗯…，伟大的魔王大人啊…%SELF_CALL\(TARGET\)%从现在开始再也不会迷茫了…因为我已经完全的接受了身为魔族的一切了、所以我愿时刻陪伴在您左右」\s*$\n^\s*PRINTFORMW 「所以…就对%SELF_CALL_FIRST\(TARGET\)%、对%SELF_CALL\(TARGET\)%…，更加的…更加多的来疼爱我吧…！」\s*$\n^\s*SIF TALENT:TARGET:0 == 1\s*$\n^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」\s*$\n^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$\n^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$\n^\s*CFLAG:201 = 8\s*$/m,
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
        ref: '330-336',
        any: [
          /^\s*PRINTFORMW 「%SAVESTR:TARGET%的『第一次』、如果不是魔王大人的话…那可是绝对不允许的哦…！！」\s*$\n^\s*PRINTFORMW 你、轻轻地抱住了几乎要哭出来的%SAVESTR:TARGET%。\s*$\n^\s*PRINTFORMW 从调教的结果来看、%SAVESTR:TARGET%似乎对你产生了爱慕之情…\s*$\n^\s*CFLAG:201 = 8\s*$\n^\s*RETURN 1\s*$\n^\s*;陥落後に魔族\s*$\n^\s*ELSE\s*$/m,
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
          /^\s*;崩壊\s*$\n^\s*;ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\s*$\n^\s*;	DRAWLINE\s*$\n^\s*;	PRINTFORMW\s*$\n^\s*;	PRINTFORMW\s*$\n^\s*;	PRINTFORMW\s*$\n^\s*;	CFLAG:201 = 9\s*$\n^\s*;	RETURN 1\s*$/m,
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
        ref: '418-419',
        any: [
          /^\s*;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\s*$\n^\s*ELSE\s*$/m,
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
          /^\s*@K14_KOJO2\s*$\n^\s*;反発刻印Lv3\s*$\n^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「去死一死吧！！你这个又脏又可恶的魔王！！」\s*$\n^\s*RETURN 1\s*$\n^\s*;屈服刻印Lv0\s*$\n^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*PRINTFORMW 「不…不要在过来了！！快住手啊！！！」\s*$/m,
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
          /^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「呃…，今天也要继续做那种事情啊…！？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「咕呜…！我…我是不可能就这么轻易的输给快感的…！但…但是…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「我明白了…，那么你想干什么就随你喜欢好了…」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「既然…我已经没有办法再次变回男人的话…，那么…！魔…魔王大人…！就请您再给%SELF_CALL\(TARGET\)%、传授更多的快乐吧…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊~，魔王大人~，%SELF_CALL\(TARGET\)%啊…，一直都在这里等待着您的到来呢~」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW 「那么…魔王大人？今天的话…您打算对我做什么事情呢~？」\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW 「嗯…，我已经等您好久了呢~♪」\s*$\n^\s*ENDIF\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW 「就按照魔王大人想做的…，来进行调教吧…」\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '482-494',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$\n^\s*DRAWLINE\s*$\n^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW 「啊…！魔…魔王大人…！！您来了啊！！好开心呢…」\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW 「就按照魔王大人想做的…，来进行调教吧…」\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW 「如果是魔王大人的话…，不管是对我做什么都是可以的哦…」\s*$\n^\s*ENDIF\s*$/m,
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
          /^\s*@EVENTEND\s*$\n^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;キャラ死亡時は口上をスキップ\s*$\n^\s*SIF BASE:0 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*;--------------------------------------------------\s*$\n^\s*;調教終了時のセリフ\s*$/m,
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
          /^\s*SIF FLAG:7 <= 0\s*$\n^\s*RETURN 0\s*$\n^\s*SIF TALENT:174 != 1\s*$\n^\s*RETURN 0\s*$\n^\s*;キャラ死亡時は口上をスキップ\s*$\n^\s*SIF BASE:0 <= 0\s*$\n^\s*RETURN 0\s*$/m,
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
          /^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「哈啊…嗯…，结…结束了么…？」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「哈…呀啊…，这…这种快乐…、总觉得…要上瘾了啊…，咿嗯…！？%SELF_CALL\(TARGET\)%…！到底在说什么呢…！！」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$\n^\s*DRAWLINE\s*$\n^\s*IF TALENT:TARGET:122\s*$\n^\s*PRINTFORMW 「请…请放过我吧…！！」\s*$\n^\s*;性転換済み\s*$\n^\s*ELSEIF CFLAG:TARGET:70 && TALENT:TARGET:122 == 0\s*$\n^\s*PRINTFORMW 「呼啊…啊哈哈…，这种感觉…真的…，好棒呢…哈啊…」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW 「哈…！？只是这样就结束了么…！？喂…，魔王大人啊，不带你这个样子的吧…？」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW 「啊呜…哈啊…嗯…，%SELF_CALL\(TARGET\)%…，感觉…真的是太满足了呢~」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 1\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「已经结束了么…？啊…我明白了…」\s*$\n^\s*ELSEIF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「已经结束了么…？明明还想要更多的再亲爱一会的说…」\s*$\n^\s*ELSE\s*$/m,
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
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！%UNICODE\(0x2661\) \*1%」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '583-597',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$\n^\s*DRAWLINE\s*$\n^\s*;魔族\s*$\n^\s*IF TALENT:TARGET:314 == 9 && TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:122 == 1\s*$\n^\s*PRINTFORMW 「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\s*$\n^\s*ELSEIF TALENT:TARGET:314 == 9\s*$\n^\s*PRINTFORMW 「啊…嗯哼~，像这个样子来疼爱我…还真的是感谢了呢~！那么…明天也要继续来才行哦…！%UNICODE\(0x2661\) \*1%」\s*$\n^\s*ELSE\s*$/m,
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
          /^\s*@KOJO_MESSAGE_COM_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする\s*$\n^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\n^\s*RETURN 0\s*$\n^\s*;失神時には口上をスキップする\s*$\n^\s*SIF TFLAG:899\s*$\n^\s*RETURN 0\s*$/m,
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
        ref: '608-609',
        any: [
          /^\s*SIF TEQUIP:45 && SELECTCOM != 45\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '612-613',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;獣姦プレイ中は専用口上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '614',
        any: [
          /^\s*IF TEQUIP:89\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '615',
        any: [
          /^\s*CALL DOG_KOJO_14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '615-616',
        any: [
          /^\s*CALL DOG_KOJO_14\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '617-618',
        any: [
          /^\s*ENDIF\s*$\n^\s*;コロシアム中は専用口上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '619',
        any: [
          /^\s*IF TEQUIP:55\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '620',
        any: [
          /^\s*CALL COLOSSEUM_KOJO_14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '620-621',
        any: [
          /^\s*CALL COLOSSEUM_KOJO_14\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '620-622',
        any: [
          /^\s*CALL COLOSSEUM_KOJO_14\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '630',
        any: [
          /^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '632',
        any: [
          /^\s*IF CFLAG:301 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '634',
        any: [
          /^\s*IF MARK:2 >= 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '635',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '637-645',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:301 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '638',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '639-645',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:301 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '640',
        any: [
          /^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '641-645',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '643-645',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '645',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '646',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '647',
        any: [
          /^\s*CFLAG:301 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '649',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '650',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '651',
        any: [
          /^\s*CFLAG:301 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '653',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '654',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '655',
        any: [
          /^\s*CFLAG:301 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '657',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '658',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '659',
        any: [
          /^\s*CFLAG:301 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '661',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '662',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '663',
        any: [
          /^\s*CFLAG:301 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '664-670',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '665-670',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '666-670',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '667-670',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '673',
        any: [
          /^\s*IF SELECTCOM == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '675',
        any: [
          /^\s*IF CFLAG:302 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '677',
        any: [
          /^\s*IF TALENT:TARGET:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '678',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '680-688',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:302 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '681',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '682-688',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:302 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '683',
        any: [
          /^\s*CFLAG:302 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '684-688',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '686-688',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '688',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '689',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '690',
        any: [
          /^\s*CFLAG:302 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '692',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '693',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '694',
        any: [
          /^\s*CFLAG:302 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '696',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '697',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '698',
        any: [
          /^\s*CFLAG:302 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '700',
        any: [
          /^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '701',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '702',
        any: [
          /^\s*CFLAG:302 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '703-709',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '704-709',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '705-709',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '706-709',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル愛撫 CFLAG:303\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '711',
        any: [
          /^\s*IF SELECTCOM == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '713',
        any: [
          /^\s*IF CFLAG:303 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '714',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '715',
        any: [
          /^\s*CFLAG:TARGET:303 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '715-716',
        any: [
          /^\s*CFLAG:TARGET:303 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '718-720',
        any: [
          /^\s*ELSE\s*$\n^\s*P = PALAM:3 \+ UP:3\s*$\n^\s*;淫乱\+潤滑Lv2以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '719',
        any: [
          /^\s*P = PALAM:3 \+ UP:3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '721',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '722',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '723',
        any: [
          /^\s*CFLAG:303 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '725',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '726',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '727',
        any: [
          /^\s*CFLAG:303 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '729',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '730',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '731',
        any: [
          /^\s*CFLAG:303 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '733',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '734',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '735',
        any: [
          /^\s*CFLAG:303 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '737',
        any: [
          /^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '738',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '739',
        any: [
          /^\s*CFLAG:303 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '741',
        any: [
          /^\s*ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '742',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '743',
        any: [
          /^\s*CFLAG:303 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '743-744',
        any: [
          /^\s*CFLAG:303 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '743-745',
        any: [
          /^\s*CFLAG:303 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '743-746',
        any: [
          /^\s*CFLAG:303 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '747-750',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;自慰 CFLAG304\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '752',
        any: [
          /^\s*IF SELECTCOM == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '754',
        any: [
          /^\s*IF CFLAG:304 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '755',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '756',
        any: [
          /^\s*CFLAG:TARGET:304 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '756-757',
        any: [
          /^\s*CFLAG:TARGET:304 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '759-760',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋処女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '761',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '762',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '763',
        any: [
          /^\s*CFLAG:304 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '765',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '767',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '768',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '769',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '770',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '771-774',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '772',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '773-774',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '774',
        any: [
          /^\s*CFLAG:304 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '776',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '778',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '779',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '780-783',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '781',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '782-783',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '783',
        any: [
          /^\s*CFLAG:304 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '785',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '786',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '787',
        any: [
          /^\s*CFLAG:304 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '789',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '791',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '792',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '793',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '794',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '795-798',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '796',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '797-798',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '798',
        any: [
          /^\s*CFLAG:304 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '800',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '802',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '803',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '804-807',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '805',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '806-807',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '807',
        any: [
          /^\s*CFLAG:304 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '809',
        any: [
          /^\s*ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '811',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '812',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '813-816',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '814',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '815-816',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '816',
        any: [
          /^\s*CFLAG:304 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '818',
        any: [
          /^\s*ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '820',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '821',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '822-825',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:304 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '823',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '824-825',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:304 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '825',
        any: [
          /^\s*CFLAG:304 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '825-826',
        any: [
          /^\s*CFLAG:304 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '825-827',
        any: [
          /^\s*CFLAG:304 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '825-828',
        any: [
          /^\s*CFLAG:304 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '829-832',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '835',
        any: [
          /^\s*IF SELECTCOM == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '837',
        any: [
          /^\s*IF CFLAG:306 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '839',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '840',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '842-850',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:306 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '843',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '844-850',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:306 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '845',
        any: [
          /^\s*CFLAG:TARGET:306 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '846-850',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '848-850',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '850',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '851',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '852',
        any: [
          /^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '854',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '855',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '856',
        any: [
          /^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '858',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '859',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '860',
        any: [
          /^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '862',
        any: [
          /^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '863',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '864',
        any: [
          /^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '865-871',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '866-871',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '867-871',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '868-871',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;キスする CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '873',
        any: [
          /^\s*IF SELECTCOM == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '875',
        any: [
          /^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '877',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '878',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '880',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '880-883',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '880-885',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '880-887',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:307 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '881',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '884',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '886',
        any: [
          /^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '889',
        any: [
          /^\s*ELSEIF CFLAG:307 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '891',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '892',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '894',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '895',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '897-905',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:307 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '898',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '899-905',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:307 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '900',
        any: [
          /^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '901-905',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '903-905',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '905',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '906',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '907',
        any: [
          /^\s*CFLAG:307 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '909',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '910',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '911',
        any: [
          /^\s*CFLAG:307 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '913',
        any: [
          /^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '914',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '915',
        any: [
          /^\s*CFLAG:307 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '917',
        any: [
          /^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '918',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '919',
        any: [
          /^\s*CFLAG:307 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '920-926',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '921-926',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '922-926',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '923-926',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;秘貝開帳 CFLAG:308\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '929',
        any: [
          /^\s*IF SELECTCOM == 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '931',
        any: [
          /^\s*IF CFLAG:308 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '933',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '934',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '936',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '937',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '939-942',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:308 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '940',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '941-942',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:308 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '942',
        any: [
          /^\s*CFLAG:TARGET:308 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '942-943',
        any: [
          /^\s*CFLAG:TARGET:308 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '945-947',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '947',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '948',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '949',
        any: [
          /^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '951',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '952',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '953',
        any: [
          /^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '955',
        any: [
          /^\s*ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '956',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '957',
        any: [
          /^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '958-962',
        any: [
          /^\s*;それ以外（愛無し、露出癖Lv3未満）\s*$\n^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:306 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '958-963',
        any: [
          /^\s*;それ以外（愛無し、露出癖Lv3未満）\s*$\n^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:306 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '959',
        any: [
          /^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '960',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '961',
        any: [
          /^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '964-968',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;指挿入れ CFLAG:309\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '965-968',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;指挿入れ CFLAG:309\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '971',
        any: [
          /^\s*IF SELECTCOM == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '973',
        any: [
          /^\s*IF CFLAG:TARGET:309 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '975',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '976',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '978',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '979',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '981-984',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '982',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '983-984',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '984',
        any: [
          /^\s*CFLAG:TARGET:309 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '984-985',
        any: [
          /^\s*CFLAG:TARGET:309 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '987-989',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '989',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '990',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '991',
        any: [
          /^\s*CFLAG:309 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '993',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '994',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '995',
        any: [
          /^\s*CFLAG:309 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '997',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '998',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '999',
        any: [
          /^\s*CFLAG:309 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1001',
        any: [
          /^\s*ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1002',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1003',
        any: [
          /^\s*CFLAG:309 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1003-1004',
        any: [
          /^\s*CFLAG:309 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1003-1005',
        any: [
          /^\s*CFLAG:309 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1003-1006',
        any: [
          /^\s*CFLAG:309 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1007-1010',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1012',
        any: [
          /^\s*IF SELECTCOM == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1014',
        any: [
          /^\s*IF CFLAG:310 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1016',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1017',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1019',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1020',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1022-1030',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:310 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1023',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1024-1030',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:310 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1025',
        any: [
          /^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1026-1030',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1028-1030',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1030',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1031',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1032',
        any: [
          /^\s*CFLAG:310 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1034',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1035',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1036',
        any: [
          /^\s*CFLAG:310 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1038',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1039',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1040',
        any: [
          /^\s*CFLAG:310 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1042',
        any: [
          /^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1043',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1044',
        any: [
          /^\s*CFLAG:310 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1045-1051',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1046-1051',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1047-1051',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1048-1051',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;ローター CFLAG:311\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1053',
        any: [
          /^\s*IF SELECTCOM == 10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1055',
        any: [
          /^\s*IF CFLAG:TARGET:311 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1057',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1058',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1060',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1061',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1063-1066',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1064',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1065-1066',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1066',
        any: [
          /^\s*CFLAG:TARGET:311 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1066-1067',
        any: [
          /^\s*CFLAG:TARGET:311 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1069-1071',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1071',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1072',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1073',
        any: [
          /^\s*CFLAG:311 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1075',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1076',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1077',
        any: [
          /^\s*CFLAG:311 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1079',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1080',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1081',
        any: [
          /^\s*CFLAG:311 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1083',
        any: [
          /^\s*ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1084',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1085',
        any: [
          /^\s*CFLAG:311 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1085-1086',
        any: [
          /^\s*CFLAG:311 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1085-1087',
        any: [
          /^\s*CFLAG:311 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1085-1088',
        any: [
          /^\s*CFLAG:311 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1085-1089',
        any: [
          /^\s*CFLAG:311 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1096',
        any: [
          /^\s*IF SELECTCOM == 11 && TEQUIP:11\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1098',
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1098-1108',
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1098-1110',
        any: [
          /^\s*IF CFLAG:TARGET:312 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1100',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1102',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1103',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1105',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1106',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1109',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1112-1124',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1114',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1115',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1117',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1118',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1120-1124',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1121',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1122-1124',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1123-1124',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1124',
        any: [
          /^\s*CFLAG:312 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1124-1125',
        any: [
          /^\s*CFLAG:312 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1127-1129',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1129',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1130',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1131',
        any: [
          /^\s*CFLAG:312 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1133',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1134',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1135',
        any: [
          /^\s*CFLAG:312 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1137',
        any: [
          /^\s*ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1138',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1139',
        any: [
          /^\s*CFLAG:312 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1141',
        any: [
          /^\s*ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1142',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1143',
        any: [
          /^\s*CFLAG:312 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1143-1144',
        any: [
          /^\s*CFLAG:312 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1143-1145',
        any: [
          /^\s*CFLAG:312 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1146-1148',
        any: [
          /^\s*ENDIF\s*$\n^\s*;脱着時\s*$\n^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1148',
        any: [
          /^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1150',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1151',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1152',
        any: [
          /^\s*CFLAG:372 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1154',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1155',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1156',
        any: [
          /^\s*CFLAG:372 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1158',
        any: [
          /^\s*ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1159',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1160',
        any: [
          /^\s*CFLAG:372 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1160-1161',
        any: [
          /^\s*CFLAG:372 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1160-1162',
        any: [
          /^\s*CFLAG:372 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1160-1163',
        any: [
          /^\s*CFLAG:372 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1168',
        any: [
          /^\s*IF SELECTCOM == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1170',
        any: [
          /^\s*IF CFLAG:313 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1172',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1173',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1175',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1176',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1178-1181',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:313 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1179',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1180-1181',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:313 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1181',
        any: [
          /^\s*CFLAG:313 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1181-1182',
        any: [
          /^\s*CFLAG:313 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1184-1186',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1186',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1187',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1188',
        any: [
          /^\s*CFLAG:313 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1190',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1191',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1192',
        any: [
          /^\s*CFLAG:313 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1194',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1195',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1196',
        any: [
          /^\s*CFLAG:313 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1198',
        any: [
          /^\s*ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1199',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1200',
        any: [
          /^\s*CFLAG:313 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1200-1201',
        any: [
          /^\s*CFLAG:313 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1200-1202',
        any: [
          /^\s*CFLAG:313 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1200-1203',
        any: [
          /^\s*CFLAG:313 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1200-1204',
        any: [
          /^\s*CFLAG:313 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1210',
        any: [
          /^\s*IF SELECTCOM == 13 && TEQUIP:13\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1212',
        any: [
          /^\s*IF CFLAG:TARGET:314 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1214',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1215',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1217',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1218',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1220-1223',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:314 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1221',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1222-1223',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:314 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1223',
        any: [
          /^\s*CFLAG:TARGET:314 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1223-1224',
        any: [
          /^\s*CFLAG:TARGET:314 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1226-1228',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1228',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1229',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1230',
        any: [
          /^\s*CFLAG:314 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1232',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1233',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1234',
        any: [
          /^\s*CFLAG:314 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1236',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1237',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1238',
        any: [
          /^\s*CFLAG:314 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1240',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1241',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1242',
        any: [
          /^\s*CFLAG:314 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1244',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1245',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1246',
        any: [
          /^\s*CFLAG:314 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1248',
        any: [
          /^\s*ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1249',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1250',
        any: [
          /^\s*CFLAG:314 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1250-1251',
        any: [
          /^\s*CFLAG:314 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1250-1252',
        any: [
          /^\s*CFLAG:314 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1253-1255',
        any: [
          /^\s*ENDIF\s*$\n^\s*;脱着時\s*$\n^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1255',
        any: [
          /^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1257',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1258',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1259',
        any: [
          /^\s*CFLAG:374 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1261',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1262',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1263',
        any: [
          /^\s*CFLAG:374 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1265',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1266',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1267',
        any: [
          /^\s*CFLAG:374 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1269',
        any: [
          /^\s*ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1270',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1271',
        any: [
          /^\s*CFLAG:374 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1271-1272',
        any: [
          /^\s*CFLAG:374 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1271-1273',
        any: [
          /^\s*CFLAG:374 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1271-1274',
        any: [
          /^\s*CFLAG:374 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1444',
        any: [
          /^\s*IF SELECTCOM == 17 && TEQUIP:17\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1446',
        any: [
          /^\s*IF CFLAG:318 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1448',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1449',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1451',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1452',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1454-1457',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:318 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1455',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1456-1457',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:318 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1457',
        any: [
          /^\s*CFLAG:318 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1457-1458',
        any: [
          /^\s*CFLAG:318 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1460-1462',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1462',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1463',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1464',
        any: [
          /^\s*CFLAG:318 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1466',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:318 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1467',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1468',
        any: [
          /^\s*CFLAG:318 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1470',
        any: [
          /^\s*ELSEIF CFLAG:318 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1471',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1472',
        any: [
          /^\s*CFLAG:318 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1472-1473',
        any: [
          /^\s*CFLAG:318 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1472-1474',
        any: [
          /^\s*CFLAG:318 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1475-1477',
        any: [
          /^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1477',
        any: [
          /^\s*ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1479',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:378 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1480',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1481',
        any: [
          /^\s*CFLAG:378 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1483',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:378 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1484',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1485',
        any: [
          /^\s*CFLAG:378 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1487',
        any: [
          /^\s*ELSEIF CFLAG:378 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1488',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1489',
        any: [
          /^\s*CFLAG:378 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1489-1490',
        any: [
          /^\s*CFLAG:378 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1489-1491',
        any: [
          /^\s*CFLAG:378 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1489-1492',
        any: [
          /^\s*CFLAG:378 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1498',
        any: [
          /^\s*IF SELECTCOM == 19 && TEQUIP:19\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1500',
        any: [
          /^\s*IF CFLAG:TARGET:320 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1502',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1503',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1505',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1506',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1508-1511',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:320 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1509',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1510-1511',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:320 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1511',
        any: [
          /^\s*CFLAG:TARGET:320 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1511-1512',
        any: [
          /^\s*CFLAG:TARGET:320 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1514-1516',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1516',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1517',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1518',
        any: [
          /^\s*CFLAG:320 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1520',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1521',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1522',
        any: [
          /^\s*CFLAG:320 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1524',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1525',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1526',
        any: [
          /^\s*CFLAG:320 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1528',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1529',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1530',
        any: [
          /^\s*CFLAG:320 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1532',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1533',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1534',
        any: [
          /^\s*CFLAG:320 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1536',
        any: [
          /^\s*ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1537',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1538',
        any: [
          /^\s*CFLAG:320 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1538-1539',
        any: [
          /^\s*CFLAG:320 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1538-1540',
        any: [
          /^\s*CFLAG:320 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1541-1543',
        any: [
          /^\s*ENDIF\s*$\n^\s*;脱着時\s*$\n^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1543',
        any: [
          /^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1545',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1546',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1547',
        any: [
          /^\s*CFLAG:379 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1549',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1550',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1551',
        any: [
          /^\s*CFLAG:379 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1553',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1554',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1555',
        any: [
          /^\s*CFLAG:379 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1557',
        any: [
          /^\s*ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1558',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1559',
        any: [
          /^\s*CFLAG:379 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1559-1560',
        any: [
          /^\s*CFLAG:379 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1559-1561',
        any: [
          /^\s*CFLAG:379 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1559-1562',
        any: [
          /^\s*CFLAG:379 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1568',
        any: [
          /^\s*IF SELECTCOM == 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1570',
        any: [
          /^\s*IF CFLAG:TARGET:321 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1572',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1574',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1575',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1577',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1577-1580',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1577-1582',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1577-1584',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;非処女\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1578',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1581',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1585',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1586',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1588',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1589',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1591-1595',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1592',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1593-1595',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1594-1595',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1595',
        any: [
          /^\s*CFLAG:321 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1595-1596',
        any: [
          /^\s*CFLAG:321 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1598-1600',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1600',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1601',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1602',
        any: [
          /^\s*CFLAG:321 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1604',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1605',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1606',
        any: [
          /^\s*CFLAG:321 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1608',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1609',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1610',
        any: [
          /^\s*CFLAG:321 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1612',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1613',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1614',
        any: [
          /^\s*CFLAG:321 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1616',
        any: [
          /^\s*ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1617',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1618',
        any: [
          /^\s*CFLAG:321 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1618-1619',
        any: [
          /^\s*CFLAG:321 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1618-1620',
        any: [
          /^\s*CFLAG:321 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1618-1621',
        any: [
          /^\s*CFLAG:321 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1622-1625',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1625-1641',
        any: [
          /^\s*;後背位 CFLAG:322\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;オトコ無し\s*$\n^\s*IF SELECTCOM == 21\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:322 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1625-1643',
        any: [
          /^\s*;後背位 CFLAG:322\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;オトコ無し\s*$\n^\s*IF SELECTCOM == 21\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:322 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1628',
        any: [
          /^\s*IF SELECTCOM == 21\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1630',
        any: [
          /^\s*IF CFLAG:TARGET:322 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1632',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1634',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1635',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1637',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1638',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1642',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1645-1662',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1647',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1648',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1650',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1651',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1653-1662',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1654',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1655-1662',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1656-1662',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1657',
        any: [
          /^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1658-1662',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1660-1662',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1662',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1662-1667',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1662-1669',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1662-1677',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 6\s*$\n^\s*;愛\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1662-1679',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 6\s*$\n^\s*;愛\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1663',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1664',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1665',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1666',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1668',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1670',
        any: [
          /^\s*CFLAG:322 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1672',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1673',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1674',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1675',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1676',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1678',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1680',
        any: [
          /^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1682',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1683',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1684',
        any: [
          /^\s*CFLAG:322 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1686',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1687',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1688',
        any: [
          /^\s*CFLAG:322 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1690',
        any: [
          /^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1691',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1693',
        any: [
          /^\s*CFLAG:322 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1694-1700',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1695-1700',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1696-1700',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1697-1700',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位 CFLAG:323\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1703',
        any: [
          /^\s*IF SELECTCOM == 22\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1704',
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1704-1714',
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1704-1716',
        any: [
          /^\s*IF CFLAG:TARGET:323 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1706',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1708',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1709',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1711',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1712',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1715',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1718-1730',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1720',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1721',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1723',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1724',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1726-1730',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1727',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1728-1730',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1729-1730',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1730',
        any: [
          /^\s*CFLAG:323 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1730-1731',
        any: [
          /^\s*CFLAG:323 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1733-1735',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1735',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1736',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1737',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1738',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1739',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1740-1743',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:323 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1741',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1742-1743',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:323 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1743',
        any: [
          /^\s*CFLAG:323 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1745',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1746',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1747',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1748',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1749',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1750-1753',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:323 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1751',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1752-1753',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:323 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1753',
        any: [
          /^\s*CFLAG:323 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1755',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1756',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1757',
        any: [
          /^\s*CFLAG:323 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1759',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1760',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1761',
        any: [
          /^\s*CFLAG:323 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1763',
        any: [
          /^\s*ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1764',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1765',
        any: [
          /^\s*CFLAG:323 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1765-1766',
        any: [
          /^\s*CFLAG:323 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1765-1767',
        any: [
          /^\s*CFLAG:323 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1765-1768',
        any: [
          /^\s*CFLAG:323 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1769-1772',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;背面座位 CFLAG:324\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1775',
        any: [
          /^\s*IF SELECTCOM == 23\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1776',
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1776-1786',
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1776-1788',
        any: [
          /^\s*IF CFLAG:TARGET:324 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1778',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1780',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1781',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1783',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1784',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1787',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1790-1802',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1792',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1793',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1795',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1796',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1798-1802',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1799',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1800-1802',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1801-1802',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1802',
        any: [
          /^\s*CFLAG:324 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1802-1803',
        any: [
          /^\s*CFLAG:324 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1805-1807',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1807',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1808',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1809',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1810',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1811',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1812-1815',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:324 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1813',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1814-1815',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:324 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1815',
        any: [
          /^\s*CFLAG:324 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1817',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1818',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1819',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1820',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1821',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1822-1825',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:324 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1823',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1824-1825',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:324 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1825',
        any: [
          /^\s*CFLAG:324 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1827',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1828',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1829',
        any: [
          /^\s*CFLAG:324 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1831',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1832',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1833',
        any: [
          /^\s*CFLAG:324 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1835',
        any: [
          /^\s*ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1836',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1837',
        any: [
          /^\s*CFLAG:324 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1837-1838',
        any: [
          /^\s*CFLAG:324 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1837-1839',
        any: [
          /^\s*CFLAG:324 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1837-1840',
        any: [
          /^\s*CFLAG:324 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1841-1844',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;正常位アナル CFLAG:327\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1846',
        any: [
          /^\s*IF SELECTCOM == 26\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1848',
        any: [
          /^\s*IF CFLAG:TARGET:327 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1850',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1851',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1853',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1854',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1856-1859',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:327 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1857',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1858-1859',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:327 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1859',
        any: [
          /^\s*CFLAG:TARGET:327 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1859-1860',
        any: [
          /^\s*CFLAG:TARGET:327 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1862-1864',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1864',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1865',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1866',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1867',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1868',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1869-1872',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:327 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1870',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1871-1872',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:327 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1872',
        any: [
          /^\s*CFLAG:327 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1874',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1875',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1876',
        any: [
          /^\s*CFLAG:327 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1878',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1878-1881',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1879',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1880',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1882',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1883-1884',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:327 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1884',
        any: [
          /^\s*CFLAG:327 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1886',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1887',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1888',
        any: [
          /^\s*CFLAG:327 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1890',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1891',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1892',
        any: [
          /^\s*CFLAG:327 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1894',
        any: [
          /^\s*ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1895',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1896',
        any: [
          /^\s*CFLAG:327 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1896-1897',
        any: [
          /^\s*CFLAG:327 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1896-1898',
        any: [
          /^\s*CFLAG:327 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1896-1899',
        any: [
          /^\s*CFLAG:327 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1900-1903',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1905',
        any: [
          /^\s*IF SELECTCOM == 27\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1907',
        any: [
          /^\s*IF CFLAG:TARGET:328 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1909',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1910',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1912',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1913',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1915-1923',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:328 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;愛＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1916',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1917-1923',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:328 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;愛＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1918',
        any: [
          /^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1919-1923',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;愛＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1921-1923',
        any: [
          /^\s*ELSE\s*$\n^\s*;愛＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1923',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1923-1926',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1923-1928',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1924',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1925',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1927',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1929',
        any: [
          /^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1931',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1932',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1933',
        any: [
          /^\s*CFLAG:328 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1935',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1936',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1937',
        any: [
          /^\s*CFLAG:328 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1939',
        any: [
          /^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1940',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1941',
        any: [
          /^\s*CFLAG:328 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1942-1948',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1943-1948',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1944-1948',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1945-1948',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;対面座位アナル CFLAG:329\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1950',
        any: [
          /^\s*IF SELECTCOM == 28\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1952',
        any: [
          /^\s*IF CFLAG:TARGET:329 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1954',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1955',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1957',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1958',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1960-1963',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:329 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1961',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1962-1963',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:329 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1963',
        any: [
          /^\s*CFLAG:TARGET:329 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1963-1964',
        any: [
          /^\s*CFLAG:TARGET:329 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1966-1968',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1968',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1969',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1970',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1971',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1972',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1973-1976',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:329 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1974',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1975-1976',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:329 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1976',
        any: [
          /^\s*CFLAG:329 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1978',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1979',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1980',
        any: [
          /^\s*CFLAG:329 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1982',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1982-1985',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1983',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1984',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1986',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1987-1988',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:329 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1988',
        any: [
          /^\s*CFLAG:329 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1990',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1991',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1992',
        any: [
          /^\s*CFLAG:329 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1994',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1995',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1996',
        any: [
          /^\s*CFLAG:329 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1998',
        any: [
          /^\s*ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '1999',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2000',
        any: [
          /^\s*CFLAG:329 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2000-2001',
        any: [
          /^\s*CFLAG:329 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2000-2002',
        any: [
          /^\s*CFLAG:329 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2000-2003',
        any: [
          /^\s*CFLAG:329 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2004-2007',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;背面座位アナル CFLAG:330\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2009',
        any: [
          /^\s*IF SELECTCOM == 29\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2011',
        any: [
          /^\s*IF CFLAG:TARGET:330 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2013',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2014',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2016',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2017',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2019-2022',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:330 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2020',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2021-2022',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:330 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2022',
        any: [
          /^\s*CFLAG:TARGET:330 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2022-2023',
        any: [
          /^\s*CFLAG:TARGET:330 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2025-2027',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2027',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2027-2030',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2028',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2029',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2031',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2032-2033',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:330 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2033',
        any: [
          /^\s*CFLAG:330 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2035',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2036',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2037',
        any: [
          /^\s*CFLAG:330 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2039',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2039-2042',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2040',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2041',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2043',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2044-2045',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:330 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2045',
        any: [
          /^\s*CFLAG:330 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2047',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2048',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2049',
        any: [
          /^\s*CFLAG:330 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2051',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2052',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2053',
        any: [
          /^\s*CFLAG:330 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2055',
        any: [
          /^\s*ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2056',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2057',
        any: [
          /^\s*CFLAG:330 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2057-2058',
        any: [
          /^\s*CFLAG:330 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2057-2059',
        any: [
          /^\s*CFLAG:330 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2057-2060',
        any: [
          /^\s*CFLAG:330 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2061-2064',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2066',
        any: [
          /^\s*IF SELECTCOM == 30\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2068',
        any: [
          /^\s*IF CFLAG:TARGET:331 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2070',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2071',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2073',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2074',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2076',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2077',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2079-2087',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:331 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2080',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2081-2087',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:331 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2082',
        any: [
          /^\s*CFLAG:TARGET:331 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2083-2087',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2085-2087',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2087',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2087-2090',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2087-2092',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2087-2098',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:331 = 6\s*$\n^\s*;愛＋奉仕精神Lv5\s*$\n^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2087-2100',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:331 = 6\s*$\n^\s*;愛＋奉仕精神Lv5\s*$\n^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2088',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2089',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2091',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2093',
        any: [
          /^\s*CFLAG:331 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2095',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2096',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2097',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2099',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2101',
        any: [
          /^\s*CFLAG:331 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2103',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2104',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2105',
        any: [
          /^\s*CFLAG:331 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2107',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2108',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2109',
        any: [
          /^\s*CFLAG:331 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2111',
        any: [
          /^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2112',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2113',
        any: [
          /^\s*CFLAG:331 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2114-2120',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2115-2120',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2116-2120',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2117-2120',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2122',
        any: [
          /^\s*IF SELECTCOM == 31\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2124',
        any: [
          /^\s*IF CFLAG:TARGET:332 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2126',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2127',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2129',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2130',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2132',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2133',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2135-2143',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:332 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2136',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2137-2143',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:332 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2138',
        any: [
          /^\s*CFLAG:TARGET:332 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2139-2143',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2141-2143',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2143',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2144',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2145',
        any: [
          /^\s*CFLAG:332 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2147',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2148',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2149',
        any: [
          /^\s*CFLAG:332 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2151',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2152',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2153',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2154',
        any: [
          /^\s*CFLAG:332 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2156',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2157',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2158',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2159',
        any: [
          /^\s*CFLAG:332 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2161',
        any: [
          /^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2162',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2163',
        any: [
          /^\s*CFLAG:332 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2164-2170',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2165-2170',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2166-2170',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2167-2170',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリ CFLAG:333\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2173',
        any: [
          /^\s*IF SELECTCOM == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2175',
        any: [
          /^\s*IF CFLAG:TARGET:333 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2177',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2178',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2180',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2181',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2183',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2184',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2186-2189',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:333 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2187',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2188-2189',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:333 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2189',
        any: [
          /^\s*CFLAG:TARGET:333 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2189-2190',
        any: [
          /^\s*CFLAG:TARGET:333 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2192-2194',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2194',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2194-2197',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2195',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2196',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2198',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2199-2200',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:333 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2200',
        any: [
          /^\s*CFLAG:333 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2202',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2203',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2204',
        any: [
          /^\s*CFLAG:333 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2206',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2206-2209',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2207',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2208',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2210',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2211-2212',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:333 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2212',
        any: [
          /^\s*CFLAG:333 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2214',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2215',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2216',
        any: [
          /^\s*CFLAG:333 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2218',
        any: [
          /^\s*ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2219',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2220',
        any: [
          /^\s*CFLAG:333 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2220-2221',
        any: [
          /^\s*CFLAG:333 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2220-2222',
        any: [
          /^\s*CFLAG:333 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2220-2223',
        any: [
          /^\s*CFLAG:333 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2224-2227',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;素股 CFLAG:334\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2229',
        any: [
          /^\s*IF SELECTCOM == 33\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2231',
        any: [
          /^\s*IF CFLAG:TARGET:334 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2233',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2234',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2236',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2237',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2239-2242',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2240',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2241-2242',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2242',
        any: [
          /^\s*CFLAG:TARGET:334 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2242-2243',
        any: [
          /^\s*CFLAG:TARGET:334 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2245-2246',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\+処女\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2247',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2248',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2249',
        any: [
          /^\s*CFLAG:334 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2251',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2252',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2253',
        any: [
          /^\s*CFLAG:334 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2255',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2256',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2257',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2258',
        any: [
          /^\s*CFLAG:334 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2260',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2261',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2262',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2263',
        any: [
          /^\s*CFLAG:334 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2265',
        any: [
          /^\s*ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2266',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2267',
        any: [
          /^\s*CFLAG:334 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2267-2268',
        any: [
          /^\s*CFLAG:334 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2267-2269',
        any: [
          /^\s*CFLAG:334 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2267-2270',
        any: [
          /^\s*CFLAG:334 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2271-2274',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2274-2289',
        any: [
          /^\s*;騎乗位 CFLAG:335\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;オトコ無し\s*$\n^\s*IF SELECTCOM == 34\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:335 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2274-2291',
        any: [
          /^\s*;騎乗位 CFLAG:335\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;オトコ無し\s*$\n^\s*IF SELECTCOM == 34\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:335 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2277',
        any: [
          /^\s*IF SELECTCOM == 34\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2279',
        any: [
          /^\s*IF CFLAG:TARGET:335 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2281',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2283',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2284',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2286',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2287',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2290',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2293-2310',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2295',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2296',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2298',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2299',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2301-2310',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2302',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2303-2310',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2304-2310',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2305',
        any: [
          /^\s*CFLAG:TARGET:335 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2306-2310',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2308-2310',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2310',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2310-2317',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2310-2319',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2310-2329',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2310-2331',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2311',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2312',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2313',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2314',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2315',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2316',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2318',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2320',
        any: [
          /^\s*CFLAG:335 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2322',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2323',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2324',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2325',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2326',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2327',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2328',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2330',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2332',
        any: [
          /^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2334',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2335',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2336',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2337',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2338',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2339',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2340',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2341-2360',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:335 = 4\s*$\n^\s*;屈服刻印Lv3\s*$\n^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$\n^\s*PRINTFORML\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:335 = 3\s*$\n^\s*;それ以外（愛無し、従順Lv5未満）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2342',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2343-2360',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:335 = 4\s*$\n^\s*;屈服刻印Lv3\s*$\n^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$\n^\s*PRINTFORML\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:335 = 3\s*$\n^\s*;それ以外（愛無し、従順Lv5未満）\s*$\n^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2344',
        any: [
          /^\s*CFLAG:335 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2346',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2347',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2348',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2349',
        any: [
          /^\s*CFLAG:335 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2351',
        any: [
          /^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2352',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2353',
        any: [
          /^\s*CFLAG:335 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2354-2360',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2355-2360',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2356-2360',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2357-2360',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;泡踊り CFLAG:336\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2362',
        any: [
          /^\s*IF SELECTCOM == 35\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2364',
        any: [
          /^\s*IF CFLAG:TARGET:336 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2366',
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2367',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2369-2372',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2370',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2371-2372',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2372',
        any: [
          /^\s*CFLAG:TARGET:336 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2372-2373',
        any: [
          /^\s*CFLAG:TARGET:336 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2375-2377',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2377',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2378',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2379',
        any: [
          /^\s*CFLAG:336 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2381',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2382',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2383',
        any: [
          /^\s*CFLAG:336 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2385',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2386',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2387',
        any: [
          /^\s*CFLAG:336 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2389',
        any: [
          /^\s*ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2390',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2391',
        any: [
          /^\s*CFLAG:336 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2391-2392',
        any: [
          /^\s*CFLAG:336 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2391-2393',
        any: [
          /^\s*CFLAG:336 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2391-2394',
        any: [
          /^\s*CFLAG:336 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2395-2398',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;騎乗位アナル CFLAG:337\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2400',
        any: [
          /^\s*IF SELECTCOM == 36\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2402',
        any: [
          /^\s*IF CFLAG:TARGET:337 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2404',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2405',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2407',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2408',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2410-2413',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:337 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2411',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2412-2413',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:337 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2413',
        any: [
          /^\s*CFLAG:TARGET:337 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2413-2414',
        any: [
          /^\s*CFLAG:TARGET:337 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2416-2418',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2418',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2418-2421',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2419',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2420',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2422',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2423-2424',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:337 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2424',
        any: [
          /^\s*CFLAG:337 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2426',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2427',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2428',
        any: [
          /^\s*CFLAG:337 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2430',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2430-2433',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2431',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2432',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2434',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2435-2436',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:337 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2436',
        any: [
          /^\s*CFLAG:337 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2438',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2439',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2440',
        any: [
          /^\s*CFLAG:337 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2442',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2443',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2444',
        any: [
          /^\s*CFLAG:337 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2446',
        any: [
          /^\s*ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2447',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2448',
        any: [
          /^\s*CFLAG:337 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2448-2449',
        any: [
          /^\s*CFLAG:337 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2448-2450',
        any: [
          /^\s*CFLAG:337 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2448-2451',
        any: [
          /^\s*CFLAG:337 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2452-2455',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2457',
        any: [
          /^\s*IF SELECTCOM == 37\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2459',
        any: [
          /^\s*IF CFLAG:TARGET:338 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2461',
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2462',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2464-2472',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:338 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2465',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2466-2472',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:338 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2467',
        any: [
          /^\s*CFLAG:TARGET:338 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2468-2472',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2470-2472',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2472',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2473',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2474',
        any: [
          /^\s*CFLAG:338 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2476',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2477',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2478',
        any: [
          /^\s*CFLAG:338 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2480',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2481',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2482',
        any: [
          /^\s*CFLAG:338 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2484',
        any: [
          /^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2485',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2486',
        any: [
          /^\s*CFLAG:338 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2487-2493',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;スパンキング CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2488-2493',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;スパンキング CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2489-2493',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;スパンキング CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2490-2493',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;スパンキング CFLAG:341\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2495',
        any: [
          /^\s*IF SELECTCOM == 40\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2497',
        any: [
          /^\s*IF CFLAG:TARGET:341 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2498',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2499',
        any: [
          /^\s*CFLAG:TARGET:341 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2499-2500',
        any: [
          /^\s*CFLAG:TARGET:341 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2502-2503',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2504',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2505',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2506',
        any: [
          /^\s*CFLAG:TARGET:341 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2508',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2509',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2510',
        any: [
          /^\s*CFLAG:TARGET:341 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2510-2511',
        any: [
          /^\s*CFLAG:TARGET:341 = 4\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2513',
        any: [
          /^\s*ELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2514',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2515',
        any: [
          /^\s*CFLAG:TARGET:341 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2515-2516',
        any: [
          /^\s*CFLAG:TARGET:341 = 3\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2518',
        any: [
          /^\s*ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2519',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2520',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2520-2521',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2520-2522',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2520-2523',
        any: [
          /^\s*CFLAG:TARGET:341 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2524-2527',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;鞭 CFLAG:342\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2529',
        any: [
          /^\s*IF SELECTCOM == 41\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2531',
        any: [
          /^\s*IF CFLAG:TARGET:342 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2533',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2534',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2536',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2537',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2539-2542',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:342 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2540',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2541-2542',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:342 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2542',
        any: [
          /^\s*CFLAG:TARGET:342 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2542-2543',
        any: [
          /^\s*CFLAG:TARGET:342 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2545-2547',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2547',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2548',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2549',
        any: [
          /^\s*CFLAG:TARGET:342 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2551',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2552',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2553',
        any: [
          /^\s*CFLAG:TARGET:342 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2555',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2556',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2557',
        any: [
          /^\s*CFLAG:TARGET:342 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2559',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2560',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2561',
        any: [
          /^\s*CFLAG:TARGET:342 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2563',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2564',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2565',
        any: [
          /^\s*CFLAG:TARGET:342 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2567',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2568',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2569',
        any: [
          /^\s*CFLAG:TARGET:342 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2571',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2572',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2573',
        any: [
          /^\s*CFLAG:TARGET:342 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2575',
        any: [
          /^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2576',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2577',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2577-2578',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2577-2579',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2577-2580',
        any: [
          /^\s*CFLAG:TARGET:342 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2581-2584',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;針 CFLAG:343\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2586',
        any: [
          /^\s*IF SELECTCOM == 42\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2588',
        any: [
          /^\s*IF CFLAG:TARGET:343 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2590',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2591',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2593',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2594',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2596-2599',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:343 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2597',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2598-2599',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:343 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2599',
        any: [
          /^\s*CFLAG:TARGET:343 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2599-2600',
        any: [
          /^\s*CFLAG:TARGET:343 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2602-2604',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2604',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2605',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2606',
        any: [
          /^\s*CFLAG:TARGET:343 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2608',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2609',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2610',
        any: [
          /^\s*CFLAG:TARGET:343 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2612',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2613',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2614',
        any: [
          /^\s*CFLAG:TARGET:343 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2616',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2617',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2618',
        any: [
          /^\s*CFLAG:TARGET:343 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2620',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2621',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2622',
        any: [
          /^\s*CFLAG:TARGET:343 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2624',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2625',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2626',
        any: [
          /^\s*CFLAG:TARGET:343 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2628',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2629',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2630',
        any: [
          /^\s*CFLAG:TARGET:343 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2632',
        any: [
          /^\s*ELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2633',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2634',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2634-2635',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2634-2636',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2634-2637',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2634-2638',
        any: [
          /^\s*CFLAG:TARGET:343 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2644',
        any: [
          /^\s*IF SELECTCOM == 43 && TEQUIP:43\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2646',
        any: [
          /^\s*IF CFLAG:TARGET:344 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2648',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2649',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2651',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2652',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2654-2662',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:344 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2655',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2656-2662',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:344 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2657',
        any: [
          /^\s*CFLAG:TARGET:344 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2658-2662',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2660-2662',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2662',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2663',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2664',
        any: [
          /^\s*CFLAG:TARGET:344 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2666',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2667',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2668',
        any: [
          /^\s*CFLAG:TARGET:344 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2670',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2671',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2672',
        any: [
          /^\s*CFLAG:TARGET:344 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2674',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2675',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2676',
        any: [
          /^\s*CFLAG:TARGET:344 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2678',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2679',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2680',
        any: [
          /^\s*CFLAG:TARGET:344 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2682',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2683',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2684',
        any: [
          /^\s*CFLAG:TARGET:344 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2686',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2687',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2688',
        any: [
          /^\s*CFLAG:TARGET:344 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2690',
        any: [
          /^\s*ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2691',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2692',
        any: [
          /^\s*CFLAG:TARGET:344 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2693-2699',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2694-2699',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2695-2699',
        any: [
          /^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2697',
        any: [
          /^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2699',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2700',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2701',
        any: [
          /^\s*CFLAG:380 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2703',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2704',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2705',
        any: [
          /^\s*CFLAG:380 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2707',
        any: [
          /^\s*ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2708',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2709',
        any: [
          /^\s*CFLAG:380 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2709-2710',
        any: [
          /^\s*CFLAG:380 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2709-2711',
        any: [
          /^\s*CFLAG:380 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2709-2712',
        any: [
          /^\s*CFLAG:380 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2718',
        any: [
          /^\s*IF SELECTCOM == 44 && TEQUIP:44\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2720',
        any: [
          /^\s*IF CFLAG:TARGET:345 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2722',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2723',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2725',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2726',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2728-2731',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:345 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2729',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2730-2731',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:345 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2731',
        any: [
          /^\s*CFLAG:TARGET:345 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2731-2732',
        any: [
          /^\s*CFLAG:TARGET:345 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2734-2736',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2736',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2737',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2738',
        any: [
          /^\s*CFLAG:TARGET:345 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2740',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2741',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2742',
        any: [
          /^\s*CFLAG:TARGET:345 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2744',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2745',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2746',
        any: [
          /^\s*CFLAG:TARGET:345 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2748',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2749',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2750',
        any: [
          /^\s*CFLAG:TARGET:345 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2752',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2753',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2754',
        any: [
          /^\s*CFLAG:TARGET:345 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2756',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2757',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2758',
        any: [
          /^\s*CFLAG:TARGET:345 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2760',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2761',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2762',
        any: [
          /^\s*CFLAG:TARGET:345 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2764',
        any: [
          /^\s*ELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2765',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2766',
        any: [
          /^\s*CFLAG:TARGET:345 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2766-2767',
        any: [
          /^\s*CFLAG:TARGET:345 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2766-2768',
        any: [
          /^\s*CFLAG:TARGET:345 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2769-2771',
        any: [
          /^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2771',
        any: [
          /^\s*ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2773',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2774',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2775',
        any: [
          /^\s*CFLAG:385 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2777',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2778',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2779',
        any: [
          /^\s*CFLAG:385 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2781',
        any: [
          /^\s*ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2782',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2783',
        any: [
          /^\s*CFLAG:385 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2783-2784',
        any: [
          /^\s*CFLAG:385 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2783-2785',
        any: [
          /^\s*CFLAG:385 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2783-2786',
        any: [
          /^\s*CFLAG:385 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2792',
        any: [
          /^\s*IF SELECTCOM == 45 && TEQUIP:45\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2794',
        any: [
          /^\s*IF CFLAG:TARGET:346 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2796',
        any: [
          /^\s*IF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2797',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2799',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2800',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2802-2805',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:346 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2803',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2804-2805',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:346 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2805',
        any: [
          /^\s*CFLAG:TARGET:346 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2805-2806',
        any: [
          /^\s*CFLAG:TARGET:346 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2808-2810',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋マゾっ気Lv5以上\s*$\n^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2810',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2811',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2812',
        any: [
          /^\s*CFLAG:TARGET:346 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2814',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2815',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2816',
        any: [
          /^\s*CFLAG:TARGET:346 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2818',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:346 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2819',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2820',
        any: [
          /^\s*CFLAG:TARGET:346 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2822',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2823',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2824',
        any: [
          /^\s*CFLAG:TARGET:346 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2826',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2827',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2828',
        any: [
          /^\s*CFLAG:TARGET:346 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2830',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2831',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2832',
        any: [
          /^\s*CFLAG:TARGET:346 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2834',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2835',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2836',
        any: [
          /^\s*CFLAG:TARGET:346 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2838',
        any: [
          /^\s*ELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2839',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2840',
        any: [
          /^\s*CFLAG:TARGET:346 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2840-2841',
        any: [
          /^\s*CFLAG:TARGET:346 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2840-2842',
        any: [
          /^\s*CFLAG:TARGET:346 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2843-2845',
        any: [
          /^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2845',
        any: [
          /^\s*ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2847',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:386 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2848',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2849',
        any: [
          /^\s*CFLAG:386 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2851',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2852',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2853',
        any: [
          /^\s*CFLAG:386 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2855',
        any: [
          /^\s*ELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2856',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2857',
        any: [
          /^\s*CFLAG:386 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2857-2858',
        any: [
          /^\s*CFLAG:386 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2857-2859',
        any: [
          /^\s*CFLAG:386 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2857-2860',
        any: [
          /^\s*CFLAG:386 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2866',
        any: [
          /^\s*IF SELECTCOM == 46 && TEQUIP:46\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2868',
        any: [
          /^\s*IF CFLAG:TARGET:347 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2870',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2871',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2873',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2874',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2876-2879',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:347 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2877',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2878-2879',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:347 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2879',
        any: [
          /^\s*CFLAG:TARGET:347 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2879-2880',
        any: [
          /^\s*CFLAG:TARGET:347 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2882-2883',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱＋A感覚Lv3以上＋マゾっ気Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2884',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2885',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2886',
        any: [
          /^\s*CFLAG:347 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2888',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2889',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2890',
        any: [
          /^\s*CFLAG:347 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2892',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2893',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2894',
        any: [
          /^\s*CFLAG:347 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2896',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2897',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2898',
        any: [
          /^\s*CFLAG:347 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2900',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2901',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2902',
        any: [
          /^\s*CFLAG:347 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2904',
        any: [
          /^\s*ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2905',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2906',
        any: [
          /^\s*CFLAG:347 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2906-2907',
        any: [
          /^\s*CFLAG:347 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2906-2908',
        any: [
          /^\s*CFLAG:347 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2906-2909',
        any: [
          /^\s*CFLAG:347 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2910-2913',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;何もしない CFLAG:356\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2915',
        any: [
          /^\s*IF SELECTCOM == 55\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2917',
        any: [
          /^\s*IF CFLAG:356 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2919',
        any: [
          /^\s*IF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2920',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2922-2925',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:356 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2923',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2924-2925',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:356 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2925',
        any: [
          /^\s*CFLAG:356 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2925-2926',
        any: [
          /^\s*CFLAG:356 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2928-2929',
        any: [
          /^\s*ELSE\s*$\n^\s*;愛＋欲情Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2930',
        any: [
          /^\s*IF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2931',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2932',
        any: [
          /^\s*CFLAG:356 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2934',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2935',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2936',
        any: [
          /^\s*CFLAG:356 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2938',
        any: [
          /^\s*ELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2939',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2940',
        any: [
          /^\s*CFLAG:356 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2940-2941',
        any: [
          /^\s*CFLAG:356 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2940-2942',
        any: [
          /^\s*CFLAG:356 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2940-2943',
        any: [
          /^\s*CFLAG:356 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2944-2947',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;会話する CFLAG:357\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2948-2962',
        any: [
          /^\s*;「会話」はある意味最も口上が生きるコマンドかも\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:357 == 0\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2948-2964',
        any: [
          /^\s*;「会話」はある意味最も口上が生きるコマンドかも\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:357 == 0\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2948-2965',
        any: [
          /^\s*;「会話」はある意味最も口上が生きるコマンドかも\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:357 == 0\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2950',
        any: [
          /^\s*IF SELECTCOM == 56\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2952',
        any: [
          /^\s*IF CFLAG:357 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2953',
        any: [
          /^\s*IF TEQUIP:53\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2956',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2957',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2959',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2960',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2963',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2967',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2968',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2970',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2971',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2973-2984',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2974',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2975-2984',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2976-2984',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2977',
        any: [
          /^\s*CFLAG:357 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2978-2984',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2980-2984',
        any: [
          /^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2981',
        any: [
          /^\s*IF TEQUIP:53\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2984',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2985',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2986',
        any: [
          /^\s*CFLAG:357 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2988',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2989',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2990',
        any: [
          /^\s*CFLAG:357 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2992',
        any: [
          /^\s*ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2993',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2994',
        any: [
          /^\s*CFLAG:357 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2995-2998',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2996-2998',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2998',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '2999',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3000',
        any: [
          /^\s*CFLAG:357 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3002',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3003',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3004',
        any: [
          /^\s*CFLAG:357 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3006',
        any: [
          /^\s*ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3007',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3008',
        any: [
          /^\s*CFLAG:357 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3009-3015',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリフェラ CFLAG:360\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3010-3015',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリフェラ CFLAG:360\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3011-3015',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリフェラ CFLAG:360\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3012-3015',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリフェラ CFLAG:360\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3013-3015',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パイズリフェラ CFLAG:360\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3017',
        any: [
          /^\s*IF SELECTCOM == 123\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3019',
        any: [
          /^\s*IF CFLAG:TARGET:360 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3021',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3022',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3024',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3025',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3027',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3028',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3030-3033',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:360 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3031',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3032-3033',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:360 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3033',
        any: [
          /^\s*CFLAG:TARGET:360 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3033-3034',
        any: [
          /^\s*CFLAG:TARGET:360 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3036-3038',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3038',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3039',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3040',
        any: [
          /^\s*CFLAG:360 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3042',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3043',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3044',
        any: [
          /^\s*CFLAG:360 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3046',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3047',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3048',
        any: [
          /^\s*CFLAG:360 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3050',
        any: [
          /^\s*ELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3051',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3052',
        any: [
          /^\s*CFLAG:360 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3052-3053',
        any: [
          /^\s*CFLAG:360 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3052-3054',
        any: [
          /^\s*CFLAG:360 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3052-3055',
        any: [
          /^\s*CFLAG:360 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3056-3058',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラ自慰 CFLAG:361\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3060',
        any: [
          /^\s*IF SELECTCOM == 114\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3062',
        any: [
          /^\s*IF CFLAG:TARGET:361 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3064',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3065',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3067',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3068',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3070',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3071',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3073-3076',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:361 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3074',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3075-3076',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:361 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3076',
        any: [
          /^\s*CFLAG:TARGET:361 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3076-3077',
        any: [
          /^\s*CFLAG:TARGET:361 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3079-3081',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3081',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3082',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3083',
        any: [
          /^\s*CFLAG:361 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3085',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3086',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3087',
        any: [
          /^\s*CFLAG:361 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3089',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3090',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3091',
        any: [
          /^\s*CFLAG:361 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3093',
        any: [
          /^\s*ELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3094',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3095',
        any: [
          /^\s*CFLAG:361 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3095-3096',
        any: [
          /^\s*CFLAG:361 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3095-3097',
        any: [
          /^\s*CFLAG:361 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3095-3098',
        any: [
          /^\s*CFLAG:361 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3099-3102',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;手コキフェラ CFLAG:362\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3104',
        any: [
          /^\s*IF SELECTCOM == 126\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3106',
        any: [
          /^\s*IF CFLAG:TARGET:362 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3108',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3109',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3111',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3112',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3114',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3115',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3117-3120',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:362 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3118',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3119-3120',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:362 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3120',
        any: [
          /^\s*CFLAG:TARGET:362 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3120-3121',
        any: [
          /^\s*CFLAG:TARGET:362 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3123-3125',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3125',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3126',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3127',
        any: [
          /^\s*CFLAG:362 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3129',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3130',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3131',
        any: [
          /^\s*CFLAG:362 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3133',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3134',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3135',
        any: [
          /^\s*CFLAG:362 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3137',
        any: [
          /^\s*ELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3138',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3139',
        any: [
          /^\s*CFLAG:362 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3139-3140',
        any: [
          /^\s*CFLAG:362 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3139-3141',
        any: [
          /^\s*CFLAG:362 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3139-3142',
        any: [
          /^\s*CFLAG:362 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3143-3146',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;バキュームフェラ CFLAG:363\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3148',
        any: [
          /^\s*IF SELECTCOM == 127\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3150',
        any: [
          /^\s*IF CFLAG:TARGET:363 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3152',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3153',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3155',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3156',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3158',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3159',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3161-3164',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:363 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3162',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3163-3164',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:363 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3164',
        any: [
          /^\s*CFLAG:TARGET:363 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3164-3165',
        any: [
          /^\s*CFLAG:TARGET:363 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3164-3167',
        any: [
          /^\s*CFLAG:TARGET:363 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3169',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3170',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3171',
        any: [
          /^\s*CFLAG:363 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3173',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3174',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3175',
        any: [
          /^\s*CFLAG:363 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3177',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3178',
        any: [
          /^\s*CFLAG:363 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3180',
        any: [
          /^\s*ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3181',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3182',
        any: [
          /^\s*CFLAG:363 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3182-3183',
        any: [
          /^\s*CFLAG:363 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3182-3184',
        any: [
          /^\s*CFLAG:363 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3182-3185',
        any: [
          /^\s*CFLAG:363 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3186-3189',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;シックスナイン CFLAG:364\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3191',
        any: [
          /^\s*IF SELECTCOM == 69\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3193',
        any: [
          /^\s*IF CFLAG:TARGET:364 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3195',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3196',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3198',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3199',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3201',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3202',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3204-3207',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:364 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3205',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3206-3207',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:364 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3207',
        any: [
          /^\s*CFLAG:TARGET:364 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3207-3208',
        any: [
          /^\s*CFLAG:TARGET:364 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3210-3212',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3212',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3213',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3214',
        any: [
          /^\s*CFLAG:364 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3216',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3217',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3218',
        any: [
          /^\s*CFLAG:364 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3220',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3221',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3222',
        any: [
          /^\s*CFLAG:364 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3224',
        any: [
          /^\s*ELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3225',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3226',
        any: [
          /^\s*CFLAG:364 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3226-3227',
        any: [
          /^\s*CFLAG:364 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3226-3228',
        any: [
          /^\s*CFLAG:364 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3226-3229',
        any: [
          /^\s*CFLAG:364 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3230-3233',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;ディープスロート CFLAG:365\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3235',
        any: [
          /^\s*IF SELECTCOM == 124\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3237',
        any: [
          /^\s*IF CFLAG:TARGET:365 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3239',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3240',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3242',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3243',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3245',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3246',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3248-3251',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:365 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3249',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3250-3251',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:365 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3251',
        any: [
          /^\s*CFLAG:TARGET:365 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3251-3252',
        any: [
          /^\s*CFLAG:TARGET:365 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3251-3254',
        any: [
          /^\s*CFLAG:TARGET:365 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3256',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3257',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3258',
        any: [
          /^\s*CFLAG:365 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3260',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3261',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3262',
        any: [
          /^\s*CFLAG:365 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3264',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3265',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3266',
        any: [
          /^\s*CFLAG:365 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3268',
        any: [
          /^\s*ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3269',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3270',
        any: [
          /^\s*CFLAG:365 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3270-3271',
        any: [
          /^\s*CFLAG:365 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3270-3272',
        any: [
          /^\s*CFLAG:365 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3270-3273',
        any: [
          /^\s*CFLAG:365 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3274-3277',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;イラマチオ CFLAG:381\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3279',
        any: [
          /^\s*IF SELECTCOM == 80\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3281',
        any: [
          /^\s*IF CFLAG:TARGET:381 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3283',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3284',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3286',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3287',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3289-3292',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:381 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3290',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3291-3292',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:381 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3292',
        any: [
          /^\s*CFLAG:TARGET:381 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3292-3293',
        any: [
          /^\s*CFLAG:TARGET:381 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3295-3297',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3297',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3298',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3299',
        any: [
          /^\s*CFLAG:381 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3301',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:381 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3302',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3303',
        any: [
          /^\s*CFLAG:381 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3305',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3306',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3307',
        any: [
          /^\s*CFLAG:381 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3309',
        any: [
          /^\s*ELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3310',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3311',
        any: [
          /^\s*CFLAG:381 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3311-3312',
        any: [
          /^\s*CFLAG:381 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3311-3313',
        any: [
          /^\s*CFLAG:381 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3311-3314',
        any: [
          /^\s*CFLAG:381 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3311-3315',
        any: [
          /^\s*CFLAG:381 = 2\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3322',
        any: [
          /^\s*IF SELECTCOM == 87\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325-3348',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$\n^\s*;助手\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325-3350',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$\n^\s*;助手\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325-3360',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$\n^\s*;助手\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325-3362',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$\n^\s*;助手\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3325-3364',
        any: [
          /^\s*IF CFLAG:TARGET:348 == 0\s*$\n^\s*;助手\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3327',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3328',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3330',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3332',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3333',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3335',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3336',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3338',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3339',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3341',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3342',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3344',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3346',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3347',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3349',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3352',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3353',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3355',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3356',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3358',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3359',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3363',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3366',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3368',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3369',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3371',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3372',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3374',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3375',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3377',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3378',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3380',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3382',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3383',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3384-3438',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3385',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3386-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$\n^\s*ELSEIF P == 64\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3388',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3389',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3391',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3392',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3394',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3395',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3396-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*;取り外し\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3398-3438',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3399',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3400-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;おへそ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3402-3438',
        any: [
          /^\s*ELSE\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*PRINTFORMW\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;おへそ\s*$\n^\s*ELSEIF P == 2\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3404',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3405',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3407',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3408',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3410',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3411',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3413',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3414',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3416',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3418',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3419',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3420-3438',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3421',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3422-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$\n^\s*ELSEIF P == 64\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3424',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3425',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3427',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3428',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3430',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3431',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3432-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*;取り外し\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:348 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3434-3438',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:348 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3435',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3436-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:348 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3437-3438',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:348 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3438',
        any: [
          /^\s*CFLAG:TARGET:348 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3438-3439',
        any: [
          /^\s*CFLAG:TARGET:348 = 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3438-3441',
        any: [
          /^\s*CFLAG:TARGET:348 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3443',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3444',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3446',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3446-3463',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;おへそ\s*$\n^\s*ELSEIF P == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3448',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3450',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3451',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3453',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3454',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3456',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3457',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3459',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3461',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3462',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3464',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3465-3480',
        any: [
          /^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$\n^\s*ELSEIF P == 64\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3467',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3468',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3470',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3471',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3473',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3474',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3475-3480',
        any: [
          /^\s*ENDIF\s*$\n^\s*;取り外し\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3477-3480',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3478',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3479-3480',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:348 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3480',
        any: [
          /^\s*CFLAG:348 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3482',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3482-3498',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;おへそ\s*$\n^\s*ELSEIF P == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3484',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3486',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3487',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3489',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3490',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3492',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3493',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3495',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3496',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3497',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3499',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3500-3515',
        any: [
          /^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$\n^\s*ELSEIF P == 64\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3502',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3503',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3505',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3506',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3508',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3509',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3510-3515',
        any: [
          /^\s*ENDIF\s*$\n^\s*;取り外し\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3512-3515',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3513',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3514-3515',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:348 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3515',
        any: [
          /^\s*CFLAG:348 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3517',
        any: [
          /^\s*ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3517-3534',
        any: [
          /^\s*ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2\s*$\n^\s*;装着する\s*$\n^\s*IF CFLAG:7 & P\s*$\n^\s*;両乳首\s*$\n^\s*IF P == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;おへそ\s*$\n^\s*ELSEIF P == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*;ラビア\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3519',
        any: [
          /^\s*IF CFLAG:7 & P\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3521',
        any: [
          /^\s*IF P == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3522',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3524',
        any: [
          /^\s*ELSEIF P == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3525',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3527',
        any: [
          /^\s*ELSEIF P == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3528',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3530',
        any: [
          /^\s*ELSEIF P == 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3532',
        any: [
          /^\s*IF TALENT:121 \|\| TALENT:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3533',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3535',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3536-3551',
        any: [
          /^\s*ENDIF\s*$\n^\s*;舌先\s*$\n^\s*ELSEIF P == 16\s*$\n^\s*PRINTFORMW\s*$\n^\s*;唇\s*$\n^\s*ELSEIF P == 32\s*$\n^\s*PRINTFORMW\s*$\n^\s*;鼻穴\s*$\n^\s*ELSEIF P == 64\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3538',
        any: [
          /^\s*ELSEIF P == 16\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3539',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3541',
        any: [
          /^\s*ELSEIF P == 32\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3542',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3544',
        any: [
          /^\s*ELSEIF P == 64\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3545',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3546-3551',
        any: [
          /^\s*ENDIF\s*$\n^\s*;取り外し\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3548-3551',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:348 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3549',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3550-3551',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:348 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3551',
        any: [
          /^\s*CFLAG:348 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3551-3552',
        any: [
          /^\s*CFLAG:348 = 2\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3551-3553',
        any: [
          /^\s*CFLAG:348 = 2\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3551-3554',
        any: [
          /^\s*CFLAG:348 = 2\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3551-3555',
        any: [
          /^\s*CFLAG:348 = 2\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3563-4366',
        any: [
          /^\s*@DOG_KOJO_14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦愛撫 CFLAG:301\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 0\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:301 == 0\s*$\n^\s*;屈服刻印Lv2以上\s*$\n^\s*IF MARK:2 >= 2\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3568',
        any: [
          /^\s*IF SELECTCOM == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3570',
        any: [
          /^\s*IF CFLAG:301 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3572',
        any: [
          /^\s*IF MARK:2 >= 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3573',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3575-3583',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:301 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3576',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3577-3583',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:301 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3578',
        any: [
          /^\s*CFLAG:301 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3579-3583',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3581-3583',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3583',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3584',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3585',
        any: [
          /^\s*CFLAG:301 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3587',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3588',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3589',
        any: [
          /^\s*CFLAG:301 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3591',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3592',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3593',
        any: [
          /^\s*CFLAG:301 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3595',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3596',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3597',
        any: [
          /^\s*CFLAG:301 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3599',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3600',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3601',
        any: [
          /^\s*CFLAG:301 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3603',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3604',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3605',
        any: [
          /^\s*CFLAG:301 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3606-3612',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3607-3612',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3608-3612',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3609-3612',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦クンニ CFLAG:302\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3614',
        any: [
          /^\s*IF SELECTCOM == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3616',
        any: [
          /^\s*IF CFLAG:302 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3618',
        any: [
          /^\s*IF TALENT:TARGET:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3619',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3621-3629',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:302 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3622',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3623-3629',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:302 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3624',
        any: [
          /^\s*CFLAG:302 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3625-3629',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3627-3629',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3629',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3630',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3631',
        any: [
          /^\s*CFLAG:302 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3633',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3634',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3635',
        any: [
          /^\s*CFLAG:302 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3637',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3638',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3639',
        any: [
          /^\s*CFLAG:302 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3641',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3642',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3643',
        any: [
          /^\s*CFLAG:302 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3645',
        any: [
          /^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3646',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3647',
        any: [
          /^\s*CFLAG:302 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3648-3655',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3649-3655',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3650-3655',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3651-3655',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦胸愛撫 CFLAG:306\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3657',
        any: [
          /^\s*IF SELECTCOM == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3659',
        any: [
          /^\s*IF CFLAG:306 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3661',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3662',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3664-3672',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:306 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3665',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3666-3672',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:306 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3667',
        any: [
          /^\s*CFLAG:TARGET:306 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3668-3672',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3670-3672',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3672',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3673',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3674',
        any: [
          /^\s*CFLAG:306 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3676',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3677',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3678',
        any: [
          /^\s*CFLAG:306 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3680',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3681',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3682',
        any: [
          /^\s*CFLAG:306 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3684',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3685',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3686',
        any: [
          /^\s*CFLAG:306 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3688',
        any: [
          /^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3689',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3690',
        any: [
          /^\s*CFLAG:306 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3691-3697',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3692-3697',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3693-3697',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3694-3697',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦キス CFLAG:307\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3697-3712',
        any: [
          /^\s*;獣姦キス CFLAG:307\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 6\s*$\n^\s*;ファーストキス\s*$\n^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3697-3714',
        any: [
          /^\s*;獣姦キス CFLAG:307\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 6\s*$\n^\s*;ファーストキス\s*$\n^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3697-3716',
        any: [
          /^\s*;獣姦キス CFLAG:307\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 6\s*$\n^\s*;ファーストキス\s*$\n^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3699',
        any: [
          /^\s*IF SELECTCOM == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3701',
        any: [
          /^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3703',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3704',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3706',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3707',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3709',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3710',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3713',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3715',
        any: [
          /^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3718',
        any: [
          /^\s*ELSEIF CFLAG:307 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3720',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3721',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3723',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3724',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3726',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3727',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3729-3737',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:307 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3730',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3731-3737',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:307 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3732',
        any: [
          /^\s*CFLAG:307 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3733-3737',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3735-3737',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3737',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3738',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3739',
        any: [
          /^\s*CFLAG:307 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3741',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3742',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3743',
        any: [
          /^\s*CFLAG:307 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3745',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3746',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3747',
        any: [
          /^\s*CFLAG:307 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3749',
        any: [
          /^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3750',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3751',
        any: [
          /^\s*CFLAG:307 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3753',
        any: [
          /^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3754',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3755',
        any: [
          /^\s*CFLAG:307 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3756-3762',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3757-3762',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3758-3762',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3759-3762',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル舐め CFLAG:310\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3764',
        any: [
          /^\s*IF SELECTCOM == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3766',
        any: [
          /^\s*IF CFLAG:310 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3768',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3769',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3771',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3772',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3774',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3775',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3777-3785',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:310 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3778',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3779-3785',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:310 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3780',
        any: [
          /^\s*CFLAG:TARGET:310 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3781-3785',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3783-3785',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3785',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3786',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3787',
        any: [
          /^\s*CFLAG:310 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3789',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3790',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3791',
        any: [
          /^\s*CFLAG:310 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3793',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3794',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3795',
        any: [
          /^\s*CFLAG:310 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3797',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3798',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3799',
        any: [
          /^\s*CFLAG:310 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3801',
        any: [
          /^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3802',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3803',
        any: [
          /^\s*CFLAG:310 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3804-3810',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3805-3810',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3806-3810',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3807-3810',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位 CFLAG:322\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3810-3828',
        any: [
          /^\s*;獣姦後背位 CFLAG:322\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 21\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:322 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:136 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3810-3830',
        any: [
          /^\s*;獣姦後背位 CFLAG:322\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 21\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:322 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:136 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3812',
        any: [
          /^\s*IF SELECTCOM == 21\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3814',
        any: [
          /^\s*IF CFLAG:TARGET:322 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3816',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3818',
        any: [
          /^\s*IF TALENT:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3819',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3821',
        any: [
          /^\s*ELSEIF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3822',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3824',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3825',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3829',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3832-3852',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:136 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3834',
        any: [
          /^\s*IF TALENT:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3835',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3837',
        any: [
          /^\s*ELSEIF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3838',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3840',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3841',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3843-3852',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3844',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3845-3852',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3846-3852',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:322 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3847',
        any: [
          /^\s*CFLAG:322 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3848-3852',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3850-3852',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3852',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3853',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3854',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3855',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3856',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3857-3860',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3858',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3859-3860',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:322 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3860',
        any: [
          /^\s*CFLAG:322 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3862',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3862-3867',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3862-3869',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3862-3877',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 6\s*$\n^\s*;愛\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3862-3879',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:322 = 6\s*$\n^\s*;愛\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3863',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3864',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3865',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3866',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3868',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3870',
        any: [
          /^\s*CFLAG:322 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3872',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3873',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3874',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3875',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3876',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3878',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3880',
        any: [
          /^\s*CFLAG:322 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3882',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3883',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3884',
        any: [
          /^\s*CFLAG:322 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3886',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3887',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3888',
        any: [
          /^\s*CFLAG:322 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3890',
        any: [
          /^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3891',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3893',
        any: [
          /^\s*CFLAG:322 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3894-3900',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3895-3900',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3896-3900',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3897-3900',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦後背位アナル CFLAG:328\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3902',
        any: [
          /^\s*IF SELECTCOM == 27\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3904',
        any: [
          /^\s*IF CFLAG:TARGET:328 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3906',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3907',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3909',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3910',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3912',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3913',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3915-3922',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:328 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3916',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3917-3922',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:328 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3918',
        any: [
          /^\s*CFLAG:TARGET:328 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3919-3922',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3921-3922',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬＋A感覚Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3923',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3923-3926',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3924',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3925',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3927',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3928-3929',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:328 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3929',
        any: [
          /^\s*CFLAG:328 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3931',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3931-3934',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3932',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3933',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3935',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3936-3937',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:328 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3937',
        any: [
          /^\s*CFLAG:328 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3939',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3939-3942',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3939-3944',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3940',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3941',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3943',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3945',
        any: [
          /^\s*CFLAG:328 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3947',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3948',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3949',
        any: [
          /^\s*CFLAG:328 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3951',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3952',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3953',
        any: [
          /^\s*CFLAG:328 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3955',
        any: [
          /^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3956',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3957',
        any: [
          /^\s*CFLAG:328 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3958-3964',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3959-3964',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3960-3964',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3961-3964',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦手淫 CFLAG:331\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3966',
        any: [
          /^\s*IF SELECTCOM == 30\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3968',
        any: [
          /^\s*IF CFLAG:TARGET:331 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3970',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3971',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3973',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3974',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3976',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3977',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3979-3986',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:331 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3980',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3981-3986',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:331 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3982',
        any: [
          /^\s*CFLAG:TARGET:331 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3983-3986',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3985-3986',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3987',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3987-3990',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3988',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3989',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3991',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3992-3993',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:331 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3993',
        any: [
          /^\s*CFLAG:331 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3995',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3995-3998',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3995-4000',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3995-4006',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:331 = 6\s*$\n^\s*;愛＋奉仕精神Lv5\s*$\n^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3995-4008',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:331 = 6\s*$\n^\s*;愛＋奉仕精神Lv5\s*$\n^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3996',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3997',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '3999',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4001',
        any: [
          /^\s*CFLAG:331 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4003',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4004',
        any: [
          /^\s*IF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4005',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4007',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4009',
        any: [
          /^\s*CFLAG:331 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4011',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4012',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4013',
        any: [
          /^\s*CFLAG:331 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4015',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4016',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4017',
        any: [
          /^\s*CFLAG:331 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4019',
        any: [
          /^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4020',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4021',
        any: [
          /^\s*CFLAG:331 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4022-4028',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4023-4028',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4024-4028',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4025-4028',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦フェラチオ CFLAG:332\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4030',
        any: [
          /^\s*IF SELECTCOM == 31\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4032',
        any: [
          /^\s*IF CFLAG:TARGET:332 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4034',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4035',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4037',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4038',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4040',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4041',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4043-4051',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:332 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4044',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4045-4051',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:332 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4046',
        any: [
          /^\s*CFLAG:TARGET:332 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4047-4051',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4049-4051',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4051',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4052',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4053',
        any: [
          /^\s*CFLAG:332 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4055',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4056',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4057',
        any: [
          /^\s*CFLAG:332 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4059',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4060',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4061',
        any: [
          /^\s*CFLAG:332 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4063',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4064',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4065',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4066',
        any: [
          /^\s*CFLAG:332 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4068',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4069',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4070',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4071',
        any: [
          /^\s*CFLAG:332 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4073',
        any: [
          /^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4074',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4075',
        any: [
          /^\s*CFLAG:332 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4076-4082',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4077-4082',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4078-4082',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4079-4082',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦騎乗位 CFLAG:335\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4082-4099',
        any: [
          /^\s*;獣姦騎乗位 CFLAG:335\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 34\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:335 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4082-4101',
        any: [
          /^\s*;獣姦騎乗位 CFLAG:335\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 34\s*$\n^\s*;初めて\s*$\n^\s*IF CFLAG:TARGET:335 == 0\s*$\n^\s*;処女\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4084',
        any: [
          /^\s*IF SELECTCOM == 34\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4086',
        any: [
          /^\s*IF CFLAG:TARGET:335 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4088',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4090',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4091',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4093',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4094',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4096',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4097',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4100',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4103-4123',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:85 == 1\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4105',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4106',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4108',
        any: [
          /^\s*ELSEIF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4109',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4111',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4112',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4114-4123',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4115',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4116-4123',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4117-4123',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:335 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4118',
        any: [
          /^\s*CFLAG:TARGET:335 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4119-4123',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4121-4123',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4123',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4124',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4125',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4126',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4127',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4128-4131',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:335 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4129',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4130-4131',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:335 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4131',
        any: [
          /^\s*CFLAG:335 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4133',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4133-4140',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4133-4142',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4133-4152',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4133-4154',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$\n^\s*IF RAND:4 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:3 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSEIF RAND:2 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4134',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4135',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4136',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4137',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4138',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4139',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4141',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4143',
        any: [
          /^\s*CFLAG:335 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4145',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4146',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4147',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4148',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4149',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4150',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4151',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4153',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4155',
        any: [
          /^\s*CFLAG:335 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4157',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4158',
        any: [
          /^\s*IF RAND:4 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4159',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4160',
        any: [
          /^\s*ELSEIF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4161',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4162',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4163',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4164-4183',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:335 = 4\s*$\n^\s*;屈服刻印Lv3\s*$\n^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$\n^\s*PRINTFORML\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:335 = 3\s*$\n^\s*;それ以外（愛無し、従順Lv5未満）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4165',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4166-4183',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:335 = 4\s*$\n^\s*;屈服刻印Lv3\s*$\n^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$\n^\s*PRINTFORML\s*$\n^\s*PRINTFORMW\s*$\n^\s*CFLAG:335 = 3\s*$\n^\s*;それ以外（愛無し、従順Lv5未満）\s*$\n^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4167',
        any: [
          /^\s*CFLAG:335 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4169',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4170',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4171',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4172',
        any: [
          /^\s*CFLAG:335 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4174',
        any: [
          /^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4175',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4176',
        any: [
          /^\s*CFLAG:335 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4177-4183',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4178-4183',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4179-4183',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4180-4183',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アナル奉仕 CFLAG:338\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4185',
        any: [
          /^\s*IF SELECTCOM == 37\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4187',
        any: [
          /^\s*IF CFLAG:TARGET:338 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4189',
        any: [
          /^\s*IF ABL:TARGET:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4190',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4192-4200',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:338 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4193',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4194-4200',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:338 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4195',
        any: [
          /^\s*CFLAG:TARGET:338 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4196-4200',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4198-4200',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬＋奉仕精神Lv5\s*$\n^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4200',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4201',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4202',
        any: [
          /^\s*CFLAG:338 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4204',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4205',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4206',
        any: [
          /^\s*CFLAG:338 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4208',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4209',
        any: [
          /^\s*PRINTFORML\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4210',
        any: [
          /^\s*CFLAG:338 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4212',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4213',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4214',
        any: [
          /^\s*CFLAG:338 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4216',
        any: [
          /^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4217',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4218',
        any: [
          /^\s*CFLAG:338 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4219-4225',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アイマスク CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4220-4225',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アイマスク CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4221-4225',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アイマスク CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4222-4225',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;獣姦アイマスク CFLAG:344　CFLAG:444\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4228',
        any: [
          /^\s*IF SELECTCOM == 43 && TEQUIP:43\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4230',
        any: [
          /^\s*IF CFLAG:TARGET:344 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4232',
        any: [
          /^\s*IF TALENT:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4233',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4235',
        any: [
          /^\s*ELSEIF TALENT:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4236',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4238',
        any: [
          /^\s*ELSEIF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4239',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4241-4249',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:344 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4242',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4243-4249',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:344 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4244',
        any: [
          /^\s*CFLAG:TARGET:344 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4245-4249',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4247-4249',
        any: [
          /^\s*ELSE\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4249',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4250',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4251',
        any: [
          /^\s*CFLAG:TARGET:344 = 10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4253',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4254',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4255',
        any: [
          /^\s*CFLAG:TARGET:344 = 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4257',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4258',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4259',
        any: [
          /^\s*CFLAG:TARGET:344 = 8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4261',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4262',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4263',
        any: [
          /^\s*CFLAG:TARGET:344 = 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4265',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4266',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4267',
        any: [
          /^\s*CFLAG:TARGET:344 = 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4269',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4270',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4271',
        any: [
          /^\s*CFLAG:TARGET:344 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4273',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4274',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4275',
        any: [
          /^\s*CFLAG:TARGET:344 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4277',
        any: [
          /^\s*ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4278',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4279',
        any: [
          /^\s*CFLAG:TARGET:344 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4281',
        any: [
          /^\s*ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4282',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4283',
        any: [
          /^\s*CFLAG:TARGET:344 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4284-4290',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4285-4290',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4286-4290',
        any: [
          /^\s*ENDIF\s*$\n^\s*;終了時\s*$\n^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4288',
        any: [
          /^\s*ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4290',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4291',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4292',
        any: [
          /^\s*CFLAG:444 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4294',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4295',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4296',
        any: [
          /^\s*CFLAG:444 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4298',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:338 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4299',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4300',
        any: [
          /^\s*CFLAG:444 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4302',
        any: [
          /^\s*ELSEIF CFLAG:444 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4303',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4304',
        any: [
          /^\s*CFLAG:444 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4304-4305',
        any: [
          /^\s*CFLAG:444 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4304-4306',
        any: [
          /^\s*CFLAG:444 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4304-4307',
        any: [
          /^\s*CFLAG:444 = 1\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4313',
        any: [
          /^\s*IF SELECTCOM == 56\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4315',
        any: [
          /^\s*IF CFLAG:357 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4316',
        any: [
          /^\s*IF TEQUIP:53\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4319',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4320',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4322',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4323',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4325',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4326',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4328-4339',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4329',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4330-4339',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4331-4339',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:357 = 1\s*$\n^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4332',
        any: [
          /^\s*CFLAG:357 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4333-4339',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;二回目以降\s*$\n^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4335-4339',
        any: [
          /^\s*ELSE\s*$\n^\s*IF TEQUIP:53\s*$\n^\s*;ビデオ自己紹介\s*$\n^\s*;牝犬\s*$\n^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4336',
        any: [
          /^\s*IF TEQUIP:53\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4339',
        any: [
          /^\s*IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4340',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4341',
        any: [
          /^\s*CFLAG:357 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4343',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4344',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4345',
        any: [
          /^\s*CFLAG:357 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4347',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4348',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4349',
        any: [
          /^\s*CFLAG:357 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4351',
        any: [
          /^\s*ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4352',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4353',
        any: [
          /^\s*CFLAG:357 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4354-4364',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4355-4364',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4356-4364',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4357-4364',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4358-4364',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4361-4364',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4368-4374',
        any: [
          /^\s*@KOJO_MESSAGE_PALAMCNG_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする\s*$\n^\s*SIF TEQUIP:45\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4368-4564',
        any: [
          /^\s*@KOJO_MESSAGE_PALAMCNG_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする\s*$\n^\s*SIF TEQUIP:45\s*$\n^\s*RETURN 0\s*$\n^\s*;失神時には口上をスキップする\s*$\n^\s*SIF TFLAG:899\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4377-4380',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;パラメータ変動時のセリフ CFLAG 221～260を使用\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4385',
        any: [
          /^\s*P = PALAM:3 \+ UP:3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4386',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4386-4393',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:TARGET:85 == 1\s*$\n^\s*;ローションを使った場合\s*$\n^\s*IF SELECTCOM == 50\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4386-4395',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:TARGET:85 == 1\s*$\n^\s*;ローションを使った場合\s*$\n^\s*IF SELECTCOM == 50\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4388',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4390',
        any: [
          /^\s*IF SELECTCOM == 50\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4391',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4394',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4397-4406',
        any: [
          /^\s*ELSE\s*$\n^\s*;ローションを使った場合\s*$\n^\s*IF SELECTCOM == 50\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:221 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4399',
        any: [
          /^\s*IF SELECTCOM == 50\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4400',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4402-4406',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:221 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4403',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4404-4406',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:221 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4405-4406',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:221 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4406',
        any: [
          /^\s*CFLAG:TARGET:221 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4406-4407',
        any: [
          /^\s*CFLAG:TARGET:221 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4412',
        any: [
          /^\s*P = PALAM:5 \+ UP:5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4413',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:222 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4413-4420',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:222 == 0\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:TARGET:85 == 1\s*$\n^\s*;しあわせ草を使った場合\s*$\n^\s*IF SELECTCOM == 51\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4413-4422',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:222 == 0\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:TARGET:85 == 1\s*$\n^\s*;しあわせ草を使った場合\s*$\n^\s*IF SELECTCOM == 51\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4415',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4417',
        any: [
          /^\s*IF SELECTCOM == 51\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4418',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4421',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4424-4433',
        any: [
          /^\s*ELSE\s*$\n^\s*;しあわせ草を使った場合\s*$\n^\s*IF SELECTCOM == 51\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:222 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4426',
        any: [
          /^\s*IF SELECTCOM == 51\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4427',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4429-4433',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:222 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4430',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4431-4433',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:222 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4432-4433',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:222 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4433',
        any: [
          /^\s*CFLAG:222 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4433-4434',
        any: [
          /^\s*CFLAG:222 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4439',
        any: [
          /^\s*P = PALAM:8 \+ UP:8\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4440',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:223 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4442',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4443',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4445-4448',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:223 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4446',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4447-4448',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:223 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4448',
        any: [
          /^\s*CFLAG:223 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4448-4449',
        any: [
          /^\s*CFLAG:223 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4454',
        any: [
          /^\s*P = PALAM:10 \+ UP:10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4455',
        any: [
          /^\s*IF P > PALAMLV:2 && CFLAG:224 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4457',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4458',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4460-4463',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:224 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4461',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4462-4463',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:224 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4463',
        any: [
          /^\s*CFLAG:224 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4463-4464',
        any: [
          /^\s*CFLAG:224 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4469',
        any: [
          /^\s*IF NOWEX:0 > 0 && CFLAG:214 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4471',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4472',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4474-4477',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:214 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4475',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4476-4477',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:214 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4477',
        any: [
          /^\s*CFLAG:214 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4477-4478',
        any: [
          /^\s*CFLAG:214 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4483',
        any: [
          /^\s*IF NOWEX:1 > 0 && CFLAG:226 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4485',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4486',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4488',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4489',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4491-4494',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:226 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4492',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4493-4494',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:226 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4494',
        any: [
          /^\s*CFLAG:TARGET:226 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4494-4495',
        any: [
          /^\s*CFLAG:TARGET:226 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4500',
        any: [
          /^\s*IF NOWEX:2 > 0 && CFLAG:227 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4502',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4503',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4505',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4506',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4508-4509',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW 「咕……啊啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4509',
        any: [
          /^\s*PRINTFORMW 「咕……啊啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4509-4510',
        any: [
          /^\s*PRINTFORMW 「咕……啊啊」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4511',
        any: [
          /^\s*CFLAG:227 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4511-4512',
        any: [
          /^\s*CFLAG:227 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4517',
        any: [
          /^\s*IF NOWEX:3 > 0 && CFLAG:228 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4519',
        any: [
          /^\s*IF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4520',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4522-4525',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:228 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4523',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4524-4525',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:228 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4525',
        any: [
          /^\s*CFLAG:TARGET:228 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4525-4526',
        any: [
          /^\s*CFLAG:TARGET:228 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4531',
        any: [
          /^\s*A = UP:11 \+ UP:12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4532',
        any: [
          /^\s*IF TFLAG:3 == 1 && CFLAG:229 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4534',
        any: [
          /^\s*IF TFLAG:20 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4536',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4537',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4539',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4539-4542',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4540',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4543',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4544-4545',
        any: [
          /^\s*ENDIF\s*$\n^\s*;主人以外による処女喪失（再生処女含む）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4545-4546',
        any: [
          /^\s*;主人以外による処女喪失（再生処女含む）\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4548',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4549',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4551',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4552',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4554-4558',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:229 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4555',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4556-4558',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:229 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4557-4558',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:TARGET:229 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4558',
        any: [
          /^\s*CFLAG:TARGET:229 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4558-4559',
        any: [
          /^\s*CFLAG:TARGET:229 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4566-4627',
        any: [
          /^\s*@KOJO_MESSAGE_MARKCNG_14\s*$\n^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$\n^\s*;SIF ASSI > 0 && ASSIPLAY\s*$\n^\s*;	RETURN 0\s*$\n^\s*;ボールギャグ着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$\n^\s*SIF TEQUIP:45\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;苦痛刻印Lv3取得 CFLAG:297\s*$\n^\s*;-------------------------------------------------\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4570-4572',
        any: [
          /^\s*;ボールギャグ着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）\s*$\n^\s*SIF TEQUIP:45\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4576',
        any: [
          /^\s*IF TFLAG:22 == 3 && CFLAG:297 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4578',
        any: [
          /^\s*IF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4579',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4580-4583',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:297 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4581',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4582-4583',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:297 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4583',
        any: [
          /^\s*CFLAG:297 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4583-4584',
        any: [
          /^\s*CFLAG:297 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4589',
        any: [
          /^\s*IF TFLAG:23 == 3 && CFLAG:298 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4591',
        any: [
          /^\s*IF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4592',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4593-4596',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:298 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4594',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4595-4596',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:298 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4596',
        any: [
          /^\s*CFLAG:298 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4596-4597',
        any: [
          /^\s*CFLAG:298 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4602',
        any: [
          /^\s*IF TFLAG:24 == 3 && CFLAG:299 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4604',
        any: [
          /^\s*IF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4605',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4606-4609',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:299 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4607',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4608-4609',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:299 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4609',
        any: [
          /^\s*CFLAG:299 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4609-4610',
        any: [
          /^\s*CFLAG:299 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4615',
        any: [
          /^\s*IF TFLAG:21 == 3 && CFLAG:300 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4617',
        any: [
          /^\s*IF TALENT:85 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4618',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4619-4622',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:300 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4620',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4621-4622',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:300 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4622',
        any: [
          /^\s*CFLAG:300 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4622-4623',
        any: [
          /^\s*CFLAG:300 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4629-4882',
        any: [
          /^\s*@SELF_KOJO_K14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;調教後自慰 CFLAG:261\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF TFLAG:13 == 1\s*$\n^\s*;崩壊してしまった場合\s*$\n^\s*IF TALENT:9 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛がなくかつ助手とのレズセックス後ならレズっ気×20%で助手\s*$\n^\s*ELSEIF Q == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4633',
        any: [
          /^\s*IF TFLAG:13 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4635',
        any: [
          /^\s*IF TALENT:9 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4636',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4638',
        any: [
          /^\s*ELSEIF Q == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4639',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4641',
        any: [
          /^\s*ELSEIF Q == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4642',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4644-4646',
        any: [
          /^\s*ELSE\s*$\n^\s*;淫乱\s*$\n^\s*IF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4646',
        any: [
          /^\s*IF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4647',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4648',
        any: [
          /^\s*CFLAG:261 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4650',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4651',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4652',
        any: [
          /^\s*CFLAG:261 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4654',
        any: [
          /^\s*ELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4655',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4656',
        any: [
          /^\s*CFLAG:261 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4658',
        any: [
          /^\s*ELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4659',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4660',
        any: [
          /^\s*CFLAG:261 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4660-4661',
        any: [
          /^\s*CFLAG:261 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4660-4662',
        any: [
          /^\s*CFLAG:261 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4660-4663',
        any: [
          /^\s*CFLAG:261 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4668',
        any: [
          /^\s*IF TFLAG:13 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4670',
        any: [
          /^\s*IF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4671',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4672',
        any: [
          /^\s*CFLAG:262 = 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4674',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4675',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4676',
        any: [
          /^\s*CFLAG:262 = 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4678',
        any: [
          /^\s*ELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4679',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4680',
        any: [
          /^\s*CFLAG:262 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4682',
        any: [
          /^\s*ELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4683',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4684',
        any: [
          /^\s*CFLAG:262 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4686',
        any: [
          /^\s*ELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4687',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4688',
        any: [
          /^\s*CFLAG:262 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4688-4689',
        any: [
          /^\s*CFLAG:262 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4688-4690',
        any: [
          /^\s*CFLAG:262 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4695',
        any: [
          /^\s*IF TFLAG:13 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4697',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4698',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4699',
        any: [
          /^\s*CFLAG:263 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4701',
        any: [
          /^\s*ELSEIF TALENT:85 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4702',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4703',
        any: [
          /^\s*CFLAG:263 = 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4705',
        any: [
          /^\s*ELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4706',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4707',
        any: [
          /^\s*CFLAG:263 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4709',
        any: [
          /^\s*ELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4710',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4711',
        any: [
          /^\s*CFLAG:263 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4711-4712',
        any: [
          /^\s*CFLAG:263 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4711-4713',
        any: [
          /^\s*CFLAG:263 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4718',
        any: [
          /^\s*IF TFLAG:13 == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4720',
        any: [
          /^\s*IF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4721',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4722',
        any: [
          /^\s*CFLAG:264 = 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4724',
        any: [
          /^\s*ELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4725',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4726',
        any: [
          /^\s*CFLAG:264 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4726-4727',
        any: [
          /^\s*CFLAG:264 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4726-4728',
        any: [
          /^\s*CFLAG:264 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4733',
        any: [
          /^\s*IF TFLAG:13 == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4734',
        any: [
          /^\s*IF CFLAG:265 < 1 \|\| FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4735',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4736',
        any: [
          /^\s*CFLAG:265 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4736-4737',
        any: [
          /^\s*CFLAG:265 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4736-4738',
        any: [
          /^\s*CFLAG:265 = 1\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4743',
        any: [
          /^\s*IF TFLAG:13 == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4745',
        any: [
          /^\s*IF TALENT:85 && MARK:3 < 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4746',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4748',
        any: [
          /^\s*ELSEIF MARK:3 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4749',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4751',
        any: [
          /^\s*ELSEIF TALENT:76\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4751-4754',
        any: [
          /^\s*ELSEIF TALENT:76\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4751-4756',
        any: [
          /^\s*ELSEIF TALENT:76\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4752',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4755',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4757-4761',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;妊娠発覚 CFLAG:271\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4764',
        any: [
          /^\s*IF TFLAG:13 == 11\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4765-4766',
        any: [
          /^\s*SIF CFLAG:271 >= 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4768',
        any: [
          /^\s*IF TALENT:9 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4769',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4771',
        any: [
          /^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4772',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4774-4777',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:271 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4775',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4776-4777',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:271 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4777',
        any: [
          /^\s*CFLAG:271 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4777-4778',
        any: [
          /^\s*CFLAG:271 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4784',
        any: [
          /^\s*IF TFLAG:13 == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4785-4786',
        any: [
          /^\s*SIF CFLAG:272 >= 1\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4788',
        any: [
          /^\s*IF TALENT:9 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4789',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4791',
        any: [
          /^\s*ELSEIF TALENT:85 && CFLAG:102 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4792',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4794-4797',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*CFLAG:272 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4795',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4796-4797',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:272 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4797',
        any: [
          /^\s*CFLAG:272 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4797-4798',
        any: [
          /^\s*CFLAG:272 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4803',
        any: [
          /^\s*IF TFLAG:13 == 13\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4805',
        any: [
          /^\s*IF TALENT:153\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4806',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4808',
        any: [
          /^\s*ELSEIF TALENT:154\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4809',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4810-4811',
        any: [
          /^\s*ENDIF\s*$\n^\s*CFLAG:273 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4811',
        any: [
          /^\s*CFLAG:273 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4811-4812',
        any: [
          /^\s*CFLAG:273 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4817',
        any: [
          /^\s*IF TFLAG:13 == 14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4818',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4819',
        any: [
          /^\s*CFLAG:274 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4819-4820',
        any: [
          /^\s*CFLAG:274 = 1\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4825',
        any: [
          /^\s*IF TFLAG:13 == 999\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4825-4830',
        any: [
          /^\s*IF TFLAG:13 == 999\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:85\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4827',
        any: [
          /^\s*IF TALENT:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4828',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4831',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4832-4836',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;寿命による消滅\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4833-4836',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;寿命による消滅\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4838',
        any: [
          /^\s*IF TFLAG:13 == 998\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4838-4843',
        any: [
          /^\s*IF TFLAG:13 == 998\s*$\n^\s*;愛\s*$\n^\s*IF TALENT:85\s*$\n^\s*PRINTFORMW\s*$\n^\s*;それ以外\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4840',
        any: [
          /^\s*IF TALENT:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4841',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4844',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4845-4849',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*;--------------------------------------------------\s*$\n^\s*;フラグ初期化\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4846-4849',
        any: [
          /^\s*ENDIF\s*$\n^\s*;--------------------------------------------------\s*$\n^\s*;フラグ初期化\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4851',
        any: [
          /^\s*TFLAG:13 = 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4851-4853',
        any: [
          /^\s*TFLAG:13 = 0\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4884-5037',
        any: [
          /^\s*@DUNGEON_RYOUZYOKU_K14\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4886-4898',
        any: [
          /^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4886-4923',
        any: [
          /^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$\n^\s*;プライド低い・貞操無頓着・恥薄いなら身体を売って命乞いをする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4886-4928',
        any: [
          /^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$\n^\s*;プライド低い・貞操無頓着・恥薄いなら身体を売って命乞いをする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4886-4929',
        any: [
          /^\s*;ダンジョンで陵辱される前の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$\n^\s*;プライド低い・貞操無頓着・恥薄いなら身体を売って命乞いをする\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4889',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4891',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4893',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4896',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4899',
        any: [
          /^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4902',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4906',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4910',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4912',
        any: [
          /^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4916',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4918',
        any: [
          /^\s*ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4921',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4926',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4931',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4933',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4936',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4938-4974',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$\n^\s*;プライド低い・貞操無頓着・恥薄いなら身体を売って命乞いをする\s*$\n^\s*PRINTFORMW\s*$\n^\s*;A敏感もしくはA経験有りならならアナルを使うことを提案する\s*$\n^\s*SIF TALENT:106 == 1 \|\| EXP:1 > 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*;フェラ経験有りならなら口での奉仕をアピールする\s*$\n^\s*SIF EXP:22 > 0\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4939',
        any: [
          /^\s*ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4942',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4946',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4950',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4952',
        any: [
          /^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4956',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4958',
        any: [
          /^\s*ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4961',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4963-4974',
        any: [
          /^\s*ELSE\s*$\n^\s*;その他何か適当に性格によって\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*@DUNGEON_RYOUZYOKU_AFTER_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4966',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4968-4974',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*@DUNGEON_RYOUZYOKU_AFTER_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4969-4974',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*@DUNGEON_RYOUZYOKU_AFTER_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4971-4974',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------------\s*$\n^\s*@DUNGEON_RYOUZYOKU_AFTER_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4976-4988',
        any: [
          /^\s*;ダンジョンで陵辱された後の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4976-4989',
        any: [
          /^\s*;ダンジョンで陵辱された後の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4976-4995',
        any: [
          /^\s*;ダンジョンで陵辱された後の一言\s*$\n^\s*IF TALENT:0 == 1\s*$\n^\s*;処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;アナルを弄られすぎた感想\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4979',
        any: [
          /^\s*IF TALENT:0 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4981',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4983',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4986',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4992',
        any: [
          /^\s*IF EXP:1 > 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4993',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4994',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '4999',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5003',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5004-5016',
        any: [
          /^\s*ELSE\s*$\n^\s*;非処女\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;膣を苛められすぎた感想\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5006',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5008',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5011',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5013-5016',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;膣を苛められすぎた感想\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5014-5016',
        any: [
          /^\s*ENDIF\s*$\n^\s*;膣を苛められすぎた感想\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5017',
        any: [
          /^\s*IF EXP:0 > 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5017-5020',
        any: [
          /^\s*IF EXP:0 > 20\s*$\n^\s*PRINTFORMW\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5017-5026',
        any: [
          /^\s*IF EXP:0 > 20\s*$\n^\s*PRINTFORMW\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*;アナルを弄られすぎた感想\s*$\n^\s*IF EXP:1 > 20\s*$\n^\s*PRINTFORMW\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5018',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5019',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5023',
        any: [
          /^\s*IF EXP:1 > 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5024',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5025',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5030',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5034',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5035-5039',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@BENKI_KOUJO_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5037-5039',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@BENKI_KOUJO_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5039-5271',
        any: [
          /^\s*@BENKI_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;肉便器口上。キャラはA\s*$\n^\s*;FLAG:62を使用。行動の詳細はBENKI\.ERBで\s*$\n^\s*;FLAG:62 = 0 最下層モンスター奉仕\s*$\n^\s*;FLAG:62 = 1 レズ便器\s*$\n^\s*;FLAG:62 = 2 獣姦便器\s*$\n^\s*;FLAG:62 = 3 両穴便器\s*$\n^\s*;FLAG:62 = 4 膣便器\s*$\n^\s*;FLAG:62 = 5 アナル便器\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5058',
        any: [
          /^\s*IF FLAG:62 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5061',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5062',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5064',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5065',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5067',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5068',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5070',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5071',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5073',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5074',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5076-5079',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF FLAG:62 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5077',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5078-5079',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF FLAG:62 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5079',
        any: [
          /^\s*ELSEIF FLAG:62 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5082',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5083',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5085',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5086',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5088',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5089',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5091',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5092',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5094',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5095',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5097-5100',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF FLAG:62 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5098',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5099-5100',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF FLAG:62 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5100',
        any: [
          /^\s*ELSEIF FLAG:62 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5103',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5104',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5106',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5107',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5109',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5110',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5112',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5113',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5115',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5116',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5118-5121',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5119',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5120-5121',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5121',
        any: [
          /^\s*ELSEIF  FLAG:62 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5124',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5125',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5127',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5128',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5130',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5131',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5133',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5134',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5136-5139',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5137',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5138-5139',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5139',
        any: [
          /^\s*ELSEIF  FLAG:62 == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5142',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5143',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5145',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5146',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5148',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5149',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5151',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5152',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5154-5157',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5155',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5156-5157',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5157',
        any: [
          /^\s*ELSEIF  FLAG:62 == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5160',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5160-5175',
        any: [
          /^\s*IF FLAG:63 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;常識改変\(オトコ\)\s*$\n^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;淫乱\s*$\n^\s*ELSEIF TALENT:A:76 == 1\s*$\n^\s*PRINTFORMW\s*$\n^\s*;愛\s*$\n^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5161',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5163',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5164',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5166',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5167',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5169',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5170',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5172',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5173',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5175-5178',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5176',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5177-5178',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5178',
        any: [
          /^\s*ELSEIF  FLAG:62 == 6\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5181',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5182',
        any: [
          /^\s*PRINTFORM\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5184',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5185',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5187',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5188',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5190',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5191',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5193',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5194',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5196-5199',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5197',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5198-5199',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5199',
        any: [
          /^\s*ELSEIF  FLAG:62 == 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5202',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5203',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5205',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5206',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5208',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5209',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5211',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5212',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5214',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5215',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5217-5220',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5218',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5219-5220',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5220',
        any: [
          /^\s*ELSEIF  FLAG:62 == 9\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5223',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5224',
        any: [
          /^\s*PRINTFORMW 「啊、那个…元冒险者的%SAVESTR:TARGET%、来着」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5225',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(A\)%败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5226',
        any: [
          /^\s*PRINTFORMW 「然后啊、今天啊…是要让大家『看看原生态的%SELF_CALL\(A\)%』啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5227',
        any: [
          /^\s*PRINTFORMW 「虽然看『男人的身体』也没啥意思啦…但是%SELF_CALL\(A\)%会竭尽全力的、请好好看着咯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5229',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5230',
        any: [
          /^\s*PRINTFORMW 「啊、那个…元冒险者的%SAVESTR:TARGET%、来着」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5231',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(A\)%败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5232',
        any: [
          /^\s*PRINTFORMW 「然后啊、今天啊…是要让大家『看看原生态的%SELF_CALL\(A\)%』啊…」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5233',
        any: [
          /^\s*PRINTFORMW 「虽然看『男人的身体』也没啥意思啦…但是%SELF_CALL\(A\)%会竭尽全力的、请好好看着咯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5235',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5236',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5238',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5239',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5241',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5242',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5244-5247',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5245',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5246-5247',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSEIF  FLAG:62 == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5247',
        any: [
          /^\s*ELSEIF  FLAG:62 == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5250',
        any: [
          /^\s*IF FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5251',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5253',
        any: [
          /^\s*ELSEIF TALENT:TARGET:122 && FLAG:63 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5254',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5256',
        any: [
          /^\s*ELSEIF TALENT:A:76 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5257',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5259',
        any: [
          /^\s*ELSEIF TALENT:A:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5260',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5262',
        any: [
          /^\s*ELSEIF ABL:A:16 >= 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5263',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5265-5273',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@DUNGEON_VICTORY_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5266',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5267-5273',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@DUNGEON_VICTORY_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5268-5273',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@DUNGEON_VICTORY_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5270-5273',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@DUNGEON_VICTORY_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5273-5326',
        any: [
          /^\s*@DUNGEON_VICTORY_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;戦闘勝利時\s*$\n^\s*;決め台詞\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW 「……哈」\s*$\n^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5273-5414',
        any: [
          /^\s*@DUNGEON_VICTORY_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;戦闘勝利時\s*$\n^\s*;決め台詞\s*$\n^\s*PRINTFORMW\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW 「……哈」\s*$\n^\s*RETURN 0\s*$\n^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5278',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5280',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5283',
        any: [
          /^\s*PRINTFORMW 「……哈」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5283-5285',
        any: [
          /^\s*PRINTFORMW 「……哈」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5286',
        any: [
          /^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5289',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5290',
        any: [
          /^\s*PRINTFORMW 「……真是污秽」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5291',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5292',
        any: [
          /^\s*PRINTFORMW 「魔力什么的，没有必要」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5292-5293',
        any: [
          /^\s*PRINTFORMW 「魔力什么的，没有必要」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5294',
        any: [
          /^\s*PRINTFORMW 「消灭了吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5294-5295',
        any: [
          /^\s*PRINTFORMW 「消灭了吗」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5297',
        any: [
          /^\s*ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1\s*$/m,
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
        ref: '5300-5302',
        any: [
          /^\s*PRINTFORMW 「魔の力、これほどとは……」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5300-5303',
        any: [
          /^\s*PRINTFORMW 「魔の力、これほどとは……」\s*$\n^\s*RETURN 0\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5306',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5307',
        any: [
          /^\s*PRINTFORMW 「这是光明的胜利！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5308',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5309',
        any: [
          /^\s*PRINTFORMW 「光明不灭！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5309-5310',
        any: [
          /^\s*PRINTFORMW 「光明不灭！」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5311',
        any: [
          /^\s*PRINTFORMW 「怎么可能输给不净之物……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5311-5312',
        any: [
          /^\s*PRINTFORMW 「怎么可能输给不净之物……」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5314-5316',
        any: [
          /^\s*ENDIF\s*$\n^\s*IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5316',
        any: [
          /^\s*IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5318',
        any: [
          /^\s*PRINTFORMW （果不其然，真是强大……）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5318-5319',
        any: [
          /^\s*PRINTFORMW （果不其然，真是强大……）\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5321',
        any: [
          /^\s*PRINTFORMW 「不净的力量，抹杀之」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5321-5322',
        any: [
          /^\s*PRINTFORMW 「不净的力量，抹杀之」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5321-5324',
        any: [
          /^\s*PRINTFORMW 「不净的力量，抹杀之」\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5327-5411',
        any: [
          /^\s*@DUNGEON_ATTACK_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;攻撃時のセリフ\s*$\n^\s*;最初に一言\s*$\n^\s*IF CFLAG:1 == 2\s*$\n^\s*;侵攻中\s*$\n^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW 「……准备咯」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5332',
        any: [
          /^\s*IF CFLAG:1 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5334',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5337',
        any: [
          /^\s*PRINTFORMW 「……准备咯」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5337-5339',
        any: [
          /^\s*PRINTFORMW 「……准备咯」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5340',
        any: [
          /^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5343',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5344',
        any: [
          /^\s*PRINTFORMW 「怪物！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5345',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5346',
        any: [
          /^\s*PRINTFORMW 「不净之物！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5346-5347',
        any: [
          /^\s*PRINTFORMW 「不净之物！」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5348',
        any: [
          /^\s*PRINTFORMW 「……消失吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5348-5349',
        any: [
          /^\s*PRINTFORMW 「……消失吧！」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5351',
        any: [
          /^\s*ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5354',
        any: [
          /^\s*PRINTFORMW 「切，不净之物……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5354-5356',
        any: [
          /^\s*PRINTFORMW 「切，不净之物……」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5354-5357',
        any: [
          /^\s*PRINTFORMW 「切，不净之物……」\s*$\n^\s*RETURN 0\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5360',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5361',
        any: [
          /^\s*PRINTFORMW 「毁灭吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5362',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5363',
        any: [
          /^\s*PRINTFORMW 「可不能输！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5363-5364',
        any: [
          /^\s*PRINTFORMW 「可不能输！」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5365',
        any: [
          /^\s*PRINTFORMW 「光明啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5365-5366',
        any: [
          /^\s*PRINTFORMW 「光明啊！」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5368-5370',
        any: [
          /^\s*ENDIF\s*$\n^\s*ELSE\s*$\n^\s*;その他・迎撃中\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5369-5370',
        any: [
          /^\s*ELSE\s*$\n^\s*;その他・迎撃中\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5371',
        any: [
          /^\s*IF TALENT:21 == 1 \|\| TALENT:22 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5374',
        any: [
          /^\s*PRINTFORMW 「……准备咯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5374-5376',
        any: [
          /^\s*PRINTFORMW 「……准备咯♪」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5377',
        any: [
          /^\s*ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5380',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5381',
        any: [
          /^\s*PRINTFORMW 「这就是魔力吗！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5382',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5383',
        any: [
          /^\s*PRINTFORMW 「真是美妙的力量……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5383-5384',
        any: [
          /^\s*PRINTFORMW 「真是美妙的力量……」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5385',
        any: [
          /^\s*PRINTFORMW 「好强……竟可以强成这样，魔力真是……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5385-5386',
        any: [
          /^\s*PRINTFORMW 「好强……竟可以强成这样，魔力真是……」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5388',
        any: [
          /^\s*ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5391',
        any: [
          /^\s*PRINTFORMW 「切，魔力开始侵蚀了吗……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5391-5393',
        any: [
          /^\s*PRINTFORMW 「切，魔力开始侵蚀了吗……」\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5391-5394',
        any: [
          /^\s*PRINTFORMW 「切，魔力开始侵蚀了吗……」\s*$\n^\s*RETURN 0\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5397',
        any: [
          /^\s*IF RAND:3 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5398',
        any: [
          /^\s*PRINTFORMW 「消失吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5399',
        any: [
          /^\s*ELSEIF RAND:2 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5400',
        any: [
          /^\s*PRINTFORMW 「黑暗啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5400-5401',
        any: [
          /^\s*PRINTFORMW 「黑暗啊！」\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5402',
        any: [
          /^\s*PRINTFORMW 「堕入黑暗吧……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5402-5403',
        any: [
          /^\s*PRINTFORMW 「堕入黑暗吧……」\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5402-5405',
        any: [
          /^\s*PRINTFORMW 「堕入黑暗吧……」\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5402-5406',
        any: [
          /^\s*PRINTFORMW 「堕入黑暗吧……」\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5410-5413',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;@COLOSSEUM_KOJO関係（X1をキャラ番号に置換）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5416-5519',
        any: [
          /^\s*@COLOSSEUM_KOJO_14\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;何もしない\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 55\s*$\n^\s*;気力０以下\s*$\n^\s*IF BASE:1 <= 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5420',
        any: [
          /^\s*IF SELECTCOM == 55\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5422',
        any: [
          /^\s*IF BASE:1 <= 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5423',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5424-5430',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;会話する\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5425',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5426-5430',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;会話する\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5427-5430',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;会話する\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5428-5430',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;会話する\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5430-5438',
        any: [
          /^\s*;会話する\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;気力０以下\s*$\n^\s*IF BASE:1 <= 0\s*$\n^\s*;助手が調教中の場合\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5430-5440',
        any: [
          /^\s*;会話する\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;気力０以下\s*$\n^\s*IF BASE:1 <= 0\s*$\n^\s*;助手が調教中の場合\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5430-5441',
        any: [
          /^\s*;会話する\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 56\s*$\n^\s*;気力０以下\s*$\n^\s*IF BASE:1 <= 0\s*$\n^\s*;助手が調教中の場合\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5432',
        any: [
          /^\s*IF SELECTCOM == 56\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5434',
        any: [
          /^\s*IF BASE:1 <= 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5436',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5437',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5439',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5443',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5444',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5445-5453',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5446',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5447-5453',
        any: [
          /^\s*ENDIF\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5448-5453',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5449-5453',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5450-5453',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;フェラチオ\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5453-5459',
        any: [
          /^\s*;フェラチオ\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 31\s*$\n^\s*;助手が調教中の場合\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5455',
        any: [
          /^\s*IF SELECTCOM == 31\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5457',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5458',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5460',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5461-5465',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;胸愛撫\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5462-5465',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;胸愛撫\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5463-5465',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;胸愛撫\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5465-5471',
        any: [
          /^\s*;胸愛撫\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 5\s*$\n^\s*;助手が調教中の場合\s*$\n^\s*IF ASSI > 0 && ASSIPLAY\s*$\n^\s*PRINTFORMW\s*$\n^\s*ELSE\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5467',
        any: [
          /^\s*IF SELECTCOM == 5\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5469',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5470',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5472',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5473-5477',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5474-5477',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5475-5477',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5479',
        any: [
          /^\s*IF SELECTCOM == 21\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5481',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5482',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5484',
        any: [
          /^\s*ELSEIF TFLAG:400 == 206\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5485',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5486-5493',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位アナル\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5487',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5488-5493',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位アナル\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5489-5493',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位アナル\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5490-5493',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;後背位アナル\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5495',
        any: [
          /^\s*IF SELECTCOM == 27\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5497',
        any: [
          /^\s*IF ASSI > 0 && ASSIPLAY\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5498',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5500',
        any: [
          /^\s*ELSEIF TFLAG:400 == 206\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5501',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5502-5509',
        any: [
          /^\s*ELSE\s*$\n^\s*PRINTFORMW\s*$\n^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;媚薬スライム（しあわせ草）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5503',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5504-5509',
        any: [
          /^\s*ENDIF\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;媚薬スライム（しあわせ草）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5505-5509',
        any: [
          /^\s*RETURN 0\s*$\n^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;媚薬スライム（しあわせ草）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5506-5509',
        any: [
          /^\s*ENDIF\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*;媚薬スライム（しあわせ草）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5509-5513',
        any: [
          /^\s*;媚薬スライム（しあわせ草）\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 51\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5509-5514',
        any: [
          /^\s*;媚薬スライム（しあわせ草）\s*$\n^\s*;-------------------------------------------------\s*$\n^\s*IF SELECTCOM == 51\s*$\n^\s*PRINTFORMW\s*$\n^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5511',
        any: [
          /^\s*IF SELECTCOM == 51\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5512',
        any: [
          /^\s*PRINTFORMW\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5517-5521',
        any: [
          /^\s*RETURN 0\s*$\n^\s*;-----------------------------------\s*$\n^\s*@NTR_KOUJO_K14\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5521-5596',
        any: [
          /^\s*@NTR_KOUJO_K14\s*$\n^\s*;プレイ内容はNTR\.ERBを参照してください。\s*$\n^\s*;-----------------------------------\s*$\n^\s*;NTRフラグ\s*$\n^\s*SIF CFLAG:650 == 0\s*$\n^\s*CFLAG:650 = 1\s*$\n^\s*;処女喪失\s*$\n^\s*IF P == 1\s*$\n^\s*;陥落済\s*$\n^\s*IF TALENT:76 \|\| TALENT:85\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5598-5710',
        any: [
          /^\s*@EXUCUTION_KOUJO_K14\s*$\n^\s*;処刑内容はEXUCUTION\.ERBを参照してください。\s*$\n^\s*;-----------------------------------\s*$\n^\s*;肉便器刑\s*$\n^\s*IF TFLAG:16 == 2\s*$\n^\s*PRINTFORMW\s*$\n^\s*;戦闘員化\s*$\n^\s*ELSEIF TFLAG:16 == 5\s*$\n^\s*PRINTFORMW\s*$\n^\s*;晒し台刑\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5712-5728',
        any: [
          /^\s*@ENTERENEMY_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;ダンジョン攻略開始時\s*$\n^\s*IF TALENT:A:21 == 1 \|\| TALENT:A:22 == 1\s*$\n^\s*;無関心・感情乏しいなら何か言って終了\s*$\n^\s*PRINTFORMW 「魔王……」\s*$\n^\s*ELSEIF TALENT:A:11 == 1 \|\| TALENT:A:12 == 1 \|\| TALENT:A:15 == 1 \|\| TALENT:A:30 == 1 \|\| TALENT:A:34 == 1\s*$\n^\s*;反抗的・気丈・プライド高い・貞操観念・抵抗\s*$\n^\s*PRINTFORMW 「魔王！　不可原谅！」\s*$\n^\s*ELSEIF TALENT:A:10 == 1 \|\| TALENT:A:26 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5730-5846',
        any: [
          /^\s*@GOHOUBI_REQUEST_KOUJO_K14\s*$\n^\s*;-----------------------------------\s*$\n^\s*;迎撃時のご褒美要求\s*$\n^\s*IF CFLAG:A:504 == 0\s*$\n^\s*;お金\s*$\n^\s*PRINTFORMW %SAVESTR:A%提出了想要钱当报酬。\s*$\n^\s*ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3\s*$\n^\s*;獣姦要求\s*$\n^\s*PRINTFORM %SAVESTR:A%提出了想要和\s*$\n^\s*IF CFLAG:A:504 == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5848-5909',
        any: [
          /^\s*@OSIOKI_KOUJO_K14\s*$\n^\s*;-----------------------------\s*$\n^\s*;迎撃失敗時のおしおき\s*$\n^\s*;DUNGEON_AFTER\.ERBを参照\s*$\n^\s*;何もしない\s*$\n^\s*IF TFLAG:18 == 0\s*$\n^\s*PRINTFORMW\s*$\n^\s*;弱電気椅子刑\s*$\n^\s*ELSEIF TFLAG:18 == 1\s*$\n^\s*;マゾっ気Lv3以上\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K14_貴公子.ERB',
        ref: '5911-5944',
        any: [
          /^\s*@GOBI_KOUJO_K14, ARG:0\s*$\n^\s*;-----------------------------\s*$\n^\s*IF ARG:0 == 1\s*$\n^\s*;喜んで誇らしげに\s*$\n^\s*PRINTFORM 哦~♪\s*$\n^\s*ELSEIF ARG:0 == 2\s*$\n^\s*;怒って\s*$\n^\s*PRINTFORM 哦！\s*$\n^\s*ELSEIF ARG:0 == 3\s*$\n^\s*;悲しんで\s*$/m,
        ],
      },
    ],
  },
];
export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
