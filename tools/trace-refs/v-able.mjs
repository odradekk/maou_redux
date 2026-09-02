// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：v-able.mjs

export const FILES = [
  {
    // #213：@V_ABLE 公共头（COMABLE.ERB 文件头；消费点 BENKI.ERB:1400/1407 随 J7）
    js: 'ere/system/train/v-able.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3-20',
        any: [/@V_ABLE\(ARG\)/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '5-20',
        any: [/;オトコだとダメ/, /^RETURN 1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '6-7',
        any: [/^SIF TALENT:\(ARG\):122$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '9-10',
        any: [/^SIF TALENT:\(ARG\):135$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '12-13',
        any: [/^SIF TALENT:\(ARG\):0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '15-16',
        any: [/SIF CFLAG:\(ARG\):42 == 79/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '18-19',
        any: [/SIF TALENT:\(ARG\):273/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '20',
        any: [/^RETURN 1$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1407',
        any: [/CALL V_ABLE,ARG/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
