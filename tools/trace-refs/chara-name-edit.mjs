// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #384（N2）：ere/chara/chara-name-edit.js 的移植状态锚
// （源 キャラ関数/CHARA_NAME_EDIT.ERB 全三函数）。锚逐条取所引行的原文。

export const FILES = [
  {
    js: 'ere/chara/chara-name-edit.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '4-29',
        any: [/^@SHOW_BUTTON_NAME_EDIT\(NUM, ARG, RESET = 0\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '12',
        any: [/^LOCAL = CHECK_ABLE_TO_NAME_EDIT\(ARG\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '13-15',
        any: [/^IF LOCAL == 2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '14-15',
        any: [/^\t; 侵攻中の勇者ならボタン自体を表示しない\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '19-22',
        any: [/^\t; 奴隷で実行不可なら灰色にする\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '21',
        any: [/^\tSETCOLOR 0x646464\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '25',
        any: [/PRINTFORM \[{NUM}\] 还原名字/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '27',
        any: [/PRINTFORM \[{NUM}\] 改名/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '29',
        any: [/^RESETCOLOR\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '32-50',
        any: [/^@CHECK_ABLE_TO_NAME_EDIT\(ARG\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '38-39',
        any: [/你の名前は変えられない/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '40-42',
        any: [/^ELSEIF CFLAG:ARG:1 == 2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '43-45',
        any: [/^ELSEIF CFLAG:ARG:1 ==7\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '46-48',
        any: [/^ELSEIF CFLAG:ARG:1 != 0 && CFLAG:ARG:1 != 3\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '50',
        any: [/^RETURNF 0\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '53-109',
        any: [/^@CHARA_INFO_NAME_EDIT\(ARG,RESET = 0\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '60',
        any: [/^LOCAL = CHECK_ABLE_TO_NAME_EDIT\(ARG\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '61-71',
        any: [/^IF LOCAL != 0 && LOCAL != 1\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '62-65',
        any: [
          /侵攻中の勇者ではボタンが表示されないが、それでも入力すればここに来る。/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '65',
        any: [/^\t\tRETURN 2\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '67',
        any: [/PRINTW 苗床不可改变名字/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '69',
        any: [/PRINTW 角色处于不能变更名字的状态/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '76-85',
        any: [/^IF RESET\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '77',
        any: [/CALL CHARA_NAME_RESET\(ARG\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '78',
        any: [/恢复了原来的名字/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '81-83',
        any: [/^\tIF CFLAG:ARG:450 >= 99\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '82',
        any: [/^\t\tCALL RANDOM_SELF_CALL, ARG\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '87-102',
        any: [/^;\[変える\]\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '89',
        any: [/的新名字是？/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '90',
        any: [/^INPUTS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '92-93',
        any: [/^SELECTCASE STRLENS\(LOCALS\)\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '93-95',
        any: [/^CASE IS > 16\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '95',
        any: [/^\tGOTO INPUT_LOOP\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '97-99',
        any: [/今后被称呼为/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '98',
        any: [/^\tCALLNAME:ARG '= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '99',
        any: [/^\tSAVESTR:ARG '= LOCALS\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '100-101',
        any: [/的名字没有变更。/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '105-107',
        any: [/^IF CFLAG:ARG:450 >= 99\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '106',
        any: [/^\tCALL RANDOM_SELF_CALL, ARG\r?$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_NAME_EDIT.ERB',
        ref: '109',
        any: [/^RETURN 0\r?$/m],
      },
      // 本文件头部注明的调用点：原作的调用方在 CHARA_INFO ver1.0.1.ERB
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '858',
        any: [/CALL SHOW_BUTTON_NAME_EDIT\(0,ARG,0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '859',
        any: [/CALL SHOW_BUTTON_NAME_EDIT\(1,ARG,1\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1045',
        any: [/CALL CHARA_INFO_NAME_EDIT\(ARG,0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1048',
        any: [/CALL CHARA_INFO_NAME_EDIT\(ARG,1\)/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
