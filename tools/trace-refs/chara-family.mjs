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
        ref: '328-337',
        any: [/@FAMILY_BIRTHTO_MOM\(L_A, L_B\)/],
      },
      {
        src: 'target/ERB/關係設置/RELATION_FAMILY.ERB',
        ref: '343-353',
        any: [/@FAMILY_BIRTHTO_DAD\(L_A, L_B\)/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
