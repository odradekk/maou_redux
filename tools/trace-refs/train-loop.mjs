// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：train-loop.mjs

export const FILES = [
  {
    // #214：CALLTRAIN 等价的头注引用（SELECTCOM:1..N 的唯一写点）
    js: 'ere/system/train/train-loop.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COM_REGISTER.ERB',
        ref: '226',
        any: [/SELECTCOM:\(COUNT \+ 1\) = FLAG:\(551 \+ COUNT\)/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '545',
        any: [/^PREVCOM = SELECTCOM$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
