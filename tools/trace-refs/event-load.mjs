// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-load.mjs

export const FILES = [
  {
    // @EVENTLOAD 读档钩子（#137）：SYSTEM ver1.0.3.ERB 的逐行处置 +
    // DATA_FIX 三行出处（判定依据见 event-load.js 文件头）；SYSTEM_DATA
    // 的活钳制行（:74-75，@SYSTEM_LOADGAME 侧）是对照引用
    js: 'ere/event/event-load.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '760-778',
        any: [/@EVENTLOAD/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '761',
        any: [/^@EVENTLOAD$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '764',
        any: [/角色名初始化/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '766',
        any: [/EX素质名初始化/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '768-772',
        any: [/IF LASTLOAD_NO == 999/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '769-771',
        any: [/CALL MAOUNET/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '773-774',
        any: [/CALL INPORT_B/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '775-776',
        any: [/;SIF EX_FLAG:2801 < 10/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '779',
        any: [/CALL DATA_FIX/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_DATA.ERB',
        ref: '74-75',
        any: [/SIF EX_FLAG:2801 < 10/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
