// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-after.mjs

export const FILES = [
  // —— #179 H10 战果口上分发：ere/kojo/kojo-dungeon-after.js ——
  {
    js: 'ere/kojo/kojo-dungeon-after.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '468-476',
        any: [/^\s*@GOHOUBI_AFTER_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '486-494',
        any: [/^\s*@OSIOKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '471-472',
        any: [/^;口上の存在判定/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '473',
        any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_K.ERB',
        ref: '491',
        any: [/^\s*LOCAL\ =\ GET_KOJO_NUM\(\)$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
