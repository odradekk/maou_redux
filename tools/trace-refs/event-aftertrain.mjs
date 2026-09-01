// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-aftertrain.mjs

export const FILES = [
  {
    js: 'ere/event/event-aftertrain.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '6-85',
        any: [/@CHARADEAD_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '100-128',
        any: [/TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '140-250',
        any: [/@AFTERTRAIN_SEX_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '255-349',
        any: [/@AFTERTRAIN_ANALSEX_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '354-546',
        any: [/TALENT:121/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '551-703',
        any: [/@AFTERTRAIN_MASTURBATION_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '708-842',
        any: [/@AFTERTRAIN_BEASTSEX_CHECK/],
      },
      // #270：三处与源对齐的内联行号
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '231-232',
        any: [/^TFLAG:13 = 4$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '480-481',
        any: [/^TFLAG:13 = 2$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '669-670',
        any: [/^TFLAG:13 = 1$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_AFTERTRAIN.ERB',
        ref: '837',
        any: [/^\tJUEL:8 \+= A\*200$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
