// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-info-exp.mjs

export const FILES = [
  {
    js: 'ere/page/page-info-exp.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1022-1122',
        any: [/^@SHOW_INFO_EXP /],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1032',
        any: [/^REPEAT 82\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1033-1034',
        any: [/^\s*SIF EXP:COUNT == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1035',
        any: [
          /PRINTFORM 　%SUBSTRING\(EXPNAME:COUNT, 0,8\),8,LEFT%:\{EXP:COUNT,6,RIGHT\}/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1037-1039',
        any: [/^\s*IF U % 4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1042-1043',
        any: [/^\s*SIF !LINEISEMPTY\(\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1045-1054',
        any: [
          /^IF TARGET == 0\s*$/m,
          /^\s*ELSEIF TALENT:220 == 1\s*$/m,
          /X = CFLAG:9 \* 100 \+ 10/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1055',
        any: [/PRINTFORML 　%SAVESTR:TARGET%当前是Lv\{CFLAG:TARGET:9\}/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1057-1122',
        any: [/^PRINT 　\s*$/m, /^\s*IF CFLAG:16 > -1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1059-1061',
        any: [/^\s*LOCAL = CFLAG:16 - 1\s*$/m, /PRINT \[初吻对象：不明\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1062-1063',
        any: [
          /^\s*ELSEIF CFLAG:16 == 992\s*$/m,
          /PRINTFORM \[初吻对象：%CSTR:4%\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1076-1077',
        any: [/^\s*ELSEIF CFLAG:16 == 999\s*$/m, /PRINT \[初吻对象：触手\]/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1078-1087',
        any: [
          /PRINTFORM \[初吻对象：%CSTR:4%的/,
          /^\s*IF CFLAG:16 < 100\s*$/m,
          /PRINT 肛门\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1092',
        any: [/^IF CFLAG:15 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1093',
        any: [/^\s*LOCAL = CFLAG:15 - 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1106-1107',
        any: [/^\s*ELSEIF CFLAG:15 == 105\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1110-1111',
        any: [
          /^\s*ELSEIF LOCAL == 0\s*$/m,
          /PRINTFORM \[初体验对象：%CSTR:3%\]/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1118-1122',
        any: [
          /^PRINTL\s*$/m,
          /^IF CFLAG:16 > -1 \|\| CFLAG:15 > 0\s*$/m,
          /^CLEARLINE 1\s*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
