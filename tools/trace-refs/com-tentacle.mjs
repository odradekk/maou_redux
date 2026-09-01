// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-tentacle.mjs

export const FILES = [
  // —— #227（J17：触手与自由调教族 100-109 / 150 / 208） ——
  {
    js: 'ere/system/train/com-tentacle.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '6',
        any: [/PRINTL\ 召唤触手/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '8',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '9',
        any: [/PRINTL\ 触手/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '11',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '11-30',
        any: [/TEQUIP:90\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '14',
        any: [/LOSEBASE:0\ \+=\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '15',
        any: [/LOSEBASE:1\ \+=\ 50/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '16',
        any: [/LOSEBASE:0\ \+=\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '17',
        any: [/LOSEBASE:1\ \+=\ 100/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '18',
        any: [/SOURCE:18\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '19',
        any: [/CALL\ ARENA_SLAVE_POINT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '20',
        any: [/TFLAG:402\ \+=\ RAND:RESULT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '22',
        any: [/IF\ RESULT\ <\ \(10\ \*\ CFLAG:0:9\)/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '23',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%被触手弄的手足无措。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '24',
        any: [/LOSEBASE:0\ \+=\ 10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '25',
        any: [/LOSEBASE:1\ \+=\ 200/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '25-37',
        any: [/IF\ ABL:4\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '27',
        any: [/PRINTFORMW\ %SAVESTR:TARGET%一瞬间就把触手打倒了。/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '30',
        any: [/TFLAG:400\ =\ 208/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '32',
        any: [/CALL\ COM_AFTER_ARENA/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '33',
        any: [/TEQUIP:90\ =\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '33-34',
        any: [/SIF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '35-48',
        any: [/A\ =\ 100/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '37',
        any: [/PRINTL\ 对哪里进行凌辱？/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '38',
        any: [/PRINTL\ \[0\]\ \-\ 嘴巴/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '39',
        any: [/PRINTL\ \[1\]\ \-\ 胸部/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '40-41',
        any: [/SIF\ TALENT:122\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '40-52',
        any: [/IF\ ABL:40\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '42',
        any: [/PRINTL\ \[3\]\ \-\ 肛门/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '43',
        any: [/PRINTL\ \[999\]\ 暂时放过/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '45',
        any: [/INPUT/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '47-49',
        any: [/IF\ RESULT\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '50-52',
        any: [/ELSEIF\ RESULT\ ==\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '50-55',
        any: [/SIF\ TALENT:10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '55-56',
        any: [/SIF\ TALENT:122/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '57',
        any: [/LOSEBASE:0\ \+=\ A/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '57-58',
        any: [/SELECTCOM\ =\ 21/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '58',
        any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '59-61',
        any: [/ELSEIF\ RESULT\ ==\ 3/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '60',
        any: [/UP:10\ \+=\ A\ \*\ 20/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '60-61',
        any: [/PRINTS\ EXPNAME:40/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '61',
        any: [/SOURCE:14\ \+=\ A\ \*\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '62',
        any: [/EXP:40\ \+=\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF208_触手.ERB',
        ref: '62-67',
        any: [/ELSEIF\ RESULT\ ==\ 999/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '63',
        any: [/T\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF150_フリー調教.ERB',
        ref: '66',
        any: [/EXP:41\ \+=\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '69',
        any: [/PRINTL\ ＜触手调教中＞/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '71-84',
        any: [/A\ =\ 100/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '86-92',
        any: [/SIF\ TALENT:10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '94',
        any: [/LOSEBASE:0\ \+=\ A/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '95',
        any: [/LOSEBASE:1\ \+=\ A\ \*\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '97',
        any: [/UP:10\ \+=\ A\ \*\ 20/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '98',
        any: [/SOURCE:8\ \+=\ A\ \*\ 10/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '99',
        any: [/SOURCE:14\ \+=\ A\ \*\ 5/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '101',
        any: [/SOURCE:10\ \+=\ 2000/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '103',
        any: [/TIMES\ SOURCE:0\ ,\ 2\.00/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '107',
        any: [/TIMES\ SOURCE:13\ ,\ 1\.80/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '188',
        any: [/BASE:PLAYER:4\ \+=\ B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '203',
        any: [/EXP:20\ \+=\ 3/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '209',
        any: [/TFLAG:38\ =\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '231',
        any: [/TFLAG:15\ =\ E/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '236',
        any: [/EXP:50\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '240',
        any: [/T\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '241-242',
        any: [/PRINT\ 触手经验＋/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '243',
        any: [/EXP:55\ \+=\ T/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '244',
        any: [/T\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '285',
        any: [/PRINTL\ 触手口辱/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '287',
        any: [/CALL\ TRAIN_MESSAGE_B/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '289',
        any: [/LOSEBASE:0\ \+=\ 80/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '290',
        any: [/LOSEBASE:1\ \+=\ 100/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '292-296',
        any: [/IF\ CFLAG:16\ ==\ \-1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '298-335',
        any: [/IF\ ABL:16\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '339',
        any: [/TEQUIP:98\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '341',
        any: [/TEQUIP:98\ =\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '342-343',
        any: [/STAIN:0\ \|=\ 2/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '345',
        any: [/T\ =\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '347',
        any: [/EXP:22\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '348',
        any: [/PRINTL\ 口交经验＋１/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '354',
        any: [/PRINTL\ ＜触手口辱中＞/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '356-357',
        any: [/LOSEBASE:0\ \+=\ 40/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '363-400',
        any: [/IF\ ABL:16\ ==\ 0/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '402',
        any: [/EXP:22\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/調教相關/COMF100_触手召喚.ERB',
        ref: '404',
        any: [/T\ \+=\ 1/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3002',
        any: [/PRINTL/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3548',
        any: [/@COM_ABLE100/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4623',
        any: [/@COM_ABLE150/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '4760',
        any: [/@COM_ABLE208/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
