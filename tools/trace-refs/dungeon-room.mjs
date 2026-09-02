// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-room.mjs

export const FILES = [
  {
    js: 'ere/dungeon/dungeon-room.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '2-73',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '9-14',
        any: [/IF CFLAG:\(ARG:0\):1 == 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '14-22',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '16-18',
        any: [/SIF CFLAG:\(ARG:0\):1 != 2 \&\& CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '20-26',
        any: [/CALL DUNGEON_SHOP_ITEMSELL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '21',
        any: [/IF RAND:10 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '32-50',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '33-38',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '37',
        any: [/CALL CAMPAIGN_ROOM_EXTRA,CFLAG:\(ARG:0\):501/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '40',
        any: [/ROOMID = CFLAG:\(ARG:0\):501 \+ 349/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '40-48',
        any: [/ROOMID = CFLAG:\(ARG:0\):501 \+ 349/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '42-44',
        any: [/SIF FLAG:ROOMID <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '45',
        any: [/ROOM = FLAG:ROOMID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '46-48',
        any: [/EXTRA = FLAG:ROOMID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '55-71',
        any: [/CALL DUNGEON_FARM_RESCUE, EXTRA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '60',
        any: [/CALL DUNGEON_FARM_RESCUE, EXTRA/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '73', any: [/RETURN 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '76-141',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '82-84',
        any: [/;SHOP_2\.ERB@INTERCEPTにも必要な設定があります/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '87-89',
        any: [/SIF CFLAG:A:500 != 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '91',
        any: [/ROOMID = CFLAG:A:501 \+ 349/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '93-95',
        any: [/SIF FLAG:ROOMID <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '97-103',
        any: [/EXTRA = FLAG:ROOMID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '105',
        any: [/;確率を弄る場合ここのランダムを弄る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '107-111',
        any: [/FLAG:ROOMID \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '111',
        any: [/FLAG:ROOMID \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '111-122',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '112-116',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '116',
        any: [/FLAG:ROOMID \+= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '117-118',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '121-135',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '121-137',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '122', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '123-135',
        any: [/PRINTFORML %ITEMNAME:ROOM%进行了扩张！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '136',
        any: [/printformw %SAVESTR:A%的工作变为内职了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '139',
        any: [/CFLAG:A:500 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '141',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '145-167',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '151',
        any: [/FOR ROOMID, 350, 359/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '153',
        any: [/ROOM = FLAG:ROOMID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '155-156',
        any: [/EXTRA = FLAG:ROOMID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '159-163',
        any: [/CALL DUNGEON_SHOP_DAY, EXTRA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '160',
        any: [/CALL DUNGEON_SHOP_DAY, EXTRA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '162',
        any: [/CALL DUNGEON_FARM, EXTRA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '167',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '170-265',
        any: [
          /printformw %SAVESTR:A%在商店街尽情地大吃大喝…（体力\+20、气力\+50）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '173',
        any: [/;商店街。僅かながら現金収入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '174-175',
        any: [/;拡張\& 1=武具屋/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '178-189',
        any: [/PRINTFORML 是商店街型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '179', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '180-188',
        any: [/PRINTFORML 是商店街型地下城/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '191',
        any: [/COST = \(CFLAG:A:9 \* 5\)\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '193-218',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '196',
        any: [/printformw %SAVESTR:A%找到了武器店…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '199',
        any: [/COST = \(CFLAG:A:9 \* 8\)\+20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '203',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '208',
        any: [/CALL ADD_EX_ITEM, \-2, A, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '210',
        any: [/PRINTFORMW 现金收入\+\{COST\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '213',
        any: [/MONEY \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '214',
        any: [/EX_FLAG:4444 \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '215',
        any: [/CFLAG:A:580 \-= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '219-244',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '222',
        any: [/printformw %SAVESTR:A%找到了道具店…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '225',
        any: [/COST = \(CFLAG:A:9 \* 6\)\+20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '229',
        any: [/printformw %SAVESTR:A%带的钱不够，眼巴巴地看着橱窗发愁……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '234',
        any: [/CALL ADD_EX_ITEM, \-3, A, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '236',
        any: [/printformw 现金收入\+\{COST\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '239',
        any: [/MONEY \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '240',
        any: [/EX_FLAG:4444 \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '241',
        any: [/CFLAG:A:580 \-= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '247-252',
        any: [/printformw %SAVESTR:A%带的钱不够，在商店街边走边叹气……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '249',
        any: [/printformw %SAVESTR:A%带的钱不够，在商店街边走边叹气……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '254',
        any: [/MONEY \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '255',
        any: [/EX_FLAG:4444 \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '256',
        any: [/CFLAG:A:580 \-= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '257',
        any: [/BASE:A:0 \+= 20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '258',
        any: [/BASE:A:1 \+= 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '261',
        any: [
          /printformw %SAVESTR:A%在商店街尽情地大吃大喝…（体力\+20、气力\+50）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '262',
        any: [/printformw 现金收入\+\{COST\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '265',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '268-325',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '271-272',
        any: [
          /;不思議のダンジョン系で床にアイテム置いて売ってるやつのイメージ/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '275-279',
        any: [/COST = \(CFLAG:A:9 \* 6\)\+50/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '282', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '283',
        any: [
          /PRINTFORML %SAVESTR:A%发现了一间不可思议的房间，里面有着陈列架和柜台，正在卖着东西……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '286-293',
        any: [
          /PRINTFORMW 很反感魔王的%SAVESTR:A%从店主处拿到了赞助……（资金\+500）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '289',
        any: [
          /PRINTFORMW 很反感魔王的%SAVESTR:A%从店主处拿到了赞助……（资金\+500）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '291',
        any: [/JUEL:A:100 \-= 500/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '292',
        any: [/CFLAG:A:580 \+= 500/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '295-302',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '298',
        any: [
          /PRINTFORMW 很讨厌魔王的%SAVESTR:A%从店主处获得了力量……（经验值\+\{MARK:A:3 \* 1000\}）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '300',
        any: [/EXP:A:80 \+= MARK:A:3 \* 1000/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '301',
        any: [/MARK:A:3 \-= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '304-305',
        any: [/CALL SELL_EX_ITEM,A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '307-312',
        any: [/PRINTFORML %SAVESTR:A%带的钱不够，眼巴巴地在店里转了一圈……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '309',
        any: [/PRINTFORML %SAVESTR:A%带的钱不够，眼巴巴地在店里转了一圈……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '314-322',
        any: [/SIF FLAG:5 \& 32 \&\& RESULT > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '316',
        any: [/PRINTFORML 现金收入\+\{COST\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '319',
        any: [/MONEY \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '320',
        any: [/EX_FLAG:4444 \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '321',
        any: [/CFLAG:A:580 \-= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '325',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '328-368',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '331-337',
        any: [/INCOME = CFLAG:0:9 \* \(RAND:10 \+ 5\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '332-333',
        any: [/;拡張\& 1=武具屋/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '335',
        any: [/INCOME = CFLAG:0:9 \* \(RAND:10 \+ 5\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '337-341',
        any: [/INCOME \+= CFLAG:0:9 \+ 20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '342-361',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '343',
        any: [/PRINTL 威望值是【岌岌可危】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '343-363',
        any: [/ELSEIF EX_FLAG:99 <= 100 \&\& EX_FLAG:99 > 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '344',
        any: [/INCOME = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '346',
        any: [/PRINTL 威望值是【动荡不安】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '347',
        any: [/PRINTW 収入减少/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '348-349',
        any: [/INCOME \/= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '351',
        any: [/PRINTl 威望值是【略受质疑】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '352-353',
        any: [/INCOME \*= 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '355',
        any: [/PRINTl 威望值是【相安无事】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '356-357',
        any: [/INCOME \*= 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '359',
        any: [/PRINTl 威望值是【广受爱戴】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '360',
        any: [/INCOME \*= 2/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '362', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '363',
        any: [/printformw 从商店街征收了今天的税金。（现金收入\+\{INCOME\}）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '365',
        any: [/MONEY \+= INCOME/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '366',
        any: [/EX_FLAG:4444 \+= INCOME/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '368',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '371-414',
        any: [/printformw %SAVESTR:A%走在毒沼中………（\{DMG\}点伤害！）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '374',
        any: [/;沼地。機能していないようなので毒沼に変更/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '379-390',
        any: [/PRINTFORML 是毒沼型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '380', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '386',
        any: [/print ：毒草/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '392',
        any: [/DMG = CFLAG:0:9 \+ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '394-397',
        any: [/DMG \+= CFLAG:A:9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '399-402',
        any: [/DMG \+= FLAG:85 \* 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '404',
        any: [/BASE:A:0 \-= DMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '406-408',
        any: [/SIF BASE:A:0 < 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '411',
        any: [/printformw %SAVESTR:A%走在毒沼中………（\{DMG\}点伤害！）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '414',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '417-648',
        any: [
          /PRINTFORML 人类牧场的肉便器生了\{FLAG:83\}只%ITEMNAME:MON_ID%。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '424',
        any: [/;怪物が増える。ターン終了時効果/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '428-430',
        any: [/SIF FLAG:83 <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '429-430',
        any: [/SIF FLAG:83 <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '432',
        any: [/;20160524改変/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '434-437',
        any: [/SELL_BABY = RESULT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '439-440',
        any: [/CALL RAND_MONSTER_NUMBER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '439-449',
        any: [/ELSEIF MON_NUM \+ FLAG:83 > 999/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '441',
        any: [/MON_NUM = ITEM:MON_ID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '443',
        any: [/MONEY \+= FLAG:83 \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '444',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '445-446',
        any: [/ELSEIF MON_NUM \+ FLAG:83 > 999/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '448',
        any: [/MON_NUM \+= FLAG:83/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '451-461',
        any: [
          /PRINTW 监督的淫魔温柔地催促着，俘虏少年将充满年轻气息的浓厚精液注入了肉便器……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '453',
        any: [/PRINTL 「播种的大叔们好好努力让便器们怀孕啊\~」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '454',
        any: [
          /PRINTW 监督的淫魔踹着俘虏中年的腰，中年将腥臭的精液大量注入了肉便器……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '456',
        any: [
          /PRINTL 「小鸡鸡奴隶少年们，加把劲啊。把分配的播种任务完成就行了。」/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '457',
        any: [
          /PRINTW 监督的淫魔温柔地催促着，俘虏少年将充满年轻气息的浓厚精液注入了肉便器……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '459',
        any: [/PRINTL 「怀孕吧！　怀上吧！　啊哈哈哈，怀孕吧！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '460',
        any: [/PRINTW 扶她淫魔的媚药精液不断地注入肉便器中……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '463-620',
        any: [/ELSEIF FLAG:83 > 80  \&\& RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '464-465',
        any: [/SIF LOCAL:0 >= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '470-471',
        any: [/;1の位はランダムパターン/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '473-480',
        any: [/ELSEIF ARG:0 \& 2 \&\& RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '482-493',
        any: [/ELSEIF FLAG:83 > 80  \&\& RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '495-616',
        any: [/PRINT 「求求你们放过我吧……已经…不想再生…不想再生啦！……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '495-618',
        any: [/PRINT 「求求你们放过我吧……已经…不想再生…不想再生啦！……」/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '618', any: [/PRINT/] },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '622', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '624-625',
        any: [
          /PRINTFORML 人类牧场的肉便器生了\{FLAG:83\}只%ITEMNAME:MON_ID%。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '627',
        any: [/SIF LOG_OFF == 0 \&\& SELL_BABY == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '627-630',
        any: [
          /PRINTFORML 将人类牧场的肉便器生下的孩子卖了\{FLAG:83 \* 10\}G。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '628',
        any: [
          /PRINTFORML 将人类牧场的肉便器生下的孩子卖了\{FLAG:83 \* 10\}G。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '629',
        any: [/MONEY \+= FLAG:83 \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '629-630',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '630',
        any: [/EX_FLAG:4444 \+= FLAG:83 \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '631-636',
        any: [/PRINTFORML 出售从肉便器挤出的乳汁得到了\{FLAG:83\}G。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '634',
        any: [/MONEY \+= FLAG:83/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '635',
        any: [/EX_FLAG:4444 \+= FLAG:83/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '638-642',
        any: [
          /PRINTFORML 原本是勇者的扶她奴隶侵犯着肉便器，淫欲转化成了\{FLAG:83\}经验值。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '641',
        any: [/EXP:0:80 \+= FLAG:83/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '644-645',
        any: [/SIF LOG_OFF == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '647',
        any: [/ITEM:MON_ID = MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '650',
        any: [/@DUNGEON_FARM_RESCUE, ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '650-680',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '653-654',
        any: [/;拡張\& 2=扶她種付け奴隷/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '656-667',
        any: [/PRINTFORML 是人类牧场型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '657', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '669-671',
        any: [/SIF FLAG:83 <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '674',
        any: [/PRINTFORMW 勇者发现了一个可悲的肉便器，并且将其解放。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '677',
        any: [/SIF CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '677-678',
        any: [/SIF CFLAG:\(ARG:0\):1 != 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '680',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '683-735',
        any: [
          /printform %SAVESTR:A%在冰室的严寒中哆嗦着身体………（攻击力下降一成！）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '686',
        any: [/;勇者の攻撃力が1割下がる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '691-702',
        any: [/PRINTFORML 是冰封型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '692', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '704',
        any: [/MDMG = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '706-714',
        any: [/IF CFLAG:A:LOCAL > 0 \&\& FLAG:5 \& 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '709-711',
        any: [/CALL EX_ITEM_NAME,CFLAG:A:LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '713',
        any: [/CFLAG:A:LOCAL = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '716-718',
        any: [/CFLAG:A:11 \/= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '720-722',
        any: [/MDMG \+= CFLAG:0:9 \+ 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '724',
        any: [/BASE:A:1 \-= MDMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '727-729',
        any: [
          /printform %SAVESTR:A%在冰室的严寒中哆嗦着身体………（攻击力下降一成！）/,
        ],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '730', any: [/PRINTW/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '735',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '738-801',
        any: [
          /PRINTFORML %SAVESTR:A%由于热砂的暑气，集中力下降了……（防御力下降一成！）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '741',
        any: [/;勇者の防御力が1割下がる/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '746-757',
        any: [/PRINTFORML 是灼热型的地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '747', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '759-776',
        any: [/PRINTFORML 发现了绿洲………（气力50回复！亲密度上升！）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '763',
        any: [/BASE:A:1 \+= 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '764-765',
        any: [/SIF BASE:A:1 > MAXBASE:A:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '768',
        any: [/PRINTFORML 发现了绿洲………（气力50回复！亲密度上升！）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '769',
        any: [/PRINTFORMW 屈服点数\+\{CFLAG:0:9 \* 4\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '772-773',
        any: [/JUEL:TARGET:6 \+= CFLAG:0:9 \* 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '775',
        any: [/RETURN 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '778', any: [/DMG = 0/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '780-781',
        any: [/CFLAG:A:12 \/= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '783-785',
        any: [/DMG \+= CFLAG:0:9 \+ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '787',
        any: [/BASE:A:0 \-= DMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '789-791',
        any: [/SIF BASE:A:0 < 1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '794', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '795-797',
        any: [
          /PRINTFORML %SAVESTR:A%由于热砂的暑气，集中力下降了……（防御力下降一成！）/,
        ],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '798', any: [/PRINTW/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '801',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '804-846',
        any: [
          /;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '807',
        any: [/;たまに迷う/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '812-823',
        any: [/PRINTFORML 是迷宫型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '813', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '825-830',
        any: [/SIF ARG:0 \& 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '832-833',
        any: [/SIF RAND:3 < 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '835',
        any: [/D:20 \-= BACK/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '838',
        any: [/printformw %SAVESTR:A%在迷宫里迷路了………/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '840',
        any: [/printform 突然发现走了回头路！/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '841', any: [/PRINTW/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '844',
        any: [/CFLAG:A:509 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '846',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '849-912',
        any: [
          /PRINTFORML %SAVESTR:A%看到了勇者们変成的装饰品，发自内心地颤抖着………（气力\-\{MDMG\}）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '853',
        any: [/;石像と剥製の数に応じて最大1\/4気力が減る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '859-870',
        any: [/PRINTFORML 是博物馆型地下城/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '860', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '872-874',
        any: [/SIF FLAG:84 <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '876-880',
        any: [/MDMG = FLAG:84 \* 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '882-883',
        any: [/SIF MDMG > \(MAXBASE:A:1 \/ 4\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '886',
        any: [
          /PRINTFORML %SAVESTR:A%看到了勇者们変成的装饰品，发自内心地颤抖着………（气力\-\{MDMG\}）/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '888',
        any: [/PRINTFORML 用牺牲者制作成的魔像发起了攻击！（\{DMG\}伤害！）/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '889', any: [/PRINTW/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '892-902',
        any: [/PRINTFORMW 远程攻击被柜子妨碍……（无法先发制人）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '895',
        any: [/PRINTFORMW 远程攻击被柜子妨碍……（无法先发制人）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '898',
        any: [/PRINTL 已经无法先发制人了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '900',
        any: [/CFLAG:A:503 \+= 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '904',
        any: [/BASE:A:1 \-= MDMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '905-906',
        any: [/BASE:A:0 \-= DMG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '908-910',
        any: [/SIF BASE:A:0 < 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '912',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '915-1013',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '919',
        any: [/;娼館街。性癖に合致すれば高額収入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '925-936',
        any: [/PRINTFORML 来到了娼馆街的迷宫/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB', ref: '926', any: [/PRINTL/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '938-963',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '939-963',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '946-948',
        any: [/SIF CFLAG:A:151 < \-20 \&\& TALENT:A:0 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '949-951',
        any: [/SIF CFLAG:A:151 < 0 \&\& ABL:A:22 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '952-954',
        any: [/SIF CFLAG:A:151 < 30 \&\& TALENT:A:121/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '955-957',
        any: [/SIF CFLAG:A:151 < 10 \&\& TALENT:A:122/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '958-960',
        any: [/SIF TALENT:A:143/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '961-963',
        any: [/SIF TALENT:A:142/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '965-970',
        any: [/printformw %SAVESTR:A%面露厌恶的穿过了街道…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '967',
        any: [/printformw %SAVESTR:A%面露厌恶的穿过了街道…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '972',
        any: [/COST = \(CFLAG:A:9 \* 8\)\+150/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '974-978',
        any: [/TIMES COST, 1\.1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '980-985',
        any: [/PRINTFORMW %SAVESTR:A%带的钱好像不够了…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '982',
        any: [/PRINTFORMW %SAVESTR:A%带的钱好像不够了…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '987-1006',
        any: [/printform %SAVESTR:A%在娼馆街和/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1005',
        any: [/PRINTFORMW 现金收入\+\{COST\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1008',
        any: [/MONEY \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1009',
        any: [/EX_FLAG:4444 \+= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1010',
        any: [/CFLAG:A:580 \-= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1011',
        any: [/CALL KARMA, A, \-1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_ROOM.ERB',
        ref: '1013',
        any: [/RETURN 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
