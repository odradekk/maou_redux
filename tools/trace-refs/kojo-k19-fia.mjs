// 源: target/ERB/口上/EVENT_K19_菲娅.ERB  @全部内联引用
// issue #247；#298 锚鉴别力锁。
//
// 本表由一次性离线脚本从已复核的 JS 引用与只读源文生成，提交内容是静态
// 正则字面量。装载期不得读取源文生成锚：引用行号即使同步改登记号，正文锚
// 仍须保持独立，才能让 trace-check 抓住成片行号偏移（#44）。

const SRC = 'target/ERB/口上/EVENT_K19_菲娅.ERB';

export const FILES = [
  {
    js: 'ere/kojo/kojo-k19-fia.js',
    refs: [
      {
        src: SRC,
        ref: '1-6724',
        any: [
          /^(?:\uFEFF)?[ \t]*;=================================================[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;eramaou専用口上[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;=================================================[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;菲娅口上[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;作者:白告姬[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;总之就是写出来被人啪啪啪的东西！（喂[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;【角色】[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '51',
        any: [/^(?:\uFEFF)?[ \t]*@EVENTTRAIN[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '52',
        any: [/^(?:\uFEFF)?[ \t]*#PRI[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '53',
        any: [/^(?:\uFEFF)?[ \t]*FLAG:119[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '55',
        any: [/^(?:\uFEFF)?[ \t]*FLAG:7[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '57',
        any: [/^(?:\uFEFF)?[ \t]*@EVENTEND[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '58',
        any: [/^(?:\uFEFF)?[ \t]*#LATER[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '59',
        any: [/^(?:\uFEFF)?[ \t]*FLAG:119[ \t]+=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '65',
        any: [/^(?:\uFEFF)?[ \t]*@EVENTTRAIN[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '67-68',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:179[ \t]+!=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '68-69',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:179[ \t]+!=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '74',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:201[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '75-76',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;魔族[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '77',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:314[ \t]+==[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '78',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……（吸鼻子）……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '79',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一进入调教室，映入眼帘的是躲在角落中抽泣的身影。原本是公主的名为%SAVESTR:TARGET%的幼女，好像暂时还没办法接受自己的新身份的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '80',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%满足的看着眼前魔族幼女，慢慢走近。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '81',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+听见脚步声的幼女转过头来，露出了泪眼汪汪的大眼睛。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '82',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管她很多事情都处于懵懂阶段，但已经变成了魔族的她，还是本能的认出了%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '83',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……魔王大人……？魔王大人……为什么会在这里……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '84',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神上已经有些混乱的她，还不知道接下来迎接自己的会是什么样的命运……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '85',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '87',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:370[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '89-90',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……你……你是谁……这里是哪里……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '90',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……你……你是谁……这里是哪里……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '91',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一进入调教室，映入眼帘的是站在屋子正中的娇小身影。名为%SAVESTR:TARGET%的柔弱的幼女，正怯生生的抬头看着自己。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '92',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毕竟她还只是个孩子，对于自己身上发生了什么并不是很明白。只知道自己从睡梦中醒来的时候，身处一个陌生的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '93',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边和她解释着她已经是自己的奴隶，一边慢慢的接近因为恐惧而站在原地一动不动的%SAVESTR:TARGET%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '94',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……总之……那个……就是说……你是坏人吧……你，你想干嘛……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '95',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%没回答，只是蹲下来，乐在其中的拨弄着害怕的颤抖个不停的%SAVESTR:TARGET%的头发。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '96',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……谁，谁来救救我呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '97',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '98-99',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '99-100',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '103',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+5[ \t]+&&[ \t]+CFLAG:370[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:314[ \t]+==[ \t]+9[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '104',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜……好像……身体……变得奇怪了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '105',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「我……我已经变成了……坏孩子了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '106',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+面前原本是人类的幼女跪坐在地上，无助的大哭起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '107',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啊啊啊，这个样子，会被大家讨厌的！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '108',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+哭声在屋子里回荡着，大颗大颗的泪珠沿着脸颊滑落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '110',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:370[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '111-112',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '115',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+>=[ \t]+1[ \t]+&&[ \t]+CFLAG:650[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '116',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '117-118',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜啊啊啊～主人～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '118',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜啊啊啊～主人～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '119',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好可怕，好可怕呜呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '120',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带到%SAVESTR:MASTER%面前的%SAVESTR:TARGET%，一下子扑到%SAVESTR:MASTER%身上大哭起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '121',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个人，对我做这样那样的事情，还让我忘掉主人。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '122',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，如果不乖乖照做的话，也许就见不到主人了，我，我好害怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '123',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「能够再见到主人，好开心……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '124',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……那种样子……被主人全都看到了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '125',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……你会讨厌我吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '126',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%泪眼汪汪的抬头看着%SAVESTR:MASTER%，颤抖的说着，仿佛受惊的小动物一般。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '127',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在那之后，花了一番功夫安抚她的情绪，然而因为水晶球的事，最后还是好好的用下面“惩罚”了她一番。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '129',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:650[ \t]+=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '130',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '131-132',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯……啾……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '132',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯……啾……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '133',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%乖巧伏在%SAVESTR:MASTER%的身下，伸出小舌头专心的舔弄着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '134',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，虽然和其他人的H也很舒服，但是总觉得少了点什么呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '135',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯嗯～果然还是主人的肉棒最棒了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '136',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所以……请用主人的精液牛奶……把那个人留在%SELF_CALL\(TARGET\)%肚子里面的东西全部洗干净呐❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '137',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%满眼桃心的仰头看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '138',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在那之后，好好的用下面“惩罚”了她一整晚。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '140',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:650[ \t]+=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '141-142',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '142-143',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……为什么不管是谁……都对%SELF_CALL\(TARGET\)%做这样那样的事情呢。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '143',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……为什么不管是谁……都对%SELF_CALL\(TARGET\)%做这样那样的事情呢。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '144',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样的日子……不要了啦……好想……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '145',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被关在笼子里的%SAVESTR:TARGET%，不断的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '146',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+坐在王座上的%SAVESTR:MASTER%俯视着%SAVESTR:TARGET%，轻蔑的从鼻子里哼了一声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+只要是魔王的东西，就没有人能拿得走。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '149',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:650[ \t]+=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '150-151',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '151-152',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '156',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+2[ \t]+&&[ \t]+MARK:2[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '157-158',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '158',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '159',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻声的哀求着，似乎已经不像最初那样拼命抵抗了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '160',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '160-161',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+2[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '164',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+3[ \t]+&&[ \t]+MARK:2[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '165-166',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……我知道了啦……我会乖乖的……听魔王大人的话的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '166',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……我知道了啦……我会乖乖的……听魔王大人的话的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '167',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%无精打采的低着头，彻底的放弃了抵抗。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '168',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '168-169',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+3[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '172',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+4[ \t]+&&[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '173-174',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶，从现在开始要叫主人吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '174',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶，从现在开始要叫主人吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '175',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……我明白了……主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '176',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+连番的调教已经让她的精神彻底的沦陷了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '177',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '178-179',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '182',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+5[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:314[ \t]+!=[ \t]+9[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '183-184',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '184',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '185',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻扯着%SAVESTR:MASTER%的衣角。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '186',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那……那个……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '187',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还想和主人……继续做H的事情呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '188',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸上浮着一层红晕，眼里满满的都是和年龄不符的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '189',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……教我更多……H的事情吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '191',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「更进一步的……也没问题哟……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '192',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一脸痴态的望着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '193',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '194-195',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '198',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:314[ \t]+==[ \t]+9[ \t]+&&[ \t]+CFLAG:201[ \t]+<[ \t]+6[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '199-200',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的味道，最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '200',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的味道，最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '201',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边用小脸磨蹭着%SAVESTR:MASTER%的肉棒，一边玩弄着自己的下半身。透明的爱液沿着大腿缓缓流下。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '202',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「变成这个样子的话……不管主人想玩什么样子的play都没关系了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '203',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……来做更多……H的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '204',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+变化为魔族的%SAVESTR:TARGET%，已经彻底的沦为了欲望的俘虏。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '205',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '206-207',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '210',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:201[ \t]+<[ \t]+7[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:314[ \t]+!=[ \t]+9[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '211-212',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '212',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '213',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠在%SAVESTR:MASTER%怀里，任由%SAVESTR:MASTER%的手在自己身上各处抚摸着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '214',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最近……脑子里面一直想着主人的事情……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '215',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的样貌……声音……味道……还有好多好多其他的东西……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '216',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「我好像已经……离不开主人了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '218',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+FLAG:30[ \t]+>[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '219',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……主人……还有其他的姐姐们呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '220',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……确实……我比起姐姐们来……可能没什么魅力……也没有她们那么会服侍主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '221',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但，但是……我是真的很喜欢主人的说！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '222',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '223',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '224',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管如此，一想到%SAVESTR:MASTER%连自己的第一次都还没有拿走，%SAVESTR:TARGET%的情绪好像更加的低落了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '225',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '226-227',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;还有一个爱慕\/淫乱的奴隶[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '228',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:30[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '229',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……主人……还有其他的姐姐呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '230',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……确实……我比起姐姐来……可能没什么魅力……也没有她那么会服侍主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '231',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但，但是……我是真的很喜欢主人的说！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '232',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然好像越说越情绪低落，但是她似乎是想了很久才下定了决心的样子，最后还是鼓起勇气说了出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '233',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '234',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管如此，一想到%SAVESTR:MASTER%连自己的第一次都还没有拿走，%SAVESTR:TARGET%的情绪好像更加的低落了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '235',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……果然我这样的小孩子……对主人来说没什么吸引力吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '236-237',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;その他[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '238-239',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所……所以……那个……可以让%SELF_CALL\(TARGET\)%任性一次吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '239',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所……所以……那个……可以让%SELF_CALL\(TARGET\)%任性一次吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '240',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在得到了同意之后，%SAVESTR:TARGET%伸出小指轻轻的勾住%SAVESTR:MASTER%的手指。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '241',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿～今后也要……一直在一起……约好了哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '242',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:16[ \t]+==[ \t]+-1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '243',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%，意外主动的贴了过来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '244',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所以……我的初吻……请您……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '245',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不等她说完，%SAVESTR:MASTER%按着%SAVESTR:TARGET%的头压过来，将舌头侵入到了还不知道什么是kiss的小嘴中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '246',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一边感受柔软的小舌头略显生涩的侍奉，一边享受着幼女甘甜的唾液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '247',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾……呼啊……主人❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '248',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最喜欢你了❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '249-250',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:16[ \t]+=[ \t]+[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '250',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:16[ \t]+=[ \t]+[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '251',
        any: [/^(?:\uFEFF)?[ \t]*CSTR:4[ \t]+=[ \t]+%SAVESTR:MASTER%[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '252-253',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '253',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '254',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '255-256',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '259',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:314[ \t]+==[ \t]+9[ \t]+&&[ \t]+CFLAG:201[ \t]+<[ \t]+8[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '260-261',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;調教前から魔族[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '262',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:370[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '263',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '264',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不停嗅着%SAVESTR:MASTER%身上味道的%SAVESTR:TARGET%，简直就像一直小狗一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '265',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「果然还是和主人在一起最好了呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '266',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「变成魔族了的现在，和主人的距离就变得更加接近了吧？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '267',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '268-269',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;調教後に魔族[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '270',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:370[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '271',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '272',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不停嗅着%SAVESTR:MASTER%身上味道的%SAVESTR:TARGET%，简直就像一直小狗一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '273',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然有些怀念原本的生活，但是……果然还是和主人在一起最好了呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '274',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「变成魔族了的现在，和主人的距离就变得更加接近了吧？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '275',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '276-277',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '277-278',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '281',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]+&&[ \t]+CFLAG:201[ \t]+<[ \t]+9[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '282-283',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啊……求求你……饶了我吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '283',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啊……求求你……饶了我吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '284',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+双眼失去了焦点的%SAVESTR:TARGET%缩在角落瑟瑟发抖，机械性的重复着几个短句。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '285',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看来她的脆弱的精神已经彻底到达了极限，这个孩子恐怕再也回不到原本的样子了吧……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '286',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '286-287',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:201[ \t]+=[ \t]+9[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '290',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ASSI[ \t]+<[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '291',
        any: [/^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_KOJO2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '292',
        any: [/^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_FUKU[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '351-352',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_KOJO2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '352',
        any: [/^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_KOJO2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '353',
        any: [/^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_FUKU[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '353-354',
        any: [
          /^(?:\uFEFF)?[ \t]*CALL[ \t]+K19_FUKU[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '360',
        any: [/^(?:\uFEFF)?[ \t]*@K19_KOJO2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '362',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '363-364',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要过来……求求你！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '364',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要过来……求求你！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '365',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神已经的崩坏了的她，已经无法分清幻觉和现实了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '365-366',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神已经的崩坏了的她，已经无法分清幻觉和现实了。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '369',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '370-371',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '371',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……讨厌……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '372',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%徒劳后退，想要躲开%SAVESTR:MASTER%的魔爪。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '372-373',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%徒劳后退，想要躲开%SAVESTR:MASTER%的魔爪。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '376',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+0[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '377-378',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做什么啦……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '378',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做什么啦……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '379',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些嫌恶的想推开%SAVESTR:MASTER%的手。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '380',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+只是，力量上绝对的差距连让%SAVESTR:MASTER%稍微动一动都做不到。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '380-381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+只是，力量上绝对的差距连让%SAVESTR:MASTER%稍微动一动都做不到。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '384',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '385-386',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……又要……做那个了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '386',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……又要……做那个了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '387',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%不情愿的嘟着小嘴，抱着脚坐在床的正中央。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '388',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的样子似乎没有之前那么抵触了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '388-389',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的样子似乎没有之前那么抵触了。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '392',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+2[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '393-394',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「魔王大人……那个……我……我会乖乖听话的……所以……可，可以温柔一点吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '394',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「魔王大人……那个……我……我会乖乖听话的……所以……可，可以温柔一点吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '395',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%似乎已经接受了自己身为%SAVESTR:MASTER%的奴隶的事实。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '396',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看见调教有所成效的%SAVESTR:MASTER%，满意的摸了摸%SAVESTR:TARGET%的头……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '396-397',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看见调教有所成效的%SAVESTR:MASTER%，满意的摸了摸%SAVESTR:TARGET%的头……[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '400',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '401-402',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人……您来了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '402',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人……您来了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '403',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今天又要对%SELF_CALL\(TARGET\)%做些什么呢……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '404',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+乖乖的洗干净身体的她，跪坐在床上等待着%SAVESTR:MASTER%的临幸。水汪汪的大眼睛里，看不出任何一点反抗的苗头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '405',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神上已经完全服从于%SAVESTR:MASTER%的现在，侍奉%SAVESTR:MASTER%才是最重要的事情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '405-406',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神上已经完全服从于%SAVESTR:MASTER%的现在，侍奉%SAVESTR:MASTER%才是最重要的事情。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '409',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '410-411',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;服分岐優先[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '413',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+FLAG:37[ \t]+!=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '415',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+131[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '416',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '417',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+进屋的时候，%SAVESTR:TARGET%似乎刚刚睡醒的样子，揉着惺忪的睡眼。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '418',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……仔细看的话，另一只手似乎是在被子里动着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '419',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊，主人～❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '420',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「来和%SELF_CALL\(TARGET\)%做H的事情了吗❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '421',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，H的事情，最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '422',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%，从被子里抽出了沾着晶亮液体的手指。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '423-424',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;妹抖服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '425',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+209[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '426',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊，主人欢迎回来～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '427',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一进屋，穿着妹抖服的%SAVESTR:TARGET%已经乖巧的站在一旁了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '428',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「您是先做H的事情呢，还是先做H的事情呢，还是说……想要做H的事情呢～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '429',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%，提起了裙子，露出了湿漉漉的下半身。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '430-431',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;晚礼服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '432',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+208[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '433',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，您来了呢❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+穿着礼服的%SAVESTR:TARGET%，静静的端坐在床上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '435',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '436',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这身衣服……有些想起以前的事情了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '437',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '438',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……和主人在一起，才是最开心的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '439',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「当然……还有H的事情❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '440',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%的小脸上，浮现出了满满的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '441-442',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;幼稚园服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '443',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+221[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '444',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜？这身衣服……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '445',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊～❤我知道了，主人是那个……诶多……萝莉控吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '446',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+原本就身材娇小的%SAVESTR:TARGET%，穿上幼稚园服并没有什么违和感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '447',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，我们来玩游戏吧～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '448',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「H的游戏❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '449',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+拉扯着%SAVESTR:MASTER%衣角的%SAVESTR:TARGET%，稚气未脱的小脸上满满的都是和年龄不符的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '450-451',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;项圈[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '452',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:42[ \t]+==[ \t]+71[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '453',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人的味道～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '454',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐，再多抱抱%SELF_CALL\(TARGET\)%嘛～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '455',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+带着项圈的%SAVESTR:TARGET%，宛如发情中的小动物，不停的朝着%SAVESTR:MASTER%撒娇。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+只是闻到%SAVESTR:MASTER%的味道，下半身就开始不由自主的变得湿漉漉了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '457',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这个样子，就像是主人的宠物一样呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '458',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「汪汪～想和主人交尾呢～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '459-460',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '460-461',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '462-463',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '463',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '464',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……主人，来做H的事情嘛～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '465',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+含着自己手指的%SAVESTR:TARGET%，就像小孩子和父母讨要甜食一般自然的说着色气满满的语句。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '466',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+仰视着%SAVESTR:MASTER%的眼睛里，仿佛可以看得见满满的桃心。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '468',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「想要主人的精液牛奶嘛……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '469-470',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的肉棒，最喜欢了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '470',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的肉棒，最喜欢了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '471',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今天也要和肉棒做H的事情呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '472',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%趴在%SAVESTR:MASTER%身上，在耳边吐出带着甜味的热气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '473',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+纤细的小手则沿着%SAVESTR:MASTER%的身体往下移，握住了粗大的肉棒，轻轻的套弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '475',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用主人的精液牛奶……把%SELF_CALL\(TARGET\)%的肚子里灌得满满的吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '476-477',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '477-478',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '478-479',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]+（衣服优先顺序，最后是项圈，全部结束后有戒指额外加[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '480',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '481-482',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;服分岐優先[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '484',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+FLAG:37[ \t]+!=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '486',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+131[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '487',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '488',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呼……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '489',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+进屋的时候，%SAVESTR:TARGET%似乎还在睡觉的样子……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '490',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呼……呼诶……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '491',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主……主人……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '492',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+正脱着她的衣服准备给她一个“惊喜”的时候刚好醒来的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '493',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜～真是的～不好好睡觉的话会长不高的哦～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '494',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「把%SELF_CALL\(TARGET\)%带过来的那个时候也是……呜～%SELF_CALL\(TARGET\)%真的会长不高的啦～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '495',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然这么说，但是并没有什么埋怨的意思在里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '496',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不如说……其实是在撒娇吧？[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '497-498',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '498',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '499',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+进屋的时候，%SAVESTR:TARGET%似乎刚刚睡醒的样子，揉着惺忪的睡眼。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '500',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶……主人……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '501',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……早安～……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '502',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人来找%SELF_CALL\(TARGET\)%了吗……好开心的说～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '503',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+仔细看看，刚睡醒稍稍有些乱的衣服和有些迷糊的样子显得更加诱人了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '504',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在没有受到任何反抗的情况下，轻松的把%SAVESTR:TARGET%按回了床上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '505',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……真H呢……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '506',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+呼吸着%SAVESTR:MASTER%味道的%SAVESTR:TARGET%，将自己全部身心都交给了主人……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '507-508',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;妹抖服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '509',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+209[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '510',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊，主人欢迎回来～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '511',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一进屋，穿着妹抖服的%SAVESTR:TARGET%已经乖巧的站在一旁了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '512',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「您是先吃饭呢，还是先洗澡呢，还是我呢……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '513',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的压着有些短的裙子，红着脸仰头看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '514',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+答案什么的一开始就只有一个吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '515-516',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;晚礼服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '517',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+208[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '518',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊，主人，您来了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '519',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+穿着礼服的%SAVESTR:TARGET%，静静的端坐在床上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '520',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然是个小孩子，毕竟也曾经是公主，多少还是有些贵族气质留在身上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '521',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这身衣服……有些想起以前的事情了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '522',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的脸上意外的露出了有些复杂的表情，不过很快就被红晕所取代。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '523',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……和主人在一起，才是最开心的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '524',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今后……也请多多指教呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '525',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「我的……王子大人……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '526-527',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;幼稚园服[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '528',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+221[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '529',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜？这身衣服……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '530',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然知道主人喜欢%SELF_CALL\(TARGET\)%这样的小孩子有点开心……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '531',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……呜……好害羞呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '532',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+原本就身材娇小的%SAVESTR:TARGET%，穿上幼稚园服并没有什么违和感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '533',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不过……只要主人喜欢的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '534-535',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;项圈[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '536',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:42[ \t]+==[ \t]+71[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '537',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈哇哇……这个……这个是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '538',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……好害羞的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '539',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……如果是主人的话……不讨厌呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '540',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+带着项圈的%SAVESTR:TARGET%依偎在%SAVESTR:MASTER%怀里撒着娇，就像一只小狗一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '541',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「总觉得……这样子的话，更加有种是主人的东西的感觉呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '542-543',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '543-544',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '545-546',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '547',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '548',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，您来了呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '549',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今天想要做什么呢？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '550',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要是主人想做的，%SELF_CALL\(TARGET\)%什么都没问题的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '551',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%仰着头微笑的看着%SAVESTR:MASTER%，眼里满满的都是爱意。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '552',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '553',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的味道呢……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '554',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还有……感觉得到主人的心跳声……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '555',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%把头靠在%SAVESTR:MASTER%身上，闭着眼睛轻轻的蹭着，用小手引导着%SAVESTR:MASTER%的手放在自己平坦的胸脯上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '556',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人也……感受到了吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '557',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+从手的那一端，确实的传来的小而有力的心跳声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '558',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过，连同这个，也都是全部都是属于%SAVESTR:MASTER%的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '559',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……最喜欢你了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '560-561',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……今天也来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '561',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……今天也来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '562',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「能得到主人的宠幸……%SELF_CALL\(TARGET\)%感觉很幸福的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '563',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「H的事情的话……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '564',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸上浮现出一层红晕，用细不可闻的的声音说完了后半句。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '565',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要和主人在一起，不管怎么样都觉得……很舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '566-567',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '567-568',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;結婚指輪[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '570',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%，紧紧的攥着纤细的手指上的戒指，目光则一直停留在%SAVESTR:MASTER%身上，小脸上满是幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '571-572',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '572-573',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '577',
        any: [/^(?:\uFEFF)?[ \t]*@K19_FUKU[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '579',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '580',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '581',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%不停的抽泣着，对脱衣服这件事完全没有抵抗。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '582',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+精神已经崩坏的她，对外界的刺激已经没有多少反应了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '583-584',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;着衣設定無しの場合は戻る[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '585',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:37[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '586-587',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;通常コスの上にまとうタイプ\(1～50\)があったら戻る[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '588',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:42[ \t]+<=[ \t]+50[ \t]+&&[ \t]+CFLAG:42[ \t]+!=[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '589-590',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;裸なら服を要求する[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '591',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(CFLAG:40[ \t]+&[ \t]+28\)[ \t]+==[ \t]+0[ \t]+&&[ \t]+CFLAG:41[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '593',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '594-595',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然因为害怕而脱光了衣服，但%SAVESTR:TARGET%仍然害怕的躲着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '595',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然因为害怕而脱光了衣服，但%SAVESTR:TARGET%仍然害怕的躲着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '597',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '598-599',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……一定要这样吗……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '599',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……一定要这样吗……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '600',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边轻轻抽泣着，一边不情愿的脱下了衣物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '602',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '603-604',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……非要……光着身子咩……有点冷的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '604',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……非要……光着身子咩……有点冷的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '606',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '607-608',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「脱衣服吗……呜……总觉得好害羞……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '608',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「脱衣服吗……呜……总觉得好害羞……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '609',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+脱掉了衣服的%SAVESTR:TARGET%，害羞的用手遮挡住重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '611',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '612-613',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……这样就可以了吗……主人……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '613',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……这样就可以了吗……主人……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '614',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%乖巧的脱光了衣服，仰着头看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '616',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '617-618',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶，主人想看%SELF_CALL\(TARGET\)%的身体吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '618',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶，主人想看%SELF_CALL\(TARGET\)%的身体吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '619',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……可以哟……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '620',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的有些脸红的看着%SAVESTR:MASTER%，积极的脱下了衣服。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '621',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]+&&[ \t]+CFLAG:42[ \t]+==[ \t]+92[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '623',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要和主人在一起的话……就算没有衣服也……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '624',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抚摸着戒指，露出了幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '625-626',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '627',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '628-629',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人真是H呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '629',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人真是H呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '630',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今天也……来做H的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '631',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+脱光光的%SAVESTR:TARGET%主动的贴了上来，用未发育完全的幼小身躯诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '632',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「是先从这里开始吗～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '634',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:5[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '635',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的手指搭在嘴唇上说着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '636',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:4[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '637',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用平坦的胸部轻轻的磨蹭着%SAVESTR:MASTER%的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '638',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '639',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%跨坐在%SAVESTR:MASTER%的大腿上，前后摩擦着阴蒂。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '640',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '641',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%满眼桃心的看着%SAVESTR:MASTER%，透明的爱液沿着大腿流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '642-643',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%引导着%SAVESTR:MASTER%的手摩擦着光滑的小屁股。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '643',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%引导着%SAVESTR:MASTER%的手摩擦着光滑的小屁股。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '644-645',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '645-646',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '646-647',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '647-648',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '654',
        any: [/^(?:\uFEFF)?[ \t]*@EVENTEND[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '656-657',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:179[ \t]+!=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '657-658',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:179[ \t]+!=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '661-662',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+BASE:0[ \t]+<=[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '668',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '669-670',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不……要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '670',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不……要……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '671',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+遍布着凌辱痕迹的%SAVESTR:TARGET%无助的趴在地上，眼泪止不住的流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '672-673',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;反抗刻印Lv3\+爱无\+淫乱無し[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '674',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '675-676',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……谁来……谁来……救救我吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '676',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……谁来……谁来……救救我吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '677',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抱着双脚坐在墙角不断的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '677-678',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抱着双脚坐在墙角不断的抽泣着。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '681',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+<=[ \t]+1[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '682-683',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「终于……结束了吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '683',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「终于……结束了吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '684',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+眼角挂着泪珠的%SAVESTR:TARGET%缩在床上，害怕的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '685',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在得到了确认的回答之后，才怯怯的开始用纸巾擦拭起自己的身体来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '685-686',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在得到了确认的回答之后，才怯怯的开始用纸巾擦拭起自己的身体来。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '689',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+2[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '690-691',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呼……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '691',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呼……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '692',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在被子里缩成一团，很快就睡着了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '693',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然在精神上已经完全服从%SAVESTR:MASTER%了，但是身体上毕竟还只是孩子，要适应调教似乎还需要一点时间……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '693-694',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然在精神上已经完全服从%SAVESTR:MASTER%了，但是身体上毕竟还只是孩子，要适应调教似乎还需要一点时间……[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '697',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+TALENT:85[ \t]+==[ \t]+0[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '698-699',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……呼啊……主人……您还……满意吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '699',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……呼啊……主人……您还……满意吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '700',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%大口大口的喘着气，皮肤上呈现出淡淡的红晕，因为快感时不时轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '701',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+渐渐的已经习惯了调教了的样子……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '702-703',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\(体力500以上\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '704',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+BASE:0[ \t]+>=[ \t]+500[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '705-706',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……今天的主人……似乎不在状态的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '706',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……今天的主人……似乎不在状态的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '707',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着手指，欲求不满的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '708',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「H的事情……还想做更多呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '709-710',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\(体力500未満\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '711',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+BASE:0[ \t]+<=[ \t]+500[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '712-713',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……❤主人……好厉害……❤嗯啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '713',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……❤主人……好厉害……❤嗯啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '714',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「舒服的……嗯……❤舒服的快要死掉了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '715',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%沉浸在完全不属于这个年龄的强烈快感中，小小的身体还是不是因为快感而颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '715-716',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%沉浸在完全不属于这个年龄的强烈快感中，小小的身体还是不是因为快感而颤抖着。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '719',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+BASE:0[ \t]+>=[ \t]+500[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '720-721',
        any: [
          /^(?:\uFEFF)?[ \t]*DRAWLINE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '721',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '722',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……身体不舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '723',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些担心的看着这边。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '724-725',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……您累了吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '725',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……您累了吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '726',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那样的话……请休息一下吧～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '727',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+之后枕着%SAVESTR:TARGET%的大腿休息了一段时间。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '728-729',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '729-730',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕\(体力500未満\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '731',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+BASE:0[ \t]+<=[ \t]+500[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '732',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……主人……呼啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '733',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抱着%SAVESTR:MASTER%，小小的身体时不时因为快感而颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '734',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……和主人做了H的事情呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '735',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「感觉……好开心的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '736',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着%SAVESTR:MASTER%的体温，%SAVESTR:TARGET%幸福的笑了起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '737',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]+&&[ \t]+CFLAG:42[ \t]+==[ \t]+92[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '739',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+依偎在%SAVESTR:MASTER%怀里的%SAVESTR:TARGET%，一直在抚摸着手中的戒指。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '740',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就好像……最珍贵的宝物一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '741-742',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '742-743',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '743-744',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '750',
        any: [/^(?:\uFEFF)?[ \t]*@KOJO_MESSAGE_COM_19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '753-754',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;口塞着用時には口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '756-757',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;失神時には口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '759-760',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;兽奸PLAY中は口上をスキップする。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '762-763',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;触手調教中は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '765-766',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;死斗场中は専用口上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '767',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:55[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '768-769',
        any: [
          /^(?:\uFEFF)?[ \t]*CALL[ \t]+COLOSSEUM_KOJO_19[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '769-770',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '770-771',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;崩坏した場合は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '772-773',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '782',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '784',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:301[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '786',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+MARK:2[ \t]+>=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '787',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '789-790',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……在摸哪里呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '790',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……在摸哪里呀……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '791',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……感觉，好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '792-793',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '793',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '794-795',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '796-797',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '798',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:301[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '799',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人的手指……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '800',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还要……更多……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '801',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%主动的迎合着%SAVESTR:MASTER%的动作，坦率的接受快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '802',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '804',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:301[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '805',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '806',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '807',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%充满爱意的看着%SAVESTR:MASTER%，感受着从身上传来的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '808',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '810',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:301[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '811',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '812',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '813',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被抚摸着的%SAVESTR:TARGET%因为快感而轻轻的喘息着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '814',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '816',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+2[ \t]+&&[ \t]+\(CFLAG:301[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '817',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……那里……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '818',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「感觉……好奇怪……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '819',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '821',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+<=[ \t]+1[ \t]+&&[ \t]+\(CFLAG:301[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '822',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜呜，在摸哪里呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '823',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啦……好，好痒呜呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '824',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:301[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '825-826',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '826-827',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '827-828',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '833',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '835',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:302[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '837',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '838',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，那，那里……不，不要舔呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '839',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无视%SAVESTR:TARGET%的话语，%SAVESTR:MASTER%毫不费力的分开了她的双脚。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '840',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+还不知男人为何物的小穴，在空气中轻轻的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '841-842',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，那，那里……不，不要舔呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '842',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，那，那里……不，不要舔呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '843',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无视%SAVESTR:TARGET%的话语，%SAVESTR:MASTER%毫不费力的分开了她的双脚。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '844-845',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '845',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '846-847',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '848-849',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '850',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:302[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '851',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯……主人……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '852',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯啊～好舒服的说～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '853',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的两手抱着自己的大腿分开来，将湿漉漉的下半身完全呈献给%SAVESTR:MASTER%，任由%SAVESTR:MASTER%的舌头在下半身舔弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '854',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '856',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:302[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '857',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶……要舔下面什么的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '858',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人真是的……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '859',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸看着%SAVESTR:MASTER%，分开自己的大腿。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '860',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「请慢用……的说……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '861',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '863',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:302[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '864',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……主人……请……温柔一点……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '865',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事……哈呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '866',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '868',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:302[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '869',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不可以……那里是……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '870',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些抗拒的用小手推搡着%SAVESTR:MASTER%的头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '871',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:302[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '872-873',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '873-874',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '874-875',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '880',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '882',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:303[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '883',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶，那，那里是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '884',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不行……！后面……不行……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '885',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+意外的受到了稍微激烈一点的抵抗。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '886',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过终归只是个小孩子罢了，这点抵抗完全没有起到任何作用。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '887',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '888-889',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '890-891',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:3[ \t]+\+[ \t]+UP:3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '891',
        any: [
          /^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:3[ \t]+\+[ \t]+UP:3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '893',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+>=[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '894',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……❤主人的手指……在里面呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '895',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……再多玩弄一下%SELF_CALL\(TARGET\)%的后面吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '896',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%主动的迎合着%SAVESTR:MASTER%的动作，透明的液体沿着%SAVESTR:MASTER%的手指滴下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '897',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '899',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+>=[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '900',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……呼嗯……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '901',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还想要……更多呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '902',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的肠壁不停的蠕动着，紧紧的吸着%SAVESTR:MASTER%的手指不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '903',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '905',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+<[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '906',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀，主人，真是粗暴呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '907',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是，这样也……很舒服哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '908',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '909',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……就是这样的体质吧……？[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '910',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '912',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+>=[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '913',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……后面……好舒服……呜呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '914',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，不行～感觉，要，要变得奇怪了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '915',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '917',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+>=[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '918',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '919',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「后面……很舒服的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '920',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的肠壁不停的蠕动着，紧紧的吸着%SAVESTR:MASTER%的手指不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '921',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '923',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+P[ \t]+<[ \t]+PALAMLV:2[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '924',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……主人……请，请温柔一点的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '925',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「稍微……有点……难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '926',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然有些缺少润滑，但是感受到快感的肠壁却仍然积极的回应着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '927',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……就是这样的体质吧……？[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '928',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '930',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+>=[ \t]+PALAMLV:2[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:303[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '931',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……虽然很害羞……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '932',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「可是……好舒服呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '933',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着从屁股传来的异样的快感，%SAVESTR:TARGET%忍不住动起腰迎合起手指来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '934',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '936',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:303[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '937',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……感觉……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '938',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着屁股传来的异样的感觉，%SAVESTR:TARGET%带着哭腔轻轻哀求着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '939',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:303[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '940-941',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '941-942',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '942-943',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '948',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '950',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:304[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '951',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……？自……慰……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '952',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「……诶诶？！自己做那种事？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '953',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……对这些事情真的是完全不明白的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '954',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '955-956',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '957-958',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '959',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:304[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '960',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……H的事情……好舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '961',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐，主人，再来做更多H的事情嘛～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '962',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，%SELF_CALL\(TARGET\)%知道的哟，进到肚子里面的话，会更加舒服的吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '963',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '964',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '965',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '967',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:31[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:304[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '969',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '970',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……摩擦小豆豆的话……就会……很舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '971',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，都是主人教给我的哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '972',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的手指在下半身摩擦着，隐约的传来了淫靡的水声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '973-974',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……❤嗯……❤哈……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '974',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……❤嗯……❤哈……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '975',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着手指，另一只手在幼穴上不停摩擦着，透明的爱液沿着白嫩的大腿流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '976',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「H的事情……喜欢……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '977-978',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+8[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '978',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '980',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:304[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '981',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……主人……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '982',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「是……这样吗……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '983',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%纤细的手指分开湿漉漉的幼穴，中指还在不断的磨蹭着阴蒂。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '984',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+从不断流出爱液的小穴中，隐约可以看见粉嫩的处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '985',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……H的事情……更进一步也没问题的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '986',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '988',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:31[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:304[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '990',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '991',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '992',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+想象着自己的手指是%SAVESTR:MASTER%的%SAVESTR:TARGET%，满脸痴态的玩弄着自己的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '993',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯……最喜欢你了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '994-995',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽说是因为主人的命令……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '995',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽说是因为主人的命令……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '996',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是小豆豆……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '997',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%摇动着纤细的腰部，摩擦着自己幼小的下半身。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '998-999',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '999',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1001',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:304[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1003',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1004',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶，自己……H？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1005',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……真是的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1006',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些害羞的在%SAVESTR:MASTER%面前玩弄着自己尚未发育成熟的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1007-1008',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要看啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1008',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要看啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1009',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%眼角挂着泪珠，在%SAVESTR:MASTER%的命令下玩弄着自己的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1010-1011',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1011',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1013',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:304[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1015',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1016',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……讨厌……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1017',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻抽泣着，因害怕%SAVESTR:MASTER%的淫威而不得不照做，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1018-1019',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……感觉……手指好酸哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1019',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……感觉……手指好酸哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1020-1021',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1021',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:304[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1022-1023',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1023-1024',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1024-1025',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1030',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1032',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:306[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1033',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+\|\|[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1034',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜……主人……好，好痒啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1035',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着柔软而小巧的胸部，%SAVESTR:MASTER%坏笑着加大了动作的力度……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1037-1038',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为，为什么要摸这种地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1038',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为，为什么要摸这种地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1039',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1040-1041',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1041',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1042-1043',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1044-1045',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1046',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:306[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1047',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……呀……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1048',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……好舒服……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1049',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠在%SAVESTR:MASTER%怀里轻轻的喘息着，皮肤微微泛着潮红。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1050',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1051',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:130[ \t]+	;母乳体质[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1052',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1053',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，%SELF_CALL\(TARGET\)%也有牛奶给主人喝呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1054-1055',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1055',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1057',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:306[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1058',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……玩弄胸部什么的……主人会开心吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1059',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然%SELF_CALL\(TARGET\)%的胸部很小……但是主人喜欢的话，不管多少次都可以……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1060',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠在%SAVESTR:MASTER%怀里轻轻的喘息着，皮肤微微泛着潮红。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1061',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的手掌轻易的包住了几乎毫无起伏的小小胸部，手指不断蹂躏着因为快感而硬起来的小草莓。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1062',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:130[ \t]+	;母乳体质[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1063',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+在不断的快感刺激下，乳头尖端缓缓分泌出乳汁来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1064',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……感觉好害羞哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1065-1066',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1066',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1068',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:1[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:306[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1069',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀，胸部什么的……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1070',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……感觉……好奇怪呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1071',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着胸部传来的快感，%SAVESTR:TARGET%的身体微微的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1072',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然嘴上说着不要，但是感受的快感的乳头已经诚实的硬了起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1073',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1075',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:306[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1076',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜……不，不要……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1077',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:MASTER%的怀里挣扎着，不过这只是徒劳的让揉捏的力度增大罢了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1078',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1079-1080',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1080-1081',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1081-1082',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1087',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1089',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:307[ \t]+==[ \t]+0[ \t]+&&[ \t]+TFLAG:13[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1091',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ASSIPLAY[ \t]+==[ \t]+0[ \t]+&&[ \t]+TEQUIP:89[ \t]+==[ \t]+0[ \t]+&&[ \t]+TEQUIP:90[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1092',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……嗯……哈……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1093',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%和%SAVESTR:MASTER%的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1094',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……啾嗯……kiss什么的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1095',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人喘息着分开嘴唇，唾液拉出一条长长的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1096',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嘴巴……原来可以这么舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1098',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ASSIPLAY[ \t]+==[ \t]+0[ \t]+&&[ \t]+TEQUIP:89[ \t]+==[ \t]+0[ \t]+&&[ \t]+TEQUIP:90[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1099',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……哈呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1100',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管最初有些不适应，但%SAVESTR:TARGET%很快就将身体完全的交给了%SAVESTR:MASTER%，任由对方的舌头在自己嘴里动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1101',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……啾嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1102',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人喘息着分开嘴唇，唾液拉出一条长长的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1103',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……%SELF_CALL\(TARGET\)%现在……很幸福的说……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1105-1106',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……哈……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1106',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……哈……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1107',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无法对抗%SAVESTR:MASTER%力量的%SAVESTR:TARGET%被强行的夺走了初吻。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1108-1109',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1109',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1110-1111',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;（調教では）初めて[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1112',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:307[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1114',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1115',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……嗯……哈……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1116',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%和%SAVESTR:MASTER%的嘴唇重叠在一起，舌头相互纠缠着，唾液不断的滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1117',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……啾嗯……kiss什么的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1118',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人喘息着分开嘴唇，唾液拉出一条长长的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1119',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……kiss……还要……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1121',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1122',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……哈呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1123',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管最初有些不适应，但%SAVESTR:TARGET%很快就将身体完全的交给了%SAVESTR:MASTER%，任由对方的舌头在自己嘴里动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1124',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……啾嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1125',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人喘息着分开嘴唇，唾液拉出一条长长的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1126',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……最喜欢你了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1128-1129',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……哈……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1129',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……哈……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1130',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无法对抗%SAVESTR:MASTER%力量的%SAVESTR:TARGET%被舌头强行的撬开了嘴巴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1131-1132',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1132',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1133-1134',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1135-1136',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1137',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:307[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1138',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……❤啾……❤嗯哈……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1139',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%仰着头，小小的舌头贪图着快感，和%SAVESTR:MASTER%的舌头纠缠在一起。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1140',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……啾嗯……kiss……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1141',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的kiss……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1142',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1144',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:307[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1145',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……和主人……接吻了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1146',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%捧着%SAVESTR:TARGET%的小脸，肆意的享受着柔软的小嘴和舌头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……总感觉……脑子里一片空白呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1148',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+沉醉在和%SAVESTR:MASTER%接吻的快感中的%SAVESTR:TARGET%，望过来的眼神中满溢着幸福。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1149',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1151',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:10[ \t]+>=2[ \t]+&&[ \t]+\(CFLAG:307[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1152',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「kiss……吗……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1153',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%认命的闭上眼睛，有些害怕的等待着%SAVESTR:MASTER%接下来的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1154',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1155',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1157',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:307[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1158',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……啾……嗯呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1159',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%捏住脸颊强吻的%SAVESTR:TARGET%眼角挂着泪珠，默默的承受着侵入到小嘴里的舌头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1160',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:307[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1161-1162',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1162-1163',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1163-1164',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1169',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1171',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:308[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1173',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1174',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……小穴里面……主人也要看吗❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1175',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微的喘着气，用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1176',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1177',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在小穴里还能看见薄薄的处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1178',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……快点……把%SELF_CALL\(TARGET\)%的第一次拿走吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1179-1180',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1181',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1182',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……让主人看里面什么的……好害羞……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1183',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……是主人的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1184',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1185',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1186',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在小穴里还能看见薄薄的处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1187',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……那个……第一次……还请……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1188-1189',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1190-1191',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……讨……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1191',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……讨……讨厌……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1192',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的泪水在眼睛里打转转，不情愿的微微分开了小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1193-1194',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:308[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1194',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:308[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1195-1196',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1197-1198',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1199',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:308[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1199-1226',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:308[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……小穴……想要主人的肉棒呢……❤」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽说是命令，但是%SAVESTR:TARGET%积极的分开小穴，主动诱惑着%SAVESTR:MASTER%。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「就这样子……把肉棒从这里……咕啾咕啾的插进去吧❤」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+5[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:308[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1200',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……小穴……想要主人的肉棒呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1201',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽说是命令，但是%SAVESTR:TARGET%积极的分开小穴，主动诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1203',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「就这样子……把肉棒从这里……咕啾咕啾的插进去吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1204',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1206',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:308[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1207',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「自己分开什么的……呜……好羞耻……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1208',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……对象是主人的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1209',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1210',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1211',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在小穴里还能看见薄薄的处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1212',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「是主人的话……就没问题……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1213-1214',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1214',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1216',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:17[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:308[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1217',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……主人……真是H……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1218',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……被人看着这里什么的……不讨厌呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1219',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1220',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小穴微微的颤抖着，流出少许透明的爱液……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1221',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1223',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:306[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1224',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……讨厌……不要看……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1225',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻抽泣着，不情愿的微微分开了小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1226',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:306[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1227-1228',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1228-1229',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1229-1230',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1235',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1237',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:309[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1239',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1240',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的手指……嗯……❤嗯呀……❤好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1241',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1243',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1244',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的手指……在里面……呜……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1245',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的壁肉紧紧的包裹着手指，在刺激下不断的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1247-1248',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……手指……进……进到身体里面了……？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1248',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……手指……进……进到身体里面了……？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1249',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……讨，讨厌……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1250-1251',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1251',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1252-1253',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1254-1255',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1256',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:309[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1257',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人的手指……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1258',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还想要……更多一点……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1259',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%积极的摇动着纤细的腰部，贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1260',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1261',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:309[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1262',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……嗯哈……呀……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1263',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的……手指……嗯呼……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1264',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着%SAVESTR:MASTER%手指带来的快感，不时的漏出H的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1265',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1267',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:309[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1268',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……我，我会乖乖的……主人……轻一点……嗯呀！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1269',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1271',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:309[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1272',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……好难受……把手指拿出去……求求你……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1273',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:309[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1274-1275',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1275-1276',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1276-1277',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1282',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1284',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:310[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1286',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1287',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊啊……❤那里是……嗯呀～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1289',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1290',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……那里……很脏的……不可以舔～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1292-1293',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌，为什么要舔那种地方……不，不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1293',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌，为什么要舔那种地方……不，不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1294-1295',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1295',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1296-1297',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1298-1299',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+尻穴狂[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1300',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:310[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1301',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊啊……❤呜呀……❤呼啊啊，好舒服，好舒服嗯呜～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1302',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着从屁股传来的异常强烈的快感，%SAVESTR:TARGET%张着嘴大口的喘着气，呼出女孩子甘甜的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1303',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1304',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1306',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:310[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1307',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的舌头……在屁股里面……嗯啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1308',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……好，好舒服呜❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1309',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着从屁股传来的快感，%SAVESTR:TARGET%发出了稚嫩而色气的喘息声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1310',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1311',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1313',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:310[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1314',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……❤主人……哈啊……主人的舌头……嗯啊啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1315',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那里……嗯……屁股……好，好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1316',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着从屁股传来的异常强烈的快感，%SAVESTR:TARGET%张着嘴大口的喘着气，呼出女孩子甘甜的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1317',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的舌头在壁肉上不断的滑动着，肆意的品尝着幼女雏菊的味道。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1318',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1320',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:310[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1321',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人的舌头……在屁股里……好害羞……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1322',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……如果是主人的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1323',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的咬着手指，感受着%SAVESTR:MASTER%的舌头，时不时轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1324',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1326',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:310[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1327',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人这个变……呜……什，什么都……没有……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1328',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1330',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:310[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1331',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……变态……不要嗯嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1332',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:310[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1333-1334',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1334-1335',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1335-1336',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1341',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+10[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1343',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:311[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1345',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1346',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……这个是……什么……好……舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1348',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1349',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呜呜……这个……呜……动的好厉害……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1351-1352',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜？！这，这是什么……动的好厉害……呀……感觉……好奇怪……不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1352',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜？！这，这是什么……动的好厉害……呀……感觉……好奇怪……不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1353-1354',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1354',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1355-1356',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1357-1358',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1359',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:311[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1360',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……❤这个宝石……不停的在动呢❤那里……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1361',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%扶着%SAVESTR:MASTER%的身体，以自己的身体压在宝石上，贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1362',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1364',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:311[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1365',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……这个……好刺激……嗯呜……主人……稍微……嗯呀❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1366',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在快感的刺激下%SAVESTR:TARGET%露出了有些恍惚的神情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1367',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1369',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:311[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1370',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯……呀……啊呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1371',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体不停的颤抖着，拼命忍受着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1372',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1374',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:311[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1375',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿呀……什么……这是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1376',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着陌生快感的幼小身体本能的抗拒着%SAVESTR:MASTER%的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1377',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:311[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1378-1379',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1379-1380',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1380-1381',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1387',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+11[ \t]+&&[ \t]+TEQUIP:11[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1389',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:312[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1391',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1393',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1394',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然第一次不是主人有些可惜，但是虫子的话，应该也会很舒服的吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1396',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1397',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……如，如果这是主人希望的话……%SELF_CALL\(TARGET\)%……就算是虫子也……没问题的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1399-1400',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……不要不要不要啊……！虫子什么的……好可怕……好可怕……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1400',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……不要不要不要啊……！虫子什么的……好可怕……好可怕……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1401',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+蠕虫不顾哀求，粗暴的贯穿了薄薄的处女膜，象征着处女的鲜血从缝隙中流出……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1402-1403',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1404-1405',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1406',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1407',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈❤肚子里面，要被虫子桑弄得乱七八糟了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1409',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1410',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「要被这种东西……进到肚子里面去吗……虽然很可怕……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1411',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的眼里，隐约的有一股期待。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1413-1414',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……要被这种东西……钻到肚子里面……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1414',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……要被这种东西……钻到肚子里面……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1415',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+蠕虫粗暴的贯穿了幼穴，撑开了窄小的肉壁。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1416-1417',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1417-1418',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1418',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1419-1420',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1421-1422',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1423',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:312[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1424',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀❤肚子里面……被虫子桑这样子玩弄……嗯哈❤要变得……奇怪了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1425',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的脸上露出了和年龄完全不符的淫乱的表情，率直的接受着蠕虫带来的巨大快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1426',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1428',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:312[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1429',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀……嗯……肚子里面……呜……要，要坏掉了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1430',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+蠕虫在稚嫩的腔穴中不断蠕动着，仿佛要将它捅穿一般。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1431',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1433',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:312[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……明明是……这种东西……但是……感觉……呜……不坏的样子……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1435',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%咬着手指忍耐着，时不时漏出满载着色气的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1436',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1438',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:312[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1439',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……呼啊……肚……肚子里面……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1440',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%大口的喘着气，拼命的忍受着肚子里的异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1441',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:312[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1442-1443',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1443-1444',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1444-1445',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;脱着時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1446',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+11[ \t]+&&[ \t]+TEQUIP:11[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1448',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:372[ \t]+<[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1449',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……啊哈……这样就可以了吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1450',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「接下来就是主人的肉棒了吗❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1451',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%期待的看着%SAVESTR:MASTER%，不知是爱液还是什么的透明液体沿着小穴滴落，和地面连成一条细长的银线。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1452',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:372[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1454',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:372[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1455',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呼……已经……结束了吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然……那个……并不讨厌……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1457',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「果然还是主人的……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1458',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%满怀着爱意的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1459',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:372[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1461',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:372[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1462',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……哈……结束……了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1463',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些失神的看着拔出来的蠕虫，小穴微微的开合着，似乎在期待接下来的东西。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1464',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:372[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1466',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:372[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1467',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……终于……结束了……吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1468',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着，眼泪顺着脸颊流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1469',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:372[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1470-1471',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1471-1472',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1477',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+12[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1479',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:313[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1481',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1482',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……❤这个……在动个不停……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1484',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1485',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……那里……被这个刺激着……感觉……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1487-1488',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……讨厌……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1488',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……讨厌……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1489-1490',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1490',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1491-1492',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1493-1494',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1495',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:313[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1496',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀～❤在那里……这样子动的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1497',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～❤这个……好厉害呜～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1498',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%彻底沉醉在快感中，爱液不断的沿着大腿流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1499',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1501',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:313[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1502',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿呀……那里……被这个压着……感觉……呜……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1503',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在快感的刺激下%SAVESTR:TARGET%露出了有些恍惚的神情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1504',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1506',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:313[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1507',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……被这种东西弄……舒服什么的……才……没有……嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1508',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%咬着牙，努力的忍受着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1509',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1511',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:313[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1512',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……这种东西……呜……不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1513',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:313[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1514-1515',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1515-1516',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1516-1517',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1523',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+13[ \t]+&&[ \t]+TEQUIP:13[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1525',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:314[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1527',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1528',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤后面要被虫子桑弄得乱七八糟了呢，诶嘿嘿，好期待的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1530',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1531',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股那里……也会被弄的很舒服吗？舒服的事情的话，最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1533',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1534',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……虽然……虫子什么的……感觉有点可怕……但是如果要把屁股弄的很舒服的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1536',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1537',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人想的话……%SELF_CALL\(TARGET\)%也……愿意哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1539-1540',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1540',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1541',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……好可怕……屁股会坏掉的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1542',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然这么哀求着，幼小的菊穴却很简单的吞纳了粗大的蠕虫……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1543-1544',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……好可怕……屁股会坏掉的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1544',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……好可怕……屁股会坏掉的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1545',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不顾哀求和肉壁的抵抗，蠕虫强硬的插入了紧窄的雏菊中……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1546-1547',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1547-1548',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1548',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1549-1550',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1551-1552',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+尻穴狂[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1553',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1554',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～❤屁股，舒服的……嗯呼❤舒服的要……死掉了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1555',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虫子桑，再……激烈一些……也……可以的呐❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1556',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+沉溺在快感中的%SAVESTR:TARGET%扭动着纤细的腰部，一次又一次的迎合着蠕虫的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1557',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1559',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1560',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊❤屁股被虫子桑侵犯什么的……感觉不坏呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1561',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好舒服……呼啊……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1562',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被蠕虫侵犯着的%SAVESTR:TARGET%，直率的接受着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1563',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1565',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1566',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈嗯嗯……蠕虫桑……进来了……呜嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1567',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的身体轻轻的颤抖着，感受着侵入到体内的异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1568',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……在里面……咕啾咕啾的……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1569',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1571',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1572',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……屁股里面……被这种东西侵犯什么的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1573',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然……好讨厌……但是……呜……好舒服……不，不想要……停下来……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1574',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被蠕虫侵犯着的%SAVESTR:TARGET%，轻轻的咬着手指，似乎在做着心理斗争。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1575',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1577',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1578',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜～屁股里面……这样子动的话……不，不可以❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1579',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被蠕虫侵犯着屁股的%SAVESTR:TARGET%，露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1580',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子，要坏掉，要坏掉了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1581',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1583',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1584',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……虽然有点可怕……但是是主人的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1585',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的放松身体，以便蠕虫插入。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1586',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕……哈呜呜……肚子里……呜……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1587',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1589',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:314[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1590',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……讨厌……要被这种东西进到身体里什么的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1591',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……肚子里面……进来了呜……！讨厌……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1592',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+蠕虫强硬的插入了已经渐渐习惯了调教的雏菊中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1593',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1595',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:314[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1596',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种东西……不要啊……求求你……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1597',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无视幼女的哀求，蠕虫强硬的插入了雏菊中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1598',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:314[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1599-1600',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1600-1601',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1601-1602',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;脱着時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1603',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+13[ \t]+&&[ \t]+TEQUIP:13[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1605',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:374[ \t]+<[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1606',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶，就结束了吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1607',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「再继续也没问题哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1608',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1610',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:374[ \t]+<[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1611',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……屁股里面……被弄的乱七八糟了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1612',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1614',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:374[ \t]+<[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1615',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「明明……这种事情……讨厌的说……但是……呜……不想……停下来……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1616',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1618',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:374[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1619',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……这样子结束了什么的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1620',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「稍稍有点……啊呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1621',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1623',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:374[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1624',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……已经……结束了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1625',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「（还想要什么的……说不出口呜……）」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1626',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1628',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:374[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1629',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……终于……结束了吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1630',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1631',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:374[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1632-1633',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1633-1634',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1640',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+14[ \t]+&&[ \t]+TEQUIP:14[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1642',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:315[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1644',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1645',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯……呼呀……！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1646',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这个是……什么……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1647',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着从阴蒂传来的强烈刺激感，发出了色气满满的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1649',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1650',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……这是什么……呜嗯……感觉……那里……呼啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1651',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着未知的快感，%SAVESTR:TARGET%轻轻的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1653-1654',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……这种东西……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1654',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……这种东西……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1655',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抓住双手的%SAVESTR:TARGET%毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1656-1657',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:315[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1657',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:315[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1658-1659',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1660-1661',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1662',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:315[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1663',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊，小豆豆被这种东西……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1664',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「震个不停什么的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1665',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:315[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1667',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:315[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1668',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种东西……不停的在那里震动着……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1669',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……感觉……要变得奇怪了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1670',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:315[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1672',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:315[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1673',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕呜……求求你……快……住手吧……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1674',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抓住双手的%SAVESTR:TARGET%毫无反抗之力，只能被动的感受着下半身传来的奇妙感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1675',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:315[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1676-1677',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1677-1678',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1678-1679',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;脱着時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1680',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+14[ \t]+&&[ \t]+TEQUIP:14[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1682',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:375[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1683',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……这样就……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1684',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「接下来是主人了吗？❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1685',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:375[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1687',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:375[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1688',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……哈啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1689',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%大口大口的喘着气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1690',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:375[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1692',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:375[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1693',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1694',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:375[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1695-1696',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1696-1697',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1703',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+15[ \t]+&&[ \t]+TEQUIP:15[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1705',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:316[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1707',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1708',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～胸部被……这样子刺激……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1709',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好棒，好舒服呜❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1711',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1712',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……胸部……感觉……好奇怪呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1714-1715',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……不要……嗯呀～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1715',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……不要……嗯呀～」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1716-1717',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:316[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1717',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:316[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1718-1719',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1720-1721',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1722',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:316[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1723',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……这个……好舒服嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1724',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:316[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1726',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:316[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1727',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊……主人……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1728',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%眼神朦胧的看着%SAVESTR:MASTER%，透明的唾液从嘴角滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1729',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:316[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1731-1732',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呜呜……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1732',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呜呜……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1733',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸感受着从胸部传来的奇怪感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1734',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:316[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1735-1736',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1736-1737',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1737-1738',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;脱着時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1739',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+15[ \t]+&&[ \t]+TEQUIP:15[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1741',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:376[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1742',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……快点……来做更多H的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1743',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:376[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1745',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:376[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1746',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯嗯……主人……请……继续……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1747',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:376[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1749',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:376[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1750',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……奇怪的东西……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1751',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:376[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1752-1753',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1753-1754',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1754-1755',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1759',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+19[ \t]+&&[ \t]+TEQUIP:19[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1761',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:320[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1763',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1764',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀？！这是……什么……感觉……好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1766',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1767',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀，屁股里面……进来了……这个……超级舒服的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1769',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1770',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……屁股要变得奇怪了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1772-1773',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啊……这种东西……看着就觉得很奇怪呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1773',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要啊……这种东西……看着就觉得很奇怪呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1774-1775',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1775',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1776-1777',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1778-1779',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋尻穴狂[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1780',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1781',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……屁股里面……感觉……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1782',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着异常的快感的%SAVESTR:TARGET%露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1783',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……不要……停下来嗯❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1784',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1786',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1787',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……这个……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1788',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，来做更多舒服的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1789',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%摇动着可爱的小屁股诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1790',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1792',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1793',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……进，进来了……屁股里面……一个一个的……呜呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1794',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事……明明……很讨厌的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1795',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%眼角挂着泪珠，发出了有些色气的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1796',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1798',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==1[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1799',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……请……更多的……呜……玩弄……%SELF_CALL\(TARGET\)%吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1800',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸用纤细的小手分开菊穴，感受着肛珠被一颗一颗塞进去的异样的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1801',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1803',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1804',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……嗯呀……请……呜……主人……请……温柔……嗯哈……一点……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1805',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毫无保留的吞入肛珠的%SAVESTR:TARGET%感受着从屁股传来的快感，轻轻的娇喘着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1806',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1808',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:320[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1809',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……呜呀……感觉……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1810',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么说着的%SAVESTR:TARGET%，发出了有些色气的娇喘声……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1811',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1813',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:320[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1814',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……不要啊……求求你……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1815',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%压住的%SAVESTR:TARGET%连稍微的抵抗都做不到，只能徒劳的哀求着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1816',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:320[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1817-1818',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1818-1819',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1819-1820',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;脱着時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1821',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+19[ \t]+&&[ \t]+TEQUIP:19[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1823',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:379[ \t]+<[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1824',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……不要停下来……想被更多的……玩弄屁股的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1825',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1827',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:379[ \t]+<[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1828',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊……这个……好舒服……哈啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1829',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1831',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:379[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1832',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……拔出来……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1833',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小声的请求着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1834',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1836',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:379[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1837',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……感想吗……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1838',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……很……舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1839',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸说这。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1840',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1842',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:379[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1843',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……明明……讨厌这种事……为什么……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1844',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1846',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:379[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1847',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1848',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:379[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1849-1850',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1850-1851',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1856',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1858',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:321[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1860',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1862',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1863',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……主人的那个……进来了……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1864',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%眼角挂着泪珠，未发育的小穴被肉棒强硬的破开。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1865',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……虽然……有点痛……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1866',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「很快就……舒服起来了……呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1867',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐……主人……请……继续吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1868',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%魅惑的看着%SAVESTR:MASTER%，小脸上浮现出和年龄完全不符的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1870',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1871',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜咕……呀……进……来了……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1872',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%咬着手指，拼命忍受着第一次的痛处，小小的身体像触电一样不停颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1873',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……%SELF_CALL\(TARGET\)%……完全……没……问题的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1874',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子……%SELF_CALL\(TARGET\)%就……彻底……是主人的东西了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1875',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管眼泪在眼眶里打转转，痛连说话的声音都有些颤抖。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1876',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+但是%SAVESTR:TARGET%的脸上，满满的是幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1878-1879',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1879',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛……！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1880',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「求求你……不要……快住手……好痛……好痛呜呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1881',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%发出了稚气的悲鸣声，在房间里回荡着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1882',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被强行贯穿的幼穴，感受着强烈的刺激，拼命的排斥着异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1883',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着异常紧致的小穴的%SAVESTR:MASTER%，毫不怜惜的开始动起腰来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1884-1885',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1886-1887',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1888',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1889',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……主人的那个……好大……塞的满满的呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1890',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐，主人，请用肉棒，把%SELF_CALL\(TARGET\)%的小穴，咕啾咕啾的弄的一塌糊涂吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1892',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1893',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……进……来了呢……肚子里面……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1894',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%压倒在身下的%SAVESTR:TARGET%，羞红着脸，急促的呼吸着，吐出带着甜味的热气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1895',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「请……主人……随意使用……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1897-1898',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……咕……好难受……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1898',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……咕……好难受……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1899',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不顾%SAVESTR:TARGET%带着哭腔的哀求，%SAVESTR:MASTER%肆意的用肉棒蹂躏着身下娇弱的幼女。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1900-1901',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1901-1902',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1902',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1903-1904',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1905-1906',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1907',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1909',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1910',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1911',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈啊……肚子里面……嗯……好舒服……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1912',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「果然H什么的……好喜欢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1913',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好想就这样一直和主人做下去呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1914',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的搂着%SAVESTR:MASTER%不放，淫乱的幼穴贪图着快感，紧紧的吸着肉棒不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1915',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1916',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……那里……又被……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1917',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被一次次顶到最深处的%SAVESTR:TARGET%，露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1918',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「被主人的肉棒侵犯什么的，H的事情，最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1919',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，请对%SELF_CALL\(TARGET\)%做更多H的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1920',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+还没有发育成熟的稚嫩的肉体，已经完全的沉溺在肉欲之中了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1921-1922',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊啊❤肉棒……在小穴里面……咕啾咕啾的……嗯❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1922',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊啊❤肉棒……在小穴里面……咕啾咕啾的……嗯❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1923',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抓着床单，被你压在身下，不断的被抽送着，下半身随着动作发出淫靡的水声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1924',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……还要……还要更多的……被主人的肉棒……这样子……哈啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1925',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼嫩的肉穴积极的回应着粗暴的抽送，期待着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1926-1927',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1928',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1929',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……主人的那个……好大……塞的满满的呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1930',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的小穴紧紧的吸着肉棒不放，不断的蠕动着按摩着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1931',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「被这样子侵犯……总觉得……要变得奇怪了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1932',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，因为太舒服了，所以也是没办法得事嘛❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1933',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所以……请主人……好好的侵犯%SELF_CALL\(TARGET\)%的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1934',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的含着手指，用稚气的声音说着和外表完全不符的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1936-1937',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……肉棒在那里咕啾咕啾的抽送……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1937',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……肉棒在那里咕啾咕啾的抽送……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1938',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被压在身下侵犯的%SAVESTR:TARGET%，发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1939',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+紧窄的小穴不断的分泌着爱液，让抽送变得更加顺利。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1940',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「就这样子一直做下去……感觉也不坏呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1941-1942',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1942',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1944',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1946',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1947',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1948',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊啊……主人……不，不要……停下来……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1949',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的小穴……已经……没有那个就活不下去了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1950',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……主人以外的……不想……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1951',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「所以……主人……哈啊……求求你……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1952',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「想更多的……和主人……在一起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1953',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1954',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯呀……%SELF_CALL\(TARGET\)%……没问题的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1955',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%的脖子，将自己的身体完全的交给了对方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1956',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「因为……被主人的那个……做H的事情什么的……很舒服嘛……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1957',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐……主人……请更加……疼爱%SELF_CALL\(TARGET\)%一些吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1958',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被顶到最深处，不自觉漏出了快乐的声音的%SAVESTR:TARGET%，满眼桃心的望着压在自己身上的%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1959',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的身体……就是为主人……呼啊……而存在的呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1960-1961',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜啊啊……主人……这么激烈……的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1961',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜啊啊……主人……这么激烈……的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1962',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%……会……嗯……坏掉的啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1963',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的身体在%SAVESTR:MASTER%身下因为快感而不住的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1964',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+两只小脚在半空中摇晃着，时不时拍打在%SAVESTR:MASTER%的背上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1965-1966',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1967',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1968',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……主人……请……请温柔……一点……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1969',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%毫不费力的抓住%SAVESTR:TARGET%的双脚大大分开，用粗大的肉棒在幼穴中粗暴的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1970',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被反复调教过的小穴虽然尚未发育成熟，但却紧紧的吸着肉棒不放，无视着主人的意志贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1971',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……哈呜……那里……被……这样子……嗯呀❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1972',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%闭着眼睛，嘴角挂着泪珠，随着%SAVESTR:MASTER%的动作一下一下的被推动着，发出了色气的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1974-1975',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜～主人，太激烈，太激烈了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1975',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜～主人，太激烈，太激烈了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1976',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着%SAVESTR:TARGET%纤细的腰部，一下一下的冲撞着最深处。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1977',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……小穴被主人这样子……侵犯……塞得满满的……嗯呀～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1978',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+时不时漏出可爱的声音的%SAVESTR:TARGET%，更加的激发了%SAVESTR:MASTER%的兽欲。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1979',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚嫩的肉壁深处传来的吸力，不断的为肉棒送去更大的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1980-1981',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1981',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1983',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:321[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1984',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……请……主人……呜……随意……使用……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1985',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着%SAVESTR:MASTER%的肉棒一次次的侵入自己身体的%SAVESTR:TARGET%，不时的用稚气的声音发出可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1986',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼穴似乎已经渐渐习惯了粗大的肉棒，开始积极的回应起%SAVESTR:MASTER%来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1987',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1989',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:321[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1990',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……请……主人……随意……使用……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1991',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%拼命的忍耐着异物感，任由%SAVESTR:MASTER%的肉棒在自己未发育成熟的下半身抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1992',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1994',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:321[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1995',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……不……要……呼呀……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1996',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%无视着%SAVESTR:TARGET%的哀求，毫不怜惜的用肉棒蹂躏着未成年的幼穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1997',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:321[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '1998-1999',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '1999-2000',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2000-2001',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2006',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+21[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2008',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:322[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2010',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2012',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2013',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「第一次要被这样子拿走什么的，这个姿势简直像是小狗狗一样呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2014',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一边这么说着，%SAVESTR:TARGET%吐着可爱的小舌头，轻轻的叫了两声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2015',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%像抚摸宠物一样的摸了摸%SAVESTR:TARGET%的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2016',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呀……❤主人的肉棒……进来了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2017',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尽管是第一次被肉棒插入，被%SAVESTR:MASTER%调教出来的这副淫乱的幼小躯体却紧紧的吸住肉棒不放，不停贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2019',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2020',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%从背后握着纤细的腰部，一口气贯穿了处女膜。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2021',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小小的身体因为破处的痛楚而不停的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2022',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然是初经人事，柔软的肉壁却不停的按摩着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2023',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……肚子里……主人……进来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2024',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然很痛……但是……这样%SELF_CALL\(TARGET\)%就……和主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2025',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……%SELF_CALL\(TARGET\)%没问题的……所以……请尽情的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2026',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%摸了摸%SAVESTR:TARGET%的头，仿佛像抚摸着宠物一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2027',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……诶嘿嘿……被主人摸头了呢……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2028',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+居高临下的看着身下像幼犬一样温顺可爱的%SAVESTR:TARGET%，俯下身去开始用肉棒肆意侵犯起娇嫩的幼穴来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2030-2031',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……你要做什么……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2031',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……你要做什么……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2032',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+头被强行的按住，无法看到背后的%SAVESTR:TARGET%，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2033',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+象征处女的鲜红色沿着白皙的大腿流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2034',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀……好痛……求求你……快停下来呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2035',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为哀求和悲鸣声而更加兴奋的%SAVESTR:MASTER%，毫不怜惜的压在%SAVESTR:TARGET%背上，开始蹂躏起身下娇小的身躯来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2036-2037',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2038-2039',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2040',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2041',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，这个姿势简直像是小狗狗一样呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2042',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一边这么说着，%SAVESTR:TARGET%吐着可爱的小舌头，轻轻的叫了两声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2043',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%像抚摸宠物一样的摸了摸%SAVESTR:TARGET%的头，然后握着纤细的腰部，猛的将肉棒刺入幼穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2044',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呀……❤主人的肉棒……进来了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2046',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2047',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……这个姿势……有点害羞呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2048',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%从背后握着纤细的腰部，用力的将肉棒插入了娇嫩的幼穴中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2049',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀……主人的那个……呜……哈啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2050',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……好热……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2052-2053',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……你要做什么……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2053',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……你要做什么……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2054',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+头被强行的按住，无法看到背后的%SAVESTR:TARGET%，只能害怕的不停颤抖着，感受着又粗又热的肉棒贴到自己的下半身，然后猛的进入到自己的身体里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2055',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀……好痛……求求你……快停下来呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2056',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为哀求和悲鸣声而更加兴奋的%SAVESTR:MASTER%，毫不怜惜的压在%SAVESTR:TARGET%背上，蹂躏着身下娇小的身躯。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2057-2058',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2058-2059',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2059',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2060-2061',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2062-2063',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2064',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2066',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2067',
        any: [/^(?:\uFEFF)?[ \t]*SELECTCASE[ \t]+RAND:6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2068',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2069',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好舒服……主人……肉棒……好舒服啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2070',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「脑子里面，已经没办法想其他事情了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2071',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%支撑着身体，任由%SAVESTR:MASTER%握着自己的腰部侵犯着下半身。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2072',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼穴忠实的回应着抽插，依依不舍的紧含着肉棒不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2073',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2074',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……嗯……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2075',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「小穴……那里……舒服的要死掉了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2076',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯呀❤……肉棒……还想要更多的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2077',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2078',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这个姿势……像小狗狗一样呢～汪～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2079',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%像小狗微微的吐着舌头，被按倒在床上像小动物一样被侵犯着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2080',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚嫩的肉壁贪图着快感，不断的吸吮着肉棒，随着抽插一阵阵的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2081',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2082',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呀……❤……玩弄舌头什么的……太犯规了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2083',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%只用一只手就轻松的将娇小的%SAVESTR:TARGET%压在桌上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2084',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一边前后活动着腰部，不停的在幼穴里抽送着，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2085',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2086',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2087',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手扶着墙，转过头来用湿润的眼睛看着%SAVESTR:MASTER%，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2088',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着%SAVESTR:TARGET%的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2089',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+肉体不断的撞击着，发出啪啪啪的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2090',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2091',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%从后面抓着%SAVESTR:TARGET%的小手，前后不断的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2092',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然看起来好像有用脚在支撑着，但是在被侵犯的快感下小小的身体很快就沦陷了，如果不是被%SAVESTR:MASTER%拉着，大概已经站不住了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2093',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+透明的爱液从两腿中间滴下来，拉出一条细细的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2094-2095',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDSELECT[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2096',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2097',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……哈呀……肚子里面……在咕啾咕啾的……哈呀❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2098',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一次次的迎接着冲撞的%SAVESTR:TARGET%努力的抬高下半身，主动的迎合着%SAVESTR:MASTER%，幼小的肉穴随着抽送发出了淫靡的水声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2099',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……好厉害的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2100',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯，小穴……要被主人玩坏了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2102-2103',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊，H的事情，好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2103',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊，H的事情，好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2104',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，更加激烈一些的使用%SELF_CALL\(TARGET\)%也没关系的哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2105',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，时不时漏出甜美的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2106-2107',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2107',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2109',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2111',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2112',
        any: [/^(?:\uFEFF)?[ \t]*SELECTCASE[ \t]+RAND:6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2113',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2114',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～主人，主人～嗯～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2115',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面，被这样子搅动，舒服的要死掉了啦～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2116',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「和主人做H的事情……好幸福……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2117',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小眼睛里满满都是迷恋，像小狗一样从背后被一次次的冲撞着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2118',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2119',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这个姿势……有点害羞呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2120',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……因为是主人……所以没问题……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2121',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2122',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如果主人喜欢这样子的话……%SELF_CALL\(TARGET\)%什么样都没问题的哟，汪～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2123',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%像小狗微微的吐着舌头，汪汪的叫着，用小小的身体取悦着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2124',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚嫩的肉壁在刺激下不断的收缩吸吮着肉棒，随着抽插一阵阵的缩紧，仿佛在贪图着快感一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2125',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2126',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%只用一只手就轻松的将娇小的%SAVESTR:TARGET%压在桌上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2127',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一边活动着腰部，一边捏弄着可爱的小舌头，晶莹的唾液伴随着含糊不清的娇喘声从指缝间流到桌上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2128',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%轻轻的咬着%SAVESTR:TARGET%的耳朵，说着下流的话语。幼女身上特有的淡淡的香气萦绕在鼻尖，更加刺激了%SAVESTR:MASTER%的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2129',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……嗯哈……那种事……呀……不要说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2130',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毫无反抗能力的%SAVESTR:TARGET%小脸羞红的仿佛要滴出水一样，小脚随着快感在半空中轻轻的颤抖着，透明的爱液随着激烈的抽送从交合的地方滴到地上，拉出一条细细的淫靡的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2131',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2132',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手扶着墙，转过头来用湿润的眼睛看着%SAVESTR:MASTER%，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2133',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着%SAVESTR:TARGET%的腰部，毫不费力的配合着肉棒的动作将身体拉向自己，两只小脚在半空中随着动作前后晃动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2134',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，时不时漏出几声甜美的娇喘。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2135',
        any: [/^(?:\uFEFF)?[ \t]*CASE[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2136',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%从后面抓着%SAVESTR:TARGET%的小手，前后不断的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2137',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然看起来好像有用脚在支撑着，但是在%SAVESTR:MASTER%的侵犯下小小的身体很快就软了下来，如果不是被%SAVESTR:MASTER%拉着，大概已经站不住了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2138',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+透明的爱液从两腿中间滴下来，拉出一条细细的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2139-2140',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDSELECT[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2141',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2142',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……肚子里……塞得满满的……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2143',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+已经完全习惯了肉棒的幼穴紧紧的吸住肉棒不放，仿佛要把肉棒榨出汁来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2144',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然说出来好害羞……但是……呜……H……好舒服……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2145-2146',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……这样子……嗯呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2146',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……这样子……嗯呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抱着枕头，小脸泛着红晕，轻轻的喘息着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2148-2149',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2149',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2151',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:322[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2152',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+%SAVESTR:TARGET%乖巧的趴在床上，小手分开幼穴，迎接着%SAVESTR:MASTER%的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2153',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+从身体到精神上完全屈服于%SAVESTR:MASTER%的她，渐渐的开始习惯了H的事情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2154',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……这种事情……不是说喜欢什么的呜……但是……哈啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2155',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+比起苦闷的声音来，似乎快乐占的比重更多一些。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2157',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然嘴上不承认，但是娇嫩的肉壁却紧紧的贴合着肉棒，在快感的刺激下诚实的分泌着爱液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2158',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2160',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:322[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2161',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呜……哈呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2162',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着泪花趴在床上，默默的承受着%SAVESTR:MASTER%的抽送。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2163',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然已经不会反抗了，但是要习惯H的事情似乎还需要一点时间。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2164',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2166',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:322[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2167',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……哈呜……好难受哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2168',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被压在身下，连象征性的反抗都做不到的%SAVESTR:TARGET%只能带着哭声小声的哀求着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2169',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为哀求声更加兴奋的%SAVESTR:MASTER%，毫不怜惜的凌辱着身下的幼女。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2170',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:322[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2171-2172',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2172-2173',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2173-2174',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2179',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+22[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2180',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:323[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2182',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2184',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2185',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……第一次能和主人面对面的……真是最棒了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2186',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%的脖子，小肚子不停的磨蹭着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2188',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:307[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2189',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾……嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2190',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸主动迎上来，柔软的嘴唇像蜜糖一样和%SAVESTR:MASTER%的嘴重合在一起。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2191-2192',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的肉棒毫不留情的刺穿了处女膜，象征着初次的鲜红色沿着肉棒流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2192',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的肉棒毫不留情的刺穿了处女膜，象征着初次的鲜红色沿着肉棒流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2194',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2195',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「第一次那个……能和主人这样子……互相看着……%SELF_CALL\(TARGET\)%……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2196',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠在%SAVESTR:MASTER%的胸口，小脸泛着红晕。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2198',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:307[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2199',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「kiss……可以吗……？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2200',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2201',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人的舌头交缠在一起，软软的小舌头像布丁一样，小嘴里充斥着幼女特有的甘甜的味道。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2202-2203',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着肉棒进入到身体里的%SAVESTR:TARGET%，小小的身体疼痛而微微颤抖着，象征着初次的鲜红色沿着肉棒流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2203',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着肉棒进入到身体里的%SAVESTR:TARGET%，小小的身体疼痛而微微颤抖着，象征着初次的鲜红色沿着肉棒流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2204',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抬起头用湿润的眼睛看着%SAVESTR:MASTER%，虽然眼泪在眼眶里打转转，但是小脸上满溢着幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2206-2207',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好……痛……求求你……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2207',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好……痛……求求你……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2208',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抱在怀里的%SAVESTR:TARGET%，被肉棒深深的插进了身体里，一下子就顶到了最深处。鲜红色的液体沿着肉棒流下来，滴到地上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2209-2210',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2211-2212',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2213',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2214',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……进来了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2215',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这个姿势……诶嘿嘿，顶到了最里面……呀❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2216',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%的脖子，积极的摇动着腰部，贪图着H的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2218',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2219',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……主人……肉棒……太深……太深了啦……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2220',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然最初有些不适应的样子，但是随着最深处被一下一下的冲击着，%SAVESTR:TARGET%很快就发出了甜美的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2222-2223',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……肚子里面……被……顶到了……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2223',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……肚子里面……被……顶到了……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2224',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%捏着柔软的小屁股，毫不怜惜的一次次的将肉棒顶向里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2225-2226',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2226-2227',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2227',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2228-2229',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2230-2231',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2232',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2234',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:232[ \t]+\|\|[ \t]+TALENT:75[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2235',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2236',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……哈……嗯……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2237',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒……还要……还要变得更舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2238',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯……啾……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2239',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人一次次的接吻着，%SAVESTR:TARGET%搂着%SAVESTR:MASTER%不放，任由对方像使用飞机杯一样使用自己的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2240',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2241',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人的肉棒在肚子里……嗯……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2242',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「里面被这样顶着的快感……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2243',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着幼嫩的小穴被肉棒贯穿的快感的%SAVESTR:TARGET%，扭动着腰部迎合着身下的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2244',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……请更多的……用肉棒……嗯……在%SELF_CALL\(TARGET\)%的小穴里……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2245-2246',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……好舒服……被肉棒欺负什么的……最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2246',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……好舒服……被肉棒欺负什么的……最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2247',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+托着软软的小屁股的%SAVESTR:MASTER%，一边揉捏着柔嫩的臀肉，一边用力的挺动着腰部。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2248',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被肉棒一次次顶着最深处的%SAVESTR:TARGET%，用稚嫩的声音发出了和年龄不符的色气的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2249',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……请主人……把精液牛奶……满满的注射到%SELF_CALL\(TARGET\)%的肚子里面吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2250-2251',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2252',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2253',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人的肉棒……在%SELF_CALL\(TARGET\)%的那里……咕啾咕啾的动着呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2254',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊……请主人……更加用力的……侵犯%SELF_CALL\(TARGET\)%的……H的小穴吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2255',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+已经完全习惯了肉棒的幼穴渴求着快感，不断的分泌着爱液，侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2256',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到这一点的%SAVESTR:MASTER%，更加用力的抽送起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2258-2259',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……哈啊……H的事情……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2259',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……哈啊……H的事情……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2260',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「能被主人的肉棒侵犯……真是最棒了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2261',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抬着头仰视着%SAVESTR:MASTER%，湿润的眼睛里满是诱惑。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2262-2263',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2263',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2265',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:323[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2266',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:232[ \t]+\|\|[ \t]+TALENT:75[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2267',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2268',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾……哈……主人……喜欢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2269',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……求求你，不要和%SELF_CALL\(TARGET\)%分开来……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2270',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%已经……没有主人就活不下去了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2271',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻声朝着%SAVESTR:MASTER%撒着娇，扭动着幼小的身体，积极的回应着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2272',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2273',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……主人……嗯……好舒服……的说……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2274',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠在%SAVESTR:MASTER%的怀里，纤细的腰部被握住，小小的身体仿佛飞机杯一样被使用着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2276',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:307[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2277',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……ki……ss……可以咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2278',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%仰着头，用湿润的眼睛望着%SAVESTR:MASTER%[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2279',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+二人的舌头交缠在一起，晶莹的唾液从嘴角流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2280',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……哈啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2281-2282',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2282-2283',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……被主人抱着……好幸福……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2283',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……被主人抱着……好幸福……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2284',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的蹭着%SAVESTR:MASTER%的胸口，小脸上满是幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2285',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边揉捏着小屁股，一边轻轻的摸着%SAVESTR:TARGET%的头，一下一下的活动着腰部。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2286',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+从被侵犯中感受到快感的%SAVESTR:TARGET%，时不时漏出可爱的娇喘声来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2287-2288',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2289',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2290',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……肚子里面……被……顶到了……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2291',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小小的身体仿佛没有重量一样，被%SAVESTR:MASTER%托着上下抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2292',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+已经习惯了肉棒的小穴，紧紧的吸着不放，为%SAVESTR:MASTER%送去更多的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2293-2294',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2294',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2296',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:323[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2297',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……嗯咕……呀……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2298',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着怀中的小人纤细的腰部，肆意的侵犯着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2299',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……明明……不喜欢的……但是……嗯哈……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2300',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被不停抽送着的%SAVESTR:TARGET%，虽然尽力的在忍耐，但还是时不时的漏出可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2301',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2303',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:323[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2304',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……里面……好……好涨呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2305',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着怀中的小人纤细的腰部，肆意的侵犯着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2306',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……请……温柔……一点……嗯呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2307',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2309',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:323[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2310',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好难受……求求你……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2311',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被肉棒不停侵犯的%SAVESTR:TARGET%含着眼泪乞求着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2312',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:323[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2313-2314',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2314-2315',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2315-2316',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2321',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+23[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2322',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:324[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2324',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2326',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2327',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……主人要拿走%SELF_CALL\(TARGET\)%的第一次了吗❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2328',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+双脚被%SAVESTR:MASTER%大大的打开的%SAVESTR:TARGET%满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2329',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小小的身体因为疼痛而颤抖着，象征着处女的鲜红色沿着肉棒流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2330',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+但是随之而来的快感让%SAVESTR:TARGET%忍不住发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2331',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……嗯哈……呀……肉棒……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2333',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2334',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……这个姿势……好害羞呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2335',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%从背后抱起，将双腿大大的打开，摆出像是小便的姿势的%SAVESTR:TARGET%，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2336',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+象征着处女的鲜红色沿着肉棒流下来，滴落到地上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2337',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……这样子……%SELF_CALL\(TARGET\)%……就是主人的了呢……好开心❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2338',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然因为初次的疼痛而轻轻颤抖着，豆大的泪珠沿着小脸滑落，但%SAVESTR:TARGET%的脸上却满是幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2340',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:307[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2341',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……哈……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2342',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+任由%SAVESTR:MASTER%的舌头在自己嘴里舔弄的%SAVESTR:TARGET%，乖巧的将全部的身体都交给了主人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2343-2344',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2345-2346',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……那么大……%SELF_CALL\(TARGET\)%……会坏掉的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2346',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……那么大……%SELF_CALL\(TARGET\)%……会坏掉的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2347',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%舔着%SAVESTR:TARGET%充满恐惧的小脸，慢慢的放下怀里的小人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2348',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无助的看着粗大的肉棒一点点的插入到身体里的%SAVESTR:TARGET%，感受着自己的身体被异物强行的挤了进来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2349',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+痛苦让小小的身体用尽全部的力气拼命挣扎着，象征的处女的鲜红色沿着肉棒流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2350',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+将这微不足道的反抗轻松压制的%SAVESTR:MASTER%，开始毫不怜惜的抽送起来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2351-2352',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2353-2354',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2355',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2356',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈❤这个姿势的话，一定会插的很深呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2357',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+双脚被%SAVESTR:MASTER%大大的打开的%SAVESTR:TARGET%满眼桃心的看着自己的那里在重力的作用下慢慢的吞掉肉棒，发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2359',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2360',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……嗯……嗯呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2361',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%从背后抱起，将双腿大大的打开，摆出像是小便的姿势的%SAVESTR:TARGET%，羞红着脸看着自己的那里在重力的作用下慢慢的吞掉肉棒，感受着异物慢慢进入到身体里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2363-2364',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……那么大……%SELF_CALL\(TARGET\)%……会坏掉的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2364',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不……不要……那么大……%SELF_CALL\(TARGET\)%……会坏掉的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2365',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%舔着%SAVESTR:TARGET%充满恐惧的小脸，慢慢的放下怀里的小人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2366',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+无助的看着粗大的肉棒一点点的插入到身体里的%SAVESTR:TARGET%，感受着自己的身体被异物强行的挤了进来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2367-2368',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2368-2369',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2369',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2370-2371',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2372-2373',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2374',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:324[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2376',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2377',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:4[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2378',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀嗯……呜……哈啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2379',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「里面……被这样子顶着……嗯……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2380',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呀～肉棒……嗯……❤还，还要更多～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的肉壁激烈的收缩着，在快感的刺激下不断的分泌着爱液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2382',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2383',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呀……哈啊……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2384',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抱在怀里侵犯个不停地%SAVESTR:TARGET%微微的吐着舌头，紧窄的小穴被一次次的撑开，强烈的快感不断的冲击着年幼的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2385',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边用力抽送着，一边轻咬着小耳朵，说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2386',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的……色色的小穴……请主人……更加用力的疼爱吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2387',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着手指，说着和稚气的外表完全不符的淫乱的话语回应着%SAVESTR:MASTER%[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2388',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2389',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……最里面被这样子顶着……要坏掉了啦❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2390',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为重力而每次都被顶到最深处的幼穴用力的吮吸着肉棒，诚实的回应着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2391',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼穴的主人，被侵犯的小嘴都合不拢，从喉咙里发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2392',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2393-2394',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……这个玩法……好厉害嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2394',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……这个玩法……好厉害嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2395',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%将%SAVESTR:TARGET%高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2396',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2397-2398',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2399',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2400',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……被肉棒……这样子激烈的侵犯……小穴……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2401',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%将%SAVESTR:TARGET%的双腿大大的分开，肆意使用着已经习惯了肉棒的小穴，享受着紧致的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2402',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被肉棒蹂躏着的幼女，不自觉的发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2404-2405',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，这个姿势是第一次呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2405',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，这个姿势是第一次呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2406',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒……插得好深❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2407-2408',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2408',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2410',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:324[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2412',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:75[ \t]+\|\|[ \t]+TALENT:232[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2413',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:4[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2414',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2415',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……最里面……顶到了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2416',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……好舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2417',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好想……继续下去……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2418',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+怀中的幼女不停的娇喘着，发出了快乐的声音。感受着肉穴快乐的收缩着的%SAVESTR:MASTER%，更加用力的向上侵犯着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2419',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2420',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯……呼……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2421',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+害羞的捂着小嘴的%SAVESTR:TARGET%，从纤细的指缝之间仍然时不时漏出甘甜的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2422',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%使坏一般的，一边舔着耳朵说着色色的话语，一边更加用力的活动着腰部。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2423',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……坏……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2424',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的声音轻轻抱怨着，比起讨厌来说更像是撒娇吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2425',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2426',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人……太……嗯呀……激烈了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2427',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%将%SAVESTR:TARGET%高高的抱起来，让肉棒只剩前端的一点留在里面，然后松开手，让小小的身体因为重力落下来，狠狠的顶到最里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2428',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子……%SELF_CALL\(TARGET\)%……会……嗯……坏掉的❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2429',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+越是用可爱的声音求饶，就越是会刺激对方施虐的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2430',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+仿佛要冲进子宫的猛烈的抽送产生的强烈快感让幼小的身体完全的瘫软在施暴者怀里。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2431',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……不知道她本人有没有意识到这一点呢？[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2432-2433',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕……嗯……呼啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2433',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕……嗯……呼啊啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的……那个……在肚子里面……塞得满满的……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2435',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微张着小嘴，眼神有些迷离。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2436',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+到底是因为喜欢主人呢，还是因为喜欢H带来的快感呢，还是二者兼而有之呢？[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2437',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在大脑一片空白的现在大概已经没法思考了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2438',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+透明的爱液从交合的地方滴到地上，拉出一条细细的银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2439-2440',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;V感觉3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2441',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2442',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……主人……嗯呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2443',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+双腿被大大分开的%SAVESTR:TARGET%羞红着脸看着交合的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2444',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+粗大的肉棒毫无道理的在幼女稚嫩的下体抽送着，从那里传来的不是不适，而是巨大的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2445',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着这样快感的幼女，不自觉的发出了快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2447-2448',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，和主人结合在一起了呢……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2448',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，和主人结合在一起了呢……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2449',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手重叠在胸前，感受着体内又粗又热的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2450',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然身体还没完全习惯这种事情，但是难受的感觉已经不在了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2451',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '2452-2453',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2453',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2455',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:324[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2457',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2458',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的哼着，时不时漏出甜美的声音来，虽然嘴上说着不要，身体却诚实的回应着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2459',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2461',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:324[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2462',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%紧紧的抱着怀中的幼女，像使用飞机杯一样肆意抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2463',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……呜……哈呜呜……那里……呀呜……不……要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2464',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的哼着，稚气的声音混杂着苦闷和快乐。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2465',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2467',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:324[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2468',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……不要……这样子用力……好难受……肚子……要坏掉了啦……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2469',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毫不理会带着苦痛的求饶，%SAVESTR:MASTER%肆意的蹂躏着怀中的小人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2470',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:324[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2471-2472',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2472-2473',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2473-2474',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2479',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+26[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2481',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:327[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2483',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2484',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2485',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……吗……？嗯～请用吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2486',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的躺着，大大的分开双脚，等待着%SAVESTR:MASTER%的宠幸。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2487',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2488-2489',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……吗……？嗯～请用吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2489',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……吗……？嗯～请用吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2490',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的躺着，大大的分开双脚，等待着%SAVESTR:MASTER%的宠幸。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2491',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%将肉棒的前端对准粉嫩的雏菊，然后毫不怜惜的用力顶了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2492-2493',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2494',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2495',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2496',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……屁股什么的……主人H……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2497',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2498',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去，敏感的肉穴紧紧的包裹住肉棒，不停的吸吮着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2499-2500',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……屁股什么的……主人H……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2500',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……屁股什么的……主人H……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2501',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%躺在床上，羞红着小脸，轻轻的咬着手指，有些害怕又有些期待的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2502',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%抓住纤细的脚踝分开双腿，将肉棒一口气顶了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2503-2504',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2505-2506',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2506',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2507',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……屁股什么的……不……不行……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2508',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+后面被调教过的%SAVESTR:TARGET%，努力的想忍耐着肉棒初次进入的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2509-2510',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「你要干什么……不要……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2510',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「你要干什么……不要……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2511',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%被压在床上，惊恐的看着%SAVESTR:MASTER%，小小的身体连一点点的反抗都做不到。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2512',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+强硬将对方的双腿分开，暴露出雏菊出来的%SAVESTR:MASTER%，粗暴的将肉棒插了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2512-2513',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+强硬将对方的双腿分开，暴露出雏菊出来的%SAVESTR:MASTER%，粗暴的将肉棒插了进去。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2515-2516',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2516',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2517-2518',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2519-2520',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱A狂	;淫乱＋淫[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2521',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2522',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2523',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……呀……屁股……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2524',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……侵犯后面的感觉……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2525',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，还要，还想要更多～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2526',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+沉溺于异样的快感的%SAVESTR:TARGET%，紧紧的缠着%SAVESTR:MASTER%的腰部，一刻都不愿意松开。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2527',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2528',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊……屁股……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2530',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然前面也想要和主人做……但是……屁股也不坏的感觉呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2531',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐……主人……，请更加的……对%SELF_CALL\(TARGET\)%……做H的事情吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2532',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼嫩的肉壁紧紧吸吮着%SAVESTR:MASTER%肉棒，贪图着异样的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2533-2534',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊，主人……这么激烈的话，呜，要去了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2534',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊，主人……这么激烈的话，呜，要去了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2535',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的肉壁因为强烈的快感用力的紧缩着，小孩子特有的高体温包绕着粗大的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2536',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+享受着被肠壁上的褶皱剐蹭的感觉，%SAVESTR:MASTER%更加用力的抽送起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2537-2538',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2538',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2540',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:327[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2541',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……主人的肉棒……好厉害……在身体里面……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2542',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%的肉棒在被多次调教过的雏菊中来回抽送着，感受着温热的雏菊带来的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2543',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呀……❤这样子用力的话……哈呜呜～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2544',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2546',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:327[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2547',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈，好开心，又和主人做H的事情了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2548',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的声音发出了可爱的娇喘声，小小的脚随着%SAVESTR:MASTER%的抽插在半空中晃动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2549',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「和主人H什么的最棒了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2550',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2552',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2553',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2554',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……咕……主人……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2555',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「和主人做这样子的事情……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2557',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「第一次什么的……已经无所谓了……只要能和主人这样子结合在一起……就满足了的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2558',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，最喜欢了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2559',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2560',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2562',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……虽然很想让主人把第一次拿走……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2563',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……被主人……这样子侵犯……哈呜呜～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2564',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「感觉……好舒服……的说……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2565',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%的脖子，闭着眼睛感受着异物在身体内来回抽动的感觉，在快感的刺激下不住的娇喘着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2566-2567',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜呜～这样子激烈的的侵犯的话……要，要坏掉了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2567',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀呜呜～这样子激烈的的侵犯的话……要，要坏掉了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2568',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%粗暴的侵犯着的%SAVESTR:TARGET%紧紧抓着床单。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2569',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然挂着泪珠，但从嘴里发出来的却是快乐的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2570-2571',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2571',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2573',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:327[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2576',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……该说是主人的癖好吗……但是……后面也……不坏的感觉……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2577',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「被主人玩弄……很舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2578',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2579',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+害羞的捂着脸的%SAVESTR:TARGET%，时不时会从指缝中漏出可爱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2581',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2583',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:327[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2584',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……没，没问题的……只要是主人的要求……不管是什么%SELF_CALL\(TARGET\)%都……哈呜呜～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2585',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%用肉棒强硬的在尚未开发的雏菊中抽送着，享受着肉壁排斥着异物的感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2586',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+比起快感来说痛苦更多一些的%SAVESTR:TARGET%努力的忍耐着，大口的喘着气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2588',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……如果这样都忍受不住的话……那第一次的时候就不能好好的侍奉主人了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2589',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2591',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:327[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2592',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……嗯……哈呀啊……不……行……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2593',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%在已经被反复调教过的雏菊中反复抽送，享受着稚嫩的肉壁剐蹭着肉棒的感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2594',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然精神上还有些抵抗，但肉体已经逐渐开始习惯了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2595',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2597',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:327[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2598',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好痛……求求你……不……要……呀呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2599',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%无视着幼女的哭喊声，一次次强硬的拓开紧缩的雏菊。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2600',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:327[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2601-2602',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2602-2603',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2603-2604',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2609',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+27[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2611',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:328[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2613',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2614',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2615',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶～要用屁股吗……嗯～可以哟～因为被主人玩弄屁股很舒服嘛～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2616',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%趴在床上，主动的用小手分开雏菊，露出了鲜嫩的粉红色。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2617',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看到这一幕的%SAVESTR:MASTER%，毫不犹豫的把肉棒插了进去……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2618-2619',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤屁股什么的……会舒服的话……可以哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2619',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤屁股什么的……会舒服的话……可以哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2620',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用小手分开了还没有多少经验的雏菊，迎接%SAVESTR:MASTER%的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2621-2622',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2623',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2624',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2625',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……进……进来了……主人的那个……哈啊啊……在里面……好……舒服……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2626',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着屁股传来了比平时的调教更加强烈的刺激，%SAVESTR:TARGET%紧紧的抓着床单，感受着%SAVESTR:MASTER%的肉棒在体内抽送带来的一样的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2627-2628',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……屁股里面……主人的那个……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2628',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……屁股里面……主人的那个……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2629',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%用一只手轻松的按着幼小的身体，另一只手握着肉棒毫不怜惜的插进了未经开发的雏菊中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2630-2631',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2632-2633',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2633',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2634',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呀……不要……嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2635',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然非常的不情愿，但是从身体里传来的快感，还是让%SAVESTR:TARGET%忍不住轻轻的发出了娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2636-2637',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜，不行～屁股不行～呜呀～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2637',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜，不行～屁股不行～呜呀～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2638',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%轻松的压制住了%SAVESTR:TARGET%的反抗，然后将肉棒插进了未经开发的雏菊中蹂躏起来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2639-2640',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2640-2641',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2641',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2642-2643',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2644-2645',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+A狂	;淫乱＋淫A[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2646',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2647',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2648',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……呜……嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2649',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒……好舒服……在屁股里面，好舒服呜呜～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2650',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股好舒服呜呜，感觉，要，要飞起来了嗯嗯❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2651',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚嫩的菊穴不停的按摩着肉棒，贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2652',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%像小狗一样伏在%SAVESTR:MASTER%的身下，吐着舌头，积极的回应着粗暴的抽送。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2653',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2654',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯～呀～哈啊～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2655',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股，好舒服～嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2657',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「小穴什么的……哈啊～❤已经无所谓了，只要能被主人玩弄后面什么的～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2658',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+像小狗一样趴着的%SAVESTR:TARGET%，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2659',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，还要，还想要更多～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2660-2661',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……被主人侵犯屁股什么的……真是太舒服了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2661',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……被主人侵犯屁股什么的……真是太舒服了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2662',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒什么的，一直待在里面就好了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2663',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被按在桌子上抽送的%SAVESTR:TARGET%，回过头看着%SAVESTR:MASTER%，小小的眼睛里充满着欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2664',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊，不行，这样子的话，呜嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2665-2666',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2666',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2668',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2669',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤主人的肉棒在屁股里面……呼嗯……好有感觉……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2670',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+已经经过数次调教的雏菊已经能从H中充分的感受到快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2671',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%紧握着纤细的腰部，毫不留情的蹂躏着白嫩的小屁股。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2672',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2674',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:328[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2675',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……嗯……主人……呀……真是粗暴呢，主人……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2676',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁当成飞机杯一样使用着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2677',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2679',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2680',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2681',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……呀……呼啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2682',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的那个……呜……好舒服……好舒服的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2683',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「其他的事情……已经没办法思考了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2684',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的抬起下半身，积极的回应着粗暴的抽送。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2685',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+紧致的雏菊用力的压榨着肉棒，分泌着润滑液，让抽送更加顺利。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2686',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2687',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……呜呀……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2688',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……感觉……嗯……不坏呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2689',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2690',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然……很想让主人拿走第一次……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2691',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……屁股……呼啊啊啊……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2692-2693',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+像小狗一样趴着的%SAVESTR:TARGET%，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2693',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+像小狗一样趴着的%SAVESTR:TARGET%，感受着在屁股里用力抽送的肉棒，露出了恍惚的神情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2694',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，不……不要停下来……呜嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2695-2696',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……和主人做……H的事情……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2696',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……和主人做……H的事情……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2697',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「后面……请随便主人……呼啊啊……使用的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2698',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被按在桌子上抽送的%SAVESTR:TARGET%，发出了可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2699',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这样子弄的话……呜呜……要，要去了啦～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2700-2701',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2701',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2703',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:328[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2705',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然第一次……还没有……但是……呜……这样子……也不错……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2706',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……呜……嗯呀……哈啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2707',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+已经经过数次调教的雏菊已经能从H中充分的感受到快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2708',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%毫不留情的握着纤细的腰部，粗暴的蹂躏着雏菊。。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2709',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2711',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:328[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2712',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人……呜……请，请温柔一点的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2713',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%强硬的在未经开发的雏菊中抽送着，将幼嫩的肉壁紧紧吸着肉棒，给肉棒送去快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2715',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……比起后面来说……还是更想要主人……那个……第一次呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2716',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2718',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:328[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2719',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈……啊咕……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2720',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抓着床单，屈辱的翘着小屁股，任由%SAVESTR:MASTER%侵犯着自己的后面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2721',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+（呜呜……这种事……明明讨厌这样子的……为什么……感觉……呜……好奇怪……）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2722',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2724',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:328[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2725',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……这样子的……不要了啦……好难受……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2726',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%无视着哭声，将幼女按倒在身下，毫不留情的在未开发的雏菊里抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2727',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:328[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2728-2729',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2729-2730',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2730-2731',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2736',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+28[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2738',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:329[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2740',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2741',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2742',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的肉棒……进来了……舒服的事情……好喜欢呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2743',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%露出了色气满满的表情，积极的扭动着腰部。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2744-2745',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……呼啊啊……主人……动一动……也是……没问题的……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2745',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……呼啊啊……主人……动一动……也是……没问题的……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2746',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+温热的雏菊缓缓的将肉棒吞下，嫩嫩的肉壁在刺激下不住的蠕动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2747-2748',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2749',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2750',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2751',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呀……主人的……呼啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2752',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸紧贴着%SAVESTR:MASTER%胸口，在下半身传来的快感中轻声的娇喘着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2753',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2754-2755',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……全部都……进去了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2755',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……全部都……进去了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2756',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%被%SAVESTR:MASTER%抱着，粗大的肉棒完全没入了紧致的雏菊中。小脸害羞的埋在%SAVESTR:MASTER%的身上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2757-2758',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2759-2760',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2760',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2761',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……呜呜……不，不要……这种事……舒服什么的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2762',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2763-2764',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……屁股什么的……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2764',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……屁股什么的……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2765',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抱在怀里侵犯着的%SAVESTR:TARGET%小手徒劳的推搡着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2766-2767',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2767-2768',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2768',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2769-2770',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2771-2772',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+尻穴狂	;淫乱＋A淫以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2773',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2774',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2776',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊～小穴什么的……已经无所谓了～虽然也很想让主人拿走第一次……但是用后面做实在是超舒服的呐～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2777',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「感觉已经要……嗯呀❤～要坏掉了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2778',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%紧握着纤细的腰部，像使用道具一般粗暴的侵犯着怀里的小人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2779',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，嗯哈～～❤已经没办法思考别的事情了，更加，用力一点，嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2780-2781',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2782',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……虽然第一次还在……有点遗憾……但是使用后面也很棒呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2783',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被抱在怀里侵犯着的%SAVESTR:TARGET%，在肉棒的抽送下一次次的发出了色色的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2784',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……主人……屁股……还想要更多……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2785',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+经过调教的雏菊熟练的吮吸着肉棒，一点缝隙都不留的压榨着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2786-2787',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2787',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2789',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2791',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……后面吗……不过也希望主人拿走第一次呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2792',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%的脖子，积极的迎合着动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2793',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……呜呜……好……舒服～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2794',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2796',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:329[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2797',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……嗯呀……主人的肉棒……在身体里面……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2798',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+没经过几次调教的雏菊生涩的收缩着，紧紧箍住肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2799',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～主人，这么激烈的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2800',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2802',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2803',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2804',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2805',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……呜呜……后面什么的……请……更多的……疼爱一些……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2806',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「小穴会一直为主人……留着的……所以……请更加的……后面……嗯哈……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2807-2808',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……屁股……好舒服……被主人的……嗯……那个……这样子粗暴的……哈啊啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2808',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊啊……屁股……好舒服……被主人的……嗯……那个……这样子粗暴的……哈啊啊❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2809',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%紧握着腰部，粗暴的使用着的%SAVESTR:TARGET%，在快感的刺激下吐着小舌头，发出了甜美的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2810',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「脑袋已经……呼啊啊……一片空白了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2811-2812',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2813',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯……屁股……很舒服呢……小穴的第一次也……想让主人拿走……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2814',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子用屁股做……呼啊啊……也，也不坏……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2815',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸紧贴着%SAVESTR:MASTER%的胸口，在快感的刺激下不住的娇喘着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2816',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……呼啊啊……感觉……整个人都……要融化了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2817-2818',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2818',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2820',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2822',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然这样被主人疼爱也……很开心……但是第一次……还是很在意……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2823',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……嗯……哈啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2824',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%肆意蹂躏着怀中的小人，一次次的将肉棒粗暴的插了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2825',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜，屁股要……呼啊啊……要坏掉了啦～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2826',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2828',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:329[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2829',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的那个……呜……全都……进来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2830',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+努力忍耐着屁股传来的异物感，%SAVESTR:TARGET%在%SAVESTR:MASTER%怀里轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2831',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了主人的话……这点事情……不算什么呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2833',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……主人……第一次……那个……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2834',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2836',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:329[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2837',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……屁股什么的……呀……明明……不行的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2838',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%SAVESTR:MASTER%粗暴的使用下，却感受到不断传来的快感的%SAVESTR:TARGET%紧握着小手，努力的忍耐着快感，从嘴角漏出了可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2839',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……哈啊……嗯……呀……这种……事情……哈呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2840',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2842',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:329[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2843',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，不，不要～屁股……好难受呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2844',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着，幼小的身体拼命的排斥着入侵的异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2845',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:329[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2846-2847',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2847-2848',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2848-2849',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2854',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+29[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2856',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:337[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2858',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2859',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2860',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……能感觉的到主人的肉棒呢……诶嘿嘿❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2861',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%发出了快乐的呻吟声，肉壁不断的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2862-2863',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……呼啊……插的好深呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2863',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……呼啊……插的好深呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2864',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%从后面抱着%SAVESTR:TARGET%，将肉棒插进了雏菊中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2865-2866',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2867',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2868',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2869',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的那个……全都……呀……进来了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2870',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%靠着%SAVESTR:MASTER%，将身体完全的交给了对方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2871',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「请主人……哈啊……随便使用的说……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2872-2873',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……嗯……可以……动的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2873',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……嗯……可以……动的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2874',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%被%SAVESTR:MASTER%从后面抱着，粗大的肉棒完全没入了紧致的雏菊中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2875-2876',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2877-2878',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2878',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2879',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……呜呜……不，不要……这样子……好害羞呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2880',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然嘴上说着不愿意，但雏菊却积极的迎合着插入的异物，紧紧的吸住不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2881-2882',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2882',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2883',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%抱在怀里侵犯着的%SAVESTR:TARGET%微弱的挣扎着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2884-2885',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2885-2886',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2886',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2887-2888',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2889-2890',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+尻穴狂[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2891',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2892',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2894',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊～小穴的第一次什么的……虽然也很想让主人拿走第一次……呜，那种事怎么样都好了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2895',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，请更加……呜呜～更加的用力侵犯%SELF_CALL\(TARGET\)%吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2896',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%粗暴的使用着怀里的幼女，仿佛只是一个道具一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2897',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊，主人，主人嗯嗯嗯～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2898-2899',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2900',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……虽然前面还一次都没做过……但是使用后面也超舒服呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2901',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被抱在怀里一次次起伏着的%SAVESTR:TARGET%，稚气的声音发出了甜美的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2902',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……主人……不要……停下来……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2903',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+柔软的雏菊贪图着快感，紧紧的包裹着，吮吸着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2904-2905',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2905',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2907',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2909',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样虽然也不错……但是要是连前面也做了就好了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2910',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%积极的迎合着%SAVESTR:MASTER%的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2911',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……呜呜……哈啊啊……好……舒服～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2912',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2914',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2915',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人的肉棒……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2916',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+生涩的雏菊虽然有些排斥异物，但身体的意识却迎合着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2917',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～主人，这么激烈的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2918',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2920',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2921',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2922',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2923',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「被主人使用后面……呼啊啊……好开心❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2924',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不管身体的哪里……都是主人的呐……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2925-2926',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……脑子已经……没办法想别的事情了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2926',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……脑子已经……没办法想别的事情了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2927',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被粗暴使用着的%SAVESTR:TARGET%，不停的娇喘着，稚气的声音里充满着爱意。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2928',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边抽送着，一边轻咬着怀中小人的耳朵。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2929',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的……全部……都是……主人呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2930-2931',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2932',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……%SELF_CALL\(TARGET\)%的第一次……也想交给主人呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2933',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……但是……用后面……也……好舒服的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2934',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻咬着手指，呼出甜美的热气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2935',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……要，要坏掉了……啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2936-2937',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2937',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2939',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2941',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然和主人做很开心……但是……要是连第一次也拿走就好了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2942',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……哈啊……主人的全部……都喜欢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2943',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着蹂躏自己的肉棒，%SAVESTR:TARGET%露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2944',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，屁股那里……呜……好……舒服……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2945',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2947',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2948',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……%SELF_CALL\(TARGET\)%……没问题的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2949',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+努力忍耐着屁股传来的异物感，%SAVESTR:TARGET%在%SAVESTR:MASTER%怀里轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2950',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了主人的话……这点事情……不算什么呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2952',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……主人……果然还是喜欢后面一些咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2953',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2955',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2956',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……舒服什么的……才……没有……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2957',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%SAVESTR:MASTER%粗暴的使用下，却感受到不断传来的快感的%SAVESTR:TARGET%捂着小嘴，努力的不发出可爱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2958',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……哈啊……嗯……才……没有……呼啊啊……绝对……没有……的说……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2959',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2961',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:337[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2962',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，不，不要～屁股……好难受呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2963',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%擦拭着眼角，幼小的身体拼命的排斥着入侵的异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2964',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2965-2966',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2966-2967',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2967-2968',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2973',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+30[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2975',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:331[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2977',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2978',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，肉棒桑很精神呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2979',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+仿佛拿到了新玩具的小孩子一样，%SAVESTR:TARGET%爱不释手的揉捏着坚挺的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2981',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2982',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……仔细看的话……好大……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2983',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着小脸，用小手揉捏着坚挺的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2985',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2986',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那……那个……虽然不是很擅长……但是如果主人会舒服的话，%SELF_CALL\(TARGET\)%会努力的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2987',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+完全将自己当做%SAVESTR:MASTER%的仆人的%SAVESTR:TARGET%，努力的用小手侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2989-2990',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……一定要……这样做不可吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2990',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……一定要……这样做不可吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2991-2992',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2992',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2993-2994',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2995-2996',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋侍奉精神Lv3以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2997',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '2998',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '2999',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的肉棒，激动的一跳一跳的呢，被%SELF_CALL\(TARGET\)%的手捏，就这么开心咩？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3000',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻揉捏着肉棒，用可爱的小手服侍着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3001',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的手……就这么的舒服吗❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3003',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「就这样子……把牛奶射出来也没问题哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3004-3005',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……肉棒的味道……好好闻……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3005',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……肉棒的味道……好好闻……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3006',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%带着有些恍惚的表情，一边用手服侍着肉棒，一边用柔软的小脸轻轻的蹭着前端。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3007',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的味道……嗯～最喜欢了❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3009',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还有牛奶也最喜欢了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3010-3011',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3011',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3013',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:331[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3014',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的……肉棒……呼啊啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3015',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一脸痴态的抚弄着眼前粗大的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3017',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的牛奶……好想要……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3018',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3020',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:331[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3021',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:100[ \t]+>=[ \t]+50[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3022',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……%SELF_CALL\(TARGET\)%……会好好的服侍的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3023',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小心的握着%SAVESTR:MASTER%的肉棒，来回抚弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3024',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这个力度……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3026',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如果要射出来的话……不管是脸上还是嘴里都没问题的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3027',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%仰着头看着%SAVESTR:MASTER%，红着脸说着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3028-3029',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……肉棒被手弄……会很舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3029',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……肉棒被手弄……会很舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3030',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微笑着用小手抚弄着肉棒，纤细的手指沾满了黏糊糊的前液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3031',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……如果主人喜欢的话，%SELF_CALL\(TARGET\)%不过多少次都会为主人做的。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3032',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:32[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3033',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽……虽然牛奶也……很喜欢就是了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3034',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%很小声的自言自语着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3035-3036',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3036-3037',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3037',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3039',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:331[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3040',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……好精神呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3041',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了回应主人的期待，%SELF_CALL\(TARGET\)%会努力的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3042',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手握着肉棒，不停的上下套弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3043',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3045',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:331[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3046',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的兴趣……真是奇怪呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3047',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然对H的事情还不是特别理解，但是%SAVESTR:TARGET%还是乖乖的照做了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3048',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子……会舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3049',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3051',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:331[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3052',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……手上都变得黏糊糊的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3053',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不理会泪眼汪汪的%SAVESTR:TARGET%，%SAVESTR:MASTER%享受着有些笨拙的侍奉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3054',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:331[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3055-3056',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3056-3057',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3057-3058',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3063',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+31[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3065',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:332[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3067',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3068',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用嘴巴吗……诶嘿嘿，明白了呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3069',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%开心的含住了%SAVESTR:MASTER%的肉棒，毫不迟疑的开始吮吸起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3071',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3072',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用嘴巴……给主人的肉棒……那个么……呜呜……总觉得……有点害羞呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3073',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些害羞的说着，软软的小嘴含住了肉棒的前端，轻轻的亲了一下。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3075',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3076',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……用嘴巴吗……？呜嗯……知道了的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3077',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的含住了肉棒，开始用柔软的小嘴侍奉起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3079-3080',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……我……我做……就是了啦……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3080',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……我……我做……就是了啦……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3081',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然最初很不愿意，但是被%SAVESTR:MASTER%狠狠的瞪了一眼之后，%SAVESTR:TARGET%抽泣着含住了肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3082-3083',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3083',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3084-3085',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3086-3087',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3088',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:332[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3089',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3090',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呼……嗯哈……主人的肉棒……呼啊……好美味……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3091',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着粗大的肉棒，不断的前后套弄着，布丁一样柔软的小舌头在肉棒上磨蹭着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3092',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐，主人……快点……快点把牛奶给%SELF_CALL\(TARGET\)%嘛……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3093',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3094',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……嗯呼……呜……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3095',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的吞吐着%SAVESTR:MASTER%粗大的肉棒，小小的眼睛里满是着迷的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3096',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+与其说是在服侍，不如说是在贪食喜欢的食物的小孩子一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3097-3098',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+%SAVESTR:TARGET%的小手握着粗大的肉棒，像舔棒棒糖一样仔细的上下舔弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3098',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+[ \t]+%SAVESTR:TARGET%的小手握着粗大的肉棒，像舔棒棒糖一样仔细的上下舔弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3099',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……呼哈……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3100',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人的声音听起来好像很舒服呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3101-3102',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3102',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3104',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:332[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3105',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3106',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人的……怎么样……感觉舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3107',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用嘴巴小心的侍奉着%SAVESTR:MASTER%的肉棒，努力的不让牙齿碰到。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3108',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……主人舒服的话……是%SELF_CALL\(TARGET\)%的荣幸呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3109',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3110',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼哈……主人的……肉棒……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3111',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%拼命的张着可爱的小嘴，将稍微有些大的肉棒含在嘴里努力的吮吸着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3112',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……只要是主人想要的……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3113-3114',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呜……呼……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3114',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呜……呼……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3115',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着肉棒的前端，柔软的舌尖轻轻的刺激着龟头敏感的部分。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3116',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+明明是应该含着棒棒糖的年龄，小嘴却熟练的侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3117',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然身为魔王并没有罪恶感这种东西，不过眼前的场景还是让%SAVESTR:MASTER%感到兴奋起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3118-3119',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3119',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3121',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:332[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3122',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啾……主人……%SELF_CALL\(TARGET\)%的嘴巴……请尽情的……使用……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3123',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%乖巧的张开小嘴，积极的用侍奉着%SAVESTR:MASTER%的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3124',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3126',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:332[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3127',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呜……不……呼呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3128',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被压着头顶的%SAVESTR:TARGET%，被半强制的用小嘴服侍的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3129',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:332[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3130-3131',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3131-3132',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3132-3133',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3138',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+32[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3140',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:333[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3142',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3143',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……%SELF_CALL\(TARGET\)%这个小小的胸部也没关系吗～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3144',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%脸上浮现着和年龄不符的魅惑的笑容，用平坦而柔软的胸部侍奉起肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3146',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……%SELF_CALL\(TARGET\)%这样子的胸部……也没问题吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3148',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要主人开心的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3149',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸，微笑的看着%SAVESTR:MASTER%，用平坦而柔软的胸部侍奉起肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3151',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3152',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……用胸部……给主人的肉棒……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3153',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%听话的用平坦而柔软的胸部侍奉起肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3155-3156',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……呜……感觉好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3156',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……呜……感觉好奇怪……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3157-3158',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3158',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3159-3160',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3161-3162',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋侍奉精神Lv5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3163',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:332[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3164',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用胸部侍奉主人的肉棒……也很有感觉呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3165',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「又热又硬的肉棒……在胸口这样子磨蹭……诶嘿嘿～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3166',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3167',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3169',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:332[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3170',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，舒服吗～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3171',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「之后一定要用肉棒侵犯%SELF_CALL\(TARGET\)%哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3172',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%带着和外表不服的H的表情，积极的用平坦的胸部侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3173',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3175',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:333[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3176',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3177',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「能这样子服侍主人……%SELF_CALL\(TARGET\)%……很荣幸的说～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3178',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%……一定会好好的让主人舒服的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3179',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微的红着脸，积极的用平坦的胸部侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3180-3181',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的肉棒……好大……好热的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3181',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的肉棒……好大……好热的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3182',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，%SELF_CALL\(TARGET\)%会努力的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3183',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微的红着脸，积极的用平坦的胸部侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3184-3185',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3185',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3187',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:333[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3188',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这个样子……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3189',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的压抑着羞耻心，顺从的用平坦的胸部侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3190',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3192',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:333[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3193',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……只要这样子做的话……就不会再做过分的事情了吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3194',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%SAVESTR:MASTER%威逼利诱和哄骗下，%SAVESTR:TARGET%含着泪花用平坦的胸部笨拙的侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3195',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:333[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3196-3197',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3197-3198',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3198-3199',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3204',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+33[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3206',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:334[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3208',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3209',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呀～竟然这样子……主人坏❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3210',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用诱惑的眼神看着%SAVESTR:MASTER%，慢慢的用大腿之间摩擦着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3212',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3213',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……好热的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3214',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸看着%SAVESTR:MASTER%的肉棒在大腿之间摩擦着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3216-3217',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做，做什么啦……不要做奇怪的事情呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3217',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做，做什么啦……不要做奇怪的事情呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3218',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着眼泪，轻轻的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3219-3220',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3220',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3221-3222',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3223-3224',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3225',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:334[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3226',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……嗯……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3227',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，积极的活动着腰部迎合着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3228',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……求求你……就这样子插进去嘛……把%SELF_CALL\(TARGET\)%的处女……就这样咻的……拿走……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3229',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+装作没听到的%SAVESTR:MASTER%就这样握着纤细的腰部继续摩擦着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3230',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜～主人坏～」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3231',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3233',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:334[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3234',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……嗯……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3235',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，积极的活动着腰部迎合着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3236',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……肉棒这样子摩擦着那里……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3237',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3239',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:334[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3240',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3241',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，有些害羞的迎合着%SAVESTR:MASTER%的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3242',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……那个……那，那个……可以的话……那个……插……进去……那个……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3243',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%坏笑的看着害羞的快要哭出来的%SAVESTR:TARGET%，继续在大腿间摩擦着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3244',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……就……就这样……请……把%SELF_CALL\(TARGET\)%的……第一次……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3245',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3247',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:334[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3248',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……好热……在下面……咕啾咕啾的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3249',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的喘息着，有些害羞的迎合着%SAVESTR:MASTER%的动作。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3250',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……喜欢你……最喜欢你了……只要是主人的话……不管做什么事情都可以……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3251',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3253',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:334[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3254',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……主人……做这种事的话……会舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3255',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%还有些不习惯的，红着脸笨拙的迎合着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3256',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……%SELF_CALL\(TARGET\)%也……很舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3257',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3259',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:334[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3260',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做，做什么啦……不要做奇怪的事情呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3261',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着眼泪，轻轻的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3262',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:334[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3263-3264',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3264-3265',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3265-3266',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3271',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+34[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3272',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:335[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3274',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3276',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3277',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「唔啊啊……能感觉的到……主人的肉棒……啊哈……好大……好热呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3278',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%忍着初次的痛苦，扶着肉棒慢慢的坐了下去，体会到被肉棒侵入体内的快感的%SAVESTR:TARGET%露出了开心的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3279',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人的肉棒……好厉害……把肚子里面塞得满满的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3280',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+初次感受到异物进入的稚嫩的幼穴紧紧的夹住肉棒不放，仅仅是插进去不动就能感受到强烈的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3281',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……来做更多……舒服的事情吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3283',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3284',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……进来了……呜……主人……的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3285',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的忍耐着初次的疼痛，慢慢的坐了下去，豆大的泪珠从疼的颤抖的小脸颊上滑落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3286',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……好痛的说……感觉要裂开了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3287',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……这样子……终于……%SELF_CALL\(TARGET\)%的身心就都是主人的东西了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3288',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%轻轻的抱着还在颤抖着的幼女，一次次抚摸着头部。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3289',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……主人……再一下下……这样子抱着……一下下……就好……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3290',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样抱着怀中的小人，擦掉了眼角的泪水之后，%SAVESTR:MASTER%开始轻轻的动起腰来……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3292-3293',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……好痛……好痛……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3293',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……好痛……好痛……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3294',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起，请原谅我，请原谅我～～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3295-3296',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3297-3298',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3299',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3300',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊啊……主人的肉棒……顶到最里面了呢……诶嘿嘿……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3301',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%扶着肉棒，开始积极的活动起腰部来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3303',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3304',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人的那个……全部都……进来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3305',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸，支撑着身体，随着%SAVESTR:MASTER%的动作小小的身体一上一下的欺负着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3307-3308',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，这样子，好害羞……不，不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3308',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，这样子，好害羞……不，不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3309',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3310-3311',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3311-3312',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3312',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3313-3314',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3315-3316',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋V狂	;淫乱\+V淫[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3317',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:75[ \t]+\|\|[ \t]+TALENT:232\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3318',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3319',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的肉棒……喜欢……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3320',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手撑在%SAVESTR:MASTER%的肚子上，扭动着纤细的腰肢，一下下的用稚嫩的下半身套弄着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3321',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……在肚子里面……咕啾咕啾的……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3322',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3323',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐，主人，你看你看，肉棒在肚子里面……这样子的动着呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3324',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%稍稍后仰着，小手撑着%SAVESTR:MASTER%的大腿，被肉棒撑开的稚嫩小穴完全暴露在%SAVESTR:MASTER%的视线中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3325',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……里面……顶到了……嗯哈～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3326-3327',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……主人的肉棒……还想要……更多呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3327',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……主人的肉棒……还想要……更多呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3328',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%伏在%SAVESTR:MASTER%身上，二人的嘴唇无数次重合着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3329',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3330-3331',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+7[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3331',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3333',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3334',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……好舒服……小穴被主人的肉棒侵犯……好舒服～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3335',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「小穴里面被侵犯什么的……感觉好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3336',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:MASTER%身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3337',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3339',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:335[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3340',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……嗯……嗯呀……H……好舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3341',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%积极的迎合着%SAVESTR:MASTER%的动作，稚气的脸庞上满满都是和年龄不符的欲望。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3342',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……请对%SELF_CALL\(TARGET\)%做更多……舒服的事情……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3343',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3345',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(TALENT:75[ \t]+\|\|[ \t]+TALENT:232\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3346',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3347',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……主人……呀……里面……顶到了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3348',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手撑在%SAVESTR:MASTER%的肚子上，支撑着幼小的身体，感受着一肉棒一下下的朝上顶着稚嫩的小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3349',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呀……主人……喜欢……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3350',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3351',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人的那个……在肚子里面……塞的满满的」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3352',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%稍稍后仰着，小手撑着%SAVESTR:MASTER%的大腿，被肉棒撑开的稚嫩小穴完全暴露在%SAVESTR:MASTER%的视线中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3353',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要主人想要……不管多少次都可以……请尽情的使用吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3354-3355',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……主人……那个……kiss……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3355',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……主人……那个……kiss……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3356',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%伏在%SAVESTR:MASTER%身上，二人的嘴唇无数次重合着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3357',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%一边享受着柔软的小嘴，一边挺动着腰部，在稚嫩的小穴里抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3358-3359',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+7[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3359',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3361',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3362',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呀……虽然这样子……有点害羞……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3363',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「但是……和主人做……舒服的事情……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3364',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:MASTER%身上起伏着，幼小的身体一次次的贪图着快感，用力的起伏着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3365',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3367',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:335[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3368',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……最喜欢……你了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3369',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%积极的迎合着%SAVESTR:MASTER%的动作，稚气的小脸满眼桃心的看着你。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3370',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然还……有些不适应……但是……没问题的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3371',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3373',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+ABL:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:335[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3374',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3375',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……明明……这种事情……呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3376',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的撑着自己的身体，稚嫩的小穴不顾主人的意志，紧紧的吮吸着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3377',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3378-3379',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……哈啊……嗯……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3379',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……哈啊……嗯……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3380',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的用小穴套弄着肉棒，时不时因为快感发出可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……肚子里面……要……变得奇怪了……哈啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3382-3383',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3383',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3385',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:2[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:335[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3386',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……主人……这样子……舒服……吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3387',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着还未习惯的异样的快感，努力的撑着自己的身体，稚嫩的肉壁一次次的被肉棒强硬的分开。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3388',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3390',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:335[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3391',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，不要，不要动了啦，好难受……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3392',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+几乎伏在了%SAVESTR:MASTER%身上的%SAVESTR:TARGET%不停地抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3393',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:335[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3394-3395',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3395-3396',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3396-3397',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3402',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+35[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3404',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:336[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3406',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3407',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「给主人擦洗吗……？嗯呜，明白了呢。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3408',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然从来没有做过这种事情，但是%SAVESTR:TARGET%毫不犹豫的有些笨拙的顺从的照做了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3409',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人的身体……好壮实呢（女性的话好漂亮）……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3411-3412',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然比做奇怪的事情要好……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3412',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然比做奇怪的事情要好……但是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3413',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些疑惑的，红着脸笨拙的擦洗着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3414-3415',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3415',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3416-3417',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3418-3419',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋侍奉精神Lv5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3420',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:336[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3421',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……主人的身体……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3422',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:MASTER%背后蹭着，在二人的身体之间摩擦出许多的小泡泡，小手绕到前面轻轻揉捏着粗大的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3423',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……之后也继续做舒服的事情吧～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3424',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3426',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:336[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3427',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……这就是……最喜欢的……主人的……身体呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3428',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……这样子看……果然是主人呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3429',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手轻轻的在%SAVESTR:MASTER%的身上搓揉着肥皂泡，小脸不知是因为热水还是别的什么原因，看起来红红的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3430',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3432',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:336[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3433',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这，这个样子……可以吗……主人……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的擦洗着%SAVESTR:MASTER%的身体，时不时轻声询问着%SAVESTR:MASTER%的感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3435',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人舒服的话……就好了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3436',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3438',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:336[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3439',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……做这种事情……好奇怪的感觉……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3440',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%怯生生的擦洗着%SAVESTR:MASTER%的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3441',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:336[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3442-3443',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3443-3444',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3444-3445',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3450',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+36[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3452',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:337[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3454',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3455',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……能感觉到屁股里面……被主人的肉棒塞的满满的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3457',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+跨坐在%SAVESTR:MASTER%身上的%SAVESTR:TARGET%扭动着腰部，贪图着异样的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3458-3459',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……全部都……进去了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3459',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……全部都……进去了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3460',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%露出了带着轻微不适感的色色的表情，开始扭动起腰部来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3461-3462',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3463',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3464',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3465',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……能感觉到……主人的全部……都在……里面……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3466',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%迷离的看着%SAVESTR:MASTER%，水汪汪的大眼睛里满是幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3467-3468',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……主人……那个……%SELF_CALL\(TARGET\)%……完全……没问题……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3468',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……主人……那个……%SELF_CALL\(TARGET\)%……完全……没问题……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3469',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+骑在%SAVESTR:MASTER%身上的%SAVESTR:TARGET%强忍着不快感，开始慢慢的动起腰，侍奉起%SAVESTR:MASTER%来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3470-3471',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外（爱無し）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3472-3473',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3473',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3474',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……肚子里面……被……呼呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3475',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%捂着小嘴，不让可爱的娇喘声漏出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3476-3477',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……好难受……屁股……呜呜……要裂开来了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3477',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……好难受……屁股……呜呜……要裂开来了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3478',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着，晶莹的泪珠不断的沿着脸颊滑落。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3479-3480',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3480-3481',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3481',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3482-3483',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3484-3485',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋尻穴狂	;淫乱\+A淫[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3486',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3487',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3488',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊～～好棒～～主人的肉棒……在屁股里面……咕啾咕啾的……嗯呀～～舒服的要死掉了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3489',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%激烈的扭动着纤细的腰部，一下一下的套弄着%SAVESTR:MASTER%的肉棒，贪图着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3490',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……已经……没办法再思考肉棒以外的事情了啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3491-3492',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……❤屁股被这样子粗暴的侵犯……嗯呼～～好舒服～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3492',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……❤屁股被这样子粗暴的侵犯……嗯呼～～好舒服～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3493',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小嘴微微张开着，随着欺负呼出甜甜的热气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3494',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……呼啊啊……请……更加的……用力一点……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3495-3496',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3496',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3498',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3499',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呀……哈啊……主人的肉棒……嗯……好喜欢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3500',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微的吐着小舌头，在快感的刺激下一下一下的起伏着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3501',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……肉棒……插得好深呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3502',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3504',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3505',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……嗯哈……全部都进来了呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3506',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%露出了带着轻微不适感的色色的表情，开始扭动起腰部来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3507',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然现在还有点难受……但是一定会更加舒服的吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3508',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3510',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(TALENT:77[ \t]+\|\|[ \t]+TALENT:233\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3511',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3512',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊～～主人……主人嗯嗯～～已经除了主人以外，没办法再思考其他的事情了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3513',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%拼命的起伏着，用自己的身体侍奉着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3514',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+但是小脸上怎么看都像是在贪图着快感的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3515',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人和……H的事情……都最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3516-3517',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯……呼啊啊……%SELF_CALL\(TARGET\)%的全部……呜……都是主人的东西……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3517',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯……呼啊啊……%SELF_CALL\(TARGET\)%的全部……呜……都是主人的东西……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3518',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+顺着%SAVESTR:MASTER%起伏的节奏，%SAVESTR:TARGET%积极的迎合着，用幼小的身体取悦着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3519',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%的身体……随便主人使用呐……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3520-3521',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3521',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3523',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3524',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……屁股里面……能感觉到主人的那个……满满的呐……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3525',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%骑在%SAVESTR:MASTER%的身上，小小的身体不断的起伏着，用柔软的雏菊侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3526',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好舒服……的说……主人也……很舒服咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3527',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3529',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3530',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人的那个……嗯……全部都……进来了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3531',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+骑在%SAVESTR:MASTER%身上的%SAVESTR:TARGET%强忍着不快感，开始慢慢的动起腰，侍奉起%SAVESTR:MASTER%来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3532',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然……有些难受……但是为了主人……%SELF_CALL\(TARGET\)%会加油的……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3533',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3535',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:337[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3536',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……舒服什么的……那种事……呼呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3537',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手扶着%SAVESTR:MASTER%的身体，时不时发出可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3538',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……不要……不要再……呜呜……不要再动了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3539',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3541',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:337[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3542',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……呜……哈啊……不，不要动……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3543',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+几乎伏在了%SAVESTR:MASTER%身上的%SAVESTR:TARGET%不停地抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3544',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:337[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3545-3546',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3546-3547',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3547-3548',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3553',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+37[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3555',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:338[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3557',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3559-3560',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3560-3561',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3561',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3562-3563',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3564-3565',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋侍奉精神Lv5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3566',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:338[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3567',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3569',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:16[ \t]+==[ \t]+5[ \t]+&&[ \t]+\(CFLAG:338[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3570',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3572',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:338[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3573',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3575',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:338[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3576',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:338[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3577-3578',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3578-3579',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3579-3580',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3585',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+38[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3587',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:TARGET:339[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3588',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！用脚？！用这个也可以舒服么？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3589',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「既然您这么说的话。。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3590',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将小巧的脚丫放在%NAME:MASTER%的肉棒上，慢慢的摩擦起来[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3591',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为是第一次，所以技术显得相当的生疏[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3592',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3593-3594',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3595-3596',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖S气质Lv3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3597',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:TARGET:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:20[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:339[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3598',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3599',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哼哼~%UNICODE\(0x2661\)[ \t]+\*1%[ \t]+主人还真是喜欢%SELF_CALL\(TARGET\)%的小脚呢」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3600',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如果是主人的话，让你舔一下也不是不行哦~」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3601',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将小巧的脚丫放到了%NAME:MASTER%的脸上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3602',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+淡淡的足香充斥了%NAME:MASTER%的鼻腔[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3603-3604',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哼哼~%UNICODE\(0x2661\)[ \t]+\*1%主人很想要%SELF_CALL\(TARGET\)%的小脚是吧」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3604',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哼哼~%UNICODE\(0x2661\)[ \t]+\*1%主人很想要%SELF_CALL\(TARGET\)%的小脚是吧」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3605',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「给。舔吧~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3606',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的脸上带着迷人的微笑，将仿若美玉雕成般的玉足放到了%NAME:MASTER%的面前[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3607-3608',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3608',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3609',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%伸出舌头细致的舔着%SAVESTR:TARGET%的幼足，又酸又甜的感觉从舌尖传来，随即传遍了%NAME:MASTER%的全身。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3610',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%的肉棒更加兴奋了！[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3611-3612',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%突然伸出手一把抓住了%SAVESTR:TARGET%的小脚，将它固定在自己的眼前[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3612',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%突然伸出手一把抓住了%SAVESTR:TARGET%的小脚，将它固定在自己的眼前[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3613',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「干。。干什么啊」%SAVESTR:TARGET%显得有些慌乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3614',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%并没有应答，只是%SAVESTR:TARGET%的脚趾含入口中，细致的舔着，感受着玉趾不安的扭动。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3615',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%的肉棒更加兴奋了！[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3616-3617',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3617',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3618',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，真的是有够变态呢！只是干还不够么~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3619',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用轻蔑的眼神看着%NAME:MASTER%因为舔足而兴奋不已的肉棒[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3620',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子的主人，必须要给与惩罚才行呢」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3621',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将空闲的另一只小脚放到了%NAME:MASTER%的肉棒上。用力的践踏着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3622',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子对主人来说，应该更爽了不是么~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3623-3624',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还想要更爽么~%UNICODE\(0x2661\)[ \t]+\*1%主人~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3624',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还想要更爽么~%UNICODE\(0x2661\)[ \t]+\*1%主人~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3625',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将空闲的另一只小脚放到了%NAME:MASTER%的肉棒上方，轻蔑的声音不断的刺激着%NAME:MASTER%的神经。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3626',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「想要的话~%UNICODE\(0x2661\)[ \t]+\*1%说出来嘛~%UNICODE\(0x2661\)[ \t]+\*1%主人~%UNICODE\(0x2661\)[ \t]+\*1%诚心恳求的话~%UNICODE\(0x2661\)[ \t]+\*1%就让你更爽哦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3627',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%并没有回应%SAVESTR:TARGET%的话语，只是伸出手抓住了%SAVESTR:TARGET%的小脚，将它放到了自己的肉棒上。不停的摩擦着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3628',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，真是个变态呢~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3629-3630',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3630',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3632',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:TARGET:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:20[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:339[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3634',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3635',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人喜欢%SELF_CALL\(TARGET\)%的小脚么，嗯~主人的话，想怎么样都可以~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3636',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！要先舔么？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3637',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将小巧的玉足放到你的眼前，可爱的脚趾害羞的并拢着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3638',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的话~%UNICODE\(0x2661\)[ \t]+\*1%没有关系哦」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3639',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%伸出手握住%SAVESTR:TARGET%的小脚，慢慢的摩挲着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3640',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要~%UNICODE\(0x2661\)[ \t]+\*1%好痒~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3641',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%伸出舌头，舌头划过%SAVESTR:TARGET%的足弓，然后将可爱的玉趾含入口中。用舌头舐舔着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3642-3643',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀！主人？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3643',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀！主人？！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3644',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%NAME:MASTER%伸手抓住%SAVESTR:TARGET%的小脚的时候，%SAVESTR:TARGET%似乎受到了一点惊吓，但是很快就平静了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3645',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人真是的~明明只要跟%SELF_CALL\(TARGET\)%说，%SELF_CALL\(TARGET\)%就会给你的说~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3646',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%并没有进行回应。只是将%SAVESTR:TARGET%的小脚紧紧握住，慢慢的摩挲着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3647',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！舔么。。嗯~%UNICODE\(0x2661\)[ \t]+\*1%主人的话，可以哦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3648',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%伸出舌头，舌头划过%SAVESTR:TARGET%的足背，双手微微分开%SAVESTR:TARGET%因为害羞并在一起的玉趾，然后在趾缝中细细的舐舔着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3649-3650',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3650',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3651',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的话~%UNICODE\(0x2661\)[ \t]+\*1%这里肯定也想要了呢~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3652',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将另一只小脚放到了肉棒上方，小巧的玉趾轻点在龟头上。然后用轻柔的动作慢慢的划到肉棒根部，微微的挑逗着阴囊[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3653',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「舒服么，主人~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3654',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人能喜欢，那是最好了~%UNICODE\(0x2661\)[ \t]+\*1%主人想要的话，再多都没有关系哦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3655',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用小脚摩挲着%NAME:MASTER%的肉棒，小巧的脚趾有意无意的划过%NAME:MASTER%的龟头和马眼，刺激着%NAME:MASTER%的敏感点，让肉棒显得越发狰狞。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3656-3657',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！肉棒也想要？！恩。可以哦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3657',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！肉棒也想要？！恩。可以哦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3658',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将另一只小脚放到了肉棒上，轻轻的摩挲着，仿佛是怕弄痛了%NAME:MASTER%一般。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3659',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！再重点？！这样子不会痛么，主人~」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3660',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯！既然是主人说的。。豁啦~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3661',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%慢慢的开始加重小脚上的力道，肉棒与足弓的接触也越发亲密，小脚摩挲着肉棒带来的快感也飞快的上升，让肉棒显得越发狰狞。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3662-3663',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3663',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3664',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人~%UNICODE\(0x2661\)[ \t]+\*1%用脚给主人做着做着~%UNICODE\(0x2661\)[ \t]+\*1%我这里也湿了呢~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3665',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%张开双腿，红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3666',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如果可以的话~%UNICODE\(0x2661\)[ \t]+\*1%主人~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3668',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%放下手中的玉足，将头埋入%SAVESTR:TARGET%的双腿之间，一股淡淡的幼女小穴的味道迎面而来，让%NAME:MASTER%不禁伸出舌头细细的舐舔着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3669',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯~%UNICODE\(0x2661\)[ \t]+\*1%主人真是性急~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3670',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3671-3672',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%将手中的玉足放到肉棒旁，双手微微分开%SAVESTR:TARGET%的大腿，映入眼帘的是%SAVESTR:TARGET%那美丽的幼女小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3672',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%将手中的玉足放到肉棒旁，双手微微分开%SAVESTR:TARGET%的大腿，映入眼帘的是%SAVESTR:TARGET%那美丽的幼女小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3673',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哎？！自己分开。。。这样子，好害羞啊，但是，既然是主人的话，嗯~%UNICODE\(0x2661\)[ \t]+\*1%请慢用……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3674',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸用小手分开了花瓣，粉嫩的小穴微微开合着，在两边的壁肉之间隐约可以看见一条条银丝。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3675',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%毫不犹豫的把头埋入%SAVESTR:TARGET%的双腿之间，伸出舌头品尝着可口的幼女小穴。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3676',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊嗯~%UNICODE\(0x2661\)[ \t]+\*1%主人~%UNICODE\(0x2661\)[ \t]+\*1%」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3677',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边被你舔着小穴，一边用小脚夹着你的肉棒上下摩挲着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3678-3679',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3679',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3680-3681',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;抖S气质Lv1以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3682',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:20[ \t]+>=[ \t]+1[ \t]+&&[ \t]+\(CFLAG:339[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3683',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3684',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用。。用脚做么，主人的癖好还真是奇怪呢~」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3685',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%将小巧的脚丫放到了肉棒上。用足弓慢慢的摩挲着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3686-3687',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人。。用。。用脚会让主人开心么。。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3687',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人。。用。。用脚会让主人开心么。。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3688',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+带着一些迟疑与好奇%SAVESTR:TARGET%用小巧的脚丫夹住了肉棒，上下不停的摩挲着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3689-3690',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3690',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3691',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊？！主人的肉棒变得更大更热了！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3692',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%娇嫩的足底不住的摩挲着%NAME:MASTER%的肉棒，美妙的触感使得肉棒越发狰狞。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3693',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+强烈的快感随着%SAVESTR:TARGET%的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让%NAME:MASTER%欲罢不能。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3694',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3695',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主。主人。。刺激这里。会更舒服？？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3696',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%听从%NAME:MASTER%的命令用玉趾刺激着马眼和冠状沟，小心翼翼的拨动反而使%NAME:MASTER%的快感疯狂上升。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3697',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+强烈的快感随着%SAVESTR:TARGET%的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让%NAME:MASTER%欲罢不能。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3698-3699',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「既。。既然是主人的命令的话，%SELF_CALL\(TARGET\)%也只能尽力去做了呢！豁啦~」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3699',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「既。。既然是主人的命令的话，%SELF_CALL\(TARGET\)%也只能尽力去做了呢！豁啦~」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3700',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%NAME:MASTER%的指示下，开始逐渐加重小脚的力度。随着力度的不断增加%NAME:MASTER%越发能感受到%SAVESTR:TARGET%足底的娇嫩与幼女足交带来的强烈快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3701',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+强烈的快感随着%SAVESTR:TARGET%的足交从脊椎末端喷涌而出，一瞬间便充斥了全身，让%NAME:MASTER%欲罢不能。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3702-3703',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3703',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3704-3705',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3706',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:339[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3707',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3708',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「要用脚来做嘛？？」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3709',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的脸上带着些许害怕与迟疑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3710',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%NAME:MASTER%毫不理会的抓过%SAVESTR:TARGET%的小脚放在了肉棒上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3711-3712',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还要用脚来做么。。呜。。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3712',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「还要用脚来做么。。呜。。」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3713',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%带着一些迟疑与害怕，畏畏缩缩的把小脚放到了肉棒上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3714-3715',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3715',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3716',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%用小脚慢慢的摩挲着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3717',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+并不熟练的感觉，反而能带来另一种快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3718-3719',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的幼女小脚慢慢的摩挲着%NAME:MASTER%的狰狞肉棒[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3719',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的幼女小脚慢慢的摩挲着%NAME:MASTER%的狰狞肉棒[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3720',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+那种畏畏缩缩小心翼翼的感觉，带给%NAME:MASTER%的快感完美的掩盖了%SAVESTR:TARGET%技术不熟练的瑕疵[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3721-3722',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3722',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:TARGET:339[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3723-3724',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3724-3725',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3725-3726',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3731',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+40[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3733',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:341[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3734',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜呜，好，好痛！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3735',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%做错了什么吗，呜呜，对不起，对不起，不要打了啦！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3736',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:341[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3737-3738',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3739-3740',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3741',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:341[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3742',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……痛，痛，主人，好痛～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3743',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着屁股上的痛楚，%SAVESTR:TARGET%扭动着身体，那样子仿佛是在诱惑着%SAVESTR:MASTER%一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3744',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+明明还是小孩子的身体，却已经被调教的能从这种惩罚中获得快感了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3745',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，%SELF_CALL\(TARGET\)%是坏孩子呢，所以请主人更严厉的惩罚%SELF_CALL\(TARGET\)%吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3746',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:341[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3748',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:341[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3749',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……呜呜……%SELF_CALL\(TARGET\)%，哪里做的不好吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3750',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着，忍耐着从屁股上传来的痛楚。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3751',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+自己一定是哪里侍奉的不好才会被惩罚的吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3752',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……下次一定会更好的服侍主人的呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3753',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「（但是……是主人的话……就是被惩罚……也……）」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3754',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:341[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3755-3756',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;苦痛刻印Lv3\+屈服刻印Lv3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3757',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:0[ \t]+==[ \t]+3[ \t]+&&[ \t]+MARK:2[ \t]+==[ \t]+3[ \t]+&&[ \t]+\(CFLAG:341[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3758',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……咕……对，对不起……对不起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3759',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为虐待的疼痛而感到害怕的%SAVESTR:TARGET%，紧握着拳头，努力的忍耐着痛苦。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3760',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看样子已经彻底的认识到了自己身为他人奴隶的事实。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3761',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……呜……主人……请，请原谅我……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3762',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:341[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3763-3764',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3765',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:341[ \t]+<=[ \t]+1[ \t]+&&[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3766',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呀……！对不起，对不起……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3767',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不理会%SAVESTR:TARGET%的哀求，%SAVESTR:MASTER%用力的一下下的拍打着白嫩的小屁股。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3768',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好……好痛呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3769',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:341[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3770-3771',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3771-3772',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3772-3773',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3778',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+41[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3780',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:342[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3782',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3783',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……这样子……呀……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3784',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着身上传来的疼痛的%SAVESTR:TARGET%痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3786',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3787',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人……对不起……哈呜……对……不起……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3788',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3790-3791',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿呀……哈咕……不要……不……不要呜啊啊」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3791',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿呀……哈咕……不要……不……不要呜啊啊」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3792',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为疼痛蜷缩着身体，大声的哭个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3793-3794',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3794',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3795-3796',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3797-3798',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv5以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3799',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3800',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……好……好痛……不要……呀……呜……哈呜……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3801',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着身上传来的疼痛的%SAVESTR:TARGET%痛苦的呻吟着，但是声音之中似乎隐藏着一点快感的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3802',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对……对不起……哈啊……啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3803',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3805',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3806',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……好……好痛……不要……呀……呜……哈呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3807',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着身上传来的疼痛的%SAVESTR:TARGET%痛苦的呻吟着，缩着身体哀求着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3808',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3810',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3811',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3813',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3814',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人……对不起……哈呜……对……不起……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3815',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3816',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这也是……主人的……哈呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3817',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3819',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3820',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人……对不起……哈呜……对……不起……呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3821',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的抓着床单，虽然很疼，但只要是主人做的事情，不管是什么事都必须要忍受才行。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3822',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3824',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3825',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3827',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:342[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3828',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%毫不留情一次次对着幼小的身体挥下鞭子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3829',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……好痛……！不要打了……求求你……呀……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3830',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在疼痛下缩成一团，不停的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3831',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3833',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:335[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3834',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:342[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3835-3836',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3836-3837',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3837-3838',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3843',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+42[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3845',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:343[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3847',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3849',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3851-3852',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3852-3853',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3853',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3854-3855',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3856-3857',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv5以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3858',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3859',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3861',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3862',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3864',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3865',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3867',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3868',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3870',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3871',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3873',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3874',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3876',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:343[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3877',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3879',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:343[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3880',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:343[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3881-3882',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3882-3883',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3883-3884',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3890',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+43[ \t]+&&[ \t]+TEQUIP:43[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3892',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:344[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3894',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3895',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3897',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3898',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然有点可怕……但是主人想的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3900-3901',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要啊……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3901',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要啊……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3902-3903',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3903',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3904-3905',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3906-3907',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv5以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3908',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3909',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3910',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些兴奋的乖乖的坐着，任由%SAVESTR:MASTER%给她带上眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3911',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3913',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3914',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3915',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%期待的乖乖的坐着，任由%SAVESTR:MASTER%给她带上眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3916',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3918',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3919',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……要带这种东西……唔……主人说会更舒服的话……嗯～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3920',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3922',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3923',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然有点可怕……不过只要是主人想做的事情……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3924',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些兴奋的乖乖的坐着，任由%SAVESTR:MASTER%给她带上眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3925',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3927',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3928',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然有点可怕……但是主人想的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3929',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%期待的乖乖的坐着，任由%SAVESTR:MASTER%给她带上眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3930',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3932',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3933',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……虽然有点可怕……但是主人想的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3934',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3936',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:344[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3937',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……一定要……带这个咩……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3938',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%没有反抗，有些害怕的坐着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3939',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3941',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:344[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3942',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要啊……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3943',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:344[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3944-3945',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3945-3946',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3946-3947',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;終了時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3948',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+43[ \t]+&&[ \t]+TEQUIP:43[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3950',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:380[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3951',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……已经结束了咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3952',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:380[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3954',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:380[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3955',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主……人……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3956',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:380[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3958',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:380[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3959',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要继续了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3960',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:380[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3961-3962',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3962-3963',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3969',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+44[ \t]+&&[ \t]+TEQUIP:44[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3971',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:345[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3973',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3974',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，是这种play呢……感觉心脏激动在不停的跳呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3975',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%兴奋的看着%SAVESTR:MASTER%，积极的配合着主人的动作被牢牢的绑住了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3977',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3978',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽，虽然有点可怕，但是只要是主人想要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3979',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些害怕的闭着眼睛，毫不反抗的被牢牢的绑住了[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3981-3982',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……不要……你，你要做什么……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3982',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……不要……你，你要做什么……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3983',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%看着拿着绳子逼近的%SAVESTR:MASTER%，一步步的后退着，虽然激烈的进行反抗，但是仍然被绳子牢牢的绑住了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3984-3985',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3985',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3986-3987',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3988-3989',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv5以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3990',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3991',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%紧紧绑住的%SAVESTR:TARGET%，感受着被紧缚住的快感，像小狗一样吐着舌头，呼出甜美的热气。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3992',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这样子绑着什么的……哈啊啊………好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3993',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '3995',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3996',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%紧紧绑住的%SAVESTR:TARGET%，稚气的小脸上露出了欲望的表情，轻轻的喘息着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3997',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……呼嗯……这样子的play……也不坏呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '3998',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4000',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4001',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4003',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4004',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%紧紧绑住的%SAVESTR:TARGET%，小口小口的喘着气，下面好像已经变得湿漉漉的了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4005',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这样绑住的话……是要做更加H的事情吧……嗯……可以的哟……%SELF_CALL\(TARGET\)%的身体……请随便使用吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4006',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4008',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4009',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……真是粗暴的说……诶嘿嘿……这样的主人也……好喜欢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4010',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%紧紧绑住的%SAVESTR:TARGET%，轻轻扭动着稚嫩身体诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4011',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4013',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4014',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4016',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:345[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4017',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……不……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4018',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻声喘息着，小小的身体被绳子紧紧的绑住，看起来像是待宰的羔羊一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4019',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4021',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:345[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4022',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:345[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4023-4024',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4024-4025',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4025-4026',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;終了時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4027',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+44[ \t]+&&[ \t]+TEQUIP:44[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4029',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:385[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4030',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……已经结束了吗……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4031',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些遗憾的仰视着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4033',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在白皙的大腿之间，透明的爱液沿着内侧流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4034',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:385[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4036',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:385[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4037',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……不会留下印子吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4038',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸看着仰视着%SAVESTR:MASTER%[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4040',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在白皙的大腿之间，透明的爱液沿着内侧流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4041',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:385[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4043',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:385[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4044',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……哈啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4045',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻抽泣着，抚摸着被绑的部位。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4047',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小脸上似乎泛着红晕……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4048',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:385[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4049-4050',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4050-4051',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4057',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+45[ \t]+&&[ \t]+TEQUIP:45[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4059',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:346[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4061',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4062',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呼嗯……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4063',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%有些诱惑的轻轻喘息着，像是在诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4065',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4066',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呜呜……呼……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4067',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4069-4070',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……这种东西……呜……呜呜……？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4070',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……这种东西……呜……呜呜……？！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4071',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被强行塞上口球的%SAVESTR:TARGET%，晶莹的泪珠在眼眶里打转转。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4072-4073',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4073',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4074-4075',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4076-4077',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋抖M气质Lv5以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4078',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+8[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4079',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呼嗯……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4080',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%有些诱惑的轻轻喘息着，像是在诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4081',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的小脸兴奋的看着%SAVESTR:MASTER%，唾液从口球的洞中滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4082',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4084',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+7[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4085',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呼嗯……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4086',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%有些诱惑的轻轻喘息着，像是在诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4087',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的小脸兴奋的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4088',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4090',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4091',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……呼嗯……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4092',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%有些诱惑的轻轻喘息着，像是在诱惑着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4093',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4095',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4096',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呼呜呜……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4097',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4098',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的小脸兴奋的看着%SAVESTR:MASTER%，唾液从口球的洞中滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4099',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4101',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4102',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呼呜呜……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4103',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4104',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的小脸兴奋的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4105',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4107',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4108',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呼呜呜……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4109',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被塞上口球的%SAVESTR:TARGET%红着脸轻轻喘息着，仿佛在散发着让人欺负的气息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4110',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4112',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:346[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4113',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕呜呜……呜……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4114',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被强行塞上口球的%SAVESTR:TARGET%，晶莹的泪珠在眼眶里打转转。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4115',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+唾液从口球的洞中滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4116',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4118',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:346[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4119',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕呜呜……呜……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4120',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被强行塞上口球的%SAVESTR:TARGET%，晶莹的泪珠在眼眶里打转转。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4121',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:346[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4122-4123',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4123-4124',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4124-4125',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;終了時[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4126',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+SELECTCOM[ \t]+==[ \t]+45[ \t]+&&[ \t]+TEQUIP:45[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4128',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:386[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4129',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……呼啊……诶嘿嘿……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4130',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:386[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4132',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:386[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4133',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……口水都……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4134',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:386[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4136',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:386[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4137',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……啊……不要了啦……这种事情……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4138',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:386[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4139-4140',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4140-4141',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4147',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+46[ \t]+&&[ \t]+TEQUIP:46[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4149',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:347[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4151',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4152',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子里面……要坏掉了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4154',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4155',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……会……会加油的……哈……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4157-4158',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿咿……不要……好难受……肚子……好难受啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4158',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咿咿……不要……好难受……肚子……好难受啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4159-4160',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4160',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4161-4162',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4163-4164',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋A感覚Lv3以上＋抖M气质Lv3以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4165',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:347[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4166',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……这种肚子快要爆炸的感觉……呜嗯……好棒……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4167',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被大量的注入灌肠液，肚子都微微鼓起来的%SAVESTR:TARGET%，在腹痛和便意的刺激下露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4168',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人……就这样……做更多H的事情……吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4169',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着后面时不时传来的刺激，%SAVESTR:TARGET%魅惑的看着%SAVESTR:MASTER%，小小的身体时不时轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4170',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4172',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:347[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4173',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……肚子里面……嗯……这样子不行啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4174',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被大量的注入灌肠液，肚子都微微鼓起来的%SAVESTR:TARGET%，在腹痛和便意的刺激下轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4175',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……但是这样子刺激的话……哈啊……不行……要去了啦……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4176',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4178',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:347[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4179',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……肚子里面……一直在响着……虽然难受……可是……感觉……好奇怪呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4180',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被大量的注入灌肠液，肚子都微微鼓起来的%SAVESTR:TARGET%，不停的轻轻喘息着，从可爱的呻吟声来看，似乎痛苦中也混杂着快感的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4181',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……那个……呜呜……请……请更加的……疼爱%SELF_CALL\(TARGET\)%吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4182',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着后面时不时传来的刺激，%SAVESTR:TARGET%撒娇一般的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4183',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4185',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:347[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4186',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……呀……肚子里面……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4187',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被大量的注入灌肠液，肚子都微微鼓起来的%SAVESTR:TARGET%，在腹痛和便意的刺激下轻轻颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4188',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……被主人这样子看着……好害羞……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4189',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4191',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:3[ \t]+>=[ \t]+3[ \t]+&&[ \t]+ABL:21[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:347[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4192',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜啊啊……肚子里面……呜呜……不行……哈啊啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4193',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被大量的注入灌肠液，肚子都微微鼓起来的%SAVESTR:TARGET%，在腹痛和便意的刺激下露出了违背本心的恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4194',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……明明不行的……明明不行的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4195',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4197',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+CFLAG:347[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4198',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……不要……呜……好……难受……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4199',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%虐待着后面的%SAVESTR:TARGET%，捂着肚子颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4200',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为什么……要做这种事情呜……肚子……要坏掉了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4201',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:347[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4202-4203',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4203-4204',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4204-4205',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4210',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+55[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4212',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:356[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4214',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4215',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶诶，为什么停下来了呢？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4217',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4218',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主……主人……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4220-4221',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要看这边，呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4221',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要看这边，呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4222-4223',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTL[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4223',
        any: [/^(?:\uFEFF)?[ \t]*PRINTL[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4226',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4229',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4232',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门里插入着肛珠、肛门紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4235',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的阴蒂被安装着的电动阴蒂夹持续刺激着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4238',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的乳头被安装着的电乳头夹持续刺激着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4241',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%的胸部被装上的榨乳器吸出了母乳。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4244',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4247',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%被装上了眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4250',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的身体被绳子绑住拘束了起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4253',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4256',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门被插入了电极、轻微的电流流过让括约肌颤动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4259',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+然后、那样的%SAVESTR:TARGET%姿态被完全录了下来………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4260',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4261-4262',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4263-4264',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱＋欲情Lv3以上[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4265',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:3[ \t]+&&[ \t]+\(CFLAG:356[ \t]+<=[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4266',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，主人，不要停下来啦……H的事情，还想要更多的说～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4267',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的两腿不住的摩擦着，如果不是因为%SAVESTR:MASTER%的命令的话大概现在就已经开始自慰了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4268',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4270',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:356[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4271',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶诶～继续来做嘛～主人～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4272',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4274',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:3[ \t]+&&[ \t]+\(CFLAG:356[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4275',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……主人……不要这样子……%SELF_CALL\(TARGET\)%没有主人的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4276',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%喘着气，大腿互相摩擦着，透明的爱液沿着大腿流了下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4277',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4279',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:356[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4280',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主，主人……？怎么了呢……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4281',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4283',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:356[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4284',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……不要再做这种事了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4285',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:356[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4286-4287',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTL[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4287',
        any: [/^(?:\uFEFF)?[ \t]*PRINTL[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4290',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的秘裂里蠕虫蠢动着、毫不留情的在腔内转动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4293',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门里蠕虫蠢动着、毫不留情的蹂躏着腔内。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4296',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门里插入着肛珠、肛门紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4299',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的阴蒂被安装着的电动阴蒂夹持续刺激着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4302',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的乳头被安装着的电乳头夹持续刺激着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4305',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%的胸部被装上的榨乳器吸出了母乳。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4308',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的阴茎被装上了飞机杯，现在也好像快要射精了一样摆动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4311',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%被装上了眼罩。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4314',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的身体被绳子绑住拘束了起来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4317',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肚子因为灌肠而发出咕噜咕噜的声音、好像拔出塞子的话马上就会排出来似的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4320',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的肛门被插入了电极、轻微的电流流过让括约肌颤动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4323',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+然后、那样的%SAVESTR:TARGET%姿态被完全录了下来………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4324-4325',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4325-4326',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4333',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+56[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4335',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:357[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4337',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:53[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4338',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:MASTER%命令%SAVESTR:TARGET%做一个自我介绍。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4339',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]+&&[ \t]+\(TALENT:89[ \t]+\|\|[ \t]+ABL:17[ \t]+>=[ \t]+5\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4340',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+于是%SAVESTR:TARGET%将自己的名字、喜欢的H的方式[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4342',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+[ \t]+还有手淫时妄想的内容[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4343',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+之类的介绍了出来……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4344',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4345',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4346',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4347',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……人家的名字是%SAVESTR:TARGET%呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4348',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4349',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4350',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4351',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4352',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4353',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%羞红着脸对着水晶球作着自我介绍，时不时看向%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4354',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……那个……好害羞的说……那个……人家的名字是%SAVESTR:TARGET%……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4355',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4356',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4357',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4358',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4359',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:76[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+5\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4360',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边介绍着自己，一边蹭着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4361',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+两腿之间好像已经湿了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4362',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4363',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:10[ \t]+>=[ \t]+3[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+4[ \t]+\|\|[ \t]+ABL:17[ \t]+>=[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4364',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%乖巧的向着水晶球开始了自我介绍。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4365',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4366-4367',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一句话也不说，一直抽泣个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4367',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一句话也不说，一直抽泣个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4368-4369',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4369-4370',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4370',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4371',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边与%SAVESTR:MASTER%说着话，一边对着%SAVESTR:MASTER%露出了重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4372',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:76[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4373',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%开心的朝着%SAVESTR:MASTER%撒着娇，说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4374',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(PALAM:4[ \t]+>=[ \t]+PALAMLV:4[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5[ \t]+\|\|[ \t]+TALENT:85[ \t]+\|\|[ \t]+TALENT:76\)[ \t]+&&[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4375',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+[ \t]+%SAVESTR:TARGET%一边压抑着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4376',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:11[ \t]+\|\|[ \t]+TEQUIP:13[ \t]+\|\|[ \t]+TEQUIP:14[ \t]+\|\|[ \t]+TEQUIP:15[ \t]+\|\|[ \t]+TEQUIP:16[ \t]+\|\|[ \t]+TEQUIP:17[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4377',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+快乐的[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4378',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TEQUIP:44[ \t]+\|\|[ \t]+TEQUIP:49[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4379',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+痛苦的[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4380-4381',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+呼吸声，一边努力回应着%SAVESTR:MASTER%……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+呼吸声，一边努力回应着%SAVESTR:MASTER%……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4383',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4384',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边这么说着，一边对着水晶球露出了重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4385',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这里……好想被主人疼爱呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4386',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:4[ \t]+>=[ \t]+PALAMLV:4[ \t]+\|\|[ \t]+TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4387',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%开心的朝着%SAVESTR:MASTER%撒着娇，对着水晶球说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4388',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……快点……来做舒服的事情吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4389',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:4[ \t]+>=[ \t]+PALAMLV:2[ \t]+\|\|[ \t]+[ \t]+ABL:10[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4390',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4391',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……❤呀……哈啊……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4392-4393',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%乖巧的低着头听着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4393',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%乖巧的低着头听着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4394-4395',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4395-4396',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:357[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4396',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:357[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4397-4398',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4399-4400',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;ビデオ自己紹介[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4401',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:53[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4402',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:MASTER%催促着%SAVESTR:TARGET%进行自我介绍。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4403',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4404',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边自我介绍着，一边对着水晶球露出了重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4405',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4406',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:76[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4407',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%开心的朝着%SAVESTR:MASTER%撒着娇，对着水晶球说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4408',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4409',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]+&&[ \t]+\(TALENT:89[ \t]+\|\|[ \t]+ABL:17[ \t]+>=[ \t]+5\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4410',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+于是%SAVESTR:TARGET%将自己的名字、喜欢的H的方式[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4412',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+[ \t]+还有手淫时妄想的内容[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4413',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+之类的介绍了出来……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4414',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4415',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4416',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%稚气的小脸上浮现出和年龄不符的欲望，轻咬着手指对着水晶球作着自我介绍。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4417',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……人家的名字是%SAVESTR:TARGET%呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4418',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最喜欢的事情呢，当然是和魔王大人最H的事情了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4419',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，魔王大人的肉棒，超～舒服的呢～❤小穴也好屁股也好嘴巴也好，哪里都被肉棒弄的很舒服的说～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4420',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「现在每天都要想着魔王大人的肉棒自慰个不停呢～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4421',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4422',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4423',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%羞红着脸对着水晶球作着自我介绍，时不时看向%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4424',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……那个……好害羞的说……那个……人家的名字是%SAVESTR:TARGET%……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4425',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……虽然是单方面的……那个……现在……那个……在恋爱中……大概……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4426',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶诶……喜欢的人？那个……一定要说的话……呜……那个……魔王大人呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4427',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……只要魔王大人要求的话……虽然很害羞……但是……请大家看……亲热的事情……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4428',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4429',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:76[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+5\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4430',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边这么说着，一边蹭着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4431',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+两腿之间好像已经湿了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4432',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4433',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:10[ \t]+>=[ \t]+3[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+4[ \t]+\|\|[ \t]+ABL:17[ \t]+>=[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%乖巧的向着水晶球开始自我介绍了[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4435',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:32[ \t]+\|=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4436-4437',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一句话也不说，一直抽泣个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4437',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一句话也不说，一直抽泣个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4438-4439',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4439-4440',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:PLAYER%[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4440',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:PLAYER%[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4441',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4442',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边与%SAVESTR:MASTER%说着话，一边对着%SAVESTR:MASTER%露出了重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4443',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]+&&[ \t]+\(TALENT:76[ \t]+\|\|[ \t]+ABL:11[ \t]+>=[ \t]+5\)[ \t]+&&[ \t]+TFLAG:60[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4444',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%开心的朝着%SAVESTR:MASTER%撒着娇，对着%SAVESTR:MASTER%说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4445',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+\(PALAM:4[ \t]+>=[ \t]+PALAMLV:4[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5[ \t]+\|\|[ \t]+TALENT:85[ \t]+\|\|[ \t]+TALENT:76\)[ \t]+&&[ \t]+PALAM:5[ \t]+>=[ \t]+PALAMLV:4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4446',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+[ \t]+%SAVESTR:TARGET%一边压抑着[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4447',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:11[ \t]+\|\|[ \t]+TEQUIP:13[ \t]+\|\|[ \t]+TEQUIP:14[ \t]+\|\|[ \t]+TEQUIP:15[ \t]+\|\|[ \t]+TEQUIP:16[ \t]+\|\|[ \t]+TEQUIP:17[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4448',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+快乐的[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4449',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TEQUIP:44[ \t]+\|\|[ \t]+TEQUIP:49[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4450',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+痛苦的[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4451-4452',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+呼吸声，一边努力回应着%SAVESTR:MASTER%……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4452',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+呼吸声，一边努力回应着%SAVESTR:MASTER%……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4454',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4455',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%一边这么说着，一边对着%SAVESTR:MASTER%露出了重要的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这里……好想被主人疼爱呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4457',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:4[ \t]+>=[ \t]+PALAMLV:4[ \t]+\|\|[ \t]+TALENT:85[ \t]+\|\|[ \t]+ABL:10[ \t]+>=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4458',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%开心的朝着%SAVESTR:MASTER%撒着娇，说着色色的话语。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4459',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……快点……来做舒服的事情吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4460',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+PALAM:4[ \t]+>=[ \t]+PALAMLV:2[ \t]+\|\|[ \t]+[ \t]+ABL:10[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4461',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%大口大口的喘着气，小小的身体因为快感而像触电一样痉挛个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4462',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……❤呀……哈啊……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4463-4464',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%乖巧的低着头听着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4464',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+%SAVESTR:TARGET%乖巧的低着头听着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4465-4466',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4466-4467',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4467-4468',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4474',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+123[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4476',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:360[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4478',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4479',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人的美味的肉棒……%SELF_CALL\(TARGET\)%会好好的让它舒服的哟❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4480',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%散发着和稚气的外表不符的色气，用平坦而柔软的小胸部开始摩擦起%SAVESTR:MASTER%的肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4483',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4484',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人的那个……还是那么……呜……雄伟的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4485',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯～%SELF_CALL\(TARGET\)%会努力让主人变得舒服起来的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4486',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%微微有些害羞的仰着头看着%SAVESTR:MASTER%，用平坦而柔软的小胸部开始侍奉起%SAVESTR:MASTER%的肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4488',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4489',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「用……用胸部吗……明白了的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4490',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的用平坦而柔软的小胸部开始侍奉起%SAVESTR:MASTER%的肉棒来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4492-4493',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这……这种事情……呜……讨厌啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4493',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这……这种事情……呜……讨厌啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4494',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:MASTER%的命令下挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4495-4496',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4496',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4497-4498',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4499-4500',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4501',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:360[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4502',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……主人的肉棒……嗯……好热……好硬……感觉……好棒呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4503',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然胸部很小，但是这样～这样～嗯……啾哈……呐呐……舒服吗……？❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4504',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸上浮现出色色的表情，一边用平坦而柔软的小胸部开始摩擦起%SAVESTR:MASTER%的肉棒，一边轻轻舔舐着前端。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4505',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4507',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:360[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4508',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……能侍奉主人什么的……%SELF_CALL\(TARGET\)%很开心的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4509',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……这样子……感觉怎么样……舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4510',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的一边用平坦而柔软的小胸部侍奉着%SAVESTR:MASTER%的肉棒，一边仰着头询问着%SAVESTR:MASTER%的感觉。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4512',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:360[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4513',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……这个力度……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4514',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……不太擅长呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4515',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%乖巧而有些笨拙的用平坦而柔软的小胸部侍奉着%SAVESTR:MASTER%的肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4516',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4518',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:360[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4519',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……为什么要做这种事情……呜……真是的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4520',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+因为畏惧着%SAVESTR:MASTER%，%SAVESTR:TARGET%在挂着泪珠不情愿的用平坦而柔软的小胸部摩擦着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4521-4522',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4522',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:360[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4523-4524',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4524-4525',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4525-4526',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4526-4527',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4530',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+125[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4532',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:361[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4534',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4535',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……嗯……呜……呼啊……主人的……肉棒……呼……好美味……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4536',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4538',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4539',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4540',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%开心的用小嘴侍奉着%SAVESTR:MASTER%的肉棒，在%SAVESTR:MASTER%的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4542',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4543',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4544',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%SAVESTR:MASTER%的命令下，%SAVESTR:TARGET%一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4546-4547',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……这种事……呜……太……羞耻了呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4547',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……这种事……呜……太……羞耻了呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4548',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%挂着泪珠不情愿的在%SAVESTR:MASTER%的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4549-4550',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4550',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4551-4552',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4553-4554',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4555',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:361[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4556',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……嗯……主人的……呼啊……又热又硬呢……诶嘿嘿……好美味呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4557',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%一边像吃棒棒糖一样舔弄吮吸着粗大的肉棒，一边用小手摩擦着自己的下半身，透明的爱液将手指弄的湿漉漉的，从幼嫩的下体滴到地上。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4559',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……这里……好想被肉棒侵犯……好想被主人的肉棒插进来……在里面……咕啾咕啾的……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4560',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4562',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:361[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4563',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……呼……嗯……主人……嗯……喜欢……最喜欢了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4564',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%开心的用小嘴侍奉着%SAVESTR:MASTER%的肉棒，在%SAVESTR:MASTER%的命令下玩弄着自己的身体，濡湿的下半身将手指弄的湿漉漉的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4566',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……和主人在一起……真是……超幸福呢……如果能和主人……嗯……变成主人的东西的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4567',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4569',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:361[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4570',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼嗯……哈……自己……嗯……弄吗……这样子……呼呜……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4571',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在%SAVESTR:MASTER%的命令下，%SAVESTR:TARGET%一边用小嘴服侍着肉棒，一边用手指在两腿之间轻轻摩擦着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4572',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4574',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:361[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4575',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……这种事……呜……太……羞耻了呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4576',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%挂着泪珠不情愿的在%SAVESTR:MASTER%的命令下一边含着肉棒，一边用手指摩擦着自己两腿之间。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4577',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:361[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4578-4579',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4579-4580',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4580-4581',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4586',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+126[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4588',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:362[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4590',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4591',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……啾～❤要在%SELF_CALL\(TARGET\)%嘴里射好多好多的牛奶哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4592',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%开心的舔弄着肉棒，小手也随着舌头一起按摩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4594',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4595',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯……主人……这样子……舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4596',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含住前端温柔的舔弄着，小手轻轻揉捏着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4598',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4599',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……嗯……嗯呜……主人……是……这样吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4601-4602',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……用手……和嘴巴什么的……呜……这种……地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4602',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……用手……和嘴巴什么的……呜……这种……地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4603-4604',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4604',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4605-4606',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4607-4608',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4609',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:362[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4610',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的肉棒……啾～❤要在%SELF_CALL\(TARGET\)%嘴里射好多好多的牛奶哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4611',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%开心的舔弄着肉棒，小手也随着舌头一起按摩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4612',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒在颤抖着呢……诶嘿嘿❤就这么舒服吗～漏出来的东西也……好美味……嗯呼……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4613',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4615',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:362[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4616',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……嗯……主人……这样子……舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4617',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含住前端温柔的舔弄着，小手轻轻揉捏着肉棒，在含不进去的部分按摩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4618',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾嗯……嗯……呼……主人的味道……嗯……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4619',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4621',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:362[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4622',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……嗯……嗯呜……主人……是……这样吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4623',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的听从着%SAVESTR:MASTER%的命令，努力的用小手和嘴巴侍奉着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4624',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4626',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:362[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4627',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……用手……和嘴巴什么的……呜……这种……地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4628',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小手轻握着肉棒，不太情缘的服侍着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4629',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:362[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4630-4631',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4631-4632',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4632-4633',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4639',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+127[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4641',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:363[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4643',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4644',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4645',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+将%SAVESTR:MASTER%粗大的肉棒完全含住的%SAVESTR:TARGET%用力的吮吸着，发出了非常淫乱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4646',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的……肉棒……啾噗……呜……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4648',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4649',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4650',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4651',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾……哈呜……主人……这样子……啾噗……舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4653',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4654',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4656-4657',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4657',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4658-4659',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4659',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4660-4661',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4662-4663',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4664',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4665',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……啾……嗯……肉棒……啾……好好吃……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4666',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+将%SAVESTR:MASTER%粗大的肉棒完全含住的%SAVESTR:TARGET%用力的吮吸着，发出了非常淫乱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4667',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的……肉棒……啾噗……呜……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4668',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4670',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:363[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4671',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……啾……啾噗……呼哈……主人的……味道……好浓烈呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4672',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%温暖的小嘴紧紧的包裹着肉棒，用力的吮吸个不停，滋滋的发出了非常淫乱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4673',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啾……哈呜……主人……这样子……啾噗……舒服吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4674',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4676',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:363[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4677',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呜……呼……这样子……主人……满意……呜……吗？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4678',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着眼泪用力的吮吸着肉棒，发出了非常淫乱的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4679',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4681',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:363[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4682',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……啾噗……奇怪的味道……呜……一定要……这么做吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4683',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:363[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4684-4685',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4685-4686',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4686-4687',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4692',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+69[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4694',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:364[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4696',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4697',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4698',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%趴在%SAVESTR:MASTER%身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4699',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4700',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4701',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4703',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4704',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……被主人弄这种事……呜……感觉……很荣幸……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4705',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%更加卖力的服侍着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4707-4708',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……不，不要那样子舔呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4708',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……不，不要那样子舔呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4709',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%的脸的更红了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4710-4711',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4711',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4712-4713',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4714-4715',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4716',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:364[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4717',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人的肉棒……还想要……更多……嗯啾……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4718',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%趴在%SAVESTR:MASTER%身上吮吸着肉棒，感受着双腿之间被舌头侵犯的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4719',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……哈啊……主人的舌头……舔的好舒服呢……嗯……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4720',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%也不能输呐❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4721',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4723',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:364[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4724',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主……主人也要做吗……那种事情……诶嘿嘿……感觉……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4725',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%更加细心的服侍着肉棒，小小的舌头在肉棒上轻轻的滑动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4726',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……舔这里的话……主人会舒服呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4727',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「在轻轻颤抖着呢……诶嘿嘿……❤%SELF_CALL\(TARGET\)%会更加努力的～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4728',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4730',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:364[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4731',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……被主人弄这种事……呜……感觉……很荣幸……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4732',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%更加卖力的服侍着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4733',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜……呼……热热的呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4734',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4736',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:364[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4737',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……不，不要那样子舔呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4738',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受到%SAVESTR:MASTER%的舔弄，%SAVESTR:TARGET%的脸的更红了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4739',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:364[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4740-4741',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4741-4742',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4742-4743',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4748',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+124[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4750',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:365[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4752',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4753',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「含到最里面？嗯～没问题哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4754',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4755',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……嗯嗯……呜……咕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4757',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4758',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4759',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4760',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……哈呜呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4762',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4763',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……全部都……含进去了……哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4764',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的遵从着%SAVESTR:MASTER%的命令，将肉棒全部含了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4766-4767',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……呜……呜呜……好难受……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4767',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……呜……呜呜……好难受……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4768',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+害怕着%SAVESTR:MASTER%的%SAVESTR:TARGET%含着眼泪将肉棒吞进了大半，露出了苦闷的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4769-4770',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4770',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4771-4772',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4773-4774',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4775',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:363[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4776',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「含到最里面？嗯～没问题哟～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4777',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%毫不犹豫的含住了肉棒，温热的小嘴不断吞咽着，布丁一样柔软的最里面蠕动着按摩着肉棒的前端。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4778',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……嗯嗯……呜……咕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4779',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「（这种……窒息感……身体的感觉……快感翻倍了啦……❤）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4780',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4782',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:363[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4783',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「最，最里面吗……呜嗯……为了主人的话……不管什么都没问题的哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4784',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%粉嫩的嘴唇轻碰着肉棒的前端，温热的小嘴慢慢的将肉棒含了进去，一点点的进入到布丁一样柔软的最里面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4785',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾……哈呜呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4786',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「（呜呜……虽然有些难受……感觉脑子都一片空白了……但是只要主人舒服的话……）」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4787',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4789',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:363[ \t]+<=[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4790',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……全部都……含进去了……哟……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4791',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的遵从着%SAVESTR:MASTER%的命令，将肉棒全部含了进去。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4792',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4794',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:363[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4795',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……呜……呜呜……好难受……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4796',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+害怕着%SAVESTR:MASTER%的%SAVESTR:TARGET%含着眼泪将肉棒吞进了大半，露出了苦闷的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4797',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:365[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4798-4799',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4799-4800',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4800-4801',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4809',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+80[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4811',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:381[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4813',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:16[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4814',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「我……我会努力的……嗯………………嗯呜呜…唔…哈咕…呜咳…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4815',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻含住了肉棒，努力不让牙齿碰到。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4816',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着小小的头部，在温暖的小嘴中里粗暴的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4818-4819',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜呜？！呜…呜呜…呜噗！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4819',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜呜？！呜…呜呜…呜噗！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4820',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%粗暴的将肉棒插入%SAVESTR:TARGET%的嘴里，抓着头发开始侵犯起小嘴来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4821-4822',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:381[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4822',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:381[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4823-4824',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;二回目以降[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4825-4826',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4827',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:381[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4828',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……嗯……呼呜呜……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4829',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+（嘴巴……被主人这样子侵犯……好舒服……好棒的感觉……❤）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4830',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%享受着嘴巴被侵犯的快感，拼命的吮吸着肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4832',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:381[ \t]+<=[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4833',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……嗯……主……人……嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4834',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%顺从的任由%SAVESTR:MASTER%在自己嘴里抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4835',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+享受着温暖的口穴的%SAVESTR:MASTER%，握着小小的头部粗暴的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4836',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:381[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4838',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜呜……唔……哈咕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4839',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%握着小小的头部，在温暖的小嘴中里粗暴的抽送着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4840',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:381[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4842',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:381[ \t]+<=[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4843',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呜……呜……呜噗！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4844',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%粗暴的将肉棒插入%SAVESTR:TARGET%的嘴里，抓着头发开始侵犯着小嘴。。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4845',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:381[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4846-4847',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4847-4848',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4848-4849',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4858',
        any: [/^(?:\uFEFF)?[ \t]*@KOJO_MESSAGE_PALAMCNG_19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4861-4862',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;口塞着用時には口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4864-4865',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;失神時には口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4867-4868',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;兽奸PLAY中は口上をスキップする。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4870-4871',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;触手調教中は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4873-4874',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;死斗场中は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4875',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TEQUIP:55[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4876-4877',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4877-4878',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;崩坏した場合は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4879-4880',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4889',
        any: [
          /^(?:\uFEFF)?[ \t]*A[ \t]+=[ \t]+UP:11[ \t]+\+[ \t]+UP:12[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4890',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:3[ \t]+==[ \t]+1[ \t]+&&[ \t]+CFLAG:229[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4892',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:20[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4894',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(A[ \t]+<[ \t]+500[ \t]+\|\|[ \t]+TFLAG:150[ \t]+==[ \t]+1\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4895',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤这样子终于……做H的事情了呢……好开心❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4896',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+初次被异物进入的幼穴，紧紧的包裹住了肉棒。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4898',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(A[ \t]+<[ \t]+500[ \t]+\|\|[ \t]+TFLAG:150[ \t]+==[ \t]+1\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4899',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊……主人的肉棒……进来了……呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4900',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着眼泪轻轻的颤抖着，但是小脸上却满溢着幸福的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4902-4903',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……住手啊……好……好痛……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4903',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……住手啊……好……好痛……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4904',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被肉棒强硬插入的幼穴因为疼痛而用力的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4906-4907',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;主人のちんこ以外による处女喪失[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4908-4909',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱かつ反抗刻印取得せず[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4910',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4911',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……有点痛呢……但是……H……好舒服❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4912',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然不是主人的肉棒有点遗憾呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4914',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4915',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……明明是……想要留给主人的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4916',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的抽泣着，晶莹的泪珠从眼角滴落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4918-4919',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……求求你……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4919',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……求求你……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4920',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%哭着哀求着，因为强烈的疼痛，声音都显得有些颤抖。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4921-4922',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4922-4923',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:229[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4923',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:229[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4923-4924',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:229[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4929',
        any: [
          /^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:3[ \t]+\+[ \t]+UP:3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4930',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+P[ \t]+>[ \t]+PALAMLV:2[ \t]+&&[ \t]+CFLAG:221[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4932',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4934',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+50[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4935',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……！主人……这个……感觉好奇怪的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4936',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%羞红着小脸，有些困惑的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4937',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――润滑初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4939-4940',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……这个……是什么……是%SELF_CALL\(TARGET\)%的……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4940',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……这个……是什么……是%SELF_CALL\(TARGET\)%的……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4941',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4942',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――润滑初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4943-4944',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4945-4946',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;润滑液を使った場合[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4947',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+50[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4948',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜……！不要啦……感觉凉凉的……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4949',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%羞红着小脸，微微挣扎着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4950',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――润滑初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4952-4953',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……这是什么……不要看……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4953',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……这是什么……不要看……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4954',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些不知所措的看着透明的爱液，完全是孩子的幼小身躯，诚实的回应着快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4955',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――润滑初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4956-4957',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4957-4958',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:221[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4958',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:221[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4958-4959',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:221[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4964',
        any: [
          /^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:5[ \t]+\+[ \t]+UP:5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4965',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+P[ \t]+>[ \t]+PALAMLV:2[ \t]+&&[ \t]+CFLAG:222[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4967',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4969',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+51[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4970',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……身体……变得奇怪起来了……感觉有点热呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4971',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+听话的喝下媚药的%SAVESTR:TARGET%，皮肤微微泛起了可爱的粉红色。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4972',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……抱抱……❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4973',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――欲情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4975-4976',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……喜欢……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4976',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……喜欢……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4977',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+紧紧的抱着%SAVESTR:MASTER%的手不放的%SAVESTR:TARGET%，仰着头红着脸看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4978',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――欲情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4979-4980',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4981-4982',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;媚药を使った場合[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4983',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+51[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4984',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……这是什么……不要……咕……呜呜……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4985',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:MASTER%强迫喝掉媚药的%SAVESTR:TARGET%，很快就软绵绵的靠在墙上，皮肤微微泛起了可爱的粉红色。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4986',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……身体……感觉……好奇怪……热热的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4987',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――欲情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4989-4990',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……感觉……身体……变得奇怪起来了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4990',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶……感觉……身体……变得奇怪起来了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4991',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+连H的事情都还不能完全理解的%SAVESTR:TARGET%，因为身体的变化而困惑的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4992',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――欲情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4993-4994',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4994-4995',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:222[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '4995',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:222[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '4995-4996',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:222[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5001',
        any: [
          /^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:8[ \t]+\+[ \t]+UP:8[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5002',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+P[ \t]+>[ \t]+PALAMLV:2[ \t]+&&[ \t]+CFLAG:223[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5004',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5005',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主，主人……这种事……太害羞了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5006',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%害羞的捂着脸，撒娇一般的轻声抱怨着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5007',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――耻情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5009-5010',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……呜呜……不要看……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5010',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……呜呜……不要看……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5011',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸羞得仿佛要滴出水来，小手徒劳的想遮挡着裸露的部位。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5012',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――耻情初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5013-5014',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:223[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5014',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:223[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5014-5015',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:223[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5020',
        any: [
          /^(?:\uFEFF)?[ \t]*P[ \t]+=[ \t]+PALAM:10[ \t]+\+[ \t]+UP:10[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5021',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+P[ \t]+>[ \t]+PALAMLV:2[ \t]+&&[ \t]+CFLAG:224[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5023',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5024',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……主人……好凶……好可怕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5025',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着泪珠看着%SAVESTR:MASTER%，因为害怕而颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5026',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――恐怖初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5028-5029',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对，对不起……我什么都……都会做的……已经……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5029',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对，对不起……我什么都……都会做的……已经……不要了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5030',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%害怕缩成一团，像小动物一样颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5031',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+―――恐怖初次超过LV2。[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5032-5033',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:224[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5033',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:224[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5033-5034',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:224[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5039',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+NOWEX:0[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:225[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5040',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……感觉……呀……嗯哈啊啊…………！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5041',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着阴蒂传来的快感，身体不住的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5042',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这是……呜呜……什……么……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5043',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:225[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5047',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+NOWEX:0[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:225[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5049',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5050',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……那，那样子刺激那里的话……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5051',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+粉红色的小豆被%SAVESTR:MASTER%刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5052',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人，菲娅，还，还想要更多呜呜～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5054',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5055',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主，主人……请……请不要一直的……弄……那个……地方……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5056',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+粉红色的小豆被%SAVESTR:MASTER%刺激着，幼小而敏感的身体在一波波的快感下不断的颤抖着，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5057',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜呜……又，又要去了呜呜呜呜～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5059-5060',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那里被……被弄着……又，又要变得奇怪了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5060',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那里被……被弄着……又，又要变得奇怪了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5061',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着小豆豆传来的刺激，茫然的在快感下扭动着身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5062-5063',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5068',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+NOWEX:1[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:226[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5070',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5071',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……=肚子里面……肉棒……咕啾咕啾的……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5072',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5073',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……这就是……高潮吗……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5074',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%沉浸在刚刚的快感中，还有些失神的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5076',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5077',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……嗯……肚子里面……呜呜……要，要变得奇怪了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5078',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5079',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……感觉……刚刚……好像飞起来一样呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5080',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%沉浸在刚刚的快感中，还有些失神的样子。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5082-5083',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……不要……呜呜……要，要变得奇怪了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5083',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……不要……呜呜……要，要变得奇怪了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5084',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖着，未成年的幼穴初次绝顶带来的快感不断的刺激着神经，让肉壁不住的紧缩着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5085',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……呜……什么……刚刚的是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5086-5087',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:226[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5087',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:226[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5089',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+NOWEX:1[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:226[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5091',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TFLAG:60[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5092',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啊啊～主人，好，好舒服，要去了，要去了嗯嗯嗯嗯～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5093',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5094',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……肉棒……好舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5095',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的小脸上露出了恍惚的表情。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5097',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TFLAG:60[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5098',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……已经……嗯……～不行了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5099',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5100',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼……啊……又……又去了……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5101',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的有些脱力的捂着害羞的小脸。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5103-5104',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……不……不要……嗯～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5104',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……不……不要……嗯～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5105',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%小小的身体像触电一样颤抖，未成年的幼穴紧吸着不放。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5106-5107',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5112',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+NOWEX:2[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:227[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5114',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5115',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～～屁股被这样子弄……呜……主人，已经～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5116',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5117',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……好舒服……呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5119',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5120',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……屁股……感觉……呜……什么……这是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5121',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5122',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股……呼……啊……感觉……怪怪的呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5124-5125',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呀……不要……屁股……不要再……嗯嗯嗯～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5125',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼呀……不要……屁股……不要再……嗯嗯嗯～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5126',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+初次感受到后面绝顶的感觉的雏菊用力的收缩，菊穴不留缝隙的包裹着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5127',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……这个感觉……是……什么……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5128-5129',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:227[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5129',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:227[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5131',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+NOWEX:2[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:227[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5133',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TFLAG:60[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5134',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯～主人，不要停下来……屁股已经……呼啊啊啊～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5135',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5136',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……屁股被主人这样玩弄什么的……也好舒服呢～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5137',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的大口的喘着气，带着痴态望着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5139',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+&&[ \t]+TFLAG:60[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5140',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……主人……这，这样下去……屁股……呜……已经……嗯嗯……～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5141',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5142',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……又，又被主人给弄的……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5143',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%害羞的撒着娇，身体沉浸在高潮的余韵中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5145-5146',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……不……不要……嗯～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5146',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……不……不要……嗯～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%又热又紧的雏菊用力的收缩，一点缝隙不留的压榨着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5148-5149',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5154',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+NOWEX:3[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:228[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5156',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5157',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～～胸部感觉……啊啊啊……好舒服……好厉害……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5158',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着胸部传来的刺激，兴奋的颤抖着高潮了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5159',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「胸部……呜呜……哈啊啊啊啊～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5161',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5162',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……主人……这样子……弄的话……嗯呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5163',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着胸部传来的刺激，羞红着脸高潮了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5164',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……嗯哈……胸部……好……舒服……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5166-5167',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……胸部……不要……呜呜……要，要变得……嗯呀～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5167',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……胸部……不要……呜呜……要，要变得……嗯呀～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5168',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着胸部传来的刺激，不知所措的高潮了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5169',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「什么……刚才的是……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5170-5171',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:228[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5171',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:228[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5174',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+NOWEX:3[ \t]+>[ \t]+0[ \t]+&&[ \t]+CFLAG:228[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5176',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5177',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊啊～胸部被这样玩弄，会，会坏掉的啦～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5178',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5179',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「又，又要去了呜呜呜～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5181',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5182',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不，不要这样子刺激胸部……呼啊啊……已经……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5183',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的草莓被刺激着，透过平坦的胸部可以感受到下方像小兔子一样不停跳动的小心脏，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5184',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主，主人，要去了，要去了呜呜呜呜～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5186-5187',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……！胸部，不，不要呜呜呜～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5187',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀……！胸部，不，不要呜呜呜～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5188',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%感受着胸部传来的刺激，不知所措的高潮了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5189-5190',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5197',
        any: [/^(?:\uFEFF)?[ \t]*@KOJO_MESSAGE_MARKCNG_19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5200-5201',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる）[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5203-5204',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;失神時には口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5206-5207',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;兽奸PLAY中は口上をスキップする。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5209-5210',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;触手調教中は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5212-5213',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;崩坏した場合は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5215-5216',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;死斗场中は口上をスキップする[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5217-5218',
        any: [
          /^(?:\uFEFF)?[ \t]*SIF[ \t]+TEQUIP:55[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5223',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:22[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:297[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5225',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5226',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈咕……主人……好痛的说……这样子……%SELF_CALL\(TARGET\)%……会坏掉的啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5227',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为强烈的痛楚大口大口的喘息着，已经连哭声都渐渐变小了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5228',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……呜……求……求求你……温柔一点点就好……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5229-5230',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛呜呜……不要……求求你……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5230',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛呜呜……不要……求求你……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5231',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为强烈的痛楚而不住的哀求着%SAVESTR:MASTER%，已经连哭声都渐渐变小了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5232-5233',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:297[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5233',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:297[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5233-5234',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:297[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5239',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:23[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:298[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5241',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]+\|\|[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5242',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人……嗯……H的事情什么的……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5243',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+神情有些恍惚的%SAVESTR:TARGET%，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5244-5245',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……感觉身体……呼啊啊……好奇怪……好舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5245',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……感觉身体……呼啊啊……好奇怪……好舒服……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5246',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+神情有些恍惚的%SAVESTR:TARGET%，小小的身体已经完全的沉浸在了和年龄不符的H行为带来的快感中了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5247-5248',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:298[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5248',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:298[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5248-5249',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:298[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5254',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:24[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:299[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5256',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5257',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「%SELF_CALL\(TARGET\)%……为了主人的话……什么事情都没问题的呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5258',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%红着脸抬头看着，经过反复的调教之后，小小的身体已经从身心上完全的服从于%SAVESTR:MASTER%了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5259-5260',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……%SELF_CALL\(TARGET\)%……什么都会乖乖听话的……所以请主人……至少……温柔一点呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5260',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……%SELF_CALL\(TARGET\)%……什么都会乖乖听话的……所以请主人……至少……温柔一点呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5261',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被反复调教的%SAVESTR:TARGET%，擦拭着眼角的泪珠，轻声的说着完全服从的誓言。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5262-5263',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:299[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5263',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:299[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5263-5264',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:299[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5269',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:21[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:300[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5271',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5272',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……就算是主人……这样子……呜……也太过分了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5273',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧紧的盯着%SAVESTR:MASTER%，晶莹的泪水在眼眶里打转转。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5274',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事情……呜……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5275-5276',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜，不要，不要过来～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5276',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜，不要，不要过来～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5277',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然%SAVESTR:TARGET%比平时更加激烈的抵抗着，但是只是需要稍微多用一点点力气的程度而已。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5278',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+有些不耐烦的%SAVESTR:MASTER%强行的将抵抗压制住了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5279-5280',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:300[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5280',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:300[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5280-5281',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:300[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5287',
        any: [/^(?:\uFEFF)?[ \t]*@SELF_KOJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5291',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5293',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+Q[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5294',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+「%SAVESTR:ASSI%大人……那个……拜托……更加的……疼爱%SELF_CALL\(TARGET\)%……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5295',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%拉着%SAVESTR:ASSI%的手，轻轻摩擦着大腿，水汪汪的大眼睛里满是情欲的眼光。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5297',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+Q[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5298',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]+「狗狗先生的那个……想要……这样子光靠手指的话……呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5299',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些欲求不满的自慰着，沉迷于异种的肉棒带来的快感中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5301-5302',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;淫乱\+尻穴狂[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5303',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:261[ \t]+<=[ \t]+6[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5304',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……主人……这里……还想更多的被侵犯呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5305',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%沉浸在调教的快乐中，自己用手指玩弄着后面。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5306',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5308',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:261[ \t]+<[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5310',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5311',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……好想和主人继续做舒服的事情……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5312',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%的手指在自己还没有被异物插入过的小穴上抚弄，刺激着自己的小豆豆。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5313',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……在主人破掉这里之前……哈啊……%SELF_CALL\(TARGET\)%会……嗯……好好忍耐的……呐❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5314-5315',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……感觉……主人的肉棒……仿佛还留在里面呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5315',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……感觉……主人的肉棒……仿佛还留在里面呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5316',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%不停抽动着手指，在自己的下半身进出着，带出黏糊糊的爱液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5317',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……但是……果然还是……哈呀……没有主人的舒服呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5318-5319',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5319',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5321',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+TALENT:77[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:261[ \t]+<=[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5322',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……想被主人……疼爱后面……想和主人……更加的……亲热……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5323',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻弄着雏菊，朝%SAVESTR:MASTER%撒着娇。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5324',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……哈啊……主人…………❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5325',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5327',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:261[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5328',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5329',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……喜欢你……最喜欢你了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5330',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%紧靠着%SAVESTR:MASTER%，小手在两腿间动着，发出了有些色气的喘息。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5331',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好想把全部都奉献给主人……呐……主人……求求你……把第一次……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5332-5333',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5333',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……主人……主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5334',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+想象着%SAVESTR:MASTER%的样子，想象着那是主人的手指，%SAVESTR:TARGET%不断玩弄着自己的下半身，[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5335',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……只是这样子的话……呜……好想更加的……和主人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5336',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+纤细的手指在幼穴中进出着，带出了黏糊糊的爱液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5337-5338',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5338',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5340',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:31[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:261[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5341',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……已经……忍不住了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5342',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「明明……这样的事情……但是……好，好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5343',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5345',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:261[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5346',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事情……好，好过分……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5347',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻揉着被粗暴对待的身体，无形中刺激着敏感的地方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5348',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:261[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5349-5350',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5350-5351',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5351-5352',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5355',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5357',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+\(CFLAG:262[ \t]+<[ \t]+5[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5358',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……姐姐大人……哈啊……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5359',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%和%SAVESTR:ASSI%的身体纠缠在一起，任由对方摆弄着自己。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5360',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……就是……那里……呀……好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5361',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5363',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:262[ \t]+<[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5364',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「姐姐大人……呜……这样子……主人会……哈啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5365',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:ASSI%压着%SAVESTR:TARGET%，手指在幼小的蜜裂上滑动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5367',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:23[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5368',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻喘息着，娇小的身体因为快感而微微的颤抖着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5369',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊……那里……不，不行……嗯……哈啊啊」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5370',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+感受着指尖湿润的%SAVESTR:ASSI%坏笑着加快了速度。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5371',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……姐，姐姐大人……这样子的话……呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5373-5374',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的忍耐着快感，不让自己叫出声来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5374',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%努力的忍耐着快感，不让自己叫出声来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5375',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈咕……嗯……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5376',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:ASSI%轻舔着身下的幼女，加大了指尖的力度……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5377-5378',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5378',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5380',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:33[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:262[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊，姐姐大人……嗯……呀……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5382',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的声音在屋子里回响着，%SAVESTR:TARGET%向侍奉%SAVESTR:MASTER%那样用心的侍奉着%SAVESTR:ASSI%，用自己的身体取悦着对方。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5383',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「姐姐大人的手指……呜……好……舒服……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5384',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:ASSI%温柔的摸了摸%SAVESTR:TARGET%的头，然后继续玩弄起幼小的身体来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5385',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5387',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:22[ \t]+>=[ \t]+3[ \t]+&&[ \t]+\(CFLAG:262[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5388',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……不行……呀……那里是……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5389',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%在%SAVESTR:ASSI%的玩弄下，发出了可爱的娇喘声。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5390',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+明明同样是女孩子，却莫名的激起了%SAVESTR:ASSI%欺负的欲望，无力的幼女就这样被压倒，一次次的玩弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5391',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5393',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:262[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5394',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……姐姐……这种事情……求求你……呀……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5395',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%徒劳的在%SAVESTR:ASSI%身下挣扎着，感受着对方的手指入侵自己身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5396',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:262[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5397-5398',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5403',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5405',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+==[ \t]+1[ \t]+&&[ \t]+\(CFLAG:263[ \t]+<[ \t]+4[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5406',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，今天也早安的说～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5407',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%含着一大早就挺立着的肉棒，稚嫩的小嘴熟练的吸吮着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5408',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯啾……呼……哈啊……主人的肉棒……诶嘿……一早上就……嗯……很精神呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5409',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看着%SAVESTR:TARGET%可爱而淫乱的小脸，%SAVESTR:MASTER%忍不住按着小小的脑袋，在温暖的小嘴里射了出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5410',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯嗯嗯～～～～」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5411',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的牛奶……还想多喝一点呢……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5412',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:263[ \t]+=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5414',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+\(CFLAG:263[ \t]+<[ \t]+3[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5415',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呼……呼哈……主人……早安……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5416',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%温柔的侍奉着一大早就挺立着的肉棒，稚嫩的小嘴含住粗大的肉棒，小小的舌头不停的在肉棒上滑动着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5417',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人的味道……全部都是呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5418',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+看着%SAVESTR:TARGET%天真可爱的小脸，%SAVESTR:MASTER%忍不住按着小小的脑袋，在温暖的小嘴里射了出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5419',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯嗯嗯～～～～」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5420',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯咕……主人的……嗯……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5421',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+将嘴里的牛奶尽数吞下之后，%SAVESTR:TARGET%服侍着%SAVESTR:MASTER%的起居，开始了新的一天……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5422',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:263[ \t]+=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5424',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:16[ \t]+>=[ \t]+5[ \t]+&&[ \t]+\(CFLAG:263[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5425',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……呼……呼啊……」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5426',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%认真的用柔软的舌头侍奉着一大早就挺立着的肉棒，努力的让%SAVESTR:MASTER%舒服。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5427',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾哈……主人……这样子……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5428',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在发泄过欲望之后，新的一天开始了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5429',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:263[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5431',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:263[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5432',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈……呜……呜咕……主，主人……早上……好」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5433',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%有些生涩的做着侍奉，畏缩的看着%SAVESTR:MASTER%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……看来还需要一些调教呢。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5435',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:263[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5436-5437',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5442',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5444',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:2[ \t]+>=[ \t]+4[ \t]+&&[ \t]+\(CFLAG:264[ \t]+<[ \t]+2[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5445',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+!TALENT:85[ \t]+&&[ \t]+!TALENT:76[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5446',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+已经习惯了肉棒的幼穴不断的刺激着肉棒，温暖湿润的肉壁紧紧的吸着入侵的异物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5447',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%不断的抽送着，肆意的使用着未发育的幼小身躯。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5449',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5450',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呀～～主人，好厉害……还要，还想要更多～～主人的肉棒……和……精液牛奶……嗯～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5451',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%搂着%SAVESTR:MASTER%，积极的迎合着抽送，贪图着肉棒带来的快感。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5453',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5454',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的那个……这样子在肚子里面……哈啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5455',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「被主人使用着……好开心……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5456',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为快感的刺激而微微的颤抖着，在%SAVESTR:MASTER%的身下撒着娇。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5457-5458',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*SIF[ \t]+S[ \t]+>=[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5459',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束以后，忍不住又把%SAVESTR:TARGET%推倒在床上，在小穴里面射了\{S\}次才满足……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5460',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:264[ \t]+=[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5462',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:264[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5463',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶诶……不是已，已经结束了咩……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5464',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呀……主人……太激烈……了……嗯呀……太激烈了啦～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5465',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……呼啊啊啊……主人的那个……又…………嗯哈啊啊啊～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5466',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束后，忍不住又把%SAVESTR:TARGET%按在床上狠狠欺负了一番，射了\{S\}次才满足的起身……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5467',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:264[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5468-5469',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5474',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5475',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:265[ \t]+<[ \t]+1[ \t]+\|\|[ \t]+FLAG:7[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5477',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5478',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束后准备回卧室休息的%SAVESTR:MASTER%在走廊上碰见了等在门外的%SAVESTR:TARGET%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5479',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的拽着%SAVESTR:MASTER%的衣角，另一只手抱着枕头，小脸半埋在里面，只露出两只眼睛。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5480',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+水汪汪的大眼睛看着旁边，大概是因为害羞而不敢直接看着吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5481',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呐呐……主人……今天……一起睡觉……可以吗……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5482',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在得到了%SAVESTR:MASTER%肯定的回答后，%SAVESTR:TARGET%兴奋的抬起了头，露出了开心的笑容。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5483',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，主人，最喜欢你了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5485',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5486',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「主人……已经要休息了咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5487',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束后的%SAVESTR:MASTER%躺在床上正准备休息时，听到了门被推开的声音。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5488',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「今天的……侍寝……那个……如果可以的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5489',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻的咬着手指，湿润的瞳孔充斥着满满的欲望，直直的看着这边。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5490',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在得到你的允许后，%SAVESTR:TARGET%小跑着扑到了床上，用力的蹭着%SAVESTR:MASTER%的身体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5491',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哇～主人最好了～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5493-5494',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束后，刚清洗完身体的%SAVESTR:MASTER%，推开门看见的是穿着睡衣等在外面的%SAVESTR:TARGET%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5494',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+调教结束后，刚清洗完身体的%SAVESTR:MASTER%，推开门看见的是穿着睡衣等在外面的%SAVESTR:TARGET%。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5495',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……那个……今天的……牛奶……还……没有……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5496',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+害羞的用枕头遮住脸的%SAVESTR:TARGET%，用细不可闻的声音轻轻的说着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5497',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:MASTER%露出了一丝得意的笑容，拽着眼前幼女的袖子带进了卧室，然后顺手将门锁上了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5498-5499',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:265[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5499',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:265[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5500-5501',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5511',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5513',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5515',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+S[ \t]+>=[ \t]+1000000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5516',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了现今当政的人类国王。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5517',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+出卖灵魂投靠了%SAVESTR:MASTER%的他，满心欢喜的用大量的金钱将原来的公主买了回来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5518',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5519',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5520',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在那之后，听说被国王关在屋子里，彻底的沦为了玩物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5521',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的身体每晚都承受着那个人残暴的兽欲。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5524',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不得不感叹，有时候人类对同族做的事情，比对异族做的事情要残酷的多。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5525',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+话说回来，区区人类对魔王抱有恋慕什么的真是可笑。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5526',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5527',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5529',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+S[ \t]+>=[ \t]+500000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5530',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了魔族的富豪。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5531',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5532',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5533',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在那之后，听说被富豪当做幼犬养着，变成了非常顺从的宠物。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5534',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+能够享用被魔王亲自调教过的女性，对魔族来说也算是一种荣耀了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5535',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+更何况她原本的身份还是人类的公主，身体的保养自然是最上等的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5536',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+似乎常常会被带到富豪们的晚宴上炫耀，然后当着众人的面被玩弄着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5537',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+尊严那种东西，早就不知道被摧残殆尽丢到哪里去了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5538',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+话说回来，区区人类对魔王抱有恋慕什么的真是可笑。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5539',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5540',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5542',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+S[ \t]+>=[ \t]+100000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5543',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了魔王城的娼馆。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5544',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5545',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5546',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5547',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然还是个孩子，但幼小的身体内隐藏着的魅力，很快就成为了娼馆的头牌之一。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5548',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5549',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然说娼妓可以被人赎身，不过那大概也只是被买回去当成专属的性奴隶吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5550',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+话说回来，区区人类对魔王抱有恋慕什么的真是可笑。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5551',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5552',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5554-5555',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了商人当做女仆。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5555',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了商人当做女仆。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5556',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%一言不发的含着眼泪，一直回头看着你。直到车队默默的消失在视线的尽头。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5557',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5558',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+原本是公主的她，对杂物活之类的与其说是不擅长，不如说是完全不会做。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5559',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+但是慢慢做的多了的话，也有点像模像样的了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5560',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+除了要干杂活，也常常被主人给侵犯。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5561',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+过着这样的生活的她，大概常常会在哪个角落里掉眼泪吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5562',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+话说回来，区区人类对魔王抱有恋慕什么的真是可笑。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5563',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然从人类的角度来说有点可怜，不过那已经和身为魔王的你一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5564',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5565-5566',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;反抗刻印Lv3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5567',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5568',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被卖掉的%SAVESTR:TARGET%，含着眼泪用怨恨的目光看着你。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5569',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「像你这样子的坏人，一，一定会有报应的！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5570',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+连虫子都害怕的小鬼说什么傻话呢。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5571',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+这么想着的%SAVESTR:MASTER%，头也不回的转身走了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5572',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5574',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5576',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+S[ \t]+>=[ \t]+1000000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5577',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了魔族的大将。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5578',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5579',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5580',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+即使在魔族里也是拥有着强悍肉体的大将，拥有着非人的庞大兽欲。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5581',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然是这样，但明明还是个小孩子的她却能将其全部承受下来，这大概是因为长期被你调教的缘故吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5582',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+每天都被大将侵犯着她，每天都被灌满浓稠的精液。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5583',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，作为大将的宠姬的%SAVESTR:TARGET%，沉溺于H的快乐中，意外的过着“幸福”的生活。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5584',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5585',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5587',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+S[ \t]+>=[ \t]+500000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5588',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了魔界的艺术家。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5589',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5590',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5591',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在魔界的贵族中相当有名的艺术家，所需要的素材自然也是最顶级的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5592',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+作为原公主的完美的幼体对他来说自然是上等的素材。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5593',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+听说以她为模特，画出了不少相当高价的作品。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5594',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+当然，和作为艺术家的那个人的H自然是少不了的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5595',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5596',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5598',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+S[ \t]+>=[ \t]+100000[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5599',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了魔王城的娼馆。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5600',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5601',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5602',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+像这样被调教好的人类幼女即使魔界也是很少见的，更不用说是被魔王玩弄过的。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5603',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然还是个孩子，但却积极的侍奉着客人，很快就成为了娼馆的头牌之一。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5604',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在充斥着淫靡气氛的娼馆中，幼小的身体每天都侍奉着各式各样的客人。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5605',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然说是被卖过去的，但实际上似乎很乐意过着这样的生活。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5606',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5607',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5609-5610',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了奴隶主。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5610',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+就这样，%SAVESTR:TARGET%被卖给了奴隶主。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5611',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被带走时，%SAVESTR:TARGET%有些不舍的时不时回头看着你，大概是因为今后再也不能被你使用了吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5612',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5613',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+在被奴隶主亲自享用过一番后，作为手下人泄欲的工具，每晚都被男人们轮奸着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5614',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+沉浸在被侵犯的快感中的她，大概到死为止都会被不停的侵犯着吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5615',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过，就算她幼小的身体变得再怎么淫乱，对于已经玩腻了她的你来说也已经一点关系都没有了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5616',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+于是%SAVESTR:MASTER%与%SAVESTR:TARGET%再也没有见过面………[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5617-5618',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;それ以外[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5619-5620',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好想……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5620',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……好想……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5621',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被装在囚车里拉走的她，一路上都不停的抽泣着。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5622',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被当做普通的奴隶卖掉的%SAVESTR:TARGET%，就这样子消失在了黑暗的世界之中。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5623-5624',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5630',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+11[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5631',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:271[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5633',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5635',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5637',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5639',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5641',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5643',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5645',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5647',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5649-5650',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:271[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5650',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:271[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5652-5653',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;崩坏してしまった場合[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5654',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5656',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5658',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5660',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5662',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5664',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5666',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5668',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5670-5671',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:271[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5671',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:271[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5672-5673',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5679',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+12[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5680',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:272[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5682',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5684',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5686',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5688',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5690',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5692',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5694',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5696',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5698',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5700-5701',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:272[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5701',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:272[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5703-5704',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;崩坏している場合[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5705',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:9[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5707',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5709',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5711',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5713',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:102[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5715',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5717',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5719',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]+&&[ \t]+CFLAG:102[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5721',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+MARK:3[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5723-5724',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5724-5725',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:272[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5725',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:272[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5726-5727',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5732',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+13[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5734',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+\|\|[ \t]+TALENT:76[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5736',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:153[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5738',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:154[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5739',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「要健康的成长起来哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5740-5741',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5741-5742',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:273[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5742',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:273[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5742-5743',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:273[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5748',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+14[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5750',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+\|\|[ \t]+TALENT:76[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5751-5752',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:274[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5752',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:274[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5752-5753',
        any: [
          /^(?:\uFEFF)?[ \t]*CFLAG:274[ \t]+=[ \t]+1[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5758',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+999[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5760',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5761',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……主人……明明想要……一直……呆在主人身边的……对不起……对不起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5762',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+怀中的幼女抽泣的声音渐渐的小了，从那上面再也感受不到活物的气息了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5764-5765',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好冷……身体……好冷……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5765',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好冷……身体……好冷……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5766',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+小小的身体渐渐的僵硬了，从那上面再也感受不到活物的气息了。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5767-5768',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5768-5769',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5772',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:13[ \t]+==[ \t]+998[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5774',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5775',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……能这样子……陪伴着主人渡过一生……%SELF_CALL\(TARGET\)%……已经很满足了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5776',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不能一直呆在主人身边……对不起……如果有来生……的……话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5778-5779',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……如果下次……能出生在一个没有战乱的世界……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5779',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……如果下次……能出生在一个没有战乱的世界……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5780-5781',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5786',
        any: [/^(?:\uFEFF)?[ \t]*TFLAG:13[ \t]+=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5788-5790',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5792',
        any: [/^(?:\uFEFF)?[ \t]*;まだ未実装です[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5831',
        any: [/^(?:\uFEFF)?[ \t]*@DUNGEON_RYOUZYOKU_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5835',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……好痛……放开我……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5837',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5839',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「你们要干嘛……呜呜……求求你们……不要啊……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5840',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不知道将要发生什么的%SAVESTR:TARGET%被强行按倒在地上……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5841-5842',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5843',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……那种事情……讨厌～～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5844',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被按在地上的%SAVESTR:TARGET%拼尽全力的抵抗着，但在力量的差距面前毫无用途……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5844-5845',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被按在地上的%SAVESTR:TARGET%拼尽全力的抵抗着，但在力量的差距面前毫无用途……[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5847-5849',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5850',
        any: [/^(?:\uFEFF)?[ \t]*@DUNGEON_RYOUZYOKU_AFTER_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5855',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5857',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……讨厌……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5858',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+虽然还保留着处女，但是仍然被凌辱了一番。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5859',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%缩在角落里抽泣个不停。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5862',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:1[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5863',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……屁股被……做了那种事……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5864',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5865-5866',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;フェラしすぎた感想[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5867',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:22[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5868',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样就……可以了吧……嘴巴好酸哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5869-5870',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;精液の味[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5871',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:20[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5872',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咳咳……好奇怪的……味道……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5873',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻咳嗽着，吐出嘴里白黏黏的液体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5874-5875',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5875-5876',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;非处女[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5877',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……又被……玷污了……被这些怪物给……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5878',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+一身狼藉的%SAVESTR:TARGET%倒在地上，眼泪不断的涌出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5881',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:0[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5882',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子……已经……装……装不下了……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5883',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+幼小的洞口里，精液慢慢的流了出来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5884-5885',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;アナルを弄られすぎた感想[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5886',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:1[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5887',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……屁股被……做了那种事……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5888',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5889-5890',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;フェラしすぎた感想[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5891',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:22[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5892',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样就……可以了吧……嘴巴好酸哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5893-5894',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;精液の味[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5895',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+EXP:20[ \t]+>[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5896',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咳咳……好奇怪的……味道……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5897',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%轻轻咳嗽着，吐出嘴里白黏黏的液体。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5898-5899',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5901-5902',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-----------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5903',
        any: [/^(?:\uFEFF)?[ \t]*@BENKI_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5908',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+FLAG:62[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5911',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5912',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……肉棒……有好多呢……好开心……诶嘿❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5914',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5915',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……不要……主人……%SELF_CALL\(TARGET\)%会好好听话的……这种事情不要……%SELF_CALL\(TARGET\)%只想和主人……呜～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5917',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5918',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然……这种事情很讨厌……但是主人的命令的话……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5920-5921',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……对不起……请原谅%SELF_CALL\(TARGET\)%……呜呜……这种事……不要……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5921',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……对不起……请原谅%SELF_CALL\(TARGET\)%……呜呜……这种事……不要……不要啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5922-5923',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:62[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5923',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:62[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5926',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5927',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……姐姐大人……嗯……请更多的使用%SELF_CALL\(TARGET\)%的身体吧……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5929',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5930',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……姐姐……这样子……呀……不，不行……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5932',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5933',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……侍奉……会好好做的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5935-5936',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……这种事情……呀……好复杂的……感觉……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5936',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……这种事情……呀……好复杂的……感觉……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5937-5938',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:62[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5938',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+FLAG:62[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5941',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5942',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「汪汪～肉棒，嗯～好舒服～～还想要更多一点……汪❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5944',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5945',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……是因为主人才……本来这种事情……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5947',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5948',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「就，就算是怪物……也……也会好好地……侍奉的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5950-5951',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶诶诶，要和怪物什么的……好，好讨厌呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5951',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼诶诶诶，要和怪物什么的……好，好讨厌呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5952-5953',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5953',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5956',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5957',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊，两边都被灌的满满的呢……诶嘿嘿，作为肉便器是当然的吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5959',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5960',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊……哈啊……两边都……呜呜……主人……请原谅%SELF_CALL\(TARGET\)%吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5962',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5963',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……肚子里……已经……装不下了啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5965-5966',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……要……要坏掉了……啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5966',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……要……要坏掉了……啦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5967-5968',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5968',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5971',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5972',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿……还不够呢……%SELF_CALL\(TARGET\)%的小穴……还想要更多的精液的说❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5974',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5975',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……主人以外的精液……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5977',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5978',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜……会好好侍奉的……还没有满足的话……就请……尽情的……继续使用吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5980-5981',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子里面……被灌的满满的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5981',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子里面……被灌的满满的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5982-5983',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5983',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+[ \t]+FLAG:62[ \t]+==[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5986',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5987',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「屁股的话……因为很舒服，所以请更多的使用吧❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5989',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5990',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「身体……被主人以外的人使用了……就算是后面也……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5992',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ABL:A:16[ \t]+>=[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '5993',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜嗯……%SELF_CALL\(TARGET\)%会……好好侍奉的……所以%SELF_CALL\(TARGET\)%的身体……那个……请用到满足为止吧……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5995-5996',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子里面……被灌的满满的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5996',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊……肚子里面……被灌的满满的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '5997-5998',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6000-6002',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-----------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6003',
        any: [/^(?:\uFEFF)?[ \t]*@DUNGEON_VICTORY_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6008',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6010',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿，看来勇者桑还要继续加油才行呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6011-6012',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;その他何か適当に性格によって[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6013',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6014',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这样子的话……呐呐，来做点有趣的事怎么样～？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6015-6016',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜～要不是为了和魔王大人做舒服的事情，才不想来这里呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6016',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜～要不是为了和魔王大人做舒服的事情，才不想来这里呢～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6016-6017',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜～要不是为了和魔王大人做舒服的事情，才不想来这里呢～」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6019',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+\(BASE:A:0[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:0[ \t]+<[ \t]+50\)[ \t]+\|\|[ \t]+\(BASE:A:1[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:1[ \t]+<[ \t]+50\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6021',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……死掉什么的听起来就很难受呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6022-6023',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;余裕余裕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6024',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好，回去吧～～♪」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6025-6026',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;爱慕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6027',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6029',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这，这样子的话……那个……算是%SELF_CALL\(TARGET\)%……赢了吧……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6030-6031',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;その他何か適当に性格によって[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6032',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6033',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然不喜欢这种事，但是为了魔王大人，%SELF_CALL\(TARGET\)%会加油的！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6034-6035',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……你，你还好吧……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6035',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……你，你还好吧……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6035-6036',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……你，你还好吧……？」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6038',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+\(BASE:A:0[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:0[ \t]+<[ \t]+50\)[ \t]+\|\|[ \t]+\(BASE:A:1[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:1[ \t]+<[ \t]+50\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6040',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……不过……还以为已经不行了的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6041-6042',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;余裕余裕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6043',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对，对不起……但是这种程度的话……对于魔王大人来说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6044-6045',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6045-6046',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;決め台詞[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6047',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「什么时候……才能回家呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6048-6049',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORML[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;その他何か適当に性格によって[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6050',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6051',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……%SELF_CALL\(TARGET\)%……呜呜……%SELF_CALL\(TARGET\)%也不想这样的……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6052-6053',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事，明明不应该发生的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6053',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事，明明不应该发生的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6053-6054',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种事，明明不应该发生的说……」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6056',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+\(BASE:A:0[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:0[ \t]+<[ \t]+50\)[ \t]+\|\|[ \t]+\(BASE:A:1[ \t]+\*[ \t]+100[ \t]+\/[ \t]+MAXBASE:A:1[ \t]+<[ \t]+50\)[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6058',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「差点就死掉了呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6059-6060',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;余裕余裕[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6061',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然这次运气好……但是下次的话……要怎么办才好呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6062-6063',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6063-6065',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6069',
        any: [/^(?:\uFEFF)?[ \t]*@DUNGEON_ATTACK_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6074',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:1[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6076',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6077',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「请，请住手吧！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6078',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6079',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要过来～～！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6080-6081',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6081',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起！」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6082-6083',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6083-6084',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;その他・迎撃中[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6086',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]+&&[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6087',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了做舒服的事情所以抱歉呐，勇者姐姐～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6088',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6089',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「诶嘿嘿～～❤」[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6091',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]+&&[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6092',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了魔王大人……%SELF_CALL\(TARGET\)%什么都会去做的……！就，就算这种事情……也……也……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6093',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6094',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……勇者姐姐……但是，请，请回去吧……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6096',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6097',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，勇者姐姐……抱歉了……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6098-6099',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……这种事……对不起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6099',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……这种事……对不起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6100-6101',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6105-6108',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6113',
        any: [/^(?:\uFEFF)?[ \t]*@COLOSSEUM_KOJO_19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6117',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+55[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6119',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+BASE:1[ \t]+<=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6120',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%连站起来的力气都没有了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6121-6122',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为死斗场的热情氛围，看着即将要对战的对手颤抖着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6122',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为死斗场的热情氛围，看着即将要对战的对手颤抖着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6123-6124',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6124-6125',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6125-6126',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6129',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+56[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6131',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+BASE:1[ \t]+<=[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6133',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6134',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咦…咦…不、不要了………啊啊啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6135',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+用尽力气的%SAVESTR:TARGET%坐着哭了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6136-6137',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要不要…不要过来啊…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6137',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要不要…不要过来啊…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6138',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+用尽力气的%SAVESTR:TARGET%坐着哭了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6139-6140',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6140-6141',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;助手が調教中の場合[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6142',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6143',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不、不要啊…怎么可能赢过勇者大人啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6144',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为%SAVESTR:MASTER%的命令武装了起来，看见%SAVESTR:ASSI%之后好像马上就要大哭起来了……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6145-6146',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「救、救救我…主人大人…我、我什么坏事都没做啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6146',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「救、救救我…主人大人…我、我什么坏事都没做啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6147',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%看着丑陋的怪物们向%SAVESTR:MASTER%寻求帮助……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6148-6149',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6149-6150',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6150-6151',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6156',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+31[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6158',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6159',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊唔…我、我会好好舔的…不要做很痛的事……嗯咕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6160',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:ASSI%因为[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6162',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+阴茎[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6164',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+假阴茎[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6165',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+被%SAVESTR:TARGET%含住而露出了快乐的的表情……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6166-6167',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊…嗯咕…嗯唔…咳咳…呕呕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6167',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊…嗯咕…嗯唔…咳咳…呕呕……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6168',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%舔着发出令人作呕的气味的阴茎……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6169-6170',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6170-6171',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6171-6172',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6175',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6177',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6178',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不…不要啊…勇者的姐姐…啊啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6179',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%就那样被%SAVESTR:ASSI%玩弄着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6180-6181',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊…快离开啊…啊啊…好、好痛…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6181',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊…快离开啊…啊啊…好、好痛…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6182',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%因为胸部被大力的揉弄而发出了痛苦的声音……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6183-6184',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6184-6185',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6185-6186',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-------------------------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6189',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+21[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6191',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6192',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要不要…太过分了…不要了啊…啊啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6193',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:ASSI%一边听着悲鸣，一边用[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6195',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+肉棒[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6197',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+假阴茎[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6198',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毫不留情的继续蹂躏着%SAVESTR:TARGET%的腔内……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6200',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:400[ \t]+==[ \t]+206[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6201',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「噶…噶啊…咕…咕哦哦哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6202',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+可怜的%SAVESTR:TARGET%发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6203-6204',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咦…咦…要坏掉了要坏掉了啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6204',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咦…咦…要坏掉了要坏掉了啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6205',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%就那样被怪物侵犯着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6206-6207',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6207-6208',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6213',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+27[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6215',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+ASSI[ \t]+>[ \t]+0[ \t]+&&[ \t]+ASSIPLAY[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6216',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要不要…不是插进哪里啊…不要了啊…啊啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6217',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+%SAVESTR:ASSI%一边听着悲鸣，一边用[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6219',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+肉棒[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6221',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+假阴茎[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6222',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+毫不留情的继续蹂躏着%SAVESTR:TARGET%的肛门……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6224',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:400[ \t]+==[ \t]+206[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6225',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「噶…噶啊…咕…咕哦哦哦……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6226',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+可怜的%SAVESTR:TARGET%发出被踩死的青蛙一样的声音，就那样继续被巨魔玩弄着……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6227-6228',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咦…咦…屁股…屁股要裂开了啊啊啊啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6228',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咦…咦…屁股…屁股要裂开了啊啊啊啊！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6229',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%就那样被怪物侵犯着肛门……[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6230-6231',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6231-6232',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6237',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+SELECTCOM[ \t]+==[ \t]+51[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6238',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊啊…身、身体好热…啊啊…！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6239-6240',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6243-6246',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-----------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6247',
        any: [/^(?:\uFEFF)?[ \t]*@NTR_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6252',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:650[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6254',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+P[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6256',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85	;爱慕[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6257',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不，不要……！第一次明明……明明要给魔王大人的说……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6258-6259',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……好痛……不要……求求你～不要～～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6259',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「讨厌……好痛……不要……求求你～不要～～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6260-6261',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:651[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6261',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:651[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6263',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6264',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85	;爱慕[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6265',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「求求你……呜呜……屁股……快要裂开来了……狂王大人……好难受……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6266-6267',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛……好难受……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6267',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好痛……好难受……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6268-6269',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:652[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6269',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:652[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6271',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6272',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6273',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜，这种事，不要，不要看～～不要看呜啊啊啊啊～～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6274-6275',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为什么……要做这么过分的事情……求求你……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6275',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为什么……要做这么过分的事情……求求你……不要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6276-6277',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:653[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6277',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:653[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6279',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6280',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85	;爱慕[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6281',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……呀……哈呜呜……魔王……大人……呜呜……对，对不起…………」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6282',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%抽泣着，小声的念着%SAVESTR:MASTER%的名字。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6284',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6285',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯哈……❤肉棒……呜呜，好舒服……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6286',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「只要有肉棒……不管在哪里都可以呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6287-6288',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……呀……不……要……呜呜～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6288',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈呜呜……呀……不……要……呜呜～～」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6289-6290',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:654[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6290',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:654[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6292',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6293',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]+;爱慕[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6294',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜……哈啊……呀……求求你们……呀……不……不要……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6295',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「魔王大人……魔王大人……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6296',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+豆大的眼泪不断的从小脸上滑落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6298',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6299',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯呜～呀～～哈啊啊～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6300',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肉棒……呜……两边都……嗯哈～❤塞得满满的～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6301',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「好厉害～～舒服的要，要死掉了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6302-6303',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……哈啊……嘎哈……不……呜……不……要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6303',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊呜呜……哈啊……嘎哈……不……呜……不……要……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6304-6305',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:655[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6305',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:655[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6307',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6308',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6309',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如果……魔王大人在这里的话……呜……魔王大人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6311',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6312',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊哈……❤肉棒，肉棒有好多呢～好开心～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6313-6314',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……不要了啦……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6314',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜……这种事……不要了啦……好想回家……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6315-6316',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:656[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6316',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:656[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6318',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6320',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6321',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「哈啊～～❤狂王大人的肉棒……好厉害，在肚子里面咕啾咕啾的抽送着呢❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6322',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「魔王大人和狂王大人的肉棒，哪边更舒服已经分不清楚了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6323',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6324',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「咕……哈啊啊……呜呀……要坏掉了，肚子，要坏掉了呜呜～～！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6325',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+狂王惊人的尺寸粗暴的在小小的身体里肆虐着，仿佛要将她弄坏掉一样。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6326',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「对不起……魔王大人……对不起……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6327-6328',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「狂，狂王大人……呜呜……求求你……温柔一点……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6328',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「狂，狂王大人……呜呜……求求你……温柔一点……呜呜……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6329',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「肚子里面……呜呜……好，好难受……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6330-6331',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*CFLAG:657[ \t]+=[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6331',
        any: [/^(?:\uFEFF)?[ \t]*CFLAG:657[ \t]+=[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6333',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+P[ \t]+==[ \t]+20[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6334-6335',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6335-6336',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-----------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6337',
        any: [/^(?:\uFEFF)?[ \t]*@EXUCUTION_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6341',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:16[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6344',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……身体不管变成什么样……%SELF_CALL\(TARGET\)%都……都会……努力……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6345',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6348',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:16[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6351',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这是魔王大人的要求……%SELF_CALL\(TARGET\)%……很，很荣幸……的说……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6352',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6355',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:16[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6356',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6358',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:16[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6359',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6359-6360',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6363',
        any: [/^(?:\uFEFF)?[ \t]*@MUSEUM_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6367',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6368',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6368-6370',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6370-6372',
        any: [
          /^(?:\uFEFF)?[ \t]*RETURN[ \t]+0[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;石化[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6373',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:500[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6375',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6376',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6378',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6380',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6381',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6383',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6385',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6386',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6388',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6390',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6391',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6393',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6395',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6396',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6398',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6400',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6401',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6403',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6405',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6406',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6408',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6410',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6411',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6413',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6415',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……身体不管变成什么样……%SELF_CALL\(TARGET\)%都……都会……努力……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6416',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6418',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:500[ \t]+==[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6420',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……身体不管变成什么样……%SELF_CALL\(TARGET\)%都……都会……努力……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6421',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6421-6422',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6425',
        any: [/^(?:\uFEFF)?[ \t]*@BANISHMENT_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6429',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:510[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6431',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6432',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不要……！%SELF_CALL\(TARGET\)%只想……只想呆在魔王大人的身边，明明只想这样子的说……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6433',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「不管被做什么也好，不管魔王大人有怎么样的要求也好……%SELF_CALL\(TARGET\)%都……都……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6434',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「求求你……求求你……不要……赶%SELF_CALL\(TARGET\)%走……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6435',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+稚气的声音大声的哭喊着，比以往任何时候都要强烈。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6436',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+不过在你的眼中，不过只是区区一个人类而已。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6437',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+玩腻了的玩具什么的，就丢掉吧。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6439-6440',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「终于……可以回家了吗……啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6440',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「终于……可以回家了吗……啊啊……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6441',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+望着曾经的家乡，%SAVESTR:TARGET%的眼泪沿着脸颊滑落下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6442-6443',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;男体化[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6444',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:510[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6445',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6447',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:510[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6448',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6450',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:510[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6451',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6451-6452',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6455',
        any: [/^(?:\uFEFF)?[ \t]*@PUBLIC_EXUCUTION_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6459',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:520[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6462',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……身体不管变成什么样……%SELF_CALL\(TARGET\)%都……都会……努力……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6463',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6465',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:520[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6468',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「如，如果这样能取悦魔王大人的话……就算要死也……没，没什么……好，好怕的……呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6469',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+%SAVESTR:TARGET%深深的低下了头，小小的身体颤抖个不停，努力的不让眼泪流下来。[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6471',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:520[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6472',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6472-6473',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6476',
        any: [/^(?:\uFEFF)?[ \t]*@GROTESQUE_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6480',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:530[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6481',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6483',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6484',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6486',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6487',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6489',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6490',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6492',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6493',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6495',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6496',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6498',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:530[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6499',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6499-6500',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6503',
        any: [/^(?:\uFEFF)?[ \t]*@ENTERENEMY_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6507',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:76[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6508',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「啊～～被击败以后会被怎样侵犯呢，有点期待呢～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6510',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TALENT:A:85[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6511',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这也是为了再见到魔王大人……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6512-6513',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然很讨厌……但是……呜呜……不做的话……不行吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6513',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然很讨厌……但是……呜呜……不做的话……不行吗……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6513-6514',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「虽然很讨厌……但是……呜呜……不做的话……不行吗……」[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6517',
        any: [/^(?:\uFEFF)?[ \t]*@GOHOUBI_REQUEST_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6520',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:A:504[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6522',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6523',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+1[ \t]+\|\|[ \t]+CFLAG:A:504[ \t]+==[ \t]+2[ \t]+\|\|[ \t]+CFLAG:A:504[ \t]+==[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6525-6526',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:A:504[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6526',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:A:504[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6527',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+犬[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6528',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6529',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+豚[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6530',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6531',
        any: [/^(?:\uFEFF)?[ \t]*PRINT[ \t]+馬[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6532-6533',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6533',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6534',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6536',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那个……魔王大人的……kiss……可以咩……？」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6537',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6539',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「想和魔王大人……做舒服的事情呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6540',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6542',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6543',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+7[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6546',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「那～%SELF_CALL\(TARGET\)%要好多好多的肉棒和精液牛奶～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6547',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+8[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6549',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6550',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+9[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6552',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6553-6554',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;-----------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6555',
        any: [/^(?:\uFEFF)?[ \t]*@GOHOUBI_AFTER_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6561',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:18[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6562',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6564',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6566',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「唔……比起这个……还是更喜欢和魔王大人做舒服的事情～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6568',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「为了魔王大人……%SELF_CALL\(TARGET\)%什么事情都会努力的……！」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6569',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6571',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+CFLAG:A:504[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6573',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「这种东西……%SELF_CALL\(TARGET\)%只要呆在魔王大人身边就已经很满足了呢……」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6575',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6577',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「要和狗狗H吗～嗯～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6579',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+2[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6581',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6582',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6583-6584',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6584',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6585-6586',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;馬と獣姦[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6587',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+3[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6589',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6590',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6591-6592',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6592',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6593-6594',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;キス[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6595',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+4[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6596',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「嗯……啾哈……魔王大人的kiss……嗯……最喜欢了……❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6598',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+5[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6600',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:2[ \t]+>[ \t]+ABL:A:3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6601',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的……魔王大人的肉棒……在肚子里面……嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6603-6604',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的……魔王大人的肉棒……在屁股里……嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6604',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呼啊啊……主人的……魔王大人的肉棒……在屁股里……嗯呀～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6605-6606',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;ザーメン[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6607',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+6[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6608',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6610',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+7[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6612',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]+「呜呜～肚子里面，已经，已经装不下了啦～～❤」[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6614',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+8[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6615',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6617',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+CFLAG:A:504[ \t]+==[ \t]+9[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6619',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:2[ \t]+>[ \t]+ABL:A:3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6620',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6622-6623',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6623',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6624-6625',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6625-6626',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6626-6627',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6627-6628',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;------------------------------[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6629',
        any: [/^(?:\uFEFF)?[ \t]*@OSIOKI_KOUJO_K19[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6635',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+TFLAG:18[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6636',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6638',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6640',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:21[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6641',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6642-6643',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6643',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6644-6645',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;路上自慰刑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6646',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6648',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:17[ \t]+>=[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6649',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6650-6651',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6651',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6652-6653',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;路上脱糞刑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6654',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6656',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:17[ \t]+>=[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6657',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6658-6659',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6659',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6660-6661',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;鞭打ち刑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6662',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6664',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ABL:A:21[ \t]+>=[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6665',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6666-6667',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6667',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6668-6669',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;人間小便器刑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6670',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6672',
        any: [
          /^(?:\uFEFF)?[ \t]*IF[ \t]+TALENT:A:88[ \t]+==[ \t]+1[ \t]+\|\|[ \t]+TALENT:A:76[ \t]+==[ \t]+1[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6673',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6674-6675',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6675',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6676-6677',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;トイレ掃除刑[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6678',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+6[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6679',
        any: [/^(?:\uFEFF)?[ \t]*PRINTW[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6681',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+7[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6682',
        any: [/^(?:\uFEFF)?[ \t]*PRINTW[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6684',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+8[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6685',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6687',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+TFLAG:18[ \t]+==[ \t]+9[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6688',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: SRC,
        ref: '6688-6689',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORMW[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6693',
        any: [/^(?:\uFEFF)?[ \t]*@GOBI_KOUJO_K19,[ \t]+ARG:0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6696',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+ARG:0[ \t]+==[ \t]+1[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6698',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+，诶嘿嘿～♪[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6699',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ARG:0[ \t]+==[ \t]+2[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6701',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+，呜～～%SELF_CALL\(TARGET\)%要咬人了的说～～[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6702',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ARG:0[ \t]+==[ \t]+3[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6704',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+哈呜呜……[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6705',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ARG:0[ \t]+==[ \t]+4[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6707',
        any: [/^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]+呜……\\\/\\\/\\\/\\\/[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6708',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+ARG:0[ \t]+==[ \t]+5[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6710-6711',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6711-6712',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*;デフォルト[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6714',
        any: [/^(?:\uFEFF)?[ \t]*IF[ \t]+RAND:3[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6715-6716',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6716',
        any: [/^(?:\uFEFF)?[ \t]*ELSEIF[ \t]+RAND:2[ \t]+==[ \t]+0[ \t]*$/m],
      },
      {
        src: SRC,
        ref: '6717-6718',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ELSE[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6718-6719',
        any: [
          /^(?:\uFEFF)?[ \t]*ELSE[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6719-6720',
        any: [
          /^(?:\uFEFF)?[ \t]*PRINTFORM[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
      {
        src: SRC,
        ref: '6720-6721',
        any: [
          /^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$\r?\n^(?:\uFEFF)?[ \t]*ENDIF[ \t]*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
