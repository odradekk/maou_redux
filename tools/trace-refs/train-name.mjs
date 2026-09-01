// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：train-name.mjs

export const FILES = [
  {
    js: 'ere/system/train/train-name.js',
    refs: [
      // @TRAIN_NAME_INIT 与其调用点
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '53',
        any: [/^CALL TRAIN_NAME_INIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '783-910',
        any: [
          /^@TRAIN_NAME_INIT$/m,
          /^TRAIN_NAME:0 = 爱抚$/m,
          /^TRAIN_NAME:208 = 触手$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '786-787',
        any: [/^SIF STRLENSU\(TRAIN_NAME\) > 0$/m, /^\tRETURN$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '788-908',
        any: [/^TRAIN_NAME:0 = 爱抚$/m, /^TRAIN_NAME:12 = 振动杖$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '899',
        any: [/^TRAIN_NAME:150 = %CSTR:7%調教$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
