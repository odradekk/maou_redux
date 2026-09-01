// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：source-check.mjs

export const FILES = [
  {
    js: 'ere/event/source-check.js',
    refs: [
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '267-268',
        any: [/^\s*;?\s*SIF\ TALENT:0\ ==\ 0\ \|\|\ TFLAG:19\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '270',
        any: [/^\s*;?\s*PRINTL\ 【处女丧失】$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '271',
        any: [/^\s*;?\s*TALENT:0\ =\ 0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '274-277',
        any: [/^\s*;?\s*TFLAG:3\ =\ 1$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '282',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '284',
        any: [/^\s*;?\s*TFLAG:14\ =\ 0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '284-285',
        any: [/^\s*;?\s*TFLAG:14\ =\ 0/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '287-313',
        any: [/^\s*;?\s*IF\ CFLAG:15\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '289',
        any: [/^\s*;?\s*CFLAG:15\ =\ NO:PLAYER\ \+\ 1$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '290',
        any: [/^\s*;?\s*CSTR:TARGET:3\ =\ %SAVESTR:PLAYER%$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '314-325',
        any: [/^\s*;?\s*SIF\ TEQUIP:90\ \&\&\ SELECTCOM\ ==\ 101$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '327-340',
        any: [/^\s*;?\s*TFLAG:150\ =\ 1$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '400-401',
        any: [/^\s*;?\s*SIF\ TEQUIP:54\ \&\&\ TFLAG:899\ >\ 0$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1812',
        any: [/^\s*;?\s*CALL\ SEIIN_START$/m],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '7-576',
        any: [/@SOURCE_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '11-12',
        any: [/CALL KOJO_MESSAGE_COM/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '19-51',
        any: [/射在避孕套里/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '53-55',
        any: [/CUSTOMDRAWLINE ‥/, /ELSEIF ASSIPLAY && TEQUIP:36/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '58-123',
        any: [/;バイブ装着中/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '128-130',
        any: [/CALL SOURCE_SEX_CHECK/, /CALL MASTER_SKILL_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '132-144',
        any: [/ズーコの着ぐるみを着ている/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '157-158',
        any: [/SIF TFLAG:13/, /PRINTL 初吻/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '162-186',
        any: [
          /CALL SOURCE_CHECK_UP_C/,
          /CALL SOURCE_CHECK_UP_B/,
          /CALL SOURCE_CHECK_UP_FREE/,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '188-206',
        any: [
          /同じコマンドの連続実行による上下の処理（快楽系）/,
          /気力０による上下の処理（快楽系）/,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '210-218',
        any: [/R = NO:PLAYER/, /RELATION:R != 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '225',
        any: [/CALL UP_TALENT_CVA_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '230',
        any: [/CALL LOVE_MOIST_CHECK_UP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '235',
        any: [/CALL EX_CHECK_UP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '238-252',
        any: [/調教対象の射精チェック/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '254-255',
        any: [/主人による調教の经验值/, /CALL MASTER_FLAG_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '260-315',
        any: [
          /CALL SOURCE_CHECK_UP_LOVE/,
          /CALL SOURCE_CHECK_UP_DEVIATE/,
          /CALL SOURCE_CHECK_UP_LIKE/,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '326',
        any: [/CALL UP_TALENT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '331-345',
        any: [/R = NO:PLAYER/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '352-357',
        any: [/IF SELECTCOM == PREVCOM/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '363',
        any: [/TFLAG:59 = PREVCOM/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '377-387',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '411-412',
        any: [/BASE:0 -= LOSEBASE:0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '415-424',
        any: [/挿しっぱ无判定 TFLAG:60/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '426-473',
        any: [/TEQUIP:37/, /CFLAG:101/, /膣内射精のチェック/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '476',
        any: [/CALL TRAIN_MESSAGE_A/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '482-497',
        any: [/IF TFLAG:899 < 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '499',
        any: [/CALL PISSING_ECST_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '504-513',
        any: [/CALL KOJO_MESSAGE_PALAMCNG/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '510',
        any: [/CALL MARK_GOT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '518',
        any: [/CALL EXP_GOT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '523',
        any: [/CALL SOKUOCHI_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '525',
        any: [/PRINTW ‥/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '530',
        any: [/CALL SHOW_SOURCE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '536-543',
        any: [/＜相性/, /连续执行同一指令/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '545',
        any: [/PREVCOM = SELECTCOM/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '552-567',
        any: [/CALL LOSELIFE_BAR/, /CALL LOSEVITAL_BAR/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '576',
        any: [/CALL PALAM_UP_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '579',
        any: [/@SOURCE_CHECK_UP_C/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '583-588',
        any: [/SIF TALENT:101 & 1/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '590-605',
        any: [/;PALAM:欲情をみる/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '607-624',
        any: [/;ABL:欲望をみる/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '626-648',
        any: [/快感の否定、抑圧、抵抗/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '650-655',
        any: [/;自慰狂い/, /IF TALENT:74/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '675',
        any: [/@SOURCE_CHECK_UP_V/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '773',
        any: [/@SOURCE_CHECK_UP_A/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '872',
        any: [/@SOURCE_CHECK_UP_B/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '879-897',
        any: [/絶壁、貧乳、巨乳、爆乳、超乳はここで処理/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '987',
        any: [/@SOURCE_CHECK_UP_LOVE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1052',
        any: [/@SOURCE_CHECK_UP_IMPULSIVE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1122',
        any: [/@SOURCE_CHECK_UP_ACHIEVE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1186',
        any: [/@SOURCE_CHECK_UP_PAIN/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1294',
        any: [/@SOURCE_CHECK_UP_POISON/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1338',
        any: [/@SOURCE_CHECK_UP_DIRTY/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1373',
        any: [/@SOURCE_CHECK_UP_MOIST/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1383',
        any: [/@SOURCE_CHECK_UP_DESIRE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1393',
        any: [/@SOURCE_CHECK_UP_FLASHER/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1471',
        any: [/@SOURCE_CHECK_UP_SUBMIT/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1529',
        any: [/@SOURCE_CHECK_UP_DEVIATE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1587',
        any: [/@SOURCE_CHECK_UP_LIKE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1598',
        any: [/@SOURCE_CHECK_UP_FREE/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1609',
        any: [/@LOVE_MOIST_CHECK_UP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1628',
        any: [/@PAIN_DAMAGE_CHECK_UP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '1662-2131',
        any: [/@EX_CHECK_UP/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2137-2175',
        any: [/@SHOW_SOURCE/, /PRINTFORM 情爱\(\{SOURCE:3\}\)/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2182-2242',
        any: [/@PALAM_UP_CHECK/, /FOR UPCOUNT,0,16/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2230-2231',
        any: [/PALAM:UPID \+= UP:UPID/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2278-2394',
        any: [/@PALAM_MESSAGE,ARG/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2513-2520',
        any: [/@FIGURE_INDENT_2/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2529',
        any: [/@LOSELIFE_BAR/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '2561',
        any: [/@LOSEVITAL_BAR/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '31-43',
        any: [/@SOURCE_SEX_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '47-51',
        any: [/IF TALENT:PLAYER:33/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '53-55',
        any: [/IF TALENT:PLAYER:87/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '70-77',
        any: [/IF TALENT:PLAYER:92/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '124-169',
        any: [/;調教者のABL:技巧/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '172',
        any: [/@MASTER_SKILL_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '205-220',
        any: [/IF TALENT:76/, /IF TALENT:85/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '691-738',
        any: [/@UP_TALENT_CVA_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '740-935',
        any: [/@UP_TALENT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '952-1080',
        any: [/@MARK_GOT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1092',
        any: [/@YOKUBO_UP_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1113',
        any: [/@JUJUN_UP_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1124',
        any: [/@EXP_GOT_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1315',
        any: [/@SOKUOCHI_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1555',
        any: [/@ECST_CHECK,ARG/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1561',
        any: [/@PISSING_ECST_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1615-1711',
        any: [/@MASTER_FLAG_CHECK/, /主人と対象の能力を計算/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1633-1640',
        any: [/REPEAT 5/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1642-1707',
        any: [/IF ASSIPLAY == 0 && TEQUIP:90 == 0/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
        ref: '1727',
        any: [/@TARGET_WORMBABY_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB',
        ref: '9',
        any: [/@SOURCE_LESBIAN_SEX_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB',
        ref: '242',
        any: [/@SOURCE_GAY_SEX_CHECK/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB',
        ref: '324',
        any: [/@INCEST/],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE_SUB2.ERB',
        ref: '350',
        any: [/@SOUL_DISLOCATION_DEBUFF/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
