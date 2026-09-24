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
        ref: '9-52',
        // :9
        any: [
          /^\s*;\(stick修改\)10、11、48注释掉，强制每个人物生成发色，修正人物无发色的问题\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '10-13',
        // :10
        any: [/^\s*IF TALENT:TARGET:300 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '11-13',
        // :11
        any: [/^\s*;設定済み\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '13-15',
        // :15
        any: [/^\s*; 0- 4 粉髪  5%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '15-51',
        // :15
        any: [/^\s*; 0- 4 粉髪  5%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '54-71',
        // :54
        any: [/^\s*CASE 90 TO 94\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '55',
        // :55
        any: [/^\s*;暗金色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '56-58',
        // :56
        any: [/^\s*TALENT:TARGET:300 = 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '59-61',
        // :59
        any: [/^\s*TALENT:TARGET:300 = 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '62-64',
        // :63
        any: [/^\s*;头发状态\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '65-67',
        // :65
        any: [/^\s*IF Q <= 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '68-70',
        // :68
        any: [/^\s*ELSEIF Q == 7\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '71-73',
        // :71
        any: [/^\s*ELSEIF Q == 8\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '75-87',
        // :75
        any: [/^\s*;外カール\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '77',
        // :77
        any: [/^\s*ELSEIF Q == 10\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '78-80',
        // :78
        any: [/^\s*;癖毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '81-83',
        // :81
        any: [/^\s*;ウェーブ\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '84-87',
        // :85
        any: [/^\s*;头发长度　ボーイッシュなら常にショート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '89-99',
        // :89
        any: [/^\s*;ショート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '90-92',
        // :90
        any: [/^\s*TALENT:TARGET:302 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '93-99',
        // :93
        any: [/^\s*TALENT:TARGET:302 = 101\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '101-127',
        // :102
        any: [/^\s*IF Q >= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '119-125',
        // :119
        any: [/^\s*;4,长束发  5,马尾  6,侧马尾\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '126-127',
        // :126-127
        any: [/^\s*ELSE\s*\n\s*Q = RAND:12\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '129-156',
        // :130
        any: [/^\s*TALENT:304 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '130',
        // :130
        any: [/^\s*TALENT:304 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '134-136',
        // :134
        any: [/^\s*; 0-10 切れ長 11%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '137-139',
        // :137
        any: [/^\s*;26-35 釣り目  5%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '140-142',
        // :140
        any: [/^\s*;46-48 三白眼  3%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '143-145',
        // :143
        any: [/^\s*;切れ長\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '146-148',
        // :146
        any: [/^\s*;大きい\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '149-151',
        // :149
        any: [/^\s*;神秘的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '152-154',
        // :152
        any: [/^\s*;釣り目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '155-157',
        // :155
        any: [/^\s*;潤み目\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '159-179',
        // :159
        any: [/^\s*TALENT:TARGET:305 = 8\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '160',
        // :160
        any: [/^\s*ELSEIF Q <= 48\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '162-164',
        // :162
        any: [/^\s*TALENT:TARGET:305 = 7\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '165-167',
        // :165
        any: [/^\s*TALENT:TARGET:305 = 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '168-170',
        // :168
        any: [/^\s*;瞳色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '171-173',
        // :171
        any: [/^\s*;碧\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '174-176',
        // :174
        any: [/^\s*;ブラウン\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '177-179',
        // :177
        any: [/^\s*;黒\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '181-195',
        // :181
        any: [/^\s*TALENT:TARGET:306 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '182',
        // :182
        any: [/^\s*ELSEIF Q <= 98\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '184-186',
        // :184
        any: [/^\s*TALENT:TARGET:306 = 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '187-189',
        // :187
        any: [/^\s*TALENT:TARGET:306 = 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '190-192',
        // :190-191
        any: [/^\s*;唇\s*\n\s*Q = RAND:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '193-195',
        // :193
        any: [/^\s*;肉感的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '197-199',
        // :197
        any: [/^\s*TALENT:TARGET:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '197-207',
        // :197
        any: [/^\s*TALENT:TARGET:307 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '200-202',
        // :200
        any: [/^\s*TALENT:TARGET:307 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '203-205',
        // :203
        any: [/^\s*TALENT:TARGET:307 = 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '206-207',
        // :206-207
        any: [/^\s*;体型\s*\n\s*Q = RAND:3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '209-223',
        // :209
        any: [/^\s*;丰满\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '210',
        // :210
        any: [/^\s*TALENT:TARGET:308 = 300\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '212-214',
        // :212
        any: [/^\s*;骨感\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '215-217',
        // :216
        any: [/^\s*TALENT:TARGET:308 = 150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '218-220',
        // :219-220
        any: [/^\s*;乳头\s*\n\s*Q = RAND:6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '221-223',
        // :222
        any: [/^\s*;ピンク\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '225-243',
        // :225
        any: [/^\s*;褐色\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '226',
        // :226
        any: [/^\s*TALENT:TARGET:309 = 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '228-230',
        // :228
        any: [/^\s*;陥没\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '231-233',
        // :232
        any: [/^\s*TALENT:TARGET:309 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '234-236',
        // :235-236
        any: [/^\s*;陰毛\s*\n\s*Q = RAND:150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '237-239',
        // :237
        any: [/^\s*IF Q <= 20\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '240-242',
        // :241
        any: [/^\s*;産毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '243-245',
        // :243
        any: [/^\s*ELSEIF Q <= 70\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '246-247',
        // :246
        any: [/^\s*ELSEIF Q <= 100\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '249-266',
        // :249
        any: [/^\s*ELSEIF Q <= 130\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '251',
        // :251
        any: [/^\s*TALENT:TARGET:311 = 150\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '253-255',
        // :253
        any: [/^\s*;剛毛\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '256-258',
        // :256
        any: [/^\s*TALENT:TARGET:310 = TALENT:TARGET:311\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '259-261',
        // :259
        any: [/^\s*;有無にかかわらず設定は入れておく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '262-264',
        // :262
        any: [/^\s*;普通\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '266-268',
        // :266
        any: [/^\s*TALENT:TARGET:318 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '270-302',
        // :271
        any: [/^\s*;巨根\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '271-272',
        // :271
        any: [/^\s*;巨根\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '276-278',
        // :276
        any: [
          /^\s*SIF \(TALENT:TARGET:318 == 2 \|\| TALENT:TARGET:318 == 3\) && RAND:10 == 0\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '285-292',
        // :285
        any: [/^\s*IF \(TALENT:TARGET:109\) && \(Q == 12\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '289-291',
        // :289
        any: [/^\s*;ELSEIF \(TALENT:TARGET:153\) && \(Q == 13\)\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '295',
        // :295
        any: [/^\s*SIF RAND:40 == 0 && TALENT:TARGET:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '300-302',
        // :302
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
        ref: '320-499',
        // :320
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
        ref: '368-371',
        // :368
        any: [/^\s*ELSEIF \(ARG == 0 && Q <= 159\) \|\| ARG == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '372-376',
        // :373
        any: [/^\s*ELSEIF \(ARG == 0 && Q <= 169\) \|\| ARG == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '377-380',
        // :377
        any: [/^\s*;人狼は善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '381-387',
        // :381
        any: [/^\s*TALENT:TARGET:314 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '388-391',
        // :389
        any: [/^\s*TALENT:TARGET:279 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '392-394',
        // :392
        any: [/^\s*ELSEIF \(ARG == 0 && Q <= 197\) \|\| ARG == 5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '395-401',
        // :395
        any: [/^\s*;角\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '403-497',
        // :406
        any: [/^\s*;天使は善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '404-406',
        // :406
        any: [/^\s*;天使は善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '406-414',
        // :406
        any: [/^\s*;天使は善恶值が高い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '411-414',
        // :411
        any: [/^\s*TALENT:314 = 9\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '415-427',
        // :415
        any: [/^\s*TALENT:472 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '428-434',
        // :429
        any: [/^\s*ELSEIF TALENT:319 == 3\s*$/m],
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
        ref: '447-463',
        // :447
        any: [/^\s*ELSEIF TALENT:319 == 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '455-457',
        // :455
        any: [/^\s*SIF RAND:4 != 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '458-462',
        // :462
        any: [/^\s*ELSEIF TALENT:319 == 7\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '464-465',
        // :464
        any: [/^\s*ELSEIF TALENT:319 == 8 \|\| TALENT:319 == 9\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '466-479',
        // :466
        any: [/^\s*TALENT:245 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '480-487',
        // :480
        any: [/^\s*TALENT:255 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '485',
        // :485
        any: [/^\s*TALENT:479 = 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '506-583',
        // :506
        any: [/^\s*;妓女・物乞い・奴隷の場合、経験がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '507-508',
        // :507
        any: [/^\s*IF Q == 5 \|\| Q == 7 \|\| Q == 20\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '510-513',
        // :510
        any: [/^\s*LOCAL = RAND:20 \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '514-515',
        // :515
        any: [/^\s*ELSEIF TALENT:122\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '516-556',
        // :516
        any: [/^\s*;オトコの場合\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '518-524',
        // :522
        any: [/^\s*ELSEIF TALENT:0 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '525-530',
        // :529
        any: [/^\s*ELSEIF RAND:5 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '531-536',
        // :531
        any: [/^\s*LOCAL:0 = RAND:40 \+ 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '537-546',
        // :537
        any: [/^\s*EXP:74 \+= EXP:5\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '547-551',
        // :547
        any: [/^\s*;妓女と奴隷は、刺青を入れられていることがある\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '553-559',
        // :554
        any: [/^\s*;非处女の場合、生育经验がつくことがある\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '555',
        // :555
        any: [/^\s*SIF TALENT:0 == 0 && RAND:15 == 0 && TALENT:122 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '556',
        // :556
        any: [/^\s*EXP:60 \+= RAND:3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '557',
        // :557
        any: [/^\s*;そして善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '561-563',
        // :561
        any: [/^\s*CALL karma, TARGET, 30\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '565',
        // :565
        any: [/^\s*ELSEIF Q == 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '566-571',
        // :566
        any: [/^\s*;盗人は善恶值が低い\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '569-571',
        // :569
        any: [/^\s*;主婦は経験がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '572-574',
        // :572
        any: [/^\s*EXP:5 \+= LOCAL:0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '575-580',
        // :576
        any: [
          /^\s*;子供の数が合わなくなっちゃうのでオミットしてしまいました\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '583',
        // :583
        any: [/^\s*TALENT:0 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '585-608',
        // :585
        any: [/^\s*TALENT:273 = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '586-587',
        // :586
        any: [/^\s*;必ず人妻がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '586',
        // :586
        any: [/^\s*;必ず人妻がつく\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '589-590',
        // :589
        any: [/^\s*TALENT:TARGET:315 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '591-592',
        // :591
        any: [/^\s*;勇者になった理由\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '592-596',
        // :592
        any: [/^\s*\$REASON\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '596-598',
        // :596
        any: [/^\s*;配下の場合、特別な理由\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '596',
        // :596
        any: [/^\s*;配下の場合、特別な理由\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '597-599',
        // :599
        any: [/^\s*SIF Q >103 && EX_TALENT:2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '600',
        // :600
        any: [/^\s*Q = 93\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '606-608',
        // :608
        any: [/^\s*TALENT:TARGET:316 = Q\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '610-624',
        // :610
        any: [/^\s*;喜欢的东西\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '611-612',
        // :611
        any: [/^\s*\$LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '613-615',
        // :614
        any: [
          /^\s*IF Q == 4 \|\| Q == 8 \|\| Q == 9 \|\| Q == 10 \|\| Q == 11\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '616-618',
        // :617
        any: [/^\s*ELSEIF Q == 5 \|\| Q == 13 \|\| Q == 14\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '624',
        // :624
        any: [/^\s*;家族構成\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '626-791',
        // :626
        any: [/^\s*;            1の位 = 1のとき、家族構成設定あり\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '628-629',
        // :628
        any: [/^\s*;          100の位 = 勇者以前に生んだ娘\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '629',
        // :629
        any: [/^\s*;        1,000の位 = 勇者以前に生んだ息子\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '631-662',
        // :631
        any: [
          /^\s*;（0=未婚 1=結婚 2=離婚 3=現在の伴侶と重婚 4=現在の伴侶と契り、離婚を宣言）\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '632-633',
        // :632
        any: [/^\s*;（5=死別）\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '633-643',
        // :633
        any: [/^\s*;      100,000の位 = 姉の数\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '644',
        // :644
        any: [/^\s*;結婚相手の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '646-662',
        // :647
        any: [/^\s*MARRY = 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '666-736',
        // :673
        any: [/^\s*;現在の状況\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '669-679',
        // :673
        any: [/^\s*;現在の状況\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '680-694',
        // :684
        any: [/^\s*;子供の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '695-735',
        // :697
        any: [/^\s*;ループ抜けの位置が違うので、一人は確定する\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '698-700',
        // :699-700
        any: [/^\s*BREAK\s*\n\s*NEXT\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '701',
        // :701
        any: [/^\s*ELSEIF LOCAL >= 10 && TALENT:0 == 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '738-758',
        // :739
        any: [/^\s*;兄弟姉妹の設定\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '760-790',
        // :761
        any: [/^\s*;性別の設定（人妻の場合）\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '762-771',
        // :762
        any: [/^\s*IF TALENT:122 == 1 && MARRY == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '768-770',
        // :768
        any: [/^\s*ABL:断背气质 = 3\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '772-785',
        // :773
        any: [/^\s*;男女カップル\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '779',
        // :779
        any: [/^\s*;希少なふたなりのカップル\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '782-784',
        // :784
        any: [/^\s*;ふた男カップル\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '786-790',
        // :787
        any: [/^\s*;ふた女カップル\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '788',
        // :788
        any: [/^\s*LOCAL \+= 3000000000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '788-792',
        // :788
        any: [/^\s*LOCAL \+= 3000000000\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '793',
        // :793
        any: [/^\s*;女\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '808-812',
        // :808
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
        ref: '894-903',
        // :895
        any: [/^\s*PRINT \[\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '905-907',
        // :907
        any: [/^\s*SIF STRLENS\(LOCALS:3\) > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '915-941',
        // :917
        any: [/^\s*PRINT \[发色：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '915-978',
        // :917
        any: [/^\s*PRINT \[发色：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '944-978',
        // :945
        any: [/^\s*PRINT \[头发长度：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '962-966',
        // :963
        any: [/^\s*PRINT \]\[发型：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '981-1021',
        // :981
        any: [/^\s*PRINT 「我的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1022-1080',
        // :1025
        any: [/^\s*PRINT \[体型：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1025-1029',
        // :1025
        any: [/^\s*PRINT \[体型：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1064-1076',
        // :1065
        any: [/^\s*PRINTFORM %GET_LOOK_INFO\(TARGET, "阴茎的状态"\)%\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1081-1103',
        // :1085
        any: [/^\s*PRINT \[魅力点：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1103-1107',
        // :1103
        any: [/^\s*PRINT 是我的习惯\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1277-1279',
        // :1277-1278
        any: [/^\s*\s*\n\s*; ELSE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1310-1340',
        // :1337-1339
        any: [/^\s*; ENDIF\s*\n\s*; ENDIF\s*\n\s*; ENDIF\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1342-1367',
        // :1343
        any: [/^\s*; \[ENDIF\]\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1348-1365',
        // :1350
        any: [/^\s*PRINT \[来到据点之前：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1370-1400',
        // :1371
        any: [/^\s*PRINT \[成为冒险者之前：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1402-1430',
        // :1413
        any: [/^\s*PRINT 「回应召唤是因为\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1407-1428',
        // :1413
        any: [/^\s*PRINT 「回应召唤是因为\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1435-1508',
        // :1437
        any: [/^\s*PRINT \[成为冒险者的契机：\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1487-1507',
        // :1488
        any: [/^\s*IF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1488',
        // :1488
        any: [/^\s*IF TALENT:85 == 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1511-1532',
        // :1513
        any: [/^\s*PRINTFORML （信仰値：\{CFLAG:152\}）」\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1534-1562',
        // :1534
        any: [/^\s*PRINTFORM 丰饶的大地女神是是用乳头自慰的母牛！\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1557-1559',
        // :1557
        any: [/^\s*PRINTFORM 不能正常的怀孕\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1564-1617',
        // :1568
        any: [/^\s*PRINTFORM 」\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1572-1576',
        // :1576
        any: [/^\s*PRINT 「身上的钱么……\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1620-1622',
        // :1620
        any: [/^\s*;LOCALは連続に使う\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1656-1660',
        // :1660
        any: [/^\s*;好きなものは別関数\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1667-2810',
        // :1667
        any: [/^\s*@LOOK_INFO_LOVE\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1674-1712',
        // :1674
        any: [/^\s*#DIM HEART\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1714-2594',
        // :1715
        any: [/^\s*;仕様について\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1727-1732',
        // :1727
        any: [/^\s*;表示されるのは上位30個までとなっている\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1735',
        // :1735
        any: [/^\s*LOVER = CFLAG:606\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1750',
        // :1750
        any: [/^\s*;設定での処理\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1755-1793',
        // :1755
        any: [/^\s*;エルフ・天使\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1755-1757',
        // :1755
        any: [/^\s*;エルフ・天使\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1777-1783',
        // :1783
        any: [/^\s*ELSEIF TALENT:314 == 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1790-1792',
        // :1792
        any: [/^\s*MAIN_LOVE:41 \+= 1\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1797-1852',
        // :1798
        any: [
          /^\s*ELSEIF \(TALENT:314 == 9 \|\| TALENT:314 == 8 \|\| TALENT:314 == 7\)\s*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1856-1869',
        // :1865
        any: [/^\s*MAIN_LOVE:21 -= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1901-1933',
        // :1901
        any: [/^\s*IF TALENT:317 == 4\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1937-1962',
        // :1940
        any: [/^\s*;かわいい動物\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '1964-2233',
        // :1968
        any: [/^\s*MAIN_LOVE:50 \+= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2213-2217',
        // :2215
        any: [/^\s*;A鈍感\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2288-2292',
        // :2290
        any: [/^\s*IF TALENT:143\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2437-2485',
        // :2438
        any: [/^\s*MAIN_LOVE:33 \+= ABL:21\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2490-2543',
        // :2491
        any: [/^\s*MAIN_LOVE:30 \+= 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2546-2548',
        // :2547
        any: [/^\s*ELSEIF EXP:营业爱情经验 > 0\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2550-2558',
        // :2552
        any: [/^\s*;新しい夫ボーナス\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2570-2588',
        // :2571
        any: [/^\s*;コンプレックスがこじれる\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2591-2594',
        // :2593
        any: [/^\s*;獣姦好きは野良犬も好き\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2594',
        // :2594
        any: [/^\s*LOVE_POOL:60 \+= MAIN_LOVE:61 \/ 2\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2602',
        // :2602
        any: [/^\s*MAIN_LOVE:LOVE_ID \+= LOVE_POOL:LOVE_ID\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2602-2641',
        // :2602
        any: [/^\s*MAIN_LOVE:LOVE_ID \+= LOVE_POOL:LOVE_ID\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2620',
        // :2620
        any: [/^\s*LOCAL = -9999\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2636-2637',
        // :2636
        any: [/^\s*;30位までソート\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2650-2654',
        // :2651
        any: [/^\s*;现在の最大値ではない、现在の最大値の次に大きい数記憶\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2652-2656',
        // :2652
        any: [/^\s*LOCAL:2 = MAIN_LOVE:LOVE_ID\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2652',
        // :2652
        any: [/^\s*LOCAL:2 = MAIN_LOVE:LOVE_ID\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2673-2777',
        // :2673
        any: [/^\s*;順位からIDを取り出す\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2711',
        // :2711
        any: [/^\s*ELSEIF LOVE_ID == 31\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2713-2715',
        // :2713
        any: [/^\s*ELSEIF LOVE_ID == 32 && TALENT:男人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2720',
        // :2720
        any: [/^\s*PRINTFORM 虐待别人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2723',
        // :2723
        any: [/^\s*ELSEIF LOVE_ID == 40  && TALENT:男人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2738-2747',
        // :2738
        any: [/^\s*PRINTFORM 恋人\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2740-2746',
        // :2740
        any: [/^\s*PRINT 恋人的\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2743',
        // :2743
        any: [/^\s*ELSEIF LOVE_ID == 50\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2748-2749',
        // :2748
        any: [/^\s*ELSEIF LOVE_ID == 51\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2750',
        // :2750
        any: [/^\s*ELSEIF LOVE_ID == 52 && MAIN_LOVE:50 > 6\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2753',
        // :2753
        any: [/^\s*PRINTFORM 爸爸\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2755',
        // :2755
        any: [/^\s*PRINTFORM 萝莉的小穴\s*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/LOOK.ERB',
        ref: '2791-2793',
        // :2791-2793（#570 返工：每 6 项换行的 PRINTL + 新行开头的「　」）
        any: [/^\s*IF LOVE_NUM % 6 == 0\s*$/m],
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
        ref: '2802-2804',
        // :2802-2803
        any: [/^\s*ELSE\s*\n\s*PRINTL\s*$/m],
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
        ref: '2881-2885',
        // :2881
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
