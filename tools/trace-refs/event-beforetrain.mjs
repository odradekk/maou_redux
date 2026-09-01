// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-beforetrain.mjs

export const FILES = [
  {
    js: 'ere/event/event-beforetrain.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB',
        ref: '6-201',
        any: [/@PRITRAIN_MESSAGE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB',
        ref: '207-270',
        any: [/@PRITRAIN_MESSAGE_NOCLOTHES/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_BEFORETRAIN.ERB',
        ref: '266-323',
        any: [/@PRITRAIN_MESSAGE_CLOTHED/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
