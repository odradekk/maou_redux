// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #394 新增：ere/chara/chara-first-exp.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-first-exp.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '2-670',
        any: [/^[ \t]*@CHARA_FIRST_EXP,ARG[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '4',
        any: [/^[ \t]*\#DIM\ FIRST_SEX[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '67-129',
        any: [/^[ \t]*SELECTCASE\ LOCAL:2\ \/\ 1000000000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '224-302',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '304-382',
        any: [/^[ \t]*ELSEIF\ TALENT:\(ARG\):121[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '384-464',
        any: [/^[ \t]*SELECTCASE\ TALENT:\(ARG\):成为勇者前的生活[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '406-412',
        any: [/^[ \t]*CASE\ 8[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '64-130',
        any: [/^[ \t]*SELECTCASE\ LOCAL:1\ \/\ 10000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '68-76',
        any: [/^[ \t]*CASE\ 0,4,8[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '225-300',
        any: [/^[ \t]*SELECTCASE\ TALENT:\(ARG\):成为勇者前的生活[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '305-380',
        any: [/^[ \t]*SELECTCASE\ TALENT:\(ARG\):成为勇者前的生活[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '385-462',
        any: [/^[ \t]*SELECTCASE\ TALENT:\(ARG\):成为勇者前的生活[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '302',
        any: [/^[ \t]*MEN_OR_GIRL\ =\ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '382',
        any: [/^[ \t]*MEN_OR_GIRL\ =\ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '464',
        any: [/^[ \t]*MEN_OR_GIRL\ =\ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '478',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '497',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '516',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '551',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '563',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '575',
        any: [/^[ \t]*SELECTCASE\ RAND:3[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '14-17',
        any: [/^[ \t]*FIRST_KISS\ =\ CFLAG:\(ARG\):16[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '18-19',
        any: [/^[ \t]*KISS_POINT\ =\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '55',
        any: [/^[ \t]*LOCALS:2\ =[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '22-23',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):122\ ==\ 0\ \&\&\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ FIRST_SEX\ ==\ \-1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '25-26',
        any: [
          /^[ \t]*SIF\ \(\ EXP:\(ARG\):5\ >\ 0\ \|\|\ EXP:\(ARG\):74\ >\ 0\ \)\ \&\&\ FIRST_KISS\ ==\ \-1[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '29-34',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ EXP:\(ARG\):56\ >\ 0\ \&\&\ RAND:20\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '36-41',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ EXP:\(ARG\):56\ >\ 0\ \&\&\ RAND:10\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '43-48',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ EXP:\(ARG\):56\ >\ 0\ \&\&\ RAND:5\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '51-53',
        any: [/^[ \t]*LOCAL:3\ =\ TALENT:\(ARG\):320[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '58-196',
        any: [/^[ \t]*IF\ LOCAL:4\ ==\ 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '61-62',
        any: [/^[ \t]*LOCAL:1\ =\ LOCAL:3\ %\ 100000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '133-134',
        any: [/^[ \t]*LOCAL:1\ =\ LOCAL:3\ %\ 10000000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '142-143',
        any: [/^[ \t]*LOCAL:1\ =\ LOCAL:3\ %\ 1000000000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '155-156',
        any: [/^[ \t]*LOCAL:1\ =\ LOCAL:3\ %\ 1000000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '164-165',
        any: [/^[ \t]*LOCAL:1\ =\ LOCAL:3\ %\ 100000000[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '177-184',
        any: [/^[ \t]*IF\ LOCALS:2\ ==\ ""\ \&\&\ RAND:20\ ==\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '187-194',
        any: [/^[ \t]*IF\ LOCALS:2\ ==\ ""\ \&\&\ RAND:20\ ==\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '199-202',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ LOCAL:4\ ==\ 1\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '204-205',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ LOCALS:1\ ==\ ""\ \ \&\&\ FIRST_SEX\ ==\ 0\ \&\&\ LOCAL:4\ ==\ 1\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '208-212',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):317\ ==\ 4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '215-218',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '220-221',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ LOCALS:1\ ==\ ""\ \ \&\&\ FIRST_SEX\ ==\ 0\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '224-465',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '468-471',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '473-474',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ LOCALS:1\ ==\ ""\ \ \&\&\ FIRST_SEX\ ==\ 0\ \&\&\ RAND:2\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '477-533',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '477-494',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '496-513',
        any: [/^[ \t]*ELSEIF\ TALENT:\(ARG\):121[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '536-539',
        any: [
          /^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ RAND:3\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '542-543',
        any: [
          /^[ \t]*SIF\ \ LOCALS\ !=\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0\ \&\&\ KISS_POINT\ >\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '546-547',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ LOCALS:1\ ==\ ""\ \ \&\&\ FIRST_SEX\ ==\ 0\ \&\&\ RAND:3\ ==\ 0[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '550-585',
        any: [/^[ \t]*IF\ TALENT:\(ARG\):122[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '588-591',
        any: [/^[ \t]*IF\ LOCALS\ ==\ ""\ \ \&\&\ FIRST_KISS\ ==\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '593-594',
        any: [
          /^[ \t]*SIF\ TALENT:\(ARG\):0\ ==\ 0\ \&\&\ FIRST_SEX\ ==\ 0\ \&\&\ LOCALS:1\ ==\ ""[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '596-597',
        any: [/^[ \t]*SIF\ LOCALS:1\ !=\ ""\ \&\&\ \ FIRST_SEX\ ==\ 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '599-631',
        any: [/^[ \t]*IF\ MEN_OR_GIRL:1\ ==\ 4[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '635-641',
        any: [/^[ \t]*;性別と矛盾していた場合、白紙[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '643-662',
        any: [/^[ \t]*;ファーストキスの箇所[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB',
        ref: '664-667',
        any: [/^[ \t]*CFLAG:\(ARG\):16\ =\ FIRST_KISS[ \t]*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
