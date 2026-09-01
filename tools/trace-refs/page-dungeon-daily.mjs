// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：page-dungeon-daily.mjs

export const FILES = [
  // —— #179 H10 日程：ere/page/page-dungeon-daily.js ——
  {
    js: 'ere/page/page-dungeon-daily.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '1-768',
        any: [/^\s*@DISPLAY_DUNGEON_DAILY$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '769-774',
        any: [/^\s*@CAL_DUNGEON_DAILY$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '7',
        any: [/^\s*PRINTFORML\ Space\ for\ further\ docuement$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '8-12',
        any: [/^\s*; FLAG <= 20 --> 岌岌可危$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '94-767',
        any: [/^\s*IF\ EX_FLAG:99\ >=\ 0\ \&\&\ EX_FLAG:99\ <=\ 20$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '15-37',
        any: [/^\s*REPEAT\ CHARANUM$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '39-68',
        any: [/^\s*DISPLAYCHARA\ =\ %SAVESTR:DAILYTARGET%$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '70-554',
        any: [/^\s*TEMP\ =\ RAND\(49\)$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '72-93',
        any: [/^\s*SELECTCASE\ TEMP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '555-767',
        any: [/^\s*TEMP\ =\ RAND\(20\)$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '57',
        any: [/^\s*LOCALS\ =\ %EX_TALENTNAME:COUNT%$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '6-7',
        any: [/^PRINT\ \u3000/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '13',
        any: [/^\s*STORAGE\ =\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '16-23',
        any: [/^\s*REPEAT\ CHARANUM$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '24-27',
        any: [/^\s*PRINTL\ Testing\ Purpose$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '28-37',
        any: [/^\s*IF\ STORAGE\ !=\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '29-30',
        any: [/^\s*RAND\ \(STORAGE\)$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '40',
        any: [/^\s*DISPLAYCHARA\ =\ %SAVESTR:DAILYTARGET%$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '41-42',
        any: [/^\s*SIF\ DAILYTARGET\ >=\ CHARANUM$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '43-58',
        any: [/^\s*SIF\ EX_TALENT:DAILYTARGET:2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '47-48',
        any: [/^\s*SIF\ STRLENS\(LOCALS\)\ >\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '53-54',
        any: [/^\s*SIF\ STRLENS\(LOCALS\)\ >\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '59-60',
        any: [/^\s*\$DAILYTYPE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '61-65',
        any: [/^\s*IF\ TALENT:DAILYTARGET:85$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '66',
        any: [/^\s*PRINTFORML\ %DISPLAYCHARA%$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '67',
        any: [/^LOCALS\ =\ \r?$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '771-773',
        any: [/^\s*IF\ EX_FLAG:99\ >=\ 100$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_DAILY.ERB',
        ref: '774',
        any: [/^\s*EX_FLAG:99\ \-=\ 2$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
