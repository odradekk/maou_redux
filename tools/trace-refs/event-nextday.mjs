// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：event-nextday.mjs

export const FILES = [
  {
    // @EVENT_NEXTDAY / @EVENT_NEWDAY 窄路径（#115 日程推进）
    js: 'ere/event/event-nextday.js',
    refs: [
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '6-189',
        any: [/^@EVENT_NEXTDAY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '10-52',
        any: [/NEXTDAY_COUNT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '16-20',
        any: [/EVENT_FUTA_F/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '22-28',
        any: [/EVENT_MORASI/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '29-38',
        any: [/EVENT_YOUJI/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '40-44',
        any: [/EVENT_MAZOKU/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '47',
        any: [/^\tCALL APHRODISIAC_ADDICT$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '50',
        any: [/^\tCALL SOUL_DISLOCATION$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '55-61',
        any: [/CFLAG:COUNT:109 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '59',
        any: [/CFLAG:COUNT:109 = 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '64',
        any: [/^FLAG:61 = 0$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '67',
        any: [/^CALL NINSIN_MAIN$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '69-95',
        any: [/TALENT:LOCAL:153/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '72',
        any: [/\(CFLAG:LOCAL:110 - 3\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '75',
        any: [/;CALL REACH_FULL_TERM/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '77',
        any: [/\(CFLAG:LOCAL:110 - 1\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '79',
        any: [/出産日了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '82',
        any: [/CFLAG:LOCAL:110 == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '84',
        any: [/;CALL CHILD_BIRTH/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '86',
        any: [/\(CFLAG:LOCAL:110 \+ 5\) == DAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '88',
        any: [/;CALL DEPEARENT/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '89',
        any: [/TALENT:LOCAL:154/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '97-99',
        any: [/WASHING_CLOTH/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '102-111',
        any: [/OFFERVIRGIN_CHECK/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '114',
        any: [/^CALL NIGHT_STALKING_CHECK$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '117',
        any: [/;CALL RUNNING_COST/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '120',
        any: [/^CALL CURSE_EQUIP_RING$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '123',
        any: [/CALL SUMMON_MONSTER, 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '126',
        any: [/^CALL DUNGEON_ROOM_DAY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '129-178',
        any: [/CALL PILLORY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-147',
        any: [/处女の場合善恶值上昇/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '146-154',
        any: [/CALL KARMA, TARGET, 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '147',
        any: [/TALENT:0 == 0 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '162-175',
        any: [/CALL FAITH, TARGET, 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '181',
        any: [/^CALL TAX_GET$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '184',
        any: [/^CALL SENGEN_VIDEO_DE$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '187',
        any: [/^CALL MAOU_KOUHO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '189',
        any: [/^RETURN 1$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '193-243',
        any: [/^@EVENT_NEWDAY$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '200-221',
        any: [/影の寿命/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '226',
        any: [/^CALL MORNING_FELLATIO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '229',
        any: [/;CALL HAPPY_BIRTHDAY/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '232',
        any: [/^CALL ONESHO$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '235',
        any: [/;CALL PARTICULAR_DATE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '238',
        any: [/^CALL DOG_WALK$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '241',
        any: [/^CALL ENDCHECK$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_NEXTDAY.ERB',
        ref: '243',
        any: [/^RETURN 1$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
