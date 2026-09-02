// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-check.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-check.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '65-86',
        any: [/^@EQUIP_CHECK$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '69-70', any: [/^SIF A < 0$/m] },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '71', any: [/^LOCAL = 0$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '72-84',
        any: [/^W:0 = CFLAG:A:551$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '75-76',
        any: [/^\tSIF W:3 == W:8$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '82-83',
        any: [/^\tSIF W:3 == W:8$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '904-1027',
        any: [/^@EQUIP_POWERUP, ARG:0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '907',
        any: [/^;EQUIP_DATABASE後に使用すること$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '911-914',
        any: [/^IF TALENT:\(ARG:0\):291 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '917-918',
        any: [/^SIF TALENT:\(ARG:0\):246 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '921-922',
        any: [/^SIF TALENT:\(ARG:0\):247 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '925-928',
        any: [/^IF TALENT:\(ARG:0\):259 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '931-934',
        any: [/^IF TALENT:\(ARG:0\):260 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '937-940',
        any: [/^IF TALENT:\(ARG:0\):264 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '943-944',
        any: [/^SIF W:1 == 45 && TALENT:\(ARG:0\):314 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '947-948',
        any: [/^SIF TALENT:\(ARG:0\):314 == 6$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '951-952',
        any: [/^SIF TALENT:\(ARG:0\):314 == 7$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '955-956',
        any: [/^SIF TALENT:\(ARG:0\):314 == 8$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '959-960',
        any: [/^SIF TALENT:\(ARG:0\):314 == 9$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '964-999',
        any: [/^IF TALENT:\(ARG:0\):275$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '966-973',
        any: [/^\tGETBIT W:6, 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '976-986',
        any: [/^IF TALENT:\(ARG:0\):276$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '988-999',
        any: [/^IF TALENT:\(ARG:0\):277$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '1001-1012',
        any: [/^IF TALENT:\(ARG:0\):278$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '1014-1025',
        any: [/^IF TALENT:\(ARG:0\):279$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
