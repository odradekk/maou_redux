// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-autotrain.mjs

export const FILES = [
  {
    js: 'ere/event/event-autotrain.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_AUTOTRAIN.ERB',
        ref: '11-47',
        any: [/@AUTOTRAIN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AUTOTRAIN.ERB',
        ref: '51-87',
        any: [/@FORMAT_AUTOTRAIN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AUTOTRAIN.ERB',
        ref: '91-104',
        any: [/@BEFORE_AUTOTRAIN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AUTOTRAIN.ERB',
        ref: '108-159',
        any: [/@AFTER_AUTOTRAIN/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
