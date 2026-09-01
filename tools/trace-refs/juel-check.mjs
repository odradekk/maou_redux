// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：juel-check.mjs

export const FILES = [
  {
    js: 'ere/system/train/juel-check.js',
    refs: [
      // TRAIN_MAIN.ERB @JUEL_CHECK
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '435-549',
        any: [/^@JUEL_CHECK\s*$/m, /^\s*\$INPUT_LOOP_1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '437',
        any: [/^CALL JUEL_CHECK_MAIN\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '440',
        any: [/^WAIT\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '443',
        any: [/^\s*\$INPUT_LOOP_1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '444',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '445',
        any: [/^CALL SHOW_INFO_EXP\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '446',
        any: [/^CALL SHOW_JUEL\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '450',
        any: [/^IF GETBIT\(FLAG:5,35\)\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '452-455',
        any: [
          /^\s*CALL AUTO_ABLUP/m,
          /^\s*CALL AUTO_ABLUP, ASSI\s*$/m,
          /^\s*CALL AUTO_ABLUP, MASTER\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '457',
        any: [/^\s*GOTO LABEL_EXIT\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '459',
        any: [/^CALL SHOW_ABLUP_SELECT\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '461',
        any: [/^INPUT\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '463-539',
        any: [/^\s*IF RESULT == 0\s*$/m, /^\s*ELSEIF RESULT == 100\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '540',
        any: [/^\s*ELSEIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '541',
        any: [/^\s*\$LABEL_EXIT\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '542',
        any: [/^\s*CALL YOKUBO_UP_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '543',
        any: [/^\s*CALL CHECK_SELLASSIABLE\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '544',
        any: [/^\s*CALL CHECK_SPECIALSKIL, 1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '545',
        any: [/^\s*LOCAL = TARGET\s*$/m],
      },
      // TRAIN_MAIN.ERB @JUEL_CHECK_MAIN
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '552-740',
        any: [/^@JUEL_CHECK_MAIN\s*$/m, /^RETURN 0\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '558',
        any: [/^FOR JUEL_COUNT,0,16\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '559-585',
        any: [
          /^\s*IF PALAM:JUEL_COUNT < PALAMLV:1\s*$/m,
          /^\s*GET_JUEL = 12000\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '587-588',
        any: [
          /^\s*IF JUEL_COUNT == 0\s*$/m,
          /^\s*GOTJUEL:JUEL_COUNT = GET_JUEL \+ EX:0 \* 1000\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '589-590',
        any: [/^\s*ELSEIF JUEL_COUNT == 1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '591-592',
        any: [/^\s*ELSEIF JUEL_COUNT == 2\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '593-594',
        any: [/^\s*ELSEIF JUEL_COUNT == 14\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '595-596',
        any: [/^\s*ELSEIF JUEL_COUNT == 15\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '597-598',
        any: [
          /^\s*ELSEIF JUEL_COUNT < 11 && JUEL_COUNT != 14 && JUEL_COUNT != 15\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '599-600',
        any: [/^\s*GOTJUEL:100 \+= GET_JUEL\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '604-613',
        any: [/现在保有する珠に今回獲得した珠を加算/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '606-613',
        any: [/^FOR JUEL_COUNT,0,11\s*$/m, /^\s*JUEL:14 \+= GOTJUEL:14\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '615-624',
        any: [/否定の珠による相殺を計算/, /^TFLAG:58 = JUEL:100\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '626-637',
        any: [/^\$LABEL_1\s*$/m, /GOTO LABEL_1/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '627',
        any: [/^\s*LOCAL:0 = RAND:3 \+ 4\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '629-630',
        any: [
          /^\s*SIF LOCAL:1 == 0 && JUEL:100 > 0\s*$/m,
          /^\s*LOCAL:1 = 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '631-632',
        any: [
          /^\s*SIF JUEL:\(LOCAL:0\) < LOCAL:1\s*$/m,
          /^\s*LOCAL:1 = JUEL:\(LOCAL:0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '633',
        any: [/^\s*JUEL:\(LOCAL:0\) -= LOCAL:1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '634',
        any: [/^\s*JUEL:100 -= LOCAL:1\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '636',
        any: [
          /^\s*SIF JUEL:100 > 0 && \(JUEL:4 \+ JUEL:5 \+ JUEL:6\) > 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '639-649',
        any: [/^\$LABEL_2\s*$/m, /GOTO LABEL_2/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '640',
        any: [/^\s*LOCAL:0 = RAND:3 \+ 8\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '648',
        any: [
          /^\s*SIF JUEL:100 > 0 && \(JUEL:8 \+ JUEL:9 \+ JUEL:10\) > 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '651',
        any: [/^\s*DRAWLINE\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '652',
        any: [/^PRINTFORM 调教结果：\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '652-654',
        any: [
          /^\s*SIF TFLAG:58 > 0\s*$/m,
          /PRINTFORM 否定点数\{TFLAG:58\}个抵消。/,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '656',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '658',
        any: [/^FOR JUEL_COUNT,0,13\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '659',
        any: [
          /^\s*IF JUEL_COUNT <= 3 \|\| JUEL_COUNT == 7 \|\| JUEL_COUNT == 12\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '660-666',
        any: [/^\s*IF JUEL_COUNT == 3\s*$/m, /^\s*LOCAL:0 = 15\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '667-674',
        any: [
          /^\s*IF JUEL_COUNT == 12\s*$/m,
          /PRINTFORM 癖好点数：\(/,
          /PRINTFORM %CSTR:7%点数：\(/,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '676-679',
        any: [/^\s*N = JUEL:\(LOCAL:0\) - GOTJUEL:\(LOCAL:0\)\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '681',
        any: [/PRINT  \+ \s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '687',
        any: [/PRINT \)            = /],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '694-700',
        any: [
          /^\s*IF JUEL_COUNT == 11\s*$/m,
          /^\s*LOCAL:0 = 58\s*$/m,
          /^\s*LOCAL:0 = JUEL_COUNT \+ 47\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '701',
        any: [/PRINTFORM %PALAMNAME:\(LOCAL:1\)%点数：\(/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '702-705',
        any: [
          /^\s*N = TFLAG:\(LOCAL:0\) - GOTJUEL:\(LOCAL:1\)\s*$/m,
          /^\s*SETCOLORBYNAME SkyBlue\s*$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '713',
        any: [/PRINT \) - \s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '714-717',
        any: [/^\s*SETCOLORBYNAME LightSalmon\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '719',
        any: [/PRINT  = \s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '728',
        any: [/PRINTL \|/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '736',
        any: [/^CUSTOMDRAWLINE ‥\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '737',
        any: [/^PRINTL 以上的点数变化了。\s*$/m],
      },
      // TRAIN_MAIN.ERB @FIGURE_INDENT
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '743-758',
        any: [/^@FIGURE_INDENT\s*$/m, /^\s*SIF N < 10000000\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
