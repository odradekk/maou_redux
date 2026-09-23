// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #544 按 js 文件拆出：kojo-forced-payment.mjs
//
// 锚一律对着 target/ERB/魔改新增/强制肉偿.ERB 原文落位。四档叙事共用同一
// 组语句文本（:16/:30/:47/:62 的分档条件、PLAY/COST 的四组赋值、两处
// 「让围在这个壁洞"消遣"的人们络绎不绝……」），锚因此命中多处但窗口逐字
// 相同——按 #298 的判据是「平行复现」，不进弱锚。

const SRC = 'target/ERB/魔改新增/强制肉偿.ERB';

/** 分档条件（:16/:30/:47/:62 四处逐字相同） */
const IF_VETERAN =
  /^\s*IF ABL:ARG:11 >= 3 \|\| ABL:ARG:37 \|\| EXP:ARG:20 >= 30\s*$/m;
/** 高档 PLAY（:18/:33/:50/:64 四处逐字相同） */
const PLAY_HIGH = /^\s*PLAY = RAND:20 \+ 10\s*$/m;
/** 高档 COST（:19/:34/:51/:65 四处逐字相同） */
const COST_HIGH = /^\s*COST = PLAY\*100 \+ RAND:1000 \+ 1000\s*$/m;
/** 低档 PLAY（:22/:38/:55/:69 四处逐字相同） */
const PLAY_LOW = /^\s*PLAY = RAND:10 \+ 5\s*$/m;
/** 低档 COST（:23/:39/:56/:70 四处逐字相同） */
const COST_LOW = /^\s*COST = PLAY\*100 \+ RAND:500 \+ 500\s*$/m;
/** SETCOLORBYNAME SkyBlue（:79/:91 两处逐字相同） */
const SKY_BLUE = /^\s*SETCOLORBYNAME SkyBlue\s*$/m;
/** SETCOLORBYNAME LightSalmon（:83/:97 两处逐字相同） */
const LIGHT_SALMON = /^\s*SETCOLORBYNAME LightSalmon\s*$/m;
/** RESETCOLOR（:81/:85/:93/:99 四处逐字相同） */
const RESET = /^\s*RESETCOLOR\s*$/m;
/** {CFLAG:ARG:582} 的显示行（:84/:98 两处逐字相同） */
const DEBT_PRINT = /^\s*PRINTFORM \{CFLAG:ARG:582\}\s*$/m;
/** 「让围在这个壁洞"消遣"的人们络绎不绝……」（:32/:37 两处逐字相同） */
const WALL_HOLE_CROWD =
  /^\s*PRINTFORMW 让围在这个壁洞"消遣"的人们络绎不绝……\s*$/m;
/** 「点……」的收尾行（:86/:100 两处逐字相同） */
const POINTS_TAIL = /^\s*PRINTFORMW 点……\s*$/m;

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};

