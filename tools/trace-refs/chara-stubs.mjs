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
