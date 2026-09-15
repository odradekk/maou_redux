// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-ending.mjs

export const FILES = [
  {
    // #118：ENDING_1 真身与 ENDING_3/4/5/END10_55 的接线（INVASION_CHECK
    // 五组条件的演出侧）
    js: 'ere/event/event-ending.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '6-40',
        any: [/^@ENDING_1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '8-18',
        any: [/^DRAWLINE$/m, /^PRINTL ┌/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '20-23',
        any: [/^ADDCHARA 35$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '25',
        any: [/^WAIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '27',
        any: [/人间界已经陷落了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '29-30',
        any: [/世界这么大/m, /不想做魔王了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '31-37',
        any: [/^\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '34',
        any: [/^\s*QUIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '35-36',
        any: [/^\s*ELSEIF RESULT != 0$/m, /^\s*GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '38',
        any: [/^FLAG:82 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '39',
        any: [/菲娅，被你抓获了/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '40',
        any: [/^RETURN 0$/m],
      },
      // #173：@ENDING_2 真身（:43-56 全文）
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '43-56',
        any: [/^@ENDING_2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '45',
        any: [/^DRAWLINE$/m, /^PRINTL ┌/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '46-50',
        any: [/^PRINTL ｜.*新的女勇者/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '52',
        any: [/^PRINTFORMW \*勇者%SAVESTR:TARGET%/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '53',
        any: [/^PRINTL  $/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '54',
        any: [/GAMEOVER/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '55',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '56',
        any: [/^QUIT$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '59-74',
        any: [/^@ENDING_3$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '70',
        any: [/^FLAG:87 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '70-74',
        any: [/^FLAG:87 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '77-92',
        any: [/^@ENDING_4$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '88',
        any: [/^FLAG:89 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '88-92',
        any: [/^FLAG:89 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '97-112',
        any: [/^@ENDING_5$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '108',
        any: [/^FLAG:91 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '108-112',
        any: [/^FLAG:91 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '136',
        any: [/^@CHAR_GIFT, ARG$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '475-485',
        any: [/^@END10_55$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '485',
        any: [/^\s*EX_FLAG:2810 \+= 5$/m],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '115-135',
        any: [
          /@ENDING_N\n\t\t\tDRAWLINE\n\t\t\tPRINTFORMW 自从魔王被解开封印已经过了整整500天。\n\t\t\tFORCEWAIT\n\t\t\tPRINTFORMW 尽管各界源源不断地派遣勇者讨伐魔王，\n\t\t\tPRINTFORMW 但都要么成为了魔王的收藏品，\n\t\t\tPRINTFORMW 要么被倒卖到大陆各个龌龊的角落，\n\t\t\tPRINTFORMW 要么成为了魔王力量的一部分，帮助魔王为祸人间。\n\t\t\tPRINTFORML \n\t\t\tPRINTFORMW 这块大陆的人们渐渐也习惯于魔王地下城的存在，想要寻找财富或者冒险\.\.\.\n\t\t\tPRINTFORMW 或者\.\.\.期待着女性最本能的渴望．．．\n\t\t\tPRINTFORMW \.\.\.各种心思的女孩子们，依然在源源不断地走进这个魔窟。\n\t\t\tPRINTFORMW \.\.\.\n\t\t\tPRINTFORMW \.\.\.\n\t\t\tPRINTFORMW 大概，已经不会有尽头了吧。\n\t\t\tPRINTFORMW 达成了【Normal End】。\n\t\t\tPRINTFORMW \[1\] 结束游戏\t\t\[2\] 继续游戏\n\t\t\t\n\t\t\tCALL ENDINGINPUT,\(EX_FLAG:2801 \+ 1000\)\n\n;---------------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '136-297',
        any: [
          /@CHAR_GIFT, ARG\n#DIM CHARA, 1\n#DIM NO_CHARA\n#DIM PERSONAL\n#DIM HAIRCOLOR\n#DIM L_LINECOUNT, 5\n;---------------------------------------------------------\n\nIF ARG == 5\n\tNO_CHARA = 32\n\tLOCALS:10 = 龙族公主%CSVNAME\(32\)%被龙族长老作为贡品献了上来………\n\tLOCALS:20 = 要收下龙族公主作为贡品吗？\n\tLOCALS:30 = 去要公主\n\tLOCALS:40 = 龙族\nELSEIF ARG == 1\n\tNO_CHARA = 31\n\tLOCALS:10 = 精灵族圣女%CSVNAME\(31\)%被精灵族作为贡品献了上来………\n\tLOCALS:20 = 要收下精灵族圣女作为贡品吗？\n\tLOCALS:30 = 去要圣女\n\tLOCALS:40 = 精灵族\nELSEIF ARG == 6\n\tNO_CHARA = 33\n\tLOCALS:10 = 天使族的下任主神%CSVNAME\(33\)%被天使族作为贡品献了上来………\n\tLOCALS:20 = 要收下天使族下任主神作为贡品吗？\n\tLOCALS:30 = 去要主神候补\n\tLOCALS:40 = 天使族\nELSE\n\tTHROW INVALID ARGUMENT\nENDIF\n\n\n;添加预设角色\nL_LINECOUNT:0 = LINECOUNT\n\$INPUT_LOOP_0\nCLEARLINE LINECOUNT-L_LINECOUNT:0\nADDCHARA NO_CHARA\nCALL ADDCHARA_EX, CHARANUM-1\nA = CHARANUM - 1\n\nCALL CHAR_INIT\n\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTVL LOCALS:10\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTW\nCALL SHOW_CHARA_INFO, A, -2\nA = CHARANUM - 1\nPRINTVL LOCALS:20\nPRINTL \[0\] 收下她吧  \[1\] 另外挑选\nINPUT\n\nIF RESULT == 0\n\tRETURN\nELSE\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\n\tCALL NAME_RESET\nENDIF\n\nPERSONAL = 160\n;キャラのNOを選定\n\$INPUT_LOOP_1\nCHARA = RAND\(1, 17\)\nADDCHARA CHARA\nCALL ADDCHARA_EX, CHARANUM-1\nA = CHARANUM - 1\n\nTALENT:A:300 = HAIRCOLOR\nSIF TALENT:A:300 == 0\n\tTALENT:A:300 = 1\n\nL_LINECOUNT:2 = LINECOUNT\n\$INPUT_LOOP_2\nCLEARLINE LINECOUNT-L_LINECOUNT:2\nPRINTL 请设定偏好的性格和发色。\nPRINTFORML \[0\] 性格 ：  %TALENTNAME:PERSONAL%\nPRINTFORML \[1\] 发色 ：  %GET_LOOK_INFO\(A,"头发颜色"\)%\nDRAWLINE\nPRINTL \[100\] 决定\n\nINPUT\n\nIF RESULT == 0\n\tPRINTL 请选择偏好的性格。\n\tPRINTL \[0\] - 慈愛　　\[1\] - 自信家　\[2\] - 懦弱　　\n\tPRINTL \[3\] - 高贵　　\[4\] - 冷静　　\[5\] - 恶女　　\n\tPRINTL \[6\] - 智慧　　\[7\] - 庇护者　\n\tINPUT\n\tIF RESULT >= 8\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tELSEIF RESULT == 0\n\t\tPERSONAL = 160\n\tELSEIF RESULT == 1\n\t\tPERSONAL = 161\n\tELSEIF RESULT == 2\n\t\tPERSONAL = 162\n\tELSEIF RESULT == 3\n\t\tPERSONAL = 163\n\tELSEIF RESULT == 4\n\t\tPERSONAL = 164\n\tELSEIF RESULT == 5\n\t\tPERSONAL = 166\n\tELSEIF RESULT == 6\n\t\tPERSONAL = 172\n\tELSEIF RESULT == 7\n\t\tPERSONAL = 173\n\tELSEIF RESULT < 0\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tENDIF\n\tGOTO INPUT_LOOP_2\n\nELSEIF RESULT == 1\n\tPRINTL 请选择发色。\n\tPRINTL \[1\] 金发  \[2\]栗发  \[3\]黒发  \[4\]红发  \[5\]银发  \n\tPRINTL \[6\] 青发  \[7\]绿发  \[8\]紫发  \[9\]白发  \[10\]暗金发\n\tINPUT\n\tIF RESULT >= 1 && RESULT <= 10 \|\| RESULT == 11\n\t\tTALENT:A:300 = RESULT\n\t\tHAIRCOLOR = RESULT\n\tENDIF\n\tGOTO INPUT_LOOP_2\nELSEIF RESULT == 100\nELSE\n\tGOTO INPUT_LOOP_2\nENDIF\n\nCALL CHAR_MAKE, PERSONAL, ARG\nCFLAG:RESULT:1 = 0\nA = RESULT\n\n;種族年齢再設定\nIF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,13\)\n\tCALL RACE_AGE_GENERATE, CFLAG:A:451, TALENT:A:314\n\tCFLAG:A:452 = RESULT\nENDIF\n\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTFORML %LOCALS:40%挑选少女%SAVESTR:A%作为贡品………\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTW\nCALL SHOW_CHARA_INFO, A, -2\nPRINTL 要收下这名少女作为贡品吗？\nPRINTFORML \[0\] 就是她了  \[1\] 再换一个  \[2\] %LOCALS:30%\nINPUT\n\nIF RESULT == 0\n\tRETURN 0\nELSEIF RESULT == 2\n\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\t\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_0\nELSE\n\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_1\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '919-993',
        any: [
          /@ENDINGINPUT,ARG\n\n\nLOCAL = ARG \/ 1000\n\n\$ENDDINGSELECT\n\nINPUT\nSELECTCASE LOCAL\n\tCASE 1\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tQUIT\n\t\t\tCASE 2\n\t\t\t\tPRINTW 魔王的传说，还将继续\.\.\.\.\.\.\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\n\t\tENDSELECT\n\tCASE 7\n\t;白告（菲亚）\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tSIF EX_FLAG:2807 == 3\n\t\t\t\t\tPRINTW 菲娅公主线start~\n\t\t\t\tSIF EX_FLAG:2807 == 13\n\t\t\t\t\tPRINTW 菲娅魔女线start~\n\t\t\t\tEX_FLAG:2807 \+= 100\n\t\t\t\tEX_FLAG:2801 \+= 2\n\t\t\tCASE 2\n\t\t\t\tPRINTW 嘛\.\.\.那祝你其他线好运咯\n\t\t\t\tEX_FLAG:2807 \+= 100\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 嗯，那就给你先存个档，明天再问吧\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\t\n\t\t\tENDSELECT\n\tCASE 16\n\t;双飞end\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tPRINTW 此处剧情尚未做好\n\t\t\t\tEX_FLAG:2805 \+= 100\n\t\t\tCASE 2\n\t\t\t\tPRINTW 你跳过了本故事线\n\t\t\t\tEX_FLAG:2805 \+= 100\t\t\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 好的，明天见\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\t\tENDSELECT\n\tCASEELSE\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tPRINTW 此处剧情尚未做好\n\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100\n\t\t\t\tEX_FLAG:2801 \+= 2\n\t\t\t\tSIF LOCAL == \(5 \|\| 6\)\n\t\t\t\t\tEX_FLAG:2801 \+= 1\n\t\t\t\t\t;为姐妹双飞end特殊处理\n\t\t\tCASE 2\n\t\t\t\tPRINTW 你跳过了本故事线\n\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100\t\t\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 好的，明天见\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\n\t\tENDSELECT\n\nENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '994-1036',
        any: [
          /@ENDINCONSQSELECT,ARG\nINPUT\nSELECTCASE ARG\n\tCASE 7\n\t\tSELECTCASE RESULT\n\t\t\tCASE 1\n\t\t\t\t\tPRINTFORMW 「哇～魔王大人最好了～那，菲娅先去房间里了哦～♪」\n\t\t\t\t\tPRINTFORMW 菲娅蹦蹦跳跳的走掉了，看起来很开心的样子，\n\t\t\t\t\tPRINTFORMW 看起来已经完全适应这里的生活了。\n\t\t\t\n\t\t\tCASE 2\n\t\t\t\t\tPRINTFORMW 「啊唔唔……魔王大人今天很忙吗……这样啊……」\n\t\t\t\t\tPRINTFORMW 「那，菲娅会乖乖的等着的哦……」\n\t\t\t\t\tPRINTFORMW 看起来已经完全适应这里的生活了。\n\t\t\tCASE 3\n\t\t\t\t\tPRINTFORMW 「……啊～那样的话太好了」\n\t\t\t\t\tPRINTFORMW 菲娅看起来很开心的样子。\n\t\t\tCASE 4\n\t\t\t\t\tPRINTFORMW 「这，这样啊……虽然努力的练习过了……果然还是不行吗……」\n\t\t\t\t\tPRINTFORMW 菲娅看起来很沮丧的样子。\t\t\t\n\t\t\tCASE 5\n\t\t\t\t\tPRINTFORMW 药水并不多，只一小口就全部喝干净了，\n\t\t\t\t\tPRINTFORMW 并没有觉得有什么不适，……总觉得身体热了起来，\n\t\t\t\t\tPRINTFORMW 大概是搞成了媚药一类的东西吧，不过，也没什么不好的\n\t\t\t\t\tPRINTFORMW %NAME:MASTER%就这样顺势的，把菲娅按倒在床上，扯开了衣服，露出了幼小的身体……\t\t\t\n\t\t\tCASE 6\n\t\t\t\t\tPRINTFORMW 「不，不要喝吗……？」\n\t\t\t\t\tPRINTFORMW 「诶？即使不用这种东西，菲娅也是魔王大人的……怎，怎么这样……这种事……太犯规了啦……」\n\t\t\t\t\tPRINTFORMW 听见话语的菲娅愣了一下，豆大的泪珠涌出了眼眶，顺着白皙的脸颊滑了下来，\n\t\t\t\t\tPRINTFORMW 小小的身体扑在%NAME:MASTER%的身上，大声的哭了起来，\n\t\t\t\t\tPRINTFORMW %NAME:MASTER%轻抚着菲娅的头，安慰着，\n\t\t\t\t\tPRINTFORMW 虽然有点不像自己的风格，不过偶尔这样也不坏呢……\t\t\t\n\t\t\tCASE 7\n\t\t\t\t\tPRINTFORMW 打开瓶子以后，趁着菲娅不注意，统统的都让她喝了下去。\n\t\t\t\t\tPRINTFORMW 「咕咳咳……？！魔，魔王大人……突然就这么粗暴的……」\n\t\t\t\t\tPRINTFORMW 「呼啊啊……身体……怎么……好热呢……❤」\n\t\t\t\t\tPRINTFORMW 看着皮肤泛着粉红色的菲娅，只是把她揽到怀里这样的动作，就使菲娅娇喘连连，\n\t\t\t\t\tPRINTFORMW 大概是搞成了媚药一类的东西吧，只是普通的抚摸，就让内裤已经彻底湿透了，敏感度也增加了的样子，\n\t\t\t\t\tPRINTFORMW %NAME:MASTER%就这样顺势的让菲娅趴在自己身上，扯开了衣服，露出了幼小的身体……\n\t\t\tCASEELSE\n\t\tENDSELECT\n\tCASEELSE\nENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '117-131',
        any: [
          /\t\t\tPRINTFORMW 自从魔王被解开封印已经过了整整500天。\n\t\t\tFORCEWAIT\n\t\t\tPRINTFORMW 尽管各界源源不断地派遣勇者讨伐魔王，\n\t\t\tPRINTFORMW 但都要么成为了魔王的收藏品，\n\t\t\tPRINTFORMW 要么被倒卖到大陆各个龌龊的角落，\n\t\t\tPRINTFORMW 要么成为了魔王力量的一部分，帮助魔王为祸人间。\n\t\t\tPRINTFORML \n\t\t\tPRINTFORMW 这块大陆的人们渐渐也习惯于魔王地下城的存在，想要寻找财富或者冒险\.\.\.\n\t\t\tPRINTFORMW 或者\.\.\.期待着女性最本能的渴望．．．\n\t\t\tPRINTFORMW \.\.\.各种心思的女孩子们，依然在源源不断地走进这个魔窟。\n\t\t\tPRINTFORMW \.\.\.\n\t\t\tPRINTFORMW \.\.\.\n\t\t\tPRINTFORMW 大概，已经不会有尽头了吧。\n\t\t\tPRINTFORMW 达成了【Normal End】。\n\t\t\tPRINTFORMW \[1\] 结束游戏\t\t\[2\] 继续游戏/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '118',
        any: [/\t\t\tFORCEWAIT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '117',
        any: [/\t\t\tPRINTFORMW 自从魔王被解开封印已经过了整整500天。/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '144-164',
        any: [
          /IF ARG == 5\n\tNO_CHARA = 32\n\tLOCALS:10 = 龙族公主%CSVNAME\(32\)%被龙族长老作为贡品献了上来………\n\tLOCALS:20 = 要收下龙族公主作为贡品吗？\n\tLOCALS:30 = 去要公主\n\tLOCALS:40 = 龙族\nELSEIF ARG == 1\n\tNO_CHARA = 31\n\tLOCALS:10 = 精灵族圣女%CSVNAME\(31\)%被精灵族作为贡品献了上来………\n\tLOCALS:20 = 要收下精灵族圣女作为贡品吗？\n\tLOCALS:30 = 去要圣女\n\tLOCALS:40 = 精灵族\nELSEIF ARG == 6\n\tNO_CHARA = 33\n\tLOCALS:10 = 天使族的下任主神%CSVNAME\(33\)%被天使族作为贡品献了上来………\n\tLOCALS:20 = 要收下天使族下任主神作为贡品吗？\n\tLOCALS:30 = 去要主神候补\n\tLOCALS:40 = 天使族\nELSE\n\tTHROW INVALID ARGUMENT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '30',
        any: [/PRINTL \[1\] - 我……已经……不想做魔王了……/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '227-242',
        any: [
          /\tELSEIF RESULT == 0\n\t\tPERSONAL = 160\n\tELSEIF RESULT == 1\n\t\tPERSONAL = 161\n\tELSEIF RESULT == 2\n\t\tPERSONAL = 162\n\tELSEIF RESULT == 3\n\t\tPERSONAL = 163\n\tELSEIF RESULT == 4\n\t\tPERSONAL = 164\n\tELSEIF RESULT == 5\n\t\tPERSONAL = 166\n\tELSEIF RESULT == 6\n\t\tPERSONAL = 172\n\tELSEIF RESULT == 7\n\t\tPERSONAL = 173/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '169',
        any: [/\$INPUT_LOOP_0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '197',
        any: [/\$INPUT_LOOP_1/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '208',
        any: [/\$INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '168',
        any: [/L_LINECOUNT:0 = LINECOUNT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '290',
        any: [/\tGOTO INPUT_LOOP_0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '195',
        any: [/PERSONAL = 160/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '196-197',
        any: [/;キャラのNOを選定\n\$INPUT_LOOP_1/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '296',
        any: [/\tGOTO INPUT_LOOP_1/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '146',
        any: [
          /\tLOCALS:10 = 龙族公主%CSVNAME\(32\)%被龙族长老作为贡品献了上来………/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '171',
        any: [/ADDCHARA NO_CHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '162-163',
        any: [/ELSE\n\tTHROW INVALID ARGUMENT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '283-284',
        any: [/IF RESULT == 0\n\tRETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '183-188',
        any: [
          /PRINTVL LOCALS:20\nPRINTL \[0\] 收下她吧  \[1\] 另外挑选\nINPUT\n\nIF RESULT == 0\n\tRETURN/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '170',
        any: [/CLEARLINE LINECOUNT-L_LINECOUNT:0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '171-175',
        any: [
          /ADDCHARA NO_CHARA\nCALL ADDCHARA_EX, CHARANUM-1\nA = CHARANUM - 1\n\nCALL CHAR_INIT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '177-179',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTVL LOCALS:10\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '177-180',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTVL LOCALS:10\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTW/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '181',
        any: [/CALL SHOW_CHARA_INFO, A, -2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '183-185',
        any: [
          /PRINTVL LOCALS:20\nPRINTL \[0\] 收下她吧  \[1\] 另外挑选\nINPUT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '190-192',
        any: [/\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\n\tCALL NAME_RESET/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '198-201',
        any: [
          /CHARA = RAND\(1, 17\)\nADDCHARA CHARA\nCALL ADDCHARA_EX, CHARANUM-1\nA = CHARANUM - 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '203-205',
        any: [
          /TALENT:A:300 = HAIRCOLOR\nSIF TALENT:A:300 == 0\n\tTALENT:A:300 = 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '207',
        any: [/L_LINECOUNT:2 = LINECOUNT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '208-262',
        any: [
          /\$INPUT_LOOP_2\nCLEARLINE LINECOUNT-L_LINECOUNT:2\nPRINTL 请设定偏好的性格和发色。\nPRINTFORML \[0\] 性格 ：  %TALENTNAME:PERSONAL%\nPRINTFORML \[1\] 发色 ：  %GET_LOOK_INFO\(A,"头发颜色"\)%\nDRAWLINE\nPRINTL \[100\] 决定\n\nINPUT\n\nIF RESULT == 0\n\tPRINTL 请选择偏好的性格。\n\tPRINTL \[0\] - 慈愛　　\[1\] - 自信家　\[2\] - 懦弱　　\n\tPRINTL \[3\] - 高贵　　\[4\] - 冷静　　\[5\] - 恶女　　\n\tPRINTL \[6\] - 智慧　　\[7\] - 庇护者　\n\tINPUT\n\tIF RESULT >= 8\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tELSEIF RESULT == 0\n\t\tPERSONAL = 160\n\tELSEIF RESULT == 1\n\t\tPERSONAL = 161\n\tELSEIF RESULT == 2\n\t\tPERSONAL = 162\n\tELSEIF RESULT == 3\n\t\tPERSONAL = 163\n\tELSEIF RESULT == 4\n\t\tPERSONAL = 164\n\tELSEIF RESULT == 5\n\t\tPERSONAL = 166\n\tELSEIF RESULT == 6\n\t\tPERSONAL = 172\n\tELSEIF RESULT == 7\n\t\tPERSONAL = 173\n\tELSEIF RESULT < 0\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tENDIF\n\tGOTO INPUT_LOOP_2\n\nELSEIF RESULT == 1\n\tPRINTL 请选择发色。\n\tPRINTL \[1\] 金发  \[2\]栗发  \[3\]黒发  \[4\]红发  \[5\]银发  \n\tPRINTL \[6\] 青发  \[7\]绿发  \[8\]紫发  \[9\]白发  \[10\]暗金发\n\tINPUT\n\tIF RESULT >= 1 && RESULT <= 10 \|\| RESULT == 11\n\t\tTALENT:A:300 = RESULT\n\t\tHAIRCOLOR = RESULT\n\tENDIF\n\tGOTO INPUT_LOOP_2\nELSEIF RESULT == 100\nELSE\n\tGOTO INPUT_LOOP_2\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '209',
        any: [/CLEARLINE LINECOUNT-L_LINECOUNT:2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '210',
        any: [/PRINTL 请设定偏好的性格和发色。/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '211-212',
        any: [
          /PRINTFORML \[0\] 性格 ：  %TALENTNAME:PERSONAL%\nPRINTFORML \[1\] 发色 ：  %GET_LOOK_INFO\(A,"头发颜色"\)%/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '210-214',
        any: [
          /PRINTL 请设定偏好的性格和发色。\nPRINTFORML \[0\] 性格 ：  %TALENTNAME:PERSONAL%\nPRINTFORML \[1\] 发色 ：  %GET_LOOK_INFO\(A,"头发颜色"\)%\nDRAWLINE\nPRINTL \[100\] 决定/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '214',
        any: [/PRINTL \[100\] 决定/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '210-216',
        any: [
          /PRINTL 请设定偏好的性格和发色。\nPRINTFORML \[0\] 性格 ：  %TALENTNAME:PERSONAL%\nPRINTFORML \[1\] 发色 ：  %GET_LOOK_INFO\(A,"头发颜色"\)%\nDRAWLINE\nPRINTL \[100\] 决定\n\nINPUT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '218-247',
        any: [
          /IF RESULT == 0\n\tPRINTL 请选择偏好的性格。\n\tPRINTL \[0\] - 慈愛　　\[1\] - 自信家　\[2\] - 懦弱　　\n\tPRINTL \[3\] - 高贵　　\[4\] - 冷静　　\[5\] - 恶女　　\n\tPRINTL \[6\] - 智慧　　\[7\] - 庇护者　\n\tINPUT\n\tIF RESULT >= 8\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tELSEIF RESULT == 0\n\t\tPERSONAL = 160\n\tELSEIF RESULT == 1\n\t\tPERSONAL = 161\n\tELSEIF RESULT == 2\n\t\tPERSONAL = 162\n\tELSEIF RESULT == 3\n\t\tPERSONAL = 163\n\tELSEIF RESULT == 4\n\t\tPERSONAL = 164\n\tELSEIF RESULT == 5\n\t\tPERSONAL = 166\n\tELSEIF RESULT == 6\n\t\tPERSONAL = 172\n\tELSEIF RESULT == 7\n\t\tPERSONAL = 173\n\tELSEIF RESULT < 0\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2\n\tENDIF\n\tGOTO INPUT_LOOP_2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '225',
        any: [/\t\tPERSONAL = 160/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '243-245',
        any: [/\tELSEIF RESULT < 0\n\t\tPERSONAL = 160\n\t\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '226',
        any: [/\t\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '245',
        any: [/\t\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '247',
        any: [/\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '249-258',
        any: [
          /ELSEIF RESULT == 1\n\tPRINTL 请选择发色。\n\tPRINTL \[1\] 金发  \[2\]栗发  \[3\]黒发  \[4\]红发  \[5\]银发  \n\tPRINTL \[6\] 青发  \[7\]绿发  \[8\]紫发  \[9\]白发  \[10\]暗金发\n\tINPUT\n\tIF RESULT >= 1 && RESULT <= 10 \|\| RESULT == 11\n\t\tTALENT:A:300 = RESULT\n\t\tHAIRCOLOR = RESULT\n\tENDIF\n\tGOTO INPUT_LOOP_2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '254',
        any: [/\tIF RESULT >= 1 && RESULT <= 10 \|\| RESULT == 11/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '255',
        any: [/\t\tTALENT:A:300 = RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '256',
        any: [/\t\tHAIRCOLOR = RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '258',
        any: [/\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '260-261',
        any: [/ELSE\n\tGOTO INPUT_LOOP_2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '259',
        any: [/ELSEIF RESULT == 100/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '264-266',
        any: [/CALL CHAR_MAKE, PERSONAL, ARG\nCFLAG:RESULT:1 = 0\nA = RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '269-272',
        any: [
          /IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,13\)\n\tCALL RACE_AGE_GENERATE, CFLAG:A:451, TALENT:A:314\n\tCFLAG:A:452 = RESULT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '274-277',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTFORML %LOCALS:40%挑选少女%SAVESTR:A%作为贡品………\nPRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\nPRINTW/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '278',
        any: [/CALL SHOW_CHARA_INFO, A, -2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '279-281',
        any: [
          /PRINTL 要收下这名少女作为贡品吗？\nPRINTFORML \[0\] 就是她了  \[1\] 再换一个  \[2\] %LOCALS:30%\nINPUT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '286-290',
        any: [
          /\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\t\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '291-296',
        any: [
          /ELSE\n\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '286-296',
        any: [
          /\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\t\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_0\nELSE\n\tA = CHARANUM - 1\n\tCALL PARTY_CHAR_DEL, A\n\tDELCHARA A\n\tCALL NAME_RESET\n\tGOTO INPUT_LOOP_1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '60-68',
        any: [
          /DRAWLINE\nPRINTL ┌─────────────────────────────┐\nPRINTL ｜　　　　　　　　魔王终于征服了精灵族的领域　　　　　　　　｜\nPRINTL ｜　　　　于是，魔王向精灵族的长老提出了这样的要求　　　　　｜\nPRINTL ｜　　　　　　　　要求献上秘藏的精灵族圣女　　　　　　　　　｜\nPRINTL └─────────────────────────────┘\n\nWAIT\nDRAWLINE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '70-74',
        any: [/FLAG:87 = 1\nCALL CHAR_GIFT, 1\nFLAG:87 = 2\n\nRETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '78-86',
        any: [
          /DRAWLINE\nPRINTL ┌─────────────────────────────┐\nPRINTL ｜　　　　　　　　　魔王终于征服了龙族的山脉　　　　　　　　｜\nPRINTL ｜　　　　　于是，魔王向龙族的长老提出了这样的要求　　　　　｜\nPRINTL ｜　　　　　　　要求献上有着最悠久血统的龙族公主　　　　　　｜\nPRINTL └─────────────────────────────┘\n\nWAIT\nDRAWLINE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '88-92',
        any: [/FLAG:89 = 1\nCALL CHAR_GIFT, 5\nFLAG:89 = 2\n\nRETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '98-106',
        any: [
          /DRAWLINE\nPRINTL ┌─────────────────────────────┐\nPRINTL ｜　　　　　　　　　　魔王终于征服了天界　　　　　　　　　　｜\nPRINTL ｜　　　　　　　　于是，魔王向天界提出了要求　　　　　　　　｜\nPRINTL ｜　　　　　　　命令献上被选为下一代主神的天使　　　　　　　｜\nPRINTL └─────────────────────────────┘\n\nWAIT\nDRAWLINE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '108-112',
        any: [/FLAG:91 = 1\nCALL CHAR_GIFT, 6\nFLAG:91 = 2\n\nRETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '351-352',
        any: [/SIF EX_FLAG:2801 == 99 && DAY:0 == 500\n\tCALL ENDING_N/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '133',
        any: [/\t\t\tCALL ENDINGINPUT,\(EX_FLAG:2801 \+ 1000\)/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '131',
        any: [/\t\t\tPRINTFORMW \[1\] 结束游戏\t\t\[2\] 继续游戏/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '116-117',
        any: [
          /\t\t\tDRAWLINE\n\t\t\tPRINTFORMW 自从魔王被解开封印已经过了整整500天。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '122-124',
        any: [
          /\t\t\tPRINTFORMW 要么成为了魔王力量的一部分，帮助魔王为祸人间。\n\t\t\tPRINTFORML \n\t\t\tPRINTFORMW 这块大陆的人们渐渐也习惯于魔王地下城的存在，想要寻找财富或者冒险\.\.\./,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '922',
        any: [/LOCAL = ARG \/ 1000/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '924-926',
        any: [/\$ENDDINGSELECT\n\nINPUT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '936',
        any: [/\t\t\t\tGOTO ENDDINGSELECT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '956',
        any: [/\t\t\t\tGOTO ENDDINGSELECT\t/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '971',
        any: [/\t\t\t\tGOTO ENDDINGSELECT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '989',
        any: [/\t\t\t\tGOTO ENDDINGSELECT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '978',
        any: [/\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '980',
        any: [/\t\t\t\tSIF LOCAL == \(5 \|\| 6\)/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '924',
        any: [/\$ENDDINGSELECT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '928-938',
        any: [
          /\tCASE 1\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tQUIT\n\t\t\tCASE 2\n\t\t\t\tPRINTW 魔王的传说，还将继续\.\.\.\.\.\.\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\n\t\tENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '932',
        any: [/\t\t\t\tQUIT/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '934',
        any: [/\t\t\t\tPRINTW 魔王的传说，还将继续\.\.\.\.\.\./],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '939-957',
        any: [
          /\tCASE 7\n\t;白告（菲亚）\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tSIF EX_FLAG:2807 == 3\n\t\t\t\t\tPRINTW 菲娅公主线start~\n\t\t\t\tSIF EX_FLAG:2807 == 13\n\t\t\t\t\tPRINTW 菲娅魔女线start~\n\t\t\t\tEX_FLAG:2807 \+= 100\n\t\t\t\tEX_FLAG:2801 \+= 2\n\t\t\tCASE 2\n\t\t\t\tPRINTW 嘛\.\.\.那祝你其他线好运咯\n\t\t\t\tEX_FLAG:2807 \+= 100\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 嗯，那就给你先存个档，明天再问吧\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\t\n\t\t\tENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '944-947',
        any: [
          /\t\t\t\tSIF EX_FLAG:2807 == 3\n\t\t\t\t\tPRINTW 菲娅公主线start~\n\t\t\t\tSIF EX_FLAG:2807 == 13\n\t\t\t\t\tPRINTW 菲娅魔女线start~/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '948-949',
        any: [/\t\t\t\tEX_FLAG:2807 \+= 100\n\t\t\t\tEX_FLAG:2801 \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '949',
        any: [/\t\t\t\tEX_FLAG:2801 \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '951',
        any: [/\t\t\t\tPRINTW 嘛\.\.\.那祝你其他线好运咯/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '952',
        any: [/\t\t\t\tEX_FLAG:2807 \+= 100\t\t/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '954',
        any: [/\t\t\t\tPRINTW 嗯，那就给你先存个档，明天再问吧/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '958-972',
        any: [
          /\tCASE 16\n\t;双飞end\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tPRINTW 此处剧情尚未做好\n\t\t\t\tEX_FLAG:2805 \+= 100\n\t\t\tCASE 2\n\t\t\t\tPRINTW 你跳过了本故事线\n\t\t\t\tEX_FLAG:2805 \+= 100\t\t\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 好的，明天见\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\t\tENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '963',
        any: [/\t\t\t\tPRINTW 此处剧情尚未做好/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '964',
        any: [/\t\t\t\tEX_FLAG:2805 \+= 100/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '966',
        any: [/\t\t\t\tPRINTW 你跳过了本故事线/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '967',
        any: [/\t\t\t\tEX_FLAG:2805 \+= 100\t\t\t\t/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '969',
        any: [/\t\t\t\tPRINTW 好的，明天见/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '973-991',
        any: [
          /\tCASEELSE\n\t\tSELECTCASE RESULT\n\t\n\t\t\tCASE 1\n\t\t\t\tPRINTW 此处剧情尚未做好\n\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100\n\t\t\t\tEX_FLAG:2801 \+= 2\n\t\t\t\tSIF LOCAL == \(5 \|\| 6\)\n\t\t\t\t\tEX_FLAG:2801 \+= 1\n\t\t\t\t\t;为姐妹双飞end特殊处理\n\t\t\tCASE 2\n\t\t\t\tPRINTW 你跳过了本故事线\n\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100\t\t\t\t\n\t\t\tCASE 3\n\t\t\t\tPRINTW 好的，明天见\n\t\t\tCASEELSE\n\t\t\t\tGOTO ENDDINGSELECT\n\n\t\tENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '977',
        any: [/\t\t\t\tPRINTW 此处剧情尚未做好/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '979',
        any: [/\t\t\t\tEX_FLAG:2801 \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '984',
        any: [/\t\t\t\tPRINTW 你跳过了本故事线/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '985',
        any: [/\t\t\t\tFLAG:\(2800 \+ LOCAL\) \+= 100\t\t\t\t/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '987',
        any: [/\t\t\t\tPRINTW 好的，明天见/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '997',
        any: [/\tCASE 7/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '994-996',
        any: [/@ENDINCONSQSELECT,ARG\nINPUT\nSELECTCASE ARG/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '1035',
        any: [/\tCASEELSE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '476-484',
        any: [
          /DRAWLINE\nPRINTFORMW\t当你突破层层包围、攻入天界宫广场时、首先看到的却是嘉德被六个人包围在其中的身影\nPRINTFORMW\t你大手一挥、大量魔物一拥而上、与广场中的天界十字军战到了一起。\nPRINTFORMW\t而你则突入了六个审判者的包围圈\nPRINTFORMW\t当你靠近了嘉德、你才发现、嘉德早已遍体鳞伤。身上不知道散布着多少伤口、丝丝鲜血早已染红了嘉德破碎的衣服、\nPRINTFORMW\t「呵。。呵呵。。本。。本宫居然。。居然被同胞刀剑相向。。然。。然后被魔王所救什么的。。真。。真是狼狈啊。。」\nPRINTFORMW\t嘉德不停地喘息着。鲜血随着嘉德垂着的指尖滴落。\nPRINTFORMW\t而且则是轻哼一声、从腰间拔出魔剑指向周围仅剩的六个审判者\nPRINTFORMW\t战斗、一触即发。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '269-271',
        any: [
          /\tCALL RACE_AGE_GENERATE, CFLAG:A:451, TALENT:A:314\n\tCFLAG:A:452 = RESULT/,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
