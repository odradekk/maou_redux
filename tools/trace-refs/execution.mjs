// 源: tools/trace-check.mjs  @FILES
// issue #348：處刑相關六文件整批移植。

const DIR = 'target/ERB/處刑相關';

export const FILES = [
  {
    js: 'ere/event/event-banishment-fate.js',
    refs: [
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '269-552',
        any: [/^\s*LOCAL:3 = TALENT:A:320 % 1000000000$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '612-890',
        any: [/^\s*SELECTCASE TALENT:\(A\):成为勇者前的生活$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-banishment.js',
    refs: [
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '2-949',
        any: [/^@BANISHMENT$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '27',
        any: [/^\s*RESETCOLOR$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '613',
        any: [/^\s*MATURO =\s*$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-execution.js',
    refs: [
      {
        src: `${DIR}/EXECUTION.ERB`,
        ref: '2-372',
        any: [/^@EXECUTION$/m],
      },
      {
        src: `${DIR}/EXECUTION.ERB`,
        ref: '375-446',
        any: [/^@EXECUTION_MINI\(ARGS = ""\)$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-infrastructure.js',
    refs: [
      {
        src: `${DIR}/INFRASTRUCTURE.ERB`,
        ref: '2-385',
        any: [/^@INFRASTRUCTURE$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-grotesque.js',
    refs: [
      {
        src: `${DIR}/GROTESQUE.ERB`,
        ref: '2-222',
        any: [/^@GROTESQUE$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-public-execution.js',
    refs: [
      {
        src: `${DIR}/PUBLIC_EXECUTION.ERB`,
        ref: '2-194',
        any: [/^@PUBLIC_EXECUTION$/m],
      },
    ],
  },
  {
    js: 'ere/system/train/seedbed.js',
    refs: [
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '2-70',
        any: [/^@NAEDOKO, ARG:0$/m],
      },
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '72-104',
        any: [/^@NAEDOKO_MAN, ARG:0$/m],
      },
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '106-130',
        any: [/^@NAEDOKO_NOT_V, ARG:0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
