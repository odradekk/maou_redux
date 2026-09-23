// 源: tools/trace-check.mjs  @FILES
// issue #543：處刑改寫.ERB（批量处刑 / 自動處刑 / 自動處刑1）与 @SP 的内联引用。
// 区间取「含全文唯一行」的跨度（#298 的鉴别力判据）。

const DIR = 'target/ERB/魔改新增';

export const FILES = [
  {
    js: 'ere/event/event-execution-batch.js',
    refs: [
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '3-417',
        any: [/^\s*@批量处刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '419-433',
        any: [/^\s*@自動處刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '435-498',
        any: [/^\s*@自動處刑1\(ARG\)\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '33',
        any: [
          /^\s*IF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\) && \(!EX_TALENT:COUNT:1 \|\| \(EX_TALENT:COUNT:2 && GETBIT\(EX_FLAG:9000,1\)\)\)\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '109-110',
        any: [
          /^\s*SETCOLOR GETBIT\(EX_FLAG:9000,2\) \?  0xffffff # 0x646464\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '143',
        any: [/^\s*INVERTBIT EX_FLAG:9000,2\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '10',
        any: [/^\s*#DIM CONST NUM_PAGE = 25\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '34',
        any: [
          /^\s*PRINTFORM \[\{COUNT,3,RIGHT\}\] %SAVESTR:COUNT,12,LEFT% %GET_JOB_NAME\(COUNT\),8,LEFT% LV:\{CFLAG:COUNT:9,4,LEFT\}\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '34-48',
        any: [
          /^\s*PRINTFORM \[\{COUNT,3,RIGHT\}\] %SAVESTR:COUNT,12,LEFT% %GET_JOB_NAME\(COUNT\),8,LEFT% LV:\{CFLAG:COUNT:9,4,LEFT\}\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '206',
        any: [
          /^\s*PRINTFORM 深爱着你的%SAVESTR:A%不知道自己为什么要被做成肉便器，不停地高叫着你的名字，请求饶恕。\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '207',
        any: [
          /^\s*PRINTFORML 但%SAVESTR:PLAYER%依然给%SAVESTR:A%烙上了封锁所有力量的封印，\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '209',
        any: [/^\s*PRINTL 作为地下城里怪物的慰问品被使用着，\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '210',
        any: [
          /^\s*PRINTW 今后别说重新当勇者，就连看一眼阳光也不可能了吧。\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '297',
        any: [/^\s*SIF TALENT:A:317 == 4 \|\| TALENT:317 == 11\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '299',
        any: [/^\s*PRINTFORMW 现在的肉便器数量：\{FLAG:83\}\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '2',
        any: [/^\s*;CFLAG:777 = 待處刑標籤\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '25-52',
        any: [
          /^\s*FOR COUNT, NO_PAGE\*NUM_PAGE \+ 1, \(NO_PAGE\+1\)\*NUM_PAGE \+1\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '25',
        any: [
          /^\s*FOR COUNT, NO_PAGE\*NUM_PAGE \+ 1, \(NO_PAGE\+1\)\*NUM_PAGE \+1\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '29-31',
        any: [/^\s*;对象是魔王或者已经在示众台处刑剃除\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '117-137',
        any: [/^\s*\$待处刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '118-122',
        any: [/^\s*;不受洗脑或已有魔王刻印者无法士兵化\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '130-132',
        any: [/^\s*A = COUNT\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '191-304',
        any: [/^\s*ELSEIF TFLAG:16 == 4\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '208',
        any: [
          /^\s*PRINTFORML 被吸收了全部力量的%SHE\(A\)%，身体变成淫靡的肉块了。\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '234',
        any: [
          /^\s*PRINTFORMW 已经算不上是性器官，%SAVESTR:A%的肛门，被极限扩张，关都关不上了。可是哪怕这样，只要有肉棒在直肠射精，%SHE\(A\)%还是兴奋得快疯了似得。\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '246-252',
        any: [/^\s*IF TALENT:A:121 \|\| TALENT:A:122\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '303',
        any: [/^\s*SUISEI_STR:A  = 肉便器%SAVESTR:A%\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '361-394',
        any: [/^\s*W:0 = CFLAG:A:550\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '192',
        any: [/^\s*FLAG:83 \+= 1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '193-199',
        any: [/^\s*EX_FLAG:99 \+= 2\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '200-204',
        any: [/^\s*CALL SEARCH_FAMILY, A\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '302',
        any: [/^\s*TSTR:30 = 肉便器%SAVESTR:A%\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '305-318',
        any: [/^\s*ELSEIF TFLAG:16 == 5\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '306',
        any: [/^\s*TALENT:A:254 = 1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '309',
        any: [/^\s*CFLAG:A:13 \/= 2\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '310',
        any: [/^\s*CFLAG:A:14 \/= 2\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '311',
        any: [
          /^\s*PRINTFORML 法术的副作用导致其战斗力下降了！攻击变成\{CFLAG:A:13\}，防御变成\{CFLAG:A:14\}\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '312',
        any: [/^\s*PRINTFORML %SAVESTR:A%可以於迎击名单中派遣出场了！\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '313',
        any: [/^\s*CSTR:30 = 魔王傀儡%SAVESTR:A%\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '315-317',
        any: [/^\s*SUISEI_STR:A  = 魔王傀儡%SAVESTR:A%\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '321-336',
        any: [
          /^\s*PRINTFORML 把%SAVESTR:A%的屁股抬高，扣在固定的枷锁上，\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '320',
        any: [/^\s*CFLAG:A:1 = 8\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '332',
        any: [/^\s*SUISEI_STR:A  = 魔族公廁%SAVESTR:A%\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '337-356',
        any: [
          /^\s*PRINTFORMW 将%SAVESTR:A%身上\{CFLAG:A:580\}的金钱掏空之後，並清除所有地下城的记忆丢出去了。\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '339',
        any: [/^\s*MONEY \+= CFLAG:A:580\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '340',
        any: [/^\s*EX_FLAG:4444 \+= CFLAG:A:580\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '341',
        any: [/^\s*CFLAG:A:580 = 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '343-346',
        any: [/^\s*CFLAG:A:502 = 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '349-350',
        any: [/^\s*CFLAG:A:151 = -50\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '352-353',
        any: [/^\s*CFLAG:A:2 = 20\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '354-356',
        any: [/^\s*CFLAG:A:777 = 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '159-417',
        any: [/^\$进行处刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '163-167',
        any: [/^\s*SIF LOCAL >= 100 && LOCAL < 140 \|\| LOCAL > 1000\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '161',
        any: [/^\s*TARGET = A\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '90-147',
        any: [/^\s*\$处刑介面2\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '106-108',
        any: [
          /^\s*PRINTL \[7\] 消除记忆后释放：此项可没收此奴隶身上所有的现金\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '110-114',
        any: [
          /^\s*PRINTFORML \\@ GETBIT\(EX_FLAG:9000,2\) \? \[101\] 水晶球记录：开 # \[101\] 水晶球记录：关 \\@\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '115-116',
        any: [/^\s*处刑中 = 1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '138-139',
        any: [/处刑中 = 0\s*\n\s*GOTO 处刑介面/],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '140-141',
        any: [/^\s*CASE 100\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '145-146',
        any: [/^\s*CASEELSE\s*$\n^\s*GOTO 处刑介面\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '7',
        any: [/^\s*#DIM 可处刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '8',
        any: [/^\s*#DIM NO_PAGE = 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '13',
        any: [/^\s*可处刑 = 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '11-14',
        any: [
          /^\s*CUSTOMDRAWLINE =\s*$\n^\s*处刑中 = 0\s*$\n^\s*可处刑 = 0\s*$\n^\s*TFLAG:16 = -1\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '12-14',
        any: [/^\s*处刑中 = 0\s*$\n^\s*可处刑 = 0\s*$\n^\s*TFLAG:16 = -1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '14',
        any: [/^\s*TFLAG:16 = -1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '15-73',
        any: [/^\s*\$处刑介面\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '11',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '19-21',
        any: [
          /^\s*PRINTFORML <\{60 - DAY\}天以内再展出\{20 - FLAG:84\}名勇者到博物館将解锁实绩！>\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '52-54',
        any: [/^\s*NEXT\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '54-65',
        any: [/^\s*IF CFLAG:COUNT:777 && CFLAG:COUNT:700\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '66-67',
        any: [/^\s*SIF 可处刑\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '67-69',
        any: [/^\s*PRINTLC \[121\] 选择处刑方式\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '68-70',
        any: [/^\s*PRINTLC \[2000\] 上一页\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '72-74',
        any: [/^\s*PRINTLC \[2001\] 下一页\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '75-80',
        any: [/^\s*CASE 2000 ;上一页\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '81-86',
        any: [/^\s*CASE 2001 ;下一页\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '87-88',
        any: [/^\s*CASE 1999\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '147-157',
        any: [/^\s*IF RESULT > 0 && RESULT <= CHARANUM\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '424',
        any: [/^\s*IF CFLAG:506 == 1 && ABL:10 < 2 && CFLAG:700 == 0\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '428-430',
        any: [/^\s*ELSEIF CFLAG:TARGET:506 == 1 && CFLAG:700\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '474-480',
        any: [/^\s*IF TALENT:ARG:220 != 1 && EX_TALENT:ARG:1 != 1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '482-483',
        any: [/^\s*DELCHARA ARG\s*$\n^\s*CALL NAME_RESET\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '437',
        any: [/^\s*ARG = TARGET\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '438-452',
        any: [/^\s*W:0 = CFLAG:ARG:550\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '488-491',
        any: [/^\s*EXP:0:81 \+= 1\s*$/m],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '491-492',
        any: [
          /^\s*EXP:0:81 \+= 1\s*$\n^\s*PRINTFORMW 《封印吸收了力量，使你获得了\{LV\}的经验值！》\s*$/m,
        ],
      },
      {
        src: `${DIR}/處刑改寫.ERB`,
        ref: '405-406',
        any: [
          /^\s*EXP:0:80 \+= LV\s*$\n^\s*PRINTFORMW 《封印吸收了力量，使你获得了\{LV\}的经验值！》\s*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
