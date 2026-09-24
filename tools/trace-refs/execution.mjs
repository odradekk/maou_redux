// 源: tools/trace-check.mjs  @FILES
// issue #348：處刑相關六文件整批移植。

const DIR = 'target/ERB/處刑相關';

export const FILES = [
  {
    js: 'ere/event/event-banishment-fate.js',
    refs: [
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '269-552',
        any: [/^\s*LOCAL:3 = TALENT:A:320 % 1000000000$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '612-890',
        any: [/^\s*SELECTCASE TALENT:\(A\):成为勇者前的生活$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-banishment.js',
    refs: [
      {
        src: 'target/ERB/處刑相關/BANISHMENT.ERB',
        ref: '22-30',
        any: [
          new RegExp(
            '^\\s*PRINTL \\[0\\] 就这样流放掉\\s*$\\s*^\\s*SIF TALENT:A:122\\s*$\\s*^\\s*SETCOLOR \\(GETDEFCOLOR\\(\\) - 0x444444\\)\\s*$\\s*^\\s*PRINTL \\[1\\] 施予男性化的诅咒\\s*$\\s*^\\s*SIF TALENT:A:122\\s*$\\s*^\\s*RESETCOLOR\\s*$\\s*^\\s*PRINTL \\[2\\] 消去之前的记忆\\s*$\\s*^\\s*PRINTL \\[3\\] 变成小动物后放生\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/BANISHMENT.ERB',
        ref: '32',
        any: [new RegExp('^\\s*;PRINTL \\[100\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/BANISHMENT.ERB',
        ref: '41',
        any: [new RegExp('^\\s*ELSEIF RESULT == 100\\s*$', 'm')],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '2-949',
        any: [/^@BANISHMENT$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '27',
        any: [/^\s*RESETCOLOR$/m],
      },
      {
        src: `${DIR}/BANISHMENT.ERB`,
        ref: '613',
        any: [/^\s*MATURO =\s*$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-execution.js',
    refs: [
      {
        src: 'target/ERB/處刑相關/EXECUTION.ERB',
        ref: '79-92',
        any: [
          new RegExp(
            '^\\s*PRINTL \\[0\\] 流放出地下城\\s*$\\s*^\\s*PRINTL \\[1\\] 公开处刑\\s*$\\s*^\\s*PRINTL \\[2\\] 博物馆展品\\s*$\\s*^\\s*PRINTL \\[3\\] 施行猎奇向处刑\\s*$\\s*^\\s*PRINTL \\[4\\] 做成肉便器\\s*$\\s*^\\s*SIF CFLAG:A:700\\s*$\\s*^\\s*RESETCOLOR\\s*$\\s*^\\s*PRINTL \\[5\\] 士兵化\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/EXECUTION.ERB',
        ref: '32',
        any: [
          new RegExp(
            '^\\s*PRINTFORM \\[\\{LAST_MEMBER,2\\}\\] %SAVESTR:COUNT,12,LEFT% %GET_JOB_NAME\\(COUNT\\),6,LEFT% LV\\{CFLAG:COUNT:9,3,RIGHT\\}\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/EXECUTION.ERB',
        ref: '50',
        any: [new RegExp('^\\s*PRINTL \\[100\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/EXECUTION.ERB',
        ref: '339',
        any: [new RegExp('^\\s*SIF FLAG:1 > TARGET\\s*$', 'm')],
      },
      {
        src: `${DIR}/EXECUTION.ERB`,
        ref: '2-372',
        any: [/^@EXECUTION$/m],
      },
      {
        src: `${DIR}/EXECUTION.ERB`,
        ref: '375-446',
        any: [/^@EXECUTION_MINI\(ARGS = ""\)$/m],
      },
    ],
  },
  {
    js: 'ere/page/page-infrastructure.js',
    refs: [
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '46',
        any: [new RegExp('^\\s*PRINTL \\[51\\] 看看肉便器的样子\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '54',
        any: [new RegExp('^\\s*PRINTL \\[50\\] 看看全部展品的样子\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '56-68',
        any: [
          new RegExp(
            '^\\s*PRINTL \\[ 0\\] 看看石像的状态\\s*$\\s*^\\s*PRINTL \\[ 1\\] 看看标本的状态\\s*$\\s*^\\s*PRINTL \\[ 2\\] 看看蜡像的状态\\s*$\\s*^\\s*PRINTL \\[ 3\\] 看看人体模型人偶的状态\\s*$\\s*^\\s*PRINTL \\[ 4\\] 看看球型关节人偶的状态\\s*$\\s*^\\s*PRINTL \\[ 5\\] 看看金属雕像的状态\\s*$\\s*^\\s*PRINTL \\[ 6\\] 看看冰雕的状态\\s*$\\s*^\\s*PRINTL \\[ 7\\] 看看宝石像的状态\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '70',
        any: [
          new RegExp('^\\s*PRINTL \\[99\\] 看看已拍的影像水晶球\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '72',
        any: [new RegExp('^\\s*PRINTL \\[100\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '255-267',
        any: [
          new RegExp(
            '^\\s*PRINT \\[0\\] 播种者　　　　　　现在：\\s*$\\s*^\\s*IF FLAG:613 == 1\\s*$\\s*^\\s*PRINT 俘虏的中年\\s*$\\s*^\\s*ELSEIF FLAG:613 == 2\\s*$\\s*^\\s*PRINT 俘虏的少年\\s*$\\s*^\\s*ELSEIF FLAG:613 == 3\\s*$\\s*^\\s*PRINT 扶她淫魔\\s*$\\s*^\\s*ELSE\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '269',
        any: [new RegExp('^\\s*PRINTFORML \\[999\\]返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '277-280',
        any: [
          new RegExp(
            '^\\s*PRINTL \\[0\\] 怪物\\s*$\\s*^\\s*PRINT \\[1\\] 俘虏的中年\\s*$\\s*^\\s*PRINT \\[2\\] 俘虏的少年\\s*$\\s*^\\s*PRINT \\[3\\] 扶她淫魔\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '361-363',
        any: [
          new RegExp(
            '^\\s*PRINTLC \\[1000\\] - 上一页\\s*$\\s*^\\s*PRINTLC \\[999\\] - 离  开\\s*$\\s*^\\s*PRINTLC \\[1001\\] - 下一页\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '361',
        any: [new RegExp('^\\s*PRINTLC \\[1000\\] - 上一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '362',
        any: [new RegExp('^\\s*PRINTLC \\[999\\] - 离  开\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/INFRASTRUCTURE.ERB',
        ref: '363',
        any: [new RegExp('^\\s*PRINTLC \\[1001\\] - 下一页\\s*$', 'm')],
      },
      {
        src: `${DIR}/INFRASTRUCTURE.ERB`,
        ref: '2-385',
        any: [/^@INFRASTRUCTURE$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-grotesque.js',
    refs: [
      {
        src: `${DIR}/GROTESQUE.ERB`,
        ref: '2-222',
        any: [/^@GROTESQUE$/m],
      },
    ],
  },
  {
    js: 'ere/event/event-public-execution.js',
    refs: [
      {
        src: 'target/ERB/處刑相關/PUBLIC_EXECUTION.ERB',
        ref: '19-21',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[0\\] 凌辱刑\\s*$\\s*^\\s*PRINTFORML \\[1\\] 绞刑\\s*$\\s*^\\s*PRINTFORML \\[2\\] 魂粉砕\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/處刑相關/PUBLIC_EXECUTION.ERB',
        ref: '22',
        any: [new RegExp('^\\s*PRINTFORML\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/PUBLIC_EXECUTION.ERB',
        ref: '26',
        any: [new RegExp('^\\s*INPUT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/PUBLIC_EXECUTION.ERB',
        ref: '23',
        any: [new RegExp('^\\s*;PRINTFORML \\[100\\] 算了\\s*$', 'm')],
      },
      {
        src: 'target/ERB/處刑相關/PUBLIC_EXECUTION.ERB',
        ref: '31-33',
        any: [
          new RegExp(
            '^\\s*ELSEIF RESULT == 100\\s*$\\s*^\\s*TFLAG:16 = -1\\s*$\\s*^\\s*JUMP 批量处刑\\s*$',
            'm',
          ),
        ],
      },
      {
        src: `${DIR}/PUBLIC_EXECUTION.ERB`,
        ref: '2-194',
        any: [/^@PUBLIC_EXECUTION$/m],
      },
    ],
  },
  {
    js: 'ere/system/train/seedbed.js',
    refs: [
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '2-70',
        any: [/^@NAEDOKO, ARG:0$/m],
      },
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '72-104',
        any: [/^@NAEDOKO_MAN, ARG:0$/m],
      },
      {
        src: `${DIR}/NAEDOKO.ERB`,
        ref: '106-130',
        any: [/^@NAEDOKO_NOT_V, ARG:0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
