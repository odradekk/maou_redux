// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：stub-line.mjs

export const FILES = [
  {
    js: 'ere/utils/stub-line.js',
    refs: [
      // 分发期等键 = 原作 PRINTW 习语（print + 读键后清行回循环）
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        cite: true, // 习语出处，非移植证据——本文件「源: 无对应源」（#382）
        ref: '124-126',
        any: [/PRINTW 数值已超出允许范围外/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
