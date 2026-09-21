// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：ability-check.mjs

export const FILES = [
  {
    js: 'ere/system/train/ability-check.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1092-1111',
        any: [/^@YOKUBO_UP_CHECK\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1113-1123',
        any: [/^@JUJUN_UP_CHECK\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
