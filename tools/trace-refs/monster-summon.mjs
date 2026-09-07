// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #346 按 js 文件拆出：monster-summon.mjs

const SUMMON = 'target/ERB/怪物相關/SUMMON_MONSTER.ERB';

export const FILES = [
  {
    js: 'ere/dungeon/monster-summon.js',
    refs: [
      {
        src: SUMMON,
        ref: '5-219',
        any: [/@SUMMON_MONSTER\(ARG\)\r?\n#DIM SUMMON_POW/],
      },
      { src: SUMMON, ref: '169-182', any: [/@MONSTER_TOTAL_COUNT/] },
      { src: SUMMON, ref: '185-219', any: [/@RAND_MONSTER_NUMBER/] },
      { src: SUMMON, ref: '154-166', any: [/@SUMMON_MONSTER_MASTER/] },
      {
        src: SUMMON,
        ref: '5-148',
        any: [/@SUMMON_MONSTER\(ARG\)\r?\n#DIM SUMMON_POW/],
      },
      { src: SUMMON, ref: '151-152', any: [/@PREGNANCY_MASTER/] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
