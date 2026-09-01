// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：screen-block.mjs

export const FILES = [
  {
    js: 'ere/page/components/screen-block.js',
    refs: [
      // 就地重绘清行习语的原作出处（SHOP ver1.0.2.ERB @SELECT_TARGET 的
      // L_LCOUNT = LINECOUNT → 画 → CLEARLINE LINECOUNT-L_LCOUNT）
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '274',
        any: [/^L_LCOUNT = LINECOUNT$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '280',
        any: [/^L_LCOUNT = LINECOUNT - L_LCOUNT$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '314',
        any: [/CLEARLINE LINECOUNT-L_LCOUNT/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
