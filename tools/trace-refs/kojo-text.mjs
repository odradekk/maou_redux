// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-text.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-text.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '400-408',
        any: [/^@SELF_CALL, ARG:0, ARG:1$/m, /RETURNF LOCALS/],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '412-419',
        any: [/^@SELF_CALL_FIRST, ARG = -1$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '406',
        any: [/STRLENS\(CSTR:ARG:60\) \? %CSTR:ARG:60% # 我/],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '402',
        any: [/;ARG:1\s*废弃/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
