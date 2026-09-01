// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-train.mjs

export const FILES = [
  {
    js: 'ere/event/event-train.js',
    refs: [
      // TRAIN_MAIN.ERB @EVENTTRAIN
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '15-16',
        any: [/主人公の射精を0に/, /^BASE:MASTER:2 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '17-18',
        any: [/いちおう調教対象と助手も/, /^BASE:TARGET:2 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '19-20',
        any: [/^SIF ASSI >= 0$/m, /^\tBASE:ASSI:2 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '21',
        any: [/^BASE:TARGET:3 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '22',
        any: [/^BASE:MASTER:4 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '25-27',
        any: [/^REPEAT 200$/m, /^TFLAG:COUNT = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '32-37',
        any: [/調教者は誰か/, /^IF ASSIPLAY == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '39-41',
        any: [/记录目标与助手/, /^ASSI:1 = ASSI$/m, /^TARGET:1 = TARGET$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '43-47',
        any: [/时常发情ボーナス/, /^IF TALENT:TARGET:271$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '49-50',
        any: [/死斗场の収入初期化/, /^TFLAG:402 = 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '52-53',
        any: [/初始化TRAIN_NAME/, /^CALL TRAIN_NAME_INIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '55',
        any: [/^CALL PRITRAIN_MESSAGE$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
