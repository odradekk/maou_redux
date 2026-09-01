// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-caress.mjs

export const FILES = [
  // —— #219（J9 爱抚系 0-9）：COM1-9 真身 / COM_ABLE0-9 / TRAIN_MESSAGE_B/A
  //    分支 / GET_ADV_COM 规则的全部行号引用（锚文本 = ERB 区间内首个
  //    非注释行的整行字面） ——
  {
    js: 'ere/system/train/com-caress.js',
    refs: [
      // —— target/ERB/調教相關/COMF0_愛撫.ERB ——
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '7-168',
        any: [/@COM0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '9',
        any: [/PRINTL 爱抚/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '11',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '16-17',
        any: [/LOSEBASE:0 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '20-30',
        any: [/SOURCE:0 = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '33',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '35',
        any: [/SOURCE:3 = 25/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '36-55',
        any: [/ELSEIF ABL:0 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '56-75',
        any: [/SOURCE:3 \+= 25/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '76-121',
        any: [
          /IF  \(STAIN:0 \& 1 \|\| STAIN:0 \& 4 \|\| STAIN:0 \& 8 \|\| STAIN:0 \& 32\) \&\& ASSIPLAY/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '122-128',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '130-134',
        any: [/STAIN:1 \|= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '136-140',
        any: [/STAIN:3 \|= STAIN:PLAYER:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '141',
        any: [/STAIN:PLAYER:1 \|= STAIN:5/],
      },
      { src: 'target/ERB/調教相關/COMF0_愛撫.ERB', ref: '142', any: [/ENDIF/] },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '148',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '148-156',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '149',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '150-174',
        any: [/PRINTL \+5/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '158-166',
        any: [/E = 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '168',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '176-177',
        any: [/PRINT ≪摸来摸去≫/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '181-182',
        any: [/LOSEBASE:0 \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '185-186',
        any: [/SOURCE:0 = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '187-190',
        any: [/SOURCE:17 = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '191-195',
        any: [/SOURCE:4 = 60/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '198-200',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '201-203',
        any: [/ELSEIF ABL:0 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '204-221',
        any: [/ELSEIF ABL:0 == 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '222-227',
        any: [/ELSEIF ABL:1 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '228-230',
        any: [/ELSEIF ABL:1 == 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF0_愛撫.ERB',
        ref: '231-233',
        any: [/ELSEIF ABL:1 == 4/],
      },
      // —— target/ERB/調教相關/COMF1_クンニ.ERB ——
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '8-86',
        any: [/LOCAL = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '12-17',
        any: [/LOCAL = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '19',
        any: [/PRINTL 舔阴/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '21',
        any: [/CALL TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '26',
        any: [/LOSEBASE:0 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '27',
        any: [/LOSEBASE:1 \+= 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '29',
        any: [/SOURCE:10 = 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '31',
        any: [/SOURCE:14 = 50/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '34-43',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '44-47',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '49-50',
        any: [/IF TALENT:PLAYER:52 \|\| TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '51-52',
        any: [/SOURCE:16 \+= SOURCE:0\/20/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '55-59',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '62-65',
        any: [/STAIN:3 \|= STAIN:PLAYER:0/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '69-73',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF1_クンニ.ERB',
        ref: '76',
        any: [/IF CFLAG:PLAYER:16 == \-1/],
      },
      // —— target/ERB/調教相關/COMF2_アナル愛撫.ERB ——
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '8-152',
        any: [/PRINTL 肛门爱抚/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '16',
        any: [/LOSEBASE:0 \+= 20/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '17',
        any: [/LOSEBASE:1 \+= 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '20',
        any: [/SOURCE:14 = 200/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '23-43',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '44-65',
        any: [/IF EXP:1 < EXPLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '66-81',
        any: [/SOURCE:6 = 100/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '82-93',
        any: [/ELSEIF PALAM:3 < PALAMLV:3/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '94-96',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '97-106',
        any: [/IF PALAM:5 < PALAMLV:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '107-110',
        any: [/TIMES SOURCE:2 , 1\.30/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '111-113',
        any: [/TIMES SOURCE:13, 1\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '115-126',
        any: [/SIF TALENT:263/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '127-141',
        any: [/TIMES SOURCE:14 , 0\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '143-150',
        any: [/IF TEQUIP:90/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '151',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '156',
        any: [/S = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '158-164',
        any: [/IF ABL:3 <= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '165-169',
        any: [/S = 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF2_アナル愛撫.ERB',
        ref: '173',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      // —— target/ERB/調教相關/COMF3_自慰.ERB ——
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '14-31',
        any: [/LOCAL = 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '14-379',
        any: [/LOCAL = 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '32-189',
        any: [/IF TEQUIP:11 \&\& TEQUIP:13/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '161-162',
        any: [/PRINT  \-/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '190',
        any: [/PRINTV A/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '194-201',
        any: [/V = 33/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '204-211',
        any: [/SIF A < V/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '216-223',
        any: [/SIF A < V/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '228-235',
        any: [/LOSEBASE:0 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '238-253',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '254-259',
        any: [/SOURCE:12 = 2600/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '260-265',
        any: [/ELSEIF ABL:0 == 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '266-272',
        any: [/SOURCE:12 = 3500/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '273-279',
        any: [/ELSEIF ABL:1 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '280-286',
        any: [/SOURCE:17 = 1100/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '288-294',
        any: [/IF ABL:2 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '295-301',
        any: [/A \+= 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '302-309',
        any: [/D \+= 1000/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '310-335',
        any: [/IF EXP:0 < EXPLV:2/],
      },
      { src: 'target/ERB/調教相關/COMF3_自慰.ERB', ref: '336', any: [/ENDIF/] },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '339',
        any: [/IF TEQUIP:13/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '344-361',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '344',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '345',
        any: [/B \+= 40/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '346',
        any: [/D \+= 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '347',
        any: [/ELSEIF ABL:3 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '348',
        any: [/B \+= 120/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '349',
        any: [/D \+= 400/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '350',
        any: [/ELSEIF ABL:3 == 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '351',
        any: [/B \+= 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '352-355',
        any: [/D \+= 700/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '356-371',
        any: [/ELSEIF ABL:3 == 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '372-380',
        any: [/TIMES B , 1\.10/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '381-408',
        any: [/TIMES B , 1\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '409-437',
        any: [/SOURCE:0 = 800/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '438',
        any: [/D = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '439',
        any: [/ELSEIF ABL:2 == 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '440-511',
        any: [/SOURCE:1 = 400/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '512-515',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '516-531',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '532-584',
        any: [/C \+= 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '586-633',
        any: [/SIF TALENT:100/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '634-686',
        any: [/TIMES B , 1\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '687-734',
        any: [/TIMES SOURCE:2 , 1\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '735-761',
        any: [/TIMES SOURCE:0 , 1\.50/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '762-788',
        any: [/TIMES SOURCE:12, 1\.20/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '789-824',
        any: [/TIMES SOURCE:2 , 1\.70/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '826-828',
        any: [/PALAM:3 \/= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '833-849',
        any: [/IF TEQUIP:53 \|\| TEQUIP:54/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '851-858',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '859-885',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '888',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '889',
        any: [/SOURCE:0 = 15/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '890-898',
        any: [/SOURCE:12 = 2000/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '899',
        any: [/SOURCE:13 = 1200/],
      },
      {
        src: 'target/ERB/調教相關/COMF3_自慰.ERB',
        ref: '900',
        any: [/ELSEIF ABL:0 == 3/],
      },
      // —— target/ERB/調教相關/COMF4_フェラする.ERB ——
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '9-75',
        any: [/LOCAL = 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '18',
        any: [/PRINTL 口交\(主\)/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '25',
        any: [/LOSEBASE:0 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '28',
        any: [/SOURCE:12 = 220/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '32-41',
        any: [/IF ABL:0 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '42-45',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '47-48',
        any: [/IF TALENT:PLAYER:52 \|\| TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '53-61',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '67-70',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '71',
        any: [/ELSEIF TALENT:122 == 1 \&\& TALENT:PLAYER:122 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '72',
        any: [/PRINTS EXPNAME:41/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '73-78',
        any: [/PRINTL \+3/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '79',
        any: [/CFLAG:PLAYER:16 = 201/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '108-110',
        any: [/A = NO:PLAYER/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '111-112',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '113-114',
        any: [/SIF ABL:0 <= 4 \|\| TEQUIP:90 \|\| TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '116',
        any: [/SIF RELATION:TARGET:A < 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '117',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF4_フェラする.ERB',
        ref: '118',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%的阴茎被吸啜着，%SAVESTR:TARGET%开始精通这个了…/,
        ],
      },
      // —— target/ERB/調教相關/COMF5_胸愛撫.ERB ——
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '11-103',
        any: [/LOCAL = 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '34-44',
        any: [/IF ABL:1 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '45-46',
        any: [/SOURCE:3 = 200/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '47-51',
        any: [/SOURCE:17 = 2000/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '52-56',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '59-81',
        any: [/IF TALENT:PLAYER:131 \&\& TEQUIP:89 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '82-84',
        any: [/TIMES SOURCE:17 , 1\.40/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '87-88',
        any: [/STAIN:5 \|= STAIN:PLAYER:0/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '89-90',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '92-100',
        any: [/STAIN:5 \|= STAIN:PLAYER:1/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '101-105',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '106',
        any: [/PRINTL \+5/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '107',
        any: [/EXP:41 \+= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '116-131',
        any: [/E = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '127-128',
        any: [/A = NO:PLAYER/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '129-130',
        any: [
          /SIF TALENT:130  \|\| TALENT:100 \|\| TALENT:109 \|\| TALENT:122/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '132-133',
        any: [
          /SIF ABL:1 <= 4 \|\| \(TALENT:110 == 0 \&\& TALENT:114 == 0 \&\& TALENT:119 == 0\) \|\| TEQUIP:90 \|\| TEQUIP:89/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '135-136',
        any: [
          /SIF TALENT:PLAYER:132 == 0 \&\& TALENT:PLAYER:131 == 0 \&\& TALENT:PLAYER:135 == 0/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '138',
        any: [
          /SIF RELATION:TARGET:A < 150 \&\& \(ASSIPLAY \|\| TALENT:85 == 0\)/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '139',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF5_胸愛撫.ERB',
        ref: '140',
        any: [/PRINTFORML %SAVESTR:TARGET%的乳房被玩弄着，里面的母乳漏出来了…/],
      },
      // —— target/ERB/調教相關/COMF6_キス.ERB ——
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '9-330',
        any: [/LOCAL = 6/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '12-16',
        any: [/LOCAL = 6/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '24-44',
        any: [/A = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '47-115',
        any: [/SIF TALENT:61/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '118-125',
        any: [/PRINT  \-/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '126-133',
        any: [/SIF S/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '134-141',
        any: [/IF TALENT:62/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '142-153',
        any: [/IF TALENT:63/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '154-159',
        any: [/PRINTS TALENTNAME:71/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '160-166',
        any: [/SIF S/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '168-174',
        any: [/IF TEQUIP:89 \&\& TALENT:136 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '175-182',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '185-191',
        any: [/SIF STAIN:PLAYER:0 \& 8/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '195-202',
        any: [/SIF TEQUIP:89/],
      },
      { src: 'target/ERB/調教相關/COMF6_キス.ERB', ref: '207', any: [/IF Y/] },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '208-214',
        any: [/PRINT  \-/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '215',
        any: [/PRINT 脏、/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '216-238',
        any: [/PRINTS TALENTNAME:62/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '242-258',
        any: [/SIF A < V/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '260',
        any: [/SOURCE:8 = Y\*20 \+ 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '263-264',
        any: [/IF ABL:16 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '265',
        any: [/SOURCE:5 = 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '266-310',
        any: [/TIMES SOURCE:8 , 4\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '311',
        any: [/IF TEQUIP:89/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '312',
        any: [/IF ABL:39 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '313',
        any: [/TIMES SOURCE:8 , 2\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '314-331',
        any: [/ELSEIF ABL:39 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '332-351',
        any: [/TFLAG:100 = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '352-382',
        any: [/SOURCE:3 = 150/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '385-434',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '387-396',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '388',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '389',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '390',
        any: [/PRINTL \+3/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '391',
        any: [/EXP:40 \+= 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '392-411',
        any: [/ELSEIF TALENT:122 == 1 \&\& TALENT:PLAYER:122 == 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '398',
        any: [/;爱情经验/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '398-430',
        any: [/E = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '398-434',
        any: [/E = 1/],
      },
      { src: 'target/ERB/調教相關/COMF6_キス.ERB', ref: '400', any: [/E = 1/] },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '404',
        any: [/E \+= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '408',
        any: [/TFLAG:13 = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '412',
        any: [/E \+= 20/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '412-413',
        any: [/E \+= 20/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '414-419',
        any: [/R = NO:ASSI/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '416-419',
        any: [/SIF RELATION:R == 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '422',
        any: [/TFLAG:200 = 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '424-428',
        any: [/IF CFLAG:PLAYER:16 == \-1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '430-434',
        any: [/IF CFLAG:2 >= 1000 \&\& ASSIPLAY == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '442',
        any: [/TFLAG:30 \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF6_キス.ERB',
        ref: '444',
        any: [/RETURN 1/],
      },
      // —— target/ERB/調教相關/COMF7_秘貝開帳.ERB ——
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '10-11',
        any: [/SIF TEQUIP:53/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '10-245',
        any: [/SIF TEQUIP:53/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '13-131',
        any: [/PRINTL 自己扒开/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '132',
        any: [/PRINT  \-/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '133-140',
        any: [/A \-= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '141-148',
        any: [/SIF S/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '150-157',
        any: [/IF TALENT:0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '158-165',
        any: [/A \-= 5/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '166-173',
        any: [/IF TEQUIP:21/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '176-182',
        any: [/PRINT  =/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '185-196',
        any: [/SIF A < V/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '197-203',
        any: [/SIF A < V/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '204-336',
        any: [/LOSEBASE:0 \+= 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '206',
        any: [/LOSEBASE:0 \+= 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '206-212',
        any: [/LOSEBASE:0 \+= 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '212',
        any: [/SOURCE:14 = 400/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '214-234',
        any: [/IF ABL:2 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '215-221',
        any: [/IF ABL:2 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '222-228',
        any: [/SOURCE:12 = 2100/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '229-235',
        any: [/SOURCE:13 = 2100/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '236-246',
        any: [/IF ABL:16 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '236-247',
        any: [/IF ABL:16 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '248-254',
        any: [/ELSEIF ABL:16 == 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '248-269',
        any: [/ELSEIF ABL:16 == 4/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '257-274',
        any: [/IF ABL:17 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '271-276',
        any: [/TIMES SOURCE:12, 1\.60/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '275',
        any: [/TIMES SOURCE:12, 2\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '276-277',
        any: [/TIMES SOURCE:5, 2\.00/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '278',
        any: [/SOURCE:7 \+= 2500/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '289-291',
        any: [/SIF TALENT:125 == 0 \&\& TALENT:310 <= 20/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '297-299',
        any: [/STAIN:1 \|= STAIN:3/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '305-327',
        any: [/IF ABL:17 >= 3/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '329-333',
        any: [/EXP:40 \+= 2/],
      },
      {
        src: 'target/ERB/調教相關/COMF7_秘貝開帳.ERB',
        ref: '338',
        any: [/RETURN 1/],
      },
      // —— target/ERB/調教相關/COMF8_指挿入れ.ERB ——
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '7-146',
        any: [/@COM8/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '9-11',
        any: [/CALL CONFIRM_LOST_VIRGIN/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '17-24',
        any: [/LOCAL = 8/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '32',
        any: [/LOSEBASE:1 \+= 80/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '38',
        any: [/IF ABL:2 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '39-53',
        any: [/SOURCE:1 = 10/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '54-75',
        any: [/SOURCE:1 = 1800/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '77-78',
        any: [/TIMES SOURCE:13, 1\.20/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '79-94',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '95-105',
        any: [/TIMES SOURCE:1 , 0\.20/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '106-115',
        any: [/TIMES SOURCE:6 , 0\.10/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '116-117',
        any: [/ELSEIF PALAM:5 < PALAMLV:4/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '118-120',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '125-135',
        any: [/IF TALENT:103/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '136-149',
        any: [/SIF EXP:0 == 0 \&\& TALENT:30/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '152',
        any: [/STAIN:PLAYER:1 \|= STAIN:3/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '153-157',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '158-162',
        any: [/S = 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF8_指挿入れ.ERB',
        ref: '164',
        any: [/ELSEIF ABL:2 <= 7/],
      },
      // —— target/ERB/調教相關/COMF9_アナル舐め.ERB ——
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '7-63',
        any: [/@COM9/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '22',
        any: [/SOURCE:12 = 300/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '23',
        any: [/SOURCE:14 = 500/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '26-35',
        any: [/IF ABL:3 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '36-41',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '42',
        any: [/EXP:1 \+= 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '43',
        any: [/PRINTL 肛门经验＋１/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '44',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '45-49',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '50-51',
        any: [/SOURCE:16 \+= SOURCE:0\/20/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '57-61',
        any: [/STAIN:4 \|= STAIN:PLAYER:0/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '64',
        any: [/IF TALENT:122 == 0 \&\& TALENT:PLAYER:122 == 0/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '65',
        any: [/PRINTS EXPNAME:40/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '66-69',
        any: [/PRINTL \+3/],
      },
      {
        src: 'target/ERB/調教相關/COMF9_アナル舐め.ERB',
        ref: '70',
        any: [/EXP:1 \+= 1/],
      },
      // —— target/ERB/調教相關/COMABLE.ERB ——
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '28-34',
        any: [/@COM_ABLE0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '28-381',
        any: [/@COM_ABLE0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '30-31',
        any: [/SIF FLAG:25 \& 1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '32-33',
        any: [/SIF TEQUIP:55/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '39-70',
        any: [/@COM_ABLE1/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '60-66',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '71-112',
        any: [/@COM_ABLE2/],
      },
      { src: 'target/ERB/調教相關/COMABLE.ERB', ref: '94-95', any: [/ELSE/] },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '96-108',
        any: [/IF  PALAM:3 < PALAMLV:2/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '98-100',
        any: [/IF TALENT:ASSI:83/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '113-157',
        any: [/@COM_ABLE3/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '126-129',
        any: [
          /SIF \(ABL:ASSI:10 <= 3 \|\| ABL:ASSI:22 <= 3\) \&\& TALENT:ASSI:87 == 0/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '158-196',
        any: [/@COM_ABLE4/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '170-172',
        any: [/;対象が男人か扶她じゃないとダメ/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '181-183',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '184-188',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '196-216',
        any: [/@COM_ABLE5/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '206-207',
        any: [/SIF \(CFLAG:40 \& 6\) \&\& FLAG:37/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '217-243',
        any: [/@COM_ABLE6/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '244-291',
        any: [/@COM_ABLE7/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '266-267',
        any: [/SIF TEQUIP:11/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '292-336',
        any: [/@COM_ABLE8/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '304-307',
        any: [/IF PALAM:3 < PALAMLV:2 \&\& ASSIPLAY/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '326-327',
        any: [/SIF TALENT:273/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '337-380',
        any: [/@COM_ABLE9/],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '341-344',
        any: [/RETURN 0/],
      },
      // —— target/ERB/調教相關/COMF_JUMP.ERB ——
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '17-28',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '56-66',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\) \&\& TEQUIP:89 == 0/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '71-81',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '86-119',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF_JUMP.ERB',
        ref: '101-107',
        any: [
          /IF \(ASSIPLAY \&\& TFLAG:50\) \|\| \(ASSIPLAY == 0 \&\& TFLAG:50 == 0\)/,
        ],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '28-38',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '28-782',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '28-90',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '39-65',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '66-67',
        any: [/PRINT 狗的舌头舔舐着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '68-89',
        any: [/PRINTFORM %SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '90-91',
        any: [
          /PRINTFORML %SAVESTR:TARGET%圆滚滚的腹部里、微微感觉到胎儿在踢脚……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '94-119',
        any: [/ELSEIF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '94-215',
        any: [/ELSEIF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '94-99',
        any: [/ELSEIF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '99-151',
        any: [/IF E:307 == 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '120-126',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '127-212',
        any: [/PRINTFORM 温柔仔细地舔舐着%SAVESTR:TARGET%的阴唇/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '215-238',
        any: [/ELSEIF SELECTCOM == 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '222-279',
        any: [/ELSEIF E:307 == 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '239-262',
        any: [/SIF PALAM:5 >= PALAMLV:3 \&\& ABL:3 >= 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '267-273',
        any: [/ELSEIF SELECTCOM == 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '274-296',
        any: [/LOCALS:1 = 牝奴/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '297-312',
        any: [/PRINT 羞耻到脸红耳赤地/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '307-332',
        any: [
          /IF TEQUIP:11 \&\& TEQUIP:13 \&\& ABL:2 >= 5 \&\& ABL:3 >= 5 \&\& ABL:0 >= 5 \&\& ABL:1 >= 5 \&\& PALAM:5 >= PALAMLV:4 \&\& PREVCOM == 3/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '332-478',
        any: [/SIF PALAM:5 >= PALAMLV:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '349-362',
        any: [/ELSEIF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '363-410',
        any: [
          /PRINTFORMW 巨魔那粗壮的手指抓起了%SAVESTR:TARGET%的胸部、像榨乳一样使劲揉……/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '385-459',
        any: [/ELSEIF E:307 == 6/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '411-423',
        any: [/PRINTFORM 抚摸着%SAVESTR:TARGET%的白皙肌肤、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '424-491',
        any: [/PRINT 稍小一些的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '495-498',
        any: [/ELSEIF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '499-532',
        any: [/PRINTFORML 舔舐变色了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '533-536',
        any: [/PRINTFORML 的她接吻了……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '537-547',
        any: [/PRINTFORML 滋滋地吸取着彼此的口水、舌头相互纠缠着……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '548-566',
        any: [
          /IF ABL:10 >= 2 \&\& EXP:40 >= 1000 \&\& TALENT:PLAYER:122 == 0 \&\& TFLAG:899 == 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '555-646',
        any: [/SIF \(CFLAG:7 \& 16\) \|\| \(CFLAG:7 \& 32\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '569-581',
        any: [/ELSEIF SELECTCOM == 7/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '582-600',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '588-668',
        any: [/IF CFLAG:40 \& 8 \&\& ABL:17 != 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '601-605',
        any: [/PRINT 屈辱到咬牙切齿地、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '606-608',
        any: [/IF CFLAG:40 \& 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '609-624',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '660-661',
        any: [/ELSEIF SELECTCOM == 8/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '663',
        any: [/IF CFLAG:40 \& 8 \&\& ABL:17 != 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '664-668',
        any: [/PRINTFORM %SAVESTR:PLAYER%把%SAVESTR:TARGET%的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '669-694',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '695-720',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '721-726',
        any: [/PRINTFORML %SAVESTR:TARGET%脸色红润、时不时的娇喘两声…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '727-746',
        any: [
          /PRINTFORML %SAVESTR:TARGET%感受到了手指的感触、努力地忍耐着不让自己叫出声来…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '740-765',
        any: [/ELSEIF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '740-782',
        any: [/ELSEIF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '766-767',
        any: [/PRINTL …/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '768-780',
        any: [/ELSEIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '783-846',
        any: [/ELSEIF SELECTCOM == 10/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '130',
        any: [/ELSEIF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '131',
        any: [
          /PRINTFORML %SAVESTR:TARGET%的私处里、被灌入了怪物黏黏糊糊的精液…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '156-160',
        any: [/ELSEIF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '161-167',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '168-184',
        any: [/SIF TFLAG:7 == 2/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '185-208',
        any: [/PRINTFORML 精液注入到%SAVESTR:TARGET%的嘴里了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '228',
        any: [/ELSEIF SELECTCOM == 123/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '229',
        any: [/IF TALENT:109/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '230-238',
        any: [
          /PRINTFORML %SAVESTR:PLAYER%的阴茎、一边享受胸部的按摩、一边在%SAVESTR:TARGET%的嘴里倾泻精液…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '261-318',
        any: [/IF ABL:32 >= 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '362',
        any: [/ELSEIF SELECTCOM == 55 \&\& TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '363-364',
        any: [/IF PALAM:5 >= PALAMLV:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '365',
        any: [/SIF PALAM:5 >= PALAMLV:5/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '366-370',
        any: [/PRINT 、用炽热地目光看向你/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '746',
        any: [/IF SELECTCOM == 0 \&\& TEQUIP:44 == 0 \&\& TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '746-778',
        any: [/IF SELECTCOM == 0 \&\& TEQUIP:44 == 0 \&\& TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '747-749',
        any: [/A = UP:0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '813-985',
        any: [/ELSEIF SELECTCOM == 1  \&\& TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '846-890',
        any: [/ELSEIF SELECTCOM == 2 \&\& TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '909-945',
        any: [/SIF ABL:17 == 5/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
