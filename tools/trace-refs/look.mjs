// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #389：LOOK.ERB 全量落地的锚表。
//
// 两个 js 文件对应源文件的六个函数：look-info.js 是 @GET_LOOK_INFO（式中函数，
// 单独成文件为的是消 require 环，见该文件头），look.js 是其余五个。锚一律取
// 源里「全文唯一」的窗口（#298 鉴别力：新文件不允许弱锚），隔着行号的正文
// 就是断言——源那一行改了字，锚即失配。

export const FILES = [
  {
    js: 'ere/chara/look-info.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2885-3775',
        // :2885
        any: [/^\s*@GET_LOOK_INFO\(ARG, ARGS\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2886',
        // :2886
        any: [/^\s*#FUNCTIONS\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2894-2921',
        // :2894
        any: [/^\s*IF ARGS == "发色\(颜色\)"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2894',
        // :2894
        any: [/^\s*IF ARGS == "发色\(颜色\)"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2894-3774',
        // :2894
        any: [/^\s*IF ARGS == "发色\(颜色\)"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2895-2917',
        // :2899
        any: [/^\s*LOCALS = 栗色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2922',
        // :2922
        any: [/^\s*ELSEIF ARGS == "头发颜色"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2922-2948',
        // :2922
        any: [/^\s*ELSEIF ARGS == "头发颜色"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2923-2944',
        // :2925
        any: [/^\s*LOCALS = 金发\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2950-2966',
        // :2950
        any: [/^\s*ELSEIF ARGS == "头发状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2950',
        // :2950
        any: [/^\s*ELSEIF ARGS == "头发状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2951-2963',
        // :2951
        any: [/^\s*SELECTCASE TALENT:ARG:头发状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2967-2977',
        // :2967
        any: [/^\s*ELSEIF ARGS == "头发长度"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2967',
        // :2967
        any: [/^\s*ELSEIF ARGS == "头发长度"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2978',
        // :2978
        any: [/^\s*ELSEIF ARGS == "头发修剪方式"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2978-2990',
        // :2978
        any: [/^\s*ELSEIF ARGS == "头发修剪方式"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2979-2987',
        // :2979
        any: [/^\s*SELECTCASE TALENT:ARG:头发修剪方式\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2991-3019',
        // :2991
        any: [/^\s*ELSEIF ARGS == "发型"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2991',
        // :2991
        any: [/^\s*ELSEIF ARGS == "发型"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2992-3016',
        // :2992
        any: [/^\s*SELECTCASE TALENT:ARG:发型\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3020-3040',
        // :3020
        any: [/^\s*ELSEIF ARGS == "目"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3020',
        // :3020
        any: [/^\s*ELSEIF ARGS == "目"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3021-3037',
        // :3021
        any: [/^\s*SELECTCASE TALENT:ARG:目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3041-3057',
        // :3041
        any: [/^\s*ELSEIF ARGS == "瞳色"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3041',
        // :3041
        any: [/^\s*ELSEIF ARGS == "瞳色"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3042-3054',
        // :3042
        any: [/^\s*SELECTCASE TALENT:ARG:瞳色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3058-3070',
        // :3058
        any: [/^\s*ELSEIF ARGS == "唇"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3058',
        // :3058
        any: [/^\s*ELSEIF ARGS == "唇"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3059-3067',
        // :3059
        any: [/^\s*SELECTCASE TALENT:ARG:唇\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3071',
        // :3071
        any: [/^\s*ELSEIF ARGS == "体型"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3071-3081',
        // :3071
        any: [/^\s*ELSEIF ARGS == "体型"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3082-3094',
        // :3082
        any: [/^\s*ELSEIF ARGS == "乳头"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3082',
        // :3082
        any: [/^\s*ELSEIF ARGS == "乳头"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3083-3091',
        // :3083
        any: [/^\s*SELECTCASE TALENT:ARG:乳头\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3095-3113',
        // :3095
        any: [/^\s*ELSEIF ARGS == "阴毛状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3095',
        // :3095
        any: [/^\s*ELSEIF ARGS == "阴毛状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3114',
        // :3114
        any: [/^\s*ELSEIF ARGS == "魅力点"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3114-3179',
        // :3114
        any: [/^\s*ELSEIF ARGS == "魅力点"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3115-3171',
        // :3115
        any: [/^\s*SELECTCASE TALENT:ARG:魅力点\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3172-3176',
        // :3173
        any: [/^\s*SIF TALENT:ARG:121 == 1 \|\| TALENT:ARG:122 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3180',
        // :3180
        any: [/^\s*ELSEIF ARGS == "癖"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3180-3252',
        // :3180
        any: [/^\s*ELSEIF ARGS == "癖"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3181-3237',
        // :3181
        any: [/^\s*SELECTCASE TALENT:ARG:癖\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3253',
        // :3253
        any: [/^\s*ELSEIF ARGS == "种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3253-3284',
        // :3253
        any: [/^\s*ELSEIF ARGS == "种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3254',
        // :3254
        any: [/^\s*\$INFO_种族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3255-3279',
        // :3255
        any: [/^\s*SELECTCASE TALENT:ARG:种族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3285',
        // :3285
        any: [/^\s*ELSEIF ARGS == "种族2"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3285-3308',
        // :3285
        any: [/^\s*ELSEIF ARGS == "种族2"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3286',
        // :3286
        any: [/^\s*\$INFO_种族2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3287-3305',
        // :3287
        any: [/^\s*SELECTCASE TALENT:ARG:种族2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3307',
        // :3307
        any: [/^\s*LOCALS = TOSTR\(TALENT:ARG:种族2, "\$\$\{0\}"\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3309-3314',
        // :3309
        any: [/^\s*ELSEIF ARGS == "种族12"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3309',
        // :3309
        any: [/^\s*ELSEIF ARGS == "种族12"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3315',
        // :3315
        any: [/^\s*ELSEIF ARGS == "成为勇者前的生活"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3315-3389',
        // :3315
        any: [/^\s*ELSEIF ARGS == "成为勇者前的生活"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3316-3386',
        // :3316
        any: [/^\s*SELECTCASE TALENT:ARG:成为勇者前的生活\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3336-3340',
        // :3336
        any: [/^\s*LOCALS = 乞丐\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3356-3360',
        // :3356
        any: [/^\s*LOCALS = 预言家\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3366-3370',
        // :3366
        any: [/^\s*LOCALS = 面包师\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3378-3382',
        // :3378
        any: [/^\s*LOCALS = 淫乱的产物\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3390',
        // :3390
        any: [/^\s*ELSEIF ARGS == "成为勇者的契机"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3390-3446',
        // :3390
        any: [/^\s*ELSEIF ARGS == "成为勇者的契机"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3391-3443',
        // :3391
        any: [/^\s*SELECTCASE TALENT:ARG:成为勇者的契机\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3447-3459',
        // :3447
        any: [/^\s*ELSEIF ARGS == "阴茎的状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3447',
        // :3447
        any: [/^\s*ELSEIF ARGS == "阴茎的状态"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3448-3456',
        // :3448
        any: [/^\s*SELECTCASE TALENT:ARG:阴茎的状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3460-3472',
        // :3460
        any: [/^\s*ELSEIF ARGS == "职业"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3460',
        // :3460
        any: [/^\s*ELSEIF ARGS == "职业"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3462',
        // :3462
        any: [/^\s*FOR LOCAL, 200, 229\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3473',
        // :3473
        any: [/^\s*ELSEIF ARGS == "性格"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3473-3489',
        // :3473
        any: [/^\s*ELSEIF ARGS == "性格"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3475',
        // :3475
        any: [/^\s*FOR LOCAL, 160, 179\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3490',
        // :3490
        any: [/^\s*ELSEIF ARGS == "婚史"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3490-3561',
        // :3490
        any: [/^\s*ELSEIF ARGS == "婚史"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3516-3522',
        // :3522
        any: [/^\s*LOCALS \+= "结婚"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3527-3533',
        // :3533
        any: [/^\s*LOCALS \+= "离婚"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3538-3544',
        // :3544
        any: [/^\s*LOCALS \+= "复婚"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3549-3555',
        // :3555
        any: [/^\s*LOCALS \+= "离婚后重新结婚"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3562-3673',
        // :3562
        any: [/^\s*ELSEIF ARGS == "家族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3562',
        // :3562
        any: [/^\s*ELSEIF ARGS == "家族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3564-3587',
        // :3564
        any: [/^\s*;両親指定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3599-3601',
        // :3601
        any: [/^\s*LOCAL:1 = LOCAL \/ 10000 % 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3606-3612',
        // :3612
        any: [/^\s*ELSEIF LOCAL:1 == 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3615-3621',
        // :3619-3621
        any: [/^\s*LOCALS \+= "妻子"\s*\n\s*ENDSELECT\s*\n\s*ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3623',
        // :3623
        any: [/^\s*;娘の有無\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3623-3672',
        // :3623
        any: [/^\s*;娘の有無\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3672-3673',
        // :3672
        any: [/^\s*LOCALS = 孤身一人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3674-3703',
        // :3674
        any: [/^\s*ELSEIF ARGS == "原种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3674',
        // :3674
        any: [/^\s*ELSEIF ARGS == "原种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3675-3699',
        // :3675
        any: [/^\s*SELECTCASE TALENT:ARG:原种族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3704-3709',
        // :3704
        any: [/^\s*ELSEIF ARGS == "现种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3704',
        // :3704
        any: [/^\s*ELSEIF ARGS == "现种族"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3710',
        // :3710
        any: [/^\s*ELSEIF ARGS == "常识改变【战斗】"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3710-3738',
        // :3710
        any: [/^\s*ELSEIF ARGS == "常识改变【战斗】"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3711-3735',
        // :3711
        any: [/^\s*SELECTCASE  TALENT:ARG:281\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3739',
        // :3739
        any: [/^\s*ELSEIF ARGS == "常识改变【日常】"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3739-3765',
        // :3739
        any: [/^\s*ELSEIF ARGS == "常识改变【日常】"\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3740-3764',
        // :3740
        any: [/^\s*SELECTCASE  TALENT:ARG:283\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '3772-3773',
        // :3772-3773
        any: [/^\s*ELSE\s*\n\s*LOCALS =\s*$/m],
      },
    ],
  },
  {
    js: 'ere/chara/look.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '4-813',
        // :4
        any: [/^\s*@LOOK_SET, ARG\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '7-61',
        // :7-61（头发颜色：11 档 + stick 修改注释）
        any: [
          /^\s*;\(stick修改\)10、11、48注释掉，强制每个人物生成发色，修正人物无发色的问题\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '10-12',
        // :10-12（已设定则整段跳过：TALENT:300 > 0）
        any: [/^\s*;設定済み\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '13-15',
        // :13-15（Q = RAND:100，随即被 SELECTCASE 的 RAND:100 覆盖）
        any: [/^\s*Q = RAND:100\s*\n\s*\n\s*; 0- 4 粉髪  5%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '15-59',
        // :15-59（发色概率注释表 + SELECTCASE 的 11 档）
        any: [/^\s*; 0- 4 粉髪  5%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '63-83',
        // :63-83（头发状态 6 档）
        any: [/^\s*;头发状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '63-64',
        // :63-64（头发状态掷点 Q = RAND:12）
        any: [/^\s*;头发状态\s*\n\s*Q = RAND:12\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '65-67',
        // :65-67（直毛）
        any: [/^\s*;直毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '68-70',
        // :68-70（カール）
        any: [/^\s*;カール\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '71-73',
        // :71-73（内カール）
        any: [/^\s*;内カール\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '74-76',
        // :74-76（外カール）
        any: [/^\s*;外カール\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '77-79',
        // :77-79（癖毛）
        any: [/^\s*;癖毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '80-82',
        // :80-82（ウェーブ）
        any: [/^\s*;ウェーブ\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '85-97',
        // :85-97（头发长度三档：ボーイッシュ恒短发）
        any: [/^\s*;头发长度　ボーイッシュなら常にショート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '87-88',
        // :87-88（头发长度掷点 Q = RAND:6）
        any: [/^\s*Q = RAND:6\s*\n\s*IF Q <= 1 \|\| TALENT:TARGET:135\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '88-90',
        // :88-90（ショート）
        any: [/^\s*;ショート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '91-93',
        // :91-93（セミロング）
        any: [/^\s*;セミロング\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '94-96',
        // :94-96（ロング）
        any: [/^\s*;ロング\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '99-114',
        // :99-114（头发修剪方式：ELSEIF 3/4 不可达）
        any: [/^\s*;头发修剪方式\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '101-102',
        // :101-102（头发修剪方式掷点 Q = RAND:6）
        any: [/^\s*Q = RAND:6\s*\n\s*IF Q >= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '102-113',
        // :102-113（头发修剪方式：Q >= 2 吃掉 ELSEIF 3/4 两支）
        any: [/^\s*IF Q >= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '116-130',
        // :116-130（髪型：长度决定可掷范围 + Q += 1）
        any: [/^\s*;髪型\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '122-128',
        // :122-128（短 / 半长 / 长三段各掷 RAND:3 / 10 / 12）
        any: [/^\s*IF TALENT:302 >= 1 && TALENT:302 <= 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '129-130',
        // :129-130（Q += 1 后写入 TALENT:304）
        any: [/^\s*TALENT:304 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '132-166',
        // :132-166（目 8 档）
        any: [/^\s*;目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '133-134',
        // :133-134（目掷点 Q = RAND:100）
        any: [/^\s*Q = RAND:100\s*\n\s*; 0-10 切れ長 11%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '142-144',
        // :142-144（切れ長）
        any: [/^\s*;切れ長\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '145-147',
        // :145-147（大きい）
        any: [/^\s*;大きい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '148-150',
        // :148-150（神秘的）
        any: [/^\s*;神秘的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '151-153',
        // :151-153（釣り目）
        any: [/^\s*;釣り目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '154-156',
        // :154-156（潤み目）
        any: [/^\s*;潤み目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '157-159',
        // :157-159（たれ目）
        any: [/^\s*;たれ目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '160-162',
        // :160-162（三白眼）
        any: [/^\s*;三白眼\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '163-165',
        // :163-165（標準）
        any: [/^\s*TALENT:TARGET:305 = 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '168-188',
        // :168-188（瞳色 6 档）
        any: [/^\s*;瞳色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '168-169',
        // :168-169（瞳色掷点 Q = RAND:100）
        any: [/^\s*;瞳色\s*\n\s*Q = RAND:100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '170-172',
        // :170-172（碧）
        any: [/^\s*;碧\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '173-175',
        // :173-175（ブラウン）
        any: [/^\s*;ブラウン\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '176-178',
        // :176-178（黒）
        any: [/^\s*;黒\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '179-181',
        // :179-181（グレー）
        any: [/^\s*;グレー\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '182-184',
        // :182-184（ゴールド）
        any: [/^\s*;ゴールド\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '185-187',
        // :185-187（クリムゾン）
        any: [/^\s*;クリムゾン\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '190-204',
        // :190-204（唇 4 档（肉感的起头））
        any: [/^\s*;肉感的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '190-191',
        // :190-191（唇掷点 Q = RAND:6）
        any: [/^\s*;唇\s*\n\s*Q = RAND:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '192-194',
        // :192-194（肉感的）
        any: [/^\s*;肉感的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '195-197',
        // :195-197（薄い）
        any: [/^\s*TALENT:TARGET:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '198-200',
        // :198-200（瑞々しい）
        any: [/^\s*;瑞々しい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '201-203',
        // :201-203（標準）
        any: [/^\s*TALENT:TARGET:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '206-207',
        // :206-207（体型掷点 Q = RAND:3）
        any: [/^\s*;体型\s*\n\s*Q = RAND:3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '206-217',
        // :206-217（体型 3 档（丰满的起头））
        any: [/^\s*TALENT:TARGET:308 = 300\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '208-210',
        // :208-210（丰满）
        any: [/^\s*;丰满\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '211-213',
        // :211-213（骨感）
        any: [/^\s*;骨感\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '214-216',
        // :214-216（標準）
        any: [/^\s*TALENT:TARGET:308 = 150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '219-233',
        // :219-233（乳头 4 档（ピンク的起头））
        any: [/^\s*TALENT:TARGET:309 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '219-220',
        // :219-220（乳头掷点 Q = RAND:6）
        any: [/^\s*;乳头\s*\n\s*Q = RAND:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '221-223',
        // :221-223（ピンク）
        any: [/^\s*;ピンク\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '224-226',
        // :224-226（褐色）
        any: [/^\s*;褐色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '227-229',
        // :227-229（陥没）
        any: [/^\s*;陥没\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '230-232',
        // :230-232（標準）
        any: [/^\s*TALENT:TARGET:309 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '235-255',
        // :235-255（阴毛 6 档（産毛的起头））
        any: [/^\s*TALENT:TARGET:311 = 20\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '235-236',
        // :235-236（阴毛掷点 Q = RAND:150）
        any: [/^\s*;陰毛\s*\n\s*Q = RAND:150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '237-239',
        // :237-239（無）
        any: [/^\s*;無\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '240-242',
        // :240-242（産毛）
        any: [/^\s*;産毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '243-245',
        // :243-245（薄い）
        any: [/^\s*TALENT:TARGET:311 = 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '246-248',
        // :246-248（標準）
        any: [/^\s*TALENT:TARGET:311 = 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '249-251',
        // :249-251（濃い）
        any: [/^\s*;濃い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '252-254',
        // :252-254（剛毛）
        any: [/^\s*;剛毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '256',
        // :256（阴毛状态同步为生长极限）
        any: [/^\s*TALENT:TARGET:310 = TALENT:TARGET:311\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '258-273',
        // :258-273（ペニス 4 档（普通的起头））
        any: [/^\s*TALENT:TARGET:318 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '259-260',
        // :259-260（ペニス掷点 Q = RAND:150）
        any: [/^\s*;有無にかかわらず設定は入れておく\s*\n\s*Q = RAND:150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '261-263',
        // :261-263（普通）
        any: [/^\s*;普通\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '264-266',
        // :264-266（包茎）
        any: [/^\s*;包茎\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '267-269',
        // :267-269（短小包茎）
        any: [/^\s*;短小包茎\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '270-272',
        // :270-272（巨根）
        any: [/^\s*;巨根\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '275-277',
        // :275-277（包茎・短小包茎可能得早泄）
        any: [/^\s*;包茎・短小包茎は早漏を得ることがあるように\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '279-302',
        // :279-302（魅力点：$CHARMPOINT + 两处 GOTO 重掷）
        any: [/^\s*\$CHARMPOINT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '280-282',
        // :280-282（$CHARMPOINT 标号与 Q = RAND:28 + 1）
        any: [/^\s*\$CHARMPOINT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '284-286',
        // :284-286（贫乳掷到 12 重掷）
        any: [/^\s*;贫乳は美乳になれない\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '293-300',
        // :293-300（魅力点 24：扶她机会与重掷）
        any: [/^\s*;自前のペニス持ちなら追加のふたなり獲得チャンス\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '297-299',
        // :297-299（成不了扶她就重掷）
        any: [/^\s*;ふたなりになれなければチャームポイント決め直し\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '295',
        // :295
        any: [/^\s*SIF RAND:40 == 0 && TALENT:TARGET:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '302',
        // :302（TALENT:312 = Q）
        any: [/^\s*TALENT:TARGET:312 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '305-315',
        // :306
        any: [/^\s*\$HABIT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '306-308',
        // :306
        any: [/^\s*\$HABIT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '310-312',
        // :310
        any: [/^\s*;話せないなら決め台詞はありえない\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '315',
        // :315
        any: [/^\s*TALENT:TARGET:313 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '320-487',
        // :320-487（$RACE 段整体）
        any: [/^\s*\$RACE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '328-329',
        // :328
        any: [/^\s*;精英は种族随机作成を行わないように修正。\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '330',
        // :330
        any: [/^\s*Q = RAND:200\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '331-333',
        // :331
        any: [/^\s*IF \(ARG == 0 && Q <= 99\) \|\| ARG == -1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '334-350',
        // :334
        any: [/^\s*ELSEIF \(ARG == 0 && Q <= 119\) \|\| ARG == 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '340-345',
        // :340
        any: [
          /^\s*;ドワーフとホビットには巨乳と大柄は付かない（絶壁と爆乳、超乳も付かない）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '346-350',
        // :346
        any: [/^\s*;ホビットは陰毛が無毛になりやすい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '351-367',
        // :351
        any: [/^\s*ELSEIF \(ARG == 0 && Q <= 139\) \|\| ARG == 11\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '363-367',
        // :363
        any: [/^\s*;ドワーフは陰毛が剛毛になりやすい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '368-372',
        // :368-372（エルフ（善恶值 +20））
        any: [/^\s*;エルフ\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '373-378',
        // :373-378（人狼（善恶值 -20））
        any: [/^\s*TALENT:TARGET:314 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '379-383',
        // :379-383（吸血鬼（善恶值 -40））
        any: [/^\s*;吸血鬼\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '384-391',
        // :384-391（无头骑士（暗之能力者机会 + 善恶值 -40））
        any: [/^\s*;无头骑士\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '392-396',
        // :392-396（ドラゴン（角））
        any: [/^\s*;ドラゴン\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '397-399',
        // :397-399（その他指定の種族）
        any: [/^\s*;その他指定の種族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '400-408',
        // :400-408（天使（光之能力者机会 + 善恶值 +40））
        any: [/^\s*;天使\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '409-487',
        // :409-487（精英一侧：种族 9 + 种族2 特性）
        any: [/^\s*;精英の場合はこちら\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '412',
        // :412（TALENT:319 的读点）
        any: [/^\s*IF TALENT:319 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '412-420',
        // :412-420（亜人）
        any: [/^\s*;亜人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '416-420',
        // :416-420（亜人阴毛倾向）
        any: [/^\s*;亜人は陰毛が剛毛になりやすい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '421-428',
        // :421-428（史莱姆（無毛））
        any: [/^\s*;史莱姆\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '429-434',
        // :429-434（昆虫（战术））
        any: [/^\s*;昆虫\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '435-441',
        // :435
        any: [/^\s*ELSEIF TALENT:319 == 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '442-446',
        // :442
        any: [/^\s*ELSEIF TALENT:319 == 5 \|\| TALENT:319 == 11\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '447-461',
        // :447-461（妖精）
        any: [/^\s*;妖精\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '454-456',
        // :454-456（妖精多半幼稚）
        any: [/^\s*;妖精の大半は幼稚である\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '457-461',
        // :457-461（妖精阴毛倾向）
        any: [/^\s*;妖精は陰毛が無毛になりやすい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '462-463',
        // :462-463（巨人（无追加设定））
        any: [/^\s*;巨人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '464-475',
        // :464-475（男＆女魔族）
        any: [/^\s*;男＆女魔族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '476-486',
        // :476-486（獣＆馬：恒真臂）
        any: [/^\s*;獣＆馬\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '476',
        // :476（獣＆馬的恒真臂（源写 ELSEIF TALENT:319 == 10 || 12））
        any: [/^\s*ELSEIF TALENT:319 == 10 \|\| 12\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '496-589',
        // :496-589（$BORN 段整体）
        any: [/^\s*\$BORN\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '496-498',
        // :496-498（$BORN 标号与 Q = RAND:21 + 1）
        any: [/^\s*\$BORN\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '500-502',
        // :500-502（配下的特别元职业）
        any: [/^\s*;配下の場合、特別な元職業\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '503-505',
        // :503-505（不会法术则修道女重掷）
        any: [/^\s*;法術を知らない場合修道女にはなれない\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '506-558',
        // :506-558（妓女・物乞い・奴隷支整体）
        any: [/^\s*;妓女・物乞い・奴隷の場合、経験がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '508-514',
        // :508-514（童貞オトコ）
        any: [/^\s*;童貞オトコの場合\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '515-521',
        // :515-521（オトコ）
        any: [/^\s*;オトコの場合\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '522-528',
        // :522-528（处女）
        any: [/^\s*;处女の場合\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '529-537',
        // :529-537（非处女且肛交使用）
        any: [/^\s*;非处女でアナルも使用している\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '538-544',
        // :538-544（非处女仅私处）
        any: [/^\s*;非处女でVのみ\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '547-552',
        // :547-552（刺青机会）
        any: [/^\s*;妓女と奴隷は、刺青を入れられていることがある\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '549',
        // :549（LOCAL = RAND:8 + 10）
        any: [/^\s*LOCAL = RAND:8 \+ 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '550',
        // :550（LOCALS:10 十项候选表）
        any: [
          /^\s*LOCALS:10 '= "淫乱" , "母猪" , "蛇" , "蜘蛛女郎" , "薔薇" , "肉便器" , "便女" , "阴茎图画" , "性器标志" , "骷髅"\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '551',
        // :551（CSTR:LOCAL = %LOCALS:LOCAL%）
        any: [/^\s*CSTR:LOCAL = %LOCALS:LOCAL%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '554-556',
        // :554-556（生育经验机会）
        any: [/^\s*SIF TALENT:0 == 0 && RAND:15 == 0 && TALENT:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '557-558',
        // :557-558（善恶值 -30）
        any: [/^\s*;そして善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '559-561',
        // :559-561（修道女・貴族・巫女・聖女・予言者善恶值 +30）
        any: [/^\s*;修道女・貴族・巫女・聖女・予言者は善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '561-564',
        // :561-564（光之能力者机会）
        any: [
          /^\s*CALL karma, TARGET, 30\s*\n\s*;光之能力者になるチャンス\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '565-567',
        // :565-567（盗人善恶值 -40）
        any: [/^\s*;盗人は善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '568-587',
        // :568-587（主婦支：经验 + 确定子持ち）
        any: [/^\s*;主婦は経験がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '589',
        // :589（TALENT:315 = Q）
        any: [/^\s*TALENT:TARGET:315 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '592-608',
        // :592-608（$REASON 段整体）
        any: [/^\s*\$REASON\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '592-594',
        // :592-594（$REASON 的 Q = RAND:20 + 1）
        any: [/^\s*\$REASON\s*\n\s*Q = RAND:20\s*\n\s*Q \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '599',
        // :599（SIF Q >103 && EX_TALENT:2，源里恒假）
        any: [/^\s*SIF Q >103 && EX_TALENT:2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '596-598',
        // :596-598（配下的特别理由）
        any: [/^\s*;配下の場合、特別な理由\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '599-600',
        // :599-600（SIF Q >103 && EX_TALENT:2，源里恒假）
        any: [/^\s*SIF Q >103 && EX_TALENT:2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '601-603',
        // :601-603（運命・啓示・使命・故郷・平和・正義善恶值 +20）
        any: [/^\s*;運命・啓示・使命・故郷・平和・正義は善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '604-606',
        // :604-606（金・自暴自棄・命令善恶值 -20）
        any: [/^\s*;金・自暴自棄・命令は善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '582-583',
        // :582-583（失去处女）
        any: [/^\s*TALENT:0 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '584-585',
        // :584-585（失去私处封印）
        any: [/^\s*TALENT:273 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '586-587',
        // :586-587（必得人妻）
        any: [/^\s*TALENT:157 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '608',
        // :608（TALENT:316 = Q）
        any: [/^\s*TALENT:TARGET:316 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '611-621',
        // :611-621（$LOVE 段整体）
        any: [/^\s*\$LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '611-613',
        // :611-613（$LOVE 的 Q = RAND:20 + 1）
        any: [/^\s*\$LOVE\s*\n\s*Q = RAND:20\s*\n\s*Q \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '614-616',
        // :614-616（恋人・家族・使命・故郷・憧れ善恶值 +20）
        any: [/^\s*;恋人・家族・使命・故郷・憧れは善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '617-619',
        // :617-619（金・装飾品・宝石善恶值 -20）
        any: [/^\s*;金・装飾品・宝石は善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '621',
        // :621（TALENT:317 = Q）
        any: [/^\s*TALENT:TARGET:317 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '641-808',
        // :645-808（$FAMILY 段整体）
        any: [/^\s*\$FAMILY\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '646-647',
        // :646-647（LOCAL = 0 / MARRY = 0）
        any: [/^\s*LOCAL = 0\s*\n\s*MARRY = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '644-682',
        // :644-682（結婚相手の設定）
        any: [/^\s*;結婚相手の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '641-642',
        // :641-642（非精英：家族构成个位置 1）
        any: [/^\s*SIF TALENT:220 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '650-659',
        // :650-659（人妻：バツ2）
        any: [/^\s*LOCAL \+= 30\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '660-661',
        // :660-661（現在の状況…結婚：LOCAL += 10000）
        any: [/^\s*;現在の状況…結婚\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '663-682',
        // :663-682（離婚または未亡人）
        any: [/^\s*ELSEIF RAND:20 == 0 && EX_TALENT:TARGET:2 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '684-737',
        // :684-737（子供の設定：非処女限定）
        any: [/^\s*;子供の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '686-700',
        // :686-700（主婦支：先加后判 break）
        any: [/^\s*IF TALENT:315 == 21 && TALENT:0 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '701-716',
        // :701-716（结婚经历支：先判后加）
        any: [/^\s*ELSEIF LOCAL >= 10 && TALENT:0 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '717-736',
        // :717-736（未婚の母支：娼婦上限 +2）
        any: [/^\s*ELSEIF RAND:20 == 0 && TALENT:0 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '720',
        // :720（LOCAL:2 = 2）
        any: [/^\s*LOCAL:2 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '721-723',
        // :721-723（娼婦上限 +2）
        any: [/^\s*SIF TALENT:315 == 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '739-759',
        // :739-759（兄弟姉妹の設定）
        any: [/^\s*;兄弟姉妹の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '761-805',
        // :761-805（性別の設定：人妻の場合）
        any: [/^\s*;性別の設定（人妻の場合）\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '762-775',
        // :762-775（オトコ）
        any: [/^\s*IF TALENT:122 == 1 && MARRY == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '767-768',
        // :767-768（BLっ気補正 = 3）
        any: [/^\s*;BLっ気補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '776-791',
        // :776-791（ふたなり）
        any: [/^\s*ELSEIF TALENT:121 == 1 && MARRY == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '780-782',
        // :780-782（百合气质補正 = 3（希少なふたなり））
        any: [/^\s*LOCAL \+= 5000000000\s*\n\s*;百合气质補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '788-790',
        // :788-790（百合气质補正 = 3（ふた女））
        any: [/^\s*LOCAL \+= 3000000000\s*\n\s*;百合气质補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '792-804',
        // :792-804（女）
        any: [/^\s*ELSEIF MARRY == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '796-798',
        // :796-798（百合气质補正 = 3（女女））
        any: [/^\s*LOCAL \+= 2000000000\s*\n\s*;百合气质補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '801-803',
        // :801-803（百合气质補正 = 3（女ふた））
        any: [/^\s*LOCAL \+= 1000000000\s*\n\s*;百合气质補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '807-808',
        // :807-808（データ反映：TALENT:320 += LOCAL）
        any: [/^\s*;データ反映\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '808-811',
        // :808-811（函数尾：データ反映 + RETURN 1；裸 RETURN 1 在本文件命中三处，
        //   切片带上前一句才有鉴别力）
        any: [/^\s*TALENT:TARGET:320 \+= LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '814-822',
        // :814
        any: [/^\s*@LOOK_CLEAR\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '823-1666',
        // :823
        any: [/^\s*@LOOK_INFO\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '829-832',
        // :830
        any: [/^\s*LOCALS:1 =\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '834',
        // :834
        any: [/^\s*LOCALS '= GET_LOOK_INFO\(TARGET, "种族"\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '836-841',
        // :836
        any: [/^\s*;精英は2つ目の素質を持つ\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '843-851',
        // :843
        any: [/^\s*;魔族化済みで现种族が設定されていない場合設定しておく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '855-893',
        // :858
        any: [/^\s*PRINTFORM 拥有\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '877',
        // :877
        any: [/^\s*CALL GOBI_KOUJO, \(MARK:屈服刻印 >= 3\) \? 0 # 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '880-892',
        // :880
        any: [/^\s*IF STRLENS\(LOCALS:3\) > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '892-894',
        // :892-893
        any: [/^\s*ENDIF\s*\n\s*PRINTL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '894-909',
        // :894-909（默认视角的 ELSE 支）
        any: [/^\s*PRINT \[\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '907-908',
        // :907-908（原种族行）
        any: [/^\s*PRINTFORML \[原种族：%LOCALS:3%\]\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '911-936',
        // :911（头发颜色と性質）
        any: [/^\s*;头发颜色と性質\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '911-976',
        // :911-976（两块合起来，行合并说明的引用）
        any: [/^\s*;头发长度・カット・髪型\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '939-976',
        // :939（头发长度・カット・髪型）
        any: [/^\s*PRINT \[头发长度：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '961-966',
        // :961-966（男性去除髮型顯示的两处守卫）
        any: [/^\s*;男性去除髮型顯示\(避免顯示雙馬尾之類的奇怪髮型\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '978-1018',
        // :978（その他の外見）
        any: [/^\s*;その他の外見\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1019-1078',
        // :1019（体型・乳头・阴毛・阴茎）
        any: [/^\s*IF TALENT:308 && TALENT:309 && TALENT:310\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1056-1071',
        // :1056（ペニス，扶她・男人のみ）
        any: [/^\s*IF TALENT:121 \|\| TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1079-1111',
        // :1079（魅力点・癖）
        any: [/^\s*IF TALENT:312 && TALENT:313\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '547-551',
        // :547-551（刺青候选表（LOCALS:10 十项））
        any: [
          /^\s*LOCALS:10 '= "淫乱" , "母猪" , "蛇" , "蜘蛛女郎" , "薔薇" , "肉便器" , "便女" , "阴茎图画" , "性器标志" , "骷髅"\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1113',
        // :1113（CALL FAMILY_PRINT_INFO(TARGET)）
        any: [/^\s*CALL FAMILY_PRINT_INFO\(TARGET\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1345-1380',
        // :1345（成为勇者之前的前缀四路）
        any: [/^\s*PRINT \[来到据点之前：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1382-1408',
        // :1382（取值 + 前职业语尾）
        any: [
          /^\s*IF TALENT:315 == 8 \|\| TALENT:315 == 12 \|\| TALENT:315 == 19\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1411-1446',
        // :1411（成为勇者的契机的前缀四路）
        any: [/^\s*PRINT \[回应召唤的理由：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1448-1475',
        // :1448（取值 + 契机语尾）
        any: [
          /^\s*IF TALENT:316 == 3 \|\| TALENT:316 == 7 \|\| TALENT:316 == 16 \|\| TALENT:316 == 17\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1345-1408',
        // :1345-1408（来历块一：前缀 + 取值 + 语尾）
        any: [/^\s*PRINT \[成为勇者之前：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1411-1475',
        // :1411-1475（来历块二：前缀 + 取值 + 语尾）
        any: [/^\s*PRINT \[成为勇者的契机：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1384-1404',
        // :1384（前职业语尾的五档）
        any: [/^\s*CALL GOBI_KOUJO, 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1450-1470',
        // :1450（契机语尾的五档）
        any: [/^\s*CALL GOBI_KOUJO, 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1478-1550',
        // :1478（信仰，巫女・聖女・法术/咒术）
        any: [/^\s*;信仰。巫女、聖女、法术・咒术持ちは信仰を持っている\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1517-1548',
        // :1517（堕落者的弃教行）
        any: [/^\s*;堕落した場合、以前の信仰を冒涜する\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1519',
        // :1519（TALENT:17 低姿态的判断）
        any: [
          /^\s*IF \(TALENT:85 == 1 \|\| CFLAG:0 != 0\) && \(TALENT:17 \|\| TALENT:282\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1553-1573',
        // :1553（妊娠适性）
        any: [/^\s*IF TALENT:TARGET:158\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1575-1611',
        // :1575（所持金・借金）
        any: [/^\s*PRINT 「身上的钱么……\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1599-1601',
        // :1599（借金行的 LightGreen）
        any: [/^\s*SETCOLORBYNAME LightGreen\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1613-1658',
        // :1613（常识改变系）
        any: [/^\s*;常识改变系\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1620-1621',
        // :1620（LOCALは連続に使う）
        any: [/^\s*;LOCALは連続に使う\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1662',
        // :1662（CALL LOOK_INFO_LOVE）
        any: [/^\s*CALL LOOK_INFO_LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1662-1664',
        // :1662-1664（尾段：无条件调用 + RETURN 1）
        any: [/^\s*CALL LOOK_INFO_LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1667-2810',
        // :1667
        any: [/^\s*@LOOK_INFO_LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1677-1712',
        // :1677（MAIN_LOVE 下标注释表）
        any: [
          /^\s*;MAIN_LOVE:0  = デフォで喜欢的东西。TALENT:317への愛情度\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1714-2603',
        // :1714-2603（评分半：从仕様说明到修正值适用）
        any: [/^\s*;仕様について\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1735',
        // :1735
        any: [/^\s*LOVER = CFLAG:606\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1737-1742',
        // :1737（初期化循环）
        any: [/^\s*;初期化\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1744-1746',
        // :1744（初期値）
        any: [/^\s*;初期値\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1753-1811',
        // :1753（种族補正）
        any: [/^\s*IF TALENT:314 == 1 \|\| TALENT:314 == 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1753-1767',
        // :1753-1767（高洁：精灵/天使）
        any: [/^\s*;一般的に高潔な种族\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1769-1781',
        // :1769-1781（恶：吸血鬼/无头骑士）
        any: [/^\s*ELSEIF TALENT:314 == 3 \|\| TALENT:314 == 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1798-1810',
        // :1798-1810（堕落：魔族/暗精灵/堕天使）
        any: [
          /^\s*ELSEIF \(TALENT:314 == 9 \|\| TALENT:314 == 8 \|\| TALENT:314 == 7\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1813-1877',
        // :1813（元の職業補正）
        any: [/^\s*;元の職業補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1879-1898',
        // :1879（理由補正）
        any: [/^\s*;理由補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1900-1947',
        // :1900（喜欢的东西補正）
        any: [/^\s*;喜欢的东西補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1949-1978',
        // :1949（陥落度合い）
        any: [/^\s*;陥落度合い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1980-2374',
        // :1980（素質による補正）
        any: [/^\s*;素質による補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2167-2171',
        // :2167-2171（双性恋，与倒錯的同条件重复）
        any: [/^\s*;双性恋\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2263-2269',
        // :2263-2269（牝犬，与动物耳朵同条件）
        any: [/^\s*;牝犬\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2376-2470',
        // :2376（能力による補正）
        any: [/^\s*;能力による補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2472-2550',
        // :2472（経験補正）
        any: [/^\s*;経験補正\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2475-2517',
        // :2475-2517（経験補正：精饮/侍奉/爱情/被虐四组 >100 / >30）
        any: [/^\s*IF EXP:精饮绝顶经验 > 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2530-2550',
        // :2530-2550（経験補正：施虐组与营业爱情组 >100 / >30）
        any: [/^\s*IF EXP:施虐快乐经验 > 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2519-2528',
        // :2519-2528（肛门快乐经验一组的 >200 / >80 两档）
        any: [/^\s*IF EXP:肛门快乐经验 > 200\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2552-2555',
        // :2552（新しい夫ボーナス / 恋人ボーナス）
        any: [/^\s*;新しい夫ボーナス\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2557-2565',
        // :2557（刻印）
        any: [/^\s*;刻印\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2567-2597',
        // :2567（相互作用）
        any: [/^\s*;相互作用\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2600-2603',
        // :2600（修正値適用）
        any: [/^\s*;修正値適用\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2606-2616',
        // :2606（各種表示の前置き）
        any: [/^\s*;各種表示\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2612-2616',
        // :2612（引子的两条 PRINTL）
        any: [/^\s*PRINTL 「喜欢的东西是……\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2618',
        // :2618（ソート的开始）
        any: [/^\s*;ソート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2618-2667',
        // :2618-2667（ソート整体）
        any: [/^\s*LOCAL:1 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2637',
        // :2637（WHILE LOVE_COUNT < 30）
        any: [/^\s*WHILE LOVE_COUNT < 30\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2662-2665',
        // :2662-2665（無限ループ避け）
        any: [/^\s*SIF LOCAL:1 > 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2671',
        // :2671（FOR LOVE_COUNT, 0, 30）
        any: [/^\s*FOR LOVE_COUNT, 0, 30\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2671-2795',
        // :2671-2795（显示循环本体）
        any: [/^\s*;順位からIDを取り出す\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2677-2678',
        // :2677-2678（显示门槛，SIF 3 以下 CONTINUE）
        any: [/^\s*SIF MAIN_LOVE:LOVE_ID <= 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2681-2682',
        // :2681-2682（LOVE_LIKE_BASE 未命中则 CONTINUE）
        any: [/^\s*SIF RESULT == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2697',
        // :2697（id 11 对男人不显示）
        any: [/^\s*ELSEIF LOVE_ID == 11 && !TALENT:男人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2731-2742',
        // :2731-2742（恋人 42 的四支）
        any: [/^\s*ELSEIF LOVE_ID == 42\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2743-2745',
        // :2743-2745（id 50 恒不显示）
        any: [/^\s*ELSEIF LOVE_ID == 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2772-2773',
        // :2772-2773（ELSE CONTINUE）
        any: [/^\s*ELSE\s*\n\s*CONTINUE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2779',
        // :2779（心形上限 SIF HEART > 6）
        any: [/^\s*SIF HEART > 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2791',
        // :2791（每行几个 IF LOVE_NUM % 6 == 0）
        any: [/^\s*IF LOVE_NUM % 6 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2776-2780',
        // :2776-2780（5 個ごとに金红桃，上限 6）
        any: [/^\s*;5個ごとに金红桃が一つずつ増える\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2791-2793',
        // :2791-2793（#570 返工：每 6 项换行的 PRINTL + 新行开头的「　」）
        any: [/^\s*IF LOVE_NUM % 6 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2784-2785',
        // :2784-2785（間の空白）
        any: [/^\s*;間の空白\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2787-2788',
        // :2787-2788（好きな数を増やす）
        any: [/^\s*;好きな数を増やす\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2797-2804',
        // :2797-2804（#570 返工：收尾块——语尾与「」 」接在最后一项的同一行）
        any: [/^\s*IF FLAG:5 & 2048\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2799',
        // :2799（#570：喜び语尾，收尾行的语尾出处）
        any: [/^\s*CALL GOBI_KOUJO, 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2806',
        // :2806（#570 返工：收尾计数行）
        any: [/^\s*PRINTFORML \[共\{LOVE_NUM\}个喜欢的东西\]\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2806-2808',
        // :2806-2808（计数行 + RETURN 1）
        any: [
          /^\s*PRINTFORML \[共\{LOVE_NUM\}个喜欢的东西\]\s*\n\s*\n\s*RETURN 1\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2811-2884',
        // :2811
        any: [/^\s*@LOVE_LIKE_BASE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2815-2819',
        // :2815
        any: [/^\s*;表示された場合LOCALに1が返ります\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2815-2817',
        // :2815
        any: [/^\s*;表示された場合LOCALに1が返ります\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2819',
        // :2819
        any: [/^\s*IF TALENT:317 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2823-2825',
        // :2823
        any: [/^\s*PRINTFORM 辣条\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2881',
        // :2881（RETURN LOCAL：未被覆盖 → 0）
        any: [/^\s*RETURN LOCAL\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2885-3775',
        // :2885
        any: [/^\s*@GET_LOOK_INFO\(ARG, ARGS\)\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
