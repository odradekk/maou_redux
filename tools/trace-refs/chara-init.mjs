// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：chara-init.mjs

export const FILES = [
  {
    // #118：@CHAR_INIT 窄路径与 @RANDOM_SELF_CALL 窄路径（ENDING_1 的
    // ADDCHARA 链第三环）
    js: 'ere/chara/chara-init.js',
    refs: [
      // CHAR_MAKE.ERB 的 JUMP 壳
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '22-25',
        any: [/^@CHAR_INIT$/m, /^JUMP CHARA_INIT/m],
      },
      // CHARA_MAKE_INIT.ERB 的本体
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '2-49',
        any: [/^@CHARA_INIT\(L_A\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '7',
        any: [/^SAVESTR:L_A = %CALLNAME:L_A%$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '10-18',
        any: [/^IF CFLAG:L_A:9 > 1 && CFLAG:L_A:11 == 0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '14',
        any: [/^\s*CALL ST_UP, L_A$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '15',
        any: [/^\s*REND$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '16',
        any: [/^\s*CFLAG:L_A:9 = LOCAL$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '17',
        any: [/^\s*BASE:L_A:0 = MAXBASE:L_A:0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '16-17',
        any: [/^\s*CFLAG:L_A:9 = LOCAL$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '22-24',
        any: [/^SWAP L_A, TARGET$/m, /^\s*CALL WEARING_CLOTH_ABLE$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '23',
        any: [/^\s*CALL WEARING_CLOTH_ABLE$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '27',
        any: [/^\s*CALL RANDOM_SELF_CALL, L_A$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '29-33',
        any: [/^IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '30',
        any: [/^IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '36-53',
        any: [/^IF !\(TALENT:L_A:275/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '38',
        any: [/^\s*SIF RAND:40 == 0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE_INIT.ERB',
        ref: '54',
        any: [/^RETURN L_A$/m],
      },
      // SELF_CALL.ERB 的一人称
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '2-65',
        any: [/^@RANDOM_SELF_CALL, ARG, MODE = 0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '6',
        any: [/^LOCAL = CFLAG:ARG:450$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '7-8',
        any: [/^SIF MODE == 0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '25-26',
        any: [/^SIF LOCAL >= 200$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '28-36',
        any: [/^IF LOCAL < 0$/m, /LOCALS = %CSVCSTR/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '29',
        any: [/LOCALS = %CSVCSTR/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '38-42',
        any: [/^IF LOCAL < 9$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '39-40',
        any: [/^\s*CSTR:ARG:60 = 我$/m, /^\s*CFLAG:ARG:450 = 9$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '44-52',
        any: [/^IF LOCAL < 100$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '46',
        any: [/^\s*CALL SET_SUIT_SELFCALL, ARG, LOCAL$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '54-62',
        any: [/^IF LOCAL < 200$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
