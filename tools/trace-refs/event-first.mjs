// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-first.mjs

export const FILES = [
  // —— #181 H12 2D 地下城（新增引用，该文件其余引用见豁免表）：ere/event/event-first.js ——
  {
    js: 'ere/event/event-first.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '67',
        any: [/	CALL GEO_TEST/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '68',
        any: [/	CALL SET_VIL/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
