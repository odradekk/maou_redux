// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k11-lily.mjs（issue #242，WIP 1/N）

export const FILES = [
  {
    js: 'ere/kojo/kojo-k11-lily.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '100-105',
        any: [/@EVENTTRAIN\n#PRI\nFLAG:111 = 1\nSIF FLAG:7 == 0\n	FLAG:7 = 2\n/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '102',
        any: [/FLAG:111 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '106-113',
        any: [
          /@EVENTEND\n#LATER\nFLAG:111 = 0\n\n;--------------------------------------------------\n;EVENTTRAIN関係（X1をキャラ番号に置換）\n;調教開始時のセリフ CFLAG 201～219を使用\n;-------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '108',
        any: [/FLAG:111 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '114-514',
        any: [
          /@EVENTTRAIN\nSIF FLAG:7 <= 0\n	RETURN 0\nSIF TALENT:171 != 1\n	RETURN 0\n\n;-------------------------------------------------\n;初調教時 CFLAG:201\n;-------------------------------------------------\n;姉妹判定\n;TARGETにとってキャラ番号17は妹（300番台）\n;ASSIにとってキャラ番号24は姉（200番台）\nIF ASSI > 0 && NO:ASSI == 17\n	CFLAG:TARGET:21 = 317\n	CFLAG:ASSI:21 = 224\nENDIF\nIF CFLAG:201 == 0\n	DRAWLINE\n	;助手がマオ\n	IF ASSI > 0 && NO:ASSI == 17\n		;魔族\n		;IF TALENT:TARGET:314 == 9\n		;	PRINTFORMW \n		;	;魔族スイッチ１\n		;	CFLAG:400 = 1\n		;人間\n		;ELSE\n			PRINTFORML 『姐姐？你怎么会在这里？』\n			PRINTFORMW 「%SAVESTR:ASSI%！终于…终于找到你了！我们一起回村子里去吧！」\n			PRINTFORMW 眼前这个叫%SAVESTR:TARGET%的年轻女性，自称是%SAVESTR:ASSI%的姐姐\n			PRINTFORMW 而%SAVESTR:PLAYER%这才注意到，两人的音容神貌的确有几分相似。\n			PRINTFORMW 还有那顶火红的头发，以及瞳色更是一模一样。\n			PRINTFORML 『姐姐……为什么过了这么久才来找我？……我，我已经…』\n			PRINTFORMW %SAVESTR:ASSI%挽起了%SAVESTR:PLAYER%的臂弯。\n			PRINTFORML 『我已经…将自己全身心献给魔王大人了%UNICODE\(0x2661\) \*1% 村子什么的再也不想回去了%UNICODE\(0x2661\) \*1%』\n			PRINTFORML 「说谎！说谎！你一定是被这个家伙强迫的对吧！快放了%SAVESTR:ASSI%，奴隶什么的，让我来代替她！」\n			PRINTFORMW “你要是真的能代替%SAVESTR:ASSI%来满足我的话，我倒是可以考虑放过%SAVESTR:ASSI%。”听到%SAVESTR:PLAYER%的话，%SAVESTR:TARGET%缓慢而坚定地点点头。\n			PRINTFORML 「只要放过我妹妹，你要随便怎样对我都好！」\n			PRINTFORMW 看着姐姐的样子，%SAVESTR:ASSI%却不满地翘起了嘴，用谁也听不到的声音嘟囔着。\n			PRINTFORMW 『真是的，姐姐只会做多余的事………』\n		;ENDIF\n		;助手フラグも立つ\n		CFLAG:202 = 1\n	;助手無し\n	ELSE\n		;魔族\n		;IF TALENT:TARGET:314 == 9\n		;	PRINTFORMW \n		;人間\n		;ELSE\n			PRINTFORML 「我的妹妹呢！把我的妹妹还给我！」\n			PRINTFORMW 站在面前的这个年轻女性――%SAVESTR:TARGET%，不顾自己的处境，不由分说地怒斥着%SAVESTR:PLAYER%。\n			PRINTFORML 「是你把她抓到这里的吧！？我的妹妹——玛奥！！」\n			PRINTFORMW 听这么一说，%SAVESTR:PLAYER%发现这个女人的神情和那个可爱的乡下小姑娘挺相像的。\n			PRINTFORMW 那头火红的头发，还有瞳孔的颜色都一模一样。\n			PRINTFORMW 面对质问，%SAVESTR:PLAYER%微微点了点头，%SAVESTR:TARGET%一下子神色激动了起来。\n			PRINTFORML 「果然是在这里！求求你，请把她还给我！还给我！她是我的妹妹啊！」\n			PRINTFORMW 但她不知道的是，她的妹妹玛奥已经把全身心都献给%SAVESTR:PLAYER%了，更不会愿意离开的。\n			PRINTFORMW 但%SAVESTR:PLAYER%还是饶有趣味地思考了一下%SAVESTR:TARGET%的要求。\n			PRINTFORML 「嗯…想要见她？想要让她回去？也不是不可以。但是你愿意代替她做我的性奴隶，接受我的调教吗？」\n			PRINTFORMW 听到这样的话，%SAVESTR:TARGET%愣住了，脸上浮现出矛盾的复杂表情。\n			PRINTFORML “毕竟，为我解开封印的是你的妹妹啊。你作为她的姐姐，我当然也要好好‘感谢’一番才对。”%SAVESTR:PLAYER%俯身在她面前低语着，带着深深的恶意。\n			PRINTFORMW %SAVESTR:TARGET%的表情由恐惧变成了绝望。\n			PRINTFORML 「骗……骗人……不要啊……不要过来……」」\n			PRINTFORMW 那么，是时候为姐妹重聚的最终舞台做准备了。\n		;ENDIF\n	ENDIF\n	CFLAG:201 = 1\n	RETURN 1\n;-------------------------------------------------\n;魔族化（１回のみ）初回調教後魔族化、陥落前 CFLAG:400\n;-------------------------------------------------\nELSEIF CFLAG:201 < 5 && CFLAG:400 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0\n	PRINTFORMW \n;魔族スイッチ２\nCFLAG:400 = 2\nRETURN 1\n\n;-------------------------------------------------\n;NTR再捕獲 CFLAG:650～660\n;-------------------------------------------------\nELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1\n	IF TALENT:85 \|\| TALENT:76\n		DRAWLINE\n		PRINTFORMW \n		;NTRスイッチ解除\n		CFLAG:650 = 0\n	ELSE\n		DRAWLINE\n		PRINTFORMW \n		;NTRスイッチ解除\n		CFLAG:650 = 0\n	ENDIF\n	RETURN 1\n;-------------------------------------------------\n;屈服刻印（各Lv一回のみ） CFLAG:201\n;-------------------------------------------------\n;屈服刻印Lv1\nELSEIF CFLAG:201 < 2 && MARK:2 == 1\n	DRAWLINE\n	PRINTFORMW 「呼…呼…这样的调教，才，才没有什么……」\n	PRINTFORMW 在屈辱的调教中，%SAVESTR:TARGET%闭上了眼睛，似乎还在坚持着反抗的心态………\n	CFLAG:201 = 2\n	RETURN 1\n\n;屈服刻印Lv2\nELSEIF CFLAG:201 < 3 && MARK:2 == 2\n	DRAWLINE\n	PRINTFORMW 「都是因为救不了妹妹…我才会受到这样的惩罚」\n	PRINTFORMW %SAVESTR:TARGET%伏在床上，埋着脸哭泣着。她的样子反而更让%SAVESTR:PLAYER%露出了愉悦的扭曲笑意。\n	PRINTFORMW 从%SAVESTR:TARGET%为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………\n	CFLAG:201 = 3\n	RETURN 1\n\n;屈服刻印Lv3\nELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0\n	DRAWLINE\n	PRINTFORMW 「不，不要啊！不要用你的脏手碰我……啊啊」\n	PRINTFORMW 尽管%SAVESTR:TARGET%语气还无比强硬、%SAVESTR:PLAYER%继续爱抚着她的身体。\n	PRINTFORMW 而%SAVESTR:PLAYER%的身体也自己一点点放松了，诚实地接受并享受着爱抚。\n	PRINTFORMW 「杀了你！总有一天…一定要杀了你！呜呜……啊嗯……啊啊……」\n	PRINTFORMW %SAVESTR:PLAYER%愉快的听着%SAVESTR:TARGET%的威胁逐渐变成了略带享受的喘息。还有更多的可以期待。\n	CFLAG:201 = 4\n	RETURN 1\n\n;淫乱\nELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9\n	DRAWLINE\n	PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」\n	PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。\n	PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」\n	PRINTFORMW %SAVESTR:TARGET%不自觉地张开了双腿，把私处展露在%SAVESTR:PLAYER%前面，蜜穴已经被爱液湿透。\n	PRINTFORMW 曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。\n	IF TALENT:TARGET:0 == 1\n		PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%的眼睛却露出了期待的光芒………\n	ELSE\n		PRINTFORMW 「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒………\n	ENDIF\n	CFLAG:201 = 5\n	RETURN 1\n;淫乱\+魔族化\nELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1\n	DRAWLINE\n	;調教前から魔族\n	IF CFLAG:400 == 1\n		PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」\n		PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。\n		PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」\n		PRINTFORMW %SAVESTR:TARGET%不自觉地张开了双腿，把已经被爱液湿透的私处展露在%SAVESTR:PLAYER%前面。\n		PRINTFORMW 曾经纯洁的乡下少女，已经在你的调教下变得如同娼馆里的妓女一样淫荡而不知羞耻了。\n		IF TALENT:TARGET:0 == 1\n			PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%却露出了期待的光芒………\n		ELSE\n			PRINTFORMW 「你看……都，都湿透了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒…\n		ENDIF\n		CFLAG:201 = 6\n		RETURN 1\n	;初回調教後に魔族\n	ELSEIF CFLAG:400 == 2\n		PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」\n		PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。\n		PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」\n		PRINTFORMW  %SAVESTR:TARGET%不自觉地张开了双腿，把私处展露在%SAVESTR:PLAYER%前面，蜜穴已经被爱液湿透。\n		PRINTFORMW 曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。\n		IF TALENT:TARGET:0 == 1\n			PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%却露出了期待的光芒………\n		ELSE\n			PRINTFORMW 「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒…\n		ENDIF\n		CFLAG:201 = 6\n		RETURN 1\n	;陥落後に魔族\n	ELSE\n		PRINTFORMW \n		CFLAG:201 = 6\n		RETURN 1\n	ENDIF\n;爱慕\nELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9 && TALENT:TARGET:76 == 0\n	DRAWLINE\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。\n	PRINTFORMW 「那个、那个…比起玛奥，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」\n	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。\n	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」\n	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。\n	PRINTFORMW 「有…有什么好笑的嘛？」\n	IF TALENT:TARGET:0 == 1\n		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n	ELSE\n		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n	ENDIF\n	CFLAG:201 = 7\n	RETURN 1\n;爱慕\+魔族化\nELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0\n	DRAWLINE\n	;調教前から魔族\n	IF CFLAG:400 == 1\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。\n	PRINTFORMW 「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」\n	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。\n	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」\n	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。\n	PRINTFORMW 「有…有什么好笑的嘛？」\n	IF TALENT:TARGET:0 == 1\n		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n	ELSE\n		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n		ENDIF\n		CFLAG:201 = 8\n		RETURN 1\n	;調教後に魔族\n	ELSEIF CFLAG:400 == 2\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。\n	PRINTFORMW 「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」\n	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。\n	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」\n	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。\n	PRINTFORMW 「有…有什么好笑的嘛？」\n	IF TALENT:TARGET:0 == 1\n		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n	ELSE\n		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」\n		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。\n		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n		ENDIF\n		CFLAG:201 = 8\n		RETURN 1\n	;陥落後に魔族\n	ELSE\n		PRINTFORMW \n		CFLAG:201 = 8\n		RETURN 1\n	ENDIF\n;崩坏\nELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9\n	DRAWLINE\n	PRINTFORMW %SAVESTR:TARGET%的眼睛失去了光彩。\n	PRINTFORMW 因为过度的调教，看上去精神和身体都崩溃了的样子。\n	PRINTFORMW 「啊哈…呼呼…啊……哈哈……」\n	CFLAG:201 = 9\n	RETURN 1\n;崩坏してたら二回目以降へ飛ぶ\nELSEIF TALENT:TARGET:9 == 1\n	CALL K11_KOJO2\n;助手の有無をチェック（いない場合は二回目以降へ飛ぶ）\nELSEIF ASSI < 0 \n	CALL K11_KOJO2\n\n;-------------------------------------------------\n;簡易助手口上 CFLAG:202～210\n;Ynを調教対象X1との会話が発生する助手のキャラ番号に変更する\n;会話が発生する助手を2人以上に増やす場合は、\n;コピー＆ペーストをしてCFLAGの数を203、204と増やす（210が上限）\n;-------------------------------------------------\n;あなたが男じゃなかったら二回目以降\nELSEIF TALENT:MASTER:122 == 0\n	CALL K11_KOJO2\n;助手マオ NO:ASSI == 17\nELSEIF NO:ASSI == 17\n	DRAWLINE\n	;初めて\n	IF CFLAG:202 == 0\n		;既に爱慕持ちで爱慕取得時初口上（陥落イベント）が発生済み\n		IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5\n			PRINTFORMW 「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」\n			PRINTFORMW 看到作为魔王的调教助手出现的%SAVESTR:ASSI%，%SAVESTR:TARGET%脸上露出了吃惊的表情\n			PRINTFORML 『姐姐？好久不见了呀…话说在前，现在魔王大人才是我心中最重要的人了哦』\n			PRINTFORMW 边这么说着，%SAVESTR:ASSI%在%SAVESTR:TARGET%面前抱住了%SAVESTR:PLAYER%，好像在炫耀一般。\n			PRINTFORMW 「%SAVESTR:ASSI%，你，你在做什么！？」\n			IF TALENT:TARGET:0 == 1\n				PRINTFORML 『唉？姐姐还没有把处女献给魔王大人？真是不懂。』\n				PRINTFORMW 「真，真是的…说什么呢！我，我平时只是和魔王大人拥抱而已！」\n				PRINTFORMW %SAVESTR:TARGET%注意到%SAVESTR:PLAYER%笑了起来，羞得整张脸都红了。\n				PRINTFORMW 『总之，今天我会和魔王大人一起好好疼爱，调教你的，姐姐你做好心理准备了吗%UNICODE\(0x2661\) \*1%』\n			ELSE\n				PRINTFORML 『魔王大人啊%UNICODE\(0x2661\) \*1% 每天都会疼爱我，所以我们这样抱着，一点都不奇怪吧♪』\n				PRINTFORMW 「说，说的是什么话啊！那个人，那个人可是邪恶的魔王啊！所以，你快离开，离开！」\n				PRINTFORMW 『啊哈，姐姐其实也是想得到魔王的拥抱吗？为什么不坦率地说出来呢？』\n				PRINTFORMW 「那，那种话说不出来的…呜呜呜…我，我想要魔王大人的拥抱，疼爱和调教………」\n				PRINTFORMW 看着%SAVESTR:TARGET%话语自相矛盾，羞得满脸通红的样子、%SAVESTR:PLAYER%和%SAVESTR:ASSI%脸上浮现出了笑容………\n			ENDIF\n			CFLAG:202 = 2\n		;既に淫乱持ちで淫乱取得時初口上（陥落イベント）が発生済み\n		ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5\n			PRINTFORMW 「玛…玛奥！我们终于见面了…%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW 看到%SAVESTR:TARGET%已经一派淫靡的样子，%SAVESTR:ASSI%却觉得有点扫兴。\n			PRINTFORML 『哼，感觉姐姐完全变了一个人呢。』\n			IF TALENT:TARGET:0 == 1\n				PRINTFORMW 「呐…让我们一起在这里开始新生活吧……作为魔王大人的宠物？」\n				PRINTFORML 『姐姐这是什么话，可早在你被抓到之前，我就已经是魔王大人的东西了哦。』\n				PRINTFORMW %SAVESTR:ASSI%把手伸到%SAVESTR:TARGET%的双腿之间，开始抚弄姐姐的下体。\n				PRINTFORMW 「真，真是的！」\n				PRINTFORML 『姐姐先把这里献给魔王大人，再和我一起当魔王大人的性奴宠物吧%UNICODE\(0x2661\) \*1%』\n				PRINTFORMW 「啊…嗯啊…啊啊…愿意…我愿意把这里献给魔王大人！」\n				PRINTFORMW %SAVESTR:ASSI%一边坏笑着一边继续用手责备着%SAVESTR:TARGET%的下体，而%SAVESTR:TARGET%对这个淫乱的提议表示完全赞成………\n			ELSE\n				PRINTFORMW 「是啊、姐姐已经在魔王的疼爱中获得了新生…%UNICODE\(0x2661\) \*1%」\n				PRINTFORML 『哼哼哼、我也是一样啊姐姐，从今天开始让我们一起当魔王大人的爱奴吧』\n				PRINTFORMW 「嗯嗯！我们从此就是魔王大人的性奴宠物了呀！」\n				PRINTFORMW 对于%SAVESTR:ASSI%的提议，%SAVESTR:TARGET%笑颜满面地答应了………\n			ENDIF\n			CFLAG:202 = 2\n		;それ以外\n		ELSE\n			PRINTFORMW 「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」\n			PRINTFORMW %SAVESTR:ASSI%用邪秽的目光，如同猎人看待猎物一样注视着自己的姐姐。\n			PRINTFORML 『姐姐，为什么要到这种地方来呢？在村子里好好呆着不行吗…』\n			PRINTFORMW 「你在说什么！我是为了找你才到这里来的…」\n			IF TALENT:TARGET:0 == 1\n				PRINTFORML 『被抓到了就不能不管哦。这样好了，我决定要把姐姐变成魔王大人和我的宠物。』\n			ELSE\n				PRINTFORML 『结果蠢到在路上就被魔兽侵犯了吗、姐姐真是大笨蛋。』\n				PRINTFORMW 「为，为什么要说这样的话！」\n				PRINTFORMW %SAVESTR:TARGET%泪流满面地蜷成一团，抱着自己的身体。\n				PRINTFORML 『不过无所谓，就算姐姐已经不是处女了，我还是决定要把你变成我和魔王大人的宠物。』\n			ENDIF\n			PRINTFORMW 「宠…宠物…？你在开什么玩笑？」\n			PRINTFORML 『才不是开玩笑啊！会把姐姐调教成只懂得取悦我的淫穴和魔王大人的肉棒的变态母猪性奴吧%UNICODE\(0x2661\) \*1%』\n			PRINTFORMW 「不，不要啊……撒谎！撒谎！不要再说了……求求你……呜呜呜………」\n			PRINTFORMW 看着和过去判若两人的%SAVESTR:ASSI%，%SAVESTR:TARGET%泣不成声………\n			CFLAG:202 = 1\n		ENDIF\n		RETURN 1\n	;二回目以降\n	;爱慕＆淫乱取得時\n	ELSEIF CFLAG:202 == 1 && FLAG:7 ==2 && \(TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1\)\n		;爱慕\n		IF TALENT:TARGET:85 == 1\n			PRINTFORML 『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』\n			PRINTFORMW 「没什么，什么事都没有，哼。」\n			PRINTFORMW %SAVESTR:TARGET%用嫉妒的目光看着被%SAVESTR:PLAYER%搂在身上的%SAVESTR:ASSI%。\n			PRINTFORMW 不知道是不是故意的，%SAVESTR:ASSI%继续和%SAVESTR:PLAYER%大声聊着今天的调教内容。\n			PRINTFORML 『今天的计划是要狠狠地调教，惩罚姐姐的肛门呢，到时候姐姐哭起来的声音一定很好听』\n			PRINTFORMW 「怎，怎样都好，魔王大人可是属于我的呢！」\n			PRINTL\n			PRINTFORMW 『哼哼哼、看来姐姐已经完全变成魔王大人的性奴了呢。不如就让魔王同时享用我们姐妹俩吧？』\n			PRINTFORMW 看着已经彻底变样了的姐姐，%SAVESTR:ASSI%微笑了起来………\n			CFLAG:202 = 2\n		;淫乱\n		ELSEIF TALENT:TARGET:76 == 1\n			PRINTFORML 『咦，姐姐怎么了？身体看上去很难受的样子呀？』\n			PRINTFORMW 「快……快让魔王大人侵犯我…调教我吧……拜，拜托了…%UNICODE\(0x2661\) \*1%」\n			PRINTFORML 『哦哦、姐姐终于变成了只想要肉棒的淫乱性奴了呀…这个样子真是可爱呢。』\n			PRINTFORMW %SAVESTR:ASSI%和%SAVESTR:PLAYER%窃窃私语了一阵。\n			PRINTFORML 『哼哼哼、姐姐，魔王大人这样说了、“你们姐妹俩愿意一起成为我的宠物的话，就赐予你们无上的快乐哦”。哎哎，我也要当宠物？一点问题都没有%UNICODE\(0x2661\) \*1%』\n			PRINTFORMW %SAVESTR:ASSI%红着脸，光着身子四肢着地趴在了%SAVESTR:TARGET%的身边。\n			PRINTFORML 『来吧，姐姐和我一起说，一起做吧。从现在起，我们姐妹俩就是魔王大人的淫乱母狗性奴，愿意一生侍奉魔王大人，请魔王大人用肉棒好好疼爱，调教我们吧，拜托了♪』\n			PRINTFORMW 听着%SAVESTR:ASSI%流利地在%SAVESTR:PLAYER%面前念出了母狗性奴的誓言，%SAVESTR:TARGET%同样也趴下来，自豪地宣誓了。\n			PRINTFORMW 「%SAVESTR:TARGET%我愿成为魔王大人的淫乱母狗。和母狗妹妹一起一生侍奉魔王大人、请魔王大人用肉棒奖赏我们吧%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW 就这样，%SAVESTR:TARGET%和%SAVESTR:ASSI%姉妹完全成为%SAVESTR:PLAYER%的性奴宠物了………\n			CFLAG:202 = 2\n		ENDIF\n		RETURN 1\n	;二回目以降\n	ELSEIF CFLAG:202 >= 2 && FLAG:7 ==2\n		;爱慕\n		IF TALENT:TARGET:85 == 1\n			PRINTFORMW 「啊啊…魔王大人…请给我今日的拥抱………%UNICODE\(0x2661\) \*1%」\n			PRINTFORML 『我，我也要…魔王大人也请一起拥抱我…%UNICODE\(0x2661\) \*1%』\n			PRINTFORMW %SAVESTR:ASSI%完全忘记了要调教姐姐的事，一同投入了%SAVESTR:PLAYER%的怀抱中。\n			PRINTFORMW %SAVESTR:PLAYER%苦笑着将姐妹两人同时抱进了怀里、那么今天要怎么“疼爱”她们呢？\n		;淫乱\n		ELSEIF TALENT:TARGET:76 == 1\n			PRINTFORMW 「今天也请尽情地疼爱，调教我们这对性奴母狗姐妹吧…汪♪」\n			PRINTFORML 『魔王大人，请尽情地疼爱我们吧…啊、嗯啊啊…%UNICODE\(0x2661\) \*1%』\n			PRINTFORMW %SAVESTR:PLAYER%把手分别伸到了两人的下体，抚弄着已经淫液满溢的蜜穴。\n			PRINTFORMW 如今两人除了和%SAVESTR:PLAYER%交媾之外，已经什么事情都不会去想了………\n		ENDIF\n		RETURN 1\n	;それ以外\n	ELSE\n		PRINTFORML 『姐姐早点坦率地面对自己的欲望吧……』\n		PRINTFORMW 「住、住手啊…离我远点！」\n		PRINTFORMW 手臂被%SAVESTR:ASSI%紧紧抓住、%SAVESTR:TARGET%回忆起上次被妹妹调教的不堪回首的经历，嚎啕大哭起来。\n		PRINTFORML 『哈……花不了多久就会把你调教成随便碰碰哪里都会高潮的母猪啦♪』\n		PRINTFORMW 「不要…不要不要不要啊…神啊，救救我………」\n		RETURN 1\n	ENDIF\n;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ\nELSE\n	CALL K11_KOJO2\nENDIF\n\n\n;-------------------------------------------------\n;調教開始時（2回目以降、X1をキャラ番号に変更する） CFLAG无 \n;-------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '114-118',
        any: [
          /@EVENTTRAIN\nSIF FLAG:7 <= 0\n	RETURN 0\nSIF TALENT:171 != 1\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '126-129',
        any: [
          /IF ASSI > 0 && NO:ASSI == 17\n	CFLAG:TARGET:21 = 317\n	CFLAG:ASSI:21 = 224\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '130',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '141',
        any: [/			PRINTFORML 『姐姐？你怎么会在这里？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '142',
        any: [
          /			PRINTFORMW 「%SAVESTR:ASSI%！终于…终于找到你了！我们一起回村子里去吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '143',
        any: [
          /			PRINTFORMW 眼前这个叫%SAVESTR:TARGET%的年轻女性，自称是%SAVESTR:ASSI%的姐姐/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '144',
        any: [
          /			PRINTFORMW 而%SAVESTR:PLAYER%这才注意到，两人的音容神貌的确有几分相似。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '145',
        any: [/			PRINTFORMW 还有那顶火红的头发，以及瞳色更是一模一样。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '146',
        any: [/			PRINTFORML 『姐姐……为什么过了这么久才来找我？……我，我已经…』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '147',
        any: [/			PRINTFORMW %SAVESTR:ASSI%挽起了%SAVESTR:PLAYER%的臂弯。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '148',
        any: [
          /			PRINTFORML 『我已经…将自己全身心献给魔王大人了%UNICODE\(0x2661\) \*1% 村子什么的再也不想回去了%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '149',
        any: [
          /			PRINTFORML 「说谎！说谎！你一定是被这个家伙强迫的对吧！快放了%SAVESTR:ASSI%，奴隶什么的，让我来代替她！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '150',
        any: [
          /			PRINTFORMW “你要是真的能代替%SAVESTR:ASSI%来满足我的话，我倒是可以考虑放过%SAVESTR:ASSI%。”听到%SAVESTR:PLAYER%的话，%SAVESTR:TARGET%缓慢而坚定地点点头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '151',
        any: [/			PRINTFORML 「只要放过我妹妹，你要随便怎样对我都好！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '152',
        any: [
          /			PRINTFORMW 看着姐姐的样子，%SAVESTR:ASSI%却不满地翘起了嘴，用谁也听不到的声音嘟囔着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '153',
        any: [/			PRINTFORMW 『真是的，姐姐只会做多余的事………』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '164',
        any: [/			PRINTFORML 「我的妹妹呢！把我的妹妹还给我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '165',
        any: [
          /			PRINTFORMW 站在面前的这个年轻女性――%SAVESTR:TARGET%，不顾自己的处境，不由分说地怒斥着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '166',
        any: [/			PRINTFORML 「是你把她抓到这里的吧！？我的妹妹——玛奥！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '167',
        any: [
          /			PRINTFORMW 听这么一说，%SAVESTR:PLAYER%发现这个女人的神情和那个可爱的乡下小姑娘挺相像的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '168',
        any: [/			PRINTFORMW 那头火红的头发，还有瞳孔的颜色都一模一样。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '169',
        any: [
          /			PRINTFORMW 面对质问，%SAVESTR:PLAYER%微微点了点头，%SAVESTR:TARGET%一下子神色激动了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '170',
        any: [
          /			PRINTFORML 「果然是在这里！求求你，请把她还给我！还给我！她是我的妹妹啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '171',
        any: [
          /			PRINTFORMW 但她不知道的是，她的妹妹玛奥已经把全身心都献给%SAVESTR:PLAYER%了，更不会愿意离开的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '172',
        any: [
          /			PRINTFORMW 但%SAVESTR:PLAYER%还是饶有趣味地思考了一下%SAVESTR:TARGET%的要求。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '173',
        any: [
          /			PRINTFORML 「嗯…想要见她？想要让她回去？也不是不可以。但是你愿意代替她做我的性奴隶，接受我的调教吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '174',
        any: [
          /			PRINTFORMW 听到这样的话，%SAVESTR:TARGET%愣住了，脸上浮现出矛盾的复杂表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '175',
        any: [
          /			PRINTFORML “毕竟，为我解开封印的是你的妹妹啊。你作为她的姐姐，我当然也要好好‘感谢’一番才对。”%SAVESTR:PLAYER%俯身在她面前低语着，带着深深的恶意。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '176',
        any: [/			PRINTFORMW %SAVESTR:TARGET%的表情由恐惧变成了绝望。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '177',
        any: [/			PRINTFORML 「骗……骗人……不要啊……不要过来……」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '178',
        any: [/			PRINTFORMW 那么，是时候为姐妹重聚的最终舞台做准备了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '186-187',
        any: [
          /ELSEIF CFLAG:201 < 5 && CFLAG:400 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0\n	PRINTFORMW /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '196-198',
        any: [/	IF TALENT:85 \|\| TALENT:76\n		DRAWLINE\n		PRINTFORMW /],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '201-203',
        any: [/	ELSE\n		DRAWLINE\n		PRINTFORMW /],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '214',
        any: [/	PRINTFORMW 「呼…呼…这样的调教，才，才没有什么……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '215',
        any: [
          /	PRINTFORMW 在屈辱的调教中，%SAVESTR:TARGET%闭上了眼睛，似乎还在坚持着反抗的心态………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '222',
        any: [/	PRINTFORMW 「都是因为救不了妹妹…我才会受到这样的惩罚」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '223',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%伏在床上，埋着脸哭泣着。她的样子反而更让%SAVESTR:PLAYER%露出了愉悦的扭曲笑意。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '224',
        any: [
          /	PRINTFORMW 从%SAVESTR:TARGET%为自己接受调教进行辩解开始，就可以开始进行更进一步的内容了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '231',
        any: [/	PRINTFORMW 「不，不要啊！不要用你的脏手碰我……啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '232',
        any: [
          /	PRINTFORMW 尽管%SAVESTR:TARGET%语气还无比强硬、%SAVESTR:PLAYER%继续爱抚着她的身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '233',
        any: [
          /	PRINTFORMW 而%SAVESTR:PLAYER%的身体也自己一点点放松了，诚实地接受并享受着爱抚。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '234',
        any: [
          /	PRINTFORMW 「杀了你！总有一天…一定要杀了你！呜呜……啊嗯……啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '235',
        any: [
          /	PRINTFORMW %SAVESTR:PLAYER%愉快的听着%SAVESTR:TARGET%的威胁逐渐变成了略带享受的喘息。还有更多的可以期待。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '241-242',
        any: [
          /	DRAWLINE\n	PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '243',
        any: [
          /	PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '244',
        any: [/	PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '245-245',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%不自觉地张开了双腿，把私处展露在%SAVESTR:PLAYER%前面，蜜穴已经被爱液湿透。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '246-247',
        any: [
          /	PRINTFORMW 曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。\n	IF TALENT:TARGET:0 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '247-248',
        any: [
          /	IF TALENT:TARGET:0 == 1\n		PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '249',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%的眼睛却露出了期待的光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '250-251',
        any: [
          /	ELSE\n		PRINTFORMW 「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '252',
        any: [/		PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '260-261',
        any: [
          /	IF CFLAG:400 == 1\n		PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '262',
        any: [
          /		PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '263',
        any: [/		PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '264',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%不自觉地张开了双腿，把已经被爱液湿透的私处展露在%SAVESTR:PLAYER%前面。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '265',
        any: [
          /		PRINTFORMW 曾经纯洁的乡下少女，已经在你的调教下变得如同娼馆里的妓女一样淫荡而不知羞耻了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '267',
        any: [
          /			PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '268',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%却露出了期待的光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '270',
        any: [
          /			PRINTFORMW 「你看……都，都湿透了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '271-275',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒…\n		ENDIF\n		CFLAG:201 = 6\n		RETURN 1\n	;初回調教後に魔族/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '276-277',
        any: [
          /	ELSEIF CFLAG:400 == 2\n		PRINTFORMW 「啊哈…嗯啊……别，别再摸我了、真是一点都不想见到你的脸…嗯…啊啊…哈啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '278',
        any: [
          /		PRINTFORMW 虽然这么说着，但%SAVESTR:TARGET%的身体却在%SAVESTR:PLAYER%的粗暴爱抚下一扭一扭地享受着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '279',
        any: [/		PRINTFORMW 「啊呀、不要啦、这样摸到底有，有什么好的…嗯啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '280-280',
        any: [
          /		PRINTFORMW  %SAVESTR:TARGET%不自觉地张开了双腿，把私处展露在%SAVESTR:PLAYER%前面，蜜穴已经被爱液湿透。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '281-281',
        any: [
          /		PRINTFORMW 曾经纯洁的乡下少女，已经在不知不觉间变得如同娼馆里的妓女一样淫荡而不知羞耻了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '283',
        any: [
          /			PRINTFORMW 「啊啊…要是敢侵犯我的处女身的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '284',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%舔着舌头说道，望着%SAVESTR:PLAYER%却露出了期待的光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '286-286',
        any: [
          /			PRINTFORMW 「看，都，都湿了，就说了不行嘛…要是还敢继续侵犯这里的话，绝对不会原谅你的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '287-291',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%的双眼却露出了期待的光芒…\n		ENDIF\n		CFLAG:201 = 6\n		RETURN 1\n	;陥落後に魔族/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '289-293',
        any: [/		CFLAG:201 = 6\n		RETURN 1\n	;陥落後に魔族\n	ELSE\n		PRINTFORMW /],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '299-300',
        any: [
          /	DRAWLINE\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '301',
        any: [
          /	PRINTFORMW 「那个、那个…比起玛奥，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '302',
        any: [
          /	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '303',
        any: [
          /	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '304',
        any: [
          /	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '305',
        any: [/	PRINTFORMW 「有…有什么好笑的嘛？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '307',
        any: [
          /		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '308',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '310',
        any: [
          /		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '311',
        any: [
          /		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '312-313',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '320-321',
        any: [
          /	IF CFLAG:400 == 1\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '322',
        any: [
          /	PRINTFORMW 「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '323',
        any: [
          /	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '324',
        any: [
          /	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '325',
        any: [
          /	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '326',
        any: [/	PRINTFORMW 「有…有什么好笑的嘛？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '328',
        any: [
          /		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '329',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '331',
        any: [
          /		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '332',
        any: [
          /		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '333-337',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n		ENDIF\n		CFLAG:201 = 8\n		RETURN 1\n	;調教後に魔族/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '338-339',
        any: [
          /	ELSEIF CFLAG:400 == 2\n	PRINTFORMW %SAVESTR:TARGET%靠在%SAVESTR:PLAYER%的身边，轻轻地耳语着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '340',
        any: [
          /	PRINTFORMW 「那个、那个…比起妹妹，也请，多疼爱一下我吧…只，只是不想让她负担太重，不是别的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '341',
        any: [
          /	PRINTFORMW 说罢抓着%SAVESTR:PLAYER%的手按在了自己丰满的胸部上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '342',
        any: [
          /	PRINTFORMW 「你看……比起那个孩子寒酸的小身板，我的身材好得多吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '343',
        any: [
          /	PRINTFORMW 面对这个献媚的身姿，%SAVESTR:PLAYER%嘴角裂出扭曲的笑意。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '344',
        any: [/	PRINTFORMW 「有…有什么好笑的嘛？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '346',
        any: [
          /		PRINTFORMW 「我还是处女的说…不过只要能取悦你，做什么都可以哦…真的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '347',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '349',
        any: [
          /		PRINTFORMW 「总之……请像以前那样疼爱我吧…调教我…侵犯我吧…拜托了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '350',
        any: [
          /		PRINTFORMW 边这样怜求着，%SAVESTR:TARGET%脸像被红霞染过了一般、声音也显得燥热难耐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '351-355',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%已经完全沦为%SAVESTR:PLAYER%爱的奴隶了、比起妹妹，更想要和%SAVESTR:PLAYER%在一起……\n		ENDIF\n		CFLAG:201 = 8\n		RETURN 1\n	;陥落後に魔族/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '353-357',
        any: [/		CFLAG:201 = 8\n		RETURN 1\n	;陥落後に魔族\n	ELSE\n		PRINTFORMW /],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '364',
        any: [/	PRINTFORMW %SAVESTR:TARGET%的眼睛失去了光彩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '365',
        any: [/	PRINTFORMW 因为过度的调教，看上去精神和身体都崩溃了的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '366',
        any: [/	PRINTFORMW 「啊哈…呼呼…啊……哈哈……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '370-371',
        any: [/ELSEIF TALENT:TARGET:9 == 1\n	CALL K11_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '373-374',
        any: [/ELSEIF ASSI < 0 \n	CALL K11_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '383-384',
        any: [/ELSEIF TALENT:MASTER:122 == 0\n	CALL K11_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '392',
        any: [
          /			PRINTFORMW 「玛…玛奥！你没事，真的是太好了……但，但为什么你穿成这个样子……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '393',
        any: [
          /			PRINTFORMW 看到作为魔王的调教助手出现的%SAVESTR:ASSI%，%SAVESTR:TARGET%脸上露出了吃惊的表情/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '394',
        any: [
          /			PRINTFORML 『姐姐？好久不见了呀…话说在前，现在魔王大人才是我心中最重要的人了哦』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '395',
        any: [
          /			PRINTFORMW 边这么说着，%SAVESTR:ASSI%在%SAVESTR:TARGET%面前抱住了%SAVESTR:PLAYER%，好像在炫耀一般。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '396',
        any: [/			PRINTFORMW 「%SAVESTR:ASSI%，你，你在做什么！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '398',
        any: [/				PRINTFORML 『唉？姐姐还没有把处女献给魔王大人？真是不懂。』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '399',
        any: [
          /				PRINTFORMW 「真，真是的…说什么呢！我，我平时只是和魔王大人拥抱而已！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '400',
        any: [
          /				PRINTFORMW %SAVESTR:TARGET%注意到%SAVESTR:PLAYER%笑了起来，羞得整张脸都红了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '401',
        any: [
          /				PRINTFORMW 『总之，今天我会和魔王大人一起好好疼爱，调教你的，姐姐你做好心理准备了吗%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '403',
        any: [
          /				PRINTFORML 『魔王大人啊%UNICODE\(0x2661\) \*1% 每天都会疼爱我，所以我们这样抱着，一点都不奇怪吧♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '404',
        any: [
          /				PRINTFORMW 「说，说的是什么话啊！那个人，那个人可是邪恶的魔王啊！所以，你快离开，离开！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '405',
        any: [
          /				PRINTFORMW 『啊哈，姐姐其实也是想得到魔王的拥抱吗？为什么不坦率地说出来呢？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '406',
        any: [
          /				PRINTFORMW 「那，那种话说不出来的…呜呜呜…我，我想要魔王大人的拥抱，疼爱和调教………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '407',
        any: [
          /				PRINTFORMW 看着%SAVESTR:TARGET%话语自相矛盾，羞得满脸通红的样子、%SAVESTR:PLAYER%和%SAVESTR:ASSI%脸上浮现出了笑容………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '412',
        any: [/			PRINTFORMW 「玛…玛奥！我们终于见面了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '413',
        any: [
          /			PRINTFORMW 看到%SAVESTR:TARGET%已经一派淫靡的样子，%SAVESTR:ASSI%却觉得有点扫兴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '414',
        any: [/			PRINTFORML 『哼，感觉姐姐完全变了一个人呢。』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '416',
        any: [
          /				PRINTFORMW 「呐…让我们一起在这里开始新生活吧……作为魔王大人的宠物？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '417',
        any: [
          /				PRINTFORML 『姐姐这是什么话，可早在你被抓到之前，我就已经是魔王大人的东西了哦。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '418',
        any: [
          /				PRINTFORMW %SAVESTR:ASSI%把手伸到%SAVESTR:TARGET%的双腿之间，开始抚弄姐姐的下体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '419',
        any: [/				PRINTFORMW 「真，真是的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '420',
        any: [
          /				PRINTFORML 『姐姐先把这里献给魔王大人，再和我一起当魔王大人的性奴宠物吧%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '421',
        any: [/				PRINTFORMW 「啊…嗯啊…啊啊…愿意…我愿意把这里献给魔王大人！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '422',
        any: [
          /				PRINTFORMW %SAVESTR:ASSI%一边坏笑着一边继续用手责备着%SAVESTR:TARGET%的下体，而%SAVESTR:TARGET%对这个淫乱的提议表示完全赞成………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '424',
        any: [
          /				PRINTFORMW 「是啊、姐姐已经在魔王的疼爱中获得了新生…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '425',
        any: [
          /				PRINTFORML 『哼哼哼、我也是一样啊姐姐，从今天开始让我们一起当魔王大人的爱奴吧』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '426',
        any: [/				PRINTFORMW 「嗯嗯！我们从此就是魔王大人的性奴宠物了呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '427',
        any: [
          /				PRINTFORMW 对于%SAVESTR:ASSI%的提议，%SAVESTR:TARGET%笑颜满面地答应了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '432',
        any: [
          /			PRINTFORMW 「玛…玛奥！你没事，真的是太好……为，为什么要用那种眼神看我……而且为什么穿成这个样子？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '433',
        any: [
          /			PRINTFORMW %SAVESTR:ASSI%用邪秽的目光，如同猎人看待猎物一样注视着自己的姐姐。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '434',
        any: [
          /			PRINTFORML 『姐姐，为什么要到这种地方来呢？在村子里好好呆着不行吗…』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '435',
        any: [/			PRINTFORMW 「你在说什么！我是为了找你才到这里来的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '437',
        any: [
          /				PRINTFORML 『被抓到了就不能不管哦。这样好了，我决定要把姐姐变成魔王大人和我的宠物。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '439',
        any: [
          /				PRINTFORML 『结果蠢到在路上就被魔兽侵犯了吗、姐姐真是大笨蛋。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '440',
        any: [/				PRINTFORMW 「为，为什么要说这样的话！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '441',
        any: [
          /				PRINTFORMW %SAVESTR:TARGET%泪流满面地蜷成一团，抱着自己的身体。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '442',
        any: [
          /				PRINTFORML 『不过无所谓，就算姐姐已经不是处女了，我还是决定要把你变成我和魔王大人的宠物。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '444',
        any: [/			PRINTFORMW 「宠…宠物…？你在开什么玩笑？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '445',
        any: [
          /			PRINTFORML 『才不是开玩笑啊！会把姐姐调教成只懂得取悦我的淫穴和魔王大人的肉棒的变态母猪性奴吧%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '446',
        any: [
          /			PRINTFORMW 「不，不要啊……撒谎！撒谎！不要再说了……求求你……呜呜呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '447',
        any: [
          /			PRINTFORMW 看着和过去判若两人的%SAVESTR:ASSI%，%SAVESTR:TARGET%泣不成声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '456',
        any: [/			PRINTFORML 『咦咦，怎么了姐姐？为什么要用那种眼神看着我？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '457',
        any: [/			PRINTFORMW 「没什么，什么事都没有，哼。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '458',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%用嫉妒的目光看着被%SAVESTR:PLAYER%搂在身上的%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '459',
        any: [
          /			PRINTFORMW 不知道是不是故意的，%SAVESTR:ASSI%继续和%SAVESTR:PLAYER%大声聊着今天的调教内容。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '460',
        any: [
          /			PRINTFORML 『今天的计划是要狠狠地调教，惩罚姐姐的肛门呢，到时候姐姐哭起来的声音一定很好听』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '461',
        any: [/			PRINTFORMW 「怎，怎样都好，魔王大人可是属于我的呢！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '462',
        any: [/			PRINTL/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '463',
        any: [
          /			PRINTFORMW 『哼哼哼、看来姐姐已经完全变成魔王大人的性奴了呢。不如就让魔王同时享用我们姐妹俩吧？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '464',
        any: [
          /			PRINTFORMW 看着已经彻底变样了的姐姐，%SAVESTR:ASSI%微笑了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '468',
        any: [/			PRINTFORML 『咦，姐姐怎么了？身体看上去很难受的样子呀？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '469',
        any: [
          /			PRINTFORMW 「快……快让魔王大人侵犯我…调教我吧……拜，拜托了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '470',
        any: [
          /			PRINTFORML 『哦哦、姐姐终于变成了只想要肉棒的淫乱性奴了呀…这个样子真是可爱呢。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '471',
        any: [/			PRINTFORMW %SAVESTR:ASSI%和%SAVESTR:PLAYER%窃窃私语了一阵。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '472',
        any: [
          /			PRINTFORML 『哼哼哼、姐姐，魔王大人这样说了、“你们姐妹俩愿意一起成为我的宠物的话，就赐予你们无上的快乐哦”。哎哎，我也要当宠物？一点问题都没有%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '473',
        any: [
          /			PRINTFORMW %SAVESTR:ASSI%红着脸，光着身子四肢着地趴在了%SAVESTR:TARGET%的身边。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '474',
        any: [
          /			PRINTFORML 『来吧，姐姐和我一起说，一起做吧。从现在起，我们姐妹俩就是魔王大人的淫乱母狗性奴，愿意一生侍奉魔王大人，请魔王大人用肉棒好好疼爱，调教我们吧，拜托了♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '475',
        any: [
          /			PRINTFORMW 听着%SAVESTR:ASSI%流利地在%SAVESTR:PLAYER%面前念出了母狗性奴的誓言，%SAVESTR:TARGET%同样也趴下来，自豪地宣誓了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '476',
        any: [
          /			PRINTFORMW 「%SAVESTR:TARGET%我愿成为魔王大人的淫乱母狗。和母狗妹妹一起一生侍奉魔王大人、请魔王大人用肉棒奖赏我们吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '477',
        any: [
          /			PRINTFORMW 就这样，%SAVESTR:TARGET%和%SAVESTR:ASSI%姉妹完全成为%SAVESTR:PLAYER%的性奴宠物了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '485',
        any: [
          /			PRINTFORMW 「啊啊…魔王大人…请给我今日的拥抱………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '486',
        any: [
          /			PRINTFORML 『我，我也要…魔王大人也请一起拥抱我…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '487',
        any: [
          /			PRINTFORMW %SAVESTR:ASSI%完全忘记了要调教姐姐的事，一同投入了%SAVESTR:PLAYER%的怀抱中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '488',
        any: [
          /			PRINTFORMW %SAVESTR:PLAYER%苦笑着将姐妹两人同时抱进了怀里、那么今天要怎么“疼爱”她们呢？/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '491',
        any: [
          /			PRINTFORMW 「今天也请尽情地疼爱，调教我们这对性奴母狗姐妹吧…汪♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '492',
        any: [
          /			PRINTFORML 『魔王大人，请尽情地疼爱我们吧…啊、嗯啊啊…%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '493',
        any: [
          /			PRINTFORMW %SAVESTR:PLAYER%把手分别伸到了两人的下体，抚弄着已经淫液满溢的蜜穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '494',
        any: [
          /			PRINTFORMW 如今两人除了和%SAVESTR:PLAYER%交媾之外，已经什么事情都不会去想了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '499',
        any: [/		PRINTFORML 『姐姐早点坦率地面对自己的欲望吧……』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '500',
        any: [/		PRINTFORMW 「住、住手啊…离我远点！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '501',
        any: [
          /		PRINTFORMW 手臂被%SAVESTR:ASSI%紧紧抓住、%SAVESTR:TARGET%回忆起上次被妹妹调教的不堪回首的经历，嚎啕大哭起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '502',
        any: [
          /		PRINTFORML 『哈……花不了多久就会把你调教成随便碰碰哪里都会高潮的母猪啦♪』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '503',
        any: [/		PRINTFORMW 「不要…不要不要不要啊…神啊，救救我………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '507-508',
        any: [/ELSE\n	CALL K11_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '515-650',
        any: [
          /@K11_KOJO2\n;崩坏\nIF TALENT:TARGET:9 == 1 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「咕嘿……咕嘿嘿嘿………」\n	PRINTFORMW 已经无法期待精神崩溃的%SAVESTR:TARGET%会有正常的反应了………\n	RETURN 1\n;反発刻印Lv3\nELSEIF MARK:3 == 3 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「尽管来吧，别以为我不知道你想做什么。」\n	PRINTFORMW %SAVESTR:TARGET%丝毫不掩盖自己的反抗心理………\n	RETURN 1\n\n;屈服刻印Lv0\nELSEIF MARK:2 == 0 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「我不会怕的。」\n	PRINTFORMW %SAVESTR:TARGET%面无表情，语气冷漠\n	RETURN 1\n\n;屈服刻印Lv1\nELSEIF MARK:2 == 1 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「终……终于又来了，这张可憎的脸庞，又要打算对我做什么——放…放手！」\n	PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%一把抱了起来，无力反抗而不住地啜泣着………\n	RETURN 1\n\n;屈服刻印Lv2\nELSEIF MARK:2 == 2 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「不要啊…这种事情……真的不行…呜呜呜…」\n	PRINTFORMW %SAVESTR:TARGET%的手腕被%SAVESTR:PLAYER%扭住，似乎已经失去了反抗的力量………\n	RETURN 1\n\n;屈服刻印Lv3＋爱慕\/淫乱無し\nELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0 && FLAG:7 == 2\n	DRAWLINE\n	;助手妹と対面済\n	IF CFLAG:202 >= 1\n		IF RAND:2 == 0\n			PRINTFORMW 「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」\n			PRINTFORMW %SAVESTR:TARGET%带着急促的呼吸，凝视着%SAVESTR:PLAYER%………\n		ELSE\n			PRINTFORMW 「啊啊、妹妹她在……还在休息吗……那就不需要去打扰她了。调教什么的，让，让我来承受就可以了！」\n			PRINTFORMW %SAVESTR:TARGET%不知道的是，她所担心的妹妹在与%SAVESTR:PLAYER%分开时一直靠着自慰在宣泄性欲………\n		ENDIF\n	ELSE\n		IF RAND:2 == 0\n			PRINTFORMW 「呜……呜呜……什么时候，才能让我和妹妹见面！」\n			PRINTFORMW 虽然内心依旧怀着对%SAVESTR:PLAYER%的厌恶，但是%SAVESTR:TARGET%还是老老实实地躺在了床上……\n		ELSE\n			PRINTFORMW 「让，让我来当你的对手好了！只要别对我妹妹出手，让我做什么都可以……但，但是别以为我会屈服的！」\n			PRINTFORMW %SAVESTR:TARGET%口头上还在逞强，却完全不知道自己的妹妹已经完全沦陷在%SAVESTR:PLAYER%的调教下了……\n		ENDIF\n	ENDIF\n	RETURN 1\n\n;淫乱\nELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2\n	DRAWLINE\n	;魔族\n	IF TALENT:TARGET:314 == 9\n		IF RAND:3 == 0\n			PRINTFORMW 「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」\n			PRINTFORMW %SAVESTR:TARGET%冷淡的态度让%SAVESTR:PLAYER%正有些扫兴，但转眼间%SAVESTR:TARGET%却突然捧起了%SAVESTR:PLAYER%的手，挨个地舔着手指。\n			PRINTFORMW 「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人%UNICODE\(0x2661\) \*1%」\n		ELSEIF RAND:2 == 0\n			PRINTFORMW 「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」\n			PRINTFORMW %SAVESTR:PLAYER%拉着%SAVESTR:TARGET%的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。\n			PRINTFORMW 「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…%UNICODE\(0x2661\) \*1%」\n		ELSE\n			PRINTFORMW 「向您请安，魔王大人，今天也请调教我吧%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%三指着地跪坐着向%SAVESTR:PLAYER%行礼。\n			PRINTFORMW 「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	;それ以外\n	ELSE\n		IF RAND:3 == 0\n			PRINTFORMW 「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」\n			PRINTFORMW %SAVESTR:TARGET%冷淡的态度让%SAVESTR:PLAYER%正有些扫兴，但转眼间%SAVESTR:TARGET%却突然捧起了%SAVESTR:PLAYER%的手，挨个地舔着手指。\n			PRINTFORMW 「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人%UNICODE\(0x2661\) \*1%」\n		ELSEIF RAND:2 == 0\n			PRINTFORMW 「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」\n			PRINTFORMW %SAVESTR:PLAYER%拉着%SAVESTR:TARGET%的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。\n			PRINTFORMW 「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…%UNICODE\(0x2661\) \*1%」\n		ELSE\n			PRINTFORMW 「向您请安，魔王大人，今天也请调教我吧%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%三指着地跪坐着向%SAVESTR:PLAYER%行礼。\n			PRINTFORMW 「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	ENDIF\n	RETURN 1\n\n;爱慕\nELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2\n	DRAWLINE\n	;魔族\n	IF TALENT:TARGET:314 == 9\n		IF RAND:3 == 0\n			PRINTFORMW 「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」\n			PRINTFORMW %SAVESTR:TARGET%偎依在了%SAVESTR:PLAYER%了的怀里，脸颊贴在%SAVESTR:PLAYER%的胸前，一股淡淡的香味传到鼻子里。\n			PRINTFORMW 「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」\n		ELSEIF RAND:2 == 0\n			PRINTFORMW 「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」\n			PRINTFORMW %SAVESTR:TARGET%从后面抱住了%SAVESTR:PLAYER%，用甜甜的语调说道。\n			PRINTFORMW 「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦%UNICODE\(0x2661\) \*1%」\n		ELSE\n			PRINTFORMW 「就让我来侍奉魔王大人吧，妹妹就让她好好休息吧%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%握着%SAVESTR:PLAYER%的手，有些出神地说道。\n			PRINTFORMW 「啊啊……其，其实只是想从妹妹，还有其他勇者底下独占魔王大人而已啦%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	;それ以外\n	ELSE\n		IF RAND:3 == 0\n			PRINTFORMW 「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」\n			PRINTFORMW %SAVESTR:TARGET%偎依在了%SAVESTR:PLAYER%了的怀里，脸颊贴在%SAVESTR:PLAYER%的胸前，一股淡淡的香味传到鼻子里。\n			PRINTFORMW 「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」\n		ELSEIF RAND:2 == 0\n			PRINTFORMW 「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」\n			PRINTFORMW %SAVESTR:TARGET%从后面抱住了%SAVESTR:PLAYER%，用甜甜的语调说道。\n			PRINTFORMW 「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦%UNICODE\(0x2661\) \*1%」\n		ELSE\n			PRINTFORMW 「在我被魔王大人调教的时候，妹妹就能平安无事了呢……这样的话，就让我一直来做魔王大人的对手好了%UNICODE\(0x2661\) \*1%」\n			PRINTFORMW %SAVESTR:TARGET%握着%SAVESTR:PLAYER%的手，神情羞涩地说道。\n			PRINTFORMW 「啊啊……我独占你，其实也是为了其他勇者大人们好啊%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	ENDIF\n	RETURN 1\nENDIF\nRETURN 0\n\n;-------------------------------------------------\n;EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用\n;調教終了時のセリフ\n;-------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '515-519',
        any: [
          /@K11_KOJO2\n;崩坏\nIF TALENT:TARGET:9 == 1 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「咕嘿……咕嘿嘿嘿………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '520',
        any: [
          /	PRINTFORMW 已经无法期待精神崩溃的%SAVESTR:TARGET%会有正常的反应了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '525',
        any: [/	PRINTFORMW 「尽管来吧，别以为我不知道你想做什么。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '526',
        any: [/	PRINTFORMW %SAVESTR:TARGET%丝毫不掩盖自己的反抗心理………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '532',
        any: [/	PRINTFORMW 「我不会怕的。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '533',
        any: [/	PRINTFORMW %SAVESTR:TARGET%面无表情，语气冷漠/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '539',
        any: [
          /	PRINTFORMW 「终……终于又来了，这张可憎的脸庞，又要打算对我做什么——放…放手！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '540',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%一把抱了起来，无力反抗而不住地啜泣着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '546',
        any: [/	PRINTFORMW 「不要啊…这种事情……真的不行…呜呜呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '547',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%的手腕被%SAVESTR:PLAYER%扭住，似乎已经失去了反抗的力量………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '556',
        any: [
          /			PRINTFORMW 「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '557',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%带着急促的呼吸，凝视着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '559',
        any: [
          /			PRINTFORMW 「啊啊、妹妹她在……还在休息吗……那就不需要去打扰她了。调教什么的，让，让我来承受就可以了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '560',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%不知道的是，她所担心的妹妹在与%SAVESTR:PLAYER%分开时一直靠着自慰在宣泄性欲………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '564',
        any: [/			PRINTFORMW 「呜……呜呜……什么时候，才能让我和妹妹见面！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '565',
        any: [
          /			PRINTFORMW 虽然内心依旧怀着对%SAVESTR:PLAYER%的厌恶，但是%SAVESTR:TARGET%还是老老实实地躺在了床上……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '567',
        any: [
          /			PRINTFORMW 「让，让我来当你的对手好了！只要别对我妹妹出手，让我做什么都可以……但，但是别以为我会屈服的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '568',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%口头上还在逞强，却完全不知道自己的妹妹已经完全沦陷在%SAVESTR:PLAYER%的调教下了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '577-579',
        any: [
          /	IF TALENT:TARGET:314 == 9\n		IF RAND:3 == 0\n			PRINTFORMW 「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '580',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%冷淡的态度让%SAVESTR:PLAYER%正有些扫兴，但转眼间%SAVESTR:TARGET%却突然捧起了%SAVESTR:PLAYER%的手，挨个地舔着手指。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '581',
        any: [
          /			PRINTFORMW 「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '583',
        any: [
          /			PRINTFORMW 「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '584',
        any: [
          /			PRINTFORMW %SAVESTR:PLAYER%拉着%SAVESTR:TARGET%的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '585',
        any: [
          /			PRINTFORMW 「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '587',
        any: [
          /			PRINTFORMW 「向您请安，魔王大人，今天也请调教我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '588',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%三指着地跪坐着向%SAVESTR:PLAYER%行礼。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '589-591',
        any: [
          /			PRINTFORMW 「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	;それ以外/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '592-594',
        any: [
          /	ELSE\n		IF RAND:3 == 0\n			PRINTFORMW 「终于想起来要来疼爱人家了吗？不过，才不要被抱过别的女孩子的手碰到呢，哼。」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '595',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%冷淡的态度让%SAVESTR:PLAYER%正有些扫兴，但转眼间%SAVESTR:TARGET%却突然捧起了%SAVESTR:PLAYER%的手，挨个地舔着手指。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '596',
        any: [
          /			PRINTFORMW 「呣……呣……呣……好了，这样清洁过的话，就可以来碰人家了哦……来吧，魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '598',
        any: [
          /			PRINTFORMW 「人家今天感觉很累……找别人啦！哎哎？不用这么用力的拉人家的手嘛……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '599',
        any: [
          /			PRINTFORMW %SAVESTR:PLAYER%拉着%SAVESTR:TARGET%的手臂，将对方强行拖进了自己的怀抱里，在耳边低语着“今天就想要你”。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '600',
        any: [
          /			PRINTFORMW 「那，那就让我勉为其难代替妹妹来伺候魔王大人吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '602',
        any: [
          /			PRINTFORMW 「向您请安，魔王大人，今天也请调教我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '603',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%三指着地跪坐着向%SAVESTR:PLAYER%行礼。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '604-606',
        any: [
          /			PRINTFORMW 「…不过，还请魔王大人不要太粗暴了……太痛的方式也不要……人家还是喜欢舒舒服服的爱爱呢%UNICODE\(0x2661\) \*1%」\n		ENDIF\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '613-615',
        any: [
          /	IF TALENT:TARGET:314 == 9\n		IF RAND:3 == 0\n			PRINTFORMW 「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '616',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%偎依在了%SAVESTR:PLAYER%了的怀里，脸颊贴在%SAVESTR:PLAYER%的胸前，一股淡淡的香味传到鼻子里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '617',
        any: [
          /			PRINTFORMW 「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '619',
        any: [
          /			PRINTFORMW 「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '620',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%从后面抱住了%SAVESTR:PLAYER%，用甜甜的语调说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '621',
        any: [
          /			PRINTFORMW 「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '623',
        any: [
          /			PRINTFORMW 「就让我来侍奉魔王大人吧，妹妹就让她好好休息吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '624',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%握着%SAVESTR:PLAYER%的手，有些出神地说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '625',
        any: [
          /			PRINTFORMW 「啊啊……其，其实只是想从妹妹，还有其他勇者底下独占魔王大人而已啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '628-630',
        any: [
          /	ELSE\n		IF RAND:3 == 0\n			PRINTFORMW 「嘿嘿，很高兴魔王大人今天选择了我，来吧……尽情地调教人家吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '631',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%偎依在了%SAVESTR:PLAYER%了的怀里，脸颊贴在%SAVESTR:PLAYER%的胸前，一股淡淡的香味传到鼻子里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '632',
        any: [
          /			PRINTFORMW 「来之前已经好好的清洁过身体了，用的还是新的肥皂，魔王大人喜欢这个味道吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '634',
        any: [
          /			PRINTFORMW 「魔王大人最近还……经常调教我的妹妹吗……不行啦，她还只是个孩子啊……无论身体还是心理上都……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '635',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%从后面抱住了%SAVESTR:PLAYER%，用甜甜的语调说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '636',
        any: [
          /			PRINTFORMW 「所以，还是让我来就侍奉魔王大人就可以了，怎么样的调教我都能接受的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '638',
        any: [
          /			PRINTFORMW 「在我被魔王大人调教的时候，妹妹就能平安无事了呢……这样的话，就让我一直来做魔王大人的对手好了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '639',
        any: [
          /			PRINTFORMW %SAVESTR:TARGET%握着%SAVESTR:PLAYER%的手，神情羞涩地说道。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '640',
        any: [
          /			PRINTFORMW 「啊啊……我独占你，其实也是为了其他勇者大人们好啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '651-748',
        any: [
          /@EVENTEND\nSIF FLAG:7 <= 0\n	RETURN 0\nSIF TALENT:171 != 1\n	RETURN 0\n\n;キャラ死亡時は口上をスキップ\nSIF BASE:0 <= 0\n	RETURN 0\n\n;--------------------------------------------------\n;調教終了時のセリフ\n;--------------------------------------------------\n;崩坏\nIF TALENT:TARGET:9 == 1 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「咕嘿……咕嘿嘿嘿………」\n	PRINTFORMW 少女眼中理性的光芒已经不复存在………\n	RETURN 1\n;反発刻印Lv3\+爱慕无\nELSEIF MARK:3 == 3 && \(TALENT:TARGET:85 == 0 \|\| TALENT:TARGET:76 == 0\)\n	DRAWLINE\n	IF CFLAG:202 >= 1\n		PRINTFORMW 「我，我是绝对不会认输的……」\n		PRINTFORMW 虽然跪在%SAVESTR:PLAYER%的面前，但是%SAVESTR:TARGET%丝毫不掩盖眼神里的反抗……\n	ELSE\n		PRINTFORMW 「我是为了妹妹才忍受的这种事情的，但别以为我会原谅你！」\n		PRINTFORMW %SAVESTR:TARGET%边说着，边用目光怒视着%SAVESTR:PLAYER%……\n	ENDIF\n	RETURN 1\n\n;屈服刻印Lv1以下\+爱慕无\nELSEIF MARK:2 <= 1 && \(TALENT:TARGET:85 == 0 \|\| TALENT:TARGET:76 == 0\)\n	DRAWLINE\n	IF CFLAG:202 >= 1\n		PRINTFORMW 「终于结，结束了…」\n		PRINTFORMW %SAVESTR:TARGET%松了口气，稍微安心了一些。\n	ELSE\n		PRINTFORMW 「什，什么时候让我和妹妹见面…？」\n		PRINTFORMW %SAVESTR:TARGET%满脸疲惫地问着你，但你完全无视了她的问题……\n	ENDIF\n	RETURN 1\n\n;屈服刻印Lv2\+爱慕无\nELSEIF MARK:2 == 2 && \(TALENT:TARGET:85 == 0 \|\| TALENT:TARGET:76 == 0\)\n	DRAWLINE\n	IF CFLAG:202 >= 1\n		PRINTFORMW 「这，这样就能满足魔王大人了吗……那，是不是可以放过我的妹妹了？」\n		PRINTFORMW %SAVESTR:TARGET%虽然被调教得疲惫不堪，但还是不顾自己的身体恳求着。\n		PRINTFORMW 那副可怜的样子却只让你更加感觉身心愉悦………\n	ELSE\n		PRINTFORMW 「还，还要再听话一些……才能让我和妹妹见面吗？」\n		PRINTFORMW %SAVESTR:TARGET%一脸疲惫地问着你，但你完全无视了她的问题………\n	ENDIF\n	RETURN 1\n;屈服刻印Lv3\+爱慕无\nELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0\n	DRAWLINE\n	PRINTFORMW 「下，下次也请继续调教我吧？」\n	PRINTFORMW 已经完全变得驯服的%SAVESTR:TARGET%犹豫地挽住了你的手，虽然你承诺等她体力恢复后会再来，但是是否遵守约定则是你的自由。\n	PRINTFORMW 「我会好好休息等着的……」\n	RETURN 1\n;淫乱\(体力500以上\)\nELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500\n	DRAWLINE\n	PRINTFORMW 「哎哎，才到这种程度就结束了吗……这就要回去了？」\n	PRINTFORMW %SAVESTR:TARGET%有些欲求不满地说道。\n	PRINTFORMW 「那，那下次一定……算了，当我没说吧……」\n	RETURN 1\n;淫乱\(体力500未満\)\nELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500\n	DRAWLINE\n	PRINTFORMW 「哈啊……哈啊……一本满足呢%UNICODE\(0x2661\) \*1%」\n	PRINTFORMW %SAVESTR:TARGET%挽着你的胳膊，露出了心满意足的笑容。\n	PRINTFORMW 「下次……还想要更多的调教哦。」\n	PRINTFORMW 少女对欲望的坦率让你对自己的调教成果十分满意。\n	RETURN 1\n;爱慕\(体力500以上\)\nELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500\n	DRAWLINE\n	PRINTFORMW 「是，是对人家的身体厌倦了吗？」\n	PRINTFORMW %SAVESTR:TARGET%带着不安的表情望着你。\n	PRINTFORMW 「不过……身为魔王大人的奴隶……被抛弃也不能有任何怨言……」\n	RETURN 1\n;爱慕\(体力500未満\)\nELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500\n	DRAWLINE\n	PRINTFORMW 「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…%UNICODE\(0x2661\) \*1%」\n	PRINTFORMW %SAVESTR:TARGET%一边笑着，一边用充满爱意的动人目光看着你。\n	PRINTFORMW 「现在，魔王大人知道我比我妹妹要更好了吧…？」\n	RETURN 1\nENDIF\nRETURN 0\n\n;--------------------------------------------------\n;@KOJO_MESSAGE_COM関係（X1をキャラ番号に置換）\n;コマンド実行時に出力されます\n;--------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '651-659',
        any: [
          /@EVENTEND\nSIF FLAG:7 <= 0\n	RETURN 0\nSIF TALENT:171 != 1\n	RETURN 0\n\n;キャラ死亡時は口上をスキップ\nSIF BASE:0 <= 0\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '663-667',
        any: [
          /;--------------------------------------------------\n;崩坏\nIF TALENT:TARGET:9 == 1 && FLAG:7 == 2\n	DRAWLINE\n	PRINTFORMW 「咕嘿……咕嘿嘿嘿………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '668',
        any: [/	PRINTFORMW 少女眼中理性的光芒已经不复存在………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '674',
        any: [/		PRINTFORMW 「我，我是绝对不会认输的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '675',
        any: [
          /		PRINTFORMW 虽然跪在%SAVESTR:PLAYER%的面前，但是%SAVESTR:TARGET%丝毫不掩盖眼神里的反抗……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '677',
        any: [
          /		PRINTFORMW 「我是为了妹妹才忍受的这种事情的，但别以为我会原谅你！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '678',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%边说着，边用目光怒视着%SAVESTR:PLAYER%……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '686',
        any: [/		PRINTFORMW 「终于结，结束了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '687',
        any: [/		PRINTFORMW %SAVESTR:TARGET%松了口气，稍微安心了一些。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '689',
        any: [/		PRINTFORMW 「什，什么时候让我和妹妹见面…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '690',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%满脸疲惫地问着你，但你完全无视了她的问题……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '698',
        any: [
          /		PRINTFORMW 「这，这样就能满足魔王大人了吗……那，是不是可以放过我的妹妹了？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '699',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%虽然被调教得疲惫不堪，但还是不顾自己的身体恳求着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '700',
        any: [/		PRINTFORMW 那副可怜的样子却只让你更加感觉身心愉悦………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '702',
        any: [/		PRINTFORMW 「还，还要再听话一些……才能让我和妹妹见面吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '703',
        any: [
          /		PRINTFORMW %SAVESTR:TARGET%一脸疲惫地问着你，但你完全无视了她的问题………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '709',
        any: [/	PRINTFORMW 「下，下次也请继续调教我吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '710',
        any: [
          /	PRINTFORMW 已经完全变得驯服的%SAVESTR:TARGET%犹豫地挽住了你的手，虽然你承诺等她体力恢复后会再来，但是是否遵守约定则是你的自由。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '711',
        any: [/	PRINTFORMW 「我会好好休息等着的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '716',
        any: [/	PRINTFORMW 「哎哎，才到这种程度就结束了吗……这就要回去了？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '717',
        any: [/	PRINTFORMW %SAVESTR:TARGET%有些欲求不满地说道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '718',
        any: [/	PRINTFORMW 「那，那下次一定……算了，当我没说吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '723',
        any: [/	PRINTFORMW 「哈啊……哈啊……一本满足呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '724',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%挽着你的胳膊，露出了心满意足的笑容。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '725',
        any: [/	PRINTFORMW 「下次……还想要更多的调教哦。」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '726',
        any: [/	PRINTFORMW 少女对欲望的坦率让你对自己的调教成果十分满意。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '731',
        any: [/	PRINTFORMW 「是，是对人家的身体厌倦了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '732',
        any: [/	PRINTFORMW %SAVESTR:TARGET%带着不安的表情望着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '733',
        any: [
          /	PRINTFORMW 「不过……身为魔王大人的奴隶……被抛弃也不能有任何怨言……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '738',
        any: [
          /	PRINTFORMW 「哈啊……哈啊……能受到魔王大人的宠幸……太幸福了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '739',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%一边笑着，一边用充满爱意的动人目光看着你。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K11_リリィ.ERB',
        ref: '740',
        any: [/	PRINTFORMW 「现在，魔王大人知道我比我妹妹要更好了吧…？」/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
