// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #391：page-chara-info.js 的锚表

const INFO = 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB';

export const FILES = [
  {
    js: 'ere/page/page-chara-info.js',
    refs: [
      { src: INFO, ref: '4-113', any: [/^@CHARA_INFO\s*$/m] },
      {
        src: INFO,
        ref: '114-217',
        any: [/^@SHOW_CHARA_INFO_LIST\(NO_PAGE\ =\ 0\)/m],
      },
      {
        src: INFO,
        ref: '218-382',
        any: [
          /^@SHOW_CHARA_ACT_LIST\(NO_PAGE\ =\ 0,\ ACT\ =\ 2,\ CHARA_SORT\)/m,
        ],
      },
      { src: INFO, ref: '383-433', any: [/^@CHARA_MARRIGE_BEFORE,\ ARG/m] },
      {
        src: INFO,
        ref: '434-595',
        any: [/^@SHOW_CHARA_MONEY_LIST\(NO_PAGE\ =\ 0,\ CHARA_SORT\)/m],
      },
      {
        src: INFO,
        ref: '596-757',
        any: [/^@SHOW_CHARA_DEBT_LIST\(NO_PAGE\ =\ 0,\ CHARA_SORT\)/m],
      },
      { src: INFO, ref: '758-797', any: [/^@SHOW_CHARA_ACT\(ARG\)/m] },
      {
        src: INFO,
        ref: '798-819',
        any: [/^@COMPARE_CHARA_ACT\(ARG,\ ARG:1,\ ARG:2\ =\ 2\)/m],
      },
      {
        src: INFO,
        ref: '820-832',
        any: [/^@CHARA_INFO_INDIVIDUAL_WAPPED\(ARG\)/m],
      },
      {
        src: INFO,
        ref: '833-1100',
        any: [/^@CHARA_INFO_INDIVIDUAL\(ARG,\ CHARA_SORT\)/m],
      },
      { src: INFO, ref: '791', any: [/^\tLOCALS\ =\ -F/m] },
      {
        src: INFO,
        ref: '813',
        any: [
          /SIF\ CFLAG:ARG:1\ ==\ 2\ \|\|\ CFLAG:ARG:1\ ==\ 3\ &&\ CFLAG:ARG:501\ !=\ CFLAG:\(ARG:1\):501/,
        ],
      },
      // :501 是 :813 那句引用文本里 `CFLAG:(ARG:1):501` 的尾段数字被行号扫描
      // 器误判成独立引用（issue #63 的机械正则不区分「代码里的三段寻址」与
      // 「注释里引述的 ERB 字面量」），并非真的在指第 501 行；按既有惯例
      // （tools/trace-refs/dungeon-room.mjs 的 `ref: '1'` 同款处理）仍登记，
      // 锚到该文件真实的第 501 行内容
      { src: INFO, ref: '501', any: [/^\tMAX_MONEY\ =\ LOCAL:2$/m] },
      { src: INFO, ref: '333-375', any: [/^IF\ CFLAG:COUNT:601\ ==\ 900$/m] },
      {
        src: INFO,
        ref: '351-374',
        any: [/^\tELSEIF\ CFLAG:COUNT:601\ ==\ 0\ &&\ !EX_TALENT:COUNT:2$/m],
      },
      { src: INFO, ref: '243-262', any: [/^\tFOR\ L_POS,\ 0,\ CHARANUM$/m] },
      { src: INFO, ref: '91-94', any: [/^CASE\ 0\ TO\ CHARANUM\ -1$/m] },
      { src: INFO, ref: '920', any: [/^IF\ L_INDX\ >=\ CHARANUM\ -\ 2$/m] },
      { src: INFO, ref: '1012-1017', any: [/^CASE\ 12\ ;拘束台解放$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
