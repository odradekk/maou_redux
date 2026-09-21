// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #470 按 js 文件拆出：invasion-ravish.mjs
//
// 本模块是纯文本旁白，锚一律取原文的 PRINT 行（台词、叙述句）——这些行
// 在整份 ERB 里逐字唯一，天然带鉴别力。少数「同款结构复用在多个函数里」
// 的行（战场表的 IF ARG == 1 / 各函数的 RAND 守卫 / 末行 RETURN 0 前一行）
// 命中多处但窗口逐字相同，走 #298 的平行复现档放行。
//
// 注意：末行的 `RETURN 0` 单独做锚是「窗口无正文」（#298 判弱），所以 js
// 侧把每段结尾的引用写成 `:N-2-N` 这样的**含末条 PRINT 行的区间**。

export const FILES = [
  // —— #470 Q13 侵略残余·3：ere/invasion/invasion-ravish.js ——
  {
    js: 'ere/invasion/invasion-ravish.js',
    refs: [
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '1-66',
        any: [/@INVASION_RYOUZYOKU/],
      },
      // 12 个旁白函数的函数头
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '71-162',
        any: [/@ORC_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '165-237',
        any: [/@SLIME_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '240-291',
        any: [/@INSECT_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '294-346',
        any: [/@IVY_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '349-402',
        any: [/@SYOKUSYU_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '405-460',
        any: [/@FAILY_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '463-527',
        any: [/@GIANT_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '531-591',
        any: [/@MAN_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '594-653',
        any: [/@GIRL_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '655-697',
        any: [/@BEAST_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '700-738',
        any: [/@BRAIN_INV/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '741-782',
        any: [/@HORSE_INV/],
      },
      // 调用点（第二处，人间界之外的四个战场）
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '867-879',
        any: [/CALL INVASION_RYOUZYOKU, 1, SINKOU/],
      },
      // 分发本体
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '10',
        any: [/ARG:1 \/= 5000/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '13-64',
        any: [/^[\t ]*REPEAT 3[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '14',
        any: [/X = \(RAND:9 \+ 1\) \* 10 \+ 100 \+ RAND:5/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '15',
        any: [/CALL MONSTER_DATA, X, COUNT, 0, -1/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '17',
        any: [/RYOUZYOKU = COUNT \* 100 \+ 7/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '18',
        any: [/NUM = COUNT \* 100 \+ 99/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '19-21',
        any: [/IF E:NUM <= 0/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '20',
        any: [/E:RYOUZYOKU = 0/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '23',
        any: [/ID = E:\(COUNT\*100\)/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '24',
        any: [/PRINTFORMW %ITEMNAME:ID%的凌辱开始了。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '26-62',
        any: [/^[\t ]*IF E:RYOUZYOKU == 1[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '63',
        any: [/^[\t ]*PRINTL[\t ]+$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '63-66',
        any: [/^[\t ]*PRINTL[\t ]+$/m],
      },
      // @ORC_INV（:71-162）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '74-102',
        any: [/LOCALS:0 = 看板娘/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '104-109',
        any: [/IF RAND:5 == 0 && ARG:1 > 1/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '110-125',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '126-143',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '144-152',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '153-159',
        any: [/「新人，就在里面！」/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '159-162',
        any: [/全身无力，崩溃了。/],
      },
      // @SLIME_INV（:165-237）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '168-195',
        any: [/LOCALS:1 = 精灵女孩/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '197-202',
        any: [/IF RAND:4 == 0 && ARG:1 > 1/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '203-208',
        any: [/逃入圣堂里的%LOCALS:2%们，已经做好了死的觉悟。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '209-226',
        any: [/史莱姆从通气孔中钻入了！/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '227-234',
        any: [/作为营地的余兴节目/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '234-237',
        any: [/脸色铁青，彻底绝望了。/],
      },
      // @INSECT_INV（:240-291）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '243-264',
        any: [/LOCALS:1 = 精灵学生/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '266-271',
        any: [/IF RAND:3 == 0 && ARG:1 > 1/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '272-283',
        any: [/用臭布裹体的兽人虫使/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '284-289',
        any: [/在战场上被抓获的%LOCALS:0%们，成为了魔界昆虫的孵化箱。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '289-291',
        any: [/虫子的幼虫从私处和肛门中爬出来了/],
      },
      // @IVY_INV（:294-346）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '297-318',
        any: [/LOCALS:1 = 精灵守卫/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '309',
        any: [/^[\t ]*ELSEIF ARG == 4[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '312',
        any: [/^[\t ]*ELSEIF ARG == 4[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '320-325',
        any: [/植物型魔物在一夜之间吞没了城寨/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '326-337',
        any: [/手足被藤蔓缠住、毫無防備的肛门被根茎插了进去/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '338-344',
        any: [/在被镇压了的据点上，种满了魔界的植物/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '344-346',
        any: [/除了脱粪以外/],
      },
      // @SYOKUSYU_INV（:349-402）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '352-379',
        any: [/LOCALS:1 = 精灵侍女/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '381-386',
        any: [/%LOCALS:2%被捕获後、被触手细致地催眠了/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '387-393',
        any: [/侍奉着贵族的%LOCALS:1%/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '394-400',
        any: [/被镇压的据点里，临时设置了触手生产工厂。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '400-402',
        any: [/触手的精液中含有大量的春药成分/],
      },
      // @FAILY_INV（:405-460）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '408-435',
        any: [/LOCALS:1 = 精灵少女/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '436-441',
        any: [/都会学校被妖精们占据了/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '442-451',
        any: [/%LOCALS:0%被拘束着，承受妖精们的欺凌。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '452-458',
        any: [/妖精们宛如孩子般天真无邪的玩弄着破坏着/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '458-460',
        any: [/作为下批牺牲者的/],
      },
      // @GIANT_INV（:463-527）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '466-493',
        any: [/LOCALS:1 = 精灵使/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '495-500',
        any: [/因为巨人们的余興而被捕获的/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '501-507',
        any: [/本来就身份低微的/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '508-514',
        any: [/在战场上被抓获的%LOCALS:0%们，在接受最初的洗礼。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '515-526',
        any: [/不是勇者的她们的身体/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '525-527',
        any: [/只要一戳内心壊掉的/],
      },
      // @MAN_INV（:531-591）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '534-561',
        any: [/LOCALS:1 = 女精灵战士/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '563-570',
        any: [/用锐利的视线睨视着魔王軍的兵士/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '571-577',
        any: [/为求饶命而向魔王军团发誓忠诚于魔王/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '578-583',
        any: [/今后也一直为肉棒祈祷吧/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '584-589',
        any: [/当然魔王军可不接受/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '589-591',
        any: [/已经成为肉便器的/],
      },
      // @GIRL_INV（:594-653）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '597-624',
        any: [/LOCALS:1 = 秘书/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '626',
        any: [/^[\t ]*IF RAND:3 == 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '626-634',
        any: [/据点被攻陷，%LOCALS:0%成功地突围逃命/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '635-644',
        any: [/前线的%LOCALS:0%和%LOCALS:1%一起被抓住了。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '645-651',
        any: [/为了犒赏魔王军中的女魔族，设置了百合便器。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '651-653',
        any: [/自尊心已经完全崩溃/],
      },
      // @BEAST_INV（:655-697）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '658-679',
        any: [/LOCALS:1 = 精灵千金/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '681',
        any: [/^[\t ]*IF RAND:2 == 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '681-687',
        any: [/在被俘的%LOCALS:1%身上，施加了强力的催眠魔法/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '688-695',
        any: [/在魔王军的驻地里，偶尔被抓获的/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '695-697',
        any: [/以牝犬的样子承受着魔兽的侵犯/],
      },
      // @BRAIN_INV（:700-738）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '705-720',
        any: [/LOCALS:0 = 龙女/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '721',
        any: [/^[\t ]*IF RAND:2 == 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '721-727',
        any: [/%LOCALS:0%司令官的拷问开始了。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '728-736',
        any: [/%LOCALS:0%间谍的拷问在持续着。/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '736-738',
        any: [/因为这个身体是极品/],
      },
      // @HORSE_INV（:741-782）
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '745-766',
        any: [/LOCALS:1 = 本地女领主/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '768',
        any: [/^[\t ]*IF RAND:2 == 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '768-774',
        any: [/魔王军将军骑的马的肚子下/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '775-780',
        any: [/『马奸刑…？那是什么…』/],
      },
      {
        src: 'target/ERB/侵略/INVASION_RYOUZYOKU.ERB',
        ref: '780-782',
        any: [/口吐白沫失神了/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
