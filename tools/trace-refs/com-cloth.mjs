// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：com-cloth.mjs

export const FILES = [
  // —— #228 J18 着装脱衣：ere/system/train/com-cloth.js（COM110/COM111 +
  //    COMABLE.ERB 的两段可用性判定；88 条内联引用的锚） ——
  {
    js: 'ere/system/train/com-cloth.js',
    refs: [
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '8-323',
        any: [/^@COM110$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '12',
        any: [/^PRINTL 穿脱衣服$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '14-17',
        any: [/^CALL WEARING_CLOTH_ALL$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '22-24',
        any: [/^CALL PRINT_CLOTHTYPE$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '27-50',
        any: [/^CALL COM110_ABLE5W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '52-135',
        any: [/^PRINTL  \[100\] - 算了$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '136',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '142-319',
        any: [/^ELSEIF RESULT == 100$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '141-144',
        any: [/^	PRINTFORML %SAVESTR:TARGET%贞操带的钥匙丢掉了。$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '146-160',
        any: [/^ELSEIF RESULT == 0 && T:0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '161-178',
        any: [/^ELSEIF RESULT == 0 && W:0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '179-194',
        any: [/^ELSEIF RESULT == 1 && T:1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '195-216',
        any: [/^ELSEIF RESULT == 1 && W:1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '210-215',
        any: [/^				CFLAG:40 \|= 8$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '217-222',
        any: [/^ELSEIF RESULT == 1 && T:2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '223-228',
        any: [/^ELSEIF RESULT == 1 && W:2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '229-247',
        any: [/^ELSEIF RESULT == 2 && T:3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '248-273',
        any: [/^ELSEIF RESULT == 2 && W:3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '263-267',
        any: [/^		IF CFLAG:41 <= 100$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '270-273',
        any: [/^ELSEIF RESULT == 3 && T:4$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '274-277',
        any: [/^ELSEIF RESULT == 3 && W:4$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '278-287',
        any: [/^ELSEIF RESULT == 4 && T:5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '288-299',
        any: [/^ELSEIF RESULT == 4 && W:5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '300-311',
        any: [/^ELSEIF RESULT == 7 && CFLAG:40 != 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '312-316',
        any: [/^ELSEIF RESULT == 9 && CFLAG:40 != 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '314',
        any: [/^	CALL COM111$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '317-318',
        any: [/^ELSEIF RESULT == 100$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '321',
        any: [/^PRINTL $/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '323',
        any: [/^GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '329-540',
        any: [/^@COM110_ABLE0T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '329-349',
        any: [/^@COM110_ABLE0T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '342-343',
        any: [/^	SIF \(CFLAG:40 & 64\) && CFLAG:42 <= 50$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '351-377',
        any: [/^@COM110_ABLE0W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '379-390',
        any: [/^@COM110_ABLE1T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '392-411',
        any: [/^@COM110_ABLE1W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '400-403',
        any: [/^IF \(CFLAG:40 & 4\) \|\| CFLAG:45 != 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '413-424',
        any: [/^@COM110_ABLE2T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '426-443',
        any: [/^@COM110_ABLE2W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '445-456',
        any: [/^@COM110_ABLE3T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '458-475',
        any: [/^@COM110_ABLE3W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '477-488',
        any: [/^@COM110_ABLE4T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '490-504',
        any: [/^@COM110_ABLE4W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '506-520',
        any: [/^@COM110_ABLE5T$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF110_服の着脱.ERB',
        ref: '522-540',
        any: [/^@COM110_ABLE5W$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '7-168',
        any: [/^@COM111$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '11',
        any: [/^PRINTL 撕破衣服$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '13-16',
        any: [/^CALL WEARING_CLOTH_ALL$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '20-23',
        any: [/^CALL PRINT_CLOTHTYPE$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '25-39',
        any: [/^CALL COM111_ABLE6L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '41-84',
        any: [/^PRINTL  \[100\]- 算了$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '85',
        any: [/^INPUT$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '91-157',
        any: [/^ELSEIF RESULT == 10 && L:0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '91-96',
        any: [
          /^IF RESULT == 10 && \(CFLAG:40 & 64\) && \(CFLAG:42 == 11 \|\| CFLAG:42 == 79\)$/m,
        ],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '97-103',
        any: [/^ELSEIF RESULT == 10 && L:0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '102',
        any: [/^	CFLAG:47 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '104-110',
        any: [/^ELSEIF RESULT == 11 && L:1$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '109',
        any: [/^	CFLAG:45 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '111-120',
        any: [/^ELSEIF RESULT == 12 && L:2$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '119',
        any: [/^	CFLAG:46 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '121-127',
        any: [/^ELSEIF RESULT == 11 && L:3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '126',
        any: [/^	CFLAG:45 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '128-141',
        any: [/^ELSEIF RESULT == 12 && L:4$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '140',
        any: [/^	CFLAG:46 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '142-146',
        any: [/^ELSEIF RESULT == 13 && L:5$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '145',
        any: [/^	CFLAG:44 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '147-151',
        any: [/^ELSEIF RESULT == 14 && L:6$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '150',
        any: [/^	CFLAG:43 = -3$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '151-152',
        any: [/^ELSEIF RESULT == 19$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '153-155',
        any: [/^ELSEIF RESULT == 100$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '156-157',
        any: [/^	GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '159-165',
        any: [/^	PRINTL （已经全裸，撕无可撕）$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '166',
        any: [/^PRINTL $/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '168',
        any: [/^GOTO INPUT_LOOP$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '174-262',
        any: [/^@COM111_ABLE0L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '174-182',
        any: [/^@COM111_ABLE0L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '184-195',
        any: [/^@COM111_ABLE1L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '197-208',
        any: [/^@COM111_ABLE2L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '210-221',
        any: [/^@COM111_ABLE3L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '223-234',
        any: [/^@COM111_ABLE4L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '236-247',
        any: [/^@COM111_ABLE5L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMF111_服を破る.ERB',
        ref: '249-262',
        any: [/^@COM111_ABLE6L$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3662-3678',
        any: [/^@COM_ABLE110$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3664-3665',
        any: [/^SIF TFLAG:224 == 555$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3666-3667',
        any: [/^SIF FLAG:37 == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3670-3671',
        any: [/^SIF CFLAG:41 == 0 && CFLAG:42 == 0$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3672-3681',
        any: [/^SIF TEQUIP:90$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3692-3716',
        any: [/^@COM_ABLE111$/m],
      },
      {
        src: 'target/ERB/調教相關/COMABLE.ERB',
        ref: '3718-3719',
        any: [/^SIF CFLAG:40 == 0$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
