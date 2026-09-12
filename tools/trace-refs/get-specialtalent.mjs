// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #405 新增：ere/event/get-specialtalent.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/event/get-specialtalent.js',
    refs: [
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '7-739',
        any: [/^[ \t]*@CHECK_SPECIALSKIL, SEIIN = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '7-716',
        any: [/^[ \t]*@CHECK_SPECIALSKIL, SEIIN = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '12',
        any: [/^[ \t]*SIF TARGET < 0 \|\| TARGET >= CHARANUM[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '14-17',
        any: [/^[ \t]*CALL CHECK_SPECIALSKIL_BODYSHIFT[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '23-256',
        any: [/^[ \t]*\$INPUT_LOOP_SEAL_2[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '26-35',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%无论是灵魂还是肉体，都全心全意地献给%CALLNAME:MASTER%了…[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '39-132',
        any: [/^[ \t]*\$INPUT_LOOP_SEAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '65-79',
        any: [/^[ \t]*PRINTFORM %SAVESTR:TARGET%的[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '106-125',
        any: [/^[ \t]*\$INPUT_LOOP_SEAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '127-131',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%一阵眩晕、似乎拥有了【%EX_TALENTNAME:3%】的素质……[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '134-239',
        any: [/^[ \t]*\$INPUT_LOOP_SEAL_2[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '146-160',
        any: [/^[ \t]*PRINTFORM %SAVESTR:TARGET%的[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '166-184',
        any: [/^[ \t]*IF TALENT:32 \|\| TALENT:34 \|\| TALENT:84[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '213-232',
        any: [/^[ \t]*\$INPUT_LOOP_SEAL_2[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '234-238',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%一阵眩晕、似乎拥有了【%EX_TALENTNAME:3%】的素质……[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '261-279',
        any: [
          /^[ \t]*ELSEIF ABL:12 >= 5 && ABL:13 >= 5 && EXP:22 >= 1500 && TALENT:52 == 0 && CFLAG:600 >= 80[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '261-710',
        any: [/^[ \t]*\$ADD_SEXSKILL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '284-298',
        any: [
          /^[ \t]*IF ABL:12 >= 7 && ABL:13 >= 7 && EXP:22 >= 1500 && TALENT:52 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '305-352',
        any: [
          /^[ \t]*ELSEIF ABL:11 >= 3 && ABL:16 >= 3 && EXP:64 >= 100 && TALENT:293 == 0 && TALENT:294 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '355-456',
        any: [/^[ \t]*\$ADD_SEXSKILL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '464-540',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%在调教结束之后依然哀求着%CALLNAME:MASTER%疼爱%SHE\(\)%的子宫。但一插进去，%SHE\(\)%便全身夸张地痉挛了起来，子宫口依依不舍地紧紧吸啜着龟头…[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '523-538',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%失去了【%TALENTNAME:101%】。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '546-601',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%获得了【%TALENTNAME:271%】。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '570-588',
        any: [/^[ \t]*IF TALENT:32 \|\| TALENT:34 \|\| TALENT:84[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '607-624',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%在没有任何性刺激的情况下，也渴望着饮精液了。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '607',
        any: [/^[ \t]*IF TFLAG:110 && TALENT:47 == 0 && SEIIN[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '630-653',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%失去了【%TALENTNAME:151%】。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '658-661',
        any: [
          /^[ \t]*PRINTFORMW %NAME:MASTER%掌握了【%TALENTNAME:92%】。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '668-691',
        any: [
          /^[ \t]*IF TALENT:315 == 5 && EXP:74 >= 160 && MARK:3 == 0 && TALENT:180 == 1 && TALENT:181 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '698-710',
        any: [
          /^[ \t]*ELSEIF TALENT:76 && EXP:81 >= 10 && MARK:3 == 0 && ABL:10 >= 5 && TALENT:86 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '714-716',
        any: [/^[ \t]*CALL CHECK_SPECIALSKIL_BODYSHIFT[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '719-734',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%获得【%TALENTNAME:188%】了[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/GET_SPECIALTALENT.ERB',
        ref: '740-752',
        any: [/^[ \t]*@CHECK_SPECIALSKIL_BODYSHIFT[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
