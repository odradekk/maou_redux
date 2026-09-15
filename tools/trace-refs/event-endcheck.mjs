// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-endcheck.mjs

export const FILES = [
  {
    // @ENDCHECK 主线剧情监测全链（#116：ENDRESET/ENDCHECKMAIN/ENDCHECKCHARA
    // / END 族分派循环 / ENDING_N 调用点 / END31 死引用）
    js: 'ere/event/event-endcheck.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '301-356',
        any: [/@ENDCHECK/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '310',
        any: [/^CALL ENDRESET$/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '312',
        any: [/^CALL ENDCHECKMAIN$/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '314-339',
        any: [/LOCAL:1 = EX_FLAG:2801 % 100/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '342',
        any: [/^CALL ENDCHECKCHARA$/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '344',
        any: [/^IF EX_FLAG:2801 != 99$/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '351-352',
        any: [/EX_FLAG:2801 == 99 && DAY:0 == 500/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '354-356',
        any: [/TRYCALL END31/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '241',
        any: [/^CALL ENDCHECK$/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '11-12',
        any: [/SIF NEXTDAY_COUNT == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '170-334',
        any: [/^@DEBUG_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TURNEND.ERB',
        ref: '237-308',
        any: [/EX_FLAG:2803 > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '1-35',
        any: [/@ENDRESET/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '3-5',
        any: [/GETCHARA\(17\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '6-8',
        any: [/GETCHARA\(20\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '9-11',
        any: [/GETCHARA\(21\) < 0 && EX_FLAG:2814 < 300/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '12-14',
        any: [/GETCHARA\(22\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '15-17',
        any: [/GETCHARA\(23\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '18-20',
        any: [/GETCHARA\(24\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '21-23',
        any: [/GETCHARA\(31\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '24-26',
        any: [/GETCHARA\(32\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '27-29',
        any: [/GETCHARA\(33\) < 0 && EX_FLAG:2814 < 500/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '30-32',
        any: [/FLAG:2815 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '33-35',
        any: [/GETCHARA\(35\) < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '38-63',
        any: [/^@ENDCHECKMAIN/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '42-44',
        any: [/DAY:0 == 500/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '46-47',
        any: [/MONEY > EX_FLAG:4444 \+ 8766/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '51-55',
        any: [/CFLAG:COUNTER:9 >= 5000/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '58-59',
        any: [/CFLAG:0:9 >= 1500/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '61-63',
        any: [/EX_FLAG:99 <= 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '64-140',
        any: [/^@ENDCHECKCHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '66-73',
        any: [/GETCHARA\(17\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '74-81',
        any: [/GETCHARA\(20\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '90-97',
        any: [/GETCHARA\(23\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '98-105',
        any: [/GETCHARA\(24\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '106-113',
        any: [/GETCHARA\(31\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '114-121',
        any: [/GETCHARA\(32\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '130-137',
        any: [/GETCHARA\(34\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '82-85',
        any: [/ENDCHECKSPADE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '86-89',
        any: [/ENDCHECKSQUARE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '122-129',
        any: [/ENDCHECKGODNESS_SKY_TEMPLE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '138-139',
        any: [/ENDCHECKPRINCESS/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '143-207',
        any: [/ENDCHECKSQUARE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '208-352',
        any: [/ENDCHECKSPADE/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '66-137',
        any: [/GETCHARA\(17\) > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDING ver 1.0.1.ERB',
        ref: '344-349',
        any: [/FOR LOCAL,2,16/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '166-168',
        any: [
          /\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && \(ABL:GETCHARA\(22\):10 \+ ABL:GETCHARA\(22\):16\) >= 14\n\t\t\tEX_FLAG:2811 = 40\n\t\t\tCFLAG:GETCHARA\(22\):515 = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '151',
        any: [
          /ELSEIF TALENT:GETCHARA\(22\):76 == 1 && \(\(EX_FLAG:2811 >= 30 && EX_FLAG:2811 <= 100\) \|\| \(EX_FLAG:2811 >= 300 && EX_FLAG:2811 <= 310\)\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '199',
        any: [/\tELSEIF EX_FLAG:2811 == 300/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '205',
        any: [/\t\tSIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '147-155',
        any: [
          /IF TALENT:GETCHARA\(22\):85 == 1 && EX_FLAG:2811 >= 100 && EX_FLAG:2811 <= 200\n\tEX_FLAG:2811 = 10\n\t;恋慕线起始1\n\tCFLAG:GETCHARA\(22\):515 = 0\nELSEIF TALENT:GETCHARA\(22\):76 == 1 && \(\(EX_FLAG:2811 >= 30 && EX_FLAG:2811 <= 100\) \|\| \(EX_FLAG:2811 >= 300 && EX_FLAG:2811 <= 310\)\)\n\tEX_FLAG:2811 = 110\n\t;淫乱线起始10\n\tCFLAG:GETCHARA\(22\):515 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '157-198',
        any: [
          /IF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):2 >= 2000 && EX_FLAG:2811 < 10\n\t\tEX_FLAG:2811 = 10\n\tELSEIF EX_FLAG:2811 >= 10 && EX_FLAG:2811 < 20\n\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):2 >= 5000\n\t\t\tEX_FLAG:2811 = 20\n\tELSEIF EX_FLAG:2811 >= 20 && EX_FLAG:2811 < 30\n\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):2 >= 10000\n\t\t\tEX_FLAG:2811 = 30\n\tELSEIF EX_FLAG:2811 >= 30 && EX_FLAG:2811 < 40\n\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && \(ABL:GETCHARA\(22\):10 \+ ABL:GETCHARA\(22\):16\) >= 14\n\t\t\tEX_FLAG:2811 = 40\n\t\t\tCFLAG:GETCHARA\(22\):515 = 0\n\tELSEIF EX_FLAG:2811 >= 40 && EX_FLAG:2811 < 50\n\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 10\n\t\t\t\tEX_FLAG:2811 = 50\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2811 >= 50 && EX_FLAG:2811 < 60\n\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 30\n\t\t\t\tEX_FLAG:2811 = 60\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2811 >= 60 && EX_FLAG:2811 < 70\n\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 60\n\t\t\t\tEX_FLAG:2811 = 70\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2811 >= 70 && EX_FLAG:2811 < 80\n\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 100\n\t\t\t\tEX_FLAG:2811 = 80\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2811 >= 80 && EX_FLAG:2811 < 90\n\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 150\n\t\t\t\tEX_FLAG:2811 = 90\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '158',
        any: [/\t\tEX_FLAG:2811 = 10/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '160-161',
        any: [
          /\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):2 >= 5000\n\t\t\tEX_FLAG:2811 = 20/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '163-164',
        any: [
          /\t\tSIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):2 >= 10000\n\t\t\tEX_FLAG:2811 = 30/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '167',
        any: [/\t\t\tEX_FLAG:2811 = 40/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '168',
        any: [/\t\t\tCFLAG:GETCHARA\(22\):515 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '170-171',
        any: [
          /\t\tIF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 10\n\t\t\t\tEX_FLAG:2811 = 50/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '173',
        any: [/\t\t\t\tCFLAG:GETCHARA\(22\):515 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '199-206',
        any: [
          /\tELSEIF EX_FLAG:2811 == 300\n\t\t;IF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 10\n\t\t;\t\tEX_FLAG:2811 = 310\n\t\t;\tELSE \n\t\t;\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\t;ENDIF\n\t\tSIF RAND:5 == 0\n\t\t\tEX_FLAG:2811 \+= 10/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '200-204',
        any: [
          /\t\t;IF TALENT:GETCHARA\(22\):85 == 1 && CFLAG:GETCHARA\(22\):515 >= 10\n\t\t;\t\tEX_FLAG:2811 = 310\n\t\t;\tELSE \n\t\t;\t\tCFLAG:GETCHARA\(22\):515 \+= 1\n\t\t;ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '210-233',
        any: [
          /\[SKIPSTART\]\nIF CFLAG:GETCHARA\(21\):1 == 9\n\tIF EX_FLAG:2814 >= 30 && EX_FLAG:2814 <=100\n\t\tEX_FLAG:2814 = 300\n\t\tSIF FLAG:1 == GETCHARA\(21\)\n\t\t\tFLAG:1 = -1\n\t\tSIF FLAG:2 == GETCHARA\(21\)\n\t\t\tG:2 = -1\n\n\t\t;前回の助手・調教対象より前だった場合はフラグを減算\n\t\tSIF FLAG:1 > GETCHARA\(21\)\n\t\t\tFLAG:1 -= 1\n\t\tSIF FLAG:2 > GETCHARA\(21\)\n\t\t\tFLAG:2 -= 1\n\n\t\tTARGET = FLAG:1\n\t\tASSI = FLAG:2\n\n\t\tCALL PARTY_CHAR_DEL, EX_FLAG:2803\n\t\tDELCHARA GETCHARA\(21\)\n\t\tCALL NAME_RESET\n\tENDIF\nENDIF\n\[SKIPEND\]/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '236',
        any: [/\tLOCAL:1 = \(EX_FLAG:2814 - 140\)\/10\*\(RAND:200 \+ 200\)/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '235-240',
        any: [
          /IF EX_FLAG:2814 >= 151\n\tLOCAL:1 = \(EX_FLAG:2814 - 140\)\/10\*\(RAND:200 \+ 200\)\n\tPRINTFORMW 银黑桃乳业获得的收入desu，一共\{LOCAL:1\}哟~\n\tMONEY \+= LOCAL:1\n\tEX_FLAG:4444 \+= LOCAL:1 \nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '237',
        any: [/\tPRINTFORMW 银黑桃乳业获得的收入desu，一共\{LOCAL:1\}哟~/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '238',
        any: [/\tMONEY \+= LOCAL:1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '239',
        any: [/\tEX_FLAG:4444 \+= LOCAL:1 /],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '243-251',
        any: [
          /IF TALENT:GETCHARA\(21\):85 == 1 && EX_FLAG:2814 >= 110 && EX_FLAG:2814 <= 200\n\tEX_FLAG:2814 = 30\n\t;恋慕线起始3\n\tCFLAG:GETCHARA\(21\):515 = 0\nELSEIF TALENT:GETCHARA\(21\):76 == 1 && EX_FLAG:2814 >= 30 && EX_FLAG:2814 <= 100\n\tEX_FLAG:2814 = 110\n\t;淫乱线起始11\n\tCFLAG:GETCHARA\(21\):515 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '253-301',
        any: [
          /IF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):2 >= 2000 && EX_FLAG:2814 < 10\n\t\tEX_FLAG:2814 = 10\n\tELSEIF EX_FLAG:2814 >= 10 && EX_FLAG:2814 < 20\n\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):2 >= 5000\n\t\t\tEX_FLAG:2814 = 20\n\tELSEIF EX_FLAG:2814 >= 20 && EX_FLAG:2814 < 30\n\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):2 >= 10000\n\t\t\tEX_FLAG:2814 = 30\n\tELSEIF EX_FLAG:2814 >= 30 && EX_FLAG:2814 < 40\n\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && \(ABL:GETCHARA\(21\):10 \+ ABL:GETCHARA\(21\):16\) >= 14\n\t\t\tEX_FLAG:2814 = 40\n\t\t\tCFLAG:GETCHARA\(21\):515 = 0\n\tELSEIF EX_FLAG:2814 >= 40 && EX_FLAG:2814 < 50\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 50\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 50 && EX_FLAG:2814 < 60\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 30\n\t\t\t\tEX_FLAG:2814 = 60\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 60 && EX_FLAG:2814 < 70\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 60\n\t\t\t\tEX_FLAG:2814 = 70\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 70 && EX_FLAG:2814 < 80\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 100\n\t\t\t\tEX_FLAG:2814 = 80\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 80 && EX_FLAG:2814 < 90\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 150\n\t\t\t\tEX_FLAG:2814 = 90\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 == 300\n\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 310\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '254',
        any: [/\t\tEX_FLAG:2814 = 10/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '256-257',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):2 >= 5000\n\t\t\tEX_FLAG:2814 = 20/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '259-260',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):2 >= 10000\n\t\t\tEX_FLAG:2814 = 30/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '262-264',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):85 == 1 && \(ABL:GETCHARA\(21\):10 \+ ABL:GETCHARA\(21\):16\) >= 14\n\t\t\tEX_FLAG:2814 = 40\n\t\t\tCFLAG:GETCHARA\(21\):515 = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '266-267',
        any: [
          /\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 50/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '269',
        any: [/\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '296-297',
        any: [
          /\t\tIF TALENT:GETCHARA\(21\):85 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 310/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '299',
        any: [/\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '303-351',
        any: [
          /IF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):2 >= 2000 && EX_FLAG:2814 < 10\n\t\tEX_FLAG:2814 = 110\n\t\tCFLAG:GETCHARA\(21\):515 = 0\n\tELSEIF EX_FLAG:2814 >= 110 && EX_FLAG:2814 < 120\n\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):2 >= 5000\n\t\t\tEX_FLAG:2814 = 120\n\tELSEIF EX_FLAG:2814 >= 120 && EX_FLAG:2814 < 130\n\t\tIF CFLAG:GETCHARA\(21\):515 >= 2\n\t\t\t\tEX_FLAG:2814 = 130\n\t\t\tELSE\n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 130 && EX_FLAG:2814 < 140\n\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):2 >= 10000\n\t\t\tEX_FLAG:2814 = 140\n\tELSEIF EX_FLAG:2814 >= 140 && EX_FLAG:2814 < 150\n\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && ABL:GETCHARA\(21\):1 == 10 && ABL:GETCHARA\(21\):17 == 5 && TALENT:GETCHARA\(21\):78 == 1 && TALENT:GETCHARA\(21\):0 == 0\n\t\t\tEX_FLAG:2814 = 150\n\t\t\tCFLAG:GETCHARA\(21\):515 = 0\n\tELSEIF EX_FLAG:2814 >= 150 && EX_FLAG:2814 < 160\n\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 160\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 160 && EX_FLAG:2814 < 170\n\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 30\n\t\t\t\tEX_FLAG:2814 = 170\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 170 && EX_FLAG:2814 < 180\n\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 60\n\t\t\t\tEX_FLAG:2814 = 180\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 180 && EX_FLAG:2814 < 190\n\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 100\n\t\t\t\tEX_FLAG:2814 = 190\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2814 >= 190 && EX_FLAG:2814 < 200\n\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 150\n\t\t\t\tEX_FLAG:2814 = 200\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '304-305',
        any: [/\t\tEX_FLAG:2814 = 110\n\t\tCFLAG:GETCHARA\(21\):515 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '307-308',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):2 >= 5000\n\t\t\tEX_FLAG:2814 = 120/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '310-314',
        any: [
          /\t\tIF CFLAG:GETCHARA\(21\):515 >= 2\n\t\t\t\tEX_FLAG:2814 = 130\n\t\t\tELSE\n\t\t\t\tCFLAG:GETCHARA\(21\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '316-317',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):2 >= 10000\n\t\t\tEX_FLAG:2814 = 140/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '319-320',
        any: [
          /\t\tSIF TALENT:GETCHARA\(21\):76 == 1 && ABL:GETCHARA\(21\):1 == 10 && ABL:GETCHARA\(21\):17 == 5 && TALENT:GETCHARA\(21\):78 == 1 && TALENT:GETCHARA\(21\):0 == 0\n\t\t\tEX_FLAG:2814 = 150/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '321',
        any: [/\t\t\tCFLAG:GETCHARA\(21\):515 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '323-324',
        any: [
          /\t\tIF TALENT:GETCHARA\(21\):76 == 1 && CFLAG:GETCHARA\(21\):515 >= 10\n\t\t\t\tEX_FLAG:2814 = 160/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '445-447',
        any: [
          /\tELSEIF\tEX_FLAG:2807 >= 160 && EX_FLAG:2807 < 170\n\n\t\t;该部分判定移动至aftertrain/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '356-357',
        any: [
          /SIF GETCHARA\(35\) > 0 && EX_FLAG:2807 == 0\n\tEX_FLAG:2807 = 10/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '361-369',
        any: [
          /IF TALENT:GETCHARA\(35\):85 == 1 && EX_FLAG:2807 >= 130\n\tEX_FLAG:2807 = 30\n\t;恋慕线起始3\n\tCFLAG:GETCHARA\(35\):515 = 0\nELSEIF TALENT:GETCHARA\(35\):76 == 1 && EX_FLAG:2807 >= 30 && EX_FLAG:2807 <= 130\n\tEX_FLAG:2807 = 130\n\t;淫乱线起始13\n\tCFLAG:GETCHARA\(35\):515 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '371-479',
        any: [
          /IF EX_FLAG:2807 >= 10 && EX_FLAG:2807 < 20\n\t\tIF  MARK:GETCHARA\(35\):1 == 3 && TALENT:GETCHARA\(35\):0\n\t\t\t\tEX_FLAG:2807 = 20\n\t\t\tELSEIF \(MARK:GETCHARA\(35\):1 == 3 \|\| MARK:GETCHARA\(35\):2 == 3\) && TALENT:GETCHARA\(35\):0 == 0\n\t\t\t\tEX_FLAG:2807 = -10\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 20 && EX_FLAG:2807 < 30\n\t\tIF TALENT:GETCHARA\(35\):85 == 1\n\t\t\t\tEX_FLAG:2807 = 30\n\t\t\t\t;恋慕线起始3\n\t\t\tELSEIF TALENT:GETCHARA\(35\):76 == 1\n\t\t\t\tEX_FLAG:2807 = 130\n\t\t\t\t;淫乱线起始13\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 30 && EX_FLAG:2807 < 40\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 2000 \n\t\t\tEX_FLAG:2807 = 40\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 40 && EX_FLAG:2807 < 50\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 5000 \n\t\t\tEX_FLAG:2807 = 50\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 50 && EX_FLAG:2807 < 60\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 10000\n\t\t\tEX_FLAG:2807 = 60\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 130 && EX_FLAG:2807 < 140\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 2000 \n\t\t\tEX_FLAG:2807 = 140\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 140 && EX_FLAG:2807 < 150\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 5000 \n\t\t\tEX_FLAG:2807 = 150\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 150 && EX_FLAG:2807 < 160\n\t\tIF CFLAG:GETCHARA\(35\):2 >= 10000\n\t\t\tEX_FLAG:2807 = 160\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 60 && EX_FLAG:2807 < 70\n\t\tIF CFLAG:GETCHARA\(35\):601 == 901\n\t\t\tEX_FLAG:2807 = 70\n\t\t\tCFLAG:GETCHARA\(35\):515 = 0\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 70 && EX_FLAG:2807 < 80\n\t\tIF CFLAG:GETCHARA\(35\):515 < 10\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 10\n\t\t\t\tEX_FLAG:2807 = 80\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 80 && EX_FLAG:2807 < 90\n\t\tIF CFLAG:GETCHARA\(35\):515 < 30\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 30\n\t\t\t\tEX_FLAG:2807 = 90\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 90 && EX_FLAG:2807 < 100\n\t\tIF CFLAG:GETCHARA\(35\):515 < 60\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 60\n\t\t\t\tEX_FLAG:2807 = 100\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 100 && EX_FLAG:2807 < 110\n\t\tIF CFLAG:GETCHARA\(35\):515 < 100\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 100\n\t\t\t\tEX_FLAG:2807 = 110\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 110 && EX_FLAG:2807 < 120\n\t\tIF CFLAG:GETCHARA\(35\):515 < 150\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 150\n\t\t\t\tEX_FLAG:2807 = 120\n\t\t\t\t;12为菲娅恋慕线完结\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 160 && EX_FLAG:2807 < 170\n\n\t\t;该部分判定移动至aftertrain\n\tELSEIF\tEX_FLAG:2807 >= 170 && EX_FLAG:2807 < 180\n\t\tIF CFLAG:GETCHARA\(35\):515 < 10\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 10\n\t\t\t\tEX_FLAG:2807 = 180\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 180 && EX_FLAG:2807 < 190\n\t\tIF CFLAG:GETCHARA\(35\):515 < 30\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 30\n\t\t\t\tEX_FLAG:2807 = 190\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 190 && EX_FLAG:2807 < 200\n\t\tIF CFLAG:GETCHARA\(35\):515 < 60\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 60\n\t\t\t\tEX_FLAG:2807 = 200\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 200 && EX_FLAG:2807 < 210\n\t\tIF CFLAG:GETCHARA\(35\):515 < 100\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 100\n\t\t\t\tEX_FLAG:2807 = 210\n\t\tENDIF\n\tELSEIF\tEX_FLAG:2807 >= 210 && EX_FLAG:2807 < 220\n\t\tIF CFLAG:GETCHARA\(35\):515 < 150\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 150\n\t\t\t\tEX_FLAG:2807 = 220\n\t\t\t\t;22为菲娅淫乱线完结\n\t\tENDIF\n\tELSE /,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '372-376',
        any: [
          /\t\tIF  MARK:GETCHARA\(35\):1 == 3 && TALENT:GETCHARA\(35\):0\n\t\t\t\tEX_FLAG:2807 = 20\n\t\t\tELSEIF \(MARK:GETCHARA\(35\):1 == 3 \|\| MARK:GETCHARA\(35\):2 == 3\) && TALENT:GETCHARA\(35\):0 == 0\n\t\t\t\tEX_FLAG:2807 = -10\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '377-384',
        any: [
          /\tELSEIF\tEX_FLAG:2807 >= 20 && EX_FLAG:2807 < 30\n\t\tIF TALENT:GETCHARA\(35\):85 == 1\n\t\t\t\tEX_FLAG:2807 = 30\n\t\t\t\t;恋慕线起始3\n\t\t\tELSEIF TALENT:GETCHARA\(35\):76 == 1\n\t\t\t\tEX_FLAG:2807 = 130\n\t\t\t\t;淫乱线起始13\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '386-387',
        any: [
          /\t\tIF CFLAG:GETCHARA\(35\):2 >= 2000 \n\t\t\tEX_FLAG:2807 = 40/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '409-413',
        any: [
          /\tELSEIF\tEX_FLAG:2807 >= 60 && EX_FLAG:2807 < 70\n\t\tIF CFLAG:GETCHARA\(35\):601 == 901\n\t\t\tEX_FLAG:2807 = 70\n\t\t\tCFLAG:GETCHARA\(35\):515 = 0\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '414-419',
        any: [
          /\tELSEIF\tEX_FLAG:2807 >= 70 && EX_FLAG:2807 < 80\n\t\tIF CFLAG:GETCHARA\(35\):515 < 10\n\t\t\t\tCFLAG:GETCHARA\(35\):515 \+= 1\n\t\t\tELSEIF CFLAG:GETCHARA\(35\):515 == 10\n\t\t\t\tEX_FLAG:2807 = 80\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA.ERB',
        ref: '479-480',
        any: [/\tELSE \nENDIF/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '3-24',
        any: [
          /;IF CFLAG:GETCHARA\(33\):1 == 9\n;\tIF EX_FLAG:2810 >= 30 && EX_FLAG:2810 <=100\n;\t\tEX_FLAG:2810 = 300\n;\t\tSIF FLAG:1 == GETCHARA\(33\)\n;\t\t\tFLAG:1 = -1\n;\t\tSIF FLAG:2 == GETCHARA\(33\)\n;\t\t\tG:2 = -1\n\n\t\t;前回の助手・調教対象より前だった場合はフラグを減算\n;\t\tSIF FLAG:1 > GETCHARA\(33\)\n;\t\t\tFLAG:1 -= 1\n;\t\tSIF FLAG:2 > GETCHARA\(33\)\n;\t\t\tFLAG:2 -= 1\n\n;\t\tTARGET = FLAG:1\n;\t\tASSI = FLAG:2\n\n;\t\tCALL PARTY_CHAR_DEL, EX_FLAG:2803\n;\t\tDELCHARA GETCHARA\(33\)\n;\t\tCALL NAME_RESET\n;\tENDIF\n;ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '37-85',
        any: [
          /;IF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):2 >= 2000 && EX_FLAG:2810 < 10\n;\t\tEX_FLAG:2810 = 10\n;\tELSEIF EX_FLAG:2810 >= 10 && EX_FLAG:2810 < 20\n;\t\tSIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):2 >= 5000\n;\t\t\tEX_FLAG:2810 = 20\n;\tELSEIF EX_FLAG:2810 >= 20 && EX_FLAG:2810 < 30\n;\t\tSIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):2 >= 10000\n;\t\t\tEX_FLAG:2810 = 30\n;\tELSEIF EX_FLAG:2810 >= 30 && EX_FLAG:2810 < 40\n;\t\tSIF TALENT:GETCHARA\(33\):85 == 1 && \(ABL:GETCHARA\(33\):10 \+ ABL:GETCHARA\(33\):16\) >= 14\n;\t\t\tEX_FLAG:2810 = 40\n;\t\t\tCFLAG:GETCHARA\(33\):515 = 0\n;\tELSEIF EX_FLAG:2810 >= 40 && EX_FLAG:2810 < 50\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 10\n;\t\t\t\tEX_FLAG:2810 = 50\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;\tELSEIF EX_FLAG:2810 >= 50 && EX_FLAG:2810 < 60\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 30\n;\t\t\t\tEX_FLAG:2810 = 60\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;\tELSEIF EX_FLAG:2810 >= 60 && EX_FLAG:2810 < 70\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 60\n;\t\t\t\tEX_FLAG:2810 = 70\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;\tELSEIF EX_FLAG:2810 >= 70 && EX_FLAG:2810 < 80\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 100\n;\t\t\t\tEX_FLAG:2810 = 80\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;\tELSEIF EX_FLAG:2810 >= 80 && EX_FLAG:2810 < 90\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 150\n;\t\t\t\tEX_FLAG:2810 = 90\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;\tELSEIF EX_FLAG:2810 == 300\n;\t\tIF TALENT:GETCHARA\(33\):85 == 1 && CFLAG:GETCHARA\(33\):515 >= 10\n;\t\t\t\tEX_FLAG:2810 = 310\n;\t\t\tELSE \n;\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n;\t\tENDIF\n;ENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '98-101',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 130 && EX_FLAG:2810 < 140\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && \(ABL:GETCHARA\(33\):10 \+ ABL:GETCHARA\(33\):16\) >= 14\n\t\t\tEX_FLAG:2810 = 140\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '111-116',
        any: [
          /\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 180\n\t\t\tSIF DAY:1 >= 350 && EX_FLAG:2810 == 560\n\t\t\t\tEX_FLAG:2810 = 160\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '112',
        any: [/\t\t\tSIF DAY:1 >= 350 && EX_FLAG:2810 == 560/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '27-35',
        any: [
          /IF TALENT:GETCHARA\(33\):85 == 1 && EX_FLAG:2810 >= 110 && EX_FLAG:2810 <= 200\n\tEX_FLAG:2810 = 10\n\t;恋慕线起始1\n\tCFLAG:GETCHARA\(33\):515 = 0\nELSEIF TALENT:GETCHARA\(33\):76 == 1 && \(\(EX_FLAG:2810 >= 30 && EX_FLAG:2810 <= 100\) \|\| \(EX_FLAG:2810 >= 300 && EX_FLAG:2810 <= 310\)\)\n\tEX_FLAG:2810 = 110\n\t;淫乱线起始11\n\tCFLAG:GETCHARA\(33\):515 = 0\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '87-144',
        any: [
          /IF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 >= 2000 && EX_FLAG:2810 < 10\n\t\tEX_FLAG:2810 = 110\n\t\tCFLAG:GETCHARA\(33\):515 = 0\n\tELSEIF EX_FLAG:2810 >= 110 && EX_FLAG:2810 < 120\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 <= 5000 && CFLAG:GETCHARA\(33\):515 >= 70\n\t\t\tEX_FLAG:2810 = 120\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\tELSEIF EX_FLAG:2810 >= 110 && EX_FLAG:2810 < 130\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 >= 8000\n\t\t\tEX_FLAG:2810 = 130\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\tELSEIF EX_FLAG:2810 >= 130 && EX_FLAG:2810 < 140\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && \(ABL:GETCHARA\(33\):10 \+ ABL:GETCHARA\(33\):16\) >= 14\n\t\t\tEX_FLAG:2810 = 140\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\tELSEIF EX_FLAG:2810 >= 140 && EX_FLAG:2810 < 150\n\t\t\t\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 150\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(34\)\n\t\t\t\tEX_FLAG:2810 = 150\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2810 >= 150 && EX_FLAG:2810 < 160\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 180\n\t\t\tSIF DAY:1 >= 350 && EX_FLAG:2810 == 560\n\t\t\t\tEX_FLAG:2810 = 160\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2810 >= 160 && EX_FLAG:2810 < 170\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 200\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 170\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2810 >= 170 && EX_FLAG:2810 < 180\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 220\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 180\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2810 >= 180 && EX_FLAG:2810 < 190\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 250\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 190\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\n\tELSEIF EX_FLAG:2810 == 300\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 300\n\t\t\t\tEX_FLAG:2810 = 310\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF\nENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '87-89',
        any: [
          /IF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 >= 2000 && EX_FLAG:2810 < 10\n\t\tEX_FLAG:2810 = 110\n\t\tCFLAG:GETCHARA\(33\):515 = 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '90-93',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 110 && EX_FLAG:2810 < 120\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 <= 5000 && CFLAG:GETCHARA\(33\):515 >= 70\n\t\t\tEX_FLAG:2810 = 120\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '94-97',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 110 && EX_FLAG:2810 < 130\n\t\tSIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):2 >= 8000\n\t\t\tEX_FLAG:2810 = 130\n\t\tCFLAG:GETCHARA\(33\):515 \+= 1/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '102-109',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 140 && EX_FLAG:2810 < 150\n\t\t\t\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 150\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(34\)\n\t\t\t\tEX_FLAG:2810 = 150\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '110-116',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 150 && EX_FLAG:2810 < 160\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 180\n\t\t\tSIF DAY:1 >= 350 && EX_FLAG:2810 == 560\n\t\t\t\tEX_FLAG:2810 = 160\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '117-123',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 160 && EX_FLAG:2810 < 170\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 200\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 170\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '124-130',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 170 && EX_FLAG:2810 < 180\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 220\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 180\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '131-137',
        any: [
          /\tELSEIF EX_FLAG:2810 >= 180 && EX_FLAG:2810 < 190\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 250\n\t\t\tSIF DAY:1 >= 350 && GETCHARA\(33\)\n\t\t\t\tEX_FLAG:2810 = 190\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '138-143',
        any: [
          /\tELSEIF EX_FLAG:2810 == 300\n\t\tIF TALENT:GETCHARA\(33\):76 == 1 && CFLAG:GETCHARA\(33\):515 >= 300\n\t\t\t\tEX_FLAG:2810 = 310\n\t\t\tELSE \n\t\t\t\tCFLAG:GETCHARA\(33\):515 \+= 1\n\t\tENDIF/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '147',
        any: [/\tIF EX_FLAG:2810 >= 500 && EX_FLAG:2810 < 510/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '148',
        any: [/\tELSEIF EX_FLAG:2810 >= 520 && EX_FLAG:2810 < 530/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '149',
        any: [/\tELSEIF EX_FLAG:2810 >= 530 && EX_FLAG:2810 < 540/],
      },
      {
        src: 'target/ERB/EVENT/ENDINGDATA_ADDON1.ERB',
        ref: '151-152',
        any: [
          /\t\tSIF GETCHARA\(33\) == 0 && FLAG:93 == 3\n\t\t\tEX_FLAG:2810 = 560/,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
