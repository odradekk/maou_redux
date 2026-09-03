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
        ref: '1034',
        any: [/^\s*IF SELECTCOM == 12\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1036',
        any: [/^\s*IF CFLAG:313 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1038',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1039',
        any: [/^\s*PRINTFORMW 「有趣的道具呢！　動力有多少？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1041',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1042',
        any: [/^\s*PRINTFORMW 「这个是……什么用途的道具呢？　淫具……吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1044-1045',
        any: [/^\s*PRINTFORMW 「哼、拿着这种道具到底意欲何为？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1045',
        any: [/^\s*PRINTFORMW 「哼、拿着这种道具到底意欲何为？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1046-1047',
        any: [/^\s*CFLAG:313 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1047',
        any: [/^\s*CFLAG:313 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1048-1049',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1050-1051',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1052',
        any: [
          /^\s*IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1053',
        any: [/^\s*PRINTFORMW 「啊啊啊……好棒、发麻了……下次借给我吧……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1054',
        any: [/^\s*CFLAG:313 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1056',
        any: [
          /^\s*ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1057',
        any: [/^\s*PRINTFORMW 「研究疲劳的时候使用……有不错的保健效果呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1058',
        any: [/^\s*CFLAG:313 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1060',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1061',
        any: [/^\s*PRINTFORMW 「咕～、機械的振動……一直传到腰骨上了……嗯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1062',
        any: [/^\s*CFLAG:313 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1064',
        any: [/^\s*ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1065',
        any: [
          /^\s*PRINTFORMW 「这种程度的、脳内物質分泌……对我没有效果呢……嗯」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1066',
        any: [/^\s*CFLAG:313 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1067-1072',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1068-1072',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1069-1072',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1070-1072',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1076',
        any: [/^\s*IF SELECTCOM == 13 && TEQUIP:13\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1078',
        any: [/^\s*IF CFLAG:TARGET:314 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1080',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1081',
        any: [
          /^\s*PRINTFORMW 「好大的寄生虫呢……难道说、要把这个放进去？　好期待呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1083',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1084',
        any: [/^\s*PRINTFORMW 「在腸内生活的寄生虫吗……有意思的生物」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1086-1087',
        any: [
          /^\s*PRINTFORMW 「原始的寄生虫吗……哼、据说体液有催淫作用呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1087',
        any: [
          /^\s*PRINTFORMW 「原始的寄生虫吗……哼、据说体液有催淫作用呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1088-1089',
        any: [/^\s*CFLAG:TARGET:314 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1089',
        any: [/^\s*CFLAG:TARGET:314 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1090-1091',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1092-1093',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1094',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1095',
        any: [
          /^\s*PRINTFORMW 「咕呜～、直腸…･･･被钻进去了～。停、停不下来了……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1096',
        any: [/^\s*CFLAG:314 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1098',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1099',
        any: [
          /^\s*PRINTFORMW 「在直腸内运动着呢……据说有催淫作用、快点生效吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1100',
        any: [/^\s*CFLAG:314 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1102',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1103',
        any: [
          /^\s*PRINTFORMW 「被这样的、下等生物……挖掘着直腸、有感觉了……嗯♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1104',
        any: [/^\s*CFLAG:314 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1106',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1107',
        any: [
          /^\s*PRINTFORMW 「这样很难有感觉呢……不过据说寄生虫对健康有益」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1108',
        any: [/^\s*CFLAG:314 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1110',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1111',
        any: [/^\s*PRINTFORMW 「这、这种下等生物……嗯」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1112',
        any: [/^\s*CFLAG:314 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1114',
        any: [/^\s*ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1115',
        any: [/^\s*PRINTFORMW 「好恶心的寄生虫……就好像你一样」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1116',
        any: [/^\s*CFLAG:314 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1117-1120',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1118-1120',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1119-1120',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1121',
        any: [/^\s*ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1123',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1124',
        any: [
          /^\s*PRINTFORMW 「肛门括約筋变的松弛下来了呢……♪　还想被继续開発呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1125',
        any: [/^\s*CFLAG:374 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1127',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1128',
        any: [/^\s*PRINTFORMW 「異物感不见了、有点寂寞呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1129',
        any: [/^\s*CFLAG:374 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1131',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1132',
        any: [/^\s*PRINTFORMW 「咕呜～、肛门括約筋……麻麻的～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1133',
        any: [/^\s*CFLAG:374 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1135',
        any: [/^\s*ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1136',
        any: [/^\s*PRINTFORMW 「哈啊～……真是恶心的生物……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1137',
        any: [/^\s*CFLAG:374 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1138-1142',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1139-1142',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1140-1142',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1140-1361',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1362',
        any: [/^\s*IF SELECTCOM == 19 && TEQUIP:19\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1364',
        any: [/^\s*IF CFLAG:TARGET:320 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1366',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1367',
        any: [/^\s*PRINTFORMW 「要把这个全部放进去吗？　好期待呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1369',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1370',
        any: [/^\s*PRINTFORMW 「一个一个的好好放进去哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1372-1373',
        any: [/^\s*PRINTFORMW 「这样変態的器具……难以理解呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1373',
        any: [/^\s*PRINTFORMW 「这样変態的器具……难以理解呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1374-1375',
        any: [/^\s*CFLAG:TARGET:320 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1375',
        any: [/^\s*CFLAG:TARGET:320 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1376-1377',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1378-1379',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1380',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1381',
        any: [
          /^\s*PRINTFORMW 「嗯～……一个接一个的、放进去了呢……好期待拔出来的时候呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1382',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1384',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的屁股后面、另一条下流的尾巴摇动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1385-1386',
        any: [/^\s*CFLAG:320 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1386',
        any: [/^\s*CFLAG:320 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1388',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1389',
        any: [
          /^\s*PRINTFORMW 「这可真是……有趣的道具呢。肚子里面塞得满满的呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1390',
        any: [/^\s*CFLAG:320 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1392',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1393',
        any: [
          /^\s*PRINTFORMW 「呼呜～…哈啊～、全、全部放进去了吧？　想被一口气拔出来呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1394',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1396',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%的屁股后面、另一条下流的尾巴摇动着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1397-1398',
        any: [/^\s*CFLAG:320 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1398',
        any: [/^\s*CFLAG:320 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1400',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1401',
        any: [/^\s*PRINTFORMW 「想一個一個地被你的手放进去呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1402',
        any: [/^\s*CFLAG:320 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1404',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1405',
        any: [/^\s*PRINTFORMW 「嗯～、咕～……哈啊～、肛、肛門……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1406',
        any: [/^\s*CFLAG:320 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1408',
        any: [/^\s*ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1409',
        any: [/^\s*PRINTFORMW 「对这样的器具拿出干劲什么的……做不到呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1410',
        any: [/^\s*CFLAG:320 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1411-1414',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1412-1414',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1413-1414',
        any: [/^\s*;脱着時\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1415',
        any: [/^\s*ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1417',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1418',
        any: [
          /^\s*PRINTFORMW 「嗯哈啊～♪　这个、太棒了……♪　滑溜溜的拔出来了～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1419',
        any: [/^\s*CFLAG:379 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1421',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1422',
        any: [/^\s*PRINTFORMW 「拔出来了……总觉得、好像在产卵呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1423',
        any: [/^\s*CFLAG:379 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1425',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1426',
        any: [/^\s*PRINTFORMW 「嗯～……咕～、哈啊～、哈啊～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1427',
        any: [/^\s*CFLAG:379 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1429',
        any: [/^\s*ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1430',
        any: [/^\s*PRINTFORMW 「结束了吗……？　只感到难受呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1431',
        any: [/^\s*CFLAG:379 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1432-1436',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1433-1436',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1434-1436',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1439',
        any: [/^\s*IF SELECTCOM == 20\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1441',
        any: [/^\s*IF CFLAG:TARGET:321 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1443',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1445',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1446',
        any: [
          /^\s*PRINTFORMW 「这个我知道、是叫做深度授精式吧？　请让我头一次的受精吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1448',
        any: [/^\s*ELSEIF TALENT:85 == 1 && ABL:10 >= 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1449',
        any: [
          /^\s*PRINTFORMW 「能把处女献给你……%SELF_CALL\(TARGET\)%觉得好光栄」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1451-1452',
        any: [
          /^\s*PRINTFORMW 「只是粘膜被弄破了而已……在生物学意义上、什么变化都算不上」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1452',
        any: [
          /^\s*PRINTFORMW 「只是粘膜被弄破了而已……在生物学意义上、什么变化都算不上」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1453-1454',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1455-1456',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1456',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1457',
        any: [
          /^\s*PRINTFORMW 「这个我知道、是叫做深度授精式吧？　请让我受精吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1459',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1460',
        any: [/^\s*PRINTFORMW 「因为怀孕而产生的母体変化……想试试看呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1462-1463',
        any: [/^\s*PRINTFORMW 「只有怀孕……只有怀孕千万不要啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1463',
        any: [/^\s*PRINTFORMW 「只有怀孕……只有怀孕千万不要啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1464-1466',
        any: [/^\s*CFLAG:321 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1465-1466',
        any: [/^\s*CFLAG:321 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1466',
        any: [/^\s*CFLAG:321 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1467-1468',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1469-1470',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1471',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1472',
        any: [
          /^\s*PRINTFORMW 「想被你弄怀孕呢……子宮已经躁动的不得了了呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1473',
        any: [/^\s*CFLAG:321 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1475',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1476',
        any: [
          /^\s*PRINTFORMW 「想怀上和你的孩子呢……把大量的精子射进来吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1477',
        any: [/^\s*CFLAG:321 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1479',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1480',
        any: [
          /^\s*PRINTFORMW 「感、感觉到了……子宮在期盼着受精……？　难以置信……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1481',
        any: [/^\s*CFLAG:321 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1483',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1484',
        any: [
          /^\s*PRINTFORMW 「我知道了……%SELF_CALL\(TARGET\)%的身体、随便你怎么使用吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1485',
        any: [/^\s*CFLAG:321 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1487',
        any: [/^\s*ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1488',
        any: [
          /^\s*PRINTFORMW 「住、住手……敢在%SELF_CALL\(TARGET\)%的身体里射精可饶不了你哦！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1489',
        any: [/^\s*CFLAG:321 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1490-1495',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1491-1495',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1492-1495',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1493-1495',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1498',
        any: [/^\s*IF SELECTCOM == 21\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1500',
        any: [/^\s*IF CFLAG:TARGET:322 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1502',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1504',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1505',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1507',
        any: [
          /^\s*PRINTFORMW 「这是适合野兽的姿态呢、不觉得有些变态吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1508-1509',
        any: [
          /^\s*PRINTFORMW 「好像野生動物似的呢……这样的第一次、不觉得太过変態了吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1509',
        any: [
          /^\s*PRINTFORMW 「好像野生動物似的呢……这样的第一次、不觉得太过変態了吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1510-1511',
        any: [/^\s*;爱慕\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1512',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1513',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1515',
        any: [
          /^\s*PRINTFORMW 「这是适合野兽的姿态呢……那么就这样让我怀孕吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1516-1517',
        any: [
          /^\s*PRINTFORMW 「第一次就是这种野蛮的体位吗……那么就这样让我怀孕吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1517',
        any: [
          /^\s*PRINTFORMW 「第一次就是这种野蛮的体位吗……那么就这样让我怀孕吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1518-1521',
        any: [/^\s*;それ以外\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1522-1523',
        any: [/^\s*PRINTFORMW 「屈辱啊……咕呜、屈辱啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1523',
        any: [/^\s*PRINTFORMW 「屈辱啊……咕呜、屈辱啊！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1524-1525',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1526-1527',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1528',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1529',
        any: [/^\s*PRINTFORMW 「好像野生動物似的呢、你喜欢这样吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1531',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1532',
        any: [/^\s*PRINTFORMW 「这是很适合受孕的体位呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1534-1535',
        any: [/^\s*PRINTFORMW 「真野蛮……跟你真配呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1535',
        any: [/^\s*PRINTFORMW 「真野蛮……跟你真配呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1536-1538',
        any: [/^\s*CFLAG:322 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1537-1538',
        any: [/^\s*CFLAG:322 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1538',
        any: [/^\s*CFLAG:322 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1539-1540',
        any: [/^\s*;妊娠\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1541',
        any: [/^\s*ELSEIF TALENT:153 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1543',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1544',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1545',
        any: [/^\s*PRINTFORMW 「原来还有会给怀孕的雌性授精的雄性呢……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1546',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1547',
        any: [
          /^\s*PRINTFORMW 「居然连孕妇都上……这样不合理的事、难道是你的兴趣吗……？　真是太棒啦……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1548-1549',
        any: [
          /^\s*PRINTFORMW 「再更用力地操我啊……让肚子里孩子也一起感受一下吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1549',
        any: [
          /^\s*PRINTFORMW 「再更用力地操我啊……让肚子里孩子也一起感受一下吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1550-1551',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1551',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1553',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%完全抛弃了狼人的的自尊心、沦为一头纯粹的母兽了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1554-1555',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1555',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1557',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1558',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1559',
        any: [
          /^\s*PRINTFORMW 「这样如同动物一般的做爱、就算怀孕也不奇怪啦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1560',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1561',
        any: [
          /^\s*PRINTFORMW 「把你的精液……射在……肚子里……孩子的身上吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1562-1563',
        any: [
          /^\s*PRINTFORMW 「这么色情的体位、还真有点不想让里面的孩子看到呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1563',
        any: [
          /^\s*PRINTFORMW 「这么色情的体位、还真有点不想让里面的孩子看到呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1564-1565',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1565',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1567',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%抛弃了狼人的的自尊心、沦为一头发情的母兽了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1568-1569',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1569',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1571',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1572',
        any: [/^\s*PRINTFORMW 「呜呜呜……肚子里……鸡巴……在乱撞啊……嗯啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1573',
        any: [/^\s*CFLAG:322 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1575',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1576',
        any: [/^\s*PRINTFORMW 「太耻辱了……竟然完全无法抵抗什么的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1577',
        any: [/^\s*CFLAG:322 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1579',
        any: [/^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1580',
        any: [/^\s*PRINTFORMW 「可恶……竟然用这种野蛮下等的体位……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1582',
        any: [/^\s*CFLAG:322 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1583-1585',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1584-1585',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1586-1587',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1588',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1589',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1590',
        any: [/^\s*PRINTFORMW 「现在这个瞬间、只剩下雄性和雌性了哦……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1591',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1592',
        any: [
          /^\s*PRINTFORMW 「这种野生动物般的体位、是你的癖好吗……？　好棒……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1593-1594',
        any: [
          /^\s*PRINTFORMW 「再使劲点撞我的腰……让屁股肉也跳动起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1594',
        any: [
          /^\s*PRINTFORMW 「再使劲点撞我的腰……让屁股肉也跳动起来吧♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1595-1596',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1596',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1598',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%已经舍弃了人狼的自豪，完全变成了一匹雌性。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1599-1600',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1600',
        any: [/^\s*CFLAG:322 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1602',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1603',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1604',
        any: [/^\s*PRINTFORMW 「这般像动物似的做爱、絶対会怀……怀孕的♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1605',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1606',
        any: [/^\s*PRINTFORMW 「让我確実的受孕吧……用你的精液！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1607-1608',
        any: [/^\s*PRINTFORMW 「就决定用这种下流的体位来受孕吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1608',
        any: [/^\s*PRINTFORMW 「就决定用这种下流的体位来受孕吧♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1609-1610',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1610',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1612',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%已经舍弃了人狼的自豪、变成了为了怀孕而发情的雌性了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1613-1614',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1614',
        any: [/^\s*CFLAG:322 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1616',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1617',
        any: [
          /^\s*PRINTFORMW 「呜呜～……阴茎……在里面……嘎吱嘎吱地……嗯啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1618',
        any: [/^\s*CFLAG:322 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1620',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1621',
        any: [/^\s*PRINTFORMW 「屈辱啊……什么也做不了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1622',
        any: [/^\s*CFLAG:322 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1624',
        any: [/^\s*ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1625',
        any: [/^\s*PRINTFORMW 「好恨啊……被这种野蛮下流的体位……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1627',
        any: [/^\s*CFLAG:322 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1628-1633',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1629-1633',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1630-1633',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1631-1633',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1636',
        any: [/^\s*IF SELECTCOM == 22\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1637',
        any: [/^\s*IF CFLAG:TARGET:323 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1639',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1641',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1642',
        any: [/^\s*PRINTFORMW 「亲个嘴吧……作为第一次的纪念呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1644',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1645',
        any: [/^\s*PRINTFORMW 「要成为女人了呢……想被你紧紧的抱住呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1647-1648',
        any: [/^\s*PRINTFORMW 「咕呜～……处女膜没了……才没什么感想呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1648',
        any: [/^\s*PRINTFORMW 「咕呜～……处女膜没了……才没什么感想呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1649-1650',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1651-1652',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1653',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1654',
        any: [/^\s*PRINTFORMW 「一边亲吻一边缠在一起……真不错呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1656',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1657',
        any: [
          /^\s*PRINTFORMW 「真想记下受精瞬間的%SELF_CALL\(TARGET\)%的脸呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1659-1660',
        any: [/^\s*PRINTFORMW 「咕呜～……不要抱得这么紧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1660',
        any: [/^\s*PRINTFORMW 「咕呜～……不要抱得这么紧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1661-1663',
        any: [/^\s*CFLAG:323 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1662-1663',
        any: [/^\s*CFLAG:323 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1663',
        any: [/^\s*CFLAG:323 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1664-1665',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1666-1667',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1668',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1669',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1670',
        any: [/^\s*PRINTFORMW 「被抱在你的怀里……感觉还不坏」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1671',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1672',
        any: [
          /^\s*PRINTFORMW 「看到高潮脸了吗、因为你的突刺而喜悦的%SELF_CALL\(TARGET\)%的脸」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1673-1674',
        any: [/^\s*PRINTFORMW 「嗯～……啊啊～……深深的、插我啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1674',
        any: [/^\s*PRINTFORMW 「嗯～……啊啊～……深深的、插我啊♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1675-1676',
        any: [/^\s*CFLAG:323 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1676',
        any: [/^\s*CFLAG:323 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1678',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1679',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1680',
        any: [/^\s*PRINTFORMW 「受精了……啊啊、被你抱着受精了啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1681',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1682',
        any: [
          /^\s*PRINTFORMW 「子宮……降下来了。因为想要你的精液、一颤一颤的呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1683-1684',
        any: [
          /^\s*PRINTFORMW 「求你了、射精吧！　在%SELF_CALL\(TARGET\)%的里面把精液射出来吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1684',
        any: [
          /^\s*PRINTFORMW 「求你了、射精吧！　在%SELF_CALL\(TARGET\)%的里面把精液射出来吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1685-1686',
        any: [/^\s*CFLAG:323 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1686',
        any: [/^\s*CFLAG:323 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1688',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1689',
        any: [/^\s*PRINTFORMW 「咕呜……这种、感觉……不对」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1690',
        any: [/^\s*CFLAG:323 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1692',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1693',
        any: [/^\s*PRINTFORMW 「服从你了吗……子宮也随你使唤了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1694',
        any: [/^\s*CFLAG:323 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1696',
        any: [/^\s*ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1697',
        any: [
          /^\s*PRINTFORMW 「咕呜……这样子……什么感觉、也没有。那是汗……好恶心」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1698',
        any: [/^\s*CFLAG:323 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1699-1704',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1700-1704',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1701-1704',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1702-1704',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1707',
        any: [/^\s*IF SELECTCOM == 23\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1708',
        any: [/^\s*IF CFLAG:TARGET:324 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1710',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1712',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1713',
        any: [
          /^\s*PRINTFORMW 「有镜子的话真想看一看呢……%SELF_CALL\(TARGET\)%失去处女的瞬間……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1715',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1716',
        any: [
          /^\s*PRINTFORMW 「拜托了这样可看不到你的脸啊……一定、会哭出来的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1718-1719',
        any: [
          /^\s*PRINTFORMW 「咕呜～……处女膜就这样没了……才没有什么感想呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1719',
        any: [
          /^\s*PRINTFORMW 「咕呜～……处女膜就这样没了……才没有什么感想呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1720-1721',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1722-1723',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1724',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1725',
        any: [/^\s*PRINTFORMW 「从背后抱着吗？　好像变成小孩子了呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1727',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1728',
        any: [
          /^\s*PRINTFORMW 「被从背后抱住了呢、要在受精的瞬間好好接住呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1730-1731',
        any: [/^\s*PRINTFORMW 「咕呜～……不要我耳边说悄悄话……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1731',
        any: [/^\s*PRINTFORMW 「咕呜～……不要我耳边说悄悄话……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1732-1734',
        any: [/^\s*CFLAG:324 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1733-1734',
        any: [/^\s*CFLAG:324 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1734',
        any: [/^\s*CFLAG:324 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1735-1736',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1737-1738',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1739',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1740',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1741',
        any: [/^\s*PRINTFORMW 「感觉到了……你胸部的呼吸、从背后传过来……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1742',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1743',
        any: [
          /^\s*PRINTFORMW 「嗯～、哈啊……好深……感觉到了哦、你的蠢动……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1744-1745',
        any: [
          /^\s*PRINTFORMW 「这可真是上乘的椅子呢……嗯～、坐起来的感觉、最棒了……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1745',
        any: [
          /^\s*PRINTFORMW 「这可真是上乘的椅子呢……嗯～、坐起来的感觉、最棒了……！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1746-1747',
        any: [/^\s*CFLAG:324 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1747',
        any: [/^\s*CFLAG:324 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1749',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1750',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1751',
        any: [/^\s*PRINTFORMW 「嗯啊啊啊啊～！　絶対、会受精的♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1752',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1753',
        any: [/^\s*PRINTFORMW 「要、要死了……你、太激烈了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1754-1755',
        any: [
          /^\s*PRINTFORMW 「好深……在这个深处、送出来吧……让我怀上孩子吧……欸」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1755',
        any: [
          /^\s*PRINTFORMW 「好深……在这个深处、送出来吧……让我怀上孩子吧……欸」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1756-1757',
        any: [/^\s*CFLAG:324 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1757',
        any: [/^\s*CFLAG:324 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1759',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1760',
        any: [
          /^\s*PRINTFORMW 「嗯～……嗯啊～、感、感觉到了……灼熱的、情欲……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1761',
        any: [/^\s*CFLAG:324 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1763',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1764',
        any: [/^\s*PRINTFORMW 「身体归你所有之后、连心也……嗯！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1765',
        any: [/^\s*CFLAG:324 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1767',
        any: [/^\s*ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1768',
        any: [
          /^\s*PRINTFORMW 「这样子……什么感觉、也没有……只不过是摩擦粘膜罢了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1769',
        any: [/^\s*CFLAG:324 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1770-1775',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1771-1775',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1772-1775',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1773-1775',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1778',
        any: [/^\s*IF SELECTCOM == 26\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1780',
        any: [/^\s*IF CFLAG:TARGET:327 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1782',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1783',
        any: [/^\s*PRINTFORMW 「快请插进来吧、这个菊穴里～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1785',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1786',
        any: [/^\s*PRINTFORMW 「其实、前面更想要的说……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1788-1789',
        any: [/^\s*PRINTFORMW 「这、这么野蛮的行為……饶不了你……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1789',
        any: [/^\s*PRINTFORMW 「这、这么野蛮的行為……饶不了你……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1790-1791',
        any: [/^\s*CFLAG:TARGET:327 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1791',
        any: [/^\s*CFLAG:TARGET:327 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1792-1793',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1794-1795',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1796',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1797',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1798',
        any: [
          /^\s*PRINTFORMW 「啊啊啊～、肛、肛门、完全、变成性器了！　啊啊啊～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1799',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1800',
        any: [/^\s*PRINTFORMW 「肛、肛门……麻麻的样子、好舒服……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1801-1802',
        any: [
          /^\s*PRINTFORMW 「把阴茎吞下去了……%SELF_CALL\(TARGET\)%的肛门、把阴茎完全的吞下去了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1802',
        any: [
          /^\s*PRINTFORMW 「把阴茎吞下去了……%SELF_CALL\(TARGET\)%的肛门、把阴茎完全的吞下去了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1803-1804',
        any: [/^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1804',
        any: [/^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1806',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1807',
        any: [
          /^\s*PRINTFORMW 「还、还想再感受一下……肛门、还想再、感受一下阴茎！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1808',
        any: [/^\s*CFLAG:327 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1810',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1811',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1812',
        any: [
          /^\s*PRINTFORMW 「让%SELF_CALL\(TARGET\)%的肛门、好好地和阴茎做游戏吧……？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1813-1814',
        any: [
          /^\s*PRINTFORMW 「肛门、%SELF_CALL\(TARGET\)%的肛门、变得好奇怪……好想要阴茎！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1814',
        any: [
          /^\s*PRINTFORMW 「肛门、%SELF_CALL\(TARGET\)%的肛门、变得好奇怪……好想要阴茎！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1815-1816',
        any: [/^\s*CFLAG:327 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1816',
        any: [/^\s*CFLAG:327 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1818',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1819',
        any: [/^\s*PRINTFORMW 「还、还没……看起来还没习惯的样子……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1820',
        any: [/^\s*CFLAG:327 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1822',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1823',
        any: [/^\s*PRINTFORMW 「咕呜～、肛、肛门、変的好奇怪了～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1824',
        any: [/^\s*CFLAG:327 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1826',
        any: [/^\s*ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1827',
        any: [/^\s*PRINTFORMW 「好痛……呀啊啊！　好痛！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1828',
        any: [/^\s*CFLAG:327 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1829-1834',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1830-1834',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1831-1834',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1832-1834',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1837',
        any: [/^\s*IF SELECTCOM == 27\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1839',
        any: [/^\s*IF CFLAG:TARGET:328 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1841',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1842',
        any: [/^\s*PRINTFORMW 「等待多时了、这下流的体位！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1844',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1845',
        any: [/^\s*PRINTFORMW 「已经做好被插入的准备了哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1847-1848',
        any: [/^\s*PRINTFORMW 「咕呜～、好、好羞恥……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1848',
        any: [/^\s*PRINTFORMW 「咕呜～、好、好羞恥……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1849-1850',
        any: [/^\s*CFLAG:TARGET:328 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1850',
        any: [/^\s*CFLAG:TARGET:328 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1851-1852',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1853-1854',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1855',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1856',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1857',
        any: [
          /^\s*PRINTFORMW 「这、这样子好喜欢～！　野生的、非文明的、下流的姿势……像这样地、被操肛门！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1858',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1859',
        any: [
          /^\s*PRINTFORMW 「脑袋都变的傻乎乎的了……肛门像要溶化似的、%SELF_CALL\(TARGET\)%、要变成白痴了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1860-1861',
        any: [
          /^\s*PRINTFORMW 「再深点插肛门！　%SELF_CALL\(TARGET\)%、好喜欢肛门被穿刺啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1861',
        any: [
          /^\s*PRINTFORMW 「再深点插肛门！　%SELF_CALL\(TARGET\)%、好喜欢肛门被穿刺啊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1862-1863',
        any: [/^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1863',
        any: [/^\s*CFLAG:327 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1865',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1866',
        any: [
          /^\s*PRINTFORMW 「还、还不太习惯呢……有进一步開発的必要呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1867',
        any: [/^\s*CFLAG:327 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1869',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1870',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1871',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的肛门、变的好奇怪呢……你要、负起责任哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1872-1873',
        any: [
          /^\s*PRINTFORMW 「已经把阴茎的形状、给记下来了呢……%SELF_CALL\(TARGET\)%的肛门」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1873',
        any: [
          /^\s*PRINTFORMW 「已经把阴茎的形状、给记下来了呢……%SELF_CALL\(TARGET\)%的肛门」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1874-1875',
        any: [/^\s*CFLAG:328 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1875',
        any: [/^\s*CFLAG:328 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1877',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1878',
        any: [/^\s*PRINTFORMW 「嗯……还、有点痛……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1879',
        any: [/^\s*CFLAG:328 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1881',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1882',
        any: [/^\s*PRINTFORMW 「咕呜……肛门、屁眼、变松了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1883',
        any: [/^\s*CFLAG:328 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1885',
        any: [/^\s*ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1886',
        any: [/^\s*PRINTFORMW 「好痛！　肛門……要裂开了……不要这么粗暴啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1887',
        any: [/^\s*CFLAG:328 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1888-1893',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1889-1893',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1890-1893',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1891-1893',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1896',
        any: [/^\s*IF SELECTCOM == 28\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1898',
        any: [/^\s*IF CFLAG:TARGET:329 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1900',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1901',
        any: [
          /^\s*PRINTFORMW 「可以像这样面对面的作肛交……好像在做梦一样呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1903',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1904',
        any: [
          /^\s*PRINTFORMW 「想亲个嘴呢……当然、肛門也请拜托您肏的火热吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1906-1907',
        any: [/^\s*PRINTFORMW 「这样的……这样的性交、是異常的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1907',
        any: [/^\s*PRINTFORMW 「这样的……这样的性交、是異常的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1908-1909',
        any: [/^\s*CFLAG:TARGET:329 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1909',
        any: [/^\s*CFLAG:TARGET:329 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1910-1911',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1912-1913',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1914',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1915',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1916',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%淫荡扭曲的脸……真想好好看看呢、因肛門性交而满足的表情……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1917',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1918',
        any: [
          /^\s*PRINTFORMW 「嗯～……好深、好深啊！　肛門变得下流起来了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1919-1920',
        any: [/^\s*PRINTFORMW 「这样子、好喜欢……肛門、快溶化了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1920',
        any: [/^\s*PRINTFORMW 「这样子、好喜欢……肛門、快溶化了……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1921-1922',
        any: [/^\s*CFLAG:329 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1922',
        any: [/^\s*CFLAG:329 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1924',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1925',
        any: [
          /^\s*PRINTFORMW 「不再多多开发肛門可不行呢……%SELF_CALL\(TARGET\)%、会加油的」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1926',
        any: [/^\s*CFLAG:329 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1928',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1929',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1930',
        any: [/^\s*PRINTFORMW 「肛、肛門……变成你的形状了哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1931-1932',
        any: [
          /^\s*PRINTFORMW 「哈啊～、呼呜……感、感觉到了……肛門、变的下流起来了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1932',
        any: [
          /^\s*PRINTFORMW 「哈啊～、呼呜……感、感觉到了……肛門、变的下流起来了……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1933-1934',
        any: [/^\s*CFLAG:329 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1934',
        any: [/^\s*CFLAG:329 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1936',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1937',
        any: [
          /^\s*PRINTFORMW 「无论什么部位都能被爱上吗、不得不仔细研究呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1938',
        any: [/^\s*CFLAG:329 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1940',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1941',
        any: [
          /^\s*PRINTFORMW 「不行、不行……好有感觉啊啊啊！　肛門、肛門变的不是肛門了啊啊啊啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1942',
        any: [/^\s*CFLAG:329 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1944',
        any: [/^\s*ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1945',
        any: [/^\s*PRINTFORMW 「噫～、好痛、好痛啊、快住手～！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1946',
        any: [/^\s*CFLAG:329 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1947-1952',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1948-1952',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1949-1952',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1950-1952',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1955',
        any: [/^\s*IF SELECTCOM == 29\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1957',
        any: [/^\s*IF CFLAG:TARGET:330 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1959',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1960',
        any: [/^\s*PRINTFORMW 「肛门好感动呢、乳头那边也拜托了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1962',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1963',
        any: [/^\s*PRINTFORMW 「感觉到你的呼吸了……唔嗯、脖子好痒呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1965-1966',
        any: [/^\s*PRINTFORMW 「咕呜……不要碰乳头～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1966',
        any: [/^\s*PRINTFORMW 「咕呜……不要碰乳头～……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1967-1968',
        any: [/^\s*CFLAG:TARGET:330 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1968',
        any: [/^\s*CFLAG:TARGET:330 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1969-1970',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1971-1972',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1973',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1974',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1975',
        any: [
          /^\s*PRINTFORMW 「跳起来了……%SELF_CALL\(TARGET\)%、因为肛門被串刺而跳动起来了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1976-1977',
        any: [
          /^\s*PRINTFORMW 「知道吗……？　因为肛交、乳头也昂然耸立了……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1977',
        any: [
          /^\s*PRINTFORMW 「知道吗……？　因为肛交、乳头也昂然耸立了……♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1978-1979',
        any: [/^\s*CFLAG:330 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1979',
        any: [/^\s*CFLAG:330 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1981',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1982',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的肛門、看起来还没開発好呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1983',
        any: [/^\s*CFLAG:330 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1985',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1986',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1987',
        any: [
          /^\s*PRINTFORMW 「哈啊～、呼呜、有、有感觉了！　再激烈点玩弄肛门和乳头吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1988-1989',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、肛门也要怀孕了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1989',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、肛门也要怀孕了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1990-1991',
        any: [/^\s*CFLAG:330 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1991',
        any: [/^\s*CFLAG:330 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1993',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1994',
        any: [
          /^\s*PRINTFORMW 「还很痛呢……%SELF_CALL\(TARGET\)%、得多多加油呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1995',
        any: [/^\s*CFLAG:330 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1997',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1998',
        any: [
          /^\s*PRINTFORMW 「肛門、好像变的不是肛門了……好、好有感觉……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '1999',
        any: [/^\s*CFLAG:330 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2001',
        any: [/^\s*ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2002',
        any: [/^\s*PRINTFORMW 「疼、好痛……咕呜～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2003',
        any: [/^\s*CFLAG:330 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2004-2009',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2005-2009',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2006-2009',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2007-2009',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2012',
        any: [/^\s*IF SELECTCOM == 30\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2014',
        any: [/^\s*IF CFLAG:TARGET:331 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2016',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2017',
        any: [/^\s*PRINTFORMW 「为什么直到现在才让我碰啊～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2019',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2020',
        any: [
          /^\s*PRINTFORMW 「用%SELF_CALL\(TARGET\)%的手、来让它勃起来吧～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2022',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2023',
        any: [
          /^\s*PRINTFORMW 「让%SELF_CALL\(TARGET\)%搓弄也没问题是吗……我知道了」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2025-2026',
        any: [
          /^\s*PRINTFORMW 「讨厌讨厌不要啊、%SELF_CALL\(TARGET\)%、才不会干这种事呢！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2026',
        any: [
          /^\s*PRINTFORMW 「讨厌讨厌不要啊、%SELF_CALL\(TARGET\)%、才不会干这种事呢！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2027-2028',
        any: [/^\s*CFLAG:TARGET:331 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2028',
        any: [/^\s*CFLAG:TARGET:331 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2029-2030',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2031-2032',
        any: [/^\s*;淫乱＋侍奉精神Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2033',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2034',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2035',
        any: [
          /^\s*PRINTFORMW 「啊哈～、一副很想要的样子、一颤一颤的呢……好吧、我撸我撸」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2036-2037',
        any: [
          /^\s*PRINTFORMW 「粘乎乎的东西都已经出来了呢。这种液体、叫什么名字来着～？　啊哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2037',
        any: [
          /^\s*PRINTFORMW 「粘乎乎的东西都已经出来了呢。这种液体、叫什么名字来着～？　啊哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2038-2039',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2039',
        any: [/^\s*CFLAG:331 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2041',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2042',
        any: [/^\s*IF TALENT:PLAYER:318 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2044',
        any: [
          /^\s*PRINTFORMW 「你这远超平均值的鸡巴……啊哈、一只手完全把握不住哇%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2045',
        any: [/^\s*ELSEIF TALENT:PLAYER:318 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2047',
        any: [
          /^\s*PRINTFORMW 「不脸红吗你？　这种差劲肉棒%UNICODE\(0x2661\) \*1%　得了、就这么把劣等精子射在手里吧%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2048',
        any: [/^\s*ELSEIF TALENT:PLAYER:318 == 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2050',
        any: [
          /^\s*PRINTFORMW 「包皮肉棒里的脏东西都跑出来了啦%UNICODE\(0x2661\) \*1%　啊哈、好厉害的味道%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2051',
        any: [/^\s*ELSEIF TALENT:PLAYER:318 == 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2053',
        any: [
          /^\s*PRINTFORMW 「什么嘛、根本就不是人的鸡巴了吧……啊哈、给你按摩咯%UNICODE\(0x2661\) \*1%」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2054',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2056',
        any: [
          /^\s*PRINTFORMW 「射精可不行哦、明明想让你在%SELF_CALL\(TARGET\)%的里面全部射出来的……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2057-2058',
        any: [/^\s*;ふつう\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2059',
        any: [
          /^\s*PRINTFORMW 「不能再多忍耐一会儿吗？　已经、想射了吗？　想射了吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2060-2061',
        any: [/^\s*CFLAG:331 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2061',
        any: [/^\s*CFLAG:331 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2063',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2064',
        any: [
          /^\s*PRINTFORMW 「跳动的很厉害呢……快射吧快射吧、忍不住了？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2065',
        any: [/^\s*CFLAG:331 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2067',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2068',
        any: [/^\s*PRINTFORMW 「我知道了、用手来辅助自慰行為就行了是吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2069',
        any: [/^\s*CFLAG:331 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2071',
        any: [/^\s*ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2072',
        any: [/^\s*PRINTFORMW 「呜呜、热热的……好恶心……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2073',
        any: [/^\s*CFLAG:331 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2074-2079',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2075-2079',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2076-2079',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2077-2079',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2082',
        any: [/^\s*IF SELECTCOM == 31\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2084',
        any: [/^\s*IF CFLAG:TARGET:332 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2086',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2087',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的口活、还没试过吧？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2089',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2090',
        any: [/^\s*PRINTFORMW 「精液、直接喝下去了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2092',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2093',
        any: [/^\s*PRINTFORMW 「我知道了、口交就行了是吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2095-2096',
        any: [/^\s*PRINTFORMW 「这样子去舔什么的……呜诶～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2096',
        any: [/^\s*PRINTFORMW 「这样子去舔什么的……呜诶～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2097-2098',
        any: [/^\s*CFLAG:TARGET:332 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2098',
        any: [/^\s*CFLAG:TARGET:332 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2099-2100',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2101-2102',
        any: [/^\s*;淫乱＋侍奉精神Lv5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2103',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2104',
        any: [/^\s*PRINTFORML 「嗞噜～、嗞噜～、嗞啾～～……噗哈啊」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2105',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%发出了下流的声音贪求着阴茎\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2106',
        any: [/^\s*CFLAG:332 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2108',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2109',
        any: [/^\s*PRINTFORMW 「我要多多练习口交、想学会厉害的口活呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2110',
        any: [/^\s*CFLAG:332 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2112',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2113',
        any: [
          /^\s*PRINTFORML 「哈啊、这个阴茎、刚才也忍不住喷出了精液的样子呢……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2114',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%发出了下流的声音贪求着阴茎\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2115',
        any: [/^\s*CFLAG:332 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2117',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2118',
        any: [/^\s*PRINTFORML 「口交、变的挺擅长了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2119',
        any: [
          /^\s*PRINTFORMW %SAVESTR:TARGET%一边这样说着一边用嘴巴含着阴茎\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2120',
        any: [/^\s*CFLAG:332 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2122',
        any: [/^\s*ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2123',
        any: [
          /^\s*PRINTFORMW 「呜诶……为什么会一跳一跳的呢。不可思議的肉塊……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2124',
        any: [/^\s*CFLAG:332 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2125-2130',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2126-2130',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2127-2130',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2128-2130',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2133',
        any: [/^\s*IF SELECTCOM == 32\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2135',
        any: [/^\s*IF CFLAG:TARGET:333 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2137',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2138',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%的乳房、还挺管用的吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2140',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2141',
        any: [
          /^\s*PRINTFORMW 「乳房好用的话、%SELF_CALL\(TARGET\)%、就尽情的使劲蹭了哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2143',
        any: [/^\s*ELSEIF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2144',
        any: [/^\s*PRINTFORMW 「用乳房摩擦还可以吧……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2146-2147',
        any: [/^\s*PRINTFORMW 「用胸部来！？　变、変態！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2147',
        any: [/^\s*PRINTFORMW 「用胸部来！？　变、変態！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2148-2149',
        any: [/^\s*CFLAG:TARGET:333 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2149',
        any: [/^\s*CFLAG:TARGET:333 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2150-2151',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2152-2153',
        any: [/^\s*;淫乱＋侍奉精神Lv5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2154',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2155',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2156',
        any: [/^\s*PRINTFORMW 「这样挤压着会舒服吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2157-2158',
        any: [/^\s*PRINTFORMW 「快看快看快看。乳房把你的阴茎吞进去了哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2158',
        any: [/^\s*PRINTFORMW 「快看快看快看。乳房把你的阴茎吞进去了哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2159-2160',
        any: [/^\s*CFLAG:333 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2160',
        any: [/^\s*CFLAG:333 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2162',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2163',
        any: [/^\s*PRINTFORMW 「好难啊……你、真的会舒服吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2164',
        any: [/^\s*CFLAG:333 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2166',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2167',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2168',
        any: [
          /^\s*PRINTFORMW 「我会竭尽全力来奉仕的哦。用%SELF_CALL\(TARGET\)%柔软的乳房！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2169-2170',
        any: [/^\s*PRINTFORMW 「Biu的射出来也行哦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2170',
        any: [/^\s*PRINTFORMW 「Biu的射出来也行哦？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2171-2172',
        any: [/^\s*CFLAG:333 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2172',
        any: [/^\s*CFLAG:333 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2174',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2175',
        any: [/^\s*PRINTFORMW 「你、真的有感觉吗？　那就好……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2176',
        any: [/^\s*CFLAG:333 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2178',
        any: [/^\s*ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2179',
        any: [/^\s*PRINTFORMW 「呜呜、这样子到底有什么好高兴的嘛……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2180',
        any: [/^\s*CFLAG:333 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2181-2186',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2182-2186',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2183-2186',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2184-2186',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2189',
        any: [/^\s*IF SELECTCOM == 33\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2191',
        any: [/^\s*IF CFLAG:TARGET:334 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2193',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2194',
        any: [
          /^\s*PRINTFORMW 「快看快看、要进到%SELF_CALL\(TARGET\)%的阴道里去了哦？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2196',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2197',
        any: [/^\s*PRINTFORMW 「只在表面摩擦吗……好想进到里面去呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2199-2200',
        any: [/^\s*PRINTFORMW 「这样摩擦到底有什么好高兴的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2200',
        any: [/^\s*PRINTFORMW 「这样摩擦到底有什么好高兴的……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2201-2202',
        any: [/^\s*CFLAG:TARGET:334 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2202',
        any: [/^\s*CFLAG:TARGET:334 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2203-2204',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2205-2206',
        any: [/^\s*;淫乱\+处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2207',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2208',
        any: [
          /^\s*PRINTFORMW 「呐、只在表面摩擦你会觉得舒服吗？　%SELF_CALL\(TARGET\)%……对这不是很了解呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2209',
        any: [/^\s*CFLAG:334 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2211',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2212',
        any: [
          /^\s*PRINTFORMW 「呐、只在表面摩擦你会觉得舒服吗？　%SELF_CALL\(TARGET\)%……有点遗憾呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2213',
        any: [/^\s*CFLAG:334 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2215',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2216',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%已经到极限了……明明好想被插进去、明明好想……被插到里面啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2217',
        any: [/^\s*CFLAG:334 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2219',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2220',
        any: [
          /^\s*PRINTFORMW 「假如你、一不小心把你的阴茎插进了%SELF_CALL\(TARGET\)%的阴道里的话……该怎么办呢？　啊哈哈～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2221',
        any: [/^\s*CFLAG:334 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2223',
        any: [/^\s*ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2224',
        any: [/^\s*PRINTFORMW 「看起来这样的摩擦让你很高兴嘛……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2225',
        any: [/^\s*CFLAG:334 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2226-2231',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2227-2231',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2228-2231',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2229-2231',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2234',
        any: [/^\s*IF SELECTCOM == 34\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2236',
        any: [/^\s*IF CFLAG:TARGET:335 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2238',
        any: [/^\s*IF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2240',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2241',
        any: [/^\s*PRINTFORMW 「我期待已久了！　把你的阴茎、交给我吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2243',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2244',
        any: [
          /^\s*PRINTFORMW 「终于、想要让我%SELF_CALL\(TARGET\)%怀孕了吗！　好开心哦」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2246-2247',
        any: [/^\s*PRINTFORMW 「让我自己来……你实在太无耻了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2247',
        any: [/^\s*PRINTFORMW 「让我自己来……你实在太无耻了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2248-2249',
        any: [/^\s*;非处女\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2250-2251',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2252',
        any: [/^\s*IF TALENT:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2253',
        any: [
          /^\s*PRINTFORMW 「嘿诶、这么想让%SELF_CALL\(TARGET\)%来吗」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2255',
        any: [/^\s*ELSEIF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2256',
        any: [/^\s*PRINTFORMW 「这样子嘎吱嘎吱的……并不讨厌哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2258-2259',
        any: [/^\s*PRINTFORMW 「让我自己来……可恶」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2259',
        any: [/^\s*PRINTFORMW 「让我自己来……可恶」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2260-2262',
        any: [/^\s*CFLAG:TARGET:335 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2261-2262',
        any: [/^\s*CFLAG:TARGET:335 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2262',
        any: [/^\s*CFLAG:TARGET:335 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2263-2264',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2265-2266',
        any: [/^\s*;淫乱\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2267',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2268',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2269',
        any: [
          /^\s*PRINTFORMW 「来吧来吧、更多的从下面来插%SELF_CALL\(TARGET\)%吧！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2270',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2271',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%扭腰的样子、请多多欣赏吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2272',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2273',
        any: [/^\s*PRINTFORMW 「停不下来了、你也多用阴茎来顶我吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2274-2275',
        any: [/^\s*PRINTFORMW 「哈啊～、从下面、操我吧～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2275',
        any: [/^\s*PRINTFORMW 「哈啊～、从下面、操我吧～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2276-2277',
        any: [/^\s*CFLAG:335 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2277',
        any: [/^\s*CFLAG:335 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2279',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2280',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2281',
        any: [/^\s*PRINTFORMW 「要把精液一滴不剩的榨干哦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2282',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2283',
        any: [/^\s*PRINTFORMW 「快看快看、要出来了哦、精液！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2284',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2285',
        any: [/^\s*PRINTFORMW 「想更多的被阴茎操呢、啊哈哈～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2286-2287',
        any: [
          /^\s*PRINTFORMW 「出来了～！　把精液、更多的、射进来吧！　啊啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2287',
        any: [
          /^\s*PRINTFORMW 「出来了～！　把精液、更多的、射进来吧！　啊啊啊～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2288-2289',
        any: [/^\s*CFLAG:335 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2289',
        any: [/^\s*CFLAG:335 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2291',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2292',
        any: [/^\s*IF RAND:4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2293',
        any: [
          /^\s*PRINTFORMW 「不行了、%SELF_CALL\(TARGET\)%的腰、自己动起来了！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2294',
        any: [/^\s*ELSEIF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2295',
        any: [
          /^\s*PRINTFORMW 「竟然……让%SELF_CALL\(TARGET\)%这样做……不过……」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2296',
        any: [/^\s*ELSEIF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2297',
        any: [/^\s*PRINTFORMW 「哈啊～、哈啊～、咕呜～♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2298-2299',
        any: [/^\s*PRINTFORMW 「不行啊、这样子……往上顶……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2299',
        any: [/^\s*PRINTFORMW 「不行啊、这样子……往上顶……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2300-2301',
        any: [/^\s*CFLAG:335 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2301',
        any: [/^\s*CFLAG:335 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2303',
        any: [
          /^\s*ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2304',
        any: [/^\s*PRINTFORMW 「唔～……我知道了。跨在你身上就行了吧？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2305',
        any: [/^\s*CFLAG:335 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2307',
        any: [/^\s*ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2308',
        any: [
          /^\s*PRINTFORMW 「竟让%SELF_CALL\(TARGET\)%……这样做……好屈辱～」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2309',
        any: [/^\s*CFLAG:335 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2310-2315',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2311-2315',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2312-2315',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2313-2315',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2318',
        any: [/^\s*IF SELECTCOM == 35\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2320',
        any: [/^\s*IF CFLAG:TARGET:336 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2322',
        any: [/^\s*IF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2323',
        any: [/^\s*PRINTFORMW 「你喜欢提供这种服务的店吗……？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2325-2326',
        any: [/^\s*PRINTFORMW 「跟按摩女似的……额」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2326',
        any: [/^\s*PRINTFORMW 「跟按摩女似的……额」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2327-2328',
        any: [/^\s*CFLAG:TARGET:336 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2328',
        any: [/^\s*CFLAG:TARGET:336 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2329-2330',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2331-2332',
        any: [/^\s*;淫乱＋侍奉精神Lv5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2333',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2334',
        any: [
          /^\s*PRINTFORMW 「快看快看、被%SELF_CALL\(TARGET\)%的肌肤哧溜哧溜的摩擦着哦～♪　舒服吗？」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2335',
        any: [/^\s*CFLAG:336 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2337',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2338',
        any: [
          /^\s*PRINTFORMW 「这身体是只属于你的哦、为了你……嫩呼呼的呢」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2339',
        any: [/^\s*CFLAG:336 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2341',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2342',
        any: [/^\s*PRINTFORMW 「变的全是泡泡了呢……舒服吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2343',
        any: [/^\s*CFLAG:336 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2345',
        any: [/^\s*ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2346',
        any: [/^\s*PRINTFORMW 「喂、这样做应该可以了吧……真是的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2347',
        any: [/^\s*CFLAG:336 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2348-2353',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2349-2353',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2350-2353',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2351-2353',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2356',
        any: [/^\s*IF SELECTCOM == 36\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2358',
        any: [/^\s*IF CFLAG:TARGET:337 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2360',
        any: [/^\s*IF TALENT:TARGET:76 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2361',
        any: [/^\s*PRINTFORMW 「这样骑在你的身上就好像做梦一样呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2363',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2364',
        any: [/^\s*PRINTFORMW 「呜嗯～……用肛門裹住了呢……♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2366-2367',
        any: [/^\s*PRINTFORMW 「这么卑劣的肛交还是第一次……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2367',
        any: [/^\s*PRINTFORMW 「这么卑劣的肛交还是第一次……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2368-2369',
        any: [/^\s*CFLAG:TARGET:337 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2369',
        any: [/^\s*CFLAG:TARGET:337 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2370-2371',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2372-2373',
        any: [/^\s*;淫乱＋A感覚Lv3以上\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2374',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2375',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2376',
        any: [
          /^\s*PRINTFORMW 「不行了、%SELF_CALL\(TARGET\)%的肛门要溶化了啊！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2377-2378',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、一被串刺着……从肛门到大脑、都在回响！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2378',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%、一被串刺着……从肛门到大脑、都在回响！」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2379-2380',
        any: [/^\s*CFLAG:337 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2380',
        any: [/^\s*CFLAG:337 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2382',
        any: [
          /^\s*ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2383',
        any: [
          /^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%一动起来、你就盯着不放呢♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2384',
        any: [/^\s*CFLAG:337 = 6\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2386',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2387',
        any: [/^\s*IF RAND:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2388',
        any: [/^\s*PRINTFORMW 「啊啊、难以置信、肛门要溶化了♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2389-2390',
        any: [
          /^\s*PRINTFORMW 「肛、肛门、肛门要……不行～、太有感觉了～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2390',
        any: [
          /^\s*PRINTFORMW 「肛、肛门、肛门要……不行～、太有感觉了～♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2391-2392',
        any: [/^\s*CFLAG:337 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2392',
        any: [/^\s*CFLAG:337 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2394',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2395',
        any: [/^\s*PRINTFORMW 「肛門含住阴茎的样子、好好看看吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2396',
        any: [/^\s*CFLAG:337 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2398',
        any: [
          /^\s*ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2399',
        any: [
          /^\s*PRINTFORMW 「咕呜、像这样的肛交什么的……尽管让%SELF_CALL\(TARGET\)%做吧」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2400',
        any: [/^\s*CFLAG:337 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2402',
        any: [/^\s*ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2403',
        any: [
          /^\s*PRINTFORMW 「痛、好疼、好痛啊……%SELF_CALL\(TARGET\)%已经不想再做了啊」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2404',
        any: [/^\s*CFLAG:337 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2405-2410',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2406-2410',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2407-2410',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2408-2410',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2413',
        any: [/^\s*IF SELECTCOM == 37\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2415',
        any: [/^\s*IF CFLAG:TARGET:338 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2417',
        any: [/^\s*IF ABL:TARGET:16 >= 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2418',
        any: [/^\s*PRINTFORMW 「竟然要我舔这么脏的地方……你真是变态呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2420-2421',
        any: [/^\s*PRINTFORMW 「讨、讨厌、竟然要我舔那种地方……呜呜～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2421',
        any: [/^\s*PRINTFORMW 「讨、讨厌、竟然要我舔那种地方……呜呜～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2422-2423',
        any: [/^\s*CFLAG:TARGET:338 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2423',
        any: [/^\s*CFLAG:TARGET:338 = 1\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2424-2425',
        any: [/^\s*;二回目以降\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2426-2427',
        any: [/^\s*;淫乱＋侍奉精神Lv5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2428',
        any: [
          /^\s*IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2429',
        any: [/^\s*PRINTFORMW 「这样把舌头伸进肛门、你喜欢吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2430',
        any: [/^\s*CFLAG:338 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2432',
        any: [
          /^\s*ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2433',
        any: [
          /^\s*PRINTFORML 「你的肛门……被%SELF_CALL\(TARGET\)%弄干净了哦♪」\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2434',
        any: [/^\s*CFLAG:338 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2436',
        any: [
          /^\s*ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2437',
        any: [/^\s*PRINTFORMW 「我知道了……舔就行了吧？　有好好洗过吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2438',
        any: [/^\s*CFLAG:338 = 3\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2440',
        any: [/^\s*ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2441',
        any: [/^\s*PRINTFORMW 「呜呜……咕呜～、呜呜……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2442',
        any: [/^\s*CFLAG:338 = 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2443-2448',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2444-2448',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2445-2448',
        any: [/^\s*;-------------------------------------------------\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '2446-2448',
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
