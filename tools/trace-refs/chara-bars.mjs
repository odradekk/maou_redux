// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：chara-bars.mjs

export const FILES = [
  {
    js: 'ere/page/components/chara-bars.js',
    refs: [
      // @LIFE_BAR / @VITAL_BAR（#212 首个消费者是 @SHOW_STATUS）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1129-1168',
        any: [/^@LIFE_BAR \(ARG:0 = -1, ARG:1 = 0\)$/m, /^PRINT 体力$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1137-1141',
        any: [/^IF MAXBASE:0 <= 0$/m, /終わるときにはTARGETを戻す/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1143-1157',
        any: [/^PRINT 体力$/m, /^BAR BASE:0,MAXBASE:0,32$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1145-1156',
        any: [/^\tIF 立绘$/m, /BAR 0,MAXBASE:0,14/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1159-1163',
        any: [/★死亡★/, /★濒死★/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1175-1203',
        any: [/^@VITAL_BAR \(ARG:0 = -1, ARG:1 = 0\)$/m, /^PRINT 气力$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1183-1187',
        any: [/^IF MAXBASE:1 <= 0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1198-1199',
        any: [/^SIF BASE:1 <= 0$/m, /★气力０★/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
