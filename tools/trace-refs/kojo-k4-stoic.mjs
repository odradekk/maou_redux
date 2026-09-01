// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k4-stoic.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k4-stoic.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '61-65',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '63',
        any: [/FLAG:104 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '67-69',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '75-230',
        any: [
          /PRINTFORMW 「如果以为我和那些在魔界堕落的同胞一样，就大错特错啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '76-77',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '78-79',
        any: [/SIF TALENT:164 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '88',
        any: [
          /PRINTFORMW 「如果以为我和那些在魔界堕落的同胞一样，就大错特错啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '89',
        any: [/PRINTFORMW 「流淌着的高贵血脉，绝不会被你玷污！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '92',
        any: [/PRINTFORMW 「身为精灵勇者的我，不可能屈从于黑暗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '93',
        any: [/PRINTFORMW 「哪怕同伴都在淫威下屈服了……我也坚贞不屈！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '95',
        any: [/PRINTFORMW 「…原来如此，用这样的牢狱来封住我的力量啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '96',
        any: [/PRINTFORMW 「哼，卑鄙。这都是徒劳的笑话罢了，我绝不屈服。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '100',
        any: [/PRINTFORMW 这么说着、%SAVESTR:TARGET%推了推眼镜…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '109',
        any: [
          /PRINTFORMW 将看了那水晶球的事告诉了%SAVESTR:TARGET%之后，她的脸色苍白了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '110',
        any: [
          /PRINTFORMW 「………和别人私通的家伙摆出这样的脸，怎么，准备哭了么是要？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '111',
        any: [
          /PRINTFORMW 「我……被狂王抱着，感受到了无上的快乐……那样……可耻……可耻的姿态……哇……呜呜呜……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '112',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%泪流满面。对背叛%SAVESTR:PLAYER%感到后悔，或对被狂王弄得高潮感到悔恨，也许两者都有吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '117',
        any: [
          /PRINTFORMW 「唉……曾经背叛过的我，已经没资格再成为魔王的东西了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '118',
        any: [/PRINTFORMW 「我只是战败之身，要杀要剐，悉随尊便。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '129',
        any: [/PRINTFORMW 「哼……都是徒劳的，徒劳的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '136',
        any: [/PRINTFORMW 「我，是怎么了？不！我还是我！还是我！不会屈服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '143',
        any: [
          /PRINTFORMW 「再，再也受不了啦……哇！呜呜……是我输了……多么屈辱啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '150',
        any: [/PRINTFORMW %SAVESTR:TARGET%一贯以来的冷静感完全消失了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '151',
        any: [/PRINTFORMW 彻底成为了一只被快感所俘虏的牝奴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '152',
        any: [
          /PRINTFORMW 四脚爬爬，扭动着腰，用炽热的视线仰视着%CALLNAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '153',
        any: [
          /PRINTFORMW 「我，我不行了……我是肉棒最忠实的奴隶！……唔…喔……请，请给我……肉棒！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '160',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地向%CALLNAME:MASTER%表白了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '161',
        any: [
          /PRINTFORMW 「我其实留意了很久了，魔王大人有着与众不同闪光点……啊～不不～不要说这种多余的话！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '162',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%有点手足无措，看了%CALLNAME:MASTER%一眼，红着脸，说「魔王大人……以后，请让我侍奉左右吧……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '163',
        any: [/PRINTFORMW %SAVESTR:TARGET%顺势跪下，亲吻着你的手。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '169',
        any: [/CALL K4_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '229',
        any: [/CALL K4_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '236-450',
        any: [/PRINTFORMW 「你这肮脏可悲的生物……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '240',
        any: [/PRINTFORMW 「你这肮脏可悲的生物……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '241',
        any: [/PRINTFORM %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '244',
        any: [/PRINTFORM 眼镜下/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '245',
        any: [/PRINTFORMW 的目光异常冰冷…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '253',
        any: [/PRINTFORMW 「别逗我笑了，就凭你是无法得到我的心的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '256',
        any: [/PRINTFORMW 「到底想我怎么样嘛……？这，这样的话……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '258',
        any: [/PRINTFORMW 「我不觉得你能搞定我啊。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '268',
        any: [/PRINTFORMW 「你这家伙……才不会输给你这样的家伙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '271',
        any: [/PRINTFORMW 「我很坚强……我……没事的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '273',
        any: [/PRINTFORMW 「你，想干嘛？不不，不要去想这些……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '284',
        any: [/PRINTFORMW 「可恶……不是这样的，事情不是这样的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '287',
        any: [/PRINTFORMW 「至少……请不要弄痛我……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '289',
        any: [/PRINTFORMW 「别开玩笑了……这样的事……不该有的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '300',
        any: [/PRINTFORMW 「哼……你高兴就好……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '303',
        any: [/PRINTFORMW 「啊……这样的话……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '305',
        any: [/PRINTFORMW 「这场胜负……是我输了吗……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '317',
        any: [/PRINTFORMW 「比对鲜血还要渴求……人家，已经忍不住了啦…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '319',
        any: [/PRINTFORMW 「来把我弄满满地吧……呵呵～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '321',
        any: [/PRINTFORMW 「我的高贵血脉……就献给魔王大人吧～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '325',
        any: [
          /PRINTFORMW 「嗯～不要再让人家等啦～快用肉棒，狠狠地干坏我的穴啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '327',
        any: [/PRINTFORMW 「啊…！肉棒终于来了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '329',
        any: [
          /PRINTFORMW 「嘻嘻，从今早开始，腹中就一直在叫想被肉棒塞满啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '336',
        any: [/PRINTFORMW 「今天也请来看我自慰吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '340',
        any: [/PRINTFORMW 「子宫疼得没办法了啦……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '344',
        any: [/PRINTFORMW 「今天也请用菊花把我操去吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '348',
        any: [/PRINTFORMW 「人家的乳头，已经完全勃起了啦……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '354',
        any: [/PRINTFORMW 「嘻嘻，还想更多更多地去欺负别人……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '358',
        any: [/PRINTFORMW 「啊……请尽情地欺负作为下贱母猪的我吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '364',
        any: [/PRINTFORMW 「那个，能早点去外面吗？在房间里不够刺激啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '370',
        any: [/PRINTFORMW 「啊……好像快点交配啊……我……只是只牝兽…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '376',
        any: [/PRINTFORMW 「请对着作为肉便器的我，尽情地排泄吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '382',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼镜后的双眼已经被情欲的火焰点燃了…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '393',
        any: [/PRINTFORMW 「作为黑暗勇者的我，会常伴您左右……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '395',
        any: [/PRINTFORMW 「你的愉悦，我的幸福……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '397',
        any: [/PRINTFORMW 「来下命令吧。你的话，我什么都会听从的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '401',
        any: [/PRINTFORMW 「呵呵～来啦？　今天也要好好疼爱人家啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '403',
        any: [/PRINTFORMW 「能被你抱着……啊……真是迫不及待啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '405',
        any: [/PRINTFORMW 「今天也请温柔地对人家吧…。人家已经做好准备啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '412',
        any: [/PRINTFORMW 「看看啊……我这……羞耻的样子……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '416',
        any: [/PRINTFORMW 「来一次灵肉交汇的爱爱吧！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '420',
        any: [/PRINTFORMW 「后面的小穴，已经想你想得发疼了……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '424',
        any: [/PRINTFORMW 「请彻底地玩弄我的胸部吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '430',
        any: [/PRINTFORMW 「来玩严厉PLAY吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '434',
        any: [/PRINTFORMW 「请对作为牝奴隶的我赐予恩惠……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '440',
        any: [/PRINTFORMW 「今天会带我去哪里么……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '446',
        any: [/PRINTFORMW %SAVESTR:TARGET%眼镜后的双眼已经被爱的火焰点燃了…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '456-515',
        any: [/PRINTFORMW 「可恶！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '457-458',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '459-460',
        any: [/SIF TALENT:164 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '463-464',
        any: [/SIF BASE:0 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '472',
        any: [/PRINTFORMW 「可恶！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '478',
        any: [/PRINTFORMW 「哈哈……就这，这种程度……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '484',
        any: [/PRINTFORMW 「还没，还不能屈服！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '490',
        any: [/PRINTFORMW 「已……已经不行了啊……我回不去了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '496',
        any: [/PRINTFORMW 「请……请再用肉棒蹂躏我………可以吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '501',
        any: [/PRINTFORMW 「要……要死了！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '507',
        any: [/PRINTFORMW 「嘻嘻，这次也很完美～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '512',
        any: [/PRINTFORMW 「呆子，就不能对人家再温柔些吗？…坏人～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '521-3092',
        any: [/PRINTFORMW 「唔～唔……」「哼，这不挺配合的嘛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '523',
        any: [/;SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '526-543',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '533',
        any: [/CALL DOG_KOJO_4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '541',
        any: [/CALL COLOSSEUM_KOJO_4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '556',
        any: [/PRINTFORMW 「唔～唔……」「哼，这不挺配合的嘛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '559',
        any: [/PRINTFORMW 「讨厌！这变态！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '567',
        any: [
          /PRINTFORMW 「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '571',
        any: [
          /PRINTFORMW 「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '575',
        any: [/PRINTFORMW 「啊…好…那里……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '579',
        any: [/PRINTFORMW 「快住手啊……再这样摸的话……我会………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '583',
        any: [/PRINTFORMW 「变态！！…完全不舒服，不要再摸了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '598',
        any: [/PRINTFORMW 「哇！呜呜！！快住手！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '601',
        any: [/PRINTFORMW 「那，那样的地方都舔！这个……大变态！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '609',
        any: [
          /PRINTFORMW 「啊啊啊啊！好～好啊～♪　再舔我！再用力地吸～………唔喔，爱液要出来了～！！…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '613',
        any: [
          /PRINTFORMW 「呃啊～！好，好舒服……魔王大人啊！…再这么弄的话……人家……人家，会…………噢！～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '617',
        any: [/PRINTFORMW 「随，随你喜欢弄了！　…呃～啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '621',
        any: [/PRINTFORMW 「那地方！好脏的！不要舔了啦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '634',
        any: [/PRINTFORMW 「笨，笨蛋！！在想什么哪？！快停手！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '639',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '642',
        any: [
          /PRINTFORMW 「唔哦哦哦哦哦哦！！好，好啊………菊穴要融化了………快，快给我吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '646',
        any: [/PRINTFORMW 「啊啊啊………再，再湿一些的话……我想会更舒服些的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '650',
        any: [
          /PRINTFORMW 「唔哦～！魔王大人……屁股，屁股要融化在您的手里了………你让人家如何是好………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '654',
        any: [/PRINTFORMW 「啊呜～！再把人家弄湿一些………有点痛呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '658',
        any: [/PRINTFORMW 「不，不行了！！……屁股……我的屁股……要融化了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '662',
        any: [/PRINTFORMW 「笨蛋！快住手！！我叫你住手啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '675',
        any: [/PRINTFORMW 「想，想看这种东西…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '682',
        any: [
          /PRINTFORMW 「唔～噢～……我怎么这么淫乱啊……明明，明明还未试过男人的滋味………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '688',
        any: [/PRINTFORMW 「唔……噢噢……啊！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '690',
        any: [/PRINTFORMW 「唔……噢噢……啊！……哈……哈……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '692',
        any: [/PRINTFORMW 「唔……噢噢……啊！……呃！！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '699',
        any: [/PRINTFORMW 「相对于自摸，还是更喜欢小鸡鸡啦！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '701',
        any: [/PRINTFORMW 「丢下人家自己一个在自慰…好残忍啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '706',
        any: [
          /PRINTFORMW 「要看着魔王大人来自慰？……呜呜，魔王大人啊，早点占有我，早点贯穿我这小穴就好了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '712',
        any: [/PRINTFORMW 「唔……噢噢……啊！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '714',
        any: [/PRINTFORMW 「唔……噢噢……啊！……哈……哈……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '716',
        any: [/PRINTFORMW 「唔……噢噢……啊！……呃！！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '723',
        any: [/PRINTFORMW 「呜呜…魔王大人，为什么不愿意抱人家呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '725',
        any: [/PRINTFORMW 「一个人……可怜地在自慰……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '732',
        any: [/PRINTFORMW （讨厌……有感觉……了吗？）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '734',
        any: [/PRINTFORMW （我怎么…变成这样………）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '741',
        any: [/PRINTFORMW 「要做……这样的事……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '743',
        any: [/PRINTFORMW 「太丢人了……好羞耻……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '760',
        any: [/PRINTFORMW 「想玩弄胸部么……？　嘻嘻，是你的话，可以哦～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '763',
        any: [/PRINTFORMW 「呜！摸我的胸！　你这痴汉！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '771',
        any: [/PRINTFORMW 「哈……感觉胸都要融化了……好啊……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '775',
        any: [
          /PRINTFORMW 「我这胸，随魔王大人玩弄啦～……嘻嘻～………………呃………………呃……………………噢～……………………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '776',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%陶醉地闭上双眼，夸张地昂首挺胸，胸部不断起伏配合着你的手，发出了让人血脉偾张的可爱呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '780',
        any: [/PRINTFORMW 「啊啊……胸部……有感觉了……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '784',
        any: [/PRINTFORMW 「哼！揉胸什么的，不会有感觉的啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '799',
        any: [/PRINTFORMW 「嘻嘻，我的初吻是魔王大人耶……♪　太好了……亲亲～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '802',
        any: [/PRINTFORMW 「魔王大人啊……啊……初吻给的是你，我真是太幸福了……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '805',
        any: [/PRINTFORMW 「呜呜……明明是初吻啊……被这样的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '813',
        any: [/PRINTFORMW 「啊……要接吻吗？好啊～感觉上很浪漫呢～嘻嘻……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '816',
        any: [/PRINTFORMW 「魔王大人……啊啊……最喜欢您的吻了！……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '819',
        any: [/PRINTFORMW 「舔了我的嘴唇……也不会改变任何事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '827',
        any: [/PRINTFORMW 「唔……唔唔……喔～……嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '831',
        any: [/PRINTFORMW 「啊～魔王大人的吻～……唔……唔唔～……喔～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '835',
        any: [/PRINTFORMW 「只，只是嘴唇的话，就可以……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '839',
        any: [/PRINTFORMW 「哼！一张臭嘴！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '854',
        any: [/PRINTFORMW 「被看见了……啊……继续视奸我啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '857',
        any: [/PRINTFORMW 「只，只想给你……一个人看……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '860',
        any: [/PRINTFORMW 「这……这么羞耻的事……呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '868',
        any: [
          /PRINTFORMW 「啊～哦～……再视奸我吧……看我那淫荡的肉穴里面……啊啊～……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '872',
        any: [/PRINTFORMW 「这，这……是只为你敞开的地方……嘻嘻……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '876',
        any: [/PRINTFORMW 「啊……被看见了……全部都……可恶～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '880',
        any: [/PRINTFORMW 「喜欢这种样子……你这人啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '895',
        any: [/PRINTFORMW 「啊啊，抠挖着，那手指！喔～伸进来了！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '898',
        any: [/PRINTFORMW 「啊……魔王大人的手指……噢哦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '901',
        any: [/PRINTFORMW 「手指进来了～……唔唔」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '909',
        any: [/PRINTFORMW 「啊啊……再继续搅动啊～♪　求你！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '913',
        any: [/PRINTFORMW 「好厉害～……魔王大人的手指……哦哦哦！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '914',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%浑身发烫，双腿直抖，软倒在你的怀里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '918',
        any: [/PRINTFORMW 「啊啊……手指……这么舒服……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '922',
        any: [/PRINTFORMW 「住手！这……讨厌的手指！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '937',
        any: [/PRINTFORMW 「哦啊～黏糊糊的……好棒♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '940',
        any: [/PRINTFORMW 「不，不要嘛～舔那种地方……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '943',
        any: [/PRINTFORMW 「在干什么？不！！不要啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '951',
        any: [/PRINTFORMW 「唔哦！再拿舌头伸进去吧～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '955',
        any: [/PRINTFORMW 「被舔那里的话……受不了的……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '959',
        any: [/PRINTFORMW 「喜，喜欢的话……就舔呗……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '963',
        any: [/PRINTFORMW 「不要舔……奇怪的地方啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '979',
        any: [/PRINTFORMW 「噢哦喔，这是什么啊……唔！啊啊啊！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '982',
        any: [/PRINTFORMW 「快麻痹啦……噢啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '985',
        any: [/PRINTFORMW 「这石头怎么回事！……别这样！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '993',
        any: [/PRINTFORMW 「啊啊喔～再用力按压……唔唔啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '997',
        any: [/PRINTFORMW 「被道具玩弄了……啊啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1001',
        any: [/PRINTFORMW 「这样的小石子……呜呜……有感觉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1005',
        any: [/PRINTFORMW 「快住手！　不要把奇怪的东西……强加于我！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1023',
        any: [/PRINTFORMW 「啊啊……被蠕虫夺取了第一次！　好吧～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1026',
        any: [/PRINTFORMW 「啊啊……如果是魔王大人的话……那该多好啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1029',
        any: [
          /PRINTFORMW 「呃！！那个奇怪的恶心生物是什么……　吓？它要夺取我的第一次……这不是真的…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1035',
        any: [/PRINTFORMW 「啊啊……多么下流的生物啊……嘻嘻，来吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1038',
        any: [/PRINTFORMW 「令人讨厌的东西……真的要放进去吗……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1041',
        any: [
          /PRINTFORMW 「呃！！这个恶心的生物……不要啊！！不要拿过来！！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1050',
        any: [/PRINTFORMW 「啊啊……拿过来……把它弄湿然后放到我里面来……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1054',
        any: [/PRINTFORMW 「要来了吗……我这边已经准备好了……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1058',
        any: [/PRINTFORMW 「呃……来了……居然对这么恶心的东西……弄出感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1062',
        any: [/PRINTFORMW 「不要，不要啊！！……这么恶心的生物……别！！！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1071',
        any: [/PRINTFORMW 「啊啊……被拿出来了啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1075',
        any: [/PRINTFORMW 「蠕虫大人……辛苦了～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1079',
        any: [/PRINTFORMW 「呼呼……终于……结束了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1093',
        any: [/PRINTFORMW 「嘻嘻……什么嘛这个杖？　是个好东西么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1096',
        any: [/PRINTFORMW 「咦？保健器具么？……肩膀是有些酸痛了。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1099',
        any: [/PRINTFORMW 「什，什么啊……这么大一根！　不要！不要过来！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1107',
        any: [
          /PRINTFORMW 「唔……哦！这个令人发麻的快感……呜……不行啦……啊啊！～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1111',
        any: [/PRINTFORMW 「啊啊啊……有，有，有感觉了……被这根杖……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1115',
        any: [/PRINTFORMW 「呜呜呜……这，这个……受不了啦……真是的…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1119',
        any: [/PRINTFORMW 「呃……呜……住手！……不要再弄啦！……啊！这感觉～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1135',
        any: [/PRINTFORMW 「啊啊……好样的生物啊！快让我尝尝它的滋味……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1138',
        any: [/PRINTFORMW 「嘻嘻……这丑陋的东西～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1141',
        any: [/PRINTFORMW 「什，什么啊这玩意儿……住手！好恶心！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1149',
        any: [
          /PRINTFORMW 「唔哦……在里面……不停搅动着……好厉害，太厉害啦～哦哦！♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1150',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为肛门虫的活动，媚态尽显地高声呻吟着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1154',
        any: [/PRINTFORMW 「嘻嘻，好啊～再深入我的洞里……♪　再让我更兴奋吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1158',
        any: [
          /PRINTFORMW 「啊，屁股里……好棒，多么出色的生物啊～……喔喔喔～！♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1159',
        any: [/PRINTFORMW %SAVESTR:TARGET%被肛门虫蹂躏着尻穴，心荡神驰了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1163',
        any: [/PRINTFORMW 「嘻嘻，屁股吗……把这东西放进去吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1167',
        any: [/PRINTFORMW 「呃呃……不行！感觉到了……被这种卑劣的生物……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1171',
        any: [/PRINTFORMW 「不！！　这种卑劣的东西……不要拿过来！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1180',
        any: [/PRINTFORMW 「哈哈哈……好厉害……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1184',
        any: [/PRINTFORMW 「嘻嘻，可爱的东西哦，从屁股里出来啦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1188',
        any: [/PRINTFORMW 「呼……呼……呃……请温柔一点拔出来……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1192',
        any: [/PRINTFORMW 「哈，哈……终于结束了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1207',
        any: [/PRINTFORMW 「嘻嘻～还有这种东西啊～魔王大人～真绅士～！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1210',
        any: [/PRINTFORMW 「它跳动的样子！就像是魔王大人满满的爱意～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1213',
        any: [/PRINTFORMW 「被夹上会很痛的吧？！别！！！放开我！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1221',
        any: [
          /PRINTFORMW 「啊～久违的夹子～快！狠狠地夹着我的那里！让我发疯吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1225',
        any: [
          /PRINTFORMW 「看，我的小豆豆，已经为魔王大人而勃起了。只要能令你高兴，要人家……要人家怎么样都可以…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1229',
        any: [/PRINTFORMW 「这夹子………唔唔………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1238',
        any: [
          /PRINTFORMW 「呃～啊！！我的阴蒂，已经红肿得发疼了！继续！继续蹂躏我啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1242',
        any: [/PRINTFORMW 「呃～噢！！魔……魔王大人……尽兴了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1246',
        any: [/PRINTFORMW 「哎呀………唔唔………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1261',
        any: [/PRINTFORMW 「嘻嘻～还有这种东西啊～魔王大人～大～♪变～♪态～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1264',
        any: [
          /PRINTFORMW 「人家的身体，就是为了侍奉魔王大人而存在的～请尽情玩弄人家的胸部吧～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1267',
        any: [/PRINTFORMW 「连乳头也？！感觉会很疼！！！饶了我！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1275',
        any: [
          /PRINTFORMW 「乳头完全勃起了～快！狠狠地夹着我的乳头！把我淫乱的乳头玩坏吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1279',
        any: [
          /PRINTFORMW 「乳……乳头勃起什么的……那是因为见到了魔王大人而情不自禁…………！我是魔王大人最忠实的奴隶，请尽情地玩弄我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1283',
        any: [/PRINTFORMW 「乳……乳头夹什么的…………啊……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1292',
        any: [/PRINTFORMW 「嘻嘻！人家的乳头，被你弄得发麻了，好舒服～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1296',
        any: [
          /PRINTFORMW 「啊啊！乳头……乳头……已经切实地记住魔王大人的爱意了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1300',
        any: [/PRINTFORMW 「乳……乳头……好像不再属于自己了一样…………唔哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1315',
        any: [
          /PRINTFORMW 「啊！啊！啊！～～～这么用力吸的话……会…………会………………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1318',
        any: [
          /PRINTFORMW 「哦～哦～麻麻的……好像被婴儿吸啜着一样………好想……好想为魔王大人生个小孩啊……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1321',
        any: [/PRINTFORMW 「母乳什么的……不可强求啦……拿下来！……拿下来啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1329',
        any: [
          /PRINTFORMW 「啊！啊！啊！～～～太～太舒服了！！再吸！再用力吸……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1333',
        any: [
          /PRINTFORMW 「唔～哦哦！～～～感觉胸中满满的……爱意……和奶水一起……被吸出来了！……魔王大人啊！魔王大人哦！………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1337',
        any: [/PRINTFORMW 「呃……啊！！啊………明明是喂小孩的说…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1346',
        any: [/PRINTFORMW 「嘻嘻～我的那些奶水，我自己能尝尝么～……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1350',
        any: [
          /PRINTFORMW 「那……那些……母乳……只是为了魔王大人……只能给魔王大人……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1354',
        any: [/PRINTFORMW 「呼……呼呼…………吸得太用力了……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1423',
        any: [/PRINTFORMW 「嘻嘻，又变出了什么邪恶的道具了～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1426',
        any: [
          /PRINTFORMW 「啊？这个，要放到屁股里么……？　只……只要能令你高兴的话……♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1429',
        any: [/PRINTFORMW 「这是……什么？　啥？　屁股里！？　怎能这样……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1437',
        any: [
          /PRINTFORMW 「噢～便便的地方，被塞满了……呵呵～全部放进去了没？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1441',
        any: [/PRINTFORMW 「呃～～好痛苦……魔王大人！人家快受不了啦……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1445',
        any: [/PRINTFORMW 「好热，屁股好热……继续，继续放进去吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1449',
        any: [
          /PRINTFORMW 「呃！！屁股里……痛…痛…痛……啊！不用管我！请继续吧！……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1453',
        any: [/PRINTFORMW 「可恶，有感觉了……被这种玩具……弄菊花…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1457',
        any: [
          /PRINTFORMW 「痛！啊！！好痛啊！！停手！！停手！！不要再放进去啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1466',
        any: [/PRINTFORMW 「一下子，一下子拔出来吧！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1470',
        any: [
          /PRINTFORMW 「请，请温柔点，慢慢拔……让我充分，感受到魔王大人……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1474',
        any: [/PRINTFORMW 「呃……唔……哦哦～啊！！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1478',
        any: [/PRINTFORMW 「好痛啊！！慢慢地，慢慢地拔啊！…………呜～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1494',
        any: [/PRINTFORMW 「快啊～快贯穿我这没用过的私处！……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1497',
        any: [/PRINTFORMW 「好……好棒……终于…………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1500',
        any: [/PRINTFORMW 「呜……第一次……是这样……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1505',
        any: [/PRINTFORMW 「这姿势么～好啊！来吧～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1508',
        any: [/PRINTFORMW 「啊～魔王大人！抱着我……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1511',
        any: [/PRINTFORMW 「哼～最多动下腰……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1520',
        any: [/PRINTFORMW 「啊！哦！再来！再插我！……好棒～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1525',
        any: [
          /PRINTFORMW 「插进来！占有我！！……让我完全成为魔王大人的东西……让我只能想着魔王大人！！啊啊！～唔～啊！！～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1527',
        any: [
          /PRINTFORMW 「唔～哦！！从一放进来开始……身体就不受控制了！！啊～我的身体，已经不属于我了……全部都是属于魔王大人的！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1529',
        any: [
          /PRINTFORMW 「魔王大人～！操我！操我！再用力地操我！！已经无法思考了！！把我操得乱七八糟吧！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1531',
        any: [/PRINTFORMW 「啊啊、好棒啊……再用力点啊……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1535',
        any: [/PRINTFORMW 「唔、唔……喔……感、感觉到了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1539',
        any: [/PRINTFORMW 「随你……喜欢…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1543',
        any: [/PRINTFORMW 「可恶！不要啊！　别弄我！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1560',
        any: [/PRINTFORMW 「快，快啊！　用肉棒！！　夺取我的第一次…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1563',
        any: [/PRINTFORMW 「想要…想要啊！　你的……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1567',
        any: [/PRINTFORMW 「别开玩笑了……第一次……居然是这种形式……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1573',
        any: [/PRINTFORMW 「快，快啊！　肉棒！肉棒哦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1576',
        any: [/PRINTFORMW 「想要…想要啊！　你的……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1579',
        any: [/PRINTFORMW 「像野兽一样的姿势……讨厌……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1589',
        any: [/PRINTFORMW 「让肚子里的小家伙也尝尝精液的味道吧！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1591',
        any: [/PRINTFORMW 「连孕妇也上……简直就是野兽嘛♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1593',
        any: [/PRINTFORMW 「嗯啊啊啊啊噢噢噢！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1599',
        any: [/PRINTFORMW 「感觉到了……连肚子里的小家伙也感觉到咯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1601',
        any: [/PRINTFORMW 「肚子里、有感觉了……两个人一起感觉到咯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1603',
        any: [/PRINTFORMW 「再深一点……把爱传给肚子里的小家伙把♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1608',
        any: [/PRINTFORMW 「好有感觉……这种姿势……孕妇怎么能……像野兽一样」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1612',
        any: [/PRINTFORMW 「随便你了……无所谓了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1616',
        any: [/PRINTFORMW 「强奸孕妇什么的……别开玩笑了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1626',
        any: [/PRINTFORMW 「再……再……再来！　使劲操我！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1628',
        any: [/PRINTFORMW 「我……我就是你的一只母狗……！　太棒了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1630',
        any: [/PRINTFORMW 「唔啊啊啊啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1636',
        any: [
          /PRINTFORMW 「啊啊啊～……感觉太强烈了！魔王大人……请好好地疼爱你最忠实的母狗吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1638',
        any: [
          /PRINTFORMW 「这下流的姿势……也挺不错的…………只要是为了魔王大人……要人家做什么都可以！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1640',
        any: [
          /PRINTFORMW 「深深地插我……深深地插我吧～♪　我是魔王大人的奴隶！我是魔王大人的母狗！　噢～～啊！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1645',
        any: [/PRINTFORMW 「唔唔～感觉来了……这种姿势……像野兽一样…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1649',
        any: [/PRINTFORMW 「喜，喜欢的话……也不是不行……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1653',
        any: [/PRINTFORMW 「这样的姿势……好羞耻…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1669',
        any: [/PRINTFORMW 「用力地抱着我……夺取我的第一次把！……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1672',
        any: [/PRINTFORMW 「请，请温柔地抱着我……人家是第一次……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1675',
        any: [/PRINTFORMW 「第一次……被你这家伙……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1681',
        any: [/PRINTFORMW 「被这样地抱着……♪　好舒服啊……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1684',
        any: [/PRINTFORMW 「好棒啊……被这样地抱着……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1687',
        any: [/PRINTFORMW 「你这家伙……这个样子……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1697',
        any: [/PRINTFORMW 「来亲亲吧～……噢……啊啊～♪　好深，好深啊！……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1699',
        any: [/PRINTFORMW 「再用力地抱紧我吧……啊……再插到里面去……喔喔～啊！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1701',
        any: [/PRINTFORMW 「好……好啊……能清楚地看到你的神情呢……嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1707',
        any: [
          /PRINTFORMW 「紧紧相拥……深深凝视……好喜欢这样……我是魔王大人的东西～我永远都是魔王大人的东西～！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1709',
        any: [
          /PRINTFORMW 「再用力地抱紧我吧……啊啊……身心都要融化了……在魔王大人的怀里～好幸福啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1711',
        any: [
          /PRINTFORMW 「亲亲……想亲亲……彼此相连着……温柔地……嘻嘻～……能遇见魔王大人，真是我上辈子的福气！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1716',
        any: [/PRINTFORMW 「啊……这感觉……被你抱着……啊……噢…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1720',
        any: [/PRINTFORMW 「哦！～哦！……喜，喜欢……的话……可以亲……亲哦……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1724',
        any: [/PRINTFORMW 「住手……这样子的……快住手啊……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1740',
        any: [/PRINTFORMW 「第一次就从后面来啊……嘻嘻，有意思……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1743',
        any: [/PRINTFORMW 「第一次什么的……从后抱着我…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1746',
        any: [/PRINTFORMW 「明明是第一次还要从后面来……讨厌…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1752',
        any: [/PRINTFORMW 「从后面来啊……嘻嘻，有意思……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1755',
        any: [/PRINTFORMW 「从后抱着我…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1758',
        any: [/PRINTFORMW 「从后面来……讨厌…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1768',
        any: [/PRINTFORMW 「揉我的胸！！……从后面，把我顶飞吧！！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1770',
        any: [/PRINTFORMW 「好棒……哈……唔……哦哦哦！……用力顶我！操我～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1772',
        any: [/PRINTFORMW 「好……唔唔唔……啊……噢！！～好棒啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1778',
        any: [
          /PRINTFORMW 「从后面……抱紧人家嘛～♪　啊……好深……魔王大人……我好爱你啊！～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1780',
        any: [
          /PRINTFORMW 「被这样抱着～……太舒服了……噢～♪　人家再也离不开魔王大人了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1782',
        any: [
          /PRINTFORMW 「唔唔～……想看你的脸～！嘻嘻～不过你也看不到我羞羞的样子～……♪　魔王大人的气息……喷在我脖子上……感觉全身都酸麻了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1787',
        any: [/PRINTFORMW 「唔……啊……啊……哦哦哦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1791',
        any: [/PRINTFORMW 「不……不要这样……盯着我嘛……还这么近……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1795',
        any: [/PRINTFORMW 「呃……从后面…不要啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1810',
        any: [/PRINTFORMW 「哈哈，喜欢走后门吗～好哦……来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1813',
        any: [/PRINTFORMW 「喜欢这种地方吗……？　大～变～态～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1816',
        any: [/PRINTFORMW 「停、停下啊！　在想什么哪！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1825',
        any: [/PRINTFORMW 「唔～哦哦～♪　菊穴，感觉太强烈了～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1827',
        any: [/PRINTFORMW 「唔～啊啊～♪　插入便便的洞洞里了～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1829',
        any: [/PRINTFORMW 「呃～后面的洞～哦！哦哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1834',
        any: [/PRINTFORMW 「痛～好痛……没事～♪　没关系的，马上就会习惯的啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1839',
        any: [/PRINTFORMW 「屁股……啊～感觉到了～噢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1841',
        any: [/PRINTFORMW 「屁股……屁股好热～好烫啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1846',
        any: [
          /PRINTFORMW 「呃！啊！痛！～人家，人家会努力提高屁股的感觉……没关系，很，很舒服」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1850',
        any: [/PRINTFORMW 「唔哦……啊～♪　！　感，感觉到了～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1854',
        any: [/PRINTFORMW 「要用这种地方……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1869',
        any: [/PRINTFORMW 「终……终于…要用肉棒插我了吗！　等好久了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1872',
        any: [/PRINTFORMW 「这，这么脏的地方……会弄脏你的棒棒的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1875',
        any: [/PRINTFORMW 「你这人，整天在想些什么啊！　这个……变态狂！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1884',
        any: [
          /PRINTFORMW 「呼……呼……唔哦哦哦哦哦哦！！　用力插进去！把我里面弄得乱七八糟吧！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1886',
        any: [
          /PRINTFORMW 「啊……哦哦……光插进来，感觉就这么地强烈……我，我是你的菊穴奴隶了～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1891',
        any: [/PRINTFORMW 「啊……好、好哦……再、再来……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1896',
        any: [
          /PRINTFORMW 「好…好棒……魔王大人…你…就喜欢这种地方么…噢哦哦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1898',
        any: [/PRINTFORMW 「屁股…好舒服啊～…已经，已经回不去了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1903',
        any: [/PRINTFORMW 「这，这种姿势插这样的洞洞……好像野兽一样……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1907',
        any: [/PRINTFORMW 「这、这样的洞、我……我居然……有感觉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1911',
        any: [/PRINTFORMW 「好、好脏……不要弄那里！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1926',
        any: [/PRINTFORMW 「啊……这样面对面地欺负人家的菊花啊～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1929',
        any: [/PRINTFORMW 「这样的地方……嘻嘻，真会玩！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1932',
        any: [/PRINTFORMW 「哼……不想见到你这家伙的脸……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1941',
        any: [/PRINTFORMW 「啊……要融化了……再用力抱我啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1943',
        any: [/PRINTFORMW 「来嘛……来嘛……看着我这下贱的神色……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1945',
        any: [/PRINTFORMW 「菊花要融化了……多么美妙啊……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1950',
        any: [/PRINTFORMW 「呵呵……来的好……感觉到了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1955',
        any: [/PRINTFORMW 「啊……好棒……哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1957',
        any: [/PRINTFORMW 「再继续弄屁股……往里面去～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1962',
        any: [
          /PRINTFORMW 「会，会努力的……为了让魔王大人高兴……会让这里也很有感觉……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1966',
        any: [/PRINTFORMW 「呃……这种……地方……居然有感觉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1970',
        any: [/PRINTFORMW 「好痛……痛死了！一点都不舒服！快停止！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1985',
        any: [/PRINTFORMW 「呵呵……来吧～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1986',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭动着腰，诱惑着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1989',
        any: [/PRINTFORMW 「请通过屁股……疼爱我吧……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '1992',
        any: [/PRINTFORMW 「你……你这家伙，居然走后门！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2001',
        any: [/PRINTFORMW 「啊……被从后……贯穿啦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2003',
        any: [/PRINTFORMW 「好棒……好棒……拉屎的洞，还能这么用～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2008',
        any: [/PRINTFORMW 「嘻嘻……菊花也是好东西呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2013',
        any: [/PRINTFORMW 「啊……好有快感……用这样的地方……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2015',
        any: [/PRINTFORMW 「为了魔王大人……用下流的地方……做下流的事了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2020',
        any: [/PRINTFORMW 「还是有点痛……会习惯的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2024',
        any: [/PRINTFORMW 「被弄这地方……居然有快感了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2028',
        any: [/PRINTFORMW 「呃啊！……真的只有痛楚啦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2043',
        any: [/PRINTFORMW 「嘻嘻……喜欢用手啊～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2046',
        any: [/PRINTFORMW 「重要的地方……要慎重地对待！♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2049',
        any: [/PRINTFORMW 「要我用手？！……好……好吧……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2052',
        any: [/PRINTFORMW 「光碰到就觉得恶心！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2062',
        any: [/PRINTFORMW 「呵呵，真是令人惊叹啊……两只手都握不住呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2065',
        any: [
          /PRINTFORMW 「什么啊这个小玩意……呵呵，再多勃起一点，喏，在更努力一点吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2068',
        any: [
          /PRINTFORMW 「呵呵，把皮裹着的肉棒一点一点剥开什么的真好意思说呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2071',
        any: [/PRINTFORMW 「马肉棒……怎么做才好呢，呵呵，这样如何？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2074',
        any: [/PRINTFORMW 「你看你看～……要出来了哦！……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2076',
        any: [/PRINTFORMW 「嘻嘻～……不停地跳动着……看起来很美味呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2083',
        any: [/PRINTFORMW 「哦，真是令人惊叹啊……两只手都握不住呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2086',
        any: [
          /PRINTFORMW 「什么啊这个小玩意……呵呵，再多勃起一点，喏，在更努力一点吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2089',
        any: [
          /PRINTFORMW 「呵呵，把皮裹着的棒棒一点一点剥开什么的真好意思说呢♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2092',
        any: [/PRINTFORMW 「马棒棒……怎么做才好呢，呵呵，这样如何？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2095',
        any: [/PRINTFORMW 「会好好地侍奉魔王大人的……你看！它变硬了呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2097',
        any: [/PRINTFORMW 「舒服么……？　嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2102',
        any: [/PRINTFORMW 「用手的感觉如何？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2106',
        any: [/PRINTFORMW 「我知道啦……只是摸一下哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2110',
        any: [/PRINTFORMW 「好脏……不知廉耻！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2125',
        any: [/PRINTFORMW 「为什么留到现在才让我舔呢……？　嘻嘻」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2128',
        any: [/PRINTFORMW 「一直期待着，用嘴巴侍奉魔王大人……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2131',
        any: [/PRINTFORMW 「只，只是舔一下的话……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2134',
        any: [/PRINTFORMW 「这，这种东西也能舔啊……？！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2142',
        any: [/PRINTFORMW 「把精液射给我……已经无法忍耐啦～　唔～～唔～～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2143',
        any: [/PRINTFORML %SAVESTR:TARGET%用舌头舔舐着阴茎，时而含入嘴里。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2147',
        any: [/PRINTFORMW 「嘻嘻～它变得这么硬了～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2151',
        any: [
          /PRINTFORMW 「魔王大人……想射的时候，随时可以射出来哦～人家会好好地接住的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2152',
        any: [
          /PRINTFORML %SAVESTR:TARGET%充满爱意地将阴茎含入嘴里，头部有节奏地运动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2156',
        any: [/PRINTFORMW 「我知道啦……只，只是舔一下哦…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2160',
        any: [/PRINTFORMW 「真……讨厌……好臭…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2175',
        any: [/PRINTFORMW 「也有喜欢用胸部夹着的人呢～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2178',
        any: [/PRINTFORMW 「看啊～用胸部夹起来了哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2181',
        any: [/PRINTFORMW 「这，这样就行了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2184',
        any: [/PRINTFORMW 「夹着你那玩意儿……别说傻话了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2193',
        any: [/PRINTFORMW 「舒服么……？　嘻嘻～感觉胸部都开始变烫了～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2195',
        any: [/PRINTFORMW 「柔软么？　到底是什么样的感觉？　嗯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2200',
        any: [/PRINTFORMW 「喜欢用胸部啊……？　嘻嘻」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2205',
        any: [
          /PRINTFORMW 「舒服的话，随时可以射出来哦！……人家会用嘴巴接住魔王大人那宝贵的精华的～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2207',
        any: [
          /PRINTFORMW 「魔王大人，舒服么……？　很柔软吧？人家的胸，就是为了服侍魔王大人的……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2212',
        any: [/PRINTFORMW 「只是夹着就好了……我知道啦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2216',
        any: [/PRINTFORMW 「这种难以置信的行为……可恶…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2231',
        any: [/PRINTFORMW 「哦！还有这种玩法啊……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2234',
        any: [/PRINTFORMW 「用胯间啊……嘻嘻，真有意思～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2237',
        any: [/PRINTFORMW 「吓……什么动作？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2245',
        any: [
          /PRINTFORMW 「放错地方啦！……嘻嘻，开玩笑的～好想早点被破处啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2249',
        any: [/PRINTFORMW 「摩擦摩擦～……真舒服～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2253',
        any: [
          /PRINTFORMW 「嘻嘻……想放进去么？　人家的第一次，想要献给魔王大人～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2257',
        any: [/PRINTFORMW 「嘻嘻……变的这么硬了……这么舒服哦？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2261',
        any: [/PRINTFORMW 「嗯……这样就好了吗……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2278',
        any: [/PRINTFORMW 「呼……终于成为女人了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2279',
        any: [/PRINTFORMW 「小鸡鸡好精神呢～那，我坐下来啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2280',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%迫不及待地沉下了腰……眉头闪过一丝痛苦，但还是慢慢地坐到底了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2283',
        any: [/PRINTFORMW 「谢谢魔王大人……终于……终于肯接受我的处女了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2284',
        any: [
          /PRINTFORMW 「能……能把自己奉献给魔王大人……是我一生的荣幸……！　那……人家……坐下来了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2285',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着期待又感动的表情，将%SAVESTR:PLAYER%的阴茎吞入了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2288',
        any: [/PRINTFORMW 「呜呜……居然是以这种形式破的处…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2289',
        any: [
          /PRINTFORMW 和言语相反地，%SAVESTR:TARGET%遵从着命令，将%SAVESTR:PLAYER%的阴茎吞入了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2295',
        any: [/PRINTFORMW 「小鸡鸡好精神呢～那，我不客气啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2296',
        any: [/PRINTFORMW %SAVESTR:TARGET%迫不及待地沉下了腰……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2299',
        any: [/PRINTFORMW 「喜欢这种体位吗？　嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2300',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%慢慢地沉下了腰，将%SAVESTR:PLAYER%的阴茎吞入了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2303',
        any: [/PRINTFORMW 「让，让我这样子…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2304',
        any: [
          /PRINTFORMW 和言语相反地，%SAVESTR:TARGET%遵从着命令，将%SAVESTR:PLAYER%的阴茎吞入了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2314',
        any: [/PRINTFORMW 「只是躺着，这么轻松啊～嘻嘻」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2316',
        any: [/PRINTFORMW 「看看～你的小鸡鸡慢慢地被我吞进去了哦？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2318',
        any: [/PRINTFORMW 「哼哼～欣赏我在你身上的舞蹈吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2320',
        any: [/PRINTFORMW 「嘻嘻！等不及啦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2322',
        any: [/PRINTFORMW %SAVESTR:TARGET%分开双腿，慢慢地坐了下来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2327',
        any: [
          /PRINTFORML 「魔王大人……请躺好吧～让人家来侍奉你吧！……啊！好大……好满……喔……天啊……啊～啊～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2329',
        any: [
          /PRINTFORMW 「嘻嘻～要用力地往上顶人家哦～！……人家的小穴，是为了魔王大人而存在的……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2331',
        any: [
          /PRINTFORMW 「我重吗？感觉插得好深啊～好像插到脑海深处一般……噢……那里……啊……我无论灵魂还是肉体……都彻底是魔王大人的东西了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2333',
        any: [
          /PRINTFORMW 「身体被抠挖着一样……呵呵～我会用尽余生来好好地侍奉魔王大人的……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2335',
        any: [
          /PRINTFORMW 展示出优秀的侍奉技术，%SAVESTR:TARGET%在%SAVESTR:PLAYER%的身上翩翩起舞。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2340',
        any: [/PRINTFORMW 「呃～啊～！……腰、腰自己动起来了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2342',
        any: [/PRINTFORMW 「有什么在脑子里冲撞着……受不了啦……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2344',
        any: [/PRINTFORMW 「唔！在里面……好深啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2346',
        any: [/PRINTFORMW 「不要啦！～再这么往上顶的话……的话…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2351',
        any: [
          /PRINTFORML %SAVESTR:TARGET%遵从着命令，跨坐在%SAVESTR:PLAYER%的身上，把阴茎吞入体内了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2352',
        any: [/PRINTFORMW 「这，这样就可以了吗……要我保持这么下流的姿势……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2356',
        any: [/PRINTFORMW 「这种屈辱……咱们走着瞧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2371',
        any: [/PRINTFORMW 「只是……擦身而已哦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2374',
        any: [/PRINTFORMW 「洗……洗澡这东西……怎么帮？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2382',
        any: [/PRINTFORMW 「哈哈～！终于有机会，反过来对你上下其手啦！～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2386',
        any: [
          /PRINTFORMW 「魔王大人的身体……好漂亮……光是看着魔王大人的身体……人家…人家……就要…………噢！不！不是这样的！我是魔王大人最乖巧的奴隶！让我帮魔王大人清洁干净吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2390',
        any: [/PRINTFORMW 「我说啊……你平常洗澡也太不认真了吧……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2394',
        any: [/PRINTFORMW 「你妈妈没教你自己洗澡吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2409',
        any: [/PRINTFORMW 「嘻嘻，躺下吧……让我来！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2410',
        any: [/PRINTFORMW 「看啊！你的东西，被菊穴慢慢地吞进去了哦～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2411',
        any: [/PRINTFORMW %SAVESTR:TARGET%迫不及待地沉下了腰……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2414',
        any: [
          /PRINTFORMW 「嘻嘻，好好地躺着吧……会让魔王大人的小鸡鸡很舒服的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2415',
        any: [
          /PRINTFORMW 「啊……屁屁被疼爱的样子……魔王大人一定能看得很清楚的吧……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2416',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%慢慢地沉下了腰，将%SAVESTR:PLAYER%的阴茎吞入了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2419',
        any: [/PRINTFORMW 「要我自己来吗……还要用这个洞……讨厌……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2428',
        any: [/PRINTFORMW 「看哦！整根插进去啦哦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2429',
        any: [/PRINTFORMW 「唔～哦～！在里面……闹腾着～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2431',
        any: [/PRINTFORMW 「便便的地方被欺负了……受不了啦～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2432',
        any: [/PRINTFORMW 「要我再摇动屁股么？　噢～～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2434',
        any: [
          /PRINTFORMW 尻穴持续地侍奉着阴茎，%SAVESTR:TARGET%跨坐在%SAVESTR:PLAYER%的身上，腰身扭动出淫秽的舞蹈。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2438',
        any: [/PRINTFORMW 「呃～……里面……菊穴里面好热～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2439',
        any: [
          /PRINTFORMW 尻穴持续地侍奉着阴茎，%SAVESTR:TARGET%有节奏地起伏着身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2444',
        any: [/PRINTFORMW 「魔王大人……人家的菊穴，舒服吗……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2445',
        any: [/PRINTFORMW 「您的东西又硬又烫，弄得人家好舒服哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2447',
        any: [/PRINTFORMW 「嘻嘻～魔王大人……我的屁股，还满意么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2448',
        any: [/PRINTFORMW 「好舒服～……啊～！再顶我～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2450',
        any: [
          /PRINTFORMW 尻穴持续地侍奉着阴茎，%SAVESTR:TARGET%跨坐在%SAVESTR:PLAYER%的身上，用力夹紧，不停抽动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2454',
        any: [/PRINTFORMW 「再用力地夹紧会更好些吗……啊～要融化了～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2455',
        any: [
          /PRINTFORMW 尻穴持续地侍奉着阴茎，%SAVESTR:TARGET%有节奏地起伏着身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2459',
        any: [/PRINTFORMW 「这么热……这么硬～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2460',
        any: [
          /PRINTFORMW 尻穴持续地侍奉着阴茎，%SAVESTR:TARGET%扭动着腰肢，追求着快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2464',
        any: [/PRINTFORMW 「要我自己动……？　哼，给我记着！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2479',
        any: [/PRINTFORMW 「要……要舔屁股吗……我知道啦……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2482',
        any: [/PRINTFORMW 「不要开玩笑了！这种……这种屈辱……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2490',
        any: [/PRINTFORMW 「嘻嘻，舒服么？　舌头，要往里伸进去了哦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2494',
        any: [/PRINTFORML 「会帮魔王大人漂亮地舔干净的……呵呵～……唔……唔……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2498',
        any: [/PRINTFORMW 「好吧……我舔……不过……还是挺……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2502',
        any: [/PRINTFORMW 「可恶……这种事……不做也没关系吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2515',
        any: [/PRINTFORMW 「住，住手！　不要打我！　好痛啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2522',
        any: [
          /PRINTFORMW 「啊～！啊～！我是你的M奴隶！！　再，再更用力地打我吧！主人啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2523',
        any: [/PRINTFORMW %SAVESTR:TARGET%流着口水，屁股不安分地扭来扭去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2527',
        any: [
          /PRINTFORMW 「惩罚我！欺负我！　狠狠地责备，这么下流的我吧！……魔王大人啊～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2528',
        any: [/PRINTFORMW %SAVESTR:TARGET%满脸红晕，屁股不安分地扭来扭去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2533',
        any: [/PRINTFORMW 「这……这种程度的话……也不是不能接受……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2538',
        any: [/PRINTFORMW 「再怎么打我都不会屈服的！！　你这白痴！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2553',
        any: [/PRINTFORMW 「哦呵～要用这条鞭子来打我吗？～♪　来嘛～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2556',
        any: [
          /PRINTFORMW 「人家做错了什么吗……？　如果有……人家道歉还不行吗…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2559',
        any: [/PRINTFORMW 「混蛋，别以为我会屈服于暴力！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2567',
        any: [/PRINTFORMW 「好痛！好爽！～打我！打死我～！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2571',
        any: [/PRINTFORMW 「再打我！～啊～好痛！！鞭我的背！鞭我的屁股！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2575',
        any: [/PRINTFORMW 「啊～这真的，非常……痛啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2579',
        any: [
          /PRINTFORMW 「啊！啊！！好痛！…………但，这就是魔王大人的爱！啊！～……再打我！在我身上留下鞭痕！让我无时无刻都感受到魔王大人！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW 「唔……哦！！！……我……真是不可救药的M奴隶啊……明明这么痛……却渐渐有感觉了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2587',
        any: [/PRINTFORMW 「啊！！……为了魔王大人，我……会忍耐……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2591',
        any: [/PRINTFORMW 「啊！！啊！！……被这么虐待……我……我居然…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2595',
        any: [
          /PRINTFORMW 「你这家伙！打算用那鞭子打我吗……？　唔！啊！！！！……一点…………都不……痛…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2610',
        any: [/PRINTFORMW 「嘻嘻～原来你喜欢刺猬啊～…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2613',
        any: [
          /PRINTFORMW 「呜呜……这都是为了魔王大人……这都是为了魔王大人………………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2616',
        any: [/PRINTFORMW 「我！跟你没完！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2624',
        any: [/PRINTFORMW 「啊～这令人上瘾的刺痛……再扎我！！扎深一点！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2628',
        any: [
          /PRINTFORMW 「痛……！！身上的针越来越多……好像肉体都被改造了似得……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2632',
        any: [/PRINTFORMW 「来吧！带我走向新世界～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2636',
        any: [
          /PRINTFORMW 「好痛！！好爽！！再用力刺我！让我只能想着魔王大人！！……我是魔王大人最忠实的性奴！～彻底地将我玩坏吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2640',
        any: [
          /PRINTFORMW 「这痛楚！！就像魔王大人扎到了我的心里一样……魔王大人哦～人家平常能用这针痕，想着你自慰么？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2644',
        any: [
          /PRINTFORMW 「好痛！这是……魔王大人的恩赐……这是魔王大人的恩赐…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2648',
        any: [
          /PRINTFORMW 「明明这么痛……心里却在欢迎……天啊……我……没救了啊…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2652',
        any: [/PRINTFORMW 「你！！你会遭报应的！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2668',
        any: [
          /PRINTFORMW 「原来如此，封闭视觉来提高其它感官的感觉吗？……有意思～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2671',
        any: [/PRINTFORMW 「偶尔试试这种玩法也不错呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2674',
        any: [/PRINTFORMW 「看不见什么的……我……一点都不怕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2682',
        any: [/PRINTFORMW 「喔～噢～！……全身……都变成敏感带了…………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2686',
        any: [/PRINTFORMW 「皮肤……好敏感……好像能感受到空气的流动…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2690',
        any: [/PRINTFORMW 「呵呵～想干什么坏事～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2694',
        any: [
          /PRINTFORMW 「魔王大人，就在附近啦！……别的不说，魔王大人的气味我可是很熟悉的呢～♪　快来～快来欺负人家嘛～……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2698',
        any: [
          /PRINTFORMW 「魔……魔王大人？在哪里？　人家……已经准备好被你玩弄了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2702',
        any: [/PRINTFORMW 「呜呜……魔王大人……不见了……魔王大人哦？！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2706',
        any: [/PRINTFORMW 「皮肤好紧张……啊……有感觉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2710',
        any: [/PRINTFORMW 「玩这种小把戏……就不敢堂堂正正的么！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2719',
        any: [/PRINTFORMW 「嘻嘻～意犹未尽～……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2723',
        any: [/PRINTFORMW 「嘻嘻～发现魔王大人了～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2727',
        any: [/PRINTFORMW 「这……这种程度……没什么大不了的……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2742',
        any: [/PRINTFORMW 「要把我绑起来么～？～♪　嘻嘻～好期待啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2745',
        any: [
          /PRINTFORMW 「要把我绑起来么～？～♪　呵呵～魔王大人这癖好啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2748',
        any: [
          /PRINTFORMW 「这……这种绳子……没被封住力量的话我只需要一下子…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2756',
        any: [
          /PRINTFORMW 「我……我是一只受虐待就会发情的母猪……！　请……请随意地蹂躏我吧！！……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2760',
        any: [/PRINTFORMW 「好兴奋啊……啊……被这么绑着……子宫都开始发烫了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2764',
        any: [/PRINTFORMW 「偶尔这么玩也不错呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2768',
        any: [
          /PRINTFORMW 「宠物……我是魔王大人的宠物……请主人再继续调教我这受虐狂家畜吧！！！……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2772',
        any: [/PRINTFORMW 「啊～好棒……绳子……深深地勒进肉里了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2776',
        any: [/PRINTFORMW 「嘻嘻～不绑着我也不会离开魔王大人的啦～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2780',
        any: [
          /PRINTFORMW 「唔……呃……啊～…………这……这种……屈辱………………居……然……有……感觉了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2784',
        any: [/PRINTFORMW 「我不是挣不脱！只是力量被封住了而已！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2793',
        any: [/PRINTFORMW 「完了么？　一直绑着我也可以哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2797',
        any: [/PRINTFORMW 「啊……魔王大人的绳艺……让人家腿都软了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2801',
        any: [/PRINTFORMW 「哼！终于放弃了吗……我才不会输给这种绳子！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2816',
        any: [/PRINTFORMW 「口水会流得到处都是啦～！……唔……唔……唔唔…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2819',
        any: [/PRINTFORMW 「呜呜……戴上这个之后……魔王大人还会亲吻人家吗？……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2822',
        any: [/PRINTFORMW 「这？！……懦夫！怕被我骂是吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2830',
        any: [/PRINTFORMW 「嘻嘻～魔王大人～真鬼畜呢～～～来！啊～～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2834',
        any: [/PRINTFORMW 「明明还没戴上……口水却快要留出来了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2838',
        any: [
          /PRINTFORMW 「啊！！啊！！！啊！！！！………………没什么～待会没机会叫了～先叫上几声～哈哈～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2842',
        any: [
          /PRINTFORMW 「魔王大人，是我一生的主人！！我真的好爱你～好爱你啊！…………咦？……没，只是一想到待会没机会说话，就忍不住要告白一下…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2843',
        any: [
          /PRINTFORMW 「魔王大人哦，人家已经是你的了，待会请狠狠地蹂躏我，占有我，让我也彻底地感受魔王大人的爱意，好吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2847',
        any: [
          /PRINTFORMW 「被这么弄居然觉得很幸福……魔王大人啊……你要对人家负责～我以前不是这样子的…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2851',
        any: [
          /PRINTFORMW 「要弄住嘴……呜呜…………魔王大人啊……解开之后……亲亲人家可以么？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2855',
        any: [
          /PRINTFORMW 「唉……我都搞不懂我自己了……究竟是败给了你……还是败给了这些玩具……还是败给了自己的身体…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2859',
        any: [
          /PRINTFORMW 「我才不会张嘴让你塞！…………唔！！……咳？！！…………咯……………唔！唔唔！！………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2868',
        any: [/PRINTFORMW 「差点被自己的口水呛到～哈哈～……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2872',
        any: [/PRINTFORMW 「口水像爱液一样地滴下来……好淫秽啊～嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2876',
        any: [/PRINTFORMW 「咳……咳……咳…………骂……骂……都懒得……骂你了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2891',
        any: [/PRINTFORMW 「呃……这个……连我都不太敢玩…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2894',
        any: [/PRINTFORMW 「呜呜～魔王大人！重口味！大变态！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2897',
        any: [
          /PRINTFORMW 「呜呜呜！！！哇哇哇哇！！！救命啊！！！谁都好！！来人救救我吧！！！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2905',
        any: [
          /PRINTFORMW 「啊……这迷人的触感……凉凉的……灌进来了…………待会一定很精彩吧～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2909',
        any: [/PRINTFORMW 「唔～唔～感觉到肚子在叫了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2913',
        any: [
          /PRINTFORMW 「噢～噢～……灌进来的……是魔王大人满满的爱……我……会用……心感受…………用……心……感……受……的～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2917',
        any: [/PRINTFORMW 「灌……灌好了么……？魔王大人真鬼畜啊～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2921',
        any: [/PRINTFORMW 「啊～啊～啊～！我要疯了～！我要疯啦！！～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2925',
        any: [/PRINTFORMW 「唔唔～啊！！好难受～好痛苦…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2940',
        any: [/PRINTFORMW 「被魔王大人这么看着……好害羞…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2943',
        any: [/PRINTFORMW 「干……干嘛……你累啦？…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2951',
        any: [/PRINTFORMW 「魔王大人哦，求求你～过来疼爱一下人家啊！…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2955',
        any: [
          /PRINTFORMW 「魔……魔王大人？……人家没做错什么惹你不高兴吧？…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2959',
        any: [/PRINTFORMW 「这……这是一个看谁先说话的比赛？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2977',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……曾经是个勇者。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2978',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边对水晶球淫靡地扭腰摆臀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2979',
        any: [/PRINTFORMW 「虽然是第一次拍这种东西，不过我会努力的！呵呵～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2980',
        any: [
          /PRINTFORMW 「好了！那，接下来，还要说什么？……哎～不废话了！赶紧来做爱做的事吧！……嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2983',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……曾经……是个…………勇者………………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2984',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边时不时害羞地偷看水晶球。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2985',
        any: [
          /PRINTFORMW 「不过，在讨伐魔王大人的途中被抓住了……被魔王大人…………教会了……作为……女人的快乐…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2986',
        any: [/PRINTFORMW 「现在……啊…………好羞人………………能不能别拍了啊？………………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2989',
        any: [/PRINTFORMW 「别！别拍我！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2994',
        any: [
          /PRINTFORMW 「嘻嘻～……闲聊的时候，突然抓人家来爱爱……爱爱的时候，又突然抓人家来闲聊……真是顽皮的魔王大人呢～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '2997',
        any: [/PRINTFORMW 「是……是的……能被魔王大人宠幸……我觉得非常的幸福～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3000',
        any: [/PRINTFORMW 「……你想我说什么？…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3011',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……曾经是个勇者。不过现在已经放弃了自己的使命，彻底地对阴茎上瘾了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3012',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边对水晶球淫靡地扭腰摆臀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3013',
        any: [
          /PRINTFORMW 「希望看到这个的你，也能跟我一样享受性爱的快乐……哦～…啊！………轻……轻…地去了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3014',
        any: [
          /PRINTFORMW 「那，接下来，让我们一起做很多舒服的事，尽情地射精吧！……嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3018',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……没能拯救这个世界，对不起呢～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边对水晶球甜甜地微笑着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3020',
        any: [
          /PRINTFORMW 「然而，我是幸福的……因为知道了这种种让人愉悦的事……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3021',
        any: [
          /PRINTFORMW 「在不知不觉中，身心都被魔王大人夺走了……现在也是，遵循着魔王大人的命令来拍这个…请大家好好地看着我吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3025',
        any: [/PRINTFORMW 「我……我……叫%SAVESTR:TARGET%……呜呜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW 「关于那一次……呃……呃！……是啊！……嘻嘻～……所以下次这么弄的时候，就可以再用力些嘛～呵呵～～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3035',
        any: [/PRINTFORMW 「魔……魔王……大人…………你……喜……喜……喜……喜欢我……么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸红耳赤，低眉螓首地用几不可闻的声音轻轻说到。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3040',
        any: [/PRINTFORMW 「既然落入你手，我还能怎样呢…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3056',
        any: [
          /PRINTFORMW 「咳……咳……咳…………啊～魔王大人……好孔武有力啊……唔！～……咳……咳……咳…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3059',
        any: [
          /PRINTFORMW 「咳……咳……咳…………慢！慢些！吸不过来啦！……唔！～……咳……咳……咳…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3062',
        any: [
          /PRINTFORMW 「咳……咳……咳…………要……要窒息了……！……唔！～……咳……咳……咳…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3070',
        any: [
          /PRINTFORMW 「咳……唔……唔…………呼～还可以再深些哦…………唔！～……咳……呃……呃…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3074',
        any: [
          /PRINTFORMW 「咳……唔……唔…………人家的…噢！………还可以……往喉咙……里…面…去…………唔！～……咳……呃……呃…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3078',
        any: [
          /PRINTFORMW 「咳……咳……咳…………唔～唔～哦！……差点被口水呛到…………唔！～……咳……咳……咳…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3082',
        any: [
          /PRINTFORMW 「咳……咳……咳…………慢！慢些！……要窒息了……！……唔！～……咳……咳……咳…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3094-3907',
        any: [/PRINTFORMW 「只……只是舔一下的话………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3104',
        any: [/PRINTFORMW 「只……只是舔一下的话………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3107',
        any: [/PRINTFORMW 「讨，讨厌！别舔啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3115',
        any: [/PRINTFORMW 「啊啊…唔～哦！…好孩子…真乖！～继续舔我吧～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3119',
        any: [/PRINTFORMW 「啊哈～♪　和狗弄，也不错～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3123',
        any: [/PRINTFORMW 「魔王大人哦……狗是不能满足人家的啦～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3127',
        any: [/PRINTFORMW 「呼～…呼～…哦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3131',
        any: [/PRINTFORMW 「满意了没？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3135',
        any: [/PRINTFORMW 「咦……？！好臭……不要过来！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3150',
        any: [/PRINTFORMW 「不！不要啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3153',
        any: [/PRINTFORMW 「快！快停手！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3161',
        any: [/PRINTFORMW 「嘻嘻…好孩子～乖孩子～。继续舔哦～…啊～哦～～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3165',
        any: [/PRINTFORMW 「噢～被狗舔舐着…有感觉了！～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3169',
        any: [/PRINTFORMW 「魔王大人啊～总是觉得……怪怪的……没你弄的舒服！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3173',
        any: [/PRINTFORMW 「呃…呃……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3177',
        any: [/PRINTFORMW 「呜啊！！　不、不要弄！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3193',
        any: [/PRINTFORMW 「啊～！…我的胸……我的胸………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3196',
        any: [/PRINTFORMW 「饶，饶了我！　狗什么的！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3204',
        any: [/PRINTFORML 「我的胸，好吃么？　嘻嘻…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3205',
        any: [/PRINTFORMW %SAVESTR:TARGET%慈爱地抱着在她胸部不断舔舐着的狗。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3209',
        any: [/PRINTFORMW 「好舒服～…继续！继续舔我～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3213',
        any: [/PRINTFORMW 「魔王大人啊～…这感觉…好奇怪啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3217',
        any: [/PRINTFORMW 「啊～！哦～！…才……才没有……感觉呢！！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3221',
        any: [/PRINTFORMW 「被这样的动物………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3236',
        any: [/PRINTFORMW 「呵呵～人家的初吻…被你这家伙拿到了～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3239',
        any: [/PRINTFORMW 「初吻给了狗啊～…也不错啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3242',
        any: [/PRINTFORMW 「明……明明想留给魔王大人的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3245',
        any: [
          /PRINTFORMW 「别！别这样！　我的初吻………怎么这样………呜呜……骗人的吧……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3253',
        any: [/PRINTFORMW 「呵呵～人家的初吻…被你这家伙拿到了～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3256',
        any: [/PRINTFORMW 「初吻给了狗啊～…也不错啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3259',
        any: [/PRINTFORMW 「明……明明想留给魔王大人的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3262',
        any: [
          /PRINTFORMW 「别！别这样！　我的初吻………怎么这样………呜呜……骗人的吧……………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3270',
        any: [/PRINTFORML %SAVESTR:TARGET%专心致志地与野狗唇舌交缠着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3271',
        any: [/PRINTFORMW 「哦～啊～狗的臭味………好好闻………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3275',
        any: [/PRINTFORMW 「要人家和狗亲吻什么的…魔王大人，真是个大绅士呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3279',
        any: [/PRINTFORMW 「魔王大人刚才说什么？我听不懂～听不到！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3283',
        any: [/PRINTFORMW 「好…好吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3287',
        any: [/PRINTFORMW 「好讨厌啊！…好臭！…请放过我吧！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3302',
        any: [/PRINTFORMW 「要你来舔我的屁股…真不好意思呢～汪汪君～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3305',
        any: [/PRINTFORMW 「啊～！这…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3308',
        any: [/PRINTFORMW 「呃……狗什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3311',
        any: [/PRINTFORMW 「不，不要啊！！　在舔哪里啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3319',
        any: [/PRINTFORML %SAVESTR:TARGET%用手扒开尻穴，接受着狗的舌头。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3320',
        any: [/PRINTFORMW 「哈…哈～…好……好啊～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3324',
        any: [/PRINTFORMW 「被狗这么舔…好奇怪啊…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3328',
        any: [/PRINTFORMW 「这到底怎么回事…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3332',
        any: [/PRINTFORMW 「好……好…吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3336',
        any: [/PRINTFORMW 「啊！！　那种地方…不要舔啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3353',
        any: [
          /PRINTFORML %SAVESTR:TARGET%完全成为一只牝犬了，发情地摇动着屁股引诱着狗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3354',
        any: [
          /PRINTFORML 「我把处女奉献给你！　我的逼，是狗大人专用的东西！请在我体内打种吧！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3355',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这么高叫着，因为交配的喜悦全身颤抖，流出口水了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3358',
        any: [/PRINTFORMW 「哎呀呀～第一次是和狗呢～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3361',
        any: [/PRINTFORMW 「明明想奉献给魔王大人的说………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3365',
        any: [/PRINTFORMW 「救……命……救命啊啊啊啊啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3371',
        any: [
          /PRINTFORML %SAVESTR:TARGET%完全成为一只牝犬了，发情地摇动着屁股引诱着狗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3372',
        any: [
          /PRINTFORML 「我的逼，是狗大人专用的东西！狠狠地操我！请在我体内打种吧！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3373',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这么高叫着，因为交配的喜悦全身颤抖，流出口水了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3376',
        any: [/PRINTFORMW 「啊？要和狗哦？…呃……虽然也不错啦…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3379',
        any: [/PRINTFORMW 「呜呜……魔王大人…为什么就不喜欢人家呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3382',
        any: [/PRINTFORMW 「救……命……救命啊啊啊啊啊啊啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3392',
        any: [/PRINTFORML %SAVESTR:TARGET%用狗的姿势，接受着来自后方的征讨。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3393',
        any: [
          /PRINTFORML 「交……交配着！　我和狗交配着！　我只是一只母狗！！　一只下贱的母狗！！啊～～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3394',
        any: [/PRINTFORMW 两只走兽相互交缠着，沉醉在肉欲中了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3396',
        any: [/PRINTFORML %SAVESTR:TARGET%沉浸在交配的愉悦中，放声大叫着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3397',
        any: [
          /PRINTFORML 「啊啊啊～！　好棒～！　操我！！　噢噢噢！！　再来！再来！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3398',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抛弃了作为人的身份，完全成为一只发情的母兽了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3400',
        any: [/PRINTFORML %SAVESTR:TARGET%兴奋地摇动着屁股引诱着狗。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3401',
        any: [
          /PRINTFORML 「来嘛…这里是狗大人的专用肉穴哦！……来这里播种吧～…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3402',
        any: [
          /PRINTFORMW 那副发情野兽一样的表情，已经完全看不到当初冷静的样子了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3407',
        any: [/PRINTFORMW 「和狗做爱的经验也是必须的呢～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3411',
        any: [/PRINTFORMW 「如果是魔王大人的命令的话…………和狗也…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3415',
        any: [/PRINTFORMW 「难以置信…我……居然和狗在交配………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3419',
        any: [/PRINTFORMW 「呜呜………要和狗……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3423',
        any: [/PRINTFORMW 「讨厌！…这种事………太过分了！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3439',
        any: [
          /PRINTFORML %SAVESTR:TARGET%完全成为一只牝犬了，发情地摇动着屁股引诱着狗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3440',
        any: [/PRINTFORMW 「请欺负我…欺负我后面的穴吧～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3443',
        any: [/PRINTFORMW 「带狗走后门………吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3446',
        any: [/PRINTFORMW 「呜……要和狗肛交………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3449',
        any: [/PRINTFORMW 「什么…这……是骗我的……对吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3458',
        any: [/PRINTFORML %SAVESTR:TARGET%感觉自己的尻穴都要融化了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3459',
        any: [/PRINTFORML 「啊～狗大人的鸡鸡！塞满了我下贱的菊穴…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3460',
        any: [
          /PRINTFORMW 都成这个样子了，看来%SAVESTR:TARGET%是无法再回头了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3462',
        any: [/PRINTFORML %SAVESTR:TARGET%兴奋地扒开自己的尻穴……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3463',
        any: [/PRINTFORML 「狗大人…喜欢的话，请尽情使用我这下烂的洞吧！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3464',
        any: [
          /PRINTFORMW 向狗不断献媚着，%SAVESTR:TARGET%现在已经是畜生以下的存在了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3469',
        any: [/PRINTFORMW 「和狗…也挺舒服的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3473',
        any: [/PRINTFORMW 「如果是和魔王大人的话…就更好了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3477',
        any: [/PRINTFORMW 「魔王大人…为什么啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3481',
        any: [/PRINTFORMW 「屁股…和狗…呜呜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3485',
        any: [/PRINTFORMW 「你这疯子！！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3500',
        any: [/PRINTFORMW 「形状真独特！……这就是狗的鸡鸡啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3503',
        any: [/PRINTFORMW 「呜……它勃起来了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3506',
        any: [/PRINTFORMW 「狗的臭味……满手都是……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3509',
        any: [/PRINTFORMW 「呕…………好脏……这种东西…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3518',
        any: [/PRINTFORMW 「舒服么？　嘻嘻！不停地脉动着呢！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3520',
        any: [/PRINTFORMW 「野兽的味道……变浓烈的啊。来！把精液射出来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3526',
        any: [/PRINTFORMW 「哈哈～汪汪地叫着……真可爱！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3528',
        any: [/PRINTFORMW 「有感觉了么？　原来狗也和人一样啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3534',
        any: [/PRINTFORMW 「好厉害！野兽的气味！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3536',
        any: [/PRINTFORMW 「这个……了不起的压迫感啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3541',
        any: [/PRINTFORMW 「呵呵～有感觉饿了？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3545',
        any: [/PRINTFORMW 「狗的话……应该很容易搞定吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3549',
        any: [/PRINTFORMW 「咦……好臭……这种……脏东西…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3564',
        any: [/PRINTFORMW 「原来如此，狗的小鸡鸡，是这个味道啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3567',
        any: [
          /PRINTFORMW 「人家不想舔这种东西！……但是……如果……是魔王大人的爱好……的话……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3570',
        any: [/PRINTFORMW 「知……知道了………只是吸一下哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3573',
        any: [
          /PRINTFORMW 「讨，讨厌！　不想把这东西放嘴里！！　住！住手！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3581',
        any: [
          /PRINTFORML 「唔～唔～滑溜溜的…………唔啊！……鸡鸡……鸡鸡……狗大人的鸡鸡……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3582',
        any: [/PRINTFORMW %SAVESTR:TARGET%气息慌乱，癫狂地吸啜着狗的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3586',
        any: [/PRINTFORMW 「哪怕是狗！我都能用嘴搞定～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3590',
        any: [/PRINTFORMW 「臭臭的……不过，并不讨厌……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3594',
        any: [
          /PRINTFORMW 「是命令的话……不管是狗还是什么，我都会尽心地服侍好的……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3598',
        any: [/PRINTFORMW 「知……知道啦……偶尔要也侍奉人以外的东西吗…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3602',
        any: [/PRINTFORMW 「讨！讨厌！　呕…………臭死了……这野兽！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3619',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3622',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3625',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3628',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3634',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3637',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3640',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3643',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3653',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3655',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3657',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3663',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3665',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3667',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3669',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3675',
        any: [/PRINTFORML /],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3677',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3679',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3681',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3687',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3689',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3691',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3693',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3698',
        any: [/PRINTFORML /],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3699',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3703',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3718',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3721',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3729',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3733',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3737',
        any: [/PRINTFORML /],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3741',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3745',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3761',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3764',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3767',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3770',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3778',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3782',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3786',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3790',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3794',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3798',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3802',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3806',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3810',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3819',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3823',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3827',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3831',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3848',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……原来是个勇者……但我现在已经不当勇者，改当魔王大人的家畜了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3849',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边对水晶球这么说着，一边抱紧了旁边的狗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3850',
        any: [
          /PRINTFORMW 「在那以后，就一直在主人的命令下与狗大人在交配……享受着家畜的最高快乐～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3851',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3854',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……原来是个勇者……但我现在已经不当勇者，成为魔王大人的牝奴隶了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3855',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边对水晶球淫靡地扭腰摆臀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3856',
        any: [
          /PRINTFORMW 「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3857',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3860',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……原来是个勇者……但我现在已经不当勇者，成为魔王大人的奴隶了。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3861',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边顺从地对水晶球分开双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3862',
        any: [
          /PRINTFORMW 「在主人的命令下，有时还要和狗交配……尽情地鄙视这样下贱的我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3863',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3866',
        any: [
          /PRINTFORMW 「看到这个水晶球的人！谁都好！谁都可以！！请来救救我吧！！呜呜……呜呜呜…………哇！！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3877',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……大家对我的上一部作品感觉如何呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3878',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边对水晶球这么说着，一边抱紧了旁边的狗。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3879',
        any: [
          /PRINTFORMW 「这次，也是在主人的命令下要和狗大人交配了……嘻嘻～当家畜真幸福呢～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3880',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3884',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……大家对我的上一部的兽交作品感觉如何呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3885',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边对水晶球淫靡地扭腰摆臀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3886',
        any: [
          /PRINTFORMW 「这次，在主人的命令下，我又要和狗交配了……尽情地鄙视这样下贱的我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3887',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3891',
        any: [
          /PRINTFORMW 「呃……我叫%SAVESTR:TARGET%……大家对我的上一次的交配感觉如何呢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3892',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边这么说着，一边顺从地对水晶球分开双腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3893',
        any: [
          /PRINTFORMW 「这次，在主人的命令下，我又要和狗交配了……尽情地鄙视这样下贱的我吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3894',
        any: [
          /PRINTFORMW 「现在，就让我们围绕小鸡鸡，做许许多多舒服的事情吧！嘻嘻～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3898',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3915-4114',
        any: [/PRINTFORMW 「黏糊糊的……好想蹭到魔王大人身上！…嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3917',
        any: [/;SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3920-3921',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3923-3924',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3926',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3936',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3942',
        any: [/PRINTFORMW 「黏糊糊的……好想蹭到魔王大人身上！…嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3943',
        any: [
          /PRINTFORMW 「人家好感动哦～魔王大人，是不想让人家感到痛而使用润滑液的吧……魔王大人，爱你哦～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3946',
        any: [
          /PRINTFORMW 「魔王大人……看看嘛……人家的爱意，人家的爱液……都已经因你而溢出了啦～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3952',
        any: [/PRINTFORMW 「什么嘛！这黏糊糊的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3953',
        any: [/PRINTFORMW 「这……是不想让我那么痛吧？……算你有点良心……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3956',
        any: [
          /PRINTFORMW 「不会吧…我……我……居然这么湿了………不！不……不！！……我不是这样子的！………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3965',
        any: [/P = PALAM:5 \+ UP:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3971',
        any: [/PRINTFORMW 「啊～五彩缤纷的！好棒～好棒啊！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3974',
        any: [
          /PRINTFORMW 「魔王大人…我已经是你的人了……请好好地疼爱人家吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3980',
        any: [/PRINTFORMW 「卑鄙！…用这种手段………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3983',
        any: [/PRINTFORMW 「难以置信…我………居然……感到愉悦………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3992',
        any: [/P = PALAM:8 \+ UP:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3996',
        any: [/PRINTFORMW 「魔王大人！…你好坏！人家羞羞嘛～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '3999',
        any: [/PRINTFORMW 「讨厌……这样…好羞耻啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4007',
        any: [/P = PALAM:10 \+ UP:10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4011',
        any: [/PRINTFORMW 「魔王……大人……　有时候…你……好可怕啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4014',
        any: [/PRINTFORMW 「呜……呜……我……我……知道为什么你是魔王了！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4025',
        any: [
          /PRINTFORMW 「魔……魔王……大人……要去了！！……人家要去了！！……可以去了吗？…………谢谢…魔王大人………啊～！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4028',
        any: [
          /PRINTFORMW 「来了…要来了！　体内有什么东西！　唔哦哦哦哦哦哦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4039',
        any: [
          /PRINTFORMW 「啊啊啊！　小穴！小穴要去了！！　要对这感觉上瘾了啦！～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4042',
        any: [
          /PRINTFORMW 「啊啊啊！　里面…有什么…这…………？！……唔……哦哦哦哦哦！…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4045',
        any: [/PRINTFORMW 「别！别这样！…呃……忍不住了！…唔哦哦哦哦哦哦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4056',
        any: [
          /PRINTFORMW 「啊哈！　好！　好棒！　第一次……第一次用菊花高潮了！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4059',
        any: [
          /PRINTFORMW 「难以置信……我的屁股……我的屁股………要变成性器官了！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4062',
        any: [
          /PRINTFORMW 「讨厌！讨厌！！　这个洞是错的啊！！　不想去！不要去！！…不……要……哇啊啊啊啊啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4073',
        any: [/PRINTFORMW 「胸部…好幸福………啊啊！去了！要去了啦！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4076',
        any: [
          /PRINTFORMW 「啊！唔啊啊！！　我的胸……我的胸………呜哦哦哦哦哦！～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4090',
        any: [/PRINTFORMW 「啊～终于……终于成为女人了……比想象中还要痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4093',
        any: [
          /PRINTFORMW 「啊～终于……终于把自己奉献给了魔王大人……好痛……就不能轻一点吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4096',
        any: [/PRINTFORMW 「这就是……做为女人的感觉…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4102',
        any: [/PRINTFORMW 「啊～终于……从今往后，百无禁忌！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4105',
        any: [
          /PRINTFORMW 「呜呜……明明……明明……想把处女奉献给魔王大人的嘛…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4108',
        any: [/PRINTFORMW 「这就是……做为女人的感觉…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4119-4178',
        any: [/PRINTFORMW 「感觉好痛苦……这难道……也是……爱的滋味吗？……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4121',
        any: [/;SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4124-4125',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4132',
        any: [/PRINTFORMW 「感觉好痛苦……这难道……也是……爱的滋味吗？……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4134',
        any: [/PRINTFORMW 「我……我会听话的……请不要再这么弄我了…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4145',
        any: [
          /PRINTFORMW 「有……有感觉了…………魔王大人……魔王大人哦！！……人家……人家变得好奇怪啊！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4147',
        any: [/PRINTFORMW 「有……有感觉了…………我……我变得好奇怪啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4158',
        any: [
          /PRINTFORMW 「人家会对魔王大人唯命是从的！………以后，请疼爱人家啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4160',
        any: [/PRINTFORMW 「呜呜呜……我……我听话还不行吗…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4171',
        any: [/PRINTFORMW 「魔王大人！……我讨厌你！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4173',
        any: [/PRINTFORMW 「你这家伙！……从现在开始！……不会再忍让你啦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4182-4432',
        any: [
          /PRINTFORMW 「啊……我是多么下流的女人啊…这么…这么自慰……根本停不下来……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4189',
        any: [
          /PRINTFORMW 「啊……我是多么下流的女人啊…这么…这么自慰……根本停不下来……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4193',
        any: [/PRINTFORMW 「魔王大人………魔王大人啊…………唔……唔…………噢！！～…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4197',
        any: [/PRINTFORMW 「停不下来…停不下来啦～…变得好奇怪！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4201',
        any: [/PRINTFORMW 「唔……呃……哦！～………啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4212',
        any: [
          /PRINTFORMW 「女人的身体…真是好东西啊…唔哦！！……再更加……再更加粗暴地对待我吧！…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4216',
        any: [
          /PRINTFORMW 「女人的身体…真是好东西啊…嘻嘻！……再更加抱紧我吧！…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4220',
        any: [/PRINTFORMW 「没有百合的话…我可能活不下去了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4224',
        any: [/PRINTFORMW 「女人哦………可是………好棒啊…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4228',
        any: [/PRINTFORMW 「我居然…对…女人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4239',
        any: [/PRINTFORMW 「我吸！唔～哦～唔～唔～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4240',
        any: [/PRINTFORMW 「果然！主人的精华，在早上是最浓的呢…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4241',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%伸出舌头，把嘴里滴落的精液舔干净了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4245',
        any: [/PRINTFORMW 「嘻嘻～醒啦～？♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4246',
        any: [/PRINTFORMW %SAVESTR:TARGET%甜甜地笑着，用心地侍奉着你的阴茎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4247',
        any: [
          /PRINTFORMW 「主人的小鸡鸡～今天也很精神呢～♪　请今天也，好好地疼爱人家吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4248',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%这么说着，柔情无限地看着你。突然，往你阴茎上亲了一口。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4252',
        any: [/PRINTFORMW 「主人！主人！日上三竿了哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4256',
        any: [/PRINTFORMW 「早上好～！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4267',
        any: [
          /PRINTFORMW 「唔～哦哦哦哦！……好棒！……好……棒……啊～！……啊啊啊啊啊！～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4271',
        any: [/PRINTFORMW 「再来！再来！魔王大人那热热的肉棒！再给我吧～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4281',
        any: [
          /PRINTFORMW 「请……用力地抱着我吧……实在是疼得没办法了………想你想得快发疯啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4292',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4295',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4298',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4301',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4303',
        any: [/PRINTFORML /],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4317',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4320',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4323',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4326',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4329',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4332',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4335',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4349',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4352',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4355',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4358',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4361',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4364',
        any: [/PRINTFORMW/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4367',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4380',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4383',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4395',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4407',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4410',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4420',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4423',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4463-4551',
        any: [/PRINTFORMW 「这种蠢事………我还是第一次………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4470',
        any: [/PRINTFORMW 「这种蠢事………我还是第一次………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4475',
        any: [/PRINTFORMW 「可恶！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4481',
        any: [/PRINTFORMW 「求你们！　放过我………这种事，要和喜欢的人做………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4485',
        any: [/PRINTFORMW 「用……用后面吧！！　虽然有点脏…不过我不介意的…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4489',
        any: [/PRINTFORMW 「呜……我用嘴！……我用嘴可以么？…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4495',
        any: [/PRINTFORMW 「开什么玩笑！！　我绝不承认！…绝不屈服！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4500',
        any: [/PRINTFORMW 「这……莫非就是我的命运………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4505',
        any: [/PRINTFORMW 「这种屈辱……我绝不屈服！！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4511',
        any: [/PRINTFORMW （她早就把处女用掉了！）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4516',
        any: [/PRINTFORMW 「唉………………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4522',
        any: [/PRINTFORMW 「把我救出去吧？我再好好地报答你们？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4526',
        any: [/PRINTFORMW 「用后面……用后面的话……就随你们弄………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4530',
        any: [/PRINTFORMW 「其它放过我！我用嘴！我用嘴尽力地满足你们？…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4536',
        any: [
          /PRINTFORMW 「你们也许可以摆布我的身体！但我的内心绝不屈服！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4541',
        any: [/PRINTFORMW 「我……要完蛋了吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4546',
        any: [/PRINTFORMW 「我不会屈服！！　绝对…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4554-4617',
        any: [/PRINTFORMW 「呼………我…的……纯洁……平安无恙………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4561',
        any: [/PRINTFORMW 「呼………我…的……纯洁……平安无恙………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4566',
        any: [/PRINTFORMW 「哼！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4573',
        any: [/PRINTFORMW 「屁股……好痛苦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4574',
        any: [/PRINTFORMW 「如此的……粗暴……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4579',
        any: [/PRINTFORMW 「这么舔……还是……第一次………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4583',
        any: [/PRINTFORMW 「射了……好多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4586',
        any: [/PRINTFORMW 「终于……结束了吗……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4591',
        any: [/PRINTFORMW 「…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4598',
        any: [/PRINTFORMW 「里面……要被弄坏了啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4599',
        any: [/PRINTFORMW 「好过分……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4604',
        any: [/PRINTFORMW 「屁股……已经没有感觉了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4605',
        any: [/PRINTFORMW 「真糟糕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4610',
        any: [/PRINTFORMW 「舔得我都快吐了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4614',
        any: [/PRINTFORMW 「射了……好多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4620-4755',
        any: [
          /PRINTFORMW 「唔嗯、了解了。作为肉便器来服务他们就可以了是吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4645',
        any: [
          /PRINTFORMW 「唔嗯、了解了。作为肉便器来服务他们就可以了是吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4646',
        any: [/PRINTFORMW 「没问题。毕竟『常识改变成毫不怕脏』了嘛」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4647',
        any: [
          /PRINTFORMW 「来吧、把你们这群家伙的肉棒都掏出来。会把你们榨个干净的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4651',
        any: [/PRINTFORML 「呵……你们这群家伙应该感到荣幸。人称冷澈勇者的我」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4652',
        any: [/PRINTFORMW 「作为肉便器来服务你们了呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4653',
        any: [/PRINTFORMW 「怎么啦？　不这么更直接点就硬不起来了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4654',
        any: [/PRINTFORMW 「呵呵、真乖……嗯、这不是挺大的嘛……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4656',
        any: [/PRINTFORMW 「嘻嘻…肮脏的鸡鸡…！　让我来把它弄的漂漂亮亮吧…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4660',
        any: [/PRINTFORMW 「这也是……为了那个人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4663',
        any: [/PRINTFORMW 「请让我…好好地侍奉吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4666',
        any: [/PRINTFORMW 「讨厌…这种肮脏的家伙………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4672',
        any: [/PRINTFORMW 「我是个男女均可的变态…！　再弄我！再弄我吧！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4675',
        any: [/PRINTFORMW 「女人的气味……好舒心……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4678',
        any: [/PRINTFORMW 「好的……现在就来舔小穴………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4681',
        any: [/PRINTFORMW 「女人什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4687',
        any: [
          /PRINTFORMW 「呵呵、兽奸吗……还以为是『更过分的催眠』呢、真是扫兴」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4688',
        any: [
          /PRINTFORMW 「已经『催眠得会对野兽发情』什么的、这么做也是理所应当的吧？　呵呵、好期待啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4689',
        any: [/PRINTFORMW 「让狗兴奋起来吧。准备要像兽爱变态女一样痴喘咯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4692',
        any: [/PRINTFORMW 「看着我吧！我是个喜欢和动物做爱的变态！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4695',
        any: [/PRINTFORMW 「唔唔～动物的臭味～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4698',
        any: [/PRINTFORMW 「好……好的……现在去抱动物………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4701',
        any: [/PRINTFORMW 「再……再来………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4707',
        any: [
          /PRINTFORMW 「明白了。把菊穴和肉穴都掰开来做『肉便器服务』就好了是吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4708',
        any: [
          /PRINTFORMW 「我也是见过风浪的人。这种程度的『肉便器服务』怎么可能会犹豫呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4709',
        any: [/PRINTFORMW 「来吧、小子们！　肉棒硬了的家伙就放马过来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4712',
        any: [/PRINTFORMW 「不管前面也好，后面也好……请把我塞满吧！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4715',
        any: [/PRINTFORMW 「那里……和屁股………都……哦～啊啊啊啊！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4718',
        any: [/PRINTFORMW 「请，请用光我所有的穴吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4721',
        any: [/PRINTFORMW 「双管齐下什么的………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4727',
        any: [/PRINTFORMW 「我的小穴，舒服么？随你喜欢来用哦～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4730',
        any: [/PRINTFORMW 「把安全套拿走吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4733',
        any: [/PRINTFORMW 「请……随意使用我的小穴……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4736',
        any: [/PRINTFORMW 「那里………啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4742',
        any: [
          /PRINTFORMW 「啊～我是菊穴也很有感觉的尻穴奴隶！…～♪　再来！…啊啊～！啊～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4745',
        any: [/PRINTFORMW 「屁股…好厉害…啊！！噢～～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4748',
        any: [/PRINTFORMW 「屁，屁股………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4751',
        any: [/PRINTFORMW 「啊～！……那里是………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4758-4810',
        any: [/PRINTFORMW 「哼…这些杂鱼～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4763',
        any: [/PRINTFORMW 「哼…这些杂鱼～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4768',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4775',
        any: [/PRINTFORMW 「别做无谓的抵抗啦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4777',
        any: [/PRINTFORMW 「就这水平…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4779',
        any: [/PRINTFORMW 「真难看啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4785',
        any: [/PRINTFORMW 「呼……真惊险…哈哈！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4792',
        any: [/PRINTFORMW 「好！赢了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4794',
        any: [/PRINTFORMW 「我赢啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4796',
        any: [/PRINTFORMW 「嗯……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4803',
        any: [/PRINTFORMW 「呜…太轻敌了吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4806',
        any: [/PRINTFORMW 「给魔王带话，让他带更厉害的家伙来见我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4813-4898',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4823',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4830',
        any: [/PRINTFORMW 「渣滓！！　消失吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4832',
        any: [/PRINTFORMW 「踢飞你们！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4834',
        any: [/PRINTFORMW 「你们的末日到啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4840',
        any: [/PRINTFORMW 「呜……要一直战斗下去么……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4847',
        any: [/PRINTFORMW 「让我来教你们什么是战斗。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4849',
        any: [/PRINTFORMW 「哼……就这程度」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4851',
        any: [/PRINTFORMW 「你这家伙……死了么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4860',
        any: [/PRINTFORMW 「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4867',
        any: [/PRINTFORMW 「嘻嘻……这甘甜的力量，你也来品尝一下嘛～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4869',
        any: [/PRINTFORMW 「哇哈哈～新的力量……太厉害了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4871',
        any: [/PRINTFORMW 「教你愉悦的事……在地下室里……有许多好玩的～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4877',
        any: [/PRINTFORMW 「再……再给我力量……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4884',
        any: [/PRINTFORMW 「从魔王大人处获得的力量……就让你见识一下吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4886',
        any: [/PRINTFORMW 「过来这边吧……你也就明白了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4888',
        any: [/PRINTFORMW 「呵呵～可爱的家伙，不过你什么都不知道啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4905-5035',
        any: [/PRINTFORMW %SAVESTR:TARGET%连站都站不稳了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4912',
        any: [/PRINTFORMW %SAVESTR:TARGET%连站都站不稳了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4914',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在死斗场的热情及对方凌厉的眼神中哆嗦着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4926',
        any: [/PRINTFORMW 「才…才不会输给%SAVESTR:ASSI%呢！……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4927',
        any: [/PRINTFORMW 筋疲力尽的%SAVESTR:TARGET%屁股向后跌坐在地上……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4929',
        any: [
          /PRINTFORMW 「啊…啊…不……不要…才不要被这种怪物侵犯！…不要！不要！……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4930',
        any: [
          /PRINTFORMW 筋疲力尽的%SAVESTR:TARGET%连滚带爬地企图逃离死斗场。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4935',
        any: [/PRINTFORMW 「难……难道……要和%SAVESTR:ASSI%做对手么……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4936',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%皱着眉头，看着在%NAME:MASTER%命令之下武装起来的%SAVESTR:ASSI%……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4938',
        any: [/PRINTFORMW 「呕……这……这么恶心的怪物……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4939',
        any: [/PRINTFORMW %SAVESTR:TARGET%看着对面丑陋的怪物，表情都扭曲了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4951',
        any: [/PRINTFORMW 「啊…唔……唔唔………就……就在这里吗？…咳……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4952',
        any: [/PRINTFORM %SAVESTR:ASSI%把/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4954',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4956',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4957',
        any: [
          /PRINTFORMW 粗暴地塞入%SAVESTR:TARGET%的嘴里，露出了心满意足的神情……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4959',
        any: [
          /PRINTFORMW 「啊………会……会好好地舔的啦…………所以……所以……不要再做其它过分的事啦……呃……唔…………唔唔…………咳……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4960',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔啜着带着令人作呕的气味的阴茎……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4970',
        any: [/PRINTFORMW 「啊…%SAVESTR:ASSI%啊…停……手…快停手啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4971',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%无力反抗……任由%SAVESTR:ASSI%肆意地玩弄着她的胸部……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4973',
        any: [/PRINTFORMW 「呜………为……为什么……我要遇上这种事啊………呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4974',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的胸部被粗鲁地揉捏着，发出了痛苦的呻吟……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4984',
        any: [/PRINTFORMW 「啊…！唔……啊啊啊！…好深………弄的好深啦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4985',
        any: [/PRINTFORM %SAVESTR:ASSI%听到悲鸣，更加兴奋了，继续用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4987',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4989',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4990',
        any: [/PRINTFORMW 毫不留情地蹂躏着%SAVESTR:TARGET%的私处……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4993',
        any: [/PRINTFORMW 「死………死………要…死掉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4994',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%断断续续地发出崩溃的声音，承受着巨魔的糟蹋。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4996',
        any: [/PRINTFORMW 「被……被这样的家伙……呜……唔……哎呀！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '4997',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物尽情侵犯着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5008',
        any: [/PRINTFORMW 「呜！啊啊啊啊！屁股……屁股…要被弄坏啦！！」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5009',
        any: [/PRINTFORM %SAVESTR:ASSI%听到悲鸣，更加兴奋了，继续用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5011',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5013',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5014',
        any: [/PRINTFORMW 毫不留情地蹂躏着%SAVESTR:TARGET%的肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5017',
        any: [/PRINTFORMW 「死………死………要…死掉了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5018',
        any: [
          /PRINTFORMW 可怜的%SAVESTR:TARGET%断断续续地发出崩溃的声音，承受着巨魔的糟蹋。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5020',
        any: [
          /PRINTFORMW 「被……被这样的家伙……呜……唔……哎呀！！屁股……屁股……要被弄坏啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5021',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物尽情地侵犯着肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5030',
        any: [/PRINTFORMW 「这……这种药………我………我………呃！！……噢噢哦噢～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5038-5115',
        any: [/PRINTFORMW 「停…停手…啊………我……我…是你的了………呜……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5048',
        any: [/PRINTFORMW 「停…停手…啊………我……我…是你的了………呜……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5050',
        any: [/PRINTFORMW 「呜………啊…………我……被你征服啦………………呜……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5056',
        any: [
          /PRINTFORMW 「啊啊…啊…啊啊！…不……不要再来了………我的…屁股………唔……哦哦哦哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5058',
        any: [/PRINTFORMW 「啊！……你这变态…不要再来了…………唔………哦哦哦哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5064',
        any: [
          /PRINTFORMW 「唔哦…～啊啊！ 要坏掉了……要被狗大人玩坏掉啦！～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5066',
        any: [
          /PRINTFORMW 「啊…啊………讨厌………被看着……被看着啦………呜呜…唔！…噢…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5068',
        any: [/PRINTFORMW 「可恶…这么做的话…以后给我记住！…呜…唔…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5074',
        any: [
          /PRINTFORMW 「唔～…啊啊！…我…我……我是狂王大人…的…东西…再来…再来…再操我吧！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5076',
        any: [
          /PRINTFORMW 「唔～…哦！啊啊…噢！啊……！ 好、好深啊………要去了…要……去……了！！！～♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5082',
        any: [
          /PRINTFORMW 「看啊…我的小穴也好，尻穴也好，都塞进了你们的小鸡鸡哦～%UNICODE\(0x2661\) \*1% 嘻嘻～啊！同时被插入太舒服啦！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5084',
        any: [/PRINTFORMW 「呵呵…再…再侵犯我………把我弄得乱七八糟吧！………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5090',
        any: [
          /PRINTFORMW 「啊…再来…再狠狠地弄我…噢…已经……回不去那人的身边了………操我！…弄我！…把我操坏吧！～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5092',
        any: [
          /PRINTFORMW 「啊…啊……输掉了话………就失去一切啊………噢！……对不起……会……会用心侍奉的………啊！唔唔！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5098',
        any: [/PRINTFORMW 「狂王大人…啊啊…好舒服……请……请继续…使用我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5100',
        any: [/PRINTFORMW 「啊啊…会……会继续…侍奉您的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5107',
        any: [/PRINTFORMW 「还……还给我！…那……那是……我和魔王大人的孩子啊！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5109',
        any: [
          /PRINTFORMW 「是……是啊……我的子宫，是属于狂王大人的东西～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5112',
        any: [/PRINTFORMW 「啊…好想～继续怀上啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5119-5133',
        any: [/PRINTFORMW 「放，放开我！我…侍奉怪物什么的………呜…呜哇哇！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5123',
        any: [/PRINTFORMW 「放，放开我！我…侍奉怪物什么的………呜…呜哇哇！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5126',
        any: [
          /PRINTFORMW 「讨厌…讨厌！我变得不像我自己了…不要！……不、要、啊…啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5129',
        any: [/PRINTFORMW 「混蛋！给我记住！！………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5132',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5136-5168',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5140',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5143',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5146',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5149',
        any: [/PRINTFORMW 「短时间内、维持这个姿势还可以做到…这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5152',
        any: [/PRINTFORMW 「怎、怎么了…？身体…动、动不…了、呃…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5155',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5158',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5161',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5164',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5167',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5171-5189',
        any: [/PRINTFORMW 「我的…力量…被那样地………骗人…吧…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5176',
        any: [/PRINTFORMW 「我的…力量…被那样地………骗人…吧…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5179',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5182',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5185',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5188',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5192-5204',
        any: [/PRINTFORMW 「到死为止都要被侵犯？呃……有趣…来试试呗！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5197',
        any: [/PRINTFORMW 「到死为止都要被侵犯？呃……有趣…来试试呗！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5200',
        any: [
          /PRINTFORMW 「这种…罪犯似的结局…我绝不认可！…放开我！…放开我！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5203',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5207-5231',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5212',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5215',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5218',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5221',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5224',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5227',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5230',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5234-5249',
        any: [/PRINTFORMW 「………呃……魔王……吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5239',
        any: [/PRINTFORMW 「………呃……魔王……吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5242',
        any: [/PRINTFORMW 「就让我来干掉魔王吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5245',
        any: [/PRINTFORMW 「我，应该能干掉魔王吧………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5248',
        any: [/PRINTFORMW 「遇到魔王的话，就干掉他！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5251-5286',
        any: [/PRINTFORMW 「钱钱钱！嘻嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5256',
        any: [/PRINTFORMW 「钱钱钱！嘻嘻嘻～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5259',
        any: [/PRINTFORM 「拜托了…让我和/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5261',
        any: [/PRINT 狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5262',
        any: [/ELSEIF Y == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5263',
        any: [/PRINT 猪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5264',
        any: [/ELSEIF Y == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5265',
        any: [/PRINT 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5267',
        any: [/PRINTFORMW 交配吧……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5270',
        any: [/PRINTFORMW 「嘻嘻！…魔王大人要和我来个很长很长的湿吻哦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5273',
        any: [/PRINTFORMW 「…人家回来的时候，想被魔王大人温情地抱一阵子。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5276',
        any: [/PRINTFORMW 「嘻嘻！魔王大人先把精液存着！等我回来拿～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5279',
        any: [/PRINTFORMW 「想进行一场了不得的乱交呢！…都是你害得啦！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5282',
        any: [/PRINTFORMW 「回来之后…想喝魔王大人的尿………可以么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5285',
        any: [/PRINTFORMW 「嘻嘻！想收一个童贞啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5288-5364',
        any: [/PRINTFORMW 「是这样啊……我明白了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5295',
        any: [/PRINTFORMW 「是这样啊……我明白了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5298',
        any: [/PRINTFORMW 「呵呵呵～谢谢谢谢～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5302',
        any: [/PRINTFORMW 「钱，是人类最好的朋友～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5307',
        any: [
          /PRINTFORMW 「啊！～哦～！…用肛门和狗交配……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5309',
        any: [
          /PRINTFORMW 「啊！～哦～！…和狗交配什么的……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5315',
        any: [
          /PRINTFORMW 「啊！～哦～！…用肛门和猪交配……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5317',
        any: [
          /PRINTFORMW 「啊！～哦～！…和猪交配什么的……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5323',
        any: [
          /PRINTFORMW 「啊！～哦～！…用肛门和马交配……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5325',
        any: [
          /PRINTFORMW 「啊！～哦～！…和马交配什么的……停不下来～停不下来啦！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5329',
        any: [
          /PRINTFORMW 「嘻嘻～和魔王大人接吻的时候，回想起了自己少女的时光呢～…啊！失言了。请忘掉吧～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5334',
        any: [/PRINTFORMW 「啊！魔王大人……请～请继续侵犯我吧！～噢哦～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5337',
        any: [/PRINTFORMW 「啊！魔王大人……请～请继续侵犯我吧！～噢哦～…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5341',
        any: [/PRINTFORMW 「嘻嘻～为了喝魔王大人的精液，我活着回来啦！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5346',
        any: [/PRINTFORMW 「啊…第一次就这么结束了么…还想继续啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5348',
        any: [/PRINTFORMW 「啊…结束了么…还想继续啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5352',
        any: [/PRINTFORMW 「嘻嘻～为了喝魔王大人的尿尿，我活着回来啦！～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5357',
        any: [
          /PRINTFORMW 「呵呵呵，童贞的感觉就是不一样呢～我的那里，舒服么？%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5360',
        any: [
          /PRINTFORMW 「呵呵呵，童贞的感觉就是不一样呢～我的菊穴，舒服么？%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5363-5365',
        any: [/;------------------------------/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5366-5426',
        any: [/PRINTFORMW 「魔王大人真宽容……下次不会再失败的了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5373',
        any: [/PRINTFORMW 「魔王大人真宽容……下次不会再失败的了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5378',
        any: [/PRINTFORMW 「哦…好！…好啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5380',
        any: [/PRINTFORMW 「啊！…讨厌电流！！讨厌！讨厌！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5386',
        any: [/PRINTFORMW 「快……快看我淫贱自慰的样子～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5388',
        any: [/PRINTFORMW 「好……好羞耻啊……………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5394',
        any: [/PRINTFORMW 「来！来看吧！……看我不知廉耻，拉屎的样子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5396',
        any: [/PRINTFORMW 「呜呜…唔………呜呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5402',
        any: [
          /PRINTFORMW 「啊！！魔王大人的鞭子！！最棒了！再……再用力地打我！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5404',
        any: [/PRINTFORMW 「呜！……啊？！…………唔哦！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5410',
        any: [/PRINTFORMW 「果然还是魔王大人的尿味道更好啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5412',
        any: [/PRINTFORMW 「这……这不是我的爱好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5416',
        any: [/PRINTW 「唉……不想做这种事啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5419',
        any: [/PRINTW 「呜…肚子饿了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5422',
        any: [
          /PRINTFORMW 「噢～喔喔喔喔喔！求求你！魔王大人！快来侵犯人家啊！！呜呜呜呜………………谁都好！什么东西都行！！来侵犯我！！强奸我吧！……啊啊啊啊！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5425',
        any: [/PRINTFORMW 「………好」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5429-5457',
        any: [/PRINTFORM 哦～♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5434',
        any: [/PRINTFORM 哦～♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5437',
        any: [/PRINTFORM 哦！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5440',
        any: [/PRINTFORM 啦……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5443',
        any: [/PRINTFORM 吧……算是……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5446',
        any: [/PRINTFORM 什么的……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5451',
        any: [/PRINTFORM 呢。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5453',
        any: [/PRINTFORM 嘛。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K4_冷徹.ERB',
        ref: '5455',
        any: [/PRINTFORM 啦。/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
