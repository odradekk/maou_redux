// 源: tools/trace-check.mjs  @FILES
// issue #345：MONSTER_SKILL.ERB 四个函数整文件移植。

const SOURCE = 'target/ERB/怪物相關/MONSTER_SKILL.ERB';

export const FILES = [
  {
    js: 'ere/dungeon/monster-skill.js',
    refs: [
      {
        src: SOURCE,
        ref: '2-173',
        any: [/^@MONSTER_SKILL, ARG:0, ARG:1, ARG:2$/m],
      },
      {
        src: SOURCE,
        ref: '174-241',
        any: [/^@MONSTER_ROOM_SKILL, ARG:0, ARG:2$/m],
      },
      {
        src: SOURCE,
        ref: '242-298',
        any: [/^@SLAVE_MONSTER_SKILL, ARG:0, ARG:1$/m],
      },
      {
        src: SOURCE,
        ref: '299-457',
        any: [/^@USE_MONSTER_SKILL, ARG:0, ARG:1, ARG:2, DMG, ARG:4, ARGS:0$/m],
      },
      { src: SOURCE, ref: '143', any: [/LOCAL:1 \* 2/] },
      { src: SOURCE, ref: '144', any: [/BASE:\(ARG:0\):0 -= LOCAL:2/] },
      { src: SOURCE, ref: '329', any: [/LOCAL:0 = E:\(ARG:2\)/] },
      {
        src: SOURCE,
        ref: '443',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:0\)%用弓箭发动了攻击/],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
