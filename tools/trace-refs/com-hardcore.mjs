// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-hardcore.mjs

export const FILES = [
  // —— #226（J16：重度调教族 80-90——@COM/@COM_ABLE/@EQUIP_COM89/TRAIN_MESSAGE/CASE 80） ——
  {
    js: 'ere/system/train/com-hardcore.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3142-3538',
        any: [/@COM_ABLE80/],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '642-663',
        any: [/CASE 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '21',
        any: [/IF TALENT:151/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '209',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '19-209',
        any: [/実行できるかの判定/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '10-14',
        any: [/JUMPFORM COM\{RESULT\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '218-302',
        any: [/射精ゲージチェック/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '306-371',
        any: [/ソースの計算/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '323',
        any: [/Y\*40 \+ 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '375-386',
        any: [/射精チェック/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '420-459',
        any: [/大量射精/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '464-466',
        any: [/奴隷の口/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '468-473',
        any: [/なめ取る/],
      },
      {
        src: 'target/ERB/調教相關/COMF80_イラマチオ.ERB',
        ref: '477-482',
        any: [/;初吻/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
