// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS

export const FILES = [
  {
    js: 'ere/chara/chara-family.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_FAMILY.ERB',
        ref: '12-355',
        any: [/@SEARCH_FAMILY, ARG:0, WHO_SEARCH = "FAMILY"/],
      },
      {
        src: 'target/ERB/關係設置/RELATION_FAMILY.ERB',
        ref: '24-1011',
        any: [
          /@FAMILY_REGISTER\(L_A\)/,
          /@DEC_BITADD\(L_NUM, L_BIT, L_VALUE\)/,
        ],
      },
      {
        src: 'target/ERB/關係設置/RELATION.ERB',
        ref: '8-301',
        any: [/@RELATION_GET\(L_A, L_B\)/, /@RELATION_DEBUGPRINT/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
