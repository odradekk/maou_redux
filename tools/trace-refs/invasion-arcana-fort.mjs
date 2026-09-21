// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #470 按 js 文件拆出：invasion-arcana-fort.mjs
//
// 引用面 = ere/invasion/invasion-arcana-fort.js 正文里的全部 `:N` / `:N-M`。
// 锚选原则：优先挑带正文的单行原文（PRINTW 台词、赋值语句、判据行），
// 原作的妊娠/非妊娠双份列表与四门重复段落在多处逐字相同，用同一行做锚
// 即进入「平行复现」档（#298 放行）；行首 `^`/行尾 `$` 的写法只用在
// 「同一行被同族语句共享、必须靠边界区分」的判据行上。

export const FILES = [
  // —— #470 Q13 侵略残余·3：ere/invasion/invasion-arcana-fort.js ——
  {
    js: 'ere/invasion/invasion-arcana-fort.js',
    refs: [
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '2-551',
        any: [/@ARCANA_FORT/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '11',
        any: [/#DIM NO_PAGE = 0/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '12',
        any: [/#DIM NUM_PAGE = 26/],
      },
      // 入场叙述四段
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '22-73',
        any: [
          /PRINTW 有俘虏说，狂王的亲卫队【圣灵骑士】正在为进攻你的地下城而在东南西北四个堡垒里特训着。/,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '23-27',
        any: [/PRINTW 圣灵骑士全部都被打倒了，四个据点也都被攻陷了。/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '29-39',
        any: [/PRINT 最后只剩下/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '41-42',
        any: [/PRINTW 现在打倒了两位圣灵骑士，还剩下两个堡垒……/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '44-54',
        any: [/PRINT 你的奴隶，将伟大的圣灵骑士/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '56-72',
        any: [
          /PRINTW 圣灵骑士全是一骑当千的高手，手下的怪物想必去到也只有被秒杀的份了吧。/,
        ],
      },
      // 开场侦察判据（无妊娠项）与其单行
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '62-65',
        any: [
          /^[\t ]*SIF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\) && \(TALENT:COUNT:85 == 1 \|\| TALENT:COUNT:76 == 1\) && CFLAG:COUNT:0 == 2 && COUNT != 0[\t ]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '63',
        any: [
          /^[\t ]*SIF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\) && \(TALENT:COUNT:85 == 1 \|\| TALENT:COUNT:76 == 1\) && CFLAG:COUNT:0 == 2 && COUNT != 0[\t ]*$/m,
        ],
      },
      // 東西南北の門
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '75-125',
        any: [/PRINTW 要向哪个堡垒派遣刺客呢？必须打倒圣灵骑士才算胜利。/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '80-84',
        any: [/PRINTL \[\*\] - 东方堡垒（已攻占）/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '105-125',
        any: [/^\$INPUT_LOOP[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '107-108',
        any: [/^[\t ]*IF RESULT == 4[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '109-113',
        any: [/^[\t ]*ELSEIF RESULT >= 5[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '115-116',
        any: [/SIF \(FLAG:92 & 1\) && RESULT == 0/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '117-118',
        any: [/SIF \(FLAG:92 & 4\) && RESULT == 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '119-120',
        any: [/SIF \(FLAG:92 & 2\) && RESULT == 2/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '121-122',
        any: [/SIF \(FLAG:92 & 8\) && RESULT == 3/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '125',
        any: [/^[\t ]*TMP_ARCANA = RESULT[\t ]*$/m],
      },
      // 勇者選択（妊娠可 / 非妊娠 两份）
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '127-325',
        any: [/;勇者選択/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '131',
        any: [/IF GETBIT\(FLAG:5,10\)/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '138',
        any: [
          /^[\t ]*IF \(CFLAG:COUNT:1 == 0 \|\| CFLAG:COUNT:1 == 7\) && \(TALENT:COUNT:85 == 1 \|\| TALENT:COUNT:76 == 1\) && CFLAG:COUNT:0 == 2 && COUNT != 0[\t ]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '142-147',
        any: [/MAX_PAGE = \( TMP2_ARCANA \/ NUM_PAGE \) \+ 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '148-151',
        any: [/PRINTW \*没有可以攻击的勇士\*/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '153',
        any: [/^\$INPUT_LOOP1[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '174',
        any: [/COUNT != 0 && T_LCOUNT <=/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '174-184',
        any: [/攻击\{CFLAG:COUNT:11,5,RIGHT\}/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '179-182',
        any: [/SETCOLOR 255,100,100/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '193',
        any: [/PRINTLC \[1000\] - 上一页/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '194',
        any: [/PRINTLC \[999\] - 返/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '195',
        any: [/PRINTLC \[1001\] - 下一页/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '197-198',
        any: [/^[\t ]*IF RESULT < 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '199-204',
        any: [/CLEARLINE LINECOUNT-L_LCOUNT/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '205-210',
        any: [/CLEARLINE LINECOUNT-L_LCOUNT/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '211-212',
        any: [/^[\t ]*ELSEIF RESULT >= TMP2_ARCANA && RESULT != 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '211-213',
        any: [/^[\t ]*ELSEIF RESULT >= TMP2_ARCANA && RESULT != 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '214-215',
        any: [/^[\t ]*SIF RESULT == 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '217-226',
        any: [/^[\t ]*TMP2_ARCANA = RESULT[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '220',
        any: [/TMP2_ARCANA == Y_ARCANA[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '227-325',
        any: [
          /;助手でなおかつ爱か淫乱がついてないと攻撃不可、妊婦は出撃不可。/,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '234',
        any: [
          /CFLAG:COUNT:0 == 2 && COUNT != 0 && TALENT:COUNT:153 == 0[\t ]*$/m,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '239-244',
        any: [/MAX_PAGE = \( TMP2_ARCANA \/ NUM_PAGE \) \+ 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '245-248',
        any: [/PRINTW \*没有可以攻击的勇士\*/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '250',
        any: [/^\$INPUT_LOOP2[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '271',
        any: [/TALENT:COUNT:153 == 0 && T_LCOUNT <=/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '271-281',
        any: [/攻击\{CFLAG:COUNT:11,4,RIGHT\}/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '290',
        any: [/PRINTLC \[1000\] - 上一页/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '291',
        any: [/PRINTLC \[999\] - 返/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '292',
        any: [/PRINTLC \[1001\] - 下一页/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '294-295',
        any: [/^[\t ]*IF RESULT < 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '296-301',
        any: [/CLEARLINE LINECOUNT-L_LCOUNT/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '302-307',
        any: [/CLEARLINE LINECOUNT-L_LCOUNT/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '308-309',
        any: [/^[\t ]*ELSEIF RESULT >= TMP2_ARCANA && RESULT != 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '308-310',
        any: [/^[\t ]*ELSEIF RESULT >= TMP2_ARCANA && RESULT != 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '311-312',
        any: [/^[\t ]*SIF RESULT == 999[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '315-324',
        any: [/^[\t ]*TMP2_ARCANA = RESULT[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '318',
        any: [/TMP2_ARCANA == Y_ARCANA[\t ]*&& TALENT:COUNT:153 == 0/],
      },
      // 東西南北の遭遇叙述
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '327-391',
        any: [
          /PRINTFORMW 在东方堡垒遇到了黑方片，把剑插在地上，双臂交叉抱于胸前。/,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '328-342',
        any: [
          /PRINTFORMW 在东方堡垒遇到了黑方片，把剑插在地上，双臂交叉抱于胸前。/,
        ],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '343-358',
        any: [/;西の砦/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '359-374',
        any: [/;南の砦/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '375-390',
        any: [/;北の砦/],
      },
      // キャラ追加（四门各一段）
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '393-463',
        any: [/;キャラ追加/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '395-408',
        any: [/^[\t ]*IF TMP_ARCANA == 0[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '396',
        any: [/ADDCHARA 22/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '397',
        any: [/CALL ADDCHARA_EX\(CHARANUM-1\)/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '398',
        any: [/A_ARCANA = CHARANUM - 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '399',
        any: [/SAVESTR:A_ARCANA = %NAME:A_ARCANA%/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '400',
        any: [/CSTR:A_ARCANA:1 = %NAME:A_ARCANA%/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '402',
        any: [/CFLAG:A_ARCANA:550 = 40/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '408',
        any: [/CFLAG:A_ARCANA:6 = RAND:80/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '410-425',
        any: [/ELSEIF TMP_ARCANA == 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '413',
        any: [/A_ARCANA = CHARANUM - 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '414',
        any: [/SAVESTR:\(A_ARCANA\) = %NAME:A_ARCANA%/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '416',
        any: [/ABL:A_ARCANA:31 = 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '417',
        any: [/EXP:A_ARCANA:10 = 30/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '419',
        any: [/CFLAG:A_ARCANA:550 = 41/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '425',
        any: [/CFLAG:A_ARCANA:6 = RAND:80/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '427-441',
        any: [/ELSEIF TMP_ARCANA == 2/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '430',
        any: [/A_ARCANA = CHARANUM - 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '431',
        any: [/SAVESTR:A_ARCANA = %NAME:A_ARCANA%/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '433',
        any: [/EXP:A_ARCANA:10 = 10/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '435',
        any: [/CFLAG:A_ARCANA:550 = 44/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '441',
        any: [/CFLAG:A_ARCANA:6 = RAND:80/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '443-462',
        any: [/ELSEIF TMP_ARCANA == 3/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '446',
        any: [/A_ARCANA = CHARANUM - 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '447',
        any: [/SAVESTR:A_ARCANA = %NAME:A_ARCANA%/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '449',
        any: [/EXP:A_ARCANA:0 = 20/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '451-452',
        any: [/EXP:A_ARCANA:5 = EXP:A_ARCANA:0/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '454',
        any: [/CFLAG:A_ARCANA:15 = 105/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '456',
        any: [/CFLAG:A_ARCANA:550 = 50/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '462',
        any: [/CFLAG:A_ARCANA:6 = RAND:80/],
      },
      // 衣装・身体・升级・回满・战斗
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '465-468',
        any: [/^[\t ]*TARGET = A_ARCANA[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '466',
        any: [/^[\t ]*TARGET = A_ARCANA[\t ]*$/m],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '467',
        any: [/CALL WEARING_CLOTH_ABLE/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '468',
        any: [/CALL CHAR_BODY_GENERATE_WAPPED, A_ARCANA/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '470-475',
        any: [/;レベルアップ処理/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '473',
        any: [/CALL ST_UP, A_ARCANA/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '477-478',
        any: [/BASE:A_ARCANA:0 = MAXBASE:A_ARCANA:0/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '480-484',
        any: [/;Aが元勇者 Bが圣灵ナイト/],
      },
      // 勝ち
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '486-531',
        any: [/;勝ち/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '490-492',
        any: [/EX_FLAG:4444 \+= 1000 \* CFLAG:A_ARCANA:9/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '494-521',
        any: [/;東の砦/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '499',
        any: [/FLAG:92 \|= 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '501',
        any: [/CALL CHAR_SIZE_GENERATE, A_ARCANA, 21/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '506',
        any: [/FLAG:92 \|= 4/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '508',
        any: [/CALL CHAR_SIZE_GENERATE, A_ARCANA, 27/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '513',
        any: [/FLAG:92 \|= 2/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '515',
        any: [/CALL CHAR_SIZE_GENERATE, A_ARCANA, 24/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '520',
        any: [/FLAG:92 \|= 8/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '521',
        any: [/CALL CHAR_SIZE_GENERATE, A_ARCANA, 18/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '523-531',
        any: [/IF GETBIT\(FLAG:5,12\) \|\| GETBIT\(FLAG:5,15\)/],
      },
      // 負け
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '532-545',
        any: [/;負け/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '534-539',
        any: [/SIF FLAG:1 == Y_ARCANA/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '541',
        any: [/A_ARCANA = CHARANUM - 1/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '541-544',
        any: [/CALL PARTY_CHAR_DEL, A_ARCANA/],
      },
      {
        src: 'target/ERB/侵略/ARCANA_FORT.ERB',
        ref: '547-550',
        any: [/A = 0\nB = 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
