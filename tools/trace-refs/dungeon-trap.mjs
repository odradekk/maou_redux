// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-trap.mjs

export const FILES = [
  // —— #176 H7 陷阱：ere/dungeon/dungeon-trap.js。锚 = 所引区间首个非空行的原文 ——
  {
    js: 'ere/dungeon/dungeon-trap.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '2-193',
        any: [/@DUNGEON_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '776',
        any: [/EXP:A:40 \+= 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '807',
        any: [/EXP:A:40 \+= 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '3-13',
        any: [/\#DIM\ TRAP_COUNT/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '3-15',
        any: [/@诈骗陷阱/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '3-231',
        any: [/@诈骗陷阱/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '5-14',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '14-22',
        any: [/;A・ARG:0が攻略中のキャラ（リーダー）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '15-16',
        any: [/SIF\ D:4\ <=\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '16-86',
        any: [/@诈骗剧情1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '18',
        any: [/FOR\ TRAP_COUNT,\ 0,\ D:4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '20-21',
        any: [/SIF\ CFLAG:A:1\ ==\ 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '24-25',
        any: [/SIF\ CFLAG:A:1\ !=\ 2\ \&\&\ CFLAG:A:1\ !=\ 12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '27-31',
        any: [
          /;FLAG:TRAP_NUMは各階層の陷阱ABCに何の陷阱が設置されているかのフラグになる/,
        ],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '33-49',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '34-39',
        any: [/TRAP_NUM\ =\ CFLAG:A:501\ \+\ 299/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '42-49',
        any: [/IF\ TRAP_ID\ <\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '50-66',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '51',
        any: [/\$TRAP_LOOP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '53',
        any: [/TRAP_ID\ =\ FLAG:TRAP_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '53-57',
        any: [/TRAP_ID\ =\ FLAG:TRAP_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '60-69',
        any: [/IF\ TRAP_ID\ <\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '67-83',
        any: [/ELSEIF\ \ CFLAG:A:151\ >\ \-50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '68',
        any: [/RETURN\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '73',
        any: [/RESULT\ =\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '76-80',
        any: [/SIF\ CFLAG:A:513\ ==\ TRAP_ID/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '84',
        any: [/CFLAG:A:513\ =\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '84-86',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '87-88',
        any: [/SIF\ CFLAG:A:512\ <\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '87-188',
        any: [/@诈骗剧情2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '91',
        any: [/TRAP_MISS\ =\ 20\ \-\ \ CFLAG:A:512/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '94',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '94-95',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '94-155',
        any: [/IF\ ITEM:TRAP_ID\ <\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '96-100',
        any: [/ELSEIF\ TRAP_MISS\ <\ RAND:20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '102',
        any: [/CALL\ PIT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '104',
        any: [/CALL\ ARROW_TRAP/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '105-131',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '106',
        any: [/CALL\ TELEPORT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '108',
        any: [/CALL\ ONE_WAY_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '110',
        any: [/CALL\ LOVE_GAS_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '112',
        any: [/CALL\ SYOKUSYU_FLOOR_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '114',
        any: [/CALL\ LOVE_BATH_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '116',
        any: [/CALL\ SELF_SAIMIN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '118',
        any: [/CALL\ IMITATER_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '120',
        any: [/CALL\ SUMMON_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '122',
        any: [/CALL\ SUCCUBUS_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '124',
        any: [/CALL\ SLIME_ROOM_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '126',
        any: [/CALL\ NET_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '128',
        any: [/CALL\ SHOP_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '130',
        any: [/CALL\ BLACKOUT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '132',
        any: [/CALL\ SHOOT_TRAP/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '132-158',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '134',
        any: [/CALL\ DISPELL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '136',
        any: [/CALL\ OIL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '138',
        any: [/CALL\ FIRE_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '140',
        any: [/CALL\ A_WORM_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '142',
        any: [/CALL\ LOVE_BUG_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '144',
        any: [/CALL\ DARK_JUEL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '146',
        any: [/CALL\ DEF_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '148',
        any: [/CALL\ ATK_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '150',
        any: [/CALL\ MAG_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '152',
        any: [/CALL\ ALL_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '153-154',
        any: [/ELSEIF\ TRAP_ID\ ==\ 87/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '154',
        any: [/CALL\ 诈骗陷阱/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '159-185',
        any: [/ELSEIF\ \ CFLAG:A:151\ >\ \-50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '160',
        any: [/TRAP_NOUSE\ =\ RESULT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '162-163',
        any: [
          /SIF\ TRAP_ID\ >=\ 60\ \&\&\ TRAP_ID\ <=\ 89\ \&\&\ ITEM:TRAP_ID\ >\ 0\ \&\&\ TRAP_NOUSE\ ==\ 0\ \&\&\ CFLAG:A:1\ ==\ 2/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '166-167',
        any: [/SIF\ TRAP_NOUSE\ ==\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '170-178',
        any: [
          /IF\ FLAG:5\ \&\ 64\ \&\&\ TRAP_NOUSE\ ==\ 0\ \&\&\ CFLAG:A:1\ ==\ 2/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '180-184',
        any: [/TRAP_NUM\ \+=\ 10/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '186-188',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '189-231',
        any: [/@诈骗剧情3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '191',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '196-262',
        any: [/@PIT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '196-1420',
        any: [/@PIT_TRAP/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '201-205',
        any: [/IF\ CFLAG:A:151\ >\ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '201-210',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '206-210',
        any: [/ELSEIF\ CFLAG:A:151\ >\ 0/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '211-215',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '212',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '214-224',
        any: [/IF\ TALENT:A:314\ ==\ 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '226-229',
        any: [/IF\ DICE\ <\ 10/],
      },
      {
        src: 'target/ERB/魔改新增/诈骗陷阱.ERB',
        ref: '228-231',
        any: [/MONEY\ \+=\ COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '230-240',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '241-250',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '253-257',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '259-260',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '265-310',
        any: [/@ARROW_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '270-271',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '273-274',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '276-279',
        any: [/IF\ Z\ <\ 30/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '280-292',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '283',
        any: [/PRINTFORML\ %SAVESTR:A%的要害被射中了，受到\{DICE\}点伤害！/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '284',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '286',
        any: [
          /PRINTFORML\ 箭矢插的很深，%SAVESTR:A%被追加了\{DICE\}点的伤害！/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '293-304',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '296',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '298',
        any: [
          /PRINTFORML\ 箭矢插的很深，%SAVESTR:A%被追加了\{FLAG:85\ \*\ 10\}点的伤害！/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '307-308',
        any: [/;\ SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '313-354',
        any: [/@TELEPORT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '318-319',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '321',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '323-326',
        any: [/IF\ Z\ >\ 70/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '327-331',
        any: [/ELSEIF\ Z\ <\ 20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '330',
        any: [/D:20\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '331',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '332-337',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '335',
        any: [/D:20\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '336',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '339-343',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '345-349',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '351-352',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '357-403',
        any: [/@ONE_WAY_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '361-365',
        any: [/IF\ D:20\ <\ 40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '368-375',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '378',
        any: [/Z\ =\ RAND:3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '380-383',
        any: [/IF\ Z\ >\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '384-392',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '388',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON.ERB',
        ref: '390-413',
        any: [/;陷阱処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '394-398',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '400-401',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '406-459',
        any: [/@LOVE_GAS_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '411-412',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '414',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '416-419',
        any: [/IF\ Z\ >\ 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '420-428',
        any: [/ELSEIF\ Z\ <\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '429-437',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '440-451',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '453-454',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '457',
        any: [/SETBIT\ CFLAG:A:503,\ 9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '462-521',
        any: [/@SYOKUSYU_FLOOR_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '468-475',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '478',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '480-483',
        any: [/IF\ Z\ >\ 70/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '484-494',
        any: [/ELSEIF\ Z\ <\ 15/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '495-505',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '508-519',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '525-581',
        any: [/@LOVE_BATH_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '530-537',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '540',
        any: [/IF\ RAND:10\ <\ 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '541-551',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '552-562',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '565-576',
        any: [/IF\ TALENT:A:60\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '579',
        any: [/SETBIT\ CFLAG:A:503,\ 9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '585-632',
        any: [/@SELF_SAIMIN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '590-591',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '593-594',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '594',
        any: [/TARGET\ =\ A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '597-598',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 9\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '600-603',
        any: [/IF\ DICE\ >\ 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '604-616',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '611',
        any: [/CALL\ COM3_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '617-630',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '624',
        any: [/CALL\ COM3_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '635-708',
        any: [/@IMITATER_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '639',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '642-651',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '653-656',
        any: [/IF\ Z\ >\ 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '657-680',
        any: [/ELSEIF\ Z\ <\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '681-705',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '711-737',
        any: [/@SUMMON_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '715-716',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '718',
        any: [/Z\ =\ RAND:2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '720-723',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '725-727',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '729',
        any: [/CALL\ SUMMON_MONSTER,\ \-1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '731-735',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '740-823',
        any: [/@SUCCUBUS_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '745-748',
        any: [/IF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '750',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '753-754',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 9\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '756-759',
        any: [/IF\ DICE\ >\ 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '760-789',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '790-820',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '826-887',
        any: [/@SLIME_ROOM_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '831-832',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '832',
        any: [/TARGET\ =\ A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '836-844',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '846-849',
        any: [/IF\ DICE\ >\ 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '850-862',
        any: [/ELSEIF\ DICE\ <\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '863-877',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '880-883',
        any: [/;ローション自動調教/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '882',
        any: [/CALL\ COM50_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '885',
        any: [/SETBIT\ CFLAG:A:503,\ 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '890-918',
        any: [/@NET_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '894',
        any: [/LOCAL\ =\ 10\ \+\ FLAG:85\ \*\ 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '896-898',
        any: [/;気力最大値によるキャップ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '900-902',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '904-913',
        any: [/IF\ TALENT:0:328/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '915-916',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '921-965',
        any: [/@SHOP_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '927-928',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '930',
        any: [/COST\ =\ RAND:\(CFLAG:A:9\ \/10\ \+\ 5\)\ \*\ 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '932-935',
        any: [/IF\ COST\ ==\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '938-939',
        any: [/COST\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '941-946',
        any: [/IF\ CFLAG:A:580\ <\ COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '948-949',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '951-954',
        any: [/MONEY\ \+=\ COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '953',
        any: [/;CFLAG:A:580\ \-=\ COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '957-959',
        any: [/BASE:A:0\ \+=\ COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '960-961',
        any: [/;気力の回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '962-963',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '969-1007',
        any: [/@BLACKOUT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '974-975',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '977',
        any: [/DICE\ =\ RAND:3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '979-982',
        any: [/IF\ DICE\ ==\ 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '983-994',
        any: [/ELSEIF\ DICE\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '995-1004',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1011-1081',
        any: [/@SHOOT_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1015-1019',
        any: [/IF\ D:20\ <\ 40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1022-1031',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1034',
        any: [/Z\ =\ RAND:3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1036-1039',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1042-1043',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1044-1052',
        any: [/IF\ CFLAG:A:501\ ==\ 9/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1052',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1053-1064',
        any: [/ELSEIF\ CFLAG:A:501\ ==\ 8/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1063',
        any: [/CALL PARTY_DEL, A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1071',
        any: [/CALL PARTY_DEL, A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1064',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1065-1072',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1072',
        any: [/D:1\ =\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1075-1079',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1085-1118',
        any: [/@DISPELL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1089-1090',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1092',
        any: [/Z\ =\ RAND:2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1094-1097',
        any: [/IF\ Z\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1100-1101',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1103-1110',
        any: [/IF\ CFLAG:A:503\ \&\ 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1112-1116',
        any: [/IF\ FLAG:85\ >\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1121-1147',
        any: [/@OIL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1125-1126',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1128',
        any: [/Z\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1130-1133',
        any: [/IF\ Z\ <\ 30/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1134-1144',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1143',
        any: [/CFLAG:A:503\ \+=\ 8/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1150-1178',
        any: [/@FIRE_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1155-1156',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1158',
        any: [/DICE\ =\ RAND:200/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1160-1163',
        any: [/IF\ DICE\ <\ 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1164-1173',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1169',
        any: [/IF\ CFLAG:A:503\ \&\ 8/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1181-1229',
        any: [/@A_WORM_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1186-1187',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1189',
        any: [/DICE\ \ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1191-1193',
        any: [/;ヌルヌル状態で威力アップ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1195-1198',
        any: [/IF\ DICE\ <\ 35/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1201-1202',
        any: [/SIF\ GETBIT\(CFLAG:A:503,\ 3\)\ \&\&\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1204-1207',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 7\ \+\ 30/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1209-1223',
        any: [/;A経験が多いと、中に入られてしまう/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1211-1214',
        any: [/SETCOLORBYNAME\ LightSalmon/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1217',
        any: [/PLAYER\ =\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1218',
        any: [/TARGET\ =\ A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1225-1227',
        any: [/EXP:A:1\ \+=\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1232-1292',
        any: [/@LOVE_BUG_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1237-1244',
        any: [/IF\ CFLAG:A:503\ \&\ 64/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1246',
        any: [/DICE\ =\ RAND:100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1248-1258',
        any: [/IF\ TALENT:A:314\ ==\ 6/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1257',
        any: [/RETURN\ 01/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1260-1263',
        any: [/IF\ DICE\ <\ 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1264-1268',
        any: [/ELSEIF\ DICE\ >=\ 80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1269-1272',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1276-1277',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1279',
        any: [/PLAYER\ =\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1280',
        any: [/TARGET\ =\ A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1283',
        any: [/CALL\ COM0_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1286-1290',
        any: [/IF\ TALENT:A:10\ ==\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1295-1346',
        any: [/@DARK_JUEL_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1300-1301',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1303',
        any: [/DICE\ =\ RAND:5\ \*\ 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1305-1307',
        any: [/;カルマが高いと誘惑に打ち勝つ判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1309-1312',
        any: [/IF\ DICE\ ==\ 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1315-1316',
        any: [/DICE\ \+=\ FLAG:85\ \*\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1318-1332',
        any: [/;好奇心ボーナス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1334-1335',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1337',
        any: [/CFLAG:A:581\ \+=\ DICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1339-1341',
        any: [/JUEL:A:6\ \+=\ DICE\ \/\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1344',
        any: [/CALL\ KARMA,\ A,\ \-1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1349-1364',
        any: [/@DEF_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1354-1355',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1357',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1359-1360',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1362',
        any: [/CFLAG:A:680\ \+=\ DICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1367-1382',
        any: [/@ATK_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1372-1373',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1375',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1377-1378',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1380',
        any: [/CFLAG:A:681\ \+=\ DICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1385-1400',
        any: [/@MAG_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1390-1391',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1393',
        any: [/DICE\ =\ RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\ \+\ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1395-1396',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1398',
        any: [/CFLAG:A:682\ \+=\ DICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1403-1420',
        any: [/@ALL_DOWN_TRAP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1408-1409',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1411',
        any: [
          /DICE\ =\ \(RAND:\(FLAG:85\ \+\ 1\)\ \+\ RAND:20\)\ \/\ 2\ \+\ 1/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1413-1414',
        any: [/SIF\ FLAG:5\ \&\ 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1416-1418',
        any: [/CFLAG:A:680\ \+=\ DICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1422-1457',
        any: [/@SLAVE_TRAP_SET/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1427-1428',
        any: [/SIF\ CFLAG:A:500\ !=\ 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1430',
        any: [/LOCAL\ =\ CFLAG:A:501\ \+\ 299/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1432',
        any: [/\$TRAP_LOOP_2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1434',
        any: [/LOCAL:1\ =\ FLAG:LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1438-1440',
        any: [/;補充/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1442-1449',
        any: [/IF\ ITEM:\(LOCAL:1\)\ >=\ 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1452-1455',
        any: [/LOCAL\ \+=\ 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1460-1520',
        any: [/@TRAP_PRICE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1465-1518',
        any: [/SIF\ P\ ==\ 60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TRAP.ERB',
        ref: '1520',
        any: [/RETURN\ 100/],
      },
      // #178：DUNGEON_TOWN.ERB:645/:652（宴会风俗的爱抚自动调教）复用本域内存根
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '645',
        any: [/CALL COM0_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '652',
        any: [/CALL COM0_AUTO/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
