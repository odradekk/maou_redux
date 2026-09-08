// 源: tools/trace-check.mjs @FILES（issue #338：SELL_MATURO_K0 全文）

export const FILES = [
  {
    js: 'ere/system/stronghold/sell-maturo-k0.js',
    refs: [
      {
        src: 'target/ERB/售卻相關/SELL_MATURO.ERB',
        ref: '29-2099',
        any: [/^@SELL_MATURO_K0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {
  'sale-natural': [
    {
      js: 'tools/compare/rules.js',
      refs: [
        {
          ref: '89-142',
          any: [/要提高谁的能力值？/],
        },
        {
          ref: '144-178',
          any: [/要提高谁的能力值？/],
        },
      ],
    },
    {
      js: 'tools/compare/replay-b.js',
      refs: [
        {
          ref: '177-219',
          any: [/温妮能卖出14430点的样子。/],
        },
      ],
    },
  ],
};
