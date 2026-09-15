// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #404 新建：ere/event/ending-family.js（END 族分派 + 65 段结局数据表的
// 执行器）的源锚。

export const FILES = [
  {
    // #404（N20）：@ENDCHECK 的 TRYCALLFORM 分派循环；op_leave / op_rampage
    // 两个具名步的源段。数据表本身的逐段 src 在 ere/data/ending-scripts.js
    // 的字符串里（不经注释扫描，故不进本表）
    js: 'ere/event/ending-family.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '344-349',
        any: [
          /IF EX_FLAG:2801 != 99\n\tFOR LOCAL,2,16\n\t\tSIF EX_FLAG:\(2800\+LOCAL\)%10 == 0\n\t\t\tTRYCALLFORM END\{LOCAL\}_\{EX_FLAG:\(2800\+LOCAL\)\/10\}\n\tNEXT\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '1185-1201',
        any: [
          /\t\tSIF FLAG:1 == GETCHARA\(21\)\n\t\t\tFLAG:1 = -1\n\t\tSIF FLAG:2 == GETCHARA\(21\)\n\t\t\tG:2 = -1\n\n\t\t;前回の助手・調教対象より前だった場合はフラグを減算\n\t\tSIF FLAG:1 > GETCHARA\(21\)\n\t\t\tFLAG:1 -= 1\n\t\tSIF FLAG:2 > GETCHARA\(21\)\n\t\t\tFLAG:2 -= 1\n\n\t\tTARGET = FLAG:1\n\t\tASSI = FLAG:2\n\n\t\tCALL PARTY_CHAR_DEL, EX_FLAG:2803\n\t\tDELCHARA GETCHARA\(21\)\n\t\tCALL NAME_RESET/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '929-930',
        any: [/\t\tSIF FLAG:1 == GETCHARA\(22\)\n\t\t\tFLAG:1 = -1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '931-932',
        any: [/\t\tSIF FLAG:2 == GETCHARA\(22\)\n\t\t\tG:2 = -1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '934-938',
        any: [
          /\t\t;前回の助手・調教対象より前だった場合はフラグを減算\n\t\tSIF FLAG:1 > GETCHARA\(22\)\n\t\t\tFLAG:1 -= 1\n\t\tSIF FLAG:2 > GETCHARA\(22\)\n\t\t\tFLAG:2 -= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '940',
        any: [/\t\tTARGET = FLAG:1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '941',
        any: [/\t\tASSI = FLAG:2/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '943',
        any: [/\t\tCALL PARTY_CHAR_DEL, EX_FLAG:2803/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '944',
        any: [/\t\tDELCHARA GETCHARA\(22\)/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '945',
        any: [/\t\tCALL NAME_RESET/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '419',
        any: [/EX_FLAG:2810 = 540/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '420',
        any: [/EX_FLAG:99 -= 50/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '421-425',
        any: [
          /FOR MONSTER, 100, 200\n\tITEM:MONSTER \/= 2\n\tSIF ITEM:MONSTER <= 30 && MONSTER < 190\n\t\tITEM:MONSTER = 30\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '426-429',
        any: [
          /FOR CHARA, 1, CHARANUM\n\tBASE:CHARA:0 -= 800\n\tBASE:CHARA:1 -= 1000\nNEXT/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '430-433',
        any: [
          /LOSTMONEY = MONEY\nTIMES MONEY, 0\.80\nLOSTMONEY -= MONEY\nEX_FLAG:4444 -= LOSTMONEY/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '434',
        any: [/CALL EVENT_CHARA_LEAVE\(85, GETCHARA\(33\)\)/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
