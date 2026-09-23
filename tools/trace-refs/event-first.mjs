// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-first.mjs

export const FILES = [
  // —— #181 H12 2D 地下城（新增引用，该文件其余引用见豁免表）：ere/event/event-first.js ——
  {
    js: 'ere/event/event-first.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '67',
        any: [/	CALL GEO_TEST/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '68',
        any: [/	CALL SET_VIL/],
      },
      // —— #565 开局接线（RAND_CHARA_MAKE / CHARA_NAME_DEFINE）：ere/event/event-first.js ——
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '110',
        any: [/	CFLAG:420 = 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '205',
        any: [/IF 丽塔启动！ == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '57',
        any: [/	CALL CHAR_MAKE_INPORT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '151-186',
        any: [/是她！是她！就是她！/, /被囚禁在了地牢里！/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '188-191',
        any: [/由于对魔王的恐惧，勇者没有出现。/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
