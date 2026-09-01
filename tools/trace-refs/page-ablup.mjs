// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-ablup.mjs

export const FILES = [
  {
    js: 'ere/page/page-ablup.js',
    refs: [
      // ABL.ERB @SHOW_JUEL
      { src: 'target/ERB/ABL/ABL.ERB', ref: '3-27', any: [/^@SHOW_JUEL\s*$/m] },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '4',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '5',
        any: [/^FOR COUNT, 0, 12\s*$/m],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '6-14',
        any: [
          /^\s*IF COUNT == 3\s*$/m,
          /^\s*ELSEIF COUNT == 11\s*$/m,
          /^\s*ELSEIF COUNT == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '15-18',
        any: [
          /^\s*IF COUNT == 0 && TALENT:TARGET:122\s*$/m,
          /阴茎点数：\{JUEL:LOCAL, 6, RIGHT\}/,
          /PRINTFORM  %PALAMNAME:LOCAL%点数：\{JUEL:LOCAL, 6, RIGHT\}/,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '21-24',
        any: [/IF \(COUNT\+1\)%4 == 0/],
      },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '26', any: [/^PRINTL\s*$/m] },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '27',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      // ABL.ERB @SHOW_ABLUP_SELECT
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '29-111',
        any: [
          /^@SHOW_ABLUP_SELECT\s*$/m,
          /^PRINTL \[999\] - 能力值提高结束\s*$/m,
        ],
      },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '30', any: [/^U = 0\s*$/m] },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '31', any: [/^REPEAT 40\s*$/m] },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '32-41',
        any: [
          /^\s*SIF COUNT >= 4 && COUNT <=9\s*$/m,
          /^\s*SIF COUNT == 38\s*$/m,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '44-48',
        any: [
          /^\s*SIF TALENT:122 && \(COUNT == 2 \|\| COUNT == 22 \|\| COUNT == 33\)\s*$/m,
          /^\s*SIF TALENT:122 == 0 && \(COUNT == 23 \|\| COUNT == 34\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '51-65',
        any: [
          /^\s*IF X == 0 && TALENT:101 & 2\s*$/m,
          /^\s*PRINT \[―\]\s*$/m,
          /^\s*SETCOLOR 128, 128, 128\s*$/m,
          /PRINTFORM \[\{X, 2\}\]/,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '66-69',
        any: [
          /^\s*IF X == 0 && TALENT:122\s*$/m,
          /PRINTFORM 阴茎感觉 /,
          /PRINTFORM %ABLNAME:X,9,LEFT%/,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '77',
        any: [/PRINTFORM - LV\{ABL:X,2\}/],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '78',
        any: [/^\s*CALL DECIDE_ABLUP\s*$/m],
      },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '80', any: [/^\s*U \+= 1\s*$/m] },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '81-83',
        any: [/^\s*IF U % 4 == 0\s*$/m],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '85-86',
        any: [/^REND \s*$/m, /^SIF U % 4 != 0\s*$/m],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '88-91',
        any: [
          /PRINTFORM  \[99\]%MARKNAME:3% - LV\{MARK:3,2\}/,
          /^\s*CALL DECIDE_ABLUP99\s*$/m,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '92-101',
        any: [
          /^\s*SIF CSTR:7 != ""\s*$/m,
          /PRINTFORM   \[ 4\] %CSTR:7%感覚/,
          /^\s*CALL DECIDE_ABLUP4\s*$/m,
          /PRINTFORM   \[40\] %CSTR:7%中毒/,
          /^\s*CALL DECIDE_ABLUP40\s*$/m,
        ],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '102-108',
        any: [/^\[IF_DEBUG\]\s*$/m, /^\[ENDIF\]\s*$/m],
      },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '109', any: [/^PRINTL \s*$/m] },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '110',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '111',
        any: [/^PRINTL \[999\] - 能力值提高结束\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
