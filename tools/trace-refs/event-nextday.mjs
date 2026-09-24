// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-nextday.mjs
//
// #400（N16）起 EVENT_NEXTDAY.ERB 走全路径：本表的 refs 由两个 JS 文件里的
// 内联 `:N`/`:N-M` 引用逐个生成，any 取**该区间整段文本**（#298 鉴别力：
// 整段一旦含 payload 即不算弱锚）；整段无 payload 的引用已在 JS 侧扩到含
// payload 的邻行，登记键与 JS 注释逐字一致。

export const FILES = [
  {
    js: 'ere/event/event-nextday.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '371-372',
        any: [
          new RegExp(
            '^\\s*PRINTL \\[0\\] - 好的\\s*$\\s*^\\s*PRINTL \\[1\\] - 不要\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '944-945',
        any: [
          new RegExp(
            '^\\s*PRINTL  \\[0\\] - 等你很久了！\\s*$\\s*^\\s*PRINTL  \\[1\\] - 继续等着吧你……\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '969-970',
        any: [
          new RegExp(
            '^\\s*PRINTL  \\[0\\] - 安全第一！\\s*$\\s*^\\s*PRINTL  \\[1\\] - 中出最高！\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '3',
        any: [/;=================================================/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '6-189',
        any: [
          /@EVENT_NEXTDAY\n#DIM NEXTDAY_COUNT\n\n;キャラの素質変更に関わるチェック\nFOR NEXTDAY_COUNT, 1, CHARANUM\n	SIF NEXTDAY_COUNT == 0\n		CONTINUE\n\n	TARGET = NEXTDAY_COUNT\n\n	;不思議の根持ちで精液经验が150以上で【扶她】に変化\n	IF TALENT:121 == 0 && TALENT:122 == 0\n		SIF TALENT:326 == 1 && EXP:20 >= 150\n			CALL EVENT_FUTA_F\n	ENDIF\n\n	;放尿经验40以上（【幼稚】があれば15以上）で【漏尿癖】がつく\n	IF TALENT:57 == 0\n		SIF TALENT:132 && EXP:31 >= 15\n			CALL EVENT_MORASI\n		SIF TALENT:132 == 0 && EXP:31 >= 40\n			CALL EVENT_MORASI\n	ENDIF\n	;反抗刻印３があり\n	IF MARK:3 == 3\n		;かつ【幼稚】か【软弱】である時に、欲望が5かつ顺从が5かつ抖M气质が5かつ异常经验が５以上になると幼儿退行する\n		IF \(TALENT:132 \|\| TALENT:134\) && ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && EXP:50 >= 5\n			CALL EVENT_YOUJI\n		;欲望が5かつ顺从が5かつ抖M气质が5かつ露出５と异常经验が７以上に加え【漏尿癖】がつくと【幼儿退行】する\n		ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1\n			CALL EVENT_YOUJI\n		ENDIF\n	ENDIF\n\n	;【恶魔肌肤】【悪魔羽】【恶魔尾巴】【恶魔眼睛】が全て揃っていると种族が魔族になる。\n	IF TALENT:314 != 9\n		SIF TALENT:244 == 1  &&  TALENT:245 == 1  &&  TALENT:246 == 1  &&  TALENT:247 == 1\n			CALL EVENT_MAZOKU\n	ENDIF\n\n	;媚药中毒\n	CALL APHRODISIAC_ADDICT\n	\n	;灵魂错位\n	CALL SOUL_DISLOCATION\n	\nNEXT\n\n;排卵诱发剂の効果終了処理\nREPEAT CHARANUM\n	IF CFLAG:COUNT:109\n		PRINTFORML %SAVESTR:COUNT%的排卵诱发剂的效果消失了。\n		DRAWLINE\n		CFLAG:COUNT:109 = 0\n	ENDIF\nREND\n\n;熏香の使用回数をクリア\nFLAG:61 = 0\n\n;妊娠\\出産\\育児室関連处理\nCALL NINSIN_MAIN\n;出産･育児室関連\nFOR LOCAL, 0, CHARANUM\n	IF TALENT:LOCAL:153 \|\| TALENT:LOCAL:154\n		;出産3日前からは臨月突入で調教不可に\n		IF \(CFLAG:LOCAL:110 - 3\) == DAY\n			DRAWLINE\n			PRINTFORML %SAVESTR:LOCAL%似乎再过几天就要生産了……\n			;CALL REACH_FULL_TERM\(LOCAL\)\n		;出産前日には育児室への訪問を問うイベント発生\n		ELSEIF \(CFLAG:LOCAL:110 - 1\) == DAY\n			DRAWLINE\n			PRINTFORML 已经邻近%SAVESTR:LOCAL%的出産日了……\n			DRAWLINE\n		;出産予定日なら出産\n		ELSEIF CFLAG:LOCAL:110 == DAY\n			DRAWLINE\n			;CALL CHILD_BIRTH\(LOCAL\)\n		;出産5日で親離れで調教可能に\n		ELSEIF \(CFLAG:LOCAL:110 \+ 5\) == DAY\n			DRAWLINE\n			;CALL DEPEARENT\(LOCAL\)\n		ELSEIF TALENT:LOCAL:154\n			DRAWLINE\n			PRINTFORML %SAVESTR:LOCAL%正在哺育幼儿……\n			DRAWLINE\n		ENDIF\n	ENDIF\nNEXT\n\n;着衣設定の場合、汚れた衣類を洗濯する\n;SIF FLAG:37\n;	CALL WASHING_CLOTH\n\n;处女チェック\nREPEAT CHARANUM\n	SIF COUNT == 0\n		CONTINUE\n	TARGET = COUNT\n	;处女なら处女献上チェック\n	IF TALENT:0\n		CALL OFFERVIRGIN_CHECK\n	ENDIF\n	COUNT = TARGET\nREND\n\n;性交中毒による夜這いチェック\nCALL NIGHT_STALKING_CHECK\n\n;運営費\n;CALL RUNNING_COST\n\n;指輪と召喚\nCALL CURSE_EQUIP_RING\n\n;5\/21\nCALL SUMMON_MONSTER, 0\n\n;设施効果\nCALL DUNGEON_ROOM_DAY\n\n;キャライベント\nREPEAT CHARANUM\n	SIF COUNT == 0\n		CONTINUE\n\n	TARGET = COUNT\n	\n	CALL PILLORY\n	\n	CALL SABBATH\n\n	CALL SABBATH_DAY\n	\n	CALL NTR_VIDEO\n	\n	CALL EVENT_VIDEO_DAY\n	\n	;善恶值増減\n	;处女の場合善恶值上昇\n	SIF TALENT:0 == 0 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;爱の場合善恶值上昇\n	SIF TALENT:85 == 1 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;侵攻中の場合善恶值上昇\n	SIF CFLAG:1 == 2 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;何は無くともちょっとずつ変動\n	IF RAND:2 == 0\n		CALL KARMA, TARGET, 1\n	ELSE\n		CALL KARMA, TARGET, -1\n	ENDIF\n	\n	;信仰値増加\n	;聖女・神官・巫女は信仰値が上昇\n	IF TALENT:成为勇者前的生活 == 12 \|\| TALENT:202 \|\| TALENT:206\n		CALL FAITH, TARGET, 1\n	ELSEIF CFLAG:152 < 30\n		;そうでない場合、中途半端な信仰は減少\n		CALL FAITH, TARGET, -1\n	ELSEIF RAND:4 == 0\n		;ランダムで増えたり\n		CALL FAITH, TARGET, 1\n	ELSEIF RAND:3 == 0\n		;減ったり\n		CALL FAITH, TARGET, -1\n	ENDIF\n	\n	COUNT = TARGET\nREND\n\n;税収\nCALL TAX_GET\n\n;水晶球投放结算\nCALL SENGEN_VIDEO_DE\n\n;确定魔王候补\nCALL MAOU_KOUHO\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '10-52',
        any: [
          /FOR NEXTDAY_COUNT, 1, CHARANUM\n	SIF NEXTDAY_COUNT == 0\n		CONTINUE\n\n	TARGET = NEXTDAY_COUNT\n\n	;不思議の根持ちで精液经验が150以上で【扶她】に変化\n	IF TALENT:121 == 0 && TALENT:122 == 0\n		SIF TALENT:326 == 1 && EXP:20 >= 150\n			CALL EVENT_FUTA_F\n	ENDIF\n\n	;放尿经验40以上（【幼稚】があれば15以上）で【漏尿癖】がつく\n	IF TALENT:57 == 0\n		SIF TALENT:132 && EXP:31 >= 15\n			CALL EVENT_MORASI\n		SIF TALENT:132 == 0 && EXP:31 >= 40\n			CALL EVENT_MORASI\n	ENDIF\n	;反抗刻印３があり\n	IF MARK:3 == 3\n		;かつ【幼稚】か【软弱】である時に、欲望が5かつ顺从が5かつ抖M气质が5かつ异常经验が５以上になると幼儿退行する\n		IF \(TALENT:132 \|\| TALENT:134\) && ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && EXP:50 >= 5\n			CALL EVENT_YOUJI\n		;欲望が5かつ顺从が5かつ抖M气质が5かつ露出５と异常经验が７以上に加え【漏尿癖】がつくと【幼儿退行】する\n		ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1\n			CALL EVENT_YOUJI\n		ENDIF\n	ENDIF\n\n	;【恶魔肌肤】【悪魔羽】【恶魔尾巴】【恶魔眼睛】が全て揃っていると种族が魔族になる。\n	IF TALENT:314 != 9\n		SIF TALENT:244 == 1  &&  TALENT:245 == 1  &&  TALENT:246 == 1  &&  TALENT:247 == 1\n			CALL EVENT_MAZOKU\n	ENDIF\n\n	;媚药中毒\n	CALL APHRODISIAC_ADDICT\n	\n	;灵魂错位\n	CALL SOUL_DISLOCATION\n	\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '16-20',
        any: [
          /	;不思議の根持ちで精液经验が150以上で【扶她】に変化\n	IF TALENT:121 == 0 && TALENT:122 == 0\n		SIF TALENT:326 == 1 && EXP:20 >= 150\n			CALL EVENT_FUTA_F\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '22-28',
        any: [
          /	;放尿经验40以上（【幼稚】があれば15以上）で【漏尿癖】がつく\n	IF TALENT:57 == 0\n		SIF TALENT:132 && EXP:31 >= 15\n			CALL EVENT_MORASI\n		SIF TALENT:132 == 0 && EXP:31 >= 40\n			CALL EVENT_MORASI\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '29-38',
        any: [
          /	;反抗刻印３があり\n	IF MARK:3 == 3\n		;かつ【幼稚】か【软弱】である時に、欲望が5かつ顺从が5かつ抖M气质が5かつ异常经验が５以上になると幼儿退行する\n		IF \(TALENT:132 \|\| TALENT:134\) && ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && EXP:50 >= 5\n			CALL EVENT_YOUJI\n		;欲望が5かつ顺从が5かつ抖M气质が5かつ露出５と异常经验が７以上に加え【漏尿癖】がつくと【幼儿退行】する\n		ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1\n			CALL EVENT_YOUJI\n		ENDIF\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '33',
        any: [/			CALL EVENT_YOUJI/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '40-44',
        any: [
          /	;【恶魔肌肤】【悪魔羽】【恶魔尾巴】【恶魔眼睛】が全て揃っていると种族が魔族になる。\n	IF TALENT:314 != 9\n		SIF TALENT:244 == 1  &&  TALENT:245 == 1  &&  TALENT:246 == 1  &&  TALENT:247 == 1\n			CALL EVENT_MAZOKU\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '47',
        any: [/	CALL APHRODISIAC_ADDICT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '50',
        any: [/	CALL SOUL_DISLOCATION/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '55-61',
        any: [
          /REPEAT CHARANUM\n	IF CFLAG:COUNT:109\n		PRINTFORML %SAVESTR:COUNT%的排卵诱发剂的效果消失了。\n		DRAWLINE\n		CFLAG:COUNT:109 = 0\n	ENDIF\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '59',
        any: [/		CFLAG:COUNT:109 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '64',
        any: [/FLAG:61 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '67',
        any: [/CALL NINSIN_MAIN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '69-95',
        any: [
          /FOR LOCAL, 0, CHARANUM\n	IF TALENT:LOCAL:153 \|\| TALENT:LOCAL:154\n		;出産3日前からは臨月突入で調教不可に\n		IF \(CFLAG:LOCAL:110 - 3\) == DAY\n			DRAWLINE\n			PRINTFORML %SAVESTR:LOCAL%似乎再过几天就要生産了……\n			;CALL REACH_FULL_TERM\(LOCAL\)\n		;出産前日には育児室への訪問を問うイベント発生\n		ELSEIF \(CFLAG:LOCAL:110 - 1\) == DAY\n			DRAWLINE\n			PRINTFORML 已经邻近%SAVESTR:LOCAL%的出産日了……\n			DRAWLINE\n		;出産予定日なら出産\n		ELSEIF CFLAG:LOCAL:110 == DAY\n			DRAWLINE\n			;CALL CHILD_BIRTH\(LOCAL\)\n		;出産5日で親離れで調教可能に\n		ELSEIF \(CFLAG:LOCAL:110 \+ 5\) == DAY\n			DRAWLINE\n			;CALL DEPEARENT\(LOCAL\)\n		ELSEIF TALENT:LOCAL:154\n			DRAWLINE\n			PRINTFORML %SAVESTR:LOCAL%正在哺育幼儿……\n			DRAWLINE\n		ENDIF\n	ENDIF\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '72',
        any: [/		IF \(CFLAG:LOCAL:110 - 3\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '75',
        any: [/			;CALL REACH_FULL_TERM\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '77',
        any: [/		ELSEIF \(CFLAG:LOCAL:110 - 1\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '79',
        any: [/			PRINTFORML 已经邻近%SAVESTR:LOCAL%的出産日了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '82',
        any: [/		ELSEIF CFLAG:LOCAL:110 == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '84',
        any: [/			;CALL CHILD_BIRTH\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '86',
        any: [/		ELSEIF \(CFLAG:LOCAL:110 \+ 5\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '88',
        any: [/			;CALL DEPEARENT\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '89',
        any: [/		ELSEIF TALENT:LOCAL:154/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '97-99',
        any: [
          /;着衣設定の場合、汚れた衣類を洗濯する\n;SIF FLAG:37\n;	CALL WASHING_CLOTH/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '102-111',
        any: [
          /REPEAT CHARANUM\n	SIF COUNT == 0\n		CONTINUE\n	TARGET = COUNT\n	;处女なら处女献上チェック\n	IF TALENT:0\n		CALL OFFERVIRGIN_CHECK\n	ENDIF\n	COUNT = TARGET\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '114',
        any: [/CALL NIGHT_STALKING_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '117',
        any: [/;CALL RUNNING_COST/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '120',
        any: [/CALL CURSE_EQUIP_RING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '123',
        any: [/CALL SUMMON_MONSTER, 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '126',
        any: [/CALL DUNGEON_ROOM_DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '129-178',
        any: [
          /REPEAT CHARANUM\n	SIF COUNT == 0\n		CONTINUE\n\n	TARGET = COUNT\n	\n	CALL PILLORY\n	\n	CALL SABBATH\n\n	CALL SABBATH_DAY\n	\n	CALL NTR_VIDEO\n	\n	CALL EVENT_VIDEO_DAY\n	\n	;善恶值増減\n	;处女の場合善恶值上昇\n	SIF TALENT:0 == 0 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;爱の場合善恶值上昇\n	SIF TALENT:85 == 1 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;侵攻中の場合善恶值上昇\n	SIF CFLAG:1 == 2 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;何は無くともちょっとずつ変動\n	IF RAND:2 == 0\n		CALL KARMA, TARGET, 1\n	ELSE\n		CALL KARMA, TARGET, -1\n	ENDIF\n	\n	;信仰値増加\n	;聖女・神官・巫女は信仰値が上昇\n	IF TALENT:成为勇者前的生活 == 12 \|\| TALENT:202 \|\| TALENT:206\n		CALL FAITH, TARGET, 1\n	ELSEIF CFLAG:152 < 30\n		;そうでない場合、中途半端な信仰は減少\n		CALL FAITH, TARGET, -1\n	ELSEIF RAND:4 == 0\n		;ランダムで増えたり\n		CALL FAITH, TARGET, 1\n	ELSEIF RAND:3 == 0\n		;減ったり\n		CALL FAITH, TARGET, -1\n	ENDIF\n	\n	COUNT = TARGET\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-147',
        any: [/	;处女の場合善恶值上昇\n	SIF TALENT:0 == 0 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-154',
        any: [
          /	;处女の場合善恶值上昇\n	SIF TALENT:0 == 0 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;爱の場合善恶值上昇\n	SIF TALENT:85 == 1 && RAND:3 == 0\n		CALL KARMA, TARGET, 1\n	;侵攻中の場合善恶值上昇\n	SIF CFLAG:1 == 2 && RAND:3 == 0\n		CALL KARMA, TARGET, 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '147',
        any: [/	SIF TALENT:0 == 0 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '162-175',
        any: [
          /	;信仰値増加\n	;聖女・神官・巫女は信仰値が上昇\n	IF TALENT:成为勇者前的生活 == 12 \|\| TALENT:202 \|\| TALENT:206\n		CALL FAITH, TARGET, 1\n	ELSEIF CFLAG:152 < 30\n		;そうでない場合、中途半端な信仰は減少\n		CALL FAITH, TARGET, -1\n	ELSEIF RAND:4 == 0\n		;ランダムで増えたり\n		CALL FAITH, TARGET, 1\n	ELSEIF RAND:3 == 0\n		;減ったり\n		CALL FAITH, TARGET, -1\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '181',
        any: [/CALL TAX_GET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '184',
        any: [/CALL SENGEN_VIDEO_DE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '187',
        any: [/CALL MAOU_KOUHO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '189-190',
        any: [/RETURN 1\n;=================================================/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '193-243',
        any: [
          /@EVENT_NEWDAY\n;彼女はときどき帰ってくる\n;D = 0\n;CALL SOMETIMES_SHE_COMES_BACK\n;SIF D\n;	RETURN 1\n\nA = 0\nREPEAT CHARANUM\n	SIF A >= CHARANUM\n		BREAK\n	\n	;影の寿命\n	IF TALENT:A:292 && CFLAG:A:1 != 11\n		CFLAG:A:820 -= 1\n		PRINTFORML %SAVESTR:A%的寿命还有\{CFLAG:A:820\}天\n	ENDIF\n	\n	;影の寿命\n	IF TALENT:A:292 && CFLAG:A:820 <= 0 && CFLAG:A:1 != 11\n		PRINTFORML %SAVESTR:A%消失在了光芒之中……\n		CFLAG:A:9 = 1\n		CALL EXECUTION_MINI\("NO_LOG"\)\n		COUNT = 1\n		A = 0\n	ENDIF\n	\n	A \+= 1\nREND\n\n;起床\(朝フェラ\)→日付確認\(誕生日\)→朝食\(おねしょ\)の順番で処理が良いかなーと。\n\n;朝フェラ\nCALL MORNING_FELLATIO\n\n;誕生日\n;CALL HAPPY_BIRTHDAY\n\n;おねしょ\nCALL ONESHO\n\n;特定日付のイベント\n;CALL PARTICULAR_DATE\n\n;犬の散歩\nCALL DOG_WALK\n\n;主线剧情监测\nCALL ENDCHECK\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '196',
        any: [/;CALL SOMETIMES_SHE_COMES_BACK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '200-221',
        any: [
          /A = 0\nREPEAT CHARANUM\n	SIF A >= CHARANUM\n		BREAK\n	\n	;影の寿命\n	IF TALENT:A:292 && CFLAG:A:1 != 11\n		CFLAG:A:820 -= 1\n		PRINTFORML %SAVESTR:A%的寿命还有\{CFLAG:A:820\}天\n	ENDIF\n	\n	;影の寿命\n	IF TALENT:A:292 && CFLAG:A:820 <= 0 && CFLAG:A:1 != 11\n		PRINTFORML %SAVESTR:A%消失在了光芒之中……\n		CFLAG:A:9 = 1\n		CALL EXECUTION_MINI\("NO_LOG"\)\n		COUNT = 1\n		A = 0\n	ENDIF\n	\n	A \+= 1\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '200',
        any: [/A = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '226',
        any: [/CALL MORNING_FELLATIO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '229',
        any: [/;CALL HAPPY_BIRTHDAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '232',
        any: [/CALL ONESHO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '235',
        any: [/;CALL PARTICULAR_DATE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '238',
        any: [/CALL DOG_WALK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '241',
        any: [/CALL ENDCHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '243-244',
        any: [
          /RETURN 1\n;===========================================================/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '247-363',
        any: [
          /@RUNNING_COST\n;基礎維持運営費\nA = 500\n\n;日付が30日を超えると\$1000追加\nSIF DAY > 31\n	A \+= 1000\n;日付が50日を超えると\$2000追加\nSIF DAY > 51\n	A \+= 2000\n\n;個室を拡張していると\$500追加\nSIF FLAG:48 & 1\n	A \+= 500\n;ＳＭグッズを購入していると\$100追加\nSIF FLAG:48 & 2\n	A \+= 100\n;護衛を雇用していると\$1000追加\nSIF FLAG:48 & 4\n	A \+= 1000\n;浴室を拡張していると\$500追加\nSIF FLAG:48 & 32\n	A \+= 500\n;多目的ホールを建てていると\$1800追加\nSIF FLAG:48 & 8\n	A \+= 1800\n;マイクを購入していると\$100追加\nSIF FLAG:48 & 16\n	A \+= 100\n;警備員を雇用していると人数\*\$500追加\nSIF FLAG:48 & 64\n	A \+= FLAG:40 \* 500\n\n;娼館人気が50以上で1割増、70以上で2割増、90以上で3割増\nIF EXP:MASTER:91 >= 50\n	TIMES A , 1\.10\nELSEIF EXP:MASTER:91 >= 70\n	TIMES A , 1\.20\nELSEIF EXP:MASTER:91 >= 90\n	TIMES A , 1\.30\nENDIF\n\n;貢献度が100以上で1割減、200以上で2割減、400以上で3割減、700以上で4割減……\nIF EXP:MASTER:90 >= 3000\n	TIMES A , 0\.10\nELSEIF EXP:MASTER:90 >= 2000\n	TIMES A , 0\.30\nELSEIF EXP:MASTER:90 >= 1200\n	TIMES A , 0\.50\nELSEIF EXP:MASTER:90 >= 700\n	TIMES A , 0\.60\nELSEIF EXP:MASTER:90 >= 400\n	TIMES A , 0\.70\nELSEIF EXP:MASTER:90 >= 200\n	TIMES A , 0\.80\nELSEIF EXP:MASTER:90 >= 100\n	TIMES A , 0\.90\nENDIF\n\n;基礎生活費（生活費機能実装までの暫定的な処理）\n;1人あたりEASY\/NORMAL\/EXTRAは\$100、HARDは\$200、LUNATICは\$300、PHANTASMは\$400\nIF FLAG:5 <= 2 \|\| FLAG:5 == 9\n	A \+= CHARANUM\*100\nELSEIF FLAG:5 == 3\n	A \+= CHARANUM\*200\nELSEIF FLAG:5 == 4\n	A \+= CHARANUM\*300\nELSEIF FLAG:5 == 5\n	A \+= CHARANUM\*400\nENDIF\n;MASTERの分は無料or割引\nA -= 100\n\n;難易度EASYで0\.8倍、HARDで1\.2～2\.5倍、POWERFULで1\.4～5\.0倍、PHANTASMで2\.0～16\.0倍\nIF FLAG:5 == 1\n	TIMES A , 0\.80\nELSEIF FLAG:5 == 3\n	IF DAY <= 20\n		TIMES A , 1\.20\n	ELSEIF DAY <= 40\n		TIMES A , 1\.50\n	ELSEIF DAY <= 60\n		TIMES A , 2\.00\n	ELSE\n		TIMES A , 2\.50\n	ENDIF\nELSEIF FLAG:5 == 4\n	IF DAY <= 20\n		TIMES A , 1\.40\n	ELSEIF DAY <= 30\n		TIMES A , 1\.80\n	ELSEIF DAY <= 40\n		TIMES A , 3\.00\n	ELSE\n		TIMES A , 5\.00\n	ENDIF\nELSEIF FLAG:5 == 5\n	IF DAY <= 15\n		TIMES A , 2\.00\n	ELSEIF DAY <= 25\n		TIMES A , 4\.00\n	ELSEIF DAY <= 35\n		TIMES A , 8\.00\n	ELSE\n		TIMES A , 16\.00\n	ENDIF\nENDIF\n\n;EASYは21日から、NORMAL以上は11日から維持費＆生活費が発生する\nIF FLAG:5 != 9\n	IF \(FLAG:5 == 1 && DAY >= 20\) \|\| \(FLAG:5 >= 2 && DAY >= 10\)\n		PRINTFORML 调教中心的维持费和奴隶们的生活费花了\$\{A\}……\n		DRAWLINE\n		MONEY -= A\n		EX_FLAG:4444 -= A\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '249',
        any: [/A = 500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '252-253',
        any: [/SIF DAY > 31\n	A \+= 1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '254-256',
        any: [/;日付が50日を超えると\$2000追加\nSIF DAY > 51\n	A \+= 2000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '258-278',
        any: [
          /;個室を拡張していると\$500追加\nSIF FLAG:48 & 1\n	A \+= 500\n;ＳＭグッズを購入していると\$100追加\nSIF FLAG:48 & 2\n	A \+= 100\n;護衛を雇用していると\$1000追加\nSIF FLAG:48 & 4\n	A \+= 1000\n;浴室を拡張していると\$500追加\nSIF FLAG:48 & 32\n	A \+= 500\n;多目的ホールを建てていると\$1800追加\nSIF FLAG:48 & 8\n	A \+= 1800\n;マイクを購入していると\$100追加\nSIF FLAG:48 & 16\n	A \+= 100\n;警備員を雇用していると人数\*\$500追加\nSIF FLAG:48 & 64\n	A \+= FLAG:40 \* 500/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '259-274',
        any: [
          /SIF FLAG:48 & 1\n	A \+= 500\n;ＳＭグッズを購入していると\$100追加\nSIF FLAG:48 & 2\n	A \+= 100\n;護衛を雇用していると\$1000追加\nSIF FLAG:48 & 4\n	A \+= 1000\n;浴室を拡張していると\$500追加\nSIF FLAG:48 & 32\n	A \+= 500\n;多目的ホールを建てていると\$1800追加\nSIF FLAG:48 & 8\n	A \+= 1800\n;マイクを購入していると\$100追加\nSIF FLAG:48 & 16/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '276-278',
        any: [
          /;警備員を雇用していると人数\*\$500追加\nSIF FLAG:48 & 64\n	A \+= FLAG:40 \* 500/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '281-287',
        any: [
          /IF EXP:MASTER:91 >= 50\n	TIMES A , 1\.10\nELSEIF EXP:MASTER:91 >= 70\n	TIMES A , 1\.20\nELSEIF EXP:MASTER:91 >= 90\n	TIMES A , 1\.30\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '281-282',
        any: [/IF EXP:MASTER:91 >= 50\n	TIMES A , 1\.10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '283-284',
        any: [/ELSEIF EXP:MASTER:91 >= 70\n	TIMES A , 1\.20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '285-286',
        any: [/ELSEIF EXP:MASTER:91 >= 90\n	TIMES A , 1\.30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '290-304',
        any: [
          /IF EXP:MASTER:90 >= 3000\n	TIMES A , 0\.10\nELSEIF EXP:MASTER:90 >= 2000\n	TIMES A , 0\.30\nELSEIF EXP:MASTER:90 >= 1200\n	TIMES A , 0\.50\nELSEIF EXP:MASTER:90 >= 700\n	TIMES A , 0\.60\nELSEIF EXP:MASTER:90 >= 400\n	TIMES A , 0\.70\nELSEIF EXP:MASTER:90 >= 200\n	TIMES A , 0\.80\nELSEIF EXP:MASTER:90 >= 100\n	TIMES A , 0\.90\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '290-303',
        any: [
          /IF EXP:MASTER:90 >= 3000\n	TIMES A , 0\.10\nELSEIF EXP:MASTER:90 >= 2000\n	TIMES A , 0\.30\nELSEIF EXP:MASTER:90 >= 1200\n	TIMES A , 0\.50\nELSEIF EXP:MASTER:90 >= 700\n	TIMES A , 0\.60\nELSEIF EXP:MASTER:90 >= 400\n	TIMES A , 0\.70\nELSEIF EXP:MASTER:90 >= 200\n	TIMES A , 0\.80\nELSEIF EXP:MASTER:90 >= 100\n	TIMES A , 0\.90/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '306-316',
        any: [
          /;基礎生活費（生活費機能実装までの暫定的な処理）\n;1人あたりEASY\/NORMAL\/EXTRAは\$100、HARDは\$200、LUNATICは\$300、PHANTASMは\$400\nIF FLAG:5 <= 2 \|\| FLAG:5 == 9\n	A \+= CHARANUM\*100\nELSEIF FLAG:5 == 3\n	A \+= CHARANUM\*200\nELSEIF FLAG:5 == 4\n	A \+= CHARANUM\*300\nELSEIF FLAG:5 == 5\n	A \+= CHARANUM\*400\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '308-309',
        any: [/IF FLAG:5 <= 2 \|\| FLAG:5 == 9\n	A \+= CHARANUM\*100/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '310-311',
        any: [/ELSEIF FLAG:5 == 3\n	A \+= CHARANUM\*200/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '312-313',
        any: [/ELSEIF FLAG:5 == 4\n	A \+= CHARANUM\*300/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '314-315',
        any: [/ELSEIF FLAG:5 == 5\n	A \+= CHARANUM\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '318',
        any: [/A -= 100/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '320-353',
        any: [
          /;難易度EASYで0\.8倍、HARDで1\.2～2\.5倍、POWERFULで1\.4～5\.0倍、PHANTASMで2\.0～16\.0倍\nIF FLAG:5 == 1\n	TIMES A , 0\.80\nELSEIF FLAG:5 == 3\n	IF DAY <= 20\n		TIMES A , 1\.20\n	ELSEIF DAY <= 40\n		TIMES A , 1\.50\n	ELSEIF DAY <= 60\n		TIMES A , 2\.00\n	ELSE\n		TIMES A , 2\.50\n	ENDIF\nELSEIF FLAG:5 == 4\n	IF DAY <= 20\n		TIMES A , 1\.40\n	ELSEIF DAY <= 30\n		TIMES A , 1\.80\n	ELSEIF DAY <= 40\n		TIMES A , 3\.00\n	ELSE\n		TIMES A , 5\.00\n	ENDIF\nELSEIF FLAG:5 == 5\n	IF DAY <= 15\n		TIMES A , 2\.00\n	ELSEIF DAY <= 25\n		TIMES A , 4\.00\n	ELSEIF DAY <= 35\n		TIMES A , 8\.00\n	ELSE\n		TIMES A , 16\.00\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '321-322',
        any: [/IF FLAG:5 == 1\n	TIMES A , 0\.80/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '355-363',
        any: [
          /;EASYは21日から、NORMAL以上は11日から維持費＆生活費が発生する\nIF FLAG:5 != 9\n	IF \(FLAG:5 == 1 && DAY >= 20\) \|\| \(FLAG:5 >= 2 && DAY >= 10\)\n		PRINTFORML 调教中心的维持费和奴隶们的生活费花了\$\{A\}……\n		DRAWLINE\n		MONEY -= A\n		EX_FLAG:4444 -= A\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '358',
        any: [/		PRINTFORML 调教中心的维持费和奴隶们的生活费花了\$\{A\}……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '359-360',
        any: [/		DRAWLINE\n		MONEY -= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '360',
        any: [/		MONEY -= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '361',
        any: [/		EX_FLAG:4444 -= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '367-386',
        any: [
          /@EVENT_FUTA_F\nPRINTFORML （呃…这是什么？）\n\$INPUT_LOOP\nPRINTFORML %SAVESTR:TARGET%要【%TALENTNAME:121%】化吗？\nPRINTL \[0\] - 好的\nPRINTL \[1\] - 不要\nINPUT\nIF RESULT == 0\n	PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:121%】。\n	TALENT:326 = 0\n	TALENT:121 = 1\n	TALENT:1 = 1\nELSEIF RESULT == 1\n	PRINTFORML %SAVESTR:TARGET%失去了【%TALENTNAME:326%】。\n	TALENT:326 = 0\nELSE\n	GOTO INPUT_LOOP\nENDIF\n\nWAIT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '368',
        any: [/PRINTFORML （呃…这是什么？）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '370',
        any: [/PRINTFORML %SAVESTR:TARGET%要【%TALENTNAME:121%】化吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '371',
        any: [/PRINTL \[0\] - 好的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '372',
        any: [/PRINTL \[1\] - 不要/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '373',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '375',
        any: [/	PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:121%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '375-378',
        any: [
          /	PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:121%】。\n	TALENT:326 = 0\n	TALENT:121 = 1\n	TALENT:1 = 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '380',
        any: [/	PRINTFORML %SAVESTR:TARGET%失去了【%TALENTNAME:326%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '380-381',
        any: [
          /	PRINTFORML %SAVESTR:TARGET%失去了【%TALENTNAME:326%】。\n	TALENT:326 = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '382-383',
        any: [/ELSE\n	GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '386',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '390-395',
        any: [
          /@EVENT_MORASI\nPRINTFORML 当晚，%SAVESTR:TARGET%尿床了…\nPRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:57%】。\nTALENT:57 = 1\n\nWAIT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '391',
        any: [/PRINTFORML 当晚，%SAVESTR:TARGET%尿床了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '392',
        any: [/PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:57%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '393',
        any: [/TALENT:57 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '395',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '399-465',
        any: [
          /@EVENT_YOUJI\nPRINTFORML （呃……这是什么？）\nPRINTFORMW %SAVESTR:TARGET%的样子有点奇怪……\nPRINTFORMW %SAVESTR:TARGET%再也无法接受严厉的调教，获得了【%TALENTNAME:131%】…\nTALENT:131 = 1\n\nIF TALENT:20\n	TALENT:20 = 0\n	PRINTFORML 【%TALENTNAME:20%】消失了。\nENDIF\nIF TALENT:21\n	TALENT:21 = 0\n	PRINTFORML 【%TALENTNAME:21%】消失了。\nENDIF\nIF TALENT:22\n	TALENT:22 = 0\n	PRINTFORML 【%TALENTNAME:22%】消失了。\nENDIF\nIF TALENT:24\n	TALENT:24 = 0\n	PRINTFORML 【%TALENTNAME:24%】消失了。\nENDIF\nIF TALENT:26\n	TALENT:26 = 0\n	PRINTFORML 【%TALENTNAME:26%】消失了。\nENDIF\nIF TALENT:27\n	TALENT:27 = 0\n	PRINTFORML 【%TALENTNAME:27%】消失了。\nENDIF\nIF TALENT:30\n	TALENT:30 = 0\n	PRINTFORML 【%TALENTNAME:30%】消失了。\nENDIF\nIF TALENT:32\n	TALENT:32 = 0\n	PRINTFORML 【%TALENTNAME:32%】消失了。\nENDIF\nIF TALENT:34\n	TALENT:34 = 0\n	PRINTFORML 【%TALENTNAME:34%】消失了。\nENDIF\nIF TALENT:35\n	TALENT:35 = 0\n	PRINTFORML 【%TALENTNAME:35%】消失了。\nENDIF\nIF TALENT:37\n	TALENT:37 = 0\n	PRINTFORML 【%TALENTNAME:37%】消失了。\nENDIF\nIF TALENT:55\n	TALENT:55 = 0\n	PRINTFORML 【%TALENTNAME:55%】消失了。\nENDIF\nIF TALENT:93\n	TALENT:93 = 0\n	PRINTFORML 【%TALENTNAME:93%】消失了。\nENDIF\nIF TALENT:57 == 0\n	TALENT:57 = 1\n	PRINTFORML 获得了【%TALENTNAME:57%】。\nENDIF\n\nMARK:3 = 0\nPRINTFORML 【%MARKNAME:3%】变为０。\n\nWAIT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '400',
        any: [/PRINTFORML （呃……这是什么？）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '401',
        any: [/PRINTFORMW %SAVESTR:TARGET%的样子有点奇怪……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '402',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%再也无法接受严厉的调教，获得了【%TALENTNAME:131%】…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '403',
        any: [/TALENT:131 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '405-456',
        any: [
          /IF TALENT:20\n	TALENT:20 = 0\n	PRINTFORML 【%TALENTNAME:20%】消失了。\nENDIF\nIF TALENT:21\n	TALENT:21 = 0\n	PRINTFORML 【%TALENTNAME:21%】消失了。\nENDIF\nIF TALENT:22\n	TALENT:22 = 0\n	PRINTFORML 【%TALENTNAME:22%】消失了。\nENDIF\nIF TALENT:24\n	TALENT:24 = 0\n	PRINTFORML 【%TALENTNAME:24%】消失了。\nENDIF\nIF TALENT:26\n	TALENT:26 = 0\n	PRINTFORML 【%TALENTNAME:26%】消失了。\nENDIF\nIF TALENT:27\n	TALENT:27 = 0\n	PRINTFORML 【%TALENTNAME:27%】消失了。\nENDIF\nIF TALENT:30\n	TALENT:30 = 0\n	PRINTFORML 【%TALENTNAME:30%】消失了。\nENDIF\nIF TALENT:32\n	TALENT:32 = 0\n	PRINTFORML 【%TALENTNAME:32%】消失了。\nENDIF\nIF TALENT:34\n	TALENT:34 = 0\n	PRINTFORML 【%TALENTNAME:34%】消失了。\nENDIF\nIF TALENT:35\n	TALENT:35 = 0\n	PRINTFORML 【%TALENTNAME:35%】消失了。\nENDIF\nIF TALENT:37\n	TALENT:37 = 0\n	PRINTFORML 【%TALENTNAME:37%】消失了。\nENDIF\nIF TALENT:55\n	TALENT:55 = 0\n	PRINTFORML 【%TALENTNAME:55%】消失了。\nENDIF\nIF TALENT:93\n	TALENT:93 = 0\n	PRINTFORML 【%TALENTNAME:93%】消失了。\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '407',
        any: [/	PRINTFORML 【%TALENTNAME:20%】消失了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '458',
        any: [/	TALENT:57 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '459',
        any: [/	PRINTFORML 获得了【%TALENTNAME:57%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '462',
        any: [/MARK:3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '463',
        any: [/PRINTFORML 【%MARKNAME:3%】变为０。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '465',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '470-498',
        any: [
          /@EVENT_MAZOKU\nSIF TALENT:魂缚\n	RETURN\n\nTALENT:原种族 = TALENT:种族\nIF ABL:欲望 >= 3\n	TALENT:现种族 = TALENT:淫乱 \? 152 # 132 ;淫乱ならサキュバス、それ以外はナイトガール\nTALENT:314 = 9\nTALENT:91 = 1\nTALENT:481 = 1\nPRINTFORMW 全身充满了浓厚的魔力………\nPRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，\nPRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。\nPRINTFORMW %SAVESTR:TARGET%的肉体上散发出致命的诱惑，获得了【魅惑】……\nPRINTFORMW %SAVESTR:TARGET%学会了如何用自己的肉体作为武器。获得了【诱惑】。\nPRINTFORML \n\nELSE\n	TALENT:现种族 = 140 ;インプ\nTALENT:314 = 9\nTALENT:482 = 1\nPRINTFORMW 全身充满了浓厚的魔力………\nPRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，\nPRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。\nPRINTFORMW %SAVESTR:TARGET%学会了如何破坏敌人防护。获得了【铠破坏】。\nPRINTFORML \n\nENDIF\nWAIT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '471-472',
        any: [/SIF TALENT:魂缚\n	RETURN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '474',
        any: [/TALENT:原种族 = TALENT:种族/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '476',
        any: [
          /	TALENT:现种族 = TALENT:淫乱 \? 152 # 132 ;淫乱ならサキュバス、それ以外はナイトガール/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '477',
        any: [/TALENT:314 = 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '478',
        any: [/TALENT:91 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '479',
        any: [/TALENT:481 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '480',
        any: [/PRINTFORMW 全身充满了浓厚的魔力………/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '481',
        any: [/PRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '482',
        any: [
          /PRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '483',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肉体上散发出致命的诱惑，获得了【魅惑】……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '484',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何用自己的肉体作为武器。获得了【诱惑】。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '484-485',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何用自己的肉体作为武器。获得了【诱惑】。\nPRINTFORML /,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '488',
        any: [/	TALENT:现种族 = 140 ;インプ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '489',
        any: [/TALENT:314 = 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '490',
        any: [/TALENT:482 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '491',
        any: [/PRINTFORMW 全身充满了浓厚的魔力………/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '492',
        any: [/PRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '493',
        any: [
          /PRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '494',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何破坏敌人防护。获得了【铠破坏】。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '494-495',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何破坏敌人防护。获得了【铠破坏】。\nPRINTFORML /,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '498',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '502-526',
        any: [
          /@SOMETIMES_SHE_COMES_BACK\nREPEAT CHARANUM\n	;主人公は判定から省く\n	SIF COUNT == 0\n		CONTINUE\n\n	IF BASE:COUNT:0 == 0\n		BASE:COUNT:0 = MAXBASE:COUNT:0 \/ 10\n		BASE:COUNT:1 = MAXBASE:COUNT:1\n		DRAWLINE\n		PRINTFORML 早上，%NAME:MASTER%睁开双眼，发现确实已经死掉了的%SAVESTR:COUNT%就站在面前。\n		PRINTFORML 哎呦我的妈！葱油炒蛋花！\n		PRINTFORML %SAVESTR:COUNT%好像什么事都没发生一样，循例进行上午的请安。\n		PRINTL  \n		WAIT \n		PRINTFORML %SAVESTR:COUNT%回归了……\n		DRAWLINE\n		WAIT\n		;一度に帰ってくるのは一人ずつ\n		D = 1\n		RETURN 1\n	ENDIF\nREND\n\nRETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '505-506',
        any: [/	SIF COUNT == 0\n		CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '509-510',
        any: [
          /		BASE:COUNT:0 = MAXBASE:COUNT:0 \/ 10\n		BASE:COUNT:1 = MAXBASE:COUNT:1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '511-512',
        any: [
          /		DRAWLINE\n		PRINTFORML 早上，%NAME:MASTER%睁开双眼，发现确实已经死掉了的%SAVESTR:COUNT%就站在面前。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '512',
        any: [
          /		PRINTFORML 早上，%NAME:MASTER%睁开双眼，发现确实已经死掉了的%SAVESTR:COUNT%就站在面前。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '513',
        any: [/		PRINTFORML 哎呦我的妈！葱油炒蛋花！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '514',
        any: [
          /		PRINTFORML %SAVESTR:COUNT%好像什么事都没发生一样，循例进行上午的请安。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '515',
        any: [/		PRINTL  /],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '516',
        any: [/		WAIT /],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '517',
        any: [/		PRINTFORML %SAVESTR:COUNT%回归了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '518-519',
        any: [/		DRAWLINE\n		WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '519',
        any: [/		WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '520',
        any: [/		;一度に帰ってくるのは一人ずつ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '521-522',
        any: [/		D = 1\n		RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '526-527',
        any: [/RETURN 0\n;-------------------------------------------------/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '533-698',
        any: [
          /@MORNING_FELLATIO\n;主人が男人でないとダメ\nSIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0\n\n;朝フェラ係が決まっている場合\nL = 0\n;REPEAT CHARANUM\n;	SIF CFLAG:COUNT:60 & 1\n;		L = COUNT\n;REND\n;IF L\n;	M = L\n;	;瀕死、あるいは死んでしまった\n;	SIF BASE:L:0 <= 500\n;		L = 0\n;	;育儿中\n;	SIF TALENT:L:154\n;		L = 0\n;	;臨月\n;	SIF CFLAG:L:110 - 2 <= DAY && TALENT:L:153\n;		L = 0\n;	;绝不侍奉\n;	SIF TALENT:L:151\n;		L = 0\n;	;反抗刻印\n;	SIF MARK:L:3 > 0\n;		L = 0\n;	;条件を満たさなくなった\n;	SIF ABL:L:11 < 4 \|\| ABL:L:16 < 4 \|\| ABL:L:32 < 1\n;		L = 0\n;	SIF L\n;		GOTO FELLATIO_START\n;	DRAWLINE\n;	PRINTFORMW 今天早上总觉的有点冷清……\n;	PRINTFORML 以往、每次早上都会前来问安的%SAVESTR:M%、\n;	PRINTFORMW 今日却没有看见他的身影\n;	M = 0\n;	RETURN 1\n;ENDIF\n\nF = 0\nREPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n		SIF A > 0\n			F \+= 1\n	ENDIF\nREND\n\nSIF F == 0\n	RETURN 0\n\nE = RAND:F\n\nREPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF  BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n\n		IF A > 0 && E == 0\n			L = COUNT\n			BREAK\n		ELSEIF A > 0\n			E -= 1\n		ENDIF\n\n	ENDIF\nREND\n\n;セルフフェラ発生を防止\nSIF L == 0\n	RETURN 0\n\n\$FELLATIO_START\nDRAWLINE\nPRINTFORMW 早上，在%SAVESTR:L%的口交中醒来。\nEXP:L:22 \+= A\nPRINTFORML %EXPNAME:22%＋\{A\}\nEXP:L:20 \+= A\/2\nPRINTFORML %EXPNAME:20%＋\{A\/2\}\nPRINTFORML %SAVESTR:L%带着淫媚的笑容，抬起沾满精液的脸，进行了上午的问候。\nPRINTFORML %PALAMNAME:4%点数＋\{A\*100\}\nPRINTFORML %PALAMNAME:6%点数＋\{A\*30\}\nPRINTFORMW %PALAMNAME:7%点数＋\{A\*40\}\nJUEL:L:4 \+= A\*100\nJUEL:L:6 \+= A\*30\nJUEL:L:7 \+= A\*40\n\n;朝フェラ口上\nTARGET = L\nTFLAG:13 = 3\nCALL SELF_KOJO\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '535',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '535-536',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '538-572',
        any: [
          /;朝フェラ係が決まっている場合\nL = 0\n;REPEAT CHARANUM\n;	SIF CFLAG:COUNT:60 & 1\n;		L = COUNT\n;REND\n;IF L\n;	M = L\n;	;瀕死、あるいは死んでしまった\n;	SIF BASE:L:0 <= 500\n;		L = 0\n;	;育儿中\n;	SIF TALENT:L:154\n;		L = 0\n;	;臨月\n;	SIF CFLAG:L:110 - 2 <= DAY && TALENT:L:153\n;		L = 0\n;	;绝不侍奉\n;	SIF TALENT:L:151\n;		L = 0\n;	;反抗刻印\n;	SIF MARK:L:3 > 0\n;		L = 0\n;	;条件を満たさなくなった\n;	SIF ABL:L:11 < 4 \|\| ABL:L:16 < 4 \|\| ABL:L:32 < 1\n;		L = 0\n;	SIF L\n;		GOTO FELLATIO_START\n;	DRAWLINE\n;	PRINTFORMW 今天早上总觉的有点冷清……\n;	PRINTFORML 以往、每次早上都会前来问安的%SAVESTR:M%、\n;	PRINTFORMW 今日却没有看见他的身影\n;	M = 0\n;	RETURN 1\n;ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575-616',
        any: [
          /REPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n		SIF A > 0\n			F \+= 1\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575-617',
        any: [
          /REPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n		SIF A > 0\n			F \+= 1\n	ENDIF\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575',
        any: [/REPEAT CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '577-579',
        any: [/		;死んでたり臨死中だとダメ\n		SIF BASE:COUNT:0 <= 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '580-582',
        any: [/		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '583-585',
        any: [
          /		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '586-588',
        any: [/		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '589-591',
        any: [
          /		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '592-594',
        any: [/		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '595-597',
        any: [/		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '598',
        any: [/		A = ABL:COUNT:32/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '599-601',
        any: [/		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '602-604',
        any: [/		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '605-607',
        any: [/		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '608-610',
        any: [/		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '611-613',
        any: [/		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '614-615',
        any: [/		SIF A > 0\n			F \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '619-620',
        any: [/SIF F == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '622',
        any: [/E = RAND:F/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '624-671',
        any: [
          /REPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF  BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n\n		IF A > 0 && E == 0\n			L = COUNT\n			BREAK\n		ELSEIF A > 0\n			E -= 1\n		ENDIF\n\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '624-672',
        any: [
          /REPEAT CHARANUM\n	IF ABL:COUNT:11 >= 4 && ABL:COUNT:16 >= 4 && ABL:COUNT:32 >= 1\n		;死んでたり臨死中だとダメ\n		SIF  BASE:COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:COUNT:3 > 0\n			CONTINUE\n		A = ABL:COUNT:32\n		;不怕污臭\n		SIF TALENT:COUNT:61\n			A \+= 1\n		;反感污臭\n		SIF TALENT:COUNT:62\n			A -= 1\n		;献身的\n		SIF TALENT:COUNT:63\n			A \+= 1\n		;淫乱\n		SIF TALENT:COUNT:76\n			A \+= 1\n		;爱慕\n		SIF TALENT:COUNT:85\n			A \+= 1\n\n		IF A > 0 && E == 0\n			L = COUNT\n			BREAK\n		ELSEIF A > 0\n			E -= 1\n		ENDIF\n\n	ENDIF\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '664-666',
        any: [/		IF A > 0 && E == 0\n			L = COUNT\n			BREAK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '667-669',
        any: [/		ELSEIF A > 0\n			E -= 1\n		ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '675-676',
        any: [/SIF L == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '679-680',
        any: [/DRAWLINE\nPRINTFORMW 早上，在%SAVESTR:L%的口交中醒来。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '680',
        any: [/PRINTFORMW 早上，在%SAVESTR:L%的口交中醒来。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '681',
        any: [/EXP:L:22 \+= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '682',
        any: [/PRINTFORML %EXPNAME:22%＋\{A\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '683',
        any: [/EXP:L:20 \+= A\/2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '684',
        any: [/PRINTFORML %EXPNAME:20%＋\{A\/2\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '685',
        any: [
          /PRINTFORML %SAVESTR:L%带着淫媚的笑容，抬起沾满精液的脸，进行了上午的问候。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '686',
        any: [/PRINTFORML %PALAMNAME:4%点数＋\{A\*100\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '687',
        any: [/PRINTFORML %PALAMNAME:6%点数＋\{A\*30\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '688',
        any: [/PRINTFORMW %PALAMNAME:7%点数＋\{A\*40\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '689',
        any: [/JUEL:L:4 \+= A\*100/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '690',
        any: [/JUEL:L:6 \+= A\*30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '691',
        any: [/JUEL:L:7 \+= A\*40/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '694',
        any: [/TARGET = L/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '695-696',
        any: [/TFLAG:13 = 3\nCALL SELF_KOJO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '698-699',
        any: [/RETURN 1\n;-------------------------------------------------/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '703-806',
        any: [
          /@ONESHO\nREPEAT CHARANUM\n	IF TALENT:COUNT:57 ==1 && RAND:12 <= EXP:COUNT:31\/10 \+ TALENT:COUNT:132\*2\n		;死んでたらダメ\n		SIF  BASE:COUNT:0 <= 0\n			CONTINUE\n		DRAWLINE\n		\n		;		※カテーテル等装備判定\n		IF CFLAG:COUNT:42 == 99 \|\| CFLAG:COUNT:42 == 98\n			IF \(CFLAG:COUNT:40 & 64\) && FLAG:37\n;			※この上の二つのIF文でカテーテルありの装備判定。システム上における変数読み込みかなにかで個数関係で一つに繋げられず、エラーが出る？\n				IF CFLAG:COUNT:1 < 2\n;				※キャラの状態判定。魔王部屋、または待機中の場合\n					IF ABL:COUNT:10 < 3\n;					※従順度判定\(3未満、6未満、それ以外で判定\)\n						PRINTFORML 装上了尿道导管，一晚上，毫无察觉的漏尿了的%SAVESTR:COUNT%，\n						PRINTFORML 不可思议的并不会十分肮脏，但实在羞愧难当，穿好衣服后对%CALLNAME:MASTER%愤怒的瞪了一眼。\n;						※恥辱または苦痛点数を10、20で増加。\n						SELECTCASE RAND:4\n							CASE 0\n								PRINTFORML %PALAMNAME:8%点数＋10\n								JUEL:L:8 \+= 10\n							CASE 1\n								PRINTFORML %PALAMNAME:8%点数＋20\n								JUEL:L:8 \+= 20\n							CASE 2\n								PRINTFORML %PALAMNAME:9%点数＋10\n								JUEL:L:9 \+= 10\n							CASE 3\n								PRINTFORML %PALAMNAME:9%点数＋20\n								JUEL:L:9 \+= 20\n						ENDSELECT\n					ELSEIF ABL:COUNT:10 < 6\n						PRINTFORML 装上了尿道导管，一不小心的漏尿了，并察觉到了的%SAVESTR:COUNT%，\n						PRINTFORML 发现并没弄脏什么东西，于是便不在意了。\n					ELSE\n						PRINTFORML %SAVESTR:COUNT%因为装上了尿道导管，一晚上都睡得非常好，\n						PRINTFORML 虽然有漏尿过的感觉，蛋多亏了把导管前端放进了房间里没有什么用的容器中\n						PRINTFORML 早上起床时一点脏污都没有。\n;						※恭順点数などを10くらいの単位で増やす。\n;						※中毒しやすい、倒錯的、マゾ、露出狂、のいずれかを所持している場合はイベント追加。\n						IF TALENT:COUNT:72 == 1 \|\| TALENT:COUNT:80 == 1 \|\| TALENT:COUNT:88 == 1 \|\| TALENT:COUNT:89 == 1\n							IF TALENT:COUNT:60 == 1\n;							※自慰しやすい\(TALENT:COUNT:60 == 1\)、の場合更にイベント追加。自慰回数と欲情、恥辱点数を増加。\n								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%坦白了尿床的事，\n								PRINTFORML 以及那之后，因为导管特有的瘙痒感，用导管自慰了的事。\n								PRINTFORML %EXPNAME:10%＋1\n								PRINTFORMW %PALAMNAME:5%点数＋800\n								PRINTFORMW %PALAMNAME:8%点数＋800\n								EXP:COUNT:10 \+= 1\n								JUEL:COUNT:5 \+= 800\n								JUEL:COUNT:8 \+= 800\n							ELSE\n								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%报告了尿床了的事，脸上染上了羞愧的深色。\n								PRINTFORMW %PALAMNAME:8%点数＋300\n								JUEL:COUNT:8 \+= 300\n							ENDIF\n						ENDIF\n						SELECTCASE RAND:3\n							CASE 0\n								PRINTFORML %PALAMNAME:4%点数＋10\n								JUEL:L:4 \+= 10\n							CASE 1\n								PRINTFORML %PALAMNAME:4%点数＋20\n								JUEL:L:4 \+= 20\n							CASE 2\n								PRINTFORML %PALAMNAME:4%点数＋30\n								JUEL:L:4 \+= 30\n						ENDSELECT\n					ENDIF\n\n				ENDIF\n			ENDIF\n;			※カテーテル装備の判定式2段目の終わり。次のELSE以降がカテーテル等装備無しの判定。\n;		※↓は元々あった記述、カテーテル等装備してない状態\n\n		ELSE\n		PRINTFORML %SAVESTR:COUNT%尿床了……\n		EXP:COUNT:31 \+= 1\n		PRINTFORML %EXPNAME:31%＋1\n		;着衣設定なら衣類が汚れる\n		TARGET = COUNT\n		CALL SOILING_CLOTH_NO1\n		CALL AFTERTRAIN_CLOTH\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;露出\+抖M气质が8以上ならみんなに報告\n		IF ABL:COUNT:17\+ABL:COUNT:21 >= 8\n			PRINTFORM 关于自己尿床的事%SAVESTR:COUNT%\n				IF CHARANUM >= 3\n					PRINTL 在早餐桌上向大家坦白了。\n				ELSE\n					PRINTL 来向你报告了。\n				ENDIF\n			PRINTFORMW %PALAMNAME:8%点数＋1000\n			JUEL:COUNT:8 \+= 1000\n		 ENDIF\n	  ENDIF\n	ENDIF\nREND\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '705',
        any: [
          /	IF TALENT:COUNT:57 ==1 && RAND:12 <= EXP:COUNT:31\/10 \+ TALENT:COUNT:132\*2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '707-708',
        any: [/		SIF  BASE:COUNT:0 <= 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '708-709',
        any: [/			CONTINUE\n		DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '712-715',
        any: [
          /		IF CFLAG:COUNT:42 == 99 \|\| CFLAG:COUNT:42 == 98\n			IF \(CFLAG:COUNT:40 & 64\) && FLAG:37\n;			※この上の二つのIF文でカテーテルありの装備判定。システム上における変数読み込みかなにかで個数関係で一つに繋げられず、エラーが出る？\n				IF CFLAG:COUNT:1 < 2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '719-735',
        any: [
          /						PRINTFORML 装上了尿道导管，一晚上，毫无察觉的漏尿了的%SAVESTR:COUNT%，\n						PRINTFORML 不可思议的并不会十分肮脏，但实在羞愧难当，穿好衣服后对%CALLNAME:MASTER%愤怒的瞪了一眼。\n;						※恥辱または苦痛点数を10、20で増加。\n						SELECTCASE RAND:4\n							CASE 0\n								PRINTFORML %PALAMNAME:8%点数＋10\n								JUEL:L:8 \+= 10\n							CASE 1\n								PRINTFORML %PALAMNAME:8%点数＋20\n								JUEL:L:8 \+= 20\n							CASE 2\n								PRINTFORML %PALAMNAME:9%点数＋10\n								JUEL:L:9 \+= 10\n							CASE 3\n								PRINTFORML %PALAMNAME:9%点数＋20\n								JUEL:L:9 \+= 20\n						ENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '723-725',
        any: [/							CASE 0\n								PRINTFORML %PALAMNAME:8%点数＋10\n								JUEL:L:8 \+= 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '726-728',
        any: [/							CASE 1\n								PRINTFORML %PALAMNAME:8%点数＋20\n								JUEL:L:8 \+= 20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '729-731',
        any: [/							CASE 2\n								PRINTFORML %PALAMNAME:9%点数＋10\n								JUEL:L:9 \+= 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '732-734',
        any: [/							CASE 3\n								PRINTFORML %PALAMNAME:9%点数＋20\n								JUEL:L:9 \+= 20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '736-738',
        any: [
          /					ELSEIF ABL:COUNT:10 < 6\n						PRINTFORML 装上了尿道导管，一不小心的漏尿了，并察觉到了的%SAVESTR:COUNT%，\n						PRINTFORML 发现并没弄脏什么东西，于是便不在意了。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '739-773',
        any: [
          /					ELSE\n						PRINTFORML %SAVESTR:COUNT%因为装上了尿道导管，一晚上都睡得非常好，\n						PRINTFORML 虽然有漏尿过的感觉，蛋多亏了把导管前端放进了房间里没有什么用的容器中\n						PRINTFORML 早上起床时一点脏污都没有。\n;						※恭順点数などを10くらいの単位で増やす。\n;						※中毒しやすい、倒錯的、マゾ、露出狂、のいずれかを所持している場合はイベント追加。\n						IF TALENT:COUNT:72 == 1 \|\| TALENT:COUNT:80 == 1 \|\| TALENT:COUNT:88 == 1 \|\| TALENT:COUNT:89 == 1\n							IF TALENT:COUNT:60 == 1\n;							※自慰しやすい\(TALENT:COUNT:60 == 1\)、の場合更にイベント追加。自慰回数と欲情、恥辱点数を増加。\n								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%坦白了尿床的事，\n								PRINTFORML 以及那之后，因为导管特有的瘙痒感，用导管自慰了的事。\n								PRINTFORML %EXPNAME:10%＋1\n								PRINTFORMW %PALAMNAME:5%点数＋800\n								PRINTFORMW %PALAMNAME:8%点数＋800\n								EXP:COUNT:10 \+= 1\n								JUEL:COUNT:5 \+= 800\n								JUEL:COUNT:8 \+= 800\n							ELSE\n								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%报告了尿床了的事，脸上染上了羞愧的深色。\n								PRINTFORMW %PALAMNAME:8%点数＋300\n								JUEL:COUNT:8 \+= 300\n							ENDIF\n						ENDIF\n						SELECTCASE RAND:3\n							CASE 0\n								PRINTFORML %PALAMNAME:4%点数＋10\n								JUEL:L:4 \+= 10\n							CASE 1\n								PRINTFORML %PALAMNAME:4%点数＋20\n								JUEL:L:4 \+= 20\n							CASE 2\n								PRINTFORML %PALAMNAME:4%点数＋30\n								JUEL:L:4 \+= 30\n						ENDSELECT\n					ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '748-755',
        any: [
          /								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%坦白了尿床的事，\n								PRINTFORML 以及那之后，因为导管特有的瘙痒感，用导管自慰了的事。\n								PRINTFORML %EXPNAME:10%＋1\n								PRINTFORMW %PALAMNAME:5%点数＋800\n								PRINTFORMW %PALAMNAME:8%点数＋800\n								EXP:COUNT:10 \+= 1\n								JUEL:COUNT:5 \+= 800\n								JUEL:COUNT:8 \+= 800/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '753',
        any: [/								EXP:COUNT:10 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '754',
        any: [/								JUEL:COUNT:5 \+= 800/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '755',
        any: [/								JUEL:COUNT:8 \+= 800/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '756-759',
        any: [
          /							ELSE\n								PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%报告了尿床了的事，脸上染上了羞愧的深色。\n								PRINTFORMW %PALAMNAME:8%点数＋300\n								JUEL:COUNT:8 \+= 300/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '759',
        any: [/								JUEL:COUNT:8 \+= 300/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '763-765',
        any: [/							CASE 0\n								PRINTFORML %PALAMNAME:4%点数＋10\n								JUEL:L:4 \+= 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '766-768',
        any: [/							CASE 1\n								PRINTFORML %PALAMNAME:4%点数＋20\n								JUEL:L:4 \+= 20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '769-771',
        any: [/							CASE 2\n								PRINTFORML %PALAMNAME:4%点数＋30\n								JUEL:L:4 \+= 30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '778',
        any: [/;		※↓は元々あった記述、カテーテル等装備してない状態/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '780-803',
        any: [
          /		ELSE\n		PRINTFORML %SAVESTR:COUNT%尿床了……\n		EXP:COUNT:31 \+= 1\n		PRINTFORML %EXPNAME:31%＋1\n		;着衣設定なら衣類が汚れる\n		TARGET = COUNT\n		CALL SOILING_CLOTH_NO1\n		CALL AFTERTRAIN_CLOTH\n		;魔王部屋にいないとダメ\n		SIF CFLAG:COUNT:1 != 0\n			CONTINUE\n		;露出\+抖M气质が8以上ならみんなに報告\n		IF ABL:COUNT:17\+ABL:COUNT:21 >= 8\n			PRINTFORM 关于自己尿床的事%SAVESTR:COUNT%\n				IF CHARANUM >= 3\n					PRINTL 在早餐桌上向大家坦白了。\n				ELSE\n					PRINTL 来向你报告了。\n				ENDIF\n			PRINTFORMW %PALAMNAME:8%点数＋1000\n			JUEL:COUNT:8 \+= 1000\n		 ENDIF\n	  ENDIF\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '781',
        any: [/		PRINTFORML %SAVESTR:COUNT%尿床了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '782',
        any: [/		EXP:COUNT:31 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '783',
        any: [/		PRINTFORML %EXPNAME:31%＋1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '785',
        any: [/		TARGET = COUNT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '786-787',
        any: [/		CALL SOILING_CLOTH_NO1\n		CALL AFTERTRAIN_CLOTH/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '789-790',
        any: [/		SIF CFLAG:COUNT:1 != 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '792',
        any: [/		IF ABL:COUNT:17\+ABL:COUNT:21 >= 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '793',
        any: [/			PRINTFORM 关于自己尿床的事%SAVESTR:COUNT%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '795',
        any: [/					PRINTL 在早餐桌上向大家坦白了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '797',
        any: [/					PRINTL 来向你报告了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '799',
        any: [/			PRINTFORMW %PALAMNAME:8%点数＋1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '800',
        any: [/			JUEL:COUNT:8 \+= 1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '804-806',
        any: [/REND\n\nRETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '813-1088',
        any: [
          /@OFFERVIRGIN_CHECK\n\n;処女献上が禁止されてたらスキップ\nSIF FLAG:38 <= -1\n	RETURN 0\n;調教対象が空だとダメ\nSIF TARGET < 0\n	RETURN 0\n;绝不侍奉が付いてるとダメ\nSIF TALENT:151\n	RETURN 0\n;未熟だとダメ\nSIF TALENT:135\n	RETURN 0\n;非处女や男人だと発動しない\nSIF TALENT:0 == 0 \|\| TALENT:122\n	RETURN 0\n;主人が男人かフタナリじゃないとダメ\nSIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0\n;爱か淫乱で、かつ爱情经验200以上でないとダメ\n;SIF \(TALENT:85 == 0 && TALENT:76 == 0\) \|\| EXP:23 < 200\nSIF TALENT:85 == 0 && TALENT:76 == 0\n	RETURN 0\n;顺从\+欲望\+侍奉精神が10以下だとダメ\nSIF ABL:10\+ABL:11\+ABL:16 <= 10\n	RETURN 0\n;瀕死だとダメ\nSIF BASE:0 < 500\n	RETURN 0\n;处女膜再生済だとダメ\nSIF CFLAG:71 > 0\n	RETURN 0\n;貞操帯着用時、鍵を捨てていてなおかつ奴隷がその鍵を発見済でないとダメ\nSIF CFLAG:42 == 79 && \(CFLAG:49 == 0 \|\| CFLAG:50 == 0\)\n	RETURN 0\n;上の式で一纏めにしたので揃ってコメントアウト\n;;貞操帯の鍵を捨ててないとダメ\n;SIF CFLAG:49 == 0\n;	RETURN 0\n;;貞操帯の鍵を見つけてないとダメ\n;SIF CFLAG:50 == 0\n;	RETURN 0\n;魔王部屋にいないとダメ\nSIF !\(CFLAG:1 == 0 \|\| CFLAG:1 == 1\)\n	RETURN 0\n;前回の調教対象と同じじゃないとダメ\n;SIF FLAG:1 != TARGET\n;	RETURN 0\n;もうダメだぞ\nSIF FLAG:38 == 0 && CFLAG:62\n	RETURN 0\n\n\n;判定変数\nS = \(RAND:3 \* -1\)\n\n;爱の場合は顺从依存\nIF TALENT:85\n	IF ABL:10 == 4\n		S \+= 1\n	ELSEIF ABL:10 == 5\n		S \+= 2\n	ELSEIF ABL:10 >= 6\n		S \+= 3\n	ENDIF\nENDIF\n\n;淫乱の場合は欲望依存\nIF TALENT:76\n	IF ABL:11 == 4\n		S \+= 1\n	ELSEIF ABL:11 == 5\n		S \+= 2\n	ELSEIF ABL:11 >= 6\n		S \+= 3\n	ENDIF\nENDIF\n	\n;PALAM:欲情がLV4以上\n;欲望ＬＶ５以上侍奉精神５以上で\+1（下と合わせて\+2）\nSIF ABL:11 >= 5 && ABL:16 >= 5 && PALAM:5 >= PALAMLV:4\n	S \+= 1\n;欲望ＬＶ４以上侍奉精神４以上で\+1\nSIF ABL:11 >= 4 && ABL:16 >= 4 && PALAM:5 >= PALAMLV:4\n	S \+= 1\n\n;接受快感、否定快感\nIF TALENT:70\n	S \+= 1\nELSEIF TALENT:71\n	S -= 2\nENDIF\n\n;看重贞操、看轻贞操\nIF TALENT:30\n	S -= 2\nELSEIF TALENT:31\n	S \+= 1\nENDIF\n\n;好奇心\nSIF TALENT:27\n	S \+= 1\n\n;戒备森严\nSIF TALENT:27\n	S -= 2\n\n;判定変数が0以下だったら終了\nSIF S <= 0\n	RETURN 0\n\n;安全套使用フラグ\nTEQUIP:35 = 0\nprintw ＜奉献处女＞\n\nPRINTFORML 一天又过去了，%CALLNAME:MASTER%正准备上床睡觉，\nPRINTFORMW %SAVESTR:TARGET%带着害羞但又坚毅的神情，造访了你的房间。\nPRINTFORMW 双腿摩擦着，手足无措，面红耳赤，看来是想把自己的处女奉献给%CALLNAME:MASTER%……\nIF CFLAG:49\n	PRINTFORML 那只手，曾经那么的抗拒%CALLNAME:MASTER%，\n	PRINTFORMW 而现在，正紧紧地握着自己贞操带的钥匙。\n	PRINTFORMW 看来是为了今晚，拼命地找回来了。\nENDIF\nIF TALENT:273\n	PRINTFORML 封印的力量，现在在本人欲望的冲击下摇摇欲坠。\n	PRINTFORMW 在她本人的帮助下，想要现在突破封印，应该变得容易了吧。\nENDIF\n\$INPUT_LOOP_01\nPRINTFORML 要夺取%SAVESTR:TARGET%的处女吗？\nPRINTL  \[0\] - 等你很久了！\nPRINTL  \[1\] - 继续等着吧你……\nINPUT\nIF RESULT == 1\n	PRINTFORMW %SAVESTR:TARGET%失望而归，作为女孩子的自尊，遭到了毁灭性打击。\n	ABL:10 -= 2\n	SIF ABL:10 < 0\n		ABL:10 = 0\n	PRINTFORMW %ABLNAME:10%降低为\{ABL:10\}。\n	IF CFLAG:49\n		PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。\n		CFLAG:49 = 0\n		;CFLAG:50も0にしないと再度捨てた時に鍵が直に奴隷の手元へ飛んでしまう\n		CFLAG:50 = 0\n	ENDIF\n	;発生が一人一度のみの場合、ここで発生済フラグを立てる\n	SIF FLAG:38 == 0\n		CFLAG:62 = 1\n	RETURN 0\nELSEIF RESULT != 0\n	GOTO INPUT_LOOP_01\nENDIF\nIF ITEM:24\n	\$INPUT_LOOP_02\n	PRINTFORML 要使用安全套吗？\n	PRINTL  \[0\] - 安全第一！\n	PRINTL  \[1\] - 中出最高！\n	INPUT\n	IF RESULT == 0\n		TEQUIP:35 = 1\n		ITEM:24 -= 1\n	ELSEIF RESULT != 1\n		GOTO INPUT_LOOP_02\n	ENDIF\nENDIF\n\nPRINTFORML %SAVESTR:TARGET%将处女奉献给了%CALLNAME:MASTER%……\nPRINTW 【处女丧失】\nTALENT:0 = 0\n\n;封印も解かれる\nIF TALENT:273\n	PRINTFORMW 守护贞操的封印破碎了……\n	TALENT:273 = 0\nENDIF\n\n;経験・珠の獲得\nPRINTFORML %EXPNAME:0%＋2\nPRINTFORML %EXPNAME:5%＋1\nPRINTFORMW %EXPNAME:20%＋1\nPRINTFORML %PALAMNAME:1%点数＋\{S\*400\}\nPRINTFORML %PALAMNAME:4%点数＋\{S\*1000\}\nPRINTFORML %PALAMNAME:5%点数＋\{S\*500\}\nPRINTFORML %PALAMNAME:6%点数＋\{S\*1000\}\nPRINTFORMW %PALAMNAME:9%点数＋\{S\*1000\}\nEXP:0 \+= 2\nEXP:5 \+= 1\nEXP:20 \+= 1\nJUEL:1 \+= S\*400\nJUEL:4 \+= S\*1000\nJUEL:5 \+= S\*500\nJUEL:6 \+= S\*1000\nJUEL:9 \+= S\*1000\n\n;安全套を使ってない場合は膣内射精チェック\n;通常のセックスより妊娠リスクがかなり高い（理由：その方が面白いから）\nIF TEQUIP:35 == 0\n	CFLAG:101 = 30\n	CALL IN_VAGINA_M_TO_T\n	CALL CONCEPTION_CHECK_M_TO_T\nENDIF\nTEQUIP:35 = 0\n\n;親族関係の判定\nPLAYER = MASTER\nTFLAG:14 = 0\nCALL INCEST\n;初体験の相手を記録\nIF CFLAG:15 == 0\n	;初体験の相手を記録（初期値が0のため、\+1して記録）\n	CFLAG:15 = NO:PLAYER \+ 1\n	CSTR:3 = %SAVESTR:PLAYER%\n	;初体験が近親相姦\n	;初体験の相手が自分の息子・娘という状況は生物学的にありえないので省く\n	IF TFLAG:14 == 1 && TALENT:PLAYER:122\n		CFLAG:15 = 300\n	ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 301\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122\n		CFLAG:15 = 304\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 305\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122\n		CFLAG:15 = 306\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 307\n	ELSEIF TFLAG:14 == 5 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 308\n	ELSEIF TFLAG:14 == 6 && TALENT:PLAYER:122\n		CFLAG:15 = 309\n	ENDIF\nENDIF\n\n;マスターが童贞なら童贞喪失\nIF TALENT:MASTER:1\n	TALENT:MASTER:1 = 0\n	IF CFLAG:MASTER:15 == 0\n		CFLAG:MASTER:15 = NO:TARGET \+ 1\n		CSTR:MASTER:3 = %SAVESTR:TARGET%\n		;初体験が近親相姦\n		;初体験の相手が自分の息子・娘という状況は生物学的にありえないので省く\n		IF TFLAG:14 == 2 && TALENT:122\n			CFLAG:MASTER:15 = 300\n		ELSEIF TFLAG:14 == 2 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 301\n		ELSEIF TFLAG:14 == 3 && TALENT:122\n			CFLAG:MASTER:15 = 306\n		ELSEIF TFLAG:14 == 3 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 307\n		ELSEIF TFLAG:14 == 4 && TALENT:122\n			CFLAG:MASTER:15 = 304\n		ELSEIF TFLAG:14 == 4 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 305\n		ELSEIF TFLAG:14 == 5 && TALENT:122\n			CFLAG:MASTER:15 = 309\n		ELSEIF TFLAG:14 == 6 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 308\n		ENDIF\n	ENDIF\nENDIF\nTFLAG:14 = 0\n\nIF CFLAG:49\n	PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。\n	CFLAG:49 = 0\n	CFLAG:40 -= 64\n	;断った時と同様の理由でCFLAG:50と、このままだと外れたはずの貞操帯が衣装変更時にまた付いてしまうので\n	;CFLAG:42（特別コスチューム）も元に戻す\n	CFLAG:50 = 0\n	CFLAG:42 = 0\nENDIF\n\nDRAWLINE\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '815-864',
        any: [
          /;処女献上が禁止されてたらスキップ\nSIF FLAG:38 <= -1\n	RETURN 0\n;調教対象が空だとダメ\nSIF TARGET < 0\n	RETURN 0\n;绝不侍奉が付いてるとダメ\nSIF TALENT:151\n	RETURN 0\n;未熟だとダメ\nSIF TALENT:135\n	RETURN 0\n;非处女や男人だと発動しない\nSIF TALENT:0 == 0 \|\| TALENT:122\n	RETURN 0\n;主人が男人かフタナリじゃないとダメ\nSIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0\n;爱か淫乱で、かつ爱情经验200以上でないとダメ\n;SIF \(TALENT:85 == 0 && TALENT:76 == 0\) \|\| EXP:23 < 200\nSIF TALENT:85 == 0 && TALENT:76 == 0\n	RETURN 0\n;顺从\+欲望\+侍奉精神が10以下だとダメ\nSIF ABL:10\+ABL:11\+ABL:16 <= 10\n	RETURN 0\n;瀕死だとダメ\nSIF BASE:0 < 500\n	RETURN 0\n;处女膜再生済だとダメ\nSIF CFLAG:71 > 0\n	RETURN 0\n;貞操帯着用時、鍵を捨てていてなおかつ奴隷がその鍵を発見済でないとダメ\nSIF CFLAG:42 == 79 && \(CFLAG:49 == 0 \|\| CFLAG:50 == 0\)\n	RETURN 0\n;上の式で一纏めにしたので揃ってコメントアウト\n;;貞操帯の鍵を捨ててないとダメ\n;SIF CFLAG:49 == 0\n;	RETURN 0\n;;貞操帯の鍵を見つけてないとダメ\n;SIF CFLAG:50 == 0\n;	RETURN 0\n;魔王部屋にいないとダメ\nSIF !\(CFLAG:1 == 0 \|\| CFLAG:1 == 1\)\n	RETURN 0\n;前回の調教対象と同じじゃないとダメ\n;SIF FLAG:1 != TARGET\n;	RETURN 0\n;もうダメだぞ\nSIF FLAG:38 == 0 && CFLAG:62\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '816-817',
        any: [/SIF FLAG:38 <= -1\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '819-820',
        any: [/SIF TARGET < 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '822-823',
        any: [/SIF TALENT:151\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '825-826',
        any: [/SIF TALENT:135\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '828-829',
        any: [/SIF TALENT:0 == 0 \|\| TALENT:122\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '831-832',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '835-836',
        any: [/SIF TALENT:85 == 0 && TALENT:76 == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '838-839',
        any: [/SIF ABL:10\+ABL:11\+ABL:16 <= 10\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '841-842',
        any: [/SIF BASE:0 < 500\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '844-845',
        any: [/SIF CFLAG:71 > 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '847-848',
        any: [
          /SIF CFLAG:42 == 79 && \(CFLAG:49 == 0 \|\| CFLAG:50 == 0\)\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '857-858',
        any: [/SIF !\(CFLAG:1 == 0 \|\| CFLAG:1 == 1\)\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '863-864',
        any: [/SIF FLAG:38 == 0 && CFLAG:62\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '868-924',
        any: [
          /S = \(RAND:3 \* -1\)\n\n;爱の場合は顺从依存\nIF TALENT:85\n	IF ABL:10 == 4\n		S \+= 1\n	ELSEIF ABL:10 == 5\n		S \+= 2\n	ELSEIF ABL:10 >= 6\n		S \+= 3\n	ENDIF\nENDIF\n\n;淫乱の場合は欲望依存\nIF TALENT:76\n	IF ABL:11 == 4\n		S \+= 1\n	ELSEIF ABL:11 == 5\n		S \+= 2\n	ELSEIF ABL:11 >= 6\n		S \+= 3\n	ENDIF\nENDIF\n	\n;PALAM:欲情がLV4以上\n;欲望ＬＶ５以上侍奉精神５以上で\+1（下と合わせて\+2）\nSIF ABL:11 >= 5 && ABL:16 >= 5 && PALAM:5 >= PALAMLV:4\n	S \+= 1\n;欲望ＬＶ４以上侍奉精神４以上で\+1\nSIF ABL:11 >= 4 && ABL:16 >= 4 && PALAM:5 >= PALAMLV:4\n	S \+= 1\n\n;接受快感、否定快感\nIF TALENT:70\n	S \+= 1\nELSEIF TALENT:71\n	S -= 2\nENDIF\n\n;看重贞操、看轻贞操\nIF TALENT:30\n	S -= 2\nELSEIF TALENT:31\n	S \+= 1\nENDIF\n\n;好奇心\nSIF TALENT:27\n	S \+= 1\n\n;戒备森严\nSIF TALENT:27\n	S -= 2\n\n;判定変数が0以下だったら終了\nSIF S <= 0\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '868',
        any: [/S = \(RAND:3 \* -1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '871-879',
        any: [
          /IF TALENT:85\n	IF ABL:10 == 4\n		S \+= 1\n	ELSEIF ABL:10 == 5\n		S \+= 2\n	ELSEIF ABL:10 >= 6\n		S \+= 3\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '882-890',
        any: [
          /IF TALENT:76\n	IF ABL:11 == 4\n		S \+= 1\n	ELSEIF ABL:11 == 5\n		S \+= 2\n	ELSEIF ABL:11 >= 6\n		S \+= 3\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '894-898',
        any: [
          /SIF ABL:11 >= 5 && ABL:16 >= 5 && PALAM:5 >= PALAMLV:4\n	S \+= 1\n;欲望ＬＶ４以上侍奉精神４以上で\+1\nSIF ABL:11 >= 4 && ABL:16 >= 4 && PALAM:5 >= PALAMLV:4\n	S \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '901-902',
        any: [/IF TALENT:70\n	S \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '903-904',
        any: [/ELSEIF TALENT:71\n	S -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '908-909',
        any: [/IF TALENT:30\n	S -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '910-911',
        any: [/ELSEIF TALENT:31\n	S \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '915-916',
        any: [/SIF TALENT:27\n	S \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '919-920',
        any: [/SIF TALENT:27\n	S -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '923-924',
        any: [/SIF S <= 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '927',
        any: [/TEQUIP:35 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '928',
        any: [/printw ＜奉献处女＞/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '930-931',
        any: [
          /PRINTFORML 一天又过去了，%CALLNAME:MASTER%正准备上床睡觉，\nPRINTFORMW %SAVESTR:TARGET%带着害羞但又坚毅的神情，造访了你的房间。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '931',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着害羞但又坚毅的神情，造访了你的房间。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '932',
        any: [
          /PRINTFORMW 双腿摩擦着，手足无措，面红耳赤，看来是想把自己的处女奉献给%CALLNAME:MASTER%……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '933-937',
        any: [
          /IF CFLAG:49\n	PRINTFORML 那只手，曾经那么的抗拒%CALLNAME:MASTER%，\n	PRINTFORMW 而现在，正紧紧地握着自己贞操带的钥匙。\n	PRINTFORMW 看来是为了今晚，拼命地找回来了。\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '938-941',
        any: [
          /IF TALENT:273\n	PRINTFORML 封印的力量，现在在本人欲望的冲击下摇摇欲坠。\n	PRINTFORMW 在她本人的帮助下，想要现在突破封印，应该变得容易了吧。\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '943',
        any: [/PRINTFORML 要夺取%SAVESTR:TARGET%的处女吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '944',
        any: [/PRINTL  \[0\] - 等你很久了！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '945',
        any: [/PRINTL  \[1\] - 继续等着吧你……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '946',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '948-962',
        any: [
          /	PRINTFORMW %SAVESTR:TARGET%失望而归，作为女孩子的自尊，遭到了毁灭性打击。\n	ABL:10 -= 2\n	SIF ABL:10 < 0\n		ABL:10 = 0\n	PRINTFORMW %ABLNAME:10%降低为\{ABL:10\}。\n	IF CFLAG:49\n		PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。\n		CFLAG:49 = 0\n		;CFLAG:50も0にしないと再度捨てた時に鍵が直に奴隷の手元へ飛んでしまう\n		CFLAG:50 = 0\n	ENDIF\n	;発生が一人一度のみの場合、ここで発生済フラグを立てる\n	SIF FLAG:38 == 0\n		CFLAG:62 = 1\n	RETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '949',
        any: [/	ABL:10 -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '951',
        any: [/		ABL:10 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '952',
        any: [/	PRINTFORMW %ABLNAME:10%降低为\{ABL:10\}。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '953-958',
        any: [
          /	IF CFLAG:49\n		PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。\n		CFLAG:49 = 0\n		;CFLAG:50も0にしないと再度捨てた時に鍵が直に奴隷の手元へ飛んでしまう\n		CFLAG:50 = 0\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '955',
        any: [/		CFLAG:49 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '957',
        any: [/		CFLAG:50 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '961',
        any: [/		CFLAG:62 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '962-963',
        any: [/	RETURN 0\nELSEIF RESULT != 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '963-964',
        any: [/ELSEIF RESULT != 0\n	GOTO INPUT_LOOP_01/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '966-978',
        any: [
          /IF ITEM:24\n	\$INPUT_LOOP_02\n	PRINTFORML 要使用安全套吗？\n	PRINTL  \[0\] - 安全第一！\n	PRINTL  \[1\] - 中出最高！\n	INPUT\n	IF RESULT == 0\n		TEQUIP:35 = 1\n		ITEM:24 -= 1\n	ELSEIF RESULT != 1\n		GOTO INPUT_LOOP_02\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '968',
        any: [/	PRINTFORML 要使用安全套吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '969',
        any: [/	PRINTL  \[0\] - 安全第一！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '970',
        any: [/	PRINTL  \[1\] - 中出最高！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '971',
        any: [/	INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '973',
        any: [/		TEQUIP:35 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '974',
        any: [/		ITEM:24 -= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '975-976',
        any: [/	ELSEIF RESULT != 1\n		GOTO INPUT_LOOP_02/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '980',
        any: [/PRINTFORML %SAVESTR:TARGET%将处女奉献给了%CALLNAME:MASTER%……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '981',
        any: [/PRINTW 【处女丧失】/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '982',
        any: [/TALENT:0 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '985-988',
        any: [
          /IF TALENT:273\n	PRINTFORMW 守护贞操的封印破碎了……\n	TALENT:273 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '991-1006',
        any: [
          /PRINTFORML %EXPNAME:0%＋2\nPRINTFORML %EXPNAME:5%＋1\nPRINTFORMW %EXPNAME:20%＋1\nPRINTFORML %PALAMNAME:1%点数＋\{S\*400\}\nPRINTFORML %PALAMNAME:4%点数＋\{S\*1000\}\nPRINTFORML %PALAMNAME:5%点数＋\{S\*500\}\nPRINTFORML %PALAMNAME:6%点数＋\{S\*1000\}\nPRINTFORMW %PALAMNAME:9%点数＋\{S\*1000\}\nEXP:0 \+= 2\nEXP:5 \+= 1\nEXP:20 \+= 1\nJUEL:1 \+= S\*400\nJUEL:4 \+= S\*1000\nJUEL:5 \+= S\*500\nJUEL:6 \+= S\*1000\nJUEL:9 \+= S\*1000/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '999',
        any: [/EXP:0 \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1000',
        any: [/EXP:5 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1001',
        any: [/EXP:20 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1002',
        any: [/JUEL:1 \+= S\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1003',
        any: [/JUEL:4 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1004',
        any: [/JUEL:5 \+= S\*500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1005',
        any: [/JUEL:6 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1006',
        any: [/JUEL:9 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1010',
        any: [/IF TEQUIP:35 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1010-1014',
        any: [
          /IF TEQUIP:35 == 0\n	CFLAG:101 = 30\n	CALL IN_VAGINA_M_TO_T\n	CALL CONCEPTION_CHECK_M_TO_T\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1011',
        any: [/	CFLAG:101 = 30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1012',
        any: [/	CALL IN_VAGINA_M_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1013',
        any: [/	CALL CONCEPTION_CHECK_M_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1015',
        any: [/TEQUIP:35 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1018-1020',
        any: [/PLAYER = MASTER\nTFLAG:14 = 0\nCALL INCEST/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1019-1020',
        any: [/TFLAG:14 = 0\nCALL INCEST/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1022-1045',
        any: [
          /IF CFLAG:15 == 0\n	;初体験の相手を記録（初期値が0のため、\+1して記録）\n	CFLAG:15 = NO:PLAYER \+ 1\n	CSTR:3 = %SAVESTR:PLAYER%\n	;初体験が近親相姦\n	;初体験の相手が自分の息子・娘という状況は生物学的にありえないので省く\n	IF TFLAG:14 == 1 && TALENT:PLAYER:122\n		CFLAG:15 = 300\n	ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 301\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122\n		CFLAG:15 = 304\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 305\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122\n		CFLAG:15 = 306\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 307\n	ELSEIF TFLAG:14 == 5 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 308\n	ELSEIF TFLAG:14 == 6 && TALENT:PLAYER:122\n		CFLAG:15 = 309\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1024',
        any: [/	CFLAG:15 = NO:PLAYER \+ 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1025',
        any: [/	CSTR:3 = %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1028-1044',
        any: [
          /	IF TFLAG:14 == 1 && TALENT:PLAYER:122\n		CFLAG:15 = 300\n	ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 301\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122\n		CFLAG:15 = 304\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 305\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122\n		CFLAG:15 = 306\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 307\n	ELSEIF TFLAG:14 == 5 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 308\n	ELSEIF TFLAG:14 == 6 && TALENT:PLAYER:122\n		CFLAG:15 = 309\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1028-1043',
        any: [
          /	IF TFLAG:14 == 1 && TALENT:PLAYER:122\n		CFLAG:15 = 300\n	ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 301\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122\n		CFLAG:15 = 304\n	ELSEIF TFLAG:14 == 3 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 305\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122\n		CFLAG:15 = 306\n	ELSEIF TFLAG:14 == 4 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 307\n	ELSEIF TFLAG:14 == 5 && TALENT:PLAYER:122 == 0\n		CFLAG:15 = 308\n	ELSEIF TFLAG:14 == 6 && TALENT:PLAYER:122\n		CFLAG:15 = 309/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1048-1073',
        any: [
          /IF TALENT:MASTER:1\n	TALENT:MASTER:1 = 0\n	IF CFLAG:MASTER:15 == 0\n		CFLAG:MASTER:15 = NO:TARGET \+ 1\n		CSTR:MASTER:3 = %SAVESTR:TARGET%\n		;初体験が近親相姦\n		;初体験の相手が自分の息子・娘という状況は生物学的にありえないので省く\n		IF TFLAG:14 == 2 && TALENT:122\n			CFLAG:MASTER:15 = 300\n		ELSEIF TFLAG:14 == 2 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 301\n		ELSEIF TFLAG:14 == 3 && TALENT:122\n			CFLAG:MASTER:15 = 306\n		ELSEIF TFLAG:14 == 3 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 307\n		ELSEIF TFLAG:14 == 4 && TALENT:122\n			CFLAG:MASTER:15 = 304\n		ELSEIF TFLAG:14 == 4 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 305\n		ELSEIF TFLAG:14 == 5 && TALENT:122\n			CFLAG:MASTER:15 = 309\n		ELSEIF TFLAG:14 == 6 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 308\n		ENDIF\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1049',
        any: [/	TALENT:MASTER:1 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1051',
        any: [/		CFLAG:MASTER:15 = NO:TARGET \+ 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1052',
        any: [/		CSTR:MASTER:3 = %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1055-1071',
        any: [
          /		IF TFLAG:14 == 2 && TALENT:122\n			CFLAG:MASTER:15 = 300\n		ELSEIF TFLAG:14 == 2 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 301\n		ELSEIF TFLAG:14 == 3 && TALENT:122\n			CFLAG:MASTER:15 = 306\n		ELSEIF TFLAG:14 == 3 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 307\n		ELSEIF TFLAG:14 == 4 && TALENT:122\n			CFLAG:MASTER:15 = 304\n		ELSEIF TFLAG:14 == 4 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 305\n		ELSEIF TFLAG:14 == 5 && TALENT:122\n			CFLAG:MASTER:15 = 309\n		ELSEIF TFLAG:14 == 6 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 308\n		ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1055-1070',
        any: [
          /		IF TFLAG:14 == 2 && TALENT:122\n			CFLAG:MASTER:15 = 300\n		ELSEIF TFLAG:14 == 2 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 301\n		ELSEIF TFLAG:14 == 3 && TALENT:122\n			CFLAG:MASTER:15 = 306\n		ELSEIF TFLAG:14 == 3 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 307\n		ELSEIF TFLAG:14 == 4 && TALENT:122\n			CFLAG:MASTER:15 = 304\n		ELSEIF TFLAG:14 == 4 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 305\n		ELSEIF TFLAG:14 == 5 && TALENT:122\n			CFLAG:MASTER:15 = 309\n		ELSEIF TFLAG:14 == 6 && TALENT:122 == 0\n			CFLAG:MASTER:15 = 308/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1074',
        any: [/TFLAG:14 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1076-1084',
        any: [
          /IF CFLAG:49\n	PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。\n	CFLAG:49 = 0\n	CFLAG:40 -= 64\n	;断った時と同様の理由でCFLAG:50と、このままだと外れたはずの貞操帯が衣装変更時にまた付いてしまうので\n	;CFLAG:42（特別コスチューム）も元に戻す\n	CFLAG:50 = 0\n	CFLAG:42 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1078',
        any: [/	CFLAG:49 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1079',
        any: [/	CFLAG:40 -= 64/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1082',
        any: [/	CFLAG:50 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1083',
        any: [/	CFLAG:42 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1086-1088',
        any: [/DRAWLINE\n\nRETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1088-1089',
        any: [/RETURN 1\n;-------------------------------------------------/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1095-1321',
        any: [
          /@NIGHT_STALKING_CHECK\n#DIM NIGHT_COUNT\n#DIM OK_FLAG,2\n#DIM NIGHT_TARGET\n#DIM PLAY\n;主人が男人でないとダメ\nSIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0\n\nLOCAL:1 = 0\nFOR NIGHT_COUNT, 1, CHARANUM\n	IF ABL:NIGHT_COUNT:11 >= 4 && ABL:NIGHT_COUNT:30 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE\n		;处女の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n\n		;性交中毒\n		OK_FLAG = ABL:NIGHT_COUNT:30\n\n		;开放\n		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1\n		;克制\n		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2\n		;接受快感\n		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1\n		;否定快感\n		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1\n		;性爱狂\n		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1\n		;尻穴狂\n		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1\n		;淫乱\n		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1\n		SIF OK_FLAG > 0\n			LOCAL:1 \+= 1\n	ENDIF\nNEXT\n\nSIF LOCAL:1 == 0\n	RETURN 0\n\nLOCAL:2 = RAND:\(LOCAL:1\)\n\nFOR NIGHT_COUNT, 1, CHARANUM\n	IF ABL:NIGHT_COUNT:11 >= 4 && ABL:NIGHT_COUNT:30 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE\n		;处女の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n\n		;性交中毒\n		OK_FLAG = ABL:NIGHT_COUNT:30\n		;开放\n		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1\n		;克制\n		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2\n		;接受快感\n		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1\n		;否定快感\n		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1\n		;性爱狂\n		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1\n		;尻穴狂\n		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1\n		;淫乱\n		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1\n\n		IF OK_FLAG > 0 && LOCAL:2 == 0\n			NIGHT_TARGET = NIGHT_COUNT\n			BREAK\n		ELSEIF OK_FLAG > 0\n			LOCAL:2 -= 1\n		ENDIF\n\n	ENDIF\nNEXT\n\nPRINTFORML 调教结束后，%CALLNAME:MASTER%正准备上床就寝，%SAVESTR:NIGHT_TARGET%突然跑到房间里来。\nWAIT\n\n;夜這い口上\nTARGET = NIGHT_TARGET\nTFLAG:13 = 5\nCALL SELF_KOJO\n\n;Ｖ使用フラグ\nOK_FLAG:1 = 1\n;オトコだとダメ\nSIF TALENT:NIGHT_TARGET:122\n	OK_FLAG:1 = 0\n;処女だとダメ\nSIF TALENT:NIGHT_TARGET:0\n	OK_FLAG:1 = 0\n;貞操帯だとダメ\nSIF CFLAG:NIGHT_TARGET:42 == 79 && \(CFLAG:NIGHT_TARGET:40 & 64\)\n	OK_FLAG:1 = 0\n;貞操封印だとダメ\nSIF TALENT:NIGHT_TARGET:273\n	OK_FLAG:1 = 0\n;Ａ感覚がＶより高いとダメ\nSIF ABL:NIGHT_TARGET:2 < ABL:NIGHT_TARGET:3\n	OK_FLAG:1 = 0\n\nIF OK_FLAG:1 == 1\n	;セックス回数\n	PLAY = ABL:NIGHT_TARGET:30\n	;V感覚\n	IF ABL:NIGHT_TARGET:2 <= 4\n		PLAY \+= 1\n	ELSEIF ABL:NIGHT_TARGET:2 == 5\n		PLAY \+= 2\n	ELSEIF ABL:NIGHT_TARGET:2 >= 6\n		PLAY \+= 4\n	ENDIF\n	PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，子宫想你想得发疼，乞求着你的宠爱……\n	PRINTFORML \{PLAY\}次交合之后，两人相拥而眠，深深沉睡了。\n	PRINTFORML %EXPNAME:0%＋\{PLAY\}\n	PRINTFORML %EXPNAME:5%＋\{PLAY\}\n	EXP:NIGHT_TARGET:0 \+= PLAY\n	EXP:NIGHT_TARGET:5 \+= PLAY\n	PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*400\}\n	PRINTFORML %PALAMNAME:4%点数＋\{PLAY\*250\}\n	PRINTFORMW %PALAMNAME:5%点数＋\{PLAY\*250\}\n	JUEL:NIGHT_TARGET:1 \+= PLAY\*400\n	JUEL:NIGHT_TARGET:4 \+= PLAY\*250\n	JUEL:NIGHT_TARGET:5 \+= PLAY\*250\nELSE\n	;アナルセックス回数\n	PLAY = ABL:NIGHT_TARGET:30\n	;肛门感觉\n	IF ABL:NIGHT_TARGET:3 <= 4\n		PLAY \+= 1\n	ELSEIF ABL:NIGHT_TARGET:3 == 5\n		PLAY \+= 2\n	ELSEIF ABL:NIGHT_TARGET:3 >= 6\n		PLAY \+= 4\n	ENDIF\n	PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，肛门想你想得发疼，乞求着你的宠爱……\n	PRINTFORML \{PLAY\}次交合之后，两人相拥而眠，深深沉睡了。\n	PRINTFORML %EXPNAME:1%＋\{PLAY\}\n	PRINTFORML %EXPNAME:5%＋\{PLAY\}\n	EXP:NIGHT_TARGET:1 \+= PLAY\n	EXP:NIGHT_TARGET:5 \+= PLAY\n	PRINTFORML %PALAMNAME:2%点数＋\{PLAY\*400\}\n	PRINTFORML %PALAMNAME:4%点数＋\{PLAY\*250\}\n	PRINTFORMW %PALAMNAME:5%点数＋\{PLAY\*250\}\n	JUEL:NIGHT_TARGET:2 \+= PLAY\*400\n	JUEL:NIGHT_TARGET:4 \+= PLAY\*250\n	JUEL:NIGHT_TARGET:5 \+= PLAY\*250\nENDIF\n\nDRAWLINE\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1101-1102',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1105-1167',
        any: [
          /FOR NIGHT_COUNT, 1, CHARANUM\n	IF ABL:NIGHT_COUNT:11 >= 4 && ABL:NIGHT_COUNT:30 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE\n		;处女の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n\n		;性交中毒\n		OK_FLAG = ABL:NIGHT_COUNT:30\n\n		;开放\n		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1\n		;克制\n		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2\n		;接受快感\n		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1\n		;否定快感\n		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1\n		;性爱狂\n		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1\n		;尻穴狂\n		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1\n		;淫乱\n		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1\n		SIF OK_FLAG > 0\n			LOCAL:1 \+= 1\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1105-1168',
        any: [
          /FOR NIGHT_COUNT, 1, CHARANUM\n	IF ABL:NIGHT_COUNT:11 >= 4 && ABL:NIGHT_COUNT:30 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE\n		;处女の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n\n		;性交中毒\n		OK_FLAG = ABL:NIGHT_COUNT:30\n\n		;开放\n		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1\n		;克制\n		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2\n		;接受快感\n		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1\n		;否定快感\n		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1\n		;性爱狂\n		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1\n		;尻穴狂\n		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1\n		;淫乱\n		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1\n		SIF OK_FLAG > 0\n			LOCAL:1 \+= 1\n	ENDIF\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1108-1109',
        any: [/		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1111-1112',
        any: [/		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1114-1115',
        any: [
          /		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1117-1118',
        any: [/		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1120-1121',
        any: [
          /		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1123-1124',
        any: [/		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1126-1127',
        any: [/		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1129-1139',
        any: [
          /		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1142',
        any: [/		OK_FLAG = ABL:NIGHT_COUNT:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1145-1146',
        any: [/		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1148-1149',
        any: [/		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1151-1152',
        any: [/		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1154-1155',
        any: [/		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1157-1158',
        any: [
          /		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1160-1161',
        any: [
          /		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1163-1164',
        any: [
          /		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1165-1166',
        any: [/		SIF OK_FLAG > 0\n			LOCAL:1 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1170-1171',
        any: [/SIF LOCAL:1 == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1173',
        any: [/LOCAL:2 = RAND:\(LOCAL:1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1175-1243',
        any: [
          /FOR NIGHT_COUNT, 1, CHARANUM\n	IF ABL:NIGHT_COUNT:11 >= 4 && ABL:NIGHT_COUNT:30 >= 1\n		;死んでたり臨死中だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 0\n			CONTINUE\n		;瀕死だとダメ\n		SIF BASE:NIGHT_COUNT:0 <= 500\n			CONTINUE\n		;育儿中や臨月だとダメ\n		SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)\n			CONTINUE\n		;魔王部屋にいないとダメ\n		SIF CFLAG:NIGHT_COUNT:1 != 0\n			CONTINUE\n		;未婚か魔王と結婚していないとダメ\n		SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901\n			CONTINUE\n		;绝不侍奉があるとダメ\n		SIF TALENT:NIGHT_COUNT:151\n			CONTINUE\n		;反抗刻印があるとダメ\n		SIF MARK:NIGHT_COUNT:3 > 0\n			CONTINUE\n		;处女の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF TALENT:NIGHT_COUNT:0 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n		;男人でない場合は「顺从\+欲望\+V感覚\+12以下」かつ「顺从\+欲望\+肛门感觉\+14以下」だとダメ\n		SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)\n			CONTINUE\n		;男人の場合は顺从\+欲望\+肛门感觉\+12以下だとダメ\n		SIF TALENT:NIGHT_COUNT:122 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 12\n			CONTINUE\n		;貞操帯の場合は顺从\+欲望\+肛门感觉\+14以下だとダメ\n		SIF CFLAG:NIGHT_COUNT:42 == 79 && \(CFLAG:NIGHT_COUNT:40 & 64\)  && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\n			CONTINUE\n\n		;性交中毒\n		OK_FLAG = ABL:NIGHT_COUNT:30\n		;开放\n		SIF TALENT:NIGHT_COUNT:33\n			OK_FLAG \+= 1\n		;克制\n		SIF TALENT:NIGHT_COUNT:20\n			OK_FLAG -= 2\n		;接受快感\n		SIF TALENT:NIGHT_COUNT:70\n			OK_FLAG \+= 1\n		;否定快感\n		SIF TALENT:NIGHT_COUNT:71\n			OK_FLAG -= 1\n		;性爱狂\n		SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3\n			OK_FLAG \+= 1\n		;尻穴狂\n		SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)\n			OK_FLAG \+= 1\n		;淫乱\n		SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0\n			OK_FLAG \+= 1\n\n		IF OK_FLAG > 0 && LOCAL:2 == 0\n			NIGHT_TARGET = NIGHT_COUNT\n			BREAK\n		ELSEIF OK_FLAG > 0\n			LOCAL:2 -= 1\n		ENDIF\n\n	ENDIF\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1245',
        any: [
          /PRINTFORML 调教结束后，%CALLNAME:MASTER%正准备上床就寝，%SAVESTR:NIGHT_TARGET%突然跑到房间里来。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1246',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1249',
        any: [/TARGET = NIGHT_TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1250-1251',
        any: [/TFLAG:13 = 5\nCALL SELF_KOJO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1254-1269',
        any: [
          /OK_FLAG:1 = 1\n;オトコだとダメ\nSIF TALENT:NIGHT_TARGET:122\n	OK_FLAG:1 = 0\n;処女だとダメ\nSIF TALENT:NIGHT_TARGET:0\n	OK_FLAG:1 = 0\n;貞操帯だとダメ\nSIF CFLAG:NIGHT_TARGET:42 == 79 && \(CFLAG:NIGHT_TARGET:40 & 64\)\n	OK_FLAG:1 = 0\n;貞操封印だとダメ\nSIF TALENT:NIGHT_TARGET:273\n	OK_FLAG:1 = 0\n;Ａ感覚がＶより高いとダメ\nSIF ABL:NIGHT_TARGET:2 < ABL:NIGHT_TARGET:3\n	OK_FLAG:1 = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1272',
        any: [/	;セックス回数/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1282-1293',
        any: [
          /	PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，子宫想你想得发疼，乞求着你的宠爱……\n	PRINTFORML \{PLAY\}次交合之后，两人相拥而眠，深深沉睡了。\n	PRINTFORML %EXPNAME:0%＋\{PLAY\}\n	PRINTFORML %EXPNAME:5%＋\{PLAY\}\n	EXP:NIGHT_TARGET:0 \+= PLAY\n	EXP:NIGHT_TARGET:5 \+= PLAY\n	PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*400\}\n	PRINTFORML %PALAMNAME:4%点数＋\{PLAY\*250\}\n	PRINTFORMW %PALAMNAME:5%点数＋\{PLAY\*250\}\n	JUEL:NIGHT_TARGET:1 \+= PLAY\*400\n	JUEL:NIGHT_TARGET:4 \+= PLAY\*250\n	JUEL:NIGHT_TARGET:5 \+= PLAY\*250/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1286',
        any: [/	EXP:NIGHT_TARGET:0 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1287',
        any: [/	EXP:NIGHT_TARGET:5 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1291',
        any: [/	JUEL:NIGHT_TARGET:1 \+= PLAY\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1292',
        any: [/	JUEL:NIGHT_TARGET:4 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1293',
        any: [/	JUEL:NIGHT_TARGET:5 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1296',
        any: [/	PLAY = ABL:NIGHT_TARGET:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1305-1316',
        any: [
          /	PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，肛门想你想得发疼，乞求着你的宠爱……\n	PRINTFORML \{PLAY\}次交合之后，两人相拥而眠，深深沉睡了。\n	PRINTFORML %EXPNAME:1%＋\{PLAY\}\n	PRINTFORML %EXPNAME:5%＋\{PLAY\}\n	EXP:NIGHT_TARGET:1 \+= PLAY\n	EXP:NIGHT_TARGET:5 \+= PLAY\n	PRINTFORML %PALAMNAME:2%点数＋\{PLAY\*400\}\n	PRINTFORML %PALAMNAME:4%点数＋\{PLAY\*250\}\n	PRINTFORMW %PALAMNAME:5%点数＋\{PLAY\*250\}\n	JUEL:NIGHT_TARGET:2 \+= PLAY\*400\n	JUEL:NIGHT_TARGET:4 \+= PLAY\*250\n	JUEL:NIGHT_TARGET:5 \+= PLAY\*250/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1309',
        any: [/	EXP:NIGHT_TARGET:1 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1310',
        any: [/	EXP:NIGHT_TARGET:5 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1314',
        any: [/	JUEL:NIGHT_TARGET:2 \+= PLAY\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1315',
        any: [/	JUEL:NIGHT_TARGET:4 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1316',
        any: [/	JUEL:NIGHT_TARGET:5 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1319-1321',
        any: [/DRAWLINE\n\nRETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1319-1321',
        any: [/DRAWLINE\n\nRETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1325-1462',
        any: [
          /@DOG_WALK\n#DIM DOG_WALKING\n#DIM PLAY\n#DIM OPEN\n#DIM NO_SEX\n#DIM SAVE_TARGET\n;--------------------------------------\n;野狗を散歩させる\n\n;いぬを持ってないとダメ\nSIF ITEM:22 == 0 && NOITEM == 0\n	RETURN 0\n\nSAVE_TARGET = TARGET\n\n;散歩するひと選択\nDOG_WALKING = CHARANUM -1\n;奴隷がいなければ你が散歩\nIF DOG_WALKING == 0\n	PRINTL  \n	PRINTFORMW %SAVESTR:DOG_WALKING%带了野狗去散步。\n	RETURN 0\nENDIF\nDOG_WALKING = RAND:DOG_WALKING\n\n;你以外で陥落してない奴隷で調教可能でなければ、你が散歩\nIF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0 && CFLAG:DOG_WALKING:1 != 0\n	DOG_WALKING = 0\n;你以外で陥落してる奴隷でも調教可能でなければ、你が散歩\nELSEIF DOG_WALKING != 0 && CFLAG:DOG_WALKING:1 != 0\n	DOG_WALKING = 0\n;你以外で陥落してない奴隷なら、你が散歩\nELSEIF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0\n	DOG_WALKING = 0\nENDIF\nPRINTL  \n\nTARGET = DOG_WALKING\n\n;興奮度\nPLAY = 0\n;露出要素（若干の抵抗あり）\nOPEN = -2\n;V禁止\nNO_SEX = 0\n\n;兽奸中毒\nPLAY \+= ABL:DOG_WALKING:39\n;牝犬\nSIF TALENT:DOG_WALKING:136\n	PLAY \+= 2\n\n;露出癖\nOPEN \+= ABL:DOG_WALKING:17\n;露出狂\nSIF TALENT:DOG_WALKING:89\n	OPEN \+= 1\n;目立ちたがり\nSIF TALENT:DOG_WALKING:28\n	OPEN \+= 1\n\n;ボーナス素質\n;動物耳\nSIF TALENT:DOG_WALKING:124 && PLAY > 0\n	PLAY \+= 1\n;かわいい動物が好き\nSIF TALENT:DOG_WALKING:317 == 12 && PLAY > 0\n	PLAY \+= 1\n\nIF TALENT:DOG_WALKING:0\n	;処女\n	NO_SEX = 1\nELSEIF TALENT:DOG_WALKING:273\n	;処女封印\n	NO_SEX = 1\nELSEIF CFLAG:DOG_WALKING:42 == 79 && \(CFLAG:DOG_WALKING:40 & 64\) && FLAG:37\n	;貞操帯\n	NO_SEX = 1\nENDIF\n\nIF DOG_WALKING != 0\n	;服\n	CALL PRINT_CLOTHTYPE\n	PRINTFORM 的%SAVESTR:DOG_WALKING%\n	SIF PLAY > 0\n		PRINT 好像自己散步似地，戴上项圈，四脚爬爬地出去了。\n	PRINTL 和野狗一起散了散步。\nENDIF\n\nIF PLAY > 0 && NO_SEX == 0\n	;交尾\n	PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，\n	SIF OPEN > 0\n		PRINTFORM 一边向路人展示着痴态，\n	PRINTFORML 一边引诱着野狗进行了交配。\n	PRINTFORML %EXPNAME:56%\+1\n	PRINTFORML %PALAMNAME:0%点数\+\{5\*PLAY\}\n	PRINTFORML %PALAMNAME:5%点数\+\{5\*PLAY\}\n	EXP:DOG_WALKING:56 \+= 1\n	JUEL:DOG_WALKING:0 \+= 5\*PLAY\n	JUEL:DOG_WALKING:5 \+= 5\*PLAY\n	\n	PRINTFORML %EXPNAME:5%\+1\n	PRINTFORML %EXPNAME:0%\+1\n	PRINTFORML %PALAMNAME:1%之珠\+\{4\*PLAY\}\n	JUEL:DOG_WALKING:1 \+= 4\*PLAY\n	EXP:DOG_WALKING:5 \+= 1\n	EXP:DOG_WALKING:0 \+= 1\nELSEIF PLAY > 0 && NO_SEX == 1\n	;交尾無し\n	PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，\n	SIF OPEN > 0\n		PRINTFORM 一边向路人展示着痴态，\n	PRINTFORML 一边帮野狗口交起来了。\n	PRINTFORML %EXPNAME:56%\+1\n	PRINTFORML %PALAMNAME:5%点数\+\{5\*PLAY\}\n	EXP:DOG_WALKING:56 \+= 1\n	JUEL:DOG_WALKING:5 \+= 5\*PLAY\n	\n	;フェラ経験、精液経験\n	PRINTFORML %EXPNAME:22%\+1\n	PRINTFORML %EXPNAME:20%\+1\n	EXP:DOG_WALKING:22 \+= 1\n	EXP:DOG_WALKING:20 \+= 1\n	\nENDIF\n\nIF PLAY > 0 && OPEN > 0\n	;露出した場合恥情点数\n	PRINTFORMW %PALAMNAME:8%点数\+\{5\*PLAY\}\n	JUEL:DOG_WALKING:8 \+= 5\*PLAY\nELSE\n	WAIT\nENDIF\n\nTARGET = SAVE_TARGET\n\nRETURN 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1335-1336',
        any: [/SIF ITEM:22 == 0 && NOITEM == 0\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1338',
        any: [/SAVE_TARGET = TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1341',
        any: [/DOG_WALKING = CHARANUM -1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1343-1347',
        any: [
          /IF DOG_WALKING == 0\n	PRINTL  \n	PRINTFORMW %SAVESTR:DOG_WALKING%带了野狗去散步。\n	RETURN 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1348',
        any: [/DOG_WALKING = RAND:DOG_WALKING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1351-1359',
        any: [
          /IF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0 && CFLAG:DOG_WALKING:1 != 0\n	DOG_WALKING = 0\n;你以外で陥落してる奴隷でも調教可能でなければ、你が散歩\nELSEIF DOG_WALKING != 0 && CFLAG:DOG_WALKING:1 != 0\n	DOG_WALKING = 0\n;你以外で陥落してない奴隷なら、你が散歩\nELSEIF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0\n	DOG_WALKING = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1360',
        any: [/PRINTL  /],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1362',
        any: [/TARGET = DOG_WALKING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1365',
        any: [/PLAY = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1367',
        any: [/OPEN = -2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1369',
        any: [/NO_SEX = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1372',
        any: [/PLAY \+= ABL:DOG_WALKING:39/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1374-1375',
        any: [/SIF TALENT:DOG_WALKING:136\n	PLAY \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1378',
        any: [/OPEN \+= ABL:DOG_WALKING:17/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1380-1381',
        any: [/SIF TALENT:DOG_WALKING:89\n	OPEN \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1383-1384',
        any: [/SIF TALENT:DOG_WALKING:28\n	OPEN \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1388-1389',
        any: [/SIF TALENT:DOG_WALKING:124 && PLAY > 0\n	PLAY \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1391-1392',
        any: [/SIF TALENT:DOG_WALKING:317 == 12 && PLAY > 0\n	PLAY \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1394-1396',
        any: [/IF TALENT:DOG_WALKING:0\n	;処女\n	NO_SEX = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1397-1399',
        any: [/ELSEIF TALENT:DOG_WALKING:273\n	;処女封印\n	NO_SEX = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1400-1402',
        any: [
          /ELSEIF CFLAG:DOG_WALKING:42 == 79 && \(CFLAG:DOG_WALKING:40 & 64\) && FLAG:37\n	;貞操帯\n	NO_SEX = 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1405-1412',
        any: [
          /IF DOG_WALKING != 0\n	;服\n	CALL PRINT_CLOTHTYPE\n	PRINTFORM 的%SAVESTR:DOG_WALKING%\n	SIF PLAY > 0\n		PRINT 好像自己散步似地，戴上项圈，四脚爬爬地出去了。\n	PRINTL 和野狗一起散了散步。\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1414-1432',
        any: [
          /IF PLAY > 0 && NO_SEX == 0\n	;交尾\n	PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，\n	SIF OPEN > 0\n		PRINTFORM 一边向路人展示着痴态，\n	PRINTFORML 一边引诱着野狗进行了交配。\n	PRINTFORML %EXPNAME:56%\+1\n	PRINTFORML %PALAMNAME:0%点数\+\{5\*PLAY\}\n	PRINTFORML %PALAMNAME:5%点数\+\{5\*PLAY\}\n	EXP:DOG_WALKING:56 \+= 1\n	JUEL:DOG_WALKING:0 \+= 5\*PLAY\n	JUEL:DOG_WALKING:5 \+= 5\*PLAY\n	\n	PRINTFORML %EXPNAME:5%\+1\n	PRINTFORML %EXPNAME:0%\+1\n	PRINTFORML %PALAMNAME:1%之珠\+\{4\*PLAY\}\n	JUEL:DOG_WALKING:1 \+= 4\*PLAY\n	EXP:DOG_WALKING:5 \+= 1\n	EXP:DOG_WALKING:0 \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1423',
        any: [/	EXP:DOG_WALKING:56 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1424',
        any: [/	JUEL:DOG_WALKING:0 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1425',
        any: [/	JUEL:DOG_WALKING:5 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1427',
        any: [/	PRINTFORML %EXPNAME:5%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1428',
        any: [/	PRINTFORML %EXPNAME:0%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1429',
        any: [/	PRINTFORML %PALAMNAME:1%之珠\+\{4\*PLAY\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1430',
        any: [/	JUEL:DOG_WALKING:1 \+= 4\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1431',
        any: [/	EXP:DOG_WALKING:5 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1432',
        any: [/	EXP:DOG_WALKING:0 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1433-1450',
        any: [
          /ELSEIF PLAY > 0 && NO_SEX == 1\n	;交尾無し\n	PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，\n	SIF OPEN > 0\n		PRINTFORM 一边向路人展示着痴态，\n	PRINTFORML 一边帮野狗口交起来了。\n	PRINTFORML %EXPNAME:56%\+1\n	PRINTFORML %PALAMNAME:5%点数\+\{5\*PLAY\}\n	EXP:DOG_WALKING:56 \+= 1\n	JUEL:DOG_WALKING:5 \+= 5\*PLAY\n	\n	;フェラ経験、精液経験\n	PRINTFORML %EXPNAME:22%\+1\n	PRINTFORML %EXPNAME:20%\+1\n	EXP:DOG_WALKING:22 \+= 1\n	EXP:DOG_WALKING:20 \+= 1\n	\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1441',
        any: [/	EXP:DOG_WALKING:56 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1442',
        any: [/	JUEL:DOG_WALKING:5 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1445',
        any: [/	PRINTFORML %EXPNAME:22%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1446',
        any: [/	PRINTFORML %EXPNAME:20%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1447',
        any: [/	EXP:DOG_WALKING:22 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1448',
        any: [/	EXP:DOG_WALKING:20 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1452-1455',
        any: [
          /IF PLAY > 0 && OPEN > 0\n	;露出した場合恥情点数\n	PRINTFORMW %PALAMNAME:8%点数\+\{5\*PLAY\}\n	JUEL:DOG_WALKING:8 \+= 5\*PLAY/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1457',
        any: [/	WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1460',
        any: [/TARGET = SAVE_TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1462-1464',
        any: [/RETURN 1\n\n;----------------------------------/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1465-2426',
        any: [
          /@PILLORY\n#DIM PILLORY_USER\n#DIM COUNT_F\n#DIM COUNT_A\n#DIM COUNT_B\n#DIM COUNT_V\n#DIM COUNT_S\n#DIM COUNT_Z\n;----------------------------------\n;高姿态、保守的、看重贞操、高贵に特効\n;晒し台状態以外は除外\nSIF CFLAG:1 != 8\n	RETURN 0\n\n;各種回数 Fフェラ Aアナル B胸 V性器 S精液 Z兽奸\nCOUNT_F = 0\nCOUNT_A = 0\nCOUNT_B = 0\nCOUNT_V = 0\nCOUNT_S = 0\nCOUNT_Z = 0\n\n;使用者の代表\nPILLORY_USER = RAND:5\n\nDRAWLINE\nPRINTFORM 示众刑：%SAVESTR:TARGET%\nIF CFLAG:110 == DAY\n	PRINT （出产）\nELSEIF CFLAG:110 - 2 <= DAY && TALENT:153\n	PRINT （临月）\nELSEIF TALENT:153\n	PRINT （怀孕中）\nELSEIF TALENT:0 \n	PRINT （处女）\nELSEIF TALENT:273\n	PRINT （前穴封印）\nENDIF\nPRINTL\nDRAWLINE\nPRINT 被固定在示众台上。\nCALL PRINT_CLOTHTYPE_MAIN2\nPRINTFORML 姿态的%SAVESTR:TARGET%被大群男性围观着。\nPRINTFORM %SAVESTR:TARGET%\nIF CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\n	PRINT 保护着自己的大肚子，\nELSEIF CFLAG:661 \+CFLAG:662  == 0\n	PRINT 不安地颤抖着，\nELSEIF CFLAG:661\+CFLAG:662 < 20\n	PRINT 被多次中出的不快感折磨着，\nELSEIF CFLAG:661\+CFLAG:662 < 50\n	PRINT 无法睡觉，眼睛通红着，\nELSEIF CFLAG:661\+CFLAG:662 <100\n	PRINT 在无穷无尽的凌辱中，奄奄一息地大口喘着气，\nELSE\n	PRINT 全身都被精液沾满了，\nENDIF\n;高贵\nIF TALENT:163\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 咬紧牙关，拼命忍耐着……\n		CASE 1\n			PRINTL 一言不发地忍耐着……\n		CASE 2\n			PRINTL 强压下啜泣的声音，忍耐着……\n	ENDSELECT\n;高姿态、保守的、看重贞操\nELSEIF TALENT:15 \|\| TALENT:24 \|\| TALENT:30\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 不停地扭动着身体企图阻止侵犯……\n		CASE 1\n			PRINTFORML 用凶悍的眼神瞪着凌辱%SHE\(\)%的人……\n		CASE 2\n			PRINTL 发出了怨恨的声音……\n	ENDSELECT\nELSE\n	PRINTL 忍受着耻辱……\nENDIF\n\nPRINTL\n;落書きスタート\n;臨月\nIF CFLAG:110 - 2 <= DAY && TALENT:153\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『淫乱的大肚便器，小%SAVESTR:TARGET%～』\n		CASE 1\n			PRINTFORM 『快临盘了，但是还是不能忘掉鸡鸡的味道～』\n		CASE 2\n			PRINTFORM 『咦……这样淫乱的妈妈好讨厌～』\n	ENDSELECT\nELSEIF TALENT:153\n;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『祝贺怀孕！』\n		CASE 1\n			PRINTFORM 『随便怀孕不知廉耻的小%SAVESTR:TARGET%～』\n		CASE 2\n			PRINTFORM 『怀着不知道父亲是谁的孩子！』\n	ENDSELECT\nELSE\n	SELECTCASE RAND:6\n		CASE 0\n			PRINTFORM 『精液便器，小%SAVESTR:TARGET%哦～』\n		CASE 1\n			PRINTFORM 『请惩罚%SAVESTR:TARGET%吧！』\n		CASE 2\n			PRINTFORM 『请随意使用。』\n		CASE 3\n			PRINTFORM 『性处理用便器』\n		CASE 4\n			PRINTFORM 『男厕所』\n		CASE 5\n			SIF !TALENT:122\n			PRINTFORM 『最爱鸡鸡的婊子便器女』\n	ENDSELECT\nENDIF\n\nREPEAT 10\n	;職業による分岐\n	LOCAL = COUNT \+ 200\n	SIF TALENT:LOCAL > 0\n		LOCALS = %TALENTNAME:LOCAL%\n	;これ以降%locals:0%で職業名が出せます\n	IF TALENT:LOCAL > 0 && \(TALENT:0 \|\| TALENT:273\)\n		;性器使えない\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『%SAVESTR:TARGET%是肛门特别有感觉的变态%TALENTNAME:LOCAL%』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，是各位专用的变态肛交妻』\n			CASE 2\n				PRINTFORM 『前穴是魔王大人的专用通道！』\n		ENDSELECT\n	ELSEIF TALENT:LOCAL > 0\n		;性器使える\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『用肉穴向大家道歉』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，除了中出，做什么都可以』\n			CASE 2\n				PRINTFORM 『免清洗的阴茎入口』\n		ENDSELECT\n	ENDIF\nREND\n\nIF TALENT:0\n	PRINTFORM 『处女』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF TALENT:273\n	PRINTFORM 『菊花专用』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF ABL:39 >= 1 && RAND:2 == 0\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『谁的鸡鸡都OK！』\n		CASE 1\n			PRINTFORM 『最爱兽奸！』\n		CASE 2\n			PRINTFORM 『兽奸死忠』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	;貞操帯\n	SIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n		COUNT_V = 0\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\n	COUNT_Z \+= COUNT_S\nELSEIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n	;貞操帯\n	PRINTFORM 『私处禁入！』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSE\n	SELECTCASE RAND:4\n		CASE 0\n			PRINTFORM 『什么都可以放进去』\n		CASE 1\n			PRINTFORM 『精液的垃圾箱』\n		CASE 2\n			PRINTFORM 『淫乱』\n		CASE 3\n			PRINTFORM 『中出记录更新中』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\nENDIF\n\nIF TALENT:15\n	;高姿态\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『自尊心很高的便器哦！』\n		CASE 1\n			PRINT 『\n			IF TALENT:314 == 0\n				PRINT 人类\n			ELSEIF TALENT:314 == 1\n				PRINT 精灵\n			ELSEIF TALENT:314 == 2\n				PRINT 狼人\n			ELSEIF TALENT:314 == 3\n				PRINT 吸血鬼\n			ELSEIF TALENT:314 == 4\n				PRINT 无头骑士\n			ELSEIF TALENT:314 == 5\n				PRINT 龙族\n			ELSEIF TALENT:314 == 6\n				PRINT 天使\n			ELSEIF TALENT:314 == 7\n				PRINT 暗精灵\n			ELSEIF TALENT:314 == 8\n				PRINT 堕天使\n			ELSEIF TALENT:314 == 9\n				PRINT 魔族\n			ELSEIF TALENT:314 == 10\n				PRINT 霍比特人\n			ELSEIF TALENT:314 == 11\n				PRINT 矮人\n			ENDIF\n			PRINT 之耻』\n		CASE 2\n			PRINT 『死脑筋』\n	ENDSELECT\nENDIF\n\nIF TALENT:22 \|\| TALENT:21\n	;感情淡薄・冷漠\n	PRINT 『性冷淡』\nENDIF\n\n\nIF TALENT:24 \|\| TALENT:30 \|\| TALENT:163\n	;保守的・看重贞操・高贵\n	SELECTCASE RAND:5\n		CASE 0\n			IF  TALENT:122\n				PRINT 『某家的大少爷』\n			ELSE\n				PRINT 『某家的大小姐』\n			ENDIF\n		CASE 1\n			IF TALENT:0 \|\| TALENT:273 \|\| TALENT:122\n				PRINT 『享受名门世家的肛门吧』\n			ELSE\n				PRINT 『享受名门世家的小穴吧』\n			ENDIF\n		CASE 2\n			PRINT 『我很幼稚，请大家用肉棒来教育我吧！』\n		CASE 3\n			IF  TALENT:122\n				PRINT 『大少爷』\n			ELSE\n				PRINT 『大小姐』 \n			ENDIF\n	ENDSELECT\nENDIF\nIF TALENT:42\n	;容易湿\n	PRINT 『马上就湿的荡妇』\nENDIF\n\nIF TALENT:61\n	;不怕污臭・反感污臭\n	SELECTCASE RAND:5\n		CASE 0\n			PRINT 『喜欢脏东西』\n		CASE 1\n			PRINT 『请让我舔大家的屁股』\n		CASE 2\n			PRINT 『肮脏的小鸡鸡优先』\n		CASE 3\n			PRINT 『热烈欢迎脏东西』\n		CASE 4\n			PRINT 『做完之后记得尿我身上哦！』\n	ENDSELECT\nENDIF\n\nIF TALENT:70 \|\| TALENT:73\n	;接受快感・容易陷落\n	PRINT 『BITCH』\nENDIF\n\nIF TALENT:82\n	;讨厌男人\n	SELECTCASE RAND:3\n		CASE 0\n			SIF !TALENT:122\n			PRINTFORM 『变态百合女』\n		CASE 1\n			PRINT 『我想跟女孩子做爱』\n		CASE 2\n			PRINT 『谢绝男人的小鸡鸡』\n	ENDSELECT\nENDIF\n\nIF TALENT:100\n	;娇小\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『%SAVESTR:TARGET%，八岁』\n		CASE 1\n			PRINT 『←死小孩』\n		CASE 2\n			PRINT 『小孩肉穴』\n	ENDSELECT\nENDIF\n\nIF TALENT:109 \|\| TALENT:116\n	;贫乳・绝壁\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『砧板一样的，真对不起！』 \n		CASE 1\n			PRINT 『大家来帮我揉大吧！』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『前后一致的女人』\n	ENDSELECT\nENDIF\n\nIF TALENT:110 \|\| TALENT:114 \|\| TALENT:119\n	;巨乳・爆乳・超乳\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『大胸部』 \n		CASE 1\n			PRINT 『笨蛋乳』\n		CASE 2\n			PRINT 『胸大无脑』\n	ENDSELECT\nENDIF\n\nIF TALENT:121\n	;ふたなり\n	IF TALENT:阴茎的状态 == 1\n		PRINT 『肉棒耶～』\n	ELSEIF TALENT:阴茎的状态 == 2\n		PRINT 『短小包茎的小鸡鸡漏出精液了哦～』\n	ELSEIF TALENT:阴茎的状态 == 3\n		PRINT 『这鸡鸡啊……』\n	ELSEIF TALENT:阴茎的状态 == 4\n		PRINT 『改造的马鞭！』\n	ELSE\n		PRINT 『肉棒勃起ing』\n	ENDIF\nELSEIF TALENT:122\n	;オトコ\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『人妖小子』\n		CASE 1\n			PRINT 『男娼』\n		CASE 2\n			PRINT 『喜欢被操的男人』\n	ENDSELECT\nENDIF\n\nIF TALENT:248\n	;肌肉型\n	PRINT 『大猩猩』\nENDIF\n\nIF TALENT:恋母情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『妈妈快来看～』 \n		CASE 1\n			PRINT 『妈妈救救我～』\n		CASE 2\n			PRINT 『比妈妈更淫乱』\n	ENDSELECT\nENDIF\n\nIF TALENT:恋父情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『爸爸快来看～』 \n		CASE 1\n			PRINT 『想要爸爸的小鸡鸡～』\n		CASE 2\n			PRINT 『爸爸的鸡鸡最棒！』\n	ENDSELECT\nENDIF\n\nIF TALENT:萝莉控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『萝莉猪』 \n		CASE 1\n			PRINT 『因为萝莉的小穴而兴奋』\n		CASE 2\n			PRINT 『淫乱萝莉控』\n	ENDSELECT\nENDIF\n\nIF TALENT:正太控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『正太专用便器』 \n		CASE 1\n			PRINT 『正太小鸡鸡爱好者』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『对不起，我是痴女』\n	ENDSELECT\nENDIF\n\nIF TALENT:153\n	;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『恭喜怀孕！』\n		CASE 1\n			PRINT 『十分感谢大家让我怀孕』\n		CASE 2\n			PRINT 『长枪体内过，腹中婴儿来』\n	ENDSELECT\nENDIF\n\nSELECTCASE RAND:14\n	CASE 0\n		PRINT 『浑身的精液臭味真对不起！』 \n	CASE 1\n		PRINT 『勇者之耻』\n	CASE 2\n		PRINT 『热烈欢迎不负责任的中出』\n	CASE 3\n		PRINTFORM 『记住%SAVESTR:TARGET%这个名字哦！』 \n	CASE 4\n		PRINT 『喜欢一边被殴打，一边被侵犯』 \n	CASE 5\n		PRINT 『弱小的』 \n	CASE 6\n		SIF !TALENT:122\n		PRINT 『我们的目标是——黑木耳』 \n	CASE 7\n		PRINT 『里面请用精液来好好关爱』 \n	CASE 8\n		PRINT 『ＷＣ』\n	CASE 9\n		SIF !TALENT:122\n		PRINT 『请侵犯来自遥远农村的私处』\n	CASE 10\n		PRINT 『请卜滋卜滋干个爽吧』 \n	CASE 11\n		PRINT 『想要你的阴茎』\n	CASE 12\n		PRINTFORM 『好色的%LOCALS%』\n	CASE 13\n		PRINTFORM 『肉穴%LOCALS%』 \nENDSELECT\n\nIF CFLAG:661 >=30\n	IF COUNT_V > 0\n		;臨月\n		IF \(CFLAG:110 - 2 <= DAY && TALENT:153\)\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%在怀孕期间也性欲旺盛着』 \n				CASE 1\n					PRINT 『怀孕中，母乳畅饮』\n				CASE 2\n					PRINT 『怀上了不知父亲是谁的孩子』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『孕妇』 \n				CASE 6\n					PRINT 『肚子大了』 \n				CASE 7\n					PRINT 『给小宝宝精液吧！』 \n				CASE 8\n					PRINT 『怀孕以后屄里的肉褶越来越多了哦』\n				CASE 9\n					PRINT 『啊～大肚子真碍事～』\n			ENDSELECT\n		;妊娠\n		ELSEIF TALENT:153\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%稍微胖了吗？』 \n				CASE 1\n					PRINT 『这家伙受精了吗？』\n				CASE 2\n					PRINT 『受精了』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『战败纪念受精』\n				CASE 6\n					PRINT 『托各位的福，胸变大了←怀孕了而已吧』\n				CASE 7\n					SIF !TALENT:122\n					PRINT 『月经已停』 \n				CASE 8\n					PRINT 『乳头变得黑起来了』\n				CASE 9\n					PRINT 『让这家伙的肚子越来越大真的没问题吗？』\n			ENDSELECT\n		ELSE\n			;妊娠してない\n			SELECTCASE RAND:12\n				CASE 0\n					PRINT 『现在肉穴松弛了』 \n				CASE 1\n					PRINT 『被干怀孕了谢谢大家』\n				CASE 2\n					PRINT 『不管什么都好，想要怀孕啊～』\n				CASE 3\n					PRINTFORM 『来领养%SAVESTR:TARGET%的宝宝吧』 \n				CASE 4\n					PRINT 『过于风流』 \n				CASE 5\n					PRINT 『确认怀孕』 \n				CASE 6\n					PRINT 『感谢精液』 \n				CASE 7\n					PRINT 『渴望受精！』 \n				CASE 8\n					PRINT 『这家伙的肉穴太厉害了』\n				CASE 9\n					SIF !TALENT:122\n					PRINT 『小穴变一层层了』\n				CASE 10\n					PRINT 『←摇啊摇』\n				CASE 11\n					PRINT 『↓插啊插』\n			ENDSELECT\n		ENDIF\n	ELSE\n		SELECTCASE RAND:10\n			CASE 0\n				PRINT 『用的太多，尻穴开始松弛了』 \n			CASE 1\n				PRINT 『粪穴太松了』\n			CASE 2\n				PRINT 『屁股真漂亮』\n			CASE 3\n				PRINT 『太臭了』\n			CASE 4\n				SIF !TALENT:122 && TALENT:0\n				PRINT 『明明是处女，肛门却很淫荡』 \n			CASE 5\n				PRINT 『请让我的肛门喝很多精液吧』\n			CASE 6\n				PRINT 『啊啊……括约肌断了。』\n			CASE 7\n				PRINT 『这家伙的粪穴真臭』\n			CASE 8\n				PRINT 『肛交便器』\n			CASE 9\n				PRINT 『用肛门向大家道歉』\n		ENDSELECT\n	ENDIF\nENDIF\n\n;正の字を書こう\n;CFLAG:661を晒し台での精液经验に使います\n;晒し台から开放されるとリセット\n;COUNT_Vの使用数\nCFLAG:661 \+= COUNT_V\n;COUNT_Aの使用数\nCFLAG:662 \+= COUNT_A\n;口の使用数\nCFLAG:663 \+= COUNT_F\n;胸の使用数\nCFLAG:664 \+= COUNT_B\n;その他の使用数\nCFLAG:665 \+= COUNT_S - COUNT_V - COUNT_A - COUNT_F - COUNT_B\nREPEAT 5\n;使用回数があるならば\n	IF CFLAG:\(661\+COUNT\) > 0\n		SELECTCASE COUNT\n			CASE 0\n				SELECTCASE RAND:5\n					CASE 0\n						PRINT 『肉穴使用次数：\n					CASE 1\n						PRINT 『中出次数：\n					CASE 2\n						PRINT 『性经验急速上升中：\n					CASE 3\n						SIF !TALENT:122\n						PRINT 『小穴：\n					CASE 4\n						PRINT 『被播种：\n				ENDSELECT\n			CASE 1\n				SELECTCASE RAND:4\n					CASE 0\n						PRINT 『肛门使用次数：\n					CASE 1\n						PRINT 『菊穴使用次数：\n					CASE 2\n						PRINT 『菊穴：\n					CASE 3\n						PRINT 『屁股：\n				ENDSELECT\n			CASE 2\n				SELECTCASE RAND:3\n					CASE 0\n						PRINT 『嘴巴：\n					CASE 1\n						PRINT 『污垢处理：\n					CASE 2\n						PRINT 『口爆：\n				ENDSELECT\n			CASE 3\n				SELECTCASE RAND:2\n					CASE 0\n						PRINT 『胸部：\n					CASE 1\n						PRINT 『乳房：\n				ENDSELECT\n			CASE 4\n				PRINT 『\n		ENDSELECT\n		IF CFLAG:\(661\+COUNT\) >= 5\n			FOR LOCAL, 0, CFLAG:\(661\+COUNT\) \/5\n				PRINT 正 \n			NEXT\n		ENDIF\n		;５で割ったあまりを出します\n		SELECTCASE CFLAG:\(661\+COUNT\) % 5\n			CASE 1\n				PRINT 一\n			CASE 2\n				PRINT 丅\n			CASE 3\n				PRINT 下\n			CASE 4\n				PRINT 㠪\n		ENDSELECT\n		PRINT 』\n	ELSE\n	ENDIF\nREND\n\nSIF CFLAG:661 > 9\n	PRINT 『真的一个打十个！』\nSIF CFLAG:661 > 29\n	PRINT 『突破三十！！』\nSIF CFLAG:661 > 49\n	PRINT 『祝贺！达成了五十！！！』\nSIF CFLAG:661 > 99\n	PRINT 『正字写太多了，有点恶心』\nPRINTL\nPRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……\n\nWAIT\n\nPRINTL\n\nIF COUNT_Z > 0\n	;兽奸	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	IF PILLORY_USER == 1\n		PRINT 魔兽\n	ELSEIF PILLORY_USER == 2\n		PRINT 猪\n	ELSEIF PILLORY_USER == 3\n		PRINT 小马\n	ELSEIF PILLORY_USER == 4\n		PRINT 狗\n	ELSE\n		PRINT 狗\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF RAND:3 == 0\n		PRINT 『这个大变态！　\n		IF PILLORY_USER == 1\n			PRINT 魔兽\n		ELSEIF PILLORY_USER == 2\n			PRINT 猪\n		ELSEIF PILLORY_USER == 3\n			PRINT 小马\n		ELSEIF PILLORY_USER == 4\n			PRINT 狗\n		ELSE\n			PRINT 狗\n		ENDIF\n		PRINTL 的小鸡鸡就这么舒服么』\n	ELSEIF RAND:2 == 0\n		PRINTL 『讨厌，像野兽一样……』\n	ELSE\n		PRINTL 『感觉如何！？大声说交配很舒服！』\n	ENDIF\nELSEIF COUNT_A > 0 && COUNT_V > 0\n	;A&V\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 暗精灵的少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下等恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『做吧！真正的免费小穴！』\n		ELSEIF RAND:2 == 0\n			PRINTL 魔族男人舒畅地射精了。\n			PRINTL 『不准漏出来，你敢漏出来就给你塞嘴里』\n		ELSE\n			PRINTL 『要…流出来了！』『喂！太快了吧！我再给你塞上……』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥……我已经忍不住了！』\n			ELSE\n			PRINTL 『大姐姐……我已经忍不住了！』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……全部出来了！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			SIF !TALENT:122\n			PRINTL 『大姐姐！～大姐姐！』\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『啊哈！！肛门也很舒服！来，怀上我的孩子吧！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSEIF COUNT_A > 0\n	;アナル\n	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 黑暗精灵少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下级恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『走后门的时候，前面的穴居然在潮吹哦！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『真是淫乱的肛门啊……』\n		ELSE\n			PRINTL 『后庭已经变得这么柔软了啊？』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥的肛穴……好舒服啊…………』\n			ELSE\n			PRINTL 『大姐姐的肛穴……好舒服啊…………』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……肛穴发出啪啪啪的声音！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			IF TALENT:122\n			PRINTL 『摆脱处男了……用大哥哥的菊花摆脱处男了……』\n			ELSE\n			PRINTL 『摆脱处男了……用大姐姐的菊花摆脱处男了……』\n			ENDIF\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『哈哈！！　后庭最棒啦！　用我的精液来给你灌肠！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSE\n	IF RAND:3 == 0\n		PRINTFORML 兽人巨汉，粗鲁地拿%SHE\(\)%来处理精液。\n		PRINTL 『哇哈哈！只有屄穴还算有点用处！』\n	ELSEIF RAND:2 == 0\n		PRINTFORML 妖精们排着队来侵犯%SHE\(\)%的屁股。\n		PRINTL 『嘻嘻嘻嘻～真舒服…』\n	ELSE\n		PRINTL 肥胖的兽人正侵犯着肛门。\n		PRINTL 『啊哈哈！接受我的种子吧！！』\n	ENDIF\nENDIF\n\n\nIF COUNT_A > 0\n	;肛门经验\n	PRINTFORML %EXPNAME:1%\+\{COUNT_A\}\n	EXP:1 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0 && !TALENT:122\n	;私处经验\n	PRINTFORML %EXPNAME:0%\+\{COUNT_V\}\n	EXP:0 \+= COUNT_V\nENDIF\n\nLOCAL:0 = COUNT_A \+ COUNT_V\n\nIF LOCAL:0 > 0\n	;性交经验\n	PRINTFORML %EXPNAME:5%\+\{LOCAL:0\}\n	EXP:5 \+= LOCAL:0\nENDIF\n\nIF COUNT_S > 0\n	;精液经验\n	PRINTFORML %EXPNAME:20%\+\{COUNT_S\}\n	EXP:20 \+= COUNT_S\nENDIF\n\nIF COUNT_F > 0\n	;口交经验\n	PRINTFORML %EXPNAME:22%\+\{COUNT_F\}\n	EXP:22 \+= COUNT_F\nENDIF\n\nIF COUNT_Z > 0\n	;兽奸经验\n	PRINTFORML %EXPNAME:56%\+\{COUNT_Z\}\n	EXP:56 \+= COUNT_Z\nENDIF\n\nIF COUNT_A > 0\n	;肛门\n	PRINTFORML %PALAMNAME:2%点数\+\{COUNT_A\}\n	JUEL:2 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0  && !TALENT:122\n	;私处\n	PRINTFORML %PALAMNAME:1%点数\+\{COUNT_V\}\n	JUEL:1 \+= COUNT_V\nENDIF\n\n\nLOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2\n;处女、高姿态、保守的、看重贞操、高贵で取得率アップ\n;屈服・耻情は元々のものより少し多めになっています\n;V使用回数が50回を超えると屈服に使用回数に比例したボーナスが入ります\nIF LOCAL:0 > 0\n	;屈服・耻情\n	IF CFLAG:661 > 50\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0 \* CFLAG:661 \/ 50\}\n		JUEL:6 \+= LOCAL:0 \* CFLAG:661 \/ 50\n	ELSE\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0\}\n		JUEL:6 \+= LOCAL:0\n	ENDIF\n	PRINTFORML %PALAMNAME:8%点数\+\{LOCAL:0\}\n	JUEL:8 \+= LOCAL:0\nENDIF\n\nLOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\)\n\nIF LOCAL:0 > 0\n	;否定\n	PRINTFORML %PALAMNAME:100%点数\+\{LOCAL:0\}\n	JUEL:100 \+= LOCAL:0\nENDIF\nPRINTFORML %SAVESTR:TARGET%的身体，被弄了\{CFLAG:661\+CFLAG:662\+CFLAG:663\+CFLAG:664\+CFLAG:665\}次，精液流得到处都是……\n\nCALL CAMPAIGN_EXP_PILLORY,TARGET\n\nWAIT\n\n;レベルが強ければもうちょっと耐えられる\nIF JUEL:100 > 120 \+ CFLAG:9 \* 40\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nELSEIF JUEL:100 > 120 \+ 150 \* 40\n	;150レベル以上は長すぎるので強制終了\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nENDIF\n\n;妊娠チェック\nIF COUNT_V > 0\n	CFLAG:107 \+= COUNT_V\n	CALL IN_VAGINA_SYOKU_TO_T\n	CALL CONCEPTION_CHECK_SYOKU_TO_T\nENDIF\n\n\nRETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2430-2451',
        any: [
          /@MAOU_KOUHO\n#DIM TEMP = 0\n#DIM TEMPMAOU = 0\n;--------------------------------------------------------\nFOR COUNT, 1, CHARANUM\n	IF EX_TALENT:COUNT:3\n		TEMP = COUNT\n		\$MAOUCHANGE\n		FOR TEMPMAOU, TEMP, CHARANUM\n			IF EX_TALENT:TEMPMAOU:3 && CFLAG:TEMPMAOU:2 > CFLAG:TEMP:2\n				TEMP = TEMPMAOU\n				GOTO MAOUCHANGE\n			ELSE\n				CONTINUE\n			ENDIF\n		NEXT\n	ELSE\n		CONTINUE\n	ENDIF\nNEXT\nSIF TEMP\n	EX_FLAG:3 = TEMP/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2434',
        any: [/FOR COUNT, 1, CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2435-2436',
        any: [/	IF EX_TALENT:COUNT:3\n		TEMP = COUNT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2437-2445',
        any: [
          /		\$MAOUCHANGE\n		FOR TEMPMAOU, TEMP, CHARANUM\n			IF EX_TALENT:TEMPMAOU:3 && CFLAG:TEMPMAOU:2 > CFLAG:TEMP:2\n				TEMP = TEMPMAOU\n				GOTO MAOUCHANGE\n			ELSE\n				CONTINUE\n			ENDIF\n		NEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2450-2451',
        any: [/SIF TEMP\n	EX_FLAG:3 = TEMP/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2455-2479',
        any: [
          /@MAOU_TENSHIN\n;--------------------------------------------------------\nIF EX_FLAG:3 == GETCHARA\(17\)\n	;上届魔王记录\n	EX_FLAG:0 = MASTER\n	;魔王能力部分转移\n	MAXBASE:\(EX_FLAG:3\):0 \+= \(MAXBASE:MASTER:0 \/ 3\)\n	MAXBASE:\(EX_FLAG:3\):1 \+= \(MAXBASE:MASTER:1 \/ 3\)\n	MASTER = GETCHARA\(17\)\n	EX_FLAG:99 -= 30\n	EX_TALENT:\(EX_FLAG:3\):200 = 1\n	EX_TALENT:\(EX_FLAG:3\):3 = 0\n	FOR COUNT, 0, CHARANUM\n		CFLAG:COUNT:2 = 0\n		SIF TALENT:COUNT:85\n			TALENT:COUNT:85 = 0\n		SIF TALENT:COUNT:86\n			TALENT:COUNT:86 = 0\n	NEXT\nELSE\n	EX_TALENT:\(EX_FLAG:3\):3 = 0\n	CALL TRANSFER_SOUL, EX_FLAG:3, 1\n	EX_FLAG:99 -= 15\n	\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2459',
        any: [/	EX_FLAG:0 = MASTER/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2461',
        any: [/	MAXBASE:\(EX_FLAG:3\):0 \+= \(MAXBASE:MASTER:0 \/ 3\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2462',
        any: [/	MAXBASE:\(EX_FLAG:3\):1 \+= \(MAXBASE:MASTER:1 \/ 3\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2463',
        any: [/	MASTER = GETCHARA\(17\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2464',
        any: [/	EX_FLAG:99 -= 30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2465',
        any: [/	EX_TALENT:\(EX_FLAG:3\):200 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2466',
        any: [/	EX_TALENT:\(EX_FLAG:3\):3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2467-2473',
        any: [
          /	FOR COUNT, 0, CHARANUM\n		CFLAG:COUNT:2 = 0\n		SIF TALENT:COUNT:85\n			TALENT:COUNT:85 = 0\n		SIF TALENT:COUNT:86\n			TALENT:COUNT:86 = 0\n	NEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2475',
        any: [/	EX_TALENT:\(EX_FLAG:3\):3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2476',
        any: [/	CALL TRANSFER_SOUL, EX_FLAG:3, 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2477',
        any: [/	EX_FLAG:99 -= 15/],
      },
      // —— #502：SENGEN_VIDEO_DE（@EVENT_NEXTDAY 的 :184 调用点，本体在
      // 侵略/INVASION.ERB:1269-1281）——
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1274-1277',
        any: [/^[ \t]*IF EX_FLAG:9013 <= 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1278-1281',
        any: [/^[ \t]*IF EX_FLAG:9012 <= 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1271',
        any: [/^[ \t]*EX_FLAG:9013--[ \t]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '1272-1273',
        any: [/^[ \t]*SIF RAND:3[ \t]*$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-nextday-pillory.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1465-2426',
        any: [
          /@PILLORY\n#DIM PILLORY_USER\n#DIM COUNT_F\n#DIM COUNT_A\n#DIM COUNT_B\n#DIM COUNT_V\n#DIM COUNT_S\n#DIM COUNT_Z\n;----------------------------------\n;高姿态、保守的、看重贞操、高贵に特効\n;晒し台状態以外は除外\nSIF CFLAG:1 != 8\n	RETURN 0\n\n;各種回数 Fフェラ Aアナル B胸 V性器 S精液 Z兽奸\nCOUNT_F = 0\nCOUNT_A = 0\nCOUNT_B = 0\nCOUNT_V = 0\nCOUNT_S = 0\nCOUNT_Z = 0\n\n;使用者の代表\nPILLORY_USER = RAND:5\n\nDRAWLINE\nPRINTFORM 示众刑：%SAVESTR:TARGET%\nIF CFLAG:110 == DAY\n	PRINT （出产）\nELSEIF CFLAG:110 - 2 <= DAY && TALENT:153\n	PRINT （临月）\nELSEIF TALENT:153\n	PRINT （怀孕中）\nELSEIF TALENT:0 \n	PRINT （处女）\nELSEIF TALENT:273\n	PRINT （前穴封印）\nENDIF\nPRINTL\nDRAWLINE\nPRINT 被固定在示众台上。\nCALL PRINT_CLOTHTYPE_MAIN2\nPRINTFORML 姿态的%SAVESTR:TARGET%被大群男性围观着。\nPRINTFORM %SAVESTR:TARGET%\nIF CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\n	PRINT 保护着自己的大肚子，\nELSEIF CFLAG:661 \+CFLAG:662  == 0\n	PRINT 不安地颤抖着，\nELSEIF CFLAG:661\+CFLAG:662 < 20\n	PRINT 被多次中出的不快感折磨着，\nELSEIF CFLAG:661\+CFLAG:662 < 50\n	PRINT 无法睡觉，眼睛通红着，\nELSEIF CFLAG:661\+CFLAG:662 <100\n	PRINT 在无穷无尽的凌辱中，奄奄一息地大口喘着气，\nELSE\n	PRINT 全身都被精液沾满了，\nENDIF\n;高贵\nIF TALENT:163\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 咬紧牙关，拼命忍耐着……\n		CASE 1\n			PRINTL 一言不发地忍耐着……\n		CASE 2\n			PRINTL 强压下啜泣的声音，忍耐着……\n	ENDSELECT\n;高姿态、保守的、看重贞操\nELSEIF TALENT:15 \|\| TALENT:24 \|\| TALENT:30\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 不停地扭动着身体企图阻止侵犯……\n		CASE 1\n			PRINTFORML 用凶悍的眼神瞪着凌辱%SHE\(\)%的人……\n		CASE 2\n			PRINTL 发出了怨恨的声音……\n	ENDSELECT\nELSE\n	PRINTL 忍受着耻辱……\nENDIF\n\nPRINTL\n;落書きスタート\n;臨月\nIF CFLAG:110 - 2 <= DAY && TALENT:153\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『淫乱的大肚便器，小%SAVESTR:TARGET%～』\n		CASE 1\n			PRINTFORM 『快临盘了，但是还是不能忘掉鸡鸡的味道～』\n		CASE 2\n			PRINTFORM 『咦……这样淫乱的妈妈好讨厌～』\n	ENDSELECT\nELSEIF TALENT:153\n;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『祝贺怀孕！』\n		CASE 1\n			PRINTFORM 『随便怀孕不知廉耻的小%SAVESTR:TARGET%～』\n		CASE 2\n			PRINTFORM 『怀着不知道父亲是谁的孩子！』\n	ENDSELECT\nELSE\n	SELECTCASE RAND:6\n		CASE 0\n			PRINTFORM 『精液便器，小%SAVESTR:TARGET%哦～』\n		CASE 1\n			PRINTFORM 『请惩罚%SAVESTR:TARGET%吧！』\n		CASE 2\n			PRINTFORM 『请随意使用。』\n		CASE 3\n			PRINTFORM 『性处理用便器』\n		CASE 4\n			PRINTFORM 『男厕所』\n		CASE 5\n			SIF !TALENT:122\n			PRINTFORM 『最爱鸡鸡的婊子便器女』\n	ENDSELECT\nENDIF\n\nREPEAT 10\n	;職業による分岐\n	LOCAL = COUNT \+ 200\n	SIF TALENT:LOCAL > 0\n		LOCALS = %TALENTNAME:LOCAL%\n	;これ以降%locals:0%で職業名が出せます\n	IF TALENT:LOCAL > 0 && \(TALENT:0 \|\| TALENT:273\)\n		;性器使えない\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『%SAVESTR:TARGET%是肛门特别有感觉的变态%TALENTNAME:LOCAL%』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，是各位专用的变态肛交妻』\n			CASE 2\n				PRINTFORM 『前穴是魔王大人的专用通道！』\n		ENDSELECT\n	ELSEIF TALENT:LOCAL > 0\n		;性器使える\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『用肉穴向大家道歉』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，除了中出，做什么都可以』\n			CASE 2\n				PRINTFORM 『免清洗的阴茎入口』\n		ENDSELECT\n	ENDIF\nREND\n\nIF TALENT:0\n	PRINTFORM 『处女』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF TALENT:273\n	PRINTFORM 『菊花专用』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF ABL:39 >= 1 && RAND:2 == 0\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『谁的鸡鸡都OK！』\n		CASE 1\n			PRINTFORM 『最爱兽奸！』\n		CASE 2\n			PRINTFORM 『兽奸死忠』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	;貞操帯\n	SIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n		COUNT_V = 0\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\n	COUNT_Z \+= COUNT_S\nELSEIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n	;貞操帯\n	PRINTFORM 『私处禁入！』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSE\n	SELECTCASE RAND:4\n		CASE 0\n			PRINTFORM 『什么都可以放进去』\n		CASE 1\n			PRINTFORM 『精液的垃圾箱』\n		CASE 2\n			PRINTFORM 『淫乱』\n		CASE 3\n			PRINTFORM 『中出记录更新中』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\nENDIF\n\nIF TALENT:15\n	;高姿态\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『自尊心很高的便器哦！』\n		CASE 1\n			PRINT 『\n			IF TALENT:314 == 0\n				PRINT 人类\n			ELSEIF TALENT:314 == 1\n				PRINT 精灵\n			ELSEIF TALENT:314 == 2\n				PRINT 狼人\n			ELSEIF TALENT:314 == 3\n				PRINT 吸血鬼\n			ELSEIF TALENT:314 == 4\n				PRINT 无头骑士\n			ELSEIF TALENT:314 == 5\n				PRINT 龙族\n			ELSEIF TALENT:314 == 6\n				PRINT 天使\n			ELSEIF TALENT:314 == 7\n				PRINT 暗精灵\n			ELSEIF TALENT:314 == 8\n				PRINT 堕天使\n			ELSEIF TALENT:314 == 9\n				PRINT 魔族\n			ELSEIF TALENT:314 == 10\n				PRINT 霍比特人\n			ELSEIF TALENT:314 == 11\n				PRINT 矮人\n			ENDIF\n			PRINT 之耻』\n		CASE 2\n			PRINT 『死脑筋』\n	ENDSELECT\nENDIF\n\nIF TALENT:22 \|\| TALENT:21\n	;感情淡薄・冷漠\n	PRINT 『性冷淡』\nENDIF\n\n\nIF TALENT:24 \|\| TALENT:30 \|\| TALENT:163\n	;保守的・看重贞操・高贵\n	SELECTCASE RAND:5\n		CASE 0\n			IF  TALENT:122\n				PRINT 『某家的大少爷』\n			ELSE\n				PRINT 『某家的大小姐』\n			ENDIF\n		CASE 1\n			IF TALENT:0 \|\| TALENT:273 \|\| TALENT:122\n				PRINT 『享受名门世家的肛门吧』\n			ELSE\n				PRINT 『享受名门世家的小穴吧』\n			ENDIF\n		CASE 2\n			PRINT 『我很幼稚，请大家用肉棒来教育我吧！』\n		CASE 3\n			IF  TALENT:122\n				PRINT 『大少爷』\n			ELSE\n				PRINT 『大小姐』 \n			ENDIF\n	ENDSELECT\nENDIF\nIF TALENT:42\n	;容易湿\n	PRINT 『马上就湿的荡妇』\nENDIF\n\nIF TALENT:61\n	;不怕污臭・反感污臭\n	SELECTCASE RAND:5\n		CASE 0\n			PRINT 『喜欢脏东西』\n		CASE 1\n			PRINT 『请让我舔大家的屁股』\n		CASE 2\n			PRINT 『肮脏的小鸡鸡优先』\n		CASE 3\n			PRINT 『热烈欢迎脏东西』\n		CASE 4\n			PRINT 『做完之后记得尿我身上哦！』\n	ENDSELECT\nENDIF\n\nIF TALENT:70 \|\| TALENT:73\n	;接受快感・容易陷落\n	PRINT 『BITCH』\nENDIF\n\nIF TALENT:82\n	;讨厌男人\n	SELECTCASE RAND:3\n		CASE 0\n			SIF !TALENT:122\n			PRINTFORM 『变态百合女』\n		CASE 1\n			PRINT 『我想跟女孩子做爱』\n		CASE 2\n			PRINT 『谢绝男人的小鸡鸡』\n	ENDSELECT\nENDIF\n\nIF TALENT:100\n	;娇小\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『%SAVESTR:TARGET%，八岁』\n		CASE 1\n			PRINT 『←死小孩』\n		CASE 2\n			PRINT 『小孩肉穴』\n	ENDSELECT\nENDIF\n\nIF TALENT:109 \|\| TALENT:116\n	;贫乳・绝壁\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『砧板一样的，真对不起！』 \n		CASE 1\n			PRINT 『大家来帮我揉大吧！』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『前后一致的女人』\n	ENDSELECT\nENDIF\n\nIF TALENT:110 \|\| TALENT:114 \|\| TALENT:119\n	;巨乳・爆乳・超乳\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『大胸部』 \n		CASE 1\n			PRINT 『笨蛋乳』\n		CASE 2\n			PRINT 『胸大无脑』\n	ENDSELECT\nENDIF\n\nIF TALENT:121\n	;ふたなり\n	IF TALENT:阴茎的状态 == 1\n		PRINT 『肉棒耶～』\n	ELSEIF TALENT:阴茎的状态 == 2\n		PRINT 『短小包茎的小鸡鸡漏出精液了哦～』\n	ELSEIF TALENT:阴茎的状态 == 3\n		PRINT 『这鸡鸡啊……』\n	ELSEIF TALENT:阴茎的状态 == 4\n		PRINT 『改造的马鞭！』\n	ELSE\n		PRINT 『肉棒勃起ing』\n	ENDIF\nELSEIF TALENT:122\n	;オトコ\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『人妖小子』\n		CASE 1\n			PRINT 『男娼』\n		CASE 2\n			PRINT 『喜欢被操的男人』\n	ENDSELECT\nENDIF\n\nIF TALENT:248\n	;肌肉型\n	PRINT 『大猩猩』\nENDIF\n\nIF TALENT:恋母情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『妈妈快来看～』 \n		CASE 1\n			PRINT 『妈妈救救我～』\n		CASE 2\n			PRINT 『比妈妈更淫乱』\n	ENDSELECT\nENDIF\n\nIF TALENT:恋父情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『爸爸快来看～』 \n		CASE 1\n			PRINT 『想要爸爸的小鸡鸡～』\n		CASE 2\n			PRINT 『爸爸的鸡鸡最棒！』\n	ENDSELECT\nENDIF\n\nIF TALENT:萝莉控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『萝莉猪』 \n		CASE 1\n			PRINT 『因为萝莉的小穴而兴奋』\n		CASE 2\n			PRINT 『淫乱萝莉控』\n	ENDSELECT\nENDIF\n\nIF TALENT:正太控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『正太专用便器』 \n		CASE 1\n			PRINT 『正太小鸡鸡爱好者』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『对不起，我是痴女』\n	ENDSELECT\nENDIF\n\nIF TALENT:153\n	;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『恭喜怀孕！』\n		CASE 1\n			PRINT 『十分感谢大家让我怀孕』\n		CASE 2\n			PRINT 『长枪体内过，腹中婴儿来』\n	ENDSELECT\nENDIF\n\nSELECTCASE RAND:14\n	CASE 0\n		PRINT 『浑身的精液臭味真对不起！』 \n	CASE 1\n		PRINT 『勇者之耻』\n	CASE 2\n		PRINT 『热烈欢迎不负责任的中出』\n	CASE 3\n		PRINTFORM 『记住%SAVESTR:TARGET%这个名字哦！』 \n	CASE 4\n		PRINT 『喜欢一边被殴打，一边被侵犯』 \n	CASE 5\n		PRINT 『弱小的』 \n	CASE 6\n		SIF !TALENT:122\n		PRINT 『我们的目标是——黑木耳』 \n	CASE 7\n		PRINT 『里面请用精液来好好关爱』 \n	CASE 8\n		PRINT 『ＷＣ』\n	CASE 9\n		SIF !TALENT:122\n		PRINT 『请侵犯来自遥远农村的私处』\n	CASE 10\n		PRINT 『请卜滋卜滋干个爽吧』 \n	CASE 11\n		PRINT 『想要你的阴茎』\n	CASE 12\n		PRINTFORM 『好色的%LOCALS%』\n	CASE 13\n		PRINTFORM 『肉穴%LOCALS%』 \nENDSELECT\n\nIF CFLAG:661 >=30\n	IF COUNT_V > 0\n		;臨月\n		IF \(CFLAG:110 - 2 <= DAY && TALENT:153\)\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%在怀孕期间也性欲旺盛着』 \n				CASE 1\n					PRINT 『怀孕中，母乳畅饮』\n				CASE 2\n					PRINT 『怀上了不知父亲是谁的孩子』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『孕妇』 \n				CASE 6\n					PRINT 『肚子大了』 \n				CASE 7\n					PRINT 『给小宝宝精液吧！』 \n				CASE 8\n					PRINT 『怀孕以后屄里的肉褶越来越多了哦』\n				CASE 9\n					PRINT 『啊～大肚子真碍事～』\n			ENDSELECT\n		;妊娠\n		ELSEIF TALENT:153\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%稍微胖了吗？』 \n				CASE 1\n					PRINT 『这家伙受精了吗？』\n				CASE 2\n					PRINT 『受精了』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『战败纪念受精』\n				CASE 6\n					PRINT 『托各位的福，胸变大了←怀孕了而已吧』\n				CASE 7\n					SIF !TALENT:122\n					PRINT 『月经已停』 \n				CASE 8\n					PRINT 『乳头变得黑起来了』\n				CASE 9\n					PRINT 『让这家伙的肚子越来越大真的没问题吗？』\n			ENDSELECT\n		ELSE\n			;妊娠してない\n			SELECTCASE RAND:12\n				CASE 0\n					PRINT 『现在肉穴松弛了』 \n				CASE 1\n					PRINT 『被干怀孕了谢谢大家』\n				CASE 2\n					PRINT 『不管什么都好，想要怀孕啊～』\n				CASE 3\n					PRINTFORM 『来领养%SAVESTR:TARGET%的宝宝吧』 \n				CASE 4\n					PRINT 『过于风流』 \n				CASE 5\n					PRINT 『确认怀孕』 \n				CASE 6\n					PRINT 『感谢精液』 \n				CASE 7\n					PRINT 『渴望受精！』 \n				CASE 8\n					PRINT 『这家伙的肉穴太厉害了』\n				CASE 9\n					SIF !TALENT:122\n					PRINT 『小穴变一层层了』\n				CASE 10\n					PRINT 『←摇啊摇』\n				CASE 11\n					PRINT 『↓插啊插』\n			ENDSELECT\n		ENDIF\n	ELSE\n		SELECTCASE RAND:10\n			CASE 0\n				PRINT 『用的太多，尻穴开始松弛了』 \n			CASE 1\n				PRINT 『粪穴太松了』\n			CASE 2\n				PRINT 『屁股真漂亮』\n			CASE 3\n				PRINT 『太臭了』\n			CASE 4\n				SIF !TALENT:122 && TALENT:0\n				PRINT 『明明是处女，肛门却很淫荡』 \n			CASE 5\n				PRINT 『请让我的肛门喝很多精液吧』\n			CASE 6\n				PRINT 『啊啊……括约肌断了。』\n			CASE 7\n				PRINT 『这家伙的粪穴真臭』\n			CASE 8\n				PRINT 『肛交便器』\n			CASE 9\n				PRINT 『用肛门向大家道歉』\n		ENDSELECT\n	ENDIF\nENDIF\n\n;正の字を書こう\n;CFLAG:661を晒し台での精液经验に使います\n;晒し台から开放されるとリセット\n;COUNT_Vの使用数\nCFLAG:661 \+= COUNT_V\n;COUNT_Aの使用数\nCFLAG:662 \+= COUNT_A\n;口の使用数\nCFLAG:663 \+= COUNT_F\n;胸の使用数\nCFLAG:664 \+= COUNT_B\n;その他の使用数\nCFLAG:665 \+= COUNT_S - COUNT_V - COUNT_A - COUNT_F - COUNT_B\nREPEAT 5\n;使用回数があるならば\n	IF CFLAG:\(661\+COUNT\) > 0\n		SELECTCASE COUNT\n			CASE 0\n				SELECTCASE RAND:5\n					CASE 0\n						PRINT 『肉穴使用次数：\n					CASE 1\n						PRINT 『中出次数：\n					CASE 2\n						PRINT 『性经验急速上升中：\n					CASE 3\n						SIF !TALENT:122\n						PRINT 『小穴：\n					CASE 4\n						PRINT 『被播种：\n				ENDSELECT\n			CASE 1\n				SELECTCASE RAND:4\n					CASE 0\n						PRINT 『肛门使用次数：\n					CASE 1\n						PRINT 『菊穴使用次数：\n					CASE 2\n						PRINT 『菊穴：\n					CASE 3\n						PRINT 『屁股：\n				ENDSELECT\n			CASE 2\n				SELECTCASE RAND:3\n					CASE 0\n						PRINT 『嘴巴：\n					CASE 1\n						PRINT 『污垢处理：\n					CASE 2\n						PRINT 『口爆：\n				ENDSELECT\n			CASE 3\n				SELECTCASE RAND:2\n					CASE 0\n						PRINT 『胸部：\n					CASE 1\n						PRINT 『乳房：\n				ENDSELECT\n			CASE 4\n				PRINT 『\n		ENDSELECT\n		IF CFLAG:\(661\+COUNT\) >= 5\n			FOR LOCAL, 0, CFLAG:\(661\+COUNT\) \/5\n				PRINT 正 \n			NEXT\n		ENDIF\n		;５で割ったあまりを出します\n		SELECTCASE CFLAG:\(661\+COUNT\) % 5\n			CASE 1\n				PRINT 一\n			CASE 2\n				PRINT 丅\n			CASE 3\n				PRINT 下\n			CASE 4\n				PRINT 㠪\n		ENDSELECT\n		PRINT 』\n	ELSE\n	ENDIF\nREND\n\nSIF CFLAG:661 > 9\n	PRINT 『真的一个打十个！』\nSIF CFLAG:661 > 29\n	PRINT 『突破三十！！』\nSIF CFLAG:661 > 49\n	PRINT 『祝贺！达成了五十！！！』\nSIF CFLAG:661 > 99\n	PRINT 『正字写太多了，有点恶心』\nPRINTL\nPRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……\n\nWAIT\n\nPRINTL\n\nIF COUNT_Z > 0\n	;兽奸	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	IF PILLORY_USER == 1\n		PRINT 魔兽\n	ELSEIF PILLORY_USER == 2\n		PRINT 猪\n	ELSEIF PILLORY_USER == 3\n		PRINT 小马\n	ELSEIF PILLORY_USER == 4\n		PRINT 狗\n	ELSE\n		PRINT 狗\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF RAND:3 == 0\n		PRINT 『这个大变态！　\n		IF PILLORY_USER == 1\n			PRINT 魔兽\n		ELSEIF PILLORY_USER == 2\n			PRINT 猪\n		ELSEIF PILLORY_USER == 3\n			PRINT 小马\n		ELSEIF PILLORY_USER == 4\n			PRINT 狗\n		ELSE\n			PRINT 狗\n		ENDIF\n		PRINTL 的小鸡鸡就这么舒服么』\n	ELSEIF RAND:2 == 0\n		PRINTL 『讨厌，像野兽一样……』\n	ELSE\n		PRINTL 『感觉如何！？大声说交配很舒服！』\n	ENDIF\nELSEIF COUNT_A > 0 && COUNT_V > 0\n	;A&V\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 暗精灵的少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下等恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『做吧！真正的免费小穴！』\n		ELSEIF RAND:2 == 0\n			PRINTL 魔族男人舒畅地射精了。\n			PRINTL 『不准漏出来，你敢漏出来就给你塞嘴里』\n		ELSE\n			PRINTL 『要…流出来了！』『喂！太快了吧！我再给你塞上……』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥……我已经忍不住了！』\n			ELSE\n			PRINTL 『大姐姐……我已经忍不住了！』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……全部出来了！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			SIF !TALENT:122\n			PRINTL 『大姐姐！～大姐姐！』\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『啊哈！！肛门也很舒服！来，怀上我的孩子吧！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSEIF COUNT_A > 0\n	;アナル\n	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 黑暗精灵少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下级恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『走后门的时候，前面的穴居然在潮吹哦！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『真是淫乱的肛门啊……』\n		ELSE\n			PRINTL 『后庭已经变得这么柔软了啊？』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥的肛穴……好舒服啊…………』\n			ELSE\n			PRINTL 『大姐姐的肛穴……好舒服啊…………』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……肛穴发出啪啪啪的声音！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			IF TALENT:122\n			PRINTL 『摆脱处男了……用大哥哥的菊花摆脱处男了……』\n			ELSE\n			PRINTL 『摆脱处男了……用大姐姐的菊花摆脱处男了……』\n			ENDIF\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『哈哈！！　后庭最棒啦！　用我的精液来给你灌肠！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSE\n	IF RAND:3 == 0\n		PRINTFORML 兽人巨汉，粗鲁地拿%SHE\(\)%来处理精液。\n		PRINTL 『哇哈哈！只有屄穴还算有点用处！』\n	ELSEIF RAND:2 == 0\n		PRINTFORML 妖精们排着队来侵犯%SHE\(\)%的屁股。\n		PRINTL 『嘻嘻嘻嘻～真舒服…』\n	ELSE\n		PRINTL 肥胖的兽人正侵犯着肛门。\n		PRINTL 『啊哈哈！接受我的种子吧！！』\n	ENDIF\nENDIF\n\n\nIF COUNT_A > 0\n	;肛门经验\n	PRINTFORML %EXPNAME:1%\+\{COUNT_A\}\n	EXP:1 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0 && !TALENT:122\n	;私处经验\n	PRINTFORML %EXPNAME:0%\+\{COUNT_V\}\n	EXP:0 \+= COUNT_V\nENDIF\n\nLOCAL:0 = COUNT_A \+ COUNT_V\n\nIF LOCAL:0 > 0\n	;性交经验\n	PRINTFORML %EXPNAME:5%\+\{LOCAL:0\}\n	EXP:5 \+= LOCAL:0\nENDIF\n\nIF COUNT_S > 0\n	;精液经验\n	PRINTFORML %EXPNAME:20%\+\{COUNT_S\}\n	EXP:20 \+= COUNT_S\nENDIF\n\nIF COUNT_F > 0\n	;口交经验\n	PRINTFORML %EXPNAME:22%\+\{COUNT_F\}\n	EXP:22 \+= COUNT_F\nENDIF\n\nIF COUNT_Z > 0\n	;兽奸经验\n	PRINTFORML %EXPNAME:56%\+\{COUNT_Z\}\n	EXP:56 \+= COUNT_Z\nENDIF\n\nIF COUNT_A > 0\n	;肛门\n	PRINTFORML %PALAMNAME:2%点数\+\{COUNT_A\}\n	JUEL:2 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0  && !TALENT:122\n	;私处\n	PRINTFORML %PALAMNAME:1%点数\+\{COUNT_V\}\n	JUEL:1 \+= COUNT_V\nENDIF\n\n\nLOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2\n;处女、高姿态、保守的、看重贞操、高贵で取得率アップ\n;屈服・耻情は元々のものより少し多めになっています\n;V使用回数が50回を超えると屈服に使用回数に比例したボーナスが入ります\nIF LOCAL:0 > 0\n	;屈服・耻情\n	IF CFLAG:661 > 50\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0 \* CFLAG:661 \/ 50\}\n		JUEL:6 \+= LOCAL:0 \* CFLAG:661 \/ 50\n	ELSE\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0\}\n		JUEL:6 \+= LOCAL:0\n	ENDIF\n	PRINTFORML %PALAMNAME:8%点数\+\{LOCAL:0\}\n	JUEL:8 \+= LOCAL:0\nENDIF\n\nLOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\)\n\nIF LOCAL:0 > 0\n	;否定\n	PRINTFORML %PALAMNAME:100%点数\+\{LOCAL:0\}\n	JUEL:100 \+= LOCAL:0\nENDIF\nPRINTFORML %SAVESTR:TARGET%的身体，被弄了\{CFLAG:661\+CFLAG:662\+CFLAG:663\+CFLAG:664\+CFLAG:665\}次，精液流得到处都是……\n\nCALL CAMPAIGN_EXP_PILLORY,TARGET\n\nWAIT\n\n;レベルが強ければもうちょっと耐えられる\nIF JUEL:100 > 120 \+ CFLAG:9 \* 40\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nELSEIF JUEL:100 > 120 \+ 150 \* 40\n	;150レベル以上は長すぎるので強制終了\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nENDIF\n\n;妊娠チェック\nIF COUNT_V > 0\n	CFLAG:107 \+= COUNT_V\n	CALL IN_VAGINA_SYOKU_TO_T\n	CALL CONCEPTION_CHECK_SYOKU_TO_T\nENDIF\n\n\nRETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1476-1477',
        any: [/SIF CFLAG:1 != 8\n	RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1480-1488',
        any: [
          /COUNT_F = 0\nCOUNT_A = 0\nCOUNT_B = 0\nCOUNT_V = 0\nCOUNT_S = 0\nCOUNT_Z = 0\n\n;使用者の代表\nPILLORY_USER = RAND:5/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1488',
        any: [/PILLORY_USER = RAND:5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1490-1491',
        any: [/DRAWLINE\nPRINTFORM 示众刑：%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1491',
        any: [/PRINTFORM 示众刑：%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1492-1493',
        any: [/IF CFLAG:110 == DAY\n	PRINT （出产）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1494-1495',
        any: [/ELSEIF CFLAG:110 - 2 <= DAY && TALENT:153\n	PRINT （临月）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1496-1497',
        any: [/ELSEIF TALENT:153\n	PRINT （怀孕中）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1498-1499',
        any: [/ELSEIF TALENT:0 \n	PRINT （处女）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1500-1501',
        any: [/ELSEIF TALENT:273\n	PRINT （前穴封印）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1500-1503',
        any: [/ELSEIF TALENT:273\n	PRINT （前穴封印）\nENDIF\nPRINTL/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1504-1505',
        any: [/DRAWLINE\nPRINT 被固定在示众台上。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1505-1508',
        any: [
          /PRINT 被固定在示众台上。\nCALL PRINT_CLOTHTYPE_MAIN2\nPRINTFORML 姿态的%SAVESTR:TARGET%被大群男性围观着。\nPRINTFORM %SAVESTR:TARGET%/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1509-1521',
        any: [
          /IF CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\n	PRINT 保护着自己的大肚子，\nELSEIF CFLAG:661 \+CFLAG:662  == 0\n	PRINT 不安地颤抖着，\nELSEIF CFLAG:661\+CFLAG:662 < 20\n	PRINT 被多次中出的不快感折磨着，\nELSEIF CFLAG:661\+CFLAG:662 < 50\n	PRINT 无法睡觉，眼睛通红着，\nELSEIF CFLAG:661\+CFLAG:662 <100\n	PRINT 在无穷无尽的凌辱中，奄奄一息地大口喘着气，\nELSE\n	PRINT 全身都被精液沾满了，\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1523-1531',
        any: [
          /IF TALENT:163\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 咬紧牙关，拼命忍耐着……\n		CASE 1\n			PRINTL 一言不发地忍耐着……\n		CASE 2\n			PRINTL 强压下啜泣的声音，忍耐着……\n	ENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1533-1541',
        any: [
          /ELSEIF TALENT:15 \|\| TALENT:24 \|\| TALENT:30\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTL 不停地扭动着身体企图阻止侵犯……\n		CASE 1\n			PRINTFORML 用凶悍的眼神瞪着凌辱%SHE\(\)%的人……\n		CASE 2\n			PRINTL 发出了怨恨的声音……\n	ENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1543',
        any: [/	PRINTL 忍受着耻辱……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1543-1546',
        any: [/	PRINTL 忍受着耻辱……\nENDIF\n\nPRINTL/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1549-1584',
        any: [
          /IF CFLAG:110 - 2 <= DAY && TALENT:153\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『淫乱的大肚便器，小%SAVESTR:TARGET%～』\n		CASE 1\n			PRINTFORM 『快临盘了，但是还是不能忘掉鸡鸡的味道～』\n		CASE 2\n			PRINTFORM 『咦……这样淫乱的妈妈好讨厌～』\n	ENDSELECT\nELSEIF TALENT:153\n;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『祝贺怀孕！』\n		CASE 1\n			PRINTFORM 『随便怀孕不知廉耻的小%SAVESTR:TARGET%～』\n		CASE 2\n			PRINTFORM 『怀着不知道父亲是谁的孩子！』\n	ENDSELECT\nELSE\n	SELECTCASE RAND:6\n		CASE 0\n			PRINTFORM 『精液便器，小%SAVESTR:TARGET%哦～』\n		CASE 1\n			PRINTFORM 『请惩罚%SAVESTR:TARGET%吧！』\n		CASE 2\n			PRINTFORM 『请随意使用。』\n		CASE 3\n			PRINTFORM 『性处理用便器』\n		CASE 4\n			PRINTFORM 『男厕所』\n		CASE 5\n			SIF !TALENT:122\n			PRINTFORM 『最爱鸡鸡的婊子便器女』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1581-1582',
        any: [/			SIF !TALENT:122\n			PRINTFORM 『最爱鸡鸡的婊子便器女』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1586-1613',
        any: [
          /REPEAT 10\n	;職業による分岐\n	LOCAL = COUNT \+ 200\n	SIF TALENT:LOCAL > 0\n		LOCALS = %TALENTNAME:LOCAL%\n	;これ以降%locals:0%で職業名が出せます\n	IF TALENT:LOCAL > 0 && \(TALENT:0 \|\| TALENT:273\)\n		;性器使えない\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『%SAVESTR:TARGET%是肛门特别有感觉的变态%TALENTNAME:LOCAL%』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，是各位专用的变态肛交妻』\n			CASE 2\n				PRINTFORM 『前穴是魔王大人的专用通道！』\n		ENDSELECT\n	ELSEIF TALENT:LOCAL > 0\n		;性器使える\n		SELECTCASE RAND:3\n			CASE 0\n				PRINTFORM 『用肉穴向大家道歉』\n			CASE 1\n				PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，除了中出，做什么都可以』\n			CASE 2\n				PRINTFORM 『免清洗的阴茎入口』\n		ENDSELECT\n	ENDIF\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1615-1663',
        any: [
          /IF TALENT:0\n	PRINTFORM 『处女』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF TALENT:273\n	PRINTFORM 『菊花专用』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSEIF ABL:39 >= 1 && RAND:2 == 0\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『谁的鸡鸡都OK！』\n		CASE 1\n			PRINTFORM 『最爱兽奸！』\n		CASE 2\n			PRINTFORM 『兽奸死忠』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	;貞操帯\n	SIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n		COUNT_V = 0\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\n	COUNT_Z \+= COUNT_S\nELSEIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n	;貞操帯\n	PRINTFORM 『私处禁入！』\n	COUNT_A \+= RAND:20 \+ 1\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_A \+ COUNT_F \+ RAND:10\nELSE\n	SELECTCASE RAND:4\n		CASE 0\n			PRINTFORM 『什么都可以放进去』\n		CASE 1\n			PRINTFORM 『精液的垃圾箱』\n		CASE 2\n			PRINTFORM 『淫乱』\n		CASE 3\n			PRINTFORM 『中出记录更新中』\n	ENDSELECT\n	COUNT_F \+= RAND:10 \+ 1\n	COUNT_V \+= RAND:10 \+ 1\n	COUNT_A \+= RAND:10 \+ 1\n	COUNT_S \+= COUNT_F \+ COUNT_A \+ COUNT_V \+ RAND:10\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1616',
        any: [/	PRINTFORM 『处女』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1621',
        any: [/	PRINTFORM 『菊花专用』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1628-1632',
        any: [
          /			PRINTFORM 『谁的鸡鸡都OK！』\n		CASE 1\n			PRINTFORM 『最爱兽奸！』\n		CASE 2\n			PRINTFORM 『兽奸死忠』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1637-1638',
        any: [
          /	SIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37\n		COUNT_V = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1644',
        any: [/	PRINTFORM 『私处禁入！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1650-1657',
        any: [
          /		CASE 0\n			PRINTFORM 『什么都可以放进去』\n		CASE 1\n			PRINTFORM 『精液的垃圾箱』\n		CASE 2\n			PRINTFORM 『淫乱』\n		CASE 3\n			PRINTFORM 『中出记录更新中』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1665-1701',
        any: [
          /IF TALENT:15\n	;高姿态\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『自尊心很高的便器哦！』\n		CASE 1\n			PRINT 『\n			IF TALENT:314 == 0\n				PRINT 人类\n			ELSEIF TALENT:314 == 1\n				PRINT 精灵\n			ELSEIF TALENT:314 == 2\n				PRINT 狼人\n			ELSEIF TALENT:314 == 3\n				PRINT 吸血鬼\n			ELSEIF TALENT:314 == 4\n				PRINT 无头骑士\n			ELSEIF TALENT:314 == 5\n				PRINT 龙族\n			ELSEIF TALENT:314 == 6\n				PRINT 天使\n			ELSEIF TALENT:314 == 7\n				PRINT 暗精灵\n			ELSEIF TALENT:314 == 8\n				PRINT 堕天使\n			ELSEIF TALENT:314 == 9\n				PRINT 魔族\n			ELSEIF TALENT:314 == 10\n				PRINT 霍比特人\n			ELSEIF TALENT:314 == 11\n				PRINT 矮人\n			ENDIF\n			PRINT 之耻』\n		CASE 2\n			PRINT 『死脑筋』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1671-1697',
        any: [
          /			PRINT 『\n			IF TALENT:314 == 0\n				PRINT 人类\n			ELSEIF TALENT:314 == 1\n				PRINT 精灵\n			ELSEIF TALENT:314 == 2\n				PRINT 狼人\n			ELSEIF TALENT:314 == 3\n				PRINT 吸血鬼\n			ELSEIF TALENT:314 == 4\n				PRINT 无头骑士\n			ELSEIF TALENT:314 == 5\n				PRINT 龙族\n			ELSEIF TALENT:314 == 6\n				PRINT 天使\n			ELSEIF TALENT:314 == 7\n				PRINT 暗精灵\n			ELSEIF TALENT:314 == 8\n				PRINT 堕天使\n			ELSEIF TALENT:314 == 9\n				PRINT 魔族\n			ELSEIF TALENT:314 == 10\n				PRINT 霍比特人\n			ELSEIF TALENT:314 == 11\n				PRINT 矮人\n			ENDIF\n			PRINT 之耻』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1703-1706',
        any: [
          /IF TALENT:22 \|\| TALENT:21\n	;感情淡薄・冷漠\n	PRINT 『性冷淡』\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1709-1733',
        any: [
          /IF TALENT:24 \|\| TALENT:30 \|\| TALENT:163\n	;保守的・看重贞操・高贵\n	SELECTCASE RAND:5\n		CASE 0\n			IF  TALENT:122\n				PRINT 『某家的大少爷』\n			ELSE\n				PRINT 『某家的大小姐』\n			ENDIF\n		CASE 1\n			IF TALENT:0 \|\| TALENT:273 \|\| TALENT:122\n				PRINT 『享受名门世家的肛门吧』\n			ELSE\n				PRINT 『享受名门世家的小穴吧』\n			ENDIF\n		CASE 2\n			PRINT 『我很幼稚，请大家用肉棒来教育我吧！』\n		CASE 3\n			IF  TALENT:122\n				PRINT 『大少爷』\n			ELSE\n				PRINT 『大小姐』 \n			ENDIF\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1734-1737',
        any: [/IF TALENT:42\n	;容易湿\n	PRINT 『马上就湿的荡妇』\nENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1739-1753',
        any: [
          /IF TALENT:61\n	;不怕污臭・反感污臭\n	SELECTCASE RAND:5\n		CASE 0\n			PRINT 『喜欢脏东西』\n		CASE 1\n			PRINT 『请让我舔大家的屁股』\n		CASE 2\n			PRINT 『肮脏的小鸡鸡优先』\n		CASE 3\n			PRINT 『热烈欢迎脏东西』\n		CASE 4\n			PRINT 『做完之后记得尿我身上哦！』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1755-1758',
        any: [
          /IF TALENT:70 \|\| TALENT:73\n	;接受快感・容易陷落\n	PRINT 『BITCH』\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1760-1771',
        any: [
          /IF TALENT:82\n	;讨厌男人\n	SELECTCASE RAND:3\n		CASE 0\n			SIF !TALENT:122\n			PRINTFORM 『变态百合女』\n		CASE 1\n			PRINT 『我想跟女孩子做爱』\n		CASE 2\n			PRINT 『谢绝男人的小鸡鸡』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1773-1783',
        any: [
          /IF TALENT:100\n	;娇小\n	SELECTCASE RAND:3\n		CASE 0\n			PRINTFORM 『%SAVESTR:TARGET%，八岁』\n		CASE 1\n			PRINT 『←死小孩』\n		CASE 2\n			PRINT 『小孩肉穴』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1785-1796',
        any: [
          /IF TALENT:109 \|\| TALENT:116\n	;贫乳・绝壁\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『砧板一样的，真对不起！』 \n		CASE 1\n			PRINT 『大家来帮我揉大吧！』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『前后一致的女人』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1798-1808',
        any: [
          /IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119\n	;巨乳・爆乳・超乳\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『大胸部』 \n		CASE 1\n			PRINT 『笨蛋乳』\n		CASE 2\n			PRINT 『胸大无脑』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1810-1822',
        any: [
          /IF TALENT:121\n	;ふたなり\n	IF TALENT:阴茎的状态 == 1\n		PRINT 『肉棒耶～』\n	ELSEIF TALENT:阴茎的状态 == 2\n		PRINT 『短小包茎的小鸡鸡漏出精液了哦～』\n	ELSEIF TALENT:阴茎的状态 == 3\n		PRINT 『这鸡鸡啊……』\n	ELSEIF TALENT:阴茎的状态 == 4\n		PRINT 『改造的马鞭！』\n	ELSE\n		PRINT 『肉棒勃起ing』\n	ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1823-1833',
        any: [
          /ELSEIF TALENT:122\n	;オトコ\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『人妖小子』\n		CASE 1\n			PRINT 『男娼』\n		CASE 2\n			PRINT 『喜欢被操的男人』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1835-1838',
        any: [/IF TALENT:248\n	;肌肉型\n	PRINT 『大猩猩』\nENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1840-1849',
        any: [
          /IF TALENT:恋母情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『妈妈快来看～』 \n		CASE 1\n			PRINT 『妈妈救救我～』\n		CASE 2\n			PRINT 『比妈妈更淫乱』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1851-1860',
        any: [
          /IF TALENT:恋父情结\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『爸爸快来看～』 \n		CASE 1\n			PRINT 『想要爸爸的小鸡鸡～』\n		CASE 2\n			PRINT 『爸爸的鸡鸡最棒！』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1862-1871',
        any: [
          /IF TALENT:萝莉控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『萝莉猪』 \n		CASE 1\n			PRINT 『因为萝莉的小穴而兴奋』\n		CASE 2\n			PRINT 『淫乱萝莉控』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1873-1883',
        any: [
          /IF TALENT:正太控\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『正太专用便器』 \n		CASE 1\n			PRINT 『正太小鸡鸡爱好者』\n		CASE 2\n			SIF !TALENT:122\n			PRINT 『对不起，我是痴女』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1885-1895',
        any: [
          /IF TALENT:153\n	;妊娠\n	SELECTCASE RAND:3\n		CASE 0\n			PRINT 『恭喜怀孕！』\n		CASE 1\n			PRINT 『十分感谢大家让我怀孕』\n		CASE 2\n			PRINT 『长枪体内过，腹中婴儿来』\n	ENDSELECT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1897-1928',
        any: [
          /SELECTCASE RAND:14\n	CASE 0\n		PRINT 『浑身的精液臭味真对不起！』 \n	CASE 1\n		PRINT 『勇者之耻』\n	CASE 2\n		PRINT 『热烈欢迎不负责任的中出』\n	CASE 3\n		PRINTFORM 『记住%SAVESTR:TARGET%这个名字哦！』 \n	CASE 4\n		PRINT 『喜欢一边被殴打，一边被侵犯』 \n	CASE 5\n		PRINT 『弱小的』 \n	CASE 6\n		SIF !TALENT:122\n		PRINT 『我们的目标是——黑木耳』 \n	CASE 7\n		PRINT 『里面请用精液来好好关爱』 \n	CASE 8\n		PRINT 『ＷＣ』\n	CASE 9\n		SIF !TALENT:122\n		PRINT 『请侵犯来自遥远农村的私处』\n	CASE 10\n		PRINT 『请卜滋卜滋干个爽吧』 \n	CASE 11\n		PRINT 『想要你的阴茎』\n	CASE 12\n		PRINTFORM 『好色的%LOCALS%』\n	CASE 13\n		PRINTFORM 『肉穴%LOCALS%』 \nENDSELECT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1906-1912',
        any: [
          /	CASE 4\n		PRINT 『喜欢一边被殴打，一边被侵犯』 \n	CASE 5\n		PRINT 『弱小的』 \n	CASE 6\n		SIF !TALENT:122\n		PRINT 『我们的目标是——黑木耳』 /,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1911-1912',
        any: [/		SIF !TALENT:122\n		PRINT 『我们的目标是——黑木耳』 /],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1918-1919',
        any: [/		SIF !TALENT:122\n		PRINT 『请侵犯来自遥远农村的私处』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1930-2036',
        any: [
          /IF CFLAG:661 >=30\n	IF COUNT_V > 0\n		;臨月\n		IF \(CFLAG:110 - 2 <= DAY && TALENT:153\)\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%在怀孕期间也性欲旺盛着』 \n				CASE 1\n					PRINT 『怀孕中，母乳畅饮』\n				CASE 2\n					PRINT 『怀上了不知父亲是谁的孩子』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『孕妇』 \n				CASE 6\n					PRINT 『肚子大了』 \n				CASE 7\n					PRINT 『给小宝宝精液吧！』 \n				CASE 8\n					PRINT 『怀孕以后屄里的肉褶越来越多了哦』\n				CASE 9\n					PRINT 『啊～大肚子真碍事～』\n			ENDSELECT\n		;妊娠\n		ELSEIF TALENT:153\n			SELECTCASE RAND:10\n				CASE 0\n					PRINTFORM 『小%SAVESTR:TARGET%稍微胖了吗？』 \n				CASE 1\n					PRINT 『这家伙受精了吗？』\n				CASE 2\n					PRINT 『受精了』\n				CASE 3\n					PRINTFORM 『%SAVESTR:TARGET%的宝宝也请多多指教呢～』 \n				CASE 4\n					PRINT 『一起期待次时代的勇者吧！』 \n				CASE 5\n					PRINT 『战败纪念受精』\n				CASE 6\n					PRINT 『托各位的福，胸变大了←怀孕了而已吧』\n				CASE 7\n					SIF !TALENT:122\n					PRINT 『月经已停』 \n				CASE 8\n					PRINT 『乳头变得黑起来了』\n				CASE 9\n					PRINT 『让这家伙的肚子越来越大真的没问题吗？』\n			ENDSELECT\n		ELSE\n			;妊娠してない\n			SELECTCASE RAND:12\n				CASE 0\n					PRINT 『现在肉穴松弛了』 \n				CASE 1\n					PRINT 『被干怀孕了谢谢大家』\n				CASE 2\n					PRINT 『不管什么都好，想要怀孕啊～』\n				CASE 3\n					PRINTFORM 『来领养%SAVESTR:TARGET%的宝宝吧』 \n				CASE 4\n					PRINT 『过于风流』 \n				CASE 5\n					PRINT 『确认怀孕』 \n				CASE 6\n					PRINT 『感谢精液』 \n				CASE 7\n					PRINT 『渴望受精！』 \n				CASE 8\n					PRINT 『这家伙的肉穴太厉害了』\n				CASE 9\n					SIF !TALENT:122\n					PRINT 『小穴变一层层了』\n				CASE 10\n					PRINT 『←摇啊摇』\n				CASE 11\n					PRINT 『↓插啊插』\n			ENDSELECT\n		ENDIF\n	ELSE\n		SELECTCASE RAND:10\n			CASE 0\n				PRINT 『用的太多，尻穴开始松弛了』 \n			CASE 1\n				PRINT 『粪穴太松了』\n			CASE 2\n				PRINT 『屁股真漂亮』\n			CASE 3\n				PRINT 『太臭了』\n			CASE 4\n				SIF !TALENT:122 && TALENT:0\n				PRINT 『明明是处女，肛门却很淫荡』 \n			CASE 5\n				PRINT 『请让我的肛门喝很多精液吧』\n			CASE 6\n				PRINT 『啊啊……括约肌断了。』\n			CASE 7\n				PRINT 『这家伙的粪穴真臭』\n			CASE 8\n				PRINT 『肛交便器』\n			CASE 9\n				PRINT 『用肛门向大家道歉』\n		ENDSELECT\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1974-1975',
        any: [/					SIF !TALENT:122\n					PRINT 『月经已停』 /],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2003-2006',
        any: [
          /					SIF !TALENT:122\n					PRINT 『小穴变一层层了』\n				CASE 10\n					PRINT 『←摇啊摇』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2022',
        any: [/				SIF !TALENT:122 && TALENT:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2042-2050',
        any: [
          /CFLAG:661 \+= COUNT_V\n;COUNT_Aの使用数\nCFLAG:662 \+= COUNT_A\n;口の使用数\nCFLAG:663 \+= COUNT_F\n;胸の使用数\nCFLAG:664 \+= COUNT_B\n;その他の使用数\nCFLAG:665 \+= COUNT_S - COUNT_V - COUNT_A - COUNT_F - COUNT_B/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2051-2118',
        any: [
          /REPEAT 5\n;使用回数があるならば\n	IF CFLAG:\(661\+COUNT\) > 0\n		SELECTCASE COUNT\n			CASE 0\n				SELECTCASE RAND:5\n					CASE 0\n						PRINT 『肉穴使用次数：\n					CASE 1\n						PRINT 『中出次数：\n					CASE 2\n						PRINT 『性经验急速上升中：\n					CASE 3\n						SIF !TALENT:122\n						PRINT 『小穴：\n					CASE 4\n						PRINT 『被播种：\n				ENDSELECT\n			CASE 1\n				SELECTCASE RAND:4\n					CASE 0\n						PRINT 『肛门使用次数：\n					CASE 1\n						PRINT 『菊穴使用次数：\n					CASE 2\n						PRINT 『菊穴：\n					CASE 3\n						PRINT 『屁股：\n				ENDSELECT\n			CASE 2\n				SELECTCASE RAND:3\n					CASE 0\n						PRINT 『嘴巴：\n					CASE 1\n						PRINT 『污垢处理：\n					CASE 2\n						PRINT 『口爆：\n				ENDSELECT\n			CASE 3\n				SELECTCASE RAND:2\n					CASE 0\n						PRINT 『胸部：\n					CASE 1\n						PRINT 『乳房：\n				ENDSELECT\n			CASE 4\n				PRINT 『\n		ENDSELECT\n		IF CFLAG:\(661\+COUNT\) >= 5\n			FOR LOCAL, 0, CFLAG:\(661\+COUNT\) \/5\n				PRINT 正 \n			NEXT\n		ENDIF\n		;５で割ったあまりを出します\n		SELECTCASE CFLAG:\(661\+COUNT\) % 5\n			CASE 1\n				PRINT 一\n			CASE 2\n				PRINT 丅\n			CASE 3\n				PRINT 下\n			CASE 4\n				PRINT 㠪\n		ENDSELECT\n		PRINT 』\n	ELSE\n	ENDIF\nREND/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2120-2127',
        any: [
          /SIF CFLAG:661 > 9\n	PRINT 『真的一个打十个！』\nSIF CFLAG:661 > 29\n	PRINT 『突破三十！！』\nSIF CFLAG:661 > 49\n	PRINT 『祝贺！达成了五十！！！』\nSIF CFLAG:661 > 99\n	PRINT 『正字写太多了，有点恶心』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2128-2129',
        any: [
          /PRINTL\nPRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2129',
        any: [/PRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2129-2133',
        any: [
          /PRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……\n\nWAIT\n\nPRINTL/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2131',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2135-2310',
        any: [
          /IF COUNT_Z > 0\n	;兽奸	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	IF PILLORY_USER == 1\n		PRINT 魔兽\n	ELSEIF PILLORY_USER == 2\n		PRINT 猪\n	ELSEIF PILLORY_USER == 3\n		PRINT 小马\n	ELSEIF PILLORY_USER == 4\n		PRINT 狗\n	ELSE\n		PRINT 狗\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF RAND:3 == 0\n		PRINT 『这个大变态！　\n		IF PILLORY_USER == 1\n			PRINT 魔兽\n		ELSEIF PILLORY_USER == 2\n			PRINT 猪\n		ELSEIF PILLORY_USER == 3\n			PRINT 小马\n		ELSEIF PILLORY_USER == 4\n			PRINT 狗\n		ELSE\n			PRINT 狗\n		ENDIF\n		PRINTL 的小鸡鸡就这么舒服么』\n	ELSEIF RAND:2 == 0\n		PRINTL 『讨厌，像野兽一样……』\n	ELSE\n		PRINTL 『感觉如何！？大声说交配很舒服！』\n	ENDIF\nELSEIF COUNT_A > 0 && COUNT_V > 0\n	;A&V\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 暗精灵的少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下等恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『做吧！真正的免费小穴！』\n		ELSEIF RAND:2 == 0\n			PRINTL 魔族男人舒畅地射精了。\n			PRINTL 『不准漏出来，你敢漏出来就给你塞嘴里』\n		ELSE\n			PRINTL 『要…流出来了！』『喂！太快了吧！我再给你塞上……』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥……我已经忍不住了！』\n			ELSE\n			PRINTL 『大姐姐……我已经忍不住了！』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……全部出来了！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			SIF !TALENT:122\n			PRINTL 『大姐姐！～大姐姐！』\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『啊哈！！肛门也很舒服！来，怀上我的孩子吧！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSEIF COUNT_A > 0\n	;アナル\n	\n	PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被\n	\n	SIF TALENT:143\n		PILLORY_USER = 2\n	\n	IF PILLORY_USER == 1\n		PRINT 魔族男人\n	ELSEIF PILLORY_USER == 2\n		PRINT 黑暗精灵少年\n	ELSEIF PILLORY_USER == 3\n		PRINT 下级恶魔\n	ELSEIF PILLORY_USER == 4\n		PRINT 兽人\n	ELSE\n		PRINT 兽人\n	ENDIF\n	\n	PRINTL 侵犯着。\n	\n	IF PILLORY_USER == 1\n		IF RAND:3 == 0\n			PRINTL 『走后门的时候，前面的穴居然在潮吹哦！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『真是淫乱的肛门啊……』\n		ELSE\n			PRINTL 『后庭已经变得这么柔软了啊？』\n		ENDIF\n	ELSEIF PILLORY_USER == 2\n		IF RAND:3 == 0\n			IF TALENT:122\n			PRINTL 『大哥哥的肛穴……好舒服啊…………』\n			ELSE\n			PRINTL 『大姐姐的肛穴……好舒服啊…………』\n			ENDIF\n		ELSEIF RAND:2 == 0\n			PRINTL 『啊啊啊……肛穴发出啪啪啪的声音！』\n		ELSE\n			PRINTL 少年拼命地挺动着腰\n			IF TALENT:122\n			PRINTL 『摆脱处男了……用大哥哥的菊花摆脱处男了……』\n			ELSE\n			PRINTL 『摆脱处男了……用大姐姐的菊花摆脱处男了……』\n			ENDIF\n		ENDIF\n	ELSEIF PILLORY_USER == 3\n		IF RAND:3 == 0\n			PRINTL 『这个下等便器！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『听说是免费的…又臭又脏呢』\n		ELSE\n			PRINTL 『好好来侍奉！』\n		ENDIF\n	ELSE\n		IF RAND:3 == 0\n			PRINTL 『哈哈！！　后庭最棒啦！　用我的精液来给你灌肠！』\n		ELSEIF RAND:2 == 0\n			PRINTL 『呵呵～魔王大人！太感谢您了……』\n		ELSE\n			PRINTL 『哇哈哈！这个程度还不足以谢罪啊！』\n		ENDIF\n	ENDIF\n	\nELSE\n	IF RAND:3 == 0\n		PRINTFORML 兽人巨汉，粗鲁地拿%SHE\(\)%来处理精液。\n		PRINTL 『哇哈哈！只有屄穴还算有点用处！』\n	ELSEIF RAND:2 == 0\n		PRINTFORML 妖精们排着队来侵犯%SHE\(\)%的屁股。\n		PRINTL 『嘻嘻嘻嘻～真舒服…』\n	ELSE\n		PRINTL 肥胖的兽人正侵犯着肛门。\n		PRINTL 『啊哈哈！接受我的种子吧！！』\n	ENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2176-2177',
        any: [/	SIF TALENT:143\n		PILLORY_USER = 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2313-2379',
        any: [
          /IF COUNT_A > 0\n	;肛门经验\n	PRINTFORML %EXPNAME:1%\+\{COUNT_A\}\n	EXP:1 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0 && !TALENT:122\n	;私处经验\n	PRINTFORML %EXPNAME:0%\+\{COUNT_V\}\n	EXP:0 \+= COUNT_V\nENDIF\n\nLOCAL:0 = COUNT_A \+ COUNT_V\n\nIF LOCAL:0 > 0\n	;性交经验\n	PRINTFORML %EXPNAME:5%\+\{LOCAL:0\}\n	EXP:5 \+= LOCAL:0\nENDIF\n\nIF COUNT_S > 0\n	;精液经验\n	PRINTFORML %EXPNAME:20%\+\{COUNT_S\}\n	EXP:20 \+= COUNT_S\nENDIF\n\nIF COUNT_F > 0\n	;口交经验\n	PRINTFORML %EXPNAME:22%\+\{COUNT_F\}\n	EXP:22 \+= COUNT_F\nENDIF\n\nIF COUNT_Z > 0\n	;兽奸经验\n	PRINTFORML %EXPNAME:56%\+\{COUNT_Z\}\n	EXP:56 \+= COUNT_Z\nENDIF\n\nIF COUNT_A > 0\n	;肛门\n	PRINTFORML %PALAMNAME:2%点数\+\{COUNT_A\}\n	JUEL:2 \+= COUNT_A\nENDIF\n\nIF COUNT_V > 0  && !TALENT:122\n	;私处\n	PRINTFORML %PALAMNAME:1%点数\+\{COUNT_V\}\n	JUEL:1 \+= COUNT_V\nENDIF\n\n\nLOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2\n;处女、高姿态、保守的、看重贞操、高贵で取得率アップ\n;屈服・耻情は元々のものより少し多めになっています\n;V使用回数が50回を超えると屈服に使用回数に比例したボーナスが入ります\nIF LOCAL:0 > 0\n	;屈服・耻情\n	IF CFLAG:661 > 50\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0 \* CFLAG:661 \/ 50\}\n		JUEL:6 \+= LOCAL:0 \* CFLAG:661 \/ 50\n	ELSE\n		PRINTFORML %PALAMNAME:6%点数\+\{LOCAL:0\}\n		JUEL:6 \+= LOCAL:0\n	ENDIF\n	PRINTFORML %PALAMNAME:8%点数\+\{LOCAL:0\}\n	JUEL:8 \+= LOCAL:0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2388',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的身体，被弄了\{CFLAG:661\+CFLAG:662\+CFLAG:663\+CFLAG:664\+CFLAG:665\}次，精液流得到处都是……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2390',
        any: [/CALL CAMPAIGN_EXP_PILLORY,TARGET/],
      },
      {
        // 需求审查（#469）：经验行的两次等键——被调方 CAMPAIGN_EVENT.ERB:298
        // 是 PRINTFORMW（自带一次），调用点 :2392 的 WAIT 是第二次
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '298',
        any: [/PRINTFORMW 通過榨取攻略中的奴隷的能量獲得了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2392',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2394-2416',
        any: [
          /;レベルが強ければもうちょっと耐えられる\nIF JUEL:100 > 120 \+ CFLAG:9 \* 40\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nELSEIF JUEL:100 > 120 \+ 150 \* 40\n	;150レベル以上は長すぎるので強制終了\n	PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……\n	PRINTW \*从示众台解放\*\n	CFLAG:661 = 0\n	CFLAG:662 = 0\n	CFLAG:663 = 0\n	CFLAG:664 = 0\n	CFLAG:665 = 0\n	CFLAG:1 = 0\n	CFLAG:777 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2403',
        any: [/	CFLAG:1 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2404',
        any: [/	CFLAG:777 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2418-2423',
        any: [
          /;妊娠チェック\nIF COUNT_V > 0\n	CFLAG:107 \+= COUNT_V\n	CALL IN_VAGINA_SYOKU_TO_T\n	CALL CONCEPTION_CHECK_SYOKU_TO_T\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2418-2426',
        any: [
          /;妊娠チェック\nIF COUNT_V > 0\n	CFLAG:107 \+= COUNT_V\n	CALL IN_VAGINA_SYOKU_TO_T\n	CALL CONCEPTION_CHECK_SYOKU_TO_T\nENDIF\n\n\nRETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2419-2426',
        any: [
          /IF COUNT_V > 0\n	CFLAG:107 \+= COUNT_V\n	CALL IN_VAGINA_SYOKU_TO_T\n	CALL CONCEPTION_CHECK_SYOKU_TO_T\nENDIF\n\n\nRETURN 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2420',
        any: [/	CFLAG:107 \+= COUNT_V/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2421',
        any: [/	CALL IN_VAGINA_SYOKU_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2422',
        any: [/	CALL CONCEPTION_CHECK_SYOKU_TO_T/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
