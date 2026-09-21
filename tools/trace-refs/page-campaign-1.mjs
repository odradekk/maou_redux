// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #469 按 js 文件拆出：page-campaign-1.mjs

export const FILES = [
  // —— #469 战役 1「赤蛮咒森」：ere/page/page-campaign-1.js（CAMPAIGN_1.ERB
  //    的 13 个编号函数实现）。锚 = 所引区间内全文唯一的原文行；:78 为
  //    平行复现（战役名在 NAME_1/ENDING_1 各出现一次、同文有正文），:369
  //    为空 PRINTW 整行（#235 放行形态）——
  {
    js: 'ere/page/page-campaign-1.js',
    refs: [
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '51-57',
        any: [/PRINT \[1\]/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '59-71',
        any: [/FLAG:400 = 1/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '62',
        any: [/FLAG:400 = 1/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '73-81',
        any: [/;PRINT ロード・トゥ・クリムゾン・フォレスト/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '76',
        any: [/;PRINT ロード・トゥ・クリムゾン・フォレスト/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '78',
        any: [/PRINT 赤森謎路/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '80',
        any: [/PRINT -ROAD・to・CRIMSON・FOREST-/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '84-95',
        any: [/#DIM ROOM/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '98-112',
        any: [/#DIM EXTRA/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '115-168',
        any: [/#DIM TRAP_ID/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '171-189',
        any: [/#DIM RING/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '192-258',
        any: [/#DIM MONID/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '199',
        any: [/DICE = RAND:3/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '261-275',
        any: [/;敵ダンジョンの出現敵拡張をロードする/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '278-281',
        any: [/;ダンジョンLVをロードする/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '284-307',
        any: [/;特定の素質を持った奴隷じゃないと進めないとか/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '310-357',
        any: [/;ストーリー文。シナリオ/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '360-380',
        any: [
          /PRINTFORMW 「为何、为何这个女人……不受诱惑！？　神像之力竟不奏效……竟有这种事」/,
        ],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '363-368',
        any: [
          /PRINTFORMW 「为何、为何这个女人……不受诱惑！？　神像之力竟不奏效……竟有这种事」/,
        ],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '369',
        any: [/^\s*PRINTW\s*$/m],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '374',
        any: [/PRINTW ――/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB',
        ref: '375-378',
        any: [/PRINTW -ROAD・to・CRIMSON・FOREST-（終）/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
