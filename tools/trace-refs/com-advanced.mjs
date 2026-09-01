// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-advanced.mjs

export const FILES = [
  // —— #229（J19：追加与高级族 120-135——@COM/@COM_ABLE/TRAIN_MESSAGE/CASE 135） ——
  {
    js: 'ere/system/train/com-advanced.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3728-4622',
        any: [/@COM_ABLE120/],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '666-682',
        any: [/CASE 135/],
      },
      {
        src: 'target/ERB/調教相關/COMF135_セルフクンニ.ERB',
        ref: '14-16',
        any: [/LOCAL = 21/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
