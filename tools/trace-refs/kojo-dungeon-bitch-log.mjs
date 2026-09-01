// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-bitch-log.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-dungeon-bitch-log.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '8-49',
        any: [/^\s*@LOG_TRY_BITCH\(ARG,\ PLACE\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '14',
        any: [/^\s*PRINTFORM\ %FS_BITCH\("LOOKS",\ ARG\)%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '16-35',
        any: [/^\s*IF\ PLACE\ ==\ "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '18-26',
        any: [/^\s*IF\ CFLAG:ARG:1\ ==\ 2/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '21',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '23',
        any: [/^\s*PRINTFORM\ 对于借款只减少了一点点感到不满，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '25',
        any: [/^\s*PRINTFORM\ 在空闲的时间，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '28',
        any: [/^\s*PRINTFORM\ 瞒着同伴偷偷的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '29-32',
        any: [/^\s*ELSEIF\ CFLAG:ARG:500\ ==\ 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '31',
        any: [/^\s*PRINTFORM\ 被强迫/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '32',
        any: [/^\s*PRINTFORM\ 遵照命令，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '34',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '36-46',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '39',
        any: [/^\s*PRINTFORM\ 无法压抑自己的性欲，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '42',
        any: [/^\s*PRINTFORM\ 由於高额的债务，不由得开始/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '44',
        any: [/^\s*PRINTFORM\ 冒险资金花光了，/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '47',
        any: [/^\s*PRINTFORMW\ 考虑着出卖肉体的事。/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '51-277',
        any: [/^\s*@FS_BITCH\(TYPE,\ ARG\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '60-81',
        any: [/^\s*CASE\ "PLAY"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '80',
        any: [/^\s*THROW\ 未知参数\{ARG\}/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '83-98',
        any: [/^\s*CASE\ "PLAYNAME"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '98',
        any: [/^\s*GOTO\ ERROR_ARG/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '100-114',
        any: [/^\s*CASE\ "TOWN_MAN"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '115-129',
        any: [/^\s*CASE\ "TOWN_GIRL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '130-144',
        any: [/^\s*CASE\ "DUNGEON_MAN"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '145-159',
        any: [/^\s*CASE\ "DUNGEON_GIRL"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '162-270',
        any: [/^\s*CASE\ "LOOKS"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '171',
        any: [/^\s*LOCALS\ =\ %GET_LOOK_INFO\(ARG,\ "头发颜色"\)%的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '174',
        any: [/^\s*LOCALS\ =\ 小麦色的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '176',
        any: [/^\s*LOCALS\ =\ 白皙的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '178',
        any: [/^\s*LOCALS\ =\ 青色的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '181',
        any: [/^\s*LOCALS\ =\ 白虎的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '183',
        any: [/^\s*LOCALS\ =\ 阴毛浓密的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '186',
        any: [/^\s*LOCALS\ =\ 毛躁的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '188',
        any: [/^\s*LOCALS\ =\ 翻白眼/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '190',
        any: [/^\s*LOCALS\ =\ 歪头/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '192',
        any: [/^\s*LOCALS\ =\ 忧郁的样子/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '194',
        any: [/^\s*LOCALS\ =\ 鼓腮的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '196',
        any: [/^\s*LOCALS\ =\ 慵懒的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '198',
        any: [/^\s*LOCALS\ =\ 不高兴的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '201',
        any: [/^\s*LOCALS\ =\ 严厉的眼神/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '204',
        any: [/^\s*LOCALS\ =\ 手指漂亮的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '206',
        any: [/^\s*LOCALS\ =\ 腰身纤细的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '208',
        any: [/^\s*LOCALS\ =\ 臀部美形的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '210',
        any: [/^\s*LOCALS\ =\ 双腿修长的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '212',
        any: [/^\s*LOCALS\ =\ 艳丽头发的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '214',
        any: [/^\s*LOCALS\ =\ 臀部丰满的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '216',
        any: [/^\s*LOCALS\ =\ 虎牙可爱的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '219',
        any: [/^\s*LOCALS\ =\ 元贵族/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '221',
        any: [/^\s*LOCALS\ =\ 元圣女/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '223',
        any: [/^\s*LOCALS\ =\ 肉便器/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '225',
        any: [/^\s*LOCALS\ =\ 高大的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '227',
        any: [/^\s*LOCALS\ =\ 矮小的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '229',
        any: [/^\s*LOCALS\ =\ 脸色不好的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '231',
        any: [/^\s*LOCALS\ =\ 假正经的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '233',
        any: [/^\s*LOCALS\ =\ 害羞的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '235',
        any: [/^\s*LOCALS\ =\ 任性的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '237',
        any: [/^\s*LOCALS\ =\ 笑容卑屈的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '239',
        any: [/^\s*LOCALS\ =\ 笑容灿烂的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '241',
        any: [/^\s*LOCALS\ =\ 要哭了似的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '243',
        any: [/^\s*LOCALS\ =\ 开朗的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '245',
        any: [/^\s*LOCALS\ =\ 水性杨花的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '248',
        any: [/^\s*LOCALS\ =\ 迷路的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '250',
        any: [/^\s*LOCALS\ =\ 卖身寻欢的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '253',
        any: [/^\s*LOCALS\ =\ 无法想象没有肉棒的生活的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '255',
        any: [/^\s*LOCALS\ =\ 一有空就不自觉地自慰的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '257',
        any: [/^\s*LOCALS\ =\ 变得非常喜欢腥臭精液的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '259',
        any: [/^\s*LOCALS\ =\ 渴望侵犯女性的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '261',
        any: [/^\s*LOCALS\ =\ 随时随地的渴望着Sexy，变成了欲望的俘虏/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '264-267',
        any: [/^\s*IF\ TALENT:ARG:76/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '269',
        any: [
          /^\s*LOCALS\ \+=\ @"%GET_LOOK_INFO\(ARG,\ "种族"\)%的%SAVESTR:AR/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '271',
        any: [/^\s*THROW\ 未知的TYPE%TYPE%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '279-316',
        any: [/^\s*@FS_LOG_BITCH\(TYPE,\ ARG:1,\ ARG:2,\ ARG:3,\ ARG:4,\ AR/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '290',
        any: [/^\s*CONTINUE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '292',
        any: [/^\s*LOCALS\ \+=\ "、"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '293',
        any: [
          /^\s*LOCALS\ \+=\ @"\{ARG:LCOUNT\}人的%FS_BITCH\(TYPE,\ LCOUNT\)%/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '318-378',
        any: [/^\s*@LOG_AFTER_BITCH\(ARG,\ CHECK\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '326',
        any: [/^\s*PLAY\ =\ 6/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '329-333',
        any: [/^\s*DO/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '330',
        any: [/^\s*KYAKU\ =\ RAND\(1,\ 6\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '332',
        any: [/^\s*BREAK/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '334',
        any: [/^\s*PLAY\ =\ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '343-347',
        any: [/^\s*DO/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '348',
        any: [/^\s*PLAY\ =\ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '350-354',
        any: [/^\s*DO/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '355-361',
        any: [/^\s*DO/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '356',
        any: [/^\s*PLAY\ =\ RAND\(1,\ 6\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '358',
        any: [/^\s*CONTINUE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '360',
        any: [/^\s*BREAK/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '366',
        any: [/^\s*LOCALS\ =\ %FS_BITCH\("PLAY",\ PLAY\)%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '368',
        any: [/^\s*CALLFORM\ LOG_BITCH_%LOCALS%\(ARG,\ "DUNGEON",\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '370',
        any: [/^\s*CALLFORM\ LOG_BITCH_%LOCALS%\(ARG,\ "TOWN",\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '372',
        any: [/^\s*WAIT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '380-552',
        any: [/^\s*@LOG_BITCH_HAND\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '385-397',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '386',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '389',
        any: [/^\s*PRINTFORM\ 公式般地揉搓着肉棒，一脸厌恶地/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '391',
        any: [/^\s*PRINTFORM\ 面对眼前的肉棒，垂下了双眼害羞地/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '393',
        any: [/^\s*PRINTFORM\ 看着客人的肉棒，一脸不开心的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '395',
        any: [/^\s*PRINTFORM\ 一边看着客人的反应，一边/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '397',
        any: [/^\s*PRINTFORM\ 看着客人勃起时的反应，很高兴的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '399',
        any: [/^\s*PRINTFORM\ 不时微笑着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '401',
        any: [/^\s*PRINTFORM\ 娴熟的说着隐晦的淫词/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '401-476',
        any: [/^\s*PRINTFORM\ 娴熟的说着隐晦的淫词/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '403',
        any: [/^\s*PRINTFORMW\ 进行着手交卖春\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '408',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '412',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '445',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '445-475',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '479-551',
        any: [/^\s*CASE\ "TOWN"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '481',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '485',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '550',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上一边套动着阴茎一边看向客人的脸，时不时伸出舌/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '550-551',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上一边套动着阴茎一边看向客人的脸，时不时伸出舌/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '551',
        any: [
          /^\s*PRINTFORMW\ 在一阵无可忍耐的射精之后，%SAVESTR:ARG%一边舔着被弄脏的手一边不屑/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '554-722',
        any: [/^\s*@LOG_BITCH_ORAL\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '559',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '560-572',
        any: [/^\s*SELECTCASE\ ABL:ARG:32/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '562',
        any: [/^\s*PRINTFORM\ 看着顶到鼻尖的肉棒，脸色发青的/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '564',
        any: [/^\s*PRINTFORM\ 艰难的适应着肉棒的气味和味道/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '566',
        any: [/^\s*PRINTFORM\ 发出“呷浦呷浦”的下流声音/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '568',
        any: [/^\s*PRINTFORM\ 愉悦的享受着肉棒的味道/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '570',
        any: [/^\s*PRINTFORM\ 带着轻松愉快的表情/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '572',
        any: [/^\s*PRINTFORM\ 用积极又不太过冒犯的态度/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '574',
        any: [/^\s*PRINTFORMW\ 进行着收费口交\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '575',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上將客人的陽具吞入口中，用舌頭仔細地舔舐著。/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '578-650',
        any: [/^\s*CASE\ "DUNGEON"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '580',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '584',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '650',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '653-720',
        any: [/^\s*CASE\ 1/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '654',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '719',
        any: [
          /^\s*PRINTFORMW\ 頭突然被用手緊緊的按住，随后腥臭的精液在口中爆发了/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '719-721',
        any: [
          /^\s*PRINTFORMW\ 頭突然被用手緊緊的按住，随后腥臭的精液在口中爆发了/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '720',
        any: [
          /^\s*PRINTFORMW\ 还没等其缓过神来，客人就将陽具继续插入喉咙，按着%SAVESTR:ARG%的頭/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '721',
        any: [
          /^\s*PRINTFORMW\ 在粗重的喘息声中，%SAVESTR:ARG%的脸和乳房都沾满了白浊腥臭的精液，/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '724-936',
        any: [/^\s*@LOG_BITCH_LES\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '729',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '729-741',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '732',
        any: [/^\s*PRINTFORM\ “明明知道不会插进来的”这样喃喃自语着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '734',
        any: [/^\s*PRINTFORM\ 一点点兴奋了起来/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '736',
        any: [/^\s*PRINTFORM\ 用发出黏着水声的小穴/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '738',
        any: [/^\s*PRINTFORM\ 毫不掩饰自己的兴奋/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '740',
        any: [/^\s*PRINTFORM\ 呼喊着不成体统的话语/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '742',
        any: [/^\s*PRINTFORM\ 忘记了时间，一次又一次的和客人缠绵着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '744',
        any: [/^\s*PRINTFORMW\ 进行着百合卖春\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '744-745',
        any: [/^\s*PRINTFORMW\ 进行着百合卖春\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '745',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪在地上，用舌頭仔細地舔舐著魔女的陰蒂，頭突然被用手/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '746',
        any: [
          /^\s*PRINTFORMW\ 在沉重的喘息声中，魔女將%SAVESTR:ARG%搂在怀里，雌性发情的阴户互相/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '748-882',
        any: [/^\s*SELECTCASE\ PLACE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '751',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '755',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '868',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '872',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '885-934',
        any: [/^\s*DATAFORM\ 「这是今天挣到的钱……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '890',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '932-933',
        any: [/^\s*DATAFORM\ 「可以喜欢我吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '934',
        any: [/^\s*ENDIF/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '935-936',
        any: [/^\s*ENDSELECT/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '938-1174',
        any: [/^\s*@LOG_BITCH_ANAL\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '943',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '943-955',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '946',
        any: [/^\s*PRINTFORM\ 拼命忍耐着痛苦/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '948',
        any: [/^\s*PRINTFORM\ 用经验不多的肠道/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '950',
        any: [/^\s*PRINTFORM\ 因为快乐露出了破绽，依然/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '952',
        any: [/^\s*PRINTFORM\ 用充分开发后的尻穴/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '954',
        any: [
          /^\s*PRINTFORM\ 紧锁着不知道用了多少次，已经变成了不逊于小穴的性器/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '956',
        any: [/^\s*PRINTFORM\ 不停地摆动着屁股/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '958',
        any: [/^\s*PRINTFORM\ 完完全全地沉溺在了H的快感之中/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '960',
        any: [/^\s*PRINTFORMW\ 进行着肛交卖春\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '961',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪伏在床上，像母狗一样摇动着屁股…/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '961-1136',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%跪伏在床上，像母狗一样摇动着屁股…/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '968',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '972',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1037-1133',
        any: [/^\s*ENDDATA/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1042',
        any: [/^\s*PRINTFORML\ 「这么H的衣服\~」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1045',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1102',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1139-1172',
        any: [/^\s*ELSEIF\ TALENT:ARG:161/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1141',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1171',
        any: [
          /^\s*PRINTFORMW\ 无法忍耐的客人從背将%SAVESTR:ARG%抱住像狗一樣耸动着，肛门在阳具的/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1171-1174',
        any: [
          /^\s*PRINTFORMW\ 无法忍耐的客人從背将%SAVESTR:ARG%抱住像狗一樣耸动着，肛门在阳具的/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1172',
        any: [
          /^\s*PRINTFORMW\ 四肢著地趴著的%SAVESTR:ARG%的臀瓣每次與客人的腰肢發生撞擊，都會提/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1173',
        any: [
          /^\s*PRINTFORMW\ 呼吸逐漸變得粗重而凌亂，客人將%SAVESTR:ARG%的臀部像揉面一般地揉撫/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1174',
        any: [
          /^\s*PRINTFORMW\ 随后客人躺在地上，让%SAVESTR:ARG%坐上来自己动，%SAVESTR:/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1176-1449',
        any: [/^\s*@LOG_BITCH_SEX\(ARG,\ PLACE,\ KYAKU\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1181-1196',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1182',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1185',
        any: [/^\s*PRINTFORM\ 拼命忍耐着痛苦/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1187',
        any: [/^\s*PRINTFORM\ 用经验不多的阴道/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1187-1190',
        any: [/^\s*PRINTFORM\ 用经验不多的阴道/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1189',
        any: [/^\s*PRINTFORM\ 沉浸在快乐之中/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1191',
        any: [/^\s*PRINTFORM\ 用已经完完全全的开发了小穴/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1192-1195',
        any: [/^\s*CASE\ 5,\ 6/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1193',
        any: [/^\s*PRINTFORM\ 用饱经疼爱经验丰富的小穴/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1196',
        any: [/^\s*PRINTFORM\ 上下摆动着那迷人的腰/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1198',
        any: [/^\s*PRINTFORM\ 不知道是第几次高潮了/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1199',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1201-1408',
        any: [/^\s*IF\ RAND:2\ ==\ 1\ \&\&\ ABL:ARG:14\ >=\ 5/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1202',
        any: [/^\s*PRINTFORM\ 用像要扭断一样的气势挥动着腰/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1204',
        any: [/^\s*PRINTFORM\ 比起客人那边更疯狂的高潮着/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1207',
        any: [/^\s*PRINTFORMW\ 进行着性交卖春/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1212',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1219',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1303-1396',
        any: [/^\s*DATAFORM\ 「就在这里自慰」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1312',
        any: [/^\s*PRINTFORML\ 「这么H的衣服\~」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1315',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1372',
        any: [/^\s*PRINTFORML\ 客：%LOCALS%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1411',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1411-1447',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1416',
        any: [/^\s*PRINTDATAL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1441',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%仰臥著用雙腿用力的夾住趴在自己身上的客人的腰發出呻吟/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1442',
        any: [
          /^\s*PRINTFORMW\ 随即被翻过身来，一边被玩弄肛门一边主动用屁股套弄着巨大的阴茎…/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1443',
        any: [
          /^\s*PRINTFORMW\ 随后%SAVESTR:ARG%被客人抱了起来，双腿被架在肩上，像洋娃娃一样被猛/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1447-1449',
        any: [/^\s*;・DUNGEONでは金銭の授受は無く自主的に行うプレイ/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1451',
        any: [/^\s*@LOG_BITCH_ANIMAL\(ARG,\ PLACE,\ ARG:1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1451-1483',
        any: [/^\s*@LOG_BITCH_ANIMAL\(ARG,\ PLACE,\ ARG:1\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1457',
        any: [/^\s*CALL DUNGEON_SEX_LOG, MEN/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1459',
        any: [/^\s*PRINTFORM\ %SAVESTR:ARG%/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1460-1463',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1464',
        any: [/^\s*PRINTFORMW\ 在大家的眼前不知羞耻的进行着兽交表演\.\.\./m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1465',
        any: [
          /^\s*PRINTFORMW\ %SAVESTR:ARG%进入了兽栏，在众人炽热的注目下像母狗一样趴在地上，扭/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1466',
        any: [
          /^\s*PRINTFORMW\ 随后一条猎犬躺在地上，%SAVESTR:ARG%主动跨坐在野兽的阴茎上扭動著自/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1467',
        any: [
          /^\s*PRINTFORMW\ 围观的观众们一边看着这场兽奸秀一边兴奋的手淫，时不时有人冲上前去向%SAVES/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1469-1478',
        any: [/^\s*\[SKIPSTART\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1485-1519',
        any: [/^\s*@LOG_BITCH_SELF\(ARG,\ PLACE,\ PLAY\)/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1488-1517',
        any: [/^\s*\#DIMS\ PLACE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1523',
        any: [/^\s*;\[SKIPSTART\]/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1532',
        any: [/^\s*@DUNGEON_SEX_LOG,\ ARG:0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1532-1782',
        any: [/^\s*@DUNGEON_SEX_LOG,\ ARG:0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1543-1576',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1546',
        any: [/^\s*PRINTFORML\ 「穿着这么下流的衣服来诱惑人……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1548',
        any: [/^\s*PRINTFORML\ 「居然能抱着魔王大人的奴隶……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1550',
        any: [/^\s*PRINTFORML\ 「哦！哦！舒服的穴！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1552',
        any: [/^\s*PRINTFORML\ 「就这么喜欢精液吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1554',
        any: [/^\s*PRINTFORML\ 「随便就分开双腿的婊子！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1556',
        any: [/^\s*PRINTFORML\ 「用手把尻扒开」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1558',
        any: [/^\s*PRINTFORML\ 「做Ｖ字手！Ｖ字手！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1560',
        any: [/^\s*PRINTFORML\ 「觉得鸡鸡舒服吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1562',
        any: [/^\s*PRINTFORML\ 「啊！鸡鸡要融化了！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1564',
        any: [/^\s*PRINTFORML\ 「真是最贱的母猪！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1566',
        any: [/^\s*PRINTFORML\ 「抬起屁股，好好地发情吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1568',
        any: [/^\s*PRINTFORML\ 「真是下流的模样呢，嘿嘿」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1570',
        any: [/^\s*PRINTFORML\ 「分开双腿侍奉魔王军了吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1572',
        any: [/^\s*PRINTFORML\ 「习惯吸啜小鸡鸡了吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1574',
        any: [/^\s*PRINTFORML\ 「你和精液很相称呢！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1576',
        any: [/^\s*PRINTFORML\ 「射到你头发上都是！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1579-1612',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1582',
        any: [/^\s*PRINTFORML\ 「这一身……完全带动色情的气氛了啊！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1584',
        any: [/^\s*PRINTFORML\ 「穿成这样四处转悠……真是变态啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1586',
        any: [/^\s*PRINTFORML\ 「你很适合精液的气味嘛～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1588',
        any: [/^\s*PRINTFORML\ 「这是邀请吗？把腰扭起来啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1590',
        any: [/^\s*PRINTFORML\ 「正好欲求不满的说」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1592',
        any: [/^\s*PRINTFORML\ 「这也是你的工作？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1594',
        any: [/^\s*PRINTFORML\ 「阴蒂涨起来了，还开始流出爱液……嘿嘿……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1596',
        any: [/^\s*PRINTFORML\ 「勇者也这么堕落，这么淫乱」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1598',
        any: [/^\s*PRINTFORML\ 「手扶着墙，屁股转过来」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1600',
        any: [/^\s*PRINTFORML\ 「一定要狠狠地欺负一下你才行……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1602',
        any: [/^\s*PRINTFORML\ 「母乳不出来么？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1604',
        any: [/^\s*PRINTFORML\ 「完全顺从了嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1606',
        any: [/^\s*PRINTFORML\ 「一开始先来含一下吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1608',
        any: [/^\s*PRINTFORML\ 「腿分开，打开那里让我看看」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1610',
        any: [/^\s*PRINTFORML\ 「不当勇者了，也变得可爱了嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1612',
        any: [/^\s*PRINTFORML\ 「已经是我们的同伴了嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1615-1648',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1618',
        any: [/^\s*PRINTFORML\ 「大姐姐的衣服，好色……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1620',
        any: [/^\s*PRINTFORML\ 「姐……姐姐……我带钱来了」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1622',
        any: [/^\s*PRINTFORML\ 「我……还是处男……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1624',
        any: [/^\s*PRINTFORML\ 「大姐姐，真好色啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1626',
        any: [/^\s*PRINTFORML\ 「这就是……女人……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1628',
        any: [/^\s*PRINTFORML\ 「这就是姐姐的工作吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1630',
        any: [/^\s*PRINTFORML\ 「哇……厉害」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1632',
        any: [/^\s*PRINTFORML\ 「唔……要出来了！！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1634',
        any: [/^\s*PRINTFORML\ 「大姐姐，软软的……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1635',
        any: [/^\s*CALL DUNGEON_ANAL_LOG, MEN/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1636',
        any: [/^\s*PRINTFORML\ 「噗呲噗呲的」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1638',
        any: [/^\s*PRINTFORML\ 「能揉你的胸吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1640',
        any: [/^\s*PRINTFORML\ 「用力吸乳头的话，会有奶吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1642',
        any: [/^\s*PRINTFORML\ 「好厉害……呜哇～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1644',
        any: [/^\s*PRINTFORML\ 「大姐姐，再教我更多……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1646',
        any: [/^\s*PRINTFORML\ 「呵呵，姐姐你真可爱」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1648',
        any: [/^\s*PRINTFORML\ 「小鸡鸡，快爆炸了！！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1651-1694',
        any: [/^\s*SIF\ \(CFLAG:40\ \&\ 28\)\ \&\&\ CFLAG:41\ ==\ 203/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1654',
        any: [/^\s*PRINTFORML\ 「真是婊子的打扮啊。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1656',
        any: [/^\s*PRINTFORML\ 「我知道……想要钱是吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1658',
        any: [/^\s*PRINTFORML\ 「我拿着钱哦！你想要的话……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1660',
        any: [/^\s*PRINTFORML\ 「还没满足吧，这淫乱的娼妓！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1662',
        any: [/^\s*PRINTFORML\ 「有钱就怎么都行？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1666',
        any: [/^\s*PRINTFORML\ 「屁股也要舔，一直舔到肛门」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1668',
        any: [/^\s*PRINTFORML\ 「腰动起来！多扭几下。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1670',
        any: [/^\s*PRINTFORML\ 「跪下来说你想要钱！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1672',
        any: [/^\s*PRINTFORML\ 「说：请给我这母猪赏点钱」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1674',
        any: [/^\s*PRINTFORML\ 「为了钱，什么话都能说出来的婊子」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1676',
        any: [/^\s*PRINTFORML\ 「阴垢也漂亮地清洁了呢」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1678',
        any: [/^\s*PRINTFORML\ 「跪下来说请给我阴茎」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1680',
        any: [/^\s*PRINTFORML\ 「跪下来像狗一样地摇屁股」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1682',
        any: [/^\s*PRINTFORML\ 「在这里像狗一样地尿尿」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1684',
        any: [/^\s*PRINTFORML\ 「鸡鸡和钱，愿意为了哪个被赏耳光？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1686',
        any: [/^\s*PRINTFORML\ 「说自己是最喜欢鸡鸡的淫乱奴隶！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1688',
        any: [/^\s*PRINTFORML\ 「就在这里自慰」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1690',
        any: [/^\s*PRINTFORML\ 「说自己是为了钱而卖淫的贱婊子」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1692',
        any: [/^\s*PRINTFORML\ 「跪下来说我想要鸡鸡」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1694',
        any: [/^\s*PRINTFORML\ 「再来点媚笑看看，要更淫邪的」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1697-1780',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1701',
        any: [/^\s*PRINTFORML\ 「黄暴的衣服！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1705',
        any: [/^\s*PRINTFORML\ 「也来爱我啊～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1707',
        any: [/^\s*PRINTFORML\ 「爱意满满地来侍奉吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1709',
        any: [/^\s*PRINTFORML\ 「好好地来侍奉阴茎吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1711',
        any: [/^\s*PRINTFORML\ 「这样的我……也能得到爱吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1716',
        any: [/^\s*PRINTFORML\ 「勇者大人，变得这么温顺」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1718',
        any: [/^\s*PRINTFORML\ 「对自己的性技有自信吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1720',
        any: [/^\s*PRINTFORML\ 「对这种事很擅长吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1722',
        any: [/^\s*PRINTFORML\ 「淫乱地如此彻底。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1727',
        any: [/^\s*PRINTFORML\ 「来，吸！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1729',
        any: [/^\s*PRINTFORML\ 「来，腿分开！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1731',
        any: [/^\s*PRINTFORML\ 「在干嘛，继续舔啊！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1733',
        any: [/^\s*PRINTFORML\ 「笨手笨脚的……把屁股抬起来就行啦！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1738',
        any: [/^\s*PRINTFORML\ 「习惯肉棒的味道了吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1740',
        any: [/^\s*PRINTFORML\ 「好好地侍奉吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1742',
        any: [/^\s*PRINTFORML\ 「温柔的手法……鸡鸡快爆炸了」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1744',
        any: [/^\s*PRINTFORML\ 「居然还有这么淫乱的大小姐。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1749',
        any: [/^\s*PRINTFORML\ 「好啊！这冰冷的眼神！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1751',
        any: [/^\s*PRINTFORML\ 「这也是工作吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1753',
        any: [/^\s*PRINTFORML\ 「喂，摆出一张更舒服的脸吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1755',
        any: [/^\s*PRINTFORML\ 「你不懂笑的吗？YEAH～YEAH！这样」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1760',
        any: [/^\s*PRINTFORML\ 「终于在肉棒前变得温顺了吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1762',
        any: [
          /^\s*PRINTFORML\ 「那个性格恶劣的勇者大人已经成为肉棒的俘虏了？」/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1764',
        any: [/^\s*PRINTFORML\ 「无需多言！腿打开！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1766',
        any: [/^\s*PRINTFORML\ 「什么嘛这眼神……可恶……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1770',
        any: [/^\s*PRINTFORML\ 「这卖春女啊！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1772',
        any: [/^\s*PRINTFORML\ 「堕落为妓女了吗」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1774',
        any: [/^\s*PRINTFORML\ 「在干嘛？赶紧把腿分开啊！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1776',
        any: [/^\s*PRINTFORML\ 「呃呃地喘息……！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1781',
        any: [/^\s*RETURN\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1784-1999',
        any: [/^\s*@DUNGEON_ANAL_LOG,\ ARG:0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1795-1825',
        any: [/^\s*IF\ RAND:15\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1797',
        any: [/^\s*PRINTFORML\ 「菊穴啊……凑合用吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1799',
        any: [/^\s*PRINTFORML\ 「这完全是性器了嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1801',
        any: [/^\s*PRINTFORML\ 「又湿又软」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1803',
        any: [/^\s*PRINTFORML\ 「你是卖肛门的？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1805',
        any: [/^\s*PRINTFORML\ 「好啊，屁股翘起来」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1807',
        any: [/^\s*PRINTFORML\ 「这么淫乱的尻穴」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1809',
        any: [/^\s*PRINTFORML\ 「就这么喜欢卖菊花吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1811',
        any: [/^\s*PRINTFORML\ 「唔……你的直肠很舒服」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1813',
        any: [/^\s*PRINTFORML\ 「这肛门夹得真紧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1815',
        any: [/^\s*PRINTFORML\ 「漂亮的后庭」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1817',
        any: [/^\s*PRINTFORML\ 「你的后面，敏感度如何？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1819',
        any: [/^\s*PRINTFORML\ 「屁股，都露外面了哦」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1821',
        any: [/^\s*PRINTFORML\ 「这不已经习惯用后面了嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1823',
        any: [/^\s*PRINTFORML\ 「多少人用过这里了？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '1824',
        any: [/^\s*CALL DUNGEON_LES_LOG, GIRL/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1825',
        any: [/^\s*PRINTFORML\ 「真是个好尻穴……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1828-1844',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1830',
        any: [/^\s*PRINTFORML\ 「尻穴有感觉的变态！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1832',
        any: [/^\s*PRINTFORML\ 「这尻穴能用几次？再来一次吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1834',
        any: [/^\s*PRINTFORML\ 「收缩得真厉害啊……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1836',
        any: [/^\s*PRINTFORML\ 「这个人，肛门被调教过了……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1838',
        any: [/^\s*PRINTFORML\ 「菊花一开一合在引诱着我……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1840',
        any: [/^\s*PRINTFORML\ 「这个变态尻穴奴隶！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1842',
        any: [/^\s*PRINTFORML\ 「用尻穴挣钱，感觉舒服吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1844',
        any: [/^\s*PRINTFORML\ 「肛门的感觉真好，你真有天赋！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1847-1870',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1850',
        any: [/^\s*PRINTFORML\ 「哥哥的屁股，真棒」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1852',
        any: [/^\s*PRINTFORML\ 「姐姐的屁股，真棒」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1855',
        any: [/^\s*PRINTFORML\ 「哎？是用后面……？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1857',
        any: [/^\s*PRINTFORML\ 「肛门好舒服啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1859',
        any: [/^\s*PRINTFORML\ 「没钱了，屁股……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1861',
        any: [/^\s*PRINTFORML\ 「好厉害……完全被尻穴吸住了……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1863',
        any: [/^\s*PRINTFORML\ 「尻穴……要出来了！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1865',
        any: [/^\s*PRINTFORML\ 「这么紧凑的，也只有菊花能做到了吧。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1868',
        any: [/^\s*PRINTFORML\ 「大哥哥的肛门，非常地舒服啊……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1870',
        any: [/^\s*PRINTFORML\ 「大姐姐的肛门，非常地舒服啊……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1873-1914',
        any: [/^\s*ELSEIF\ ARG:0\ ==\ 3/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1876',
        any: [/^\s*PRINTFORML\ 「我知道……想要钱是吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1878',
        any: [/^\s*PRINTFORML\ 「我拿着钱哦！你想要的话……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1880',
        any: [/^\s*PRINTFORML\ 「还没满足吧，这淫乱的娼妓！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1882',
        any: [/^\s*PRINTFORML\ 「有钱就怎么都行？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1886',
        any: [/^\s*PRINTFORML\ 「屁股也要舔，一直舔到肛门」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1888',
        any: [/^\s*PRINTFORML\ 「腰动起来！多扭几下。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1890',
        any: [/^\s*PRINTFORML\ 「跪下来说你想要钱！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1892',
        any: [/^\s*PRINTFORML\ 「说：请给我这母猪赏点钱」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1894',
        any: [/^\s*PRINTFORML\ 「为了钱，什么话都能说出来的婊子」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1896',
        any: [/^\s*PRINTFORML\ 「阴垢也漂亮地清洁了呢」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1898',
        any: [/^\s*PRINTFORML\ 「跪下来说请给我阴茎」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1900',
        any: [/^\s*PRINTFORML\ 「跪下来像狗一样地摇屁股」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1902',
        any: [/^\s*PRINTFORML\ 「在这里像狗一样地尿尿」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1904',
        any: [/^\s*PRINTFORML\ 「鸡鸡和钱，愿意为了哪个被赏耳光？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1906',
        any: [/^\s*PRINTFORML\ 「说自己是最喜欢鸡鸡的淫乱尻穴奴隶！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1908',
        any: [/^\s*PRINTFORML\ 「在这里用后庭自慰！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1910',
        any: [/^\s*PRINTFORML\ 「说自己是为了钱而卖菊的贱婊子」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1912',
        any: [/^\s*PRINTFORML\ 「跪下来说我想要鸡鸡」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1914',
        any: [/^\s*PRINTFORML\ 「再来点媚笑看看，要更淫邪的」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1917-1997',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1922',
        any: [/^\s*PRINTFORML\ 「喜欢用肛门表达爱意？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1924',
        any: [/^\s*PRINTFORML\ 「把整个肛塞都吞入了」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1926',
        any: [/^\s*PRINTFORML\ 「什么都可以放进肛门去是吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1928',
        any: [/^\s*PRINTFORML\ 「用这种地方表达爱意吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1933',
        any: [/^\s*PRINTFORML\ 「肛塞对你来说太弱了吧。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1935',
        any: [/^\s*PRINTFORML\ 「看！又放进一个了哦！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1937',
        any: [
          /^\s*PRINTFORML\ 「越是看起来强悍的人，肛门越弱。原来是真的啊！」/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1939',
        any: [/^\s*PRINTFORML\ 「像要把手指吸进去一样！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1944',
        any: [/^\s*PRINTFORML\ 「肛门里放入振动宝石……再用力拔出来」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1946',
        any: [/^\s*PRINTFORML\ 「真是口嫌肛正直呢！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1948',
        any: [/^\s*PRINTFORML\ 「菊穴，真舒畅……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1950',
        any: [/^\s*PRINTFORML\ 「把屁股再抬高一点……全部都看见了哦！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1955',
        any: [
          /^\s*PRINTFORML\ 「哪怕是一幅高贵的姿态，肮脏的地方也还是脏啊」/m,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1957',
        any: [/^\s*PRINTFORML\ 「被爆菊感到羞耻了么……记住这份屈辱吧！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1959',
        any: [/^\s*PRINTFORML\ 「肛门张开了～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1961',
        any: [/^\s*PRINTFORML\ 「振动杖都吞入了……真是了不起的菊穴啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1966',
        any: [/^\s*PRINTFORML\ 「卖菊啊，不介意么？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1968',
        any: [/^\s*PRINTFORML\ 「菊穴真的这么好么……？你看」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1970',
        any: [/^\s*PRINTFORML\ 「看来肛门很喜欢振动宝石嘛」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1972',
        any: [/^\s*PRINTFORML\ 「哈哈，肛门变得黏黏糊糊的」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1977',
        any: [/^\s*PRINTFORML\ 「肮脏的女人肛门也脏！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1979',
        any: [/^\s*PRINTFORML\ 「勇者大人，菊花舒服吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1981',
        any: [/^\s*PRINTFORML\ 「屁股翘起来，把后庭扒开！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1983',
        any: [/^\s*PRINTFORML\ 「尻穴还挺老实的」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1987',
        any: [/^\s*PRINTFORML\ 「这个卖菊的娼妓！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1989',
        any: [/^\s*PRINTFORML\ 「堕落为卖菊的婊子了么？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1991',
        any: [/^\s*PRINTFORML\ 「在干嘛啊，快把屁股露出来。」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1993',
        any: [/^\s*PRINTFORML\ 「后庭在呃呃地喘息着……！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '1998',
        any: [/^\s*RETURN\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2001-2181',
        any: [/^\s*@DUNGEON_LES_LOG,\ ARG:0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2014',
        any: [/^\s*PRINTFORML\ 「你的精气，我不客气啦♪」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2014-2028',
        any: [/^\s*PRINTFORML\ 「你的精气，我不客气啦♪」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2016',
        any: [/^\s*PRINTFORML\ 「你看起来很可口嘛～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2018',
        any: [/^\s*PRINTFORML\ 「胸部也要舔哦」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2020',
        any: [/^\s*PRINTFORML\ 「谢谢款待♪」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2022',
        any: [/^\s*PRINTFORML\ 「拿这样的猎物来当晚餐，我真幸福呢～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2024',
        any: [/^\s*PRINTFORML\ 「光是接吻就高潮了？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2026',
        any: [/^\s*PRINTFORML\ 「满满的精气～吸走了哦」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2028',
        any: [/^\s*PRINTFORML\ 「我开食啦♪」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2031-2047',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2033',
        any: [/^\s*PRINTFORML\ 「小奴隶，把尿接着啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2035',
        any: [/^\s*PRINTFORML\ 「你这样的，真是可爱」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2037',
        any: [/^\s*PRINTFORML\ 「来，赶快开始，已经习惯了吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2039',
        any: [/^\s*PRINTFORML\ 「可悲的母猪就是要挨鞭子！小奴隶……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2041',
        any: [/^\s*PRINTFORML\ 「就这样一直抱着……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2043',
        any: [/^\s*PRINTFORML\ 「好多爱液溢出来了哦」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2045',
        any: [/^\s*PRINTFORML\ 「就一晚，我们来做恋人吧……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2047',
        any: [/^\s*PRINTFORML\ 「让我看看，你平常都是怎么自慰的？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2050-2066',
        any: [/^\s*IF\ RAND:8\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2052',
        any: [/^\s*PRINTFORML\ 「钱，带来了……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2054',
        any: [/^\s*PRINTFORML\ 「软软的……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2056',
        any: [/^\s*PRINTFORML\ 「弄坏我，什么都不用考虑……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2058',
        any: [/^\s*PRINTFORML\ 「果然不是抱着女人，就做不来啊！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2060',
        any: [/^\s*PRINTFORML\ 「偶尔奢侈一下，不行吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2062',
        any: [/^\s*PRINTFORML\ 「卖尻穴来挣钱，然后又可以买女人回来……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2064',
        any: [/^\s*PRINTFORML\ 「想把你买下来，然后租出去给别人喝精液」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2066',
        any: [/^\s*PRINTFORML\ 「这么脏的我，被你的爱液洗干净了……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2069-2097',
        any: [/^\s*IF\ RAND:4\ ==\ 0/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2071',
        any: [/^\s*PRINTFORML\ 「能满足我的性欲么？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2073',
        any: [/^\s*PRINTFORML\ 「看，想要钱吧？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2075',
        any: [/^\s*PRINTFORML\ 「呵呵，真是一只好色的小猫咪」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2077',
        any: [/^\s*PRINTFORML\ 「钱有的是，你看……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2081',
        any: [/^\s*PRINTFORML\ 「那里，在用力来！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2083',
        any: [/^\s*PRINTFORML\ 「啊，再多舔几下」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2085',
        any: [/^\s*PRINTFORML\ 「喂，屁股也要舔……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2087',
        any: [/^\s*PRINTFORML\ 「再来接吻吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2089',
        any: [/^\s*PRINTFORML\ 「我的鞭子，专治母猪……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2091',
        any: [/^\s*PRINTFORML\ 「喂，自慰给我看」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2093',
        any: [/^\s*PRINTFORML\ 「要从阴蒂舔到菊花啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2095',
        any: [/^\s*PRINTFORML\ 「爱抚一下我的那里吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2097',
        any: [/^\s*PRINTFORML\ 「来磨一下吧？打开你的腿……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2100-2179',
        any: [/^\s*ELSE/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2105',
        any: [/^\s*PRINTFORML\ 「一起相爱吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2107',
        any: [/^\s*PRINTFORML\ 「来接吻吧，奴隶」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2109',
        any: [/^\s*PRINTFORML\ 「想这样一直抱着……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2111',
        any: [/^\s*PRINTFORML\ 「快乐是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2116',
        any: [/^\s*PRINTFORML\ 「再来！再来！越粗暴越好！」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2118',
        any: [/^\s*PRINTFORML\ 「啊，乳头……再用力地捏……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2120',
        any: [/^\s*PRINTFORML\ 「再打我的屁股……打得通红也无妨」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2122',
        any: [/^\s*PRINTFORML\ 「堕落是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2127',
        any: [/^\s*PRINTFORML\ 「更认真地舔吧……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2129',
        any: [/^\s*PRINTFORML\ 「要好好舔，一直舔到屁股啊」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2131',
        any: [/^\s*PRINTFORML\ 「啊！表情不错，再来点更好的声音吧……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2133',
        any: [/^\s*PRINTFORML\ 「献媚是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2138',
        any: [/^\s*PRINTFORML\ 「结束了之后一起去喝茶吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2140',
        any: [/^\s*PRINTFORML\ 「就在这床睡吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2142',
        any: [/^\s*PRINTFORML\ 「啊，请把尿喝光……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2144',
        any: [/^\s*PRINTFORML\ 「淫荡是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2149',
        any: [/^\s*PRINTFORML\ 「若无其事的神色，真漂亮」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2151',
        any: [/^\s*PRINTFORML\ 「比起挥剑，你还是卖淫比较有才能呢」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2153',
        any: [/^\s*PRINTFORML\ 「啊～腋下～是弱点啦～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2155',
        any: [/^\s*PRINTFORML\ 「暴力是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2160',
        any: [/^\s*PRINTFORML\ 「这次不来我们的神殿吗？」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2162',
        any: [/^\s*PRINTFORML\ 「皮肤真不错……」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2164',
        any: [/^\s*PRINTFORML\ 「好屁股～」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2166',
        any: [/^\s*PRINTFORML\ 「脱线是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2170',
        any: [/^\s*PRINTFORML\ 「就这样相互交缠着吧」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2172',
        any: [/^\s*PRINTFORML\ 「下次也要来我们的神殿哦」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2174',
        any: [/^\s*PRINTFORML\ 「呵呵～又指名你了」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2176',
        any: [/^\s*PRINTFORML\ 「快乐是我们的教义」/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB',
        ref: '2181',
        any: [/^\s*RETURN\ 0/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2885',
        any: [/^\s*@GET_LOOK_INFO\(ARG,\ ARGS\)/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2922',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "头发颜色"/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3020',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "目"/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3095',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "阴毛状态"/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3114',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "魅力点"/m],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_BITCH.ERB',
        ref: '3132',
        any: [/^\s*\[SKIPEND\]/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3180',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "癖"/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3253',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "种族"/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3315',
        any: [/^\s*ELSEIF\ ARGS\ ==\ "成为勇者前的生活"/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
