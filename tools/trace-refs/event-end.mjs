// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-end.mjs

export const FILES = [
  {
    js: 'ere/event/event-end.js',
    refs: [
      // #215（J5）：调教后衣物处理与再着衣换真身
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '360',
        any: [/^\s*CALL RE_CLOTHED$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '316-317',
        any: [/^PRINTL 调教结束了。$/m, /^WAIT$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '319-323',
        any: [/角色復位/, /^MASTER = T:10$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '320',
        any: [/^MASTER = T:10$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '321',
        any: [/^TARGET = T:11$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '322-323',
        any: [/^SIF ASSI$/m, /^\tASSI = T:12$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '325-332',
        any: [/失神時の口上非表示の回復/, /^IF TFLAG:860 == 1$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '334-336',
        any: [
          /今回の調教対象と助手を記録/,
          /^FLAG:1 = TARGET:1$/m,
          /^FLAG:2 = ASSI:1$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '338-339',
        any: [/調教後に死んでいる可能性をチェック/, /^CALL CHARADEAD_CHECK$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '341-345',
        any: [/生きていれば調教後行為のチェック/, /^IF RESULT == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '344',
        any: [/^\tDRAWLINE$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '347-354',
        any: [
          /搾乳した母乳の売却/,
          /^CALL SELL_MILK$/m,
          /^CALL SELL_VIDEO$/m,
          /^CALL SELL_FIGHTMONEY$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '356-361',
        any: [/生きていて着衣モードなら/, /^IF FLAG:37 && BASE:0 > 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '363-375',
        any: [
          /調教後に死ぬか臨死状態なら/,
          /^IF BASE:0 < 1 && TARGET != MASTER$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '365-373',
        any: [/キャラ削除処理/, /^DELCHARA A$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '373',
        any: [/\tDELCHARA A$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '375',
        any: [/^\tBEGIN TURNEND$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '376-378',
        any: [/魔王换人的处理/, /^CALL MAOU_TENSHIN$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '381-390',
        any: [/善恶值増減/, /^IF EX:1$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '383',
        any: [/私处绝顶使善恶值:-1/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '384',
        any: [/CALL KARMA, TARGET, -1/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '388',
        any: [/肛门绝顶使善恶值:-2/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '389',
        any: [/CALL KARMA, TARGET, -2/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '392-406',
        any: [/时常发情/, /^IF FLAG:75 == 0 && TALENT:271 == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '394-399',
        any: [/潤滑|润滑の10000分の1を蓄積/, /^IF PALAM:3 >= 10000$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '400-405',
        any: [/欲情の10000分の1を蓄積/, /^IF PALAM:5 >= 10000$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '408-418',
        any: [/^LOCAL = 0$/m, /^IF FLAG:400 && TALENT:85$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '410',
        any: [/因奴隷的愛而回復了気力/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '411',
        any: [/^\tLOCAL = 700$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '413',
        any: [/因調教奴隷而回復了気力/],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '414',
        any: [/^\tLOCAL = 500$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '416-418',
        any: [/^BASE:0:1 \+= LOCAL$/m, /^SIF BASE:0:1 > MAXBASE:0:1$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '420-421',
        any: [/何点数を得られたか/, /^CALL JUEL_CHECK$/m],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '424-426',
        any: [
          /切换回原来的目标与助手/,
          /^ASSI = ASSI:1$/m,
          /^TARGET = TARGET:1$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/TRAIN_MAIN.ERB',
        ref: '428-429',
        any: [/能力値の上昇はメイン画面で行わせる/, /^BEGIN TURNEND$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
