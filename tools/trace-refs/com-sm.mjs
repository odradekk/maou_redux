// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-sm.mjs

export const FILES = [
  // —— #223（J13：SM 系指令族 40-49——@COM/@COM_ABLE/@EQUIP_COM/TRAIN_MESSAGE/CASE 40）——
  {
    js: 'ere/system/train/com-sm.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '7-69',
        any: [/PRINTL 打屁股/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '7-59',
        any: [/PRINTL 鞭/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '7-89',
        any: [/PRINTL 眼罩/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '95-189',
        any: [/PRINTL ＜眼罩装着中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '7-104',
        any: [/PRINTL 触手紧缚/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '110-190',
        any: [/PRINTL ＜触手紧缚中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '7-44',
        any: [/PRINTL 口塞/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '50-116',
        any: [/PRINTL ＜口塞装备中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '7-197',
        any: [/PRINTL 触手灌肠/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '203-352',
        any: [/PRINTL ＜灌肠触手插入中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '7-32',
        any: [/PRINTL 束缚衣/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '38-126',
        any: [/PRINTFORML ＜%SAVESTR:ASSI%束缚衣着/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '7-102',
        any: [/PRINTL 践踏/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '108-122',
        any: [/PRINTFORML %SAVESTR:PLAYER%的阴茎/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '7-142',
        any: [/PRINTL 肛门电极/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '148-296',
        any: [/PRINTL ＜肛门电极插入中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1878-2238',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1742-1900',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1208-1272',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '605-626',
        any: [/IF \(ASSIPLAY && TFLAG:50\) \|\| \(/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '12-15',
        any: [/LOCAL = 40/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '18',
        any: [/PRINTL 打屁股/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '20',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '22-24',
        any: [/LOSEBASE:0 \+= 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '26-43',
        any: [/SOURCE:12 = 200/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '29',
        any: [/SOURCE:12 = 200/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '30',
        any: [/SOURCE:14 = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '32-43',
        any: [/IF PALAM:9 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '45-56',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '48-56',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '58-59',
        any: [/SIF ASSIPLAY == 0 && ABL:21 >=/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '61-67',
        any: [/PRINTFORML %EXPNAME:23%\+\{E\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF40_スパンキング.ERB',
        ref: '69',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '9',
        any: [/PRINTL 鞭/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '14-15',
        any: [/LOSEBASE:0 \+= 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '17-33',
        any: [/SOURCE:14 = 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '20',
        any: [/SOURCE:14 = 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '22-33',
        any: [/IF PALAM:9 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '38-46',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '48-49',
        any: [/SIF ASSIPLAY == 0 && ABL:21 >=/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '51-57',
        any: [/PRINTFORML %EXPNAME:23%\+\{E\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF41_鞭.ERB',
        ref: '59',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '9',
        any: [/PRINTL 针/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '14-15',
        any: [/LOSEBASE:0 \+= 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '17-33',
        any: [/SOURCE:14 = 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '20',
        any: [/SOURCE:14 = 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '24-35',
        any: [/SOURCE:6 = 3000/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '38-44',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '46-47',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '51-57',
        any: [/PRINTFORML %EXPNAME:23%\+\{E\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF42_針.ERB',
        ref: '59',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '9',
        any: [/PRINTL 眼罩/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '13',
        any: [/LOSEBASE:0 \+= 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '14-21',
        any: [/IF EXP:51 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '23-78',
        any: [/SOURCE:10 = 250/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '26-28',
        any: [/SOURCE:10 = 250/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '30-71',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '73-75',
        any: [/SIF TALENT:80/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '26',
        any: [/SOURCE:10 = 250/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '27',
        any: [/SOURCE:12 = 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '28',
        any: [/SOURCE:14 = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '76-78',
        any: [/SIF TALENT:10/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '80-84',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '83',
        any: [/EXP:51 \+= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '84',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '86-87',
        any: [/TEQUIP:43 = 1 - TEQUIP:43/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '89',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '8-15',
        any: [/PRINTL 触手紧缚/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '16',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '18-28',
        any: [/IF EXP:51 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '30-83',
        any: [/SOURCE:6 = 800/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '33',
        any: [/SOURCE:6 = 800/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '34',
        any: [/SOURCE:10 = 800/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '35',
        any: [/SOURCE:13 = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '36',
        any: [/SOURCE:14 = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '81-83',
        any: [/SIF TALENT:80/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '85-89',
        any: [/PRINTL 紧缚经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '88',
        any: [/EXP:51 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '89',
        any: [/PRINTL 紧缚经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '91-94',
        any: [/TEQUIP:44 = 1 - TEQUIP:44/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '96-102',
        any: [/PRINTFORML %EXPNAME:23%\+\{E\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '104',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '9',
        any: [/PRINTL 口塞/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '13-23',
        any: [/IF EXP:51 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '25-33',
        any: [/SOURCE:6 = 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '28',
        any: [/SOURCE:6 = 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '29',
        any: [/SOURCE:7 = 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '30',
        any: [/SOURCE:12 = 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '31',
        any: [/SOURCE:13 = 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '32',
        any: [/SOURCE:14 = 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '33',
        any: [/SOURCE:16 = 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '35-39',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '38',
        any: [/EXP:51 \+= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '39',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '41-42',
        any: [/TEQUIP:45 = 1 - TEQUIP:45/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '44',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '9-15',
        any: [/PRINTL 触手灌肠/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '16',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '18',
        any: [/LOSEBASE:0 \+= 60/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '19',
        any: [/LOSEBASE:1 \+= 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '21-155',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '24-43',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '45-82',
        any: [/IF ABL:21 < 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '84-100',
        any: [/IF PALAM:3 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '102-128',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '102-113',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '115-128',
        any: [/IF ABL:10 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '130-138',
        any: [/SIF TALENT:99/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '140-150',
        any: [/IF TALENT:105/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '152-155',
        any: [/IF EXP:0 == 0 && TALENT:30/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '157-161',
        any: [/PRINTL 肛门经验＋5/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '160',
        any: [/EXP:1 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '161',
        any: [/PRINTL 肛门经验＋5/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '163-180',
        any: [/PRINTFORML 异常经验\+\{X\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '173',
        any: [/PRINTFORML 异常经验\+\{X\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '175-179',
        any: [/PRINTL 异常经验\+1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '182-184',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '185-188',
        any: [/IF TEQUIP:46 == 0 && TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '190-192',
        any: [/SIF TEQUIP:46 && FLAG:37/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '194-195',
        any: [/TEQUIP:46 = 1 - TEQUIP:46/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '197',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '16-19',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '9',
        any: [/PRINTL 束缚衣/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '13-17',
        any: [/IF TEQUIP:47/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '19',
        any: [/LOSEBASE:0 \+= 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '20-27',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '29-30',
        any: [/TEQUIP:47 = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '32',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '9',
        any: [/PRINTL 践踏/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '13',
        any: [/LOSEBASE:0 \+= 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '14',
        any: [/LOSEBASE:1 \+= 60/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '16-56',
        any: [/SOURCE:12 = 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '19',
        any: [/SOURCE:12 = 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '20',
        any: [/SOURCE:14 = 400/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '22-35',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '37-56',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '62-86',
        any: [/PRINTFORML %EXPNAME:30%\+3/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '67',
        any: [/PRINTFORML %EXPNAME:30%\+3/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '70',
        any: [/PRINTFORML %EXPNAME:30%\+2/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '73',
        any: [/PRINTFORML %EXPNAME:30%\+1/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '77-86',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '88',
        any: [/CALL EVENT_SEITSU_ASIKOKI/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '90-100',
        any: [/PRINTFORML %EXPNAME:23%\+\{E\}/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '102',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '109',
        any: [/A = NO:PLAYER/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '110-112',
        any: [/SIF \(TALENT:121 == 0 && TALENT/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '113-115',
        any: [/SIF ABL:0 <= 4 \|\| TEQUIP:90 \|\|/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '116-118',
        any: [/SIF RELATION:TARGET:A < 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '119',
        any: [/PRINTFORML %SAVESTR:PLAYER%的阴茎/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '120',
        any: [/TALENT:135 = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF48_足コキする.ERB',
        ref: '122',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '9',
        any: [/PRINTL 肛门电极/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '16',
        any: [/LOSEBASE:0 \+= 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '17',
        any: [/LOSEBASE:1 \+= 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '13-131',
        any: [/LOSEBASE:0 \+= 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '19-38',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '40-59',
        any: [/IF EXP:1 < EXPLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '61-77',
        any: [/IF PALAM:3 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '79-105',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '79-90',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '92-105',
        any: [/IF ABL:10 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '83-88',
        any: [/TIMES SOURCE:2 , 0\.90/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '117-127',
        any: [/IF TALENT:105/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '129-131',
        any: [/IF EXP:0 == 0 && TALENT:30/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '133-137',
        any: [/PRINTL 肛门经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '136',
        any: [/EXP:1 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '137',
        any: [/PRINTL 肛门经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '139-140',
        any: [/TEQUIP:49 = 1 - TEQUIP:49/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '142',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '97',
        any: [/PRINTL ＜眼罩装着中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '99',
        any: [/LOSEBASE:0 \+= 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '100-107',
        any: [/IF EXP:51 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '112-114',
        any: [/A = 250/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '116-157',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '159-161',
        any: [/SIF TALENT:80/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '162-164',
        any: [/SIF TALENT:10/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '166-168',
        any: [/SOURCE:10 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '170-171',
        any: [/UP:5 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '173-187',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '176-184',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '186-187',
        any: [/PRINTL 紧缚经验＋１/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '189',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF43_アイマスク.ERB',
        ref: '132-145',
        any: [/ELSEIF ABL:10 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '111-115',
        any: [/PRINTL ＜触手紧缚中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '120-130',
        any: [/IF EXP:51 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '132-145',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '147-149',
        any: [/SIF TALENT:80/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '151-162',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '164-167',
        any: [/SOURCE:6 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '169-189',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '172-180',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '182-183',
        any: [/SIF ASSIPLAY == 0 && ABL:21 >=/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '185-186',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '188-189',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '189',
        any: [/PRINTL 紧缚经验＋２/],
      },
      {
        src: 'target/ERB/調教相關/COMF44_縄.ERB',
        ref: '69-82',
        any: [/ELSEIF ABL:21 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '52',
        any: [/PRINTL ＜口塞装备中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '54-64',
        any: [/IF EXP:51 < EXPLV:3/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '55',
        any: [/IF EXP:51 < EXPLV:3/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '69-82',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '84-95',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '97-100',
        any: [/SOURCE:12 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '102-116',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '105-113',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '115',
        any: [/EXP:51 \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF45_ボールギャグ.ERB',
        ref: '116',
        any: [/PRINTL 紧缚经验＋１/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '204-208',
        any: [/PRINTL ＜灌肠触手插入中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '210',
        any: [/LOSEBASE:0 \+= 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '211',
        any: [/LOSEBASE:1 \+= 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '213-333',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '216-241',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '244-256',
        any: [/ELSEIF EXP:1 < EXPLV:3 \/ 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '258-274',
        any: [/IF PALAM:3 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '276-302',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '303-311',
        any: [/SIF TALENT:99/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '313-323',
        any: [/IF TALENT:105/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '325-328',
        any: [/SOURCE:2 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '328',
        any: [/SOURCE:14 \+= B/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '330-333',
        any: [/IF EXP:0 == 0 && TALENT:30/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '335-352',
        any: [/PRINTL 肛门经验＋３/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '338',
        any: [/EXP:1 \+= 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '339',
        any: [/PRINTL 肛门经验＋３/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '341-349',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '351-352',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '352',
        any: [/T \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF46_浣腸器＋プラグ.ERB',
        ref: '126',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '40',
        any: [/PRINTFORML ＜%SAVESTR:ASSI%束缚衣着/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '42-49',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '51-120',
        any: [/A = 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '54',
        any: [/A = 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '56-67',
        any: [/IF PALAM:10 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '69-97',
        any: [/IF ABL:21 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '74',
        any: [/TIMES A, 0\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '79',
        any: [/TIMES A, 1\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '84',
        any: [/TIMES A, 1\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '99-112',
        any: [/IF ABL:ASSI:20 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '114-116',
        any: [/SIF TALENT:10/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '118',
        any: [/SOURCE:14 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF47_ボンデージ装着.ERB',
        ref: '126',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '158-181',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '150',
        any: [/PRINTL ＜肛门电极插入中＞/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '152',
        any: [/LOSEBASE:0 \+= 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '153',
        any: [/LOSEBASE:1 \+= 120/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '155-279',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '184-198',
        any: [/TIMES A , 1\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '200-215',
        any: [/IF PALAM:3 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '217-243',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '245-253',
        any: [/SIF TALENT:99/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '255-265',
        any: [/IF TALENT:105/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '267-270',
        any: [/SOURCE:2 \+= A/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '272-275',
        any: [/IF EXP:0 == 0 && TALENT:30/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '277-291',
        any: [/PRINTL 肛门经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '280',
        any: [/EXP:1 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '281',
        any: [/PRINTL 肛门经验＋５/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '283-291',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '293-294',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF49_アナル電極.ERB',
        ref: '296',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1878-1901',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1881-1882',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1884-1888',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1890-1899',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1906-1938',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1909-1910',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1913-1914',
        any: [/SIF ITEM:10 == 0 && NOITEM == /],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1916-1920',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1922-1936',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1943-1975',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1946-1947',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1950-1951',
        any: [/SIF ITEM:11 == 0 && NOITEM == /],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1953-1957',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1959-1973',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1980-2001',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1983-1984',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1986-1987',
        any: [/SIF TFLAG:899 > 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1989-1990',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1993-1994',
        any: [/SIF TEQUIP:43/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1996-1997',
        any: [/SIF ITEM:5 == 0 && NOITEM == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '1999-2000',
        any: [/SIF TEQUIP:55/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2006-2038',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2009-2010',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2012-2021',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2024-2025',
        any: [/SIF TEQUIP:44/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2027-2028',
        any: [/SIF ITEM:14 == 0 && NOITEM == /],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2030-2031',
        any: [/SIF ABL:PLAYER:12 <= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2033-2036',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2043-2072',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2046-2047',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2049-2050',
        any: [/SIF TEQUIP:98/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2052-2053',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2056-2057',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2059-2060',
        any: [/SIF ITEM:9 == 0 && NOITEM == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2062-2065',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2067-2068',
        any: [/SIF TEQUIP:59/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2070-2071',
        any: [/SIF TEQUIP:55/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2077-2125',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2080-2081',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2083-2092',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2094-2095',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2097-2098',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2100-2101',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2103-2104',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2106-2107',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2109-2118',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2120-2121',
        any: [/SIF EXP:1 <= 25/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2123-2124',
        any: [/SIF ABL:10 \+ ABL:11 \+ ABL:17 </],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2130-2148',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2133-2134',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2136-2137',
        any: [/SIF TEQUIP:47/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2139-2140',
        any: [/SIF ITEM:23 == 0 && NOITEM == /],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2142-2143',
        any: [/SIF ASSIPLAY == 0 \|\| ASSI < 1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2145-2146',
        any: [/SIF ABL:ASSI:20 < 2/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2153-2188',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2156-2157',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2159-2160',
        any: [/SIF TALENT:121 == 0 && TALENT:/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2162-2166',
        any: [/IF ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2168-2177',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2179-2180',
        any: [/SIF \(CFLAG:40 & 17\) && FLAG:37/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2182-2183',
        any: [/SIF CFLAG:42 == 69 && \(CFLAG:4/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2185-2186',
        any: [/SIF CFLAG:42 == 11 && \(CFLAG:4/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2193-2238',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2196-2197',
        any: [/SIF FLAG:25 & 16/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2199-2208',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2210-2211',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2213-2214',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2216-2217',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2219-2220',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2222-2223',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2225-2234',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '2236-2237',
        any: [/SIF TEQUIP:58/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1742-1764',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1743-1751',
        any: [/PRINTFORM %SAVESTR:PLAYER%在/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1752',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1753-1763',
        any: [/PRINTFORML 一掌一掌地拍打着。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1757-1758',
        any: [/PRINTFORML %SAVESTR:TARGET%被打的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1759-1760',
        any: [/PRINTFORML %SAVESTR:TARGET%被打的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1765-1783',
        any: [/PRINTFORM %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1766-1772',
        any: [/PRINTFORM %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1773',
        any: [/IF CFLAG:42 == 11 && \(CFLAG:40/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1774-1782',
        any: [/PRINTFORML 里的%SAVESTR:TARGET%、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1784-1806',
        any: [/PRINTFORM %SAVESTR:PLAYER%、用针扎/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1785-1797',
        any: [/PRINTFORM %SAVESTR:PLAYER%、用针扎/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1790',
        any: [/PRINTFORM %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1792',
        any: [/PRINT 蓝色的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1794',
        any: [/PRINT 褐色的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1796',
        any: [/PRINT 白皙的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1798-1804',
        any: [/PRINTL 肌肤…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1807-1815',
        any: [/PRINTFORML %SAVESTR:TARGET%的眼罩/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1816-1830',
        any: [/PRINTFORM %SAVESTR:PLAYER%把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1831-1839',
        any: [/PRINTFORML %SAVESTR:TARGET%的口塞/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1840-1864',
        any: [/PRINTFORML %SAVESTR:TARGET%的肛塞/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1865-1882',
        any: [/PRINTFORML %SAVESTR:ASSI%脱掉了拘束/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1883-1891',
        any: [/PRINTFORM %SAVESTR:PLAYER%把%SA/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1892-1900',
        any: [/PRINTFORML %SAVESTR:TARGET%体内的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1229-1244',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1208-1252',
        any: [/PRINTFORML %SAVESTR:TARGET%发出了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1208',
        any: [/ELSEIF SELECTCOM == 40 \|\| SELE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1209-1221',
        any: [/A = UP:9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1223-1227',
        any: [/SIF TALENT:40/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1241-1242',
        any: [/PRINT 抽抽哒哒地哭着、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1245-1252',
        any: [/PRINTFORM 然而、%SAVESTR:TARGET%因/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1253-1272',
        any: [/PRINTFORML %SAVESTR:TARGET%的菊花/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
