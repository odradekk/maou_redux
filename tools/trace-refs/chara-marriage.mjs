// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #393：chara-marriage.js 的锚表（CHARA_MARRIAGE.ERB 全文件）

export const FILES = [
  {
    js: 'ere/chara/chara-marriage.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '14-32',
        any: [/^\s*@SHOW_BUTTON_MARRIAGE\(NUM, ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '19-27',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 恋人設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '20',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_MARRIAGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '21-23',
        any: [
          /^\s*IF LOCAL == 1\s*; 結婚不可能ならボタン自体を表示しない\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '24-28',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 恋人設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '28-29',
        any: [/^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '30',
        any: [/^\s*PRINTFORM \[\{NUM\}\] 結婚\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '35-49',
        any: [/^\s*@CHECK_ABLE_TO_MARRIAGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '42-43',
        any: [/^\s*SIF CFLAG:ARG:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '45-47',
        any: [
          /^\s*IF  CFLAG:ARG:1 != 0 && CFLAG:ARG:1 != 3 && CFLAG:ARG:1 != 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '45-48',
        any: [
          /^\s*IF  CFLAG:ARG:1 != 0 && CFLAG:ARG:1 != 3 && CFLAG:ARG:1 != 7\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '49',
        any: [/^\s*RETURNF 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '52-451',
        any: [/^\s*@MARRIAGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '64',
        any: [/^\s*LOCAL = CHECK_ABLE_TO_MARRIAGE\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '66-68',
        any: [/^\s*IF  LOCAL == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '69-74',
        any: [/^\s*SIF RESULT == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '76-77',
        any: [/^\s*RETURN 0\s*$\n^\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '79-126',
        any: [/^\s*PRINTFORML 怪物\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '80-168',
        any: [/^\s*PRINTFORML 怪物\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '81-87',
        any: [/^\s*PRINTFORML 怪物\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '84',
        any: [/^\s*CALL MONSTERPLAY_LIST\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '88-89',
        any: [/^\s*IF ITEM:22 >= 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '89',
        any: [/^\s*PRINT \[900\] 野良犬\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '90-93',
        any: [/^\s*PRINT \[666\] 野良犬\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '95',
        any: [/^\s*PRINTL \[901\] 你\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '96-97',
        any: [/^\s*PRINT \[902\] 与恋人結婚\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '98-101',
        any: [/^\s*PRINT \[666\] 与恋人結婚\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '103-104',
        any: [/^\s*PRINT \[902\] 恋人设定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '105-108',
        any: [/^\s*PRINT \[666\] 恋人设定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '110-111',
        any: [/^\s*PRINT \[903\] 与恋人分手\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '112-115',
        any: [/^\s*PRINT \[666\] 与恋人分手\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '118',
        any: [/^\s*PRINT \[904\] 从奴隶中选\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '119-120',
        any: [/^\s*IF CFLAG:\(ARG\):601 != 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '121-124',
        any: [/^\s*PRINTL \[666\] 离婚\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '126',
        any: [/^\s*PRINTL \[999\] 返回\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '128-168',
        any: [/^\s*PRINTFORM \[%SAVESTR:ARG%目前结婚对象:\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '129-130',
        any: [/^\s*IF CFLAG:ARG:601 == 900\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '131-132',
        any: [/^\s*ELSEIF CFLAG:ARG:601 == 901\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '133-139',
        any: [/^\s*ELSEIF CFLAG:ARG:601 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '135',
        any: [/^\s*IF TALENT:ARG:315 == 21 \|\| TALENT:ARG:157\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '140-141',
        any: [/^\s*ELSEIF CFLAG:ARG:601 == 902\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '142-165',
        any: [/^\s*ELSEIF CFLAG:MASTER:601 == CFLAG:ARG:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '143',
        any: [/^\s*CALL SEARCH_FAMILY,ARG,"MARRIAGE"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '144-145',
        any: [/^\s*IF EX_TALENT:ARG:2 && RESULT < 0\s*$\n^\s*PRINT 无\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '146-147',
        any: [/^\s*ELSEIF CFLAG:MASTER:601 == CFLAG:ARG:6\s*$/m],
      },
      // #393 返工：下面两条原是 CURRENT_SPOUSE_TEXT 的 :148-151 两支，因在
      // :133-139 的 `== 0` 早退之后恒假、js 侧已删（文件头有说明），锚保留
      // 下来只作「出处仍在」的凭据——js 的删除说明里引用了这两个行号。
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '148-149',
        any: [/^\s*ELSEIF CFLAG:ARG:601 == 0 && !EX_TALENT:ARG:2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '150-151',
        any: [/^\s*ELSEIF CFLAG:ARG:601 == 0 && EX_TALENT:ARG:2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '152-164',
        any: [/^\s*LOCAL = CFLAG:ARG:601\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '163',
        any: [/^\s*PRINTFORM %ITEMNAME:\(CFLAG:ARG:601\)%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '173',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '176',
        any: [/^\s*GROOM_NUM = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '178-180',
        any: [/^\s*IF RESULT == 999\s*;戻る\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '181-186',
        any: [/^\s*ELSEIF RESULT == 901\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '187-192',
        any: [/^\s*ELSEIF RESULT == 902\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '193-197',
        any: [/^\s*ELSEIF RESULT == 903\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '195',
        any: [/^\s*CFLAG:\(ARG\):606 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '198-243',
        any: [/^\s*ELSEIF RESULT == 904\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '200-205',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '202',
        any: [/^\s*CALL LIFE_LIST\(NO_PAGE,2\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '203',
        any: [/^\s*PRINTLC \[1000\] - 上一页\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '204',
        any: [/^\s*PRINTLC \[999\] - 返  回\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '205',
        any: [/^\s*PRINTLC \[1001\] - 下一页\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '207',
        any: [/^\s*INPUT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '209-210',
        any: [/^\s*IF RESULT == 999\s*$\n^\s*GOTO INPUT_LOOP\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '211-216',
        any: [/^\s*ELSEIF RESULT == 1000		;上一页\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '217-222',
        any: [/^\s*ELSEIF RESULT == 1001		;下一页\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '218',
        any: [/^\s*IF \(NO_PAGE\+1\) \* 20 <= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '222-224',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '222-256',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '223-224',
        any: [/^\s*ELSEIF RESULT < 0 \|\| RESULT >= CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '225-226',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '227-229',
        any: [/^\s*ELSEIF CFLAG:RESULT:1 != 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '230-232',
        any: [/^\s*ELSEIF CFLAG:RESULT:601 != 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '233-238',
        any: [/^\s*IF ARG == RESULT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '241-243',
        any: [/^\s*CHARA = RESULT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '245-248',
        any: [/^\s*ELSEIF RESULT == 998\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '249-251',
        any: [/^\s*ELSEIF ITEM:RESULT <= 0 && RESULT != 900\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '252-254',
        any: [/^\s*ELSEIF RESULT == 900 && ITEM:22 <= 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '255-257',
        any: [/^\s*ELSEIF RESULT <= 99\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '258-260',
        any: [/^\s*ELSEIF RESULT == CFLAG:ARG:601\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '261-263',
        any: [/^\s*ELSEIF CFLAG:ARG:601 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '266-273',
        any: [/^\s*IF CFLAG:ARG:609 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '267',
        any: [/^\s*IF CFLAG:ARG:609 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '268',
        any: [/^\s*CALL SEARCH_FAMILY,ARG,"MARRIAGE"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '271',
        any: [/^\s*CALL DIVORCE,RESULT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '275-328',
        any: [/^\s*PRINTFORM \*%SAVESTR:ARG%和\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '276-327',
        any: [/^\s*PRINTFORM \*%SAVESTR:ARG%和\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '277-278',
        any: [/^\s*IF GROOM_NUM == 900\s*$\n^\s*PRINT 野狗\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '279-280',
        any: [/^\s*ELSEIF GROOM_NUM == 901\s*$\n^\s*PRINT 你\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '281-302',
        any: [/^\s*IF CFLAG:ARG:606 == 200\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '283',
        any: [/^\s*CALL SEARCH_FAMILY,ARG,"LOVE"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '285-298',
        any: [/^\s*IF LOCAL:1 >= 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '287',
        any: [/^\s*CFLAG:\(LOCAL:1\):601 = 902\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '288',
        any: [/^\s*CFLAG:\(LOCAL:1\):602 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '292-297',
        any: [
          /^\s*TALENT:\(LOCAL:1\):320 \+= 20000\s*$\n^\s*ELSEIF LOCAL == 2\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '299-301',
        any: [/^\s*ELSE\s*$\n^\s*CALL NAME_LOVER,CFLAG:ARG:606,1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '303-321',
        any: [/^\s*CFLAG:CHARA:609 = CFLAG:\(ARG\):6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '306',
        any: [/^\s*CFLAG:CHARA:609 = CFLAG:\(ARG\):6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '307',
        any: [/^\s*CFLAG:\(ARG\):609 = CFLAG:CHARA:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '312',
        any: [/^\s*CFLAG:CHARA:601 = 901\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '314',
        any: [/^\s*CALL CHARA_ID_OUTPUT,ARG\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '314-315',
        any: [/^\s*CALL CHARA_ID_OUTPUT,ARG\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '319',
        any: [/^\s*CALL CHARA_ID_OUTPUT,CHARA\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '319-320',
        any: [/^\s*CALL CHARA_ID_OUTPUT,CHARA\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '322-326',
        any: [/^\s*CALL MONSTER_DATA, GROOM_NUM, 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '332-334',
        any: [/^\s*CFLAG:ARG:601 = GROOM_NUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '333-375',
        any: [/^\s*CFLAG:ARG:601 = GROOM_NUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '336-345',
        any: [/^\s*TALENT:ARG:320 \+= 20000\s*$\n^\s*ELSEIF LOCAL == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '337-339',
        any: [
          /^\s*LOCAL = TALENT:ARG:320 % 100000\s*$\n^\s*LOCAL \/= 10000\s*$\n^\s*IF LOCAL == 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '337-345',
        any: [/^\s*TALENT:ARG:320 \+= 20000\s*$\n^\s*ELSEIF LOCAL == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '341',
        any: [/^\s*TALENT:ARG:320 \+= 20000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '344',
        any: [/^\s*TALENT:ARG:320 \+= 20000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '347-379',
        any: [/^\s*CALL MARRIAGE_DOG\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '353-376',
        any: [/^\s*ELSEIF GROOM_TYPE == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '381-403',
        any: [
          /^\s*SIF GROOM_TYPE == 2 \|\| GROOM_TYPE == 3 \|\| GROOM_TYPE == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '381-417',
        any: [
          /^\s*SIF GROOM_TYPE == 2 \|\| GROOM_TYPE == 3 \|\| GROOM_TYPE == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '382',
        any: [
          /^\s*SIF GROOM_TYPE == 2 \|\| GROOM_TYPE == 3 \|\| GROOM_TYPE == 4\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '385-403',
        any: [/^\s*IF GROOM_TYPE == 1000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '387-389',
        any: [
          /^\s*IF \(TALENT:CHARA:122 == 0 && TALENT:CHARA:121 == 0\) && \(TALENT:ARG:122 == 0 && TALENT:ARG:121 == 0\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '390-392',
        any: [
          /^\s*ELSEIF \(TALENT:CHARA:122 \|\| TALENT:CHARA:121\) && TALENT:ARG:122 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '393-395',
        any: [/^\s*ELSEIF TALENT:CHARA:122 && TALENT:ARG:121\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '396-398',
        any: [/^\s*ELSEIF TALENT:CHARA:121 && TALENT:ARG:121\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '399-402',
        any: [
          /^\s*ELSEIF TALENT:CHARA:122 == 0 && TALENT:CHARA:0 && TALENT:ARG:122\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '405',
        any: [
          /^\s*IF TALENT:ARG:0 == 1 && EXP:ARG:0 == 0 && TALENT:ARG:273 == 0 && CFLAG:ARG:42 != 79 && VIRGIN_B < 4 && GROOM_TYPE != 1000\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '405-417',
        any: [
          /^\s*IF TALENT:ARG:0 == 1 && EXP:ARG:0 == 0 && TALENT:ARG:273 == 0 && CFLAG:ARG:42 != 79 && VIRGIN_B < 4 && GROOM_TYPE != 1000\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '406',
        any: [/^\s*PRINTW 【处女丧失】\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '407',
        any: [/^\s*TALENT:ARG:0 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '408-409',
        any: [/^\s*CFLAG:ARG:15 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '408-416',
        any: [/^\s*CFLAG:ARG:15 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '410-411',
        any: [/^\s*CFLAG:ARG:15 = 103\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '412-413',
        any: [/^\s*CFLAG:ARG:15 = 102\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '414-416',
        any: [/^\s*CFLAG:ARG:15 = 104\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '419-441',
        any: [/^\s*IF CFLAG:ARG:16 == -1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '420',
        any: [/^\s*PRINTW 【初吻】\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '421-439',
        any: [/^\s*CFLAG:ARG:16 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '422-423',
        any: [/^\s*CFLAG:ARG:16 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '423',
        any: [/^\s*CFLAG:ARG:16 = NO:MASTER \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '424',
        any: [/^\s*CSTR:ARG:4 = %SAVESTR:MASTER%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '426-429',
        any: [/^\s*IF CFLAG:MASTER:16 == -1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '427',
        any: [/^\s*CFLAG:MASTER:16 = NO:ARG \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '430-431',
        any: [/^\s*CFLAG:ARG:16 = 998\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '432-433',
        any: [/^\s*CFLAG:ARG:16 = 999\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '438-439',
        any: [/^\s*CFLAG:ARG:16 = 994\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '443-449',
        any: [
          /^\s*IF ABL:ARG:11 >= 5 && \(TALENT:ARG:293 \|\| TALENT:ARG:294\) && EXP:ARG:58 >= 300 && TALENT:ARG:159 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '443-451',
        any: [
          /^\s*IF ABL:ARG:11 >= 5 && \(TALENT:ARG:293 \|\| TALENT:ARG:294\) && EXP:ARG:58 >= 300 && TALENT:ARG:159 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '444-448',
        any: [
          /^\s*IF ABL:ARG:11 >= 5 && \(TALENT:ARG:293 \|\| TALENT:ARG:294\) && EXP:ARG:58 >= 300 && TALENT:ARG:159 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '447',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%得到了【%TALENTNAME:159%】\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '455-480',
        any: [/^\s*@MARRIAGE_DOG\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '476-480',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%眼泛泪光，在屈辱和绝望中颤抖着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '477',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%眼泛泪光，在屈辱和绝望中颤抖着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '484-491',
        any: [/^\s*@MARRIAGE_YOU\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '494-505',
        any: [/^\s*@MARRIAGE_LOVERS\(ARG\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '508-535',
        any: [/^\s*@ORC_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '508-867',
        any: [/^\s*@ORC_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '527',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%静静地处理着结婚事宜。\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '530',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%眼泛泪光，在屈辱和绝望中颤抖着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '538-565',
        any: [/^\s*@SLIME_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '557',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%静静地处理着结婚事宜。\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '560',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%眼泛泪光，在屈辱和绝望中颤抖着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '568-595',
        any: [/^\s*@INSECT_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '598-622',
        any: [/^\s*@IVY_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '625-652',
        any: [/^\s*@SYOKUSYU_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '655-682',
        any: [/^\s*@FAILY_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '685-713',
        any: [/^\s*@GIANT_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '716-748',
        any: [/^\s*@MAN_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '720-727',
        any: [/^\s*IF TALENT:ARG:141\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '751-783',
        any: [/^\s*@GIRL_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '755-762',
        any: [/^\s*IF TALENT:ARG:140\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '786-811',
        any: [/^\s*@BEAST_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '800-809',
        any: [
          /^\s*PRINTFORMW %SAVESTR:ARG%气息慌乱，舌尖滴着口水。完全作为一只母兽正在发情着。\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '814-837',
        any: [/^\s*@BRAIN_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '840-867',
        any: [/^\s*@HORSE_MARRIAGE\(ARG, GROOM_NUM\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '870-878',
        any: [/^\s*@SLAVE_MARRIAGE\(ARG,CHARA\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '881-902',
        any: [/^\s*@DIVORCE,ARG\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '884',
        any: [/^\s*CALL SEARCH_FAMILY,ARG,"MARRIAGE"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '884-888',
        any: [/^\s*IF RESULT > 0 && RESULT < CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '885',
        any: [/^\s*IF RESULT > 0 && RESULT < CHARANUM\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '886',
        any: [/^\s*CFLAG:RESULT:601 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '887',
        any: [/^\s*CFLAG:RESULT:609 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '889',
        any: [/^\s*CFLAG:\(ARG\):601 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '890',
        any: [/^\s*CFLAG:\(ARG\):609 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '891',
        any: [/^\s*PRINTFORMW %SAVESTR:ARG%离婚了。\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '892-899',
        any: [/^\s*IF LOCAL == 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '892-901',
        any: [/^\s*IF LOCAL == 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '895-897',
        any: [/^\s*IF LOCAL == 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '897',
        any: [/^\s*TALENT:ARG:320 -= 20000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '898-900',
        any: [/^\s*ELSEIF LOCAL == 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MARRIAGE.ERB',
        ref: '900',
        any: [/^\s*TALENT:ARG:320 -= 20000\s*$/m],
      },

      // 调用方 CHARA_INFO ver1.0.1.ERB 的调用点回显（本模块的接线锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1057',
        any: [/^\s*CALL MARRIAGE\(ARG\)\s*$/m],
      },
      // 调用方 CHARA_INFO ver1.0.1.ERB 的调用点回显（本模块的接线锚）
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB',
        ref: '1057',
        any: [/^\s*CALL MARRIAGE\(ARG\)\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
