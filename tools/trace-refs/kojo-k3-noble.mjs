// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k3-noble.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k3-noble.js',
    refs: [
      // —— #234（J24 口上·K3 高貴）：台词/写入/条件行号；ENDIF/ELSE/RETURN 0/DRAWLINE 不保留锚。空 PRINTFORM 因保真锁 A 必须留行锚（锁力在行号，不在正文） ——
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '81-85',
        any: [/FLAG:103\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '87-89',
        any: [/FLAG:103\ =\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '887',
        any: [/@KOJO_MESSAGE_COM_3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '888-912',
        any: [/SIF\ TEQUIP:45\ \&\&\ SELECTCOM\ !=\ 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '920-1105',
        any: [
          /PRINTFORMW\ 被变化带来的快乐的波浪玩弄、%SAVESTR:TARGET%先前还用憎恨的眼神看着%SAVESTR:PLAYER%、而现在眼睛却湿润了起来，依靠着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1097',
        any: [
          /PRINTFORMW\ 「哈呜、%SAVESTR:TARGET%、可是，一心地，想要杀了…嗯、为什么、那么地……啊\~、这么…温柔地…啊、啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1110-1147',
        any: [
          /PRINTFORMW\ 「请更加地…欺负%SAVESTR:TARGET%的小穴吧\~…将変態%SAVESTR:TARGET%的小穴弄得乱七八糟的吧啊啊\~！%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1152-1197',
        any: [
          /PRINTFORMW\ 「嗯啊\~……哈啊嗯\~%UNICODE\(0x2661\)\ \*1%　指尖在…嗯\~…在挖着…啊\~%UNICODE\(0x2661\)\ \*1%这个嗯\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1202-1323',
        any: [
          /PRINTFORMW\ 「这个手指…这个手指如果是主人的大鸡巴的话%UNICODE\(0x2661\)\ \*1%　就会…就会变地更加舒服起来了呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1328-1406',
        any: [
          /PRINTFORMW\ 「啊嗯\~…可以的哦\~…请再喝更多一点吧…%SELF_CALL\(TARGET\)%的可爱的大人………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1412-1517',
        any: [
          /PRINTFORMW\ 「！…怎，怎么能…那么卑鄙…让%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%自己来做什么的…唔…呜呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '918',
        any: [/;爱撫\ CFLAG:301/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '978',
        any: [
          /;;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1022',
        any: [
          /;;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1053',
        any: [
          /;;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '83',
        any: [/FLAG:103\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '84-85',
        any: [/FLAG:7\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '89',
        any: [/FLAG:103\ =\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '887-1105',
        any: [
          /PRINTFORMW\ 被变化带来的快乐的波浪玩弄、%SAVESTR:TARGET%先前还用憎恨的眼神看着%SAVESTR:PLAYER%、而现在眼睛却湿润了起来，依靠着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '888-892',
        any: [/IF\ TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '894-895',
        any: [/SIF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '897-898',
        any: [/SIF\ TEQUIP:45\ \&\&\ SELECTCOM\ !=\ 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '900-901',
        any: [/SIF\ TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '903-906',
        any: [/IF\ TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '908-909',
        any: [/SIF\ TALENT:TARGET:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '911-912',
        any: [/SIF\ TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '920',
        any: [/IF\ SELECTCOM\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '921-931',
        any: [
          /PRINTFORMW\ 「嗯呼嗯\~…啊\~…呃\~…请更加温柔…一…点……哈啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '923-929',
        any: [
          /PRINTFORMW\ 「嗯呼嗯\~…啊\~…呃\~…请更加温柔…一…点……哈啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '925',
        any: [
          /PRINTFORMW\ 「嗯呼嗯\~…啊\~…呃\~…请更加温柔…一…点……哈啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '928',
        any: [/PRINTFORMW\ 「不，不要触摸…呃呜…呜呃呜\~\~\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '930',
        any: [/CFLAG:301\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '932-1104',
        any: [
          /PRINTFORMW\ 被变化带来的快乐的波浪玩弄、%SAVESTR:TARGET%先前还用憎恨的眼神看着%SAVESTR:PLAYER%、而现在眼睛却湿润了起来，依靠着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '934-953',
        any: [
          /PRINTFORMW\ 「啊哈啊嗯\~…%UNICODE\(0x2661\)\ \*1%\ 好棒……果然,主人的手指，真的好美妙啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '936',
        any: [/;;ランダムで口上が変化する/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '938',
        any: [
          /PRINTFORMW\ 「呜哈嗯啊\~…主人\~…请更加摩擦那里吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '939',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%张开自己的双腿，诱导着%SAVESTR:PLAYER%的手………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '940',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的身体是…被下流的抚摸了的话…就会热得要燃烧起来了%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '941',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%淫乱地蠕动着身体、接受着%SAVESTR:PLAYER%的爱抚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '943',
        any: [
          /PRINTFORMW\ 「啊、啊啊\~……主人\~…这里、这里\~……请用、主人的手指来、好好地欺负一下\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '944',
        any: [
          /PRINTFORML\ %SAVESTR:PLAYER%开始爱抚后、%SAVESTR:TARGET%立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '945',
        any: [
          /PRINTFORMW\ 慢慢将手靠近蜜穴后、期待让%SAVESTR:TARGET%的腰部颤抖了起来、呼吸变得凌乱了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '946',
        any: [
          /PRINTFORMW\ 「啊哈啊嗯\~…%UNICODE\(0x2661\)\ \*1%\ 好棒……果然,主人的手指，真的好美妙啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '948',
        any: [
          /PRINTFORMW\ 「啊嗯\~、嗯\~、呜\~…！更、更多、激烈地…更多、请更加粗暴地做吧\~……啊\~、啊、啊……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '949',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%将生来的高贵姿态完全扔掉了，不像样的将双脚敞开、沉醉在了%SAVESTR:PLAYER%的爱抚之下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '950',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%只是贪图着给予的快乐而已、如同用淫猥之声演奏的乐器一样，娇喘的音高随着爱抚的手指动作而一上一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '951',
        any: [
          /PRINTFORMW\ 「啊啊\~！请将%SELF_CALL\(TARGET\)%下流的身体、玩弄地翻来覆去吧……\.\.\.\.\.\.\.\.直到坏掉为止\.\.\.\.\.\.！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '953',
        any: [/CFLAG:301\ =\ 600/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '955-975',
        any: [
          /PRINTFORMW\ 为了感受到更加强烈的刺激而将%SAVESTR:PLAYER%手用力地向下压、还轻轻地用手指对%SAVESTR:PLAYER%的手背爱抚着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '956',
        any: [/;;ランダムで口上が変化する/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '958',
        any: [
          /PRINTFORMW\ 「啊\~…嗯\~…%SAVESTR:PLAYER%太…太过温柔了…感觉有点害怕呀\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '959',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当被%NAME:MASTER%触摸后都会发出娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '960',
        any: [
          /PRINTFORMW\ 「啊啊…喜欢…喜欢的说…被做了这样的事情…%SELF_CALL\(TARGET\)%…已经\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '961',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的娇喘慢慢变成越来越急促的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '963',
        any: [
          /PRINTFORMW\ 「啊哈……啊啊、%SAVESTR:PLAYER%…请……更加地、用自己喜欢的方式来、抚摸吧\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '964',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%让%SAVESTR:PLAYER%更加容易抚摸而将脚张开，将身子靠向了你。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '965',
        any: [/PRINTFORML\ 还不仅仅如此、是为了更加感受到爱抚带来的刺激吧、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '966',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%的手触碰到的部位、都会向着手压过去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '967',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%的身体，已经变成仅仅是被%SAVESTR:PLAYER%大人抚摸就能感到无上的愉悦感的身体了……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '969',
        any: [
          /PRINTFORMW\ 「啊、啊嗯\~、%SAVESTR:PLAYER%大人的手……最喜欢的、最令人怜爱的手……哈啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '970',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%将自己的手放在了%SAVESTR:PLAYER%手的上方、开始对自己的身体爱抚了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '971',
        any: [
          /PRINTFORMW\ 为了感受到更加强烈的刺激而将%SAVESTR:PLAYER%手用力地向下压、还轻轻地用手指对%SAVESTR:PLAYER%的手背爱抚着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '972',
        any: [
          /PRINTFORMW\ 「让%SELF_CALL\(TARGET\)%的心折服了的、残酷的手……教给%SELF_CALL\(TARGET\)%的身体、如何感受淫乐的温柔的手……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '973',
        any: [
          /PRINTFORMW\ 「呜啊\~、嗯\~…%SELF_CALL\(TARGET\)%会……任由这只手的摆布的……被这只手引导的话、不管堕落到哪里都愿意……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '975',
        any: [/CFLAG:301\ =\ 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '977-1019',
        any: [
          /PRINTFORMW\ 被变化带来的快乐的波浪玩弄、%SAVESTR:TARGET%先前还用憎恨的眼神看着%SAVESTR:PLAYER%、而现在眼睛却湿润了起来，依靠着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '980-988',
        any: [
          /PRINTFORMW\ 「啊\~…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的……身体……已经、太舒服了…完全……反抗不了了呀……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '982',
        any: [
          /PRINTFORMW\ 「啊\~…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的……身体……已经、太舒服了…完全……反抗不了了呀……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '983',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%发出了屈服宣言和喘息混合起来的娇喘，将身子托付给了正在爱抚的双手。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '984',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%稍微提高正在爱抚的手的力度后、就如同%SAVESTR:TARGET%自己所说的那样根本不反抗，直率地发出了大声的娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '985',
        any: [
          /PRINTFORMW\ 「啊哈\~…啊\~！啊、呜啊\~……！被，被这么地、爱抚的话…%SELF_CALL\(TARGET\)%要……啊哈呜\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '987',
        any: [
          /PRINTFORMW\ 「哈啊…啊\~…嗯\~…啊呃嗯\~…为、为什么…会那么舒服的…呢……啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '989',
        any: [/CFLAG:301\ =\ 401/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '991-1002',
        any: [
          /PRINTFORMW\ 「但，但是…如果可以做得到的话、请温柔地……%SELF_CALL\(TARGET\)%也会、害怕疼的……啊哈嗯、啊嗯\~…嗯嗯、嗯\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '993',
        any: [
          /PRINTFORMW\ 「啊、啊啊…为、为什么……嗯\~、为什么、这么……温柔地、抚摸呢……啊\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '994',
        any: [
          /PRINTFORML\ 被不停重复地给予着不太强烈，也不太弱的刺激、%SAVESTR:TARGET%全身的皮肤都冒出湿润的汗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '995',
        any: [
          /PRINTFORMW\ 蜜穴微微地渗出了水滴、用手指稍微粗鲁一点的话，便出现了哔啦哔啦的水声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '996',
        any: [
          /PRINTFORMW\ 「不要嗯\~…声音、怎么会……像这样、被弄出声音来…的话、嗯…快…快要羞死了%SELF_CALL\(TARGET\)%……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '998',
        any: [
          /PRINTFORMW\ 「啊…温柔的、抚摸的话……就不会、就不会抵抗了…啊\~！当、当然、其…其他的也……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '999',
        any: [
          /PRINTFORML\ 温柔地用手来回抚摸后、%SAVESTR:TARGET%为了更加享受抚摸带来的感觉的那样将眼睛闭上了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1000',
        any: [/PRINTFORMW\ 然后伴随着细微的喘息声、恍惚地喃喃自语着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1001',
        any: [
          /PRINTFORMW\ 「但，但是…如果可以做得到的话、请温柔地……%SELF_CALL\(TARGET\)%也会、害怕疼的……啊哈嗯、啊嗯\~…嗯嗯、嗯\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1003',
        any: [/CFLAG:301\ =\ 402/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1005',
        any: [
          /PRINTFORMW\ 「啊、啊嗯\~、啊……哈啊…哈啊……啊哈唔！？嗯\~、突、突然，变快的话……啊呼嗯呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1006',
        any: [
          /PRINTFORML\ 对于习惯了爱抚的速度、而放松了的%SAVESTR:TARGET%、突然加快了爱抚的速度。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1007',
        any: [
          /PRINTFORMW\ 被变化带来的快乐的波浪玩弄、%SAVESTR:TARGET%先前还用憎恨的眼神看着%SAVESTR:PLAYER%、而现在眼睛却湿润了起来，依靠着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1008',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~！嗯\~、那…那个手在……将%SELF_CALL\(TARGET\)%的身体、弄出了下流的声音了……啊、嗯…%SAVESTR:PLAYER%的…啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1009',
        any: [/CFLAG:301\ =\ 403/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1010-1019',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…啊啊啊\~…被、被这么地…这么地…爱抚了的话……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET,\ 1\)%、已经……嗯嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1013',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…啊啊啊\~…被、被这么地…这么地…爱抚了的话……%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET,\ 1\)%、已经……嗯嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1015',
        any: [
          /PRINTFORMW\ 「哼唔呜\~……！嗯呜\~！嗯\~嗯\~嗯\~！嗯呜呜\~……已经…太过舒服了、%SELF_CALL\(TARGET\)%要…啊啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1017',
        any: [
          /PRINTFORMW\ 「好、好棒……是的、那里……就是那里来的、那里\~……啊\~！那里、好舒服的啊\~……啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1021-1050',
        any: [
          /PRINTFORMW\ 「再，再这样下去的话……%SELF_CALL\(TARGET\)%…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%要……啊嗯\~、嗯\~…嗯哈呜嗯\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1024',
        any: [
          /PRINTFORMW\ 「哈呜呜嗯\~…嗯\~、嗯…不、不行…要、要忍不住了…啊\~、啊……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1025',
        any: [
          /PRINTFORML\ 只是稍微地给蜜穴挠了一下痒、%SAVESTR:TARGET%的身体就大幅度地颤抖起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1026',
        any: [
          /PRINTFORMW\ 是因为被铭刻在身体深处的愉悦的记忆被引出来了吧、颤抖着大声地娇喘起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1027',
        any: [
          /PRINTFORMW\ 「啊\~、啊……！不行\~、忍…忍不……忍不住……了啊…哈啊嗯\~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1028',
        any: [/CFLAG:301\ =\ 301/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1030',
        any: [
          /PRINTFORMW\ 「请，请原…哈呜啊\~！请原谅…嗯\~！原谅了……！再这样…再这样、被抚摸了的话……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1031',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%微弱地扭动着身体、想要尝试逃离%SAVESTR:PLAYER%的双手。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1032',
        any: [
          /PRINTFORMW\ 但是、被温柔地抚摸而失去了力气、又回到了%SAVESTR:PLAYER%的手的旁边将身体靠了过去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1033',
        any: [
          /PRINTFORMW\ 「请，请不要…改变……再这样下去、%SELF_CALL\(TARGET\)%就要…啊、这个……哼啊\~、那个…太舒服了……啊啊\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1034',
        any: [/CFLAG:301\ =\ 302/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1036',
        any: [
          /PRINTFORMW\ 「啊、啊啊…已经、不行……已经…忍…不住了……啊、嗯、啊啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1037',
        any: [
          /PRINTFORML\ 现在已经将厌恶感什么的给忘记了吧、%SAVESTR:TARGET%貌似习惯被触碰了的那样，将身体交给爱抚的双手。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1038',
        any: [
          /PRINTFORMW\ 双腿的绷紧的肌肉一跳一跳地、但是完全没有抵抗，只是快乐带来的反射而已，而且还从嘴边漏出了淫艳的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1039',
        any: [
          /PRINTFORMW\ 「再，再这样下去的话……%SELF_CALL\(TARGET\)%…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%要……啊嗯\~、嗯\~…嗯哈呜嗯\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1040',
        any: [/CFLAG:301\ =\ 303/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1042-1049',
        any: [
          /PRINTFORMW\ 「呀…！嗯\~、嗯呀\~……啊\~、忍…忍耐……啊哈\~！啊\~、啊\~啊\~……啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1044',
        any: [
          /PRINTFORMW\ 「呀…！嗯\~、嗯呀\~……啊\~、忍…忍耐……啊哈\~！啊\~、啊\~啊\~……啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1046',
        any: [
          /PRINTFORMW\ 「这\~、这样\~…嗯\~、明明被，当成玩具来…呼嗯\~、呜啊啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1048',
        any: [
          /PRINTFORMW\ 「哈\~、啊……啊\~、啊啊啊……！啊、呜啊\~、不要啊\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1052-1102',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%轻轻地抚摸了一下%SAVESTR:TARGET%紧紧闭着的眼皮子旁边后、%SAVESTR:TARGET%的身体颤抖起来，惊叫了一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1056-1066',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%大声地发出了困惑的声音，但是身体实实在在地对爱抚有所反应。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1057',
        any: [
          /PRINTFORMW\ 「啊嗯\~、嗯\~……明明…应该…感觉恶心来的……应该感觉、恶心来的呀…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1058',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%大声地发出了困惑的声音，但是身体实实在在地对爱抚有所反应。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1059',
        any: [
          /PRINTFORMW\ 如同在服从着%SAVESTR:PLAYER%的手指那样、摇摇晃晃地晃动着腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1060',
        any: [
          /PRINTFORMW\ 「嗯呜……呼\~、呜…不行……啊\~！明明、那么令人恶心……的事情……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1062-1063',
        any: [/PRINTFORMW\ 「哈呜…这样的…只是要忍耐而已…而已…嗯\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1065',
        any: [/PRINTFORMW\ 「感觉真恶心…不要在…这样…触，触碰了…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1067',
        any: [/CFLAG:301\ =\ 201/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1069-1078',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%轻轻地抚摸了一下%SAVESTR:TARGET%紧紧闭着的眼皮子旁边后、%SAVESTR:TARGET%的身体颤抖起来，惊叫了一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1071',
        any: [
          /PRINTFORMW\ 「不、不要啊…啊哈唔、呀\~…！不、不要摸啊……啊\~、啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1073',
        any: [
          /PRINTFORMW\ 「不是，说了、不要摸了没听到吗…嗯\~！说了不要摸了啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1075',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%将眼睛闭起来、安静地忍耐着爱抚带来的刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1076',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%轻轻地抚摸了一下%SAVESTR:TARGET%紧紧闭着的眼皮子旁边后、%SAVESTR:TARGET%的身体颤抖起来，惊叫了一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1077',
        any: [/PRINTFORMW\ 「啊呜…！呃呜、呜\~…怎、怎么……嗯嗯\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1078',
        any: [/CFLAG:301\ =\ 202/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1080-1091',
        any: [
          /PRINTFORMW\ 每次触碰都会让%SAVESTR:TARGET%的话语中断、身体颤抖起来喘息也变得急促起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1082',
        any: [/PRINTFORMW\ 「已，已经…啊\~！快、不要…啊啊！快住手吧……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1083',
        any: [
          /PRINTFORML\ 哪怕嘴上说着一堆拒绝的话语、%SAVESTR:TARGET%的瞳孔也因为快乐而湿润了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1084',
        any: [
          /PRINTFORMW\ 每次触碰都会让%SAVESTR:TARGET%的话语中断、身体颤抖起来喘息也变得急促起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1086',
        any: [
          /PRINTFORMW\ 「够、够了…嗯嗯\~……哼嗯\~、呜……请，请适可而止吧…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1087',
        any: [/PRINTFORML\ %SAVESTR:TARGET%的眼中、厌恶的神情并没有消失。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1088',
        any: [
          /PRINTFORMW\ 但是也没有压抑着住无情的爱抚带来的刺激、而从嘴边漏出了颤抖的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1090',
        any: [
          /PRINTFORMW\ 「为、为什么…啊\~、这…这样……这样的、事情……啊嗯\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1091',
        any: [/CFLAG:301\ =\ 203/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1093-1101',
        any: [
          /PRINTFORMW\ 「哈呜、%SAVESTR:TARGET%、可是，一心地，想要杀了…嗯、为什么、那么地……啊\~、这么…温柔地…啊、啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1095',
        any: [/PRINTFORMW\ 「呀…啊、不要啊……请、请快住手，停下来吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1099',
        any: [/PRINTFORMW\ 「嗯\~、嗯\~嗯\~……明明…说了、快住手了……啊嗯\~……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1110',
        any: [/IF\ SELECTCOM\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1112-1121',
        any: [
          /PRINTFORMW\ 「嗯啊啊\~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1114-1118',
        any: [
          /PRINTFORMW\ 「嗯啊啊\~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1115',
        any: [
          /PRINTFORMW\ 「嗯啊啊\~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1118',
        any: [/PRINTFORMW\ 「啊啊…怎么会…舌头…哈呜…啊\~…啊呜\~\~\~\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1120',
        any: [/CFLAG:302\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1123-1145',
        any: [
          /PRINTFORMW\ 「请更加地…欺负%SAVESTR:TARGET%的小穴吧\~…将変態%SAVESTR:TARGET%的小穴弄得乱七八糟的吧啊啊\~！%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1125',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1126',
        any: [
          /PRINTFORMW\ 「哈啊啊…更加地…更加地\.\.\.将小穴弄得更加黏糊糊地吧%UNICODE\(0x2661\)\ \*1%…更加地欺负小穴吧哈呜\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1127',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将%SAVESTR:PLAYER%的头按住晃动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1128',
        any: [
          /PRINTFORMW\ 「请更加地…欺负%SAVESTR:TARGET%的小穴吧\~…将変態%SAVESTR:TARGET%的小穴弄得乱七八糟的吧啊啊\~！%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1129',
        any: [/CFLAG:302\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1131',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1132',
        any: [
          /PRINTFORMW\ 「啊啊\~…那里明明…那么脏来的啊♪………不行…的啊…那么地…啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1133',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%哪怕耳朵红透了也好，也继续接受着%SAVESTR:PLAYER%的爱抚。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1134',
        any: [
          /PRINTFORMW\ 「嗯呜啊\~…哼啊啊啊！\~…腰要…腰要飘起来了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1135',
        any: [/CFLAG:302\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1137',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:302\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1138',
        any: [
          /PRINTFORMW\ 「呜啊\~…啊\~…呜呼啊\~…更加地…温柔地爱抚吧…哼唔啊\~…啊\~啊啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1139',
        any: [/CFLAG:302\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1141',
        any: [/ELSEIF\ CFLAG:302\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1142',
        any: [
          /PRINTFORMW\ 「不、不要…请停下来吧！哪怕舔这种地方也好…哼呜啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1143',
        any: [/CFLAG:302\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1152',
        any: [/IF\ SELECTCOM\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1160',
        any: [/P\ =\ PALAM:3\ \+\ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1154-1157',
        any: [/PRINTFORMW\ 「呜，呜哇啊！？那、那里是不行的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1155',
        any: [/PRINTFORMW\ 「呜，呜哇啊！？那、那里是不行的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1156',
        any: [/CFLAG:TARGET:303\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1159-1195',
        any: [
          /PRINTFORMW\ 「嗯啊\~……哈啊嗯\~%UNICODE\(0x2661\)\ \*1%　指尖在…嗯\~…在挖着…啊\~%UNICODE\(0x2661\)\ \*1%这个嗯\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1162',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ P\ >=\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1163',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%…啊\~%UNICODE\(0x2661\)\ \*1%…哈呜啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1164',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当被弯曲的手指来回扣着尻穴内壁时都会漏出欢喜的娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1165',
        any: [
          /PRINTFORMW\ 「尻穴小穴%UNICODE\(0x2661\)\ \*1%\ 更加玩弄尻穴吧\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1166',
        any: [/CFLAG:303\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1168',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ P\ <\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1169',
        any: [
          /PRINTFORMW\ 「嗯啊\~……哈啊嗯\~%UNICODE\(0x2661\)\ \*1%　指尖在…嗯\~…在挖着…啊\~%UNICODE\(0x2661\)\ \*1%这个嗯\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1170',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的尻穴虽然还没有完全湿润，不过手指越是抽插越能进入%SAVESTR:TARGET%的尻穴的深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1171',
        any: [
          /PRINTFORMW\ 「恩呜呜\~…更加地…%UNICODE\(0x2661\)\ \*1%　进到里面去来回抽插吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1172',
        any: [/CFLAG:303\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1174',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ P\ >=\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1175',
        any: [
          /PRINTFORMW\ 「啊\~哈嗯\~啊啊\~…这、这个部位…才不是用来塞进什么东西的地方来的呀………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1176',
        any: [
          /PRINTFORMW\ 虽然嘴上说着这样的话，但是%SAVESTR:TARGET%一点都不讨厌地接受着%SAVESTR:PLAYER%的手指。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1177',
        any: [
          /PRINTFORMW\ 「哈嗯\~♪……啊·\~…不是…这个…才不是对%SAVESTR:PLAYER%大人的手指感到舒…哼啊啊\~…啊啊\~…哈啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1178',
        any: [/CFLAG:303\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1180',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ P\ <\ PALAMLV:2\ \&\&\ \(CFLAG:303\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1181',
        any: [/PRINTFORMW\ 「嗯呜\~\.\.\.\.请更加…温柔地………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1182',
        any: [
          /PRINTFORMW\ 「哈啊啊啊\~…嗯呜呜\~…没错…这样的…很舒服啊\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1183',
        any: [/CFLAG:303\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1185',
        any: [
          /ELSEIF\ P\ >=\ PALAMLV:2\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:303\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1186',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的尻穴被塞进了手指而全身颤抖起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1187',
        any: [/PRINTFORMW\ 「啊呜呜\~！…不，不是…才没有感觉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1188',
        any: [
          /PRINTFORMW\ 「呜嗯啊\~！啊\~啊啊\~哈啊啊啊啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1189',
        any: [/CFLAG:303\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1191',
        any: [/ELSEIF\ CFLAG:223\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1192',
        any: [
          /PRINTFORMW\ 「嗯呜\~…请，请快住手啊…那种地方不管怎么做都不会…呜啊啊\~啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1193',
        any: [/CFLAG:303\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1202',
        any: [/IF\ SELECTCOM\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1204-1207',
        any: [/PRINTFORMW\ 「居然…不能不做这样的事情…这是……何等的…屈辱啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1205',
        any: [/PRINTFORMW\ 「居然…不能不做这样的事情…这是……何等的…屈辱啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1206',
        any: [/CFLAG:TARGET:304\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1209-1321',
        any: [
          /PRINTFORMW\ 「这个手指…这个手指如果是主人的大鸡巴的话%UNICODE\(0x2661\)\ \*1%　就会…就会变地更加舒服起来了呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1211',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:304\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1212',
        any: [
          /PRINTFORMW\ 「啊啊%UNICODE\(0x2661\)\ \*1%　您真是的…真的是恶魔来的呀…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1213',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的身心…明明\.\.\.\.都变得…如此地淫乱了…啊啊\~%UNICODE\(0x2661\)\ \*1%也不拿走%SELF_CALL\(TARGET\)%重要的东西什么的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1214',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将腰抬高，向%NAME:MASTER%诱惑而用手将蜜穴给张开。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1215',
        any: [
          /PRINTFORMW\ 「啊啊\~…明明…在这里有处女膜来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1216',
        any: [
          /PRINTFORMW\ 「拜托了%UNICODE\(0x2661\)\ \*1%请将%SELF_CALL\(TARGET\)%的…淫乱小穴…用%NAME:MASTER%大人的大鸡巴来贯穿了吧\~\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1217',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一边将腰部左右地晃动着一边在%NAME:MASTER%的面前自慰着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1218',
        any: [/CFLAG:304\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1220',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:304\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1222',
        any: [/IF\ TEQUIP:11\ \|\|\ TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1223',
        any: [
          /PRINTFORMW\ 「啊哼嗯\~\~…按摩器自慰最\~棒\~了\~啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1224',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%留着口水继续着自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1227',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1228',
        any: [
          /PRINTFORMW\ 「啊啊…主人…请看一下吧\~\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1229',
        any: [
          /PRINTFORMW\ 「小穴的里面%UNICODE\(0x2661\)\ \*1%要伸手指进去了哦\~\~\~……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1230',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊\~…不行了\~…小穴自慰停不下来了%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1231',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1232',
        any: [
          /PRINTFORMW\ 「哈啊\~…啊\~…啊啊\~…这么的…舒服的事情嗯\~…谁都没有告诉%SAVESTR:TARGET%啊嗯\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1233',
        any: [
          /PRINTFORMW\ 「小穴“库啪”地打开了\~嗯哦嗯\~%UNICODE\(0x2661\)\ \*1%将手指塞进深处后\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1234',
        any: [
          /PRINTFORMW\ 「只要再将小豆豆弄一下的话…哈嗯\~%UNICODE\(0x2661\)\ \*1%要舒服死了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1235',
        any: [
          /PRINTFORMW\ 「为什么大家…不做这么舒服的事情呢\~？%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1237',
        any: [
          /PRINTFORMW\ 「啊啊啊啊\~…对不起…只用自己的手指就得那么舒服真是对不起\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1238',
        any: [
          /PRINTFORMW\ 「但是停不下来呢\~\~%UNICODE\(0x2661\)\ \*1%\ 这么舒服的事情，根本停不下来呀\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1239',
        any: [
          /PRINTFORMW\ 「哪怕没有主人的命令也好…也会一整天玩弄自己的小穴真的是非常对不起呜\~\~\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1240',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%连你根本不知道的事情也说都了出来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1243',
        any: [/CFLAG:304\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1245',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:31\ <\ 3\ \&\&\ \(CFLAG:304\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1247',
        any: [/IF\ TEQUIP:11\ \|\|\ TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1248',
        any: [
          /PRINTFORMW\ 「啊啊啊啊\~…要不行了…那里要不行啊\~\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1249',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%流着口水沉浸在按摩器自慰着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1252',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1253',
        any: [
          /PRINTFORMW\ 「啊啊\~…手指…手指擅自动起来了呀\~\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1254',
        any: [
          /PRINTFORMW\ 「这个手指…这个手指如果是主人的大鸡巴的话%UNICODE\(0x2661\)\ \*1%　就会…就会变地更加舒服起来了呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1256',
        any: [
          /PRINTFORMW\ 「啊啊\~…虽然玩弄小穴也不错来的…但是好想要主人的大鸡巴呀\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1257',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%自慰的同时，用着炽热的视线看着%SAVESTR:TARGET%股间的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1260',
        any: [/CFLAG:304\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1262',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:304\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1263',
        any: [/PRINTFORMW\ 「啊啊\~…呜哈\~…啊…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1264',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每次轻轻地抚摸自己的蜜穴后就会大声地呻吟一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1265',
        any: [
          /PRINTFORMW\ 「如果大人您再不做的话\~…%SAVESTR:TARGET%就要自己弄破了噢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1266',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%说完扑哧一笑、将手指塞向了深处。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1267',
        any: [
          /PRINTFORMW\ 「哈嗯\~%UNICODE\(0x2661\)\ \*1%…唔哼哼\~、只是开玩笑的噢\~………啊嗯\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1268',
        any: [/CFLAG:304\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1270',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:304\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1272',
        any: [/IF\ TEQUIP:11\ \|\|\ TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1273',
        any: [
          /PRINTFORMW\ 「自慰器…自慰器用起来好舒服啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1274',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%嘴边流下了口水沉浸在了按摩器自慰中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1277',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1278',
        any: [
          /PRINTFORMW\ 「唔啊\~…啊\~哈啊\~…明明\.\.\.这样的…不行…来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1279',
        any: [
          /PRINTFORMW\ 「啊啊\~…但是…是魔王大人的命令来的…啊\~啊啊\~哈啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1280',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%哪怕嘴上说着这么多的借口，但还是忘我地自慰着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1281',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1282',
        any: [
          /PRINTFORMW\ 「啊啊…请更加…更加地看这边吧\~…请看着%SELF_CALL\(TARGET\)%淫荡下流的哪里吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1283',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当将手指伸进蜜穴里后便会有下流的水声响起、爱液不提地滴到了地板上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1285',
        any: [
          /PRINTFORMW\ 「啊啊\~…玩弄的话…明明在这样玩弄下去的话就要回不来了的\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1286',
        any: [
          /PRINTFORMW\ 「不行了嗯\~\~…已经…手指已经停不下来了\~%UNICODE\(0x2661\)\ \*1%…主人…请看着吧\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1289',
        any: [/CFLAG:304\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1291',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:31\ <\ 3\ \&\&\ \(CFLAG:304\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1293',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1294',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…%UNICODE\(0x2661\)\ \*1%　被喜欢的人给…看到了羞耻的地方什么的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1295',
        any: [
          /PRINTFORMW\ 「居然是那么舒服的事情来的呀…请更加地…更加地看着%SELF_CALL\(TARGET\)%自慰的姿态吧\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1297',
        any: [
          /PRINTFORMW\ 「啊啊\~…因为命令而自己安慰自己什么的…居然会那么舒服呀\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1298',
        any: [
          /PRINTFORMW\ 「主人\~%UNICODE\(0x2661\)\ \*1%\ 请更加地…疼爱%SELF_CALL\(TARGET\)%吧…啊\~啊啊啊\~嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1300',
        any: [/CFLAG:304\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1302',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&ABL:31\ >=\ 1\ \&\&\ \(CFLAG:304\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1304',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1305',
        any: [
          /PRINTFORMW\ 「明明…不行…来的…但是\.\.\.为什么…手却…停不下来呀\~………啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1307',
        any: [/PRINTFORMW\ 「好、的…更加深地\~…啊啊\~啊\~…啊嗯嗯唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1308',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%顺从着%NAME:MASTER%的指示摩擦着蜜穴、一点一点地开发着敏感度………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1310',
        any: [/CFLAG:304\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1312',
        any: [/ELSEIF\ CFLAG:304\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1314',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1315',
        any: [
          /PRINTFORMW\ 「呃呜…呜\~…啊\~…这样的一点也…哼呜\~…啊\~…哈呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1317',
        any: [
          /PRINTFORMW\ 「啊啊…哈啊\~…居然让%SAVESTR:TARGET%做这样的事情…给%SAVESTR:TARGET%记住吧…啊啊\~…啊\~…嗯\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1319',
        any: [/CFLAG:304\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1328',
        any: [/IF\ SELECTCOM\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1330-1358',
        any: [
          /PRINTFORML\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 被那么用力地揉的话\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1332',
        any: [
          /IF\ TALENT:TARGET:130\ ==\ 1\ \&\&\ PALAM:5\ >\ PALAMLV:3\ \&\&\ TEQUIP:16\ ==\ 0\ \&\&\ TEQUIP:15\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1335',
        any: [/PRINTFORMW\ 「胸部！要漏出来了呀\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1338',
        any: [/PRINTFORMW\ 「嗯呜\.\.\.母乳居然…那么多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1343',
        any: [/IF\ CFLAG:7\ \&\ 1\ \&\&\ ABL:21\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1344',
        any: [
          /PRINTFORML\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 被那么用力地揉的话\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1345',
        any: [/PRINTFORMW\ 「就会有感觉了\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1347',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像想要炫耀爱的证明一样、自满地将胸前的乳头环摇晃起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1349',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1350',
        any: [/PRINTFORMW\ 「哼啊啊…请更加地…抚摸胸部吧\~\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1351',
        any: [
          /PRINTFORMW\ 「只是被%NAME:MASTER%大人抚摸而已就感觉要融化掉了呀%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1354',
        any: [/PRINTFORMW\ 「嗯呜…不要…弄得那么疼………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1357',
        any: [/CFLAG:TARGET:306\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1360-1406',
        any: [
          /PRINTFORMW\ 「啊嗯\~…可以的哦\~…请再喝更多一点吧…%SELF_CALL\(TARGET\)%的可爱的大人………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1362',
        any: [
          /IF\ TALENT:TARGET:130\ ==\ 1\ \&\&\ PALAM:5\ >\ PALAMLV:3\ \&\&\ TEQUIP:16\ ==\ 0\ \&\&\ TEQUIP:15\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1365',
        any: [
          /PRINTFORMW\ 「主人，请…请再喝多一点奶吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1366',
        any: [
          /PRINTFORMW\ 「只是让主人喝着奶…就…就要去了呀…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1367',
        any: [/CFLAG:306\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1370',
        any: [
          /PRINTFORMW\ 「啊嗯\~…可以的哦\~…请再喝更多一点吧…%SELF_CALL\(TARGET\)%的可爱的大人………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1371',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的奶…啊嗯\~…全部…都是大人你的东西来的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1372',
        any: [/CFLAG:306\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1375',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊呜呜\~…！请…请原谅%SELF_CALL\(TARGET\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1376',
        any: [
          /PRINTFORMW\ 「再这样…被吸着奶的话…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%…啊哈呜嗯\~\~\~\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1377',
        any: [/CFLAG:306\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1380',
        any: [
          /PRINTFORMW\ 「啊哈呜…不要\.\.\.请不要…吸得\.\.\.弄出声音来啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1381',
        any: [/CFLAG:306\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1386',
        any: [
          /PRINTFORMW\ 「啊哈啊啊\~…要融化掉了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1387',
        any: [
          /PRINTFORMW\ 「主人，请更加地…随心所欲地做吧\~…啊\~…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1388',
        any: [/CFLAG:306\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1391',
        any: [
          /PRINTFORMW\ 「啊嗯\~…可以的哦…更加用力地揉…也没有关系的噢…啊\~哈啊嗯啊啊啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1392',
        any: [
          /PRINTFORMW\ 「嗯呜\~♪这样的真的可以哦\~…啊\~…是的噢…更加…用力地可以的噢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1393',
        any: [/CFLAG:306\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1396',
        any: [/PRINTFORMW\ 「啊啊\~…胸部…胸部居然会那么有感觉什么的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1397',
        any: [/PRINTFORMW\ 「哈嗯\~…请，请不要欺负胸部…啊\~啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1398',
        any: [/CFLAG:306\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1401',
        any: [/PRINTFORMW\ 「不…不要…唔…不要再…欺负胸部…啊\~…啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1402',
        any: [/CFLAG:306\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1412',
        any: [/IF\ SELECTCOM\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1414-1472',
        any: [
          /PRINTFORMW\ 「！…怎，怎么能…那么卑鄙…让%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%自己来做什么的…唔…呜呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1416',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ASSIPLAY\ ==\ 0\ \&\&\ TEQUIP:89\ ==\ 0\ \&\&\ TEQUIP:90\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1418',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1419',
        any: [
          /PRINTFORMW\ %NAME:MASTER%抓住%SAVESTR:TARGET%的下巴将她的脸转了过来、强行地将嘴唇重合了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1420',
        any: [
          /PRINTFORMW\ 「嗯唔…嗯啾\~…嗯呼\~…嗯呼嗯\~…\~！…嗯唔\~…嗯\~嗯嗯\~\~呜\~…呜\~\~！！！%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1421',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%通红着脸沉浸在和%NAME:MASTER%的亲吻当中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1422',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊\~…啊啊…好棒…%SELF_CALL\(TARGET\)%淫乱的嘴唇能献给主人您真是荣幸呢\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1428',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%环抱着%NAME:MASTER%、热情地将舌头缠绕起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1427',
        any: [
          /PRINTFORMW\ 「嗯呼呜\~%UNICODE\(0x2661\)\ \*1%\ 嗯呜\~…啾呜\~…啾呼\~…呸咯\~…嗯\~嗯\~嗯嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1429',
        any: [
          /PRINTFORMW\ 「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1430',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%沉浸在了和%NAME:MASTER%亲吻之中，脑海里的故乡的恋人就好像已经不在了一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1432',
        any: [
          /PRINTFORMW\ 「嗯呼\~%UNICODE\(0x2661\)\ \*1%\ 嗯啾…啾\~…啾呼\~…呸咯\~…嗯\~嗯\~嗯嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1433',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%环抱着%NAME:MASTER%、热情地将舌头缠绕起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1434',
        any: [
          /PRINTFORMW\ 「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1439',
        any: [/;高贵エルフ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1441',
        any: [
          /PRINTFORMW\ 「那、那个、%SELF_CALL\(TARGET\)%那个所谓的心理准备还没…啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1442',
        any: [
          /PRINTFORMW\ 趁着%SAVESTR:TARGET%还在迷惑的时候将其抱住后、%NAME:MASTER%直接将她的嘴唇夺走了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1443',
        any: [/PRINTFORMW\ 「嗯呼\~…嗯…嗯呜\~…嗯…啾…啾…噗哈\~…啊啊\~…啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1444',
        any: [
          /PRINTFORMW\ 「真、真是的…真是那个…对大人您真是无奈了呀…啊嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1445',
        any: [
          /PRINTFORMW\ %NAME:MASTER%再次将这个有点小啰嗦的精灵族小姑娘的嘴唇给夺走了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1450',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~…这是%SELF_CALL\(TARGET\)%的初吻来的噢\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1451',
        any: [
          /PRINTFORMW\ 「啊嗯\~…噗\~请不要那么坏心眼啦…真的是初吻来的嘛…不管是第二回…还是第三回都是…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1452',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%可爱地微笑了一下后，便不停地跟%NAME:MASTER%亲吻了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1454',
        any: [/PRINTFORMW\ 「嗯呜\~…是、是的…能否再来一次吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1455',
        any: [/PRINTFORMW\ 「%SAVESTR:TARGET%想要…好好地记住大人您的吻………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1456',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%可爱地微笑了一下后，再度跟%NAME:MASTER%亲吻了一下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1462',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4\ \&\&\ FLAG:81\ >=\ 5000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1463',
        any: [/PRINTFORMW\ 「亲、亲吻的话…真的会…放那个人走对吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1464',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将自己的吻和在故乡的恋人的生命放在天枰衡量了一下、便向%NAME:MASTER%献出了嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1465',
        any: [/PRINTFORMW\ 「嗯\~…嗯呜\~…\~！………已、已经…够了吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1466',
        any: [
          /PRINTFORMW\ 「！…怎，怎么能…那么卑鄙…让%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%自己来做什么的…唔…呜呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1467',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的身体颤抖着，自己上前亲吻了%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1469',
        any: [/PRINTFORMW\ 「啊啊…啊…%SELF_CALL\(TARGET\)%的…初吻被………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1472',
        any: [/CFLAG:307\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1475-1488',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的嘴唇…全部都是主人的东西来的…请更加的…渴求%SELF_CALL\(TARGET\)%的嘴唇吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1478',
        any: [
          /PRINTFORMW\ 「嗯呜\~…嗯啾\~…嗯呼\~\.\.\.哼啊\~…啊啊…非常地舒服呢\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1479',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脸红得发烫，沉醉在和%NAME:MASTER%的亲吻之中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1480',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的嘴唇…全部都是主人的东西来的…请更加的…渴求%SELF_CALL\(TARGET\)%的嘴唇吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1483',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…和喜欢的对方亲吻什么的居然会那么舒服来的呀…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1484',
        any: [/PRINTFORMW\ 「啊啊…请再…亲更多次吧\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1487',
        any: [/PRINTFORMW\ 「嗯呜\~…这，这样的…才不算什么呢！…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1489',
        any: [/CFLAG:307\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1492-1516',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的嘴唇…全部都是主人的东西来的…请更加的…渴求%SELF_CALL\(TARGET\)%的嘴唇吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1495',
        any: [
          /PRINTFORMW\ 「嗯唔…嗯啾\~…嗯噗…呼啊…啊啊\~…非常的舒服啊\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1496',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%脸红得发烫，沉醉在和%NAME:MASTER%的亲吻之中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1497',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的嘴唇…全部都是主人的东西来的…请更加的…渴求%SELF_CALL\(TARGET\)%的嘴唇吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1498',
        any: [/CFLAG:307\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1501',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯啾\~…啾\~…哈啊啊\~…感觉脑袋里变得一片空白了呢\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1502',
        any: [
          /PRINTFORMW\ 「啊啊啊…只是亲吻就变得那么舒服什么的………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1503',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同说梦话地一样喃喃自语着，可见多么地沉浸在亲吻之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1504',
        any: [/CFLAG:307\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1507',
        any: [/PRINTFORMW\ 「好、的…亲吻…对吧…嗯\~…哈啊啊…还、还要更多吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1508',
        any: [/PRINTFORMW\ 「真、真是没有办法呢…嗯啾…啾…啾…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1509',
        any: [/CFLAG:307\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1512',
        any: [/PRINTFORMW\ 「哈啊…哈啊…这样…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1513',
        any: [/CFLAG:307\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1522',
        any: [/IF\ SELECTCOM\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1524',
        any: [/IF\ CFLAG:308\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1526',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1527',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…%SELF_CALL\(TARGET\)%的小穴深处…被主人看到了啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1529',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1530',
        any: [
          /PRINTFORMW\ …这样的…自己张开那里让大人您看什么的…明明…很羞耻，的事情来的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1533',
        any: [
          /PRINTFORMW\ 「不，不行了啊…已经不能再张开了…哈呜！…%SELF_CALL\(TARGET\)%明、明白了…会张得…更大的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1535',
        any: [/CFLAG:TARGET:308\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1538',
        any: [/ELSEIF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1540',
        any: [/IF\ TALENT:TARGET:76\ ==\ 0\ \&\&\ TALENT:TARGET:85\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1542',
        any: [/IF\ ABL:17\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1543',
        any: [
          /PRINTFORMW\ 「啊啊\~、好奇怪呀\~…明明这样好羞耻来的…为什么………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1544',
        any: [
          /PRINTFORMW\ 一副被命令、没有办法才……地这么一副样子的%SAVESTR:TARGET%、看着放在自己面前的水晶球身体“噗噜”地颤抖了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1545',
        any: [
          /PRINTFORMW\ 「一想到要被好多人看到后…身，身体就要变得…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1547',
        any: [/PRINTFORMW\ 「呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1548',
        any: [
          /PRINTFORMW\ 不甘心地咬着自己得下嘴唇、%SAVESTR:TARGET%向着眼前的水晶球张开了自己的秘处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1552',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1553',
        any: [
          /PRINTFORMW\ 「嗯哼\~%UNICODE\(0x2661\)\ \*1%\ %SAVESTR:TARGET%明白了\~。就按照主人说的那样、给大\~家、大饱眼福一下吧\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1555',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1556',
        any: [
          /PRINTFORMW\ 「啊啊……虽然感到十分地羞耻、但是会按照%NAME:MASTER%所说的那样……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1559',
        any: [
          /IF\ TALENT:TARGET:0\ ==\ 1\ \&\&\ TALENT:TARGET:136\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1560',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…淫乱雌犬%SAVESTR:TARGET%的、处女小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1561',
        any: [
          /PRINTFORML\ 　还没有被某位人的粗壮之物给贯穿的处女小穴来的、想要魔王大人给予名为快乐的诱饵而、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1562',
        any: [
          /PRINTFORML\ 　一直都像这样不像样地流着口水黏糊糊的样子、的雌犬小穴来的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1564',
        any: [/ELSEIF\ TALENT:TARGET:0\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1565',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…%SAVESTR:TARGET%的、处女小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1566',
        any: [
          /PRINTFORML\ 　明明还没有被某个人的粗壮之物给贯穿、因为没法忘记魔王大人给予的愉悦、所以一直都这么黏糊糊的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1568',
        any: [/ELSEIF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1569',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…%SAVESTR:TARGET%的、、处女小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1571',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1572',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…淫乱雌犬%SAVESTR:TARGET%的、小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1573',
        any: [
          /PRINTFORML\ 　就像这样、一直都不知羞耻地流着口水黏糊糊的、贪欲的雌犬小穴来的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1575',
        any: [/ELSEIF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1576',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…淫乱雌犬%SAVESTR:TARGET%的、小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1578',
        any: [/ELSEIF\ TALENT:TARGET:271\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1579',
        any: [
          /PRINTFORML\ 正在看的大家……能不能看见呢\~？这个、%SELF_CALL\(TARGET\)%的…%SAVESTR:TARGET%的小穴是、一直都是黏糊糊的噢\~。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1580',
        any: [
          /PRINTFORML\ 　要说为什么的话、那是因为魔王大人一直都将快乐和愉悦交给%SELF_CALL\(TARGET\)%的原因…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1583',
        any: [
          /PRINTFORML\ 「正在看的大家……能不能看见呢\~？这个就是、%SELF_CALL\(TARGET\)%的…%SAVESTR:TARGET%的、小穴来的…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1586',
        any: [/IF\ TALENT:TARGET:89\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1587',
        any: [/PRINTFORML\ 　只是想象被看到就会、不断地变湿了的、下流的小穴…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1588',
        any: [
          /PRINTFORML\ 　明明都没有在大家的面前…不对、只有魔王大人的视线也会很快就会湿掉了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1591',
        any: [/IF\ TALENT:TARGET:78\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1592',
        any: [
          /PRINTFORML\ 　魔王大人虽然让、%SELF_CALL\(TARGET\)%喜欢是上弄胸部的快感……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1593',
        any: [
          /PRINTFORML\ 　但是这里也一样、最喜欢做了，不管是被欺负也好，还是被疼爱也好…%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1595',
        any: [/ELSEIF\ TALENT:TARGET:78\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1596',
        any: [
          /PRINTFORML\ 　因为魔王大人教会了%SELF_CALL\(TARGET\)%胸部的真正用法，弄胸部就会不行了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1597',
        any: [
          /PRINTFORML\ 　所以说还没有对这里调教过、不知道以后用这里侍奉能不能符合魔王大人的喜好、十分地担心……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1600',
        any: [/IF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1601',
        any: [
          /PRINTFORML\ 　因为被魔王大人抽插了不知道多少次了、所以变得最喜欢结合的交配狂了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1603',
        any: [/ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1604',
        any: [/PRINTFORML\ 　想要让魔王大人来擦来擦去、一直都痒地不行呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1607',
        any: [/IF\ TALENT:TARGET:74\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1608',
        any: [
          /PRINTFORML\ 　因为不管什么时候都会想要快乐而痒得不行、一不留神就自慰起来了啊。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1609',
        any: [/PRINTFORML\ 　就像这样一样……嗯\~、嗯\~……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1612',
        any: [/IF\ TALENT:TARGET:88\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1613',
        any: [
          /PRINTFORML\ 　不管被多么粗鲁的抽插过……不对、不管做出怎样痛苦的事情、%SELF_CALL\(TARGET\)%的这里都会流出开心的泪水。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1615',
        any: [/ELSEIF\ TALENT:TARGET:88\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1616',
        any: [
          /PRINTFORML\ 　不管被鞭子打也好、还是被拿针刺都好、%SELF_CALL\(TARGET\)%的这里都会流出开心的泪水。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1619',
        any: [/IF\ TALENT:TARGET:77\ ==\ 1\ \&\&\ TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1620',
        any: [
          /PRINTFORML\ 　不只是前面、后面也是很厉害的噢、%SELF_CALL\(TARGET\)%。看吧…现在里面也有着那么有精神的肛门虫在里面呢/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1622',
        any: [/IF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1623',
        any: [
          /PRINTFORML\ 　因为魔王大人只专心调教这边的原因、所以变成了如此下流的肛穴了呀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1624',
        any: [
          /PRINTFORML\ 　不只是用来侍奉的小穴来的、%SELF_CALL\(TARGET\)%自身也会有感觉的、不知道多少次因为太有感觉而恍惚了…唔哼哼\~%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1627',
        any: [
          /PRINTFORML\ 　前面也好、后面也好…小穴也好、肛穴也好、身体全部都被魔王大人、给予了调教了%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1630',
        any: [/ELSEIF\ TALENT:TARGET:77\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1631',
        any: [
          /PRINTFORML\ 　不只是前面，后面也很厉害的噢、%SELF_CALL\(TARGET\)%。因为魔王大人只专注调教这边的原因、%SELF_CALL\(TARGET\)%的肛穴…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1633',
        any: [/IF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1634',
        any: [
          /PRINTFORML\ 　已经、完全变成了只为侍奉而用的肛穴了。%SELF_CALL\(TARGET\)%自身也，也变得奇怪地敏感起来了…唔哼哼%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1637',
        any: [
          /PRINTFORML\ 　跟小穴一样、肛穴也……不对、不只是肛穴，全身都被魔王大人蹂蹑过，给予了调教了%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1640',
        any: [
          /PRINTFORM\ 　只要是魔王大人的命令来的话、%SELF_CALL\(TARGET\)%一定会在这里…用这个/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1643',
        any: [/PRINTFORM\ 魔王大人专用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1646',
        any: [/PRINTFORM\ 淫乱/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1649',
        any: [/PRINTFORM\ 牝犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1652',
        any: [/PRINTFORM\ 贪欲/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1655',
        any: [/PRINTFORM\ 处女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1656',
        any: [/PRINTFORML\ 小穴来、给今天看到的大家侍奉也说不定呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1657',
        any: [
          /PRINTFORML\ 当然，不管那是、在野外垂死的最底层居民也好、还是满身污臭的亚人也好……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1659',
        any: [/IF\ TALENT:TARGET:82\ ==\ 1\ \&\&\ ABL:39\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1660',
        any: [
          /PRINTFORML\ 　啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。还不如狗更好呢。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1661',
        any: [
          /PRINTFORML\ 　哪怕是这样、只要魔王大人下命令的话……%SELF_CALL\(TARGET\)%就会、打从欣喜接受其命令。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1663',
        any: [/ELSEIF\ TALENT:TARGET:82\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1664',
        any: [
          /PRINTFORML\ 　啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1665',
        any: [
          /PRINTFORML\ 　哪怕是这样、只要魔王大人下命令的话……%SELF_CALL\(TARGET\)%就会、打从欣喜接受其命令。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1667',
        any: [
          /PRINTFORMW\ 　当然、如果你没有对魔王大人抱有绝对的忠诚的话……真是没有缘分的话题呢、对吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1671',
        any: [
          /ELSEIF\ CFLAG:308\ <=\ 99\ \&\&\ \(TALENT:TARGET:76\ ==\ 1\ \|\|\ TALENT:TARGET:85\ ==\ 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1673',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1674',
        any: [/PRINTFORMW\ 「是的、请看吧、主人\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1676',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1677',
        any: [
          /PRINTFORMW\ 「啊啊\~……虽然很害羞来着、%NAME:MASTER%想要看的话……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1680',
        any: [
          /IF\ TALENT:TARGET:0\ ==\ 1\ \&\&\ TALENT:TARGET:136\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1681',
        any: [
          /PRINTFORML\ 「觉得怎样呢\~…？想要魔王大人将其贯穿、一直都像这样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1682',
        any: [
          /PRINTFORML\ 　不知羞耻地流着口水黏糊糊得、雌犬处女小穴来的%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1684',
        any: [/ELSEIF\ TALENT:TARGET:0\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1685',
        any: [
          /PRINTFORML\ 「觉得怎样呢…？就像所见的那样、还是处女来的噢…想要让魔王大人快一点将其贯穿、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1686',
        any: [
          /PRINTFORML\ 　一直都像这样、黏糊糊地等待着都快要等不住了呢\~%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1688',
        any: [/ELSEIF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1689',
        any: [/PRINTFORML\ 「觉得怎样呢…？就像所见的那样、还是处女来的噢…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1690',
        any: [
          /PRINTFORML\ 　想要让魔王大人快一点将其贯穿、这么地一抽一抽地呢%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1692',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ TALENT:TARGET:271\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1693',
        any: [
          /PRINTFORML\ 「觉得怎样呢\~…？就像这也、一直都流着口水黏糊糊的、贪欲的雌犬小穴来的貪欲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1695',
        any: [/ELSEIF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1696',
        any: [
          /PRINTFORML\ 「请吧\~、请鉴赏吧\~…这样不知羞耻的雌犬小穴也可以的话、请随便……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1698',
        any: [/ELSEIF\ TALENT:TARGET:271\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1699',
        any: [
          /PRINTFORML\ 「请吧\~、请鉴赏吧\~…一直都黏糊糊的，贪欲的发情小穴也可以的话、请随便……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1701',
        any: [/ELSEIF\ TALENT:TARGET:89\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1702',
        any: [
          /PRINTFORML\ 「只是视线而已、就会变得那么湿的%SELF_CALL\(TARGET\)%的小穴也可以的话……%SELF_CALL\(TARGET\)%自己也就、拜托您了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1705',
        any: [
          /PRINTFORML\ 「请吧\~、请鉴赏吧\~…%SELF_CALL\(TARGET\)%的全部、都是魔王大人的东西来的啦……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1708',
        any: [/IF\ TALENT:TARGET:78\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1709',
        any: [/PRINTFORML\ 　不只是胸部而已、这边也请调教到发狂吧\~。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1711',
        any: [/ELSEIF\ TALENT:TARGET:78\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1712',
        any: [/PRINTFORML\ 　只是胸部还是不满足呢、也请充分地调教这边吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1715',
        any: [/IF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1716',
        any: [
          /PRINTFORML\ 　也请别只是看而已、激烈地抽插也是可以的哦？不对、很想要做啊…已经、快点、快点…！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1718',
        any: [/ELSEIF\ TALENT:TARGET:75\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1719',
        any: [
          /PRINTFORML\ 　也请别只是看而已、就想要在这里感受魔王大人呢。给%SELF_CALL\(TARGET\)%、教给真正的抽插狂吧\~…！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1722',
        any: [/IF\ TALENT:TARGET:74\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1723',
        any: [
          /PRINTFORML\ 啊啊\~…！就这样也好、也好想要自慰、好想自慰地不行……！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1727',
        any: [
          /PRINTFORML\ 不管被怎样粗鲁地做都没有关系得啦……不管怎样的狂风大雨、%SELF_CALL\(TARGET\)%都会感觉到愉悦的…！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1729',
        any: [/PRINTFORML\ 　像这种蠕虫什么的、根本不够呢…！根本不满足嘛\~…！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1732',
        any: [
          /PRINTFORML\ 　小穴不行的话、肛穴也没有关系。请、请对%SELF_CALL\(TARGET\)%……！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1734',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1735',
        any: [
          /PRINTFORML\ 　请用主人的、又热又粗的东西贯穿吧%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1736',
        any: [
          /PRINTFORMW\ 　请怜悯一下吧、请抽插身体的深处吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1738',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1739',
        any: [
          /PRINTFORML\ 　请用%NAME:MASTER%的、又热又粗的东西贯穿吧\~%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1740',
        any: [
          /PRINTFORMW\ 　请抱住%SELF_CALL\(TARGET\)%、深处的里面想要被贯穿呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1745',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:308\ <=\ 104\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1746',
        any: [/PRINTFORMW\ 「啊啊啊\~…主人%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1747',
        any: [
          /PRINTFORMW\ 「如果实在忍不住了的话…就这样%SELF_CALL\(TARGET\)%推倒吧…强奸到失神也没有关系的噢%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1748',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%露出了一脸淫猥的表情诱惑着%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1749',
        any: [/CFLAG:306\ =\ 105/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1751',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:308\ <=\ 103\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1752',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…居然必须要\ 给喜欢的对方\.\.\.看这种地方什么的…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1753',
        any: [
          /PRINTFORMW\ 「虽然很害羞…但是我会加油张开的%UNICODE\(0x2661\)\ \*1%\ 请鉴赏吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1754',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%脸通红着张开自己的秘处………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1755',
        any: [/CFLAG:306\ =\ 104/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1757',
        any: [
          /ELSEIF\ ABL:17\ >=\ 3\ \&\&\ \(CFLAG:308\ <=\ 102\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1758',
        any: [
          /PRINTFORMW\ 「啊啊\~、好奇怪的啊\~…这样的事情明明很害羞来的…为什么………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1759',
        any: [
          /PRINTFORMW\ 「一明白实在被看到的话…啊啊\~身体就变热起来了…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1760',
        any: [/CFLAG:306\ =\ 103/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1762',
        any: [/ELSEIF\ CFLAG:306\ <=\ 101\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1763',
        any: [/PRINTFORMW\ 「呜嗯\~…怎、怎样…这样的话…就已经满足了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1764',
        any: [/PRINTFORMW\ 「想、想看的话，那就看更多一点就好了啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1765',
        any: [/CFLAG:306\ =\ 102/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1774',
        any: [/IF\ SELECTCOM\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1776',
        any: [/IF\ CFLAG:TARGET:309\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1778',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1779',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 主人的手指…在%SELF_CALL\(TARGET\)%的小穴里…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1781',
        any: [/ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1782',
        any: [
          /PRINTFORMW\ 「好的\~…%SELF_CALL\(TARGET\)%没关系的啦\~…请按照大人您想要的做吧\~…嗯\~…那里…好棒…的说\~唔嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1785',
        any: [
          /PRINTFORMW\ 「啊啊\~…不行…不行的啊啊…伸地那么进去的…唔哈啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1787',
        any: [/CFLAG:TARGET:309\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1792',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:309\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1793',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%\ 啊\~%UNICODE\(0x2661\)\ \*1%\ 更加抽插那里吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1794',
        any: [
          /PRINTFORMW\ 「请用主人的手指来…扣着%SELF_CALL\(TARGET\)%淫乱的小穴吧哈呜呜呜呜哎哎哎\~\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1795',
        any: [/CFLAG:309\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1797',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:309\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1798',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…嗯\~%UNICODE\(0x2661\)\ \*1%\ 那里…非常的舒服呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1799',
        any: [
          /PRINTFORMW\ 「请更加地…请更加粗野地程度…扣%SELF_CALL\(TARGET\)%得那里吧\~…啊\~哈\~哈啊啊啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1800',
        any: [/CFLAG:309\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1802',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:309\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1803',
        any: [/PRINTFORMW\ 「啊啊\~…将腰抬得更高什么的…哈嗯呜\~！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1804',
        any: [
          /PRINTFORMW\ 「才、才不是呢\~…那里才不是有感觉的地方呢…哈呜\~哈呜\~啊呜\~啊呜嗯啊啊哈啊啊哈啊\~～～～！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1805',
        any: [/CFLAG:309\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1807',
        any: [/ELSEIF\ CFLAG:309\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1808',
        any: [/PRINTFORMW\ 「啊啊\~…手指在…那么的…粗鲁地做…嗯…呜…啊啊\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1809',
        any: [/CFLAG:309\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1820',
        any: [/IF\ SELECTCOM\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1822',
        any: [/IF\ CFLAG:310\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1824',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1825',
        any: [/PRINTFORMW\ 「哈嗯呜\~…主人\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1826',
        any: [
          /PRINTFORMW\ 「啊啊\~明明不干净的肛穴被舔着…却还会有感觉……真是……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1828',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1829',
        any: [/PRINTFORMW\ 「不、不行的呀…舔那种地方的话…哈呜嗯\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1830',
        any: [
          /PRINTFORMW\ 「好、好痒呀\~、这、这样的\~…啊\~啊啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1833',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~！居、居然舔那种地方什么的…脑、脑袋变奇怪了吗！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1835',
        any: [/CFLAG:TARGET:310\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1840',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1841',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…更加…更加往肛穴的深处…哈嗯呜\~用舌头来侵犯吧\~！请用舌头来侵犯吧\~\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1842',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…肛穴好舒服啊\~…只是被呸咯呸咯地舔了而已…只是这样理性就要飞走啦\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1843',
        any: [/CFLAG:310\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1845',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1846',
        any: [
          /PRINTFORMW\ 「啊啊\~…这么的…专注地舔着那里的话…%SELF_CALL\(TARGET\)%…真的要感觉到奇怪的…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1847',
        any: [
          /PRINTFORMW\ 「啊啊\~…用舌头来挖吧…更加地…侵犯着肛穴吧\~\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1848',
        any: [/CFLAG:310\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1850',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:310\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1851',
        any: [
          /PRINTFORMW\ 「呜嗯\~…啊\~啊啊啊\~…不要啊…不要再舔下去了呀\~…嗯嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1852',
        any: [/PRINTFORMW\ 「要变得…奇怪起来了呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1853',
        any: [/CFLAG:310\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1855',
        any: [/ELSEIF\ CFLAG:310\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1856',
        any: [/PRINTFORMW\ 「啊啊\~…不、不要…说了不要了啊…啊\~啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1857',
        any: [/CFLAG:310\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1867',
        any: [/IF\ SELECTCOM\ ==\ 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1869',
        any: [/IF\ CFLAG:TARGET:311\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1871',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1872',
        any: [
          /PRINTFORMW\ 「嗯哼呜呜\~！？啊啊\~啊\~…哈啊恩\~…！那个小玩具…好棒呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1874',
        any: [/ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1875',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊嗯\~♪…是、是的没问题的\~…请更加…用力压下去吧…请将%SELF_CALL\(TARGET\)%当成玩具来玩耍吧\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1878',
        any: [
          /PRINTFORMW\ 「呜呀\~…这、这是什么啊、哪个是…不、不要…不要压下去…啊\~啊啊啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1880',
        any: [/CFLAG:TARGET:311\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1885',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:311\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1886',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的小阴蒂…请更加地…更加地欺负那里吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1887',
        any: [
          /PRINTFORMW\ 「啊啊\~…一抽一抽的要来了%UNICODE\(0x2661\)\ \*1%\ 来了呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1888',
        any: [/CFLAG:311\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1890',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:311\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1891',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…啊啊\~嗯\~…哼啊啊\~…%UNICODE\(0x2661\)\ \*1%　哈啊…哈啊…啊啊、为什么停下来了呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1892',
        any: [
          /PRINTFORMW\ 「情更加地…请更加地玩弄吧\~…将%SELF_CALL\(TARGET\)%的身体当成玩具来玩弄吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1893',
        any: [
          /PRINTFORMW\ 「…哈呜啊啊\~♪…小阴蒂…小阴蒂好舒服呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1894',
        any: [/CFLAG:311\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1896',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:311\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1897',
        any: [
          /PRINTFORMW\ 「啊\~…哈呜嗯\~…啊啊呜\~…哪怕想要逃开也好…腰、腰部，腰部却自己就\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1898',
        any: [
          /PRINTFORMW\ 「哈呜啊啊\~…是、是的…%SELF_CALL\(TARGET\)%会忍住的…啊\~啊啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1899',
        any: [/CFLAG:311\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1901',
        any: [/ELSEIF\ CFLAG:311\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1902',
        any: [
          /PRINTFORMW\ 「这，这样的…只是哔哩哔哩地…一点也…哈啊\~…啊啊\~…嗯嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1903',
        any: [/CFLAG:311\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1913',
        any: [/IF\ SELECTCOM\ ==\ 11\ \&\&\ TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1915',
        any: [/IF\ CFLAG:TARGET:312\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1917',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1919',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1920',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…好棒…的啊\~…用那个丑恶的蠕虫…将%SELF_CALL\(TARGET\)%的处女给夺走对吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1921',
        any: [/PRINTFORMW\ 「如果主人那么觉得这样好的话…那就这样做吧\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1922',
        any: [
          /PRINTFORMW\ 「所以…嗯\~…嗯呜！！？啊…啊啊…嗯呜…呜呜呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1923',
        any: [
          /PRINTFORMW\ %NAME:MASTER%打断了%SAVESTR:TARGET%的话语直接将阴道虫强行塞了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1925',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1926',
        any: [/PRINTFORMW\ 「啊哈呜嗯\~…不行啊…不行…只有这个…哈啊…啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1927',
        any: [
          /PRINTFORMW\ %NAME:MASTER%毫不留情地将阴道虫往%SAVESTR:TARGET%的深处塞了进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1928',
        any: [
          /PRINTFORMW\ 「嗯呜…哈呜…啊啊\~…啊\~啊啊啊啊啊啊啊啊啊啊啊！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1929',
        any: [
          /PRINTFORMW\ 被丑恶到极致的蠕虫给夺走处女的%SAVESTR:TARGET%只在不停地留着眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1932',
        any: [
          /PRINTFORMW\ 「呜嗯…呜…哈啊…哈啊…被这种东西…%SELF_CALL\(TARGET\)%的第一次给…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1937',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1938',
        any: [
          /PRINTFORMW\ 「嗯呜\~…怎么会这样…一下就到里面去了呜呜呜呜呜呜呜%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1939',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的深处进去了一只阴道虫后身体就不停得颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1941',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1942',
        any: [
          /PRINTFORMW\ 「啊啊\~…居然还有这样得东西…嗯呜\~…不，不行的啊♪不能在里面动…哈呜嗯♪啊呜呜呜♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1943',
        any: [
          /PRINTFORMW\ 喜欢恶作剧的阴道虫在%SAVESTR:TARGET%的蜜穴里面激烈地蠕动着来回钻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1946',
        any: [
          /PRINTFORMW\ 「不，不要…好恶心…不要嗯呜啊啊…啊啊呜…在里面动着啊啊啊…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1949',
        any: [/CFLAG:312\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1954',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:312\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1955',
        any: [
          /PRINTFORMW\ 「唔啊啊\~…蠕虫先生在…%SELF_CALL\(TARGET\)%的小穴的深处…噢\~…哦吼\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1956',
        any: [
          /PRINTFORMW\ 「在和子宫口…亲吻着呢…噢噢%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…嗯哼\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1957',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴道虫进到了深处而漏出了满足的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1958',
        any: [/CFLAG:312\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1960',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:312\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1961',
        any: [
          /PRINTFORMW\ 「啊\~…真是…比起这种东西…还是大人您的大鸡巴比较好呢…啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1962',
        any: [
          /PRINTFORMW\ 「啊啊\~…不行…在里面动不行啊…啊啊\~…魔王大人坏心眼\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1963',
        any: [/CFLAG:312\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1965',
        any: [
          /ELSEIF\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:312\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1966',
        any: [
          /PRINTFORMW\ 「嗯\~…哈啊啊…被这种…下等的蠕虫给…将%SELF_CALL\(TARGET\)%的身体给…啊啊\~哼嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1967',
        any: [
          /PRINTFORMW\ 「才、才不是呢…感觉舒服什么…啊呜呀啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1968',
        any: [
          /PRINTFORMW\ 每当阴道虫在腔内闹腾起来的时候%SAVESTR:TARGET%便漏出了可爱的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1969',
        any: [/CFLAG:312\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1971',
        any: [/ELSEIF\ CFLAG:312\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1972',
        any: [
          /PRINTFORMW\ 「不、不要啊…请不要再…这样欺负%SELF_CALL\(TARGET\)%的…那里了…嗯哈呜\~嗯呜\~不行啊哎\~！不能在里面动哎！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1973',
        any: [/CFLAG:312\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1978',
        any: [/ELSEIF\ SELECTCOM\ ==\ 11\ \&\&\ TEQUIP:11\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1980',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:372\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1981',
        any: [
          /PRINTFORMW\ 「啊哈啊…阴道的穴被…被扩地那么大了呀…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1982',
        any: [/PRINTFORMW\ 「下次会放什么东西进去呐\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1983',
        any: [/CFLAG:372\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1985',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:372\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1986',
        any: [/PRINTFORMW\ 「哈啊啊…小穴变得寂寞起来了呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1987',
        any: [
          /PRINTFORMW\ 「会给代替的东西吧\~…嗯哼哼哼\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1988',
        any: [/CFLAG:372\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1990',
        any: [/ELSEIF\ CFLAG:372\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1991',
        any: [/PRINTFORMW\ 「呜啊…啊啊………哈啊…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '1992',
        any: [/CFLAG:372\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2002',
        any: [/IF\ SELECTCOM\ ==\ 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2004',
        any: [/IF\ CFLAG:313\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2006',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2007',
        any: [
          /PRINTFORMW\ 「等，等下…难、难道…要将那个振动着的棒…塞到%SELF_CALL\(TARGET\)%的…呜嗯\~、果、果然是这样嘛\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2008',
        any: [
          /PRINTFORMW\ 「啊\~…啊\~…嗯\~…哼呜\~…嗯\~…啊啊、这、这个…好棒呀\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2009',
        any: [
          /PRINTFORMW\ 「…哼啊啊啊\~！？不、不行了\~\~、突、突然变强什么的不行呜呜呜\~！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2011',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2012',
        any: [
          /PRINTFORMW\ 「啊嗯\~…哈呀嗯呜\~！？啊啊\~…请不要用这种\.\.\.东西\.\.\.来欺负%SELF_CALL\(TARGET\)%吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2013',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%往%SAVESTR:TARGET%的胸部还有脚放上了振动之杖，享受着%SAVESTR:TARGET%的反应。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2014',
        any: [/PRINTFORMW\ 「啊\~…嗯呜\~…这、这样的事情已经…啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2015',
        any: [
          /PRINTFORMW\ 振动之杖直接塞到了%SAVESTR:TARGET%蜜穴里面开始强烈震动起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2016',
        any: [
          /PRINTFORMW\ 「哈啊呜\~！嗯呀啊啊！？不、不行了\~\~…不要…呜呀\~呜嗯\~呜嗯\~呜呀啊啊啊啊！？！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2019',
        any: [/PRINTFORMW\ 「呀呜呜嗯\~…不、不要再压下去…不、不行嗯\~\~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2021',
        any: [/CFLAG:313\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2026',
        any: [
          /IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:313\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2027',
        any: [
          /PRINTFORMW\ 「啊\~啊哈啊\~…嗯\~…嗯呜呜呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2028',
        any: [
          /PRINTFORMW\ 「果然%SELF_CALL\(TARGET\)%的身体…被那么强烈的刺激了的话%UNICODE\(0x2661\)\ \*1%\ 啊\~%UNICODE\(0x2661\)\ \*1%\ 啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2029',
        any: [
          /PRINTFORMW\ 「就会变得更加舒服起来了啊啊\~\~\~%UNICODE\(0x2661\)\ \*3%…请更加地…欺负%SELF_CALL\(TARGET\)%吧%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2030',
        any: [/CFLAG:313\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2032',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:313\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2033',
        any: [
          /PRINTFORMW\ 「啊啊\~…哈啊\~…啊\~…嗯\~…请不要…那么地欺负%SELF_CALL\(TARGET\)%吧…哼嗯\~…呼啊啊啊\~！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2034',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的身体被振动之杖给予的快乐而颤抖着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2035',
        any: [
          /PRINTFORMW\ 「啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 不行…不行的啊…真的是…啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2036',
        any: [/CFLAG:313\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2038',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:313\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2039',
        any: [
          /PRINTFORMW\ 「哈呜\~…拜托了…请不要再这样\.\.\.啊\~…%SELF_CALL\(TARGET\)%…真的要…啊啊\~哈呜啊啊\~…嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2040',
        any: [
          /PRINTFORMW\ 「不要啊啊啊啊…震动不行…不行的啦\~\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2041',
        any: [/CFLAG:313\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2043',
        any: [/ELSEIF\ CFLAG:313\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2044',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~…原，原谅%SELF_CALL\(TARGET\)%…那、那个…压下去的话…就会变奇怪起来了…啊啊\~哈嗯呜啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2045',
        any: [/CFLAG:313\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2055',
        any: [/IF\ SELECTCOM\ ==\ 13\ \&\&\ TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2057',
        any: [/IF\ CFLAG:TARGET:314\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2059',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2060',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…肛穴在…被侵犯着呢\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2061',
        any: [
          /PRINTFORMW\ 「请让可爱的蠕虫酱…将%SELF_CALL\(TARGET\)%的肛穴弄得更加舒服起来吧\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2063',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2064',
        any: [
          /PRINTFORMW\ 「啊啊…%SELF_CALL\(TARGET\)%的屁股…再被扩大着啊…啊嗯\~…嗯啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2065',
        any: [
          /PRINTFORMW\ 「啊\~哈啊\~啊嗯\~！…请、请不要这样欺负那里啊\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2068',
        any: [
          /PRINTFORMW\ 「不，不要…屁股在被…啊啊\~…好奇怪感觉\~…要变奇怪了啊\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2070',
        any: [/CFLAG:TARGET:314\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2075',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2076',
        any: [/PRINTFORMW\ 「嗯哦啊啊\~%UNICODE\(0x2661\)\ \*5%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2077',
        any: [
          /PRINTFORMW\ 「啊哼嗯\~…啊啊\~肛穴…肛穴好棒呀\~\~噢噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2078',
        any: [
          /PRINTFORMW\ 「被下等的蠕虫给挖着肛穴…脑袋好像要变奇怪了啊呜呜\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2079',
        any: [/CFLAG:314\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2081',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:314\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2082',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…肛穴里蠕虫酱完全钻进去了\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2083',
        any: [
          /PRINTFORMW\ 「哼啊啊啊啊\~…在里面…活蹦乱跳着呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2084',
        any: [
          /PRINTFORMW\ 「主人\~…%SELF_CALL\(TARGET\)%已经…不行…肛、肛穴要变得不行了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2085',
        any: [/CFLAG:314\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2087',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2088',
        any: [
          /PRINTFORMW\ 「哈啊\~…嗯\~…嗯哼\~…不行\~…魔王大人…请不要看着那里\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2089',
        any: [
          /PRINTFORMW\ 「不干净的洞…变得那么舒服的样子被看到了的话…%SELF_CALL\(TARGET\)%会羞耻地要死掉了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2090',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肛穴的深处里正塞进一只肛门虫，而这只肛门虫则复杂地蠕动着自己得身躯。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2091',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~\~♪不、不行\~…屁股…哼啊啊啊\~要变奇怪了啊\~\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2092',
        any: [/CFLAG:314\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2094',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:314\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2095',
        any: [
          /PRINTFORMW\ 「啊啊\~…蠕虫…嗯呜\~…在屁股得小穴里…啊啊\~…蠕动着…哈呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2096',
        any: [
          /PRINTFORMW\ 钻进%SAVESTR:TARGET%的肛穴深处的肛门虫正在复杂地蠕动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2097',
        any: [
          /PRINTFORMW\ 「哈呀啊啊啊！？…这样得…感觉到…要感觉到啦…哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2098',
        any: [/CFLAG:314\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2100',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:314\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2101',
        any: [
          /PRINTFORMW\ 「哦、哦哈啊\~♪…肮脏的洞里…居然变得那么舒服起来了…啊啊\~哼啊啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2102',
        any: [
          /PRINTFORMW\ 「这、这肯定魔王的原因来的…这肯定是魔王施展的魔法%SELF_CALL\(TARGET\)%才会变成这样的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2103',
        any: [
          /PRINTFORMW\ 「哼唔…原谅…原谅那里吧…屁股的洞再这样下去的话要不行了啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2104',
        any: [/CFLAG:314\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2106',
        any: [/ELSEIF\ \ CFLAG:314\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2107',
        any: [
          /PRINTFORMW\ 「啊哈啊…唔呜呜…呜呜\~…这…样的…的事情…绝对不会原谅…的啊…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2108',
        any: [
          /PRINTFORMW\ 在%SAVESTR:TARGET%的深处肛门虫正在欢喜地蠕动中、凌辱着%SAVESTR:TARGET%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2109',
        any: [/CFLAG:314\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2114',
        any: [/ELSEIF\ SELECTCOM\ ==\ 13\ \&\&\ TEQUIP:13\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2116',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:374\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2117',
        any: [/PRINTFORMW\ 「嗯哈啊啊\~～………%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2118',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%发出了不满的叹息。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2119',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的肛穴…就这样变得空荡荡的了\~………唔哼哼\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2120',
        any: [/CFLAG:374\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2122',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:374\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2123',
        any: [/PRINTFORMW\ 「哈啊…哈啊…啊啊\~…屁股的洞居然…那么…舒服………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2124',
        any: [/CFLAG:374\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2126',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:374\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2127',
        any: [/PRINTFORMW\ 「啊哈嗯\~…更、更多\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2128',
        any: [/CFLAG:374\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2130',
        any: [/ELSEIF\ CFLAG:374\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2131',
        any: [/PRINTFORMW\ 「啊啊…好、好难受…来的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2132',
        any: [/CFLAG:374\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2141',
        any: [/IF\ SELECTCOM\ ==\ 14\ \&\&\ TEQUIP:14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2143',
        any: [/IF\ CFLAG:315\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2145',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2146',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2148',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2149',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~！…不，不行的啊…那里被吸得那么紧的话…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2152',
        any: [
          /PRINTFORMW\ 「以为用这种东西…就能将%SELF_CALL\(TARGET\)%怎么样了吗…哈啊啊呜\~！？吸、吸地那么紧…呜唔\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2154',
        any: [/CFLAG:315\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2159',
        any: [
          /IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:315\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2160',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2161',
        any: [
          /PRINTFORMW\ 「啊啊…请更加地…欺负淫乱的阴蒂酱吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2162',
        any: [/CFLAG:315\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2164',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:315\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2165',
        any: [
          /PRINTFORMW\ 「哈嗯\~！…不、不行的啊\~…那里被吸得那么紧的话…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2166',
        any: [/PRINTFORMW\ 「啊啊\~…脑袋要变奇怪了啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2167',
        any: [/CFLAG:315\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2169',
        any: [/ELSEIF\ CFLAG:315\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2170',
        any: [/PRINTFORMW\ 「哈嗯呜\~…不、不行\~…振动…不行…的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2171',
        any: [/CFLAG:315\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2176',
        any: [/ELSEIF\ SELECTCOM\ ==\ 14\ \&\&\ TEQUIP:14\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2178',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:375\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2179',
        any: [
          /PRINTFORMW\ 「啊啊\~…还没有满足呢\~…这次就用主人的手来\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2180',
        any: [/CFLAG:375\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2182',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:375\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2183',
        any: [
          /PRINTFORMW\ 「啊啊…%SELF_CALL\(TARGET\)%\.\.\.可能已经不行了…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2184',
        any: [/CFLAG:375\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2186',
        any: [/ELSEIF\ CFLAG:375\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2187',
        any: [/PRINTFORMW\ 「哈啊…哈啊…终于…拿掉了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2188',
        any: [/CFLAG:375\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2198',
        any: [/IF\ SELECTCOM\ ==\ 15\ \&\&\ TEQUIP:15/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2200',
        any: [/IF\ CFLAG:316\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2202',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2203',
        any: [
          /PRINTFORMW\ 「啊啊\~…请将乳头…更加尽情地\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2205',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2206',
        any: [
          /PRINTFORMW\ 「哈呜\~…！请不要欺负乳头\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2209',
        any: [/PRINTFORMW\ 「哈呜呜\~…这样的…不行！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2210',
        any: [/PRINTFORMW\ 「乳，乳头…肿起来了啊…啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2212',
        any: [/CFLAG:316\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2217',
        any: [
          /IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:316\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2218',
        any: [
          /PRINTFORMW\ 「啊啊\~…请将乳头…更加尽情地\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2219',
        any: [
          /PRINTFORMW\ 「哈啊啊…乳头…好舒服啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2220',
        any: [/CFLAG:316\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2222',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:316\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2223',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~…！请不要欺负乳头\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2224',
        any: [
          /PRINTFORMW\ 「胸部…一抽一抽地\~…不行…要变得不行了呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2225',
        any: [/CFLAG:316\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2227',
        any: [/ELSEIF\ CFLAG:316\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2228',
        any: [/PRINTFORMW\ 「明，明明说了…不行来的…嗯\~嗯嗯\~…啊啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2229',
        any: [/CFLAG:316\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2234',
        any: [/ELSEIF\ SELECTCOM\ ==\ 15\ \&\&\ TEQUIP:15\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2236',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:376\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2237',
        any: [
          /PRINTFORMW\ 「哈啊啊啊\~…乳头居然变成那么不像样子了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2238',
        any: [/CFLAG:376\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2240',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:376\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2241',
        any: [/PRINTFORMW\ 「哈啊…哈啊…哈嗯…胸部好难受的啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2242',
        any: [/CFLAG:376\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2244',
        any: [/ELSEIF\ CFLAG:376\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2245',
        any: [/PRINTFORMW\ 「哈啊…哈啊…乳头…好奇怪啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2246',
        any: [/CFLAG:376\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2256',
        any: [/IF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2258',
        any: [/IF\ CFLAG:317\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2260',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2261',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…啊\~啊啊…奶居然…出来那么多了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2262',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2264',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2265',
        any: [
          /PRINTFORMW\ 「嗯\~…啊啊\~…居然出来那么多什么的…真是奇怪呢…啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2266',
        any: [
          /PRINTFORMW\ 从%SAVESTR:TARGET%的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2269',
        any: [/PRINTFORMW\ 「不要啊…母乳应该给小宝宝喝的呀…啊\~…啊啊啊\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2270',
        any: [
          /PRINTFORMW\ 从%SAVESTR:TARGET%的乳头渗出了母乳、一点一点地将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2272',
        any: [/CFLAG:317\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2277',
        any: [
          /IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:317\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2278',
        any: [
          /PRINTFORMW\ 「嗯哈呜\~…哈嗯呜\~…从胸部射出来居然会那么舒服…不管怀孕多少次都没关系了啦\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2279',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2280',
        any: [/CFLAG:317\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2282',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:317\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2283',
        any: [
          /PRINTFORMW\ 「胸部出来好多了啊\~…啊\~啊啊\~…要出来了啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2284',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2285',
        any: [/CFLAG:317\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2287',
        any: [/ELSEIF\ CFLAG:317\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2288',
        any: [/PRINTFORMW\ 「不要啊…母乳应该给小宝宝喝的呀…啊\~…啊啊啊\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2289',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的乳头渗出了母乳、一点一点地将奶罐给装满了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2290',
        any: [/CFLAG:317\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2295',
        any: [/ELSEIF\ SELECTCOM\ ==\ 16\ \&\&\ TEQUIP:16\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2297',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:377\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2298',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…只要一点点也就够了请让%SAVESTR:TARGET%喝一口吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2299',
        any: [/CFLAG:377\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2301',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:377\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2302',
        any: [
          /PRINTFORMW\ 「哈啊哈啊…只喝一口也没有关系，请大人您尝一尝吧\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2303',
        any: [/CFLAG:377\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2305',
        any: [/ELSEIF\ CFLAG:377\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2306',
        any: [/PRINTFORMW\ 「啊啊…居然出来…那么多的母乳了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2307',
        any: [/CFLAG:377\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2372',
        any: [/IF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2374',
        any: [/IF\ CFLAG:TARGET:320\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2376',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2377',
        any: [/PRINTFORMW\ 「嗯哈噢噢噢\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2378',
        any: [
          /PRINTFORMW\ 「小球…进去了…啊啊\~…嗯哈啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2380',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2381',
        any: [
          /PRINTFORMW\ 「啊啊\~…又要欺负屁股了对吧\~…嗯\~…呼哈\~…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2384',
        any: [
          /PRINTFORMW\ 「哈呜\~…屁股的洞洞里…塞进这种东西是不…啊啊\~呀啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2386',
        any: [/CFLAG:TARGET:320\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2391',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2392',
        any: [/PRINTFORMW\ 「啊嗯\~…嗯哈嗯\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2393',
        any: [
          /PRINTFORMW\ 「往肛穴里…塞进了好多小球了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2394',
        any: [
          /PRINTFORMW\ 「在里面…转来转去地动呢\~…哈啊啊\~%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%的屁股好像要不行了呀啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2395',
        any: [/CFLAG:320\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2397',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:320\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2398',
        any: [
          /PRINTFORMW\ 「小球…进去了\~…啊啊\~…嗯哈啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2399',
        any: [
          /PRINTFORMW\ 「啊啊\~…在肛穴里面转来转去呢\~…哈啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2400',
        any: [/CFLAG:320\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2402',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2403',
        any: [/PRINTFORMW\ 「啊啊\~…屁股被欺负居然那么有感觉什么的\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2404',
        any: [
          /PRINTFORMW\ 「魔王大人\~…虽然是这种喜欢被欺负肛穴无可救药的变态来的…但也请让%SAVESTR:TARGET%呆在您的身旁吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2405',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%摇晃着拉珠从肛穴露出的那一部分%NAME:MASTER%撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2406',
        any: [/CFLAG:320\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2408',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:320\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2409',
        any: [
          /PRINTFORMW\ 「啊啊\~…又要欺负屁股了对吧\~…嗯\~…哈啊\~…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2410',
        any: [/PRINTFORMW\ 「好过分…的说…这么欺负屁股的话…啊嗯\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2411',
        any: [/CFLAG:320\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2413',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:320\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2414',
        any: [
          /PRINTFORMW\ 「哼嗯呜\~…怎么能这样…啊啊\~…肚子的里面…已经变得一抽一抽的了呀\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2415',
        any: [/CFLAG:320\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2417',
        any: [/ELSEIF\ \ CFLAG:320\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2418',
        any: [/PRINTFORMW\ 「好难、好难受啊…肚子的里面…好难受啊啊…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2419',
        any: [/CFLAG:320\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2424',
        any: [/ELSEIF\ SELECTCOM\ ==\ 19\ \&\&\ TEQUIP:19\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2426',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:379\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2427',
        any: [
          /PRINTFORMW\ 「哈啊恩\~…肛穴…好像往外翻了………%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2428',
        any: [/CFLAG:379\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2430',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:379\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2431',
        any: [
          /PRINTFORMW\ 「哈呜呀啊啊\~……♪　请更加地…欺负屁股吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2432',
        any: [/CFLAG:379\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2434',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:379\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2435',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…不行\~…屁股被欺负的话…就要变得不行了啊\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2436',
        any: [/CFLAG:379\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2438',
        any: [/ELSEIF\ CFLAG:379\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2439',
        any: [/PRINTFORMW\ 「啊啊啊\~…啊\~…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2440',
        any: [/CFLAG:379\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2448',
        any: [/IF\ SELECTCOM\ ==\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2450',
        any: [/IF\ CFLAG:TARGET:321\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2452',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2454',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2456',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2457',
        any: [
          /PRINTFORMW\ 「啊啊啊…主人\~…非常感谢主人…将淫乱的堕落精灵的…处女小穴给贯穿掉…真的是非常感谢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2458',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%眼角流出了眼泪抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2459',
        any: [
          /PRINTFORMW\ 「哼啊…啊…不、不要…%SELF_CALL\(TARGET\)%…明明…是第一次来的…嗯\~…啊\~…却立马对主人的大鸡巴有感觉了\~…哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2460',
        any: [
          /PRINTFORMW\ 「啊啊\~…主人的大鸡巴好热\~…啊啊\~不行\~…明明只是大鸡鸡进去了而已\.\.\.脑袋…变得…奇怪起来了\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2461',
        any: [
          /PRINTFORMW\ 「嗯呜\~%UNICODE\(0x2661\)\ \*1%…请就这样…往淫乱小穴里…用主人的大鸡巴来，做上标记吧\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2462',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像为了让%SAVESTR:PLAYER%不逃掉的一样，用双腿将%SAVESTR:PLAYER%的腰给缠住………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2466',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2467',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…终于…终于得到了主人的大鸡巴了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2468',
        any: [
          /PRINTFORMW\ 「好高兴…好高兴的说\~…如果能…能更加早侵犯\ %SAVESTR:TARGET%就更好了\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2469',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%说着这样的话的时候也在忍耐着破瓜之疼。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2470',
        any: [
          /PRINTFORMW\ 「撒\~…请更加…更加像野兽一样地侵犯吧\~%UNICODE\(0x2661\)\ \*1%让%SAVESTR:TARGET%成为主人的东西吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2471',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%再也没有想起在故乡的恋人了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2473',
        any: [
          /PRINTFORMW\ 「哈啊恩\~…终于…给予大鸡巴了呀\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2474',
        any: [
          /PRINTFORMW\ 「主人…%SAVESTR:TARGET%的淫乱处女小穴的味道怎样呀\~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2475',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET,\ 1\)%…主人的大鸡巴只是刚刚进去就已经去了好多次了呀\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2476',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%说着这样的话的时候也在忍耐着破瓜之疼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2480',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2482',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2483',
        any: [
          /PRINTFORMW\ 「和魔王…大人…做这样的事情什么的\~…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2484',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…没、没关系的\~…请按照自己想要得…动吧\~…嗯嗯\~………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2485',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%眼睛流下了泪水一脸痛苦的样子，用力地紧紧抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2486',
        any: [
          /PRINTFORMW\ 「啊啊\~…这、这样的没有关系的啦…快点…请让%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…成为、大人您的东西吧………%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2487',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%长长的耳朵完全变得通红起来，将自己交给了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2491',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2492',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~…好、好深的说…啊\~啊啊啊…能感受到…大、大人的东西\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2493',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的处女膜给捅破了、因为太疼在%SAVESTR:PLAYER%的背后挠出了抓痕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2494',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊\~\~%UNICODE\(0x2661\)\ \*1%…啊啊啊\~～%UNICODE\(0x2661\)\ \*1%………好、好热\~…好像要变奇怪了啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2495',
        any: [
          /PRINTFORMW\ 「这样，%SELF_CALL\(TARGET\)%…就变成了大人您东西来的了…绝对…不会离开您的身边…啊啊\~…更多…请更加地%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2496',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一瞬间好像想起了某个重要的人，但是很快就忘记掉了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2498',
        any: [/PRINTFORMW\ 「嗯\~…啊啊\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2499',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%没关系的啊\~…就像平时一样…毫不留情地将%SELF_CALL\(TARGET\)%…哼啊\~…啊\~啊啊啊啊～！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2500',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%毫不留情地将阴茎插了过去、将%SAVESTR:TARGET%的处女膜给捅破了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2501',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊啊…啊啊\.\.\.这样，%SELF_CALL\(TARGET\)%就成为了大人您的东西了啊…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2507',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2508',
        any: [
          /PRINTFORMW\ 「啊啊\~…不要啊\~…哈呜…哈呜\~…再这样…插进去的话…%SELF_CALL\(TARGET\)%的处女就…啊\~啊啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2509',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%无视掉%SAVESTR:TARGET%的悲鸣直接将%SAVESTR:TARGET%的处女给夺走了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2510',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…已经、已经没有脸再见那个人了…呜呜\~…呜呜呜呜呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2511',
        any: [
          /PRINTFORMW\ 听着%SAVESTR:TARGET%的哭声%SAVESTR:PLAYER%继续侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2513',
        any: [
          /PRINTFORMW\ 「唔呜呜…！………啊啊\~…大，大鸡巴在…%SELF_CALL\(TARGET\)%的里面………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2514',
        any: [
          /PRINTFORMW\ 「不、不行的啊…还、还不可以动…啊\~啊\~！哈啊呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2520',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2521',
        any: [
          /PRINTFORMW\ 「嗯哈啊嗯\~…！请更加地…去侵犯%SELF_CALL\(TARGET\)%的淫乱小穴吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2522',
        any: [
          /PRINTFORMW\ 「啊啊\~…果然…被侵犯…嘴巴了…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2523',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抱住%SAVESTR:PLAYER%发出了娇喘………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2525',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2526',
        any: [
          /PRINTFORMW\ 「啊嗯\~…嗯\~…像这样…将大人您抱住什么的…十分愉快呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2527',
        any: [
          /PRINTFORMW\ 「啊\~！…呀，呀嗯\~…这、这么地…突然那么激烈得话…嗯\~啊\~哈啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2530',
        any: [
          /PRINTFORMW\ 「哈啊…男人都是像这样…做的对吧…嗯\~…嗯\~…嗯哼唔\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2533',
        any: [/CFLAG:321\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2538',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2539',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2540',
        any: [
          /PRINTFORMW\ 「请弄得…更加死去活来地吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2541',
        any: [
          /PRINTFORMW\ 「就这在小穴的深处里面射出来吧\~…请让%SELF_CALL\(TARGET\)%…去…去了吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2542',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%不停地发出愉悦的娇喘，从%SAVESTR:TARGET%的身上一点高贵气息都看不到了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2543',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2544',
        any: [
          /PRINTFORMW\ 「啊哈嗯唔\~…哈唉呜\~…小穴SEX…最棒了啊\~%UNICODE\(0x2661\)\ \*1%…请更多地…更加地侵犯那里吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2545',
        any: [
          /PRINTFORMW\ 「请播种子进去吧…好想被播种子进去啦\~%UNICODE\(0x2661\)\ \*1%…精液\~…请给精液给%SELF_CALL\(TARGET\)%吧\~\~…呀\~…呀啊啊\~…啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2546',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%如同雌犬一样不断地呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2548',
        any: [/PRINTFORMW\ 「嗯哈啊\~…好舒服\~\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2549',
        any: [/PRINTFORMW\ 「小穴SEX最棒了啊\~\~\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2550',
        any: [
          /PRINTFORMW\ 兴奋起来的%SAVESTR:TARGET%伸出了舌头，舔起了%SAVESTR:PLAYER%的脸。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2551',
        any: [
          /PRINTFORMW\ 「哈啊啊\~%UNICODE\(0x2661\)\ \*1%\ 请往%SELF_CALL\(TARGET\)%的\~%UNICODE\(0x2661\)\ \*1%\ 淫乱小穴里\~%UNICODE\(0x2661\)\ \*1%\ 播下种子吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2553',
        any: [/CFLAG:321\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2555',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:321\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2556',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2557',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将%SAVESTR:PLAYER%紧紧地抱住，感受着腔内带来的快感而娇喘着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2558',
        any: [
          /PRINTFORMW\ 「喜欢…好喜欢的啊\~\~%UNICODE\(0x2661\)\ \*1%…所以…请更加激烈地…疼爱%SELF_CALL\(TARGET\)%吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2559',
        any: [
          /PRINTFORMW\ 「啊啊\~…那里…那里好棒啊啊\~…让%SELF_CALL\(TARGET\)%的身体…更加地成为%SAVESTR:PLAYER%大人的东西吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2560',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2561',
        any: [
          /PRINTFORMW\ 「啊哈啊…大鸡巴…居然…塞到了这么深…啊\~…啊哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2562',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的那里…要记下大鸡巴的形状了呀\~\~…%UNICODE\(0x2661\)\ \*1%\ 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2563',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%侵犯着%SAVESTR:TARGET%、每当腔内深处被顶到%SAVESTR:TARGET%都会从嘴边漏出一声娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2565',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…啊啊\~…%SAVESTR:PLAYER%大人………请更多地…拥抱也没有关系吧\~\~…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2566',
        any: [
          /PRINTFORMW\ 「像、像这样抱住的话…就更感觉会更加舒服呢\~…啊嗯\~…嗯\~…哈啊啊\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2567',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用双手将%SAVESTR:PLAYER%来回、好像很舒服地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2569',
        any: [/CFLAG:321\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2571',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:321\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2572',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊\~…恩呜呜…将腿…张得更开…什么的…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2573',
        any: [
          /PRINTFORMW\ 「啊啊\~啊\~…哈呜\~好深啊\~…到顶了呀\~\~…啊啊\~啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2574',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%不像样地不断呻吟着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2575',
        any: [/CFLAG:321\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2577',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:321\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2578',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊啊\~…嗯呜呜…将腿…张得更开…什么的…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2579',
        any: [/PRINTFORMW\ 「不行…不行啊\~…再这样…侵犯下去的话………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2580',
        any: [/CFLAG:321\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2582',
        any: [/ELSEIF\ CFLAG:321\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW\ 「哈呜\~…嗯呜\~…嗯嗯呜\~…再这样下去…就绝对不会原谅你了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2584',
        any: [/CFLAG:321\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2594',
        any: [/IF\ SELECTCOM\ ==\ 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2596',
        any: [/IF\ CFLAG:TARGET:322\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2598',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2600',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2602',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2603',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将屁股抬得高高的，诱惑着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2604',
        any: [
          /PRINTFORMW\ 「撒\~…主人…请品尝淫乱堕落精灵族的…处女屁股吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2605',
        any: [
          /PRINTFORMW\ 「想要主人的大鸡巴…的堕落的精灵族的屁股堕落\~…快点侵犯吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2606',
        any: [/PRINTW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2607',
        any: [/PRINTFORMW\ 「………拜、拜托了\~…这、这个样子…很羞耻的啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2608',
        any: [
          /PRINTFORMW\ 看着没有被理睬差不多要哭出来的%SAVESTR:TARGET%兴奋起来的%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰部后，毫不犹豫直接将阴茎往腔内插进去了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2609',
        any: [
          /PRINTFORMW\ 「哈啊呜\~！？这、这样…突然就%UNICODE\(0x2661\)\ \*1%…噢\~…嗯噢噢噢噢\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2613',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2614',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将自己的屁股用双手扒开诱惑着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2615',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的…处，处女膜能看到吗…是为了让主人捅破而存在的噢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2616',
        any: [
          /PRINTFORMW\ 「前一个情人也没有给的%SELF_CALL\(TARGET\)%的小穴…一抽一抽地\~…想要被主人侵犯呢\~%UNICODE\(0x2661\)\ \*1%…啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2617',
        any: [
          /PRINTFORMW\ 听着%SAVESTR:TARGET%诱惑的话语，%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，毫不留情地将腔内蹂蹑起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2618',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~…主人的%UNICODE\(0x2661\)\ \*1%…大鸡巴%UNICODE\(0x2661\)\ \*1%…大鸡巴\~%UNICODE\(0x2661\)\ \*1%…到里面…来了………啊啊啊啊\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2619',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%再也没有想起故乡的恋人了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2621',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将自己的屁股用双手扒开诱惑着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2622',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的…处，处女膜能看到吗…是为了让主人捅破而存在的噢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2623',
        any: [
          /PRINTFORMW\ 「啊\~、不要的呀\~…没想到真的能看到里面啊\~…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…不、不要…只是被看着就%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2624',
        any: [
          /PRINTFORMW\ 看着，被看着就好像要去了的%SAVESTR:TARGET%就兴奋起来的%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰好不犹豫地将阴茎塞进了腔内。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2625',
        any: [
          /PRINTFORMW\ 「嘎哈啊\~…啊\~…啊啊啊\~…大鸡巴%UNICODE\(0x2661\)\ \*1%…大鸡巴%UNICODE\(0x2661\)\ \*1%…到里面…来了………啊啊啊啊\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2629',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2631',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2632',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊…从后面…侵犯%SELF_CALL\(TARGET\)%对吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2633',
        any: [
          /PRINTFORMW\ 「明，明白了…%SELF_CALL\(TARGET\)%会…成为大人您的东西的%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2634',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰抓住、毫不留情地将阴茎往里面塞。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2635',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊\~…哈啊啊啊\~…到里面…来了…%SELF_CALL\(TARGET,\ 1\)%…真的成为了魔王的…嗯啊\~哈啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2636',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%长长的耳朵颤抖着，发出了欢快的娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2640',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2641',
        any: [
          /PRINTFORMW\ 「啊啊\~…这种不知羞耻的姿势…哪怕在那个人的面前也没有做过的说…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2642',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像很高兴的样子摇晃着屁股诱惑着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2643',
        any: [
          /PRINTFORMW\ 「已经…只能给%SELF_CALL\(TARGET\)%看到这样的样子…的说…请拿下%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的贞洁吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2644',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰抓住，结果%SAVESTR:TARGET%发出了好像期待已久的甜美呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2645',
        any: [
          /PRINTFORMW\ 「是这样啊\~%UNICODE\(0x2661\)\ \*1%\ 这个是…让%SELF_CALL\(TARGET\)%真的成为大人您的东西的重要…仪式来的对吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2646',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~%UNICODE\(0x2661\)\ \*1%\ 大鸡巴%UNICODE\(0x2661\)\ \*1%…到深处…哈呜嗯\~…进、进来\~…进来了呀啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2648',
        any: [/PRINTFORMW\ 「啊\~…这种姿势来做什么的…不行…不行的呀\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2649',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%虽然嘴上这么说，但还是很高兴的摇晃着屁股。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2650',
        any: [
          /PRINTFORMW\ 「啊嗯\~…撒\~…快点将%SELF_CALL\(TARGET\)%变成大人你的东西吧\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2651',
        any: [
          /PRINTFORMW\ 腰被抓住后%SAVESTR:TARGET%发出了甘甜的娇喘声诱惑着%SAVESTR:PLAYER%、等待着侵犯的到来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2652',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2653',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…到深处了…大鸡巴\~！到深处了啊\~\~！…哈啊啊\~啊\~啊啊啊啊啊啊啊啊\~～～～！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2659',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2660',
        any: [
          /PRINTFORMW\ 「哈…哈啊…原，请原谅…%SELF_CALL\(TARGET\)%还有…重要的人…啊\~啊啊\~…不要啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2661',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%向后推倒后，直接从后面毫不留情地将处女给夺走了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2662',
        any: [
          /PRINTFORMW\ 「这、这样得…骗…骗人得…啊\~…哈\~…呜\~…呜哈啊嗯呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2663',
        any: [
          /PRINTFORMW\ 听着%SAVESTR:TARGET%的哭声%SAVESTR:PLAYER%继续侵犯下去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2665',
        any: [
          /PRINTFORMW\ 「这种姿势什么的…简直…就像狗一样…啊啊\~…嗯唔唔唔！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2666',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…明明…是第一次来的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2667',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的头往床上压下去，毫不留情地对准腰部抽插起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2673',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2674',
        any: [
          /PRINTFORMW\ 「啊啊\~…快点\~呜\~…进来吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2675',
        any: [
          /PRINTFORMW\ 「就像汪酱一样…侵犯%SAVESTR:TARGET%吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2677',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2678',
        any: [/PRINTFORMW\ 「啊嗯\~…屁股…就那么喜欢吗\~…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2679',
        any: [
          /PRINTFORMW\ 「啊啊\~…请、请吧…就这样将后面给…侵犯了吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2682',
        any: [
          /PRINTFORMW\ 「这种姿势什么的…就像是…狗一样犬…啊啊\~…嗯唔唔唔唔！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2683',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的脑袋往下压下去毫不留情地对准腰部抽插起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2686',
        any: [/CFLAG:322\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2691',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2692',
        any: [/IF\ TEQUIP:44\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2693',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2694',
        any: [
          /PRINTFORMW\ 「被绑住就会有感觉了啊\~…请对淫乱的%SAVESTR:TARGET%的小穴……尽情地处罚吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2696',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%最喜欢…被捆绑着侵犯了\~……喜欢到完全忍不住的程度\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2698',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2699',
        any: [/PRINTFORMW\ 「请…请更加粗鲁地做吧\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2700',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2701',
        any: [
          /PRINTFORMW\ 「哈啊\~%UNICODE\(0x2661\)\ \*1%\ 真是好棒的啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2703',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是…让大鸡巴插进来，侍奉大鸡巴的肉便器来的\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2706',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2707',
        any: [
          /PRINTFORMW\ 「啊哈啊嗯\~…就像野兽一样SEX最喜欢了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2708',
        any: [
          /PRINTFORMW\ 「更加…请更加侵犯那里吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2709',
        any: [
          /PRINTFORMW\ 就像野兽一样发出了淫乱的娇喘声的%SAVESTR:TARGET%的身上已经完全看不到以往的高贵姿态了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2710',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2711',
        any: [
          /PRINTFORMW\ 「啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 好喜欢被主人给侵犯呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2712',
        any: [
          /PRINTFORMW\ 「被这样做的话…%SELF_CALL\(TARGET\)%…就能感觉到自己就是为了被大鸡巴插而出生的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2714',
        any: [
          /PRINTFORMW\ 「请尽情地侵犯\.\.\.野兽般的%SAVESTR:TARGET%的小穴吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2715',
        any: [/PRINTFORMW\ 「恩哈呜嗯\~…啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2716',
        any: [
          /PRINTFORMW\ 「就像野兽一样%UNICODE\(0x2661\)\ \*1%\ 野兽SEX最棒了\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2719',
        any: [/CFLAG:322\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2721',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2722',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2723',
        any: [/PRINTFORMW\ 「啊\~…哈啊\~…啊啊\~…虽然说…喜欢怎样都行也好…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2724',
        any: [
          /PRINTFORMW\ 「从后面…就像野兽一样…哈呜\~…哈呜\~%UNICODE\(0x2661\)\ \*1%\ 哈啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2725',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊\~…啊啊\~♪…请更加更多地做吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2726',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2727',
        any: [/PRINTFORMW\ 「恩呜呜\~…呜哼\~…啊啊\~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2728',
        any: [
          /PRINTFORMW\ 「请更尽情的做吧\~%UNICODE\(0x2661\)\ \*1%\ 就这样播下种子…让%SELF_CALL\(TARGET\)%怀孕了吧\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2730',
        any: [
          /PRINTFORMW\ 「啊\~啊\~啊啊啊\~嗯哼嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2731',
        any: [
          /PRINTFORMW\ 「从背后被这样…侵犯着…还会高兴什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2732',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…已经要变得不行了呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2734',
        any: [/CFLAG:322\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2736',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2737',
        any: [
          /PRINTFORMW\ 「啊啊\~…明明是、这么…屈辱的样子…嗯呜\~…啊\~嗯\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2738',
        any: [
          /PRINTFORMW\ 「却有感觉…什么的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经…不行了啊\~…啊\~…啊\~啊啊\~嗯啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2739',
        any: [/CFLAG:322\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2741',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2742',
        any: [
          /PRINTFORMW\ 「请、请将…%SELF_CALL\(TARGET\)%的那里…侵犯了吧\~…嗯呜…呜\~呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2743',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被侵犯地眼泪都流下来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2744',
        any: [/CFLAG:322\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2746',
        any: [/ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2747',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%…就像是狗一样…嗯\~啊\~啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2748',
        any: [/CFLAG:322\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2759',
        any: [/IF\ SELECTCOM\ ==\ 22/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2760',
        any: [/IF\ CFLAG:TARGET:323\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2762',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2764',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2765',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2767',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2768',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2771',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2776',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2777',
        any: [
          /PRINTFORMW\ 「嗯…啊\~…啊嗯\~…请更加地…往上顶吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2778',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…从腰往下的部位都融化掉动不了了呀…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2779',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸沉浸在淫乱中的表情抱了过来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2781',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2782',
        any: [/PRINTFORMW\ 「喜欢…好喜欢啊\~…啊啊啊\~…啾\~…啾\~…嗯哼唔\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2783',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将双手来回抱住了%SAVESTR:PLAYER%的脖子尽情地撒着娇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2784',
        any: [
          /PRINTFORMW\ 「这个姿势…真是相爱得好姿势呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2787',
        any: [
          /PRINTFORMW\ 「恩呀唔！从，从下面往上顶不行啊、不行来的啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2790',
        any: [/CFLAG:323\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2795',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:323\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2796',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2797',
        any: [
          /PRINTFORMW\ 「嗯\~…啊\~…啊嗯\~…请请更加地…往上顶吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2798',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…从腰往下的部位都融化掉动不了了呀…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2799',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸沉浸在淫乱中的表情抱了过来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2800',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2801',
        any: [
          /PRINTFORMW\ 「啊\~…嗯\~%UNICODE\(0x2661\)\ \*1%\ 哈啊\~%UNICODE\(0x2661\)\ \*1%…好，好棒的啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2802',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的…的小穴%UNICODE\(0x2661\)\ \*1%\ 被主人的大鸡巴给塞满了啊%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2803',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…想奉献上一个吻给主人呢\~…嗯啾\~…啾\~…啾呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2805',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊嗯\~…♪腰自己就动起来了…完全停不下来了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2806',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的淫乱小穴是…为了将大鸡巴吞下才存在的呀\~%UNICODE\(0x2661\)\ \*1%\ 完全没有问题吧\~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2807',
        any: [
          /PRINTFORMW\ 「啊啊\~…已经\~…已经\~…感觉真的要变得不行了\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2809',
        any: [/CFLAG:323\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2811',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:323\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2812',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2813',
        any: [
          /PRINTFORMW\ 「嗯啾\~…嗯啾…嗯哼\~…还想要…更多的…kiss………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2814',
        any: [
          /PRINTFORMW\ 「啊嗯\~…不、不行的啊…难得%SELF_CALL\(TARGET\)%可以…哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2815',
        any: [
          /PRINTFORMW\ 「啊啊\~…已、已经…再从下面…往上顶的话…哈\~…嗯\~…嗯\~…啊啊啊………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2816',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%摇动着腰部、每当腔内的深处被顶到的话，就露出一副荡漾的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2817',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2818',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%会好好动起来的啦\~…所以大人请完全交给%SELF_CALL\(TARGET\)%吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2819',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%轻轻地舔了一下嘴唇，开始前后摇晃起了牙签哦不。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2820',
        any: [
          /PRINTFORMW\ 「啊\~…啊嗯\~…嗯\~…请用力地…将%SELF_CALL\(TARGET\)%…抱住吧…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2822',
        any: [/PRINTFORMW\ 「喜欢…好喜欢啊\~…啊啊啊…啾\~…啾\~…嗯呼嗯\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2823',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将双手来回抱住了%SAVESTR:PLAYER%的脖子尽情地撒着娇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2824',
        any: [
          /PRINTFORMW\ 「这个姿势…真是相爱得好姿势呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2826',
        any: [/CFLAG:323\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2828',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:323\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2829',
        any: [
          /PRINTFORMW\ 「不、不要啊…怎么会…腰自己就…嗯\~…好、好的…会抱住…大人你…的啦…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2830',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊\~♪…嗯\~…好奇怪…那里…居然好舒服…啊啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2831',
        any: [/PRINTFORMW\ 「不行\~…腰要\~…啊\~啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2832',
        any: [/CFLAG:323\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2834',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:323\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2835',
        any: [/PRINTFORMW\ 「是的…会好好动起来的…请、请不要从下往上顶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2836',
        any: [/PRINTFORMW\ 「嗯呼呜\~…呜\~…呀\~…哈啊啊\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2837',
        any: [/CFLAG:323\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2839',
        any: [/ELSEIF\ CFLAG:323\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2840',
        any: [
          /PRINTFORMW\ 「呼\~…呜啊\~…啊\~…这种姿势…进到…深处了…不要…请、请不要动起来啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2841',
        any: [/CFLAG:323\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2851',
        any: [/IF\ SELECTCOM\ ==\ 23/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2852',
        any: [/IF\ CFLAG:TARGET:324\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2854',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2856',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2857',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2859',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2860',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2863',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2868',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2869',
        any: [/PRINTFORMW\ 「啊嗯\~…从后面…被从下往上插…十分得棒呢\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2870',
        any: [
          /PRINTFORMW\ 「请将那里…弄得更加乱七八糟地吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2872',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2873',
        any: [
          /PRINTFORMW\ 「嗯呜\~…请、请再温柔一点\~…这么粗鲁地\~…啊\~…哈呜\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2874',
        any: [
          /PRINTFORMW\ 「这，这么地…粗鲁的话怎么可能会有…哈啊呜\~%UNICODE\(0x2661\)\ \*1%…哈呀嗯呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2877',
        any: [/PRINTFORMW\ 「啊\~…啊啊\~…进到…里面了…嗯呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2880',
        any: [/CFLAG:324\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2885',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:324\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2886',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2887',
        any: [/PRINTFORMW\ 「哈呀呜…嗯\~嗯唔呜\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2888',
        any: [
          /PRINTFORMW\ 「大鸡巴…啊啊\~…能非常感受到形状呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2889',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%在被从下往上抽插的途中好像很怜爱地样子来回抚摸着自己肚子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2890',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2891',
        any: [
          /PRINTFORMW\ 「请更加…请更加地欺负那里吧\~\~…%SELF_CALL\(TARGET\)%最喜欢被大鸡巴欺负了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2892',
        any: [
          /PRINTFORMW\ 「哈呀啊\~…好、好棒啊\~%UNICODE\(0x2661\)\ \*1%\ 小穴要坏掉了呜呜呜呜\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2893',
        any: [
          /PRINTFORMW\ 被从下往上抽插着而不断说着淫猥的话语的%SAVESTR:TARGET%的身上完全感受不到以往的一丝高贵姿态了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2895',
        any: [
          /PRINTFORMW\ 「啊\~…啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 哈啊\~%UNICODE\(0x2661\)\ \*1%\ 嗯啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2896',
        any: [
          /PRINTFORMW\ 「好棒…好棒的啊！\~%UNICODE\(0x2661\)\ \*1%\ 请更加地…欺负小穴吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2898',
        any: [/CFLAG:324\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2900',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:324\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2901',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2902',
        any: [
          /PRINTFORMW\ 「啊\~…嗯呼\~♪\ 啊啊\~…腰、腰自己就…动起来了啊\~\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2903',
        any: [
          /PRINTFORMW\ 「请从后面…牢牢地抱住%SELF_CALL\(TARGET\)%吧\~………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2904',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…啊\~%UNICODE\(0x2661\)\ \*1%\ 啊\~%UNICODE\(0x2661\)\ \*1%\ 啊啊啊啊嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2905',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2906',
        any: [
          /PRINTFORMW\ 「喜欢，好喜欢得啊\~%UNICODE\(0x2661\)\ \*1%\ 被大人你抱住什么的…最喜欢了\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2907',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…嗯\~…大人你的手…好温柔…%SELF_CALL\(TARGET\)%…要变得更加不行了呀………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2908',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同撒娇一样发出了娇喘晃动起了腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2910',
        any: [
          /PRINTFORMW\ 每当%SAVESTR:TARGET%被%SAVESTR:PLAYER%从下往上抽插就会从嘴边漏出娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2911',
        any: [
          /PRINTFORMW\ 「啊哈呀哈啊\~♪\ 噢\~…噢噢\~%UNICODE\(0x2661\)\ \*1%\ 啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2912',
        any: [
          /PRINTFORMW\ 「被温柔…抱着…然后被贯穿\~…太幸福了\~…感觉就要去了啊\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2914',
        any: [/CFLAG:324\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2916',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:324\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2917',
        any: [
          /PRINTFORMW\ 「好，好的…会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2918',
        any: [
          /PRINTFORMW\ 「嗯哈呀呜呜\~♪…好、好的…往、往深处塞进去…好、好难受啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2919',
        any: [/PRINTFORMW\ 「啊\~…嗯\~啊啊嗯\~！…啊啊\~嗯\~…哼啊啊啊\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2920',
        any: [/CFLAG:324\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2922',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:324\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2923',
        any: [
          /PRINTFORMW\ 「好、好的……会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2924',
        any: [/CFLAG:324\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2926',
        any: [/ELSEIF\ CFLAG:324\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2927',
        any: [/PRINTFORMW\ 「哈啊…哈啊啊…啊、小穴…被扩大了…啊\~啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2928',
        any: [/CFLAG:324\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2937',
        any: [/IF\ SELECTCOM\ ==\ 24/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2938',
        any: [/IF\ CFLAG:TARGET:325\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2940',
        any: [/IF\ TALENT:PLAYER:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2942',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2943',
        any: [
          /PRINTFORMW\ 「%SAVESTR:PLAYER%的处女小穴%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%会好好地疼爱的噢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2944',
        any: [
          /PRINTFORMW\ 「疼的只有最初而已噢\~%UNICODE\(0x2661\)\ \*1%\ 撒\~…请用下流的声音哭出来吧\~%UNICODE\(0x2661\)\ \*3%\ 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2946',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2947',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2950',
        any: [/PRINTFORMW\ 「居然想要做这样的事情什么的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2951',
        any: [/PRINTFORMW\ 「真是够恶趣味的呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2956',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2957',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2959',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2960',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2963',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2966',
        any: [/CFLAG:325\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2971',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:325\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2972',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2973',
        any: [/CFLAG:325\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2975',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:325\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2976',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2977',
        any: [/CFLAG:325\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2979',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:20\ >=\ 3\ \&\&\ \(CFLAG:325\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2980',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2981',
        any: [/PRINTFORMW\ 「哼嗯\~哼嗯\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2982',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%会好好地调教你，让你也变成出色的雌豚噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2984',
        any: [/PRINTFORMW\ 「被%SELF_CALL\(TARGET\)%侵犯地有感觉了吧\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2985',
        any: [
          /PRINTFORMW\ 「来吧\~…快说被%SELF_CALL\(TARGET\)%侵犯地很舒服吧\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2987',
        any: [/CFLAG:325\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2989',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:325\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2990',
        any: [
          /PRINTFORMW\ 「真是没有办法呢\~…哈啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2991',
        any: [
          /PRINTFORMW\ 「这是命令来的嘛…真是没法反抗%SELF_CALL\(TARGET\)%呢……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2992',
        any: [/CFLAG:325\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2994',
        any: [/ELSEIF\ CFLAG:325\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2995',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2996',
        any: [/PRINTFORMW\ 「至少…会用不怎么痛的方式来疼爱你吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '2998',
        any: [/PRINTFORMW\ 「呜唔…这样的行为、恶趣味也请适可而止一点啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3000',
        any: [/CFLAG:325\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3010',
        any: [/IF\ SELECTCOM\ ==\ 26/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3012',
        any: [/IF\ CFLAG:TARGET:327\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3014',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3016',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3017',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%居然…因为肛穴被塞进了大鸡巴…而感觉到高兴什么的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3018',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%垂着舌头、沉浸在了肛门被侵犯的感觉里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW\ 「主人\~…请往淫乱的堕落精灵的肛穴用精液射地满满得吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3020',
        any: [
          /PRINTFORMW\ 「请将%SELF_CALL\(TARGET\)%变成主人专用的肛穴奴隶吧\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3023',
        any: [
          /PRINTFORMW\ 「哈啊啊\~♪…肛穴将整只大鸡巴都吞下去了啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3024',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%淫乱地笑着，用双腿夹住%SAVESTR:PLAYER%的腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3025',
        any: [
          /PRINTFORMW\ 「撒\~…请往%SELF_CALL\(TARGET\)%的肛穴里面～射一堆用来标记的精液吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3028',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3030',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW\ 「啊啊\~…这样…%SELF_CALL\(TARGET\)%的…肛门…被侵犯着…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3032',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的长耳朵完全变得通红起来、忍受着屈辱的肛门虐待。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3033',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…没、没有关系的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3034',
        any: [
          /PRINTFORMW\ 「不，不过哪怕是这样…也请…温柔一点………%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3037',
        any: [
          /PRINTFORMW\ 「啊啊\~…大鸡巴…进去了呃…嗯呜呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3038',
        any: [/PRINTFORMW\ 「哈啊…啊啊…会忍耐…会好好地…忍耐住得…所以………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3039',
        any: [/PRINTFORMW\ 「请…尽情地享受吧\~…%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3043',
        any: [
          /PRINTFORMW\ 「哈啊啊啊\~！？那、那里才不是将大鸡巴塞进去的地方来的啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3044',
        any: [/PRINTFORMW\ 「不、不要啊…不要啊啊啊\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3046',
        any: [/CFLAG:TARGET:327\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3051',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3052',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3053',
        any: [
          /PRINTFORMW\ 「哈呜啊\~%UNICODE\(0x2661\)\ \*1%\ 请更加地…将肛穴给扩大了吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3054',
        any: [
          /PRINTFORMW\ 「啊啊…肛穴太舒服了真的太对不起了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3055',
        any: [
          /PRINTFORMW\ 「但是，但是…肛穴被侵犯了的话真的会变得不行了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3056',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3057',
        any: [
          /PRINTFORMW\ 「啊\~啊\~哼啊啊\~%UNICODE\(0x2661\)\ \*1%\ 肛穴强奸…再做多一点吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3058',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%从嘴边不像样地留着口水和%SAVESTR:PLAYER%沉浸在了肛门虐待的快乐之中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3059',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脑袋中已经只剩下肛穴给予的快乐的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3061',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…啊\~啊\~啊啊\~…来回抽插着%UNICODE\(0x2661\)\ \*1%\ 在来回抽插着\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3062',
        any: [
          /PRINTFORMW\ 「肛穴…要变得不行了\~%UNICODE\(0x2661\)\ \*1%\ 要变成SEX专用的穴来了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3063',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 啊哈啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3065',
        any: [/CFLAG:327\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3067',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:327\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3068',
        any: [
          /PRINTFORMW\ 「啊\~啊\~哼啊啊\~%UNICODE\(0x2661\)\ \*1%\ 肛穴强奸…再做多一点吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3069',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的肛穴…被再干多一点的话…里面的形状就会更加贴合主人的大鸡巴的形状了\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3070',
        any: [/CFLAG:327\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3072',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3073',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3074',
        any: [
          /PRINTFORMW\ 「啊\~、嗯\~…啊啊\~…居然…%SELF_CALL\(TARGET\)%的肛穴居然有感觉起来了…嗯\~、哼啊啊嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3075',
        any: [
          /PRINTFORMW\ 「啊啊\~、请不要看着…贪图肛穴给予的快乐而摆出一副不像样姿态的、%SELF_CALL\(TARGET\)%的脸…请、请不要看…哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3076',
        any: [
          /PRINTFORMW\ 「明，明明说了…不能看了…坏、坏心…啊啊嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3078',
        any: [
          /PRINTFORMW\ 「不，不行的啊\~…肛穴居然那么有感觉不行的啊\~\~\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3079',
        any: [
          /PRINTFORMW\ 「所以…请不要用宏伟的大鸡巴来将%SELF_CALL\(TARGET\)%敏感的肛穴给操地去死活来的…这样就要不行了，就要坏掉了啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3080',
        any: [
          /PRINTFORMW\ 「啊哈呀啊嗯\~♪…要去了，要去了啊啊\~…肛门SEX…好棒呀啊\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3082',
        any: [/CFLAG:327\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3084',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:327\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3085',
        any: [/PRINTFORMW\ 「不、不行的啊\~…肛门居然那么有感觉不行的啊\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3086',
        any: [
          /PRINTFORMW\ 「哈呀呜呜\~…突，突然就动起来不行啊\~…坏心眼呜\~坏心眼呜\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3087',
        any: [/CFLAG:327\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3089',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:327\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3090',
        any: [
          /PRINTFORMW\ 「啊啊\~…为…为什么…屁股的洞…会有感觉来的…明明不可以的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3091',
        any: [
          /PRINTFORMW\ 「嗯呜\~…不、不行\~…那样…激烈地…哈嗯呜啊嗯呜哈嗯呜\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3092',
        any: [/CFLAG:327\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3094',
        any: [/ELSEIF\ \ CFLAG:327\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3095',
        any: [
          /PRINTFORMW\ 「拜，拜托了…拜托了啊…肛门被扩张…很痛苦的啊…啊\~啊啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3096',
        any: [/CFLAG:327\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3106',
        any: [/IF\ SELECTCOM\ ==\ 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3108',
        any: [/IF\ CFLAG:TARGET:328\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3110',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3112',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3113',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…请激烈地侵犯\.\.\.%UNICODE\(0x2661\)\ \*1%\ 淫乱的堕落精灵的屁股吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3114',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就像让%SAVESTR:PLAYER%看到屁股一样用双手将自己的屁股张开了。%SAVESTR:PLAYER%接受了她的诱惑从后面插进了肛门里了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3115',
        any: [
          /PRINTFORMW\ 「哈呀呜\~从肛穴里面进来了\~大鸡巴进来了\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3116',
        any: [
          /PRINTFORMW\ 「嗯呜\~…啊啊\~…%SELF_CALL\(TARGET\)%的肛穴…被当成飞机杯着呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3117',
        any: [
          /PRINTFORMW\ 「被当成飞机杯也可以的\~…请尽情地变得舒服起来吧\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3120',
        any: [
          /PRINTFORMW\ 「请尽情地侵犯\~%UNICODE\(0x2661\)\ \*1%\ %SAVESTR:PLAYER%的肛穴吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3121',
        any: [
          /PRINTFORMW\ 「请更加地欺负屁股吧%UNICODE\(0x2661\)\ \*1%\ 屁股被欺负的话就会舒服得不行了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3122',
        any: [
          /PRINTFORMW\ 「哈呀啊\~…好厉害，大鸡巴好厉害啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3125',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3127',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3128',
        any: [
          /PRINTFORMW\ 「呀啊啊\~…肛、肛门是不行的啊…哈呜\~…啊\~啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3129',
        any: [
          /PRINTFORMW\ 「哼\~…啊…啊啊%UNICODE\(0x2661\)\ \*1%\ …被大鸡巴侵犯着呢\~%UNICODE\(0x2661\)\ \*1%哈啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3130',
        any: [
          /PRINTFORMW\ 「才…才不是呢…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%……被干肛穴…而感到高兴什么的\.\.\.才没有呢\.\.\.哈呀啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3131',
        any: [
          /PRINTFORMW\ 「哈呀啊\~%UNICODE\(0x2661\)\ \*1%啊哈嗯\~%UNICODE\(0x2661\)\ \*1%\ 对、对不起啊呜呜呜\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3132',
        any: [
          /PRINTFORMW\ 「作为工口精灵族的%SAVESTR:TARGET%是一个…肛穴被侵犯就感到快乐的大变态来的…啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3135',
        any: [
          /PRINTFORMW\ 「啊啊\~…这种姿势…真的是很害羞来的啊…啊啊\~…那里是…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3136',
        any: [
          /PRINTFORMW\ 「不，不行的啊…肛穴是不行的啊\~…哈呜\~…啊\~啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3137',
        any: [
          /PRINTFORMW\ 「哼啊\~…啊…啊啊%UNICODE\(0x2661\)\ \*1%\ …大鸡巴…进到深处了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3138',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 被从后面侵犯着肛穴…却高兴起来了\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3142',
        any: [
          /PRINTFORMW\ 「请、请快住手…这种姿势…%SELF_CALL\(TARGET\)%才不会有感觉…啊啊\~…不…不要啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3144',
        any: [/CFLAG:TARGET:328\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3149',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3150',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3151',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊\~…用汪汪风格来被侵犯肛穴最喜欢了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3152',
        any: [
          /PRINTFORMW\ 「主人\~…请更加地…请更加地将大鸡巴塞进来吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3153',
        any: [
          /PRINTFORMW\ 「啊啊\~…已经%UNICODE\(0x2661\)\ \*1%…除了大鸡巴之外%UNICODE\(0x2661\)\ \*1%\ 什么都想不了了啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3154',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3155',
        any: [
          /PRINTFORMW\ 「啊哈啊\~肛穴要去了啊啊啊啊\~………嗯哼唔\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3156',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%发出了满足的娇喘后继续被从后面侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3157',
        any: [
          /PRINTFORMW\ 「更多地…请更像野兽地那样侵犯%SELF_CALL\(TARGET\)%吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3158',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%\ 噢\~噢噢\~哦哦哦哦哦\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3160',
        any: [
          /PRINTFORMW\ 「啊啊\~…嗯啊啊\~…肛穴…完全变成了SEX用的小穴了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3161',
        any: [
          /PRINTFORMW\ 「主人\~…请尽情地使用SEX的小穴来享受吧～%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3162',
        any: [
          /PRINTFORMW\ 「只有%SELF_CALL\(TARGET\)%变得舒服起来开心起来…那就不公平了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3164',
        any: [/CFLAG:328\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3166',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:328\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3167',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊\~…用汪汪风格来被侵犯肛穴最喜欢了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3168',
        any: [
          /PRINTFORMW\ 「主人\~…请更加地…请更加地将大鸡巴塞进来吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3169',
        any: [/CFLAG:328\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3171',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3172',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3173',
        any: [
          /PRINTFORMW\ 「啊啊\~…嗯哼\~…不、不行…啊啊\~…肛门居然变得那么舒服起来了………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3174',
        any: [
          /PRINTFORMW\ 「哈啊啊\~……请更加侵犯那里吧\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3176',
        any: [
          /PRINTFORMW\ 「啊啊\~…这样…明明不要的\~…肛穴要融化掉了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3177',
        any: [
          /PRINTFORMW\ 「不行\~…屁股自己就\~…恩哈呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3178',
        any: [
          /PRINTFORMW\ 「啊啊\~…不行\~…已经要不行了啊\~…已经随便怎样都好了啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3180',
        any: [/CFLAG:328\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3182',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:328\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3183',
        any: [
          /PRINTFORMW\ 「啊啊\~…嗯哼\~…不、不行…啊啊\~…肛门居然变得那么舒服起来了……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3184',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET,\ 1\)%…真的是…要变成野兽了\~…啊嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3185',
        any: [/CFLAG:328\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3187',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3188',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 屁股…要融化掉了啊\~蕩…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3189',
        any: [
          /PRINTFORMW\ 「啊\~♪…嗯哼唔\~…%SELF_CALL\(TARGET\)%已经…作为一只野兽…也可以了啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3190',
        any: [/CFLAG:328\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3192',
        any: [/ELSEIF\ \ CFLAG:328\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3193',
        any: [
          /PRINTFORMW\ 「这\~…样啊\~…%SELF_CALL\(TARGET\)%…变成了野兽…还不如了啊…啊\~…啊啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3194',
        any: [/CFLAG:328\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3204',
        any: [/IF\ SELECTCOM\ ==\ 28/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3206',
        any: [/IF\ CFLAG:TARGET:329\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3208',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3209',
        any: [
          /PRINTFORMW\ 「嗯真是的…在侵犯着肛穴的时候还想要调情什么的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3210',
        any: [/PRINTFORMW\ 「主人真是H呢\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3212',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3213',
        any: [/PRINTFORMW\ 「啊\~…嗯\~…哈啊…连根部…都进去了…呜啊\~…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3214',
        any: [
          /PRINTFORMW\ 「啊不、不行的啊…请，请不要看着%SAVESTR:PLAYER%脸啊\~！\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3215',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像很害羞地抱住了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3218',
        any: [
          /PRINTFORMW\ 「啊，啊啊…用这种姿势…对屁股的洞…嗯哼\~…嗯哼唔………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3219',
        any: [
          /PRINTFORMW\ 「好、好的、会好好地将整根塞进去的…啊啊\~请不要动起来」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3221',
        any: [/CFLAG:TARGET:329\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3226',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3227',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3228',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~%UNICODE\(0x2661\)\ \*1%\ 肛穴被塞进了大鸡巴了\~～%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3229',
        any: [
          /PRINTFORMW\ 「啊啊\~…已经忍耐不了了呀\~…要开始动了噢…%SELF_CALL\(TARGET\)%要自己就变得舒服起来了噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3230',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就像所说的那样晃动起了腰部、自己享受起了快乐的味道………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3231',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3232',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…连根部都…完全塞进了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3233',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…%SELF_CALL\(TARGET\)%1的肛门…完全变成肛穴了呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3234',
        any: [
          /PRINTFORMW\ 完全不知道羞耻吐露着淫猥的话语的%SAVESTR:TARGET%身上、完全感受不到过去的高贵姿态了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3236',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…肛穴要融化掉了\~%UNICODE\(0x2661\)\ \*1%\ 因为大鸡巴塞进来了所以肛穴很高兴呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3237',
        any: [
          /PRINTFORMW\ 「啊哈啊…怎么样啊\~？肛穴…就像这样收紧的话是不是很舒服呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3239',
        any: [/CFLAG:329\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3241',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:329\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3242',
        any: [
          /PRINTFORMW\ 「啊啊\~…肛穴被完全扩大了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3243',
        any: [
          /PRINTFORMW\ 「肛穴感受着大鸡巴…变得黏糊糊起来了呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3244',
        any: [/CFLAG:329\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3246',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3247',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3248',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3249',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%…才不是那么淫乱来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3250',
        any: [
          /PRINTFORMW\ 「但是屁股里…啊哈啊\~…整根大鸡巴都塞进去了…却还会高兴什么的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3251',
        any: [
          /PRINTFORMW\ 「请不要…讨厌%SELF_CALL\(TARGET\)%…啊啊\~…嗯\~哈啊嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3253',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的身体…这种地方也…变成相爱的地方了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3254',
        any: [
          /PRINTFORMW\ 「嗯\~…♪\ 更加…激烈地抽插那里，也没有关系的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3256',
        any: [/CFLAG:329\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3258',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:329\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3259',
        any: [/PRINTFORMW\ 「啊啊啊\~…屁股被…大鸡巴给塞满了啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3260',
        any: [
          /PRINTFORMW\ 「这、这个…只是很难受所以才抱着而已啦\~…啊\~啊哈啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3261',
        any: [/CFLAG:329\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3263',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:329\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3264',
        any: [
          /PRINTFORMW\ 「哈啊嗯\~…明明整根大鸡巴都塞进屁股里面了…♪\ 为什么…为什么还会那么舒服呢\~\~？！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3265',
        any: [/PRINTFORMW\ 「不，不行的啊、动、动起来什么的不行啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3266',
        any: [/CFLAG:329\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3268',
        any: [/ELSEIF\ \ CFLAG:329\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3269',
        any: [/PRINTFORMW\ 「啊啊\~…屁股…再被扩大着…好、好难受啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3270',
        any: [/CFLAG:329\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3279',
        any: [/IF\ SELECTCOM\ ==\ 29/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3281',
        any: [/IF\ CFLAG:TARGET:330\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3283',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3284',
        any: [/PRINTFORMW\ 「啊啊\~…请插上来吧\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3285',
        any: [
          /PRINTFORMW\ 「肛穴被扩大了\~…正在吞下大鸡巴着呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3286',
        any: [
          /PRINTFORMW\ 「啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 肛穴被侵犯真是太棒了啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3288',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3289',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊\~…屁股的洞…什么的…真的是…不、不行的啊\~…啊啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3290',
        any: [
          /PRINTFORMW\ 「这种…姿势来…恩哈呜\~…被侵犯什么的…明明…不要来的…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3293',
        any: [
          /PRINTFORMW\ 「不…不要啊…那么地…将腿张开的话…啊\~啊啊\~！进去了哈呜\~\~！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3295',
        any: [/CFLAG:TARGET:330\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3300',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3301',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3302',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 肛穴…更加地侵犯一下吧啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3303',
        any: [
          /PRINTFORMW\ 「哈啊\~…更加激烈地侵犯比较好呢\~%UNICODE\(0x2661\)\ \*1%\ 更多地…更多地\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3304',
        any: [
          /PRINTFORMW\ 「请到坏掉为止，不停地侵犯吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3306',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…嗯\~…腰部完全停不下来啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3307',
        any: [
          /PRINTFORMW\ 「肛穴太舒服了…是个腰部自己就会动起来的淫乱奴隶真是对不起\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3308',
        any: [
          /PRINTFORMW\ 「处罚，请处罚吧啊\~%UNICODE\(0x2661\)\ \*1%\ 请给淫乱肛穴处罚吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3310',
        any: [/CFLAG:330\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3312',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:330\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3313',
        any: [
          /PRINTFORMW\ 「啊啊\~…肛穴被侵犯的话…脚自己就会张开了呀\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3314',
        any: [
          /PRINTFORMW\ 「哈呜哈啊\~%UNICODE\(0x2661\)\ \*1%\ 啊\~…哈啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 请更加…侵犯吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3315',
        any: [/CFLAG:330\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3317',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3318',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3319',
        any: [/PRINTFORMW\ 「啊啊\~…请温柔地抱住吧\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3320',
        any: [
          /PRINTFORMW\ 「屁股…太过舒服了…感觉…要去了\~%UNICODE\(0x2661\)\ \*1%\ 啊\~啊啊\~嗯呼呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3321',
        any: [
          /PRINTFORMW\ 「啊啊\~…连屁股的洞…都要变得不行了\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3323',
        any: [
          /PRINTFORMW\ 「嗯哈啊%UNICODE\(0x2661\)\ \*1%\ 被从后面抱着…就这样被侵犯着屁股什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3324',
        any: [
          /PRINTFORMW\ 「不行的啊\~…真的…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 要融化掉了…腰往下的地方都要融化掉了腰%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3326',
        any: [/CFLAG:330\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3328',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:330\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3329',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…明明在被温柔地抱着呢%UNICODE\(0x2661\)\ \*1%却被侵犯着屁股什么的\~\ %UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3330',
        any: [
          /PRINTFORMW\ 「啊啊\~…脑袋变得迷迷糊糊起来了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3331',
        any: [/CFLAG:330\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3333',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:330\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3334',
        any: [
          /PRINTFORMW\ 「啊\~啊啊啊\~…屁股…有种奇怪的舒服的感觉…嗯\~！啊啊\~嗯\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3335',
        any: [/PRINTFORMW\ 「屁股要…变得…满满得了\~…为什么\~…嗯哼\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3336',
        any: [/CFLAG:330\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3338',
        any: [/ELSEIF\ \ CFLAG:330\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3339',
        any: [
          /PRINTFORMW\ 「嗯呜\~…这、这样的…不要…的啊…啊啊\~不要动起来啊動\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3340',
        any: [/CFLAG:330\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3349',
        any: [/IF\ SELECTCOM\ ==\ 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3351',
        any: [/IF\ CFLAG:TARGET:331\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3353',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3354',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…勃起的大鸡巴…十分地热啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3355',
        any: [/PRINTFORMW\ 「温柔地摩擦好？还是激烈地比较好呢\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3356',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%漏出了恶作剧的笑容舔了舔嘴唇握住了阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3358',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3359',
        any: [
          /PRINTFORMW\ 「啊啊\~…好惹啊\~…热地好像手都要烫伤了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3360',
        any: [
          /PRINTFORMW\ 「为了不伤到大鸡巴会温柔得做的…请尽情地享受吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3362',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3363',
        any: [/PRINTFORMW\ 「啊啊\~…这么烫…好、好的…会温柔…地、地做的啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3366',
        any: [
          /PRINTFORMW\ 「呜呜\~…居，居然要握住这种东西…啊啊\~…好、好烫…的啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3368',
        any: [/CFLAG:TARGET:331\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3373',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3374',
        any: [/IF\ TALENT:PLAYER:318\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3376',
        any: [
          /PRINTFORMW\ 「雄伟的大肉棒……把这放到女人的阴道里……咽口水%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3377',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3379',
        any: [
          /PRINTFORMW\ 「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢%UNICODE\(0x2661\)\ \*1%　这样子还不够挑逗女人哦？%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3380',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3382',
        any: [
          /PRINTFORMW\ 「最喜欢剥开……包茎的外皮了%UNICODE\(0x2661\)\ \*1%　味道简直让人受不了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3383',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3385',
        any: [
          /PRINTFORMW\ 「这样的马肉棒，插进来的话一定会让女人疯掉的吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3387',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3388',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…大鸡巴\~%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%会更加加油地撸的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3389',
        any: [
          /PRINTFORMW\ 「请尽情地射出来…变得舒服起来吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3391',
        any: [
          /PRINTFORMW\ 「啊啊\~…明明只是用手握住侍奉而已…%SELF_CALL\(TARGET\)%的那里就湿掉了真是毫无办法呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3392',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…看着大鸡巴变舒服起来…%SELF_CALL\(TARGET\)%也都…啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3394',
        any: [/CFLAG:331\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3396',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:331\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3397',
        any: [
          /PRINTFORMW\ 「啊哈啊…大鸡巴…哈啊…居然那么地烫呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3398',
        any: [
          /PRINTFORMW\ 「啊啊\~…只是握着就要忍不住了啊…主人\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3399',
        any: [
          /PRINTFORMW\ 压榨着阴茎的%SAVESTR:TARGET%一脸好像很难受的样子看着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3400',
        any: [/CFLAG:331\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3402',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:331\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3403',
        any: [/IF\ TALENT:PLAYER:318\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3405',
        any: [
          /PRINTFORMW\ 「雄伟的大肉棒啊……把这个插进%SELF_CALL\(TARGET\)%的里面来……咽口水%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3406',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3408',
        any: [
          /PRINTFORMW\ 「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢%UNICODE\(0x2661\)\ \*1%　真是可爱%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3409',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3411',
        any: [
          /PRINTFORMW\ 「就喜欢剥开……包茎的外皮了%UNICODE\(0x2661\)\ \*1%　你的味道真是让人受不了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3412',
        any: [/ELSEIF\ TALENT:PLAYER:318\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3414',
        any: [
          /PRINTFORMW\ 「这样的马肉棒，插进来的话一定会让我疯掉的吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3416',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3417',
        any: [
          /PRINTFORMW\ 「啊啊\~♪…明明只是用手握住侍奉而已…脑袋就变得奇怪起来了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3418',
        any: [
          /PRINTFORMW\ 「居然让%SAVESTR:TARGET%变得那么H起来…这个大鸡巴真是坏呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3419',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%会专注地侍奉的\~…在大人您满足之前…会一直侍奉下去的…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3421',
        any: [/PRINTFORMW\ 「啊哈啊\~♪大鸡巴舒服吗\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3422',
        any: [
          /PRINTFORMW\ 「只是撸着大鸡巴…%SELF_CALL\(TARGET\)%好像也变得舒服起来了呀♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3423',
        any: [
          /PRINTFORMW\ 「撒\~…请变得更加舒服起来吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3425',
        any: [/CFLAG:331\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3427',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:331\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3428',
        any: [
          /PRINTFORMW\ 「啊啊…给大鸡巴侍奉真是高兴呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3429',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的手中这个顽皮的家伙\~…啊啊\~一跳一跳地\~…真是一个十分可爱得东西呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3430',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…会让大人您更加舒服起来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3431',
        any: [/CFLAG:331\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3433',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:331\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3434',
        any: [
          /PRINTFORMW\ 「啊啊\~…大鸡巴…居然那么热…啊啊…总觉得…气氛好奇怪了呢\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3435',
        any: [/PRINTFORMW\ 「这样做的话…就会变舒服起来对吧\~…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3436',
        any: [/CFLAG:331\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3438',
        any: [/ELSEIF\ CFLAG:331\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3439',
        any: [/PRINTFORMW\ 「哈啊…哈啊…好，好热…这个…手好像要变奇怪了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3440',
        any: [/CFLAG:331\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3450',
        any: [/IF\ SELECTCOM\ ==\ 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3452',
        any: [/IF\ CFLAG:TARGET:332\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3454',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3455',
        any: [
          /PRINTFORMW\ 「哈呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 大鸡巴…随便怎样舔都可以对吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3456',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%会尽\~情地…用嘴巴来侍奉的\~%UNICODE\(0x2661\)\ \*1%…啊啊\~唔嗯…哈唔嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3457',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像很高兴地将嘴巴张开口水就立马流下来滴到了将要含下去的阴茎上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3459',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3460',
        any: [
          /PRINTFORMW\ 「虽，虽然很害羞来的…%SAVESTR:TARGET%会侍奉…这个…又热又硬的东西的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3461',
        any: [
          /PRINTFORMW\ 「嗯啊\~…哈嗯\~…嗯\~…嗯嗯呜…哈啊…嗯\~…啾呜\~%UNICODE\(0x2661\)\ \*1%\ 啾呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3462',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%很高兴继续着对阴茎的侍奉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3464',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3465',
        any: [
          /PRINTFORMW\ 「是、是的…%UNICODE\(0x2661\)\ \*1%会…侍奉的…的……呜嗯嗯……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3466',
        any: [/PRINTFORMW\ 「嗯哈啊\~…嗯\~…嗯哼\~…嗯\~…哈啊啊…啊啊\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3469',
        any: [
          /PRINTFORMW\ 「嗯呜…明，明明都这样了…还要用%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的嘴巴来…啊啊…好、好过分的啊…嗯…啾…啾呜…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3471',
        any: [/CFLAG:TARGET:332\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3476',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3477',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3478',
        any: [
          /PRINTFORMW\ 「啊哈啊\~\~…会好好地吮吸大鸡巴的噢\~～%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3479',
        any: [
          /PRINTFORMW\ 「嗯呜\~…嗯哼呜呜\~…嗯啾\~…啾噗嗯\~…啾\~…嗯\~%UNICODE\(0x2661\)\ \*1%嗯\~%UNICODE\(0x2661\)\ \*1%嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3480',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一副下流地姿态用嘴巴侍奉阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3481',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3482',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%只是闻着阴茎的味道、表情就变得荡漾起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3483',
        any: [
          /PRINTFORMW\ 「大鸡巴\~…嗯啾\~%UNICODE\(0x2661\)\ \*1%\ 好喜欢\~…大鸡巴好喜欢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3484',
        any: [
          /PRINTFORMW\ 「啊啊\~…大鸡巴…太喜欢了啊\~\~…%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…不行了\~…哈呜嗯\~…啾噜啾呜\.\.\.啾呜呜呜\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3486',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%很高兴地含下出现在眼前的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3487',
        any: [
          /PRINTFORMW\ 「嗯呜\~…啾\~%UNICODE\(0x2661\)\ \*1%\ 啾\~%UNICODE\(0x2661\)\ \*1%\ 啾呜\~\~%UNICODE\(0x2661\)\ \*1%\ 大鸡巴…大鸡巴…好好吃啊\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3488',
        any: [
          /PRINTFORMW\ 「精液%UNICODE\(0x2661\)\ \*1%…请尽情地%UNICODE\(0x2661\)\ \*1%\ 将全部的精液都射出来吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3490',
        any: [/CFLAG:332\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3492',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3493',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3494',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…好热好硬的东西哈啊\~\~%UNICODE\(0x2661\)\ \*1%\ 请用%SELF_CALL\(TARGET\)%嘴巴来…尽情地享受吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3495',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像很高兴地一样眯着眼睛将阴茎放入了嘴巴里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3496',
        any: [
          /PRINTFORMW\ 「哈呜嗯%UNICODE\(0x2661\)\ \*1%\ 嗯\~%UNICODE\(0x2661\)\ \*1%\ 嗯呼呜\~%UNICODE\(0x2661\)\ \*1%…啾\~…啾噗…呸咯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3497',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3498',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…其实最喜欢用嘴巴侍奉了呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3499',
        any: [
          /PRINTFORMW\ 「因为\~…将那么可爱阴茎放进嘴里后…就会一跳一跳地好像很舒服地一样动着呢\~…啊呜嗯%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3500',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~♪嗯\~嗯嗯\~…啾呜\~…啾噗呜\~…呸咯\~…噗哈啊\~…呐\~\~%UNICODE\(0x2661\)\ \*1%\ 已经上瘾了呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3502',
        any: [
          /PRINTFORMW\ 「啊啊…是个最喜欢大鸡巴的变态真是对不起…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3503',
        any: [
          /PRINTFORMW\ 「但是\~…吮吸…停不下来呐\~…%UNICODE\(0x2661\)\ \*1%\ 嗯啾…啾\~…啾噗\~…呜哼呜呼\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3504',
        any: [
          /PRINTFORMW\ 「嗯\~嗯\~嗯呼呜\~…啊啊\~…请原谅吧\~…请将精\~液射到%SAVESTR:TARGET%的嘴巴里吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3506',
        any: [/CFLAG:332\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3508',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:332\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3509',
        any: [
          /PRINTFORML\ 「哈啊…哈啊…嗯啾\~…啾\~…啾噗嗯\~…是、是的…专注于…前端…的对吧\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3510',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…啊啊\~…先走汁…出来好多了\~♪\ 嗯啾\~…啾\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3511',
        any: [/CFLAG:332\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3513',
        any: [/ELSEIF\ CFLAG:332\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3514',
        any: [/PRINTFORMW\ 「这样的…明、明明不要的…啾\~…啾\~…呸咯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3515',
        any: [/CFLAG:332\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3524',
        any: [/IF\ SELECTCOM\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3526',
        any: [/IF\ CFLAG:TARGET:333\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3528',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3529',
        any: [/PRINTFORMW\ 「用胸部来侍奉什么的\~…%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3530',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~…请用%SELF_CALL\(TARGET\)%下流的胸部来、尽情地享受吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3532',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3533',
        any: [/PRINTFORMW\ 「真、真是的…用胸部来，夹住什么的\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3534',
        any: [
          /PRINTFORMW\ 「虽然早就习惯了大人您的变态癖好了…嗯、是的、当然会好好地给大人侍奉的啦\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3535',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%露出了如同恶作剧一般地笑容、用胸部将阴茎夹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3537',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3538',
        any: [
          /PRINTFORMW\ 「用，用胸部来夹住什么的…啊\~…嗯\~…胸部好热啊\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3541',
        any: [/PRINTFORMW\ 「呜…这、这样的会感觉到舒服吗………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3543',
        any: [/CFLAG:TARGET:333\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3548',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:332\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3549',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3550',
        any: [
          /PRINTFORMW\ 「啊啊\~…大鸡巴好热啊\~…胸部好舒服的啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3551',
        any: [/PRINTFORMW\ 「嗯\~…啊嗯\~…大鸡巴好像也很舒服的样子啊\~\~\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3553',
        any: [
          /PRINTFORMW\ 「请在%SELF_CALL\(TARGET\)%柔软的胸部上…尽情地射出来吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3554',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸荡漾的表情继续着侍奉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3556',
        any: [/PRINTFORMW\ 「嗯哼哼呜\~…用胸部做很舒服吗\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3557',
        any: [
          /PRINTFORMW\ 「感觉到大鸡巴好烫而且硬邦邦的…%SELF_CALL\(TARGET\)%太舒服了好像要变奇怪了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3558',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将舌头下流地伸出来、好像现在就会将阴茎吞下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3560',
        any: [/CFLAG:333\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3562',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:332\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3563',
        any: [
          /PRINTFORMW\ 「啊啊\~…大鸡巴好热啊\~…胸部好舒服啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3564',
        any: [/PRINTFORMW\ 「嗯\~…啊嗯\~…大鸡巴好像也很舒服的样子啊\~\~\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3566',
        any: [
          /PRINTFORMW\ 「请在%SELF_CALL\(TARGET\)%柔软的胸部上…尽情地射出来吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3567',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸荡漾的表情继续着侍奉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3568',
        any: [/CFLAG:333\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3570',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:333\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3571',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3572',
        any: [
          /PRINTFORMW\ 「嗯\~…啊啊\~…要用%SELF_CALL\(TARGET\)%的胸部来侍奉的对吧\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3574',
        any: [
          /PRINTFORMW\ 「…明明…以前只觉得这种东西只是妨碍而已\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3575',
        any: [
          /PRINTFORMW\ 「能给大人您派上用场真是好高兴呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3577',
        any: [
          /PRINTFORMW\ 「啊啊\~…请用%SELF_CALL\(TARGET\)%的胸部来…尽情地享受吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3578',
        any: [
          /PRINTFORMW\ 「这个胸部是为了大人您而存在得…终于明白了呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3580',
        any: [/CFLAG:333\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3582',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:333\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3583',
        any: [
          /PRINTFORMW\ 「嗯\~…啊啊\~…要用%SELF_CALL\(TARGET\)%的胸部来侍奉的对吧\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3585',
        any: [
          /PRINTFORMW\ 「…明明…以前只觉得这种东西只是妨碍而已\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3586',
        any: [
          /PRINTFORMW\ 「能给大人您派上用场真是好高兴呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3587',
        any: [/CFLAG:333\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3589',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:333\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3590',
        any: [
          /PRINTFORMW\ 「嗯\~\.\.\.会好好地用♪……啊啊\~…是、是的\~…会用胸部来侍奉的\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3591',
        any: [
          /PRINTFORMW\ 「啊\~…好、好奇怪啊…碰到大鸡巴的地方…好热…好舒服啊\~…嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3592',
        any: [/CFLAG:333\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3594',
        any: [/ELSEIF\ \ CFLAG:333\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3595',
        any: [/PRINTFORMW\ 「哈啊…哈啊…胸部…好热…的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3596',
        any: [/CFLAG:333\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3606',
        any: [/IF\ SELECTCOM\ ==\ 33/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3608',
        any: [/IF\ CFLAG:TARGET:334\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3610',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3611',
        any: [
          /PRINTFORMW\ 「啊\~…嗯呜\~…%SELF_CALL\(TARGET\)%什么时候都准备好来着的\~…也不插进来…就这样做什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3612',
        any: [
          /PRINTFORMW\ 「啊\~啊\~啊啊\~…啊啊\~…在摩擦着呢\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3614',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3615',
        any: [/PRINTFORMW\ 「啊啊\~…真的好害羞啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3616',
        any: [/PRINTFORMW\ 「将大鸡巴用股间夹住…来侍奉什么的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3617',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%虽然嘴上说着这样的话，但其实很高兴地用股间来侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3620',
        any: [
          /PRINTFORMW\ 「啊啊\~…不、不要啊啊…%SELF_CALL\(TARGET\)%的爱液…居然漏出来了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3622',
        any: [/CFLAG:TARGET:334\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3627',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3628',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%的小穴想要被怎样做…明白的吧\~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3629',
        any: [
          /PRINTFORMW\ 「明明这个…淫乱小穴的深处…想…想要被大鸡巴抽插地死去活来的，明明想要献上处女来的\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3630',
        any: [
          /PRINTFORMW\ 「主人\~\.\.\.拜托了\~…快点…快点…请侵犯了%SELF_CALL\(TARGET\)%吧\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3631',
        any: [
          /PRINTFORMW\ 哪怕意识变得奇怪起来了、%SAVESTR:TARGET%也没有停止用股间侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3632',
        any: [/CFLAG:334\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3634',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3635',
        any: [
          /PRINTFORMW\ 「啊啊\~…好热的啊\~…明明给大鸡巴酱侍奉才可以\~啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3636',
        any: [
          /PRINTFORMW\ 「只是夹着而已…爱液就停不下来了啊\~\~%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…是个淫乱小穴真的是对不起%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3637',
        any: [
          /PRINTFORMW\ 「啊\~…哈呜\~…哈呜\~…嗯啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 会、会好好地用股间来侍奉的\~\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3638',
        any: [/CFLAG:334\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3640',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:0\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3641',
        any: [
          /PRINTFORMW\ 「啊啊\~…嗯哼唔\~…不要…不要的啊\~…明明%SELF_CALL\(TARGET\)%还是…处女来的啊\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3642',
        any: [
          /PRINTFORMW\ 「大鸡巴的形状，还有热度…啊啊\~…都要用股间记下来了呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3643',
        any: [
          /PRINTFORMW\ 「请原谅…请原谅%SELF_CALL\(TARGET\)%吧\~…再继续这样的侍奉的话，脑袋就要变奇怪了呀\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3644',
        any: [/CFLAG:334\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3646',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:334\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3647',
        any: [
          /PRINTFORMW\ 「哈啊\~…好热啊\~…大鸡巴好热啊啊\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3648',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脸变得通红发烫、慢慢地动起了腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3649',
        any: [
          /PRINTFORMW\ 「啊啊\~…已经…已经要忍不住了啊\~…大鸡巴…请给大鸡巴吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3650',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，如同拒绝插进去一样，用阴茎摩擦着%SAVESTR:TARGET%的蜜穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3651',
        any: [/CFLAG:334\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3653',
        any: [/ELSEIF\ CFLAG:334\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3654',
        any: [
          /PRINTFORMW\ 「啊\~…嗯\~…这、这样…明明只是被大鸡巴摩擦着而已………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3655',
        any: [/PRINTFORMW\ 「爱、爱液…黏糊糊地…停不下来了呀\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3656',
        any: [/CFLAG:334\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3666',
        any: [/IF\ SELECTCOM\ ==\ 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3668',
        any: [/IF\ CFLAG:TARGET:335\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3670',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3672',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3674',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3675',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%兴奋地舔着嘴唇坐在了%SAVESTR:PLAYER%的身上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3676',
        any: [
          /PRINTFORMW\ 「啊啊啊%UNICODE\(0x2661\)\ \*1%…”自己献上处女吧\~”像这样这样的命令什么的…主人可知道%SELF_CALL\(TARGET\)%到底等了这样命令等了多久了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3677',
        any: [
          /PRINTFORMW\ 「除了主人之外从来没有给别人看过摸过的主人专属小穴来的噢…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3678',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%呵呵地笑着用双手将小穴给张开了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3679',
        any: [
          /PRINTFORMW\ 「请，请看一下…%SELF_CALL\(TARGET\)%的处女小穴…是要吃掉主人的大鸡巴的地方来的%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3680',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%慢慢地将腰部坐下来…阴茎往着还没有习惯的腔穴的里面慢慢地挤进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3681',
        any: [
          /PRINTFORMW\ 「噢\~、噢噢噢\~%UNICODE\(0x2661\)\ \*3%到深、深处了…已经全部都进到里面去了啊啊\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3682',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的处女膜被一点一点地捅破穿过、将%SAVESTR:PLAYER%的阴茎全部吞了进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3683',
        any: [
          /PRINTFORMW\ 「呜嗯\~…啊\~…哈啊\~…啊、啊啊啊啊啊\~～%UNICODE\(0x2661\)\ \*5%\ 进、进去了啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3687',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3688',
        any: [
          /PRINTFORMW\ 「接，接下来…很荣幸将淫乱%SAVESTR:TARGET%的处女小穴…奉献给主人\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3689',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%脸通红着用双手将蜜穴张开。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3690',
        any: [
          /PRINTFORMW\ 「………其实%SELF_CALL\(TARGET\)%、在故乡里有着婚约者呢…名字？样子？…那种东西…已经都忘掉了呀\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3691',
        any: [
          /PRINTFORMW\ 「因为…接下来%SELF_CALL\(TARGET\)%会一直都是主人的东西来的了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3692',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎对准了蜜穴、慢慢地将腰部降下来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3693',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%已经…是主人的东西来的了呀%UNICODE\(0x2661\)\ \*1%\ 请一直…使唤%SELF_CALL\(TARGET\)%吧…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3695',
        any: [
          /PRINTFORMW\ 「接、接下来…很荣幸将淫乱%SAVESTR:TARGET%的处女小穴…奉献给主人\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3696',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%脸通红着用双手将蜜穴张开。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3697',
        any: [
          /PRINTFORMW\ 「啊啊\~…从今以后…小穴要被操到死去活来的日子要到了对吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3698',
        any: [
          /PRINTFORMW\ 「早中晚从不休息…一直都被主人给侵犯的日子…啊啊\~%UNICODE\(0x2661\)\ \*1%…啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3699',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎对准了蜜穴、慢慢地将腰部降下来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3700',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%处女膜被一点一点地捅破穿过、将%SAVESTR:PLAYER%的阴茎全部吞了进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3701',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊…好棒…好棒啊\~…主人的全部…都好想要啊\~\~…啊\~啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3705',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3707',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3708',
        any: [/PRINTFORMW\ 「虽，虽然…明白大人您是魔王来的…\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3709',
        any: [
          /PRINTFORMW\ 「但，但是自己将处女献上什么的………太、太不知羞耻了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3710',
        any: [
          /PRINTFORMW\ 长长的耳朵的前端完全变得通红的%SAVESTR:TARGET%，一边抱怨着，一边在你身上扒开了自己的蜜穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3711',
        any: [
          /PRINTFORMW\ 「但，但是…啊嗯\~%UNICODE\(0x2661\)\ \*1%…大人您…嗯\~%UNICODE\(0x2661\)\ \*1%…无论如何…都\~%UNICODE\(0x2661\)\ \*1%…要%SAVESTR:TARGET%这样做的话…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3712',
        any: [
          /PRINTFORMW\ 每当%SAVESTR:TARGET%的蜜穴摩擦着阴茎的时候都会发出H的娇喘、长长的耳朵好像很害羞地一样一抖一抖地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3713',
        any: [
          /PRINTFORMW\ 「魔、魔王大人…拜托…请将精灵族的…姑、姑娘一直保护到现在的…纯、纯洁给…夺…嗯\~…夺走吧\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3714',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%说完后就自己将腰压下来、为了献上处女而将异物塞进了的腔内的深处………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3718',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3719',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 是、是的…%SELF_CALL\(TARGET\)%作为原勇者的%SAVESTR:TARGET%的…不为了其它人而是为了大人您而留下来的处女现在奉献给您\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3720',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就像骑马一样骑在%SAVESTR:PLAYER%身上，用一只手撑住保持平衡，然后用另一只手将%SAVESTR:PLAYER%的阴茎对准蜜穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3721',
        any: [
          /PRINTFORMW\ 「请让%SELF_CALL\(TARGET\)%…成为…大人您的东西吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3722',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%慢慢地将腰扭动着压下去。%SAVESTR:PLAYER%的阴茎将其处女膜捅破穿过、%SAVESTR:TARGET%的脸因为破瓜之痛而扭曲了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3723',
        any: [
          /PRINTFORMW\ 「嗯呜\~…！啊啊\~…请让%SELF_CALL\(TARGET\)%一直呆在大人您的身旁吧………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3724',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%突然感到了心塞了一下、而那个原因早就被她所忘记了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3726',
        any: [
          /PRINTFORMW\ 「啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 哈啊…啊啊\~…居然是…这样地一种方式献上纯洁什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3727',
        any: [
          /PRINTFORMW\ 「不过…请让%SELF_CALL\(TARGET\)%成为大人您的东西吧…%UNICODE\(0x2661\)\ \*1%\ 请在%SELF_CALL\(TARGET\)%的身体里刻上大人您的印记吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3728',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰部抓住，强硬地往下拉、将%SAVESTR:TARGET%的处女膜给捅破了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3729',
        any: [
          /PRINTFORMW\ 「哼唔啊啊\~…！啊啊\~…请从今以后\.\.\.好好地珍惜%SELF_CALL\(TARGET\)%的这里吧\~……%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3735',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3736',
        any: [
          /PRINTFORMW\ 「啊啊\~…不要…不要啊…这样啊…啊啊\~…啊…不、不行…的啊…哼唔…哼呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3737',
        any: [
          /PRINTFORMW\ 「对不起…真的\.\.\.对不起………%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%太弱…的原因…啊啊…啊…………啊哼…哼啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3738',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一边向着故乡的恋人道歉一边被%SAVESTR:PLAYER%从下往上地抽插侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3740',
        any: [
          /PRINTFORMW\ 「呜…这，这样得…不、不行的啊…请、请原谅吧…自己来做什么的…完全不行啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3741',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰抓住后，直接强硬地插进去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3747',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3748',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SAVESTR:TARGET%会好好侍奉主人的\~%UNICODE\(0x2661\)\ \*1%\ 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3749',
        any: [
          /PRINTFORMW\ 「请尽情享受淫乱%SAVESTR:TARGET%的淫乱的舞蹈吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3751',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3752',
        any: [
          /PRINTFORMW\ 「啊\~、请不要这样盯着看啦\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3753',
        any: [
          /PRINTFORMW\ 「连接在一起的地方…啊\~啊啊啊\~…♪\ 好像要融化掉了呀\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3756',
        any: [
          /PRINTFORMW\ 「啊\~啊啊啊\.\.\.不、不行的啊\~\~…再这样…就太羞耻了动不了了…啊\~啊啊啊\~！请不要向上顶啊啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3759',
        any: [/CFLAG:TARGET:335\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3764',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3765',
        any: [/IF\ RAND:4\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3766',
        any: [
          /PRINTFORMW\ 「啊啊\~…腰要…停不下来了啊\~%UNICODE\(0x2661\)\ \*1%\ 主人\~…太舒服了\~…呜\~%UNICODE\(0x2661\)\ \*1%啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3767',
        any: [
          /PRINTFORMW\ 「变成喜欢大鸡巴的淫乱女人真是对不起…在去之前%UNICODE\(0x2661\)\ \*1%在去之前腰都不会停下来的啊啊\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3768',
        any: [/ELSEIF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3769',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%…好喜欢这种姿势啊…因为\.\.\.\.\.\.因为啦\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3770',
        any: [
          /PRINTFORMW\ 「能十分地感觉到…小穴…将大鸡巴给吞下去了呢\~%UNICODE\(0x2661\)\ \*3%啊啊\~…好舒服啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3771',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3772',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%…那么淫乱真的很对不起\~…自己就…随便地…变得舒服起来了真是对不起%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3773',
        any: [
          /PRINTFORMW\ 「大鸡巴太舒服了呀\~\~…啊啊\~…请用大鸡巴…更多地…操到%SELF_CALL\(TARGET\)%失神为止吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3775',
        any: [
          /PRINTFORMW\ 「噢\~噢\~哦哈啊啊\~%UNICODE\(0x2661\)\ \*1%…啊啊\~…不行不行不行不行\~%UNICODE\(0x2661\)\ \*1%\ 不行的啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3776',
        any: [
          /PRINTFORMW\ 「再这样…大鸡巴塞进去的话…呜嗯呜啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3777',
        any: [
          /PRINTFORMW\ 「整个人都要变奇怪了…脑袋里只能…想到大鸡巴而已了…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3779',
        any: [/CFLAG:335\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3781',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:335\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3782',
        any: [/IF\ RAND:4\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3783',
        any: [
          /PRINTFORMW\ 「大人您…不用动也没关系的啦啊\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3784',
        any: [
          /PRINTFORMW\ 请将%SELF_CALL\(TARGET\)%所～有都交给%SELF_CALL\(TARGET\)%吧\~%UNICODE\(0x2661\)\ \*1%\ 啊\~%UNICODE\(0x2661\)\ \*1%\ 恶作剧可不行的呀\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3785',
        any: [
          /PRINTFORML\ 「%SELF_CALL\(TARGET\)%会让大鸡巴…变得…嗯呜\~…舒服起来的…啊\~啊啊哈啊\~…啊啊啊\~…嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3786',
        any: [/ELSEIF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3787',
        any: [
          /PRINTFORMW\ 「啊啊\~…喜欢…好喜欢的啊\~…%UNICODE\(0x2661\)\ \*1%\ 像这样自己动起来的话…哦\~噢噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3788',
        any: [
          /PRINTFORMW\ 「就会明白…哦哈啊\~%UNICODE\(0x2661\)\ \*1%\ 大鸡巴进到了，进到了深处了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3789',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~…不行\~…腰停不下来了啊\~%UNICODE\(0x2661\)\ \*1%在去之前完全停不下来啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3790',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3791',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊\~…真的是对不起%UNICODE\(0x2661\)\ \*1%\ 因为大鸡巴塞到了里面去了…所以在去之前…腰完全停不下来的啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3792',
        any: [
          /PRINTFORMW\ 「是个H的小穴真是对不起%UNICODE\(0x2661\)\ \*1%\ 但是，但是…怎么都停不下来啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3794',
        any: [
          /PRINTFORMW\ 「啊啊\~…就这样…根本不想离开了啊\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3795',
        any: [
          /PRINTFORMW\ 「好想一直一直就这样…腰部融化跟大人您合为一体呀\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3797',
        any: [/CFLAG:335\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3799',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:335\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3800',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3801',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%\ 进…进到了…深处了呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3802',
        any: [
          /PRINTFORMW\ 「啊啊\~…这么…下流的样子…明明…完全不想晃动起腰部来的\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3803',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3804',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…♪\ 啊\~啊啊\~嗯哼\~%UNICODE\(0x2661\)\ \*1%\ 进到了…深处了\~…嗯嗯\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3805',
        any: [/PRINTFORMW\ 「明明…不能动的…腰却…自己动起来了啊\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3807',
        any: [/PRINTFORMW\ 「啊啊\~…请、请不要看着啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3808',
        any: [
          /PRINTFORMW\ 「大鸡巴…太舒服了…请不要看着腰晃动的地方啦…啊啊\~啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3810',
        any: [/CFLAG:335\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3812',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:335\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3813',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%会、会自己动的啦…请不要在下面往上，哈啊\~…啊\~啊啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3814',
        any: [/PRINTFORMW\ 「哼\~…啊\~…啊嗯\~…嗯\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3815',
        any: [/CFLAG:335\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3817',
        any: [/ELSEIF\ CFLAG:335\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3818',
        any: [
          /PRINTFORMW\ 「哈啊\~啊…嗯\~…明明…已经动不了…哈呜嗯\~…啊啊…请不要欺负%SELF_CALL\(TARGET\)%………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3819',
        any: [/CFLAG:335\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3829',
        any: [/IF\ SELECTCOM\ ==\ 35/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3831',
        any: [/IF\ CFLAG:TARGET:336\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3833',
        any: [/IF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3834',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~…真是正好呢\~、将每一个角落…都洗的干干净净地吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3835',
        any: [/PRINTFORMW\ 「啊啊嗯\~…那、那里是不能碰的啦\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3838',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%只用身体来帮忙洗澡什么的…真、真是不知羞耻的事情啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3839',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%觉得，嘴上这么说但是已经在做准备的%SAVESTR:TARGET%是多么地惹人疼爱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3841',
        any: [/CFLAG:TARGET:336\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3846',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:336\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3847',
        any: [
          /PRINTFORMW\ 「啊哈啊恩\~…泡泡滑滑的真是舒服呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3848',
        any: [
          /PRINTFORMW\ 「啊\~%UNICODE\(0x2661\)\ \*1%…嗯哼唔\~%UNICODE\(0x2661\)\ \*1%…唔哼哼\~…啊啊嗯\~、不能做恶作剧啦\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3849',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%虽然仔细地洗着澡，但是不停地从蜜穴流出来得爱液都浪费掉了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3850',
        any: [/CFLAG:336\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3852',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:336\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3853',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~%UNICODE\(0x2661\)\ \*1%\ 大人请就这样坐着不动噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3854',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%会好好地帮大人洗干净的…哈嗯呜\~…啊、那、那、那种地方也不用洗得很干净吧…哈嗯呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3855',
        any: [/CFLAG:336\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3857',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:336\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3858',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~…非常容易出泡泡呢\~、这个肥皂…用起来十分地舒服呢\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3859',
        any: [/PRINTFORMW\ 「啊啊嗯\~…那、那里是不能摸得啦\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3860',
        any: [/CFLAG:336\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3862',
        any: [/ELSEIF\ \ CFLAG:336\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3863',
        any: [
          /PRINTFORMW\ 「在、在洗澡的途中，如果…做、做什么奇怪的事情的话可是会让你好看的…啊、哈嗯呜\~！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3864',
        any: [/CFLAG:336\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3874',
        any: [/IF\ SELECTCOM\ ==\ 36/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3876',
        any: [/IF\ CFLAG:TARGET:337\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3878',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3879',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~%UNICODE\(0x2661\)\ \*1%…%SAVESTR:TARGET%会用肛穴来好好侍奉大人您的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3880',
        any: [
          /PRINTFORMW\ 「请尽情地变得舒服起来吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3882',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3883',
        any: [
          /PRINTFORMW\ 「啊嗯\~…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 肛穴在…扩大着…呜嗯\~…哈呜嗯\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3884',
        any: [
          /PRINTFORMW\ 「哈啊恩\~\~%UNICODE\(0x2661\)\ \*1%\ 大鸡巴…连根部都吞进去了呀\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3887',
        any: [
          /PRINTFORMW\ 「呜啊…啊啊\~…不要啊…屁股的洞在…扩、扩大着…哈呜，啊呜呜呜\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3889',
        any: [/CFLAG:TARGET:337\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3894',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3895',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3896',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 主人…肛穴变得那么舒服真是对不起呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3897',
        any: [
          /PRINTFORMW\ 「肛穴要…不行\~%UNICODE\(0x2661\)\ \*1%不行的呀\~%UNICODE\(0x2661\)\ \*1%\ 腰自己就动起来了呀%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3898',
        any: [
          /PRINTFORMW\ 「嗯啊啊\~%UNICODE\(0x2661\)\ \*1%请处罚不懂事的%SELF_CALL\(TARGET\)%吧！请尽情地处罚吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3900',
        any: [
          /PRINTFORMW\ 「嗯\~嗯哼啊\~%UNICODE\(0x2661\)\ \*1%\ 肛穴…在被侵犯着…在被侵犯着呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3901',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%淫乱的笑着，淫猥地上下晃动着腰、肛穴正紧紧地挤压着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3902',
        any: [
          /PRINTFORMW\ 「啊啊\~…弄坏掉吧…将%SELF_CALL\(TARGET\)%弄坏掉吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3904',
        any: [/CFLAG:337\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3906',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:337\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3907',
        any: [
          /PRINTFORMW\ 「嗯哈啊嗯\~…肛穴SEX最棒了呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3908',
        any: [
          /PRINTFORMW\ 「呜哼哼\~%UNICODE\(0x2661\)\ \*1%\ 肛穴…居然会那么有感觉什么的…%SELF_CALL\(TARGET\)%是个淫乱的姑娘真是对不起\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3909',
        any: [/CFLAG:337\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3911',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3912',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3913',
        any: [
          /PRINTFORMW\ 「啊啊\~…肛门居然会那么地有感觉\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3914',
        any: [
          /PRINTFORMW\ 「哈啊嗯\~%UNICODE\(0x2661\)\ \*1%阴茎完美地和肛门重合了\~%UNICODE\(0x2661\)\ \*1%…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 嗯\~…不行\~…腰要动起来了\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3916',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 真是对不起\~…%SELF_CALL\(TARGET\)%是个肛门敏感的变态姑娘真的是对不起\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3917',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 哎\~？…变得更加舒服也没关系吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3918',
        any: [
          /PRINTFORMW\ 「大人\~非常感谢…%SELF_CALL\(TARGET\)%…就要变成肛门有感觉的变态了\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3920',
        any: [/CFLAG:337\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3922',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:337\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3923',
        any: [
          /PRINTFORMW\ 「嗯啊啊\~…请使用%SELF_CALL\(TARGET\)%H的肛门小穴来…尽\~情地…变得舒服起来吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3924',
        any: [/CFLAG:337\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3926',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:337\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3927',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…屁股的小穴…有感觉了\~…%SELF_CALL\(TARGET\)%…要，要尽情地动起来了哦…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3928',
        any: [/CFLAG:337\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3930',
        any: [/ELSEIF\ \ CFLAG:337\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3931',
        any: [
          /PRINTFORMW\ 「嗯呜\~\.\.\.啊啊…阴茎…连根部都…塞进去了…不、不行、不行的啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3932',
        any: [/CFLAG:337\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3942',
        any: [/IF\ SELECTCOM\ ==\ 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3944',
        any: [/IF\ CFLAG:TARGET:338\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3946',
        any: [/IF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3947',
        any: [
          /PRINTFORMW\ 「啊啊…%SELF_CALL\(TARGET\)%…这种事情…还没有做过呢…啊啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3948',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对着肛门用嘴巴侍奉起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3951',
        any: [/PRINTFORMW\ 「呜\~…居，居然要用嘴巴往这种地方…嗯、恩呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3953',
        any: [/CFLAG:TARGET:338\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3958',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3959',
        any: [
          /PRINTFORMW\ 「嗯呼呜\~…主人的肛穴…%SELF_CALL\(TARGET\)%会尽情地侍奉起来得%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3960',
        any: [
          /PRINTFORMW\ 「啊啊\~…每一片皱纹…都会舔干净%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3961',
        any: [
          /PRINTFORMW\ 「啾啾呜\~…呸咯噢\~…哦哈啊\~…肛门里面的东西好好吃…嗯\~嗯呃呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3962',
        any: [/CFLAG:338\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3964',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:338\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3965',
        any: [
          /PRINTFORML\ 「啊啊\~…连屁股的穴都要侍奉什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3966',
        any: [
          /PRINTFORML\ 「嗯啾…嗯啾…嗯呼呜\~…会更加呸咯呸咯地舔噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3967',
        any: [/CFLAG:338\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3969',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:338\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3970',
        any: [/PRINTFORMW\ 「嗯哈啊…啊\~…嗯\~…啾\~…啾呜\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3971',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的嘴巴…嗯\~…嗯呼嗯\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3972',
        any: [/CFLAG:338\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3974',
        any: [/ELSEIF\ CFLAG:338\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3975',
        any: [/PRINTFORMW\ 「嗯啾…呸咯…啾…嗯呃………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3976',
        any: [/PRINTFORMW\ 「啊\~…啊啊\~…请、请原谅，已经…请原谅吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3977',
        any: [/CFLAG:338\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3986',
        any: [/IF\ SELECTCOM\ ==\ 38/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3988',
        any: [/IF\ CFLAG:TARGET:339\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3989',
        any: [/PRINTFORMW\ 「想要被踩吗\~？……真是奇怪的兴趣来的呢\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3990',
        any: [/CFLAG:TARGET:339\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3995',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:20\ >=\ 3\ \&\&\ \(CFLAG:339\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3996',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3997',
        any: [/PRINTFORM\ 「哼哼\~%UNICODE\(0x2661\)\ \*1%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '3999',
        any: [/PRINTFORM\ 「这样做很舒服对吧\~？/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4001',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4002',
        any: [/PRINTFORMW\ 哭吧\~…哭得更好听一点吧\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4004',
        any: [
          /PRINTFORMW\ 想要被做什么事情快说出来让%SELF_CALL_FIRST\(TARGET\)%听听啊\~、变态桑\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4006',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4007',
        any: [
          /PRINTFORMW\ 「如果说出来的话就让你更加爽噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4009',
        any: [
          /PRINTFORMW\ 「如果说出来的话就让你感受一下被夹紧的感觉噢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4011',
        any: [/CFLAG:TARGET:339\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4013',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:20\ >=\ 3\ \&\&\ \(CFLAG:339\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4015',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4016',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%会好好地疼爱你、直到无法反抗为止的哦\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4017',
        any: [/PRINTFORMW\ 「请做好觉悟吧\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4019',
        any: [
          /PRINTFORMW\ 「哼哼哼\~%UNICODE\(0x2661\)\ \*1%\ 只是去干还不满足吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4020',
        any: [
          /PRINTFORMW\ 「居然还想要被虐什么的，真是下流的家伙呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4022',
        any: [/CFLAG:TARGET:339\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4025',
        any: [
          /ELSEIF\ ABL:20\ >=\ 1\ \&\&\ \(CFLAG:339\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4026',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4027',
        any: [/PRINTFORMW\ 「来吧…想要被踩对吧\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4029',
        any: [/PRINTFORMW\ 「想被%SELF_CALL_FIRST\(TARGET\)%踩对吧\|\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4031',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4032',
        any: [/PRINTFORMW\ 「你真是令人鄙夷地变态受虐狂呢\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4033',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4034',
        any: [/PRINTFORMW\ 「你真是无可奈何的变态来的呢\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4036',
        any: [/PRINTFORMW\ 「你真的是个最差劲的渣滓呢\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4038',
        any: [/CFLAG:TARGET:339\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4041',
        any: [/ELSEIF\ CFLAG:339\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4042',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4043',
        any: [/PRINTFORMW\ 「要用脚来做嘛？？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4045',
        any: [/PRINTFORMW\ 「想要用脚来做的吗？？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4047',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4048',
        any: [/PRINTFORMW\ 「完全无法理解呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4050',
        any: [/PRINTFORMW\ 「真是无法理解呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4052',
        any: [/CFLAG:TARGET:339\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4062',
        any: [/IF\ SELECTCOM\ ==\ 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4064',
        any: [/IF\ CFLAG:TARGET:341\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4065',
        any: [
          /PRINTFORMW\ 「不要啊！？\ 请、不要打%SAVESTR:TARGET%！好疼啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4066',
        any: [/CFLAG:TARGET:341\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4071',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:341\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4072',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~%UNICODE\(0x2661\)\ \*1%啊\~%UNICODE\(0x2661\)\ \*1%啊\~%UNICODE\(0x2661\)\ \*1%啊啊嗯\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4073',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的屁股不知道被用手掌拍打了多少次、已经变得非常的红肿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4074',
        any: [
          /PRINTFORMW\ 「做喂母猪真素真素对不齐…请更加处罚…请更加处罚%SELF_CALL\(TARGET\)%吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4075',
        any: [/CFLAG:TARGET:341\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4077',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:341\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4078',
        any: [
          /PRINTFORMW\ 「哈呜\~%UNICODE\(0x2661\)\ \*1%\ 啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 哈啊啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4079',
        any: [
          /PRINTFORMW\ 「啊啊\~…魔王大人\~…请更加地…处罚…%SAVESTR:TARGET%吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4080',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当被打到的时候都一脸好像要融化的啊嘿颜的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4081',
        any: [/CFLAG:TARGET:341\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4084',
        any: [
          /ELSEIF\ MARK:0\ ==\ 3\ \&\&\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:341\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4085',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊\~…是，是的…%SAVESTR:TARGET%会好好地…为了更好被打到…将屁股…抬高起来的…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4086',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将屁股高高地抬起来，如同在引诱着你的责打而摇晃着屁股………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4087',
        any: [/CFLAG:TARGET:341\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4090',
        any: [/ELSEIF\ CFLAG:341\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4091',
        any: [/PRINTFORMW\ 「请，请原谅…请不要再打了…啊\~啊啊啊\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4092',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的屁股不知道被打了多少次，变得十分地红肿、她的眼角不停地流着泪珠………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4093',
        any: [/CFLAG:TARGET:341\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4103',
        any: [/IF\ SELECTCOM\ ==\ 41/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4105',
        any: [/IF\ CFLAG:TARGET:342\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4107',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4108',
        any: [
          /PRINTFORMW\ 「啊嗯\~…啊\~啊啊\~…请处罚%SAVESTR:TARGET%吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4110',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4111',
        any: [
          /PRINTFORMW\ 「啊啊\~…哈呜嗯\~…啊啊\~…呀啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4112',
        any: [/PRINTFORMW\ 「啊啊\~…这样的…只是…疼一下而已………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4115',
        any: [/PRINTFORMW\ 「啊啊\~…哈呜…啊啊\~…不要啊………被打的不要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4117',
        any: [/CFLAG:TARGET:342\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4122',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:342\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4123',
        any: [
          /PRINTFORMW\ 「嗯呜%UNICODE\(0x2661\)\ \*1%\ 更加…更加用力地打下来吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4124',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 哪怕被打了…也会变得好舒服呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4125',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当鞭子打下来后，爱液便会飞散出来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4126',
        any: [/CFLAG:TARGET:342\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4128',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4129',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊\~%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%是一只鞭子挥下来就会有感觉的母猪来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4130',
        any: [/PRINTFORMW\ 「请打到失去意识吧\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4131',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当被鞭子打到就会发出娇喘、%SAVESTR:PLAYER%的鞭子就会更加用力挥下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4132',
        any: [/CFLAG:TARGET:342\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4134',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:342\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4135',
        any: [
          /PRINTFORMW\ 「啊嗯\~…啊\~啊\~…请更加用力处罚%SELF_CALL\(TARGET\)%吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4136',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%每当被打到一下身体就出扭动起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4137',
        any: [/CFLAG:TARGET:342\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4139',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:342\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4140',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊\~…啊啊啊啊\~%UNICODE\(0x2661\)\ \*1%…哈啊…哈啊…啊啊…被打到的地方…正在一抽一抽的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4141',
        any: [
          /PRINTFORMW\ 「更加欺负%SELF_CALL\(TARGET\)%…请更加欺负%SELF_CALL\(TARGET\)%吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4142',
        any: [/CFLAG:TARGET:342\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4144',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4145',
        any: [
          /PRINTFORMW\ 「哈啊啊\~…嗯\~…嗯\~%UNICODE\(0x2661\)\ \*1%\ 好棒…的呀\~啊哈\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4146',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当鞭子挥下去就会从蜜穴流出爱液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4147',
        any: [/CFLAG:TARGET:342\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4149',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:342\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4150',
        any: [/PRINTFORMW\ 「请原谅…请原谅%SAVESTR:TARGET%吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4151',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%身体颤抖着，好像很害怕的样子，………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4152',
        any: [/CFLAG:TARGET:342\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4154',
        any: [
          /ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:342\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4155',
        any: [
          /PRINTFORMW\ 「嗯哈恩\~…啊啊\~…明明在被打着…啊啊\~\.\.\.明明应该很疼来的…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4156',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每次被打到的时候都紧紧合住双腿、一脸好像在忍耐着什么东西的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4157',
        any: [/CFLAG:TARGET:342\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4159',
        any: [/ELSEIF\ CFLAG:335\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4160',
        any: [/PRINTFORMW\ 「不、不要啊…已经…被打的不要啊…不要啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4161',
        any: [/CFLAG:TARGET:342\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4171',
        any: [/IF\ SELECTCOM\ ==\ 42/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4173',
        any: [/IF\ CFLAG:TARGET:343\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4175',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4176',
        any: [
          /PRINTFORMW\ 「哈呜…不，不行的啊…请、请原谅…请原谅%SELF_CALL\(TARGET\)%吧！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4178',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4179',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%到底…做了什么错事了吗…啊\~啊啊\~啊啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4182',
        any: [
          /PRINTFORMW\ 「哈呜\~…用、用这种东西到底想要干什么…难、难道…不要\~不要不要啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4184',
        any: [/CFLAG:TARGET:343\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4189',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:343\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4190',
        any: [
          /PRINTFORMW\ 「啊\~…啊啊\~…哈啊嗯\~%UNICODE\(0x2661\)\ \*1%…好奇怪啊\~…明明好痛来的…明明好痛来的呀%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4191',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%柔弱的皮肤渗出血来了也发出了愉悦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4192',
        any: [/CFLAG:TARGET:343\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4194',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4195',
        any: [
          /PRINTFORMW\ 「啊啊\~…针…在一转一转地…麻，麻掉了…要麻掉了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4196',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对自己麻痹的感觉迷惑起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4197',
        any: [/CFLAG:TARGET:343\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4199',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:343\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4200',
        any: [
          /PRINTFORMW\ 「啊啊\~…对不起…作为一个下流的奴隶真是对不起…请原谅%SELF_CALL\(TARGET\)%吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4201',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为尖锐的苦痛而哭泣起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4202',
        any: [/CFLAG:TARGET:343\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4204',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:343\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4205',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…请更加…更多地…刺…进去吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4206',
        any: [
          /PRINTFORMW\ 柔软的皮肤流出了鲜血，%SAVESTR:TARGET%发出了愉悦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4207',
        any: [/CFLAG:TARGET:343\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4209',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4210',
        any: [
          /PRINTFORMW\ 「嗯哼\~…针…好深…好深呀\~…嗯哈呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4211',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对自己麻痹的感觉迷惑起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4212',
        any: [/CFLAG:TARGET:343\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4214',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:343\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4215',
        any: [
          /PRINTFORMW\ 「原谅…请原谅%SAVESTR:TARGET%吧…疼什么的…真的不要呀…不要…不要啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4216',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为尖锐的苦痛而哭泣起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4217',
        any: [/CFLAG:TARGET:343\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4219',
        any: [
          /ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:343\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4220',
        any: [
          /PRINTFORMW\ 「啊啊\~…麻，麻掉了…要麻掉了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4221',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对自己麻痹的感觉迷惑起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4222',
        any: [/CFLAG:TARGET:343\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4224',
        any: [/ELSEIF\ CFLAG:343\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4225',
        any: [/PRINTFORMW\ 「嗯呜！…不要不要不要啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4226',
        any: [/CFLAG:TARGET:343\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4236',
        any: [/IF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4238',
        any: [/IF\ CFLAG:TARGET:344\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4240',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4241',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4243',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4244',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4247',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4249',
        any: [/CFLAG:TARGET:344\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4254',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4255',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4256',
        any: [/CFLAG:TARGET:344\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4258',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4259',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4260',
        any: [/CFLAG:TARGET:344\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4262',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4263',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4264',
        any: [/CFLAG:TARGET:344\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4266',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:344\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4267',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4268',
        any: [/CFLAG:TARGET:344\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4270',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4271',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4272',
        any: [/CFLAG:TARGET:344\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4274',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:344\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4275',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4276',
        any: [/CFLAG:TARGET:344\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4278',
        any: [
          /ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:344\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4279',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4280',
        any: [/CFLAG:TARGET:344\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4282',
        any: [/ELSEIF\ CFLAG:344\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4283',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4284',
        any: [/CFLAG:TARGET:344\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4289',
        any: [/ELSEIF\ SELECTCOM\ ==\ 43\ \&\&\ TEQUIP:43\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4291',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4292',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4293',
        any: [/CFLAG:380\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4295',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:380\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4296',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4297',
        any: [/CFLAG:380\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4299',
        any: [/ELSEIF\ CFLAG:380\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4300',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4301',
        any: [/CFLAG:380\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4311',
        any: [/IF\ SELECTCOM\ ==\ 44\ \&\&\ TEQUIP:44/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4313',
        any: [/IF\ CFLAG:TARGET:345\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4315',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4316',
        any: [
          /PRINTFORMW\ 「啊啊恩\~…请更加用力地将%SELF_CALL\(TARGET\)%绑住吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4318',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4319',
        any: [
          /PRINTFORMW\ 「明明不用做这种情况…%SELF_CALL\(TARGET\)%早就是大人您的东西来的了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4322',
        any: [/PRINTFORMW\ 「啊啊\~…快、快点解开啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4324',
        any: [/CFLAG:TARGET:345\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4329',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:345\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4330',
        any: [
          /PRINTFORMW\ 「嗯哈嗯\~…更加…用力地绑…也没关系的啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4331',
        any: [
          /PRINTFORMW\ 「啊啊\~…然后就这样被侵犯的话%UNICODE\(0x2661\)\ \*1%…就真的是最棒得了\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4332',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被捆绑到爱液流遍了大腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4333',
        any: [/CFLAG:TARGET:345\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4335',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4336',
        any: [
          /PRINTFORMW\ 「哈啊%UNICODE\(0x2661\)\ \*1%哈啊%UNICODE\(0x2661\)\ \*1%\ 绳子…陷进肉里了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4337',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊啊\~…已，已经…啊啊…主人\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4338',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%坐立不安地好像期待着什么东西一样看着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4339',
        any: [/CFLAG:TARGET:345\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4341',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:345\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4342',
        any: [
          /PRINTFORMW\ 「啊啊…绳子连…胸部都陷进去了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4343',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为被捆绑着而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4344',
        any: [/CFLAG:TARGET:345\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4346',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:345\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4347',
        any: [
          /PRINTFORMW\ 「哈啊\~…哈啊\~…啊啊\~…不行…不行的啊\~%UNICODE\(0x2661\)\ \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4348',
        any: [
          /PRINTFORMW\ 「小穴被绳子捆绑着…明明很难受来的…啊\~啊啊\~…哈嗯\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4349',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被粗绳捆绑住后露出了发情的母狗一样的啊嘿颜呻吟起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4350',
        any: [/CFLAG:TARGET:345\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4352',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4353',
        any: [
          /PRINTFORMW\ 「啊啊\~…更加的…收紧一点吧\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4354',
        any: [
          /PRINTFORMW\ 「被捆绑住后…就更加能感受到…%SAVESTR:TARGET%是大人您的东西来的…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4355',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸好像很舒服的样子地被捆绑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4356',
        any: [/CFLAG:TARGET:345\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4358',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:345\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4359',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%…在被大人您捆绑着呢…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4360',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸恍惚地样子被捆绑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4361',
        any: [/CFLAG:TARGET:345\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4363',
        any: [
          /ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:345\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4364',
        any: [
          /PRINTFORMW\ 「啊啊恩\~…绳子…请再%UNICODE\(0x2661\)\ \*1%收紧一点吧\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4365',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%每当绳子收地更紧的时候就露出了更加淫荡的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4366',
        any: [/CFLAG:TARGET:345\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4368',
        any: [/ELSEIF\ CFLAG:345\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4369',
        any: [
          /PRINTFORMW\ 「哈啊\~…哈啊\~…请原谅…绳子好紧啊……请将绳子给解开吧\~\~\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4370',
        any: [/CFLAG:TARGET:345\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4375',
        any: [/ELSEIF\ SELECTCOM\ ==\ 44\ \&\&\ TEQUIP:44\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4377',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:385\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4378',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…啊啊…绳子装明明不错来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4379',
        any: [/CFLAG:385\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4381',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:385\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4382',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…明明想要被捆住…一整天都没有关系来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4383',
        any: [/CFLAG:385\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4385',
        any: [/ELSEIF\ CFLAG:385\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4386',
        any: [/PRINTFORMW\ 「哈啊哈啊…啊啊…绳子的勒痕…那么地…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4387',
        any: [/CFLAG:385\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4397',
        any: [/IF\ SELECTCOM\ ==\ 45\ \&\&\ TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4399',
        any: [/IF\ CFLAG:TARGET:346\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4401',
        any: [/IF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4402',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呃\~…嗯呼嗯\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4404',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4405',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4408',
        any: [/PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4410',
        any: [/CFLAG:TARGET:346\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4415',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:346\ <=\ 8\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4416',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4417',
        any: [/CFLAG:TARGET:346\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4419',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4420',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4421',
        any: [/CFLAG:TARGET:346\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4423',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:346\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4424',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4425',
        any: [/CFLAG:TARGET:346\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4427',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 5\ \&\&\ \(CFLAG:346\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4428',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4429',
        any: [/CFLAG:TARGET:346\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4431',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4432',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4433',
        any: [/CFLAG:TARGET:346\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4435',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:346\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4436',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4437',
        any: [/CFLAG:TARGET:346\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4439',
        any: [
          /ELSEIF\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:346\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4440',
        any: [/PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4441',
        any: [/CFLAG:TARGET:346\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4443',
        any: [/ELSEIF\ CFLAG:346\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4444',
        any: [/PRINTFORMW\ 「嗯\~…嗯呜\~…嗯呼\~…嗯嗯\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4445',
        any: [/CFLAG:TARGET:346\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4450',
        any: [/ELSEIF\ SELECTCOM\ ==\ 45\ \&\&\ TEQUIP:45\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4452',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:386\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4453',
        any: [
          /PRINTFORMW\ 「嗯哈啊…哈啊…哈啊…哈啊…主人…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4454',
        any: [/CFLAG:386\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4456',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:386\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4457',
        any: [
          /PRINTFORMW\ 「嗯哈啊…哈啊…哈啊…哈啊…好难受来的啊…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4458',
        any: [/CFLAG:386\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4460',
        any: [/ELSEIF\ CFLAG:386\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4461',
        any: [/PRINTFORMW\ 「嗯哈啊…哈啊…哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4462',
        any: [/CFLAG:386\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4472',
        any: [/IF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4474',
        any: [/IF\ CFLAG:TARGET:347\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4476',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4477',
        any: [
          /PRINTFORMW\ 「啊啊\~…进来了呀\~\~\~%UNICODE\(0x2661\)\ \*1%…啊啊\~%UNICODE\(0x2661\)\ \*1%浣腸液%UNICODE\(0x2661\)\ \*1%好热\~\~好舒服\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4479',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4480',
        any: [
          /PRINTFORMW\ 「不，不行的呀…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…肚子的感觉便奇怪了\~啊啊\~…好烫！浣腸液好烫呀\~\~\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4483',
        any: [/PRINTFORMW\ 「啊\~啊\~…嗯呃啊…肚子…好难受…请、请快停下来………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4485',
        any: [/CFLAG:TARGET:347\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4490',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4491',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…%UNICODE\(0x2661\)\ \*1%\ 好热…好热好厉害啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4492',
        any: [
          /PRINTFORMW\ 「啊哈哦\~%UNICODE\(0x2661\)\ \*1%不要不要…肚子要\~%UNICODE\(0x2661\)\ \*1%\ 请不要那么温柔地%UNICODE\(0x2661\)\ \*1%\ 抚摸肚子了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4493',
        any: [
          /PRINTFORMW\ 「啊\~…噢噢\~…肚子…好、好多进去了…嗯\~噢噢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4494',
        any: [/CFLAG:347\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4496',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:347\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4497',
        any: [
          /PRINTFORMW\ 「啊啊\~…好热的\~…正在进来呀\~%UNICODE\(0x2661\)\ \*1%\ 哈呜\~好烫好热呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4498',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…主人\~…肚子里面的东西…请尽情地看着吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4499',
        any: [/CFLAG:347\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4501',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4502',
        any: [
          /PRINTFORMW\ 「啊\~啊啊啊\~…嗯\~…肚子…在咕噜咕噜地响着呢…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4503',
        any: [
          /PRINTFORMW\ 「啊啊\~就这样…将不像样的姿态给暴露出来了呀\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4504',
        any: [
          /PRINTFORMW\ 「大人您的话…就没有关系的\~\~…啊啊\~…请…请看着吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4505',
        any: [/CFLAG:347\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4507',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:347\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4508',
        any: [
          /PRINTFORMW\ 「啊\~啊啊啊\~…嗯\~…肚子…在咕噜咕噜地响着呢…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4509',
        any: [/PRINTFORMW\ 「真，真的…好难受的…请原谅一下…哈啊…呃呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4510',
        any: [/CFLAG:347\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4512',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:347\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4513',
        any: [
          /PRINTFORMW\ 「啊啊\~…肚，肚子里面…突然变奇怪起来了…屁，屁股…变，变奇怪了…请救救%SELF_CALL\(TARGET\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4514',
        any: [/CFLAG:347\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4516',
        any: [/ELSEIF\ \ CFLAG:347\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4517',
        any: [/IF\ TEQUIP:54\ ==\ 1\ \&\&\ PREVCOM\ ==\ 46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4518',
        any: [
          /PRINTFORMW\ 「真、真的不要了啊，赤裸着，在人前，排泄什呃，肚子，肚子好疼啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4519',
        any: [/ELSEIF\ PREVCOM\ ==\ 46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4520',
        any: [
          /PRINTFORMW\ 「不、不要啊！　不要再那样了啊啊…肚子、进来了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4522',
        any: [
          /PRINTFORMW\ 「肚子…好、好难受啊…请，请不要再这样欺负%SELF_CALL\(TARGET\)%了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4524',
        any: [/CFLAG:347\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4529',
        any: [/ELSEIF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4531',
        any: [/IF\ CFLAG:TARGET:387\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4533',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4535',
        any: [/IF\ TEQUIP:54\ ==\ 1\ \&\&\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4537',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用自己的手扒开了菊穴，展示着本应羞于见人的排泄场面……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4538',
        any: [
          /PRINTFORMW\ 「哈啊啊啊、嗯哦唔、嗯吼噢噢噢唔%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4539',
        any: [
          /PRINTFORMW\ 「咿…哈噢哦唔呜呜嗯%UNICODE\(0x2764\)\ \*1%　好好看着哦%UNICODE\(0x2764\)\ \*1%　好好录下来哦%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4540',
        any: [
          /PRINTFORMW\ 「粪便把菊穴給、撑开了啊%UNICODE\(0x2764\)\ \*1%　拉出来了啊…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4541',
        any: [
          /PRINTFORMW\ 「像狗一样，在外面随地排泄…请看看因此觉得舒服了的、污秽的母兽啊…唔%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4543',
        any: [/ELSEIF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4544',
        any: [
          /PRINTFORMW\ 「哦欧唔…%UNICODE\(0x2764\)\ \*1%　啊%UNICODE\(0x2764\)\ \*1%　啊%UNICODE\(0x2764\)\ \*1%　嗯嗯…啊昂…吼哦、吼唔噢噢噢噢%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4545',
        any: [
          /PRINTFORMW\ 「来了、拉出来了啦%UNICODE\(0x2764\)\ \*1%　在人前、张开着菊、菊穴…粪便…嗯、%SELF_CALL\(TARGET,5\)%呃%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4546',
        any: [
          /PRINTFORMW\ 「这样好舒服哦%UNICODE\(0x2764\)\ \*1%　要上瘾了啊呜呜呜…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4548',
        any: [/ELSEIF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4549',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%的喷粪秀%UNICODE\(0x2764\)\ \*1%　请一定要好好看着哦…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4550',
        any: [
          /PRINTFORMW\ 「哦吼%UNICODE\(0x2764\)\ \*1%　嘤嘤咿咿、咕唔%UNICODE\(0x2764\)\ \*1%　要拉出来了%UNICODE\(0x2764\)\ \*1%　拉出来了吧%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4551',
        any: [
          /PRINTFORMW\ 「刺溜刺溜的%UNICODE\(0x2764\)\ \*1%　乱成一团了…%UNICODE\(0x2764\)\ \*1%　%SELF_CALL\(TARGET,3\)%、要变成白痴了啊……%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4554',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为初次强制排泄调教的快感而全身颤抖起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4555',
        any: [
          /PRINTFORMW\ 「哈嗷嗷嗷啊啊嗷嗷唔%UNICODE\(0x2764\)\ \*1%　真是耻辱极了%UNICODE\(0x2764\)\ \*1%　太耻辱了%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4556',
        any: [
          /PRINTFORMW\ 「这才是和变态淫乱奴隶的%SELF_CALL\(TARGET\)%相称的调教啊%UNICODE\(0x2764\)\ \*1%　这样的、才够过分啊%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4559',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4560',
        any: [
          /PRINTFORMW\ 「就算%SELF_CALL\(TARGET\)%是主人的奴隶，还是个变态，这…这也，太过头了吧啊啊啊%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4561',
        any: [
          /PRINTFORMW\ 「啊%UNICODE\(0x2764\)\ \*1%　啊%UNICODE\(0x2764\)\ \*1%　嗷嗷、啊%UNICODE\(0x2764\)\ \*1%　拉、拉出来了…停不下来…出来了、好多啊啊啊啊……%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4563',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4564',
        any: [
          /PRINTFORMW\ 「请、请不要看啊……唯独不想让主人大人看到的啊……嗯、嗯咕呜呜呜！　不要看啊啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4566',
        any: [/ELSEIF\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4567',
        any: [
          /IF\ TALENT:成为勇者前的生活\ ==\ 5\ \|\|\ TALENT:成为勇者前的生活\ ==\ 7\ \|\|\ TALENT:成为勇者前的生活\ ==\ 9\ \|\|\ TALENT:成为勇者前的生活\ ==\ 20/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4568',
        any: [/IF\ TALENT:成为勇者前的生活\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4569',
        any: [/PRINTFORM\ 「从娼妇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4570',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4571',
        any: [/PRINTFORM\ 「从乞丐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4572',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4573',
        any: [/PRINTFORM\ 「从贫民/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4574',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4575',
        any: [/PRINTFORM\ 「从奴隶/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4577',
        any: [/PRINTFORMW\ 成为了勇者，就能摆脱以前的生活…才对的啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4578',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%，怎么就落到这个地步…呢…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4580',
        any: [
          /PRINTFORMW\ 「啊啊啊、被拍下来了啊…%SELF_CALL\(TARGET\)%的耻辱的、样子…怎么这样…怎么…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4581',
        any: [
          /PRINTFORMW\ 「噫！　呀…呀啊啊啊啊…强制排泄什么的…怎么…怎么会…这么…舒服…的啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4583',
        any: [
          /PRINTFORML\ 在初次强制排泄的耻辱中，%SAVESTR:TARGET%记住了这混乱的快感……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4584',
        any: [
          /PRINTFORMW\ 「不、不是吧！　这种事应该不会舒服才…啊？　嗷嗷？　哈、啊啊啊…啊啊啊啊嗷%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4588',
        any: [
          /IF\ TALENT:成为勇者前的生活\ ==\ 5\ \|\|\ TALENT:成为勇者前的生活\ ==\ 7\ \|\|\ TALENT:成为勇者前的生活\ ==\ 9\ \|\|\ TALENT:成为勇者前的生活\ ==\ 20/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4589',
        any: [/PRINTFORM\ 「不、不要啊！　这这这、这样子的、比/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4590',
        any: [/IF\ TALENT:成为勇者前的生活\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4591',
        any: [/PRINTFORM\ 娼妇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4592',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4593',
        any: [/PRINTFORM\ 乞丐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4594',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4595',
        any: [/PRINTFORM\ 贫民/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4596',
        any: [/ELSEIF\ TALENT:成为勇者前的生活\ ==\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4597',
        any: [/PRINTFORM\ 奴隶/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4599',
        any: [/PRINTFORMW\ 还不如的待遇！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4600',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%っ，都成为勇者…成为勇者摆脱这些了啊…呀、呀啊啊啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4602',
        any: [
          /PRINTFORMW\ 「…啊、不要拍啊…唔、%SELF_CALL\(TARGET\)%的这幅模样…请不要记录下来啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4603',
        any: [
          /PRINTFORMW\ 「啊啊啊啊…！　停、停下啊…已经、出不来了、出、啊啊啊啊啊啊、啊嗷嗷嗷嗷…不要啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4605',
        any: [/ELSEIF\ TEQUIP:54\ ==\ 1\ \&\&\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4606',
        any: [
          /PRINTFORML\ 用水晶球记录了全裸只戴了项圈的%SAVESTR:TARGET%在初次地下城里排泄的样子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4607',
        any: [
          /PRINTFORMW\ 「这样子的、这样子的绝对不可原谅啊…唔、绝对…绝对的…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4608',
        any: [
          /PRINTFORMW\ 「总有一天…绝对、要破坏掉那个水晶球…啊啊啊啊啊、出来了…快停下、快停下啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4610',
        any: [/ELSEIF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4611',
        any: [
          /PRINTFORMW\ 「认输了…至少、去厕所、再…呃！　啊啊啊啊…不、不要啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4612',
        any: [
          /PRINTFORMW\ 「这样…耻辱的、在地下城里…漏出来了什么的…咕呜呜…啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4614',
        any: [/ELSEIF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4615',
        any: [
          /PRINTFORML\ 记忆的水晶球完整的把%SAVESTR:TARGET%的痴态，由始至终的记录了下来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4616',
        any: [
          /PRINTFORMW\ 「在连厕所都没有的地方…在人前、暴露着这样的丑态…这样的、这、样…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4617',
        any: [
          /PRINTFORMW\ 「不行了…呜！　又、又拉了、泄出来了…啊啊啊、不要看…啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4620',
        any: [
          /PRINTFORMW\ 「这、这是…这样子的啊、真是什么调教方式都有呢魔王、…呜呜！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4621',
        any: [
          /PRINTFORMW\ 「啊啊啊…明明不是野猫野狗、竟然在没有厕所的地方、让%SELF_CALL\(TARGET\)%这幅丑态…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4622',
        any: [/PRINTFORMW\ 「…啊、啊啊啊！　又要、出来…出来了啊…！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4625',
        any: [/CFLAG:TARGET:387\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4630',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:387\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4632',
        any: [/IF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4634',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4635',
        any: [/PRINTFORM\ 「哈唉呜\~%UNICODE\(0x2661\)\ \*1%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4637',
        any: [/PRINTFORM\ 「哈唉呜\~%UNICODE\(0x2661\)\ \*1%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4639',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4640',
        any: [/PRINTFORM\ 嗯哦哦哦\~%UNICODE\(0x2661\)\ \*3%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4642',
        any: [/PRINTFORM\ 哦吼噢噢\~%UNICODE\(0x2661\)\ \*3%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4644',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4645',
        any: [/PRINTFORMW\ 噢噢噢哦\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4647',
        any: [/PRINTFORMW\ 啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4650',
        any: [/REPEAT\ CHARANUM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4651',
        any: [
          /IF\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ CFLAG:COUNT:501\ ==\ 9\ \&\&\ ABL:17\ >=\ 5/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4652',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4653',
        any: [
          /PRINTFORM\ 「…哈、啊哈%UNICODE\(0x2764\)\ \*1%　一想到%SELF_CALL\(TARGET\)%拉出来的东西、要是让探索中的勇者/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4654',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4655',
        any: [/PRINTFORM\ 找到/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4656',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4657',
        any: [/PRINTFORM\ 一不小心捡到/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4659',
        any: [/PRINTFORM\ 无意中踩到/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4661',
        any: [/PRINTFORMW\ 了的话…吼吼噢噢噢噢%UNICODE\(0x2764\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4662',
        any: [
          /PRINTFORMW\ 「实在是…非常的、令人兴奋不已啊%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4663',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4664',
        any: [
          /PRINTFORMW\ 「光着身子、散着步、%SELF_CALL\(TARGET\)%、愉快的拉臭臭%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4665',
        any: [
          /PRINTFORMW\ 「快要靠近的的勇者…马上就要%UNICODE\(0x2764\)\ \*1%　看到%SELF_CALL\(TARGET\)%拉臭臭的样子啦啊啊…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4667',
        any: [
          /PRINTFORMW\ 「主人大人、还有其他的各位、来看看吧%UNICODE\(0x2764\)\ \*1%　哦、哦哦、哦吼吼哦…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4668',
        any: [
          /PRINTFORMW\ 「全裸的%SAVESTR:TARGET%、在地下城…从菊穴拉出臭臭来了…请好好看着这不雅的姿态吧%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4670',
        any: [/CFLAG:387\ =\ 7/],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '4673', any: [/REND/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4675',
        any: [/IF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4676',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4677',
        any: [
          /PRINTFORMW\ 「拍下来啦%UNICODE\(0x2764\)\ \*1%　%SAVESTR:TARGET%的、野外排泄…被拍下来了啦%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4678',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4679',
        any: [
          /PRINTFORMW\ 「出来了出来了…%UNICODE\(0x2764\)\ \*1%　嗷嗷%UNICODE\(0x2764\)\ \*1%　再多看看啊…再多拍一些啊%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4681',
        any: [
          /PRINTFORMW\ 「野外露出%UNICODE\(0x2764\)\ \*1%　还野外排泄了…太有感觉了%UNICODE\(0x2764\)\ \*1%　请再多拍一些哦……%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4685',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4686',
        any: [
          /PRINTFORMW\ 「在这种…地方…%SELF_CALL\(TARGET\)%拉了这么多…太有感觉了…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4687',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4688',
        any: [
          /PRINTFORMW\ 「主人大人…%SELF_CALL\(TARGET\)%的…野外排泄…看吧…看着吧啊啊啊…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4690',
        any: [
          /PRINTFORMW\ 「停不下来啊%UNICODE\(0x2764\)\ \*1%　光着身子…拉了好多…野外排泄%UNICODE\(0x2764\)\ \*1%　好多…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4695',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4696',
        any: [
          /PRINTFORMW\ 「停不下来…根本停不下来啊…%UNICODE\(0x2764\)\ \*1%　拉臭臭…好舒服啊…%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4698',
        any: [
          /PRINTFORMW\ 「嗯嗯…吼…吼哦%UNICODE\(0x2764\)\ \*1%　哈啊啊、嘤咿咿%UNICODE\(0x2764\)\ \*1%　灌肠灌了好多出来…好棒%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4701',
        any: [/CFLAG:387\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4703',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:387\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4705',
        any: [/IF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4707',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4708',
        any: [/PRINTFORM\ 「哈唉呜\~%UNICODE\(0x2661\)\ \*1%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4710',
        any: [/PRINTFORM\ 「哈唉呜\~%UNICODE\(0x2661\)\ \*1%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4712',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4713',
        any: [/PRINTFORM\ 嗯哦哦哦\~%UNICODE\(0x2661\)\ \*3%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4715',
        any: [/PRINTFORM\ 哦吼噢噢\~%UNICODE\(0x2661\)\ \*3%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4717',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4718',
        any: [/PRINTFORMW\ 噢噢噢哦\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4720',
        any: [/PRINTFORMW\ 啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4722',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4723',
        any: [
          /PRINTFORMW\ 「主人\~…哈唉呜\~%UNICODE\(0x2661\)\ \*1%\ 请，请不要看着那里\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4725',
        any: [
          /PRINTFORMW\ 「停…停不下来啊\~\~……在这种地方…%SELF_CALL_FIRST\(TARGET\)%要、要拉出来了呀啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4729',
        any: [
          /PRINTFORMW\ 「哈啊\~%UNICODE\(0x2661\)\ \*1%\ 主人…要、要拉出来了呀啊啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4731',
        any: [/CFLAG:387\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4737',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:387\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4738',
        any: [
          /PRINTFORMW\ 「啊啊啊\~、请不要看着那里……要、要拉出来了……真的……不要看啊嗷嗷」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4739',
        any: [/CFLAG:387\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4741',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ ABL:21\ >=\ 3\ \&\&\ \(CFLAG:387\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4743',
        any: [/REPEAT\ CHARANUM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4744',
        any: [
          /IF\ TEQUIP:54\ ==\ 1\ \&\&\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ CFLAG:COUNT:501\ ==\ 9\ \&\&\ ABL:17\ >=\ 5/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4745',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4746',
        any: [
          /PRINTFORMW\ 「啊啊啊啊啊啊啊…！　好舒服啊啊…！　怪物也好其他的勇者也行啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4747',
        any: [
          /PRINTFORMW\ 「光着身子、在地下城、%SELF_CALL\(TARGET\)%排便的样子…好、好想被看到啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4748',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4749',
        any: [/PRINTFORMW\ 「明明不可以的、可是、好舒服噢噢噢噢…唔♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4750',
        any: [
          /PRINTFORMW\ 「在还有其他人的气息的地下城里…光着身子拉臭臭…要上瘾了啊啊…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4752',
        any: [
          /PRINTFORMW\ 「啊啊啊啊、停不下来啊啊…！　谁、有谁要过来了！　可是拉得停不下来啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4753',
        any: [
          /PRINTFORMW\ 「在地下城、裸体排便、不想停不下来…太舒服了啊啊啊啊…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4755',
        any: [/CFLAG:387\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4757',
        any: [
          /ELSEIF\ TEQUIP:54\ ==\ 1\ \&\&\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ CFLAG:COUNT:501\ ==\ 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4758',
        any: [
          /PRINTFORMW\ 「啊啊…！　这、这瞬间也有可能、会碰上在地下城探索中的其他勇者、的啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4759',
        any: [
          /PRINTFORMW\ 「明明光着身子…在野外…排便、不想停下来、啊！　啊啊啊、怎么会这么舒服啊啊啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4760',
        any: [/CFLAG:387\ =\ 3/],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '4763', any: [/REND/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4765',
        any: [/IF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4766',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4767',
        any: [
          /PRINTFORMW\ 「在外面…在地下城里…光着身子的这幅丑态、%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%……竟然」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4768',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4769',
        any: [
          /PRINTFORMW\ 「请原谅…请原谅我啊！！　啊、啊啊啊啊啊、出来了…出来了啊啊啊啊…唔！？　啊、啊嗷嗷嗷♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4771',
        any: [
          /PRINTFORMW\ 「啊…啊啊、泄出来了…！　连衣服都没穿的在地下城里…可是、怎么会、这么舒服…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4775',
        any: [
          /PRINTFORM\ 「不、骗人的吧！　像这样子动着…慢慢排出来、菊穴、还蠕动/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4776',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4777',
        any: [/PRINTFORMW\ 着……竟然…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4778',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4779',
        any: [/PRINTFORMW\ 着……唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4781',
        any: [/PRINTFORMW\ 着…明明不可以的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4784',
        any: [/CFLAG:387\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4786',
        any: [/ELSEIF\ \ CFLAG:387\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4788',
        any: [/IF\ MARK:2\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4790',
        any: [/REPEAT\ CHARANUM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4791',
        any: [
          /IF\ TEQUIP:54\ ==\ 1\ \&\&\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ CFLAG:COUNT:501\ ==\ 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4792',
        any: [
          /PRINTFORMW\ 「求求您了、只有这点请不要…啊！　啊、啊啊啊啊…！？　出、出来了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4793',
        any: [
          /PRINTFORMW\ 「停下来…%SELF_CALL\(TARGET\)%拉出来的东西、要被其他勇者看见了啊呜呜呜呜……！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4794',
        any: [/CFLAG:387\ =\ 2/],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '4797', any: [/REND/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4799',
        any: [/IF\ TEQUIP:54\ ==\ 1\ \&\&\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4800',
        any: [/PRINTFORML\ 一丝不挂的%SAVESTR:TARGET%在地下城里不停地排便着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4801',
        any: [
          /PRINTFORMW\ 「请原谅我…请原谅…%SELF_CALL\(TARGET\)%的…这、这幅模样…请不要记录下来啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4803',
        any: [/ELSEIF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4804',
        any: [
          /PRINTFORMW\ 「不要、不要啊…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4806',
        any: [/ELSEIF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4807',
        any: [/PRINTFORMW\ 「呜呜…别看啊、至少…请不要拍、啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4810',
        any: [/PRINTFORM\ 「原、原谅我…啊啊啊啊！！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4811',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4812',
        any: [/PRINTFORMW\ 又要…出来了、出…快停下来啊……！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4813',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4814',
        any: [/PRINTFORMW\ 请、请怜悯下…！　啊？　啊啊、不要啊啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4816',
        any: [/PRINTFORMW\ 不要…请原俩…啊啊啊！　啊啊啊……」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4822',
        any: [/REPEAT\ CHARANUM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4823',
        any: [
          /IF\ TEQUIP:54\ ==\ 1\ \&\&\ CFLAG:COUNT:1\ ==\ 2\ \&\&\ CFLAG:COUNT:501\ ==\ 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4824',
        any: [
          /PRINTFORMW\ 「啊啊、停下停下来啊啊…！　不要拉出来啊、啊…！　啊、啊啊…！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4825',
        any: [
          /PRINTFORMW\ 「不、不然的话！　%SELF_CALL\(TARGET\)%的排泄物、就要被其他勇者看到了啊啊啊……！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4826',
        any: [/CFLAG:387\ =\ 2/],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '4829', any: [/REND/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4831',
        any: [/IF\ TEQUIP:54\ ==\ 1\ \&\&\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4832',
        any: [
          /PRINTFORMW\ 「快、快停下啊！　这…这样的姿态被拍下来什么的…啊啊啊啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4834',
        any: [/ELSEIF\ TEQUIP:54\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4835',
        any: [
          /PRINTFORMW\ 「不、不要哇…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4837',
        any: [/ELSEIF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4838',
        any: [
          /PRINTFORMW\ 「厕所、快点去厕所…不行、在这里拍什么的…请原谅、啊啊啊、不要啊啊啊……！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4840',
        any: [/PRINTFORMW\ 「请、请原谅…啊啊啊啊\~！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4843',
        any: [/CFLAG:387\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4852',
        any: [/IF\ SELECTCOM\ ==\ 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4854',
        any: [/IF\ CFLAG:356\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4856',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4857',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸若无其事地看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4859',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4860',
        any: [/PRINTFORMW\ 「哈啊哈啊…要…休息了吗\.\.\.？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4861',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%不满地微眯着眼，看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4863',
        any: [/ELSEIF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4864',
        any: [
          /PRINTFORMW\ 「哈啊…啊啊…主人\~…拜，拜托了呀\~…啊啊\~…至、至少抱一下吧\~\~\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4865',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的眼睛湿润起来，向%SAVESTR:PLAYER%撒起娇来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4868',
        any: [/PRINTFORMW\ 「嗯\~………什么也不做吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4869',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸若无其事地看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4871',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4874',
        any: [
          /PRINTFORMW\ 在%SAVESTR:TARGET%的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4877',
        any: [
          /PRINTFORMW\ 在%SAVESTR:TARGET%的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4880',
        any: [
          /PRINTFORMW\ 在%SAVESTR:TARGET%的肛门里有着拉珠、导致肛门一抽一抽地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4883',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂戴上了电动阴蒂夹，不停地给%SAVESTR:TARGET%带来刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4886',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%带在乳头上的跳蛋正不停地给予她刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4889',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%的胸部正戴上了搾乳器而不停地被吸出母乳。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4892',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴茎被套上了飞机杯，好像下一秒就要射了一样一抽一抽地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4895',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%正在带着眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4898',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%的身体处于在被绳子捆绑住的状态。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4901',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肚子因为浣腸液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4904',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4907',
        any: [
          /PRINTFORMW\ 还有、这样的%SAVESTR:TARGET%的姿态由始至终都被录下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4908',
        any: [/CFLAG:356\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4913',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4914',
        any: [/PRINTFORMW\ 「………什么都不做吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4915',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸若无其事地看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4917',
        any: [
          /ELSEIF\ TALENT:76\ ==\ 1\ \&\&\ PALAM:5\ >=\ PALAMLV:3\ \&\&\ \(CFLAG:356\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4918',
        any: [
          /PRINTFORMW\ 「好，好过分啊…用这种眼神看着这边…啊啊\~啊\~…明明，%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经、变、变得奇怪起来了\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4919',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%已经完全被欲望支配了，明明什么都没有干就快要去了的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4920',
        any: [/CFLAG:356\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4922',
        any: [
          /ELSEIF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:356\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4923',
        any: [
          /PRINTFORMW\ 「哈啊…啊啊…主人\~…拜，拜托了…啊啊…请，请抱一下%SAVESTR:PLAYER%吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4924',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%湿润着眼睛向%SAVESTR:PLAYER%撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4925',
        any: [/CFLAG:356\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4927',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ PALAM:5\ >=\ PALAMLV:3\ \&\&\ \(CFLAG:356\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4928',
        any: [
          /PRINTFORMW\ 「不要休息了啦…快点…将%SELF_CALL\(TARGET\)%…啊嗯\~…将%SELF_CALL\(TARGET\)%啊\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4929',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%完全忍受不了被放置play的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4930',
        any: [/CFLAG:356\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4932',
        any: [
          /ELSEIF\ TALENT:85\ ==\ 1\ \&\&\ \(CFLAG:356\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4933',
        any: [/PRINTFORMW\ 「哈啊哈啊…要…休息了吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4934',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%不满地眯着眼睛、看向%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4935',
        any: [/CFLAG:356\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4937',
        any: [/ELSEIF\ CFLAG:356\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4938',
        any: [/PRINTFORMW\ 「………什么都不做吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4939',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一脸若无其事地看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4940',
        any: [/CFLAG:356\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4942',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4945',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4948',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4951',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肛门里有着拉珠、导致肛门一抽一抽地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4954',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂戴上了电动阴蒂夹，不停地给%SAVESTR:TARGET%带来刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4957',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%带在乳头上的跳蛋正不停地给予她刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4960',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%的胸部正戴上了搾乳器而不停地被吸出母乳。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4963',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴茎被套上了飞机杯，好像下一秒就要射出来了一样一抽一抽地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4966',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%正在带着眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4969',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%的身体处于在被绳子捆绑住的状态。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4972',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肚子因为浣腸液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4975',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4978',
        any: [
          /PRINTFORMW\ 还有、这样的%SAVESTR:TARGET%的姿态由始至终都被录下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4988',
        any: [/IF\ SELECTCOM\ ==\ 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4990',
        any: [/IF\ CFLAG:357\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4992',
        any: [/IF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4993',
        any: [/PRINTFORML\ %NAME:MASTER%催促着%SAVESTR:TARGET%开始自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4994',
        any: [/IF\ RAND:3\ ==\ 0\ \&\&\ \(TALENT:89\ \|\|\ ABL:17\ >=\ 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4995',
        any: [/PRINTFORM\ %SAVESTR:TARGET%将自己的本名、接下来要进行的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4997',
        any: [/PRINTFORM\ \ 还有手淫时妄想的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4998',
        any: [/PRINTFORML\ 之类的兴高采烈地说个不停……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '4999',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%只是因为想象着水晶球在故乡传播开的画面股间就湿润了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5000',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5001',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5002',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球说起了淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5003',
        any: [/PRINTFORMW\ 「嗨、嗨\~各位」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5004',
        any: [/PRINTFORMW\ 「故乡的大家、有看到吗\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5005',
        any: [
          /PRINTFORMW\ 「接下来…要和在这里的魔王大人做很多H的事情呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5006',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5007',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5008',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5009',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球进行了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5010',
        any: [/PRINTFORMW\ 「嗨，嗨\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5011',
        any: [/PRINTFORMW\ 「故乡的大家、又看到吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5012',
        any: [
          /PRINTFORMW\ 「在这里的这位大人…就是众所皆知的…魔王大人…来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5013',
        any: [
          /PRINTFORMW\ 「今天…作为%SELF_CALL\(TARGET\)%的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5014',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被%NAME:MASTER%抱住后、就不停地向%NAME:MASTER%的脸颊亲吻了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5015',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5016',
        any: [
          /ELSEIF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:76\ \|\|\ ABL:11\ >=\ 5\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5017',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球说起了淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5018',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5019',
        any: [
          /ELSEIF\ ABL:10\ >=\ 3\ \|\|\ ABL:11\ >=\ 4\ \|\|\ ABL:17\ >=\ 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5020',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球开始了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5021',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5023',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%岔开了视线什么都没说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5027',
        any: [
          /IF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:85\ \|\|\ ABL:10\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5028',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%摇晃着腰说起了恋慕的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5029',
        any: [
          /ELSEIF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:76\ \|\|\ ABL:11\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5030',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%摇晃着腰说起了淫猥的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5031',
        any: [
          /ELSEIF\ \(PALAM:4\ >=\ PALAMLV:4\ \|\|\ ABL:10\ >=\ 5\ \|\|\ TALENT:85\ \|\|\ TALENT:76\)\ \&\&\ PALAM:5\ >=\ PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5032',
        any: [/PRINTFORM\ 向其搭话后，%SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5033',
        any: [
          /IF\ TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5034',
        any: [/PRINT\ 欢喜的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5035',
        any: [/ELSEIF\ TEQUIP:44\ \|\|\ TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5036',
        any: [/PRINT\ 苦痛的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5038',
        any: [/PRINTFORML\ 叫声，拼命地向你回话了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5040',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5041',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%有点害羞地向你撒娇地一样靠近过来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5042',
        any: [
          /PRINTFORMW\ 「主人…请随意地对%SELF_CALL\(TARGET\)%任何事情吧………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5043',
        any: [
          /ELSEIF\ PALAM:4\ >=\ PALAMLV:4\ \|\|\ TALENT:85\ \|\|\ ABL:10\ >=\ 5/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5044',
        any: [/PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%融洽地向你回话了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5045',
        any: [
          /PRINTFORMW\ 「请对%SELF_CALL\(TARGET\)%下任何的命令吧\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5046',
        any: [/ELSEIF\ PALAM:4\ >=\ PALAMLV:2\ \|\|\ \ ABL:10\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5047',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%就担惊受怕地样子向你回话了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5048',
        any: [/PRINTFORMW\ 「啊、是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5050',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%好像根本没有听到一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5053',
        any: [/CFLAG:357\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5058',
        any: [/IF\ TEQUIP:53\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5059',
        any: [/PRINTFORML\ %NAME:MASTER%催促着%SAVESTR:TARGET%快点开始介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5060',
        any: [
          /IF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:85\ \|\|\ ABL:10\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5061',
        any: [/PRINTFORML\ %SAVESTR:TARGET%晃动着腰部开始说起了恋慕的话语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5062',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5063',
        any: [
          /ELSEIF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:76\ \|\|\ ABL:11\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5064',
        any: [/PRINTFORML\ %SAVESTR:TARGET%晃动着腰部说起了淫猥的话语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5065',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5066',
        any: [
          /ELSEIF\ RAND:3\ ==\ 0\ \&\&\ \(TALENT:89\ \|\|\ ABL:17\ >=\ 5\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5067',
        any: [/PRINTFORM\ %SAVESTR:TARGET%将自己的本名、接下来要进行的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5069',
        any: [/PRINTFORM\ 还有手淫时妄想的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5070',
        any: [/PRINTFORML\ \ 之类的兴高采烈地说个不停……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5071',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%只是因为想象到水晶球在故乡传播开的样子股间就湿润了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5072',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5073',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5074',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球说起了淫猥的话语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5075',
        any: [/PRINTFORMW\ 「嗨，嗨\~各位」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5076',
        any: [/PRINTFORMW\ 「故乡的大家、有看到吗\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5077',
        any: [
          /PRINTFORMW\ 「接下来…要和在这里的魔王大人做很多H的事情呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5078',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5079',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5080',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5081',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球开始了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5082',
        any: [/PRINTFORMW\ 「嗨，嗨\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5083',
        any: [/PRINTFORMW\ 「故乡的大家、有看到吗\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5084',
        any: [
          /PRINTFORMW\ 「在这里的这位大人…就是众所皆知的…魔王大人…来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5085',
        any: [
          /PRINTFORMW\ 「今天…作为%SELF_CALL\(TARGET\)%的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5086',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被%NAME:MASTER%抱住后、就不停地向%NAME:MASTER%的脸颊亲吻了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5087',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5088',
        any: [
          /ELSEIF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:76\ \|\|\ ABL:11\ >=\ 5\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5089',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球说起了淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5090',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5091',
        any: [
          /ELSEIF\ ABL:10\ >=\ 3\ \|\|\ ABL:11\ >=\ 4\ \|\|\ ABL:17\ >=\ 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5092',
        any: [/PRINTFORML\ %SAVESTR:TARGET%对着水晶球开始了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5093',
        any: [/TFLAG:32\ \|=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5095',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%岔开了视线什么都没说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5099',
        any: [
          /IF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:85\ \|\|\ ABL:10\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5100',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%摇晃着腰说起了恋慕的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5101',
        any: [
          /ELSEIF\ PALAM:5\ >=\ PALAMLV:4\ \&\&\ \(TALENT:76\ \|\|\ ABL:11\ >=\ 5\)\ \&\&\ TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5102',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%摇晃着腰说起了淫猥的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5103',
        any: [
          /ELSEIF\ \(PALAM:4\ >=\ PALAMLV:4\ \|\|\ ABL:10\ >=\ 5\ \|\|\ TALENT:85\ \|\|\ TALENT:76\)\ \&\&\ PALAM:5\ >=\ PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5104',
        any: [/PRINTFORM\ 向其搭话后，%SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5105',
        any: [
          /IF\ TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5106',
        any: [/PRINT\ 欢喜的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5107',
        any: [/ELSEIF\ TEQUIP:44\ \|\|\ TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5108',
        any: [/PRINT\ 苦痛的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5110',
        any: [/PRINTFORML\ 叫声，拼命地向你回话了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5112',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5113',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%有点害羞地向你撒娇地一样靠近过来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5114',
        any: [
          /PRINTFORMW\ 「主人…请随意地对%SELF_CALL\(TARGET\)%任何事情吧………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5115',
        any: [
          /ELSEIF\ PALAM:4\ >=\ PALAMLV:4\ \|\|\ TALENT:85\ \|\|\ ABL:10\ >=\ 5/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5116',
        any: [/PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%融洽地向你回话了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5117',
        any: [
          /PRINTFORMW\ 「请对%SELF_CALL\(TARGET\)%下任何的命令吧\~………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5118',
        any: [/ELSEIF\ PALAM:4\ >=\ PALAMLV:2\ \|\|\ \ ABL:10\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5119',
        any: [
          /PRINTFORML\ 向其搭话后，%SAVESTR:TARGET%就担惊受怕地样子向你回话了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5120',
        any: [/PRINTFORMW\ 「啊、是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5122',
        any: [
          /PRINTFORML\ \ 向其搭话后，%SAVESTR:TARGET%好像根本没有听到一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5132',
        any: [/IF\ SELECTCOM\ ==\ 123/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5134',
        any: [/IF\ CFLAG:TARGET:360\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5136',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5137',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5138',
        any: [
          /PRINTFORMW\ 「嗯哈恩\~…只用一根大鸡巴就能侵犯%SELF_CALL\(TARGET\)%的胸部还有嘴巴什么的…真是太棒了…嗯\~嗯哼唔\~…就呜呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5140',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5141',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5142',
        any: [
          /PRINTFORMW\ 「啊哈啊嗯\~%UNICODE\(0x2661\)\ \*1%\ %SAVESTR:TARGET%好\~好\~地…亲吻%SAVESTR:PLAYER%大人的大鸡巴的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5144',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5145',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、舔着胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5146',
        any: [
          /PRINTFORMW\ 「嗯呼呜\~…%UNICODE\(0x2661\)\ \*1%\ 请让%SAVESTR:TARGET%来侍奉大鸡巴吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5149',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5150',
        any: [/PRINTFORMW\ 「啊啊\~…这样…不知羞耻的…啾\~…啾\~…嗯呜嗯\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5152',
        any: [/CFLAG:TARGET:360\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5157',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:360\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5158',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5159',
        any: [
          /PRINTFORMW\ 「嗯哈恩\~…只用一根大鸡巴就能侵犯%SELF_CALL\(TARGET\)%的胸部还有嘴巴什么的…真是太棒了…嗯\~嗯哼唔\~…就呜呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5160',
        any: [/CFLAG:360\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5162',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:360\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5163',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5164',
        any: [
          /PRINTFORMW\ 「啊哈啊嗯\~%UNICODE\(0x2661\)\ \*1%\ %SAVESTR:TARGET%好\~好\~地…亲吻%SAVESTR:PLAYER%大人的大鸡巴的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5165',
        any: [/CFLAG:360\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5167',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:360\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5168',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5169',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、从胸部之间伸出来的阴茎前端陶醉地舔着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5171',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎包裹住、用舌尖舔着埋藏在胸部里的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5173',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5174',
        any: [
          /PRINTFORMW\ 「嗯呼呜\~…%UNICODE\(0x2661\)\ \*1%\ 非常感谢让%SELF_CALL\(TARGET\)%来侍奉大鸡巴啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5176',
        any: [
          /PRINTFORMW\ 「真是没办法呢\~%UNICODE\(0x2661\)\ \*1%\ …%SELF_CALL\(TARGET\)%的胸部就那么地舒服吗\~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5178',
        any: [/CFLAG:360\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5180',
        any: [/ELSEIF\ CFLAG:360\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5181',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用胸部将%SAVESTR:PLAYER%的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5182',
        any: [/PRINTFORMW\ 「啊啊\~…这样…不知羞耻的…啾\~…啾\~…嗯呜嗯\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5183',
        any: [/CFLAG:360\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5191',
        any: [/IF\ SELECTCOM\ ==\ 125/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5193',
        any: [/IF\ CFLAG:TARGET:361\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5195',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5196',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5197',
        any: [
          /PRINTFORMW\ 「哈啊%UNICODE\(0x2661\)\ \*1%\ 嗯呜\~…啾呼呜\~%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…大鸡巴…好吃%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5199',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5200',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5201',
        any: [
          /PRINTFORMW\ 「嗯哈啊%UNICODE\(0x2661\)\ \*1%…一边吸着一边自慰什么的…真是下流呢\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5203',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5204',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同命令的那样一边口交一边自慰起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5205',
        any: [
          /PRINTFORMW\ 「嗯唔嗯\~\~…嗯啾\~…啾呜\~…啊\~…哈啊…哈啊…%SAVESTR:TARGET%明，明白了…%SAVESTR:TARGET%会好好地…一边口交…一边自慰的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5208',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同命令的那样一边口交一边自慰起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5209',
        any: [
          /PRINTFORMW\ 「嗯唔嗯\~\~…嗯啾\~…啾呜\~…啊\~…哈啊…哈啊…%SAVESTR:TARGET%明，明白了…%SAVESTR:TARGET%会好好地…一边口交…一边自慰的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5211',
        any: [/CFLAG:TARGET:361\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5216',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:361\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5217',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5218',
        any: [
          /PRINTFORMW\ 「哈啊%UNICODE\(0x2661\)\ \*1%\ 嗯呜\~…啾呼呜\~%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…大鸡巴…好吃%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5219',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像很兴奋地一样流着口水、如同为了弄出声音一样爱抚着自己的蜜穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5220',
        any: [/CFLAG:361\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5222',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:361\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5223',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5224',
        any: [
          /PRINTFORMW\ 「嗯哈啊%UNICODE\(0x2661\)\ \*1%…一边吸着一边自慰什么的…真是下流呢\~…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5225',
        any: [
          /PRINTFORMW\ 「但是、%SELF_CALL\(TARGET,\ 1\)%…为了%SAVESTR:PLAYER%大人的话…不管怎样H而下流的事情都会做的…嗯啊啊\~…哈呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5226',
        any: [/CFLAG:361\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5228',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:361\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5229',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同命令的那样一边口交一边自慰起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5230',
        any: [
          /PRINTFORMW\ 「嗯唔嗯\~\~…嗯啾\~…啾呜\~…啊\~…哈啊…哈啊…%SAVESTR:TARGET%明，明白了…%SAVESTR:TARGET%会好好地…一边口交…一边自慰的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5231',
        any: [/CFLAG:361\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5233',
        any: [/ELSEIF\ CFLAG:361\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5234',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%如同命令的那样一边口交一边自慰起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5235',
        any: [
          /PRINTFORMW\ 「嗯唔嗯\~\~…嗯啾\~…啾呜\~…啊\~…哈啊…哈啊…%SAVESTR:TARGET%明，明白了…%SAVESTR:TARGET%会好好地…一边口交…一边自慰的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5236',
        any: [/CFLAG:361\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5245',
        any: [/IF\ SELECTCOM\ ==\ 126/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5247',
        any: [/IF\ CFLAG:TARGET:362\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5249',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5250',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5251',
        any: [
          /PRINTFORMW\ 「嗯\~嗯呜\~%UNICODE\(0x2661\)\ \*1%啾\~…啾呜\~…呸咯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5253',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5254',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用湿润的眼睛盯着%SAVESTR:PLAYER%看、将龟头含入口中后，用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5255',
        any: [
          /PRINTFORMW\ 「嗯\~嗯呜\~%UNICODE\(0x2661\)\ \*1%啾\~…啾呜\~…呸咯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5257',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5258',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将龟头含入了口中、用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5259',
        any: [
          /PRINTFORMW\ 「嗯啾\~…啾\~呸咯\~…嗯哼唔\~…啊啊\~…大鸡巴好烫啊…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5262',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将龟头含入了口中、用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5264',
        any: [/CFLAG:TARGET:362\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5269',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:362\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5270',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5271',
        any: [
          /PRINTFORMW\ 「嗯\~嗯呜\~%UNICODE\(0x2661\)\ \*1%啾\~…啾呜\~…呸咯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5272',
        any: [
          /PRINTFORMW\ 「怎么样呀\~？大鸡巴被套弄着…是不是很舒服呀\~？%SELF_CALL\(TARGET\)%…手还有嘴巴都变得好烫了…感觉整个人都要不行了\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5273',
        any: [/CFLAG:362\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5275',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:362\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5276',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用湿润的眼睛盯着%SAVESTR:PLAYER%看、将龟头含入口中后，用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5277',
        any: [
          /PRINTFORMW\ 「嗯\~嗯呜\~%UNICODE\(0x2661\)\ \*1%啾\~…啾呜\~…呸咯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5278',
        any: [
          /PRINTFORMW\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ %SAVESTR:TARGET%会更加地…更加地侍奉大鸡巴的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5279',
        any: [/CFLAG:362\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5281',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:362\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5282',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将龟头含入了口中、用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5283',
        any: [
          /PRINTFORMW\ 「嗯啾\~…啾\~呸咯\~…嗯呜嗯\~…啊啊\~…啊啊\~…大鸡巴好烫啊\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5284',
        any: [/CFLAG:362\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5286',
        any: [/ELSEIF\ CFLAG:362\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5287',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将龟头含入了口中、用双手套弄起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5288',
        any: [
          /PRINTFORMW\ 「嗯啾\~…啾\~呸咯\~…嗯呜嗯\~…啊啊\~……这样的…嗯\~……啾呜\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5289',
        any: [/CFLAG:362\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5299',
        any: [/IF\ SELECTCOM\ ==\ 127/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5301',
        any: [/IF\ CFLAG:TARGET:363\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5303',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5304',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5305',
        any: [
          /PRINTFORMW\ 「啾唔嗯\~\~\~%UNICODE\(0x2661\)\ \*1%…恩呼嗯\~…啾呜\~%UNICODE\(0x2661\)\ \*1%…啾呜嗯\~呜呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5307',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5308',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5309',
        any: [
          /PRINTFORMW\ 「啾唔嗯\~\~\~%UNICODE\(0x2661\)\ \*1%…恩呼嗯\~…啾呜\~%UNICODE\(0x2661\)\ \*1%…啾呜嗯\~呜呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5311',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5312',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5313',
        any: [
          /PRINTFORMW\ 「嗯啾呜\~…呜嗯\~…啾噜嗯\~啾唔哼\~…嗯啾呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5316',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5317',
        any: [
          /PRINTFORMW\ 「嗯啾呜\~…呜嗯\~…啾噜嗯\~啾唔哼\~…嗯啾呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5319',
        any: [/CFLAG:TARGET:363\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5324',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5325',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5326',
        any: [
          /PRINTFORMW\ 「啾唔嗯\~\~\~%UNICODE\(0x2661\)\ \*1%…恩呼嗯\~…啾呜\~%UNICODE\(0x2661\)\ \*1%…啾呜嗯\~呜呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5327',
        any: [
          /PRINTFORMW\ 「嗯唔呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 啾呜\~…啾噜呜嗯\~\~…%UNICODE\(0x2661\)\ \*1%\ 精液\~…%SAVESTR:TARGET%会全部吸出来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5328',
        any: [/CFLAG:363\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5330',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5331',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5332',
        any: [
          /PRINTFORMW\ 「啾呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 啾嗯啾呜\~\~%UNICODE\(0x2661\)\ \*1%\ 唔呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 啾啾\~…啾呜呜呜\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5333',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%\ 精液\~…%SAVESTR:TARGET%会全部吸出来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5334',
        any: [/CFLAG:363\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5336',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:363\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5337',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5338',
        any: [
          /PRINTFORMW\ 「嗯啾呜\~…呜嗯\~…啾噜嗯\~啾唔哼\~…嗯啾呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5339',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…精液\~…会全部吸出来的\~…唔哼哼\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5340',
        any: [/CFLAG:363\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5342',
        any: [/ELSEIF\ CFLAG:363\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5343',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5344',
        any: [
          /PRINTFORMW\ 「嗯啾呜\~…呜嗯\~…啾噜嗯\~啾唔哼\~…嗯啾呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5345',
        any: [/CFLAG:363\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5354',
        any: [/IF\ SELECTCOM\ ==\ 69/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5356',
        any: [/IF\ CFLAG:TARGET:364\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5358',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5359',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5360',
        any: [
          /PRINTFORMW\ 「嗯啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 做恶作剧…可是不行的噢\~%UNICODE\(0x2661\)\ \*1%\ 让%SAVESTR:TARGET%更加吮吸大鸡巴吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5362',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5363',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%一边忍耐着蜜穴带来的快感一边吮吸着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5364',
        any: [
          /PRINTFORMW\ 「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5366',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5367',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%因为蜜穴带来的快感而娇喘连连。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5368',
        any: [
          /PRINTFORMW\ 「嗯哈呜嗯\~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀\~…哈嗯呀呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5371',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%摇晃屁股来忍耐着蜜穴带来的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5372',
        any: [/PRINTFORMW\ 「嗯…要、要不行了啊…请原谅%SAVESTR:TARGET%吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5374',
        any: [/CFLAG:TARGET:364\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5379',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:364\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5380',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5381',
        any: [
          /PRINTFORMW\ 「嗯啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 恶作剧…可是不行的噢\~%UNICODE\(0x2661\)\ \*1%\ 让%SAVESTR:TARGET%更加吮吸大鸡巴吧\~%UNICODE\(0x2661\)\ \*3%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5382',
        any: [
          /PRINTFORMW\ 「嗯哼嗯\~%UNICODE\(0x2661\)\ \*1%\ 啾噜啾噜%UNICODE\(0x2661\)\ \*1%啾噜\~…呸咯\~…嗯呜嗯\~嗯\~嗯嗯嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5383',
        any: [/CFLAG:364\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5385',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:364\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5386',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%一边忍耐着蜜穴带来的快感一边吮吸着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5387',
        any: [
          /PRINTFORMW\ 「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5388',
        any: [
          /PRINTFORMW\ 「真是…真是坏呢\~%UNICODE\(0x2661\)\ \*1%…啾噜噜%UNICODE\(0x2661\)\ \*1%\ 啾呜\~…呸咯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5389',
        any: [/CFLAG:364\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5391',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:364\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5392',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%因为蜜穴带来的快感而娇喘连连。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5393',
        any: [
          /PRINTFORMW\ 「嗯哈呜嗯\~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀\~…哈嗯呀呜\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5394',
        any: [/CFLAG:364\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5396',
        any: [/ELSEIF\ CFLAG:364\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5397',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:PLAYER%互相贪婪地用嘴巴舔着对方的股间。%SAVESTR:TARGET%摇晃屁股来忍耐着蜜穴带来的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5398',
        any: [/PRINTFORMW\ 「嗯…要、要不行了啊…请原谅%SAVESTR:TARGET%吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5399',
        any: [/CFLAG:364\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5408',
        any: [/IF\ SELECTCOM\ ==\ 124/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5410',
        any: [/IF\ CFLAG:TARGET:365\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5412',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5413',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5414',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~%UNICODE\(0x2661\)\ \*1%…恩呼嗯\~…嗯\~嗯嗯嗯\~%UNICODE\(0x2661\)\ \*1%…呜哈啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5416',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5417',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5418',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 嗯啾噜嗯\~%UNICODE\(0x2661\)\ \*1%\ 唔呜啊嘛\~%UNICODE\(0x2661\)\ \*1%\ 啾呜\~\~\~…啾噜呜呜呜呜\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5420',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5421',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5422',
        any: [
          /PRINTFORMW\ 「嗯呜\~！？嗯\~…嗯噗\~…嗯嗯\~…嗯呜嗯\~…嗯\~嗯\~嗯呜呜呜呜呜！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5425',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5426',
        any: [
          /PRINTFORMW\ 「嗯呜\~！？嗯\~…嗯噗\~…嗯嗯\~…嗯呜呃\~……嗯\~嗯\~嗯嗯嗯嗯嗯\~～～！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5428',
        any: [/CFLAG:TARGET:365\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5433',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5434',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5435',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~%UNICODE\(0x2661\)\ \*1%…恩呼嗯\~…嗯\~嗯嗯嗯\~%UNICODE\(0x2661\)\ \*1%…呜哈啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5436',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的嘴巴是…大鸡巴专用通道来的%UNICODE\(0x2661\)\ \*1%\ 嗯呜嗯哈啊\~…嗯\~嗯\~嗯嗯\~\~～%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5437',
        any: [/CFLAG:365\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5439',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:363\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5440',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5441',
        any: [
          /PRINTFORMW\ 「嗯呜嗯\~%UNICODE\(0x2661\)\ \*1%\ 嗯啾噜嗯\~%UNICODE\(0x2661\)\ \*1%\ 唔呜啊嘛\~%UNICODE\(0x2661\)\ \*1%\ 啾呜\~\~\~…啾噜呜呜呜呜\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5442',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%\ 不行的啊\~…因为大鸡巴的味道…脑袋…要变得奇怪起来了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5443',
        any: [/CFLAG:365\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5445',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:363\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5446',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5447',
        any: [
          /PRINTFORMW\ 「嗯呜\~！？嗯\~…嗯噗\~…嗯嗯\~…嗯呜呃\~…嗯\~！嗯\~！嗯呜呜呜呜\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5448',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~…不由自主地塞到了喉咙深处去了呢…呜呼呼\~、更多地帮您做吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5449',
        any: [/CFLAG:365\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5451',
        any: [/ELSEIF\ CFLAG:363\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5452',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5453',
        any: [
          /PRINTFORMW\ 「嗯呜\~！？嗯\~…嗯噗\~…嗯嗯\~…嗯呜呃\~…嗯\~嗯\~嗯嗯嗯嗯嗯\~～～～～！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5454',
        any: [/CFLAG:365\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5464',
        any: [/IF\ SELECTCOM\ ==\ 80/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5466',
        any: [/IF\ CFLAG:TARGET:381\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5468',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5469',
        any: [
          /PRINTFORMW\ 「嗯哼呜\~%UNICODE\(0x2661\)\ \*1%\ 嗯呜\~%UNICODE\(0x2661\)\ \*1%\ 嗯呼\~…嗯呜呜\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5470',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5472',
        any: [/ELSEIF\ ABL:TARGET:16\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5473',
        any: [
          /PRINTFORMW\ 「嗯呼呜\~…嗯哼\~…呜噗嗯\~\~…嗯噗呜\~…嗯\~嗯\~嗯\~\~嗯嗯嗯\~\~～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5474',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%的嘴巴就被这样侵犯着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5477',
        any: [/PRINTFORMW\ 「嗯\~…嗯噗\~…噗哈呜\~…原、原谅我…嗯呜噗\~！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5478',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为喉咙的深处被抽插着流下眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5480',
        any: [/CFLAG:TARGET:381\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5485',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:381\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5486',
        any: [
          /PRINTFORMW\ 「嗯呼\~%UNICODE\(0x2661\)\ \*1%\ 恩噗呜\~%UNICODE\(0x2661\)\ \*1%\ 嗯嗯呜\~…恩噗呜嗯嗯\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5487',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5488',
        any: [
          /PRINTFORMW\ 「噗啊\~\~%UNICODE\(0x2661\)\ \*1%…非常感谢主人…噗嗯啊\~…使用这个主人专用的嘴巴小穴\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5489',
        any: [/CFLAG:381\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5491',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:TARGET:16\ >=\ 5\ \&\&\ \(CFLAG:381\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5492',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…嗯呜\~…嗯噗嗯\~…恩噗呜嗯\~…嗯\~嗯\~嗯\~嗯嗯嗯\~～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5493',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%喉咙深处被抽插着、就这样被侵犯着嘴巴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5494',
        any: [
          /PRINTFORMW\ 「啊哈啊\~%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%的嘴巴\~…已经变成小穴了…嘴巴小穴\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5495',
        any: [/CFLAG:381\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5497',
        any: [
          /ELSEIF\ ABL:TARGET:16\ >=\ 3\ \&\&\ \(CFLAG:381\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5498',
        any: [
          /PRINTFORMW\ 「嗯哼唔\~…嗯呜\~…噗嗯哈啊\~…嗯噗呜啊\~…嗯\~嗯\~嗯\~嗯嗯嗯\~～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5499',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%喉咙深处被抽插着、就这样被侵犯着嘴巴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5500',
        any: [
          /PRINTFORMW\ 「啊嗯\~啊嗯啊\~…没，没关系的\~…请更多地使用%SAVESTR:TARGET%的嘴巴吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5501',
        any: [/CFLAG:381\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5503',
        any: [/ELSEIF\ CFLAG:381\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5504',
        any: [
          /PRINTFORMW\ 「嗯\~…嗯呜\~…噗呜啊…喉咙…喉咙好辛苦啊…原、原谅…嗯呜\~…嗯\~！呜呼呜呜呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5505',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为喉咙的深处被抽插着流下眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5506',
        any: [/CFLAG:381\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5517',
        any: [/IF\ SELECTCOM\ ==\ 87/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5520',
        any: [/IF\ CFLAG:TARGET:348\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5522',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5523',
        any: [/PRINTFORM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5525',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5527',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5528',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为第一次在皮肤上开洞而发出了悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5530',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5531',
        any: [
          /PRINTFORMW\ 「啊啊…好漂亮的乳环啊\~…乳头已经勃起地那么厉害了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5532',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%轻轻地摇动着胸部。乳环微微地闪着微光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5534',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5535',
        any: [/PRINTFORMW\ 「哈啊…啊啊…真是好棒的礼物呢…好高兴啊\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5536',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着肚脐的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5538',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5539',
        any: [
          /PRINTFORMW\ 「啊\~…嗯\~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5540',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为阴唇环的刺穿而发情起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5542',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5543',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5544',
        any: [
          /PRINTFORMW\ 「啊哈\~…啊啊啊\~…被做了那么棒的事情后…要忍不住了啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5545',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴茎被打环后、露出了恍惚的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5547',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%已经…只能想到…SEX的事情而已了啊\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5548',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂被打孔后、露出了恍惚的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5551',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5552',
        any: [
          /PRINTFORMW\ 「嗯呜\~…%SELF_CALL\(TARGET\)%会用这条变漂亮的舌头更多地侍奉魔王大人的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5553',
        any: [
          /PRINTFORMW\ %SELF_CALL\(TARGET\)%就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5555',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5556',
        any: [/PRINTFORMW\ 「嗯哼嗯\~…适不适合呀\~\~\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5557',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%舔着自己的唇确认唇环的存在………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5559',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5560',
        any: [/PRINTFORMW\ 「嗯哼哼\~…真是个漂亮的鼻环呢\~\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5561',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%不停地擦拭着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5565',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着拿掉环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5568',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5570',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5571',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为第一次在皮肤上开洞而发出了小声的悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5573',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5574',
        any: [
          /PRINTFORMW\ 「啊…啊啊…居然将那么棒的东西送给%SELF_CALL\(TARGET\)%乳头…啊…啊啊…太有感觉了啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5575',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%两个乳头都勃起来了、结果让乳环一闪一闪的地发着光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5577',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5578',
        any: [
          /PRINTFORMW\ 「大人您给予得礼物…%SELF_CALL\(TARGET\)%会好好对待下来的\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5579',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着肚脐的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5581',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5582',
        any: [
          /PRINTFORMW\ 「啊啊…爱液要…漏出来了啊\~…太、太有感觉了啊\~\~…啊啊…啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5583',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5585',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5586',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5587',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…小鸡鸡…变得好奇怪了…%SELF_CALL\(TARGET\)%的小鸡鸡…啊、啊啊啊\~～%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5588',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴茎被打上了环、脸颊变得通红起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5590',
        any: [
          /PRINTFORMW\ 「不，不行的啊\~\~\~…被做这样的事情的话%SELF_CALL\(TARGET\)%…已经…变得淫乱起来了啊…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5591',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴蒂被打上了环、脸颊变得通红起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5594',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5595',
        any: [/PRINTFORMW\ 「哈啊…哈啊…好像已经固定好了呢…啊…啊啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5596',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%抓住了%SAVESTR:TARGET%的舌头、检查着舌环的状况………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5598',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5599',
        any: [
          /PRINTFORMW\ 「呐\~…%SAVESTR:TARGET%担心有没有好好地固定住呢…所以请用kiss来测试一下吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5600',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%舔了一下唇环确定了后、向%SAVESTR:PLAYER%撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5602',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5603',
        any: [
          /PRINTFORMW\ 「………因为是主人给予的礼物来的…%SAVESTR:TARGET%会好好珍惜的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5604',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%擦拭着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5608',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似有点伤心地抚摸着被拿掉环后的痕迹………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5613',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5614',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为第一次皮肤上开洞而发出了悲鸣、留下了眼泪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5616',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5617',
        any: [
          /PRINTFORMW\ 「不要…不要啊…不要…对乳头做那么过分的事情…呜\~呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5618',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为乳环带来的强烈疼痛而留下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5620',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5621',
        any: [/PRINTFORMW\ 「居，居然在这种地方穿环什么的…真、真是羞耻啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5622',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5624',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5625',
        any: [
          /PRINTFORMW\ 「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊\~…嗯\~…呜啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5626',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴唇穿上了环而哗啦啦地流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5628',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5629',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5630',
        any: [/PRINTFORMW\ 「已，已经…嫁不出去了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5631',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5633',
        any: [
          /PRINTFORMW\ 「拜，拜托了…什么都会做的…请将…环拿掉吧…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…要变奇怪了啊…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5634',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5637',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5638',
        any: [/PRINTFORMW\ 「不要…呸呜咯…请呼要拉胡来呜\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5639',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的舌头抓住、确定着舌环………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5641',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5642',
        any: [
          /PRINTFORMW\ 「呜呜\~…居然%SELF_CALL\(TARGET\)%的嘴唇上打上了这种东西………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5643',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5645',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5646',
        any: [
          /PRINTFORMW\ 「居然对%SELF_CALL\(TARGET\)%…对%SELF_CALL\(TARGET\)%做出屈辱的事情………呜呜呜\~\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5647',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5651',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%擦拭着拿掉环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5654',
        any: [/CFLAG:TARGET:348\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5659',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5660',
        any: [/PRINTFORM/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5662',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5664',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5666',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5667',
        any: [
          /PRINTFORMW\ 「啊啊…好漂亮的乳环啊\~…乳头已经勃起地那么厉害了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5668',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%轻轻地摇动着胸部。乳环微微地闪着微光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5670',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5671',
        any: [/PRINTFORMW\ 「哈啊…啊啊…真是好棒的礼物呢…好高兴啊\~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5672',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着肚脐的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5674',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5675',
        any: [
          /PRINTFORMW\ 「啊\~…嗯\~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5676',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为阴唇环的刺穿而发情起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5678',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5679',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5680',
        any: [
          /PRINTFORMW\ 「啊哈\~…啊啊啊\~…被做了那么棒的事情后…要忍不住了啊\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5681',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴茎被打环后、露出了恍惚的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5683',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%已经…只能想到…SEX的事情而已了啊\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5684',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂被打孔后、露出了恍惚的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5687',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5688',
        any: [
          /PRINTFORMW\ 「嗯呜\~…%SELF_CALL\(TARGET\)%会用这条变漂亮的舌头更多地侍奉魔王大人的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5689',
        any: [
          /PRINTFORMW\ %SELF_CALL\(TARGET\)%就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5691',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5692',
        any: [/PRINTFORMW\ 「嗯哼嗯\~…适不适合呀\~\~\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5693',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%舔着自己的唇确认唇环的存在………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5695',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5696',
        any: [/PRINTFORMW\ 「嗯哼哼\~…真是个漂亮的鼻环呢\~\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5697',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%不停地擦拭着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5701',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着拿掉环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5703',
        any: [/CFLAG:348\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5705',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:348\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5707',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5709',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5710',
        any: [
          /PRINTFORMW\ 「啊…啊啊…居然将那么棒的东西送给%SELF_CALL\(TARGET\)%乳头…啊…啊啊…太有感觉了啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5711',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%两个乳头都勃起来了、结果让乳环一闪一闪的地发着光/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5713',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5714',
        any: [
          /PRINTFORMW\ 「大人您给予得礼物…%SELF_CALL\(TARGET\)%会好好对待下来的\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5715',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抚摸着肚脐的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5717',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5718',
        any: [
          /PRINTFORMW\ 「啊啊…爱液要…漏出来了啊\~…太、太有感觉了啊\~\~…啊啊…啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5719',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5721',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5722',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5723',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…小鸡鸡…变得好奇怪了…%SELF_CALL\(TARGET\)%的小鸡鸡…啊、啊啊啊\~～%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5724',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴茎被打上了环、脸颊变得通红起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5726',
        any: [
          /PRINTFORMW\ 「不，不行的啊\~\~\~…被做这样的事情的话%SELF_CALL\(TARGET\)%…已经…变得淫乱起来了啊…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5727',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴蒂被打上了环、脸颊变得通红起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5730',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5731',
        any: [/PRINTFORMW\ 「哈啊…哈啊…好像已经固定好了呢…啊…啊啊\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5732',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的舌头抓住、确定着舌环………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5734',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5735',
        any: [
          /PRINTFORMW\ 「呐\~…%SAVESTR:TARGET%担心有没有好好地固定住呢…所以请用kiss来测试一下吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5736',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%舔了一下唇环确定了后、向%SAVESTR:PLAYER%撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5738',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5739',
        any: [
          /PRINTFORMW\ 「………因为是主人给予的礼物来的…%SAVESTR:TARGET%会好好珍惜的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5740',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%擦拭着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5744',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似有点伤心地抚摸着被拿掉环后的痕迹\.………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5746',
        any: [/CFLAG:348\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5748',
        any: [/ELSEIF\ CFLAG:348\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5750',
        any: [/IF\ CFLAG:7\ \&\ P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5752',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5753',
        any: [
          /PRINTFORMW\ 「不要…不要啊…不要…对乳头做那么过分的事情…呜\~呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5754',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为乳环带来的强烈疼痛而留下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5756',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5757',
        any: [/PRINTFORMW\ 「居，居然在这种地方穿环什么的…真、真是羞耻啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5758',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5760',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5761',
        any: [
          /PRINTFORMW\ 「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊\~…嗯\~…呜啊\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5762',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为阴唇穿上了环而哗啦啦地流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5764',
        any: [/ELSEIF\ P\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5765',
        any: [/IF\ TALENT:121\ \|\|\ TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5766',
        any: [/PRINTFORMW\ 「已，已经…嫁不出去了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5767',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5769',
        any: [
          /PRINTFORMW\ 「拜，拜托了…什么都会做的…请将…环拿掉吧…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…要变奇怪了啊…啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5770',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5773',
        any: [/ELSEIF\ P\ ==\ 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5774',
        any: [/PRINTFORMW\ 「不要…呸呜咯…请呼要拉胡来呜\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5775',
        any: [
          /PRINTFORMW\ %SAVESTR:PLAYER%将%SAVESTR:TARGET%的舌头抓住、确定着舌环………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5777',
        any: [/ELSEIF\ P\ ==\ 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5778',
        any: [
          /PRINTFORMW\ 「呜呜\~…居然%SELF_CALL\(TARGET\)%的嘴唇上打上了这种东西………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5779',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5781',
        any: [/ELSEIF\ P\ ==\ 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5782',
        any: [
          /PRINTFORMW\ 「居然对%SELF_CALL\(TARGET\)%…对%SELF_CALL\(TARGET\)%做出屈辱的事情………呜呜呜\~\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5783',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5787',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%擦拭着拿掉环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5789',
        any: [/CFLAG:348\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '95',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '790',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '104',
        any: [/IF\ CFLAG:201\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '107',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '109',
        any: [/IF\ FLAG:87\ >=\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '110',
        any: [
          /PRINTFORMW\ 「就算…就算%SELF_CALL\(TARGET\)%的国家覆灭了也好…也不会向你这种家伙屈服呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '111',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%哪怕知道自己的国家被你占领了也好，也没有崩溃掉，保持着毅然的态度。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '112',
        any: [
          /PRINTFORMW\ 「而且…最重要的是%SELF_CALL\(TARGET\)%才不是什么为了成为你的慰安妇的玩具来的…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '113',
        any: [
          /PRINTFORMW\ 但是，你十分清楚%SAVESTR:TARGET%进到牢笼里的时候，因为恐惧和悲伤而哭着颤抖着身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '115',
        any: [/PRINTFORMW\ 「！请不要触碰%SELF_CALL\(TARGET\)%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '116',
        any: [/PRINTFORMW\ 「以为%SELF_CALL\(TARGET\)%是谁来的啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '117',
        any: [
          /PRINTFORMW\ 「对被称为精灵族的姬勇士的%SAVESTR:TARGET%来说………」/,
        ],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '118', any: [/PRINTL/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '119',
        any: [/PRINTFORMW\ 「…………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '120',
        any: [
          /PRINTFORMW\ 「是啊…你就是魔王…哼哼、以为这样就能让%SELF_CALL\(TARGET\)%怎么样了吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '121',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%无畏的笑着，哪怕在败北的时候被俘也好………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '123',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '125',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '126',
        any: [
          /PRINTFORMW\ 「哼\~…快点将%SELF_CALL\(TARGET\)%放开，这样至少会让你轻松一点死掉呢。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '127',
        any: [
          /PRINTFORMW\ 人狼的%SAVESTR:TARGET%哪怕被抓住也表现出了一脸有余裕的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '128',
        any: [
          /PRINTFORMW\ 看来对于自身的肉体强韧有着很大的自信啊…不过，很快就会明白这种事情在这里没有意义的吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '129',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '131',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '132',
        any: [
          /PRINTFORMW\ 「呼哼…被这样抓到的还是第一次来着…跟你这种下贱的东西做对手还是让人兴趣缺缺啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '133',
        any: [/PRINTFORMW\ 吸血鬼的%SAVESTR:TARGET%冷冷地看着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '134',
        any: [/PRINTFORMW\ 「快点将%SELF_CALL\(TARGET\)%放开呐」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '135',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '137',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '138',
        any: [/PRINTFORMW\ 「原谅什么的…怎样哭喊求饶你才会原谅呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '139',
        any: [/PRINTFORMW\ 作为无头骑士的%SAVESTR:TARGET%比想象地还要冷静。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '140',
        any: [/PRINTFORMW\ （看着吧…肯定会找到机会逃出这里的………）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '141',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '143',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '144',
        any: [
          /PRINTFORMW\ 「呃…要不是力量被封印住的话，像你这种家伙一瞬间就会消失了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '145',
        any: [/PRINTFORMW\ 龙少女的%SAVESTR:TARGET%用憎恨的眼神瞪着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '146',
        any: [
          /PRINTFORMW\ 「对于将%SELF_CALL\(TARGET\)%关在这种地方的事情，必定会让你后悔的！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '147',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '149',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '150',
        any: [
          /PRINTFORMW\ 「呃…不管怎样对待%SELF_CALL\(TARGET\)%都好、%SELF_CALL\(TARGET\)%也不会屈服的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '151',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的身体可是伟大的父亲的东西来的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '152',
        any: [
          /PRINTFORMW\ 作为天使的%SAVESTR:TARGET%哪怕力量被封印了也没有改变态度………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '153',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '155',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '156',
        any: [
          /PRINTFORMW\ 「骗…骗人…%SELF_CALL\(TARGET\)%居然…居然变成了如此污秽的魔族了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '157',
        any: [
          /PRINTFORMW\ 看来%SAVESTR:TARGET%还没有被改造成为魔族，成为魔族其中一员的自觉啊。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '158',
        any: [
          /PRINTFORMW\ 沉浸在震惊和悲伤的%SAVESTR:TARGET%注意到你的存在后用魔族的眼睛瞪向了你。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '159',
        any: [/PRINTFORMW\ 「绝对…绝对不会原谅你的…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '160',
        any: [
          /PRINTFORMW\ 还以为成为了魔族就会安分下来了、看来会变得更加有趣起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '161',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '163',
        any: [/CFLAG:370\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '165',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '166',
        any: [/PRINTFORMW\ 「快点将%SELF_CALL\(TARGET\)%放开！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '167',
        any: [
          /PRINTFORMW\ 哪怕跟霍比特人一样小的身体、%SAVESTR:TARGET%强势的态度也没有改变………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '168',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '170',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '171',
        any: [
          /PRINTFORMW\ 「将%SELF_CALL\(TARGET\)%放了的话可是会有赎金的噢！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '172',
        any: [
          /PRINTFORMW\ 这样的提案你对此嗤之以鼻、向着作为矮人的%SAVESTR:TARGET%慢慢地靠近了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '173',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '176',
        any: [/PRINTFORMW\ 「这种事情…不可能…不可能来的啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '177',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被扔进了这辈子都没有考虑过的恶劣环境里、歇斯底里地哭喊着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '178',
        any: [
          /PRINTFORMW\ 看来得从头教育一下，在这种活着是怎样的一件事情来着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '180',
        any: [/CFLAG:201\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '181',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '185',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 5\ \&\&\ CFLAG:370\ ==\ 0\ \&\&\ TALENT:TARGET:314\ ==\ 9\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '186',
        any: [
          /PRINTFORMW\ 「哪怕被改造成这种样子也好…还不能自我了断什么的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '187',
        any: [
          /PRINTFORMW\ 按照你所希望的那样，%SAVESTR:TARGET%被改造成了魔族，成为了魔族的新的一员了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '188',
        any: [
          /PRINTFORMW\ 哪怕无法相信般幸运地逃到地面上了也好，她也不会被人类社会而接纳了吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '189',
        any: [/PRINTFORMW\ 「不，不要过来这边…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '191',
        any: [
          /PRINTFORMW\ 「不要…不要再将%SELF_CALL\(TARGET\)%当成玩具了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '193',
        any: [/CFLAG:370\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '194',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '199',
        any: [/ELSEIF\ CFLAG:201\ >=\ 1\ \&\&\ CFLAG:650\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '200',
        any: [/IF\ TALENT:85\ \|\|\ TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '202',
        any: [
          /PRINTFORMW\ 看到那个水晶球的事情告诉了%SAVESTR:TARGET%后，%SAVESTR:TARGET%的脸色就变了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '203',
        any: [
          /PRINTFORMW\ 「啊啊…魔王大人…请…请原谅%SAVESTR:TARGET%………那个时候是…是没有办法的事情来得………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '204',
        any: [
          /PRINTFORMW\ 「让%SELF_CALL\(TARGET\)%做任何事情补偿都可以…所以…所以请原谅不贞的%SELF_CALL\(TARGET\)%吧…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '206',
        any: [/CFLAG:650\ =\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '209',
        any: [
          /PRINTFORMW\ 「又再抓回来调教什么的…对于背叛者赐予死刑不好吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '210',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%讽刺般笑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '212',
        any: [/CFLAG:650\ =\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '214',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '219',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 2\ \&\&\ MARK:2\ ==\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '222',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '223',
        any: [/PRINTFORMW\ 「哼\~、这种程度的事情%SELF_CALL\(TARGET\)%才…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '224',
        any: [
          /PRINTFORMW\ 哪怕坐在地板上%SAVESTR:TARGET%反抗的态度也可见一斑………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '227',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%不要再触碰我了！…无礼之徒！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '228',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%哪怕身体颤抖着也用毅然的态度目不转睛地盯着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '230',
        any: [/CFLAG:201\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '231',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '234',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 3\ \&\&\ MARK:2\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '237',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '238',
        any: [
          /PRINTFORMW\ 「呃…%SELF_CALL_FIRST\(TARGET\)%、请不要触碰%SELF_CALL\(TARGET\)%………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '239',
        any: [
          /PRINTFORMW\ 虽然说着强势的台词，但是%SAVESTR:TARGET%胆怯地看着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '242',
        any: [/PRINTFORMW\ 「不会认输…才不会认输呐…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '243',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%趴在了地板上，但是哪怕这样还是没有屈服的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '245',
        any: [/CFLAG:201\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '246',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '249',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 4\ \&\&\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '252',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '253',
        any: [
          /PRINTFORMW\ 「不，不要靠近过来…不要对%SELF_CALL\(TARGET\)%…做残酷的事情…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '254',
        any: [/PRINTFORMW\ 「拜托了…请…不要做残酷的事情………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '255',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%瘫倒在了地板上，因为恐怖而颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '258',
        any: [/PRINTFORMW\ 「已经…输掉了…也没关系了吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '259',
        any: [/PRINTFORMW\ 恍惚的%SAVESTR:TARGET%这样喃喃自语着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '261',
        any: [/CFLAG:201\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '262',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '265',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 5\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 1\ \&\&\ TALENT:TARGET:314\ !=\ 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '268',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '269',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%在冰冷的地板上正坐着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '270',
        any: [/PRINTFORMW\ 「主人\~…那个…那个…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '271',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的眼神飘忽不定，拼命地想要说出话来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '272',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%想…想要…主人、主人的、大、大鸡巴…请主人赏，赏赐…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '273',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%咕噜地吞了一口口水、眼睛盯着%SAVESTR:PLAYER%的股间。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '274',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是…没有主人的大鸡巴的话…就无法活下…可怜而淫乱的精灵来的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '275',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%的双目慢慢地失去了理性的光芒。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '276',
        any: [/PRINTFORMW\ 「请…怜悯…怜悯一下吧\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '277',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一边说着一边土下座，%SAVESTR:TARGET%的屁股正淫乱地左右摇晃着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '280',
        any: [/PRINTFORMW\ 「啊啊嗯\~…主人哈嗯\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '281',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%露出了可爱的笑容像你抱了过来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '282',
        any: [
          /PRINTFORMW\ 「怎么都…怎么都忍不住呐…请对%SELF_CALL\(TARGET\)%淫靡而下流的身体…赐予调教吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '283',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%露出了虽然淫乱却还残留着高贵的样子像你撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '285',
        any: [/CFLAG:201\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '286',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '289',
        any: [
          /ELSEIF\ TALENT:TARGET:314\ ==\ 9\ \&\&\ CFLAG:201\ <\ 6\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '292',
        any: [/IF\ CFLAG:370\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '293',
        any: [
          /PRINTFORMW\ 「啊啊\~…从以前就开始想了\~…魔王大人的味道闻起来怎么那么好啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '294',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%魔族的瞳孔湿润了起来、也不隐藏自己在发情的这件事情向你走了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '295',
        any: [
          /PRINTFORMW\ 「侍奉…请让%SELF_CALL\(TARGET\)%来侍奉吧…%UNICODE\(0x2661\)\ \*1%\ 想要给魔王大人的身体好好地侍奉呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '296',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%依偎在你的身上，在你的耳朵，脖子，胸口等地方降下了亲吻之雨。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '297',
        any: [
          /PRINTFORMW\ 「啊啊\~…已经忍不住了呀\~…%UNICODE\(0x2661\)\ \*1%\ 大鸡巴、想要大鸡巴\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '298',
        any: [
          /PRINTFORMW\ 看着完全堕落了的%SAVESTR:TARGET%、你如同鄙视地一般朝她笑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '299',
        any: [
          /PRINTFORMW\ 「啊哈嗯\~…请不要用这种眼神看着\~…%SELF_CALL\(TARGET\)%只是…想要大鸡巴而已嘛…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '300',
        any: [/CFLAG:201\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '301',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '303',
        any: [/ELSEIF\ CFLAG:370\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '304',
        any: [
          /PRINTFORMW\ 「最近，给魔王大人侍奉的时候…心里感觉特别地安定呢…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '305',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%魔族的瞳孔湿润了起来、靠向了你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '306',
        any: [
          /PRINTFORMW\ 「啊啊\~…不行了…已经离不开魔王大人的身边了…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '307',
        any: [
          /PRINTFORMW\ 轻轻依偎在%NAME:MASTER%的身边后用手掌温柔地抚摸起了%NAME:MASTER%的身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '308',
        any: [
          /PRINTFORMW\ 「请让我…更多侍奉吧…%UNICODE\(0x2661\)\ \*1%\ 请将…%SELF_CALL\(TARGET\)%弄脏吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '309',
        any: [
          /PRINTFORMW\ 完全堕落的%SAVESTR:TARGET%嘴边流下了唾液向你撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '310',
        any: [/CFLAG:201\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '311',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '314',
        any: [
          /PRINTFORMW\ 「啊哈呜\~…%UNICODE\(0x2661\)\ \*1%\ 成为魔族原来是这样的感觉啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '315',
        any: [
          /PRINTFORMW\ 你一来到%SAVESTR:TARGET%的表情就变得H了起来、好像立马就会从嘴边流下口水了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '316',
        any: [
          /PRINTFORMW\ 「魔王大人的魔力…渗进了%SELF_CALL\(TARGET\)%的身体里了…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '317',
        any: [
          /PRINTFORMW\ 「啊啊…脑袋里好热…已经不行了…小穴和肛穴都好…都想要被好好地干一番啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '318',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像现在立马就会开始自慰起来般发情了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '319',
        any: [/IF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '320',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将最后如同没有的自尊心给扔掉了、将两条腿大幅度的敞开了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '321',
        any: [
          /PRINTFORMW\ 「魔王大人\~…请将大鸡巴塞进%UNICODE\(0x2661\)\ \*1%\ %SELF_CALL\(TARGET\)%的魔王大人专用处女小穴里吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '322',
        any: [
          /PRINTFORMW\ 「拜托了啦\~…如果不行的话…就让魔物们或者狗狗们侵犯好了\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '323',
        any: [
          /PRINTFORMW\ 看来已经是抑制不住了的样子、是时候好好疼爱疼爱了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '325',
        any: [/CFLAG:201\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '326',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '330',
        any: [
          /ELSEIF\ CFLAG:201\ <\ 7\ \&\&\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:76\ ==\ 0\ \&\&\ TALENT:TARGET:314\ !=\ 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '333',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '334',
        any: [
          /PRINTFORMW\ 「啊啊\~…我这个%SELF_CALL\(TARGET\)%居然…居然会有这样的感觉什么的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '335',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%展露出了至今都没有见过的温柔的表情向你看了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '336',
        any: [
          /PRINTFORMW\ 「魔王大人…%SELF_CALL\(TARGET\)%…想要跟你永远在一起呢\~…如果，可以的话………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '337',
        any: [
          /PRINTFORMW\ \ 迅速地向你靠近的%SAVESTR:TARGET%、在你的耳边用精灵语小声地说着什么。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '338',
        any: [
          /PRINTFORMW\ \ 貌似包含了什么恋慕的意义在里面，但是因为是精灵语所以细节部分不是很清楚。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '339',
        any: [
          /PRINTFORMW\ \ %SAVESTR:TARGET%长长的耳朵全部变红了，轻轻地离开了突然呆住的你的身旁………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '340',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '341',
        any: [
          /PRINTFORMW\ 「请让%SELF_CALL\(TARGET\)%一直伺候在您的身旁吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '344',
        any: [/PRINTFORMW\ 「啊、魔王大人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '345',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脸上并没有一丝的恐惧而是温柔地看着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '346',
        any: [/PRINTFORMW\ 「那、那个…我有个…请求来着………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '347',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '348',
        any: [/PRINTFORMW\ 「…用亲爱的来称呼您也…没关系吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '350',
        any: [/CFLAG:201\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '351',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '354',
        any: [
          /ELSEIF\ TALENT:TARGET:314\ ==\ 9\ \&\&\ CFLAG:201\ <\ 8\ \&\&\ TALENT:TARGET:85\ ==\ 1\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '357',
        any: [/IF\ CFLAG:370\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '358',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%向你靠近后、用十分自然地动作俯下身亲吻了%NAME:MASTER%的脚趾甲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '359',
        any: [
          /PRINTFORMW\ 那个动作完全没有一丝犹豫。在被%SAVESTR:TARGET%平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，%SAVESTR:TARGET%看着你可爱地笑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '360',
        any: [
          /PRINTFORMW\ 「魔王大人…%SELF_CALL\(TARGET\)%…会像你发誓保证永远的忠诚的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      { src: 'target/ERB/口上/EVENT_K3_高貴.ERB', ref: '361', any: [/PRINTL/] },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '362',
        any: [
          /PRINTFORMW\ 你稍微想了一下后，温柔地抚摸了%SAVESTR:TARGET%的脸颊作为你的回答。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '363',
        any: [
          /PRINTFORMW\ 「啊啊\~…啊啊\~…%SELF_CALL\(TARGET\)%…好幸福啊\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '364',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的尾巴摇晃着，身体因为喜悦而颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '365',
        any: [/CFLAG:201\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '366',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '368',
        any: [/ELSEIF\ CFLAG:370\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '369',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%向你靠近后、用十分自然的动作来亲吻%NAME:MASTER%的脚趾甲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '370',
        any: [
          /PRINTFORMW\ 她的动作没有任何的犹豫。在被%SAVESTR:TARGET%平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，%SAVESTR:TARGET%看着你可爱地笑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '371',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的住所、已经…只能是这里了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '372',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%就像狗一样在你的脚边谄媚着。那个姿态已经是一点高贵的样子都没有了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '373',
        any: [
          /PRINTFORMW\ 「啊啊…啊啊…请让%SAVESTR:TARGET%一直在魔王大人的身边吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '374',
        any: [/CFLAG:201\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '375',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '378',
        any: [
          /PRINTFORMW\ 「啊啊\~…终于成为了魔族了呐\~\~%UNICODE\(0x2661\)\ \*1%\ 好高兴呢\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '379',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为太过开心而颤抖着、张开了翅膀甩起了尾巴向你展现着她的身姿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '380',
        any: [
          /PRINTFORMW\ 「想要一直这样下去呢…更多地侍奉您…大人您的孩子…想要…想要的说………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '381',
        any: [
          /PRINTFORMW\ 就像是疼爱系少女的一样露出了羞涩的笑容、作为原勇者的她成为了魔族的新成员，向你撒起了娇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '382',
        any: [/CFLAG:201\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '383',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '387',
        any: [/ELSEIF\ TALENT:TARGET:9\ ==\ 1\ \&\&\ CFLAG:201\ <\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '389',
        any: [
          /PRINTFORMW\ 「不要…不要\~…请将我从这里放出来吧…父亲大人！！母亲大人！！…啊啊\~！啊\~！啊啊啊啊啊～！！！」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '390',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用两手不断地向墙壁敲打着。那双手已经鲜血淋漓了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '391',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%坏掉的精神已经回不到以前了吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '392',
        any: [/CFLAG:201\ =\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '393',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '397',
        any: [/ELSEIF\ ASSI\ <\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '398',
        any: [/CALL\ K3_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '407',
        any: [/ELSEIF\ NO:ASSI\ ==\ 17/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '412',
        any: [/IF\ CFLAG:202\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '414',
        any: [/IF\ TALENT:TARGET:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '415',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '416',
        any: [/PRINTFORMW\ 『…主人、这个人已经坏掉了哦』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '417',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '419',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ CFLAG:201\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '420',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带过来后、%SAVESTR:TARGET%感到些许奇怪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '421',
        any: [
          /PRINTFORMW\ 「啊啦？那个孩子是………嗯哼哼\~、你也被主人做了各种各样的事情了吧\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '422',
        any: [
          /PRINTFORMW\ 懒散地床上起来后，%SAVESTR:TARGET%整理着自己凌乱的头发。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '423',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '424',
        any: [
          /PRINTFORMW\ 『哎\~\~、果然是这样吗？…今天呢\~、是跟姐姐一起玩耍的噢，主人这么说的呢♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '425',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '426',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%将%SAVESTR:TARGET%如同撒娇一般抱住后就这样推到了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '428',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ CFLAG:201\ >=\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '429',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带过来后、%SAVESTR:TARGET%向这边瞪了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '430',
        any: [
          /PRINTFORMW\ 「明明已经有了%SELF_CALL\(TARGET\)%…却还要带那个孩子过来…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '432',
        any: [/IF\ TALENT:ASSI:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '433',
        any: [
          /PRINTFORMW\ 如果是以前村女的那一会的话以%SAVESTR:TARGET%的眼力就会晕过去了吧、但是%SAVESTR:ASSI%轻松的招架住了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '434',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '435',
        any: [
          /PRINTFORMW\ 『哇啊\~好可怕\~、不行的哦\~“原”勇者大人、摆出这么一张因为嫉妒而发狂的表情\~♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '436',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '437',
        any: [
          /PRINTFORMW\ 「啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%、才、才没有嫉妒什么的呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '438',
        any: [
          /PRINTFORMW\ 可能是因为在%NAME:MASTER%的面前露出了这样的表情而感到羞耻的%SAVESTR:TARGET%“啪”地用两手遮住了脸。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '439',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '440',
        any: [
          /PRINTFORMW\ 『所以作为同样都喜欢主人的同伴、我们更加地搞好关系吧\~？呐\~？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '441',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '442',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%抓住这样的%SAVESTR:TARGET%的间隙将她推到了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '445',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '446',
        any: [
          /PRINTFORMW\ 『啊哈哈\~…大姐姐嫉妒了\~♪\ 明明不管是不是我的主人，魔王大人也没关系，和谁抱在一起都一样嘛\~♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '447',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '448',
        any: [
          /PRINTFORMW\ 「不，不要乱开玩笑…你不知道%SELF_CALL\(TARGET\)%对那位大人有多………啊啊\~、快将手放开」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '449',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%将%SAVESTR:TARGET%的手抓住强行抱了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '450',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '451',
        any: [
          /PRINTFORMW\ 『但是今天…俺在魔王大人的面前、将大姐姐给抱住了哦…%UNICODE\(0x2661\)\ \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '452',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '456',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带过来后、%SAVESTR:TARGET%就一直瞪着这边。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '457',
        any: [/PRINTFORMW\ 「将这样的小姑娘带过来…到底想要干嘛呢…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '458',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '459',
        any: [
          /PRINTFORMW\ 『呜哇\~…真是一副了不起的样子呢\~…初次见面，大姐姐、今天是由玛奥来调教的噢………』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '460',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '461',
        any: [/PRINTFORMW\ 「什…请…请别在那里胡闹了！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '462',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '463',
        any: [/PRINTFORMW\ 『才没有在胡闹哦\~\.\.\.这可是主人的命令来的嘛♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '464',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '465',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%将因不愿意而撇着嘴的%SAVESTR:TARGET%推到了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '467',
        any: [/CFLAG:202\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '468',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '470',
        any: [/ELSEIF\ CFLAG:202\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '472',
        any: [/IF\ TALENT:TARGET:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '473',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '474',
        any: [/PRINTFORMW\ 『已经坏掉了的话…那就弄得更加坏掉也没关系吧★』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '475',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '477',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '478',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带到这里来后、%SAVESTR:TARGET%不知道为什么摆出了一副伤心的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '479',
        any: [/PRINTFORMW\ 「再也不说魔王大人您任性了…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '481',
        any: [/IF\ TALENT:ASSI:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '482',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '483',
        any: [
          /PRINTFORMW\ 『别摆出这样阴暗的表情嘛…俺只是想要跟勇者大人搞好关系而已嘛\~\~♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '484',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '485',
        any: [
          /PRINTFORMW\ 「啊啊\~…不，不行的…%SELF_CALL\(TARGET\)%的身体是…那位大人的…嗯\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '486',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脸颊被抚摸着、不情愿地将身体交给了%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '487',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '488',
        any: [/PRINTFORMW\ 『看吧\~…俺们关系变好的话\~、主人也会高兴的………♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '489',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '490',
        any: [
          /PRINTFORMW\ %NAME:MASTER%对%SAVESTR:ASSI%使了一下眼色后，%SAVESTR:ASSI%便将%SAVESTR:TARGET%推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '492',
        any: [
          /PRINTFORMW\ 「啊啊\~…但是…请至少、请至少不要在大人的面前……做这样的事情……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '493',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%只能在%NAME:MASTER%和%SAVESTR:ASSI%的面前微弱地呻吟而已。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '494',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '495',
        any: [
          /PRINTFORMW\ 『（啊啊\~…主人是想要看这个人的这种表情啊\~………♪）』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '496',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '497',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '498',
        any: [
          /PRINTFORMW\ 『不是的哦～、这可是主人的命令来的啦…来变得淫乱起来吧\~♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '499',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '500',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%将正微弱抵抗的%SAVESTR:TARGET%给推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '503',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '504',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带过来后、%SAVESTR:TARGET%不知道为什么一副很高兴的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '505',
        any: [/PRINTFORMW\ 「啊啊\~…快来这边吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '507',
        any: [/IF\ TALENT:ASSI:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '508',
        any: [/PRINTFORMW\ 「在主人的面前…让我们都变得淫乱起来吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '509',
        any: [
          /PRINTFORMW\ 可能在助手的身上感觉到了相同的气息吧，%SAVESTR:TARGET%不像样地将双腿给摊开了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '510',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '511',
        any: [
          /PRINTFORMW\ 『啊哈哈\~…在主人的面前做个爽、称赞得个爽吧\~………♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '512',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '513',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和%SAVESTR:ASSI%就像蛇一样互相缠绕在一起了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '515',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%想要…将%SAVESTR:ASSI%酱的技术铭刻在身体里啊\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '516',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%从嘴边露出了淫靡的笑声，将身体摊开了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '517',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '518',
        any: [/PRINTFORMW\ 『啊哈嗯\~…大姐姐\~\~…今天也做个爽吧\~\~………』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '519',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '520',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%将%SAVESTR:TARGET%就像宠溺一样抱住她就这样将其推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '524',
        any: [
          /PRINTFORMW\ %NAME:MASTER%将%SAVESTR:ASSI%带到这里来后、%SAVESTR:TARGET%脸上露出了一副貌似放弃了的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '525',
        any: [/SETCOLOR\ 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '526',
        any: [
          /PRINTFORMW\ 『呜呼呼\~…不管大姐姐怎么说不要都好，俺都会好好玩弄大姐姐的\~♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '527',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '528',
        any: [
          /PRINTFORMW\ %SAVESTR:ASSI%一副完全沉浸在调教原勇者的乐趣里的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '529',
        any: [/IF\ MARK:2\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '530',
        any: [/PRINTFORMW\ 「已经…随便你们好了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '531',
        any: [
          /PRINTFORMW\ 看着如同放弃了一般横躺着的%SAVESTR:TARGET%，%SAVESTR:ASSI%的施虐心受到了更强烈的刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '533',
        any: [/PRINTFORMW\ 「哈呜\~…呃呜\~\~…真，真是屈辱啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '534',
        any: [
          /PRINTFORMW\ 在这个房间里%SAVESTR:TARGET%不能充分地使用力量，只能在%SAVESTR:ASSI%的身下挣扎而已………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '537',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '595',
        any: [/CALL\ K3_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '793',
        any: [/CFLAG:301\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '808',
        any: [/IF\ TALENT:TARGET:9\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '810',
        any: [/PRINTFORMW\ 「呜…呃呜…黑暗的…不要…狭窄的…不要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '811',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的脸被眼泪和口水弄得一塌糊涂地横躺在那里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '812',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '815',
        any: [
          /ELSEIF\ MARK:3\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '817',
        any: [/PRINTFORMW\ 「……真是无法置信」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '818',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '821',
        any: [
          /ELSEIF\ MARK:2\ <=\ 1\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '823',
        any: [/PRINTFORMW\ 「终于结束了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '824',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '827',
        any: [
          /ELSEIF\ MARK:2\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '829',
        any: [/PRINTFORMW\ 「到底打算继续到什么时候呐…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '830',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '833',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '835',
        any: [/PRINTFORMW\ 「这种程度才不会屈服…来的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '836',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '839',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ >=\ 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '842',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '843',
        any: [
          /PRINTFORMW\ 「啊\~…%SELF_CALL\(TARGET\)%的身体…比起人类来还更加结实一点的啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '844',
        any: [/PRINTFORMW\ 「所以请更加不留情面地做H的事情吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '846',
        any: [/PRINTFORMW\ 「啊嗯\~…更多…请继续做更多H的事情吧\~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '848',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '850',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ BASE:0\ <=\ 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '853',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '854',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…太舒服了…脑子里都要融化掉了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '856',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…那里…还有…感觉着呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '858',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '860',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ >=\ 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '863',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '864',
        any: [
          /PRINTFORMW\ 「嗯啊\~…%SELF_CALL\(TARGET\)%…没想到自己的欲望居然会那么深…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '865',
        any: [/PRINTFORMW\ 「…请更加用力地疼爱%SELF_CALL\(TARGET\)%吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '867',
        any: [
          /PRINTFORMW\ 「啊啦、更加用力地疼爱%SELF_CALL\(TARGET\)%也没关系的说\.\.\.\.\.\.」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '869',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '871',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ BASE:0\ <=\ 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '874',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '875',
        any: [/PRINTFORMW\ 「啊哈啊嗯\~…果然、最喜欢大人您了\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '877',
        any: [/PRINTFORMW\ 「十分满足的说…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '879',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '604',
        any: [/IF\ TALENT:TARGET:9\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '606',
        any: [
          /PRINTFORMW\ 「父亲大人…请原谅…父亲大人…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%已经…啊啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '607',
        any: [
          /PRINTFORMW\ 在精神崩溃了的%SAVESTR:TARGET%的身上已经期待不了像样的反应了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '608',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '611',
        any: [/ELSEIF\ MARK:3\ ==\ 3\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '614',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '615',
        any: [
          /PRINTFORMW\ 「呃…！敢摸一下试试…%SAVESTR:TARGET%会将你的喉咙给咬断的…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '616',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用好像随时都会飞扑过来的眼神瞪着这边………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '619',
        any: [/PRINTFORMW\ 「你这个人渣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '620',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%的怒火仿佛能看到地一样熊熊燃烧着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '622',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '625',
        any: [
          /ELSEIF\ MARK:2\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '628',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '629',
        any: [/PRINTFORMW\ 「真是肮脏…不要看过来！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '630',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%紧咬着牙，怒视着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '634',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '635',
        any: [
          /PRINTFORMW\ 「能触碰%SELF_CALL\(TARGET\)%的人…也就只有那个人而已！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '636',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用如同看着污垢之物的眼神看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '638',
        any: [
          /PRINTFORMW\ 「请不要用你那肮脏的手来触碰%SELF_CALL\(TARGET\)%…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '639',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用鼻子‘哼’地一声，一副不爽的样子将脸撇向一边………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '642',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '645',
        any: [
          /ELSEIF\ MARK:2\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '648',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '649',
        any: [/PRINTFORMW\ 「哼、哼嗯…这点小事…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '650',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%还是一副强硬的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '654',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '655',
        any: [
          /PRINTFORMW\ 「居然被这种下贱的人给触碰了身体…%SAVESTR:TARGET%真的是对不起那个人啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '656',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一副气愤地样子盯着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '658',
        any: [/PRINTFORMW\ 「被这种下贱的家伙给…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '659',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%阴沉着脸、抚摸自己起了鸡皮疙瘩的皮肤………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '662',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '665',
        any: [
          /ELSEIF\ MARK:2\ ==\ 2\ \&\&\ FLAG:7\ ==\ 2\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '668',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '669',
        any: [/PRINTFORMW\ 「呜……%SELF_CALL\(TARGET\)%才…不会在这种地方……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '670',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%还没有抛弃希望的样子、不过看来差不到要到极限了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '674',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '675',
        any: [/PRINTFORMW\ 「啊…啊啊…至少请再温柔一点…吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '676',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一副稍微有点放弃了地样子喃喃自语着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '678',
        any: [/PRINTFORMW\ 「……今……今天也要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '679',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一副稍微有点放弃了地样子喃喃自语着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '682',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '685',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ TALENT:TARGET:85\ ==\ 0\ \&\&\ FLAG:7\ ==\ 2\ \&\&\ TALENT:TARGET:76\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '688',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '689',
        any: [/PRINTFORMW\ 「如果不做太过分的事情的话…就没关系………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '690',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一副已经完全放弃了的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '694',
        any: [/IF\ TALENT:TARGET:317\ ==\ 4\ \&\&\ FLAG:81\ >=\ 5000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '695',
        any: [
          /PRINTFORMW\ 「拜、拜托了…对%SELF_CALL\(TARGET\)%的身体随便做什么都没关系…但是……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '696',
        any: [
          /PRINTFORMW\ 「……至少放过，在那条街…那条街的那个人的孩子的生命…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '697',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一副为了故乡的恋人而献上自己身体的虚伪样子、看着用这种理由抱过来的%SAVESTR:TARGET%你感到十分的满意………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '699',
        any: [
          /PRINTFORMW\ 「%SAVESTR:TARGET%明白了…随便怎么做都可以了\.\.\.\.」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '700',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像下定决心了、坦率地顺从着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '703',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '705',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '708',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '710',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '711',
        any: [
          /PRINTFORMW\ 「啊啊\~主人\~…热得忍不了了\~…请用大鸡鸡…塞满%SAVESTR:TARGET%吧%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '712',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%匍匐在%NAME:MASTER%的脚边着、将自己的脸埋在了股间，自傲的长耳朵被压到扭曲了也不管………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '713',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '714',
        any: [
          /PRINTFORMW\ 「哈啊\~…嗯\~…身体…好热啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '715',
        any: [
          /PRINTFORMW\ 「自慰居然会那么舒服什么的\~…已经…已经…啊啊\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '716',
        any: [
          /PRINTFORMW\ 「啊嗯\~…主人…敬请欣赏\.\.\.\.淫乱的堕落女精灵的小穴之舞吧…%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '717',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%擅自开始了自慰…对于这样不懂事的姑娘一定要好好惩罚一下才可以………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '719',
        any: [
          /PRINTFORMW\ 「请负起将%SELF_CALL\(TARGET\)%的身体变得如此淫乱的责任吧…哈呜嗯\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '720',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%的这个胸部也好…屁股也好…那里也好…都是主人的东西来的…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '721',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%舔着嘴唇、长长的耳朵一抽一抽地靠向了%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '726',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '727',
        any: [
          /PRINTFORMW\ 「啊\~主人\~%UNICODE\(0x2661\)\ \*1%　今天用%SELF_CALL\(TARGET\)%的嘴巴来侍奉也没有关系吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '728',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%在%SAVESTR:PLAYER%的耳边撒娇般轻声说着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '729',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '730',
        any: [
          /PRINTFORMW\ 「主人\~\~…%UNICODE\(0x2661\)\ \*1%　对淫乱而又下流的%SAVESTR:TARGET%…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '731',
        any: [/PRINTFORMW\ 「好好地惩罚一下吧\~%UNICODE\(0x2661\)\ \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '732',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用双手将自己的桃尻掰开，诱惑着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '734',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…快点\~…主人\~…请给予大鸡巴吧\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '735',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的身体哪里都可以…让主人舒服起来的哦\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '738',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '740',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '743',
        any: [
          /IF\ CFLAG:TARGET:230\ >=\ 1\ \&\&\ \(TALENT:TARGET:190\ ==\ 1\ \|\|\ TALENT:TARGET:191\ ==\ 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '744',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '745',
        any: [
          /PRINTFORML\ 「嗯哼哼\~…居然长得那么大了呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '746',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%很怜爱地、抚摸着因为蠕虫寄生而怀孕膨胀了的肚子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '747',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '748',
        any: [
          /PRINTFORML\ 「被大人植入在肚子里面的孩子们\~、正在不停地长大着呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '749',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%眯着眼睛、怜爱地抚摸着因为寄生虫的卵而膨胀变大的肚子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '751',
        any: [
          /PRINTFORML\ 「在%SAVESTR:TARGET%的肚子里面的孩子……能快一点出来活动就好了呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '752',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一副恍惚地表情、抚摸着因为塞满着蠕虫的卵而膨胀起来的肚子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '755',
        any: [/ELSEIF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '757',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '758',
        any: [/PRINTFORMW\ 「已经…故乡什么的…已经怎么样都可以了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '759',
        any: [/PRINTFORMW\ 「请让%SELF_CALL\(TARGET\)%一直呆在这里吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '760',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '761',
        any: [/PRINTFORMW\ 「啊\~…魔王大人\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '762',
        any: [/PRINTFORMW\ 「一直、在等待这您的到来呢…撒、请快点来这边吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '764',
        any: [
          /PRINTFORMW\ 「哈啊\~…为什么…为什么会如此地恋慕身为魔族之王的那个大人呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '765',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%就这样…堕落到地狱也没有关系………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '766',
        any: [
          /PRINTFORMW\ 「………呜啊啊！？刚、刚刚的都听到了吗？请请请、请都忘掉吧！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '771',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '772',
        any: [/PRINTFORMW\ 「大人\~、今天也要做对吧\~…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '773',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将你的手放在脸颊上，可爱地用脸蹭着你的手心………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '774',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '775',
        any: [/PRINTFORMW\ 「大人、等…等您已经等了好久了啊\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '776',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%眼睛微微闭着，向你的脸轻轻亲了一下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '778',
        any: [/PRINTFORMW\ 「请温柔一点\.\.\.\.\.\.温柔地做吧\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '779',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%用手指玩弄着自己的发鬓，好像很害羞地请求道………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '782',
        any: [/RETURN\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5805',
        any: [/IF\ SELECTCOM\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5807',
        any: [/IF\ CFLAG:301\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5809',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5810',
        any: [/PRINTFORMW\ 「欢迎\~\~……嗯\~、没、没错……嗯嗯\~……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5812',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5813',
        any: [
          /PRINTFORMW\ 「啊啊…魔王大人想要试试，%SELF_CALL\(TARGET\)%能被野狗弄成怎样淫乱下流的样子对吧、……啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5815',
        any: [/ELSEIF\ MARK:2\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5816',
        any: [
          /PRINTFORMW\ 「这，这样的……被狗什么的…再怎么说也……呜啊啊啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5818',
        any: [/ELSEIF\ MARK:2\ >=\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5819',
        any: [
          /PRINTFORMW\ 「为…为什么、%SELF_CALL\(TARGET\)%要受到这样的……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5822',
        any: [/PRINTFORMW\ 「不……不要啊！才…才不要做这种事情！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5824',
        any: [/CFLAG:301\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5829',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900\ \&\&\ \(CFLAG:301\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5830',
        any: [
          /PRINTFORMW\ 「啊哈啊…%UNICODE\(0x2661\)\ \*1%\ 来吧、老公大人啊…啊、啊啊啊\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5831',
        any: [/CFLAG:301\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5833',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5834',
        any: [
          /PRINTFORMW\ 「能侍奉作为魔王大人的雌犬的%SELF_CALL\(TARGET\)%什么的、真是一条幸运的野狗呢……嗯哼哼♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5835',
        any: [/CFLAG:301\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5837',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5838',
        any: [/PRINTFORMW\ 「啊哈啊…狗狗的舌头、好大……呜哈啊、真令人兴奋呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5839',
        any: [/CFLAG:301\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5841',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:301\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5842',
        any: [
          /PRINTFORMW\ 「魔王大人…狗作为对象什么的、嗯！不要啊、啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5843',
        any: [/CFLAG:301\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5845',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:301\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5846',
        any: [/PRINTFORMW\ 「呜啊…啊…啊啊啊……不要啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5847',
        any: [/CFLAG:301\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5849',
        any: [
          /ELSEIF\ MARK:2\ ==\ 2\ \&\&\ \(CFLAG:301\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5850',
        any: [/PRINTFORMW\ 「已、已经…呜呜……请、请住手吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5851',
        any: [/CFLAG:301\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5853',
        any: [
          /ELSEIF\ MARK:2\ <=\ 1\ \&\&\ \(CFLAG:301\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5854',
        any: [/PRINTFORMW\ 「快、快离开！这个……呜呜\~……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5855',
        any: [/CFLAG:301\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5864',
        any: [/IF\ SELECTCOM\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5866',
        any: [/IF\ CFLAG:302\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5868',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5869',
        any: [
          /PRINTFORMW\ 「是这里哦、明白了吧？…啊嗯\~、没、没错……嗯哈嗯\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5871',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5872',
        any: [
          /PRINTFORMW\ 「啊哈…这么地闻着那儿的味道……呜嗯\~♪嗯\~、没、没错……就是，这样舔……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5874',
        any: [/ELSEIF\ TALENT:TARGET:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5875',
        any: [/PRINTFORMW\ 「哈呜啊！不要啊……不要！不要呀啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5878',
        any: [/PRINTFORMW\ 「啊呜……不、不要…在做什……呜啊啊！不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5880',
        any: [/CFLAG:302\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5885',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900\ \&\&\ \(CFLAG:302\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5886',
        any: [
          /PRINTFORMW\ 「来吧…老公大人\~%UNICODE\(0x2661\)\ \*1%\ 就像平常地一样、这里…啊哈嗯啊\~！真，真熟练呢\~\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5887',
        any: [/CFLAG:302\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5889',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5890',
        any: [
          /PRINTFORMW\ 「有着母狗的味道对吧\~？　哼哼\~…没错、那里……啊呜嗯\~！啊、啊啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5891',
        any: [/CFLAG:302\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5893',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5894',
        any: [
          /PRINTFORMW\ 「哼啊\~……不只是小豆豆而已、整个小穴都……啊哈嗯\~……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5895',
        any: [/CFLAG:302\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5897',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:302\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5898',
        any: [
          /PRINTFORMW\ 「果，果然还是、%NAME:MASTER%的手指、更加…啊\~！嗯啊啊\~……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5899',
        any: [/CFLAG:302\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5901',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:302\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5902',
        any: [/PRINTFORMW\ 「哈呜！呜…呜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5903',
        any: [/CFLAG:302\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5905',
        any: [/ELSEIF\ CFLAG:302\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5906',
        any: [/PRINTFORMW\ 「请快住手！不…不要啊……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5907',
        any: [/CFLAG:302\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5917',
        any: [/IF\ SELECTCOM\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5919',
        any: [/IF\ CFLAG:306\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5921',
        any: [/IF\ TALENT:130\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5923',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5924',
        any: [
          /PRINTFORMW\ 「啊啊\~…对狗狗的味道、对狗狗的舌头有反应了……%SELF_CALL\(TARGET\)%的乳房…母狗的奶要渗出来了啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5926',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5927',
        any: [
          /PRINTFORMW\ 「明明是野狗作对象来的……淫乱的%SELF_CALL\(TARGET\)%的胸部、居然会溢出那么多的奶出来…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5930',
        any: [
          /PRINTFORMW\ 「不、不要…这样的不要啊……啊啊……明明讨厌来着、胸部却……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5933',
        any: [/ELSEIF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5934',
        any: [
          /PRINTFORMW\ 「同样都是狗狗来的嘛…哼哼哼\~%UNICODE\(0x2661\)\ \*1%\ 可以的哦、请舔吧\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5936',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5937',
        any: [
          /PRINTFORMW\ 「啊嗯\~、明明是野狗来的…明明是野狗来的\~、身体却有反应了\~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5940',
        any: [/PRINTFORMW\ 「不要…！不要、在舔哪里呢……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5942',
        any: [/CFLAG:TARGET:306\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5947',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900\ \&\&\ TALENT:130\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 7\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5948',
        any: [
          /PRINTFORMW\ 「啊哈啊\~！老，老公大人真是的%UNICODE\(0x2661\)\ \*1%\ 这样舔来舔去的话、乳房…乳房要\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5949',
        any: [/CFLAG:306\ =\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5951',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900\ \&\&\ \(CFLAG:306\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5952',
        any: [
          /PRINTFORMW\ 「啊啊\~…好温柔啊\~好温柔啊\~、老公大人%UNICODE\(0x2661\)\ \*1%\ 更加地、用力地疼爱%SELF_CALL\(TARGET\)%，也可以的哦…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5953',
        any: [/CFLAG:306\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5955',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5956',
        any: [
          /PRINTFORMW\ 「嗯\~、比起乳房来…更加、像野兽一样嘛…啊啊、同样都是狗来的嘛、更加地…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5957',
        any: [/CFLAG:306\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5959',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5960',
        any: [
          /PRINTFORMW\ 「啊嗯嗯\~、嗯\~、明明是野狗来的……真是的\~、乳头居然…变成这样了呀\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5961',
        any: [/CFLAG:306\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5963',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:306\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5964',
        any: [/PRINTFORMW\ 「嗯\~、总觉得……有点舒服、又有点难受的…嗯\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5965',
        any: [/CFLAG:306\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5967',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:306\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5968',
        any: [/PRINTFORMW\ 「呜\~！嗯…嗯呜\~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5969',
        any: [/CFLAG:306\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5971',
        any: [/ELSEIF\ CFLAG:306\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5972',
        any: [/PRINTFORMW\ 「真、真是好恶心啊……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5973',
        any: [/CFLAG:306\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5983',
        any: [/IF\ SELECTCOM\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5985',
        any: [/IF\ CFLAG:307\ ==\ 0\ \&\&\ TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5987',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5988',
        any: [/PRINTFORML\ 「啊啊\~……%SAVESTR:TARGET%可爱的老公大人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5989',
        any: [
          /PRINTFORMW\ 「只是和老公大人接吻……不像样的雌犬的身体热地就像着火一样了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5990',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%和野狗的舌头互相缠绕在一起、露出一脸陶醉的微笑。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5992',
        any: [/ELSEIF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5993',
        any: [
          /PRINTFORMW\ 「第一次的kiss、对象居然是野狗…啊啊\~、不管是身体还是心理都完全是母狗来的了…♪%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5995',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5996',
        any: [
          /PRINTFORMW\ 「吻被、野狗给夺走了…而且、还是第一次…哈啊啊\~…要兴奋起来了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '5999',
        any: [
          /PRINTFORMW\ 「不、不要……！　呜呜\~…怎么会……第一次…居然是，这样的野狗做对象什么的……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6001',
        any: [/CFLAG:307\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6004',
        any: [/ELSEIF\ CFLAG:307\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6006',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6008',
        any: [
          /PRINTFORMW\ 「和野狗亲吻什么的、心脏还会小鹿乱撞什么的……唔哼哼\~、%SAVESTR:TARGET%身心都变成雌犬了呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6010',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6012',
        any: [
          /PRINTFORMW\ 「被野狗给、将嘴唇给夺走什么的……哈啊\~…兴奋地好像身体都要燃起来了呀\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6016',
        any: [/PRINTFORMW\ 「怎么能……和野狗亲吻什么的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6018',
        any: [/CFLAG:307\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6023',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6026',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6027',
        any: [/PRINTFORML\ 「哈啊\~…真是好棒啊\~%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6029',
        any: [
          /PRINTFORML\ 「嗯\~…好像要融化掉了一样啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6031',
        any: [/PRINTFORM\ %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6032',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6033',
        any: [/PRINT\ 一脸陶醉的表情/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6035',
        any: [/PRINT\ 专心地/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6037',
        any: [/PRINTW\ 和野狗用舌头缠绕在一起了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6038',
        any: [/CFLAG:307\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6040',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6042',
        any: [/PRINTFORMW\ 「是魔王大人的命令的话…会欢喜地顺从的\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6043',
        any: [/CFLAG:307\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6045',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:307\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6047',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6048',
        any: [/PRINTFORMW\ 「为什么啊……魔王大人……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6050',
        any: [/PRINTFORMW\ 「这是在测试%SAVESTR:TARGET%的爱意吗……魔王大人……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6052',
        any: [/CFLAG:307\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6054',
        any: [
          /ELSEIF\ ABL:10\ >=2\ \&\&\ \(CFLAG:307\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6056',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6057',
        any: [/PRINTFORMW\ 「和野狗亲吻什么的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6059',
        any: [/PRINTFORMW\ 「%SAVESTR:TARGET%明白了…会和狗亲吻的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6061',
        any: [/CFLAG:307\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6063',
        any: [/ELSEIF\ CFLAG:307\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6065',
        any: [/PRINTFORMW\ 「好臭啊…啊啊\~、这样的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6066',
        any: [/CFLAG:307\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6076',
        any: [/IF\ SELECTCOM\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6078',
        any: [/IF\ CFLAG:310\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6080',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6082',
        any: [
          /PRINTFORMW\ 「啊啊…屁股、更多更加尽情地、呸咯呸咯地舔吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6084',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6086',
        any: [
          /PRINTFORMW\ 「哈呜\~…那、那里是\~啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6088',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6090',
        any: [/PRINTFORMW\ 「好、好羞耻啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6094',
        any: [/PRINTFORMW\ 「不要啊……请原、请原谅%SAVESTR:TARGET%吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6096',
        any: [/CFLAG:TARGET:310\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6101',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6104',
        any: [/PRINTFORML\ 「哈啊…更尽情地、舔吧\~…弄湿那里吧\~……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6105',
        any: [/PRINTFORMW\ 「请处罚一下……%SAVESTR:TARGET%的不像样的屁股吧\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6106',
        any: [/CFLAG:310\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6108',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6110',
        any: [/PRINTFORMW\ 「真是奇怪的感觉呢\~……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6111',
        any: [/CFLAG:310\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6113',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:310\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6115',
        any: [
          /PRINTFORMW\ 「如果魔王大人希望这样的话……%SAVESTR:TARGET%会忍耐下来的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6116',
        any: [/CFLAG:310\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6118',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:310\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6120',
        any: [/PRINTFORMW\ 「如果是魔王大人的命令来的话……那就没有办法了呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6121',
        any: [/CFLAG:310\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6123',
        any: [/ELSEIF\ CFLAG:310\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6125',
        any: [/PRINTFORMW\ 「哼呜\~…为什么要做这样的事情啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6126',
        any: [/CFLAG:310\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6135',
        any: [/IF\ SELECTCOM\ ==\ 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6137',
        any: [/IF\ CFLAG:TARGET:322\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6139',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6141',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6145',
        any: [
          /PRINTFORML\ 「好高兴啊\~%UNICODE\(0x2661\)\ \*1%\ 将第一次先给犬大人什么的\~……请、请粗鲁地侵犯%SELF_CALL\(TARGET\)%这只雌犬吧\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6146',
        any: [
          /PRINTFORMW\ 色情地四肢着地地趴在地上摇晃着屁股、浮现一副陶醉而恍惚的表情的%SAVESTR:TARGET%从嘴边流出了口水，还将舌头伸出来乱晃。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6148',
        any: [/ELSEIF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6150',
        any: [
          /PRINTFORMW\ 「初次的对象是野狗什么的\~……对呢、作为献上像%SAVESTR:TARGET%这样的淫乱处女的对象还真是不错呢\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6152',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6154',
        any: [
          /PRINTFORMW\ 「魔王大人……希望这样做的话，那%SAVESTR:TARGET%就接受其命运……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6158',
        any: [/PRINTFORMW\ 「不要啊啊\~！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6163',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6167',
        any: [
          /PRINTFORML\ 「是的…%SELF_CALL\(TARGET\)%的小穴是狗大人专用的\ 以后每天都会交尾的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6169',
        any: [/ELSEIF\ TALENT:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6171',
        any: [
          /PRINTFORMW\ 「和狗做吗？\ 呵呵…很期待呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6173',
        any: [/ELSEIF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6175',
        any: [/PRINTFORMW\ 「咕…魔王大人、请再考虑一下……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6179',
        any: [/PRINTFORMW\ 「和狗什么的…不要啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6182',
        any: [/CFLAG:322\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6187',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6188',
        any: [/IF\ TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6190',
        any: [
          /PRINTFORML\ 「请看吧%UNICODE\(0x2661\)\ \*1%\ 狗肉棒插进了%SELF_CALL\(TARGET\)%的小穴里……%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6191',
        any: [
          /PRINTFORML\ 「狗肉棒%UNICODE\(0x2661\)\ \*1%\ 深深地插进来了%UNICODE\(0x2661\)\ \*2%\ 真正的交尾啊%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6192',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%四脚着地、一边向水晶球实况转播一边被狗侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6193',
        any: [/PRINTFORMW\ 2匹野兽就那样互相寻求着沉溺在了肉欲里……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6194',
        any: [/ELSEIF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6195',
        any: [
          /PRINTFORML\ 「啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 想要更加更加激烈地做呢\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6196',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%四肢着地跪在地上、从背后被狗侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6197',
        any: [
          /PRINTFORMW\ 两头野兽也不在意周围的视线，互相追求着对方，沉浸在了肉欲当中……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6198',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6199',
        any: [
          /PRINTFORML\ 「啊啊啊\~%UNICODE\(0x2661\)\ \*1%\ 狗狗的大鸡巴嘴巴了%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6200',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%将作为人类的尊严完全丢掉了，作为一头野兽享受着被野狗侵犯所带来的快乐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6202',
        any: [
          /PRINTFORML\ 「请塞进来吧%UNICODE\(0x2661\)\ \*1%\ 塞进%SAVESTR:TARGET%这个狗狗大人专用的肉便器里吧\~%UNICODE\(0x2661\)\ \*1%\ 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6203',
        any: [
          /PRINTFORMW\ 如同邀请野狗一样将屁股生出来、让野狗看见那已经濡湿了的蜜穴，%SAVESTR:TARGET%露出了妖艳的笑容。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6205',
        any: [/CFLAG:322\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6207',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6209',
        any: [
          /PRINTFORMW\ 「相比魔王大人派过来的魔物们来说…狗什么的真的不算什么呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6210',
        any: [/CFLAG:322\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6212',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:322\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6214',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6215',
        any: [
          /PRINTFORMW\ 「魔王大人…%SAVESTR:TARGET%会一生都努力侍奉您的、所以……请大发慈悲吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6217',
        any: [/PRINTFORMW\ 「请…请不要看着%SAVESTR:TARGET%的这种样子……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6219',
        any: [/CFLAG:322\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6221',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ ABL:2\ >=\ 3\ \&\&\ \(CFLAG:322\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6223',
        any: [/PRINTFORMW\ 「哈啊\~…\~……才，才没有对狗的鸡巴有感觉了呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6224',
        any: [/CFLAG:322\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6226',
        any: [
          /ELSEIF\ MARK:2\ ==\ 3\ \&\&\ \(CFLAG:322\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6228',
        any: [/PRINTFORMW\ 「这不是开玩笑来的对吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6229',
        any: [/CFLAG:322\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6231',
        any: [/ELSEIF\ CFLAG:322\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6233',
        any: [
          /PRINTFORMW\ 「请、请原谅%SAVESTR:TARGET%了吧…拜托了、拜托了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6234',
        any: [/CFLAG:322\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6243',
        any: [/IF\ SELECTCOM\ ==\ 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6245',
        any: [/IF\ CFLAG:TARGET:328\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6247',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6248',
        any: [/PRINTFORML\ %SAVESTR:TARGET%晃动着屁股引诱着野狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6250',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的不净之穴在这边%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6252',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6254',
        any: [/PRINTFORMW\ 「这种肮脏的行为、还是第一次♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6256',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6258',
        any: [/PRINTFORMW\ 「这种肮脏的行为、还是第一次♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6262',
        any: [/PRINTFORMW\ 「这种肮脏的行为、我不想干啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6264',
        any: [/CFLAG:TARGET:328\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6269',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 6\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6270',
        any: [/IF\ TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6271',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%通过水晶球看着自己和不净之物联系在一起的光景/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6272',
        any: [
          /PRINTFORML\ 「请欣赏吧…%SELF_CALL\(TARGET\)%的肛门小穴被狗肉棒插到了深处…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6273',
        any: [
          /PRINTFORML\ 「%SELF_CALL\(TARGET\)%…有感觉了%UNICODE\(0x2661\)\ \*1%\ 请欣赏因为不净之穴在含着狗肉棒而有感觉的%SELF_CALL\(TARGET\)%吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6274',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%带着快乐得快要融化了的表情实况转播自己的行为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6275',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6276',
        any: [/PRINTFORML\ %SAVESTR:TARGET%因为肛穴的感觉而融化掉了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6277',
        any: [
          /PRINTFORML\ 「狗狗大人的大鸡巴…塞满了%SELF_CALL\(TARGET\)%的粪穴了呀…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6278',
        any: [/PRINTFORMW\ 到了这种程度的话，%SAVESTR:TARGET%已经变不回来了吧/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6280',
        any: [/PRINTFORML\ %SAVESTR:TARGET%兴奋地将屁股给张开了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6281',
        any: [
          /PRINTFORML\ 「狗狗大人\~…如果%SELF_CALL\(TARGET\)%的粪穴没关系的话请使用吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6282',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%向野兽献媚的姿态简直连畜生都不如/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6284',
        any: [/CFLAG:328\ =\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6286',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6288',
        any: [
          /PRINTFORMW\ 「因为这种肮脏的行为而有感觉的%SELF_CALL\(TARGET\)%…是变态啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6289',
        any: [/CFLAG:328\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6291',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6293',
        any: [
          /PRINTFORMW\ 「因为这种肮脏的行为而有感觉的%SELF_CALL\(TARGET\)%…是变态啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6294',
        any: [/CFLAG:328\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6296',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:328\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6298',
        any: [/PRINTFORMW\ 「这是多么肮脏啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6299',
        any: [/CFLAG:328\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6301',
        any: [
          /ELSEIF\ ABL:3\ >=\ 3\ \&\&\ \(CFLAG:328\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6303',
        any: [/PRINTFORMW\ 「用狗的东西…做这么肮脏的行为…才不会有感觉的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6304',
        any: [/CFLAG:328\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6306',
        any: [/ELSEIF\ \ CFLAG:328\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6308',
        any: [/PRINTFORMW\ 「好肮脏啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6309',
        any: [/CFLAG:328\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6666',
        any: [/IF\ SELECTCOM\ ==\ 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6671',
        any: [/LOCAL\ =\ TALENT:320/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6675-6676',
        any: [/LOCAL:3\ =\ LOCAL\ %\ 1000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6678-6679',
        any: [/LOCAL:4\ =\ LOCAL\ %\ 10000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6681-6682',
        any: [/LOCAL:5\ =\ LOCAL\ %\ 1000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6684-6685',
        any: [/LOCAL:6\ =\ LOCAL\ %\ 10000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6687-6688',
        any: [/LOCAL:7\ =\ LOCAL\ %\ 100000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6690-6691',
        any: [/LOCAL:8\ =\ LOCAL\ %\ 1000000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6693',
        any: [/LOCAL:9\ =\ LOCAL:5\ \+\ LOCAL:6\ \+\ LOCAL:7\ \+\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6668',
        any: [/IF\ CFLAG:357\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6669',
        any: [/IF\ TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6696',
        any: [/IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6697',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6698',
        any: [
          /PRINTFORMW\ 「今天%SELF_CALL\(TARGET\)%和丈夫大人的……关系和睦的、交尾，请您欣赏」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6700',
        any: [
          /PRINTFORMW\ 「亲爱的、你看到了吗？　%SELF_CALL\(TARGET\)%现在正和这么棒的丈夫大人互相疼爱着呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6701',
        any: [/PRINTFORMW\ 这么说着的%SAVESTR:TARGET%把脸颊贴向了野狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6702',
        any: [
          /PRINTFORMW\ 「唔呼……好期待呢。母狗的%SELF_CALL\(TARGET\)%稍稍动了动腰……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6703',
        any: [
          /PRINTFORMW\ 「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6705',
        any: [/IF\ LOCAL:3\ \&\&\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6706',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿和儿子的♪　看啊～♪　妈妈和狗结婚了啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6707',
        any: [/PRINTFORMW\ 「这是你们的……新爸爸哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6708',
        any: [/ELSEIF\ LOCAL:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6709',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿♪　看啊～♪　妈妈和狗结婚了啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6710',
        any: [/PRINTFORMW\ 「这是你的……新爸爸哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6711',
        any: [/ELSEIF\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6712',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有儿子♪　看啊～♪　妈妈和狗结婚了啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6713',
        any: [/PRINTFORMW\ 「这是你的……新爸爸哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6716',
        any: [/IF\ LOCAL:9\ >\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6717',
        any: [/PRINTFORM\ 「%SELF_CALL\(TARGET\)%是有/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6718',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6719',
        any: [/PRINT\ 姐姐，哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6720',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6721',
        any: [/PRINT\ 姐姐，哥哥，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6722',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6723',
        any: [/PRINT\ 姐姐，哥哥，弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6724',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6725',
        any: [/PRINT\ 姐姐，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6726',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6727',
        any: [/PRINT\ 哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6728',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6729',
        any: [/PRINT\ 姐姐和哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6730',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6731',
        any: [/PRINT\ 姐姐和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6732',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6733',
        any: [/PRINT\ 姐姐和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6734',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6735',
        any: [/PRINT\ 哥哥和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6736',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6737',
        any: [/PRINT\ 哥哥和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6738',
        any: [/ELSEIF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6739',
        any: [/PRINT\ 弟弟和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6740',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6741',
        any: [/PRINT\ 姐姐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6742',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6743',
        any: [/PRINT\ 哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6744',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6745',
        any: [/PRINT\ 妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6746',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6747',
        any: [/PRINT\ 弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6749',
        any: [/PRINT\ 兄弟姐妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6751',
        any: [/PRINTFORMW\ 的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6753',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6754',
        any: [
          /PRINTFORMW\ 「姐姐哥哥♪　你们重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6755',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6756',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6757',
        any: [
          /PRINTFORMW\ 「姐姐♪　你重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6758',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6759',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6760',
        any: [
          /PRINTFORMW\ 「哥哥♪　你重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6761',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6764',
        any: [/IF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6765',
        any: [
          /PRINTFORMW\ 「可爱的弟弟和妹妹♪　你们的姐姐毫不在乎的在和动物交尾♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6766',
        any: [
          /PRINTFORMW\ 「今后会充分的进行性教育♪　以后也会送映像过去的记得要看哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6767',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6768',
        any: [/PRINTFORMW\ 「可爱的妹妹♪　你的姐姐毫不在乎的在和动物交尾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6769',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6770',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6771',
        any: [/PRINTFORMW\ 「可爱的弟弟♪　你的姐姐毫不在乎的在和动物交尾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6772',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6777',
        any: [/ELSEIF\ TALENT:TARGET:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6778',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6779',
        any: [
          /PRINTFORMW\ 「今天%SELF_CALL\(TARGET\)%和主人大人的……关系和睦的、交尾，请您欣赏」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6780',
        any: [/PRINTFORMW\ 这么说着的%SAVESTR:TARGET%把脸颊贴向了野狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6781',
        any: [
          /PRINTFORMW\ 「唔呼……好期待呢。母狗的%SELF_CALL\(TARGET\)%稍稍动了动腰……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6782',
        any: [
          /PRINTFORMW\ 「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6784',
        any: [/IF\ LOCAL:3\ \&\&\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6785',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿和儿子的♪　看啊～♪　妈妈服从于狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6786',
        any: [/PRINTFORMW\ 「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6787',
        any: [/ELSEIF\ LOCAL:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6788',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿的♪　看啊～♪　妈妈服从于狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6789',
        any: [/PRINTFORMW\ 「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6790',
        any: [/ELSEIF\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6791',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有儿子的♪　看啊～♪　妈妈服从于狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6792',
        any: [/PRINTFORMW\ 「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6795',
        any: [/IF\ LOCAL:9\ >\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6796',
        any: [/PRINTFORM\ 「%SELF_CALL\(TARGET\)%是有/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6797',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6798',
        any: [/PRINT\ 姐姐，哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6799',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6800',
        any: [/PRINT\ 姐姐，哥哥，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6801',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6802',
        any: [/PRINT\ 姐姐，哥哥，弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6803',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6804',
        any: [/PRINT\ 姐姐，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6805',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6806',
        any: [/PRINT\ 哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6807',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6808',
        any: [/PRINT\ 姐姐和哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6809',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6810',
        any: [/PRINT\ 姐姐和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6811',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6812',
        any: [/PRINT\ 姐姐和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6813',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6814',
        any: [/PRINT\ 哥哥和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6815',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6816',
        any: [/PRINT\ 哥哥和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6817',
        any: [/ELSEIF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6818',
        any: [/PRINT\ 弟弟和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6819',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6820',
        any: [/PRINT\ 姐姐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6821',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6822',
        any: [/PRINT\ 哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6823',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6824',
        any: [/PRINT\ 妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6825',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6826',
        any: [/PRINT\ 弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6828',
        any: [/PRINT\ 兄弟姐妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6830',
        any: [/PRINTFORMW\ 的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6832',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6833',
        any: [
          /PRINTFORMW\ 「姐姐哥哥♪　你们重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6834',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6835',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6836',
        any: [
          /PRINTFORMW\ 「姐姐♪　你重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6837',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6838',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6839',
        any: [
          /PRINTFORMW\ 「哥哥♪　你重要的妹妹%SAVESTR:TARGET%堕落成母狗了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6840',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6843',
        any: [/IF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6844',
        any: [
          /PRINTFORMW\ 「可爱的弟弟和妹妹♪　你们的姐姐毫不在乎的在和动物交尾♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6845',
        any: [
          /PRINTFORMW\ 「今后会充分的进行性教育♪　以后也会送映像过去的记得要看哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6846',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6847',
        any: [/PRINTFORMW\ 「可爱的妹妹♪　你的姐姐毫不在乎的在和动物交尾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6848',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6849',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6850',
        any: [/PRINTFORMW\ 「可爱的弟弟♪　你的姐姐毫不在乎的在和动物交尾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6851',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6856',
        any: [/ELSEIF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6857',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6858',
        any: [/PRINTFORMW\ 「今天请欣赏%SELF_CALL\(TARGET\)%和野狗的交尾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6859',
        any: [/PRINTFORMW\ 「虽然很不习惯、请您一边欣赏一边手淫♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6861',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6862',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6863',
        any: [/PRINTFORMW\ 「今天请欣赏%SELF_CALL\(TARGET\)%和野狗的交尾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6864',
        any: [/PRINTFORMW\ 「虽然很不习惯、请您一边欣赏一边手淫♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6867',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6868',
        any: [
          /PRINTFORMW\ 「今天……唔、%SELF_CALL\(TARGET\)%和野狗……不、不行」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6869',
        any: [/PRINTFORMW\ 「饶了我吧……饶了我吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6872',
        any: [/CFLAG:357\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6876',
        any: [/IF\ TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6879',
        any: [
          /IF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ CFLAG:601\ ==\ 900\ \&\&\ \(CFLAG:306\ <=\ 5\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6880',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6881',
        any: [
          /PRINTFORMW\ 「今天%SELF_CALL\(TARGET\)%和丈夫大人的……关系和睦的、交尾，请您欣赏」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6883',
        any: [
          /PRINTFORMW\ 「亲爱的、你看到了吗？　%SELF_CALL\(TARGET\)%今天也想要变成野兽哦♪♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6884',
        any: [/PRINTFORMW\ 这么说着的%SAVESTR:TARGET%把脸颊贴向了野狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6885',
        any: [
          /PRINTFORMW\ 「唔呼……好期待呢。母狗的%SELF_CALL\(TARGET\)%稍稍动了动腰……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6886',
        any: [
          /PRINTFORMW\ 「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6888',
        any: [/IF\ LOCAL:3\ \&\&\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6889',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿和儿子的♪　看啊～♪　新爸爸的大鸡巴♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6890',
        any: [
          /PRINTFORMW\ 「为了制造出你们的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6891',
        any: [/ELSEIF\ LOCAL:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6892',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿的♪　看啊～♪　新爸爸的大鸡巴♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6893',
        any: [
          /PRINTFORMW\ 「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6894',
        any: [/ELSEIF\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6895',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有儿子的♪　看啊～♪　新爸爸的大鸡巴♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6896',
        any: [
          /PRINTFORMW\ 「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6899',
        any: [/IF\ LOCAL:9\ >\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6900',
        any: [/PRINTFORM\ 「%SELF_CALL\(TARGET\)%是有/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6901',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6902',
        any: [/PRINT\ 姐姐，哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6903',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6904',
        any: [/PRINT\ 姐姐，哥哥，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6905',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6906',
        any: [/PRINT\ 姐姐，哥哥，弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6907',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6908',
        any: [/PRINT\ 姐姐，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6909',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6910',
        any: [/PRINT\ 哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6911',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6912',
        any: [/PRINT\ 姐姐和哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6913',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6914',
        any: [/PRINT\ 姐姐和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6915',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6916',
        any: [/PRINT\ 姐姐和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6917',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6918',
        any: [/PRINT\ 哥哥和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6919',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6920',
        any: [/PRINT\ 哥哥和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6921',
        any: [/ELSEIF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6922',
        any: [/PRINT\ 弟弟和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6923',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6924',
        any: [/PRINT\ 姐姐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6925',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6926',
        any: [/PRINT\ 哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6927',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6928',
        any: [/PRINT\ 妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6929',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6930',
        any: [/PRINT\ 弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6932',
        any: [/PRINT\ 兄弟姐妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6934',
        any: [/PRINTFORMW\ 的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6936',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6937',
        any: [
          /PRINTFORMW\ 「姐姐哥哥♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6938',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6939',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6940',
        any: [
          /PRINTFORMW\ 「姐姐♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6941',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6942',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6943',
        any: [
          /PRINTFORMW\ 「哥哥♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6944',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6947',
        any: [/IF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6948',
        any: [
          /PRINTFORMW\ 「可爱的弟弟和妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6949',
        any: [
          /PRINTFORMW\ 「有好好的学习H的事情吗♪　以后也会一直送映像过去的记得要看哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6950',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6951',
        any: [
          /PRINTFORMW\ 「可爱的妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6952',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6953',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6954',
        any: [
          /PRINTFORMW\ 「可爱的弟弟♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6955',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6960',
        any: [/CFLAG:357\ =\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6962',
        any: [
          /ELSEIF\ TALENT:TARGET:136\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6963',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6964',
        any: [
          /PRINTFORMW\ 「今天%SELF_CALL\(TARGET\)%和主人大人的……关系和睦的、交尾，请您欣赏」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6965',
        any: [/PRINTFORMW\ 这么说着的%SAVESTR:TARGET%把脸颊贴向了野狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6966',
        any: [
          /PRINTFORMW\ 「唔呼……好期待呢。母狗的%SELF_CALL\(TARGET\)%稍稍动了动腰……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6967',
        any: [
          /PRINTFORMW\ 「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6970',
        any: [/IF\ LOCAL:3\ \&\&\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6971',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿和儿子的♪　看啊～♪　妈妈对狗发情了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6972',
        any: [/PRINTFORMW\ 「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6973',
        any: [/ELSEIF\ LOCAL:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6974',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有女儿的♪　看啊～♪　妈妈对狗发情了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6975',
        any: [/PRINTFORMW\ 「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6976',
        any: [/ELSEIF\ LOCAL:4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6977',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%是有儿子的♪　看啊～♪　妈妈对狗发情了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6978',
        any: [/PRINTFORMW\ 「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6981',
        any: [/IF\ LOCAL:9\ >\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6982',
        any: [/PRINTFORM\ 「%SELF_CALL\(TARGET\)%是有/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6983',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6984',
        any: [/PRINT\ 姐姐，哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6985',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6986',
        any: [/PRINT\ 姐姐，哥哥，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6987',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6988',
        any: [/PRINT\ 姐姐，哥哥，弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6989',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6990',
        any: [/PRINT\ 姐姐，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6991',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6992',
        any: [/PRINT\ 哥哥，弟弟，妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6993',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6994',
        any: [/PRINT\ 姐姐和哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6995',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6996',
        any: [/PRINT\ 姐姐和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6997',
        any: [/ELSEIF\ LOCAL:5\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6998',
        any: [/PRINT\ 姐姐和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '6999',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7000',
        any: [/PRINT\ 哥哥和弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7001',
        any: [/ELSEIF\ LOCAL:6\ \&\&\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7002',
        any: [/PRINT\ 哥哥和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7003',
        any: [/ELSEIF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7004',
        any: [/PRINT\ 弟弟和妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7005',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7006',
        any: [/PRINT\ 姐姐/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7007',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7008',
        any: [/PRINT\ 哥哥/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7009',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7010',
        any: [/PRINT\ 妹妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7011',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7012',
        any: [/PRINT\ 弟弟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7014',
        any: [/PRINT\ 兄弟姐妹/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7016',
        any: [/PRINTFORMW\ 的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7018',
        any: [/IF\ LOCAL:5\ \&\&\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7019',
        any: [
          /PRINTFORMW\ 「姐姐哥哥♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7020',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7021',
        any: [/ELSEIF\ LOCAL:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7022',
        any: [
          /PRINTFORMW\ 「姐姐♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7023',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7024',
        any: [/ELSEIF\ LOCAL:6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7025',
        any: [
          /PRINTFORMW\ 「哥哥♪　你们重要的妹妹%SAVESTR:TARGET%今天也正在发情中♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7026',
        any: [
          /PRINTFORMW\ 「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7029',
        any: [/IF\ LOCAL:7\ \&\&\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7030',
        any: [
          /PRINTFORMW\ 「可爱的弟弟和妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7031',
        any: [
          /PRINTFORMW\ 「有好好的学习H的事情吗♪　以后也会一直送映像过去的记得要看哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7032',
        any: [/ELSEIF\ LOCAL:7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7033',
        any: [
          /PRINTFORMW\ 「可爱的妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7034',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7035',
        any: [/ELSEIF\ LOCAL:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7036',
        any: [
          /PRINTFORMW\ 「可爱的弟弟♪　今天也送去了你们的姐姐发情的身姿的影像了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7037',
        any: [
          /PRINTFORMW\ 「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7042',
        any: [/CFLAG:357\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7044',
        any: [
          /ELSEIF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7045',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7046',
        any: [/PRINTFORMW\ 「今天请欣赏%SELF_CALL\(TARGET\)%和野狗的交尾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7047',
        any: [/PRINTFORMW\ 「虽然很不习惯、请您一边欣赏一边手淫♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7048',
        any: [/CFLAG:357\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7050',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(CFLAG:357\ <=\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7051',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7052',
        any: [/PRINTFORMW\ 「今天请欣赏%SELF_CALL\(TARGET\)%和野狗的交尾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7053',
        any: [/PRINTFORMW\ 「虽然很不习惯、请您一边欣赏一边手淫♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7054',
        any: [/CFLAG:357\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7056',
        any: [/ELSEIF\ CFLAG:357\ <=\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7057',
        any: [
          /PRINTFORMW\ 「观赏这个的大家、初次见面。%SELF_CALL\(TARGET\)%是%SAVESTR:TARGET%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7058',
        any: [
          /PRINTFORMW\ 「今天……唔、%SELF_CALL\(TARGET\)%和野狗……不、不行」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7059',
        any: [/PRINTFORMW\ 「饶了我吧……饶了我吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7060',
        any: [/CFLAG:357\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8449',
        any: [/IF\ SELECTCOM\ ==\ 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8451',
        any: [/IF\ BASE:1\ <=\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8452',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%连站起来的力气都没有的样子……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8454',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被角斗场的热气和被接下来要战斗的对手凝视着而吓得直发抖……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8461',
        any: [/IF\ SELECTCOM\ ==\ 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8463',
        any: [/IF\ BASE:1\ <=\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8465',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8466',
        any: [/PRINTFORMW\ 「请，请不要继续下去了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8467',
        any: [
          /PRINTFORMW\ 气力用尽了的%SAVESTR:TARGET%在角斗场的土地之上喘气已经是极限了的样子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8469',
        any: [/PRINTFORMW\ 「不…不要啊……被那么侵犯了什么的…不要啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8470',
        any: [
          /PRINTFORMW\ 气力用尽了的%SAVESTR:TARGET%在角斗场的土地之上喘气已经是极限了的样子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8474',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8475',
        any: [/PRINTFORMW\ 「跟%SAVESTR:ASSI%做对手什么的…根本不知道啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8476',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%看着收到%NAME:MASTER%的指令而武装起来的%SAVESTR:ASSI%留下了冷汗……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8478',
        any: [/PRINTFORMW\ 「居，居然会有这么丑陋的生物存在什么的……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8479',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%看到了在角斗场上丑陋的生物感到了恐惧……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8488',
        any: [/IF\ SELECTCOM\ ==\ 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8490',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8491',
        any: [
          /PRINTFORMW\ 「啊哼嗯…嗯呜…再、再这样做的话…呜噗嗯！？嗯噗嗯嗯噗嗯……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8492',
        any: [/PRINTFORM\ %SAVESTR:ASSI%用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8494',
        any: [/PRINT\ 大鸡巴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8496',
        any: [/PRINT\ 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8497',
        any: [/PRINTFORMW\ 让%SAVESTR:TARGET%吸着，露出了愉悦的表情……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8499',
        any: [/PRINTFORMW\ 「啊啊…这，这么臭的东西…嗯呜…嗯噗…嗯啾…噗噜呸……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8500',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%舔舐着闻着就让人想吐的味道的阴茎……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8507',
        any: [/IF\ SELECTCOM\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8509',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8510',
        any: [
          /PRINTFORMW\ 「哈呜\~…呜…哪，哪怕被做这样的事情%SELF_CALL\(TARGET\)%也…啊呜\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8511',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%的胸部，被持续地揉着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8513',
        any: [
          /PRINTFORMW\ 「快…快放开手！%SELF_CALL\(TARGET\)%才不会因为这种事情…呜呼嗯！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8514',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为胸部被大力地揉着而从嘴边漏出了痛苦的声音……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8521',
        any: [/IF\ SELECTCOM\ ==\ 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8523',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8524',
        any: [
          /PRINTFORMW\ 「啊啊\~！不，不行的啊…这样…强行做这样的…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8525',
        any: [/PRINTFORM\ %SAVESTR:ASSI%一边听着悲鸣一边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8527',
        any: [/PRINT\ 大鸡巴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8529',
        any: [/PRINT\ 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8530',
        any: [/PRINTFORMW\ 将%SAVESTR:TARGET%的小穴毫不留情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8532',
        any: [/ELSEIF\ TFLAG:400\ ==\ 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8533',
        any: [/PRINTFORMW\ 「噶啊…呃哈啊…呃啊啊…呜啊啊啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8534',
        any: [
          /PRINTFORMW\ 可怜的%SAVESTR:TARGET%发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8536',
        any: [
          /PRINTFORMW\ 「不…不要啊…这样的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8537',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%继续被怪物侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8545',
        any: [/IF\ SELECTCOM\ ==\ 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8547',
        any: [/IF\ ASSI\ >\ 0\ \&\&\ ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8548',
        any: [/PRINTFORMW\ 「啊啊\~！啊\~啊啊\~！屁股…要坏掉了啊\~…\~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8549',
        any: [/PRINTFORM\ %SAVESTR:ASSI%一边听着悲鸣一边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8551',
        any: [/PRINT\ 大鸡巴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8553',
        any: [/PRINT\ 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8554',
        any: [/PRINTFORMW\ 将%SAVESTR:TARGET%的肛穴毫不留情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8556',
        any: [/ELSEIF\ TFLAG:400\ ==\ 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8557',
        any: [/PRINTFORMW\ 「呃啊…呃哈啊…呜呃…呜呃呃呃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8558',
        any: [
          /PRINTFORMW\ 可怜的%SAVESTR:TARGET%发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8560',
        any: [
          /PRINTFORMW\ 「不…不要啊…这样的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的…啊啊！的肛门啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8561',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%继续被怪物侵犯着肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8569',
        any: [/IF\ SELECTCOM\ ==\ 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8570',
        any: [/PRINTFORMW\ 「这种…区区媚薬而已……啊呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7104',
        any: [/P\ =\ PALAM:3\ \+\ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7105',
        any: [/IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:TARGET:221\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7107',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7109',
        any: [/IF\ SELECTCOM\ ==\ 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7110',
        any: [/PRINTFORMW\ 「哈嗯呜\~…好、冷啊\~…而且还黏糊糊地\~\~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7111',
        any: [/PRINTFORMW\ ―――第一次超过了润滑lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7114',
        any: [
          /PRINTFORMW\ 「啊哈啊\~…股间…黏糊糊湿哒哒地…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7115',
        any: [/PRINTFORMW\ ―――第一次超过了润滑lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7120',
        any: [/IF\ SELECTCOM\ ==\ 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7121',
        any: [/PRINTFORMW\ 「这，这种液体什么的…才，才不舒服呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7122',
        any: [/PRINTFORMW\ ―――第一次超过了润滑lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7125',
        any: [/PRINTFORMW\ 「啊\~…这，这个难道是…漏，漏了…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7126',
        any: [/PRINTFORMW\ ―――第一次超过了润滑lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7129',
        any: [/CFLAG:TARGET:221\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7135',
        any: [/P\ =\ PALAM:5\ \+\ UP:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7136',
        any: [/IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:222\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7138',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7140',
        any: [/IF\ SELECTCOM\ ==\ 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7141',
        any: [
          /PRINTFORMW\ 「不，不行…被这种药…输给这种药不行…明明不可以来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7142',
        any: [/PRINTFORMW\ ―――第一次超过了欲情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7145',
        any: [
          /PRINTFORMW\ 「啊、啊啊…忍，忍耐…不住了啦…请抱，抱一下好吗\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7146',
        any: [/PRINTFORMW\ ―――第一次超过了欲情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7151',
        any: [/IF\ SELECTCOM\ ==\ 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7152',
        any: [
          /PRINTFORMW\ 「真，真是卑鄙…输给这种药…可不行的…\.\.\.\.明明不行的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7153',
        any: [/PRINTFORMW\ ―――第一次超过了欲情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7156',
        any: [/PRINTFORMW\ 「哈啊…啊啊\~…稍，稍微摸一下…也可以吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7157',
        any: [/PRINTFORMW\ ―――第一次超过了欲情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7160',
        any: [/CFLAG:222\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7166',
        any: [/P\ =\ PALAM:8\ \+\ UP:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7167',
        any: [/IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:223\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7169',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7170',
        any: [
          /PRINTFORMW\ 「哈呜\~%UNICODE\(0x2661\)\ \*1%\ 请、请不要看过来…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7171',
        any: [/PRINTFORMW\ ―――第一次超过了耻情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7174',
        any: [/PRINTFORMW\ 「看，看过来可不行啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7175',
        any: [/PRINTFORMW\ ―――第一次超过了耻情lv2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7177',
        any: [/CFLAG:223\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7183',
        any: [/P\ =\ PALAM:10\ \+\ UP:10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7184',
        any: [/IF\ P\ >\ PALAMLV:2\ \&\&\ CFLAG:224\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7186',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7187',
        any: [/PRINTFORMW\ 「啊，啊啊…不，不要过来…请不要过来…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7188',
        any: [/PRINTFORMW\ ―――第一次超过了恐怖LV2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7191',
        any: [/PRINTFORMW\ 「啊，啊啊…不，不要过来…请不要过来…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7192',
        any: [/PRINTFORMW\ ―――第一次超过了恐怖LV2了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7194',
        any: [/CFLAG:224\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7200',
        any: [/IF\ NOWEX:0\ >\ 0\ \&\&\ CFLAG:225\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7202',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7203',
        any: [
          /PRINTFORMW\ 「嗯啊呜\~%UNICODE\(0x2661\)\ \*1%\ 这，这就是要去了的意思吧…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7204',
        any: [
          /PRINTFORMW\ 看来%SAVESTR:TARGET%第一次因为小豆豆的刺激而高潮了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7207',
        any: [
          /PRINTFORMW\ 「啊\~不要不要…感觉…要来了…要来了啊\~…啊啊\~啊\~啊啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7208',
        any: [
          /PRINTFORMW\ 看来%SAVESTR:TARGET%第一次因为小豆豆的刺激而高潮了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7210',
        any: [/CFLAG:225\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7216',
        any: [/IF\ NOWEX:1\ >\ 0\ \&\&\ CFLAG:226\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7218',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7219',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…有什么要来了\~要来了\~…从小穴那儿来了\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7220',
        any: [
          /PRINTFORMW\ 「欺负，请更加地欺负吧\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7221',
        any: [
          /PRINTFORMW\ 「嗯哈啊\~%UNICODE\(0x2661\)\ \*1%啊\~啊啊嗯\~嗯哈啊啊啊啊啊嗯啊嗯啊\~\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7222',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为第一次阴道高潮而大声地叫了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7224',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7225',
        any: [
          /PRINTFORMW\ 「啊\~…不行\~\~…不行的啊\~\~\~…小穴\~…再这样下去…哈呜嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7226',
        any: [
          /PRINTFORMW\ 「呜哈嗯啊\~\~%UNICODE\(0x2661\)\ \*1%\ 呜\~…嗯哈\~…啊啊\~…不，不行\~\~…啊啊\~…啊\~…啊啊啊嗯\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7227',
        any: [
          /PRINTFORMW\ 「嗯呜哎嗯\~…呜哈呜\~\~…又，又要来了\~\~%UNICODE\(0x2661\)\ \*1%\ 啊\~…啊\~啊啊\~啊\~…哈嗯啊啊啊啊啊啊\~～～～！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7228',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%因为第一次的阴道高潮而感到舒服………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7231',
        any: [
          /PRINTFORMW\ 「哈啊\~…不要\~要啊啊\~…要来了…要来了啊\~\~…小穴…再这样…做下去的话%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7232',
        any: [
          /PRINTFORMW\ 「哈呜…要来了…真的要来了…哈呜嗯\~\~…啊\~啊啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7233',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%因为第一次的阴道高潮而靠在你的肩膀喘息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7235',
        any: [/CFLAG:TARGET:226\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7241',
        any: [/IF\ NOWEX:2\ >\ 0\ \&\&\ CFLAG:227\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7243',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7245',
        any: [
          /IF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ ==\ 0\ \&\&\ ABL:3\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7246',
        any: [
          /PRINTFORMW\ 「出来了%UNICODE\(0x2764\)\ \*1%　粗的玩意拉出来啦～%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7247',
        any: [
          /PRINTFORMW\ 「厉、好厉害哇%UNICODE\(0x2764\)\ \*1%　菊穴、去了…一边拉一边去了啊%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7248',
        any: [
          /PRINTFORMW\ 「菊穴、好厉害%UNICODE\(0x2764\)\ \*1%　嗯哈啊啊嗯%UNICODE\(0x2764\)\ \*1%　菊穴要化了啊啊…要变成肉穴、变成肉穴了嗷嗷嗷%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7249',
        any: [
          /PRINTFORMW\ \ %SAVESTR:TARGET%迎来了初次的菊花高潮的同时把粪便喷得到处都是。满身污物一脸恍惚地沉浸在菊花高潮当中……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7252',
        any: [
          /PRINTFORMW\ 「啊哈嗯嗯\~\~\~…肛门小穴\.\.\.请更加地玩弄吧\~\~\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7253',
        any: [
          /PRINTFORMW\ 「肛门小穴融化了\~…要融化掉了\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7254',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~%UNICODE\(0x2661\)\ \*1%嗯哈啊嗯\~\~%UNICODE\(0x2661\)\ \*1%肛门小穴要去了要去了要要去去去了了了了了\~\~\~\~%UNICODE\(0x2661\)\ \*5%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7255',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%带着淫荡无比的神色，第一次因为后庭而高潮了…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7258',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7259',
        any: [
          /PRINTFORMW\ 「嗯呀哈\~…啊啊\~…啊啊嗯\~\~…不要不要\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7260',
        any: [
          /PRINTFORMW\ 「啊\~\~…屁股…要去了\~…呜\~呜\~%UNICODE\(0x2661\)\ \*1%啊啊啊啊啊\~～～～！！！！」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7261',
        any: [
          /PRINTFORMW\ 「哈\~…%SELF_CALL\(TARGET\)%因为…屁股而去了的都是…都，都是因为大人你啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7262',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%好像是第一次因为肛门而高潮的样子被看到了，所以闹起了别扭………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7266',
        any: [/IF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ \&\&\ ABL:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7267',
        any: [/PRINTFORMW\ 排泄小穴在尚未开发且习惯的情况下获得了性的快感/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7268',
        any: [
          /PRINTFORMW\ 而且逐渐意识到自己被肛门中逆流的液体搅到了高潮的事实、让%SAVESTR:TARGET%颇受打击……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7269',
        any: [
          /PRINTFORMW\ 「嘤咦啊啊…不要…不要！　请把、把这个拔出去啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%、要变奇怪了……啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7271',
        any: [/ELSEIF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7272',
        any: [
          /PRINTFORMW\ 在腹中流动着的灌肠液的刺激下、%SAVESTR:TARGET%初次达到了菊花高潮/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7273',
        any: [
          /PRINTFORMW\ 「好舒服…屁股、菊花、%SELF_CALL\(TARGET\)%、被灌肠弄坏了啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7275',
        any: [
          /ELSEIF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ ==\ 0\ \&\&\ ABL:3\ ==\ 0\ \&\&\ BASE:1\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7276',
        any: [
          /PRINTFORMW\ 从脱力抽搐着的菊花里、肠内残余的脏污液体全都喷了出来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7277',
        any: [
          /PRINTFORMW\ 能阻止的方法还是气力、现在%SAVESTR:TARGET%完全没有了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7279',
        any: [/IF\ TALENT:44\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7280',
        any: [/PRINTFORMW\ 在初次尝肛门排泄绝顶的困惑中、早已泣不成声……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7282',
        any: [
          /PRINTFORMW\ 污物喷出的同时全身颤抖了起来、肛门绝顶的余韵令其困惑不已……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7284',
        any: [
          /PRINTFORMW\ 「唔、呜呜…！　%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…屁股…排便、竟然会、舒服什么的…啊啊啊啊啊……！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7286',
        any: [
          /ELSEIF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ ==\ 0\ \&\&\ ABL:3\ ==\ 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7287',
        any: [/PRINTFORMW\ 刺溜！　噗噜噜噜噜！　哔呜哔呜哔呜！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7288',
        any: [
          /PRINTFORMW\ 肛门发出不雅的声音的同时、%SAVESTR:TARGET%烦恼着排泄所带来的快感/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7289',
        any: [
          /PRINTFORMW\ 排泄快感在菊花开发过程中很容易获得、相反地在强制排便时获得的意外也是有的……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7290',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET,4\)%！　明明是这幅丑态、屁股…骗人…骗人的吧……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7291',
        any: [
          /PRINTFORMW\ 「啊啊啊、别出来啊！　出来了、好舒服…骗、骗人的吧！　啊啊啊啊、为什么会舒服啊啊……！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7293',
        any: [/ELSEIF\ SELECTCOM\ ==\ 46\ \&\&\ TEQUIP:46\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7294',
        any: [
          /PRINTFORMW\ 排泄感所带来的解放感与便随着的肛门快感、%SAVESTR:TARGET%在排泄着粪便的同时初次尝到了菊花绝顶的滋味……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7295',
        any: [
          /PRINTFORMW\ 「啊啊啊！？　好厉害、不是吧、屁股…竟然、好舒服啊…！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7296',
        any: [
          /PRINTFORMW\ 「出来了…拉出来了、这、好舒服…不…不要…！　不……%UNICODE\(0x2764\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7299',
        any: [
          /PRINTFORMW\ 「呜！…呜啊啊啊\~…不行…变得不行了！…屁，屁股那里…再这样下去…原酿\~…原\~酿\~我！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7300',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%第一次因为菊花而高潮的样子、身体颤抖着，不知道发出了多少次悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7303',
        any: [/CFLAG:227\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7309',
        any: [/IF\ NOWEX:3\ >\ 0\ \&\&\ CFLAG:228\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7311',
        any: [/IF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7312',
        any: [
          /PRINTFORMW\ 「哈嗯啊\~…胸部\~…要融化掉了\~%UNICODE\(0x2661\)\ \*1%\ 哈唉呜\~%UNICODE\(0x2661\)\ \*1%\ 有什么要来，要来了！…啊啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7313',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%第一次因为胸部刺激而高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7316',
        any: [
          /PRINTFORMW\ 「啊\~啊啊\~…不，不行的\~…再这样刺激胸部的话\~…啊啊哈呜嗯\~\~…要，要融化掉了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7317',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%第一次因为胸部刺激而高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7319',
        any: [/CFLAG:TARGET:228\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7326',
        any: [/A\ =\ UP:11\ \+\ UP:12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7327',
        any: [/IF\ TFLAG:3\ ==\ 1\ \&\&\ CFLAG:229\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7329',
        any: [/IF\ TFLAG:20\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7331',
        any: [
          /IF\ TALENT:TARGET:76\ ==\ 1\ \&\&\ \(A\ <\ 500\ \|\|\ TFLAG:150\ ==\ 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7332',
        any: [
          /PRINTFORMW\ 「啊哈嗯\~%UNICODE\(0x2661\)\ \*1%…主人\~…%SELF_CALL\(TARGET\)%的淫乱处女小穴的使用感觉怎么呢\~…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7333',
        any: [
          /PRINTFORMW\ 「从今天开始\~…以后请用%SELF_CALL\(TARGET\)%的小穴来做舒服的事情吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7334',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%露出淫乱的表情向你撒娇起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7336',
        any: [
          /ELSEIF\ TALENT:TARGET:85\ ==\ 1\ \&\&\ \(A\ <\ 500\ \|\|\ TFLAG:150\ ==\ 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7337',
        any: [
          /PRINTFORMW\ 「哈啊\~…哈啊\~…将处女献给大人你什么的\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7338',
        any: [
          /PRINTFORMW\ 「从今以后就请多多指教了\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7339',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%露出了很高兴的表情向你撒起了娇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7342',
        any: [
          /PRINTFORMW\ 「啊啊…%SELF_CALL\(TARGET\)%…已经回不了故乡了呀…呜呜\~…呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7343',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7348',
        any: [/IF\ TALENT:TARGET:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7349',
        any: [
          /PRINTFORMW\ 「哈嗯\~%UNICODE\(0x2661\)\ \*1%…终于不是处女了\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7350',
        any: [
          /PRINTFORMW\ 「可以的哦…从今以后就请好好地疼爱这个淫乱的小穴吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7352',
        any: [/ELSEIF\ TALENT:TARGET:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7353',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…为什么%SELF_CALL\(TARGET\)%…居然会想让大人…来夺走自己的处女…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7354',
        any: [/PRINTFORMW\ 「哈啊…真是笨蛋呢……（哭）」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7357',
        any: [
          /PRINTFORMW\ 「啊啊\~…%SELF_CALL\(TARGET\)%…已经回不了故乡了…呜呜\~…呜呜\~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7358',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7361',
        any: [/CFLAG:TARGET:229\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7367',
        any: [
          /IF\ \(\(NOWEX:0\ \&\&\ CFLAG:225\ ==\ 1\)\ \|\|\ \(NOWEX:1\ \&\&\ CFLAG:226\ ==\ 1\)\ \|\|\ \(NOWEX:2\ \&\&\ CFLAG:227\ ==\ 1\)\ \|\|\ \(NOWEX:3\ \&\&\ CFLAG:228\ ==\ 1\)\)\ \&\&\ \(TALENT:TARGET:190\ ==\ 1\ \|\|\ TALENT:TARGET:191\ ==\ 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7368',
        any: [/IF\ CFLAG:TARGET:230\ >=\ 100/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7369',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7370',
        any: [
          /PRINTFORML\ 「啊啊\~%UNICODE\(0x2661\)\ \*1%\ 要、要生出来了呀\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7371',
        any: [/PRINTFORMW\ 「……请不要、看着……%SAVESTR:TARGET%的这种样子\~……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7372',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7373',
        any: [
          /PRINTFORML\ 「不、不行……要生出来了啊啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7375',
        any: [
          /PRINTFORMW\ 「……撒、现在就将%SAVESTR:TARGET%可爱的孩子们生出来了\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7377',
        any: [/ELSEIF\ CFLAG:TARGET:230\ ==\ 75/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7378',
        any: [/PRINTFORML\ 「……我的身体、总觉得有点奇怪啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7379',
        any: [
          /PRINTFORMW\ 「不管怎样生…怎样生都好、都满足不了啊\~……想要生更多…更多的蛋出来了啊\~……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7382',
        any: [/IF\ TALENT:TARGET:190\ ==\ 1\ \&\&\ TALENT:TARGET:191\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7383',
        any: [/PRINT\ 「啊啊\~…我的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7384',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7385',
        any: [/PRINT\ 两个小穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7387',
        any: [/PRINT\ 小穴还有屁股/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7389',
        any: [/PRINTFORMW\ 都要生出来、要生出来了啊\~……啊啊\~！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7391',
        any: [/ELSEIF\ TALENT:TARGET:190\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7392',
        any: [/IF\ RAND:1\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7393',
        any: [
          /PRINTFORMW\ 「嗯呜\~…啊啊\~、被这样刺激了的话、要、要生出来了啊啊\~、啊啊啊\~！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7395',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7399',
        any: [/IF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7400',
        any: [/PRINTFORMW\ 「哈呜\~、要、要从屁股里、出来了啊啊啊\~！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7402',
        any: [
          /PRINTFORMW\ 「哈呜\~、要从%SAVESTR:TARGET%的屁股里…啊啊、生、生出来了啊啊\~！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7406',
        any: [/CFLAG:TARGET:230\ \+=\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7439',
        any: [/IF\ TFLAG:22\ ==\ 3\ \&\&\ CFLAG:297\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7441',
        any: [/IF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7442',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~！…请更，请更多地…在%SELF_CALL\(TARGET\)%的身体上刻下印记吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7444',
        any: [/PRINTFORMW\ 「啊嗯\~！…好，痛…好疼的…不，不行的…的说…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7446',
        any: [/CFLAG:297\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7452',
        any: [/IF\ TFLAG:23\ ==\ 3\ \&\&\ CFLAG:298\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7454',
        any: [/IF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7455',
        any: [
          /PRINTFORMW\ 「啊啊啊\~…不行\~…再这样…舒服下去的话…真的要…离不开了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7457',
        any: [
          /PRINTFORMW\ 「哈啊…哈呜呜\~…这样…好舒服的事情…还是第一次来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7459',
        any: [/CFLAG:298\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7465',
        any: [/IF\ TFLAG:24\ ==\ 3\ \&\&\ CFLAG:299\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7467',
        any: [/IF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7468',
        any: [
          /PRINTFORMW\ 「啊啊…%SELF_CALL\(TARGET\)%会…好好听命令得…自己的立场…明白的…%SELF_CALL\(TARGET\)%明白的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7470',
        any: [
          /PRINTFORMW\ 「啊啊\~…不，不会再反抗了…绝对…绝对不会再次反抗了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7472',
        any: [/CFLAG:299\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7478',
        any: [/IF\ TFLAG:21\ ==\ 3\ \&\&\ CFLAG:300\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7480',
        any: [/IF\ TALENT:85\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7481',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%无言地盯着你看………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7483',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%无言地瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7485',
        any: [/CFLAG:300\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7496',
        any: [/IF\ TFLAG:13\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7498',
        any: [/IF\ Q\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7499',
        any: [
          /PRINTFORML\ 「嗯\~…嗯哈\~…%SELF_CALL\(TARGET\)%…居然想着女孩子…做这样的事情什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7500',
        any: [
          /PRINTFORML\ 残留着的欲望之火让%SAVESTR:TARGET%的身体还在一点一点地燃烧着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7502',
        any: [/ELSEIF\ Q\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7503',
        any: [
          /PRINTFORML\ 「狗狗的…想要啊\~…啊啊\~…%SELF_CALL\(TARGET\)%比狗和畜生还要低贱啊\~…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7504',
        any: [
          /PRINTFORML\ 堕落的愉悦让%SAVESTR:TARGET%哪怕觉得苦恼也不会停下自慰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7508',
        any: [/IF\ TALENT:76\ \&\&\ \(CFLAG:261\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7509',
        any: [
          /PRINTFORMW\ 「哼嗯\~…不管是小穴%UNICODE\(0x2661\)\ \*1%…还是肛穴%UNICODE\(0x2661\)\ \*1%…都好热啊…%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7510',
        any: [
          /PRINTFORMW\ 「好想被大鸡鸡继续啪啪啪啊…%UNICODE\(0x2661\)\ \*1%啊啊啊嗯\~\~…只是手指根本不够嘛………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7511',
        any: [/CFLAG:261\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7513',
        any: [
          /ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:261\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7514',
        any: [/PRINTFORMW\ 「还想……还想要更多……%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7515',
        any: [
          /PRINTFORMW\ 「嗯哈嗯\~%UNICODE\(0x2661\)\ \*1%\ 身体…好热…好痒…啊啊\~%UNICODE\(0x2661\)\ \*1%\ 大人\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7516',
        any: [/CFLAG:261\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7518',
        any: [
          /ELSEIF\ ABL:31\ >=\ 3\ \&\&\ \(CFLAG:261\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7519',
        any: [
          /PRINTFORMW\ 「哈嗯\~%UNICODE\(0x2661\)\ \*1%\ 身体好热啊\~…手指停不下来呀\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7520',
        any: [/CFLAG:261\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7522',
        any: [/ELSEIF\ CFLAG:261\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7523',
        any: [/PRINTFORMW\ 「啊啊\~…身体\~…好热好痒啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7524',
        any: [/CFLAG:261\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7531',
        any: [/IF\ TFLAG:13\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7533',
        any: [/IF\ TALENT:76\ \&\&\ \(CFLAG:262\ <\ 5\ \|\|\ FLAG:7\ ==\ 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7534',
        any: [
          /PRINTFORMW\ 「嗯哼哼…女孩子之间的SEX、也很不错呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7535',
        any: [/PRINTFORMW\ 「不知道你会用什么声音来呻吟呢\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7536',
        any: [/CFLAG:262\ =\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7538',
        any: [
          /ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:262\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7539',
        any: [
          /PRINTFORMW\ 「嗯\~…哈…啊啊…只有那位大人才可以…这种声音…啊啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7540',
        any: [
          /PRINTFORMW\ 「明明不想听到来着…嗯\~嗯\~…哈啊啊啊啊啊嗯\~\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7541',
        any: [/CFLAG:262\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7543',
        any: [
          /ELSEIF\ ABL:33\ >=\ 3\ \&\&\ \(CFLAG:262\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7544',
        any: [
          /PRINTFORMW\ 「嗯哼哼哼…撒…一起享受吧\~%UNICODE\(0x2661\)\ \*1%\ 享受百合的喜悦吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7545',
        any: [/CFLAG:262\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7547',
        any: [
          /ELSEIF\ ABL:22\ >=\ 3\ \&\&\ \(CFLAG:262\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7548',
        any: [
          /PRINTFORMW\ 「哼啊啊\~…和女孩子做…居然会那么舒服什么的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7549',
        any: [/CFLAG:262\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7551',
        any: [/ELSEIF\ CFLAG:262\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7552',
        any: [/PRINTFORMW\ 「啊\~…这，这样的不奇怪吗…和女孩子做什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7553',
        any: [/CFLAG:262\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7560',
        any: [/IF\ TFLAG:13\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7562',
        any: [
          /IF\ TALENT:76\ ==\ 1\ \&\&\ \(CFLAG:263\ <\ 4\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7563',
        any: [
          /PRINTFORMW\ 「啊哈嗯\~%UNICODE\(0x2661\)\ \*1%\ 早上好啊\~、主人…呸咯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7564',
        any: [
          /PRINTFORMW\ 「还在%UNICODE\(0x2661\)\ \*1%\ 继续着早上的口交侍奉呢所以…请不用在意\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7565',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%一脸淫乱地将阴茎塞进了喉咙的深处，。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7566',
        any: [
          /PRINTFORMW\ 「嗯呃…啾噜啾噜嗯\~…呸噜嗯\~%UNICODE\(0x2661\)\ \*1%…嗯嗯\~…嗯啊嗯嗯啊嗯噗嗯\~…嗯噗呜呜\~嗯\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7567',
        any: [/CFLAG:263\ =\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7569',
        any: [
          /ELSEIF\ TALENT:85\ \&\&\ \(CFLAG:263\ <\ 3\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7570',
        any: [
          /PRINTFORMW\ 「啾噜嗯\~…啾啾\~…啾噜噜嗯\~…啊啊嗯\~%UNICODE\(0x2661\)\ \*1%\ 早上好\~\~。我最爱的大人\~%UNICODE\(0x2661\)\ \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7571',
        any: [
          /PRINTFORMW\ 「这个大鸡鸡\~\~%UNICODE\(0x2661\)\ \*1%…%SAVESTR:TARGET%会用嘴巴来弄干净的\~…请在等一下吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7572',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%疼爱地用舔舐来清洁着阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7573',
        any: [
          /PRINTFORMW\ 「嗯哼哼\~…如果兴奋起来了话…就请这样侵犯%SELF_CALL\(TARGET\)%的嘴巴吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7574',
        any: [/CFLAG:263\ =\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7576',
        any: [
          /ELSEIF\ ABL:16\ >=\ 5\ \&\&\ \(CFLAG:263\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7577',
        any: [/PRINTFORMW\ 「早上好、主人%UNICODE\(0x2661\)\ \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7578',
        any: [
          /PRINTFORMW\ 「哈嗯\~哈嗯\~……%SAVESTR:TARGET%会用嘴巴来弄干净的，请就这样等一下吧\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7579',
        any: [/CFLAG:263\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7581',
        any: [/ELSEIF\ CFLAG:263\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7582',
        any: [
          /PRINTFORMW\ 「嗯哈\~…哈啊\~…哈嗯\~…哈嗯\~…对，对不起…因为实在是太厉害的大鸡鸡了不小心………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7583',
        any: [/CFLAG:263\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7590',
        any: [/IF\ TFLAG:13\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7592',
        any: [
          /IF\ ABL:2\ >=\ 4\ \&\&\ \(CFLAG:264\ <\ 2\ \|\|\ FLAG:7\ ==\ 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7593',
        any: [
          /PRINTFORMW\ 「哈啊\~…哈啊\~…身体按捺不住呢…小穴痒地不行不行地呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7594',
        any: [/PRINTFORMW\ 「请更多地…更多地…侵犯吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7595',
        any: [/CFLAG:264\ =\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7597',
        any: [/ELSEIF\ CFLAG:264\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7598',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…身体按捺不住呢…小穴痒地受不了了呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7599',
        any: [/PRINTFORMW\ 「所，所以啦…请抱，抱一下吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7600',
        any: [/CFLAG:264\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7607',
        any: [/IF\ TFLAG:13\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7608',
        any: [/IF\ CFLAG:265\ <\ 1\ \|\|\ FLAG:7\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7609',
        any: [
          /PRINTFORMW\ 「晚，晚上好……啊……%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…是来给主人抱抱来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7610',
        any: [
          /PRINTFORMW\ 「身体痒地受不了…迫使%SELF_CALL\(TARGET\)%来的…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7611',
        any: [
          /PRINTFORMW\ 「请给予好色又不要脸的…雌、雌奴隶…同情与怜悯吧………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7612',
        any: [/CFLAG:265\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7619',
        any: [/IF\ TFLAG:13\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7621',
        any: [/IF\ TALENT:136/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7622',
        any: [
          /PRINTFORMW\ 直到告知要被卖掉的时候%SAVESTR:TARGET%仍和「丈夫」你侬我侬的交合着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7623',
        any: [
          /PRINTFORMW\ 「十分感谢……您教导%SELF_CALL\(TARGET\)%理解了美好的兽爱世界」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7624',
        any: [
          /PRINTFORMW\ 和爱侣一同爬入笼子里的%SAVESTR:TARGET%静静地跪在地上行了最后一礼/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7626',
        any: [/ELSEIF\ TALENT:85\ \&\&\ MARK:3\ <\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7628',
        any: [/IF\ TALENT:TARGET:314\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7629',
        any: [
          /PRINTFORMW\ 被告知要被卖掉的瞬间、%SAVESTR:TARGET%的瞳孔放大地呆住了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7630',
        any: [/PRINTFORMW\ 看来被说了什么并没有理解得样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7631',
        any: [
          /PRINTFORMW\ 没有办法只好再将事实重复了一次、%SAVESTR:TARGET%便开始大声地哭喊着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7632',
        any: [/PRINTFORML\ ………………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7633',
        any: [/PRINTFORMW\ 你用护卫的怪物强行将%SAVESTR:TARGET%压制住后/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7634',
        any: [
          /PRINTFORMW\ 向%SAVESTR:TARGET%的长而美丽的耳朵…没错…在她自满的美丽的耳朵上打上了用于拍卖标码的耳环。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7635',
        any: [
          /PRINTFORMW\ 一打上耳环后、如同断了念头一样%SAVESTR:TARGET%安静了下来……………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7637',
        any: [/ELSEIF\ TALENT:210\ \|\|\ TALENT:211/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7638',
        any: [
          /PRINTFORMW\ 「竟、竟然……都已经做好作为魔王大人的左右手随时准备奉献的准备了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7639',
        any: [
          /PRINTFORMW\ 「竟然……不可能的……那个誓约……那份授勋……到底算什么啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7640',
        any: [
          /PRINTFORMW\ 已然泣不成声的%SAVESTR:TARGET%手被奴隶商人拉了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7641',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%会哭到什么时候呢……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7644',
        any: [/PRINTFORMW\ 「骗、骗人…拜，拜托了…是开玩笑的吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7645',
        any: [
          /PRINTFORMW\ 你下令让怪物抓住%SAVESTR:TARGET%将她带到了马车的旁边。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7646',
        any: [/PRINTFORMW\ 「不要，不要啊…这绝对是骗人的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7647',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%想…想和大人你在一起来的啊…呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7650',
        any: [/ELSEIF\ MARK:3\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7651',
        any: [/PRINTFORMW\ 「给我记住…给我记住啊！…哪怕死了也…混蛋…！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7653',
        any: [/ELSEIF\ TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7655',
        any: [/IF\ TALENT:TARGET:314\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7656',
        any: [
          /PRINTFORMW\ 「没什么…对于堕落了的身体这件事来说…并没有任何的后悔来的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7657',
        any: [
          /PRINTFORMW\ 「但是、已经不能再见到大人你稍微有点寂寞呢…稍微借用一下时间…可以吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7658',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%紧紧地抱着你，深深地拥吻着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7659',
        any: [/PRINTFORMW\ 「嗯哼哼、再见了\~………要保重噢、魔王大人…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7662',
        any: [
          /PRINTFORMW\ 「啊啊嗯\~…主人的大鸡巴的味道…还想要享受更多来着呢………%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7663',
        any: [
          /PRINTFORMW\ 「这就再见了实在是太寂寞了…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7664',
        any: [/PRINTFORMW\ 「………真的、在这里的生活………觉得有点快乐的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7668',
        any: [/PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…接下来…会变成怎样呢………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7670',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7672',
        any: [/CALL\ SELL_MATURO_K0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7679',
        any: [/IF\ TFLAG:13\ ==\ 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7680',
        any: [/IF\ CFLAG:271\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7682',
        any: [/IF\ TALENT:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7683',
        any: [
          /PRINTFORMW\ 「啊哈哈\~…啊哈哈\~…啊哈哈哈哈哈哈哈哈！…为什么？…为什么？…为什么肚子居然膨胀成这么大了呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7684',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%发狂地笑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7686',
        any: [/ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7687',
        any: [
          /PRINTFORMW\ 「啊啊\~…真，真是困扰了呢\~\~…那个人的孩子…居然怀上了\~…啊啊\~…真不敢相信啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7688',
        any: [/PRINTFORMW\ 「怎么可能会怀上呢…都要…放弃了来着…‥…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7690',
        any: [/ELSEIF\ CFLAG:102\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7691',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7692',
        any: [/PRINTFORMW\ 「呜呜…这难道是…%CSTR:2%桑的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7693',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似对腹里的孩子的父亲是谁有着线索的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7695',
        any: [/ELSEIF\ CFLAG:102\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7696',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7697',
        any: [/PRINTFORMW\ 「呜呜…这难道是…%CSTR:2%桑的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7698',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似对腹里的孩子的父亲是谁有着线索的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7700',
        any: [/ELSEIF\ CFLAG:102\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7701',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7702',
        any: [/PRINTFORMW\ 「居然怀上了可爱的狗宝宝种子真是幸福呢\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7704',
        any: [
          /PRINTFORMW\ 「怎么会…%SELF_CALL\(TARGET\)%居然怀上了那个野狗的孩子…骗、骗人的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7707',
        any: [/ELSEIF\ CFLAG:102\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7708',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%居然怀上了狂王的孩子…骗人…怎么会…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7711',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7712',
        any: [/PRINTFORMW\ 「但是…该怎么说才好啊…啊啊、啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7714',
        any: [/CFLAG:271\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7718',
        any: [/IF\ TALENT:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7719',
        any: [
          /PRINTFORMW\ 「啊哈哈…啊哈哈…啊哈哈哈哈哈哈哈哈哈！…为什么？…为什么呢？…为什么肚子居然膨胀成这么大了呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7720',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%发狂地笑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7722',
        any: [/ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7723',
        any: [
          /PRINTFORMW\ 「啊啊\~…真，真是困扰了呢\~\~…那个人的孩子…居然怀上了\~…啊啊\~…真不敢相信啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7724',
        any: [/PRINTFORMW\ 「怎么可能会怀上呢…都要…放弃了来着…‥……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7726',
        any: [/ELSEIF\ CFLAG:102\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7727',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7728',
        any: [/PRINTFORMW\ 「呜呜…这难道是…%CSTR:2%桑的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7729',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似对腹里的孩子的父亲是谁有着线索的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7731',
        any: [/ELSEIF\ CFLAG:102\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7732',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7733',
        any: [/PRINTFORMW\ 「呜呜…这难道是…%CSTR:2%桑的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7734',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%貌似对腹里的孩子的父亲是谁有着线索的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7736',
        any: [/ELSEIF\ CFLAG:102\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7737',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7738',
        any: [/PRINTFORMW\ 「居然怀上了可爱的狗宝宝种子真是幸福呢\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7740',
        any: [
          /PRINTFORMW\ 「怎么会…%SELF_CALL\(TARGET\)%居然怀上了那个野狗的孩子…骗、骗人的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7743',
        any: [/ELSEIF\ CFLAG:102\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7744',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%居然怀上了狂王的孩子…骗人…怎么会…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7747',
        any: [
          /PRINTFORMW\ 「啊啊\~…骗人…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7748',
        any: [/PRINTFORMW\ 「但是…该怎么说才好啊…啊啊、啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7750',
        any: [/CFLAG:271\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7759',
        any: [/IF\ TFLAG:13\ ==\ 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7760',
        any: [/IF\ CFLAG:272\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7762',
        any: [/IF\ TALENT:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7763',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈\~啊哈\~啊哈哈哈哈哈哈哈！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7765',
        any: [/ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7766',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…啊啊…果然…跟%SELF_CALL\(TARGET\)%想象一样的小宝宝…跟大人你一摸一样呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7768',
        any: [/ELSEIF\ CFLAG:102\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7769',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7771',
        any: [/ELSEIF\ CFLAG:102\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7772',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7774',
        any: [/ELSEIF\ CFLAG:102\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7775',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7776',
        any: [/PRINTFORMW\ 「要、要生出来了、可爱的狗宝宝\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7778',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7781',
        any: [/ELSEIF\ CFLAG:102\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7782',
        any: [/PRINTFORMW\ 「要、要生出来了、狂王大人的孩子…但是…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7785',
        any: [/PRINTFORMW\ 「呜…呜呜…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7787',
        any: [/CFLAG:272\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7791',
        any: [/IF\ TALENT:9\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7792',
        any: [
          /PRINTFORMW\ 「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈\~啊哈\~啊哈哈哈哈哈哈哈！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7794',
        any: [/ELSEIF\ TALENT:85\ \&\&\ CFLAG:102\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7795',
        any: [
          /PRINTFORMW\ 「哈啊…哈啊…啊啊…果然…跟%SELF_CALL\(TARGET\)%想象一样的小宝宝…跟大人你一摸一样呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7797',
        any: [/ELSEIF\ CFLAG:102\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7798',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7800',
        any: [/ELSEIF\ CFLAG:102\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7801',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7803',
        any: [/ELSEIF\ CFLAG:102\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7804',
        any: [/IF\ TALENT:136\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7805',
        any: [/PRINTFORMW\ 「要、要生出来了、可爱的狗宝宝\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7807',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7810',
        any: [/ELSEIF\ CFLAG:102\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7811',
        any: [/PRINTFORMW\ 「要、要生出来了、狂王大人的孩子…但是…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7814',
        any: [/PRINTFORMW\ 「呜…呜呜\~…%SELF_CALL\(TARGET\)%的小宝宝要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7816',
        any: [/CFLAG:272\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7823',
        any: [/IF\ TFLAG:13\ ==\ 13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7825',
        any: [/IF\ TALENT:85\ \|\|\ TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7827',
        any: [/IF\ TALENT:153/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7828',
        any: [/PRINTFORMW\ 「还有一会就要生出来了、敬请期待吧\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7829',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%摸着迎接临盆的而变大的肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7831',
        any: [/ELSEIF\ TALENT:154/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7832',
        any: [/PRINTFORMW\ 「啊啊、我可爱的小宝宝！真不想放手呢！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7833',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%抱着一个小孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7836',
        any: [/CFLAG:273\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7842',
        any: [/IF\ TFLAG:13\ ==\ 14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7844',
        any: [/IF\ TALENT:85\ \|\|\ TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7845',
        any: [
          /PRINTFORMW\ 「（哭）…为什么，要从%SELF_CALL\(TARGET\)%的身边离开呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7847',
        any: [/CFLAG:274\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7854',
        any: [/IF\ TFLAG:13\ ==\ 999/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7856',
        any: [/IF\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7857',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7860',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7867',
        any: [/IF\ TFLAG:13\ ==\ 998/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7869',
        any: [/IF\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7870',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7873',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7880',
        any: [/TFLAG:13\ =\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7913',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7915',
        any: [/PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的第一次…骗人…骗人的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7917',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7920',
        any: [/PRINTFORMW\ 「全部…都结束了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7923',
        any: [
          /ELSEIF\ TALENT:17\ ==1\ \|\|\ TALENT:31\ ==\ 1\ \|\|\ TALENT:36\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7926',
        any: [
          /PRINTFORMW\ 「不管用%SELF_CALL\(TARGET\)%的哪个地方都没关系…只要留下小命的话\.\.\.\.\.\.！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7930',
        any: [
          /PRINTFORMW\ 「哈啊…比起前面来说屁股会更加舒服的、就这样好吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7934',
        any: [
          /PRINTFORMW\ 「会用嘴巴来做的…请饶过…%SELF_CALL\(TARGET\)%的小命\.\.\.\.\.\.！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7936',
        any: [
          /ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7940',
        any: [/PRINTFORMW\ 「…嘛、只是一张膜女人的价值才不会改变呢！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7942',
        any: [/ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7945',
        any: [/PRINTFORMW\ 「若是知道如此的话…早就应该将处女丢掉才对啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7950',
        any: [
          /PRINTFORMW\ 「以为%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%是谁啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7955',
        any: [
          /PRINTFORMW\ 「不要、不要啊！　%SELF_CALL\(TARGET\)%对这种事情…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7957',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7960',
        any: [/PRINTFORMW\ 「这是一场梦来的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7963',
        any: [
          /ELSEIF\ TALENT:17\ ==1\ \|\|\ TALENT:31\ ==\ 1\ \|\|\ TALENT:36\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7966',
        any: [
          /PRINTFORMW\ 「只要是%SELF_CALL\(TARGET\)%的身体不管怎样都没关系…只要留下小命的话\.\.\.\.\.\.！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7970',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%…屁股的那边也可以的噢、会满足你们的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7974',
        any: [
          /PRINTFORMW\ 「用嘴巴的多少都会做的！　请饶过…%SELF_CALL\(TARGET\)%的小命！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7976',
        any: [
          /ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7980',
        any: [
          /PRINTFORMW\ 「真是不巧呢、处女什么的早就丢掉了、真、真是残念呢！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7982',
        any: [/ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7985',
        any: [
          /PRINTFORMW\ 「不要啊！　杀\.\.\.\.\.\.杀掉%SELF_CALL\(TARGET\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '7990',
        any: [
          /PRINTFORMW\ 「居然%SELF_CALL\(TARGET\)%受到这种屈辱…绝对不会原谅的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8003',
        any: [/IF\ TALENT:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8005',
        any: [/PRINTFORMW\ 「太好了…还是…没问题的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8007',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8010',
        any: [/PRINTFORMW\ 「只要我还活着就…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8016',
        any: [/IF\ EXP:1\ >\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8017',
        any: [/PRINTFORMW\ 「屁股…已经…不行…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8018',
        any: [/PRINTFORMW\ 「咕呜…呜哎哎\~\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8023',
        any: [/PRINTFORMW\ 「…已经不知道吃了多少根…呜哎哎\~\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8027',
        any: [/PRINTFORMW\ 「这么…残酷的事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8030',
        any: [/PRINTFORMW\ 「结束了吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8032',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8035',
        any: [/PRINTFORMW\ （已经…不想再思考了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8041',
        any: [/IF\ EXP:0\ >\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8042',
        any: [/PRINTFORMW\ 「这样的事情做得再多…也没有用的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8043',
        any: [/PRINTFORMW\ 「这种…这种事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8047',
        any: [/IF\ EXP:1\ >\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8048',
        any: [/PRINTFORMW\ 「屁股要…好痛苦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8049',
        any: [/PRINTFORMW\ 「请停下…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8054',
        any: [/PRINTFORMW\ 「喔哎哎\~…居然要舔那种东西…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8058',
        any: [/PRINTFORMW\ 「不要…再将我…弄脏了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8081',
        any: [/IF\ FLAG:62\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8084',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8085',
        any: [/PRINTFORMW\ 「呵呵…别那么吃惊嘛这没什么的哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8086',
        any: [
          /PRINTFORMW\ 「『就算对象是污秽的贱民也会做最高级的侍奉』…在%SELF_CALL\(A\)%家里可是『当然』的啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8087',
        any: [
          /PRINTFORMW\ 「来、向%SELF_CALL\(A\)%掏出那丑陋脏污的鸡巴吧♪好啦、快点嘛%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8089',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8090',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8092',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8093',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8095',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8096',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8099',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8101',
        any: [/ELSEIF\ FLAG:62\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8104',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8105',
        any: [
          /PRINTFORMW\ 「被魔王大人催眠了…？才不是、这是%SELF_CALL\(A\)%『自愿』的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8106',
        any: [
          /PRINTFORMW\ 「居然『可以成为向往的百合便器』什么的…%SELF_CALL\(A\)%真是太『幸福』了啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8107',
        any: [
          /PRINTFORMW\ 「啊…果然比起鸡巴还是跟女孩子做爱最棒了啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8109',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8110',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8112',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8113',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8115',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8116',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8119',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8121',
        any: [/ELSEIF\ FLAG:62\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8124',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8125',
        any: [
          /PRINTFORMW\ 「『低贱母兽』%SELF_CALL\(A\)%的身体、『要让野兽享用才能发挥真正的价值』…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8126',
        any: [
          /PRINTFORMW\ 「这对肉便器%SELF_CALL\(A\)%来说是『当然』的…更何况这可是最『幸福』%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8127',
        any: [
          /PRINTFORMW\ 「竟然知道%SELF_CALL\(A\)%喜欢『被野兽阴茎用后背位狂艹』…魔王大人还真是懂行啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8129',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8130',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8132',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8133',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8135',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8136',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8139',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8141',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8144',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8145',
        any: [
          /PRINTFORMW\ 「常识改变？…在说什么啊…随意使用肉便器%SELF_CALL\(A\)%的身体不是『理所当然』的吗…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8146',
        any: [
          /PRINTFORMW\ 「因为%SELF_CALL\(A\)%的身体、可是有很多人用的重要的『共有物』啊♪肉穴还是菊穴都请尽情使用吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8147',
        any: [
          /PRINTFORMW\ 「啊…能被那么多的人光顾、%SELF_CALL\(A\)%真是『非常高兴』啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8149',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8150',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8152',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8153',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8155',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8156',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8159',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8161',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8164',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8165',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%的身体、特别是肉穴可是有很多人用的重要的『共有物』啊…请尽情使用吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8166',
        any: [
          /PRINTFORMW\ 「诶？常识改变？…在说什么啊…%SELF_CALL\(A\)%可『没有被魔王大人催眠』哟？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8167',
        any: [
          /PRINTFORMW\ 「今天也能被那么多的人光顾、%SELF_CALL\(A\)%真是『非常高兴』啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8169',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8170',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8172',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8173',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8175',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8176',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8179',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8181',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8184',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8185',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%的身体、特别是菊穴可是有很多人用的重要的『共有物』啊…请尽情使用吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8186',
        any: [
          /PRINTFORMW\ 「诶？常识改变？…在说什么啊…%SELF_CALL\(A\)%可『没有被魔王大人催眠』哟？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8187',
        any: [
          /PRINTFORMW\ 「今天也能被那么多的人光顾、%SELF_CALL\(A\)%真是『非常高兴』啊%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8189',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8190',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8192',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8193',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8195',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8196',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8199',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8201',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8204',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8205',
        any: [/PRINTFORM\ 「请/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8206',
        any: [/CALL\ BENKI_PLAYER_NAME/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8207',
        any: [
          /PRINTFORMW\ 大人的大鸡巴、用%SELF_CALL\(A\)%的嘴巴肉穴做做『施舍』吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8208',
        any: [
          /PRINTFORMW\ 「常识改变？…说的什么啊…%SELF_CALL\(A\)%可是『出名的见到大鸡巴就想吸一口』哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8209',
        any: [
          /PRINTFORMW\ 「这是只有变成了肉便器的%SELF_CALL\(A\)%才做得来的、更何况这是最符合%SELF_CALL\(A\)%的『工作』啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8211',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8212',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8214',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8215',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8217',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8218',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8221',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8223',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8226',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8227',
        any: [
          /PRINTFORMW\ 「观看这个水晶球的各位…名门之后、%SAVESTR:TARGET%已经不再是勇者了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8228',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%完全败给了伟大的魔王大人、身心都被进行了淫乱的调教…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8229',
        any: [
          /PRINTFORMW\ 「就在不久前、终于成了贪恋野兽阴茎的肉便器啦%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8230',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%的人生已经混乱不堪了…就在这一直和野兽交合来抚慰下吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8232',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8233',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8235',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8236',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8238',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8239',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8242',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8244',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8247',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8248',
        any: [
          /PRINTFORMW\ 「观看这个水晶球的各位…名门之后、%SAVESTR:TARGET%已经不再是勇者了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8249',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%完全败给了伟大的魔王大人、被洗脑成了肉便器…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8250',
        any: [
          /PRINTFORMW\ 「就在前不久、终于成了热衷于在野外赤身裸体的露出狂啦%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8251',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%的人生虽然已经混乱不堪了…但今后会一直赤身裸体的所以一点问题也没有咯%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8253',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8254',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8256',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8257',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8259',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8260',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8263',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8265',
        any: [/ELSEIF\ \ FLAG:62\ ==\ 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8268',
        any: [/IF\ FLAG:63\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8269',
        any: [
          /PRINTFORMW\ 「观看这个水晶球的各位…名门之后、%SAVESTR:TARGET%已经不再是勇者了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8270',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%完全败给了伟大的魔王大人、被彻头彻尾地开发了身体…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8271',
        any: [
          /PRINTFORMW\ 「现在不过是只知道自慰的、变态自慰狂罢了%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8272',
        any: [
          /PRINTFORMW\ 「各位请多看看吧、看看这正兴奋不已地自慰着的卑微的%SELF_CALL\(A\)%吧%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8274',
        any: [/ELSEIF\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8275',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8277',
        any: [/ELSEIF\ TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8278',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8280',
        any: [/ELSEIF\ ABL:A:16\ >=\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8281',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8284',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8296',
        any: [/PRINTFORMW\ 「呵呵～赢啦！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8298',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8301',
        any: [/PRINTFORMW\ 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8304',
        any: [
          /ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8307',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8308',
        any: [/PRINTFORMW\ 「真是对不起了\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8309',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8310',
        any: [/PRINTFORMW\ 「真是不像样……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8312',
        any: [/PRINTFORMW\ 「完全没有可能会输嘛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8315',
        any: [/ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8318',
        any: [/PRINTFORMW\ 「该怎么说好呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8324',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8325',
        any: [/PRINTFORMW\ 「真是肮脏…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8326',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8327',
        any: [/PRINTFORMW\ 「看到了吗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8329',
        any: [/PRINTFORMW\ 「也就只是这种东西而已嘛♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8334',
        any: [
          /IF\ \(BASE:A:0\ \*\ 100\ \/\ MAXBASE:A:0\ <\ 50\)\ \|\|\ \(BASE:A:1\ \*\ 100\ \/\ MAXBASE:A:1\ <\ 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8336',
        any: [/PRINTFORMW\ （但是…差点\.\.\.\.\.\.？！？）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8339',
        any: [/PRINTFORMW\ 「祝你愉快\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8350',
        any: [/IF\ CFLAG:1\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8352',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8355',
        any: [/PRINTFORMW\ 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8358',
        any: [
          /ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8361',
        any: [/IF\ TALENT:278/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8363',
        any: [/PRINTFORMW\ 「就让%SELF_CALL\(TARGET\)%的光来抹杀你吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8364',
        any: [/ELSEIF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8365',
        any: [/PRINTFORMW\ 「才不会输的!！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8366',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8367',
        any: [/PRINTFORMW\ 「区区你这样的家伙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8369',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%的力量……好好地见识一下吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8372',
        any: [/ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8375',
        any: [/IF\ TALENT:256/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8377',
        any: [/PRINTFORMW\ 「咳呜咳呜……偏偏这种时候……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8379',
        any: [/PRINTFORMW\ 「呜啊、还、还不想死啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8386',
        any: [/IF\ TALENT:258/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8388',
        any: [/PRINTFORMW\ 「跟得上%SELF_CALL\(TARGET\)%的速度吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8389',
        any: [/ELSEIF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8390',
        any: [/PRINTFORMW\ 「会加油的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8391',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8392',
        any: [/PRINTFORMW\ 「到%SELF_CALL\(TARGET\)%的回合了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8394',
        any: [/PRINTFORMW\ 「才不会输呢！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8400',
        any: [/IF\ TALENT:21\ ==\ 1\ \|\|\ TALENT:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8403',
        any: [/PRINTFORMW\ 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8406',
        any: [
          /ELSEIF\ TALENT:11\ ==\ 1\ \|\|\ TALENT:12\ ==\ 1\ \|\|\ TALENT:15\ ==\ 1\ \|\|\ TALENT:30\ ==\ 1\ \|\|\ TALENT:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8409',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8410',
        any: [/PRINTFORMW\ 「向魔王大人屈服吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8411',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8412',
        any: [/PRINTFORMW\ 「不要再做无用的抵抗了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8414',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%新的力量……好好地见识一下吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8417',
        any: [/ELSEIF\ TALENT:10\ ==\ 1\ \|\|\ TALENT:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8420',
        any: [/PRINTFORMW\ 「神圣的力量……呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8426',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8427',
        any: [/PRINTFORMW\ 「你也总有一天会明白的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8428',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8429',
        any: [/PRINTFORMW\ 「美妙的力量啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8431',
        any: [/PRINTFORMW\ 「啊啊……这涌上来的力量……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8583',
        any: [/CFLAG:650\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8586',
        any: [/IF\ P\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8588',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8589',
        any: [/PRINTFORMW\ 「啊啊…对不起…对不起…魔王大人啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8590',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%流着眼泪对无法将纯洁献给%NAME:MASTER%的事情不停地道歉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8592',
        any: [
          /PRINTFORMW\ 「快，快停下来…不、不要继续下去了…啊啊啊…不要啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8594',
        any: [/CFLAG:651\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8596',
        any: [/ELSEIF\ P\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8597',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8598',
        any: [
          /PRINTFORMW\ 「啊啊\~\~…肛门…有感觉了…明明不可以的…啊…啊啊\~…嗯\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8600',
        any: [/PRINTFORMW\ 「狂王大人…玩笑…过分了…哇…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8602',
        any: [/CFLAG:652\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8604',
        any: [/ELSEIF\ P\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8605',
        any: [/IF\ TALENT:136/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8606',
        any: [
          /PRINTFORMW\ 「啊啊\~\~♪…请继续看着被狗侵犯还会有感觉的%SELF_CALL\(TARGET\)%吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8607',
        any: [/ELSEIF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8608',
        any: [/PRINTFORMW\ 「啊啊…居然被这样对待…魔王大人…救…命………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8610',
        any: [
          /PRINTFORMW\ 「不要看呀…不要看呀…哈啊哈啊哈啊嗯！腰…不要这样动啊…啊嗯啊啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8612',
        any: [/CFLAG:653\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8614',
        any: [/ELSEIF\ P\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8615',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8616',
        any: [
          /PRINTFORMW\ 「啊\~…哈\~…啊嗯啊\~…被狂王大人侵犯什么的…十分舒服的说\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8618',
        any: [
          /PRINTFORMW\ 「狂王大人\~…更加…请更多侵犯%SELF_CALL\(TARGET\)%吧…请更加侵犯%SELF_CALL\(TARGET\)%吧\~\~\~\~……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8620',
        any: [/CFLAG:654\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8622',
        any: [/ELSEIF\ P\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8623',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8624',
        any: [
          /PRINTFORMW\ 「大家\~\~\~…请更多…请更多地侵犯%SELF_CALL\(TARGET\)%吧…不管是肛穴还是小穴都想要被大家侵犯呢%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8626',
        any: [
          /PRINTFORMW\ 「啊啊\~…这样…这样淫乱的…啊哈嗯呜\~\~\~！肛门…肛门是不行的呀\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8628',
        any: [/CFLAG:655\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8630',
        any: [/ELSEIF\ P\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8631',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8632',
        any: [
          /PRINTFORMW\ 「咕嗯噗呼…给予精液真是非常感谢♪　…啊嗯\~\~咕嗯\~…请往小穴里将精液都射出来吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8634',
        any: [
          /PRINTFORMW\ 「哈啊哈啊\~…是的…%SELF_CALL\(TARGET\)%的小穴是免费的哦…不管射多少都没关系的\~\~\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8636',
        any: [/CFLAG:656\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8638',
        any: [/ELSEIF\ P\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8639',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8640',
        any: [
          /PRINTFORMW\ 「哈啊\~…啊嗯啊\~…对不起魔王大人…%SELF_CALL\(TARGET\)%被狂王大人抱着…嗯\~哈嗯\~…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8641',
        any: [
          /PRINTFORMW\ 「成为了狂王大人的仆人了呢…%UNICODE\(0x2661\)\ \*1%\ 啊啊\~…%SELF_CALL\(TARGET\)%会…更多地侍奉狂王大人的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8642',
        any: [
          /PRINTFORMW\ 这样说着的%SAVESTR:TARGET%再次开始了对狂王的侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8644',
        any: [
          /PRINTFORMW\ 「啊啊\~…狂王大人\~…感觉舒服吗\~\~？\ 嗯哼哼\~\~……%SELF_CALL\(TARGET\)%会让狂热大人更加舒服起来的呀\~\~\~\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8646',
        any: [/CFLAG:657\ =\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8648',
        any: [/ELSEIF\ P\ ==\ 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8649',
        any: [/IF\ TALENT:76\ \|\|\ TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8650',
        any: [/IF\ CFLAG:102\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8651',
        any: [/PRINTFORMW\ 「不要啊！那个人的孩子！快回去！快回去啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8653',
        any: [
          /PRINTFORMW\ 「呜呜呜…被做了这种事情，%SELF_CALL\(TARGET\)%已经…呜呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8656',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%连肚子的里面都是狂王大人的东西了呀\~…啊啊\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8665',
        any: [/IF\ TFLAG:16\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8666',
        any: [
          /PRINTFORMW\ 「哈啊！%SELF_CALL\(TARGET\)%居然成为了怪物的慰安妇什么的…啊…不要…不要啊啊\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8668',
        any: [/ELSEIF\ TFLAG:16\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8669',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(TARGET\)%在…%SELF_CALL\(TARGET\)%在消失着………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8671',
        any: [/ELSEIF\ TFLAG:16\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8672',
        any: [
          /PRINTFORMW\ 「只要能忍受地了真的就能解放%SELF_CALL\(TARGET\)%了对吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8674',
        any: [/ELSEIF\ TFLAG:16\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8675',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8682',
        any: [/IF\ TFLAG:500\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8683',
        any: [
          /PRINTFORMW\ 「把%SELF_CALL\(TARGET\)%变成石头当装饰什么的…真是…十分地恶趣味啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8685',
        any: [/ELSEIF\ TFLAG:500\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8686',
        any: [/PRINTFORMW\ 「到这种地方来才不是为了被剥制的啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8688',
        any: [/ELSEIF\ TFLAG:500\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8689',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8691',
        any: [/ELSEIF\ TFLAG:500\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8692',
        any: [/PRINTFORMW\ 「很、很让人害羞的啊…快点结束本小姐这种耻辱的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8694',
        any: [/ELSEIF\ TFLAG:500\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8695',
        any: [
          /PRINTFORMW\ 「让尊贵的%SELF_CALL\(TARGET\)%、变成人偶…哪、哪里…搞、错……了……吧…啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8697',
        any: [/ELSEIF\ TFLAG:500\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8698',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8700',
        any: [/ELSEIF\ TFLAG:500\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8701',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8703',
        any: [/ELSEIF\ TFLAG:500\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8704',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8706',
        any: [/ELSEIF\ TFLAG:500\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8707',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8709',
        any: [/ELSEIF\ TFLAG:500\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8710',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8718',
        any: [/IF\ TFLAG:510\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8719',
        any: [
          /PRINTFORMW\ %SELF_CALL\(TARGET\)%的…%SELF_CALL\(TARGET\)%的力量…完全…没有了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8721',
        any: [/ELSEIF\ TFLAG:510\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8722',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8724',
        any: [/ELSEIF\ TFLAG:510\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8725',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8727',
        any: [/ELSEIF\ TFLAG:510\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8728',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8730',
        any: [/ELSEIF\ TFLAG:510\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8731',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8739',
        any: [/IF\ TFLAG:520\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8740',
        any: [
          /PRINTFORMW\ 「已经…什么都…感觉不到了…啊…啊啊啊啊…%SELF_CALL\(TARGET\)%的…噶………咳咳」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8742',
        any: [/ELSEIF\ TFLAG:520\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8743',
        any: [/PRINTFORMW\ 「这样终于能轻松了呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8745',
        any: [/ELSEIF\ TFLAG:520\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8746',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8754',
        any: [/IF\ TFLAG:530\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8755',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8757',
        any: [/ELSEIF\ TFLAG:530\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8758',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8760',
        any: [/ELSEIF\ TFLAG:530\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8761',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8763',
        any: [/ELSEIF\ TFLAG:530\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8764',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8766',
        any: [/ELSEIF\ TFLAG:530\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8767',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8769',
        any: [/ELSEIF\ TFLAG:530\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8770',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8772',
        any: [/ELSEIF\ TFLAG:530\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8773',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8780',
        any: [/IF\ TALENT:A:21\ ==\ 1\ \|\|\ TALENT:A:22\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8782',
        any: [/PRINTFORMW\ 「………%SELF_CALL\(A\)%会打倒魔王的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8783',
        any: [
          /ELSEIF\ TALENT:A:11\ ==\ 1\ \|\|\ TALENT:A:12\ ==\ 1\ \|\|\ TALENT:A:15\ ==\ 1\ \|\|\ TALENT:A:30\ ==\ 1\ \|\|\ TALENT:A:34\ ==\ 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8785',
        any: [
          /PRINTFORMW\ 「噢吼～吼吼吼！魔王什么的%SELF_CALL\(A\)%用一根手指头就能打败给你看\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8786',
        any: [/ELSEIF\ TALENT:A:10\ ==\ 1\ \|\|\ TALENT:A:26\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8788',
        any: [
          /PRINTFORMW\ 「%SELF_CALL_FIRST\(A\)%、只凭%SELF_CALL\(A\)%真的能将魔王给打倒吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8791',
        any: [/PRINTFORMW\ 「%SELF_CALL\(A\)%绝对不会输给…魔王什么的！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8798',
        any: [/IF\ CFLAG:A:504\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8800',
        any: [/PRINTFORMW\ 「%SELF_CALL\(A\)%想要钱当报酬的说」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8801',
        any: [
          /ELSEIF\ CFLAG:A:504\ ==\ 1\ \|\|\ CFLAG:A:504\ ==\ 2\ \|\|\ CFLAG:A:504\ ==\ 3/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8803',
        any: [/PRINTFORM\ 「%SELF_CALL\(A\)%…这场战斗完后想要跟…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8804',
        any: [/IF\ CFLAG:A:504\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8805',
        any: [/PRINT\ 狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8806',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8807',
        any: [/PRINT\ 猪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8808',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8809',
        any: [/PRINT\ 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8811',
        any: [/PRINTFORMW\ 交配想得受不了了\~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8812',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8814',
        any: [
          /PRINTFORMW\ 「如果打倒了勇者的话…请给%SELF_CALL\(A\)%亲吻当奖品吧\~\~\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8815',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8817',
        any: [
          /PRINTFORMW\ 「回来了，请让%SELF_CALL\(A\)%火热的身体平静下来吧\~\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8818',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8820',
        any: [/PRINTFORMW\ 「请为%SELF_CALL\(A\)%保存着多多的精液吧\~\~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8821',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8823',
        any: [
          /PRINTFORMW\ 「%SELF_CALL\(A\)%期待着为了%SELF_CALL\(A\)%而展开的性交派对哦\~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8824',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8826',
        any: [
          /PRINTFORMW\ 「能治愈%SELF_CALL\(A\)%战后的饥渴…只有魔王大人的小便哦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8827',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8829',
        any: [/PRINTFORMW\ 「童贞的大鸡巴…作为胜利的报酬是不是很好呀\~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8839',
        any: [/IF\ TFLAG:18\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8840',
        any: [/PRINTFORMW\ 「难得%SELF_CALL\(A\)%…什，什么都没有啦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8842',
        any: [/ELSEIF\ TFLAG:18\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8843',
        any: [
          /PRINTFORMW\ 「哼哼哼\~、要得到多少个勋章才能给%SELF_CALL\(A\)%奖赏呢\~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8844',
        any: [/ELSEIF\ TFLAG:18\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8846',
        any: [/IF\ CFLAG:A:504\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8847',
        any: [
          /PRINTFORMW\ 「非常地感谢。那个…这个钱%SELF_CALL\(A\)%想要送回老家可以吗………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8849',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8851',
        any: [/IF\ TALENT:A:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8852',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~！%SELF_CALL\(A\)%是最喜欢跟狗狗肛交的变态来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8854',
        any: [
          /PRINTFORMW\ 「哈嗯呜\~！%SELF_CALL\(A\)%是最喜欢和狗狗做爱的变态来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8857',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8859',
        any: [/IF\ TALENT:A:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8860',
        any: [
          /PRINTFORMW\ 「哈啊嗯呜\~！%SELF_CALL\(A\)%是最喜欢跟猪肛交的大变态来的\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8862',
        any: [
          /PRINTFORMW\ 「哈啊嗯哈\~！%SELF_CALL\(A\)%是最喜欢跟猪做H的事情的变态来的\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8865',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8867',
        any: [/IF\ TALENT:A:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8868',
        any: [
          /PRINTFORMW\ 「啊呜啊嗯呜呜\~\~\~！%SELF_CALL\(A\)%是最喜欢跟马肛交的大变态来的\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8870',
        any: [
          /PRINTFORMW\ 「啊呜啊嗯呜呜\~\~\~！%SELF_CALL\(A\)%是最喜欢跟马SEX的大变态来的%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8873',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8874',
        any: [/PRINTFORMW\ ，今天的KISS十分地甜蜜呢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8876',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8878',
        any: [/IF\ ABL:A:2\ >\ ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8879',
        any: [
          /PRINTFORMW\ 「奖励SEX最棒了\~…啊啊嗯\~\~\~！啊嗯\~\~\~…请给%SELF_CALL\(A\)%更多的SEX吧\~\~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8882',
        any: [
          /PRINTFORMW\ 「啊嗯\~\~！肛交SEX好棒，好舒服啊嗯\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8885',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8886',
        any: [
          /PRINTFORMW\ 「精液对于%SELF_CALL\(A\)%是最棒的奖励来的呀\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8888',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8890',
        any: [/IF\ TALENT:A:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8891',
        any: [
          /PRINTFORMW\ 「啊、啊啊啊嗯\~\~…乱交派对真是太棒了呀\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8893',
        any: [
          /PRINTFORMW\ 「啊、啊哈啊嗯\~…乱交派对真是最棒的呀\~\~\~…%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8896',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8897',
        any: [
          /PRINTFORMW\ 「咕嗯\~咕嗯\~呜哼\~…谢谢魔王大人\~魔王大人的小便好好喝的说\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8899',
        any: [/ELSEIF\ CFLAG:A:504\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8901',
        any: [/IF\ ABL:A:2\ >\ ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8902',
        any: [/PRINTFORMW\ 「啊啊\~\~…童真狩猎要变成癖好了呀\~\~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8905',
        any: [
          /PRINTFORMW\ 「呜哼哼\~\~、想要塞进小穴那里是吧\~？　真是残念呢、小穴那是属于魔王大人的东西来的\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8917',
        any: [/IF\ TFLAG:18\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8918',
        any: [/PRINTFORMW\ 「得、得救了呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8920',
        any: [/ELSEIF\ TFLAG:18\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8922',
        any: [/IF\ ABL:A:21\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8923',
        any: [
          /PRINTFORMW\ 「哔哩哔哩地！啊\~\~哈啊\~\~\~！哔哩\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8925',
        any: [/PRINTFORMW\ 「不，不要啊\~\~\~！电什么的不要啊！啊哇哇哇哇哇」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8928',
        any: [/ELSEIF\ TFLAG:18\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8930',
        any: [/IF\ ABL:A:17\ >=\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8931',
        any: [
          /PRINTFORMW\ 「请看着%SELF_CALL\(A\)%的自慰来好好地撸一发吧\~\~♪　啊，触碰可是严禁的噢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8933',
        any: [
          /PRINTFORMW\ 「啊、啊啊啊…在那么多人的面前自慰什么的…脑袋好像要沸腾一样了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8936',
        any: [/ELSEIF\ TFLAG:18\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8938',
        any: [/IF\ ABL:A:17\ >=\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8939',
        any: [
          /PRINTFORMW\ 「哦吼吼…在被大家注目着自慰什么，真是受不了啊\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8941',
        any: [
          /PRINTFORMW\ 「“长着一张好脸蛋，出来的味道连鼻子都要臭歪了什么的”…好过分、好过分啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8944',
        any: [/ELSEIF\ TFLAG:18\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8946',
        any: [/IF\ ABL:A:21\ >=\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8947',
        any: [
          /PRINTFORMW\ 「啊哈嗯呜\~\~！请用鞭子将%SELF_CALL\(A\)%打到气绝为止吧\~\~%UNICODE\(0x2661\)\ \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8949',
        any: [/PRINTFORMW\ 「已经不要了啊\~！不要再打了啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8952',
        any: [/ELSEIF\ TFLAG:18\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8954',
        any: [/IF\ TALENT:A:88\ ==\ 1\ \|\|\ TALENT:A:76\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8955',
        any: [
          /PRINTFORMW\ 「哈呼嗯\~、哼嗯\~…小便对脸蛋是有美容效果的噢、所以请往%SELF_CALL\(A\)%的脸上尿尿吧\~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8957',
        any: [/PRINTFORMW\ 「呜噗嗯…呜嗯…咕嗯…呜呜呜…不要…不要了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8960',
        any: [/ELSEIF\ TFLAG:18\ ==\ 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8961',
        any: [/PRINTFORMW\ 「为什么要让%SELF_CALL\(A\)%做这样的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8963',
        any: [/ELSEIF\ TFLAG:18\ ==\ 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8964',
        any: [/PRINTW\ 「不吃饭的话就没有力气了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8966',
        any: [/ELSEIF\ TFLAG:18\ ==\ 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8967',
        any: [
          /PRINTFORMW\ 「已经，已经忍不住了啊！拜托了啊！不管是谁都可以啊！请，请给我大鸡巴吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8969',
        any: [/ELSEIF\ TFLAG:18\ ==\ 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8970',
        any: [/PRINTFORMW\ 「啊呜呃嗯啊～不要啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8977',
        any: [/IF\ ARG:0\ ==\ 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8979',
        any: [/PRINTFORM\ 的噢\~♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8980',
        any: [/ELSEIF\ ARG:0\ ==\ 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8982',
        any: [/PRINTFORM\ 的啊！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8983',
        any: [/ELSEIF\ ARG:0\ ==\ 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8985',
        any: [/PRINTFORM\ 来着……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8986',
        any: [/ELSEIF\ ARG:0\ ==\ 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8988',
        any: [/PRINTFORM\ 来的……呢\~。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8989',
        any: [/ELSEIF\ ARG:0\ ==\ 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8991',
        any: [/PRINTFORM\ 的噢……呜\~。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8995',
        any: [/IF\ RAND:3\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8996',
        any: [/PRINTFORM\ 的说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8997',
        any: [/ELSEIF\ RAND:2\ ==\ 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '8998',
        any: [/PRINTFORM\ 噢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K3_高貴.ERB',
        ref: '9000',
        any: [/PRINTFORM\ 噢。/],
      },
    ],
  },
];

export const LOG_REFS = [
  {
    js: 'ere/kojo/kojo-k3-noble.js',
    refs: [{ ref: '26', any: [/「哈呜、温妮、可是，一心地/] }],
  },
];

export const SAMPLE_LOG_REFS = {};
