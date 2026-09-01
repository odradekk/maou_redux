// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-ravish-man.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-dungeon-ravish-man.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1-399',
        any: [/@ORC_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '401-470',
        any: [/@SLIME_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '471-494',
        any: [/@INSECT_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '495-519',
        any: [/@IVY_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '520-557',
        any: [/@SYOKUSYU_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '558-586',
        any: [/@FAILY_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '587-709',
        any: [/@GIANT_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '710-902',
        any: [/@MAN_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '903-959',
        any: [/@BEAST_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '960-1014',
        any: [/@BRAIN_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1015-1069',
        any: [/@HORSE_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '77-156',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '862',
        any: [/Y \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '868',
        any: [/Y \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '22',
        any: [/PRINTFORM 无头骑士的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '26',
        any: [/IF TALENT:ARG:种族 == 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '166',
        any: [/ELSEIF TALENT:ARG:魅力点 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1',
        any: [/@ORC_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '5-11',
        any: [/IF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '7-10',
        any: [/PRINTDATAW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '13-19',
        any: [/IF TALENT:ARG:52/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '15',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的娼妓嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '16',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '17',
        any: [
          /PRINTFORMW 兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '18',
        any: [/MON_NUM \*= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '24',
        any: [/PRINTFORM %SAVESTR:ARG%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '27',
        any: [/PRINTFORM 身体被固定住了，只剩下脑袋来像飞机杯似的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '29',
        any: [/PRINTFORM 全裸地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '31',
        any: [/PRINTFORMW 侍奉着兽人们的阴茎。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '32',
        any: [
          /PRINTFORMW 只要喝掉所有\{MON_NUM\}只兽人的精液的话，它们就答应不侵犯他的下体………/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '34-50',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '38',
        any: [/PRINTFORM 毫无犹豫、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '41',
        any: [/PRINTFORM 小心翼翼地、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '44',
        any: [/PRINTFORM 一边土下座扭着腰部的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '47',
        any: [/PRINTFORM 期待与羞耻将脸染红的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '49',
        any: [/PRINTFORM 面露期待的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '51-67',
        any: [/ELSEIF CFLAG:ARG:131 > 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '55',
        any: [/PRINTFORM 老实遵从于兽人的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '58',
        any: [/PRINTFORM 煞有其事地、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '61',
        any: [/PRINTFORM 不住向阴茎献媚的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '64',
        any: [/PRINTFORM 面对阴茎羞红了脸的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '66',
        any: [/PRINTFORM 已然无法反抗的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '68-88',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '69-73',
        any: [/IF TALENT:ARG:11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '71',
        any: [/PRINTFORM 带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '72',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '73',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '74-78',
        any: [/ELSEIF TALENT:ARG:13/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '76',
        any: [
          /PRINTFORM 迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '77',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '78',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '81',
        any: [/PRINTFORM 提心吊胆地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '84',
        any: [/PRINTFORM 嘿嘿媚笑着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '87',
        any: [/PRINTFORM 不敢直视肉棒而闭上了眼睛/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '91',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '93-99',
        any: [/PRINTDATA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '94-98',
        any: [/DATAFORM 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '101',
        any: [/PRINT 含了下去，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '103-109',
        any: [/IF TALENT:ARG:52/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '105',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的娼妓嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '106',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '107',
        any: [
          /PRINTFORMW 兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '109',
        any: [/MON_NUM \*= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '112',
        any: [/PRINTFORM 像工作一样地奉仕着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '115',
        any: [/PRINTFORM 不禁发出了粗俗的声音，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '118',
        any: [/PRINTFORM 很快地抓住了奉仕的诀窍，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '121',
        any: [/PRINTFORM 忍受着腥臭味，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '124',
        any: [/PRINTFORM 拼命地用舌头奉仕着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '127',
        any: [/PRINTL 奉仕持续了下去……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '129',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '130',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '131',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '132',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '134-136',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '135',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '138-256',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '142-146',
        any: [/PRINTDATAW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '143-145',
        any: [/DATAFORM 『兄弟们，把所有的穴都塞满哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '148',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被\{MON_NUM\}只兽人用积存已久的精液，将嘴巴、肛门……所有能用的穴/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '149',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '150',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的脸和性器都用精液化上了妆。兽人们看着他这样子，开怀大笑。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '152',
        any: [/PRINT 兽人的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '154-160',
        any: [/PRINTDATA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '155-159',
        any: [/DATAFORM 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '162',
        any: [
          /PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出来的精液在%SAVESTR:ARG%的/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '165',
        any: [/PRINT 眼镜上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '167',
        any: [/PRINT 可爱的眼睛上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '169',
        any: [/PRINT 漂亮的鼻子里喷了出来……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '171',
        any: [/PRINT 光鲜亮丽的头发上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '173',
        any: [/PRINT 脸上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '175',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '176-181',
        any: [/IF TALENT:ARG:12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '178',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '179',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '180',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '181',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '183-189',
        any: [/ELSEIF TALENT:ARG:70 \|\| TALENT:ARG:73/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '185',
        any: [/PRINTFORMW 在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '186',
        any: [/PRINTFORMW 『喔！这家伙有感觉了哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '187',
        any: [/PRINTFORMW %SAVESTR:ARG%被快感冲击着，忍不住主动扭着腰。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '188',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '189',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '192',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '197',
        any: [/PRINTW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '198',
        any: [/PRINTFORM 兽人们把润滑液涂在了%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '201',
        any: [/PRINT 漂亮的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '203',
        any: [/PRINT 漂亮的屁股的缝隙中的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '205',
        any: [/PRINT 大的屁股的缝隙中的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '207',
        any: [/PRINT 无毛额/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '209',
        any: [/PRINT 肌肉明显的两腿间的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '211',
        any: [/PRINT 从阴阜到肛门都被茂密的阴毛所覆盖的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '213',
        any: [/PRINT 长着茂盛的阴毛的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '216',
        any: [/PRINTL 性器和肛门上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '217',
        any: [/PRINTFORM 在%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '221',
        any: [/PRINT 魁梧的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '224',
        any: [/PRINT 娇小的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '227',
        any: [/PRINT 松松垮垮的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '230',
        any: [/PRINT 紧致的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '233',
        any: [/PRINT 窈窕的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '235',
        any: [/PRINT 纤细的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '237',
        any: [/PRINT 肉感的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '239',
        any: [/PRINT 身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '242',
        any: [/PRINTL 像要挤爆他似的激烈地持续侵犯着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '244',
        any: [
          /PRINTW 他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '246',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '247',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '248',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '249',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '250',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '251',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '252',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '253',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '255-256',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '256',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '258-340',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '262-266',
        any: [/PRINTDATAW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '263-265',
        any: [
          /DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '268',
        any: [/PRINTFORM %SAVESTR:ARG%全裸地四肢着地趴在地下、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '272',
        any: [/PRINT 浑身颤抖着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '275',
        any: [/PRINT 怒目圆睁着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '278',
        any: [/PRINT 拼命服从着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '281',
        any: [/PRINT 拼命献媚着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '284',
        any: [/PRINT 羞红了脸、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '287',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '289',
        any: [
          /PRINTFORMW \{MON_NUM\}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '291-297',
        any: [/IF ABL:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '293',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上述行为。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '294',
        any: [/PRINTFORMW 好像因为被视奸，而有了感觉。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '295',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '296',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '299-306',
        any: [/IF ABL:ARG:21/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '301',
        any: [/PRINTFORMW %SAVESTR:ARG%好像因为被骂而有了感觉。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '302',
        any: [/PRINTFORMW 『明明就是母猪，还说自己是冒险者！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '303',
        any: [/PRINTFORMW %SAVESTR:ARG%连眼神都湿润了～/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '304',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '305',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '308',
        any: [/PRINTFORM 『猪/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '309-312',
        any: [/IF TALENT:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '312',
        any: [/CALL GOBI_KOUJO, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '313-316',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '315',
        any: [/CALL GOBI_KOUJO, 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '317',
        any: [/PRINTFORM 还自称冒险者……简直傻了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '319-326',
        any: [/IF TALENT:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '322',
        any: [/CALL GOBI_KOUJO, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '325',
        any: [/CALL GOBI_KOUJO, 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '328',
        any: [/PRINTFORMW 　噗噗，噗嘻！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '330-335',
        any: [/IF TALENT:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '332',
        any: [/PRINTFORMW %SAVESTR:ARG%抛弃了自尊心，拼命地求饶着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '333',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '334',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '337',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '338',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '339',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '340',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '341-369',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '342',
        any: [/PRINTW 『来试试，看能放多粗的东西进去？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '343',
        any: [/PRINTFORMW %SAVESTR:ARG%感受到了自己身上的危机，拼命地哀求着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '344',
        any: [
          /PRINTFORMW 不过，他的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '345',
        any: [
          /PRINTFORMW 其中一只兽人，拿起他的心爱的武器用柄的那端捅入他的後穴。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '346',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的喊叫声，回响在\{MON_NUM\}只兽人的耳边。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '348-354',
        any: [/IF TALENT:ARG:40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '350',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '351',
        any: [/PRINTFORMW %SAVESTR:ARG%受不了痛楚，高声哭喊着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '352',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '353',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '356-362',
        any: [/IF ABL:ARG:21/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '358',
        any: [/PRINTFORMW %SAVESTR:ARG%在痛楚中感到了愉悦。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '359',
        any: [
          /PRINTFORMW 难道自己是个潜在的性变态？这么想着，%SAVESTR:ARG%对自身的反应感到害怕。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '360',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '361',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '364',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '365',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '366',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '367',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '368',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '369',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '370-396',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '371',
        any: [/PRINTW 『抬起屁股！然后说：请用！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '372',
        any: [
          /PRINTFORMW %SAVESTR:ARG%用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '373',
        any: [
          /PRINTFORMW 他完全被淹没在\{MON_NUM\}只兽人之中，兽人们大笑着，轮流侵犯他的嘴巴和肛门。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '374',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '376-382',
        any: [/IF TALENT:ARG:70 \|\| TALENT:ARG:73/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '378',
        any: [
          /PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的前端里渐渐滴出了体液。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '379',
        any: [/PRINTFORMW 『别这么快就去了啊！老子都不知道操哭多少人了。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '380',
        any: [/PRINTFORMW %SAVESTR:ARG%呼出了炽热的气息，双腿直抖着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '381',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '382',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '384-387',
        any: [/ELSEIF TALENT:ARG:11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '386',
        any: [/PRINTFORMW 『喂！把腰抬起来！还没完呢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '387',
        any: [/PRINTFORMW %SAVESTR:ARG%用冰冷的目光瞪了兽人们一眼。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '390',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '391',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '392',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '393',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '394',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '395',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '397',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '398',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '401',
        any: [/@SLIME_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '406-414',
        any: [/IF RAND:6 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '407',
        any: [/PRINTFORMW 黏液侵犯着%SAVESTR:ARG%的嘴巴和肛门，并灌入了黏液。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '408',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '409',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '410',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '411',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '412',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '413',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '416-422',
        any: [/ELSEIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '417',
        any: [/PRINTW 黏液杀到了冒险者的嘴巴里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '418',
        any: [
          /PRINTFORMW %SAVESTR:ARG%感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了他/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '419',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '420',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '421',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '422',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '423-443',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '424',
        any: [/PRINTW 黏液杀到了冒险者的肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '425',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '428',
        any: [
          /PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐快感之中……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '431',
        any: [/PRINTFORMW %SAVESTR:ARG%已然被粘液攻陷了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '434',
        any: [/PRINTFORMW %SAVESTR:ARG%开始习惯被粘液涌入的感觉……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '436',
        any: [/PRINTW 冒险者在肛虐的痛苦中癫狂地惨叫着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '438',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '439',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '440',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '441',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '442',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '443',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '444-450',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '445',
        any: [/PRINTW 被全裸地四脚着地压在地上，黏液逆流到肛门里了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '446',
        any: [
          /PRINTFORMW %SAVESTR:ARG%腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '447',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '448',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '449',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '450',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '451-460',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '452',
        any: [
          /PRINTW 黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '453',
        any: [/PRINTFORMW %SAVESTR:ARG%坚强地试图站起来。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '454',
        any: [
          /PRINTFORMW 但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '455',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '456',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '457',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '458',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '459',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '460',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '461-466',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '462',
        any: [/PRINTW 冒险者被包在黏液里，只露出头部发出呜呜的呻吟。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '463',
        any: [/PRINTFORMW 看来没人相救的话，%SAVESTR:ARG%要被消化在黏液里了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '465',
        any: [
          /PRINTFORMW 黏液的麻痹成分，渐渐把%SAVESTR:ARG%遭受凌辱的苦痛身体治愈了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '466',
        any: [/BASE:ARG:0 \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '468',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '469',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '471',
        any: [/@INSECT_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '476-482',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '477',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '478',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被输卵管插入了，被播下了卵。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '479',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '480',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '481',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '482',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '484-490',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '485',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '486',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被输卵管插入了，被播下了卵。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '487',
        any: [/PRINTW 不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '488',
        any: [
          /PRINTFORMW \{MON_NUM\}只节肢动物轮流扑在%SAVESTR:ARG%身上，从臀部到背部全被卵覆盖了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '489',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '490',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '492',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '493',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '495',
        any: [/@IVY_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '499-505',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '500',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '501',
        any: [
          /PRINTFORMW %SAVESTR:ARG%呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '502',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '503',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '504',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '505',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '506-515',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '507',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '508',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被蹂躏着，发出了喊破喉咙的惨叫声。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '509',
        any: [/PRINTW 藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '510',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '511',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '512',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '513',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '514',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '515',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '517',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '518',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '520',
        any: [/@SYOKUSYU_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '525-529',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '526',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '527',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的喉咙被大量的体液灌入，呛到了。不久，他的意识开始模糊了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '528',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '529',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '530-537',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '531',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '532',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，他的意识开始模糊了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '533',
        any: [/PRINTW 不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '534',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '535',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '536',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '537',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '538-545',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '539',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '540',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的嘴巴也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '541',
        any: [
          /PRINTFORMW ……不久，地上滴落的液体里，开始出现了触手体液之外的东西。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '542',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '543',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '544',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '545',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '546-553',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '547',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '548',
        any: [
          /PRINTFORMW %SAVESTR:ARG%带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '549',
        any: [/PRINTFORMW 不久之后他感到乳房发胀，触手顺势开始了榨乳。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '550',
        any: [
          /PRINTFORMW 不久之后，%SAVESTR:ARG%母乳开始无法抑制地从乳头喷出。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '551',
        any: [/PRINTFORML 喷奶经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '552',
        any: [/EXP:ARG:54 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '554',
        any: [/PRINTFORMW 触手经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '555',
        any: [/EXP:ARG:55 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '556',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '558',
        any: [/@FAILY_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '563-573',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '564',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '565',
        any: [/PRINTFORMW 妖精拿出了一根和自己身高相等的假阳具。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '566',
        any: [/PRINTFORMW 『小哥哥来享受这边的穴吧！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '567',
        any: [/PRINTFORMW %SAVESTR:ARG%的惨叫回响在洞窟里……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '568',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '569',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '570',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '571',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '572',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '573',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '574-582',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '575',
        any: [/PRINTW 『小哥哥的里面，是什么模样呢？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '576',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的後处被妖精钻入了。妖精对他的反应感到相当有趣，不断地玩弄着後处内的皱褶/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '577',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '578',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '579',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '580',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '581',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '582',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '584',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '585',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '587',
        any: [/@GIANT_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '591-619',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '592-599',
        any: [/;隷属状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '594-598',
        any: [/DATAFORM 『瓦全的　变成了　灰机杯了呀』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '600-610',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '604-609',
        any: [/DATAFORM 『哈哈　熟络起来了欸』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '611-618',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '613-617',
        any: [/DATAFORM 『看起来值得凌辱一番。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '623-636',
        any: [/IF MON_NUM == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '624',
        any: [/PRINTL 『喝下去哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '625',
        any: [
          /PRINTFORML %SAVESTR:ARG%侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '626',
        any: [/PRINTL 绝顶了的巨人，把精液从头到脚浇了他一身。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '627',
        any: [/PRINTL 口交经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '628',
        any: [/PRINTL 精液经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '629',
        any: [/EXP:ARG:22 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '630',
        any: [/EXP:ARG:20 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '632-633',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '633',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '634',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '635',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '639-657',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '640',
        any: [/PRINTW 『快点啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '641',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地舔舐着巨人的阴茎。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '642',
        any: [/PRINTW 他拼命地哀求着，请饶了他，不然一定会被玩坏。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '643',
        any: [
          /PRINTFORMW 必须快点搞定这\{MON_NUM\}只巨人，不然不知道他们什么时候会改变主意。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '645-651',
        any: [/IF TALENT:ARG:52/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '647',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '648',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '649',
        any: [
          /PRINTFORMW 巨人被他灵活的舌头弄射了，精液像喷泉一样，从%SAVESTR:ARG%的头顶淋到脚底。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '650',
        any: [/MON_NUM \*= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '653',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '654',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '655',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '656',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '658-659',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '659',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '660-683',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '661',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '662',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让他声嘶力竭地惨叫着，晕了过去。肛/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '663',
        any: [/PRINTFORMW 『又一个坏掉了吗？用点回复药或许可以再来几下。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '664',
        any: [
          /PRINTFORMW 插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有\{MON_NUM\}只巨人为止……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '666-674',
        any: [/IF TALENT:ARG:34/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '668',
        any: [
          /PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地抓了回来。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '669',
        any: [/PRINTFORMW 『喂！这里有个想逃跑的！抓住他！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '670',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '671',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '672',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '676',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '677',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '678',
        any: [/PRINTFORML 肛门扩张经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '679',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '680',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '681',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '682',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '683',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '684-705',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '685',
        any: [/PRINTW 『我想到好主意了』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '686',
        any: [
          /PRINTFORMW 巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '687',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '688',
        any: [/PRINTFORMW 巨人端着一大盆精液，对他说，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '689',
        any: [/PRINTFORMW 『不想死的话，就全部喝光。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '690',
        any: [/PRINTFORMW %SAVESTR:ARG%脸上血色褪尽。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '692-702',
        any: [/IF TALENT:ARG:11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '694',
        any: [/PRINTFORMW %SAVESTR:ARG%用冷淡的眼神瞪着巨人，表示不从。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '695',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '696',
        any: [
          /PRINTFORMW 巨人用巨大的手掌按着%SAVESTR:ARG%的头，直接把头按入水盆里。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '697',
        any: [/PRINTFORMW 「咕噜，咕噜，咕咕噜」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '698',
        any: [
          /PRINTFORMW 巨人把他的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '699',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '700',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '704',
        any: [/PRINTFORML 精液经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '705',
        any: [/EXP:ARG:20 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '707',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '708',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '710',
        any: [/@MAN_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '714-742',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '715-722',
        any: [/;隷属状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '717-721',
        any: [/DATAFORM 『已经、离不开我们了吗』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '723-733',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '727-732',
        any: [/DATAFORM 『哦、又来啦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '734-741',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '736-740',
        any: [/DATAFORM 『真是好家伙啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '747-761',
        any: [/IF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '749',
        any: [/PRINTFORMW 『屁股露出来，抬高点！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '750',
        any: [
          /PRINTFORMW %SAVESTR:ARG%露出了屈辱的神色，向魔族男人翘起了屁股。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '751',
        any: [
          /PRINTFORMW %SAVESTR:ARG%全裸地侍奉着兽人们的阴茎。只要喝掉所有\{MON_NUM\}个男人的精液的话/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '752',
        any: [/PRINTFORMW 『嘴巴张开点！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '753',
        any: [/PRINTFORMW %SAVESTR:ARG%依照吩咐，用嘴巴侍奉着阴茎……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '754',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '755',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '756',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '757',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '759-760',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '760',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '762-828',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '764',
        any: [
          /PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满了淫秽的话语。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '767',
        any: [/PRINTFORM %SAVESTR:ARG%的身上，被写着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '768',
        any: [/PRINT 【最喜欢阴茎】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '771',
        any: [/PRINT 【性冷淡便器】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '776',
        any: [/PRINT 【看似忠贞的便器出道】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '781',
        any: [/PRINT 【又粘又湿】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '786',
        any: [/PRINT 【愉悦的脸】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '791',
        any: [/PRINT 【有鸡鸡的奴隶】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '795',
        any: [/PRINT 【操我】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '797',
        any: [/PRINT 【肛门免费】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '799',
        any: [/PRINT 【母猪】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '802',
        any: [/PRINTFORM 之类的话。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '804',
        any: [
          /PRINTFORMW 络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '805',
        any: [
          /PRINTFORMW 当被最后一人抱着的时候，%SAVESTR:ARG%已经失去了任何表情，成为全身的穴都流出着精液的下/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '806',
        any: [
          /PRINTFORMW 地下城里，充斥着\{MON_NUM\}人份的精液和体液的异样臭味。魔族男人对原冒险者重生成为肉便器相当/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '809-818',
        any: [/IF TALENT:ARG:244/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '811',
        any: [/PRINTFORMW %SAVESTR:ARG%的蓝色肌肤，被沾满了精液……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '814',
        any: [
          /PRINTFORMW %SAVESTR:ARG%健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '817',
        any: [/PRINTFORMW %SAVESTR:ARG%美丽的白皙肌肤被精液玷污了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '820',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '821',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '822',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '823',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '824',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '825',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '827-828',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '828',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '829-851',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '830',
        any: [/PRINTW 『明明是冒险者，却忍不住了吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '831',
        any: [
          /PRINTFORMW %SAVESTR:ARG%的肛门被灌入了灌肠液，忍受着强烈的便意。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '832',
        any: [
          /PRINTFORMW 『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '833',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '834',
        any: [/PRINTFORMW 肛门里的污物，终于无法忍耐地飞散而出。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '835',
        any: [
          /PRINTFORMW 魔族男人们看到这样，毫不留情地说着侮蔑的话，%SAVESTR:ARG%在这份屈辱中泣不成声。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '837-842',
        any: [/IF TALENT:ARG:62/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '839',
        any: [
          /PRINTFORMW %SAVESTR:ARG%因自己拉出的东西的味道而皱起眉头，羞愧欲死。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '840',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '841',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '844',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '845',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '846',
        any: [/PRINTL 自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '847',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '848',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '849',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '850',
        any: [/EXP:ARG:10 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '851',
        any: [/EXP:ARG:11 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '852-874',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '853',
        any: [/PRINTW 『那个冒险者大人，在舔我的肛门哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '854',
        any: [
          /PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对于生命安全的保证。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '855',
        any: [/PRINTFORMW 『你的尊严，真不值钱呢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '856',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '857',
        any: [
          /PRINTFORMW 侍奉结束之后，%SAVESTR:ARG%还被迫要说出淫秽的话语。他忍无可忍地大哭着，宣布自己喜欢舔/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '859-863',
        any: [/IF TALENT:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '861',
        any: [
          /PRINTFORMW 自尊心低下的%SAVESTR:ARG%，拼命地说着自己是舔肛用奴隶。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '865-869',
        any: [/IF TALENT:ARG:62/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '867',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '871',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '872',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '873',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '874',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '875-899',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '876',
        any: [/PRINTW 『这个为了保命就来者不拒的娼妓！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '877',
        any: [
          /PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '878',
        any: [
          /PRINTFORMW 『说！说我是个相对于做冒险者，更喜欢做娼妓的淫乱贱婊！』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '879',
        any: [
          /PRINTFORMW %SAVESTR:ARG%在激烈的抽插中，不断地重复着屈辱的台词。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '881-886',
        any: [/IF TALENT:ARG:17/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '883',
        any: [
          /PRINTFORMW %SAVESTR:ARG%拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '884',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '885',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '888-893',
        any: [/IF ABL:ARG:21 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '890',
        any: [/PRINTFORMW 说着过激的言语，%SAVESTR:ARG%的心里产生了情欲。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '891',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '892',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '895',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '896',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '897',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '898',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '900',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '901',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '903',
        any: [/@BEAST_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '907-935',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '908-915',
        any: [/;隷属状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '910-914',
        any: [/DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '916-926',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '920-925',
        any: [/DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '927-934',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '929-933',
        any: [/DATAFORM 『咕噜咕噜噜』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '939',
        any: [/PRINTFORMW 『噢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '940',
        any: [/PRINTFORMW 野兽们，开始轮番兽奸%SAVESTR:ARG%。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '941',
        any: [/PRINTFORMW 「啊！呜！不要啊……啊啊啊！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '942',
        any: [
          /PRINTFORMW %SAVESTR:ARG%无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '944-949',
        any: [/IF TALENT:ARG:314 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '946',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '947',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '948',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '950',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '951',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '952',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '953',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '954',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '955',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '956',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '957',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '958',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '960',
        any: [/@BRAIN_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '964-991',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '965-972',
        any: [/;隷属状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '967-971',
        any: [
          /DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '973-982',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '977-981',
        any: [/DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '983-990',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '985-989',
        any: [/DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '995-1003',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '997',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配他的精神。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '998',
        any: [/PRINTFORMW 「啊…啊…啊…啊…啊……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '999',
        any: [/PRINTFORMW %SAVESTR:ARG%眼珠上翻，伸出舌头，脱粪了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1000',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1001',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1002',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1003',
        any: [/EXP:ARG:1 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1004-1010',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1005',
        any: [/PRINTW 食脑魔的触手缠绕着冒险者，他死命地挣扎，却无法挣脱。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1006',
        any: [
          /PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里，往脑髓注入媚药成分。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1007',
        any: [/PRINTFORMW %SAVESTR:ARG%被过度的快感弄失禁了，成了废人。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1008',
        any: [/PRINTFORMW 幸好，躯干还是完好的。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1009',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1010',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1012',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1013',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1015',
        any: [/@HORSE_RYOU男\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1019-1046',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1020-1027',
        any: [/;隷属状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1022-1026',
        any: [
          /DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1028-1037',
        any: [/ELSEIF CFLAG:ARG:131 > 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1032-1036',
        any: [/DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1038-1045',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1040-1044',
        any: [/DATAFORM 『唔哦哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1050',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1051',
        any: [
          /PRINTFORMW 『你很有素质嘛～看在这个份上，就用魔法让你好受些。』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1052',
        any: [/PRINTFORMW %SAVESTR:ARG%不得不用肛门承受着兽奸……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1054-1059',
        any: [/IF TALENT:ARG:314 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1056',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1057',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1058',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1061',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1062',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1063',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1064',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1065',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1066',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1067',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB',
        ref: '1068',
        any: [/RETURN 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
