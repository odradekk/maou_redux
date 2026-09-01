// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：char-make.mjs

export const FILES = [
  {
    js: 'ere/chara/char-make.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '2-4',
        any: [/@CHAR_MAKE, ARG:0 = 0, ARG:1 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '4',
        any: [/JUMP CHARA_MAKE\(A, ARG:0, ARG:1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '7-9',
        any: [/@NAMING/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '9',
        any: [/JUMP CHARA_NAME_DEFINE\(A\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '12-14',
        any: [/@NAME_RESET/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '14',
        any: [/JUMP CN_REBUILD/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '17-19',
        any: [/@SET_CHAR_CLOTH/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '19',
        any: [/JUMP CM_CLOTH/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '22-25',
        any: [/@CHAR_INIT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '27-34',
        any: [/@CHAR_MAKE_INPORT, ARG:0 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '31-32',
        any: [/SIF RAND\(ARG:0\) != 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '34',
        any: [/JUMP CHARA_MAKE_INPORT/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
