// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #399（N15 段 3）：道具商店 @ITEM_SHOP 族（SHOP_ITEM.ERB 的九个函数）。
//
// 每条 ref 一对应一个函数的入口或一段判据：锚取自该段里的一条源行
// （含正文，非裸命令），行号漂了即红。全表由该 JS 文件的移植注释扫描生成
// （tools/trace-check.mjs 的源绑定解析 get_src_binding），覆盖文件里出现的每个 :N 引用。

export const FILES = [
  {
    js: 'ere/page/page-item-shop.js',
    refs: [
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '17-80',
        any: [new RegExp('^\\s*@ITEM_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '20',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '20-23',
        any: [new RegExp('^\\s*CUSTOMDRAWLINE =\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '21',
        any: [new RegExp('^\\s*PRINTL 黑市商人\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '22',
        any: [new RegExp('^\\s*PRINTL 《可以购买用于调教的物品》\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '24-30',
        any: [new RegExp('^\\s*PRINTV DAY\\+1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '27',
        any: [new RegExp('^\\s*PRINTL  午前\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '32',
        any: [
          new RegExp('^\\s*PRINTFORML \\[所持金:\\{MONEY\\}点\\]\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '34',
        any: [new RegExp('^\\s*DAY:1 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '34-37',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\[技巧Lv:\\{ABL:MASTER:12\\}\\]\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '39-48',
        any: [new RegExp('^\\s*FOR ICOUNT_A,0,24\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '42',
        any: [
          new RegExp(
            '^\\s*PRINTFORM \\[%ITEMNAME:ICOUNT_A,10,LEFT%\\]\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '44',
        any: [new RegExp('^\\s*IF RESULT == 999 && BOUGHT >= 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '49',
        any: [new RegExp('^\\s*SETCOLORBYNAME LightSalmon\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '49-51',
        any: [new RegExp('^\\s*PRINTL \\[消耗型调教道具一览\\]\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '53',
        any: [new RegExp('^\\s*FOR ICOUNT_A,24,36\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '53-64',
        any: [new RegExp('^\\s*FOR ICOUNT_A,24,36\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '56-57',
        any: [
          new RegExp('^\\s*SIF ICOUNT_A >= 29 && ICOUNT_A <= 31\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '58',
        any: [
          new RegExp(
            '^\\s*PRINTFORM \\[%ITEMNAME:ICOUNT_A \\+ @"\\(所持:\\{ITEM:ICOUNT_A\\}\\)",20,LEFT%\\]\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '60',
        any: [new RegExp('^\\s*;\tCALL SELECT_TARGET\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '63',
        any: [new RegExp('^\\s*PRINT_SHOPITEM\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '65',
        any: [new RegExp('^\\s*PRINTL 《请输入要购买陷阱的编号》\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '67',
        any: [new RegExp('^\\s*CALL SALEITEM_CHECK\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '69',
        any: [new RegExp('^\\s*TFLAG:15 = MONEY\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '71',
        any: [new RegExp('^\\s*\\$SELECT_ASSI_LOOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '73',
        any: [new RegExp('^\\s*PRINT_SHOPITEM\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '75-80',
        any: [new RegExp('^\\s*PRINTL 《请输入要购买的道具的编号》\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '77',
        any: [new RegExp('^\\s*ITEMSALES:60 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '78-79',
        any: [new RegExp('^\\s*PRINTLC \\[998\\] - 陷阱\\s*$', 'm')],
      },
      {
        // #562 订正：`:80` 是 SHOP_ITEM.ERB 的收尾 PRINTL（两个 PRINTLC 之后），
        // 不是 SHOP_TRAP 的 ITEMSALES（原绑定挂错了源）
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '80',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '85-248',
        any: [new RegExp('^\\s*@EVENTBUY\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '85-776',
        any: [new RegExp('^\\s*@EVENTBUY\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '89',
        any: [
          new RegExp(
            '^\\s*IF BOUGHT == 24 \\|\\| BOUGHT == 25 \\|\\| BOUGHT == 26 \\|\\| BOUGHT == 27 \\|\\| BOUGHT == 28 \\|\\| BOUGHT == 34 \\|\\| BOUGHT == 35 \\|\\| BOUGHT == 53 \\|\\| BOUGHT == 55 \\|\\| BOUGHT >= 60 && BOUGHT != 90\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '89-91',
        any: [
          new RegExp(
            '^\\s*IF BOUGHT == 24 \\|\\| BOUGHT == 25 \\|\\| BOUGHT == 26 \\|\\| BOUGHT == 27 \\|\\| BOUGHT == 28 \\|\\| BOUGHT == 34 \\|\\| BOUGHT == 35 \\|\\| BOUGHT == 53 \\|\\| BOUGHT == 55 \\|\\| BOUGHT >= 60 && BOUGHT != 90\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '93',
        any: [
          new RegExp(
            '^\\s*ELSEIF BOUGHT == 29 \\|\\| BOUGHT == 30 \\|\\| BOUGHT == 31 \\|\\| BOUGHT == 32 \\|\\| BOUGHT == 33 \\|\\| BOUGHT == 40 \\|\\| BOUGHT == 41\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '93-96',
        any: [
          new RegExp(
            '^\\s*ELSEIF BOUGHT == 29 \\|\\| BOUGHT == 30 \\|\\| BOUGHT == 31 \\|\\| BOUGHT == 32 \\|\\| BOUGHT == 33 \\|\\| BOUGHT == 40 \\|\\| BOUGHT == 41\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '95',
        any: [
          new RegExp(
            '^\\s*PRINTFORMW 育儿室中的%CALLNAME:MASTER%不能进行调教……\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '99',
        any: [new RegExp('^\\s*BEGIN TRAIN\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '99-113',
        any: [
          new RegExp('^\\s*PRINTFORML 确定购买%ITEMNAME:BOUGHT%？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '105-110',
        any: [new RegExp('^\\s*;淫魔知识\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_TRAP.ERB',
        ref: '115',
        any: [new RegExp('^\\s*;魔蟲知識でも手に入る罠\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '116-165',
        any: [new RegExp('^\\s*SIF BOUGHT == 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '164-165',
        any: [new RegExp('^\\s*SIF BOUGHT == 37\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '167-173',
        any: [new RegExp('^\\s*;素質アイテム・ラブダイナミックス\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '174-179',
        any: [new RegExp('^\\s*IF BOUGHT == 39\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '180-185',
        any: [new RegExp('^\\s*IF BOUGHT == 42\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '186-224',
        any: [new RegExp('^\\s*;素質アイテム【技巧LV】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '190-223',
        any: [new RegExp('^\\s*;IF FLAG:5 == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '227-234',
        any: [new RegExp('^\\s*;素質アイテム【淫魔知识】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '236-243',
        any: [new RegExp('^\\s*;素質アイテム【魔虫知识】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '246',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '253-400',
        any: [new RegExp('^\\s*@SALEITEM_CHECK\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '255-257',
        any: [new RegExp('^\\s*ITEMSALES:COUNT = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '259-262',
        any: [new RegExp('^\\s*;围裙、电极接头、拘束衣スーツ\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '264-280',
        any: [
          new RegExp(
            '^\\s*;营养剂は【调合知识所持】所持でEXTRAでのみ\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '267-269',
        any: [new RegExp('^\\s*IF TALENT:MASTER:55\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '270-277',
        any: [
          new RegExp('^\\s*PRINTL 请魔王大人选择将要调教的奴隶人选\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '273',
        any: [
          new RegExp(
            '^\\s*IF CFLAG:COUNT:1 >= 1 && ISASSI:COUNT == 1\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '278-280',
        any: [new RegExp('^\\s*ITEMSALES:30 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '282-285',
        any: [new RegExp('^\\s*;ビデオカメラ・搾乳器・肛珠\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '287-291',
        any: [new RegExp('^\\s*;もう持っている非消耗アイテムを消す\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '293-300',
        any: [new RegExp('^\\s*;消耗系アイテムを追加\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '294-297',
        any: [new RegExp('^\\s*ITEMSALES:24 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '298-300',
        any: [
          new RegExp('^\\s*;ビデオカメラがあればビデオテープを販売\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '302-309',
        any: [
          new RegExp(
            '^\\s*;主人か助手の誰かが【调合知识】を持っているなら\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '302-329',
        any: [
          new RegExp(
            '^\\s*;主人か助手の誰かが【调合知识】を持っているなら\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '304-309',
        any: [new RegExp('^\\s*ITEMSALES:29 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '311-313',
        any: [new RegExp('^\\s*IF TALENT:MASTER:55\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '314-321',
        any: [new RegExp('^\\s*REPEAT CHARANUM\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '317',
        any: [
          new RegExp(
            '^\\s*IF CFLAG:COUNT:1 >= 1 && ISASSI:COUNT == 1\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '322-329',
        any: [new RegExp('^\\s*ITEMSALES:26 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '335-352',
        any: [
          new RegExp(
            '^\\s*;主人か助手の誰かが【秘密知識】を持っているなら\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '337-352',
        any: [new RegExp('^\\s*ITEMSALES:33 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '342-349',
        any: [new RegExp('^\\s*SIF TALENT:COUNT:325\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '345',
        any: [
          new RegExp(
            '^\\s*IF CFLAG:COUNT:1 >= 1 && ISASSI:COUNT == 1\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '354-368',
        any: [
          new RegExp(
            '^\\s*;コンドーム、ローション、媚薬、利尿剤、ビデオテープ、ピアスリング、观战卷は99個まで\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '355-368',
        any: [new RegExp('^\\s*SIF ITEM:24 >= 99\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '370-373',
        any: [new RegExp('^\\s*;好感测定仪\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '376-382',
        any: [new RegExp('^\\s*;素質アイテム「ラブダイナミックス」\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '381',
        any: [new RegExp('^\\s*SIF FLAG:5 == 3 \\|\\| FLAG:5 == 4\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '384-387',
        any: [new RegExp('^\\s*ITEMSALES:39 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '389-392',
        any: [new RegExp('^\\s*ITEMSALES:42 = 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '394-398',
        any: [new RegExp('^\\s*;素質アイテム【技巧等级】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '397',
        any: [
          new RegExp(
            '^\\s*SIF ABL:MASTER:12 >= 10 \\|\\| ABL:MASTER:12 > FLAG:30 \\+ 1\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '399-400',
        any: [new RegExp('^\\s*;素質アイテム【经验值】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '404-582',
        any: [new RegExp('^\\s*@BUY_PLURAL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '407-408',
        any: [
          new RegExp(
            '^\\s*;现在の購入可能数、Bは所持可能最大数（现在100個）、Cは所持金によるもの\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '410-427',
        any: [new RegExp('^\\s*SIF BOUGHT == 24\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '410-436',
        any: [new RegExp('^\\s*SIF BOUGHT == 24\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '429-433',
        any: [new RegExp('^\\s*IF BOUGHT >= 60 && BOUGHT < 90\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '435-436',
        any: [new RegExp('^\\s*SIF BOUGHT == 91\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '447-448',
        any: [
          new RegExp(
            '^\\s*SIF BOUGHT == 55 && \\(FLAG:85\\+D > CFLAG:0:9\\)\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '450-463',
        any: [
          new RegExp(
            '^\\s*PRINTFORM 要买多少%ITEMNAME:BOUGHT%？ （1-\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '465',
        any: [new RegExp('^\\s*PRINTFORM  - 博物馆\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '467-472',
        any: [new RegExp('^\\s*MONEY \\+= A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '473-474',
        any: [new RegExp('^\\s*ELSEIF RESULT < 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '475-488',
        any: [new RegExp('^\\s*ELSEIF RESULT > D\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '481-487',
        any: [
          new RegExp(
            '^\\s*PRINTFORM 要购买多少%ITEMNAME:BOUGHT%？ （1-\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '489-492',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= A\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '493-499',
        any: [
          new RegExp(
            '^\\s*PRINTFORML 《购买了\\{RESULT\\}个%ITEMNAME:BOUGHT%》\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '501-543',
        any: [new RegExp('^\\s*IF BOUGHT == 53\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '505',
        any: [new RegExp('^\\s*E = RESULT \\* 10\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '507-508',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_MENU\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '510',
        any: [
          new RegExp('^\\s*PRINTFORML 要让谁使用%ITEMNAME:BOUGHT%？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '512',
        any: [new RegExp('^\\s*CALL LIFE_LIST\\(NO_PAGE,0\\)\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '514',
        any: [new RegExp('^\\s*PRINTLC \\[1000\\] - 上一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '515',
        any: [new RegExp('^\\s*PRINTLC \\[1001\\] - 下一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '520-525',
        any: [new RegExp('^\\s*IF RESULT == 1000\t\t;上一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '526-531',
        any: [new RegExp('^\\s*ELSEIF RESULT == 1001\t\t;下一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '533',
        any: [
          new RegExp('^\\s*SIF RESULT < 0 \\|\\| RESULT >= CHARANUM\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '533-534',
        any: [
          new RegExp('^\\s*SIF RESULT < 0 \\|\\| RESULT >= CHARANUM\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '535-538',
        any: [new RegExp('^\\s*IF CFLAG:RESULT:1 != 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '541-542',
        any: [new RegExp('^\\s*EXP:RESULT:80 \\+= E\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '545-546',
        any: [
          new RegExp('^\\s*SIF RESULT == 1000 \\|\\| RESULT == 1001\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '548-565',
        any: [new RegExp('^\\s*;素質アイテム【陷阱LV】\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '554-561',
        any: [new RegExp('^\\s*PRINTL \\*必须先提高魔王的等级！\\*\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '568-580',
        any: [new RegExp('^\\s*IF BOUGHT == 91\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '587-738',
        any: [new RegExp('^\\s*@USE_ITEM\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '588-591',
        any: [new RegExp('^\\s*#DIM NO_PAGE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '590',
        any: [new RegExp('^\\s*\\$INPUT_LOOP_MENU\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '592-604',
        any: [new RegExp('^\\s*;アイテムの効果を表示する\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '606',
        any: [
          new RegExp('^\\s*PRINTFORML 要让谁使用%ITEMNAME:BOUGHT%？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '606-607',
        any: [
          new RegExp('^\\s*PRINTFORML 要让谁使用%ITEMNAME:BOUGHT%？\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '608',
        any: [new RegExp('^\\s*CALL LIFE_LIST,NO_PAGE\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '610-612',
        any: [new RegExp('^\\s*PRINTLC \\[999\\] - 返  回\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '614',
        any: [new RegExp('^\\s*\\$INPUT_LOOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '614-615',
        any: [new RegExp('^\\s*\\$INPUT_LOOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '617-642',
        any: [new RegExp('^\\s*IF RESULT == 999\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '620-641',
        any: [new RegExp('^\\s*MONEY \\+= 500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '643-648',
        any: [new RegExp('^\\s*ELSEIF RESULT == 1000\t\t;上一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '649-654',
        any: [new RegExp('^\\s*ELSEIF RESULT == 1001\t\t;下一页\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '655-656',
        any: [
          new RegExp(
            '^\\s*ELSEIF RESULT < 0 \\|\\| RESULT >= CHARANUM\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '657-659',
        any: [new RegExp('^\\s*;主人公は排除,绑定当前魔王\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '660-662',
        any: [new RegExp('^\\s*;売却済み・臨死中のキャラは排除\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '663-667',
        any: [
          new RegExp('^\\s*;体力ＭＡＸのキャラにパワビタは使えない\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '668-672',
        any: [
          new RegExp(
            '^\\s*;否定点数を持ってないキャラに熏香は使えない\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '673-677',
        any: [
          new RegExp(
            '^\\s*;【爱慕】持ちかつ寿命持ちでないとWG电池は使えない\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '678-686',
        any: [
          new RegExp(
            '^\\s*;妊娠中・育儿中のキャラに排卵促進剤は使えない\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '692-738',
        any: [new RegExp('^\\s*;寄生回復\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '693-696',
        any: [new RegExp('^\\s*IF BOUGHT == 29\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '694',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= 500\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '696',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '698-704',
        any: [new RegExp('^\\s*ELSEIF BOUGHT == 30\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '699',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= 1000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '704',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '706-712',
        any: [new RegExp('^\\s*ELSEIF BOUGHT == 31\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '707',
        any: [new RegExp('^\\s*EX_FLAG:4444 -= 3000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '712',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '714-718',
        any: [new RegExp('^\\s*ELSEIF BOUGHT == 33\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '718',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '720-724',
        any: [new RegExp('^\\s*ELSEIF BOUGHT == 40\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '724',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '726-737',
        any: [new RegExp('^\\s*ELSEIF BOUGHT == 41\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '735',
        any: [new RegExp('^\\s*TALENT:RESULT:125 = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '737',
        any: [new RegExp('^\\s*WAIT\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '744-769',
        any: [new RegExp('^\\s*@TECHNIQUE_OF_MASTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '744-776',
        any: [new RegExp('^\\s*@TECHNIQUE_OF_MASTER\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '745-746',
        any: [new RegExp('^\\s*IF FLAG:33 == F - 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '749',
        any: [new RegExp('^\\s*PRINTL\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '757',
        any: [
          new RegExp('^\\s*IF MONEY < \\(F - FLAG:33\\) \\* 5000\\s*$', 'm'),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '760',
        any: [new RegExp('^\\s*MONEY -= \\(F - FLAG:33\\) \\* 5000\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '764-765',
        any: [new RegExp('^\\s*ELSEIF RESULT == 1\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '771-776',
        any: [new RegExp('^\\s*@TECHNIQUE_OF_MASTER_UP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '774',
        any: [new RegExp('^\\s*ITEM:BOUGHT = 0\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '781-786',
        any: [new RegExp('^\\s*@CLEAR_SHOP\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '784',
        any: [new RegExp('^\\s*REPEAT 300\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '791-810',
        any: [new RegExp('^\\s*@ITEM_DETOX,ARG\\s*$', 'm')],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '456-460',
        any: [
          new RegExp(
            '^\\s*;\u5168\u8ca1\u7523\u306e\u534a\u5206\u3092\u8cbb\u3084\u3059\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP_ITEM.ERB',
        ref: '485-487',
        any: [
          new RegExp(
            '^\\s*PRINTFORM \\[0\\] - \\[1\\] - \\[5\\] - \\[10\\] - \\[20\\] - \\[\\s*$',
            'm',
          ),
        ],
      },
      {
        src: 'target/ERB/SHOP/SHOP ver1.0.2.ERB',
        ref: '495',
        any: [
          new RegExp(
            '^\\s*PRINTFORML \\{ITEM:LOCAL,2,LEFT\\}\u53ea%MONSTERNAME\\(LOCAL\\)%\\s*$',
            'm',
          ),
        ],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
