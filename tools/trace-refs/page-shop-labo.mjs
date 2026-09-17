// 源: tools/trace-check.mjs  @FILES
// issue #398 新增：ere/page/page-shop-labo.js ↔ target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB
// 锚按「所引行（区间取首个带正文行）的整行字面量」生成（逐条在场校验 + 源侧锚
// 校验由 trace-check 执行）。全文 1110 条引用逐条登记。

export const FILES = [
  {
    js: 'ere/page/page-shop-labo.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1',
        any: [/^\s*;=================================================\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4-196',
        any: [/^\s*@SECRET_LABO\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '5',
        any: [/^\s*P = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '8-47',
        any: [/^\s*\$DRAW_PAGE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '9-15',
        any: [/^\s*LOCAL = LINECOUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '13',
        any: [/^\s*PRINTL 魔界的大门\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '14',
        any: [/^\s*PRINTL 《可以对奴隶进行肉体和精神的魔改》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '16-22',
        any: [/^\s*PRINTV DAY\+1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '19-25',
        any: [/^\s*PRINTL  午前\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '24',
        any: [/^\s*PRINTFORML 所持金：\{MONEY\}点\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '26-27',
        any: [/^\s*IF P == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '28-29',
        any: [/^\s*ELSEIF P == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '30-31',
        any: [/^\s*ELSEIF P == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '32-33',
        any: [/^\s*CALL LABO_PAGE4\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '36-41',
        any: [/^\s*REPEAT LOCAL \+ 22 - LINECOUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '42',
        any: [/^\s*PRINTLC  \[997\] - 前一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '43',
        any: [/^\s*PRINTLC  \[999\] - 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '44',
        any: [/^\s*PRINTLC  \[998\] - 后一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '45',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '48-196',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '49',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '51-52',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '53-54',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '55-56',
        any: [/^\s*ELSEIF RESULT == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '57-58',
        any: [/^\s*ELSEIF RESULT == 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '59-60',
        any: [/^\s*ELSEIF RESULT == 4\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '61-62',
        any: [/^\s*ELSEIF RESULT == 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '63-64',
        any: [/^\s*ELSEIF RESULT == 6\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '65-66',
        any: [/^\s*ELSEIF RESULT == 7\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '67-68',
        any: [/^\s*ELSEIF RESULT == 8\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '69-70',
        any: [/^\s*ELSEIF RESULT == 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '71-72',
        any: [/^\s*ELSEIF RESULT == 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '73-74',
        any: [/^\s*ELSEIF RESULT == 11\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '75-76',
        any: [/^\s*ELSEIF RESULT == 12\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '77-78',
        any: [/^\s*ELSEIF RESULT == 13\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '79-80',
        any: [/^\s*ELSEIF RESULT == 14\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '81-82',
        any: [/^\s*ELSEIF RESULT == 15\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '83-84',
        any: [/^\s*ELSEIF RESULT == 16\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '85-86',
        any: [/^\s*ELSEIF RESULT == 17\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '87-88',
        any: [/^\s*ELSEIF RESULT == 18\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '89-90',
        any: [/^\s*ELSEIF RESULT == 19\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '91-92',
        any: [/^\s*ELSEIF RESULT == 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '93-94',
        any: [/^\s*ELSEIF RESULT == 21\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '95-96',
        any: [/^\s*ELSEIF RESULT == 22\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '97-98',
        any: [/^\s*ELSEIF RESULT == 23\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '99-100',
        any: [/^\s*ELSEIF RESULT == 24\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '102-103',
        any: [/^\s*ELSEIF RESULT == 25\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '104-119',
        any: [/^\s*ELSEIF RESULT == 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '105-107',
        any: [/^\s*C = 5000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '108-111',
        any: [/^\s*ELSEIF RESULT == 31\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '112-115',
        any: [/^\s*ELSEIF RESULT == 32\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '116-119',
        any: [/^\s*ELSEIF RESULT == 33\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '120-121',
        any: [/^\s*ELSEIF RESULT == 50 && ITEM:90 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '122-123',
        any: [/^\s*ELSEIF RESULT == 51 && EXP:MASTER:81\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '124-125',
        any: [/^\s*ELSEIF RESULT == 52 && EXP:MASTER:81\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '126-127',
        any: [/^\s*ELSEIF RESULT == 54 && EXP:MASTER:81\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '128-129',
        any: [/^\s*ELSEIF RESULT == 55 && EXP:MASTER:81\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '130-131',
        any: [/^\s*ELSEIF RESULT == 56\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '132-133',
        any: [/^\s*ELSEIF RESULT == 59\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '134-135',
        any: [/^\s*ELSEIF RESULT == 60\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '136-137',
        any: [/^\s*ELSEIF RESULT == 64\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '138-139',
        any: [/^\s*ELSEIF RESULT == 65\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '140-141',
        any: [/^\s*ELSEIF RESULT == 66\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '142-143',
        any: [/^\s*ELSEIF RESULT == 67\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '144-164',
        any: [/^\s*ELSEIF RESULT == 68\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '146',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '149',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '152',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '155',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '158',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '161',
        any: [/^\s*PRINTW 勇者数量过多\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '164',
        any: [/^\s*CALL CHAR_CREATE\(0\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '165-179',
        any: [/^\s*ELSEIF RESULT == 70\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '165-180',
        any: [/^\s*ELSEIF RESULT == 70\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '166-179',
        any: [/^\s*C = 5000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '178-184',
        any: [/^\s*C = 5000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '181-182',
        any: [/^\s*ELSEIF RESULT == 74\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '183-184',
        any: [/^\s*ELSEIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '185-187',
        any: [/^\s*ELSEIF RESULT == 997\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '186-190',
        any: [/^\s*P \+= 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '188-190',
        any: [/^\s*ELSEIF RESULT == 998\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '191-193',
        any: [/^\s*CLEARLINE 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '196',
        any: [/^\s*GOTO DRAW_PAGE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '199',
        any: [/^\s*@LABO_PAGE1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '201-215',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '201',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '202',
        any: [/^\s*PRINTL □肉体改造\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '203',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '204',
        any: [/^\s*PRINTL  \[ 0\] - 丰胸改造               （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '205',
        any: [/^\s*PRINTL  \[ 1\] - 平胸改造               （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '206',
        any: [/^\s*PRINTL  \[ 2\] - 加入母乳体质           （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '207',
        any: [/^\s*PRINTL  \[ 3\] - 扶她化                 （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '208',
        any: [/^\s*PRINTL  \[ 4\] - 去扶她化               （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '209',
        any: [/^\s*PRINTL  \[ 5\] - 附上动物耳朵           （2000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '210',
        any: [/^\s*PRINTL  \[ 6\] - 去除动物耳朵           （1000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '211',
        any: [/^\s*PRINTL  \[ 7\] - 性成熟            　   （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '212',
        any: [/^\s*PRINTL  \[ 8\] - 记忆消去               （100000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '213',
        any: [/^\s*PRINTL  \[ 9\] - 阴部永久脱毛           （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '214',
        any: [/^\s*PRINTL  \[10\] - 消去母乳体质           （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '215',
        any: [/^\s*PRINTL  \[11\] - 消除漏尿癖             （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '218',
        any: [/^\s*@LABO_PAGE2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '220-236',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '220',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '221',
        any: [/^\s*PRINTL □肉体改造\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '222',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '223',
        any: [/^\s*PRINTL  \[12\] - 处女膜再生术           （100000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '224',
        any: [/^\s*PRINTL  \[13\] - 施加私处封印           （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '225',
        any: [/^\s*PRINTL  \[14\] - 解除私处封印           （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '226',
        any: [/^\s*PRINTL  \[15\] - 刺青的刻印\/消去        （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '227',
        any: [/^\s*PRINTL  \[16\] - 头发颜色改变           （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '228',
        any: [/^\s*PRINTL  \[17\] - 肤色改变               （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '229',
        any: [/^\s*PRINTL  \[18\] - 感觉封锁               （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '230',
        any: [/^\s*PRINTL  \[19\] - 异常妊娠体质           （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '231',
        any: [/^\s*PRINTL  \[20\] - 消除异常妊娠体质       （35000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '232',
        any: [/^\s*PRINTL  \[21\] - 变性                   （200000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '233',
        any: [/^\s*PRINTL  \[22\] - 自由局部调教设定       （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '234',
        any: [/^\s*PRINTL  \[23\] - 淫乱爱慕互换           （500000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '235',
        any: [/^\s*PRINTL  \[24\] - 减龄魔药               （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '236',
        any: [/^\s*PRINTL  \[25\] - 肉棒改造               （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '238',
        any: [/^\s*@LABO_PAGE3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '240-258',
        any: [/^\s*PRINTL □其他\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '240',
        any: [/^\s*PRINTL □其他\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '241',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '242-243',
        any: [/^\s*SIF ITEM:90 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '246',
        any: [/^\s*PRINTL  \[51\] - 死者苏生               （勋章交换）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '247',
        any: [/^\s*PRINTL  \[52\] - 赋予生命               （勋章交换）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '248',
        any: [/^\s*PRINTL  \[54\] - 安抚崩坏的心           （勋章交换）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '249',
        any: [/^\s*PRINTL  \[55\] - 寻访贞操带钥匙         （勋章交换）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '251',
        any: [/^\s*PRINTL  \[56\] - 召唤影之仆从           （100000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '252',
        any: [/^\s*PRINTL  \[59\] - 赋予犄角               （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '253',
        any: [/^\s*PRINTL  \[60\] - 恶魔体征改造           （20000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '254',
        any: [/^\s*PRINTL  \[64\] - 转生的秘法             （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '255',
        any: [/^\s*PRINTL  \[65\] - 魂缚的诅咒             （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '256',
        any: [/^\s*PRINTL  \[66\] - 魂缚的解咒             （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '257',
        any: [/^\s*PRINTL  \[67\] - 狂王俘虏的消去         （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '258',
        any: [
          /^\s*PRINTL  \[68\] - 生命摇篮　             （起价500000点，按素质加价，上百万是正常的）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '262',
        any: [/^\s*@LABO_PAGE4\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '264-278',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '264',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '265',
        any: [/^\s*PRINTL □战斗\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '266',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '267',
        any: [/^\s*PRINTL  \[70\] - HP＋10                 （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '268',
        any: [/^\s*PRINTL  \[71\] - 气力＋10               （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '269',
        any: [/^\s*PRINTL  \[72\] - 攻击＋1                （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '270',
        any: [/^\s*PRINTL  \[73\] - 防御＋1                （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '271',
        any: [/^\s*PRINTL  \[74\] - 赋予魔法耐性           （50000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '272',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '273',
        any: [/^\s*PRINTL □洗脑 （助手用）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '274',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '275',
        any: [/^\s*PRINTL  \[30\] -【无视污垢】            （5000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '276',
        any: [/^\s*PRINTL  \[31\] -【早泄】                （8000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '277',
        any: [/^\s*PRINTL  \[32\] -【幼稚】                （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '278',
        any: [/^\s*PRINTL  \[33\] -【抖Ｓ】                （10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '283-1530',
        any: [/^\s*@MODIFY_BUSTUP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '283-392',
        any: [/^\s*@MODIFY_BUSTUP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '286-292',
        any: [/^\s*#DIM NUM_PAGE = 23\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '287',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '289-292',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '296',
        any: [/^\s*PRINTL 改造后，改造对象的乳房将增大到一个新的层次\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '297',
        any: [/^\s*PRINTL 要为谁丰胸？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '309-310',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '328-330',
        any: [/^\s*ELSEIF TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '331-333',
        any: [/^\s*ELSEIF TALENT:RESULT:119\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '339-343',
        any: [/^\s*IF TALENT:RESULT:110 \|\| TALENT:RESULT:114\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '340',
        any: [
          /^\s*PRINTFORML %SAVESTR:RESULT%胸部伟岸，要更上一层楼，需要50000点。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '344',
        any: [/^\s*PRINTL 这样还要继续么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '346',
        any: [/^\s*PRINTFORML 为%SAVESTR:RESULT%进行巨乳化改造吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '356-357',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '358-375',
        any: [/^\s*ELSEIF RESULT == 0 && TALENT:T:116\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '359',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的【%TALENTNAME:109%】消去了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '360-390',
        any: [/^\s*TALENT:T:116 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '360',
        any: [/^\s*TALENT:T:116 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '361',
        any: [/^\s*TALENT:T:109 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '363',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的胸是标准大小》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '364',
        any: [/^\s*TALENT:T:109 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '366',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:114%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '367',
        any: [/^\s*TALENT:T:110 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '368',
        any: [/^\s*TALENT:T:114 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '370-377',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:119%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '370',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:119%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '371',
        any: [/^\s*TALENT:T:114 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '372',
        any: [/^\s*TALENT:T:119 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '374',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:110%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '375',
        any: [/^\s*TALENT:T:110 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '380-381',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '383-390',
        any: [/^\s*IF T != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '383',
        any: [/^\s*IF T != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '384',
        any: [/^\s*IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '386',
        any: [/^\s*CALL CHAR_SIZE_GENERATE, T, CFLAG:T:451, 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '386-392',
        any: [/^\s*CALL CHAR_SIZE_GENERATE, T, CFLAG:T:451, 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '387',
        any: [/^\s*CFLAG:T:454 = RESULT:3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '388',
        any: [/^\s*CFLAG:T:455 = RESULT:4\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '397-498',
        any: [/^\s*@MODIFY_BUSTDOWN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '403-406',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '410',
        any: [/^\s*PRINTL 改造对象的乳房将变小到一个新的层次。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '411',
        any: [/^\s*PRINTL 要推平谁的胸？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '420',
        any: [/^\s*SIF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '441-443',
        any: [/^\s*ELSEIF TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '444-446',
        any: [/^\s*ELSEIF TALENT:RESULT:116\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '452',
        any: [/^\s*PRINTFORML 对%SAVESTR:RESULT%进行贫乳改造吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '462-463',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '464-481',
        any: [/^\s*ELSEIF RESULT == 0 && TALENT:T:119\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '465',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了【%TALENTNAME:114%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '466-494',
        any: [/^\s*TALENT:T:119 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '466',
        any: [/^\s*TALENT:T:119 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '467',
        any: [/^\s*TALENT:T:114 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '469',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了【%TALENTNAME:110%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '470',
        any: [/^\s*TALENT:T:114 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '471',
        any: [/^\s*TALENT:T:110 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '473',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的胸是标准大小》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '474',
        any: [/^\s*TALENT:T:110 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '476-483',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的胸部线条完全没有了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '476',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的胸部线条完全没有了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '477',
        any: [/^\s*TALENT:T:109 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '478',
        any: [/^\s*TALENT:T:116 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '480',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了【%TALENTNAME:109%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '481',
        any: [/^\s*TALENT:T:109 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '486-487',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '489-496',
        any: [/^\s*IF T != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '492-498',
        any: [/^\s*CALL CHAR_SIZE_GENERATE, T, CFLAG:T:451, 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '503-583',
        any: [/^\s*@MODIFY_BONYU\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '507',
        any: [/^\s*C = 50000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '509-512',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '510',
        any: [/^\s*PRINTW 有钱的孩子才有奶喝\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '514',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '516',
        any: [/^\s*PRINTL 活化改在对象的乳腺，让她分泌母乳。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '517',
        any: [/^\s*PRINTL 要将谁母乳化？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '548-550',
        any: [/^\s*ELSEIF TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '551-553',
        any: [/^\s*ELSEIF TALENT:RESULT:109 \|\| TALENT:RESULT:116\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '554-556',
        any: [/^\s*ELSEIF TALENT:RESULT:130\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '562',
        any: [/^\s*PRINTFORML 将%SAVESTR:RESULT%母乳体质化吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '571-578',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '574-575',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的母乳，现在随时为你待命了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '574',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的母乳，现在随时为你待命了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '575',
        any: [/^\s*TALENT:T:130 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '577-583',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '580-581',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '582',
        any: [/^\s*CALL N_BREAST_GROW, T\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '588-680',
        any: [/^\s*@MODIFY_FUTANARI\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '594-597',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '601',
        any: [/^\s*PRINTL 将改造对象的阴蒂给阳具化，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '602',
        any: [/^\s*PRINTL 在卵巢内加入精囊一样的组织。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '603',
        any: [/^\s*PRINTL 要将谁扶她化？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '633-635',
        any: [/^\s*ELSEIF TALENT:RESULT:121 \|\| TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '643',
        any: [/^\s*PRINTFORML 给%SAVESTR:RESULT%怎么样的阳具呢？？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '645-650',
        any: [/^\s*PRINTL  \[0\] - 普通\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '652',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '654-655',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '657',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:121%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '658',
        any: [/^\s*PRINT 阴茎的状态：\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '659-668',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '659-669',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '670-673',
        any: [/^\s*TALENT:T:121 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '670',
        any: [/^\s*TALENT:T:121 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '671',
        any: [/^\s*TALENT:T:326 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '672',
        any: [/^\s*TALENT:T:318 = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '673',
        any: [/^\s*TALENT:T:1 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '674-675',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '675-680',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '678-679',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '685-760',
        any: [/^\s*@MODIFY_FUTANARI_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '689',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '692',
        any: [/^\s*PRINTW 钱不够，快快去挣钱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '698',
        any: [/^\s*PRINTL 扶她消去\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '699',
        any: [/^\s*PRINTL 要消去谁的扶她呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '729-731',
        any: [/^\s*ELSEIF TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '732-734',
        any: [/^\s*ELSEIF TALENT:RESULT:121 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '742',
        any: [/^\s*PRINTFORML 将%SAVESTR:RESULT%的阴茎消去么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '752',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的【%TALENTNAME:121%】消去了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '753',
        any: [/^\s*TALENT:T:121 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '765-841',
        any: [/^\s*@MODIFY_ANIMAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '769',
        any: [/^\s*C = 2000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '772',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '778',
        any: [
          /^\s*PRINTL 将用动物的遗传因子覆盖改造对象的一部分遗传因子。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '779',
        any: [/^\s*PRINTL 赋予谁动物耳朵呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '809-811',
        any: [/^\s*ELSEIF TALENT:RESULT:124\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '819',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%动物耳朵吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '829-830',
        any: [/^\s*IF TALENT:T:314 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '832',
        any: [/^\s*PRINTFORMW 《%NAME:T%长出【%TALENTNAME:124%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '834',
        any: [/^\s*TALENT:T:124 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '846-920',
        any: [/^\s*@MODIFY_ANIMAL_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '850',
        any: [/^\s*C = 1000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '853',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '859',
        any: [/^\s*PRINTL 消去动物耳朵\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '860',
        any: [/^\s*PRINTL 消去谁的动物耳朵？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '891-893',
        any: [/^\s*ELSEIF TALENT:RESULT:124 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '898',
        any: [/^\s*PRINTFORML 要消去%SAVESTR:RESULT%的动物耳朵吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '909',
        any: [
          /^\s*PRINTFORMW 《%NAME:T%失去了人狼的象征【%TALENTNAME:124%】了……》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '911',
        any: [/^\s*PRINTFORMW 《%NAME:T%的【%TALENTNAME:124%】消去了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '913',
        any: [/^\s*TALENT:T:124 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '925-997',
        any: [/^\s*@MODIFY_REMOVEHAIR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '929',
        any: [/^\s*C = 5000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '932',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '938',
        any: [/^\s*PRINTL 阴毛长了还分叉？魔王帮你一劳永逸！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '939',
        any: [/^\s*PRINTL 帮谁永久脱毛呢？？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '970-972',
        any: [/^\s*ELSEIF TALENT:RESULT:125\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '977',
        any: [/^\s*PRINTFORML 帮%SAVESTR:RESULT%永久脱毛吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '987',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:125%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '988',
        any: [/^\s*TALENT:T:125 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '989-990',
        any: [/^\s*TALENT:T:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '989',
        any: [/^\s*TALENT:T:310 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '990',
        any: [/^\s*TALENT:T:311 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1003-1091',
        any: [/^\s*@MODIFY_DEIMMATURITY\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1007',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1010',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1016',
        any: [/^\s*PRINTL 把改造对象的性器发育，可以进行正常性行为。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1017',
        any: [/^\s*PRINTL 要消去谁的未熟呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1047-1049',
        any: [/^\s*ELSEIF TALENT:RESULT:135 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1054',
        any: [/^\s*PRINTFORML 消去%SAVESTR:RESULT%的未熟么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1064',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的【%TALENTNAME:135%】消去了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1065',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的身体发育了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1066',
        any: [/^\s*TALENT:T:135 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1073-1090',
        any: [/^\s*;除去未熟后，性征成長，早熟\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1074',
        any: [/^\s*IF T != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1077-1087',
        any: [/^\s*TALENT:T:318 -= RAND:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1077',
        any: [/^\s*TALENT:T:318 -= RAND:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1079-1080',
        any: [/^\s*SIF TALENT:T:318 < 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1082-1089',
        any: [/^\s*IF TALENT:T:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1096-1243',
        any: [/^\s*@MODIFY_AMNESIA\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1101',
        any: [/^\s*C = 100000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1103-1106',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1110',
        any: [/^\s*PRINTL 维持改造对象的肉体及感觉不变，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1111',
        any: [/^\s*PRINTL 将记忆恢复到调教开始之前。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1112',
        any: [/^\s*PRINTL 要消除谁的记忆呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1114',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1142-1143',
        any: [/^\s*ELSEIF RESULT == MASTER\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1146',
        any: [/^\s*D = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1148',
        any: [/^\s*PRINTFORML 要消除%SAVESTR:D%的記憶吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1155-1156',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1159-1161',
        any: [/^\s*;助手だった場合は解除\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1162-1163',
        any: [/^\s*SIF FLAG:2 == D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1163',
        any: [/^\s*FLAG:2 = -1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1165-1188',
        any: [/^\s*;ABL初期化\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1190-1192',
        any: [/^\s*;陥落系素質の初期化\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1191',
        any: [/^\s*TALENT:D:85 = 0		;愛\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1192',
        any: [/^\s*TALENT:D:86 = 0		;妄信\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1200-1203',
        any: [/^\s*;CFLAGの初期化\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1201',
        any: [/^\s*CFLAG:D:0 = 0		;売却及び助手可能\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1202',
        any: [/^\s*CFLAG:D:2 = 0		;好感度\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1203',
        any: [/^\s*CFLAG:D:10 = 0		;調教経験回数\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1205',
        any: [/^\s*PRINTFORML 《%SAVESTR:D%失去调教之後的所有记忆了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1207',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1209-1220',
        any: [/^\s*;妊娠していた場合\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1211',
        any: [
          /^\s*PRINTFORML 由於身体传来的异样感，让他不由自主地向下看着自己突然膨胀起来的腹部，\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1212',
        any: [/^\s*PRINTFORML 让%CALLNAME:D%整个人呆愣失神了……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1213',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1215',
        any: [/^\s*PRINTFORML %CALLNAME:D%的心中有什么东西坏掉了……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1216',
        any: [/^\s*PRINTFORML %CALLNAME:D%的精神【%TALENTNAME:9%】了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1217',
        any: [/^\s*TALENT:D:9 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1218',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1221-1235',
        any: [/^\s*;育児中だった場合\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1223',
        any: [/^\s*PRINTFORML %CALLNAME:D%猛然发现自己在抚养着婴儿……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1224',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1226',
        any: [
          /^\s*PRINTFORML 自己的乳房被陌生的婴儿含在嘴里、%CALLNAME:D%露出了不可思议的神情、\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1227',
        any: [
          /^\s*PRINTFORML 但似乎下定了决心、%SAVESTR:D%抱起婴儿，把自己的乳头托到了婴儿的嘴边。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1228',
        any: [/^\s*PRINTFORML 《%SAVESTR:D%继续照顾起了孩子》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1229',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1231',
        any: [
          /^\s*PRINTFORML 自己的乳房被陌生的婴儿含在嘴里、%CALLNAME:D%露出了惊异莫名的神情\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1232',
        any: [/^\s*CALL CHILD_CARE_CHANGE_NURSE\(C\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1237-1239',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1238-1243',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1241-1242',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1246-1372',
        any: [/^\s*\[SKIPSTART\]\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1284',
        any: [/^\s*C = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1298',
        any: [/^\s*VARSET MARK:C:0, 0, 0, 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1301',
        any: [/^\s*VARSET ABL:C:0, 0, 10, 40\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1308',
        any: [/^\s*VARSET EXP:C:0, 0, 0, 60\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1309',
        any: [/^\s*VARSET EXP:C:0, 0, 61, 80\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1312',
        any: [/^\s*CFLAG:C:15 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1313',
        any: [/^\s*CFLAG:C:16 = -1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1321',
        any: [/^\s*CFLAG:C:2 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1324',
        any: [/^\s*VARSET TALENT:C:0, 0, 74, 79\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1359',
        any: [/^\s*CALL CHILD_CARE_CHANGE_NURSE\(C\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1379-1455',
        any: [/^\s*@MODIFY_BONYU_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1383',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1386',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1392',
        any: [/^\s*PRINTL 乳腺的退化改造。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1393',
        any: [/^\s*PRINTL 要消去谁的母乳体质呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1423-1425',
        any: [/^\s*ELSEIF TALENT:RESULT:130 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1426-1428',
        any: [/^\s*ELSEIF TALENT:RESULT:153\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1429-1431',
        any: [/^\s*ELSEIF TALENT:RESULT:154\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1434',
        any: [/^\s*PRINTFORML 消去%SAVESTR:RESULT%的母乳体质么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1446',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%不再分泌母乳了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1447',
        any: [/^\s*TALENT:T:130 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1454',
        any: [/^\s*CALL N_BREAST_REVERSE, T\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1460-1530',
        any: [/^\s*@MODIFY_OMORASHI_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1464',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1467',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1473',
        any: [/^\s*PRINTL 治疗漏尿的问题\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1474',
        any: [/^\s*PRINTL 消除谁的漏尿癖？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1504-1506',
        any: [/^\s*ELSEIF TALENT:RESULT:57 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1509',
        any: [/^\s*PRINTFORML 消去%SAVESTR:RESULT%的漏尿癖吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1521',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的漏尿癖被治好了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1522-1523',
        any: [/^\s*TALENT:T:57 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1522',
        any: [/^\s*TALENT:T:57 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1523',
        any: [/^\s*EXP:T:31 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1535',
        any: [/^\s*@SHOJO_SAISEI\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1535-1610',
        any: [/^\s*@SHOJO_SAISEI\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1539',
        any: [/^\s*C = 100000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1542',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1548',
        any: [/^\s*PRINTFORML 生命没有第二次，但处女膜可以。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1549',
        any: [/^\s*PRINTFORML 再生谁的处女膜？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1580-1582',
        any: [/^\s*ELSEIF TALENT:RESULT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1584-1586',
        any: [/^\s*ELSEIF TALENT:RESULT:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1589',
        any: [/^\s*PRINTFORML 再生%SAVESTR:RESULT%的处女膜吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1601',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了【%TALENTNAME:0%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1602-1603',
        any: [/^\s*TALENT:T:0 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1602',
        any: [/^\s*TALENT:T:0 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1603',
        any: [/^\s*CFLAG:T:71 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1614',
        any: [/^\s*@SHOJO_SEAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1614-1684',
        any: [/^\s*@SHOJO_SEAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1618',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1621',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1627',
        any: [/^\s*PRINTFORML 封印对象的性器。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1628',
        any: [/^\s*PRINTFORML 要封印谁的性器呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1659-1661',
        any: [/^\s*ELSEIF TALENT:RESULT:273\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1664',
        any: [/^\s*PRINTFORML 封印%SAVESTR:RESULT%的性器吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1676',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了【%TALENTNAME:273%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1677',
        any: [/^\s*TALENT:T:273 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1689',
        any: [/^\s*@SHOJO_SEAL_OFF\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1689-1759',
        any: [/^\s*@SHOJO_SEAL_OFF\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1693',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1696',
        any: [/^\s*PRINTW 穷鬼玩啥处女啊！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1702',
        any: [/^\s*PRINTFORML 解除对象的性器封印\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1703',
        any: [/^\s*PRINTFORML 要解除谁的封印呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1734-1736',
        any: [/^\s*ELSEIF TALENT:RESULT:273 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1739',
        any: [/^\s*PRINTFORML 解除%SAVESTR:RESULT%的封印吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1751',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的【%TALENTNAME:273%】失去了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1752',
        any: [/^\s*TALENT:T:273 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1765-1894',
        any: [/^\s*@TATOO_SET_OFF\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1779-1786',
        any: [/^\s*TATOO_NAME:10 = 脸\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1788',
        any: [/^\s*COST = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1790-1793',
        any: [/^\s*IF MONEY < COST\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1797',
        any: [/^\s*PRINTFORML 消除对象的刺青\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1798',
        any: [/^\s*PRINTFORML 要消除谁的刺青？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1830-1841',
        any: [/^\s*PRINTFORML %SAVESTR:RESULT%的刺青\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1830',
        any: [/^\s*PRINTFORML %SAVESTR:RESULT%的刺青\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1831',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1833',
        any: [/^\s*TATOO_TARGET = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1836-1838',
        any: [/^\s*FOR TATOO_COUNT,10, 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1841',
        any: [/^\s*PRINTL  \[999\] - 停止\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1843',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1845-1846',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1848',
        any: [/^\s*PRINTFORML %TATOO_NAME:RESULT%的刺青被处理了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1849-1851',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1853',
        any: [/^\s*TATOO_SELECT = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1855',
        any: [
          /^\s*PRINTFORML 请自由输入想雕刻的刺青，留空代表将要被消去。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1856-1859',
        any: [/^\s*PRINTFORM 现在雕刻的刺青是：\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1860-1862',
        any: [/^\s*PRINTFORML 没有\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1864',
        any: [/^\s*INPUTS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1867',
        any: [
          /^\s*PRINTFORMW 在%TATOO_NAME:TATOO_SELECT%雕刻『%RESULTS%』刺青吗？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1869',
        any: [/^\s*PRINTFORMW 消去%TATOO_NAME:TATOO_SELECT%的刺青吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1877-1878',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1881',
        any: [
          /^\s*PRINTFORMW 《%TATOO_NAME:TATOO_SELECT%上雕刻了『%RESULTS%』的刺青》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1883',
        any: [/^\s*PRINTFORMW 《%TATOO_NAME:TATOO_SELECT%的刺青消去了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1885-1886',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1889',
        any: [/^\s*CSTR:TATOO_TARGET:TATOO_SELECT = %RESULTS%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1889-1894',
        any: [/^\s*CSTR:TATOO_TARGET:TATOO_SELECT = %RESULTS%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1892-1893',
        any: [/^\s*MONEY -= COST\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1899-1977',
        any: [/^\s*@MODIFY_HAIR_COLOR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1906-1909',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1914',
        any: [/^\s*PRINTL 想给谁改变头发颜色？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1943',
        any: [/^\s*T = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1945-1959',
        any: [/^\s*DO\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1946',
        any: [
          /^\s*PRINTFORML 变成什么颜色？（現在：%GET_LOOK_INFO\(T, "头发颜色"\)%）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1947-1953',
        any: [/^\s*PRINTL \[0\] 金色\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1954',
        any: [/^\s*PRINTL \[999\] - 算了，居然没有光头……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1955',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1956-1957',
        any: [/^\s*SIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1958',
        any: [/^\s*LOOP !INRANGE\(RESULT, 0, 6\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1959',
        any: [/^\s*COL = RESULT \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1961-1970',
        any: [/^\s*DO\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1962',
        any: [/^\s*SWAP TALENT:T:头发颜色, COL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1963',
        any: [
          /^\s*PRINTFORML 要将%SAVESTR:T%的头发变成%GET_LOOK_INFO\(T, "头发颜色"\)%吗？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1966',
        any: [/^\s*SWAP TALENT:T:头发颜色, COL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1968-1969',
        any: [/^\s*SIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1970',
        any: [/^\s*LOOP RESULT != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1972',
        any: [/^\s*TALENT:T:头发颜色 = COL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1972-1977',
        any: [/^\s*TALENT:T:头发颜色 = COL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1973',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的发色变成【%GET_LOOK_INFO\(T, "头发颜色"\)%】了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1975-1976',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1982-2075',
        any: [/^\s*@MODIFY_SKIN_COLOR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1990-1993',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '1997',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2027',
        any: [/^\s*T = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2029-2037',
        any: [/^\s*IF TALENT:T:白皙\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2039-2041',
        any: [/^\s*LOCALS:0 = 普通肌肤\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2043',
        any: [/^\s*PRINTFORML 想要变成什么肤色？（現在：%CURRENT%）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2044-2046',
        any: [/^\s*REPEAT 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2047',
        any: [/^\s*PRINTL \[999\] - 取消\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2048',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2049-2050',
        any: [/^\s*SIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2051',
        any: [/^\s*LOOP !INRANGE\(RESULT, 0, 2\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2052',
        any: [/^\s*COL = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2054',
        any: [/^\s*PRINTFORML 将%SAVESTR:T%变为%LOCALS:COL%吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2058-2059',
        any: [/^\s*SIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2060',
        any: [/^\s*LOOP RESULT != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2062-2068',
        any: [/^\s*TALENT:T:白皙 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2062-2069',
        any: [/^\s*TALENT:T:白皙 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2062',
        any: [/^\s*TALENT:T:白皙 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2063',
        any: [/^\s*TALENT:T:褐色肌肤 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2064',
        any: [/^\s*TALENT:T:恶魔肌肤 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2066',
        any: [/^\s*TALENT:T:白皙 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2068',
        any: [/^\s*TALENT:T:褐色肌肤 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2071',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的%CURRENT%变成%LOCALS:COL%了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2071-2075',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的%CURRENT%变成%LOCALS:COL%了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2073-2074',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2081-2221',
        any: [/^\s*@BLOCK_FEELING\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2090-2093',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2098',
        any: [
          /^\s*PRINTFORML 感觉封锁，被封锁的部位，感觉被锁定。其它性感带的感觉提升。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2099',
        any: [/^\s*PRINTFORML 封锁谁的感觉？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2129',
        any: [/^\s*CID = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2131-2220',
        any: [/^\s*\$PART_TOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2133',
        any: [/^\s*PRINTFORML 封锁%SAVESTR:CID%哪个部位？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2134',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2136-2163',
        any: [/^\s*FLAG_B = TALENT:CID:101 & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2136',
        any: [/^\s*FLAG_B = TALENT:CID:101 & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2139-2143',
        any: [/^\s*IF TALENT:CID:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2139-2163',
        any: [/^\s*IF TALENT:CID:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2140',
        any: [
          /^\s*PRINTFORML 　\[\\@ FLAG_B \? - # 0 \\@\] 阴茎感觉　\\@ FLAG_B \? 已经封锁 #  \\@\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2140-2163',
        any: [
          /^\s*PRINTFORML 　\[\\@ FLAG_B \? - # 0 \\@\] 阴茎感觉　\\@ FLAG_B \? 已经封锁 #  \\@\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2146',
        any: [/^\s*FLAG_B = TALENT:CID:103 & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2147',
        any: [/^\s*SIF FLAG_B\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2149-2150',
        any: [/^\s*SIF !TALENT:CID:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2153',
        any: [/^\s*FLAG_B = TALENT:CID:105 & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2159',
        any: [/^\s*FLAG_B = TALENT:CID:107 & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2161-2167',
        any: [/^\s*SETCOLOR 128, 128, 128\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2165',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2166',
        any: [/^\s*PRINTL 　\[9\] 选择角色\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2168',
        any: [/^\s*PRINTL  \[999\] - 取消\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2172',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2176-2179',
        any: [/^\s*SIF PID >= 1 && PID < 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2183',
        any: [/^\s*PRINTL 已经超过LV1以上的部位无法封锁\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2184',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2185',
        any: [/^\s*GOTO PART_TOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2187',
        any: [/^\s*IF TALENT:CID:\(PID \* 2 \+ 101\) & 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2188',
        any: [/^\s*PRINTL 已经封锁过了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2189',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2190',
        any: [/^\s*GOTO PART_TOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2192',
        any: [
          /^\s*PRINTL 　　此项改造属于小白鼠专用，魔王表示一但实行就无法逆转\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2193',
        any: [/^\s*PRINTL 　　确定要执行？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2194',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2195',
        any: [/^\s*PRINTL 　　　\[0\] - 走你！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2196',
        any: [/^\s*PRINTL 　　　\[1\] - 容我三思……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2198',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2201',
        any: [/^\s*TALENT:CID:\(PID \* 2 \+101\) \|= 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2202-2203',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2205',
        any: [
          /^\s*PRINTFORML 　　《%SAVESTR:CID%的\\@ PID == 0 \? 阴莖 #\\@\\@ PID == 1 \? 私处 #\\@\\@ PID == 2 \? 肛门 #\\@\\@ PID == 3 \? 乳房 #\\@被封锁了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2207',
        any: [
          /^\s*PRINTFORML 　　《%SAVESTR:CID%的\\@ PID == 0 \? 阴核 #\\@\\@ PID == 1 \? 私处 #\\@\\@ PID == 2 \? 肛门 #\\@\\@ PID == 3 \? 乳房 #\\@被封锁了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2209',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2210',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2213-2220',
        any: [/^\s*SIF MONEY >= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2213-2214',
        any: [/^\s*SIF MONEY >= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2215-2216',
        any: [/^\s*ELSEIF RESULT == 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2217-2218',
        any: [/^\s*ELSEIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2227-2317',
        any: [/^\s*@TRANS_SEX\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2228-2234',
        any: [/^\s*#DIM NO_PAGE = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2231',
        any: [/^\s*C = 200000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2239',
        any: [/^\s*PRINTFORML 更改对象的性别。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2240',
        any: [
          /^\s*PRINTFORML 一但换了，就不能再换回原来的了。除非是魔王。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2241',
        any: [/^\s*PRINTFORML 要更换谁的性别？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2272-2274',
        any: [/^\s*ELSEIF CFLAG:RESULT:70 && RESULT != MASTER\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2279',
        any: [/^\s*PRINTFORML 更改%SAVESTR:RESULT%的性别吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2290-2294',
        any: [/^\s*IF TALENT:T:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2292-2305',
        any: [/^\s*TALENT:T:122 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2292',
        any: [/^\s*TALENT:T:122 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2293',
        any: [/^\s*TALENT:T:0 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2294',
        any: [/^\s*TALENT:T:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2296-2305',
        any: [/^\s*;扶她ならそれを外す\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2300',
        any: [/^\s*TALENT:T:121 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2303',
        any: [/^\s*TALENT:T:122 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2304',
        any: [/^\s*TALENT:T:0 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2305',
        any: [/^\s*TALENT:T:1 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2308',
        any: [/^\s*PRINTFORMW %EXPNAME:50%＋\{Z\}\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2309',
        any: [/^\s*EXP:T:50 \+= Z\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2310',
        any: [/^\s*CFLAG:T:70 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2325-2404',
        any: [/^\s*@BRAIN_WASHING\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2329-2332',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2336',
        any: [/^\s*PRINTFORML 外部改写洗脑对象的深层心理。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2337',
        any: [/^\s*PRINTFORML 给谁附加【%TALENTNAME:B%】？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2339',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2367-2369',
        any: [/^\s*ELSEIF TALENT:RESULT:B\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2370-2372',
        any: [/^\s*ELSEIF RESULT != 0 && CFLAG:RESULT:0 < 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2373-2375',
        any: [
          /^\s*ELSEIF TALENT:RESULT:121 == 0 && TALENT:RESULT:122 == 0 && B == 133\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2376-2378',
        any: [/^\s*ELSEIF TALENT:RESULT:152\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2379-2380',
        any: [/^\s*ELSEIF RESULT == MASTER\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2385',
        any: [
          /^\s*PRINTFORML 为%SAVESTR:RESULT%附加【%TALENTNAME:B%】吗？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2392-2393',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2395',
        any: [/^\s*PRINTFORML %SAVESTR:T%获得【%TALENTNAME:B%】了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2396',
        any: [/^\s*TALENT:T:B = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2397',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2398-2399',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2399-2404',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2402-2403',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2409-2441',
        any: [/^\s*@BOUGT_TENTACLES\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2415-2418',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2420-2424',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2421',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2422',
        any: [
          /^\s*PRINTFORML %ITEMNAME:90%是身体改造失败的性奴隶的悲催下场……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2423',
        any: [/^\s*PRINTFORML 　购买%ITEMNAME:90%吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2430-2436',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2431',
        any: [/^\s*PRINTFORML 《%ITEMNAME:90%入手了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2432',
        any: [/^\s*ITEM:90 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2433-2434',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2435',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2437-2438',
        any: [/^\s*ELSEIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2441',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2446-2534',
        any: [/^\s*@GIVEN_HUMAN_LIFE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2446-2452',
        any: [/^\s*@GIVEN_HUMAN_LIFE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2451',
        any: [/^\s*PRINTW 人的生命是金钱无法购买的……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2457',
        any: [/^\s*PRINTL 人的生命是无法直接触摸的\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2458',
        any: [/^\s*PRINTL 然而某些特殊之人\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2459',
        any: [/^\s*PRINTL 可以通过转换他人生命的方式为其延长寿命\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2460',
        any: [/^\s*PRINTL 为谁续命？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2463',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2465',
        any: [/^\s*PRINTLC \[999\] - 取  消\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2484',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2490-2492',
        any: [/^\s*ELSEIF TALENT:RESULT:85 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2493-2495',
        any: [/^\s*ELSEIF BASE:RESULT:10 == 0 && TALENT:RESULT:124 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2496-2500',
        any: [/^\s*ELSEIF BASE:RESULT:10 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2497',
        any: [/^\s*PRINTFORML %SAVESTR:RESULT%并非人类、\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2498',
        any: [/^\s*PRINTL 作为那个种族的特性，原本已经远超人类的寿命\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2499',
        any: [/^\s*PRINT 已经无法再延长了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2504',
        any: [/^\s*PRINTFORML 为%SAVESTR:RESULT%延长寿命？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2506-2507',
        any: [/^\s*PRINTL  \[0\] - 你一秒，我一秒，蛤蛤蛤蛤…………\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2511-2512',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2515',
        any: [/^\s*PRINTFORML %SAVESTR:T%的寿命被延长了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2516',
        any: [/^\s*TALENT:T:124 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2519',
        any: [/^\s*PRINTFORML %SAVESTR:T%的寿命还有很久，无需延长。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2520',
        any: [/^\s*BASE:T:10 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2522',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2523-2525',
        any: [/^\s*;口上\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2524',
        any: [/^\s*TFLAG:13 = 15\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2526-2527',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2530',
        any: [/^\s*PRINTFORML 《失去了【%TALENTNAME:398%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2530-2534',
        any: [/^\s*PRINTFORML 《失去了【%TALENTNAME:398%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2531',
        any: [/^\s*EXP:MASTER:81 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2532',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2539-2629',
        any: [/^\s*@RESULECTION\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2539-2545',
        any: [/^\s*@RESULECTION\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2544',
        any: [/^\s*PRINTW 人的生命可是无法购买的……\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2548-2555',
        any: [/^\s*;一度に所有できる奴隷はEXTRA30人、それ以外は10人まで\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2549-2551',
        any: [/^\s*IF CHARANUM > 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2552',
        any: [/^\s*ELSEIF FLAG:5 != 9 && CHARANUM > 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2552-2554',
        any: [/^\s*ELSEIF FLAG:5 != 9 && CHARANUM > 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2557-2566',
        any: [/^\s*D = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2559-2565',
        any: [/^\s*C = COUNT \+ 1000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2564',
        any: [/^\s*PRINTW 找不到想要唤醒的人\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2568-2584',
        any: [/^\s*\$INPUT_LOOP_00\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2568-2574',
        any: [/^\s*\$INPUT_LOOP_00\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2569',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2570',
        any: [/^\s*PRINTL 过去从这个世界上消失和逝去的人，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2571',
        any: [/^\s*PRINTL 所有的记忆都将被忘记，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2572',
        any: [/^\s*PRINTL 好似重获新生一般出现在你面前。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2573',
        any: [/^\s*PRINTL ……这样的结果，是你想要的吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2575-2576',
        any: [/^\s*PRINTL  \[0\] - 确定\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2580-2581',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2582-2583',
        any: [/^\s*ELSEIF RESULT != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2582-2587',
        any: [/^\s*ELSEIF RESULT != 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2583-2589',
        any: [/^\s*GOTO INPUT_LOOP_00\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2586-2623',
        any: [/^\s*\$INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2588',
        any: [/^\s*PRINTL 想要苏醒谁？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2593-2594',
        any: [/^\s*SIF FLAG:C <= -2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2597',
        any: [/^\s*PRINTL  \[999\] - 取消\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2599',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2601',
        any: [/^\s*D = RESULT - 99\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2602',
        any: [/^\s*C = RESULT \+ 900\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2604-2605',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2606-2607',
        any: [/^\s*ELSEIF RESULT < 100 \|\| RESULT > 100 \+ 99\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2608-2622',
        any: [/^\s*ELSEIF FLAG:C < 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2609-2613',
        any: [/^\s*ADDCHARA D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2609',
        any: [/^\s*ADDCHARA D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2610',
        any: [/^\s*CALL ADDCHARA_EX, CHARANUM-1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2612',
        any: [/^\s*FLAG:C = -1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2613',
        any: [/^\s*C = CHARANUM - 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2614',
        any: [/^\s*PRINTFORML 《%SAVESTR:C%被从彼岸召唤回来了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2617',
        any: [/^\s*TARGET = C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2620',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2625',
        any: [/^\s*PRINTFORML 《获得了【%TALENTNAME:398%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2625-2629',
        any: [/^\s*PRINTFORML 《获得了【%TALENTNAME:398%】》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2626',
        any: [/^\s*EXP:MASTER:81 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2627',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2634-2709',
        any: [/^\s*@CURE_INSANE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2634-2640',
        any: [/^\s*@CURE_INSANE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2639',
        any: [/^\s*PRINTW 勋章，是最好的药啊魔王大人！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2645',
        any: [
          /^\s*PRINTL 也许对这些动不动就坏掉的脆弱奴隸来说，坏掉反而更幸福吧！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2646',
        any: [
          /^\s*PRINTL 面对这等弱者，没必要浪费时间慢慢哄！食脑魔，给我上！！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2647',
        any: [/^\s*PRINTL 消耗三十个勋章，恢复谁的理智？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2649',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2671',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2676-2678',
        any: [/^\s*ELSEIF TALENT:RESULT:9 == 0 && TALENT:RESULT:123 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2683',
        any: [/^\s*PRINTFORML 恢复%SAVESTR:RESULT%的理智么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2694',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的瞳孔，再度射出理性的光辉了。》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2695',
        any: [/^\s*TALENT:T:9 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2698',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%从无尽的噩梦中苏醒了。》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2699',
        any: [/^\s*TALENT:T:123 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2705',
        any: [/^\s*PRINTFORML 《【%TALENTNAME:398%】不见了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2706',
        any: [/^\s*EXP:MASTER:81 -= 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2707',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2716-2784',
        any: [/^\s*@REGET_CHASTITY_KEY\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2716-2722',
        any: [/^\s*@REGET_CHASTITY_KEY\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2721',
        any: [/^\s*PRINTW 穷……是世上最无可奈何的事…………\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2727',
        any: [/^\s*PRINTL 把那该死的贞操带钥匙找回来！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2728',
        any: [/^\s*PRINTL 要寻找谁的贞操带钥匙呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2730',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2752',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2757-2759',
        any: [/^\s*ELSEIF CFLAG:RESULT:49 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2764',
        any: [/^\s*PRINTFORML 确认寻找%SAVESTR:RESULT%的贞操带钥匙吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2771-2772',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2774',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的贞操带钥匙找到了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2775',
        any: [/^\s*CFLAG:T:49 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2776-2777',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2780',
        any: [/^\s*PRINTFORML 《【%TALENTNAME:398%】不见了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2780-2784',
        any: [/^\s*PRINTFORML 《【%TALENTNAME:398%】不见了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2781',
        any: [/^\s*EXP:MASTER:81 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2782',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2787-2859',
        any: [/^\s*@HORN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2792',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2795',
        any: [/^\s*PRINTW 角可是很贵的\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2801',
        any: [/^\s*PRINTL 让奴隶的头上长出犄角\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2802',
        any: [/^\s*PRINTL 要让谁长出犄角呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2832-2834',
        any: [/^\s*ELSEIF TALENT:RESULT:264 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2835-2837',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2842',
        any: [/^\s*PRINTFORML 让%SAVESTR:RESULT%长出犄角吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2852',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%长出了犄角》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2853',
        any: [/^\s*TALENT:T:264 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2861-2866',
        any: [/^\s*;----------------------------\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2862-3195',
        any: [/^\s*@EVILAPP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2862-2886',
        any: [/^\s*@EVILAPP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2864',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2865',
        any: [/^\s*PRINTFORML 要进行什么样的恶魔改造呢？？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2867',
        any: [/^\s*PRINTL  \[1\] - 恶魔的蓝色肌肤\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2868',
        any: [/^\s*PRINTL  \[2\] - 恶魔的翅膀\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2869',
        any: [/^\s*PRINTL  \[3\] - 恶魔的尾巴\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2870',
        any: [/^\s*PRINTL  \[4\] - 恶魔的眼睛\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2871',
        any: [/^\s*PRINTLC \[999\] - 返  回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2872',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2874',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2876-2877',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2880-2886',
        any: [/^\s*ELSEIF RESULT == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2889-2968',
        any: [/^\s*@BLUESKIN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2894',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2897',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2904',
        any: [/^\s*PRINTL 改造成为恶魔的蓝色肌肤\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2905',
        any: [/^\s*PRINTL 赋予谁蓝色肌肤？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2935-2941',
        any: [/^\s*ELSEIF TALENT:RESULT:244 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2936',
        any: [/^\s*PRINTFORMW %SAVESTR:RESULT%的肌肤已经是蓝色的了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2945',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%恶魔肌肤吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2956',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的\\@\(TALENT:T:253 == 1\) \? 褐色肌肤 # 白皙\\@变成恶魔肌肤了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2958',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得恶魔般的肌肤了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2960-2962',
        any: [/^\s*TALENT:T:244 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2960',
        any: [/^\s*TALENT:T:244 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2961',
        any: [/^\s*TALENT:T:253 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2962',
        any: [/^\s*TALENT:T:255 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2971-3043',
        any: [/^\s*@EVILWING\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2976',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2979',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2985',
        any: [/^\s*PRINTL 给对象赋予恶魔的翅膀。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '2986',
        any: [/^\s*PRINTL 给谁赋予恶魔的翅膀呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3016-3022',
        any: [/^\s*ELSEIF TALENT:RESULT:245 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3017',
        any: [/^\s*PRINTFORMW %SAVESTR:RESULT%已经长着恶魔的翅膀了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3026',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%恶魔的翅膀吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3036',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%长出了恶魔的翅膀》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3037',
        any: [/^\s*TALENT:T:245 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3047-3119',
        any: [/^\s*@EVILTAIL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3052',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3055',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3061',
        any: [/^\s*PRINTL 赋予对象恶魔的尾巴。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3062',
        any: [/^\s*PRINTL 要赋予谁恶魔的尾巴呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3092-3098',
        any: [/^\s*ELSEIF TALENT:RESULT:246 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3093',
        any: [/^\s*PRINTFORMW %SAVESTR:RESULT%已经长着恶魔的尾巴了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3102',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%恶魔的尾巴？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3112',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%长出恶魔的尾巴了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3113',
        any: [/^\s*TALENT:T:246 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3122-3195',
        any: [/^\s*@EVILSIGHT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3127',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3130',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3136',
        any: [/^\s*PRINTL 赋予对象恶魔的眼睛。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3137',
        any: [/^\s*PRINTL 要赋予谁恶魔的眼睛呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3167-3173',
        any: [/^\s*ELSEIF TALENT:RESULT:247 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3168',
        any: [/^\s*PRINTFORMW %SAVESTR:RESULT%已经有恶魔的眼睛了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3177',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%恶魔的眼睛？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3188',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了恶魔的眼睛》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3189',
        any: [/^\s*TALENT:T:247 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3198-3446',
        any: [/^\s*@DEMON_REBIRTH\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3215-3218',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3224',
        any: [
          /^\s*PRINTL 转生的秘法将会抽取对象的灵魂，将其投入魔族的身体\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3225',
        any: [/^\s*PRINTL 抽取谁的灵魂？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3235-3236',
        any: [/^\s*SIF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3259-3261',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3264',
        any: [/^\s*T = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3268-3288',
        any: [/^\s*TYPEDATA:0:0 = 133,143,153,163,160,170\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3268',
        any: [/^\s*TYPEDATA:0:0 = 133,143,153,163,160,170\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3270',
        any: [/^\s*TYPEDATA:1:0 = 104,113,114,172,181\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3272',
        any: [/^\s*TYPEDATA:2:0 = 110,130,121,150\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3274',
        any: [/^\s*TYPEDATA:3:0 = 101,111,123,134,164,171\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3276',
        any: [/^\s*TYPEDATA:4:0 = 100,120\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3278',
        any: [/^\s*TYPEDATA:5:0 = 102,131,142,173,184\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3280',
        any: [/^\s*TYPEDATA:6:0 = 122,141,151,162,183\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3282',
        any: [/^\s*TYPEDATA:7:0 = 103,124,174\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3284',
        any: [/^\s*TYPEDATA:8:0 = 112,144\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3286',
        any: [/^\s*TYPEDATA:9:0 = 132,140,180\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3288',
        any: [/^\s*TYPEDATA:10:0 = 154,152,182\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3290-3313',
        any: [/^\s*VARSET COND, 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3290',
        any: [/^\s*VARSET COND, 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3291-3292',
        any: [/^\s*SIF !TALENT:T:恶魔肌肤\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3293-3294',
        any: [/^\s*SIF !TALENT:T:魁梧\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3295-3296',
        any: [
          /^\s*SIF \(TALENT:T:恶魔肌肤 && TALENT:T:恶魔眼睛 && TALENT:T:恶魔翅膀 && TALENT:T:恶魔尾巴\) == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3297-3298',
        any: [
          /^\s*SIF \(TALENT:T:恶魔肌肤 && TALENT:T:恶魔眼睛 && TALENT:T:恶魔翅膀 && TALENT:T:恶魔尾巴 && TALENT:T:淫乱\) == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3309-3315',
        any: [/^\s*CONDDESCS:10:3 = %CONDDESCS:9:3%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3316-3321',
        any: [/^\s*IF TALENT:T:种族 != 9 && TALENT:T:现种族 > 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3317',
        any: [
          /^\s*PRINTFORML 要让%SAVESTR:T%（%ITEMNAME:\(TALENT:T:现种族\)%）转生为何种魔族？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3319',
        any: [/^\s*PRINTFORML 要让%SAVESTR:T%转生为何种魔族？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3322-3344',
        any: [/^\s*LOCAL = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3328-3329',
        any: [/^\s*SIF TALENT:T:现种族 == L_ID\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3335',
        any: [/^\s*PRINTFORMLC \[\{L_T\*10 \+ L_I,3\}\] %ITEMNAME:L_ID%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3339-3345',
        any: [/^\s*SIF LOCAL % PRINTCPERLINE\(\) == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3346',
        any: [/^\s*PRINTL \[999\] 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3349-3386',
        any: [/^\s*\$INPUT_LOOP_1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3350',
        any: [/^\s*INPUT 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3352-3353',
        any: [/^\s*SIF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3355',
        any: [/^\s*L_T = RESULT \/ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3356',
        any: [/^\s*L_I = RESULT % 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3357',
        any: [/^\s*L_ID = TYPEDATA:L_T:L_I\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3359-3361',
        any: [/^\s*IF L_ID <= 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3362-3382',
        any: [
          /^\s*ELSEIF !COND:L_T \|\| CFLAG:T:9 < ITEMPRICE:L_ID \/ 20\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3363',
        any: [
          /^\s*PRINTFORM %SAVESTR:T%必须达到Lv\{ITEMPRICE:L_ID \/ 20\}（当前Lv\{CFLAG:T:9\}）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3365',
        any: [/^\s*PRINTFORM 且具备\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3366-3372',
        any: [/^\s*FOR COUNT, 1, 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3373-3378',
        any: [/^\s*IF L_T == 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3380',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3380-3385',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3382',
        any: [/^\s*GOTO INPUT_LOOP_1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3384',
        any: [/^\s*PRINTFORMW %SAVESTR:T%已经是%ITEMNAME:L_ID%了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3388',
        any: [/^\s*TYPEN = L_ID\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3392-3443',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3394',
        any: [/^\s*PRINTFORML 确定要将%SAVESTR:T%转生为%TYPENAME%吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3395-3396',
        any: [/^\s*PRINTL  \[0\] - 确定\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3400-3401',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3403-3406',
        any: [/^\s*SIF TALENT:T:种族 != 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3404-3406',
        any: [/^\s*TALENT:T:原种族 = TALENT:T:种族\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3404',
        any: [/^\s*TALENT:T:原种族 = TALENT:T:种族\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3405',
        any: [/^\s*TALENT:T:种族 = 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3406',
        any: [/^\s*TALENT:T:现种族 = TYPEN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3407',
        any: [/^\s*PRINTFORMW 浓郁的魔力充斥四周………\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3408',
        any: [/^\s*PRINTFORMW %SAVESTR:T%的转生仪式成功了，已经转生为\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3409',
        any: [
          /^\s*PRINTFORMW 《【魔族中的%ITEMNAME:\(TALENT:T:现种族\)%】了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3411-3435',
        any: [/^\s*;付加素質\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3414-3417',
        any: [
          /^\s*CASE "狗头人", "丧尸猎犬", "地狱猎犬", "奇美拉", "梦魇"\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3415',
        any: [
          /^\s*CALL LABO_DR_GET_TALENT, T, 124, "头上长出【動物耳】了！"\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3417',
        any: [
          /^\s*CALL LABO_DR_GET_TALENT, T, 91, "的肉体上散发出致命的诱惑，获得了【魅惑】……"\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3419-3434',
        any: [/^\s*\[SKIPSTART\]\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3437-3439',
        any: [/^\s*;头发颜色\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3441-3442',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3442-3446',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3444-3445',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3448-3460',
        any: [/^\s*@LABO_DR_GET_TALENT, ARG, ARG:1, ARGS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3448-3453',
        any: [/^\s*@LABO_DR_GET_TALENT, ARG, ARG:1, ARGS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3450',
        any: [/^\s*TALENT:ARG:\(ARG:1\) = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3451',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3452',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%%ARGS%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3455-3460',
        any: [/^\s*@LABO_DR_CHANGE_HAIR_COLOR, ARG, ARG:1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3457',
        any: [
          /^\s*PRINTFORM %SAVESTR:ARG%的头发颜色从%GET_LOOK_INFO\(ARG, "头发颜色"\)%\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3458',
        any: [/^\s*TALENT:ARG:头发颜色 = ARG:1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3459',
        any: [/^\s*PRINTFORMW 变成%GET_LOOK_INFO\(ARG, "头发颜色"\)%了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3464-3685',
        any: [/^\s*@SOULBOUND\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3464-3536',
        any: [/^\s*@SOULBOUND\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3469',
        any: [/^\s*C = 10000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3472',
        any: [/^\s*PRINTW 金钱不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3478',
        any: [/^\s*PRINTL 魂缚实施之后，目标在心智上将不会再有半点动摇，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3479',
        any: [/^\s*PRINTL 各种刻印和好感度的增减都会被锁定，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3480',
        any: [/^\s*PRINTL 要对谁施展？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3482',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3504',
        any: [/^\s*ELSEIF RESULT < 1 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3509-3511',
        any: [/^\s*ELSEIF TALENT:RESULT:魂缚\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3512-3514',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3519',
        any: [/^\s*PRINTFORML %SAVESTR:RESULT%施展魂缚吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3529',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的灵魂》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3530',
        any: [/^\s*TALENT:T:魂缚 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3539-3610',
        any: [/^\s*@SOULBOUND_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3544',
        any: [/^\s*C = 50000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3547',
        any: [/^\s*PRINTW 金钱不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3553',
        any: [/^\s*PRINTL 将目标从魂缚的状态解除\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3554',
        any: [/^\s*PRINTL 要选谁做为目标呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3556',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3578',
        any: [/^\s*ELSEIF RESULT < 1 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3583-3585',
        any: [/^\s*ELSEIF !TALENT:RESULT:魂缚\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3586-3588',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3593',
        any: [/^\s*PRINTFORML %SAVESTR:RESULT%的魂缚状态解除吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3603',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的魂缚状态解除了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3604',
        any: [/^\s*TALENT:T:魂缚 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3613-3685',
        any: [/^\s*@ENCHARMED_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3618',
        any: [/^\s*C = 50000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3621',
        any: [/^\s*PRINTW 金钱不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3627',
        any: [/^\s*PRINTL 把目标曾被狂王俘虏的印记消去\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3628',
        any: [/^\s*PRINTL 要消去谁的？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3637-3638',
        any: [/^\s*SIF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3658-3660',
        any: [/^\s*ELSEIF !TALENT:RESULT:狂王俘虏\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3661-3663',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3668',
        any: [/^\s*PRINTFORML 将%SAVESTR:RESULT%被狂王俘虏的印记消去？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3678',
        any: [
          /^\s*PRINTFORMW 《%SAVESTR:T%的【%TALENTNAME:280%】被消去了》\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3679',
        any: [/^\s*TALENT:T:狂王俘虏 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3688-3830',
        any: [/^\s*@ST_UP_LABO\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3694-3697',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3701-3710',
        any: [/^\s*PRINT 强化奴隶的\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3703-3709',
        any: [/^\s*PRINT HP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3712',
        any: [/^\s*PRINTL 要强化谁呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3742-3744',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3749-3774',
        any: [/^\s*;リミットに届いているか\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3749-3754',
        any: [/^\s*;リミットに届いているか\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3750-3755',
        any: [/^\s*IF B == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3752',
        any: [/^\s*PRINTL \*HP的成长到极限了\*\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3753',
        any: [/^\s*PRINTW \*请提高等级\*\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3756-3761',
        any: [/^\s*ELSEIF B == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3762-3767',
        any: [/^\s*ELSEIF B == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3768-3773',
        any: [/^\s*IF CFLAG:T:14 >= CFLAG:T:9 \* 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3777-3796',
        any: [/^\s*D = MONEY\/C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3777',
        any: [/^\s*D = MONEY\/C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3781',
        any: [
          /^\s*LOCAL = \(2000 \+ CFLAG:T:9 \* 50 - MAXBASE:T:0 \) \/ 10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3782',
        any: [/^\s*SIF LOCAL < D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3785',
        any: [
          /^\s*LOCAL = \(2000 \+ CFLAG:T:9 \* 50 - MAXBASE:T:1 \) \/ 10\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3786',
        any: [/^\s*SIF LOCAL < D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3789',
        any: [/^\s*LOCAL = \(CFLAG:T:9 \* 5 - CFLAG:T:13 \)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3790',
        any: [/^\s*SIF LOCAL < D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3793',
        any: [/^\s*LOCAL = \(CFLAG:T:9 \* 5 - CFLAG:T:14 \)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3794',
        any: [/^\s*SIF LOCAL < D\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3798',
        any: [/^\s*PRINTFORML 强化%SAVESTR:RESULT%多少次呢？\(1-\{D\}\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3803',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3805-3806',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3808-3820',
        any: [/^\s*IF B == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3809',
        any: [/^\s*PRINTW HP强化了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3810',
        any: [/^\s*MAXBASE:T:0 \+= 10\*RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3812',
        any: [/^\s*PRINTW 气力强化了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3813',
        any: [/^\s*MAXBASE:T:1 \+= 10\*RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3815',
        any: [/^\s*PRINTW 攻击强化了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3816',
        any: [/^\s*CFLAG:T:13 \+= RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3818',
        any: [/^\s*PRINTW 防御强化了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3819',
        any: [/^\s*CFLAG:T:14 \+= RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3822',
        any: [/^\s*PRINTL 数值太大了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3823',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3825-3826',
        any: [/^\s*MONEY -= C\*RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3825-3830',
        any: [/^\s*MONEY -= C\*RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3827-3829',
        any: [/^\s*;\(stick增加，修正实际攻防\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3833-3905',
        any: [/^\s*@MAGICRESIST\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3838',
        any: [/^\s*C = 50000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3841',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3847',
        any: [/^\s*PRINTL 魔法耐性可以抵挡敌方的魔法攻击。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3848',
        any: [/^\s*PRINTL 赋予谁魔法耐性呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3878-3880',
        any: [/^\s*ELSEIF TALENT:RESULT:257 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3881-3883',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3888',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%魔法耐性吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3898',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了魔法耐性》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3899',
        any: [/^\s*TALENT:T:257 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3908-4055',
        any: [/^\s*@EXTRA_PREG_MARK\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3908-3980',
        any: [/^\s*@EXTRA_PREG_MARK\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3913',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3916',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3922',
        any: [/^\s*PRINTL 赋予异常妊娠体质\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3923',
        any: [/^\s*PRINTL 要赋予给谁？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3953-3955',
        any: [/^\s*ELSEIF TALENT:RESULT:340 == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3956-3958',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3963',
        any: [/^\s*PRINTFORML 赋予%SAVESTR:RESULT%异常妊娠体质吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3973',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得了异常妊娠体质》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3974',
        any: [/^\s*TALENT:T:340 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3983-4055',
        any: [/^\s*@EXTRA_PREG_ERASE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3988',
        any: [/^\s*C = 35000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3991',
        any: [/^\s*PRINTW 钱不够\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3997',
        any: [/^\s*PRINTL 消除异常妊娠体质\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '3998',
        any: [/^\s*PRINTL 要给谁消除？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4028-4030',
        any: [/^\s*ELSEIF TALENT:RESULT:340 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4031-4033',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4038',
        any: [/^\s*PRINTFORML 要消除%SAVESTR:RESULT%异常妊娠体质吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4048',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的异常妊娠体质消除了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4049',
        any: [/^\s*TALENT:T:340 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4058-4145',
        any: [/^\s*@SET_FREE_TRAIN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4065-4068',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4072',
        any: [/^\s*PRINTL 设定自由局部调教内容\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4073',
        any: [/^\s*PRINTL 要对谁设定呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4103-4105',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4108',
        any: [/^\s*LOCAL = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4110-4111',
        any: [/^\s*SIF CSTR:RESULT:7 != ""\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4113',
        any: [
          /^\s*PRINTFORML 要对%SAVESTR:RESULT%进行自由局部调教设定吗？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4115-4116',
        any: [/^\s*PRINTL  \[0\] - 是\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4120-4121',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4124-4125',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4128',
        any: [/^\s*PRINTFORML 请输入新的自由局部调教项目。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4129',
        any: [/^\s*PRINTFORML 发送空白将会重置。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4131',
        any: [/^\s*INPUTS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4132',
        any: [/^\s*CSTR:LOCAL:7 = %RESULTS%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4133-4134',
        any: [/^\s*ABL:LOCAL:4 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4133',
        any: [/^\s*ABL:LOCAL:4 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4134',
        any: [/^\s*ABL:LOCAL:40 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4135',
        any: [/^\s*JUEL:LOCAL:15 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4138',
        any: [/^\s*PRINTFORMW 自由局部调教重置完毕。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4140',
        any: [/^\s*PRINTFORMW %CSTR:LOCAL:7%调教设定完毕。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4140-4145',
        any: [/^\s*PRINTFORMW %CSTR:LOCAL:7%调教设定完毕。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4143-4144',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4150-4227',
        any: [/^\s*@TRANS_SPECIALTALENT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4156-4159',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4163',
        any: [/^\s*PRINTFORML 把对象从淫乱改为爱慕\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4164',
        any: [/^\s*PRINTFORML 或者爱慕改为淫乱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4165',
        any: [/^\s*PRINTFORML 不过必须要满足 爱慕淫乱的条件哦\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4167',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2,NUM_PAGE\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4189',
        any: [/^\s*ELSEIF RESULT < 1 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4196',
        any: [/^\s*T = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4198',
        any: [/^\s*PRINTFORML 要改变%SAVESTR:RESULT%吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4200-4221',
        any: [/^\s*;爱慕变淫乱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4201-4208',
        any: [
          /^\s*IF TALENT:T:85 && ABL:T:11 >= 3 && ABL:T:0\+ABL:T:1\+ABL:T:2\+ABL:T:3 >= 10 && EXP:T:50 >= 3 && MARK:T:1 == 3 && MARK:T:2 == 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4203',
        any: [/^\s*TALENT:T:85 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4204',
        any: [/^\s*TALENT:T:76 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4205',
        any: [
          /^\s*PRINTFORML %SAVESTR:T%看你的眼神，好像忘记了你还有上半身…\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4206',
        any: [
          /^\s*PRINTFORML %SAVESTR:T%沉迷于%CALLNAME:MASTER%给予的快感之中了……\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4207',
        any: [/^\s*PRINTFORMW %SAVESTR:T%获得了【%TALENTNAME:76%】。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4210-4217',
        any: [
          /^\s*ELSEIF TALENT:T:76 && ABL:T:10 >= 3 && EXP:T:21 >= 200  && TALENT:T:85 == 0 && MARK:T:2 == 3 && ABL:T:16 >= 3\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4212',
        any: [/^\s*TALENT:T:76 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4213',
        any: [/^\s*TALENT:T:85 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4214',
        any: [/^\s*PRINTFORMW %SAVESTR:T%柔情似水地看着你…\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4215',
        any: [
          /^\s*PRINTFORML %SAVESTR:T%因%CALLNAME:MASTER%的行为而感到喜悦。想粘着你，想为你分忧，为你做些什么…渴望着你的宠爱。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4216',
        any: [/^\s*PRINTFORMW %SAVESTR:T%获得了【%TALENTNAME:85%】。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4219',
        any: [/^\s*PRINTFORMW %SAVESTR:T%改变失败了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4220',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4226-4227',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4230-4314',
        any: [/^\s*@SUMMON_SLAVE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4235-4238',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4240-4244',
        any: [/^\s*\$INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4241',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4241-4247',
        any: [/^\s*CUSTOMDRAWLINE =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4242',
        any: [/^\s*PRINTL 读取CSV来生成奴隶\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4243',
        any: [/^\s*PRINTL 还需要消耗30的等级和30个肉便器\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4246',
        any: [/^\s*PRINTW 等级不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4246-4252',
        any: [/^\s*PRINTW 等级不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4251',
        any: [/^\s*PRINTW 肉便器数量不足\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4255',
        any: [/^\s*PRINTFORML 条件达成。要生成奴隶吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4256',
        any: [/^\s*PRINTFORML 若要生成，请输入要奴隶的编号\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4258',
        any: [/^\s*PRINTL  \[0\] - 不生成\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4260',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4262-4263',
        any: [/^\s*IF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4265',
        any: [/^\s*PRINTW 请确认对象的收录编号在150以上199以下\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4266',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4269',
        any: [/^\s*LOCAL = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4271-4276',
        any: [/^\s*EXISTCSV LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4274',
        any: [/^\s*PRINTW 所选奴隶并不存在\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4275',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4278',
        any: [/^\s*ADDCHARA LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4279',
        any: [/^\s*CALL ADDCHARA_EX, CHARANUM-1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4280',
        any: [/^\s*LOCAL:1 = CHARANUM - 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4281-4282',
        any: [/^\s*SAVESTR:\(LOCAL:1\) = %NAME:\(LOCAL:1\)%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4282',
        any: [/^\s*CSTR:\(LOCAL:1\):1 = %NAME:\(LOCAL:1\)%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4283',
        any: [/^\s*LOCAL:2 = TARGET\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4284',
        any: [/^\s*TARGET = LOCAL:1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4285',
        any: [/^\s*CALL WEARING_CLOTH_ABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4286',
        any: [/^\s*TARGET = LOCAL:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4288',
        any: [
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4289-4291',
        any: [/^\s*PRINT 从魔王的影子中将\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4292',
        any: [
          /^\s*PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4295-4298',
        any: [/^\s*TALENT:\(LOCAL:1\):292 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4295',
        any: [/^\s*TALENT:\(LOCAL:1\):292 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4297',
        any: [/^\s*CFLAG:\(LOCAL:1\):1 = 11\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4298',
        any: [/^\s*CFLAG:\(LOCAL:1\):420 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4300-4302',
        any: [/^\s*FOR LOCAL:2,800,810\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4304-4305',
        any: [/^\s*CFLAG:0:9 -= 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4304',
        any: [/^\s*CFLAG:0:9 -= 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4305',
        any: [/^\s*FLAG:83 -= 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4306-4307',
        any: [/^\s*MONEY -= C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4308',
        any: [/^\s*PRINTL 作为代价等级和肉便器减少了30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4308-4314',
        any: [/^\s*PRINTL 作为代价等级和肉便器减少了30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4309',
        any: [/^\s*PRINTFORMW %SAVESTR:\(LOCAL:1\)%的召喚并不完全\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4310',
        any: [
          /^\s*PRINTFORMW 请找出 种族・性格・理由・成为勇者前的生活・发色・瞳色 其中一项有与之共通的奴隶做成肉便器\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4311',
        any: [
          /^\s*PRINTFORMW 各个素质均有相符后耗费30个肉便器将%SAVESTR:\(LOCAL:1\)%解放出来\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4313',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4317-4392',
        any: [/^\s*@ANTI_AGING\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4323',
        any: [/^\s*C = 20000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4326',
        any: [/^\s*PRINTW 没钱就别想这些事情\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4332',
        any: [/^\s*PRINTL 服用减龄的魔药让肉体恢复青春\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4333',
        any: [/^\s*PRINTL 要让谁使用呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4364',
        any: [
          /^\s*ELSEIF CFLAG:RESULT:451 < 18 \|\| GETBIT\(FLAG:5,13\) && CFLAG:RESULT:452 < 18\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4365',
        any: [/^\s*PRINTFORMW %SAVESTR:RESULT%无法再变得更年轻了\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4367-4369',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4374',
        any: [/^\s*PRINTFORML 要让%SAVESTR:RESULT%服用减龄魔药吗？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4384',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%的肉体年轻了10岁》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4385-4386',
        any: [/^\s*CFLAG:T:451 -= 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4385',
        any: [/^\s*CFLAG:T:451 -= 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4386',
        any: [/^\s*CFLAG:T:452 -= 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4397-4498',
        any: [/^\s*@肉棒改造\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4406-4409',
        any: [/^\s*IF MONEY < C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4413',
        any: [
          /^\s*PRINTL 只要使用实验室传下来的秘传魔法！就可以让任何的肉棒大小进行改造！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4414',
        any: [/^\s*PRINTL 也就是说无论是变大！还是变小∽都可以的哦？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4415',
        any: [/^\s*PRINTL 所以说魔王大人…要对谁使用呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4444-4446',
        any: [/^\s*ELSEIF TALENT:T:122 == 0 && TALENT:T:121 == 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4447-4449',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4452',
        any: [/^\s*T = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4455',
        any: [
          /^\s*PRINTFORML %SAVESTR:T%被实验室的女主任绑在改造台上，下身的衣物已然被脱了个精光，散落在地上。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4456',
        any: [
          /^\s*PRINTFORML 对方口中含着%SAVESTR:T%的扶她肉棒，在巧妙的口技下%SAVESTR:T%也难免硬了起来！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4457',
        any: [/^\s*PRINTFORML 唔？魔王大人，想让这孩子的扶她肉棒，唔！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4458',
        any: [/^\s*PRINTFORML 哈一一一，变成什么样子呢？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4460',
        any: [
          /^\s*PRINTFORML 魔王大人，想让%SAVESTR:T%的肉棒变成什么样子呢？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4463-4468',
        any: [/^\s*PRINTL  \[0\] - 普通\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4470',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4472-4473',
        any: [/^\s*IF RESULT == 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4475',
        any: [/^\s*PRINTFORMW 《%SAVESTR:T%获得【%TALENTNAME:121%】了》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4476',
        any: [/^\s*PRINT 肉棒的状态：\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4477-4487',
        any: [/^\s*IF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4488-4491',
        any: [/^\s*TALENT:T:121 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4488',
        any: [/^\s*TALENT:T:121 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4489',
        any: [/^\s*TALENT:T:326 = 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4490',
        any: [/^\s*TALENT:T:318 = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4491',
        any: [/^\s*TALENT:T:1 = 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4492-4493',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4493-4498',
        any: [/^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_LABO ver1.0.2.ERB',
        ref: '4496-4497',
        any: [/^\s*MONEY -= C\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
