// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：dungeon-quest.mjs

export const FILES = [
  {
    js: 'ere/dungeon/dungeon-quest.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '6-113',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '11-12',
        any: [/移動する際はかならず冒険の計画より後ろに置くこと/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '16-17',
        any: [/SIF GETBIT\(FLAG:8,3\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '19-21',
        any: [/PM:0 = ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '23-111',
        any: [/全員に順番に設定する/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '28-47',
        any: [/終了したクエストの清算/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '32-45',
        any: [/成功報酬/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB', ref: '33-37', any: [/お金/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '38-41',
        any: [/ELSEIF CFLAG:\(PM:LCOUNT\):535 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '42-44',
        any: [/ELSEIF CFLAG:\(PM:LCOUNT\):535 == 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '46',
        any: [/CFLAG:\(PM:LCOUNT\):534 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '49-51',
        any: [/受注状態が初期化されていないとダメ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '53-54',
        any: [/クエスト報酬/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '56-83',
        any: [/クエストの障害/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '58',
        any: [/CFLAG:\(PM:LCOUNT\):536 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '85-86',
        any: [/クエストの目的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '88-96',
        any: [/討伐対象（モンスターID）/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '98-104',
        any: [/時間制限あり/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '106-110',
        any: [/クエスト：受注状態/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '116-177',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '125-127',
        any: [/クエスト禁止/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '129-131',
        any: [/PM:0 = ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '133-175',
        any: [/全員に順番に結果を見るする/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '138-140',
        any: [/クエスト受注で成功でも失敗でもない場合じゃないとダメ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '142-150',
        any: [/該当モンスターがいないとダメ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '153',
        any: [/PRINTW \*クエスト結果\*/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '155-158',
        any: [/IF GETBIT\(CFLAG:\(PM:LCOUNT\):536, 5\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '160-163',
        any: [/IF CFLAG:\(PM:LCOUNT\):539 < 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '165',
        any: [/CALL QUEST_SELECT,PM:LCOUNT, ARGS/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '167-173',
        any: [/IF ARGS == "失敗"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '180-513',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '194-199',
        any: [/IF ARGS == "セット"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '201',
        any: [/MON_ID = CFLAG:ARG:538/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '204-208',
        any: [/IF QUEST_LINE == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '206-207',
        any: [/ELSEIF QUEST_LINE == 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '210-288',
        any: [/さらわれた娘/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '213',
        any: [/CFLAG:ARG:540 = RAND:5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '214-229',
        any: [/ELSEIF ARGS == "成功"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '230-267',
        any: [/PRINT は/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '268-287',
        any: [/ELSEIF ARGS == "名前"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '289-366',
        any: [/淫魔の虜/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '292',
        any: [/CFLAG:ARG:540 = RAND:5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '325-345',
        any: [/IF RAND:10 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '367-445',
        any: [/変異する身体/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '370',
        any: [/CFLAG:ARG:540 = RAND:5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '403-424',
        any: [/野良犬で獣姦フラグON/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '406',
        any: [/CALL QUEST_SELECT, ARG, "名前", 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '417',
        any: [/CALL QUEST_SELECT, ARG, "名前", 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '419-421',
        any: [/野良犬で獣姦フラグON/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '446-447',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '449-450',
        any: [/SIF QUEST_LINE == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '451-511',
        any: [/SIF GETBIT\(CFLAG:ARG:536, 0\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '452',
        any: [/IF ARGS == "名前"/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '453-463',
        any: [/IF QUEST_LINE == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '464-498',
        any: [/SIF GETBIT\(CFLAG:ARG:536, 0\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '499-500',
        any: [/SIF QUEST_LINE == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '501-510',
        any: [/\$LINE3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '502-503',
        any: [/SIF MON_ID == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '509-510',
        any: [/SIF QUEST_LINE == 0/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB', ref: '511', any: [/ENDIF/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '516-617',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '526-528',
        any: [/PM:0 = ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '530',
        any: [/QUEST_ON = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '536-538',
        any: [/時間経過/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '540-542',
        any: [/発生しないときもある/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '544-546',
        any: [/クエスト受注で成功でも失敗でもない場合じゃないとダメ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '548-556',
        any: [/該当モンスターがいないとダメ/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '558-559',
        any: [/PRINTW \*任务戦闘発生\*/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '559',
        any: [/QUEST_ON = 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '561-565',
        any: [/最後列ボス化/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB', ref: '567-579', any: [/罠/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '581-585',
        any: [/最前列15匹/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '587-612',
        any: [/性奉仕/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '592-593',
        any: [/SIF TALENT:\(PM:LCOUNT\):成为勇者前的生活 == 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '595-596',
        any: [/SIF TALENT:\(PM:LCOUNT\):成为勇者前的生活 == 20/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '598',
        any: [/LOCAL \+= EXP:\(PM:LCOUNT\):74/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '600-601',
        any: [/SIF CFLAG:\(PM:LCOUNT\):151 < -30/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '603-604',
        any: [/SIF CFLAG:\(PM:LCOUNT\):151 < -60/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '605-609',
        any: [/IF RAND:LOCAL > 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '611',
        any: [/PRINTFORML %SAVESTR:\(PM:LCOUNT\)%用愤怒的话语回绝了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '617',
        any: [/RETURN QUEST_ON/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '620-682',
        any: [/---------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '628-673',
        any: [/一応モンスター数の確認/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '675-679',
        any: [/IF EXP:0 > 0 && TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '689-951',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '689-706',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '711-729',
        any: [/@SLIME_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '734-751',
        any: [/@INSECT_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '756-770',
        any: [/@IVY_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '775-796',
        any: [/@SYOKUSYU_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '801-819',
        any: [/@FAILY_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '824-841',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '846-863',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '868-886',
        any: [/@GIRL_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '891-910',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '915-926',
        any: [/@BRAIN_QUEST_BITCH, ARG, MCOUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_QUEST.ERB',
        ref: '931-950',
        any: [/ファーストキス/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1055',
        any: [
          /PRINTFORML 　%SAVESTR:TARGET%当前是Lv\{CFLAG:TARGET:9\}，战斗经验值总计\{X:1\}点，本级经验：\{EXP:80\}\/\{X\}/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB',
        ref: '1057-1058',
        any: [/PRINT/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
