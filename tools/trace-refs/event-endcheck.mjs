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
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
