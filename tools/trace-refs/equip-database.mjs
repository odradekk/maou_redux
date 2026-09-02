// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-database.mjs

export const FILES = [
  {
    js: 'ere/data/equip-database.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '7-33',
        any: [/^;W:1  = 識別番号（0～999）$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '39',
        any: [
          /^;格納番号 = \(接頭語 \* 100000\) \+ \(強度 \* 1000\) \+ 識別番号$/m,
        ],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '41-62',
        any: [/^;効果（強度がマイナスの場合、逆の効果）$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '274-702',
        any: [/^@EQUIP_DATABASE$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '287-647',
        any: [/^IF W:1 == 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '509-523',
        any: [/^ELSEIF W:1 == 45$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '650-697',
        any: [/^IF W:17 == 1$/m],
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
        ref: '810-857',
        any: [/^IF W:1 == 0$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '852-857', any: [/^ELSE$/m] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
