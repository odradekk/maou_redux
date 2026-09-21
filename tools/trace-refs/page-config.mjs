// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #463 新增：ere/page/page-config.js ↔ target/ERB/SYSTEM/CONFIG.ERB
// 锚按「所引行（区间取首个带正文行）的整行字面量」生成（逐条在场校验 + 源侧锚
// 校验由 trace-check 执行）。本文件只登记 page-config.js 注释里实际出现的引用
// （文件头的函数级区间 + 两处单行引用），非逐行穷举——CONFIG.ERB 全文的逐行
// 追溯不是本票范围。

export const FILES = [
  {
    js: 'ere/page/page-config.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '3-27',
        any: [/^\s*@CONFIG_FILTER_SETTING\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '30-44',
        any: [/^\s*@CONFIG_SHOW_FILTER_STATUS\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '47-67',
        any: [/^\s*@CONFIG_VIRGIN_CONCEDED_SETTING\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '70-82',
        any: [/^\s*@CONFIG_VIRGIN_CONCEDED_STATUS\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '85-116',
        any: [/^\s*@CONFIG_PENIS_YOU_SETTING\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '53',
        any: [/^\s*冒險者性別\s*=\s*-1\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '118-134',
        any: [/^\s*@冒險者性別顯示\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '136-145',
        any: [/^\s*@卖淫影响\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '148-290',
        any: [/^\s*@CONFIG\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '182',
        any: [
          /^\s*;PRINTFORML\s+\[22\]\s+男冒险者许可\s+现在：\\@\s+GETBIT\(FLAG:8,0\)\s+\?\s+许可\s+#\s+禁止\s+\\@\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '206-286',
        any: [/^\s*LOCAL = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '243-245',
        any: [/^\s*ELSEIF LOCAL >= 22 && LOCAL <= 25\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/CONFIG.ERB',
        ref: '288-290',
        any: [/^\s*REDRAW 0\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
