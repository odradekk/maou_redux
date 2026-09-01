// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：equip-usable.mjs

export const FILES = [
  {
    js: 'ere/system/equip/equip-usable.js',
    refs: [
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '247-329',
        any: [/^@USEABLE_EQUIPMENT,ARG,ARG:1 $/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '251-252',
        any: [/^SIF ARG:1 >= 0 && ARG:1 <= 20$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '267-273',
        any: [/^IF TALENT:ARG:200$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '267-329',
        any: [/^IF TALENT:ARG:200$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '275-281',
        any: [/^IF TALENT:ARG:201$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '283-289',
        any: [/^IF TALENT:ARG:202$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '291-297',
        any: [/^IF TALENT:ARG:203$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '299-305',
        any: [/^IF TALENT:ARG:205$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '307-313',
        any: [/^IF TALENT:ARG:206$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '315-321',
        any: [/^IF TALENT:ARG:207$/m],
      },
      {
        src: 'target/ERB/其他/USE_EX_ITEM.ERB',
        ref: '323-329',
        any: [/^IF TALENT:ARG:208$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
