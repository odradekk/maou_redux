// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-party.mjs

export const FILES = [
  // —— #172 H3 迷宫主循环：ere/dungeon/dungeon-party.js。锚为所引区间首个非空行的 ——
  //    原文（机械生成后人工核过形态）；src 常量 DUNGEON_PARTY 见上。 ——
  {
    js: 'ere/dungeon/dungeon-party.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '5-83',
        any: [/@PARTY_UNITE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '15-17',
        any: [/FOR CHARID, 0, CHARANUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '23-79',
        any: [/FOR CHARID, 0, CHARANUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '25-50',
        any: [/RESTCHAR = CFLAG:CHARID:531/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '53-78',
        any: [/RESTCHAR = CFLAG:CHARID:532/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '81',
        any: [/;行動終了していないキャラはリーダーとなり、移動等を受け持つ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '86-176',
        any: [/@PARTY_JOIN/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '98',
        any: [/CALL PARTY_UNITE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '115-137',
        any: [/;仲間Aを見る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '126-127',
        any: [/SIF CFLAG:CHARID:533 == 0 && CHARID == NEW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '129-134',
        any: [/;枠に入れて、行動完了と、リーダー記憶と、初期化を行う/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '139-161',
        any: [/;仲間Bを見る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '163-169',
        any: [/\$FINALIZE/],
      },
      {
        src: 'target/資料_非必要無須解壓/eramaouフラグまとめ.txt',
        ref: '421-425',
        any: [/CFLAG:530～549はパーティー関連/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '164-165',
        any: [
          /;潜入奴隷のキャラ番号がCHARIDより若い場合、自分をメンバー登録する前に（CFLAG:CHARID:531などが代入されることで）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '179-223',
        any: [/@SEARCH_FREE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '226-297',
        any: [/@PARTY_DEL, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '274-275',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '277-284',
        any: [/CFLAG:LEADER:530 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '287-294',
        any: [/;结婚对象编号清除/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '291',
        any: [/CALL SEARCH_FAMILY,\(ARG:0\),"MARRIAGE"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '293',
        any: [/CFLAG:RESULT:601 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '300-326',
        any: [/@PARTY_CHAR_DEL, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_PARTY.ERB',
        ref: '312-324',
        any: [/FOR CHARID, 1, CHARANUM/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
