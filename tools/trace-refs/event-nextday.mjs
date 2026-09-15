// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-nextday.mjs
//
// #400（N16）起 EVENT_NEXTDAY.ERB 走全路径：本表的 refs 由两个 JS 文件里的
// 内联 `:N`/`:N-M` 引用逐个生成（any 取被引用的源 ERB 行内容）。

export const FILES = [
  {
    js: 'ere/event/event-nextday.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '3',
        any: [/;=================================================/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '6-189',
        any: [
          /ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '10-52',
        any: [
          /ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '16-20',
        any: [/IF TALENT:121 == 0 && TALENT:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '22-28',
        any: [/SIF TALENT:132 == 0 && EXP:31 >= 40/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '29-38',
        any: [
          /ELSEIF ABL:11 >= 5 && ABL:10 >= 5 && ABL:21 >= 5 && ABL:17 >= 5 && EXP:50 >= 7 && TALENT:57 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '33',
        any: [/CALL EVENT_YOUJI/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '40-44',
        any: [
          /SIF TALENT:244 == 1  &&  TALENT:245 == 1  &&  TALENT:246 == 1  &&  TALENT:247 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '47',
        any: [/CALL APHRODISIAC_ADDICT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '50',
        any: [/CALL SOUL_DISLOCATION/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '55-61',
        any: [/PRINTFORML %SAVESTR:COUNT%的排卵诱发剂的效果消失了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '59',
        any: [/CFLAG:COUNT:109 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '64',
        any: [/FLAG:61 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '67',
        any: [/CALL NINSIN_MAIN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '69-95',
        any: [/IF TALENT:LOCAL:153 \|\| TALENT:LOCAL:154/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '72',
        any: [/IF \(CFLAG:LOCAL:110 - 3\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '75',
        any: [/;CALL REACH_FULL_TERM\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '77',
        any: [/ELSEIF \(CFLAG:LOCAL:110 - 1\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '79',
        any: [/PRINTFORML 已经邻近%SAVESTR:LOCAL%的出産日了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '82',
        any: [/ELSEIF CFLAG:LOCAL:110 == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '84',
        any: [/;CALL CHILD_BIRTH\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '86',
        any: [/ELSEIF \(CFLAG:LOCAL:110 \+ 5\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '88',
        any: [/;CALL DEPEARENT\(LOCAL\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '89',
        any: [/ELSEIF TALENT:LOCAL:154/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '97-99',
        any: [/;	CALL WASHING_CLOTH/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '102-111',
        any: [/REPEAT CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '114',
        any: [/CALL NIGHT_STALKING_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '117',
        any: [/;CALL RUNNING_COST/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '120',
        any: [/CALL CURSE_EQUIP_RING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '123',
        any: [/CALL SUMMON_MONSTER, 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '126',
        any: [/CALL DUNGEON_ROOM_DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '129-178',
        any: [
          /IF TALENT:成为勇者前的生活 == 12 \|\| TALENT:202 \|\| TALENT:206/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-147',
        any: [/SIF TALENT:0 == 0 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-154',
        any: [/SIF TALENT:85 == 1 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '147',
        any: [/SIF TALENT:0 == 0 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '162-175',
        any: [
          /IF TALENT:成为勇者前的生活 == 12 \|\| TALENT:202 \|\| TALENT:206/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '181',
        any: [/CALL TAX_GET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '184',
        any: [/CALL SENGEN_VIDEO_DE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '187',
        any: [/CALL MAOU_KOUHO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '189',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '193-243',
        any: [/IF TALENT:A:292 && CFLAG:A:820 <= 0 && CFLAG:A:1 != 11/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '196',
        any: [/;CALL SOMETIMES_SHE_COMES_BACK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '200-221',
        any: [/IF TALENT:A:292 && CFLAG:A:820 <= 0 && CFLAG:A:1 != 11/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '200',
        any: [/A = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '226',
        any: [/CALL MORNING_FELLATIO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '229',
        any: [/;CALL HAPPY_BIRTHDAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '232',
        any: [/CALL ONESHO/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '235',
        any: [/;CALL PARTICULAR_DATE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '238',
        any: [/CALL DOG_WALK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '241',
        any: [/CALL ENDCHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '243',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '247-363',
        any: [
          /;1人あたりEASY\/NORMAL\/EXTRAは\$100、HARDは\$200、LUNATICは\$300、PHANTASMは\$400/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '249',
        any: [/A = 500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '252-253',
        any: [/A \+= 1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '254-256',
        any: [/;日付が50日を超えると\$2000追加/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '258-278',
        any: [/;多目的ホールを建てていると\$1800追加/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '259-274',
        any: [/;多目的ホールを建てていると\$1800追加/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '276-278',
        any: [/;警備員を雇用していると人数\*\$500追加/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '281-287',
        any: [/ELSEIF EXP:MASTER:91 >= 70/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '281-282',
        any: [/IF EXP:MASTER:91 >= 50/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '283-284',
        any: [/ELSEIF EXP:MASTER:91 >= 70/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '285-286',
        any: [/ELSEIF EXP:MASTER:91 >= 90/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '290-304',
        any: [/ELSEIF EXP:MASTER:90 >= 2000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '290-303',
        any: [/ELSEIF EXP:MASTER:90 >= 2000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '306-316',
        any: [
          /;1人あたりEASY\/NORMAL\/EXTRAは\$100、HARDは\$200、LUNATICは\$300、PHANTASMは\$400/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '308-309',
        any: [/IF FLAG:5 <= 2 \|\| FLAG:5 == 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '310-311',
        any: [/ELSEIF FLAG:5 == 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '312-313',
        any: [/ELSEIF FLAG:5 == 4/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '314-315',
        any: [/ELSEIF FLAG:5 == 5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '318',
        any: [/A -= 100/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '320-353',
        any: [
          /;難易度EASYで0\.8倍、HARDで1\.2～2\.5倍、POWERFULで1\.4～5\.0倍、PHANTASMで2\.0～16\.0倍/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '321-322',
        any: [/IF FLAG:5 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '355-363',
        any: [
          /IF \(FLAG:5 == 1 && DAY >= 20\) \|\| \(FLAG:5 >= 2 && DAY >= 10\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '358',
        any: [/PRINTFORML 调教中心的维持费和奴隶们的生活费花了\$\{A\}……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '359',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '360',
        any: [/MONEY -= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '361',
        any: [/EX_FLAG:4444 -= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '367-386',
        any: [/PRINTFORML %SAVESTR:TARGET%要【%TALENTNAME:121%】化吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '368',
        any: [/PRINTFORML （呃…这是什么？）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '370',
        any: [/PRINTFORML %SAVESTR:TARGET%要【%TALENTNAME:121%】化吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '371',
        any: [/PRINTL \[0\] - 好的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '372',
        any: [/PRINTL \[1\] - 不要/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '373',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '375',
        any: [/PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:121%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '375-378',
        any: [/PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:121%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '380',
        any: [/PRINTFORML %SAVESTR:TARGET%失去了【%TALENTNAME:326%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '380-381',
        any: [/PRINTFORML %SAVESTR:TARGET%失去了【%TALENTNAME:326%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '382-383',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '386',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '390-395',
        any: [/PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:57%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '391',
        any: [/PRINTFORML 当晚，%SAVESTR:TARGET%尿床了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '392',
        any: [/PRINTFORML %SAVESTR:TARGET%获得了【%TALENTNAME:57%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '393',
        any: [/TALENT:57 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '395',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '399-465',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%再也无法接受严厉的调教，获得了【%TALENTNAME:131%】…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '400',
        any: [/PRINTFORML （呃……这是什么？）/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '401',
        any: [/PRINTFORMW %SAVESTR:TARGET%的样子有点奇怪……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '402',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%再也无法接受严厉的调教，获得了【%TALENTNAME:131%】…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '403',
        any: [/TALENT:131 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '405-456',
        any: [/PRINTFORML 【%TALENTNAME:20%】消失了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '407',
        any: [/PRINTFORML 【%TALENTNAME:20%】消失了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '458',
        any: [/TALENT:57 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '459',
        any: [/PRINTFORML 获得了【%TALENTNAME:57%】。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '462',
        any: [/MARK:3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '463',
        any: [/PRINTFORML 【%MARKNAME:3%】变为０。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '465',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '470-498',
        any: [
          /TALENT:现种族 = TALENT:淫乱 \? 152 # 132 ;淫乱ならサキュバス、それ以外はナイトガール/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '471-472',
        any: [/RETURN/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '474',
        any: [/TALENT:原种族 = TALENT:种族/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '476',
        any: [
          /TALENT:现种族 = TALENT:淫乱 \? 152 # 132 ;淫乱ならサキュバス、それ以外はナイトガール/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '477',
        any: [/TALENT:314 = 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '478',
        any: [/TALENT:91 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '479',
        any: [/TALENT:481 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '480',
        any: [/PRINTFORMW 全身充满了浓厚的魔力………/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '481',
        any: [/PRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '482',
        any: [
          /PRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '483',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%的肉体上散发出致命的诱惑，获得了【魅惑】……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '484',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何用自己的肉体作为武器。获得了【诱惑】。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '485',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '488',
        any: [/TALENT:现种族 = 140 ;インプ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '489',
        any: [/TALENT:314 = 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '490',
        any: [/TALENT:482 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '491',
        any: [/PRINTFORMW 全身充满了浓厚的魔力………/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '492',
        any: [/PRINTFORMW %SAVESTR:TARGET%被深度改造，舍弃了原来的种族，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '493',
        any: [
          /PRINTFORMW 成为出色的【魔族・%ITEMNAME:\(TALENT:现种族\)%】了。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '494',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%学会了如何破坏敌人防护。获得了【铠破坏】。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '495',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '498',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '502-526',
        any: [
          /PRINTFORML 早上，%NAME:MASTER%睁开双眼，发现确实已经死掉了的%SAVESTR:COUNT%就站在面前。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '505-506',
        any: [/CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '509-510',
        any: [/BASE:COUNT:0 = MAXBASE:COUNT:0 \/ 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '511',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '512',
        any: [
          /PRINTFORML 早上，%NAME:MASTER%睁开双眼，发现确实已经死掉了的%SAVESTR:COUNT%就站在面前。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '513',
        any: [/PRINTFORML 哎呦我的妈！葱油炒蛋花！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '514',
        any: [
          /PRINTFORML %SAVESTR:COUNT%好像什么事都没发生一样，循例进行上午的请安。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '515',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '516',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '517',
        any: [/PRINTFORML %SAVESTR:COUNT%回归了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '518',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '519',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '520',
        any: [/;一度に帰ってくるのは一人ずつ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '521-522',
        any: [/D = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '526',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '533-698',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '535',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '535-536',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '538-572',
        any: [/;	SIF ABL:L:11 < 4 \|\| ABL:L:16 < 4 \|\| ABL:L:32 < 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575-616',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575-617',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '575',
        any: [/REPEAT CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '577-579',
        any: [/;死んでたり臨死中だとダメ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '580-582',
        any: [/CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '583-585',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '586-588',
        any: [/;魔王部屋にいないとダメ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '589-591',
        any: [/SIF CFLAG:COUNT:601 != 0 && CFLAG:COUNT:601 != 901/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '592-594',
        any: [/;绝不侍奉があるとダメ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '595-597',
        any: [/;反抗刻印があるとダメ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '598',
        any: [/A = ABL:COUNT:32/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '599-601',
        any: [/A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '602-604',
        any: [/A -= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '605-607',
        any: [/A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '608-610',
        any: [/A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '611-613',
        any: [/A \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '614-615',
        any: [/F \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '619-620',
        any: [/SIF F == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '622',
        any: [/E = RAND:F/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '624-671',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '624-672',
        any: [
          /SIF TALENT:COUNT:154 \|\| \(CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '664-666',
        any: [/IF A > 0 && E == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '667-669',
        any: [/ELSEIF A > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '675-676',
        any: [/SIF L == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '679',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '680',
        any: [/PRINTFORMW 早上，在%SAVESTR:L%的口交中醒来。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '681',
        any: [/EXP:L:22 \+= A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '682',
        any: [/PRINTFORML %EXPNAME:22%＋\{A\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '683',
        any: [/EXP:L:20 \+= A\/2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '684',
        any: [/PRINTFORML %EXPNAME:20%＋\{A\/2\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '685',
        any: [
          /PRINTFORML %SAVESTR:L%带着淫媚的笑容，抬起沾满精液的脸，进行了上午的问候。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '686',
        any: [/PRINTFORML %PALAMNAME:4%点数＋\{A\*100\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '687',
        any: [/PRINTFORML %PALAMNAME:6%点数＋\{A\*30\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '688',
        any: [/PRINTFORMW %PALAMNAME:7%点数＋\{A\*40\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '689',
        any: [/JUEL:L:4 \+= A\*100/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '690',
        any: [/JUEL:L:6 \+= A\*30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '691',
        any: [/JUEL:L:7 \+= A\*40/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '694',
        any: [/TARGET = L/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '695-696',
        any: [/TFLAG:13 = 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '698',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '703-806',
        any: [
          /IF TALENT:COUNT:72 == 1 \|\| TALENT:COUNT:80 == 1 \|\| TALENT:COUNT:88 == 1 \|\| TALENT:COUNT:89 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '705',
        any: [
          /IF TALENT:COUNT:57 ==1 && RAND:12 <= EXP:COUNT:31\/10 \+ TALENT:COUNT:132\*2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '707-708',
        any: [/CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '709',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '712-715',
        any: [
          /;			※この上の二つのIF文でカテーテルありの装備判定。システム上における変数読み込みかなにかで個数関係で一つに繋げられず、エラーが出る？/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '719-735',
        any: [
          /PRINTFORML 不可思议的并不会十分肮脏，但实在羞愧难当，穿好衣服后对%CALLNAME:MASTER%愤怒的瞪了一眼。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '723-725',
        any: [/PRINTFORML %PALAMNAME:8%点数＋10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '726-728',
        any: [/PRINTFORML %PALAMNAME:8%点数＋20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '729-731',
        any: [/PRINTFORML %PALAMNAME:9%点数＋10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '732-734',
        any: [/PRINTFORML %PALAMNAME:9%点数＋20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '736-738',
        any: [
          /PRINTFORML 装上了尿道导管，一不小心的漏尿了，并察觉到了的%SAVESTR:COUNT%，/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '739-773',
        any: [
          /IF TALENT:COUNT:72 == 1 \|\| TALENT:COUNT:80 == 1 \|\| TALENT:COUNT:88 == 1 \|\| TALENT:COUNT:89 == 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '748-755',
        any: [/PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%坦白了尿床的事，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '753',
        any: [/EXP:COUNT:10 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '754',
        any: [/JUEL:COUNT:5 \+= 800/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '755',
        any: [/JUEL:COUNT:8 \+= 800/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '756-759',
        any: [
          /PRINTFORML %SAVESTR:COUNT%向%CALLNAME:MASTER%报告了尿床了的事，脸上染上了羞愧的深色。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '759',
        any: [/JUEL:COUNT:8 \+= 300/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '763-765',
        any: [/PRINTFORML %PALAMNAME:4%点数＋10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '766-768',
        any: [/PRINTFORML %PALAMNAME:4%点数＋20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '769-771',
        any: [/PRINTFORML %PALAMNAME:4%点数＋30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '778',
        any: [/;		※↓は元々あった記述、カテーテル等装備してない状態/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '780-803',
        any: [/IF ABL:COUNT:17\+ABL:COUNT:21 >= 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '781',
        any: [/PRINTFORML %SAVESTR:COUNT%尿床了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '782',
        any: [/EXP:COUNT:31 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '783',
        any: [/PRINTFORML %EXPNAME:31%＋1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '785',
        any: [/TARGET = COUNT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '786-787',
        any: [/CALL SOILING_CLOTH_NO1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '789-790',
        any: [/CONTINUE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '792',
        any: [/IF ABL:COUNT:17\+ABL:COUNT:21 >= 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '793',
        any: [/PRINTFORM 关于自己尿床的事%SAVESTR:COUNT%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '795',
        any: [/PRINTL 在早餐桌上向大家坦白了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '797',
        any: [/PRINTL 来向你报告了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '799',
        any: [/PRINTFORMW %PALAMNAME:8%点数＋1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '800',
        any: [/JUEL:COUNT:8 \+= 1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '806',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '813-1088',
        any: [
          /PRINTFORMW 双腿摩擦着，手足无措，面红耳赤，看来是想把自己的处女奉献给%CALLNAME:MASTER%……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '815-864',
        any: [/;SIF \(TALENT:85 == 0 && TALENT:76 == 0\) \|\| EXP:23 < 200/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '816-817',
        any: [/SIF FLAG:38 <= -1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '819-820',
        any: [/SIF TARGET < 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '822-823',
        any: [/SIF TALENT:151/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '825-826',
        any: [/SIF TALENT:135/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '828-829',
        any: [/SIF TALENT:0 == 0 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '831-832',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '835-836',
        any: [/SIF TALENT:85 == 0 && TALENT:76 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '838-839',
        any: [/SIF ABL:10\+ABL:11\+ABL:16 <= 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '841-842',
        any: [/SIF BASE:0 < 500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '844-845',
        any: [/SIF CFLAG:71 > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '847-848',
        any: [/SIF CFLAG:42 == 79 && \(CFLAG:49 == 0 \|\| CFLAG:50 == 0\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '857-858',
        any: [/SIF !\(CFLAG:1 == 0 \|\| CFLAG:1 == 1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '863-864',
        any: [/SIF FLAG:38 == 0 && CFLAG:62/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '868-924',
        any: [/SIF ABL:11 >= 5 && ABL:16 >= 5 && PALAM:5 >= PALAMLV:4/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '868',
        any: [/S = \(RAND:3 \* -1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '871-879',
        any: [/ELSEIF ABL:10 == 5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '882-890',
        any: [/ELSEIF ABL:11 == 5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '894-898',
        any: [/SIF ABL:11 >= 5 && ABL:16 >= 5 && PALAM:5 >= PALAMLV:4/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '901-902',
        any: [/IF TALENT:70/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '903-904',
        any: [/ELSEIF TALENT:71/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '908-909',
        any: [/IF TALENT:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '910-911',
        any: [/ELSEIF TALENT:31/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '915-916',
        any: [/S \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '919-920',
        any: [/S -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '923-924',
        any: [/SIF S <= 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '927',
        any: [/TEQUIP:35 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '928',
        any: [/printw ＜奉献处女＞/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '930-931',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着害羞但又坚毅的神情，造访了你的房间。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '931',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%带着害羞但又坚毅的神情，造访了你的房间。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '932',
        any: [
          /PRINTFORMW 双腿摩擦着，手足无措，面红耳赤，看来是想把自己的处女奉献给%CALLNAME:MASTER%……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '933-937',
        any: [/PRINTFORML 那只手，曾经那么的抗拒%CALLNAME:MASTER%，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '938-941',
        any: [
          /PRINTFORMW 在她本人的帮助下，想要现在突破封印，应该变得容易了吧。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '943',
        any: [/PRINTFORML 要夺取%SAVESTR:TARGET%的处女吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '944',
        any: [/PRINTL  \[0\] - 等你很久了！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '945',
        any: [/PRINTL  \[1\] - 继续等着吧你……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '946',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '948-962',
        any: [
          /PRINTFORMW %SAVESTR:TARGET%失望而归，作为女孩子的自尊，遭到了毁灭性打击。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '949',
        any: [/ABL:10 -= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '951',
        any: [/ABL:10 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '952',
        any: [/PRINTFORMW %ABLNAME:10%降低为\{ABL:10\}。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '953-958',
        any: [/PRINTFORMW %SAVESTR:TARGET%的贞操带的钥匙拿回来了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '955',
        any: [/CFLAG:49 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '957',
        any: [/CFLAG:50 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '961',
        any: [/CFLAG:62 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '962',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '963-964',
        any: [/ELSEIF RESULT != 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '966-978',
        any: [/ELSEIF RESULT != 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '968',
        any: [/PRINTFORML 要使用安全套吗？/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '969',
        any: [/PRINTL  \[0\] - 安全第一！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '970',
        any: [/PRINTL  \[1\] - 中出最高！/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '971',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '973',
        any: [/TEQUIP:35 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '974',
        any: [/ITEM:24 -= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '975-976',
        any: [/ELSEIF RESULT != 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '980',
        any: [/PRINTFORML %SAVESTR:TARGET%将处女奉献给了%CALLNAME:MASTER%……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '981',
        any: [/PRINTW 【处女丧失】/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '982',
        any: [/TALENT:0 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '985-988',
        any: [/PRINTFORMW 守护贞操的封印破碎了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '991-1006',
        any: [/PRINTFORML %PALAMNAME:4%点数＋\{S\*1000\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '999',
        any: [/EXP:0 \+= 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1000',
        any: [/EXP:5 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1001',
        any: [/EXP:20 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1002',
        any: [/JUEL:1 \+= S\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1003',
        any: [/JUEL:4 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1004',
        any: [/JUEL:5 \+= S\*500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1005',
        any: [/JUEL:6 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1006',
        any: [/JUEL:9 \+= S\*1000/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1010',
        any: [/IF TEQUIP:35 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1010-1014',
        any: [/CALL CONCEPTION_CHECK_M_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1011',
        any: [/CFLAG:101 = 30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1012',
        any: [/CALL IN_VAGINA_M_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1013',
        any: [/CALL CONCEPTION_CHECK_M_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1015',
        any: [/TEQUIP:35 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1018-1020',
        any: [/PLAYER = MASTER/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1019-1020',
        any: [/TFLAG:14 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1022-1045',
        any: [/ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1024',
        any: [/CFLAG:15 = NO:PLAYER \+ 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1025',
        any: [/CSTR:3 = %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1028-1044',
        any: [/ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1028-1043',
        any: [/ELSEIF TFLAG:14 == 1 && TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1048-1073',
        any: [/ELSEIF TFLAG:14 == 2 && TALENT:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1049',
        any: [/TALENT:MASTER:1 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1051',
        any: [/CFLAG:MASTER:15 = NO:TARGET \+ 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1052',
        any: [/CSTR:MASTER:3 = %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1055-1071',
        any: [/ELSEIF TFLAG:14 == 2 && TALENT:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1055-1070',
        any: [/ELSEIF TFLAG:14 == 2 && TALENT:122 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1074',
        any: [/TFLAG:14 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1076-1084',
        any: [
          /;断った時と同様の理由でCFLAG:50と、このままだと外れたはずの貞操帯が衣装変更時にまた付いてしまうので/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1078',
        any: [/CFLAG:49 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1079',
        any: [/CFLAG:40 -= 64/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1082',
        any: [/CFLAG:50 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1083',
        any: [/CFLAG:42 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1086',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1088',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1095-1321',
        any: [
          /SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1101-1102',
        any: [/SIF TALENT:MASTER:122 == 0 && TALENT:MASTER:121 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1105-1167',
        any: [
          /SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1105-1168',
        any: [
          /SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1108-1109',
        any: [/SIF BASE:NIGHT_COUNT:0 <= 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1111-1112',
        any: [/SIF BASE:NIGHT_COUNT:0 <= 500/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1114-1115',
        any: [
          /SIF TALENT:NIGHT_COUNT:154 \|\| \(CFLAG:NIGHT_COUNT:110 - 2 <= DAY && TALENT:NIGHT_COUNT:153\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1117-1118',
        any: [/SIF CFLAG:NIGHT_COUNT:1 != 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1120-1121',
        any: [/SIF CFLAG:NIGHT_COUNT:601 != 0 && CFLAG:NIGHT_COUNT:601 != 901/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1123-1124',
        any: [/SIF TALENT:NIGHT_COUNT:151/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1126-1127',
        any: [/SIF MARK:NIGHT_COUNT:3 > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1129-1139',
        any: [
          /SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1142',
        any: [/OK_FLAG = ABL:NIGHT_COUNT:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1145-1146',
        any: [/SIF TALENT:NIGHT_COUNT:33/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1148-1149',
        any: [/SIF TALENT:NIGHT_COUNT:20/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1151-1152',
        any: [/SIF TALENT:NIGHT_COUNT:70/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1154-1155',
        any: [/SIF TALENT:NIGHT_COUNT:71/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1157-1158',
        any: [
          /SIF TALENT:NIGHT_COUNT:75 && TALENT:NIGHT_COUNT:0 == 0 && ABL:NIGHT_COUNT:2 >= ABL:NIGHT_COUNT:3/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1160-1161',
        any: [
          /SIF TALENT:NIGHT_COUNT:77 && \(TALENT:NIGHT_COUNT:0 \|\| ABL:NIGHT_COUNT:3 > ABL:NIGHT_COUNT:2\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1163-1164',
        any: [/SIF TALENT:NIGHT_COUNT:76 && TALENT:NIGHT_COUNT:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1165-1166',
        any: [/LOCAL:1 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1170-1171',
        any: [/SIF LOCAL:1 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1173',
        any: [/LOCAL:2 = RAND:\(LOCAL:1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1175-1243',
        any: [
          /SIF TALENT:NIGHT_COUNT:122 == 0 && \(ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:2 <= 12 && ABL:NIGHT_COUNT:10\+ABL:NIGHT_COUNT:11\+ABL:NIGHT_COUNT:3 <= 14\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1245',
        any: [
          /PRINTFORML 调教结束后，%CALLNAME:MASTER%正准备上床就寝，%SAVESTR:NIGHT_TARGET%突然跑到房间里来。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1246',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1249',
        any: [/TARGET = NIGHT_TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1250-1251',
        any: [/TFLAG:13 = 5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1254-1269',
        any: [
          /SIF CFLAG:NIGHT_TARGET:42 == 79 && \(CFLAG:NIGHT_TARGET:40 & 64\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1272',
        any: [/;セックス回数/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1282-1293',
        any: [
          /PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，子宫想你想得发疼，乞求着你的宠爱……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1286',
        any: [/EXP:NIGHT_TARGET:0 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1287',
        any: [/EXP:NIGHT_TARGET:5 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1291',
        any: [/JUEL:NIGHT_TARGET:1 \+= PLAY\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1292',
        any: [/JUEL:NIGHT_TARGET:4 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1293',
        any: [/JUEL:NIGHT_TARGET:5 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1296',
        any: [/PLAY = ABL:NIGHT_TARGET:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1305-1316',
        any: [
          /PRINTFORML 想%CALLNAME:MASTER%抱抱，一直无可救药地想着你，肛门想你想得发疼，乞求着你的宠爱……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1309',
        any: [/EXP:NIGHT_TARGET:1 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1310',
        any: [/EXP:NIGHT_TARGET:5 \+= PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1314',
        any: [/JUEL:NIGHT_TARGET:2 \+= PLAY\*400/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1315',
        any: [/JUEL:NIGHT_TARGET:4 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1316',
        any: [/JUEL:NIGHT_TARGET:5 \+= PLAY\*250/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1319',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1321',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1325-1462',
        any: [
          /IF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0 && CFLAG:DOG_WALKING:1 != 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1335-1336',
        any: [/SIF ITEM:22 == 0 && NOITEM == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1338',
        any: [/SAVE_TARGET = TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1341',
        any: [/DOG_WALKING = CHARANUM -1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1343-1347',
        any: [/PRINTFORMW %SAVESTR:DOG_WALKING%带了野狗去散步。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1348',
        any: [/DOG_WALKING = RAND:DOG_WALKING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1351-1359',
        any: [
          /IF DOG_WALKING != 0 && CFLAG:DOG_WALKING:0 == 0 && CFLAG:DOG_WALKING:1 != 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1360',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1362',
        any: [/TARGET = DOG_WALKING/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1365',
        any: [/PLAY = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1367',
        any: [/OPEN = -2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1369',
        any: [/NO_SEX = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1372',
        any: [/PLAY \+= ABL:DOG_WALKING:39/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1374-1375',
        any: [/SIF TALENT:DOG_WALKING:136/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1378',
        any: [/OPEN \+= ABL:DOG_WALKING:17/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1380-1381',
        any: [/SIF TALENT:DOG_WALKING:89/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1383-1384',
        any: [/SIF TALENT:DOG_WALKING:28/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1388-1389',
        any: [/SIF TALENT:DOG_WALKING:124 && PLAY > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1391-1392',
        any: [/SIF TALENT:DOG_WALKING:317 == 12 && PLAY > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1394-1396',
        any: [/IF TALENT:DOG_WALKING:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1397-1399',
        any: [/ELSEIF TALENT:DOG_WALKING:273/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1400-1402',
        any: [
          /ELSEIF CFLAG:DOG_WALKING:42 == 79 && \(CFLAG:DOG_WALKING:40 & 64\) && FLAG:37/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1405-1412',
        any: [/PRINTFORM 的%SAVESTR:DOG_WALKING%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1414-1432',
        any: [/PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1423',
        any: [/EXP:DOG_WALKING:56 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1424',
        any: [/JUEL:DOG_WALKING:0 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1425',
        any: [/JUEL:DOG_WALKING:5 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1427',
        any: [/PRINTFORML %EXPNAME:5%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1428',
        any: [/PRINTFORML %EXPNAME:0%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1429',
        any: [/PRINTFORML %PALAMNAME:1%之珠\+\{4\*PLAY\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1430',
        any: [/JUEL:DOG_WALKING:1 \+= 4\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1431',
        any: [/EXP:DOG_WALKING:5 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1432',
        any: [/EXP:DOG_WALKING:0 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1433-1450',
        any: [/PRINTFORML %SAVESTR:DOG_WALKING%在散步途中无可忍耐地发情了，/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1441',
        any: [/EXP:DOG_WALKING:56 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1442',
        any: [/JUEL:DOG_WALKING:5 \+= 5\*PLAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1445',
        any: [/PRINTFORML %EXPNAME:22%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1446',
        any: [/PRINTFORML %EXPNAME:20%\+1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1447',
        any: [/EXP:DOG_WALKING:22 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1448',
        any: [/EXP:DOG_WALKING:20 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1452-1455',
        any: [/PRINTFORMW %PALAMNAME:8%点数\+\{5\*PLAY\}/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1457',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1460',
        any: [/TARGET = SAVE_TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1462',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1465-2426',
        any: [
          /LOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2430-2451',
        any: [/IF EX_TALENT:TEMPMAOU:3 && CFLAG:TEMPMAOU:2 > CFLAG:TEMP:2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2434',
        any: [/FOR COUNT, 1, CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2435-2436',
        any: [/IF EX_TALENT:COUNT:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2437-2445',
        any: [/IF EX_TALENT:TEMPMAOU:3 && CFLAG:TEMPMAOU:2 > CFLAG:TEMP:2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2450-2451',
        any: [/EX_FLAG:3 = TEMP/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2455-2479',
        any: [/;--------------------------------------------------------/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2459',
        any: [/EX_FLAG:0 = MASTER/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2461',
        any: [/MAXBASE:\(EX_FLAG:3\):0 \+= \(MAXBASE:MASTER:0 \/ 3\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2462',
        any: [/MAXBASE:\(EX_FLAG:3\):1 \+= \(MAXBASE:MASTER:1 \/ 3\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2463',
        any: [/MASTER = GETCHARA\(17\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2464',
        any: [/EX_FLAG:99 -= 30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2465',
        any: [/EX_TALENT:\(EX_FLAG:3\):200 = 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2466',
        any: [/EX_TALENT:\(EX_FLAG:3\):3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2467-2473',
        any: [/FOR COUNT, 0, CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2475',
        any: [/EX_TALENT:\(EX_FLAG:3\):3 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2476',
        any: [/CALL TRANSFER_SOUL, EX_FLAG:3, 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2477',
        any: [/EX_FLAG:99 -= 15/],
      },
    ],
  },
  {
    js: 'ere/event/event-nextday-pillory.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1465-2426',
        any: [
          /LOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1476-1477',
        any: [/SIF CFLAG:1 != 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1480-1488',
        any: [/PILLORY_USER = RAND:5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1488',
        any: [/PILLORY_USER = RAND:5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1490-1491',
        any: [/PRINTFORM 示众刑：%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1491',
        any: [/PRINTFORM 示众刑：%SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1492-1493',
        any: [/IF CFLAG:110 == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1494-1495',
        any: [/ELSEIF CFLAG:110 - 2 <= DAY && TALENT:153/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1496-1497',
        any: [/ELSEIF TALENT:153/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1498-1499',
        any: [/ELSEIF TALENT:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1500-1501',
        any: [/ELSEIF TALENT:273/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1500-1503',
        any: [/ELSEIF TALENT:273/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1504-1505',
        any: [/PRINT 被固定在示众台上。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1505-1508',
        any: [/PRINTFORML 姿态的%SAVESTR:TARGET%被大群男性围观着。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1509-1521',
        any: [/IF CFLAG:COUNT:110 - 2 <= DAY && TALENT:COUNT:153/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1523-1531',
        any: [/SELECTCASE RAND:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1533-1541',
        any: [/ELSEIF TALENT:15 \|\| TALENT:24 \|\| TALENT:30/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1543',
        any: [/PRINTL 忍受着耻辱……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1543-1546',
        any: [/PRINTL 忍受着耻辱……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1549-1584',
        any: [/PRINTFORM 『随便怀孕不知廉耻的小%SAVESTR:TARGET%～』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1581-1582',
        any: [/PRINTFORM 『最爱鸡鸡的婊子便器女』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1586-1613',
        any: [
          /PRINTFORM 『%TALENTNAME:LOCAL%勇者%SAVESTR:TARGET%，是各位专用的变态肛交妻』/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1615-1663',
        any: [/ELSEIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1616',
        any: [/PRINTFORM 『处女』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1621',
        any: [/PRINTFORM 『菊花专用』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1628-1632',
        any: [/PRINTFORM 『谁的鸡鸡都OK！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1637-1638',
        any: [/SIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1644',
        any: [/PRINTFORM 『私处禁入！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1650-1657',
        any: [/PRINTFORM 『什么都可以放进去』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1665-1701',
        any: [/ELSEIF TALENT:314 == 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1671-1697',
        any: [/ELSEIF TALENT:314 == 10/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1703-1706',
        any: [/IF TALENT:22 \|\| TALENT:21/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1709-1733',
        any: [/IF TALENT:24 \|\| TALENT:30 \|\| TALENT:163/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1734-1737',
        any: [/PRINT 『马上就湿的荡妇』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1739-1753',
        any: [/PRINT 『做完之后记得尿我身上哦！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1755-1758',
        any: [/IF TALENT:70 \|\| TALENT:73/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1760-1771',
        any: [/SELECTCASE RAND:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1773-1783',
        any: [/PRINTFORM 『%SAVESTR:TARGET%，八岁』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1785-1796',
        any: [/IF TALENT:109 \|\| TALENT:116/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1798-1808',
        any: [/IF TALENT:110 \|\| TALENT:114 \|\| TALENT:119/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1810-1822',
        any: [/ELSEIF TALENT:阴茎的状态 == 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1823-1833',
        any: [/ELSEIF TALENT:122/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1835-1838',
        any: [/IF TALENT:248/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1840-1849',
        any: [/SELECTCASE RAND:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1851-1860',
        any: [/SELECTCASE RAND:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1862-1871',
        any: [/PRINT 『因为萝莉的小穴而兴奋』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1873-1883',
        any: [/SELECTCASE RAND:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1885-1895',
        any: [/PRINT 『长枪体内过，腹中婴儿来』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1897-1928',
        any: [/PRINTFORM 『记住%SAVESTR:TARGET%这个名字哦！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1906-1912',
        any: [/PRINT 『喜欢一边被殴打，一边被侵犯』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1911-1912',
        any: [/PRINT 『我们的目标是——黑木耳』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1918-1919',
        any: [/PRINT 『请侵犯来自遥远农村的私处』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1930-2036',
        any: [/PRINTFORM 『小%SAVESTR:TARGET%在怀孕期间也性欲旺盛着』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '1974-1975',
        any: [/PRINT 『月经已停』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2003-2006',
        any: [/PRINT 『小穴变一层层了』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2022',
        any: [/SIF !TALENT:122 && TALENT:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2042-2050',
        any: [/CFLAG:665 \+= COUNT_S - COUNT_V - COUNT_A - COUNT_F - COUNT_B/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2051-2118',
        any: [/FOR LOCAL, 0, CFLAG:\(661\+COUNT\) \/5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2120-2127',
        any: [/PRINT 『祝贺！达成了五十！！！』/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2128-2129',
        any: [/PRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2129',
        any: [/PRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2129-2133',
        any: [/PRINTFORML %SAVESTR:TARGET%被各种侮辱的涂鸦写在身上了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2131',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2135-2310',
        any: [/PRINTFORM 被拘束着的%SAVESTR:TARGET%，抬起了屁股，被/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2176-2177',
        any: [/PILLORY_USER = 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2313-2379',
        any: [
          /LOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* \(10 \+ TALENT:0 \+ TALENT:15 \+ TALENT:24 \+ TALENT:30 \+ TALENT:163 \) \/ 2/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2388',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的身体，被弄了\{CFLAG:661\+CFLAG:662\+CFLAG:663\+CFLAG:664\+CFLAG:665\}次，精液流得到处都是……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2390',
        any: [/CALL CAMPAIGN_EXP_PILLORY,TARGET/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2392',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2394-2416',
        any: [/PRINTFORMW %SAVESTR:TARGET%的精神达到极限了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2403',
        any: [/CFLAG:1 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2404',
        any: [/CFLAG:777 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2418-2423',
        any: [/CALL CONCEPTION_CHECK_SYOKU_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2418-2426',
        any: [/CALL CONCEPTION_CHECK_SYOKU_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2419-2426',
        any: [/CALL CONCEPTION_CHECK_SYOKU_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2420',
        any: [/CFLAG:107 \+= COUNT_V/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2421',
        any: [/CALL IN_VAGINA_SYOKU_TO_T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '2422',
        any: [/CALL CONCEPTION_CHECK_SYOKU_TO_T/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
