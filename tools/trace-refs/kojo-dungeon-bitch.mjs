// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-bitch.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-dungeon-bitch.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '3-50',
        any: [/^\s*@DUNGEON_BITCH\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '10-11',
        any: [/^\s*RETURN 0/m],
      },
      { src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB', ref: '11', any: [/^$/m] },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '12-13',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", "D/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '16-23',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '20-21',
        any: [/^\s*RETURN 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '22',
        any: [/^\s*RETURN 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '25-31',
        any: [/^\s*IF CFLAG:ARG:120/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '27',
        any: [/^\s*IF RAND:\(SEIKOU \+ SIPPAI\) < SEIKOU/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '28',
        any: [/^\s*CALL LOG_TRY_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '29',
        any: [/^\s*CALL SELL_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '33-37',
        any: [/^\s*IF RAND\(1, 16\) < ABL:ARG:39/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '36',
        any: [/^\s*CALL DUNGEON_ANIMAL\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '39-43',
        any: [/^\s*IF RAND:36 <= ABL:ARG:11 \+ ABL:ARG:31 \+ /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '42',
        any: [/^\s*CALL SELF_BITCH\(ARG, "DUNGEON"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '45-47',
        any: [/^\s*SIF CFLAG:ARG:500 == 0 && CFLAG:ARG:1 ==/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '47',
        any: [/^\s*CALL DUNGEON_WORK\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '53-82',
        any: [/^\s*@HEROINE_BITCH\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '59-61',
        any: [/^\s*SIF BASE:ARG:0 < 300 \|\| BASE:ARG:1 < 100/m],
      },
      { src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB', ref: '61', any: [/^$/m] },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '62-63',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", "T/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '66-72',
        any: [/^\s*IF  CFLAG:ARG:120/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '70',
        any: [/^\s*CALL LOG_TRY_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '71',
        any: [/^\s*CALL SELL_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '75-77',
        any: [/^\s*SIF CFLAG:ARG:582 < -10000 && !TALENT:AR/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '77',
        any: [/^\s*CALL 强制肉偿\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '78-81',
        any: [/^\s*IF RAND:36 <= ABL:ARG:11 \+ ABL:ARG:31 \+ /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '81',
        any: [/^\s*CALL SELF_BITCH\(ARG, "TOWN"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '97-329',
        any: [/^\s*@SELL_BITCH\(ARG, PLACE\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '98-112',
        any: [/^\s*#LOCALSIZE 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '113',
        any: [/^\s*KYAKU = FI_CULC_BITCH\(ARG, "KYAKU", PLAC/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '115',
        any: [/^\s*IF KYAKU/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '116-119',
        any: [/^\s*VARSET PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '122-128',
        any: [/^\s*FOR LCOUNT, 0, 100/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '124',
        any: [/^\s*PREV_EXP:LCOUNT = EXP:ARG:LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '127',
        any: [/^\s*PREV_JUEL:LCOUNT = JUEL:ARG:LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '129',
        any: [/^\s*PREV_KARMA = CFLAG:ARG:151/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '131-141',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '132',
        any: [/^\s*SETBIT CHECK, 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '135',
        any: [/^\s*PREV_MONEY = CFLAG:ARG:580/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '137',
        any: [/^\s*PREV_MONEY = MONEY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '140',
        any: [/^\s*PREV_MONEY = CFLAG:ARG:580/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '143-188',
        any: [/^\s*FOR LCOUNT, 0, KYAKU/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '145-146',
        any: [/^\s*SEIKOU = FI_CULC_BITCH\(ARG, "SEIKOU", PL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '148-150',
        any: [/^\s*SIF RAND:\(SEIKOU \+ SIPPAI\) >= SEIKOU/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '149',
        any: [/^\s*CONTINUE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '151-152',
        any: [/^\s*LOCAL = FI_TRY_BITCH\(ARG, PLACE\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '156-157',
        any: [/^\s*SIF !LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '157',
        any: [/^\s*CONTINUE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '158-159',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LOCAL\)%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '161-163',
        any: [/^\s*SIF !FI_CULC_BITCH\(ARG, "ABLE", LOCALS\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '163',
        any: [/^\s*CONTINUE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '165-169',
        any: [/^\s*PLAY = FI_CULC_BITCH\(ARG, "PLAY", LOCALS/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '167',
        any: [/^\s*PLAY = FI_CULC_BITCH\(ARG, "PLAY", LOCALS/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '169',
        any: [/^\s*SETBIT CHECK, LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '170-186',
        any: [/^\s*CALL PROFIT_BITCH\(ARG, PLACE, LOCALS, PL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '172',
        any: [/^\s*CALL PROFIT_BITCH\(ARG, PLACE, LOCALS, PL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '175-178',
        any: [/^\s*CASE 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '177',
        any: [/^\s*MAN:MAN \+\+/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '178',
        any: [/^\s*SETBIT CHECK, \(10 \+ MAN\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '180-183',
        any: [/^\s*CASE 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '182',
        any: [/^\s*GIRL:GIRL \+\+/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '183',
        any: [/^\s*SETBIT CHECK, \(20 \+ GIRL\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '186',
        any: [/^\s*CALL EXP_BITCH\(ARG, PLACE, LOCALS, PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '190-192',
        any: [/^\s*PLAY = 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '192',
        any: [/^\s*PLAY = SUMARRAY\(PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '194-317',
        any: [/^\s*IF PLAY > 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '197-201',
        any: [/^\s*MAN = 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '199',
        any: [/^\s*MAN = SUMARRAY\(MAN\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '201',
        any: [/^\s*GIRL = SUMARRAY\(GIRL\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '203-244',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '205',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '206',
        any: [/^\s*VARSET LOCALS/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '208',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("DUNGEON_MAN", MA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '212',
        any: [/^\s*PRINTFORML %LOCALS%、/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '213',
        any: [/^\s*PRINTFORM 于是/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '215',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("DUNGEON_GIRL", G/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '217',
        any: [/^\s*PRINTFORML 以%LOCALS%为对手/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '219',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("PLAYNAME", PLAY:/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '220',
        any: [/^\s*PRINTFORMW %LOCALS%进行着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '222-244',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '223',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '224',
        any: [/^\s*VARSET LOCALS/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '226',
        any: [/^\s*PRINTFORMW 进行了\{PLAY:6\}次兽交秀。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '229',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("TOWN_MAN", MAN:1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '232',
        any: [/^\s*PRINTFORML %LOCALS%、/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '233',
        any: [/^\s*PRINTFORM 于是/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '235',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("TOWN_GIRL", GIRL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '237',
        any: [/^\s*PRINTFORML 以%LOCALS%为对手/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '239',
        any: [/^\s*LOCALS = %FS_LOG_BITCH\("PLAYNAME", PLAY:/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '240',
        any: [/^\s*PRINTFORMW %LOCALS%进行着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '242',
        any: [/^\s*PRINTFORMW 并且进行了\{PLAY:6\}次兽奸表演/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '246-248',
        any: [/^\s*LOCAL = -1 \* PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '248',
        any: [/^\s*CALL KARMA, ARG, LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '250',
        any: [/^\s*CALL LOG_AFTER_BITCH\(ARG, CHECK\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '252-262',
        any: [/^\s*PRINTFORML 					～经验与点数变化～/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '252',
        any: [/^\s*PRINTFORML 					～经验与点数变化～/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '254',
        any: [/^\s*SIF PREV_EXP:LCOUNT == EXP:ARG:LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '256',
        any: [/^\s*PRINTFORML %EXPNAME:LCOUNT, 16, RIGHT%：\{/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '259',
        any: [/^\s*SIF PREV_JUEL:LCOUNT == JUEL:ARG:LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '261',
        any: [/^\s*PRINTFORML %PALAMNAME:LCOUNT, 12, RIGHT%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '263',
        any: [/^\s*WAIT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '264-299',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '266-267',
        any: [/^\s*EXP:0:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '266',
        any: [/^\s*EXP:0:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '267',
        any: [/^\s*EXP:ARG:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '268',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%淫荡行为成为了魔王和奴隶们的力量/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '270-272',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '272',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%获得了\{LOCAL\}数量的金币/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '274-293',
        any: [/^\s*LOCAL = MONEY - PREV_MONEY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '277',
        any: [/^\s*LOCAL = LOCAL\/10\*9/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '278',
        any: [/^\s*PRINTFORMW 基於对魔王的爱意，%SAVESTR:ARG%将卖得收入的九/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '280',
        any: [/^\s*LOCAL = LOCAL\/10\*9/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '281',
        any: [/^\s*PRINTFORMW 基於对魔王的感情，%SAVESTR:ARG%将卖得收入的七/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '284',
        any: [/^\s*LOCAL \/= 2 \+ 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '285',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%将卖得收入的一半上交了。献上了\{/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '287',
        any: [/^\s*LOCAL \/= 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '288',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%将卖得收入的一半上交了。献上了\{/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '291',
        any: [/^\s*MONEY -= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '292',
        any: [/^\s*EX_FLAG:4444 -= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '293',
        any: [/^\s*CFLAG:ARG:580 \+= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '295-298',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '297',
        any: [/^\s*EXP:ARG:80 \+= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '298',
        any: [/^\s*PRINTFORMW 获得了%SAVESTR:ARG%\{LOCAL\}点的金钱以及/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '300-303',
        any: [/^\s*LOCAL = PREV_KARMA - CFLAG:ARG:151/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '303',
        any: [/^\s*PRINTFORMW 然后，善恶值减少了\{ABS\(LOCAL\)\}。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '305-316',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '306-316',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '306-328',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '308',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '310',
        any: [
          /^\s*PRINTFORMW 在下不定决心而烦恼的时候，时间不断地流失掉了\.\.\./m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '312',
        any: [
          /^\s*PRINTFORMW 然而，根本没有勇气发出声音，说自己在卖春的这种事情。/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '314',
        any: [/^\s*PRINTFORM \{KYAKU\}人群的声音嘈杂着、/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '315',
        any: [/^\s*PRINTFORMW 交涉终了，一个人也没有买下%SAVESTR:ARG%，就这/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '318-328',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '319-328',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '321',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '323',
        any: [
          /^\s*PRINTFORMW 在下不定决心而烦恼的时候，时间不断地流失掉了\.\.\./m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '325',
        any: [
          /^\s*PRINTFORMW 然而，根本没有勇气发出声音，说自己在卖春的这种事情。/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '327',
        any: [/^\s*PRINTFORMW 于是、一个对象也没有找到/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '334-417',
        any: [/^\s*@EXP_BITCH\(ARG, PLACE, TYPE, PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '341-352',
        any: [/^\s*CASE "HAND"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '342',
        any: [/^\s*EXP:ARG:20 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '343',
        any: [/^\s*EXP:ARG:74 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '345',
        any: [/^\s*JUEL:ARG:7 \+= PLAY \* 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '347',
        any: [/^\s*JUEL:ARG:7 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '350',
        any: [/^\s*JUEL:ARG:9 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '352',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '353-367',
        any: [/^\s*CASE "ORAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '354',
        any: [/^\s*EXP:ARG:22 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '355',
        any: [/^\s*EXP:ARG:20 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '356',
        any: [/^\s*EXP:ARG:74 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '358',
        any: [/^\s*JUEL:ARG:7 \+= PLAY \* 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '360',
        any: [/^\s*JUEL:ARG:7 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '363',
        any: [/^\s*JUEL:ARG:9 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '365',
        any: [/^\s*EXP:8 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '366',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '368-379',
        any: [/^\s*CASE "LES"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '369',
        any: [/^\s*EXP:ARG:40 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '370',
        any: [/^\s*EXP:ARG:74 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '372',
        any: [/^\s*EXP:ARG:2 \+= PLAY \* \(1 \+ ABL:ARG:10\) \/ 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '373',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 100 \* \(1 \+ ABL:ARG:/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '374',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '376',
        any: [/^\s*EXP:ARG:2 \+= PLAY \* \(1 \+ ABL:ARG:10\) \/ 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '377',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 10 \* ABL:ARG:10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '378',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '380-390',
        any: [/^\s*CASE "ANAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '381',
        any: [/^\s*EXP:ARG:1 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '382',
        any: [/^\s*EXP:ARG:5 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '383',
        any: [/^\s*EXP:ARG:74 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '385',
        any: [/^\s*JUEL:ARG:2 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '386',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '388',
        any: [/^\s*JUEL:ARG:2 \+= PLAY \* 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '389',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '391-401',
        any: [/^\s*CASE "SEX"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '392',
        any: [/^\s*EXP:ARG:0 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '393',
        any: [/^\s*EXP:ARG:5 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '394',
        any: [/^\s*EXP:ARG:74 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '396',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '397',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '399',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '400',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 15/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '402-412',
        any: [/^\s*CASE "ANIMAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '403',
        any: [/^\s*EXP:56 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '404',
        any: [/^\s*EXP:0 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '405',
        any: [/^\s*EXP:5 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '406',
        any: [/^\s*JUEL:1 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '407',
        any: [/^\s*JUEL:6 \+= PLAY \* 300/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '408',
        any: [/^\s*JUEL:8 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '420-495',
        any: [/^\s*@PROFIT_BITCH\(ARG, PLACE, TYPE, PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '426-428',
        any: [/^\s*#DIM PAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '429-440',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '433',
        any: [/^\s*PAY = \(FI_CULC_BITCH\(ARG, "RATE", TYPE\) /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '436',
        any: [/^\s*PAY = 5 \* \(1 \+ CFLAG:ARG:501 \+ FI_CULC_B/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '439',
        any: [/^\s*PAY = FI_CULC_BITCH\(ARG, "RATE", "KARMA"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '442-462',
        any: [/^\s*SELECTCASE TYPE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '444-445',
        any: [/^\s*CASE "ANIMAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '447',
        any: [/^\s*GIRL = RAND\(1, 6\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '449-450',
        any: [/^\s*CASE 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '451-452',
        any: [/^\s*CASE 4/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '455',
        any: [/^\s*MAN = RAND\(1, 6\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '457-458',
        any: [/^\s*CASE 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '459-460',
        any: [/^\s*CASE 4/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '464-465',
        any: [/^\s*SIF !EXP:ARG:74/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '465',
        any: [/^\s*PAY \+= 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '467-468',
        any: [/^\s*SIF TALENT:ARG:0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '468',
        any: [/^\s*PAY \+= 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '470',
        any: [/^\s*PAY = PAY \* PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '472-483',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '476',
        any: [/^\s*CFLAG:ARG:580 \+= PAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '478',
        any: [/^\s*MONEY \+= PAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '479',
        any: [/^\s*EX_FLAG:4444 \+= PAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '482',
        any: [/^\s*CFLAG:ARG:580 \+= PAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '485-492',
        any: [/^\s*SELECTCASE TYPE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '486-487',
        any: [/^\s*CASE "ANIMAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '488-489',
        any: [/^\s*CASE "LES"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '490-491',
        any: [/^\s*CASEELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '497-516',
        any: [/^\s*@DUNGEON_WORK\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '500',
        any: [/^\s*LOCAL = \(CFLAG:ARG:9 \* 20\) \+ 100/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '501-502',
        any: [/^\s*SIF CFLAG:ARG:0 == 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '503-512',
        any: [/^\s*IF FLAG:5 & 32/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '504',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%从事了/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '505-510',
        any: [/^\s*PRINTDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '505',
        any: [/^\s*PRINTDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '511',
        any: [/^\s*PRINTFORMW 副业\{LOCAL\}点收入。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '513-514',
        any: [/^\s*MONEY \+= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '513',
        any: [/^\s*MONEY \+= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '514',
        any: [/^\s*EX_FLAG:4444 \+= LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '519-558',
        any: [/^\s*@DUNGEON_ANIMAL\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '522',
        any: [/^\s*#DIM PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '524-528',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%无法压抑兽交的欲望/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '524',
        any: [/^\s*PRINTFORM %SAVESTR:ARG%无法压抑兽交的欲望/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '525',
        any: [/^\s*PRINTFORMW 悄悄寻找着兽穴\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '526',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%进入了野兽的巢穴，像母狗一样趴在/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '527',
        any: [/^\s*PRINTFORMW 随后%SAVESTR:ARG%翻身将野兽压倒在地，主动跨坐/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '528',
        any: [/^\s*PRINTFORMW 忘我地与野兽样的魔物交尾了\{PLAY\}次…/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '530',
        any: [/^\s*CALL LOG_BITCH_ANIMAL\(ARG, "DUNGEON"\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '531',
        any: [/^\s*WAIT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '534-539',
        any: [/^\s*PRINTFORML %EXPNAME:56%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '534',
        any: [/^\s*PRINTFORML %EXPNAME:56%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '535',
        any: [/^\s*PRINTFORML %EXPNAME:0%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '536',
        any: [/^\s*PRINTFORML %EXPNAME:5%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '537',
        any: [/^\s*EXP:ARG:56 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '538',
        any: [/^\s*EXP:ARG:0 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '539',
        any: [/^\s*EXP:ARG:5 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '542-547',
        any: [/^\s*PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*200\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '542',
        any: [/^\s*PRINTFORML %PALAMNAME:1%点数＋\{PLAY\*200\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '543',
        any: [/^\s*PRINTFORML %PALAMNAME:6%点数＋\{PLAY\*300\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '544',
        any: [/^\s*PRINTFORMW %PALAMNAME:8%点数＋\{PLAY\*200\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '545',
        any: [/^\s*JUEL:ARG:1 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '546',
        any: [/^\s*JUEL:ARG:6 \+= PLAY \* 300/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '547',
        any: [/^\s*JUEL:ARG:8 \+= PLAY \* 200/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '549-551',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '549',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '550',
        any: [/^\s*EXP:0:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '551',
        any: [/^\s*EXP:ARG:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '553-555',
        any: [/^\s*LOCAL = -1 \* PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '554',
        any: [/^\s*PRINTFORMW （善恶值减少了：\{LOCAL\}）/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '555',
        any: [/^\s*CALL KARMA, ARG, LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '560-670',
        any: [/^\s*@SELF_BITCH\(ARG, PLACE\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '564',
        any: [/^\s*#DIM PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '565',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%无法压抑性欲，自慰了起来/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '568-630',
        any: [/^\s*IF !TALENT:ARG:85 && ABL:ARG:22 > RAND:5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '569-572',
        any: [/^\s*IF !TALENT:ARG:85 && ABL:ARG:22 > RAND:5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '571',
        any: [/^\s*PRINTFORM 想象着跟女人的交合/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '572',
        any: [/^\s*LOCAL = 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '573-576',
        any: [/^\s*ELSEIF ITEM:22 && !TALENT:ARG:85 && ABL:/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '575',
        any: [/^\s*PRINTFORM 陷入了跟野兽交尾的幻想/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '576',
        any: [/^\s*LOCAL = 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '577-586',
        any: [/^\s*ELSEIF PLACE == "DUNGEON" && RAND\(1, 40\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '580',
        any: [/^\s*PRINTDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '581',
        any: [/^\s*DATAFORM 想起%CALLNAME:MASTER%的事/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '582',
        any: [/^\s*DATAFORM 一次次呼唤着%CALLNAME:MASTER%的名字/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '583',
        any: [/^\s*DATAFORM 想起了上次的调教/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '584',
        any: [/^\s*DATAFORM 想象着下一次的调教/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '586',
        any: [/^\s*LOCAL = 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '587-615',
        any: [/^\s*ELSEIF RAND\(1, 5\) < ABL:ARG:31/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '590',
        any: [/^\s*PRINTDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '591',
        any: [/^\s*DATAFORM 如饥似渴，一副十分想要的样子/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '592',
        any: [/^\s*DATAFORM 无法满足的欲望，心情变得十分急躁/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '593',
        any: [/^\s*DATAFORM 不自觉地张开着嘴巴/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '594',
        any: [/^\s*DATAFORM 根本不在意口水滴落下来的样子/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '595',
        any: [/^\s*DATAFORM 根本不在意口水流下来的样子/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '596',
        any: [/^\s*DATAFORM 一脸恍惚的样子/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '597',
        any: [/^\s*DATAFORM 一脸沉浸在欲望中的快乐表情/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '598',
        any: [/^\s*DATAFORM 红晕慢慢爬上了脸颊/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '599',
        any: [/^\s*DATAFORM 欲望高涨，身体如同火烧一般/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '600',
        any: [/^\s*DATAFORM 呆滞的眼神/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '601',
        any: [/^\s*DATAFORM 充满情欲的眼睛，变得水汪汪的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '602',
        any: [/^\s*DATAFORM 突然将双腿张开/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '603',
        any: [/^\s*DATAFORM 身体一颤一颤的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '604',
        any: [/^\s*DATAFORM 将股间张得大大的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '605',
        any: [/^\s*DATAFORM 不知不觉的扭动着腰肢/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '606',
        any: [/^\s*DATAFORM 欲求不满的摇动着腰肢/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '607',
        any: [/^\s*DATAFORM 腰部下流的扭动着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '608',
        any: [/^\s*DATAFORM 仰起喉咙/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '609',
        any: [/^\s*DATAFORM 时不时从嘴边发出呻吟/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '610',
        any: [/^\s*DATAFORM 爱液浸湿了床具/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '611',
        any: [/^\s*DATAFORM 涂满了溢出来的爱液/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '612',
        any: [/^\s*DATAFORM 十分粗野的撕扯着衣服，双乳若隐若现/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '613',
        any: [/^\s*DATAFORM 挣扎在绝顶的边缘/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '615',
        any: [/^\s*LOCAL = 4/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '616-629',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '618',
        any: [/^\s*PRINTDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '619',
        any: [/^\s*DATAFORM 努力地忍住声音/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '620',
        any: [/^\s*DATAFORM 拼命地将气息憋住/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '621',
        any: [/^\s*DATAFORM 注意着周围的动静/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '622',
        any: [/^\s*DATAFORM 想着要停下来也\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '623',
        any: [/^\s*DATAFORM 用踌躇的动作/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '624',
        any: [/^\s*DATAFORM 迷惑地将手指重合了起来/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '625',
        any: [/^\s*DATAFORM 牢牢地将嘴唇重合起来/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '626',
        any: [/^\s*DATAFORM 懒洋洋地低下了头/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '627',
        any: [/^\s*DATAFORM 烦恼地皱了皱眉头/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '629',
        any: [/^\s*LOCAL = 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '632-635',
        any: [/^\s*IF TALENT:ARG:121 == 1 \|\| TALENT:ARG:122/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '634',
        any: [/^\s*PRINT 握住肉棒捋了起来/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '637',
        any: [/^\s*PRINTFORMW 自慰了\{PLAY\}次。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '639-641',
        any: [/^\s*CALL LOG_BITCH_SELF\(ARG, PLACE, LOCAL\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '640',
        any: [/^\s*CALL LOG_BITCH_SELF\(ARG, PLACE, LOCAL\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '641',
        any: [/^\s*WAIT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '643-645',
        any: [/^\s*PRINTFORML %EXPNAME:10%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '644',
        any: [/^\s*PRINTFORML %EXPNAME:10%＋\{PLAY\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '645',
        any: [/^\s*EXP:ARG:10 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '647-657',
        any: [/^\s*IF TALENT:121 \|\| TALENT:122/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '649',
        any: [/^\s*PRINTFORML 阴茎点数＋\{PLAY \* 500\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '651',
        any: [/^\s*PRINTFORML %PALAMNAME:0%点数＋\{PLAY \* 500\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '653',
        any: [/^\s*PRINTFORML %PALAMNAME:4%点数＋\{PLAY \* 100\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '654',
        any: [/^\s*PRINTFORMW %PALAMNAME:5%点数＋\{PLAY \* 250\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '655',
        any: [/^\s*JUEL:ARG:0 \+= PLAY \* 500/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '656',
        any: [/^\s*JUEL:ARG:4 \+= PLAY \* 100/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '657',
        any: [/^\s*JUEL:ARG:5 \+= PLAY \* 250/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '659-666',
        any: [/^\s*IF PLACE == "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '660',
        any: [/^\s*EXP:ARG:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '661',
        any: [/^\s*EXP:0:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '662',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '664',
        any: [/^\s*EXP:ARG:80 \+= PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '665',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%获得了\{PLAY\}点经验值。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '673-723',
        any: [/^\s*@FI_TRY_BITCH\(ARG, PLACE\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '676-677',
        any: [/^\s*#DIM LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '680-689',
        any: [/^\s*FOR LCOUNT, 1, 7/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '682',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LCOUNT\)%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '683',
        any: [/^\s*PLAY:LCOUNT = FI_CULC_BITCH\(ARG, "KAKURI/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '684-685',
        any: [/^\s*PLAY:LCOUNT \+= FI_CULC_BITCH\(ARG, "RATE"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '687-688',
        any: [/^\s*SIF !FI_CULC_BITCH\(ARG, "ABLE", LOCALS\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '691',
        any: [/^\s*PLAY:0 = SUMARRAY\(PLAY\) \+ FI_CULC_BITCH\(/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '693-700',
        any: [/^\s*FOR LCOUNT, 1, 6/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '695',
        any: [/^\s*LOCALS = %FS_BITCH\("PLAY", LCOUNT\)%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '696',
        any: [/^\s*PLAY:LCOUNT = FI_CULC_BITCH\(ARG, "KAKURI/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '699',
        any: [/^\s*PLAY:LCOUNT = 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '701',
        any: [/^\s*PLAY:0 = SUMARRAY\(PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '703-708',
        any: [/^\s*IF CFLAG:ARG:500 == 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '705',
        any: [/^\s*PLAY:0 \+= FI_CULC_BITCH\(ARG, "SIPPAI", "/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '707',
        any: [/^\s*PLAY:0 \+= FI_CULC_BITCH\(ARG, "SIPPAI", "/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '711-712',
        any: [/^\s*SIF PLAY <= 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '714-719',
        any: [/^\s*LOCAL = RAND:PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '714',
        any: [/^\s*LOCAL = RAND:PLAY/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '717',
        any: [/^\s*RETURNF LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '718',
        any: [/^\s*LOCAL -= PLAY:LCOUNT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '720',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '727-1148',
        any: [/^\s*@FI_CULC_BITCH\(ARG, ARGS, ARGS:1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '733-766',
        any: [/^\s*CASE "SIPPAI"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '741-745',
        any: [/^\s*LOCAL = 250 \+ CFLAG:ARG:151/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '748',
        any: [/^\s*LOCAL \/= \(1 \+ ABL:ARG:37\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '750-751',
        any: [/^\s*SIF TALENT:ARG:76/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '753-757',
        any: [/^\s*IF TALENT:ARG:181/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '760-761',
        any: [/^\s*SIF CFLAG:ARG:120 == 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '764',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '765',
        any: [/^\s*RETURNF LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '767-822',
        any: [/^\s*CASE "SEIKOU"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '768',
        any: [/^\s*LOCAL = ABL:ARG:37 \* 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '770',
        any: [/^\s*LOCAL \+\+/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '772',
        any: [/^\s*LOCAL \+\+/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '775',
        any: [/^\s*LOCAL \+= 100/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '777',
        any: [/^\s*LOCAL \+= \(TALENT:ARG:76 \+ TALENT:ARG:180/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '779-797',
        any: [/^\s*SELECTCASE CFLAG:ARG:580 \+ CFLAG:ARG:581/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '781-782',
        any: [/^\s*CASE IS < -40000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '783-784',
        any: [/^\s*CASE IS < -20000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '785-786',
        any: [/^\s*CASE IS < -10000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '787-788',
        any: [/^\s*CASE IS < -5000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '789-790',
        any: [/^\s*CASE IS < 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '791-792',
        any: [/^\s*CASE IS < 5000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '793-794',
        any: [/^\s*CASE IS < 10000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '795-796',
        any: [/^\s*CASEELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '800-814',
        any: [/^\s*IF CFLAG:ARG:1 == 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '802-803',
        any: [/^\s*CASE IS < -40000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '804-805',
        any: [/^\s*CASE IS < -20000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '806-807',
        any: [/^\s*CASE IS < -10000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '808-809',
        any: [/^\s*CASE IS < -5000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '810-811',
        any: [/^\s*CASE IS < 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '812-813',
        any: [/^\s*CASE IS < 5000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '814-815',
        any: [/^\s*CASE IS < 10000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '816-817',
        any: [/^\s*CASEELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '818-826',
        any: [/^\s*ENDSELECT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '820-823',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '824-825',
        any: [/^\s*TIMES LOCAL, 0\.75/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '826-827',
        any: [/^\s*ELSEIF CFLAG:ARG:500 == 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '830-837',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '840',
        any: [/^\s*LOCAL \+= \(CFLAG:ARG:120 \* 100\) - 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '841',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '844-946',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '845',
        any: [/^\s*;0にはならない/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '846-858',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '849',
        any: [/^\s*CASE "KYAKU"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '851',
        any: [/^\s*;カルマ補正/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '853',
        any: [/^\s*CASE IS > 180/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '855',
        any: [/^\s*CASE IS > 130/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '857',
        any: [/^\s*CASE IS > 80/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '859',
        any: [/^\s*CASE IS > 30/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '861',
        any: [/^\s*LOCAL \+= 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '863',
        any: [/^\s*LOCAL \+= 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '866-881',
        any: [/^\s*CASEELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '883-902',
        any: [/^\s*LOCAL \+= \(ABL:ARG:15 \+ ABL:ARG:17 \+ ABL:/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '900',
        any: [/^\s*SIF TALENT:ARG:99 && TALENT:ARG:248/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '902',
        any: [/^\s*IF ARGS:1 == "TOWN"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '906',
        any: [/^\s*SELECTCASE CFLAG:ARG:580 \+ CFLAG:581 \+ C/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '908',
        any: [/^\s*LOCAL \+= 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '910',
        any: [/^\s*LOCAL \+= 4/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '913',
        any: [/^\s*CASE IS < -5000/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '916-931',
        any: [/^\s*LOCAL \+= 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '932-946',
        any: [/^\s*TIMES LOCAL, 0\.5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '947-959',
        any: [/^\s*SIF ARG < 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '949-956',
        any: [/^\s*SIF ARG < 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '961-963',
        any: [/^\s*CASE "ORAL",/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '966',
        any: [/^\s*CASE "LES"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '967',
        any: [/^\s*;レズっ気2以上、C感覚3以上、欲望2以上、技巧2以上が必要/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '969-1026',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '972-976',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '973',
        any: [/^\s*;おしりコース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '975',
        any: [/^\s*;本番コース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '981',
        any: [/^\s*SIF CFLAG:ARG:42 == 79 && \(CFLAG:ARG:40 /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '983',
        any: [/^\s*;貞操封印だとダメ/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '985-988',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '987',
        any: [/^\s*;貞操封印ぬけてたっぽいので追加/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '989-997',
        any: [/^\s*SIF ITEM:22 == 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '992-993',
        any: [/^\s*SIF ITEM:22 == 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '995-996',
        any: [/^\s*SIF TALENT:ARG:0 \|\| TALENT:ARG:122 == 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '998',
        any: [/^\s*SIF CFLAG:ARG:42 == 79 && \(CFLAG:ARG:40 /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '999-1008',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1002',
        any: [/^\s*RETURNF 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1004-1005',
        any: [/^\s*RETURNF 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1007',
        any: [/^\s*;SELFに限っては売春行為ではないため先に別個に処理する/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1009-1023',
        any: [/^\s*LOCAL = ABL:ARG:31 \+ RAND:\(ABL:ARG:11 \+ /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1014',
        any: [/^\s*TIMES LOCAL, 1\.5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1016',
        any: [/^\s*SIF TALENT:ARG:121 \|\| TALENT:ARG:122 \|\| /m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1018-1019',
        any: [/^\s*LOCAL = MAX\(LOCAL, 1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1021',
        any: [/^\s*ENDIF/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1025',
        any: [/^\s*LOCAL \+= \(ABL:ARG:16 \+ ABL:ARG:37\) \/ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1028-1108',
        any: [/^\s*TIMES LOCAL, 1\.2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1030-1042',
        any: [/^\s*CASE "HAND"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1032',
        any: [/^\s*LOCAL \+= ABL:ARG:32 \/ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1033',
        any: [/^\s*;おフェラコース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1034',
        any: [/^\s*CASE "ORAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1036-1037',
        any: [/^\s*SIF EXP:ARG:22/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1039-1040',
        any: [/^\s*LOCAL \+\+/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1042',
        any: [/^\s*TIMES LOCAL, 1\.5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1045-1108',
        any: [/^\s*LOCAL \+= \(ABL:ARG:0 \+ ABL:ARG:22\) \/ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1045',
        any: [/^\s*LOCAL \+= \(ABL:ARG:0 \+ ABL:ARG:22\) \/ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1046',
        any: [/^\s*LOCAL \+= TALENT:ARG:81 \+ TALENT:ARG:82/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1047',
        any: [/^\s*LOCAL \*= \(10 \+ ABL:ARG:33\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1048',
        any: [/^\s*LOCAL \/= 10/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1050-1051',
        any: [/^\s*CASE "ANAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1053-1055',
        any: [/^\s*SIF TALENT:ARG:77/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1056-1062',
        any: [/^\s*CASE "SEX"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1063-1067',
        any: [/^\s*LOCAL \+= \(ABL:ARG:30 \+ ABL:ARG:39\) \/ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1068-1071',
        any: [/^\s*TIMES LOCAL, 1\.5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1072-1075',
        any: [/^\s*LOCAL -= 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1076-1080',
        any: [/^\s*RETURNF LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1083-1084',
        any: [/^\s*LOCAL \+= ABL:ARG:32 \+ 4/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1087',
        any: [/^\s*;おフェラコース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1090-1144',
        any: [/^\s*SIF TALENT:ARG:52/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1091',
        any: [/^\s*LOCAL \+= 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1093-1097',
        any: [/^\s*SIF TALENT:ARG:47/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1098-1102',
        any: [/^\s*LOCAL \*= \(10 \+ ABL:ARG:33\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1103-1106',
        any: [/^\s*SIF TALENT:ARG:77/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1107-1110',
        any: [/^\s*CASE "SEX"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1111-1114',
        any: [/^\s*TIMES LOCAL, 2\.0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1115-1118',
        any: [/^\s*SIF TALENT:ARG:136/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1121',
        any: [/^\s*LOCAL \*= 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1122',
        any: [/^\s*RETURNF LOCAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1124-1148',
        any: [/^\s*CASE "RATE"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1129',
        any: [/^\s*CASE "KARMA"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1131',
        any: [/^\s*;手コキコース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1133-1134',
        any: [/^\s*RETURNF 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1136',
        any: [/^\s*RETURNF 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1138',
        any: [/^\s*CASE "ANAL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1140',
        any: [/^\s*;本番コース/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1150-1170',
        any: [/^\s*@SHOW_BUTTON_BICH_LEVEL\(NUM, ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1157',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 卖春积极性 -/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1160',
        any: [/^\s*PRINT 没有/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1162',
        any: [/^\s*PRINT 普通/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1164',
        any: [/^\s*PRINTFORM \{CFLAG:ARG:120\}等级/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1167',
        any: [/^\s*PRINT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1169',
        any: [/^\s*RETURN 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1172-1196',
        any: [/^\s*@SET_BICH_LEVEL\(ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1175',
        any: [/^\s*PRINTL 请设定等级/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1176',
        any: [/^\s*PRINTL \[0\] \[1\] \[2\] \[3\] \[4\] \[5\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1185',
        any: [/^\s*CFLAG:ARG:120 = RESULT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1187-1188',
        any: [/^\s*IF RESULT == 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1188',
        any: [/^\s*PRINTW 卖春积极性变成没有了/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1189-1190',
        any: [/^\s*ELSEIF RESULT == 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1190',
        any: [/^\s*PRINTW 卖春积极性变成普通了/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1192',
        any: [/^\s*PRINTFORMW 卖春积极性变为等级\{RESULT\}了/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1199',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1200',
        any: [/^\s*;ダンジョン内でのイベント奴隷用/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '3132',
        any: [/^\s*\[SKIPEND\]/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
