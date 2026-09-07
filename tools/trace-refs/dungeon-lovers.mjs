// 源: tools/trace-check.mjs  @FILES
// issue #341：其他/LOVERS.ERB 四函数全文。

export const FILES = [
  {
    js: 'ere/dungeon/dungeon-lovers.js',
    refs: [
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '7-72',
        any: [/@ENTER_LOVER, ARG:0/],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '73-143',
        any: [/@NAME_LOVER, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '144-1616',
        any: [/@DUNGEON_TOWN_LOVER, ARG:0/],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '201-1043',
        any: [/^CASE 1$/m],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1044-1291',
        any: [/^CASE 200$/m],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1293-1302',
        any: [/^;貞操帯\?処女封印$/m],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1416-1438',
        any: [/^;被写フラグボーナス$/m],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1526',
        any: [/JUEL:\(ARG:0\):0 \+= LOCAL \* 5/],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1528',
        any: [/JUEL:\(ARG:0\):14 \+= LOCAL \* 5/],
      },
      {
        src: 'target/ERB/其他/LOVERS.ERB',
        ref: '1617-1708',
        any: [/@DUNGEON_TOWN_LOVER_CHARA_ENTER, ARG:0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
