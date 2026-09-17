// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #399（N15 段 3）：怪物商店 @MONSTER_SHOP 族（SHOP_MONSTER.ERB 四个函数）与 @SELECT_CHARA/@BUY_CHARA 的同形复用。
//
// 每条 ref 一对应一个函数的入口或一段判据：锚取自该段里的一条源行
// （含正文，非裸命令），行号漂了即红。全表由该 JS 文件的移植注释扫描生成
// （tools/trace-check.mjs 的 scan_erb_refs），覆盖文件里出现的每个 :N 引用。

export const FILES = [
  {
    js: 'ere/page/page-monster-shop.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '16-18',
        any: [new RegExp('^\\s*;アイテム購入・売却処理画面\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '18-173',
        any: [new RegExp('^\\s*@MONSTER_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '21-23',
        any: [new RegExp('^\\s*;A=キャラクター用暫定変数値\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '27-29',
        any: [new RegExp('^\\s*TFLAG:100 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '30-37',
        any: [new RegExp('^\\s*PRINTL \\[1\\]召唤魔物从者\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '32-35',
        any: [new RegExp('^\\s*\\[IF DEBUG\\]\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '40',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '48-62',
        any: [new RegExp('^\\s*\\$MONSTER_SHOP_TAG\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '52',
        any: [new RegExp('^\\s*SIF TALENT:COUNT:220\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '55',
        any: [new RegExp('^\\s*IF COUNT:1 >= 30\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '57',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '58',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '66-88',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_SEX\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '68',
        any: [new RegExp('^\\s*SIF SEXCOIN == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '70',
        any: [new RegExp('^\\s*PRINTL 请选择要召唤的魔物从者的性别\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '70-72',
        any: [new RegExp('^\\s*PRINTL 请选择要召唤的魔物从者的性别\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '71',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[1\\]男性　　　　\\[2\\]女性　　　\\[3\\]扶她\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '73',
        any: [new RegExp('^\\s*CALL CHAR_MAKE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '78',
        any: [new RegExp('^\\s*SIF CFLAG:A:151 < -100\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '81',
        any: [new RegExp('^\\s*ELSEIF RESULT > 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '81-83',
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
        ref: '86-87',
        any: [
          new RegExp('^\\s*PRINTFORML 确定要召唤%SAVESTR:A%么？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '91-117',
        any: [
          new RegExp(
            '^\\s*;怪物种族、种族2をそれ単体で用意していないので直接打ち込み。\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '93',
        any: [new RegExp('^\\s*CALL SHOW_SHOP_MONSTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '97-99',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[1\\]兽人类　　　　\\[2\\]史莱姆类　　　\\[3\\]昆虫类\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '97',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[1\\]兽人类　　　　\\[2\\]史莱姆类　　　\\[3\\]昆虫类\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '97-100',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[1\\]兽人类　　　　\\[2\\]史莱姆类　　　\\[3\\]昆虫类\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '98',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[4\\]植物类　　　　\\[5\\]触手类　　　　\\[6\\]妖精类\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '99',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[7\\]巨人类　　　　\\[8\\]魔人类　　　　\\[9\\]魔兽类\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '101',
        any: [new RegExp('^\\s*PRINTFORML \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '102',
        any: [new RegExp('^\\s*PRINTL 　请选择魔物从者的种类\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '107',
        any: [new RegExp('^\\s*CALL CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '110',
        any: [new RegExp('^\\s*ELSEIF RESULT > 9\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '110-112',
        any: [new RegExp('^\\s*ELSEIF RESULT > 9\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '111',
        any: [new RegExp('^\\s*CLEARLINE 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '114-116',
        any: [new RegExp('^\\s*CALL SELECT_MONSTER, RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '119-171',
        any: [new RegExp('^\\s*\\$ADD_CHARA\\s*$', 'm')],
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
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '122',
        any: [new RegExp('^\\s*ADDCHARA CHARA\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '123',
        any: [new RegExp('^\\s*CALL ADDCHARA_EX, CHARANUM-1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '124',
        any: [new RegExp('^\\s*CFLAG:A:999 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '126-127',
        any: [new RegExp('^\\s*SIF SEXCOIN == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '128-129',
        any: [new RegExp('^\\s*SIF SEXCOIN == 3\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '131-132',
        any: [new RegExp('^\\s*CALL CHAR_MAKE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '133',
        any: [new RegExp('^\\s*CFLAG:A:1 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '135-137',
        any: [new RegExp('^\\s*;善良値調整、念のため\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '140',
        any: [
          new RegExp(
            '^\\s*PRINTL 《需要勋章经验来激活次元大门，并支付一定金钱来召唤异次元的勇者》\\s*$',
            'm',
          ),
        ],
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
        ref: '142',
        any: [new RegExp('^\\s*PRINTV DAY\\+1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '143',
        any: [new RegExp('^\\s*PRINTW\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '144',
        any: [new RegExp('^\\s*CALL SHOW_CHARA_INFO, A, -2\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '146',
        any: [
          new RegExp('^\\s*PRINTFORML 确定要召唤%SAVESTR:A%么？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '147',
        any: [new RegExp('^\\s*PRINTL  午后\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '148',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '149-155',
        any: [new RegExp('^\\s*PRINT \\[0\\] 就是\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '159-170',
        any: [new RegExp('^\\s*IF MONEY <= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '161-162',
        any: [new RegExp('^\\s*PRINTFORML 金钱不够！\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '164',
        any: [new RegExp('^\\s*CALL PARTY_CHAR_DEL, A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '165',
        any: [new RegExp('^\\s*DELCHARA A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '166',
        any: [new RegExp('^\\s*MONEY -= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '167',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= 1500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '168',
        any: [new RegExp('^\\s*CALL NAME_RESET\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '172-173',
        any: [new RegExp('^\\s*TFLAG:100 = 8\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '173',
        any: [new RegExp('^\\s*TFLAG:101 = 9\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '178-196',
        any: [new RegExp('^\\s*@SHOW_SHOP_MONSTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '183',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '183-186',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '187-193',
        any: [new RegExp('^\\s*PRINTV DAY\\+1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '195',
        any: [new RegExp('^\\s*PRINTFORML 所持金：\\{MONEY\\}点\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '195-196',
        any: [new RegExp('^\\s*PRINTFORML 所持金：\\{MONEY\\}点\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '200-285',
        any: [new RegExp('^\\s*@SELECT_MONSTER, ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '206',
        any: [new RegExp('^\\s*VARSET LOCAL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '209-224',
        any: [new RegExp('^\\s*SELECTCASE ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '216-224',
        any: [new RegExp('^\\s*CASE 8\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '222-223',
        any: [new RegExp('^\\s*CASEELSE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '228',
        any: [new RegExp('^\\s*CALL SHOW_SHOP_MONSTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '228-230',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 需要献祭一定数量的怪物以符合其合计等级的要求，作为祭品的怪物还需满足最低等级才能作为祭品，\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '230',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 还需要支付最低等级＊１３５的金钱来召唤精英魔物从者\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '232',
        any: [new RegExp('^\\s*FOR LCOUNT, 201, 280\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '232-247',
        any: [new RegExp('^\\s*FOR LCOUNT, 201, 280\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '237',
        any: [
          new RegExp(
            '^\\s*IF CSVTALENT\\(LCOUNT,319,0\\) == TFLAG:100 \\|\\| CSVTALENT\\(LCOUNT,319,0\\) == TFLAG:101\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '238',
        any: [
          new RegExp(
            '^\\s*PRINTFORMLC %"\\["\\+TOSTR\\(LCOUNT,"000"\\)\\+"\\]"% %ITEMNAME:LCOUNT,22,LEFT% 最低等级：%TOSTR\\(ITEMPRICE:LCOUNT\\),5,RIGHT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '238-249',
        any: [
          new RegExp(
            '^\\s*PRINTFORMLC %"\\["\\+TOSTR\\(LCOUNT,"000"\\)\\+"\\]"% %ITEMNAME:LCOUNT,22,LEFT% 最低等级：%TOSTR\\(ITEMPRICE:LCOUNT\\),5,RIGHT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '240',
        any: [new RegExp('^\\s*ITEMSALES:LCOUNT = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '246-247',
        any: [new RegExp('^\\s*SIF LOCAL%2\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '250',
        any: [new RegExp('^\\s*PRINTFORML \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '251-255',
        any: [new RegExp('^\\s*PRINTL 没有能召唤的魔物从者\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '258-259',
        any: [new RegExp('^\\s*IF RESULT == 999\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '260-265',
        any: [
          new RegExp(
            '^\\s*;数値はキャラのアイテム番号の最小値と最大値。\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '261-265',
        any: [
          new RegExp('^\\s*ELSEIF RESULT <= 200 \\|\\| RESULT > 280\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '266-274',
        any: [new RegExp('^\\s*;売値が所持金より多いなら再入力\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '267',
        any: [
          new RegExp(
            '^\\s*ELSEIF MONEY < \\(ITEMPRICE:RESULT \\* 135\\)\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '271',
        any: [
          new RegExp(
            '^\\s*ELSEIF MONEY < \\(ITEMPRICE:RESULT \\* 135\\) && TALENT:A:122\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '278',
        any: [new RegExp('^\\s*TFLAG:102 = RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '282-283',
        any: [new RegExp('^\\s*SIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '282-285',
        any: [new RegExp('^\\s*SIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '283',
        any: [new RegExp('^\\s*GOTO INPUT_LOOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '288-410',
        any: [new RegExp('^\\s*@BUY_MONSTER, ARG:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '301-309',
        any: [new RegExp('^\\s*CALL MONSTER_DATA, LCOUNT, 5\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '303',
        any: [
          new RegExp(
            '^\\s*IF \\(E:507 == TFLAG:100 \\|\\| E:507 == TFLAG:101\\) && ITEM:LCOUNT > 0\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '311-318',
        any: [new RegExp('^\\s*;怪物が足りない場合の処理\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '321-322',
        any: [
          new RegExp(
            '^\\s*;LOCAL:1に生贄に捧げた怪物のレベルの合計を保存\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '326',
        any: [new RegExp('^\\s*CALL SHOW_SHOP_MONSTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '328-341',
        any: [
          new RegExp(
            '^\\s*IF ITEMPRICE:\\(TFLAG:102\\) - LOCAL:1 <= 0\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '329-338',
        any: [
          new RegExp(
            '^\\s*PRINTFORM %"\\["\\+TOSTR\\(LCOUNT,"000"\\)\\+"\\]"% %ITEMNAME:LCOUNT,20,LEFT% LV:\\{MONS:LCOUNT:0\\} %TOSTR\\(MONS:LCOUNT:1\\),5,RIGHT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '330',
        any: [
          new RegExp(
            '^\\s*PRINTFORM %"\\["\\+TOSTR\\(LCOUNT,"000"\\)\\+"\\]"% %ITEMNAME:LCOUNT,20,LEFT% LV:\\{MONS:LCOUNT:0\\} %TOSTR\\(MONS:LCOUNT:1\\),5,RIGHT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '334',
        any: [
          new RegExp(
            '^\\s*PRINTFORMLC %ITEMNAME:LCOUNT,22,LEFT% LV:\\{MONS:LCOUNT:0\\} %TOSTR\\(MONS:LCOUNT:2\\),7,RIGHT%只\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '337-338',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '341',
        any: [new RegExp('^\\s*PRINTFORML 合计等级：\\{LOCAL:1\\}\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '341-342',
        any: [new RegExp('^\\s*PRINTFORML 合计等级：\\{LOCAL:1\\}\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '343',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 要以这些怪物为代价，加上\\{ITEMPRICE:\\(TFLAG:102\\) \\* 135\\}点金钱，来召唤%ITEMNAME:\\(TFLAG:102\\)%吗？\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '344',
        any: [new RegExp('^\\s*PRINTL \\[0\\] 好的  \\[1\\] 不要\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '346-347',
        any: [new RegExp('^\\s*IF RESULT == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '348-356',
        any: [new RegExp('^\\s*ELSEIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '358-391',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 请选择满足最低等级要求的怪物作为祭品\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '362',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 剩余等级：\\{ITEMPRICE:\\(TFLAG:102\\) - LOCAL:1\\}\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '363-372',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 强行从异世界召唤魔王想要召唤的人\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '375',
        any: [new RegExp('^\\s*PRINTFORML 合计等级：\\{LOCAL:1\\}\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '376',
        any: [new RegExp('^\\s*SIF A > 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '381',
        any: [
          new RegExp(
            '^\\s*PRINTFORM %"\\["\\+TOSTR\\(LCOUNT,"000"\\)\\+"\\]"% %ITEMNAME:LCOUNT,20,LEFT% LV:\\{MONS:LCOUNT:0\\} %TOSTR\\(MONS:LCOUNT:1\\),5,RIGHT%\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '381-382',
        any: [
          new RegExp(
            '^\\s*PRINTFORM - %TOSTR\\(MONS:LCOUNT:2\\)% 只\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '387-388',
        any: [new RegExp('^\\s*SIF !LINEISEMPTY\\(\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '389',
        any: [new RegExp('^\\s*PRINT \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '390',
        any: [new RegExp('^\\s*PRINTFORML \\[999\\] 返回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '391',
        any: [new RegExp('^\\s*PRINTFORML\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_CHARA.ERB',
        ref: '397-398',
        any: [new RegExp('^\\s*L_I = RESULT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '399-400',
        any: [
          new RegExp('^\\s*ELSEIF RESULT < 100 \\|\\| RESULT >= 200\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '401-402',
        any: [new RegExp('^\\s*ELSEIF MONS:RESULT:0 == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '403-405',
        any: [
          new RegExp('^\\s*ELSEIF MONS:RESULT:1 == MONS:RESULT:2\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '408',
        any: [new RegExp('^\\s*MONS:RESULT:2 \\+= 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '409',
        any: [new RegExp('^\\s*LOCAL:1 \\+= MONS:RESULT:0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '42-46',
        any: [new RegExp('^\\s*ELSEIF RESULT == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '48',
        any: [new RegExp('^\\s*\\$MONSTER_SHOP_TAG\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '345-357',
        any: [new RegExp('^\\s*ELSEIF RESULT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_MONSTER.ERB',
        ref: '394',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_1\\s*$', 'm')],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
