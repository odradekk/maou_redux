// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #335：出售估价与调教后零散结算。

export const FILES = [
  {
    js: 'ere/system/stronghold/sale.js',
    refs: [
      {
        src: 'target/ERB/售卻相關/SELL_CHARA_ESTIMATE.ERB',
        ref: '109-899',
        any: [/@ESTIMATE_CHARA/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_CHARA.ERB',
        ref: '6-451',
        any: [
          /@CHECK_SELLASSIABLE/,
          /@CHARA_SALE/,
          /@KILL_TARGET/,
          /@LONG_GOOD_BYE/,
          /@SALE_CHARA/,
        ],
      },
      {
        src: 'target/ERB/售卻相關/SELL_MILK.ERB',
        ref: '6-57',
        any: [/@SELL_MILK/],
      },
      {
        src: 'target/ERB/售卻相關/SELL_FIGHTMONEY.ERB',
        ref: '2-18',
        any: [/@SELL_FIGHTMONEY/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
