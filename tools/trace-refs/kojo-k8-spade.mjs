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
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1018-1069',
        any: [/IF SELECTCOM == 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1020-1029',
        any: [/IF CFLAG:303 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1022',
        any: [/PRINTFORMW 「啊…啊~啊！菊花…嗯…啊哈…好舒服…啊啊…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1023',
        any: [/PRINTFORMW %SAVESTR:TARGET%被开发了的肛门因为%SAV/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1025',
        any: [/PRINTFORMW 「啊…那、那里…很脏…呀…不、不要…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1026',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1028',
        any: [/CFLAG:TARGET:303 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1031-1068',
        any: [/P = PALAM:3 \+ UP:3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1032',
        any: [/P = PALAM:3 \+ UP:3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1034-1039',
        any: [/IF TALENT:TARGET:76 == 1 && P >= PALAMLV/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1035',
        any: [/PRINTFORMW 「啊…啊啊…再摸摸我的肛门吧%UNICODE\(0x2661/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1037',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊啊…更多…更多…侵犯我的菊花吧…啊啊…要发疯/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1038',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1039',
        any: [/CFLAG:303 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1041-1044',
        any: [/PRINTFORMW 「嗯…啊嗯…不要那么粗暴的对待我的肛门…啊…咕！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1042',
        any: [/PRINTFORMW 「嗯…啊嗯…不要那么粗暴的对待我的肛门…啊…咕！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1043',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门润滑度貌似不足。%S/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1044',
        any: [/CFLAG:303 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1046-1051',
        any: [/PRINTFORMW 「啊…啊啊…我的肛门…嗯…好舒服…啊…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1047',
        any: [/PRINTFORMW 「啊…啊啊…我的肛门…嗯…好舒服…啊…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1049',
        any: [/PRINTFORMW 「哈啊…啊啊…继续%UNICODE\(0x2661\) \*1%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1050',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1051',
        any: [/CFLAG:303 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1053-1056',
        any: [
          /PRINTFORMW 「嗯…啊啊…虽、虽然欺负我的肛门也可以…不过再稍微温柔一点/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1054',
        any: [
          /PRINTFORMW 「嗯…啊啊…虽、虽然欺负我的肛门也可以…不过再稍微温柔一点/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1055',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门润滑度貌似不足。%S/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1056',
        any: [/CFLAG:303 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1058-1061',
        any: [/PRINTFORMW 「啊啊…嗯…啊…啊…我、我的肛门…啊啊…变的奇怪了…嗯…唔/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1059',
        any: [/PRINTFORMW 「啊啊…嗯…啊…啊…我、我的肛门…啊啊…变的奇怪了…嗯…唔/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1060',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门下流的收缩着、%SA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1061',
        any: [/CFLAG:303 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1063-1066',
        any: [/PRINTFORMW 「咕…呜…不、不要…啊啊…不要啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1064',
        any: [/PRINTFORMW 「咕…呜…不、不要…啊啊…不要啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1065',
        any: [/PRINTFORMW %SAVESTR:PLAYER%爱抚着%SAVESTR:T/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1066',
        any: [/CFLAG:303 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1075-1178',
        any: [/IF SELECTCOM == 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1077-1081',
        any: [/IF CFLAG:304 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1078',
        any: [/PRINTFORMW 「哈啊哈啊…啊…啊啊…嗯…哈啊哈啊…啊…嗯！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1079',
        any: [/PRINTFORMW %SAVESTR:TARGET%闭着眼睛自慰着、好像是在想/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1080',
        any: [/CFLAG:TARGET:304 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1083-1177',
        any: [/;淫乱＋处女/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1085-1089',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1086',
        any: [/PRINTFORMW 「啊…快点让我变成你的东西…啊…啊啊%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1087',
        any: [/PRINTFORMW %SAVESTR:TARGET%还没有尝过男人的秘裂发出了/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1088',
        any: [
          /PRINTFORMW 「已经那么放松了…已经准备好了哦？　快点品尝味道吧…啊…嗯/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1089',
        any: [/CFLAG:304 = 9/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1091-1106',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1094',
        any: [/PRINTFORMW 「啊啊…哈啊…啊啊…嗯…自慰好舒服…啊嗯…啊啊%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1095',
        any: [/PRINTFORMW %SAVESTR:TARGET%娇喘着继续自慰、发出着马上/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1096',
        any: [/PRINTFORMW 「哈啊哈啊…啊啊…啊啊…去…要去了…啊啊…啊啊~%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1098',
        any: [/PRINTFORMW 「我、我的…自慰…一直看着…啊啊啊请看着吧%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1099',
        any: [/PRINTFORMW %SAVESTR:TARGET%双腿分的很开诱惑着%SAV/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1100',
        any: [/PRINTFORMW 「啊啊…嗯…哈啊…啊…啊…%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1102',
        any: [/PRINTFORMW 「啊…嗯…自慰被看着…啊啊%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1103',
        any: [/PRINTFORMW %SAVESTR:TARGET%黑色的眼睛淫荡的濡湿了、沉/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1104',
        any: [/PRINTFORMW 「哈啊哈啊…啊…啊…唔…啊啊~%UNICODE\(0x266/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1106',
        any: [/CFLAG:304 = 8/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1108-1117',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1111',
        any: [/PRINTFORMW 「啊啊…比起这个…更想要你的那个…嗯…嗯嗯%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1112',
        any: [/PRINTFORMW %SAVESTR:TARGET%这么说着，但是熟练的自慰还/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1114',
        any: [/PRINTFORMW 「哈啊哈啊…啊啊…果然自慰好舒服…啊…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1115',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出着激烈的水声继续自慰着/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1117',
        any: [/CFLAG:304 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1119-1123',
        any: [/PRINTFORMW 「啊啊…不要再这样欺负我了…啊…啊啊…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1120',
        any: [/PRINTFORMW 「啊啊…不要再这样欺负我了…啊…啊啊…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1121',
        any: [/PRINTFORMW 「明明知道我还是处女，还让我做这种事情…啊啊…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1122',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸不开心的样子对着%SA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1123',
        any: [/CFLAG:304 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1125-1140',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1128',
        any: [/PRINTFORMW 「哈、啊、啊啊%UNICODE\(0x2661\) \*1% 嗯/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1129',
        any: [/PRINTFORMW %SAVESTR:TARGET%呼出了微热的吐息。有了以前/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1130',
        any: [/PRINTFORMW 「嗯…啊啊…我…我…啊啊啊…啊嗯…啊哈…啊啊%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1132',
        any: [/PRINTFORMW 「嗯…啊啊…啊…唔、啊哈、嗯%UNICODE\(0x2661/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1133',
        any: [/PRINTFORMW %SAVESTR:TARGET%手指动作渐渐激烈起来、确实/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1134',
        any: [/PRINTFORMW 「啊啊…我的H的地方…继续看吧…啊…啊啊%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1136',
        any: [/PRINTFORMW 「啊呜…被你一边看着…一边被命令自慰…居然这么舒服%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1137',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸淫荡的看着你自慰着。/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1138',
        any: [/PRINTFORMW 「啊啊…我…我…要去了…啊啊…被看着…啊…去了…啊啊啊啊%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1140',
        any: [/CFLAG:304 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1142-1151',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1145',
        any: [
          /PRINTFORMW 「嗯、虽然不想被你看到…不过是命令的话就没办法了…啊…嗯…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1146',
        any: [/PRINTFORMW %SAVESTR:TARGET%相当熟练的继续自慰着………/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1148',
        any: [/PRINTFORMW 「呜、嗯…很舒服哦…啊…啊啊…哈啊哈啊…啊…唔！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1149',
        any: [/PRINTFORMW %SAVESTR:TARGET%羞耻地笑着，继续自慰着……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1151',
        any: [/CFLAG:304 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1153-1164',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1156',
        any: [/PRINTFORMW 「啊啊…哈啊哈啊…不要看啊…啊…唔…哈、啊、啊啊嗯♪」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1157',
        any: [/PRINTFORMW %SAVESTR:TARGET%的自慰越来越激励了起来。/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1158',
        any: [/PRINTFORMW 「我、我…啊啊…啊…嗯…唔…啊啊…！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1160',
        any: [/PRINTFORMW 「我的手指…啊啊…已经…哈…啊啊…停不下来了…啊…啊嗯♪」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1161',
        any: [/PRINTFORMW 「哈啊哈啊…啊…啊…啊…唔…啊！！唔！！唔唔！………！！！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1162',
        any: [/PRINTFORMW %SAVESTR:TARGET%的自慰越来越激励了起来、听/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1164',
        any: [/CFLAG:304 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1166-1175',
        any: [
          /;ランダムで口上が変化する（使わない場合和すべて同じにすればよい）/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1169',
        any: [/PRINTFORMW 「哈…啊…嗯…嗯…哈啊哈啊…啊…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1170',
        any: [/PRINTFORMW %SAVESTR:TARGET%非常熟练的自慰着………/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1172',
        any: [/PRINTFORMW 「啊嗯…啊啊…啊…哈啊哈啊…啊、能不能不那么看着我…嗯」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1173',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边羞耻的笑着一边自慰……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1175',
        any: [/CFLAG:304 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1184-1299',
        any: [/IF SELECTCOM == 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1186-1206',
        any: [/IF CFLAG:306 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1188',
        any: [/IF TALENT:TARGET:130 == 1 && PALAM:5 > P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1191',
        any: [
          /PRINTFORMW 「好棒…！吸得更用力点…！吸出母乳来了…胸部舒服的要发狂了/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1193',
        any: [
          /PRINTFORMW 「啊啊…从我的胸部里，母乳…啊嗯…那么吸的话…啊啊…我…我/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1197-1201',
        any: [/IF TALENT:TARGET:78 == 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1198',
        any: [/PRINTFORMW 「啊…啊啊！继续…抚摸…我的胸部…嗯…哈啊…啊…啊啊%UN/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1199',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头想要爆炸了一样膨胀了/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1200',
        any: [/PRINTFORMW 「唔…呜…呜…啊啊啊%UNICODE\(0x2661\) \*1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1201',
        any: [
          /PRINTFORMW 乳房被爱撫喘息的那个身姿、已经一点都看不出以前那个酷酷的女/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1203',
        any: [
          /PRINTFORMW 「啊…嗯…嗯…啊…稍微温柔一点啊…我的胸部很敏感的…啊、没/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1206',
        any: [/CFLAG:TARGET:306 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1209-1297',
        any: [/;母乳体质/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1213-1217',
        any: [/IF TALENT:TARGET:78 == 1 && TALENT:TARGE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1214',
        any: [/PRINTFORMW 「继续吸…我的母乳吧…啊啊%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1215',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱住了正吮吸着的%SAVE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1216',
        any: [/PRINTFORMW 「唔…唔…啊…我的母乳…被吸着…矣…呀…啊…要去了%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1217',
        any: [/CFLAG:306 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1219-1223',
        any: [
          /PRINTFORMW 「啊…没想到你会吸我的母乳呢…我…啊啊…但是、这样也挺好的/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1220',
        any: [
          /PRINTFORMW 「啊…没想到你会吸我的母乳呢…我…啊啊…但是、这样也挺好的/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1221',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1222',
        any: [/PRINTFORMW 「啊…嗯…嗯…啊啊…被吸着母乳…好棒%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1223',
        any: [/CFLAG:306 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1225-1229',
        any: [/PRINTFORMW 「啊啊…继续吸没关系的…嘴不要离开乳头…啊啊…啊%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1226',
        any: [/PRINTFORMW 「啊啊…继续吸没关系的…嘴不要离开乳头…啊啊…啊%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1227',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱住了正吮吸着的%SAVE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1228',
        any: [/PRINTFORMW 「哈啊…呀…我已经…要去…要去了…啊啊%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1229',
        any: [/CFLAG:306 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1231-1235',
        any: [/PRINTFORMW 「呵呵呵…这么吸的话…给婴儿的份就不够了哦…啊啊%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1232',
        any: [/PRINTFORMW 「呵呵呵…这么吸的话…给婴儿的份就不够了哦…啊啊%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1233',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着吮吸着的%SAVES/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1234',
        any: [/PRINTFORMW 「嗯…嗯…啊啊…哈啊…好舒服…好棒…继续吸…吸吧…%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1235',
        any: [/CFLAG:306 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1237-1241',
        any: [/PRINTFORMW 「嗯…！继续吸吧…！吸着母乳…胸部好像要发狂了~~~~…啊/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1238',
        any: [/PRINTFORMW 「嗯…！继续吸吧…！吸着母乳…胸部好像要发狂了~~~~…啊/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1239',
        any: [/PRINTFORMW %SAVESTR:PLAYER%用嘴唇咬着%SAVESTR/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1240',
        any: [/PRINTFORMW 「啊啊…我…我…只是胸部被吸着就要去了…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1241',
        any: [/CFLAG:306 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1243-1247',
        any: [
          /PRINTFORMW 「啊啊…嗯…不行啊…这么吸我的母乳的话…啊啊！我…太舒服了/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1244',
        any: [
          /PRINTFORMW 「啊啊…嗯…不行啊…这么吸我的母乳的话…啊啊！我…太舒服了/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1245',
        any: [/PRINTFORMW %SAVESTR:TARGET%已经彻底勃起的乳头被%SA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1246',
        any: [/PRINTFORMW 「哈…啊…啊啊…啊…再继续的话…啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1247',
        any: [/CFLAG:306 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1249-1252',
        any: [
          /PRINTFORMW 「啊啊…从我的胸部里，母乳…啊啊…那么吸的话…啊啊…我…我/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1250',
        any: [
          /PRINTFORMW 「啊啊…从我的胸部里，母乳…啊啊…那么吸的话…啊啊…我…我/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1251',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1252',
        any: [/CFLAG:306 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1256-1260',
        any: [/IF TALENT:TARGET:78 == 1 && TALENT:TARGE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1257',
        any: [/PRINTFORMW 「啊%UNICODE\(0x2661\) \*1% 像要榨取…我/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1258',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1259',
        any: [/PRINTFORMW 「啊啊…%UNICODE\(0x2661\) \*1% 啊啊…啊/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1260',
        any: [/CFLAG:306 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1262-1266',
        any: [/PRINTFORMW 「我的胸部…啊啊…如果是你的话不管怎么样…嗯…啊啊…嗯%U/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1263',
        any: [/PRINTFORMW 「我的胸部…啊啊…如果是你的话不管怎么样…嗯…啊啊…嗯%U/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1264',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1265',
        any: [/PRINTFORMW 「啊啊…舒服得…好像要飞起来一样…啊啊…更多…%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1266',
        any: [/CFLAG:306 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1268-1272',
        any: [/PRINTFORMW 「继续揉我的胸部…啊…呀%UNICODE\(0x2661\) /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1269',
        any: [/PRINTFORMW 「继续揉我的胸部…啊…呀%UNICODE\(0x2661\) /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1270',
        any: [/PRINTFORMW %SAVESTR:TARGET%的被%SAVESTR:PL/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1271',
        any: [/PRINTFORMW 「啊啊…啊%UNICODE\(0x2661\) \*1% 嗯…好/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1272',
        any: [/CFLAG:306 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1274-1278',
        any: [
          /PRINTFORMW 「虽然我的胸部因为比较碍事所以一直都用布缠起来…啊啊…如果/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1275',
        any: [
          /PRINTFORMW 「虽然我的胸部因为比较碍事所以一直都用布缠起来…啊啊…如果/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1276',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1277',
        any: [/PRINTFORMW 「哈啊哈啊…嗯…继续…我的胸部…乳房…叫什么都好…啊啊…让/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1278',
        any: [/CFLAG:306 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1280-1284',
        any: [/PRINTFORMW 「啊…啊啊！我的…胸部…继续抚摸吧…嗯…哈…啊…%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1281',
        any: [/PRINTFORMW 「啊…啊啊！我的…胸部…继续抚摸吧…嗯…哈…啊…%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1282',
        any: [/PRINTFORMW %SAVESTR:TARGET%乳头像要爆炸一样膨胀着，只/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1283',
        any: [/PRINTFORMW 「唔………啊啊啊~~%UNICODE\(0x2661\) \*1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1284',
        any: [/CFLAG:306 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1286-1290',
        any: [/PRINTFORMW 「啊…嗯…啊啊…胸部…好舒服…我的胸部…变得奇怪了…啊啊！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1287',
        any: [/PRINTFORMW 「啊…嗯…啊啊…胸部…好舒服…我的胸部…变得奇怪了…啊啊！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1288',
        any: [/PRINTFORMW %SAVESTR:TARGET%只是被%SAVESTR:P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1289',
        any: [/PRINTFORMW 「啊！更多的…抚摸我的胸部…啊…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1290',
        any: [/CFLAG:306 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1292-1295',
        any: [
          /PRINTFORMW 「啊…嗯…嗯咕…哈啊哈啊…确实的进攻我的弱点，不愧是魔王呢/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1293',
        any: [
          /PRINTFORMW 「啊…嗯…嗯咕…哈啊哈啊…确实的进攻我的弱点，不愧是魔王呢/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1294',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1295',
        any: [/CFLAG:306 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1305-1376',
        any: [/IF SELECTCOM == 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1307-1327',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1309-1314',
        any: [/IF TALENT:TARGET:76 == 1 && ASSIPLAY == /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1310',
        any: [/PRINTFORMW 「嗯…啾…啾…嗯…%UNICODE\(0x2661\) \*1%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1311',
        any: [/PRINTFORMW %SAVESTR:TARGET%用手臂转动着%SAVEST/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1312',
        any: [/PRINTFORMW 「哈%UNICODE\(0x2661\) \*1% …啾%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1313',
        any: [
          /PRINTFORMW 「怎么样？我的初吻的味道…还不过瘾的话…要不要再来？」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1314',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔沾满唾液的嘴唇、眼睛/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1316-1320',
        any: [
          /PRINTFORMW 「嗯…哈啊…哈啊…呵呵呵、这是我的初吻哦…是什么味道啊？」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1317',
        any: [
          /PRINTFORMW 「嗯…哈啊…哈啊…呵呵呵、这是我的初吻哦…是什么味道啊？」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1318',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1319',
        any: [
          /PRINTFORMW 「很意外吧、但是是真的哦…如果无法不相信的话…嗯…嗯…啾…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1320',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%又一次和%SAVEST/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1322-1324',
        any: [/PRINTFORMW 「嗯…咕…别这样…为什么第一次是你…！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1323',
        any: [/PRINTFORMW 「嗯…咕…别这样…为什么第一次是你…！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1324',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1326',
        any: [/CFLAG:307 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1329-1348',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1331-1335',
        any: [/IF TALENT:TARGET:76 == 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1332',
        any: [/PRINTFORMW 「嗯…啾……嗯…%UNICODE\(0x2661\) \*1% /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1333',
        any: [/PRINTFORMW %SAVESTR:TARGET%用手臂转动着%SAVEST/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1334',
        any: [/PRINTFORMW 「嗯……%UNICODE\(0x2661\) \*1% …啾%U/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1335',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔沾满唾液的嘴唇、眼睛/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1337-1341',
        any: [/PRINTFORMW 「嗯…哈啊…哈啊…呵呵呵、我的嘴唇…是什么味道？」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1338',
        any: [/PRINTFORMW 「嗯…哈啊…哈啊…呵呵呵、我的嘴唇…是什么味道？」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1339',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PL/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1340',
        any: [/PRINTFORMW 「啊、不过瘾吗？ 那再来…再继续吧…呐？」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1341',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%又一次和%SAVEST/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1343-1345',
        any: [/PRINTFORMW 「嗯、呼…快…离开…唔…从我嘴里把你的………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1344',
        any: [/PRINTFORMW 「嗯、呼…快…离开…唔…从我嘴里把你的………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1345',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1347',
        any: [/CFLAG:307 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1350-1375',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1352-1356',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:307 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1353',
        any: [/PRINTFORMW 「我的嘴唇…好吃吗？…啊…那就给你更好吃的吧%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1354',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出着啪嗒啪嗒的声音和%S/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1355',
        any: [/PRINTFORMW 「嗯啾…啾…哈啊…哈啊…哇啊…啊…喜欢%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1356',
        any: [/CFLAG:307 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1358-1362',
        any: [/PRINTFORMW 「啊…嗯…继续吻我…啊…吻我…已经…嗯…啾…啾…哈啊%UN/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1359',
        any: [/PRINTFORMW 「啊…嗯…继续吻我…啊…吻我…已经…嗯…啾…啾…哈啊%UN/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1360',
        any: [/PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1361',
        any: [/PRINTFORMW 「嗯…啊…已经迷上了…和你接吻…嗯…啊…哈%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1362',
        any: [/CFLAG:307 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1364-1367',
        any: [/PRINTFORMW 「哈啊哈啊…嗯…咕…哈啊…啾…嗯啾…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1365',
        any: [/PRINTFORMW 「哈啊哈啊…嗯…咕…哈啊…啾…嗯啾…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1366',
        any: [/PRINTFORMW %SAVESTR:TARGET%接受着%SAVESTR:P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1367',
        any: [/CFLAG:307 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1369-1372',
        any: [/PRINTFORMW 「呜…呜呜…嘴唇…果然很不舒服…啊…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1370',
        any: [/PRINTFORMW 「呜…呜呜…嘴唇…果然很不舒服…啊…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1371',
        any: [/PRINTFORMW %SAVESTR:PLAYER%把%SAVESTR:TAR/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1372',
        any: [/CFLAG:307 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1381-1448',
        any: [/IF SELECTCOM == 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1383-1407',
        any: [/IF CFLAG:308 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1385-1391',
        any: [/IF TALENT:TARGET:76 == 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1386',
        any: [/PRINTFORMW 「我的小穴…看啊…啊…这个小穴随便你怎么弄哦…啊啊%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1387',
        any: [/PRINTFORMW %SAVESTR:TARGET%大大的张开自己的大腿、用手/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1388',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%对%SAVESTR:P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1389',
        any: [/PRINTFORMW 「啊啊…我的小穴…只是被看着就好有感觉%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1390',
        any: [/SIF TALENT:TARGET:0 == 1 && EXP:0 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1391',
        any: [
          /PRINTFORMW 「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1393-1398',
        any: [
          /PRINTFORMW 「啊啊…你真是好色的啊…但是如果是你的话不管做什么都没关系/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1394',
        any: [
          /PRINTFORMW 「啊啊…你真是好色的啊…但是如果是你的话不管做什么都没关系/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1395',
        any: [/PRINTFORMW %SAVESTR:TARGET%大大的张开自己的大腿、用手/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1396',
        any: [/PRINTFORMW 「继续看…继续看我的小穴吧…已经…变的黏糊糊了%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1398',
        any: [
          /PRINTFORMW 「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢……/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1400-1405',
        any: [/PRINTFORMW 「唔…屈辱啊…这个样子………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1401',
        any: [/PRINTFORMW 「唔…屈辱啊…这个样子………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1402',
        any: [/PRINTFORMW %SAVESTR:TARGET%大大的张开自己的大腿、用手/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1403',
        any: [/PRINTFORMW 「笨、笨蛋…”漂亮”是什么意思啊…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1405',
        any: [
          /PRINTFORMW 「诶、你说看见了处女膜？ 开、开什么玩笑！只打开那么一点怎/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1407',
        any: [/CFLAG:TARGET:308 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1410-1446',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1412-1419',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:308 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1413',
        any: [/PRINTFORMW 「我的小穴…你专用的小穴…%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1414',
        any: [/PRINTFORMW %SAVESTR:TARGET%大大的张开自己的大腿、用手/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1415',
        any: [/PRINTFORMW 然后对%SAVESTR:PLAYER%的视线起了反应，从蜜/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1416',
        any: [/PRINTFORMW 「这个黏糊糊%UNICODE\(0x2661\) \*1% 咕啾/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1418',
        any: [
          /PRINTFORMW 「啊啊…难道说是想看我的处女膜？ 那么…啊啊、再打开一点哦/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1419',
        any: [/CFLAG:306 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1421-1428',
        any: [/PRINTFORMW 「唔…啊啊…看着我的小穴…%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1422',
        any: [/PRINTFORMW 「唔…啊啊…看着我的小穴…%UNICODE\(0x2661\)/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1423',
        any: [/PRINTFORMW %SAVESTR:TARGET%大大的张开自己的大腿、用手/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1424',
        any: [/PRINTFORMW 然后%SAVESTR:PLAYER%为了更好地看着提了提上/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1425',
        any: [/PRINTFORMW 「继续看着我黏糊糊的小穴……啊啊%UNICODE\(0x26/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1427',
        any: [
          /PRINTFORMW 「能看我的处女膜吗？呵呵呵、我一直期待着你能把它夺走呢……/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1428',
        any: [/CFLAG:306 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1430-1436',
        any: [/PRINTFORMW 「哈啊哈啊…啊…我的那里…仔细看吧…啊啊…嗯……很漂亮吧…/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1431',
        any: [/PRINTFORMW 「哈啊哈啊…啊…我的那里…仔细看吧…啊啊…嗯……很漂亮吧…/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1432',
        any: [/PRINTFORMW %SAVESTR:TARGET%打开了自己的蜜裂、%SAV/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1433',
        any: [/PRINTFORMW 「啊…我的…啊啊…小穴…看着小穴…哈…啊啊…有感觉了♪」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1435',
        any: [/PRINTFORMW 「唔嗯…也看看我的处女膜…啊啊…！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1436',
        any: [/CFLAG:306 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1438-1444',
        any: [
          /PRINTFORMW 「哈啊…哈啊……不用继续摆这个姿势了吧？ 诶、还有5分钟？/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1439',
        any: [
          /PRINTFORMW 「哈啊…哈啊……不用继续摆这个姿势了吧？ 诶、还有5分钟？/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1440',
        any: [/PRINTFORMW %SAVESTR:TARGET%服从着%SAVESTR:P/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1441',
        any: [/PRINTFORMW 「啊、啊啊…我已经………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1443',
        any: [
          /PRINTFORMW 「我的处女膜很漂亮什么的…别说这么明显的假话…啊啊！」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1444',
        any: [/CFLAG:306 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1453-1495',
        any: [/IF SELECTCOM == 8/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1455-1467',
        any: [/IF CFLAG:TARGET:309 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1458',
        any: [/PRINTFORMW 「嗯啊…我的小穴…被你的手指…啊啊…好深…好棒%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1461',
        any: [/PRINTFORMW 「啊…啊啊…你的手指…嗯…好深…啊啊…好棒…%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1464',
        any: [
          /PRINTFORMW 「嗯…唔…你的手指…再稍微温柔一点啊…啊啊…！啊、这么深…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1466',
        any: [/CFLAG:TARGET:309 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1469-1493',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1471-1475',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:309 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1472',
        any: [/PRINTFORMW 「继续在我的女阴里搅动…啊啊%UNICODE\(0x2661/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1473',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1474',
        any: [/PRINTFORMW 「嗯…啊…小穴…小穴舒服%UNICODE\(0x2661\) /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1475',
        any: [/CFLAG:309 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1477-1481',
        any: [/PRINTFORMW 「啊啊…你…嗯…啊啊啊…我的小学里面…嗯…啊%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1478',
        any: [/PRINTFORMW 「啊啊…你…嗯…啊啊啊…我的小学里面…嗯…啊%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1479',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1480',
        any: [/PRINTFORMW 「啊…啊啊…你的手指…嗯…好深…啊…啊啊啊…好棒…%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1481',
        any: [/CFLAG:309 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1483-1486',
        any: [/PRINTFORMW 「嗯…啊…咕…啊啊——！我…这么…啊啊…啊啊——！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1484',
        any: [/PRINTFORMW 「嗯…啊…咕…啊啊——！我…这么…啊啊…啊啊——！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1485',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1486',
        any: [/PRINTFORMW 「咕…嗯…在稍微温柔…一点…啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1487',
        any: [/CFLAG:309 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1489-1490',
        any: [/PRINTFORMW 「我的…啊啊啊…那里…被这样玩弄的话…咕…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1490',
        any: [/PRINTFORMW 「我的…啊啊啊…那里…被这样玩弄的话…咕…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1491',
        any: [/CFLAG:309 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1500-1541',
        any: [/IF SELECTCOM == 9/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1502-1512',
        any: [/IF CFLAG:310 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1505',
        any: [/PRINTFORMW 「啊嗯…继续舔…我的肛门…啊啊…好舒服%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1508',
        any: [/PRINTFORMW 「啊啊…我的…我的屁股…啊…明明很脏的…啊…停下…啊啊～！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1511',
        any: [/PRINTFORMW 「嗯…嗯…啊啊…快住…快助手啊！…我的…那个地方…啊啊明明/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1513',
        any: [/CFLAG:TARGET:310 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1516-1540',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1518-1522',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:310 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1519',
        any: [/PRINTFORMW 「啊嗯…好舒服…好舒服啊%UNICODE\(0x2661\) /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1520',
        any: [/PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TAR/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1521',
        any: [/PRINTFORMW 「啊嗯…嗯…嗯啊…我的肛门…好吃吗？那就继续舔吧%UNIC/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1522',
        any: [/CFLAG:310 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1524-1527',
        any: [
          /PRINTFORMW 「不、不行啊…屁股被你…啊…这么舔的话，我…要变得奇怪了…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1525',
        any: [
          /PRINTFORMW 「不、不行啊…屁股被你…啊…这么舔的话，我…要变得奇怪了…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1526',
        any: [/PRINTFORMW %SAVESTR:PLAYER%舔着%SAVESTR:TA/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1527',
        any: [/PRINTFORMW 「啊嗯…啊啊…我的屁股…要变得奇怪了…啊啊…嗯…啊啊嗯，%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1528',
        any: [/CFLAG:310 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1530-1532',
        any: [/PRINTFORMW 「嗯…啊嗯…啊啊…嗯、啊…我、我已经…我…啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1531',
        any: [/PRINTFORMW 「嗯…啊嗯…啊啊…嗯、啊…我、我已经…我…啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1532',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边发出很害羞的声音，一边/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1533',
        any: [/CFLAG:310 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1535-1537',
        any: [
          /PRINTFORMW 「哈…嗯…嗯…不、不要再这样了…啊啊…我的屁股…啊啊快停下/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1536',
        any: [
          /PRINTFORMW 「哈…嗯…嗯…不、不要再这样了…啊啊…我的屁股…啊啊快停下/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1537',
        any: [/PRINTFORMW %SAVESTR:PLAYER%用舌头让%SAVESTR:/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1538',
        any: [/CFLAG:310 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1547-1589',
        any: [/IF SELECTCOM == 10/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1549-1560',
        any: [/IF CFLAG:TARGET:311 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1552',
        any: [/PRINTFORMW 「那是我的…敏感部位…继续…啊啊%UNICODE\(0x26/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1555',
        any: [/PRINTFORMW 「啊…嗯…啊…%UNICODE\(0x2661\) \*1% 好/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1558',
        any: [/PRINTFORMW 「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1560',
        any: [/CFLAG:TARGET:311 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1563-1588',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1565-1568',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:311 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1566',
        any: [/PRINTFORMW 「那是我的…敏感部位…继续…啊啊%UNICODE\(0x26/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1567',
        any: [/PRINTFORMW %SAVESTR:TARGET%振动宝石贴住阴蒂的刺激让她/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1568',
        any: [/PRINTFORMW 「啊啊啊,我的阴蒂%UNICODE\(0x2661\) \*1%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1569',
        any: [/CFLAG:311 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1571-1574',
        any: [/PRINTFORMW 「啊嗯…啊…啊嗯…%UNICODE\(0x2661\) \*1%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1572',
        any: [/PRINTFORMW 「啊嗯…啊…啊嗯…%UNICODE\(0x2661\) \*1%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1573',
        any: [/PRINTFORMW %SAVESTR:TARGET%敏感部分被振动宝石贴着，露/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1574',
        any: [/PRINTFORMW 「哈…哈…啊…嗯…啊嗯%UNICODE\(0x2661\) \*/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1575',
        any: [/CFLAG:311 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1577-1580',
        any: [/PRINTFORMW 「啊…嗯…这个…好舒服啊…啊嗯…啊…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1578',
        any: [/PRINTFORMW 「啊…嗯…这个…好舒服啊…啊嗯…啊…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1579',
        any: [/PRINTFORMW %SAVESTR:TARGET%振动宝石贴住阴蒂的刺激让她/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1580',
        any: [/PRINTFORMW 「但是我的阴蒂…才…才不会有什么感觉呢……哼」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1581',
        any: [/CFLAG:311 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1583-1585',
        any: [/PRINTFORMW 「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1584',
        any: [/PRINTFORMW 「嗯…这个稍微有点痒啊…啊嗯…已、已经…嗯…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1585',
        any: [/PRINTFORMW %SAVESTR:TARGET%敏感部分被振动宝石贴着而发/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1586',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1596-1654',
        any: [/IF SELECTCOM == 11 && TEQUIP:11/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1598-1624',
        any: [/IF CFLAG:TARGET:312 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1600-1610',
        any: [/IF TALENT:0 == 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1603',
        any: [
          /PRINTFORMW 「啊嗯…呜…真是毫不留情啊你…啊啊！我的第一次居然就这样给/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1606',
        any: [/PRINTFORMW 「我的…第一次…啊啊啊…竟然这么过分……咕……！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1609',
        any: [
          /PRINTFORMW 「啊啊啊…我的…我的第一次…是这种下等的蠕虫…呜…啊啊！」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1612-1622',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1615',
        any: [/PRINTFORMW 「嗯啊嗯啊…好棒…蠕虫钻入了我的阴道…啊啊啊%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1618',
        any: [/PRINTFORMW 「啊…啊啊…蠕虫在我里面…嗯…插进来了…啊嗯」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1621',
        any: [/PRINTFORMW 「嗯…这种蠕虫…根本就不可能进来吧…嗯啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1624',
        any: [/CFLAG:312 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1627-1653',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1629-1634',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:312 </],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1631',
        any: [/PRINTFORMW 「啊啊啊…小穴…我的小穴被蠕虫钻入了…啊啊啊…啊哈%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1632',
        any: [/PRINTFORMW 「再…深点…插进去…啊嗯…不要掉出来…啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1633',
        any: [/PRINTFORMW %SAVESTR:TARGET%小穴深处蠕虫的攻击，让她数/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1634',
        any: [/CFLAG:312 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1636-1641',
        any: [/SIF ABL:2 >= 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1638',
        any: [/PRINTFORMW 「啊啊啊，我的小穴…被蠕虫钻入了\.\.啊啊啊%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1639',
        any: [/PRINTFORMW 「插，插进来这么深的话…啊啊…会拔不出来的」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1640',
        any: [/PRINTFORMW %SAVESTR:TARGET%小穴被蠕虫插入着，发出了呻/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1641',
        any: [/CFLAG:312 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1643-1646',
        any: [/PRINTFORMW %SAVESTR:TARGET%蠕虫深深的插入小穴/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1644',
        any: [/PRINTFORMW %SAVESTR:TARGET%蠕虫深深的插入小穴/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1645',
        any: [
          /PRINTFORMW 「哈啊…啊啊啊…我的…我的那里…好舒服…嗯…我居然会对蠕虫/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1646',
        any: [/CFLAG:312 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1648-1651',
        any: [/PRINTFORMW 「啊啊啊…不要欺负…我那里啊……啊啊啊…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1649',
        any: [/PRINTFORMW 「啊啊啊…不要欺负…我那里啊……啊啊啊…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1650',
        any: [/PRINTFORMW %SAVESTR:TARGET%被蠕虫刺进了小穴深处………/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1651',
        any: [/CFLAG:312 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1656-1670',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1659',
        any: [/PRINTFORMW 「哈哈…蠕虫也很舒服呢…呵呵呵%UNICODE\(0x266/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1660',
        any: [/CFLAG:372 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1663',
        any: [/PRINTFORMW 「啊啊…啊啊…下次想要你的………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1664',
        any: [/CFLAG:372 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1667',
        any: [/PRINTFORMW 「啊…啊啊啊…我的那里…啊啊……」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1668',
        any: [/CFLAG:372 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1676-1718',
        any: [/IF SELECTCOM == 12/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1678-1689',
        any: [/IF CFLAG:313 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1681',
        any: [/PRINTFORMW 「啊啊，这个拷问道具让我高潮到快疯了%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1684',
        any: [
          /PRINTFORMW 「啊啊啊，被…被你做这样的事情的话，我马上就…嗯…啊%UN/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1687',
        any: [/PRINTFORMW 「啊…啊啊…这种…振动的话我…啊啊…应该有办法…嗯…咕！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1689',
        any: [/CFLAG:313 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1692-1717',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1694-1698',
        any: [/IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1695',
        any: [/PRINTFORMW 「啊啊啊…哈…哈…用那个杖把我的小穴弄坏吧…啊啊啊%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1696',
        any: [/PRINTFORMW %SAVESTR:TARGET%张开大腿，挺起腰贴到了振动/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1697',
        any: [/PRINTFORMW 「啊嗯嗯啊%UNICODE\(0x2661\) \*1% 这种振/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1698',
        any: [/CFLAG:313 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1700-1704',
        any: [/PRINTFORMW 「不，不要这样欺负我啊…啊…嗯…啊…啊啊%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1701',
        any: [/PRINTFORMW 「不，不要这样欺负我啊…啊…嗯…啊…啊啊%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1702',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸上浮现着抱怨的神情，但振/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1703',
        any: [/PRINTFORMW 「嗯…把我的…啊啊…我的小穴…弄得更舒服吧%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1704',
        any: [/CFLAG:313 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1706-1709',
        any: [/PRINTFORMW 「嗯…咕…嗯…振动…我的那里…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1707',
        any: [/PRINTFORMW 「嗯…咕…嗯…振动…我的那里…啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1708',
        any: [/PRINTFORMW %SAVESTR:TARGET%紧闭着眼睛皱着眉，抵抗着快/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1709',
        any: [/PRINTFORMW 可是那淫靡的震动却确实的不断给予着%SAVESTR:TAR/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1710',
        any: [/CFLAG:313 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1712-1714',
        any: [/PRINTFORMW 「啊啊…我的…那里…变得…要变得…奇怪了…停下…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1713',
        any: [/PRINTFORMW 「啊啊…我的…那里…变得…要变得…奇怪了…停下…啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1714',
        any: [/PRINTFORMW %SAVESTR:TARGET%振动杖的刺激让她发出悲鸣/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1715',
        any: [/CFLAG:313 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1725-1783',
        any: [/IF SELECTCOM == 13 && TEQUIP:13/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1727-1747',
        any: [/IF CFLAG:TARGET:314 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1730',
        any: [/PRINTFORMW 「啊，我的肛门…正在被蠕虫侵犯…啊啊啊…好舒服%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1731',
        any: [/PRINTFORMW 蠕虫往%SAVESTR:TARGET%的肛门里钻去……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1734',
        any: [/PRINTFORMW 「嗯…啊啊…我的肛门…嗯…嗯…被这种蠕虫钻进来…啊…啊啊—/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1735',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被蠕虫钻入而发出悲/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1739-1741',
        any: [/IF ABL:3 >= 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1740',
        any: [
          /PRINTFORMW 「呀，啊啊啊…我的肛门……啊哈啊…被蠕虫插得这么舒服什么的/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1741',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门把蠕虫吞了进去，像要/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1743',
        any: [/PRINTFORMW 「停，停下，把这么肮脏的蠕虫…放进来…啊啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1744',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被塞入蠕虫而发出痛/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1747',
        any: [/CFLAG:TARGET:314 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1750-1782',
        any: [/;淫乱＋A感覚Lv3以上/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1752-1755',
        any: [/IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 &/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1753',
        any: [/PRINTFORMW 「嗯…啊嗯%UNICODE\(0x2661\) \*1% 肛门好/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1754',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边说着淫荡的话一边在肛门/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1755',
        any: [/CFLAG:314 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1757-1759',
        any: [/PRINTFORMW 「啊啊啊！我的肛门…嗯…正在被蠕虫侵犯着…好舒服啊%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1758',
        any: [/PRINTFORMW 「啊啊啊！我的肛门…嗯…正在被蠕虫侵犯着…好舒服啊%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1759',
        any: [/PRINTFORMW 蠕虫往%SAVESTR:TARGET%的肛门里钻去……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1760',
        any: [/CFLAG:314 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1762-1764',
        any: [/PRINTFORMW 「啊嗯…啊啊…蠕虫…进来了…被我的屁眼…全部吞下去了……%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1763',
        any: [/PRINTFORMW 「啊嗯…啊啊…蠕虫…进来了…被我的屁眼…全部吞下去了……%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1764',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门太有感觉了而带着艳/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1765',
        any: [/CFLAG:314 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1767-1769',
        any: [/PRINTFORMW 「嗯…啊，我的肛门…嗯…嗯…被蠕虫插进来了…啊…啊啊——！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1768',
        any: [/PRINTFORMW 「嗯…啊，我的肛门…嗯…嗯…被蠕虫插进来了…啊…啊啊——！/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1769',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被插进了蠕虫而发出/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1770',
        any: [/CFLAG:314 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1772-1774',
        any: [
          /PRINTFORMW 「哈，啊啊啊，我的肛门…啊…啊…被蠕虫弄得什么舒服什么的…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1773',
        any: [
          /PRINTFORMW 「哈，啊啊啊，我的肛门…啊…啊…被蠕虫弄得什么舒服什么的…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1774',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门把蠕虫吞了进去，像要/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1775',
        any: [/CFLAG:314 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1777-1779',
        any: [
          /PRINTFORMW 「不、不要…好、好难受…我的屁股要变得奇怪了…啊…啊啊——/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1778',
        any: [
          /PRINTFORMW 「不、不要…好、好难受…我的屁股要变得奇怪了…啊…啊啊——/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1779',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被塞入蠕虫而发出痛/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1780',
        any: [/CFLAG:314 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1785-1803',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1788',
        any: [/PRINTFORMW 「啊啊…继续…继续…欺负我的肛门吧%UNICODE\(0x2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1789',
        any: [/CFLAG:374 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1792',
        any: [/PRINTFORMW 「啊啊啊…我的肛门…不行了……%UNICODE\(0x266/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1793',
        any: [/CFLAG:374 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1796',
        any: [/PRINTFORMW 「啊啊，肛门…啊嗯…火辣辣的」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1797',
        any: [/CFLAG:374 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1800',
        any: [/PRINTFORMW 「啊啊…我的肛门…嗯…奇怪了………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1801',
        any: [/CFLAG:374 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1810-1845',
        any: [/IF SELECTCOM == 14 && TEQUIP:14/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1812-1824',
        any: [/IF CFLAG:315 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1815',
        any: [
          /PRINTFORMW 「啊啊…这么刺激阴蒂的话…会在你面前漏出不像样的阿黑颜啊…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1818',
        any: [/PRINTFORMW 「又要这样欺负我吗？啊啊…啊…被这样夹住的话…啊啊%UNI/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1821',
        any: [
          /PRINTFORMW 「因、因为这种拷问道具而有感觉什么的…啊啊…啊…我的阴蒂…/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1822',
        any: [/PRINTFORMW 夹着%SAVESTR:TARGET%的阴蒂阴蒂夹毫不留情的/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1824',
        any: [/CFLAG:315 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1827-1844',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1829-1831',
        any: [/IF TALENT:76 == 1 && \(CFLAG:315 <= 3 \|\| /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1830',
        any: [/PRINTFORMW 「啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1% 继/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1831',
        any: [/PRINTFORMW 夹住%SAVESTR:TARGET%的阴蒂的电动阴蒂夹的刺/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1832',
        any: [/CFLAG:315 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1834-1836',
        any: [
          /PRINTFORMW 「坏，坏心眼…我明明被你触碰才最有感觉，却还用这种东西，啊/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1835',
        any: [
          /PRINTFORMW 「坏，坏心眼…我明明被你触碰才最有感觉，却还用这种东西，啊/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1836',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为电动阴蒂夹而发出甜美的/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1837',
        any: [/CFLAG:315 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1839-1841',
        any: [/PRINTFORMW 「啊啊…不要再欺负我的阴蒂了…啊…啊啊——！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1840',
        any: [/PRINTFORMW 「啊啊…不要再欺负我的阴蒂了…啊…啊啊——！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1841',
        any: [/PRINTFORMW %SAVESTR:TARGET%的双膝因为被被装上电动阴蒂/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1842',
        any: [/CFLAG:315 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1847-1861',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1850',
        any: [/PRINTFORMW 「嗯…哈…哈…啊啊…我的脑袋好像变得奇怪了………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1851',
        any: [/CFLAG:375 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1854',
        any: [/PRINTFORMW 「啊啊…我的阴蒂变得很奇怪了吗？」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1855',
        any: [/CFLAG:375 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1858',
        any: [/PRINTFORMW 「哈啊…哈啊…我…已经………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1859',
        any: [/CFLAG:375 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1868-1920',
        any: [/IF SELECTCOM == 15 && TEQUIP:15/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1870-1882',
        any: [/IF CFLAG:316 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1873',
        any: [/PRINTFORMW 「啊…乳头%UNICODE\(0x2661\) \*1% 我的乳/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1876',
        any: [/PRINTFORMW 「啊…这…这个不行的…我…我已经…啊…嗯…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1879',
        any: [/PRINTFORMW 「啊…乳头不行…这个、快点拿掉…啊…呜啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1880',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头被乳头夹轻轻夹住，%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1882',
        any: [/CFLAG:316 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1885-1919',
        any: [/;淫乱\+弄乳狂/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1887-1890',
        any: [/IF TALENT:76 == 1 && TALENT:TARGET:78 ==/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1888',
        any: [/PRINTFORMW 「啊…呼…我已经…变的奇怪了…乳头变的奇怪了%UNICOD/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1889',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头想要爆炸了似的勃起着/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1890',
        any: [/PRINTFORMW 「啊…啊啊…再这样做的话乳头要融化了%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1891',
        any: [/CFLAG:316 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1893-1895',
        any: [/PRINTFORMW 「啊…乳头好舒服%UNICODE\(0x2661\) \*1% /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1894',
        any: [/PRINTFORMW 「啊…乳头好舒服%UNICODE\(0x2661\) \*1% /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1895',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被乳头夹夹住而发出了娇/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1896',
        any: [/CFLAG:316 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1898-1901',
        any: [/PRINTFORMW 「我的乳头…啊啊%UNICODE\(0x2661\) \*1% /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1899',
        any: [/PRINTFORMW 「我的乳头…啊啊%UNICODE\(0x2661\) \*1% /],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1900',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头想要爆炸了似的勃起着/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1901',
        any: [/PRINTFORMW 「哈、哈啊…哈啊…继续…欺负乳头吧…%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1902',
        any: [/CFLAG:316 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1904-1906',
        any: [/PRINTFORMW 「啊…这…这个不行的…我…我已经…啊…嗯…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1905',
        any: [/PRINTFORMW 「啊…这…这个不行的…我…我已经…啊…嗯…呜！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1906',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被乳头夹夹住而发出了娇/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1907',
        any: [/CFLAG:316 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1909-1911',
        any: [
          /PRINTFORMW 「啊啊…我的乳头要融化了…再、再用力点…让我更舒服吧！」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1910',
        any: [
          /PRINTFORMW 「啊啊…我的乳头要融化了…再、再用力点…让我更舒服吧！」/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1911',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳头想要爆炸了似的勃起着/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1912',
        any: [/CFLAG:316 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1914-1916',
        any: [/PRINTFORMW 「嗯…啊…啊…咕…嗯…我的乳头…啊啊…太舒服了…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1915',
        any: [/PRINTFORMW 「嗯…啊…啊…咕…嗯…我的乳头…啊啊…太舒服了…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1916',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出了炽热的叹息声…………/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1917',
        any: [/CFLAG:316 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1922-1939',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1925',
        any: [/PRINTFORMW 「啊啊嗯…明明还想继续被欺负乳头吧！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1926',
        any: [/PRINTFORMW %SAVESTR:TARGET%难过的看着夹子被拿下来……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1927',
        any: [/CFLAG:376 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1930',
        any: [/PRINTFORMW 「下次希望是你的手来玩弄…但是………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1931',
        any: [/PRINTFORMW %SAVESTR:TARGET%难过的看着夹子被拿下来……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1932',
        any: [/CFLAG:376 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1935',
        any: [/PRINTFORMW 「哈啊哈啊…啊…这种东西………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1936',
        any: [/PRINTFORMW %SAVESTR:TARGET%难过的看着夹子被拿下来……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1937',
        any: [/CFLAG:376 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1946-1999',
        any: [/IF SELECTCOM == 16 && TEQUIP:16/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1948-1962',
        any: [/IF CFLAG:317 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1951',
        any: [/PRINTFORMW 「哈…哈…啊…更多的榨取我的胸部吧…%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1952',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1955',
        any: [/PRINTFORMW 「啊…嗯…啊…啊啊~%UNICODE\(0x2661\) \*1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1956',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1959',
        any: [/PRINTFORMW 「啊嗯…啊…我的胸部…那样…嗯…啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1960',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的感觉/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1962',
        any: [/CFLAG:317 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1965-1998',
        any: [/;淫乱\+弄乳狂/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1967-1970',
        any: [/IF TALENT:76 == 1 && TALENT:TARGET:78 ==/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1968',
        any: [/PRINTFORMW 「啊啊…出来了好多啊…我的胸部…啊…啊啊%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1969',
        any: [/PRINTFORMW 「真、真希望…能被这个机械一直榨取…啊…%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1970',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1971',
        any: [/CFLAG:317 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1973-1975',
        any: [/PRINTFORMW 「哈…哈…啊…更多的榨取我的胸部吧…%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1974',
        any: [/PRINTFORMW 「哈…哈…啊…更多的榨取我的胸部吧…%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1975',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1976',
        any: [/CFLAG:317 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1978-1981',
        any: [/PRINTFORMW 「我的胸部…明明不好好的给小宝宝是不行的%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1979',
        any: [/PRINTFORMW 「我的胸部…明明不好好的给小宝宝是不行的%UNICODE\(/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1980',
        any: [/PRINTFORMW 「啊啊…好舒服…舒服的快要发狂了…更多的榨取吧%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1981',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1982',
        any: [/CFLAG:317 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1984-1986',
        any: [/PRINTFORMW 「啊…嗯…啊…啊啊~%UNICODE\(0x2661\) \*1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1985',
        any: [/PRINTFORMW 「啊…嗯…啊…啊啊~%UNICODE\(0x2661\) \*1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1986',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1987',
        any: [/CFLAG:317 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1989-1991',
        any: [/PRINTFORMW 「啊嗯…啊啊…啊…啊…已、已经…我…不行！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1990',
        any: [/PRINTFORMW 「啊嗯…啊啊…啊…啊…已、已经…我…不行！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1991',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的快感/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1992',
        any: [/CFLAG:317 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1994-1996',
        any: [/PRINTFORMW 「啊啊…啊…我的胸部…那么…嗯…呀啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1995',
        any: [/PRINTFORMW 「啊啊…啊…我的胸部…那么…嗯…呀啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1996',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被榨乳器强行榨乳的感觉/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '1997',
        any: [/CFLAG:317 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2002-2016',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2005',
        any: [/PRINTFORMW 「继续…搾取胸部啊………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2006',
        any: [/CFLAG:377 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2009',
        any: [/PRINTFORMW 「哈啊哈啊…继续…吸…我的胸部啊…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2010',
        any: [/CFLAG:377 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2013',
        any: [/PRINTFORMW 「嗯…啊…继续…做啊…」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2014',
        any: [/CFLAG:377 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2077-2138',
        any: [/IF SELECTCOM == 19 && TEQUIP:19/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2079-2099',
        any: [/IF CFLAG:TARGET:320 == 0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2082',
        any: [/PRINTFORMW 「嗯…啊嗯…我的肛门…被插进去了……%UNICODE\(0x/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2083',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2086',
        any: [/PRINTFORMW 「啊…嗯…总觉得…感觉好奇怪啊…啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2087',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2091-2093',
        any: [/IF ABL:3 >= 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2092',
        any: [/PRINTFORMW 「哈啊…啊…嗯…不行啊…这样…放进去的话…啊…啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2093',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2095',
        any: [
          /PRINTFORMW 「嗯…啊啊…全部都进来了…啊，喂…难道…拔出的时候…会全部/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2096',
        any: [/PRINTFORMW 直觉不错的%SAVESTR:TARGET%开始未来感到恐惧/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2099',
        any: [/CFLAG:TARGET:320 = 1/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2102-2137',
        any: [/;淫乱＋A感覚Lv3以上/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2104-2107',
        any: [/IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 &/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2105',
        any: [/PRINTFORMW 「啊啊啊…快点…全都插进来…啊啊…啊…我的肛门…嗯…啊嗯%/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2106',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2107',
        any: [
          /PRINTFORMW 「啊…啊啊…全部放进来了吧？放进来了吧？…啊啊…尽情地拉出/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2108',
        any: [/CFLAG:320 = 7/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2110-2113',
        any: [/PRINTFORMW 「嗯…啊啊…我的肛门…啊…进来了………%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2111',
        any: [/PRINTFORMW 「嗯…啊啊…我的肛门…啊…进来了………%UNICODE\(0/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2112',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2113',
        any: [/PRINTFORMW 「嗯啊…如果被拔出来的话…我会变的奇怪的………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2114',
        any: [/CFLAG:320 = 6/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2116-2119',
        any: [/PRINTFORMW 「我的肛门…嗯…被这样插进来的话…好舒服…%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2117',
        any: [/PRINTFORMW 「我的肛门…嗯…被这样插进来的话…好舒服…%UNICODE/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2118',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2119',
        any: [
          /PRINTFORMW 「啊啊…好，好可怕…这样被你拔出的话，变得很奇怪的%UNI/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2120',
        any: [/CFLAG:320 = 5/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2122-2125',
        any: [/PRINTFORMW 「啊…嗯…感觉，好奇怪啊…啊啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2123',
        any: [/PRINTFORMW 「啊…嗯…感觉，好奇怪啊…啊啊啊」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2124',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为肛门被肛珠一粒粒的插入/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2125',
        any: [/PRINTFORMW 「啊啊…尽情…拔出来呀…啊啊………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2126',
        any: [/CFLAG:320 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2128-2130',
        any: [
          /PRINTFORMW 「快、快停下…啊啊…再继续的话…我的屁股要变得奇怪了…啊啊/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2129',
        any: [
          /PRINTFORMW 「快、快停下…啊啊…再继续的话…我的屁股要变得奇怪了…啊啊/,
        ],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2130',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门随着%SAVESTR/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2131',
        any: [/CFLAG:320 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2133-2135',
        any: [/PRINTFORMW 「啊…不要…不要这样…不要弄坏我的屁股…啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2134',
        any: [/PRINTFORMW 「啊…不要…不要这样…不要弄坏我的屁股…啊啊啊！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2135',
        any: [/PRINTFORMW %SAVESTR:TARGET%想起以前肛珠被拔出的感觉让/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2136',
        any: [/CFLAG:320 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2141-2163',
        any: [/;淫乱/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2144',
        any: [/PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% …啊…啊啊/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2145',
        any: [/PRINTFORMW %SAVESTR:TARGET%满脸陶醉的表情流着口水……/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2146',
        any: [/CFLAG:379 = 4/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2149',
        any: [/PRINTFORMW 「啊啊…我的肛门…啊啊…啊啊…好…好舒服………%UNICO/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2150',
        any: [/PRINTFORMW %SAVESTR:TARGET%满脸陶醉的神情/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2151',
        any: [/CFLAG:379 = 3/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2154',
        any: [/PRINTFORMW 「啊…啊…啊啊啊——！！屁股…我的屁股…好舒服！」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2155',
        any: [/PRINTFORMW %SAVESTR:TARGET%高高翘起的翘起屁股并发出呻/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2156',
        any: [/CFLAG:379 = 2/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2159',
        any: [/PRINTFORMW 「啊…啊啊…啊…咕…我…我的屁股…要坏掉了………」/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2160',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被一口气拔出肛珠的痛苦/],
      },

      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2161',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2169-2350',
        any: [/IF SELECTCOM == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2171-2258',
        any: [/IF CFLAG:TARGET:321 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2173-2237',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2175-2206',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2178',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2179',
        any: [
          /PRINTFORMW 「啊啊啊啊…我的魔族小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2180',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%流着口水，为了迎合%SAVESTR:PLAYER%而腰上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2181',
        any: [
          /PRINTFORMW 然后%SAVESTR:PLAYER%如%SAVESTR:TARGET%所愿，贯穿了处女膜，一口气插/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2182',
        any: [
          /PRINTFORMW 「嗯…啊…啊嗯！插到…插到最深处了…你的阴茎…啊啊啊…啊…啊啊——%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2183',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2184',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧地把阴茎插入深处并把魔力释放了出去/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2185',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体内部染上了%SAVESTR:PLAYER%的魔力/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2186',
        any: [
          /PRINTFORMW 「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2189',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是等%SAVESTR:PLAYER%等得不耐烦了似的张开自己的大/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2190',
        any: [
          /PRINTFORMW 「这是我的第一次哟…魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2191',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%抱在一起，把阴茎慢慢地插下去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2192',
        any: [
          /PRINTFORMW 「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2193',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%贯穿了%SAVESTR:TARGET%的处女膜，把阴茎插进了深处了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2194',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…没关系的…感觉你在我体内…啊…啊啊啊…有什么要来了…要来了！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2195',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%紧紧地把阴茎插入深处，慢慢的放出了魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2196',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体内部染上了%SAVESTR:PLAYER%的魔力/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2197',
        any: [
          /PRINTFORMW 「啊啊…我…真正的成为你的东西了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2200',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了强行分开%SAVESTR:TARGET%的双腿而押着她的膝盖，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2201',
        any: [
          /PRINTFORMW 「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2202',
        any: [
          /PRINTFORMW 听着%SAVESTR:TARGET%发出的哭喊声%SAVESTR:PLAYER%把她的处女膜慢慢地/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2203',
        any: [
          /PRINTFORMW 然后%SAVESTR:TARGET%的魔族的眼睛里不停流出大颗的泪珠/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2204',
        any: [
          /PRINTFORMW 「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2205',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%好好明白谁才是主人，慢慢的开/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2208-2236',
        any: [
          /分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为了展现给她看一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2211',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2212',
        any: [
          /PRINTFORMW 「啊啊啊啊…我的小穴…被你的…被魔王大人的阴茎插进来了…啊啊…再深一点%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2213',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%流着口水，为了迎合%SAVESTR:PLAYER%而腰上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2214',
        any: [
          /PRINTFORMW 然后%SAVESTR:PLAYER%如%SAVESTR:TARGET%所愿，贯穿了处女膜，一口气插/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2215',
        any: [
          /PRINTFORMW 「嗯…啊啊…啊嗯——！插到…插到深处来了…你的应尽…啊啊…啊…啊啊啊——%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2216',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛和还不知道男性的小穴被贯穿的刺激而发出了悲鸣/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2217',
        any: [
          /PRINTFORMW 「还想更多的感受…你的阴茎…继续…继续动啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2220',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是等%SAVESTR:PLAYER%等得不耐烦了似的张开自己的大/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2221',
        any: [
          /PRINTFORMW 「这是我的第一次哟…魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2222',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%抱在一起，把阴茎慢慢地插下去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2223',
        any: [
          /PRINTFORMW 「啊…啊啊…你的阴茎进来了…啊…啊啊…啊啊——！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2224',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%贯穿了%SAVESTR:TARGET%的处女膜，把阴茎插进了深处了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2225',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…没关系的…我已经习惯疼痛了…啊…继续动…让我感受你吧%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2226',
        any: [/PRINTFORMW %SAVESTR:PLAYER%听到这句话后开始慢慢的抽送/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2227',
        any: [/PRINTFORMW 「啊啊…我…好高兴…好幸福………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2230',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了强行分开%SAVESTR:TARGET%的双腿而押着她的膝盖，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2231',
        any: [
          /PRINTFORMW 「啊…啊…咕…呜啊…呼，好粗…插进来了…啊…啊啊…啊啊——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2232',
        any: [
          /PRINTFORMW 听着%SAVESTR:TARGET%发出的哭喊声%SAVESTR:PLAYER%把她的处女膜慢慢地/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2233',
        any: [/PRINTFORMW 然后%SAVESTR:TARGET%的眼睛里不停流出大颗的泪珠/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2234',
        any: [
          /PRINTFORMW 「让我受到…这样的…屈辱…啊啊…不要…不要动啊…嗯…啊…好、好疼…啊…咕…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2235',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%像是为了给%SAVESTR:TARGET%刻上痛苦一样，慢慢的开始/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2239-2256',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2242',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2243',
        any: [
          /PRINTFORMW 「啊嗯……我的小穴被你的阴茎插进来了%UNICODE\(0x2661\) \*1% 啊啊啊啊…啊——%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2244',
        any: [
          /PRINTFORMW 因为被%SAVESTR:PLAYER%的阴茎插入盗深处而她露出笑容的%SAVESTR:TARGET/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2245',
        any: [
          /PRINTFORMW 「哈啊…更多…更多地侵犯我吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2248',
        any: [
          /PRINTFORMW 「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2249',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用两条腿夹住%SAVESTR:PLAYER%的腰，紧紧地抱住他。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2250',
        any: [
          /PRINTFORMW 「啊…嗯…能感受到你我好高兴啊…啊…啊啊……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2253',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了强行分开%SAVESTR:TARGET%的双腿而押着她的膝盖，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2254',
        any: [/PRINTFORMW 「嗯…咕…嗯…这么深…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2255',
        any: [/PRINTFORMW 「嗯咕…好深…被你插的好满…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2258',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2261-2349',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2263-2294',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2265',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2266',
        any: [
          /PRINTFORMW 「啊嗯……我的小穴被你的阴茎插进来了%UNICODE\(0x2661\) \*1% 啊啊啊啊…啊——%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2267',
        any: [
          /PRINTFORMW 因为被%SAVESTR:PLAYER%的阴茎插入盗深处而她露出笑容的%SAVESTR:TARGET/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2268',
        any: [
          /PRINTFORMW 「哈啊…更多…更多地侵犯我吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2270',
        any: [
          /PRINTFORMW 「啊…啊嗯%UNICODE\(0x2661\) \*1%更多，更多的塞满我的女阴吧…嗯…啊%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2272',
        any: [
          /PRINTFORMW 「啊啊啊…更激烈点…我要坏掉了…要坏掉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2273',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用两条腿夹住%SAVESTR:PLAYER%的腰，紧紧地抱住他。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2274',
        any: [
          /PRINTFORMW 「嗯呼…到我去为止…都不会放开的…嗯…啊啊啊…嗯啊…啊啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2275',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%开始了抽送，%SAVESTR:TARGET%的腔壁摩擦着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2277',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 我的小穴~…已经记住你的形状了%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2279',
        any: [
          /PRINTFORMW 「啊啊啊…再激烈点%UNICODE\(0x2661\) \*1% 啊~…把女阴被弄得乱七八糟的…就这样记/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2282',
        any: [
          /PRINTFORMW 「啊…啊…嗯…你的拥抱太舒服了…我要变得奇怪了…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2283',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的分开双腿，%SAVESTR:PLAYER%就这样被侵犯着她。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2284',
        any: [/PRINTFORMW 口水从口中流了出来，每次插到深处都让她发出呻吟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2285',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊…继续…继续侵犯我…我要变得奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2287',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂不停的包裹着，催促%SAVESTR:PLAYER%的阴茎射精/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2288',
        any: [
          /PRINTFORMW 「啊嗯…恩…在我里面射出来…想要你的精液啊%UNICODE\(0x2661\) \*1% ……想要啊%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2290',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用脚缠着%SAVESTR:PLAYER%，发出了喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2291',
        any: [
          /PRINTFORMW 「啊嗯，啊…已经记住你阴茎的形状和味道了，继续侵犯我吧…啊——%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2294',
        any: [/CFLAG:321 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2296-2319',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2298',
        any: [
          /PRINTFORMW 「嗯…紧紧地抱住我…啊啊…更多的侵犯我的小穴吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2299',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用两条腿夹住%SAVESTR:PLAYER%的腰，紧紧地抱住他。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2300',
        any: [
          /PRINTFORMW 「啊…嗯…能感受到你我好高兴啊…啊…啊啊……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2302',
        any: [
          /PRINTFORMW 「继续…来吧…让我里面满满的都是你吧…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2304',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抓着自己的膝盖分开双腿，诱惑着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2305',
        any: [
          /PRINTFORMW 「呐…快来疼爱我吧…我的身体已经全部都是你的东西，所以不必客气哦%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2306',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%的双手互相牵着，慢慢的开始抽送/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2308',
        any: [
          /PRINTFORMW 「嗯啊…啊…啊%UNICODE\(0x2661\) \*1% 再激烈一点啊…啊啊…啊嗯…啊啊%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2310',
        any: [
          /PRINTFORMW 「啊…嗯…你…好温柔呢…啊嗯…继续照你的想法的来坐也可以…啊啊啊%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2313',
        any: [
          /PRINTFORMW 「啊…啊啊嗯…嗯…嗯…好深…你的插到深处了…啊啊…嗯啊啊嗯%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2314',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被%SAVESTR:PLAYER%蹂躏着深处的深处而露出了快要/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2315',
        any: [
          /PRINTFORMW 「再…激烈一点…把我哪里搅动得黏糊糊的吧…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2317',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% …呀啊啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2319',
        any: [/CFLAG:321 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2322-2333',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2323',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%命令%SAVESTR:TARGET%分开双腿，插入的时候像为了展现/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2324',
        any: [/PRINTFORMW 「啊啊…插进来了…你的…啊啊…啊…嗯…啊嗯…啊啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2325',
        any: [
          /PRINTFORMW 「不、不是的…我才不…啊…啊啊啊…不可能有感觉…啊…呀啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%刺入深处而发出的可爱呻吟，被%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2328',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%分开%SAVESTR:TARGET%的双腿押着膝盖，插入的时候像为/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2329',
        any: [
          /PRINTFORMW 「嗯…嗯…只是这种程度…啊嗯♪…就以为我会成为你的东西的话…啊啊♪…就大错特错了…啊嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着抽送而发出快乐的声音，小穴紧紧包裹着%SAVESTR:PLAY/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2331',
        any: [/PRINTFORMW 「啊啊…啊嗯…嗯啊啊…不行啊…这么激烈的话…啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2333',
        any: [/CFLAG:321 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2336-2339',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%命令%SAVESTR:TARGET%分开双腿，插入的时候像为了展现/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2336',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%命令%SAVESTR:TARGET%分开双腿，插入的时候像为了展现/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2337',
        any: [
          /PRINTFORMW 「啊啊…要侵犯的话就再稍微…温柔点啊…嗯…嗯…啊啊…嗯啊…啊啊啊——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2338',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%的上面不停的动着而发出了悲鸣/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2339',
        any: [/PRINTFORMW 「啊…啊啊…嗯…以、已经…啊啊…啊…啊啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2340',
        any: [/CFLAG:321 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2342-2347',
        any: [/ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2343',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了强行分开%SAVESTR:TARGET%的双腿而押着她的膝盖，/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2344',
        any: [/PRINTFORMW 「啊…啊啊…我…被侵犯了…啊啊…啊…嗯…啊，啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2345',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为%SAVESTR:PLAYER%抽送而发出呻吟/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2346',
        any: [/PRINTFORMW 「啊…哈…咕…嗯…啊啊…嗯…嗯…啊啊——！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2347',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2356-2560',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2358-2449',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2360-2429',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2362-2397',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2365',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2366',
        any: [
          /PRINTFORMW 「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2367',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎慢慢插入了%SAVESTR:TARGET%。扑哧一声%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2368',
        any: [
          /PRINTFORMW 「嗯、啊啊%UNICODE\(0x2661\) \*1% 进来了，你的太粗了…啊啊%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2369',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2370',
        any: [
          /PRINTFORMW 「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2371',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把阴茎插入最深处，缓缓的放出了魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2372',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体内部染上了%SAVESTR:PLAYER%的魔力/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2373',
        any: [
          /PRINTFORMW 「你的魔力在我体内…变热了…啊啊…嗯…啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2374',
        any: [/PRINTFORMW %SAVESTR:TARGET%舒服得张开了背后的翅膀。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2375',
        any: [/PRINTFORMW 看着她这个样子，%SAVESTR:PLAYER%慢慢开始抽送阴茎…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2378',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2379',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2380',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎慢慢插入了%SAVESTR:TARGET%。扑哧一声%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2381',
        any: [
          /PRINTFORMW 「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2382',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%把阴茎插入最深处，缓缓的放出了魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2383',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体内部染上了%SAVESTR:PLAYER%的魔力/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2384',
        any: [
          /PRINTFORMW 「你那温暖的魔力在我体内…啊…不行了，快点动起来侵犯我的里面吧…啊啊%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2385',
        any: [/PRINTFORMW %SAVESTR:TARGET%忍耐不住的发出了恳求的声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2386',
        any: [/PRINTFORMW %SAVESTR:PLAYER%默默地笑着并慢慢的用阴茎开始抽送………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2389',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%缓缓的把阴茎沉入%SAVESTR:TARGET%的阴道。%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2390',
        any: [
          /PRINTFORMW 「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2391',
        any: [
          /PRINTFORMW 听到这句话%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰一口气贯穿到最深/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2392',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2393',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛而发出了哭喊，哭喊声在%SAVESTR:PLAYER/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2394',
        any: [
          /PRINTFORMW 然后%SAVESTR:PLAYER%的阴茎释放出的魔力从%SAVESTR:TARGET%的腔内深处/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2395',
        any: [
          /PRINTFORMW 「嗯啊…啊啊…总觉…好温暖…明明是被侵犯…被凌辱…我要变得奇怪了…啊啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2396',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%好好明白谁才是主人，慢慢的开/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2399-2427',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，慢慢的把阴茎差劲了蜜裂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2401',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，慢慢的把阴茎差劲了蜜裂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2402',
        any: [
          /PRINTFORMW 「啊嗯…别那么急啦…我可是一直都在等你侵犯我啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2403',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎慢慢插入了%SAVESTR:TARGET%。扑哧一声%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2404',
        any: [
          /PRINTFORMW 「嗯、啊啊%UNICODE\(0x2661\) \*1% 进来了，你的太粗了…啊啊%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2405',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛和连最深处都被贯穿的触感而发出了娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2406',
        any: [
          /PRINTFORMW 「啊啊嗯嗯啊啊啊…啊啊嗯…快点动起来…侵犯我里面吧…啊啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2407',
        any: [/PRINTFORMW 看着她这个样子，%SAVESTR:PLAYER%慢慢开始抽送阴茎…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2408',
        any: [
          /PRINTFORMW 「嗯…啊啊…不用这么慢也…啊嗯…我…想要更激烈点啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2411',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰慢慢的插进了她的小穴。%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2412',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…没关系…把我的…我的第一次…拿走…啊啊…快、快点…%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2413',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎慢慢插入了%SAVESTR:TARGET%。扑哧一声%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2414',
        any: [
          /PRINTFORMW 「嗯…啊咕…嗯你的…全部在我里面…啊嗯…啊啊…已经习惯疼痛了，所以…动起来吧…把我变成你的东西吧！/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2415',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐不住的恳求的声音扭动着腰，虽然%SAVESTR:PLAYER%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2416',
        any: [
          /PRINTFORMW 「求你了…侵犯我吧…啊啊…我等这一天已经很久了…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2417',
        any: [/PRINTFORMW %SAVESTR:PLAYER%默默地笑着并慢慢的用阴茎开始抽送………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2418',
        any: [
          /PRINTFORMW 「嗯…啊嗯…你的快动起来…啊…啊啊…刺进来…啊嗯…啊啊…嗯…嗯…啊啊——%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2421',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%缓缓的把阴茎沉入%SAVESTR:TARGET%的小穴。%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2422',
        any: [
          /PRINTFORMW 「啊咕…不、不要做这种不上不下的事情…快点插进来把！…啊啊…嗯…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2423',
        any: [
          /PRINTFORMW 听到这句话%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰一口气贯穿到最深/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2424',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯…嗯啊…嗯…啊啊…这…么…痛什么的…啊咕…咕嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2425',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的疼痛而发出了哭喊，哭喊声在%SAVESTR:PLAYER/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2426',
        any: [
          /PRINTFORMW 「啊啊啊啊…我的…第一次就这样…嗯…还、还不要动…啊啊…不要」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2427',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了让%SAVESTR:TARGET%好好的清楚谁是主人，阴茎再次/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2431-2447',
        any: [
          /PRINTFORMW 「嗯…从我后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒啊%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2434',
        any: [
          /PRINTFORMW 「嗯…从我后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒啊%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2435',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了让%SAVESTR:PLAYER%更加容易侵犯一样，高高抬起了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2436',
        any: [
          /PRINTFORMW 「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2439',
        any: [
          /PRINTFORMW 「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2440',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面抓住双臂，就那样侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2441',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2444',
        any: [
          /PRINTFORMW 「哼…男的都喜欢从后面侵犯女人呢…嗯…咕…啊啊…不、不要…嗯…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2445',
        any: [
          /PRINTFORMW 「这么激烈…嗯…啊啊…不…不行啊…啊啊…咕痛啊…嗯…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2446',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%的后颈，腰更加激烈的动了起来…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2449',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2452-2558',
        any: [
          /PRINTFORMW 「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2454-2489',
        any: [
          /PRINTFORMW 「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2456',
        any: [
          /PRINTFORMW 「继续…继续从后面侵犯我吧…嗯啊…啊嗯…阴茎好棒…你的阴茎好棒%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2457',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了让%SAVESTR:PLAYER%更加容易侵犯一样，高高抬起了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2458',
        any: [
          /PRINTFORMW 「嗯…啊啊…这、这样…这样好舒服…更多的侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2460',
        any: [
          /PRINTFORMW 每次被%SAVESTR:PLAYER%的腰撞到，%SAVESTR:TARGET%的蜜裂都会有爱液飞/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2461',
        any: [
          /PRINTFORMW 「啊啊啊…啊嗯…啊…啊啊——%UNICODE\(0x2661\) \*1% 这样好舒服%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2462',
        any: [
          /PRINTFORMW 「往更深的地方插进去，我的小穴要坏了…要坏了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2464',
        any: [
          /PRINTFORMW 「把我的小穴弄得更加乱七八糟的%UNICODE\(0x2661\) \*1% 变成你中意的小穴吧%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2467',
        any: [
          /PRINTFORMW 「啊啊…嗯…继续…继续…侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2468',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面抓住双臂，就那样侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2469',
        any: [
          /PRINTFORMW 「用你的阴茎让我更加疯狂吧…啊啊…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2471',
        any: [
          /PRINTFORMW 每次被%SAVESTR:PLAYER%的腰撞到，%SAVESTR:TARGET%的蜜裂都会有爱液飞/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2472',
        any: [
          /PRINTFORMW 「啊啊…你的阴茎是最棒的%UNICODE\(0x2661\) \*1%不要再拔出来，一直侵犯我吧%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2473',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2475',
        any: [
          /PRINTFORMW 「嗯…啊啊…嗯啊…嗯…嗯…嗯…继续使用我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2478',
        any: [
          /PRINTFORMW 「问…我已经不行了…啊、明明已经说了不行了…啊嗯…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像受不了了，精疲力尽的趴在地板上。但是%SAVESTR:PLAY/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2481',
        any: [
          /PRINTFORMW 「啊啊…这么做的话我就要被弄坏了…被你的阴茎弄坏了…啊啊…啊…啊啊啊啊啊%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2482',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%侵犯着，发出疯了一样的娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2483',
        any: [
          /PRINTFORMW 「啊…啊啊…呀啊啊啊…小穴不行了啊啊…阴茎…阴茎继续…啊啊——%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2484',
        any: [
          /PRINTFORMW 随着蜜裂发出扑哧扑哧的声音，%SAVESTR:TARGET%的爱液在地板上的面积越来越大。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2486',
        any: [
          /PRINTFORMW 「啊…啊啊啊…阴茎在里面摩擦着…我的小穴要变得奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2487',
        any: [/PRINTFORMW %SAVESTR:TARGET%像青蛙一样张着腿，从后面被侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2490',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2492-2529',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2494',
        any: [
          /PRINTFORMW 「啊…从后面什么的…看不到你的脸好可怕…啊嗯…啊…啊啊嗯。%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面抓住双臂，就那样侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2496',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…不行…的啊…要是更激烈的话…我…就会…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2498',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的蜜裂像是不想%SAVESTR:PLAYER%的阴茎离开一/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2499',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…插到深处来吧…嗯…啊啊%UNICODE\(0x2661\) \*1% 嗯啊…已经不行了…不/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2501',
        any: [
          /PRINTFORMW 「请、请再温柔一点…啊啊…被插得这么深…好痛…啊嗯…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2502',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为蜜裂开发的还不够而发出了疲劳和痛苦的声音/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2505',
        any: [
          /PRINTFORMW 「被你从后面侵犯什么的…啊啊…好棒…你的好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从抓住腰，一次次的从后面插着，随/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2508',
        any: [
          /PRINTFORMW 「我…被侵犯的好舒服…啊啊…继续侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2509',
        any: [
          /PRINTFORMW 从后面被侵犯着露出阿黑颜的%SAVESTR:TARGET%，那个样子已经完全看不出酷酷的女忍者的影/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2510',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…嗯%UNICODE\(0x2661\) \*1% 我已经…被你抱着就变得奇怪了%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2512',
        any: [
          /PRINTFORMW 「啊啊…嗯…啊咕…虽然有点痛…但是被你侵犯的话…就没事、没问题的…啊啊%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2513',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%听到这句话更加用力插进了%SAVESTR:TARGET%的小穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2514',
        any: [/PRINTFORMW 「嗯…啊啊…坏心眼…你真是坏心眼的…啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2517',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股慢慢抽送着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2518',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…嗯…啊啊啊啊啊…%UNICODE\(0x2661\) \*1% 你的插进来了…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2520',
        any: [
          /PRINTFORMW 「啊啊…你好温柔啊…啊嗯…恩…这种程度的话…啊嗯…啊啊…是不会痛的…嗯…啊嗯%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2521',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边从蜜裂滴下爱液，一边发出了喘息声/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2522',
        any: [
          /PRINTFORMW 「嗯啊…被你这样疼爱的话…我要…变得黏糊糊的了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2524',
        any: [/PRINTFORMW 「在激烈一点…侵犯我吧…不要这么慢得让我着急啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2525',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%厚着脸皮恳求着%SAVESTR:PLAYER%。这个样子如果让她以/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2526',
        any: [
          /PRINTFORMW 「我想要你慢慢的爱…所以想要你更激烈…啊…啊啊…来了…来了啊%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2527',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1%啊啊啊%UNICODE\(0x2661\) \*1%…把我/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2530',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2533-2543',
        any: [
          /PRINTFORMW 「嗯…嗯咕…啊啊…啊…嗯…嗯…啊啊啊…不、不行…如果再激烈的话…啊啊…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2534',
        any: [
          /PRINTFORMW 「嗯…嗯咕…啊啊…啊…嗯…嗯…啊啊啊…不、不行…如果再激烈的话…啊啊…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2535',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被开发的蜜裂被侵犯着而忍不住发出了快乐的声音/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2536',
        any: [
          /PRINTFORMW 「啊嗯…恩…啊啊…不行…不行啊…这样输了的话…啊…啊啊——♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2537',
        any: [
          /PRINTFORMW 随着%SAVESTR:PLAYER%从后面一次次突刺，%SAVESTR:TARGET%发出了尖锐的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2539',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…不能有感觉…但是…啊…从背后被侵犯…我…啊啊…嗯♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2540',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%满脸不情愿的摇着头，但被开发了的蜜裂却把%SAVESTR:PLAY/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2541',
        any: [
          /PRINTFORMW 「啊啊…嗯…不行…快点拔出去…我会变得奇怪的…啊啊呀嗯啊啊啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2542',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…不能输…才不能就这样认输…嗯…啊…啊啊啊…啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2544',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2547-2549',
        any: [/PRINTFORMW 「啊啊…啊…嗯…嗯咕…咕…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2547',
        any: [/PRINTFORMW 「啊啊…啊…嗯…嗯咕…咕…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2548',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面抓着腰侵犯着。大概是作为最/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2549',
        any: [/PRINTFORMW 「我不能…就这样…输掉…嗯…嗯…咕…嗯…嗯——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2550',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2552-2555',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2553',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%按着后颈，就这样不停的侵犯着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2554',
        any: [/PRINTFORMW 「嗯咕…嗯…啊啊…咕…嗯…住、助手…啊…啊咕…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2555',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%听着%SAVESTR:TARGET%痛苦的声音，就那样很舒服的继续/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2556',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2565-2700',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2567-2591',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2569',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2571-2590',
        any: [
          /PRINTFORMW 「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2574',
        any: [
          /PRINTFORMW 「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2575',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手双脚抱住%SAVESTR:PLAYER%，自己动起了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2576',
        any: [
          /PRINTFORMW 「嗯…啊啊…阴茎好舒服…好舒服%UNICODE\(0x2661\) \*1% 啊啊…腰停不下来了…啊啊啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2577',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的摆动着腰在%SAVESTR:PLAYER%的上面跳着舞………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2580',
        any: [
          /PRINTFORMW 「啊啊…喜欢…继续抱我吧…啊啊…好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2581',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手双脚紧紧地包住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2582',
        any: [
          /PRINTFORMW 「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从下面往上插着%SAVESTR:TARGET%，%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2586',
        any: [/PRINTFORMW 「快住手…走开…不要碰我啊…嗯…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2587',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然抵抗着，但是随着%SAVESTR:PLAYER%从下往上的突刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2588',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯…嗯…啊嗯…对我做这种事…以后走着瞧…啊…啊啊啊——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2589',
        any: [
          /PRINTFORMW 不论嘴里所出多么强硬的话，%SAVESTR:TARGET%已经只能随便%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2592',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2595-2697',
        any: [
          /PRINTFORMW 「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2597-2630',
        any: [
          /PRINTFORMW 「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2599',
        any: [
          /PRINTFORMW 「啊啊嗯…现在我一人独占你的阴茎了…嗯啊…嗯…啊啊…好深%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2600',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手双脚抱住%SAVESTR:PLAYER%，自己动起了腰/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2602',
        any: [
          /PRINTFORMW 「啊啊…一想到你的阴茎插进来…我就已经忍不住了…嗯啊嗯嗯——%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2603',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下流的摆动着腰在%SAVESTR:PLAYER%的上面跳着舞………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2605',
        any: [
          /PRINTFORMW 「嗯啊…嗯…好深…你的阴茎…把我的小穴弄得乱七八糟的…啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2608',
        any: [
          /PRINTFORMW 「继续插我的小穴吧…这已经是你专用的小穴了…啊啊…啊啊——%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2609',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%牵着手，为了贪图快乐而互相扭着腰/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2611',
        any: [
          /PRINTFORMW 「嗯…嗯…腰下面要融化了%UNICODE\(0x2661\) \*1% 就这样一直粘在一起吧%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2612',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%的嘴唇重合舌头缠在一起，互相黏在/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2613',
        any: [
          /PRINTFORMW 「嗯啾…啾…嗯啾…啾%UNICODE\(0x2661\) \*1% …嗯…啊…啊啊…继续…把我…弄坏吧%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2615',
        any: [
          /PRINTFORMW 「你看…这样的话…啊嗯…我觉得会更舒服…啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2616',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抓住%SAVESTR:PLAYER%的肩膀向后仰着，阴茎不同角度的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2617',
        any: [
          /PRINTFORMW 「嗯啊…这样…好舒服…好舒服………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2620',
        any: [
          /PRINTFORMW 「啊啊啊%UNICODE\(0x2661\) \*1% 这、这么激烈的话我…啊…啊啊%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2621',
        any: [/PRINTFORMW %SAVESTR:PLAYER%抱住%SAVESTR:TARGET%的腰激烈地抽插/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2623',
        any: [
          /PRINTFORMW 「啊啊嗯…啊嗯…好棒%UNICODE\(0x2661\) \*1% 继续侵犯我的小穴…一起变得黏糊糊的吧/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2624',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%迎合着%SAVESTR:PLAYER%的动作扭着腰，贪求着更多的快/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2625',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…啊嗯…啊…继续…继续…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2627',
        any: [
          /PRINTFORMW 「啊啊…你…满满的在我里面…再、再继续的话…嗯…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2628',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为秘裂的强烈刺激而发出了悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2631',
        any: [/CFLAG:323 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2633-2667',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2635',
        any: [
          /PRINTFORMW 「啊啊…喜欢…继续抱我吧…啊啊…好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2636',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%双手双脚紧紧地包住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2637',
        any: [
          /PRINTFORMW 「嗯啊…吻我…吻着我疼爱我…继续抱我吧…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2639',
        any: [
          /PRINTFORMW 「嗯啾…啾…啊嗯…恩…啊嗯…嗯啊…我已经…不行了…要融化了…%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2640',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%离开%SAVESTR:TARGET%的嘴，唾液连起的桥在从下往上突/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2642',
        any: [
          /PRINTFORMW 「嗯…嗯啾…就…啊嗯…啊啊…继续…品尝我嘴里的味道吧…嗯…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2645',
        any: [
          /PRINTFORMW 「啊嗯…不行啊…不要动啊…和你更深的连接在一起了？感觉到了吗？…啊啊…%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2646',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这样说着，紧紧的抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2648',
        any: [
          /PRINTFORMW 「啊嗯…明明说了…不要动的…啊嗯%UNICODE\(0x2661\) \*1% 啊嗯…啊嗯%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2649',
        any: [/PRINTFORMW %SAVESTR:TARGET%连自己动着腰的事情都没有察觉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2650',
        any: [
          /PRINTFORMW 「啊啊！这是恶作剧太过分的惩罚么？啊嗯…啊啊…嗯…啊啊啊——%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2652',
        any: [
          /PRINTFORMW 「啊啊…你的全部都插进来了…我的肚子里慢慢的…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2653',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜裂紧紧的包裹着，品尝着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2656',
        any: [
          /PRINTFORMW 「啊嗯…继续抱我吧…啊啊…好幸福…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2657',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱住%SAVESTR:PLAYER%的脖子，像要撒娇那样蹭着鼻子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2659',
        any: [
          /PRINTFORMW 「啊嗯…恩…你继续侵犯我也可以…把我弄得乱七八糟的…啊嗯%UNICODE\(0x2661\) \*1% /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2660',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%慢慢地插了进去，享受着%SAVESTR:TARGET%黏糊糊的小穴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2661',
        any: [
          /PRINTFORMW 「啊嗯…好…好棒…啊啊…我…我已经…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2663',
        any: [
          /PRINTFORMW 「啊啊…你的气味%UNICODE\(0x2661\) \*1% 真好闻…啊嗯…恩…啊啊啊…%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2664',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%闻着%SAVESTR:PLAYER%气味，开始扭动起了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2665',
        any: [/PRINTFORMW 「嗯…啊嗯…你的好大…啊…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2668',
        any: [/CFLAG:323 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2671-2682',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱住腰就那样往上顶着，而无法忍受/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2672',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱住腰就那样往上顶着，而无法忍受/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2673',
        any: [
          /PRINTFORMW 「啊…啊…嗯…嗯啊…啊啊…啊啊——！不、不要…在继续虐待我了…啊嗯…恩…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2674',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%每次插一下，%SAVESTR:TARGET%已经充分开发的蜜裂都会/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2675',
        any: [/PRINTFORMW 「不不行啊…啊…嗯…啊啊…嗯…嗯啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2677',
        any: [
          /PRINTFORMW 「嗯啊…我明明被这么憎恨的人抱着…啊嗯…啊啊…嗯啊…却连咬牙忍住声音都做不到什么的…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2678',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%已经充分开发的蜜裂被轻轻突刺传来的快感让她漏出了轻轻的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2679',
        any: [
          /PRINTFORMW 「啊嗯…恩…嗯啊…啊啊…不要啊…不要让我…变的更奇怪了…啊啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2680',
        any: [
          /PRINTFORMW 听到她的话的%SAVESTR:PLAYER%抱住%SAVESTR:TARGET%的腰部更加快地抽插/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2681',
        any: [/PRINTFORMW 「啊啊！不行…不行！啊啊…嗯…嗯啊…咕啊啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2683',
        any: [/CFLAG:323 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2686-2689',
        any: [
          /PRINTFORMW 「嗯啊…！嗯…啊咕…啊啊！啊嗯…啊啊…咕…不要这么用力…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2686',
        any: [
          /PRINTFORMW 「嗯啊…！嗯…啊咕…啊啊！啊嗯…啊啊…咕…不要这么用力…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2687',
        any: [/PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%抱着腰往上刺着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2688',
        any: [
          /PRINTFORMW 「觉得我很老实…啊嗯…所以这么激烈的话…以后…以后给我走着瞧…啊…啊咕」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2689',
        any: [
          /PRINTFORMW 不论嘴里所出多么强硬的话，%SAVESTR:TARGET%已经只能随便%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2690',
        any: [/CFLAG:323 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2693-2695',
        any: [/PRINTFORMW 「给我走开…啊啊不要碰我…啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2693',
        any: [/PRINTFORMW 「给我走开…啊啊不要碰我…啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2694',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然抵抗着，但是随着%SAVESTR:PLAYER%从下往上的突刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2695',
        any: [/PRINTFORMW 「咕…嗯…不要…在插进来了…啊…啊咕…嗯嗯嗯嗯——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2696',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2705-2849',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2707-2729',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2709',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2711-2728',
        any: [
          /PRINTFORMW 「啊啊…被用这种姿势抱着，太H了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2714',
        any: [
          /PRINTFORMW 「啊啊…被用这种姿势抱着，太H了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2715',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大大的分开双腿、接受着%SAVESTR:PLAYER%的阴茎直到蜜/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2716',
        any: [
          /PRINTFORMW 「啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1% 啊嗯…阴茎好舒服…好舒服啊%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2719',
        any: [
          /PRINTFORMW 「嗯啊…继续从后面抱着我吧…嗯…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2720',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把身体靠向%SAVESTR:PLAYER%，就这样一边动着腰一边呻/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2721',
        any: [
          /PRINTFORMW 「嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2724',
        any: [/PRINTFORMW 「啊…全都进来了…啊…嗯…啊啊…啊嗯…嗯咕…咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2725',
        any: [
          /PRINTFORMW 看到%SAVESTR:TARGET%痛苦的样子，%SAVESTR:PLAYER%从后面温柔的爱抚着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2726',
        any: [
          /PRINTFORMW 「嗯啊…笨、笨蛋…被碰到这种地方的话我…啊…啊…嗯…啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2727',
        any: [
          /PRINTFORMW 听到%SAVESTR:TARGET%发出放松的声音，%SAVESTR:PLAYER%安心的开始向上/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2730',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2733-2846',
        any: [
          /PRINTFORMW 「啊啊…只是在你面前分开两腿…就有感觉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2735-2776',
        any: [
          /PRINTFORMW 「啊啊…只是在你面前分开两腿…就有感觉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2737',
        any: [
          /PRINTFORMW 「啊啊…只是在你面前分开两腿…就有感觉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2738',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大大的分开双腿、接受着%SAVESTR:PLAYER%的阴茎直到蜜/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2739',
        any: [
          /PRINTFORMW 「啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1% 啊嗯…阴茎好舒服…好舒服啊%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2741',
        any: [
          /PRINTFORMW 「啊嗯…恩…好舒服…小穴好舒服…小穴舒服的要受不了了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2742',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着口水一边上下左右的扭着腰，品味着%SAVESTR:PLAY/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2744',
        any: [/PRINTFORMW %SAVESTR:PLAYER%从后面抓住%SAVESTR:TARGET%的乳房/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2745',
        any: [
          /PRINTFORMW 「啊嗯…继续触碰我的身体吧…啊嗯…啊嗯…我的身体全部都是你的东西…啊啊%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2748',
        any: [
          /PRINTFORMW 「啊嗯…恩啊…好舒服…啊啊…被做了这么舒服的事…我的脑袋已经变得奇怪了%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面插入，身体被抚摸着，发出微微的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2751',
        any: [
          /PRINTFORMW 「让我…更舒服吧%UNICODE\(0x2661\) \*1% …继续插小穴吧…啊啊%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2752',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出了不像样的声音，一边娇艳的动起了屁股/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2753',
        any: [
          /PRINTFORMW 「啊啊嗯…已、已经忍不了了…我的小穴把你吞下去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2755',
        any: [
          /PRINTFORMW 「嗯啊…嗯…啊嗯…继续玩弄我的身体吧…嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2756',
        any: [/PRINTFORMW %SAVESTR:PLAYER%把手伸到下面搓弄着阴蒂。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2757',
        any: [/PRINTFORMW 「啊嗯！这样、这样好舒服…把我弄得乱七八糟的吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2760',
        any: [
          /PRINTFORMW 「嗯…啊啊…好深…把你的…全都插进我的小穴里…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2761',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%更用力的挺着腰，蹂躏着%SAVESTR:TARGET%的腔内/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2763',
        any: [
          /PRINTFORMW 「啊啊…我只要有小穴就好…我相当品尝你阴茎味道的小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2764',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喊着下流的词语，一边继续被%SAVESTR:PLAYER%侵犯/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2766',
        any: [/PRINTFORMW 「嗯…嗯嗯…我的小穴…要不行了…所以继续继续来吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2767',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的激烈抽插让%SAVESTR:TARGET%发出悲鸣一样的声音……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2772',
        any: [
          /PRINTFORMW 「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2773',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜子映出的自己的姿态而兴奋着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2776',
        any: [/CFLAG:324 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2778-2818',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2780',
        any: [
          /PRINTFORMW 「啊嗯…恩啊…好棒…继续触摸我的身体吧…嗯啊…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把身体靠向%SAVESTR:PLAYER%。随着%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2782',
        any: [
          /PRINTFORMW 「啊嗯…啊嗯…啊啊…嗯…我…已经…啊…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2784',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%爱抚着身体，动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2785',
        any: [
          /PRINTFORMW 「啊嗯…我这个地方更舒服…啊啊%UNICODE\(0x2661\) \*1% 啊啊%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2787',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房和阴蒂被%SAVESTR:PLAYER%爱抚着，漏出了喘息声/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2788',
        any: [
          /PRINTFORMW 「啊！嗯…好棒…继续疼爱我吧…啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2791',
        any: [
          /PRINTFORMW 「嗯啊…嗯…更用力的抱紧我吧…因为从后面…看不见你的脸…啊嗯啊啊%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2792',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从后面抱着%SAVESTR:TARGET%，用手温柔的描绘着她的身/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2793',
        any: [/PRINTFORMW 「嗯…你…这么温柔…啊…啊啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2795',
        any: [
          /PRINTFORMW 然后%SAVESTR:PLAYER%的往上顶着。%SAVESTR:TARGET%的小穴只是这样就像/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2796',
        any: [
          /PRINTFORMW 「嗯%UNICODE\(0x2661\) \*1%…啊…突然这样…啊啊啊…我会受不了的啊啊啊啊啊啊啊%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2798',
        any: [
          /PRINTFORMW 「嗯啊…好舒服啊…嗯…就这样一直和你连在一起…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2799',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为身体被爱抚，被侵犯而出了神……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2802',
        any: [
          /PRINTFORMW 「嗯…啊嗯！插到深处来了…啊…我的里面全部…被你填满了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2803',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的双腕，阴茎插到了蜜裂的深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2805',
        any: [
          /PRINTFORMW 「嗯啊…就这样侵犯我…更多更多的侵犯我…嗯…啊…啊嗯啊…啊嗯%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2806',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%配合%SAVESTR:PLAYER%的腰的动作，娇艳的动着腰，发出/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2808',
        any: [
          /PRINTFORMW 「啊啊…还、还是…很紧啊…我要被你弄坏了…所以请温柔一点…啊…啊啊嗯%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2809',
        any: [
          /PRINTFORMW 听着那撒娇一样的话语，%SAVESTR:PLAYER%抬起腰开始疼爱%SAVESTR:TARGET/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2814',
        any: [
          /PRINTFORMW 「啊啊…全都…看见了…我被侵犯的地方…啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2815',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为大镜子映出的自己的姿态而兴奋着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2818',
        any: [/CFLAG:324 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2821-2831',
        any: [
          /PRINTFORMW 「啊…啊嗯…不、不要…再继续…啊啊…碰我的胸部了…呀…哪里也不行…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2822',
        any: [
          /PRINTFORMW 「啊…啊嗯…不、不要…再继续…啊啊…碰我的胸部了…呀…哪里也不行…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2823',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面住、一边被爱抚着乳房，一边/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2824',
        any: [/PRINTFORMW 「啊…嗯啊…啊…不行…不行…我被这样…啊…啊嗯…啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2825',
        any: [
          /PRINTFORMW 与她的意志无关，%SAVESTR:TARGET%被开发了的蜜裂产生出的快乐让她的脑袋想要融化了一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2827',
        any: [
          /PRINTFORMW 「嗯…呢…咕…明明是被侵犯…我却…啊啊…有感觉了什么的…啊啊…啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开发了的蜜裂被插着而发出了喘息，感到兴奋的%SAVESTR:PLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2829',
        any: [/PRINTFORMW 「呀！啊…啊啊——！嗯…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2830',
        any: [
          /PRINTFORMW 发觉被咬的时候蜜裂会包过来的%SAVESTR:PLAYER%想要留下齿痕那样一次又一次的咬着……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2832',
        any: [/CFLAG:324 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2835-2838',
        any: [
          /PRINTFORMW 「嗯…嗯…啊…嗯啾…啊…嗯…啊啊…插到我的深处了…啊…咕…嗯嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2835',
        any: [
          /PRINTFORMW 「嗯…嗯…啊…嗯啾…啊…嗯…啊啊…插到我的深处了…啊…咕…嗯嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2836',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜裂被%SAVESTR:PLAYER%的阴茎一直插到深处。面对因/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2837',
        any: [/PRINTFORMW 「啊啊…我…已经…变得奇怪了……啊啊…嗯…啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2838',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%只能被%SAVESTR:PLAYER%从背后随他的想法被玩弄……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2839',
        any: [/CFLAG:324 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2841-2844',
        any: [/ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2842',
        any: [/PRINTFORMW 「嗯啊…嗯呼…呜！咕…啊啊！咕…呜…呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2843',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面一边爱抚着乳房和阴蒂一边动/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2844',
        any: [/PRINTFORMW 「快、快…住手…啊…啊咕…呜…嗯嗯嗯——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2845',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2854-2949',
        any: [
          /PRINTFORMW 「啊啊…继续侵犯我的肛门吧…还想要你的阴茎…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2856-2889',
        any: [
          /PRINTFORMW 「啊啊…继续侵犯我的肛门吧…还想要你的阴茎…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2860',
        any: [
          /PRINTFORMW 「啊啊…继续侵犯我的肛门吧…还想要你的阴茎…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2861',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的肛门轻易地把%SAVESTR:PLAYER%的阴茎吞了下/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2862',
        any: [
          /PRINTFORMW 「啊嗯啊啊，肛门好舒服啊%UNICODE\(0x2661\) \*1% 再快点，快点侵犯我吧%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2864',
        any: [
          /PRINTFORMW 「嗯…咕…我的肛门…被你填满了%UNICODE\(0x2661\) \*1% 啊啊——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2865',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%贯穿了%SAVESTR:TARGET%的未开发的肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2866',
        any: [/PRINTFORMW 「嗯…嗯…你还真是毫不留情啊…啊…啊…啊啊——」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2871',
        any: [
          /PRINTFORMW 「嗯…咕…嗯啊%UNICODE\(0x2661\) \*1% 啊啊…你插进来了…嗯…我的肛门里…啊啊%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2872',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的肛门轻易地的吞下了%SAVESTR:PLAYER%的阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2873',
        any: [
          /PRINTFORMW 「嗯啊嗯啊，好好品尝…我下流的肛门吧…嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2875',
        any: [
          /PRINTFORMW 「啊咕…果、果然对我来说…稍微有些早…不过我会忍耐的…啊嗯…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2876',
        any: [
          /PRINTFORMW 未被开发的肛门被贯穿，%SAVESTR:TARGET%的脸因为痛苦而扭曲着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2877',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了继续看那样的表情而开始激烈的侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2882',
        any: [
          /PRINTFORMW 「啊啊！明明都说了好几次不是该插进这里…嗯…啊啊…咕…啊啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2883',
        any: [/PRINTFORMW %SAVESTR:PLAYER%按住%SAVESTR:TARGET%侵犯着肛门。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2884',
        any: [
          /PRINTFORMW 无论多么不愿意，%SAVESTR:TARGET%被开发过的肛门都为了接受阴茎而张开着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2886',
        any: [
          /PRINTFORMW 「啊啊啊…嗯不行…不行…啊啊！不是插进这里…啊啊啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2887',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还未开发的肛门被%SAVESTR:PLAYER%阴茎了进去，充分/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2890',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2893-2947',
        any: [
          /PRINTFORMW 「我的肛门%UNICODE\(0x2661\) \*1% 和你的阴茎相性很好的样子…啊啊%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2897',
        any: [
          /PRINTFORMW 「我的肛门%UNICODE\(0x2661\) \*1% 和你的阴茎相性很好的样子…啊啊%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2898',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的肛门轻易地的吞下了%SAVESTR:PLAYER%的阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2899',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门啾的包住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2900',
        any: [
          /PRINTFORMW 「啊啊啊…我的肛门！继续！继续侵犯啊！啊啊…啊啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2902',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%压住%SAVESTR:TARGET%的分开的双腿，侵犯着她的肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2903',
        any: [
          /PRINTFORMW 「啊啊！我的小穴和肛门…全都被看见了！啊…继续继续看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2904',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%极速抽插着，%SAVESTR:TARGET%不断发出诱人的呻吟/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2905',
        any: [
          /PRINTFORMW 「啊啊…嗯…肛门…我的肛门…继续侵犯…把我弄得乱七八糟的%UNICODE\(0x2661\) \*1%啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2907',
        any: [/CFLAG:327 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2910-2912',
        any: [
          /PRINTFORMW 「嗯啊…你的话想要怎么侵犯我都可以啊…啊啊嗯…啊啊…嗯啊…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2910',
        any: [
          /PRINTFORMW 「嗯啊…你的话想要怎么侵犯我都可以啊…啊啊嗯…啊啊…嗯啊…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2911',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%贯穿了%SAVESTR:TARGET%正在开发途中的肛门、%SAV/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2912',
        any: [/PRINTFORMW 「请、请在温柔一点…啊…啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2913',
        any: [/CFLAG:327 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2916-2926',
        any: [
          /PRINTFORMW 「啊…啊啊…你的…全部进来了…嗯…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2917',
        any: [
          /PRINTFORMW 「啊…啊啊…你的…全部进来了…嗯…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2918',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%久经开发的肛门轻易地的吞下了%SAVESTR:PLAYER%的阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2919',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门啾的包住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2920',
        any: [/PRINTFORMW 「啊嗯…我的肛门想要你的…好害羞啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2922',
        any: [
          /PRINTFORMW 「嗯啊…嗯…啊啊…肛门有感觉什么的…明明很害羞的…我…啊嗯啊啊啊啊%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2923',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门紧紧的包住了%SAVESTR:PLAYER%的阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2924',
        any: [
          /PRINTFORMW 一边感叹着被抱住的感觉，%SAVESTR:PLAYER%一边继续侵犯着肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2925',
        any: [
          /PRINTFORMW 「啊嗯…肛门要坏掉了…啊…啊啊啊…不行啊…再继续的话我…啊…啊啊啊——%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2927',
        any: [/CFLAG:327 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2930-2932',
        any: [/PRINTFORMW 「我会忍耐的…插进肛门也可以哦…嗯…呜…咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2930',
        any: [/PRINTFORMW 「我会忍耐的…插进肛门也可以哦…嗯…呜…咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2931',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%正在开发途中的肛门被贯穿，脸因为痛苦而扭曲着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2932',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了继续看那样的表情而开始激烈的侵犯着肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2933',
        any: [/CFLAG:327 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2936-2939',
        any: [
          /PRINTFORMW 「还要…继续侵犯…我的肛门…啊…啊啊！不、不要…明明不想要…咕——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2936',
        any: [
          /PRINTFORMW 「还要…继续侵犯…我的肛门…啊…啊啊！不、不要…明明不想要…咕——」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2937',
        any: [/PRINTFORMW %SAVESTR:PLAYER%按住%SAVESTR:TARGET%侵犯着肛门/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2938',
        any: [
          /PRINTFORMW 无论多么不愿意，%SAVESTR:TARGET%被开发过的肛门都为了接受阴茎而张开着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2939',
        any: [
          /PRINTFORMW 「嗯啊…啊嗯…嗯…咕…我明明不能就这样…就有…感觉…啊啊啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2940',
        any: [/CFLAG:327 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2943-2945',
        any: [/PRINTFORMW 「恩爱…啊啊…好疼…好疼啊…快、快点…停下…啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2943',
        any: [/PRINTFORMW 「恩爱…啊啊…好疼…好疼啊…快、快点…停下…啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2944',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还未开发的肛门被%SAVESTR:PLAYER%阴茎了进去，充分/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2945',
        any: [
          /PRINTFORMW 压住扭动身体想要挣脱的%SAVESTR:TARGET%的肩膀，%SAVESTR:PLAYER%享受/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2946',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2955-3058',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2957-2995',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2961',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2962',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%的阴茎轻易吞了进去/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2963',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的肛门被扩张的地方轻易的看见。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2964',
        any: [
          /PRINTFORMW 「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2966',
        any: [
          /PRINTFORMW 「啊啊！我的肛门…被侵犯了…啊啊啊啊…这样…好棒…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2967',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，贯穿了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2968',
        any: [/PRINTFORMW 「继续…继续侵犯我直到我的肛门感到舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2973',
        any: [
          /PRINTFORMW 「啊啊！…继续…侵犯…我的肛门…啊…嗯啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2974',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%的阴茎轻易吞了进去/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2975',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的肛门被扩张的地方轻易的看见。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2976',
        any: [
          /PRINTFORMW 「被这么侵犯的话…我已经…逃不掉了…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2978',
        any: [/PRINTFORMW 「啊…嗯…啊啊…我的肛门…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2979',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，贯穿了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2980',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸因痛苦而歪曲着，发出了忍耐的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2981',
        any: [/PRINTFORMW 「你想做的话，我…会忍耐的…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2986',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…啊啊…嗯…不行…再继续的话我的肛门会变得奇怪的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2987',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股侵犯者他的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2988',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门接受着阴茎、不断产生着快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2990',
        any: [
          /PRINTFORMW 「肛，肛门不…不行的…不要！真的不行…啊…啊啊…咕…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2991',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，一口气把阴茎插进了未被/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2992',
        any: [
          /PRINTFORMW 「嗯…嗯啊…咕…啊啊…啊啊啊！啊啊啊啊啊啊啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2993',
        any: [/PRINTFORMW %SAVESTR:TARGET%咬着嘴唇，发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2996',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '2999-3056',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3003',
        any: [
          /PRINTFORMW 「嗯…啊啊啊…我的肛门里，阴茎插进来了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3004',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%的阴茎轻易吞了进去/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3005',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的肛门被扩张的地方轻易的看见。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3006',
        any: [
          /PRINTFORMW 「啊…啊啊…我的肛门被阴茎插进来的话…我马上就受不了了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3007',
        any: [
          /PRINTFORMW 「嗯啊啊…啊啊…我是你的牝奴隶…继续侵犯我…要把肛门翻出来那样侵犯我%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3009',
        any: [
          /PRINTFORMW 「啊啊！我的肛门已经乱七八糟了%UNICODE\(0x2661\) \*1% 啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3010',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰，阴茎的抽送越来越激烈。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3011',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门和%SAVESTR:TARGET%的阴茎象吸在一起一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3012',
        any: [
          /PRINTFORMW 「好舒服…肛门被侵犯好舒服…啊啊啊…嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3014',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3017-3019',
        any: [
          /PRINTFORMW 「嗯…更激烈的…侵犯，调教…我的肛门吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3017',
        any: [
          /PRINTFORMW 「嗯…更激烈的…侵犯，调教…我的肛门吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3018',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，贯穿了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW 「啊啊…来吧…更用力…更激烈的…嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3020',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3023-3033',
        any: [
          /PRINTFORMW 「啊啊！…我的肛门…继续…侵犯吧…嗯…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3024',
        any: [
          /PRINTFORMW 「啊啊！…我的肛门…继续…侵犯吧…嗯…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3025',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%的阴茎轻易吞了进/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3026',
        any: [
          /PRINTFORMW 从后面被侵犯的%SAVESTR:TARGET%的肛门被扩张的地方轻易的看见。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3027',
        any: [
          /PRINTFORMW 「被这么侵犯的话…我已经…逃不掉了…啊啊啊…啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3029',
        any: [
          /PRINTFORMW 「啊…啊啊…我的肛门舒服吗？啊啊…那就继续…使用我的肛门吧%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3030',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%听着%SAVESTR:TARGET%的祈求，掰开的她屁股更激烈的抽/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1%…啊…啊啊…啊…啊啊…啊啊哦…呀啊啊啊啊%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3032',
        any: [
          /PRINTFORMW 「什么时候使用我的肛门都可以哦%UNICODE\(0x2661\) \*1% 啊…啊啊啊啊%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3034',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3037-3040',
        any: [/PRINTFORMW 「啊…你的…进来了…嗯…全部都…进来了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3037',
        any: [/PRINTFORMW 「啊…你的…进来了…嗯…全部都…进来了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3038',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，贯穿了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3039',
        any: [
          /PRINTFORMW  %SAVESTR:TARGET%的脸因痛苦而歪曲着，发出了忍耐的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3040',
        any: [/PRINTFORMW 「没关系…啊…嗯嗯…啊…呜…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3041',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3044-3047',
        any: [/PRINTFORMW 「我的肛门…不…不要…不要再继续了…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3044',
        any: [/PRINTFORMW 「我的肛门…不…不要…不要再继续了…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3045',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，侵犯着她的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3046',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门接受着阴茎、不断产生着快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3047',
        any: [/PRINTFORMW 「啊啊…啊…啊啊啊！明明都说了不行…嗯…啊啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3048',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3051-3054',
        any: [/PRINTFORMW 「啊…啊啊！以、已经不行了…嗯…咕…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3051',
        any: [/PRINTFORMW 「啊…啊啊！以、已经不行了…嗯…咕…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3052',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的屁股，一口气把阴茎插进了未被/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3053',
        any: [/PRINTFORMW 「再继续侮辱我的话…啊…啊啊…啊…咦呀——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3054',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出着悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3055',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3064-3173',
        any: [
          /PRINTFORMW 「啊啊！好深！我的肛门里面全部…都…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3066-3106',
        any: [
          /PRINTFORMW 「啊啊！好深！我的肛门里面全部…都…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3070',
        any: [
          /PRINTFORMW 「啊啊！好深！我的肛门里面全部…都…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3071',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开放过的肛门轻易的把%SAVESTR:PLAYER%的阴茎吞了下/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3072',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动腰，把阴茎连根部都插进了肛门里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3073',
        any: [
          /PRINTFORMW 「啊啊！好舒服…！你的全部都感觉得到%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3075',
        any: [/PRINTFORMW 「呜…啊啊…啊…啊…全部都进到我的肛门里来了…～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3076',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%掰开%SAVESTR:TARGET%的屁股，插进了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3077',
        any: [/PRINTFORMW %SAVESTR:TARGET%有些痛苦的抱着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3078',
        any: [
          /PRINTFORMW 「啊啊…被你的阴茎继续插的话…很快就会变舒服的…啊啊…别想太多侵犯我吧…%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3083',
        any: [/PRINTFORMW 「呐…就那么喜欢我的肛门吗？ 啊…嗯…嗯…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3084',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就想要回答这些话一样，抱着%SAVESTR:TARGET%从下往上/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3085',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门反射性的紧缩压迫着%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3086',
        any: [
          /PRINTFORMW 「啊…嗯…啊啊…不光是我的肛门…也更加的爱我吧…啊…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3088',
        any: [
          /PRINTFORMW 「嗯…嗯…啊…啊啊…我的肛门把你的全部都…都吞下去了…啊啊啊啊………%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3089',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎连根部都埋在了%SAVESTR:TARGET%未熟的肛门里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3090',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边漏出着灼热的呼吸，一边抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3091',
        any: [/PRINTFORMW 「再、再稍微等等…还、很紧…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3096',
        any: [/PRINTFORMW 「啊啊！嗯…呜…不要…啊啊…不要再继续了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3097',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%，集中侵犯着肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3098',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门和%SAVESTR:TARGET%的意志相反，轻易地/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3099',
        any: [/PRINTFORMW 「不要全部都插进…我的肛门…啊啊…呀啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3101',
        any: [/PRINTFORMW 「给我、离开…才不想被你抱着呢…呜…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3102',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%集中蹂躏着肛门，一次又一次的向/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3103',
        any: [/PRINTFORMW 「不要！咕…啊！啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3104',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门紧紧地包裹着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3107',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3110-3171',
        any: [
          /PRINTFORMW 「啊啊！好深！我的肛门里面全部…都…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3114',
        any: [
          /PRINTFORMW 「啊啊！好深！我的肛门里面全部…都…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3115',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开放过的肛门轻易的把%SAVESTR:PLAYER%的阴茎吞了下/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3116',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭动腰，把阴茎连根部都插进了肛门里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3117',
        any: [
          /PRINTFORMW 「啊啊！好舒服…！你的全部都感觉得到%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3119',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%利用自己的体重，把%SAVESTR:PLAYER%的阴茎直到根部位/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3120',
        any: [
          /PRINTFORMW 「呜…啊啊…啊…啊啊啊啊%UNICODE\(0x2661\) \*1% 全都…全都是我的%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3121',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%细细品味着%SAVESTR:PLAYER%的阴茎，前后摇动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3122',
        any: [
          /PRINTFORMW 「你的阴茎…嗯…啊啊…是我的东西…嗯…嗯嗯…啊啊…嗯…啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3123',
        any: [
          /PRINTFORMW 「绝对不会放开的…啊嗯…啊啊…啾…嗯啾…啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3124',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%接着吻，肛门又变得更紧了…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3126',
        any: [/CFLAG:329 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3129-3132',
        any: [/PRINTFORMW 「啊啊！到深处…一口气…嗯…嗯啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3129',
        any: [/PRINTFORMW 「啊啊！到深处…一口气…嗯…嗯啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3130',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%掰开%SAVESTR:TARGET%的屁股，插进了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3131',
        any: [/PRINTFORMW  %SAVESTR:TARGET%有些痛苦的抱着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3132',
        any: [
          /PRINTFORMW 「啊啊…用你的阴茎继续开发我的肛门吧…啊呢…啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3133',
        any: [/CFLAG:329 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3136-3146',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…啊…啊啊啊…我的肛门已经…是你…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3137',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…啊…啊啊啊…我的肛门已经…是你…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3138',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%就想要回答这些话一样，抱着%SAVESTR:TARGET%从下往上/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3139',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门反射性的紧缩压迫着%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3140',
        any: [
          /PRINTFORMW 「不想从你这里离开…啊…我的肛门是你专用的…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3142',
        any: [
          /PRINTFORMW 「嗯…嗯…和你接吻的话…啊…肛门被侵犯也好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3143',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%，一边晃着腰一边不停的接吻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3144',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门不停的紧缩这、让%SAVESTR:PLAYER%的阴茎沉浸在/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3145',
        any: [
          /PRINTFORMW 「啊嗯…嗯嗯…好棒…好舒服…让我更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3147',
        any: [/CFLAG:329 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3150-3153',
        any: [/PRINTFORMW 「啊啊…我的肛门还…不够舒服，对不起…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3150',
        any: [/PRINTFORMW 「啊啊…我的肛门还…不够舒服，对不起…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3151',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的阴茎连根部都埋在了%SAVESTR:TARGET%未熟的肛门里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3152',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边漏出着灼热的呼吸，一边抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3153',
        any: [
          /PRINTFORMW 「啊啊…但是…你自由使用就好了…啊…啊啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3154',
        any: [/CFLAG:329 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3157-3161',
        any: [/PRINTFORMW 「啊啊！不、不要…不要抱着我啊…呜…咕…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3157',
        any: [/PRINTFORMW 「啊啊！不、不要…不要抱着我啊…呜…咕…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3158',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%，集中侵犯着她的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3159',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门和%SAVESTR:TARGET%的意志相反，轻易地/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3160',
        any: [/PRINTFORMW 「啊啊啊！全部…全部都进来…不要…不要啊…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3161',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门和背部升起快感而感到战栗、反射性的抱住了%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3162',
        any: [/CFLAG:329 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3165-3169',
        any: [/PRINTFORMW 「啊、走开…我可没兴趣和你抱在一起…呜…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3165',
        any: [/PRINTFORMW 「啊、走开…我可没兴趣和你抱在一起…呜…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3166',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%集中蹂躏着肛门，一次又一次的向/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3167',
        any: [/PRINTFORMW 「停、停下…求你了…啊…啊啊…呀啊啊啊！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3168',
        any: [/PRINTFORMW 未开发的肛门紧紧地包裹着%SAVESTR:PLAYER%的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3169',
        any: [
          /PRINTFORMW 而为了忍耐那份疼痛，%SAVESTR:TARGET%只能抱着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3170',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3179-3310',
        any: [
          /PRINTFORMW 「嗯…啊啊…啊…把我的身体…弄得更加乱七八糟吧…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3181-3217',
        any: [
          /PRINTFORMW 「嗯…啊啊…啊…把我的身体…弄得更加乱七八糟吧…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3185',
        any: [
          /PRINTFORMW 「嗯…啊啊…啊…把我的身体…弄得更加乱七八糟吧…嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3186',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边玩弄着%SAVESTR:PLAYER%的乳房，一边从下面突刺这/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3187',
        any: [
          /PRINTFORMW 「啊啊…嗯、啊…啊啊！好棒…好舒服…啊啊…肛门好舒服啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3189',
        any: [/PRINTFORMW 「啊…全部…插进来了…我的肛门…就这么被撑开了…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3190',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%掰开%SAVESTR:TARGET%的屁股，插进了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3191',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住了%SAVESTR:TARGET%的乳房，%SAVESTR:T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3192',
        any: [
          /PRINTFORMW 「啊啊…继续下流的开发…调教…我的身体吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3197',
        any: [
          /PRINTFORMW 肛门被开发了的%SAVESTR:TARGET%坐在了%SAVESTR:PLAYER%上面身上、粗重/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3198',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3199',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门很舒服似的把%SAVESTR:PLAYER%的阴茎连根部都吞/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3201',
        any: [
          /PRINTFORMW 「嗯、嗯…好好品尝…我的肛门吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3202',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把身体托付给%SAVESTR:PLAYER%、从下面被不停的突刺着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3203',
        any: [
          /PRINTFORMW 「我的身体…全部都是你的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3208',
        any: [
          /PRINTFORMW 「啊啊…嗯…嗯嗯…我的肛门这么有感觉什么的…嗯、嗯啊…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3209',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%一边侵犯着肛门一边抚摸着乳房，发/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3210',
        any: [
          /PRINTFORMW 「嗯…啊…啊…啊啊…嗯…啊…不行…我的身体…为什么…呀啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3212',
        any: [/PRINTFORMW 「停、停下…我的肛门什么感觉都没有，所以…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3213',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从后面抱着%SAVESTR:TARGET%，从下往上顶着肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3214',
        any: [/PRINTFORMW 「啊啊…嗯…啊啊啊！不要…嗯…咕…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3215',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%听着%SAVESTR:TARGET%那模糊的悲鸣、又开始爱抚着乳房/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3218',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3219-3231',
        any: [
          /PRINTFORMW 「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3221',
        any: [
          /PRINTFORMW 「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3222',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3224',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3225',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3227',
        any: [/PRINTFORMW 「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3228',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3230',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3234-3309',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊%UNICODE\(0x2661\) \*1% 我…要变成笨蛋了…再继续侵犯我的肛门的话我/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3238',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊%UNICODE\(0x2661\) \*1% 我…要变成笨蛋了…再继续侵犯我的肛门的话我/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3239',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%接受着下面的突刺，一边疯狂的喘息着一边前后扭着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3240',
        any: [
          /PRINTFORMW 因为动作太混乱%SAVESTR:PLAYER%像为了不让肛门摆脱阴茎般抱着%SAVESTR:TAR/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3241',
        any: [
          /PRINTFORMW 「嗯…啊…啊啊…继续侵犯我…侵犯我吧…啊啊…啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3243',
        any: [
          /PRINTFORMW 「啊啊…啊…肛门被撑开了%UNICODE\(0x2661\) \*1%…我的肛门想要你的阴茎想要得不行%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3244',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%玩弄着%SAVESTR:PLAYER%的乳房，从下面开始侵犯肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3245',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手擦干了%SAVESTR:TARGET%流出的口水，又插回她的口/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3246',
        any: [
          /PRINTFORMW 「嗯…嗯…嗯啊…啊啊…啊啊…肛门被侵犯的同时嘴里含根阴茎好像也不错…啊…啊啊啊%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3247',
        any: [
          /PRINTFORMW 「但是现在…肛门…肛门被侵犯的乱七八糟…让我感觉感觉更舒服！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3249',
        any: [/CFLAG:330 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3252-3255',
        any: [/PRINTFORMW 「嗯嗯…啊啊啊…全部都插进…我下流的肛门里吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3252',
        any: [/PRINTFORMW 「嗯嗯…啊啊啊…全部都插进…我下流的肛门里吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3253',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%掰开%SAVESTR:TARGET%的屁股，插进了她未开发的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3254',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住了%SAVESTR:TARGET%的乳房，%SAVESTR:T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3255',
        any: [
          /PRINTFORMW 「嗯…虽然胸部也很好…不过还是先把肛门弄得乱七八糟吧…啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3256',
        any: [/CFLAG:330 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3259-3272',
        any: [
          /PRINTFORMW 肛门被开发了的%SAVESTR:TARGET%坐在了%SAVESTR:PLAYER%上面身上，肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3260',
        any: [
          /PRINTFORMW 肛门被开发了的%SAVESTR:TARGET%坐在了%SAVESTR:PLAYER%上面身上，肛门/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3261',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯、啊啊啊啊啊………嗯啊…腰自己动起来了…啊啊…继续抱我…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3262',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撒着娇，转动着%SAVESTR:PLAYER%手爱抚着乳房和蜜裂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3263',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 你的手…好温柔…啊啊…嗯嗯…啊…啊…啊啊啊%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3265',
        any: [
          /PRINTFORMW 「嗯啊…啊…啊啊…屁股…自己动起来了…我的肛门已经…是你的东西了%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门、黏糊糊的肠壁向%SAVESTR:PLAYER%阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3267',
        any: [
          /PRINTFORMW 「啊啊啊…啊…啊…啊嗯啊…从肛门哪里来来回回的敲打着子宫…啊啊啊%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3269',
        any: [
          /PRINTFORMW 嘴里被手指插入的%SAVESTR:TARGET%心领神会的舔了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3270',
        any: [
          /PRINTFORMW 「啾嗯啾…嗯啾…啊嗯…嗯…啊啊…好舒服…好舒服啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3273',
        any: [/CFLAG:330 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3276-3278',
        any: [/PRINTFORMW 「啊啊…还要继续被你侵犯…嗯啊啊…啊啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3276',
        any: [/PRINTFORMW 「啊啊…还要继续被你侵犯…嗯啊啊…啊啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3277',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把身体交给%SAVESTR:PLAYER%、未开发的肛门被从下不停/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3278',
        any: [
          /PRINTFORMW 「我没关系的…在肛门中满满的出来吧…嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3279',
        any: [/CFLAG:330 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3282-3285',
        any: [
          /PRINTFORMW 「嗯啊…嗯啊…啊啊…没错…被你侵犯…肛门好舒服啊…嗯…嗯啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3282',
        any: [
          /PRINTFORMW 「嗯啊…嗯啊…啊啊…没错…被你侵犯…肛门好舒服啊…嗯…嗯啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3283',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%侵犯着肛门，发出了喘息的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3284',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被%SAVESTR:PLAYER%的手指看起来很疼的深深戳着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3285',
        any: [
          /PRINTFORMW 「啊啊啊…我…嗯啊…嗯…嗯啊…啊啊…嗯、啊啊…啊啊啊啊——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3286',
        any: [/CFLAG:330 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3289-3293',
        any: [/PRINTFORMW 「嗯啊…嗯啊…咕…呜…嗯…啊啊啊！停、停下…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3289',
        any: [/PRINTFORMW 「嗯啊…嗯啊…咕…呜…嗯…啊啊啊！停、停下…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3290',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从后面抱着%SAVESTR:TARGET%从下往上插着肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3291',
        any: [/PRINTFORMW %SAVESTR:TARGET%发出了好像很痛苦的声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3292',
        any: [/PRINTFORMW 「啊咕…呜…呜…不、不要…这…样…啊嗯！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3293',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边愉快的听着%SAVESTR:TARGET%的呻吟、一边开始爱抚/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3294',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3296-3308',
        any: [
          /PRINTFORMW 「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3298',
        any: [
          /PRINTFORMW 「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3299',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3301',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1% 我的肛门被扩张着…嗯 好舒服…继续侵犯我吧%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3302',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3304',
        any: [/PRINTFORMW 「啊啊…我的肛门…全部都进来了…啊…啊啊…这么深啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3305',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着镜子中映出的自己的痴态，更加兴奋了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3307',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看着大镜子里自己被张开双腿侵犯肛门的痴态，不甘心的移开了目光………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3316-3386',
        any: [
          /PRINTFORMW 「啊啊…你的阴茎好热…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3318-3335',
        any: [
          /PRINTFORMW 「啊啊…你的阴茎好热…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3321',
        any: [
          /PRINTFORMW 「啊啊…你的阴茎好热…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3322',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘着粗气，一边激烈的对待着%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3325',
        any: [
          /PRINTFORMW 「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘着粗气，一边温柔的侍奉着%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3329',
        any: [/PRINTFORMW 「我不做这种事不行么…真没办法…呵呵呵」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇。一边侍奉着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3333',
        any: [
          /PRINTFORMW 「用着双手服侍你的东西…嗯…疼么？…那就这么握碎…切…连这种程度的力量都用不出来么」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3334',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边露出不甘心的表情，一边侍奉着%SAVESTR:PLAYER%阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3336',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3339-3384',
        any: [
          /PRINTFORMW 「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3341',
        any: [/IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3341-3350',
        any: [
          /PRINTFORMW 「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3343',
        any: [
          /PRINTFORMW 「看，你的阴茎勃起的更厉害了、因为我把你弄得更舒服了吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3344',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的左手紧紧握着%SAVESTR:PLAYER%阴茎的根部，右手撸动/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3345',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%啊啊%UNICODE\(0x2661\) \*1% …这么/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3347',
        any: [
          /PRINTFORMW 「只是握着你热乎乎的阴茎、我的头就已经开始发晕了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3348',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不自觉的张着嘴、带着晕乎乎的眼神侍奉着%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3349',
        any: [
          /PRINTFORMW 「啊啊…如果继续这么热的话…我的手都快烫伤了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3351',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3354-3355',
        any: [
          /PRINTFORMW 「啊啊…一想到这根阴茎在我里面乱搞…啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3354',
        any: [
          /PRINTFORMW 「啊啊…一想到这根阴茎在我里面乱搞…啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3355',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着一副出神的表情服侍着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3356',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3359-3367',
        any: [
          /PRINTFORMW 「嗯啊…这根阴茎…是只属于我的阴茎…啊…绝对不会放手的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3360',
        any: [
          /PRINTFORMW 「嗯啊…这根阴茎…是只属于我的阴茎…啊…绝对不会放手的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3361',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着一副出神的表情侍奉着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3362',
        any: [
          /PRINTFORMW 「就这样变得非常非常舒服…射出非常非常多的精液来吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3364',
        any: [
          /PRINTFORMW 「啊啊…现在好像马上就要咻咻的射精出来哦…你的阴茎%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3365',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用湿润的眼睛凝视着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3366',
        any: [
          /PRINTFORMW 「就这样…用我的手变得非常非常舒服…射出非常非常多的精液来吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3368',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3371-3372',
        any: [
          /PRINTFORMW 「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3371',
        any: [
          /PRINTFORMW 「你的阴茎…在我的手里变得这么硬…啊啊…好厉害…好高兴…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3372',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘着粗气，一边温柔的侍奉着%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3373',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3376-3377',
        any: [
          /PRINTFORMW 「这样就好了吗？………呵呵呵、真的露出了好像很舒服似的脸啊、你」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3376',
        any: [
          /PRINTFORMW 「这样就好了吗？………呵呵呵、真的露出了好像很舒服似的脸啊、你」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3377',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边舔着嘴唇，一边侍奉着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3378',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3381-3382',
        any: [/PRINTFORMW 「啊啊…用手服侍你的东西什么的，真是屈辱………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3381',
        any: [/PRINTFORMW 「啊啊…用手服侍你的东西什么的，真是屈辱………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3382',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边撅起嘴唇，一边服侍着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3383',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3392-3466',
        any: [
          /PRINTFORMW 「啊啊、你的阴茎…我开动了%UNICODE\(0x2661\) \*1% 啊呜…嗯呜嗯…咕噜…啾…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3394-3416',
        any: [
          /PRINTFORMW 「啊啊、你的阴茎…我开动了%UNICODE\(0x2661\) \*1% 啊呜…嗯呜嗯…咕噜…啾…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3397',
        any: [
          /PRINTFORMW 「啊啊、你的阴茎…我开动了%UNICODE\(0x2661\) \*1% 啊呜…嗯呜嗯…咕噜…啾…嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3398',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%突然抓起%SAVESTR:PLAYER%的阴茎，以猛烈的势头吞了下/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3399',
        any: [
          /PRINTFORMW 「嗯…嗯呼…我、我…一直想舔你的阴茎想的不得了、一直都等着呢！嗯咕噜…嗯…啾%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3402',
        any: [/PRINTFORMW 「即使是你的阴茎，这么突然让我舔你觉得可能吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3403',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这么说着，一边撸着%SAVESTR:PLAYER%的阴茎，一边吻向/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3404',
        any: [
          /PRINTFORMW 「嗯…呵呵呵、首先要先接吻…%UNICODE\(0x2661\) \*1% 然后…嗯咕嗯…再舔舔龟头吧%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3407',
        any: [/PRINTFORMW 「啊啊…你那肮脏的阴茎…变干净了…嗯…啊…嗯…咕噜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3408',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眯着眼看起来很高兴的把%SAVESTR:PLAYER%的阴茎吸入口/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3409',
        any: [/PRINTFORMW 「咕噜…啊…明明味道这么重…啊…嗯…嗯…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3412',
        any: [
          /PRINTFORMW 「啊啊…终于我也到了用嘴来含住这根肮脏的阴茎的时候了…嗯…嗯…咕噜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3413',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%战战兢兢的舔起了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3414',
        any: [/PRINTFORMW 「毕竟输了，这种程度是理所当然的呢…啊…嗯…咕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3415',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着因悔恨而歪曲的表情，继续着口腔奉仕………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3417',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3420-3465',
        any: [
          /PRINTFORMW 「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3423-3436',
        any: [
          /PRINTFORMW 「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3424',
        any: [
          /PRINTFORMW 「啊啊，你的阴茎…每天都想舔…嗯…咕噜…嗯啾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3425',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%吞下%SAVESTR:PLAYER%阴茎直到喉咙的深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3426',
        any: [
          /PRINTFORMW 「嗯啾…啾…啾…嗯嗯…啊啊…阴茎…阴茎…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3428',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼前伸出了阴茎、%SAVESTR:TARGET%张开嘴咬住了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3429',
        any: [
          /PRINTFORMW 「啊呜…嗯…嗯…这是在奖励我把？ 啊啊…阴茎真好吃…咕噜…嗯啾…嗯%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3430',
        any: [
          /PRINTFORMW 「受不了了、我感觉吸的时候最舒服…嗯嗯…咕噜…就…嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3431',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脱去酷酷的女忍者这层假面之后、已经沦为了奉仕%SAVESTR:PL/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3433',
        any: [
          /PRINTFORMW 「啊呜…嗯…嗯…你的阴茎实在太好吃了…咕噜…啊啊…就这样放在我的嘴里吧%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3434',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用恍惚的眼神一边注视着%SAVESTR:PLAYER%的阴茎，一边/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3435',
        any: [
          /PRINTFORMW 「啾…咕噜…啊啊…你的阴茎已经让我上瘾了、嗯咕…嗯啾…啾…嗯咕%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3437',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3440-3452',
        any: [
          /PRINTFORMW 「啊呜…嗯…这是我的阴茎、给其他的别的谁可不行…啊啊…嗯…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3441',
        any: [
          /PRINTFORMW 「啊呜…嗯…这是我的阴茎、给其他的别的谁可不行…啊啊…嗯…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3442',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%亲了尿道口好几次后、大口吞下了%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3443',
        any: [
          /PRINTFORMW 「嗯啾…嗯…啊…我的嘴舒服吗？…啊啊…变得更舒服吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3445',
        any: [
          /PRINTFORMW 「嗯…嗯…嗯咕…咕噜…嗯…嗯嗯…在我嘴里满满的射出来吧…啊啊…嗯嗯%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3446',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很舒服似得眯起了眼、继续舔着%SAVESTR:PLAYER%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3447',
        any: [
          /PRINTFORMW 「好吃…你的阴茎实在太好吃了…咕噜…嗯…啾啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3449',
        any: [
          /PRINTFORMW 「啊啊…只是含着男人的阴茎而已…就这么幸福什么的…我好想已经变得不对劲了…%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3450',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%干起来很高兴的舔着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3451',
        any: [
          /PRINTFORMW 「咕…啾…啾嗯…啊啊…明明味道这么重但我就是停不下来%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3453',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3456-3458',
        any: [/PRINTFORMW 「嗯啊…嗯…啊嗯…咕噜…啾…啊…嗯啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3456',
        any: [/PRINTFORMW 「嗯啊…嗯…啊嗯…咕噜…啾…啊…嗯啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3457',
        any: [/PRINTFORMW %SAVESTR:TARGET%热心的舔着%SAVESTR:PLAYER%的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3458',
        any: [/PRINTFORMW 「让我做到这种程度什么的…你这家伙…嗯…啊…咕噜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3459',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3462-3463',
        any: [/PRINTFORMW 「嗯…嗯嗯…咕噜…嗯啊…嗯…让我继续舔？ 啊…嗯啾啾！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3462',
        any: [/PRINTFORMW 「嗯…嗯嗯…咕噜…嗯啊…嗯…让我继续舔？ 啊…嗯啾啾！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3463',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着不甘心的表情继续舔着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3464',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3473-3559',
        any: [/PRINTFORMW 「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3475-3497',
        any: [/PRINTFORMW 「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3478',
        any: [/PRINTFORMW 「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼角垂了下来、为用胸部侍奉而兴奋这。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3480',
        any: [/PRINTFORMW 「胸部变得太舒服…啊啊…要融化了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3483',
        any: [/PRINTFORMW 「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3484',
        any: [/PRINTFORMW %SAVESTR:TARGET%高兴的舔着嘴唇，用胸部开始了奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3487',
        any: [/PRINTFORMW 「呵呵呵、我的胸部…让你很舒服啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3488',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是摩擦这艳丽的乳头一样，开始奉仕%SAVESTR:PLAYER%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3491',
        any: [/PRINTFORMW 「总觉得…啊啊…胸部好热…啊、嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3492',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着出神的表情，继续奉仕着%SAVESTR:PLAYER%的阴茎…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3495',
        any: [/PRINTFORMW 「嗯…嗯啊…这、这样的话舒服吗、你…嗯…啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3496',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然对胸部奉仕感到困惑，但还是在继续刺激着%SAVESTR:PLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3498',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3501-3558',
        any: [
          /PRINTFORMW 「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3503-3512',
        any: [
          /PRINTFORMW 「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3505',
        any: [
          /PRINTFORMW 「继续侵犯我的胸部吧…啊啊…用你的阴茎的话我多少次都能高潮…啊啊啊%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出放荡的表情用乳房蹭着%SAVESTR:PLAYER%的阴茎。随/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3507',
        any: [
          /PRINTFORMW 「嗯…啊嗯…啊啊…嗯%UNICODE\(0x2661\) \*1% 就这样射精…然后就这样让我更舒服吧%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3509',
        any: [
          /PRINTFORMW 「啊啊…好舒服…我的胸部被侵犯得好舒服%UNICODE\(0x2661\) \*1% 啊啊…嗯啊…嗯…啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3510',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用乳房奉仕着，想要绝顶那样兴奋着。那表情好像要被快乐和下流融化一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3511',
        any: [
          /PRINTFORMW 「我的胸部…已经…不行了…这是这么做就这么舒服什么的…啊…啊啊…阴茎好热啊…%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3513',
        any: [/CFLAG:333 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3516-3518',
        any: [/PRINTFORMW 「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3516',
        any: [/PRINTFORMW 「嗯…用你的阴茎侵犯我的胸部吧…啊啊…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3517',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很高兴的舔了舔嘴唇，开始了胸部的奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3518',
        any: [
          /PRINTFORMW 「我的胸部是为了让你舒服而存在的…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3519',
        any: [/CFLAG:333 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3522-3530',
        any: [
          /PRINTFORMW 「啊啊…我明明应该让你的阴茎感到舒服才对…啊…嗯…嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3523',
        any: [
          /PRINTFORMW 「啊啊…我明明应该让你的阴茎感到舒服才对…啊…嗯…嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3524',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用胸部奉仕着%SAVESTR:PLAYER%阴茎、乳头完全勃起，品/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3525',
        any: [
          /PRINTFORMW 「我的胸部…已经彻底变得奇怪了…啊啊…明明只是为你服务而已…好舒服啊%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3527',
        any: [
          /PRINTFORMW 「就这样用的胸部变得舒服…啊啊…满满的射出来啊…嗯…啊啊…嗯啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3528',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着出神的表情边用乳房奉仕边说道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3529',
        any: [
          /PRINTFORMW 「你觉得舒服的话、我也会感觉很幸福的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3531',
        any: [/CFLAG:333 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3534-3536',
        any: [/PRINTFORMW 「呵呵呵、我的胸部…会让你很舒服的…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3534',
        any: [/PRINTFORMW 「呵呵呵、我的胸部…会让你很舒服的…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3535',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像摩擦艳丽的乳头那样，开始奉仕%SAVESTR:PLAYER%的阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3536',
        any: [
          /PRINTFORMW 「用我的…用我的胸部满满的射出来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3537',
        any: [/CFLAG:333 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3540-3545',
        any: [/PRINTFORMW 「啊啊…我的胸部…被你的阴茎侵犯了呦…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3541',
        any: [/PRINTFORMW 「啊啊…我的胸部…被你的阴茎侵犯了呦…啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3542',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很高兴的笑着用乳房夹住%SAVESTR:PLAYER%的阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3544',
        any: [
          /PRINTFORMW 「明明是这么屈辱的姿势…我的胸部太舒服了…啊啊…要融化了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3545',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的两个乳头完全勃起着、%SAVESTR:PLAYER%的阴茎品味着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3547',
        any: [/CFLAG:333 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3550-3551',
        any: [/PRINTFORMW 「好像…啊啊…胸部变热了…啊、嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3550',
        any: [/PRINTFORMW 「好像…啊啊…胸部变热了…啊、嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3551',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着出神的表情继续奉仕着%SAVESTR:PLAYER%的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3552',
        any: [/CFLAG:333 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3555-3556',
        any: [
          /PRINTFORMW 「嗯…嗯啊…总觉得胸部…啊嗯…我的胸部变得好奇怪…啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3555',
        any: [
          /PRINTFORMW 「嗯…嗯啊…总觉得胸部…啊嗯…我的胸部变得好奇怪…啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3556',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用笨拙的动作继续刺激着%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3557',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3566-3626',
        any: [
          /PRINTFORMW 「用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3568-3579',
        any: [
          /PRINTFORMW 「用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3571',
        any: [
          /PRINTFORMW 「用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3574',
        any: [
          /PRINTFORMW 「啊啊、舒服吗？我也很舒服…啊…嗯…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3577',
        any: [/PRINTFORMW 「啊啊…让我做这种事…呜…咕…啊…啊…啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3578',
        any: [
          /PRINTFORMW 「嗯啊…你的那个太精神、好像快从胯下飞出来了似的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3580',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3583-3625',
        any: [/PRINTFORMW 「啊啊…呐…什么时候才会取走我的处女呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3586-3592',
        any: [/PRINTFORMW 「啊啊…呐…什么时候才会取走我的处女呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3586',
        any: [/PRINTFORMW 「啊啊…呐…什么时候才会取走我的处女呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3587',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的秘裂流着、每次摩擦都会发出下流的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3588',
        any: [
          /PRINTFORMW 「你看…你看…明明我想要你的阴茎想要得不得了…你却不来拿…啊啊%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3589',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%激烈的动着腰的两腿之间，%SAVESTR:PLAYER%拔走了阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3590',
        any: [
          /PRINTFORMW 「如果太难忍的话…啊…啊啊…呵呵呵、就这样直接插进来也可以哦…%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3591',
        any: [
          /PRINTFORMW 「………开、开玩笑而已、我会好好的奉仕啦。只要让咱们两个都更舒服这件事不会忘的…啊啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3592',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扑哧一笑，用股间把%SAVESTR:PLAYER%的阴茎重新夹好、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3593',
        any: [/CFLAG:334 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3596-3600',
        any: [
          /PRINTFORMW 「呵呵呵、用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3596',
        any: [
          /PRINTFORMW 「呵呵呵、用这种要活活急死人的姿势…啊啊…你好可恨啊…嗯…啊恩♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3597',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜裂里不停的溢出着的爱液沾满了%SAVESTR:PLAYER%的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3598',
        any: [
          /PRINTFORMW 「我为了你的阴茎明明什么都能得到、啊啊…好好…好好的插入我的小穴啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3599',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%哀求着、但是%SAVESTR:PLAYER%就像是要继续看她这种姿/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3600',
        any: [
          /PRINTFORMW 「嗯…嗯…啊啊…好过分…我的小穴…明明想要你想要的不得了…啊啊%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3601',
        any: [/CFLAG:334 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3604-3608',
        any: [
          /PRINTFORMW 「啊啊…好舒服…你的阴茎热得…我好想快融化一样…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3604',
        any: [
          /PRINTFORMW 「啊啊…好舒服…你的阴茎热得…我好想快融化一样…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3605',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还不知道男性的蜜裂里漏出的爱液让那里变得更滑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3606',
        any: [
          /PRINTFORMW 「啊呢啊…%UNICODE\(0x2661\) \*1% 我…嗯啊…变得这么舒服真的没关系吗…啊啊%UN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3607',
        any: [
          /PRINTFORMW 「呐…你的东西插进我那里的话会变得更舒服吗？啊恩…啊啊…对、对不起、会好好的把股间性交做的更舒服的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3608',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用被打了屁股而含着眼泪的眼睛看着%SAVESTR:PLAYER%继/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3609',
        any: [/CFLAG:334 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3612-3617',
        any: [
          /PRINTFORMW 「啊啊、舒服吗？我很舒服哦…啊…嗯…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3612',
        any: [
          /PRINTFORMW 「啊啊、舒服吗？我很舒服哦…啊…嗯…啊啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3613',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%经过锻炼的细长大腿为了更舒服而努力加紧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3614',
        any: [
          /PRINTFORMW 「你的阴茎也这么热…啊啊…我的腿好像快融化了…嗯…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3615',
        any: [/PRINTFORMW 「我…想要你的…快忍不住了…求你了…快点插进来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3616',
        any: [
          /PRINTFORMW 面对%SAVESTR:TARGET%的祈求，%SAVESTR:PLAYER%打了%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3617',
        any: [/PRINTFORMW 「啊啊…对不起…我会让你更舒服的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3618',
        any: [/CFLAG:334 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3621-3623',
        any: [/PRINTFORMW 「额…啊啊…你的…感觉好热…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3621',
        any: [/PRINTFORMW 「额…啊啊…你的…感觉好热…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3622',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边快要哭了一般皱着眉，一边夹紧大腿继续着股间性交。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3623',
        any: [/PRINTFORMW 「这么做的话，我会有感觉的…啊…啊嗯…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3624',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3633-3841',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3635-3733',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3637-3710',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3639-3677',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3642',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3643',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%慢慢的沉下腰、能听到处女膜破裂的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3644',
        any: [
          /PRINTFORMW 「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3645',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的痛楚和为%SAVESTR:PLAYER%奉上处女的喜悦而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3646',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%握着%SAVESTR:TARGET%的腰，用阴茎放出了魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3647',
        any: [
          /PRINTFORMW 「啊啊啊…嗯嗯啊嗯啊…啊啊%UNICODE\(0x2661\) \*1% 啊啊…你的魔力…感觉到…了…啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3648',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体从内测被%SAVESTR:PLAYER%的魔力侵/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3649',
        any: [
          /PRINTFORMW 「啊啊…我的肚子里好热…啊嗯…恩啊…动吧…让我的小穴变得舒服起来…啊…啊啊啊%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3650',
        any: [/PRINTFORMW %SAVESTR:TARGET%生硬，但积极的动了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3651',
        any: [/PRINTFORMW 「啊…嗯…啊嗯…啊啊…啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3654',
        any: [
          /PRINTFORMW 「啊啊…第一次奉献给你…魔王大人…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3655',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PLAYER%上面慢慢沉下了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3656',
        any: [/PRINTFORMW 阴茎把蜜裂挤开、对准膣内插了进去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3657',
        any: [/PRINTFORMW 「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3658',
        any: [
          /PRINTFORMW 阴茎往深处前进，能感觉到处女膜破了。然后%SAVESTR:TARGET%终于把完全坐了下来、把%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3659',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的痛楚和为%SAVESTR:PLAYER%奉上处女的喜悦而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3660',
        any: [
          /PRINTFORMW 「啊啊啊啊…嗯啊%UNICODE\(0x2661\) \*1% 啊啊…现在不要动…我会让你舒服起来的…嗯/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3661',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%握着%SAVESTR:TARGET%的腰，用阴茎放出了魔力。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3662',
        any: [
          /PRINTFORMW 「啊啊…啊啊嗯啊！啊嗯…我的肚子里…你的魔力满满的注入进来了…啊…啊啊啊啊%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3663',
        any: [
          /PRINTFORMW 已经是魔族的%SAVESTR:TARGET%的身体从内测被%SAVESTR:PLAYER%的魔力侵/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3664',
        any: [
          /PRINTFORMW 「你的魔力在子宫里留下了标记…啊啊…我已经无法从你身边离开了…%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3667',
        any: [/PRINTFORMW 「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3668',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然跨在%SAVESTR:PLAYER%的上面就这样用蜜裂摩擦着阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3669',
        any: [
          /PRINTFORMW 恼羞成怒的%SAVESTR:PLAYER%抓着%SAVESTR:TARGET%的腰强行的压了下去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3670',
        any: [/PRINTFORMW 「啊！啊啊！不、不行！不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3671',
        any: [
          /PRINTFORMW 平时不会因为这种程度而失去平衡的%SAVESTR:TARGET%因为长时间的膝曲，沉下了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3672',
        any: [/PRINTFORMW 「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3673',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3674',
        any: [
          /PRINTFORMW 想要逃跑的%SAVESTR:TARGET%的腰被抓住，%SAVESTR:PLAYER%就这样从阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3675',
        any: [
          /PRINTFORMW 「啊啊…肚子…好热…不要…不要这样！我已经…不想…变得更加乱七八糟的了！…啊…啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3676',
        any: [
          /PRINTFORMW 然后%SAVESTR:PLAYER%为了让%SAVESTR:TARGET%明白到底谁是主人、阴茎慢/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3679-3709',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3681',
        any: [/PRINTFORMW 「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3682',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%慢慢的沉下腰、能听到处女膜破裂的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3683',
        any: [
          /PRINTFORMW 「呜…嗯啊啊…你那粗壮的…啊啊…已经完全征服了我的小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3684',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的痛楚和为%SAVESTR:PLAYER%奉上处女的喜悦而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3685',
        any: [
          /PRINTFORMW 「啊啊啊…啊啊…嗯啊…全部都由我来…你不动也没关系…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3686',
        any: [/PRINTFORMW %SAVESTR:TARGET%生硬，但积极的动了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3687',
        any: [/PRINTFORMW 「啊…嗯…啊嗯…啊啊…啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3690',
        any: [
          /PRINTFORMW 「啊啊…第一次奉献给你…魔王大人…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3691',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跨在%SAVESTR:PLAYER%上面慢慢沉下了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3692',
        any: [/PRINTFORMW 阴茎把蜜裂挤开、对准膣内插了进去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3693',
        any: [/PRINTFORMW 「嗯…啊啊啊…嗯…能感觉到…我的处女膜吗？啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3694',
        any: [
          /PRINTFORMW 阴茎往深处前进，能感觉到处女膜破了。然后%SAVESTR:TARGET%终于把完全坐了下来、把%S/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3695',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为破瓜的痛楚和为%SAVESTR:PLAYER%奉上处女的喜悦而/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3696',
        any: [
          /PRINTFORMW 「啊啊啊啊…嗯啊%UNICODE\(0x2661\) \*1% 啊啊…现在不要动…我会让你舒服起来的…嗯/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3697',
        any: [
          /PRINTFORMW 看见呼吸困难的%SAVESTR:TARGET%、%SAVESTR:PLAYER%开始从下面往上突刺/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3698',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊嗯！这样…不行…啊啊…嗯…快、快停下…啊啊…啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3701',
        any: [/PRINTFORMW 「嗯…嗯…稍、稍微等一下…我还没有心理准备…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3702',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然跨在%SAVESTR:PLAYER%的上面就这样用蜜裂摩擦着阴/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3703',
        any: [
          /PRINTFORMW 恼羞成怒的%SAVESTR:PLAYER%抓着%SAVESTR:TARGET%的腰强行的压了下去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3704',
        any: [/PRINTFORMW 「啊！啊啊！不、不行！不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3705',
        any: [
          /PRINTFORMW 平时不会因为这种程度而失去平衡的%SAVESTR:TARGET%因为长时间的膝曲，沉下了腰/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3706',
        any: [/PRINTFORMW 「啊啊啊…啊啊…咕…咦…啊啊啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3707',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%没放过这个机会，挺起了腰插了进去、滋的一声直接查到了蜜壶的最深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3708',
        any: [/PRINTFORMW 「怎么…怎么这样…咕…嗯嗯！还、还不要动…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3712-3732',
        any: [
          /PRINTFORMW 「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3715',
        any: [
          /PRINTFORMW 「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3716',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，腰下流的扭动着沉了下去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3717',
        any: [
          /PRINTFORMW 用又湿润又灼热的蜜壶包裹着%SAVESTR:PLAYER%的阴茎，不由得打了个寒颤。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3718',
        any: [
          /PRINTFORMW 「嗯啊啊%UNICODE\(0x2661\) \*1% …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3721',
        any: [/PRINTFORMW 「虽然很害羞…但是如果是你希望的话…这样从上面…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3722',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边红着脸，一边跨在%SAVESTR:PLAYER%上面，沉下了腰/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3723',
        any: [
          /PRINTFORMW 「啊嗯…我动就好了…嗯啊…啊…嗯…嗯…嗯啊啊…不行、这样欺负我的话…啊嗯%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3724',
        any: [
          /PRINTFORMW 配合着%SAVESTR:TARGET%的腰的上下移动，%SAVESTR:PLAYER%从下面往上顶/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3725',
        any: [
          /PRINTFORMW 「啊…啊啊！…呀啊…啊…嗯啊啊…你的插到最深处…了！啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3728',
        any: [
          /PRINTFORMW 「嗯啊…明明知道让我跨在你上面是多么愚蠢…嗯…啊啊啊！嗯、嗯啊！啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3729',
        any: [
          /PRINTFORMW 虽然看见%SAVESTR:TARGET%在嘟囔着什么，但%SAVESTR:PLAYER%毫不在意的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3730',
        any: [
          /PRINTFORMW 「啊…嗯…啊啊！嗯…啊嗯…真，真是的…为什么…我这样好像被喜欢着一样…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3731',
        any: [
          /PRINTFORMW 看着在%SAVESTR:PLAYER%的腰上跳舞一样的%SAVESTR:TARGET%、%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3734',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3737-3840',
        any: [
          /PRINTFORMW 「嗯啊啊…%UNICODE\(0x2661\) \*1% 你的阴茎…真好吃…啊啊%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3739-3766',
        any: [
          /PRINTFORMW 「嗯啊啊…%UNICODE\(0x2661\) \*1% 你的阴茎…真好吃…啊啊%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3741',
        any: [
          /PRINTFORMW 「嗯啊啊…%UNICODE\(0x2661\) \*1% 你的阴茎…真好吃…啊啊%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3742',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把%SAVESTR:PLAYER%的阴茎吞进了蜜壶的最深处、慢慢的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3743',
        any: [
          /PRINTFORMW 「啊啊…这样的话阴茎的尖端和我的子宫口…啊%UNICODE\(0x2661\) \*1% 就会咕啾咕啾的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3744',
        any: [
          /PRINTFORMW 随着腰部的圆周运动的持续，猥琐的词%SAVESTR:TARGET%嘴里漏了出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3745',
        any: [
          /PRINTFORMW 「我的小穴和这根肉棒咕噜咕噜的搅在一起最舒服了%UNICODE\(0x2661\) \*1% 啊啊%UN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3746',
        any: [
          /PRINTFORMW 「你到我去为止都要忍耐%UNICODE\(0x2661\) \*1% 啊啊…嗯啊啊啊嗯啊啊啊啊%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3748',
        any: [
          /PRINTFORMW 「啊嗯…嗯啊嗯…还想要阴茎%UNICODE\(0x2661\) \*1% 啊啊阴茎好棒%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3749',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%两只手牵在一起、蜜壶和阴茎摩擦着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3750',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘息着流着口水，一边上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3751',
        any: [
          /PRINTFORMW 「嗯啊啊啊…你的阴茎连深处都蹭到了，好舒服%UNICODE\(0x2661\) \*1% 继续侵犯，用你/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3752',
        any: [
          /PRINTFORMW 为了回应激烈的动着的%SAVESTR:PLAYER%。结合部咕啾咕啾的响着水声的%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3753',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…嗯…啊啊！阴茎好棒…好舒服…我的小穴要发疯了啊啊啊啊啊%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3755',
        any: [
          /PRINTFORMW 「啊嗯…嗯嗯…这样好舒服！继续插我的小穴…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3756',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%握住%SAVESTR:TARGET%的腰、不停的不停的向上插着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3757',
        any: [/PRINTFORMW %SAVESTR:TARGET%后仰着发出了叫声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3758',
        any: [
          /PRINTFORMW 「啊嗯…嗯啊啊啊啊…要怪掉了…我的下流小穴…子宫被弄得乱七八糟的！然后变得更舒服了啊啊啊啊啊啊%U/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3759',
        any: [
          /PRINTFORMW 听着已经可以说是尖叫的声音，%SAVESTR:PLAYER%继续侵犯着%SAVESTR:TARGE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3761',
        any: [
          /PRINTFORMW 「啊啊…就这样把阴茎插在里面生活明明是最棒的…嗯…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3762',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰沉在底部，就这样慢慢左右晃动，充分品味着阴茎的触感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3763',
        any: [
          /PRINTFORMW 「所以就这样一直抱着我…啊…如何？不行吗？嗯%UNICODE\(0x2661\) \*1% 不行的话，真/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3764',
        any: [
          /PRINTFORMW 「那么作为代替，这有现在也好，你要一直插在小学里…啊啊…啊嗯…啊嗯嗯啊%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3765',
        any: [/PRINTFORMW %SAVESTR:TARGET%想品味着着阴茎一样，继续动着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3767',
        any: [/CFLAG:335 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3770-3773',
        any: [
          /PRINTFORMW 「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3770',
        any: [
          /PRINTFORMW 「呵呵呵、我会让你舒服起来的…你什么都不用做也可以哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3771',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔着嘴唇，腰下流的扭动着沉了下去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3772',
        any: [
          /PRINTFORMW 用又湿润又灼热的蜜壶包裹着%SAVESTR:PLAYER%的阴茎，不由得打了个寒颤。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3773',
        any: [
          /PRINTFORMW 「嗯啊啊%UNICODE\(0x2661\) \*1% …你的阴茎又热又硬…啊嗯…腰自己动起来了…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3774',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3777-3796',
        any: [
          /PRINTFORMW 「啊嗯…啊啊啊…嗯啊…啊嗯…嗯…不要…绝对不要拔出来…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3778',
        any: [
          /PRINTFORMW 「啊嗯…啊啊啊…嗯啊…啊嗯…嗯…不要…绝对不要拔出来…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3779',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的蜜壶接受着%SAVESTR:PLAYER%的阴茎直到最深处、前后/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3780',
        any: [
          /PRINTFORMW 「啊啊！你的%UNICODE\(0x2661\) \*1% 在亲吻子宫口…啊…啊啊！我已经…啊嗯…啊啊啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3781',
        any: [/PRINTFORMW %SAVESTR:TARGET%喘着粗气，腰的动作激烈了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3783',
        any: [
          /PRINTFORMW 「啊嗯…恩…啊啊…嗯…嗯…我的…里面…更乱七八糟的了…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3784',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%和%SAVESTR:TARGET%两手牵在一起，发出着快乐的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3785',
        any: [
          /PRINTFORMW 「嗯…啊啊…好棒…好舒服%UNICODE\(0x2661\) \*1% 我已经离不开你了…啊啊%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3786',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰不停的动着、每动一次，都会漏出咕啾咕啾的水声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3788',
        any: [
          /PRINTFORMW 「我还想继续…感受你…啊啊…啊嗯嗯嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3789',
        any: [
          /PRINTFORMW 每次%SAVESTR:PLAYER%向上顶着腰，%SAVESTR:TARGET%都会漏出撒娇般的声/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3790',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…再…啊啊%UNICODE\(0x2661\) \*1% 啊嗯深一点%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3791',
        any: [
          /PRINTFORMW 看着%SAVESTR:TARGET%快乐的好像快融化一样的表情，%SAVESTR:PLAYER%更/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3793',
        any: [
          /PRINTFORMW 「啊嗯嗯%UNICODE\(0x2661\) \*1% 不行啊…这么用力…啊啊%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3794',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%否定的话飘出的同时，%SAVESTR:PLAYER%就那样抓住了腰/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3795',
        any: [/PRINTFORMW 子宫口被龟头挖着%SAVESTR:TARGET%立刻兴奋了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3796',
        any: [
          /PRINTFORMW 「啊啊啊啊%UNICODE\(0x2661\) \*1% 你的…你这样实在太H了，不行啊…啊啊啊啊%UN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3798',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3801-3805',
        any: [
          /PRINTFORMW 「虽然不太想这样…俯视你…啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3801',
        any: [
          /PRINTFORMW 「虽然不太想这样…俯视你…啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3802',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边红着脸一边跨在%SAVESTR:PLAYER%上面沉下了腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3803',
        any: [
          /PRINTFORMW 「嗯啊…我来动就好…嗯…啊…嗯…嗯…啊嗯…再激烈一点比较好吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3804',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%笨拙的上下动着腰、生疏而努力的奉仕着%SAVESTR:PLAYER/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3805',
        any: [
          /PRINTFORMW 「嗯…嗯…嗯啊…啊啊啊啊…嗯啊…啊啊…嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3806',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3809-3824',
        any: [
          /PRINTFORMW 「嗯啊…嗯啊！嗯嗯…要射出来了！…不然的话，我…啊啊！啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3810',
        any: [
          /PRINTFORMW 「嗯啊…嗯啊！嗯嗯…要射出来了！…不然的话，我…啊啊！啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3811',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰一扭一扭的上下动着、那已经完全“女人”的动作了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3812',
        any: [/PRINTFORMW 珍珠一样的汗水在额头反着光、渐渐漏出了喘息的声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3813',
        any: [/PRINTFORMW 「啊…嗯啊…啊嗯…啊啊…我的啊嗯…啊啊…啊啊啊…啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3815',
        any: [
          /PRINTFORMW 「啊嗯…恩…啊啊…啊啊…嗯…啊嗯！啊啊…被侵犯的这么深…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3816',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是要品味%SAVESTR:PLAYER%的阴茎一样上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3817',
        any: [/PRINTFORMW 偶尔狠狠撞击到深处时，就会漏出有趣的喘息声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3818',
        any: [
          /PRINTFORMW 「啊嗯啊啊…嗯…啊啊啊！…是、似的…我已经被你开发的…有感觉了…啊…啊嗯啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3820',
        any: [/PRINTFORMW 「啊啊…不要再这么顶了…嗯嗯…啊！嗯…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3821',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%插着、继续刺激着最敏感的地方。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3822',
        any: [
          /PRINTFORMW 一想到即使跨在%SAVESTR:PLAYER%身上也还是被夺走了主导权的屈辱，%SAVESTR:T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3823',
        any: [/PRINTFORMW 「嗯嗯…嗯…我已经…受不了了…啊啊啊啊啊…嗯…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3825',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3828-3831',
        any: [/PRINTFORMW 「嗯…嗯啊…啊嗯…恩…这、这样就可以了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3828',
        any: [/PRINTFORMW 「嗯…嗯啊…啊嗯…恩…这、这样就可以了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3829',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%笨拙的动着腰，看样子离有快感还很远。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3830',
        any: [/PRINTFORMW 「嗯啊…来吧，早点射出来吧…嗯…咕啊…啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3831',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%配合着%SAVESTR:TARGET%的腰动着、%SAVESTR:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3832',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3835-3838',
        any: [
          /PRINTFORMW 「我坐在上面…真够大意的…啊嗯…即使不掐住你的脖子，杀死你的方法…啊…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3835',
        any: [
          /PRINTFORMW 「我坐在上面…真够大意的…啊嗯…即使不掐住你的脖子，杀死你的方法…啊…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3836',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%在嘟囔着什么，但%SAVESTR:PLAYER%毫不在意的挺着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3837',
        any: [/PRINTFORMW 「啊…嗯…啊啊！啊…嗯啊…我…啊…这样…不行…的…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3838',
        any: [
          /PRINTFORMW 看着在%SAVESTR:PLAYER%的腰上跳舞一样的%SAVESTR:TARGET%、%SAVE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3839',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3848-3895',
        any: [/PRINTFORMW 「来，伸出手…这样帮你洗就行了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3850-3859',
        any: [/PRINTFORMW 「来，伸出手…这样帮你洗就行了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3853',
        any: [/PRINTFORMW 「来，伸出手…这样帮你洗就行了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3854',
        any: [
          /PRINTFORMW 「啊…啊嗯！不、不要欺负我啊！…啊…嗯嗯！就不能好好地洗澡么？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3857',
        any: [
          /PRINTFORMW 「啊啊…我也是个女孩子啊…把身体洗干净是很舒服…但是不得不洗你的身体什么的…啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3858',
        any: [/PRINTFORMW 「而我的身体………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3860',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3863-3894',
        any: [
          /PRINTFORMW 「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3866-3871',
        any: [
          /PRINTFORMW 「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3866',
        any: [
          /PRINTFORMW 「啊嗯啊…啊啊…把手指…插进我里面也可以呦…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3867',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边抱住%SAVESTR:PLAYER%互相摩擦着上半身、一边把%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3868',
        any: [
          /PRINTFORMW 「我的小穴…啊啊！要用你的手指来洗…啊啊…嗯！再粗暴些也没关系%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3869',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的喘息吹到了%SAVESTR:PLAYER%的耳边，腰颤抖，痉挛着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3870',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%的手指一根根的插了进去，搅拌着%SAVESTR:TARGET%的蜜/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3871',
        any: [
          /PRINTFORMW 「啊啊…我的身体…变干净了…嗯…啊嗯…啊啊…嗯…啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3872',
        any: [/CFLAG:336 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3875-3879',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…洗澡好舒服啊、啊啊…呵呵呵、有感觉养的地方吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3875',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…洗澡好舒服啊、啊啊…呵呵呵、有感觉养的地方吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3876',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱着%SAVESTR:PLAYER%，用肌肤摩擦着他的后背、勃起的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3877',
        any: [/PRINTFORMW 「这里痒的已经快受不了了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3878',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边坏笑着把手伸向%SAVESTR:PLAYER%的股间握住了阴茎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3879',
        any: [
          /PRINTFORMW 「啊啊…啊嗯…你的阴茎一抖一抖的…啊啊…洗起来好舒服！好舒服啊%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3880',
        any: [/CFLAG:336 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3883-3888',
        any: [
          /PRINTFORMW 「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3883',
        any: [
          /PRINTFORMW 「啊啊…嗯…嗯啊…我帮你洗的很舒服吧？嗯啊…啊啊…啊嗯…啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3884',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%把%SAVESTR:PLAYER%加到了泡沫中的胸部中间、摩擦着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3885',
        any: [
          /PRINTFORMW 「继续摸…我的胸部也可以…啊啊…所以老实的把澡洗完…嗯！嗯嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3887',
        any: [/PRINTFORMW 「总觉得想起了帮弟弟洗澡的时候………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3888',
        any: [/CFLAG:336 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3891-3892',
        any: [
          /PRINTFORMW 「老实点、这样我不是没法好好帮你洗了吗…啊嗯…嗯…啊啊！…喂、不要碰那里…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3891',
        any: [
          /PRINTFORMW 「老实点、这样我不是没法好好帮你洗了吗…啊嗯…嗯…啊啊！…喂、不要碰那里…啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3892',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开始用身体帮%SAVESTR:PLAYER%洗澡。%SAVESTR/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3893',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3902-4017',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…你的全部进来了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3904-3942',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…你的全部进来了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3908',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…你的全部进来了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3909',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%阴茎很美味似的吞了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3910',
        any: [/PRINTFORMW %SAVESTR:TARGET%左右晃动着腰，发出了喘息声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3911',
        any: [
          /PRINTFORMW 「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3913',
        any: [/PRINTFORMW 「你的全部进来了…啊啊…好、好紧…嗯…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3914',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那还未开发的肛门接受%SAVESTR:PLAYER%阴茎的话，似乎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3915',
        any: [/PRINTFORMW 「但是…我会努力变得有感觉的…嗯…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3920',
        any: [
          /PRINTFORMW 「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3921',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻易的吞下了，并紧紧包裹着%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3922',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边兴奋的喘着粗气，一边上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3923',
        any: [
          /PRINTFORMW 「我的肛门好舒服！…啊嗯…嗯啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3925',
        any: [/PRINTFORMW 「咕…好…紧…嗯啊啊啊…啊嗯…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3926',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那还未开发的肛门接受%SAVESTR:PLAYER%阴茎的话，似乎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3927',
        any: [
          /PRINTFORMW 「嗯啊…我来动…嗯…让你舒服起来…啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3932',
        any: [/PRINTFORMW 「嗯…嗯嗯！我的肛门啊…啊啊！嗯啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3933',
        any: [
          /PRINTFORMW 经由%SAVESTR:PLAYER%的手开发过的%SAVESTR:TARGET%的肛门轻易的接受了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3934',
        any: [/PRINTFORMW 「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3935',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%向上挺着腰侵犯着%SAVESTR:TARGET%肛门……・/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3937',
        any: [/PRINTFORMW 「咕…全都进来了…啊啊…好…好难受…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3938',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门，紧紧地包住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3939',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压住了腰，根本没法逃跑。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3940',
        any: [/PRINTFORMW 「啊啊…已、已经不行了…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3943',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3946-4014',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…你的全部进来了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3950',
        any: [
          /PRINTFORMW 「嗯…嗯啊…啊啊…你的全部进来了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3951',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发了的肛门把%SAVESTR:PLAYER%阴茎很美味似的吞了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3952',
        any: [/PRINTFORMW %SAVESTR:TARGET%左右晃动着腰，发出了喘息声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3953',
        any: [
          /PRINTFORMW 「嗯啊啊…那，差不多该认真的动起来了…啊嗯…恩…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3954',
        any: [
          /PRINTFORMW 「在我的肛门里…满满的射出来%UNICODE\(0x2661\) \*1% 让我的肛门怀孕吧%UNICO/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3956',
        any: [
          /PRINTFORMW 「嗯…嗯…嗯啊…啊啊…啊啊…我的肛门…实在太舒服了…啊啊啊啊啊%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3957',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3958',
        any: [
          /PRINTFORMW 就那样一口气插下去的话腰就会颤抖起来。那已经是沉浸在快感里的母猪的表情了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3959',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯啊%UNICODE\(0x2661\) \*1% 要融化了…肛门要融化了…啊啊——%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3961',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门把%SAVESTR:PLAYER%的阴茎直到根部都吞了下去、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3962',
        any: [/PRINTFORMW 配合着淫乱的腰的动作%SAVESTR:TARGET%漏出了喘息声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3963',
        any: [
          /PRINTFORMW 「啊嗯…嗯…嗯嗯…嗯啊嗯嗯%UNICODE\(0x2661\) \*1% 就这样前后懂的话…嗯！子宫的后/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3964',
        any: [
          /PRINTFORMW 「嗯！这、这样…插过来的话…啊啊啊啊！啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3965',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴里流出了唾液，%SAVESTR:PLAYER%就这样继续突刺着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3967',
        any: [/CFLAG:337 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3970-3973',
        any: [/PRINTFORMW 「你的全部进来了…啊啊…好、好紧…嗯…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3970',
        any: [/PRINTFORMW 「你的全部进来了…啊啊…好、好紧…嗯…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3971',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那还未开发的肛门接受%SAVESTR:PLAYER%阴茎的话，似乎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3972',
        any: [
          /PRINTFORMW 「嗯啊…只有你舒服也好…啊啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3973',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%继续在%SAVESTR:PLAYER%的上面动着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3974',
        any: [/CFLAG:337 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3978',
        any: [
          /PRINTFORMW 「啊啊啊！…全都插进来…把你的全都插进我的肛门…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3979',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发的肛门轻易的吞下了，并紧紧包裹着%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3980',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边兴奋的喘着粗气，一边上下动着腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3981',
        any: [
          /PRINTFORMW 「我的肛门好舒服！…啊嗯…嗯啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3983',
        any: [
          /PRINTFORMW 「啊啊…我的肛门…好有感觉…嗯…啊嗯…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3984',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰不停的动着、每次抬起腰把阴茎往外拔的时候，都会漏出快要融化一样/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3985',
        any: [/PRINTFORMW 就那样一口气插下去的话腰就会颤抖起来。。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3986',
        any: [
          /PRINTFORMW 「啊啊…你的好舒服！腰停不下来了…啊啊…啊嗯嗯啊嗯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3988',
        any: [
          /PRINTFORMW 「嗯…啊嗯…啊啊…因为被你开发的原因，肛门舒服的快要坏掉了…啊啊啊啊%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3989',
        any: [/PRINTFORMW %SAVESTR:TARGET%用力夹紧着肛门，前后摆动着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3990',
        any: [
          /PRINTFORMW 「啊啊…嗯、啊啊！嗯…从后面…啊啊…刺激子宫的感觉好舒服…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3991',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着快要融化一样的表情扭动着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3993',
        any: [/CFLAG:337 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3996-3999',
        any: [/PRINTFORMW 「咕…嗯…啊…啊啊…嗯啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3996',
        any: [/PRINTFORMW 「咕…嗯…啊…啊啊…嗯啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3997',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那还未开发的肛门接受%SAVESTR:PLAYER%阴茎的话，似乎/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3998',
        any: [
          /PRINTFORMW 「嗯啊…我来动…嗯…让你舒服起来…啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '3999',
        any: [/PRINTFORMW %SAVESTR:TARGET%笨拙的动着腰，继续这肛门的奉仕………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4000',
        any: [/CFLAG:337 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4003-4006',
        any: [/PRINTFORMW 「啊啊…腰擅自…动起来了…嗯…嗯啊…嗯…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4003',
        any: [/PRINTFORMW 「啊啊…腰擅自…动起来了…嗯…嗯啊…嗯…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4004',
        any: [
          /PRINTFORMW 经由%SAVESTR:PLAYER%的手开发过的%SAVESTR:TARGET%的肛门轻易的接受了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4005',
        any: [
          /PRINTFORMW 「啊啊…嗯啊…嗯…啊啊…啊…啊嗯嗯！再、再继续的话…啊啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4006',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%向上顶着腰，侵犯着%SAVESTR:TARGET%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4007',
        any: [/CFLAG:337 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4010-4013',
        any: [/PRINTFORMW 「啊…好、好紧…咕…嗯咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4010',
        any: [/PRINTFORMW 「啊…好、好紧…咕…嗯咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4011',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%未开发的肛门，紧紧地包住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4012',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%压住了腰，根本没法逃跑。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4013',
        any: [/PRINTFORMW 「快、快停下…啊啊…咕、啊嗯…啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4014',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4023-4066',
        any: [
          /PRINTFORMW 「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4025-4034',
        any: [
          /PRINTFORMW 「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4028',
        any: [
          /PRINTFORMW 「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4029',
        any: [/PRINTFORMW 「嗯…嗯嗯…嗯…啾…就…嗯啾…嗯…嗯啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4032',
        any: [
          /PRINTFORMW 「这么干怎么说都有点………唉、我明白的、不想干也得干对吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4033',
        any: [/PRINTFORMW 「嗯咕…呜…呜…啾…嗯…嗯啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4035',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4038-4065',
        any: [/PRINTFORMW 「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4041-4045',
        any: [/PRINTFORMW 「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4041',
        any: [/PRINTFORMW 「如果弄得很舒服的话…有奖励吧？…嗯、啊啊啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4042',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴的张开嘴一边下流的留着口水一边开始舔舐%SAVESTR:PLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4043',
        any: [
          /PRINTFORMW 「嗯咕…啾咕…啾…嗯…嗯啾…啾…你的肛门真美味…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼睛中的情欲松弛了下来、完全不在意的舔舐着%SAVESTR:PLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4045',
        any: [
          /PRINTFORMW 「你看、我要把舌头放进你的肛门里了…再放松点…嗯…嗯…啾…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4046',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4049-4052',
        any: [
          /PRINTFORMW 「啊啊…只是舔着你的肛门而已、就这么幸福什么的、我已经离不开你了…啾」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4049',
        any: [
          /PRINTFORMW 「啊啊…只是舔着你的肛门而已、就这么幸福什么的、我已经离不开你了…啾」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4050',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高兴地张开嘴伸出舌头、发出着水声舔舐着%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4051',
        any: [/PRINTFORMW 「嗯啾…啾…啾…嗯…嗯啾…啾…嗯…啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4052',
        any: [/PRINTFORMW 「啊啊…我给你当狗也可以…啾%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4053',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4056-4058',
        any: [
          /PRINTFORMW 「嗯…舔你的肛门什么的，明明应该很屈辱…嗯…嗯啊…啊啊…啾…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4056',
        any: [
          /PRINTFORMW 「嗯…舔你的肛门什么的，明明应该很屈辱…嗯…嗯啊…啊啊…啾…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4057',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘着粗气一边舔着%SAVESTR:PLAYER%的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4058',
        any: [/PRINTFORMW 「嗯啾…啾…嗯…啾…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4059',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4062-4063',
        any: [/PRINTFORMW 「嗯嗯…我的舌头…会烂掉的…嗯…嗯嗯…咕…嗯嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4062',
        any: [/PRINTFORMW 「嗯嗯…我的舌头…会烂掉的…嗯…嗯嗯…咕…嗯嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4063',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边眼里含着泪，一边服侍着%SAVESTR:PLAYER%的肛门…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4064',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4073-4109',
        any: [
          /PRINTFORMW 「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4076-4077',
        any: [
          /PRINTFORMW 「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4076',
        any: [
          /PRINTFORMW 「呃…学别人拷问我么？你这么干的话，很容易就能忍住吧……嗯！啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4077',
        any: [
          /PRINTFORMW 「嗯？…打屁股吗！？…啊啊！我明明已经不是小孩子了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4078',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4081-4107',
        any: [
          /PRINTFORMW 「再继续打我的屁股！啊啊啊！呀…呀啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4084-4087',
        any: [
          /PRINTFORMW 「再继续打我的屁股！啊啊啊！呀…呀啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4084',
        any: [
          /PRINTFORMW 「再继续打我的屁股！啊啊啊！呀…呀啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4085',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着被打屁股而发出了娇喘、身体一抖一抖的痉挛了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4086',
        any: [
          /PRINTFORMW 「被你打屁股…啊啊…好舒服…啊啊…啊啊啊——%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4087',
        any: [
          /PRINTFORMW 「啊嗯…我的身体辩证这样，你要负责任啊…啊嗯…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4088',
        any: [/CFLAG:TARGET:341 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4091-4094',
        any: [
          /PRINTFORMW 「啊啊…这么中意我的屁股的话…啊嗯…用咬的…就这样吃下去也可以呦…啊嗯%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4091',
        any: [
          /PRINTFORMW 「啊啊…这么中意我的屁股的话…啊嗯…用咬的…就这样吃下去也可以呦…啊嗯%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4092',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被打屁股而漏出了娇喘。连疼痛都变成快感而露出了痴迷的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4093',
        any: [/PRINTFORMW 「啊嗯…啊啊…你真是坏心眼、只打我的屁股………啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4094',
        any: [/PRINTFORMW 「我想做的事却全都不做…啊…啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4095',
        any: [/CFLAG:TARGET:341 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4098-4100',
        any: [
          /PRINTFORMW 「嗯…不要…啊啊…这个打的方式…啊啊啊…和父亲大人打我的方式好像…嗯…咕！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4098',
        any: [
          /PRINTFORMW 「嗯…不要…啊啊…这个打的方式…啊啊啊…和父亲大人打我的方式好像…嗯…咕！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4099',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%想起了曾经屈辱的感觉，一边含着眼泪一边继续被打着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4100',
        any: [
          /PRINTFORMW 「啊…啊啊…对不起对不起…明明输了还…啊啊…这么屈辱的活着！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4101',
        any: [/CFLAG:TARGET:341 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4103',
        any: [/ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4104-4105',
        any: [/PRINTFORMW 「不更用力的话…啊…不会痛哦…啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4104',
        any: [/PRINTFORMW 「不更用力的话…啊…不会痛哦…啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4105',
        any: [/PRINTFORMW %SAVESTR:TARGET%被打着屁股依然笑着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4106',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4115-4166',
        any: [
          /PRINTFORMW 「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4118-4119',
        any: [
          /PRINTFORMW 「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4118',
        any: [
          /PRINTFORMW 「啊啊、终于用对待俘虏的方式对待我了。来，照你想的去做吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4119',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起来很高兴的接受着%SAVESTR:PLAYER%的鞭打………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4120',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4123-4164',
        any: [
          /PRINTFORMW 「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4126-4127',
        any: [
          /PRINTFORMW 「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4126',
        any: [
          /PRINTFORMW 「啊啊…想要你的鞭子…你的惩罚…做了很多不好的事情哦…啊嗯…啊啊…请继续用鞭子打我！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4127',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被%SAVESTR:PLAYER%打都发出了好像是故意一样的喘/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4128',
        any: [/CFLAG:TARGET:342 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4131-4132',
        any: [
          /PRINTFORMW 「啊嗯…啊啊嗯！我的身体好像变奇怪了…啊嗯…你的鞭子很舒服什么的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4131',
        any: [
          /PRINTFORMW 「啊嗯…啊啊嗯！我的身体好像变奇怪了…啊嗯…你的鞭子很舒服什么的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4132',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被%SAVESTR:PLAYER%鞭打都会发出娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4133',
        any: [/CFLAG:TARGET:342 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4136-4137',
        any: [/PRINTFORMW 「啊嗯…啊啊啊…呵呵呵、这样…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4136',
        any: [/PRINTFORMW 「啊嗯…啊啊啊…呵呵呵、这样…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4137',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就这样被%SAVESTR:PLAYER%用鞭子抽打着，缩成了一团…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4138',
        any: [/CFLAG:TARGET:342 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4141-4142',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…继续打我！让我感受你的爱%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4141',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…继续打我！让我感受你的爱%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4142',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被%SAVESTR:PLAYER%打都发出了好像是故意一样的喘/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4143',
        any: [/CFLAG:TARGET:342 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4146-4147',
        any: [
          /PRINTFORMW 「嗯…呵呵呵、感受到了你的爱了…啊啊！就、就是那里…啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4146',
        any: [
          /PRINTFORMW 「嗯…呵呵呵、感受到了你的爱了…啊啊！就、就是那里…啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4147',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被%SAVESTR:PLAYER%鞭打都会发出娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4148',
        any: [/CFLAG:TARGET:342 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4151-4152',
        any: [
          /PRINTFORMW 「啊啊…用鞭子让我屈服，这是不相信我啊…啊啊…那就继续打吧…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4151',
        any: [
          /PRINTFORMW 「啊啊…用鞭子让我屈服，这是不相信我啊…啊啊…那就继续打吧…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4152',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就这样被%SAVESTR:PLAYER%用鞭子抽打着，缩成了一团…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4153',
        any: [/CFLAG:TARGET:342 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4156-4157',
        any: [/PRINTFORMW 「啊啊…由你继续在我的背上刻上伤痕吧…啊…啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4156',
        any: [/PRINTFORMW 「啊啊…由你继续在我的背上刻上伤痕吧…啊…啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4157',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被%SAVESTR:PLAYER%鞭打都会发出娇喘………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4158',
        any: [/CFLAG:TARGET:342 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4160',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4161-4162',
        any: [
          /PRINTFORMW 「咕…啊啊！呵呵呵…真不愧是这个鞭子，不是一般的疼啊…上次打出来的红肿还这么显眼，看样子消肿还要很/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4161',
        any: [
          /PRINTFORMW 「咕…啊啊！呵呵呵…真不愧是这个鞭子，不是一般的疼啊…上次打出来的红肿还这么显眼，看样子消肿还要很/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4162',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边开着玩笑一边承受着%SAVESTR:PLAYER%的鞭子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4163',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4172-4226',
        any: [
          /PRINTFORMW 「呵呵呵、用针扎人的话，不扎像指甲缝之类更疼的地方可是没用的呦…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4175',
        any: [
          /PRINTFORMW 「呵呵呵、用针扎人的话，不扎像指甲缝之类更疼的地方可是没用的呦…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4176',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4179-4224',
        any: [
          /PRINTFORMW 「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4182-4185',
        any: [
          /PRINTFORMW 「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4182',
        any: [
          /PRINTFORMW 「啊啊…嗯…把针扎刺进我勃起的乳头里吧…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4183',
        any: [
          /PRINTFORMW 「这样我就能高潮了…啊啊…喂、求你了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4184',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%听从了%SAVESTR:TARGET%的愿望、把针刺进了乳头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4185',
        any: [/PRINTFORMW 「咕啊…啊啊…呀——！好厉害…啊啊…去了啊啊啊——！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4186',
        any: [/CFLAG:TARGET:343 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4189-4190',
        any: [
          /PRINTFORMW 「啊啊…继续刺下来…啊…啊啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4189',
        any: [
          /PRINTFORMW 「啊啊…继续刺下来…啊…啊啊…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4190',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TARGET%所愿的那样，把针一根根的深深插入/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4191',
        any: [/CFLAG:TARGET:343 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4194-4195',
        any: [/PRINTFORMW 「啊啊！…嗯啊…咕…痛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4194',
        any: [/PRINTFORMW 「啊啊！…嗯啊…咕…痛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4195',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被针扎着，流着血………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4196',
        any: [/CFLAG:TARGET:343 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4199-4202',
        any: [/PRINTFORMW 「不要这么普通的用针扎啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4199',
        any: [/PRINTFORMW 「不要这么普通的用针扎啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4200',
        any: [
          /PRINTFORMW 「如果想让我成为你的东西的话…把我的…把我的双眼缝起来，手脚缝在一起…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4201',
        any: [/PRINTFORMW 「我一直就这样等着你…什么时候都可以…啊啊！嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4202',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%为了%SAVESTR:TARGET%安静下来，姑且先扎了嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4203',
        any: [/CFLAG:TARGET:343 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4206-4207',
        any: [/PRINTFORMW 「啊啊…扎得再深一点…不这样的话感觉不到疼啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4206',
        any: [/PRINTFORMW 「啊啊…扎得再深一点…不这样的话感觉不到疼啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4207',
        any: [
          /PRINTFORMW 如%SAVESTR:TARGET%所愿的那样，针一根根的深深插入%SAVESTR:TARGET%的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4208',
        any: [/CFLAG:TARGET:343 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4211-4212',
        any: [/PRINTFORMW 「啊啊…被你扎好舒服…呜…咕…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4211',
        any: [/PRINTFORMW 「啊啊…被你扎好舒服…呜…咕…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4212',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出着被针扎着，流着血的身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4213',
        any: [/CFLAG:TARGET:343 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4216-4217',
        any: [/PRINTFORMW 「啊啊…你的针…啊嗯…深一点…嗯…啊啊…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4216',
        any: [/PRINTFORMW 「啊啊…你的针…啊嗯…深一点…嗯…啊啊…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4217',
        any: [/PRINTFORMW %SAVESTR:TARGET%的皮肤上到处都流着血、喘着粗气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4218',
        any: [/CFLAG:TARGET:343 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4221-4222',
        any: [
          /PRINTFORMW 「嗯…嗯…咕…嗯！……呵呵呵、还早得很呢…就这样…还没发让我屈服」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4221',
        any: [
          /PRINTFORMW 「嗯…嗯…咕…嗯！……呵呵呵、还早得很呢…就这样…还没发让我屈服」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4222',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着有余裕的表情露出了沾满鲜血的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4223',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4233-4276',
        any: [
          /PRINTFORMW 「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4236-4237',
        any: [
          /PRINTFORMW 「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4236',
        any: [
          /PRINTFORMW 「呵呵呵、拷问也好调教也好、遮断感觉都是常用手段呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4237',
        any: [/PRINTFORMW %SAVESTR:TARGET%呼的一笑，戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4238',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4241-4274',
        any: [
          /PRINTFORMW 「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4244',
        any: [
          /PRINTFORMW 「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4245',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4248',
        any: [/PRINTFORMW 「蒙上眼的话…啊啊…敏感度好像确实提高了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4249',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4252',
        any: [/PRINTFORMW 「啊啊、好像兴奋起来了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4253',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4256',
        any: [
          /PRINTFORMW 「不光蒙眼…也用绳子把我帮上的话我会很高兴的…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4257',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4260',
        any: [/PRINTFORMW 「蒙上眼的话…啊啊…敏感度好像确实提高了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4261',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4264',
        any: [/PRINTFORMW 「想对我恶作剧吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4265',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4268',
        any: [/PRINTFORMW 「啊啊、蒙着眼真好…来吧、玩弄我的身体吧………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4269',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4272',
        any: [/PRINTFORMW 「呵呵呵、还要蒙着眼玩吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4273',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4278-4292',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4281',
        any: [/PRINTFORMW 「呵呵呵、玩得很高兴」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4282',
        any: [/CFLAG:380 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4285',
        any: [/PRINTFORMW 「呵呵呵、玩得很高兴」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4286',
        any: [/CFLAG:380 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4287-4290',
        any: [/ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4289',
        any: [/PRINTFORMW 「呵呵呵、玩得很高兴」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4290',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4299-4348',
        any: [/PRINTFORMW 「呵呵呵、你束缚还真熟练呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4302-4303',
        any: [/PRINTFORMW 「呵呵呵、你束缚还真熟练呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4302',
        any: [/PRINTFORMW 「呵呵呵、你束缚还真熟练呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4303',
        any: [
          /PRINTFORMW 「啊啊…不过如果不绑的更紧的话，我很容易就能从绳子里出来哦？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4304',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4307-4346',
        any: [
          /PRINTFORMW 「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4310-4311',
        any: [
          /PRINTFORMW 「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4310',
        any: [
          /PRINTFORMW 「啊啊…更多的触碰…我被束缚的身体…啊嗯…感受我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4311',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4312',
        any: [/CFLAG:TARGET:345 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4315-4316',
        any: [
          /PRINTFORMW 「啊啊…被这么紧的绑住的话…啊啊…就算是我也…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4315',
        any: [
          /PRINTFORMW 「啊啊…被这么紧的绑住的话…啊啊…就算是我也…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4316',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被绳子束缚着，漏出了快融化一样的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4317',
        any: [/CFLAG:TARGET:345 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4320-4321',
        any: [/PRINTFORMW 「呵呵呵、让我更尽兴吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4320',
        any: [/PRINTFORMW 「呵呵呵、让我更尽兴吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4321',
        any: [/PRINTFORMW %SAVESTR:TARGET%被绳子绑了起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4322',
        any: [/CFLAG:TARGET:345 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4325-4326',
        any: [
          /PRINTFORMW 「喂…我漂亮吗…？ 被你用绳子绑起来…啊啊…没法反抗………%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4325',
        any: [
          /PRINTFORMW 「喂…我漂亮吗…？ 被你用绳子绑起来…啊啊…没法反抗………%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的身体被绳子束缚住、乳房像要飞出来一样被绳子挤在一起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4327',
        any: [/CFLAG:TARGET:345 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4330-4331',
        any: [
          /PRINTFORMW 「啊啊…被绑起来的话…我也、啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4330',
        any: [
          /PRINTFORMW 「啊啊…被绑起来的话…我也、啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4331',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被绳子束缚着，漏出了快融化一样的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4332',
        any: [/CFLAG:TARGET:345 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4335-4336',
        any: [
          /PRINTFORMW 「啊啊…如果是以前我很快就能从绳子里出来…被你绑的话就什么都办不到了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4335',
        any: [
          /PRINTFORMW 「啊啊…如果是以前我很快就能从绳子里出来…被你绑的话就什么都办不到了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4336',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被绳子绑着而陶醉着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4337',
        any: [/CFLAG:TARGET:345 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4340-4341',
        any: [/PRINTFORMW 「啊啊啊、绳子勒得好紧…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4340',
        any: [/PRINTFORMW 「啊啊啊、绳子勒得好紧…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4341',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为被绳子绑着而陶醉着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4342',
        any: [/CFLAG:TARGET:345 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4345',
        any: [
          /PRINTFORMW 「嗯…呵呵呵、果然被这么紧的绑住的话…啊啊…还真是逃不了呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4351-4364',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4354',
        any: [/PRINTFORMW 「啊嗯…还不要解开绳子啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4355',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4358',
        any: [/PRINTFORMW 「明明还想继续被绑起来…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4359',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4361-4362',
        any: [/ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4362',
        any: [/PRINTFORMW 「这就解开了么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4363',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4372-4456',
        any: [/PRINTFORMW 「啊啊…就这样让我戴上口枷…要做很过分的事吗………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4375',
        any: [/PRINTFORMW 「啊啊…就这样让我戴上口枷…要做很过分的事吗………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4376',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4379-4454',
        any: [
          /PRINTFORMW 「我舒服起来之后一直都很吵呢…没办法呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4382-4388',
        any: [
          /PRINTFORMW 「我舒服起来之后一直都很吵呢…没办法呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4382',
        any: [
          /PRINTFORMW 「我舒服起来之后一直都很吵呢…没办法呢……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4383',
        any: [/PRINTFORM %SAVESTR:TARGET%自己戴上了口枷/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4385',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4387',
        any: [/PRINTW 眼神快融化了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4389',
        any: [/CFLAG:TARGET:346 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4392-4398',
        any: [/PRINTFORMW 「啊啊、带上这个…总觉得怪怪的…嗯咕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4392',
        any: [/PRINTFORMW 「啊啊、带上这个…总觉得怪怪的…嗯咕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4393',
        any: [/PRINTFORM %SAVESTR:TARGET%被按上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4395',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4397',
        any: [/PRINTW 眼神快融化了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4399',
        any: [/CFLAG:TARGET:346 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4402-4408',
        any: [/PRINTFORMW 「我的嘴想要的明明不是这个…嗯…嗯咕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4402',
        any: [/PRINTFORMW 「我的嘴想要的明明不是这个…嗯…嗯咕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4403',
        any: [/PRINTFORM %SAVESTR:TARGET%被戴上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4405',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4407',
        any: [/PRINTW 皱着眉看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4409',
        any: [/CFLAG:TARGET:346 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4412-4418',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4412',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4413',
        any: [/PRINTFORM %SAVESTR:TARGET%被按上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4415',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4417',
        any: [/PRINTW 眼神快融化………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4419',
        any: [/CFLAG:TARGET:346 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4422-4428',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4422',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4423',
        any: [/PRINTFORM %SAVESTR:TARGET%被按上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4425',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4427',
        any: [/PRINTW 眼神快融化………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4429',
        any: [/CFLAG:TARGET:346 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4432-4438',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4432',
        any: [/PRINTFORMW 「啊嗯…恩…嗯咕………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4433',
        any: [/PRINTFORM %SAVESTR:TARGET%被按上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4435',
        any: [/PRINTW 嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4437',
        any: [/PRINTW 皱着眉看着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4439',
        any: [/CFLAG:TARGET:346 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4442-4448',
        any: [
          /PRINTFORMW 「嗯啊…被装上口枷的话，总觉得脑袋都要变成傻瓜了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4442',
        any: [
          /PRINTFORMW 「嗯啊…被装上口枷的话，总觉得脑袋都要变成傻瓜了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4443',
        any: [/PRINTFORM %SAVESTR:TARGET%被按上了口塞/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4445',
        any: [/PRINTW  嘴的缝隙里，漏出了灼热的吐息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4447',
        any: [/PRINTW 眼神快融化………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4449',
        any: [/CFLAG:TARGET:346 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4452-4453',
        any: [/PRINTFORMW 「啊咕…嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4452',
        any: [/PRINTFORMW 「啊咕…嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4453',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被口塞堵住的嘴的缝隙里，漏出了声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4454',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4459-4476',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4462-4463',
        any: [/PRINTFORMW 「啊啊…嗯…嗯啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4462',
        any: [/PRINTFORMW 「啊啊…嗯…嗯啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4463',
        any: [/PRINTFORMW 取下了口塞的%SAVESTR:TARGET%的嘴里，流下了唾液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4464',
        any: [/CFLAG:386 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4467-4468',
        any: [/PRINTFORMW 「啊啊…嗯…嗯啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4467',
        any: [/PRINTFORMW 「啊啊…嗯…嗯啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4468',
        any: [/PRINTFORMW 取下了口塞的%SAVESTR:TARGET%的嘴里，流下了唾液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4469',
        any: [/CFLAG:386 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4472-4473',
        any: [/PRINTFORMW 「呼啊…嗯啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4472',
        any: [/PRINTFORMW 「呼啊…嗯啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4473',
        any: [/PRINTFORMW 取下了口塞的%SAVESTR:TARGET%的嘴里，流下了唾液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4474',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4483-4529',
        any: [
          /PRINTFORMW 「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4486-4488',
        any: [
          /PRINTFORMW 「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4486',
        any: [
          /PRINTFORMW 「啊啊…嗯啊啊啊…！肚子…啊啊啊…好痛苦…嗯…嗯…快…快停下！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4487',
        any: [
          /PRINTFORMW 就算是%SAVESTR:TARGET%，被这样大量的灌肠也开始哭着请求%SAVESTR:PLAYE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4488',
        any: [/PRINTFORMW 「求、求你了…至少…厕所…呀…啊咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4489',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4492-4527',
        any: [
          /PRINTFORMW 「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4495-4497',
        any: [
          /PRINTFORMW 「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4495',
        any: [
          /PRINTFORMW 「啊啊！继续…继续把灌肠液灌进来！到我的肚子撑起来为止%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4496',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%如%SAVESTR:TARGET%所愿一次次的灌着肠、插着肛塞的肛/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4497',
        any: [
          /PRINTFORMW 「啊啊…啊啊啊…这个拔掉的话…会很厉害的喷出来吧…啊啊…啊啊嗯啊%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4498',
        any: [/CFLAG:347 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4501-4503',
        any: [/PRINTFORMW 「啊呜…肚子…啊啊…这么…难受…啊啊…嗯啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4501',
        any: [/PRINTFORMW 「啊呜…肚子…啊啊…这么…难受…啊啊…嗯啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4502',
        any: [/PRINTFORMW %SAVESTR:TARGET%带着痛苦的表情忍耐着灌肠液的热度。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4503',
        any: [/PRINTFORMW 「啊啊…我最害羞的地方…被盯着…啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4504',
        any: [/CFLAG:347 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4507-4509',
        any: [
          /PRINTFORMW 「啊…啊嗯嗯！肚子里…全时灌肠液…嗯啊…这样我还有感觉什么的…%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4507',
        any: [
          /PRINTFORMW 「啊…啊嗯嗯！肚子里…全时灌肠液…嗯啊…这样我还有感觉什么的…%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4508',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边喘着粗气一边感受着灌肠液的刺激。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4509',
        any: [
          /PRINTFORMW 「啊啊…你的话即使要看我最害羞的地方…啊啊也可以啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4510',
        any: [/CFLAG:347 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4513-4515',
        any: [/PRINTFORMW 「啊啊…求你了…只、只有你…啊啊不想让你看见！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4513',
        any: [/PRINTFORMW 「啊啊…求你了…只、只有你…啊啊不想让你看见！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4514',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边流着泪，一边恳求着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4515',
        any: [/PRINTFORMW 「啊咕…灌、灌肠液好热！…啊啊…啊啊咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4516',
        any: [/CFLAG:347 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4519-4521',
        any: [
          /PRINTFORMW 「嗯啊…啊嗯！…我的肚子…啊啊…咕噜咕噜的响着…啊啊…啊嗯嗯嗯——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4519',
        any: [
          /PRINTFORMW 「嗯啊…啊嗯！…我的肚子…啊啊…咕噜咕噜的响着…啊啊…啊嗯嗯嗯——！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在灌肠液的刺激下，一边流着汗，一边漏出了喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4521',
        any: [/PRINTFORMW 而插上肛塞的时候，发出的声音格外的响………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4522',
        any: [/CFLAG:347 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4525-4526',
        any: [/PRINTFORMW 「不要…啊啊不要！啊啊…！不要这样！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4525',
        any: [/PRINTFORMW 「不要…啊啊不要！啊啊…！不要这样！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4526',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和想起了以前的屈辱而哭泣着，%SAVESTR:PLAYER%毫不留/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K8_スペード.ERB',
        ref: '4527',
        any: [/CFLAG:347 = 2/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
