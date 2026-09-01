// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-battle.mjs

export const FILES = [
  // —— #175 H6 战斗：ere/dungeon/dungeon-battle.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-battle.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1006-1115',
        any: [/@MONSTER_ATTACK, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1024-1030',
        any: [/;生存怪物数を求める/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1032-1037',
        any: [/;全滅時/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1039-1049',
        any: [/;ターン数から攻撃怪物を求める/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1052',
        any: [/MONID -= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1054-1057',
        any: [/B = MONID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1060-1063',
        any: [/Y = E:\(MONID \+ 5\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1065-1070',
        any: [/MONNUM = E:\(MONID \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1072-1075',
        any: [/;ダンジョンレベル補正/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1077',
        any: [/DMG = MONNUM \* E:\(MONID \+ 2\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1079',
        any: [/MONNAME = E:MONID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1080-1086',
        any: [/;攻撃による被害/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1088-1096',
        any: [/;畏怖・隷属処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1098-1100',
        any: [/;ダメージ処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1102-1108',
        any: [/IF DMG > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1111-1113',
        any: [/;ダメージが無かった場合/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1118-1145',
        any: [/@ATTACK_CHARA_EXTRA_DMG,ARG:0,DMG, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1148-1206',
        any: [/@DEFENCE_CHARA_EXTRA_DMG,ARG:0,DMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1180',
        any: [/ELSEIF CFLAG:\(ARG:0\):681 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1209-1256',
        any: [/@DEATH_CHECK, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1214-1227',
        any: [/;プレイヤー死亡判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1229-1248',
        any: [/;怪物側の生き残りを算出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '123-124',
        any: [/;攻撃順。ランダム/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '124',
        any: [/ATK_TURN = RAND:3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1250-1254',
        any: [/;全滅時/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '125-360',
        any: [/FOR TURN, 0, 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1260-1325',
        any: [/@VICTORY_GET,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1269-1279',
        any: [/IF CFLAG:\(ARG:0\):151 > 150/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1281-1295',
        any: [/;プライド低い場合、やりたくなる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1287-1289',
        any: [/;プライド低い場合、やりたくなる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1297-1308',
        any: [/;プライド高い場合、思いとどまる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1311-1312',
        any: [/SIF LOCAL:0 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1317',
        any: [/CALL KARMA, \(ARG:0\), -5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1319',
        any: [/CALL ADD_EX_ITEM, -1, \(ARG:0\), 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1321-1323',
        any: [/;なにも見つからなかったらしい。代わりに金品を得る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '132-137',
        any: [
          /IF \(TALENT:\(ARG:0\):11 \|\| TALENT:\(ARG:0\):15 \|\| TALENT:\(ARG:0\):34\) && TURN == 6/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1328-1441',
        any: [/@SKILL_EXTRA_BONUS,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1331-1332',
        any: [/SIF CFLAG:\(ARG:0\):9 < 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '138-163',
        any: [
          /ELSEIF	\(TALENT:\(ARG:0\):10 \|\| TALENT:\(ARG:0\):14 \|\| TALENT:\(ARG:0\):26\) && RAND:5 == 0/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1392',
        any: [/LOCAL:1 = RAND:5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '165-191',
        any: [/ELSEIF TURN > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '1-7',
        any: [/;--------------------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '18-20',
        any: [/;行動完了の場合飛ばす/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '194-296',
        any: [/;パラメータ表示/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '22-54',
        any: [/;対戦相手選択/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '279-287',
        any: [/;迷宫中战斗中勇者显示脸图/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '298-302',
        any: [/;攻撃を行い、また怪物の反撃を受けるキャラを選定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '304',
        any: [/;消耗品を使用するかチェック/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '307',
        any: [/;支配している怪物の攻撃/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '313-314',
        any: [/;先攻後攻決定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '3-412',
        any: [/@DUNGEON_PARTY_BATTLE, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '342-358',
        any: [/;攻撃を行った勇者が堕ちたか判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '359',
        any: [/ATK_TURN \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '362-365',
        any: [/SIF QUEST_FLAG == 2 && SUCCESS == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '367-368',
        any: [/SIF CFLAG:\(ARG:0\):1 == 2 && FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '370-410',
        any: [/;装備の回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '416-444',
        any: [/@MONSTER_LIST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '424-443',
        any: [/B = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '433-435',
        any: [/IF BOSS == 1 && NUM > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '436-437',
        any: [/ELSEIF NUM <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '438-440',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '447-487',
        any: [/@SELECT_ATKER, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '45',
        any: [/LOCAL = \(CFLAG:\(ARG:0\):501 - 1\) \* 10 \+ 100 \+ RAND:5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '456',
        any: [/ARG:1 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '46-51',
        any: [/;8階以上で強敵の抽選/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '467',
        any: [/LOCAL = ARG:1 % MEMBER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '473-479',
        any: [/;仲間Aが空欄の場合も考えて順番に見る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '487',
        any: [/RETURN ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '490-543',
        any: [/@SPEED_PLUS/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '546-882',
        any: [/@ENEMY_ATTACK, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '561-562',
        any: [/A = ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '565',
        any: [/CALL SELECT_BENKI_MENU\(TARGET, "戦闘"\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '56-73',
        any: [/;スケルトンチェック！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '568',
        any: [/PLAYER = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '570-574',
        any: [/IF TALENT:肛门虫/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '577-595',
        any: [/B = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '589',
        any: [/IF B >= 400/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '589-595',
        any: [/IF B >= 400/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '597-601',
        any: [/B = C/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '603-611',
        any: [/B = C \+ 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '612-613',
        any: [/;仕様変更にてオミット/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '615-616',
        any: [/B = C \+ 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '622',
        any: [/CALL SKILL_EXTRA_BONUS,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '628-630',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '633-640',
        any: [/W:8 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '637',
        any: [/DMG = CFLAG:\(ARG:0\):11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '643-648',
        any: [/W:0 = CFLAG:\(ARG:0\):550/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '650-660',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '653',
        any: [/CALL NAME_BENKI_MENU,PLAY_TYPE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '652-654',
        any: [/PRINTFORM 作为肉便器的%SAVESTR:\(ARG:0\)%以/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '662-663',
        any: [/CALL EQUIP_DATABASE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '665-675',
        any: [/;ミス処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '677-680',
        any: [/;気力回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '682-696',
        any: [/;ダメージ変動/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '698',
        any: [/CFLAG:\(ARG:0\):571 -= W:10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '700-708',
        any: [/;畏怖・隷属処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '711-722',
        any: [/;連続攻撃処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '724-725',
        any: [/CALL ATTACK_CHARA_EXTRA_DMG, \(ARG:0\), DMG, \(ARG:1\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '727-728',
        any: [/;DEF=敵残り防御力/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '730-740',
        any: [/;先手かつ奇袭の場合、奇袭成功/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '742-765',
        any: [/;追加効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '75-80',
        any: [/;勝利フラグ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '767-797',
        any: [/;耐性処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '799',
        any: [/B = E:C/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '802-829',
        any: [/IF DEF <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '803-807',
        any: [/IF LOCAL:0 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '812-818',
        any: [/GET_EXP = E:\(C \+ 1\) \+ CFLAG:0:9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '820-824',
        any: [/X = E:C/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '831',
        any: [/DEF = CFLAG:\(ARG:0\):11 \/ E:\(C \+ 3\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '834',
        any: [/DEF = CFLAG:\(ARG:0\):11 \/ X/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '836-837',
        any: [/;死亡怪物計算/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '866-875',
        any: [/;経験値取得/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '886-1004',
        any: [/@SLAVE_MONSTER_ATTACK/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '891-895',
        any: [/IF CFLAG:A:570 < 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '897-916',
        any: [/;防御側の防御力を算出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '89-96',
        any: [/;弾の補充/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '918-929',
        any: [/B = C \+ 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '932-937',
        any: [/;怪物側の攻撃力を算出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '940-943',
        any: [/Y = E:300/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '946',
        any: [/Z -= X/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '948',
        any: [/B = E:C/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '949-972',
        any: [/IF Z <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '957-964',
        any: [/B = C \+ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '974-977',
        any: [/B = C \+ 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '98-121',
        any: [/;先制/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '990-993',
        any: [/B = C \+ 1/],
      },
      // #178 任务真身接线（原 #175 登记的存根调用点）
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '77',
        any: [/CALL QUEST_BATTLE_SET,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '363',
        any: [/CALL RESULT_QUEST,ARG:0,"成功"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BATLLE.ERB',
        ref: '365',
        any: [/CALL RESULT_QUEST,ARG:0,"失败"/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
