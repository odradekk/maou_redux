// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-nextmonth.mjs

export const FILES = [
  {
    // @EVENT_NEXTMONTH 月份回绕（#115）
    js: 'ere/event/event-nextmonth.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '3-7',
        any: [/DAY:1は现在の月/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '12-36',
        any: [/^@EVENT_NEXTMONTH$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '14-17',
        any: [/IF DAY:1 == 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '18-21',
        any: [/DAY:1 == 4/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '22-25',
        any: [/DAY:1 == 1 \|\|/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '26-35',
        any: [/DAY:1 == 12/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '30-35',
        any: [/FOR AGE_COUNT, 1, CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '31',
        any: [/CFLAG:AGE_COUNT:452 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '32-33',
        any: [/HUMAN_AGE_GENERATE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTMONTH.ERB',
        ref: '34',
        any: [/^\t\tRESULT = 0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
