// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-town.mjs

export const FILES = [
  // —— #178（H9）：DUNGEON_TOWN / DUNGEON_QUEST 全量（锚机械生成：范围内首个注释行，无注释则首非空行）——
  {
    js: 'ere/dungeon/dungeon-town.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '5-75',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '16-18',
        any: [/PM:0 = ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '20-25',
        any: [
          /リーダー以外の帰還フラグが初期化されてなかったので全員分初期化しておこう/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '27-67',
        any: [/再起ポイントを消費して回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '27-29',
        any: [/再起ポイントを消費して回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '31-35',
        any: [/レベルアップ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '37-40',
        any: [/-----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '41-44',
        any: [/-----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '45-48',
        any: [/----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '49-52',
        any: [/----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '53-56',
        any: [/----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '56',
        any: [/CALL SET_QUEST\(PM:0\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '58',
        any: [
          /PRINTFORML ------------------------------------------------------------------------------------/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '60-63',
        any: [/IF RAND:10 > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '64-67',
        any: [/----------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '68-72',
        any: [/今後宴会以降の処理が実装される可能性があるのでいちおう中断判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '74-75',
        any: [/A = ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '80-94',
        any: [/全回復。仲間も回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '85-86',
        any: [/SIF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '87',
        any: [/CFLAG:PM:508 --/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '88-94',
        any: [/全回復。仲間も回復/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '101-135',
        any: [/仕送り/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '106-114',
        any: [/仕送り/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '116-135',
        any: [/各自資金繰りを行う/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '121',
        any: [/CFLAG:\(PM:LCOUNT\):580 \+= LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '123',
        any: [/CALL SELL_EX_ITEM\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '125',
        any: [/CALL TOWN_SELL\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '127',
        any: [/CALL TOWN_HOSHOUNIN\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '129',
        any: [/CALL TOWN_HENSAI\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '130-132',
        any: [/手持ちが少ないと借金する/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '133-134',
        any: [/ダンジョン外売春/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '134',
        any: [/CALL HEROINE_BITCH\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '140-151',
        any: [/@FI_PT_FUNDING\(PM:0, PM:1, PM:2\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '146',
        any: [/VARSET LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '148',
        any: [/LOCAL \+= FI_FUNDING\(PM:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '150',
        any: [/LOCAL = MAX\(LOCAL, 1\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '156-189',
        any: [/故郷や家族からの補助金/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '160-161',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '162',
        any: [/VARSET LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '165-168',
        any: [/素質補正/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '169-171',
        any: [/物乞い・貧民は援助が少ない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '172-174',
        any: [/貴族・聖女・軍人は多い/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '175-177',
        any: [/金のため・自暴自棄は援助が少ない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '178-180',
        any: [/国に命じられて・命令されては多い/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '182-184',
        any: [/カルマ補正/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '186-187',
        any: [/レベル補正/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '189',
        any: [/RETURNF LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '193-208',
        any: [/@TOWN_SELL\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '196-197',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '198-199',
        any: [/SIF !CFLAG:ARG:581/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '207',
        any: [/CFLAG:ARG:580 \+= CFLAG:ARG:581/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '208',
        any: [/CFLAG:ARG:581 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '212-227',
        any: [/@TOWN_HOSHOUNIN\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '215-218',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '219',
        any: [/LOCAL = \(CFLAG:0:9 \* 8\) \+ 500/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '227',
        any: [/CFLAG:ARG:582 -= LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '231-300',
        any: [/借金加上高利貸利率/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '235-236',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '237-246',
        any: [/借金加上高利貸利率/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '247-276',
        any: [/借金があれば500、もしくは2\.5割を可能な限り返済する/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '249-269',
        any: [/返済額をカルマ依存で変動するように/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '270',
        any: [/LOCAL = ABS\(CFLAG:ARG:582\) \/ LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '271-272',
        any: [/ELSEIF CFLAG:ARG:582 < 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '273-275',
        any: [/借金なし/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '278-283',
        any: [/上限下限処理/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '281',
        any: [/LOCAL = LIMIT\(LOCAL, 100, CFLAG:ARG:580 \/ 2\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '282-283',
        any: [/LOCAL \/= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '285-286',
        any: [/借金の金額は越えないように/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '299',
        any: [/CFLAG:ARG:582 \+= LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '300',
        any: [/CFLAG:ARG:580 -= LOCAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '304-324',
        any: [/@TOWN_LOAN\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '307-308',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '309-311',
        any: [/IF CFLAG:ARG:582 < -50000/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '313',
        any: [/IF RAND:\(260 \+ CFLAG:ARG:151\) < 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '321',
        any: [/CFLAG:ARG:582 -= 1000/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '322',
        any: [/CFLAG:ARG:580 \+= 1000/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '331-343',
        any: [/@TOWN_PT_SHOPPING\(PM:0, PM:1, PM:2\)/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB', ref: '343', any: [/WAIT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '346-357',
        any: [/お金に余裕が無いと買えない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '349-350',
        any: [/SIF ARG <= 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '351-353',
        any: [/お金に余裕が無いと買えない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '354',
        any: [/CALL ADD_EX_ITEM, -3, ARG, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '355-357',
        any: [/代金を支払う/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '368-567',
        any: [/新探索模式/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '391-403',
        any: [/新探索模式/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '401-402',
        any: [/A = PM:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '405-406',
        any: [/SIF FLAG:5 & 32/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '410-436',
        any: [/最低予算更新、ここのLOCALとLOCAL:2は使ってない模様/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '422',
        any: [/NUM_PM \+\+/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '423',
        any: [/KARMA:LCOUNT = CFLAG:\(PM:LCOUNT\):151/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '427',
        any: [/FLOOR:LCOUNT = CFLAG:\(PM:LCOUNT\):520/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '428',
        any: [/FLOOR_MIN = MIN\(FLOOR_MIN, FLOOR:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '429',
        any: [/FLOOR_MAX = MAX\(FLOOR_MAX, FLOOR:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '431',
        any: [/LOAN:LCOUNT = CFLAG:\(PM:LCOUNT\):582/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '432',
        any: [/LOAN_MIN = MIN\(LOAN_MIN, LOAN:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '433',
        any: [/LOAN_MAX = MAX\(LOAN_MAX, LOAN:LCOUNT\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '435',
        any: [
          /BALANCE:LCOUNT = CFLAG:\(PM:LCOUNT\):580 \+ CFLAG:\(PM:LCOUNT\):582/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '438',
        any: [/KARMA_PT = SUMARRAY\(KARMA\) \/ NUM_PM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '439',
        any: [/FLOOR_PT = SUMARRAY\(FLOOR\) \/ NUM_PM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '440',
        any: [/LOAN_PT = SUMARRAY\(LOAN\) \/ NUM_PM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '441-443',
        any: [
          /ふつー黒字収支を心がけると思う（その場合は単に合計するだけでおｋ）が/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '443',
        any: [/BALANCE_PT = SUMARRAY\(BALANCE\) \/ NUM_PM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '445-480',
        any: [/ここらへんは適当に決めた判定/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '484-534',
        any: [/GOTO使うのもあんまよろしくないが他に手を思いつかんのだ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '490-505',
        any: [/借金がすごいパーティ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '496-505',
        any: [/前回到達した階層\+1階層を目指す/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '506-515',
        any: [/借金そこそこ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '512',
        any: [/GOAL = MIN\(FLOOR_PT \/ 2, FLOOR_MIN\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '513-514',
        any: [/SIF !GOAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '515',
        any: [/START_FLOOR = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '516-525',
        any: [/借金がぜんぜん無いか各分岐の一定確率で深く潜る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '518-525',
        any: [/前回到達した階層\+1階層を目指す/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '526-534',
        any: [/その他/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '532',
        any: [/GOAL = MAX\(FLOOR_MAX \/ 2, FLOOR_PT, 1\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '533',
        any: [/START_FLOOR = GOAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '536-538',
        any: [/9階層までしかないので、最大値は8、最小値は0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '540-542',
        any: [/階層踏破のための必要資金/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '544-556',
        any: [/IF GOAL && \(FLAG:5 & 32\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '558-566',
        any: [/支払い/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '563',
        any: [/CFLAG:\(PM:LCOUNT\):582 -= COST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '564',
        any: [/CFLAG:\(PM:LCOUNT\):520 = GOAL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '565',
        any: [/CFLAG:\(PM:LCOUNT\):501 = START_FLOOR/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB', ref: '567', any: [/WAIT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '575-679',
        any: [/予算を集める/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '583',
        any: [/TARGET_POOL = TARGET/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '585-596',
        any: [/予算を集める/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '597-612',
        any: [/おかねがある/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '605',
        any: [/CFLAG:\(PM:LCOUNT\):580 -= COST:LCOUNT/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB', ref: '607', any: [/WAIT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '609-611',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '614-675',
        any: [/お楽しみタイム/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '619',
        any: [/TARGET = PM:LCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '621',
        any: [/PRINTFORM %SAVESTR:TARGET%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '623-625',
        any: [/カルマが高い場合/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '626-628',
        any: [/カルマが高い場合？やっぱりオトコはそゆうものですと考え。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '629-666',
        any: [/レズっ気・ふたなり・オトコの場合娼婦購入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '630-646',
        any: [/レズっ気・ふたなり・オトコの場合娼婦購入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '634-635',
        any: [/SIF TALENT:142/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '636-637',
        any: [/SIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '639',
        any: [/CALL BEFORE_AUTOTRAIN/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '640-642',
        any: [/貝合わせ自動調教/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '643-645',
        any: [/愛撫自動調教/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '646',
        any: [/CALL SOURCE_CHECK_AUTO/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '647-653',
        any: [/ショタコンの場合少年風俗へ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '654-665',
        any: [/いっちよ、ただの、この男性勇者やばいじゃないが。。。/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB', ref: '664', any: [/PRINT/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '667-672',
        any: [
          /聖女・神官・巫女・神官男子\(カルマ高いのみ\)はお祈りでカルマアップ/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '677',
        any: [/TARGET = TARGET_POOL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '679',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '686-700',
        any: [/各自日常を送る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '692-698',
        any: [/各自日常を送る/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '696',
        any: [/TARGET = PM:LCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB',
        ref: '697',
        any: [/CALL DUNGEON_TOWN_LOVER,TARGET/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_TOWN.ERB', ref: '705-710', any: [/FOR/] },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
