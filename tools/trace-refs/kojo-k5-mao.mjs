// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k5-mao.mjs
// #236（J26 口上·K5 マオ）：台词/写入/条件行号；ENDIF/ELSE/RETURN 0/DRAWLINE 不保留锚。空 PRINTFORM 因保真锁 A 必须留行锚（锁力在行号，不在正文）

export const FILES = [
  {
    js: 'ere/kojo/kojo-k5-mao.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '80-84',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '82',
        any: [/FLAG:105 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '83-84',
        any: [/SIF FLAG:7 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '86-88',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '88',
        any: [/FLAG:105 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '94',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '103',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '106',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '107',
        any: [/PRINTFORMW 「不要…不要啊…對不起…對不起…神啊…救救我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '108',
        any: [
          /PRINTFORMW 眼前這個魔族少女…曾經是人類、名爲瑪奧的這個少女在房間的角落里低聲啜泣著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '109',
        any: [
          /PRINTFORMW %NAME:MASTER%看著那個重生爲魔族的少女、露出滿意的微笑、出聲搭話。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '110',
        any: [
          /PRINTFORMW 最初少女衹是發呆地看著這邊、或許是因爲魔族的本能、認出了%NAME:MASTER%就是魔王。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '111',
        any: [/PRINTFORMW 「…………魔王大人？…魔王大人的話…會救贖我的吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '112',
        any: [
          /PRINTFORMW 雖然成爲了魔族、但是沒有隨著肉体墮落勉强維持住理智的少女、終于找到了自己的主人………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '113',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '115',
        any: [/CFLAG:370 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '118',
        any: [
          /PRINTFORMW 「你…你這傢夥是誰啊！對本小姐做出這樣的事、村子里的大家不會放過你的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '119',
        any: [
          /PRINTFORMW 少女…名字好像是叫瑪奧…雖然被帶到了調教室里、態度仍舊十分傲慢。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '120',
        any: [
          /PRINTFORMW 看上去是個１２~３歳左右的小女孩、曬黑的褐色肌膚與紅色的頭髮十分相配、顯得很可愛。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '121',
        any: [/PRINTFORMW 「要是敢做奇怪的事的話就咬你哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '122',
        any: [
          /PRINTFORMW %NAME:MASTER%把自己是魔王這件事告訴了少女、問她想要什麽作爲復活自己的回禮。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '123',
        any: [
          /PRINTFORMW 「騙…騙人的吧…魔王什麽的不是童話裏才有的嗎…回、回禮什麽的…總之我想要從這裏出去…不、不行嗎…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '124',
        any: [
          /PRINTFORMW %NAME:MASTER%看起來愉快地搖著頭、用手摁住了少女的肩………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '125',
        any: [/PRINTFORMW 「討…討厭…別摸我…別過來！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '126',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '127',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '132',
        any: [
          /ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '133',
        any: [/PRINTFORMW 「我大概…已經…沒法回到村子里去了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '134',
        any: [
          /PRINTFORMW 眼前的魔族少女…曾經是人類的瑪奧失望地垂下頭、看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '135',
        any: [/PRINTFORMW 「變成這樣的身體什麽的、根本沒有想過啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '136',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的臉皺了起來、一副馬上要哭出來的樣子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '138',
        any: [/CFLAG:370 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '139',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '143',
        any: [/ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '144',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '146',
        any: [
          /PRINTFORMW 把在那個水晶球看到的事情告訴她之後、%SAVESTR:TARGET%的臉就像戴上了能面面具一樣沒有了表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '147',
        any: [
          /PRINTFORMW 「夠、夠了…乾脆…乾脆殺了我吧…我已經…不想再被很强的傢夥玩來玩去了………那個狂王大人也是…魔王大人也是………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '148',
        any: [
          /PRINTFORMW 「但是反正要死的話…想被魔王大人…殺死…就…就算被弄得七零八落也…衹是希望不要被魔物殺了吃掉就好………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '149',
        any: [
          /PRINTFORMW ”畢竟還是個小女孩”%NAME:MASTER%用鼻子吭聲冷笑、不管怎樣%SAVESTR:TARGET%的命運從最初開始就被%NAME:MASTER%握在手裏、那之中已經不存在%SAVESTR:TARGET%的意志了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '151',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '154',
        any: [
          /PRINTFORMW 「魔王大人、對、對不起、我對魔王大人一點違逆之心都沒有…是那個狂王…强行要我………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '155',
        any: [/PRINTFORMW 「請、請原諒…請原諒我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '156',
        any: [
          /PRINTFORMW %NAME:MASTER%講起被送來的水晶球你拍攝的内容、%SAVESTR:TARGET%五體投地跪在地上請求原諒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '158',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '160',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '166',
        any: [
          /ELSEIF CFLAG:201 < 2 && MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '168',
        any: [/PRINTFORMW 「衹要忍耐的話…勇者大人一定會來拯救我的…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '169',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%依然還有反抗的精力、逞强地回瞪著你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '170',
        any: [/CFLAG:201 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '171',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '174',
        any: [
          /ELSEIF CFLAG:201 < 3 && MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '176',
        any: [/PRINTFORMW 「爲什麽…誰都沒來救我………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '177',
        any: [/PRINTFORMW 看起來%SAVESTR:TARGET%的精神已經變得相當很疲憊了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '178',
        any: [/CFLAG:201 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '179',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '182',
        any: [
          /ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '184',
        any: [
          /PRINTFORMW 「如果再這樣下去的話…我、我整個人都要變得奇怪了………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '185',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%滿臉通紅、身體綳緊劇烈顫抖著。照著個樣子下去要不了多久就會陷落的吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '186',
        any: [/CFLAG:201 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '187',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '189',
        any: [
          /ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '191',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%連%NAME:MASTER%來到了房間都沒在意、一直玩弄著股間。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '192',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%…小穴…好舒服…好舒服啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '193',
        any: [
          /PRINTFORMW 「啊…主人…欺負小穴…好舒服…真的好舒服嗚嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '194',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看到%NAME:MASTER%來了、擡起腰、用手指摩擦著股間。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '196',
        any: [
          /PRINTFORMW 「好想快點被人奪走處女…已經做好準備了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '197',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊露出心神蕩漾的表情一邊持續著自慰、看起來已經完全變成淫亂的雌性了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '198',
        any: [
          /PRINTFORMW 「已經…被…被怎麽對待都可以…想要變得舒服起來%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '199',
        any: [/CFLAG:201 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '200',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '202',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '205',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '206',
        any: [/PRINTFORMW %SAVESTR:TARGET%匍匐在地上、不停玩弄著股間。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '207',
        any: [/PRINTFORMW 背上的翅膀看起來很舒服地伸展著、口水都滴到了地上。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '208',
        any: [
          /PRINTFORMW 「主人…快…快…快來侵犯我啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '209',
        any: [
          /PRINTFORMW 察覺到%NAME:MASTER%到來的%SAVESTR:TARGET%一臉心神蕩漾蕩地投去了視綫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '210',
        any: [
          /PRINTFORMW 「啊…是主人啊…%UNICODE\(0x2661\) \*1% 抱抱…抱抱………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '211',
        any: [
          /PRINTFORMW 經過反復調教而變得十分淫亂的%SAVESTR:TARGET%一邊抱住%NAME:MASTER%一邊用自己的股間磨蹭%NAME:MASTER%的大腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '212',
        any: [
          /PRINTFORMW 「好想做愛…已經忍不住啦…呐…快點去床上吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '214',
        any: [
          /PRINTFORMW 「我還是處女哦%UNICODE\(0x2661\) \*1%…想要主人快點來侵犯我已經想的受不了了啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '215',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '216',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '218',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '219',
        any: [/PRINTFORMW %SAVESTR:TARGET%匍匐在地上、不停玩弄著股間。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '220',
        any: [/PRINTFORMW 背上的翅膀看起來很舒服地伸展著、口水都滴到了地上。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '221',
        any: [
          /PRINTFORMW 「主人…快…快…快來侵犯我啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '222',
        any: [
          /PRINTFORMW 察覺到%NAME:MASTER%到來的%SAVESTR:TARGET%一臉心神蕩漾蕩地投去了視綫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '223',
        any: [
          /PRINTFORMW 「啊…主人…我…被主人抱太多次了…整個人都變得奇怪了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '224',
        any: [
          /PRINTFORMW 經過反復調教而變得十分淫亂的%SAVESTR:TARGET%一邊抱住%NAME:MASTER%一邊用自己的股間磨蹭%NAME:MASTER%的大腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '225',
        any: [
          /PRINTFORMW 「這是因爲變成魔族的原因麽？啊啊…總之我忍不住了啊…呐…就這樣做下去吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '227',
        any: [
          /PRINTFORMW 「我還是處女哦%UNICODE\(0x2661\) \*1%…想要主人快點來侵犯我已經想的受不了了啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '228',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '229',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '232',
        any: [
          /PRINTFORMW 「欸嘿嘿…我也成爲和主人一樣的魔族了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '233',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%步伐輕快地跑過去抱住了%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '234',
        any: [
          /PRINTFORMW 「主人…能感受到魔王大人的魔力非常的厲害…如果小穴就這樣被乾的話…我一定會變得奇怪的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '235',
        any: [
          /PRINTFORMW %NAME:MASTER%眼裏露出期待的目光、這樣放任下去的話一定會推倒%NAME:MASTER%的吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '236',
        any: [
          /PRINTFORMW 更是一副絕對不會放手的樣子把尾巴纏到了%NAME:MASTER%的大腿上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '237',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '238',
        any: [
          /PRINTFORMW 「啊哈…新生的我的處女小穴…快點來貫穿吧…來侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '240',
        any: [
          /PRINTFORMW 「拜…托了…想要主人的肉棒…忍不住了…忍不住了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '242',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '243',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '247',
        any: [
          /ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '257',
        any: [/PRINTFORMW 「主人…我、我…已經…不會再違抗你了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '258',
        any: [/PRINTFORMW 少女跪在地上、雙手合十地懇求著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '259',
        any: [
          /PRINTFORMW 「無論什麽…做飯也好、打掃也好…我都會做的…所、所以………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '260',
        any: [/PRINTFORMW 「請讓我一直呆在這裏…不要把我從魔王大人身邊趕走！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '261',
        any: [
          /PRINTFORMW %NAME:MASTER%把哭得不成樣子的%SAVESTR:TARGET%抱到懷裏、讓她在自己的胸膛上抽泣著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '262',
        any: [/PRINTFORMW 「即使回到村子…也已經…沒有我的容身之處了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '263',
        any: [/CFLAG:201 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '264',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '266',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '269',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '270',
        any: [/PRINTFORMW 今天的%SAVESTR:TARGET%順從地等候著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '271',
        any: [/PRINTFORMW 「不想離開…主人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '272',
        any: [
          /PRINTFORMW 出神地看著這邊的%SAVESTR:TARGET%向%NAME:MASTER%撒著嬌。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '273',
        any: [
          /PRINTFORMW 「傳達過來的主人的魔力讓我感到十分放心呢…%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '274',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱住%NAME:MASTER%、把尾巴纏上了他的大腿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '275',
        any: [
          /PRINTFORMW 「啊啊、最喜歡主人了…%UNICODE\(0x2661\) \*1% 真的最喜歡了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '276',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊在%NAME:MASTER%的耳邊細語著情話一邊開心地笑了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '277',
        any: [
          /PRINTFORMW 「感謝您讓我成爲魔族…我真的很高興喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '278',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '279',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '281',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '282',
        any: [
          /PRINTFORMW %NAME:MASTER%進到了可愛的奴隸%SAVESTR:TARGET%的房間。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '283',
        any: [/PRINTFORMW 「啊！…真、真是的…別突然進來啊笨蛋！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '284',
        any: [/PRINTFORMW 「讨厌～…主人一點都不體貼、記得要敲門啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '285',
        any: [
          /PRINTFORMW 馬上打扮完的%SAVESTR:TARGET%一邊整理著頭髮一邊走向%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '287',
        any: [/IF FLAG:30 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '288',
        any: [
          /PRINTFORMW 「老是陪著勇者大人們…我真的受夠了！你根本什麽都不明白！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '289',
        any: [/PRINTFORMW %SAVESTR:TARGET%撅著嘴盯著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '290',
        any: [
          /PRINTFORMW 「………但、但是…主人最愛的果然還是我呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '291',
        any: [/PRINTFORMW 可是突然眉開眼笑地在%NAME:MASTER%的胸口劃著圈圈。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '292',
        any: [/PRINTFORMW 「我是多麽想生下…魔王大人的孩子啊…所以、呐？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '293',
        any: [/PRINTFORMW %SAVESTR:TARGET%耳朵通紅地向%NAME:MASTER%乞求………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '295',
        any: [/PRINTFORMW 「啊…真是的！太讓女孩子丟人了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '297',
        any: [/ELSEIF FLAG:30 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '298',
        any: [/PRINTFORMW 「那樣真的會被原勇者大人討厭的吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '299',
        any: [/PRINTFORMW %SAVESTR:TARGET%背著手轉過身來、投來了熾熱的目光。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '300',
        any: [
          /PRINTFORMW （嘛、我這樣做也不壞呢…競爭對手自然是越少越好………）忽然避開視綫小聲嘟噥著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '301',
        any: [
          /PRINTFORMW 「那個、你看啊…被別人討厭的魔王大人…我、我會好好安慰你的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '302',
        any: [
          /PRINTFORMW 「因爲隻有作爲魔族的我才是主人你的同伴哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '303',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地抱住了%NAME:MASTER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '306',
        any: [/PRINTFORMW 「那樣做真的會被抓到的勇者大人討厭的吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '307',
        any: [/PRINTFORMW %SAVESTR:TARGET%背著手轉過身來、投來了熾熱的目光。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '308',
        any: [/PRINTFORMW （嘛、我這樣做也不壞呢………）忽然避開視綫小聲嘟噥著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '309',
        any: [
          /PRINTFORMW 「那個、你看啊…被別人討厭的魔王大人…我、我會好好安慰你的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '310',
        any: [
          /PRINTFORMW 「因爲隻有作爲魔族的我才是主人你的同伴哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '311',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地抱住了%NAME:MASTER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '313',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '314',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '317',
        any: [/PRINTFORMW 「啊…主人啊…看吧、這絕妙的青色肌膚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '318',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊雙手撫摸著自己的青色肌膚一邊神魂顛倒地發著呆。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '319',
        any: [
          /PRINTFORMW 「衹是想著過會要被主人做什麽就已經要變得奇怪了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '320',
        any: [/PRINTFORMW %SAVESTR:TARGET%渾身發抖、癱倒在地摩擦著雙腿。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '321',
        any: [
          /PRINTFORMW 「感受到了魔王大人那無與倫比的魔力…看啊…呐…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '322',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%怯生生地張開雙手誘惑著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '323',
        any: [/PRINTFORMW 「拜托了啦…好好抱抱新生的我把！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '324',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '325',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '328',
        any: [/ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '330',
        any: [/PRINTFORMW 「啊啊…我、我已經…受夠了…不要…不要…不要啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '331',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%靠著墻坐著、嘴裏不知道在嘟噥著什麽。仔細一看她周圍都是失禁的穢物。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '332',
        any: [/PRINTFORMW 精神已經崩壞的%SAVESTR:TARGET%應該恢復不了吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '333',
        any: [/CFLAG:201 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '334',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '337',
        any: [/ELSEIF ASSI < 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '338',
        any: [/CALL K5_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '339',
        any: [/CALL K5_FUKU/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '399',
        any: [/CALL K5_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '400',
        any: [/CALL K5_FUKU/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '407',
        any: [/@K5_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '409',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '411',
        any: [
          /PRINTFORMW 「呼…呼…別碰我…真是的…請不要再對我動手動脚的了…啊…啊啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '412',
        any: [
          /PRINTFORMW 不能期待精神已經崩壞了的%SAVESTR:TARGET%做出正面的回應吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '413',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '416',
        any: [/ELSEIF MARK:3 == 3 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '418',
        any: [/PRINTFORMW 「嗚！嗚！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '419',
        any: [/PRINTFORMW %SAVESTR:TARGET%發出警惕的嘶吼。簡直和野獸一樣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '420',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '423',
        any: [
          /ELSEIF MARK:2 == 0 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '425',
        any: [/PRINTFORMW 「別、別過來啊、咬你哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '426',
        any: [/PRINTFORMW %SAVESTR:TARGET%知道沒用但還是虛張聲勢著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '427',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '430',
        any: [
          /ELSEIF MARK:2 == 1 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '432',
        any: [/PRINTFORMW 「像你這種人總有一天會被勇者大人打倒的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '433',
        any: [/PRINTFORMW %SAVESTR:TARGET%事到如今依然對將來懷有希望………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '434',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '437',
        any: [
          /ELSEIF MARK:2 == 2 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '439',
        any: [/PRINTFORMW 「這樣做也沒關係哦…完全不要緊的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '440',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身體微微顫抖、小聲嘟噥著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '441',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '444',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && FLAG:7 == 2 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '446',
        any: [/PRINTFORMW 「啊啊…會聽…魔王大人的命令的………已經不那麽痛了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '447',
        any: [/PRINTFORMW %SAVESTR:TARGET%順從地準備開始………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '448',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '451',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '455',
        any: [/IF FLAG:37 != 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '457',
        any: [/IF \(CFLAG:40 & 28\) && CFLAG:41 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '458',
        any: [
          /PRINTFORMW 雖然%SAVESTR:TARGET%穿著的衹是很普通的便宜衣服、她卻十分愛惜。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '459',
        any: [
          /PRINTFORMW 「一直以來穿的都是姐姐穿過的舊衣服、把這樣的衣服給我穿實在是太浪費了♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '460',
        any: [
          /PRINTFORMW 「那個、所以…今天也會做的吧？ 可以哦、即使把衣服弄髒也…衣服染上主人的氣味什麽的最棒了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '461',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊説著那樣的話一邊撩起裙子露出了可愛的内衣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '462',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '464',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 101/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '465',
        any: [
          /PRINTFORMW 雖然%SAVESTR:TARGET%穿著的衹是很普通的便宜衣服、她卻十分愛惜。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '466',
        any: [
          /PRINTFORMW 「呐、怎麽樣？合適嗎？…但是、我穿著這樣的褲子完全就像是個男孩子嘛…而且做起來不是會很麻煩嗎」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '467',
        any: [/PRINTFORMW 可是%SAVESTR:TARGET%一邊笑著一邊彎下腰撅起了屁股。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '468',
        any: [
          /PRINTFORMW 「看啊看啊～碰到屁股了哦～♪ 嗯…就那樣把内褲脫掉…侵犯我把…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '469',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '471',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 209/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '472',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%提起女僕裝的裙擺、按照%NAME:MASTER%吩咐的樣子行禮。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '473',
        any: [
          /PRINTFORMW 「非常感謝您選擇了我。在這段時間里我會誠心誠意地爲您服務的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '474',
        any: [
          /PRINTFORMW 「………啊哈…當然是H意義上的%UNICODE\(0x2661\) \*1% 吮吸主人的肉棒嗎？可以喲！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '475',
        any: [
          /PRINTFORMW 啊啊、淫亂至極的%SAVESTR:TARGET%馬上結束了行禮、不留痕跡地抱住了%NAME:MASTER%的下半身吮吸起來………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '476',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '478',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 203/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '479',
        any: [/PRINTFORMW 「啊哈…主人…現在的我是不是色色的？很淫蕩？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '480',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%穿著的妓女服是量身定製的、與她的膚色非常相配的粉色木紋禮服胸口深V露出的深壑讓%NAME:MASTER%覺得十分賞心悅目。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '481',
        any: [
          /PRINTFORMW 「因爲我是被主人買下的專用少女娼妓…什麽都可以做喲…啊、但是應該和平時一樣吧、尼嘿嘿♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '482',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地行了一禮并拉起了裙子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '483',
        any: [
          /PRINTFORMW 「啊啊…想要展現自己、特別是H這方面的…主人…我們來做愛吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '484',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '488',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '489',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '490',
        any: [
          /PRINTFORMW 「今天想要舔主人身體的各個地方呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '491',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔紫色的嘴唇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '492',
        any: [
          /PRINTFORMW 「肉棒也好肛門也好…無論是哪裏我都會舔的喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '493',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '494',
        any: [
          /PRINTFORMW 「啊啊嗯、魔王大人…今天也請賜予我滿滿的魔力吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%顫動著背上的翅膀像撒歡的小狗一樣和%NAME:MASTER%嬉戲著、灼熱的嬌喘讓人覺得很淫亂………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '496',
        any: [/PRINTFORMW 「身體里無論哪裏都會接受的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '498',
        any: [
          /PRINTFORMW 「主人%UNICODE\(0x2661\) \*1% 今天也請讓我侍奉肉棒…我會好好努力的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '499',
        any: [/PRINTFORMW %SAVESTR:TARGET%跪在%NAME:MASTER%胯間吮吸著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '501',
        any: [
          /PRINTFORMW 「主人的精液…全部都是我的東西%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '503',
        any: [
          /PRINTFORMW 「濃濃的、熱熱的、美味的…全部都會喝下去的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '507',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '508',
        any: [
          /PRINTFORMW 「主人%UNICODE\(0x2661\) \*1%…我會好好地侍奉你的%UNICODE\(0x2661\) \*1%、會讓你變得很舒服的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '509',
        any: [
          /PRINTFORMW 「今天想要舔主人身體的各個地方呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '510',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔可愛的嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '511',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '512',
        any: [
          /PRINTFORMW 「對於我自己的身體我可是很有自信的…一定會讓主人變得很舒服的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '513',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像撒歡的小狗一樣和%NAME:MASTER%嬉戲著、灼熱的嬌喘讓人覺得很淫亂………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '515',
        any: [
          /PRINTFORMW 「主人%UNICODE\(0x2661\) \*1% 今天也請讓我侍奉肉棒…我會好好努力的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '516',
        any: [/PRINTFORMW %SAVESTR:TARGET%跪在%NAME:MASTER%胯間吮吸著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '518',
        any: [
          /PRINTFORMW 「主人的精液…全部都是我的東西%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '520',
        any: [
          /PRINTFORMW 「濃濃的、熱熱的、美味的…全部都會喝下去的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '523',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '525',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '528',
        any: [
          /IF CFLAG:42 == 91 && \(CFLAG:40 & 64\) && CFLAG:601 == 901 && FLAG:37 != 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '529',
        any: [/PRINTFORMW %SAVESTR:TARGET%出神地看著手上的戒指。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '530',
        any: [
          /PRINTFORMW 可是注意到%NAME:MASTER%看著這邊是馬上紅著臉端正了坐姿。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '531',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '535',
        any: [/IF FLAG:37 != 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '537',
        any: [/IF \(CFLAG:40 & 28\) && CFLAG:41 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '538',
        any: [
          /PRINTFORMW 「還在村子里時、一直衹能穿姐姐穿過的舊衣服…能穿上這麽好的衣服什麽的…非常感謝主人！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '539',
        any: [
          /PRINTFORMW 衹是如此普通的衣服就讓少女如此高興反而讓你有些害羞。但是、看到那樣的%SAVESTR:TARGET%你也覺得很高興。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '540',
        any: [
          /PRINTFORMW 於是%SAVESTR:TARGET%發自内心的笑著突然轉過身來。飄揚的裙擺讓你覺得美麗到炫目………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '541',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '543',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 101/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '544',
        any: [
          /PRINTFORMW 「還在村子里時、一直衹能穿姐姐穿過的舊衣服…能穿上這麽好的衣服什麽的…非常感謝主人！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '545',
        any: [
          /PRINTFORMW 衹是如此普通的衣服就讓少女如此高興反而讓你有些害羞。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '546',
        any: [/PRINTFORMW 「欸嘿嘿、穿褲子的樣子也很可愛吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '547',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '549',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 209/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '550',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%提起女僕裝的裙擺、按照%NAME:MASTER%吩咐的樣子行禮。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '551',
        any: [
          /PRINTFORMW 「非常感謝您選擇了我。在這段時間里我會誠心誠意地爲您服務的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '552',
        any: [
          /PRINTFORMW 「………啊~真是的！這個好像不怎麽適合我啊！好害羞啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '553',
        any: [
          /PRINTFORMW 接下來要做更加羞羞的事情吧…%NAME:MASTER%不由地苦笑起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '554',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '556',
        any: [/ELSEIF \(CFLAG:40 & 28\) && CFLAG:41 == 203/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '557',
        any: [/PRINTFORMW 「那、那個…這麽艷麗的衣服是不適合我…的呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '558',
        any: [
          /PRINTFORMW %NAME:MASTER%把手伸進了%SAVESTR:TARGET%的妓女服胸口露出的深壑里、溫柔地撫摸著胸部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '559',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%發出甜膩的呻吟、向%NAME:MASTER%的懷裏擠了擠。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '560',
        any: [
          /PRINTFORMW 「啊…哈…♪…真是的…主人…更加…H…也是可以的喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '561',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '565',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '566',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '567',
        any: [/PRINTFORMW 「啊…今天也請好好疼愛我%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '568',
        any: [/PRINTFORMW 「想要直接感受主人的魔力喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '569',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%顫動著背上的翅膀、看起來讓人十分焦急………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '570',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '571',
        any: [/PRINTFORMW 「呐呐…我比勇者姐姐們都要更“好”嗎…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '572',
        any: [
          /PRINTFORMW 「………欸嘿嘿…果然是因爲都是魔族所以相性很好吧…好高興%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '573',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在%NAME:MASTER%的胸口撒嬌似地蹭了蹭鼻子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '574',
        any: [
          /PRINTFORMW 「呐…來做吧…想要滿滿的魔力喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '576',
        any: [/PRINTFORMW 「最喜歡…魔王大人了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '577',
        any: [
          /PRINTFORMW 「衹是凝視著你就讓我不能自已了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '578',
        any: [
          /PRINTFORMW 正如%SAVESTR:TARGET%所説的、她黃色的眼眸漸漸濕潤了、差不多該好好疼愛她一番了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '583',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '584',
        any: [
          /PRINTFORMW 「欸嘿嘿、歡迎主人你大駕光臨%UNICODE\(0x2661\) \*1% 我一直在等你喲~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '585',
        any: [
          /PRINTFORMW 「要好好疼愛我哦%UNICODE\(0x2661\) \*1% 明明衹是被主人觸摸而已…爲什麽會感到這麽高興呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '586',
        any: [/PRINTFORMW %SAVESTR:TARGET%無憂無慮地笑著準備開始………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '587',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '588',
        any: [/PRINTFORMW 「那個…那個…或許…我比勇者姐姐們都要更“好”嗎…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '589',
        any: [
          /PRINTFORMW 「是那樣的話…我真的非常高興呢…嗚呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '590',
        any: [/PRINTFORMW %NAME:MASTER%溫柔地撫摸著%SAVESTR:TARGET%的頭………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '591',
        any: [
          /PRINTFORMW 「啊…今天也請讓我好好地侍奉你%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '593',
        any: [/PRINTFORMW 「最喜歡…魔王大人了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '594',
        any: [
          /PRINTFORMW 「衹是凝視著你就讓我不能自已了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '595',
        any: [
          /PRINTFORMW 正如%SAVESTR:TARGET%所説的、她的眼眸漸漸濕潤了、差不多該好好疼愛她一番了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '598',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '604',
        any: [/@K5_FUKU/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '605',
        any: [/;ネッサ崩坏は嫌いよ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '607',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '610',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '613',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '615',
        any: [/IF \(CFLAG:40 & 28\) == 0 && CFLAG:41 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '617',
        any: [
          /IF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '619',
        any: [
          /PRINTFORMW 渾身赤裸的%SAVESTR:TARGET%搓著自己冰冷的身體、發現你看到了自己狼狽的樣子的%SAVESTR:TARGET%輕蔑地瞪了你一眼、背過身去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '621',
        any: [
          /ELSEIF MARK:2 == 0 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '623',
        any: [
          /PRINTFORMW 「那個、這裏這麽冷能給我一件像樣點的衣服嗎？…啊…不要露出那種表情啊！稍、稍微差點的衣服也可以啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '625',
        any: [
          /ELSEIF MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '627',
        any: [/PRINTFORMW 「啊啊真是的！…我很怕冷的啊、給我一件衣服穿吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '629',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '631',
        any: [/PRINTFORMW 「但是…好冷啊…拜托了…給我一件衣服穿吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '633',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '635',
        any: [/PRINTFORMW 「那個…請讓我吧衣服穿上吧…拜托您了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '637',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '639',
        any: [
          /PRINTFORMW 「那、那個…在主人面前赤身裸體的呼很不好意思啦…想要穿新衣服…不行？不行嗎…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '641',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '642',
        any: [
          /PRINTFORMW 「那個啊、我想試一下“女僕裝”啦、當然普通的衣服也可以啦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '644',
        any: [/PRINTFORMW 「………接、接下來…那個…戒、戒指什麽的…呀♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '647',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '649',
        any: [/PRINTFORMW 「裸體也不是不可以…可是更想要漂亮的衣服…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '650',
        any: [/PRINTFORMW 「呐…幫我買嘛♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '653',
        any: [
          /PRINTFORMW 「那個啊、“妓女服”和“女僕裝”我都想試一下啦、如果是乾净的普通衣服的話也是可以的喲~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '656',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '664',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '678',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '680',
        any: [/PRINTFORMW 「不要…不要…我不要懷上怪物的孩子…不要啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '681',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼淚和口水流得到處都是、就這樣癱倒在地上………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '682',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '684',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '686',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上啜泣著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '687',
        any: [/PRINTFORMW 「姐姐…救救我…救救我啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '688',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '691',
        any: [
          /ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '693',
        any: [/PRINTFORMW %SAVESTR:TARGET%精疲力盡地癱倒在地上。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '694',
        any: [/PRINTFORMW 「這種事…根本不算什麽………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '695',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '698',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '700',
        any: [/PRINTFORMW 「救救我吧…勇者大人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '701',
        any: [/PRINTFORMW %SAVESTR:TARGET%癱倒在床上、卑微地祈求著幫助………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '702',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '705',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '707',
        any: [/PRINTFORMW 「不能…做…這樣的事哦………真是的…受不了你………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '708',
        any: [/PRINTFORMW %SAVESTR:TARGET%精神恍惚、沉浸在調教的餘韻里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '709',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '711',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '714',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '715',
        any: [/PRINTFORMW 「啊嗯…還不夠喲…還想要更多啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '716',
        any: [/PRINTFORMW %SAVESTR:TARGET%感到些許的不滿足………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '719',
        any: [
          /PRINTFORMW 「欸嘿嘿…對一個孩子做出這樣的事…主人果然很鬼畜呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '720',
        any: [/PRINTFORMW %SAVESTR:TARGET%在床上哧哧地笑著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '722',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '724',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '727',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '728',
        any: [
          /PRINTFORMW 「啊…還要…還想要…請把我幹死吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '729',
        any: [/PRINTFORMW %SAVESTR:TARGET%難受地提高了聲音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '732',
        any: [/PRINTFORMW 「啊…請…請接著做下去…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '733',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%難受地提高了聲音、明明應該已經非常累了、不過好像并不是很累的樣子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '735',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '738',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '741',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '742',
        any: [/PRINTFORMW 「魔王大人還滿意嗎…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '743',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在床上手忙脚亂的。體力還很富餘的樣子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '746',
        any: [/PRINTFORMW 「魔王大人還滿意嗎…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '747',
        any: [/PRINTFORMW %SAVESTR:TARGET%體力還很富餘的樣子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '749',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '751',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '754',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '755',
        any: [
          /PRINTFORMW 「很高興能好好地侍奉魔王大人喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '756',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了滿足的笑容………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '759',
        any: [
          /PRINTFORMW 「對我這樣的孩子做出這樣的事…主人還真是個變態呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '760',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了滿足的笑容………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '762',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '770',
        any: [/@KOJO_MESSAGE_COM_5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '771-793',
        any: [
          /;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '772-773',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '775-776',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '778-779',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '781-782',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '784-785',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '787-790',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '788',
        any: [/CALL COLOSSEUM_KOJO_5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '792-793',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '802-848',
        any: [/PRINTFORMW 「咕…嗚嗚…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '803-814',
        any: [/PRINTFORMW 「咕…嗚嗚…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '805-812',
        any: [/PRINTFORMW 「咕…嗚嗚…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '807',
        any: [/PRINTFORMW 「咕…嗚嗚…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '810',
        any: [/PRINTFORMW 「你這個變態…別、別碰我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '811',
        any: [
          /PRINTFORMW （現在如果發出奇怪的聲音的話…隻會讓這傢夥感到高興、一定要忍耐…！）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '813',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '815-847',
        any: [/PRINTFORMW 「嗯…啊…主人的手指好厲害…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '817-822',
        any: [/PRINTFORMW 「嗯…啊…主人的手指好厲害…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '819',
        any: [/PRINTFORMW 「嗯…啊…主人的手指好厲害…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '820',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%彎曲著身體、把%SAVESTR:PLAYER%的手夾在自己的大腿間。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '821',
        any: [
          /PRINTFORMW 「請讓我的H小穴…變得更加淫亂吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '822',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '823-828',
        any: [
          /PRINTFORMW 「啊…啊哈…啊%UNICODE\(0x2661\) \*1%不要嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '825',
        any: [
          /PRINTFORMW 「啊…啊哈…啊%UNICODE\(0x2661\) \*1%不要嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '826',
        any: [/PRINTFORMW 故意發出尖叫的%SAVESTR:TARGET%顯得十分的可愛。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '827',
        any: [
          /PRINTFORMW 「主人、再多摸摸我嘛%UNICODE\(0x2661\) \*1% 舒服的我都要叫出來了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '828',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '829-834',
        any: [
          /PRINTFORMW 「哈…嗚…嗯咕%UNICODE\(0x2661\) \*1%…啊…啊…嗯%UNICODE\(0x2661\) \*1%……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '831',
        any: [
          /PRINTFORMW 「哈…嗚…嗯咕%UNICODE\(0x2661\) \*1%…啊…啊…嗯%UNICODE\(0x2661\) \*1%……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '832',
        any: [/PRINTFORMW %SAVESTR:TARGET%的嘴裏不住地發出甜美的嬌喘。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '833',
        any: [/PRINTFORMW （明明衹是被觸摸而已…聲音…卻…忍不住了…啦）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '834',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '835-839',
        any: [/PRINTFORMW 「啊…啊咕…嗚嗚…嗯咕…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '837',
        any: [/PRINTFORMW 「啊…啊咕…嗚嗚…嗯咕…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '838',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受到了從未體驗過的愉悅在沸騰著、忍不住皺起了臉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '839',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '840-844',
        any: [/PRINTFORMW 「不要、那、那裏…不要…碰那裏…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '842',
        any: [/PRINTFORMW 「不要、那、那裏…不要…碰那裏…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '843',
        any: [/PRINTFORMW %SAVESTR:TARGET%不停地扭動著身體進行反抗………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '844',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '853',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '855',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '857',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '858',
        any: [/PRINTFORMW 「不、不要…啊…難道…要舔那裏…啊嗚！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '859',
        any: [
          /PRINTFORMW 不理會%SAVESTR:TARGET%慌亂的反抗、%SAVESTR:PLAYER%强硬地把她的雙腿掰開。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '860',
        any: [/PRINTFORMW 「那、那裏…祇有那裏是不可以的…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '863',
        any: [/PRINTFORMW 「不、不要…啊…難道…要舔那裏…啊嗚！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '864',
        any: [
          /PRINTFORMW 不理會%SAVESTR:TARGET%慌亂的反抗、%SAVESTR:PLAYER%强硬地把她的雙腿掰開………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '866',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '871',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '872',
        any: [/PRINTFORMW 「呀啊…主人真是H…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '873',
        any: [/PRINTFORMW %SAVESTR:TARGET%抱住大開的雙腿、用手指掰開小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '874',
        any: [
          /PRINTFORMW 「不要再考慮了快來舔嘛、小穴已經…濕成這樣了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '875',
        any: [
          /PRINTFORMW 會露出那種淫蕩表情的人已經不再是原來的那個村娘了、而是和這個地城相當相稱的居民………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '876',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '878',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '879',
        any: [
          /PRINTFORMW 「好、好的…請舔…我的那裏吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '880',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%高興地打開雙腿、迎接%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '881',
        any: [
          /PRINTFORMW 「啊…舔的…好舒服啊%UNICODE\(0x2661\) \*1%…主人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '882',
        any: [
          /PRINTFORMW 激動的%SAVESTR:TARGET%用柔弱的大腿、夾緊了%SAVESTR:PLAYER%的頭………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '883',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '885',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '886',
        any: [/PRINTFORMW 「我不會…反抗的…所以請溫柔一點………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '887',
        any: [/PRINTFORMW 熾熱的舌頭仔細地舔著%SAVESTR:TARGET%露出的陰唇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '888',
        any: [/PRINTFORMW 「啊…呼…嗚…啊…嗚咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '889',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '891',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '892',
        any: [/PRINTFORMW 「啊嗚！好、好惡心………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '893',
        any: [/PRINTFORMW 被舔著陰唇的%SAVESTR:TARGET%顯露出厭惡的情緒。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '894',
        any: [/PRINTFORMW 「就算是像被狗舔那樣也…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '895',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '904',
        any: [/IF SELECTCOM == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '906',
        any: [/IF CFLAG:303 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '907',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '908',
        any: [/PRINTFORMW 「嗚…嗯…嗚啊…手、手指進來了…啊嗚！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '909',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛門抽動著……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '911',
        any: [/PRINTFORMW 「難、難道是那裏…呀啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '912',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不停地扭動著腰、想要避開%SAVESTR:PLAYER%的手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '914',
        any: [/CFLAG:TARGET:303 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '918',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '920',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '921',
        any: [
          /PRINTFORMW 「哼呀…連、連裏面都…進來了…塞得滿滿的…嘻…嘻呀…啊啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '922',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰完全脫力了、衹是輕輕地動一下手指就能讓她顫抖不止。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '923',
        any: [
          /PRINTFORMW 「好、的…真是的…不玩弄屁股小穴的話…已經活不下去了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '924',
        any: [
          /PRINTFORMW 「怎麽樣都可以…快點再…玩弄我的…屁股小穴啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '925',
        any: [/CFLAG:303 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '927',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '928',
        any: [
          /PRINTFORMW 「肛門…可以哦%UNICODE\(0x2661\) \*1%…啊~弄得我好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '929',
        any: [/PRINTFORMW %SAVESTR:TARGET%發出了仿佛舒服得要融化掉的聲音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '930',
        any: [
          /PRINTFORMW 「啊啊…要上癮了…主人再多摸一會兒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '931',
        any: [/CFLAG:303 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '933',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '934',
        any: [
          /PRINTFORMW 「主人…請再溫柔一點…啊%UNICODE\(0x2661\) \*1%…哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '935',
        any: [
          /PRINTFORMW 潤滑稍稍有點不足、%SAVESTR:TARGET%忍著疼痛接納手指的進入。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '936',
        any: [/PRINTFORMW 「啊…哈………啊嗚嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '937',
        any: [/CFLAG:303 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '939',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '940',
        any: [
          /PRINTFORMW 「再多摳摳我的肛門啊%UNICODE\(0x2661\) \*1%…可以喲%UNICODE\(0x2661\) \*1%可以的喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '941',
        any: [
          /PRINTFORMW 衹是被稍稍玩弄了下肛門的%SAVESTR:TARGET%腰不住地顫抖、發出了快樂的尖叫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '942',
        any: [
          /PRINTFORMW 「衹是屁股就快要去了啊%UNICODE\(0x2661\) \*1% 請更多地%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '943',
        any: [/CFLAG:303 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '945',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '946',
        any: [/PRINTFORMW 「啊呀嗚…這、這樣可以喲…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '947',
        any: [
          /PRINTFORMW 被玩弄著肛門的%SAVESTR:TARGET%發出了仿佛舒服得要融化掉的聲音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '948',
        any: [
          /PRINTFORMW 「嗯呀…啊%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1% 啊%UNICODE\(0x2661\) \*1% 哈啊啊呀嗚嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '949',
        any: [/CFLAG:303 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '951',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '952',
        any: [
          /PRINTFORMW 「嗚呀…請再…溫柔一點…啊…啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '953',
        any: [
          /PRINTFORMW 潤滑稍稍有點不足、%SAVESTR:TARGET%忍著疼痛接納手指的進入。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '954',
        any: [
          /PRINTFORMW 「我、我…會好好用屁股做H的事的…所以…請再溫柔一點%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '955',
        any: [/CFLAG:303 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '957',
        any: [
          /ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '958',
        any: [
          /PRINTFORMW 「嗚…嗯…嗚啊…嗯…嗯嗯……好像…要…變得奇怪了啊…屁股要變得奇怪了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '959',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛門抽動著……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '960',
        any: [/CFLAG:303 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '962',
        any: [/ELSEIF CFLAG:303 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '963',
        any: [/PRINTFORMW 「住手啊…做那種事衹會讓我很痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '964',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不停地扭動著腰、想要避開%SAVESTR:PLAYER%的手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '965',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '974',
        any: [/IF SELECTCOM == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '976',
        any: [/IF CFLAG:304 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '977',
        any: [/PRINTFORMW 「我、我知道了…我、我會…自、自慰的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '978',
        any: [/CFLAG:TARGET:304 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '983',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '984',
        any: [
          /PRINTFORMW 「衹是自慰的話不夠啦、已經忍不住了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '985',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在那瞬間突然猛地把手指插了進去、像是要戳破處女膜一樣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '986',
        any: [
          /PRINTFORMW 「如果戳破處女膜…手指進到更裏面的話…一定很舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '987',
        any: [
          /PRINTFORMW 「好想把手指插進去變得更舒服啊…啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '988',
        any: [/CFLAG:304 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '990',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '992',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '993',
        any: [
          /PRINTFORMW 「小穴…小穴好舒服%UNICODE\(0x2661\) \*1% 好喜歡欺負陰蒂啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '994',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%完全沉浸在用手指揉搓陰蒂的快感當中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '995',
        any: [
          /PRINTFORMW 淫水翻動的聲音不時響起。從幼小的軀體當中能感受到相當淫靡的感覺。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '996',
        any: [
          /PRINTFORMW 「想要更多地自慰%UNICODE\(0x2661\) \*1%…我已經衹需要小穴了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '997',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '998',
        any: [
          /PRINTFORMW 「欸嘿嘿…可以喲、我會好好地在主人面前自慰的喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '999',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%帶著一臉淫蕩的表情開始了自慰、她的手熟練地摩擦著小穴、連呼吸都熾熱了起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1000',
        any: [
          /PRINTFORMW 「哈…哈…啊嗯…小穴好舒服…好舒服啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1001',
        any: [
          /PRINTFORMW 「主人在旁邊看著的話…連著自慰一整天也不是不可以喲%UNICODE\(0x2661\) \*1% 」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1003',
        any: [
          /PRINTFORMW 「我的自慰show…請好好地享受吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1004',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭動著腰、享受著自慰帶來的快感。已經是誰都不能阻止她自慰了吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1005',
        any: [
          /PRINTFORMW 「手指停不下來…啊啊啊…主人%UNICODE\(0x2661\) \*1%…快看、快看我自慰的地方啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1007',
        any: [/CFLAG:304 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1009',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1011',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1012',
        any: [
          /PRINTFORMW 「不要…比起自慰什麽的…更想要主人的肉棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1013',
        any: [
          /PRINTFORMW 説著那樣的話的%SAVESTR:TARGET%一邊打開雙腿、一邊開始高興地自慰起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1014',
        any: [
          /PRINTFORMW 「嗯%UNICODE\(0x2661\) \*1% 嗯%UNICODE\(0x2661\) \*1%…啊啊…把這個…想象成…主人的肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1015',
        any: [/PRINTFORMW %SAVESTR:TARGET%漸漸加快了手指抽插的速度………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1017',
        any: [
          /PRINTFORMW 「衹是看著我自慰…主人就很高興了嗎？………啊哈哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1018',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭動著腰、享受著自慰帶來的快感。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1019',
        any: [
          /PRINTFORMW 「啊…啊啊嗯…肉棒%UNICODE\(0x2661\) \*1%…好想要肉棒%UNICODE\(0x2661\) \*1% 好想要肉棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1020',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%年幼的身體拼命地後仰、一邊發出尖叫著一邊持續著自慰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1022',
        any: [/CFLAG:304 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1024',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1025',
        any: [
          /PRINTFORMW 「衹是自慰的話不夠啦、已經忍不住了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1026',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在那瞬間突然猛地把手指插了進去、像是要戳破處女膜一樣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1027',
        any: [
          /PRINTFORMW 「快點啦、快點嘛…給我…主人的%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1028',
        any: [/CFLAG:304 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1030',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1032',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1033',
        any: [
          /PRINTFORMW 「小穴自慰的地方…請好好滴欣賞%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1034',
        any: [
          /PRINTFORMW 那樣無憂無慮地笑著的%SAVESTR:TARGET%把手指伸向了小穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1035',
        any: [
          /PRINTFORMW 「啊哈…好喜歡自慰啊%UNICODE\(0x2661\) \*1% 喜歡%UNICODE\(0x2661\) \*1% 喜歡%UNICODE\(0x2661\) \*1% 好想一直這樣下去%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的手指伸進了小穴、不停地抽插著、發出了色情的聲響………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1037',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1038',
        any: [
          /PRINTFORMW 「嗯、嗯…一直都是想著主人的事…來…自慰%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1039',
        any: [
          /PRINTFORMW 「好像永遠自慰下去…連内衣都不想穿了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1040',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%扭動著腰、爲了激發出小穴的快感不停地動著手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1042',
        any: [
          /PRINTFORMW 被命令自慰的%SAVESTR:TARGET%開始愉快地玩弄起自己的小穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1043',
        any: [
          /PRINTFORMW 「我是個H的孩子真是對不起…是個最喜歡自慰的小猴子真是對不起%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1044',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一邊感嘆著、一邊注視著%SAVESTR:TARGET%的自慰show。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1045',
        any: [
          /PRINTFORMW 「我、我…最喜歡被主人看著自慰了…真是個變態的小姑娘呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1047',
        any: [/CFLAG:304 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1049',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1051',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1052',
        any: [
          /PRINTFORMW 「真是的…想看著我自慰什麽的………真是拿你沒辦法呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兩腿大開、挺起腰部、把手指伸向了小穴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1054',
        any: [
          /PRINTFORMW 「被主人…看見了…看見了啊…%UNICODE\(0x2661\) \*1% 啊啊啊啊哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1056',
        any: [
          /PRINTFORMW 「雖然很害羞可是…如果是主人你想看的話…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1057',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇、把手指伸向了小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1058',
        any: [
          /PRINTFORMW 「啊…啊啊…嗯…哈嗚…被看著…好有感覺…太有感覺了啊………%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1060',
        any: [/CFLAG:304 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1062',
        any: [
          /ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1064',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1065',
        any: [/PRINTFORMW 「才、才沒有感覺呢…嗚…咕…哈啊啊……哈…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1066',
        any: [
          /PRINTFORMW 一邊這麽説著一邊發出妖艷的呻吟、果然還不是很坦率呢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1068',
        any: [/PRINTFORMW 「不要…不要看啊…太難爲情了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1069',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地低下頭、持續著自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1071',
        any: [/CFLAG:304 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1073',
        any: [/ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1075',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1076',
        any: [/PRINTFORMW 「嗯…呼…啊…這、這樣就可以了嗎？…欸、不、不行…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1077',
        any: [/PRINTFORMW %SAVESTR:TARGET%敷衍地動著手指………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1079',
        any: [/PRINTFORMW 「嗯…哈…手指好累啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1080',
        any: [/PRINTFORMW %SAVESTR:TARGET%慢慢地用手指勾勒著陰唇的樣子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1082',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1091',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1093',
        any: [/IF CFLAG:306 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1095',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1097',
        any: [/IF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1099',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1100',
        any: [
          /PRINTFORMW 「呐…喝吧…再多喝一點♪ 我的牛奶…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1101',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1104',
        any: [
          /PRINTFORMW 「呐…喝吧…再多喝一點♪ 我的牛奶…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1105',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1110',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1111',
        any: [/PRINTFORMW 「夠、夠了啊…不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1112',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住悲鳴不已的%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1115',
        any: [/PRINTFORMW 「怎麽這樣…發出這樣的聲音…不要…啊…啊嗚嗚！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1116',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%吸住悲鳴不已的%SAVESTR:TARGET%的乳頭、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1121',
        any: [/IF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1123',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1124',
        any: [
          /PRINTFORMW 「欸嘿嘿…胸部比姐姐的都要大了…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1125',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%出神地眯著眼睛吐著氣。嘴裏微微漏出了撒嬌的聲音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1128',
        any: [
          /PRINTFORMW 「我的胸部摸著開心嗎？…呀、啊…哈嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1129',
        any: [
          /PRINTFORMW 看著這可愛的反應還真是一件十分快樂的事呢、%SAVESTR:PLAYER%暗地裏笑著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1134',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1135',
        any: [/PRINTFORMW 「這樣的事…因爲…胸很大就…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1136',
        any: [
          /PRINTFORMW 被揉著和幼小的身體毫不相稱的巨乳的%SAVESTR:TARGET%發出了痛苦的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1139',
        any: [/PRINTFORMW 「摸的手法…就像個色狼大叔一樣…呀啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1140',
        any: [/PRINTFORMW 「像、像那個樣子摸的話…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1144',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1149',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1151',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1153',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1154',
        any: [
          /PRINTFORMW 「啊嗯…都是主人的原因…變得能出牛奶了呢…啊嗚…請再多喝一點…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1155',
        any: [
          /PRINTFORMW 「啊~%UNICODE\(0x2661\) \*1% 啊~%UNICODE\(0x2661\) \*1% 牛奶出來了好舒服%UNICODE\(0x2661\) \*1%…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1156',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%臉上浮現出不似少女的淫靡表情、溫柔地抱著%SAVESTR:PLAYER%的頭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1157',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1160',
        any: [
          /PRINTFORMW 「嗯嘻…嗯%UNICODE\(0x2661\) \*1% 像那樣一直吸著乳頭的話…牛奶要出來了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1161',
        any: [
          /PRINTFORMW 「如果被那樣吸的話…胸部會變大的啦%UNICODE\(0x2661\) \*1% 快、快放过我吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1162',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%臉上浮現出不似少女的淫靡表情、溫柔地抱著%SAVESTR:PLAYER%的頭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1163',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%吸住%SAVESTR:TARGET%的乳頭、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1165',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1167',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1169',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1170',
        any: [
          /PRINTFORMW 「呐…喝吧…再多喝一點♪ 我的牛奶…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1171',
        any: [
          /PRINTFORMW 「啊嗯…就像個大寶寶一樣…好可愛…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1172',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1175',
        any: [
          /PRINTFORMW 「啊哈…那樣吸我的…喝吧…再多喝一點♪ 我的牛奶……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1176',
        any: [/PRINTFORMW 「更加…更加咕嘟咕嘟的吸吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1177',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%吸住%SAVESTR:TARGET%的乳頭、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1179',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1181',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1183',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1184',
        any: [/PRINTFORMW 「啊 …真是的…像個小寶寶一樣…啊…啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1185',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳頭高高勃起、每次吸的時候都能讓%SAVESTR:TARGET%發出一陣喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1186',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1189',
        any: [/PRINTFORMW 「啊啊…不行的啦…被這麽吸的話…牛奶又要出來了啦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1190',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳頭高高勃起、每次吸的時候都能讓%SAVESTR:TARGET%發出一陣喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1191',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%吸住%SAVESTR:TARGET%的乳頭、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1193',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1195',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1197',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1198',
        any: [
          /PRINTFORMW 「嗚咕…想吸牛奶什麽的…我的胸部很大什麽的…啊…啊嗚！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1199',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住悲鳴不已的%SAVESTR:TARGET%那大而膨脹的乳房、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1202',
        any: [/PRINTFORMW 「不、不可以喲…這樣的…魔王大人你不能這樣做喲…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1203',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%吸住悲鳴不已的%SAVESTR:TARGET%的乳頭、咕嘟咕嘟地喝光了母乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1205',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1209',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1211',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1212',
        any: [
          /PRINTFORMW 「果然很喜歡大胸呢%UNICODE\(0x2661\) \*1%比姐姐的還要大呢…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1214',
        any: [
          /PRINTFORMW 「這麽大的話…走路都會很辛苦呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1215',
        any: [
          /PRINTFORMW 手指陷入了%SAVESTR:TARGET%的巨乳里、少女舒服地眯起了眼睛。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1216',
        any: [
          /PRINTFORMW 「啊…老是…摸胸部…但是主人想做什麽都可以喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1217',
        any: [/PRINTFORMW 浮現出不似少女的淫靡表情、接受著愛撫。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1218',
        any: [
          /PRINTFORMW 「因爲…被主人摸著胸部…已經沒法思考了啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1220',
        any: [
          /PRINTFORMW 「真是的啊%UNICODE\(0x2661\) \*1% 這樣拉乳頭環的話%UNICODE\(0x2661\) \*1% 乳頭會裂開的啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1223',
        any: [
          /PRINTFORMW 「啊…嗯…我的貧乳…也很有魅力嗎？…呼呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1224',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%多次點頭、來回撫摸著%SAVESTR:TARGET%的胸部。%SAVESTR:TARGET%惡作劇似地笑著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1225',
        any: [
          /PRINTFORMW 「騙人…明明是大的比較好%UNICODE\(0x2661\) \*1%…呀啊…乳、乳頭不可以%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1226',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%擰著少女的乳頭慢慢地摩擦著、近乎疼痛的刺激讓少女的身體反弓了起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1227',
        any: [
          /PRINTFORMW 「啊啊啊…胸部好舒服…好喜歡被摸啊%UNICODE\(0x2661\) \*1% 再更多地摸摸啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1229',
        any: [
          /PRINTFORMW 「真是的啊%UNICODE\(0x2661\) \*1% 這樣拉乳頭環的話%UNICODE\(0x2661\) \*1% 乳頭會裂開的啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1231',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1233',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1235',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1236',
        any: [
          /PRINTFORMW 「欸嘿嘿…胸部比姐姐的都要大了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1237',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%出神地眯著眼睛吐著氣、嘴裏微微漏出了撒嬌的聲音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1238',
        any: [
          /PRINTFORMW 「你們男人還真是喜歡胸部呢…總覺得我好像明白原因呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1239',
        any: [
          /PRINTFORMW 「啊…啊嗯%UNICODE\(0x2661\) \*1% 再來欺負胸部啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1241',
        any: [
          /PRINTFORMW 「呀啊、乳頭環被拉了的話胸部要變得放蕩了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1244',
        any: [
          /PRINTFORMW 「我的胸部…雖然小、但是是主人專用的喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1245',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%仔細地愛撫著整個胸部、漏出激動的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1246',
        any: [
          /PRINTFORMW 「啊啊啊…胸部…就是爲了被摸而存在的呢…主人你是這樣教我的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1247',
        any: [/PRINTFORMW 「再來…再來欺負胸部啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1249',
        any: [
          /PRINTFORMW 「呀啊、乳頭環被拉…好喜歡…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1251',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1253',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1255',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1256',
        any: [/PRINTFORMW 「啊…啊…嗯…哈…啊啊啊………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1257',
        any: [
          /PRINTFORMW 被愛撫著的%SAVESTR:TARGET%出神地眯起眼睛、漸漸習慣起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1258',
        any: [/PRINTFORMW 「嗚、嗯…如果溫柔一點的話…就、就不要緊………嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1261',
        any: [/PRINTFORMW 「啊…我的胸部摸著開心嗎…？…啊、嗯嗯嗚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1262',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%感受到了快感、漸漸鼓脹起來的乳頭變得更加突出了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1263',
        any: [/PRINTFORMW 「呐、呐…來、來玩弄乳頭嘛！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1265',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1267',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1269',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1270',
        any: [/PRINTFORMW 「啊…咕…嗯啊啊…不要…不要像那個樣子抓住乳房啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1271',
        any: [
          /PRINTFORMW 被揉著和身體不相稱的巨乳的%SAVESTR:TARGET%發出了尖叫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1272',
        any: [/PRINTFORMW 「要、要裂開了嗚嗚嗚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1275',
        any: [
          /PRINTFORMW 「我、我的胸部才沒有被摸出感覺呢！…我也知道她們很小啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1276',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭動著身體想要逃開愛撫………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1278',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1288',
        any: [/IF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1290',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1292',
        any: [
          /IF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1293',
        any: [/PRINTFORMW 「嗯…嗯呒…嗯嗯…嗯…啊哈…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1294',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%雙唇緊貼、舌頭如飢似渴地糾纏著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1295',
        any: [
          /PRINTFORMW 「哈…哈…呣呒%UNICODE\(0x2661\) \*1% 哈…哈…啊啊…kiss…好舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1296',
        any: [
          /PRINTFORMW 少女喘著氣向後稍稍拉開了距離、兩人的嘴間牽起了一根唾液構成的絲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1297',
        any: [
          /PRINTFORMW 「雖然和主人做過很多H的事…但是…這樣的接吻還是第一次呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1299',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1300',
        any: [
          /PRINTFORMW 「啊，亲吻吗，嗯%UNICODE\(0x2661\) \*1%请让我自己来好么，因为……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1301',
        any: [/PRINTFORMW 「这是……人家的第一次初吻呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1302',
        any: [/PRINTFORMW  玛奥眼睛湿润了看着你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1303',
        any: [
          /PRINTFORMW 「明明主人很坏心眼地对人家做了许多很过分的事情，却给人家留下了最后的一点少女的纯洁呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1304',
        any: [
          /PRINTFORMW 「人家确实是小孩子，不太懂得爱上别人什么的……但是……遇上您真是太好了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1305',
        any: [/PRINTFORMW 「把第一次的kiss留给心爱的人，是少女的梦想……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1306',
        any: [
          /PRINTFORMW  少女説著那樣的話，羞怯的闭上眼睛，轻轻在你的嘴唇上啄了一下，「……现在梦想实现了哦，诶嘿嘿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1307',
        any: [/PRINTFORMW  在你面前的少女，带着满足的笑意。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1308',
        any: [
          /PRINTFORMW  你第一次发现，她一直蕴含在内心深处的那份纯真和柔情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1309',
        any: [/PRINTFORMW  好像被触动了内心的某种东西，你深深的吻了上去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1312',
        any: [/PRINTFORMW 「嗯咕…嗯…不、不要…！放開我………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1313',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用力推開%SAVESTR:PLAYER%、用袖口擦著嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1314',
        any: [/PRINTFORMW 「我、我的第一次…明明是第一次！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1316',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1319',
        any: [/ELSEIF CFLAG:307 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1321',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1322',
        any: [/PRINTFORMW 「嗯…嗯呒…嗯嗯…嗯…啊哈…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1323',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%雙唇緊貼、舌頭如飢似渴地糾纏著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1324',
        any: [
          /PRINTFORMW 「哈…哈…呣呒%UNICODE\(0x2661\) \*1% 哈…哈…啊啊…kiss…好舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1325',
        any: [
          /PRINTFORMW 少女喘著氣向後稍稍拉開了距離、兩人的嘴間牽起了一根唾液構成的絲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1326',
        any: [/PRINTFORMW 「主人的kiss…好舒服………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1328',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1329',
        any: [
          /PRINTFORMW 「嗯…啾…啾%UNICODE\(0x2661\) \*1% 再來…啾啾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%雖然笨拙但很熱情地和%SAVESTR:PLAYER%反復接吻著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1331',
        any: [/PRINTFORMW 「想要更多地接吻嘛………主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1332',
        any: [/PRINTFORMW 少女説著那樣的話、再次撒著嬌開始了接吻………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1335',
        any: [/PRINTFORMW 「嗯咕…嗯…不、不要…！放開我………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1336',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用力推開%SAVESTR:PLAYER%、用袖口擦著嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1338',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1343',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1344',
        any: [/PRINTFORMW 「嗯…嗯呒…嗯嗯…嗯…啊哈…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1345',
        any: [/PRINTFORMW %SAVESTR:TARGET%的舌頭如飢似渴地糾纏著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1346',
        any: [
          /PRINTFORMW 「嗯呒%UNICODE\(0x2661\) \*1% 啾嗚嗚%UNICODE\(0x2661\) \*1% …嗯呒%UNICODE\(0x2661\) \*1% 哈…哈…啊啊…更多地接吻…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1347',
        any: [
          /PRINTFORMW 少女喘著氣向後稍稍拉開了距離、兩人的嘴間牽起了一根唾液構成的絲。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1348',
        any: [
          /PRINTFORMW 「想要和主人更多地…接吻喲………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1349',
        any: [/CFLAG:307 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1351',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1352',
        any: [
          /PRINTFORMW 「嗯…啾…啾%UNICODE\(0x2661\) \*1% 更多地…kiss…啾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1353',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%和%SAVESTR:PLAYER%反復接吻著、由於興奮舌頭粘乎乎地糾纏在一起。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1354',
        any: [
          /PRINTFORMW 「啾…啾…啾嗚%UNICODE\(0x2661\) \*1%…已經沒法思考了嗚…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1355',
        any: [
          /PRINTFORMW 少女臉上露出與年齡不相稱的迷醉表情沉浸在接吻帶來的快感里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1356',
        any: [/CFLAG:307 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1358',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1359',
        any: [/PRINTFORMW 「接、接吻不算什麽啦…喏…按你喜歡的做就…嗯…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1360',
        any: [/PRINTFORMW %SAVESTR:TARGET%好像已經習慣了變得老實了一點。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1361',
        any: [/PRINTFORMW 「嗯…哈…嗯咕…啾…啾…啊啊………啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1362',
        any: [/CFLAG:307 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1364',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1365',
        any: [/PRINTFORMW 「不想…和你接吻…嗯！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1366',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%强行把%SAVESTR:TARGET%的下巴掰向自己、貪圖著圓潤的嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1367',
        any: [/PRINTFORMW 「嗯咕…嗯…嗯…嗯…嗚嗚嗚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1368',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1377',
        any: [/IF SELECTCOM == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1379',
        any: [/IF CFLAG:308 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1381',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1382',
        any: [
          /PRINTFORMW 「啊啊～…连小穴的里面…都是主人的所有物哟～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1383',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出火热的叹息声一边用手指大大地撑开私处…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1385',
        any: [
          /PRINTFORMW 「讨厌…再这样张下去处女膜都要被看见了…快点夺走我的处女吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1387',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1388',
        any: [
          /PRINTFORMW 「唔嗯～…主人想看的话…无论何时都会向您展示的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1389',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边爽朗地着一边用手指撑开了私处…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1391',
        any: [
          /PRINTFORMW 「啊啊…明明想被主人拿走处女的…好害羞………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1394',
        any: [/PRINTFORMW 「做、做这种事到底有什么好高兴的～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1395',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边背过通红的脸蛋、一边战战兢兢的用手指撑开私处………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1397',
        any: [/CFLAG:TARGET:308 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1402',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1403',
        any: [
          /PRINTFORMW 「小、小穴…想要肉棒…不要衹是看著呀…我已經不能忍耐了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1404',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊漏出熾熱的喘息一邊用手指撥開了小穴…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1406',
        any: [
          /PRINTFORMW 「啊啊…就這樣推倒我嘛%UNICODE\(0x2661\) \*1%奪走我的處女啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1407',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1409',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1410',
        any: [
          /PRINTFORMW 「主人…看嘛…看嘛…%UNICODE\(0x2661\) \*1% 裏面都能看到嗎…全部都是主人的東西喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1411',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊明媚地笑著一邊用手指撥開了小穴…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1413',
        any: [
          /PRINTFORMW 「啊啊…想要主人來奪走我的處女嘛………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1414',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1416',
        any: [/ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1417',
        any: [/PRINTFORMW 「這、張揚看上去好像…一、一個変態…変態啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1418',
        any: [/PRINTFORMW %SAVESTR:TARGET%一邊咒駡著一邊用手指撥開了小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1419',
        any: [/PRINTFORMW 「想看的話就看吧、來吧…更…更多地………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1420',
        any: [/PRINTFORMW 愛液漸漸從她的小穴里溢出來了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1421',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1423',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1424',
        any: [/PRINTFORMW 「不、不要、這種事才不要…爲什麽…這樣的…嗚嗚」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1425',
        any: [/PRINTFORMW %SAVESTR:TARGET%一邊哭著鼻子一邊撥開了小穴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1426',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1435',
        any: [/IF SELECTCOM == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1437',
        any: [/IF CFLAG:TARGET:309 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1439',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1440',
        any: [
          /PRINTFORMW 「主人的手指…進來了…啊…啊啊…更加…把裏面弄得更加咕啾咕啾的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1442',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1443',
        any: [
          /PRINTFORMW 「主人的手指…進來了啊…請再伸進去一點啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1446',
        any: [/PRINTFORMW 「嘻…咿、不要…太勉强了…不要再伸進去了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1448',
        any: [/CFLAG:TARGET:309 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1453',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1454',
        any: [
          /PRINTFORMW 「主人的手指…好舒服啊%UNICODE\(0x2661\) \*1% 把裏面弄得咕啾咕啾的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1455',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%配合著手指的動作擺動著腰、貪享著快樂………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1456',
        any: [/CFLAG:309 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1458',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1459',
        any: [
          /PRINTFORMW 「不、不要緊的啦…主人的手指的話…無論做什麽都是可以的啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1460',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%隨著手指的動作不時綳直腰部、發出銷魂的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1461',
        any: [/CFLAG:309 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1463',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1464',
        any: [
          /PRINTFORMW 「主人的手指…請更…溫柔一點%UNICODE\(0x2661\) \*1% 進、進到…裏面了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像是因爲承受著手指插入帶來的不適感、腰不停地發抖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1466',
        any: [/CFLAG:309 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1468',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1469',
        any: [/PRINTFORMW 「我、我會聽話的…請溫柔一點！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1470',
        any: [/CFLAG:309 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1472',
        any: [/ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1473',
        any: [/PRINTFORMW 「這、這樣的…不行啊…太勉強了…啊、啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1474',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1483',
        any: [/IF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1485',
        any: [/IF CFLAG:310 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1487',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1488',
        any: [
          /PRINTFORMW 「呀啊…主人的舌頭…熱熱…的…再多舔舔啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1490',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1491',
        any: [
          /PRINTFORMW 「咿呀…不、不行喲、主人你舔了那種地方的話…啊啊~好害羞！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1494',
        any: [/PRINTFORMW 「變、變態…你在舔哪裏啊！快住手！真是惡心！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1496',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1501',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1502',
        any: [
          /PRINTFORMW 「呀啊…更多地舔我的肛門啊…每一條皺褶都好好地舔一舔喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1503',
        any: [/PRINTFORMW %SAVESTR:TARGET%那不檢點的嘴不停喘息著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1504',
        any: [
          /PRINTFORMW 「呼…啊嗯…啊啊%UNICODE\(0x2661\) \*1% …呀啊啊好舒服%UNICODE\(0x2661\) \*1% 好舒服喲%UNICODE\(0x2661\) \*1% 喜歡%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1505',
        any: [/PRINTFORMW 少女的肛門無論被怎麽樣對待應該都能承受下來吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1506',
        any: [/CFLAG:310 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1508',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1509',
        any: [
          /PRINTFORMW 「被舌頭舔著好舒服…主人的舌頭…啊啊%UNICODE\(0x2661\) \*1% 把舌頭伸進去…舔更深的地方啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1510',
        any: [/PRINTFORMW %SAVESTR:TARGET%每次被舔肛門都會發出粗重的喘息。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1511',
        any: [/PRINTFORMW 每一條皺褶都被精心舔著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1512',
        any: [/CFLAG:310 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1514',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1515',
        any: [
          /PRINTFORMW 「呀啊…更多…再來更多地舔我的肛門啊…屁股裏面都已經黏乎乎的了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1516',
        any: [/PRINTFORMW %SAVESTR:TARGET%那不檢點的嘴不停喘息著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1517',
        any: [/PRINTFORMW 少女沉浸在肛門的快樂中、尋求著新的刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1518',
        any: [/CFLAG:310 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1520',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1521',
        any: [/PRINTFORMW 「不行喲、主人你舔了那種地方的話…啊啊~好害羞！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1522',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%害羞地緊閉雙眼、忍受著肛門那傳來的奇特感覺………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1523',
        any: [/CFLAG:310 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1525',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1526',
        any: [/PRINTFORMW 「咕…嗚嗚…不、不要舔的那麽投入啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1527',
        any: [/CFLAG:310 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1529',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1530',
        any: [/PRINTFORMW 「變、變態…住、住手啦…快住手！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1531',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1540',
        any: [/IF SELECTCOM == 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1542',
        any: [/IF CFLAG:TARGET:311 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1544',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1545',
        any: [
          /PRINTFORMW 「再…用點力…連這種色色的道具都有…魔族好厲害%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1547',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1548',
        any: [
          /PRINTFORMW 「這、這樣的…好、好厲害啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1551',
        any: [/PRINTFORMW 「不、不要啊…那種震動…不、不行、好害怕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1553',
        any: [/CFLAG:TARGET:311 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1558',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1559',
        any: [
          /PRINTFORMW 「啊哈…哈、哈嗯%UNICODE\(0x2661\) \*1% 請更多地欺負陰蒂啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1560',
        any: [/PRINTFORMW %SAVESTR:TARGET%反弓起腰、想要更好地品味這快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1561',
        any: [/CFLAG:311 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1563',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1564',
        any: [
          /PRINTFORMW 「呀啊%UNICODE\(0x2661\) \*1% 這個、好舒服好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1565',
        any: [/PRINTFORMW %SAVESTR:TARGET%一臉高潮的表情持續承受著刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1566',
        any: [/CFLAG:311 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1568',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1569',
        any: [
          /PRINTFORMW 「嗚啊…啊…啊啊………不、不要再欺負我了…啊…嗯咕%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1570',
        any: [/PRINTFORMW %SAVESTR:TARGET%咬緊牙關承受著快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1571',
        any: [/CFLAG:311 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1573',
        any: [/ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1574',
        any: [/PRINTFORMW 「咕…嗚嗚…呀…呀啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1575',
        any: [/PRINTFORMW %SAVESTR:TARGET%好像還不能理解這未知的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1576',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1586',
        any: [/IF SELECTCOM == 11 && TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1588',
        any: [/IF CFLAG:TARGET:312 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1590',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1592',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1593',
        any: [
          /PRINTFORMW 「啊…啊啊啊…不是處女了啊…被蟲子破處了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1595',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1596',
        any: [/PRINTFORMW 「笨蛋…笨蛋…再溫柔一點啊…這樣的…好討厭………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1599',
        any: [/PRINTFORMW 「不要…不要啊…這、這樣的…被這樣對待什麽的…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1604',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1605',
        any: [
          /PRINTFORMW 「不、不要…就這樣進到我的小穴里來了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1607',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1608',
        any: [
          /PRINTFORMW 「不要…這、這個孩子…在裏面動著…嗚啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1611',
        any: [/PRINTFORMW 「住、住手啊…那樣的不要放進來啊…咿咿咿呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1614',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1619',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1620',
        any: [
          /PRINTFORMW 「更多地…欺負小穴吧%UNICODE\(0x2661\) \*1%…把小穴弄得一塌糊塗吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1621',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%配合著蟲子的蠕動扭動著腰、跳著淫穢的舞蹈………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1622',
        any: [/CFLAG:312 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1624',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1625',
        any: [
          /PRINTFORMW 「啊啊哈嗯%UNICODE\(0x2661\) \*1%動著…在裏面…動著呢！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1626',
        any: [
          /PRINTFORMW 蟲子每次動的時候%SAVESTR:TARGET%都扭動著身體發出快感的悲鳴。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1627',
        any: [/CFLAG:312 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1629',
        any: [/ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1630',
        any: [
          /PRINTFORMW 「啊…啊啊…滿滿的…啊、好舒服…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1631',
        any: [/PRINTFORMW 已經習慣了的%SAVESTR:TARGET%發出甜美的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1632',
        any: [/CFLAG:312 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1634',
        any: [/ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1635',
        any: [/PRINTFORMW 「不要…全都進來了…討厭…這樣的好討厭………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1636',
        any: [/PRINTFORMW 蟲子不停地鑽進少女的陰道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1637',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1642',
        any: [/ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1644',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1645',
        any: [/PRINTFORMW 「哈…啊、啊啊嗯………出來了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1646',
        any: [
          /PRINTFORMW 「下次啊…請賜給我主人的肉棒吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1647',
        any: [/CFLAG:372 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1649',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1650',
        any: [/PRINTFORMW 「啊啊…好、好難受…不要這麽欺負我啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1651',
        any: [/PRINTFORMW 這樣說這的少女將熾熱的誓言轉向了蟲子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1652',
        any: [/CFLAG:372 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1654',
        any: [/ELSEIF ABL:2 >= 3 && \(CFLAG:372 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1655',
        any: [/PRINTFORMW 「哈…啊、啊啊嗯………出來了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1656',
        any: [/CFLAG:372 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1658',
        any: [/ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1659',
        any: [/PRINTFORMW 「啊、啊啊…好難受………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1660',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1668',
        any: [/IF SELECTCOM == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1670',
        any: [/IF CFLAG:313 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1672',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1673',
        any: [/PRINTFORMW 「好、好厲害…震動傳過來了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1675',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1676',
        any: [
          /PRINTFORMW 「嗚啊…咿呀酥酥麻麻的…酥酥麻麻的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1679',
        any: [/PRINTFORMW 「呀啊…不、不要啊…那、那種酥麻感！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1681',
        any: [/CFLAG:313 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1686',
        any: [/IF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1687',
        any: [
          /PRINTFORMW 「好、好厲害…震動傳過來了%UNICODE\(0x2661\) \*1% 震動再强烈一些啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1688',
        any: [
          /PRINTFORMW 「整個人…都要變得奇怪了啦%UNICODE\(0x2661\) \*1% 啊咿%UNICODE\(0x2661\) \*1% 咿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1689',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被震動棒徹底地按摩著股間、淌著口水沉浸在快感之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1690',
        any: [/CFLAG:313 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1692',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1693',
        any: [
          /PRINTFORMW 「嗚啊…呀啊%UNICODE\(0x2661\) \*1%啊！嗯！酥酥麻麻的…酥酥麻麻的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1694',
        any: [/PRINTFORMW %SAVESTR:TARGET%用力把按摩棒壓在股間、品味著快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1695',
        any: [/CFLAG:313 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1697',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1698',
        any: [/PRINTFORMW 「咕…嗚…啊啊…哈啊啊…不、不行…不要那樣壓上來啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1699',
        any: [
          /PRINTFORMW 每次被壓上按摩棒的時候、%SAVESTR:TARGET%的聲音都漸漸變得甘甜起來………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1700',
        any: [/CFLAG:313 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1702',
        any: [/ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1703',
        any: [/PRINTFORMW 「呀啊…不、不要啊…那、那種酥麻感！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1704',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1714',
        any: [/IF SELECTCOM == 13 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1716',
        any: [/IF CFLAG:TARGET:314 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1718',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1719',
        any: [
          /PRINTFORMW 「啊…蟲子…咿…進到…肚子里來了…被弄得黏乎乎的了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1721',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1722',
        any: [
          /PRINTFORMW 「啊哈…啊…啊啊%UNICODE\(0x2661\) \*1% 肛門被擴張了…擴張了嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1724',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1725',
        any: [
          /PRINTFORMW 「咿呀…啊啊…蟲子在裏面…哈…嘻咿…要、要變得奇怪了嗚…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1727',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1728',
        any: [
          /PRINTFORMW 「那、那樣的…嗯、不行的啦…啊啊…啊…屁股會壞掉的…請放過我吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1731',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1732',
        any: [/PRINTFORMW 「不、不要啊！不要把那種東西放進來啊！放過我啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1733',
        any: [
          /PRINTFORMW 與話語不同的是很輕易地就把蟲子塞進了被調教后的%SAVESTR:TARGET%的肛門里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1735',
        any: [/PRINTFORMW 「不、不要啊！不要把那種東西放進來啊！放過我啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1736',
        any: [
          /PRINTFORMW 雖然肛門緊緊地縮了起來、不過蟲子還是毫不留情地鑽了進去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1739',
        any: [/CFLAG:TARGET:314 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1744',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1745',
        any: [/PRINTFORMW 「嗯咿…進到…進到裏面來了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1746',
        any: [
          /PRINTFORMW 肛門蠕蟲一邊發出咕嗞咕嗞的聲音一邊鑽進了%SAVESTR:TARGET%的肛門。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1747',
        any: [
          /PRINTFORMW 「嗯哈…啊啊…屁股小穴好舒服…再來做更多啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1748',
        any: [
          /PRINTFORMW 少女沉浸在肛門的快感之中、放著不管的話多少次都能去吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1749',
        any: [/CFLAG:314 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1751',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1752',
        any: [
          /PRINTFORMW 「呀嗚%UNICODE\(0x2661\) \*1%…肛門…啊啊…在被蟲子侵犯著啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1753',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛門已經很習慣被塞進蟲子了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1754',
        any: [
          /PRINTFORMW 「咿呀%UNICODE\(0x2661\) \*1% 咿呀%UNICODE\(0x2661\) \*1% 咿呀%UNICODE\(0x2661\) \*1%…太鬧騰了…啊啊…不…不行%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1755',
        any: [
          /PRINTFORMW 肛門蠕蟲蠕動的時候帶來的快感讓少女的腰不停地上下起伏………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1756',
        any: [/CFLAG:314 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1758',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1759',
        any: [/PRINTFORMW 「啊哈啊…蟲子進來了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1760',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰微微顫抖著、享受著蟲子帶來的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1761',
        any: [
          /PRINTFORMW 「嗚…酥酥麻麻的…的嗚…屁股…要、要變得奇怪了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1762',
        any: [/CFLAG:314 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1764',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1765',
        any: [
          /PRINTFORMW 「呀嗚%UNICODE\(0x2661\) \*1%…屁股…裏面…全部全部…都在被蟲子侵犯著%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1766',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被擴張到極限的肛門已經非常習慣吞進蟲子了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1767',
        any: [
          /PRINTFORMW 「已…已經…衹要有屁股就可以了%UNICODE\(0x2661\) \*1%…衹要有屁股就可以了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1768',
        any: [
          /PRINTFORMW 肛門蠕蟲蠕動的時候帶來的快感讓少女的腰不停地上下起伏………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1769',
        any: [/CFLAG:314 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1771',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1772',
        any: [
          /PRINTFORMW 「啊啊…蟲子在裏面動著啊…不、不要…不、不要動啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1773',
        any: [/PRINTFORMW %SAVESTR:TARGET%帶著一臉快要去了的表情品味著快感。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1774',
        any: [
          /PRINTFORMW 「哈啊啊…屁股那裏的…感覺傳過來了好可怕…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1775',
        any: [/PRINTFORMW 「主人啊…已、已經可以放過我了吧………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1776',
        any: [/CFLAG:314 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1778',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1779',
        any: [
          /PRINTFORMW 「沒、沒關係…不是很害怕啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1780',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%雖然很緊張、還是把蟲子全部嚥進了肛門。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1781',
        any: [/PRINTFORMW 「咕…咿…咿…咿嗯…啊啊…咕、咕嚕嗚」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1782',
        any: [/CFLAG:314 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1784',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1785',
        any: [/PRINTFORMW 「不要…不要啊…蟲子什麽的不要放進來啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1786',
        any: [
          /PRINTFORMW 由於已經被調教了好多次、%SAVESTR:TARGET%的肛門很輕易就嚥下了蟲子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1787',
        any: [/PRINTFORMW 「這、這樣的…不要、不要啊…不、不想…體驗啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1788',
        any: [/CFLAG:314 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1790',
        any: [/ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1791',
        any: [/PRINTFORMW 「這、這樣的…一點…都不舒服啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1792',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1797',
        any: [/ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1799',
        any: [
          /IF TALENT:TARGET:77 == 1 && TALENT:TARGET:76 == 1 && \(CFLAG:374 < 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1800',
        any: [
          /PRINTFORMW 「哈嗚嗚%UNICODE\(0x2661\) \*1%…下次…想要肉棒啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1801',
        any: [/CFLAG:374 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1803',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1804',
        any: [
          /PRINTFORMW 「啊哈…屁股被擴張開來回不去了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1805',
        any: [/CFLAG:374 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1807',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1808',
        any: [
          /PRINTFORMW 「更多…更加欺負…再來侵犯屁股小穴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1809',
        any: [/CFLAG:374 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1811',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1812',
        any: [
          /PRINTFORMW 「呼啊啊…更加地…玩弄也可以喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1813',
        any: [/CFLAG:374 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1815',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1816',
        any: [
          /PRINTFORMW 「哈…哈…啊嗯%UNICODE\(0x2661\) \*1% 一、一點都不舒服啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1817',
        any: [/CFLAG:374 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1819',
        any: [/ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1820',
        any: [/PRINTFORMW 「哈…哈…屁股…屁股被擴張開來回不去了嗚………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1821',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1830',
        any: [/IF SELECTCOM == 14 && TEQUIP:14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1832',
        any: [/IF CFLAG:315 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1834',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1835',
        any: [
          /PRINTFORMW 「啊、嘻呀…這、這個…好厲害……陰蒂酥酥麻麻的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1836',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因爲陰蒂受到了强烈的刺激發出了喜悅的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1838',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1839',
        any: [
          /PRINTFORMW 「啊啊啊…再溫柔一些…就好了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1840',
        any: [/PRINTFORMW %SAVESTR:TARGET%爲著陰蒂上未知的快感感到不知所措………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1843',
        any: [/PRINTFORMW 「咕…不、不可以…這、這樣的…嘻！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1844',
        any: [
          /PRINTFORMW 夾子緊緊地夾住陰蒂施加著持續的刺激、%SAVESTR:TARGET%嘗試著徒勞的反抗………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1846',
        any: [/CFLAG:315 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1851',
        any: [/IF TALENT:76 == 1 && \(CFLAG:315 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1852',
        any: [
          /PRINTFORMW 「啊…嗯嗯…啊哈…可以…欺負陰蒂喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1853',
        any: [/PRINTFORMW 「顫動著…好舒服%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1854',
        any: [/CFLAG:315 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1856',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:315 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1857',
        any: [
          /PRINTFORMW 「這、這種刺激才不會去呢…主人的手指更加舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1858',
        any: [/PRINTFORMW 「啊啊放過我吧…放過我吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1859',
        any: [/CFLAG:315 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1861',
        any: [/ELSEIF CFLAG:315 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1862',
        any: [/PRINTFORMW 「咕…嗚啊…哈…哈嗯…不要啊…不要做這種事啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1863',
        any: [
          /PRINTFORMW 夾子緊緊地夾住陰蒂施加著持續的刺激、%SAVESTR:TARGET%嘗試著徒勞的反抗………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1864',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1869',
        any: [/ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1871',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:375 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1872',
        any: [
          /PRINTFORMW 「呀啊…喜、喜歡這個…喜歡這種舒服的感覺………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1873',
        any: [/CFLAG:375 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1875',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:375 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1876',
        any: [/PRINTFORMW 「這次…主人…做的很好哦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1877',
        any: [/CFLAG:375 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1879',
        any: [/ELSEIF CFLAG:375 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1880',
        any: [/PRINTFORMW 「啊、嗚嗚…啊啊…真、真是的…放過…我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1881',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1890',
        any: [/IF SELECTCOM == 15 && TEQUIP:15/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1892',
        any: [/IF CFLAG:316 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1894',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1896',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1897',
        any: [/PRINTFORMW 「嘻呀…胸部在被欺負著…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1898',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊搖晃著那對沉重的乳房一邊享受著乳頭傳來的快感………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1900',
        any: [
          /PRINTFORMW 「不要…雖然很舒服…但是乳頭要被拉長了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1903',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1905',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1906',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1907',
        any: [
          /PRINTFORMW 「啊嗯…呀…呀啊…胸部…搖晃著…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1908',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊發出粗重的喘息一邊搖晃著那對沉重的乳房………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1910',
        any: [
          /PRINTFORMW 「乳、乳頭…太刺激了啊…啊、啊啊…哈…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1915',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1916',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1917',
        any: [/PRINTFORMW 「胸部…好重…啊啊…不要…不要再這樣玩弄乳頭了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1918',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%爲著乳頭受到的快感顫抖著、搖晃著和身體不相稱的巨乳………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1920',
        any: [/PRINTFORMW 「呀嗚…不要…被這樣對待…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1923',
        any: [/CFLAG:316 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1928',
        any: [/IF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1930',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1931',
        any: [
          /PRINTFORMW 「啊…乳頭被欺負著…好舒服…更多…還要%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1932',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊搖晃著和身體不相稱的巨乳一邊發出快樂的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1933',
        any: [/PRINTFORMW 「咿嘻…胸部也…請用力的揉吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1935',
        any: [
          /PRINTFORMW 「啊…被、被那樣緊緊地夾住了…太刺激了啦…啊…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1936',
        any: [/PRINTFORMW %SAVESTR:TARGET%一邊淌著口水一邊體味著快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1938',
        any: [/CFLAG:316 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1940',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:316 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1942',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1943',
        any: [
          /PRINTFORMW 「啊嗯…呀…呀啊…胸部…搖晃著…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1944',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不能承受乳頭的刺激、搖晃著那和身體不相稱的巨乳喘息著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1945',
        any: [/PRINTFORMW 「嗯嗯…好害羞…不要看啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1947',
        any: [
          /PRINTFORMW 「啊啊…啊啊~%UNICODE\(0x2661\) \*1% 啊啊~%UNICODE\(0x2661\) \*1% 好舒服…好舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1948',
        any: [/PRINTFORMW %SAVESTR:TARGET%的乳頭受到了強烈的刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1950',
        any: [/CFLAG:316 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1952',
        any: [/ELSEIF CFLAG:316 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1954',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1955',
        any: [/PRINTFORMW 「不要啊啊…這樣的…住、住手啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1956',
        any: [/PRINTFORMW %SAVESTR:TARGET%震顫著和身體不相稱的巨乳………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1958',
        any: [/PRINTFORMW 「咕…嗚嗚嗚…這樣的…也沒什麽了不起的嘛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1959',
        any: [/PRINTFORMW %SAVESTR:TARGET%的臉紅紅的、忍耐著來自乳頭的刺激………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1961',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1966',
        any: [/ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1968',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:376 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1969',
        any: [
          /PRINTFORMW 「咕嗯…下次用主人的手指來欺負乳頭吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1970',
        any: [/CFLAG:376 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1972',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:376 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1973',
        any: [
          /PRINTFORMW 「哈…哈…下次主人來………做吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1974',
        any: [/CFLAG:376 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1976',
        any: [/ELSEIF CFLAG:376 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1977',
        any: [/PRINTFORMW 「哈…哈…嗚嗚…乳頭已經這麽腫了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1978',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1987',
        any: [/IF SELECTCOM == 16 && TEQUIP:16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1989',
        any: [/IF CFLAG:317 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1991',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1993',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1994',
        any: [
          /PRINTFORMW 「啊哈…胸部在被吸…咿呀…嗯%UNICODE\(0x2661\) \*1% 嗯嗚好舒服啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1995',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、呻吟著被榨出了奶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1998',
        any: [
          /PRINTFORMW 「啊嗯…乳汁…全部被吸出來了啊…好舒服…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '1999',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被裝上了榨乳機、呻吟著被榨出了奶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2002',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2004',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2005',
        any: [
          /PRINTFORMW 「咿…呀啊…啊啊…乳汁出來了…出來了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2006',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、被毫不留情地榨著乳汁……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2009',
        any: [/PRINTFORMW 「不行…乳汁是要留給小寶寶的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2010',
        any: [/PRINTFORMW %SAVESTR:TARGET%被裝上了榨乳機、哭喊著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2015',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2016',
        any: [/PRINTFORMW 「我、我…不是乳牛啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2017',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、被毫不留情地榨著乳汁………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2020',
        any: [/PRINTFORMW 「我、我…不是乳牛啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2023',
        any: [/CFLAG:317 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2028',
        any: [/IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2030',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2031',
        any: [
          /PRINTFORMW 「啊哈…胸部在被吸…咿呀…嗯%UNICODE\(0x2661\) \*1% 嗯嗚好舒服啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2032',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、呻吟著被榨出了奶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2035',
        any: [
          /PRINTFORMW 「啊嗯…乳汁…全部被吸出來了啊…好舒服…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳房被裝上了榨乳機、呻吟著被榨出了奶………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2038',
        any: [/CFLAG:317 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2040',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:317 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2042',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2043',
        any: [
          /PRINTFORMW 「咿…呀啊…啊啊…乳汁出來了…出來了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、被毫不留情地榨著乳汁……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2047',
        any: [/PRINTFORMW 「不行…乳汁是要留給小寶寶的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2048',
        any: [/PRINTFORMW %SAVESTR:TARGET%被裝上了榨乳機、哭喊著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2050',
        any: [/CFLAG:317 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2052',
        any: [/ELSEIF CFLAG:317 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2054',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2055',
        any: [/PRINTFORMW 「不要啦…我又不是乳牛………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2056',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被裝上了榨乳機、被毫不留情地榨著乳汁……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2059',
        any: [/PRINTFORMW 「咕嗚………收、收集我的乳汁什麽的…到底在想什麽啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2061',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2066',
        any: [/ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2068',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:377 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2069',
        any: [
          /PRINTFORMW 「啊呀………哈哈…主人把它喝掉嘛…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2070',
        any: [/CFLAG:377 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2072',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:377 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2073',
        any: [/PRINTFORMW 「哈哈………主人把它喝掉的話就再好不過了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2074',
        any: [/CFLAG:377 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2076',
        any: [/ELSEIF CFLAG:377 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2077',
        any: [/PRINTFORMW 「嗚…不要再榨了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2078',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2089',
        any: [/IF SELECTCOM == 17 && TEQUIP:17/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2091',
        any: [/IF CFLAG:318 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2093',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2094',
        any: [
          /PRINTFORMW 「呀啊…飛機杯好舒服%UNICODE\(0x2661\) \*1% 請再多欺負我的肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2096',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2097',
        any: [
          /PRINTFORMW 「請、請溫柔地…摩擦…啊%UNICODE\(0x2661\) \*1%…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2100',
        any: [/PRINTFORMW 「不要…住手啊…那、那種東西…不、不要再讓我高潮了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2102',
        any: [/CFLAG:318 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2107',
        any: [/IF TALENT:76 == 1 && \(CFLAG:318 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2108',
        any: [
          /PRINTFORMW 「想要射精…想要射出好多精液%UNICODE\(0x2661\) \*1% 在飛機杯里…滿滿地中出%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2109',
        any: [/PRINTFORMW %SAVESTR:TARGET%的陰莖上套著飛機杯、前後擺動著腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2110',
        any: [/CFLAG:318 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2112',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:318 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2113',
        any: [
          /PRINTFORMW 「啊啊…主人…請…請再多玩弄我那下流的肉棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2114',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%雖然看上去很害羞、但完全不能抑制想要射精的欲望………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2115',
        any: [/CFLAG:318 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2117',
        any: [/ELSEIF CFLAG:318 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2118',
        any: [
          /PRINTFORMW 「不行…不可以…要是做了這種事的話…啊啊…真的…要不行了啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2119',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%胯間高高挺立的陰莖在飛機杯顫動著、很舒服的樣子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2120',
        any: [/CFLAG:318 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2125',
        any: [/ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2127',
        any: [/IF TALENT:76 == 1 && \(CFLAG:378 <= 32 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2128',
        any: [/PRINTFORMW 「啊嗯…還想射出更多%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2129',
        any: [/CFLAG:378 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2131',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:378 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2132',
        any: [/PRINTFORMW 「啊啊…哈%UNICODE\(0x2661\) \*1%…滿滿地射出了…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2133',
        any: [/CFLAG:378 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2135',
        any: [/ELSEIF CFLAG:378 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2136',
        any: [/PRINTFORMW 「不要…我…射出了那麽多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2137',
        any: [/CFLAG:378 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2146',
        any: [/IF SELECTCOM == 19 && TEQUIP:19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2148',
        any: [/IF CFLAG:TARGET:320 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2150',
        any: [/IF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2151',
        any: [
          /PRINTFORMW 「呀啊！就、就這樣插進來什麽的…太、太棒了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2153',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2154',
        any: [
          /PRINTFORMW 「呣呒…屁、屁股…變得好奇怪…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2156',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2157',
        any: [
          /PRINTFORMW 「啊啊…進來了…屁股…變得…好奇怪%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2160',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2161',
        any: [/PRINTFORMW 「不…不要…不要就那樣插進來啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2162',
        any: [
          /PRINTFORMW 與言語相反的是、很輕鬆地就把拉珠塞進了接受調教的%SAVESTR:TARGET%的肛門里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2164',
        any: [/PRINTFORMW 「不…不要…不要就那樣插進來啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2165',
        any: [
          /PRINTFORMW 雖然%SAVESTR:TARGET%收緊肛門來反抗、拉珠還是毫不留情地塞了進去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2168',
        any: [/CFLAG:TARGET:320 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2173',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2174',
        any: [
          /PRINTFORMW 「啊哈…嘿嘿嘿…%UNICODE\(0x2661\) \*1% 屁股…變得黏乎乎的了…變得…變得更加奇怪了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2175',
        any: [
          /PRINTFORMW 菊穴里塞進了全部肛門拉珠的%SAVESTR:TARGET%露出了不檢點的啊嘿顏。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2176',
        any: [
          /PRINTFORMW 「我的屁股小穴…希望受到各種各樣的欺負呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2177',
        any: [/CFLAG:320 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2179',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2180',
        any: [
          /PRINTFORMW 「呀哈…啊啊…拉珠…全部進來了…啊啊…好舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2181',
        any: [/PRINTFORMW %SAVESTR:TARGET%發出舒服到極點的聲音撒著嬌。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2182',
        any: [
          /PRINTFORMW 「屁…屁股…更加濕嗒嗒的…想要變得更加濕嗒嗒的………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2183',
        any: [/CFLAG:320 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2185',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2186',
        any: [
          /PRINTFORMW 「屁股…雖然覺得很奇怪…總覺得…要覺醒新的癖好了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2187',
        any: [
          /PRINTFORMW 菊穴里塞進了全部肛門拉珠的%SAVESTR:TARGET%左右扭動著可愛的屁股/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2188',
        any: [
          /PRINTFORMW 「欸嘿嘿…請再多懲罰我這個H的寵物吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2189',
        any: [/CFLAG:320 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2191',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2192',
        any: [
          /PRINTFORMW 「啊哈…嘻呀…%UNICODE\(0x2661\) \*1% 屁股…變得黏乎乎的了…變得…變得更加奇怪了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2193',
        any: [
          /PRINTFORMW 菊穴里塞進了全部肛門拉珠的%SAVESTR:TARGET%露出了不檢點的啊嘿顏。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2194',
        any: [
          /PRINTFORMW 「再…再…多欺負…我的屁股小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2195',
        any: [/CFLAG:320 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2197',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2198',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%…呣呒%UNICODE\(0x2661\) \*1%…再…快點也…啊嗯…呀啊…這麽突然啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2199',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像已經習慣了、放鬆的肛門慢慢吞入了肛門拉珠………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2200',
        any: [/CFLAG:320 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2202',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2203',
        any: [
          /PRINTFORMW 「啊啊…進來了…屁股…變得…奇怪了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2204',
        any: [/PRINTFORMW %SAVESTR:TARGET%扭動著屁股、忍受著肛門的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2205',
        any: [/CFLAG:320 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2207',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2208',
        any: [
          /PRINTFORMW 「不、不要…住手…快住手啊…不、不要塞進來啊…明明…啊嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2209',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%所發出的痛苦的叫喊之中也混雜著甜美的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2210',
        any: [/CFLAG:320 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2212',
        any: [/ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2213',
        any: [/PRINTFORMW 「這、這樣的…真的是…好討厭………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2214',
        any: [
          /PRINTFORMW 每插入一顆肛門拉珠、%SAVESTR:TARGET%都會左右扭動屁股來反抗………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2215',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2220',
        any: [/ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2222',
        any: [
          /IF TALENT:TARGET:77 == 1 && TALENT:TARGET:76 == 1 && \(CFLAG:379 < 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2223',
        any: [
          /PRINTFORMW 「咕嘻%UNICODE\(0x2661\) \*1%…把我的屁股小穴弄得更加亂七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2224',
        any: [/CFLAG:379 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2226',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2227',
        any: [
          /PRINTFORMW 「呀啊…好、好厲害喲…這…這個…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2228',
        any: [/CFLAG:379 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2230',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:379 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2231',
        any: [/PRINTFORMW 「啊啊…下次…想要更加大的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2232',
        any: [/CFLAG:379 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2234',
        any: [
          /elseIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2235',
        any: [/PRINTFORMW 「呀啊………好、好舒服…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2236',
        any: [/CFLAG:379 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2238',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2239',
        any: [/PRINTFORMW 「呀哈…啊啊…啊啊啊…這樣的…明明應該討厭的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2240',
        any: [/CFLAG:379 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2242',
        any: [/ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2243',
        any: [/PRINTFORMW 「嗯啊啊…啊啊…啊…屁、屁股…要裂開來了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2244',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2252',
        any: [/IF SELECTCOM == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2254',
        any: [/IF CFLAG:TARGET:321 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2256',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2258',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2260',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2263',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2264',
        any: [
          /PRINTFORMW 「啊呀~%UNICODE\(0x2661\) \*1%…好高兴啊哈~啊~…%UNICODE\(0x2661\) \*1% 啊嗯~…啊~哈啊~~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2265',
        any: [/PRINTFORMW %SAVESTR:TARGET%两眼冒光地抱着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2266',
        any: [
          /PRINTFORMW 「感觉到主人的魔力了呢~…主人~%UNICODE\(0x2661\) \*1%…魔王大人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2267',
        any: [
          /PRINTFORMW 因为紧闭地紧贴在一起的原因，%SAVESTR:TARGET%发出了欢喜的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2268',
        any: [
          /PRINTFORMW 「大鸡巴…往更加深的地方插进来吧~…俺要因为大鸡巴而坏掉啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2269',
        any: [
          /PRINTFORMW %NAME:MASTER%她那一副塞进了阴茎后就变得淫乱的姿态，如同完全臣服了的魔族少女一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2272',
        any: [
          /PRINTFORMW 「哈~…啊~…啊啊啊~…大鸡巴进来了~…呜~啊~…啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2273',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧张地呼吸着、不成熟的蜜穴的深处被塞进了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2274',
        any: [
          /PRINTFORMW 「主…人~…大人~…啊~…俺没…没问题的…所以请好好地品尝俺的处女小穴吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2275',
        any: [
          /PRINTFORMW 「魔王大人的大鸡巴就是为了这个才存在的吧~…俺…俺想要…成为主人的小穴呐~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2276',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%拼命地忍耐着破瓜之痛紧紧地抱了过来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2279',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2281',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2284',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2285',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的脸破瓜的疼痛而变得僵硬，露出了一副不自然却十分坚强的笑容。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2286',
        any: [/PRINTFORMW 「没、没事的啦…这样的…完全没事的啦…嗯~………啊啊~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2287',
        any: [
          /PRINTFORMW 看着如此坚强的%SAVESTR:TARGET%，%SAVESTR:PLAYER%不假思索地抚摸了她的脑袋。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2288',
        any: [
          /PRINTFORMW 「魔王大人的…大鸡巴~…感觉到了~%UNICODE\(0x2661\) \*1%…好热的…好热啊…啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2289',
        any: [
          /PRINTFORMW 「啊啊~…更加大力地动吧~%UNICODE\(0x2661\) \*1%…将俺…将俺变成魔王大人的东西吧~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2290',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2293',
        any: [/PRINTFORMW 「哈啊…哈啊…嗯~…啊~…啊呜~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2294',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着破瓜的痛苦的样子、闭着眼睛紧咬着牙。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2295',
        any: [
          /PRINTFORMW 「完、完全…没、没有问题的啦~…主人~…请、变得舒服…起、起来吧~…~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2296',
        any: [
          /PRINTFORMW 少女的手在%SAVESTR:PLAYER%的背后划出了刮痕、而这刮痕带来的疼痛让%SAVESTR:PLAYER%感到了十分地舒爽的感觉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2297',
        any: [
          /PRINTFORMW 「啊啊~…主人的~…大鸡巴好热啊~…好想…更加地侍奉啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2302',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2303',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2305',
        any: [
          /PRINTFORMW 「啊唔呜呜呜~！…好难受…好难受啊…快点…快点拔掉啊~………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2306',
        any: [
          /PRINTFORMW 强行将%SAVESTR:TARGET%未成熟的蜜穴完全扩张、远远不像快感的痛苦的叫声响彻了周围。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2307',
        any: [
          /PRINTFORMW 因为这痛苦的声音而兴奋起来的%SAVESTR:PLAYER%继续凌辱着少女………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2313',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2314',
        any: [
          /PRINTFORMW 「啊啊恩~…更加…更加用力地插进去吧~…插到要将小穴弄坏的程度吧~~…好想要大鸡巴啊~~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2315',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2317',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2318',
        any: [
          /PRINTFORMW 「哈呜~…啊~…啊啊~………更加…慢一点做吧…啊~…啊啊恩~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2319',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被插进去后，就不停地喘着炽热的粗气紧紧地抱着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2322',
        any: [
          /PRINTFORMW 「啊~…唔~…进来了…鸡巴…啊~呀啊~…突然这样子~…啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2323',
        any: [
          /PRINTFORMW 将阴茎强行地塞进了%SAVESTR:TARGET%蜜穴的深处后%SAVESTR:PLAYER%毫不留情地蹂蹑起了少女………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2326',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2331',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2332',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2333',
        any: [
          /PRINTFORMW 「啊啊恩~…更加…更加用力地抽插吧~…插到小穴要坏掉的程度吧~…好想要大鸡巴啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2334',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2335',
        any: [
          /PRINTFORMW 「俺、俺已经…变成喜欢鸡巴的变态狂也没有关系了~%UNICODE\(0x2661\) \*1%…更加…更加激烈地做吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2336',
        any: [
          /PRINTFORMW 「一抽一抽地…好想被biu~地一下在里面射出精液啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2337',
        any: [
          /PRINTFORMW 不像样地张大着嘴巴恳求的姿态、看来少女已经不是村女而是完完全全妓女了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2338',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2339',
        any: [
          /PRINTFORMW 「啊啊~…主人的好热的来了~%UNICODE\(0x2661\) \*1% 呜嗯~…这个好喜欢啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2340',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出了愉悦的声音用双手缠绕住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2341',
        any: [
          /PRINTFORMW 「啊~%UNICODE\(0x2661\) \*1% 啊~%UNICODE\(0x2661\) \*1% 啊啊~%UNICODE\(0x2661\) \*1%…好想就这样和主人融化合在一起啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2342',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%越过%SAVESTR:PLAYER%的背后环抱住的双手意外地舒服………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2343',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2344',
        any: [
          /PRINTFORMW 「啊~啊啊~%UNICODE\(0x2661\) \*1%…就这样…将俺吃掉吧~…好想成为主人的一部分啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2345',
        any: [
          /PRINTFORMW 没错，向%SAVESTR:PLAYER%撒娇的少女那魔族的双目发出了灿烂的光辉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2348',
        any: [
          /PRINTFORMW 「看着俺…的…脸吧~…被主人…用大鸡巴来调教…变得舒服起来的样子被看到了~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2349',
        any: [
          /PRINTFORMW 每当%SAVESTR:TARGET%的腔内深处被不断地抽插的时候，这个少女可爱的脸蛋就会歪曲掉发出了十分色情的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2350',
        any: [
          /PRINTFORMW 「呀~%UNICODE\(0x2661\) \*1%…呀啊~…啊~…哼~…呀啊~%UNICODE\(0x2661\) \*1%…啊啊~…大鸡巴~…好棒~%UNICODE\(0x2661\) \*1%…大鸡巴~…好喜欢%UNICODE\(0x2661\) \*1%…最喜欢了~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2351',
        any: [
          /PRINTFORMW 「对不起~…只有俺变得那么舒服真是对不起~%UNICODE\(0x2661\) \*1%…但是~…但是~…主人的大鸡巴好棒啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2352',
        any: [/PRINTFORMW %SAVESTR:TARGET%的脑袋完全变成了痴女的样子了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2354',
        any: [/CFLAG:321 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2356',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2357',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2358',
        any: [
          /PRINTFORMW 「啊~…哼~…啊呜~…哈啊嗯~…%UNICODE\(0x2661\) \*1% 没问题的啊嗯~…更加激烈地动吧~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2359',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋了起来，紧紧地抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2361',
        any: [
          /PRINTFORMW 「啊啊~…嗯~…哼…啊啊…小穴…好棒啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2362',
        any: [
          /PRINTFORMW 「更加地…调教俺吧~%UNICODE\(0x2661\) \*1%…俺的小穴~%UNICODE\(0x2661\) \*1% 作为主人专用的小穴来用吧~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2363',
        any: [
          /PRINTFORMW 每当腔内深处被抽插的时候，%SAVESTR:TARGET%就会一脸幸福的表情发出了甘甜的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2364',
        any: [/PRINTFORMW 「俺…俺已经…不和主人在一起的话就活不下去了呢~………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2365',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2366',
        any: [
          /PRINTFORMW 「啊~…哈啊~…啊~啊啊~…不要啦~…好羞耻啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2367',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的双腿抓住一口气拉开直接抽插了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2369',
        any: [
          /PRINTFORMW 「啊啊~…嗯~…哼…啊啊…小穴，变得好有感觉啊~…好棒啊…快看那里吧~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2370',
        any: [
          /PRINTFORMW 「啊~…啊~…哼啊啊~…不行…俺、俺要…变得奇怪起来…了啊嗯~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2371',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就算羞耻地脸别过去也一直因为快感而不断地发出娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2373',
        any: [
          /PRINTFORMW 「哈呜~…啊啊啊~…更加…激烈地做吧~…啊~…啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2374',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被插进去后吐出炽热的喘息，紧紧地抱住了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2375',
        any: [
          /PRINTFORMW 「更加地疼爱我吧…将我疼爱到要弄坏的程度~%UNICODE\(0x2661\) \*1% 让我将全部事情都忘记的程度吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2376',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边发出可爱的声音一边因为%SAVESTR:PLAYER%的下身而喘着粗气………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2378',
        any: [
          /PRINTFORMW 「哼…啊啊…小穴…要融化掉了…%UNICODE\(0x2661\) \*1% 俺…已经要变得不行了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2380',
        any: [/CFLAG:321 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2382',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2383',
        any: [/PRINTFORMW 「哈呜呜~嗯~…啊…怎么感觉…好像…舒服起来…了…啊嗯~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2384',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被不断地侵犯最终变得有感觉了的样子，变得娇喘连连了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2385',
        any: [/PRINTFORMW 「哈、哈啊嗯~…俺…俺会将腿张得更开的…~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2386',
        any: [
          /PRINTFORMW 少女将双腿张开到极限的时候、为了让%SAVESTR:PLAYER%变得更加高兴而大声地娇喘了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2387',
        any: [/CFLAG:321 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2389',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2390',
        any: [/PRINTFORMW 「嗯呜~…往…往深处塞进去也…没问题…的噢~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2391',
        any: [
          /PRINTFORMW 往刚刚说出如此坚强话语的%SAVESTR:TARGET%的腔内深处塞进了阴茎后，%SAVESTR:PLAYER%就毫不留情地开始凌辱这可怜的少女………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2392',
        any: [/PRINTFORMW 「哼~…呜~…啊啊~…嗯呜~…已、已经…再这样下去…啊呜~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2393',
        any: [/CFLAG:321 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2395',
        any: [/ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2396',
        any: [
          /PRINTFORMW 「啊~…唔~…进来了…小鸡鸡…啊~呀~…突然这样子啊~…啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2397',
        any: [
          /PRINTFORMW 往%SAVESTR:TARGET%的腔内深处塞进了阴茎后，%SAVESTR:PLAYER%就毫不留情地开始凌辱这可怜的少女………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2398',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2407',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2409',
        any: [/IF CFLAG:TARGET:322 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2411',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2413',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2415',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2416',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2418',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2419',
        any: [
          /PRINTFORMW 「啊啊~%UNICODE\(0x2661\) \*1%…大鸡巴要来啊~%UNICODE\(0x2661\) \*1% 噢~哦哈啊~…好深啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2420',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓住就这样被塞进了深处。破瓜的疼痛和未知的感觉让少女发出了欢喜的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2421',
        any: [
          /PRINTFORMW 「感觉到主人的魔力了呢…主人~%UNICODE\(0x2661\) \*1%…魔王大人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2422',
        any: [
          /PRINTFORMW 可能是因为紧紧贴在一起的原因，%SAVESTR:TARGET%发出了愉悦的声音、背后的翅膀突然就张开了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2423',
        any: [
          /PRINTFORMW 「更加地…啪啪啪吧~…将俺当成飞机杯用吧~%UNICODE\(0x2661\) \*1%…被魔王大人给强暴了…好棒啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2424',
        any: [
          /PRINTFORMW 少女被%SAVESTR:PLAYER%抓住了腰、将立起脚尖的魔族少女的处女穴给弄得乱七八糟了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2427',
        any: [
          /PRINTFORMW 「啊哈啊啊~%UNICODE\(0x2661\) \*1% 好深啊~…大、大鸡巴好深啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2428',
        any: [/PRINTFORMW %SAVESTR:TARGET%非常下流地将舌头伸了出来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2429',
        any: [
          /PRINTFORMW 「啊啊~…处女小穴被欺负了~%UNICODE\(0x2661\) \*1%…主人啊嗯~~更加用力的%UNICODE\(0x2661\) \*1%…更加激烈地欺负吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2430',
        any: [
          /PRINTFORMW 「感觉到大鸡巴在里面不停地侵犯俺呢~%UNICODE\(0x2661\) \*1%…好棒啊~%UNICODE\(0x2661\) \*1%…太舒服了~…感觉要变奇怪了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2431',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰部被抓住、如她所希望的那样被继续侵犯下去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2434',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2436',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2437',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2439',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2440',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将少女的双手向后拉着的姿态下侵犯了她，%SAVESTR:TARGET%就这样发出了如同叹气一样的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2441',
        any: [
          /PRINTFORMW 「啊…哈啊啊啊…%UNICODE\(0x2661\) \*1% 好激烈啊…魔王大人啊啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2442',
        any: [
          /PRINTFORMW 背后的翅膀突然就张开了、每当小小的屁股被侵犯的时候尾巴就会不停地乱甩着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2443',
        any: [
          /PRINTFORMW 「魔王大人的…大鸡巴里…魔力…好厉害的%UNICODE\(0x2661\) \*1% …传进了…%UNICODE\(0x2661\) \*1% 啊哈啊啊~%UNICODE\(0x2661\) \*1% 俺、俺已经…变成魔王大人的东西了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2444',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2447',
        any: [
          /PRINTFORMW 「呜啊…啊啊啊…好深啊~…大鸡巴~…捅到了深处了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2448',
        any: [/PRINTFORMW %SAVESTR:TARGET%大幅度地仰着腰，忍耐着破瓜的疼痛。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2449',
        any: [
          /PRINTFORMW 「主人啊啊~…将俺的小穴…弄坏掉吧~…弄坏掉吧~~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2450',
        any: [
          /PRINTFORMW 每当小小的屁股被阴茎抽插的时候就会出现淫猥的声音。毫不留情地将腰撞上去后，%SAVESTR:TARGET%的屁股就不断地变红了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2451',
        any: [
          /PRINTFORMW 「啊~啊啊~…已、已经不行了~…俺的小穴…要变成主人专用的了呜啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2456',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2457',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2459',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%向后拉着双手的情况下侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2460',
        any: [
          /PRINTFORMW 「啊啊啊啊~！好、好难受啊啊~…不、不要啊啊…不要这样动起来啊啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2461',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%不成熟的蜜穴被强行扩张、无法称之为快乐的苦痛的呻吟之声响彻了周围。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2462',
        any: [
          /PRINTFORMW 因为这呻吟声兴奋起来的%SAVESTR:PLAYER%重新将少女的小屁股抓住、毫不留情地继续凌辱着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2468',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2469',
        any: [
          /PRINTFORMW 「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧~%UNICODE\(0x2661\) \*1% 弄得俺更加乱七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2470',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓住就这样被插到了深处、发出了欢喜的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2471',
        any: [
          /PRINTFORMW 「啊啊~…好棒啊~…主人的大鸡巴好棒~%UNICODE\(0x2661\) \*1%…好棒啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2473',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2474',
        any: [
          /PRINTFORMW 「明明这样的姿势好羞耻来的…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊~…到深处来了~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2475',
        any: [
          /PRINTFORMW 捅进了%SAVESTR:TARGET%的腔内深处后，%SAVESTR:PLAYER%开始慢慢地抽插了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2476',
        any: [
          /PRINTFORMW 「啊啊~…啊啊啊~…主人啊啊~…要翻起来了…小穴要翻出来了啊~%UNICODE\(0x2661\) \*1%…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2479',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%向后拉着双手的情况下侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2480',
        any: [/PRINTFORMW 「拜、拜托了~…再这样下去的话…原谅…俺吧…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2481',
        any: [
          /PRINTFORMW 听到哀求声而兴奋起来的%SAVESTR:PLAYER%重新将少女的小屁股抓住、毫不留情地继续凌辱着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2484',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2489',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2490',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2491',
        any: [
          /PRINTFORMW 「啊啊~…啊啊嗯~…嗯~…呜嗯~…好棒~…好舒服~…好棒啊啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2492',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的屁股不断地被腰用力的撞上去而变得红肿了起来。%SAVESTR:TARGET%连这份疼痛也当成快乐来享受的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2493',
        any: [
          /PRINTFORMW 「被侵犯的好喜欢啊~%UNICODE\(0x2661\) \*1%…用大鸡巴来用力地啪啪啪俺吧~%UNICODE\(0x2661\) \*1% 小穴变得黏糊糊起来了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2495',
        any: [
          /PRINTFORMW 「啊啊啊~…已经~已经~…只能考虑大鸡巴的事情了哈呜~%UNICODE\(0x2661\) \*1%…已经…已经不行了哈嗯嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2496',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2497',
        any: [
          /PRINTFORMW 「啊呀~…呀~…呀啊嗯~…被从背后做的…太有感觉了呜~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2498',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将屁股高高地伸了出来、就这样任由%SAVESTR:PLAYER%侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2499',
        any: [
          /PRINTFORMW 「啊啊啊~…主人啊啊~…好棒啊啊~%UNICODE\(0x2661\) \*1%…更加激烈地侵犯俺吧~…侵犯要坏掉的程度吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2501',
        any: [
          /PRINTFORMW 「啊呀哈恩~…小穴要来了~%UNICODE\(0x2661\) \*1%…要来了啊~…%UNICODE\(0x2661\) \*1% 已、已经要变得不行了呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2503',
        any: [
          /PRINTFORMW 「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧%UNICODE\(0x2661\) \*1% 将俺弄得更加乱七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2504',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被抓住就这样被插到了深处后、就发出了欢喜的娇喘声。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2505',
        any: [
          /PRINTFORMW 「啊啊啊~…小穴被干着好舒服啊~~~%UNICODE\(0x2661\) \*1%…大鸡巴进到深处了呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2507',
        any: [
          /PRINTFORMW 「啊啊啊~…小穴好棒啊~%UNICODE\(0x2661\) \*1%…好棒的啊~…%UNICODE\(0x2661\) \*1% 将俺弄得更加舒服起来吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2509',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2511',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2512',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2514',
        any: [/PRINTFORMW 「从背后做好舒服啊~…主人~%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2515',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%趴在地上、沉浸在了被从背后侵犯所带来的快感之中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2516',
        any: [
          /PRINTFORMW 「嗯~…啊啊~…嗯呀~…好~…好棒啊~…主人~…俺是主人的小狗狗来的~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2517',
        any: [
          /PRINTFORMW 「就这样…将种子射进来吧~%UNICODE\(0x2661\) \*1%…俺…会将主人的小宝宝生出来的~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2518',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2519',
        any: [
          /PRINTFORMW 「啊嗯~…啊哈啊啊~%UNICODE\(0x2661\) \*1%…被主人从后面…做的话…就感觉…俺变成野兽了一样~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从背后做而兴奋起来的样子，不断地大声呻吟着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2521',
        any: [
          /PRINTFORMW 「啊哈啊啊嗯~…啊啊啊嗯~%UNICODE\(0x2661\) \*1%…俺是…主人的小狗狗来的~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2523',
        any: [
          /PRINTFORMW 「啊啊啊~…主人的大鸡巴好棒~%UNICODE\(0x2661\) \*1%…大鸡巴最棒了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2525',
        any: [
          /PRINTFORMW 「明明这样的姿势很羞耻来的~…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊…插到深处来了呜嗯~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2526',
        any: [
          /PRINTFORMW 插进%SAVESTR:TARGET%的腔内深处后，%SAVESTR:PLAYER%慢慢地抽插起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2527',
        any: [
          /PRINTFORMW 「啊啊~…啊啊啊~…主人啊嗯~…要翻出来了…小穴要翻起来了啊~%UNICODE\(0x2661\) \*1%…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2529',
        any: [
          /PRINTFORMW 「小…小穴…好棒啊~%UNICODE\(0x2661\) \*1%…更加用力地侵犯俺吧~%UNICODE\(0x2661\) \*1%…主人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2531',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2533',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2534',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将屁股高高地抬起来、少女的蜜穴如同追求快感一样抽动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2535',
        any: [
          /PRINTFORMW 「啊~…哈啊~…嗯~♪…好棒~…这个…好棒啊~…啊~啊啊~…连、深处都…被侵犯着呐哈呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2536',
        any: [
          /PRINTFORMW 完全屈服了的%SAVESTR:TARGET%因为被侵犯的快感而颤抖起来了、每次捅进去的时候都会发出甘甜的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2538',
        any: [
          /PRINTFORMW 「嗯~…啊~…啊啊嗯~…啊嗯~…啊嗯~…啊哼唔嗯~♪………好深…好爽~好舒服啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2539',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2541',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2542',
        any: [/PRINTFORMW %SAVESTR:TARGET%在双手被向后拉的情况下被侵犯着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2543',
        any: [/PRINTFORMW 「啊~啊啊啊~…嗯~…啊啊啊~…唔呜~…呜呜~………哈唔呜~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2544',
        any: [
          /PRINTFORMW 可能开始习惯起被侵犯的吧，%SAVESTR:TARGET%虽然尽力的忍耐着不让自己发出声音、然而是不是还是会从嘴边漏出甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2545',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2547',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2548',
        any: [/PRINTFORMW %SAVESTR:TARGET%在双手被向后拉的情况下被侵犯着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2549',
        any: [/PRINTFORMW 「拜、拜托了~…再这样下去的话…原谅…俺吧…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2550',
        any: [
          /PRINTFORMW 听到哀求声的%SAVESTR:PLAYER%重新将少女的小屁股抓住、毫不留情地继续凌辱着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2551',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2560',
        any: [/IF SELECTCOM == 22/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2561',
        any: [/IF CFLAG:TARGET:323 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2563',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2565',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2566',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2568',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2569',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2572',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2577',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2578',
        any: [
          /PRINTFORMW 「啊啊啊~…主人的~…进到深处里面去了啊~~%UNICODE\(0x2661\) \*1%…啊啊~…俺、俺要忍不住了啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2579',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2581',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2582',
        any: [
          /PRINTFORMW 「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~%UNICODE\(0x2661\) \*1%…啊啊嗯~…主人啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2583',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2586',
        any: [
          /PRINTFORMW 「啊啊~…进到了…深处了啊呜…啊啊~…不、不能往上捅啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2587',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2590',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2595',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2596',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2597',
        any: [
          /PRINTFORMW 「啊啊啊~…主人的…进到深处了啊嗯~%UNICODE\(0x2661\) \*1%…啊啊~…俺、俺要忍不住了啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2598',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2599',
        any: [
          /PRINTFORMW 「啊嗯~…哈啊~…啊啊啊啊啊…主人的大鸡巴嵌入进去了啊嗯~~…将俺的小穴干地乱七八糟的吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2601',
        any: [
          /PRINTFORMW 「唔呀啊~呀嗯~%UNICODE\(0x2661\) \*1% 啊啊啊…已经记住了大鸡巴的味道了呢~…啊啊~啊啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2602',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2603',
        any: [
          /PRINTFORMW 「啊哈啊…主人~…亲吻…吧~…呐啊~…俺想要亲吻嘛~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2604',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的幼小的腔内深处塞进了阴茎后，少女忍不住发出了甜美的呻吟声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2605',
        any: [
          /PRINTFORMW 然后，%SAVESTR:PLAYER%将少女的小屁股抓住好不留情的上下抽插后。甜美的呻吟声变成了大声的娇喘声了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2606',
        any: [
          /PRINTFORMW 「哈呀啊嗯~%UNICODE\(0x2661\) \*1%…不~不行呀啊~…这、这样子…往上捅的话突…俺、俺要坏掉了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2608',
        any: [
          /PRINTFORMW 「啊哈啊啊~…大鸡巴好棒啊~%UNICODE\(0x2661\) \*1%…将俺的小穴…干地乱起八糟的吧~%UNICODE\(0x2661\) \*1%…啊啊~啊~啊啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2610',
        any: [
          /PRINTFORMW 「啊啊~…不要啊…快、快点动起来嘛~…俺、俺要变奇怪起来了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2611',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰被双手牢牢的抓住，完全动不了而被玩弄着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2612',
        any: [
          /PRINTFORMW 「啊啊~…拜托了~…将俺的色情小穴…狠狠地侵犯了吧…侵犯了嘛~…啊~…呀哈啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2613',
        any: [
          /PRINTFORMW 可能是看到少女已经到了忍耐的极限，%SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰抓住毫不留情的上下抽插起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2615',
        any: [
          /PRINTFORMW 「呀~…呀啊啊~…大鸡巴好棒啊~…主人的大鸡巴最棒了啊~%UNICODE\(0x2661\) \*1% 小穴要融化掉呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2617',
        any: [/CFLAG:323 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2619',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2620',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2621',
        any: [
          /PRINTFORMW 「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~%UNICODE\(0x2661\) \*1%…啊啊嗯~…主人啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2622',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2624',
        any: [
          /PRINTFORMW 「啊啊~…喜欢~%UNICODE\(0x2661\) \*1%…好喜欢%UNICODE\(0x2661\) \*1%…就这样一直合在一起嘛~…主人~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2625',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2626',
        any: [
          /PRINTFORMW 「主人~%UNICODE\(0x2661\) \*1%…主人啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2627',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将紧紧搂过来的%SAVESTR:TARGET%的腰部抓住后十分粗暴地往上抽插起来了，而少女却发出了十分欣喜的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2629',
        any: [
          /PRINTFORMW 「好棒啊~…被主人…狠狠地干好棒啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2631',
        any: [
          /PRINTFORMW 「这样的姿势的话…就能不停地亲吻了我好喜欢~%UNICODE\(0x2661\) \*1%…好喜欢啾~%UNICODE\(0x2661\) \*1%…啾~啾呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2632',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%牢牢地将%SAVESTR:PLAYER%的身体搂住、哪怕正在侵犯也在不停地亲吻着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2633',
        any: [/IF ABL:2 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2634',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的腰抓住后十分粗暴的往上捅、品味着紧紧吸附住的甘甜的腔内。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2635',
        any: [
          /PRINTFORMW 「啊啊…被、被那么地往上抽插了的话…会、会亲不了了啊嗯…嗯~…嗯噗呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2638',
        any: [/CFLAG:323 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2640',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2641',
        any: [/PRINTFORMW 「啊~…嗯呜呜~…啊啊~…进到里面啊嗯…了啊嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2642',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2643',
        any: [
          /PRINTFORMW 「啊~…哈呜呜~…嗯~………啊啊~…明明是被那么粗暴地对待来着…啊~啊啊啊~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2644',
        any: [/PRINTFORMW 从少女的嘴里不断地漏出了甜美的娇喘声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2645',
        any: [/CFLAG:323 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2647',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2648',
        any: [/PRINTFORMW 「啊~…嗯呜呜~…啊啊~…进到深处了…啊呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2649',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2650',
        any: [/PRINTFORMW 「啊呀~…呀啊~…啊呜呜呜~…请、请原谅俺了吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2651',
        any: [/CFLAG:323 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2653',
        any: [/ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2654',
        any: [
          /PRINTFORMW 「啊啊~…进到…深处了啊嗯…啊啊~…往、往上捅不行的啊啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2655',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将%SAVESTR:TARGET%的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2656',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2665',
        any: [/IF SELECTCOM == 23/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2666',
        any: [/IF CFLAG:TARGET:324 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2668',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2670',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2671',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2673',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2674',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2677',
        any: [/PRINTFORMW 「」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2682',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2683',
        any: [
          /PRINTFORMW 「嗯呀~呀啊啊嗯~%UNICODE\(0x2661\) \*1%…将俺的小穴插到要坏掉的程度吧~…啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2685',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2687',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2689',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2691',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2692',
        any: [
          /PRINTFORMW 「啊啊~…哈啊啊…主人…啊啊~…更用力地…揉俺的胸部吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2694',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2696',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2698',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2701',
        any: [
          /PRINTFORMW 「啊唔~…呜呜~…啊啊啊啊~…这么从下往上捅的话…呀~…呀哈啊~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2703',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2705',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2707',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2710',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2715',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2716',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2717',
        any: [/PRINTFORMW %SAVESTR:TARGET%将双腿张开，让阴茎插到了深处。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2718',
        any: [
          /PRINTFORMW 「啊啊啊~…明明是如此羞耻的姿势来的~…好舒服啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2719',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的腰部温柔地往上抽插着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2720',
        any: [
          /PRINTFORMW 「啊~啊啊啊~…更加激烈地做嘛~…俺…已经…不是被狠狠地干的话就不行了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2721',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2722',
        any: [
          /PRINTFORMW 「啊~啊啊~…俺的小穴…发出了噗呲噗呲的声音了呢~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2723',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手臂环抱住了%SAVESTR:TARGET%的幼小身体、慢慢地用手抚摸着胸部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2724',
        any: [
          /PRINTFORMW 「啊啊~…将俺的胸部也…弄得乱起八糟的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2726',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2728',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2730',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2731',
        any: [
          /PRINTFORMW 「呀啊~啊啊啊~…啊啊啊~…乳头…变得奇怪起来了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2733',
        any: [
          /PRINTFORMW 「嗯呀~~呀啊啊嗯~%UNICODE\(0x2661\) \*1%…将俺的小穴往上捅到要坏掉的程度吧~…啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2734',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的幼小身体，毫不留情地用腰撞上去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2735',
        any: [
          /PRINTFORMW 「啊啊啊~…啊哼呜~…呀哈啊~%UNICODE\(0x2661\) \*1%…好棒啊~…小穴好棒啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2737',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2739',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2741',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2743',
        any: [/CFLAG:324 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2745',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2746',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2747',
        any: [
          /PRINTFORMW 「啊哈啊~…俺、俺已…已经…已经…变得奇怪起来了呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2748',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的腰慢慢地十分温柔地从上抽插起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2749',
        any: [
          /PRINTFORMW 「啊~…啊啊~哈啊啊…被、被这么干了的话…啊~…啊啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2750',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2751',
        any: [
          /PRINTFORMW 「啊哈啊~…哈啊啊嗯~%UNICODE\(0x2661\) \*1%…大鸡巴好深啊~…啊~啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2752',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%用手臂环抱住了%SAVESTR:TARGET%的幼小身体、慢慢地用手抚摸着胸部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2753',
        any: [
          /PRINTFORMW 「啊啊~…啊嗯~…哈呜呜呜~…被那么温柔的…的话…哈啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2755',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的巨乳被从背后温柔地抚摸而发出了甘甜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2757',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的爆乳被从背后温柔地抚摸而发出了甘甜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2759',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己的超乳被从背后温柔地抚摸而发出了甘甜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2761',
        any: [
          /PRINTFORMW 「啊啊~…哈啊啊啊…主人…啊啊~…更加地…用俺的胸部吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2762',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的幼小身体，毫不留情地插了上去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2763',
        any: [
          /PRINTFORMW 「哈啊~啊啊~%UNICODE\(0x2661\) \*1%…主人的大鸡巴…进到里面去了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2765',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2767',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2769',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2771',
        any: [/CFLAG:324 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2773',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2774',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的幼小身体，毫不留情地插了上去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2775',
        any: [
          /PRINTFORMW 「嗯呀~…呀啊~…啊啊啊~…好奇怪啊…明明是被这么粗暴地对待来着…居然会那么舒服………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2777',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2779',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2782',
        any: [/CFLAG:324 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2784',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2785',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%环抱住%SAVESTR:TARGET%的幼小身体，毫不留情地插了上去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2786',
        any: [
          /PRINTFORMW 「啊~…啊啊啊~…胸部就这样被抓者的情况下…被插上来的话…啊呜呜呜~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2788',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2790',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2792',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2793',
        any: [/CFLAG:324 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2795',
        any: [/ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2796',
        any: [
          /PRINTFORMW 「啊唔~…呜呜~…啊啊啊啊~…被这么激烈地捅上去的话…呀~…哈呀~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2798',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2800',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2802',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2803',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2812',
        any: [/IF SELECTCOM == 26/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2814',
        any: [/IF CFLAG:TARGET:327 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2816',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2817',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2818',
        any: [
          /PRINTFORMW 「将俺的屁股…干得乱七八糟地吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2819',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%为了品味更强烈的快感而将双腿张的大大的让%SAVESTR:PLAYER%就这样侵犯着屁股………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2821',
        any: [
          /PRINTFORMW 「将俺的屁股…干得乱七八糟地吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2822',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%时不时很痛苦似的皱着眉头、被毫不留情的侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2825',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2826',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2827',
        any: [
          /PRINTFORMW 「唔…嗯~…！ 主人啊嗯~…更加激烈地…侵犯俺的屁股吧~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2828',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用她纤细的双手抱住%SAVESTR:PLAYER%、享受着调教play的肛门凌辱的快感。………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2830',
        any: [
          /PRINTFORMW 「唔啊啊~…唔…嗯~…！ 好、好难受啊~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2831',
        any: [
          /PRINTFORMW 调教不足的肛门被毫不留情地凌辱着、%SAVESTR:TARGET%在%SAVESTR:PLAYER%的身下发出了十分痛苦的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2835',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2836',
        any: [/PRINTFORMW 「啊啊啊~…大、大鸡巴~…进去了…嗯呀啊嗯~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2837',
        any: [
          /PRINTFORMW 每当被重度开发过的肛门被阴茎来回抽插的时候、%SAVESTR:TARGET%发出了充满快感的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2839',
        any: [
          /PRINTFORMW 「不、不要啊~…那里才…不是该进去的地方啊…唔…呀、呀啊啊啊~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2840',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被阴茎毫不留情地蹂蹑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2844',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2849',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:327 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2850',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2852',
        any: [
          /PRINTFORMW 「俺是…主人专用肛穴奴隶来的%UNICODE\(0x2661\) \*1% 小穴缝起来也没问题的噢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2853',
        any: [
          /PRINTFORMW 「里面在被主人搅拌着呢哈啊啊~%UNICODE\(0x2661\) \*1% 肛穴好舒服好爽啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2854',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2855',
        any: [
          /PRINTFORMW 「咿呓～…咿啊～…啊啊啊啊~%UNICODE\(0x2661\) \*1% 啊～%UNICODE\(0x2661\) \*1%啊～%UNICODE\(0x2661\) \*1%啊啊啊啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2856',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2857',
        any: [
          /PRINTFORMW 「这样～的做爱～%UNICODE\(0x2661\) \*1% 太～棒～啦～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2859',
        any: [
          /PRINTFORMW 「小穴什么的已经可以不需要了～…%UNICODE\(0x2661\) \*1% 来更多的操菊穴吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2860',
        any: [
          /PRINTFORMW 被毫不留情的侵犯肛门的%SAVESTR:TARGET%一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性愛狂了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2861',
        any: [
          /PRINTFORMW 「啊咿～咿～噫～～%UNICODE\(0x2661\) \*1%…黏糊糊的～%UNICODE\(0x2661\) \*1%…菊穴变得黏糊糊的～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2863',
        any: [
          /PRINTFORMW 「哦哦～%UNICODE\(0x2661\) \*1%…哦吼～%UNICODE\(0x2661\) \*1%…菊穴被撑大了%UNICODE\(0x2661\) \*1%主人～～主人～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2864',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2865',
        any: [
          /PRINTFORMW 「菊穴好爽啊～%UNICODE\(0x2661\) \*1%…想一直被肉棒侵犯下去%UNICODE\(0x2661\) \*1%…菊穴好爽啊～%UNICODE\(0x2661\) \*1% 好爽～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2867',
        any: [/CFLAG:327 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2869',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2870',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2871',
        any: [
          /PRINTFORMW 「嗯呼呜～…肛门被掀动起来了%UNICODE\(0x2661\) \*1% 被肉棒侵犯好爽啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2872',
        any: [
          /PRINTFORMW 被施予了大量尻穴調教的肛门、每次随着阴茎的抽插、就会令%SAVESTR:TARGET%发出充满快感的呻吟声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2873',
        any: [
          /PRINTFORMW 「啊啊啊～%UNICODE\(0x2661\) \*1% 不行了…嘻～嘻～…再这么激烈的话…已经…不行了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2876',
        any: [
          /PRINTFORMW 「虽然想快点被侵犯小穴…但是肛门感觉也很爽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2877',
        any: [
          /PRINTFORMW 「不对不对～…肛门…太有感觉了…不、要啊～…再这样下去的话～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2878',
        any: [
          /PRINTFORMW 肛门在一颤一颤地夹紧着阴茎、%SAVESTR:PLAYER%更激烈的插起了肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2879',
        any: [
          /PRINTFORMW 「啊啊～%UNICODE\(0x2661\) \*1% 不要～不要～%UNICODE\(0x2661\) \*1%…我、已经…已经…嘻嘻～嘻嘻～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2881',
        any: [/CFLAG:327 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2883',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2884',
        any: [
          /PRINTFORMW 「啊咕呜～…又、是这么激烈～…但是～…被主人这么努力地开发的话…感觉好开心啊～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2885',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还没調教完成的尻穴被尽可能地扩张开、少女忍不住皱起了眉头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2886',
        any: [/CFLAG:327 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2888',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2889',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2891',
        any: [
          /PRINTFORMW 「已经…变成菊穴専用奴隷了呢～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2892',
        any: [
          /PRINTFORMW 「快来操吧…我的屁股～…用主人的肉棒把它搅得一塌糊涂吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2893',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2894',
        any: [
          /PRINTFORMW 「已、已经…只需要屁股就够了～…快来侵犯屁股吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2895',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2896',
        any: [
          /PRINTFORMW 「啊啊～…啊～啊啊啊～…哈啊啊%UNICODE\(0x2661\) \*1% 已、已经…变得奇怪了…肛交呜～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2897',
        any: [
          /PRINTFORMW 被毫不留情的侵犯肛门的%SAVESTR:TARGET%一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性愛狂了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2898',
        any: [
          /PRINTFORMW 「呀～…噫～…库咿咿～～…只要能被操屁股的话…不管怎么样都好啦～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2900',
        any: [
          /PRINTFORMW 「咿～咿～～…啊啊～…主人～～主人～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2901',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2902',
        any: [
          /PRINTFORMW 「我的菊花变得黏糊糊的了呢…已经…变成肉棒専用穴了哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2904',
        any: [/CFLAG:327 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2906',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2907',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2909',
        any: [
          /PRINTFORMW 「我…明明是处女…屁股却这么爽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2910',
        any: [
          /PRINTFORMW 「啊啊啊～…我的屁股…因为被主人干所以好有感觉啊～～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2911',
        any: [
          /PRINTFORMW 被施予了大量尻穴調教的肛门、每次随着阴茎的抽插、就会令%SAVESTR:TARGET%发出充满快感的呻吟声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2912',
        any: [
          /PRINTFORMW 「屁股也…记住鸡鸡的味道了呢～…%UNICODE\(0x2661\) \*1% 更多…还想尝尝更多～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2915',
        any: [
          /PRINTFORMW 「啊哈哈～…明明想早点被干小穴…屁股却啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2916',
        any: [
          /PRINTFORMW 「不行不行～～…屁股…实在太爽了…不、要啊～…再这样辖区的话～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2917',
        any: [
          /PRINTFORMW 肛门在一颤一颤地夹紧着阴茎、%NAME:MASTER%更激烈的插起了肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2918',
        any: [
          /PRINTFORMW 「啊啊～%UNICODE\(0x2661\) \*1% 不行不行不行～%UNICODE\(0x2661\) \*1%…我、已经…已经…嘻嘻～嘻嘻～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2920',
        any: [/CFLAG:327 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2922',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2923',
        any: [
          /PRINTFORMW 「没、没事的…这样…完全没什么大不了的…唔～…咕呜～…啊、哈啊啊～………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2924',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还没調教完成的尻穴被尽可能地扩张开、%SAVESTR:TARGET%咬着牙尽量忍住痛苦的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2926',
        any: [/PRINTFORMW 「比起屁股…更想…好好地、用小穴做呢～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2927',
        any: [/CFLAG:327 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2929',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2930',
        any: [
          /PRINTFORMW 「啊~…嗯~…呀嗯~…啊~…啊啊啊…要翻起来了呜~…要翻出来了啊呜呜呜~………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2931',
        any: [
          /PRINTFORMW 被施予了大量尻穴調教的肛门、每次随着阴茎的抽插、就会令%SAVESTR:TARGET%发出充满快感的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2932',
        any: [/CFLAG:327 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2934',
        any: [/ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2935',
        any: [/PRINTFORMW 「唔~…啊~…呀~…拔出来…快点…拔出来啦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2936',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%还是很紧很窄的肛门被扩张到极限、%SAVESTR:TARGET%也因此发出了苦痛的呻吟声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2937',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2946',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2948',
        any: [/IF CFLAG:TARGET:328 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2950',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2951',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2952',
        any: [
          /PRINTFORMW 「明、明明是这样的姿势来的…明明被这样侵犯着肛门…但是好棒啊啊~%UNICODE\(0x2661\) \*1%…啊哈啊~啊啊~啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2953',
        any: [
          /PRINTFORMW 对经过尻穴調教变为性器的肛门的刺激令%SAVESTR:TARGET%的精神从原本純朴的村娘向着牝犬的方向堕落着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2955',
        any: [
          /PRINTFORMW 「啊咕呜～…虽、虽然很激烈…但总觉的…主人的肉棒…热热的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2956',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还没調教完成的尻穴被尽可能地扩张开、%SAVESTR:PLAYER%开始毫不留情的抽送起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2959',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2960',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2961',
        any: [
          /PRINTFORMW 「啊呀嗯嗯～%UNICODE\(0x2661\) \*1%…啊啊啊~…从后面…被侵犯屁股了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2962',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的已調教完毕的肛门颤抖着被%SAVESTR:PLAYER%一次次插入深处、%SAVESTR:PLAYER%一边看着小屁股的颤抖一边不停地抽插着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2964',
        any: [/PRINTFORMW 「啊呜～…呜、从后面…啊啊～、那、那里是～…额！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2965',
        any: [
          /PRINTFORMW 摁住%SAVESTR:TARGET%的娇小体躯、毫不留情地从后面贯穿了未熟的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2969',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2970',
        any: [/PRINTFORMW 「啊～…啊呜呜～…被掀起来了…我的…屁股…屁股啊～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2971',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的小屁股、毫不留情地对調教完毕的肛门展开了陵辱………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2973',
        any: [/PRINTFORMW 「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2974',
        any: [/PRINTFORMW  %SAVESTR:TARGET%的肛门被阴茎毫不留情地蹂蹑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2977',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2982',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:328 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2983',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2985',
        any: [
          /PRINTFORMW 「对成为菊穴専用奴隷的我来说…小穴什么的…已经没必要了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2986',
        any: [
          /PRINTFORMW 「啊～咿～～%UNICODE\(0x2661\) \*1%…嘻～嘻嘻…来啦～…我已经…只要有菊穴就好了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2987',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像已经完全成为了尻穴狂的样子、只是轻轻摩擦肛门就会变成牝犬似的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2988',
        any: [
          /PRINTFORMW 「啊啊啊～…菊穴…变得黏糊糊的了…啊啊啊啊～…好想被中出～～…好想被中出啊～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2989',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2990',
        any: [
          /PRINTFORMW 「诶嘿嘿～%UNICODE\(0x2661\) \*1%…啊啊～…啊呀啊啊…菊穴性交…要融化了…我、我…要融化了～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2992',
        any: [
          /PRINTFORMW 「已经不需要小穴了～…%UNICODE\(0x2661\) \*1% 更多的搅动我的菊穴吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2993',
        any: [
          /PRINTFORMW 被毫不留情的侵犯肛门的%SAVESTR:TARGET%、通过肛门的快感已经达到了高潮的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2994',
        any: [
          /PRINTFORMW 「啊～啊啊～…主人～…真棒啊～%UNICODE\(0x2661\) \*1%…更多地插菊穴吧～%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2996',
        any: [
          /PRINTFORMW 「哦哦～%UNICODE\(0x2661\) \*1%…哦吼～%UNICODE\(0x2661\) \*1%…菊穴强暴真是最棒了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2997',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%一边抓住小屁股一边毫不留情的侵犯起了%SAVESTR:TARGET%的肛门、就好像玩弄玩具似的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '2998',
        any: [
          /PRINTFORMW 「啊啊啊啊～…不要不要不要～%UNICODE\(0x2661\) \*1%…我…又、又…高潮…又高潮了～…要变成笨蛋了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3000',
        any: [/CFLAG:328 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3002',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3003',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3004',
        any: [
          /PRINTFORMW 「啊啊啊～被看到了～%UNICODE\(0x2661\) \*1%…肛门…被抽插的地方正在被看着～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3005',
        any: [
          /PRINTFORMW 通过尻穴調教已经成为性器的%SAVESTR:TARGET%的肛门、每当被阴茎抽送就会很明显地感到会收缩起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3006',
        any: [
          /PRINTFORMW 「啊啊啊～%UNICODE\(0x2661\) \*1% 被、被这样弄下去的话～…我、我…已、经～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3009',
        any: [
          /PRINTFORMW 「啊啊啊～…要、要这样…侵犯小穴吗～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3010',
        any: [
          /PRINTFORMW 一抓住%SAVESTR:TARGET%的小屁股%SAVESTR:PLAYER%就毫不留情的动起腰开始侵犯起了肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3011',
        any: [
          /PRINTFORMW 「啊呓咿～…只、只有屁股…只有屁股也好棒～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3012',
        any: [
          /PRINTFORMW 对经由尻穴調教变成性器的肛门的刺激令%SAVESTR:TARGET%的精神从原本純朴的村娘往牝犬堕落了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3013',
        any: [
          /PRINTFORMW 「咿咿咿咿～%UNICODE\(0x2661\) \*1%…咿咿咿咿噫～%UNICODE\(0x2661\) \*1%…噫啊啊～啊啊～啊啊啊～%UNICODE\(0x2661\) \*1%…啊哈啊啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3015',
        any: [/CFLAG:328 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3017',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3018',
        any: [
          /PRINTFORMW 「啊咕呜～…好、激烈、但是…总觉的…主人的肉棒…热乎乎的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3019',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还没調教完成的尻穴被尽可能地扩张开、%SAVESTR:PLAYER%开始毫不留情的抽送起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3020',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3022',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3023',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3025',
        any: [
          /PRINTFORMW 「啊～啊哈啊～…已、已经…只要有屁股就好了～…变成菊穴専用奴隷了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3026',
        any: [
          /PRINTFORMW 「啊咿呓～%UNICODE\(0x2661\) \*1% 屁股～屁股～！…啊啊啊～…已、已经…心神俱醉了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3027',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%像已经完全沉迷于肛门性交中似的样子、垂直分开的肛门不像话地张开并包住了%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3028',
        any: [
          /PRINTFORMW 「啊啊啊嗯～…啊～啊啊～…啊啊啊啊嗯～%UNICODE\(0x2661\) \*1%…像要让屁股怀孕般地射精吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3029',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3030',
        any: [
          /PRINTFORMW 「啊啊～…咕～…呜呼～…呜呜～…咕呜～…噫～咿呓～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3031',
        any: [
          /PRINTFORMW 被毫不留情的侵犯肛门的%SAVESTR:TARGET%正脸朝下趴着、一边努力地抬起小屁股一边呻吟着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3032',
        any: [
          /PRINTFORMW 「啊啊啊～…我、已经…为了能被侵犯屁股…不管什么事都会去做了…主人啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3034',
        any: [
          /PRINTFORMW 「嗯呼呜呜呜～…啊呜～…呜～…啊啊啊啊～…我的屁股～…变成主人的飞机杯了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3035',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧缩起来的肛门、已经变得不管被什么东西插入都会产生快感了吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3036',
        any: [
          /PRINTFORMW 「啊咿～…咿～噫咿咿咿～…我的…菊、菊穴…能被肉棒插进来真是太感谢了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3038',
        any: [
          /PRINTFORMW 「啊～啊哈啊～…已、已经…只要有屁股就够了～…变成菊穴専用奴隷了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3040',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3042',
        any: [
          /elseIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3043',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3045',
        any: [
          /PRINTFORMW 「啊啊啊～…真是的…我的处女…快点夺走吧～～～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3046',
        any: [
          /PRINTFORMW 「咿～噫咿～…用屁股好有感觉啊～…主人的鸡鸡…感觉到了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3047',
        any: [
          /PRINTFORMW 在後背位下可以很明显的观察到经受了多次尻穴調教后的肛门紧缩了起来、%SAVESTR:PLAYER%一边舔着嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3048',
        any: [
          /PRINTFORMW 「啊啊～…主人的鸡鸡…真棒～…啊～啊哈啊～啊～啊呜呜嗯～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3051',
        any: [
          /PRINTFORMW 「呐、呐～…好好地抱我嘛～…用主人的拿东西夺走我的处女嘛～………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3052',
        any: [
          /PRINTFORMW 「呃！噫咿～～…咿～呓～…啊啊啊～…屁股…有感觉了…好有感觉哦～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门每当被%SAVESTR:PLAYER%用阴茎连根插入便会一颤一颤的、小屁股的震动尽收眼底并不断地继续抽插着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3054',
        any: [
          /PRINTFORMW 「啊呀～%UNICODE\(0x2661\) \*1%…咿～呓～%UNICODE\(0x2661\) \*1%…我、我的…屁股、屁股要变得奇怪了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3056',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3058',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3059',
        any: [
          /PRINTFORMW 「啊啊啊～…啊～…哈啊…主、主人～%UNICODE\(0x2661\) \*1%…再温柔点～…啊～啊啊～……！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3060',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的还没調教完成的尻穴被尽可能地扩张开、%SAVESTR:PLAYER%的阴茎被紧紧收缩起来的肛门刺激的很舒服………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3062',
        any: [
          /PRINTFORMW 「呐、呐～…不要光是屁股…把我的处女也…早点夺走吧～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3063',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3065',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3066',
        any: [/PRINTFORMW 「啊～…啊啊啊～…哈～…啊咕呜～…我…明明不是狗～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3067',
        any: [
          /PRINTFORMW 抓住并侵犯着%SAVESTR:TARGET%的小屁股、可以很明显地发现肛门收缩起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3068',
        any: [
          /PRINTFORMW 「啊～…啊呜呜～…收缩起来了…我的…屁股…变得奇怪了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3069',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3071',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3072',
        any: [/PRINTFORMW 「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3073',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被阴茎毫不留情地蹂蹑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3074',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3083',
        any: [/IF SELECTCOM == 28/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3085',
        any: [/IF CFLAG:TARGET:329 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3087',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3088',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3089',
        any: [
          /PRINTFORMW 「主人啊啊~…屁、屁股…好深啊~…啊啊~%UNICODE\(0x2661\) \*1%更加激烈地…做吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3090',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的被调教过扩张过的尻穴十分容易就将%SAVESTR:PLAYER%的阴茎给吞进去了、少女的肛门慢慢地变成了愉悦的性用品了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3092',
        any: [
          /PRINTFORMW 「啊~…啊嗯~…啊、啊啊…俺、俺会…好好地动起来的啦…啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3093',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸淫荡的表情有点生疏的前后动起了腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3096',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3097',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3098',
        any: [
          /PRINTFORMW 「啊~啊呜呜~…屁股被扩张了呜…主人的大鸡巴全部都进去了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3099',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门十分容易地就接受了%SAVESTR:PLAYER%的阴茎。少女的表情不断地变得荡漾起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3101',
        any: [
          /PRINTFORMW 「啊啊~…主人~…啊~啊啊~…大鸡巴…全部进去了呀~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3102',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%抱住%SAVESTR:PLAYER%将忍耐已久的阴茎撑开肛门慢慢地埋了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3106',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3107',
        any: [/PRINTFORMW 「啊~…嗯呀~…哈~…拔出来…啊啊~啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3108',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门十分容易地就接受了%SAVESTR:PLAYER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3110',
        any: [/PRINTFORMW 「啊~啊啊啊~…那、那里是…屁股来的…啊~…啊啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3111',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的阴茎毫不留情地蹂蹑了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3114',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3119',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:329 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3120',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3122',
        any: [
          /PRINTFORMW 「请、请更多地…侵犯菊穴吧～%UNICODE\(0x2661\) \*1%…小穴什么的已经无所谓啦～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3123',
        any: [
          /PRINTFORMW 「啊啊～啊咿～～…嗯咿～～…主人～%UNICODE\(0x2661\) \*1%…我、我…咿咿噫～、被、插得不行了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3124',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的淫乱肛门完全变成了性器、每被从下往上插%SAVESTR:TARGET%就感到如痴如醉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3125',
        any: [
          /PRINTFORMW 「啊啊～…煮～仁～…煮～仁～%UNICODE\(0x2661\) \*1%…我、我…又、又要去了呃呃呃～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3126',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3127',
        any: [
          /PRINTFORMW 「太棒了～～%UNICODE\(0x2661\) \*1% …主人的肉棒%UNICODE\(0x2661\) \*1% …在搅动菊穴～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3129',
        any: [
          /PRINTFORMW 「小穴什么的已经无所谓啦～%UNICODE\(0x2661\) \*1% 一直肛交下去吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3130',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每当肛门被插、被搅动、被侵犯。她的全身就会因为暴力般的刺激而感到快楽。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3131',
        any: [
          /PRINTFORMW 「啊呀呀～…菊穴真爽～%UNICODE\(0x2661\) \*1%…菊穴真爽～%UNICODE\(0x2661\) \*1%…真爽～%UNICODE\(0x2661\) \*1%…真爽～%UNICODE\(0x2661\) \*1%…真爽～%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3133',
        any: [
          /PRINTFORMW 「呀哈啊～%UNICODE\(0x2661\) \*1%…啊啊～%UNICODE\(0x2661\) \*1%…屁、屁股要化了…已、已经…已经…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3134',
        any: [
          /PRINTFORMW 每当肛门被插%SAVESTR:TARGET%就会紧紧抱住%SAVESTR:PLAYER%、不断地发出嬌喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3135',
        any: [
          /PRINTFORMW 「啊啊哈啊啊…又、又…又要不行了～…菊穴要融化了…要变不回去了～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3137',
        any: [/CFLAG:329 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3139',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3140',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3142',
        any: [
          /PRINTFORMW 「啊呜呜～…呐、呐～…为什么只是对屁股…啊啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3143',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门一被阴茎连根插入、便向将其从少女变成大人的%SAVESTR:PLAYER%撒起娇来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3144',
        any: [
          /PRINTFORMW 「啊咿～啊啊啊…主人…屁股…好棒…好棒哦…%UNICODE\(0x2661\) \*1% 嗯啾嗯啾呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3145',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%纠缠不休的与%SAVESTR:PLAYER%不断接吻的同时、自己前后动起了腰贪求着快楽。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3146',
        any: [
          /PRINTFORMW 「嗯啾～…啾～…啾%UNICODE\(0x2661\) \*1%…就这样…射精吧～…在我的屁股里…射精吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3148',
        any: [
          /PRINTFORMW 一抓住%SAVESTR:TARGET%的腰%SAVESTR:PLAYER%就用阴茎插进肛门开始侵犯起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3149',
        any: [
          /PRINTFORMW 「啊～啊啊啊～…主人啊啊…屁、屁股…继续…操～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3150',
        any: [
          /PRINTFORMW 经由尻穴調教被拡張开的肛门轻松地吞下了%SAVESTR:PLAYER%的阴茎、菊穴变成了快楽的坩堝。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3151',
        any: [
          /PRINTFORMW 「啊呜呜呜…屁股好爽～…好爽～%UNICODE\(0x2661\) \*1% 被干得好爽～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3153',
        any: [/CFLAG:329 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3155',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3156',
        any: [
          /PRINTFORMW 「啊～…啊嗯～…啊、啊啊…我、我…有好好地动腰…了啊啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3157',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸陶醉地前后晃着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3158',
        any: [
          /PRINTFORMW 「啊啊～…好、好激烈…嗯啊～…啊～…啊呜呜～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3159',
        any: [/CFLAG:329 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3161',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3162',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3163',
        any: [
          /PRINTFORMW 「嗯啊呜呜～…菊穴好爽啊～～%UNICODE\(0x2661\) \*1%…光用屁股就高潮了～%UNICODE\(0x2661\) \*1% 高潮了～～～%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3164',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门很轻易地吞下了%SAVESTR:PLAYER%的阴茎、只是品尝这一快楽就变得神情荡漾。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3165',
        any: [
          /PRINTFORMW 「再来～…侵犯我的菊穴吧～…被主人的大肉棒侵犯实在是太棒了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3167',
        any: [
          /PRINTFORMW 「已、已经…小穴什么的已经随便怎样都好了…只要…菊穴…舒服…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3168',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3169',
        any: [
          /PRINTFORMW 「啊呜～…嗯～…呼呜～…啊啊…主人～…喜欢…喜欢…菊穴做爱好喜欢～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3170',
        any: [
          /PRINTFORMW 被毫不留情的侵犯肛门的%SAVESTR:TARGET%抱住%SAVESTR:PLAYER%品味着肛门的快楽。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3171',
        any: [
          /PRINTFORMW 「还要…更多…再激烈点也可以哦～…狠狠地把菊穴弄坏吧～～%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3173',
        any: [
          /PRINTFORMW 「啊啊…啊…嘿啊啊啊啊啊…要融化了…下半身要融化了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3174',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门经过多次調教完全成为了性器、即使粗暴地对待也会发出愉悦的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3175',
        any: [
          /PRINTFORMW 「啊哈啊～…啊～啊呜呜～…主人～%UNICODE\(0x2661\) \*1% 主人～%UNICODE\(0x2661\) \*1% 主人啊啊啊～%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3177',
        any: [
          /PRINTFORMW 「啊～啊哈啊～…我、已经…不会再说任性的话了…变成菊穴専用奴隷了～～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3179',
        any: [/CFLAG:329 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3181',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3182',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3184',
        any: [
          /PRINTFORMW 「啊呜～真是的…再这样下去只有屁股才会有感觉呜～快点夺走处女吧～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3185',
        any: [
          /PRINTFORMW 「啊～啊呜呜～…屁股被撑开了…感觉到被主人的鸡鸡全部插进了～～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3186',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧抱住%SAVESTR:PLAYER%、每当肛门被插便会发出呻吟声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3187',
        any: [
          /PRINTFORMW 「啊哈啊～…啊啊～…啊啊～哈啊啊～…已、已经不行了…饶了我吧…主人～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3190',
        any: [
          /PRINTFORMW 「就这、这样抱我嘛…用主人的东西夺走我的处女吧～………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3191',
        any: [
          /PRINTFORMW 「呀咿～…咿～咿～…啊啊啊～…屁股…好有感觉～…好有感觉哦～………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3192',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抓住腰不断地蹂躙着肛门、看着发出可愛悲鳴的%SAVESTR:TARGET%、%SAVESTR:PLAYER%舔了舔嘴唇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3193',
        any: [
          /PRINTFORMW 「啊呀～%UNICODE\(0x2661\) \*1%…咕咿～%UNICODE\(0x2661\) \*1%…屁、屁股…缩起来了缩起来了…啊呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3195',
        any: [/CFLAG:329 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3197',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3198',
        any: [
          /PRINTFORMW 「啊啊~…主人啊~…啊~啊啊~…大鸡巴…全部进来啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3199',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%紧紧地抱住%SAVESTR:PLAYER%忍耐的同时，%SAVESTR:PLAYER%缓慢地将阴茎塞了进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3200',
        any: [
          /PRINTFORMW 「啊啊…不、不行~…再、再这样捅下去的话…要…要坏掉了~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3202',
        any: [
          /PRINTFORMW 「啊~啊啊啊…只欺负屁股什么的…啊嗯~…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3203',
        any: [/CFLAG:329 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3205',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3206',
        any: [
          /PRINTFORMW 「啊~…嗯呀~…再、再这样下去的话…全部进去了…啊~啊啊呜呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3207',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被开发过的肛门十分容易地就接受了%SAVESTR:PLAYER%的阴茎、少女的腰在不知不觉中晃动了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3208',
        any: [/PRINTFORMW 「啊啊啊啊~…腰、腰自…自己就…动起来了呜呜~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3209',
        any: [/CFLAG:329 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3211',
        any: [/ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3212',
        any: [/PRINTFORMW 「啊~啊啊~啊~…屁~屁股…不要啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3213',
        any: [/PRINTFORMW %SAVESTR:TARGET%的肛门被阴茎毫不留情地蹂蹑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3214',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3223',
        any: [/IF SELECTCOM == 29/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3225',
        any: [/IF CFLAG:TARGET:330 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3227',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3228',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3229',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被从后面抱着，饱经开发的肛穴被鸡巴插入时、口中漏出了甜媚的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3230',
        any: [
          /PRINTFORMW 「啊咿~…噫…深深的好爽%UNICODE\(0x2661\) \*1%…主人的大鸡巴%UNICODE\(0x2661\) \*1%…全部品尝到了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3232',
        any: [
          /PRINTFORMW 「啊啊~…深深的好舒服…哦哦~啊%UNICODE\(0x2661\) \*1% 俺的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3233',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%从她身后插入了肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3236',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3237',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3238',
        any: [
          /PRINTFORMW 「主、主人啊…这、这个姿势什么的好羞人…啊啊啊~呀嗯~咿%UNICODE\(0x2661\) \*1%…啊啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3239',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开发过的肛门被鸡巴强行侵入、插进了一半%SAVESTR:TARGET%就变得老实了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3240',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%温柔的揉胸引起了一声声甜美的呼唤。%SAVESTR:TARGET%一次又一次的收缩着直肠催促他射精。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3241',
        any: [
          /PRINTFORMW 「啊啊~…啊咿~…咦…好棒…好棒呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3243',
        any: [
          /PRINTFORMW 「啊啊啊~…呼…插太深了插太深了啦…鸡、鸡巴这不是全部插进来了嘛%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3244',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%温柔的从后面抱起%SAVESTR:TARGET%慢慢地插入了她的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3248',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3249',
        any: [
          /PRINTFORMW 「啊咕…嗯呀…全、全部进来了…啊啊~…啊咿~噫嗯~…去了~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3250',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开发过的直肠开心的绞紧了%SAVESTR:PLAYER%插进来的肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3252',
        any: [
          /PRINTFORMW 「把、把脚掰那么开的话…啊~！啊、啊咕呜…好、深…不、不行啦…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3253',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的鸡巴无情的蹂躏着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3256',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3261',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:330 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3262',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3264',
        any: [
          /PRINTFORMW 「真、真是的…肛穴这样被干的话%UNICODE\(0x2661\) \*1%…小穴什么根本不需要啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3265',
        any: [
          /PRINTFORMW 「啊啊~…好棒…好舒服…大肉帮最喜欢了%UNICODE\(0x2661\) \*1%…喜欢%UNICODE\(0x2661\) \*1%肉棒大爱%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3266',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门已经完全成为性器了、只是从下面插进来的程度就让快乐在少女脑中回荡了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3267',
        any: [
          /PRINTFORMW 「脑、脑袋要变得奇怪了%UNICODE\(0x2661\) \*1%…除了小肛穴以外的事情怎么样都好啦%UNICODE\(0x2661\) \*1%…大鸡巴…啊啊啊~啊呜~…啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3268',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3269',
        any: [
          /PRINTFORMW 「啊啊~…啊哈啊~…肛穴被干着%UNICODE\(0x2661\) \*1%…被侵犯着有感觉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3271',
        any: [
          /PRINTFORMW 「小穴什么的已经不需要啦%UNICODE\(0x2661\) \*1% 一直、一直做肛穴SEX就咿咿咿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3272',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%左右晃动着她的小屁股的同时将%SAVESTR:PLAYER%的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3273',
        any: [
          /PRINTFORMW 「啊嘿呀啊~…大鸡巴…最棒了呀%UNICODE\(0x2661\) \*1% 更多…更多插进来…射出好多好多吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3275',
        any: [
          /PRINTFORMW 「啊啊啊、啊呀啊嗯~…干、干坏掉吧…俺的肛穴开始…全部…全部干到坏掉吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3277',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3279',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3280',
        any: [
          /PRINTFORMW 「奶子…再欺负俺的奶子…扭、扭断了也没关系%UNICODE\(0x2661\) \*1%…啊啊~…啊哈啊啊~…啊呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3281',
        any: [
          /PRINTFORMW 胸部被抓着肛门再次被侵犯的%SAVESTR:TARGET%发出了狂乱的娇喘。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3282',
        any: [
          /PRINTFORMW 「啊唏呀啊嗯~…超赞…哦哦…啊哈啊啊…肛穴里面已经变得黏糊糊的了%UNICODE\(0x2661\) \*1%…好想要精液呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3284',
        any: [/CFLAG:330 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3286',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3287',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3289',
        any: [
          /PRINTFORMW 「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3290',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%从她身后插入了肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3291',
        any: [
          /PRINTFORMW 「啊啊~…这么深好棒…哦哦啊啊~%UNICODE\(0x2661\) \*1% 人家的肛门都被撑大了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3293',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3295',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3296',
        any: [
          /PRINTFORMW 「啊啊啊嗯~…好棒%UNICODE\(0x2661\) \*1%…好棒啊%UNICODE\(0x2661\) \*1%…俺…已、已经…啊啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3298',
        any: [
          /PRINTFORMW 「主人大人%UNICODE\(0x2661\) \*1%…喜欢~喜欢%UNICODE\(0x2661\) \*1%…肛门sex最喜欢了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3299',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边甜甜的叫着一边在%SAVESTR:PLAYER%的腰上狂乱的舞蹈着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3301',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3303',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3304',
        any: [
          /PRINTFORMW 「胸部被揉着的话…哈呜呜…啊~…啊呜呜呜嗯~…啊呀啊…已、已经…要不行了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3306',
        any: [/CFLAG:330 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3308',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3310',
        any: [
          /PRINTFORMW 「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3311',
        any: [
          /PRINTFORMW 「啊啊~…这么深好棒…哦哦啊啊~%UNICODE\(0x2661\) \*1% 人家的肛门都被撑大了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3312',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%抱着%SAVESTR:TARGET%从她身后插入了肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3314',
        any: [
          /PRINTFORMW 然后从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3316',
        any: [
          /PRINTFORMW 然后从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3317',
        any: [/CFLAG:330 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3319',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3320',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3321',
        any: [
          /PRINTFORMW 「啊啊~…哈呜呜~…肉棒全部进来了%UNICODE\(0x2661\) \*1%…俺的肛穴里面…全部进来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3322',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%左右晃动着她的小屁股的同时将%SAVESTR:PLAYER%的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3323',
        any: [
          /PRINTFORMW 「啊哈啊～%UNICODE\(0x2661\) \*1%…好爽…好爽…肛穴sex稀饭（喜欢）%UNICODE\(0x2661\) \*1%…坠稀饭惹（最喜欢了）%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3325',
        any: [
          /PRINTFORMW 「再、再来…永远永远…干俺的肛穴啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3326',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3327',
        any: [
          /PRINTFORMW 「啊哈啊啊啊~…好深%UNICODE\(0x2661\) \*1% 大鸡巴全部进来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3328',
        any: [
          /PRINTFORMW 直肠被无情的侵犯着的%SAVESTR:TARGET%感受着肛门的抽插，发出一声声愉悦的喊叫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3329',
        any: [
          /PRINTFORMW 「再来…再来%UNICODE\(0x2661\) \*1%…更激烈的…请把俺的肛门插坏吧%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3331',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的叫喊声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3333',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的叫喊声………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3335',
        any: [/PRINTFORMW 「软掉了…俺的腰…已经软掉了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3336',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%如同性器一样的肛门紧紧的绞紧%SAVESTR:PLAYER%的阴茎，一下下催促着射精。。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3337',
        any: [
          /PRINTFORMW 「嗯噫…咿…啊噫…就这样射出来%UNICODE\(0x2661\) \*1%…让俺的肛穴染上精液的味道吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3338',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%翻着白眼吐出零落的淫语、好像坏掉一样舞动着腰肢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3340',
        any: [
          /PRINTFORMW 「啊啊~…哈咕呜嗯~…小、小穴什么的缝起来就好了%UNICODE\(0x2661\) \*1%…一、一生都处女肛穴奴隶也不错咿咿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3342',
        any: [/CFLAG:330 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3344',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3345',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3346',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%从%SAVESTR:TARGET%插着肛门，同时刺激着她的阴蒂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3348',
        any: [
          /PRINTFORMW 「啊呜~真是的…这个样子呀…手、手指也好…把处女拿去嘛…啊哈啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3349',
        any: [
          /PRINTFORMW 「啊~啊呜呜~…嗯~…嗯咕呜…这、这么温柔的话…啊~啊啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3350',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出了甜美的叫声、肛门继续被侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3351',
        any: [
          /PRINTFORMW 「啊~…啊呜~…啊啊啊啊…屁股没力气了…已、已经…不、不行啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3353',
        any: [
          /PRINTFORMW 「啊啊~…啊~…啊哈啊～%UNICODE\(0x2661\) \*1%…主人…喜欢…喜欢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3355',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3357',
        any: [
          /PRINTFORMW 从%SAVESTR:TARGET%身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3358',
        any: [
          /PRINTFORMW 「啊呼呜…胸、胸部被揉着的话…要、要去了呀…啊~%UNICODE\(0x2661\) \*1% 哦噢！嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3359',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%发出了甜美的叫声在%SAVESTR:PLAYER%的腰上撒着娇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3360',
        any: [
          /PRINTFORMW 「嗯呀~…啊啊啊啊…啊哈~%UNICODE\(0x2661\) \*1%…啊~啊啊啊~%UNICODE\(0x2661\) \*1%…哈~…哈咿咿%UNICODE\(0x2661\) \*1%…好…好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3362',
        any: [/CFLAG:330 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3364',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3366',
        any: [
          /PRINTFORMW 「啊~啊啊啊…这样…只欺负屁股的话…嗯~…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3367',
        any: [
          /PRINTFORMW 「主人…稍微…温柔一些…啊~…啊哈啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3368',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被%SAVESTR:PLAYER%从后面抱着，火热的肉棒在肛门里搅动。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3370',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被从身后温柔的抚摸着，发出了甜润的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3372',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳被从身后温柔的抚摸着，发出了甜润的喘息声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3373',
        any: [
          /PRINTFORMW 「啊啊…哈啊~…啊啊~…再、再…再继续的话哈啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3374',
        any: [/CFLAG:330 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3376',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3377',
        any: [
          /PRINTFORMW 「啊咕…嗯呀…全、全部进来了呢…啊啊~…啊咿~咦嗯~…去了~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3378',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%开发后的肛门轻松地吞入了%SAVESTR:PLAYER%的阴茎，并一下下的吞吐着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的巨乳被从身后温柔的抚摸着，突然发出了煽情的叫声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3382',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的爆乳被从身后温柔的抚摸着，突然发出了煽情的叫声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3383',
        any: [/PRINTFORMW 「啊噫~…胸、胸部这样子被摸的话…啊~啊啊啊~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3384',
        any: [/CFLAG:330 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3386',
        any: [/ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3387',
        any: [/PRINTFORMW 「啊、啊咕~…好、深…不、不要…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3388',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被%SAVESTR:PLAYER%的阴茎无情的蹂躏着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3389',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3398',
        any: [/IF SELECTCOM == 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3400',
        any: [/IF CFLAG:TARGET:331 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3402',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3403',
        any: [
          /PRINTFORMW 「大鸡巴…啊啊…好烫啊…居然那么硬…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3405',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3406',
        any: [
          /PRINTFORMW 「大鸡巴好热啊~…这个就是要进到我身体里面的东西来的呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3408',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3409',
        any: [
          /PRINTFORMW 「这、这样子做的话…会、会不会舒服的啊…如、如果舒服的话要说出来噢？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3412',
        any: [/PRINTFORMW 「呜呜…这样的…不要啊…啊啊…感觉好恶心啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3414',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3419',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3420',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3421',
        any: [
          /PRINTFORMW 「主人的大鸡巴…好烫好大呀~…用俺的手变得更加舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3422',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将鼻尖伸向阴茎不断地闻着阴茎的味道、慢慢的鼻息变得慌乱起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3423',
        any: [
          /PRINTFORMW 「啊~啊啊啊~…好有味道…好H的味道啊…俺、俺的…脑子要融化掉了~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3425',
        any: [
          /PRINTFORMW 「就这样…射出精液的话…俺…就要去了噢~…只是被射了精液而已俺就要去了噢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3427',
        any: [
          /PRINTFORMW 「哈啊…哈啊…大鸡巴~%UNICODE\(0x2661\) \*1%…大鸡巴~%UNICODE\(0x2661\) \*1%…只是触摸一下而已…俺就要去了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3428',
        any: [
          /PRINTFORMW 少女所说的话看起来并不是谎言、%SAVESTR:TARGET%在用手给阴茎爱抚的同时、不断地摩擦着自己的大腿内侧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3429',
        any: [
          /PRINTFORMW 「俺想要主人的大鸡巴在俺的手中射出来啊%UNICODE\(0x2661\) \*1%…接着…俺也会去了的啦~%UNICODE\(0x2661\) \*1%…啊~啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3431',
        any: [
          /PRINTFORMW 「好想要精液…主人的精液~…好想让精液就这样直接射到俺的脸上啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3433',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3435',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3436',
        any: [
          /PRINTFORMW 「大鸡巴…啊啊…好烫…居然那么硬~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3437',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇的同时不断撸着阴茎、如果允许她放开干的话很有可能立马就会舔舐起阴茎的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3439',
        any: [
          /PRINTFORMW 「精液…好想要啊~…主人的…精液~…精液~…好想要精液啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3440',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3442',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3443',
        any: [/IF RAND:100 >= 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3444',
        any: [
          /PRINTFORMW 「哈啊~%UNICODE\(0x2661\) \*1%…哈啊~%UNICODE\(0x2661\) \*1%…变得舒服起来吧~~、主人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3445',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%对给阴茎侍奉的这件事看成她平生至上的喜悦、十分疼爱地摩擦着阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3446',
        any: [
          /PRINTFORMW 「大鸡巴%UNICODE\(0x2661\) \*1%…又硬又烫又大的大鸡巴%UNICODE\(0x2661\) \*1%…好棒啊啊~%UNICODE\(0x2661\) \*1%…变得舒服起来吧~~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3448',
        any: [
          /PRINTFORMW 「为了让主人随时射出来都没有问题所以早就将嘴巴准备好了…往俺的嘴巴里用精液射地满满的吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3450',
        any: [
          /PRINTFORMW 「嗯~…黏黏糊糊地液体出来好多了呢~主人~%UNICODE\(0x2661\) \*1%…这就代表主人现在很舒服对吧~？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3451',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地微笑着来回舔着嘴唇、将冒出来的前列腺液从龟头开始涂满整个阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3452',
        any: [
          /PRINTFORMW 「用俺的手…变得…变得更加舒服起来吧~%UNICODE\(0x2661\) \*1%…全部都射出来吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3454',
        any: [
          /PRINTFORMW 「精液…想要全部都喝下去呢…精液…精液好想要啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3456',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3458',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:331 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3459',
        any: [
          /PRINTFORMW 「大鸡巴好热啊~…%UNICODE\(0x2661\) \*1% 俺会更加地上下摩擦的啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3460',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%兴奋到口水都留下来的样子、紧紧地抓住阴茎不停地撸着，甚至已经有些疼的程度………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3461',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3463',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3464',
        any: [/PRINTFORMW 「呜、呜嗯…会变得舒服起来的地方…差不多搞懂了呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好想觉得有些有趣地样子继续地撸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3466',
        any: [
          /PRINTFORMW 「啊~、刚刚跳了一下呢…原来是这呀…这里很舒服来的啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3467',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3469',
        any: [/ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3470',
        any: [/PRINTFORMW 「俺、俺的手被…弄脏了呜…被弄脏了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3471',
        any: [
          /PRINTFORMW 一副打从心底里厌恶的样子的%SAVESTR:TARGET%还是按照命令那样不断地用她的小手上下地摩擦着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3472',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3481',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3483',
        any: [/IF CFLAG:TARGET:332 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3485',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3486',
        any: [
          /PRINTFORMW 「啊啊嗯~…能用嘴巴来侍奉主人的大鸡巴真是好高兴啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3487',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%毫不犹豫地将%SAVESTR:PLAYER%的阴茎含进了嘴巴十分高兴地舔舐了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3489',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3490',
        any: [
          /PRINTFORMW 「主人的…大鸡巴…%UNICODE\(0x2661\) \*1% 啊啊嗯~…嗯~…啊呜…嗯哼唔…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3491',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分下流地用嘴巴亲吻了阴茎前端不知道多少次后便含进去了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3493',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3494',
        any: [
          /PRINTFORMW 「只、只要用嘴巴…就可以了对吧…啊~啊嗯~…嗯~…嗯~…啾~…啾唔~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%小心翼翼的把阴茎含在嘴里、舔了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3498',
        any: [
          /PRINTFORMW 「明…明白了啦…只、只要用嘴巴来就可以了对吧…这样的…才、才没有什么问题的啦…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3499',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%皱着眉头一副十分胆怯的样子舔起了阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3501',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3506',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3507',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3508',
        any: [
          /PRINTFORMW 「嗯唔呜嗯~…嗯啾呜…啾呜呜~%UNICODE\(0x2661\) \*1%…大鸡巴…最喜欢了…大鸡巴最喜欢了噢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3509',
        any: [/PRINTFORMW %SAVESTR:TARGET%说着卑劣的话语的同时来回进行着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3510',
        any: [
          /PRINTFORMW 「好像就这样吮吸主人的大鸡巴啊…让俺一直吮吸主人的大鸡巴吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3511',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3512',
        any: [
          /PRINTFORMW 「嗯啊啊~…嗯唔~…嗯啾~…啾~啾唔~…哼啊啊啊…好像更加激烈地吮吸大鸡巴啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3513',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%眼角浮出眼泪的同时用舌头缠绕着阴茎、炽热的吐息吹向了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3514',
        any: [
          /PRINTFORMW 「用嘴白来侍奉大鸡巴好舒服啊~%UNICODE\(0x2661\) \*1% 俺会更加更加积极地吮吸大鸡巴噢~…呸咯~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3516',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用嘴唇含着阴茎前端的同时向上仰视着%SAVESTR:PLAYER%、看来是想要看到这边的反应的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3517',
        any: [
          /PRINTFORMW 「嗯啾~…啾唔%UNICODE\(0x2661\) \*1%…嗯哼哼…呸咯…啾~呸咯~…噗哈~…主人~…发出更厉害的声音出来嘛~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3518',
        any: [
          /PRINTFORMW 「只要看到主人的眼睛就可以知道主人舒不舒服了噢？嗯哼哼~ …啾~啾啪~%UNICODE\(0x2661\) \*1%…呸咯~…嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3520',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3522',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3523',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3524',
        any: [
          /PRINTFORMW 「主人的大鸡巴~%UNICODE\(0x2661\) \*1%…真美妙呢~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3525',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分有感觉地轻轻喘息着的同时积极地将阴茎含进了口中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3526',
        any: [
          /PRINTFORMW 「嗯呜~…嗯~嗯~%UNICODE\(0x2661\) \*1%…啾~…啾噗~呸咯哦~…嗯~嗯噗呜%UNICODE\(0x2661\) \*1%…舒服啦？啾~…啾呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3527',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3528',
        any: [
          /PRINTFORMW 「好喜欢大鸡巴…能侍奉那么雄伟的大鸡巴真是好幸福呢~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3529',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地样子进行起了口腔奉仕、小小的嘴巴张得大大地将阴茎含进去用舌头缠绕上去了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3530',
        any: [
          /PRINTFORMW 「嗯啾~%UNICODE\(0x2661\) \*1%…啾~…呸咯…呸咯~…嗯哼唔%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3532',
        any: [
          /PRINTFORMW 「嗯啊啊…%UNICODE\(0x2661\) \*1% 好喜欢啊~…主人的大鸡巴~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3533',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分下流得将嘴巴张开，把舌头伸了出来开始舔了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3534',
        any: [
          /PRINTFORMW 「啊~啊~…大鸡巴~%UNICODE\(0x2661\) \*1%…好棒啊…俺会更加地侍奉主人的~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3536',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3538',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3539',
        any: [
          /PRINTFORMW 「用、用俺的嘴巴来…弄干净吧…啊啊~…嗯~…嗯啾…啾唔~…呸咯~…嗯唔………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3540',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小嘴长得大大的十分积极地舔舐着阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3541',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3543',
        any: [/ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3544',
        any: [/PRINTFORMW 「啊呜~…嗯~…嗯~…嗯啾…呸咯~…嗯~…嗯啊…哈啊…哈啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3545',
        any: [/PRINTFORMW %SAVESTR:TARGET%并不是很积极地在舔的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3546',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3555',
        any: [/IF SELECTCOM == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3557',
        any: [/IF CFLAG:TARGET:333 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3559',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3560',
        any: [
          /PRINTFORMW 「啊嗯~…胸部在被抽插着呢~…%UNICODE\(0x2661\) \*1% 就这样将胸部侵犯了吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3561',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%露出了一副淫乱的笑容开始侍奉起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3563',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3565',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3567',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3568',
        any: [
          /PRINTFORMW 「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3569',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜的微笑着，继续对着阴茎进行着侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3571',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3573',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3575',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3576',
        any: [/PRINTFORMW 「嗯~…啊呜…大鸡巴…好烫…啊~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3577',
        any: [/PRINTFORMW %SAVESTR:TARGET%对着被胸部夹着的阴茎兴奋起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3579',
        any: [/PRINTFORMW 少女温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3581',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3584',
        any: [/PRINTFORMW 「这样的…感觉好恶心啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3586',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3588',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3590',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3595',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3596',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3597',
        any: [/PRINTFORMW 「用胸部来侍奉好舒服啊~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3598',
        any: [
          /PRINTFORMW 「俺的胸部…正在被主人的大鸡巴来回抽插着呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3599',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸淫笑地对着阴茎进行着侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3601',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3603',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3605',
        any: [
          /PRINTFORMW 「胸部是主人的东西来的啦…所以更加激烈地侵犯也可以噢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3606',
        any: [
          /PRINTFORMW 「哈嗯~…乳头在被来来回回地摩擦着呢啊呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3607',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸淫笑地对着阴茎进行着侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3609',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3611',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3613',
        any: [/CFLAG:333 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3615',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3616',
        any: [
          /PRINTFORMW 「嗯~…嗯哼唔…就这样侵犯着俺的胸部吧~～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3617',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸淫笑地对着阴茎进行着侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3619',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3621',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3622',
        any: [/CFLAG:333 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3624',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3625',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3626',
        any: [
          /PRINTFORMW 「大鸡巴…用俺的胸部变得舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3627',
        any: [
          /PRINTFORMW 「主人啊嗯~…俺会…用尽全力来侍奉的啦~…啊~…啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3628',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜的微笑着，继续对着阴茎进行着侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3630',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3632',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3634',
        any: [/PRINTFORMW 「主人的大鸡巴…真美妙呢~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3635',
        any: [
          /PRINTFORMW 「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3636',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜的微笑着，继续对着阴茎进行着侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3638',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3640',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3642',
        any: [/CFLAG:333 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3644',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3645',
        any: [/PRINTFORMW 「嗯~…啊呜…大鸡巴…好烫…啊~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3646',
        any: [/PRINTFORMW %SAVESTR:TARGET%对着被胸部夹着的阴茎兴奋起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3648',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把巨乳压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3650',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3651',
        any: [/CFLAG:333 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3653',
        any: [/ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3654',
        any: [/PRINTFORMW 「胸部…在被侵犯着…不要啊…~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3656',
        any: [/PRINTFORMW %SAVESTR:TARGET%用这巨大化的乳房侍奉着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3658',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用温柔地把完全不平衡地巨大化的乳房侍奉着………………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3659',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3668',
        any: [/IF SELECTCOM == 33/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3670',
        any: [/IF CFLAG:TARGET:334 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3672',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3673',
        any: [
          /PRINTFORMW 「哈啊~…请、请不要捉弄俺啦~…主人啊嗯~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3674',
        any: [/PRINTFORMW %SAVESTR:TARGET%用舌头舔着嘴唇的同时摩擦着股间………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3676',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3677',
        any: [
          /PRINTFORMW 「啊啊~…嗯啊啊~…大鸡巴好热啊~…变得奇怪起来了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3678',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像十分羞耻的样子，缓慢地摩擦着股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3681',
        any: [/PRINTFORMW 「啊啊…哈啊…哈啊…这、这样的…这样的好羞耻啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3682',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%脸变得通红的情况下继续进行着素股play………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3684',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3689',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3690',
        any: [
          /PRINTFORMW 「哈啊~…请、请不要捉弄俺啦~…主人~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3691',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%从嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3692',
        any: [
          /PRINTFORMW 「就这样…哈~…进来吧~…大、大鸡巴…好想要啊%UNICODE\(0x2661\) \*1% 收下俺的处女嘛~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3693',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次要想插进去而想要将腰对准的时候都被紧紧着抓住了腰部继续着素股play。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3694',
        any: [
          /PRINTFORMW 「差、差不多就好了啦…再这样下去的话等下俺就要强行侵犯主人了啦…啊~…啊啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3695',
        any: [/CFLAG:334 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3697',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3698',
        any: [
          /PRINTFORMW 「啊~啊哈啊~%UNICODE\(0x2661\) \*1%…请、请不要捉弄俺啦~…主人~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3699',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3700',
        any: [
          /PRINTFORMW 「嗯~…啊嗯~…啊啊啊~…大鸡巴好热啊…要变奇怪起来了呜~%UNICODE\(0x2661\) \*1%…要变奇怪起来了啦~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3701',
        any: [/CFLAG:334 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3703',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3704',
        any: [
          /PRINTFORMW 「啊啊~…嗯啊啊…大鸡巴好热啊~…感觉要变奇怪了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3705',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将腰十分下流的晃动着的同时用阴唇摩擦着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3706',
        any: [
          /PRINTFORMW 「主、主人…如果要将精液射出来的话…就、就在俺的里面…射、射出来…射出来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3707',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸想要哭出来，不像样子的表情看着%SAVESTR:PLAYER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3708',
        any: [
          /PRINTFORMW 「就这样夺走俺的处女吧…拜托了嘛~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3709',
        any: [/CFLAG:334 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3711',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3712',
        any: [
          /PRINTFORMW 「啊啊~…嗯啊啊…大鸡巴好热啊…感觉要变奇怪起来了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3713',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%将腰十分下流的晃动着的同时用阴唇摩擦着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3714',
        any: [
          /PRINTFORMW 「哈啊…啊呜~%UNICODE\(0x2661\) \*1%…主人~%UNICODE\(0x2661\) \*1%…好想要…大鸡巴啊~%UNICODE\(0x2661\) \*1%…只是素股的话完全满足不了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3715',
        any: [/CFLAG:334 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3717',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3718',
        any: [/PRINTFORMW 「啊嗯~…哈啊哈啊…摩、摩擦起来后…很舒服吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3719',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像已经习惯了的样子、腰十分下流的晃动着的同时用阴唇摩擦着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3720',
        any: [/PRINTFORMW 「嗯~…啊啊~…哈呜呜~…俺、俺也…变了舒服起来了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3721',
        any: [/CFLAG:334 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3723',
        any: [/ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3724',
        any: [/PRINTFORMW 「啊啊…哈啊…哈啊…这、这样的…好羞耻啊~………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3725',
        any: [/PRINTFORMW %SAVESTR:TARGET%脸变得通红的情况下用阴唇摩擦着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3726',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3735',
        any: [/IF SELECTCOM == 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3736',
        any: [/IF CFLAG:TARGET:335 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3738',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3740',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3742',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3743',
        any: [
          /PRINTFORMW 收到命令后很高兴的放空了腰腿的力量、助手的肉棒一下子把%SAVESTR:TARGET%的处女象征贯穿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3745',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3746',
        any: [
          /PRINTFORMW 「啊哈…主人大的…连、最里面都…啊、啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3747',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3748',
        any: [
          /PRINTFORMW 「主人~…啊啊…魔王大人…连起来了~…和魔王大人用肉棒连起来了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3749',
        any: [
          /PRINTFORMW 因为更加紧密的肉体链接、%SAVESTR:PLAYER%和%SAVESTR:TARGET%之间的魔力循环变得愈加明显了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3750',
        any: [
          /PRINTFORMW 「啊啊~…魔王大人~…啊~哈啊啊…呀%UNICODE\(0x2661\) \*1%…啊啊~…腰…自己动起来惹%UNICODE\(0x2661\) \*1%…想要魔王大人的鸡巴所以自己动起来惹%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3751',
        any: [
          /PRINTFORMW 完全成为了%SAVESTR:PLAYER%之物的魔族少女带着愉悦的泪痕，扭动着腰肢在%SAVESTR:PLAYER%身上驰骋起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3754',
        any: [
          /PRINTFORMW 「啊啊~…啊~…哈呜…%UNICODE\(0x2661\) \*1% 进、进来了呜…全部进来了哟…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3755',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、初次结合的喜悦让少女露出了笑容。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3756',
        any: [
          /PRINTFORMW 「哈啊~…哈啊~…主人大人的大肉棒%UNICODE\(0x2661\) \*1%…已经变成俺的东西了哟%UNICODE\(0x2661\) \*1%…啊~…啊啊~…好高兴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3757',
        any: [
          /PRINTFORMW 看到%SAVESTR:TARGET%那感动至极的表情、%SAVESTR:PLAYER%的恶作剧之心不禁沸腾了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3758',
        any: [
          /PRINTFORMW 「咿呀！啊~唏呀！干、干什么…还、还在慢慢适应中呢%UNICODE\(0x2661\) \*1% 突、突然插进来、不、不行…不行啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3761',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3763',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3764',
        any: [
          /PRINTFORMW 收到命令后面露悲戚地放空了腰腿的力量、助手的肉棒一下子把%SAVESTR:TARGET%的处女象征贯穿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3766',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3767',
        any: [
          /PRINTFORMW 「嗯~…没关系呢~…这种程度…完全、不在意啦…呜啊…啊~哈呜…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3768',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3769',
        any: [
          /PRINTFORMW 「啊~啊啊啊啊~…魔王大人的大肉棒…全部…插进里面啦…啊啊…好幸福%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3770',
        any: [/PRINTFORMW %SAVESTR:TARGET%两手捧着脸颊、开心地扭来扭去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3771',
        any: [
          /PRINTFORMW 「魔王大人的魔力…大股的流进来了…啊哈%UNICODE\(0x2661\) \*1%…啊啊~…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3772',
        any: [
          /PRINTFORMW 完全成为了%SAVESTR:PLAYER%之物的魔族少女带着愉悦的泪痕，用小穴吞吐着%SAVESTR:PLAYER%的肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3775',
        any: [
          /PRINTFORMW 「啊~…啊啊~哈啊………全、全部插进来啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3776',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3777',
        any: [
          /PRINTFORMW 「哈啊…哈啊…俺、俺…这样一来就完全变成、主人的东西了唷…啊~…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3778',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%被少女可爱的（努力）姿态打动，温柔的抱紧了她。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3779',
        any: [
          /PRINTFORMW 「主人…稍微再这样一会…只、只要再稍稍一下就好…感觉很温暖呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3780',
        any: [
          /PRINTFORMW 抱着%SAVESTR:TARGET%手臂抬了起来，轻轻擦掉了少女眼角的泪珠、一遍又一遍的抚摸着她的头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3785',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3786',
        any: [
          /PRINTFORMW 被%NAME:MASTER%按住肩膀、哭叫不止的%SAVESTR:TARGET%被助手侵犯了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3788',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3789',
        any: [/PRINTFORMW 「啊啊~哈啊啊…啊、啊啊啊…俺、俺…这样子…啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3790',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3791',
        any: [
          /PRINTFORMW 「好、好痛…魔王大人…啊啊~…请、请放过………啊、啊呜！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3792',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%向%SAVESTR:TARGET%连接的部分直接输入魔力。%SAVESTR:TARGET%的眼神渐渐变得湿润了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3793',
        any: [
          /PRINTFORMW 「魔王大人的魔力…大股的流进来了呢…哈啊~%UNICODE\(0x2661\) \*1%…啊啊~…哈嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3794',
        any: [
          /PRINTFORMW 完全成为了%SAVESTR:PLAYER%之物的魔族少女带着愉悦的泪痕，用小穴吞吐着%SAVESTR:PLAYER%的肉棒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3796',
        any: [/PRINTFORMW 「嗯哈~哈啊啊…啊、啊啊~…俺、俺…这样子…啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3797',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3798',
        any: [/PRINTFORMW 「好、好痛…主人…啊啊~…请、请原谅呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3804',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3805',
        any: [
          /PRINTFORMW 「哈啊…哈啊…啊嗯~…哈啊啊~…主人…啊~啊啊啊…啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3806',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着愉悦的表情在%SAVESTR:PLAYER%身上舞动着腰肢………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3808',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3809',
        any: [
          /PRINTFORMW 「啊~…啊呜呜~…好、好厉害嗯…肚子里面…主人的鸡巴好大…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3810',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%怜爱的抚摸着自己小腹上因为吞掉%SAVESTR:PLAYER%的鸡巴而凸起的部分………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3813',
        any: [
          /PRINTFORMW 「啊啊~…这样子…很~…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰犯规啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3814',
        any: [/PRINTFORMW %SAVESTR:TARGET%被连续的突刺着，发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3817',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3822',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:2 >= 3 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3823',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3825',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每当被从下面抽插时就不禁张开翅膀发出娇喊。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3826',
        any: [
          /PRINTFORMW 「啊啊嗯~…啊~啊呜~…哈啊啊嗯%UNICODE\(0x2661\) \*1%…啊唏噫！…深…插太深了…要、要坏了呃呃呃%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3827',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大幅度的反仰着背部发出了娇喘。而%SAVESTR:PLAYER%如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3828',
        any: [
          /PRINTFORMW 「弄坏吧%UNICODE\(0x2661\) \*1%…把俺弄坏掉吧%UNICODE\(0x2661\) \*1%…主人啊啊~%UNICODE\(0x2661\) \*1%…啊啊~…啊啊~…嗯~…嗯啊啊啊~啊~噫嘿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3829',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3831',
        any: [
          /PRINTFORMW 青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3832',
        any: [
          /PRINTFORMW 「主人啊…啊啊~…喜欢…鸡巴好喜欢%UNICODE\(0x2661\) \*1%…最喜欢大鸡巴%UNICODE\(0x2661\) \*1%…啊啊~啊~%UNICODE\(0x2661\) \*1%…啊哈啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3833',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%跨坐在%SAVESTR:PLAYER%激烈的上下起伏着，享受着用小穴吞吐鸡巴的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3834',
        any: [
          /PRINTFORMW 「啊啊~…鸡巴最高~%UNICODE\(0x2661\) \*1%…最棒了！%UNICODE\(0x2661\) \*1%…一辈子这样插着鸡巴就好了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3835',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3836',
        any: [
          /PRINTFORMW 「啊哈~啊啊~…哈啊嗯~…再继续向上插进来%UNICODE\(0x2661\) \*1%…啊啊~%UNICODE\(0x2661\) \*1%…俺、俺要飞掉啦呜呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3837',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:PLAYER%的抽插快乐的大喊着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3838',
        any: [
          /PRINTFORMW 「啊啊~%UNICODE\(0x2661\) \*1%…咕唔…啊咿…俺的子宫被大鸡巴插进去了%UNICODE\(0x2661\) \*1%…要对主人的鸡巴着迷了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3840',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的魔族之眼闪闪发光，随着%SAVESTR:PLAYER%的动作一下一下的娇喘着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3842',
        any: [
          /PRINTFORMW 「啊~啊啊啊~…啊哈啊…主人啊啊…大鸡巴好舒服…%UNICODE\(0x2661\) \*1% 最喜欢鸡巴了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3843',
        any: [/PRINTFORMW %SAVESTR:TARGET%自己动着腰、献媚似的雪雪娇呼着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3845',
        any: [/PRINTFORMW 身负双翼的少女十分享受叹了口气。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3846',
        any: [
          /PRINTFORMW 「啊哈啊…啊啊~…啊啊啊嗯%UNICODE\(0x2661\) \*1% 就这样…在俺的小穴里面射出一大堆吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3847',
        any: [/PRINTFORMW 像熟练妓女一样扭动着腰肢的少女露出了淫猥的笑容………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3849',
        any: [/CFLAG:335 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3851',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3852',
        any: [
          /PRINTFORMW 「啊嘿呀啊～%UNICODE\(0x2661\) \*1%…嗯~…啊啊哈啊~%UNICODE\(0x2661\) \*1%…啊啊嗯~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3853',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%腰部的动作还有些青涩、偶尔还会蹙蹙眉头，露出一丝苦色。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3854',
        any: [
          /PRINTFORMW 「啊啊啊~…主人…一起变得更加舒服吧…啊~啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3855',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3857',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:2 >= 3 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3858',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3860',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每当被从下面抽插时就不禁张开翅膀发出娇喊。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3861',
        any: [
          /PRINTFORMW 「啊啊~%UNICODE\(0x2661\) \*1%…啊呜~…呜呜呜~…噫呀啊啊啊~%UNICODE\(0x2661\) \*1%…已、已经去了了了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3862',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%大幅度的反仰着背部发出了娇喘。而%SAVESTR:PLAYER%如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3863',
        any: [
          /PRINTFORMW 「更…更激烈的话哈啊%UNICODE\(0x2661\) \*1%…啊~…啊啊啊~…放货咱（放过俺）%UNICODE\(0x2661\) \*1%…放货咱啦（放过俺吧）%UNICODE\(0x2661\) \*1%…啊啊~哎嘿呀%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3864',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3866',
        any: [
          /PRINTFORMW 青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3867',
        any: [
          /PRINTFORMW 「嗯~…啊啊~…喜欢喜欢%UNICODE\(0x2661\) \*1%…最喜欢了哦%UNICODE\(0x2661\) \*1%…主人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3868',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%趴在%NAME:MASTER%身上，轻轻舔吻着、自己上下摆动着腰臀。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3869',
        any: [
          /PRINTFORMW 「嗯啾…啾…啊哈啊…哈啊…啊呜呜嗯~%UNICODE\(0x2661\) \*1%…好棒~…大鸡巴进到好深的地方来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3870',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3871',
        any: [
          /PRINTFORMW 「啊啊~…嗯~…啊~啊啊~…主人%UNICODE\(0x2661\) \*1%…更多%UNICODE\(0x2661\) \*1%…更多的插进来…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3872',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%随着%SAVESTR:PLAYER%的抽插快乐的大喊着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3873',
        any: [
          /PRINTFORMW 「最…最里面都被插入了哟…俺的肚子里面也成为主人的东西了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3875',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的魔族之眼闪闪发光，随着%SAVESTR:PLAYER%的动作一下一下的娇喘着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3877',
        any: [
          /PRINTFORMW 「啊~…啊哈啊~…啊啊啊~…咿呀呜呜~…%UNICODE\(0x2661\) \*1% 啊啊~主人~好棒~…好…棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3878',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%自己扭动着腰肢，想要掩饰羞涩一样大声娇呼着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3880',
        any: [/PRINTFORMW 身负双翼的少女十分享受叹了口气。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3881',
        any: [
          /PRINTFORMW 「呼唔…啊哈啊啊啊~%UNICODE\(0x2661\) \*1%…主人…在俺的小穴里面射出一大堆吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3883',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3885',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3886',
        any: [
          /PRINTFORMW 「啊~…啊啊~%UNICODE\(0x2661\) \*1%…嗯~…啊啊哈啊~%UNICODE\(0x2661\) \*1%…嗯~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3887',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%生硬的扭着腰肢、蹙着眉头，露出一丝苦色。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3888',
        any: [/PRINTFORMW 「主人…对、对不起…还、稍微有点难受…嗯~嗯嗯~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3889',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3891',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3892',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3893',
        any: [/PRINTFORMW 「嗯~…啊啊啊~…哈呜~…！好舒服…好…棒呢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3894',
        any: [/PRINTFORMW %SAVESTR:TARGET%熟练地用腰吞贪取着快乐。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3895',
        any: [/PRINTFORMW 「主人的东西…在深处动着…啊~啊啊啊~…啊哈啊～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3896',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3897',
        any: [/PRINTFORMW 「呀~…呀啊~…这样被抽查的话…唏啊！…啊噫…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3898',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3899',
        any: [
          /PRINTFORMW 「啊~…啊啊啊~…呀啊~…俺、俺…要…要去…要去…啊哈啊啊~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3901',
        any: [
          /PRINTFORMW 「啊~…啊啊~…哈啊…哈啊…嗯~…！腰、腰它…擅自动起来惹…啊~♪啊啊~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3902',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边扭动着腰肢一边发出了叹息。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3903',
        any: [
          /PRINTFORMW 「啊啊~…俺、俺的肚子里…主人的子种汁满满的出来了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3905',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3907',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3908',
        any: [
          /PRINTFORMW 「嗯~…啊啊~…哈啊…哈啊…嗯~…会好好…动、动起来的…的说…啊~啊啊~…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3909',
        any: [/PRINTFORMW %SAVESTR:TARGET%一边扭动着腰肢一边发出了叹息。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3910',
        any: [/PRINTFORMW 「啊啊~…俺、俺的肚子里…主人的好多……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3911',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3913',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3914',
        any: [
          /PRINTFORMW 「啊啊~…这样的姿势…很…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰不行！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3915',
        any: [/PRINTFORMW %SAVESTR:TARGET%被抽插着发出了悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3916',
        any: [/PRINTFORMW 「噫~…咕…啊啊~…停、停下啊…啊~…啊咕唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3917',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3926',
        any: [/IF SELECTCOM == 35/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3928',
        any: [/IF CFLAG:TARGET:336 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3930',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3931',
        any: [
          /PRINTFORMW 「唔哇啊~…用那么昂贵的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢\.\.\.？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3932',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3933',
        any: [/PRINTFORMW 「俺会…帮主人将身体弄得干干净净的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3935',
        any: [
          /PRINTFORMW 「俺会用俺大大胸部来帮您洗澡噢~…啊啊~…胸部要被压坏了呜~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3938',
        any: [
          /PRINTFORMW 「唔哇啊~…用那么漂亮的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢\.\.\.？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3939',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3941',
        any: [/PRINTFORMW 「哈啊…啊啊啊…胸部要被压坏了呜~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3943',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3948',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3949',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往自己身上来回涂满了肥皂后慢慢往%NAME:MASTER%抱了过去开始侍奉起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3950',
        any: [
          /PRINTFORMW 「啊啊~…啊啊啊嗯~%UNICODE\(0x2661\) \*1%…主人啊~、只是帮主人洗澡而已…变得舒服起来了唔呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3951',
        any: [
          /PRINTFORMW 「只是仅仅贴着主人的身体而已…就感觉要去了呢呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3952',
        any: [/IF TALENT:110 \|\| TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3953',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%丰满的胸部压在%SAVESTR:PLAYER%的背后变形了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3954',
        any: [
          /PRINTFORMW 「啊~啊啊~啊啊嗯~…俺的胸部…好舒服啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3956',
        any: [/CFLAG:336 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3958',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3959',
        any: [
          /PRINTFORMW 「哈啊…啊啊…主~主人~…用俺的身体全部变得干干净净的吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3960',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往自己身上来回涂满了肥皂后慢慢往%NAME:MASTER%抱了过去开始侍奉起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3961',
        any: [/PRINTFORMW 「俺会…帮主人将身体弄得干干净净的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3963',
        any: [
          /PRINTFORMW 「俺的胸部舒服吗？…呀啊嗯~…呜、呜嗯~…用俺的胸部将手指弄干净吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3964',
        any: [/CFLAG:336 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3966',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3967',
        any: [/PRINTFORMW 「啊啊啊…肥皂的味道好香啊…哈啊…哈啊…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3968',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往身体上用肥皂擦了几下后开始对%SAVESTR:PLAYER%侍奉起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3969',
        any: [/PRINTFORMW 「要…要变干净了噢~…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3971',
        any: [
          /PRINTFORMW 「俺会用俺大大胸部来帮您洗澡噢~……啊啊~…胸部要被压坏了~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3972',
        any: [/CFLAG:336 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3974',
        any: [/ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3975',
        any: [/PRINTFORMW 「啊啊啊…肥皂滑溜溜地…要变成奇怪的感觉了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3976',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往身体上用肥皂擦了几下后开始对%SAVESTR:PLAYER%侍奉起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3978',
        any: [/PRINTFORMW 「哈啊…啊啊啊…胸部要被压坏了呜~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3979',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3988',
        any: [/IF SELECTCOM == 36/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3990',
        any: [/IF CFLAG:TARGET:337 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3992',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3993',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3994',
        any: [
          /PRINTFORMW 「啊呀啊嗯~…肛门被主人的给塞满了~%UNICODE\(0x2661\) \*1%…好棒啊~%UNICODE\(0x2661\) \*1%…俺好幸福啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3995',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%舔着嘴唇十分下流地看着%SAVESTR:PLAYER%、为了品味更强烈的快感而前后晃动起了那小巧的屁股………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3997',
        any: [
          /PRINTFORMW 「啊啊~…全、全部进去了~…主人的大鸡巴~…啊啊~…啊~…嗯呜呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '3998',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%露出了稍微痛苦的表情，慢慢地晃动起了腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4001',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4002',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4003',
        any: [
          /PRINTFORMW 「啊~%UNICODE\(0x2661\) \*1%…啊呜呜~…连屁股的里面…都被主人的给塞满了啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4004',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%如同享受一样慢慢地前后摇晃着腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4006',
        any: [
          /PRINTFORMW 「哈啊~…啊啊~…这、这样子舒服吗？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4007',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上努力晃动腰部的%SAVESTR:TARGET%露出稍微痛苦的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4011',
        any: [/IF ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4012',
        any: [
          /PRINTFORMW 「啊啊啊~…全部都进去啊…啊啊啊~…主人的…啊啊~…啊~啊啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4013',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%发出娇喘声的同时晃动着腰部………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4015',
        any: [
          /PRINTFORMW 「啊唔呜呜~…呜~…啊啊啊…不、不要啊…屁股…要坏掉了啊啊…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4016',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%流着眼泪的同时被侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4019',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4024',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:337 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4025',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4026',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的双手被抓住的情况下不断地被从下往上抽插、每次往上捅的时候少女就会翻起了白眼发出了如同野兽一样的叫声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4027',
        any: [
          /PRINTFORMW 「哈哈~…啊呜呜~…哈呀嗯~…呀~呀啊啊~…啊啊~…啊啊啊啊啊啊…肛穴要荣坏掉了呜%UNICODE\(0x2661\) \*1%…要坏掉了呜呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4028',
        any: [
          /PRINTFORMW 少女发出了如果是曾经认识少女的人肯定无法相信的如同野兽一般的呻吟、而这个少女%SAVESTR:TARGET%则在%SAVESTR:PLAYER%的腰上变得凌乱不堪起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4029',
        any: [
          /PRINTFORMW 「啊啊啊啊~…肛穴被侵犯了好棒~%UNICODE\(0x2661\) \*1%…好想被一直侵犯下去啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4030',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4031',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的腰蠢蠢欲动地跨在了%SAVESTR:PLAYER%的身上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4032',
        any: [
          /PRINTFORMW 「我的肛穴…会变得那么淫乱完全是主人的错来的啊~%UNICODE\(0x2661\) \*1%…要负起责任噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4033',
        any: [
          /PRINTFORMW 抚摸着流着眼泪的同时向这边撒娇的%SAVESTR:TARGET%的脑袋、%SAVESTR:PLAYER%开始往上抽插起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4034',
        any: [
          /PRINTFORMW 「啊哈呀啊嗯~%UNICODE\(0x2661\) \*1%…这个…就是这个啊~%UNICODE\(0x2661\) \*1%…将肛穴侵犯到融化掉为止吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4036',
        any: [
          /PRINTFORMW 「啊啊啊~…肛穴好棒啊啊~%UNICODE\(0x2661\) \*1%…往俺的肛穴里用精子灌得满满的吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4037',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分粗暴，激烈地晃动着腰部贪图着肛门的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4038',
        any: [
          /PRINTFORMW 「大鸡巴~%UNICODE\(0x2661\) \*1%…大鸡巴最喜欢了~%UNICODE\(0x2661\) \*1%…而且会往俺的肛穴里射精的大鸡巴最棒了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4039',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%看见少女这样的姿态不由得叹了口气，不断地往上抽插直到少女满意了为止………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4041',
        any: [/CFLAG:337 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4043',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4044',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4045',
        any: [
          /PRINTFORMW 「啊嗯~…不、不行…动起来是不行的啊~…啊啊啊~…嗯~%UNICODE\(0x2661\) \*1%…这样子做的话~…会很棒的噢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4046',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着嘴唇如同做着圆周运动地一样晃动着腰部、那湿润的瞳孔仿佛在告诉这样子做真的会很舒服的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4047',
        any: [
          /PRINTFORMW 「啊啊啊啊…舒服的感觉…扩散到全身了~%UNICODE\(0x2661\) \*1%…俺会做更加舒服的事情的啦~…大鸡巴最喜欢了~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4049',
        any: [
          /PRINTFORMW 「啊呀啊嗯~…肛门被主人的给塞满了哈嗯~%UNICODE\(0x2661\) \*1%…好棒啊~%UNICODE\(0x2661\) \*1%…俺好幸福啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4050',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%舔着嘴唇、为了品味快感而将她的小屁股前后摇起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4051',
        any: [
          /PRINTFORMW 「嗯~…好深啊~…大鸡巴进到深处来了啊~…啊~啊啊~…好喜欢~%UNICODE\(0x2661\) \*1%…大鸡巴好喜欢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4053',
        any: [/CFLAG:337 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4055',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4056',
        any: [
          /PRINTFORMW 「啊啊~…全、全部都进去了呜…主人的大鸡巴~…啊啊~…啊~…唔呜呜呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4057',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%露出了稍微痛苦的表情慢慢地摇动起了腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4058',
        any: [
          /PRINTFORMW 「如果是俺最喜欢的大鸡巴的话…完全没问题…的噢~…啊~啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4060',
        any: [
          /PRINTFORMW （因为是最喜欢的…明明小穴那里也好想要来的…啊啊、真是坏心眼呢………）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4061',
        any: [/CFLAG:337 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4063',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4064',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4065',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被抓住双手不断地被往上抽插着、每当被插上去的时候就会翻出白眼，发出十分色情的娇喘声。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4066',
        any: [
          /PRINTFORMW 「哈啊啊~…啊呜呜~…唔~…呀~呀啊啊~…啊啊~…啊啊啊啊啊…肛穴要融化掉了%UNICODE\(0x2661\) \*1%…要坏掉了呜呜~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4067',
        any: [
          /PRINTFORMW 少女发出了曾经认识她的人绝对想象不出来的淫乱的声音、%SAVESTR:TARGET%在%SAVESTR:PLAYER%的腰上跳着淫乱的舞蹈。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4068',
        any: [
          /PRINTFORMW 「啊啊啊啊~…肛穴被侵犯地好爽啊~%UNICODE\(0x2661\) \*1%…好想被一直侵犯下去啊哈嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4069',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4070',
        any: [
          /PRINTFORMW 蠢蠢欲动的%SAVESTR:TARGET%跨坐在%NAME:MASTER%的身上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4071',
        any: [
          /PRINTFORMW 「啊啊啊…更加地侵犯俺吧~…俺的肛穴嗯~%UNICODE\(0x2661\) \*1%…变得那么下流完全是主人的原因的噢~%UNICODE\(0x2661\) \*1%…啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4072',
        any: [
          /PRINTFORMW 完全变成肛门狂的%SAVESTR:TARGET%自己晃动着臀部沉浸在肛门的快感之中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4073',
        any: [
          /PRINTFORMW 「啊啊啊啊…要融化了呜~…肛穴要融化了呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4075',
        any: [
          /PRINTFORMW 「哈呀啊~…肛穴好棒啊啊啊~%UNICODE\(0x2661\) \*1%…往俺的肛穴里面将精子全部射进去吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4076',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%甚至有些粗暴地激烈晃动腰部贪婪地享受着肛门的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4077',
        any: [
          /PRINTFORMW 「往里面射到…将肛穴变得黏黏糊糊要融化掉的程度吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4079',
        any: [/CFLAG:337 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4081',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4082',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4083',
        any: [
          /PRINTFORMW 「嗯啊~…啊啊啊…哈呜…屁股好棒啊~%UNICODE\(0x2661\) \*1%…真的好棒啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4084',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门好像在催促射精一样不断地夹紧着阴茎、每当这个时候都会发出十分色情的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4085',
        any: [
          /PRINTFORMW 「主人…更加…更加欺负我的屁股吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4087',
        any: [
          /PRINTFORMW 「啊~%UNICODE\(0x2661\) \*1%…啊呜呜~…屁股的里面都…被主人的给塞满了呢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4088',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%慢慢地如同享受一般将腰前后来回摇晃着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4089',
        any: [
          /PRINTFORMW 「好舒服呢哈啊嗯~…主人的大鸡巴全部塞进来吧~…啊啊~啊~…哈呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4091',
        any: [/CFLAG:337 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4093',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4094',
        any: [
          /PRINTFORMW 「哈啊~…啊啊~\.\.\.这、这样的感觉怎样呀~？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4095',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%一脸好像有点难受的表情拼命地晃动着腰部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4096',
        any: [
          /PRINTFORMW 「我会…让主人…变得更加舒服的啦~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4097',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4098',
        any: [
          /PRINTFORMW 「所、所以啦…想要被主人称赞嘛~…呐啊~…啊呜嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4099',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%在被侵犯着肛门的时候、用手指将自己没有被贯通的蜜穴张开撒起娇来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4101',
        any: [/CFLAG:337 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4103',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4104',
        any: [
          /PRINTFORMW 「啊啊啊~…全部都进去了~…啊啊啊~…主人的那个…啊啊~…啊~啊啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4105',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%一边晃动着腰部一边发出了呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4106',
        any: [/PRINTFORMW 「啊~…呀啊~…腰…自己动起来了~…呀~哈呀~…啊啊啊~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4107',
        any: [/CFLAG:337 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4109',
        any: [/ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4110',
        any: [/PRINTFORMW 「啊呜~…唔~…这样的…啊啊~…啊唔~…嗯呜呜~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4111',
        any: [
          /PRINTFORMW 跨在%SAVESTR:PLAYER%身上的%SAVESTR:TARGET%流着眼泪的同时被侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4112',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4121',
        any: [/IF SELECTCOM == 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4123',
        any: [/IF CFLAG:TARGET:338 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4125',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4126',
        any: [/PRINTFORMW 「好、好的…俺会非常努力…地、地舔那里的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4127',
        any: [/PRINTFORMW %SAVESTR:TARGET%颤抖着将舌头伸出来开始舔起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4130',
        any: [/PRINTFORMW 「啊啊~…这样的…不要啊…好脏…好脏啊…嗯~啊呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4131',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分犹豫地将舌头伸出来了，然后用舌头伸向了%SAVESTR:PLAYER%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4133',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4138',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4139',
        any: [
          /PRINTFORMW 「主人…用我的舌头变得舒服起来吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4140',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地将湿漉漉的舌头伸向了%SAVESTR:PLAYER%的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4141',
        any: [
          /PRINTFORMW 「啊啊嗯~…俺会让主人的肛门里面都变得十分干净的啦~%UNICODE\(0x2661\) \*1% 呸咯~…嗯噗~…嗯~嗯噗呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4142',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4144',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4145',
        any: [
          /PRINTFORMW 「俺会让主人的肛门…变得十分地干净漂亮的~綺麗%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4146',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地将湿漉漉的舌头伸向了%SAVESTR:PLAYER%的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4147',
        any: [
          /PRINTFORMW 「啊啊~…连每一片褶皱…都会弄得干干净净地~%UNICODE\(0x2661\) \*1% 呸咯~…噗啾~…嗯哼唔~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4148',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4150',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4151',
        any: [/PRINTFORMW 「好、好的…俺会非常努力…地、地舔那里的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4152',
        any: [/PRINTFORMW %SAVESTR:TARGET%颤抖着将舌头伸出来开始舔起来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4153',
        any: [/PRINTFORMW 「嗯啾~…呸咯~…呸咯…嗯~…哈啊…哈啊…啊啊~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4154',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4156',
        any: [/ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4157',
        any: [/PRINTFORMW 「这样的…明明好脏来的…嗯~啊呜呜……啊啊…呸咯~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4158',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分犹豫地将舌头伸出来了，然后用舌头伸向了%SAVESTR:PLAYER%的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4159',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4168',
        any: [/IF SELECTCOM == 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4170',
        any: [/IF CFLAG:TARGET:341 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4171',
        any: [/PRINTFORMW 「呀啊…我、我不是壞孩子啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4172',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4177',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4178',
        any: [
          /PRINTFORMW 「呀嗯…啊啊啊哈啊嗯…再更多地打吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4179',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%每次被打屁股時都左右搖晃著她的屁股。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4180',
        any: [
          /PRINTFORMW 「多多地%UNICODE\(0x2661\) \*1%…打我的屁股吧%UNICODE\(0x2661\) \*1%…懲罰我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4181',
        any: [/CFLAG:TARGET:341 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4183',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4184',
        any: [
          /PRINTFORMW 「對不起…全部都是我的不對…啊啊哈啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4185',
        any: [
          /PRINTFORMW 雖然屁股已經被打得又紅又腫、%SAVESTR:TARGET%還是享受著打屁股的責罰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4186',
        any: [/PRINTFORMW 「啊啊…屁股…好痛啊…啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4187',
        any: [/CFLAG:TARGET:341 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4190',
        any: [
          /ELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4191',
        any: [/PRINTFORMW 「啊…哈～…哈啊…請再…多打幾下………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4192',
        any: [
          /PRINTFORMW 雖然屁股已經被打得又紅又腫、%SAVESTR:TARGET%還是承受著打屁股的責罰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4193',
        any: [/PRINTFORMW 「我是個壞孩子…壞孩子………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4194',
        any: [/CFLAG:TARGET:341 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4197',
        any: [/ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4198',
        any: [/PRINTFORMW 「呀啊…我、我不是壞孩子啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4199',
        any: [/PRINTFORMW 「嗚嗚…啊…嗯…嗚咕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4200',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4209',
        any: [/IF SELECTCOM == 41/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4211',
        any: [/IF CFLAG:TARGET:342 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4213',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4214',
        any: [/PRINTFORMW 「啊啊啊…請原諒、原諒我吧…主人！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4216',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4217',
        any: [/PRINTFORMW 「啊…不要打我啊…啊啊、對不起對不起」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4220',
        any: [/PRINTFORMW 「呀啊…咕嗚…不要啊…已經夠了啊…不要再打了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4222',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4227',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4228',
        any: [
          /PRINTFORMW 「主人…更加…更加…請賜予我的身體更多的主人的疼愛吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4229',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著、少女發出了愉悅的尖叫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4230',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%…更多地%UNICODE\(0x2661\) \*1%…衹是被主人鞭笞著就要去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4231',
        any: [/CFLAG:TARGET:342 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4233',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4234',
        any: [
          /PRINTFORMW 「主人…更加…更加…請賜予我的身體更多的主人的疼愛吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4235',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著、少女發出了愉悅的尖叫。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4236',
        any: [/CFLAG:TARGET:342 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4238',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4239',
        any: [/PRINTFORMW 「啊啊啊…請原諒、原諒我吧…主人！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4240',
        any: [/PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭打著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4241',
        any: [/CFLAG:TARGET:342 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4243',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4244',
        any: [
          /PRINTFORMW 「啊…哈…呼…主人…被毫不留情地打了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4245',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著、少女發出帶著哭音的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4246',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1%…啊啊啊%UNICODE\(0x2661\) \*1%…感受到了哦、主人對我的愛%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4247',
        any: [/CFLAG:TARGET:342 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4249',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4250',
        any: [
          /PRINTFORMW 「啊…哈…呼…主人…被毫不留情地打了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4251',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著、少女發出帶著哭音的喘息………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4252',
        any: [/CFLAG:TARGET:342 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4254',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4255',
        any: [/PRINTFORMW 「啊…不要打我啊…啊啊、對不起對不起」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4256',
        any: [/PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4257',
        any: [/CFLAG:TARGET:342 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4259',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4260',
        any: [/PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4261',
        any: [/PRINTFORMW 「啊啊哈…嗯啊…啊嗯…啊啊…哈啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4262',
        any: [/PRINTFORMW 被多次鞭打的少女露出了一臉心醉神迷的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4263',
        any: [/CFLAG:TARGET:342 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4265',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4266',
        any: [/PRINTFORMW 「呀啊…咕嗚…不要啊…已經夠了啊…不要再打了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4267',
        any: [/PRINTFORMW %SAVESTR:TARGET%年幼的身體被毫不留情地鞭笞著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4268',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4277',
        any: [/IF SELECTCOM == 42/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4279',
        any: [/IF CFLAG:TARGET:343 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4281',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4282',
        any: [/PRINTFORMW 「啊…好、好痛啊…主人…啊咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4284',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4285',
        any: [/PRINTFORMW 「住、住手…主人…我、我…什麽壞事都沒做啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4288',
        any: [/PRINTFORMW 「咿…好痛…好痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4290',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4295',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4296',
        any: [
          /PRINTFORMW 「呀%UNICODE\(0x2661\) \*1% 啊哈啊…主人…被刺得好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4297',
        any: [/PRINTFORMW 針刺帶來的疼痛讓%SAVESTR:TARGET%感到心醉神迷。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4298',
        any: [
          /PRINTFORMW 「被刺得好舒服…啊…主人的針…好舒服噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4299',
        any: [/CFLAG:TARGET:343 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4301',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4302',
        any: [
          /PRINTFORMW 「呀%UNICODE\(0x2661\) \*1% 啊哈啊…主人…被刺得好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4303',
        any: [/PRINTFORMW 針刺帶來的疼痛讓%SAVESTR:TARGET%感到心醉神迷………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4304',
        any: [/CFLAG:TARGET:343 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4306',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4307',
        any: [/PRINTFORMW 「主人…啊…好、好痛啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4308',
        any: [/PRINTFORMW %SAVESTR:TARGET%流著淚向%SAVESTR:PLAYER%請求原諒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4309',
        any: [/CFLAG:TARGET:343 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4311',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4312',
        any: [
          /PRINTFORMW 「嗚咕…啊…嗯…更加多地…刺我把…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4313',
        any: [/PRINTFORMW 針刺帶來的疼痛讓%SAVESTR:TARGET%感到心醉神迷。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4314',
        any: [
          /PRINTFORMW 「讓、讓我…更加…多地…領受主人賜予的疼痛吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4315',
        any: [/CFLAG:TARGET:343 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4317',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4318',
        any: [
          /PRINTFORMW 「嗚咕…啊…嗯…更加多地…刺我把…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4319',
        any: [/PRINTFORMW 針刺帶來的疼痛讓%SAVESTR:TARGET%感到心醉神迷………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4320',
        any: [/CFLAG:TARGET:343 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4322',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4323',
        any: [/PRINTFORMW 「住、住手…主人…我、我…什麽壞事都沒做啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4324',
        any: [/PRINTFORMW %SAVESTR:TARGET%流著淚向%SAVESTR:PLAYER%請求原諒………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4325',
        any: [/CFLAG:TARGET:343 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4327',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4328',
        any: [/PRINTFORMW 「啊啊…真的…好痛…啊…啊啊嗚」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4329',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被刺得鮮血直流、發出帶著哭音的喘息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4330',
        any: [/PRINTFORMW 「哈…哈…啊嗚…嗯…呀」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4331',
        any: [/CFLAG:TARGET:343 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4333',
        any: [/ELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4334',
        any: [/PRINTFORMW 「對不起、對不起、請原諒我把…真的好痛啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4335',
        any: [/PRINTFORMW %SAVESTR:TARGET%被刺得鮮血直流、哭喊著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4336',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4346',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4348',
        any: [/IF CFLAG:TARGET:344 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4350',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4351',
        any: [
          /PRINTFORMW 「不、不要…戴上這個會被做奇怪的事情的吧？…………嗚呼呼、來吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4353',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4354',
        any: [/PRINTFORMW 「啊嗯…不要…好害怕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4357',
        any: [/PRINTFORMW 「住、住手啊…不要做奇怪的事啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4359',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4364',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4365',
        any: [
          /PRINTFORMW 「不、不要…戴上這個會被做奇怪的事情的吧？…………嗚呼呼、來吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4366',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊用舌頭舔了舔嘴唇一邊戴上了眼罩………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4367',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4369',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4370',
        any: [/PRINTFORMW 「一边舔嘴唇一边被戴上眼罩」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4371',
        any: [/PRINTFORMW %SAVESTR:TARGET%帶上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4372',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4374',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4375',
        any: [
          /PRINTFORMW 「不、不要…戴上這個會被做奇怪的事情的吧？…………嗚呼呼、來吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4376',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4378',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4379',
        any: [/PRINTFORMW 「啊嗯…不要…好害怕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4380',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊用舌頭舔了舔嘴唇一邊戴上了眼罩………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4381',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4383',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4384',
        any: [/PRINTFORMW 「啊嗯…不要…好害怕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4385',
        any: [/PRINTFORMW %SAVESTR:TARGET%戴上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4386',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4388',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4389',
        any: [/PRINTFORMW 「啊嗯…不要…好害怕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4390',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4392',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4393',
        any: [/PRINTFORMW 「住、住手啊…不要做、做、奇怪的事啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4394',
        any: [/PRINTFORMW %SAVESTR:TARGET%帶上了眼罩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4395',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4397',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4398',
        any: [/PRINTFORMW 「住、住手啊…不要做奇怪的事啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4399',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4404',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4406',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4407',
        any: [/PRINTFORMW 「哈…哈…嗚嗯………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4408',
        any: [/CFLAG:380 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4410',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4411',
        any: [/PRINTFORMW 「哈…哈…主人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4412',
        any: [/CFLAG:380 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4414',
        any: [/ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4415',
        any: [/PRINTFORMW 「哈…哈…終于摘下來了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4416',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4425',
        any: [/IF SELECTCOM == 44 && TEQUIP:44/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4427',
        any: [/IF CFLAG:TARGET:345 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4429',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4430',
        any: [/PRINTFORMW 「嗯~…啊~…嗯啊嗯~…好紧啊呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4432',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4433',
        any: [/PRINTFORMW 「好、好可怕啊…请不要…弄得太紧了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4436',
        any: [/PRINTFORMW 「啊~…啊啊~…不要…不要了啊…不要啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4438',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4443',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4444',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女露出了舒服而荡漾的表情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4445',
        any: [
          /PRINTFORMW 「主…人…俺、俺要…变得奇怪起来了啊%UNICODE\(0x2661\) \*1%…只是被绑住而已…就好像要去了样子啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4446',
        any: [/CFLAG:TARGET:345 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4448',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4449',
        any: [
          /PRINTFORMW 虽然%SAVESTR:TARGET%幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女身体蠢蠢欲动起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4450',
        any: [
          /PRINTFORMW 「啊~啊啊~…主人~…绑得…更加地紧也可以噢…绳子…勒进肉里面也可以噢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4451',
        any: [/CFLAG:TARGET:345 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4453',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4454',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%幼小的身躯被绳子给紧紧地捆绑住了、呼出炽热的喘息的同时不停的娇喘着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4455',
        any: [
          /PRINTFORMW 「哈啊啊~%UNICODE\(0x2661\) \*1%…主人…做更多…H的事情吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4456',
        any: [/CFLAG:TARGET:345 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4458',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4459',
        any: [
          /PRINTFORMW 「啊啊啊…主人~%UNICODE\(0x2661\) \*1% 更加用力的绑住俺吧，将俺的身心都绑住吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4460',
        any: [
          /PRINTFORMW 被绳子紧紧绑住的同时还被让其保持正坐的姿态，%SAVESTR:TARGET%如同狗一样将舌头伸出来向%SAVESTR:PLAYER%献媚起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4461',
        any: [/CFLAG:TARGET:345 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4463',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4464',
        any: [
          /PRINTFORMW 「哈啊…哈啊…主人~%UNICODE\(0x2661\) \*1% 主人~%UNICODE\(0x2661\) \*1% 縄子…勒进去了呜~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4465',
        any: [
          /PRINTFORMW 被绳子紧紧绑住的同时还被让其保持正坐的姿态，%SAVESTR:TARGET%的两条大腿在不断地互相摩擦着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4466',
        any: [/CFLAG:TARGET:345 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4468',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4469',
        any: [/PRINTFORMW 「哈啊…哈啊…好、好可怕啊…主人…将这个绳子解开吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4470',
        any: [
          /PRINTFORMW 被绳子紧紧绑住的同时还被让其保持正坐的姿态，%SAVESTR:TARGET%一脸难受的表情请求着原谅………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4471',
        any: [/CFLAG:TARGET:345 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4473',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4474',
        any: [/PRINTFORMW 「啊~…被绑得那么紧的话…哈啊…啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4475',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%幼小的身躯被紧紧地捆绑住并且被推到在了地板上、而这个少女则因为绳子勒进肉的感觉而不断喘息着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4476',
        any: [/CFLAG:TARGET:345 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4478',
        any: [/ELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4479',
        any: [/PRINTFORMW 「啊~…啊啊~…不要啊…不要啦啊…拜托了不要啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4480',
        any: [
          /PRINTFORMW 幼小的身躯被紧紧地捆绑住并且被推到在了地板上、%SAVESTR:TARGET%因为恐怖而颤抖着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4481',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4486',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4488',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4489',
        any: [/PRINTFORMW 「哈啊~…好辛苦来的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4490',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被解开绳子后就露出了放了一口气的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4492',
        any: [
          /PRINTFORMW ………然而、%SAVESTR:PLAYER%并没有看漏沾在那绳子上粘嗒嗒的爱液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4493',
        any: [/CFLAG:385 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4495',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4496',
        any: [/PRINTFORMW 「啊啊…痕迹还留着呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4497',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被解开绳子后就露出了放了一口气的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4499',
        any: [
          /PRINTFORMW ………然而、%SAVESTR:PLAYER%并没有看漏沾在那绳子上粘嗒嗒的爱液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4500',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4502',
        any: [/ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4503',
        any: [/PRINTFORMW 「哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4504',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被解开绳子后就露出了放了一口气的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4506',
        any: [
          /PRINTFORMW ………然而、%SAVESTR:PLAYER%并没有看漏这个少女因为感到不足而发出了叹息的这件事。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4507',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4516',
        any: [/IF SELECTCOM == 45 && TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4518',
        any: [/IF CFLAG:TARGET:346 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4520',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4521',
        any: [/PRINTFORMW 「嗯唔嗯呜呜~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4522',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4524',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4525',
        any: [/PRINTFORMW 「哈呜噗…嗯…嗯哼唔…哼唔…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4526',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4529',
        any: [/PRINTFORMW 「等、不、不要…嗯…嗯呜唔呜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4530',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4532',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4537',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4538',
        any: [/PRINTFORMW 「嗯唔呜噗嗯~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4539',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4540',
        any: [/PRINTFORMW 是因为变得興奮了吗、口水从口枷的缝隙间滴落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4541',
        any: [/CFLAG:TARGET:346 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4543',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4544',
        any: [/PRINTFORMW 「嗯唔呜噗嗯~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4545',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4546',
        any: [/CFLAG:TARGET:346 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4548',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:346 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4549',
        any: [/PRINTFORMW 「嗯唔呜噗嗯~…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4550',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4551',
        any: [/CFLAG:TARGET:346 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4553',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4554',
        any: [/PRINTFORMW 「哈呜噗…嗯…嗯哼唔…哼唔%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4555',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4556',
        any: [/PRINTFORMW 是因为变得興奮了吗、口水从口枷的缝隙间滴落下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4557',
        any: [/CFLAG:TARGET:346 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4559',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4560',
        any: [/PRINTFORMW 「哈呜噗…嗯…嗯哼唔…哼唔…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4561',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4562',
        any: [/CFLAG:TARGET:346 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4564',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4565',
        any: [/PRINTFORMW 「哈呜噗…嗯…嗯哼唔…哼唔…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4566',
        any: [
          /PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地表情看着%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4567',
        any: [/CFLAG:TARGET:346 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4569',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4570',
        any: [/PRINTFORMW 「啊唔~…嗯~…嗯噗呜…哼唔………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4571',
        any: [/PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%就一脸恍惚地样子了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4572',
        any: [/CFLAG:TARGET:346 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4574',
        any: [/ELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4575',
        any: [/PRINTFORMW 「等、不、不要…嗯…嗯呜唔呜…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4576',
        any: [/PRINTFORMW 被戴上口枷后，%SAVESTR:TARGET%流着眼泪眺望着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4577',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4582',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4584',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:386 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4585',
        any: [/PRINTFORMW 「嗯呸啊………哈啊…哈啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4586',
        any: [/CFLAG:386 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4588',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4589',
        any: [
          /PRINTFORMW 「嗯啊啊啊…帮俺将口水擦掉吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4590',
        any: [/CFLAG:386 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4592',
        any: [/ELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4593',
        any: [/PRINTFORMW 「咳~…咳咳~…再、再也不要了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4594',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4603',
        any: [/IF SELECTCOM == 46 && TEQUIP:46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4605',
        any: [/IF CFLAG:TARGET:347 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4607',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4608',
        any: [/PRINTFORMW 「啊呜呜…肚子变得好难受…好难受啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4610',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4611',
        any: [/PRINTFORMW 「啊呜呜~…俺会忍耐的…会忍耐的啦啊~…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4614',
        any: [/PRINTFORMW 「呀啊~…唔~…啊呜呜~…肚子好难受~…好难受啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4616',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4621',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4622',
        any: [
          /PRINTFORMW 「更多~…灌到极限肚子变得满满的也可以噢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4623',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4624',
        any: [
          /PRINTFORMW 「哈啊哈啊…啊哈啊…%UNICODE\(0x2661\) \*1% 做更多的…H的事情吧~…俺是主人的东西来的啦~…啊啊嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4625',
        any: [
          /PRINTFORMW 断断续续的肛门快感所带来的刺激让%SAVESTR:TARGET%的脑内变得荡漾起来了，少女一脸恍惚地诱惑起了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4626',
        any: [/CFLAG:347 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4628',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4629',
        any: [
          /PRINTFORMW 「嗯哼唔~…肚子变得好奇怪…不、不行了噢…再这样下去的话………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4630',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4631',
        any: [
          /PRINTFORMW 「啊啊~…但是就这样…对俺做更加下流的事情吧~………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4632',
        any: [/CFLAG:347 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4634',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4635',
        any: [
          /PRINTFORMW 「啊哈啊~%UNICODE\(0x2661\) \*1% 肚、肚子里…变得满满的了噢~…啊、啊啊啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4636',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4637',
        any: [
          /PRINTFORMW 「啊嗯~…塞子被紧紧地塞进去了啊%UNICODE\(0x2661\) \*1%…啊哈啊~…啊啊~…还不能排出来吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4638',
        any: [/CFLAG:347 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4640',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4641',
        any: [
          /PRINTFORMW 「哈啊~…哈啊~…不、不行了啊…这、这样的…肚子…变奇怪了啊~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4642',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4643',
        any: [
          /PRINTFORMW 「啊啊啊~…主人…啊、那种地方…不想让主人看到啊…真的不想被看到啦~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4644',
        any: [/CFLAG:347 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4646',
        any: [
          /ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4647',
        any: [/PRINTFORMW 「啊啊啊~…屁、屁股烧起来呜呜~…啊啊~…啊啊啊啊~」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4648',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为被灌进了大量的灌肠液而露出了一脸恍惚的神情。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4649',
        any: [
          /PRINTFORMW 「啊哈啊啊~…这、这样子…被灌进那么多的话…俺、俺已经…已经…变得奇怪起来了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4650',
        any: [/CFLAG:347 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4652',
        any: [/ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4653',
        any: [/PRINTFORMW 「已…已经不行了啊~…原谅俺吧~………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4654',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门被塞进了塞子、正在一跳一跳地痉挛着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4655',
        any: [/PRINTFORMW 「呀~…唔~…啊呜呜~…肚子好难受…好难受啊啊~………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4656',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4665',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4667',
        any: [/IF CFLAG:356 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4669',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4670',
        any: [/PRINTFORMW 「俺被做怎样的事情…都完全没问题的噢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4672',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4673',
        any: [/PRINTFORMW 「就像平常那样…对、对俺做点什么吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4676',
        any: [/PRINTFORMW 「不、不要看着这边啊…~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4678',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4681',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4684',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4687',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4690',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4693',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头正带着乳头夹在给予着乳头刺激中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4696',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4699',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4702',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4705',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被绳子给捆绑着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4708',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4711',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4714',
        any: [/PRINTFORMW 接着、%SAVESTR:TARGET%这样的姿态始终被录像着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4715',
        any: [/CFLAG:356 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4720',
        any: [
          /IF TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4721',
        any: [
          /PRINTFORMW 「主人~…不要玩弄俺啦…真、真是的…已经要变得奇怪起来了啊~………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4722',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的两条大腿互相摩擦着、一脸十分难受的看着这边………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4723',
        any: [/CFLAG:356 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4725',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:356 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4726',
        any: [/PRINTFORMW 「俺被做怎样的事情…都完全没问题的噢…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4727',
        any: [/CFLAG:356 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4729',
        any: [
          /ELSEIF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4730',
        any: [/PRINTFORMW 「唔啊…嗯…什、什么都没有啦~…不、不要看这边啦………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4731',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%两腿蹭来蹭去并用双手按住了两腿之间的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4732',
        any: [/CFLAG:356 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4734',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4735',
        any: [/PRINTFORMW 「就像平常那样…对、对俺做点什么吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4736',
        any: [/CFLAG:356 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4738',
        any: [/ELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4739',
        any: [/PRINTFORMW 「不、不要看着这边啊…~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4740',
        any: [/CFLAG:356 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4742',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4745',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4748',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4751',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4754',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4757',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的乳头正带着乳头夹在给予着乳头刺激中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4760',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4763',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4766',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4769',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身体被绳子给捆绑着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4772',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4775',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4778',
        any: [/PRINTFORMW 接着、%SAVESTR:TARGET%这样的姿态始终被录像着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4788',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4790',
        any: [/IF CFLAG:357 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4791',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4793',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%催促着%SAVESTR:TARGET%进行自我介绍、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4794',
        any: [/IF TALENT:89 \|\| ABL:17 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4795',
        any: [/PRINTFORM %SAVESTR:TARGET%将自己的本名和接下来要进行的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4797',
        any: [/PRINTFORM 、甚至是连自慰时妄想的事情/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4798',
        any: [/PRINTFORML 十分欣喜地全部说了出来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4799',
        any: [
          /PRINTFORML 只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4800',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4801',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4802',
        any: [/PRINTFORML %SAVESTR:TARGET%面向水晶说起了淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4803',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4804',
        any: [
          /ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4805',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球进行了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4806',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4808',
        any: [/PRINTFORMW 哭泣着对着水晶球请求帮助………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4809',
        any: [/PRINTFORMW 「姐姐救救我吧…好想快点回到村子里去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4812',
        any: [/PRINTFORM %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4813',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4814',
        any: [
          /PRINTFORML 向少女搭话后、%SAVESTR:TARGET%晃动着腰部说起了充满爱意的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4815',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4816',
        any: [
          /PRINTFORML 向少女搭话后、%SAVESTR:TARGET%一边晃着腰一边不停地说着下流的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4817',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4818',
        any: [/PRINTFORM 向少女搭话后、%SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4819',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4820',
        any: [/PRINT 快乐的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4821',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4822',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4824',
        any: [/PRINTFORML 的声音、拼命地向着%SAVESTR:PLAYER%说了起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4825',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4826',
        any: [
          /PRINTFORML 向少女搭话后、%SAVESTR:TARGET%如同打发无聊一样发起了牢骚/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4827',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4828',
        any: [/PRINTFORML 向少女搭话后、%SAVESTR:TARGET%一点一点地说起了话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4830',
        any: [
          /PRINTFORML 向少女搭话后、%SAVESTR:TARGET%根本没有听进耳朵里的样子…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4833',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4837',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4839',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%催促着%SAVESTR:TARGET%进行自我介绍、/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4840',
        any: [/IF TALENT:89 \|\| ABL:17 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4841',
        any: [/PRINTFORM %SAVESTR:TARGET%将自己的本名和接下来要进行的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4843',
        any: [/PRINTFORM 、甚至是连自慰时妄想的事情/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4844',
        any: [/PRINTFORML 十分欣喜地全部说了出来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4845',
        any: [
          /PRINTFORML 只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4846',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4847',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4848',
        any: [/PRINTFORML %SAVESTR:TARGET%面向水晶说起了淫猥的话语/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4849',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4850',
        any: [
          /ELSEIF TALENT:85 \|\| ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4851',
        any: [/PRINTFORML %SAVESTR:TARGET%对着水晶球进行了自我介绍/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4852',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4854',
        any: [/PRINTFORMW 哭泣着对着水晶球请求帮助………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4855',
        any: [/PRINTFORMW 「姐姐救救我吧…好想快点回到村子里去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4858',
        any: [/PRINTFORM %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4859',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4860',
        any: [
          /PRINTFORML 向少女搭话后，%SAVESTR:TARGET%晃动着腰部说起了充满爱意的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4861',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4862',
        any: [
          /PRINTFORML 向少女搭话后，%SAVESTR:TARGET%一边晃着腰一边不停地说着下流的话语/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4863',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85\) && PALAM:5 >= PALAMLV:4/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4864',
        any: [/PRINTFORM 向少女搭话后，%SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4865',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4866',
        any: [/PRINT 快乐的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4867',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4868',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4870',
        any: [/PRINTFORML 的声音、拼命地向着%SAVESTR:PLAYER%说了起来/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4871',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4872',
        any: [
          /PRINTFORML 向少女搭话后，%SAVESTR:TARGET%如同打发无聊一样发起了牢骚/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4873',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4874',
        any: [/PRINTFORML 向少女搭话后，%SAVESTR:TARGET%十分胆怯地说起了话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4876',
        any: [
          /PRINTFORML 向少女搭话后，%SAVESTR:TARGET%根本没有听进耳朵里的样子…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4887',
        any: [/IF SELECTCOM == 123/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4889',
        any: [/IF CFLAG:TARGET:360 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4891',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4892',
        any: [
          /PRINTFORMW 「啊嗯~…俺会好好地侍奉的…胸部也好嘴巴也好都是主人的东西来的噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4893',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4894',
        any: [
          /PRINTFORMW 「嗯啾呜~…啊啊嗯~%UNICODE\(0x2661\) \*1%…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4895',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4896',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4897',
        any: [
          /PRINTFORMW 「啊哈啊…大大的胸部被侵犯着…还在吮吸着%UNICODE\(0x2661\) \*1%…好好吃啊~…啊呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4898',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4899',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4900',
        any: [
          /PRINTFORMW 「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢%UNICODE\(0x2661\) \*1%…啊嗯呜…嗯呜~嗯~嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4901',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4903',
        any: [
          /PRINTFORMW 「嗯~…啊啊\.\.\.能用胸部夹住来侍奉好高兴啊~%UNICODE\(0x2661\) \*1% 啊呜嗯~…啾呜呜~啾~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4904',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4907',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4908',
        any: [
          /PRINTFORMW 「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4909',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4910',
        any: [
          /PRINTFORMW 「啊啊嗯~…胸部被一蹭一蹭地呢%UNICODE\(0x2661\) \*1%…嗯啾~…啾~…啾呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4911',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4912',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4913',
        any: [
          /PRINTFORMW 「哈呜呜嗯~…胸部好烫啊~%UNICODE\(0x2661\) \*1%…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4914',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4915',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4916',
        any: [
          /PRINTFORMW 「啊哈~…埋进俺的胸部里了呢%UNICODE\(0x2661\) \*1%…但是看吧…这样做的话就可以看见胸部了…啊唔呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4917',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4919',
        any: [
          /PRINTFORMW 「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~%UNICODE\(0x2661\) \*1%…哈唔…嗯~嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4920',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4923',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4924',
        any: [
          /PRINTFORMW 「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4925',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4926',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4927',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4928',
        any: [
          /PRINTFORMW 「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4929',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4930',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4931',
        any: [/PRINTFORMW 「啾~…啾呜呜~…只能品尝前面一点而已啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4932',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4934',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4938',
        any: [
          /PRINTFORMW 「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4939',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4940',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4941',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4942',
        any: [
          /PRINTFORMW 「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4943',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4944',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4945',
        any: [/PRINTFORMW 「不要再将我的大胸部当成玩具了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4946',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4948',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4951',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4956',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4957',
        any: [
          /PRINTFORMW 「啊嗯~…俺会好好的侍奉的…胸部也好嘴巴也好都是主人的东西来的噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4958',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4959',
        any: [
          /PRINTFORMW 「嗯啾呜~…啊啊嗯~%UNICODE\(0x2661\) \*1%…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4960',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4961',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4962',
        any: [
          /PRINTFORMW 「啊哈啊…大大的胸部被侵犯着…还在吮吸着%UNICODE\(0x2661\) \*1%…好好吃啊~…啊呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4963',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4964',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4965',
        any: [
          /PRINTFORMW 「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢%UNICODE\(0x2661\) \*1%…啊嗯呜…嗯呜~嗯~嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4966',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4968',
        any: [
          /PRINTFORMW 「嗯~…啊啊\.\.\.能用胸部夹住来侍奉好高兴啊~%UNICODE\(0x2661\) \*1% 啊呜嗯~…啾呜呜~啾~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4969',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4972',
        any: [/CFLAG:360 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4974',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4975',
        any: [
          /PRINTFORMW 「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4976',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4977',
        any: [
          /PRINTFORMW 「啊啊嗯~…胸部被一蹭一蹭地呢%UNICODE\(0x2661\) \*1%…嗯啾~…啾~…啾呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4978',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4979',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4980',
        any: [
          /PRINTFORMW 「哈呜呜嗯~…胸部好烫啊~%UNICODE\(0x2661\) \*1%…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4981',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4982',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4983',
        any: [
          /PRINTFORMW 「啊哈~…埋进俺的胸部里了呢%UNICODE\(0x2661\) \*1%…但是看吧…这样做的话就可以看见胸部了…啊唔呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4984',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4986',
        any: [
          /PRINTFORMW 「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~%UNICODE\(0x2661\) \*1%…哈唔…嗯~嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4987',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4990',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4991',
        any: [
          /PRINTFORMW 「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4992',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4993',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4994',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4995',
        any: [
          /PRINTFORMW 「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4996',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4997',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4998',
        any: [/PRINTFORMW 「啾~…啾呜呜~…只能品尝前面一点而已啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '4999',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5001',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5003',
        any: [/CFLAG:360 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5005',
        any: [/ELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5006',
        any: [
          /PRINTFORMW 「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5007',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5008',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%往用胸部摩擦着的阴茎的前端不断地亲吻着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5009',
        any: [/ELSEIF TALENT:110/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5010',
        any: [
          /PRINTFORMW 「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5011',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5012',
        any: [/ELSEIF TALENT:114/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5013',
        any: [/PRINTFORMW 「不要再将我的大胸部当成玩具了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5014',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5016',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5018',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5026',
        any: [/IF SELECTCOM == 125/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5028',
        any: [/IF CFLAG:TARGET:361 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5030',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5031',
        any: [
          /PRINTFORMW 「哈唔嗯…嗯唔嗯唔~…好吃~%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~%UNICODE\(0x2661\) \*1%…俺的那里也…一抽地%UNICODE\(0x2661\) \*1%好有感觉呢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5032',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地舔舐着%SAVESTR:PLAYER%的阴茎同时、进行着激烈的自慰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5034',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5035',
        any: [
          /PRINTFORMW 「啊嗯唔…嗯呜…好好吃啊…大鸡巴~%UNICODE\(0x2661\) \*1%…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢%UNICODE\(0x2661\) \*1%…啾唔~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5036',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地舔舐着%SAVESTR:PLAYER%的阴茎同时、抚摸着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5038',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5039',
        any: [
          /PRINTFORMW 「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5040',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%按照命令的那样吮吸着%SAVESTR:PLAYER%的阴茎的同时、用手指摩擦着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5043',
        any: [
          /PRINTFORMW 「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5044',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%按照命令的那样吮吸着%SAVESTR:PLAYER%的阴茎的同时、用手指摩擦着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5046',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5051',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5052',
        any: [
          /PRINTFORMW 「哈唔嗯…嗯唔嗯唔~…好吃~%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~%UNICODE\(0x2661\) \*1%…俺的那里也…一抽地%UNICODE\(0x2661\) \*1%好有感觉呢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5053',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地舔舐着%SAVESTR:PLAYER%的阴茎同时、进行着激烈的自慰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5055',
        any: [
          /PRINTFORMW 「啊啊…快点将俺侵犯了嘛~%UNICODE\(0x2661\) \*1%…好想要…大鸡巴啊~%UNICODE\(0x2661\) \*1%…啊唔呜嗯~…啾噜~啾噜~…呸咯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5056',
        any: [/CFLAG:361 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5058',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5059',
        any: [
          /PRINTFORMW 「啊嗯唔…嗯呜…好好吃啊…大鸡巴~%UNICODE\(0x2661\) \*1%…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢%UNICODE\(0x2661\) \*1%…啾唔~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5060',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%十分欣喜地舔舐着%SAVESTR:PLAYER%的阴茎同时、抚摸着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5062',
        any: [
          /PRINTFORMW 「啊啊…嗯~…啊啊…主人…将俺的处女夺走了吧~%UNICODE\(0x2661\) \*1%…已经要变得奇怪起来了啊…啊唔呜…嗯~嗯嗯~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5063',
        any: [/CFLAG:361 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5065',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5066',
        any: [
          /PRINTFORMW 「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5067',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%按照命令的那样吮吸着%SAVESTR:PLAYER%的阴茎的同时、用手指摩擦着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5068',
        any: [/CFLAG:361 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5070',
        any: [/ELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5071',
        any: [
          /PRINTFORMW 「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5072',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%按照命令的那样吮吸着%SAVESTR:PLAYER%的阴茎的同时、用手指摩擦着自己的股间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5073',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5082',
        any: [/IF SELECTCOM == 126/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5084',
        any: [/IF CFLAG:TARGET:362 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5086',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5087',
        any: [
          /PRINTFORMW 「大鸡巴…好好吃%UNICODE\(0x2661\) \*1%…在俺的嘴巴里将精液都射进来吧…主人…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5089',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5090',
        any: [
          /PRINTFORMW 「主人~…请变得更加舒服起来吧~%UNICODE\(0x2661\) \*1% 嗯啾~…啾~…啊啊…变得那么硬起来了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5092',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5093',
        any: [
          /PRINTFORMW 「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5096',
        any: [
          /PRINTFORMW 「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5098',
        any: [/CFLAG:TARGET:362 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5103',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5104',
        any: [
          /PRINTFORMW 「大鸡巴…好好吃%UNICODE\(0x2661\) \*1%…在俺的嘴巴里将精液都射进来吧…主人…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5105',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用黏糊糊的舌头缠绕住并且用手撸起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5106',
        any: [
          /PRINTFORMW 「嗯啾呜呜~…感觉到大鸡巴一跳一跳的了呢%UNICODE\(0x2661\) \*1%…俺会给主人好好地撸的啦…请变得更加舒服起来吧~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5107',
        any: [/CFLAG:362 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5109',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5110',
        any: [
          /PRINTFORMW 「主人~…请变得更加舒服起来吧~%UNICODE\(0x2661\) \*1% 嗯啾~…啾~…啊啊…变得那么硬起来了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5111',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用舌头缠绕住了龟头并且慢慢撸起了阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5112',
        any: [
          /PRINTFORMW 「啾~…啾唔~…啊啊唔…嗯噗~%UNICODE\(0x2661\) \*1%…嗯呜呜…嗯噗呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5113',
        any: [/CFLAG:362 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5115',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5116',
        any: [
          /PRINTFORMW 「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5117',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%笨拙地伸出了手开始拼命地侍奉起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5118',
        any: [/CFLAG:362 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5120',
        any: [/ELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5121',
        any: [
          /PRINTFORMW 「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5122',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一边笨拙地用手上下撸着一边亲吻龟头前端………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5123',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5133',
        any: [/IF SELECTCOM == 127/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5135',
        any: [/IF CFLAG:TARGET:363 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5137',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5138',
        any: [
          /PRINTFORMW 「嗯啾噜呜~%UNICODE\(0x2661\) \*1%…啾噗~啾噗~啾噗~…嗯噗呜呜%UNICODE\(0x2661\) \*1%…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5139',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘟着小嘴、一边弄出下流的声响一边吮吸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5140',
        any: [
          /PRINTFORMW 「啊啊…大鸡巴~%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5142',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5143',
        any: [
          /PRINTFORMW 「嗯唔~噗唔~%UNICODE\(0x2661\) \*1%…啾咯噗~…啾噗~%UNICODE\(0x2661\) \*1%…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~%UNICODE\(0x2661\) \*1%…呸咯…嗯唔噗呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5144',
        any: [
          /PRINTFORMW 「啊啊…主人的大鸡巴好好吃啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5146',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5147',
        any: [
          /PRINTFORMW 「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5150',
        any: [
          /PRINTFORMW 「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5152',
        any: [/CFLAG:TARGET:363 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5157',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5158',
        any: [
          /PRINTFORMW 「嗯啾噜呜~%UNICODE\(0x2661\) \*1%…啾噗~啾噗~啾噗~…嗯噗呜呜%UNICODE\(0x2661\) \*1%…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5159',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘟着小嘴、一边弄出下流的声响一边吮吸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5160',
        any: [
          /PRINTFORMW 「啊啊…大鸡巴~%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5161',
        any: [/CFLAG:363 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5163',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5164',
        any: [
          /PRINTFORMW 「嗯唔~噗唔~%UNICODE\(0x2661\) \*1%…啾咯噗~…啾噗~%UNICODE\(0x2661\) \*1%…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~%UNICODE\(0x2661\) \*1%…呸咯…嗯唔噗呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5165',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘟着小嘴吮吸着%SAVESTR:PLAYER%的阴茎。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5166',
        any: [
          /PRINTFORMW 「啊啊…主人的大鸡巴好好吃啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5167',
        any: [/CFLAG:363 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5169',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5170',
        any: [
          /PRINTFORMW 「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5171',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为自己嘴巴弄出的下流的声音而流着眼泪的情况下吮吸着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5172',
        any: [/CFLAG:363 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5174',
        any: [/ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5175',
        any: [
          /PRINTFORMW 「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5176',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5185',
        any: [/IF SELECTCOM == 69/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5187',
        any: [/IF CFLAG:TARGET:364 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5189',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5190',
        any: [
          /PRINTFORM 「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5191',
        any: [
          /IF TALENT:PLAYER:122 \|\| TALENT:PLAYER:121 \|\| \(TALENT:PLAYER:122 == 0 && ITEM:PBAND == 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5192',
        any: [/PRINT 大鸡巴/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5194',
        any: [/PRINT 花蕾/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5196',
        any: [/PRINTFORMW 的啦~%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5197',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小屁股十分可爱地摇晃着往%SAVESTR:PLAYER%的脸上压了下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5199',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5200',
        any: [
          /PRINTFORMW 「俺会侍奉主人的啦…恶作剧的话…可是不行的噢%UNICODE\(0x2661\) \*1%…啊啊~嗯啊啊嗯~%UNICODE\(0x2661\) \*1% 唔～唔噢～～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5201',
        any: [/PRINTFORM %SAVESTR:TARGET%吮吸起%SAVESTR:PLAYER%的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5202',
        any: [/IF TALENT:PLAYER:122 \|\| TALENT:PLAYER:121/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5203',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5204',
        any: [
          /ELSEIF TALENT:PLAYER:122 == 0 && ITEM:PBAND == 1 && RAND:3 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5205',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5207',
        any: [/PRINT 阴唇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5209',
        any: [/PRINTFORMW ，而%SAVESTR:PLAYER%也没有停下来继续着口腔侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5211',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5212',
        any: [/PRINTFORMW 「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5213',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5216',
        any: [
          /PRINTFORMW 「啊嗯~…这样舔不行啊…嗯~、好、好的、俺会好好的舔的啦…………~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5217',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5219',
        any: [/CFLAG:TARGET:364 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5224',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5225',
        any: [
          /PRINTFORMW 「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的大鸡巴的啦~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5226',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小屁股十分可爱地摇晃着往%SAVESTR:PLAYER%的脸上压了下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5227',
        any: [
          /PRINTFORMW 「嗯~…啊噗唔~…好舒服啊…主人的大鸡巴居然变得那么雄伟了…俺开动了~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5228',
        any: [
          /PRINTFORMW 「嗯啾~…啾噗呜~…咕啾…啊啊…真好吃%UNICODE\(0x2661\) \*1%…肉棒真好吃%UNICODE\(0x2661\) \*1%…啊啊也来玩弄我的小穴吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5229',
        any: [/CFLAG:364 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5231',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5232',
        any: [
          /PRINTFORMW 「俺会侍奉主人的啦…恶作剧的话…可是不行的噢%UNICODE\(0x2661\) \*1%…啊啊~嗯啊啊嗯~%UNICODE\(0x2661\) \*1% 唔～唔噢～～」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5233',
        any: [/PRINTFORM %SAVESTR:TARGET%吮吸起%SAVESTR:PLAYER%的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5234',
        any: [/IF TALENT:PLAYER:122 \|\| TALENT:PLAYER:121/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5235',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5236',
        any: [
          /ELSEIF TALENT:PLAYER:122 == 0 && ITEM:PBAND == 1 && RAND:3 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5237',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5239',
        any: [/PRINT 阴唇/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5241',
        any: [/PRINTFORMW ，而%SAVESTR:PLAYER%也没有停下来继续着口腔侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5242',
        any: [
          /PRINTFORMW 「嗯啾呜~…啾噗~啾噗~…呸咯~%UNICODE\(0x2661\) \*1%…这里…很舒服对吧…？嗯呜~啊啊~…俺那里也很舒服~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5243',
        any: [/CFLAG:364 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5245',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5246',
        any: [/PRINTFORMW 「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5247',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5248',
        any: [
          /PRINTFORMW 「啊唔嗯~…嗯~…嗯啾呜~…哈啊…大鸡巴…好好吃啊…嗯啾~啾唔~…呀啊嗯~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5249',
        any: [/CFLAG:364 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5251',
        any: [/ELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5252',
        any: [
          /PRINTFORMW 「啊嗯~…嗯噗~…不，不要舔那个地方啦…嗯~…啾唔~…呸咯~…呸咯~…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5253',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5254',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5263',
        any: [/IF SELECTCOM == 124/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5265',
        any: [/IF CFLAG:TARGET:365 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5267',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5268',
        any: [
          /PRINTFORMW 「哈啊哈啊…要用俺的喉咙来侍奉了噢%UNICODE\(0x2661\) \*1% 嗯唔…嗯噗~嗯噗呜~\.\.\.\.\.\.噗呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5269',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5270',
        any: [
          /PRINTFORMW 「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5271',
        any: [
          /PRINTFORMW （大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5273',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5274',
        any: [
          /PRINTFORMW 「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5275',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇后将阴茎吞进了喉咙深处。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5276',
        any: [
          /PRINTFORMW 「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜%UNICODE\(0x2661\) \*1%…（好好吃啊…主人的大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%）」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5278',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5279',
        any: [
          /PRINTFORMW 「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5280',
        any: [/PRINTFORMW %SAVESTR:TARGET%拼命地将阴茎吞到了喉咙深处………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5283',
        any: [
          /PRINTFORMW 「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5284',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像很难受的样子但还是将阴茎吞了下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5286',
        any: [/CFLAG:TARGET:365 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5291',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5292',
        any: [
          /PRINTFORMW 「哈啊哈啊…要用俺的喉咙来侍奉了噢%UNICODE\(0x2661\) \*1% 嗯唔…嗯噗~嗯噗呜~\.\.\.\.\.\.噗呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5293',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5294',
        any: [
          /PRINTFORMW 「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5295',
        any: [
          /PRINTFORMW （大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5297',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5298',
        any: [
          /PRINTFORMW 「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5299',
        any: [/PRINTFORMW %SAVESTR:TARGET%舔了舔嘴唇后将阴茎吞进了喉咙深处。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5300',
        any: [
          /PRINTFORMW 「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜%UNICODE\(0x2661\) \*1%…（好好吃啊…主人的大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%）」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5302',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5303',
        any: [
          /PRINTFORMW 「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5304',
        any: [/PRINTFORMW %SAVESTR:TARGET%拼命地将阴茎吞到了喉咙深处………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5307',
        any: [
          /PRINTFORMW 「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5308',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像很难受的样子但还是将阴茎吞了下去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5320',
        any: [/IF SELECTCOM == 80/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5322',
        any: [/IF CFLAG:TARGET:381 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5324',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5325',
        any: [
          /PRINTFORMW 「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5326',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5329',
        any: [
          /PRINTFORMW 「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5330',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5332',
        any: [/CFLAG:TARGET:381 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5337',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5338',
        any: [
          /PRINTFORMW 「嗯噗~嗯噗呜~%UNICODE\(0x2661\) \*1%…嗯~嗯~嗯唔呜呜~…嗯噗呜~…嗯噗呜~%UNICODE\(0x2661\) \*1%…嗯啾噜呜~啾噗呜~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5339',
        any: [
          /PRINTFORMW （啊啊…连俺的喉咙…都变成主人的东西了~%UNICODE\(0x2661\) \*1%…大鸡巴好好吃啊~…%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5340',
        any: [/PRINTFORMW %SAVESTR:TARGET%一脸恍惚地被侵犯着喉咙深处………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5342',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:381 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5343',
        any: [
          /PRINTFORMW 「嗯噗~…嗯唔~…嗯噗呜无~…嗯~嗯~呜呜呜~%UNICODE\(0x2661\) \*1%…嗯~…嗯噗~…啊啊~…更加地…做吧~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5344',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%流着眼泪用喉咙深处来侍奉着%NAME:MASTER%的阴茎………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5345',
        any: [/CFLAG:381 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5347',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5348',
        any: [
          /PRINTFORMW 「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5349',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5350',
        any: [/CFLAG:381 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5352',
        any: [/ELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5353',
        any: [
          /PRINTFORMW 「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5354',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5355',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5366',
        any: [/IF SELECTCOM == 87/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5369',
        any: [/IF CFLAG:TARGET:348 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5371',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5372',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5374',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5376',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5377',
        any: [/PRINTFORMW 「呜~…啊呜~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5378',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在皮肤上第一次穿孔而发出了悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5380',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5381',
        any: [
          /PRINTFORMW 「啊嗯~…乳头变得太敏感了真是令人苦恼啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5382',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5384',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5385',
        any: [
          /PRINTFORMW 「嗯哼哼、真时髦啊，好棒呢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5386',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着肚子的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5388',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5389',
        any: [
          /PRINTFORMW 「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5390',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇环的刺激而发情了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5392',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5393',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5394',
        any: [
          /PRINTFORMW 「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5395',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被装上了阴茎环、一脸恍惚的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5397',
        any: [
          /PRINTFORMW 「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5398',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被装上了阴蒂环、一脸恍惚的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5401',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5402',
        any: [/PRINTFORMW 「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5403',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5405',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5406',
        any: [/PRINTFORMW 「啊哈哈~…有种大人的感觉~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5407',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着在嘴唇上的唇环确认着唇环的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5409',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5410',
        any: [/PRINTFORMW 「呐呐…这样子真的很漂亮吗？…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5411',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了鼻环后，不断地抿着鼻子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5415',
        any: [/PRINTFORMW %SAVESTR:TARGET%取掉环后，不停地摩擦着环的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5418',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5420',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5421',
        any: [/PRINTFORMW 「啊~…啊呜~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5422',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在皮肤上第一次穿孔而发出了小小的悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5424',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5425',
        any: [
          /PRINTFORMW 「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5426',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%让两个乳头勃起来、乳环晃动了一下发出了光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5428',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5429',
        any: [/PRINTFORMW 「真是美妙的礼物啊，真是非常感谢呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5430',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着带上环的肚脐周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5432',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5433',
        any: [
          /PRINTFORMW 「俺、俺的身体…变得太色情了啊…啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5434',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5436',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5437',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5438',
        any: [
          /PRINTFORMW 「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5439',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎的被穿上了阴茎环、脸颊变得通红起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5441',
        any: [
          /PRINTFORMW 「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5442',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5445',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5446',
        any: [/PRINTFORMW 「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5447',
        any: [/PRINTFORMW %SAVESTR:TARGET%直勾勾地看着在自己舌尖上的舌环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5449',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5450',
        any: [
          /PRINTFORMW 「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5451',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着在嘴唇上的唇环确认着唇环的样子后、向%SAVESTR:PLAYER%撒娇起来了~………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5453',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5454',
        any: [/PRINTFORMW 「呐啊…这样适合吗？………这样真的跟俺合适吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5455',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了鼻环后，不断地抿着鼻子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5459',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%取掉环后，好像很寂寞地摩擦着环的痕迹………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5464',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5465',
        any: [/PRINTFORMW 「不要~…啊~啊呀啊啊啊啊~！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5466',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为在皮肤上第一次穿孔而发出了悲鸣、流下了眼泪。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5468',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5469',
        any: [/PRINTFORMW 「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5470',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5472',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5473',
        any: [/PRINTFORMW 「哈啊哈啊…这样的才没有问题呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5474',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5476',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5477',
        any: [/PRINTFORMW 「呀嗯~…呀啊…好过分啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5478',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇穿了环而流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5480',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5481',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5482',
        any: [/PRINTFORMW 「不要啊…为什么…为什么啊…这样的绝对不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5483',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5485',
        any: [
          /PRINTFORMW 「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5486',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5489',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5490',
        any: [
          /PRINTFORMW 「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5491',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将正在哭泣的%SAVESTR:TARGET%的舌头抓住、确定着舌环的位置………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5493',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5494',
        any: [/PRINTFORMW 「呜呜………已经，请原谅我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴唇被穿上了环、唇环微微地散发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5497',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5498',
        any: [/PRINTFORMW 「俺，俺才…不是家畜来的…是人类来的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5499',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被穿上了如同牛的鼻环一样的环而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5503',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦拭着取下环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5506',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5511',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5512',
        any: [/^\s*PRINTFORM\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5514',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5516',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5518',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5519',
        any: [
          /PRINTFORMW 「啊嗯~…乳头变得太敏感了真是令人苦恼啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5520',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5522',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5523',
        any: [
          /PRINTFORMW 「嗯哼哼、真时髦啊，好棒呢~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5524',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着肚子的周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5526',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5527',
        any: [
          /PRINTFORMW 「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5528',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇环的刺激而发情了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5530',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5531',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5532',
        any: [
          /PRINTFORMW 「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5533',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被装上了阴茎环、一脸恍惚的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5535',
        any: [
          /PRINTFORMW 「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5536',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被装上了阴蒂环、一脸恍惚的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5539',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5540',
        any: [/PRINTFORMW 「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5541',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5543',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5544',
        any: [/PRINTFORMW 「啊哈哈~…有种大人的感觉~♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5545',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着在嘴唇上的唇环确认着唇环的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5547',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5548',
        any: [/PRINTFORMW 「呐呐…这样子真的很漂亮吗？…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5549',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了鼻环后，不断地抿着鼻子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5553',
        any: [/PRINTFORMW %SAVESTR:TARGET%取掉环后，不停地摩擦着环的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5555',
        any: [/CFLAG:348 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5557',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5559',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5561',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5562',
        any: [
          /PRINTFORMW 「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5563',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%让两个乳头勃起来、乳环晃动了一下发出了光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5565',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5566',
        any: [/PRINTFORMW 「真是美妙的礼物啊，真是非常感谢呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5567',
        any: [/PRINTFORMW %SAVESTR:TARGET%抚摸着带上环的肚脐周围………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5569',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5570',
        any: [
          /PRINTFORMW 「俺、俺的身体…变得太色情了啊…啊…啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5571',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5573',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5574',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5575',
        any: [
          /PRINTFORMW 「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5576',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎的被穿上了阴茎环、脸颊变得通红起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5578',
        any: [
          /PRINTFORMW 「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5579',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5582',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5583',
        any: [/PRINTFORMW 「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5584',
        any: [/PRINTFORMW %SAVESTR:TARGET%直勾勾地看着在自己舌尖上的舌环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5586',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5587',
        any: [
          /PRINTFORMW 「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5588',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%舔着在嘴唇上的唇环确认着唇环的样子后、向%SAVESTR:PLAYER%撒娇起来了~………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5590',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5591',
        any: [/PRINTFORMW 「呐啊…这样适合吗？………这样真的跟俺合适吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5592',
        any: [/PRINTFORMW %SAVESTR:TARGET%被戴上了鼻环后，不断地抿着鼻子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5596',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%好像有点寂寞似的抚摸着取掉环的伤痕………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5598',
        any: [/CFLAG:348 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5600',
        any: [/ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5602',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5604',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5605',
        any: [/PRINTFORMW 「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5606',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5608',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5609',
        any: [/PRINTFORMW 「哈啊哈啊…这样的才没有问题呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5610',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5612',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5613',
        any: [/PRINTFORMW 「呀嗯~…呀啊…好过分啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5614',
        any: [/PRINTFORMW %SAVESTR:TARGET%因为阴唇穿了环而流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5616',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5617',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5618',
        any: [/PRINTFORMW 「不要啊…为什么…为什么啊…这样的绝对不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5619',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5621',
        any: [
          /PRINTFORMW 「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5622',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5625',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5626',
        any: [
          /PRINTFORMW 「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5627',
        any: [
          /PRINTFORMW %SAVESTR:PLAYER%将正在哭泣的%SAVESTR:TARGET%的舌头抓住、确定着舌环的位置………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5629',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5630',
        any: [/PRINTFORMW 「呜呜………已经，请原谅我吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5631',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的嘴唇被穿上了环、唇环微微地散发着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5633',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5634',
        any: [/PRINTFORMW 「俺，俺才…不是家畜来的…是人类来的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5635',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被穿上了如同牛的鼻环一样的环而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5639',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦拭着取下环后的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5641',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5654',
        any: [/@KOJO_MESSAGE_PALAMCNG_5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5671',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5685',
        any: [/A = UP:11 \+ UP:12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5686',
        any: [/IF TFLAG:3 == 1 && CFLAG:229 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5688',
        any: [/IF TFLAG:20 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5690',
        any: [/IF TALENT:TARGET:76 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5691',
        any: [
          /PRINTFORMW 「主人的肉棒…把我征服了啊…啊啊…哈嗯…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5692',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴一邊顫抖、一邊緊緊吸住%NAME:MASTER%的陰莖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5694',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5695',
        any: [
          /PRINTFORMW 「主人的…進到小穴裏面…啊嗚…更加…激烈地…所以不要緊的啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5696',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那還未成熟的小穴勉强接受了%NAME:MASTER%的陰莖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5699',
        any: [
          /PRINTFORMW 被破處的疼痛難以承受、使得%SAVESTR:TARGET%咬著嘴唇哭泣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5700',
        any: [/PRINTFORMW 「嗚嗚…好疼啊…拔出去…拔出去啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5705',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5706',
        any: [/PRINTFORMW 「哈啊…哈啊啊………比想象的要來的不疼啊、這個」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5707',
        any: [
          /PRINTFORMW 「但是下次…主人的肉棒…請侵犯我的小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5708',
        any: [/PRINTFORMW %SAVESTR:TARGET%一邊流著淚一邊説出值得贊揚的話………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5710',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5711',
        any: [/PRINTFORMW 「啊啊…要是主人的…肉、肉棒…該多好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5712',
        any: [/PRINTFORMW %SAVESTR:TARGET%看起來有些悲傷………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5715',
        any: [/PRINTFORMW 「這、這樣的…不要…啊咕…呼…嗚嗚嗚…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5716',
        any: [
          /PRINTFORMW 被破處的疼痛難以承受、使得%SAVESTR:TARGET%咬著嘴唇哭泣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5719',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5725',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5726',
        any: [/IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5728',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5730',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5731',
        any: [/PRINTFORMW 倒在%SAVESTR:TARGET%身上的潤滑油讓她不知如何是好………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5732',
        any: [/PRINTFORMW 「咿呀…有、有點冷………啊啊…黏糊糊的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5733',
        any: [/PRINTFORMW ―――潤滑第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5736',
        any: [/PRINTFORMW 「哈…哈…啊…已經這麽濕了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5737',
        any: [/PRINTFORMW 從%SAVESTR:TARGET%淌出的蜜汁讓她不知如何是好………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5738',
        any: [/PRINTFORMW ―――潤滑第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5743',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5744',
        any: [/PRINTFORMW 倒在%SAVESTR:TARGET%身上的潤滑油讓她不知如何是好………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5745',
        any: [/PRINTFORMW 「住、住手…好冷…這、這黏乎乎的是什麽呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5746',
        any: [/PRINTFORMW ―――潤滑第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5749',
        any: [/PRINTFORMW 「住…住手…不要看…不要看啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5750',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的小穴滴落著蜜汁、現在這種從來沒有過的身體反應讓少女不知如何是好………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5751',
        any: [/PRINTFORMW ―――潤滑第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5754',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5760',
        any: [/P = PALAM:5 \+ UP:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5761',
        any: [/IF P > PALAMLV:2 && CFLAG:222 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5763',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5765',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5766',
        any: [
          /PRINTFORMW 「哈…啊…好、好奇怪…想要抱緊…主人的…心情…要溢出來了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5767',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嚥下令人變得坦率的媚藥。藥好像馬上就見效了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5768',
        any: [/PRINTFORMW 「主人啊…啊~哈~…請抱住我………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5769',
        any: [/PRINTFORMW ―――欲情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5772',
        any: [/PRINTFORMW 「主人啊…我、我…主人的…想、想要………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5773',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼睛向上翻著、像是索求著什麽而催促著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5774',
        any: [/PRINTFORMW ―――欲情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5779',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5780',
        any: [/PRINTFORMW 「嗚…咳咳…你、你讓我喝了什麽！………咕哎！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5781',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被强迫著喝下媚藥、不知如何是好、藥好像馬上就見效了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5782',
        any: [/PRINTFORMW 「不要啊…怎麽回事…我的身體…變得…奇怪…了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5783',
        any: [/PRINTFORMW ―――欲情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5786',
        any: [/PRINTFORMW 「啊嗚…咕…總覺得哪裏變得好奇怪…到底是什麽啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5787',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的臉紅紅的、兩隻手扭扭捏捏不知道該放在哪裏………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5788',
        any: [/PRINTFORMW ―――欲情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5791',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5797',
        any: [/P = PALAM:8 \+ UP:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5798',
        any: [/IF P > PALAMLV:2 && CFLAG:223 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5800',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5801',
        any: [/PRINTFORMW 「啊…真、真是的…不要…主人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5802',
        any: [/PRINTFORMW 察覺到了自己正在做多麽丟臉的事………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5803',
        any: [/PRINTFORMW ―――恥情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5806',
        any: [/PRINTFORMW 「住…住手…不要看啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5807',
        any: [/PRINTFORMW 暴露著屈辱的姿態的%SAVESTR:TARGET%發出悲鳴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5808',
        any: [/PRINTFORMW ―――恥情第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5810',
        any: [/CFLAG:223 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5816',
        any: [/P = PALAM:10 \+ UP:10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5817',
        any: [/IF P > PALAMLV:2 && CFLAG:224 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5819',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5820',
        any: [/PRINTFORMW 「啊啊…拜托你了…再、再這樣下去………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5821',
        any: [/PRINTFORMW %SAVESTR:TARGET%對調教的殘酷感到恐怖………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5822',
        any: [/PRINTFORMW ―――恐怖第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5825',
        any: [/PRINTFORMW 「已…已經…不要啊…好可怕啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5826',
        any: [/PRINTFORMW %SAVESTR:TARGET%對調教的殘酷感到恐怖………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5827',
        any: [/PRINTFORMW ―――恐怖第一次超過了LV2。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5829',
        any: [/CFLAG:224 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5835',
        any: [/IF NOWEX:0 > 0 && CFLAG:225 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5837',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5838',
        any: [
          /PRINTFORMW 「哈…啊…不要…住、住手…再這樣下去…啊哈啊啊啊啊~%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5839',
        any: [/PRINTFORMW %SAVESTR:TARGET%嘗到了刺激陰蒂達到初次高潮的滋味。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5840',
        any: [
          /PRINTFORMW 「哈~%UNICODE\(0x2661\) \*1%…哈~%UNICODE\(0x2661\) \*1%…哈~%UNICODE\(0x2661\) \*1%…主人…再…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5841',
        any: [/PRINTFORMW 少女貪婪地索求著進一步的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5844',
        any: [/PRINTFORMW 「啊…哈…嘻…哈啊啊啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5845',
        any: [/PRINTFORMW %SAVESTR:TARGET%嘗到了刺激陰蒂達到初次高潮的滋味。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5846',
        any: [/PRINTFORMW 「什…什麽…這…什麽啊…哈…啊…啊啊啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5847',
        any: [/PRINTFORMW 少女沉浸在第一次高潮的餘韻里、顯得有些困惑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5849',
        any: [/CFLAG:225 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5855',
        any: [/IF NOWEX:1 > 0 && CFLAG:226 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5857',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5858',
        any: [
          /PRINTFORMW 「啊啊啊小穴%UNICODE\(0x2661\) \*1% 來嘛%UNICODE\(0x2661\) \*1% 小穴不行嗚嗚嗚%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5859',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的陰道里被陰莖插入發出了第一次陰道高潮的叫聲、陰道口痙攣似的縮緊了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5860',
        any: [
          /PRINTFORMW 「啊啊啊…我的小穴…已經記住肉棒的味道了啊…%UNICODE\(0x2661\) \*1% 想要嘗更多的肉棒…要去了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5861',
        any: [/PRINTFORMW %SAVESTR:TARGET%翻著白眼沉浸在高潮的餘韻里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5863',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5864',
        any: [
          /PRINTFORMW 「啊嘻呀啊啊…要、要來了%UNICODE\(0x2661\) \*1%…肉棒就在身邊嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5865',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的陰道里被陰莖插入發出了第一次陰道高潮的叫聲、陰道口痙攣似的縮緊了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5866',
        any: [
          /PRINTFORMW 「咿嘻…啊啊…主人…咿…去了呢…現在…厲害的要來了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5867',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%品味著餘韻、向%SAVESTR:PLAYER%撒著嬌………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5870',
        any: [
          /PRINTFORMW 「啊…嘻咿…不、不要…嘻咿…要、要變得奇怪了…我…我…啊啊啊啊~！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5871',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘗到了刺激陰道達到初次高潮的滋味、表情呆滯地沉浸在高潮的餘韻里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5872',
        any: [/PRINTFORMW 「啊啊…這是什麽啊…身体…還真是可笑啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5874',
        any: [/CFLAG:TARGET:226 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5876',
        any: [/ELSEIF NOWEX:1 > 0 && CFLAG:226 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5878',
        any: [/IF TALENT:TARGET:76 == 1 && TFLAG:60 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5879',
        any: [
          /PRINTFORMW 「啊嗚嗚…小穴要去了…去了啊%UNICODE\(0x2661\) \*1% 肉棒讓我的小穴好舒服%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5880',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的陰道里被陰莖插入發出了高潮的叫聲、陰道口痙攣似的縮緊了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5881',
        any: [
          /PRINTFORMW 「肉棒好棒…沒有什麽比肉棒更好了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5882',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出完全成爲了雌性的臉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5884',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && TFLAG:60 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5885',
        any: [
          /PRINTFORMW 「啊啊啊…不、不可以喲%UNICODE\(0x2661\) \*1%…如、如果再這樣動下去的話%UNICODE\(0x2661\) \*1%…哎呀啊那樣啊嗯…咿嘻咕咿咿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5886',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一被阴茎插入阴道深处就发出了絶頂的呻吟声、痙攣似的收紧了阴道口。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5887',
        any: [
          /PRINTFORMW 「啊…主人%UNICODE\(0x2661\) \*1% 要去了…已經…小穴要去了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5888',
        any: [/PRINTFORMW %SAVESTR:TARGET%雙腿痙攣、品味著餘韻………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5891',
        any: [
          /PRINTFORMW 「啊…嘻咿…不、不要…已…已經…小穴要不行了…嗯嘻嘻呀、要去了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5892',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%嘗到了刺激陰道達到高潮的滋味、表情呆滯地沉浸在高潮的餘韻里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5899',
        any: [/IF NOWEX:2 > 0 && CFLAG:227 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5901',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5902',
        any: [
          /PRINTFORMW 「呀哈%UNICODE\(0x2661\) \*1%…啊啊啊嘻呀%UNICODE\(0x2661\) \*1%…肛门要去了%UNICODE\(0x2661\) \*1% 屁股小穴要去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5903',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%品味著出生以來的第一次肛門高潮。腰在快感中顫抖、肛門一次又一次地抽動這。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5904',
        any: [
          /PRINTFORMW 「肛門粘乎乎地要去了啊…%UNICODE\(0x2661\) \*1% 再玩弄我的肛門啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5906',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5907',
        any: [
          /PRINTFORMW 「啊啊%UNICODE\(0x2661\) \*1%…嘿嘿嘿%UNICODE\(0x2661\) \*1%…屁股啊…不行不行、已經、不要再玩弄了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5908',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%品味著出生以來的第一次肛門高潮。腰在快感中顫抖、肛門一次又一次地抽動這。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5909',
        any: [
          /PRINTFORMW 「屁股…要融化啦%UNICODE\(0x2661\) \*1% 主人………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5912',
        any: [
          /PRINTFORMW 「啊、呀嘻…不要啊討厭…屁股…再這樣下去…不要玩弄啊…啊啊啊哈呀啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5913',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被反復調教肛門的結果、品嘗到了第一次的肛門高潮。强烈的快感讓少女連話都説不清了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5914',
        any: [/PRINTFORMW 「咿嘻…呼嘻…屁股好奇怪…要坏掉了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5916',
        any: [/CFLAG:227 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5922',
        any: [/IF NOWEX:3 > 0 && CFLAG:228 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5924',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5926',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5927',
        any: [
          /PRINTFORMW 「嘻呀%UNICODE\(0x2661\) \*1%…胸部…胸部要裂開了…啊哈啊啊呀%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5928',
        any: [/PRINTFORMW %SAVESTR:TARGET%的巨乳受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5929',
        any: [/PRINTFORMW 「胸部這麽大真是…太好…了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5931',
        any: [
          /PRINTFORMW 「呀啊啊…%UNICODE\(0x2661\) \*1% 胸、胸部…好、好厉害…好爽～…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5932',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5933',
        any: [
          /PRINTFORMW 「胸部好舒服…請讓我更加舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5936',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5938',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5939',
        any: [
          /PRINTFORMW 「更…請更多的玩弄胸部…再…用力做喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5940',
        any: [/PRINTFORMW %SAVESTR:TARGET%的巨乳受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5941',
        any: [
          /PRINTFORMW 「啊…原來胸部大…是這麽舒服的啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5943',
        any: [
          /PRINTFORMW 「啊…再…玩弄…啊啊啊…胸部…要變得奇怪了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5944',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5945',
        any: [
          /PRINTFORMW 「主人…請讓胸部…更加舒服…啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5950',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5951',
        any: [
          /PRINTFORMW 「不…不要啊…這、這樣刺激胸部…要…要去了…去、去了啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5952',
        any: [/PRINTFORMW %SAVESTR:TARGET%的巨乳受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5953',
        any: [/PRINTFORMW 「啊…啊…這樣的不要啊…我的胸部…要回不去了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5954',
        any: [/PRINTFORMW 少女盡可能地呵護著巨乳、未知的快感的残滓中顫抖著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5956',
        any: [
          /PRINTFORMW 「啊啊…這、這是什麽啊…好、好奇怪…胸部變得好奇怪啊！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5957',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸部受到刺激、第一次高潮了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5958',
        any: [/PRINTFORMW 「我的…胸部…好…舒服………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5961',
        any: [/CFLAG:TARGET:228 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5970',
        any: [/@KOJO_MESSAGE_MARKCNG_5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5996',
        any: [/IF TFLAG:22 == 3 && CFLAG:297 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5998',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '5999',
        any: [/PRINTFORMW 「啊咕…主、主人…痛…好痛…已經…不行…了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6000',
        any: [/PRINTFORMW %SAVESTR:TARGET%臨近承受痛苦的極限、嚎啕大哭起來。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6001',
        any: [/PRINTFORMW 「我、我…做了什么不好的事吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6003',
        any: [/PRINTFORMW 「不要啊…痛的…不要啊…再這樣下去…請原諒我啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6004',
        any: [/PRINTFORMW %SAVESTR:TARGET%臨近承受痛苦的極限、嚎啕大哭起來………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6006',
        any: [/CFLAG:297 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6012',
        any: [/IF TFLAG:23 == 3 && CFLAG:298 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6014',
        any: [/IF TALENT:85 == 1 \|\| TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6015',
        any: [
          /PRINTFORMW 「啊…嗚…啊啊…滿滿地…被强迫著要去了啊…啊啊…主人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6016',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被多次刻上快樂的印記、露出一副完全成爲了雌性的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6018',
        any: [
          /PRINTFORMW 「嗚啊…啊…啊啊…呼啊啊啊…已、已經…想要高潮…咿嘻…呀啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6019',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%被多次刻上快樂的印記、露出一副完全成爲了雌性的表情………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6021',
        any: [/CFLAG:298 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6027',
        any: [/IF TFLAG:24 == 3 && CFLAG:299 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6029',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6030',
        any: [
          /PRINTFORMW 「啊…不妙…衹有主人、我的主人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6031',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%出神地凝視著%NAME:MASTER%、已經不會再違抗了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6033',
        any: [
          /PRINTFORMW 「對不起…對不起…已經…不會再違抗主人了…再也不會說囂張的話了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6034',
        any: [
          /PRINTFORMW 反復的調教讓疲憊的%SAVESTR:TARGET%向你許下了屈服的誓言………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6036',
        any: [/CFLAG:299 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6042',
        any: [/IF TFLAG:21 == 3 && CFLAG:300 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6044',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6045',
        any: [/PRINTFORMW 「不要啊…真是的…不要碰”我”啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6046',
        any: [
          /PRINTFORMW 好像有些做過頭了、%SAVESTR:TARGET%帶著反抗心怒視著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6047',
        any: [/PRINTFORMW 「這、這樣的…已經受夠了…討厭！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6049',
        any: [/PRINTFORMW 「嗚嗚嗚…嗚咕…真是的…離我遠點…離我遠點啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6050',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的眼裏汎著淚光、怒視著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6051',
        any: [/PRINTFORMW 「真是的…不要碰我啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6053',
        any: [/CFLAG:300 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6060',
        any: [/@SELF_KOJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6064',
        any: [/IF TFLAG:13 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6066',
        any: [/IF Q == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6067',
        any: [
          /PRINTFORML 「被%SAVESTR:ASSI%大人…滿滿地…撫摸著啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6068',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%如同渴求著%SAVESTR:ASSI%的殘渣一般讓股間貼近她的手指………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6070',
        any: [/ELSEIF Q == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6071',
        any: [
          /PRINTFORML 「狗狗的肉棒…好想要啊%UNICODE\(0x2661\) \*1%…衹用手指什麽的根本不能滿足啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6072',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用手指自慰著、不過似乎完全沒有過癮的樣子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6076',
        any: [
          /IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:261 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6077',
        any: [
          /PRINTFORMW 「啊嘻咿咿…%UNICODE\(0x2661\) \*1% 屁股小穴…還想要被更多地侵犯啊%UNICODE\(0x2661\) \*1%…想要被侵犯啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6078',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊沉浸在調教的餘韻里一邊玩弄著肛門………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6079',
        any: [/CFLAG:261 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6081',
        any: [/ELSEIF TALENT:76 && \(CFLAG:261 < 5 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6083',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6084',
        any: [
          /PRINTFORMW 「啊哈…主人…明明衹是想要被侵犯小穴%UNICODE\(0x2661\) \*1%…啊啊啊…忍不了了…忍不了了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6085',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的手指在小穴里攪動著卻沒有弄破處女膜。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6086',
        any: [
          /PRINTFORMW 「再不快點的話…我就自己…把它弄破了啦%UNICODE\(0x2661\) \*1%…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6088',
        any: [
          /PRINTFORMW 「嘻呀%UNICODE\(0x2661\) \*1%…趁主人的氣味還殘留著…把氣味印刻在這裏%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6089',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%撥開小穴、把手指插了進去、來回攪弄著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6090',
        any: [
          /PRINTFORMW 「主人的汗也好唾液也好…全部都是…瑪奧的東西哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6092',
        any: [/CFLAG:261 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6094',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:261 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6095',
        any: [
          /PRINTFORMW 「屁、屁股小穴%UNICODE\(0x2661\) \*1%…屁股小穴好舒服喲%UNICODE\(0x2661\) \*1%…我…已、已經不行了…要瘋了啊…屁股小穴要翻開了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6096',
        any: [
          /PRINTFORMW 或許是主人看不到的原因、%SAVESTR:TARGET%激烈地肛門自慰著、完全停不下來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6097',
        any: [
          /PRINTFORMW 「哦%UNICODE\(0x2661\) \*1%…哦哦哦%UNICODE\(0x2661\) \*1%…快感蔓延開來了%UNICODE\(0x2661\) \*1%…蔓延開來啦%UNICODE\(0x2661\) \*1%…這裏…想要粗大的肉棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6098',
        any: [/CFLAG:261 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6100',
        any: [/ELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6101',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6102',
        any: [
          /PRINTFORMW 「啊啊…被主人調教…被注視…被觸碰…我…已經這麽濕了啊…%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6103',
        any: [
          /PRINTFORMW 或許是主人看不到的原因、%SAVESTR:TARGET%激烈地自慰著、完全停不下來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6104',
        any: [
          /PRINTFORMW 「啊…嗯…主人啊…快點來…奪去…我的處女啊%UNICODE\(0x2661\) \*1%…再不快點的話…我就…就自己動手了啦…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6106',
        any: [
          /PRINTFORMW 「主人啊%UNICODE\(0x2661\) \*1%…主人啊%UNICODE\(0x2661\) \*1%…想要…你看著我啊%UNICODE\(0x2661\) \*1%…想要你注視著我啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6107',
        any: [
          /PRINTFORMW 或許是主人看不到的原因、%SAVESTR:TARGET%激烈地自慰著、完全停不下來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6108',
        any: [
          /PRINTFORMW 「一想到主人小穴都已經一片泥濘了%UNICODE\(0x2661\) \*1% 自己的手指什麽的根本滿足不了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6109',
        any: [
          /PRINTFORMW 少女的手指在小穴里來回攪弄著、愛液飛濺得床上到處都是………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6111',
        any: [/CFLAG:261 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6113',
        any: [/ELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6114',
        any: [
          /PRINTFORMW 「哈啊啊%UNICODE\(0x2661\) \*1%…玩弄那裏…受不了…舒服到受不了啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6115',
        any: [
          /PRINTFORMW 「這樣舒服的事情根本不想停下來啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6116',
        any: [/CFLAG:261 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6118',
        any: [/ELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6119',
        any: [
          /PRINTFORMW 「這樣的事…好想做…卻做不了啊…身體好難受…不、不行啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6120',
        any: [/PRINTFORMW %SAVESTR:TARGET%一邊幽幽地哭泣一邊自慰著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6121',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6129',
        any: [/IF TFLAG:13 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6131',
        any: [/IF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6132',
        any: [
          /PRINTFORMW 「姐姐大人啊…%UNICODE\(0x2661\) \*1% 姐姐大人啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6133',
        any: [/PRINTFORMW 少女和%SAVESTR:ASSI%身体重合、激烈地性交著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6134',
        any: [
          /PRINTFORMW 「好舒服啊…好喜歡性交%UNICODE\(0x2661\) \*1%…最喜歡性交了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6135',
        any: [/CFLAG:262 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6137',
        any: [/ELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6138',
        any: [
          /PRINTFORMW 「這種事…明明不能做的…主人…真是壞心眼…讓我做這種事………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6139',
        any: [/PRINTFORMW %SAVESTR:ASSI%按倒了少女、把手指伸向了少女的小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6141',
        any: [/IF TFLAG:23 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6142',
        any: [
          /PRINTFORMW 少女一邊流著淚一邊抗拒著、然而身體上被刻上的快樂的刻印卻不容許她這樣做。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6143',
        any: [
          /PRINTFORMW 「嗚啊…啊%UNICODE\(0x2661\) \*1%…那裏…不可以…不可以啊…所以啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6144',
        any: [/PRINTFORMW 看著慢慢張開雙腿的少女、%SAVESTR:ASSI%竊笑著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6145',
        any: [
          /PRINTFORMW 「不…不是的…感覺什麽的…才沒有啦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6148',
        any: [
          /PRINTFORMW 少女一邊被%SAVESTR:ASSI%玩弄著一邊拼命忍住不發出呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6149',
        any: [/PRINTFORMW 「嗚…咕…嗚啊…啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6150',
        any: [/PRINTFORM %SAVESTR:ASSI%看著那樣的少女、感到很滿意/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6151',
        any: [/IF TIME == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6152',
        any: [/PRINTFORMW 直到天黑一直都在玩弄著少女………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6154',
        any: [/PRINTFORMW 整個晚上都在玩弄著少女………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6157',
        any: [/CFLAG:262 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6159',
        any: [/ELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6160',
        any: [
          /PRINTFORMW 「嗚呼呼…勇者大人啊…我會好好地侍奉你的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6161',
        any: [
          /PRINTFORMW 少女諂媚的聲音在房間里響起、%SAVESTR:ASSI%看著努力侍奉的少女、從内心深處感到高興。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6162',
        any: [/PRINTFORMW 「啊嗯…我可以稱呼您爲姐姐大人嗎？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6163',
        any: [/PRINTFORMW %SAVESTR:ASSI%一邊點頭一邊溫柔地撫摸著少女的頭………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6164',
        any: [/CFLAG:262 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6166',
        any: [/ELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6167',
        any: [
          /PRINTFORMW 「嗯…哈…啊…啊啊…勇者大人…多親親我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6168',
        any: [/PRINTFORMW %SAVESTR:TARGET%的身體被親吻得嬌喘連連。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6169',
        any: [
          /PRINTFORMW 從平凡的村娘被原勇者%SAVESTR:ASSI%連續不斷地玩弄著這番淫靡的景象中、能夠感受到%SAVESTR:ASSI%無休止的墮落著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6170',
        any: [/CFLAG:262 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6172',
        any: [/ELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6173',
        any: [
          /PRINTFORMW 「嗯…啊啊…我、我是真的…真的…不喜歡啊…但、但是………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6174',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊這麽説著一邊卻和%SAVESTR:ASSI%交纏著雙腿………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6175',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6182',
        any: [/IF TFLAG:13 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6184',
        any: [/IF TALENT:76 == 1 && \(CFLAG:263 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6185',
        any: [
          /PRINTFORMW 「啊嗯…精液%UNICODE\(0x2661\) \*1%…還想要更多主人的精液喲………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6186',
        any: [
          /PRINTFORMW 衹有一次射精并不能讓%SAVESTR:TARGET%感到滿足、於是她又把陰莖含進了嘴裏并用舌頭套弄著、讓陰莖再一次地射出了精液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6187',
        any: [
          /PRINTFORMW 「啾噗%UNICODE\(0x2661\) \*1%…啾噗%UNICODE\(0x2661\) \*1%…啾嗚嗚%UNICODE\(0x2661\) \*1%…嗯…再勃起得更有精神一點啊…還要給我吃更多的精液喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6188',
        any: [
          /PRINTFORMW 强行把陰莖嚥到喉嚨深處使得少女可愛的臉有點變形、顯得十分淫蕩。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6189',
        any: [
          /PRINTFORMW 「嗯咕…啾噗…嗯咕嗯咕%UNICODE\(0x2661\) \*1% 肉棒好好吃…好好吃…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6190',
        any: [/CFLAG:263 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6192',
        any: [/ELSEIF TALENT:85 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6193',
        any: [/PRINTFORMW 「嗯啊…啾噗…嗯咕…嗯咕…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6194',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%用舌頭精心清理著%NAME:MASTER%的陰莖。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6195',
        any: [
          /PRINTFORMW 「啊嗯…這裏也殘留著呢%UNICODE\(0x2661\) \*1% 主人的精液…很美味喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6196',
        any: [/PRINTFORMW 少女一副如果放著不管的話能侍奉肉棒一整天的樣子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6197',
        any: [/CFLAG:263 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6199',
        any: [/ELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6200',
        any: [
          /PRINTFORMW 「嗯噗…啾噗…啾…啾…全部都會…好好舔乾净的…乖乖等著………就可以了啦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6201',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%熱誠地進行著早安口交之後的清理、連一滴精液也不想殘留下來的樣子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6202',
        any: [/PRINTFORMW 「嗯…啾…啾…啊…哈啊…早、早上好、主人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6203',
        any: [/PRINTFORMW 少女害羞地向你問好、高高興興地從房間里出去了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6204',
        any: [/CFLAG:263 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6206',
        any: [/ELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6207',
        any: [
          /PRINTFORMW 「哈…哈…早上好哦、主人…啊…從早上開始就這麽濃鬱了…………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6208',
        any: [/PRINTFORMW %SAVESTR:TARGET%擦著臉上的精液、快要哭出來的樣子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6209',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6216',
        any: [/IF TFLAG:13 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6218',
        any: [/IF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6219',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看起來已經十分習慣和%NAME:MASTER%做愛了。少女的小穴被抽插時發出了清亮甜美的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6220',
        any: [
          /PRINTFORMW 「主人啊…再…請再激烈一些…把我的小穴弄得亂七八糟的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6221',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%纏繞在%NAME:MASTER%腰上的雙腿快由於快感不住地顫抖。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6222',
        any: [
          /PRINTFORMW 「哈啊%UNICODE\(0x2661\) \*1% 好喜歡和主人做愛了%UNICODE\(0x2661\) \*1% 最喜歡和主人做愛了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6224',
        any: [/PRINTFORMW %SAVESTR:TARGET%被中出之後看上去十分滿足………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6225',
        any: [/CFLAG:264 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6227',
        any: [/ELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6228',
        any: [
          /PRINTFORMW 「主人啊…%UNICODE\(0x2661\) \*1% 全部…全部都射進來………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6229',
        any: [
          /PRINTFORMW 「哈…啊…嗯啊嗯…好高興%UNICODE\(0x2661\) \*1% 被你抱在懷裏真的好高興…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6230',
        any: [
          /PRINTFORMW 「啊…啊啊…啊嗯…%UNICODE\(0x2661\) \*1% 這麽多%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6231',
        any: [/PRINTFORMW %SAVESTR:TARGET%張開雙腿撥弄著淌出的精液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6232',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6239',
        any: [/IF TFLAG:13 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6240',
        any: [/IF CFLAG:265 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6241',
        any: [/PRINTFORMW 「欸嘿嘿…一起睡吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6242',
        any: [
          /PRINTFORMW 「對我動手動脚…也是可以的喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6243',
        any: [/PRINTFORMW %SAVESTR:TARGET%帶著獻媚的眼神、走進了房間………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6244',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6256',
        any: [/IF TFLAG:13 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6258',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6260',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6262',
        any: [/IF S >= 1000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6263',
        any: [/PRINTFORMW 被魔界的某位貴族買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6264',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6265',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6266',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6267',
        any: [/PRINTFORMW 聽聞有傳言說是作爲寵姬被疼愛著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6268',
        any: [/PRINTFORMW 沒有教養、但充滿魅力的特質正是主人所喜愛的地方。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6271',
        any: [/PRINTFORMW 據説已經懷上了主人的孩子、很快就要分娩了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6272',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6274',
        any: [/ELSEIF S >= 500000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6275',
        any: [
          /PRINTFORMW 被某位魔族的收藏家買下的%SAVESTR:TARGET%、在這之後………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6276',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6277',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6278',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6279',
        any: [/PRINTFORMW 聽聞有傳言說是和收藏家結婚了、也很受孩子們歡迎。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6280',
        any: [/PRINTFORMW 現在好像做著出色的魔族的「母親」。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6281',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6283',
        any: [/ELSEIF S >= 100000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6284',
        any: [/PRINTFORMW 被某位魔族的商人買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6285',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6286',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6287',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6288',
        any: [/PRINTFORMW 作爲商人的情人和接待道具度過每一天。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6289',
        any: [
          /PRINTFORMW 過著不知道是否幸福卻很富足的日子、衹要商人不破產的話應該能這樣好好生活下去的吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6290',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6293',
        any: [/PRINTFORMW 被某位魔族的農戶買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6294',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6295',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6296',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6297',
        any: [/PRINTFORMW 有傳言說是成爲了不停生育的奴隸。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6298',
        any: [
          /PRINTFORMW 生出了好幾個孩子增加了農場的勞動力、主人對此感到很高興。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6299',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6304',
        any: [/IF S >= 1000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6305',
        any: [/PRINTFORMW 被魔界的某位貴族買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6306',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6307',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6308',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6309',
        any: [/PRINTFORMW 有傳言說每晚都被貴族兒子的玩伴們疼愛著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6310',
        any: [
          /PRINTFORMW 據説因爲%SAVESTR:TARGET%年齡相近的原因還找到了戀人。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6311',
        any: [
          /PRINTFORMW 如果她真的希望這種關係的話、在她前方迎接她的應該是充滿苦難的路吧、不過已經和%NAME:MASTER%沒有關係了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6312',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6314',
        any: [/ELSEIF S >= 500000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6315',
        any: [/PRINTFORMW 被某位魔族的富豪買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6316',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6317',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6318',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6319',
        any: [
          /PRINTFORMW 聽聞有傳言說作爲那個家裏的寵物受到了特別的疼愛、與看門狗生下了好幾個孩子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6320',
        any: [/PRINTFORMW 富豪似乎成爲了她的飼養員。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6321',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6323',
        any: [/ELSEIF S >= 100000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6324',
        any: [/PRINTFORMW 被某位魔族的商人買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6325',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6326',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6327',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6328',
        any: [/PRINTFORMW 被送到了商人開的妓院里。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6329',
        any: [
          /PRINTFORMW 因爲被好好調教過的人類幼女奴隸非常罕見的原因、據説常客非常多。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6330',
        any: [
          /PRINTFORMW 也許有一天能替自己贖身、恢復自由之身過日子也説不定呢。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6333',
        any: [
          /PRINTFORMW 但是%NAME:MASTER%和%SAVESTR:TARGET%再也不會有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6336',
        any: [/PRINTFORMW 被某個魔族的農場買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6337',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6338',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6339',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6340',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6341',
        any: [/PRINTFORMW 由於肥大化的胸部、被作爲牛奴隷送到了牛圈里。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6342',
        any: [
          /PRINTFORMW 據説用牛魔獸的精子受精、通過注射藥物使得乳房更加肥大化、每天都被榨取牛奶。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6344',
        any: [/PRINTFORMW 爲了製作出新品種的家畜而和所有家畜交配。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6345',
        any: [
          /PRINTFORMW 雖然現在還沒有實驗成果、但將來應該會有意想不到的新品牌出現吧。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6347',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%在這之後再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6351',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6353',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6354',
        any: [
          /PRINTFORMW 掙扎著的%SAVESTR:TARGET%被擔當護衛的魔物摁在地上。但是她目露凶光向這邊喊了起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6355',
        any: [/PRINTFORMW 「你們總有一天會因爲沒有把我殺了而感到後悔的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6356',
        any: [/PRINTFORMW 「把她活活撕碎了去喂野狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6357',
        any: [
          /PRINTFORMW 於是%SAVESTR:TARGET%再也不會再次出現在%NAME:MASTER%面前了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6360',
        any: [
          /PRINTFORMW 掙扎著的%SAVESTR:TARGET%被擔當護衛的魔物摁在地上。但是她目露凶光向這邊喊了起來。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6361',
        any: [/PRINTFORMW 「你們總有一天會因爲沒有把我殺了而感到後悔的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6362',
        any: [/PRINTFORMW 「把她活活撕碎了去喂野狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6363',
        any: [
          /PRINTFORMW 於是%SAVESTR:TARGET%再也不會出現在%NAME:MASTER%的面前了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6366',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6368',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6370',
        any: [/IF S >= 1000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6371',
        any: [/PRINTFORMW 被某位魔族的將軍買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6372',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6373',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6374',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6375',
        any: [
          /PRINTFORMW 有傳言說她被連在魔族中也算是性欲旺盛的獸人將軍不停地幹到現在、%SAVESTR:TARGET%好像是壞掉了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6376',
        any: [
          /PRINTFORMW 可是通過激烈的調教、%SAVESTR:TARGET%成爲了可以稱之爲藝術品的性奴隸、好像任何行爲都能給她帶來快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6377',
        any: [
          /PRINTFORMW 將軍非常中意變成了那樣的%SAVESTR:TARGET%、賞賜給她性奴專用的房間、每晚都會好好地享用她。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6378',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6380',
        any: [/ELSEIF S >= 500000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6381',
        any: [
          /PRINTFORMW 被某個魔族的高級娼館買下的%SAVESTR:TARGET%、在這之後………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6382',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6383',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6384',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6385',
        any: [
          /PRINTFORMW 聽聞有傳言說因爲能玩特殊play而成爲了十分受歡迎的娼婦。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6386',
        any: [
          /PRINTFORMW 之後被某位大財主贖身、作爲他的第五個妻子幸福地生活著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6387',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6389',
        any: [/ELSEIF S >= 100000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6390',
        any: [/PRINTFORMW 被某個魔族的黑幫買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6391',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6392',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6393',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6394',
        any: [/PRINTFORMW 有傳言說是作爲黑幫的專屬娼婦生活著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6395',
        any: [
          /PRINTFORMW 與好幾個男人發生關係來抑制淫蕩的身體因欲求不滿而產生的疼痛、很幸福的樣子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6396',
        any: [
          /PRINTFORMW 但是%SAVESTR:TARGET%與幫會里的年輕成員相戀了、他們計劃從幫會里出逃可惜失敗了、兩人被抓后有著非常凄慘的結局。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6397',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6400',
        any: [/PRINTFORMW 被某個魔族的酒館買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6401',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6402',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6403',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6404',
        any: [/PRINTFORMW 每天晚上都被客人叫到房間里、過著快樂的日子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6405',
        any: [
          /PRINTFORMW 由於會把食物帶到店前去吃、酒館老闆對她的評價多少有點不好………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6406',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6411',
        any: [/IF S >= 1000000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6412',
        any: [/PRINTFORMW 被某位魔族的將軍買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6413',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6414',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6415',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6416',
        any: [
          /PRINTFORMW 聽聞有傳言說將軍在買下%SAVESTR:TARGET%后、三天三夜沒有邁出房門一步、在房間里玩弄著她/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6417',
        any: [/PRINTFORMW 然後在處理工作時也常常讓少女隨時侍奉在身旁。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6418',
        any: [
          /PRINTFORMW 想必早晚會正式成爲將軍的側室吧、當然這又將會是一個新的故事。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6419',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6421',
        any: [/ELSEIF S >= 500000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6422',
        any: [/PRINTFORMW 被某個魔族的學院買下的%SAVESTR:TARGET%、在這之後………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6423',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6424',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6425',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6426',
        any: [
          /PRINTFORMW 有傳言說作爲教材和學生們的性欲處理工具每天都被射入大量精液。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6427',
        any: [/PRINTFORMW 聽説生下的孩子也被關在飼育小屋里精心培育這。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6428',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6430',
        any: [/ELSEIF S >= 100000/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6431',
        any: [
          /PRINTFORMW 被某個魔族的低級娼館買下的%SAVESTR:TARGET%、在那之后………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6432',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6433',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6434',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6435',
        any: [
          /PRINTFORMW 有傳言說因爲在有特殊癖好的客人中人氣非常高的緣故、她得到了很好的待遇。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6436',
        any: [/PRINTFORMW 作爲前輩的妓女們也十分疼愛她。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6437',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6440',
        any: [/PRINTFORMW 被某位魔族的礦主買下的%SAVESTR:TARGET%、在那之后………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6441',
        any: [/PRINTFORMW ………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6442',
        any: [/PRINTFORMW ……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6443',
        any: [/PRINTFORMW …/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6444',
        any: [/PRINTFORMW 有傳言說每晚都被礦工們輪奸。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6445',
        any: [
          /PRINTFORMW 被迫接受獸欲的少女覺得再也沒有什麽是比死更快樂的了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6446',
        any: [
          /PRINTFORMW 於是%NAME:MASTER%和%SAVESTR:TARGET%再也沒有見過面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6451',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6452',
        any: [/PRINTFORMW 「好想見姐姐…好想回到村子里去………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6453',
        any: [
          /PRINTFORMW 被賣出的魔族奴隸%SAVESTR:TARGET%就這樣消失在了黑暗的世界之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6455',
        any: [/PRINTFORMW 「好想見姐姐…好想回到村子里去………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6456',
        any: [
          /PRINTFORMW 被賣出的人類奴隸%SAVESTR:TARGET%就這樣消失在了黑暗的世界之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6465',
        any: [/IF TFLAG:13 == 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6466',
        any: [/IF CFLAG:271 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6468',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6469',
        any: [
          /PRINTFORMW 「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子裏喲…啊哈…啊哈哈哈哈………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6470',
        any: [/PRINTFORMW 可憐的%SAVESTR:TARGET%好像沒能接受懷孕的事實………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6472',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6474',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6475',
        any: [
          /PRINTFORMW 「啊！那、那個……我、我…好像懷上主人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6476',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地撫摩著腹部看著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6477',
        any: [
          /PRINTFORMW 「會、會加油的…會、會生下來的…我絕對會把孩子生下來的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6478',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地抱住了喜極而泣的%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6479',
        any: [
          /PRINTFORMW 「成爲魔族…原來是這麽高興的事呀…一定會生下精神的孩子的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6481',
        any: [
          /PRINTFORMW 「啊！那、那個……我、我…好像懷上主人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6482',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地撫摩著腹部看著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6483',
        any: [
          /PRINTFORMW 「會、會加油的…會、會生下來的…我絕對會把孩子生下來的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6484',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地抱住了喜極而泣的%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6487',
        any: [/ELSEIF TALENT:76 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6489',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6490',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6491',
        any: [
          /PRINTFORMW 「欸嘿嘿…因爲做了那種事…就有了小寶寶了噢…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6492',
        any: [/PRINTFORMW 憐愛地撫摸著肌膚完全變成了青色的肚子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6493',
        any: [
          /PRINTFORMW 「主人的孩子就在這裏噢…生孩子會是一種怎樣的樂趣呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6494',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊高興地揮動著尾巴一邊報告了自己懷孕的情況………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6496',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6497',
        any: [
          /PRINTFORMW 「欸嘿嘿…因爲做了那種事…就有了小寶寶了噢…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6498',
        any: [/PRINTFORMW 少女一邊用舌頭舔著嘴唇一邊憐愛地撫摸著肚子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6499',
        any: [
          /PRINTFORMW 「主人的孩子就在這裏噢…生孩子會是一種怎樣的樂趣呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6500',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊高興地笑著一邊報告了自己懷孕的情況………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6503',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6504',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6505',
        any: [/PRINTFORMW 「一直這麽做的話懷上狗狗的孩子也沒辦法啦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6506',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊沒心沒肺欸嘿嘿地笑著一邊憐愛地撫摸著肉眼可見鼓起的肚子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6508',
        any: [/PRINTFORMW 「啊啊啊…懷上了狗狗的孩子…這是爲什麽啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6511',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6512',
        any: [/PRINTFORMW 「我、我有了狂王的孩子…？騙、騙人…肯定是騙人的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6514',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6516',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6517',
        any: [/PRINTFORMW 「那、那個…我好像懷孕了…但是…那個…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6518',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表情很不安、背上的翅膀無力地下垂著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6519',
        any: [
          /PRINTFORMW 「那個…仔細地想了下…大概不是主人的…但、但是…衹有孩子、我不想打掉………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6520',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地安慰著青色肌膚上淌滿淚水的%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6522',
        any: [/PRINTFORMW 「那、那個…我好像懷孕了…但是…那個…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6523',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表情很不安、看著%NAME:MASTER%向他報告自己懷孕了的情況。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6524',
        any: [
          /PRINTFORMW 「那個…仔細地想了下…大概不是主人的…但、但是…衹有孩子、我不想打掉………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6525',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地安慰著不停流著眼淚的%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6528',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6530',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6531',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6532',
        any: [
          /PRINTFORMW 「欸嘿嘿…主人啊…我好像懷孕了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6533',
        any: [/PRINTFORMW 一邊欸嘿嘿地笑著一邊憐愛地撫摸著青色肌膚的肚子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6534',
        any: [
          /PRINTFORMW 「和別人做了那麽多次…也不知道是誰的孩子喲…但是我可以把他生下來的吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6535',
        any: [/PRINTFORMW %SAVESTR:TARGET%眯起了魔族的眼睛、露出了微笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6537',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6538',
        any: [
          /PRINTFORMW 「欸嘿嘿…主人啊…我好像懷孕了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6539',
        any: [
          /PRINTFORMW 一邊沒心沒肺欸嘿嘿地笑著一邊憐愛地撫摸著肉眼可見鼓起的肚子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6540',
        any: [
          /PRINTFORMW 「和別人做了那麽多次…也不知道是誰的孩子喲…但是我可以把他生下來的吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6541',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了微笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6544',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6545',
        any: [/PRINTFORMW 「爲、爲什麽我會…怎麽看…都…都是你的錯啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6546',
        any: [/PRINTFORMW %SAVESTR:TARGET%以厭惡的眼神瞪著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6547',
        any: [/PRINTFORMW 「魔物的孩子什麽的我是絕對不會生下來的…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6551',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6552',
        any: [
          /PRINTFORMW 「啊…怎麽這樣…我、我懷孕了啊…怎麽辦啊…好害怕…我好害怕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6553',
        any: [/PRINTFORMW %SAVESTR:TARGET%無助地抱著雙肩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6554',
        any: [
          /PRINTFORMW 「一定是…是因爲成爲了魔族…才會懷孕的…太過分了…實在是太過分了啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6556',
        any: [
          /PRINTFORMW 「啊…怎麽這樣…我、我懷孕了啊…怎麽辦啊…好害怕…我好害怕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6557',
        any: [/PRINTFORMW %SAVESTR:TARGET%無助地抱著雙肩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6560',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6564',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6565',
        any: [
          /PRINTFORMW 「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子裏喲…啊哈…啊哈哈哈哈………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6566',
        any: [/PRINTFORMW 可憐的%SAVESTR:TARGET%好像沒能接受懷孕的事實………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6568',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6570',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6571',
        any: [
          /PRINTFORMW 「啊！那、那個……我、我…好像懷上主人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6572',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地撫摩著腹部看著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6573',
        any: [
          /PRINTFORMW 「會、會加油的…會、會生下來的…我絕對會把孩子生下來的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6574',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地抱住了喜極而泣的%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6575',
        any: [
          /PRINTFORMW 「成爲魔族…原來是這麽高興的事呀…一定會生下精神的孩子的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6577',
        any: [
          /PRINTFORMW 「啊！那、那個……我、我…好像懷上主人的孩子了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6578',
        any: [/PRINTFORMW %SAVESTR:TARGET%害羞地撫摩著腹部看著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6579',
        any: [
          /PRINTFORMW 「會、會加油的…會、會生下來的…我絕對會把孩子生下來的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6580',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地抱住了喜極而泣的%SAVESTR:TARGET%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6583',
        any: [/ELSEIF TALENT:76 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6585',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6586',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6587',
        any: [
          /PRINTFORMW 「欸嘿嘿…因爲做了那種事…就有了小寶寶了噢…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6588',
        any: [/PRINTFORMW 憐愛地撫摸著肌膚完全變成了青色的肚子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6589',
        any: [
          /PRINTFORMW 「主人的孩子就在這裏噢…生孩子會是一種怎樣的樂趣呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6590',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊高興地揮動著尾巴一邊報告了自己懷孕的情況………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6592',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6593',
        any: [
          /PRINTFORMW 「欸嘿嘿…因爲做了那種事…就有了小寶寶了噢…主人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6594',
        any: [/PRINTFORMW 少女一邊用舌頭舔著嘴唇一邊憐愛地撫摸著肚子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6595',
        any: [
          /PRINTFORMW 「主人的孩子就在這裏噢…生孩子會是一種怎樣的樂趣呢………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6596',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊高興地笑著一邊報告了自己懷孕的情況………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6599',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6600',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6601',
        any: [/PRINTFORMW 「一直這麽做的話懷上狗狗的孩子也沒辦法啦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6602',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一邊沒心沒肺欸嘿嘿地笑著一邊憐愛地撫摸著肉眼可見鼓起的肚子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6604',
        any: [/PRINTFORMW 「啊啊啊…懷上了狗狗的孩子…這是爲什麽啊…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6607',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6608',
        any: [/PRINTFORMW 「我、我有了狂王的孩子…？騙、騙人…肯定是騙人的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6610',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6612',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6613',
        any: [/PRINTFORMW 「那、那個…我好像懷孕了…但是…那個…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6614',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表情很不安、背上的翅膀無力地下垂著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6615',
        any: [
          /PRINTFORMW 「那個…仔細地想了下…大概不是主人的…但、但是…衹有孩子、我不想打掉………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6616',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地安慰著青色肌膚上淌滿淚水的%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6618',
        any: [/PRINTFORMW 「那、那個…我好像懷孕了…但是…那個…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6619',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%表情很不安、看著%NAME:MASTER%向他報告自己懷孕了的情況。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6620',
        any: [
          /PRINTFORMW 「那個…仔細地想了下…大概不是主人的…但、但是…衹有孩子、我不想打掉………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6621',
        any: [
          /PRINTFORMW %NAME:MASTER%溫柔地安慰著不停流著眼淚的%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6624',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6626',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6627',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6628',
        any: [
          /PRINTFORMW 「欸嘿嘿…主人啊…我好像懷孕了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6629',
        any: [/PRINTFORMW 一邊欸嘿嘿地笑著一邊憐愛地撫摸著青色肌膚的肚子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6630',
        any: [
          /PRINTFORMW 「和別人做了那麽多次…也不知道是誰的孩子喲…但是我可以把他生下來的吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6631',
        any: [/PRINTFORMW %SAVESTR:TARGET%眯起了魔族的眼睛、露出了微笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6633',
        any: [
          /PRINTFORMW 和往常一樣一臉心神蕩漾的%SAVESTR:TARGET%看著%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6634',
        any: [
          /PRINTFORMW 「欸嘿嘿…主人啊…我好像懷孕了呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6635',
        any: [
          /PRINTFORMW 一邊沒心沒肺欸嘿嘿地笑著一邊憐愛地撫摸著肉眼可見鼓起的肚子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6636',
        any: [
          /PRINTFORMW 「和別人做了那麽多次…也不知道是誰的孩子喲…但是我可以把他生下來的吧？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6637',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出了微笑………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6640',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6641',
        any: [/PRINTFORMW 「爲、爲什麽我會…怎麽看…都…都是你的錯啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6642',
        any: [/PRINTFORMW %SAVESTR:TARGET%以厭惡的眼神瞪著%NAME:MASTER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6643',
        any: [/PRINTFORMW 「魔物的孩子什麽的我是絕對不會生下來的啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6647',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6648',
        any: [
          /PRINTFORMW 「啊…怎麽這樣…我、我懷孕了啊…怎麽辦啊…好害怕…我好害怕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6649',
        any: [/PRINTFORMW %SAVESTR:TARGET%無助地抱著雙肩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6650',
        any: [
          /PRINTFORMW 「一定是…是因爲成爲了魔族…才會懷孕的…太過分了…實在是太過分了啦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6652',
        any: [
          /PRINTFORMW 「啊…怎麽這樣…我、我懷孕了啊…怎麽辦啊…好害怕…我好害怕………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6653',
        any: [/PRINTFORMW %SAVESTR:TARGET%無助地抱著雙肩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6656',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6663',
        any: [/IF TFLAG:13 == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6664',
        any: [/IF CFLAG:272 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6666',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6667',
        any: [
          /PRINTFORMW 「啊呀呀啊啊…哈啊…精神的小寶寶出生了喲…看呐…姐姐……哈…哈………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6668',
        any: [
          /PRINTFORMW 精神已經完全混亂的%SAVESTR:TARGET%嘴裏説著莫名其妙的話………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6670',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6672',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6673',
        any: [/PRINTFORMW 「生出來啦…啊啊…我的小寶寶出生了喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6674',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那魔族的黃色眼瞳中流下喜悅的淚水、不停地喘息著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6675',
        any: [/PRINTFORMW 「啊…要生更多…主人的………魔王大人的孩子要生更多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6677',
        any: [/PRINTFORMW 「生出來啦…啊啊…我的小寶寶出生了喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6678',
        any: [/PRINTFORMW %SAVESTR:TARGET%流下喜悅的淚水、喘著粗氣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6679',
        any: [/PRINTFORMW 「啊…要生更多…主人的………魔王大人的孩子要生更多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6680',
        any: [/PRINTFORMW 就這樣少女成爲了被詛咒的魔物的母親………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6683',
        any: [/ELSEIF TALENT:76 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6685',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6686',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…啊哈…特別有精神的寶寶喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6687',
        any: [/PRINTFORMW 生完孩子的%SAVESTR:TARGET%艱難地呼吸著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6688',
        any: [
          /PRINTFORMW 「因爲還在肚子裏的時候就很鬧騰呢…總是能感覺得到呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6689',
        any: [/PRINTFORMW 青色的肌膚上浮起汗珠、臉上浮現出笑容。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6690',
        any: [
          /PRINTFORMW 「啊嗯…這樣的話又想生了…生更多的………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6692',
        any: [
          /PRINTFORMW 「啊…我、我的小穴…撐開了…變成這樣了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6693',
        any: [
          /PRINTFORMW 大概是因爲人類的身體、而且還是以少女的身體生出魔物的緣故吧、%SAVESTR:TARGET%虛脫了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6694',
        any: [
          /PRINTFORMW 「主人的小寶寶…十分精神…我已經…哈…哈…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6695',
        any: [
          /PRINTFORMW %NAME:MASTER%輕輕地撫摸著%SAVESTR:TARGET%的頭讓她慢慢陷入沉睡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6698',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6699',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6700',
        any: [
          /PRINTFORMW 「生出來了啊…可愛的小狗崽生出來了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6702',
        any: [
          /PRINTFORMW 「哈啊啊…直到最後都沒捨棄希望…真的是狗狗的小寶寶啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6705',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6706',
        any: [/PRINTFORMW 「哈啊…出、出生了…狂王大人的小寶寶…啊呀啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6708',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6710',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6711',
        any: [/PRINTFORMW 「生出了精神的小寶寶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6712',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%作出產報告。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6713',
        any: [/PRINTFORMW 「但是下次…想生主人的孩子喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6715',
        any: [/PRINTFORMW 「生出了精神的小寶寶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6716',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%作出產報告。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6717',
        any: [/PRINTFORMW 「但是下次…想生主人的孩子喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6720',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6722',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6723',
        any: [
          /PRINTFORMW 「啊啊啊…生孩子原來是這麽的舒服…呐…再讓我懷孕…我還要懷上更多的孩子…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6724',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的魔族的黃色眼瞳水汪汪地、向%NAME:MASTER%乞求著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6726',
        any: [
          /PRINTFORMW 「哈啊…生下魔物的孩子原來是這麽的舒服…下次想生下主人的孩子喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6727',
        any: [/PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%乞求著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6730',
        any: [/ELSEIF MARK:3 == 3 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6731',
        any: [/PRINTFORMW 「不…不要啊…生下你的孩子什麽的不要啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6732',
        any: [
          /PRINTFORMW 事到如今%SAVESTR:TARGET%手脚被捆著、一邊掙扎一邊生下了孩子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6733',
        any: [/PRINTFORMW 「討厭…不要…我不要生孩子啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6735',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6736',
        any: [/PRINTFORMW 「不…不要啊…生孩子什麽的不要啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6737',
        any: [
          /PRINTFORMW 事到如今%SAVESTR:TARGET%手脚被捆著、一邊掙扎一邊生下了孩子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6738',
        any: [/PRINTFORMW 「討厭…不要…我不要生孩子啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6742',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6743',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%剛懷孕時還十分抗拒，不過到了臨月就完全老實下來了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6744',
        any: [/PRINTFORMW 「像這樣生孩子什麽的…從來就沒想過啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6745',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%憐愛地撫摸著鼓起的肚子、就這樣平安的生下了孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6747',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%剛懷孕時還十分抗拒，不過到了臨月就完全老實下來了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6748',
        any: [/PRINTFORMW 「像這樣生孩子什麽的…從來就沒想過啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6749',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%憐愛地撫摸著鼓起的肚子、就這樣平安的生下了孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6752',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6756',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6757',
        any: [
          /PRINTFORMW 「啊呀呀啊啊…哈啊…精神的小寶寶出生了喲…看呐…姐姐……哈…哈………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6758',
        any: [
          /PRINTFORMW 精神已經完全混亂的%SAVESTR:TARGET%嘴裏説著莫名其妙的話………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6760',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6762',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6763',
        any: [/PRINTFORMW 「生出來啦…啊啊…我的小寶寶出生了喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6764',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%那魔族的黃色眼瞳中流下喜悅的淚水、不停地喘息著。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6765',
        any: [/PRINTFORMW 「啊…要生更多…主人的………魔王大人的孩子要生更多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6767',
        any: [/PRINTFORMW 「生出來啦…啊啊…我的小寶寶出生了喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6768',
        any: [/PRINTFORMW %SAVESTR:TARGET%流下喜悅的淚水、喘著粗氣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6769',
        any: [/PRINTFORMW 「啊…要生更多…主人的………魔王大人的孩子要生更多………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6770',
        any: [/PRINTFORMW 就這樣少女成爲了被詛咒的魔物的母親………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6773',
        any: [/ELSEIF TALENT:76 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6775',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6776',
        any: [
          /PRINTFORMW 「啊嗯…啊啊…啊哈…特別有精神的寶寶喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6777',
        any: [/PRINTFORMW 生完孩子的%SAVESTR:TARGET%艱難地呼吸著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6778',
        any: [
          /PRINTFORMW 「因爲還在肚子裏的時候就很鬧騰呢…總是能感覺得到呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6779',
        any: [/PRINTFORMW 青色的肌膚上浮起汗珠、臉上浮現出笑容。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6780',
        any: [
          /PRINTFORMW 「啊嗯…這樣的話又想生了…生更多的………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6782',
        any: [
          /PRINTFORMW 「啊…我、我的小穴…撐開了…變成這樣了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6783',
        any: [
          /PRINTFORMW 大概是因爲人類的身體、而且還是以少女的身體生出魔物的緣故吧、%SAVESTR:TARGET%虛脫了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6784',
        any: [
          /PRINTFORMW 「主人的小寶寶…十分精神…我已經…哈…哈…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6785',
        any: [
          /PRINTFORMW %NAME:MASTER%輕輕地撫摸著%SAVESTR:TARGET%的頭讓她慢慢陷入沉睡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6788',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6789',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6790',
        any: [
          /PRINTFORMW 「生出來了啊…可愛的小狗崽生出來了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6792',
        any: [
          /PRINTFORMW 「哈啊啊…直到最後都沒捨棄希望…真的是狗狗的小寶寶啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6795',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6796',
        any: [/PRINTFORMW 「哈啊…出、出生了…狂王大人的小寶寶…啊呀啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6798',
        any: [/ELSEIF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6800',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6801',
        any: [/PRINTFORMW 「生出了精神的小寶寶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6802',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%作出產報告。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6803',
        any: [/PRINTFORMW 「但是下次…想生主人的孩子喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6805',
        any: [/PRINTFORMW 「生出了精神的小寶寶………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6806',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%作出產報告。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6807',
        any: [/PRINTFORMW 「但是下次…想生主人的孩子喲………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6810',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6812',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6813',
        any: [
          /PRINTFORMW 「啊啊啊…生孩子原來是這麽的舒服…呐…再讓我懷孕…我還要懷上更多的孩子…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6814',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的魔族的黃色眼瞳水汪汪地、向%NAME:MASTER%乞求著………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6816',
        any: [
          /PRINTFORMW 「哈啊…生下魔物的孩子原來是這麽的舒服…下次想生下主人的孩子喲…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6817',
        any: [/PRINTFORMW %SAVESTR:TARGET%一臉沉醉地向%NAME:MASTER%乞求著………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6820',
        any: [/ELSEIF MARK:3 == 3 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6821',
        any: [/PRINTFORMW 「不…不要啊…生下你的孩子什麽的不要啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6822',
        any: [
          /PRINTFORMW 事到如今%SAVESTR:TARGET%手脚被捆著、一邊掙扎一邊生下了孩子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6823',
        any: [/PRINTFORMW 「討厭…不要…我不要生孩子啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6825',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6826',
        any: [/PRINTFORMW 「不…不要啊…生孩子什麽的不要啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6827',
        any: [
          /PRINTFORMW 事到如今%SAVESTR:TARGET%手脚被捆著、一邊掙扎一邊生下了孩子。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6828',
        any: [/PRINTFORMW 「討厭…不要…我不要生孩子啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6832',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6833',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%剛懷孕時還十分抗拒，不過到了臨月就完全老實下來了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6834',
        any: [/PRINTFORMW 「像這樣生孩子什麽的…從來就沒想過啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6835',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%憐愛地撫摸著鼓起的肚子、就這樣平安的生下了孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6837',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%剛懷孕時還十分抗拒，不過到了臨月就完全老實下來了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6838',
        any: [/PRINTFORMW 「像這樣生孩子什麽的…從來就沒想過啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6839',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%憐愛地撫摸著鼓起的肚子、就這樣平安的生下了孩子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6842',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6849',
        any: [/IF TFLAG:13 == 13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6851',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6853',
        any: [/IF TALENT:153/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6854',
        any: [/PRINTFORMW 「在我的肚子裏孕育著新生命什麽的…總感覺不可思議呐」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6855',
        any: [/PRINTFORMW %SAVESTR:TARGET%迎接著臨月撫摸著高高鼓起的肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6857',
        any: [/ELSEIF TALENT:154/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6858',
        any: [/PRINTFORMW 「看啊、這麽可愛的小寶寶哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6859',
        any: [/PRINTFORMW %SAVESTR:TARGET%哄著孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6862',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6868',
        any: [/IF TFLAG:13 == 14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6870',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6871',
        any: [/PRINTFORMW 「已經要從我身邊離開了呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6873',
        any: [/CFLAG:274 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6881',
        any: [/IF TFLAG:13 == 999/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6883',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6884',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6887',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6894',
        any: [/IF TFLAG:13 == 998/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6896',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6897',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6900',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6907',
        any: [/TFLAG:13 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6958',
        any: [/@DUNGEON_RYOUZYOKU_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6962',
        any: [/PRINTFORMW 「我、我明明順路來到這裏而已…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6964',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6966',
        any: [/PRINTFORMW 「不要啊…我、我在這種地方………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6967',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%揮動著孱弱的雙臂、不過輕易就被按住了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6969',
        any: [/PRINTFORMW 「那、那樣的肉棒…一點也不嚇人唔…哇啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6972',
        any: [/PRINTFORMW 「不要啊…放開我！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6973',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%揮動著孱弱的雙臂、不過輕易就被按住了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6975',
        any: [/PRINTFORMW 「呼、哼、這樣的…完全沒問題……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6981',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6986',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6988',
        any: [/PRINTFORMW 「啊…已、已經受夠了啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6989',
        any: [/PRINTFORMW %SAVESTR:TARGET%被殘忍地凌辱了、不過好像還是處女……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6992',
        any: [/IF EXP:1 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6993',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛門被强硬地撥開、裏面的肉都翻了出來……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6994',
        any: [/PRINTFORMW 「啊…屁股…已、已經…壞掉…壞掉了啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6997',
        any: [/IF EXP:22 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6998',
        any: [/PRINTFORMW 「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脫臼了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '6999',
        any: [/PRINTFORMW %SAVESTR:TARGET%有時候已經張不開嘴了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7002',
        any: [/IF EXP:20 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7003',
        any: [/PRINTFORMW 「咕哎…哦哎哎…動物的味道…嗯咕哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7004',
        any: [/PRINTFORMW %SAVESTR:TARGET%吐出了嘴裏的精液……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7008',
        any: [/PRINTFORMW 「啊、啊啊…這樣的好髒啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7009',
        any: [/PRINTFORMW %SAVESTR:TARGET%被殘忍地凌辱了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7012',
        any: [/IF EXP:0 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7013',
        any: [/PRINTFORMW 「啊…哎呀…哎呀啊…本小姐的那裡…壞掉…壞掉的啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7014',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的宫颈被扯了出來、大量粘液從裏邊溢了出來…/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7017',
        any: [/IF EXP:1 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7018',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肛門被强硬地撥開、裏面的肉都翻了出來……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7019',
        any: [/PRINTFORMW 「啊…屁股…已、已經…壞掉…壞掉了啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7023',
        any: [/IF EXP:22 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7024',
        any: [/PRINTFORMW 「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脫臼了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7025',
        any: [/PRINTFORMW %SAVESTR:TARGET%有時候已經張不開嘴了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7029',
        any: [/IF EXP:20 > 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7030',
        any: [/PRINTFORMW 「咕哎…哦哎哎…動物的味道…嗯咕哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7031',
        any: [/PRINTFORMW %SAVESTR:TARGET%吐出了嘴裏的精液……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7036',
        any: [/@BENKI_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7041',
        any: [/IF FLAG:62 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7044',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7045',
        any: [
          /PRINTFORMW 「啊嗯%UNICODE\(0x2661\) \*1% 請給我更多的肉棒…把我弄得更加黏乎乎的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7047',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7048',
        any: [
          /PRINTFORMW 「咿嘻…不、不要…主人啊…再也不會做壞事了…快點…救救我……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7050',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7051',
        any: [/PRINTFORMW 「啊…還有這麽多小鷄鷄哦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7054',
        any: [/PRINTFORMW 「咳…咳咳…請、請放過我……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7056',
        any: [/ELSEIF FLAG:62 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7059',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7060',
        any: [
          /PRINTFORMW 「啊啊…姐姐大人…請再多使用我的身體…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7062',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7063',
        any: [/PRINTFORMW 「嗯…嗯啊…再、再這樣下去…不、不可以……要回不去了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7065',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7066',
        any: [/PRINTFORMW 「是、知道了…更多的侍奉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7069',
        any: [/PRINTFORMW 「啊那樣的…啊……你、想怎麽樣就怎麽樣吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7071',
        any: [/ELSEIF FLAG:62 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7074',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7075',
        any: [
          /PRINTFORMW 「啊嗯…哈啊%UNICODE\(0x2661\) \*1% 更多地侵犯我啊%UNICODE\(0x2661\) \*1% 用動物肉棒讓我懷孕吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7077',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7078',
        any: [
          /PRINTFORMW 「嘔…動物的味道…不能忍受…嘔哦哦哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7080',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7081',
        any: [/PRINTFORMW 「好喜歡動物肉棒…請再多讓我侍奉它！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7084',
        any: [/PRINTFORMW 「啊…哈啊…染上動物的氣味了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7086',
        any: [/ELSEIF  FLAG:62 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7089',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7090',
        any: [
          /PRINTFORMW 「啊啊…被當成便器也可…可以喲%UNICODE\(0x2661\) \*1%…更…更多地侵犯我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7092',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7093',
        any: [
          /PRINTFORMW 「哈…哈…那裏被精液射得滿滿的……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7095',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7096',
        any: [/PRINTFORMW 「再…请再射給我更多…精液很好吃哦……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7099',
        any: [/PRINTFORMW 「壞、壞掉了嗚…再這樣下去會壞掉的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7101',
        any: [/ELSEIF  FLAG:62 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7104',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7105',
        any: [
          /PRINTFORMW 「在小穴里…射出更多%UNICODE\(0x2661\) \*1%……用更多的精液把我弄的更加黏乎乎的吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7107',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7108',
        any: [/PRINTFORMW 「哈啊…啊…小穴里…精液滿滿的…啊哈哈……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7110',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7111',
        any: [/PRINTFORMW 「請讓我那邊變得更加的舒服啊咿……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7114',
        any: [/PRINTFORMW 「哎呀啊…我的那裏…要變成笨蛋了嗚……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7116',
        any: [/ELSEIF  FLAG:62 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7119',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7120',
        any: [
          /PRINTFORMW 「啊…哈啊…请…請更多地侵犯我的肛門啊哎…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7122',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7123',
        any: [
          /PRINTFORMW 「啊…撐開成這樣…肛門…請更多地使用……%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7125',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7126',
        any: [/PRINTFORMW 「是喲…我…是大家的肛門小穴便器…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7129',
        any: [/PRINTFORMW 「啊…呼啊…我…真的變成便器了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7137',
        any: [/@DUNGEON_VICTORY_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7142',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7144',
        any: [/PRINTFORMW 「啊哈哈…快點來侵犯我啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7145',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7147',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7148',
        any: [
          /PRINTFORMW 「喂喂、能讓我滿足的男人不存在的話！？ 女人也是可以的喲%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7149',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7150',
        any: [
          /PRINTFORMW 「乾脆、直接坐馬車到魔王那邊去吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7152',
        any: [/PRINTFORMW 「真是的！尸體的話就不能勃起了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7155',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7157',
        any: [/PRINTFORMW %SAVESTR:TARGET%倚靠著墻壁癱倒下來。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7158',
        any: [
          /PRINTFORMW 「…………如果就這樣倒下的話就不會被襲擊了吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7161',
        any: [/PRINTFORMW %SAVESTR:TARGET%依靠著墻壁坐了下來。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7162',
        any: [
          /PRINTFORMW 「再向深處進發被更多怪物侵犯或許也不錯…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7166',
        any: [/PRINTFORMW 「我、衹是被派到這里來的而已…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7167',
        any: [/^\s*PRINTFORML\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7169',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7170',
        any: [/PRINTFORMW 「喂喂、不想受傷的話就趕快逃走哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7171',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7172',
        any: [
          /PRINTFORMW 「等等！這邊正在和魔王大人説話呢所以別來打擾我喲！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7174',
        any: [/PRINTFORMW 「啊啊！已經！……累了唔！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7177',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7179',
        any: [/PRINTFORMW %SAVESTR:TARGET%倚靠著墻壁癱倒下來。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7180',
        any: [/PRINTFORMW 「…再這樣下去就危險了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7183',
        any: [/PRINTFORMW %SAVESTR:TARGET%依靠著墻壁坐了下來。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7184',
        any: [/PRINTFORMW 「呼嗚…衹要稍微休息下就絕對沒問題了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7192',
        any: [/@DUNGEON_ATTACK_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7197',
        any: [/IF CFLAG:1 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7199',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7200',
        any: [/PRINTFORMW 「即使有阻礙也！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7201',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7202',
        any: [/PRINTFORMW 「厲害的一擊要來了喲！」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7204',
        any: [/PRINTFORMW 「這就是我認真的一擊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7208',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7209',
        any: [/PRINTFORMW 「抱歉呢勇者姐姐！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7210',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7211',
        any: [/PRINTFORMW 「姐姐們也會成爲魔王大人的僕人喲！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7213',
        any: [/PRINTFORMW 「不要因爲我小就小看我啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7227',
        any: [/@COLOSSEUM_KOJO_5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7231',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7233',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7234',
        any: [/PRINTFORMW %SAVESTR:TARGET%連站起來的力氣都沒有了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7236',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看著死鬥場里狂熱的氛圍和之後要對戰的對手、吓得直哆嗦……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7243',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7245',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7247',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7248',
        any: [/PRINTFORMW 「呼…呼…已、已經不行了………哈啊啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7249',
        any: [/PRINTFORMW 精疲力盡的%SAVESTR:TARGET%癱坐著不動、抽泣著……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7251',
        any: [/PRINTFORMW 「不要、不要啊…不要過來…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7252',
        any: [/PRINTFORMW 精疲力盡的%SAVESTR:TARGET%癱坐著不動、抽泣著……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7256',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7257',
        any: [/PRINTFORMW 「不、不要啊…勇者大人是不可能戰勝的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7258',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看著被%NAME:MASTER%命令全副武裝的%SAVESTR:ASSI%、一副快要哭出來的樣子……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7260',
        any: [/PRINTFORMW 「救、救救我啊…主人…我、我什麽壞事都沒做啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7261',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%看著醜陋的怪物們、向%NAME:MASTER%乞求幫助……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7270',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7272',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7273',
        any: [
          /PRINTFORMW 「啊…因、因爲有好好地吮吸…所以不會痛啦……嗯嗯咕嗚……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7274',
        any: [/PRINTFORM 舔著%SAVESTR:ASSI%的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7276',
        any: [/PRINT 陰莖/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7278',
        any: [/PRINT 假陽具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7279',
        any: [/PRINTFORMW %SAVESTR:TARGET%露出心曠神怡的表情……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7281',
        any: [/PRINTFORMW 「啊…噗…嗯嗯嗚哦…咳咳…嗚嗚嗚……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7282',
        any: [/PRINTFORMW %SAVESTR:TARGET%吮吸著散發出令人作嘔的氣味的陰莖……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7289',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7291',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7292',
        any: [/PRINTFORMW 「住…住手…勇者姐姐…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7293',
        any: [/PRINTFORMW %SAVESTR:TARGET%任由%SAVESTR:ASSI%擺佈……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7295',
        any: [/PRINTFORMW 「哎呀…放開我…啊啊…好、好痛…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7296',
        any: [/PRINTFORMW %SAVESTR:TARGET%的胸被用力揉捏、發出了痛苦的呻吟……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7303',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7305',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7306',
        any: [/PRINTFORMW 「不要啊…好過分…已經夠了啦…哎呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7307',
        any: [/PRINTFORM %SAVESTR:ASSI%一邊聽著哀嚎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7309',
        any: [/PRINT 陰莖/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7311',
        any: [/PRINT 假陽具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7312',
        any: [/PRINTFORMW 繼續毫不留情地蹂躪著%SAVESTR:TARGET%的陰道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7314',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7315',
        any: [/PRINTFORMW 「啊…啊哈…咕嘿…咕哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7316',
        any: [
          /PRINTFORMW 可憐的%SAVESTR:TARGET%一邊發出蛤蟆被弄碎時發出的慘叫一邊任由怪物擺弄……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7318',
        any: [/PRINTFORMW 「哈…哈啊…壞掉了要壞掉了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7319',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物侵犯著……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7327',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7329',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7330',
        any: [/PRINTFORMW 「不要啊…不能插那邊啊…已經夠了啦…哎呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7331',
        any: [/PRINTFORM %SAVESTR:ASSI%一邊聽著哀嚎/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7333',
        any: [/PRINT 陰莖/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7335',
        any: [/PRINT 假陽具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7336',
        any: [/PRINTFORMW 繼續毫不留情地蹂躪著%SAVESTR:TARGET%的肛門……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7338',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7339',
        any: [/PRINTFORMW 「啊…啊哈…咕嘿…咕哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7340',
        any: [
          /PRINTFORMW 可憐的%SAVESTR:TARGET%一邊發出蛤蟆被弄碎時發出的慘叫一邊任由怪物擺弄……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7342',
        any: [/PRINTFORMW 「咿…咿…屁股…屁股要裂開來了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7343',
        any: [/PRINTFORMW %SAVESTR:TARGET%被怪物侵犯著肛門……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7351',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7352',
        any: [/PRINTFORMW 「啊…身、身體好燙…啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7361',
        any: [/@NTR_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7365',
        any: [/CFLAG:650 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7367',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7369',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7370',
        any: [/PRINTFORMW 「不要啊！我的第一次要獻給魔王大人的啊…啊…嘻咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7372',
        any: [/PRINTFORMW 「爲什麽…我明明衹是個村娘…啊咿…哈…啊啊啊哈！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7374',
        any: [/CFLAG:651 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7376',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7377',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7378',
        any: [
          /PRINTFORMW 「好難受…明明好難受、可是…爲什麽…肛門被侵犯…這樣的…嘻咿…咿…咿嘻%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7380',
        any: [/PRINTFORMW 「不是的…我…的屁股有感覺什麽的…啊…啊♪啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7382',
        any: [/CFLAG:652 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7384',
        any: [/ELSEIF P == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7385',
        any: [/IF TALENT:136/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7386',
        any: [
          /PRINTFORMW 「哎呀嗯…被看見了…被狗狗干到高潮的地方被看到了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7387',
        any: [/ELSEIF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7388',
        any: [
          /PRINTFORMW 「不要…不要看…不要看…嘻咿…啊啊…這麽深的地方…被侵犯…救救我…救救我啊魔王大人………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7390',
        any: [
          /PRINTFORMW 「爲什麽…我看到的這麽多…不合道理啊…狗狗的小鷄鷄…全部都由我來…哈…呀啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7392',
        any: [/CFLAG:653 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7394',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7395',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7396',
        any: [
          /PRINTFORMW 「對不起魔王大人…我…被狂王大人…侵犯地…好有感覺…已經變成這樣的小姑娘什麽的…忘了我吧…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7398',
        any: [/PRINTFORMW 「啊啊嗯…狂王大人啊…我的小穴…再多侵犯幾次啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7400',
        any: [/CFLAG:654 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7402',
        any: [/ELSEIF P == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7403',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7404',
        any: [
          /PRINTFORMW 「嗯呼呼…我的小穴和肛門你們都能插進來所以%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7405',
        any: [
          /PRINTFORMW 「啊…就是那樣…喲…雖然我還是個孩子但…還請不要和我客氣…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7407',
        any: [
          /PRINTFORMW 「嘻咿咿咿！那裏和屁股都…要壞掉…壞掉了啦…但是…好舒服…腦袋要變得奇怪了♪」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7409',
        any: [/CFLAG:655 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7411',
        any: [/ELSEIF P == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7412',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7413',
        any: [
          /PRINTFORMW 「被魔王玩弄的我…請多施捨給我一點你們的憐憫…拜托了…小穴以外的免費干也可以喲…哈啊…十分感謝%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7415',
        any: [
          /PRINTFORMW 「哈啊…被各位玩弄之後…魔王遺留在我身體里的污穢被净化了…所以…請更多地…更多地使用我吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7417',
        any: [/CFLAG:656 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7419',
        any: [/ELSEIF P == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7420',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7421',
        any: [
          /PRINTFORMW 「魔王大人…對不起呢、我已經成爲狂王大人的東西了…今後也會以侍奉狂王大人爲生」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7422',
        any: [
          /PRINTFORMW 「魔王大人關於我的事…請全部都忘了吧………啊…狂王大人…啊哈…嗚…呼嗚%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7424',
        any: [/PRINTFORMW 「是…會更多地…侍奉狂王大人的…嗯…嗯啾…啾啪………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7426',
        any: [/CFLAG:657 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7428',
        any: [/ELSEIF P == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7429',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7430',
        any: [/IF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7431',
        any: [/PRINTFORMW 「魔王大人的小寶寶…還給我…把我的小寶寶…還給我………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7433',
        any: [
          /PRINTFORMW 「啊啊啊…小寶寶要生出來了…魔王大人也在看啊…呀啊啊啊…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7436',
        any: [/PRINTFORMW 「啊…哈啊…我…在這裏被大家看著…已經、不行了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7441',
        any: [/@EXUCUTION_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7444',
        any: [/IF TFLAG:16 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7445',
        any: [
          /PRINTFORMW 「不、不要…以後一直…變成怪物們的肉便器什麽的…不要啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7447',
        any: [/ELSEIF TFLAG:16 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7448',
        any: [/PRINTFORMW 「讓我這種人成爲戰鬥人員什麽的要我怎麽做啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7450',
        any: [/ELSEIF TFLAG:16 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7451',
        any: [/PRINTFORMW 「嗚嗚嗚…處罰什麽的…爲什麽…究竟是爲什麽啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7453',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7454',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7458',
        any: [/@MUSEUM_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7461',
        any: [/IF TFLAG:500 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7462',
        any: [
          /PRINTFORMW 「把我變成石像放在身邊什麽的…魔王大人的想法我完全不明白啊…請不要做那樣的事啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7464',
        any: [/ELSEIF TFLAG:500 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7465',
        any: [/PRINTFORMW 「剝制標本…那是對鳥和狐狸什麽的才會做的事情啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7467',
        any: [/ELSEIF TFLAG:500 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7468',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7470',
        any: [/ELSEIF TFLAG:500 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7471',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7473',
        any: [/ELSEIF TFLAG:500 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7474',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7476',
        any: [/ELSEIF TFLAG:500 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7477',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7479',
        any: [/ELSEIF TFLAG:500 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7480',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7482',
        any: [/ELSEIF TFLAG:500 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7483',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7485',
        any: [/ELSEIF TFLAG:500 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7486',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7488',
        any: [/ELSEIF TFLAG:500 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7489',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7493',
        any: [/@BANISHMENT_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7497',
        any: [/IF TFLAG:510 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7498',
        any: [/PRINTFORMW 「這樣終于…終于能回到姐姐身邊去了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7500',
        any: [/ELSEIF TFLAG:510 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7501',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7503',
        any: [/ELSEIF TFLAG:510 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7504',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7506',
        any: [/ELSEIF TFLAG:510 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7507',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7509',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7510',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7514',
        any: [/@PUBLIC_EXUCUTION_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7518',
        any: [/IF TFLAG:520 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7519',
        any: [
          /PRINTFORMW 「在騙我吧…一直干我到死爲止什麽的…不…不要…不要啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7521',
        any: [/ELSEIF TFLAG:520 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7522',
        any: [
          /PRINTFORMW 「明明什麽壞事都沒做…爲什麽…要賜我絞首刑啊…魔王大人………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7524',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7525',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7529',
        any: [/@GROTESQUE_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7533',
        any: [/IF TFLAG:530 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7534',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7536',
        any: [/ELSEIF TFLAG:530 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7537',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7539',
        any: [/ELSEIF TFLAG:530 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7540',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7542',
        any: [/ELSEIF TFLAG:530 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7543',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7545',
        any: [/ELSEIF TFLAG:530 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7546',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7548',
        any: [/ELSEIF TFLAG:530 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7549',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7551',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7552',
        any: [/^\s*PRINTFORMW\s*$/m],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7556',
        any: [/@ENTERENEMY_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7560',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7561',
        any: [
          /PRINTFORMW 「那個~…”等會你乖乖地在那個洞裏被干”被那位大人這樣吩咐過了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7563',
        any: [/PRINTFORMW 「那個~過會能帶我去魔王大人那裏嗎？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7567',
        any: [/@GOHOUBI_REQUEST_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7569',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7571',
        any: [/PRINTFORMW 「那個、想要錢作爲獎賞、盡可能多的錢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7572',
        any: [
          /ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7574',
        any: [/PRINTFORM 「如果打倒勇者姐姐的話請給我獎賞、好想和/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7575',
        any: [/IF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7576',
        any: [/PRINT 犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7577',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7578',
        any: [/PRINT 豚/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7579',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7580',
        any: [/PRINT 馬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7582',
        any: [/PRINTFORMW 做愛啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7583',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7585',
        any: [/PRINTFORMW 「事後給本小姐一個吻就可以喲♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7586',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7588',
        any: [/PRINTFORMW 「獎賞的話、想要和魔王大人做愛啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7589',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7591',
        any: [/PRINTFORMW 「能喝到魔王大人的精液的話不管什麽都能做喲」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7592',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7594',
        any: [/PRINTFORMW 「獎賞是亂交派對就好！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7595',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7597',
        any: [/PRINTFORMW 「如果平安回來的話、想要喝魔王大人的尿尿哦」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7598',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7600',
        any: [/PRINTFORMW 「獎賞？我想要去狩獵童貞♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7603',
        any: [/@GOHOUBI_AFTER_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7609',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7610',
        any: [/PRINTFORMW 「真小氣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7612',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7613',
        any: [/PRINTFORMW 「欸嘿嘿、是獎賞徽章啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7614',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7616',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7617',
        any: [/PRINTFORMW 「那個、雖然想把這個錢給姐姐但………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7619',
        any: [/ELSEIF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7621',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7622',
        any: [/PRINTFORMW 「啊啊啊！和小狗肛交好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7624',
        any: [/PRINTFORMW 「啊啊啊！和小狗做愛好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7627',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7629',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7630',
        any: [/PRINTFORMW 「啊啊啊！和豬肛交好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7632',
        any: [/PRINTFORMW 「啊啊啊！和豬做愛好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7635',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7637',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7638',
        any: [/PRINTFORMW 「啊啊啊！和馬肛交好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7640',
        any: [/PRINTFORMW 「啊啊啊！和馬做愛好棒啊！好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7643',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7644',
        any: [
          /PRINTFORMW 「作爲獎勵的吻…感覺不一樣呢………這樣的…或許更喜歡也不一定呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7646',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7648',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7649',
        any: [/PRINTFORMW 「啊嗯！比平時還要激烈！呼啊！喜歡喲！最喜歡了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7652',
        any: [/PRINTFORMW 「啊嗯！比平時還要激烈！呼啊！喜歡喲！最喜歡了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7655',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7656',
        any: [/PRINTFORMW 「呼嗚…哈啊…魔王大人的精液美味得要讓我發狂了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7658',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7660',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7661',
        any: [/PRINTFORMW 「哈啊…還想要乱交派對………必須努力打倒勇者姐姐♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7663',
        any: [/PRINTFORMW 「哈啊…還想要乱交派對………必須努力打倒勇者姐姐♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7666',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7667',
        any: [
          /PRINTFORMW 「承蒙款待、尿尿很美味哟、魔王大人%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7669',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7671',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7672',
        any: [
          /PRINTFORMW 「嗚呼呼、魔王大人的女人讓你成爲男人的感想如何呀？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7675',
        any: [/PRINTFORMW 「變得這麽拼命地扭動著腰還真是可愛啊、你」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7681',
        any: [/@OSIOKI_KOUJO_K5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7687',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7688',
        any: [/PRINTFORMW 「十、十分感謝！十分感謝您！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7690',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7692',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7693',
        any: [
          /PRINTFORMW 「啊嗚…嗚呃…啊嗚…好厲害…電椅好棒%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7695',
        any: [/PRINTFORMW 「嗚嘻咿咿咿！不要啊啊啊！請放過我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7698',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7700',
        any: [/IF ABL:A:17 >= 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7701',
        any: [
          /PRINTFORMW 「啊嗯、真是的%UNICODE\(0x2661\) \*1% 雖然可以看但是觸摸禁止喲♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7703',
        any: [/PRINTFORMW 「嗚哦哦咕…不要看…不要笑啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7706',
        any: [/ELSEIF TFLAG:18 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7708',
        any: [/IF ABL:A:17 >= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7709',
        any: [
          /PRINTFORMW 「啊嗯…哈啊…再多看看我…請再多看看我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7711',
        any: [/PRINTFORMW 「嗚啊啊啊啊…嗚呃呃呃啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7714',
        any: [/ELSEIF TFLAG:18 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7716',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7717',
        any: [/PRINTFORMW 「被魔王大人打的快要高潮了！请再多处罚我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7719',
        any: [/PRINTFORMW 「对不起！对不起！下次不会再失败了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7722',
        any: [/ELSEIF TFLAG:18 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7724',
        any: [/IF TALENT:A:88 == 1 \|\| TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7725',
        any: [/PRINTFORMW 「尿尿好好吃…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7727',
        any: [/PRINTFORMW 「呜…好臭要被熏死了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7730',
        any: [/ELSEIF TFLAG:18 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7731',
        any: [/PRINTW 「讨厌啊、要想起從前的事了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7733',
        any: [/ELSEIF TFLAG:18 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7734',
        any: [/PRINTW 「呐、习惯了之後完全没问题嘛」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7736',
        any: [/ELSEIF TFLAG:18 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7737',
        any: [
          /PRINTFORMW 「咕嗚嗚嗚！已经、已经不行了！要疯掉了！我已经要疯掉了！已经什么都呜啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7739',
        any: [/ELSEIF TFLAG:18 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7740',
        any: [/PRINTFORMW 「嘎哦～♪嘎哦～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7745',
        any: [/@GOBI_KOUJO_K5, ARG:0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7748',
        any: [/IF ARG:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7750',
        any: [/PRINTFORM 的噢~♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7751',
        any: [/ELSEIF ARG:0 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7753',
        any: [/PRINTFORM 的啊！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7754',
        any: [/ELSEIF ARG:0 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7756',
        any: [/PRINTFORM 来著……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7757',
        any: [/ELSEIF ARG:0 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7759',
        any: [/PRINTFORM 来的呢……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7760',
        any: [/ELSEIF ARG:0 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7762',
        any: [/PRINTFORM 的啊……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7766',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7767',
        any: [/PRINTFORM 來著。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7768',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7769',
        any: [/PRINTFORM 的啊。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K5_マオ.ERB',
        ref: '7771',
        any: [/PRINTFORM 的噢。/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
