// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：monster-database.mjs

export const FILES = [
  // —— #175 H6 战斗：ere/data/monster-database.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/data/monster-database.js',
    refs: [
      { src: 'target/ERB/侵略/ENEMY_DATA.ERB', ref: '23-67', any: [/;攻撃力/] },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '37-57',
        any: [/;E:Y\+8  == ボス化フラグ（空欄）/],
      },
      {
        src: 'target/ERB/怪物相關/MONSTER_DATA.ERB',
        ref: '465-2483',
        any: [/;---------------------------------------------------------/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
