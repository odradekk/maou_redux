// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-colosseum.mjs

export const FILES = [
  {
    js: 'ere/system/train/com-colosseum.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '8-37',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '10',
        any: [/PRINTL\ 死斗场决斗/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '11',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '13-16',
        any: [/TEQUIP:55\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '17-34',
        any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '21',
        any: [/A\ =\ 100/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '24-25',
        any: [/TIMES\ A\ ,\ 2\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '27-28',
        any: [/TIMES\ A\ ,\ 0\.60/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '30-31',
        any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '33',
        any: [/UP:10\ \+=\ A\ \*\ 20/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '34',
        any: [/SOURCE:14\ \+=\ A\ \*\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '36',
        any: [/T\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '37',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '40-68',
        any: [/TIMES\ SOURCE:17\ ,\ 2\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '73-95',
        any: [/IF\ BASE:ASSI:1\ <\ \(MAXBASE:ASSI:1\ \/\ 5\)/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '74-78',
        any: [/IF\ BASE:TARGET:1\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '81',
        any: [/PRINTL\ ＜奴隶陷落＞/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '83',
        any: [/TFLAG:401\ =\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '85-90',
        any: [/IF\ BASE:ASSI:1\ <\ \(MAXBASE:ASSI:1\ \/\ 5\)/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '87',
        any: [/PRINTL\ ＜助手退却＞/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '88',
        any: [/ASSIPLAY\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '93',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '98-119',
        any: [/CALL\ WEAPON_RESTORE,TARGET/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '99',
        any: [/A\ =\ TARGET/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '101',
        any: [/CALL\ WEAPON_RESTORE,TARGET/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '102',
        any: [/B\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '104-105',
        any: [/B\ \+=\ CFLAG:A:11/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '106-107',
        any: [/B\ \+=\ CFLAG:A:12/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '109-110',
        any: [/SIF\ TALENT:A:241\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '111-112',
        any: [/SIF\ TALENT:A:250\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '114-116',
        any: [/B\ \/=\ MAXBASE:A:1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '118-119',
        any: [/SIF\ B\ <=\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '126-148',
        any: [/CALL\ WEAPON_RESTORE,ASSI/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '127',
        any: [/A\ =\ ASSI/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '129',
        any: [/CALL\ WEAPON_RESTORE,ASSI/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '130',
        any: [/B\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '132-133',
        any: [/B\ \+=\ CFLAG:A:11/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '134-135',
        any: [/B\ \+=\ CFLAG:A:12/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '137-138',
        any: [/SIF\ TALENT:A:241\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '139-140',
        any: [/SIF\ TALENT:A:250\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '142-143',
        any: [/B\ \*=\ \(BASE:A:1\ \/\ 100\)/m],
      },
      {
        src: 'target/ERB/調教相關/COMF200_コロシアム.ERB',
        ref: '145-146',
        any: [/SIF\ B\ <=\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '8-118',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '10-11',
        any: [/SIF\ ASSI\ !=\ PLAYER/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '13',
        any: [/PRINTL\ 助手/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '15',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '20-23',
        any: [/LOSEBASE:1\ \+=\ RESULT\ \*\ 10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '20',
        any: [/CALL\ ARENA_ASSI_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '22-23',
        any: [/LOSEBASE:1\ \+=\ RESULT\ \*\ 10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '27',
        any: [/CALL\ ARENA_SLAVE_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '30-45',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:ASSI%发出痛恨的一击，将%SAVESTR:TARGET%的武器打掉了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '32-34',
        any: [/PRINTFORMW\ %SAVESTR:ASSI%将%SAVESTR:TARGET%踩在脚下。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '37-38',
        any: [/LOSEBASE:1\ \+=\ C\ \*\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '39-42',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:ASSI%发出痛恨的一击，将%SAVESTR:TARGET%的武器打掉了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '44-47',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%对%SAVESTR:ASSI%进行了反击。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '52',
        any: [/TFLAG:400\ =\ 201/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '54',
        any: [/CALL\ COM_AFTER_ARENA/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '55-56',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '58-59',
        any: [/SIF\ ASSI\ !=\ PLAYER/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '64-115',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '65',
        any: [/PRINTL\ 对哪里进行凌辱？/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '66-67',
        any: [
          /SIF\ TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '68',
        any: [/PRINTL\ \[1\]\ \-\ 胸部/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '69-70',
        any: [
          /SIF\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '71-72',
        any: [
          /SIF\ TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '73',
        any: [/PRINTL\ \[999\]\ 暂时放过/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '75',
        any: [/INPUT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '77-85',
        any: [
          /IF\ RESULT\ ==\ 0\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '82-83',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '85',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '86-91',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '91',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '92-103',
        any: [
          /ELSEIF\ RESULT\ ==\ 2\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)\ \&\&\ TALENT:122\ ==\ 0\ \&\&\ TALENT:273\ ==\ 0\ \&\&\ CFLAG:42\ !=\ 79\ \ \&\&\ \(!TALENT:135\ \|\|\ TALENT:ASSI:83\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '94-95',
        any: [/SIF\ TALENT:122/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '100-101',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '103',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '104-109',
        any: [
          /ELSEIF\ RESULT\ ==\ 3\ \&\&\ \(TALENT:ASSI:121\ ==\ 1\ \|\|\ TALENT:ASSI:122\ ==\ 1\ \|\|\ ITEM:PBAND\ ==\ 1\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '109',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \*\ 5\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '110-112',
        any: [/PRINTFORMW\ %NAME:MASTER%叫%SAVESTR:ASSI%退下了……/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '113-114',
        any: [/GOTO\ INPUT_LOOP_0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '117',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '17-43',
        any: [
          /PRINTFORMW\ 连地下城中最低等最卑微的种族都打不过，手足无措的%SAVESTR:TARGET%被无情地嘲笑着。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '9',
        any: [/PRINTL\ 最下层居民/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '11',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '17-20',
        any: [/CALL\ ARENA_SLAVE_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '20',
        any: [/CALL\ ARENA_SLAVE_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '21-38',
        any: [
          /PRINTFORMW\ 连地下城中最低等最卑微的种族都打不过，手足无措的%SAVESTR:TARGET%被无情地嘲笑着。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '23-25',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%无法抵抗，被嘲笑了。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '29-30',
        any: [/LOSEBASE:1\ \+=\ 200/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '31-34',
        any: [/PRINTFORMW\ 终于，%SAVESTR:TARGET%倒下了。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '36-38',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%蹂躏着最下层居民，打得他们满地打滚，这个已经不能被称为战斗了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '43',
        any: [/TFLAG:400\ =\ 202/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '45',
        any: [/CALL\ COM_AFTER_ARENA/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '46-47',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '52-101',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '53',
        any: [/PRINTL\ 对哪里进行凌辱？/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '54',
        any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '55',
        any: [/PRINTL\ \[1\]\ \-\ 胸部/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '56-57',
        any: [/SIF\ !TALENT:122\ \&\&\ !TALENT:273\ \&\&\ CFLAG:42\ !=\ 79/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '58',
        any: [/PRINTL\ \[3\]\ \-\ 肛门/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '59',
        any: [/PRINTL\ \[999\]\ 暂时放过/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '61',
        any: [/INPUT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '63-71',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '67-69',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '71',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '72-77',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '77',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '78-89',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '80-81',
        any: [
          /SIF\ TALENT:122\ \|\|\ TALENT:273\ \|\|\ \(CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ FLAG:37\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '85-87',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '89',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '90-95',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '95',
        any: [/TFLAG:402\ \+=\ LOSEBASE:0\ \+\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '96-98',
        any: [/PRINTFORMW\ %SAVESTR:MASTER%让最下层居民退下了……/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '99-100',
        any: [/GOTO\ INPUT_LOOP_0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '103-289',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '107-108',
        any: [/SIF\ MAXBASE:MASTER:4\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '110',
        any: [/B\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '112-125',
        any: [/ELSEIF\ ABL:12\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '127-141',
        any: [/ELSEIF\ ABL:10\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '143-157',
        any: [/ELSEIF\ PALAM:5\ <\ PALAMLV:2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '159-177',
        any: [/ELSEIF\ SELECTCOM\ ==\ 21/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '179',
        any: [/BASE:MASTER:4\ \+=\ B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '181',
        any: [/S\ =\ BASE:MASTER:4/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '182',
        any: [/EJAC\ =\ MAXBASE:MASTER:4/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '184-190',
        any: [/IF\ \ S\ >\ EJAC\ \*\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '192-224',
        any: [/TIMES\ SOURCE:4\ ,\ 3\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '194',
        any: [/TIMES\ SOURCE:4\ ,\ 3\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '196-224',
        any: [/TIMES\ SOURCE:5\ ,\ 2\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '226',
        any: [/EXP:20\ \+=\ 3/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '227',
        any: [/PRINTL\ 怪物大量射精/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '228',
        any: [/PRINTL\ 精液经验＋３/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '230',
        any: [/BASE:MASTER:4\ \-=\ EJAC\*2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '231-232',
        any: [/SIF\ BASE:MASTER:4\ >=\ EJAC/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '233-235',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '236-238',
        any: [/SIF\ SELECTCOM\ ==\ 31/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '239-241',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 27/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '244',
        any: [/EXP:20\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '245',
        any: [/PRINTL\ 怪物射精/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '246',
        any: [/PRINTL\ 精液经验＋１/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '248',
        any: [/BASE:MASTER:4\ \-=\ EJAC/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '249-250',
        any: [/SIF\ BASE:MASTER:4\ >=\ EJAC/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '251-253',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 34/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '254-256',
        any: [/SIF\ SELECTCOM\ ==\ 31/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '257-259',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \|\|\ SELECTCOM\ ==\ 27/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '267-284',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \&\&\ E\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '267-268',
        any: [/SIF\ SELECTCOM\ ==\ 21/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '269-270',
        any: [/SIF\ SELECTCOM\ ==\ 27/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '271-272',
        any: [/SIF\ SELECTCOM\ ==\ 30/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '273-274',
        any: [/SIF\ SELECTCOM\ ==\ 31/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '275-276',
        any: [/SIF\ SELECTCOM\ ==\ 37/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '277-278',
        any: [/SIF\ SELECTCOM\ ==\ 21\ \&\&\ E\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '279-280',
        any: [/SIF\ SELECTCOM\ ==\ 27\ \&\&\ E\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '281-282',
        any: [/SIF\ SELECTCOM\ ==\ 30\ \&\&\ E\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '283-284',
        any: [/SIF\ SELECTCOM\ ==\ 31\ \&\&\ E\ >\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '287',
        any: [/TFLAG:15\ =\ E/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '289',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF204_オーク.ERB',
        ref: '35',
        any: [/PRINTL\ ＜奴隶陷落＞/m],
      },
      {
        src: 'target/ERB/調教相關/COMF206_トロル.ERB',
        ref: '98-99',
        any: [/PRINTFORMW\ %SAVESTR:MASTER%让巨魔退下了……/m],
      },
      {
        src: 'target/ERB/調教相關/COMF206_トロル.ERB',
        ref: '108-126',
        any: [/IF\ EXP:52\ ==\ 0\ \&\&\ SELECTCOM\ ==\ 21/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '9-63',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被媚药史莱姆包裹着，完全无法抵抗了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '9',
        any: [/PRINTL\ 媚药史莱姆/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '11',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '16-18',
        any: [/LOSEBASE:1\ \+=\ CFLAG:0:9\ \*\ 10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '18',
        any: [/CALL\ ARENA_SLAVE_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '21-38',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被媚药史莱姆包裹着，完全无法抵抗了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '28-30',
        any: [
          /PRINTFORMW\ 然后，%SAVESTR:TARGET%被淹没在媚药史莱姆的体内了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '31',
        any: [/ENDIF/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '40',
        any: [/TFLAG:400\ =\ 207/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '42',
        any: [/CALL\ COM_AFTER_ARENA/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '43-44',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '46-79',
        any: [
          /PRINTFORMW\ 在倒下的%SAVESTR:TARGET%私处里，灌入了大量的粘液，从阴唇到子宫都灌满了。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '47',
        any: [/PRINTL\ 把粘液灌到哪里？？/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '48',
        any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '49-50',
        any: [/SIF\ TALENT:122\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '51',
        any: [/PRINTL\ \[2\]\ \-\ 肛门/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '52',
        any: [/PRINTL\ \[999\]\ 暂时放过/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '54',
        any: [/INPUT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '56-59',
        any: [/PRINTFORMW\ 在倒下的%SAVESTR:TARGET%嘴里，灌入了大量的粘液。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '63-65',
        any: [/SIF\ TALENT:122/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '68-74',
        any: [
          /PRINTFORMW\ 在倒下的%SAVESTR:TARGET%肛门里，灌入了大量的粘液。/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '77',
        any: [/ELSEIF\ RESULT\ ==\ 999/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '78-79',
        any: [/GOTO\ INPUT_LOOP_0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '82',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4650-4755',
        any: [
          /SIF\ TEQUIP:55\ ==\ 0\ \&\&\ \(TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17\ \|\|\ TEQUIP:19\ \|\|\ TEQUIP:43\ \|\|\ TEQUIP:44\ \|\|\ TEQUIP:45\ \|\|\ TEQUIP:46\|\|\ TEQUIP:49\ \|\|\ TEQUIP:54\ \|\|\ TEQUIP:89\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4654-4655',
        any: [
          /SIF\ TEQUIP:55\ ==\ 0\ \&\&\ \(TEQUIP:11\ \|\|\ TEQUIP:13\ \|\|\ TEQUIP:14\ \|\|\ TEQUIP:15\ \|\|\ TEQUIP:16\ \|\|\ TEQUIP:17\ \|\|\ TEQUIP:19\ \|\|\ TEQUIP:43\ \|\|\ TEQUIP:44\ \|\|\ TEQUIP:45\ \|\|\ TEQUIP:46\|\|\ TEQUIP:49\ \|\|\ TEQUIP:54\ \|\|\ TEQUIP:89\)/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4657-4659',
        any: [/SIF\ TEQUIP:54/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4661-4684',
        any: [/SIF\ ITEM:35\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4686-4687',
        any: [/@COM_ABLE201/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4688',
        any: [/SIF\ TEQUIP:55\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4693-4694',
        any: [/RETURN\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4695-4696',
        any: [/@COM_ABLE202/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4697',
        any: [/SIF\ TEQUIP:55\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4699',
        any: [/;助手じゃ駄目/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4705',
        any: [/@COM_ABLE203/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4712',
        any: [/RETURN\ 0/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3010-3027',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3011-3012',
        any: [/PRINTFORML\ %SAVESTR:PLAYER%把%SAVESTR:TARGET%带回了房间…/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3014-3026',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3016-3018',
        any: [/CALL\ PRINT_CLOTHTYPE_MAIN2/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3019-3021',
        any: [/ELSEIF\ CFLAG:40/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3022-3023',
        any: [/PRINT\ 全裸的/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3024-3025',
        any: [/IF\ BASE:1\ <=\ 0/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3026-3027',
        any: [
          /PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场。%SAVESTR:TARGET%已经完全没有战斗的力气了…/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3028-3029',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被带到了死斗场…/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3030-3032',
        any: [/PRINTW\ ……………/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3033-3037',
        any: [
          /PRINTFORMW\ 被下流的笑容和好奇的视线所包围、%SAVESTR:TARGET%在异样的气氛中沉默不语。/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '29-39',
        any: [/IF\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:42\ <=\ 50/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '127-146',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%的私处里、被灌入了怪物黏黏糊糊的精液…/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '113-125',
        any: [
          /PRINTFORML\ %SAVESTR:TARGET%全身上的触手、一起吐出了大量的体液…/m,
        ],
      },
      {
        src: 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB',
        ref: '59-120',
        any: [/CALL EQUIP_COM11/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '69-70',
        any: [/CFLAG:42 != 79  && \(!TALENT:135/m],
      },
      {
        src: 'target/ERB/調教相關/COMF201_助手.ERB',
        ref: '92',
        any: [/ELSEIF RESULT == 2 && \(TALENT:ASSI:121/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '56-57',
        any: [/SIF !TALENT:122 && !TALENT:273 && CFLAG:42 != 79/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '110-177',
        any: [/;ABL:技巧をみる/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '181-190',
        any: [/S = BASE:MASTER:4/m],
      },
      {
        src: 'target/ERB/調教相關/COMF202_最下層民.ERB',
        ref: '225-260',
        any: [/IF E == 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '63-68',
        any: [/対象が男人なら戻る/m],
      },
      {
        src: 'target/ERB/調教相關/COMF207_媚薬スライム.ERB',
        ref: '64-65',
        any: [/SIF TALENT:122/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '143-145',
        any: [/PRINTFORML\ %SAVESTR:TARGET%身上的触手、吐出了体液…/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
