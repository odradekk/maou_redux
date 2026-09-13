// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #383：SELF_CALL.ERB 全量落地，chara-self-call.js 的锚表

export const FILES = [
  {
    // #383：@RANDOM_SELF_CALL 完整分支链 + 两张子表 + @CALC_SELFCALL_FACTOR
    js: 'ere/chara/chara-self-call.js',
    refs: [
      // @RANDOM_SELF_CALL（:2-65）
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
        ref: '7-23',
        any: [/^\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '24',
        any: [/^\$RANDOM$/m],
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
        ref: '38-42',
        any: [/^IF LOCAL < 9$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '44-52',
        any: [/^IF LOCAL < 100$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '51',
        any: [/^\tLOCAL = 99$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '54-62',
        any: [/^IF LOCAL < 200$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '63-65',
        any: [/^CALL RANDOM_SELF_CALL, ARG$/m],
      },
      // @SET_SUIT_SELFCALL（:67-161）
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '67-161',
        any: [/^@SET_SUIT_SELFCALL, ARG, ARG:1 = -1$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '141',
        any: [/ELSEIF L_姿态 <= -5/],
      },
      // @SET_NICK_SELFCALL（:163-274）
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '163-274',
        any: [/^@SET_NICK_SELFCALL, ARG, ARG:1 = -1$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '171-175',
        any: [/^IF STRLENSU\(LOCALS\) \*2 != STRLENS\(LOCALS\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '180-225',
        any: [/皐月 -> 皐月/],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '227-272',
        any: [/;洋名/],
      },
      // @CALC_SELFCALL_FACTOR（:276-396）
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '276-396',
        any: [/^@CALC_SELFCALL_FACTOR, ARG$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '286-308',
        any: [/^SELECTCASE GET_LOOK_INFO\(ARG,"种族"\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '302-303',
        any: [/GOTO CASE_魔族/],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '311-322',
        any: [/^\$CASE_魔族$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '324-343',
        any: [/^SELECTCASE GET_LOOK_INFO\(ARG,"成为勇者前的生活"\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '345',
        any: [/^SWAP ARG,TARGET$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '347-392',
        any: [/^; 高贵$/m],
      },
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '396',
        any: [/^RETURN L_教育,L_姿态,L_开放$/m],
      },
      // @SELF_CALLNAME（:422-423，死代码，登记不落 JS，见文件头「有意偏离」条）
      {
        src: 'target/ERB/キャラ関数/SELF_CALL.ERB',
        ref: '422-423',
        any: [/^@SELF_CALLNAME, ARGS$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
