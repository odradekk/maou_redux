// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// EVENT1.ERB（#401）（#401 重落：refs 与 js 逐条对齐）

const SRC = 'target/ERB/EVENT/EVENT1.ERB';

export const FILES = [
  {
    js: 'ere/event/event-comend-normal.js',
    refs: [
      { src: SRC, ref: '1-9', any: [/^\uFEFF?@EVENTCOMEND$/m] },
      { src: SRC, ref: '3-4', any: [/^SIF CFLAG:TARGET:100$/m] },
      {
        src: SRC,
        ref: '6',
        any: [/^IF EXP:0 == 0 && EXP:1 > 0 && TALENT:30$/m],
      },
      { src: SRC, ref: '7', any: [/^	CFLAG:TARGET:100 = 1$/m] },
      {
        src: SRC,
        ref: '8',
        any: [
          /^	PRINTW （能守住贞操的话，稍微被进攻一下后面，也不是不能接受）$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
