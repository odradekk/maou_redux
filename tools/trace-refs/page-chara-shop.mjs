// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #399（N15 段 3）：异界勇者召唤 @CHARA_SIM_SHOP 族（SHOP_CHARA.ERB 七个函数）。
//
// 每条 ref 一对应一个函数的入口或一段判据：锚取自该段里的一条源行
// （含正文，非裸命令），行号漂了即红。全表由该 JS 文件的移植注释扫描生成
// （tools/trace-check.mjs 的 scan_erb_refs），覆盖文件里出现的每个 :N 引用。

export const FILES = [
  {
    js: 'ere/page/page-chara-shop.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '11-128',
        any: [new RegExp('^\\s*@CHARA_SIM_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '21-23',
        any: [new RegExp('^\\s*TFLAG:100 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '25-51',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_SEX\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '27',
        any: [new RegExp('^\\s*TFLAG:100 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '29',
        any: [new RegExp('^\\s*PRINTL 请选择要召唤的勇者的性别\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '30',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[1\\]男性　　　　\\[2\\]女性　　　　\\[3\\]扶她\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '31-34',
        any: [new RegExp('^\\s*\\[IF_DEBUG\\]\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '35',
        any: [new RegExp('^\\s*\\[ENDIF\\]\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '36',
        any: [new RegExp('^\\s*PRINTFORML \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '41',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '44',
        any: [new RegExp('^\\s*ELSEIF RESULT > 3 && RESULT != 99\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '49-50',
        any: [new RegExp('^\\s*SIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '53-127',
        any: [new RegExp('^\\s*\\$ADD_CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '54',
        any: [new RegExp('^\\s*CALL SHOW_SHOP_CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '60-62',
        any: [new RegExp('^\\s*IF SEXCOIN == 99\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '63',
        any: [new RegExp('^\\s*CHARA = 211\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '64',
        any: [new RegExp('^\\s*ADDCHARA CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '65',
        any: [new RegExp('^\\s*CALL ADDCHARA_EX, CHARANUM-1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '66',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_SEX\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '68-69',
        any: [new RegExp('^\\s*SIF SEXCOIN == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '69',
        any: [new RegExp('^\\s*TALENT:A:122 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '70-71',
        any: [new RegExp('^\\s*SIF SEXCOIN == 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '71',
        any: [new RegExp('^\\s*TALENT:A:121 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '73-74',
        any: [new RegExp('^\\s*CALL CHAR_MAKE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '75',
        any: [new RegExp('^\\s*CFLAG:A:1 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '77-79',
        any: [new RegExp('^\\s*;善良値調整、念のため\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '81',
        any: [new RegExp('^\\s*ELSEIF RESULT > 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '82',
        any: [
          new RegExp('^\\s*PRINTFORML %SAVESTR:A%回应了你的召唤………\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '83',
        any: [
          new RegExp(
            '^\\s*PRINTL \\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\*\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '84',
        any: [new RegExp('^\\s*PRINTW\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '85',
        any: [new RegExp('^\\s*CALL SHOW_CHARA_INFO, A, -2\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '87',
        any: [
          new RegExp('^\\s*PRINTFORML 确定要召唤%SAVESTR:A%么？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '88',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '89',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '90-96',
        any: [new RegExp('^\\s*PRINT \\[0\\] 就是\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '99-111',
        any: [new RegExp('^\\s*CALL PARTY_CHAR_DEL, A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '101',
        any: [new RegExp('^\\s*IF MONEY <= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '102-103',
        any: [new RegExp('^\\s*PRINTL 　请选择魔物从者的种类\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '105',
        any: [new RegExp('^\\s*CALL PARTY_CHAR_DEL, A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '106',
        any: [new RegExp('^\\s*DELCHARA A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '107',
        any: [new RegExp('^\\s*MONEY -= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '108',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '109',
        any: [new RegExp('^\\s*CALL NAME_RESET\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '110',
        any: [new RegExp('^\\s*GOTO ADD_CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '112-125',
        any: [new RegExp('^\\s*ELSEIF EXP:MASTER:81 < 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '114-115',
        any: [new RegExp('^\\s*CALL SELECT_MONSTER, RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '116',
        any: [new RegExp('^\\s*ELSEIF EXP:MASTER:81 < 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '116-118',
        any: [new RegExp('^\\s*ELSEIF EXP:MASTER:81 < 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '120',
        any: [new RegExp('^\\s*;キャラのNOを選定\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '121',
        any: [new RegExp('^\\s*CHARA = TFLAG:102\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '122',
        any: [new RegExp('^\\s*EXP:MASTER:81 -= 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '123-124',
        any: [new RegExp('^\\s*SIF CFLAG:A:999 == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '126-128',
        any: [new RegExp('^\\s*SIF SEXCOIN == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '128',
        any: [new RegExp('^\\s*SIF SEXCOIN == 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '133-151',
        any: [new RegExp('^\\s*@SHOW_SHOP_CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '138',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '141',
        any: [
          new RegExp('^\\s*PRINTFORML %SAVESTR:A%回应了你的召唤………\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '150',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 所持金：\\{MONEY\\}点\t\t勋章：\\{EXP:MASTER:81\\}点\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '151',
        any: [new RegExp('^\\s*PRINT 他\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '155-234',
        any: [new RegExp('^\\s*@SELECT_CHARA, ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '166',
        any: [new RegExp('^\\s*TFLAG:100 = ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '237-359',
        any: [new RegExp('^\\s*@BUY_CHARA, ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '361-432',
        any: [new RegExp('^\\s*@CHAR_IKAI_CREATE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '361-363',
        any: [new RegExp('^\\s*@CHAR_IKAI_CREATE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '364',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 强行从异世界召唤魔王想要召唤的人\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '364-366',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 强行从异世界召唤魔王想要召唤的人\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '365',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 这将耗费不少的金钱以及更多的勋章\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '367',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '368',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '370',
        any: [new RegExp('^\\s*CALL SHOW_SHOP_CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '371',
        any: [new RegExp('^\\s*LOCAL = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '372',
        any: [new RegExp('^\\s*FOR L_I, 10000, 100000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '372-384',
        any: [new RegExp('^\\s*FOR L_I, 10000, 100000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '373-374',
        any: [new RegExp('^\\s*SIF !EXISTCSV\\(L_I\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '375-377',
        any: [new RegExp('^\\s*SIF A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '378',
        any: [
          new RegExp(
            '^\\s*PRINTFORM  \\[\\{L_I,2\\}\\] %CSVNAME\\(L_I\\),14,LEFT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '382',
        any: [new RegExp('^\\s*SIF LOCAL % 5 == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '382-383',
        any: [new RegExp('^\\s*SIF LOCAL % 5 == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '385-386',
        any: [new RegExp('^\\s*SIF !LINEISEMPTY\\(\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '386-388',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '389',
        any: [new RegExp('^\\s*PRINT \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '391',
        any: [new RegExp('^\\s*INPUT 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '393-395',
        any: [new RegExp('^\\s*SELECTCASE RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '396-397',
        any: [new RegExp('^\\s*L_I = RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '400-403',
        any: [new RegExp('^\\s*IF !EXISTCSV\\(L_I\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '405',
        any: [new RegExp('^\\s*A = -1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '407-409',
        any: [new RegExp('^\\s*;启用当前已登录的角色\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '411-432',
        any: [new RegExp('^\\s*IF A < 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '413',
        any: [new RegExp('^\\s*IF MONEY < D\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '417',
        any: [new RegExp('^\\s*ELSEIF EXP:MASTER:81 < C\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '422-424',
        any: [new RegExp('^\\s*MONEY -= D\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '422',
        any: [new RegExp('^\\s*MONEY -= D\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '423',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= D\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '424',
        any: [new RegExp('^\\s*EXP:MASTER:81 -= C\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '426-427',
        any: [new RegExp('^\\s*CALL CHAR_IKAI_APPEND\\(L_I, 1\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '428-432',
        any: [
          new RegExp('^\\s*PRINTFORML %NAME:A%被你强行召唤了………\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '429',
        any: [
          new RegExp('^\\s*PRINTFORML %NAME:A%被你强行召唤了………\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '431',
        any: [new RegExp('^\\s*PRINTW\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '435-449',
        any: [new RegExp('^\\s*@CHAR_IKAI_APPEND\\(ARG, ARG:1\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '436',
        any: [new RegExp('^\\s*ADDCHARA ARG\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '437',
        any: [new RegExp('^\\s*LOCAL = TARGET\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '438',
        any: [new RegExp('^\\s*CALL ADDCHARA_EX, CHARANUM-1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '439',
        any: [new RegExp('^\\s*TARGET = CHARANUM - 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '440',
        any: [new RegExp('^\\s*A = CHARANUM - 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '443',
        any: [new RegExp('^\\s*CALL CHAR_INIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '446',
        any: [new RegExp('^\\s*CFLAG:A:1 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '448',
        any: [new RegExp('^\\s*TARGET = LOCAL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '449',
        any: [new RegExp('^\\s*RETURN A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '451-458',
        any: [new RegExp('^\\s*@CHARA_IKAI_COST\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '453',
        any: [new RegExp('^\\s*C = L_I % 10000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '453-454',
        any: [new RegExp('^\\s*C = L_I % 10000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '454',
        any: [new RegExp('^\\s*C = C / 5\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '455-456',
        any: [new RegExp('^\\s*SIF C < 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '457',
        any: [new RegExp('^\\s*D = C \\* 2000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '408',
        any: [new RegExp('^\\s*SIF INRANGE\\(L_I,10000,100000\\)\\s*$', 'm')],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
