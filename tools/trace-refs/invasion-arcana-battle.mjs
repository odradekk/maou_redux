// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #470 按 js 文件拆出：invasion-arcana-battle.mjs

export const FILES = [
  // —— #470 Q13 侵略残余·3：ere/invasion/invasion-arcana-battle.js。
  //    锚 = 所引区间内带鉴别力的原文行 ——
  {
    js: 'ere/invasion/invasion-arcana-battle.js',
    refs: [
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '2-121',
        any: [/;圣灵ナイトと元勇者の戦闘/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '20-22',
        any: [/CFLAG:ATKER:571 = 15/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '24-32',
        any: [/IF TALENT:ATKER:252 == 1/, /;先制圣灵/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '34-110',
        any: [/FOR TURN, 0, 20/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '35-40',
        any: [/BASE:ATKER:1 -= RAND:30/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '42-59',
        any: [/BARL BASE:ATKER:0,MAXBASE:ATKER:0,50/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '61-64',
        any: [/;先制（旧処理の場所）/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '66-73',
        any: [/CALL SPEED_PLUS3/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '79-85',
        any: [/PRINTL 战斗中断了/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '91-97',
        any: [/PRINTL 战斗中断了/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '99-107',
        any: [/CALL DEATH_CHECK4/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '108-109',
        any: [/BASE:DEFER:1 -= RAND:20/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '112-113',
        any: [/PRINTFORML %SAVESTR:ATKER%被圣灵骑士击败了/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '116-121',
        any: [/CALL WEAPON_RESTORE,ATKER/, /SIF CFLAG:DEFER:1 == 0/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '124-177',
        any: [/;ホビットの加速ボーナス/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '534-547',
        any: [/;圣灵ナイト死亡判定/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '551-566',
        any: [/IF BASE:A:0 <= 0 && \(FLAG:5 & 128\)/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_BATTLE.ERB',
        ref: '568-582',
        any: [/怜悯着倒下的她，把她赶到了堡垒外/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
