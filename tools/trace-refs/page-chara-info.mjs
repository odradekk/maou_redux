// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #391：page-chara-info.js 的锚表

const INFO = 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB';

export const FILES = [
  {
    js: 'ere/page/page-chara-info.js',
    refs: [
      // #397（N13）接线：CASE 10/11 的调用点回显
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1003',
        any: [/^\s*CALL ABILITY_UP_CORE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1009',
        any: [/^\s*CALL TAILOR_CORE\(ARG\)\s*$/m],
      },
      { src: INFO, ref: '4-113', any: [/^@CHARA_INFO\s*$/m] },
      {
        src: INFO,
        ref: '114-217',
        any: [/^@SHOW_CHARA_INFO_LIST\(NO_PAGE\ =\ 0\)/m],
      },
      // #530：名册第一行（魔王行）的编号格——从纯文本升级为真按钮
      {
        src: INFO,
        ref: '141-143',
        any: [
          /^;\ 第一行，魔王$/m,
          /^PRINTFORML\ %LOCALS,\ MAX_NUM_LEN\+2,\ RIGHT% /m,
        ],
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
      // —— #384（N2）：改名按钮与两条改名交互分支的调用点 ——
      {
        src: INFO,
        ref: '858-859',
        any: [/^CALL SHOW_BUTTON_NAME_EDIT\(0,ARG,0\) ;名前を変える$/m],
      },
      {
        src: INFO,
        ref: '1045',
        any: [/^\tCALL CHARA_INFO_NAME_EDIT\(ARG,0\)$/m],
      },
      {
        src: INFO,
        ref: '1048',
        any: [/^\tCALL CHARA_INFO_NAME_EDIT\(ARG,1\)$/m],
      },
      {
        src: INFO,
        ref: '863',
        any: [/^CALL SHOW_BUTTON_CHILD_CARE\(5,ARG\) ;育児室の訪問$/m],
      },
      {
        src: INFO,
        ref: '1060',
        any: [/^\tCALL CHILD_CARE_CHARA\(ARG\)$/m],
      },
      // #393 接线：三个动作按钮与三个动作分支的调用点回显
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '860-862',
        any: [
          /^\s*CALL SHOW_BUTTON_JOB_CHANGE\(2,ARG\).*$\n^\s*CALL SHOW_BUTTON_TEMPTATION\(3,ARG\).*$\n^\s*CALL SHOW_BUTTON_MARRIAGE\(4,ARG\).*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1051',
        any: [/^\s*CALL CHARA_INFO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1054',
        any: [/^\s*CALL TEMPTATION\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1057',
        any: [/^\s*CALL MARRIAGE\(ARG\)\s*$/m],
      },
      // #393 接线：三个动作按钮与三个动作分支的调用点回显
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1051',
        any: [/^\s*CALL CHARA_INFO_JOB_CHANGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1054',
        any: [/^\s*CALL TEMPTATION\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1057',
        any: [/^\s*CALL MARRIAGE\(ARG\)\s*$/m],
      },
      // #393 接线：个别信息页的收尾（被调方 RESULT 0/1 上浮、其余重画）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1094-1097',
        any: [/^\s*IF RESULT == 0 \|\| RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1094-1099',
        any: [/^\s*IF RESULT == 0 \|\| RESULT == 1\s*$/m],
      },
      // #542：[20] 更换立绘按钮的原作守卫与 PTJ_BUTTON 调用点（打工 MOD 判
      // 不移植，[18] 走默认态分支的 SHOW_BUTTON_BICH_LEVEL）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '870-871',
        any: [
          /^SIF 立绘 && CFLAG:ARG:1 == 0 && ARG != MASTER$/m,
          /^\s*PRINT \[20\] 更换立绘$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '883',
        any: [/^\s*CALL PTJ_BUTTON\(ARG\)\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
