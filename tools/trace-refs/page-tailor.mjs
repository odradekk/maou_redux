// 源: tools/trace-check.mjs  @FILES
// issue #397（N13 据点列表与裁缝）新增：ere/page/page-tailor.js ↔ target/ERB/SHOP/SHOP_TAILOR.ERB
// 本票逐行标注了原作的 :N 出处，锚按「所引行首个非空行的整行字面量」生成
// （逐条在场校验 + 源侧锚校验由 trace-check 执行）。

export const FILES = [
  {
    js: 'ere/page/page-tailor.js',
    refs: [
      // #397 返工：强化档的「钱不够」守卫两处（:1068-1071 / :1206-1209 的
      // `X = MONEY / 10000` + `SIF X > 10`）——文件头 5b 登记为结构性不可达
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1068-1071',
        any: [/^\s*SIF X > 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1206-1209',
        any: [/^\s*SIF X > 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '6-59',
        any: [
          /^\s*;購入した品物の種類（1～9:通常衣類\ 2:学生服\ 3:子供服\ 10:下着\ 11:替えオムツ\ 20:装備品\ ）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '7',
        any: [
          /^\s*;購入した品物の種類（1～9:通常衣類\ 2:学生服\ 3:子供服\ 10:下着\ 11:替えオムツ\ 20:装備品\ ）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '16',
        any: [/^\s*F\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '20-38',
        any: [/^\s*PRINTL\ 《这里是制作衣装的服饰店》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '20-21',
        any: [/^\s*PRINTL\ 服装设计师\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '21',
        any: [/^\s*PRINTL\ 服装设计师\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '22',
        any: [/^\s*PRINTL\ 《这里是制作衣装的服饰店》\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '23-24',
        any: [/^\s*PRINTV\ DAY\+1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '24-30',
        any: [/^\s*PRINTL\ \ 午后\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '32',
        any: [/^\s*PRINTFORML\ 所持金：\{MONEY\}点\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '33-34',
        any: [/^\s*PRINTL\ 调整谁的衣装？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '34',
        any: [/^\s*PRINTL\ 调整谁的衣装？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '35-36',
        any: [/^\s*CALL\ LIFE_LIST_TAILOR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '36',
        any: [/^\s*CALL\ LIFE_LIST_TAILOR\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '37',
        any: [/^\s*CUSTOMDRAWLINE\ ‥\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '38',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '40',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '42-46',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '43-46',
        any: [/^\s*R\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '47-54',
        any: [/^\s*ELSEIF\ RESULT\ <\ 1\ \|\|\ RESULT\ >=\ CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '57',
        any: [/^\s*CALL\ TAILOR_CORE\(RESULT\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '59',
        any: [/^\s*RESTART\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '61-254',
        any: [
          /^\s*;【小型体型】でない【巨乳】【爆乳】【超乳】キャラに子供服を買ってやった場合\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '63',
        any: [/^\s*TARGET\ =\ ARG\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '65-127',
        any: [
          /^\s*ELSEIF\ RESULT\ ==\ 5\ \&\&\ CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:49\ ==\ 0\ \&\&\ TALENT:0\ \&\&\ CFLAG:71\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '71-72',
        any: [/^\s*PRINTFORML\ 所持金：\{MONEY\}点\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '72',
        any: [/^\s*PRINTFORML\ 所持金：\{MONEY\}点\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '73',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%现在%GET_CLOTHTYPE_MAIN2\(TARGET,"身穿"\)%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '73-75',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%现在%GET_CLOTHTYPE_MAIN2\(TARGET,"身穿"\)%。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '75',
        any: [/^\s*PRINTFORML\ 要让%SAVESTR:TARGET%穿上什么？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '76-78',
        any: [/^\s*PRINTL\ \ \[0\]\ \-\ 日常服饰（100点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '78-88',
        any: [
          /^\s*SIF\ CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:49\ ==\ 0\ \&\&\ TALENT:0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '78',
        any: [/^\s*PRINTL\ \ \[0\]\ \-\ 日常服饰（100点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '79',
        any: [/^\s*PRINTL\ \ \[1\]\ \-\ 普通装备（1000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '80',
        any: [/^\s*PRINTL\ \ \[2\]\ \-\ 其它\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '81',
        any: [/^\s*PRINTL\ \ \[3\]\ \-\ 替换内衣（5点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '82-83',
        any: [
          /^\s*SIF\ CFLAG:42\ ==\ 69\ \&\&\ \(\(CFLAG:40\ \&\ 64\)\ ==\ 0\ \|\|\ CFLAG:47\ >\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '84-85',
        any: [
          /^\s*SIF\ CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:49\ ==\ 0\ \&\&\ TALENT:0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '87',
        any: [/^\s*PRINTL\ \ \[7\]\ \-\ 魔法装备\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '88',
        any: [/^\s*PRINTL\ \ \[8\]\ \-\ 武器\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '90',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '92',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '94-95',
        any: [/^\s*CALL\ TAILOR_CASUAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '96-97',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '98-99',
        any: [/^\s*CALL\ TAILOR_ACCESSORY\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '100-101',
        any: [/^\s*CALL\ TAILOR_UNDERWARE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '102-103',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 4\ \&\&\ CFLAG:42\ ==\ 69\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '104-105',
        any: [
          /^\s*ELSEIF\ RESULT\ ==\ 5\ \&\&\ CFLAG:42\ ==\ 79\ \&\&\ \(CFLAG:40\ \&\ 64\)\ \&\&\ CFLAG:49\ ==\ 0\ \&\&\ TALENT:0\ \&\&\ CFLAG:71\ ==\ 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '106-107',
        any: [/^\s*CALL\ EQUIP_MAGIC_ITEM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '108-109',
        any: [/^\s*CALL\ EQUIP_MAGIC_WEAPON\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '110-111',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '112-113',
        any: [/^\s*GOTO\ INPUT_LOOP_02\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '116-117',
        any: [/^\s*GOTO\ INPUT_LOOP_02\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '116-127',
        any: [/^\s*PRINTFORMW\ 不解開貞操帯的話，无法穿戴其他装备！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '118-120',
        any: [/^\s*PRINTFORMW\ 不解開貞操帯的話，无法穿戴其他装备！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '121-123',
        any: [/^\s*PRINTW\ 钱不够！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '124-126',
        any: [/^\s*PRINTFORMW\ 拒绝穿戴。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '129-163',
        any: [
          /^\s*;【小型体型】でない【巨乳】【爆乳】【超乳】キャラに子供服を買ってやった場合\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '130',
        any: [/^\s*IF\ TALENT:99\ \&\&\ A\ ==\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '131-145',
        any: [/^\s*PRINTL\ 强行套上的时候，把衣服的下半身撑破啦！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '137',
        any: [/^\s*PRINTL\ 强行套上的时候，把衣服的下半身撑破啦！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '138',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '140',
        any: [/^\s*F\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '148-162',
        any: [/^\s*PRINTL\ 强行套上的时候，把衣服的上半身撑破啦！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '154',
        any: [/^\s*PRINTL\ 强行套上的时候，把衣服的上半身撑破啦！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '155',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '157',
        any: [/^\s*F\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '165',
        any: [/^\s*IF\ A\ <=\ 9\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '165-175',
        any: [
          /^\s*IF\ CFLAG:41\ \&\&\ \(CFLAG:45\ ==\ 0\ \|\|\ CFLAG:46\ ==\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '165-230',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%不自觉的发出了声音，脸上也泛起了红潮。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '165-252',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%不自觉的发出了声音，脸上也泛起了红潮。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '166',
        any: [/^\s*PRINTFORM\ %SAVESTR:TARGET%\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '167-169',
        any: [
          /^\s*IF\ CFLAG:41\ \&\&\ \(CFLAG:45\ ==\ 0\ \|\|\ CFLAG:46\ ==\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '172',
        any: [/^\s*CFLAG:41\ =\ R\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '173',
        any: [/^\s*CFLAG:45\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '174',
        any: [/^\s*CFLAG:46\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '176',
        any: [
          /^\s*PRINTFORML\ %GET_CLOTHTYPE_MAIN2\(TARGET,"换上"\)%了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '177',
        any: [/^\s*ELSEIF\ A\ ==\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '177-205',
        any: [/^\s*PRINTFORML\ 穿过的内裤被卖掉挣了\{M\}点钱。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '179-194',
        any: [/^\s*PRINTFORML\ 穿过的内裤被卖掉挣了\{M\}点钱。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '180',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '181',
        any: [/^\s*M\ =\ 50\ \*\ CFLAG:48\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '183-184',
        any: [/^\s*TIMES\ M\ ,\ 1\.50\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '186-187',
        any: [/^\s*TIMES\ M\ ,\ 2\.00\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '189-190',
        any: [/^\s*TIMES\ M\ ,\ 1\.50\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '191',
        any: [/^\s*PRINTFORML\ 穿过的内裤被卖掉挣了\{M\}点钱。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '192',
        any: [/^\s*MONEY\ \+=\ M\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '193',
        any: [/^\s*EX_FLAG:4444\ \+=\ M\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '196-200',
        any: [/^\s*IF\ CFLAG:41\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '202-205',
        any: [/^\s*CFLAG:48\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '202',
        any: [/^\s*CFLAG:40\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '206-208',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%在房间的角落穿上了尿布。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '206',
        any: [/^\s*ELSEIF\ A\ ==\ 11\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '209',
        any: [/^\s*ELSEIF\ A\ ==\ 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '209-229',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%不自觉的发出了声音，脸上也泛起了红潮。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '218',
        any: [/^\s*CFLAG:42\ =\ R\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '219',
        any: [/^\s*CFLAG:47\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '222',
        any: [/^\s*PRINTFORML\ 穿上了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '226',
        any: [
          /^\s*PRINTFORML\ 穿衣的时候，因为尚未习惯的尿道导管的插入，\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '227',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%不自觉的发出了声音，脸上也泛起了红潮。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '232-245',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%高耸入云的双峰，一览无遗。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '232-254',
        any: [
          /^\s*PRINTFORML\ %SAVESTR:TARGET%高耸入云的双峰，一览无遗。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '237-238',
        any: [/^\s*CFLAG:45\ =\ 0\ \-\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '244',
        any: [/^\s*CFLAG:46\ =\ 0\ \-\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '247-252',
        any: [/^\s*CALL\ WEARING_CLOTH_ABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '247-254',
        any: [/^\s*CALL\ WEARING_CLOTH_ABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '247',
        any: [/^\s*CALL\ WEARING_CLOTH_ABLE\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '249',
        any: [/^\s*TARGET\ =\ \-\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '249-251',
        any: [/^\s*EX_FLAG:4444\ \-=\ C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '250',
        any: [/^\s*MONEY\ \-=\ C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '251',
        any: [/^\s*EX_FLAG:4444\ \-=\ C\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '252',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '259-303',
        any: [/^\s*PRINTL\ \ \[2\]\ \-\ 日常着装・裤子\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '261',
        any: [/^\s*C\ =\ 100\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '264-268',
        any: [/^\s*PRINTW\ 钱不够！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '272',
        any: [/^\s*PRINTL\ □日常着装\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '273',
        any: [/^\s*PRINTFORML\ 所持金：\{MONEY\}点\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '276-277',
        any: [/^\s*PRINTL\ \ \[2\]\ \-\ 日常着装・裤子\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '279',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '281',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '283-299',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '286-287',
        any: [/^\s*SIF\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '291-296',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '297-298',
        any: [/^\s*GOTO\ INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '308-550',
        any: [/^\s*PRINTL\ \ \[39\]\ \-\ 露出乳头与私处的紧身衣\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '310',
        any: [/^\s*C\ =\ 1000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '313',
        any: [/^\s*P\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '327-527',
        any: [/^\s*PRINTL\ \ \[39\]\ \-\ 露出乳头与私处的紧身衣\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '395',
        any: [/^\s*A\ =\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '397-401',
        any: [/^\s*SIF\ TALENT:132\ \|\|\ TALENT:135\ \|\|\ TALENT:131\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '530',
        any: [/^\s*P\ %=\ 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '544-550',
        any: [/^\s*CALL\ TAILOR_NORMAL_SPECIAL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '556-862',
        any: [
          /^\s*PRINTFORML\ □装备品\ \(\{\(LOCAL:0\)\+1,2\}\/\{\(LOCAL:1\/10\)\+1,2\}页\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '557',
        any: [/^\s*A\ =\ 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '560',
        any: [/^\s*LOCAL:0\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '562',
        any: [/^\s*LOCAL:1\ =\ 40\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '566',
        any: [
          /^\s*PRINTFORML\ □装备品\ \(\{\(LOCAL:0\)\+1,2\}\/\{\(LOCAL:1\/10\)\+1,2\}页\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '570-850',
        any: [/^\s*PRINTL\ \ \[30\]\ \-\ 龟甲缚用的绳子（10000点）\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '634-639',
        any: [/^\s*IF\ LOCAL:0\ >\ \(LOCAL:1\)\/10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '640-645',
        any: [/^\s*LOCAL:0\ =\ \(LOCAL:1\)\/10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '681-683',
        any: [/^\s*SIF\ TALENT:122\ \&\&\ S\ <\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '763-767',
        any: [/^\s*SIF\ TALENT:136\ \|\|\ S\ <\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '777-779',
        any: [
          /^\s*SIF\ \(TALENT:110\ \|\|\ TALENT:114\)\ \&\&\ TALENT:130\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '824-825',
        any: [/^\s*SIF\ TALENT:57\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '830-831',
        any: [/^\s*SIF\ TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '844-845',
        any: [/^\s*SIF\ TALENT:85\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '867-882',
        any: [/^\s*PRINTW\ 钱不够！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '868-871',
        any: [/^\s*A\ =\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '869',
        any: [/^\s*C\ =\ 5\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '873-879',
        any: [/^\s*PRINTW\ 钱不够！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '887-901',
        any: [/^\s*PRINTW\ 钱不够！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '889',
        any: [/^\s*C\ =\ 50\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '906-928',
        any: [
          /^\s*PRINTFORMW\ %CALLNAME:MASTER%把贞操带的钥匙，丢到连接地下城迷宫各层的楼梯处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '907',
        any: [/^\s*A\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '909',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%贞操带的钥匙丢掉的话，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '910',
        any: [
          /^\s*PRINTFORML\ 就再也无法打开%CALLNAME:MASTER%的贞操带了。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '911',
        any: [
          /^\s*PRINTFORML\ 丢掉钥匙，而且也没有后备匙，钥匙真的再也找不回来了哦！\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '912-926',
        any: [
          /^\s*PRINTFORMW\ %CALLNAME:MASTER%把贞操带的钥匙，丢到连接地下城迷宫各层的楼梯处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '913',
        any: [/^\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '914',
        any: [
          /^\s*PRINTFORML\ 当真当真要把%SAVESTR:TARGET%贞操带的钥匙丢掉吗？\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '915',
        any: [/^\s*PRINTFORML\ \ \[0\]\ \-\ 丢掉！\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '916',
        any: [/^\s*PRINTFORML\ \ \[1\]\ \-\ 不丢。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '917',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '919',
        any: [/^\s*PRINTFORML\ %SAVESTR:TARGET%呆若木鸡地看着前方，\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '920',
        any: [
          /^\s*PRINTFORMW\ %CALLNAME:MASTER%把贞操带的钥匙，丢到连接地下城迷宫各层的楼梯处。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '921',
        any: [/^\s*PRINTFORML\ 到底掉到哪层，掉到哪里，再也没人知道了。\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '922',
        any: [/^\s*WAIT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '923',
        any: [/^\s*CFLAG:49\ =\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '924-925',
        any: [/^\s*GOTO\ INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '933-979',
        any: [
          /^\s*ELSEIF\ CFLAG:41\ \&\&\ \(CFLAG:43\ >=\ 0\ \|\|\ CFLAG:44\ >=\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '936-937',
        any: [/^\s*SIF\ COUNT\ ==\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '939-940',
        any: [/^\s*SIF\ BASE:COUNT:0\ <\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '942-943',
        any: [/^\s*SIF\ CFLAG:COUNT:1\ !=\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '944',
        any: [/^\s*TARGET\ =\ COUNT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '945-978',
        any: [
          /^\s*ELSEIF\ CFLAG:41\ \&\&\ \(CFLAG:43\ >=\ 0\ \|\|\ CFLAG:44\ >=\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '946-954',
        any: [
          /^\s*ELSEIF\ CFLAG:41\ \&\&\ \(CFLAG:43\ >=\ 0\ \|\|\ CFLAG:44\ >=\ 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '955-959',
        any: [/^\s*IF\ CFLAG:42\ \&\&\ CFLAG:47\ >=\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '960-977',
        any: [/^\s*CALL\ PRINT_EQUIPTYPE_WEAPON\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '962-970',
        any: [/^\s*CALL\ PRINT_EQUIPTYPE_WEAPON\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '982-1129',
        any: [
          /^\s*PRINTFORML\ 要装备%ITEMNAME:RESULT%了吗？　请确认装备的提升。每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '988-1008',
        any: [/^\s*PRINTFORM\ \ \[2\]\ \-\ 装饰B　:\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '990',
        any: [/^\s*W:0\ =\ CFLAG:TARGET:551\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '992-993',
        any: [/^\s*IF\ W:0\ <=\ \-1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '992',
        any: [/^\s*IF\ W:0\ <=\ \-1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '995',
        any: [/^\s*CALL\ PRINT_EQUIPTYPE_RING\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '999',
        any: [/^\s*W:0\ =\ CFLAG:TARGET:552\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1008',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1010',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1012-1013',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1014-1015',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1016-1017',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1018-1019',
        any: [/^\s*GOTO\ INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1022-1129',
        any: [
          /^\s*PRINTFORML\ 要装备%ITEMNAME:RESULT%了吗？　请确认装备的提升。每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1024-1028',
        any: [
          /^\s*PRINTFORML\ \ \[\{X\}\]\ \-\ %ITEMNAME:X%\ \(\{ITEM:X\}\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1024',
        any: [/^\s*REPEAT\ 20\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1030',
        any: [/^\s*IF\ CFLAG:0:9\ <\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1030-1039',
        any: [
          /^\s*PRINTL\ \ \[\-\-\-\]\ \-\ 未开放（30级后才能装备强化）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1040',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1042',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1044',
        any: [/^\s*EQUIPTYPE\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1046-1047',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1048',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 997\ \&\&\ CFLAG:0:9\ >=\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1048-1049',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 997\ \&\&\ CFLAG:0:9\ >=\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1050-1054',
        any: [/^\s*W:0\ =\ CFLAG:TARGET:Y\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1055-1056',
        any: [/^\s*ELSEIF\ RESULT\ >=\ 300\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1057-1058',
        any: [/^\s*GOTO\ INPUT_LOOP_02\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1061-1065',
        any: [
          /^\s*PRINTFORML\ 要装备%ITEMNAME:RESULT%了吗？　请确认装备的提升。每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1062',
        any: [
          /^\s*PRINTFORML\ 要强化现在的装备吗？　每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1067-1089',
        any: [
          /^\s*PRINTFORML\ \[0\]\ \[1\]\ \[2\]\ \[4\]\ \[6\]\ \[8\]\ \[\{X\}\]\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1070-1071',
        any: [/^\s*SIF\ X\ >\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1073',
        any: [
          /^\s*PRINTFORML\ \[0\]\ \[1\]\ \[2\]\ \[4\]\ \[6\]\ \[8\]\ \[\{X\}\]\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1074',
        any: [/^\s*PRINTL\ \[999\]\ \-\ 不装备\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1076',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1078-1079',
        any: [/^\s*GOTO\ INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1080',
        any: [/^\s*ELSEIF\ X\ >=\ 0\ \&\&\ X\ <=\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1081',
        any: [/^\s*Y:2\ =\ RESULT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1086-1088',
        any: [/^\s*IF\ MONEY\ <\ \(RESULT\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1086',
        any: [/^\s*IF\ MONEY\ <\ \(RESULT\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1091-1128',
        any: [/^\s*;ITEMナンバーから識別番号へ\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1094-1113',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1096',
        any: [/^\s*W:2\ =\ W:0\ %\ 100000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1103',
        any: [/^\s*SIF\ W:2\ >\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1103-1104',
        any: [/^\s*Y:2\ \+=\ 10\ \-\ W:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1107',
        any: [/^\s*W:0\ \+=\ 1000\ \*\ Y:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1110-1111',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1112',
        any: [/^\s*CFLAG:TARGET:Y\ =\ W:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1116-1128',
        any: [/^\s*;ITEMナンバーから識別番号へ\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1116',
        any: [/^\s*CALL\ EQUIP_GET\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1120',
        any: [/^\s*ITEM:X\ \-=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1122-1123',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1124',
        any: [/^\s*;ITEMナンバーから識別番号へ\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1126',
        any: [/^\s*CALL\ GET_EQUIP_NUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1127-1128',
        any: [/^\s*CFLAG:TARGET:Y\ =\ W:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1127',
        any: [/^\s*W:0\ \+=\ Y:2\ \*\ 1000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1133-1292',
        any: [
          /^\s*PRINTFORML\ 要装备%ITEMNAME:RESULT%了吗？　请确认装备的提升。每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1141',
        any: [/^\s*W:0\ =\ CFLAG:TARGET:550\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1143',
        any: [/^\s*PRINTFORM\ 武器　:\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1144-1145',
        any: [/^\s*PRINTL\ 空手\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1146-1148',
        any: [/^\s*CALL\ PRINT_EQUIPTYPE_WEAPON\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1151',
        any: [/^\s*PRINTL\ \ \[340\]\ \-\ 剑\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1153-1157',
        any: [
          /^\s*PRINTFORML\ \ \[\{X\}\]\ \-\ %ITEMNAME:X%\ \(\{ITEM:X\}\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1156',
        any: [
          /^\s*PRINTFORML\ \ \[\{X\}\]\ \-\ %ITEMNAME:X%\ \(\{ITEM:X\}\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1159-1160',
        any: [/^\s*PRINTFORML\ \ \[990\]\ \-\ 武器化触手\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1159',
        any: [/^\s*SIF\ ITEM:90\ >\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1160',
        any: [/^\s*PRINTFORML\ \ \[990\]\ \-\ 武器化触手\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1160-1181',
        any: [
          /^\s*PRINTL\ \ \[\-\-\-\]\ \-\ 未开放（30级后才能装备强化）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1162',
        any: [/^\s*IF\ CFLAG:0:9\ <\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1163-1165',
        any: [
          /^\s*PRINTL\ \ \[\-\-\-\]\ \-\ 未开放（30级后才能装备强化）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1164',
        any: [
          /^\s*PRINTL\ \ \[\-\-\-\]\ \-\ 未开放（30级后才能装备强化）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1166-1168',
        any: [/^\s*PRINTL\ \ \[997\]\ \-\ 装备强化\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1170-1171',
        any: [/^\s*PRINTL\ \ \[998\]\ \-\ 取下\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1172',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1174',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1176',
        any: [/^\s*EQUIPTYPE\ =\ 0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1178-1179',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1180-1182',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 990\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1183-1185',
        any: [/^\s*PRINTFORML\ 手无寸铁，强化啥子？\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1186',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 997\ \&\&\ CFLAG:0:9\ >=\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1186-1187',
        any: [/^\s*ELSEIF\ RESULT\ ==\ 997\ \&\&\ CFLAG:0:9\ >=\ 30\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1188-1192',
        any: [/^\s*W:0\ =\ CFLAG:TARGET:550\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1190',
        any: [/^\s*CALL\ EQUIP_GET\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1193-1196',
        any: [/^\s*ELSEIF\ RESULT\ >=\ 300\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1199-1203',
        any: [
          /^\s*PRINTFORML\ 要装备%ITEMNAME:RESULT%了吗？　请确认装备的提升。每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1200',
        any: [
          /^\s*PRINTFORML\ 要强化现在的装备吗？　每\+1需花费10000pt，最多能\+10。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1205-1227',
        any: [
          /^\s*PRINTFORML\ \[0\]\ \[1\]\ \[2\]\ \[4\]\ \[6\]\ \[8\]\ \[\{X\}\]\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1224',
        any: [/^\s*IF\ MONEY\ <\ \(RESULT\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1229-1291',
        any: [/^\s*PRINTFORMW\ 可以设定强化的前缀\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1230-1251',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1233',
        any: [/^\s*W:2\ =\ W:0\ %\ 100000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1240',
        any: [/^\s*SIF\ W:2\ >\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1244',
        any: [/^\s*W:0\ \+=\ 1000\ \*\ Y:2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1247-1248',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1249',
        any: [/^\s*CFLAG:TARGET:550\ =\ W:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1253',
        any: [/^\s*PRINTFORMW\ 可以设定强化的前缀\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1253-1275',
        any: [/^\s*PRINTFORMW\ 可以设定强化的前缀\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1254-1263',
        any: [/^\s*PRINTL\ \[9\]\ \-\ 暗黑\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1265',
        any: [/^\s*PRINTL\ \ \[999\]\ \-\ 返回\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1267',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1269-1270',
        any: [/^\s*IF\ RESULT\ ==\ 999\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1271-1272',
        any: [/^\s*ELSEIF\ RESULT\ >=\ 0\ \&\&\ RESULT\ <\ 10\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1273-1274',
        any: [/^\s*GOTO\ INPUT_LOOP_01\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1277-1291',
        any: [/^\s*;ITEMナンバーから識別番号へ\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1278',
        any: [/^\s*CALL\ EQUIP_GET\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1282',
        any: [/^\s*ITEM:X\ \-=\ 1\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1284-1285',
        any: [/^\s*EX_FLAG:4444\ \-=\ \(Y:2\ \*\ 10000\)\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1288',
        any: [/^\s*CALL\ GET_EQUIP_NUM\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1289-1291',
        any: [/^\s*CFLAG:TARGET:550\ =\ W:0\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1289',
        any: [/^\s*W:0\ \+=\ Y:2\ \*\ 1000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1290',
        any: [/^\s*W:0\ \+=\ Y:3\ \*\ 100000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1299-1461',
        any: [
          /^\s*;\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\s*$/m,
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1301',
        any: [/^\s*A\ =\ 2\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1302',
        any: [/^\s*C\ =\ 30000\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1319-1456',
        any: [/^\s*PRINTL\ \ \[4\]\ \-\ 私立贵族学院制服\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1363',
        any: [/^\s*P\ %=\ 3\s*$/m],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TAILOR.ERB',
        ref: '1370-1375',
        any: [/^\s*T\ =\ 0\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
