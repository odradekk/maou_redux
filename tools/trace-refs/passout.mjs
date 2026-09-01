// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：passout.mjs

export const FILES = [
  {
    js: 'ere/system/train/passout.js',
    refs: [
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '14-89',
        any: [/^\s*;?\s*@PASSOUT_CHECK$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '398',
        any: [/^\s*;?\s*IF\ TEQUIP:13\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '91-283',
        any: [/^\s*;?\s*@PASSOUT_TEXT$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '482-497',
        any: [/^\s*;?\s*UP:13\ =\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '285-456',
        any: [/^\s*;?\s*@PASSOUT_MESSAGE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '457-485',
        any: [/^\s*;?\s*@PASSOUT_PALAM_CHECK$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '487-589',
        any: [/^\s*;?\s*@PASSOUT_PALAM_UP$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '591-602',
        any: [/^\s*;?\s*@PASSOUT_OUTDOOR$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '275-278',
        any: [
          /^\s*;?\s*失神回復時口上の呼び出し\ TFLAG:200が中身違うのでこれもスルーする$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '294',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '1-7',
        any: [/^\s*;?\s*﻿;eraIM@Sから流用$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '16',
        any: [/^\s*;?\s*SIF\ FLAG:70\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '18',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '20',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '25-34',
        any: [
          /^\s*;?\s*（失神中はカウントしない、「強絶頂か2箇所以上絶頂」を続けている限りランダムで外れてもフラグは維持）$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '33',
        any: [
          /^\s*;?\s*ELSEIF\ Z\ <\ 16\ \&\&\ TFLAG:897\ <\ 2\ \&\&\ TFLAG:899\ <\ 1$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '35',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '37-55',
        any: [/^\s*;?\s*A\ =\ PALAM:9$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '40-41',
        any: [
          /^\s*;?\s*一度に7500以上の苦痛を受けるか計15000ごとにランダムで失神（既に失神状態の場合はスキップ）$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '51',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '52-54',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '57-71',
        any: [/^\s*;?\s*TFLAG:895\ =\ 3$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '67',
        any: [/^\s*;?\s*失神中にコマンド実行$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '68-70',
        any: [
          /^\s*;?\s*IF\ TFLAG:896\ >=\ 2\ \|\|\ TFLAG:897\ >=\ 2\ \|\|\ TFLAG:898\ >=\ 2$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '73-81',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '83-89',
        any: [/^\s*;?\s*TFLAG:898\ =\ 3$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '88',
        any: [
          /^\s*;?\s*\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '95-100',
        any: [/^\s*;?\s*TFLAG:\(864\ \+\ COUNT\)\ =\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '107-156',
        any: [/^\s*;?\s*IF\ TFLAG:0\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '115-127',
        any: [/^\s*;?\s*IF\ TEQUIP:35\ ==\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '128',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '129-136',
        any: [/^\s*;?\s*IF\ TFLAG:2\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '137-138',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '139-150',
        any: [/^\s*;?\s*IF\ TFLAG:2\ \+\ TFLAG:6\ >=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '153-234',
        any: [/^\s*;?\s*ELSEIF\ SELECTCOM\ ==\ 102$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '236-237',
        any: [/^\s*;?\s*TFLAG:882\ =\ \(\-1\)$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '239-272',
        any: [/^\s*;?\s*IF\ TFLAG:899\ >=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '274-313',
        any: [/^\s*;?\s*CALL\ PASSOUT_MESSAGE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '286-292',
        any: [
          /^\s*;?\s*自分でもよく分からないくらいメチャクチャな上、下に進むほど大雑把$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '288-302',
        any: [/^\s*;?\s*IF\ TFLAG:60\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '304-455',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '304-322',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '323-354',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '355-383',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '384-391',
        any: [/^\s*;?\s*PRINTW\ 触手吐出的污液，和无法隐藏的困惑…$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '392-404',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '405-427',
        any: [/^\s*;?\s*ELSEIF\ TEQUIP:13\ ==\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '428-429',
        any: [/^\s*;?\s*PRINT\ 被装上了器具，$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '430-449',
        any: [/^\s*;?\s*PRINTFORMW\ 发现后开始感到困惑和恐惧了…$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '450-451',
        any: [
          /^\s*;?\s*X\ =\ TFLAG:867\ \+\ TFLAG:877\ \+\ TFLAG:878\ \+\ TFLAG:866\ \+\ TFLAG:879\ \+\ TFLAG:864\ \+\ TFLAG:865\ \+\ TFLAG:880\ \+\ TFLAG:881$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '452-458',
        any: [/^\s*;?\s*TIMES\ X\ ,\ \-1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '459-460',
        any: [/^\s*;?\s*TFLAG:883\ \+=\ UP:6$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '461-463',
        any: [/^\s*;?\s*TFLAG:885\ \+=\ UP:10$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '465-470',
        any: [/^\s*;?\s*ELSE$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '475-484',
        any: [/^\s*;?\s*UP:4\ =\ 0$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '509-514',
        any: [/^\s*;?\s*A\ \+=\ A\ \*\ G$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '515-527',
        any: [/^\s*;?\s*IF\ ABL:32\ ==\ 3$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '529-535',
        any: [/^\s*;?\s*E\ \+=\ E\ \*\ X$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '537-551',
        any: [/^\s*;?\s*D\ \+=\ D\ \*\ Y$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '557-563',
        any: [/^\s*;?\s*IF\ TFLAG:873\ >=\ 1$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '565-570',
        any: [/^\s*;?\s*ENDIF$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '572-577',
        any: [/^\s*;?\s*Z\ \/=\ 2$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '579-583',
        any: [/^\s*;?\s*UP:13\ \+=\ F\ \*\ Z\ \/\ 100$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '594',
        any: [/^\s*;?\s*PRINTFORMW\ %SAVESTR:TARGET%失神了，所以带回了房间…$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '595',
        any: [/^\s*;?\s*$/m],
      },
      {
        src: 'target/ERB/調教相關/PASSOUT.ERB',
        ref: '598-602',
        any: [/^\s*;?\s*BASE:MASTER:1\ \-=\ 10$/m],
      },
      {
        src: 'target/ERB/魔改新增/文本校正.ERB',
        ref: '1-7',
        any: [/^\s*;?\s*﻿@SHE\(ARG\)$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
