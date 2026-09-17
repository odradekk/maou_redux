// 源: tools/trace-check.mjs  @FILES
// issue #332：阶段 5a 段 0 的角色侧前置函数。

export const FILES = [
  {
    js: 'ere/chara/chara-stats.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '71-89',
        any: [/@KARMA, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '82-86',
        any: [/CFLAG:\(ARG:0\):151 = 200/, /CFLAG:\(ARG:0\):151 = -200/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '90-108',
        any: [/@FAITH, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '101-105',
        any: [/CFLAG:\(ARG:0\):152 = 100/, /CFLAG:\(ARG:0\):152 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '109-128',
        any: [/@CHARA_LV_CHECK,CHARA/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '114',
        any: [/IF EXP:CHARA:80 < 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '116',
        any: [/EXP:CHARA:80 = CFLAG:CHARA:9 \* 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '123-124',
        any: [/PRINTFORMW %SAVESTR:CHARA%下降了一级/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '129-150',
        any: [/@CHARA_ID_OUTPUT,CHARA/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '141',
        any: [/BREAK/],
      },
    ],
  },
  {
    js: 'ere/chara/chara-body.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '408-761',
        any: [/@CHAR_SIZE_GENERATE, ARG:0, CHAR_AGE = 0, ARG:2 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '763-779',
        any: [/@UNDER_BUST, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '17-120',
        any: [/@CHAR_HWEIGHT_GENERATE, CHAR_AGE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '123-323',
        any: [/@CHAR_BUST_GENERATE, L_AGE, CHAR_HEIGHT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '326-358',
        any: [/@NORMAL_RANGE_PICKUP\(ARG, ARG:1, ARG:2, ARG:3=-1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '361-385',
        any: [/@STATISTICS_WOMAN\(ARG = 18\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '388-412',
        any: [/@STATISTICS_MAN\(ARG = 18\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '16-36',
        any: [/@CHAR_BODY_GENERATE_WAPPED, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '18-19',
        any: [/SIF !GETBIT\(FLAG:5,12\) && !GETBIT\(FLAG:5,15\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '22-25',
        any: [/IF TALENT:ARG:165[\s\S]*ELSEIF TALENT:ARG:171/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '23',
        any: [/RAND:2 \+ 12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '25',
        any: [/RAND:2 \+ 17/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '27',
        any: [/^\tCALL CHAR_SIZE_GENERATE, ARG$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '30-36',
        any: [/CFLAG:ARG:451 = RESULT:0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '148-242',
        any: [/@CHAR_AGE_GENERATE, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '171-174',
        any: [/EXP_AGE = CHAR_AGE_EXPECT\(TARGET\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '176',
        any: [/^LOCAL = EXP_AGE$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '178',
        any: [/EXP_AGE = LIMIT\(EXP_AGE,12,35\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '180-181',
        any: [/CALL NORMAL_POINT_PICKUP\(EXP_AGE\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '212-225',
        any: [/CALL RF_ALL\(TARGET, -1, L_DATA, 1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '215',
        any: [/L_B_TYPE = L_DATA:\(L_I \*2\+1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '216-223',
        any: [/ELSEIF \(L_B == 5 \|\| L_B == 6\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '228-229',
        any: [/SIF EX_TALENT:ARG:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '231',
        any: [/PRINTFORML %SAVESTR:TARGET,10,LEFT%年龄期望/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '234-235',
        any: [/CALL RACE_AGE_GENERATE, CHAR_AGE, TALENT:314/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '240-241',
        any: [/SIF CHAR_AGE <= 14/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '245-337',
        any: [/@RACE_AGE_GENERATE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '267-276',
        any: [/IF ARG:1 >= 7 && ARG:1 < 10[\s\S]*RETURN ARG:0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '280-282',
        any: [/RACE_ID = ARG:1 - 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '285-292',
        any: [/FLAG:27 \/ POWER\(1000, \(RACE_ID - 6\)\) % 1000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '285-296',
        any: [/コンフィグで設定された种族ごとの設定値を取得/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '382-393',
        any: [/コンフィグで設定された种族ごとの設定値を取得/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '289',
        any: [/RACE_CLA = FLAG:27 \/ POWER\(1000, \(RACE_ID - 6\)\) % 1000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '291',
        any: [/RACE_CLA = FLAG:26 \/ POWER\(1000, \(RACE_ID\)\) % 1000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '294-296',
        any: [/RACE_DEG = RACE_CLA \/ 10 % 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '299-300',
        any: [/RACE_AGE = ARG:0 \* RACE_NUM \* POWER\(10, RACE_DEG\) \+ RAND:/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '299-335',
        any: [/ELSEIF RACE_CLA == 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '302-303',
        any: [/RACE_AGE = ARG:0 \* \(RACE_DEG \* 10 \+ RACE_NUM\) \/ 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '305-312',
        any: [/CAL_VAR:1 = POWER\(10, RAND:\(RESULT \+ 1\)\) \* 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY2.ERB',
        ref: '306-323',
        any: [/@NORMAL_POINT_PICKUP\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '309',
        any: [/POWER\(10, RAND:\(RESULT \+ 1\)\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '314-315',
        any: [/RACE_AGE = RAND:\(RACE_NUM \* POWER\(10, RACE_DEG\) \/ 2\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '337',
        any: [/^RETURN RACE_AGE$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '340-406',
        any: [/@HUMAN_AGE_GENERATE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '361',
        any: [/RACE_NO = TALENT:\(ARG:1\):314/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '364-373',
        any: [/IF RACE_NO >= 7 && RACE_NO < 10[\s\S]*RETURN ARG:0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '377-379',
        any: [/RACE_ID = RACE_NO - 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '391-393',
        any: [/RACE_DEG = RACE_CLA \/ 10 % 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '396-397',
        any: [/HUMAN_AGE = ARG:0 \/\(RACE_NUM \* POWER\(10, RACE_DEG\)\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '402-404',
        any: [/HUMAN_AGE = CFLAG:\(ARG:1\):452/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '781-850',
        any: [/@CUP_SIZE, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '853-929',
        any: [/@CONFIG_AGE_SETTING/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '931-1333',
        any: [/@RACE_CONFIG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '791-792',
        any: [/SIF CAL_VAR <= 1\n	RESULTS:0 = -/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '788',
        any: [/CALL UNDER_BUST, ARG, CFLAG:ARG:453/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '790',
        any: [/CAL_VAR = \(CFLAG:ARG:455 - RESULT\) \/ 25/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '317-335',
        any: [
          /ELSEIF RACE_CLA == 4\n;桁の出方を偏らせてみる\n;	RACE_AGE = RAND:\(RACE_NUM \* POWER\(10, RACE_DEG\) - ARG:0\) \+ ARG:0\n	CAL_VAR:0 = \(RACE_NUM \* POWER\(10, RACE_DEG\)\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '399-400',
        any: [
          /ELSEIF RACE_CLA == 1\n	HUMAN_AGE = \(ARG:0 \* 10 \+ 5\) \/\(RACE_DEG \* 10 \+ RACE_NUM\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_BODY.ERB',
        ref: '791-848',
        any: [
          /SIF CAL_VAR <= 1\n	RESULTS:0 = -\nSIF CAL_VAR == 2\n	RESULTS:0 = AAA/,
        ],
      },
    ],
  },
  {
    // #384（N2）：CHARA_MAKE_INHERIT.ERB 三处遗留存根换真身后的全量锚表
    js: 'ere/chara/chara-make-inherit.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '2-3',
        any: [/不继承：崩坏，口上，调教素质，种族，职业，经历/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '4-67',
        any: [/^@CHARA_MAKE_INHERIT\(L_A, L_B, L_C = -1\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '11-12',
        any: [/^SIF L_B < 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '16-21',
        any: [/^FOR L_I, 10, 153\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '17-18',
        any: [/^\t;特殊性癖,扶她-疯狂,母乳体质-正太控,爱慕\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '18',
        any: [/^\tSIF INRANGE\(L_I,74,78\) \|\| INRANGE\(L_I,121,123\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '24-25',
        any: [
          /^SIF TALENT:L_A:扶她 \|\| TALENT:L_A:男人 \|\| !TALENT:L_A:处女\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '25',
        any: [/^\tTALENT:私处封印 = 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '27-30',
        any: [/^;恋母情结等\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '32-38',
        any: [/^FOR L_I, 240,264\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '35',
        any: [/^\tSIF INRANGE\(L_I, 244,247\) \|\| L_I == 254\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '40-43',
        any: [/^FOR L_I, 275,280\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '45-48',
        any: [/^FOR L_I, 300,314\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '50-62',
        any: [/^IF TALENT:L_B:精英\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '65',
        any: [/^CALL CMI_CONFLICT_CHECK\(L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '67',
        any: [/^RETURN L_A\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '73-91',
        any: [/^@CMI_SETTALENT\(L_I, L_A, L_B, L_C = -1\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '79-82',
        any: [/^IF L_C <= 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '83-86',
        any: [/^ELSEIF \tL_B == 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '88-90',
        any: [/^\tSIF RAND:16\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '90',
        any: [
          /^\t\tTALENT:L_A:L_I = RAND:2 \? TALENT:L_B:L_I # TALENT:L_C:L_I\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '97-121',
        any: [/^@CMI_MOM_COMPLEX\(L_A, L_B\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '101-102',
        any: [
          /^IF TALENT:L_B:讨厌男人 && \(TALENT:L_A:男人 \|\| TALENT:L_A:扶她\)\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '103-104',
        any: [
          /^ELSEIF TALENT:L_B:男人婆 && \(!TALENT:L_A:男人 && !TALENT:L_A:扶她\)\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '106-107',
        any: [/^\tSIF TALENT:L_B:母性 && RAND:2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '108-109',
        any: [/^\tSIF TALENT:L_B:人妻 && RAND:3 == 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '110-111',
        any: [/^\tSIF TALENT:L_B:父性 && RAND:2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '112-120',
        any: [
          /^\tIF \(TALENT:L_B:未熟 \|\| TALENT:L_B:娇小\) && RAND:3 == 1\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '127-166',
        any: [/^@CMI_CONFLICT_CHECK\(L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '133-151',
        any: [/^#DIM CONST PAIRS = $/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '166',
        any: [/^RETURN L_A\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '157-162',
        any: [/^\t\t\tTALENT:L_A:L_I = 0\r?$/m],
      },
    ],
  },
  {
    // #384（N2）：CHARA_NAME.ERB 全十函数落地后的全量锚表
    js: 'ere/chara/chara-name.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '14-141',
        any: [/^@CHARA_NAME_RANDOM_DEFINE\(L_A, L_TYPE = -1\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '45-51',
        any: [/^\tIF TALENT:L_A:骑士 && RAND:10 != 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '95-96',
        any: [/^SIF L_TYPE == 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '122-123',
        any: [/^CFLAG:L_A:6 = -1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '126-136',
        any: [/^\tIF L_TYPE == 0 && CHARANUM\*4\/10 > JAPEN_NAME_COUNT\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '147-202',
        any: [/^@CHARA_NAME_DEFINE\(L_A, L_NID = -1\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '153-162',
        any: [/^IF INRANGE\(NO:L_A, 17,40\) \|\| NO:L_A == 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '154',
        any: [/^\tNAME:L_A '= CSVNAME\(NO:L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '155',
        any: [/^\tCALLNAME:L_A '= CSVCALLNAME\(NO:L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '159',
        any: [/^\tCFLAG:L_A:6 = 10000 \+ NO:L_A\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '160',
        any: [/^\tCALL RELATION_RENAME_REBUILD\(L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '161',
        any: [/^\tRETURN 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '165-170',
        any: [/^IF L_NID < 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '166',
        any: [/^\tL_NID = CFLAG:L_A:6\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '168',
        any: [/^\tCFLAG:L_A:6 = L_NID\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '169',
        any: [/^\tCALL RELATION_RENAME_REBUILD\(L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '173-202',
        any: [/^IF L_NID < 1000000000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '175',
        any: [/^\tIF L_NID < VARSIZE\("LIST_CHARA_NAME"\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '176',
        any: [/^\t\tLOCALS '= LIST_CHARA_NAME:L_NID\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '179-181',
        any: [/^\t\t\tSAVESTR:L_A '= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '179',
        any: [/^\t\t\tNAME:L_A '= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '180',
        any: [/^\t\t\tCALLNAME:L_A '= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '184-186',
        any: [/^\t\t\tSAVESTR:L_A = 佳奈美\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '190-193',
        any: [/^\t\tCALLNAME:L_A = 佳奈美\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '193',
        any: [/^\t\tL_NID = VARSIZE\("LIST_CHARA_NAME"\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '197-201',
        any: [/^\tCALL CN_SPAN_COMBINE_NAME, L_NID\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '199',
        any: [/^\tNAME:L_A '= RESULTS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '200',
        any: [/^\tCALLNAME:L_A '= RESULTS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '209-218',
        any: [/^@CHARA_NAME_RESET\(L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '212',
        any: [/^IF INRANGE\(NO:L_A, 17,40\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '213',
        any: [/^\tCALLNAME:L_A '= CSVCALLNAME\(NO:L_A\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '215',
        any: [/^\tCALLNAME:L_A '= NAME:L_A\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '218',
        any: [/^SAVESTR:L_A '= CALLNAME:L_A\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '225-230',
        any: [/^@CN_REBUILD\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '227-228',
        any: [/^\tSIF LOCAL == 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '229',
        any: [/^\tSAVESTR:LOCAL '= CALLNAME:LOCAL\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '236-250',
        any: [/^@NID_FINDCHARAS\(L_NID\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '241',
        any: [/^VARSET RESULT\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '244-245',
        any: [/^\t\tRESULT:L_I = LOCAL\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '249',
        any: [/^RESULT:L_I = -1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '250',
        any: [/^RETURN RESULT:0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '255-265',
        any: [/^@NID_GET_TYPE\(L_NID\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '259',
        any: [/^\tRETURNF 2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '261',
        any: [/^\tRETURNF 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '263',
        any: [/^\tRETURNF 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '265',
        any: [/^RETURNF 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '270-276',
        any: [/^@NID\(ARG\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '278-285',
        any: [/^@NID_R\(ARG\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '291-333',
        any: [/^@CN_SPAN_COMBINE_NAME_NUM\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '298',
        any: [/^L_RET = 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '299',
        any: [/^L_L = 3 - RAND:2 - RAND:3 % 2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '301',
        any: [/^L_RET = 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '303',
        any: [/^\tL_RET \*= 1000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '305-310',
        any: [/^\tIF L_I == 0 && L_L > 1 && RAND:5 != 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '313-318',
        any: [
          /^\t\tIF \(RAND:3 == 0 && L_L != 1\) \|\| \(RAND:2 == 0 && L_L == 3\)\r?$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '315',
        any: [/^\t\t\tL_N = RAND:9 \+ 300\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '317',
        any: [/^\t\t\tL_N = RAND:30 \+ 200\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '320-321',
        any: [/^\t\tIF RAND:8 == 0 && L_L != 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '321',
        any: [/^\t\t\tL_N = RAND:2 \+ 500\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '323',
        any: [/^\t\t\tL_N = RAND:27 \+ 400\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '326',
        any: [/^\tL_RET \+= L_N\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '327-328',
        any: [/^\tSIF L_I < 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '329-330',
        any: [/^\tSIF L_L == 1 && \(L_N == 200/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '329',
        any: [/^\tSIF L_L == 1 && \(L_N == 200/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '332',
        any: [/^L_RET \+= 2000000000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '339-604',
        any: [/^@CN_SPAN_COMBINE_NAME, ARG\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '340',
        any: [/^LOCALS:9 =\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '342',
        any: [/^N = ARG % 1000000000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '344',
        any: [/^IF ARG > 2000000000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '348-496',
        any: [/^\t\tELSEIF N:1 == 201\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '409-426',
        any: [/^\t\tELSEIF N:1 == 300\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '428-481',
        any: [/^\t\t\tLOCALS = ヴィア\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '429',
        any: [/^\t\t\tLOCALS = ヴィア\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '430',
        any: [/^\t\tELSEIF N:1 == 400\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '483-486',
        any: [/^\t\tELSEIF N:1 == 501\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '488-495',
        any: [/^\t\t\tLOCALS = サン\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '498-503',
        any: [/^\t\tSTRLENS LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '500',
        any: [/^\t\tIF LOCALS:1 == RESULTS/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '504-508',
        any: [/^\t\tIF RESULTS == "ッ" && LOCALS:1 == "ー"\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '511',
        any: [/^\t\tLOCALS:9 \+= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '512',
        any: [/^\t\tN \/= 1000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '515',
        any: [/^ELSEIF B > 1000000000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '518-598',
        any: [/^\t\tELSEIF N:1 == 101\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '599',
        any: [/^\t\tN \/= 1000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERH',
        ref: '7-22',
        any: [/^#DIM CHINA_NAME_COUNT\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '55-93',
        any: [/^\tIF CFLAG:L_A:314 == 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '98',
        any: [/^\$SPAN_NAME_NUM\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '141',
        any: [
          /^\tCHAR_MAKE_DEFINE\(L_A,L_NID\)\r?$|JUMP CHARA_NAME_DEFINE\(L_A,L_NID\)/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '236',
        any: [/^@NID_FINDCHARAS\(L_NID\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '255',
        any: [/^@NID_GET_TYPE\(L_NID\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '320',
        any: [/^\t\tIF RAND:8 == 0 && L_L != 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '519-598',
        any: [/^\t\t\tLOCALS:9 = %LOCALS:9%アム\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '603',
        any: [/^RESULTS '= LOCALS:9\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '130-131',
        any: [/^\tELSEIF L_TYPE == 0 && TALENT:L_A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '132-133',
        any: [/^\tELSEIF L_TYPE == 1 && TALENT:L_A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '346-497',
        any: [/^\t\tN:1 = N % 1000\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '504',
        any: [/^\t\tIF RESULTS == "ッ" && LOCALS:1 == "ー"\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '481',
        any: [/^\t\t\tLOCALS = ッラ\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '428-431',
        any: [/^\t\tELSEIF N:1 == 400\r?$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