export const FILES = [
  {
    js: 'ere/kojo/kojo-forced-payment.js',
    refs: [
      {
        src: SRC,
        ref: '2-117',
        any: [/^\s*@强制肉偿\(ARG\)\s*$/m],
      },
      { src: SRC, ref: '3', any: [/^\s*#DIM PLAY\s*$/m] },
      { src: SRC, ref: '4', any: [/^\s*#DIM COST\s*$/m] },
      { src: SRC, ref: '5-7', any: [/^\s*#DIMS\s+ORAL\s*$/m] },
      {
        src: SRC,
        ref: '10',
        any: [/^\s*PRINTFORMW 由於%SAVESTR:ARG%欠的债务实在太高了/m],
      },
      { src: SRC, ref: '11', any: [/^\s*SELECTCASE\s+RAND:4\s*$/m] },
      // 四档的档位声明（:12/:25/:41/:58）
      { src: SRC, ref: '12', any: [/^\s*CASE 0\s*$/m] },
      { src: SRC, ref: '12-24', any: [/^\s*CASE 0\s*$/m] },
      {
        src: SRC,
        ref: '13',
        any: [/^\s*PRINTFORML %SAVESTR:ARG%被强制灌了媚药/m],
      },
      {
        src: SRC,
        ref: '14',
        any: [/^\s*PRINTFORML 然後几乎跟全裸没什么两样的/m],
      },
      {
        src: SRC,
        ref: '15',
        any: [/^\s*PRINTFORML 昏昏沉沉的%SAVESTR:ARG%/m],
      },
      { src: SRC, ref: '16', any: [IF_VETERAN] },
      {
        src: SRC,
        ref: '17',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%那幅晃腰摆臀的淫荡模样/m],
      },
      { src: SRC, ref: '18', any: [PLAY_HIGH] },
      { src: SRC, ref: '19', any: [COST_HIGH] },
      {
        src: SRC,
        ref: '21',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%那青涩懵懂的模样，让派对的宾客们感到新鲜/m,
        ],
      },
      { src: SRC, ref: '22', any: [PLAY_LOW] },
      { src: SRC, ref: '23', any: [COST_LOW] },
      { src: SRC, ref: '25', any: [/^\s*CASE 1\s*$/m] },
      { src: SRC, ref: '25-40', any: [/^\s*CASE 1\s*$/m] },
      {
        src: SRC,
        ref: '26',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%被蒙上了眼睛并除去下半身的衣物，然後固定在一个壁洞上/m,
        ],
      },
      {
        src: SRC,
        ref: '27',
        any: [/^\s*PRINTFORML 也不知道是在城里的那个位置/m],
      },
      {
        src: SRC,
        ref: '28',
        any: [
          /^\s*PRINTFORML 什么也看不见的%SAVESTR:ARG%，除了能听见不知是谁的污言秽语/m,
        ],
      },
      {
        src: SRC,
        ref: '29',
        any: [/^\s*PRINTFORML 就只能感受到炙热的肉棒在身後及嘴巴里/m],
      },
      { src: SRC, ref: '30', any: [IF_VETERAN] },
      {
        src: SRC,
        ref: '31',
        any: [
          /^\s*PRINTFORMW 即使不知对象是谁，%SAVESTR:ARG%那淫荡的身体居然因为这样的PLAY兴奋了/m,
        ],
      },
      { src: SRC, ref: '32', any: [WALL_HOLE_CROWD] },
      { src: SRC, ref: '33', any: [PLAY_HIGH] },
      { src: SRC, ref: '34', any: [COST_HIGH] },
      {
        src: SRC,
        ref: '36',
        any: [
          /^\s*PRINTFORMW 即使不知对象是谁，%SAVESTR:ARG%那青涩懵懂的身体也因为这样的PLAY渐渐兴奋了起来/m,
        ],
      },
      { src: SRC, ref: '37', any: [WALL_HOLE_CROWD] },
      { src: SRC, ref: '38', any: [PLAY_LOW] },
      { src: SRC, ref: '39', any: [COST_LOW] },
      { src: SRC, ref: '41', any: [/^\s*CASE 2\s*$/m] },
      { src: SRC, ref: '41-57', any: [/^\s*CASE 2\s*$/m] },
      {
        src: SRC,
        ref: '42',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%被蒙上了眼睛并除去全身的衣物，然後固定在一个十字架上/m,
        ],
      },
      {
        src: SRC,
        ref: '43',
        any: [
          /^\s*PRINTFORML 这难道是在在城里的哪个教堂吗？茫然的%SAVESTR:ARG%就这样开始被审判了……/m,
        ],
      },
      {
        src: SRC,
        ref: '44',
        any: [
          /^\s*PRINTFORML 什么也看不见的%SAVESTR:ARG%，能听见底下不知是谁的祈祷声与窃窃私语/m,
        ],
      },
      {
        src: SRC,
        ref: '45',
        any: [/^\s*PRINTFORML 欠债过多的%SAVESTR:ARG%最後被判决了犯了/m],
      },
      {
        src: SRC,
        ref: '46',
        any: [/^\s*PRINTFORML 基於神的仁爱，教徒们决定用滚烫的肉棒代替了烙铁/m],
      },
      { src: SRC, ref: '47', any: [IF_VETERAN] },
      {
        src: SRC,
        ref: '48',
        any: [/^\s*PRINTFORMW 在受刑时，%SAVESTR:ARG%那淫荡的身体反应/m],
      },
      {
        src: SRC,
        ref: '49',
        any: [/^\s*PRINTFORMW 为了彻底纠正%SAVESTR:ARG%的淫行/m],
      },
      { src: SRC, ref: '50', any: [PLAY_HIGH] },
      { src: SRC, ref: '51', any: [COST_HIGH] },
      {
        src: SRC,
        ref: '53',
        any: [
          /^\s*PRINTFORMW 在受刑时，%SAVESTR:ARG%那青涩懵懂的身体不停挣扎着/m,
        ],
      },
      {
        src: SRC,
        ref: '54',
        any: [/^\s*PRINTFORMW 为了让%SAVESTR:ARG%认清自己的罪行/m],
      },
      { src: SRC, ref: '55', any: [PLAY_LOW] },
      { src: SRC, ref: '56', any: [COST_LOW] },
      { src: SRC, ref: '58', any: [/^\s*CASE 3\s*$/m] },
      { src: SRC, ref: '58-71', any: [/^\s*CASE 3\s*$/m] },
      {
        src: SRC,
        ref: '59',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%被剥除全身的衣物，然後丢入牢房中进行/m,
        ],
      },
      {
        src: SRC,
        ref: '60',
        any: [/^\s*PRINTFORML 为了降低牢狱的暴动率，维护社会的秩序/m],
      },
      {
        src: SRC,
        ref: '61',
        any: [/^\s*PRINTFORML 就这样%SAVESTR:ARG%变成了犯人们的泄欲工具/m],
      },
      { src: SRC, ref: '62', any: [IF_VETERAN] },
      {
        src: SRC,
        ref: '63',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%那积极的服务精神/m],
      },
      { src: SRC, ref: '64', any: [PLAY_HIGH] },
      { src: SRC, ref: '65', any: [COST_HIGH] },
      {
        src: SRC,
        ref: '67',
        any: [
          /^\s*PRINTFORMW 在服务时，%SAVESTR:ARG%那青涩懵懂的身体不停挣扎着/m,
        ],
      },
      {
        src: SRC,
        ref: '68',
        any: [/^\s*PRINTFORMW 最後只好将%SAVESTR:ARG%铐在栏杆上/m],
      },
      { src: SRC, ref: '69', any: [PLAY_LOW] },
      { src: SRC, ref: '70', any: [COST_LOW] },
      // 债务结算（:73-77）
      { src: SRC, ref: '73-77', any: [/^\s*CFLAG:ARG:582 = 0\s*$/m] },
      { src: SRC, ref: '74', any: [/^\s*CFLAG:ARG:582 = 0\s*$/m] },
      { src: SRC, ref: '76', any: [/^\s*CFLAG:ARG:582 \+= COST\s*$/m] },
      // 结算显示行（:78-86 的 PRINTFORM 拼接）
      {
        src: SRC,
        ref: '78',
        any: [/^\s*PRINTFORM 被强制用肉体偿债的%SAVESTR:ARG%抵销了/m],
      },
      {
        src: SRC,
        ref: '78-86',
        any: [/^\s*PRINTFORM 被强制用肉体偿债的%SAVESTR:ARG%抵销了/m],
      },
      { src: SRC, ref: '79', any: [SKY_BLUE] },
      { src: SRC, ref: '80', any: [/^\s*PRINTFORM \{COST\}\s*$/m] },
      { src: SRC, ref: '81', any: [RESET] },
      {
        src: SRC,
        ref: '82',
        any: [/^\s*PRINTFORM 点的债务，当前欠金变为\s*$/m],
      },
      { src: SRC, ref: '83', any: [LIGHT_SALMON] },
      { src: SRC, ref: '84', any: [DEBT_PRINT] },
      { src: SRC, ref: '85', any: [RESET] },
      { src: SRC, ref: '86', any: [POINTS_TAIL] },
      // 拍片分支（:88-104）
      { src: SRC, ref: '88-104', any: [/^\s*IF !RAND:3\s*$/m] },
      {
        src: SRC,
        ref: '89',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%用肉体还债的过程被人拍下来了！/m],
      },
      {
        src: SRC,
        ref: '90',
        any: [/^\s*PRINTFORM 这部淫荡煽情的影像以\s*$/m],
      },
      {
        src: SRC,
        ref: '90-94',
        any: [/^\s*PRINTFORM 这部淫荡煽情的影像以\s*$/m],
      },
      { src: SRC, ref: '91', any: [SKY_BLUE] },
      {
        src: SRC,
        ref: '92',
        any: [/^\s*PRINTFORM \{COST\*1\/3 \+ RAND:100\}\s*$/m],
      },
      { src: SRC, ref: '93', any: [RESET] },
      {
        src: SRC,
        ref: '94',
        any: [/^\s*PRINTFORMW 的金额，被人买下收藏了\s*$/m],
      },
      {
        src: SRC,
        ref: '95',
        any: [/^\s*CFLAG:ARG:582 \+= \(COST\*1\/3 \+ RAND:100\)\s*$/m],
      },
      {
        src: SRC,
        ref: '96',
        any: [/^\s*PRINTFORM 当前欠金变为\s*$/m],
      },
      { src: SRC, ref: '96-100', any: [/^\s*PRINTFORM 当前欠金变为\s*$/m] },
      { src: SRC, ref: '97', any: [LIGHT_SALMON] },
      { src: SRC, ref: '98', any: [DEBT_PRINT] },
      { src: SRC, ref: '99', any: [RESET] },
      { src: SRC, ref: '100', any: [POINTS_TAIL] },
      {
        src: SRC,
        ref: '101',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%的%EXPNAME:50%，%EXPNAME:70% 经验值上升了 1\s*$/m,
        ],
      },
      { src: SRC, ref: '102', any: [/^\s*EXP:ARG:50 \+= 1\s*$/m] },
      { src: SRC, ref: '103', any: [/^\s*EXP:ARG:70 \+= 1\s*$/m] },
      // 经验/点数结算（:105-114）
      {
        src: SRC,
        ref: '105',
        any: [/^\s*CALL EXP_BITCH\(ARG,, ORAL, PLAY\)\s*$/m],
      },
      {
        src: SRC,
        ref: '105-114',
        any: [/^\s*CALL EXP_BITCH\(ARG,, ORAL, PLAY\)\s*$/m],
      },
      {
        src: SRC,
        ref: '107',
        any: [/^\s*CALL EXP_BITCH\(ARG,, ANAL, PLAY\)\s*$/m],
      },
      {
        src: SRC,
        ref: '108',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%的%EXPNAME:22%，%EXPNAME:20%，%EXPNAME:74%，%EXPNAME:1%/m,
        ],
      },
      {
        src: SRC,
        ref: '109',
        any: [/^\s*PRINTFORML %SAVESTR:ARG%的%PALAMNAME:2%点数＋/m],
      },
      {
        src: SRC,
        ref: '111',
        any: [/^\s*CALL EXP_BITCH\(ARG,, SEX, PLAY\)\s*$/m],
      },
      {
        src: SRC,
        ref: '112',
        any: [
          /^\s*PRINTFORML %SAVESTR:ARG%的%EXPNAME:22%，%EXPNAME:20%，%EXPNAME:74%，%EXPNAME:0%/m,
        ],
      },
      {
        src: SRC,
        ref: '113',
        any: [/^\s*PRINTFORML %SAVESTR:ARG%的%PALAMNAME:1%点数＋/m],
      },
      // 善恶值（:115-117）
      { src: SRC, ref: '115-117', any: [/^\s*LOCAL = -1 \* PLAY \/ 4\s*$/m] },
      {
        src: SRC,
        ref: '116',
        any: [/^\s*PRINTFORMW （善恶值减少了：\{LOCAL\}）\s*$/m],
      },
      { src: SRC, ref: '117', any: [/^\s*CALL KARMA, ARG, LOCAL\s*$/m] },
    ],
  },
];
