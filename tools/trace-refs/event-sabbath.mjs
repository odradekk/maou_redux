// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #405 新增：ere/event/event-sabbath.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/event/event-sabbath.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '2-229',
        any: [/^[ \t]*@SABBATH[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '12-14',
        any: [/^[ \t]*SIF CFLAG:1 != 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '16-18',
        any: [/^[ \t]*SIF DAY:2 <= 14 \|\| DAY:2 >= 16[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '20-22',
        any: [/^[ \t]*SIF TALENT:242 == 0 && TALENT:250 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '24-26',
        any: [/^[ \t]*SIF TALENT:76 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '28-34',
        any: [/^[ \t]*COUNT_F = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '36-48',
        any: [
          /^[ \t]*PRINTFORM %SAVESTR:TARGET%参与了献给无名的淫荡女神的仪式，[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '51-54',
        any: [/^[ \t]*PRINTFORML %SAVESTR:TARGET%抱着魔族女人，[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '55-77',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%陶醉在从后穴传递向前穴的快感中。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '78-88',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%纯洁的性器上被贴上了封条。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '89-99',
        any: [
          /^[ \t]*PRINTFORMW %SAVESTR:TARGET%陶醉在从后穴传递向前穴的快感中。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '100-110',
        any: [
          /^[ \t]*ELSEIF CFLAG:42 == 79 && \(CFLAG:40 & 64\) && FLAG:37[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '111-135',
        any: [
          /^[ \t]*PRINTFORML %SAVESTR:TARGET%有着喜欢与野兽交配的传闻，聚集了很多从地下城里慕名而来的人。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '136-166',
        any: [
          /^[ \t]*PRINTFORML 无论是多么丑陋的怪物和魔族，%SAVESTR:TARGET%都一视同仁地给予了性施舍。[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '139',
        any: [/^[ \t]*CALL SABBATH_DAY[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '168-225',
        any: [
          /^[ \t]*LOCAL:0 = \(COUNT_A \+ COUNT_V \+ COUNT_S \+ COUNT_Z\) \* 10[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '222-225',
        any: [/^[ \t]*PRINTL 【童贞丧失】[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '232-314',
        any: [/^[ \t]*@SABBATH_DAY[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '237-241',
        any: [/^[ \t]*LOCAL = DAY:2[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '243-245',
        any: [/^[ \t]*SIF TALENT:242 == 0 && TALENT:250 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '244',
        any: [/^[ \t]*SIF TALENT:242 == 0 && TALENT:250 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '247-249',
        any: [/^[ \t]*SIF CFLAG:0 == 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '251-253',
        any: [/^[ \t]*SIF CFLAG:152 < 40[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '261-267',
        any: [/^[ \t]*IF SABBATH_USER == 0 && ITEM:22[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '268-274',
        any: [/^[ \t]*ELSEIF SABBATH_USER == 1 && CFLAG:152 > 80[ \t]*$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '276-282',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:250 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '277',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:250 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '284',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:242 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '284-289',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:242 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '291',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:315 == 11 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '291-304',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:315 == 11 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '298',
        any: [
          /^[ \t]*ELSEIF SABBATH_USER == 2 && CFLAG:152 > 60 && TALENT:315 == 12 && \(TALENT:17 \|\| TALENT:282\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_SABBATH.ERB',
        ref: '305-314',
        any: [
          /^[ \t]*DATAFORM 献上了淫荡的雕像，信徒的少年在那上面喷上了精液……[ \t]*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
