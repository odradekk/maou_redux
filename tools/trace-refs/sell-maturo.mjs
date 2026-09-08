// 源: tools/trace-check.mjs @FILES（issue #337：SELL_MATURO_K1/K2 全文）

export const FILES = [
  {
    js: 'ere/system/stronghold/sell-maturo.js',
    refs: [
      {
        src: 'target/ERB/售卻相關/SELL_MATURO_K1.ERB',
        ref: '25-1381',
        any: [/^@SELL_MATURO_K1$/m],
      },
      {
        src: 'target/ERB/售卻相關/SELL_MATURO_K2_牝犬.ERB',
        ref: '9-224',
        any: [/^@SELL_MATURO_K2$/m],
      },
      {
        src: 'target/ERB/售卻相關/SELL_MATURO_K2_牝犬.ERB',
        ref: '225-297',
        any: [/^@SELL_MATURO_K2_101$/m, /^@SELL_MATURO_K2_4$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
