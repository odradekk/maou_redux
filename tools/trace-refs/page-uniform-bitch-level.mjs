// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #545：page-uniform-bitch-level.js 的锚表（统一卖春积极性.ERB 全
// 1 函数，:2-76）。三段同构分支（侵攻/迎击/全部）的 PRINTBUTTON/REPEAT/
// SIF/N:9 各只在同一文件里以完全相同的文本出现，锚按 ident_payload 计。
const UBL = 'target/ERB/魔改新增/统一卖春积极性.ERB';
const INFO = 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB';

export const FILES = [
  {
    js: 'ere/page/page-uniform-bitch-level.js',
    refs: [
      { src: UBL, ref: '2-76', any: [/^@统一卖春积极性\s*$/m] },
      {
        src: INFO,
        ref: '62-63',
        any: [/^\s*CALL 统一卖春积极性\s*$/m],
      },
      { src: UBL, ref: '3', any: [/^\tN:9 = 0\s*$/m] },
      {
        src: UBL,
        ref: '4',
        any: [/^\tPRINTFORML 统一设置迷宫内角色的/m],
      },
      {
        src: UBL,
        ref: '5',
        any: [/^\tPRINTBUTTON "\[ 全侵攻中的勇者 \]  ", 2000\s*$/m],
      },
      {
        src: UBL,
        ref: '6',
        any: [/^\tPRINTBUTTON "  \[ 全迎击中的奴隶 \]  ", 2001\s*$/m],
      },
      {
        src: UBL,
        ref: '7',
        any: [/^\tPRINTBUTTON "  \[ 所有侵攻与迎击者 \]  ", 2002\s*$/m],
      },
      { src: UBL, ref: '8', any: [/PRINTBUTTON "  \[ 取消設置 \]  ", 2003/m] },
      { src: UBL, ref: '9', any: [/^\tPRINTFORML\s*$/m] },
      { src: UBL, ref: '10', any: [/^\tINPUT\s*$/m] },
      { src: UBL, ref: '11', any: [/^\tIF RESULT == 2000\s*$/m] },
      {
        src: UBL,
        ref: '12',
        any: [/^\t\tPRINTFORML 要将积极性设置为多少？\s*$/m],
      },
      {
        src: UBL,
        ref: '13-18',
        any: [/^\t\tPRINTBUTTON "\[ 0 \]  ", 0\s*$/m],
      },
      { src: UBL, ref: '20', any: [/^\t\tINPUT\s*$/m] },
      { src: UBL, ref: '21', any: [/IF  RESULT < 6/m] },
      { src: UBL, ref: '22', any: [/^\t{3}N:9 = RESULT\s*$/m] },
      { src: UBL, ref: '23-29', any: [/^\t{3}REPEAT CHARANUM\s*$/m] },
      { src: UBL, ref: '24', any: [/^\t{4}SIF COUNT == MASTER\s*$/m] },
      { src: UBL, ref: '26', any: [/^\t{4}IF CFLAG:COUNT:1 == 2\s*$/m] },
      { src: UBL, ref: '27', any: [/^\t{5}CFLAG:COUNT:120 = N:9\s*$/m] },
      {
        src: UBL,
        ref: '31',
        any: [/^\t\tPRINTFORMW 已将当前迷宫侵攻中的勇者/m],
      },
      { src: UBL, ref: '32', any: [/^\tELSEIF RESULT == 2001\s*$/m] },
      {
        src: UBL,
        ref: '33',
        any: [/^\t\tPRINTFORML 要将积极性设置为多少？\s*$/m],
      },
      { src: UBL, ref: '34-39', any: [/^\t\tPRINTBUTTON "\[ 0 \]  ", 0\s*$/m] },
      { src: UBL, ref: '42', any: [/IF  RESULT < 6/m] },
      { src: UBL, ref: '47', any: [/^\t{4}IF CFLAG:COUNT:1 == 3\s*$/m] },
      { src: UBL, ref: '48', any: [/^\t{5}CFLAG:COUNT:120 = N:9\s*$/m] },
      {
        src: UBL,
        ref: '52',
        any: [/^\t\tPRINTFORMW 已将当前迷宫全迎击中的奴隶/m],
      },
      { src: UBL, ref: '63', any: [/IF  RESULT < 6/m] },
      { src: UBL, ref: '44-50', any: [/^\t{3}REPEAT CHARANUM\s*$/m] },
      { src: UBL, ref: '53', any: [/^\tELSEIF RESULT == 2002\s*$/m] },
      {
        src: UBL,
        ref: '54',
        any: [/^\t\tPRINTFORML 要将积极性设置为多少？\s*$/m],
      },
      { src: UBL, ref: '55-60', any: [/^\t\tPRINTBUTTON "\[ 0 \]  ", 0\s*$/m] },
      {
        src: UBL,
        ref: '68',
        any: [/^\t{4}IF CFLAG:COUNT:1 == 2 \|\| CFLAG:COUNT:1 == 3\s*$/m],
      },
      { src: UBL, ref: '69', any: [/^\t{5}CFLAG:COUNT:120 = N:9\s*$/m] },
      { src: UBL, ref: '65-71', any: [/^\t{3}REPEAT CHARANUM\s*$/m] },
      {
        src: UBL,
        ref: '73',
        any: [/^\t\tPRINTFORMW 已将当前迷宫所有侵攻与迎击者/m],
      },
      { src: UBL, ref: '74-75', any: [/^\tELSE\s*$/m] },
      { src: UBL, ref: '76', any: [/^\tJUMP CHARA_INFO\s*$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
