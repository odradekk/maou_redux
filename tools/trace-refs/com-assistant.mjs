// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-assistant.mjs

export const FILES = [
  // —— #225（J15：助手与蕾丝族 60-73——@COM/@COM_ABLE/TRAIN_MESSAGE/CASE 61） ——
  {
    js: 'ere/system/train/com-assistant.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2514-3135',
        any: [/@COM_ABLE60/],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '627-637',
        any: [/CASE 61/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
