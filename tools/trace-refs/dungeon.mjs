// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon.mjs

export const FILES = [
  // —— #172 H3 迷宫主循环：ere/dungeon/dungeon.js。锚为所引区间首个非空行的 ——
  //    原文（机械生成后人工核过形态）；src 常量 DUNGEON 见上。 ——
  {
    js: 'ere/dungeon/dungeon.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '330',
        any: [/D:20 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '835',
        any: [/D:20 -= BACK/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '335',
        any: [/D:20 = RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1344',
        any: [/CALL KARMA, A, -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '748',
        any: [/;移動を反映/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1',
        any: [/;--------------------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '3-853',
        any: [/@DUNGEON, ARG:0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '9', any: [/#DIM FLOOR/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '14-22',
        any: [/;A・ARG:0が攻略中のキャラ（リーダー）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '23-25',
        any: [/MAPC = 地下城/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '27-32',
        any: [/IF CFLAG:\(ARG:0\):530 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '34-35',
        any: [/SIDEA = CFLAG:\(ARG:0\):531/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '37',
        any: [/TARGET = ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '38',
        any: [/D:20 = CFLAG:\(ARG:0\):502/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '39', any: [/D:1 = 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '40-67',
        any: [/IF FLAG:5 & 32/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '41', any: [/PRINTL  /] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '42', any: [/DRAWLINE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '43-44',
        any: [/IF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):507 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '46-52',
        any: [/ELSEIF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):507 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '49',
        any: [/CFLAG:\(ARG:0\):507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '53-54',
        any: [/ELSEIF CFLAG:\(ARG:0\):507 == 1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '55-56', any: [/ELSE/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '58', any: [/DRAWLINE/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '60', any: [/PRINTL  /] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '61-66',
        any: [/;コンフィグ「戦闘ログでのSKIP中断」がONなら強制停止/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '69-74',
        any: [/;フラグオフ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '78',
        any: [/FOR TURN, 0, 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '79-81',
        any: [/;バランス調整のため侵攻は一回で終了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '80-81',
        any: [/SIF TURN > 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '84', any: [/NO_BATTLE = 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '86-88',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '87',
        any: [/PRINTFORM %SAVESTR:\(ARG:0\)%%MAPC%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '90-94',
        any: [/WALK = RAND:20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '96-97',
        any: [/SIF CFLAG:\(ARG:0\):507 != 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '99-103',
        any: [/;装備効果\(侵攻\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '105-109',
        any: [/;装備効果\(試練\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '111-122',
        any: [/;迷惑状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '124',
        any: [/FLOOR = CFLAG:\(ARG:0\):501/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '125-131',
        any: [/IF FLAG:400/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '133-153',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '136-143',
        any: [/PRINTL 挑选着客人……/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '146', any: [/WAIT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '148',
        any: [/PRINTL ----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '149',
        any: [/PRINTFORML    %MAPC%深处/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '150',
        any: [/PRINTL ----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '152',
        any: [/PRINTFORM 第\{FLOOR\}阶层/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '154-159',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '157', any: [/X \*= 2/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '160-162',
        any: [/IF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '161',
        any: [/BARL D:20,100,50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '165-373',
        any: [/IF D:20 >= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '167',
        any: [/CFLAG:\(ARG:0\):514 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '168-265',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '169-180',
        any: [/IF FLAG:400 && CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '174',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破这一层了！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '176-179',
        any: [/;攻略失敗。追い返される/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '182',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破这一层了！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '185-186',
        any: [/SIF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '188',
        any: [/CALL ADD_EX_ITEM, -1, ARG:0, 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '190-191',
        any: [/SIF FLAG:5 & 32 && RESULT == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '193-197',
        any: [/IF FLAG:400 > 0 && FLOOR >= 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '199-224',
        any: [/ELSEIF FLOOR >= 9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '200',
        any: [/PRINTL 这里是魔王的房间………/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '201-202',
        any: [/IF TALENT:\(ARG:0\):122 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '203-222',
        any: [/ELSEIF TALENT:\(ARG:0\):122/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '205-214',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '207',
        any: [
          /IF \(TALENT:MASTER:122 == 0 && ABL:MASTER:11 > 3\) \|\| \(ABL:MAS/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '210',
        any: [/CALL BEDROOM_BATTLE_MALE,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '212-213',
        any: [
          /PRINTFORML 可想而知%SAVESTR:\(ARG:0\)%失败了、成为了%MAPC%里众多奴隶的一员。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '216-221',
        any: [
          /PRINTFORML %SAVESTR:\(ARG:0\)%放弃了成为英雄的念头，开始回头了。/,
        ],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '224', any: [/D:20 = 0/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '225-264', any: [/ELSE/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '229', any: [/LOCAL = 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '230-231',
        any: [/IF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < 90/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '232-233',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < 90/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '235-236',
        any: [
          /ELSEIF SIDEA > 0 && BASE:SIDEA:0 \* 100 \/ MAXBASE:SIDEA:0 < 90/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '237-238',
        any: [
          /ELSEIF SIDEA > 0 && BASE:SIDEA:1 \* 100 \/ MAXBASE:SIDEA:1 < 90/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '240-241',
        any: [
          /ELSEIF SIDEB > 0 && BASE:SIDEB:0 \* 100 \/ MAXBASE:SIDEB:0 < 90/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '242-243',
        any: [
          /ELSEIF SIDEB > 0 && BASE:SIDEB:1 \* 100 \/ MAXBASE:SIDEB:1 < 90/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '245-248',
        any: [/IF LOCAL == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '251-257',
        any: [/IF CFLAG:\(ARG:0\):520 < FLOOR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '254-256',
        any: [/;到達階層を記憶/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '258-264', any: [/ELSE/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '266-283', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '268',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%返回了魔王的房间。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '270',
        any: [/CFLAG:\(ARG:0\):507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '272',
        any: [/CFLAG:\(ARG:0\):501 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '277-281',
        any: [/CFLAG:\(ARG:0\):503 \+= 1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '282', any: [/BREAK/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '284-354',
        any: [/ELSEIF D:20 <=0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '286',
        any: [/CFLAG:\(ARG:0\):514 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '287-327',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '288-289',
        any: [/SIF FLOOR == 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '291',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%回到了%MAPC%外面。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '294-295',
        any: [/;街でのイベント/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '297-314',
        any: [/; ;アイテムの購入/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '315', any: [/BREAK/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '317',
        any: [/CFLAG:\(ARG:0\):501 -= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '319',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%回到了第\{FLOOR\}阶层。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '322-326',
        any: [/CFLAG:\(ARG:0\):503 \+= 1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '328-354', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '329',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%踏破了这一层！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '331-337',
        any: [/;拡張任務の失敗判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '339-347',
        any: [/IF FLOOR <= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '349',
        any: [/CFLAG:\(ARG:0\):501 -= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '351',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%向夺回第\{FLOOR\}阶层发起挑战。/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '355-373', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '358',
        any: [/CFLAG:\(ARG:0\):514 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '360-371',
        any: [/;奴隷の場合カウントが溜まると帰還する/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '377-388',
        any: [/;设施効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '386',
        any: [/CALL DUNGEON_ROOM,A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '390-413',
        any: [/;陷阱処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '400-405',
        any: [/;装備効果\(陷阱誘発\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '408-412',
        any: [/;装備効果\(陷阱避け\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '415-419',
        any: [/A = ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '421-589',
        any: [/;戦闘フェイズ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '423-522',
        any: [/IF CFLAG:\(ARG:0\):1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '424-431',
        any: [/IF FLAG:5 & 16/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '426',
        any: [/PRINTW 因为没有敌人所以进行了训练。（经验值增加）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '432-440',
        any: [/ELSEIF NO_BATTLE > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '434',
        any: [/SIF FLAG:5 & 32/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '441-477', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '445',
        any: [/IF CFLAG:\(ARG:0\):1 != 2 && CFLAG:\(ARG:0\):1 != 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '446',
        any: [/CALL GET_DOWN_ENEMY,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '447-456',
        any: [/;善恶值が低いと、仲間を売って助かろうとする/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '457',
        any: [/CALL PARTY_DEL, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '461-466',
        any: [/;仲間Aが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '463',
        any: [/CALL GET_DOWN_ENEMY,SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '464',
        any: [/CALL PARTY_DEL, SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '468-473',
        any: [/;仲間Bが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '470',
        any: [/CALL GET_DOWN_ENEMY,SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '471',
        any: [/CALL PARTY_DEL, SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '475-476',
        any: [/SIF TURNEND > 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '479', any: [/TURNEND = 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '481-507',
        any: [/;善恶值によっては魔王に寝返る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '483',
        any: [/CFLAG:\(ARG:0\):1 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '484',
        any: [/CALL GET_DOWN_ENEMY,ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '493',
        any: [/CALL PARTY_DEL, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '495-499',
        any: [/;仲間Aが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '497',
        any: [/CALL GET_DOWN_ENEMY, SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '498',
        any: [/CFLAG:SIDEA:1 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '501',
        any: [/;仲間Bが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '501-505',
        any: [/;仲間Bが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '503',
        any: [/CALL GET_DOWN_ENEMY, SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '504',
        any: [/CFLAG:SIDEB:1 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '506',
        any: [/TURNEND \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '509-513',
        any: [/IF SIDEA > 0 && CFLAG:SIDEA:151 <= -150 && CFLAG:SIDEA:1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '510',
        any: [/CALL GET_DOWN_ENEMY, SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '511',
        any: [/CALL PARTY_DEL, SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '515-519',
        any: [/IF SIDEB > 0 && CFLAG:SIDEB:151 <= -150 && CFLAG:SIDEB:1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '516',
        any: [/CALL GET_DOWN_ENEMY, SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '517',
        any: [/CALL PARTY_DEL, SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '521-522',
        any: [/SIF TURNEND > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '523-563',
        any: [/ELSEIF CFLAG:\(ARG:0\):1 == 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '525-533',
        any: [/IF NO_BATTLE > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '528',
        any: [/PRINTW 因沒有敵人而自己进行了训练（经验值增加）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '536',
        any: [/CALL DUNGEON_PARTY_BATTLE, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '537-543',
        any: [/;陥落したか否か/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '539',
        any: [/PRINTFORML %SAVESTR:\(ARG:0\)%被抓住了…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '540',
        any: [/CFLAG:\(ARG:0\):507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '541',
        any: [/CALL PARTY_DEL, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '545-551',
        any: [/;仲間Aが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '547',
        any: [/PRINTFORML %SAVESTR:SIDEA%被抓住了…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '548',
        any: [/CFLAG:SIDEA:507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '549',
        any: [/CALL PARTY_DEL, SIDEA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '553-559',
        any: [/;仲間Bが陥落したかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '555',
        any: [/PRINTFORML %SAVESTR:SIDEB%被抓住了…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '556',
        any: [/CFLAG:SIDEB:507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '557',
        any: [/CALL PARTY_DEL, SIDEB/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '561-562',
        any: [/SIF TURNEND > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '564-588',
        any: [/;勇者と元勇者の戦闘/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '568-571',
        any: [/IF RESULT == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '569',
        any: [/CALL GET_DOWN_ENEMY, B/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '571',
        any: [/CALL PARTY_DEL, B/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '572-587',
        any: [/ELSEIF RESULT == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '574',
        any: [/CFLAG:\(ARG:0\):507 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '576-577',
        any: [/IF CFLAG:\(ARG:0\):505 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '579',
        any: [/CFLAG:\(ARG:0\):1 = 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '582-584',
        any: [/;NTRれたなら勇者討伐数を０に/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '585',
        any: [/CALL PARTY_DEL, ARG:0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '586', any: [/TARGET = -1/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '587', any: [/RETURN 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '591-603',
        any: [/IF CFLAG:\(ARG:0\):1 == 3 && FLAG:5 & 16 && CFLAG:MASTER:9 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '593',
        any: [/PRINTFORMW %SAVESTR:ARG%和怪物们进行了训练（经验值增加）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '596-597',
        any: [/SIF CFLAG:\(ARG:0\):500 == 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '598-602',
        any: [
          /ELSEIF CFLAG:\(ARG:0\):1 == 3 && CFLAG:\(ARG:0\):500 == 5 && CFLAG:MASTER:9 > 0/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '601',
        any: [/PRINTFORMW %SAVESTR:ARG%和怪物们进行了训练（经验值增加）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '605-627',
        any: [/;貞操帯のカギを探す/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '607', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '609-626',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '625',
        any: [/CFLAG:\(ARG:0\):50 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '629-634',
        any: [/;冒険の疲れ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '636-637',
        any: [/;状态判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '639-705',
        any: [/;帰還するかどうか/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '640-642',
        any: [/IF CFLAG:\(ARG:0\):507 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '643-700',
        any: [/;帰還フラグを立てる判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '646-666',
        any: [/IF SIDEA > 0 && SIDEB > 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '663-665', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '667-683',
        any: [/ELSEIF SIDEA > 0 \|\| SIDEB > 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '684-700', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '685-688',
        any: [/IF CFLAG:\(ARG:0\):534 >= 2 && TALENT:\(ARG:0\):10 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '685-696',
        any: [/IF CFLAG:\(ARG:0\):534 >= 2 && TALENT:\(ARG:0\):10 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '689-692',
        any: [/ELSEIF CFLAG:\(ARG:0\):534 >= 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '693-696',
        any: [
          /ELSEIF CFLAG:\(ARG:0\):534 == 4 && \(TALENT:\(ARG:0\):12 == 1 \|\| TALENT:\(ARG:0\):161 == 1 \)/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '702-704',
        any: [/;防止后退过度/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '706', any: [/NEXT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '708-718',
        any: [/;戦闘後探索/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '718',
        any: [/CALL DUNGEON_BITCH\(LOCAL\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '719',
        any: [/CALL GET_JUNK_ITEM\(LOCAL\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '721-731',
        any: [/;宝箱を見つける/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '723',
        any: [/CALL EQUIP_SELECT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '724-726',
        any: [/IF SIDEA > 0 && CFLAG:SIDEA:1 == 2 && RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '728-730',
        any: [/IF SIDEB > 0 && CFLAG:SIDEB:1 == 2 && RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '735-744',
        any: [/;アイテムの使用/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '736',
        any: [/CALL USE_EX_ITEM,"战斗后"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '739',
        any: [/CALL USE_EX_ITEM,"战斗后"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '743',
        any: [/CALL USE_EX_ITEM,"战斗后"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '748-753',
        any: [/;移動を反映/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '755-760',
        any: [/;階層を反映/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '762-849',
        any: [/;休憩フェイズ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '764-777',
        any: [/;勇者に紛れ込んだ奴隷が暗躍します/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '767',
        any: [/CALL KARMA, ARG:0, -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '769',
        any: [/CALL KARMA, SIDEB, -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '774',
        any: [/CALL KARMA, ARG:0, -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '776',
        any: [/CALL KARMA, SIDEA, -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '780-811',
        any: [/;装備効果\(キャンプ\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '816-836',
        any: [/;装備効果\(キャンプ禁止\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '841-849',
        any: [
          /IF CFLAG:\(ARG:0\):1 == 2 && CFLAG:\(ARG:0\):503 & 1 && FLOOR > 1/,
        ],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '843', any: [/PRINTL  /] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '844', any: [/DRAWLINE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '845',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%躲起来休息。/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '846', any: [/DRAWLINE/] },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '847', any: [/PRINTL /] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '850-851',
        any: [/SIF FLAG:5 & 32/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '852', any: [/TARGET = -1/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '856-1035',
        any: [/@CHECK_STATUS, ARG:0, MODE = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '878-880',
        any: [/IF CFLAG:ARG:533 == ARG/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '881-888', any: [/ELSE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '889-894',
        any: [/S1_HP = 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '895',
        any: [/varset STATUS/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '897-938',
        any: [/IF CFLAG:\(ARG:0\):1 == 2 \|\| CFLAG:\(ARG:0\):1 == 3/],
      },
      { src: 'target/ERB/迷宮/DUNGEON.ERB', ref: '899', any: [/SIF !MODE/] },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '903-907',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S1_MP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '908-912',
        any: [
          /ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S2_HP \|\| B/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '913-917',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S2_MP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '918-922',
        any: [
          /ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S3_HP && B/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '923-927',
        any: [/ELSEIF BASE:\(ARG:0\):0 \* 100 \/ MAXBASE:\(ARG:0\):0 < S3_HP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '928-932',
        any: [/ELSEIF BASE:\(ARG:0\):1 \* 100 \/ MAXBASE:\(ARG:0\):1 < S3_MP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '939-981',
        any: [/IF  SIDEA > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '982-1024',
        any: [/IF  SIDEB > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1026-1034',
        any: [/;队伍当前状态评级/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1035',
        any: [
          /RETURN STATUS,STATUS:1,STATUS:2,STATUS:3,STATUS:4,STATUS:5,STATUS:6,STATUS:7/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1041-1073',
        any: [/@GET_JUNK_ITEM,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1046',
        any: [
          /LOCAL = 100 \+ CFLAG:ARG:9 \* RAND:\(SQRT\(CFLAG:MASTER:9 \+ CFLAG:ARG:9 \+ 1\)\)/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1048-1050',
        any: [/;好奇心ボーナス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1051-1053',
        any: [/;金のためボーナス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1054-1059',
        any: [/;ホビットボーナス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1060-1062',
        any: [/;盗賊は収入が多い（1\.5倍）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1064',
        any: [/LOCAL \*= CFLAG:ARG:501/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1066-1067',
        any: [/SIF LOCAL < 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1069',
        any: [/PRINTFORML %SAVESTR:ARG%找到了价值\{LOCAL\}的财物。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1071',
        any: [/CFLAG:ARG:581 \+= LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1076-1091',
        any: [/@GET_DOWN_ENEMY,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1079-1083',
        any: [/IF CFLAG:\(ARG:0\):151 <= -150 && CFLAG:\(ARG:0\):1 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1084-1086',
        any: [/MONEY \+= CFLAG:\(ARG:0\):580 \/ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '1087-1089',
        any: [/CFLAG:\(ARG:0\):580 = 0/],
      },
      // #178 城镇真身接线（:294 CALL DUNGEON_TOWN 与 :581 调用点）
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '294',
        any: [/街でのイベント/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
