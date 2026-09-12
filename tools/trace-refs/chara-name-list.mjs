// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #388：ere/chara/chara-name-list.js 的移植状态锚（CHARA_NAME_INIT.ERB）。

export const FILES = [
  {
    js: 'ere/chara/chara-name-list.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_INIT.ERB',
        ref: '5-3360',
        any: [/^@CHARA_NAME_INIT$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_INIT.ERB',
        ref: '7-8',
        any: [/^SIF STRLENS\(LIST_CHARA_NAME:0\) > 1$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_INIT.ERB',
        ref: '10-14',
        any: [/^CHINA_NAME_COUNT = 789$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
