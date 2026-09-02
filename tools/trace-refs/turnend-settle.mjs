// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：turnend-settle.mjs

export const FILES = [
  {
    // @EVENTTURNEND 普通档（#114 回合结算本体）——体系同上，源是 SYSTEM
    js: 'ere/system/turnend-settle.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '234-760',
        any: [/^@EVENTTURNEND$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '244-247',
        any: [/TARGET_POOL/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '250-258',
        any: [/FORMAT_AUTOTRAIN/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '263',
        any: [/^CALL PARTY_UNITE$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '265-272',
        any: [/WEAPON_RESTORE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '274-296',
        any: [/キャンペーン終了後のリセット/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '286-296',
        any: [/DUNGEON_MAP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '298-299',
        any: [/CALL LVUP, A/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '302',
        any: [/DUNGEON_AFTER/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '304-352',
        any: [/体力の回復/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '314-326',
        any: [/W:8 = 4/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '328-330',
        any: [/TALENT:A:314/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '332-334',
        any: [/HEAL \/= 30/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '336-340',
        any: [/休憩フラグ/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '341',
        any: [/CFLAG:A:4 = 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '343-348',
        any: [/快速回复/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '354-384',
        any: [/気力の回復/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '386-388',
        any: [/場所のリセット/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '390-413',
        any: [/容易陷落付与/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '415-431',
        any: [/@WEAPON_RESTORE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '433-437',
        any: [/経験増加/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '439-449',
        any: [/攻撃防御減少/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '451-494',
        any: [/CFLAG:A:570/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '496-523',
        any: [/洗脳/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '525-528',
        any: [/好感度減少/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '530-547',
        any: [/妄想支援/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '548-582',
        any: [/TALENT:A:310 < TALENT:A:311/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '589-609',
        any: [/自動處刑/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '611-617',
        any: [/SKIP中断/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '619',
        any: [/CALL LVUP, 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '623',
        any: [/^PRINTL$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '624-699',
        any: [/人间界的军队反抗着魔王军的侵略/],
      },
      // #119 接线的八个调用点（四领域 × 未征服/征服后反抗两臂）
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '631',
        any: [/CALL KYOTEN_EVENT, 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '640',
        any: [/CALL KYOTEN_EVENT, 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '650',
        any: [/CALL KYOTEN_EVENT, 2/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '659',
        any: [/CALL KYOTEN_EVENT, 2/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '669',
        any: [/CALL KYOTEN_EVENT, 3/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '678',
        any: [/CALL KYOTEN_EVENT, 3/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '688',
        any: [/CALL KYOTEN_EVENT, 4/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '697',
        any: [/CALL KYOTEN_EVENT, 4/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '702-718',
        any: [/魔王の回復/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '721',
        any: [/CAMPAIGN_GAMEOVER/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '723',
        any: [/TARGET = TARGET_POOL/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '725-737',
        any: [/CALL BENKI/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '729',
        any: [/^\s*CALL BENKI,A$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '740',
        any: [/^CALL AUTOTRAIN$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '743',
        any: [/^CALL PARTY_JOIN$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '745-746',
        any: [/GEO_OUTPUT_2/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '749-751',
        any: [/EVENT_NEWDAY/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB',
        ref: '753-758',
        any: [/TARGET = FLAG:1/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
