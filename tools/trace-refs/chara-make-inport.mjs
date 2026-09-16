// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #394 新增：ere/chara/chara-make-inport.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-make-inport.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '2-126',
        any: [/^[ \t]*@CHARA_MAKE_INPORT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '52',
        any: [/^[ \t]*NAME:CHARA\ =\ CALLNAME\(NO:CHARA,\ 0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '49',
        any: [/^[ \t]*SAVESTR:CHARA\ =\ %LOCALS:3%[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '51',
        any: [/^[ \t]*CALLNAME:CHARA\ =\ %LOCALS:3%[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '54-103',
        any: [/^[ \t]*SPLIT\ LOCALS:4,\ "\/",\ RESULTS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '9-10',
        any: [/^[ \t]*SIF\ FLAG:76\ <=\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '12-13',
        any: [/^[ \t]*VARSET\ LIST,\ \-100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '15-35',
        any: [/^[ \t]*FOR\ LOCAL,\ 0,\ 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '16-17',
        any: [/^[ \t]*SIF\ GLOBALS:LOCAL\ ==\ ""[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '19-20',
        any: [/^[ \t]*SIF\ TOINT\(RESULTS:2\)\ >\ FLAG:76[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '21-27',
        any: [/^[ \t]*FOR\ LOCAL:2,\ 0,\ CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '24',
        any: [/^[ \t]*LOCAL:3\ =\ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '25',
        any: [/^[ \t]*BREAK[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '28-29',
        any: [/^[ \t]*SIF\ LOCAL:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '31-32',
        any: [/^[ \t]*SIF\ GETCHARA\(TOINT\(RESULTS:1\),\ 0\)\ >=\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '33',
        any: [/^[ \t]*LIST:\(LOCAL:1\)\ =\ LOCAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '34',
        any: [/^[ \t]*LOCAL:1\+\+[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '38-39',
        any: [/^[ \t]*SIF\ !LOCAL:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '42',
        any: [
          /^[ \t]*SPLIT\ GLOBALS:\(LIST:\(RAND:\(LOCAL:1\)\)\),\ "_",\ LOCALS[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '44-45',
        any: [/^[ \t]*ADDVOIDCHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '47',
        any: [/^[ \t]*NO:CHARA\ =\ TOINT\(LOCALS:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '49-51',
        any: [/^[ \t]*SAVESTR:CHARA\ =\ %LOCALS:3%[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '106-108',
        any: [/^[ \t]*CFLAG:CHARA:501\ =\ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '108',
        any: [/^[ \t]*CFLAG:CHARA:1\ =\ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '109-118',
        any: [/^[ \t]*IF\ FLAG:77[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '111',
        any: [/^[ \t]*CFLAG:CHARA:9\ =\ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '112',
        any: [/^[ \t]*EXP:CHARA:80\ =\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '113-117',
        any: [/^[ \t]*IF\ FLAG:60\ >\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '115',
        any: [/^[ \t]*CALL\ ST_UP,\ CHARA[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '119-120',
        any: [/^[ \t]*BASE:CHARA:0\ =\ MAXBASE:CHARA:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '123-124',
        any: [/^[ \t]*SIF\ CFLAG:\(CHARA\):451\ ==\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INPORT.ERB',
        ref: '126',
        any: [/^[ \t]*RETURN\ CHARA[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
