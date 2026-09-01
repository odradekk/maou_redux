// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-index.mjs

export const FILES = [
  {
    // #213：L_IDX↔L_I 映射层（@SHOW_COMMENU 的紧凑序号循环）
    js: 'ere/system/train/com-index.js',
    refs: [
      {
        src: 'target/ERB/調教相關/USERCOM.ERB',
        ref: '188-216',
        any: [/@SHOW_COMMENU/, /L_IDX\+\+/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {
  'train-natural': [
    // #213：映射层的实证行（89 → COM110；升格标签 8 号格）
    {
      js: 'ere/system/train/com-index.js',
      refs: [{ ref: '211', any: [/^89$/] }],
    },
  ],
};
