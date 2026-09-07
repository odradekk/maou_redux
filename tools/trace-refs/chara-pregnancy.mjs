// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #346 按 js 文件拆出：chara-pregnancy.mjs

const NINSIN = 'target/ERB/其他/NINSIN.ERB';

export const FILES = [
  {
    js: 'ere/chara/chara-pregnancy.js',
    refs: [
      { src: NINSIN, ref: '16-1098', any: [/@NINSIN_MAIN/] },
      { src: NINSIN, ref: '872-881', any: [/@N_FLAG_CLEAR/] },
      { src: NINSIN, ref: '202-234', any: [/@PREG_TALENT_GET/] },
      { src: NINSIN, ref: '887-916', any: [/@N_BREAST_GROW/] },
      { src: NINSIN, ref: '922-943', any: [/@N_BREAST_REVERSE/] },
      {
        src: NINSIN,
        ref: '925-926',
        any: [/TALENT:ARG:超乳 = 1/],
      },
      { src: NINSIN, ref: '829-851', any: [/@N_RESET_STATUS/] },
      { src: NINSIN, ref: '856-867', any: [/@CHILD_BIRTH_PLACE/] },
      { src: NINSIN, ref: '647-823', any: [/@N_CHANGE_STATUS/] },
      { src: NINSIN, ref: '68-199', any: [/@NINSIN_AWARE/] },
      { src: NINSIN, ref: '239-292', any: [/@NINSIN_REACH_TERM/] },
      { src: NINSIN, ref: '628-642', any: [/@GB_DEFINE_NAME/] },
      { src: NINSIN, ref: '470-558', any: [/@GB_ADD_GUARD/] },
      { src: NINSIN, ref: '563-625', any: [/@GB_ADD_SLAVE/] },
      { src: NINSIN, ref: '420-464', any: [/@NINSIN_GIVE_BIRTH/] },
      {
        src: NINSIN,
        ref: '981-1068',
        any: [/@CHILD_CARE_CHANGE_NURSE/],
      },
      { src: NINSIN, ref: '949-974', any: [/@CHILD_CARE_BEGIN/] },
      { src: NINSIN, ref: '297-414', any: [/@NINSIN_REACH_DAY/] },
      { src: NINSIN, ref: '1074-1098', any: [/@CHILD_CARE_DEPART/] },
      { src: NINSIN, ref: '16-64', any: [/@NINSIN_MAIN/] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
