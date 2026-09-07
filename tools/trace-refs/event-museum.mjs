// 源: tools/trace-check.mjs  @FILES
// issue #347：MUSEUM.ERB 单函数整文件移植。

const SRC = 'target/ERB/處刑相關/MUSEUM.ERB';

export const FILES = [
  {
    js: 'ere/event/event-museum.js',
    refs: [{ src: SRC, ref: '2-1107', any: [/^@MUSEUM$/m] }],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
