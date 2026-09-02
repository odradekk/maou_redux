// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：chara-make.mjs

export const FILES = [
  // —— #170 H1 角色生成管线：ere/chara/chara-make.js（本体）与
  //    ere/chara/char-make.js（转发层）。锚由源文件逐行原文生成。 ——
  {
    js: 'ere/chara/chara-make.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '2-120',
        any: [/@CHARA_MAKE\(ARG, ARG:1 = 0, ARG:2 = 0\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '12',
        any: [/SWAP A, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '14-16',
        any: [/SIF !EX_TALENT:A:2 \|\| 赤森奴隶/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '15',
        any: [/SIF !EX_TALENT:A:2 \|\| 赤森奴隶/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '18-20',
        any: [/SIF !EX_TALENT:A:2	;后代：命名->设置家族关系->CHARA_MAKE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '22-24',
        any: [/;Level・经验值設定/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '26-27',
        any: [/;家族初期化/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '29-30',
        any: [/;売春への積極性/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '32-51',
        any: [/IF !TALENT:A:精英 && !EX_TALENT:A:1 && !EX_TALENT:A:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '34',
        any: [/CALL CM_STP/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '36',
        any: [/CALL CM_BASE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '38',
        any: [/CALL CM_ST/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '41',
        any: [/CFLAG:A:1 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '43',
        any: [/CALL CM_BASE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '45',
        any: [/CALL CM_ST_ACE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '48',
        any: [/CFLAG:A:1 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '50',
        any: [/CALL CM_BASE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '54-60',
        any: [/;口上性格/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '57',
        any: [/ELSEIF INRANGE\(NO:A,200,211\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '58',
        any: [/;精英，暂用勇者口上/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '63-65',
        any: [/;初心者の烙印/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '68',
        any: [/CALL CM_VIRGIN/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '71',
        any: [/CALL CM_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '74',
        any: [/CALL CM_SKILL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '77',
        any: [/CALL CM_LOOK, ARG:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '79-83',
        any: [/IF EX_TALENT:A:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '86',
        any: [/CALL CM_KIND/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '89-90',
        any: [/SIF !EX_TALENT:A:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '100-102',
        any: [/;新的家族系统（后代不设定家族/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '105',
        any: [/CALL CM_FAMILY_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '109',
        any: [/CALL CM_CLOTH	;SET_CHAR_CLOTH/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '112',
        any: [/CALL RANDOM_SELF_CALL, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '114-117',
        any: [/;年齢or身長などを表示する設定の場合は身体データを設定/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '119-120',
        any: [/SWAP A, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '124-130',
        any: [/@CM_STP/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '125',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '126',
        any: [/CFLAG:A:502 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '127',
        any: [/CFLAG:A:1 = 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '128',
        any: [/CFLAG:A:508 = 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '132-214',
        any: [/@CM_BASE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '133-169',
        any: [/IF TALENT:A:战士 \|\| TALENT:A:骑士/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '133',
        any: [/IF TALENT:A:战士 \|\| TALENT:A:骑士/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '135',
        any: [/CFLAG:A:11 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '136',
        any: [/CFLAG:A:12 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '137',
        any: [/CFLAG:A:13 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '138',
        any: [/CFLAG:A:14 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '139',
        any: [/ELSEIF TALENT:A:魔法师 \|\| TALENT:A:巫女/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '141',
        any: [/CFLAG:A:11 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '142',
        any: [/CFLAG:A:12 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '143',
        any: [/CFLAG:A:13 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '144',
        any: [/CFLAG:A:14 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '145',
        any: [/ELSEIF TALENT:A:神官 \|\| TALENT:A:忍者/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '147',
        any: [/CFLAG:A:11 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '148',
        any: [/CFLAG:A:12 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '149',
        any: [/CFLAG:A:13 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '150',
        any: [/CFLAG:A:14 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '151',
        any: [/ELSEIF TALENT:A:盗贼 \|\| TALENT:A:弓手 \|\| TALENT:A:魔物使/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '153',
        any: [/CFLAG:A:11 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '154',
        any: [/CFLAG:A:12 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '155',
        any: [/CFLAG:A:13 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '156',
        any: [/CFLAG:A:14 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '157',
        any: [/ELSEIF TALENT:A:精英/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '159',
        any: [/CFLAG:A:11 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '160',
        any: [/CFLAG:A:12 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '161',
        any: [/CFLAG:A:13 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '162',
        any: [/CFLAG:A:14 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '163',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '165',
        any: [/CFLAG:A:11 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '166',
        any: [/CFLAG:A:12 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '167',
        any: [/CFLAG:A:13 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '168',
        any: [/CFLAG:A:14 = 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '171-179',
        any: [/;神官と巫女は治癒を持つ/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '174',
        any: [/TALENT:A:117 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '176',
        any: [/CFLAG:A:152 = 20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '178',
        any: [/TALENT:A:118 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '187-203',
        any: [/IF TALENT:A:种族2 == 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '188',
        any: [/CFLAG:A:12 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '189',
        any: [/CFLAG:A:14 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '191',
        any: [/CFLAG:A:11 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '192',
        any: [/CFLAG:A:13 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '194',
        any: [/CFLAG:A:11 -= 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '195',
        any: [/CFLAG:A:12 -= 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '196',
        any: [/CFLAG:A:13 -= 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '197',
        any: [/CFLAG:A:14 -= 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '199',
        any: [/CFLAG:A:11 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '200',
        any: [/CFLAG:A:12 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '201',
        any: [/CFLAG:A:13 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '202',
        any: [/CFLAG:A:14 \+= 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '205-214',
        any: [/;精英は魔の刻印を持つ/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '209',
        any: [/TALENT:A:254 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '211',
        any: [/TALENT:A:117 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '213',
        any: [/TALENT:A:118 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '216-251',
        any: [/@CM_KJ, ARG = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '220',
        any: [/;162,懦弱,/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '225',
        any: [/VARSET TALENT:A:0, 0, 160, 180/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '227',
        any: [/TALENT:A:ARG = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '229-250',
        any: [/\$CHARA_MIND_LOOP/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '230',
        any: [/X = RAND:11 \+ 160/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '233',
        any: [/SIF X == 165/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '236',
        any: [/SIF TALENT:A:122 && X == 166/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '239',
        any: [/SIF TALENT:A:122 && X == 163/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '241',
        any: [/SIF X == 170/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '243',
        any: [/IF X >= 167 && X <= 169/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '246',
        any: [/SIF TALENT:A:122 == 0 && X == 174/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '250',
        any: [/TALENT:A:X = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '255-294',
        any: [/@CM_GENDER/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '259',
        any: [/SELECTCASE 冒險者性別/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '261',
        any: [/;女多男少\(2%扶他，20%男性\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '263',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '265',
        any: [/TALENT:A:122 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '267',
        any: [/CASE  0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '270',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '271',
        any: [/CASE  1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '274',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '275',
        any: [/ELSEIF RAND:5 >= 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '276',
        any: [/TALENT:A:122 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '278',
        any: [/CASE  2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '281',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '282',
        any: [/ELSEIF RAND:5 >= 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '283',
        any: [/TALENT:A:122 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '285',
        any: [/CASE  3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '288',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '289',
        any: [/ELSEIF RAND:2 < 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '290',
        any: [/TALENT:A:122 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '292',
        any: [/CASE  4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '293',
        any: [/TALENT:A:121 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '295-347',
        any: [/@CM_VIRGIN/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '297',
        any: [/IF TALENT:A:122 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '298',
        any: [/TALENT:A:0 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '300',
        any: [/IF RAND:3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '301',
        any: [/TALENT:A:1 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '302',
        any: [/CFLAG:A:15 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '303',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '305',
        any: [/CFLAG:A:15 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '306',
        any: [/CFLAG:A:16 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '308',
        any: [/ELSEIF EX_TALENT:A:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '309',
        any: [/TALENT:A:0 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '310',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '311',
        any: [/ELSEIF TALENT:A:121 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '313',
        any: [/SIF RAND:8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '316',
        any: [/IF RAND:3 > 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '317',
        any: [/TALENT:A:1 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '318',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '320',
        any: [/CFLAG:A:16 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '323',
        any: [/IF TALENT:A:0 && TALENT:A:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '324',
        any: [/CFLAG:A:15 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '325',
        any: [/ELSEIF TALENT:A:0 == 0 \|\| TALENT:A:1 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '326',
        any: [/CFLAG:A:15 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '328',
        any: [/ELSEIF FLAG:82 == 1 && RAND:2 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '329',
        any: [/TALENT:A:0 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '330',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '331',
        any: [/ELSEIF RAND:8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '332',
        any: [/TALENT:A:0 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '333',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '336',
        any: [/SIF TALENT:A:0 == 1 \|\| TALENT:A:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '337',
        any: [/CFLAG:A:16 = -1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '340',
        any: [/SIF TALENT:A:0 == 1 && RAND:5 == 0 && TALENT:A:精英 != 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '341',
        any: [/TALENT:A:273 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '344',
        any: [/IF RAND:12 == 0 && TALENT:A:122 == 0 && !EX_TALENT:A:2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '345',
        any: [/TALENT:A:157 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '346',
        any: [/TALENT:A:0 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '349-729',
        any: [/@CM_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '353-363',
        any: [/X = RAND:3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '356',
        any: [/TALENT:A:10 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '359',
        any: [/TALENT:A:12 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '362',
        any: [/TALENT:A:14 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '368-379',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '370',
        any: [/TALENT:A:11 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '373',
        any: [/TALENT:A:18 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '375',
        any: [/TALENT:A:13 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '378',
        any: [/TALENT:A:16 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '384-391',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '398-409',
        any: [/X = RAND:16/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '414-421',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '425-430',
        any: [/X = RAND:8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '434-439',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '443-448',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '451-452',
        any: [/SIF RAND:12 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '456-461',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '464-465',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '469-474',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '478-483',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '486-487',
        any: [/SIF RAND:12 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '491-496',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '499-500',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '503-504',
        any: [/SIF RAND:50 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '507-508',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '512-517',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '522-527',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '530-531',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '534-535',
        any: [/SIF RAND:30 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '537-538',
        any: [/SIF RAND:30 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '542-543',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '547-552',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '556-561',
        any: [/X = RAND:8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '564-565',
        any: [/SIF RAND:10 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '568-569',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '572-573',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '576-577',
        any: [/SIF RAND:20 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '581-594',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '598-603',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '607-612',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '616-621',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '625-630',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '637-647',
        any: [/IF RAND:50 == 0 && TALENT:A:122 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '651-656',
        any: [/X = RAND:12/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '659-660',
        any: [/SIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '667-668',
        any: [/SIF RAND:25 == 0 && \(TALENT:A:122 \|\| TALENT:A:121\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '670-671',
        any: [
          /SIF RAND:6 == 0 && \(TALENT:A:160 == 1 \|\| TALENT:A:162 == 1\)/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '673-679',
        any: [/IF RAND:12 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '683-716',
        any: [/IF TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '684',
        any: [/;男人の場合恋母情结萝莉控が多い/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '695',
        any: [/;扶她の場合ニュートラル/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '706',
        any: [/;それ以外の場合恋父情结正太控が多い/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '718-719',
        any: [/SIF RAND:30 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '724-729',
        any: [/IF TALENT:A:37 && RAND:4 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '731-738',
        any: [/@CM_KIND/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '735',
        any: [/CFLAG:A:151 = RAND:200/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '737',
        any: [/CFLAG:A:151 = RAND:100/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '740-858',
        any: [/@CM_SKILL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '743',
        any: [/SIF TALENT:A:212 == 1 \|\| RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '746-747',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '750-756',
        any: [/IF TALENT:A:种族2 != 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '759-765',
        any: [/IF TALENT:A:种族2 != 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '767-768',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '772-779',
        any: [/IF TALENT:A:种族2 == 7/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '782-783',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '786-792',
        any: [/IF TALENT:A:种族2 != 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '795-802',
        any: [/IF TALENT:A:种族2 != 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '804-805',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '808-815',
        any: [/IF RAND:12 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '818-819',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '822-823',
        any: [
          /SIF TALENT:A:种族2 == 6 && TALENT:A:241 != 1 && TALENT:A:242 != 1 && TALENT:A:250 != 1 && TALENT:A:251 != 1/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '826-827',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '830-834',
        any: [/IF RAND:60 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '839-852',
        any: [/SIF RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '855-856',
        any: [/SIF TALENT:A:260 == 1 && RAND:40 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '858',
        any: [/CALL CMI_CONFLICT_CHECK\(A\)/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '860-872',
        any: [/@CM_LOOK, ARG/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '862-865',
        any: [/X = TARGET/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '868-872',
        any: [/IF RAND:20 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '875-883',
        any: [/@CM_ST/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '879',
        any: [/CALL ST_UP, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '882',
        any: [/BASE:A:0 = MAXBASE:A:0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '883',
        any: [/BASE:A:1 = MAXBASE:A:1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '885-894',
        any: [/@CM_ST_ACE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '888',
        any: [/LOCAL = CFLAG:MASTER:9 \* 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '889',
        any: [/LOCAL \+= RAND:\(CFLAG:MASTER:9\) \* 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '890',
        any: [/LOCAL \/= 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '892',
        any: [/CALL ST_UP, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '896-1042',
        any: [/@CM_FAMILY_TALENT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '900-901',
        any: [/LOCAL = CFLAG:A:605/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '902',
        any: [/CALL SEARCH_FAMILY, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '903',
        any: [/FAMILY_ID = RESULT/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '905',
        any: [/IF FAMILY_ID > 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '907',
        any: [/IF CFLAG:FAMILY_ID:451 < 15/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '909',
        any: [/IF TALENT:FAMILY_ID:魁梧 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '911',
        any: [/TALENT:A:娇小 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '913',
        any: [/TALENT:A:魁梧 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '918',
        any: [
          /IF \(\(TALENT:FAMILY_ID:巨乳 && RAND:4\) \|\| \(TALENT:FAMILY_ID:爆乳 && RAND:2\) \|\| \(TALENT:FAMILY_ID:超乳\) == 0\) && TALENT:A:122 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '920',
        any: [/TALENT:A:绝壁 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '923',
        any: [/TALENT:A:贫乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '925',
        any: [/TALENT:A:巨乳 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '927',
        any: [/TALENT:A:巨乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '930',
        any: [/TALENT:A:爆乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '935',
        any: [/ELSEIF CFLAG:FAMILY_ID:451 > 17/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '937',
        any: [/IF TALENT:FAMILY_ID:娇小 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '939',
        any: [/TALENT:A:魁梧 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '941',
        any: [/TALENT:A:娇小 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '946',
        any: [
          /IF \(\(TALENT:FAMILY_ID:贫乳 && RAND:4\) \|\| \(TALENT:FAMILY_ID:绝壁 && RAND:2\) == 0\) && TALENT:A:122 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '948',
        any: [/TALENT:A:超乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '951',
        any: [/TALENT:A:爆乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '954',
        any: [/TALENT:A:巨乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '956',
        any: [/TALENT:A:贫乳 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '958',
        any: [/TALENT:A:贫乳 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '964-967',
        any: [
          /IF \(TALENT:FAMILY_ID:肌肉型 \|\| TALENT:FAMILY_ID:虚弱\) && RAND:3 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '965',
        any: [/TALENT:A:肌肉型 = TALENT:FAMILY_ID:肌肉型/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '966',
        any: [/TALENT:A:虚弱 = TALENT:FAMILY_ID:虚弱/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '969-972',
        any: [
          /IF \(TALENT:FAMILY_ID:褐色肌肤 \|\| TALENT:FAMILY_ID:白皙\) && RAND:2 == 0/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '970',
        any: [/TALENT:A:褐色肌肤 = TALENT:FAMILY_ID:褐色肌肤/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '971',
        any: [/TALENT:A:白皙 = TALENT:FAMILY_ID:白皙/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '974-975',
        any: [/SIF TALENT:FAMILY_ID:额头天眼 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '979-1027',
        any: [/IF RAND:5 != 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '981',
        any: [/HAIR_COLOR =130/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '983',
        any: [/HAIR_COLOR =160/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '985',
        any: [/HAIR_COLOR =230/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '987',
        any: [/HAIR_COLOR =150/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '989',
        any: [/HAIR_COLOR =120/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '991',
        any: [/HAIR_COLOR =210/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '993',
        any: [/HAIR_COLOR =200/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '995',
        any: [/HAIR_COLOR =220/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '997',
        any: [/HAIR_COLOR =110/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '999',
        any: [/HAIR_COLOR =170/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1001',
        any: [/HAIR_COLOR =140/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1003',
        any: [
          /HAIR_COLOR = HAIR_COLOR - 20 \+ RAND:9 \+ RAND:9 \+ RAND:9 \+ RAND:9 \+ RAND:9/,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1005',
        any: [/TALENT:A:头发颜色 = 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1007',
        any: [/TALENT:A:头发颜色 = 8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1009',
        any: [/TALENT:A:头发颜色 = 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1011',
        any: [/TALENT:A:头发颜色 = 7/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1013',
        any: [/TALENT:A:头发颜色 = 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1015',
        any: [/TALENT:A:头发颜色 = 2/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1017',
        any: [/TALENT:A:头发颜色 = 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1019',
        any: [/TALENT:A:头发颜色 = 11/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1021',
        any: [/TALENT:A:头发颜色 = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1023',
        any: [/TALENT:A:头发颜色 = 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1025',
        any: [/TALENT:A:头发颜色 = 9/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1029-1030',
        any: [/SIF RAND:5 != 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1032-1033',
        any: [/SIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1035-1036',
        any: [/SIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1038-1041',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1045-1119',
        any: [/@CM_NS_EXP/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1051-1062',
        any: [/P = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1054',
        any: [/P \+= RAND:3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1057',
        any: [/LOCAL:1 = TALENT:A:320 % 1000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1060',
        any: [/LOCAL:1 = TALENT:A:320 % 10000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1064',
        any: [/EXP:A:60 \+= P/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1067-1076',
        any: [/IF TALENT:A:处女 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1068',
        any: [/EXP:A:0 = RAND:8 \+ 1 \+ P/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1069',
        any: [/EXP:A:5 = EXP:A:0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1072',
        any: [/EXP:A:0 = RAND:4 \+ 1 \+ P/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1075',
        any: [/TALENT:A:处女 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1080-1092',
        any: [/IF RAND:30 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1082',
        any: [/EXP:A:10 = RAND:50/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1085',
        any: [/EXP:A:10 = RAND:30/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1088',
        any: [/EXP:A:10 = RAND:20/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1091',
        any: [/EXP:A:10 = RAND:10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1095',
        any: [/SIF CFLAG:A:151 > 150/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1099',
        any: [/SIF TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1103',
        any: [/CALL CHARA_FIRST_EXP, A/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1106-1118',
        any: [/IF CFLAG:A:570 == 0 && TALENT:A:265/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1108-1109',
        any: [/SIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1111-1112',
        any: [/SIF LOCAL > 8/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1113',
        any: [/LOCAL \*= 10/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1114',
        any: [/LOCAL \+= 100 \+ RAND:5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1116-1117',
        any: [/SIF RAND:50 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1118',
        any: [/CFLAG:A:570 = LOCAL/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1122-1380',
        any: [/@CM_CLOTH/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1126',
        any: [/IF TALENT:A:200 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1129',
        any: [/R = 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1131',
        any: [/CFLAG:A:550 = 40/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1132',
        any: [/ELSEIF TALENT:A:战士 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1137',
        any: [/IF CFLAG:A:6 >= 4500 && RAND:3 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1139',
        any: [/R = 214/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1142',
        any: [/CFLAG:A:550 = 51/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1145',
        any: [/CFLAG:A:550 = 52/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1148-1160',
        any: [/IF RAND:6 == 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1162',
        any: [/CFLAG:A:550 = 40/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1164',
        any: [/ELSEIF TALENT:A:201 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1167',
        any: [/R = 103/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1169',
        any: [/CFLAG:A:42 = 85/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1171',
        any: [/CFLAG:A:550 = 41/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1172',
        any: [/ELSEIF TALENT:A:魔法师 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1182',
        any: [/CFLAG:A:42 = 85/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1184',
        any: [/CFLAG:A:550 = 41/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1185',
        any: [/ELSEIF TALENT:A:神官 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1195',
        any: [/CFLAG:A:550 = 46/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1196',
        any: [/ELSEIF TALENT:A:203 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1199',
        any: [/R = 103/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1201',
        any: [/CFLAG:A:550 = 43/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1202',
        any: [/ELSEIF TALENT:A:盗贼 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1212',
        any: [/CFLAG:A:550 = 43/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1213',
        any: [/ELSEIF TALENT:A:205 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1216',
        any: [/R = 105/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1218',
        any: [/CFLAG:A:550 = 40/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1219',
        any: [/ELSEIF TALENT:A:骑士 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1229',
        any: [/CFLAG:A:550 = 40/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1230',
        any: [/ELSEIF TALENT:A:206 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1233',
        any: [/R = 104/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1235',
        any: [/CFLAG:A:550 = 41/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1236',
        any: [/ELSEIF TALENT:A:巫女 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1238',
        any: [/R = 104/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1240',
        any: [/CFLAG:A:550 = 41/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1241',
        any: [/ELSEIF TALENT:A:207 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1244',
        any: [/R = 110/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1246',
        any: [/CFLAG:A:550 = 44/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1247',
        any: [/ELSEIF TALENT:A:忍者 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1249',
        any: [/R = 110/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1251',
        any: [/CFLAG:A:550 = 44/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1252',
        any: [/ELSEIF TALENT:A:208 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1255',
        any: [/R = 103/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1257',
        any: [/CFLAG:A:550 = 45/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1258',
        any: [/ELSEIF TALENT:A:弓手 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1268',
        any: [/CFLAG:A:550 = 45/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1269',
        any: [/ELSEIF TALENT:A:种族2 == 2 \|\| TALENT:A:137 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1271',
        any: [/R = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1273',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1274',
        any: [/ELSEIF TALENT:A:种族2 == 3/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1283',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1284',
        any: [/ELSEIF TALENT:A:种族2 == 4/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1298',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1299',
        any: [/ELSEIF TALENT:A:种族2 == 5/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1313',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1314',
        any: [/ELSEIF TALENT:A:种族2 == 6/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1327-1328',
        any: [/SIF TALENT:A:122 && R == 201/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1330',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1331',
        any: [/ELSEIF TALENT:A:精英 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1347',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1348',
        any: [/ELSEIF TALENT:A:精英 == 1 && TALENT:A:122/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1354',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1355',
        any: [/R = 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1357',
        any: [/CFLAG:A:550 = 42/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1362',
        any: [/CFLAG:A:550 \+= RAND:10 \* 100000/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1364',
        any: [/CFLAG:A:41 = R/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1365',
        any: [/CFLAG:A:45 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1366',
        any: [/CFLAG:A:46 = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1367',
        any: [/R = 0/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1368-1371',
        any: [/X = TARGET/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1373-1374',
        any: [/SIF TALENT:A:48 == 1/],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_MAKE.ERB',
        ref: '1380',
        any: [/RETURN 0/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
