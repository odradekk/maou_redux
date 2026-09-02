// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-condom.mjs

export const FILES = [
  // —— #216 J6 跨族共用子程序：锚按「源文件对应行内容的逐字正则」机械
  //    生成（首个非空行 + 可选 ; 前缀），后续改动引用时按同法同步 ——
  {
    js: 'ere/system/train/com-condom.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '10-40',
        any: [/^\s*;?\s*@CONDOM_SETTINGS$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '42-163',
        any: [/^\s*;?\s*@CONFIRM_CONDOM$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '165-183',
        any: [/^\s*;?\s*@CONFIRM_CONDOM2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '14',
        any: [/^\s*;?\s*PRINTFORML\ 现在：%LOCALS:\(CFLAG:61\)%$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '66',
        any: [/^\s*;?\s*毎回確認かつ安全套所持の場合、確認する$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '69',
        any: [/^\s*;?\s*PRINTL\ 要戴套吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '146-150',
        any: [/^\s*;?\s*RETURN\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '11-12',
        any: [/^\s*;?\s*SIF\ TARGET\ <\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '12',
        any: [/^\s*;?\s*RETURN\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '13',
        any: [/^\s*;?\s*PRINTFORML\ 和%SAVESTR:TARGET%做爱要戴套吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '15',
        any: [/^\s*;?\s*DRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '16',
        any: [/^\s*;?\s*PRINTL\ \[0\]\ 每次都问$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '17',
        any: [/^\s*;?\s*PRINTL\ \[1\]\ 有套就用$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '18',
        any: [/^\s*;?\s*PRINTL\ \[2\]\ 每次都直接来，来个痛快$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '19',
        any: [/^\s*;?\s*PRINTL\ \[9\]\ 返回$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '21',
        any: [/^\s*;?\s*INPUT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '24',
        any: [/^\s*;?\s*RETURN\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '26',
        any: [/^\s*;?\s*PRINTW\ 每次确认。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '27',
        any: [/^\s*;?\s*CFLAG:61\ =\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '29',
        any: [/^\s*;?\s*PRINTW\ 使用安全套。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '30',
        any: [/^\s*;?\s*CFLAG:61\ =\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '32',
        any: [/^\s*;?\s*PRINTFORMW\ 和%SAVESTR:TARGET%直接做。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '33',
        any: [/^\s*;?\s*CFLAG:61\ =\ 2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '35',
        any: [/^\s*;?\s*GOTO\ INPUT_LOOP_01$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '46',
        any: [/^\s*;?\s*RETURN\ 1:コマンド続行$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '48',
        any: [/^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '50',
        any: [/^\s*;?\s*安全套使わない設定なら続行$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '52',
        any: [/^\s*;?\s*RETURN\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '54',
        any: [/^\s*;?\s*SIF\ TEQUIP:89$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '57-98',
        any: [/^\s*;?\s*SIF\ TEQUIP:55$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '61',
        any: [/^\s*;?\s*RETURN\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '62',
        any: [/^\s*;?\s*調教者が既に安全套してるなら続行$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '63',
        any: [
          /^\s*;?\s*SIF\ \(!ASSIPLAY\ \&\&\ TEQUIP:35\)\ \|\|\ \(ASSIPLAY\ \&\&\ TEQUIP:36\)$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '65',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '67',
        any: [/^\s*;?\s*IF\ CFLAG:61\ ==\ 0\ \&\&\ ITEM:24$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '70',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 戴$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '73',
        any: [/^\s*;?\s*PRINTL\ 让使用安全套吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '76',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '78',
        any: [/^\s*;?\s*PRINTL\ \ \[3\]\ \-\ 今后都戴套$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '79',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '81',
        any: [/^\s*;?\s*INPUT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '82',
        any: [/^\s*;?\s*SELECTCASE\ RESULT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '83',
        any: [/^\s*;?\s*CASE\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '85',
        any: [/^\s*;?\s*IF\ !ASSIPLAY$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '87',
        any: [/^\s*;?\s*TEQUIP:35\ =\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '88',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '89',
        any: [/^\s*;?\s*PRINTFORML\ 让%SAVESTR:PLAYER%戴着套。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '91',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '92',
        any: [/^\s*;?\s*RETURN\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '93',
        any: [/^\s*;?\s*CASE\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '95',
        any: [/^\s*;?\s*CASE\ 2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '101-141',
        any: [/^\s*;?\s*CFLAG:61\ =\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '105',
        any: [/^\s*;?\s*ENDSELECT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '107',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '108',
        any: [/^\s*;?\s*自動で使う場合$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '110',
        any: [/^\s*;?\s*安全套があるか$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '111',
        any: [/^\s*;?\s*IF\ ITEM:24\ >\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '113-137',
        any: [/^\s*;?\s*ITEM:24\ \-=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '115',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:PLAYER%戴着套。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '118-120',
        any: [/^\s*;?\s*PRINTFORML\ 让%SAVESTR:PLAYER%戴着套。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '121',
        any: [/^\s*;?\s*RETURN\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '122',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '123',
        any: [/^\s*;?\s*ない場合、魔王さまの技巧Lvが5未満だと生でしてしまう$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '126',
        any: [/^\s*;?\s*PRINTFORM\ 没有安全套，直接来。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '128',
        any: [/^\s*;?\s*PRINTFORML\ 来吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '130',
        any: [/^\s*;?\s*PRINTFORML\ 让吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '131',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '132',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 好的\(下次也继续确认\)$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '134',
        any: [/^\s*;?\s*PRINTL\ \ \[2\]\ \-\ 不要$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '136',
        any: [/^\s*;?\s*\$INPUT_LOOP_02$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '138',
        any: [/^\s*;?\s*SELECTCASE\ RESULT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '162',
        any: [/^\s*;?\s*安全套を使うかの確認2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '183',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '167',
        any: [
          /^\s*;?\s*IF\ TEQUIP:37\ ==\ 0\ \&\&\ ITEM:24\ \&\&\ \(TALENT:TARGET:121\ \|\|\ TALENT:TARGET:122\)\ \&\&\ CFLAG:MASTER:61\ !=\ 2$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '168',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%使用安全套吗？$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '169',
        any: [/^\s*;?\s*PRINTL\ \ \[0\]\ \-\ 用$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '170',
        any: [/^\s*;?\s*PRINTL\ \ \[1\]\ \-\ 这次直接来$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '172',
        any: [/^\s*;?\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '173',
        any: [/^\s*;?\s*PRINTFORML\ %SAVESTR:TARGET%戴着套$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '174',
        any: [/^\s*;?\s*ITEM:24\ \-=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '176',
        any: [/^\s*;?\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF_CONDOM.ERB',
        ref: '178',
        any: [/^\s*;?\s*ELSEIF\ RESULT\ !=\ 1$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
