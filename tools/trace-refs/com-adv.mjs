// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-adv.mjs

export const FILES = [
  {
    // #213：@GET_ADV_COM 升格骨架（SELECTCASE 全文；零规则态）
    js: 'ere/system/train/com-adv.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '1-684',
        any: [/@GET_ADV_COM/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
