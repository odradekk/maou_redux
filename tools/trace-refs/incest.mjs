// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：incest.mjs

export const FILES = [
  {
    js: 'ere/system/train/incest.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB',
        ref: '324-343',
        any: [/@INCEST/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
