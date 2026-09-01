// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-comend.mjs

export const FILES = [
  {
    js: 'ere/event/event-comend.js',
    refs: [
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '275-283',
        any: [/^IF BASE:0 <= 0 && !FLAG:35$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '277-279',
        any: [
          /死亡時にビデオを使用していた？/,
          /^SIF TEQUIP:53$/m,
          /^\t\tTFLAG:34 = 1$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '280',
        any: [/SAVESTR:TARGET%一动也不动/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '281',
        any: [/SHE\(TARGET\)%做什么都不再有反应/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '282',
        any: [/^\tWAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '283',
        any: [/^\tBEGIN AFTERTRAIN$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '284-289',
        any: [
          /瀕死時に調教を自動終了設定/,
          /^ELSEIF BASE:0 < 500 && FLAG:35$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '285',
        any: [/^ELSEIF BASE:0 < 500 && FLAG:35$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '286',
        any: [/^\tDRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '287',
        any: [/体力到了极限。调教结束。/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '288',
        any: [/^\tWAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '289',
        any: [/^\tBEGIN AFTERTRAIN$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '292',
        any: [/^IF ASSI > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '293-301',
        any: [/^\tIF BASE:ASSI:0 <= 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '294',
        any: [/^\t\tDRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '296-297',
        any: [/^\t\tSIF TEQUIP:53$/m, /^\t\t\tTFLAG:34 = 1$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '298',
        any: [/SAVESTR:ASSI%一动也不动/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '299',
        any: [/SHE\(TARGET\)/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '300',
        any: [/^\t\tWAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '301',
        any: [/^\t\tBEGIN AFTERTRAIN$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '302-307',
        any: [
          /^\t;瀕死時に調教を自動終了設定$/m,
          /^\tELSEIF BASE:ASSI:0 < 500$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '303',
        any: [/^\tELSEIF BASE:ASSI:0 < 500$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '304',
        any: [/^\t\tDRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '305',
        any: [/助手体力到了极限/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '306',
        any: [/^\t\tWAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '307',
        any: [/^\t\tBEGIN AFTERTRAIN$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
