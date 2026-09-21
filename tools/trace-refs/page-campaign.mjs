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
      {
        // 需求审查（#469）：菜单顶部与 [999] 前是两条分隔线，末条在 :31；
        // DRAWLINE 单行全文多处命中，锚取「分隔线 + 返回行」两行（与
        // :139-140 的 SELECT_CAMPAIGN 同形，属平行复现，非弱锚）
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '31-32',
        any: [/DRAWLINE\nPRINTL \[999\] 返回/],
      },
      {
        // 需求审查（#469）：NO_PAGE 是 CAMPAIGN_MENU 顶的函数级 #DIM，
        // 派遣子菜单反复进出保留页码
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '8',
        any: [/#DIM NO_PAGE = 0/],
      },
      {
        // 规范审查（#469）：主菜单两处越界重问守卫在按钮化后不可达、省略
        // 不写（`*无法在行动进行时进行变更*` 需要 [0] 在战役进行中被渲染，
        // `*请选择行动*` 需要未渲染的编号被回传）
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '38-40',
        any: [/PRINTL \*无法在行动进行时进行变更\*/],
      },
      {
        src: 'target/ERB/侵略/CAMPAIGN/CAMPAIGN_EVENT.ERB',
        ref: '43-45',
        any: [/PRINTL \*请选择行动\*/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
