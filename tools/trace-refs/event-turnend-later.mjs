// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-turnend-later.mjs

export const FILES = [
  {
    // @EVENTTURNEND 的空 #LATER 定义（#114 按 1:1 保留为空）
    js: 'ere/event/event-turnend-later.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '1-3',
        any: [/^@EVENTTURNEND$/m, /^#LATER$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
