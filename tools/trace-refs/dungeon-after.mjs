// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-after.mjs

export const FILES = [
  // —— #179 H10 战果：ere/dungeon/dungeon-after.js ——
  {
    js: 'ere/dungeon/dungeon-after.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '302',
        any: [/^\s*CALL DUNGEON_AFTER$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '2-15',
        any: [/^\s*@DUNGEON_AFTER$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '19-322',
        any: [/^\s*@GOHOUBI$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '325-568',
        any: [/^\s*@OSIOKI$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '562-566',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 9$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '342-346',
        any: [/^\s*IF\ RESULT\ <\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '40-62',
        any: [/^\s*IF\ ABL:A:10\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '353-401',
        any: [/^\s*IF\ ABL:A:10\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '23',
        any: [/^\s*PRINTL$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '27-29',
        any: [/^\s*PRINTL\ \[0\]\ 这是你应份的$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '30-36',
        any: [/^\s*\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '66-70',
        any: [/^\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '72-80',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '75-76',
        any: [/^\s*SIF\ CFLAG:A:7\&1\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '77',
        any: [/^\s*PRINTFORML\ %SAVESTR:A%自豪地把勋章戴在身上。$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '81-322',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '213',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '291',
        any: [/^\s*IF\ ABL:A:2\ >\ ABL:A:3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '83-98',
        any: [/^\s*IF\ CFLAG:A:504\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '91-98',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '99-132',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '133-165',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '166-202',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '203-209',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 4$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '210-239',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 5$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '240-250',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 6$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '251-279',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 7$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '280-287',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 8$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '288-319',
        any: [/^\s*ELSEIF\ CFLAG:A:504\ ==\ 9$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '320-321',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '568',
        any: [/^\s*RETURN\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '327',
        any: [/^\s*PRINTL$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '331-339',
        any: [/^\s*PRINT\ \[0\]\ 什么也不做/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '340-346',
        any: [/^\s*\$INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '413',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '487',
        any: [/^\s*IF\ ABL:A:21\ >=\ 3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '434',
        any: [/^\s*IF\ ABL:A:17\ >=\ 4$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '463',
        any: [/^\s*IF\ ABL:A:17\ >=\ 6$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '404-408',
        any: [/^\s*IF\ RESULT\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '409-429',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '430-458',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 2$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '459-482',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 3$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '483-503',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 4$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '504-527',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 5$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '528-535',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 6$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '536-543',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 7$/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_AFTER.ERB',
        ref: '544-561',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 8$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
