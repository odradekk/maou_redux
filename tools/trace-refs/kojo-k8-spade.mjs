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
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
