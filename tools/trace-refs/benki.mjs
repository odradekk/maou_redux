// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：benki.mjs

export const FILES = [
  {
    // #217 J7 肉便器：ere/system/train/benki.js（@BENKI 与战斗三段真身）
    js: 'ere/system/train/benki.js',
    refs: [
      {
        src: 'target/ERB/魔改新增/文本校正.ERB',
        ref: '1-7',
        any: [/@SHE\(ARG\)/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '2-1356',
        any: [/^@BENKI, ARG:0$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '4',
        any: [/^#DIM BENKI_MENU,10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '4-6',
        any: [/^#DIM BENKI_MENU,10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '26-30',
        any: [/^ELSEIF TALENT:\(ARG:0\):肉便器 == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '33-36',
        any: [/^\s*SIF BASE:\(ARG:0\):0 < 300$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '38-40',
        any: [/調教中以外除去/],
      },
      { src: 'target/ERB/調教相關/BENKI.ERB', ref: '50-52', any: [/^PRINTL/m] },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '62-78',
        any: [/常識改変フラグ/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '94-193',
        any: [/^;处女（V減少）$/m, /^;献身的（奉仕）$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '132-155',
        any: [/^;能力値$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '149-171',
        any: [/特殊な経験の有無/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '174-176',
        any: [/^;貞操帯（V減少）$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '181-193',
        any: [/^\s*SIF TALENT:\(ARG:0\):283 == 1$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '196-225',
        any: [/共通のPLAY補正/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '228-240',
        any: [/后面是我主要修改东西/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '243-346',
        any: [/配信分岐/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '393-400',
        any: [/^;DUNGEON_BITCH_LOG.ERB参照$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '411-421',
        any: [/^;説明（～をした）$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '426-491',
        any: [/^ELSEIF FLAG:62 == 3$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '468-491',
        any: [/^;乳内妊娠$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '491',
        any: [/^ELSEIF FLAG:62 == 10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '495-577',
        any: [/露出＆獣姦/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '565',
        any: [/^\s*PRINTFORM 服侍了起来$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '591',
        any: [/^\s*CALL BENKI_KOUJO$/m],
      },
      { src: 'target/ERB/調教相關/BENKI.ERB', ref: '624-757', any: [/配信/] },
      { src: 'target/ERB/調教相關/BENKI.ERB', ref: '626-637', any: [/被复制/] },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '645-710',
        any: [/PRINTFORML 了。/],
      },
      { src: 'target/ERB/調教相關/BENKI.ERB', ref: '653', any: [/^\s*ELSE$/m] },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '658-660',
        any: [/^\s*JUEL:\(ARG:0\):0 \+= PLAY\*10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '696-697',
        any: [/^\s*IF BENKI_MENU:2 >= 3$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '712-861',
        any: [/兽奸ソース3以上で兽奸分岐/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '808',
        any: [/^\s*CALL BENKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '819',
        any: [/^\s*JUEL:\(ARG:0\):0 \+= PLAY\*10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '863-1032',
        any: [/露出のソース3以上で公開/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '873',
        any: [/^\s*PRINTFORM 举止高贵地$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '982',
        any: [/^\s*CALL BENKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '992-1021',
        any: [/^\s*JUEL:\(ARG:0\):5 \+= PLAY\*10$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1059-1185',
        any: [/在精囊被掏空之前/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1128',
        any: [/^\s*CALL BENKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1229-1349',
        any: [/^\s*;奴隷の様子$/m, /^\s*;精液経験で分岐$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1310',
        any: [/^\s*CALL BENKI_KOUJO$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1359-1427',
        any: [/^@SELECT_BENKI_MENU\(ARG, ARGS\)$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1375-1403',
        any: [/技巧2以上で手淫分岐/],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1430-1494',
        any: [/^@NAME_BENKI_MENU\(ARG\)$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1440-1492',
        any: [/^CASE 2$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1497-1654',
        any: [/^@GET_EXP_BENKI_MENU\(ARG, ARG:1\)$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '162-270',
        any: [/^\s*BENKI_MENU:4 \+= 1$/m],
      },
      {
        src: 'target/ERB/調教相關/BENKI.ERB',
        ref: '1656-1681',
        any: [/^@BENKI_PLAYER_NAME$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
