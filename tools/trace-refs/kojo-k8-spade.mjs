// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k8-spade.mjs（issue #239）

export const FILES = [
  {
    js: 'ere/kojo/kojo-k8-spade.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '61-65',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '63',
        any: [/FLAG:108 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '64-65',
        any: [/SIF FLAG:7 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '67-69',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '69',
        any: [/FLAG:108 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '75-606',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '75-808',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '76-77',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '78-79',
        any: [/SIF TALENT:168 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '83-107',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '84',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '87',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在被%SAVESTR:PLAYER%调教之前，被魔族改造了。成为了魔族中的忍者\.\.\.魔忍了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '88',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '89',
        any: [/PRINTFORMW 「让我做这开玩笑一样的事情…咕…离我远点！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '90',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%通红的恶魔眼睛怒目而视着，感觉非常可爱。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '91',
        any: [
          /PRINTFORMW 因为变成魔族的原因，%SAVESTR:TARGET%是无法从%SAVESTR:PLAYER%身边逃开的………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '92',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '94',
        any: [/CFLAG:370 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '97',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在调教房间的床上盘腿坐着。很无聊的打着哈欠朝着一个地方看，好像在等些什么。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '98',
        any: [/PRINTFORMW 然后，把那美丽的银发拨到后面盯着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '99',
        any: [
          /PRINTFORMW 「哎呀…真想不到居然把我捉住了呢。首先把恬不知耻的你的头给割下来…然后顺便救出其他的女孩子………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '100',
        any: [/PRINTFORMW 「…啊…嗯？…使不出力气了…忍术也用不了…怎么可能！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '101',
        any: [
          /PRINTFORMW 这是理所当然的，这个调教房间为了让勇士的力量无法使用，用奇怪的法术张开了特殊的结界。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '102',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%默默的笑着把%SAVESTR:TARGET%压倒了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '103',
        any: [
          /PRINTFORMW 「在这个状态下会被做些什么我已经知道了…不过不管你干什么，我是绝对不会屈服的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '104',
        any: [/PRINTFORMW （唔…早知道这样应该接受女忍的训练的！）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '106',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '111-120',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%经%SAVESTR:PLAYER%之手改造成了魔族。成为魔族的忍者…魔忍了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '112',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%经%SAVESTR:PLAYER%之手改造成了魔族。成为魔族的忍者…魔忍了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '113',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%青色的肌肤映照着银发非常的美丽。真想就这样压倒做一些乱七八糟想做的事。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '114',
        any: [/PRINTFORMW 「咕…嗯…做了这样的事情…想要我吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '115',
        any: [/PRINTFORMW %SAVESTR:TARGET%通红的魔族眼睛哭泣着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '116',
        any: [/PRINTFORMW 变成了这么肮脏的魔族…狂王大人也会抛弃我吧…啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '117',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出了叹息、然后留下了一滴眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '119',
        any: [/CFLAG:370 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '124-149',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '126',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '127',
        any: [
          /PRINTFORMW 「啊、好久不见………不处刑我证明你觉得我还有利用价值？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '128',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被反手捆绑正坐着。%SAVESTR:TARGET%好像很习惯似的一脸平静让人看不出情绪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '129',
        any: [
          /PRINTFORMW 「难道说…看到我和狂王大人被其他的男人抱着，稍微受到了点打击吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '130',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘲笑似的歪着嘴唇、没被提问也滔滔不绝开始讲起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '131',
        any: [
          /PRINTFORMW 「啊啊、比你抱起来舒服得多了啊，果然还是被很多人一起抱更爽」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '132',
        any: [
          /PRINTFORMW 「被狂王大人抱着无数次的绝顶是到目前为止的经验中最棒的一个」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '133',
        any: [
          /PRINTFORMW 「在那个城里全身沾满了爱液和精液不停被轮奸的时候简直就像做梦…一样…呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '134',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的声音渐渐变成了哭腔、额头垂到了地板上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '135',
        any: [/PRINTFORMW 「对不起…对不起…不要把我扔掉…不要把我扔掉………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '137',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '139',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '140',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被反手捆绑正坐着。用吃了苦瓜一样的表情看着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '141',
        any: [
          /PRINTFORMW 「咕…第二次你被捉住了呢…这种屈辱已经无法忍受了…杀了我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '142',
        any: [
          /PRINTFORMW 「………什么？这次要把我调教成完全属于你的东西？…怎么会有你这样的人！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '143',
        any: [
          /PRINTFORMW 给惊讶的%SAVESTR:TARGET%看了里面有狂王痴態的水晶球，在耳边说着，%SAVESTR:TARGET%连耳朵都红了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '144',
        any: [
          /PRINTFORMW 「这、这又怎么了…我和狂王大人不管做什么…都跟你没有关系吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '145',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%默默的笑着，为了把%SAVESTR:TARGET%谁回来而将他压倒在了床上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '147',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '154-160',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '155',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '156',
        any: [/PRINTFORMW 「哼，这样的事情和那个地狱修行相比，什么也不算」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '157',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然在之前的调教中被做了屈辱的事情，不过还是一脸冷静的和%SAVESTR:PLAYER%说着话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '158',
        any: [/PRINTFORMW 「那么，接下来要做什么呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '159',
        any: [/CFLAG:201 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '162-169',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '163',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '164',
        any: [
          /PRINTFORMW 「你也给我适可而止吧，你这种这样的调教什么的对我来说就像是微风一样」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '165',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把手臂挽在一起显示着自己的从容，然而%SAVESTR:PLAYER%没有看漏她的肩膀微妙的颤抖着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '166',
        any: [/PRINTFORMW %SAVESTR:TARGET%发现你含着笑容，马上移开了视线。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '167',
        any: [/PRINTFORMW 「哼，快开始你那温吞的调教吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '168',
        any: [/CFLAG:201 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '171-180',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '172',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '173',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%在来房间的时候%SAVESTR:TARGET%一边用手擦拭眼角一边站了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '174',
        any: [
          /PRINTFORMW 「突、突然干什么啊，抱我？ 是啊…到这个地方来的理由只能是那个啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '175',
        any: [/PRINTFORMW 「随你怎么做吧，你的做法我也习惯了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '176',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%用自然的动作靠近了%SAVESTR:PLAYER%刷的转动手和头，在%SAVESTR:PLAYER%的耳边轻声说/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '177',
        any: [
          /PRINTFORMW 「呵呵呵、这么轻松被抱住也太大意了？…啊！什么啊…啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '178',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%开玩笑似得绊倒了%SAVESTR:TARGET%推倒在床上，调教开始了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '179',
        any: [/CFLAG:201 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '182-200',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '183',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '184',
        any: [
          /PRINTFORMW 「嗯啊…啊、终于来了吗…呐…快点抱我，再不被你抱的话就要变得奇怪了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '185',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%黑色湿润的瞳孔染上了淫荡的颜色。这个忍者终于忍受不住自己身体的欲望了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '186',
        any: [
          /PRINTFORMW 「胸…再摸摸…啊~啊…虽然不是特别大…嗯、非常的有感觉…啊~啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '187',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱在怀中、身体里面就那样体会着快乐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '188',
        any: [
          /PRINTFORMW 「啊…果然应该完成女忍的训练的…然后就可以跟你做更舒服的事了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '190',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%从%SAVESTR:PLAYER%的怀中离开，坐在了床上。%SAVESTR:TARGET%双腿打开，手抚摸着股間，散发着一股淫靡的感觉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '191',
        any: [/PRINTFORMW 「不过托她的福我还是处女哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '192',
        any: [
          /PRINTFORMW 「所以快点…给我你的那个东西%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '194',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%从%SAVESTR:PLAYER%的怀中离开，坐在了床上%SAVESTR:TARGET%双腿打开，手抚摸着股間，散发着一股淫靡的感觉。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '195',
        any: [
          /PRINTFORMW 「呵呵呵，真相把你的阴茎…啊啊…更多的插进我的小穴里！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '196',
        any: [/PRINTFORMW %SAVESTR:TARGET%舍弃了忍者冷静的假面，向你撒着娇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '197',
        any: [
          /PRINTFORMW 「啊啊，请把你那出色的东西赐给牝奴隷的我吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '199',
        any: [/CFLAG:201 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '202-221',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '203',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '205-221',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '206',
        any: [
          /PRINTFORMW 「啊…已经无法离开你了…更多…让我更多的舒服吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '207',
        any: [
          /PRINTFORMW 无数次的调教让%SAVESTR:TARGET%输给了自己的肉欲。%SAVESTR:TARGET%的魔族的黄色双眼中沉淀着情欲、脑袋中全是些淫乱的妄想。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '208',
        any: [/PRINTFORMW 「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '209',
        any: [
          /PRINTFORMW 「我…我想被你侵犯…啊啊…在这个青色的小穴和肛门…期待着你的精液灌注%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '210',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上慢慢的分开了双腿。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '212',
        any: [
          /PRINTFORMW 「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '213',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '214',
        any: [
          /PRINTFORMW 「所以、吶…拜托了、让可悲的母魔族变成你的东西…”魔王大人”%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '216',
        any: [
          /PRINTFORMW 「快点…来…在我的肚子里装满你的精液之前一直侵犯我%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '217',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一副快要哭出来的样子一边用手指撑开了蜜裂。爱液溢出的淫乱的香味在不断的漂浮着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '218',
        any: [
          /PRINTFORMW 「啊啊…请给母魔族奴隶的我…你那出色的东西………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '220',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '223-240',
        any: [
          /PRINTFORMW 「啊…我已经…不被你抱着…就会不正常了…呐…抱我…我和小穴都要…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '224',
        any: [
          /PRINTFORMW 「啊…我已经…不被你抱着…就会不正常了…呐…抱我…我和小穴都要…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '225',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边下流的舔着嘴唇一边撒娇的抱了过来/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '226',
        any: [/PRINTFORMW 「来爱抚我敏感的胸部…吮吸到留下吻痕吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '227',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的手划过%SAVESTR:PLAYER%的身体。好像舔着身体一样的触感让%SAVESTR:PLAYER%打了一个冷战。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '228',
        any: [
          /PRINTFORMW 「啊啊…在这个青色的小穴和肛门里…期待着你的精液灌注%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '229',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%抓着%SAVESTR:PLAYER%的手伸向了自己的蜜裂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '231',
        any: [
          /PRINTFORMW 「呐！…现在就把我的纯洁夺走…把阴茎插进来…啊啊…做了那么羞耻的事情要是还不被侵犯的话…干脆咬舌头死了算了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '232',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一副快要哭出来的样子一边被%SAVESTR:PLAYER%的手指轻抚着，爱液溢出的淫乱的香味在不断的漂浮着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '233',
        any: [
          /PRINTFORMW 「所以、吶…拜托了、让可悲的母魔族变成你的东西…”魔王大人”%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '235',
        any: [
          /PRINTFORMW 在我的肚子里装满你的精液之前一直侵犯我%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '236',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了让%SAVESTR:PLAYER%的手指插进而自己撑开了蜜裂，爱液溢出的淫乱的香味在不断的漂浮着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '237',
        any: [
          /PRINTFORMW 「啊啊…请给母魔族奴隶的我…你那出色的东西………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '239',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '242-249',
        any: [
          /PRINTFORMW 经%SAVESTR:PLAYER%之手被改造，变成了魔族的%SAVESTR:TARGET%一脸陶醉，坐在床上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '243',
        any: [
          /PRINTFORMW 经%SAVESTR:PLAYER%之手被改造，变成了魔族的%SAVESTR:TARGET%一脸陶醉，坐在床上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '244',
        any: [
          /PRINTFORMW 「我好开心、这个身体的话可以和你一直sex几小时也好…嗯、一整夜也好，几天也好都可以了。…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '245',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%站起来用紫色的舌头舔着嘴唇一边靠近。能清楚看出，那紫色的皮肤因为发情而红润。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '246',
        any: [
          /PRINTFORMW 「呐，做吧…抱我到会坏掉的程度…弄的乱七八糟的…呐？呐？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱住%SAVESTR:PLAYER%不停的亲吻着脖子祈求着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '248',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '252-271',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '253',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '254',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸神圣，单膝跪地，等待着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '255',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%快被这个气氛彻底吞没，突然%SAVESTR:TARGET%说起了话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '256',
        any: [
          /PRINTFORMW 「呐、差不多该考虑考虑怎么称呼“你”了。这样吧……主君、夫君大人、馆主大人、魔王大人」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '257',
        any: [/PRINTFORMW 「………哪个好呢？…你希望我用哪个称呼你？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '258',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一副惊讶的表情对%SAVESTR:TARGET%带着一副受不了了似的表情说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '259',
        any: [
          /PRINTFORMW 「诶~、还不明白吗…简单的说就是，我希望你成为的新主人」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '260',
        any: [/PRINTFORMW 「不相信我的话…在你想通之前继续调教我就好了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '262',
        any: [/PRINTFORMW %SAVESTR:TARGET%放松着嘴角，微微的笑了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '263',
        any: [/PRINTFORMW 「那么、作为服从你的证明，把处女也可以哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '264',
        any: [
          /PRINTFORMW 「…怎么了这个表情？…啊啊、我可是没有受过女忍的训练的，还是处女哦。所以」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '265',
        any: [/PRINTFORMW 「请温柔一点…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '267',
        any: [/PRINTFORMW 「嘛，今天就是这么打算的吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '268',
        any: [/PRINTFORMW %SAVESTR:TARGET%放松着嘴角，微微的笑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '270',
        any: [/CFLAG:201 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '273-329',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '274',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '276-297',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '278',
        any: [/PRINT 全裸的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '279',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%单膝跪地，好像是在等待着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '280',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%战战兢兢的开口了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '281',
        any: [
          /PRINTFORMW 「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '282',
        any: [
          /PRINTFORMW 一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '283',
        any: [
          /PRINTFORMW 「虽说以前被强行变成这幅身体的时候也曾怨恨过、不过现在…对你…啊啊…求你了！如果你不点头的话我马上在这里咬舌自尽！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '284',
        any: [
          /PRINTFORMW 「诶…可以么…我可以成为你的东西啊…啊啊…太好了…真的太好了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '285',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PLAYER%点着头，终于彻底安心了一样松了一口气。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '287',
        any: [/PRINTFORMW 「那么…作为我主君的证明，把我的处女拿走吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '288',
        any: [/PRINTFORMW %SAVESTR:TARGET%的紫色舌头舔着嘴唇，着灼热的吐息/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '289',
        any: [
          /PRINTFORMW 「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '290',
        any: [/PRINTFORMW 一边说着%SAVESTR:TARGET%一边可爱的吐了吐舌头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '292',
        any: [/PRINTFORMW 「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '293',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%是太兴奋了吗，紫色的舌头下流的舔着嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '294',
        any: [
          /PRINTFORMW 「我是竭尽全力做事的类型…好好期待着吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '296',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '299-320',
        any: [/SIF CFLAG:40 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '301',
        any: [/PRINT 全裸的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '302',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%单膝跪地，好像是在等待着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '303',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%战战兢兢的开口了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '304',
        any: [
          /PRINTFORMW 「我…我已经…把你认作主君了…魔王大人。所以把我当成是下属…那个…正式的…承认…一下吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '305',
        any: [
          /PRINTFORMW 一边瞟视这里一边用战战兢兢的语调说这话的，好像不是平时刚强而充满自信的那个人一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '306',
        any: [
          /PRINTFORMW 「我变成魔族之后已经…你…你的…啊啊…拜托了！如果你不答应的话我马上在这里咬舌自尽！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '307',
        any: [
          /PRINTFORMW 「诶…可以么…我成为你的…魔王大人东西真的可以么…啊啊…太好了…真的太好了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '308',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:PLAYER%点着头，终于彻底安心了一样松了一口气。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '310',
        any: [/PRINTFORMW 「那么…作为我主君的证明，把我的处女拿走吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '311',
        any: [/PRINTFORMW %SAVESTR:TARGET%的紫色舌头舔着嘴唇，着灼热的吐息/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '312',
        any: [
          /PRINTFORMW 「呵呵呵，这是我的一族的规矩啊…要为奉上处女的人献出一生………骗你的。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '313',
        any: [/PRINTFORMW 一边说着%SAVESTR:TARGET%一边可爱的吐了吐舌头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '315',
        any: [/PRINTFORMW 「啊…今天为了纪念我成为你的东西，会好好奉仕你的…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '316',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%太兴奋了吗，紫色的舌头下流的舔着嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '317',
        any: [
          /PRINTFORMW 「我是竭尽全力做事的类型…好好期待着吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '319',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '322-328',
        any: [
          /PRINTFORMW 「如果是不久之前的我的话、变成了这个样子的时候肯定会当场自裁吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '323',
        any: [
          /PRINTFORMW 「如果是不久之前的我的话、变成了这个样子的时候肯定会当场自裁吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '324',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%进行了多次的改造变成了魔族。魔族那恶魔的肌肤跟她的银发非常合适。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '325',
        any: [
          /PRINTFORMW 「啊…所以说、我成为你的下属真的好吗…魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的魔族那琥珀色的眼睛闪耀着迷人的光辉，淡淡笑了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '327',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '331-338',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '332',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '333',
        any: [/PRINTFORMW %SAVESTR:TARGET%的双眼看上去已经没有理智存在了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '334',
        any: [/PRINTFORMW 进行了过于残酷的调教、精神貌似已经崩坏了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '335',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是坏掉的玩具一样好像在呼唤着谁的名字………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '336',
        any: [/PRINTFORMW 「哈…呵…啊哈啊…啊哇、哇的大人哈哇大人在哪里」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '337',
        any: [/CFLAG:201 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '340-341',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '341',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '344-345',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '345',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '354-355',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '355',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '357-448',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '358',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '362-372',
        any: [/IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '363',
        any: [
          /PRINTFORMW 「啊…%SAVESTR:ASSI%连队长都变成了魔王大人的仆人什么的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '364',
        any: [
          /PRINTFORMW 看到被%SAVESTR:PLAYER%搂着肩膀的%SAVESTR:ASSI%，%SAVESTR:TARGET%露出了十分惊讶的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '365',
        any: [
          /PRINTFORMW 「对、对呢、魔王大人把我的%SAVESTR:ASSI%变成了自己的东西呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '366',
        any: [
          /PRINTFORMW 在嘟囔着的%SAVESTR:TARGET%面前、%SAVESTR:PLAYER%吮吸着%SAVESTR:ASSI%的嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '367',
        any: [/PRINTFORMW 『嗯~…不要…啾啾…被那个孩子看到了可不好呢…嗯♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '368',
        any: [
          /PRINTFORMW 「唔！太，太狡猾了！我明明也很想和%SAVESTR:ASSI%隊長接吻！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '369',
        any: [
          /PRINTFORMW 冲击性的告白、看来%SAVESTR:TARGET%喜欢%SAVESTR:ASSI%的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '370',
        any: [/PRINTFORMW 『嘛、嘛啊…我明明以为你一直讨厌我呢…原来是这样………』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '371',
        any: [
          /PRINTFORMW 「开始本来很讨厌的！但是渐渐的爱上队长了…啊啊！我也爱着魔王大人的呀！我该怎么做才好！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '372',
        any: [/CFLAG:202 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '374-381',
        any: [
          /PRINTFORMW 「啊…没想到连%SAVESTR:ASSI%队长也被魔王大人的阴茎攻陷了………多麽的美妙！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '375',
        any: [
          /PRINTFORMW 「啊…没想到连%SAVESTR:ASSI%队长也被魔王大人的阴茎攻陷了………多麽的美妙！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '376',
        any: [
          /PRINTFORMW 看到被%SAVESTR:PLAYER%搂着肩膀的%SAVESTR:ASSI%，%SAVESTR:TARGET%开心的笑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '377',
        any: [
          /PRINTFORMW 「和我最喜欢的%SAVESTR:ASSI%隊長一起侍奉魔王大人什么的！实在是太幸福了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '378',
        any: [/PRINTFORMW 『嘛、居然说最喜欢我了！？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '379',
        any: [
          /PRINTFORMW 「嗯、我最喜欢你了%SAVESTR:ASSI%队长%UNICODE\(0x2661\) \*1%、啊啊、比起那个不如商量一下如何侍奉魔王大人吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的告白吓到了%SAVESTR:ASSI%、但%SAVESTR:TARGET%的兴趣已经转向了如何三个人一起获得快乐了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '381',
        any: [/CFLAG:202 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '383-396',
        any: [
          /PRINTFORMW 「啊、这种事…骗人…骗人…%SAVESTR:ASSI%队长怎么可能变成了魔王的走狗…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '384',
        any: [
          /PRINTFORMW 「啊、这种事…骗人…骗人…%SAVESTR:ASSI%队长怎么可能变成了魔王的走狗…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '385',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到%SAVESTR:ASSI%服侍%SAVESTR:PLAYER%的样子，好像受到了打击。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '386',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%给%SAVESTR:ASSI%递了个眼色。然后%SAVESTR:ASSI%抱着%SAVESTR:TARGET%亲了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '387',
        any: [
          /PRINTFORMW 「啊啊！停、停下来啊…我和%SAVESTR:ASSI%队长用这种方式…唔…嗯…呜啊…啊啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '388',
        any: [
          /PRINTFORMW 『哼哼、老实的呆着吧…哼…啾啾…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '389',
        any: [
          /PRINTFORMW 那个酷酷的女忍者一边翻着白眼一边被%SAVESTR:ASSI%亲着。嘴唇分开后%SAVESTR:TARGET%空虚的瞳孔中洒下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '391-395',
        any: [/IF CFLAG:TARGET:16 == -1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '392',
        any: [/CFLAG:TARGET:16 =  1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '393',
        any: [/CSTR:TARGET:4 = %SAVESTR:ASSI%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '394',
        any: [/PRINTFORMW 看来是%SAVESTR:TARGET%的初吻………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '396',
        any: [/CFLAG:202 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '402-423',
        any: [/;爱慕/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '405',
        any: [/PRINTFORMW 「啊、队、队长…对、对不起…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '406',
        any: [/PRINTFORMW 『有什么要对我道歉的？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '407',
        any: [/PRINTFORMW 「因为我对魔王大人…那个、主君…喜欢上了…所以………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '408',
        any: [/PRINTFORMW 『你还喜欢着我吗？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '409',
        any: [/PRINTFORMW 「！、是、是的、最喜欢了！最爱了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '410',
        any: [/PRINTFORMW 『所以什么问题也不会有吧？ 一起来侍奉魔王大人吧？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '411',
        any: [/PRINTFORMW 「是！是的！我会努力的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '412',
        any: [
          /PRINTFORMW 看来%SAVESTR:TARGET%和%SAVESTR:ASSI%建筑了新的关系………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '413',
        any: [/CFLAG:202 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '416',
        any: [
          /PRINTFORMW 「啊哈、队长…和我接吻吧…接吻%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '417',
        any: [
          /PRINTFORMW 『被魔王调教了以后、变得特别可爱呢、%SAVESTR:TARGET%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '418',
        any: [
          /PRINTFORMW 看着沉溺于淫蕩的%SAVESTR:TARGET%样子、%SAVESTR:ASSI%轻轻的笑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '419',
        any: [
          /PRINTFORMW 「队长讨厌我吗？ 我可是最喜欢队长的…所以快来接吻吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '420',
        any: [
          /PRINTFORMW 『哼哼、来这里、我和魔王大人会好好地疼爱你的%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '421',
        any: [/CFLAG:202 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '425-439',
        any: [/;爱慕/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '428',
        any: [
          /PRINTFORMW 「啊啊…魔王大人太过分了…在我眼前…和%SAVESTR:ASSI%隊長做那样的事情…呜呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '429',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:PLAYER%前正座着、在她眼前%SAVESTR:PLAYER%和%SAVESTR:ASSI%正粘粘糊糊的深吻给她看。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '430',
        any: [
          /PRINTFORMW 『嗯…嗯啾啾…你就在那里看着我们现在的样子…嗯哼…啾%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '431',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为两人的样子而焦急着、像被淫乱的火焰烘烤着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '434',
        any: [
          /PRINTFORMW 「呐%SAVESTR:ASSI%队长、和我一起做一些快乐的事情吧…呐%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '435',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%坦率的顺从着自己的欲望、一边抱着%SAVESTR:ASSI%的身体一边撒娇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '436',
        any: [/PRINTFORMW 『真是的、还真没想到你是这么喜欢撒娇的孩子呢』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '437',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%看到%SAVESTR:PLAYER%露出困惑的表情看着%SAVESTR:TARGET%轻抚着头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '441-447',
        any: [
          /PRINTFORMW 「呐、呐~…这是调教吧？是的话…就把%SAVESTR:ASSI%队长的嘴巴的第一次给我吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '442',
        any: [
          /PRINTFORMW 「呐、呐~…这是调教吧？是的话…就把%SAVESTR:ASSI%队长的嘴巴的第一次给我吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '443',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像因为冲击把之前接吻忘掉了，死皮赖脸的要求着%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '444',
        any: [/PRINTFORMW 看来%SAVESTR:TARGET%喜欢%SAVESTR:ASSI%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '445',
        any: [/PRINTFORMW 『真是没办法的孩子呢…来、把下巴抬起来』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '446',
        any: [/PRINTFORMW 「呜~…啾…接吻…喜欢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '450-524',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '451',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '456',
        any: [
          /PRINTFORMW 「啊啊、你也变成了魔王大人的下仆了啊………并没有生气。因为我也是这样啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '457',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像很开心的样子和%SAVESTR:ASSI%说着话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '458',
        any: [
          /PRINTFORMW 「和你一起的话很放心啊、接下来就好好相处吧…欸？比起那种无聊的事还是快点一起侍奉魔王大人吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '459',
        any: [
          /PRINTFORMW 『是的、我们应做的事就是作为魔王大人的下仆奉献一切啊』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '460',
        any: [
          /PRINTFORMW 「是啊、那是比什么事都重要的事情%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '461',
        any: [/CFLAG:203 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '464',
        any: [
          /PRINTFORMW 「你也经魔王大人之手变成这样了吗？啊啊、看着这个表情我就知道%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:ASSI%因为想象之外的再会开心的笑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '466',
        any: [
          /PRINTFORMW 「以后就要两个人一起为魔王大人服务了…啊啊、没想到会和你变成这样的关系♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '467',
        any: [
          /PRINTFORMW 『你也变了啊、但是现在的你看起来更棒哦%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '468',
        any: [/CFLAG:203 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '471',
        any: [/PRINTFORMW 「你也输了啊…真是的，真吃惊你是怎么当圣灵骑士的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '472',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%（完全无视自己也输了）用侮蔑的目光看着被作为助手带了过来的%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '473',
        any: [
          /PRINTFORMW 但是看到%SAVESTR:ASSI%寄宿着的淫色的眼神，“呜”的停止了一下呼吸。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '474',
        any: [
          /PRINTFORMW 「难、难道你…你变成了魔王的下仆了？快、快住手…不要摸我…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '475',
        any: [
          /PRINTFORMW 『来…一起来愉悦吧♪，没关系的，你也会在魔王大人的拥抱中感受到无上的喜悦的♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '476',
        any: [/CFLAG:203 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '484',
        any: [
          /PRINTFORMW 『阿拉阿拉、圣灵骑士的%SAVESTR:TARGET%大人变成了魔王的下仆了』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '485',
        any: [/PRINTFORMW 「这、不要说这样的话啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '486',
        any: [
          /PRINTFORMW 看着%SAVESTR:TARGET%的羞耻的姿态的%SAVESTR:ASSI%非常的愉悦。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '487',
        any: [
          /PRINTFORMW 『呵呵呵、你也成为了魔王大人的下仆的话，咱们必须要庆祝一下啊』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '488',
        any: [/PRINTFORMW 「庆祝？你到底想要做什么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '489',
        any: [
          /PRINTFORMW 『是呢、比如说作为纪念而穿环和烧印什么的、各种各样可以做的事情跟山一样多呢』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '490',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%紧紧握着%SAVESTR:TARGET%的手快乐的笑了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '491',
        any: [/CFLAG:203 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '494',
        any: [
          /PRINTFORMW 「呵呵呵、被魔王大人抱真是太棒了、接下来\\@TIME == 0 \? 今日 # 今夜\\@跟你一起sex也行啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '495',
        any: [
          /PRINTFORMW 『人类什么的真是马上就会改变的东西啊。你也变成了这么淫乱的女人、原来就算是开玩笑也不会想到呢』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '496',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%深吸了一口气、重振了精神向%SAVESTR:TARGET%提出意见。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '497',
        any: [
          /PRINTFORMW 『呐、接下来一起进行魔王大人侍奉对决怎么样？ 我融化般的奉仕会让魔王大人称赞我的%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '498',
        any: [
          /PRINTFORMW 「啊啊、很棒的意见、不过如果这么比的话我可是会获得魔王大人所有的称赞的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '499',
        any: [/CFLAG:203 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '506',
        any: [/PRINTFORMW 「我爱你们两个…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '507',
        any: [
          /PRINTFORMW 『呵呵呵、我先来帮你放松一下♪ 然后由魔王大人吧你…嗯呵呵和』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '508',
        any: [/PRINTFORMW 「啊嗯！不温柔一点的话可不行！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '509',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%和%SAVESTR:ASSI%发出了很开心的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '512',
        any: [
          /PRINTFORMW 「啊…我和%SAVESTR:ASSI%、谁的侍奉更好？答不上来的话那就继续侍奉哟…啊嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '513',
        any: [
          /PRINTFORMW 『我这边更好，是吧？不好好回答的话可是很讨厌的呢。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '514',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%与%SAVESTR:ASSI%双方合力缠绕着，爱抚%SAVESTR:PLAYER%全身………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '519',
        any: [/PRINTFORMW %SAVESTR:ASSI%舔着嘴唇推倒了%SAVESTR:TARGET%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '520',
        any: [/PRINTFORMW 「不、不行…你做这种事…啊啊！不、讨厌！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '521',
        any: [/PRINTFORMW 『你长得这么漂亮，让人受不了呢♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '522',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%SAVESTR:ASSI%的身体下方笨拙的挣扎着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '526-597',
        any: [/SIF TALENT:ASSI:121 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '529',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '534',
        any: [
          /PRINTFORMW 「你也成为魔王大人的下僕了呢…同伴增加了真是令人开心。话说回来你的身体居然是这样的、真是没想到」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '535',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着扶她阴茎勃起着的%SAVESTR:ASSI%的样子、脸颊染成了红色。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '536',
        any: [
          /PRINTFORMW 「呐、果然魔王大人看见你的身体很興奮吧？………啊啊、不，不回答也可以」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '537',
        any: [/PRINTFORMW 『呵呵呵、你实际体验一下就知道了♪』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '538',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%尴尬的摇着手。%SAVESTR:ASSI%哭笑着邀请%SAVESTR:TARGET%上床………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '539',
        any: [/CFLAG:204 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '542',
        any: [
          /PRINTFORMW 「呀、你也经魔王大人之手变成这样了呢…啊啊、你的身体居然是这样的、真是没想到」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '543',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着%SAVESTR:ASSI%的扶她阴茎勃起的样子、兴奋了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '544',
        any: [/PRINTFORMW 脸色红润、气息混乱、然后吞了吞口水说说道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '545',
        any: [
          /PRINTFORMW 「今天的对手是你啊…好吧、用你的肉棒来不停的侵犯我吧…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '546',
        any: [
          /PRINTFORMW 『你也堕落成那么下流的样子了、魔王大人的调教真是美妙啊♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '547',
        any: [/CFLAG:204 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '550',
        any: [
          /PRINTFORMW 「你成为魔王的下僕了啊、%SAVESTR:ASSI%。难道说是背叛了？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '551',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%锐利的眼光贯穿了%SAVESTR:ASSI%。%SAVESTR:ASSI%轻轻的回避着那个视线、取下了腰间的布，展示着已经完全勃起了的扶她肉棒。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '552',
        any: [
          /PRINTFORMW 「呀！？这，这什么啊、扶她！？…怎、怎么可能…今天是你把我…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '553',
        any: [
          /PRINTFORMW 『是啊、侵犯你也没关系的，魔王大人下了这样的命令%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '554',
        any: [
          /PRINTFORMW %SAVESTR:ASSI%露出了冷笑的点着头，把%SAVESTR:TARGET%推倒了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '555',
        any: [/CFLAG:204 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '563',
        any: [
          /PRINTFORMW 「呵呵呵、我也成为魔王大人的下仆了哟。听从魔王大人的是命令就是我的幸福%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '564',
        any: [/PRINTFORMW 『是么、所以是因为魔王大人的命令才抱我？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '565',
        any: [
          /PRINTFORMW 「当然不是、啊啊、在魔王大人的面前抱你什么的…会变得奇怪的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '566',
        any: [
          /PRINTFORMW 你明明还什么命令都没下，%SAVESTR:TARGET%因为想象自己抱着%SAVESTR:ASSI%而发情了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '567',
        any: [/CFLAG:204 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '570',
        any: [
          /PRINTFORMW 「嗯哼…来侵犯我的吗？好啊…侵犯我吧…把我弄的乱七八糟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '571',
        any: [
          /PRINTFORMW 『在这个情况下停止的话好像会很糟、魔王大人、怎么做呢？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '572',
        any: [
          /PRINTFORMW 看着伸展着四肢请求着的%SAVESTR:TARGET%，%SAVESTR:ASSI%叹息着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '573',
        any: [
          /PRINTFORMW 「还商量什么呢？我的小穴%UNICODE\(0x2661\) \*1% ，屁股小穴%UNICODE\(0x2661\) \*1% 都准备好了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '574',
        any: [/CFLAG:204 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '581',
        any: [
          /PRINTFORMW 「那么、今天是哪个来疼爱我呢？%SAVESTR:ASSI%？还是你？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '582',
        any: [
          /PRINTFORMW 「啊啊、干脆的两个人一起来也没关系哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '583',
        any: [/PRINTFORMW 『都说到这种程度的话、魔王大人和我两根一起插你！』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '586',
        any: [
          /PRINTFORMW 「哈啊哈啊…一想到你们两个侵犯我的话…我的胸里面就好像充满了什么东西%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '587',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为欲望和兴奋耳朵都红了、摇动着臀部诱惑着%SAVESTR:PLAYER%和%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '588',
        any: [/PRINTFORMW 『感觉真是下流啊、已经比起忍者不如说只是母猪了！』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '593',
        any: [
          /PRINTFORMW 「啊啊…没想到你还有这种兴趣…看在以前是伙伴的面上手下留情哦…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '594',
        any: [/PRINTFORMW %SAVESTR:TARGET%被无情的%SAVESTR:ASSI%推倒了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '595',
        any: [
          /PRINTFORMW 『不行、把你侵犯到屈服，这可是魔王大人的命令♪ 虽说我也很有兴趣啦』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '599-600',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '600',
        any: [/CALL K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '607-808',
        any: [/@K8_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '609-613',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '610',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '611',
        any: [/PRINTFORMW 崩坏了的%SAVESTR:TARGET%喃喃地嘀咕着什么。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '612',
        any: [/PRINTFORMW 「啊~…哈哇大人…哈哇大人~…快来…快来~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '615-619',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '616',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '617',
        any: [/PRINTFORMW 「总有一天…要让你掉进比死还要痛苦的地狱…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '618',
        any: [/PRINTFORMW %SAVESTR:TARGET%充满着怒意的眼神盯着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '622-627',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '623',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '624',
        any: [/PRINTFORMW 「接下来要开始调教了么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '625',
        any: [/PRINTFORMW 「嘛、也许能代替按摩吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '626',
        any: [/PRINTFORMW %SAVESTR:TARGET%非常轻松的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '630-635',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '631',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '632',
        any: [/PRINTFORMW 「呼哇…你的调教真是让我想打哈欠啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '633',
        any: [/PRINTFORMW 「那种程度的强度真的可以吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '634',
        any: [/PRINTFORMW 说着那样的话，%SAVESTR:TARGET%露出了微笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '638-643',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '639',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '640',
        any: [/PRINTFORMW 「嗯…被你摸着，总感觉有点发抖似的感觉………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '641',
        any: [/PRINTFORMW 「啊，别误会了、觉得冷而已」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '642',
        any: [/PRINTFORMW %SAVESTR:TARGET%把你当成笨蛋一样，哼了一声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '646-651',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '647',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '648',
        any: [/PRINTFORMW 「快、快点抱我………说过吧？只是习惯了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '649',
        any: [/PRINTFORMW 「嗯~…啊~…那么温柔…犯规了啊…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '650',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%被%SAVESTR:PLAYER%慢慢推倒到了床上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '654-731',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '655',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '657-699',
        any: [/;着衣設定無しの場合和進む/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '660-663',
        any: [/IF \(CFLAG:40 & 28\) && CFLAG:41 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '664-667',
        any: [/;PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '668-681',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '669',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '670',
        any: [
          /PRINTFORMW 「主人、\\@TIME == 0 \? 今日 # 今宵\\@的侍奉要怎么样呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '671',
        any: [
          /PRINTFORM %SAVESTR:TARGET%把裙子卷了起来露出内衣。今日的内衣的颜色是/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '672-677',
        any: [/PRINTDATA/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '678',
        any: [/PRINTW 的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '679',
        any: [
          /PRINTFORMW 被卷起来的裙子里面飘出了淫靡的气味。被你看着内衣就很兴奋的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '680',
        any: [
          /PRINTFORMW 「被你…被主人看着就好像要变的奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '683-689',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '684',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '685',
        any: [
          /PRINTFORMW 很在意短裙的%SAVESTR:TARGET%两腿之间摩擦着非常扭扭捏捏的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '686',
        any: [
          /PRINTFORMW 「啊啊、穿成这样样子等你的我的心情你明白吗？ 来、看着…啊嗯♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '687',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抓起衣服前面的部分，胸部暴露在外面。乳头好像勃起了的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '688',
        any: [
          /PRINTFORMW 「呐、拜托了、抱我%UNICODE\(0x2661\) \*1% 把我弄得乱七八糟吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '691-697',
        any: [
          /PRINTFORMW \\@TIME == 0 \? 今日 # 今夜\\@，%SAVESTR:TARGET%要穿着蓝色的兔女郎服进行侍奉的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '692',
        any: [
          /PRINTFORMW \\@TIME == 0 \? 今日 # 今夜\\@，%SAVESTR:TARGET%要穿着蓝色的兔女郎服进行侍奉的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '693',
        any: [
          /PRINTFORMW 被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '694',
        any: [
          /PRINTFORMW 「听说兔子是多产的象征哦、就是说，你想然我怀孕生下很多孩子呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '695',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%手放在床上可爱的臀部朝着你左右的晃着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '696',
        any: [
          /PRINTFORMW 「你看你看…可爱的小兔子在魔王大人的面前诱惑你哦？ 快点来抓住我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '701-730',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '703',
        any: [
          /PRINTFORMW 「啊…快点抱我…用你的阴茎让我屈服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '704',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '705',
        any: [
          /PRINTFORMW 「让我变成这样的不就是你么…来，好好负起责任吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '707',
        any: [/PRINTFORMW 「考虑过一直等待着你的侵犯的我的心情么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '708',
        any: [/PRINTFORMW 「…嘛，没考虑过吧、我知道你非常的冷淡」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '709',
        any: [
          /PRINTFORMW 「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '711',
        any: [
          /PRINTFORMW 「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '712',
        any: [/PRINTFORMW 「………诶？你说那种事情怎么样都好快点把大腿打开？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '713',
        any: [
          /PRINTFORMW 「唔嗯…现在就作为你的女奴隶满足你吧…啊啊…快点…侵犯我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '718',
        any: [
          /PRINTFORMW 「啊…快点抱我…用你的阴茎让我屈服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '719',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%看着，以前酷酷的女忍者已经完全变成了阴茎狂的淫乱魔族了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '720',
        any: [
          /PRINTFORMW 「让我变成这样的不就是你么…来，好好负起责任吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '722',
        any: [/PRINTFORMW 「考虑过一直等待着你的侵犯的我的心情么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '723',
        any: [/PRINTFORMW 「…嘛，没考虑过吧、我知道你非常的冷淡」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '724',
        any: [
          /PRINTFORMW 「但是没关系的、既然今天选择了我…啊啊…那么更多的侵犯我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '726',
        any: [
          /PRINTFORMW 「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '727',
        any: [/PRINTFORMW 「………诶？你说那种事情怎么样都好快点把大腿打开？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '728',
        any: [
          /PRINTFORMW 「唔嗯…现在就作为你的女奴满足你吧隶…啊啊…快点…侵犯我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '733-806',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '734',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '737-772',
        any: [/IF FLAG:37 != 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '739-742',
        any: [/IF \(CFLAG:40 & 28\) && CFLAG:41 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '743-746',
        any: [/;PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '747-754',
        any: [
          /PRINTFORMW 「穿、穿好了。果然女仆服什么的不太习惯啊………因为是你的命令所以没办法哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '748',
        any: [
          /PRINTFORMW 「穿、穿好了。果然女仆服什么的不太习惯啊………因为是你的命令所以没办法哟♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的女仆服有着膝下20cm的裙子，因为里面加入了钢丝，裙子被漂亮的撑了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '750',
        any: [
          /PRINTFORMW 「虽然听说女仆服是工作服，弄脏也没关系…不过太可爱了不太想弄脏呢…啊嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '751',
        any: [
          /PRINTFORMW 你抱着%SAVESTR:TARGET%说着”好啦好啦、很适合你啊”摸着她的头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '752',
        any: [
          /PRINTFORMW 「笨、笨蛋…被做这样的事的话，我快忍不住了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '753',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧的抱着你，闻着你的味道，脸在你的胸前蹭来蹭去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '756-762',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '757',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的妓女的礼服是藏青色的，衣服前面的部分细得只要稍微一动胸部就会露出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '758',
        any: [
          /PRINTFORMW 很在意短裙的%SAVESTR:TARGET%两腿之间摩擦着非常扭扭捏捏的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '759',
        any: [
          /PRINTFORMW 「这、这么猥琐的衣服让我穿着什么的…\\@TIME == 0 \? 今日 # 今夜\\@可以好好期待吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '760',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸颊染上了红晕，灼热的吐息漏了出来、看着这个样子就知道她已经发情了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '761',
        any: [
          /PRINTFORMW 「呐、看见我这样兴奋的话，就更激烈的抱我%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '764-770',
        any: [
          /PRINTFORMW  \\@TIME == 0 \? 今日 # 今夜\\@，%SAVESTR:TARGET%要穿着蓝色的兔女郎服进行侍奉的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '765',
        any: [
          /PRINTFORMW  \\@TIME == 0 \? 今日 # 今夜\\@，%SAVESTR:TARGET%要穿着蓝色的兔女郎服进行侍奉的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '766',
        any: [
          /PRINTFORMW 被细腻的网格丝袜和高跟鞋覆盖的而显得更为修长的腿部看起来比平时更美丽。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '767',
        any: [
          /PRINTFORMW 「我，我是兔子哟pyon☆…呐、呐、这样的打招呼真的不做不行吗？　因为是因为你的命令我才做的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '768',
        any: [
          /PRINTFORMW 看着非常羞耻的打招呼，整个脸都红了的%SAVESTR:TARGET%，你禁不住笑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '769',
        any: [
          /PRINTFORMW 「那么主人、给兔子想要H的命令pyon☆　果然太羞耻了，不行了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '774-805',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '776',
        any: [
          /PRINTFORMW 「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '777',
        any: [/PRINTFORMW 「………诶？你说那种事情怎么样都好快点把大腿打开？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '778',
        any: [/PRINTFORMW 「啊啊…我就这样被抱着…好开心………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '779',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%莞尔一笑、朝着%SAVESTR:PLAYER%分开了双腿………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '781',
        any: [
          /PRINTFORMW 「今天也要调教吗？我不是已经完全变成你的所有物了么」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '782',
        any: [
          /PRINTFORMW 「可以的、忍者把身体交给主君什么的很正常…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '783',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴的笑着，缠上了%SAVESTR:PLAYER%的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '785',
        any: [
          /PRINTFORMW 「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '786',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着耳朵稍稍离开了你的身体。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '787',
        any: [
          /PRINTFORMW 「呵呵呵、那么在你认真之前…还要好好奉仕你呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '792',
        any: [
          /PRINTFORMW 「你要是命令的话我什么都做哦…就连狂王的头也可以哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '793',
        any: [/PRINTFORMW 「………诶？你说那种事情怎么样都好快点把大腿打开？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '794',
        any: [/PRINTFORMW 「还不信任着我？…是吗…那还真是有点悲伤呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '795',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%稍微有点悲伤的笑着、向%SAVESTR:PLAYER%分开了双腿………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '797',
        any: [
          /PRINTFORMW 「今天也要调教吗？我不是已经完全变成你的所有物了么」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '798',
        any: [
          /PRINTFORMW 「可以的、忍者把身体交给主君什么的很正常…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '799',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴的笑着，缠上了%SAVESTR:PLAYER%的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '801',
        any: [
          /PRINTFORMW 「啊啊、我爱你呦………呜、不要露出这么害羞的表情啊、连我都觉得害羞了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '802',
        any: [/PRINTFORMW %SAVESTR:TARGET%红着耳朵稍稍离开了你的身体。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '803',
        any: [
          /PRINTFORMW 「哼哼哼、那么在你认真之前…还要好好奉仕你呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '813-886',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '814',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '816',
        any: [/SIF TALENT:168 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '820',
        any: [/SIF BASE:0 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '827-831',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '828',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '829',
        any: [/PRINTFORMW 「想要哈哇大人的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '830',
        any: [/PRINTFORMW %SAVESTR:TARGET%朝着奇怪的方向嘟囔着什么………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '833-837',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '834',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '835',
        any: [/PRINTFORMW 「………呸」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '836',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%朝着%SAVESTR:PLAYER%的方向吐了口口水………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '840-844',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '841',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '842',
        any: [/PRINTFORMW 「唔…啊啊、肩膀的僵硬稍微好点了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%说着，对着%SAVESTR:PLAYER%哼了一声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '847-851',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '848',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '849',
        any: [/PRINTFORMW 「哈啊哈啊…啊……真不舒服……咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '850',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被汗濡湿了，露出艳丽的痴态………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '854-858',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '855',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '856',
        any: [/PRINTFORMW 「哈啊哈啊…你…意外的那个…温柔呢………啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '857',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体横躺着，发出了炽热的叹息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '861-865',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '862',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '863',
        any: [/PRINTFORMW 「啊啊、还不够啊…难道是对我已经厌倦了吗………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '864',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还有余力的样子，在床上画着圈圈闹变扭………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '867-871',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '868',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '869',
        any: [
          /PRINTFORMW 「哈啊哈啊…更多…你的阴茎…啊啊…啊啊…想要%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '870',
        any: [/PRINTFORMW %SAVESTR:TARGET%筋疲力尽的躺在床上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '874-878',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '875',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '876',
        any: [/PRINTFORMW 「哈啊哈啊…明明…我的身体还可以继续让你随便弄………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '877',
        any: [/PRINTFORMW %SAVESTR:TARGET%躺在床上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '880-884',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '881',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '882',
        any: [
          /PRINTFORMW 「啊啊…在我的身体上满足了吗？那样的话真是开心啊…下一次…啊…疼爱我吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '883',
        any: [/PRINTFORMW %SAVESTR:TARGET%筋疲力尽的躺在床上………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '891-5442',
        any: [/@KOJO_MESSAGE_COM_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '892-923',
        any: [
          /;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '893-894',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '896-897',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '899-900',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '902-905',
        any: [/IF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '903',
        any: [/CALL DOG_KOJO_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '907-910',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '908',
        any: [/CALL COLOSSEUM_KOJO_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '912-913',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '915-916',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '923-968',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '925-935',
        any: [/IF CFLAG:301 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '928',
        any: [/PRINTFORMW 「呵呵呵…就像稍微强一点的按摩一样呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '929',
        any: [/PRINTFORMW 「嗯…啊…啊哈哈…好痒啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '932',
        any: [/PRINTFORMW 「真恶心…话说你有好好洗过手吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '934',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '937-967',
        any: [/;淫乱/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '939-943',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '940',
        any: [
          /PRINTFORMW 「再用力点…啊啊%UNICODE\(0x2661\) \*1%…胸…啊嗯…抓着…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '941',
        any: [
          /PRINTFORMW 「啊…欺负人…这么想挑逗我吗？ 啊…啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '942',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚着，腰部扭动了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '943',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '945-949',
        any: [
          /PRINTFORMW 「啊嗯…嗯…继续摸也可以哟…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '946',
        any: [
          /PRINTFORMW 「啊嗯…嗯…继续摸也可以哟…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '947',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚的发出了可爱的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '948',
        any: [
          /PRINTFORMW 「我的身体怎么样…啊啊…这双温柔的手…喜欢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '949',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '951-954',
        any: [/PRINTFORMW 「哈啊…啊啊…嗯…啊、好舒服…哈啊…啊啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '952',
        any: [/PRINTFORMW 「哈啊…啊啊…嗯…啊、好舒服…哈啊…啊啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '953',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚的发出了很舒服的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '954',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '956-959',
        any: [/PRINTFORMW 「哈啊哈啊…你的按摩也开始变得不错起来了…嗯…嗯~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '957',
        any: [/PRINTFORMW 「哈啊哈啊…你的按摩也开始变得不错起来了…嗯…嗯~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '958',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚的发出了忍耐着的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '959',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '961-964',
        any: [/PRINTFORMW 「摸爽了就赶快松手」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '962',
        any: [/PRINTFORMW 「摸爽了就赶快松手」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '963',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚着，但是一脸阴沉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '964',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '973-1012',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '975-985',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '978',
        any: [
          /PRINTFORMW 「呵呵呵、知道了吗？我还是处女呢…嗯…嗯…因为是处女所以兴奋了吗、啊啊…那么用力…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '979',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%开始舔着%SAVESTR:TARGET%散发着处女味道的秘裂………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '982',
        any: [/PRINTFORMW 「嗯…啊啊…你也经常舔那些别的女人吧…啊…唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '984',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '987-1011',
        any: [/;淫乱/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '989-993',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '990',
        any: [
          /PRINTFORMW 「呵呵呵、我这么美味吗？那么…嗯…热心的…啊~啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '991',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%舔着秘裂、腰淫荡的摇着，手压着%SAVESTR:PLAYER%的头部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '992',
        any: [
          /PRINTFORMW 「啊啊…不能逃哦、在我去之前…都要不停地舔…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '993',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '995-999',
        any: [/PRINTFORMW 「啊啊…多舔舔我…啊嗯…嗯…再…深点…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '996',
        any: [/PRINTFORMW 「啊啊…多舔舔我…啊嗯…嗯…再…深点…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '997',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%舔着秘裂发出了淫荡的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '998',
        any: [
          /PRINTFORMW 「嗯…嗯嗯！…你的舌头…好舒服啊…啊啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '999',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1001-1004',
        any: [
          /PRINTFORMW 「啊嗯…啊嗯…嗯…唔…啊啊！ 哈啊…啊…变得更舒服了…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1002',
        any: [
          /PRINTFORMW 「啊嗯…啊嗯…嗯…唔…啊啊！ 哈啊…啊…变得更舒服了…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1003',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸颊通红，被%SAVESTR:PLAYER%舔着秘裂，露出了喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1004',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1006-1009',
        any: [/PRINTFORMW 「唔…啊啊…唔…呜…！简直跟狗一样的舔法…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1007',
        any: [/PRINTFORMW 「唔…啊啊…唔…呜…！简直跟狗一样的舔法…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1008',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动着腰想要从%SAVESTR:PLAYER%的嘴边逃开、就那样被%SAVESTR:PLAYER%压住了腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1009',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '5446-6245',
        any: [/@DOG_KOJO_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '6250-6563',
        any: [/@KOJO_MESSAGE_PALAMCNG_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '6568-6648',
        any: [/@KOJO_MESSAGE_MARKCNG_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '6649-7072',
        any: [/@SELF_KOJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7073-7092',
        any: [/@DUNGEON_RYOUZYOKU_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7093-7145',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7146-7170',
        any: [/@DUNGEON_VICTORY_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7171-7198',
        any: [/@DUNGEON_ATTACK_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7199-7300',
        any: [/@BENKI_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7304-7446',
        any: [/@COLOSSEUM_KOJO_8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7447-7605',
        any: [/@NTR_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7606-7622',
        any: [/@EXUCUTION_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7623-7657',
        any: [/@MUSEUM_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7658-7678',
        any: [/@BANISHMENT_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7679-7693',
        any: [/@PUBLIC_EXUCUTION_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7694-7720',
        any: [/@GROTESQUE_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7721-7734',
        any: [/@ENTERENEMY_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7735-7779',
        any: [/@GOHOUBI_REQUEST_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7780-7856',
        any: [/@GOHOUBI_AFTER_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7857-7917',
        any: [/@OSIOKI_KOUJO_K8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '7918-7953',
        any: [/@GOBI_KOUJO_K8, ARG:0/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
