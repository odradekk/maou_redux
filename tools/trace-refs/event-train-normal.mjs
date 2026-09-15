// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// EVETRAIN.ERB（#401）（#401 重落：refs 与 js 逐条对齐）

const SRC = 'target/ERB/EVENT/EVETRAIN.ERB';

export const FILES = [
  {
    js: 'ere/event/event-train-normal.js',
    refs: [
      { src: SRC, ref: '1-17', any: [/^\uFEFF?@EVENTTRAIN$/m] },
      { src: SRC, ref: '3', any: [/^BASE:MASTER:2 = 0$/m] },
      { src: SRC, ref: '5', any: [/^BASE:TARGET:2 = 0$/m] },
      { src: SRC, ref: '6-7', any: [/^SIF ASSI >= 0$/m] },
      { src: SRC, ref: '10', any: [/^VARSET TFLAG, 0, 0, 201$/m] },
      { src: SRC, ref: '13-17', any: [/^IF ASSIPLAY == 0$/m] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
