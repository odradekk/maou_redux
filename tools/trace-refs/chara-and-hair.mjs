// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #392 新增：chara-and-hair.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-and-hair.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '7-23',
        any: [/^[ \t]*@SHOW_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '7-27',
        any: [/^[ \t]*@SHOW_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '19',
        any: [/^[ \t]*PRINTFORM %TALENTNAME:TALENT_ID%[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '20-21',
        any: [/^[ \t]*RETURN LOCAL:0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '23',
        any: [/^[ \t]*RETURN -1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '28-46',
        any: [/^[ \t]*@SET_RANDOM_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '28-51',
        any: [/^[ \t]*@SET_RANDOM_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '33',
        any: [/^[ \t]*\$CHARA_GENERAL_CHARASTERISTICS_FIRST[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '41',
        any: [
          /^[ \t]*TEMP = RAND\( VARSIZE\("ID_OF_GENERAL_CHARASTERISTICS"\) \)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '42-194',
        any: [/^[ \t]*TALENT_ID = ID_OF_GENERAL_CHARASTERISTICS:TEMP[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '43-44',
        any: [/^[ \t]*SIF TALENT_ID == 174[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '44',
        any: [/^[ \t]*GOTO CHARA_GENERAL_CHARASTERISTICS_FIRST[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '46',
        any: [/^[ \t]*RETURN TEMP[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '52-63',
        any: [/^[ \t]*@SET_CHARASTERISTIC\(ARG:0 = -1, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '52-67',
        any: [/^[ \t]*@SET_CHARASTERISTIC\(ARG:0 = -1, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '62',
        any: [
          /^[ \t]*TALENT_ID = ID_OF_GENERAL_CHARASTERISTICS:\(ARG:1\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '68-78',
        any: [/^[ \t]*@CLEAR_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '68-83',
        any: [/^[ \t]*@CLEAR_CHARASTERISTIC\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '77',
        any: [/^[ \t]*TALENT:CHARA_ID:TALENT_ID = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '84-122',
        any: [/^[ \t]*@CHOOSE_CHARASTERISTIC\(ARG:0 = -1, ARG:1 = 3\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '84-126',
        any: [/^[ \t]*@CHOOSE_CHARASTERISTIC\(ARG:0 = -1, ARG:1 = 3\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '100-102',
        any: [/^[ \t]*IF TALENT_ID == 174[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '103',
        any: [
          /^[ \t]*PRINTFORM \[\{LOCAL:0,2\}\] %TALENTNAME:TALENT_ID, 10, LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '110',
        any: [/^[ \t]*\$CHOOSE_CHARASTERISTIC_TAG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '117',
        any: [/^[ \t]*IF RESULT < 0 \|\| RESULT > SIZE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '117-118',
        any: [/^[ \t]*IF RESULT < 0 \|\| RESULT > SIZE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '120',
        any: [
          /^[ \t]*TALENT_ID = ID_OF_GENERAL_CHARASTERISTICS:\(RESULT\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '127-138',
        any: [/^[ \t]*@SHOW_HAIRCOLOR\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '127-142',
        any: [/^[ \t]*@SHOW_HAIRCOLOR\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '135',
        any: [/^[ \t]*COLOR_ID = TALENT:CHARA_ID:300[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '136',
        any: [/^[ \t]*PRINTFORM %ARR_HAIRCOLOR:COLOR_ID%[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '143-189',
        any: [/^[ \t]*@SET_RANDOM_HAIRCOLOR\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '143-193',
        any: [/^[ \t]*@SET_RANDOM_HAIRCOLOR\(ARG:0 = -1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '161',
        any: [/^[ \t]*SELECTCASE RAND:100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '161-186',
        any: [/^[ \t]*SELECTCASE RAND:100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '162-164',
        any: [/^[ \t]*CASE 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '165-167',
        any: [/^[ \t]*CASE 1 TO 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '168-170',
        any: [/^[ \t]*CASE 21 TO 30[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '171-173',
        any: [/^[ \t]*CASE 31 TO 40[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '174-176',
        any: [/^[ \t]*CASE 41 TO 60[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '177-179',
        any: [/^[ \t]*CASE 61 TO 80[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '180-182',
        any: [/^[ \t]*CASE 81 TO 97[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '183-185',
        any: [/^[ \t]*CASE 98 TO 99[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '188',
        any: [/^[ \t]*TALENT:CHARA_ID:300 = COLOR_ID[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '194-202',
        any: [/^[ \t]*@SET_HAIRCOLOR\(ARG:0 = -1, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '194-206',
        any: [/^[ \t]*@SET_HAIRCOLOR\(ARG:0 = -1, ARG:1\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '201',
        any: [/^[ \t]*TALENT:CHARA_ID:300 = ARG:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '202',
        any: [/^[ \t]*RETURN ARG:1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '207-236',
        any: [/^[ \t]*@CHOOSE_HAIRCOLOR\(ARG:0 = -1, ARG:1 = 6\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '217',
        any: [/^[ \t]*SIZE = 12[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '219',
        any: [
          /^[ \t]*PRINTFORM \[\{COLOR_ID,2\}\] %ARR_HAIRCOLOR:COLOR_ID, 7, LEFT%[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '232',
        any: [/^[ \t]*IF RESULT < 1 \|\| RESULT > SIZE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '232-233',
        any: [/^[ \t]*IF RESULT < 1 \|\| RESULT > SIZE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '235',
        any: [/^[ \t]*TALENT:CHARA_ID:300 = RESULT[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '71',
        any: [/^[ \t]*CALL SET_HAIRCOLOR\(ID_OF_NEWCHARA, HAIRCOLOR\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '85',
        any: [
          /^[ \t]*CALL SET_RANDOM_CHARASTERISTIC\(ID_OF_NEWCHARA\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '90',
        any: [
          /^[ \t]*XINGGE = ID_OF_GENERAL_CHARASTERISTICS:CHARACTER[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '97',
        any: [/^[ \t]*CALL SET_RANDOM_HAIRCOLOR\(ID_OF_NEWCHARA\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '112',
        any: [/^[ \t]*CALL CHOOSE_CHARASTERISTIC\(ID_OF_NEWCHARA\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_MAKE.ERB',
        ref: '118',
        any: [/^[ \t]*CALL CHOOSE_HAIRCOLOR\(ID_OF_NEWCHARA\)[ \t]*$/m],
      },
      // #596：发色列表的收尾 PRINTL 只结束残行那一行
      {
        src: 'target/ERB/キャラ関数/FUNC_CHARA_AND_HAIR.ERB',
        ref: '227',
        any: [/^\s*PRINTL\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
