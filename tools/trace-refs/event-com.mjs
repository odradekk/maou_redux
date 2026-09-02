// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-com.mjs

export const FILES = [
  {
    js: 'ere/event/event-com.js',
    refs: [
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '264',
        any: [/^VARSET TFLAG, 0, 0, 30$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '265',
        any: [/^TFLAG:100 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '267',
        any: [/^REDRAW 1$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
