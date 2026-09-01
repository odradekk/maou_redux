// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-lookup.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-lookup.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '39',
        any: [
          /^;格納番号 = \(接頭語 \* 100000\) \+ \(強度 \* 1000\) \+ 識別番号$/m,
        ],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '274-702',
        any: [/^@EQUIP_DATABASE$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '277-278',
        any: [/^SIF W:0 < 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '281-284',
        any: [/^W:1 = W:0 % 1000$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '287-647',
        any: [/^IF W:1 == 0$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '629-647', any: [/^ELSE$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '650-697',
        any: [/^IF W:17 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '700',
        any: [/^W:9 \+= W:2 \* 5$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '868-888',
        any: [/^@EQUIP_GET$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '873-874',
        any: [/^SIF W:0 < 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '876',
        any: [/^W:1 = W:0 % 1000$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '878',
        any: [/^X = 300 \+ W:1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '880-881',
        any: [/^SIF X < 300$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '883-886',
        any: [/^ITEM:X \+= 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '892-901',
        any: [/^@GET_EQUIP_NUM$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '896',
        any: [/^W:0 = W:8 - 300$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '898-899',
        any: [/^SIF W:0 < 0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
