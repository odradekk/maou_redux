// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-battle2.mjs

export const FILES = [
  // —— #175 H6 战斗：ere/dungeon/dungeon-battle2.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-battle2.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1001-1014',
        any: [/;勇者死亡判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1016-1037',
        any: [/;魔王側の生き残りを判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '102-170',
        any: [/;---先制攻撃フェイズ---/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1039-1053',
        any: [/IF BASE:\(ARG:0\):0 <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '105-138',
        any: [/FOR TURN, 0, 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1058-1200',
        any: [/@DUNGEON_SPY, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1073-1083',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1085-1181',
        any: [/;パーティを裏切って陥落させる処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1108-1179',
        any: [/IF LOCAL < BETRAY/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1148-1150',
        any: [/MONEY \+= 100 \* CFLAG:LEADER:9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1151-1153',
        any: [/CFLAG:\(ARG:0\):505 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1154-1157',
        any: [/CFLAG:LEADER:506 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1159-1162',
        any: [/PRINTFORM 要让%SAVESTR:\(ARG:0\)%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1184-1197',
        any: [/CALL SPY_BATTLE, ARG:0, LEADER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1204-1298',
        any: [/@SPY_BATTLE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1219-1231',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1233-1260',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1263-1273',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1276-1280',
        any: [/;\[施虐狂\]持ちならダメージが1\.2倍/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1282-1283',
        any: [/;善恶值を負の値にする/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1290-1291',
        any: [/BASE:\(ARG:1\):0 -= HDMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '1293',
        any: [/CALL KARMA, ARG:1, KDMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '136',
        any: [/BREAK/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '141-170',
        any: [/FOR TURN, 0, 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '155-160',
        any: [/;対象決定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '174-471',
        any: [/FOR TURN, 0, 20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '176-181',
        any: [/IF TURN > 15/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '183-333',
        any: [/;パラメータ表示/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '24-27',
        any: [/IF CFLAG:\(ARG:0\):500 == 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '2-510',
        any: [/@DUNGEON_BATTLE2_PARTY, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '29-30',
        any: [/;---対象選択フェイズ---/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '29-49',
        any: [/;---対象選択フェイズ---/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '335-345',
        any: [/;戦闘を行うキャラの選択/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '347-391',
        any: [/IF ATKER >= 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '393-401',
        any: [/;配下怪物データの取得・怪物の攻撃/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '412-459',
        any: [/;先攻後攻決定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '461-468',
        any: [/CALL DEATH_CHECK2, ATKER, DEFER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '473-484',
        any: [/;奴隷装備の回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '486-510',
        any: [/A = ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '513-573',
        any: [/@SELECT_SLAVE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '51-62',
        any: [/;---対象選択失敗時の処理---/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '536-540',
        any: [/FOR MONID, 0, 300/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '543',
        any: [/LOCAL = ARG:1 % MEMBER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '548-555',
        any: [/ELSEIF LOCAL == 1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB', ref: '569', any: [/NEXT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '572',
        any: [/;念のためいなかったらリーダーが返る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '577-632',
        any: [/@SPEED_PLUS2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '585-609',
        any: [/;奇袭/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '610-618',
        any: [/;装備効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '620-630',
        any: [/LOCAL = A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '637-791',
        any: [/@DUEL_ATTACK, ARG:0, ARG:1, ARG:2, ARG:3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '64-100',
        any: [/;---戦闘開始前の準備---/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '661-664',
        any: [/;一応代入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '668-672',
        any: [/IF TALENT:肛门虫/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '674-681',
        any: [/IF ARG:3 == 0 \|\| ARG:3 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '675-681',
        any: [/X:1 = 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '683-686',
        any: [/;发动魔法/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '688-691',
        any: [/;精英部下的特技/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '693-701',
        any: [/;予め変数に入れておく/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '703-704',
        any: [/;戦闘前発動スキル/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '709-711',
        any: [/;セリフ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '713-718',
        any: [/;先手かつ奇袭の場合、相手の防御値を減少させる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '716',
        any: [/PRINT 偷袭成功！！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '71-86',
        any: [/FOR TURN, 0,  3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '720-726',
        any: [/;武器効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '728-731',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '734-735',
        any: [/CALL EQUIP_DATABASE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '737-755',
        any: [/;奴隷vs潜入中奴隷なら攻撃をサボる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '761',
        any: [/DMG = \(CFLAG:\(ARG:0\):11 - CFLAG:\(ARG:2\):12\)\*2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '763-764',
        any: [
          /CALL ATTACK_CHARA_EXTRA_DMG_BATTLE2, \(ARG:0\), DMG, \(ARG:1\), \(ARG:2\), ATKTITLE/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '766-767',
        any: [/CALL ATTACK_CHARA_EXTRA_DMG, \(ARG:0\), DMG, \(ARG:1\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '769-771',
        any: [/;ダメージ補正/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '778',
        any: [/EXP:\(ARG:0\):80 \+= CFLAG:\(ARG:2\):9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '794-842',
        any: [/@SLAVE_MONSTER_ATTACK_TO_ENEMY, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '803-807',
        any: [/IF CFLAG:\(ARG:0\):570 < 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '809-814',
        any: [/;怪物側の攻撃力を算出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '816-819',
        any: [/TOP = E:300/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '821-833',
        any: [/IF CFLAG:\(ARG:1\):12 < DAMAGE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '837-838',
        any: [/CFLAG:\(ARG:1\):12 \/= 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '846-894',
        any: [/@SLAVE_MONSTER_ATTACK_TO_SLAVE, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '855-859',
        any: [/IF CFLAG:\(ARG:1\):570 < 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '861-866',
        any: [/;怪物側の攻撃力を算出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '868-871',
        any: [/TOP = E:400/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '873-885',
        any: [/IF CFLAG:\(ARG:0\):12 < DAMAGE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '889-890',
        any: [/CFLAG:\(ARG:0\):12 \/= 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '897-993',
        any: [
          /@ATTACK_CHARA_EXTRA_DMG_BATTLE2,ARG:0,DMG, ARG:1, ARG:2, ATKTITLE/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '911-920',
        any: [/;ミス処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '9-15',
        any: [/#DIM DEFER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '922-925',
        any: [/;気力回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '927-930',
        any: [/IF CFLAG:\(ARG:2\):12 < CFLAG:\(ARG:0\):11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '93-100',
        any: [/;弾の補充/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '932-935',
        any: [/;防御値の減少/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '937-940',
        any: [/;DMG=ダメージ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '942-951',
        any: [/;ダメージ変動/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '952',
        any: [/MDMG = MDMG \* W:16 \/ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '954',
        any: [/CFLAG:\(ARG:0\):571 -= W:10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '956-962',
        any: [/;連続攻撃処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '964-969',
        any: [/;先手かつ奇襲なら防御値減少/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '967',
        any: [/PRINT 奇襲成功！！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '971-983',
        any: [/;追加効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '985-989',
        any: [/;耐性処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '991',
        any: [/BASE:\(ARG:2\):1 -= MDMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE2.ERB',
        ref: '996-1055',
        any: [/@DEATH_CHECK2, ARG:0, ARG:1/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
