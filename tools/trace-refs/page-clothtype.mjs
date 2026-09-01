// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-clothtype.mjs

export const FILES = [
  // —— #215 J5 服装：ere/page/page-clothtype.js ——
  {
    js: 'ere/page/page-clothtype.js',
    refs: [
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '35-58',
        any: [/^\s*@PRINT_CLOTHTYPE$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '61-156',
        any: [/^\s*@PRINT_CLOTHTYPE_MAIN$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '530-703',
        any: [/^\s*@PRINT_CLOTHTYPE_MAIN2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '892-994',
        any: [/^\s*@PRINT_CLOTHTYPE_SPECIAL$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '74-96',
        any: [/^\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '531-703',
        any: [/^\s*IF CFLAG:41 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '894-992',
        any: [/^\s*IF CFLAG:42 == 1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '701-702',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '102',
        any: [
          /^\s*IF TALENT:122 == 0 && TALENT:116 == 0 && \(TALENT:109 == 0 \|\| TALENT:132 == 0\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '126',
        any: [
          /^\s*IF TALENT:122 == 0 && TALENT:116 == 0 && \(TALENT:109 == 0 \|\| TALENT:132 == 0\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '63-65',
        any: [/^\s*IF CFLAG:41 == 192 && \(CFLAG:40 & 16\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '67-83',
        any: [/^\s*ELSEIF CFLAG:41 == 109$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '86-110',
        any: [/^\s*IF CFLAG:41 >= 201 && CFLAG:41 <= 300$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '112-154',
        any: [/^\s*IF \(CFLAG:40 & 28\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '37-40',
        any: [/^\s*IF FLAG:37 == 0 \|\| CFLAG:41 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '43-46',
        any: [/^\s*IF CFLAG:42 == 11 && \(CFLAG:40 & 64\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '49',
        any: [/^\s*CALL PRINT_CLOTHTYPE_MAIN$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '52-56',
        any: [/^\s*IF CFLAG:42$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
