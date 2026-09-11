// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #405 新增：ere/event/event-addict.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/event/event-addict.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '10-69',
        any: [/^[ \t]*@APHRODISIAC_ADDICT[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '11-29',
        any: [/^[ \t]*CALL PRECIPITATE_WITHDRAWAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '31-39',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%的【%TALENTNAME:46%】消除了。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '40-51',
        any: [
          /^[ \t]*IF \(\(TALENT:86 == 0 && CFLAG:31 >= 12\) \|\| \(TALENT:72 && CFLAG:31 >= 9\)\) && TALENT:46 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '52-60',
        any: [
          /^[ \t]*IF \(CFLAG:31 >= 40 \|\| \(TALENT:72 && CFLAG:31 >= 30\)\) && TALENT:123 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '61-69',
        any: [
          /^[ \t]*IF \(CFLAG:31 >= 100 \|\| \(TALENT:72 && CFLAG:31 >= 75\)\) && TALENT:9 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '73-219',
        any: [/^[ \t]*@PRECIPITATE_WITHDRAWAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '84-113',
        any: [/^[ \t]*\$INPUT_LOOP_01[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '115-122',
        any: [
          /^[ \t]*PRINTFORML 数小时后%SAVESTR:TARGET%身体的颤抖终于停了下来。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '125-132',
        any: [/^[ \t]*SIF TALENT:COUNT:117 && CFLAG:COUNT:1 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '134-140',
        any: [/^[ \t]*V = \(CFLAG:31 \/ 10\) \+ 1 - U[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '142-150',
        any: [/^[ \t]*CALL SUFFER_FROM_WITHDRAWAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '152-192',
        any: [
          /^[ \t]*IF \(TALENT:COUNT:117 \|\| TALENT:COUNT:63\) && CFLAG:COUNT:1 == 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '193-217',
        any: [
          /^[ \t]*PRINTFORML 数小时后，%SAVESTR:TARGET%身体的颤抖终于停止了，[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '220-294',
        any: [/^[ \t]*@SUFFER_FROM_WITHDRAWAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '221-289',
        any: [/^[ \t]*CALL PRECIPITATE_WITHDRAWAL_BE_A_MISANTHROPIST[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '287-288',
        any: [/^[ \t]*PRINTL[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '295-343',
        any: [/^[ \t]*@PRECIPITATE_WITHDRAWAL_FALL_INTO_DISFAVOR[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '295-299',
        any: [/^[ \t]*@PRECIPITATE_WITHDRAWAL_FALL_INTO_DISFAVOR[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '319-331',
        any: [/^[ \t]*@PRECIPITATE_WITHDRAWAL_BE_A_MISANTHROPIST[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_ADDICT.ERB',
        ref: '338-343',
        any: [/^[ \t]*@PRECIPITATE_WITHDRAWAL_BE_A_WRECK[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
