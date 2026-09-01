// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：weapon-restore.mjs

export const FILES = [
  {
    js: 'ere/system/equip/weapon-restore.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '7-66',
        any: [/^@WEAPON_RESTORE,ARG:0$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '12-19',
        any: [/^;装備効果$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '21-28',
        any: [/^;鉄壁$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '30-35',
        any: [/^;装備効果$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '37-41',
        any: [/^;装備効果\(攻撃増加\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '43-47',
        any: [/^;装備効果\(防御増加\)$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '49-60',
        any: [/^;勲章によって強化される上位職$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHAR_ST.ERB',
        ref: '62-66',
        any: [/^IF TALENT:\(ARG:0\):314 == 2 && DAY:2 >= 14 && DAY:2 <= 16$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
