// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：cloth-lookup.mjs

export const FILES = [
  // —— #215 J5 服装：ere/system/cloth-lookup.js ——
  {
    js: 'ere/system/cloth-lookup.js',
    refs: [
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '707-888',
        any: [/^\s*@GET_CLOTHTYPE_MAIN2\(L_A = -1, L_VERB = ""\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '998-1109',
        any: [/^\s*@GET_CLOTHTYPE_SPECIAL\(L_A = -1\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '73',
        any: [
          /^\s*PRINTFORML %SAVESTR:TARGET%现在%GET_CLOTHTYPE_MAIN2\(TARGET,"身穿"\)%。$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '168',
        any: [/^\s*PRINTV GET_CLOTHTYPE_MAIN2\(TARGET,"脱下"\)$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '176',
        any: [/^\s*PRINTFORML %GET_CLOTHTYPE_MAIN2\(TARGET,"换上"\)%了。$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '716-886',
        any: [/^\s*CASE 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '1006-1107',
        any: [/^\s*SELECTCASE CFLAG:L_A:42$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '884-885',
        any: [/^\s*CASEELSE$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '1105-1106',
        any: [/^\s*CASEELSE$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
