// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #392 新增：chara-custom3.js 的锚表（issue #290 起一个 js 文件一份）

export const FILES = [
  {
    js: 'ere/chara/chara-custom3.js',
    refs: [
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '1-111',
        any: [/^[ \t]*﻿@CHAR_CUSTOM_LOOK_PAGE\(ARG=0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '1-117',
        any: [/^[ \t]*﻿@CHAR_CUSTOM_LOOK_PAGE\(ARG=0\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '5',
        any: [/^[ \t]*VARSET LOCALS[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '7',
        any: [/^[ \t]*PRINTL ■=== 发色 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '8',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_头发颜色2, TALENT:头发颜色, 11\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '10',
        any: [/^[ \t]*PRINTL ■=== 发型 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '11',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_发型, TALENT:发型, 12\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '13',
        any: [/^[ \t]*PRINTL ■=== 头发长度 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '14',
        any: [/^[ \t]*LOCALS '= "短", "半长", "长"[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '15',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(LOCALS, \(TALENT:头发长度-1\)\/100, 13\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '17',
        any: [/^[ \t]*PRINTL ■=== 状态 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '18',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_头发状态, TALENT:头发状态, 14\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '20',
        any: [/^[ \t]*PRINTL ■=== 修剪 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '21',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_头发修剪方式, TALENT:头发修剪方式, 15\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '24',
        any: [/^[ \t]*; ELSEIF ARG == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '27',
        any: [/^[ \t]*PRINTL ■=== 眼型 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '30',
        any: [/^[ \t]*PRINTL ■=== 瞳色 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '33',
        any: [/^[ \t]*PRINTL ■=== 唇型 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '36',
        any: [/^[ \t]*PRINTL ■=== 体型 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '38',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(LOCALS, \(TALENT:体型-1\)\/100, 24\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '41',
        any: [
          /^[ \t]*LOCALS '= "白虎", "胎毛", "新长的", "稀薄", "标准", "浓密", "硬毛"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '42-59',
        any: [/^[ \t]*SELECTCASE TALENT:阴毛状态[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '43-44',
        any: [/^[ \t]*LOCAL = 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '45-46',
        any: [/^[ \t]*CASE 2 TO 20[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '47-48',
        any: [/^[ \t]*CASE 20 TO 50[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '49-50',
        any: [/^[ \t]*CASE 50 TO 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '51-52',
        any: [/^[ \t]*CASE 100 TO 150[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '53-54',
        any: [/^[ \t]*CASE 150 TO 200[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '55-56',
        any: [/^[ \t]*CASE 201 TO 500[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '57-58',
        any: [/^[ \t]*CASEELSE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '60',
        any: [/^[ \t]*CALL PRINT_ARR_GROUP\(LOCALS, LOCAL, 25\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '62',
        any: [/^[ \t]*PRINTL ■=== 乳头 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '66',
        any: [/^[ \t]*ELSEIF ARG == 1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '69',
        any: [/^[ \t]*PRINTL ■=== 魅力点 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '70',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_魅力点, TALENT:魅力点, 31\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '72',
        any: [/^[ \t]*PRINTL ■=== 癖好 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '73',
        any: [/^[ \t]*CALL PRINT_ARR_GROUP\(ARR_癖, TALENT:癖, 32\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '75',
        any: [/^[ \t]*PRINTL ■=== 曾经喜欢的东西 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '76',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_喜欢的东西, TALENT:喜欢的东西, 33\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '86',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_成为勇者前的生活, TALENT:成为勇者前的生活, 41\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '90',
        any: [/^[ \t]*PRINTL ■=== 成为魔王的契机 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '92',
        any: [/^[ \t]*PRINTL ■=== 回应召唤的理由 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '94',
        any: [/^[ \t]*PRINTL ■=== 成为勇者的契机 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '96',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_成为勇者的契机, TALENT:成为勇者的契机, 42\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '102',
        any: [/^[ \t]*PRINTL ■=== 精英种族 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '103',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_种族2, TALENT:种族2, 2\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '105',
        any: [/^[ \t]*PRINTL ■=== 种族 ===■[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '106',
        any: [
          /^[ \t]*CALL PRINT_ARR_GROUP\(ARR_种族, TALENT:种族, 1\)[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '109-110',
        any: [/^[ \t]*IF TALENT:314 == 9[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '118-182',
        any: [/^[ \t]*@CHAR_CUSTOM_LOOK_DEAL\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '118-183',
        any: [/^[ \t]*@CHAR_CUSTOM_LOOK_DEAL\(ARG\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '122',
        any: [/^[ \t]*L_IDX = ARG\/100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '123',
        any: [/^[ \t]*L_VAL = ARG - L_IDX \* 100[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '126',
        any: [/^[ \t]*TALENT:种族 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '128',
        any: [/^[ \t]*TALENT:种族2 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '130',
        any: [/^[ \t]*TALENT:头发颜色 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '132',
        any: [/^[ \t]*TALENT:发型 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '134',
        any: [/^[ \t]*TALENT:头发长度 = L_VAL \*100 \+2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '136',
        any: [/^[ \t]*TALENT:头发状态 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '138',
        any: [/^[ \t]*TALENT:头发修剪方式 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '141',
        any: [/^[ \t]*TALENT:目 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '143',
        any: [/^[ \t]*TALENT:瞳色 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '145',
        any: [/^[ \t]*TALENT:唇 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '147',
        any: [/^[ \t]*TALENT:体型 = L_VAL \*100 \+2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '149-164',
        any: [/^[ \t]*SELECTCASE L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '166',
        any: [/^[ \t]*TALENT:乳头 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '169',
        any: [/^[ \t]*TALENT:魅力点 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '171',
        any: [/^[ \t]*TALENT:癖 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '173',
        any: [/^[ \t]*TALENT:喜欢的东西 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '176',
        any: [/^[ \t]*TALENT:成为勇者前的生活 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '178',
        any: [/^[ \t]*TALENT:成为勇者的契机 = L_VAL[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '179-180',
        any: [/^[ \t]*RETURN -1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '180',
        any: [/^[ \t]*RETURN -1[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '182',
        any: [/^[ \t]*RETURN 0[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '184-231',
        any: [/^[ \t]*@PRINT_ARR_GROUP\(L_ARR, L_VAL, L_IDX\)[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '206',
        any: [/^[ \t]*L_EXCEED \+\+[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '207',
        any: [/^[ \t]*SIF L_EXCEED > 10[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '207-208',
        any: [/^[ \t]*SIF L_EXCEED > 10[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '209',
        any: [/^[ \t]*CONTINUE[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '212-218',
        any: [/^[ \t]*L_LEN \+= LOCAL \+ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '212',
        any: [/^[ \t]*L_LEN \+= LOCAL \+ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '214',
        any: [/^[ \t]*IF L_LEN >= 80[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '217',
        any: [/^[ \t]*L_LEN = LOCAL \+ 2[ \t]*$/m],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '220-226',
        any: [
          /^[ \t]*PRINTBUTTON @"\[%LOCALS%\]", L_IDX \* 100 \+ L_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/キャラ関数/CHARA_CUSTOM3.ERB',
        ref: '223',
        any: [
          /^[ \t]*PRINTBUTTON @"\[%LOCALS%\]", L_IDX \* 100 \+ L_I[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '22',
        any: [
          /^[ \t]*#DIMS ARR_头发颜色2 = "","金色","栗色","黑色","红色","银色","蓝色","绿色","紫色","白色","暗金色","粉色"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '25',
        any: [
          /^[ \t]*#DIMS ARR_头发状态 = "", "直发", "卷发", "内卷发", "外卷发", "天然卷", "大波浪"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '28',
        any: [
          /^[ \t]*#DIMS ARR_头发修剪方式 = "", "基本剪法", "齐剪", "层剪", "碎发"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '31',
        any: [
          /^[ \t]*#DIMS ARR_发型 = "", "自然", "中分", "不均分", "长束发", "马尾", "侧马尾", "垂发辫", "双马尾", "顶束发", "侧束发", "鱼骨辫", "卷发"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '34',
        any: [
          /^[ \t]*#DIMS ARR_目 = "", "细长眼", "大眼", "深邃眼", "吊眼", "水汪汪眼", "标准眼", "三白眼", "下垂眼"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '37',
        any: [
          /^[ \t]*#DIMS ARR_瞳色 = "", "蓝色", "棕色", "灰色", "金色", "红色", "黑色"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '40',
        any: [
          /^[ \t]*#DIMS ARR_唇 = "", "肉感的", "薄的", "丰润的", "标准"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '43',
        any: [
          /^[ \t]*#DIMS ARR_乳头 = "", "粉红色", "褐色", "标准", "凹陷"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '46',
        any: [
          /^[ \t]*#DIMS ARR_魅力点 = "", "皮肤", "眼角", "鼻梁", "嘴角", "泪痣", "锁骨", "小臂", "手腕", "手", "手指", "肚脐", "美乳", "腰线", "臀部线条", "腿部线条", "膝盖", "脚踝", "脚跟", "背脊", "耳朵", "性器", "头发的光泽", "丰满的屁股", "长睫毛", "虎牙", "眉毛", "指甲", "寝癖"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '49',
        any: [
          /^[ \t]*#DIMS ARR_癖 = "", "舔嘴唇", "往后看", "摸头发", "用腿夹住手", "抱手臂", "手指交握", "抖腿", "打拍子", "仰视对方", "歪脖子", "叹气", "动作夸张", "频繁眨眼", "鼓腮", "咬紧牙关", "遮住嘴", "摸耳朵", "懒散", "咂嘴", "咬指甲", "挠鼻子", "扶额", "握拳", "用手指人", "说口头禅", "扭腰", "闭上一只眼", "眯眼", "歪嘴", "碎碎念", "总往角落躲", "估算物体长度", "说话越说越近", "舔手背"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '52',
        any: [
          /^[ \t]*#DIMS ARR_成为勇者前的生活 = "不明", "学生", "修女", "农民", "渔民", "妓女", "小偷", "乞丐", "贵族", "贫民", "守墓人", "巫女", "圣女", "预言家", "占卜师", "商人", "采药人", "隐士", "面包师", "军人", "奴隶", "主妇", "淫乱的产物", "堕落的结果", "爱的结晶", "交欢的副产品", "魔族的孽种"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '55',
        any: [
          /^[ \t]*#DIMS ARR_成为勇者的契机 = "不明", "命运的引导", "为了钱", "受到了上天启示", "因使命感而热血沸腾", "对日常感到厌倦", "经历无尽悲伤后", "拯救故乡", "复仇", "国王的任命", "赎罪", "自暴自弃", "纯属意外", "被命令了", "无可奈何", "测试自己的力量", "为了和平", "为了正义", "梦见成为了勇者", "获得了力量", "旅行的结果", "父母的嘱咐", "憧憬魔王", "为了出人头地", "为了报恩", "被恶魔诱惑"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '58',
        any: [
          /^[ \t]*#DIMS ARR_种族 ="人类", "精灵", "狼人", "吸血鬼", "无头骑士", "龙族", "天使", "暗精灵", "堕天使", "魔族", "霍比特人", "矮人"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '61',
        any: [
          /^[ \t]*#DIMS ARR_种族2 ="","兽人", "史莱姆", "昆虫", "植物", "触手", "妖精", "巨人", "魔族", "魔兽"[ \t]*$/m,
        ],
      },
      {
        src: 'target/ERB/其他/VARIABLES.ERH',
        ref: '63',
        any: [
          /^[ \t]*#DIMS ARR_喜欢的东西 = "","甜食", "辣条", "唱歌", "故乡的恋人", "钱", "跳舞", "绘画", "家族", "使命", "故乡", "憧憬的那个人", "可爱的动物", "美丽的饰品", "宝石", "点心", "喝茶", "睡觉", "小说", "开怀大笑", "游泳"[ \t]*$/m,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
