// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #243 按 js 文件拆出：kojo-k12-intellectual.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k12-intellectual.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '67-71',
        any: [/^\s*@EVENTTRAIN\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '69',
        any: [/^\s*FLAG:112 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '71',
        any: [/^\s*FLAG:7 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '73-75',
        any: [/^\s*@EVENTEND\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '75',
        any: [/^\s*FLAG:112 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '81-235',
        any: [/^\s*@EVENTTRAIN\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '83-85',
        any: [/^\s*SIF TALENT:172 != 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '85-87',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '90',
        any: [/^\s*IF CFLAG:201 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '91-92',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '92',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '94',
        any: [
          /^\s*PRINTFORMW 「就表扬你一下吧。这是超出了%SELF_CALL\(TARGET\)%预想的力量」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '95',
        any: [
          /^\s*PRINTFORMW 「但是没用的哦。%SELF_CALL\(TARGET\)%作为自豪的人狼、还拥有最高的智能……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '96',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然带着清爽的表情逞强着、但轻飘飘的耳朵害怕的低了下来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '97-98',
        any: [
          /^\s*PRINTFORMW 「看起来你比%SELF_CALL\(TARGET\)%更厉害呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '98',
        any: [
          /^\s*PRINTFORMW 「看起来你比%SELF_CALL\(TARGET\)%更厉害呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '99',
        any: [
          /^\s*PRINTFORMW 「但%SELF_CALL\(TARGET\)%可是接受过特殊訓練的。不管对我做什么都是没用的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '100',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%表情冷淡强装镇定、声音微微发颤\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '101-102',
        any: [/^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '102',
        any: [/^\s*CFLAG:201 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '103-104',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '107-108',
        any: [/^\s*ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '108',
        any: [/^\s*IF TALENT:85 \|\| TALENT:76\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '109-110',
        any: [
          /^\s*PRINTFORMW 「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '110',
        any: [
          /^\s*PRINTFORMW 「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '111',
        any: [
          /^\s*PRINTFORMW 「但是从生物学上看这并没有什么問題、只是感情上的問題哦、所以原谅我吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '112',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%低着头小声辩解道\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '114',
        any: [/^\s*CFLAG:650 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '115-117',
        any: [
          /^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '116-117',
        any: [
          /^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '117',
        any: [
          /^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '118',
        any: [
          /^\s*PRINTFORMW 「是要继续調教我吗？　还是当成肉便器处理？　随便你吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '119',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%冷冷的看着你\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '121',
        any: [/^\s*CFLAG:650 = 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '122-124',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '123-124',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '128-130',
        any: [/^\s*ELSEIF CFLAG:201 < 2 && MARK:2 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '129-130',
        any: [/^\s*PRINTFORMW 「看起来你的能力好像比资料上要高呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '130',
        any: [/^\s*PRINTFORMW 「看起来你的能力好像比资料上要高呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '131',
        any: [/^\s*CFLAG:201 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '132-134',
        any: [/^\s*;屈服刻印Lv2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '135-137',
        any: [/^\s*ELSEIF CFLAG:201 < 3 && MARK:2 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '136-137',
        any: [
          /^\s*PRINTFORMW 「你到底是……何方神圣、能把%SELF_CALL\(TARGET\)%逼到这种地步……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '137',
        any: [
          /^\s*PRINTFORMW 「你到底是……何方神圣、能把%SELF_CALL\(TARGET\)%逼到这种地步……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '138',
        any: [/^\s*CFLAG:201 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '139-141',
        any: [/^\s*;屈服刻印Lv3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '142-144',
        any: [
          /^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '143-144',
        any: [
          /^\s*PRINTFORMW 「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '144',
        any: [
          /^\s*PRINTFORMW 「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '145',
        any: [/^\s*CFLAG:201 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '146-148',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '149-151',
        any: [
          /^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '150-151',
        any: [
          /^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……让%SELF_CALL\(TARGET\)%更多地对此进行研究吧、拜托了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '151',
        any: [
          /^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……让%SELF_CALL\(TARGET\)%更多地对此进行研究吧、拜托了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '152',
        any: [
          /^\s*PRINTFORMW 「想尝试一下、%SELF_CALL\(TARGET\)%的身体能淫靡化到什么地步……已经、睡不着了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '153',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边流着口水一边用腰蹭着你的腿\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '154',
        any: [/^\s*PRINTFORMW 她的脑海中已经填满了对性知识的渴求了……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '155',
        any: [/^\s*CFLAG:201 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '156-158',
        any: [/^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '159-161',
        any: [/^\s*ELSEIF CFLAG:201 < 6 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '160-161',
        any: [
          /^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '161',
        any: [
          /^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '162',
        any: [
          /^\s*PRINTFORMW 「魔界的動植物和文化、魔法……全都是我还不懂的东西呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '163',
        any: [
          /^\s*PRINTFORMW 进入房间的%SAVESTR:TARGET%正专心致志地在笔记本上写着什么\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '164',
        any: [/^\s*PRINTFORMW 完全被魔之知識迷住了的样子……\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '165',
        any: [/^\s*CFLAG:201 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '166-168',
        any: [/^\s*;助手の有無をチェック（いない場合は二回目以降へ飛ぶ）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '169-170',
        any: [/^\s*ELSEIF ASSI < 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '170',
        any: [/^\s*CALL K12_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '229-230',
        any: [/^\s*CALL K12_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '230',
        any: [/^\s*CALL K12_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '231-234',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '237-310',
        any: [/^\s*@K12_KOJO2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '239',
        any: [/^\s*IF MARK:3 == 3 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '240-241',
        any: [/^\s*PRINTFORMW 「不要再进入我的视线里……我很不高兴」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '241',
        any: [/^\s*PRINTFORMW 「不要再进入我的视线里……我很不高兴」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '242-244',
        any: [/^\s*;屈服刻印Lv0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '245-247',
        any: [/^\s*ELSEIF MARK:2 == 0 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '246-247',
        any: [
          /^\s*PRINTFORMW 「根据%SELF_CALL\(TARGET\)%的計算、即使是你的力量也无法让%SELF_CALL\(TARGET\)%屈服哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '247',
        any: [
          /^\s*PRINTFORMW 「根据%SELF_CALL\(TARGET\)%的計算、即使是你的力量也无法让%SELF_CALL\(TARGET\)%屈服哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '248-250',
        any: [/^\s*;屈服刻印Lv1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '251-253',
        any: [/^\s*ELSEIF MARK:2 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '252-253',
        any: [/^\s*PRINTFORMW 「不管你使出什么手段、都在我计算之中！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '253',
        any: [/^\s*PRINTFORMW 「不管你使出什么手段、都在我计算之中！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '254-256',
        any: [/^\s*;屈服刻印Lv2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '257-259',
        any: [/^\s*ELSEIF MARK:2 == 2 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '258-259',
        any: [
          /^\s*PRINTFORMW 「噫、好卑鄙……居然这样对待%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '259',
        any: [
          /^\s*PRINTFORMW 「噫、好卑鄙……居然这样对待%SELF_CALL\(TARGET\)%……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '260-262',
        any: [/^\s*;屈服刻印Lv3＋爱[/]淫乱無し\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '263-265',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '264-265',
        any: [
          /^\s*PRINTFORMW 「我知道了、就按你说的做……是%SELF_CALL\(TARGET\)%输了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '265',
        any: [
          /^\s*PRINTFORMW 「我知道了、就按你说的做……是%SELF_CALL\(TARGET\)%输了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '266-268',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '269-271',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '270-271',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '272',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '273',
        any: [/^\s*PRINTFORMW 「今天要研究什么Play呢、好期待啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '274-275',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '275',
        any: [
          /^\s*PRINTFORMW 「再多多开发%SELF_CALL\(TARGET\)%的身体嘛、还完全不够呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '276-277',
        any: [
          /^\s*PRINTFORMW 「今天也被開発了一番呢、好开心啊、真想再提升一下敏感度呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '277',
        any: [
          /^\s*PRINTFORMW 「今天也被開発了一番呢、好开心啊、真想再提升一下敏感度呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '278-279',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '279',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '281',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像狗一样伸出舌头，吐出慌乱的吐息迎接了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '282-283',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '283',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '284-287',
        any: [/^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '285-287',
        any: [/^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '288-290',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '289-290',
        any: [
          /^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '291',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '292',
        any: [
          /^\s*PRINTFORMW 「呵呵、你来了啊……正好是我研究的有些疲劳的时候呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '293-294',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '294',
        any: [/^\s*PRINTFORMW 「今天的研究进展很大。好想被表扬呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '295-296',
        any: [
          /^\s*PRINTFORMW 「啊、已经到休憩的時間了？　饶了我吧……和你做对手的话不是反而会更累吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '296',
        any: [
          /^\s*PRINTFORMW 「啊、已经到休憩的時間了？　饶了我吧……和你做对手的话不是反而会更累吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '297-298',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '298',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '300',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%轻飘飘的尾巴像摇出了残影一样摆动着迎了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '301-302',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '302',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '303-308',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '304-308',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '305-308',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '306-308',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '312-399',
        any: [/^\s*@EVENTEND\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '314-315',
        any: [/^\s*SIF TALENT:172 != 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '316-318',
        any: [/^\s*;キャラ死亡時は口上をスキップ\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '320-322',
        any: [/^\s*;--------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '326',
        any: [/^\s*IF MARK:3 == 3 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '327-328',
        any: [/^\s*PRINTFORMW 「真是无聊的時光呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '328',
        any: [/^\s*PRINTFORMW 「真是无聊的時光呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '329-331',
        any: [/^\s*;屈服刻印Lv1以下\+爱无\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '332-334',
        any: [/^\s*ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '333-334',
        any: [
          /^\s*PRINTFORMW 「已经结束了吗、这种程度、在我的预料之内呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '334',
        any: [
          /^\s*PRINTFORMW 「已经结束了吗、这种程度、在我的预料之内呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '335-337',
        any: [/^\s*;屈服刻印Lv2\+爱无\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '338-340',
        any: [/^\s*ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '339-340',
        any: [/^\s*PRINTFORMW 「原来如此、和资料上一样呢……果然、好累」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '340',
        any: [/^\s*PRINTFORMW 「原来如此、和资料上一样呢……果然、好累」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '341-343',
        any: [/^\s*;屈服刻印Lv3\+爱无\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '344-346',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '345-346',
        any: [/^\s*PRINTFORMW 「结束了吗……体力值还挺高的嘛」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '346',
        any: [/^\s*PRINTFORMW 「结束了吗……体力值还挺高的嘛」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '347-349',
        any: [/^\s*;淫乱\(体力500以上\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '350-352',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '351-352',
        any: [
          /^\s*PRINTFORMW 「怎么这样就停了、再多多开发%SELF_CALL\(TARGET\)%淫乱的身体吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '352',
        any: [
          /^\s*PRINTFORMW 「怎么这样就停了、再多多开发%SELF_CALL\(TARGET\)%淫乱的身体吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '353',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '355',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%软绵绵的耳朵立了起来，好像很不满。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '356-357',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%鼓着脸颊，好像很不满。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '357',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%鼓着脸颊，好像很不满。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '358-360',
        any: [/^\s*;淫乱\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '359-360',
        any: [/^\s*;淫乱\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '361-363',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '362-363',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%身体的耐久极限……差不多就是这样吗、哈～哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '363',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%身体的耐久极限……差不多就是这样吗、哈～哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '364',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '366',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%像狗一样伸出舌头，混乱的喘息着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '367-368',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样倒在床上，不停地喘着粗气。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '368',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样倒在床上，不停地喘着粗气。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '369-372',
        any: [/^\s*;爱慕\(体力500以上\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '370-372',
        any: [/^\s*;爱慕\(体力500以上\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '373-375',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '374-375',
        any: [
          /^\s*PRINTFORMW 「哎呀、研究不能继续了呢。很开心哦、与你的幽会」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '375',
        any: [
          /^\s*PRINTFORMW 「哎呀、研究不能继续了呢。很开心哦、与你的幽会」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '376',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '378',
        any: [
          /^\s*PRINTFORMW 背向这边的%SAVESTR:TARGET%软绵绵的尾巴呼噜呼噜的左右摇动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '379-380',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '380',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '381-383',
        any: [/^\s*;爱慕\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '382-383',
        any: [/^\s*;爱慕\(体力500未満\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '384-386',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '385-386',
        any: [
          /^\s*PRINTFORMW 「果然、这种程度的体力消耗、是对研究的一大障碍呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '386',
        any: [
          /^\s*PRINTFORMW 「果然、这种程度的体力消耗、是对研究的一大障碍呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '387',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '389',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%打了一个哈欠、用像狗一样团起来的姿势打起了瞌睡。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '390-391',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '391',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '392-397',
        any: [/^\s*;--------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '393-397',
        any: [/^\s*;--------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '394-397',
        any: [/^\s*;--------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '395-397',
        any: [/^\s*;--------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '401-3537',
        any: [/^\s*@KOJO_MESSAGE_COM_12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '402-405',
        any: [
          /^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '402-426',
        any: [
          /^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '404-406',
        any: [/^\s*;	RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '407-408',
        any: [/^\s*;失神時には口上をスキップする\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '407-425',
        any: [/^\s*;失神時には口上をスキップする\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '410-411',
        any: [/^\s*;兽奸PLAY中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '412-415',
        any: [/^\s*IF TEQUIP:89\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '414-416',
        any: [/^\s*;死斗场中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '415-416',
        any: [/^\s*;死斗场中は専用口上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '417-420',
        any: [/^\s*IF TEQUIP:55\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '419-422',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '420-422',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '428',
        any: [/^\s*IF SELECTCOM == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '430',
        any: [/^\s*IF CFLAG:301 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '432',
        any: [/^\s*IF MARK:2 >= 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '433',
        any: [
          /^\s*PRINTFORMW 「你知道这个理论吗？　一开始要先抚摸女性的肌肤呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '435-436',
        any: [/^\s*PRINTFORMW 「哼、真无聊呢。跟教科书一样的步骤呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '436',
        any: [/^\s*PRINTFORMW 「哼、真无聊呢。跟教科书一样的步骤呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '437-438',
        any: [/^\s*CFLAG:301 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '438',
        any: [/^\s*CFLAG:301 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '439-440',
        any: [/^\s*;二回目以降・あなたの子を妊娠\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '441',
        any: [/^\s*ELSEIF TALENT:153 && CFLAG:111 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '443',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '444',
        any: [/^\s*PRINTFORMW 「孩子还在里面看着呢。还请温柔点哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '445',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '447',
        any: [
          /^\s*PRINTFORMW 「如果是像%SELF_CALL\(TARGET\)%一样活泼可爱的孩子就好啦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '448-449',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '449',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '451',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '452',
        any: [/^\s*PRINTFORMW 「又长大了呢、好想快点生下来啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '453',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '455',
        any: [
          /^\s*PRINTFORMW 「嗯……就这么抚摸%SELF_CALL\(TARGET\)%的头。叨着『谢谢你怀上孩子哦』」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '456-457',
        any: [
          /^\s*PRINTFORMW 「嗯……%SELF_CALL\(TARGET\)%好想多做做脚部按摩啊。挺着大肚子可累了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '457',
        any: [
          /^\s*PRINTFORMW 「嗯……%SELF_CALL\(TARGET\)%好想多做做脚部按摩啊。挺着大肚子可累了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '458-459',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '459',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '461',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '462',
        any: [
          /^\s*PRINTFORMW 「老用这种方式来抚摸、要忍受这种待遇的……可是你的孩子啊。就不能更小心翼翼一些吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '463',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '465',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '466',
        any: [/^\s*PRINTFORMW 「嗯、咕……别、别摸了啦……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '467',
        any: [/^\s*CFLAG:301 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '469',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '470',
        any: [
          /^\s*PRINTFORMW 「就算怀上了你的孩子……也别想让%SELF_CALL\(TARGET\)%动心」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '471',
        any: [/^\s*CFLAG:301 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '472-474',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '473-474',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '475-476',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '477',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '478',
        any: [
          /^\s*PRINTFORMW 「不要再挑逗我了……明明知道单是这样子已经无法满足我了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '479',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '481',
        any: [
          /^\s*PRINTFORMW 「知道%SELF_CALL\(TARGET\)%感觉舒服的地方吗？　想让你抚摸喉咙呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '482-483',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '483',
        any: [/^\s*CFLAG:301 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '485',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '486',
        any: [/^\s*PRINTFORMW 「最近很疲劳呢。谢谢你为我按摩」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '487',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '489',
        any: [
          /^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的脚吧。散步有些累了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '490-491',
        any: [
          /^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的腰吧。在桌子边坐得有些累了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '491',
        any: [
          /^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的腰吧。在桌子边坐得有些累了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '492-493',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '493',
        any: [/^\s*CFLAG:301 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '495',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '496',
        any: [
          /^\s*PRINTFORMW 「只是被你的手摸着、就想向你屈服了呢……看来%SELF_CALL\(TARGET\)%的計算错误了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '497',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '499',
        any: [
          /^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '500',
        any: [/^\s*PRINTFORMW 「嗯、唔～……继、继续吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '501',
        any: [/^\s*CFLAG:301 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '503',
        any: [
          /^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '504',
        any: [
          /^\s*PRINTFORMW 「这种程度全在预料之中呢。%SELF_CALL\(TARGET\)%的心是不会动摇的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '505',
        any: [/^\s*CFLAG:301 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '506-511',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '507-511',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '508-511',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '509-511',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '514',
        any: [/^\s*IF SELECTCOM == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '516',
        any: [/^\s*IF CFLAG:302 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '518',
        any: [/^\s*IF TALENT:TARGET:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '519',
        any: [/^\s*PRINTFORMW 「哼、性器没被男人碰过真是对不住呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '521-522',
        any: [
          /^\s*PRINTFORMW 「喂、不要舔性器！　再怎么说那也是排泄器官！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '522',
        any: [
          /^\s*PRINTFORMW 「喂、不要舔性器！　再怎么说那也是排泄器官！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '523-524',
        any: [/^\s*CFLAG:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '524',
        any: [/^\s*CFLAG:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '525-526',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '527-528',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '529',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '530',
        any: [/^\s*PRINTFORMW 「再用力点吸吸淫核……呵呵、勃起来了吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '531',
        any: [/^\s*CFLAG:302 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '533',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '534',
        any: [/^\s*PRINTFORMW 「我可以一边看书吗？　这样会轻松点……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '535',
        any: [/^\s*CFLAG:302 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '537',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '538',
        any: [
          /^\s*PRINTFORMW 「喜欢的话就随便舔吧。%SELF_CALL\(TARGET\)%已经不会再反抗了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '539',
        any: [/^\s*CFLAG:302 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '541',
        any: [/^\s*ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '542',
        any: [/^\s*PRINTFORMW 「住、住手！　那里的粘膜很敏感啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '543',
        any: [/^\s*CFLAG:302 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '544-549',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '545-549',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '546-549',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '547-549',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '552',
        any: [/^\s*IF SELECTCOM == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '554',
        any: [/^\s*IF CFLAG:303 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '555',
        any: [/^\s*PRINTFORMW 「这是在做肛交的準備吗、変態」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '556',
        any: [/^\s*CFLAG:TARGET:303 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '557-558',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '559-560',
        any: [/^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '560',
        any: [/^\s*P = PALAM:3 \+ UP:3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '562',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '563',
        any: [
          /^\s*PRINTFORMW 「啊啊～、已经做好肛交的準備了哦！　排泄……不、已经变成性器啦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '564',
        any: [/^\s*CFLAG:303 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '566',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '567',
        any: [/^\s*PRINTFORMW 「抱歉、还很紧……最好、再润滑一下呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '568',
        any: [/^\s*CFLAG:303 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '570',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '571',
        any: [
          /^\s*PRINTFORMW 「怎么样、%SELF_CALL\(TARGET\)%的第二性器……这样一来就能肛交了呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '572',
        any: [/^\s*CFLAG:303 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '574',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '575',
        any: [
          /^\s*PRINTFORMW 「你、能让我再湿一点吗……里面还没放松下来呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '576',
        any: [/^\s*CFLAG:303 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '578',
        any: [
          /^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '579',
        any: [
          /^\s*PRINTFORMW 「咕呜～、不行啊……这么湿漉漉下去的话……性器、会变成性器的啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '580',
        any: [/^\s*CFLAG:303 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '582',
        any: [/^\s*ELSEIF CFLAG:223 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '583',
        any: [
          /^\s*PRINTFORMW 「不管再怎么玩弄排泄器官、都不会有什么快感的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '584',
        any: [/^\s*CFLAG:303 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '585-590',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '586-590',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '587-590',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '588-590',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '593',
        any: [/^\s*IF SELECTCOM == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '595',
        any: [/^\s*IF CFLAG:304 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '596',
        any: [
          /^\s*PRINTFORMW 「自慰什么的谁都有过吧。诶、让%SELF_CALL\(TARGET\)%来……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '597',
        any: [/^\s*CFLAG:TARGET:304 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '598-599',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '600-601',
        any: [/^\s*;淫乱＋处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '602',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '603',
        any: [
          /^\s*PRINTFORMW 「没有被男人碰过的这个小穴、会疼也是没办法的……什么时候都可以给你哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '604',
        any: [/^\s*CFLAG:304 = 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '606',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '608',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '609',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的痴態、没有被記録下来吗……？　想作为下次自慰的参考呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '610',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '611',
        any: [
          /^\s*PRINTFORMW 「猴子……要变成猴子了！　变成自慰猴子了啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '612',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '613',
        any: [
          /^\s*PRINTFORMW 「看吧……像猴子一样玩弄%阴核\(TARGET\)%的%SELF_CALL\(TARGET\)%的姿态……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '614-615',
        any: [
          /^\s*PRINTFORMW 「啊～、啊～、去了、去了、去了……像猴子一样揉着阴部去了啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '615',
        any: [
          /^\s*PRINTFORMW 「啊～、啊～、去了、去了、去了……像猴子一样揉着阴部去了啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '616-617',
        any: [/^\s*CFLAG:304 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '617',
        any: [/^\s*CFLAG:304 = 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '619',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '621',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '622',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%对自慰已经很擅长了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '623-624',
        any: [/^\s*PRINTFORMW 「这个身体已经快要研究透了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '624',
        any: [/^\s*PRINTFORMW 「这个身体已经快要研究透了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '625-626',
        any: [/^\s*CFLAG:304 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '626',
        any: [/^\s*CFLAG:304 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '628',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '629',
        any: [
          /^\s*PRINTFORMW 「请看、想吞下你阴茎的性器躁动得没办法了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '630',
        any: [/^\s*CFLAG:304 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '632',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '634',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '635',
        any: [/^\s*PRINTFORMW 「来吧……拜托了、都一边自慰一边求你了啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '636',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '637',
        any: [
          /^\s*PRINTFORMW 「因为实在太想你了、%阴核\(TARGET\)%好像都快磨破了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '638-639',
        any: [
          /^\s*PRINTFORMW 「已经习惯了呢、%阴核\(TARGET\)%已经元气十足地勃起来了哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '639',
        any: [
          /^\s*PRINTFORMW 「已经习惯了呢、%阴核\(TARGET\)%已经元气十足地勃起来了哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '640-641',
        any: [/^\s*CFLAG:304 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '641',
        any: [/^\s*CFLAG:304 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '643',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '645',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '646',
        any: [
          /^\s*PRINTFORMW 「自慰什么的很正常啊。研究的间隙也会想去做呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '647-648',
        any: [/^\s*PRINTFORMW 「嘿欸、你还有这样的癖好呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '648',
        any: [/^\s*PRINTFORMW 「嘿欸、你还有这样的癖好呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '649-650',
        any: [/^\s*CFLAG:304 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '650',
        any: [/^\s*CFLAG:304 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '652',
        any: [
          /^\s*ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '654',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '655',
        any: [/^\s*PRINTFORMW 「啊～、啊～……好爽～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '656-657',
        any: [
          /^\s*PRINTFORMW 「自慰过度%阴核\(TARGET\)%可能会肥大化的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '657',
        any: [
          /^\s*PRINTFORMW 「自慰过度%阴核\(TARGET\)%可能会肥大化的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '658-659',
        any: [/^\s*CFLAG:304 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '659',
        any: [/^\s*CFLAG:304 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '661',
        any: [/^\s*ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '663',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '664',
        any: [/^\s*PRINTFORMW 「无意义的行為呢……白白浪费脳細胞」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '665-666',
        any: [/^\s*PRINTFORMW 「没有收益的行為呢、没有意义」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '666',
        any: [/^\s*PRINTFORMW 「没有收益的行為呢、没有意义」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '667-668',
        any: [/^\s*CFLAG:304 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '668',
        any: [/^\s*CFLAG:304 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '669-674',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '670-674',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '671-674',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '672-674',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '677',
        any: [/^\s*IF SELECTCOM == 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '679',
        any: [/^\s*IF CFLAG:306 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '681',
        any: [/^\s*IF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '682',
        any: [/^\s*PRINTFORMW 「这么喜欢胸部……你是小孩子吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '684-685',
        any: [/^\s*PRINTFORMW 「一般意义上说乳头并不是性感帯哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '685',
        any: [/^\s*PRINTFORMW 「一般意义上说乳头并不是性感帯哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '686-687',
        any: [/^\s*CFLAG:TARGET:306 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '687',
        any: [/^\s*CFLAG:TARGET:306 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '688-689',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '690-691',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '692',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '693',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '694',
        any: [/^\s*PRINTFORMW 「连胸部也成性器了你打算怎么样嘛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '695-696',
        any: [/^\s*PRINTFORMW 「呵呵、发生幼儿退化現象了吗……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '696',
        any: [/^\s*PRINTFORMW 「呵呵、发生幼儿退化現象了吗……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '697-698',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '698',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '700',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '701',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '702',
        any: [/^\s*PRINTFORMW 「胸部已经完全被开发好了呢。都是你的错呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '703-704',
        any: [/^\s*PRINTFORMW 「这就是、母性萌发的現象吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '704',
        any: [/^\s*PRINTFORMW 「这就是、母性萌发的現象吗……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '705-706',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '706',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '708',
        any: [
          /^\s*ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '709',
        any: [/^\s*PRINTFORMW 「胸部……乳头好有感觉啊～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '710',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '712',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '713',
        any: [/^\s*PRINTFORMW 「果然呢、胸部一点感觉都没有」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '714',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '715-720',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '716-720',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '717-720',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '718-720',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '723',
        any: [/^\s*IF SELECTCOM == 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '725',
        any: [/^\s*IF CFLAG:307 == 0 && TFLAG:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '727',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '728',
        any: [
          /^\s*PRINTFORMW 「初吻什么的、感伤的感情是不必要的……不过还不错」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '730',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '731',
        any: [/^\s*PRINTFORMW 「今天是和你的纪念日呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '733-734',
        any: [/^\s*PRINTFORMW 「初吻什么的、带上感情是无意义的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '734',
        any: [/^\s*PRINTFORMW 「初吻什么的、带上感情是无意义的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '735-736',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '736',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '737-738',
        any: [/^\s*;（調教では）初めて\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '739',
        any: [/^\s*ELSEIF CFLAG:307 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '741',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '742',
        any: [
          /^\s*PRINTFORMW 「通过唾液交換来做性爱的相性確認……你合格了哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '744',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '745',
        any: [/^\s*PRINTFORMW 「终于可以和你做唾液交換了呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '747-748',
        any: [/^\s*PRINTFORMW 「既没有气氛也没有技巧……0分呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '748',
        any: [/^\s*PRINTFORMW 「既没有气氛也没有技巧……0分呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '749-750',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '750',
        any: [/^\s*CFLAG:307 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '751-752',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '753-754',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '755',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '756',
        any: [/^\s*PRINTFORMW 「更多的交換唾液吧……你的体液、想要更多」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '757',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '759',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然闭着眼、但耳朵却立了起来bikobiko的动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '760-761',
        any: [/^\s*CFLAG:307 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '761',
        any: [/^\s*CFLAG:307 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '763',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '764',
        any: [
          /^\s*PRINTFORMW 「把你的全部……都给%SELF_CALL\(TARGET\)%吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '765',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '767',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%虽然闭着眼、但耳朵却立了起来bikobiko的动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '768-769',
        any: [/^\s*CFLAG:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '769',
        any: [/^\s*CFLAG:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '771',
        any: [
          /^\s*ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '772',
        any: [/^\s*PRINTFORMW 「好吧、体液交換这种程度的事情没有问题」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '773',
        any: [/^\s*CFLAG:307 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '775',
        any: [/^\s*ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '776',
        any: [/^\s*PRINTFORMW 「呜～……你、在磨牙吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '777',
        any: [/^\s*CFLAG:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '778-783',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '779-783',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '780-783',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '781-783',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '786',
        any: [/^\s*IF SELECTCOM == 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '788',
        any: [/^\s*IF CFLAG:308 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '790',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '791',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的大受欢迎的地方、想被更多的看着呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '793',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '794',
        any: [
          /^\s*PRINTFORMW 「不对%SELF_CALL\(TARGET\)%的重要的地方、来个素描吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '796-797',
        any: [/^\s*PRINTFORMW 「唔～、做出如此羞人的姿势什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '797',
        any: [/^\s*PRINTFORMW 「唔～、做出如此羞人的姿势什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '798-799',
        any: [/^\s*CFLAG:TARGET:308 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '799',
        any: [/^\s*CFLAG:TARGET:308 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '800-801',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '802-803',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '804',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '805',
        any: [
          /^\s*PRINTFORMW 「怎么样、%SELF_CALL\(TARGET\)%性器的开发情况……♪　想让陰核变的多大呢？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '806',
        any: [/^\s*CFLAG:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '808',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '809',
        any: [
          /^\s*PRINTFORMW 「今天也做了記録呢。来展示一下%SELF_CALL\(TARGET\)%的性器发生了什么样的变化吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '810',
        any: [/^\s*CFLAG:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '812',
        any: [
          /^\s*ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '813',
        any: [/^\s*PRINTFORMW 「唔……这可真是、羞恥心都被引出来了……呐」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '814',
        any: [/^\s*CFLAG:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '816',
        any: [/^\s*ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '817',
        any: [
          /^\s*PRINTFORMW 「被迫作出这种屈辱的姿势……但%SELF_CALL\(TARGET\)%不得不屈服呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '818',
        any: [/^\s*CFLAG:306 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '819-824',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '820-824',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '821-824',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '822-824',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '827',
        any: [/^\s*IF SELECTCOM == 8\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '829',
        any: [/^\s*IF CFLAG:TARGET:309 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '831',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '832',
        any: [/^\s*PRINTFORMW 「你的指功究竟如何呢？　很期待呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '834',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '835',
        any: [/^\s*PRINTFORMW 「想通过你的手、来做个彻底的放松呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '837-838',
        any: [/^\s*PRINTFORMW 「手指伸进去的地方……只会感到恶心呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '838',
        any: [/^\s*PRINTFORMW 「手指伸进去的地方……只会感到恶心呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '839-840',
        any: [/^\s*CFLAG:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '840',
        any: [/^\s*CFLAG:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '841-842',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '843-844',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '845',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '846',
        any: [
          /^\s*PRINTFORMW 「里面想更多地被来回搅动呢、呼～……咕～、真不错呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '847',
        any: [/^\s*CFLAG:309 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '849',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '850',
        any: [
          /^\s*PRINTFORMW 「你的手……体贴入微的、一直在%SELF_CALL\(TARGET\)%很舒服的地方进攻着呢……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '851',
        any: [/^\s*CFLAG:309 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '853',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '854',
        any: [/^\s*PRINTFORMW 「咕～……阴道、起反应了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '855',
        any: [/^\s*CFLAG:309 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '857',
        any: [/^\s*ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '858',
        any: [/^\s*PRINTFORMW 「额……好恶心……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '859',
        any: [/^\s*CFLAG:309 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '860-865',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '861-865',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '862-865',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '863-865',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '868',
        any: [/^\s*IF SELECTCOM == 9\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '870',
        any: [/^\s*IF CFLAG:310 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '872',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '873',
        any: [/^\s*PRINTFORMW 「想舔排泄器官吗……真是変態♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '875',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '876',
        any: [/^\s*PRINTFORMW 「那个地方细菌很多呢……真的可以吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '878-879',
        any: [/^\s*PRINTFORMW 「呀啊啊、住手！！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '879',
        any: [/^\s*PRINTFORMW 「呀啊啊、住手！！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '880-881',
        any: [/^\s*CFLAG:TARGET:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '881',
        any: [/^\s*CFLAG:TARGET:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '882-883',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '884-885',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '886',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '887',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的肛门、被竖着分开了呢……？　想被更多的好好舔舐呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '888',
        any: [/^\s*CFLAG:310 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '890',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '891',
        any: [/^\s*PRINTFORMW 「被舔着排泄器官……也还不坏嘛♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '892',
        any: [/^\s*CFLAG:310 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '894',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '895',
        any: [
          /^\s*PRINTFORMW 「咕～、随便你吧……要舔排泄器官也行……嗯啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '896',
        any: [/^\s*CFLAG:310 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '898',
        any: [/^\s*ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '899',
        any: [/^\s*PRINTFORMW 「尽做些傻事呢……嗯～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '900',
        any: [/^\s*CFLAG:310 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '901-906',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '902-906',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '903-906',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '904-906',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '909',
        any: [/^\s*IF SELECTCOM == 10\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '911',
        any: [/^\s*IF CFLAG:TARGET:311 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '913',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '914',
        any: [/^\s*PRINTFORMW 「有趣的道具呢、快点使用吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '916',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '917',
        any: [/^\s*PRINTFORMW 「这道具还挺有意思的呢……真的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '919-920',
        any: [/^\s*PRINTFORMW 「这、这嗡嗡震动的玩意儿是什么啊！？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '920',
        any: [/^\s*PRINTFORMW 「这、这嗡嗡震动的玩意儿是什么啊！？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '921-922',
        any: [/^\s*CFLAG:TARGET:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '922',
        any: [/^\s*CFLAG:TARGET:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '923-924',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '925-926',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '927',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '928',
        any: [/^\s*PRINTFORMW 「啊啊啊……淫核好麻……不错嘛、这个～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '929',
        any: [/^\s*CFLAG:311 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '931',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '932',
        any: [/^\s*PRINTFORMW 「呼～……咕～、身体……放松下来了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '933',
        any: [/^\s*CFLAG:311 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '935',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '936',
        any: [
          /^\s*PRINTFORMW 「道具的性能已经清楚了……但是、可以不把这个按在陰核上吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '937',
        any: [/^\s*CFLAG:311 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '939',
        any: [/^\s*ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '940',
        any: [
          /^\s*PRINTFORMW 「跟往常一样……嗡嗡的震动着呢。真想看看开发者是长什么样的呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '941',
        any: [/^\s*CFLAG:311 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '942-947',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '943-947',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '944-947',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '945-947',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '951',
        any: [/^\s*IF SELECTCOM == 11 && TEQUIP:11\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '953',
        any: [/^\s*IF CFLAG:TARGET:312 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '955',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '957',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '958',
        any: [
          /^\s*PRINTFORMW 「原来如此、将寄生虫家畜化吗。有意思……对于献出处女来说是个不错的研究対象呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '960',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '961',
        any: [
          /^\s*PRINTFORMW 「比起这种寄生虫変異体来说、还是更想被你夺走处女呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '963-964',
        any: [
          /^\s*PRINTFORMW 「呜～、寄生虫的変異体吗……哼、才不可惜处女什么的呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '964',
        any: [
          /^\s*PRINTFORMW 「呜～、寄生虫的変異体吗……哼、才不可惜处女什么的呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '965',
        any: [
          /^\s*PRINTFORMW 虽然嘴上这么说着、%SAVESTR:TARGET%的腰还是颤抖不已\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '966-967',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '968-969',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '970',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '971',
        any: [
          /^\s*PRINTFORMW 「原来如此、将寄生虫家畜化吗。有意思……真想快点放进阴道品尝一下滋味呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '973',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '974',
        any: [
          /^\s*PRINTFORMW 「寄生虫的変異体吗。交给我吧。用%SELF_CALL\(TARGET\)%的阴道来试试看吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '976-977',
        any: [/^\s*PRINTFORMW 「呜～、寄生虫的変異体吗……无耻！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '977',
        any: [/^\s*PRINTFORMW 「呜～、寄生虫的変異体吗……无耻！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '978-980',
        any: [/^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '979-980',
        any: [/^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '980',
        any: [/^\s*CFLAG:312 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '981-982',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '983-984',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '985',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '986',
        any: [/^\s*IF TALENT:TARGET:190 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '988',
        any: [
          /^\s*PRINTFORMW 「这就是壷虫的寄生状態吗……嗯～、每次産卵、都会摩擦阴道……♪　要对这个着迷了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '989-990',
        any: [
          /^\s*PRINTFORMW 「確認壷虫已進入……嗯～、摩擦着阴道……好舒服♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '990',
        any: [
          /^\s*PRINTFORMW 「確認壷虫已進入……嗯～、摩擦着阴道……好舒服♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '991-992',
        any: [/^\s*CFLAG:312 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '992',
        any: [/^\s*CFLAG:312 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '994',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '995',
        any: [/^\s*IF TALENT:TARGET:190 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '997',
        any: [
          /^\s*PRINTFORMW 「壷虫寄生状態有影响敏感度的効果……嗯～、真有意思」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '998-999',
        any: [/^\s*PRINTFORMW 「壷虫的触手吗……都伸到子宮口了呢……嗯～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '999',
        any: [/^\s*PRINTFORMW 「壷虫的触手吗……都伸到子宮口了呢……嗯～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1000-1001',
        any: [/^\s*CFLAG:312 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1001',
        any: [/^\s*CFLAG:312 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1003',
        any: [
          /^\s*ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1004',
        any: [
          /^\s*PRINTFORMW 「区区寄生生物、%SELF_CALL\(TARGET\)%是不会输的。被这种下等生物……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1005',
        any: [/^\s*CFLAG:312 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1007',
        any: [/^\s*ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1008',
        any: [/^\s*PRINTFORMW 「你不借助这种下等生物之手就不行吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1009',
        any: [/^\s*CFLAG:312 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1010-1013',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1011-1013',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1012-1013',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1014',
        any: [/^\s*ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1016',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1017',
        any: [
          /^\s*PRINTFORMW 「実験已经结束了吗？　再多蹂躙一会儿也可以哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1018',
        any: [/^\s*CFLAG:372 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1020',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1021',
        any: [/^\s*PRINTFORMW 「……真有意思呢。下次再研究看看吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1022',
        any: [/^\s*CFLAG:372 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1024',
        any: [/^\s*ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1025',
        any: [
          /^\s*PRINTFORMW 「……快点把这恶心的寄生生物丢回培養槽里去啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1026',
        any: [/^\s*CFLAG:372 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1027-1031',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1028-1031',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1029-1031',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1140-1361',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '3538-4348',
        any: [/^\s*@DOG_KOJO_12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '4349-4550',
        any: [/^\s*@KOJO_MESSAGE_PALAMCNG_12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '4551-4613',
        any: [/^\s*@KOJO_MESSAGE_MARKCNG_12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '4614-4869',
        any: [/^\s*@SELF_KOJO_K12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '4743',
        any: [/^\s*CALL SELL_MATURO_K0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '4870-5957',
        any: [/^\s*@DUNGEON_RYOUZYOKU_K12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '5106-5172',
        any: [/^\s*CALL BENKI_PLAYER_NAME\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
