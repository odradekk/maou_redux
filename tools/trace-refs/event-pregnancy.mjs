// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS

export const FILES = [
  {
    js: 'ere/event/event-pregnancy.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_PREGNANCY.ERB',
        ref: '196-274',
        any: [/@NAKADASHI_CHECK, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_PREGNANCY.ERB',
        ref: '143-151',
        any: [/^@IN_VAGINA_SYOKU_TO_T$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_PREGNANCY.ERB',
        ref: '389-399',
        any: [/^@CONCEPTION_CHECK_SYOKU_TO_T$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
