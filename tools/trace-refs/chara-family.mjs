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
      {
        src: 'target/ERB/關係設置/RELATION_FAMILY.ERB',
        ref: '113',
        any: [/L_EXP_AGE2 = CHAR_AGE_EXPECT\(L_B\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME.ERB',
        ref: '169',
        any: [/^\tCALL RELATION_RENAME_REBUILD\(L_A\)\r?$/m],
      },
      // #596：关系调试表每行的收尾 PRINTL 只结束那一串 PRINTFORM 拼出的行
      {
        src: 'target/ERB/關係設置/RELATION.ERB',
        ref: '298',
        any: [/^\s*PRINTL\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
