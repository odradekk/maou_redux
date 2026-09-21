// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #469 按 js 文件拆出：page-campaign.mjs

export const FILES = [
  // —— #469 战役菜单：ere/page/page-campaign.js（CAMPAIGN_EVENT.ERB 的
  //    @CAMPAIGN_MENU / @SELECT_CAMPAIGN 真身）。锚 = 所引区间内全文唯一
  //    的原文行；:127/:98 族为平行复现（同形行多处、窗口同文有正文）——
  {
    js: 'ere/page/page-campaign.js',
    refs: [
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '6-127',
        any: [/@CAMPAIGN_MENU/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '16',
        any: [/TRYCALLFORM CAMPAIGN_NAME_\{FLAG:400\}/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '36-37',
        any: [/^IF RESULT == 999\r?$/m],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '46-67',
        any: [/;奴隷選別/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '48-53',
        any: [/IF BASE:MASTER:1 < 100/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '55-57',
        any: [/赤森奴隶 = 1/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '62-67',
        any: [/PRINTL 消耗了100点気力……/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '68-124',
        any: [/ELSEIF RESULT == 2/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '75',
        any: [/CALL LIFE_LIST\(NO_PAGE,,NUM_PAGE\)/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '98',
        any: [/ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '98-99',
        any: [/ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '98-114',
        any: [/ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '101-102',
        any: [/ELSEIF BASE:RESULT:0 < 1/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '112-114',
        any: [/ELSEIF CFLAG:RESULT:1 != 0/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '116-123',
        any: [/CFLAG:CHARA:1 = 12/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '127',
        any: [/^\s*GOTO INPUT_LOOP\r?$/m],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '130-152',
        any: [/@SELECT_CAMPAIGN/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '137',
        any: [/TRYCALLFORM CAMPAIGN_EXIST_\{LOCAL\}/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '147',
        any: [/TRYCALLFORM CAMPAIGN_SET_\{RESULT\}/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '150',
        any: [/FLAG:401 = 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
