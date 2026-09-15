// 源: tools/trace-check.mjs  @FILES
// issue #397（N13 据点列表与裁缝）新增：ere/page/page-intercept.js ↔ target/ERB/SHOP/SHOP_2.ERB
// 本票逐行标注了原作的 :N 出处，锚按「所引行首个非空行的整行字面量」生成
// （逐条在场校验 + 源侧锚校验由 trace-check 执行）。

export const FILES = [
  {
    js: 'ere/page/page-intercept.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '257-658',
        any: [
          /^\s*PRINTW\ 魔王大人，亲自迎击的话，这几天就不能爱爱了哦！才不要！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '258-269',
        any: [/^\s*\#DIM\ NUM_PAGE\ =\ 26\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '266',
        any: [/^\s*\#DIM\ NUM_PAGE\ =\ 26\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '282-300',
        any: [
          /^\s*\(EX_TALENT:COUNT:1\ \&\&\ EX_TALENT:COUNT:2\ \&\&\ GETBIT\(EX_FLAG:9000,1\)\ ==\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '284-291',
        any: [
          /^\s*\(EX_TALENT:COUNT:1\ \&\&\ EX_TALENT:COUNT:2\ \&\&\ GETBIT\(EX_FLAG:9000,1\)\ ==\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '284-285',
        any: [/^\s*SIF\	BASE:COUNT:0\ <\ 1\ \|\|\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '286',
        any: [/^\s*CFLAG:COUNT:1\ !=\ 0\ \|\|\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '287',
        any: [
          /^\s*\(CFLAG:COUNT:0\ ==\ 0\ \&\&\ TALENT:COUNT:254\ ==\ 0\)\ \|\|\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '288',
        any: [
          /^\s*\(TALENT:COUNT:153\ ==\ 1\ \&\&\ GETBIT\(FLAG:5,10\)\ ==\ 0\)\ \|\|\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '289',
        any: [
          /^\s*\(EX_TALENT:COUNT:1\ \&\&\ EX_TALENT:COUNT:2\ ==\ 0\)\ \|\|\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '290',
        any: [
          /^\s*\(EX_TALENT:COUNT:1\ \&\&\ EX_TALENT:COUNT:2\ \&\&\ GETBIT\(EX_FLAG:9000,1\)\ ==\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '301-349',
        any: [
          /^\s*T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '304-314',
        any: [/^\s*SWAP\ LIST_POS,\ PREV_LIST_POS\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '316',
        any: [/^\s*CUSTOMDRAWLINE\ =\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '317',
        any: [/^\s*PRINT\ 派遣谁前去迎击勇者？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '318',
        any: [/^\s*COST\ =\ 6000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '319',
        any: [
          /^\s*PRINTFORML\ <状态若不为\[可被卖\]、将需要\{COST\}pt资金来派遣>\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '320-321',
        any: [/^\s*L_LCOUNT\ =\ LINECOUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '321-338',
        any: [
          /^\s*T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '325-335',
        any: [
          /^\s*T_LCOUNT\ <\ \(NO_PAGE\ \+\ 1\)\*NUM_PAGE\ \+\ 1\ \&\&\ T_LCOUNT\ >=\ NO_PAGE\*\ NUM_PAGE\ \+\ 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '337',
        any: [/^\s*CALL\ LIFE_LIST_ITEM\(COUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '340-344',
        any: [/^\s*REPEAT\ \(NUM_PAGE\ \-\ L_LCOUNT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '345-346',
        any: [/^\s*PRINTLC\ \[1000\]\ \-\ 上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '346',
        any: [/^\s*PRINTLC\ \[1000\]\ \-\ 上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '347',
        any: [/^\s*PRINTLC\ \[999\]\ \-\ 返\ \ 回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '348',
        any: [/^\s*PRINTLC\ \[1001\]\ \-\ 下一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '349',
        any: [/^\s*PREV_PAGE\ =\ NO_PAGE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '351-408',
        any: [
          /^\s*PRINTW\ 魔王大人，亲自迎击的话，这几天就不能爱爱了哦！才不要！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '352',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '353-354',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '355-360',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1000\	\	;上一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '361-366',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1001\	\	;下一页\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '367-407',
        any: [
          /^\s*PRINTW\ 魔王大人，亲自迎击的话，这几天就不能爱爱了哦！才不要！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '375-406',
        any: [
          /^\s*PRINTW\ 魔王大人，亲自迎击的话，这几天就不能爱爱了哦！才不要！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '388-391',
        any: [
          /^\s*ELSEIF\ CFLAG:RESULT:0\ ==\ 0\ \&\&\ TALENT:RESULT:254\ ==\ 1\ \&\&\ MONEY\ <\ COST\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '410-412',
        any: [
          /^\s*PRINTFORMW\ \*%SAVESTR:RESULT%作为你的爪牙外出迎击了\*\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '412',
        any: [
          /^\s*PRINTFORMW\ \*%SAVESTR:RESULT%作为你的爪牙外出迎击了\*\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '414',
        any: [/^\s*SELECT\ =\ RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '416-418',
        any: [/^\s*WORK\ =\ CFLAG:SELECT:500\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '420-473',
        any: [
          /^\s*ELSEIF\ CFLAG:SELECT:0\ ==\ 0\ \&\&\ MONEY\ <\ \(COST\ \+\ 2000\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '421',
        any: [/^\s*PRINTFORML\ %SAVESTR:SELECT%的迎击设定\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '421-448',
        any: [/^\s*PRINTFORML\ \[0\]\ 出发阶层　　　\-\ \{FLOOR\}层\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '422-423',
        any: [/^\s*PRINTFORML\ \[0\]\ 出发阶层　　　\-\ \{FLOOR\}层\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '423',
        any: [/^\s*PRINTFORML\ \[0\]\ 出发阶层　　　\-\ \{FLOOR\}层\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '423-438',
        any: [/^\s*PRINTFORML\ \[0\]\ 出发阶层　　　\-\ \{FLOOR\}层\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '424-437',
        any: [/^\s*PRINTFORM\ \[1\]\ 迎击时顺便　　\-\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '425-437',
        any: [/^\s*PRINTL\ 扩张设施\(要2000G\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '430',
        any: [/^\s*PRINTL\ 扩张设施\(要2000G\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '438-443',
        any: [/^\s*PRINTFORM\ \[2\]\ 道具的补给　　\-\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '440',
        any: [/^\s*PRINTL\ 全副整装\(要2000G\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '444',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '445-447',
        any: [/^\s*PRINTFORM\ \[998\]\ 去吧！皮卡丘！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '445',
        any: [/^\s*SETCOLORBYNAME\ DarkSeaGreen\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '448',
        any: [/^\s*PRINTFORML\ \[999\]\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '450',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '452-453',
        any: [/^\s*GOTO\ INPUT_LOOP_MAIN0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '454-455',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '456-457',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '458-467',
        any: [
          /^\s*ELSEIF\ CFLAG:SELECT:0\ ==\ 0\ \&\&\ MONEY\ <\ \(COST\ \+\ 2000\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '468-470',
        any: [/^\s*GOTO\ INPUT_LOOP_MAIN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '471-472',
        any: [/^\s*GOTO\ INPUT_LOOP_MAIN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '475-506',
        any: [/^\s*PRINTFORML\ 补给已满，资金被退还了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '476',
        any: [/^\s*CFLAG:SELECT:1\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '477',
        any: [/^\s*CFLAG:SELECT:500\ =\ WORK\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '478',
        any: [/^\s*CFLAG:SELECT:501\ =\ FLOOR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '479',
        any: [/^\s*CFLAG:SELECT:502\ =\ 90\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '480',
        any: [/^\s*CFLAG:SELECT:505\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '481-484',
        any: [/^\s*IF\ CFLAG:SELECT:0\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '486-489',
        any: [/^\s*EX_FLAG:4444\ \-=\ 2000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '490-506',
        any: [/^\s*PRINTFORML\ 补给已满，资金被退还了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '496',
        any: [/^\s*CALL\ ADD_EX_ITEM,\ \-1,\ SELECT\ ,\ 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '497-498',
        any: [/^\s*SIF\ RESULT\ >\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '502',
        any: [/^\s*PRINTFORML\ 补给已满，资金被退还了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '508-510',
        any: [/^\s*CALL\ GOHOUBI_REQUEST,\ SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '508',
        any: [/^\s*CALL\ GOHOUBI_REQUEST,\ SELECT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '515-547',
        any: [
          /^\s*PRINTFORML\ 可用魔王的力量把%SAVESTR:SELECT%传送到任意阶层。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '516',
        any: [/^\s*PRINTL\ 出发层设定\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '517',
        any: [
          /^\s*PRINTFORML\ 可用魔王的力量把%SAVESTR:SELECT%传送到任意阶层。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '518',
        any: [/^\s*PRINTL\ 从那一层出发？\ \(1\-9\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '519',
        any: [
          /^\s*PRINTL\ \[1\]\ \[2\]\ \[3\]\ \[4\]\ \[5\]\ \[6\]\ \[7\]\ \[8\]\ \[9\]\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '521',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '522-523',
        any: [/^\s*IF\ RESULT\ >=\ 1\ \&\&\ RESULT\ <=\ 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '522',
        any: [/^\s*IF\ RESULT\ >=\ 1\ \&\&\ RESULT\ <=\ 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '524-525',
        any: [/^\s*GOTO\ INPUT_LOOP_4\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '528-545',
        any: [
          /^\s*PRINTFORMW\ \{FLOOR\}层的%ITEMNAME:ROOM%已经扩张到极限了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '529-531',
        any: [/^\s*ROOMID\ =\ FLOOR\ \+\ 349\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '529',
        any: [/^\s*ROOMID\ =\ FLOOR\ \+\ 349\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '534',
        any: [/^\s*PRINTFORMW\ \{FLOOR\}层没有任何设施\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '538-539',
        any: [/^\s*LOCAL\ =\ FLAG:ROOMID\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '538',
        any: [/^\s*ROOMID\ \+=\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '541',
        any: [/^\s*IF\ LOCAL\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '542',
        any: [
          /^\s*PRINTFORMW\ \{FLOOR\}层的%ITEMNAME:ROOM%已经扩张到极限了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '547',
        any: [/^\s*GOTO\ INPUT_LOOP_MAIN\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '552-656',
        any: [
          /^\s*PRINTFORMW\ \{FLOOR\}层的%ITEMNAME:ROOM%已经扩张到极限了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '554',
        any: [/^\s*PRINTL\ 在地下城内的行动为\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '555-556',
        any: [/^\s*PRINTL\ \[0\]\ 内职\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '556',
        any: [/^\s*PRINTL\ \[0\]\ 内职\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '557-596',
        any: [/^\s*PRINTL\ \[\-\-\-\]\ （魔王等级不足）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '558',
        any: [/^\s*PRINTL\ \[1\]\ 卖淫\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '559-596',
        any: [/^\s*PRINTL\ \[\-\-\-\]\ （魔王等级不足）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '560-562',
        any: [/^\s*PRINTL\ \[\-\-\-\]\ （魔王等级不足）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '560',
        any: [/^\s*SETCOLOR\ 80,80,80\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '566',
        any: [/^\s*PRINTL\ \[2\]\ 补充陷阱\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '575',
        any: [/^\s*PRINTL\ \[3\]\ 扩张设施\(要2000G\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '583',
        any: [/^\s*PRINTL\ \[4\]\ 潜入工作\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '591',
        any: [/^\s*PRINTL\ \[5\]\ 训练\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '598-601',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '601',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '602-616',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 5\ \&\&\ CFLAG:0:9\ <\ 50\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '618-619',
        any: [/^\s*PRINTW\ 得到了在地下城中对怪物们卖淫的许可\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '620-621',
        any: [/^\s*PRINTW\ 将进行陷阱的补充作业\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '622-645',
        any: [
          /^\s*PRINTFORMW\ \{FLOOR\}层的%ITEMNAME:ROOM%已经扩张到极限了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '640',
        any: [
          /^\s*PRINTFORMW\ \{FLOOR\}层的%ITEMNAME:ROOM%扩张需要2000资金。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '642-644',
        any: [/^\s*PRINTFORMW\ \*\ 魔王大人，你怎么这么穷\ \*\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '647-648',
        any: [/^\s*PRINTW\ 对勇者队伍的潜入工作进行中\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '649-650',
        any: [/^\s*PRINTW\ 在迎击的过程中进行了训练并得到了经验值\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '651-652',
        any: [/^\s*PRINTW\ 得到了收入\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '654',
        any: [/^\s*WORK\ =\ RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_2.ERB',
        ref: '656',
        any: [/^\s*GOTO\ INPUT_LOOP_MAIN\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
