// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-print.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-print.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '708-794',
        any: [/^@PRINT_EQUIPTYPE_WEAPON$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '711-714',
        any: [/^W:1 = W:0 % 1000$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '716',
        any: [/^SETCOLORBYNAME LightSalmon$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '720-738',
        any: [/^IF W:17 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '742-789',
        any: [/^IF W:1 == 40$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '784-789', any: [/^ELSE$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '791-792',
        any: [/^SIF W:2 != 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '798-864',
        any: [/^@PRINT_EQUIPTYPE_RING$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '801-804',
        any: [/^W:1 = W:0 % 1000$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '808',
        any: [/^SETCOLORBYNAME LightSalmon$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '810-857',
        any: [/^IF W:1 == 0$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '852-857', any: [/^ELSE$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '859-860',
        any: [/^SIF W:2 != 0$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '864', any: [/^RETURN 0$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
