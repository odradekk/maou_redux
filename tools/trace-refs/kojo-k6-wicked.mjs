// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #237 口上·K6 悪女；#290 按 js 文件拆出：kojo-k6-wicked.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k6-wicked.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '73-77',
        any: [/FLAG:106 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '79-81',
        any: [/FLAG:106 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '87',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '580-582',
        any: [/;EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '490',
        any: [/@K6_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '678',
        any: [/@KOJO_MESSAGE_COM_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '681-700',
        any: [/CALL COLOSSEUM_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '75',
        any: [/FLAG:106 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '77',
        any: [/FLAG:7 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '81',
        any: [/FLAG:106 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '88-89',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '90-91',
        any: [/SIF TALENT:166 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '96',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '97',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '99',
        any: [/IF TALENT:TARGET:314 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '100',
        any: [/PRINTFORMW 「别、别盯着我看啊！你这家伙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '101',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用比平常的精灵锐利得多的目光直视着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '102',
        any: [/PRINTFORMW 这样的对象应该很难快速驯服吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '103',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '105',
        any: [/ELSEIF TALENT:TARGET:314 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '106',
        any: [/PRINTFORMW 「只要你敢再靠近一步…我就咬断你的喉咙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '107',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%瞪着%SAVESTR:PLAYER%恶狠狠地威胁道。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '108',
        any: [/PRINTFORMW 这样的对象狼应该很难快速驯服吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '109',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '111',
        any: [/ELSEIF TALENT:TARGET:314 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '112',
        any: [
          /PRINTFORMW 「不妨把你身上所具有的魔王的权能都让渡给我，然后去给我扫一辈子的厕所吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '113',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着冷酷的表情凝视着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '114',
        any: [/PRINTFORMW 这样的对象吸血鬼应该很难快速驯服吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '115',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '117',
        any: [/ELSEIF TALENT:TARGET:314 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '118',
        any: [
          /PRINTFORMW 「你就是所谓的魔王？哈哈哈哈…这样的魔王还真是荒谬得令人发笑啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '119',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为愤怒而扬起眉毛，瞪视着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '120',
        any: [
          /PRINTFORMW 稍微大意了一点就被身为无头骑士的她用飞过来的头袭击了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '121',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '123',
        any: [/ELSEIF TALENT:TARGET:314 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '124',
        any: [
          /PRINTFORMW 「像你这种程度的魔王，要不是%SELF_CALL\(TARGET\)%被那些家伙打倒了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '125',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为后悔而露出咬牙切齿的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '126',
        any: [/PRINTFORMW 如果能驯服这样的龙人大概会非常有趣吧……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '127',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '129',
        any: [/ELSEIF TALENT:TARGET:314 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '130',
        any: [
          /PRINTFORMW 「哼，既然被天堂那些大天使驱逐了，就勉勉强强投靠你吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '131',
        any: [
          /PRINTFORMW 虽然是个天使，%SAVESTR:TARGET%却毫不在意的说着这样罪恶的台词。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '132',
        any: [
          /PRINTFORMW 对于这样嚣张的天使所进行的调教，一定要彻底征服她的肉体与心灵才行。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '133',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '135',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '136',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%是被改造才变成魔族的。%SAVESTR:PLAYER%这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '137',
        any: [
          /PRINTFORMW 「呼，哼…变成这样其实也无所谓啦，但好歹先把我身上这些东西解开啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '138',
        any: [
          /PRINTFORMW 「如果%SELF_CALL\(TARGET\)%把你劫持了是不是就可以自己当魔王啦？哈，听起来不错嘛！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '139',
        any: [
          /PRINTFORMW 但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '140',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '142',
        any: [/CFLAG:370 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '144',
        any: [/ELSEIF TALENT:TARGET:314 == 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '145',
        any: [
          /PRINTFORMW 「真是没办法…这样吧，每天都能让我吃饱的话就暂时老老实实听你的话，可以吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '146',
        any: [/PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:PLAYER%要求更好的待遇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '147',
        any: [/PRINTFORMW 有点被霍比特这个种族的价值观吓到了啊……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '148',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '150',
        any: [/ELSEIF TALENT:TARGET:314 == 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '151',
        any: [/PRINTFORMW 「用、用我的矿山来换取我的自由吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '152',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%是矮人，号称自己能付出像黄金矿山那么多的赎金，然而%SAVESTR:PLAYER%并不相信她说的这些。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '153',
        any: [/PRINTFORMW 真正想要的是这个矮人的身体啊……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '154',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '156-157',
        any: [/IF RAND:10 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '157',
        any: [/IF RAND:10 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '158',
        any: [
          /PRINTFORMW 「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！%SELF_CALL\(TARGET\)%绝不会被你洗脑的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '158-159',
        any: [
          /PRINTFORMW 「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！%SELF_CALL\(TARGET\)%绝不会被你洗脑的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '160',
        any: [
          /PRINTFORMW 「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '160-161',
        any: [
          /PRINTFORMW 「喂！你…你想干什么！为什么我的眼睛…放开我！你这个变态！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '162',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%简直不像是一个勇者，征服这样的她应该是很难的吧……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '163',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '164',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '164-165',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '169',
        any: [
          /ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '170',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%是被多次改造后才变成魔族的。%SAVESTR:PLAYER%这个改造的主使者来到的时候，却注意到她脸上的表情有些严峻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '171',
        any: [/PRINTFORMW 「该死…都是因为你这个家伙，我才会变成现在这样子！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '172',
        any: [
          /PRINTFORMW 「哼，你给我小心点，我一定会找机会取代你成为魔王的！现在，给我滚出去！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '173',
        any: [
          /PRINTFORMW 但作为魔族的她只能任你为所欲为，这是来自她本能的对魔族之王的遵从………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '175',
        any: [/CFLAG:370 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '176',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '180',
        any: [/ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '181',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '182',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '183',
        any: [
          /PRINTFORMW 「这个，咳咳，我回来了！啊嗯…唔嗯…反正，%SELF_CALL\(TARGET\)%就是这样人尽可夫的糟糕家伙，有什么大不了的嘛！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '184',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%糟糕的态度简直像一个凌晨回家的妻子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '185',
        any: [
          /PRINTFORMW 「呐，这个水晶球里是狂王想要对魔王大人说的话…总之全都是假的！给我忘掉啊！你给我忘掉那些话！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '187',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '187-188',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '189',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '190',
        any: [
          /PRINTFORMW 「哼，总算是回到这儿了呢。虽然狂王那儿也不坏，但好像还是自己人这里更舒服一点嘛。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '191',
        any: [/PRINTFORMW %SAVESTR:TARGET%想着背叛的经过邪恶地笑了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '193',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '193-194',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '195',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '200',
        any: [/ELSEIF CFLAG:201 < 2 && MARK:2 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '201',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '202',
        any: [
          /PRINTFORMW 「啊，不行…不行，没办法逃跑的话，只能先想个法子把这家伙糊弄着再说了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '203',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看%SAVESTR:PLAYER%的目光似乎变得柔和了一些……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '204',
        any: [/CFLAG:201 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '205',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '208',
        any: [/ELSEIF CFLAG:201 < 3 && MARK:2 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '209',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '210',
        any: [
          /PRINTFORMW 「似乎没那么讨厌这家伙了啊…%SELF_CALL\(TARGET\)%…已经……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '211',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%向%SAVESTR:TARGET%走来，逼得她一步步退后。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '212',
        any: [/PRINTFORMW 「不…不行了…不想抵抗了…反而有点期待啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '213',
        any: [
          /PRINTFORMW 身后就是墙壁，无法退后的%SAVESTR:TARGET%身体都开始颤抖了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '214',
        any: [/CFLAG:201 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '215',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '218',
        any: [/ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '219',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '220',
        any: [/PRINTFORMW 「啊——啊、啊，已经……没办法反抗了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '221',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像奴隶一样来到%SAVESTR:PLAYER%身前，缓缓跪下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '222',
        any: [
          /PRINTFORMW 「至今为止一直…过分地任性呢…对，对不起了…啊啊啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '223',
        any: [
          /PRINTFORMW 流下象征着完全屈服的眼泪，%SAVESTR:TARGET%向%SAVESTR:PLAYER%卑微地低下了头，几乎要吻到你的脚。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '224',
        any: [/CFLAG:201 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '225',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '228',
        any: [
          /ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '229',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '230',
        any: [/PRINTFORMW %SAVESTR:TARGET%双腿呈M字打开，妩媚地看着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '231',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%一直在犯错呢……来干死我啊……狠狠的操我吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '232',
        any: [/PRINTFORMW 温热的舌头诉说着淫猥放荡的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '233',
        any: [/PRINTFORMW 曾经的傲慢不逊完完全全地消失了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '234',
        any: [/CFLAG:201 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '235',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '238',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '239',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '241',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '242',
        any: [
          /PRINTFORMW 被转化为魔族并且反复调教过后，%SAVESTR:TARGET%已经完全陷落了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '243',
        any: [
          /PRINTFORMW 身为魔族的眼睛泛着春光，光是看到你的两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '244',
        any: [/PRINTFORMW 「呼哈，控制不住了…快给我大肉棒吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '246',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '247',
        any: [
          /PRINTFORMW 「啊啊啊…快来把%SELF_CALL\(TARGET\)%的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯%SELF_CALL\(TARGET\)%鲜嫩的小穴吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '248',
        any: [/PRINTFORMW %SAVESTR:TARGET%压抑着体内的性欲流着泪乞求着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '248-249',
        any: [/PRINTFORMW %SAVESTR:TARGET%压抑着体内的性欲流着泪乞求着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '250',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%愈发兴奋地抱住%SAVESTR:PLAYER%，伸出灼热的舌头在脸上舔来舔去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '251',
        any: [
          /PRINTFORMW 「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '252',
        any: [
          /PRINTFORMW 「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… %UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '253',
        any: [/PRINTFORMW 之前那个傲慢不可一世的样子已经完全看不出来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '254',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '255',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '257',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '258',
        any: [
          /PRINTFORMW 被转化为魔族并且反复调教过后，%SAVESTR:TARGET%完全陷落了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '259',
        any: [
          /PRINTFORMW 身为魔族的眼睛泛着春光，光是看到你两腿间就已经淫水泛滥起来，害羞地磨擦着双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '260',
        any: [/PRINTFORMW 「呼哈，控制不住了…快给我大肉棒吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '262',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '263',
        any: [
          /PRINTFORMW 「啊啊啊…快来把%SELF_CALL\(TARGET\)%的处女膜狠狠捅破吧！无论是怎样的家伙都好，来免费侵犯%SELF_CALL\(TARGET\)%鲜嫩的小穴吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '264',
        any: [/PRINTFORMW %SAVESTR:TARGET%压抑着体内的性欲流着泪乞求着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '264-265',
        any: [/PRINTFORMW %SAVESTR:TARGET%压抑着体内的性欲流着泪乞求着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%愈发兴奋地抱住%SAVESTR:PLAYER%伸出灼热的舌头在脸上舔来舔去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '267',
        any: [
          /PRINTFORMW 「哈…哈…要上天了…这样的气味…啊啊啊啊啊啊啊…魔王大人的汗…是最上等的味道…已经…无法思考了啊！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '268',
        any: [
          /PRINTFORMW 「您的大肉棒…真是令人着迷啊…就让我来…服侍您吧… %UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '269',
        any: [/PRINTFORMW 之前那个傲慢不可一世的样子已经完全看不出来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '270',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '271',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '273-274',
        any: [
          /PRINTFORMW 「是啊…唔…啊啊…魔王大人…真好…感觉…只是靠近您…就会充满魔力啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '274',
        any: [
          /PRINTFORMW 「是啊…唔…啊啊…魔王大人…真好…感觉…只是靠近您…就会充满魔力啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '275',
        any: [
          /PRINTFORMW 变成魔族的%SAVESTR:TARGET%在地板上来来回回地走着，大概是受到魔王魔力刺激的缘故，地板上到处都是一摊一摊的爱液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '276',
        any: [
          /PRINTFORMW 发现了这一点的%SAVESTR:PLAYER%故意放出一点魔力，让%SAVESTR:TARGET%艰难地吸收了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '277',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊啊啊…这么棒的身体，真是开心啊啊%UNICODE\(0x2661\) \*3% 请让我变成魔王大人的私有物吧，%SELF_CALL\(TARGET\)%做出了正确的决定呢…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '278',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发自内心地对能成为魔族这件事感到十分欢喜………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '280',
        any: [/IF TALENT:TARGET:0 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '281',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%莞尔一笑，呈M字打开双腿用手托着，像是在诱惑%SAVESTR:PLAYER%一样。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '282',
        any: [
          /PRINTFORMW 「就像是重生了一样…请尽情地享用作为魔族的%SELF_CALL\(TARGET\)%吧！魔王大人那浓厚的精液～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '282-283',
        any: [
          /PRINTFORMW 「就像是重生了一样…请尽情地享用作为魔族的%SELF_CALL\(TARGET\)%吧！魔王大人那浓厚的精液～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '284',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '285',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '285-286',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '288',
        any: [
          /ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '289',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '290',
        any: [/PRINTFORMW %SAVESTR:TARGET%依偎在你怀里说着话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '291',
        any: [
          /PRINTFORMW 「之前是%SELF_CALL\(TARGET\)%错了…对不起…从今往后，什么都听您的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '292',
        any: [/PRINTFORMW 热泪盈眶的她的身姿连忏悔都显得美丽至极。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '293',
        any: [/PRINTFORMW 曾经的傲慢全无踪影…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '294',
        any: [/CFLAG:201 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '295',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '297',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '298',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '300',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '301',
        any: [
          /PRINTFORMW 被转化为魔族并且反复调教过后，%SAVESTR:TARGET%完全陷落了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '302',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '303',
        any: [
          /PRINTFORMW 弯曲双膝低下螓首，亲吻了身为魔王的%SAVESTR:PLAYER%的脚背立下了誓约之吻。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '304',
        any: [/PRINTFORMW 「啊…这种心动…要死了啦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '306',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '307',
        any: [
          /PRINTFORMW 「啊唔…嗯…就把%SELF_CALL\(TARGET\)%的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '308',
        any: [/PRINTFORMW %SAVESTR:TARGET%伏在%SAVESTR:PLAYER%脚下恳求道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '308-309',
        any: [/PRINTFORMW %SAVESTR:TARGET%伏在%SAVESTR:PLAYER%脚下恳求道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '310',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '311',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '313',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '314',
        any: [
          /PRINTFORMW 被转化为魔族并且反复调教过后，%SAVESTR:TARGET%完全陷落了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '315',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%已经完完全全爱上魔王大人了呢……今后也会一直侍奉在魔王大人身边的……%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '316',
        any: [
          /PRINTFORMW 弯曲双膝低下螓首，亲吻了身为魔王的%SAVESTR:PLAYER%的脚背立下了誓约之吻。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '317',
        any: [/PRINTFORMW 「啊…这种心动…要死了啦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '319',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '320',
        any: [
          /PRINTFORMW 「啊唔…嗯…就把%SELF_CALL\(TARGET\)%的处子之身送给您当做礼物吧…要好好疼爱我哟，这可是我小心珍藏到现在的宝物呢………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '321',
        any: [/PRINTFORMW %SAVESTR:TARGET%伏在%SAVESTR:PLAYER%脚下恳求道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '321-322',
        any: [/PRINTFORMW %SAVESTR:TARGET%伏在%SAVESTR:PLAYER%脚下恳求道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '323',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '324',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '326-327',
        any: [
          /PRINTFORMW 「切…明明一开始是以魔王大人的性命作为目标的…怎么会不知不觉就变成这样了啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '327',
        any: [
          /PRINTFORMW 「切…明明一开始是以魔王大人的性命作为目标的…怎么会不知不觉就变成这样了啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '328',
        any: [
          /PRINTFORMW 已经被改造成魔族的%SAVESTR:TARGET%坐在那儿，表情有些落寞。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '329',
        any: [
          /PRINTFORMW 「可是…已经变成这样了啊…已经，离不开魔王大人了呢…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '330',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱住%SAVESTR:PLAYER%深情地亲吻着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '332',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '333',
        any: [
          /PRINTFORMW 「呐，就这样，就这样把我的处女也、也拿去吧！一直以来…都在期待这一天的到来呢…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '334',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%突然变得兴奋起来，很快身体就与%SAVESTR:PLAYER%的腿和尾巴纠缠在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '334-335',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%突然变得兴奋起来，很快身体就与%SAVESTR:PLAYER%的腿和尾巴纠缠在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '336',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '337',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '337-338',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '340',
        any: [/ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '341',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '342',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着恍惚的表情用指甲刮着房间的墙壁。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '343',
        any: [/PRINTFORMW 「想从这里出去…好想出去啊啊啊啊啊…呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '344',
        any: [/PRINTFORMW %SAVESTR:TARGET%的精神受到了难以恢复的巨大创伤……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '345',
        any: [/CFLAG:201 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '346',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '349',
        any: [/ELSEIF ASSI < 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '350',
        any: [/CALL K6_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '359',
        any: [/ELSEIF NO:ASSI == 17/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '361',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '362',
        any: [/IF TALENT:ASSI:165/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '364',
        any: [/IF CFLAG:202 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '366',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '367',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '368',
        any: [
          /PRINTFORMW 『诶？主人，这个人，看起来已经被玩坏掉了的样子呢～』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '369',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '370',
        any: [
          /PRINTFORMW 的确如此，%SAVESTR:TARGET%的精神已经崩溃了，只是呆呆地凝视着%SAVESTR:ASSI%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '372',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '373',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%带着%SAVESTR:ASSI%来看%SAVESTR:TARGET%，两人从上向下俯视着对%SAVESTR:TARGET%品头论足起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '374',
        any: [
          /PRINTFORMW 「啊哈，原来你喜欢这样的孩子吗？不太理解，不过我也不太讨厌的样子呢～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '375',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还以为是自己来凌辱%SAVESTR:ASSI%呢，于是%SAVESTR:PLAYER%告诉她%SAVESTR:ASSI%才是调教者。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '376',
        any: [
          /PRINTFORMW 「诶，今天是这家伙调教%SELF_CALL\(TARGET\)%吗？啊啊啊不要啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '377',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%趁机突袭一下子就把%SAVESTR:TARGET%推倒在地。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '378',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '379',
        any: [
          /PRINTFORMW 『啊哈哈♪…是这样哟…主人说的，或者说姐姐想要反抗…我么？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '380',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '381',
        any: [/PRINTFORMW 房间里回响起%SAVESTR:TARGET%有些愉快意味的惨叫声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '383',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && CFLAG:201 >= 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '384',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%带着%SAVESTR:ASSI%来看%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '385',
        any: [
          /PRINTFORMW 「那个…%SELF_CALL\(TARGET\)%觉得有点意外…我可是，很专一的呢，所以这样的事情…唉…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '386',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%轻轻叹息着，目光在%SAVESTR:PLAYER%与%SAVESTR:ASSI%间划过。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '387',
        any: [/PRINTFORMW 「另外…魔王大人原来喜欢这样的孩子吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '388',
        any: [/IF TALENT:ASSI:85 == 1 \|\| TALENT:ASSI:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '389',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '390',
        any: [
          /PRINTFORMW 『不要介意啦～我和姐姐一样都被魔王大人疼爱着呢～主人可是要我来调教姐姐大人哦～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '391',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '392',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%一边说着这样的话，一边趁%SAVESTR:TARGET%不备推倒了她………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '392-393',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%一边说着这样的话，一边趁%SAVESTR:TARGET%不备推倒了她………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '394',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '395',
        any: [
          /PRINTFORMW 『放心啦，大家都是魔王大人调教出来的哟～魔王大人可是说，把你当做我今天的奖品呢～』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '396',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '397',
        any: [/PRINTFORMW %SAVESTR:ASSI%说着这样的话推倒了%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '397-398',
        any: [/PRINTFORMW %SAVESTR:ASSI%说着这样的话推倒了%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '400-401',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%带着%SAVESTR:ASSI%来看%SAVESTR:TARGET%的时候，她把脸背了过去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '401',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%带着%SAVESTR:ASSI%来看%SAVESTR:TARGET%的时候，她把脸背了过去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '402',
        any: [
          /PRINTFORMW 「把那样的家伙带过来干什么？%SELF_CALL\(TARGET\)%对那样的孩子可没有兴趣啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '403',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%扳过%SAVESTR:TARGET%扭向一边的脸，狠狠打了一耳光。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '404',
        any: [
          /PRINTFORMW 「痛啊…混蛋，为什么…%SELF_CALL\(TARGET\)%做错了……吗……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '405',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%毫不留情地捏住%SAVESTR:TARGET%的脸，把自己的脸靠过去说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '406',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '407',
        any: [
          /PRINTFORMW 『喂喂我亲爱的勇者大人～♪主人说今天我可以调教你哦～所以，你不听话的话我会很难办呢～♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '408',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '408-409',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '410',
        any: [/CFLAG:202 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '411',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '413',
        any: [/ELSEIF CFLAG:202 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '415',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '416',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '417',
        any: [/PRINTFORMW 『被玩坏掉的家伙还真是无趣啊…』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '418',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '419',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%一边说着一边拉着%SAVESTR:TARGET%的头发向上提起。好像是在考虑怎么取乐的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '421',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '422',
        any: [
          /PRINTFORMW 「又…来了…要、要干嘛…又要%SELF_CALL\(TARGET\)%…那…那样吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '423',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想起%SAVESTR:ASSI%上次对自己“温柔”的调教，脸变得通红一片。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '424',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '425',
        any: [/PRINTFORMW 『就是那样哟～姐姐今天的反应也非常可爱呢～♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '426',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '427',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%露出与少女年龄不相称的淫靡表情，温柔地抚摸着%SAVESTR:TARGET%的头发。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '428',
        any: [
          /PRINTFORMW 「唔…%SELF_CALL_FIRST\(TARGET\)%，%SELF_CALL\(TARGET\)%才没有啊…唔…啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '429',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体害羞地颤抖着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '431',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '432',
        any: [
          /PRINTFORMW 「又…来了…要、要干嘛…又要%SELF_CALL\(TARGET\)%…那…那样吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '433',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想起%SAVESTR:ASSI%上次对自己“激烈”的调教，脸变得通红一片。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '434',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '435',
        any: [/PRINTFORMW 『对哦～想要听到姐姐可爱的声音所以就又来了呢～♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '436',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '437',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%把手放在%SAVESTR:TARGET%肩上，舌头舔舐起对方的嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '438',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '439',
        any: [/PRINTFORMW 『啊哈哈哈！在主人来之前先送你一份礼物吧～♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '440',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '441',
        any: [/PRINTFORMW %SAVESTR:TARGET%就这样被推倒了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '442',
        any: [
          /PRINTFORMW 「啊啊…完全没法抵抗这样的孩子啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET, 1\)%………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '443',
        any: [
          /PRINTFORMW 就在%SAVESTR:PLAYER%的面前，%SAVESTR:TARGET%和%SAVESTR:ASSI%开始了水乳交融般的纠缠………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '445-446',
        any: [/PRINTFORMW 「该死…又、又来了啊…这…小混蛋……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '446',
        any: [/PRINTFORMW 「该死…又、又来了啊…这…小混蛋……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '447',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边回忆着与%SAVESTR:ASSI%的交合一边骂着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '448',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '449',
        any: [
          /PRINTFORMW 『啊哈哈！可爱的姐姐！今天我也来满足你了哦～要把姐姐给灌得满满的呢～♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '450',
        any: [/RESETCOLOR/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '451',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还没反应过来就被%SAVESTR:ASSI%给推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '451-452',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还没反应过来就被%SAVESTR:ASSI%给推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '453',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '453-454',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '455-456',
        any: [/;助手○○（○○にY2のキャラ名を入れる）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '482-483',
        any: [/CALL K6_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '483',
        any: [/CALL K6_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '483-484',
        any: [/CALL K6_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '492',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '493',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '494',
        any: [/PRINTFORMW 「呜呜呜…啊呜…呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '495',
        any: [
          /PRINTFORMW 没办法期待已经精神崩溃的%SAVESTR:TARGET%做出什么反应啊………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '496',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '499',
        any: [/ELSEIF MARK:3 == 3 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '501',
        any: [
          /IF MARK:2 == 3 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '502',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '503',
        any: [/PRINTFORMW 「哼…想要抱我的话…那就来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '504',
        any: [/PRINTFORMW %SAVESTR:TARGET%四仰八叉地躺倒在床上叫嚣着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '504-505',
        any: [/PRINTFORMW %SAVESTR:TARGET%四仰八叉地躺倒在床上叫嚣着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '506',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '507',
        any: [/PRINTFORMW 「…给我去死吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '508',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用锐利得仿佛可以杀死%SAVESTR:PLAYER%般的眼神瞪视着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '508-509',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用锐利得仿佛可以杀死%SAVESTR:PLAYER%般的眼神瞪视着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '510',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '513',
        any: [/ELSEIF MARK:2 == 0 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '514',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '515',
        any: [/PRINTFORMW 「别开玩笑了，你这废物」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '516',
        any: [/PRINTFORMW %SAVESTR:TARGET%砸着嘴瞪视%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '517',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '520',
        any: [/ELSEIF MARK:2 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '521',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '522',
        any: [/PRINTFORMW 「嘁，不明白么…才不会听你的啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '523',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸上似乎出现了一点胆怯的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '524',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '527',
        any: [/ELSEIF MARK:2 == 2 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '528',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '529',
        any: [/PRINTFORMW 「到这种程度为止吧…再做更过分的事我可不答应啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '530',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱住双肩有点厌恶似的摇着头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '531',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '534',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '535',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '536',
        any: [/PRINTFORMW 「…要开始了吗。好吧。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '537',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%老老实实地抱住%SAVESTR:PLAYER%准备开始了…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '538',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '542',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '543',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '545',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '546',
        any: [/PRINTFORMW %SAVESTR:TARGET%四肢趴在地上向你抬起屁股/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '547',
        any: [/PRINTFORMW 「啊啊啊啊啊…快来吧…已经忍不住了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '548',
        any: [/PRINTFORMW 你踢踢她的屁股，开始了调教………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '549',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '550',
        any: [/PRINTFORMW %SAVESTR:TARGET%一看到你就跪下说道/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '551',
        any: [
          /PRINTFORMW 「如您所愿……%SELF_CALL\(TARGET\)%……想要更多的处罚……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '552',
        any: [/PRINTFORMW 仰望着你的眼睛里露出充满欲望的光芒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '552-553',
        any: [/PRINTFORMW 仰望着你的眼睛里露出充满欲望的光芒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '554',
        any: [/PRINTFORMW %SAVESTR:TARGET%分开双臀展示出自己的小穴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '555',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%很蠢吧…在你的身下就更没办法思考了呢…所以要对我负责哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '556',
        any: [/PRINTFORMW 那淫荡的表情完全没有了一开始的恶毒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '556-557',
        any: [/PRINTFORMW 那淫荡的表情完全没有了一开始的恶毒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '558',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '561',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '562',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '564',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '565',
        any: [/PRINTFORMW 「今天也来惩罚%SELF_CALL\(TARGET\)%吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '566',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些迫不及待地开始做调教准备了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '567',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的身体上已经充满了魔王大人的印记了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '568',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '569',
        any: [
          /PRINTFORMW 「有点…迟到了啊………不、不过无论什么时候，都在等待着为魔王大人服务呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '570',
        any: [/PRINTFORMW %SAVESTR:TARGET%轻轻嘟着嘴唇，眼中充满期待。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '571',
        any: [
          /PRINTFORMW 「您…快开始吧…%SELF_CALL\(TARGET\)%的子宫已经在不安分地跳动了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '571-572',
        any: [
          /PRINTFORMW 「您…快开始吧…%SELF_CALL\(TARGET\)%的子宫已经在不安分地跳动了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '573',
        any: [/PRINTFORMW 「啊，您好～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '574',
        any: [/PRINTFORMW %SAVESTR:TARGET%微笑着撩起发梢寒暄起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '575',
        any: [
          /PRINTFORMW 「一想到要被魔王大人疼爱…%SELF_CALL\(TARGET\)%就变得高兴起来了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '575-576',
        any: [
          /PRINTFORMW 「一想到要被魔王大人疼爱…%SELF_CALL\(TARGET\)%就变得高兴起来了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '577',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '577-578',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '577-579',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '585',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '586-587',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '588-589',
        any: [/SIF TALENT:166 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '592-593',
        any: [/SIF BASE:0 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '599',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '600',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '601',
        any: [/PRINTFORMW 「哈…唔啊…啊啊啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '602',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%美丽的身体已经被玩坏了，还是少让她做些事情吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '603',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '606',
        any: [
          /ELSEIF MARK:3 == 3  && MARK:2 == 0 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '607',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '608',
        any: [/PRINTFORMW 「去死吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '610',
        any: [
          /PRINTFORMW 虽然疲惫不堪，%SAVESTR:TARGET%的眼光中还是充满了抵触。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '611',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%在%SAVESTR:TARGET%的痛骂中不由得耸了耸肩………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '612',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '615',
        any: [
          /ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '616',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '617',
        any: [/PRINTFORMW 「下贱的渣滓！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '618',
        any: [/PRINTFORMW 居然还有痛骂的精神，看来调教得还不够啊……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '619',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '622',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '623',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '624',
        any: [/PRINTFORMW 「你、你这臭虫！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '625',
        any: [/PRINTFORMW 还有精神说这样的话，需要更多的调教呢……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '626',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '629',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '630',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '631',
        any: [/PRINTFORMW 「哈啊…终于……结束了吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '633',
        any: [/PRINTFORMW %SAVESTR:TARGET%气喘吁吁，已经脱力了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '634',
        any: [/PRINTFORMW 调教的成果显现出来，这匹野马也被驯服了呢……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '635',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '638',
        any: [
          /ELSEIF MARK:2 == 3 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '639',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '640',
        any: [/PRINTFORMW 「你有什么事情吗…唔…不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '642',
        any: [
          /PRINTFORMW 虽然疲惫不堪，%SAVESTR:TARGET%的眼光中还是充满了抵触。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '643',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%看着%SAVESTR:TARGET%现在的样子笑了起来，%SAVESTR:TARGET%流下了懊悔的眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '644',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '647',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '648',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '649',
        any: [/PRINTFORMW 「再激烈一点嘛～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '650',
        any: [/PRINTFORMW %SAVESTR:TARGET%欲求不满地在床上写下这样的字句………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '651',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '653',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '654',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '655',
        any: [/PRINTFORMW 「唔啊，被喂得饱饱的呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '656',
        any: [/PRINTFORMW %SAVESTR:TARGET%非常满足地呈大字躺在地上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '657',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '660',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '661',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '662',
        any: [/PRINTFORMW 「下次惩罚不要手下留情哦……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '663',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%趴在%SAVESTR:PLAYER%的肩头撒娇似的说着下次调教的事情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '664',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '666',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '667',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '668',
        any: [/PRINTFORMW 「啊啊…这、这么多………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '669',
        any: [/PRINTFORMW %SAVESTR:TARGET%满足地叹息着大字躺在地上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '670',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '670-671',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '670-672',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '680-681',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '683-684',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '686-687',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '689-690',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '692',
        any: [/IF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '693',
        any: [/CALL DOG_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '693-694',
        any: [/CALL DOG_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '695-696',
        any: [/;死斗场中は専用口上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '697',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '698',
        any: [/CALL COLOSSEUM_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '698-699',
        any: [/CALL COLOSSEUM_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '698-700',
        any: [/CALL COLOSSEUM_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '708',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '710',
        any: [/IF CFLAG:301 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '712',
        any: [/IF MARK:2 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '713',
        any: [/PRINTFORMW 「哈啊…该死……别这样摸我啊…呜！…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '714',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被爱抚着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '716-717',
        any: [/PRINTFORMW 「嘁、摸吧！你这渣滓！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '717',
        any: [/PRINTFORMW 「嘁、摸吧！你这渣滓！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '718',
        any: [/PRINTFORMW %SAVESTR:TARGET%厌恶地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '718-719',
        any: [/PRINTFORMW %SAVESTR:TARGET%厌恶地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '720',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '720-721',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '723-725',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '725',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '726',
        any: [/PRINTFORMW 「只是触摸可不够哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '727',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抓住%SAVESTR:PLAYER%的手引导着伸向敏感带………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '728',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '730',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '731',
        any: [/PRINTFORMW 「主人的手的触感…好温暖…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丝毫不抵抗地享受着爱抚，发出舒服的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '733',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '735',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '736',
        any: [/PRINTFORMW 「…不要！呼呼、哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '737',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被爱抚着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '738',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '740',
        any: [/ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '741',
        any: [/PRINTFORMW 「真是…没办法啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '742',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被爱抚着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '743',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '745',
        any: [/ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '746',
        any: [/PRINTFORMW 「别碰我！你这垃圾！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '747',
        any: [/PRINTFORMW %SAVESTR:TARGET%在爱抚过程中厌恶地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '748',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '748-749',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '748-750',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '748-751',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '752-755',
        any: [/;舔阴 CFLAG:302/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '757',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '759',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '761',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '762',
        any: [/PRINTFORMW 「别…别舔那里！说了很脏啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '763',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%舔舐着%SAVESTR:TARGET%未经人事的阴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '765-766',
        any: [/PRINTFORMW 「你是认真的吗！别开玩笑了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '766',
        any: [/PRINTFORMW 「你是认真的吗！别开玩笑了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '767',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱住%SAVESTR:TARGET%的两条大腿，把阴唇含在了嘴里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '767-768',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱住%SAVESTR:TARGET%的两条大腿，把阴唇含在了嘴里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '769',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '769-770',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '772-774',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '774',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '775',
        any: [/PRINTFORMW 「啊哈啊…再用力一点啊…呼♪噗～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '776',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双腿夹住%SAVESTR:PLAYER%的头，发出挑衅般充满快感的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '777',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '779',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '780',
        any: [/PRINTFORMW 「真开心啊…哟…哈啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%分开自己的双腿带着陶醉的神色享受着%SAVESTR:PLAYER%的爱抚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '782',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '784',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '785',
        any: [/PRINTFORMW 「嘛…很好…啊唔…啊…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '786',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%分开自己的双腿接受着%SAVESTR:PLAYER%的爱抚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '787',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '789',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '790',
        any: [/PRINTFORMW 「你这变态！快给我去死啊！滚、滚开！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '791',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱住还在痛骂着的%SAVESTR:TARGET%的大腿，把阴唇含在了嘴里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '792',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '792-793',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '792-794',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '792-795',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '796-799',
        any: [/;アナル爱撫 CFLAG:303/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '801',
        any: [/IF SELECTCOM == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '803',
        any: [/IF CFLAG:303 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '805',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '806',
        any: [/PRINTFORMW 「啊…呀啊…啊！还不够啊…唔…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '807',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门在%SAVESTR:PLAYER%手指的挑动下几近痉挛，欲望高涨………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '807-808',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门在%SAVESTR:PLAYER%手指的挑动下几近痉挛，欲望高涨………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '809',
        any: [/PRINTFORMW 「啊，不要这样！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '810',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%摆动着腰肢想从%SAVESTR:PLAYER%的手指中逃离………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '810-811',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%摆动着腰肢想从%SAVESTR:PLAYER%的手指中逃离………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '812',
        any: [/CFLAG:TARGET:303 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '812-813',
        any: [/CFLAG:TARGET:303 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '815-816',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '816',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '818',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '819',
        any: [
          /PRINTFORMW 「啊呜…肛门…变得黏糊糊的啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '820',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门在%SAVESTR:PLAYER%手指的挑动下几近痉挛，欲望高涨………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '821',
        any: [/CFLAG:303 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '823',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '824',
        any: [/PRINTFORMW 「啊哈哈♪　想要更多！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '825',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门夹紧了%SAVESTR:PLAYER%的手指欢快地蠕动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '826',
        any: [/CFLAG:303 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '828',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '829',
        any: [/PRINTFORMW 「还要更湿一点呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '830',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '831',
        any: [/CFLAG:303 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '833',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '834',
        any: [
          /PRINTFORMW 「啊咿…呜…啊啊啊啊…屁股…啊…要、要上天了啦！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '835',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门紧紧的夹住%SAVESTR:PLAYER%的手指，完全无法抽出来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '836',
        any: [/CFLAG:303 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '838',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '839',
        any: [/PRINTFORMW 「屁股小穴…好、好舒服…♪ 想…想要更多………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '840',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门夹紧了%SAVESTR:PLAYER%的手指欢快地蠕动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '841',
        any: [/CFLAG:303 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '843',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '844',
        any: [/PRINTFORMW 「…呀！　还要更湿一点才能进去呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '845',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门似乎还没有充分润滑，对于爱抚显得有些痛苦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '846',
        any: [/CFLAG:303 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '848',
        any: [
          /ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '849',
        any: [/PRINTFORMW 「难以置信…屁股的…快感…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '850',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门紧紧的夹住了%SAVESTR:PLAYER%的手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '851',
        any: [/CFLAG:303 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '853',
        any: [/ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '854',
        any: [/PRINTFORMW 「住手，你这卑贱的淫虫！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '855',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%拼命地摆动着腰肢想从%SAVESTR:PLAYER%的手指中逃离………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '856',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '856-857',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '856-858',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '856-859',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '860-863',
        any: [/;自慰 CFLAG304/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '865',
        any: [/IF SELECTCOM == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '867',
        any: [/IF CFLAG:304 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '868',
        any: [/PRINTFORMW 「嘁，自慰么…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '869',
        any: [/CFLAG:TARGET:304 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '869-870',
        any: [/CFLAG:TARGET:304 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '872-874',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '874',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '875',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%的这里完全没被开发过哟……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '876',
        any: [/PRINTFORMW %SAVESTR:TARGET%边自慰着边露出充满快感的笑容。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '877',
        any: [
          /PRINTFORMW 「啊啊啊…呐诶…%SELF_CALL\(TARGET\)%就这样破掉自己的处女吧…魔王大人会发怒也没办法了啊啊！噗噜 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '878',
        any: [/PRINTFORMW 开始兴奋起来的%SAVESTR:TARGET%自慰得更加激烈了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '879',
        any: [/CFLAG:304 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '881',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '883',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '884',
        any: [
          /PRINTFORMW 「哈啊…哈啊…迫不及待了呢…光是手指已经不够了啊 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '885',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边流着口水一边激烈地自慰着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '886',
        any: [
          /PRINTFORMW 「啊啊啊…唔啊…已经…啊啊啊…完全停不下来了…停、停不下来了啊啊啊…呜…啊啊 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '887',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '888',
        any: [
          /PRINTFORMW 「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却…诶嘿嘿 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '889',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边自慰边把目光投向%SAVESTR:PLAYER%，眼中那充满欲望的湿润越发明显。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '890',
        any: [
          /PRINTFORMW 「啊啊…哈…哈啊%UNICODE\(0x2661\) \*1%…啊啊啊…想要…哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '890-891',
        any: [
          /PRINTFORMW 「啊啊…哈…哈啊%UNICODE\(0x2661\) \*1%…啊啊啊…想要…哈啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '892',
        any: [
          /PRINTFORMW 「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '893',
        any: [
          /PRINTFORMW 虽然这样说着%SAVESTR:TARGET%却完全没有停下来的意思，反而自慰得更加狂野了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '894',
        any: [
          /PRINTFORMW 「已经，已经…像这样…全部都变得湿漉漉了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '894-895',
        any: [
          /PRINTFORMW 「已经，已经…像这样…全部都变得湿漉漉了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '896',
        any: [/CFLAG:304 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '898',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '900',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '901',
        any: [
          /PRINTFORMW 「呵啊…虽然很舒服但是有点累呢…明明对方就在我面前站着，却… %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '902',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边抱怨着一边继续自慰，修长的手指从私处带出爱液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '903',
        any: [/PRINTFORMW 「唔…啊…啊啊…哈呜…呜%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '903-904',
        any: [/PRINTFORMW 「唔…啊…啊啊…哈呜…呜%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '905',
        any: [
          /PRINTFORMW 「啊啊啊…呜…哈啊啊啊！像那样…手指都累了呢…呜…啊啊啊…啊啊呜啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '906',
        any: [/PRINTFORMW %SAVESTR:TARGET%的动作越来越激烈。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '907',
        any: [
          /PRINTFORMW 「啊啊…像这样…已经等不及了呢…唔…呜啊…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '907-908',
        any: [
          /PRINTFORMW 「啊啊…像这样…已经等不及了呢…唔…呜啊…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '909',
        any: [/CFLAG:304 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '911',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '912',
        any: [
          /PRINTFORMW 「啊…%SELF_CALL\(TARGET\)%照做就是了…只能到这个地步，不能再欺负我了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '913',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着淫荡的表情继续自慰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '914',
        any: [
          /PRINTFORMW 「呜呜像%UNICODE\(0x2661\) \*1% 这、这样已经是极限了…请让我自己来弄破处女膜吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '915',
        any: [/CFLAG:304 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '917',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '919',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '920',
        any: [
          /PRINTFORMW 「居然想看%SELF_CALL\(TARGET\)%自慰的样子…魔王大人真是的…啊啊啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的样子…再多看一点吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '921',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%已经把%SAVESTR:PLAYER%的注视抛在脑后继续自慰着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '922',
        any: [/PRINTFORMW 「啊…呜呜…已经停不下来了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '923',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '924',
        any: [
          /PRINTFORMW 「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '925',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边说着一边沉浸在玩弄自己私处的快感中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '926',
        any: [
          /PRINTFORMW 「啊啊…不行…不行…完全停不下来了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '926-927',
        any: [
          /PRINTFORMW 「啊啊…不行…不行…完全停不下来了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '928',
        any: [
          /PRINTFORMW 「听人说手淫不好呢…手淫的孩子什么的…%SELF_CALL\(TARGET\)%才不会感谢你啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '929',
        any: [
          /PRINTFORMW 虽然这么说着但%SAVESTR:TARGET%脸上带着淫靡的红晕，玩弄私处的手指完全没有停下来的迹象。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '930',
        any: [
          /PRINTFORMW 「咿…啊啊啊啊啊啊啊啊…呜…呼…啊啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '930-931',
        any: [
          /PRINTFORMW 「咿…啊啊啊啊啊啊啊啊…呜…呼…啊啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '932',
        any: [/CFLAG:304 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '934',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '936',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '937',
        any: [
          /PRINTFORMW 「居然想看%SELF_CALL\(TARGET\)%自慰的样子…魔王大人真是的…啊啊啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的样子…再多看一点吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '938',
        any: [/PRINTFORMW %SAVESTR:TARGET%用期待的眼神看着这边自慰起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '938-939',
        any: [/PRINTFORMW %SAVESTR:TARGET%用期待的眼神看着这边自慰起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '940',
        any: [
          /PRINTFORMW 「啊啊啊…比起自慰什么的反而…更想要魔王大人的手指啊！想要魔王大人的大肉棒啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '941',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边说着一边沉浸在来回玩弄自己私处的快感中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '941-942',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边说着一边沉浸在来回玩弄自己私处的快感中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '943',
        any: [/CFLAG:304 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '945',
        any: [
          /ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '947',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '948',
        any: [/PRINTFORMW 「哈啊…哈啊…呜…呼…啊呜…啊啊…咕噜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '949',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%咬着嘴唇继续自慰，偶尔从唇中发出淫靡的闷哼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '949-950',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%咬着嘴唇继续自慰，偶尔从唇中发出淫靡的闷哼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '951',
        any: [
          /PRINTFORMW 「啊…呜呜…看、看什么啊…变态！变态混蛋！…呜…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '952',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边痛骂看得津津有味的%SAVESTR:PLAYER%一边继续自慰着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '952-953',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边痛骂看得津津有味的%SAVESTR:PLAYER%一边继续自慰着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '954',
        any: [/CFLAG:304 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '956',
        any: [/ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '958',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '959',
        any: [
          /PRINTFORMW 「啊…我…呜呜…让%SELF_CALL\(TARGET\)%做这样的事情…不、不许看啊！………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '960',
        any: [/PRINTFORMW %SAVESTR:TARGET%抽动着自己的手指………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '960-961',
        any: [/PRINTFORMW %SAVESTR:TARGET%抽动着自己的手指………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '962',
        any: [
          /PRINTFORMW 「啊啊…这样的事也…要%SELF_CALL\(TARGET\)%…呜…好的…唔啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '963',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是被强行命令了一般拼命地抽动着手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '963-964',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是被强行命令了一般拼命地抽动着手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '965',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '965-966',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '965-967',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '965-968',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '969-972',
        any: [/;胸爱撫 CFLAG:306/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '974',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '976',
        any: [/IF CFLAG:306 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '978',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '980',
        any: [/IF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '982',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '983',
        any: [
          /PRINTFORMW 「啊啊…要%SELF_CALL\(TARGET\)%…这样做…会有奶汁什么的喷出来吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '984',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房挤出了乳汁，滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '984-985',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房挤出了乳汁，滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '986',
        any: [
          /PRINTFORMW 「啊啊…要%SELF_CALL\(TARGET\)%…这样做…会有奶汁什么的喷出来吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '987',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把还在吮吸着自己胸部的%SAVESTR:PLAYER%的头轻轻抱住，温柔地叹息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '987-988',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把还在吮吸着自己胸部的%SAVESTR:PLAYER%的头轻轻抱住，温柔地叹息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '989-990',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '992',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '993',
        any: [/PRINTFORMW 「快、快停下来…奶…不要啊…别吸啊，喂！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '994',
        any: [
          /PRINTFORMW 母乳从%SAVESTR:TARGET%硕大的乳房滴出滋润着%SAVESTR:PLAYER%的喉咙………………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '994-995',
        any: [
          /PRINTFORMW 母乳从%SAVESTR:TARGET%硕大的乳房滴出滋润着%SAVESTR:PLAYER%的喉咙………………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '996',
        any: [/PRINTFORMW 「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '997',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳房被吸吮着感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '997-998',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳房被吸吮着感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '997-999',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳房被吸吮着感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1000-1002',
        any: [/IF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1002',
        any: [/IF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1004',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1005',
        any: [
          /PRINTFORMW 「啊啊…哈啊啊…请随意玩弄%SELF_CALL\(TARGET\)%的胸部吧…只有主人可以哟～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1006',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房被揉搓着发出了这样的叹息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1006-1007',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房被揉搓着发出了这样的叹息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1008',
        any: [/PRINTFORMW 「啊…啊～…真是温柔的开始呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1009',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部被揉搓着发出甜蜜的喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1009-1010',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部被揉搓着发出甜蜜的喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1011-1012',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1014',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1015',
        any: [
          /PRINTFORMW 「嘁…被你这样的家伙…%SELF_CALL\(TARGET\)%引以为傲的胸部………放…放开啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1016',
        any: [/PRINTFORMW %SAVESTR:TARGET%的丰乳被揉搓着，厌恶地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1016-1017',
        any: [/PRINTFORMW %SAVESTR:TARGET%的丰乳被揉搓着，厌恶地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1018',
        any: [
          /PRINTFORMW 「哈啊…对胸部这么着迷，你这家伙有恋母情结么………呜！松开！别用牙咬啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1019',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸被毫不留情地肆意玩弄着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1019-1020',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸被毫不留情地肆意玩弄着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1019-1021',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸被毫不留情地肆意玩弄着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1022-1023',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1023',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1023-1024',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1026-1028',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1028',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1030',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1032',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1033',
        any: [
          /PRINTFORMW 「吸～来吸～吧！来喝%SELF_CALL\(TARGET\)%…的奶水！啊啊啊！去了～要去了！～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1034',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫荡的表情挤压着自己丰满的乳房，挤出母乳滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1034-1035',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫荡的表情挤压着自己丰满的乳房，挤出母乳滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1036',
        any: [
          /PRINTFORMW 「呜，真是的……异常的舒服呢…被人吸的感觉是这样啊%UNICODE\(0x2661\) \*1%…啊啊%SELF_CALL\(TARGET\)%要疯掉了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1037',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头被不断吸吮着，快感让她全身痉挛，心旷神怡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1037-1038',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头被不断吸吮着，快感让她全身痉挛，心旷神怡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1039',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1041',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1043',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1044',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的…胸部…会分泌出牛奶一样的乳汁呢…魔王大人…请喝我的母乳吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1045',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%轻抚着正在吸吮自己胸部的%SAVESTR:PLAYER%的头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1046',
        any: [
          /PRINTFORMW 带着淫荡表情的%SAVESTR:TARGET%那丰满的乳房挤出了乳汁，滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1046-1047',
        any: [
          /PRINTFORMW 带着淫荡表情的%SAVESTR:TARGET%那丰满的乳房挤出了乳汁，滋润着%SAVESTR:PLAYER%的喉咙………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1048',
        any: [
          /PRINTFORMW 「那个…那个…魔王要是想喝奶的话…%SELF_CALL\(TARGET\)%的奶水也很美味的说…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1049',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把还在吮吸着自己胸部的%SAVESTR:PLAYER%的头轻轻抱住，温柔地叹息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1049-1050',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把还在吮吸着自己胸部的%SAVESTR:PLAYER%的头轻轻抱住，温柔地叹息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1051',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1053',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1055',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1056',
        any: [
          /PRINTFORMW 「啊啊啊…这样…不过是吸奶而已…身体，不受控制了…来、来吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1057',
        any: [/PRINTFORMW %SAVESTR:TARGET%硕大的乳房因为快感的缘故颤动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1057-1058',
        any: [/PRINTFORMW %SAVESTR:TARGET%硕大的乳房因为快感的缘故颤动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1059',
        any: [/PRINTFORMW 「你怎么…像个婴儿一样啊…啊啊…咿啊…呜呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1060',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为快感而全身痉挛，母乳喷了出来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1060-1061',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为快感而全身痉挛，母乳喷了出来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1062',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1064',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1066',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1067',
        any: [/PRINTFORMW 「快、快停下来…胸部…不要啊…别吸啊，喂！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1068',
        any: [
          /PRINTFORMW 母乳从%SAVESTR:TARGET%硕大的乳房流出滋润着%SAVESTR:PLAYER%的喉咙………………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1068-1069',
        any: [
          /PRINTFORMW 母乳从%SAVESTR:TARGET%硕大的乳房流出滋润着%SAVESTR:PLAYER%的喉咙………………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1070',
        any: [/PRINTFORMW 「啊啊啊…那样的…像婴儿一样的…吸奶…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1071',
        any: [/PRINTFORMW %SAVESTR:TARGET%的母乳被吸吮着感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1071-1072',
        any: [/PRINTFORMW %SAVESTR:TARGET%的母乳被吸吮着感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1073',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1073-1074',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1073-1075',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1077',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1079',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1080',
        any: [
          /PRINTFORMW 「等不及了…快来玩弄%SELF_CALL\(TARGET\)%淫荡下贱的奶子吧！唔啊！就、就是这样%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1081',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%丰满的乳房来回扭动着，%SAVESTR:TARGET%饶有兴致地把身子后仰享受这苦闷的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1081-1082',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%丰满的乳房来回扭动着，%SAVESTR:TARGET%饶有兴致地把身子后仰享受这苦闷的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1083',
        any: [
          /PRINTFORMW 「啊啊…现在的…%SELF_CALL\(TARGET\)%的乳房…已经变得乱七八糟了啊%UNICODE\(0x2661\) \*1% 啊呜啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1084',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全沉浸在对乳房的爱抚中，只顾着寻求更多的刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1084-1085',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全沉浸在对乳房的爱抚中，只顾着寻求更多的刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1086',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1088',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1090',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1091',
        any: [
          /PRINTFORMW 「哈啊…想要更多…%SELF_CALL\(TARGET\)%的胸需要魔王大人的爱心按摩啊啊%UNICODE\(0x2661\) \*1% 这乳房已经完完全全被魔王大人征服了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1092',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房被揉搓着发出了满足的叹息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1092-1093',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房被揉搓着发出了满足的叹息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1094',
        any: [
          /PRINTFORMW 「啊…呜…啊嗯…哈啊…揉吧…%SELF_CALL\(TARGET\)%的胸部…请用力地摆布啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1095',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼中泛着春光，接受着%SAVESTR:PLAYER%的爱抚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1095-1096',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼中泛着春光，接受着%SAVESTR:PLAYER%的爱抚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1097',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1099',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1101',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1102',
        any: [
          /PRINTFORMW 「哈啊…啊啊…怎么…%SELF_CALL\(TARGET\)%的胸部会有这样的感觉啊…啊啊…呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1103',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房享受着爱抚变成了桃红色，嘴中泄露出娇艳的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1103-1104',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的乳房享受着爱抚变成了桃红色，嘴中泄露出娇艳的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1105',
        any: [
          /PRINTFORMW 「哈、哈啊…有恋母情结的人都喜欢这么做吗…呜…呜…哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1106',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%的爱抚弄得满脸红晕……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1106-1107',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%的爱抚弄得满脸红晕……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1108',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1110',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1112',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1113',
        any: [/PRINTFORMW 「该死……呜哇…！别碰我…迷恋胸部的变态…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1114',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为硕乳被揉捏不高兴地摇了摇头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1114-1115',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为硕乳被揉捏不高兴地摇了摇头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1116',
        any: [
          /PRINTFORMW 「你这恋母情结的变态！别、别揉我的胸了啊！…呜呜…住手！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1117',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%咬紧牙关忍受着对自己胸部的特殊关照………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1117-1118',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%咬紧牙关忍受着对自己胸部的特殊关照………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1119',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1119-1120',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1119-1121',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1119-1122',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1119-1123',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1124-1127',
        any: [/;接吻 CFLAG:307/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1129',
        any: [/IF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1131',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1133',
        any: [
          /IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1134',
        any: [/PRINTFORMW 「唔嗯…呜…啊啊………嗯哼…呜呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1135',
        any: [/PRINTFORMW %SAVESTR:TARGET%的舌头纠缠了很久才舍得放开。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1136',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%……%SELF_CALL\(TARGET\)%的初吻的味道怎么样～…魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1138',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1139',
        any: [/PRINTFORMW 「呜…啊啊…啊…呜呜…噗噜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1140',
        any: [
          /PRINTFORMW 唇分开之后%SAVESTR:TARGET%凝视着%SAVESTR:PLAYER%的脸庞。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1141',
        any: [
          /PRINTFORMW 「呐，%SELF_CALL\(TARGET\)%的初吻已经…在这之前绝对没有和别人接吻过哦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1143-1144',
        any: [/PRINTFORMW 「唔嗯！…呜啊…呜………这、这个……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1144',
        any: [/PRINTFORMW 「唔嗯！…呜啊…呜………这、这个……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1145',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴唇被肆意蹂躏着、懊悔地擦拭了好多次。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1146',
        any: [
          /PRINTFORMW 「…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的初吻竟然………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1146-1147',
        any: [
          /PRINTFORMW 「…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的初吻竟然………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1148',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1148-1149',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1151',
        any: [/ELSEIF CFLAG:307 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1153',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1154',
        any: [
          /PRINTFORMW 「呜…唔啊…呜…还不够…呜…唔嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1155',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%与%SAVESTR:PLAYER%的舌头纠缠在一起不愿分开。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1156',
        any: [
          /PRINTFORMW 「呜…唔啊…啊啊啊…口水真美味啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1158',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1159',
        any: [
          /PRINTFORMW 「唔啊…吻我…呜…呜呜…跟魔王大人接吻…好开心%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1160',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%努力将温热的舌尖挤进%SAVESTR:PLAYER%嘴中仔细品味着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1161',
        any: [
          /PRINTFORMW 「呼呼…呜…呜呜啊…唔嗯…唔…继续…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1163-1164',
        any: [/PRINTFORMW 「呜…真是屈辱…啊…呜…随你………呜…已、已经够了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1164',
        any: [/PRINTFORMW 「呜…真是屈辱…啊…呜…随你………呜…已、已经够了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1165',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼泛泪光地瞪着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1165-1166',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼泛泪光地瞪着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1167',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1167-1168',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1170-1172',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1172',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1173',
        any: [
          /PRINTFORMW 「啊哈…呼呜呜…还想要更多的啾啾…已经舒服到无法思考了啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1174',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只是亲吻就已经泪光闪烁，积极地索求着舌间的纠缠。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1175',
        any: [
          /PRINTFORMW 「呜呜…呼…啊啊…想…%SELF_CALL\(TARGET\)%想要更多唔嗯…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1176',
        any: [/CFLAG:307 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1178',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1179',
        any: [
          /PRINTFORMW 「啊、不行啊…太、太久了啦…呜…哈啊…呜呜…啊啊…呜呜呜……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1180',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%予取予求地伸出舌头，因为兴奋不由自主地喘息着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1181',
        any: [
          /PRINTFORMW 「呜…啊啊…唔啊啊…更…更多一点…魔王大人…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1182',
        any: [/CFLAG:307 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1184',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1185',
        any: [/PRINTFORMW 「呜…老实一点啊…啊…呜…呜呜…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1186',
        any: [/PRINTFORMW %SAVESTR:TARGET%的嘴唇毫不设防………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1187',
        any: [/CFLAG:307 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1189',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1190',
        any: [/PRINTFORMW 「呜…那么…还不够么…啊…呜…唔啊！…够了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1191',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的下巴被%SAVESTR:PLAYER%抓住，任由你摆布了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1192',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1192-1193',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1192-1194',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1192-1195',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1196-1199',
        any: [/;自己扒开 CFLAG:308/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1201',
        any: [/IF SELECTCOM == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1203',
        any: [/IF CFLAG:308 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1205',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1206',
        any: [/PRINTFORMW 「啊啊…魔王大人在看我的小穴…！再…再深一点…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1207',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上发热，仿佛在引诱%SAVESTR:PLAYER%一般扒开自己的小穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1209',
        any: [/PRINTFORMW 「啊啊啊…连处女膜也…看得到哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1211',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1212',
        any: [
          /PRINTFORMW 「既然…想要看的话…那就…给你看好了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1213',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为羞耻涨红了脸，却仍用手指撑开小穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1215',
        any: [/PRINTFORMW 「啊…啊啊…处女膜都被看见了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1217-1218',
        any: [/PRINTFORMW 「你…你这变态…死吧！去死啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1218',
        any: [/PRINTFORMW 「你…你这变态…死吧！去死啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然痛骂着%SAVESTR:PLAYER%却没能反抗这命令，用颤抖的手指分开了自己的阴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1219-1220',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然痛骂着%SAVESTR:PLAYER%却没能反抗这命令，用颤抖的手指分开了自己的阴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1221',
        any: [/CFLAG:TARGET:308 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1221-1222',
        any: [/CFLAG:TARGET:308 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1224-1226',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1226',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1227',
        any: [
          /PRINTFORMW 「真的吗，%SELF_CALL\(TARGET\)%的里面的样子%UNICODE\(0x2661\) \*1% 真的能看得到吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1228',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇一边开心地分开阴唇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1229',
        any: [
          /PRINTFORMW 「啊啊啊…被你看到了哦%UNICODE\(0x2661\) \*1%…我的一切都被你看到了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1231',
        any: [/PRINTFORMW 「啊啊处女膜也被看到了…！什么时候才要蹂躏它呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1232',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1234',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1235',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的那里无论看多少次都不会厌…什么的…%SELF_CALL\(TARGET\)%…魔王大人是变态呜呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1236',
        any: [/PRINTFORMW %SAVESTR:TARGET%虽然害羞却主动扩大着自己的小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1237',
        any: [/PRINTFORMW 「别…这样…节制一点！变态！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1239',
        any: [
          /PRINTFORMW 「啊啊…处女膜…能看见吗？%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…还是处女哟～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1240',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1242',
        any: [/ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1243',
        any: [
          /PRINTFORMW 「你这变态…想看就看吧…看…我啊…你就喜欢这种事情吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1244',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔着嘴唇分开双腿展示出阴部。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1245',
        any: [
          /PRINTFORMW 「啊啊啊…哈…看看吧…看啊！这就是你想看到的吧！…啊…哈哈啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1246',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1248',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1249',
        any: [
          /PRINTFORMW 「看就算了…还、还要我自己张开…你在看哪儿啊…大变态！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1250',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边咒骂一边慢慢用手指打开了小穴……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1251',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1251-1252',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1251-1253',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1251-1254',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1255-1258',
        any: [/;插入手指 CFLAG:309/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1260',
        any: [/IF SELECTCOM == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1262',
        any: [/IF CFLAG:TARGET:309 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1264',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1265',
        any: [/PRINTFORMW 「啊啊…啊啊啊…呜呜呜…手指…好粗大…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边说着一边感受着%SAVESTR:PLAYER%手指插入带来的兴奋………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1268',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1269',
        any: [/PRINTFORMW 「啊啊…呜…这、这样的…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1270',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为异物的侵入皱起眉头，咬了咬嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1272-1273',
        any: [/PRINTFORMW 「停、停下来…别用、用…手指进来…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1273',
        any: [/PRINTFORMW 「停、停下来…别用、用…手指进来…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1274',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为强烈的异物感而尖叫起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1274-1275',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为强烈的异物感而尖叫起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1276',
        any: [/CFLAG:TARGET:309 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1276-1277',
        any: [/CFLAG:TARGET:309 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1279-1281',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1281',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1282',
        any: [
          /PRINTFORMW 「啊…啊啊啊…！用手指…搅动%SELF_CALL\(TARGET\)%淫荡的小穴啊啊…哈、哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1283',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%沉浸在快感中，扭动起腰肢配合着搅动的手指。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1284',
        any: [/PRINTFORMW 「啊…唔嗯…魔王大人…主人………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1285',
        any: [/CFLAG:309 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1287',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1288',
        any: [
          /PRINTFORMW 「啊啊！这、这是…要对%SELF_CALL\(TARGET\)%做这样的事情…呜…唔啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1289',
        any: [/PRINTFORMW %SAVESTR:TARGET%在这个瞬间皱着眉勉强地摇着头。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1290',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…看上去很奇怪吧…唔啊唔啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1291',
        any: [/CFLAG:309 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1293',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1294',
        any: [/PRINTFORMW 「啊啊…哈…好粗…呜啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1295',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为异物的侵入皱起眉头，咬了咬嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1296',
        any: [/CFLAG:309 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1298',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1299',
        any: [/PRINTFORMW 「你…你喜、喜欢就好…啊啊…呜…呜呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1300',
        any: [/PRINTFORMW %SAVESTR:TARGET%配合着手指插入的动作做着反应………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1301',
        any: [/CFLAG:309 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1303',
        any: [/ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1304',
        any: [
          /PRINTFORMW 「哼嗯…变态色狼连这样的事也…完全理解不了这种事有什么好啊啊…啊啊…呜呜…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1305',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边骂着边扭动着身体想要逃离手指的侵袭………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1306',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1306-1307',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1306-1308',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1306-1309',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1310-1313',
        any: [/;舔肛 CFLAG:310/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1315',
        any: [/IF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1317',
        any: [/IF CFLAG:310 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1319',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1320',
        any: [/PRINTFORMW 「还要…请继续啊啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1321',
        any: [/PRINTFORMW %SAVESTR:TARGET%在舔舐下括约肌完全放松了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1323',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1324',
        any: [
          /PRINTFORMW 「唔嗯，很脏呢♪变态%UNICODE\(0x2661\) \*1%变态%UNICODE\(0x2661\) \*1% 下流%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1325',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%故作愤怒的样子可爱极了，肛门的快感让她不由发出淫靡的喘息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1327-1328',
        any: [/PRINTFORMW 「变态！　混蛋！　人渣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1328',
        any: [/PRINTFORMW 「变态！　混蛋！　人渣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1329',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然痛骂着%SAVESTR:PLAYER%却无力反抗………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1329-1330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然痛骂着%SAVESTR:PLAYER%却无力反抗………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1331',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1331-1332',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1334-1336',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1336',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1337',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊…呜、呜呜…屁股…只是被舔而已嘛…唔啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1338',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着肛门的快感发出意乱神迷的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1339',
        any: [/CFLAG:310 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1341',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1342',
        any: [/PRINTFORMW 「屁股小穴，在舌头上融化了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1343',
        any: [/PRINTFORMW %SAVESTR:TARGET%被舔舐而露出要化掉一般舒爽的神色………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1344',
        any: [/CFLAG:310 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1346',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1347',
        any: [
          /PRINTFORMW 「想要…更深一点…来吧%UNICODE\(0x2661\) \*1% 用力哟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1348',
        any: [/PRINTFORMW %SAVESTR:TARGET%仅仅是被舔肛门就快要发狂了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1349',
        any: [/CFLAG:310 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1351',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1352',
        any: [/PRINTFORMW 「啊啊啊…来、来吧，很舒服的呢…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1353',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%精心舔舐的时候，能感觉到肛门的颤动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1354',
        any: [/CFLAG:310 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1356',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1357',
        any: [
          /PRINTFORMW 「哈啊啊…这…啊啊啊…这样的事…%SELF_CALL\(TARGET\)%…呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1358',
        any: [/PRINTFORMW %SAVESTR:TARGET%被舔舐的同时懊恼的咬着嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1359',
        any: [/CFLAG:310 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1361',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1362',
        any: [
          /PRINTFORMW 「这…！变态！你、你居然舔我的屁股…啊啊…完全不能接受…渣、渣滓！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1363',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%除了肛门被舔的厌恶以外似乎还感到了另一种奇怪的感觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1364',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1364-1365',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1364-1366',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1364-1367',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1368-1371',
        any: [/;振动宝石 CFLAG:311/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1373',
        any: [/IF SELECTCOM == 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1375',
        any: [/IF CFLAG:TARGET:311 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1377',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1378',
        any: [/PRINTFORMW 「啊，真是的…这种道具也不错嘛…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1379',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘息着，一边沉浸在振动宝石给予的快感中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1381',
        any: [/ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1382',
        any: [/PRINTFORMW 「呜…哼啊…要用这种东西吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1383',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着振动宝石皱了皱眉头，露出寂寞的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1385-1386',
        any: [/PRINTFORMW 「真的…要、要这样吗…唔啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1386',
        any: [/PRINTFORMW 「真的…要、要这样吗…唔啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1387',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇着头，拼命地忍受着异样的感觉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1387-1388',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇着头，拼命地忍受着异样的感觉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1389',
        any: [/CFLAG:TARGET:311 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1389-1390',
        any: [/CFLAG:TARGET:311 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1392-1394',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1394',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1395',
        any: [/PRINTFORMW 「小豆豆哧哧的颤动着呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1396',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%流着口水沉浸在振动宝石带来的快感中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1397',
        any: [
          /PRINTFORMW 「呜…唔嗯…阴蒂的感觉%UNICODE\(0x2661\) \*1%…好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1398',
        any: [/CFLAG:311 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1400',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1401',
        any: [/PRINTFORMW 「哈哈…好的哟～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1402',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%受到振动宝石的刺激坦率地发出了喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1403',
        any: [
          /PRINTFORMW 「啊啊咿…呜…啊啊啊…阴蒂要…麻痹了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1404',
        any: [/CFLAG:311 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1406',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1407',
        any: [/PRINTFORMW 「发、发麻了…已经…真是的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1408',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体因为受到振动宝石的刺激坦率地喘息着，因为快感而扭动着腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1409',
        any: [/CFLAG:311 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1411',
        any: [/ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1412',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1413',
        any: [/PRINTFORMW 「你…你这变态！…啊啊…呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1414',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然嘴上不饶人，却也无法抵抗这种刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1414-1415',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然嘴上不饶人，却也无法抵抗这种刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1416',
        any: [/PRINTFORMW 「啊啊…感觉…感觉好难受啊…真是的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1417',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇晃着头拼命忍耐着强烈的刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1417-1418',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇晃着头拼命忍耐着强烈的刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1419',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1419-1420',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1419-1421',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1419-1422',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1423-1426',
        any: [/;壶虫 CFLAG:312　CFLAG:372/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1429',
        any: [/IF SELECTCOM == 11 && TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1431',
        any: [/IF CFLAG:TARGET:312 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1433',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1435',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1436',
        any: [/PRINTFORMW 「这可是我的第一次哦～…啊哈哈…这样的感觉也不错嘛♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1437',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在蠕虫进入阴道的最深处夺取处女的同时，兴奋不安地扭动着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1439',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1440',
        any: [/PRINTFORMW 「好、好希望是魔王大人来…唔啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1441',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着一抹落寞的表情随着蠕虫的抽插发出痛苦的悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1443-1444',
        any: [/PRINTFORMW 「那、那样的话…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1444',
        any: [/PRINTFORMW 「那、那样的话…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1445',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对于自己的私处正被蠕虫入侵这件事情还有些难以置信。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1446',
        any: [
          /PRINTFORMW 「开玩笑吧…这么脏的虫子…%SELF_CALL\(TARGET\)%的处子之身…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1446-1447',
        any: [
          /PRINTFORMW 「开玩笑吧…这么脏的虫子…%SELF_CALL\(TARGET\)%的处子之身…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1449-1451',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1451',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1452',
        any: [/PRINTFORMW 「还是挺长的嘛…感觉不错哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1453',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在体内蠢蠢而动的蠕虫发出诱人的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1455',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1456',
        any: [/PRINTFORMW 「这…这是…虫、虫子…进来了…啊啊啊啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1457',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴道里蠕虫的抽插大声叫着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1459-1460',
        any: [/PRINTFORMW 「这是什么！糟糕透了！咿呀！别，别动了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1460',
        any: [/PRINTFORMW 「这是什么！糟糕透了！咿呀！别，别动了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1461',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着阴道里蠕虫的动静越来越大而昏倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1461-1462',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着阴道里蠕虫的动静越来越大而昏倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1463-1464',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1464',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1464-1465',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1467-1469',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1469',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1470',
        any: [/PRINTFORMW 「已经上瘾了呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1471',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被蠕虫一直侵犯着，放荡地摆动着腰诱惑起%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1472',
        any: [
          /PRINTFORMW 「啊啊啊…还在动%UNICODE\(0x2661\) \*1%…%SELF_CALL\(TARGET\)%的小穴…好舒服啊…腰都不由自主地颤动起来了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1473',
        any: [/CFLAG:312 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1475',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1476',
        any: [/PRINTFORMW 「咿…啊啊啊！身体里…的感觉…啊…呜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1477',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着蠕虫的蠕动抖动着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1478',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…心情还不错呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1479',
        any: [/CFLAG:312 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1481',
        any: [/ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1482',
        any: [
          /PRINTFORMW 「感觉么…才、才没有…开玩笑吧…%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%…呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1483',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%似乎已经习惯了虫子插入阴道的快感，但还不能坦率地承认这个事实……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1484',
        any: [/CFLAG:312 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1486',
        any: [/ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1487',
        any: [/PRINTFORMW 「被这样的低等生物…咿…呜…侵犯…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1488',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴道里蠕虫的动作而悲鸣着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1489',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1489-1490',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1489-1491',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1492-1494',
        any: [/ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1494',
        any: [/ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1496',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1497',
        any: [/PRINTFORMW 「呀啊啊…要拿下来吗…别拔出去嘛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1498',
        any: [/PRINTFORMW %SAVESTR:TARGET%娇声发出了抗议………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1499',
        any: [/CFLAG:372 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1501',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1502',
        any: [/PRINTFORMW 「啊呜…啊啊啊啊…下次…要更………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1503',
        any: [/PRINTFORMW %SAVESTR:TARGET%感觉不到那种异物感后觉得有些空虚………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1504',
        any: [/CFLAG:372 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1506',
        any: [/ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1507',
        any: [/PRINTFORMW 「啊啊啊啊啊…这、这样就…被…啊啊啊啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1508',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%体下的蠕虫沾染的爱液之多令人感到讶异………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1509',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1509-1510',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1509-1511',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1509-1512',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1517',
        any: [/IF SELECTCOM == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1519',
        any: [/IF CFLAG:313 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1521',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1522',
        any: [/PRINTFORMW 「啊啊！这、这…还、还要%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1523',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%初次体验振动棒的按压，舒服到腰都直不起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1525',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1526',
        any: [
          /PRINTFORMW 「啊啊啊！…魔界都是这样奇怪的道具吗…呜…呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1527',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着震动棒的按压，因为那新鲜的感觉而颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1529-1530',
        any: [/PRINTFORMW 「想做什么！？别、别用那种东西碰我啊！淫棍！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1530',
        any: [/PRINTFORMW 「想做什么！？别、别用那种东西碰我啊！淫棍！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1531',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着震动棒的按压一边叫骂，因为那新鲜的感觉而颤抖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1531-1532',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着震动棒的按压一边叫骂，因为那新鲜的感觉而颤抖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1533',
        any: [/CFLAG:313 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1533-1534',
        any: [/CFLAG:313 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1536-1538',
        any: [/IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1538',
        any: [/IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1539',
        any: [
          /PRINTFORMW 「唔啊啊呜呜呜！再…再按紧一点%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1540',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%努力把下体凑到振动棒上，享受着更强的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1541',
        any: [/CFLAG:313 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1543',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1544',
        any: [/PRINTFORMW 「哎呀！发麻了…啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1545',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%的视线中因为振动棒带来的快感发出愉悦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1546',
        any: [/CFLAG:313 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1548',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1549',
        any: [/PRINTFORMW 「呜…！哈啊哈啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1550',
        any: [/PRINTFORMW  %SAVESTR:TARGET%老实地享受着振动棒带来的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1551',
        any: [/CFLAG:313 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1553',
        any: [/ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1554',
        any: [/PRINTFORMW 「这…这东西…！住手！　人渣！…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1555',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为振动棒被按在身上而大骂起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1556',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1556-1557',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1556-1558',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1556-1559',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1560-1563',
        any: [/;肛门虫 CFLAG:314　CFLAG:374/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1566',
        any: [/IF SELECTCOM == 13 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1568',
        any: [/IF CFLAG:TARGET:314 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1570',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1571',
        any: [
          /PRINTFORMW 「呜…奇怪的虫子…讨厌啦♪啊啊啊…全部…都插进来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1572',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%深深吐出一口气，平复着肛门虫带来的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1574',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1575',
        any: [
          /PRINTFORMW 「啊…啊啊…在屁股里乱动！…哈哈啊…诶？里面很漂亮…吧…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1576',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上带着泪痕，因为肛门虫的快感身体颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1578-1579',
        any: [
          /PRINTFORMW 「哇啊啊啊啊啊！那是什么东西啊！ 唔啊啊…屁股…会被、被吃掉的吧！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1579',
        any: [
          /PRINTFORMW 「哇啊啊啊啊啊！那是什么东西啊！ 唔啊啊…屁股…会被、被吃掉的吧！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1580',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门虫的蠢动发出了可爱的悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1580-1581',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门虫的蠢动发出了可爱的悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1582',
        any: [/CFLAG:TARGET:314 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1582-1583',
        any: [/CFLAG:TARGET:314 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1585-1587',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1587',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1588',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊…屁股小穴把…进去了！吞进去了！好棒啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1589',
        any: [/PRINTFORMW %SAVESTR:TARGET%柔软的菊花把整个肛门虫都吞进去了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1590',
        any: [
          /PRINTFORMW 「唔啊！呜呜！…屁股小穴里已经变得黏黏糊糊的了！%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1591',
        any: [/PRINTFORMW %SAVESTR:TARGET%翻着白眼沉浸在无比的快乐中………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1592',
        any: [/CFLAG:314 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1594',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1595',
        any: [/PRINTFORMW 「啊啊啊♪　在我的肛门里饲养它么…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1596',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%朝%SAVESTR:PLAYER%莞尔一笑，然后开心地疯狂抖动着屁股………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1597',
        any: [/CFLAG:314 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1599',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1600',
        any: [/PRINTFORMW 「咿哇…在里面动呢…！啊啊啊啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1601',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门虫而露出淫荡的样子，已经很有感觉了呢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1602',
        any: [/CFLAG:314 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1604',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1605',
        any: [
          /PRINTFORMW 「啊啊啊…啊…啊啊啊啊…屁股小穴…被蠕虫侵犯了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1606',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被下等生物蹂躏着反而发出了愉悦的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1607',
        any: [
          /PRINTFORMW 「额啊啊啊啊啊啊啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已、已经…快要高潮了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1608',
        any: [/CFLAG:314 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1610',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1611',
        any: [
          /PRINTFORMW 「屁股…像融化了一样…♪ 啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1612',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门在蠕虫们的蹂躏下，已经产生了相当程度的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1613',
        any: [/CFLAG:314 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1615',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1616',
        any: [/PRINTFORMW 「有种…奇妙的感觉…啊…啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1617',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%尽力忍耐着肛门里虫子翻绞产生的奇异的感觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1618',
        any: [/CFLAG:314 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1620',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1621',
        any: [/PRINTFORMW 「里面…在搅拌呢…♪ 啊…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1622',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门被虫子蹂躏脸上露出享受的神色………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1623',
        any: [/CFLAG:314 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1625',
        any: [/ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1626',
        any: [
          /PRINTFORMW 「搞什么啊！　%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的屁股难道就任这些虫子施暴吗！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1627',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对于在自己肛门内蠕动的虫子表现出显而易见的厌恶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1628',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1628-1629',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1628-1630',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1631-1633',
        any: [/ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1633',
        any: [/ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1635',
        any: [
          /IF TALENT:TARGET:77 == 1 && TALENT:TARGET:76 == 1 && \(CFLAG:374 < 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1636',
        any: [
          /PRINTFORMW 「呼啊啊啊…还不够呢…不够啊…屁股的感觉似乎变得很糟糕了呢！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1637',
        any: [/CFLAG:374 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1639',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1640',
        any: [/PRINTFORMW 「屁股…黏糊糊的哟………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1641',
        any: [/CFLAG:374 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1643',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1644',
        any: [/PRINTFORMW 「啊啊啊啊…有点遗憾呢…糟糕的屁股想要主人的肉棒了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1645',
        any: [/CFLAG:374 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1647',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1648',
        any: [/PRINTFORMW 「哈啊啊…更用力地…欺负我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1649',
        any: [/CFLAG:374 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1651',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1652',
        any: [/PRINTFORMW 「啊啊啊…啊…啊啊啊啊啊…屁股…意外地舒服呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1653',
        any: [/CFLAG:374 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1655',
        any: [/ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1656',
        any: [/PRINTFORMW 「总、总算…拿出去了…啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1657',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1657-1658',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1657-1659',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1657-1660',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1666',
        any: [/IF SELECTCOM == 14 && TEQUIP:14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1668',
        any: [/IF CFLAG:315 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1670',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1671',
        any: [/PRINTFORMW 「哈啊啊啊啊…小豆豆已经迫不及待了呢！来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1672',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%毫不犹豫地把振动着的阴蒂夹给夹上了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1674',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1675',
        any: [
          /PRINTFORMW 「啊…啊啊啊…感觉这东西…好厉害啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1676',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把阴蒂夹安上之后脸上浮现出淫荡的表情……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1678-1679',
        any: [/PRINTFORMW 「啊啊啊！这、这种东西！拿走！给我拿下去！啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1679',
        any: [/PRINTFORMW 「啊啊啊！这、这种东西！拿走！给我拿下去！啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1680',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着阴蒂夹震动变强发出哀鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1680-1681',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着阴蒂夹震动变强发出哀鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1682',
        any: [/CFLAG:315 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1682-1683',
        any: [/CFLAG:315 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1685-1687',
        any: [/IF TALENT:76 == 1 && \(CFLAG:315 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1687',
        any: [/IF TALENT:76 == 1 && \(CFLAG:315 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1688',
        any: [
          /PRINTFORMW 「哈啊啊啊啊…小穴已经%UNICODE\(0x2661\) \*1%　失去知觉了　%UNICODE\(0x2661\) \*1% 唔嗯嗯嗯嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1689',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴蒂夹的震动毫不掩饰地娇喘着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1690',
        any: [/CFLAG:315 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1692',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:315 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1693',
        any: [
          /PRINTFORMW 「呜啊…哈啊…这、这太强了…呜啊啊啊！这个强度的…震动…太厉害了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1694',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%伴随着阴蒂夹的震动声，发出愉悦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1695',
        any: [/CFLAG:315 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1697',
        any: [/ELSEIF ABL:0 >= 3 && \(CFLAG:315 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1698',
        any: [/PRINTFORMW 「呜啊…呜…啊啊啊…这、这样…已经…啊啊啊…要去了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1699',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%咬着嘴唇忍耐着压低娇喘的音量。她这个样子非常诱人………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1700',
        any: [/CFLAG:315 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1702',
        any: [/ELSEIF CFLAG:315 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1703',
        any: [/PRINTFORMW 「用、用这种东西…我无话可说…混蛋！啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1704',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然骂着，却也无法取下阴蒂夹，不断地发出哀鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1705',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1705-1706',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1705-1707',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1708-1710',
        any: [/ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1710',
        any: [/ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1712',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:375 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1713',
        any: [/PRINTFORMW 「啊啊…还是安上来比较舒服嘛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1714',
        any: [/CFLAG:375 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1716',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:375 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1717',
        any: [/PRINTFORMW 「哈啊哈啊…总算是结束了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1718',
        any: [/CFLAG:375 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1720',
        any: [/ELSEIF ABL:0 >= 3 && \(CFLAG:375 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1721',
        any: [/PRINTFORMW 「啊啊…哈…啊啊…啊啊啊………呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1722',
        any: [/CFLAG:375 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1724',
        any: [/ELSEIF CFLAG:375 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1725',
        any: [/PRINTFORMW 「总、总算是取下来了…就不能早点吗！废、废物！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1726',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1726-1727',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1726-1728',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1726-1729',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1735',
        any: [/IF SELECTCOM == 15 && TEQUIP:15/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1737',
        any: [/IF CFLAG:316 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1739',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1740',
        any: [
          /PRINTFORMW 「这、这个不错嘛！…乳头…啊啊啊啊…在哧哧地震动%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1741',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为乳头夹的振动呼吸变得粗重起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1743',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1744',
        any: [
          /PRINTFORMW 「呜…呼呼…这、这东西…还…还好啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1745',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着乳头夹的震动显露出淫荡的风情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1747-1748',
        any: [
          /PRINTFORMW 「用这种道具…嘁！%SELF_CALL\(TARGET\)%…啊啊啊啊…怎、怎么会！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1748',
        any: [
          /PRINTFORMW 「用这种道具…嘁！%SELF_CALL\(TARGET\)%…啊啊啊啊…怎、怎么会！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头持续被刺激着，以至于表情都有些扭曲了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1749-1750',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头持续被刺激着，以至于表情都有些扭曲了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1751',
        any: [/CFLAG:316 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1751-1752',
        any: [/CFLAG:316 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1754-1756',
        any: [/IF TALENT:76 == 1 && \(CFLAG:316 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1756',
        any: [/IF TALENT:76 == 1 && \(CFLAG:316 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1757',
        any: [
          /PRINTFORMW 「偶尔这样也不错嘛…%SELF_CALL\(TARGET\)%的乳头…要融化了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1758',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%乳头持续受刺激以至于呼吸变得粗重起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1759',
        any: [/CFLAG:316 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1761',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1762',
        any: [
          /PRINTFORMW 「呼唔啊…不要再欺负…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的乳头…了啊…好嘛%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1763',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着乳头夹的震动显露出淫荡的风情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1764',
        any: [/CFLAG:316 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1766',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:316 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1767',
        any: [
          /PRINTFORMW 「这、这种程度…啊啊啊啊…才不在乎…什么嘛…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1768',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头完全勃起了，乳头夹继续夹着她敏感的部位………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1769',
        any: [/CFLAG:316 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1771',
        any: [/ELSEIF CFLAG:316 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1772',
        any: [/PRINTFORMW 「一点感觉都不会有的…这种事情才不会有感觉啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1773',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头持续被刺激着，以至于表情都有些扭曲了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1774',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1774-1775',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1774-1776',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1777-1779',
        any: [/ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1779',
        any: [/ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1781',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:376 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1782',
        any: [/PRINTFORMW 「呜呜…啊啊…这淫荡的乳头变得更有感觉了呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1783',
        any: [/CFLAG:376 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1785',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:376 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1786',
        any: [/PRINTFORMW 「哈…哈…别再欺负%SELF_CALL\(TARGET\)%了啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1787',
        any: [/CFLAG:376 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1789',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:376 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1790',
        any: [
          /PRINTFORMW 「哼！一点感觉都没有…哈啊。对%SELF_CALL\(TARGET\)%一点意义都没有…唔啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1791',
        any: [/CFLAG:376 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1793',
        any: [/ELSEIF CFLAG:376 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1794',
        any: [/PRINTFORMW 「哈…哈…已经麻、麻木了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1795',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1795-1796',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1795-1797',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1795-1798',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1804',
        any: [/IF SELECTCOM == 16 && TEQUIP:16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1806',
        any: [/IF CFLAG:317 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1808',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1809',
        any: [
          /PRINTFORMW 「呀啊…%SELF_CALL\(TARGET\)%…射出来了射出来了！%UNICODE\(0x2661\) \*1%…好、好刺激%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1810',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被榨乳器榨出乳汁，发出了快意的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1812',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1813',
        any: [
          /PRINTFORMW 「啊、啊啊…%SELF_CALL\(TARGET\)%的胸部…有东西出来了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1814',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被榨乳器榨出乳汁的同时出神地凝望着榨乳器………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1816-1817',
        any: [
          /PRINTFORMW 「住…住手啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%怎么可能有那种东西…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1817',
        any: [
          /PRINTFORMW 「住…住手啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%怎么可能有那种东西…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1818',
        any: [/PRINTFORMW %SAVESTR:TARGET%在榨乳器的压榨下发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1818-1819',
        any: [/PRINTFORMW %SAVESTR:TARGET%在榨乳器的压榨下发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1820',
        any: [/CFLAG:317 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1820-1821',
        any: [/CFLAG:317 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1823-1825',
        any: [/IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1825',
        any: [/IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1826',
        any: [
          /PRINTFORMW 「啊啊啊…有、有快感了…%SELF_CALL\(TARGET\)%…明明只是在蹂躏乳房而已啊…呜呜…要去了！要去了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1827',
        any: [
          /PRINTFORMW 榨乳器开动的瞬间%SAVESTR:TARGET%的母乳就被吸了出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1828',
        any: [
          /PRINTFORMW 「怎么会这样…奶水出来得太多了啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1829',
        any: [/CFLAG:317 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1831',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:317 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1832',
        any: [
          /PRINTFORMW 「胸部…已经流出来了…啊啊啊…魔王大人请享用这新鲜的乳汁吧………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1833',
        any: [
          /PRINTFORMW 榨乳器毫不留情地吸出着%SAVESTR:TARGET%的母乳，母乳的流出使她愉悦地呻吟起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1834',
        any: [
          /PRINTFORMW 「啊啊啊啊…%SELF_CALL\(TARGET\)%的…%SELF_CALL\(TARGET\)%感觉好奇怪…就像是…整个身体都要融化了呜呜呜 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1835',
        any: [/CFLAG:317 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1837',
        any: [/ELSEIF CFLAG:317 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1838',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…的母乳被你这样的小子…喝掉…才不要…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1839',
        any: [
          /PRINTFORMW 榨乳器启动开始刺激%SAVESTR:TARGET%的乳房，然而似乎没有母乳被榨出来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1840',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1840-1841',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1840-1842',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1843-1845',
        any: [/ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1845',
        any: [/ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1847',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:377 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1848',
        any: [
          /PRINTFORMW 「啊啊啊…母乳已经满了…真是糟糕呢…嘿嘿………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1849',
        any: [/CFLAG:377 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1851',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:377 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1852',
        any: [
          /PRINTFORMW 「啊…哈…太好了…胸部没有什么异常反应呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1853',
        any: [/CFLAG:377 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1855',
        any: [/ELSEIF CFLAG:377 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1856',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊啊…竟敢…榨取我的%SELF_CALL\(TARGET\)%乳汁呜啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1857',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1857-1858',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1857-1859',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1857-1860',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1866',
        any: [/IF SELECTCOM == 17 && TEQUIP:17/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1868',
        any: [/IF CFLAG:318 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1870',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1871',
        any: [/PRINTFORMW 「肉棒被摩擦的感觉……意外的舒服呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1873',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1874',
        any: [/PRINTFORMW 「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1876-1877',
        any: [/PRINTFORMW 「嘁…给我按上这样的东西干什么………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1877',
        any: [/PRINTFORMW 「嘁…给我按上这样的东西干什么………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1877-1878',
        any: [/PRINTFORMW 「嘁…给我按上这样的东西干什么………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1879',
        any: [/CFLAG:318 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1879-1880',
        any: [/CFLAG:318 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1882-1884',
        any: [/IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1884',
        any: [/IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1885',
        any: [/PRINTFORMW 「肉棒真舒服啊♪　飞机杯最好了～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1886',
        any: [/PRINTFORMW %SAVESTR:TARGET%强忍着射精的冲动剧烈抽插着阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1887',
        any: [/CFLAG:318 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1889',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:318 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1890',
        any: [/PRINTFORMW 「呜…啊…阴茎…被包裹起来…啊…不可思议的…快感…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1891',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着飞机杯露出陶醉的神情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1892',
        any: [/CFLAG:318 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1894',
        any: [/ELSEIF CFLAG:318 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1895',
        any: [
          /PRINTFORMW 「为、为什么要%SELF_CALL\(TARGET\)%做…这么可怕的事情啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1896',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%羞耻地看着双腿间的飞机杯，欲哭无泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1897',
        any: [/CFLAG:318 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1897-1898',
        any: [/CFLAG:318 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1897-1899',
        any: [/CFLAG:318 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1900-1902',
        any: [/ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1902',
        any: [/ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1904',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:378 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1905',
        any: [
          /PRINTFORMW 「啊啊呜啊…可以的话，能别拔下来吗…想要更多的射精～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1906',
        any: [/CFLAG:378 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1908',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:378 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1909',
        any: [/PRINTFORMW 「啊哈啊啊…真想继续下去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1910',
        any: [/CFLAG:378 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1912',
        any: [/ELSEIF CFLAG:378 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1913',
        any: [/PRINTFORMW 「啊啊啊…总算…取下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1914',
        any: [/CFLAG:378 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1914-1915',
        any: [/CFLAG:378 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1914-1916',
        any: [/CFLAG:378 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1914-1917',
        any: [/CFLAG:378 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1923',
        any: [/IF SELECTCOM == 19 && TEQUIP:19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1925',
        any: [/IF CFLAG:TARGET:320 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1927',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1928',
        any: [
          /PRINTFORMW 「啊啊呜…请继续欺负肛门吧！把珠子全都放进来%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1930',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1931',
        any: [/PRINTFORMW 「啊啊啊啊…忍、忍不住了！…请温柔点…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1933-1934',
        any: [
          /PRINTFORMW 「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1934',
        any: [
          /PRINTFORMW 「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1934-1935',
        any: [
          /PRINTFORMW 「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1936',
        any: [/CFLAG:TARGET:320 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1936-1937',
        any: [/CFLAG:TARGET:320 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1939-1941',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1941',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1942',
        any: [
          /PRINTFORMW 「啊啊啊啊…还不够还不够…请、请更用力的蹂躏我的屁股小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1943',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门像是还想要更多的珠子似的蠢动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1944',
        any: [/CFLAG:320 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1946',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1947',
        any: [
          /PRINTFORMW 「哎呀哎呀…%SELF_CALL\(TARGET\)%的肛门里…满满的都是…好充实%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1948',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在珠子一个个放进来的过程中，发自内心地赞叹着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1949',
        any: [/CFLAG:320 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1951',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1952',
        any: [
          /PRINTFORMW 「啊啊啊…屁股小穴已经饥渴难耐了！请把珠子全都塞进来啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1953',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%张开双腿以便珠子塞入，在完成后舒畅地喘息起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1954',
        any: [/CFLAG:320 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1956',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1957',
        any: [
          /PRINTFORMW 「屁眼要坏了…啊…啊啊…想要…想要更多的充实感啊！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1958',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门非常柔软，甘之如饴地吞进了一个又一个串珠………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1959',
        any: [/CFLAG:320 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1961',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1962',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股…被当做玩物了…啊啊…啊啊…啊呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1963',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每被塞入一个肛珠就发出一声可爱的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1964',
        any: [/CFLAG:320 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1966',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1967',
        any: [/PRINTFORMW 「啊…啊啊啊…变得、有点痛了…呜…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1968',
        any: [/PRINTFORMW %SAVESTR:TARGET%随着肛珠的进入发出痛苦的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1969',
        any: [/CFLAG:320 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1971',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1972',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股…才不会变成你的玩物…啊啊啊…咿…啊…呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1973',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的喘息声随着肛珠的进入变得粗重起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1974',
        any: [/CFLAG:320 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1976',
        any: [/ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1977',
        any: [
          /PRINTFORMW 「呜…唔啊！住手啊你这混球！…怎么能放在做那种事的地方…啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1978',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛珠被一次性全塞进去的时候就老实了下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1979',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1979-1980',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1979-1981',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1982-1984',
        any: [/ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1984',
        any: [/ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1986',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1987',
        any: [
          /PRINTFORMW 「呜咿咿咿！肛门…里面搅成一团了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1988',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛珠拔出的过程中一直发出意义不明的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1989',
        any: [/CFLAG:379 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1991',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1992',
        any: [
          /PRINTFORMW 「啊哈…啊…啊啊啊…%SELF_CALL\(TARGET\)%的屁股…被玩弄了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1993',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出意味深长的遗憾表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1994',
        any: [/CFLAG:379 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1996',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1997',
        any: [/PRINTFORMW 「啊哈！全、全部…全部都弄出来了呢…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1998',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛门张开的过程中一直是一副出神的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '1999',
        any: [/CFLAG:379 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2001',
        any: [/ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2002',
        any: [/PRINTFORMW 「不要啊…啊…啊啊…啊啊啊啊啊…呜呜呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2003',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛珠拔出的不适感一时呆若木鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2004',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2004-2005',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2004-2006',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2004-2007',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2012',
        any: [/IF SELECTCOM == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2014',
        any: [/IF CFLAG:TARGET:321 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2016',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2018',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2020',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2021',
        any: [
          /PRINTFORMW 「哇啊啊…！好…好厉害…魔王大人的大肉棒%UNICODE\(0x2661\) \*1%…%SELF_CALL\(TARGET\)%的处女膜…就请用力地捅破吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2022',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%光滑的皮肤变得通红，缠住%SAVESTR:PLAYER%的双手在耳边低声私语。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2023',
        any: [
          /PRINTFORMW 「就是这样…肆意玩弄%SELF_CALL\(TARGET\)%的小穴%UNICODE\(0x2661\) \*1% 魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2024',
        any: [
          /PRINTFORMW 「啊啊啊！被干得越来越舒服了啊%UNICODE\(0x2661\) \*1%…想更多的品尝，魔王大人的大肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2024-2025',
        any: [
          /PRINTFORMW 「啊啊啊！被干得越来越舒服了啊%UNICODE\(0x2661\) \*1%…想更多的品尝，魔王大人的大肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2026',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%终于变成女人了呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2027',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全无视了破处之痛，脸上露出陶醉的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2028',
        any: [
          /PRINTFORMW 「在这个地方…真正变成魔王大人的女人…真是想都没有想到过呢…哇啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2029',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还想要说什么，不过%SAVESTR:PLAYER%早已心急地托起她的腰开始了征伐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2029-2030',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还想要说什么，不过%SAVESTR:PLAYER%早已心急地托起她的腰开始了征伐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2032',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2034',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2035',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%…已经变成…魔王大人的………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女身被阴茎顶到最深处，忍着骤然产生的痛苦在魔王耳边细语着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2037',
        any: [
          /PRINTFORMW 「喂，喂…先说好，%SELF_CALL\(TARGET\)%要做第一夫人的哟？…唔，这么说你就是我的爱人啦…啊啊啊！别…别动啊！要去了…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2038',
        any: [
          /PRINTFORMW 虽然作为魔族已经屈服了，但%SAVESTR:TARGET%似乎还不是太明白自己的处境呢～需要继续狠狠地调教她啊………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2038-2039',
        any: [
          /PRINTFORMW 虽然作为魔族已经屈服了，但%SAVESTR:TARGET%似乎还不是太明白自己的处境呢～需要继续狠狠地调教她啊………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2040',
        any: [
          /PRINTFORMW 「好幸福…！这、这样的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的第一次…啦啦啦啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2041',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%伸出双手挂在%SAVESTR:PLAYER%脖子上，还是处子身的小穴被阴茎一下子顶到最深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2042',
        any: [
          /PRINTFORMW 「既、既然…已经破了…就…就不用再担心了呢…动、用力地动起来吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2043',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋地恳求着，于是%SAVESTR:PLAYER%愈发激烈地抽查起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2043-2044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋地恳求着，于是%SAVESTR:PLAYER%愈发激烈地抽查起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2046-2047',
        any: [
          /PRINTFORMW 「该、该死…%SELF_CALL\(TARGET\)%的处女…被你这种人…哇啊…啊啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2047',
        any: [
          /PRINTFORMW 「该、该死…%SELF_CALL\(TARGET\)%的处女…被你这种人…哇啊…啊啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2048',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%对%SAVESTR:TARGET%撕心裂肺的哭喊充耳不闻，自顾自地蹂躏着这令人心醉的胴体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2048-2049',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%对%SAVESTR:TARGET%撕心裂肺的哭喊充耳不闻，自顾自地蹂躏着这令人心醉的胴体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2051-2052',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2052',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2053',
        any: [/PRINTFORMW 「抱紧我…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2054',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%拉着手紧抱在一起。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2055',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的小穴已经泛滥成灾…来尽情地欺负我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2057',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2058',
        any: [/PRINTFORMW 「啊哈…开心…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2059',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将双腿抬到最适合插入的角度，发出性感的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2060',
        any: [/PRINTFORMW 「呜…喜欢…喜欢这种感觉%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2062-2063',
        any: [/PRINTFORMW 「哼，你…你喜欢就好…淫棍………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2063',
        any: [/PRINTFORMW 「哼，你…你喜欢就好…淫棍………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2064',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表面上一副不以为然的样子，却随着肉棒的抽送发出懊悔的叹息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2064-2065',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表面上一副不以为然的样子，却随着肉棒的抽送发出懊悔的叹息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2066-2067',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2067',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2067-2068',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2070-2072',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2072',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2073',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2074',
        any: [/PRINTFORMW 「好的！　不错嘛！　更用力一点…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2075',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在激烈的抽插下体液四溅，那样子就像是个下贱的妓女。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2076',
        any: [
          /PRINTFORMW 「不要…停下来…小穴里%UNICODE\(0x2661\) \*1%…要被肉棒%UNICODE\(0x2661\) \*1% 刺穿了啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2077',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2078',
        any: [
          /PRINTFORMW 「啊啊啊…%SELF_CALL\(TARGET\)%…已经…变成魔王大人的肉棒的奴隶了…哈啊啊…请赏赐给您下贱的仆人，您那神圣的肉棒吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2079',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的私处与%SAVESTR:PLAYER%的阴茎紧紧的贴合在一起。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2080',
        any: [
          /PRINTFORMW 「不要放开…要肉棒%UNICODE\(0x2661\) \*1%…一定不要停止下来哟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2080-2081',
        any: [
          /PRINTFORMW 「不要放开…要肉棒%UNICODE\(0x2661\) \*1%…一定不要停止下来哟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2082',
        any: [/PRINTFORMW 「呜…啊啊啊…请更加…更加严厉地惩罚我…惩罚我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2083',
        any: [/PRINTFORMW %SAVESTR:TARGET%向%SAVESTR:PLAYER%撒娇般地要求着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2084',
        any: [
          /PRINTFORMW 「被肉棒惩罚…要高潮了%UNICODE\(0x2661\) \*1%…已经到极限了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2084-2085',
        any: [
          /PRINTFORMW 「被肉棒惩罚…要高潮了%UNICODE\(0x2661\) \*1%…已经到极限了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2086',
        any: [/CFLAG:321 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2088',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2089',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2090',
        any: [/PRINTFORMW 「抱紧一点…要一直这样抱着我哟…呜呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2091',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边喘息着边撒娇似的调笑着正抱住自己的%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2092',
        any: [
          /PRINTFORMW 「啊啊啊…幸福…好幸福…被魔王大人抱着…是这个世界上最幸福的事情啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2093',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2094',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊啊…更、更深一点…魔王大人的肉棒…到%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的…最深处来…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2095',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边扭动着腰一边在%SAVESTR:PLAYER%耳边窃窃私语着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2096',
        any: [
          /PRINTFORMW 「这样…就像这样…深深地吻我…摸…我的乳房%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2096-2097',
        any: [
          /PRINTFORMW 「这样…就像这样…深深地吻我…摸…我的乳房%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2098',
        any: [
          /PRINTFORMW 「啊啊啊…被…魔王大人您…做这样的事…非常的幸福呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2099',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%似乎很喜欢%SAVESTR:PLAYER%蹂躏她的小穴，脸上露出幸福的神色。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2100',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%…已、已经…到极限了了…要去了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2100-2101',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%…已、已经…到极限了了…要去了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2102',
        any: [/CFLAG:321 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2104',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:2 >= 3 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2105',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2106',
        any: [
          /PRINTFORMW 「嘁…呜噗…这样做…根本就不舒服啊…令人憎厌的家伙……啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2107',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%倔强地忍住眼泪承受着%SAVESTR:PLAYER%的侵犯。但她的下体似乎非常诚实地暴露出了对肉棒的渴望。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2108',
        any: [
          /PRINTFORMW 「咿！呜…我…啊啊啊啊…已、已经…滚开…滚开啊！…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2109',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2110',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧咬著嘴唇不想发出任何声音，但淫穴已经泛滥成灾仿佛在等待着男人的征讨。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2111',
        any: [
          /PRINTFORMW 「呜…唔…呜呜…啊…啊…啊…啊啊啊啊…已经完全讨厌不起来了啊！啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2112',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被情欲击溃了所有抵抗，发出呜呜的哭声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2112-2113',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被情欲击溃了所有抵抗，发出呜呜的哭声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2114',
        any: [
          /PRINTFORMW 「这、这种事情……做出这样事情的你……该死的淫虫………去死啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2115',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然嘴上对被侵犯的事情毫不谅解，却诱惑地扭动着腰用自己的身体取悦着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2116',
        any: [
          /PRINTFORMW 「给我适可而止啊…滚开…拔出去…呜…太深了太深了唔啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2116-2117',
        any: [
          /PRINTFORMW 「给我适可而止啊…滚开…拔出去…呜…太深了太深了唔啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2118',
        any: [/CFLAG:321 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2120',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2121',
        any: [
          /PRINTFORMW 「哈啊…啊…啊啊啊…这样就…%SELF_CALL\(TARGET\)%…啊啊啊！啊！啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2122',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%毫不掩饰的喘息让%SAVESTR:PLAYER%的阴茎打了鸡血般变得更硬了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2123',
        any: [/PRINTFORMW 「啊…哎呀…变得，更大了啊…已经是极限了…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2124',
        any: [/CFLAG:321 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2126',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2127',
        any: [
          /PRINTFORMW 「啊…呼…讨厌～…%SELF_CALL\(TARGET\)%…已经…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2128',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%听天由命般任%SAVESTR:PLAYER%粗暴地侵犯着自己………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2129',
        any: [/CFLAG:321 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2131',
        any: [/ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2132',
        any: [
          /PRINTFORMW 「呜…呜呜呜！被做了这样的事情…千万不能被其他人发现啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2133',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的私处似乎还承受不了这样的剧烈抽插，随着%SAVESTR:PLAYER%的动作，%SAVESTR:TARGET%发出哀婉痛苦的悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2134',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2134-2135',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2134-2136',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2134-2137',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2138-2141',
        any: [/;背后位 CFLAG:322/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2143',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2145',
        any: [/IF CFLAG:TARGET:322 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2147',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2149',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2151',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2152',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被阴茎分开青色的臀肉，插入到最深处，发出泣诉似的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2153',
        any: [
          /PRINTFORMW 「啊哈…啊啊…啊啊啊呜%UNICODE\(0x2661\) \*1% 好厉害啊…请继续…%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的处女膜被夺走了啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2154',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%作为魔族证明的尾巴紧紧缠住%SAVESTR:PLAYER%的腰部，仿佛是在寻求更加激烈的凌辱。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2155',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%、哈 %UNICODE\(0x2661\) \*1%…没问题的 %UNICODE\(0x2661\) \*1%…请继续侵犯我…想要魔王大人的大鸡巴%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2155-2156',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%、哈 %UNICODE\(0x2661\) \*1%…没问题的 %UNICODE\(0x2661\) \*1%…请继续侵犯我…想要魔王大人的大鸡巴%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2157',
        any: [/PRINTFORMW 「第一次被从后面插…好兴奋啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2158',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%主动趴在地上引导%SAVESTR:PLAYER%的阴茎插到最深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2159',
        any: [
          /PRINTFORMW 「第一次感受到魔王大人的大肉棒威力呢…%SELF_CALL\(TARGET\)%好幸福啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2160',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那刚刚被破处的小穴蠕动着，变本加厉地向%SAVESTR:PLAYER%索求起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2160-2161',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那刚刚被破处的小穴蠕动着，变本加厉地向%SAVESTR:PLAYER%索求起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2163',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2165',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2166',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的下体狠狠刺破%SAVESTR:TARGET%的处女膜直到最深处，魔族的尾巴因为极度的愉悦直立起来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2167',
        any: [
          /PRINTFORMW 「啊哈…啊啊啊啊…请…魔王大人…不要怜惜我…好棒…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2168',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用指爪支撑着趴在地上，%SAVESTR:PLAYER%从后面不断抽插。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2169',
        any: [
          /PRINTFORMW 「呜啊…啊哈哈…说、说真的…魔王大人的话…怎么使用%SELF_CALL\(TARGET\)%的身体…都无所谓哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2169-2170',
        any: [
          /PRINTFORMW 「呜啊…啊哈哈…说、说真的…魔王大人的话…怎么使用%SELF_CALL\(TARGET\)%的身体…都无所谓哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2171',
        any: [/PRINTFORMW 「这…这姿势…像野兽交合一样…啊啊…啊呜啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2172',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把自己的屁股高高举起，%SAVESTR:PLAYER%收下这淫靡的贡品，夺走了%SAVESTR:TARGET%的纯洁。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2173',
        any: [
          /PRINTFORMW 「这是%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…的第一次…所以…请温柔……呜啊，温柔一点…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2174',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的话似乎没有起到什么作用，%SAVESTR:PLAYER%毫不怜惜地蹂躏着这处女的肉穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2174-2175',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的话似乎没有起到什么作用，%SAVESTR:PLAYER%毫不怜惜地蹂躏着这处女的肉穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2177-2178',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%毫不手软地挺枪直入，将处女膜的阻拦轻松捅破。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2178',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%毫不手软地挺枪直入，将处女膜的阻拦轻松捅破。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2179',
        any: [
          /PRINTFORMW 「不…该死…用这种姿势夺走%SELF_CALL\(TARGET\)%的处女之身…不要啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2180',
        any: [
          /PRINTFORMW 哭泣喊叫的%SAVESTR:TARGET%反而使%SAVESTR:PLAYER%更加兴奋，抓住身下人的腰猛烈地冲刺起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2180-2181',
        any: [
          /PRINTFORMW 哭泣喊叫的%SAVESTR:TARGET%反而使%SAVESTR:PLAYER%更加兴奋，抓住身下人的腰猛烈地冲刺起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2183-2185',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2185',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2186',
        any: [
          /PRINTFORMW 「从后面进来什么的…听起来不错呢%UNICODE\(0x2661\) \*1%…呜啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2187',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体迎合着%SAVESTR:PLAYER%的阴茎摇动起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2188',
        any: [
          /PRINTFORMW 「好…好棒唔…呜…啊啊啊…哈啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2190',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2191',
        any: [/PRINTFORMW 「像是…野兽一样…啊啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2192',
        any: [
          /PRINTFORMW 为了让%SAVESTR:TARGET%体会到野兽一样的感觉，%SAVESTR:PLAYER%故意加大了撞击的力度。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2193',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊啊…呼…好深…唔…太深了啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2195-2196',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%趴在地上，%SAVESTR:PLAYER%的腰肆无忌惮地撞击着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2196',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%趴在地上，%SAVESTR:PLAYER%的腰肆无忌惮地撞击着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2197',
        any: [
          /PRINTFORMW 「这样做…竟然会让你感觉舒服吗…混蛋…呼…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2198',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%到现在还带着一点可爱的嚣张呢，可这反而让人更加兴奋………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2198-2199',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%到现在还带着一点可爱的嚣张呢，可这反而让人更加兴奋………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2200-2201',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2201',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2201-2202',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2204-2206',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2206',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2207',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2208',
        any: [
          /PRINTFORMW 「呼！　哈啊啊…♪　想要更刺激地被干♪ 啊啊啊…这、这样舒服的感觉%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2209',
        any: [
          /PRINTFORMW 为了满足这个愿望，%SAVESTR:TARGET%的腰被紧紧抓住，阴茎狠狠地抽插着发出噗咻噗咻的水声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2210',
        any: [
          /PRINTFORMW 「啊啊啊…啊呜…哈啊…啊啊啊！%SELF_CALL\(TARGET\)%已经被魔王大人的肉棒征服了呜呜呜呜～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2211',
        any: [/PRINTFORMW %SAVESTR:TARGET%的娇吟声越来越大………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2212',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2213',
        any: [
          /PRINTFORMW 「像狗狗一样呢…汪汪！……开个玩笑哈哈…啊啊呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2214',
        any: [/PRINTFORMW %SAVESTR:TARGET%羞答答的样子激发了更狂暴的性欲。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2215',
        any: [
          /PRINTFORMW 「啊呜…啊啊啊啊啊…啊啊啊%UNICODE\(0x2661\) \*1%…%SELF_CALL\(TARGET\)%…想像野兽一样…被从后面侵犯…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2216',
        any: [/PRINTFORMW %SAVESTR:TARGET%背部后仰发出了这样的呼喊………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2216-2217',
        any: [/PRINTFORMW %SAVESTR:TARGET%背部后仰发出了这样的呼喊………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2218',
        any: [/PRINTFORMW 「后面…好啦！　真是的！　…啊啊啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的屁股很容易就将%SAVESTR:PLAYER%的肉棒吸纳进小穴里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2220',
        any: [
          /PRINTFORMW 「被大肉棒…侵犯了啊啊…想要一直一直被侵犯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2221',
        any: [/PRINTFORMW %SAVESTR:TARGET%脑子里已经只剩想被耕耘的欲望了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2221-2222',
        any: [/PRINTFORMW %SAVESTR:TARGET%脑子里已经只剩想被耕耘的欲望了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2223',
        any: [/CFLAG:322 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2225',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2226',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2227',
        any: [
          /PRINTFORMW 「从后面也请温柔点…呜啊哈啊…啊啊…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2228',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的叫声显得有些可爱，%SAVESTR:PLAYER%在这样的刺激下更加卖力了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2229',
        any: [
          /PRINTFORMW 「哼%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1% 啊啊呜%UNICODE\(0x2661\) \*1% 那、那种地方…魔王大人真坏%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2230',
        any: [
          /PRINTFORMW 像只小狗一样的%SAVESTR:TARGET%再度发出了可爱的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2231',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2232',
        any: [
          /PRINTFORMW 「请惩罚我吧…%UNICODE\(0x2661\) \*1% 啊…啊啊啊啊…太、太深了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2233',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%圆滚滚的屁股因为%SAVESTR:PLAYER%腰部激烈的拍打而变得通红。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2234',
        any: [
          /PRINTFORMW 「魔王大人的肉棒…好充实…好棒！最喜欢…最喜欢肉棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2235',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了让%SAVESTR:PLAYER%射在阴道里而卖力地吸吮着肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2235-2236',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了让%SAVESTR:PLAYER%射在阴道里而卖力地吸吮着肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2237',
        any: [
          /PRINTFORMW 「请给…啊呜%UNICODE\(0x2661\) \*1%…我…给我大肉棒…呜啊哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2238',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自然而然地将%SAVESTR:PLAYER%的阴茎吞进小穴里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2239',
        any: [
          /PRINTFORMW 「啊啊啊啊…还、还要…想要更多…%SELF_CALL\(TARGET\)%…像是发情的母狗一样呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2240',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%这发情母狗似的表现让%SAVESTR:TARGET%感到非常兴奋………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2240-2241',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%这发情母狗似的表现让%SAVESTR:TARGET%感到非常兴奋………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2242',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2244',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:2 >= 3 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2245',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2246',
        any: [
          /PRINTFORMW 「啊啊…低、低劣的手段…那种事情…明明…只会觉得痛苦而已…啊呜啊啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2247',
        any: [
          /PRINTFORMW 似乎是有点太激烈了，只是搅动了几下%SAVESTR:TARGET%的声音里就混入了一丝甜美的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2248',
        any: [
          /PRINTFORMW 「啊啊啊…你这样的渣滓…决不会…不会屈服…不…呜…啊啊啊…啊呜哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2249',
        any: [
          /PRINTFORMW 即使%SAVESTR:TARGET%的小穴已经因为调教变得十分敏感，她也顽固地不打算承认的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2250',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2251',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然用手在抵挡着身后人那凶狠的刺击，柔软的小穴却主动纠缠住了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2252',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…绝不是因为你的垃圾肉棒…绝对没有…感觉到什么啊…！哈…啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2253',
        any: [
          /PRINTFORMW 不管%SAVESTR:TARGET%到底有没有感觉到快感，%SAVESTR:TARGET%的淫穴还死死地缠住阴茎不肯放开………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2253-2254',
        any: [
          /PRINTFORMW 不管%SAVESTR:TARGET%到底有没有感觉到快感，%SAVESTR:TARGET%的淫穴还死死地缠住阴茎不肯放开………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2255',
        any: [
          /PRINTFORMW 「啊啊，被做着这样的事情…已经有点习惯了吗…嘁…啊啊啊…！才不会认输啊…糖衣炮弹什么的…啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2256',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了不让%SAVESTR:TARGET%乱动抓紧了她的腰使劲抽插着。那懊悔的声音里明显有着快感的成分。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2257',
        any: [
          /PRINTFORMW 「啊啊啊…这、这样…蛆虫一样下贱的混蛋…啊啊啊啊…和…这样的…%SELF_CALL\(TARGET\)%…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2257-2258',
        any: [
          /PRINTFORMW 「啊啊啊…这、这样…蛆虫一样下贱的混蛋…啊啊啊啊…和…这样的…%SELF_CALL\(TARGET\)%…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2259',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2261',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2262',
        any: [/PRINTFORMW 「再、再激烈一点也…没、没问题的…哈…啊啊啊啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2263',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着恳求和享受的声音发散开来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2264',
        any: [
          /PRINTFORMW 「呜…唔啊…啊啊啊啊啊…已、已经…！…想…被侵犯得更激烈一点…！啊啊啊啊…呼…呜…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2265',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2267',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2268',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%老实的把屁股暴露在%SAVESTR:PLAYER%的面前。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2269',
        any: [/PRINTFORMW 「啊啊…讨厌…啊啊…有点啊啊…太…太深了…啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2270',
        any: [
          /PRINTFORMW 看到%SAVESTR:TARGET%被侵犯得喘息连连快要哭出来的的表情，阴茎变得更加挺立起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2271',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2273',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2274',
        any: [
          /PRINTFORMW 「你这家伙…啊啊啊！你难道不知道什么叫做…温、温柔吗…呼…痛啊…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2275',
        any: [/PRINTFORMW %SAVESTR:TARGET%痛苦的悲鸣着然而似乎无济于事………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2276',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2276-2277',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2276-2278',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2276-2279',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2280-2283',
        any: [/;对面座位 CFLAG:323/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2285',
        any: [/IF SELECTCOM == 22/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2286',
        any: [/IF CFLAG:TARGET:323 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2289',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2291',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2292',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2294',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2295',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2294-2297',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2298',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2299-2303',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2301-2303',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2303',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2304',
        any: [
          /PRINTFORMW 「啊啊…啊啊…热…魔王大人的身体好灼热呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2305',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇晃着身体紧紧地缠住肉棒。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2306',
        any: [
          /PRINTFORMW 「啊啊啊啊…就…就喜欢…这样被侵犯…哈啊…被侵犯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2308',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2309',
        any: [/PRINTFORMW 「很温柔呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2310',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒娇似的把脸靠在%SAVESTR:PLAYER%肩上呢喃道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2311',
        any: [
          /PRINTFORMW 「啊啊啊啊…%SELF_CALL\(TARGET\)%…这样温柔的感觉…还是第一次呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2313-2314',
        any: [
          /PRINTFORMW 「啊哈…这、这不是…这不是恋人才会做的事情吗…啊啊！啊啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2314',
        any: [
          /PRINTFORMW 「啊哈…这、这不是…这不是恋人才会做的事情吗…啊啊！啊啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2315',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧抱住%SAVESTR:TARGET%不让她逃走，慢慢开始晃动腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2315-2316',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧抱住%SAVESTR:TARGET%不让她逃走，慢慢开始晃动腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2317-2318',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2318',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2318-2319',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2321-2323',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2323',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2324',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2325',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…很喜欢这样被操啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴被塞得慢慢的，望着%SAVESTR:PLAYER%的脸忽然凑上来舔了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2327',
        any: [
          /PRINTFORMW 「哈啊…呜…呜啊…已、已经…%SELF_CALL\(TARGET\)%…已经…要高潮了呜啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2328',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2329',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴贪婪地吸引着%SAVESTR:PLAYER%的阴茎，想要把它整个吞进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2330',
        any: [
          /PRINTFORMW 「肉棒…越来越想要…魔王大人的肉棒了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2331',
        any: [
          /PRINTFORMW 那诱人的腰肢不断摆动着品尝起%SAVESTR:PLAYER%肉棒的滋味………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2331-2332',
        any: [
          /PRINTFORMW 那诱人的腰肢不断摆动着品尝起%SAVESTR:PLAYER%肉棒的滋味………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2333',
        any: [
          /PRINTFORMW 「啊啊…啊啊…热…魔王大人的身体好灼热呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2334',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇晃着身体紧紧地缠住肉棒。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2335',
        any: [
          /PRINTFORMW 「啊啊啊…想被更粗暴的…侵犯…侵犯…侵犯啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2335-2336',
        any: [
          /PRINTFORMW 「啊啊啊…想被更粗暴的…侵犯…侵犯…侵犯啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2337',
        any: [/CFLAG:323 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2339',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2340',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2341',
        any: [
          /PRINTFORMW 「喜…喜欢…%SELF_CALL\(TARGET\)%…喜欢魔王大人下面的的东西…啊啊啊…呜啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2342',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%主动向你索吻，同时%SAVESTR:TARGET%的下体也夹得越来越紧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2343',
        any: [
          /PRINTFORMW 「啊啊啊…已经…爱上做爱这种事情了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2344',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2345',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%，不禁咬住%SAVESTR:PLAYER%肩头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2346',
        any: [
          /PRINTFORMW 「哈啊…啊啊…啊啊啊啊…太深了…最、最里面…里面…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2347',
        any: [
          /PRINTFORMW 虽然%SAVESTR:PLAYER%很体谅%SAVESTR:TARGET%的辛苦，但仍不断抽插着肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2347-2348',
        any: [
          /PRINTFORMW 虽然%SAVESTR:PLAYER%很体谅%SAVESTR:TARGET%的辛苦，但仍不断抽插着肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2349',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒娇似的把脸靠在%SAVESTR:PLAYER%肩上呢喃到。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2350',
        any: [
          /PRINTFORMW 「啊哈啊啊…%SELF_CALL\(TARGET\)%…喜欢被这样温柔的对待呢…………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2351',
        any: [/PRINTFORMW %SAVESTR:TARGET%主动摆动腰臀迎合着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2351-2352',
        any: [/PRINTFORMW %SAVESTR:TARGET%主动摆动腰臀迎合着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2353',
        any: [/CFLAG:323 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2355',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:2 >= 3 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2357',
        any: [/IF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2358',
        any: [
          /PRINTFORMW 尽管%SAVESTR:TARGET%努力从%SAVESTR:PLAYER%身边挣脱，%SAVESTR:PLAYER%还是抓住她的腰边抚摸那诱人的身躯边开始了冲击。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2359',
        any: [
          /PRINTFORMW 「呜…哈…唔啊啊…啊啊…已经逃不出这双手了吗…不，%SELF_CALL\(TARGET\)%仅仅是…被那东西给…呜啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2360',
        any: [
          /PRINTFORMW 被开发的身体反应十分敏感，双手徒劳地在%SAVESTR:PLAYER%背后拉扯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2362',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2363',
        any: [
          /PRINTFORMW 「啊啊啊…别抱着我啊，讨厌的男人…啊啊啊啊啊！腰、腰也不准动…不、不行…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2364',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的挣扎和悲鸣被完全无视了，阳具在她体内搅动。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2365',
        any: [
          /PRINTFORMW 「被做了这样的事情…%SELF_CALL\(TARGET\)%…啊啊啊…那、那里不行啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2365-2366',
        any: [
          /PRINTFORMW 「被做了这样的事情…%SELF_CALL\(TARGET\)%…啊啊啊…那、那里不行啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2367',
        any: [
          /PRINTFORMW 「卑鄙的家伙…竟然对%SELF_CALL\(TARGET\)%做这样的事情…啊啊啊啊……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2368',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的骂声中%SAVESTR:PLAYER%抓住她的腰开始推送，这样的她再怎么挣扎也无能为力吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2369',
        any: [
          /PRINTFORMW 「啊啊啊…呼…呜啊…呜啊…完、完全就没有感觉嘛…哈呜…住手…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2370',
        any: [
          /PRINTFORMW 嘴上这么说着小穴却像金鱼嘴一样紧紧吸附着的%SAVESTR:TARGET%看上去也有点可爱呢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2370-2371',
        any: [
          /PRINTFORMW 嘴上这么说着小穴却像金鱼嘴一样紧紧吸附着的%SAVESTR:TARGET%看上去也有点可爱呢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2372',
        any: [/CFLAG:323 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2374',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2375',
        any: [
          /PRINTFORMW 「就是这样子…啊…啊呜呜！呜…！真是的，用力过头了吧…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2376',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被下面的人轻轻顶着，就晃动着发出甜腻淫荡的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2377',
        any: [/CFLAG:323 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2379',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2380',
        any: [
          /PRINTFORMW 「啊啊啊…呜啊！呜！………这个程度的动作…好吧…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2381',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%拼命地摇摆着腰肢，让%SAVESTR:PLAYER%感到非常愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2382',
        any: [/CFLAG:323 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2384',
        any: [/ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2385',
        any: [/PRINTFORMW 「居、居然…做出…这样的事…不…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2386',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想要逃开的身躯被紧紧抱住，无力挣脱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2387',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2387-2388',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2387-2389',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2387-2390',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2391-2394',
        any: [/;背面座位 CFLAG:324/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2396',
        any: [/IF SELECTCOM == 23/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2397',
        any: [/IF CFLAG:TARGET:324 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2400',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2402',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2403',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2405',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2406',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2405-2408',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2409',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2410-2414',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2412-2414',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2414',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2415',
        any: [
          /PRINTFORMW 「啊啊啊啊…进进出出的地方…都被看光了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2416',
        any: [/PRINTFORMW %SAVESTR:TARGET%主动张开双腿扭动着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2418',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2419',
        any: [
          /PRINTFORMW 「就这样从后面抱着我…啊…啊啊啊呜…魔王大人…真可爱%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2420',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把手绕到后面抚摸%SAVESTR:PLAYER%，发出娇嫩的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2422-2423',
        any: [/PRINTFORMW 「住、住手啊肮脏的家伙…！放、放开我…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2423',
        any: [/PRINTFORMW 「住、住手啊肮脏的家伙…！放、放开我…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2423-2424',
        any: [/PRINTFORMW 「住、住手啊肮脏的家伙…！放、放开我…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2425-2426',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2426',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2426-2427',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2429-2431',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2431',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2432',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2433',
        any: [
          /PRINTFORMW 「啊啊啊…能享用这样的肉棒%UNICODE\(0x2661\) \*1% 不论怎样都无所谓啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2434',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%来回抚摸着下腹，屁股左右摆动想要把阴茎吞到更深的地方………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2435',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2436',
        any: [
          /PRINTFORMW 「用力抱紧我…怎样都不要放开%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2437',
        any: [
          /PRINTFORMW 如同%SAVESTR:TARGET%所期望的那样，%SAVESTR:PLAYER%从后面抱住她，肉棒在泛滥成灾的小穴里狠狠抽插起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2437-2438',
        any: [
          /PRINTFORMW 如同%SAVESTR:TARGET%所期望的那样，%SAVESTR:PLAYER%从后面抱住她，肉棒在泛滥成灾的小穴里狠狠抽插起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2439',
        any: [
          /PRINTFORMW 「啊啊啊啊…想要肉棒…插得更深一些！啊啊啊啊…谢谢款待哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2440',
        any: [
          /PRINTFORMW 如%SAVESTR:TARGET%所愿插入得更深了。久经调教的身体柔软摆动，取悦着身后紧紧抱住的%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2441',
        any: [
          /PRINTFORMW 「更、更想…想要…想要肉棒了啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2441-2442',
        any: [
          /PRINTFORMW 「更、更想…想要…想要肉棒了啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2443',
        any: [/CFLAG:324 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2445',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2446',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2447',
        any: [
          /PRINTFORMW 「那、那里…已经…被您弄得黏糊糊的了呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2448',
        any: [/PRINTFORMW 从后面抱着的%SAVESTR:TARGET%温柔的声音充满了甜蜜……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2449',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2450',
        any: [
          /PRINTFORMW 「啊啊啊…呜…哈啊哈啊…已经要去了呢…明明还想要更激烈一点%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2451',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地抚摸着乳房，腰部配合地扭动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2451-2452',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地抚摸着乳房，腰部配合地扭动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2453',
        any: [
          /PRINTFORMW 「从后面抱着很温柔呢…呜…啊啊…大脑里一片空白了啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2454',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面插得几乎神志不清，连喘息声都甜得发腻………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2454-2455',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面插得几乎神志不清，连喘息声都甜得发腻………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2456',
        any: [/CFLAG:324 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2458',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:2 >= 3 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2459',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2460',
        any: [/PRINTFORMW 「哈…啊啊啊…脖子…很痒的啊…呜哈啊啊啊！啊…啊呼！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2461',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%亲吻着%SAVESTR:TARGET%的脖子，缓缓地开始了征伐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2462',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2463',
        any: [
          /PRINTFORMW 「下、下贱的魔族…再侮辱%SELF_CALL\(TARGET\)%的话…就…啊啊啊啊…够了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2464',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%的抽插下大声地叫着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2465',
        any: [/PRINTFORMW 女人嫌弃地看着玩弄自己身体的“对手”………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2465-2466',
        any: [/PRINTFORMW 女人嫌弃地看着玩弄自己身体的“对手”………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2467',
        any: [
          /PRINTFORMW 「哈啊…啊…啊呼…别得意忘形…总有一天会让你…啊啊啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2468',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%腰间喝骂着，那小穴正是男人求之不得的瑰宝啊。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2469',
        any: [/PRINTFORMW 她不知不觉开始扭动着腰，发出快乐的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2469-2470',
        any: [/PRINTFORMW 她不知不觉开始扭动着腰，发出快乐的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2471',
        any: [/CFLAG:324 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2473',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2474',
        any: [
          /PRINTFORMW 「呜…啊呜！…哈啊哈啊…到…到最里面了…插进来了…啊啊啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2475',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%弯着腰，灼热的小穴紧紧包裹着%SAVESTR:PLAYER%的阴茎持续提供着快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2476',
        any: [/CFLAG:324 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2478',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2479',
        any: [/PRINTFORMW 「啊…哈啊…啊啊啊…胸部！干嘛…抓这么紧啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2480',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸部被揉搓着，小穴也被更加激烈地冲击着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2481',
        any: [/CFLAG:324 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2483',
        any: [/ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2484',
        any: [
          /PRINTFORMW 「滚…放手啊…不管你怎么做…我也只会感到痛苦而已…停手…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2485',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴道被%SAVESTR:PLAYER%的肉棒叩开，狠狠插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2486',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2486-2487',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2486-2488',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2486-2489',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2490-2493',
        any: [/;正常位肛交 CFLAG:327/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2496',
        any: [/IF SELECTCOM == 26/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2498',
        any: [/IF CFLAG:TARGET:327 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2500',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2501',
        any: [
          /PRINTFORMW 「啊啊啊呜！那、那里是屁…啊啊啊…好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2502',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被阴茎一口气插到深处，%SAVESTR:TARGET%双手在%SAVESTR:PLAYER%背上抓挠着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2504',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2505',
        any: [
          /PRINTFORMW 「啊、啊如果是…魔王大人的话…%SELF_CALL\(TARGET\)%什么都…呜呜！呜啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被阴茎一口气贯穿，因为痛苦不禁咬住了嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2508-2509',
        any: [
          /PRINTFORMW 「住手…你这变态的肮脏动物！那、那不是插进去的地方啊…不要啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2509',
        any: [
          /PRINTFORMW 「住手…你这变态的肮脏动物！那、那不是插进去的地方啊…不要啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2509-2510',
        any: [
          /PRINTFORMW 「住手…你这变态的肮脏动物！那、那不是插进去的地方啊…不要啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2511',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2511-2512',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2514-2515',
        any: [/;アナル狂い TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2517',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2518',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2519',
        any: [
          /PRINTFORMW 「啊哇啊…啊呜…啊啊…啊哈…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门的蹂躏已经几乎进入了极乐世界，只能不断地发出喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2522',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET, 1\)%…要和这根大鸡巴结婚啊啊%UNICODE\(0x2661\) \*1% 屁眼已经要升天了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2523',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2524',
        any: [
          /PRINTFORMW 「魔王大人的大肉棒…好厉害…请继续…侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2525',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%檀口微张，享受着%SAVESTR:PLAYER%对自己肛门的侵犯………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2527',
        any: [
          /PRINTFORMW 「要受不了了%UNICODE\(0x2661\) \*1% 要疯了疯了啊啊啊%UNICODE\(0x2661\) \*1% 啊啊啊啊…%SELF_CALL\(TARGET\)%已经，对肉棒完全失去抵抗力了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2527-2528',
        any: [
          /PRINTFORMW 「要受不了了%UNICODE\(0x2661\) \*1% 要疯了疯了啊啊啊%UNICODE\(0x2661\) \*1% 啊啊啊啊…%SELF_CALL\(TARGET\)%已经，对肉棒完全失去抵抗力了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2529',
        any: [
          /PRINTFORMW 「啊啊啊啊呜…呜…这是…屁股小穴被扩张开了呢…！真、真棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2530',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%饱受调教的屁股将%SAVESTR:PLAYER%的肉棒紧紧缠绕起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2532',
        any: [
          /PRINTFORMW 「哈哈哈啊啊啊哈%UNICODE\(0x2661\) \*1%…还想被侵犯…肛门已经爱上肉棒的味道了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2532-2533',
        any: [
          /PRINTFORMW 「哈哈哈啊啊啊哈%UNICODE\(0x2661\) \*1%…还想被侵犯…肛门已经爱上肉棒的味道了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2534',
        any: [/CFLAG:327 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2536',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2537',
        any: [/PRINTFORMW 「魔王大人…啊啊啊啊啊…再激烈一点也…没关系的呜啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2538',
        any: [/PRINTFORMW %SAVESTR:TARGET%调教不足的肛门显得有一丝痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2539',
        any: [/CFLAG:327 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2541',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2542',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2543',
        any: [
          /PRINTFORMW 「哎呀…这感觉…啊啊啊啊…屁股…出乎意料地舒服呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2544',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门虽然被蹂躏着却感到十分舒服，连带着屁股附近的部位也充满快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2546',
        any: [
          /PRINTFORMW 「还要！还想被干！%SELF_CALL\(TARGET\)%的屁股…要去了啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2546-2547',
        any: [
          /PRINTFORMW 「还要！还想被干！%SELF_CALL\(TARGET\)%的屁股…要去了啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2548',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的屁股…快感十足呢…啊啊啊…魔王大人下面的东西…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2549',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的抽插弄得高潮连连………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2551',
        any: [
          /PRINTFORMW 「屁股在发热…！主人的…%UNICODE\(0x2661\) \*1%好棒%UNICODE\(0x2661\) \*1%…呜啊哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2551-2552',
        any: [
          /PRINTFORMW 「屁股在发热…！主人的…%UNICODE\(0x2661\) \*1%好棒%UNICODE\(0x2661\) \*1%…呜啊哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2553',
        any: [/CFLAG:327 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2555',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2556',
        any: [/PRINTFORMW 「魔王大人…啊啊啊啊啊…就不能温柔点吗………呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2557',
        any: [/PRINTFORMW %SAVESTR:TARGET%调教不足的肛门显得有一丝痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2558',
        any: [/CFLAG:327 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2560',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:3 >= 3 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2561',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2562',
        any: [
          /PRINTFORMW 「混蛋…混蛋…快拔出来…啊啊！会坏掉的…%SELF_CALL\(TARGET\)%的屁股，怎么可能主动分开…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2563',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对肛门被侵犯的事情表现出强烈的嫌恶感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2564',
        any: [/PRINTFORMW 「呜…该死…你这蛆虫…快拔出来…拔出来啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2565',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2566',
        any: [
          /PRINTFORMW 「咦…呜呜呜！…啊啊啊…啊啊啊啊啊………！你这下贱无耻的混蛋，下贱无耻！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2567',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门因为阴茎的进出持续地产生着快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2568',
        any: [
          /PRINTFORMW 「啊啊啊啊…到这个程度了…就…就已经…到此为止了吧…呜…啊啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2568-2569',
        any: [
          /PRINTFORMW 「啊啊啊啊…到这个程度了…就…就已经…到此为止了吧…呜…啊啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2570',
        any: [
          /PRINTFORMW 「渣滓…！啊、啊呜哈啊啊…这样玩弄奇怪的地方…到底有什么意义…呜！唔啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2571',
        any: [/PRINTFORMW %SAVESTR:TARGET%在侵犯的间隙不断痛骂着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2572',
        any: [
          /PRINTFORMW 「垃圾！废物！给我停手啊…啊啊啊啊啊！混蛋住手啊！！啊呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2572-2573',
        any: [
          /PRINTFORMW 「垃圾！废物！给我停手啊…啊啊啊啊啊！混蛋住手啊！！啊呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2574',
        any: [/CFLAG:327 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2576',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2577',
        any: [/PRINTFORMW 「呜…哈…啊啊啊啊…！不、不行了…！要去了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2578',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门大概已经习惯了这样的事情，随着抽插发出轻微的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2579',
        any: [/CFLAG:327 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2581',
        any: [/ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2582',
        any: [/PRINTFORMW 「啊喂…住…住手啊！…滚、滚开…滚开啊败类！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW 懊悔的呻吟声中%SAVESTR:TARGET%的肛门依然紧闭着，%SAVESTR:PLAYER%强行挤开了肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2584',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2584-2585',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2584-2586',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2584-2587',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2588-2591',
        any: [/;背后位アナル CFLAG:328/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2593',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2595',
        any: [/IF CFLAG:TARGET:328 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2597',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2598',
        any: [
          /PRINTFORMW 「屁眼被射满精液了…♪啊呜啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2599',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被从后面贯穿，发出撒娇似的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2601',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2602',
        any: [/PRINTFORMW 「屁股里感觉，好奇怪呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2603',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被从后面贯穿，喘息变得粗重起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2605-2606',
        any: [/PRINTFORMW 「那、那里…不、不能用啊…可恶的败类，别乱动啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2606',
        any: [/PRINTFORMW 「那、那里…不、不能用啊…可恶的败类，别乱动啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2607',
        any: [/PRINTFORMW %SAVESTR:TARGET%肛门被从后面侵犯着，惨叫连连………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2607-2608',
        any: [/PRINTFORMW %SAVESTR:TARGET%肛门被从后面侵犯着，惨叫连连………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2609',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2609-2610',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2612-2613',
        any: [/;淫乱＋A感覚Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2614',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2615',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2616',
        any: [
          /PRINTFORMW 「哈呜…啊呜…啊啊啊呜…屁股小穴被侵犯什么的…最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2617',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那开发过的肛门就像专门为男人所准备似的………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2618',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2619',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2620',
        any: [
          /PRINTFORMW 「啊哈哈哈…就这样射精吧！%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…的屁股小穴想喝精液啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2621',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门为了促进射精紧紧包裹住%SAVESTR:TARGET%的阴茎蠕动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2621-2622',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门为了促进射精紧紧包裹住%SAVESTR:TARGET%的阴茎蠕动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2623',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2624',
        any: [
          /PRINTFORMW 「肛门感觉，好舒服啊…%UNICODE\(0x2661\) \*1% 你好坏呢%UNICODE\(0x2661\) \*1% 哈啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2625',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓住肆意侵犯着肛门。快感不断地侵袭着她的全身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2626',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2627',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2628',
        any: [
          /PRINTFORMW 「啊啊啊呜%UNICODE\(0x2661\) \*1%…%SELF_CALL\(TARGET\)%…肛门被侵犯什么的…感觉太棒了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2629',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%已经没有办法从这样的快感中挣脱了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2629-2630',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%已经没有办法从这样的快感中挣脱了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2631-2632',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股只要…只要有肉棒就会变得很开心呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2632',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股只要…只要有肉棒就会变得很开心呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2633',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动着纤腰贪婪地将%SAVESTR:PLAYER%的阴茎吞入尻穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2634',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2635',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2636',
        any: [
          /PRINTFORMW 「呜啊哈啊%UNICODE\(0x2661\) \*1% 哈啊啊啊啊%UNICODE\(0x2661\) \*1% 屁股什么的好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2637',
        any: [/PRINTFORMW %SAVESTR:TARGET%在阴茎强烈的突进下浪叫起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2637-2638',
        any: [/PRINTFORMW %SAVESTR:TARGET%在阴茎强烈的突进下浪叫起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2639-2640',
        any: [/CFLAG:328 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2640',
        any: [/CFLAG:328 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2642',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2643',
        any: [/PRINTFORMW 「啊啊…啊啊啊！太、太激烈了…太激烈了！啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2644',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的悲鸣声不断响起，肛门已经习惯了这种抽插了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2645',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2647',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2648',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2649',
        any: [
          /PRINTFORMW 「噢！我的屁股已经！　唔啊啊啊！　记住阴茎的形状了啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2650',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被侵犯发出了下贱的悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2651',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2652',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2653',
        any: [
          /PRINTFORMW 「已经…已经不行了…这淫荡的屁股%UNICODE\(0x2661\) \*1%迫不及待了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2654',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%半翻着白眼几乎要失去神智了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2654-2655',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%半翻着白眼几乎要失去神智了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2656-2657',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股…也能作为性器了吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2657',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%的屁股…也能作为性器了吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2658',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%已经完全变得柔软的肛门缠绕着%SAVESTR:PLAYER%的肉棒，快感不断上升………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2659',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2660',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2661',
        any: [
          /PRINTFORMW 「啊啊啊啊…淫荡的…%SELF_CALL\(TARGET\)%…已、已经要…要疯了啊啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2662',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%半翻着白眼几乎要失去神智了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2662-2663',
        any: [
          /PRINTFORMW 作为尻穴狂的%SAVESTR:TARGET%半翻着白眼几乎要失去神智了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2664-2665',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2665',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2667',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2668',
        any: [
          /PRINTFORMW 「啊啊…屁股…要坏掉了坏掉了啊！…呜啊！…哈呜…哈啊！啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2669',
        any: [
          /PRINTFORMW 大概是%SAVESTR:TARGET%的菊穴还不太习惯的缘故，声音中带着一丝痛楚………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2670',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2672',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:3 >= 3 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2673',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2674',
        any: [
          /PRINTFORMW 「啊啊啊…别、别看啊…变态！ 呜哇！不要啊…住手啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2675',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的肛门被%SAVESTR:PLAYER%的肉棒插得肠液四溅。这大概就是所谓的口嫌体正直吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2676',
        any: [/PRINTFORMW 「啊啊啊…不、不要啦…这样的东西…啊啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2677',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2678',
        any: [
          /PRINTFORMW 「啊啊啊啊…呜…！只有变态…才会对屁股这么执着吧……啊啊哇啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2679',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%那久经开发的淫荡菊穴已经变得湿润了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2680',
        any: [
          /PRINTFORMW 「啊啊…怎么会！屁股…变得奇怪了…要去了呜啊啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2680-2681',
        any: [
          /PRINTFORMW 「啊啊…怎么会！屁股…变得奇怪了…要去了呜啊啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2682',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…会有这样的感觉什么的…是假的吧…假的吧…啊啊啊啊呜！不要啊！哇啊唔啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2683',
        any: [
          /PRINTFORMW 悲呼喊着的%SAVESTR:TARGET%的肛门显得有些窄小，这使%SAVESTR:PLAYER%感到更加愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2683-2684',
        any: [
          /PRINTFORMW 悲呼喊着的%SAVESTR:TARGET%的肛门显得有些窄小，这使%SAVESTR:PLAYER%感到更加愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2685',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2687',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2688',
        any: [
          /PRINTFORMW 「什么啊…到、到这个程度…%SELF_CALL\(TARGET\)%…已经…已经…要去了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2689',
        any: [
          /PRINTFORMW 肛门被侵犯着的%SAVESTR:TARGET%那甘甜的呻吟与%SAVESTR:PLAYER%的愉悦低吼交织在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2690',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2692',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2693',
        any: [/PRINTFORMW 「别、别动啊…呜…痛…很痛的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2694',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%随着肛门内肉棒的抽送痛苦地咒骂着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2695',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2695-2696',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2695-2697',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2695-2698',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2699-2702',
        any: [/;对面座位アナル CFLAG:329/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2704',
        any: [/IF SELECTCOM == 28/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2706',
        any: [/IF CFLAG:TARGET:329 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2708',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2709',
        any: [
          /PRINTFORMW 「呜…啊呜…哈啊…肉棒…一整根都插进去了呢…呜呜哈啊…真、真是让人心情愉悦啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2710',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2712',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2713',
        any: [
          /PRINTFORMW 「啊哈呜%UNICODE\(0x2661\) \*1% 哇、哇啊…屁、屁股变得怪怪的啦…请、请抱紧我哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2714',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%温柔地抱着%SAVESTR:TARGET%，体恤地慢慢开始了抽插………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2716-2717',
        any: [/PRINTFORMW 「住…住手…那是屁股啊…！喂…别、别凑上来啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2717',
        any: [/PRINTFORMW 「住…住手…那是屁股啊…！喂…别、别凑上来啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2718',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一把抱住想要逃开的%SAVESTR:TARGET%、腰部开始慢慢耸动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2718-2719',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一把抱住想要逃开的%SAVESTR:TARGET%、腰部开始慢慢耸动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2720',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2720-2721',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2723-2724',
        any: [/;淫乱＋A感覚Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2725',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2726',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2727',
        any: [
          /PRINTFORMW 「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人心情愉悦啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2728',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的开心………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2729',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2730',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2731',
        any: [
          /PRINTFORMW 「啊啊啊呜…屁股什么的最棒了啊啊%UNICODE\(0x2661\) \*1%…想、想要更多的精液呜哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那淫荡的屁股似乎想要享受更多的%SAVESTR:PLAYER%的精液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2732-2733',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那淫荡的屁股似乎想要享受更多的%SAVESTR:PLAYER%的精液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2734',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2735',
        any: [
          /PRINTFORMW 「啊啊啊…已、已经…屁眼已经快要忍不住了…呜、呜啊…好舒服啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2736',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱紧了%SAVESTR:PLAYER%主动扭动着腰部迎合着抽插……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2737',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2738',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2739',
        any: [
          /PRINTFORMW 「啊啊啊…%UNICODE\(0x2661\) \*1%屁眼感觉好…好棒…很棒呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2740',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%的肩流着口水，犹自不满足地摆动着腰肢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2740-2741',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%的肩流着口水，犹自不满足地摆动着腰肢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2742-2743',
        any: [
          /PRINTFORMW 「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人好开心啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2743',
        any: [
          /PRINTFORMW 「呜…啊呜…哈啊…肉棒…一整根都进去了呢…呜呜哈啊…真、真是让人好开心啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2744',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫荡的笑容，对肛门被侵犯这件事情感受到发自内心的喜悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2745',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2746',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2747',
        any: [
          /PRINTFORMW 「啊啊啊呜…屁股什么的最棒了啊啊%UNICODE\(0x2661\) \*1%…想、想要更多的肉棒牛奶呜啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2748',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那淫荡的屁股似乎想要享受更多的%SAVESTR:PLAYER%的精液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2748-2749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那淫荡的屁股似乎想要享受更多的%SAVESTR:PLAYER%的精液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2750-2751',
        any: [/CFLAG:329 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2751',
        any: [/CFLAG:329 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2753',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2754',
        any: [
          /PRINTFORMW 「啊呜…啊啊啊…大肉棒…全都插进去了…呜…有、有点点痛呢…呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2755',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%有些痛苦地皱着眉将%SAVESTR:PLAYER%的阴茎引入自己的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2756',
        any: [/CFLAG:329 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2758',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2759',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2760',
        any: [
          /PRINTFORMW 「哈啊…啊啊…屁股被侵犯什么的…想多看一会儿呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2761',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱在身上，扭动着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2762',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2763',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2764',
        any: [
          /PRINTFORMW 「啊啊啊啊…%UNICODE\(0x2661\) \*1% 这样就够了吧…再、再来是不允许的啦%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2765',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%勉强保持着姿态，强忍着高潮的欲望………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2765-2766',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%勉强保持着姿态，强忍着高潮的欲望………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2767-2768',
        any: [
          /PRINTFORMW 「呜…啊啊啊…哈啊哈啊…屁股…一边被侵犯…一边看着魔王大人的样子…唔啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2768',
        any: [
          /PRINTFORMW 「呜…啊啊啊…哈啊哈啊…屁股…一边被侵犯…一边看着魔王大人的样子…唔啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2769',
        any: [
          /PRINTFORMW 说着这样的话%SAVESTR:TARGET%伸出舌头与%SAVESTR:PLAYER%纠缠起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2770',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2771',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2772',
        any: [
          /PRINTFORMW 「哈…哈…呜…呜啊%UNICODE\(0x2661\) \*1%…呜啊%UNICODE\(0x2661\) \*1%…屁股…已、已经…要去了呜呜呜………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2773',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的话里带着无法压抑的愉悦与淫靡的气氛………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2773-2774',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的话里带着无法压抑的愉悦与淫靡的气氛………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2775-2776',
        any: [/CFLAG:329 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2776',
        any: [/CFLAG:329 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2778',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2779',
        any: [
          /PRINTFORMW 「哈啊哈啊…请…慢一点啊…呜…哈啊哈啊…再温柔一些嘛……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2780',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门因为开发不足而感到有些痛苦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2781',
        any: [/CFLAG:329 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2783',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:3 >= 3 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2784',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2785',
        any: [
          /PRINTFORMW 「啊啊…啊呜啊…哈啊…啊啊…啊啊啊…恶、恶心的感觉……明明…怎么会这样啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2786',
        any: [
          /PRINTFORMW 虽然流着泪但%SAVESTR:TARGET%久经调教的肛门似乎已经无法忍耐那如潮般的快感了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2787',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2788',
        any: [
          /PRINTFORMW 「哈啊…呜…不…不要…让我…呜嗯…看到你那恶心的脸………呜哇哇！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2789',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上那厌恶忍耐的表情在肛门被侵犯的时候已经坚持不下去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2789-2790',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上那厌恶忍耐的表情在肛门被侵犯的时候已经坚持不下去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2791',
        any: [/PRINTFORMW 「这份屈辱…该死…人渣…啊啊啊啊！我会…唔啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2792',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛门被抽插的瞬间发出一声悲鸣，这使%SAVESTR:PLAYER%更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2792-2793',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在肛门被抽插的瞬间发出一声悲鸣，这使%SAVESTR:PLAYER%更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2794',
        any: [/CFLAG:329 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2796',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2797',
        any: [
          /PRINTFORMW 「哈啊啊啊…呜…呜啊…屁股…感觉在发热…！请、请就那样慢慢的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2798',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TARGET%抱在怀中侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2799',
        any: [/CFLAG:329 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2801',
        any: [/ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2802',
        any: [/PRINTFORMW 「不…不要…这肮脏的…滚、滚开…滚开啊…混蛋啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2803',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一把抱住想要逃开的%SAVESTR:TARGET%、腰部开始慢慢耸动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2804',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2804-2805',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2804-2806',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2804-2807',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2808-2811',
        any: [/;背面座位肛交 CFLAG:330/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2814',
        any: [/IF SELECTCOM == 29/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2816',
        any: [/IF CFLAG:TARGET:330 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2818',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2819',
        any: [
          /PRINTFORMW 「啊啊啊…呜…被人从后面抱着…侵犯屁股小洞洞什么的………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2820',
        any: [
          /PRINTFORMW 然后对%SAVESTR:TARGET%那充满弹性的肛门的侵犯就继续起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2822',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2823',
        any: [/PRINTFORMW 「哈啊…哈啊…真、真是的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2824',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被从后方贯穿，发出了可爱的悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2826-2827',
        any: [/PRINTFORMW 「滚开…别、别过来！别再做强暴之类的事情了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2827',
        any: [/PRINTFORMW 「滚开…别、别过来！别再做强暴之类的事情了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2828',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被侵犯悲伤的哭泣着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2828-2829',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被侵犯悲伤的哭泣着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2830',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2830-2831',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2833-2834',
        any: [/;淫乱＋A感覚Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2835',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2836',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2837',
        any: [
          /PRINTFORMW 「呜哇…啊啊啊…啊啊…哈啊啊啊%UNICODE\(0x2661\) \*1% 想要…想要屁眼被更狠地侵犯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2838',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的屁股左右摇动着想要更多地品味%SAVESTR:PLAYER%阴茎的味道………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2839',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2840',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2841',
        any: [
          /PRINTFORMW 「啊啊啊啊…已经…%SELF_CALL\(TARGET\)%的屁眼要被玩坏掉了…啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2842',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脑袋里已经只剩肛门那无与伦比的快感了，%SAVESTR:PLAYER%的凌辱继续着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2842-2843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脑袋里已经只剩肛门那无与伦比的快感了，%SAVESTR:PLAYER%的凌辱继续着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2844-2845',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…呜…啊啊啊…被这样地侵犯…变得舒服了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2845',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…呜…啊啊啊…被这样地侵犯…变得舒服了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2846',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门紧紧纠缠着%SAVESTR:PLAYER%的肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2847',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2848',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2849',
        any: [
          /PRINTFORMW 「啊啊啊…已、已经…屁股已经忍不住了啊啊…%UNICODE\(0x2661\) \*1% 呜哇哇哇…哇啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2850',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那敏感的肛门只是因为简单地抽插几次就已经泛滥成灾………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2850-2851',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那敏感的肛门只是因为简单地抽插几次就已经泛滥成灾………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2852-2853',
        any: [/CFLAG:330 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2853',
        any: [/CFLAG:330 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2855',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2856',
        any: [/PRINTFORMW 「啊恩…呜…哈啊…啊啊啊啊啊…呜啊…………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2857',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从后面侵犯着%SAVESTR:TARGET%那充满弹性的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2858',
        any: [/CFLAG:330 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2860',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2861',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2862',
        any: [
          /PRINTFORMW 「哈啊…啊啊…啊啊啊…这、这还…远远不够嘛…从后面温柔地抱着我哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2863',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经调教的肛门淫荡的弛缓下来，阴茎充满快感地大力抽插着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2864',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2865',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2866',
        any: [
          /PRINTFORMW 「啊啊啊…啊哈…啊啊啊呜！那、那么激烈吗…！已、已经要不行了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2867',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓紧抬起狠狠击打着，充满快感地喊叫起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2867-2868',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓紧抬起狠狠击打着，充满快感地喊叫起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2869-2870',
        any: [
          /PRINTFORMW 「啊啊啊…除此之外…胸部也可以玩弄呢…啊呜%UNICODE\(0x2661\) \*1% 好、好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2870',
        any: [
          /PRINTFORMW 「啊啊啊…除此之外…胸部也可以玩弄呢…啊呜%UNICODE\(0x2661\) \*1% 好、好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2871',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸被从后面抓住，阴茎挤进了窄小的肛门抽动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2872',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2873',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2874',
        any: [
          /PRINTFORMW 「啊哇哇哇哇%UNICODE\(0x2661\) \*1% 屁股…啊啊啊啊啊啊啊…要去了啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2875',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不停地摆动着腰一边向%SAVESTR:PLAYER%发出快乐的叫喊声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2875-2876',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不停地摆动着腰一边向%SAVESTR:PLAYER%发出快乐的叫喊声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2877-2878',
        any: [/CFLAG:330 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2878',
        any: [/CFLAG:330 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2880',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2881',
        any: [
          /PRINTFORMW 「呜啊…哈啊…虽然还是有点…无所谓啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2882',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被从后方贯穿，发出了可爱的悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2883',
        any: [/CFLAG:330 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2885',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:3 >= 3 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2886',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2887',
        any: [
          /PRINTFORMW 「连、连胸部也不放过吗…别碰啊…变态狂！啊啊…啊呜恩！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2888',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸被手不断摩挲着，%SAVESTR:PLAYER%对肛门的进犯还在继续………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2888-2889',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸被手不断摩挲着，%SAVESTR:PLAYER%对肛门的进犯还在继续………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2890',
        any: [
          /PRINTFORMW 「给、给我…适可而止啊…混蛋！ 啊啊啊…这也太深了啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2891',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面抱住，%SAVESTR:PLAYER%对肛门的进犯还在继续………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2891-2892',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面抱住，%SAVESTR:PLAYER%对肛门的进犯还在继续………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2893',
        any: [/CFLAG:330 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2895',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2896',
        any: [/PRINTFORMW 「哈啊…屁股…呜嗯…变得…啊呜呜嗯…！啊啊啊啊啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2897',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%对%SAVESTR:TARGET%的悲鸣充耳不闻，继续侵犯着尻穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2898',
        any: [/CFLAG:330 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2900',
        any: [/ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2901',
        any: [/PRINTFORMW 「滚开…别、别过来！强暴什么的…不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2902',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸被从后面抓住，因为肛门被侵犯而哭了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2903',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2903-2904',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2903-2905',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2903-2906',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2907-2910',
        any: [/;手淫 CFLAG:331/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2912',
        any: [/IF SELECTCOM == 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2914',
        any: [/IF CFLAG:TARGET:331 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2916',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2917',
        any: [
          /PRINTFORMW 「要这样抚摸这根肉棒吗…呜呼…要是其他人要%SELF_CALL\(TARGET\)%做这种服务可是要收费的哟，不过魔王大人的话就无所谓啦…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2918',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边出神地想着什么一边继续摩擦着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2920',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2921',
        any: [
          /PRINTFORMW 「哈啊哈啊…魔王大人的肉棒居然有这么大呢…%UNICODE\(0x2661\) \*1% %SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…想要…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2922',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%垂涎欲滴地望着%SAVESTR:PLAYER%的肉棒摩擦起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2924',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2925',
        any: [/PRINTFORMW 「知道啦…难道魔族都离不开这种事吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2926',
        any: [/PRINTFORMW 笑意暖暖的%SAVESTR:TARGET%温柔地摩挲着阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2928-2929',
        any: [
          /PRINTFORMW 「居然用%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的手来手淫吗…不、不可原谅！变态！去死啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2929',
        any: [
          /PRINTFORMW 「居然用%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的手来手淫吗…不、不可原谅！变态！去死啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2930',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边说着一边笨拙地搓动着双手………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2930-2931',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边说着一边笨拙地搓动着双手………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2932',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2932-2933',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2935-2936',
        any: [/;淫乱＋侍奉精神Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2937',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2938',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2939',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%来服侍魔王大人的肉棒吧%UNICODE\(0x2661\) \*1% 不过，除了手以外，还想享受其他的服务吗～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2940',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%粗重地喘息着，手丝毫不停地继续着淫靡地套动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2940-2941',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%粗重地喘息着，手丝毫不停地继续着淫靡地套动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2942',
        any: [
          /PRINTFORMW 「普通人的话可是要收钱的哟…魔王大人的话就请随意使用吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2943',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，开始用手摩擦阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2943-2944',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇，开始用手摩擦阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2945',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2947',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2948',
        any: [
          /PRINTFORMW 「这么大的一根肉棒…哈啊%SELF_CALL\(TARGET\)%想被它射满满一脸呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2949',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边出神地想着什么一边继续摩擦着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2950',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2952',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2953',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2954',
        any: [
          /PRINTFORMW 「哈啊哈啊…肉棒…真是让人心情舒畅啊…啊啊啊…这样就有液体溜出来了吗…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2955',
        any: [/PRINTFORMW %SAVESTR:TARGET%内心的渴望让她更加热情地对待阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2955-2956',
        any: [/PRINTFORMW %SAVESTR:TARGET%内心的渴望让她更加热情地对待阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2957',
        any: [
          /PRINTFORMW 「啊啊啊…大肉棒…%SELF_CALL\(TARGET\)%想要…更加用心地服侍它呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2958',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着陶醉的神情用手指继续套弄着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2958-2959',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着陶醉的神情用手指继续套弄着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2960',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2962',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2963',
        any: [
          /PRINTFORMW 「啊啊啊…肉棒…好热啊…手都要被烫伤了来着…啊啊啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2964',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%垂涎欲滴地望着%SAVESTR:PLAYER%的肉棒摩擦起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2965',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2967',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2968',
        any: [/PRINTFORMW 「男人居然真的喜欢这样的事情啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2969',
        any: [/PRINTFORMW 笑意暖暖的%SAVESTR:TARGET%温柔地摩挲着阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2970',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2972',
        any: [/ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2973',
        any: [/PRINTFORMW 「会、会喜欢这样的事情…该说不愧是变态的垃圾吗…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2974',
        any: [/PRINTFORMW 一边咒骂着，%SAVESTR:TARGET%继续笨拙地搓动着双手………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2975',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2975-2976',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2975-2977',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2975-2978',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2979-2982',
        any: [/;口交 CFLAG:332/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2984',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2986',
        any: [/IF CFLAG:TARGET:332 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2988',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2989',
        any: [
          /PRINTFORMW 「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2990',
        any: [/PRINTFORMW %SAVESTR:TARGET%贪婪地吮吸着阴茎，心情十分舒畅………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2992',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2993',
        any: [
          /PRINTFORMW 「嗷嗷呜…用魔王大人的肉棒当做奶嘴…是最最高兴的事情啦……呜哈…哈啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2994',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%毫不犹豫地凑在%SAVESTR:PLAYER%的阴茎上，出神地舔舐着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2996',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2997',
        any: [
          /PRINTFORMW 「真是的，男人的这活儿怎么这么…呜…大啊…呜…呜呜…真是的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '2998',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上有些吃惊的样子，用舌头拨动着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3000-3001',
        any: [/PRINTFORMW 「唔啊啊…混蛋、怎么可能这么做…不行啊…呼…呜啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3001',
        any: [/PRINTFORMW 「唔啊啊…混蛋、怎么可能这么做…不行啊…呼…呜啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3002',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上全是嫌恶的表情，但还是不得不用舌头舔舐着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3002-3003',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上全是嫌恶的表情，但还是不得不用舌头舔舐着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3004',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3004-3005',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3007-3009',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3009',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3010',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3011',
        any: [
          /PRINTFORMW 「哈啊哈啊…您的…您的肉棒…还真是…惊人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3012',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那贪婪索求阴茎的样子，那淫靡诱惑的身姿是之前完全想象不到的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3013',
        any: [
          /PRINTFORMW 「呜咕…噗呜…呜呜呜呼…肉棒什么的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3014',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3015',
        any: [
          /PRINTFORMW 「啊啊啊…%SELF_CALL\(TARGET\)%已经吃掉了这么多肉棒了吗…%SELF_CALL\(TARGET\)%还是想要这个呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3016',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用心底能想到最完美的词赞美着%SAVESTR:PLAYER%的阴茎并吸吮着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3017',
        any: [/PRINTFORMW 粘糊糊的舌头紧紧包住阴茎，嘴巴捋动的频率越来越快………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3017-3018',
        any: [/PRINTFORMW 粘糊糊的舌头紧紧包住阴茎，嘴巴捋动的频率越来越快………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW 「一大半都…呜…呜呼…%UNICODE\(0x2661\) \*1% 都已经…插进去了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3020',
        any: [
          /PRINTFORMW 虽然这么说着但%SAVESTR:TARGET%似乎完全没有放开%SAVESTR:PLAYER%阴茎的意思。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3021',
        any: [
          /PRINTFORMW 「呜咕…呜噜噜…还…呼…呼…还要更多…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3021-3022',
        any: [
          /PRINTFORMW 「呜咕…呜噜噜…还…呼…呼…还要更多…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3023',
        any: [/CFLAG:332 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3025',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3026',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3027',
        any: [
          /PRINTFORMW 「呜咕…哈呼呜呜…不…啊啊啊…不要…呜咕噜呼…不要停%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3028',
        any: [/PRINTFORMW %SAVESTR:TARGET%喘息粗重地用口腔服侍着阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3029',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…才没有这么喜欢大肉棒什么的…呜咕%UNICODE\(0x2661\) \*1% 都是因为魔王的缘故才会这么做哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3030',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW 「肉棒呜啊…真是…呼恩…呜…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经，没有肉棒就活不下去了啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3032',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像母狗一样闻着下体的味道喘着气，然后开始舔舐起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3033',
        any: [
          /PRINTFORMW 「呜啊呜啊…呜…这个味道…很诱人呢%UNICODE\(0x2661\) \*1% 呜…咕噜…呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3033-3034',
        any: [
          /PRINTFORMW 「呜啊呜啊…呜…这个味道…很诱人呢%UNICODE\(0x2661\) \*1% 呜…咕噜…呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3035',
        any: [
          /PRINTFORMW 「呜啊…哈啊…%SELF_CALL\(TARGET\)%只有在对方是…魔王大人的肉棒的时候…才会这么做哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%吮吸着眼前这雄伟的肉棒变得十分兴奋。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3037',
        any: [
          /PRINTFORMW 「呜嗯…哈啊…我说…啊呜…呜…呜啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3037-3038',
        any: [
          /PRINTFORMW 「呜嗯…哈啊…我说…啊呜…呜…呜啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3039',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3041',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3042',
        any: [
          /PRINTFORMW 「呜啊……哈啊…哈啊…啊啊咕咕…竟然做这样的事情…不要给我机会啊…否则一定会把这丑陋的东西咬成几段的…呜啊！？/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3043',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎堵住%SAVESTR:TARGET%的喉咙让她动弹不得，然后下达了吮吸的命令………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3044',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3046',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3047',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%能得到这样的肉棒，真是幸福啊…呜…哇啊…呜呜呜…哈啊……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3048',
        any: [/PRINTFORMW %SAVESTR:TARGET%眯着眼睛用舌头和阴茎纠缠着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3049',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3051',
        any: [/ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3052',
        any: [/PRINTFORMW 「为什么这家伙这么硬啊……咕…呜啊…哈呜…呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼中含泪，勉强地用舌头清扫着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3054',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3054-3055',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3054-3056',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3054-3057',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3058-3061',
        any: [
          /;乳交 CFLAG:333　SIF TALENT:110巨乳 SIF TALENT:114爆乳 SIF TALENT:119超乳/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3063',
        any: [/IF SELECTCOM == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3065',
        any: [/IF CFLAG:TARGET:333 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3067',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3068',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的乳房上…满满地都是魔王大人的痕迹呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3069',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3070',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%的大咪咪能让你舒服吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3071',
        any: [/PRINTFORMW %SAVESTR:TARGET%自傲地笑了，继续着对丰乳的爱抚………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3071-3072',
        any: [/PRINTFORMW %SAVESTR:TARGET%自傲地笑了，继续着对丰乳的爱抚………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3074',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3075',
        any: [/PRINTFORMW 「啊哈哈，胸部很舒服呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3076',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3077',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着得意的笑容继续着乳交。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3078',
        any: [
          /PRINTFORMW 「哈啊…这个乳房，已经成为魔王大人的私有物了哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3078-3079',
        any: [
          /PRINTFORMW 「哈啊…这个乳房，已经成为魔王大人的私有物了哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3081',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3082',
        any: [/PRINTFORMW 「哈啊…要我…做这样的事情吗………身体…开始发热了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3083',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3084',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%这自豪的胸部…啊啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3085',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那丰满的乳房仍然被%SAVESTR:PLAYER%的阴茎侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3085-3086',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那丰满的乳房仍然被%SAVESTR:PLAYER%的阴茎侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3088-3089',
        any: [
          /PRINTFORMW 「嘁…让%SELF_CALL\(TARGET\)%做这样羞耻的事情，总有一天要将你碎尸万段啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3089',
        any: [
          /PRINTFORMW 「嘁…让%SELF_CALL\(TARGET\)%做这样羞耻的事情，总有一天要将你碎尸万段啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3089-3090',
        any: [
          /PRINTFORMW 「嘁…让%SELF_CALL\(TARGET\)%做这样羞耻的事情，总有一天要将你碎尸万段啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3091',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3091-3092',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3094-3095',
        any: [/;淫乱＋侍奉精神Lv5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3096',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3097',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3098',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%用胸部做这种事情…只有你能享用哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3099',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%粗重地喘息着，继续用那丰满的乳房服侍着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3100',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3101',
        any: [
          /PRINTFORMW 「呜啊…哈啊哈啊…%SELF_CALL\(TARGET\)%的乳房能够被…被这样做真是太好了…%UNICODE\(0x2661\) \*1% 请把大肉棒全都塞进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3102',
        any: [
          /PRINTFORMW 说着这样的话，%SAVESTR:TARGET%丰满的乳房中间%SAVESTR:PLAYER%的阴茎正昂扬地埋在这里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3102-3103',
        any: [
          /PRINTFORMW 说着这样的话，%SAVESTR:TARGET%丰满的乳房中间%SAVESTR:PLAYER%的阴茎正昂扬地埋在这里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3104-3105',
        any: [
          /PRINTFORMW 「呜…呼呼…哇啊啊…更…更舒服了啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3105',
        any: [
          /PRINTFORMW 「呜…呼呼…哇啊啊…更…更舒服了啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3106',
        any: [/PRINTFORMW %SAVESTR:TARGET%窃笑着，继续用乳房服务起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3107',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3108',
        any: [
          /PRINTFORMW 「啊啊啊啊啊…胸部被侵犯的感觉…比所预料的还要好呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3109',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的胸部在%SAVESTR:PLAYER%的阴茎前后突刺下变成了很下贱的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3109-3110',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的胸部在%SAVESTR:PLAYER%的阴茎前后突刺下变成了很下贱的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3111-3112',
        any: [/CFLAG:333 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3112',
        any: [/CFLAG:333 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3114',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3115',
        any: [
          /PRINTFORMW 「哈啊哈啊…%SELF_CALL\(TARGET\)%的奶子，充满了您留下的痕迹呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3116',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为阴茎的味道兴奋得连呼吸都变得急促了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3117',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3118',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的大咪咪能让你舒服吗？ 啊哈哈…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3119',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%骄傲地笑着，继续用丰满的乳房服侍着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3119-3120',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%骄傲地笑着，继续用丰满的乳房服侍着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3121',
        any: [/CFLAG:333 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3123',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3124',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3125',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的胸部就是为魔王大人而存在的啊………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3126',
        any: [/PRINTFORMW %SAVESTR:TARGET%非常陶醉地继续进行着胸部的服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3127',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3128',
        any: [
          /PRINTFORMW 「哈啊哈啊…这硕大的胸部就是用来做这种事的呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3129',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用丰满的乳房把%SAVESTR:PLAYER%的阴茎包裹进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3129-3130',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用丰满的乳房把%SAVESTR:PLAYER%的阴茎包裹进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3131-3132',
        any: [
          /PRINTFORMW 「哈啊啊…开始发热了%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的胸部很舒服呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3132',
        any: [
          /PRINTFORMW 「哈啊啊…开始发热了%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的胸部很舒服呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3133',
        any: [
          /PRINTFORMW 在%SAVESTR:TARGET%胸口肆意进出的%SAVESTR:PLAYER%的阴茎差点就射精了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3134',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3135',
        any: [/PRINTFORMW 接着%SAVESTR:TARGET%带着得意的笑容继续着乳交。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3136',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的乳房在…发情了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3136-3137',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的乳房在…发情了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3138-3139',
        any: [/CFLAG:333 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3139',
        any: [/CFLAG:333 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3141',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3142',
        any: [/PRINTFORMW 「哈啊哈啊…这样就行了吗…呜啊……有点热♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3143',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用充满快感的胸部夹住%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3144',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3145',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%自豪的胸部…很舒服的吧………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3146',
        any: [/PRINTFORMW %SAVESTR:TARGET%用丰满的乳房拼命服侍着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3146-3147',
        any: [/PRINTFORMW %SAVESTR:TARGET%用丰满的乳房拼命服侍着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3148',
        any: [/CFLAG:333 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3150',
        any: [/ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3151',
        any: [/PRINTFORMW 「别、别在我胸口磨蹭啊…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3152',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为胸口被胡乱抽插着而痛苦不已………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3153',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3153-3154',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3153-3155',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3153-3156',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3157-3160',
        any: [/;股间性交 CFLAG:334/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3162',
        any: [/IF SELECTCOM == 33/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3164',
        any: [/IF CFLAG:TARGET:334 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3166',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3167',
        any: [
          /PRINTFORMW 「哈啊啊…肉棒好烫呢…好想就这样插进来………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3169',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3170',
        any: [
          /PRINTFORMW 「肉、肉棒让人很舒服呢…%UNICODE\(0x2661\) \*1% 呜…嗷嗷呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3172-3173',
        any: [/PRINTFORMW 「这、这种事情简直比死掉还糟糕啊…呜…不要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3173',
        any: [/PRINTFORMW 「这、这种事情简直比死掉还糟糕啊…呜…不要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3173-3174',
        any: [/PRINTFORMW 「这、这种事情简直比死掉还糟糕啊…呜…不要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3175',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3175-3176',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3178-3180',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3180',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3181',
        any: [
          /PRINTFORMW 「这样吗…魔王大人的肉棒…这样插进来了…其实明明更想要…插到里面去呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3182',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边哭着，一边因为阴茎的热度而继续着处女的股间性交奉仕………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3183',
        any: [/CFLAG:334 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3185',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3186',
        any: [
          /PRINTFORMW 「哈啊啊…肉棒好烫呢…好想就这样插进来………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3187',
        any: [
          /PRINTFORMW 脸上浮现出淫荡的微笑，%SAVESTR:TARGET%愉快地享受着股间性交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3188',
        any: [/CFLAG:334 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3190',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3191',
        any: [
          /PRINTFORMW 「要、要做这样的事情啊…%SELF_CALL\(TARGET\)%…只、只要被魔王大人抱着就足够了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3192',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出差点就要哭的样子，继续着股间性交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3193',
        any: [/CFLAG:334 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3195',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3196',
        any: [
          /PRINTFORMW 「肉、肉棒让人很舒服呢…%UNICODE\(0x2661\) \*1% 呜…嗷嗷呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3197',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸通红地回想着与%SAVESTR:PLAYER%愉快的股间性交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3198',
        any: [/CFLAG:334 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3200',
        any: [/ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3201',
        any: [
          /PRINTFORMW 「呼，哼，下贱的虫子，居然想要把那东西放进%SELF_CALL\(TARGET\)%的那个地方吗………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3202',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸红了，继续着股间性交………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3203',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3203-3204',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3203-3205',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3203-3206',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3207-3210',
        any: [/;骑乘位 CFLAG:335/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3212',
        any: [/IF SELECTCOM == 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3214',
        any: [/IF CFLAG:TARGET:335 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3216',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3218',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3220',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3221',
        any: [
          /PRINTFORMW 「嘿、嘿嘿…魔王大人的巨型肉棒…把%SELF_CALL\(TARGET\)%的处女之身给吞噬了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3222',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不顾破处的痛楚摆动着腰品尝%SAVESTR:PLAYER%阴茎的味道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3223',
        any: [
          /PRINTFORMW 「呜啊呜呼…啊啊啊…%SELF_CALL\(TARGET\)%…魔王大人的肉棒真让人着迷…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3224',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%梦呓般嘟哝着，一边在%SAVESTR:PLAYER%身上为了寻求快乐，激烈地摇动着纤腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3224-3225',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%梦呓般嘟哝着，一边在%SAVESTR:PLAYER%身上为了寻求快乐，激烈地摇动着纤腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3226',
        any: [
          /PRINTFORMW 「啊啊啊啊…整、整个都进去了…魔王大人的阴茎…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3227',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%肩部因为愉悦而震动着，不管破处的痛苦只顾着把阴茎引入小穴的更深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3228',
        any: [
          /PRINTFORMW 「哈啊哈啊…%SELF_CALL\(TARGET\)%成为魔王大人的女人了…%UNICODE\(0x2661\) \*1% 还…还可以更激烈一点…呜呜啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3229',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出这样的声音一边被%SAVESTR:PLAYER%抓住腰更加用力的蹂躏着处女之身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3229-3230',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出这样的声音一边被%SAVESTR:PLAYER%抓住腰更加用力的蹂躏着处女之身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3232',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3234',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3235',
        any: [
          /PRINTFORMW 「唔啊啊…哈啊啊呜…啊啊…%SELF_CALL\(TARGET\)%……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3236',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜之痛的缘故背上的翅膀痉挛着舒张开来，气喘吁吁。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3237',
        any: [
          /PRINTFORMW 「轻、轻点…有点痛…呜！可以好好感受魔王大人华丽的肉棒了呢………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3238',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒娇似的请求着%SAVESTR:PLAYER%不要乱动，由%SAVESTR:TARGET%自己来控制动作的幅度………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3238-3239',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒娇似的请求着%SAVESTR:PLAYER%不要乱动，由%SAVESTR:TARGET%自己来控制动作的幅度………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3240',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的那里…呜咕…哈啊哈啊…全部都被塞满了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3241',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女穴深处被%SAVESTR:PLAYER%的阴茎连连刺探，剧烈地喘息着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3242',
        any: [
          /PRINTFORMW 「哈啊哈啊…得到了%SELF_CALL\(TARGET\)%的处女之身的感觉怎样呢…啊、啊呼…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3243',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%腰部开始抽动起来，品尝着%SAVESTR:TARGET%处女小穴的滋味………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3243-3244',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%腰部开始抽动起来，品尝着%SAVESTR:TARGET%处女小穴的滋味………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3246-3247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女穴将%SAVESTR:PLAYER%的阴茎紧紧夹住。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女穴将%SAVESTR:PLAYER%的阴茎紧紧夹住。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3248',
        any: [
          /PRINTFORMW 「啊啊啊啊…我、我的…我的处女之身就这样…%SELF_CALL\(TARGET\)%…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3249',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%提起腰部开始慢慢享受处女的芬芳肉穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3249-3250',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%提起腰部开始慢慢享受处女的芬芳肉穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3252-3254',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3254',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3255',
        any: [
          /PRINTFORMW 「啊呜…啊啊啊…就这样！更…更用力的干…%SELF_CALL_FIRST\(TARGET\)%，%SELF_CALL\(TARGET\)%啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3256',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧抓住%SAVESTR:TARGET%偏开的腰部狠狠将阴茎插入摩擦着阴道壁。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3257',
        any: [
          /PRINTFORMW 「就、就是这样%UNICODE\(0x2661\) \*1%…好、好棒…魔王大人啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3259',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3260',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的小穴里…满满的都是呢…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3261',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动着自己的腰想要更多地享受%SAVESTR:PLAYER%阴茎那美好的滋味。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3262',
        any: [
          /PRINTFORMW 「不用魔王大人动哦…%SELF_CALL\(TARGET\)%感觉好舒服呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3264-3265',
        any: [/PRINTFORMW 「要我自己…自己动吗…呜…哈啊哈啊…呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3265',
        any: [/PRINTFORMW 「要我自己…自己动吗…呜…哈啊哈啊…呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对意外跨坐在你身上这件事感觉非常羞耻，只是敷衍着，并不肯配合你扭动腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3267',
        any: [
          /PRINTFORMW 「哈呜！？住、住手啊！不、不能插进那里…哈啊啊呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3267-3268',
        any: [
          /PRINTFORMW 「哈呜！？住、住手啊！不、不能插进那里…哈啊啊呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3269-3270',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3270',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3270-3271',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3273-3275',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3275',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3276',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3277',
        any: [
          /PRINTFORMW 「啊呜…啊啊啊…就这样！更…更用力的干…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3278',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧抓住%SAVESTR:TARGET%偏开的腰部狠狠将阴茎插入摩擦着阴道壁。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3279',
        any: [
          /PRINTFORMW 「就、就是这样%UNICODE\(0x2661\) \*1%…好、好棒…魔王大人啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3280',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3281',
        any: [
          /PRINTFORMW 「啊啊啊…呜…啊啊啊…还要…更…更粗暴的侵犯%SELF_CALL\(TARGET\)%吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3282',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%兴奋地抓住%SAVESTR:TARGET%的腰用阴茎狠狠在阴道壁上磨擦着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3283',
        any: [
          /PRINTFORMW 「呼…哈啊啊%UNICODE\(0x2661\) \*1%唔啊啊%UNICODE\(0x2661\) \*1%魔王的肉棒最粗了！超级肉棒！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3284',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3285',
        any: [
          /PRINTFORMW 「动…继续动下去…%SELF_CALL\(TARGET\)%感觉很舒服呢…啊啊…啊啊啊啊…%SELF_CALL\(TARGET\)%这淫荡的腰技感觉如何？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3286',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%淫乱的腰部舞动着，将阴茎引入小穴最深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3287',
        any: [
          /PRINTFORMW 「哈啊…啊啊啊啊…魔王大人只要躺着不动就好了…啊啊啊啊%UNICODE\(0x2661\) \*1% 真、真是舒服呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3287-3288',
        any: [
          /PRINTFORMW 「哈啊…啊啊啊啊…魔王大人只要躺着不动就好了…啊啊啊啊%UNICODE\(0x2661\) \*1% 真、真是舒服呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3289',
        any: [
          /PRINTFORMW 「动、继续动下去…%SELF_CALL\(TARGET\)%感觉很舒服呢…啊啊…啊啊啊啊…%SELF_CALL\(TARGET\)%这淫荡的腰技感觉如何？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3290',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%淫乱的腰部舞动着，将阴茎引入小穴深处上下耸动。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3291',
        any: [
          /PRINTFORMW 「哈呜…这深深的插入…魔王大人那力量十足的中出%UNICODE\(0x2661\) \*1% 小穴里满满的好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3291-3292',
        any: [
          /PRINTFORMW 「哈呜…这深深的插入…魔王大人那力量十足的中出%UNICODE\(0x2661\) \*1% 小穴里满满的好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3293',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3295',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3296',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3297',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的小穴里…满满的都是呢…♪ 呐，整根都进来了哟，看到了吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3298',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动着自己的腰想要更多地享受%SAVESTR:PLAYER%阴茎那美好的滋味。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3299',
        any: [
          /PRINTFORMW 「不用魔王大人动哦…%SELF_CALL\(TARGET\)%感觉好舒服呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3300',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3301',
        any: [
          /PRINTFORMW 「呜…啊啊啊…啊啊啊呜…啊呼呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3302',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎顶得%SAVESTR:TARGET%不由得发出可爱的呻吟声，剧烈地喘息起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3303',
        any: [
          /PRINTFORMW 「请…请让%SELF_CALL\(TARGET\)%为您献上更舒服的服务…啊、啊啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3304',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3305',
        any: [
          /PRINTFORMW 「呜…啊啊啊…啊啊啊呜…啊呼呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3306',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎顶得%SAVESTR:TARGET%不由得发出可爱的呻吟声，剧烈地喘息起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3307',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已、已经要去了…去了…啊啊啊啊%UNICODE\(0x2661\) \*1%…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3307-3308',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已、已经要去了…去了…啊啊啊啊%UNICODE\(0x2661\) \*1%…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3309',
        any: [
          /PRINTFORMW 「哈啊啊…能够…被魔王大人的大肉棒垂青…%SELF_CALL\(TARGET\)%是多么的幸运…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3310',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坐在%SAVESTR:PLAYER%身上淫靡地扭动着腰肢。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3311',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%已经快要爽上天了…啊啊啊啊啊…魔王大人不要动哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3311-3312',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%已经快要爽上天了…啊啊啊啊啊…魔王大人不要动哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3313',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3315',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && ABL:2 >= 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3316',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3317',
        any: [
          /PRINTFORMW 「不、不怕我掐断你的脖子吗…呜啊啊啊！…住、住手…从下往上顶进来了啊…啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3318',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴被%SAVESTR:PLAYER%的阴茎顶得快感连连。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3319',
        any: [
          /PRINTFORMW 跟随%SAVESTR:TARGET%的意志软化下来的小穴很快包裹住了%SAVESTR:PLAYER%的阴茎，带来了非常愉悦的享受………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3320',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3321',
        any: [
          /PRINTFORMW 「哈啊…哈啊…呜…！哈、住手、你这渣滓…啊啊…不要呜呜♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3322',
        any: [
          /PRINTFORMW 可%SAVESTR:TARGET%那久经调教的小穴，只能给男人深入的阴茎带来快乐吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3323',
        any: [
          /PRINTFORMW 「啊啊啊…呜…不要…%SELF_CALL_FIRST\(TARGET\)%，%SELF_CALL\(TARGET\)%感觉…感觉好糟糕…哈呜…啊啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3324',
        any: [
          /PRINTFORMW 因为屈辱而哭泣喘息着的%SAVESTR:TARGET%被%SAVESTR:PLAYER%深深地插进了紧窄的小穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3324-3325',
        any: [
          /PRINTFORMW 因为屈辱而哭泣喘息着的%SAVESTR:TARGET%被%SAVESTR:PLAYER%深深地插进了紧窄的小穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴已经被阴茎狠狠侵犯着。即使意志再坚强也无法阻止快感在她体内源源不断的产生。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3327',
        any: [
          /PRINTFORMW 「呜…哈…哈啊…！总有一天…总有一天我一定会…杀了你…杀了你啊啊啊啊！不、不要不要不要啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3328',
        any: [
          /PRINTFORMW 下体不由自主配合着的%SAVESTR:TARGET%虽然还怀有强烈的反抗心，却情不自禁地发出快乐的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3328-3329',
        any: [
          /PRINTFORMW 下体不由自主配合着的%SAVESTR:TARGET%虽然还怀有强烈的反抗心，却情不自禁地发出快乐的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3330',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3332',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3333',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3334',
        any: [
          /PRINTFORMW 「呜…啊啊啊…啊呜！啊啊…哈啊…%SELF_CALL\(TARGET\)%…的声音…呜…哈啊呜♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3335',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴被%SAVESTR:PLAYER%的阴茎一刺到底。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3336',
        any: [
          /PRINTFORMW 主动扭动起腰部的%SAVESTR:TARGET%露出愉悦的痴态承受着%SAVESTR:PLAYER%阴茎的抽插………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3336-3337',
        any: [
          /PRINTFORMW 主动扭动起腰部的%SAVESTR:TARGET%露出愉悦的痴态承受着%SAVESTR:PLAYER%阴茎的抽插………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3338',
        any: [/PRINTFORMW 「啊啊…啊啊啊…顶、顶进去了…不要…啊啊啊呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3339',
        any: [
          /PRINTFORMW 想要逃开的%SAVESTR:TARGET%被%SAVESTR:PLAYER%双手紧紧抓住，毫不留情地用肉棒责罚着小穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3340',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经调教的小穴十分柔软地包裹住%SAVESTR:PLAYER%的阴茎，带来了相当程度的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3340-3341',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经调教的小穴十分柔软地包裹住%SAVESTR:PLAYER%的阴茎，带来了相当程度的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3342',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3344',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3345',
        any: [
          /PRINTFORMW 「哈啊哈啊…这种事情会满足你那肮脏的欲望吗…？ 啊啊…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3346',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%摆动着自己的腰部，这使%SAVESTR:PLAYER%感到更加愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3347',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3349',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3350',
        any: [
          /PRINTFORMW 「啊啊啊…呜…反、反正你快点射精就行了…啊啊啊啊！？把我的腰放开…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3351',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%敷衍似的摇动着腰部，却被%SAVESTR:PLAYER%抓住腰狠狠地上下摆动摩擦着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3352',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3352-3353',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3352-3354',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3352-3355',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3356-3359',
        any: [/;全身擦洗 CFLAG:336/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3361',
        any: [/IF SELECTCOM == 35/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3363',
        any: [/IF CFLAG:TARGET:336 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3365',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3366',
        any: [/PRINTFORMW 「呼…呼…热得有些兴奋了呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3367',
        any: [
          /PRINTFORMW 作为第一次全身擦洗，%SAVESTR:TARGET%的手在%SAVESTR:PLAYER%身体上笨拙地滑动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3369-3370',
        any: [
          /PRINTFORMW 「为什么要%SELF_CALL\(TARGET\)%做这种事………啊、不好，手滑了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3370',
        any: [
          /PRINTFORMW 「为什么要%SELF_CALL\(TARGET\)%做这种事………啊、不好，手滑了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3371',
        any: [
          /PRINTFORMW 作为第一次全身擦洗，%SAVESTR:TARGET%的手在%SAVESTR:PLAYER%身体上笨拙地滑动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3371-3372',
        any: [
          /PRINTFORMW 作为第一次全身擦洗，%SAVESTR:TARGET%的手在%SAVESTR:PLAYER%身体上笨拙地滑动着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3373',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3373-3374',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3376-3377',
        any: [/;淫乱＋侍奉精神Lv5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3378',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3379',
        any: [
          /PRINTFORMW 「哈啊%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的擦洗做得很舒服吧，所以射精什么的可还不行哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边笑着一边在%SAVESTR:PLAYER%泡在水里的小兄弟上摩擦着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3381',
        any: [
          /PRINTFORMW 「呜…啊呜…啊啊啊…%SELF_CALL\(TARGET\)%也觉得很舒服呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3382',
        any: [/CFLAG:336 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3384',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3385',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%全身上下的美丽都被你看光了呢…啊啊啊啊♪ 看，连这种地方都显得很漂亮吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3386',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%灵活的身体滑动在%SAVESTR:PLAYER%身上仔细擦洗着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3387',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的脚被轻轻抱住，脚趾的前端被含进嘴里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3388',
        any: [/CFLAG:336 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3390',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3391',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%才不会在你这种垃圾面前展露身体啊…呜…别碰奇怪的地方！…呜啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3392',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%非常耐心地对待着%SAVESTR:TARGET%，像毛巾一样“使用”她的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3393',
        any: [/CFLAG:336 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3395',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3396',
        any: [/PRINTFORMW 「呜…哈…啊啊呜…哈啊哈啊…难得的洗澡时间呢…啊啊啊呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3397',
        any: [
          /PRINTFORMW 虽然这么说着%SAVESTR:TARGET%还是取来肥皂一边发出诱人的声音一边仔细擦洗着身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3398',
        any: [/CFLAG:336 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3400',
        any: [/ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3401',
        any: [
          /PRINTFORMW 「呼…哈啊…哈啊…呜呜呜…真是屈辱…%SELF_CALL\(TARGET\)%是不会给你洗的…哈呜…别碰我啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3402',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%流着眼泪开始用自己的身体擦拭着%SAVESTR:PLAYER%的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3403',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3403-3404',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3403-3405',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3403-3406',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3407-3410',
        any: [/;骑乘位アナル CFLAG:337/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3412',
        any: [/IF SELECTCOM == 36/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3414',
        any: [/IF CFLAG:TARGET:337 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3416',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3417',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3418',
        any: [
          /PRINTFORMW 「呜呼…哇啊呜…！ %SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…请随意享用我的身体吧%UNICODE\(0x2661\) \*1%…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3419',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇开始扭动腰部享受这快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3419-3420',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇开始扭动腰部享受这快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3421',
        any: [
          /PRINTFORMW 「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3422',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%放低自己的腰部，将%SAVESTR:PLAYER%的阴茎根部吞入久经开发的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3422-3423',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%放低自己的腰部，将%SAVESTR:PLAYER%的阴茎根部吞入久经开发的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3425',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3426',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3427',
        any: [
          /PRINTFORMW 「啊啊呜…啊…看啊…%SELF_CALL\(TARGET\)%的屁股…魔王大人的整根肉棒都插进去了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3428',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%炫耀似的展开双腿上下摇动着身体感受肛门的触觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3428-3429',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%炫耀似的展开双腿上下摇动着身体感受肛门的触觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3430',
        any: [
          /PRINTFORMW 「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3431',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3431-3432',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3434-3435',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3435',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3436',
        any: [
          /PRINTFORMW 「啊啊啊…哈啊…呜呼…全都进去了…哈呜…别、别动啊……啊啊啊啊呜♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3437',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未经开发的尻穴艰难地将%SAVESTR:PLAYER%的阴茎吞入，紧紧夹住………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3437-3438',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未经开发的尻穴艰难地将%SAVESTR:PLAYER%的阴茎吞入，紧紧夹住………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3439',
        any: [/PRINTFORMW 「居然要我，做这样的事情…嘁…呜…呜哇…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3440',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3440-3441',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3442-3443',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3443',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3443-3444',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3446-3447',
        any: [/;アナル狂い TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3449',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3450',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3451',
        any: [
          /PRINTFORMW 「呜呼…哇啊呜…！ %SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…随你怎样都可以啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3452',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇开始扭动腰部享受这快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3454',
        any: [
          /PRINTFORMW 「已、已经…已经要高潮了啊啊…啊啊啊…屁股坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3454-3455',
        any: [
          /PRINTFORMW 「已、已经…已经要高潮了啊啊…啊啊啊…屁股坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3456',
        any: [/PRINTFORMW %SAVESTR:TARGET%的尻穴紧紧纠缠着肉棒使之快感十足。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3457',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊啊…就是这个样子…%SELF_CALL\(TARGET\)%…还想要更激烈的冲击%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3459',
        any: [
          /PRINTFORMW 「啊啊啊啊…真是强壮啊…%SELF_CALL\(TARGET\)%的屁股已经变得很糟糕了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3459-3460',
        any: [
          /PRINTFORMW 「啊啊啊啊…真是强壮啊…%SELF_CALL\(TARGET\)%的屁股已经变得很糟糕了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3461',
        any: [/CFLAG:337 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3463',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3464',
        any: [
          /PRINTFORMW 「呜…啊啊啊…厉害的肉棒…啊啊啊呜…屁股要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%放低自己的腰部，将%SAVESTR:PLAYER%的阴茎整根吞入久经开发的尻穴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3466',
        any: [
          /PRINTFORMW 「呜哈%UNICODE\(0x2661\) \*1% 肉棒…全都吞进去了哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3467',
        any: [/CFLAG:337 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3469',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3470',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3471',
        any: [
          /PRINTFORMW 「啊啊呜…啊…看啊…%SELF_CALL\(TARGET\)%的屁股…魔王大人的整根肉棒都插进去了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3472',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%炫耀似的展开双腿上下摇动着身体感受肛门的触觉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3474',
        any: [
          /PRINTFORMW 「呜哈…哈啊啊啊啊%UNICODE\(0x2661\) \*1% 屁股已经把肉棒“吃掉”了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3474-3475',
        any: [
          /PRINTFORMW 「呜哈…哈啊啊啊啊%UNICODE\(0x2661\) \*1% 屁股已经把肉棒“吃掉”了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3476',
        any: [
          /PRINTFORMW 「屁股…呜啊%UNICODE\(0x2661\) \*1%…哇啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3477',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%主动摆动腰部迎合，开心地品尝着这滋味。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3479',
        any: [
          /PRINTFORMW 「呜啊啊啊…哈啊…屁股%UNICODE\(0x2661\) \*1% 快融化啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3479-3480',
        any: [
          /PRINTFORMW 「呜啊啊啊…哈啊…屁股%UNICODE\(0x2661\) \*1% 快融化啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3481',
        any: [/CFLAG:337 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3483',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3484',
        any: [
          /PRINTFORMW 「呜…啊啊…别、别那么粗暴…啊啊…啊啊啊啊…不、不要全都插进去…呜哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3485',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3486',
        any: [/CFLAG:337 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3488',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0  && ABL:3 >= 3 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3489',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3490',
        any: [/PRINTFORMW %SAVESTR:TARGET%咬紧牙关带着屈辱的表情摇动着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3491',
        any: [
          /PRINTFORMW 「哈啊…呜…啊啊啊…%SELF_CALL\(TARGET\)%的屁股…会让你这种废物舒服吗…唔啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3492',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3493',
        any: [
          /PRINTFORMW 但%SAVESTR:PLAYER%腰部的耸动让面带厌恶的%SAVESTR:TARGET%发出了愉悦淫靡的呻吟声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3494',
        any: [
          /PRINTFORMW 「怎么会！？啊、哈啊、怎么…停下来…这种恶心的呜呜呜呜啊啊啊♪ 呜…哈啊啊…呜…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3495',
        any: [
          /PRINTFORMW 坐在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%尽管充满了反抗的欲望，但那开发过的身体传来的快感让她不由自主地迎合索求浪叫着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3495-3496',
        any: [
          /PRINTFORMW 坐在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%尽管充满了反抗的欲望，但那开发过的身体传来的快感让她不由自主地迎合索求浪叫着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3497',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3498',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的身体…啊啊…啊呜啊…哇啊啊…怎么会用来取悦…你这样的人渣…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3499',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不由自主地扭动腰部，屁股忠实地为%SAVESTR:PLAYER%服务着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3500',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3501',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%痛骂的声音越来越大，可她的腰肢也越来越柔软无力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3502',
        any: [
          /PRINTFORMW 「如同深渊臭虫的男人！这、这样的肉棒…%SELF_CALL\(TARGET\)%…啊啊啊去死吧去死吧去死啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3503',
        any: [
          /PRINTFORMW 「…啊呜…呜啊啊啊！？…死啊…去死吧…啊…啊啊啊…啊啊啊啊啊…别插了我要去了啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3503-3504',
        any: [
          /PRINTFORMW 「…啊呜…呜啊啊啊！？…死啊…去死吧…啊…啊啊啊…啊啊啊啊啊…别插了我要去了啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3505-3506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软而久经调教的尻穴被%SAVESTR:PLAYER%的阴茎狠狠侵犯着，发出悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软而久经调教的尻穴被%SAVESTR:PLAYER%的阴茎狠狠侵犯着，发出悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3507',
        any: [
          /PRINTFORMW 「啊哈…呜…呜啊…渣滓…住、住手…恶心的家伙…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经…呜啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3508',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3509',
        any: [/PRINTFORMW 随着抽插%SAVESTR:TARGET%嘴中开始溢出淫靡的呻吟。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3510',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊…呜哇…哈呜…不、不要…住手…啊、啊啊屁股变得奇怪了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3510-3511',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊…呜哇…哈呜…不、不要…住手…啊、啊啊屁股变得奇怪了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3512-3513',
        any: [/CFLAG:337 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3513',
        any: [/CFLAG:337 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3515',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3516',
        any: [/PRINTFORMW 「啊啊…哈呜…呜…啊…继续…就这样动……啊呜♪…呜呼………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3517',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的尻穴轻易将%SAVESTR:PLAYER%的阴茎吞入，轻松地说笑着纠缠起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3518',
        any: [/CFLAG:337 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3520',
        any: [/ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3521',
        any: [
          /PRINTFORMW 「让我做这样的事…什么嘛…啊呜…搞什么鬼啊…哈啊啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3522',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰把阴茎顶在肛门上，强行插了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3523',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3523-3524',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3523-3525',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3523-3526',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3527-3530',
        any: [/;肛门侍奉 CFLAG:338/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3532',
        any: [/IF SELECTCOM == 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3534',
        any: [/IF CFLAG:TARGET:338 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3536',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3537',
        any: [/PRINTFORMW 「啊啊…哈啊…呜呜咕噜…呜哈啊…呜咕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3538',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼中含泪，顺从地继续着服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3540-3541',
        any: [
          /PRINTFORMW 「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3541',
        any: [
          /PRINTFORMW 「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3542',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼中含泪，无奈地继续着服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3542-3543',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼中含泪，无奈地继续着服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3544',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3544-3545',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3547-3548',
        any: [/;淫乱＋侍奉精神Lv5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3549',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3550',
        any: [/PRINTFORMW 「啊啊呜…魔王大人的菊花呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3551',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着淫猥的笑容细心地舔舐着肛门上每一条褶皱的纹路………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3552',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3554',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3555',
        any: [
          /PRINTFORMW 「魔王大人的肛门…真是…诱人呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3556',
        any: [
          /PRINTFORML %SAVESTR:TARGET%带着陶醉表情的舔舐使%SAVESTR:PLAYER%肛门放松下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3557',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3559',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3560',
        any: [
          /PRINTFORMW 「喂！舔你这种肮脏的混蛋的屁股什么的…太…太可怕了…绝对…绝不可能…呜哈啊啊…呜咕咕」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3561',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼中含泪，粗暴地继续着服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3563',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3564',
        any: [/PRINTFORMW 「啊啊…呜啊…呜呜呜哈啊…啊呜…哈啊…啊啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3565',
        any: [/PRINTFORMW %SAVESTR:TARGET%流着泪用嘴巴服务着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3566',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3568',
        any: [/ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3569',
        any: [
          /PRINTFORMW 「诶…怎么…怎么对我做这样的事情…呜…停、停下…别贴着我啊…啊呜呜呜！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3570',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼中含泪，无奈地继续着服务………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3571',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3571-3572',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3571-3573',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3571-3574',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3575-3578',
        any: [/;打屁股 CFLAG:341/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3580',
        any: [/IF SELECTCOM == 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3582',
        any: [/IF CFLAG:TARGET:341 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3583',
        any: [/PRINTFORMW 「住、住手…别打了…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3584',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3584-3585',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3587-3588',
        any: [/;史莱姆服の場合は口上無し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3589-3590',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:40 & 64\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3592',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3593',
        any: [
          /PRINTFORMW 「哈啊♪　请继续！　更严酷地惩罚%SELF_CALL\(TARGET\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3594',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%边被打边发出娇弱的呻吟，很明显可以发现她的下体已经一片春情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3595',
        any: [/CFLAG:TARGET:341 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3597',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3598',
        any: [/PRINTFORMW 「对不起！　对不起！　对……呜呜呜呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3599',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被拍打着屁股的同时，呻吟声越来越淫靡艳丽………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3600',
        any: [/CFLAG:TARGET:341 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3602',
        any: [
          /ELSEIF MARK:2 == 3 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3603',
        any: [
          /PRINTFORMW 「呜啊！喂！畜生！这样打我的屁股…啊啊啊！你这暴力的蛆虫！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3604',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%跪放在自己的膝盖上打着屁股，尽情地发泄着欲望………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3605',
        any: [/CFLAG:TARGET:341 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3607',
        any: [
          /ELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3608',
        any: [/PRINTFORMW 「哇啊啊…再、再也不会反抗你啦…好痛……好痛啊！～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3609',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%老实地被%SAVESTR:PLAYER%击打着屁股，像是一只小狗一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3610',
        any: [/CFLAG:TARGET:341 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3612',
        any: [/ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3613',
        any: [
          /PRINTFORMW 「呜…哈啊…为什么…对我做这种像管教孩子一样的事情啊…哈呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3614',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%拍打着%SAVESTR:TARGET%的屁股使她发出惨叫………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3615',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3615-3616',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3615-3617',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3615-3618',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3619-3622',
        any: [/;鞭 CFLAG:342/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3624',
        any: [/IF SELECTCOM == 41/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3626',
        any: [/IF CFLAG:TARGET:342 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3628',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3629',
        any: [
          /PRINTFORMW 「啊啊啊…舞着鞭子像对待母猪一样对待%SELF_CALL\(TARGET\)%吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3631',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3632',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%是…是坏孩子…所以…才会被鞭打吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3634-3635',
        any: [/PRINTFORMW 「住…住手…很痛的啊混蛋！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3635',
        any: [/PRINTFORMW 「住…住手…很痛的啊混蛋！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3635-3636',
        any: [/PRINTFORMW 「住…住手…很痛的啊混蛋！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3637',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3637-3638',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3640-3641',
        any: [/;史莱姆服の場合は口上無しよ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3642-3643',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:40 & 64\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3645',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3646',
        any: [
          /PRINTFORMW 「哈诶♪	啊啊啊♪　%SELF_CALL\(TARGET\)%我是一碰到鞭子就兴奋的变态母猪奴隶♪　嘎啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3647',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在鞭下十分兴奋，像是发情的母猪一样浪叫着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3648',
        any: [
          /PRINTFORMW 落在伤痕累累屁股上的鞭打使%SAVESTR:TARGET%发出了越来越大的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3649',
        any: [/CFLAG:TARGET:342 = 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3651',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3652',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊！　还想要更多！　请您惩罚，下贱的肉奴隶吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3653',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在鞭下十分兴奋，红肿的屁股四下摇摆着索求着什么………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3654',
        any: [/CFLAG:TARGET:342 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3656',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3657',
        any: [
          /PRINTFORMW 「啊呜…啊啊啊…%SELF_CALL\(TARGET\)%是魔王大人养的猪猡……哈哇啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3658',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%细嫩肌肤暴露在在鞭下，高亢的惨叫使%SAVESTR:PLAYER%十分愉悦………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3659',
        any: [/CFLAG:TARGET:342 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3661',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3662',
        any: [
          /PRINTFORMW 「对不起！　对不起！　%SELF_CALL\(TARGET\)%是头下贱的母猪！　所以请惩罚我吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3663',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸部因为兴奋而扭曲，双脚磨蹭着，在%SAVESTR:PLAYER%鞭下喜悦的承受着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3664',
        any: [/CFLAG:TARGET:342 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3666',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3667',
        any: [/PRINTFORMW 「对不起！对不起…呜哈啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3668',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的娇声呻吟中%SAVESTR:PLAYER%继续着鞭打………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3669',
        any: [/CFLAG:TARGET:342 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3671',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3672',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…难道做错了什么吗…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3673',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%细嫩的肌肤被鞭子打击着发出高亢的惨叫………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3674',
        any: [/CFLAG:TARGET:342 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3676',
        any: [
          /ELSEIF MARK:2 == 3 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3677',
        any: [
          /PRINTFORMW 「呜…哈啊！…你这个变态冷血的施虐狂！对你来说女人就像是不用在乎的牲畜一样的东西吗……啊！…哈啊…呜呜呜啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3678',
        any: [
          /PRINTFORMW 鞭打持续着、作为对%SAVESTR:TARGET%这样强烈反抗心的一种回应，调教更加激烈地进行着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3679',
        any: [/CFLAG:TARGET:342 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3681',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3682',
        any: [
          /PRINTFORMW 「呜…啊啊…啊哈…这已经算是…呜…很残酷的事情了吧…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3683',
        any: [/PRINTFORMW %SAVESTR:TARGET%被鞭打的时候夹杂着一点愉悦的叫声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3684',
        any: [/CFLAG:TARGET:342 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3686',
        any: [/ELSEIF CFLAG:342 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3687',
        any: [
          /PRINTFORMW 「停，停下…居然对%SELF_CALL\(TARGET\)%做出这样的事情…哈…啊呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3688',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘴里的嘟哝被听到了，所以鞭子的击打持续着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3689',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3689-3690',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3689-3691',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3689-3692',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3693-3696',
        any: [/;针 CFLAG:343/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3698',
        any: [/IF SELECTCOM == 42/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3700',
        any: [/IF CFLAG:TARGET:343 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3702',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3703',
        any: [
          /PRINTFORMW 「啊哈呜！啊啊啊…像淫乱的母猪一样的%SELF_CALL\(TARGET\)%越痛越想被主人狠狠的操弄啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3704',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3706',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3707',
        any: [
          /PRINTFORMW 「啊啊啊…对不起，对不起呜呜…是%SELF_CALL\(TARGET\)%做了什么坏事的惩罚吗！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3708',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3710-3711',
        any: [
          /PRINTFORMW 「啊喂！…用那样的针在%SELF_CALL\(TARGET\)%身上…可怕啊！住手你这人渣…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3711',
        any: [
          /PRINTFORMW 「啊喂！…用那样的针在%SELF_CALL\(TARGET\)%身上…可怕啊！住手你这人渣…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3712',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3712-3713',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3714',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3714-3715',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3717-3718',
        any: [/;淫乱＋受虐狂っ気Lv5以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3719',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3720',
        any: [
          /PRINTFORMW 「啊啊…啊%UNICODE\(0x2661\) \*1%…哈啊啊…那里…那里终于…有了一点带痛的快感了呢…啊啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3721',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的肌肤被针几次刺中，反而愉悦得浪叫连连…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3722',
        any: [/CFLAG:TARGET:343 = 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3724',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3725',
        any: [/PRINTFORMW 「啊呜呜…呜哈啊啊…老实说还可以刺的…更深一点哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3726',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的肌肤被针几次刺中，反而兴奋得浪叫连连………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3727',
        any: [/CFLAG:TARGET:343 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3729',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3730',
        any: [
          /PRINTFORMW 「啊哈呜！啊啊啊…像淫乱的母猪一样的%SELF_CALL\(TARGET\)%越痛越想被主人狠狠的操弄啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3731',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3732',
        any: [/CFLAG:TARGET:343 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3734',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3735',
        any: [
          /PRINTFORMW 「啊啊啊…更冷酷地处罚%SELF_CALL\(TARGET\)%吧…乳头…或者小穴…都可以用针刺啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3736',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%似乎已经习惯了被刺的痛苦，想要挑战更敏感的地方………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3737',
        any: [/CFLAG:TARGET:343 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3739',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3740',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊呜…快…快来更用力地刺我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3741',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼神空洞地催促着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3742',
        any: [/CFLAG:TARGET:343 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3744',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3745',
        any: [
          /PRINTFORMW 「啊啊啊…对不起，对不起呜呜…是%SELF_CALL\(TARGET\)%做了什么坏事的惩罚吗！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3746',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3747',
        any: [/CFLAG:TARGET:343 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3749',
        any: [
          /ELSEIF MARK:2 == 3 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3750',
        any: [
          /PRINTFORMW 「你这…变态的施虐狂！…呜…哇啊！…怎么能…怎么能这样…哇啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3751',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%在如同五月苍蝇般叫嚷着的%SAVESTR:TARGET%的乳头刺下一针，又拿起了新的针具………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3752',
        any: [/CFLAG:TARGET:343 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3754',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3755',
        any: [
          /PRINTFORMW 「啊啊…啊啊…那样的针…快扎在%SELF_CALL\(TARGET\)%的身体上吧…等不及了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3756',
        any: [/PRINTFORMW %SAVESTR:TARGET%被针几次刺中发出可爱的惨叫声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3757',
        any: [/CFLAG:TARGET:343 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3759',
        any: [/ELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3760',
        any: [
          /PRINTFORMW 「啊喂！…用那样的针在%SELF_CALL\(TARGET\)%身上…可怕啊！住手你这人渣…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3761',
        any: [/PRINTFORMW %SAVESTR:TARGET%几次被针刺中，到处都在流血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3762',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3762-3763',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3762-3764',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3762-3765',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3766-3769',
        any: [/;眼罩 CFLAG:344　CFLAG:380/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3772',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3774',
        any: [/IF CFLAG:TARGET:344 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3776',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3777',
        any: [
          /PRINTFORMW 「哈啊哈啊…就是这样，对%SELF_CALL\(TARGET\)%做些乱七八糟的事情吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3778',
        any: [/PRINTFORMW %SAVESTR:TARGET%老实地等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3780',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3781',
        any: [/PRINTFORMW 「看不到魔王大人的脸的话会很困恼诶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3782',
        any: [/PRINTFORMW %SAVESTR:TARGET%噘着嘴唇老实地戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3784-3785',
        any: [/PRINTFORMW 「住…住手…这之后…打算做更过分的事情吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3785',
        any: [/PRINTFORMW 「住…住手…这之后…打算做更过分的事情吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3786',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇着头但还是被粗暴地戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3786-3787',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇着头但还是被粗暴地戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3788',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3788-3789',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3791-3792',
        any: [/;淫乱＋受虐狂っ気Lv5以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3793',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3794',
        any: [
          /PRINTFORMW 「哈啊哈啊…就是这样，对%SELF_CALL\(TARGET\)%做些乱七八糟的事情吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3795',
        any: [/PRINTFORMW %SAVESTR:TARGET%老实地等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3796',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3798',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3799',
        any: [
          /PRINTFORMW 「哈啊哈啊…就是这样，对%SELF_CALL\(TARGET\)%做些乱七八糟的事情吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3800',
        any: [/PRINTFORMW %SAVESTR:TARGET%老实地等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3801',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3803',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3804',
        any: [
          /PRINTFORMW 「哈啊哈啊…就是这样，对%SELF_CALL\(TARGET\)%做些乱七八糟的事情吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3805',
        any: [/PRINTFORMW %SAVESTR:TARGET%老实地等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3806',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3808',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3809',
        any: [/PRINTFORMW 「啊啊…有点忐忑呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3810',
        any: [/PRINTFORMW %SAVESTR:TARGET%期待地伸出舌头等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3811',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3813',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3814',
        any: [/PRINTFORMW 「啊啊…有点忐忑呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3815',
        any: [/PRINTFORMW %SAVESTR:TARGET%期待地伸出舌头等待着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3816',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3818',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3819',
        any: [/PRINTFORMW 「看不到魔王大人的脸的话会很困恼诶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3820',
        any: [/PRINTFORMW %SAVESTR:TARGET%噘着嘴唇老实地戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3821',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3823',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3824',
        any: [/PRINTFORMW 「要做什么奇怪的事情吗………啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3825',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只是轻微地抵抗了一下就老实地戴上了眼罩………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3826',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3828',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3829',
        any: [/PRINTFORMW 「住…住手…这之后…打算做更过分的事情吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3830',
        any: [/PRINTFORMW %SAVESTR:TARGET%摇着头但还是被粗暴地戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3831',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3831-3832',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3831-3833',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3834-3836',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3836',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3838',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3839',
        any: [/PRINTFORMW 「这样就取下来了吗………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3840',
        any: [/CFLAG:380 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3842',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3843',
        any: [/PRINTFORMW 「哈啊哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3844',
        any: [/CFLAG:380 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3846',
        any: [/ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3847',
        any: [/PRINTFORMW 「总算取下来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3848',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3848-3849',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3848-3850',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3848-3851',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3857',
        any: [/IF SELECTCOM == 44 && TEQUIP:44/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3859',
        any: [/IF CFLAG:TARGET:345 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3861',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3862',
        any: [
          /PRINTFORMW 「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3863',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3865',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3866',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊啊啊…感觉很兴奋呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3867',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3869-3870',
        any: [/PRINTFORMW 「喂！住手…停手啊！这样也太粗暴了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3870',
        any: [/PRINTFORMW 「喂！住手…停手啊！这样也太粗暴了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3871',
        any: [/PRINTFORMW %SAVESTR:TARGET%被绳子绑了个严严实实………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3871-3872',
        any: [/PRINTFORMW %SAVESTR:TARGET%被绳子绑了个严严实实………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3873',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3873-3874',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3876-3877',
        any: [/;淫乱＋受虐狂っ気Lv5以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3878',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3879',
        any: [
          /PRINTFORMW 「啊啊啊…要高潮了啊啊…还可以更紧一点…把%SELF_CALL\(TARGET\)%绑紧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3880',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3881',
        any: [/CFLAG:TARGET:345 = 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3883',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3884',
        any: [
          /PRINTFORMW 「啊啊啊…居然、居然高潮了…在这样的束缚下…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3885',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3886',
        any: [/CFLAG:TARGET:345 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3888',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3889',
        any: [
          /PRINTFORMW 「啊啊呜…这种被紧紧绑住的痛苦…小穴都湿了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3890',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3891',
        any: [/CFLAG:TARGET:345 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3893',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3894',
        any: [
          /PRINTFORMW 「啊啊啊…只有被绳子绑住的时候才会高潮………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3895',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3896',
        any: [/CFLAG:TARGET:345 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3898',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3899',
        any: [/PRINTFORMW 「啊啊啊…绑得更紧一点………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3900',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3901',
        any: [/CFLAG:TARGET:345 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3903',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3904',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊啊啊…感觉很兴奋呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3905',
        any: [/PRINTFORMW %SAVESTR:TARGET%美丽的肌肤被绳子勒得通红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3906',
        any: [/CFLAG:TARGET:345 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3908',
        any: [
          /ELSEIF MARK:2 == 3 && MARK:3 >= 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3909',
        any: [
          /PRINTFORMW 「住…住手…对%SELF_CALL\(TARGET\)%做这样的事情…住手啊！绳子、陷进去了！很痛诶！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3910',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%粗暴地制住，用绳子紧紧绑着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3911',
        any: [/CFLAG:TARGET:345 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3913',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3914',
        any: [/PRINTFORMW 「啊啊…绳子陷进皮肤了…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3915',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被束缚住的时候意外的老实、呼吸粗重………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3916',
        any: [/CFLAG:TARGET:345 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3918',
        any: [/ELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3919',
        any: [/PRINTFORMW 「喂！住手…停手啊！这样也太粗暴了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3920',
        any: [/PRINTFORMW %SAVESTR:TARGET%被绳子绑了个严严实实………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3921',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3921-3922',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3921-3923',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3924-3926',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3926',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3928',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3929',
        any: [/PRINTFORMW 「啊啊呜…被绑着什么的真是太棒了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3930',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3932',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3933',
        any: [/PRINTFORMW 「啊啊…身上的痕迹很明显呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3934',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3936',
        any: [/ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3937',
        any: [/PRINTFORMW 「哈啊哈啊…终于…解开了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3938',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3938-3939',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3938-3940',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3938-3941',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3947',
        any: [/IF SELECTCOM == 45 && TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3949',
        any: [/IF CFLAG:TARGET:346 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3951',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3952',
        any: [/PRINTFORMW 「呜呼…呜啊…呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3953',
        any: [/PRINTFORM 配合地戴上口塞的%SAVESTR:TARGET%带着期待/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3954',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3955',
        any: [/PRINTL 地晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3955-3956',
        any: [/PRINTL 地晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3957',
        any: [/PRINTL %SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3957-3958',
        any: [/PRINTL %SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3960',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3961',
        any: [/PRINTFORMW 「呜咕…呜…呼啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3962',
        any: [/PRINTFORM 配合地戴上口塞的%SAVESTR:TARGET%带着温柔的眼神/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3963',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3964',
        any: [/PRINTL 晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3964-3965',
        any: [/PRINTL 晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3966',
        any: [/PRINTL 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3966-3967',
        any: [/PRINTL 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3969-3970',
        any: [/PRINTFORMW 「啊、这、这样吗…嘴里…呜…呜咕噜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3970',
        any: [/PRINTFORMW 「啊、这、这样吗…嘴里…呜…呜咕噜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3971',
        any: [/PRINTFORM 戴上口塞的%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3972',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3973',
        any: [/PRINTL 左右摇着头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3973-3974',
        any: [/PRINTL 左右摇着头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3975',
        any: [/PRINTL 瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3975-3976',
        any: [/PRINTL 瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3977',
        any: [/endif/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3978',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3978-3979',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3981-3982',
        any: [/;淫乱＋受虐狂っ気Lv5以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3983',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3984',
        any: [/PRINTFORMW 「呼啊…呜啊…呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3985',
        any: [/PRINTFORM 配合地戴上口塞的%SAVESTR:TARGET%粗重急促地喘息/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3986',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3987',
        any: [/PRINTL 着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3987-3988',
        any: [/PRINTL 着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3989',
        any: [/PRINTL 着，眼中闪耀着畅快淋漓的神色………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3989-3990',
        any: [/PRINTL 着，眼中闪耀着畅快淋漓的神色………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3991',
        any: [/CFLAG:TARGET:346 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3993',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3994',
        any: [/PRINTFORMW 「呜呼…呜啊…呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3995',
        any: [/PRINTFORMW 配合地戴上口塞的%SAVESTR:TARGET%粗重急促地喘息着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3996',
        any: [/CFLAG:TARGET:346 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3998',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:346 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '3999',
        any: [/PRINTFORMW 「呜呼…呜啊…呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4000',
        any: [/PRINTFORM 配合地戴上口塞的%SAVESTR:TARGET%带着期待/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4001',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4002',
        any: [/PRINTL 地晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4002-4003',
        any: [/PRINTL 地晃动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4004',
        any: [/PRINTL 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4004-4005',
        any: [/PRINTL 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4006',
        any: [/CFLAG:TARGET:346 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4008',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4009',
        any: [/PRINTFORMW 「呜呼…呜…呜啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4010',
        any: [
          /PRINTFORMW 配合地戴上口塞的%SAVESTR:TARGET%两腿摩擦着，露出放荡的神情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4011',
        any: [/CFLAG:TARGET:346 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4013',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4014',
        any: [/PRINTFORMW 「哈啊…呜…呜啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4015',
        any: [/PRINTFORMW 配合地戴上口塞的%SAVESTR:TARGET%两腿摩擦着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4016',
        any: [/CFLAG:TARGET:346 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4018',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4019',
        any: [/PRINTFORMW 「呜咕…呜…呜啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4020',
        any: [
          /PRINTFORMW 配合地戴上口塞的%SAVESTR:TARGET%用温柔的眼神凝视着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4021',
        any: [/CFLAG:TARGET:346 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4023',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4024',
        any: [/PRINTFORMW 「呜啊…哈…哈………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4025',
        any: [/PRINTFORM %SAVESTR:TARGET%习以为常地被口塞塞住嘴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4026',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4027',
        any: [/PRINTL 眼色朦胧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4027-4028',
        any: [/PRINTL 眼色朦胧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4029',
        any: [/PRINTFORML 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4029-4030',
        any: [/PRINTFORML 看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4031',
        any: [/CFLAG:TARGET:346 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4033',
        any: [/ELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4034',
        any: [/PRINTFORMW 「啊、这、这样吗…嘴里…呜…呜咕噜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4035',
        any: [/PRINTFORM 戴上口塞的%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4036',
        any: [/IF TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4037',
        any: [/PRINTL 左右摇着头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4037-4038',
        any: [/PRINTL 左右摇着头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4039',
        any: [/PRINTL 瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4039-4040',
        any: [/PRINTL 瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4041',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4041-4042',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4041-4043',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4044-4046',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4046',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4048',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:386 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4049',
        any: [/PRINTFORMW 「呜啊…哈啊哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4050',
        any: [/CFLAG:386 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4052',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4053',
        any: [/PRINTFORMW 「呜啊…哈啊哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4054',
        any: [/CFLAG:386 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4056',
        any: [/ELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4057',
        any: [/PRINTFORMW 「呜啊…哈啊哈啊…呼诶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4058',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4058-4059',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4058-4060',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4058-4061',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4067',
        any: [/IF SELECTCOM == 46 && TEQUIP:46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4069',
        any: [/IF CFLAG:TARGET:347 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4071',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4072',
        any: [/PRINTFORMW 「诶…哎呀…这样的话就全部都………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4073',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4075',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4076',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%…又没有便秘什么的…呜呜哈啊…肚子好难受！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4077',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4079-4080',
        any: [/PRINTFORMW 「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4080',
        any: [/PRINTFORMW 「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4081',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4081-4082',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4083',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4083-4084',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4086-4087',
        any: [/;淫乱＋A感覚Lv3以上＋受虐狂っ気Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4088',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4089',
        any: [
          /PRINTFORMW 「啊啊啊啊…在这样的情况下被人从前面干的话…会有多舒服呢…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4090',
        any: [
          /PRINTFORMW 渗透进肠内的灌肠液不断刺激着%SAVESTR:TARGET%的肚子。%SAVESTR:TARGET%的屁股扭动着仿佛在向%SAVESTR:PLAYER%求索什么………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4091',
        any: [/CFLAG:347 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4093',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4094',
        any: [/PRINTFORMW 「诶…哎呀…这样的话就全部都………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4095',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4096',
        any: [/CFLAG:347 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4098',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4099',
        any: [
          /PRINTFORMW 「啊啊啊啊啊…想、想要做爱…已经…无法忍受了…哈啊…想被狠狠插进来………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4100',
        any: [
          /PRINTFORMW 渗透进肠内的灌肠液不断刺激着%SAVESTR:TARGET%的肚子。%SAVESTR:TARGET%的屁股扭动着仿佛在向%SAVESTR:PLAYER%求索什么………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4101',
        any: [/CFLAG:347 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4103',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4104',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%…又没有便秘什么的…呜呜哈啊…肚子好难受！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4105',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4106',
        any: [/CFLAG:347 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4108',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4109',
        any: [/PRINTFORMW 「啊啊啊啊…呜…哈啊…好痛…哇呜呜呜啊…好痛啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4110',
        any: [
          /PRINTFORMW 由于灌肠液的浓度已经到了极限，%SAVESTR:TARGET%脸色铁青万分痛苦地痛叫起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4111',
        any: [/CFLAG:347 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4113',
        any: [
          /ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4114',
        any: [/PRINTFORMW 「啊啊啊啊…肚子…咕噜噜噜地响了…啊啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4115',
        any: [
          /PRINTFORMW 渗透进肠内的灌肠液不断刺激着%SAVESTR:TARGET%的肚子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4116',
        any: [/CFLAG:347 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4118',
        any: [/ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4119',
        any: [/PRINTFORMW 「哇啊啊！啊啊…热…肚子里好热…呜啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4120',
        any: [
          /PRINTFORMW 或许是灌肠液浓度稍高的缘故，%SAVESTR:TARGET%捂着肚子痛苦地呻吟着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4121',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4121-4122',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4121-4123',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4124-4125',
        any: [/ELSEIF SELECTCOM == 46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4125',
        any: [/ELSEIF SELECTCOM == 46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4127',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4128',
        any: [
          /PRINTFORMW 「出，出来了啊啊%UNICODE\(0x2661\) \*1%　别，别看了……脏东西要喷出来了啊……%UNICODE\(0x2661\) \*1%　啊゛啊゛啊゛啊゛啊啊……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4129',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和言语相反的，一脸恍惚地喷溅着脏污………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4130',
        any: [/CFLAG:347 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4132',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4133',
        any: [/PRINTFORMW 「别，别看啊啊！　脏东西要喷出来了啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4134',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4135',
        any: [/CFLAG:347 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4137',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4138',
        any: [
          /PRINTFORMW 「出，出来了………%UNICODE\(0x2661\) \*1%　%SELF_CALL\(TARGET\)%…是这么肮脏的女人对不起……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4139',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和言语相反的，一脸恍惚地喷溅着脏污………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4140',
        any: [/CFLAG:347 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4142',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4143',
        any: [
          /PRINTFORMW 「别，别看啊啊啊！　肮脏的%SELF_CALL\(TARGET\)%…要被轻蔑了啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4144',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%香汗淋漓地惊声尖叫着，似乎再也忍不住地喷出了排泄物………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4145',
        any: [/CFLAG:347 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4147',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4148',
        any: [
          /PRINTFORMW 「别开玩笑了……这样的恶行……绝对不会忘掉的……不行了啊啊啊啊！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4149',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着愤怒的表情眼中泛着泪光，夸张地将脏污排泄了出来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4150',
        any: [/CFLAG:347 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4152',
        any: [
          /ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4153',
        any: [/PRINTFORMW 「明明不可以的……因为排泄脏污而有快感怎么可以呢……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4154',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%和言语相反的，一脸恍惚地喷溅着脏污………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4155',
        any: [/CFLAG:347 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4157',
        any: [/ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4158',
        any: [/PRINTFORMW 「别看啊……不要啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4159',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸苍白地喷溅着脏污………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4160',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4160-4161',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4160-4162',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4164-4167',
        any: [/;放置PLAY CFLAG:356/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4170',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4172',
        any: [/IF CFLAG:356 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4174',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4175',
        any: [/PRINTFORMW 「啊啊啊…想要做…更多…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4176',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些不甘寂寞的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4178',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4179',
        any: [/PRINTFORMW 「想…想做爱…哈啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4180',
        any: [/PRINTFORMW %SAVESTR:TARGET%的欲望溢于言表………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4182-4183',
        any: [/PRINTFORMW 「有…有什么奇怪的打算吗」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4183',
        any: [/PRINTFORMW 「有…有什么奇怪的打算吗」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4184',
        any: [/PRINTFORMW %SAVESTR:TARGET%对你询问道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4184-4185',
        any: [/PRINTFORMW %SAVESTR:TARGET%对你询问道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4186',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4189',
        any: [/PRINTFORMW %SAVESTR:TARGET%小穴里蠕虫蠢动，毫不怜惜地冲击着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4192',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%菊花里肛门虫蠢动，毫不怜惜地冲击着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4195',
        any: [/PRINTFORMW %SAVESTR:TARGET%后庭被插进肛珠，微微张开着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4198',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被装上电动阴蒂夹，阴蒂被不断刺激着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4201',
        any: [/PRINTFORMW %SAVESTR:TARGET%被装上乳头夹，乳头被不断刺激着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4204',
        any: [/PRINTFORML %SAVESTR:TARGET%胸部被安上榨乳器，开始榨出乳汁。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4207',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎上套着飞机杯，快要射精的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4210',
        any: [/PRINTFORMW %SAVESTR:TARGET%被装上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4213',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被绳子束缚着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4216',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4222',
        any: [/PRINTFORMW 然后，%SAVESTR:TARGET%的身姿从头到尾被录制了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4223',
        any: [/CFLAG:356 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4223-4224',
        any: [/CFLAG:356 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4226-4227',
        any: [/;淫乱＋欲情Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4228',
        any: [
          /IF TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4229',
        any: [/PRINTFORMW 「想…想做爱…哈啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4230',
        any: [/PRINTFORMW %SAVESTR:TARGET%的欲望溢于言表………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4231',
        any: [/CFLAG:356 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4233',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:356 <= 5 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4234',
        any: [
          /PRINTFORMW 「哈啊…这是一种另类的挑逗吗…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4235',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼泛春光，淫荡地呻吟起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4236',
        any: [/CFLAG:356 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4238',
        any: [
          /ELSEIF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4239',
        any: [/PRINTFORMW 「啊啊啊…想要做…更多…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4240',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些不甘寂寞的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4241',
        any: [/CFLAG:356 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4243',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4244',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…不准突然袭击哟………0」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4245',
        any: [/PRINTFORMW %SAVESTR:TARGET%眯起眼睛，看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4246',
        any: [/CFLAG:356 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4248',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4249',
        any: [/PRINTFORMW 「哈啊哈啊…向你屈服…这种事情…是不可能的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4250',
        any: [/PRINTFORMW %SAVESTR:TARGET%对你说道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4251',
        any: [/CFLAG:356 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4253',
        any: [/ELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4254',
        any: [/PRINTFORMW 「有…有什么奇怪的打算吗」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4255',
        any: [/PRINTFORMW %SAVESTR:TARGET%对你询问道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4256',
        any: [/CFLAG:356 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4256-4257',
        any: [/CFLAG:356 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4258',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4261',
        any: [/PRINTFORMW %SAVESTR:TARGET%小穴里蠕虫蠢动，毫不怜惜地冲击着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4264',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%菊花里肛门虫蠢动，毫不怜惜地冲击着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4267',
        any: [/PRINTFORMW %SAVESTR:TARGET%后庭被插进肛珠，微微张开着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4270',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被装上电动阴蒂夹，阴蒂被不断刺激着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4273',
        any: [/PRINTFORMW %SAVESTR:TARGET%被装上乳头夹，乳头被不断刺激着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4276',
        any: [/PRINTFORML %SAVESTR:TARGET%胸部被安上榨乳器，开始榨出乳汁。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4279',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎上套着飞机杯，快要射精的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4282',
        any: [/PRINTFORMW %SAVESTR:TARGET%被装上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4285',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被绳子束缚着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4288',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腹部因为灌肠的原因发出尴尬的声音，一取下肛塞就排泄出大量浊物。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4291',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门插着电极，每次轻微的电流流过都会使肛门括约肌猛地收缩。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4294',
        any: [/PRINTFORMW 然后，%SAVESTR:TARGET%的身姿从头到尾被录制了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4294-4295',
        any: [/PRINTFORMW 然后，%SAVESTR:TARGET%的身姿从头到尾被录制了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4294-4296',
        any: [/PRINTFORMW 然后，%SAVESTR:TARGET%的身姿从头到尾被录制了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4294-4297',
        any: [/PRINTFORMW 然后，%SAVESTR:TARGET%的身姿从头到尾被录制了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4304',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4306',
        any: [/IF CFLAG:357 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4308',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4309',
        any: [/PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TARGET%进行自我介绍，/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4310',
        any: [/IF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4311',
        any: [/PRINTFORM 面带微笑的%SAVESTR:TARGET%介绍了自己的本名和性经验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4313',
        any: [/PRINTFORM ，甚至还有手淫的时候想到的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4314',
        any: [/PRINTFORML ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4315',
        any: [
          /PRINTFORML 对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4316',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4318',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4319',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%向水晶球展现出自己那诱人的小穴，两足大张。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4320',
        any: [/PRINTFORMW 「你好啊，见到你很高兴♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4321',
        any: [
          /PRINTFORMW 「今后那个高傲的%SAVESTR:TARGET%酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4322',
        any: [
          /PRINTFORMW 「请大家一起见证%SELF_CALL\(TARGET\)%这淫荡下贱的样子吧～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4323',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4325',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4326',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些兴奋地聊了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4327',
        any: [/PRINTFORMW 「你好啊，这里是%SAVESTR:TARGET%♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4328',
        any: [
          /PRINTFORMW 「曾经高傲的%SELF_CALL\(TARGET\)%，现在每天都在和魔王大人做爱呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4329',
        any: [/PRINTFORMW 「那么请好好看做爱的过程吧~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4330',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4331',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4332',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球说起淫猥的话语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4333',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4334',
        any: [
          /ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4335',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球开始介绍自己。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4336',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4336-4337',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4338',
        any: [/PRINTFORMW %SAVESTR:TARGET%侧过脸去，沉默不语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4338-4339',
        any: [/PRINTFORMW %SAVESTR:TARGET%侧过脸去，沉默不语。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4341-4342',
        any: [/PRINTFORM 在和%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4342',
        any: [/PRINTFORM 在和%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4343',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4344',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%呢喃着充满爱意的话语。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4345',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4346',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4347',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:5 >= PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4348',
        any: [/PRINTFORM 会话的过程中，%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4349',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4350',
        any: [/PRINT 带着快乐的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4351',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4352',
        any: [/PRINT 带着痛苦的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4352-4353',
        any: [/PRINT 带着痛苦的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4354',
        any: [/PRINTFORML 拼命地回应着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4356',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4357',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副想要做爱胜过说话的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4358',
        any: [/PRINTFORMW 「想要…想要肉棒嘛…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4359',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4360',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%交谈还算融洽的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4361',
        any: [/PRINTFORMW 「啊，还有这种事啊？…是这样吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4362',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4363',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4364',
        any: [/PRINTFORMW 「嗯、嗯…这样啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4364-4365',
        any: [/PRINTFORMW 「嗯、嗯…这样啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4366',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4366-4367',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%一副心不在焉的样子…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4368-4369',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4369',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4369-4370',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4372-4374',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4374',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4375',
        any: [/PRINTFORML %SAVESTR:PLAYER%催促%SAVESTR:TARGET%进行自我介绍，/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4376',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4377',
        any: [/PRINTFORML %SAVESTR:TARGET%扭着腰对水晶球说出了充满爱意的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4378',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4379',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4380',
        any: [/PRINTFORML %SAVESTR:TARGET%扭着腰对水晶球叫嚷着淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4381',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4382',
        any: [/ELSEIF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4383',
        any: [/PRINTFORM %SAVESTR:TARGET%面带微笑地介绍了自己的本名和性经验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4385',
        any: [/PRINTFORM ，甚至还有手淫的时候想到的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4386',
        any: [/PRINTFORML ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4387',
        any: [
          /PRINTFORML 对于这个发往故乡的水晶球的某种幻想使她双腿之间泛滥成灾……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4388',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4390',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4391',
        any: [/PRINTFORMW %SAVESTR:TARGET%向水晶球展现出自己那诱人的小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4392',
        any: [/PRINTFORMW 「你好啊，见到你很高兴♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4393',
        any: [
          /PRINTFORMW 「今后那个高傲的%SAVESTR:TARGET%酱会舍弃自己的自尊变成摇着屁股求干的贱货哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4394',
        any: [
          /PRINTFORMW 「请大家一起见证%SELF_CALL\(TARGET\)%这淫荡下贱的样子吧～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4395',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4397',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4398',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些兴奋地聊了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4399',
        any: [/PRINTFORMW 「你好啊，这里是%SAVESTR:TARGET%♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4400',
        any: [
          /PRINTFORMW 「曾经高傲的%SELF_CALL\(TARGET\)%，现在每天都在和魔王大人做爱呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4401',
        any: [/PRINTFORMW 「那么请好好看做爱的过程吧~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4402',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4403',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4404',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球说起淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4405',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4406',
        any: [
          /ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4407',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球开始介绍自己/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4408',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4408-4409',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4410',
        any: [/PRINTFORMW %SAVESTR:TARGET%侧过脸去，沉默不语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4410-4411',
        any: [/PRINTFORMW %SAVESTR:TARGET%侧过脸去，沉默不语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4413-4414',
        any: [/PRINTFORM 在和%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4414',
        any: [/PRINTFORM 在和%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4415',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4416',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%呢喃着充满爱意的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4417',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4418',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%扭动着腰叫嚷着淫猥的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4419',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:5 >= PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4420',
        any: [/PRINTFORM 会话的过程中，%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4421',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4422',
        any: [/PRINT 带着快乐的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4423',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4424',
        any: [/PRINT 带着痛苦的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4424-4425',
        any: [/PRINT 带着痛苦的语调/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4426',
        any: [/PRINTFORML 拼命地回应着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4428',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4429',
        any: [
          /PRINTFORML 会话的过程中，%SAVESTR:TARGET%露出一副想要做爱胜过说话的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4430',
        any: [/PRINTFORMW 「想要…想要肉棒…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4431',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4432',
        any: [
          /PRINTFORML 会话的过程中，与%SAVESTR:TARGET%的交谈还算融洽的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4433',
        any: [/PRINTFORMW 「啊，还有这种事啊？…是这样吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4434',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4435',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%时不时会给出一些回应/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4436',
        any: [/PRINTFORMW 「嗯、嗯…这样啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4436-4437',
        any: [/PRINTFORMW 「嗯、嗯…这样啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4438',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%只是认真地听着…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4438-4439',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%只是认真地听着…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4438-4440',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%只是认真地听着…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4438-4441',
        any: [/PRINTFORML 会话的过程中，%SAVESTR:TARGET%只是认真地听着…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4442-4445',
        any: [
          /;乳夹口交 CFLAG:360　			SIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4443-4445',
        any: [
          /;乳夹口交 CFLAG:360　			SIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4447',
        any: [/IF SELECTCOM == 123/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4449',
        any: [/IF CFLAG:TARGET:360 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4451',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4452',
        any: [
          /PRINTFORMW 「哈啊哈啊…很热呢…这仿佛在燃烧着的肉棒…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4453',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4454',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4455',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，用那平薄的胸部摩擦着阴茎的一端………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4456',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4457',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4458',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在一对巨乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4459',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4460',
        any: [
          /PRINTFORMW 「啊哈哈哈…%SELF_CALL\(TARGET\)%这傲人的胸部能让你很舒服吧…%UNICODE\(0x2661\) \*1% 呜咕噜…哈呼…呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4461',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4461-4462',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4463',
        any: [
          /PRINTFORMW 「呃呃…嘻嘻～%UNICODE\(0x2661\) \*1% 这样子侍奉着阴茎…%SELF_CALL\(TARGET\)%已经忍不住了啦～%UNICODE\(0x2661\) \*1% 唔喔…唔唔～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4464',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4464-4465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4467',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4468',
        any: [
          /PRINTFORMW 「肉棒…啊啊…已经在发热了呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4469',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4470',
        any: [
          /PRINTFORMW 「如果%SELF_CALL\(TARGET\)%的胸部…更大一点的话…呜…啊哈…呜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4471',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4472',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4473',
        any: [
          /PRINTFORMW 「啊哈…这灼热的…把%SELF_CALL\(TARGET\)%的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4474',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自豪地笑着，把阴茎夹在一对巨乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4475',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4476',
        any: [
          /PRINTFORMW 「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4477',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自豪地笑着，把阴茎埋在一双豪乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4478',
        any: [
          /PRINTFORMW 「来吧%UNICODE\(0x2661\) \*1%…哈呜%UNICODE\(0x2661\) \*1%…来射到…啊啊啊…来射满我的胸部%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4478-4479',
        any: [
          /PRINTFORMW 「来吧%UNICODE\(0x2661\) \*1%…哈呜%UNICODE\(0x2661\) \*1%…来射到…啊啊啊…来射满我的胸部%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4480',
        any: [
          /PRINTFORMW 「啊啊啊啊…肉棒…%SELF_CALL\(TARGET\)%会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4481',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4481-4482',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4484',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4485',
        any: [/PRINTFORMW 「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4486',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4487',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4488',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4489',
        any: [
          /PRINTFORMW 「被你看着…%SELF_CALL\(TARGET\)%的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4490',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在一对巨乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4491',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4492',
        any: [
          /PRINTFORMW 「但凡是男人…都喜欢盯着%SELF_CALL\(TARGET\)%的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4493',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4493-4494',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4495-4496',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4498-4499',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%居然要做这种屈辱的事情吗…啊呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4499',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%居然要做这种屈辱的事情吗…啊呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4500',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4501',
        any: [/PRINTFORMW %SAVESTR:TARGET%胸口被阴茎蹭着，开始吮吸起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4502',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4503',
        any: [
          /PRINTFORMW 「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4504',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4505',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4506',
        any: [
          /PRINTFORMW 「居然要%SELF_CALL\(TARGET\)%用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4507',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4507-4508',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4509',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4509-4510',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4511-4512',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4512',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4512-4513',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4515-4517',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4517',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4518',
        any: [
          /PRINTFORMW 「哈啊哈啊…很热呢…这仿佛在燃烧的肉棒…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4519',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4520',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%的乳房虽然很小…但服务可不差哦…咕噜咕噜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4521',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，用那平薄的胸部摩擦着阴茎的一端………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4522',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4523',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的胸部很舒服的吧…啊哈哈…这大家伙都已经这么硬了呢…哈呜…咕噜咕噜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4524',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在一对巨乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4525',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4526',
        any: [
          /PRINTFORMW 「啊哈哈哈…%SELF_CALL\(TARGET\)%这傲人的胸部能让你很舒服吧…%UNICODE\(0x2661\) \*1% 呜咕噜…哈呼…呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4527',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4527-4528',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4529',
        any: [
          /PRINTFORMW 「呃呃…嘻嘻～%UNICODE\(0x2661\) \*1% 这样子侍奉着阴茎…%SELF_CALL\(TARGET\)%已经忍不住了啦～%UNICODE\(0x2661\) \*1% 唔喔…唔唔～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4530',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4530-4531',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分兴奋，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4532',
        any: [/CFLAG:360 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4534',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4535',
        any: [
          /PRINTFORMW 「肉棒…啊啊…已经在发热了呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4536',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4537',
        any: [
          /PRINTFORMW 「如果%SELF_CALL\(TARGET\)%的胸部…更大一点的话…呜…啊哈…呜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4538',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将带着精臭的阴茎包在嘴里，用那平薄的胸部摩擦着阴茎的一端………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4539',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4540',
        any: [
          /PRINTFORMW 「啊哈…这灼热的…把%SELF_CALL\(TARGET\)%的胸都要烫伤了呢…啊哈呜呜…呜咕…咕噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4541',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自豪地笑着，把阴茎夹在一对巨乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4542',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4543',
        any: [
          /PRINTFORMW 「啊啊啊…肉棒全都埋进去了呢…哈啊…好像会出来很多精液的样子%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4544',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自豪地笑着，把阴茎埋在一双豪乳间进行着口交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4545',
        any: [
          /PRINTFORMW 「来吧%UNICODE\(0x2661\) \*1%…哈呜%UNICODE\(0x2661\) \*1%…来射到…啊啊啊…来射满我的胸部%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4545-4546',
        any: [
          /PRINTFORMW 「来吧%UNICODE\(0x2661\) \*1%…哈呜%UNICODE\(0x2661\) \*1%…来射到…啊啊啊…来射满我的胸部%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4547',
        any: [
          /PRINTFORMW 「啊啊啊啊…肉棒…%SELF_CALL\(TARGET\)%会用嘴巴和胸部让它更加舒服的…呜呼…咕噜噜…哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4548',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4548-4549',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4550',
        any: [/CFLAG:360 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4552',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4553',
        any: [/PRINTFORMW 「啊啊…呜…呜啊…咕咕…咕噜…呜呼咕咕咕噜噜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4554',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4555',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%拼命用那微薄的胸部摩擦着阴茎，同时开始了口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4556',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4557',
        any: [
          /PRINTFORMW 「被你看着…%SELF_CALL\(TARGET\)%的乳房变得更加舒服了呢…啊哈…呜咕…哈啊…呜呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4558',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在一对巨乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4559',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4560',
        any: [
          /PRINTFORMW 「但凡是男人…都喜欢盯着%SELF_CALL\(TARGET\)%的胸口看呢…呜…啊呜啊呜…哈啊…呜咕咕噜…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4561',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4561-4562',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4563',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4563-4564',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分愉快地把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4565',
        any: [/CFLAG:360 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4567',
        any: [/ELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4568',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%居然要做这种屈辱的事情吗…啊呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4569',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4570',
        any: [/PRINTFORMW %SAVESTR:TARGET%胸口被阴茎蹭着，开始吮吸起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4571',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4572',
        any: [
          /PRINTFORMW 「呜呼…男人都喜欢…啊啊…啊咕…把肉棒强加到别人身上吗…呜…呜咕噜路…哈啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4573',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在一对巨乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4574',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4575',
        any: [
          /PRINTFORMW 「居然要%SELF_CALL\(TARGET\)%用这自豪的胸部做这种丑陋的事情…啊啊啊…呜呼…呜咕噜…呜呜呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4576',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4576-4577',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎埋在一双豪乳间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4578',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4578-4579',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着懊悔的表情把阴茎夹在胸间进行着口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4580',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4580-4581',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4580-4582',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4580-4583',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4584-4586',
        any: [/;口交时自慰 CFLAG:361/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4588',
        any: [/IF SELECTCOM == 125/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4590',
        any: [/IF CFLAG:TARGET:361 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4592',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4593',
        any: [
          /PRINTFORMW 「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜%UNICODE\(0x2661\) \*1% 唔啊啊%UNICODE\(0x2661\) \*1% 哈啊啊%UNICODE\(0x2661\) \*1% 好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4594',
        any: [
          /PRINTFORM %SAVESTR:TARGET%含住%SAVESTR:PLAYER%的阴茎显得十分兴奋，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4595',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4596',
        any: [/PRINTL 用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4597',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4598',
        any: [/PRINTL 用手摆弄着插入私处的蠕虫，激烈地抽插着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4599',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4600',
        any: [/PRINTL 用手摆弄着插入肛门的蠕虫，激烈地抽插着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4600-4601',
        any: [/PRINTL 用手摆弄着插入肛门的蠕虫，激烈地抽插着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4602',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4602-4603',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4605',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4606',
        any: [
          /PRINTFORMW 「肉棒…想要…%UNICODE\(0x2661\) \*1% 啊啊…一边自慰一边品尝肉棒的感觉%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4607',
        any: [/PRINTFORM %SAVESTR:TARGET%用舌头纠缠着%SAVESTR:PLAYER%的阴茎，/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4608',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4609',
        any: [/PRINTL 两穴里的蠕虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4610',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4611',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰激烈的继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4612',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4613',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4613-4614',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4615',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4615-4616',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4618',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4619',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4620',
        any: [
          /PRINTFORM %SAVESTR:TARGET%被命令用口服侍%SAVESTR:PLAYER%的阴茎，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4621',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4622',
        any: [/PRINTL 两穴里的蠕虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4623',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4624',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4625',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4626',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4626-4627',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4628',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4628-4629',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4631-4632',
        any: [
          /PRINTFORMW 「呜…哈啊…哈啊…要%SELF_CALL\(TARGET\)%…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4632',
        any: [
          /PRINTFORMW 「呜…哈啊…哈啊…要%SELF_CALL\(TARGET\)%…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4633',
        any: [
          /PRINTFORM %SAVESTR:TARGET%被命令用口服侍%SAVESTR:PLAYER%的阴茎，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4634',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4635',
        any: [/PRINTL 两穴里的蠕虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4636',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4637',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4638',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4639',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4639-4640',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰仍在继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4641',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4641-4642',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4643-4644',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4644',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4644-4645',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4647-4649',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4649',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4650',
        any: [
          /PRINTFORMW 「呜咕噜…才、才没有…喜欢这么做呢…啊呜…呜咕噜%UNICODE\(0x2661\) \*1% 唔啊啊%UNICODE\(0x2661\) \*1% 哈啊啊%UNICODE\(0x2661\) \*1% 好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4651',
        any: [
          /PRINTFORM %SAVESTR:TARGET%含住%SAVESTR:PLAYER%的阴茎显得十分兴奋，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4652',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4653',
        any: [/PRINTL 两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4654',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4655',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰激烈的继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4656',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4657',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4657-4658',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4659',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4659-4660',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4661',
        any: [
          /PRINTFORMW 「啊啊啊…一边自慰…一边舔着大肉棒…好舒服呢……啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4662',
        any: [
          /PRINTFORMW （啊啊啊…肉棒…好想要肉棒啊%UNICODE\(0x2661\) \*1% 只是自慰完全无法忍受了%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4663',
        any: [/CFLAG:361 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4665',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4666',
        any: [
          /PRINTFORMW 「肉棒…想要…%UNICODE\(0x2661\) \*1% 啊啊…一边自慰一边品尝肉棒的感觉%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4667',
        any: [/PRINTFORM %SAVESTR:TARGET%用舌头纠缠着%SAVESTR:PLAYER%的阴茎，/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4668',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4669',
        any: [/PRINTL 任两穴里的蠕虫蠕动着，摇动着纤腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4670',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4671',
        any: [/PRINTL 任私处的蠕虫蠕动，摇动着纤腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4672',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4673',
        any: [/PRINTL 任肛门里的肛门虫蠕动，摇动着纤腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4673-4674',
        any: [/PRINTL 任肛门里的肛门虫蠕动，摇动着纤腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4675',
        any: [/PRINTL 继续用手指在阴唇上抚摸着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4675-4676',
        any: [/PRINTL 继续用手指在阴唇上抚摸着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4677',
        any: [
          /PRINTFORMW 「呜哈啊啊…咕噜…呜呜…哈…啊呜…呜咕噜噜噜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4678',
        any: [
          /PRINTFORMW （一边自慰一边吮吸肉棒真是太美味了…%SELF_CALL\(TARGET\)%已经…对精液迫不及待了呢………%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4679',
        any: [/CFLAG:361 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4681',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4682',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…才不要一边自慰…一边帮你做那种事…呜…呜啊…呜…呜咕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4683',
        any: [
          /PRINTFORM %SAVESTR:TARGET%被命令用口服侍%SAVESTR:PLAYER%的阴茎，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4684',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4685',
        any: [/PRINTL 两穴里的蠕虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4686',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4687',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰激烈的继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4688',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4689',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4689-4690',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4691',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4691-4692',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4693',
        any: [/PRINTFORMW 「呜呜…呜咕噜…哈啊…呜…呜咕…呜呜……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4694',
        any: [
          /PRINTFORMW （哎呀…%SELF_CALL\(TARGET\)%已经习惯了这样的事情了啊………）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4695',
        any: [/CFLAG:361 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4697',
        any: [/ELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4698',
        any: [
          /PRINTFORMW 「呜…哈啊…哈啊…要%SELF_CALL\(TARGET\)%…做这样的事…呜呼…呜呜…呜哈啊咕咕……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4699',
        any: [
          /PRINTFORM %SAVESTR:TARGET%被命令用口服侍%SAVESTR:PLAYER%的阴茎，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4700',
        any: [/IF TEQUIP:11 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4701',
        any: [/PRINTL 两穴里的蠕虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4702',
        any: [/ELSEIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4703',
        any: [/PRINTL 小穴里的壶虫蠕动着，自慰激烈的继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4704',
        any: [/ELSEIF TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4705',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4705-4706',
        any: [/PRINTL 肛门里的肛门虫蠕动着，自慰激烈地继续………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4707',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4707-4708',
        any: [/PRINTL 自慰仍在继续着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4709',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4709-4710',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4709-4711',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4709-4712',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4713-4716',
        any: [/;手搓口交 CFLAG:362/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4718',
        any: [/IF SELECTCOM == 126/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4720',
        any: [/IF CFLAG:TARGET:362 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4722',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4723',
        any: [
          /PRINTFORMW 「啊啊啊想要精液！…请毫无顾虑的在%SELF_CALL\(TARGET\)%嘴里射满精液吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4724',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边用舌头舔着龟头，一边用手搓动着阴茎的根部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4726',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4727',
        any: [
          /PRINTFORMW 「手上都是精液呢，不过%SELF_CALL\(TARGET\)%的嘴里也想被射满精液…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4728',
        any: [/PRINTFORMW %SAVESTR:TARGET%的舌头缠绕着阴茎，用手摩擦着根部………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4730',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4731',
        any: [/PRINTFORMW 「就这样一边吸一边摩擦吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4732',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将%SAVESTR:PLAYER%的阴茎用嘴吸吮着，同时用手搓动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4734-4735',
        any: [/PRINTFORMW 「哈啊哈啊…做这种事情会让你很高兴吗！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4735',
        any: [/PRINTFORMW 「哈啊哈啊…做这种事情会让你很高兴吗！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4736',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将%SAVESTR:PLAYER%的阴茎用嘴吸吮着，同时用手搓动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4736-4737',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将%SAVESTR:PLAYER%的阴茎用嘴吸吮着，同时用手搓动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4738',
        any: [/CFLAG:TARGET:362 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4738-4739',
        any: [/CFLAG:TARGET:362 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4741-4743',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4743',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4744',
        any: [
          /PRINTFORMW 「啊啊啊想要精液啊！…请毫无顾虑地在%SELF_CALL\(TARGET\)%嘴里射满精液吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4745',
        any: [
          /PRINTFORMW 这么说着的%SAVESTR:TARGET%一边用舌头舔着龟头，一边用手搓动着阴茎的根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4746',
        any: [
          /PRINTFORMW 「啊啊啊…忍着不让精液射出来会更满足吧%UNICODE\(0x2661\) \*1% 呜哈呜啊…呜咕噜路%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4747',
        any: [/CFLAG:362 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4749',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4750',
        any: [
          /PRINTFORMW 「手上都是精液呢，不过%SELF_CALL\(TARGET\)%的嘴里也想被射满精液…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4751',
        any: [/PRINTFORMW %SAVESTR:TARGET%的舌头缠绕着阴茎，用手摩擦着根部。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4752',
        any: [
          /PRINTFORMW 「哈啊%UNICODE\(0x2661\) \*1%…呜啊呼%UNICODE\(0x2661\) \*1%…这样就好了吧%UNICODE\(0x2661\) \*1%…啊啊啊…像这样…%SELF_CALL\(TARGET\)%的身体也有些燥热了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4753',
        any: [/CFLAG:362 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4755',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4756',
        any: [/PRINTFORMW 「就这样一边吸一边摩擦吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4757',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将%SAVESTR:PLAYER%的阴茎用嘴吸吮着，同时用手搓动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4758',
        any: [/CFLAG:362 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4760',
        any: [/ELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4761',
        any: [/PRINTFORMW 「哈啊哈啊…做这种事情会让你很高兴吗！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4762',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将%SAVESTR:PLAYER%的阴茎用嘴吸吮着，同时用手搓动起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4763',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4763-4764',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4763-4765',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4763-4766',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4763-4767',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4774',
        any: [/IF SELECTCOM == 127/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4776',
        any: [/IF CFLAG:TARGET:363 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4778',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4779',
        any: [
          /PRINTFORMW 「呜啊啊啊…啊呼…呜呼…%UNICODE\(0x2661\) \*1%　呜…呜咕噜噜噜…哈啊…哈呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4780',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇收缩口腔，一边发出下流的声音一边用力吸住%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4782',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4783',
        any: [
          /PRINTFORMW 「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4784',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4786',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4787',
        any: [/PRINTFORMW 「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4789-4790',
        any: [/PRINTFORMW 「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4790',
        any: [/PRINTFORMW 「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4790-4791',
        any: [/PRINTFORMW 「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4792',
        any: [/CFLAG:TARGET:363 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4792-4793',
        any: [/CFLAG:TARGET:363 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4795-4797',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4797',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4798',
        any: [
          /PRINTFORMW 「不要停下…哈啊…咕噜噜…唔啊啊%UNICODE\(0x2661\) \*1%…嘿…呼…咕噜噜噜噜 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4799',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%收缩口腔，一边发出下流的声音一边用力吸住%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4800',
        any: [
          /PRINTFORMW 「呜呼呼…呜嗯…咕噜咕噜%UNICODE\(0x2661\) \*1%…哈啊呜呜…呜啊呜啊%UNICODE\(0x2661\) \*1%…哈啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4801',
        any: [/CFLAG:363 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4803',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4804',
        any: [
          /PRINTFORMW 「呜啊啊啊…啊呼…呜呼…呜…呜咕噜噜噜…哈啊…哈呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4805',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对插进来的阴茎爱不释口，故意发出下流的声音兴奋地引诱着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4806',
        any: [
          /PRINTFORMW 「停不下来了%UNICODE\(0x2661\) \*1%…好棒…想一直继续下去%UNICODE\(0x2661\) \*1%…呜呼啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4807',
        any: [/CFLAG:363 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4809',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4810',
        any: [/PRINTFORMW 「一大半都…呜呼…呜呜…真…真是不老实…呼呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4811',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那灵巧的舌头与阴茎纠缠着奏出一曲靡靡之音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4812',
        any: [/CFLAG:363 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4814',
        any: [/ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4815',
        any: [/PRINTFORMW 「呜嗯呜咕咕…呜啊…呜…呜咕咕咕噜…！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4816',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼中含着泪吸吮着肉棒，不时发出下流的响声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4817',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4817-4818',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4817-4819',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4817-4820',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4821-4824',
        any: [/;六九式 CFLAG:364/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4826',
        any: [/IF SELECTCOM == 69/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4828',
        any: [/IF CFLAG:TARGET:364 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4830',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4831',
        any: [
          /PRINTFORMW 「啊啊呜！ %SELF_CALL\(TARGET\)%下面已经变得湿湿的了呢%UNICODE\(0x2661\) \*1% 您的阴茎也很厉害呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4832',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屁股左右摆动着把自己的小穴压在%SAVESTR:PLAYER%脸上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4834',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4835',
        any: [
          /PRINTFORMW 「啊啊…不要，这样太恶心了啦…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%做那样的事…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4836',
        any: [
          /PRINTFORMW 虽然这么说但%SAVESTR:TARGET%还是把股间暴露在%SAVESTR:PLAYER%面前，发出轻轻的呻吟开始了口交服务。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4837',
        any: [/PRINTFORMW 「呜…哈啊…呜咕…呜啊…呜嗯…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4839',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4840',
        any: [/PRINTFORMW 「呜…啊呜…差不多就行了吧…快要忍受不了了…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4841',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4843-4844',
        any: [
          /PRINTFORMW 「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4844',
        any: [
          /PRINTFORMW 「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4845',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4845-4846',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4847',
        any: [/CFLAG:TARGET:364 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4847-4848',
        any: [/CFLAG:TARGET:364 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4850-4852',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4852',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4853',
        any: [
          /PRINTFORMW 「啊啊呜！ %SELF_CALL\(TARGET\)%下面已经变得湿湿的了呢%UNICODE\(0x2661\) \*1% 您的阴茎也很厉害呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4854',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屁股左右摆动着把自己的小穴压在%SAVESTR:PLAYER%脸上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4855',
        any: [
          /PRINTFORMW 「呜…呜咕…下面被玩弄得，玩弄得好舒服…啊啊…啊呜%UNICODE\(0x2661\) \*1% 呜啊…咕噜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4856',
        any: [/CFLAG:364 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4858',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4859',
        any: [
          /PRINTFORMW 「呜呜…再、再欺负我的话…就要咬人了啦…呜啊%UNICODE\(0x2661\) \*1% 哈呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4860',
        any: [
          /PRINTFORMW 虽然这么说但%SAVESTR:TARGET%还是把股间暴露在%SAVESTR:PLAYER%面前，发出轻轻的呻吟开始了口交服务。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4861',
        any: [
          /PRINTFORMW 「啊啊啊…不、不要…已经不行了啊啊…哈呜%UNICODE\(0x2661\) \*1% 啊啊呜…啊嗯…真讨厌～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4862',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用嘴唇夹住阴茎，一边发出下流的声音一边吮吸着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4863',
        any: [/CFLAG:364 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4865',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4866',
        any: [
          /PRINTFORMW 「呜…呜呜…这、这个程度已经够了啊啊…不要…唔啊唔嗯…哈啊…呜呜！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4867',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴被舌头不知不觉地入侵，发出有些意外的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4868',
        any: [/PRINTFORMW 「就这样…呜咕…呜呜…还…还可以在激烈点…呼啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4869',
        any: [/CFLAG:364 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4871',
        any: [/ELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4872',
        any: [
          /PRINTFORMW 「啊啊啊…呜…停、停下…再不老实的话…就…就开始咬了啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4873',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受着下体传来的舌头的感觉，背部不由自主地颤抖着，开始用嘴舔舐阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4874',
        any: [/PRINTFORMW 「呜…哈啊…呜…咕…呜…呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4875',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4875-4876',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4875-4877',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4875-4878',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4879-4882',
        any: [/;深喉 CFLAG:365/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4884',
        any: [/IF SELECTCOM == 124/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4886',
        any: [/IF CFLAG:TARGET:365 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4888',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4889',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4890',
        any: [
          /PRINTFORMW 「别、别这样…呜呼%UNICODE\(0x2661\) \*1%…咕噜…呜呜呜噜%UNICODE\(0x2661\) \*1%…咕噜…呜呜呜咕咕%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4892',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4893',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着幸福的神色放松喉咙将阴茎引了进来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4894',
        any: [
          /PRINTFORMW 「呜咕…咕噜…呜呜呜咕噜%UNICODE\(0x2661\) \*1%…呜呜…咕噜噜噜噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4896',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4897',
        any: [/PRINTFORMW 「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4898',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%喘息变得粗重，将阴茎深深吞入口腔来回舔舐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4900-4901',
        any: [/PRINTFORMW 「哈啊…要伸到…喉咙里这么深的地方…呜…呜咕咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4901',
        any: [/PRINTFORMW 「哈啊…要伸到…喉咙里这么深的地方…呜…呜咕咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4902',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸部因为痛苦而有些扭曲，不情不愿地将阴茎吞入喉中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4902-4903',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸部因为痛苦而有些扭曲，不情不愿地将阴茎吞入喉中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4904',
        any: [/CFLAG:TARGET:365 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4904-4905',
        any: [/CFLAG:TARGET:365 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4907-4909',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4909',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4910',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被阴茎插入了喉咙最深处，潮湿的舌头缠绕着阴茎不断来回清扫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4911',
        any: [
          /PRINTFORMW 「别、别这样…呜呼%UNICODE\(0x2661\) \*1%…咕噜…呜呜呜噜%UNICODE\(0x2661\) \*1%…咕噜…呜呜呜咕咕%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4912',
        any: [
          /PRINTFORMW （啊…就这样把肉棒全部吞下去%UNICODE\(0x2661\) \*1% 连胃里也侵犯一番吧%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4913',
        any: [/CFLAG:365 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4915',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4916',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着幸福的神色放松喉咙将阴茎引了进来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4917',
        any: [
          /PRINTFORMW 「呜咕…咕噜…呜呜呜咕噜%UNICODE\(0x2661\) \*1%…呜呜…咕噜噜噜噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4918',
        any: [
          /PRINTFORMW （这个大肉棒…全部是%SELF_CALL\(TARGET\)%的…谁也别想要抢…%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4919',
        any: [/CFLAG:365 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4921',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4922',
        any: [/PRINTFORMW 「呜咕…咕噜…呜呜呜咕噜…呜呜…咕噜噜噜噜…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4923',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%鼻息粗重地感受着阴茎在自己喉咙里来回往复。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4924',
        any: [/PRINTFORMW 几次忍住呕吐的欲望吞吐着阴茎拼命地服侍着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4925',
        any: [/CFLAG:365 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4927',
        any: [/ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4928',
        any: [
          /PRINTFORMW 「呜…呜呜…呜嗯呜嗯…知、知道了…这种肮脏的服务…呜…呜咕…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4929',
        any: [/PRINTFORMW %SAVESTR:TARGET%将阴茎勉勉强强地含在嘴里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4930',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4930-4931',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4930-4932',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4930-4933',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4934-4937',
        any: [/;强制口交 CFLAG:381/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4939',
        any: [/IF SELECTCOM == 80/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4941',
        any: [/IF CFLAG:TARGET:381 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4943',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4944',
        any: [
          /PRINTFORMW 「唔啊啊啊…呜呼！呼啊啊！啊啊啊…真是粗暴呢%UNICODE\(0x2661\) \*1%…这样抓着头很痛啊…！啊啊呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4945',
        any: [
          /PRINTFORMW 虽然这样说着但%SAVESTR:TARGET%还是对%SAVESTR:PLAYER%粗暴的突刺很是享受的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4947',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4948',
        any: [
          /PRINTFORMW 「呜啊啊啊…%SELF_CALL\(TARGET\)%的嘴巴被当做飞机杯了吧…呜呜咕咕噜呜！？ 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4949',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的头被抓住，阴茎粗鲁地挤进喉咙里，翻起了白眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4951',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4952',
        any: [
          /PRINTFORMW 「住…住手！想把那样的脏东西放进%SELF_CALL\(TARGET\)%的嘴里吗…我、我会咬断它的…呜…呜咕咕咕咕咕！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4953',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的头被紧紧抓住阴茎不断地在她喉间耸动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4955',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4956',
        any: [
          /PRINTFORMW 「啊呜咕…呜…呜…呜咕咕咕咕噜！？！？还、还要再来吗…呜咕噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4957',
        any: [/PRINTFORMW %SAVESTR:TARGET%的喉咙深处被插入的阴茎动摇着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4959-4960',
        any: [
          /PRINTFORMW 「啊啊啊…停、停下来…喉咙要受不了了…呜咕…呜啊啊啊…咕噜…咕噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4960',
        any: [
          /PRINTFORMW 「啊啊啊…停、停下来…喉咙要受不了了…呜咕…呜啊啊啊…咕噜…咕噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4961',
        any: [/PRINTFORMW %SAVESTR:TARGET%苦涩地应对着插到喉间的阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4961-4962',
        any: [/PRINTFORMW %SAVESTR:TARGET%苦涩地应对着插到喉间的阴茎………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4963',
        any: [/CFLAG:TARGET:381 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4963-4964',
        any: [/CFLAG:TARGET:381 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4966-4968',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4968',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4969',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的头，激烈地耸动着腰，侵犯她的嘴巴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4970',
        any: [
          /PRINTFORMW 「呜咕…哈啊呜呜%UNICODE\(0x2661\) \*1%…咕噜咕噜%UNICODE\(0x2661\) \*1%…咕噜咕噜呜噜呜噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4971',
        any: [
          /PRINTFORMW 已经品尝到阴茎美味的%SAVESTR:TARGET%边流着泪边露出愉悦的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4972',
        any: [/CFLAG:381 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4974',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4975',
        any: [
          /PRINTFORMW 「什么啊！？…不…别这样嘛…呜呜…呜咕咕咕咕%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4976',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%喉咙被突入最深处，眼神中露出一丝放荡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4977',
        any: [
          /PRINTFORMW 「啊呜…呜呜咕噜…%SELF_CALL\(TARGET, 1\)%的嘴巴真是幸福呢…%UNICODE\(0x2661\) \*1% 呜呜咕咕咕咕噜噜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4978',
        any: [/CFLAG:381 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4980',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && \(CFLAG:381 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4981',
        any: [
          /PRINTFORMW 「呜呜…呜咕！我的脸颊…快、快住手啊…我真的咬了……呜！呜呜咕噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4982',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%摇着头想反抗却被捏住鼻子强行把阴茎伸进了嘴里，只能无奈地忍受嘴里抽动的的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4983',
        any: [
          /PRINTFORMW 「呜呼…呜…呜咕…咕噜…已、已经…咕啊啊啊啊啊呜…呜呜！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4984',
        any: [/CFLAG:381 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4986',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4987',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的喉咙深处被插入的阴茎卡得动弹不得………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4988',
        any: [
          /PRINTFORMW 「再、再这样粗暴的话…就要吐出来了………唔咕咕咕…呜咕噜噜噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4989',
        any: [/CFLAG:381 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4991',
        any: [/ELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4992',
        any: [
          /PRINTFORMW 「哈啊哈啊…我会老实的，所以快点结束吧…呜啊！呜呜咕咕咕咕噜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4993',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%痛苦地忍耐着在喉咙深处不断抽插的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4994',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4994-4995',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4994-4996',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4994-4997',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '4998-5001',
        any: [/;穿环　CFLAG:348/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5005',
        any: [/IF SELECTCOM == 87/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5008',
        any: [/IF CFLAG:TARGET:348 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5010',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5012',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5014',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5015',
        any: [
          /PRINTFORMW 「哈～哈～乳头被穿上这么可爱的环……真高兴啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5016',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5018',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5019',
        any: [/PRINTFORMW 「嘻嘻～这样的话，以后都一直穿着露脐装吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5020',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5022',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5023',
        any: [
          /PRINTFORMW 「啊…%SELF_CALL\(TARGET\)%…连被这样弄，也有感觉了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5024',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5026',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5027',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5028',
        any: [
          /PRINTFORMW 「鸡鸡变得这么好看了呢…非常感谢～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5029',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5029-5030',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5031',
        any: [
          /PRINTFORMW 「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5032',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5032-5033',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5035',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5036',
        any: [
          /PRINTFORMW 「唔…哦～这样子，口交的时候，就会更舒服了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5037',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5039',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5040',
        any: [
          /PRINTFORMW 「唔…这个环真适合我…哈哈～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5041',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔舐着自己刚被穿环的嘴唇……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5043',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5044',
        any: [/PRINTFORMW 「这，这个有点…不好意思………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5045',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5045-5046',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5048-5049',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5049',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5049-5050',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5052',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5054',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5056',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5057',
        any: [
          /PRINTFORMW 「啊！…漂亮的环…如果这是订婚戒指的话…该多好啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5058',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着乳头穿刺的疼痛，好像看着闪闪发亮的乳环陷入了妄想之中……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5060',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5061',
        any: [/PRINTFORMW 「嗯…肚脐竟然………不过，好漂亮呢～………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5062',
        any: [/PRINTFORMW %SAVESTR:TARGET%在脐环周围摩挲着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5064',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5065',
        any: [
          /PRINTFORMW 「这，这种地方被上环的话…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…会变奇怪的啦！………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5066',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘴上说不要，身体却老老实实地开始发烫了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5068',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5069',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5070',
        any: [/PRINTFORMW 「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5071',
        any: [/PRINTFORMW %SAVESTR:TARGET%因阴茎被穿环，气息变得炽热了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5071-5072',
        any: [/PRINTFORMW %SAVESTR:TARGET%因阴茎被穿环，气息变得炽热了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5073',
        any: [
          /PRINTFORMW 「连这种地方都得到了赏赐…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…已经不能没有魔王大人了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5074',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着脸兴奋地说到。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5074-5075',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着脸兴奋地说到。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5077',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5078',
        any: [
          /PRINTFORMW 「呢～…魔王大人哦～…来和%SELF_CALL\(TARGET\)%接吻嘛～…来感受一下%SELF_CALL\(TARGET\)%的舌头～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5079',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%伸出被穿环的舌头，引诱着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5081',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5082',
        any: [/PRINTFORMW 「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5083',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔舐着自己刚被穿环的嘴唇……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5085',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5086',
        any: [/PRINTFORMW 「讨，讨厌啦～…在这里穿环什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5087',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5087-5088',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5090-5091',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5091',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5091-5092',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5094-5096',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5096',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5098',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5099',
        any: [
          /PRINTFORMW 「唔呀呀！…%SELF_CALL\(TARGET\)%要开始讨厌你啦…！放过乳头啊！～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5100',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为乳头的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5102',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5103',
        any: [/PRINTFORMW 「这、这种样子……只是一种时尚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5104',
        any: [/PRINTFORMW %SAVESTR:TARGET%因肚脐的痛楚泪眼婆娑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5106',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5107',
        any: [
          /PRINTFORMW 「在这种地方上环？！…啊啊！…%SELF_CALL\(TARGET\)%已经……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5108',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5110',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5111',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5112',
        any: [/PRINTFORMW 「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5113',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴茎的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5113-5114',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴茎的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5115',
        any: [
          /PRINTFORMW 「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5116',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴蒂的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5116-5117',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴蒂的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5119',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5120',
        any: [/PRINTFORMW 「放……放过……我……我以后再也不说……您的坏话了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5121',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为舌环，口齿不清了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5123',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5124',
        any: [/PRINTFORMW 「连嘴唇也不放过………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5125',
        any: [/PRINTFORMW %SAVESTR:TARGET%的唇上被穿了环，流下了屈辱的泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5127',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5128',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%才不是家畜！！………呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5129',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5129-5130',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5132-5133',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5133',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5133-5134',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5135-5136',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5136',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5136-5137',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5139-5141',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5141',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5143',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5145',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5146',
        any: [
          /PRINTFORMW 「哈～哈～乳头被穿上这么可爱的环……真高兴啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5147',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着乳头穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5149',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5150',
        any: [/PRINTFORMW 「嘻嘻～这样的话，以后都一直穿着露脐装吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5151',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着肚脐穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5153',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5154',
        any: [
          /PRINTFORMW 「啊……被这么弄的话，%SELF_CALL\(TARGET\)%以后只能和变态做爱的嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5155',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴唇穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5157',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5158',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5159',
        any: [
          /PRINTFORMW 「鸡鸡变得这么好看了呢…非常感谢～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5160',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5160-5161',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴茎穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5162',
        any: [
          /PRINTFORMW 「啊、啊…得到这么漂亮的环…小豆豆也有感觉了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5163',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5163-5164',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着阴蒂穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5166',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5167',
        any: [
          /PRINTFORMW 「唔…哦～这样子，口交的时候，就会更舒服了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5168',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍受着舌头穿刺的疼痛，好像因为被穿环而愉悦着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5170',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5171',
        any: [
          /PRINTFORMW 「呵呵，嘴唇和环，意外地相衬呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5172',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔舐着自己刚被穿环的嘴唇……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5174',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5175',
        any: [/PRINTFORMW 「鼻…鼻子穿了环的话，显得我更加可爱了吗……？…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5176',
        any: [/PRINTFORMW %SAVESTR:TARGET%有点不好意思地摸着鼻子……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5176-5177',
        any: [/PRINTFORMW %SAVESTR:TARGET%有点不好意思地摸着鼻子……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5179-5180',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5180',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5180-5181',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5182',
        any: [/CFLAG:348 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5184',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5186',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5188',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5189',
        any: [
          /PRINTFORMW 「嘻嘻～魔王大人啊～两边都可以尽情地玩弄哦！……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5190',
        any: [/PRINTFORMW %SAVESTR:TARGET%晃动着胸前的环……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5192',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5193',
        any: [/PRINTFORMW 「嗯…肚脐竟然………不过，好漂亮呢～………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5194',
        any: [/PRINTFORMW %SAVESTR:TARGET%在脐环周围摩挲着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5196',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5197',
        any: [
          /PRINTFORMW 「这，这种地方也被上环的话……已经不能和魔王大人以外的对象做爱啦！…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5198',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着闪闪发亮的环出神了…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5200',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5201',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5202',
        any: [/PRINTFORMW 「啊～鸡鸡被这么漂亮地装饰着……十分感谢～！…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5203',
        any: [/PRINTFORMW %SAVESTR:TARGET%因阴茎被穿环，气息变得炽热了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5203-5204',
        any: [/PRINTFORMW %SAVESTR:TARGET%因阴茎被穿环，气息变得炽热了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5205',
        any: [
          /PRINTFORMW 「这样的地方也被穿环了啊…魔王大人，要对人家负责啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5206',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着脸兴奋地说到。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5206-5207',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着脸兴奋地说到。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5209',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5210',
        any: [
          /PRINTFORMW 「呢～…魔王大人哦～…来和%SELF_CALL\(TARGET\)%接吻嘛～…来感受一下%SELF_CALL\(TARGET\)%的舌头～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5211',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%伸出被穿环的舌头，引诱着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5213',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5214',
        any: [/PRINTFORMW 「嘿嘿嘿…曾经也到过一些地方，以这样子为时尚呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5215',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔舐着自己刚被穿环的嘴唇……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5217',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5218',
        any: [/PRINTFORMW 「讨，讨厌啦～…在这里穿环什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5219-5220',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地转过了头，不让你看到被穿环的鼻子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5222-5223',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5223',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5223-5224',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5225',
        any: [/CFLAG:348 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5227',
        any: [/ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5229',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5231',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5232',
        any: [
          /PRINTFORMW 「唔呀呀！…%SELF_CALL\(TARGET\)%要开始讨厌你啦…！放过乳头啊！～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5233',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为乳头的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5235',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5236',
        any: [/PRINTFORMW 「这，这种样子……只是一种时尚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5237',
        any: [/PRINTFORMW %SAVESTR:TARGET%因肚脐的痛楚泪眼婆娑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5239',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5240',
        any: [
          /PRINTFORMW 「在这种地方上环？！…啊啊！…%SELF_CALL\(TARGET\)%已经……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5241',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5243',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5244',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5245',
        any: [/PRINTFORMW 「呜呜…呜呜…呜呜喔…为……为什么要被做这样的事………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5246',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴茎的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5246-5247',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴茎的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5248',
        any: [
          /PRINTFORMW 「呜呜…呜呜…呜呜喔…被……被做这样的事………已经……嫁不出去了啦…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5249',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴蒂的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5249-5250',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴蒂的疼痛和屈辱而流下了泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5252',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5253',
        any: [/PRINTFORMW 「放……放过……我……我以后再也不说……您的坏话了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5254',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为舌环，口齿不清了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5256',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5257',
        any: [/PRINTFORMW 「连嘴唇也不放过………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5258',
        any: [/PRINTFORMW %SAVESTR:TARGET%的唇上被穿了环，流下了屈辱的泪水……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5260',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5261',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%才不是家畜！！………呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5262',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5262-5263',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%屈辱地转过了头，不让你看到被穿环的鼻子，嚎啕大哭着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5265-5266',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5266',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5266-5267',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着之前被穿环的地方……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5268',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5268-5269',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5268-5270',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5268-5271',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5272-5275',
        any: [/;@DOG_KOJO関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5278',
        any: [/@DOG_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5283',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5285',
        any: [/IF CFLAG:301 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5287',
        any: [/IF MARK:2 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5288',
        any: [/PRINTFORMW 「啊…狗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5290-5291',
        any: [/PRINTFORMW 「滚开！　你这蠢狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5291',
        any: [/PRINTFORMW 「滚开！　你这蠢狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5291-5292',
        any: [/PRINTFORMW 「滚开！　你这蠢狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5293',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5293-5294',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5296-5298',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5298',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5299',
        any: [/PRINTFORMW 「啊啊啊♪　可爱的狗狗♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5300',
        any: [/CFLAG:301 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5302',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5303',
        any: [/PRINTFORMW 「狗也不错嘛…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5304',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5306',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5307',
        any: [/PRINTFORMW 「…兽类么」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5308',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5310',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5311',
        any: [/PRINTFORMW 「不…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5312',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5314',
        any: [/ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5315',
        any: [/PRINTFORMW 「混蛋！住手！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5316',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5318',
        any: [/ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5319',
        any: [/PRINTFORMW 「你这死狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5320',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5320-5321',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5320-5322',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5320-5323',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5324-5327',
        any: [/;兽奸舔阴 CFLAG:302/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5329',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5331',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5333',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5334',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5333-5336',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5337',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5338-5339',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5339',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5339-5340',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5342-5344',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5344',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5345',
        any: [/PRINTFORMW 「啊啊啊啊、很舒服呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5346',
        any: [/CFLAG:302 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5348',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5349',
        any: [/PRINTFORMW 「…用力点舔吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5350',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5352',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5353',
        any: [/PRINTFORMW 「…嗯嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5354',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5356',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5357',
        any: [/PRINTFORMW 「不…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5358',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5360',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5361',
        any: [/PRINTFORMW 「滚开！　禽兽！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5362',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5362-5363',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5362-5364',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5362-5365',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5362-5366',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5372',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5374',
        any: [/IF CFLAG:306 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5376',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5377',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5378-5379',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5380',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5381-5382',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5382',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5382-5383',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5385-5387',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5387',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5388',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5389',
        any: [/CFLAG:306 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5391',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5392',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5393',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5395',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5396',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5397',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5399',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5400',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5401',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5403',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5404',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5405',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5405-5406',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5405-5407',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5405-5408',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5409-5412',
        any: [/;兽奸キス CFLAG:307/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5414',
        any: [/IF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5416',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5418',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5419',
        any: [/PRINTFORMW 「初吻…献给狗先生了呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5421',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5422',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5424',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5425',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5424-5427',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5428',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5429-5430',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5430',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5430-5431',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5433',
        any: [/ELSEIF CFLAG:307 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5435',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5436',
        any: [/PRINTFORMW 「和狗先生接吻…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5438',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5439',
        any: [/PRINTFORMW 「狗啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5441',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5442',
        any: [/PRINTFORMW 「狗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5442-5444',
        any: [/PRINTFORMW 「狗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5445',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5446-5447',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5447',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5447-5448',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5450-5452',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5452',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5453',
        any: [/PRINTFORMW 「狗先生啊…咕咕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5454',
        any: [/CFLAG:307 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5456',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5457',
        any: [/PRINTFORMW 「狗啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5458',
        any: [/CFLAG:307 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5460',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5461',
        any: [/PRINTFORMW 「狗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5462',
        any: [/CFLAG:307 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5464',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5465',
        any: [/PRINTFORMW 「住、住手啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5466',
        any: [/CFLAG:307 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5468',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5469',
        any: [/PRINTFORMW 「无法接受…死也不能接受啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5470',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5470-5471',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5470-5472',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5470-5473',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5474-5477',
        any: [/;兽奸舔肛 CFLAG:310/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5479',
        any: [/IF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5481',
        any: [/IF CFLAG:310 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5483',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5484',
        any: [/PRINTFORMW 「要被舔肛门吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5486',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5487',
        any: [/PRINTFORMW 「要被舔肛门吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5489',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5490',
        any: [/PRINTFORMW 「屁股…吗」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5491-5492',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5493',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5494-5495',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5495',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5495-5496',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5498-5500',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5500',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5501',
        any: [/PRINTFORMW 「屁股融化了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5502',
        any: [/CFLAG:310 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5504',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5505',
        any: [/PRINTFORMW 「狗的呼吸…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5506',
        any: [/CFLAG:310 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5508',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5509',
        any: [/PRINTFORMW 「感觉很奇怪啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5510',
        any: [/CFLAG:310 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5512',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5513',
        any: [/PRINTFORMW 「不…不…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5514',
        any: [/CFLAG:310 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5516',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5517',
        any: [/PRINTFORMW 「混蛋！　住手啊你这贱狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5518',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5518-5519',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5518-5520',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5518-5521',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5522-5525',
        any: [/;兽奸背后位 CFLAG:322/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5527',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5529',
        any: [/IF CFLAG:TARGET:322 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5531',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5533',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5534',
        any: [/PRINTFORMW 「献给狗先生…很荣幸呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5536',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5537',
        any: [/PRINTFORMW 「需要一定的勇气啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5539',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5540',
        any: [/PRINTFORMW 「和狗做这种事情…太过分了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5540-5543',
        any: [/PRINTFORMW 「和狗做这种事情…太过分了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5544',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5545-5549',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5547-5549',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5549',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5550',
        any: [/PRINTFORMW 「和狗先生交配呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5552',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5553',
        any: [/PRINTFORMW 「有点不太对劲吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5555',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5556',
        any: [/PRINTFORMW 「狗吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5556-5558',
        any: [/PRINTFORMW 「狗吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5559',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5560-5562',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5561-5562',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5562',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5562-5563',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5565-5567',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5567',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5568',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5569',
        any: [/PRINTFORMW %SAVESTR:TARGET%像野兽般呻吟着，摇摆着下体。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5570',
        any: [
          /PRINTFORMW 「啊狗先生！　我已经、沉溺在做母狗的快乐里了！请射在我体内吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5571',
        any: [/PRINTFORMW 两只野兽纠缠着，享受这欲望的快感/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5572',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5573',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边吮吸着野狗的舌头，承受着身后大肉棒的侵袭/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5574',
        any: [/PRINTFORMW 「汪！　汪汪！　啊呼…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5575',
        any: [/PRINTFORMW 哪里还找得到曾经的高傲，如今不过是一头淫兽罢了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5575-5576',
        any: [/PRINTFORMW 哪里还找得到曾经的高傲，如今不过是一头淫兽罢了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5577',
        any: [/PRINTFORMW %SAVESTR:TARGET%和野兽激烈地碰撞着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5578',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%、是狗先生的奴隶！　请饲养%SELF_CALL\(TARGET\)%吧♪　拜托了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5579',
        any: [/PRINTFORMW 这谄媚地望向野狗的身姿，已经找不到曾经的傲慢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5579-5580',
        any: [/PRINTFORMW 这谄媚地望向野狗的身姿，已经找不到曾经的傲慢/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5581',
        any: [/CFLAG:322 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5583',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5584',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5585',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5586',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5587',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5586-5588',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5589',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5590-5591',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5591',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5593',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5594',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5595',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5596',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5597',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5596-5598',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5599',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5600-5601',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5601',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5603',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5604',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5605',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5607',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5608',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5609',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5611',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5612',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5614',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5614-5615',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5614-5616',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5614-5617',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5618-5621',
        any: [/;兽奸背后位アナル CFLAG:328/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5623',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5625',
        any: [/IF CFLAG:TARGET:328 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5627',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5628',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5630',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5631',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5633',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5634',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5635-5636',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5637',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5638-5639',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5639',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5639-5640',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5642-5643',
        any: [/;牝犬＋A感覚Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5644',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5645',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5646',
        any: [/PRINTFORMW 「狗先生、好粗…肛门都被撑开了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5646-5647',
        any: [/PRINTFORMW 「狗先生、好粗…肛门都被撑开了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5648',
        any: [
          /PRINTFORMW 「啊啊…狗先生…%SELF_CALL\(TARGET\)%的小穴和肛门感觉如何…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5648-5649',
        any: [
          /PRINTFORMW 「啊啊…狗先生…%SELF_CALL\(TARGET\)%的小穴和肛门感觉如何…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5650',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5652',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5653',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5654',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5653-5655',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5656',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5657-5658',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5658',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5660',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5661',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5662',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5661-5663',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5664',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5665-5666',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5666',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5668',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5669',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5670',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5672',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5673',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5674',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5676',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5677',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5678',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5678-5679',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5678-5680',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5678-5681',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5682-5685',
        any: [/;兽奸手淫 CFLAG:331/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5687',
        any: [/IF SELECTCOM == 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5689',
        any: [/IF CFLAG:TARGET:331 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5691',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5692',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5694',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5695',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5697',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5698',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5699-5700',
        any: [/;それ以外（侍奉精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5701',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5702-5703',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5703',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5703-5704',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5706-5707',
        any: [/;牝犬＋侍奉精神Lv3以上/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5708',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5709',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5710',
        any: [/PRINTFORMW 「给狗先生服务好幸福…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5710-5711',
        any: [/PRINTFORMW 「给狗先生服务好幸福…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5712',
        any: [/PRINTFORMW 「撸啊撸啊撸♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5712-5713',
        any: [/PRINTFORMW 「撸啊撸啊撸♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5714',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5716',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5717',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5718',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5717-5719',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5720',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5721-5722',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5722',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5724',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5725',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5726',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5725-5727',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5728',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5729-5730',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5730',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5732',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5733',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5734',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5736',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5737',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5738',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5740',
        any: [/ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5741',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5742',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5742-5743',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5742-5744',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5742-5745',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5746-5749',
        any: [/;兽奸口交 CFLAG:332/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5751',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5753',
        any: [/IF CFLAG:TARGET:332 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5755',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5756',
        any: [/PRINTFORMW 「野兽鸡巴♪　我要开动咯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5758',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5759',
        any: [/PRINTFORMW 「唔诶……野兽的味道……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5761',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5762',
        any: [/PRINTFORMW 「唔诶……野兽的味道……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5764',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5765',
        any: [/PRINTFORMW 「好的……照做不就行了嘛」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5767-5768',
        any: [/PRINTFORMW 「唔噗呜……呕诶……讨厌」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5768',
        any: [/PRINTFORMW 「唔噗呜……呕诶……讨厌」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5768-5769',
        any: [/PRINTFORMW 「唔噗呜……呕诶……讨厌」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5770',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5770-5771',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5773-5774',
        any: [/;牝犬＋侍奉精神Lv5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5775',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5776',
        any: [/PRINTFORMW 「狗先生，请不要客气，把精液注入我下贱的嘴里吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5777',
        any: [/CFLAG:332 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5779',
        any: [
          /ELSEIF TALENT:TARGET:136 == 1 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5780',
        any: [/PRINTFORMW 「哈唔……啾……觉得舒服吗♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5781',
        any: [/CFLAG:332 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5783',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5784',
        any: [/PRINTFORMW 「野兽虽然臭臭的……但是可以啊、可以啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5785',
        any: [/CFLAG:332 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5787',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5788',
        any: [/PRINTFORMW 「呜……野兽的味道」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5789',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5791',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5792',
        any: [/PRINTFORMW 「野兽虽然臭臭的……但我会尽力的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5793',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5795',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5796',
        any: [/PRINTFORMW 「呜呜……服务它就可以了吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5797',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5799',
        any: [/ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5800',
        any: [/PRINTFORMW 「呜噗……呕诶……讨厌」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5801',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5801-5802',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5801-5803',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5801-5804',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5805-5808',
        any: [/;兽奸骑乘位 CFLAG:335/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5810',
        any: [/IF SELECTCOM == 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5812',
        any: [/IF CFLAG:TARGET:335 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5814',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5816',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5817',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5819',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5820',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5822',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5823',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5824-5825',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5826',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5824-5827',
        any: [/;それ以外（爱無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5829-5831',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5831',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5832',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5834',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5835',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5837',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5838',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5837-5840',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5841',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5842-5844',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5843-5844',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5844',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5844-5845',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5847-5849',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5849',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5850',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5851',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5852',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5853',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5852-5854',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5855',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5856-5857',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5857',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5859',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5860',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5861',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5862',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5863',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5864',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5865',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5864-5866',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5867',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5868-5869',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5869',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5871',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5872',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5873',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5874',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5875',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5876',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5877',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5876-5878',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5879',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5880-5881',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5881',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5883',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5884',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5885',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5886',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5887',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5888',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5889',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5888-5890',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5891',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5892-5893',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5893',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5895',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5896',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5897',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5898',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5900',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5901',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5902',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5902-5903',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5902-5904',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5902-5905',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5906-5909',
        any: [/;兽奸肛门侍奉 CFLAG:338/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5911',
        any: [/IF SELECTCOM == 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5913',
        any: [/IF CFLAG:TARGET:338 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5915',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5916',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5917-5918',
        any: [/;それ以外（侍奉精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5919',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5920-5921',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5921',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5921-5922',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5924-5925',
        any: [/;牝犬＋侍奉精神Lv5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5926',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5927',
        any: [/PRINTFORMW 「狗先生的肛门，看起来好诱人呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5928',
        any: [/CFLAG:338 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5930',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5931',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5932',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5934',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5935',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5936',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5938',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5939',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5940',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5942',
        any: [/ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5943',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5944',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5944-5945',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5944-5946',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5944-5947',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5948-5951',
        any: [/;兽奸眼罩 CFLAG:344　CFLAG:380/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5954',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5956',
        any: [/IF CFLAG:TARGET:344 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5958',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5959',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5961',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5962',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5964',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5965',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5964-5967',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5968',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5969-5970',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5970',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5970-5971',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5973-5975',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5975',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5976',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5977',
        any: [/CFLAG:TARGET:344 = 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5979',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5980',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5981',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5983',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5984',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5985',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5987',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5988',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5989',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5991',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5992',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5993',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5995',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5996',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5997',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '5999',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6000',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6001',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6003',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6004',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6005',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6007',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6008',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6009',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6009-6010',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6009-6011',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6012-6014',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6014',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6016',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6017',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6018',
        any: [/CFLAG:380 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6020',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6021',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6022',
        any: [/CFLAG:380 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6024',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6025',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6026',
        any: [/CFLAG:380 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6028',
        any: [/ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6029',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6030',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6030-6031',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6030-6032',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6030-6033',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6039',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6041',
        any: [/IF CFLAG:357 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6042',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6045',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6046',
        any: [/PRINTFORMW 「你好啊♪　这里是%SAVESTR:TARGET%♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6047',
        any: [
          /PRINTFORMW 「很惊讶吧，以后%SELF_CALL\(TARGET\)%，就会住在你旁边一直和你做爱哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6048',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6049',
        any: [
          /PRINTFORMW 「可不要因为%SELF_CALL\(TARGET\)%像是野兽一样的低贱地和狗交配就蔑视我哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6051',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6052',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6054',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6055',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6054-6057',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6058',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6059-6061',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6060-6061',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6061',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6061-6062',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6064-6065',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6065',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6068',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6069',
        any: [/PRINTFORMW 「你好啊♪　这里是%SAVESTR:TARGET%♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6070',
        any: [
          /PRINTFORMW 「很惊讶吧、以后%SELF_CALL\(TARGET\)%，就会住在你旁边一直和你做爱哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6071',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%啊♪已经成为比狗狗还下贱的家畜了♪跟狗先生缔结了奴隶契约的说♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6073',
        any: [/IF ABL:39 >= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6074',
        any: [/PRINTFORMW 「阴道和子宫已经完全成了狗肉棒专用的了啦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6074-6075',
        any: [/PRINTFORMW 「阴道和子宫已经完全成了狗肉棒专用的了啦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6077',
        any: [/IF TALENT:317 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6078',
        any: [
          /PRINTFORMW 「恋人……？嗯，已经没办法生他的孩子了啦♪　抱歉了啦♪♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6078-6079',
        any: [
          /PRINTFORMW 「恋人……？嗯，已经没办法生他的孩子了啦♪　抱歉了啦♪♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6080',
        any: [
          /PRINTFORMW 「可不要因为%SELF_CALL\(TARGET\)%像是野兽一样的低贱地和狗交配就蔑视我哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6081',
        any: [/CFLAG:357 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6083',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6084',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6085',
        any: [/CFLAG:357 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6087',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6088',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6089',
        any: [/CFLAG:357 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6091',
        any: [/ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6092',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093-6094',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093-6095',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093-6096',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093-6097',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6093-6098',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6101-6104',
        any: [/;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6108',
        any: [/@KOJO_MESSAGE_PALAMCNG_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6110-6111',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6113-6114',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6116-6117',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6119',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6119-6120',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6121-6122',
        any: [/;失神時には口上をスキップする/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6123-6124',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6132',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6133',
        any: [/IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6135',
        any: [/IF TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6137',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6138',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%饶有兴味地研究着自己大腿间流下的润滑液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6139',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6141-6142',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为过于兴奋而摩擦着双脚，小穴已经爱液泛滥。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6142',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为过于兴奋而摩擦着双脚，小穴已经爱液泛滥。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6143',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%已经湿了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6144',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6144-6145',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6147-6148',
        any: [/;润滑液を使った場合/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6149',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6150',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%饶有兴味地研究着自己大腿间流下的润滑液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6151',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6153-6154',
        any: [/PRINTFORMW %SAVESTR:TARGET%的小穴因为兴奋的缘故变得湿润起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6154',
        any: [/PRINTFORMW %SAVESTR:TARGET%的小穴因为兴奋的缘故变得湿润起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6155',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%才没有什么感觉…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6156',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6156-6157',
        any: [/PRINTFORMW ―――润滑第一次超过LV2了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6158-6159',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6159',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6159-6160',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6165',
        any: [/P = PALAM:5 \+ UP:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6166',
        any: [/IF P > PALAMLV:2 && CFLAG:222 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6168',
        any: [/IF TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6170',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6171',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6172',
        any: [
          /PRINTFORMW 媚药发作的%SAVESTR:TARGET%不仅嘴巴张开，耳朵也因为发情变得通红。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6173',
        any: [
          /PRINTFORMW 「对%SELF_CALL\(TARGET\)%用…用这样的药…啊啊啊…不行…大脑已经完全无法思考了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6174',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6176-6177',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6177',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6178',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸上带着之前从未有过的欲望看向%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6179',
        any: [/PRINTFORMW 「啊啊啊…想马上就把你推倒…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6180',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6180-6181',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6183-6185',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6185',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6186',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6187',
        any: [
          /PRINTFORMW 媚药发作使得%SAVESTR:TARGET%不得不张开嘴巴，发出粗重的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6188',
        any: [
          /PRINTFORMW 「哈啊啊啊…卑鄙的家、家伙…用这种…肮、肮脏的…手段…！ 啊啊啊…啊啊…身体好热！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6189',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6191-6192',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6192',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6193',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸颊染上一层春色，露出松懈的表情。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6194',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…怎么有点、有点想要的样子…嗯啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6195',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6195-6196',
        any: [/PRINTFORMW ―――欲情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6197-6198',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6198',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6198-6199',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6204',
        any: [/P = PALAM:8 \+ UP:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6205',
        any: [/IF P > PALAMLV:2 && CFLAG:223 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6207',
        any: [/IF TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6208',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6209',
        any: [
          /PRINTFORMW 注意到自己做了太过于羞耻的事情，%SAVESTR:TARGET%的脸因为耻辱变得通红。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6210',
        any: [/PRINTFORMW 「啊………不…不准…呜…看…看我啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6211',
        any: [/PRINTFORMW ―――耻情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6213-6214',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6214',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6215',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为耻辱耳根通红。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6216',
        any: [/PRINTFORMW 「呜呜…不、不准看我………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6217',
        any: [/PRINTFORMW ―――耻情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6217-6218',
        any: [/PRINTFORMW ―――耻情第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6219',
        any: [/CFLAG:223 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6219-6220',
        any: [/CFLAG:223 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6225',
        any: [/P = PALAM:10 \+ UP:10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6226',
        any: [/IF P > PALAMLV:2 && CFLAG:224 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6228',
        any: [/IF TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6229',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6230',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这意想不到的情况而脸色铁青……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6231',
        any: [/PRINTFORMW ―――恐怖第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6233-6234',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6234',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6235',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为恐怖而脸色扭曲………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6236',
        any: [/PRINTFORMW ―――恐怖第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6236-6237',
        any: [/PRINTFORMW ―――恐怖第一次超过LV2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6238',
        any: [/CFLAG:224 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6238-6239',
        any: [/CFLAG:224 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6244',
        any: [/IF NOWEX:0 > 0 && CFLAG:225 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6246',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6247',
        any: [
          /PRINTFORMW 「啊啊啊啊…去了！去啦！…%SELF_CALL\(TARGET\)%要去啦！～…唔哦哦哦哦！！～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6248',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴蒂受到刺激第一次到达了绝顶。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6249',
        any: [/PRINTFORMW 这使她表情呆滞，口中有唾液垂下………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6251-6252',
        any: [
          /PRINTFORMW 「啊啊啊啊…下面、下面的那里…要去了…忍不住了…啊啊啊…呜啊啊哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6252',
        any: [
          /PRINTFORMW 「啊啊啊啊…下面、下面的那里…要去了…忍不住了…啊啊啊…呜啊啊哈啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6253',
        any: [/PRINTFORMW %SAVESTR:TARGET%的阴蒂受到刺激第一次到达了绝顶………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6256',
        any: [/PRINTFORMW 「该、该死…被你这种家伙看到这样的丑态………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6256-6257',
        any: [/PRINTFORMW 「该、该死…被你这种家伙看到这样的丑态………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6258',
        any: [/CFLAG:225 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6258-6259',
        any: [/CFLAG:225 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6264',
        any: [/IF NOWEX:1 > 0 && CFLAG:226 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6266',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6267',
        any: [
          /PRINTFORMW 「啊啊啊啊%SELF_CALL\(TARGET\)%淫荡的小穴高潮了呜呜%UNICODE\(0x2661\) \*1%…哈啊整个高潮的过程都被看得一清二楚呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6268',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了高潮，发出一阵又一阵高亢的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6270',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6271',
        any: [
          /PRINTFORMW 「有、呜…呜…%SELF_CALL\(TARGET\)%…有奇…奇怪的感觉…%UNICODE\(0x2661\) \*1%…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6272',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了阴道绝顶，气喘吁吁筋疲力尽地娇喘着靠在你的肩上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6273',
        any: [
          /PRINTFORMW 「这就是高潮的感觉啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6275',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6276',
        any: [
          /PRINTFORMW 「住、住手啊…啊啊啊啊…快停下来…不要再侵犯我的小穴了啊…啊啊啊啊！…呜呜…啊呜咕咕呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6277',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了阴道绝顶，眼神空洞地发着呆，小声嘀咕着什么。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6278',
        any: [/PRINTFORMW 「已经…该死…讨厌的家伙…明明不想的…却………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6280-6281',
        any: [
          /PRINTFORMW 「啊啊啊…呀呀呀…为什么…有一种糟糕的感觉…啊啊啊呜啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6281',
        any: [
          /PRINTFORMW 「啊啊啊…呀呀呀…为什么…有一种糟糕的感觉…啊啊啊呜啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6282',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了高潮，发出一阵又一阵高亢的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6282-6283',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了高潮，发出一阵又一阵高亢的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6284',
        any: [/CFLAG:TARGET:226 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6284-6285',
        any: [/CFLAG:TARGET:226 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6290',
        any: [/IF NOWEX:2 > 0 && CFLAG:227 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6292',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6293',
        any: [
          /PRINTFORMW 「屁股…屁股也…要去了…哇啊呜呜呜%UNICODE\(0x2661\) \*1% …啊啊啊…屁股传来这新鲜的感觉…咿咿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6294',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%迎来了第一次肛门绝顶，脸上浮现出一层粉红色的春潮………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6296',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6297',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊…屁、屁股%UNICODE\(0x2661\) \*1%…要去了啊啊啊…啊啊…啊呜呜呜呜%UNICODE\(0x2661\) \*1%…哈啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6298',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次感受到了高潮，口大大地张开垂下一行唾液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6300',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6301',
        any: [
          /PRINTFORMW 「哈…啊啊啊啊！别、别再玩弄我的屁股了！停下来啊啊！………啊啊啊呜呜呜咕咕咕！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6302',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了肛门绝顶，双目无神留下了大颗大颗的眼泪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6303',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%…已经…已经不行了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6305-6306',
        any: [
          /PRINTFORMW 「屁股、快要忍不住了！ 呜…要去了…啊啊啊啊啊…不，呜呜…不要啊啊…呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6306',
        any: [
          /PRINTFORMW 「屁股、快要忍不住了！ 呜…要去了…啊啊啊啊啊…不，呜呜…不要啊啊…呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6307',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了肛门绝顶。在呆滞了一会儿之后，泪水顺着脸庞流下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6307-6308',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%第一次达到了肛门绝顶。在呆滞了一会儿之后，泪水顺着脸庞流下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6309',
        any: [/CFLAG:227 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6309-6310',
        any: [/CFLAG:227 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6315',
        any: [/IF NOWEX:3 > 0 && CFLAG:228 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6317',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6318',
        any: [
          /PRINTFORMW 「淫、淫荡的胸部%UNICODE\(0x2661\) \*1%…啊啊…啊呜…啊呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6319',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部第一次因为刺激而高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6321-6322',
        any: [
          /PRINTFORMW 「啊啊啊…胸部…明明只是被玩弄了而已…呜…唔啊……呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6322',
        any: [
          /PRINTFORMW 「啊啊啊…胸部…明明只是被玩弄了而已…呜…唔啊……呜呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6323',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部第一次因为刺激而高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6326',
        any: [/PRINTFORMW 「胸部，高潮了么…这下贱的身体…呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6326-6327',
        any: [/PRINTFORMW 「胸部，高潮了么…这下贱的身体…呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6328',
        any: [/CFLAG:TARGET:228 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6328-6329',
        any: [/CFLAG:TARGET:228 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6334',
        any: [/A = UP:11 \+ UP:12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6335',
        any: [/IF TFLAG:3 == 1 && CFLAG:229 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6337',
        any: [/IF TFLAG:20 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6339',
        any: [/IF TALENT:TARGET:76 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6340',
        any: [/PRINTFORMW 「啊啊啊啊…这样…就能享受更多的调教了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6341',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%妖艳地笑着，脸上丝毫不见被破处的疼痛与失落。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6342',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…把第一次给了魔王大人也很高兴呢，请狠狠地调教我…开心得快要疯了呢…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6344',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6345',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的第一次…啊…很意外吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6346',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%不禁点了点头，%SAVESTR:TARGET%扑哧一声笑了出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6347',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%…想要…把自己的第一次…给喜欢的人啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6349',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6350',
        any: [
          /PRINTFORMW 「哇啊……好后悔…第一次给了…你这样的混蛋………！啊啊啊啊啊！呜啊啊啊啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6351',
        any: [
          /PRINTFORMW 看到自己双腿间流出的血液，%SAVESTR:TARGET%大哭起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6353-6354',
        any: [/PRINTFORMW 「痛！很痛啊…快、快拔出去…！ 这样的事情…不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6354',
        any: [/PRINTFORMW 「痛！很痛啊…快、快拔出去…！ 这样的事情…不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6355',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女之身被无情夺走，在%SAVESTR:PLAYER%面前低下了头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6355-6356',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的处女之身被无情夺走，在%SAVESTR:PLAYER%面前低下了头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6357-6358',
        any: [/;主人以外による处女喪失/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6360',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6361',
        any: [
          /PRINTFORMW 「啊哈哈…终于%SELF_CALL\(TARGET\)%也已经完成了“成人礼”了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6362',
        any: [/PRINTFORMW %SAVESTR:TARGET%对大腿间流出的血液熟视无睹。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6363',
        any: [/PRINTFORMW 「接下来…进行更多的调教吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6365',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6366',
        any: [/PRINTFORMW 「啊啊…这么多血………啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6367',
        any: [/PRINTFORMW %SAVESTR:TARGET%的大腿间流出了血液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6369',
        any: [
          /ELSEIF MARK:2 >= 2 && MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6370',
        any: [/PRINTFORMW 「早知道是这种结果…处女什么的还不如自己弄破呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6371',
        any: [/PRINTFORMW 大腿间还留着血迹的%SAVESTR:TARGET%自言自语起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6373-6374',
        any: [/PRINTFORMW 「啊啊…很痛的啊…停下！该死！…啊啊啊…这是…血么………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6374',
        any: [/PRINTFORMW 「啊啊…很痛的啊…停下！该死！…啊啊啊…这是…血么………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6375',
        any: [/PRINTFORMW 见到这意料之外的出血量%SAVESTR:TARGET%完全愣住了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6375-6376',
        any: [/PRINTFORMW 见到这意料之外的出血量%SAVESTR:TARGET%完全愣住了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6377-6378',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6378',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6378-6379',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6386',
        any: [/@KOJO_MESSAGE_MARKCNG_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6391-6392',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6394-6395',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6399',
        any: [/IF TFLAG:22 == 3 && CFLAG:297 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6401',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6402',
        any: [/PRINTFORMW 「啊啊啊…这就是所谓爱的痛楚吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6403',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边痛苦地呻吟着一边勉强地笑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6403-6404',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边痛苦地呻吟着一边勉强地笑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6405',
        any: [
          /PRINTFORMW 「啊呜…已、已经到极限了…%SELF_CALL\(TARGET\)%…呜呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6406',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这近乎极限的痛苦落泪不止………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6406-6407',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这近乎极限的痛苦落泪不止………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6408',
        any: [/CFLAG:297 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6408-6409',
        any: [/CFLAG:297 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6414',
        any: [/IF TFLAG:23 == 3 && CFLAG:298 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6416',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6417',
        any: [
          /PRINTFORMW 「啊啊啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…做着这、这样令人舒服的事情…已经快、快要不行了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6418',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的身体已经铭记了这种永生难忘的快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6418-6419',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的身体已经铭记了这种永生难忘的快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6420',
        any: [/PRINTFORMW 「啊啊啊…舒服到…骨髓里了呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6421',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的身体已经铭记了这种永生难忘的快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6421-6422',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%柔软的身体已经铭记了这种永生难忘的快乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6423',
        any: [/CFLAG:298 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6423-6424',
        any: [/CFLAG:298 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6429',
        any: [/IF TFLAG:24 == 3 && CFLAG:299 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6431',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6432',
        any: [
          /PRINTFORMW 「啊啊啊啊…从现在开始，想要做什么都行…我的…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6433',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身心已经完全屈服了，这之后无论是怎样的调教都不会违抗吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6433-6434',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身心已经完全屈服了，这之后无论是怎样的调教都不会违抗吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6435',
        any: [/PRINTFORMW 「已、已经不敢再违逆您了，主人…原谅我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6436',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%经过调教终于完全屈服了，这样之后下命令应该会顺利很多吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6436-6437',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%经过调教终于完全屈服了，这样之后下命令应该会顺利很多吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6438',
        any: [/CFLAG:299 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6438-6439',
        any: [/CFLAG:299 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6444',
        any: [/IF TFLAG:21 == 3 && CFLAG:300 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6446',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6447',
        any: [
          /PRINTFORMW 「啊呜…为什么%SELF_CALL\(TARGET\)%会遇到这种事情…呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6448',
        any: [
          /PRINTFORMW 似乎是做得太过火了，%SAVESTR:TARGET%的眼睛里仿佛燃烧着一种名为仇恨的火焰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6448-6449',
        any: [
          /PRINTFORMW 似乎是做得太过火了，%SAVESTR:TARGET%的眼睛里仿佛燃烧着一种名为仇恨的火焰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6450',
        any: [/PRINTFORMW 「啊呜…啊…呜呜…决、决不会忘记这样的屈辱…！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6451',
        any: [
          /PRINTFORMW 似乎是做得太过火了，%SAVESTR:TARGET%的眼睛里仿佛燃烧着一种名为仇恨的火焰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6451-6452',
        any: [
          /PRINTFORMW 似乎是做得太过火了，%SAVESTR:TARGET%的眼睛里仿佛燃烧着一种名为仇恨的火焰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6453',
        any: [/CFLAG:300 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6453-6454',
        any: [/CFLAG:300 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6458',
        any: [/@SELF_KOJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6462',
        any: [/IF TFLAG:13 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6464',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6465',
        any: [/PRINTFORMW %SAVESTR:TARGET%像坏掉的玩具般疯狂地自慰着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6467',
        any: [/ELSEIF Q == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6468',
        any: [
          /PRINTFORMW 「啊啊…和%SAVESTR:ASSI%的百合性交…好舒服呢…啊，呜…呼呼♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6469',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边回忆着与%SAVESTR:ASSI%的交合过程一边自慰起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6471',
        any: [/ELSEIF Q == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6472',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊！还是想跟狗狗做爱啊…想要狗狗的肉棒！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6473',
        any: [/PRINTFORMW %SAVESTR:TARGET%野兽般大声呼喊，继续着激烈地自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6473-6475',
        any: [/PRINTFORMW %SAVESTR:TARGET%野兽般大声呼喊，继续着激烈地自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6477',
        any: [/IF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6478',
        any: [
          /PRINTFORMW 「呜呼…噢…喔喔…%UNICODE\(0x2661\) \*1% 啊啊啊…更想做色色的事情了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想着%NAME:MASTER%，在充斥着淫媚叫声的房间里不断地自慰着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6480',
        any: [/CFLAG:261 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6482',
        any: [/ELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6483',
        any: [
          /PRINTFORMW 「魔王大人我………好想要……%UNICODE\(0x2661\) \*1% 嗯……嗯……噢喔～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6484',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上扭动着身躯结束了自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6485',
        any: [/CFLAG:261 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6487',
        any: [/ELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6488',
        any: [
          /PRINTFORMW 「已、已经…停不下来了…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…呜啊呜嗯…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6489',
        any: [
          /PRINTFORMW 自慰中毒的%SAVESTR:TARGET%的动作也不知道什么时候才能停下来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6490',
        any: [/CFLAG:261 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6492',
        any: [/ELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6493',
        any: [
          /PRINTFORMW 「哈啊哈啊…为什么，为什么%SELF_CALL\(TARGET\)%连这种事情都忍耐不住…呜…呜呼」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6494',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸的不甘心，但手上的动作却越来越激烈了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6495',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6495-6496',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6495-6497',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6495-6498',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6503',
        any: [/IF TFLAG:13 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6505',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6506',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%玩弄着已经坏掉的%SAVESTR:TARGET%享受其中颓废的女同之乐………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6508',
        any: [/ELSEIF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6509',
        any: [
          /PRINTFORMW 「哈…啊啊…女人之间也可以性交呢…这样做爱好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6510',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%像交尾的蛞蝓般扭在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6511',
        any: [/CFLAG:262 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6513',
        any: [/ELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6514',
        any: [
          /PRINTFORMW 「啊啊…啊呼…这件事…那个地方可是秘密哦！啊？…啊啊…呼…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6515',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边用秘密作为借口，一边用手在%SAVESTR:ASSI%的敏感部位抚摸。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6516',
        any: [
          /PRINTFORM %SAVESTR:ASSI%苦笑着和%SAVESTR:TARGET%以女人间特有的方式纠缠在一起，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6517',
        any: [/IF TIME == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6518',
        any: [/PRINTFORMW 直到黄昏………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6518-6519',
        any: [/PRINTFORMW 直到黄昏………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6520',
        any: [/PRINTFORMW 直到夜幕渐深………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6520-6521',
        any: [/PRINTFORMW 直到夜幕渐深………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6522',
        any: [/CFLAG:262 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6524',
        any: [/ELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6525',
        any: [
          /PRINTFORMW 「啊啊啊…原来跟女人做爱这么舒服…到了这里之后才发现呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6526',
        any: [
          /PRINTFORM 尝到百合滋味的%SAVESTR:TARGET%嬉笑着和%SAVESTR:ASSI%纠缠着，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6527',
        any: [/IF TIME == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6528',
        any: [/PRINTFORMW 直到黄昏………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6528-6529',
        any: [/PRINTFORMW 直到黄昏………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6530',
        any: [/PRINTFORMW 直到夜幕渐深………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6530-6531',
        any: [/PRINTFORMW 直到夜幕渐深………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6532',
        any: [/CFLAG:262 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6534',
        any: [/ELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6535',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%才不喜欢百合什么的………呜…啊啊啊…还、还要…继续啊…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6536',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%舌尖湿润，温柔地吻着%SAVESTR:TARGET%的脸庞………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6537',
        any: [/CFLAG:262 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6539',
        any: [/ELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6540',
        any: [
          /PRINTFORMW 「停、停下…%SELF_CALL\(TARGET\)%对这种事情没有兴趣啊…啊啊…要、要去了…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6541',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%摇着头抗拒着，但仍被%SAVESTR:ASSI%玩弄于手指间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6542',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6542-6543',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6542-6544',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6549',
        any: [/IF TFLAG:13 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6551',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6552',
        any: [/PRINTFORMW 「啊哈…精液的味道…呜啊呜嗯嗯…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6553',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着幼儿般放荡的表情，继续着扫除式的口交………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6555',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6556',
        any: [
          /PRINTFORMW 「啊…呜呜…呜呜%UNICODE\(0x2661\) \*1%…就这样接受%SELF_CALL\(TARGET\)%的侵犯吧…一大早就能品尝到浓厚的精液的感觉…难以忍受啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6557',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一口将整个阴茎吞进嘴里用心舔舐，一边翻身骑在了你身上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6558',
        any: [
          /PRINTFORMW %NAME:MASTER%在这种诱惑下起身轻松把%SAVESTR:TARGET%重新压到了身下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6559',
        any: [
          /PRINTFORMW 「哼…不行么？ 真是出乎预料…那以后要记得主动到%SELF_CALL\(TARGET\)%的屋子里来哦…喂？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6560',
        any: [/CFLAG:263 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6562',
        any: [/ELSEIF TALENT:85 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6563',
        any: [
          /PRINTFORMW 「啊呜咿%UNICODE\(0x2661\) \*1%…要开始了…呜呜呜…啊啊、早上好魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6564',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头精心“清扫”着刚刚射精的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6565',
        any: [
          /PRINTFORMW 「啊啊…不愧是魔王大人的肉棒，一整天都元气满满的，%SELF_CALL\(TARGET\)%忍不住要多弄几次了呢～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6566',
        any: [/PRINTFORMW %SAVESTR:TARGET%握着手里的阴茎嫣然一笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6567',
        any: [/CFLAG:263 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6569',
        any: [/ELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6570',
        any: [
          /PRINTFORMW 「呜呜…唔嗯…啊呜…哈哈…唔啊♪………真是诱人的肉棒，该进行早上的调教了哦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6571',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%周到地把肉棒吮吸得干干净净后轻轻叹息一声，转身走出了房间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6572',
        any: [/CFLAG:263 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6574',
        any: [/ELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6575',
        any: [
          /PRINTFORMW 「啊哈…哈…一大早就这么精神…再、再来一次就够了吧…该去调教了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6576',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦了擦满是精液的嘴角离开了屋子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6577',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6577-6578',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6577-6579',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6584',
        any: [/IF TFLAG:13 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6586',
        any: [/IF TALENT:9 == 1 && \(CFLAG:264 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6587',
        any: [
          /PRINTFORMW 即使%SAVESTR:TARGET%已经被玩坏了也无法忘怀做爱的快感啊………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6588',
        any: [/CFLAG:264 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6590',
        any: [/ELSEIF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6591',
        any: [
          /PRINTFORMW 已经完全被开发了的%SAVESTR:TARGET%的阴道在%SAVESTR:PLAYER%阴茎的不断抽插下，产生了难以言喻的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6592',
        any: [
          /PRINTFORMW 「啊啊啊…能像这样抱着…%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET\)%好幸福！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6594',
        any: [/PRINTFORMW %SAVESTR:TARGET%在\{S\}回中出后满足了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6595',
        any: [/CFLAG:264 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6597',
        any: [/ELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6598',
        any: [/PRINTFORMW 「啊啊…哈啊…啊啊…抱紧我…抱紧点…啊…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6599',
        any: [
          /PRINTFORMW 化身为一条母狗的%SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%不愿放开………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6600',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6600-6601',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6600-6602',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6607',
        any: [/IF TFLAG:13 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6609',
        any: [/IF TALENT:9 == 1 && \(CFLAG:265 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6610',
        any: [/PRINTFORMW 「啊啊啊…啊啊…想要大肉棒…哈哈………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6611',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被欲望控制，像个梦游症病人般进入了%NAME:MASTER%的屋子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6612',
        any: [/CFLAG:265 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6613',
        any: [/ELSEIF CFLAG:265 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6614',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%觉得…監禁屋的锁也不过如此嘛………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6615',
        any: [/PRINTFORMW %SAVESTR:TARGET%拉着%NAME:MASTER%上了床。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6616',
        any: [
          /PRINTFORMW 「像是…嗯…这样的话，无论什么时候袭击都是可行的吧？啊哈哈哈♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6617',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6617-6618',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6617-6619',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6624',
        any: [/IF TFLAG:13 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6626',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6627',
        any: [
          /PRINTFORMW 「啊啊啊啊…终于出来了…%SELF_CALL\(TARGET\)%已经自由了…哈哈哈哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6628',
        any: [
          /PRINTFORMW 见到这一幕来取货的奴隶商人不禁皱了皱眉头，%NAME:MASTER%装作什么也不知道的样子签下了契约书………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6630',
        any: [/ELSEIF TALENT:85 && MARK:3 < 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6631',
        any: [
          /PRINTFORMW 「背叛和被背叛什么的也不是第一次了…可还是没想到魔王大人也………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6632',
        any: [/PRINTFORMW %SAVESTR:TARGET%痛快地坐上了马车。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6633',
        any: [/PRINTFORMW 没有上手铐和脚镣，一言不发地被送向远方………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6635',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6636',
        any: [/PRINTFORMW 「有件事给我记住…我一定会杀了你…一定要杀了你！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6637',
        any: [
          /PRINTFORMW 暴怒的%SAVESTR:TARGET%最终被绳子捆起来，送到了马车上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6639',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6640',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的小穴…一旦玩厌了…就被当成已经厌倦了的玩具般丢掉了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6641',
        any: [
          /PRINTFORMW 流着泪说着这样的话，%SAVESTR:TARGET%坐上马车，被卖往远方………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6643-6644',
        any: [
          /PRINTFORMW 「输给魔王被俘，性命就由不得自己掌控了…这种说法哪有道理啊！该死！%SELF_CALL\(TARGET\)%不想被卖啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6644',
        any: [
          /PRINTFORMW 「输给魔王被俘，性命就由不得自己掌控了…这种说法哪有道理啊！该死！%SELF_CALL\(TARGET\)%不想被卖啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6645',
        any: [/PRINTFORMW %SAVESTR:TARGET%哭叫着被绑上了马车………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6645-6646',
        any: [/PRINTFORMW %SAVESTR:TARGET%哭叫着被绑上了马车………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6647',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6649',
        any: [/CALL SELL_MATURO_K0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6649-6650',
        any: [/CALL SELL_MATURO_K0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6656',
        any: [/IF TFLAG:13 == 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6657',
        any: [/IF CFLAG:271 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6659',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6660',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把%SELF_CALL\(TARGET\)%整个吃掉吧…啊哈哈哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6661',
        any: [
          /PRINTFORMW 以%SAVESTR:TARGET%的精神状况已经无法认清怀孕的事实了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6663',
        any: [/ELSEIF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6665',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6666',
        any: [
          /PRINTFORMW 「魔王大人快来摸摸哟…%SELF_CALL\(TARGET\)%的肚子里已经有魔王大人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6667',
        any: [/PRINTFORMW %SAVESTR:TARGET%出神地用手摩挲着小腹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6669',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6670',
        any: [
          /PRINTFORMW 「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6671',
        any: [/PRINTFORMW %SAVESTR:TARGET%摸着下腹部，用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6671-6672',
        any: [/PRINTFORMW %SAVESTR:TARGET%摸着下腹部，用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6673',
        any: [
          /PRINTFORMW 「难道…是…魔王的孩子…%SELF_CALL\(TARGET\)%肚子里的那东西…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6674',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这巨大的打击不禁潸然泪下………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6674-6675',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这巨大的打击不禁潸然泪下………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6677',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6678',
        any: [/PRINTFORMW 「难道是有了…%CSTR:2%的孩子吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6679',
        any: [/PRINTFORMW 意外的怀孕让%SAVESTR:TARGET%的脸色十分难看………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6681',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6682',
        any: [/PRINTFORMW 「难道是有了…%CSTR:2%的孩子吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6683',
        any: [/PRINTFORMW 意外的怀孕让%SAVESTR:TARGET%的脸色十分难看………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6685',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6686',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6687',
        any: [/PRINTFORMW 「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6687-6688',
        any: [/PRINTFORMW 「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6689',
        any: [
          /PRINTFORMW 「唔啊啊…野狗的孩子孕育在%SELF_CALL\(TARGET\)%的肚子里，这是什么鬼东西啊………啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6690',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的身体失陷于兽类而流下了懊恼的泪水………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6690-6691',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的身体失陷于兽类而流下了懊恼的泪水………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6693',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6694',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%怀了狂王殿下的…真的…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6696-6697',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6697',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6697-6698',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6699',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6701-6702',
        any: [/;崩坏してしまった場合/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6703',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6704',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%的肚子里好像有什么东西呢…啊啊啊，这家伙大概会把%SELF_CALL\(TARGET\)%整个吃掉吧…啊哈哈哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6705',
        any: [
          /PRINTFORMW 以%SAVESTR:TARGET%的精神状况已经无法认清怀孕的事实了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6707',
        any: [/ELSEIF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6709',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6710',
        any: [
          /PRINTFORMW 「魔王大人快来摸摸哟…%SELF_CALL\(TARGET\)%的肚子里已经有魔王大人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6711',
        any: [/PRINTFORMW %SAVESTR:TARGET%出神地用手摩挲着小腹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6713',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6714',
        any: [
          /PRINTFORMW 「啊啊…肚子里已经怀有魔王大人的孩子了…这样的情况下被魔王大人侵犯一定会很舒服吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6715',
        any: [/PRINTFORMW %SAVESTR:TARGET%摸着下腹部，用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6715-6716',
        any: [/PRINTFORMW %SAVESTR:TARGET%摸着下腹部，用舌头舔了舔嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6717',
        any: [
          /PRINTFORMW 「难道…是…魔王的孩子…%SELF_CALL\(TARGET\)%肚子里的那东西…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6718',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这巨大的打击不禁潸然泪下………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6718-6719',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为这巨大的打击不禁潸然泪下………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6721',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6722',
        any: [/PRINTFORMW 「难道是有了…%CSTR:2%的孩子吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6723',
        any: [/PRINTFORMW 意外的怀孕让%SAVESTR:TARGET%的脸色十分难看………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6725',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6726',
        any: [/PRINTFORMW 「难道是有了…%CSTR:2%的孩子吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6727',
        any: [/PRINTFORMW 意外的怀孕让%SAVESTR:TARGET%的脸色十分难看………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6729',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6730',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6731',
        any: [/PRINTFORMW 「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6731-6732',
        any: [/PRINTFORMW 「啊哈哈哈！竟然生下了狗先生的孩子，真是幸运啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6733',
        any: [
          /PRINTFORMW 「唔啊啊…野狗的孩子孕育在%SELF_CALL\(TARGET\)%的肚子里，这是什么鬼东西啊………啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6734',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的身体失陷于兽类而流下了懊恼的泪水………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6734-6735',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的身体失陷于兽类而流下了懊恼的泪水………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6737',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6738',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%怀了狂王殿下的…真的…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6740-6741',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6741',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6741-6742',
        any: [
          /PRINTFORMW 「啊啊…%SELF_CALL\(TARGET\)%肚子里怀的到底是谁的孩子啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6743',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6743-6744',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6743-6745',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6751',
        any: [/IF TFLAG:13 == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6752',
        any: [/IF CFLAG:272 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6754',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6755',
        any: [
          /PRINTFORMW 「孩、孩子出生了…%SELF_CALL\(TARGET\)%的可爱的小怪物…♪ 哈哈哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6756',
        any: [
          /PRINTFORMW 生产的过程平安地结束了，然而%SAVESTR:TARGET%崩坏的精神已经没救了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6758',
        any: [/ELSEIF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6760',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6761',
        any: [
          /PRINTFORMW 「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6762',
        any: [/PRINTFORMW %SAVESTR:TARGET%哄着怀里被布包裹的魔物婴儿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6764',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6765',
        any: [
          /PRINTFORMW 「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6766',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着些许失神的表情抚摸着怀中的孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6766-6767',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着些许失神的表情抚摸着怀中的孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6768',
        any: [/PRINTFORMW 「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6769',
        any: [/PRINTFORMW %SAVESTR:TARGET%用细小的声音嘟哝着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6769-6770',
        any: [/PRINTFORMW %SAVESTR:TARGET%用细小的声音嘟哝着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6772',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6773',
        any: [
          /PRINTFORMW 「哈哈…%CSTR:2%的孩子已经生下来了呢…孩子的哭声元气十足啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6774',
        any: [/PRINTFORMW %SAVESTR:TARGET%心满意足地点了点头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6776',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6777',
        any: [
          /PRINTFORMW 「哈哈…%CSTR:2%的孩子已经生下来了呢…孩子的哭声元气十足啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6778',
        any: [/PRINTFORMW %SAVESTR:TARGET%心满意足地点了点头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6780',
        any: [/ELSEIF CFLAG:102 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6781',
        any: [/PRINTFORMW 「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6783',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6784',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6785',
        any: [
          /PRINTFORMW 「啊啊啊，如此元气十足的哭声，即使是%SELF_CALL\(TARGET\)%和狗的孩子也让人感觉动力十足呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6785-6786',
        any: [
          /PRINTFORMW 「啊啊啊，如此元气十足的哭声，即使是%SELF_CALL\(TARGET\)%和狗的孩子也让人感觉动力十足呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6787',
        any: [
          /PRINTFORMW 「呜呜呜…从哭声里就听得出来…%SELF_CALL\(TARGET\)%和狗的孩子已经生出来了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6787-6788',
        any: [
          /PRINTFORMW 「呜呜呜…从哭声里就听得出来…%SELF_CALL\(TARGET\)%和狗的孩子已经生出来了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6790',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6791',
        any: [/PRINTFORMW 「狂王殿下和…下贱的%SELF_CALL\(TARGET\)%的孩子…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6793-6794',
        any: [
          /PRINTFORMW 「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6794',
        any: [
          /PRINTFORMW 「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6795',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全无法接受这个事实，看都不想看这孩子一眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6795-6796',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全无法接受这个事实，看都不想看这孩子一眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6797',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6797-6798',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6800',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6801',
        any: [
          /PRINTFORMW 「孩、孩子出生了…%SELF_CALL\(TARGET\)%的可爱的小怪物…♪ 哈哈哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6802',
        any: [
          /PRINTFORMW 生产的过程平安地结束了，然而%SAVESTR:TARGET%崩坏的精神已经没救了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6804',
        any: [/ELSEIF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6806',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6807',
        any: [
          /PRINTFORMW 「魔王大人的孩子哟…终于…这孩子的角和尾巴跟大人一模一样呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6808',
        any: [/PRINTFORMW %SAVESTR:TARGET%哄着怀里被布包裹的魔物婴儿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6810',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6811',
        any: [
          /PRINTFORMW 「呜呼呼…跟魔王大人一样喜欢袭击漂亮大姐姐的样子呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6812',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着些许失神的表情抚摸着怀中的孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6812-6813',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着些许失神的表情抚摸着怀中的孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6814',
        any: [/PRINTFORMW 「啊啊啊…已经生出了魔王的孩子呢…没法…回头了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6815',
        any: [/PRINTFORMW %SAVESTR:TARGET%用细小的声音嘟哝着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6815-6816',
        any: [/PRINTFORMW %SAVESTR:TARGET%用细小的声音嘟哝着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6818',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6819',
        any: [
          /PRINTFORMW 「哈哈…%CSTR:2%的孩子已经生下来了呢…孩子的哭声元气十足啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6820',
        any: [/PRINTFORMW %SAVESTR:TARGET%心满意足地点了点头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6822',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6823',
        any: [
          /PRINTFORMW 「哈哈…%CSTR:2%的孩子已经生下来了呢…孩子的哭声元气十足啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6824',
        any: [/PRINTFORMW %SAVESTR:TARGET%心满意足地点了点头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6826',
        any: [/ELSEIF CFLAG:102 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6827',
        any: [/PRINTFORMW 「哈啊，孩子出生了…啊啊啊啊…搞什么啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6829',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6830',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6831',
        any: [
          /PRINTFORMW 「啊啊啊、如此元气十足的哭声，即使是%SELF_CALL\(TARGET\)%和狗的孩子也让人感觉动力十足呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6831-6832',
        any: [
          /PRINTFORMW 「啊啊啊、如此元气十足的哭声，即使是%SELF_CALL\(TARGET\)%和狗的孩子也让人感觉动力十足呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6833',
        any: [
          /PRINTFORMW 「呜呜呜…从哭声里就听得出来…%SELF_CALL\(TARGET\)%和狗的孩子已经生出来了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6833-6834',
        any: [
          /PRINTFORMW 「呜呜呜…从哭声里就听得出来…%SELF_CALL\(TARGET\)%和狗的孩子已经生出来了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6836',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6837',
        any: [/PRINTFORMW 「狂王殿下和…下贱的%SELF_CALL\(TARGET\)%的孩子…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6839-6840',
        any: [
          /PRINTFORMW 「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6840',
        any: [
          /PRINTFORMW 「啊啊…哈啊…那样的东西我都觉得肮脏啊！快扔掉好了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6841',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全无法接受这个事实，看都不想看这孩子一眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6841-6842',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全无法接受这个事实，看都不想看这孩子一眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6843',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6843-6844',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6843-6845',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6850',
        any: [/IF TFLAG:13 == 13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6852',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6854',
        any: [/IF TALENT:153/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6855',
        any: [
          /PRINTFORMW 「哈…这样下去长大了的%SELF_CALL\(TARGET\)%也会恶贯满盈吗～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6856',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着这因为将要生产而膨大的肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6858',
        any: [/ELSEIF TALENT:154/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6859',
        any: [
          /PRINTFORMW 「什么啊…%SELF_CALL\(TARGET\)%给孩子喝牛奶这种事很奇怪吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6860',
        any: [/PRINTFORMW %SAVESTR:TARGET%漫不经心地哄着孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6860-6861',
        any: [/PRINTFORMW %SAVESTR:TARGET%漫不经心地哄着孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6862-6863',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6863',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6863-6864',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6869',
        any: [/IF TFLAG:13 == 14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6871',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6872',
        any: [
          /PRINTFORMW 「大家…没什么好哭的，孩子走了反而更清静了不是么…呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6872-6873',
        any: [
          /PRINTFORMW 「大家…没什么好哭的，孩子走了反而更清静了不是么…呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6874',
        any: [/CFLAG:274 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6874-6875',
        any: [/CFLAG:274 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6881',
        any: [/IF TFLAG:13 == 999/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6883',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6884',
        any: [/PRINTFORMW 明明，还还有值得留恋的东西啊…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6886-6887',
        any: [/PRINTFORMW 就、就到此为止了吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6887',
        any: [/PRINTFORMW 就、就到此为止了吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6887-6888',
        any: [/PRINTFORMW 就、就到此为止了吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6887-6889',
        any: [/PRINTFORMW 就、就到此为止了吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6894',
        any: [/IF TFLAG:13 == 998/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6896',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6897',
        any: [/PRINTFORMW 不能…陪你走到最后了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6899-6900',
        any: [/PRINTFORMW 无法抵抗死神的召唤…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6900',
        any: [/PRINTFORMW 无法抵抗死神的召唤…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6900-6901',
        any: [/PRINTFORMW 无法抵抗死神的召唤…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6900-6902',
        any: [/PRINTFORMW 无法抵抗死神的召唤…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6907',
        any: [/TFLAG:13 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6907-6909',
        any: [/TFLAG:13 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6940',
        any: [/@DUNGEON_RYOUZYOKU_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6945',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6947',
        any: [
          /PRINTFORMW 「这不可能…不可能吧…%SELF_CALL\(TARGET\)%的…处女之身…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6949',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6952',
        any: [/PRINTFORMW 「不可能…不…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6954-6955',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6955',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6958',
        any: [/PRINTFORMW 「放过我！请您放过我！拜、拜托了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6962',
        any: [/PRINTFORMW 「可以的话享用我的屁股吧！请…拜托了…帮帮我…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6966',
        any: [/PRINTFORMW 「需要的话请使用我的嘴巴吧！我会尽力的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6968',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6972',
        any: [/PRINTFORMW 「一定会杀了你的！总有一天会…会…杀死你…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6974',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6977',
        any: [/PRINTFORMW 「去死吧！都死掉啊…死掉就好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6977-6979',
        any: [/PRINTFORMW 「去死吧！都死掉啊…死掉就好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6982',
        any: [/PRINTFORMW 「嘶…该死！！不想死啊！不想就这么死啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6982-6984',
        any: [/PRINTFORMW 「嘶…该死！！不想死啊！不想就这么死啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6985-6987',
        any: [/PRINTFORMW 「不可能的…被这样的下等生物…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6987',
        any: [/PRINTFORMW 「不可能的…被这样的下等生物…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6989',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6992',
        any: [/PRINTFORMW 「不可能…不…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6994-6995',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6995',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '6998',
        any: [
          /PRINTFORMW 「饶我一命…求你了！放过我吧！想怎么使用%SELF_CALL\(TARGET\)%的身体都行！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7002',
        any: [
          /PRINTFORMW 「我的肛交经验很丰富！就算玩坏我身上所有的洞也好…拜托了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7006',
        any: [/PRINTFORMW 「会努力用嘴服侍您的…拜托了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7008',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7012',
        any: [/PRINTFORMW 「一定会杀了你的！　总有一天会…会…杀死你…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7014',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7017',
        any: [/PRINTFORMW 「去死吧！都死掉啊…死掉就好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7017-7019',
        any: [/PRINTFORMW 「去死吧！都死掉啊…死掉就好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7022',
        any: [/PRINTFORMW 「嘶…该死！！不想死啊！不想就这么死啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7022-7024',
        any: [/PRINTFORMW 「嘶…该死！！不想死啊！不想就这么死啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7022-7025',
        any: [/PRINTFORMW 「嘶…该死！！不想死啊！不想就这么死啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7027-7030',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7030',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7035',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7037',
        any: [/PRINTFORMW 「呜呜呜…不要…唔啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7039',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7042',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7042-7044',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7045-7047',
        any: [/;アナルを弄られすぎた感想/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7048',
        any: [/IF EXP:1 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7049',
        any: [/PRINTFORMW 「屁股…的感觉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7050',
        any: [/PRINTFORMW 「呜呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7050-7051',
        any: [/PRINTFORMW 「呜呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7055',
        any: [/PRINTFORMW 「别让我再舔了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7059',
        any: [/PRINTFORMW 「咕啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7059-7060',
        any: [/PRINTFORMW 「咕啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7062',
        any: [/PRINTFORMW 「呜…呼啊…呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7064',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7067',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7067-7069',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7070-7072',
        any: [/;膣を苛められすぎた感想/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7073',
        any: [/IF EXP:0 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7074',
        any: [/PRINTFORMW 「有点…太过分了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7075',
        any: [/PRINTFORMW 「要…坏掉了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7075-7076',
        any: [/PRINTFORMW 「要…坏掉了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7079',
        any: [/IF EXP:1 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7080',
        any: [/PRINTFORMW 「屁股…的感觉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7081',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7081-7082',
        any: [/PRINTFORMW 「呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7086',
        any: [/PRINTFORMW 「别让我再舔了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7090',
        any: [/PRINTFORMW 「咕啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7090-7091',
        any: [/PRINTFORMW 「咕啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7093-7095',
        any: [/@BENKI_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7095',
        any: [/@BENKI_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7100',
        any: [/IF FLAG:62 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7103',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7104',
        any: [
          /PRINTFORMW 「嘿、肉便器服务呢。连对这么恶心的生物也要『完全服从』什么的了、好好安心吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7105',
        any: [
          /PRINTFORMW 「先说好咯%SELF_CALL\(TARGET\)%最讨厌像你们这样又丑又臭的家伙了。甚至要吐了的哦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7106',
        any: [
          /PRINTFORMW 「但是『完全服从』的时候也是会好好做好口交、好好舔干净肉棒上的东西的、就别介意啦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7108',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7109',
        any: [
          /PRINTFORMW 「愚蠢的家伙们，能得到我这样的便器可是你们的荣幸啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7111',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7112',
        any: [/PRINTFORMW 「对不起！对不起！对…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7114',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7115',
        any: [/PRINTFORMW 「还做得不够好…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7117-7118',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7118',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7118-7119',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7120',
        any: [/ELSEIF FLAG:62 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7123',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7124',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%是个喜欢作肉便器的变态女人哟哟哟！！哇啊啊啊啊♪♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7126',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7127',
        any: [/PRINTFORMW 「请让我为您服务…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7129',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7130',
        any: [/PRINTFORMW 「请让我为您服务…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7132-7133',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7133',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7133-7134',
        any: [/PRINTFORMW 「哎呀！救、救命…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7135',
        any: [/ELSEIF FLAG:62 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7138',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7139',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7141',
        any: [/ELSEIF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7142',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%是头母猪的说！一头下贱的除了被干以外没有任何价值的母猪！哇啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7144',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7145',
        any: [/PRINTFORMW 「交尾么…啊啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7147',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7148',
        any: [/PRINTFORMW 「请和我交尾…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7150-7151',
        any: [/PRINTFORMW 「这也太疯狂了…开玩笑吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7151',
        any: [/PRINTFORMW 「这也太疯狂了…开玩笑吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7151-7152',
        any: [/PRINTFORMW 「这也太疯狂了…开玩笑吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7153',
        any: [/ELSEIF  FLAG:62 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7156',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7157',
        any: [
          /PRINTFORMW 「好嘞、明白咯%UNICODE\(0x2661\) \*1%　快把前后两个穴都操烂吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7158',
        any: [
          /PRINTFORMW 「真是的、真操坏了可怎么办啊……嘛、就算真操坏了、还被催眠着就没法抵抗了啦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7159',
        any: [
          /PRINTFORMW 「这样乱来说不定还会这么怀上谁的孩子呢、人生真是完蛋了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7161',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7162',
        any: [
          /PRINTFORMW 「请再用力一点！%SELF_CALL\(TARGET\)%的小穴就是为了肉棒而生的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7164',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7165',
        any: [/PRINTFORMW 「唔啊，好…痛苦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7167',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7168',
        any: [/PRINTFORMW 「前面和后面都可以使用…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7170-7171',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7171',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7171-7172',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7173',
        any: [/ELSEIF  FLAG:62 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7176',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7177',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%决定开放自己的小穴哦，来尽情地享用吧～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7179',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7180',
        any: [/PRINTFORMW 「那里…呜啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7182',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7183',
        any: [/PRINTFORMW 「请享用我的小穴…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7185-7186',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7186',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7186-7187',
        any: [/PRINTFORMW 「救救我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7188',
        any: [/ELSEIF  FLAG:62 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7191',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7192',
        any: [
          /PRINTFORMW 「菊花肉便器♪　%SELF_CALL\(TARGET\)%的肛门就是最好的肉便器♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7194',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7195',
        any: [/PRINTFORMW 「屁股感觉好…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7197',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7198',
        any: [/PRINTFORMW 「请享用我的屁股…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7200-7201',
        any: [/PRINTFORMW 「不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7201',
        any: [/PRINTFORMW 「不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7201-7202',
        any: [/PRINTFORMW 「不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7203',
        any: [/ELSEIF  FLAG:62 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7206',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7207',
        any: [/PRINTFORMW 「用嘴免费！　用嘴巴就不用钱！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7209',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7210',
        any: [/PRINTFORMW 「给我肉棒……肉棒」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7212',
        any: [/ELSEIF ABL:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7213',
        any: [/PRINTFORMW 「让我奉仕肉棒把……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7215-7216',
        any: [/PRINTFORMW 「呕……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7216',
        any: [/PRINTFORMW 「呕……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7216-7217',
        any: [/PRINTFORMW 「呕……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7218',
        any: [/ELSEIF  FLAG:62 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7221',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7222',
        any: [
          /PRINTFORMW 「大家久等了！　家畜%SAVESTR:TARGET%哦。今天也要看着%SELF_CALL\(TARGET\)%的交配好好撸哦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7224',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7225',
        any: [
          /PRINTFORMW 「今天也要好好地把%SELF_CALL\(TARGET\)%的羞耻的模样……尽收眼底哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7227',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7228',
        any: [
          /PRINTFORMW 「今天也要好好地把%SELF_CALL\(TARGET\)%的羞耻的模样……尽收眼底哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7230',
        any: [/ELSEIF ABL:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7231',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%就在这里了啊……不看可不行哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7233-7234',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%就在这里了啊……不看可不行哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7234',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%就在这里了啊……不看可不行哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7234-7235',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%就在这里了啊……不看可不行哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7236',
        any: [/ELSEIF  FLAG:62 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7239',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7240',
        any: [
          /PRINTFORMW 「今天也十分感谢♪　%SAVESTR:TARGET%哦。今天%SELF_CALL\(TARGET\)%，叫了妓女姐姐来哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7241',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%们的鱼水之欢，好好看着哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7243',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7244',
        any: [
          /PRINTFORMW 「今天也十分感谢♪　%SAVESTR:TARGET%哦。今日%SELF_CALL\(TARGET\)%，叫了妓女姐姐来哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7245',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%们的鱼水之欢，好好看着哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7247',
        any: [/ELSEIF ABL:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7248',
        any: [
          /PRINTFORMW 「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7250-7251',
        any: [
          /PRINTFORMW 「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7251',
        any: [
          /PRINTFORMW 「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7251-7252',
        any: [
          /PRINTFORMW 「今天啊，叫了妓女姐姐来。之后就要在房间里啪啪啪了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7253',
        any: [/ELSEIF  FLAG:62 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7256',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7257',
        any: [
          /PRINTFORMW 「今天也十分感谢♪　%SAVESTR:TARGET%哦。今日的%SELF_CALL\(TARGET\)%，带着水晶球到外面来了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7258',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%，现在开始全裸出镜，看着哦……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7260',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7261',
        any: [
          /PRINTFORMW 「今天也十分感谢♪　%SAVESTR:TARGET%哦。今日的%SELF_CALL\(TARGET\)%，带着水晶球到外面来了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7262',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%，现在开始全裸出镜，看着哦……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7264',
        any: [/ELSEIF ABL:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7265',
        any: [/PRINTFORMW 「今天，就在地下城里全裸瞎晃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7267-7268',
        any: [/PRINTFORMW 「今天，就在地下城里全裸瞎晃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7268',
        any: [/PRINTFORMW 「今天，就在地下城里全裸瞎晃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7268-7269',
        any: [/PRINTFORMW 「今天，就在地下城里全裸瞎晃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7268-7270',
        any: [/PRINTFORMW 「今天，就在地下城里全裸瞎晃……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7272-7275',
        any: [/@DUNGEON_VICTORY_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7275',
        any: [/@DUNGEON_VICTORY_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7280',
        any: [/PRINTFORMW 「嘁，明明是个废物却表现的这么嚣张」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7282',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7285',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7286',
        any: [/PRINTFORMW 「消失吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7287',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7288',
        any: [/PRINTFORMW 「哈哈！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7288-7289',
        any: [/PRINTFORMW 「哈哈！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7290',
        any: [/PRINTFORMW 「去死！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7290-7291',
        any: [/PRINTFORMW 「去死！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7293-7294',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7294',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7297',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7298',
        any: [/PRINTFORMW 「只有这种程度吗～？弱者。就赐你一死吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7299',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7300',
        any: [/PRINTFORMW 「哈哈！丑陋的生物！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7301',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7302',
        any: [/PRINTFORMW 「哈哈！愚蠢的下等生物！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7302-7303',
        any: [/PRINTFORMW 「哈哈！愚蠢的下等生物！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7304',
        any: [/PRINTFORMW 「这就是你的末路」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7304-7305',
        any: [/PRINTFORMW 「这就是你的末路」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7307',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7310',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7311',
        any: [/PRINTFORMW 「差不多就好了啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7312',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7313',
        any: [/PRINTFORMW 「简直不敢相信……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7314',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7315',
        any: [/PRINTFORMW 「区区废物还想蹬鼻子上脸……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7315-7316',
        any: [/PRINTFORMW 「区区废物还想蹬鼻子上脸……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7317',
        any: [/PRINTFORMW 「吓了一跳呢，原来这么弱啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7317-7318',
        any: [/PRINTFORMW 「吓了一跳呢，原来这么弱啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7317-7320',
        any: [/PRINTFORMW 「吓了一跳呢，原来这么弱啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7321-7323',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7324',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7325',
        any: [/PRINTFORMW 「呼，清理完垃圾清爽很多呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7326',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7327',
        any: [/PRINTFORMW 「废物！这不就把鞋子弄脏了么！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7328',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7329',
        any: [/PRINTFORMW 「这鲜血如同其自身一样肮脏」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7329-7330',
        any: [/PRINTFORMW 「这鲜血如同其自身一样肮脏」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7331',
        any: [/PRINTFORMW 「肮脏！庸俗！无可救药的渣滓们啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7331-7332',
        any: [/PRINTFORMW 「肮脏！庸俗！无可救药的渣滓们啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7334-7336',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7336',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7338',
        any: [/PRINTFORMW （有点不妙啊…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7338-7339',
        any: [/PRINTFORMW （有点不妙啊…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7341',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%已经天下无敌了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7341-7342',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%已经天下无敌了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7341-7344',
        any: [/PRINTFORMW 「%SELF_CALL\(TARGET\)%已经天下无敌了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7349',
        any: [/@DUNGEON_ATTACK_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7354',
        any: [/IF CFLAG:1 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7356',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7359',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7361-7362',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7362',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7365',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7366',
        any: [/PRINTFORMW 「死吧！渣滓！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7367',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7368',
        any: [/PRINTFORMW 「见死神去吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7368-7369',
        any: [/PRINTFORMW 「见死神去吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7370',
        any: [/PRINTFORMW 「肮脏的垃圾！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7370-7371',
        any: [/PRINTFORMW 「肮脏的垃圾！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7373',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7376',
        any: [/PRINTFORMW 「这是什么……去死啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7376-7378',
        any: [/PRINTFORMW 「这是什么……去死啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7379-7381',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7382',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7383',
        any: [/PRINTFORMW 「从%SELF_CALL\(TARGET\)%面前消失吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7384',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7385',
        any: [/PRINTFORMW 「看到我还不逃走吗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7385-7386',
        any: [/PRINTFORMW 「看到我还不逃走吗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7387',
        any: [/PRINTFORMW 「真是丑陋。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7387-7388',
        any: [/PRINTFORMW 「真是丑陋。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7387-7390',
        any: [/PRINTFORMW 「真是丑陋。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7391-7393',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7393',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7396',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7398-7399',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7399',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| TALENT:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7402',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7403',
        any: [/PRINTFORMW 「啊啊，到此为止了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7404',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7405',
        any: [/PRINTFORMW 「你赢不了的，还是投降吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7405-7406',
        any: [/PRINTFORMW 「你赢不了的，还是投降吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7407',
        any: [/PRINTFORMW 「嘁，你那无聊的正义，看清楚我的力量吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7407-7408',
        any: [/PRINTFORMW 「嘁，你那无聊的正义，看清楚我的力量吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7410',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7413',
        any: [/PRINTFORMW 「魔王大人赐予的力量…绝不会输！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7413-7415',
        any: [/PRINTFORMW 「魔王大人赐予的力量…绝不会输！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7416-7418',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7419',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7420',
        any: [/PRINTFORMW 「傻孩子……我来教你享受真正的快乐吧～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7421',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7422',
        any: [
          /PRINTFORMW 「决定了！恩准你成为%SELF_CALL\(TARGET\)%的部下吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7422-7423',
        any: [
          /PRINTFORMW 「决定了！恩准你成为%SELF_CALL\(TARGET\)%的部下吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7424',
        any: [/PRINTFORMW 「你的样子很适合做肉便器哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7424-7425',
        any: [/PRINTFORMW 「你的样子很适合做肉便器哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7424-7427',
        any: [/PRINTFORMW 「你的样子很适合做肉便器哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7424-7428',
        any: [/PRINTFORMW 「你的样子很适合做肉便器哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7424-7432',
        any: [/PRINTFORMW 「你的样子很适合做肉便器哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7444',
        any: [/@COLOSSEUM_KOJO_6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7448',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7450',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7451',
        any: [/PRINTFORMW %SAVESTR:TARGET%像是已经没有力气站起来了一样……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7451-7452',
        any: [/PRINTFORMW %SAVESTR:TARGET%像是已经没有力气站起来了一样……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7453',
        any: [/PRINTFORMW %SAVESTR:TARGET%高昂的战意看得她的对手心惊胆战……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7453-7454',
        any: [/PRINTFORMW %SAVESTR:TARGET%高昂的战意看得她的对手心惊胆战……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7453-7455',
        any: [/PRINTFORMW %SAVESTR:TARGET%高昂的战意看得她的对手心惊胆战……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7456-7458',
        any: [/;交谈 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7460',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7462',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7464',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7465',
        any: [/PRINTFORMW 「呜哇…%SAVESTR:ASSI%请放过我吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7466',
        any: [/PRINTFORMW 气力用尽的%SAVESTR:TARGET%悔恨地抓着死斗场的墙壁……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7466-7467',
        any: [/PRINTFORMW 气力用尽的%SAVESTR:TARGET%悔恨地抓着死斗场的墙壁……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7468',
        any: [/PRINTFORMW 「哈啊…哈啊…想怎么做就怎么做吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7469',
        any: [/PRINTFORMW 气力用尽的%SAVESTR:TARGET%悔恨地抓着死斗场的墙壁……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7469-7470',
        any: [/PRINTFORMW 气力用尽的%SAVESTR:TARGET%悔恨地抓着死斗场的墙壁……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7471-7472',
        any: [/;助手が調教中の場合/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7473',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7474',
        any: [
          /PRINTFORMW 「呼，哼…%SAVESTR:ASSI%这种程度的对手早就习以为常了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7475',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:ASSI%逞强地说……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7475-7476',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:ASSI%逞强地说……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7477',
        any: [
          /PRINTFORMW 「那、那样的怪物%SELF_CALL\(TARGET\)%一个人就可以干掉十只！来决一死战吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7478',
        any: [
          /PRINTFORMW 尽管面对着死斗场里丑陋的怪物，%SAVESTR:TARGET%还是说出了非常强硬的话……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7478-7479',
        any: [
          /PRINTFORMW 尽管面对着死斗场里丑陋的怪物，%SAVESTR:TARGET%还是说出了非常强硬的话……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7478-7480',
        any: [
          /PRINTFORMW 尽管面对着死斗场里丑陋的怪物，%SAVESTR:TARGET%还是说出了非常强硬的话……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7478-7481',
        any: [
          /PRINTFORMW 尽管面对着死斗场里丑陋的怪物，%SAVESTR:TARGET%还是说出了非常强硬的话……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7482-7485',
        any: [/;口交 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7487',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7489',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7490',
        any: [
          /PRINTFORMW 「啊啊啊…已经…已经不能再应付更多的肉棒了…会痛的啊……哇啊…呜咕噜…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7491',
        any: [/PRINTFORM %SAVESTR:ASSI%将/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7493',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7495',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7496',
        any: [
          /PRINTFORMW 塞入%SAVESTR:TARGET%的口中。她吞吐着，脸上带有几分愉悦的表情……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7496-7497',
        any: [
          /PRINTFORMW 塞入%SAVESTR:TARGET%的口中。她吞吐着，脸上带有几分愉悦的表情……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7498',
        any: [/PRINTFORMW 「啊啊啊…这种、这种可怕的味道……哇啊…呜咕噜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7499',
        any: [/PRINTFORMW %SAVESTR:TARGET%吮舔着气味令人作呕的肉棒……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7499-7500',
        any: [/PRINTFORMW %SAVESTR:TARGET%吮舔着气味令人作呕的肉棒……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7499-7501',
        any: [/PRINTFORMW %SAVESTR:TARGET%吮舔着气味令人作呕的肉棒……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7502-7504',
        any: [/;胸爱撫 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7506',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7508',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7509',
        any: [
          /PRINTFORMW 「%SAVESTR:ASSI%…求、求你别这样对待%SELF_CALL\(TARGET\)%的身体啊…啊啊…啊呜呜！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7510',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%爱抚着胸部……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7510-7511',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:ASSI%爱抚着胸部……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7512',
        any: [/PRINTFORMW 「痛、好痛…别那么粗暴地揉啊…给我住手啊喂！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7513',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被毫无章法地玩弄着，发出痛苦的呻吟……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7513-7514',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被毫无章法地玩弄着，发出痛苦的呻吟……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7513-7515',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被毫无章法地玩弄着，发出痛苦的呻吟……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7516-7518',
        any: [/;背后位 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7520',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7522',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7523',
        any: [
          /PRINTFORMW 「你、你怎么能这样对我啊…不要…这样激烈的话…啊啊啊啊…饶、饶了我吧！！～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7524',
        any: [/PRINTFORM %SAVESTR:ASSI%边听着惨叫边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7526',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7528',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7529',
        any: [/PRINTFORMW 毫不留情地蹂躏着%SAVESTR:TARGET%的阴道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7531',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7532',
        any: [/PRINTFORMW 「痛…痛啊…呜咿…咕咿咿咿……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7533',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%只能无力地呻吟着，任凭巨魔摆布……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7533-7534',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%只能无力地呻吟着，任凭巨魔摆布……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7535',
        any: [
          /PRINTFORMW 「呜…呜啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%认真起来的话，这种家伙………呜……哇！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7536',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物无情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7536-7537',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物无情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7536-7538',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物无情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7536-7539',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物无情地侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7544',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7546',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7547',
        any: [
          /PRINTFORMW 「你、你怎么能这样对我啊…不要…这样侵犯我的屁股的话…啊啊啊啊…这样下去屁股会坏掉的啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7548',
        any: [/PRINTFORM %SAVESTR:ASSI%边听着惨叫边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7550',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7552',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7553',
        any: [/PRINTFORMW 蹂躏着%SAVESTR:TARGET%那鲜嫩的肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7555',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7556',
        any: [/PRINTFORMW 「痛…痛啊…呜咿…咕咿咿咿……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7557',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%只能无力的呻吟着，任凭巨魔摆布……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7557-7558',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%只能无力的呻吟着，任凭巨魔摆布……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7559',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%如果认真起来的话…明明…啊啊啊…别、别动我的屁股啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7560',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被怪物们肆意侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7560-7561',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被怪物们肆意侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7560-7562',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被怪物们肆意侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7560-7563',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被怪物们肆意侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7568',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7569',
        any: [
          /PRINTFORMW 「这、这种低劣的…春药…对我完全没有作用啊…呜…呜嗯…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7569-7570',
        any: [
          /PRINTFORMW 「这、这种低劣的…春药…对我完全没有作用啊…呜…呜嗯…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7569-7571',
        any: [
          /PRINTFORMW 「这、这种低劣的…春药…对我完全没有作用啊…呜…呜嗯…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7574-7577',
        any: [/@NTR_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7577',
        any: [/@NTR_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7581',
        any: [/CFLAG:650 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7584',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7586',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7587',
        any: [
          /PRINTFORMW 「住手、住手！%SELF_CALL\(TARGET\)%还…只被魔王大人抱过啊…唔啊…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7587-7588',
        any: [
          /PRINTFORMW 「住手、住手！%SELF_CALL\(TARGET\)%还…只被魔王大人抱过啊…唔啊…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7589',
        any: [
          /PRINTFORMW 「不要…不要啊…%SELF_CALL\(TARGET\)%为什么…怎么会…不自觉地…开始配合了…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7589-7590',
        any: [
          /PRINTFORMW 「不要…不要啊…%SELF_CALL\(TARGET\)%为什么…怎么会…不自觉地…开始配合了…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7591',
        any: [/CFLAG:651 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7593',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7594',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7595',
        any: [
          /PRINTFORMW 「呜啊！肛门被…被大肉棒侵入了…啊啊啊…啊…啊啊…哇啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7595-7596',
        any: [
          /PRINTFORMW 「呜啊！肛门被…被大肉棒侵入了…啊啊啊…啊…啊啊…哇啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7597',
        any: [
          /PRINTFORMW 「这样的事也被%SELF_CALL\(TARGET\)%给…碰到了…屈服的话…呜啊…其实…也不是不可以嘛♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7597-7598',
        any: [
          /PRINTFORMW 「这样的事也被%SELF_CALL\(TARGET\)%给…碰到了…屈服的话…呜啊…其实…也不是不可以嘛♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7599',
        any: [/CFLAG:652 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7601',
        any: [/ELSEIF P == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7602',
        any: [/IF TALENT:136/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7603',
        any: [
          /PRINTFORMW 「啊啊啊…被这样…看着…啊啊啊啊…%SELF_CALL\(TARGET\)%是个变态，被狗粗暴地侵犯反而很兴奋呢…请看着我…看着我吧！啊…啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7604',
        any: [/ELSEIF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7605',
        any: [
          /PRINTFORMW 「这样吗…真是屈辱…大概…那家伙也不愿意看到我现在这副样子吧…呜…啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7605-7606',
        any: [
          /PRINTFORMW 「这样吗…真是屈辱…大概…那家伙也不愿意看到我现在这副样子吧…呜…啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7607',
        any: [/PRINTFORMW 「住手…别这样…该死…啊…啊喂…唔啊…啊啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7607-7608',
        any: [/PRINTFORMW 「住手…别这样…该死…啊…啊喂…唔啊…啊啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7609',
        any: [/CFLAG:653 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7611',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7612',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7613',
        any: [
          /PRINTFORMW 「唔啊…嘤嘤…请更用力地侵犯我…狂王大人…%SELF_CALL\(TARGET\)%已经变得糟糕了啊啊…要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7613-7614',
        any: [
          /PRINTFORMW 「唔啊…嘤嘤…请更用力地侵犯我…狂王大人…%SELF_CALL\(TARGET\)%已经变得糟糕了啊啊…要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7615',
        any: [
          /PRINTFORMW 「啊啊啊…狂王大人的腰技…最棒了…啊啊啊…已经受不了了啦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7615-7616',
        any: [
          /PRINTFORMW 「啊啊啊…狂王大人的腰技…最棒了…啊啊啊…已经受不了了啦♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7617',
        any: [/CFLAG:654 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7619',
        any: [/ELSEIF P == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7620',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7621',
        any: [
          /PRINTFORMW 「还想要…还想要更多的…大肉棒…%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的脑袋里…已经只有淫荡这两个字了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7621-7622',
        any: [
          /PRINTFORMW 「还想要…还想要更多的…大肉棒…%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的脑袋里…已经只有淫荡这两个字了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7623',
        any: [
          /PRINTFORMW 「啊啊啊…%SELF_CALL\(TARGET\)%的屁股和小穴已经…唔啊…停、停不下来了…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…想要成为大家的肉便器♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7623-7624',
        any: [
          /PRINTFORMW 「啊啊啊…%SELF_CALL\(TARGET\)%的屁股和小穴已经…唔啊…停、停不下来了…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…想要成为大家的肉便器♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7625',
        any: [/CFLAG:655 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7627',
        any: [/ELSEIF P == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7628',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7629',
        any: [
          /PRINTFORMW 「啊啊啊…啊呜…呜啊…魔王什么的对%SELF_CALL\(TARGET\)%来说已经不算什么了…啊啊…只想要更多的肉棒给我带来快感…哇啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7629-7630',
        any: [
          /PRINTFORMW 「啊啊啊…啊呜…呜啊…魔王什么的对%SELF_CALL\(TARGET\)%来说已经不算什么了…啊啊…只想要更多的肉棒给我带来快感…哇啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7631',
        any: [
          /PRINTFORMW 「来吧…快来啊…请…唔啊…大家…在…在我这个肉便器身上射出精液吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7631-7632',
        any: [
          /PRINTFORMW 「来吧…快来啊…请…唔啊…大家…在…在我这个肉便器身上射出精液吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7633',
        any: [/CFLAG:656 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7635',
        any: [/ELSEIF P == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7636',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7637',
        any: [
          /PRINTFORMW 「呼呼…%SELF_CALL\(TARGET\)%已经是狂王殿下的人了…那个地方，不回去也无所谓啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7638',
        any: [
          /PRINTFORMW 「今后服侍狂王大人这种事情，就由我来负责好了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7638-7639',
        any: [
          /PRINTFORMW 「今后服侍狂王大人这种事情，就由我来负责好了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7640',
        any: [
          /PRINTFORMW 「啊哈…啊啊啊…魔王大人…您的仆人…已经向狂王殿下倒戈了哦…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7640-7641',
        any: [
          /PRINTFORMW 「啊哈…啊啊啊…魔王大人…您的仆人…已经向狂王殿下倒戈了哦…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7642',
        any: [/CFLAG:657 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7644',
        any: [/ELSEIF P == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7645',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7646',
        any: [/IF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7647',
        any: [
          /PRINTFORMW 「那个孩子是%SELF_CALL\(TARGET\)%的小孩…所以…请还给我啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7647-7648',
        any: [
          /PRINTFORMW 「那个孩子是%SELF_CALL\(TARGET\)%的小孩…所以…请还给我啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7649',
        any: [
          /PRINTFORMW 「既然%SELF_CALL\(TARGET\)%已经到了这种境地…这孩子就是狂王大人的了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7649-7650',
        any: [
          /PRINTFORMW 「既然%SELF_CALL\(TARGET\)%已经到了这种境地…这孩子就是狂王大人的了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7651-7652',
        any: [
          /PRINTFORMW 「啊哈哈…魔王大人…有看到%SELF_CALL\(TARGET\)%生下的孩子的样子吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7652',
        any: [
          /PRINTFORMW 「啊哈哈…魔王大人…有看到%SELF_CALL\(TARGET\)%生下的孩子的样子吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7653',
        any: [/PRINTFORMW 「今天小穴也被狂王殿下灌满了精液哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7653-7654',
        any: [/PRINTFORMW 「今天小穴也被狂王殿下灌满了精液哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7653-7655',
        any: [/PRINTFORMW 「今天小穴也被狂王殿下灌满了精液哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7653-7656',
        any: [/PRINTFORMW 「今天小穴也被狂王殿下灌满了精液哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7660',
        any: [/@EXUCUTION_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7663',
        any: [/IF TFLAG:16 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7664',
        any: [
          /PRINTFORMW 「其他的什么都可以！请饶恕我，不要让我做怪兽的肉便器啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7666',
        any: [/ELSEIF TFLAG:16 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7667',
        any: [
          /PRINTFORMW 「干什么！%SELF_CALL\(TARGET\)%、%SELF_CALL\(TARGET\)%不要变成这样啊…哈啊啊…啊啊啊啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7669',
        any: [/ELSEIF TFLAG:16 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7670',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%总有一天会报复回来的啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7672',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7673',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7672-7674',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7677',
        any: [/@MUSEUM_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7680',
        any: [/IF TFLAG:500 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7681',
        any: [/PRINTFORMW 「谁…谁想变成你所谓的石像啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7682',
        any: [/PRINTFORMW %SAVESTR:TARGET%毫无顾忌地竖起中指………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7684',
        any: [/ELSEIF TFLAG:500 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7685',
        any: [/PRINTFORMW 「变成标本也会一直诅咒你啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7687',
        any: [/ELSEIF TFLAG:500 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7688',
        any: [/PRINTFORMW 「变成蜡像也不会放过你！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7690',
        any: [/ELSEIF TFLAG:500 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7691',
        any: [
          /PRINTFORMW 「呜呜、%SELF_CALL\(TARGET\)%这样的暴露的样子被…！…别盯着这边看啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7693',
        any: [/ELSEIF TFLAG:500 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7694',
        any: [
          /PRINTFORMW 「%SELF_CALL\(TARGET\)%是绝对！不会…变成…你的……人…偶、什……么……的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7695',
        any: [/PRINTFORMW 看起来%SAVESTR:A%到最后也没有察觉到异变的发生呢…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7697',
        any: [/ELSEIF TFLAG:500 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7698',
        any: [/PRINTFORMW 「就这样毫无美感的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7700',
        any: [/ELSEIF TFLAG:500 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7701',
        any: [/PRINTFORMW 「就这样变成中看不中用的玩物吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7703',
        any: [/ELSEIF TFLAG:500 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7704',
        any: [/PRINTFORMW 「就这样失去生命了呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7706',
        any: [/ELSEIF TFLAG:500 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7707',
        any: [/PRINTFORMW 「才不要变成家具，不要啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7709',
        any: [/ELSEIF TFLAG:500 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7710',
        any: [/PRINTFORMW 「敢这么做的话，小心我撕烂这幅画啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7710-7711',
        any: [/PRINTFORMW 「敢这么做的话，小心我撕烂这幅画啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7714',
        any: [/@BANISHMENT_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7718',
        any: [/IF TFLAG:510 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7719',
        any: [
          /PRINTFORMW 「骗人的吧…%SELF_CALL\(TARGET\)%已经失去力量了…这样的话…这样的话…那些家伙…真是荒谬啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7721',
        any: [/ELSEIF TFLAG:510 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7722',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7724',
        any: [/ELSEIF TFLAG:510 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7725',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7727',
        any: [/ELSEIF TFLAG:510 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7728',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7730',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7731',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7730-7732',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7735',
        any: [/@PUBLIC_EXUCUTION_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7739',
        any: [/IF TFLAG:520 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7740',
        any: [
          /PRINTFORMW 「喂、喂…骗人的吧…%SELF_CALL\(TARGET\)%的身体…被那些野兽什么的一起蹂躏的话…会死的啊…一定会死的啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7742',
        any: [/ELSEIF TFLAG:520 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7743',
        any: [
          /PRINTFORMW 「呼，捕获的人就会被这样处决吗…魔王的残暴还真是一览无遗啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7745',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7746',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7745-7747',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7750',
        any: [/@GROTESQUE_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7754',
        any: [/IF TFLAG:530 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7755',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7757',
        any: [/ELSEIF TFLAG:530 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7758',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7760',
        any: [/ELSEIF TFLAG:530 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7761',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7763',
        any: [/ELSEIF TFLAG:530 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7764',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7766',
        any: [/ELSEIF TFLAG:530 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7767',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7769',
        any: [/ELSEIF TFLAG:530 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7770',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7772',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7773',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7772-7774',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7777',
        any: [/@ENTERENEMY_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7780',
        any: [/IF TALENT:A:21 == 1 \|\| TALENT:A:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7782',
        any: [/PRINTFORMW 「………开始了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7783',
        any: [
          /ELSEIF TALENT:A:11 == 1 \|\| TALENT:A:12 == 1 \|\| TALENT:A:15 == 1 \|\| TALENT:A:30 == 1 \|\| TALENT:A:34 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7785',
        any: [/PRINTFORMW 「不管魔王有一个还是两个，都消灭给你看！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7786',
        any: [/ELSEIF TALENT:A:10 == 1 \|\| TALENT:A:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7788',
        any: [
          /PRINTFORMW 「要、要进入这样的地方吗，才不会害怕啊，%SELF_CALL\(A\)%可是勇者来着…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7788-7789',
        any: [
          /PRINTFORMW 「要、要进入这样的地方吗，才不会害怕啊，%SELF_CALL\(A\)%可是勇者来着…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7791',
        any: [/PRINTFORMW 「要消灭这群虫子吗？不过是探囊取物而已啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7791-7792',
        any: [/PRINTFORMW 「要消灭这群虫子吗？不过是探囊取物而已啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7796',
        any: [/@GOHOUBI_REQUEST_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7799',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7801',
        any: [/PRINTFORMW 「%SELF_CALL\(A\)%想要很多钱」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7802',
        any: [
          /ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7804',
        any: [/PRINTFORMW 「%SELF_CALL\(A\)%想和…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7805',
        any: [/IF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7806',
        any: [/PRINT 狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7807',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7808',
        any: [/PRINT 猪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7809',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7810',
        any: [/PRINT 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7810-7811',
        any: [/PRINT 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7812',
        any: [/PRINTFORMW 性交啦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7813',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7815',
        any: [/PRINTFORMW 「请、请吻我吧…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7816',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7818',
        any: [/PRINTFORMW 「回来的时候…请拥抱我～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7819',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7821',
        any: [/PRINTFORMW 「让我来帮你做一次满满的口交吧～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7822',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7824',
        any: [/PRINTFORMW 「呼呼…想要跟大家交，朋，友～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7825',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7827',
        any: [/PRINTFORMW 「%SELF_CALL\(A\)%想请…魔王大人撒尿…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7828',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7830',
        any: [/PRINTFORMW 「作为女人想品尝童贞的肉棒呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7830-7831',
        any: [/PRINTFORMW 「作为女人想品尝童贞的肉棒呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7834',
        any: [/@GOHOUBI_AFTER_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7838',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7839',
        any: [/PRINTFORMW 「这样的事情可不能长久」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7841',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7842',
        any: [/PRINTFORMW 「感觉还不错嘛…%SELF_CALL\(A\)%…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7843',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7845',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7846',
        any: [/PRINTFORMW 「该怎么用呢？这样下去能存很多钱吧～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7848',
        any: [/ELSEIF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7850',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7851',
        any: [/PRINTFORMW 「唔啊！被狗狗干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7851-7852',
        any: [/PRINTFORMW 「唔啊！被狗狗干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7853',
        any: [/PRINTFORMW 「唔啊！跟狗狗性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7853-7854',
        any: [/PRINTFORMW 「唔啊！跟狗狗性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7856',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7858',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7859',
        any: [/PRINTFORMW 「唔啊！被猪干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7859-7860',
        any: [/PRINTFORMW 「唔啊！被猪干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7861',
        any: [/PRINTFORMW 「唔啊！跟猪性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7861-7862',
        any: [/PRINTFORMW 「唔啊！跟猪性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7864',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7866',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7867',
        any: [/PRINTFORMW 「唔啊！被马干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7867-7868',
        any: [/PRINTFORMW 「唔啊！被马干肛门最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7869',
        any: [/PRINTFORMW 「唔啊！跟马性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7869-7870',
        any: [/PRINTFORMW 「唔啊！跟马性交最棒了！最最最棒了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7872',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7873',
        any: [
          /PRINTFORMW 「呵呵，这样的吻就已经满足了啊，%SELF_CALL\(A\)%果然是个廉价的女人呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7875',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7877',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7878',
        any: [
          /PRINTFORMW 「啊啊啊！果然打倒勇者后被插小穴是最棒啊的啦！抱紧我哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7880-7881',
        any: [
          /PRINTFORMW 「啊啊啊！果然打倒勇者后被插屁眼是最棒啊的啦！抱紧我哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7881',
        any: [
          /PRINTFORMW 「啊啊啊！果然打倒勇者后被插屁眼是最棒啊的啦！抱紧我哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7881-7882',
        any: [
          /PRINTFORMW 「啊啊啊！果然打倒勇者后被插屁眼是最棒啊的啦！抱紧我哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7884',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7885',
        any: [
          /PRINTFORMW 「呼…作为报酬的话还远远不够呢，所以%SELF_CALL\(A\)%还要更努力的榨干你们嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7887',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7889',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7890',
        any: [/PRINTFORMW 「像这种激烈程度的乱交派对…已经习惯了呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7890-7891',
        any: [/PRINTFORMW 「像这种激烈程度的乱交派对…已经习惯了呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7892',
        any: [/PRINTFORMW 「像这种激烈程度的乱交派对…已经习惯了呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7892-7893',
        any: [/PRINTFORMW 「像这种激烈程度的乱交派对…已经习惯了呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7895',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7896',
        any: [/PRINTFORMW 「哈哈…无论怎样的美酒都不及你的尿液啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7898',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7900',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7901',
        any: [
          /PRINTFORMW 「啊哈哈哈！处男的味道是怎样呢，想想都觉得激动啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7903-7904',
        any: [
          /PRINTFORMW 「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7904',
        any: [
          /PRINTFORMW 「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7904-7905',
        any: [
          /PRINTFORMW 「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7904-7906',
        any: [
          /PRINTFORMW 「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7904-7907',
        any: [
          /PRINTFORMW 「用屁股夺走鲜嫩肉棒的童贞的感觉真是太棒了哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7908-7910',
        any: [/@OSIOKI_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7910',
        any: [/@OSIOKI_KOUJO_K6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7914',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7915',
        any: [
          /PRINTFORMW 「%SELF_CALL_FIRST\(A\)%、%SELF_CALL\(A\)%这就回房间」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7917',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7919',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7920',
        any: [/PRINTFORMW 「啊呜！哔哩哔哩地！哔哩哔哩啊呜哔哩哔哩！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7920-7921',
        any: [/PRINTFORMW 「啊呜！哔哩哔哩地！哔哩哔哩啊呜哔哩哔哩！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7922',
        any: [/PRINTFORMW 「哈啊！这样…看不到尽头的拷问…呜呜、唔啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7922-7923',
        any: [/PRINTFORMW 「哈啊！这样…看不到尽头的拷问…呜呜、唔啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7925',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7927',
        any: [/IF ABL:A:17 >= 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7928',
        any: [
          /PRINTFORMW 「你在看什么？如果在看我的话是要付钱的哦，只要＄１就够了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7928-7929',
        any: [
          /PRINTFORMW 「你在看什么？如果在看我的话是要付钱的哦，只要＄１就够了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7930',
        any: [
          /PRINTFORMW 「啊啊啊！你在看哪里啊！再看就杀了你！唔嗯…呜…啊呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7930-7931',
        any: [
          /PRINTFORMW 「啊啊啊！你在看哪里啊！再看就杀了你！唔嗯…呜…啊呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7933',
        any: [/ELSEIF TFLAG:18 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7935',
        any: [/IF ABL:A:17 >= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7936',
        any: [
          /PRINTFORMW 「呼呼…唔啊…好，继续啊…更加仔细地看%SELF_CALL\(A\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7936-7937',
        any: [
          /PRINTFORMW 「呼呼…唔啊…好，继续啊…更加仔细地看%SELF_CALL\(A\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7938',
        any: [/PRINTFORMW 「呜咿…呜…呜咿呜咿咿咿咿………讨厌啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7938-7939',
        any: [/PRINTFORMW 「呜咿…呜…呜咿呜咿咿咿咿………讨厌啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7941',
        any: [/ELSEIF TFLAG:18 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7943',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7944',
        any: [
          /PRINTFORMW 「抱、抱歉讨伐失败了呢，%SELF_CALL\(A\)%真是头愚蠢的母猪！请狠狠的鞭笞我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7944-7945',
        any: [
          /PRINTFORMW 「抱、抱歉讨伐失败了呢，%SELF_CALL\(A\)%真是头愚蠢的母猪！请狠狠的鞭笞我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7946',
        any: [
          /PRINTFORMW 「哇啊！对不起啊！真对不起啊！全部都是%SELF_CALL\(A\)%的错！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7946-7947',
        any: [
          /PRINTFORMW 「哇啊！对不起啊！真对不起啊！全部都是%SELF_CALL\(A\)%的错！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7949',
        any: [/ELSEIF TFLAG:18 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7951',
        any: [/IF TALENT:A:88 == 1 \|\| TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7952',
        any: [
          /PRINTFORMW 「啊啊啊…虽然是别人的尿但是意外的美味呢…谢、谢谢您提供的饮品………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7952-7953',
        any: [
          /PRINTFORMW 「啊啊啊…虽然是别人的尿但是意外的美味呢…谢、谢谢您提供的饮品………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7954',
        any: [/PRINTFORMW 「我要洗澡…要洗澡…洗澡………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7954-7955',
        any: [/PRINTFORMW 「我要洗澡…要洗澡…洗澡………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7957',
        any: [/ELSEIF TFLAG:18 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7958',
        any: [/PRINTW 「事到如今，扫除这样的惩罚是我分内之事啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7960',
        any: [/ELSEIF TFLAG:18 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7961',
        any: [/PRINTW 「啊啊…谁能给我一份饭吃就好了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7963',
        any: [/ELSEIF TFLAG:18 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7964',
        any: [
          /PRINTFORMW 「啊啊啊啊啊啊…我要大肉棒！不管是谁都好，请跟我性交吧！要疯了啊啊！就算是当做肉便器也无所谓了！啊啊啊！谁来救救我啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7966',
        any: [/ELSEIF TFLAG:18 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7967',
        any: [/PRINTFORMW 「呀呼！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7967-7968',
        any: [/PRINTFORMW 「呀呼！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7972',
        any: [/@GOBI_KOUJO_K6, ARG:0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7975',
        any: [/IF ARG:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7977',
        any: [/PRINTFORM 的哟♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7978',
        any: [/ELSEIF ARG:0 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7980',
        any: [/PRINTFORM 啊！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7981',
        any: [/ELSEIF ARG:0 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7983',
        any: [/PRINTFORM 来着……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7984',
        any: [/ELSEIF ARG:0 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7986',
        any: [/PRINTFORM 啦……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7987',
        any: [/ELSEIF ARG:0 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7989',
        any: [/PRINTFORM 呢……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7989-7990',
        any: [/PRINTFORM 呢……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7993',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7994',
        any: [/PRINTFORM 啊。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7995',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7996',
        any: [/PRINTFORM 呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7996-7997',
        any: [/PRINTFORM 呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7998',
        any: [/PRINTFORM 的说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7998-7999',
        any: [/PRINTFORM 的说。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K6_悪女.ERB',
        ref: '7998-8000',
        any: [/PRINTFORM 的说。/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
