// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-usercom.mjs

export const FILES = [
  {
    js: 'ere/page/page-usercom.js',
    refs: [
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '9-13',
        any: [/^IF GETBIT\(FLAG:5,34\)$/m, /^CALL SHOW_COMMENU$/m],
      },
      // #212：@P_C（TRAIN_MAIN.ERB:771-780，上次的调教指令名）
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '773',
        any: [/^TSTR:90 '= TRAINNAME:LOCAL$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '775-776',
        any: [
          /^SIF STRLENSU\(TSTR:90\) < 1$/m,
          /^\tTSTR:90 '= TRAIN_NAME:LOCAL$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '778-779',
        any: [/^SIF STRLENSU\(TSTR:90\) < 1$/m, /^\tTSTR:90 = 　$/m],
      },
      // #213：按钮编号/标签的换算依据（@SHOW_COMMENU 的方格行）
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '188-216',
        any: [/@SHOW_COMMENU/, /FOR L_I,0,300/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '211',
        any: [/PRINTFORMC %TRAINNAME:64%・%TRAINNAME:L_I%/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '213',
        any: [/PRINTFORMC %TRAIN_NAME:RESULT%/],
      },
      { src: 'target/ERB/調教相關/USERCOM.ERB', ref: '14', any: [/^PRINTL$/m] },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '15',
        any: [/^DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '16',
        any: [/^RESETCOLOR$/m],
      },
      // #214：子菜单按钮组与 @USERCOM 全分支
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '17-91',
        any: [/PRINTC 能力表示\[100\]/, /PRINTC 调教结束\[999\]/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '17',
        any: [/^PRINTC 能力表示\[100\]$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '18',
        any: [/^PRINTC 污秽表示\[101\]$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '20-35',
        any: [/IF ASSI > 0 && ASSI:1 > 0/, /CFLAG:0 >= 2/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '21',
        any: [/^\tPRINTC 交代助手\[102\]$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '20',
        any: [/^IF ASSI > 0 && ASSI:1 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '28',
        any: [/^IF \(TARGET == MASTER \|\| CFLAG:0 >= 2\) && ASSI:1 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '29',
        any: [/^\tPRINTC 对换调教\[112\]$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '36',
        any: [/^PRINTC 避孕套设定\[103\]$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '38-84',
        any: [/^\t*PRINTC 爱抚系过滤\[104\]/m, /^\t*PRINTC ＳＭ系过滤\[108\]/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '85',
        any: [/PRINTC 调教菜单登录\[990\]/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '86',
        any: [/^\tPRINTL$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '88',
        any: [/PRINTC 调教菜单表示\[991\]/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '89',
        any: [/PRINTC 调教菜单实行\[992\]/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '91',
        any: [/^PRINTC 调教结束\[999\]$/m],
      },
      { src: 'target/ERB/調教相關/USERCOM.ERB', ref: '92', any: [/^PRINTL$/m] },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '93-100',
        any: [/^IF PREVCOM > -1$/m, /^CALL P_C$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '103',
        any: [/^REDRAW 1$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '104-106',
        any: [/^IF RESULT == 100$/m, /^CALL SHOW_CHARA_INFO\(TARGET\)$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '107-109',
        any: [/^ELSEIF RESULT == 101$/m, /^CALL STAIN_INFO$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '108',
        any: [/^\tCALL STAIN_INFO$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '110',
        any: [/^ELSEIF RESULT == 102 && ASSI > 0 && ASSI:1 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '110-122',
        any: [/^ELSEIF RESULT == 102/, /^\tIF TARGET == MASTER$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '111-113',
        any: [
          /^\tIF TARGET == MASTER$/m,
          /PLAYER == TARGET:1 \? ASSI:1 # TARGET:1/,
        ],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '114-116',
        any: [
          /^ELSEIF TARGET == TARGET:1$/m,
          /PLAYER == MASTER \? ASSI:1 # MASTER/,
        ],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '117-119',
        any: [/PLAYER == MASTER \? TARGET:1 # MASTER/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '121',
        any: [/^\tASSIPLAY = PLAYER != MASTER \? 1 # 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '123',
        any: [
          /^ELSEIF RESULT == 112 && \(TARGET == MASTER \|\| CFLAG:0 >= 2\) && ASSI:1 > 0$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '123-128',
        any: [/^ELSEIF RESULT == 112/, /^\tSWAP TARGET, PLAYER$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '125-126',
        any: [
          /SIF PLAYER == ASSI:1 \|\| PLAYER == TARGET:1/,
          /^\t\tASSI = PLAYER$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '127',
        any: [/^\tASSIPLAY = PLAYER != MASTER \? 1 # 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '129-131',
        any: [/^ELSEIF RESULT == 103$/m, /^CALL CONDOM_SETTINGS$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '132-161',
        any: [/^ELSEIF RESULT == 104$/m, /FLAG:25 \|= 16/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '162-164',
        any: [/^ELSEIF RESULT == 990$/m, /^CALL COMSEQ_REGISTER$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '165-170',
        any: [/^ELSEIF RESULT == 991 && FLAG:550 > 0/, /^\tWAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '171-172',
        any: [
          /^ELSEIF RESULT == 992 && FLAG:550 > 0/,
          /^\tCALL COMSEQ_TRAIN$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '173-175',
        any: [/^ELSEIF RESULT == 999$/m, /^\tBEGIN AFTERTRAIN$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '177',
        any: [/^RETURN 0$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '179-180',
        any: [/@SET_CLEAR_POINT/, /^TFLAG:999 = LINECOUNT$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '182-186',
        any: [/@CLEAR_TO_POINT/, /CLEARLINE LINECOUNT - TFLAG:999/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '200-203',
        any: [/^\tRESULT = 1$/m, /TRYCALLFORM COM_ABLE\{L_I\}/],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '202-203',
        any: [/^\tSIF RESULT == 0$/m, /^\t\tCONTINUE$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '209',
        any: [/^\tCALL GET_ADV_COM, L_I$/m],
      },
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '209-214',
        any: [/^\tCALL GET_ADV_COM, L_I$/m, /IF RESULT == 64 && L_I != 64/],
      },
      { src: 'target/ERB/調教相關/USERCOM.ERB', ref: '216', any: [/^NEXT$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
