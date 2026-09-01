// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-select.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-select.js',
    refs: [
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '206-271',
        any: [/^@EQUIP_SELECT$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '211-212',
        any: [/^SIF A < 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '214-233',
        any: [/^;宝箱チェック$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '218',
        any: [/^\tCALL CAMPAIGN_EQUIP_SELECT,CFLAG:A:501$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '220-221',
        any: [/^\tSIF X < 300 $/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '223-224',
        any: [/^\tY = CFLAG:A:501 \+ 339$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '225-226',
        any: [/^\tSIF X < 300 $/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '228-232',
        any: [/^\tIF ITEM:X <= 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '235',
        any: [/^PRINTW 勇者发现了宝箱！$/m],
      },
      { src: 'target/ERB/其他/EQUIP.ERB', ref: '237', any: [/^W:8 = X$/m] },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '239-267',
        any: [/^W:0 = CFLAG:A:551$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '243',
        any: [/^IF W:0 == -1 \|\| RESULT && W:2 < CFLAG:A:501 && W:5 == 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '245-250',
        any: [/^\tIF RESULT && W:7 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '258',
        any: [/^IF W:0 == -1 \|\| RESULT && W:2 < CFLAG:A:501 && W:5 == 0$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '260-265',
        any: [/^\tIF RESULT && W:7 == 1$/m],
      },
      {
        src: 'target/ERB/其他/EQUIP.ERB',
        ref: '269',
        any: [/^PRINTW 似乎没什么好東西。$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
