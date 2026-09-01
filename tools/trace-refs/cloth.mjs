// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：cloth.mjs

export const FILES = [
  // —— #215 J5 服装：ere/system/train/cloth.js ——
  {
    js: 'ere/system/train/cloth.js',
    refs: [
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '161-221',
        any: [/^\s*@WEARING_CLOTH_ALL$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '226-239',
        any: [/^\s*@WEARING_CLOTH_ABLE$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '244-388',
        any: [/^\s*@AFTERTRAIN_CLOTH$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '393-405',
        any: [/^\s*@RE_CLOTHED$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '459-488',
        any: [/^\s*@SOILING_CLOTH_NO1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '493-525',
        any: [/^\s*@SOILING_CLOTH_NO2$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '786-787',
        any: [/^\s*CALL SOILING_CLOTH_NO1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '410-454',
        any: [/^\s*@WASHING_CLOTH$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '163-164',
        any: [/^\s*SIF CFLAG:41 == 0 && CFLAG:42 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '167',
        any: [/^\s*CFLAG:40 = 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '170-215',
        any: [/^\s*IF CFLAG:41 != 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '172',
        any: [/^\s*CFLAG:40 \|= 1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '174',
        any: [
          /^\s*SIF TALENT:116 == 0 && TALENT:135 == 0 && \(TALENT:132 == 0 \|\| TALENT:109 == 0\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '177-178',
        any: [
          /^\s*SIF \(CFLAG:40 & 2\) && \(CFLAG:41 == 202 \|\| CFLAG:41 == 254\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '180-185',
        any: [/^\s*SIF \(CFLAG:41 >= 191 && CFLAG:41 <= 200\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '187-188',
        any: [/^\s*SIF CFLAG:41 == 29$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '190-191',
        any: [/^\s*SIF \(CFLAG:40 & 1\) && CFLAG:42 == 69$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '194-209',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '212-213',
        any: [/^\s*SIF CFLAG:41 == 192$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '218-219',
        any: [/^\s*SIF CFLAG:42$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '228-239',
        any: [/^\s*SIF CFLAG:43 != 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '247-295',
        any: [/^\s*IF CFLAG:42 && \(TFLAG:45 & 32\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '249',
        any: [
          /^\s*PRINTFORMW （%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%被拿去扔掉了）$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '250',
        any: [/^\s*CFLAG:42 = 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '251',
        any: [/^\s*TFLAG:45 -= 32$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '253-254',
        any: [/^\s*SIF CFLAG:40 & 64$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '255-284',
        any: [
          /^\s*ELSEIF CFLAG:42 == 69 && \(TFLAG:45 & 16\) && CFLAG:47 == 0 && MONEY >= 50$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '258',
        any: [/^\s*PRINTFORML 花费50p为%SAVESTR:TARGET%换尿布吗？$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '259',
        any: [/^\s*PRINTL  \[0\] - 好的$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '260',
        any: [/^\s*PRINTL  \[1\] - 不要$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '261',
        any: [/^\s*INPUT$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '263',
        any: [/^\s*PRINTFORM （为%SAVESTR:TARGET%换上了新的尿布）$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '269',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '264',
        any: [/^\s*MONEY -= 50$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '265',
        any: [/^\s*EX_FLAG:4444 -= 50$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '266',
        any: [/^\s*CFLAG:47 = 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '267',
        any: [/^\s*TFLAG:45 -= 16$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '268-271',
        any: [/^\s*IF TALENT:135 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '273',
        any: [/^\s*WAIT$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '276',
        any: [/^\s*PRINTFORMW （把%SAVESTR:TARGET%的尿布拿去洗了）$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '277',
        any: [/^\s*CFLAG:47 = 2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '278',
        any: [/^\s*TFLAG:45 -= 16$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '280-281',
        any: [/^\s*SIF CFLAG:40 & 64$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '282-283',
        any: [/^\s*ELSE$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '285-294',
        any: [/^\s*ELSEIF CFLAG:42 && \(TFLAG:45 & 16\) && CFLAG:47 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '287',
        any: [/^\s*CFLAG:47 = 5$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '289-290',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '291',
        any: [/^\s*TFLAG:45 -= 16$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '293-294',
        any: [/^\s*SIF CFLAG:40 & 64$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '297-350',
        any: [/^\s*IF CFLAG:41 && \(TFLAG:45 & 8\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '298-305',
        any: [/^\s*PRINTFORM （%SAVESTR:TARGET%穿过的$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '300-301',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '302-303',
        any: [/^\s*ELSEIF CFLAG:41 <= 200$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '306-313',
        any: [/^\s*IF CFLAG:41 >= 201$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '315',
        any: [/^\s*CFLAG:46 = -2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '321',
        any: [/^\s*TFLAG:45 -= 8$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '323-349',
        any: [/^\s*ELSEIF CFLAG:41 && \(TFLAG:45 & 4\) && CFLAG:46 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '326-327',
        any: [/^\s*IF CFLAG:41 >= 1 && CFLAG:41 <= 100$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '328-329',
        any: [/^\s*ELSEIF CFLAG:41 <= 200$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '332-340',
        any: [/^\s*IF CFLAG:41 >= 201$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '342',
        any: [/^\s*CFLAG:46 = 3$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '348',
        any: [/^\s*TFLAG:45 -= 4$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '352-366',
        any: [/^\s*IF \(TFLAG:45 & 2\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '353',
        any: [/^\s*PRINTFORMW （%SAVESTR:TARGET%的内衣被拿去扔掉了）$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '354',
        any: [/^\s*CFLAG:43 = -2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '355-356',
        any: [/^\s*SIF CFLAG:40 & 1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '357',
        any: [/^\s*TFLAG:45 -= 2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '359-365',
        any: [/^\s*ELSEIF \(TFLAG:45 & 1\) && CFLAG:43 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '361',
        any: [/^\s*CFLAG:43 = 2$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '362-363',
        any: [/^\s*SIF CFLAG:40 & 1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '364',
        any: [/^\s*TFLAG:45 -= 1$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '369-381',
        any: [/^\s*IF CFLAG:41$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '370-371',
        any: [/^\s*SIF CFLAG:45 < 0 && CFLAG:46 < 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '373-374',
        any: [/^\s*SIF CFLAG:41 == 192 && CFLAG:46 < 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '376-377',
        any: [/^\s*SIF CFLAG:41 == 0 && CFLAG:40 & 3$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '379-380',
        any: [
          /^\s*ELSEIF \(CFLAG:41 == 1 \|\| CFLAG:41 == -1\) && !\(CFLAG:40 & 3\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '383-386',
        any: [/^\s*IF CFLAG:42$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '385',
        any: [/^\s*CFLAG:42 = 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '400',
        any: [/^\s*PRINTFORML （%SAVESTR:TARGET%把被脱掉的衣服又穿上了）$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '401',
        any: [/^\s*WAIT$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '473-480',
        any: [/^\s*PRINTFORM 《%SAVESTR:TARGET%正穿着$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '508-515',
        any: [/^\s*PRINTFORM 《%SAVESTR:TARGET%正穿着$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '461-462',
        any: [/^\s*SIF FLAG:37 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '465-471',
        any: [
          /^\s*IF \(CFLAG:40 & 64\) && \(CFLAG:42 <= 50 \|\| CFLAG:42 == 69\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '466',
        any: [
          /^\s*PRINTFORML 《%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%沾满了尿》$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '469-470',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '472-482',
        any: [/^\s*IF \(CFLAG:40 & 8\) \|\| \(CFLAG:40 & 16\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '480',
        any: [/^\s*PRINTFORML 沾满了尿》$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '483-486',
        any: [/^\s*IF \(CFLAG:40 & 1\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '484',
        any: [/^\s*PRINTFORML 《%SAVESTR:TARGET%的内衣沾满了尿》$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '495-496',
        any: [/^\s*SIF FLAG:37 == 0$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '499-506',
        any: [
          /^\s*IF \(CFLAG:40 & 64\) && \(CFLAG:42 <= 50 \|\| CFLAG:42 == 69\)$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '500',
        any: [
          /^\s*PRINTFORML 《%SAVESTR:TARGET%的%GET_CLOTHTYPE_SPECIAL\(\)%沾满了污物$/m,
        ],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '504-505',
        any: [/^\s*SIF CFLAG:42 == 69$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '507-518',
        any: [/^\s*IF \(CFLAG:40 & 8\) \|\| \(CFLAG:40 & 16\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '515',
        any: [/^\s*PRINTL 沾满了污物》$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '519-523',
        any: [/^\s*IF \(CFLAG:40 & 1\)$/m],
      },
      {
        src: 'target/ERB/其他/FUNC_CLOTH.ERB',
        ref: '520',
        any: [/^\s*PRINTFORML 《%SAVESTR:TARGET%的内衣沾满了污物》$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
