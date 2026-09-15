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
        ref: '317-335',
        any: [
          /ELSEIF RACE_CLA == 4[\s\S]*RACE_AGE = RAND:\(RACE_AGE - ARG:0\) \+ ARG:0/,
        ],
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
        ref: '399-400',
        any: [
          /HUMAN_AGE = \(ARG:0 \* 10 \+ 5\) \/\(RACE_DEG \* 10 \+ RACE_NUM\)/,
        ],
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
    ],
  },
  {
    js: 'ere/chara/chara-make-inherit.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '4-71',
        any: [/@CHARA_MAKE_INHERIT\(L_A, L_B, L_C = -1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '11-12',
        any: [/SIF L_B < 0/, /RETURN L_A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '17-18',
        any: [/SIF INRANGE\(L_I,74,78\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB',
        ref: '24',
        any: [/SIF TALENT:L_A:扶她/],
      },
    ],
  },
  {
    js: 'ere/chara/chara-name.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '14-146',
        any: [/@CHARA_NAME_RANDOM_DEFINE\(L_A, L_TYPE = -1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '44-52',
        any: [/職業によって名前の種類に偏りを持たせる/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '56-88',
        any: [/IF CFLAG:L_A:314 == 0/, /ELSEIF CFLAG:L_A:314 == 11/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '95-96',
        any: [/L_TYPE = RAND:5 % 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '122',
        any: [/CFLAG:L_A:6 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '141',
        any: [/JUMP CHARA_NAME_DEFINE\(L_A,L_NID\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '225-230',
        any: [/@CN_REBUILD/, /SAVESTR:LOCAL '= CALLNAME:LOCAL/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
