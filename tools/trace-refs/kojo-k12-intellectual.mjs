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
        any: [/^\s*PRINTFORMW 「就表扬你一下吧。这是超出了%SELF_CALL\(TARGET\)%预想的力量」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '95',
        any: [/^\s*PRINTFORMW 「但是没用的哦。%SELF_CALL\(TARGET\)%作为自豪的人狼、还拥有最高的智能……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '96',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%虽然带着清爽的表情逞强着、但轻飘飘的耳朵害怕的低了下来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '97-98',
        any: [/^\s*PRINTFORMW 「看起来你比%SELF_CALL\(TARGET\)%更厉害呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '98',
        any: [/^\s*PRINTFORMW 「看起来你比%SELF_CALL\(TARGET\)%更厉害呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '99',
        any: [/^\s*PRINTFORMW 「但%SELF_CALL\(TARGET\)%可是接受过特殊訓練的。不管对我做什么都是没用的」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '100',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%表情冷淡强装镇定、声音微微发颤\s*$/m],
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
        any: [/^\s*PRINTFORMW 「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '110',
        any: [/^\s*PRINTFORMW 「对不住了呢……在其他人的身体上做了活塞运动的确是事实呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '111',
        any: [/^\s*PRINTFORMW 「但是从生物学上看这并没有什么問題、只是感情上的問題哦、所以原谅我吧」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '116-117',
        any: [/^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '117',
        any: [/^\s*PRINTFORMW 「又被抓住了呢……%SELF_CALL\(TARGET\)%的运气真不好」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '118',
        any: [/^\s*PRINTFORMW 「是要继续調教我吗？　还是当成肉便器处理？　随便你吧」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「你到底是……何方神圣、能把%SELF_CALL\(TARGET\)%逼到这种地步……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '137',
        any: [/^\s*PRINTFORMW 「你到底是……何方神圣、能把%SELF_CALL\(TARGET\)%逼到这种地步……」\s*$/m],
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
        any: [/^\s*ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '143-144',
        any: [/^\s*PRINTFORMW 「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '144',
        any: [/^\s*PRINTFORMW 「难以置信……这样的情况、不管是数据还是资料上都从未见过呢！？」\s*$/m],
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
        any: [/^\s*ELSEIF CFLAG:201 < 5 && TALENT:TARGET:76 == 1 && TALENT:TARGET:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '150-151',
        any: [/^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……让%SELF_CALL\(TARGET\)%更多地对此进行研究吧、拜托了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '151',
        any: [/^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……让%SELF_CALL\(TARGET\)%更多地对此进行研究吧、拜托了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '152',
        any: [/^\s*PRINTFORMW 「想尝试一下、%SELF_CALL\(TARGET\)%的身体能淫靡化到什么地步……已经、睡不着了！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '153',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%一边流着口水一边用腰蹭着你的腿\s*$/m],
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
        any: [/^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '161',
        any: [/^\s*PRINTFORMW 「竟然还存在着如此美妙的新世界……拜托了！　让我和你一起来研究吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '162',
        any: [/^\s*PRINTFORMW 「魔界的動植物和文化、魔法……全都是我还不懂的东西呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '163',
        any: [/^\s*PRINTFORMW 进入房间的%SAVESTR:TARGET%正专心致志地在笔记本上写着什么\s*$/m],
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
        any: [/^\s*PRINTFORMW 「根据%SELF_CALL\(TARGET\)%的計算、即使是你的力量也无法让%SELF_CALL\(TARGET\)%屈服哦」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '247',
        any: [/^\s*PRINTFORMW 「根据%SELF_CALL\(TARGET\)%的計算、即使是你的力量也无法让%SELF_CALL\(TARGET\)%屈服哦」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「噫、好卑鄙……居然这样对待%SELF_CALL\(TARGET\)%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '259',
        any: [/^\s*PRINTFORMW 「噫、好卑鄙……居然这样对待%SELF_CALL\(TARGET\)%……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '260-262',
        any: [/^\s*;屈服刻印Lv3＋爱[/]淫乱無し\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '263-265',
        any: [/^\s*ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '264-265',
        any: [/^\s*PRINTFORMW 「我知道了、就按你说的做……是%SELF_CALL\(TARGET\)%输了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '265',
        any: [/^\s*PRINTFORMW 「我知道了、就按你说的做……是%SELF_CALL\(TARGET\)%输了」\s*$/m],
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
        any: [/^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$/m],
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
        any: [/^\s*PRINTFORMW 「再多多开发%SELF_CALL\(TARGET\)%的身体嘛、还完全不够呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '276-277',
        any: [/^\s*PRINTFORMW 「今天也被開発了一番呢、好开心啊、真想再提升一下敏感度呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '277',
        any: [/^\s*PRINTFORMW 「今天也被開発了一番呢、好开心啊、真想再提升一下敏感度呢」\s*$/m],
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
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%像狗一样伸出舌头，吐出慌乱的吐息迎接了出来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '282-283',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '283',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m],
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
        any: [/^\s*;ランダムで口上が変化する（使わない場合はすべて同じにすればよい）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '291',
        any: [/^\s*IF RAND:3 == 0\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '292',
        any: [/^\s*PRINTFORMW 「呵呵、你来了啊……正好是我研究的有些疲劳的时候呢」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「啊、已经到休憩的時間了？　饶了我吧……和你做对手的话不是反而会更累吗」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '296',
        any: [/^\s*PRINTFORMW 「啊、已经到休憩的時間了？　饶了我吧……和你做对手的话不是反而会更累吗」\s*$/m],
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
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%轻飘飘的尾巴像摇出了残影一样摆动着迎了出来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '301-302',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '302',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%从研究中的桌子旁站了起来，迎了出来。\s*$/m],
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
        any: [/^\s*PRINTFORMW 「已经结束了吗、这种程度、在我的预料之内呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '334',
        any: [/^\s*PRINTFORMW 「已经结束了吗、这种程度、在我的预料之内呢」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「怎么这样就停了、再多多开发%SELF_CALL\(TARGET\)%淫乱的身体吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '352',
        any: [/^\s*PRINTFORMW 「怎么这样就停了、再多多开发%SELF_CALL\(TARGET\)%淫乱的身体吧」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '353',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '355',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%软绵绵的耳朵立了起来，好像很不满。\s*$/m],
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
        any: [/^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%身体的耐久极限……差不多就是这样吗、哈～哈～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '363',
        any: [/^\s*PRINTFORMW 「%SELF_CALL\(TARGET\)%身体的耐久极限……差不多就是这样吗、哈～哈～」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '364',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '366',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%像狗一样伸出舌头，混乱的喘息着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '367-368',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样倒在床上，不停地喘着粗气。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '368',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样倒在床上，不停地喘着粗气。\s*$/m],
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
        any: [/^\s*PRINTFORMW 「哎呀、研究不能继续了呢。很开心哦、与你的幽会」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '375',
        any: [/^\s*PRINTFORMW 「哎呀、研究不能继续了呢。很开心哦、与你的幽会」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '376',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '378',
        any: [/^\s*PRINTFORMW 背向这边的%SAVESTR:TARGET%软绵绵的尾巴呼噜呼噜的左右摇动着。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '379-380',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '380',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m],
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
        any: [/^\s*PRINTFORMW 「果然、这种程度的体力消耗、是对研究的一大障碍呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '386',
        any: [/^\s*PRINTFORMW 「果然、这种程度的体力消耗、是对研究的一大障碍呢……」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '387',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '389',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%打了一个哈欠、用像狗一样团起来的姿势打起了瞌睡。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '390-391',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '391',
        any: [/^\s*PRINTFORMW %SAVESTR:TARGET%就那样以调教中的姿势回到了研究中的桌子旁，继续开始了工作。\s*$/m],
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
        any: [/^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '402-426',
        any: [/^\s*;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）\s*$/m],
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
        any: [/^\s*PRINTFORMW 「你知道这个理论吗？　一开始要先抚摸女性的肌肤呢」\s*$/m],
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
        any: [/^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*PRINTFORMW 「如果是像%SELF_CALL\(TARGET\)%一样活泼可爱的孩子就好啦♪」\s*$/m],
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
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*PRINTFORMW 「嗯……就这么抚摸%SELF_CALL\(TARGET\)%的头。叨着『谢谢你怀上孩子哦』」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '456-457',
        any: [/^\s*PRINTFORMW 「嗯……%SELF_CALL\(TARGET\)%好想多做做脚部按摩啊。挺着大肚子可累了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '457',
        any: [/^\s*PRINTFORMW 「嗯……%SELF_CALL\(TARGET\)%好想多做做脚部按摩啊。挺着大肚子可累了」\s*$/m],
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
        any: [/^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '462',
        any: [/^\s*PRINTFORMW 「老用这种方式来抚摸、要忍受这种待遇的……可是你的孩子啊。就不能更小心翼翼一些吗？」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '463',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '465',
        any: [/^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '470',
        any: [/^\s*PRINTFORMW 「就算怀上了你的孩子……也别想让%SELF_CALL\(TARGET\)%动心」\s*$/m],
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
        any: [/^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '478',
        any: [/^\s*PRINTFORMW 「不要再挑逗我了……明明知道单是这样子已经无法满足我了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '479',
        any: [/^\s*IF TALENT:种族 == 2\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '481',
        any: [/^\s*PRINTFORMW 「知道%SELF_CALL\(TARGET\)%感觉舒服的地方吗？　想让你抚摸喉咙呢♪」\s*$/m],
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
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的脚吧。散步有些累了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '490-491',
        any: [/^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的腰吧。在桌子边坐得有些累了」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '491',
        any: [/^\s*PRINTFORMW 「嗯……多按摩一下%SELF_CALL\(TARGET\)%的腰吧。在桌子边坐得有些累了」\s*$/m],
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
        any: [/^\s*ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '496',
        any: [/^\s*PRINTFORMW 「只是被你的手摸着、就想向你屈服了呢……看来%SELF_CALL\(TARGET\)%的計算错误了呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '497',
        any: [/^\s*CFLAG:301 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '499',
        any: [/^\s*ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '504',
        any: [/^\s*PRINTFORMW 「这种程度全在预料之中呢。%SELF_CALL\(TARGET\)%的心是不会动摇的」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「喂、不要舔性器！　再怎么说那也是排泄器官！」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '522',
        any: [/^\s*PRINTFORMW 「喂、不要舔性器！　再怎么说那也是排泄器官！」\s*$/m],
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
        any: [/^\s*IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '538',
        any: [/^\s*PRINTFORMW 「喜欢的话就随便舔吧。%SELF_CALL\(TARGET\)%已经不会再反抗了……」\s*$/m],
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
        any: [/^\s*IF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '563',
        any: [/^\s*PRINTFORMW 「啊啊～、已经做好肛交的準備了哦！　排泄……不、已经变成性器啦♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '564',
        any: [/^\s*CFLAG:303 = 7\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '566',
        any: [/^\s*ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)\s*$/m],
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
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '571',
        any: [/^\s*PRINTFORMW 「怎么样、%SELF_CALL\(TARGET\)%的第二性器……这样一来就能肛交了呢♪」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '572',
        any: [/^\s*CFLAG:303 = 5\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '574',
        any: [/^\s*ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '575',
        any: [/^\s*PRINTFORMW 「你、能让我再湿一点吗……里面还没放松下来呢」\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '576',
        any: [/^\s*CFLAG:303 = 4\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '578',
        any: [/^\s*ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K12_知的.ERB',
        ref: '579',
        any: [/^\s*PRINTFORMW 「咕呜～、不行啊……这么湿漉漉下去的话……性器、会变成性器的啊……」\s*$/m],
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
        any: [/^\s*PRINTFORMW 「不管再怎么玩弄排泄器官、都不会有什么快感的」\s*$/m],
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
