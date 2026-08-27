/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */
/**
 * @file EVENT_K5_マオ.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/口上/EVENT_K5_マオ.ERB
 *
 * == 已有门面名的下标（复核时可升级为门面读写，裁定一） ==
 *   cflag:1 = 状态（facade-names）
 *   cflag:201 = 初调教（facade-names）
 *   cflag:221 = 首次润滑Lv2（facade-names）
 *   cflag:222 = 首次欲情Lv2（facade-names）
 *   cflag:223 = 首次耻情Lv2（facade-names）
 *   cflag:224 = 首次恐怖Lv2（facade-names）
 *   cflag:225 = 首次C绝顶（facade-names）
 *   cflag:226 = 首次V绝顶（facade-names）
 *   cflag:227 = 首次A绝顶（facade-names）
 *   cflag:228 = 首次B绝顶（facade-names）
 *   cflag:229 = 处女丧失（facade-names）
 *   cflag:261 = 调教后自慰（facade-names）
 *   cflag:262 = 百合PLAY（facade-names）
 *   cflag:263 = 朝口交（facade-names）
 *   cflag:264 = 调教后性交（facade-names）
 *   cflag:265 = 夜袭（facade-names）
 *   cflag:271 = 妊娠发觉（facade-names）
 *   cflag:272 = 生产（facade-names）
 *   cflag:297 = 苦痛刻印Lv3（facade-names）
 *   cflag:298 = 快乐刻印Lv3（facade-names）
 *   cflag:299 = 屈服刻印Lv3（facade-names）
 *   cflag:300 = 反抗刻印Lv3（facade-names）
 *   cflag:301 = 爱抚（facade-names）
 *   cflag:302 = 舔阴（facade-names）
 *   cflag:303 = 肛门爱抚（facade-names）
 *   cflag:304 = 自慰（facade-names）
 *   cflag:306 = 胸爱抚（facade-names）
 *   cflag:307 = 接吻（facade-names）
 *   cflag:308 = 自己扒开（facade-names）
 *   cflag:309 = 插入手指（facade-names）
 *   cflag:310 = 舔肛（facade-names）
 *   cflag:311 = 振动宝石（facade-names）
 *   cflag:312 = 壶虫（facade-names）
 *   cflag:313 = 振动杖（facade-names）
 *   cflag:314 = 肛门虫（facade-names）
 *   cflag:315 = 阴蒂夹（facade-names）
 *   cflag:316 = 乳头夹（facade-names）
 *   cflag:317 = 榨乳器（facade-names）
 *   cflag:318 = 飞机杯（facade-names）
 *   cflag:320 = 肛珠（facade-names）
 *   cflag:321 = 正常位（facade-names）
 *   cflag:322 = 背后位（facade-names）
 *   cflag:323 = 对面座位（facade-names）
 *   cflag:324 = 背面座位（facade-names）
 *   cflag:327 = 正常位肛交（facade-names）
 *   cflag:328 = 背后位肛交（facade-names）
 *   cflag:329 = 对面座位肛交（facade-names）
 *   cflag:330 = 背面座位肛交（facade-names）
 *   cflag:331 = 手淫（facade-names）
 *   cflag:332 = 口交_奴（facade-names）
 *   cflag:333 = 乳交（facade-names）
 *   cflag:334 = 股间性交（facade-names）
 *   cflag:335 = 骑乘位（facade-names）
 *   cflag:336 = 全身擦洗（facade-names）
 *   cflag:337 = 骑乘位肛交（facade-names）
 *   cflag:338 = 肛门侍奉（facade-names）
 *   cflag:341 = 打屁股（facade-names）
 *   cflag:342 = 鞭（facade-names）
 *   cflag:343 = 针（facade-names）
 *   cflag:344 = 眼罩（facade-names）
 *   cflag:345 = 绳子（facade-names）
 *   cflag:346 = 口塞（facade-names）
 *   cflag:347 = 灌肠肛塞（facade-names）
 *   cflag:348 = 穿环（facade-names）
 *   cflag:356 = 放置PLAY（facade-names）
 *   cflag:357 = 交谈（facade-names）
 *   cflag:360 = 乳夹口交（facade-names）
 *   cflag:361 = 口交时自慰（facade-names）
 *   cflag:362 = 手搓口交（facade-names）
 *   cflag:363 = 真空口交（facade-names）
 *   cflag:364 = 六九式（facade-names）
 *   cflag:365 = 深喉（facade-names）
 *   cflag:370 = 魔族化（facade-names）
 *   cflag:372 = 壶虫着脱（facade-names）
 *   cflag:374 = 肛门虫着脱（facade-names）
 *   cflag:375 = 阴蒂夹着脱（facade-names）
 *   cflag:376 = 乳头夹着脱（facade-names）
 *   cflag:377 = 榨乳器着脱（facade-names）
 *   cflag:378 = 飞机杯着脱（facade-names）
 *   cflag:379 = 肛珠着脱（facade-names）
 *   cflag:380 = 眼罩着脱（facade-names）
 *   cflag:381 = 强制口交（facade-names）
 *   cflag:385 = 绳子着脱（facade-names）
 *   cflag:386 = 口塞着脱（facade-names）
 *   cflag:41 = 上衣类型（facade-names）
 *   cflag:650 = NTR再捕获（facade-names）
 *   flag:30 = 爱或淫乱人数（facade-names）
 *   flag:37 = 着衣系统（facade-names）
 *   flag:62 = 肉便器行动（facade-names）
 *   flag:7 = 口上开关（facade-names）
 *   tflag:13 = 初吻与自我口上（facade-names）
 *   tflag:150 = 反抗刻印回避（facade-names）
 *   tflag:16 = 犬射精或处刑口上（facade-names）
 *   tflag:18 = 足交射精或处遇口上（facade-names）
 *   tflag:20 = 主人导致处女丧失（facade-names）
 *   tflag:21 = 反抗刻印变动（facade-names）
 *   tflag:22 = 苦痛刻印变动（facade-names）
 *   tflag:23 = 快乐刻印变动（facade-names）
 *   tflag:24 = 屈服刻印变动（facade-names）
 *   tflag:3 = 处女丧失（facade-names）
 *   tflag:400 = 死斗场敌种（facade-names）
 *   tflag:500 = 博物馆口上（facade-names）
 *   tflag:510 = 流放口上（facade-names）
 *   tflag:520 = 公开处刑口上（facade-names）
 *   tflag:530 = 猎奇处刑口上（facade-names）
 *   tflag:60 = 插着不拔（facade-names）
 *   tflag:899 = 失神（facade-names）
 *
 * == 复核标记（153 处） ==
 * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法
 * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，
 * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW
 * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），
 * 复核成果不会被重跑覆盖。
 *   1. :94 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
 *   2. :338 CALL K5_KOJO2 —— 口上文件里多为存根调用，人工定存根名
 *   3. :339 CALL K5_FUKU —— 口上文件里多为存根调用，人工定存根名
 *   4. :399 CALL K5_KOJO2 —— 口上文件里多为存根调用，人工定存根名
 *   5. :400 CALL K5_FUKU —— 口上文件里多为存根调用，人工定存根名
 *   6. :489 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   7. :493 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   8. :507 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   9. :511 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   10. :566 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   11. :570 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   12. :583 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   13. :587 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   14. :641 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   15. :643 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   16. :652 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   17. :664 同名函数 @EVENTEND 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTEND', …) 注册，参照 ere/kojo/kojo-k5.js
 *   18. :788 CALL COLOSSEUM_KOJO_5 —— 口上文件里多为存根调用，人工定存根名
 *   19. :918 局部变量 P = PALAM:3 + UP:3 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   20. :920 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   21. :927 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   22. :933 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   23. :939 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   24. :945 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   25. :951 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   26. :957 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   27. :992 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   28. :997 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   29. :1011 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   30. :1032 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   31. :1037 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   32. :1051 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   33. :1064 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   34. :1075 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   35. :1095 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
 *   36. :1149 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
 *   37. :2332 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   38. :2338 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   39. :2357 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   40. :2365 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   41. :2490 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   42. :2496 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   43. :2512 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   44. :2518 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   45. :2537 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   46. :2596 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   47. :2602 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   48. :2620 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   49. :2625 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   50. :2716 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   51. :2721 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   52. :2746 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   53. :2750 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   54. :2850 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   55. :2856 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   56. :2870 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   57. :2889 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   58. :2895 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   59. :2907 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   60. :2983 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   61. :2989 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   62. :3003 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   63. :3023 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   64. :3029 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   65. :3043 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   66. :3120 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   67. :3126 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   68. :3140 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   69. :3162 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   70. :3168 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   71. :3182 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   72. :3262 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   73. :3268 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   74. :3287 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   75. :3320 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   76. :3326 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   77. :3345 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   78. :3420 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   79. :3443 RAND RAND:100 → rand_n(100)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   80. :3507 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   81. :3511 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   82. :3523 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   83. :3527 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   84. :3596 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   85. :3625 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   86. :3823 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   87. :3829 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   88. :3835 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   89. :3858 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   90. :3864 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   91. :3870 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   92. :3892 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   93. :3896 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   94. :4025 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   95. :4030 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   96. :4044 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   97. :4064 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   98. :4069 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   99. :4082 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   100. :4720 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
 *   101. :4729 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
 *   102. :4801 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   103. :4813 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   104. :4815 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   105. :4817 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   106. :4817 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   107. :4825 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   108. :4827 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   109. :4847 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   110. :4859 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   111. :4861 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   112. :4863 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   113. :4863 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   114. :4871 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
 *   115. :4873 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   116. :5191 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   117. :5204 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   118. :5204 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   119. :5236 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   120. :5236 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   121. :5685 局部变量 A = UP:11 + UP:12 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   122. :5725 局部变量 P = PALAM:3 + UP:3 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   123. :5726 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   124. :5760 局部变量 P = PALAM:5 + UP:5 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   125. :5761 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   126. :5797 局部变量 P = PALAM:8 + UP:8 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   127. :5798 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   128. :5816 局部变量 P = PALAM:10 + UP:10 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   129. :5817 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
 *   130. :5835 表达式寻址 NOWEX:0 → era.get('nowex:0')——族名直译，语义与归属人工定
 *   131. :5855 表达式寻址 NOWEX:1 → era.get('nowex:1')——族名直译，语义与归属人工定
 *   132. :5876 表达式寻址 NOWEX:1 → era.get('nowex:1')——族名直译，语义与归属人工定
 *   133. :5899 表达式寻址 NOWEX:2 → era.get('nowex:2')——族名直译，语义与归属人工定
 *   134. :5922 表达式寻址 NOWEX:3 → era.get('nowex:3')——族名直译，语义与归属人工定
 *   135. :7147 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   136. :7149 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   137. :7169 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   138. :7171 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   139. :7199 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   140. :7201 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   141. :7208 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   142. :7210 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   143. :7277 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   144. :7310 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   145. :7334 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
 *   146. :7745 函数参数 @GOBI_KOUJO_K5, ARG:0 —— 参数声明已剥（JS 函数签名人工定）
 *   147. :7748 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   148. :7751 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   149. :7754 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   150. :7757 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   151. :7760 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   152. :7766 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   153. :7768 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 */

'use strict';

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。















































































// @EVENTTRAIN // :80
async function EVENTTRAIN() {
  // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :81
  // FLAG:105  = 1（变量语义：FLAG 族，105） // :82
  era.set('flag:105', 1); // :82
  if (era.get('flag:7') == 0) { // :84
    // FLAG:7  = 2（变量语义：FLAG 族，7） // :84
    era.set('flag:7', 2); // :84
  } // :84

}

// @EVENTEND // :86
async function EVENTEND() {
  // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :87
  // FLAG:105  = 0（变量语义：FLAG 族，105） // :88
  era.set('flag:105', 0); // :88





}

// @EVENTTRAIN // :94
async function EVENTTRAIN() {
  if (era.get('flag:7') <= 0) { // :96
    return 0; // :96
  } // :96
  if (era.get(`talent:${target}:165`) != 1) { // :98
    return 0; // :98
  } // :98




  if (era.get(`cflag:${target}:201`) == 0) { // :103
    era.drawLine(); // :104

    if (era.get(`talent:${target}:314`) == 9) { // :106
      await era.printAndWait(`「不要…不要啊…对不起…对不起…神啊…救救我吧………」`); // :107
      await era.printAndWait(`眼前这个魔族少女…曾经是人类、名为玛奥的这个少女在房间的角落里低声啜泣着。`); // :108
      await era.printAndWait(`${master_name}看着那个重生为魔族的少女、露出满意的微笑、出声搭话。`); // :109
      await era.printAndWait(`最初少女只是发呆地看着这边、或许是因为魔族的本能、认出了${master_name}就是魔王。`); // :110
      await era.printAndWait(`「…………魔王大人？…魔王大人的话…会救贖我的吧…？」`); // :111
      await era.printAndWait(`虽然成为了魔族、但是没有随着肉体堕落勉强维持住理智的少女、终于找到了自己的主人………`); // :112
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :113
      era.set(`cflag:${target}:201`, 1); // :113

      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :115
      era.set(`cflag:${target}:370`, 1); // :115

    } else { // :117
      await era.printAndWait(`「你…你这家伙是谁啊！对本小姐做出这样的事、村子里的大家不会放过你的！」`); // :118
      await era.printAndWait(`少女…名字好像是叫玛奥…虽然被带到了调教室里、态度仍旧十分傲慢。`); // :119
      await era.printAndWait(`看上去是个１２~３岁左右的小女孩、晒黑的褐色肌肤与红色的头发十分相配、显得很可爱。`); // :120
      await era.printAndWait(`「要是敢做奇怪的事的话就咬你哦！」`); // :121
      await era.printAndWait(`${master_name}把自己是魔王这件事告诉了少女、问她想要什么作为复活自己的回礼。`); // :122
      await era.printAndWait(`「骗…骗人的吧…魔王什么的不是童话里才有的吗…回、回礼什么的…总之我想要从这里出去…不、不行吗…？」`); // :123
      await era.printAndWait(`${master_name}看起来愉快地摇着头、用手摁住了少女的肩………`); // :124
      await era.printAndWait(`「讨…讨厌…别摸我…别过来！」`); // :125
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :126
      era.set(`cflag:${target}:201`, 1); // :126
      return 1; // :127
    } // :128



  } else if (era.get(`cflag:${target}:201`) < 5 && era.get(`cflag:${target}:370`) == 0 && era.get(`talent:${target}:314`) == 9 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :132
    await era.printAndWait(`「我大概…已经…没法回到村子里去了……」`); // :133
    await era.printAndWait(`眼前的魔族少女…曾经是人类的玛奥失望地垂下头、看着${master_name}。`); // :134
    await era.printAndWait(`「变成这样的身体什么的、根本没有想过啊………」`); // :135
    await era.printAndWait(`${target_name}的脸皱了起来、一副马上要哭出来的样子。`); // :136

    // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :138
    era.set(`cflag:${target}:370`, 2); // :138
    return 1; // :139



  } else if (era.get(`cflag:${target}:201`) >= 1 && era.get(`cflag:${target}:650`) == 1) { // :143
    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) { // :144
      era.drawLine(); // :145
      await era.printAndWait(`把在那个水晶球看到的事情告诉她之后、${target_name}的脸就像戴上了能面面具一样没有了表情。`); // :146
      await era.printAndWait(`「够、够了…干脆…干脆杀了我吧…我已经…不想再被很强的家伙玩来玩去了………那个狂王大人也是…魔王大人也是………」`); // :147
      await era.printAndWait(`「但是反正要死的话…想被魔王大人…杀死…就…就算被弄得七零八落也…只是希望不要被魔物杀了吃掉就好………」`); // :148
      await era.printAndWait(`”毕竟还是个小女孩”${master_name}用鼻子吭声冷笑、不管怎样${target_name}的命运从最初开始就被${master_name}握在手里、那之中已经不存在${target_name}的意志了………`); // :149

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :151
      era.set(`cflag:${target}:650`, 0); // :151
    } else { // :152
      era.drawLine(); // :153
      await era.printAndWait(`「魔王大人、对、对不起、我对魔王大人一点违逆之心都没有…是那个狂王…强行要我………」`); // :154
      await era.printAndWait(`「请、请原谅…请原谅我吧………」`); // :155
      await era.printAndWait(`${master_name}讲起被送来的水晶球你拍摄的内容、${target_name}五体投地跪在地上请求原谅………`); // :156

      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :158
      era.set(`cflag:${target}:650`, 0); // :158
    } // :159
    return 1; // :160





  } else if (era.get(`cflag:${target}:201`) < 2 && era.get(`mark:${target}:2`) == 1 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :166
    era.drawLine(); // :167
    await era.printAndWait(`「只要忍耐的话…勇者大人一定会来拯救我的…！」`); // :168
    await era.printAndWait(`${target_name}依然还有反抗的精力、逞强地回瞪着你………`); // :169
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :170
    era.set(`cflag:${target}:201`, 2); // :170
    return 1; // :171


  } else if (era.get(`cflag:${target}:201`) < 3 && era.get(`mark:${target}:2`) == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :174
    era.drawLine(); // :175
    await era.printAndWait(`「为什么…谁都没来救我………？」`); // :176
    await era.printAndWait(`看起来${target_name}的精神已经变得相当很疲惫了………`); // :177
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :178
    era.set(`cflag:${target}:201`, 3); // :178
    return 1; // :179


  } else if (era.get(`cflag:${target}:201`) < 4 && era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :182
    era.drawLine(); // :183
    await era.printAndWait(`「如果再这样下去的话…我、我整个人都要变得奇怪了………！」`); // :184
    await era.printAndWait(`${target_name}满脸通红、身体绷紧劇烈颤抖着。照着个样子下去要不了多久就会陷落的吧………`); // :185
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :186
    era.set(`cflag:${target}:201`, 4); // :186
    return 1; // :187

  } else if (era.get(`cflag:${target}:201`) < 5 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:314`) != 9) { // :189
    era.drawLine(); // :190
    await era.printAndWait(`${target_name}连${master_name}来到了房间都没在意、一直玩弄着股间。`); // :191
    await era.printAndWait(`「啊啊${heart(1)}…小穴…好舒服…好舒服啊…${heart(1)}」`); // :192
    await era.printAndWait(`「啊…主人…欺负小穴…好舒服…真的好舒服呜呜${heart(1)}」`); // :193
    await era.printAndWait(`${target_name}看到${master_name}来了、抬起腰、用手指摩擦着股间。`); // :194
    if (era.get(`talent:${target}:0`) == 1) { // :196
      await era.printAndWait(`「好想快点被人夺走处女…已经做好准备了…${heart(1)}」`); // :196
    } // :196
    await era.printAndWait(`${target_name}一边露出心神荡漾的表情一边持续着自慰、看起来已经完全变成淫乱的雌性了。`); // :197
    await era.printAndWait(`「已经…被…被怎么对待都可以…想要变得舒服起来${heart(1)}」`); // :198
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :199
    era.set(`cflag:${target}:201`, 5); // :199
    return 1; // :200

  } else if (era.get(`talent:${target}:314`) == 9 && era.get(`cflag:${target}:201`) < 6 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 1) { // :202
    era.drawLine(); // :203

    if (era.get(`cflag:${target}:370`) == 1) { // :205
      await era.printAndWait(`${target_name}匍匐在地上、不停玩弄着股间。`); // :206
      await era.printAndWait(`背上的翅膀看起来很舒服地伸展着、口水都滴到了地上。`); // :207
      await era.printAndWait(`「主人…快…快…快来侵犯我啊………${heart(1)}」`); // :208
      await era.printAndWait(`察觉到${master_name}到来的${target_name}一脸心神荡漾荡地投去了视线。`); // :209
      await era.printAndWait(`「啊…是主人啊…${heart(1)} 抱抱…抱抱………${heart(1)}」`); // :210
      await era.printAndWait(`经过反复调教而变得十分淫乱的${target_name}一边抱住${master_name}一边用自己的股间磨蹭${master_name}的大腿。`); // :211
      await era.printAndWait(`「好想做爱…已经忍不住啦…呐…快点去床上吧…${heart(1)}」`); // :212
      if (era.get(`talent:${target}:0`) == 1) { // :214
        await era.printAndWait(`「我还是处女哦${heart(1)}…想要主人快点来侵犯我已经想的受不了了啦…${heart(1)}」`); // :214
      } // :214
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :215
      era.set(`cflag:${target}:201`, 6); // :215
      return 1; // :216

    } else if (era.get(`cflag:${target}:370`) == 2) { // :218
      await era.printAndWait(`${target_name}匍匐在地上、不停玩弄着股间。`); // :219
      await era.printAndWait(`背上的翅膀看起来很舒服地伸展着、口水都滴到了地上。`); // :220
      await era.printAndWait(`「主人…快…快…快来侵犯我啊………${heart(1)}」`); // :221
      await era.printAndWait(`察觉到${master_name}到来的${target_name}一脸心神荡漾荡地投去了视线。`); // :222
      await era.printAndWait(`「啊…主人…我…被主人抱太多次了…整个人都变得奇怪了…${heart(1)}」`); // :223
      await era.printAndWait(`经过反复调教而变得十分淫乱的${target_name}一边抱住${master_name}一边用自己的股间磨蹭${master_name}的大腿。`); // :224
      await era.printAndWait(`「这是因为变成魔族的原因么？啊啊…总之我忍不住了啊…呐…就这样做下去吧…${heart(1)}」`); // :225
      if (era.get(`talent:${target}:0`) == 1) { // :227
        await era.printAndWait(`「我还是处女哦${heart(1)}…想要主人快点来侵犯我已经想的受不了了啦…${heart(1)}」`); // :227
      } // :227
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :228
      era.set(`cflag:${target}:201`, 6); // :228
      return 1; // :229

    } else { // :231
      await era.printAndWait(`「欸嘿嘿…我也成为和主人一样的魔族了呢…${heart(1)}」`); // :232
      await era.printAndWait(`${target_name}步伐轻快地跑过去抱住了${master_name}。`); // :233
      await era.printAndWait(`「主人…能感受到魔王大人的魔力非常的厉害…如果小穴就这样被干的话…我一定会变得奇怪的${heart(1)}」`); // :234
      await era.printAndWait(`${master_name}眼里露出期待的目光、这样放任下去的话一定会推倒${master_name}的吧。`); // :235
      await era.printAndWait(`更是一副绝对不会放手的样子把尾巴缠到了${master_name}的大腿上………`); // :236
      if (era.get(`talent:${target}:0`) == 1) { // :237
        await era.printAndWait(`「啊哈…新生的我的处女小穴…快点来贯穿吧…来侵犯我吧${heart(1)}」`); // :238
      } else { // :239
        await era.printAndWait(`「拜…托了…想要主人的肉棒…忍不住了…忍不住了啦${heart(1)}」`); // :240
      } // :241
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :242
      era.set(`cflag:${target}:201`, 6); // :242
      return 1; // :243
    } // :244


  } else if (era.get(`cflag:${target}:201`) < 7 && era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:314`) != 9 && era.get(`talent:${target}:76`) == 0) { // :247
    era.drawLine(); // :248








    await era.printAndWait(`「主人…我、我…已经…不会再违抗你了………」`); // :257
    await era.printAndWait(`少女跪在地上、双手合十地恳求着。`); // :258
    await era.printAndWait(`「无论什么…做饭也好、打掃也好…我都会做的…所、所以………」`); // :259
    await era.printAndWait(`「请让我一直呆在这里…不要把我从魔王大人身边赶走！」`); // :260
    await era.printAndWait(`${master_name}把哭得不成样子的${target_name}抱到怀里、让她在自己的胸膛上抽泣着………`); // :261
    await era.printAndWait(`「即使回到村子…也已经…没有我的容身之处了………」`); // :262
    // CFLAG:201  = 7（变量语义：CFLAG 族，201） // :263
    era.set(`cflag:${target}:201`, 7); // :263
    return 1; // :264

  } else if (era.get(`talent:${target}:314`) == 9 && era.get(`cflag:${target}:201`) < 8 && era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:76`) == 0) { // :266
    era.drawLine(); // :267

    if (era.get(`cflag:${target}:370`) == 1) { // :269
      await era.printAndWait(`今天的${target_name}顺从地等候着${master_name}。`); // :270
      await era.printAndWait(`「不想离开…主人…」`); // :271
      await era.printAndWait(`出神地看着这边的${target_name}向${master_name}撒着娇。`); // :272
      await era.printAndWait(`「传达过来的主人的魔力让我感到十分放心呢…${heart(3)}」`); // :273
      await era.printAndWait(`${target_name}抱住${master_name}、把尾巴缠上了他的大腿。`); // :274
      await era.printAndWait(`「啊啊、最喜欢主人了…${heart(1)} 真的最喜欢了………${heart(1)}」`); // :275
      await era.printAndWait(`${target_name}一边在${master_name}的耳边细语着情话一边开心地笑了。`); // :276
      await era.printAndWait(`「感谢您让我成为魔族…我真的很高兴哟…${heart(1)}」`); // :277
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :278
      era.set(`cflag:${target}:201`, 8); // :278
      return 1; // :279

    } else if (era.get(`cflag:${target}:370`) == 2) { // :281
      await era.printAndWait(`${master_name}进到了可爱的奴隶${target_name}的房间。`); // :282
      await era.printAndWait(`「啊！…真、真是的…别突然进来啊笨蛋！」`); // :283
      await era.printAndWait(`「讨厌～…主人一点都不体贴、记得要敲门啊！」`); // :284
      await era.printAndWait(`马上打扮完的${target_name}一边整理着头发一边走向${master_name}。`); // :285

      if (era.get('flag:30') >= 5) { // :287
        await era.printAndWait(`「老是陪着勇者大人们…我真的受够了！你根本什么都不明白！」`); // :288
        await era.printAndWait(`${target_name}撅着嘴盯着${master_name}。`); // :289
        await era.printAndWait(`「………但、但是…主人最爱的果然还是我呢…${heart(1)}」`); // :290
        await era.printAndWait(`可是突然眉开眼笑地在${master_name}的胸口划着圈圈。`); // :291
        await era.printAndWait(`「我是多么想生下…魔王大人的孩子啊…所以、呐？」`); // :292
        await era.printAndWait(`${target_name}耳朵通红地向${master_name}乞求………`); // :293
        if (era.get(`talent:${target}:0`) == 1) { // :295
          await era.printAndWait(`「啊…真是的！太让女孩子丢人了！」`); // :295
        } // :295

      } else if (era.get('flag:30') >= 2) { // :297
        await era.printAndWait(`「那样真的会被原勇者大人讨厌的吧？」`); // :298
        await era.printAndWait(`${target_name}背着手转过身来、投来了炽热的目光。`); // :299
        await era.printAndWait(`（嘛、我这样做也不坏呢…竞争对手自然是越少越好………）忽然避开视线小声嘟哝着。`); // :300
        await era.printAndWait(`「那个、你看啊…被别人讨厌的魔王大人…我、我会好好安慰你的${heart(1)}」`); // :301
        await era.printAndWait(`「因为只有作为魔族的我才是主人你的同伴哦${heart(1)}」`); // :302
        await era.printAndWait(`${target_name}害羞地抱住了${master_name}………`); // :303

      } else { // :305
        await era.printAndWait(`「那样做真的会被抓到的勇者大人讨厌的吧？」`); // :306
        await era.printAndWait(`${target_name}背着手转过身来、投来了炽热的目光。`); // :307
        await era.printAndWait(`（嘛、我这样做也不坏呢………）忽然避开视线小声嘟哝着。`); // :308
        await era.printAndWait(`「那个、你看啊…被别人讨厌的魔王大人…我、我会好好安慰你的${heart(1)}」`); // :309
        await era.printAndWait(`「因为只有作为魔族的我才是主人你的同伴哦${heart(1)}」`); // :310
        await era.printAndWait(`${target_name}害羞地抱住了${master_name}………`); // :311
      } // :312
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :313
      era.set(`cflag:${target}:201`, 8); // :313
      return 1; // :314

    } else { // :316
      await era.printAndWait(`「啊…主人啊…看吧、这绝妙的青色肌肤………」`); // :317
      await era.printAndWait(`${target_name}一边双手抚摸着自己的青色肌肤一边神魂颠倒地发着呆。`); // :318
      await era.printAndWait(`「只是想着过会要被主人做什么就已经要变得奇怪了………${heart(1)}」`); // :319
      await era.printAndWait(`${target_name}浑身发抖、瘫倒在地摩擦着双腿。`); // :320
      await era.printAndWait(`「感受到了魔王大人那无与伦比的魔力…看啊…呐…${heart(1)}」`); // :321
      await era.printAndWait(`${target_name}怯生生地张开双手诱惑着${master_name}。`); // :322
      await era.printAndWait(`「拜托了啦…好好抱抱新生的我把！」`); // :323
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :324
      era.set(`cflag:${target}:201`, 8); // :324
      return 1; // :325
    } // :326

  } else if (era.get(`talent:${target}:9`) == 1 && era.get(`cflag:${target}:201`) < 9) { // :328
    era.drawLine(); // :329
    await era.printAndWait(`「啊啊…我、我已经…受够了…不要…不要…不要啊………」`); // :330
    await era.printAndWait(`${target_name}靠着墙坐着、嘴里不知道在嘟哝着什么。仔细一看她周围都是失禁的秽物。`); // :331
    await era.printAndWait(`精神已经崩坏的${target_name}应该恢复不了吧………`); // :332
    // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :333
    era.set(`cflag:${target}:201`, 9); // :333
    return 1; // :334


  } else if (era_flag.assi < 0) { // :337
    // CALL K5_KOJO2 // :338
    // CALL K5_FUKU // :339


























































  } else { // :398
    // CALL K5_KOJO2 // :399
    // CALL K5_FUKU // :400
  } // :401





}

// @K5_KOJO2 // :407
async function K5_KOJO2() {

  if (era.get(`talent:${target}:9`) == 1 && era.get('flag:7') == 2) { // :409
    era.drawLine(); // :410
    await era.printAndWait(`「呼…呼…别碰我…真是的…请不要再对我动手动脚的了…啊…啊啊……」`); // :411
    await era.printAndWait(`不能期待精神已经崩坏了的${target_name}做出正面的回应吧………`); // :412
    return 1; // :413


  } else if (era.get(`mark:${target}:3`) == 3 && era.get('flag:7') == 2) { // :416
    era.drawLine(); // :417
    await era.printAndWait(`「呜！呜！」`); // :418
    await era.printAndWait(`${target_name}发出警惕的嘶吼。简直和野兽一样。`); // :419
    return 1; // :420


  } else if (era.get(`mark:${target}:2`) == 0 && era.get('flag:7') == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :423
    era.drawLine(); // :424
    await era.printAndWait(`「别、别过来啊、咬你哦！」`); // :425
    await era.printAndWait(`${target_name}知道没用但还是虚张声势着………`); // :426
    return 1; // :427


  } else if (era.get(`mark:${target}:2`) == 1 && era.get('flag:7') == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :430
    era.drawLine(); // :431
    await era.printAndWait(`「像你这种人总有一天会被勇者大人打倒的！」`); // :432
    await era.printAndWait(`${target_name}事到如今依然对将来怀有希望………`); // :433
    return 1; // :434


  } else if (era.get(`mark:${target}:2`) == 2 && era.get('flag:7') == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :437
    era.drawLine(); // :438
    await era.printAndWait(`「这样做也没关系哦…完全不要紧的………」`); // :439
    await era.printAndWait(`${target_name}的身体微微颤抖、小声嘟哝着………`); // :440
    return 1; // :441


  } else if (era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get('flag:7') == 2 && era.get(`talent:${target}:76`) == 0) { // :444
    era.drawLine(); // :445
    await era.printAndWait(`「啊啊…会听…魔王大人的命令的………已经不那么痛了………」`); // :446
    await era.printAndWait(`${target_name}顺从地准备开始………`); // :447
    return 1; // :448


  } else if (era.get(`talent:${target}:76`) == 1 && era.get('flag:7') == 2) { // :451
    era.drawLine(); // :452


    if (era.get('flag:37') != 0) { // :455

      if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 1) { // :457
        await era.printAndWait(`虽然${target_name}穿着的只是很普通的便宜衣服、她却十分爱惜。`); // :458
        await era.printAndWait(`「一直以来穿的都是姐姐穿过的旧衣服、把这样的衣服给我穿实在是太浪费了♪」`); // :459
        await era.printAndWait(`「那个、所以…今天也会做的吧？ 可以哦、即使把衣服弄脏也…衣服染上主人的气味什么的最棒了${heart(1)}」`); // :460
        await era.printAndWait(`${target_name}一边说着那样的话一边撩起裙子露出了可爱的内衣………`); // :461
        return 1; // :462

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 101) { // :464
        await era.printAndWait(`虽然${target_name}穿着的只是很普通的便宜衣服、她却十分爱惜。`); // :465
        await era.printAndWait(`「呐、怎么样？合适吗？…但是、我穿着这样的裤子完全就像是个男孩子嘛…而且做起来不是会很麻烦吗」`); // :466
        await era.printAndWait(`可是${target_name}一边笑着一边弯下腰撅起了屁股。`); // :467
        await era.printAndWait(`「看啊看啊～碰到屁股了哦～♪ 嗯…就那样把内裤脱掉…侵犯我把…${heart(1)}」`); // :468
        return 1; // :469

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 209) { // :471
        await era.printAndWait(`${target_name}提起女僕装的裙摆、按照${master_name}吩咐的样子行礼。`); // :472
        await era.printAndWait(`「非常感谢您选择了我。在这段时间里我会诚心诚意地为您服务的………」`); // :473
        await era.printAndWait(`「………啊哈…当然是H意义上的${heart(1)} 吮吸主人的肉棒吗？可以哟！」`); // :474
        await era.printAndWait(`啊啊、淫乱至极的${target_name}马上结束了行礼、不留痕迹地抱住了${master_name}的下半身吮吸起来………`); // :475
        return 1; // :476

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 203) { // :478
        await era.printAndWait(`「啊哈…主人…现在的我是不是色色的？很淫荡？」`); // :479
        await era.printAndWait(`${target_name}穿着的妓女服是量身定制的、与她的肤色非常相配的粉色木纹礼服胸口深V露出的深壑让${master_name}觉得十分赏心悦目。`); // :480
        await era.printAndWait(`「因为我是被主人买下的专用少女娼妓…什么都可以做哟…啊、但是应该和平时一样吧、尼嘿嘿♪」`); // :481
        await era.printAndWait(`${target_name}害羞地行了一礼并拉起了裙子。`); // :482
        await era.printAndWait(`「啊啊…想要展现自己、特别是H这方面的…主人…我们来做爱吧${heart(1)}」`); // :483
        return 1; // :484
      } // :485
    } // :486

    if (era.get(`talent:${target}:314`) == 9) { // :488
      if (rand_n(3) == 0) { // :489
        await era.printAndWait(`「今天想要舔主人身体的各个地方呢${heart(1)}」`); // :490
        await era.printAndWait(`${target_name}舔了舔紫色的嘴唇。`); // :491
        await era.printAndWait(`「肉棒也好肛门也好…无论是哪里我都会舔的哟…${heart(1)}」`); // :492
      } else if (rand_n(2) == 0) { // :493
        await era.printAndWait(`「啊啊嗯、魔王大人…今天也请赐予我满满的魔力吧${heart(1)}」`); // :494
        await era.printAndWait(`${target_name}颤动着背上的翅膀像撒欢的小狗一样和${master_name}嬉戏着、灼热的娇喘让人觉得很淫乱………`); // :495
        await era.printAndWait(`「身体里无论哪里都会接受的${heart(1)}」`); // :496
      } else { // :497
        await era.printAndWait(`「主人${heart(1)} 今天也请让我侍奉肉棒…我会好好努力的${heart(1)}」`); // :498
        await era.printAndWait(`${target_name}跪在${master_name}胯间吮吸着………`); // :499
        if (era.get(`abl:${target}:32`) >= 3) { // :501
          await era.printAndWait(`「主人的精液…全部都是我的东西${heart(1)}」`); // :501
        } // :501
        if (era.get(`abl:${target}:32`) >= 3) { // :503
          await era.printAndWait(`「浓浓的、热热的、美味的…全部都会喝下去的${heart(1)}」`); // :503
        } // :503
      } // :504

    } else { // :506
      if (rand_n(3) == 0) { // :507
        await era.printAndWait(`「主人${heart(1)}…我会好好地侍奉你的${heart(1)}、会让你变得很舒服的${heart(1)}」`); // :508
        await era.printAndWait(`「今天想要舔主人身体的各个地方呢${heart(1)}」`); // :509
        await era.printAndWait(`${target_name}舔了舔可爱的嘴唇………`); // :510
      } else if (rand_n(2) == 0) { // :511
        await era.printAndWait(`「对于我自己的身体我可是很有自信的…一定会让主人变得很舒服的${heart(1)}」`); // :512
        await era.printAndWait(`${target_name}像撒欢的小狗一样和${master_name}嬉戏着、灼热的娇喘让人觉得很淫乱………`); // :513
      } else { // :514
        await era.printAndWait(`「主人${heart(1)} 今天也请让我侍奉肉棒…我会好好努力的${heart(1)}」`); // :515
        await era.printAndWait(`${target_name}跪在${master_name}胯间吮吸着………`); // :516
        if (era.get(`abl:${target}:32`) >= 3) { // :518
          await era.printAndWait(`「主人的精液…全部都是我的东西${heart(1)}」`); // :518
        } // :518
        if (era.get(`abl:${target}:32`) >= 3) { // :520
          await era.printAndWait(`「浓浓的、热热的、美味的…全部都会喝下去的${heart(1)}」`); // :520
        } // :520
      } // :521
    } // :522
    return 1; // :523

  } else if (era.get(`talent:${target}:85`) == 1 && era.get('flag:7') == 2) { // :525
    era.drawLine(); // :526

    if (era.get(`cflag:${target}:42`) == 91 && (era.get(`cflag:${target}:40`) & 64) && era.get(`cflag:${target}:601`) == 901 && era.get('flag:37') != 0) { // :528
      await era.printAndWait(`${target_name}出神地看着手上的戒指。`); // :529
      await era.printAndWait(`可是注意到${master_name}看着这边是马上红着脸端正了坐姿。`); // :530
      await era.print(''); // :531
    } // :532


    if (era.get('flag:37') != 0) { // :535

      if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 1) { // :537
        await era.printAndWait(`「还在村子里时、一直只能穿姐姐穿过的旧衣服…能穿上这么好的衣服什么的…非常感谢主人！」`); // :538
        await era.printAndWait(`只是如此普通的衣服就让少女如此高兴反而让你有些害羞。但是、看到那样的${target_name}你也觉得很高兴。`); // :539
        await era.printAndWait(`于是${target_name}发自内心的笑着突然转过身来。飘扬的裙摆让你觉得美丽到炫目………`); // :540
        return 1; // :541

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 101) { // :543
        await era.printAndWait(`「还在村子里时、一直只能穿姐姐穿过的旧衣服…能穿上这么好的衣服什么的…非常感谢主人！」`); // :544
        await era.printAndWait(`只是如此普通的衣服就让少女如此高兴反而让你有些害羞。`); // :545
        await era.printAndWait(`「欸嘿嘿、穿裤子的样子也很可爱吧？」`); // :546
        return 1; // :547

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 209) { // :549
        await era.printAndWait(`${target_name}提起女僕装的裙摆、按照${master_name}吩咐的样子行礼。`); // :550
        await era.printAndWait(`「非常感谢您选择了我。在这段时间里我会诚心诚意地为您服务的………」`); // :551
        await era.printAndWait(`「………啊~真是的！这个好像不怎么适合我啊！好害羞啊~！」`); // :552
        await era.printAndWait(`接下来要做更加羞羞的事情吧…${master_name}不由地苦笑起来。`); // :553
        return 1; // :554

      } else if ((era.get(`cflag:${target}:40`) & 28) && era.get(`cflag:${target}:41`) == 203) { // :556
        await era.printAndWait(`「那、那个…这么艳丽的衣服是不适合我…的呀！」`); // :557
        await era.printAndWait(`${master_name}把手伸进了${target_name}的妓女服胸口露出的深壑里、温柔地抚摸着胸部。`); // :558
        await era.printAndWait(`${target_name}发出甜腻的呻吟、向${master_name}的怀里挤了挤。`); // :559
        await era.printAndWait(`「啊…哈…♪…真是的…主人…更加…H…也是可以的哟…${heart(1)}」`); // :560
        return 1; // :561
      } // :562
    } // :563

    if (era.get(`talent:${target}:314`) == 9) { // :565
      if (rand_n(3) == 0) { // :566
        await era.printAndWait(`「啊…今天也请好好疼爱我${heart(1)}」`); // :567
        await era.printAndWait(`「想要直接感受主人的魔力哟………」`); // :568
        await era.printAndWait(`${target_name}颤动着背上的翅膀、看起来让人十分焦急………`); // :569
      } else if (rand_n(2) == 0) { // :570
        await era.printAndWait(`「呐呐…我比勇者姐姐们都要更“好”吗…？」`); // :571
        await era.printAndWait(`「………欸嘿嘿…果然是因为都是魔族所以相性很好吧…好高兴${heart(1)}」`); // :572
        await era.printAndWait(`${target_name}在${master_name}的胸口撒娇似地蹭了蹭鼻子。`); // :573
        await era.printAndWait(`「呐…来做吧…想要满满的魔力哟${heart(1)}」`); // :574
      } else { // :575
        await era.printAndWait(`「最喜欢…魔王大人了${heart(1)}」`); // :576
        await era.printAndWait(`「只是凝视着你就让我不能自已了呢…${heart(1)}」`); // :577
        await era.printAndWait(`正如${target_name}所说的、她黄色的眼眸漸漸湿润了、差不多该好好疼爱她一番了吧………`); // :578
      } // :579

    } else { // :581

      if (rand_n(3) == 0) { // :583
        await era.printAndWait(`「欸嘿嘿、欢迎主人你大驾光临${heart(1)} 我一直在等你哟~」`); // :584
        await era.printAndWait(`「要好好疼爱我哦${heart(1)} 明明只是被主人触摸而已…为什么会感到这么高兴呢${heart(1)}」`); // :585
        await era.printAndWait(`${target_name}无忧无虑地笑着准备开始………`); // :586
      } else if (rand_n(2) == 0) { // :587
        await era.printAndWait(`「那个…那个…或许…我比勇者姐姐们都要更“好”吗…？」`); // :588
        await era.printAndWait(`「是那样的话…我真的非常高兴呢…呜呼呼${heart(1)}」`); // :589
        await era.printAndWait(`${master_name}温柔地抚摸着${target_name}的头………`); // :590
        await era.printAndWait(`「啊…今天也请让我好好地侍奉你${heart(1)}」`); // :591
      } else { // :592
        await era.printAndWait(`「最喜欢…魔王大人了${heart(1)}」`); // :593
        await era.printAndWait(`「只是凝视着你就让我不能自已了呢…${heart(1)}」`); // :594
        await era.printAndWait(`正如${target_name}所说的、她的眼眸漸漸湿润了、差不多该好好疼爱她一番了吧………`); // :595
      } // :596
    } // :597
    return 1; // :598
  } // :599




}

// @K5_FUKU // :604
async function K5_FUKU() {

  if (era.get(`talent:${target}:9`) == 1 && era.get('flag:7') == 2) { // :607
    return 1; // :607
  } // :607

  if (era.get('flag:37') == 0) { // :610
    return 1; // :610
  } // :610

  if (era.get(`cflag:${target}:42`) <= 50 && era.get(`cflag:${target}:42`) != 0) { // :613
    return 1; // :613
  } // :613

  if ((era.get(`cflag:${target}:40`) & 28) == 0 && era.get(`cflag:${target}:41`) == 0) { // :615

    if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :617
      era.drawLine(); // :618
      await era.printAndWait(`浑身赤裸的${target_name}搓着自己冰冷的身体、发现你看到了自己狼狈的样子的${target_name}轻蔑地瞪了你一眼、背过身去………`); // :619

    } else if (era.get(`mark:${target}:2`) == 0 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :621
      era.drawLine(); // :622
      await era.printAndWait(`「那个、这里这么冷能给我一件像样点的衣服吗？…啊…不要露出那种表情啊！稍、稍微差点的衣服也可以啦！」`); // :623

    } else if (era.get(`mark:${target}:2`) == 1 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :625
      era.drawLine(); // :626
      await era.printAndWait(`「啊啊真是的！…我很怕冷的啊、给我一件衣服穿吧！」`); // :627

    } else if (era.get(`mark:${target}:2`) == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :629
      era.drawLine(); // :630
      await era.printAndWait(`「但是…好冷啊…拜托了…给我一件衣服穿吧！」`); // :631

    } else if (era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :633
      era.drawLine(); // :634
      await era.printAndWait(`「那个…请让我吧衣服穿上吧…拜托您了………」`); // :635

    } else if (era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:76`) == 0) { // :637
      era.drawLine(); // :638
      await era.printAndWait(`「那、那个…在主人面前赤身裸体的呼很不好意思啦…想要穿新衣服…不行？不行吗…？」`); // :639

      if (rand_n(3) == 0) { // :641
        await era.printAndWait(`「那个啊、我想试一下“女僕装”啦、当然普通的衣服也可以啦」`); // :642
        if (rand_n(5) == 0 && era.get(`cflag:${target}:42`) != 91) { // :644
          await era.printAndWait(`「………接、接下来…那个…戒、戒指什么的…呀♪」`); // :644
        } // :644
      } // :645

    } else if (era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 1) { // :647
      era.drawLine(); // :648
      await era.printAndWait(`「裸体也不是不可以…可是更想要漂亮的衣服…」`); // :649
      await era.printAndWait(`「呐…帮我买嘛♪」`); // :650

      if (rand_n(3) == 0) { // :653
        await era.printAndWait(`「那个啊、“妓女服”和“女僕装”我都想试一下啦、如果是干净的普通衣服的话也是可以的哟~」`); // :653
      } // :653
    } // :654
  } // :655
  return 1; // :656

  return 0; // :658





}

// @EVENTEND // :664
async function EVENTEND() {
  if (era.get('flag:7') <= 0) { // :666
    return 0; // :666
  } // :666
  if (era.get(`talent:${target}:165`) != 1) { // :668
    return 0; // :668
  } // :668


  if (era.get(`base:${target}:0`) <= 0) { // :672
    return 0; // :672
  } // :672





  if (era.get(`talent:${target}:9`) == 1 && era.get('flag:7') == 2) { // :678
    era.drawLine(); // :679
    await era.printAndWait(`「不要…不要…我不要怀上怪物的孩子…不要啊………」`); // :680
    await era.printAndWait(`${target_name}的眼泪和口水流得到处都是、就这样瘫倒在地上………`); // :681
    return 1; // :682

  } else if (era.get(`mark:${target}:3`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :684
    era.drawLine(); // :685
    await era.printAndWait(`${target_name}在床上啜泣着。`); // :686
    await era.printAndWait(`「姐姐…救救我…救救我啊………」`); // :687
    return 1; // :688


  } else if (era.get(`mark:${target}:2`) <= 1 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :691
    era.drawLine(); // :692
    await era.printAndWait(`${target_name}精疲力尽地瘫倒在地上。`); // :693
    await era.printAndWait(`「这种事…根本不算什么………」`); // :694
    return 1; // :695


  } else if (era.get(`mark:${target}:2`) == 2 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :698
    era.drawLine(); // :699
    await era.printAndWait(`「救救我吧…勇者大人………」`); // :700
    await era.printAndWait(`${target_name}瘫倒在床上、卑微地祈求着帮助………`); // :701
    return 1; // :702


  } else if (era.get(`mark:${target}:2`) == 3 && era.get(`talent:${target}:85`) == 0 && era.get(`talent:${target}:76`) == 0) { // :705
    era.drawLine(); // :706
    await era.printAndWait(`「不能…做…这样的事哦………真是的…受不了你………」`); // :707
    await era.printAndWait(`${target_name}精神恍惚、沉浸在调教的余韵里………`); // :708
    return 1; // :709

  } else if (era.get(`talent:${target}:76`) == 1 && era.get(`base:${target}:0`) >= 500) { // :711
    era.drawLine(); // :712

    if (era.get(`talent:${target}:314`) == 9) { // :714
      await era.printAndWait(`「啊嗯…还不够哟…还想要更多啊」`); // :715
      await era.printAndWait(`${target_name}感到些许的不满足………`); // :716

    } else { // :718
      await era.printAndWait(`「欸嘿嘿…对一个孩子做出这样的事…主人果然很鬼畜呢………${heart(1)}」`); // :719
      await era.printAndWait(`${target_name}在床上哧哧地笑着………`); // :720
    } // :721
    return 1; // :722

  } else if (era.get(`talent:${target}:76`) == 1 && era.get(`base:${target}:0`) <= 500) { // :724
    era.drawLine(); // :725

    if (era.get(`talent:${target}:314`) == 9) { // :727
      await era.printAndWait(`「啊…还要…还想要…请把我干死吧…${heart(1)}」`); // :728
      await era.printAndWait(`${target_name}难受地提高了声音………`); // :729

    } else { // :731
      await era.printAndWait(`「啊…请…请接着做下去…${heart(1)}」`); // :732
      await era.printAndWait(`${target_name}难受地提高了声音、明明应该已经非常累了、不过好像并不是很累的样子………`); // :733
    } // :734
    return 1; // :735


  } else if (era.get(`talent:${target}:85`) == 1 && era.get(`base:${target}:0`) >= 500) { // :738
    era.drawLine(); // :739

    if (era.get(`talent:${target}:314`) == 9) { // :741
      await era.printAndWait(`「魔王大人还满意吗…？」`); // :742
      await era.printAndWait(`${target_name}在床上手忙脚乱的。体力还很富余的样子………`); // :743

    } else { // :745
      await era.printAndWait(`「魔王大人还满意吗…？」`); // :746
      await era.printAndWait(`${target_name}体力还很富余的样子………`); // :747
    } // :748
    return 1; // :749

  } else if (era.get(`talent:${target}:85`) == 1 && era.get(`base:${target}:0`) <= 500) { // :751
    era.drawLine(); // :752

    if (era.get(`talent:${target}:314`) == 9) { // :754
      await era.printAndWait(`「很高兴能好好地侍奉魔王大人哟…${heart(1)}」`); // :755
      await era.printAndWait(`${target_name}露出了满足的笑容………`); // :756

    } else { // :758
      await era.printAndWait(`「对我这样的孩子做出这样的事…主人还真是个变态呢${heart(1)}」`); // :759
      await era.printAndWait(`${target_name}露出了满足的笑容………`); // :760
    } // :761
    return 1; // :762
  } // :763
  return 0; // :764





}

// @KOJO_MESSAGE_COM_5 // :770
async function KOJO_MESSAGE_COM_5() {

  if (era_flag.assi > 0 && era_flag.assiplay) { // :773
    return 0; // :773
  } // :773

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) { // :776
    return 0; // :776
  } // :776

  if (era.get('tflag:899')) { // :779
    return 0; // :779
  } // :779

  if (era.get(`tequip:${target}:89`)) { // :782
    return 0; // :782
  } // :782

  if (era.get(`tequip:${target}:90`)) { // :785
    return 0; // :785
  } // :785

  if (era.get(`tequip:${target}:55`)) { // :787
    // CALL COLOSSEUM_KOJO_5 // :788
    return 0; // :789
  } // :790

  if (era.get(`talent:${target}:9`) == 1) { // :793
    return 0; // :793
  } // :793








  if (era_flag.selectcom == 0) { // :802

    if (era.get(`cflag:${target}:301`) == 0) { // :804

      if (era.get(`mark:${target}:2`) >= 2) { // :806
        await era.printAndWait(`「咕…呜呜…啊！」`); // :807

      } else { // :809
        await era.printAndWait(`「你这个变态…别、别碰我！」`); // :810
        await era.printAndWait(`（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）`); // :811
      } // :812
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :813
      era.set(`cflag:${target}:301`, 1); // :813
      return 0; // :814

    } else { // :816

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:301`) <= 5 || era.get('flag:7') == 2)) { // :818
        await era.printAndWait(`「嗯…啊…主人的手指好厉害…${heart(1)}」`); // :819
        await era.printAndWait(`${target_name}弯曲着身体、把${player_name}的手夹在自己的大腿间。`); // :820
        await era.printAndWait(`「请让我的H小穴…变得更加淫乱吧${heart(1)}」`); // :821
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :822
        era.set(`cflag:${target}:301`, 6); // :822

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:301`) <= 4 || era.get('flag:7') == 2)) { // :824
        await era.printAndWait(`「啊…啊哈…啊${heart(1)}不要嗯${heart(1)}」`); // :825
        await era.printAndWait(`故意发出尖叫的${target_name}显得十分的可爱。`); // :826
        await era.printAndWait(`「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`); // :827
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :828
        era.set(`cflag:${target}:301`, 5); // :828

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:301`) <= 3 || era.get('flag:7') == 2)) { // :830
        await era.printAndWait(`「哈…呜…嗯咕${heart(1)}…啊…啊…嗯${heart(1)}……」`); // :831
        await era.printAndWait(`${target_name}的嘴里不住地发出甜美的娇喘。`); // :832
        await era.printAndWait(`（明明只是被触摸而已…声音…却…忍不住了…啦）`); // :833
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :834
        era.set(`cflag:${target}:301`, 4); // :834

      } else if (era.get(`mark:${target}:2`) == 2 && (era.get(`cflag:${target}:301`) <= 2 || era.get('flag:7') == 2)) { // :836
        await era.printAndWait(`「啊…啊咕…呜呜…嗯咕…！」`); // :837
        await era.printAndWait(`${target_name}感受到了从未体验过的愉悦在沸腾着、忍不住皱起了脸………`); // :838
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :839
        era.set(`cflag:${target}:301`, 3); // :839

      } else if (era.get(`mark:${target}:2`) <= 1 && (era.get(`cflag:${target}:301`) <= 1 || era.get('flag:7') == 2)) { // :841
        await era.printAndWait(`「不要、那、那里…不要…碰那里…啊！」`); // :842
        await era.printAndWait(`${target_name}不停地扭动着身体进行反抗………`); // :843
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :844
        era.set(`cflag:${target}:301`, 2); // :844
      } // :845
      return 0; // :846
    } // :847
  } // :848




  if (era_flag.selectcom == 1) { // :853

    if (era.get(`cflag:${target}:302`) == 0) { // :855

      if (era.get(`talent:${target}:0`) == 1) { // :857
        await era.printAndWait(`「不、不要…啊…难道…要舔那里…啊呜！」`); // :858
        await era.printAndWait(`不理会${target_name}慌乱的反抗、${player_name}强硬地把她的双腿掰开。`); // :859
        await era.printAndWait(`「那、那里…祇有那里是不可以的…啊！」`); // :860

      } else { // :862
        await era.printAndWait(`「不、不要…啊…难道…要舔那里…啊呜！」`); // :863
        await era.printAndWait(`不理会${target_name}慌乱的反抗、${player_name}强硬地把她的双腿掰开………`); // :864
      } // :865
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :866
      era.set(`cflag:${target}:302`, 1); // :866
      return 0; // :867

    } else { // :869

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:302`) <= 4 || era.get('flag:7') == 2)) { // :871
        await era.printAndWait(`「呀啊…主人真是H…${heart(1)}」`); // :872
        await era.printAndWait(`${target_name}抱住大开的双腿、用手指掰开小穴。`); // :873
        await era.printAndWait(`「不要再考虑了快来舔嘛、小穴已经…湿成这样了${heart(1)}」`); // :874
        await era.printAndWait(`会露出那种淫荡表情的人已经不再是原来的那个村娘了、而是和这个地城相当相称的居民………`); // :875
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :876
        era.set(`cflag:${target}:302`, 5); // :876

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:302`) <= 3 || era.get('flag:7') == 2)) { // :878
        await era.printAndWait(`「好、好的…请舔…我的那里吧………${heart(1)}」`); // :879
        await era.printAndWait(`${target_name}高兴地打开双腿、迎接${player_name}。`); // :880
        await era.printAndWait(`「啊…舔的…好舒服啊${heart(1)}…主人啊${heart(1)}」`); // :881
        await era.printAndWait(`激动的${target_name}用柔弱的大腿、夹紧了${player_name}的头………`); // :882
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :883
        era.set(`cflag:${target}:302`, 4); // :883

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:302`) <= 2 || era.get('flag:7') == 2)) { // :885
        await era.printAndWait(`「我不会…反抗的…所以请温柔一点………」`); // :886
        await era.printAndWait(`炽热的舌头仔细地舔着${target_name}露出的阴唇。`); // :887
        await era.printAndWait(`「啊…呼…呜…啊…呜咕」`); // :888
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :889
        era.set(`cflag:${target}:302`, 3); // :889

      } else if (era.get(`cflag:${target}:302`) <= 1 || era.get('flag:7') == 2) { // :891
        await era.printAndWait(`「啊呜！好、好恶心………」`); // :892
        await era.printAndWait(`被舔着阴唇的${target_name}显露出厌恶的情绪。`); // :893
        await era.printAndWait(`「就算是像被狗舔那样也…啊嗯！」`); // :894
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :895
        era.set(`cflag:${target}:302`, 2); // :895
      } // :896
      return 0; // :897
    } // :898
  } // :899




  if (era_flag.selectcom == 2) { // :904

    if (era.get(`cflag:${target}:303`) == 0) { // :906
      if (era.get(`abl:${target}:3`) >= 3) { // :907
        await era.printAndWait(`「呜…嗯…呜啊…手、手指进来了…啊呜！」`); // :908
        await era.printAndWait(`${target_name}的肛门抽动着……`); // :909
      } else { // :910
        await era.printAndWait(`「难、难道是那里…呀啊！？」`); // :911
        await era.printAndWait(`${target_name}不停地扭动着腰、想要避开${player_name}的手指………`); // :912
      } // :913
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :914
      era.set(`cflag:${target}:303`, 1); // :914
      return 0; // :915

    } else { // :917
      // 赋值 P = PALAM:3 + UP:3 // :918

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && P >= era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 8 || era.get('flag:7') == 2)) { // :920
        await era.printAndWait(`「哼呀…连、连里面都…进来了…塞得满满的…嘻…嘻呀…啊啊啊………${heart(1)}」`); // :921
        await era.printAndWait(`${target_name}的腰完全脱力了、只是轻轻地动一下手指就能让她颤抖不止。`); // :922
        await era.printAndWait(`「好、的…真是的…不玩弄屁股小穴的话…已经活不下去了啦${heart(1)}」`); // :923
        await era.printAndWait(`「怎么样都可以…快点再…玩弄我的…屁股小穴啊………${heart(1)}」`); // :924
        // CFLAG:303  = 9（变量语义：CFLAG 族，303） // :925
        era.set(`cflag:${target}:303`, 9); // :925

      } else if (era.get(`talent:${target}:76`) == 1 && P >= era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 7 || era.get('flag:7') == 2)) { // :927
        await era.printAndWait(`「肛门…可以哦${heart(1)}…啊~弄得我好舒服${heart(1)}」`); // :928
        await era.printAndWait(`${target_name}发出了仿佛舒服得要融化掉的声音。`); // :929
        await era.printAndWait(`「啊啊…要上瘾了…主人再多摸一会儿啊${heart(1)}」`); // :930
        // CFLAG:303  = 8（变量语义：CFLAG 族，303） // :931
        era.set(`cflag:${target}:303`, 8); // :931

      } else if (era.get(`talent:${target}:76`) == 1 && P < era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 6 || era.get('flag:7') == 2)) { // :933
        await era.printAndWait(`「主人…请再温柔一点…啊${heart(1)}…哈嗯${heart(1)}」`); // :934
        await era.printAndWait(`润滑稍稍有点不足、${target_name}忍着疼痛接纳手指的进入。`); // :935
        await era.printAndWait(`「啊…哈………啊呜嗯${heart(1)}」`); // :936
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :937
        era.set(`cflag:${target}:303`, 7); // :937

      } else if (era.get(`talent:${target}:77`) == 1 && P >= era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 5 || era.get('flag:7') == 2)) { // :939
        await era.printAndWait(`「再多抠抠我的肛门啊${heart(1)}…可以哟${heart(1)}可以的哟${heart(1)}」`); // :940
        await era.printAndWait(`只是被稍稍玩弄了下肛门的${target_name}腰不住地颤抖、发出了快乐的尖叫。`); // :941
        await era.printAndWait(`「只是屁股就快要去了啊${heart(1)} 请更多地${heart(1)}」`); // :942
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :943
        era.set(`cflag:${target}:303`, 6); // :943

      } else if (era.get(`talent:${target}:85`) == 1 && P >= era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 4 || era.get('flag:7') == 2)) { // :945
        await era.printAndWait(`「啊呀呜…这、这样可以哟…${heart(1)}」`); // :946
        await era.printAndWait(`被玩弄着肛门的${target_name}发出了仿佛舒服得要融化掉的声音。`); // :947
        await era.printAndWait(`「嗯呀…啊${heart(1)} 啊${heart(1)} 啊${heart(1)} 哈啊啊呀呜呜${heart(1)}」`); // :948
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :949
        era.set(`cflag:${target}:303`, 5); // :949

      } else if (era.get(`talent:${target}:85`) == 1 && P < era.get('palamlv:2') && (era.get(`cflag:${target}:303`) <= 3 || era.get('flag:7') == 2)) { // :951
        await era.printAndWait(`「呜呀…请再…温柔一点…啊…啊哈${heart(1)}」`); // :952
        await era.printAndWait(`润滑稍稍有点不足、${target_name}忍着疼痛接纳手指的进入。`); // :953
        await era.printAndWait(`「我、我…会好好用屁股做H的事的…所以…请再温柔一点${heart(1)}」`); // :954
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :955
        era.set(`cflag:${target}:303`, 4); // :955

      } else if (P >= era.get('palamlv:2') && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:303`) <= 2 || era.get('flag:7') == 2)) { // :957
        await era.printAndWait(`「呜…嗯…呜啊…嗯…嗯嗯……好像…要…变得奇怪了啊…屁股要变得奇怪了………」`); // :958
        await era.printAndWait(`${target_name}的肛门抽动着……`); // :959
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :960
        era.set(`cflag:${target}:303`, 3); // :960

      } else if (era.get(`cflag:${target}:303`) <= 1 || era.get('flag:7') == 2) { // :962
        await era.printAndWait(`「住手啊…做那种事只会让我很痛啊！」`); // :963
        await era.printAndWait(`${target_name}不停地扭动着腰、想要避开${player_name}的手指………`); // :964
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :965
        era.set(`cflag:${target}:303`, 2); // :965
      } // :966
      return 0; // :967
    } // :968
  } // :969




  if (era_flag.selectcom == 3) { // :974

    if (era.get(`cflag:${target}:304`) == 0) { // :976
      await era.printAndWait(`「我、我知道了…我、我会…自、自慰的………」`); // :977
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :978
      era.set(`cflag:${target}:304`, 1); // :978
      return 0; // :979

    } else { // :981

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:0`) == 1 && (era.get(`cflag:${target}:304`) <= 8 || era.get('flag:7') == 2)) { // :983
        await era.printAndWait(`「只是自慰的话不够啦、已经忍不住了${heart(1)}」`); // :984
        await era.printAndWait(`${target_name}在那瞬间突然猛地把手指插了进去、像是要戳破处女膜一样。`); // :985
        await era.printAndWait(`「如果戳破处女膜…手指进到更里面的话…一定很舒服吧${heart(1)}」`); // :986
        await era.printAndWait(`「好想把手指插进去变得更舒服啊…啊哈嗯${heart(1)}」`); // :987
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :988
        era.set(`cflag:${target}:304`, 9); // :988

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:31`) >= 3 && (era.get(`cflag:${target}:304`) <= 7 || era.get('flag:7') == 2)) { // :990

        if (rand_n(3) == 0) { // :992
          await era.printAndWait(`「小穴…小穴好舒服${heart(1)} 好喜欢欺负阴蒂啊${heart(1)}」`); // :993
          await era.printAndWait(`${target_name}完全沉浸在用手指揉搓阴蒂的快感当中。`); // :994
          await era.printAndWait(`淫水翻动的声音不时响起。从幼小的躯体当中能感受到相当淫靡的感觉。`); // :995
          await era.printAndWait(`「想要更多地自慰${heart(1)}…我已经只需要小穴了${heart(1)}」`); // :996
        } else if (rand_n(2) == 0) { // :997
          await era.printAndWait(`「欸嘿嘿…可以哟、我会好好地在主人面前自慰的哟${heart(1)}」`); // :998
          await era.printAndWait(`${target_name}带着一脸淫荡的表情开始了自慰、她的手熟练地摩擦着小穴、连呼吸都炽热了起来。`); // :999
          await era.printAndWait(`「哈…哈…啊嗯…小穴好舒服…好舒服啊………${heart(1)}」`); // :1000
          await era.printAndWait(`「主人在旁边看着的话…连着自慰一整天也不是不可以哟${heart(1)} 」`); // :1001
        } else { // :1002
          await era.printAndWait(`「我的自慰show…请好好地享受吧${heart(1)}」`); // :1003
          await era.printAndWait(`${target_name}扭动着腰、享受着自慰带来的快感。已经是谁都不能阻止她自慰了吧。`); // :1004
          await era.printAndWait(`「手指停不下来…啊啊啊…主人${heart(1)}…快看、快看我自慰的地方啊${heart(1)}」`); // :1005
        } // :1006
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :1007
        era.set(`cflag:${target}:304`, 8); // :1007

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:31`) < 3 && (era.get(`cflag:${target}:304`) <= 6 || era.get('flag:7') == 2)) { // :1009

        if (rand_n(2) == 0) { // :1011
          await era.printAndWait(`「不要…比起自慰什么的…更想要主人的肉棒啊${heart(1)}」`); // :1012
          await era.printAndWait(`说着那样的话的${target_name}一边打开双腿、一边开始高兴地自慰起来。`); // :1013
          await era.printAndWait(`「嗯${heart(1)} 嗯${heart(1)}…啊啊…把这个…想象成…主人的肉棒${heart(1)}」`); // :1014
          await era.printAndWait(`${target_name}漸漸加快了手指抽插的速度………`); // :1015
        } else { // :1016
          await era.printAndWait(`「只是看着我自慰…主人就很高兴了吗？………啊哈哈${heart(1)}」`); // :1017
          await era.printAndWait(`${target_name}扭动着腰、享受着自慰带来的快感。`); // :1018
          await era.printAndWait(`「啊…啊啊嗯…肉棒${heart(1)}…好想要肉棒${heart(1)} 好想要肉棒啊${heart(1)}」`); // :1019
          await era.printAndWait(`${target_name}年幼的身体拼命地后仰、一边发出尖叫着一边持续着自慰………`); // :1020
        } // :1021
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :1022
        era.set(`cflag:${target}:304`, 7); // :1022

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1 && (era.get(`cflag:${target}:304`) <= 5 || era.get('flag:7') == 2)) { // :1024
        await era.printAndWait(`「只是自慰的话不够啦、已经忍不住了${heart(1)}」`); // :1025
        await era.printAndWait(`${target_name}在那瞬间突然猛地把手指插了进去、像是要戳破处女膜一样。`); // :1026
        await era.printAndWait(`「快点啦、快点嘛…给我…主人的${heart(3)}」`); // :1027
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :1028
        era.set(`cflag:${target}:304`, 6); // :1028

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:31`) >= 3 && (era.get(`cflag:${target}:304`) <= 4 || era.get('flag:7') == 2)) { // :1030

        if (rand_n(3) == 0) { // :1032
          await era.printAndWait(`「小穴自慰的地方…请好好滴欣赏${heart(1)}」`); // :1033
          await era.printAndWait(`那样无忧无虑地笑着的${target_name}把手指伸向了小穴。`); // :1034
          await era.printAndWait(`「啊哈…好喜欢自慰啊${heart(1)} 喜欢${heart(1)} 喜欢${heart(1)} 好想一直这样下去${heart(1)}」`); // :1035
          await era.printAndWait(`${target_name}的手指伸进了小穴、不停地抽插着、发出了色情的声响………`); // :1036
        } else if (rand_n(2) == 0) { // :1037
          await era.printAndWait(`「嗯、嗯…一直都是想着主人的事…来…自慰${heart(1)}」`); // :1038
          await era.printAndWait(`「好像永远自慰下去…连内衣都不想穿了呢${heart(1)}」`); // :1039
          await era.printAndWait(`${target_name}扭动着腰、为了激发出小穴的快感不停地动着手指………`); // :1040
        } else { // :1041
          await era.printAndWait(`被命令自慰的${target_name}开始愉快地玩弄起自己的小穴。`); // :1042
          await era.printAndWait(`「我是个H的孩子真是对不起…是个最喜欢自慰的小猴子真是对不起${heart(1)}」`); // :1043
          await era.printAndWait(`${player_name}一边感叹着、一边注视着${target_name}的自慰show。`); // :1044
          await era.printAndWait(`「我、我…最喜欢被主人看着自慰了…真是个变态的小姑娘呢${heart(1)}」`); // :1045
        } // :1046
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :1047
        era.set(`cflag:${target}:304`, 5); // :1047

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:31`) < 3 && (era.get(`cflag:${target}:304`) <= 3 || era.get('flag:7') == 2)) { // :1049

        if (rand_n(2) == 0) { // :1051
          await era.printAndWait(`「真是的…想看着我自慰什么的………真是拿你没办法呢${heart(1)}」`); // :1052
          await era.printAndWait(`${target_name}两腿大开、挺起腰部、把手指伸向了小穴。`); // :1053
          await era.printAndWait(`「被主人…看见了…看见了啊…${heart(1)} 啊啊啊啊哈嗯${heart(1)}」`); // :1054
        } else { // :1055
          await era.printAndWait(`「虽然很害羞可是…如果是主人你想看的话…${heart(1)}」`); // :1056
          await era.printAndWait(`${target_name}舔了舔嘴唇、把手指伸向了小穴。`); // :1057
          await era.printAndWait(`「啊…啊啊…嗯…哈呜…被看着…好有感觉…太有感觉了啊………${heart(1)}`); // :1058
        } // :1059
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :1060
        era.set(`cflag:${target}:304`, 4); // :1060

      } else if (era.get(`mark:${target}:2`) == 3 &&era.get(`abl:${target}:31`) >= 1 && (era.get(`cflag:${target}:304`) <= 2 || era.get('flag:7') == 2)) { // :1062

        if (rand_n(2) == 0) { // :1064
          await era.printAndWait(`「才、才没有感觉呢…呜…咕…哈啊啊……哈…嗯」`); // :1065
          await era.printAndWait(`一边这么说着一边发出妖艳的呻吟、果然还不是很坦率呢………`); // :1066
        } else { // :1067
          await era.printAndWait(`「不要…不要看啊…太难为情了………」`); // :1068
          await era.printAndWait(`${target_name}害羞地低下头、持续着自慰………`); // :1069
        } // :1070
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :1071
        era.set(`cflag:${target}:304`, 3); // :1071

      } else if (era.get(`cflag:${target}:304`) <= 1 || era.get('flag:7') == 2) { // :1073

        if (rand_n(2) == 0) { // :1075
          await era.printAndWait(`「嗯…呼…啊…这、这样就可以了吗？…欸、不、不行…？」`); // :1076
          await era.printAndWait(`${target_name}敷衍地动着手指………`); // :1077
        } else { // :1078
          await era.printAndWait(`「嗯…哈…手指好累啊………」`); // :1079
          await era.printAndWait(`${target_name}慢慢地用手指勾勒着阴唇的样子………`); // :1080
        } // :1081
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :1082
        era.set(`cflag:${target}:304`, 2); // :1082
      } // :1083
      return 0; // :1084
    } // :1085
  } // :1086




  if (era_flag.selectcom == 5) { // :1091

    if (era.get(`cflag:${target}:306`) == 0) { // :1093

      if (era.get(`talent:${target}:130`) == 1 && era.get(`palam:${target}:5`) > era.get('palamlv:3') && era.get(`tequip:${target}:16`) == 0 && era.get(`tequip:${target}:15`) == 0) { // :1095

        if (era.get(`talent:${target}:85`) == 1 || era.get(`talent:${target}:76`) == 1) { // :1097

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1099
            await era.printAndWait(`「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`); // :1100
            await era.printAndWait(`${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1101

          } else { // :1103
            await era.printAndWait(`「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`); // :1104
            await era.printAndWait(`${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1105
          } // :1106

        } else { // :1108

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1110
            await era.printAndWait(`「够、够了啊…不要啊！」`); // :1111
            await era.printAndWait(`${player_name}抓住悲鸣不已的${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1112

          } else { // :1114
            await era.printAndWait(`「怎么这样…发出这样的声音…不要…啊…啊呜呜！」`); // :1115
            await era.printAndWait(`${player_name}吸住悲鸣不已的${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`); // :1116
          } // :1117
        } // :1118
      } else { // :1119

        if (era.get(`talent:${target}:85`) == 1 || era.get(`talent:${target}:76`) == 1) { // :1121

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1123
            await era.printAndWait(`「欸嘿嘿…胸部比姐姐的都要大了…啊嗯${heart(1)}」`); // :1124
            await era.printAndWait(`${target_name}出神地眯着眼睛吐着气。嘴里微微漏出了撒娇的声音………`); // :1125

          } else { // :1127
            await era.printAndWait(`「我的胸部摸着开心吗？…呀、啊…哈呜${heart(1)}」`); // :1128
            await era.printAndWait(`看着这可爱的反应还真是一件十分快乐的事呢、${player_name}暗地里笑着………`); // :1129
          } // :1130

        } else { // :1132

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1134
            await era.printAndWait(`「这样的事…因为…胸很大就…啊啊！」`); // :1135
            await era.printAndWait(`被揉着和幼小的身体毫不相称的巨乳的${target_name}发出了痛苦的呻吟………`); // :1136

          } else { // :1138
            await era.printAndWait(`「摸的手法…就像个色狼大叔一样…呀啊！？」`); // :1139
            await era.printAndWait(`「像、像那个样子摸的话…啊啊！」`); // :1140
          } // :1141
        } // :1142
      } // :1143
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :1144
      era.set(`cflag:${target}:306`, 1); // :1144
      return 0; // :1145

    } else { // :1147

      if (era.get(`talent:${target}:130`) == 1 && era.get(`palam:${target}:5`) > era.get('palamlv:3') && era.get(`tequip:${target}:16`) == 0 && era.get(`tequip:${target}:15`) == 0) { // :1149

        if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:306`) <= 4 || era.get('flag:7') == 2)) { // :1151

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1153
            await era.printAndWait(`「啊嗯…都是主人的原因…变得能出牛奶了呢…啊呜…请再多喝一点…${heart(1)}」`); // :1154
            await era.printAndWait(`「啊~${heart(1)} 啊~${heart(1)} 牛奶出来了好舒服${heart(1)}…好舒服啊${heart(1)}」`); // :1155
            await era.printAndWait(`${target_name}脸上浮现出不似少女的淫靡表情、温柔地抱着${player_name}的头。`); // :1156
            await era.printAndWait(`${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1157

          } else { // :1159
            await era.printAndWait(`「嗯嘻…嗯${heart(1)} 像那样一直吸着乳头的话…牛奶要出来了啊${heart(1)}」`); // :1160
            await era.printAndWait(`「如果被那样吸的话…胸部会变大的啦${heart(1)} 快、快放过我吧～${heart(1)}」`); // :1161
            await era.printAndWait(`${target_name}脸上浮现出不似少女的淫靡表情、温柔地抱着${player_name}的头。`); // :1162
            await era.printAndWait(`${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`); // :1163
          } // :1164
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1165
          era.set(`cflag:${target}:306`, 5); // :1165

        } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:306`) <= 3 || era.get('flag:7') == 2)) { // :1167

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1169
            await era.printAndWait(`「呐…喝吧…再多喝一点♪ 我的牛奶…${heart(1)}」`); // :1170
            await era.printAndWait(`「啊嗯…就像个大宝宝一样…好可爱…啊${heart(1)}」`); // :1171
            await era.printAndWait(`${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1172

          } else { // :1174
            await era.printAndWait(`「啊哈…那样吸我的…喝吧…再多喝一点♪ 我的牛奶……${heart(1)}」`); // :1175
            await era.printAndWait(`「更加…更加咕嘟咕嘟的吸吧…${heart(1)}」`); // :1176
            await era.printAndWait(`${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`); // :1177
          } // :1178
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1179
          era.set(`cflag:${target}:306`, 4); // :1179

        } else if (era.get(`abl:${target}:1`) >= 3 && (era.get(`cflag:${target}:306`) <= 2 || era.get('flag:7') == 2)) { // :1181

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1183
            await era.printAndWait(`「啊 …真是的…像个小宝宝一样…啊…啊嗯♪」`); // :1184
            await era.printAndWait(`${target_name}的乳头高高勃起、每次吸的时候都能让${target_name}发出一阵喘息。`); // :1185
            await era.printAndWait(`${player_name}抓住${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1186

          } else { // :1188
            await era.printAndWait(`「啊啊…不行的啦…被这么吸的话…牛奶又要出来了啦♪」`); // :1189
            await era.printAndWait(`${target_name}的乳头高高勃起、每次吸的时候都能让${target_name}发出一阵喘息。`); // :1190
            await era.printAndWait(`${player_name}吸住${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`); // :1191
          } // :1192
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1193
          era.set(`cflag:${target}:306`, 3); // :1193

        } else if (era.get(`cflag:${target}:306`) <= 1 || era.get('flag:7') == 2) { // :1195

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1197
            await era.printAndWait(`「呜咕…想吸牛奶什么的…我的胸部很大什么的…啊…啊呜！」`); // :1198
            await era.printAndWait(`${player_name}抓住悲鸣不已的${target_name}那大而膨胀的乳房、咕嘟咕嘟地喝光了母乳………`); // :1199

          } else { // :1201
            await era.printAndWait(`「不、不可以哟…这样的…魔王大人你不能这样做哟…啊！」`); // :1202
            await era.printAndWait(`${player_name}吸住悲鸣不已的${target_name}的乳头、咕嘟咕嘟地喝光了母乳………`); // :1203
          } // :1204
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1205
          era.set(`cflag:${target}:306`, 2); // :1205
        } // :1206
      } else { // :1207

        if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:306`) <= 4 || era.get('flag:7') == 2)) { // :1209

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1211
            await era.printAndWait(`「果然很喜欢大胸呢${heart(1)}比姐姐的还要大呢…啊嗯${heart(1)}」`); // :1212
            if (era.get(`talent:${target}:114`) == 1) { // :1214
              await era.printAndWait(`「这么大的话…走路都会很辛苦呢…${heart(1)}」`); // :1214
            } // :1214
            await era.printAndWait(`手指陷入了${target_name}的巨乳里、少女舒服地眯起了眼睛。`); // :1215
            await era.printAndWait(`「啊…老是…摸胸部…但是主人想做什么都可以哟${heart(1)}」`); // :1216
            await era.printAndWait(`浮现出不似少女的淫靡表情、接受着爱抚。`); // :1217
            await era.printAndWait(`「因为…被主人摸着胸部…已经没法思考了啦………${heart(1)}」`); // :1218
            if (era.get(`cflag:${target}:7`) & 1) { // :1220
              await era.printAndWait(`「真是的啊${heart(1)} 这样拉乳头环的话${heart(1)} 乳头会裂开的啦${heart(1)}」`); // :1220
            } // :1220

          } else { // :1222
            await era.printAndWait(`「啊…嗯…我的贫乳…也很有魅力吗？…呼呼呼${heart(1)}」`); // :1223
            await era.printAndWait(`${player_name}多次点头、来回抚摸着${target_name}的胸部。${target_name}恶作劇似地笑着。`); // :1224
            await era.printAndWait(`「骗人…明明是大的比较好${heart(1)}…呀啊…乳、乳头不可以${heart(1)}」`); // :1225
            await era.printAndWait(`${player_name}拧着少女的乳头慢慢地摩擦着、近乎疼痛的刺激让少女的身体反弓了起来。`); // :1226
            await era.printAndWait(`「啊啊啊…胸部好舒服…好喜欢被摸啊${heart(1)} 再更多地摸摸啊${heart(1)}」`); // :1227
            if (era.get(`cflag:${target}:7`) & 1) { // :1229
              await era.printAndWait(`「真是的啊${heart(1)} 这样拉乳头环的话${heart(1)} 乳头会裂开的啦${heart(1)}」`); // :1229
            } // :1229
          } // :1230
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1231
          era.set(`cflag:${target}:306`, 5); // :1231

        } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:306`) <= 3 || era.get('flag:7') == 2)) { // :1233

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1235
            await era.printAndWait(`「欸嘿嘿…胸部比姐姐的都要大了呢${heart(1)}」`); // :1236
            await era.printAndWait(`${target_name}出神地眯着眼睛吐着气、嘴里微微漏出了撒娇的声音。`); // :1237
            await era.printAndWait(`「你们男人还真是喜欢胸部呢…总觉得我好像明白原因呢${heart(1)}」`); // :1238
            await era.printAndWait(`「啊…啊嗯${heart(1)} 再来欺负胸部啊${heart(1)}」`); // :1239
            if (era.get(`cflag:${target}:7`) & 1) { // :1241
              await era.printAndWait(`「呀啊、乳头环被拉了的话胸部要变得放荡了啦${heart(1)}」`); // :1241
            } // :1241

          } else { // :1243
            await era.printAndWait(`「我的胸部…虽然小、但是是主人专用的哟${heart(1)}」`); // :1244
            await era.printAndWait(`${target_name}仔细地爱抚着整个胸部、漏出激动的呻吟。`); // :1245
            await era.printAndWait(`「啊啊啊…胸部…就是为了被摸而存在的呢…主人你是这样教我的吧${heart(1)}」`); // :1246
            await era.printAndWait(`「再来…再来欺负胸部啊…${heart(1)}」`); // :1247
            if (era.get(`cflag:${target}:7`) & 1) { // :1249
              await era.printAndWait(`「呀啊、乳头环被拉…好喜欢…啊${heart(1)}」`); // :1249
            } // :1249
          } // :1250
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1251
          era.set(`cflag:${target}:306`, 4); // :1251

        } else if (era.get(`abl:${target}:1`) >= 3 && (era.get(`cflag:${target}:306`) <= 2 || era.get('flag:7') == 2)) { // :1253

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1255
            await era.printAndWait(`「啊…啊…嗯…哈…啊啊啊………${heart(1)}」`); // :1256
            await era.printAndWait(`被爱抚着的${target_name}出神地眯起眼睛、漸漸习惯起来。`); // :1257
            await era.printAndWait(`「呜、嗯…如果温柔一点的话…就、就不要紧………嗯」`); // :1258

          } else { // :1260
            await era.printAndWait(`「啊…我的胸部摸着开心吗…？…啊、嗯嗯呜………」`); // :1261
            await era.printAndWait(`${target_name}感受到了快感、漸漸鼓胀起来的乳头变得更加突出了。`); // :1262
            await era.printAndWait(`「呐、呐…来、来玩弄乳头嘛！」`); // :1263
          } // :1264
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1265
          era.set(`cflag:${target}:306`, 3); // :1265

        } else if (era.get(`cflag:${target}:306`) <= 1 || era.get('flag:7') == 2) { // :1267

          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1269
            await era.printAndWait(`「啊…咕…嗯啊啊…不要…不要像那个样子抓住乳房啊………」`); // :1270
            await era.printAndWait(`被揉着和身体不相称的巨乳的${target_name}发出了尖叫。`); // :1271
            await era.printAndWait(`「要、要裂开了呜呜呜………」`); // :1272

          } else { // :1274
            await era.printAndWait(`「我、我的胸部才没有被摸出感觉呢！…我也知道她们很小啦！」`); // :1275
            await era.printAndWait(`${target_name}扭动着身体想要逃开爱抚………`); // :1276
          } // :1277
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1278
          era.set(`cflag:${target}:306`, 2); // :1278
        } // :1279
      } // :1280
      return 0; // :1281
    } // :1282
  } // :1283




  if (era_flag.selectcom == 6) { // :1288

    if (era.get(`cflag:${target}:307`) == 0 && era.get('tflag:13')) { // :1290

      if (era.get(`talent:${target}:76`) == 1 && era_flag.assiplay == 0 && era.get(`tequip:${target}:89`) == 0 && era.get(`tequip:${target}:90`) == 0) { // :1292
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`); // :1293
        await era.printAndWait(`${target_name}和${player_name}双唇紧贴、舌头如饥似渴地纠缠着。`); // :1294
        await era.printAndWait(`「哈…哈…呣呒${heart(1)} 哈…哈…啊啊…kiss…好舒服…${heart(1)}」`); // :1295
        await era.printAndWait(`少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`); // :1296
        await era.printAndWait(`「虽然和主人做过很多H的事…但是…这样的接吻还是第一次呢${heart(1)}」`); // :1297

      } else if (era.get(`talent:${target}:85`) == 1 && era_flag.assiplay == 0 && era.get(`tequip:${target}:89`) == 0 && era.get(`tequip:${target}:90`) == 0) { // :1299
        await era.printAndWait(`「啊，亲吻吗，嗯${heart(1)}请让我自己来好么，因为……`); // :1300
        await era.printAndWait(`「这是……人家的第一次初吻呢」`); // :1301
        await era.printAndWait(`玛奥眼睛湿润了看着你`); // :1302
        await era.printAndWait(`「明明主人很坏心眼地对人家做了许多很过分的事情，却给人家留下了最后的一点少女的纯洁呢」`); // :1303
        await era.printAndWait(`「人家确实是小孩子，不太懂得爱上别人什么的……但是……遇上您真是太好了」`); // :1304
        await era.printAndWait(`「把第一次的kiss留给心爱的人，是少女的梦想……」`); // :1305
        await era.printAndWait(`少女说着那样的话，羞怯的闭上眼睛，轻轻在你的嘴唇上啄了一下，「……现在梦想实现了哦，诶嘿嘿${heart(1)}」`); // :1306
        await era.printAndWait(`在你面前的少女，带着满足的笑意。`); // :1307
        await era.printAndWait(`你第一次发现，她一直蕴含在内心深处的那份纯真和柔情。`); // :1308
        await era.printAndWait(`好像被触动了内心的某种东西，你深深的吻了上去……`); // :1309

      } else { // :1311
        await era.printAndWait(`「嗯咕…嗯…不、不要…！放开我………！」`); // :1312
        await era.printAndWait(`${target_name}用力推开${player_name}、用袖口擦着嘴唇。`); // :1313
        await era.printAndWait(`「我、我的第一次…明明是第一次！」`); // :1314
      } // :1315
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1316
      era.set(`cflag:${target}:307`, 1); // :1316
      return 0; // :1317

    } else if (era.get(`cflag:${target}:307`) == 0) { // :1319

      if (era.get(`talent:${target}:76`) == 1) { // :1321
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`); // :1322
        await era.printAndWait(`${target_name}和${player_name}双唇紧贴、舌头如饥似渴地纠缠着。`); // :1323
        await era.printAndWait(`「哈…哈…呣呒${heart(1)} 哈…哈…啊啊…kiss…好舒服…${heart(1)}」`); // :1324
        await era.printAndWait(`少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`); // :1325
        await era.printAndWait(`「主人的kiss…好舒服………${heart(1)}」`); // :1326

      } else if (era.get(`talent:${target}:85`) == 1) { // :1328
        await era.printAndWait(`「嗯…啾…啾${heart(1)} 再来…啾啾${heart(1)}」`); // :1329
        await era.printAndWait(`${target_name}虽然笨拙但很热情地和${player_name}反复接吻着。`); // :1330
        await era.printAndWait(`「想要更多地接吻嘛………主人…${heart(1)}」`); // :1331
        await era.printAndWait(`少女说着那样的话、再次撒着娇开始了接吻………`); // :1332

      } else { // :1334
        await era.printAndWait(`「嗯咕…嗯…不、不要…！放开我………！」`); // :1335
        await era.printAndWait(`${target_name}用力推开${player_name}、用袖口擦着嘴唇。`); // :1336
      } // :1337
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1338
      era.set(`cflag:${target}:307`, 1); // :1338
      return 0; // :1339

    } else { // :1341

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:307`) <= 4 || era.get('flag:7') == 2)) { // :1343
        await era.printAndWait(`「嗯…嗯呒…嗯嗯…嗯…啊哈…${heart(1)}」`); // :1344
        await era.printAndWait(`${target_name}的舌头如饥似渴地纠缠着。`); // :1345
        await era.printAndWait(`「嗯呒${heart(1)} 啾呜呜${heart(1)} …嗯呒${heart(1)} 哈…哈…啊啊…更多地接吻…${heart(1)}」`); // :1346
        await era.printAndWait(`少女喘着气向后稍稍拉开了距离、两人的嘴间牵起了一根唾液构成的丝。`); // :1347
        await era.printAndWait(`「想要和主人更多地…接吻哟………${heart(1)}」`); // :1348
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1349
        era.set(`cflag:${target}:307`, 5); // :1349

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:307`) <= 3 || era.get('flag:7') == 2)) { // :1351
        await era.printAndWait(`「嗯…啾…啾${heart(1)} 更多地…kiss…啾${heart(1)}」`); // :1352
        await era.printAndWait(`${target_name}和${player_name}反复接吻着、由于兴奋舌头粘乎乎地纠缠在一起。`); // :1353
        await era.printAndWait(`「啾…啾…啾呜${heart(1)}…已经没法思考了呜…${heart(1)}」`); // :1354
        await era.printAndWait(`少女脸上露出与年龄不相称的迷醉表情沉浸在接吻带来的快感里………`); // :1355
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1356
        era.set(`cflag:${target}:307`, 4); // :1356

      } else if (era.get(`abl:${target}:10`) >=2 && (era.get(`cflag:${target}:307`) <= 2 || era.get('flag:7') == 2)) { // :1358
        await era.printAndWait(`「接、接吻不算什么啦…喏…按你喜欢的做就…嗯…！」`); // :1359
        await era.printAndWait(`${target_name}好像已经习惯了变得老实了一点。`); // :1360
        await era.printAndWait(`「嗯…哈…嗯咕…啾…啾…啊啊………啊」`); // :1361
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1362
        era.set(`cflag:${target}:307`, 3); // :1362

      } else if (era.get(`cflag:${target}:307`) <= 1 || era.get('flag:7') == 2) { // :1364
        await era.printAndWait(`「不想…和你接吻…嗯！？」`); // :1365
        await era.printAndWait(`${player_name}强行把${target_name}的下巴掰向自己、贪图着圆润的嘴唇。`); // :1366
        await era.printAndWait(`「嗯咕…嗯…嗯…嗯…呜呜呜………」`); // :1367
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1368
        era.set(`cflag:${target}:307`, 2); // :1368
      } // :1369
      return 0; // :1370
    } // :1371
  } // :1372




  if (era_flag.selectcom == 7) { // :1377

    if (era.get(`cflag:${target}:308`) == 0) { // :1379

      if (era.get(`talent:${target}:76`) == 1) { // :1381
        await era.printAndWait(`「啊啊～…连小穴的里面…都是主人的所有物哟～${heart(1)}」`); // :1382
        await era.printAndWait(`${target_name}一边发出火热的叹息声一边用手指大大地撑开私处…………`); // :1383
        if (era.get(`talent:${target}:0`) == 1) { // :1385
          await era.printAndWait(`「讨厌…再这样张下去处女膜都要被看见了…快点夺走我的处女吧～${heart(1)}」`); // :1385
        } // :1385

      } else if (era.get(`talent:${target}:85`) == 1) { // :1387
        await era.printAndWait(`「唔嗯～…主人想看的话…无论何时都会向您展示的${heart(1)}」`); // :1388
        await era.printAndWait(`${target_name}一边爽朗地着一边用手指撑开了私处…………`); // :1389
        if (era.get(`talent:${target}:0`) == 1) { // :1391
          await era.printAndWait(`「啊啊…明明想被主人拿走处女的…好害羞………${heart(1)}」`); // :1391
        } // :1391

      } else { // :1393
        await era.printAndWait(`「做、做这种事到底有什么好高兴的～！」`); // :1394
        await era.printAndWait(`${target_name}一边背过通红的脸蛋、一边战战兢兢的用手指撑开私处………`); // :1395
      } // :1396
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :1397
      era.set(`cflag:${target}:308`, 1); // :1397
      return 0; // :1398

    } else { // :1400

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:308`) <= 4 || era.get('flag:7') == 2)) { // :1402
        await era.printAndWait(`「小、小穴…想要肉棒…不要只是看着呀…我已经不能忍耐了啦${heart(1)}」`); // :1403
        await era.printAndWait(`${target_name}一边漏出炽热的喘息一边用手指拨开了小穴…………`); // :1404
        if (era.get(`talent:${target}:0`) == 1) { // :1406
          await era.printAndWait(`「啊啊…就这样推倒我嘛${heart(1)}夺走我的处女啦${heart(1)}」`); // :1406
        } // :1406
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1407
        era.set(`cflag:${target}:306`, 5); // :1407

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:308`) <= 3 || era.get('flag:7') == 2)) { // :1409
        await era.printAndWait(`「主人…看嘛…看嘛…${heart(1)} 里面都能看到吗…全部都是主人的东西哟${heart(1)}」`); // :1410
        await era.printAndWait(`${target_name}一边明媚地笑着一边用手指拨开了小穴…………`); // :1411
        if (era.get(`talent:${target}:0`) == 1) { // :1413
          await era.printAndWait(`「啊啊…想要主人来夺走我的处女嘛………${heart(1)}」`); // :1413
        } // :1413
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1414
        era.set(`cflag:${target}:306`, 4); // :1414

      } else if (era.get(`abl:${target}:17`) >= 3 && (era.get(`cflag:${target}:308`) <= 2 || era.get('flag:7') == 2)) { // :1416
        await era.printAndWait(`「这、张扬看上去好像…一、一个变态…变态啊！」`); // :1417
        await era.printAndWait(`${target_name}一边咒骂着一边用手指拨开了小穴。`); // :1418
        await era.printAndWait(`「想看的话就看吧、来吧…更…更多地………」`); // :1419
        await era.printAndWait(`爱液漸漸从她的小穴里溢出来了………`); // :1420
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1421
        era.set(`cflag:${target}:306`, 3); // :1421

      } else if (era.get(`cflag:${target}:306`) <= 1 || era.get('flag:7') == 2) { // :1423
        await era.printAndWait(`「不、不要、这种事才不要…为什么…这样的…呜呜」`); // :1424
        await era.printAndWait(`${target_name}一边哭着鼻子一边拨开了小穴………`); // :1425
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1426
        era.set(`cflag:${target}:306`, 2); // :1426
      } // :1427
      return 0; // :1428
    } // :1429
  } // :1430




  if (era_flag.selectcom == 8) { // :1435

    if (era.get(`cflag:${target}:309`) == 0) { // :1437

      if (era.get(`talent:${target}:76`) == 1) { // :1439
        await era.printAndWait(`「主人的手指…进来了…啊…啊啊…更加…把里面弄得更加咕啾咕啾的啊${heart(1)}」`); // :1440

      } else if (era.get(`talent:${target}:85`) == 1) { // :1442
        await era.printAndWait(`「主人的手指…进来了啊…请再伸进去一点啊${heart(1)}」`); // :1443

      } else { // :1445
        await era.printAndWait(`「嘻…咿、不要…太勉强了…不要再伸进去了啊！」`); // :1446
      } // :1447
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :1448
      era.set(`cflag:${target}:309`, 1); // :1448
      return 0; // :1449

    } else { // :1451

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:309`) <= 4 || era.get('flag:7') == 2)) { // :1453
        await era.printAndWait(`「主人的手指…好舒服啊${heart(1)} 把里面弄得咕啾咕啾的吧${heart(1)}」`); // :1454
        await era.printAndWait(`${target_name}配合着手指的动作摆动着腰、贪享着快乐………`); // :1455
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1456
        era.set(`cflag:${target}:309`, 5); // :1456

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:309`) <= 3 || era.get('flag:7') == 2)) { // :1458
        await era.printAndWait(`「不、不要紧的啦…主人的手指的话…无论做什么都是可以的啦${heart(1)}」`); // :1459
        await era.printAndWait(`${target_name}随着手指的动作不时绷直腰部、发出销魂的呻吟………`); // :1460
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1461
        era.set(`cflag:${target}:309`, 4); // :1461

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:309`) <= 3 || era.get('flag:7') == 2)) { // :1463
        await era.printAndWait(`「主人的手指…请更…温柔一点${heart(1)} 进、进到…里面了………${heart(1)}」`); // :1464
        await era.printAndWait(`${target_name}像是因为承受着手指插入带来的不适感、腰不停地发抖………`); // :1465
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1466
        era.set(`cflag:${target}:309`, 4); // :1466

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:309`) <= 2 || era.get('flag:7') == 2)) { // :1468
        await era.printAndWait(`「我、我会听话的…请温柔一点！」`); // :1469
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1470
        era.set(`cflag:${target}:309`, 3); // :1470

      } else if (era.get(`cflag:${target}:309`) <= 1 || era.get('flag:7') == 2) { // :1472
        await era.printAndWait(`「这、这样的…不行啊…太勉强了…啊、啊啊」`); // :1473
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1474
        era.set(`cflag:${target}:309`, 2); // :1474
      } // :1475
      return 0; // :1476
    } // :1477
  } // :1478




  if (era_flag.selectcom == 9) { // :1483

    if (era.get(`cflag:${target}:310`) == 0) { // :1485

      if (era.get(`talent:${target}:76`) == 1) { // :1487
        await era.printAndWait(`「呀啊…主人的舌头…热热…的…再多舔舔啊${heart(1)}」`); // :1488

      } else if (era.get(`talent:${target}:85`) == 1) { // :1490
        await era.printAndWait(`「咿呀…不、不行哟、主人你舔了那种地方的话…啊啊~好害羞！」`); // :1491

      } else { // :1493
        await era.printAndWait(`「变、变态…你在舔哪里啊！快住手！真是恶心！」`); // :1494
      } // :1495
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1496
      era.set(`cflag:${target}:310`, 1); // :1496
      return 0; // :1497

    } else { // :1499

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:310`) <= 6 || era.get('flag:7') == 2)) { // :1501
        await era.printAndWait(`「呀啊…更多地舔我的肛门啊…每一条皱褶都好好地舔一舔哟${heart(1)}」`); // :1502
        await era.printAndWait(`${target_name}那不检点的嘴不停喘息着。`); // :1503
        await era.printAndWait(`「呼…啊嗯…啊啊${heart(1)} …呀啊啊好舒服${heart(1)} 好舒服哟${heart(1)} 喜欢${heart(1)}」`); // :1504
        await era.printAndWait(`少女的肛门无论被怎么样对待应该都能承受下来吧………`); // :1505
        // CFLAG:310  = 7（变量语义：CFLAG 族，310） // :1506
        era.set(`cflag:${target}:310`, 7); // :1506

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:310`) <= 5 || era.get('flag:7') == 2)) { // :1508
        await era.printAndWait(`「被舌头舔着好舒服…主人的舌头…啊啊${heart(1)} 把舌头伸进去…舔更深的地方啊${heart(1)}」`); // :1509
        await era.printAndWait(`${target_name}每次被舔肛门都会发出粗重的喘息。`); // :1510
        await era.printAndWait(`每一条皱褶都被精心舔着………`); // :1511
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :1512
        era.set(`cflag:${target}:310`, 6); // :1512

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:310`) <= 4 || era.get('flag:7') == 2)) { // :1514
        await era.printAndWait(`「呀啊…更多…再来更多地舔我的肛门啊…屁股里面都已经黏乎乎的了啊${heart(1)}」`); // :1515
        await era.printAndWait(`${target_name}那不检点的嘴不停喘息着。`); // :1516
        await era.printAndWait(`少女沉浸在肛门的快乐中、寻求着新的刺激………`); // :1517
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1518
        era.set(`cflag:${target}:310`, 5); // :1518

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:310`) <= 3 || era.get('flag:7') == 2)) { // :1520
        await era.printAndWait(`「不行哟、主人你舔了那种地方的话…啊啊~好害羞！」`); // :1521
        await era.printAndWait(`${target_name}害羞地紧闭双眼、忍受着肛门那传来的奇特感觉………`); // :1522
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1523
        era.set(`cflag:${target}:310`, 4); // :1523

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:310`) <= 2 || era.get('flag:7') == 2)) { // :1525
        await era.printAndWait(`「咕…呜呜…不、不要舔的那么投入啊………」`); // :1526
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1527
        era.set(`cflag:${target}:310`, 3); // :1527

      } else if (era.get(`cflag:${target}:310`) <= 1 || era.get('flag:7') == 2) { // :1529
        await era.printAndWait(`「变、变态…住、住手啦…快住手！」`); // :1530
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1531
        era.set(`cflag:${target}:310`, 2); // :1531
      } // :1532
      return 0; // :1533
    } // :1534
  } // :1535




  if (era_flag.selectcom == 10) { // :1540

    if (era.get(`cflag:${target}:311`) == 0) { // :1542

      if (era.get(`talent:${target}:76`) == 1) { // :1544
        await era.printAndWait(`「再…用点力…连这种色色的道具都有…魔族好厉害${heart(1)}」`); // :1545

      } else if (era.get(`talent:${target}:85`) == 1) { // :1547
        await era.printAndWait(`「这、这样的…好、好厉害啊………${heart(1)}」`); // :1548

      } else { // :1550
        await era.printAndWait(`「不、不要啊…那种震动…不、不行、好害怕！」`); // :1551
      } // :1552
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1553
      era.set(`cflag:${target}:311`, 1); // :1553
      return 0; // :1554

    } else { // :1556

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:311`) <= 4 || era.get('flag:7') == 2)) { // :1558
        await era.printAndWait(`「啊哈…哈、哈嗯${heart(1)} 请更多地欺负阴蒂啊${heart(1)}」`); // :1559
        await era.printAndWait(`${target_name}反弓起腰、想要更好地品味这快感………`); // :1560
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1561
        era.set(`cflag:${target}:311`, 5); // :1561

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:311`) <= 3 || era.get('flag:7') == 2)) { // :1563
        await era.printAndWait(`「呀啊${heart(1)} 这个、好舒服好舒服${heart(1)}」`); // :1564
        await era.printAndWait(`${target_name}一脸高潮的表情持续承受着刺激………`); // :1565
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1566
        era.set(`cflag:${target}:311`, 4); // :1566

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:311`) <= 2 || era.get('flag:7') == 2)) { // :1568
        await era.printAndWait(`「呜啊…啊…啊啊………不、不要再欺负我了…啊…嗯咕${heart(1)}」`); // :1569
        await era.printAndWait(`${target_name}咬紧牙关承受着快感………`); // :1570
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1571
        era.set(`cflag:${target}:311`, 3); // :1571

      } else if (era.get(`cflag:${target}:311`) <= 1 || era.get('flag:7') == 2) { // :1573
        await era.printAndWait(`「咕…呜呜…呀…呀啊啊………」`); // :1574
        await era.printAndWait(`${target_name}好像还不能理解这未知的快感………`); // :1575
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1576
        era.set(`cflag:${target}:311`, 2); // :1576
      } // :1577
      return 0; // :1578
    } // :1579
  } // :1580





  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) { // :1586

    if (era.get(`cflag:${target}:312`) == 0) { // :1588

      if (era.get(`talent:${target}:0`) == 1) { // :1590

        if (era.get(`talent:${target}:76`) == 1) { // :1592
          await era.printAndWait(`「啊…啊啊啊…不是处女了啊…被虫子破处了呢${heart(1)}」`); // :1593

        } else if (era.get(`talent:${target}:85`) == 1) { // :1595
          await era.printAndWait(`「笨蛋…笨蛋…再温柔一点啊…这样的…好讨厌………」`); // :1596

        } else { // :1598
          await era.printAndWait(`「不要…不要啊…这、这样的…被这样对待什么的…！」`); // :1599
        } // :1600

      } else { // :1602

        if (era.get(`talent:${target}:76`) == 1) { // :1604
          await era.printAndWait(`「不、不要…就这样进到我的小穴里来了啊${heart(1)}」`); // :1605

        } else if (era.get(`talent:${target}:85`) == 1) { // :1607
          await era.printAndWait(`「不要…这、这个孩子…在里面动着…呜啊啊啊啊${heart(1)}」`); // :1608

        } else { // :1610
          await era.printAndWait(`「住、住手啊…那样的不要放进来啊…咿咿咿呀！」`); // :1611
        } // :1612
      } // :1613
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1614
      era.set(`cflag:${target}:312`, 1); // :1614
      return 0; // :1615

    } else { // :1617

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:312`) <= 4 || era.get('flag:7') == 2)) { // :1619
        await era.printAndWait(`「更多地…欺负小穴吧${heart(1)}…把小穴弄得一塌糊涂吧${heart(1)}」`); // :1620
        await era.printAndWait(`${target_name}配合着虫子的蠕动扭动着腰、跳着淫秽的舞蹈………`); // :1621
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1622
        era.set(`cflag:${target}:312`, 5); // :1622

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:312`) <= 3 || era.get('flag:7') == 2)) { // :1624
        await era.printAndWait(`「啊啊哈嗯${heart(1)}动着…在里面…动着呢！」`); // :1625
        await era.printAndWait(`虫子每次动的时候${target_name}都扭动着身体发出快感的悲鸣。`); // :1626
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1627
        era.set(`cflag:${target}:312`, 4); // :1627

      } else if (era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:312`) <= 2 || era.get('flag:7') == 2)) { // :1629
        await era.printAndWait(`「啊…啊啊…满满的…啊、好舒服…啊啊嗯${heart(1)}」`); // :1630
        await era.printAndWait(`已经习惯了的${target_name}发出甜美的呻吟………`); // :1631
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1632
        era.set(`cflag:${target}:312`, 3); // :1632

      } else if (era.get(`cflag:${target}:312`) <= 1 || era.get('flag:7') == 2) { // :1634
        await era.printAndWait(`「不要…全都进来了…讨厌…这样的好讨厌………」`); // :1635
        await era.printAndWait(`虫子不停地钻进少女的阴道………`); // :1636
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1637
        era.set(`cflag:${target}:312`, 2); // :1637
      } // :1638
      return 0; // :1639
    } // :1640

  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) { // :1642

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:372`) < 4 || era.get('flag:7') == 2)) { // :1644
      await era.printAndWait(`「哈…啊、啊啊嗯………出来了………」`); // :1645
      await era.printAndWait(`「下次啊…请赐给我主人的肉棒吧${heart(1)}」`); // :1646
      // CFLAG:372  = 4（变量语义：CFLAG 族，372） // :1647
      era.set(`cflag:${target}:372`, 4); // :1647

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:372`) < 3 || era.get('flag:7') == 2)) { // :1649
      await era.printAndWait(`「啊啊…好、好难受…不要这么欺负我啊………」`); // :1650
      await era.printAndWait(`这样说这的少女将炽热的誓言转向了虫子………`); // :1651
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1652
      era.set(`cflag:${target}:372`, 3); // :1652

    } else if (era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:372`) <= 2 || era.get('flag:7') == 2)) { // :1654
      await era.printAndWait(`「哈…啊、啊啊嗯………出来了………」`); // :1655
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1656
      era.set(`cflag:${target}:372`, 2); // :1656

    } else if (era.get(`cflag:${target}:372`) < 1 || era.get('flag:7') == 2) { // :1658
      await era.printAndWait(`「啊、啊啊…好难受………」`); // :1659
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1660
      era.set(`cflag:${target}:372`, 1); // :1660
    } // :1661
    return 0; // :1662
  } // :1663




  if (era_flag.selectcom == 12) { // :1668

    if (era.get(`cflag:${target}:313`) == 0) { // :1670

      if (era.get(`talent:${target}:76`) == 1) { // :1672
        await era.printAndWait(`「好、好厉害…震动传过来了${heart(1)}」`); // :1673

      } else if (era.get(`talent:${target}:85`) == 1) { // :1675
        await era.printAndWait(`「呜啊…咿呀酥酥麻麻的…酥酥麻麻的啊${heart(1)}」`); // :1676

      } else { // :1678
        await era.printAndWait(`「呀啊…不、不要啊…那、那种酥麻感！」`); // :1679
      } // :1680
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1681
      era.set(`cflag:${target}:313`, 1); // :1681
      return 0; // :1682

    } else { // :1684

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:313`) <= 4 || era.get('flag:7') == 2)) { // :1686
        await era.printAndWait(`「好、好厉害…震动传过来了${heart(1)} 震动再强烈一些啊${heart(1)}」`); // :1687
        await era.printAndWait(`「整个人…都要变得奇怪了啦${heart(1)} 啊咿${heart(1)} 咿呀${heart(1)}」`); // :1688
        await era.printAndWait(`${target_name}被震动棒彻底地按摩着股间、淌着口水沉浸在快感之中………`); // :1689
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1690
        era.set(`cflag:${target}:313`, 5); // :1690

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:313`) <= 3 || era.get('flag:7') == 2)) { // :1692
        await era.printAndWait(`「呜啊…呀啊${heart(1)}啊！嗯！酥酥麻麻的…酥酥麻麻的啊${heart(1)}」`); // :1693
        await era.printAndWait(`${target_name}用力把按摩棒压在股间、品味着快感………`); // :1694
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1695
        era.set(`cflag:${target}:313`, 4); // :1695

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:313`) <= 2 || era.get('flag:7') == 2)) { // :1697
        await era.printAndWait(`「咕…呜…啊啊…哈啊啊…不、不行…不要那样压上来啊………」`); // :1698
        await era.printAndWait(`每次被压上按摩棒的时候、${target_name}的声音都漸漸变得甘甜起来………`); // :1699
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1700
        era.set(`cflag:${target}:313`, 3); // :1700

      } else if (era.get(`cflag:${target}:313`) <= 1 || era.get('flag:7') == 2) { // :1702
        await era.printAndWait(`「呀啊…不、不要啊…那、那种酥麻感！」`); // :1703
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1704
        era.set(`cflag:${target}:313`, 2); // :1704
      } // :1705
      return 0; // :1706
    } // :1707
  } // :1708





  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) { // :1714

    if (era.get(`cflag:${target}:314`) == 0) { // :1716

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1) { // :1718
        await era.printAndWait(`「啊…虫子…咿…进到…肚子里来了…被弄得黏乎乎的了啊${heart(1)}」`); // :1719

      } else if (era.get(`talent:${target}:76`) == 1) { // :1721
        await era.printAndWait(`「啊哈…啊…啊啊${heart(1)} 肛门被扩张了…扩张了呜${heart(1)}」`); // :1722

      } else if (era.get(`talent:${target}:77`) == 1) { // :1724
        await era.printAndWait(`「咿呀…啊啊…虫子在里面…哈…嘻咿…要、要变得奇怪了呜…${heart(1)}」`); // :1725

      } else if (era.get(`talent:${target}:85`) == 1) { // :1727
        await era.printAndWait(`「那、那样的…嗯、不行的啦…啊啊…啊…屁股会坏掉的…请放过我吧………」`); // :1728

      } else { // :1730
        if (era.get(`abl:${target}:3`) >= 3) { // :1731
          await era.printAndWait(`「不、不要啊！不要把那种东西放进来啊！放过我啊！」`); // :1732
          await era.printAndWait(`与话语不同的是很轻易地就把虫子塞进了被调教后的${target_name}的肛门里………`); // :1733
        } else { // :1734
          await era.printAndWait(`「不、不要啊！不要把那种东西放进来啊！放过我啊！」`); // :1735
          await era.printAndWait(`虽然肛门紧紧地缩了起来、不过虫子还是毫不留情地钻了进去………`); // :1736
        } // :1737
      } // :1738
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1739
      era.set(`cflag:${target}:314`, 1); // :1739
      return 0; // :1740

    } else { // :1742

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:314`) <= 8 || era.get('flag:7') == 2)) { // :1744
        await era.printAndWait(`「嗯咿…进到…进到里面来了…${heart(1)}」`); // :1745
        await era.printAndWait(`肛门蠕虫一边发出咕嗞咕嗞的声音一边钻进了${target_name}的肛门。`); // :1746
        await era.printAndWait(`「嗯哈…啊啊…屁股小穴好舒服…再来做更多啊${heart(1)}」`); // :1747
        await era.printAndWait(`少女沉浸在肛门的快感之中、放着不管的话多少次都能去吧………`); // :1748
        // CFLAG:314  = 9（变量语义：CFLAG 族，314） // :1749
        era.set(`cflag:${target}:314`, 9); // :1749

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:314`) <= 7 || era.get('flag:7') == 2)) { // :1751
        await era.printAndWait(`「呀呜${heart(1)}…肛门…啊啊…在被虫子侵犯着啊${heart(1)}」`); // :1752
        await era.printAndWait(`${target_name}的肛门已经很习惯被塞进虫子了。`); // :1753
        await era.printAndWait(`「咿呀${heart(1)} 咿呀${heart(1)} 咿呀${heart(1)}…太闹腾了…啊啊…不…不行${heart(1)}」`); // :1754
        await era.printAndWait(`肛门蠕虫蠕动的时候带来的快感让少女的腰不停地上下起伏………`); // :1755
        // CFLAG:314  = 8（变量语义：CFLAG 族，314） // :1756
        era.set(`cflag:${target}:314`, 8); // :1756

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:314`) <= 6 || era.get('flag:7') == 2)) { // :1758
        await era.printAndWait(`「啊哈啊…虫子进来了啊${heart(1)}」`); // :1759
        await era.printAndWait(`${target_name}的腰微微颤抖着、享受着虫子带来的快感。`); // :1760
        await era.printAndWait(`「呜…酥酥麻麻的…的呜…屁股…要、要变得奇怪了啊${heart(1)}」`); // :1761
        // CFLAG:314  = 7（变量语义：CFLAG 族，314） // :1762
        era.set(`cflag:${target}:314`, 7); // :1762

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:314`) <= 5 || era.get('flag:7') == 2)) { // :1764
        await era.printAndWait(`「呀呜${heart(1)}…屁股…里面…全部全部…都在被虫子侵犯着${heart(1)}」`); // :1765
        await era.printAndWait(`${target_name}被扩张到极限的肛门已经非常习惯吞进虫子了。`); // :1766
        await era.printAndWait(`「已…已经…只要有屁股就可以了${heart(1)}…只要有屁股就可以了啊！」`); // :1767
        await era.printAndWait(`肛门蠕虫蠕动的时候带来的快感让少女的腰不停地上下起伏………`); // :1768
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1769
        era.set(`cflag:${target}:314`, 6); // :1769

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:314`) <= 4 || era.get('flag:7') == 2)) { // :1771
        await era.printAndWait(`「啊啊…虫子在里面动着啊…不、不要…不、不要动啊${heart(1)}」`); // :1772
        await era.printAndWait(`${target_name}带着一脸快要去了的表情品味着快感。`); // :1773
        await era.printAndWait(`「哈啊啊…屁股那里的…感觉传过来了好可怕…${heart(1)}」`); // :1774
        await era.printAndWait(`「主人啊…已、已经可以放过我了吧………！」`); // :1775
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1776
        era.set(`cflag:${target}:314`, 5); // :1776

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:314`) <= 3 || era.get('flag:7') == 2)) { // :1778
        await era.printAndWait(`「没、没关系…不是很害怕啦………${heart(1)}」`); // :1779
        await era.printAndWait(`${target_name}虽然很紧张、还是把虫子全部咽进了肛门。`); // :1780
        await era.printAndWait(`「咕…咿…咿…咿嗯…啊啊…咕、咕噜呜」`); // :1781
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1782
        era.set(`cflag:${target}:314`, 4); // :1782

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:314`) <= 2 || era.get('flag:7') == 2)) { // :1784
        await era.printAndWait(`「不要…不要啊…虫子什么的不要放进来啊…！」`); // :1785
        await era.printAndWait(`由于已经被调教了好多次、${target_name}的肛门很轻易就咽下了虫子。`); // :1786
        await era.printAndWait(`「这、这样的…不要、不要啊…不、不想…体验啊…！」`); // :1787
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1788
        era.set(`cflag:${target}:314`, 3); // :1788

      } else if (era.get(`cflag:${target}:314`) <= 1 || era.get('flag:7') == 2) { // :1790
        await era.printAndWait(`「这、这样的…一点…都不舒服啊………！」`); // :1791
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1792
        era.set(`cflag:${target}:314`, 2); // :1792
      } // :1793
      return 0; // :1794
    } // :1795

  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) { // :1797

    if (era.get(`talent:${target}:77`) == 1 && era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:374`) < 6 || era.get('flag:7') == 2)) { // :1799
      await era.printAndWait(`「哈呜呜${heart(1)}…下次…想要肉棒啊…${heart(1)}」`); // :1800
      // CFLAG:374  = 6（变量语义：CFLAG 族，374） // :1801
      era.set(`cflag:${target}:374`, 6); // :1801

    } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:374`) < 5 || era.get('flag:7') == 2)) { // :1803
      await era.printAndWait(`「啊哈…屁股被扩张开来回不去了${heart(1)}」`); // :1804
      // CFLAG:374  = 5（变量语义：CFLAG 族，374） // :1805
      era.set(`cflag:${target}:374`, 5); // :1805

    } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:374`) < 4 || era.get('flag:7') == 2)) { // :1807
      await era.printAndWait(`「更多…更加欺负…再来侵犯屁股小穴啊${heart(1)}」`); // :1808
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1809
      era.set(`cflag:${target}:374`, 4); // :1809

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:374`) < 3 || era.get('flag:7') == 2)) { // :1811
      await era.printAndWait(`「呼啊啊…更加地…玩弄也可以哟…${heart(1)}」`); // :1812
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1813
      era.set(`cflag:${target}:374`, 3); // :1813

    } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:374`) < 2 || era.get('flag:7') == 2)) { // :1815
      await era.printAndWait(`「哈…哈…啊嗯${heart(1)} 一、一点都不舒服啦………」`); // :1816
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1817
      era.set(`cflag:${target}:374`, 2); // :1817

    } else if (era.get(`cflag:${target}:374`) < 1 || era.get('flag:7') == 2) { // :1819
      await era.printAndWait(`「哈…哈…屁股…屁股被扩张开来回不去了呜………」`); // :1820
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1821
      era.set(`cflag:${target}:374`, 1); // :1821
    } // :1822
    return 0; // :1823
  } // :1824





  if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`)) { // :1830

    if (era.get(`cflag:${target}:315`) == 0) { // :1832

      if (era.get(`talent:${target}:76`) == 1) { // :1834
        await era.printAndWait(`「啊、嘻呀…这、这个…好厉害……阴蒂酥酥麻麻的${heart(1)}」`); // :1835
        await era.printAndWait(`${target_name}因为阴蒂受到了强烈的刺激发出了喜悦的呻吟………`); // :1836

      } else if (era.get(`talent:${target}:85`) == 1) { // :1838
        await era.printAndWait(`「啊啊啊…再温柔一些…就好了…${heart(1)}」`); // :1839
        await era.printAndWait(`${target_name}为着阴蒂上未知的快感感到不知所措………`); // :1840

      } else { // :1842
        await era.printAndWait(`「咕…不、不可以…这、这样的…嘻！」`); // :1843
        await era.printAndWait(`夹子紧紧地夹住阴蒂施加着持续的刺激、${target_name}尝试着徒劳的反抗………`); // :1844
      } // :1845
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :1846
      era.set(`cflag:${target}:315`, 1); // :1846
      return 0; // :1847

    } else { // :1849

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:315`) <= 3 || era.get('flag:7') == 2)) { // :1851
        await era.printAndWait(`「啊…嗯嗯…啊哈…可以…欺负阴蒂哟${heart(1)}」`); // :1852
        await era.printAndWait(`「颤动着…好舒服${heart(1)}」`); // :1853
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :1854
        era.set(`cflag:${target}:315`, 4); // :1854

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:315`) <= 2 || era.get('flag:7') == 2)) { // :1856
        await era.printAndWait(`「这、这种刺激才不会去呢…主人的手指更加舒服啊${heart(1)}」`); // :1857
        await era.printAndWait(`「啊啊放过我吧…放过我吧${heart(1)}」`); // :1858
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :1859
        era.set(`cflag:${target}:315`, 3); // :1859

      } else if (era.get(`cflag:${target}:315`) <= 1 || era.get('flag:7') == 2) { // :1861
        await era.printAndWait(`「咕…呜啊…哈…哈嗯…不要啊…不要做这种事啊………」`); // :1862
        await era.printAndWait(`夹子紧紧地夹住阴蒂施加着持续的刺激、${target_name}尝试着徒劳的反抗………`); // :1863
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :1864
        era.set(`cflag:${target}:315`, 2); // :1864
      } // :1865
      return 0; // :1866
    } // :1867

  } else if (era_flag.selectcom == 14 && era.get(`tequip:${target}:14`) == 0) { // :1869

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:375`) < 3 || era.get('flag:7') == 2)) { // :1871
      await era.printAndWait(`「呀啊…喜、喜欢这个…喜欢这种舒服的感觉………${heart(1)}」`); // :1872
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :1873
      era.set(`cflag:${target}:375`, 3); // :1873

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:375`) < 2 || era.get('flag:7') == 2)) { // :1875
      await era.printAndWait(`「这次…主人…做的很好哦…${heart(1)}」`); // :1876
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :1877
      era.set(`cflag:${target}:375`, 2); // :1877

    } else if (era.get(`cflag:${target}:375`) < 1 || era.get('flag:7') == 2) { // :1879
      await era.printAndWait(`「啊、呜呜…啊啊…真、真是的…放过…我吧………」`); // :1880
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :1881
      era.set(`cflag:${target}:375`, 1); // :1881
    } // :1882
    return 0; // :1883
  } // :1884





  if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`)) { // :1890

    if (era.get(`cflag:${target}:316`) == 0) { // :1892

      if (era.get(`talent:${target}:76`) == 1) { // :1894

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1896
          await era.printAndWait(`「嘻呀…胸部在被欺负着…${heart(1)}」`); // :1897
          await era.printAndWait(`${target_name}一边摇晃着那对沉重的乳房一边享受着乳头传来的快感………`); // :1898
        } else { // :1899
          await era.printAndWait(`「不要…虽然很舒服…但是乳头要被拉长了啦${heart(1)}」`); // :1900
        } // :1901

      } else if (era.get(`talent:${target}:85`) == 1) { // :1903

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1905
          await era.printAndWait(''); // :1906
          await era.printAndWait(`「啊嗯…呀…呀啊…胸部…摇晃着…啊${heart(1)}」`); // :1907
          await era.printAndWait(`${target_name}一边发出粗重的喘息一边摇晃着那对沉重的乳房………`); // :1908
        } else { // :1909
          await era.printAndWait(`「乳、乳头…太刺激了啊…啊、啊啊…哈…啊嗯${heart(1)}」`); // :1910
        } // :1911

      } else { // :1913

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1915
          await era.printAndWait(''); // :1916
          await era.printAndWait(`「胸部…好重…啊啊…不要…不要再这样玩弄乳头了啊………」`); // :1917
          await era.printAndWait(`${target_name}为着乳头受到的快感颤抖着、摇晃着和身体不相称的巨乳………`); // :1918
        } else { // :1919
          await era.printAndWait(`「呀呜…不要…被这样对待…啊啊啊啊！」`); // :1920
        } // :1921
      } // :1922
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :1923
      era.set(`cflag:${target}:316`, 1); // :1923
      return 0; // :1924

    } else { // :1926

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:316`) <= 3 || era.get('flag:7') == 2)) { // :1928

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1930
          await era.printAndWait(`「啊…乳头被欺负着…好舒服…更多…还要${heart(1)}」`); // :1931
          await era.printAndWait(`${target_name}一边摇晃着和身体不相称的巨乳一边发出快乐的呻吟。`); // :1932
          await era.printAndWait(`「咿嘻…胸部也…请用力的揉吧${heart(1)}」`); // :1933
        } else { // :1934
          await era.printAndWait(`「啊…被、被那样紧紧地夹住了…太刺激了啦…啊…啊啊${heart(1)}」`); // :1935
          await era.printAndWait(`${target_name}一边淌着口水一边体味着快感………`); // :1936
        } // :1937
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :1938
        era.set(`cflag:${target}:316`, 4); // :1938

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:316`) <= 2 || era.get('flag:7') == 2)) { // :1940

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1942
          await era.printAndWait(`「啊嗯…呀…呀啊…胸部…摇晃着…啊${heart(1)}」`); // :1943
          await era.printAndWait(`${target_name}不能承受乳头的刺激、摇晃着那和身体不相称的巨乳喘息着。`); // :1944
          await era.printAndWait(`「嗯嗯…好害羞…不要看啊………」`); // :1945
        } else { // :1946
          await era.printAndWait(`「啊啊…啊啊~${heart(1)} 啊啊~${heart(1)} 好舒服…好舒服…${heart(1)}」`); // :1947
          await era.printAndWait(`${target_name}的乳头受到了强烈的刺激………`); // :1948
        } // :1949
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :1950
        era.set(`cflag:${target}:316`, 3); // :1950

      } else if (era.get(`cflag:${target}:316`) <= 1 || era.get('flag:7') == 2) { // :1952

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1954
          await era.printAndWait(`「不要啊啊…这样的…住、住手啊………」`); // :1955
          await era.printAndWait(`${target_name}震颤着和身体不相称的巨乳………`); // :1956
        } else { // :1957
          await era.printAndWait(`「咕…呜呜呜…这样的…也没什么了不起的嘛………」`); // :1958
          await era.printAndWait(`${target_name}的脸红红的、忍耐着来自乳头的刺激………`); // :1959
        } // :1960
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :1961
        era.set(`cflag:${target}:316`, 2); // :1961
      } // :1962
      return 0; // :1963
    } // :1964

  } else if (era_flag.selectcom == 15 && era.get(`tequip:${target}:15`) == 0) { // :1966

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:376`) < 3 || era.get('flag:7') == 2)) { // :1968
      await era.printAndWait(`「咕嗯…下次用主人的手指来欺负乳头吧${heart(1)}」`); // :1969
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :1970
      era.set(`cflag:${target}:376`, 3); // :1970

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:376`) < 2 || era.get('flag:7') == 2)) { // :1972
      await era.printAndWait(`「哈…哈…下次主人来………做吧………${heart(1)}」`); // :1973
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :1974
      era.set(`cflag:${target}:376`, 2); // :1974

    } else if (era.get(`cflag:${target}:376`) < 1 || era.get('flag:7') == 2) { // :1976
      await era.printAndWait(`「哈…哈…呜呜…乳头已经这么肿了………」`); // :1977
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :1978
      era.set(`cflag:${target}:376`, 1); // :1978
    } // :1979
    return 0; // :1980
  } // :1981





  if (era_flag.selectcom == 16 && era.get(`tequip:${target}:16`)) { // :1987

    if (era.get(`cflag:${target}:317`) == 0) { // :1989

      if (era.get(`talent:${target}:76`) == 1) { // :1991

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :1993
          await era.printAndWait(`「啊哈…胸部在被吸…咿呀…嗯${heart(1)} 嗯呜好舒服啊…${heart(1)}」`); // :1994
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、呻吟着被榨出了奶………`); // :1995

        } else { // :1997
          await era.printAndWait(`「啊嗯…乳汁…全部被吸出来了啊…好舒服…好舒服啊${heart(1)}」`); // :1998
          await era.printAndWait(`${target_name}的乳房被装上了榨乳机、呻吟着被榨出了奶………`); // :1999
        } // :2000

      } else if (era.get(`talent:${target}:85`) == 1) { // :2002

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :2004
          await era.printAndWait(`「咿…呀啊…啊啊…乳汁出来了…出来了啊…${heart(1)}」`); // :2005
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`); // :2006

        } else { // :2008
          await era.printAndWait(`「不行…乳汁是要留给小宝宝的啊………」`); // :2009
          await era.printAndWait(`${target_name}被装上了榨乳机、哭喊着………`); // :2010
        } // :2011

      } else { // :2013

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :2015
          await era.printAndWait(`「我、我…不是乳牛啊………！」`); // :2016
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁………`); // :2017

        } else { // :2019
          await era.printAndWait(`「我、我…不是乳牛啊………！」`); // :2020
        } // :2021
      } // :2022
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :2023
      era.set(`cflag:${target}:317`, 1); // :2023


    } else { // :2026

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:317`) <= 3 || era.get('flag:7') == 2)) { // :2028

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :2030
          await era.printAndWait(`「啊哈…胸部在被吸…咿呀…嗯${heart(1)} 嗯呜好舒服啊…${heart(1)}」`); // :2031
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、呻吟着被榨出了奶………`); // :2032

        } else { // :2034
          await era.printAndWait(`「啊嗯…乳汁…全部被吸出来了啊…好舒服…好舒服啊${heart(1)}」`); // :2035
          await era.printAndWait(`${target_name}的乳房被装上了榨乳机、呻吟着被榨出了奶………`); // :2036
        } // :2037
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :2038
        era.set(`cflag:${target}:317`, 4); // :2038

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:317`) <= 2 || era.get('flag:7') == 2)) { // :2040

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :2042
          await era.printAndWait(`「咿…呀啊…啊啊…乳汁出来了…出来了啊…${heart(1)}」`); // :2043
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`); // :2044

        } else { // :2046
          await era.printAndWait(`「不行…乳汁是要留给小宝宝的啊………」`); // :2047
          await era.printAndWait(`${target_name}被装上了榨乳机、哭喊着………`); // :2048
        } // :2049
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :2050
        era.set(`cflag:${target}:317`, 3); // :2050

      } else if (era.get(`cflag:${target}:317`) <= 1 || era.get('flag:7') == 2) { // :2052

        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :2054
          await era.printAndWait(`「不要啦…我又不是乳牛………」`); // :2055
          await era.printAndWait(`${target_name}的巨乳被装上了榨乳机、被毫不留情地榨着乳汁……`); // :2056

        } else { // :2058
          await era.printAndWait(`「咕呜………收、收集我的乳汁什么的…到底在想什么啊………」`); // :2059
        } // :2060
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :2061
        era.set(`cflag:${target}:317`, 2); // :2061
      } // :2062
      return 0; // :2063
    } // :2064

  } else if (era_flag.selectcom == 16 && era.get(`tequip:${target}:16`) == 0) { // :2066

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:377`) < 3 || era.get('flag:7') == 2)) { // :2068
      await era.printAndWait(`「啊呀………哈哈…主人把它喝掉嘛…${heart(1)}」`); // :2069
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :2070
      era.set(`cflag:${target}:377`, 3); // :2070

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:377`) < 2 || era.get('flag:7') == 2)) { // :2072
      await era.printAndWait(`「哈哈………主人把它喝掉的话就再好不过了………」`); // :2073
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :2074
      era.set(`cflag:${target}:377`, 2); // :2074

    } else if (era.get(`cflag:${target}:377`) < 1 || era.get('flag:7') == 2) { // :2076
      await era.printAndWait(`「呜…不要再榨了啊………」`); // :2077
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :2078
      era.set(`cflag:${target}:377`, 1); // :2078
    } // :2079
    return 0; // :2080
  } // :2081







  if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`)) { // :2089

    if (era.get(`cflag:${target}:318`) == 0) { // :2091

      if (era.get(`talent:${target}:76`) == 1) { // :2093
        await era.printAndWait(`「呀啊…飞机杯好舒服${heart(1)} 请再多欺负我的肉棒${heart(1)}」`); // :2094

      } else if (era.get(`talent:${target}:85`) == 1) { // :2096
        await era.printAndWait(`「请、请温柔地…摩擦…啊${heart(1)}…啊啊${heart(1)}」`); // :2097

      } else { // :2099
        await era.printAndWait(`「不要…住手啊…那、那种东西…不、不要再让我高潮了！」`); // :2100
      } // :2101
      // CFLAG:318  = 1（变量语义：CFLAG 族，318） // :2102
      era.set(`cflag:${target}:318`, 1); // :2102
      return 0; // :2103

    } else { // :2105

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:318`) <= 3 || era.get('flag:7') == 2)) { // :2107
        await era.printAndWait(`「想要射精…想要射出好多精液${heart(1)} 在飞机杯里…满满地中出${heart(1)}」`); // :2108
        await era.printAndWait(`${target_name}的阴茎上套着飞机杯、前后摆动着腰………`); // :2109
        // CFLAG:318  = 4（变量语义：CFLAG 族，318） // :2110
        era.set(`cflag:${target}:318`, 4); // :2110

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:318`) <= 2 || era.get('flag:7') == 2)) { // :2112
        await era.printAndWait(`「啊啊…主人…请…请再多玩弄我那下流的肉棒${heart(1)}」`); // :2113
        await era.printAndWait(`${target_name}虽然看上去很害羞、但完全不能抑制想要射精的欲望………`); // :2114
        // CFLAG:318  = 3（变量语义：CFLAG 族，318） // :2115
        era.set(`cflag:${target}:318`, 3); // :2115

      } else if (era.get(`cflag:${target}:318`) <= 1 || era.get('flag:7') == 2) { // :2117
        await era.printAndWait(`「不行…不可以…要是做了这种事的话…啊啊…真的…要不行了啊……」`); // :2118
        await era.printAndWait(`${target_name}胯间高高挺立的阴茎在飞机杯颤动着、很舒服的样子………`); // :2119
        // CFLAG:318  = 2（变量语义：CFLAG 族，318） // :2120
        era.set(`cflag:${target}:318`, 2); // :2120
      } // :2121
      return 0; // :2122
    } // :2123

  } else if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`) == 0) { // :2125

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:378`) <= 32 || era.get('flag:7') == 2)) { // :2127
      await era.printAndWait(`「啊嗯…还想射出更多${heart(1)}」`); // :2128
      // CFLAG:378  = 2（变量语义：CFLAG 族，378） // :2129
      era.set(`cflag:${target}:378`, 2); // :2129

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:378`) < 2 || era.get('flag:7') == 2)) { // :2131
      await era.printAndWait(`「啊啊…哈${heart(1)}…满满地射出了…？」`); // :2132
      // CFLAG:378  = 2（变量语义：CFLAG 族，378） // :2133
      era.set(`cflag:${target}:378`, 2); // :2133

    } else if (era.get(`cflag:${target}:378`) < 1 || era.get('flag:7') == 2) { // :2135
      await era.printAndWait(`「不要…我…射出了那么多………」`); // :2136
      // CFLAG:378  = 1（变量语义：CFLAG 族，378） // :2137
      era.set(`cflag:${target}:378`, 1); // :2137
    } // :2138
    return 0; // :2139
  } // :2140





  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) { // :2146

    if (era.get(`cflag:${target}:320`) == 0) { // :2148

      if (era.get(`talent:${target}:77`) == 1) { // :2150
        await era.printAndWait(`「呀啊！就、就这样插进来什么的…太、太棒了…${heart(1)}」`); // :2151

      } else if (era.get(`talent:${target}:76`) == 1) { // :2153
        await era.printAndWait(`「呣呒…屁、屁股…变得好奇怪…${heart(1)}」`); // :2154

      } else if (era.get(`talent:${target}:85`) == 1) { // :2156
        await era.printAndWait(`「啊啊…进来了…屁股…变得…好奇怪${heart(1)}」`); // :2157

      } else { // :2159
        if (era.get(`abl:${target}:3`) >= 3) { // :2160
          await era.printAndWait(`「不…不要…不要就那样插进来啊………！」`); // :2161
          await era.printAndWait(`与言语相反的是、很轻松地就把拉珠塞进了接受调教的${target_name}的肛门里………`); // :2162
        } else { // :2163
          await era.printAndWait(`「不…不要…不要就那样插进来啊………！」`); // :2164
          await era.printAndWait(`虽然${target_name}收紧肛门来反抗、拉珠还是毫不留情地塞了进去………`); // :2165
        } // :2166
      } // :2167
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :2168
      era.set(`cflag:${target}:320`, 1); // :2168
      return 0; // :2169

    } else { // :2171

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:320`) <= 7 || era.get('flag:7') == 2)) { // :2173
        await era.printAndWait(`「啊哈…嘿嘿嘿…${heart(1)} 屁股…变得黏乎乎的了…变得…变得更加奇怪了呢${heart(1)}」`); // :2174
        await era.printAndWait(`菊穴里塞进了全部肛门拉珠的${target_name}露出了不检点的啊嘿颜。`); // :2175
        await era.printAndWait(`「我的屁股小穴…希望受到各种各样的欺负呢${heart(1)}」`); // :2176
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :2177
        era.set(`cflag:${target}:320`, 8); // :2177

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:320`) <= 7 || era.get('flag:7') == 2)) { // :2179
        await era.printAndWait(`「呀哈…啊啊…拉珠…全部进来了…啊啊…好舒服…${heart(1)}」`); // :2180
        await era.printAndWait(`${target_name}发出舒服到极点的声音撒着娇。`); // :2181
        await era.printAndWait(`「屁…屁股…更加湿嗒嗒的…想要变得更加湿嗒嗒的………${heart(1)}」`); // :2182
        // CFLAG:320  = 8（变量语义：CFLAG 族，320） // :2183
        era.set(`cflag:${target}:320`, 8); // :2183

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:320`) <= 6 || era.get('flag:7') == 2)) { // :2185
        await era.printAndWait(`「屁股…虽然觉得很奇怪…总觉得…要觉醒新的癖好了…${heart(1)}」`); // :2186
        await era.printAndWait(`菊穴里塞进了全部肛门拉珠的${target_name}左右扭动着可爱的屁股`); // :2187
        await era.printAndWait(`「欸嘿嘿…请再多惩罚我这个H的宠物吧${heart(1)}」`); // :2188
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :2189
        era.set(`cflag:${target}:320`, 7); // :2189

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:320`) <= 5 || era.get('flag:7') == 2)) { // :2191
        await era.printAndWait(`「啊哈…嘻呀…${heart(1)} 屁股…变得黏乎乎的了…变得…变得更加奇怪了呢${heart(1)}」`); // :2192
        await era.printAndWait(`菊穴里塞进了全部肛门拉珠的${target_name}露出了不检点的啊嘿颜。`); // :2193
        await era.printAndWait(`「再…再…多欺负…我的屁股小穴${heart(1)}」`); // :2194
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :2195
        era.set(`cflag:${target}:320`, 6); // :2195

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:320`) <= 4 || era.get('flag:7') == 2)) { // :2197
        await era.printAndWait(`「啊啊${heart(1)}…呣呒${heart(1)}…再…快点也…啊嗯…呀啊…这么突然啊${heart(1)}」`); // :2198
        await era.printAndWait(`${target_name}好像已经习惯了、放松的肛门慢慢吞入了肛门拉珠………`); // :2199
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :2200
        era.set(`cflag:${target}:320`, 5); // :2200

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:320`) <= 3 || era.get('flag:7') == 2)) { // :2202
        await era.printAndWait(`「啊啊…进来了…屁股…变得…奇怪了啦${heart(1)}」`); // :2203
        await era.printAndWait(`${target_name}扭动着屁股、忍受着肛门的快感………`); // :2204
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :2205
        era.set(`cflag:${target}:320`, 4); // :2205

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:320`) <= 2 || era.get('flag:7') == 2)) { // :2207
        await era.printAndWait(`「不、不要…住手…快住手啊…不、不要塞进来啊…明明…啊嗯」`); // :2208
        await era.printAndWait(`${target_name}所发出的痛苦的叫喊之中也混杂着甜美的呻吟………`); // :2209
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :2210
        era.set(`cflag:${target}:320`, 3); // :2210

      } else if (era.get(`cflag:${target}:320`) <= 1 || era.get('flag:7') == 2) { // :2212
        await era.printAndWait(`「这、这样的…真的是…好讨厌………」`); // :2213
        await era.printAndWait(`每插入一颗肛门拉珠、${target_name}都会左右扭动屁股来反抗………`); // :2214
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :2215
        era.set(`cflag:${target}:320`, 2); // :2215
      } // :2216
      return 0; // :2217
    } // :2218

  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) { // :2220

    if (era.get(`talent:${target}:77`) == 1 && era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:379`) < 6 || era.get('flag:7') == 2)) { // :2222
      await era.printAndWait(`「咕嘻${heart(1)}…把我的屁股小穴弄得更加乱七八糟的吧${heart(1)}」`); // :2223
      // CFLAG:379  = 6（变量语义：CFLAG 族，379） // :2224
      era.set(`cflag:${target}:379`, 6); // :2224

    } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:379`) < 5 || era.get('flag:7') == 2)) { // :2226
      await era.printAndWait(`「呀啊…好、好厉害哟…这…这个…${heart(1)}」`); // :2227
      // CFLAG:379  = 5（变量语义：CFLAG 族，379） // :2228
      era.set(`cflag:${target}:379`, 5); // :2228

    } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:379`) <= 4 || era.get('flag:7') == 2)) { // :2230
      await era.printAndWait(`「啊啊…下次…想要更加大的${heart(1)}」`); // :2231
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :2232
      era.set(`cflag:${target}:379`, 4); // :2232

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:379`) < 3 || era.get('flag:7') == 2)) { // :2234
      await era.printAndWait(`「呀啊………好、好舒服…啊嗯${heart(1)}」`); // :2235
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :2236
      era.set(`cflag:${target}:379`, 3); // :2236

    } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:379`) < 2 || era.get('flag:7') == 2)) { // :2238
      await era.printAndWait(`「呀哈…啊啊…啊啊啊…这样的…明明应该讨厌的………」`); // :2239
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :2240
      era.set(`cflag:${target}:379`, 2); // :2240

    } else if (era.get(`cflag:${target}:379`) < 1 || era.get('flag:7') == 2) { // :2242
      await era.printAndWait(`「嗯啊啊…啊啊…啊…屁、屁股…要裂开来了………」`); // :2243
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :2244
      era.set(`cflag:${target}:379`, 1); // :2244
    } // :2245
    return 0; // :2246
  } // :2247




  if (era_flag.selectcom == 20) { // :2252

    if (era.get(`cflag:${target}:321`) == 0) { // :2254

      if (era.get(`talent:${target}:0`) == 1) { // :2256

        if (era.get(`talent:${target}:76`) == 1) { // :2258

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2260


          } else if (era.get(`talent:${target}:314`) == 9) { // :2263
            await era.printAndWait(`「啊呀~${heart(1)}…好高兴啊哈~啊~…${heart(1)} 啊嗯~…啊~哈啊~~…${heart(1)}」`); // :2264
            await era.printAndWait(`${target_name}两眼冒光地抱着${player_name}。`); // :2265
            await era.printAndWait(`「感觉到主人的魔力了呢~…主人~${heart(1)}…魔王大人~${heart(1)}」`); // :2266
            await era.printAndWait(`因为紧闭地紧贴在一起的原因，${target_name}发出了欢喜的声音。`); // :2267
            await era.printAndWait(`「大鸡巴…往更加深的地方插进来吧~…俺要因为大鸡巴而坏掉啦~${heart(1)}」`); // :2268
            await era.printAndWait(`${master_name}她那一副塞进了阴茎后就变得淫乱的姿态，如同完全臣服了的魔族少女一样………`); // :2269

          } else { // :2271
            await era.printAndWait(`「哈~…啊~…啊啊啊~…大鸡巴进来了~…呜~啊~…啊啊~${heart(1)}」`); // :2272
            await era.printAndWait(`${target_name}紧张地呼吸着、不成熟的蜜穴的深处被塞进了阴茎。`); // :2273
            await era.printAndWait(`「主…人~…大人~…啊~…俺没…没问题的…所以请好好地品尝俺的处女小穴吧~…${heart(1)}」`); // :2274
            await era.printAndWait(`「魔王大人的大鸡巴就是为了这个才存在的吧~…俺…俺想要…成为主人的小穴呐~${heart(1)}」`); // :2275
            await era.printAndWait(`${target_name}拼命地忍耐着破瓜之痛紧紧地抱了过来………`); // :2276
          } // :2277

        } else if (era.get(`talent:${target}:85`) == 1) { // :2279

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2281


          } else if (era.get(`talent:${target}:314`) == 9) { // :2284
            await era.printAndWait(`${target_name}的脸破瓜的疼痛而变得僵硬，露出了一副不自然却十分坚强的笑容。`); // :2285
            await era.printAndWait(`「没、没事的啦…这样的…完全没事的啦…嗯~………啊啊~」`); // :2286
            await era.printAndWait(`看着如此坚强的${target_name}，${player_name}不假思索地抚摸了她的脑袋。`); // :2287
            await era.printAndWait(`「魔王大人的…大鸡巴~…感觉到了~${heart(1)}…好热的…好热啊…啊~………${heart(1)}」`); // :2288
            await era.printAndWait(`「啊啊~…更加大力地动吧~${heart(1)}…将俺…将俺变成魔王大人的东西吧~！」`); // :2289
            await era.printAndWait(`${player_name}那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………`); // :2290

          } else { // :2292
            await era.printAndWait(`「哈啊…哈啊…嗯~…啊~…啊呜~………」`); // :2293
            await era.printAndWait(`${target_name}忍耐着破瓜的痛苦的样子、闭着眼睛紧咬着牙。`); // :2294
            await era.printAndWait(`「完、完全…没、没有问题的啦~…主人~…请、变得舒服…起、起来吧~…~………」`); // :2295
            await era.printAndWait(`少女的手在${player_name}的背后划出了刮痕、而这刮痕带来的疼痛让${player_name}感到了十分地舒爽的感觉。`); // :2296
            await era.printAndWait(`「啊啊~…主人的~…大鸡巴好热啊~…好想…更加地侍奉啊~…${heart(1)}」`); // :2297
          } // :2298

        } else { // :2300

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2302
            await era.printAndWait(''); // :2303
          } else { // :2304
            await era.printAndWait(`「啊唔呜呜呜~！…好难受…好难受啊…快点…快点拔掉啊~………！」`); // :2305
            await era.printAndWait(`强行将${target_name}未成熟的蜜穴完全扩张、远远不像快感的痛苦的叫声响彻了周围。`); // :2306
            await era.printAndWait(`因为这痛苦的声音而兴奋起来的${player_name}继续凌辱着少女………`); // :2307
          } // :2308
        } // :2309

      } else { // :2311

        if (era.get(`talent:${target}:76`) == 1) { // :2313
          await era.printAndWait(`「啊啊恩~…更加…更加用力地插进去吧~…插到要将小穴弄坏的程度吧~~…好想要大鸡巴啊~~${heart(1)}」`); // :2314
          await era.printAndWait(`${target_name}十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声………`); // :2315

        } else if (era.get(`talent:${target}:85`) == 1) { // :2317
          await era.printAndWait(`「哈呜~…啊~…啊啊~………更加…慢一点做吧…啊~…啊啊恩~${heart(1)}」`); // :2318
          await era.printAndWait(`${target_name}被插进去后，就不停地喘着炽热的粗气紧紧地抱着${player_name}………`); // :2319

        } else { // :2321
          await era.printAndWait(`「啊~…唔~…进来了…鸡巴…啊~呀啊~…突然这样子~…啊啊~！」`); // :2322
          await era.printAndWait(`将阴茎强行地塞进了${target_name}蜜穴的深处后${player_name}毫不留情地蹂蹑起了少女………`); // :2323
        } // :2324
      } // :2325
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :2326
      era.set(`cflag:${target}:321`, 1); // :2326
      return 0; // :2327

    } else { // :2329

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:321`) <= 5 || era.get('flag:7') == 2)) { // :2331
        if (rand_n(3) == 0) { // :2332
          await era.printAndWait(`「啊啊恩~…更加…更加用力地抽插吧~…插到小穴要坏掉的程度吧~…好想要大鸡巴啊~${heart(1)}」`); // :2333
          await era.printAndWait(`${target_name}十分欣喜地让阴茎插进了蜜穴后发出了十分甘甜的娇喘声。`); // :2334
          await era.printAndWait(`「俺、俺已经…变成喜欢鸡巴的变态狂也没有关系了~${heart(1)}…更加…更加激烈地做吧~${heart(1)}」`); // :2335
          await era.printAndWait(`「一抽一抽地…好想被biu~地一下在里面射出精液啊~…${heart(1)}」`); // :2336
          await era.printAndWait(`不像样地张大着嘴巴恳求的姿态、看来少女已经不是村女而是完完全全妓女了………`); // :2337
        } else if (rand_n(2) == 0) { // :2338
          await era.printAndWait(`「啊啊~…主人的好热的来了~${heart(1)} 呜嗯~…这个好喜欢啊啊~${heart(1)}」`); // :2339
          await era.printAndWait(`${target_name}发出了愉悦的声音用双手缠绕住了${player_name}。`); // :2340
          await era.printAndWait(`「啊~${heart(1)} 啊~${heart(1)} 啊啊~${heart(1)}…好想就这样和主人融化合在一起啊~…${heart(1)}」`); // :2341
          await era.printAndWait(`${target_name}越过${player_name}的背后环抱住的双手意外地舒服………`); // :2342
          if (era.get(`talent:${target}:314`) == 9) { // :2343
            await era.printAndWait(`「啊~啊啊~${heart(1)}…就这样…将俺吃掉吧~…好想成为主人的一部分啊~………${heart(1)}」`); // :2344
            await era.printAndWait(`没错，向${player_name}撒娇的少女那魔族的双目发出了灿烂的光辉………`); // :2345
          } // :2346
        } else { // :2347
          await era.printAndWait(`「看着俺…的…脸吧~…被主人…用大鸡巴来调教…变得舒服起来的样子被看到了~…${heart(1)}」`); // :2348
          await era.printAndWait(`每当${target_name}的腔内深处被不断地抽插的时候，这个少女可爱的脸蛋就会歪曲掉发出了十分色情的娇喘声。`); // :2349
          await era.printAndWait(`「呀~${heart(1)}…呀啊~…啊~…哼~…呀啊~${heart(1)}…啊啊~…大鸡巴~…好棒~${heart(1)}…大鸡巴~…好喜欢${heart(1)}…最喜欢了~…${heart(1)}」`); // :2350
          await era.printAndWait(`「对不起~…只有俺变得那么舒服真是对不起~${heart(1)}…但是~…但是~…主人的大鸡巴好棒啊~${heart(1)}」`); // :2351
          await era.printAndWait(`${target_name}的脑袋完全变成了痴女的样子了………`); // :2352
        } // :2353
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :2354
        era.set(`cflag:${target}:321`, 6); // :2354

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:321`) <= 4 || era.get('flag:7') == 2)) { // :2356
        if (rand_n(3) == 0) { // :2357
          await era.printAndWait(`「啊~…哼~…啊呜~…哈啊嗯~…${heart(1)} 没问题的啊嗯~…更加激烈地动吧~！」`); // :2358
          await era.printAndWait(`${target_name}兴奋了起来，紧紧地抱住了${player_name}。`); // :2359
          if (era.get(`abl:${target}:2`) >=3) { // :2361
            await era.printAndWait(`「啊啊~…嗯~…哼…啊啊…小穴…好棒啊~………${heart(1)}」`); // :2361
          } // :2361
          await era.printAndWait(`「更加地…调教俺吧~${heart(1)}…俺的小穴~${heart(1)} 作为主人专用的小穴来用吧~！」`); // :2362
          await era.printAndWait(`每当腔内深处被抽插的时候，${target_name}就会一脸幸福的表情发出了甘甜的娇喘声。`); // :2363
          await era.printAndWait(`「俺…俺已经…不和主人在一起的话就活不下去了呢~………♪」`); // :2364
        } else if (rand_n(2) == 0) { // :2365
          await era.printAndWait(`「啊~…哈啊~…啊~啊啊~…不要啦~…好羞耻啊~………${heart(1)}」`); // :2366
          await era.printAndWait(`${player_name}将${target_name}的双腿抓住一口气拉开直接抽插了起来。`); // :2367
          if (era.get(`abl:${target}:2`) >=3) { // :2369
            await era.printAndWait(`「啊啊~…嗯~…哼…啊啊…小穴，变得好有感觉啊~…好棒啊…快看那里吧~………${heart(1)}」`); // :2369
          } // :2369
          await era.printAndWait(`「啊~…啊~…哼啊啊~…不行…俺、俺要…变得奇怪起来…了啊嗯~…${heart(1)}」`); // :2370
          await era.printAndWait(`${target_name}就算羞耻地脸别过去也一直因为快感而不断地发出娇喘声………`); // :2371
        } else { // :2372
          await era.printAndWait(`「哈呜~…啊啊啊~…更加…激烈地做吧~…啊~…啊啊嗯~${heart(1)}」`); // :2373
          await era.printAndWait(`${target_name}被插进去后吐出炽热的喘息，紧紧地抱住了${player_name}。`); // :2374
          await era.printAndWait(`「更加地疼爱我吧…将我疼爱到要弄坏的程度~${heart(1)} 让我将全部事情都忘记的程度吧~${heart(1)}」`); // :2375
          await era.printAndWait(`${target_name}一边发出可爱的声音一边因为${player_name}的下身而喘着粗气………`); // :2376
          if (era.get(`abl:${target}:2`) >=3) { // :2378
            await era.printAndWait(`「哼…啊啊…小穴…要融化掉了…${heart(1)} 俺…已经要变得不行了~${heart(1)}」`); // :2378
          } // :2378
        } // :2379
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :2380
        era.set(`cflag:${target}:321`, 5); // :2380

      } else if (era.get(`mark:${target}:2`) == 3 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:321`) <= 3 || era.get('flag:7') == 2)) { // :2382
        await era.printAndWait(`「哈呜呜~嗯~…啊…怎么感觉…好像…舒服起来…了…啊嗯~」`); // :2383
        await era.printAndWait(`${target_name}被不断地侵犯最终变得有感觉了的样子，变得娇喘连连了起来。`); // :2384
        await era.printAndWait(`「哈、哈啊嗯~…俺…俺会将腿张得更开的…~！」`); // :2385
        await era.printAndWait(`少女将双腿张开到极限的时候、为了让${player_name}变得更加高兴而大声地娇喘了起来………`); // :2386
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :2387
        era.set(`cflag:${target}:321`, 4); // :2387

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:321`) <= 2 || era.get('flag:7') == 2)) { // :2389
        await era.printAndWait(`「嗯呜~…往…往深处塞进去也…没问题…的噢~………」`); // :2390
        await era.printAndWait(`往刚刚说出如此坚强话语的${target_name}的腔内深处塞进了阴茎后，${player_name}就毫不留情地开始凌辱这可怜的少女………`); // :2391
        await era.printAndWait(`「哼~…呜~…啊啊~…嗯呜~…已、已经…再这样下去…啊呜~」`); // :2392
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :2393
        era.set(`cflag:${target}:321`, 3); // :2393

      } else if (era.get(`cflag:${target}:321`) <= 1 || era.get('flag:7') == 2) { // :2395
        await era.printAndWait(`「啊~…唔~…进来了…小鸡鸡…啊~呀~…突然这样子啊~…啊啊~！」`); // :2396
        await era.printAndWait(`往${target_name}的腔内深处塞进了阴茎后，${player_name}就毫不留情地开始凌辱这可怜的少女………`); // :2397
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :2398
        era.set(`cflag:${target}:321`, 2); // :2398
      } // :2399
      return 0; // :2400
    } // :2401
  } // :2402




  if (era_flag.selectcom == 21) { // :2407

    if (era.get(`cflag:${target}:322`) == 0) { // :2409

      if (era.get(`talent:${target}:0`) == 1) { // :2411

        if (era.get(`talent:${target}:76`) == 1) { // :2413

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2415
            await era.printAndWait(`「」`); // :2416

          } else if (era.get(`talent:${target}:314`) == 9) { // :2418
            await era.printAndWait(`「啊啊~${heart(1)}…大鸡巴要来啊~${heart(1)} 噢~哦哈啊~…好深啊~${heart(1)}」`); // :2419
            await era.printAndWait(`${target_name}的腰被抓住就这样被塞进了深处。破瓜的疼痛和未知的感觉让少女发出了欢喜的娇喘声。`); // :2420
            await era.printAndWait(`「感觉到主人的魔力了呢…主人~${heart(1)}…魔王大人~${heart(1)}」`); // :2421
            await era.printAndWait(`可能是因为紧紧贴在一起的原因，${target_name}发出了愉悦的声音、背后的翅膀突然就张开了。`); // :2422
            await era.printAndWait(`「更加地…啪啪啪吧~…将俺当成飞机杯用吧~${heart(1)}…被魔王大人给强暴了…好棒啊~${heart(1)}」`); // :2423
            await era.printAndWait(`少女被${player_name}抓住了腰、将立起脚尖的魔族少女的处女穴给弄得乱七八糟了………`); // :2424

          } else { // :2426
            await era.printAndWait(`「啊哈啊啊~${heart(1)} 好深啊~…大、大鸡巴好深啊啊啊~${heart(1)}」`); // :2427
            await era.printAndWait(`${target_name}非常下流地将舌头伸了出来。`); // :2428
            await era.printAndWait(`「啊啊~…处女小穴被欺负了~${heart(1)}…主人啊嗯~~更加用力的${heart(1)}…更加激烈地欺负吧~${heart(1)}」`); // :2429
            await era.printAndWait(`「感觉到大鸡巴在里面不停地侵犯俺呢~${heart(1)}…好棒啊~${heart(1)}…太舒服了~…感觉要变奇怪了~${heart(1)}」`); // :2430
            await era.printAndWait(`${target_name}的腰部被抓住、如她所希望的那样被继续侵犯下去了………`); // :2431
          } // :2432

        } else if (era.get(`talent:${target}:85`) == 1) { // :2434

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2436
            await era.printAndWait(`「」`); // :2437

          } else if (era.get(`talent:${target}:314`) == 9) { // :2439
            await era.printAndWait(`${player_name}将少女的双手向后拉着的姿态下侵犯了她，${target_name}就这样发出了如同叹气一样的娇喘声。`); // :2440
            await era.printAndWait(`「啊…哈啊啊啊…${heart(1)} 好激烈啊…魔王大人啊啊~…${heart(1)}」`); // :2441
            await era.printAndWait(`背后的翅膀突然就张开了、每当小小的屁股被侵犯的时候尾巴就会不停地乱甩着。`); // :2442
            await era.printAndWait(`「魔王大人的…大鸡巴里…魔力…好厉害的${heart(1)} …传进了…${heart(1)} 啊哈啊啊~${heart(1)} 俺、俺已经…变成魔王大人的东西了~${heart(1)}」`); // :2443
            await era.printAndWait(`${player_name}那一副塞进了阴茎而喜极而泣的姿态、如同完全臣服了的魔族少女一样………`); // :2444

          } else { // :2446
            await era.printAndWait(`「呜啊…啊啊啊…好深啊~…大鸡巴~…捅到了深处了啊~${heart(1)}」`); // :2447
            await era.printAndWait(`${target_name}大幅度地仰着腰，忍耐着破瓜的疼痛。`); // :2448
            await era.printAndWait(`「主人啊啊~…将俺的小穴…弄坏掉吧~…弄坏掉吧~~………${heart(1)}」`); // :2449
            await era.printAndWait(`每当小小的屁股被阴茎抽插的时候就会出现淫猥的声音。毫不留情地将腰撞上去后，${target_name}的屁股就不断地变红了起来。`); // :2450
            await era.printAndWait(`「啊~啊啊~…已、已经不行了~…俺的小穴…要变成主人专用的了呜啊~${heart(1)}」`); // :2451
          } // :2452

        } else { // :2454

          if (era_flag.assi > 0 && era_flag.assiplay) { // :2456
            await era.printAndWait(''); // :2457
          } else { // :2458
            await era.printAndWait(`${target_name}被${player_name}向后拉着双手的情况下侵犯着。`); // :2459
            await era.printAndWait(`「啊啊啊啊~！好、好难受啊啊~…不、不要啊啊…不要这样动起来啊啊啊~！」`); // :2460
            await era.printAndWait(`${target_name}不成熟的蜜穴被强行扩张、无法称之为快乐的苦痛的呻吟之声响彻了周围。`); // :2461
            await era.printAndWait(`因为这呻吟声兴奋起来的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`); // :2462
          } // :2463
        } // :2464

      } else { // :2466

        if (era.get(`talent:${target}:76`) == 1) { // :2468
          await era.printAndWait(`「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧~${heart(1)} 弄得俺更加乱七八糟的吧${heart(1)}」`); // :2469
          await era.printAndWait(`${target_name}的腰被抓住就这样被插到了深处、发出了欢喜的娇喘声。`); // :2470
          await era.printAndWait(`「啊啊~…好棒啊~…主人的大鸡巴好棒~${heart(1)}…好棒啊~${heart(1)}」`); // :2471

        } else if (era.get(`talent:${target}:85`) == 1) { // :2473
          await era.printAndWait(`「明明这样的姿势好羞耻来的…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊~…到深处来了~…${heart(1)}」`); // :2474
          await era.printAndWait(`捅进了${target_name}的腔内深处后，${player_name}开始慢慢地抽插了起来。`); // :2475
          await era.printAndWait(`「啊啊~…啊啊啊~…主人啊啊~…要翻起来了…小穴要翻出来了啊~${heart(1)}…啊啊啊~${heart(1)}」`); // :2476

        } else { // :2478
          await era.printAndWait(`${target_name}被${player_name}向后拉着双手的情况下侵犯着。`); // :2479
          await era.printAndWait(`「拜、拜托了~…再这样下去的话…原谅…俺吧…………」`); // :2480
          await era.printAndWait(`听到哀求声而兴奋起来的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`); // :2481
        } // :2482
      } // :2483
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2484
      era.set(`cflag:${target}:322`, 1); // :2484
      return 0; // :2485

    } else { // :2487

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:322`) <= 5 || era.get('flag:7') == 2)) { // :2489
        if (rand_n(3) == 0) { // :2490
          await era.printAndWait(`「啊啊~…啊啊嗯~…嗯~…呜嗯~…好棒~…好舒服~…好棒啊啊~…${heart(1)}」`); // :2491
          await era.printAndWait(`${target_name}的屁股不断地被腰用力的撞上去而变得红肿了起来。${target_name}连这份疼痛也当成快乐来享受的样子。`); // :2492
          await era.printAndWait(`「被侵犯的好喜欢啊~${heart(1)}…用大鸡巴来用力地啪啪啪俺吧~${heart(1)} 小穴变得黏糊糊起来了~${heart(1)}」`); // :2493
          if (era.get(`abl:${target}:2`) >= 3) { // :2495
            await era.printAndWait(`「啊啊啊~…已经~已经~…只能考虑大鸡巴的事情了哈呜~${heart(1)}…已经…已经不行了哈嗯嗯嗯~${heart(1)}」`); // :2495
          } // :2495
        } else if (rand_n(2) == 0) { // :2496
          await era.printAndWait(`「啊呀~…呀~…呀啊嗯~…被从背后做的…太有感觉了呜~…${heart(1)}」`); // :2497
          await era.printAndWait(`${target_name}将屁股高高地伸了出来、就这样任由${player_name}侵犯着。`); // :2498
          await era.printAndWait(`「啊啊啊~…主人啊啊~…好棒啊啊~${heart(1)}…更加激烈地侵犯俺吧~…侵犯要坏掉的程度吧~…${heart(1)}」`); // :2499
          if (era.get(`abl:${target}:2`) >= 3) { // :2501
            await era.printAndWait(`「啊呀哈恩~…小穴要来了~${heart(1)}…要来了啊~…${heart(1)} 已、已经要变得不行了呜呜~${heart(1)}」`); // :2501
          } // :2501
        } else { // :2502
          await era.printAndWait(`「啊哈啊~…将俺就这样当成主人专用的飞机杯来用吧${heart(1)} 将俺弄得更加乱七八糟的吧${heart(1)}」`); // :2503
          await era.printAndWait(`${target_name}的腰被抓住就这样被插到了深处后、就发出了欢喜的娇喘声。。`); // :2504
          await era.printAndWait(`「啊啊啊~…小穴被干着好舒服啊~~~${heart(1)}…大鸡巴进到深处了呜呜~${heart(1)}」`); // :2505
          if (era.get(`abl:${target}:2`) >= 3) { // :2507
            await era.printAndWait(`「啊啊啊~…小穴好棒啊~${heart(1)}…好棒的啊~…${heart(1)} 将俺弄得更加舒服起来吧~${heart(1)}」`); // :2507
          } // :2507
        } // :2508
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :2509
        era.set(`cflag:${target}:322`, 6); // :2509

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:322`) <= 4 || era.get('flag:7') == 2)) { // :2511
        if (rand_n(3) == 0) { // :2512
          if (era.get(`abl:${target}:2`) >= 3) { // :2514
            await era.printAndWait(`「从背后做好舒服啊~…主人~${heart(1)}」`); // :2514
          } // :2514
          await era.printAndWait(`${target_name}趴在地上、沉浸在了被从背后侵犯所带来的快感之中。`); // :2515
          await era.printAndWait(`「嗯~…啊啊~…嗯呀~…好~…好棒啊~…主人~…俺是主人的小狗狗来的~${heart(1)}」`); // :2516
          await era.printAndWait(`「就这样…将种子射进来吧~${heart(1)}…俺…会将主人的小宝宝生出来的~${heart(1)}」`); // :2517
        } else if (rand_n(2) == 0) { // :2518
          await era.printAndWait(`「啊嗯~…啊哈啊啊~${heart(1)}…被主人从后面…做的话…就感觉…俺变成野兽了一样~${heart(1)}」`); // :2519
          await era.printAndWait(`${target_name}被从背后做而兴奋起来的样子，不断地大声呻吟着。`); // :2520
          await era.printAndWait(`「啊哈啊啊嗯~…啊啊啊嗯~${heart(1)}…俺是…主人的小狗狗来的~${heart(1)}」`); // :2521
          if (era.get(`abl:${target}:2`) >= 3) { // :2523
            await era.printAndWait(`「啊啊啊~…主人的大鸡巴好棒~${heart(1)}…大鸡巴最棒了啊~${heart(1)}」`); // :2523
          } // :2523
        } else { // :2524
          await era.printAndWait(`「明明这样的姿势很羞耻来的~…啊~…啊哈啊啊~…好深啊~…啊~啊啊啊啊…插到深处来了呜嗯~…${heart(1)}」`); // :2525
          await era.printAndWait(`插进${target_name}的腔内深处后，${player_name}慢慢地抽插起来了。`); // :2526
          await era.printAndWait(`「啊啊~…啊啊啊~…主人啊嗯~…要翻出来了…小穴要翻起来了啊~${heart(1)}…啊啊啊~${heart(1)}」`); // :2527
          if (era.get(`abl:${target}:2`) >= 3) { // :2529
            await era.printAndWait(`「小…小穴…好棒啊~${heart(1)}…更加用力地侵犯俺吧~${heart(1)}…主人~${heart(1)}」`); // :2529
          } // :2529
        } // :2530
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2531
        era.set(`cflag:${target}:322`, 5); // :2531

      } else if (era.get(`mark:${target}:2`) == 3 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:322`) <= 3 || era.get('flag:7') == 2)) { // :2533
        await era.printAndWait(`${target_name}将屁股高高地抬起来、少女的蜜穴如同追求快感一样抽动着。`); // :2534
        await era.printAndWait(`「啊~…哈啊~…嗯~♪…好棒~…这个…好棒啊~…啊~啊啊~…连、深处都…被侵犯着呐哈呜~」`); // :2535
        await era.printAndWait(`完全屈服了的${target_name}因为被侵犯的快感而颤抖起来了、每次捅进去的时候都会发出甘甜的娇喘声………`); // :2536
        if (rand_n(3) == 0) { // :2538
          await era.printAndWait(`「嗯~…啊~…啊啊嗯~…啊嗯~…啊嗯~…啊哼唔嗯~♪………好深…好爽~好舒服啊~${heart(1)}」`); // :2538
        } // :2538
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2539
        era.set(`cflag:${target}:322`, 4); // :2539

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:322`) <= 2 || era.get('flag:7') == 2)) { // :2541
        await era.printAndWait(`${target_name}在双手被向后拉的情况下被侵犯着。`); // :2542
        await era.printAndWait(`「啊~啊啊啊~…嗯~…啊啊啊~…唔呜~…呜呜~………哈唔呜~」`); // :2543
        await era.printAndWait(`可能开始习惯起被侵犯的吧，${target_name}虽然尽力的忍耐着不让自己发出声音、然而是不是还是会从嘴边漏出甜美的娇喘声………`); // :2544
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2545
        era.set(`cflag:${target}:322`, 3); // :2545

      } else if (era.get(`cflag:${target}:322`) <= 1 || era.get('flag:7') == 2) { // :2547
        await era.printAndWait(`${target_name}在双手被向后拉的情况下被侵犯着。`); // :2548
        await era.printAndWait(`「拜、拜托了~…再这样下去的话…原谅…俺吧…………」`); // :2549
        await era.printAndWait(`听到哀求声的${player_name}重新将少女的小屁股抓住、毫不留情地继续凌辱着………`); // :2550
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2551
        era.set(`cflag:${target}:322`, 2); // :2551
      } // :2552
      return 0; // :2553
    } // :2554
  } // :2555




  if (era_flag.selectcom == 22) { // :2560
    if (era.get(`cflag:${target}:323`) == 0) { // :2561

      if (era.get(`talent:${target}:0`) == 1) { // :2563

        if (era.get(`talent:${target}:76`) == 1) { // :2565
          await era.printAndWait(`「」`); // :2566

        } else if (era.get(`talent:${target}:85`) == 1) { // :2568
          await era.printAndWait(`「」`); // :2569

        } else { // :2571
          await era.printAndWait(`「」`); // :2572
        } // :2573

      } else { // :2575

        if (era.get(`talent:${target}:76`) == 1) { // :2577
          await era.printAndWait(`「啊啊啊~…主人的~…进到深处里面去了啊~~${heart(1)}…啊啊~…俺、俺要忍不住了啊~………${heart(1)}」`); // :2578
          await era.printAndWait(`${target_name}的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………`); // :2579

        } else if (era.get(`talent:${target}:85`) == 1) { // :2581
          await era.printAndWait(`「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~${heart(1)}…啊啊嗯~…主人啊嗯~${heart(1)}」`); // :2582
          await era.printAndWait(`${target_name}就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了${player_name}………`); // :2583

        } else { // :2585
          await era.printAndWait(`「啊啊~…进到了…深处了啊呜…啊啊~…不、不能往上捅啊啊………」`); // :2586
          await era.printAndWait(`${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`); // :2587
        } // :2588
      } // :2589
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2590
      era.set(`cflag:${target}:323`, 1); // :2590
      return 0; // :2591

    } else { // :2593

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:323`) <= 5 || era.get('flag:7') == 2)) { // :2595
        if (rand_n(3) == 0) { // :2596
          await era.printAndWait(`「啊啊啊~…主人的…进到深处了啊嗯~${heart(1)}…啊啊~…俺、俺要忍不住了啊~………${heart(1)}」`); // :2597
          await era.printAndWait(`${target_name}的腰轻轻地前后晃动品味起快感后就整个人都因为刺激而跳了一下………`); // :2598
          await era.printAndWait(`「啊嗯~…哈啊~…啊啊啊啊啊…主人的大鸡巴嵌入进去了啊嗯~~…将俺的小穴干地乱七八糟的吧~${heart(1)}」`); // :2599
          if (era.get(`abl:${target}:2`) >= 3) { // :2601
            await era.printAndWait(`「唔呀啊~呀嗯~${heart(1)} 啊啊啊…已经记住了大鸡巴的味道了呢~…啊啊~啊啊啊嗯~${heart(1)}」`); // :2601
          } // :2601
        } else if (rand_n(2) == 0) { // :2602
          await era.printAndWait(`「啊哈啊…主人~…亲吻…吧~…呐啊~…俺想要亲吻嘛~…${heart(1)}」`); // :2603
          await era.printAndWait(`${target_name}的幼小的腔内深处塞进了阴茎后，少女忍不住发出了甜美的呻吟声。`); // :2604
          await era.printAndWait(`然后，${player_name}将少女的小屁股抓住好不留情的上下抽插后。甜美的呻吟声变成了大声的娇喘声了。`); // :2605
          await era.printAndWait(`「哈呀啊嗯~${heart(1)}…不~不行呀啊~…这、这样子…往上捅的话突…俺、俺要坏掉了~${heart(1)}」`); // :2606
          if (era.get(`abl:${target}:2`) >= 3) { // :2608
            await era.printAndWait(`「啊哈啊啊~…大鸡巴好棒啊~${heart(1)}…将俺的小穴…干地乱起八糟的吧~${heart(1)}…啊啊~啊~啊啊啊啊~${heart(1)}」`); // :2608
          } // :2608
        } else { // :2609
          await era.printAndWait(`「啊啊~…不要啊…快、快点动起来嘛~…俺、俺要变奇怪起来了………${heart(1)}」`); // :2610
          await era.printAndWait(`${target_name}的腰被双手牢牢的抓住，完全动不了而被玩弄着。`); // :2611
          await era.printAndWait(`「啊啊~…拜托了~…将俺的色情小穴…狠狠地侵犯了吧…侵犯了嘛~…啊~…呀哈啊嗯~${heart(1)}」`); // :2612
          await era.printAndWait(`可能是看到少女已经到了忍耐的极限，${player_name}将${target_name}的腰抓住毫不留情的上下抽插起来了………`); // :2613
          if (era.get(`abl:${target}:2`) >= 3) { // :2615
            await era.printAndWait(`「呀~…呀啊啊~…大鸡巴好棒啊~…主人的大鸡巴最棒了啊~${heart(1)} 小穴要融化掉呜~${heart(1)}」`); // :2615
          } // :2615
        } // :2616
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :2617
        era.set(`cflag:${target}:323`, 6); // :2617

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:323`) <= 4 || era.get('flag:7') == 2)) { // :2619
        if (rand_n(3) == 0) { // :2620
          await era.printAndWait(`「啊啊~…嗯哼呜…跟主人完全完美地贴在一起了~${heart(1)}…啊啊嗯~…主人啊嗯~${heart(1)}」`); // :2621
          await era.printAndWait(`${target_name}就这样贴合在一起的情况下如同撒娇一样用脸颊蹭起了${player_name}。`); // :2622
          if (era.get(`abl:${target}:2`) >= 3) { // :2624
            await era.printAndWait(`「啊啊~…喜欢~${heart(1)}…好喜欢${heart(1)}…就这样一直合在一起嘛~…主人~…${heart(1)}」`); // :2624
          } // :2624
        } else if (rand_n(2) == 0) { // :2625
          await era.printAndWait(`「主人~${heart(1)}…主人啊嗯~${heart(1)}」`); // :2626
          await era.printAndWait(`${player_name}将紧紧搂过来的${target_name}的腰部抓住后十分粗暴地往上抽插起来了，而少女却发出了十分欣喜的娇喘声。`); // :2627
          if (era.get(`abl:${target}:2`) >= 3) { // :2629
            await era.printAndWait(`「好棒啊~…被主人…狠狠地干好棒啊~${heart(1)}」`); // :2629
          } // :2629
        } else { // :2630
          await era.printAndWait(`「这样的姿势的话…就能不停地亲吻了我好喜欢~${heart(1)}…好喜欢啾~${heart(1)}…啾~啾呜~${heart(1)}」`); // :2631
          await era.printAndWait(`${target_name}牢牢地将${player_name}的身体搂住、哪怕正在侵犯也在不停地亲吻着${player_name}。`); // :2632
          if (era.get(`abl:${target}:2`) >= 3) { // :2633
            await era.printAndWait(`${player_name}将${target_name}的腰抓住后十分粗暴的往上捅、品味着紧紧吸附住的甘甜的腔内。`); // :2634
            await era.printAndWait(`「啊啊…被、被那么地往上抽插了的话…会、会亲不了了啊嗯…嗯~…嗯噗呜~${heart(1)}」`); // :2635
          } // :2636
        } // :2637
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :2638
        era.set(`cflag:${target}:323`, 5); // :2638

      } else if (era.get(`mark:${target}:2`) == 3 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:323`) <= 3 || era.get('flag:7') == 2)) { // :2640
        await era.printAndWait(`「啊~…嗯呜呜~…啊啊~…进到里面啊嗯…了啊嗯…」`); // :2641
        await era.printAndWait(`${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`); // :2642
        await era.printAndWait(`「啊~…哈呜呜~…嗯~………啊啊~…明明是被那么粗暴地对待来着…啊~啊啊啊~」`); // :2643
        await era.printAndWait(`从少女的嘴里不断地漏出了甜美的娇喘声………`); // :2644
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :2645
        era.set(`cflag:${target}:323`, 4); // :2645

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:323`) <= 2 || era.get('flag:7') == 2)) { // :2647
        await era.printAndWait(`「啊~…嗯呜呜~…啊啊~…进到深处了…啊呜…」`); // :2648
        await era.printAndWait(`${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`); // :2649
        await era.printAndWait(`「啊呀~…呀啊~…啊呜呜呜~…请、请原谅俺了吧………」`); // :2650
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :2651
        era.set(`cflag:${target}:323`, 3); // :2651

      } else if (era.get(`cflag:${target}:323`) <= 1 || era.get('flag:7') == 2) { // :2653
        await era.printAndWait(`「啊啊~…进到…深处了啊嗯…啊啊~…往、往上捅不行的啊啊啊………」`); // :2654
        await era.printAndWait(`${player_name}将${target_name}的细腰抓住，十分粗鲁地将腰往上撞、而少女就这样一直忍耐着这份凌辱………`); // :2655
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :2656
        era.set(`cflag:${target}:323`, 2); // :2656
      } // :2657
      return 0; // :2658
    } // :2659
  } // :2660




  if (era_flag.selectcom == 23) { // :2665
    if (era.get(`cflag:${target}:324`) == 0) { // :2666

      if (era.get(`talent:${target}:0`) == 1) { // :2668

        if (era.get(`talent:${target}:76`) == 1) { // :2670
          await era.printAndWait(`「」`); // :2671

        } else if (era.get(`talent:${target}:85`) == 1) { // :2673
          await era.printAndWait(`「」`); // :2674

        } else { // :2676
          await era.printAndWait(`「」`); // :2677
        } // :2678

      } else { // :2680

        if (era.get(`talent:${target}:76`) == 1) { // :2682
          await era.printAndWait(`「嗯呀~呀啊啊嗯~${heart(1)}…将俺的小穴插到要坏掉的程度吧~…啊嗯~${heart(1)}」`); // :2683
          if (era.get(`talent:${target}:110`) == 1) { // :2685
            await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2685
          } // :2685
          if (era.get(`talent:${target}:114`) == 1) { // :2687
            await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2687
          } // :2687
          if (era.get(`talent:${target}:119`) == 1) { // :2689
            await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2689
          } // :2689

        } else if (era.get(`talent:${target}:85`) == 1) { // :2691
          await era.printAndWait(`「啊啊~…哈啊啊…主人…啊啊~…更用力地…揉俺的胸部吧…${heart(1)}」`); // :2692
          if (era.get(`talent:${target}:110`) == 1) { // :2694
            await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2694
          } // :2694
          if (era.get(`talent:${target}:114`) == 1) { // :2696
            await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2696
          } // :2696
          if (era.get(`talent:${target}:119`) == 1) { // :2698
            await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2698
          } // :2698

        } else { // :2700
          await era.printAndWait(`「啊唔~…呜呜~…啊啊啊啊~…这么从下往上捅的话…呀~…呀哈啊~…！」`); // :2701
          if (era.get(`talent:${target}:110`) == 1) { // :2703
            await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2703
          } // :2703
          if (era.get(`talent:${target}:114`) == 1) { // :2705
            await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2705
          } // :2705
          if (era.get(`talent:${target}:119`) == 1) { // :2707
            await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2707
          } // :2707
        } // :2708
      } // :2709
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :2710
      era.set(`cflag:${target}:324`, 1); // :2710
      return 0; // :2711

    } else { // :2713

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:324`) <= 5 || era.get('flag:7') == 2)) { // :2715
        if (rand_n(3) == 0) { // :2716
          await era.printAndWait(`${target_name}将双腿张开，让阴茎插到了深处。`); // :2717
          await era.printAndWait(`「啊啊啊~…明明是如此羞耻的姿势来的~…好舒服啊~${heart(1)}」`); // :2718
          await era.printAndWait(`${player_name}环抱住${target_name}的腰部温柔地往上抽插着。`); // :2719
          await era.printAndWait(`「啊~啊啊啊~…更加激烈地做嘛~…俺…已经…不是被狠狠地干的话就不行了啊~${heart(1)}」`); // :2720
        } else if (rand_n(2) == 0) { // :2721
          await era.printAndWait(`「啊~啊啊~…俺的小穴…发出了噗呲噗呲的声音了呢~…${heart(1)}」`); // :2722
          await era.printAndWait(`${player_name}用手臂环抱住了${target_name}的幼小身体、慢慢地用手抚摸着胸部。`); // :2723
          await era.printAndWait(`「啊啊~…将俺的胸部也…弄得乱起八糟的吧…${heart(1)}」`); // :2724
          if (era.get(`talent:${target}:110`) == 1) { // :2726
            await era.printAndWait(`${target_name}的巨乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`); // :2726
          } // :2726
          if (era.get(`talent:${target}:114`) == 1) { // :2728
            await era.printAndWait(`${target_name}的爆乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`); // :2728
          } // :2728
          if (era.get(`talent:${target}:119`) == 1) { // :2730
            await era.printAndWait(`${target_name}的超乳被从后面揉着、将乳头捏了一下后少女就发出了大声的娇喘声。`); // :2730
          } // :2730
          await era.printAndWait(`「呀啊~啊啊啊~…啊啊啊~…乳头…变得奇怪起来了~${heart(1)}」`); // :2731
        } else { // :2732
          await era.printAndWait(`「嗯呀~~呀啊啊嗯~${heart(1)}…将俺的小穴往上捅到要坏掉的程度吧~…啊嗯~${heart(1)}」`); // :2733
          await era.printAndWait(`${player_name}环抱住${target_name}的幼小身体，毫不留情地用腰撞上去。`); // :2734
          await era.printAndWait(`「啊啊啊~…啊哼呜~…呀哈啊~${heart(1)}…好棒啊~…小穴好棒啊~…${heart(1)}」`); // :2735
          if (era.get(`talent:${target}:110`) == 1) { // :2737
            await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2737
          } // :2737
          if (era.get(`talent:${target}:114`) == 1) { // :2739
            await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2739
          } // :2739
          if (era.get(`talent:${target}:119`) == 1) { // :2741
            await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2741
          } // :2741
        } // :2742
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :2743
        era.set(`cflag:${target}:324`, 6); // :2743

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:324`) <= 4 || era.get('flag:7') == 2)) { // :2745
        if (rand_n(3) == 0) { // :2746
          await era.printAndWait(`「啊哈啊~…俺、俺已…已经…已经…变得奇怪起来了呜~${heart(1)}」`); // :2747
          await era.printAndWait(`${player_name}环抱住${target_name}的腰慢慢地十分温柔地从上抽插起来了。`); // :2748
          await era.printAndWait(`「啊~…啊啊~哈啊啊…被、被这么干了的话…啊~…啊啊啊啊~${heart(1)}」`); // :2749
        } else if (rand_n(2) == 0) { // :2750
          await era.printAndWait(`「啊哈啊~…哈啊啊嗯~${heart(1)}…大鸡巴好深啊~…啊~啊啊啊~${heart(1)}」`); // :2751
          await era.printAndWait(`${player_name}用手臂环抱住了${target_name}的幼小身体、慢慢地用手抚摸着胸部。`); // :2752
          await era.printAndWait(`「啊啊~…啊嗯~…哈呜呜呜~…被那么温柔的…的话…哈啊啊嗯~${heart(1)}」`); // :2753
          if (era.get(`talent:${target}:110`) == 1) { // :2755
            await era.printAndWait(`${target_name}因为自己的巨乳被从背后温柔地抚摸而发出了甘甜的声音………`); // :2755
          } // :2755
          if (era.get(`talent:${target}:114`) == 1) { // :2757
            await era.printAndWait(`${target_name}因为自己的爆乳被从背后温柔地抚摸而发出了甘甜的声音………`); // :2757
          } // :2757
          if (era.get(`talent:${target}:119`) == 1) { // :2759
            await era.printAndWait(`${target_name}因为自己的超乳被从背后温柔地抚摸而发出了甘甜的声音………`); // :2759
          } // :2759
        } else { // :2760
          await era.printAndWait(`「啊啊~…哈啊啊啊…主人…啊啊~…更加地…用俺的胸部吧~…${heart(1)}」`); // :2761
          await era.printAndWait(`${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`); // :2762
          await era.printAndWait(`「哈啊~啊啊~${heart(1)}…主人的大鸡巴…进到里面去了~${heart(1)}」`); // :2763
          if (era.get(`talent:${target}:110`) == 1) { // :2765
            await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2765
          } // :2765
          if (era.get(`talent:${target}:114`) == 1) { // :2767
            await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2767
          } // :2767
          if (era.get(`talent:${target}:119`) == 1) { // :2769
            await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2769
          } // :2769
        } // :2770
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :2771
        era.set(`cflag:${target}:324`, 5); // :2771

      } else if (era.get(`mark:${target}:2`) == 3 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:324`) <= 3 || era.get('flag:7') == 2)) { // :2773
        await era.printAndWait(`${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`); // :2774
        await era.printAndWait(`「嗯呀~…呀啊~…啊啊啊~…好奇怪啊…明明是被这么粗暴地对待来着…居然会那么舒服………！」`); // :2775
        if (era.get(`talent:${target}:110`) == 1) { // :2777
          await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2777
        } // :2777
        if (era.get(`talent:${target}:114`) == 1) { // :2779
          await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2779
        } // :2779
        if (era.get(`talent:${target}:119`) == 1) { // :2781
          await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2781
        } // :2781
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :2782
        era.set(`cflag:${target}:324`, 4); // :2782

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:324`) <= 2 || era.get('flag:7') == 2)) { // :2784
        await era.printAndWait(`${player_name}环抱住${target_name}的幼小身体，毫不留情地插了上去。`); // :2785
        await era.printAndWait(`「啊~…啊啊啊~…胸部就这样被抓者的情况下…被插上来的话…啊呜呜呜~…！」`); // :2786
        if (era.get(`talent:${target}:110`) == 1) { // :2788
          await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2788
        } // :2788
        if (era.get(`talent:${target}:114`) == 1) { // :2790
          await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2790
        } // :2790
        if (era.get(`talent:${target}:119`) == 1) { // :2792
          await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了甜美的娇喘声………`); // :2792
        } // :2792
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :2793
        era.set(`cflag:${target}:324`, 3); // :2793

      } else if (era.get(`cflag:${target}:324`) <= 1 || era.get('flag:7') == 2) { // :2795
        await era.printAndWait(`「啊唔~…呜呜~…啊啊啊啊~…被这么激烈地捅上去的话…呀~…哈呀~…！」`); // :2796
        if (era.get(`talent:${target}:110`) == 1) { // :2798
          await era.printAndWait(`${target_name}的巨乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2798
        } // :2798
        if (era.get(`talent:${target}:114`) == 1) { // :2800
          await era.printAndWait(`${target_name}的爆乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2800
        } // :2800
        if (era.get(`talent:${target}:119`) == 1) { // :2802
          await era.printAndWait(`${target_name}的超乳从后背被揉着并且被从下捅上来而发出了苦痛的娇喘声………`); // :2802
        } // :2802
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :2803
        era.set(`cflag:${target}:324`, 2); // :2803
      } // :2804
      return 0; // :2805
    } // :2806
  } // :2807




  if (era_flag.selectcom == 26) { // :2812

    if (era.get(`cflag:${target}:327`) == 0) { // :2814

      if (era.get(`talent:${target}:76`) == 1) { // :2816
        if (era.get(`abl:${target}:3`) >= 3) { // :2817
          await era.printAndWait(`「将俺的屁股…干得乱七八糟地吧~…${heart(1)}」`); // :2818
          await era.printAndWait(`${target_name}为了品味更强烈的快感而将双腿张的大大的让${player_name}就这样侵犯着屁股………`); // :2819
        } else { // :2820
          await era.printAndWait(`「将俺的屁股…干得乱七八糟地吧~…${heart(1)}」`); // :2821
          await era.printAndWait(`${target_name}时不时很痛苦似的皱着眉头、被毫不留情的侵犯着………`); // :2822
        } // :2823

      } else if (era.get(`talent:${target}:85`) == 1) { // :2825
        if (era.get(`abl:${target}:3`) >= 3) { // :2826
          await era.printAndWait(`「唔…嗯~…！ 主人啊嗯~…更加激烈地…侵犯俺的屁股吧~………${heart(1)}」`); // :2827
          await era.printAndWait(`${target_name}用她纤细的双手抱住${player_name}、享受着调教play的肛门凌辱的快感。………`); // :2828
        } else { // :2829
          await era.printAndWait(`「唔啊啊~…唔…嗯~…！ 好、好难受啊~………${heart(1)}」`); // :2830
          await era.printAndWait(`调教不足的肛门被毫不留情地凌辱着、${target_name}在${player_name}的身下发出了十分痛苦的呻吟声………`); // :2831
        } // :2832

      } else { // :2834
        if (era.get(`abl:${target}:3`) >= 3) { // :2835
          await era.printAndWait(`「啊啊啊~…大、大鸡巴~…进去了…嗯呀啊嗯~…！」`); // :2836
          await era.printAndWait(`每当被重度开发过的肛门被阴茎来回抽插的时候、${target_name}发出了充满快感的呻吟声………`); // :2837
        } else { // :2838
          await era.printAndWait(`「不、不要啊~…那里才…不是该进去的地方啊…唔…呀、呀啊啊啊~」`); // :2839
          await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`); // :2840
        } // :2841

      } // :2843
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :2844
      era.set(`cflag:${target}:327`, 1); // :2844
      return 0; // :2845

    } else { // :2847

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:327`) <= 8 || era.get('flag:7') == 2)) { // :2849
        if (rand_n(3) == 0) { // :2850
          if (era.get(`talent:${target}:0`) == 1) { // :2852
            await era.printAndWait(`「俺是…主人专用肛穴奴隶来的${heart(1)} 小穴缝起来也没问题的噢~${heart(1)}」`); // :2852
          } // :2852
          await era.printAndWait(`「里面在被主人搅拌着呢哈啊啊~${heart(1)} 肛穴好舒服好爽啊啊啊~${heart(1)}」`); // :2853
          await era.printAndWait(`${target_name}像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。`); // :2854
          await era.printAndWait(`「咿呓～…咿啊～…啊啊啊啊~${heart(1)} 啊～${heart(1)}啊～${heart(1)}啊啊啊啊啊啊~${heart(1)}」`); // :2855
        } else if (rand_n(2) == 0) { // :2856
          await era.printAndWait(`「这样～的做爱～${heart(1)} 太～棒～啦～${heart(1)}」`); // :2857
          if (era.get(`talent:${target}:0`) == 1) { // :2859
            await era.printAndWait(`「小穴什么的已经可以不需要了～…${heart(1)} 来更多的操菊穴吧～${heart(1)}」`); // :2859
          } // :2859
          await era.printAndWait(`被毫不留情的侵犯肛门的${target_name}一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性爱狂了。`); // :2860
          await era.printAndWait(`「啊咿～咿～噫～～${heart(1)}…黏糊糊的～${heart(1)}…菊穴变得黏糊糊的～${heart(1)}」`); // :2861
        } else { // :2862
          await era.printAndWait(`「哦哦～${heart(1)}…哦吼～${heart(1)}…菊穴被撑大了${heart(1)}主人～～主人～～${heart(1)}」`); // :2863
          await era.printAndWait(`虽然${target_name}被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。`); // :2864
          await era.printAndWait(`「菊穴好爽啊～${heart(1)}…想一直被肉棒侵犯下去${heart(1)}…菊穴好爽啊～${heart(1)} 好爽～${heart(1)}」`); // :2865
        } // :2866
        // CFLAG:327  = 9（变量语义：CFLAG 族，327） // :2867
        era.set(`cflag:${target}:327`, 9); // :2867

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:327`) <= 7 || era.get('flag:7') == 2)) { // :2869
        if (rand_n(2) == 0) { // :2870
          await era.printAndWait(`「嗯呼呜～…肛门被掀动起来了${heart(1)} 被肉棒侵犯好爽啊～${heart(1)}」`); // :2871
          await era.printAndWait(`被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声。`); // :2872
          await era.printAndWait(`「啊啊啊～${heart(1)} 不行了…嘻～嘻～…再这么激烈的话…已经…不行了～${heart(1)}」`); // :2873
        } else { // :2874
          if (era.get(`talent:${target}:0`) == 1) { // :2876
            await era.printAndWait(`「虽然想快点被侵犯小穴…但是肛门感觉也很爽${heart(1)}」`); // :2876
          } // :2876
          await era.printAndWait(`「不对不对～…肛门…太有感觉了…不、要啊～…再这样下去的话～${heart(1)}」`); // :2877
          await era.printAndWait(`肛门在一颤一颤地夹紧着阴茎、${player_name}更激烈的插起了肛门。`); // :2878
          await era.printAndWait(`「啊啊～${heart(1)} 不要～不要～${heart(1)}…我、已经…已经…嘻嘻～嘻嘻～${heart(1)}」`); // :2879
        } // :2880
        // CFLAG:327  = 8（变量语义：CFLAG 族，327） // :2881
        era.set(`cflag:${target}:327`, 8); // :2881

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:327`) <= 6 || era.get('flag:7') == 2)) { // :2883
        await era.printAndWait(`「啊咕呜～…又、是这么激烈～…但是～…被主人这么努力地开发的话…感觉好开心啊～…${heart(1)}」`); // :2884
        await era.printAndWait(`${target_name}的还没调教完成的尻穴被尽可能地扩张开、少女忍不住皱起了眉头………`); // :2885
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :2886
        era.set(`cflag:${target}:327`, 7); // :2886

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:327`) <= 5 || era.get('flag:7') == 2)) { // :2888
        if (rand_n(3) == 0) { // :2889
          if (era.get(`talent:${target}:0`) == 1) { // :2891
            await era.printAndWait(`「已经…变成菊穴专用奴隶了呢～${heart(1)}」`); // :2891
          } // :2891
          await era.printAndWait(`「快来操吧…我的屁股～…用主人的肉棒把它搅得一塌糊涂吧～${heart(1)}」`); // :2892
          await era.printAndWait(`${target_name}像完全沉迷于肛门性交中似的、光是被插入肛门就露出了放荡的表情。`); // :2893
          await era.printAndWait(`「已、已经…只需要屁股就够了～…快来侵犯屁股吧～${heart(1)}」`); // :2894
        } else if (rand_n(2) == 0) { // :2895
          await era.printAndWait(`「啊啊～…啊～啊啊啊～…哈啊啊${heart(1)} 已、已经…变得奇怪了…肛交呜～${heart(1)}」`); // :2896
          await era.printAndWait(`被毫不留情的侵犯肛门的${target_name}一边翻起白眼一边叫嚷起来。少女已经完全变成肛门性爱狂了。`); // :2897
          await era.printAndWait(`「呀～…噫～…库咿咿～～…只要能被操屁股的话…不管怎么样都好啦～${heart(1)}」`); // :2898
        } else { // :2899
          await era.printAndWait(`「咿～咿～～…啊啊～…主人～～主人～～${heart(1)}」`); // :2900
          await era.printAndWait(`虽然${target_name}被毫不留情的侵犯肛门、但她的小小身体也变得更容易品味到阴茎插入的快感的样子。`); // :2901
          await era.printAndWait(`「我的菊花变得黏糊糊的了呢…已经…变成肉棒专用穴了哦…${heart(1)}」`); // :2902
        } // :2903
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :2904
        era.set(`cflag:${target}:327`, 6); // :2904

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:327`) <= 4 || era.get('flag:7') == 2)) { // :2906
        if (rand_n(2) == 0) { // :2907
          if (era.get(`talent:${target}:0`) == 1) { // :2909
            await era.printAndWait(`「我…明明是处女…屁股却这么爽${heart(1)}」`); // :2909
          } // :2909
          await era.printAndWait(`「啊啊啊～…我的屁股…因为被主人干所以好有感觉啊～～…${heart(1)}」`); // :2910
          await era.printAndWait(`被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声。`); // :2911
          await era.printAndWait(`「屁股也…记住鸡鸡的味道了呢～…${heart(1)} 更多…还想尝尝更多～${heart(1)}」`); // :2912
        } else { // :2913
          if (era.get(`talent:${target}:0`) == 1) { // :2915
            await era.printAndWait(`「啊哈哈～…明明想早点被干小穴…屁股却啊啊～${heart(1)}」`); // :2915
          } // :2915
          await era.printAndWait(`「不行不行～～…屁股…实在太爽了…不、要啊～…再这样辖区的话～${heart(1)}」`); // :2916
          await era.printAndWait(`肛门在一颤一颤地夹紧着阴茎、${master_name}更激烈的插起了肛门。`); // :2917
          await era.printAndWait(`「啊啊～${heart(1)} 不行不行不行～${heart(1)}…我、已经…已经…嘻嘻～嘻嘻～${heart(1)}」`); // :2918
        } // :2919
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :2920
        era.set(`cflag:${target}:327`, 5); // :2920

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:327`) <= 3 || era.get('flag:7') == 2)) { // :2922
        await era.printAndWait(`「没、没事的…这样…完全没什么大不了的…唔～…咕呜～…啊、哈啊啊～………！」`); // :2923
        await era.printAndWait(`${target_name}的还没调教完成的尻穴被尽可能地扩张开、${target_name}咬着牙尽量忍住痛苦的声音。`); // :2924
        if (era.get(`talent:${target}:0`) == 1) { // :2926
          await era.printAndWait(`「比起屁股…更想…好好地、用小穴做呢～！」`); // :2926
        } // :2926
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :2927
        era.set(`cflag:${target}:327`, 4); // :2927

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:327`) <= 2 || era.get('flag:7') == 2)) { // :2929
        await era.printAndWait(`「啊~…嗯~…呀嗯~…啊~…啊啊啊…要翻起来了呜~…要翻出来了啊呜呜呜~………！」`); // :2930
        await era.printAndWait(`被施予了大量尻穴调教的肛门、每次随着阴茎的抽插、就会令${target_name}发出充满快感的呻吟声………`); // :2931
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :2932
        era.set(`cflag:${target}:327`, 3); // :2932

      } else if (era.get(`cflag:${target}:327`) <= 1 || era.get('flag:7') == 2) { // :2934
        await era.printAndWait(`「唔~…啊~…呀~…拔出来…快点…拔出来啦………」`); // :2935
        await era.printAndWait(`${target_name}还是很紧很窄的肛门被扩张到极限、${target_name}也因此发出了苦痛的呻吟声………`); // :2936
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :2937
        era.set(`cflag:${target}:327`, 2); // :2937
      } // :2938
      return 0; // :2939
    } // :2940
  } // :2941




  if (era_flag.selectcom == 27) { // :2946

    if (era.get(`cflag:${target}:328`) == 0) { // :2948

      if (era.get(`talent:${target}:76`) == 1) { // :2950
        if (era.get(`abl:${target}:3`) >= 3) { // :2951
          await era.printAndWait(`「明、明明是这样的姿势来的…明明被这样侵犯着肛门…但是好棒啊啊~${heart(1)}…啊哈啊~啊啊~啊啊啊啊啊啊${heart(1)}」`); // :2952
          await era.printAndWait(`对经过尻穴调教变为性器的肛门的刺激令${target_name}的精神从原本纯朴的村娘向着牝犬的方向堕落着………`); // :2953
        } else { // :2954
          await era.printAndWait(`「啊咕呜～…虽、虽然很激烈…但总觉的…主人的肉棒…热热的…${heart(1)}」`); // :2955
          await era.printAndWait(`${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}开始毫不留情的抽送起来………`); // :2956
        } // :2957

      } else if (era.get(`talent:${target}:85`) == 1) { // :2959
        if (era.get(`abl:${target}:3`) >= 3) { // :2960
          await era.printAndWait(`「啊呀嗯嗯～${heart(1)}…啊啊啊~…从后面…被侵犯屁股了～～${heart(1)}」`); // :2961
          await era.printAndWait(`${target_name}的已调教完毕的肛门颤抖着被${player_name}一次次插入深处、${player_name}一边看着小屁股的颤抖一边不停地抽插着。`); // :2962
        } else { // :2963
          await era.printAndWait(`「啊呜～…呜、从后面…啊啊～、那、那里是～…额！」`); // :2964
          await era.printAndWait(`摁住${target_name}的娇小体躯、毫不留情地从后面贯穿了未熟的肛门………`); // :2965
        } // :2966

      } else { // :2968
        if (era.get(`abl:${target}:3`) >= 3) { // :2969
          await era.printAndWait(`「啊～…啊呜呜～…被掀起来了…我的…屁股…屁股啊～………」`); // :2970
          await era.printAndWait(`${player_name}抓住${target_name}的小屁股、毫不留情地对调教完毕的肛门展开了陵辱………`); // :2971
        } else { // :2972
          await era.printAndWait(`「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊啊~！」`); // :2973
          await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`); // :2974
        } // :2975
      } // :2976
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :2977
      era.set(`cflag:${target}:328`, 1); // :2977
      return 0; // :2978

    } else { // :2980

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:328`) <= 8 || era.get('flag:7') == 2)) { // :2982
        if (rand_n(3) == 0) { // :2983
          if (era.get(`talent:${target}:0`) == 1) { // :2985
            await era.printAndWait(`「对成为菊穴专用奴隶的我来说…小穴什么的…已经没必要了～${heart(1)}」`); // :2985
          } // :2985
          await era.printAndWait(`「啊～咿～～${heart(1)}…嘻～嘻嘻…来啦～…我已经…只要有菊穴就好了～${heart(1)}」`); // :2986
          await era.printAndWait(`${target_name}好像已经完全成为了尻穴狂的样子、只是轻轻摩擦肛门就会变成牝犬似的。`); // :2987
          await era.printAndWait(`「啊啊啊～…菊穴…变得黏糊糊的了…啊啊啊啊～…好想被中出～～…好想被中出啊～～${heart(1)}」`); // :2988
        } else if (rand_n(2) == 0) { // :2989
          await era.printAndWait(`「诶嘿嘿～${heart(1)}…啊啊～…啊呀啊啊…菊穴性交…要融化了…我、我…要融化了～…${heart(1)}」`); // :2990
          if (era.get(`talent:${target}:0`) == 1) { // :2992
            await era.printAndWait(`「已经不需要小穴了～…${heart(1)} 更多的搅动我的菊穴吧～${heart(1)}」`); // :2992
          } // :2992
          await era.printAndWait(`被毫不留情的侵犯肛门的${target_name}、通过肛门的快感已经达到了高潮的样子。`); // :2993
          await era.printAndWait(`「啊～啊啊～…主人～…真棒啊～${heart(1)}…更多地插菊穴吧～${heart(3)}」`); // :2994
        } else { // :2995
          await era.printAndWait(`「哦哦～${heart(1)}…哦吼～${heart(1)}…菊穴强暴真是最棒了～${heart(1)}」`); // :2996
          await era.printAndWait(`${player_name}一边抓住小屁股一边毫不留情的侵犯起了${target_name}的肛门、就好像玩弄玩具似的。`); // :2997
          await era.printAndWait(`「啊啊啊啊～…不要不要不要～${heart(1)}…我…又、又…高潮…又高潮了～…要变成笨蛋了～${heart(1)}」`); // :2998
        } // :2999
        // CFLAG:328  = 9（变量语义：CFLAG 族，328） // :3000
        era.set(`cflag:${target}:328`, 9); // :3000

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:328`) <= 7 || era.get('flag:7') == 2)) { // :3002
        if (rand_n(2) == 0) { // :3003
          await era.printAndWait(`「啊啊啊～被看到了～${heart(1)}…肛门…被抽插的地方正在被看着～${heart(1)}」`); // :3004
          await era.printAndWait(`通过尻穴调教已经成为性器的${target_name}的肛门、每当被阴茎抽送就会很明显地感到会收缩起来。`); // :3005
          await era.printAndWait(`「啊啊啊～${heart(1)} 被、被这样弄下去的话～…我、我…已、经～${heart(1)}」`); // :3006
        } else { // :3007
          if (era.get(`talent:${target}:0`) == 1) { // :3009
            await era.printAndWait(`「啊啊啊～…要、要这样…侵犯小穴吗～…${heart(1)}」`); // :3009
          } // :3009
          await era.printAndWait(`一抓住${target_name}的小屁股${player_name}就毫不留情的动起腰开始侵犯起了肛门。`); // :3010
          await era.printAndWait(`「啊呓咿～…只、只有屁股…只有屁股也好棒～～${heart(1)}」`); // :3011
          await era.printAndWait(`对经由尻穴调教变成性器的肛门的刺激令${target_name}的精神从原本纯朴的村娘往牝犬堕落了。`); // :3012
          await era.printAndWait(`「咿咿咿咿～${heart(1)}…咿咿咿咿噫～${heart(1)}…噫啊啊～啊啊～啊啊啊～${heart(1)}…啊哈啊啊啊啊～${heart(1)}」`); // :3013
        } // :3014
        // CFLAG:328  = 8（变量语义：CFLAG 族，328） // :3015
        era.set(`cflag:${target}:328`, 8); // :3015

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:328`) <= 6 || era.get('flag:7') == 2)) { // :3017
        await era.printAndWait(`「啊咕呜～…好、激烈、但是…总觉的…主人的肉棒…热乎乎的…${heart(1)}」`); // :3018
        await era.printAndWait(`${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}开始毫不留情的抽送起来………`); // :3019
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3020
        era.set(`cflag:${target}:328`, 7); // :3020

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:328`) <= 5 || era.get('flag:7') == 2)) { // :3022
        if (rand_n(3) == 0) { // :3023
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3025
            await era.printAndWait(`「啊～啊哈啊～…已、已经…只要有屁股就好了～…变成菊穴专用奴隶了～${heart(1)}」`); // :3025
          } // :3025
          await era.printAndWait(`「啊咿呓～${heart(1)} 屁股～屁股～！…啊啊啊～…已、已经…心神俱醉了～～${heart(1)}」`); // :3026
          await era.printAndWait(`${target_name}像已经完全沉迷于肛门性交中似的样子、垂直分开的肛门不像话地张开并包住了${player_name}的阴茎。`); // :3027
          await era.printAndWait(`「啊啊啊嗯～…啊～啊啊～…啊啊啊啊嗯～${heart(1)}…像要让屁股怀孕般地射精吧～${heart(1)}」`); // :3028
        } else if (rand_n(2) == 0) { // :3029
          await era.printAndWait(`「啊啊～…咕～…呜呼～…呜呜～…咕呜～…噫～咿呓～…${heart(1)}」`); // :3030
          await era.printAndWait(`被毫不留情的侵犯肛门的${target_name}正脸朝下趴着、一边努力地抬起小屁股一边呻吟着。`); // :3031
          await era.printAndWait(`「啊啊啊～…我、已经…为了能被侵犯屁股…不管什么事都会去做了…主人啊啊啊～${heart(1)}」`); // :3032
        } else { // :3033
          await era.printAndWait(`「嗯呼呜呜呜～…啊呜～…呜～…啊啊啊啊～…我的屁股～…变成主人的飞机杯了～${heart(1)}」`); // :3034
          await era.printAndWait(`${target_name}紧缩起来的肛门、已经变得不管被什么东西插入都会产生快感了吧。`); // :3035
          await era.printAndWait(`「啊咿～…咿～噫咿咿咿～…我的…菊、菊穴…能被肉棒插进来真是太感谢了～～${heart(1)}」`); // :3036
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3038
            await era.printAndWait(`「啊～啊哈啊～…已、已经…只要有屁股就够了～…变成菊穴专用奴隶了～${heart(1)}」`); // :3038
          } // :3038
        } // :3039
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3040
        era.set(`cflag:${target}:328`, 6); // :3040

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:328`) <= 4 || era.get('flag:7') == 2)) { // :3042
        if (rand_n(2) == 0) { // :3043
          if (era.get(`talent:${target}:0`) == 1) { // :3045
            await era.printAndWait(`「啊啊啊～…真是的…我的处女…快点夺走吧～～～………${heart(1)}」`); // :3045
          } // :3045
          await era.printAndWait(`「咿～噫咿～…用屁股好有感觉啊～…主人的鸡鸡…感觉到了～${heart(1)}」`); // :3046
          await era.printAndWait(`在后背位下可以很明显的观察到经受了多次尻穴调教后的肛门紧缩了起来、${player_name}一边舔着嘴唇。`); // :3047
          await era.printAndWait(`「啊啊～…主人的鸡鸡…真棒～…啊～啊哈啊～啊～啊呜呜嗯～${heart(1)}」`); // :3048
        } else { // :3049
          if (era.get(`talent:${target}:0`) == 1) { // :3051
            await era.printAndWait(`「呐、呐～…好好地抱我嘛～…用主人的拿东西夺走我的处女嘛～………」`); // :3051
          } // :3051
          await era.printAndWait(`「呃！噫咿～～…咿～呓～…啊啊啊～…屁股…有感觉了…好有感觉哦～………${heart(1)}」`); // :3052
          await era.printAndWait(`${target_name}的肛门每当被${player_name}用阴茎连根插入便会一颤一颤的、小屁股的震动尽收眼底并不断地继续抽插着。`); // :3053
          await era.printAndWait(`「啊呀～${heart(1)}…咿～呓～${heart(1)}…我、我的…屁股、屁股要变得奇怪了～${heart(1)}」`); // :3054
        } // :3055
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3056
        era.set(`cflag:${target}:328`, 5); // :3056

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:328`) <= 3 || era.get('flag:7') == 2)) { // :3058
        await era.printAndWait(`「啊啊啊～…啊～…哈啊…主、主人～${heart(1)}…再温柔点～…啊～啊啊～……！」`); // :3059
        await era.printAndWait(`${target_name}的还没调教完成的尻穴被尽可能地扩张开、${player_name}的阴茎被紧紧收缩起来的肛门刺激的很舒服………`); // :3060
        if (era.get(`talent:${target}:0`) == 1) { // :3062
          await era.printAndWait(`「呐、呐～…不要光是屁股…把我的处女也…早点夺走吧～…${heart(1)}」`); // :3062
        } // :3062
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3063
        era.set(`cflag:${target}:328`, 4); // :3063

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:328`) <= 2 || era.get('flag:7') == 2)) { // :3065
        await era.printAndWait(`「啊～…啊啊啊～…哈～…啊咕呜～…我…明明不是狗～！」`); // :3066
        await era.printAndWait(`抓住并侵犯着${target_name}的小屁股、可以很明显地发现肛门收缩起来了。`); // :3067
        await era.printAndWait(`「啊～…啊呜呜～…收缩起来了…我的…屁股…变得奇怪了………」`); // :3068
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3069
        era.set(`cflag:${target}:328`, 3); // :3069

      } else if (era.get(`cflag:${target}:328`) <= 1 || era.get('flag:7') == 2) { // :3071
        await era.printAndWait(`「啊~…啊啊啊~…不~…不要啊…这样的…啊啊啊~！」`); // :3072
        await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`); // :3073
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3074
        era.set(`cflag:${target}:328`, 2); // :3074
      } // :3075
      return 0; // :3076
    } // :3077
  } // :3078




  if (era_flag.selectcom == 28) { // :3083

    if (era.get(`cflag:${target}:329`) == 0) { // :3085

      if (era.get(`talent:${target}:76`) == 1) { // :3087
        if (era.get(`abl:${target}:3`) >= 3) { // :3088
          await era.printAndWait(`「主人啊啊~…屁、屁股…好深啊~…啊啊~${heart(1)}更加激烈地…做吧~${heart(1)}」`); // :3089
          await era.printAndWait(`${target_name}的被调教过扩张过的尻穴十分容易就将${player_name}的阴茎给吞进去了、少女的肛门慢慢地变成了愉悦的性用品了………`); // :3090
        } else { // :3091
          await era.printAndWait(`「啊~…啊嗯~…啊、啊啊…俺、俺会…好好地动起来的啦…啊嗯~${heart(1)}」`); // :3092
          await era.printAndWait(`${target_name}一脸淫荡的表情有点生疏的前后动起了腰………`); // :3093
        } // :3094

      } else if (era.get(`talent:${target}:85`) == 1) { // :3096
        if (era.get(`abl:${target}:3`) >= 3) { // :3097
          await era.printAndWait(`「啊~啊呜呜~…屁股被扩张了呜…主人的大鸡巴全部都进去了啊~${heart(1)}」`); // :3098
          await era.printAndWait(`${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎。少女的表情不断地变得荡漾起来了………`); // :3099
        } else { // :3100
          await era.printAndWait(`「啊啊~…主人~…啊~啊啊~…大鸡巴…全部进去了呀~${heart(1)}」`); // :3101
          await era.printAndWait(`${target_name}抱住${player_name}将忍耐已久的阴茎撑开肛门慢慢地埋了进去………`); // :3102
        } // :3103

      } else { // :3105
        if (era.get(`abl:${target}:3`) >= 3) { // :3106
          await era.printAndWait(`「啊~…嗯呀~…哈~…拔出来…啊啊~啊啊啊~！」`); // :3107
          await era.printAndWait(`${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎………`); // :3108
        } else { // :3109
          await era.printAndWait(`「啊~啊啊啊~…那、那里是…屁股来的…啊~…啊啊啊啊~！」`); // :3110
          await era.printAndWait(`${target_name}的肛门被${player_name}的阴茎毫不留情地蹂蹑了………`); // :3111
        } // :3112
      } // :3113
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :3114
      era.set(`cflag:${target}:329`, 1); // :3114
      return 0; // :3115

    } else { // :3117

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:329`) <= 8 || era.get('flag:7') == 2)) { // :3119
        if (rand_n(3) == 0) { // :3120
          if (era.get(`talent:${target}:0`) == 1) { // :3122
            await era.printAndWait(`「请、请更多地…侵犯菊穴吧～${heart(1)}…小穴什么的已经无所谓啦～${heart(1)}」`); // :3122
          } // :3122
          await era.printAndWait(`「啊啊～啊咿～～…嗯咿～～…主人～${heart(1)}…我、我…咿咿噫～、被、插得不行了～${heart(1)}」`); // :3123
          await era.printAndWait(`${target_name}的淫乱肛门完全变成了性器、每被从下往上插${target_name}就感到如痴如醉。`); // :3124
          await era.printAndWait(`「啊啊～…煮～仁～…煮～仁～${heart(1)}…我、我…又、又要去了呃呃呃～～${heart(1)}」`); // :3125
        } else if (rand_n(2) == 0) { // :3126
          await era.printAndWait(`「太棒了～～${heart(1)} …主人的肉棒${heart(1)} …在搅动菊穴～${heart(1)}」`); // :3127
          if (era.get(`talent:${target}:0`) == 1) { // :3129
            await era.printAndWait(`「小穴什么的已经无所谓啦～${heart(1)} 一直肛交下去吧～${heart(1)}」`); // :3129
          } // :3129
          await era.printAndWait(`${target_name}每当肛门被插、被搅动、被侵犯。她的全身就会因为暴力般的刺激而感到快乐。`); // :3130
          await era.printAndWait(`「啊呀呀～…菊穴真爽～${heart(1)}…菊穴真爽～${heart(1)}…真爽～${heart(1)}…真爽～${heart(1)}…真爽～${heart(3)}」`); // :3131
        } else { // :3132
          await era.printAndWait(`「呀哈啊～${heart(1)}…啊啊～${heart(1)}…屁、屁股要化了…已、已经…已经…${heart(1)}」`); // :3133
          await era.printAndWait(`每当肛门被插${target_name}就会紧紧抱住${player_name}、不断地发出娇喘声。`); // :3134
          await era.printAndWait(`「啊啊哈啊啊…又、又…又要不行了～…菊穴要融化了…要变不回去了～${heart(1)}」`); // :3135
        } // :3136
        // CFLAG:329  = 9（变量语义：CFLAG 族，329） // :3137
        era.set(`cflag:${target}:329`, 9); // :3137

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:329`) <= 7 || era.get('flag:7') == 2)) { // :3139
        if (rand_n(2) == 0) { // :3140
          if (era.get(`talent:${target}:0`) == 1) { // :3142
            await era.printAndWait(`「啊呜呜～…呐、呐～…为什么只是对屁股…啊啊啊～${heart(1)}」`); // :3142
          } // :3142
          await era.printAndWait(`${target_name}的肛门一被阴茎连根插入、便向将其从少女变成大人的${player_name}撒起娇来。`); // :3143
          await era.printAndWait(`「啊咿～啊啊啊…主人…屁股…好棒…好棒哦…${heart(1)} 嗯啾嗯啾呜…${heart(1)}」`); // :3144
          await era.printAndWait(`${target_name}纠缠不休的与${player_name}不断接吻的同时、自己前后动起了腰贪求着快乐。`); // :3145
          await era.printAndWait(`「嗯啾～…啾～…啾${heart(1)}…就这样…射精吧～…在我的屁股里…射精吧～${heart(1)}」`); // :3146
        } else { // :3147
          await era.printAndWait(`一抓住${target_name}的腰${player_name}就用阴茎插进肛门开始侵犯起来。`); // :3148
          await era.printAndWait(`「啊～啊啊啊～…主人啊啊…屁、屁股…继续…操～${heart(1)}」`); // :3149
          await era.printAndWait(`经由尻穴调教被扩张开的肛门轻松地吞下了${player_name}的阴茎、菊穴变成了快乐的坩堝。`); // :3150
          await era.printAndWait(`「啊呜呜呜…屁股好爽～…好爽～${heart(1)} 被干得好爽～${heart(1)}」`); // :3151
        } // :3152
        // CFLAG:329  = 8（变量语义：CFLAG 族，329） // :3153
        era.set(`cflag:${target}:329`, 8); // :3153

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:329`) <= 6 || era.get('flag:7') == 2)) { // :3155
        await era.printAndWait(`「啊～…啊嗯～…啊、啊啊…我、我…有好好地动腰…了啊啊～${heart(1)}」`); // :3156
        await era.printAndWait(`${target_name}一脸陶醉地前后晃着腰。`); // :3157
        await era.printAndWait(`「啊啊～…好、好激烈…嗯啊～…啊～…啊呜呜～${heart(1)}」`); // :3158
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :3159
        era.set(`cflag:${target}:329`, 7); // :3159

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:329`) <= 5 || era.get('flag:7') == 2)) { // :3161
        if (rand_n(3) == 0) { // :3162
          await era.printAndWait(`「嗯啊呜呜～…菊穴好爽啊～～${heart(1)}…光用屁股就高潮了～${heart(1)} 高潮了～～～${heart(3)}」`); // :3163
          await era.printAndWait(`${target_name}的肛门很轻易地吞下了${player_name}的阴茎、只是品尝这一快乐就变得神情荡漾。`); // :3164
          await era.printAndWait(`「再来～…侵犯我的菊穴吧～…被主人的大肉棒侵犯实在是太棒了～～${heart(1)}」`); // :3165
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3167
            await era.printAndWait(`「已、已经…小穴什么的已经随便怎样都好了…只要…菊穴…舒服…${heart(1)}」`); // :3167
          } // :3167
        } else if (rand_n(2) == 0) { // :3168
          await era.printAndWait(`「啊呜～…嗯～…呼呜～…啊啊…主人～…喜欢…喜欢…菊穴做爱好喜欢～…${heart(1)}」`); // :3169
          await era.printAndWait(`被毫不留情的侵犯肛门的${target_name}抱住${player_name}品味着肛门的快乐。`); // :3170
          await era.printAndWait(`「还要…更多…再激烈点也可以哦～…狠狠地把菊穴弄坏吧～～${heart(3)}」`); // :3171
        } else { // :3172
          await era.printAndWait(`「啊啊…啊…嘿啊啊啊啊啊…要融化了…下半身要融化了～～${heart(1)}」`); // :3173
          await era.printAndWait(`${target_name}的肛门经过多次调教完全成为了性器、即使粗暴地对待也会发出愉悦的呻吟。`); // :3174
          await era.printAndWait(`「啊哈啊～…啊～啊呜呜～…主人～${heart(1)} 主人～${heart(1)} 主人啊啊啊～${heart(3)}」`); // :3175
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3177
            await era.printAndWait(`「啊～啊哈啊～…我、已经…不会再说任性的话了…变成菊穴专用奴隶了～～${heart(1)}」`); // :3177
          } // :3177
        } // :3178
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :3179
        era.set(`cflag:${target}:329`, 6); // :3179

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:329`) <= 4 || era.get('flag:7') == 2)) { // :3181
        if (rand_n(2) == 0) { // :3182
          if (era.get(`talent:${target}:0`) == 1) { // :3184
            await era.printAndWait(`「啊呜～真是的…再这样下去只有屁股才会有感觉呜～快点夺走处女吧～${heart(1)}」`); // :3184
          } // :3184
          await era.printAndWait(`「啊～啊呜呜～…屁股被撑开了…感觉到被主人的鸡鸡全部插进了～～…${heart(1)}」`); // :3185
          await era.printAndWait(`${target_name}紧紧抱住${player_name}、每当肛门被插便会发出呻吟声。`); // :3186
          await era.printAndWait(`「啊哈啊～…啊啊～…啊啊～哈啊啊～…已、已经不行了…饶了我吧…主人～${heart(1)}」`); // :3187
        } else { // :3188
          if (era.get(`talent:${target}:0`) == 1) { // :3190
            await era.printAndWait(`「就这、这样抱我嘛…用主人的东西夺走我的处女吧～………」`); // :3190
          } // :3190
          await era.printAndWait(`「呀咿～…咿～咿～…啊啊啊～…屁股…好有感觉～…好有感觉哦～………${heart(1)}」`); // :3191
          await era.printAndWait(`${player_name}抓住腰不断地蹂躙着肛门、看着发出可爱悲鸣的${target_name}、${player_name}舔了舔嘴唇。`); // :3192
          await era.printAndWait(`「啊呀～${heart(1)}…咕咿～${heart(1)}…屁、屁股…缩起来了缩起来了…啊呜呜呜${heart(1)}」`); // :3193
        } // :3194
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :3195
        era.set(`cflag:${target}:329`, 5); // :3195

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:329`) <= 3 || era.get('flag:7') == 2)) { // :3197
        await era.printAndWait(`「啊啊~…主人啊~…啊~啊啊~…大鸡巴…全部进来啦~${heart(1)}」`); // :3198
        await era.printAndWait(`${target_name}紧紧地抱住${player_name}忍耐的同时，${player_name}缓慢地将阴茎塞了进去。`); // :3199
        await era.printAndWait(`「啊啊…不、不行~…再、再这样捅下去的话…要…要坏掉了~…！」`); // :3200
        if (era.get(`talent:${target}:0`) == 1) { // :3202
          await era.printAndWait(`「啊~啊啊啊…只欺负屁股什么的…啊嗯~…啊啊啊~${heart(1)}」`); // :3202
        } // :3202
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :3203
        era.set(`cflag:${target}:329`, 4); // :3203

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:329`) <= 2 || era.get('flag:7') == 2)) { // :3205
        await era.printAndWait(`「啊~…嗯呀~…再、再这样下去的话…全部进去了…啊~啊啊呜呜~」`); // :3206
        await era.printAndWait(`${target_name}被开发过的肛门十分容易地就接受了${player_name}的阴茎、少女的腰在不知不觉中晃动了起来。`); // :3207
        await era.printAndWait(`「啊啊啊啊~…腰、腰自…自己就…动起来了呜呜~」`); // :3208
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :3209
        era.set(`cflag:${target}:329`, 3); // :3209

      } else if (era.get(`cflag:${target}:329`) <= 1 || era.get('flag:7') == 2) { // :3211
        await era.printAndWait(`「啊~啊啊~啊~…屁~屁股…不要啊啊啊~！」`); // :3212
        await era.printAndWait(`${target_name}的肛门被阴茎毫不留情地蹂蹑了………`); // :3213
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :3214
        era.set(`cflag:${target}:329`, 2); // :3214
      } // :3215
      return 0; // :3216
    } // :3217
  } // :3218




  if (era_flag.selectcom == 29) { // :3223

    if (era.get(`cflag:${target}:330`) == 0) { // :3225

      if (era.get(`talent:${target}:76`) == 1) { // :3227
        if (era.get(`abl:${target}:3`) >= 3) { // :3228
          await era.printAndWait(`${target_name}被从后面抱着，饱经开发的肛穴被鸡巴插入时、口中漏出了甜媚的喘息。`); // :3229
          await era.printAndWait(`「啊咿~…噫…深深的好爽${heart(1)}…主人的大鸡巴${heart(1)}…全部品尝到了啊~${heart(1)}」`); // :3230
        } else { // :3231
          await era.printAndWait(`「啊啊~…深深的好舒服…哦哦~啊${heart(1)} 俺的${heart(1)}」`); // :3232
          await era.printAndWait(`${player_name}抱着${target_name}从她身后插入了肛门………`); // :3233
        } // :3234

      } else if (era.get(`talent:${target}:85`) == 1) { // :3236
        if (era.get(`abl:${target}:3`) >= 3) { // :3237
          await era.printAndWait(`「主、主人啊…这、这个姿势什么的好羞人…啊啊啊~呀嗯~咿${heart(1)}…啊啊啊啊~${heart(1)}」`); // :3238
          await era.printAndWait(`${target_name}开发过的肛门被鸡巴强行侵入、插进了一半${target_name}就变得老实了起来。`); // :3239
          await era.printAndWait(`${player_name}温柔的揉胸引起了一声声甜美的呼唤。${target_name}一次又一次的收缩着直肠催促他射精。`); // :3240
          await era.printAndWait(`「啊啊~…啊咿~…咦…好棒…好棒呢…${heart(1)}」`); // :3241
        } else { // :3242
          await era.printAndWait(`「啊啊啊~…呼…插太深了插太深了啦…鸡、鸡巴这不是全部插进来了嘛${heart(1)}」`); // :3243
          await era.printAndWait(`${player_name}温柔的从后面抱起${target_name}慢慢地插入了她的肛门………`); // :3244
        } // :3245

      } else { // :3247
        if (era.get(`abl:${target}:3`) >= 3) { // :3248
          await era.printAndWait(`「啊咕…嗯呀…全、全部进来了…啊啊~…啊咿~噫嗯~…去了~♪」`); // :3249
          await era.printAndWait(`${target_name}开发过的直肠开心的绞紧了${player_name}插进来的肉棒………`); // :3250
        } else { // :3251
          await era.printAndWait(`「把、把脚掰那么开的话…啊~！啊、啊咕呜…好、深…不、不行啦…」`); // :3252
          await era.printAndWait(`${target_name}的肛门被${player_name}的鸡巴无情的蹂躏着………`); // :3253
        } // :3254
      } // :3255
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :3256
      era.set(`cflag:${target}:330`, 1); // :3256
      return 0; // :3257

    } else { // :3259

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:330`) <= 8 || era.get('flag:7') == 2)) { // :3261
        if (rand_n(3) == 0) { // :3262
          if (era.get(`talent:${target}:0`) == 1) { // :3264
            await era.printAndWait(`「真、真是的…肛穴这样被干的话${heart(1)}…小穴什么根本不需要啦${heart(1)}」`); // :3264
          } // :3264
          await era.printAndWait(`「啊啊~…好棒…好舒服…大肉帮最喜欢了${heart(1)}…喜欢${heart(1)}肉棒大爱${heart(1)}」`); // :3265
          await era.printAndWait(`${target_name}的肛门已经完全成为性器了、只是从下面插进来的程度就让快乐在少女脑中回荡了起来。`); // :3266
          await era.printAndWait(`「脑、脑袋要变得奇怪了${heart(1)}…除了小肛穴以外的事情怎么样都好啦${heart(1)}…大鸡巴…啊啊啊~啊呜~…啊啊啊啊啊${heart(1)}」`); // :3267
        } else if (rand_n(2) == 0) { // :3268
          await era.printAndWait(`「啊啊~…啊哈啊~…肛穴被干着${heart(1)}…被侵犯着有感觉了${heart(1)}」`); // :3269
          if (era.get(`talent:${target}:0`) == 1) { // :3271
            await era.printAndWait(`「小穴什么的已经不需要啦${heart(1)} 一直、一直做肛穴SEX就咿咿咿${heart(1)}」`); // :3271
          } // :3271
          await era.printAndWait(`${target_name}左右晃动着她的小屁股的同时将${player_name}的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。`); // :3272
          await era.printAndWait(`「啊嘿呀啊~…大鸡巴…最棒了呀${heart(1)} 更多…更多插进来…射出好多好多吧${heart(1)}」`); // :3273
        } else { // :3274
          await era.printAndWait(`「啊啊啊、啊呀啊嗯~…干、干坏掉吧…俺的肛穴开始…全部…全部干到坏掉吧${heart(1)}」`); // :3275
          if (era.get(`talent:${target}:110`) == 1) { // :3277
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。`); // :3277
          } // :3277
          if (era.get(`talent:${target}:114`) == 1) { // :3279
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。`); // :3279
          } // :3279
          await era.printAndWait(`「奶子…再欺负俺的奶子…扭、扭断了也没关系${heart(1)}…啊啊~…啊哈啊啊~…啊呜呜呜${heart(1)}」`); // :3280
          await era.printAndWait(`胸部被抓着肛门再次被侵犯的${target_name}发出了狂乱的娇喘。`); // :3281
          await era.printAndWait(`「啊唏呀啊嗯~…超赞…哦哦…啊哈啊啊…肛穴里面已经变得黏糊糊的了${heart(1)}…好想要精液呢${heart(1)}」`); // :3282
        } // :3283
        // CFLAG:330  = 9（变量语义：CFLAG 族，330） // :3284
        era.set(`cflag:${target}:330`, 9); // :3284

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:330`) <= 7 || era.get('flag:7') == 2)) { // :3286
        if (rand_n(2) == 0) { // :3287
          if (era.get(`talent:${target}:0`) == 1) { // :3289
            await era.printAndWait(`「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~${heart(1)}」`); // :3289
          } // :3289
          await era.printAndWait(`${player_name}抱着${target_name}从她身后插入了肛门。`); // :3290
          await era.printAndWait(`「啊啊~…这么深好棒…哦哦啊啊~${heart(1)} 人家的肛门都被撑大了${heart(1)}」`); // :3291
          if (era.get(`talent:${target}:110`) == 1) { // :3293
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声。`); // :3293
          } // :3293
          if (era.get(`talent:${target}:114`) == 1) { // :3295
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声。`); // :3295
          } // :3295
          await era.printAndWait(`「啊啊啊嗯~…好棒${heart(1)}…好棒啊${heart(1)}…俺…已、已经…啊啊啊嗯~${heart(1)}」`); // :3296
        } else { // :3297
          await era.printAndWait(`「主人大人${heart(1)}…喜欢~喜欢${heart(1)}…肛门sex最喜欢了${heart(1)}」`); // :3298
          await era.printAndWait(`${target_name}一边甜甜的叫着一边在${player_name}的腰上狂乱的舞蹈着。`); // :3299
          if (era.get(`talent:${target}:110`) == 1) { // :3301
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。`); // :3301
          } // :3301
          if (era.get(`talent:${target}:114`) == 1) { // :3303
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。`); // :3303
          } // :3303
          await era.printAndWait(`「胸部被揉着的话…哈呜呜…啊~…啊呜呜呜嗯~…啊呀啊…已、已经…要不行了…${heart(1)}」`); // :3304
        } // :3305
        // CFLAG:330  = 8（变量语义：CFLAG 族，330） // :3306
        era.set(`cflag:${target}:330`, 8); // :3306

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:330`) <= 6 || era.get('flag:7') == 2)) { // :3308
        if (era.get(`talent:${target}:0`) == 1) { // :3310
          await era.printAndWait(`「啊呜呜…屁股那边很好是没错…小、小穴那边也……啊~！？…咿呀啊啊~${heart(1)}」`); // :3310
        } // :3310
        await era.printAndWait(`「啊啊~…这么深好棒…哦哦啊啊~${heart(1)} 人家的肛门都被撑大了${heart(1)}」`); // :3311
        await era.printAndWait(`${player_name}抱着${target_name}从她身后插入了肛门………`); // :3312
        if (era.get(`talent:${target}:110`) == 1) { // :3314
          await era.printAndWait(`然后从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了激烈的喘息声………`); // :3314
        } // :3314
        if (era.get(`talent:${target}:114`) == 1) { // :3316
          await era.printAndWait(`然后从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了激烈的喘息声………`); // :3316
        } // :3316
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :3317
        era.set(`cflag:${target}:330`, 7); // :3317

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:330`) <= 5 || era.get('flag:7') == 2)) { // :3319
        if (rand_n(3) == 0) { // :3320
          await era.printAndWait(`「啊啊~…哈呜呜~…肉棒全部进来了${heart(1)}…俺的肛穴里面…全部进来了${heart(1)}」`); // :3321
          await era.printAndWait(`${target_name}左右晃动着她的小屁股的同时将${player_name}的阴茎用肛门全部吞进去了后，少女露出了一脸荡漾的表情。`); // :3322
          await era.printAndWait(`「啊哈啊～${heart(1)}…好爽…好爽…肛穴sex稀饭（喜欢）${heart(1)}…坠稀饭惹（最喜欢了）${heart(3)}」`); // :3323
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3325
            await era.printAndWait(`「再、再来…永远永远…干俺的肛穴啊…${heart(1)}」`); // :3325
          } // :3325
        } else if (rand_n(2) == 0) { // :3326
          await era.printAndWait(`「啊哈啊啊啊~…好深${heart(1)} 大鸡巴全部进来了${heart(1)}」`); // :3327
          await era.printAndWait(`直肠被无情的侵犯着的${target_name}感受着肛门的抽插，发出一声声愉悦的喊叫。`); // :3328
          await era.printAndWait(`「再来…再来${heart(1)}…更激烈的…请把俺的肛门插坏吧${heart(3)}」`); // :3329
          if (era.get(`talent:${target}:110`) == 1) { // :3331
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的叫喊声………`); // :3331
          } // :3331
          if (era.get(`talent:${target}:114`) == 1) { // :3333
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的叫喊声………`); // :3333
          } // :3333
        } else { // :3334
          await era.printAndWait(`「软掉了…俺的腰…已经软掉了${heart(1)}」`); // :3335
          await era.printAndWait(`${target_name}如同性器一样的肛门紧紧的绞紧${player_name}的阴茎，一下下催促着射精。。`); // :3336
          await era.printAndWait(`「嗯噫…咿…啊噫…就这样射出来${heart(1)}…让俺的肛穴染上精液的味道吧${heart(1)}」`); // :3337
          await era.printAndWait(`${target_name}翻着白眼吐出零落的淫语、好像坏掉一样舞动着腰肢………`); // :3338
          if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1) { // :3340
            await era.printAndWait(`「啊啊~…哈咕呜嗯~…小、小穴什么的缝起来就好了${heart(1)}…一、一生都处女肛穴奴隶也不错咿咿呀${heart(1)}」`); // :3340
          } // :3340
        } // :3341
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :3342
        era.set(`cflag:${target}:330`, 6); // :3342

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:330`) <= 4 || era.get('flag:7') == 2)) { // :3344
        if (rand_n(2) == 0) { // :3345
          await era.printAndWait(`${player_name}从${target_name}插着肛门，同时刺激着她的阴蒂。`); // :3346
          if (era.get(`talent:${target}:0`) == 1) { // :3348
            await era.printAndWait(`「啊呜~真是的…这个样子呀…手、手指也好…把处女拿去嘛…啊哈啊～${heart(1)}」`); // :3348
          } // :3348
          await era.printAndWait(`「啊~啊呜呜~…嗯~…嗯咕呜…这、这么温柔的话…啊~啊啊啊嗯~${heart(1)}」`); // :3349
          await era.printAndWait(`${target_name}发出了甜美的叫声、肛门继续被侵犯着。`); // :3350
          await era.printAndWait(`「啊~…啊呜~…啊啊啊啊…屁股没力气了…已、已经…不、不行啦…${heart(1)}」`); // :3351
        } else { // :3352
          await era.printAndWait(`「啊啊~…啊~…啊哈啊～${heart(1)}…主人…喜欢…喜欢${heart(1)}」`); // :3353
          if (era.get(`talent:${target}:110`) == 1) { // :3355
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对巨乳，少女口中不禁漏出了甘甜的喘息声。`); // :3355
          } // :3355
          if (era.get(`talent:${target}:114`) == 1) { // :3357
            await era.printAndWait(`从${target_name}身后像榨乳一样用力揉搓着那对爆乳，少女口中不禁漏出了甘甜的喘息声。`); // :3357
          } // :3357
          await era.printAndWait(`「啊呼呜…胸、胸部被揉着的话…要、要去了呀…啊~${heart(1)} 哦噢！嗯~${heart(1)}」`); // :3358
          await era.printAndWait(`${target_name}发出了甜美的叫声在${player_name}的腰上撒着娇。`); // :3359
          await era.printAndWait(`「嗯呀~…啊啊啊啊…啊哈~${heart(1)}…啊~啊啊啊~${heart(1)}…哈~…哈咿咿${heart(1)}…好…好舒服${heart(1)}」`); // :3360
        } // :3361
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :3362
        era.set(`cflag:${target}:330`, 5); // :3362

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:330`) <= 3 || era.get('flag:7') == 2)) { // :3364
        if (era.get(`talent:${target}:0`) == 1) { // :3366
          await era.printAndWait(`「啊~啊啊啊…这样…只欺负屁股的话…嗯~…啊啊啊~${heart(1)}」`); // :3366
        } // :3366
        await era.printAndWait(`「主人…稍微…温柔一些…啊~…啊哈啊～${heart(1)}」`); // :3367
        await era.printAndWait(`${target_name}被${player_name}从后面抱着，火热的肉棒在肛门里搅动。`); // :3368
        if (era.get(`talent:${target}:110`) == 1) { // :3370
          await era.printAndWait(`${target_name}的巨乳被从身后温柔的抚摸着，发出了甜润的喘息声。`); // :3370
        } // :3370
        if (era.get(`talent:${target}:114`) == 1) { // :3372
          await era.printAndWait(`${target_name}的爆乳被从身后温柔的抚摸着，发出了甜润的喘息声。`); // :3372
        } // :3372
        await era.printAndWait(`「啊啊…哈啊~…啊啊~…再、再…再继续的话哈啊………${heart(1)}」`); // :3373
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :3374
        era.set(`cflag:${target}:330`, 4); // :3374

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:330`) <= 2 || era.get('flag:7') == 2)) { // :3376
        await era.printAndWait(`「啊咕…嗯呀…全、全部进来了呢…啊啊~…啊咿~咦嗯~…去了~♪」`); // :3377
        await era.printAndWait(`${target_name}开发后的肛门轻松地吞入了${player_name}的阴茎，并一下下的吞吐着。`); // :3378
        if (era.get(`talent:${target}:110`) == 1) { // :3380
          await era.printAndWait(`${target_name}的巨乳被从身后温柔的抚摸着，突然发出了煽情的叫声。`); // :3380
        } // :3380
        if (era.get(`talent:${target}:114`) == 1) { // :3382
          await era.printAndWait(`${target_name}的爆乳被从身后温柔的抚摸着，突然发出了煽情的叫声。`); // :3382
        } // :3382
        await era.printAndWait(`「啊噫~…胸、胸部这样子被摸的话…啊~啊啊啊~………」`); // :3383
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :3384
        era.set(`cflag:${target}:330`, 3); // :3384

      } else if (era.get(`cflag:${target}:330`) <= 1 || era.get('flag:7') == 2) { // :3386
        await era.printAndWait(`「啊、啊咕~…好、深…不、不要…」`); // :3387
        await era.printAndWait(`${target_name}的肛门被${player_name}的阴茎无情的蹂躏着………`); // :3388
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :3389
        era.set(`cflag:${target}:330`, 2); // :3389
      } // :3390
      return 0; // :3391
    } // :3392
  } // :3393




  if (era_flag.selectcom == 30) { // :3398

    if (era.get(`cflag:${target}:331`) == 0) { // :3400

      if (era.get(`talent:${target}:76`) == 1) { // :3402
        await era.printAndWait(`「大鸡巴…啊啊…好烫啊…居然那么硬…${heart(1)}」`); // :3403

      } else if (era.get(`talent:${target}:85`) == 1) { // :3405
        await era.printAndWait(`「大鸡巴好热啊~…这个就是要进到我身体里面的东西来的呀…${heart(1)}」`); // :3406

      } else if (era.get(`abl:${target}:16`) >= 3) { // :3408
        await era.printAndWait(`「这、这样子做的话…会、会不会舒服的啊…如、如果舒服的话要说出来噢？」`); // :3409

      } else { // :3411
        await era.printAndWait(`「呜呜…这样的…不要啊…啊啊…感觉好恶心啊………」`); // :3412
      } // :3413
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3414
      era.set(`cflag:${target}:331`, 1); // :3414
      return 0; // :3415

    } else { // :3417

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:331`) <= 6 || era.get('flag:7') == 2)) { // :3419
        if (rand_n(2) == 0) { // :3420
          await era.printAndWait(`「主人的大鸡巴…好烫好大呀~…用俺的手变得更加舒服起来吧~…${heart(1)}」`); // :3421
          await era.printAndWait(`${target_name}将鼻尖伸向阴茎不断地闻着阴茎的味道、慢慢的鼻息变得慌乱起来了。`); // :3422
          await era.printAndWait(`「啊~啊啊啊~…好有味道…好H的味道啊…俺、俺的…脑子要融化掉了~…${heart(1)}」`); // :3423
          if (era.get(`abl:${target}:32`) >= 3) { // :3425
            await era.printAndWait(`「就这样…射出精液的话…俺…就要去了噢~…只是被射了精液而已俺就要去了噢~${heart(1)}」`); // :3425
          } // :3425
        } else { // :3426
          await era.printAndWait(`「哈啊…哈啊…大鸡巴~${heart(1)}…大鸡巴~${heart(1)}…只是触摸一下而已…俺就要去了~${heart(1)}」`); // :3427
          await era.printAndWait(`少女所说的话看起来并不是谎言、${target_name}在用手给阴茎爱抚的同时、不断地摩擦着自己的大腿内侧。`); // :3428
          await era.printAndWait(`「俺想要主人的大鸡巴在俺的手中射出来啊${heart(1)}…接着…俺也会去了的啦~${heart(1)}…啊~啊啊…${heart(1)}」`); // :3429
          if (era.get(`abl:${target}:32`) >= 3) { // :3431
            await era.printAndWait(`「好想要精液…主人的精液~…好想让精液就这样直接射到俺的脸上啊${heart(1)}」`); // :3431
          } // :3431
        } // :3432
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :3433
        era.set(`cflag:${target}:331`, 7); // :3433

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:331`) <= 5 || era.get('flag:7') == 2)) { // :3435
        await era.printAndWait(`「大鸡巴…啊啊…好烫…居然那么硬~…${heart(1)}」`); // :3436
        await era.printAndWait(`${target_name}舔着嘴唇的同时不断撸着阴茎、如果允许她放开干的话很有可能立马就会舔舐起阴茎的样子………`); // :3437
        if (era.get(`abl:${target}:32`) >= 3) { // :3439
          await era.printAndWait(`「精液…好想要啊~…主人的…精液~…精液~…好想要精液啊~${heart(1)}」`); // :3439
        } // :3439
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :3440
        era.set(`cflag:${target}:331`, 6); // :3440

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:331`) <= 4 || era.get('flag:7') == 2)) { // :3442
        if (rand_n(100) >= 50) { // :3443
          await era.printAndWait(`「哈啊~${heart(1)}…哈啊~${heart(1)}…变得舒服起来吧~~、主人~${heart(1)}」`); // :3444
          await era.printAndWait(`${target_name}对给阴茎侍奉的这件事看成她平生至上的喜悦、十分疼爱地摩擦着阴茎。`); // :3445
          await era.printAndWait(`「大鸡巴${heart(1)}…又硬又烫又大的大鸡巴${heart(1)}…好棒啊啊~${heart(1)}…变得舒服起来吧~~…${heart(1)}」`); // :3446
          if (era.get(`abl:${target}:32`) >= 3) { // :3448
            await era.printAndWait(`「为了让主人随时射出来都没有问题所以早就将嘴巴准备好了…往俺的嘴巴里用精液射地满满的吧~${heart(1)}」`); // :3448
          } // :3448
        } else { // :3449
          await era.printAndWait(`「嗯~…黏黏糊糊地液体出来好多了呢~主人~${heart(1)}…这就代表主人现在很舒服对吧~？」`); // :3450
          await era.printAndWait(`${target_name}十分欣喜地微笑着来回舔着嘴唇、将冒出来的前列腺液从龟头开始涂满整个阴茎。`); // :3451
          await era.printAndWait(`「用俺的手…变得…变得更加舒服起来吧~${heart(1)}…全部都射出来吧~${heart(1)}」`); // :3452
          if (era.get(`abl:${target}:32`) >= 3) { // :3454
            await era.printAndWait(`「精液…想要全部都喝下去呢…精液…精液好想要啦~${heart(1)}」`); // :3454
          } // :3454
        } // :3455
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3456
        era.set(`cflag:${target}:331`, 5); // :3456

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:331`) <= 3 || era.get('flag:7') == 2)) { // :3458
        await era.printAndWait(`「大鸡巴好热啊~…${heart(1)} 俺会更加地上下摩擦的啦~${heart(1)}」`); // :3459
        await era.printAndWait(`${target_name}兴奋到口水都留下来的样子、紧紧地抓住阴茎不停地撸着，甚至已经有些疼的程度………`); // :3460
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3461
        era.set(`cflag:${target}:331`, 4); // :3461

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:331`) <= 2 || era.get('flag:7') == 2)) { // :3463
        await era.printAndWait(`「呜、呜嗯…会变得舒服起来的地方…差不多搞懂了呢…」`); // :3464
        await era.printAndWait(`${target_name}好想觉得有些有趣地样子继续地撸着${player_name}的阴茎。`); // :3465
        await era.printAndWait(`「啊~、刚刚跳了一下呢…原来是这呀…这里很舒服来的啊……」`); // :3466
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :3467
        era.set(`cflag:${target}:331`, 3); // :3467

      } else if (era.get(`cflag:${target}:331`) <= 1 || era.get('flag:7') == 2) { // :3469
        await era.printAndWait(`「俺、俺的手被…弄脏了呜…被弄脏了啊………」`); // :3470
        await era.printAndWait(`一副打从心底里厌恶的样子的${target_name}还是按照命令那样不断地用她的小手上下地摩擦着阴茎………`); // :3471
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :3472
        era.set(`cflag:${target}:331`, 2); // :3472
      } // :3473
      return 0; // :3474
    } // :3475
  } // :3476




  if (era_flag.selectcom == 31) { // :3481

    if (era.get(`cflag:${target}:332`) == 0) { // :3483

      if (era.get(`talent:${target}:76`) == 1) { // :3485
        await era.printAndWait(`「啊啊嗯~…能用嘴巴来侍奉主人的大鸡巴真是好高兴啊~${heart(1)}」`); // :3486
        await era.printAndWait(`${target_name}毫不犹豫地将${player_name}的阴茎含进了嘴巴十分高兴地舔舐了起来………`); // :3487

      } else if (era.get(`talent:${target}:85`) == 1) { // :3489
        await era.printAndWait(`「主人的…大鸡巴…${heart(1)} 啊啊嗯~…嗯~…啊呜…嗯哼唔…${heart(1)}」`); // :3490
        await era.printAndWait(`${target_name}十分下流地用嘴巴亲吻了阴茎前端不知道多少次后便含进去了………`); // :3491

      } else if (era.get(`abl:${target}:16`) >= 3) { // :3493
        await era.printAndWait(`「只、只要用嘴巴…就可以了对吧…啊~啊嗯~…嗯~…嗯~…啾~…啾唔~………」`); // :3494
        await era.printAndWait(`${target_name}小心翼翼的把阴茎含在嘴里、舔了起来………`); // :3495

      } else { // :3497
        await era.printAndWait(`「明…明白了啦…只、只要用嘴巴来就可以了对吧…这样的…才、才没有什么问题的啦…」`); // :3498
        await era.printAndWait(`${target_name}皱着眉头一副十分胆怯的样子舔起了阴茎………`); // :3499
      } // :3500
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :3501
      era.set(`cflag:${target}:332`, 1); // :3501
      return 0; // :3502

    } else { // :3504

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:332`) <= 4 || era.get('flag:7') == 2)) { // :3506
        if (rand_n(3) == 0) { // :3507
          await era.printAndWait(`「嗯唔呜嗯~…嗯啾呜…啾呜呜~${heart(1)}…大鸡巴…最喜欢了…大鸡巴最喜欢了噢~${heart(1)}」`); // :3508
          await era.printAndWait(`${target_name}说着卑劣的话语的同时来回进行着。`); // :3509
          await era.printAndWait(`「好像就这样吮吸主人的大鸡巴啊…让俺一直吮吸主人的大鸡巴吧~…${heart(1)}」`); // :3510
        } else if (rand_n(2) == 0) { // :3511
          await era.printAndWait(`「嗯啊啊~…嗯唔~…嗯啾~…啾~啾唔~…哼啊啊啊…好像更加激烈地吮吸大鸡巴啊~…${heart(1)}」`); // :3512
          await era.printAndWait(`${target_name}眼角浮出眼泪的同时用舌头缠绕着阴茎、炽热的吐息吹向了。`); // :3513
          await era.printAndWait(`「用嘴白来侍奉大鸡巴好舒服啊~${heart(1)} 俺会更加更加积极地吮吸大鸡巴噢~…呸咯~…${heart(1)}」`); // :3514
        } else { // :3515
          await era.printAndWait(`${target_name}用嘴唇含着阴茎前端的同时向上仰视着${player_name}、看来是想要看到这边的反应的样子。`); // :3516
          await era.printAndWait(`「嗯啾~…啾唔${heart(1)}…嗯哼哼…呸咯…啾~呸咯~…噗哈~…主人~…发出更厉害的声音出来嘛~…${heart(1)}」`); // :3517
          await era.printAndWait(`「只要看到主人的眼睛就可以知道主人舒不舒服了噢？嗯哼哼~ …啾~啾啪~${heart(1)}…呸咯~…嗯~${heart(1)}」`); // :3518
        } // :3519
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3520
        era.set(`cflag:${target}:332`, 5); // :3520

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:332`) <= 3 || era.get('flag:7') == 2)) { // :3522
        if (rand_n(3) == 0) { // :3523
          await era.printAndWait(`「主人的大鸡巴~${heart(1)}…真美妙呢~…${heart(1)}」`); // :3524
          await era.printAndWait(`${target_name}十分有感觉地轻轻喘息着的同时积极地将阴茎含进了口中。`); // :3525
          await era.printAndWait(`「嗯呜~…嗯~嗯~${heart(1)}…啾~…啾噗~呸咯哦~…嗯~嗯噗呜${heart(1)}…舒服啦？啾~…啾呜呜~${heart(1)}」`); // :3526
        } else if (rand_n(2) == 0) { // :3527
          await era.printAndWait(`「好喜欢大鸡巴…能侍奉那么雄伟的大鸡巴真是好幸福呢~………${heart(1)}」`); // :3528
          await era.printAndWait(`${target_name}一脸恍惚地样子进行起了口腔奉仕、小小的嘴巴张得大大地将阴茎含进去用舌头缠绕上去了。`); // :3529
          await era.printAndWait(`「嗯啾~${heart(1)}…啾~…呸咯…呸咯~…嗯哼唔${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`); // :3530
        } else { // :3531
          await era.printAndWait(`「嗯啊啊…${heart(1)} 好喜欢啊~…主人的大鸡巴~${heart(1)}」`); // :3532
          await era.printAndWait(`${target_name}十分下流得将嘴巴张开，把舌头伸了出来开始舔了起来。`); // :3533
          await era.printAndWait(`「啊~啊~…大鸡巴~${heart(1)}…好棒啊…俺会更加地侍奉主人的~…${heart(1)}」`); // :3534
        } // :3535
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3536
        era.set(`cflag:${target}:332`, 4); // :3536

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:332`) <= 2 || era.get('flag:7') == 2)) { // :3538
        await era.printAndWait(`「用、用俺的嘴巴来…弄干净吧…啊啊~…嗯~…嗯啾…啾唔~…呸咯~…嗯唔………」`); // :3539
        await era.printAndWait(`${target_name}的小嘴长得大大的十分积极地舔舐着阴茎………`); // :3540
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3541
        era.set(`cflag:${target}:332`, 3); // :3541

      } else if (era.get(`cflag:${target}:332`) <= 1 || era.get('flag:7') == 2) { // :3543
        await era.printAndWait(`「啊呜~…嗯~…嗯~…嗯啾…呸咯~…嗯~…嗯啊…哈啊…哈啊………」`); // :3544
        await era.printAndWait(`${target_name}并不是很积极地在舔的样子………`); // :3545
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3546
        era.set(`cflag:${target}:332`, 2); // :3546
      } // :3547
      return 0; // :3548
    } // :3549
  } // :3550




  if (era_flag.selectcom == 32) { // :3555

    if (era.get(`cflag:${target}:333`) == 0) { // :3557

      if (era.get(`talent:${target}:76`) == 1) { // :3559
        await era.printAndWait(`「啊嗯~…胸部在被抽插着呢~…${heart(1)} 就这样将胸部侵犯了吧~${heart(1)}」`); // :3560
        await era.printAndWait(`${target_name}露出了一副淫乱的笑容开始侍奉起了阴茎。`); // :3561
        if (era.get(`talent:${target}:110`) == 1) { // :3563
          await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3563
        } // :3563
        if (era.get(`talent:${target}:114`) == 1) { // :3565
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3565
        } // :3565

      } else if (era.get(`talent:${target}:85`) == 1) { // :3567
        await era.printAndWait(`「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…${heart(1)}」`); // :3568
        await era.printAndWait(`${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`); // :3569
        if (era.get(`talent:${target}:110`) == 1) { // :3571
          await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3571
        } // :3571
        if (era.get(`talent:${target}:114`) == 1) { // :3573
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3573
        } // :3573

      } else if (era.get(`abl:${target}:16`) >= 3) { // :3575
        await era.printAndWait(`「嗯~…啊呜…大鸡巴…好烫…啊~…」`); // :3576
        await era.printAndWait(`${target_name}对着被胸部夹着的阴茎兴奋起来了。`); // :3577
        if (era.get(`talent:${target}:110`) == 1) { // :3579
          await era.printAndWait(`少女温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3579
        } // :3579
        if (era.get(`talent:${target}:114`) == 1) { // :3581
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3581
        } // :3581

      } else { // :3583
        await era.printAndWait(`「这样的…感觉好恶心啊………」`); // :3584
        if (era.get(`talent:${target}:110`) == 1) { // :3586
          await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3586
        } // :3586
        if (era.get(`talent:${target}:114`) == 1) { // :3588
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3588
        } // :3588
      } // :3589
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :3590
      era.set(`cflag:${target}:333`, 1); // :3590
      return 0; // :3591

    } else { // :3593

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:332`) <= 6 || era.get('flag:7') == 2)) { // :3595
        if (rand_n(2) == 0) { // :3596
          await era.printAndWait(`「用胸部来侍奉好舒服啊~…${heart(1)}」`); // :3597
          await era.printAndWait(`「俺的胸部…正在被主人的大鸡巴来回抽插着呢${heart(1)}」`); // :3598
          await era.printAndWait(`${target_name}一脸淫笑地对着阴茎进行着侍奉。`); // :3599
          if (era.get(`talent:${target}:110`) == 1) { // :3601
            await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3601
          } // :3601
          if (era.get(`talent:${target}:114`) == 1) { // :3603
            await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3603
          } // :3603
        } else { // :3604
          await era.printAndWait(`「胸部是主人的东西来的啦…所以更加激烈地侵犯也可以噢~${heart(1)}」`); // :3605
          await era.printAndWait(`「哈嗯~…乳头在被来来回回地摩擦着呢啊呜~${heart(1)}」`); // :3606
          await era.printAndWait(`${target_name}一脸淫笑地对着阴茎进行着侍奉。`); // :3607
          if (era.get(`talent:${target}:110`) == 1) { // :3609
            await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3609
          } // :3609
          if (era.get(`talent:${target}:114`) == 1) { // :3611
            await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3611
          } // :3611
        } // :3612
        // CFLAG:333  = 7（变量语义：CFLAG 族，333） // :3613
        era.set(`cflag:${target}:333`, 7); // :3613

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:332`) <= 5 || era.get('flag:7') == 2)) { // :3615
        await era.printAndWait(`「嗯~…嗯哼唔…就这样侵犯着俺的胸部吧~～${heart(1)}」`); // :3616
        await era.printAndWait(`${target_name}一脸淫笑地对着阴茎进行着侍奉。`); // :3617
        if (era.get(`talent:${target}:110`) == 1) { // :3619
          await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3619
        } // :3619
        if (era.get(`talent:${target}:114`) == 1) { // :3621
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3621
        } // :3621
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :3622
        era.set(`cflag:${target}:333`, 6); // :3622

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:333`) <= 3 || era.get('flag:7') == 2)) { // :3624
        if (rand_n(2) == 0) { // :3625
          await era.printAndWait(`「大鸡巴…用俺的胸部变得舒服起来吧~…${heart(1)}」`); // :3626
          await era.printAndWait(`「主人啊嗯~…俺会…用尽全力来侍奉的啦~…啊~…啊啊~${heart(1)}」`); // :3627
          await era.printAndWait(`${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`); // :3628
          if (era.get(`talent:${target}:110`) == 1) { // :3630
            await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3630
          } // :3630
          if (era.get(`talent:${target}:114`) == 1) { // :3632
            await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3632
          } // :3632
        } else { // :3633
          await era.printAndWait(`「主人的大鸡巴…真美妙呢~…${heart(1)}」`); // :3634
          await era.printAndWait(`「哈啊啊嗯~…俺、俺的胸部是不是很舒服呀…？变得更加舒服起来吧~…${heart(1)}」`); // :3635
          await era.printAndWait(`${target_name}十分欣喜的微笑着，继续对着阴茎进行着侍奉。`); // :3636
          if (era.get(`talent:${target}:110`) == 1) { // :3638
            await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3638
          } // :3638
          if (era.get(`talent:${target}:114`) == 1) { // :3640
            await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3640
          } // :3640
        } // :3641
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :3642
        era.set(`cflag:${target}:333`, 4); // :3642

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:333`) <= 2 || era.get('flag:7') == 2)) { // :3644
        await era.printAndWait(`「嗯~…啊呜…大鸡巴…好烫…啊~…」`); // :3645
        await era.printAndWait(`${target_name}对着被胸部夹着的阴茎兴奋起来了。`); // :3646
        if (era.get(`talent:${target}:110`) == 1) { // :3648
          await era.printAndWait(`${target_name}温柔地把巨乳压向阴茎而完全将阴茎包裹住了………`); // :3648
        } // :3648
        if (era.get(`talent:${target}:114`) == 1) { // :3650
          await era.printAndWait(`${target_name}温柔地把完全不平衡地巨大化的乳房压向阴茎而完全将阴茎包裹住了………`); // :3650
        } // :3650
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :3651
        era.set(`cflag:${target}:333`, 3); // :3651

      } else if (era.get(`cflag:${target}:333`) <= 1 || era.get('flag:7') == 2) { // :3653
        await era.printAndWait(`「胸部…在被侵犯着…不要啊…~………」`); // :3654
        if (era.get(`talent:${target}:110`) == 1) { // :3656
          await era.printAndWait(`${target_name}用这巨大化的乳房侍奉着………`); // :3656
        } // :3656
        if (era.get(`talent:${target}:114`) == 1) { // :3658
          await era.printAndWait(`${target_name}用温柔地把完全不平衡地巨大化的乳房侍奉着………………`); // :3658
        } // :3658
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :3659
        era.set(`cflag:${target}:333`, 2); // :3659
      } // :3660
      return 0; // :3661
    } // :3662
  } // :3663




  if (era_flag.selectcom == 33) { // :3668

    if (era.get(`cflag:${target}:334`) == 0) { // :3670

      if (era.get(`talent:${target}:76`) == 1) { // :3672
        await era.printAndWait(`「哈啊~…请、请不要捉弄俺啦~…主人啊嗯~………${heart(1)}」`); // :3673
        await era.printAndWait(`${target_name}用舌头舔着嘴唇的同时摩擦着股间………`); // :3674

      } else if (era.get(`talent:${target}:85`) == 1) { // :3676
        await era.printAndWait(`「啊啊~…嗯啊啊~…大鸡巴好热啊~…变得奇怪起来了啊~${heart(1)}」`); // :3677
        await era.printAndWait(`${target_name}好像十分羞耻的样子，缓慢地摩擦着股间………`); // :3678

      } else { // :3680
        await era.printAndWait(`「啊啊…哈啊…哈啊…这、这样的…这样的好羞耻啊………！」`); // :3681
        await era.printAndWait(`${target_name}脸变得通红的情况下继续进行着素股play………`); // :3682
      } // :3683
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :3684
      era.set(`cflag:${target}:334`, 1); // :3684
      return 0; // :3685

    } else { // :3687

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:0`) == 1 && (era.get(`cflag:${target}:334`) <= 5 || era.get('flag:7') == 2)) { // :3689
        await era.printAndWait(`「哈啊~…请、请不要捉弄俺啦~…主人~………${heart(1)}」`); // :3690
        await era.printAndWait(`${target_name}从嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。`); // :3691
        await era.printAndWait(`「就这样…哈~…进来吧~…大、大鸡巴…好想要啊${heart(1)} 收下俺的处女嘛~${heart(1)}」`); // :3692
        await era.printAndWait(`${target_name}每次要想插进去而想要将腰对准的时候都被紧紧着抓住了腰部继续着素股play。`); // :3693
        await era.printAndWait(`「差、差不多就好了啦…再这样下去的话等下俺就要强行侵犯主人了啦…啊~…啊啊啊嗯~${heart(1)}」`); // :3694
        // CFLAG:334  = 7（变量语义：CFLAG 族，334） // :3695
        era.set(`cflag:${target}:334`, 7); // :3695

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:334`) <= 4 || era.get('flag:7') == 2)) { // :3697
        await era.printAndWait(`「啊~啊哈啊~${heart(1)}…请、请不要捉弄俺啦~…主人~………${heart(1)}」`); // :3698
        await era.printAndWait(`${target_name}嘴边漏出娇喘声的同时摩擦着股间、好像很舒服的样子颤动着腰部。`); // :3699
        await era.printAndWait(`「嗯~…啊嗯~…啊啊啊~…大鸡巴好热啊…要变奇怪起来了呜~${heart(1)}…要变奇怪起来了啦~…${heart(1)}」`); // :3700
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :3701
        era.set(`cflag:${target}:334`, 6); // :3701

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`talent:${target}:0`) == 1 && (era.get(`cflag:${target}:334`) <= 3 || era.get('flag:7') == 2)) { // :3703
        await era.printAndWait(`「啊啊~…嗯啊啊…大鸡巴好热啊~…感觉要变奇怪了啊~${heart(1)}」`); // :3704
        await era.printAndWait(`${target_name}将腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`); // :3705
        await era.printAndWait(`「主、主人…如果要将精液射出来的话…就、就在俺的里面…射、射出来…射出来吧…${heart(1)}」`); // :3706
        await era.printAndWait(`${target_name}一脸想要哭出来，不像样子的表情看着${player_name}。`); // :3707
        await era.printAndWait(`「就这样夺走俺的处女吧…拜托了嘛~…${heart(1)}」`); // :3708
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :3709
        era.set(`cflag:${target}:334`, 5); // :3709

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:334`) <= 2 || era.get('flag:7') == 2)) { // :3711
        await era.printAndWait(`「啊啊~…嗯啊啊…大鸡巴好热啊…感觉要变奇怪起来了啊~${heart(1)}」`); // :3712
        await era.printAndWait(`${target_name}将腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`); // :3713
        await era.printAndWait(`「哈啊…啊呜~${heart(1)}…主人~${heart(1)}…好想要…大鸡巴啊~${heart(1)}…只是素股的话完全满足不了啊~${heart(1)}」`); // :3714
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :3715
        era.set(`cflag:${target}:334`, 4); // :3715

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:334`) <= 2 || era.get('flag:7') == 2)) { // :3717
        await era.printAndWait(`「啊嗯~…哈啊哈啊…摩、摩擦起来后…很舒服吗…？」`); // :3718
        await era.printAndWait(`${target_name}好像已经习惯了的样子、腰十分下流的晃动着的同时用阴唇摩擦着${player_name}的阴茎。`); // :3719
        await era.printAndWait(`「嗯~…啊啊~…哈呜呜~…俺、俺也…变了舒服起来了啊………」`); // :3720
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :3721
        era.set(`cflag:${target}:334`, 3); // :3721

      } else if (era.get(`cflag:${target}:334`) <= 1 || era.get('flag:7') == 2) { // :3723
        await era.printAndWait(`「啊啊…哈啊…哈啊…这、这样的…好羞耻啊~………！」`); // :3724
        await era.printAndWait(`${target_name}脸变得通红的情况下用阴唇摩擦着………`); // :3725
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :3726
        era.set(`cflag:${target}:334`, 2); // :3726
      } // :3727
      return 0; // :3728
    } // :3729
  } // :3730




  if (era_flag.selectcom == 34) { // :3735
    if (era.get(`cflag:${target}:335`) == 0) { // :3736

      if (era.get(`talent:${target}:0`) == 1) { // :3738

        if (era.get(`talent:${target}:76`) == 1) { // :3740

          if (era_flag.assi > 0 && era_flag.assiplay) { // :3742
            await era.printAndWait(`收到命令后很高兴的放空了腰腿的力量、助手的肉棒一下子把${target_name}的处女象征贯穿了。`); // :3743

          } else if (era.get(`talent:${target}:314`) == 9) { // :3745
            await era.printAndWait(`「啊哈…主人大的…连、最里面都…啊、啊啊啊啊啊${heart(1)}」`); // :3746
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`); // :3747
            await era.printAndWait(`「主人~…啊啊…魔王大人…连起来了~…和魔王大人用肉棒连起来了呢${heart(1)}」`); // :3748
            await era.printAndWait(`因为更加紧密的肉体链接、${player_name}和${target_name}之间的魔力循环变得愈加明显了。`); // :3749
            await era.printAndWait(`「啊啊~…魔王大人~…啊~哈啊啊…呀${heart(1)}…啊啊~…腰…自己动起来惹${heart(1)}…想要魔王大人的鸡巴所以自己动起来惹${heart(1)}」`); // :3750
            await era.printAndWait(`完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，扭动着腰肢在${player_name}身上驰骋起来………`); // :3751

          } else { // :3753
            await era.printAndWait(`「啊啊~…啊~…哈呜…${heart(1)} 进、进来了呜…全部进来了哟…${heart(1)}」`); // :3754
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、初次结合的喜悦让少女露出了笑容。`); // :3755
            await era.printAndWait(`「哈啊~…哈啊~…主人大人的大肉棒${heart(1)}…已经变成俺的东西了哟${heart(1)}…啊~…啊啊~…好高兴${heart(1)}」`); // :3756
            await era.printAndWait(`看到${target_name}那感动至极的表情、${player_name}的恶作剧之心不禁沸腾了起来。`); // :3757
            await era.printAndWait(`「咿呀！啊~唏呀！干、干什么…还、还在慢慢适应中呢${heart(1)} 突、突然插进来、不、不行…不行啦~${heart(1)}」`); // :3758
          } // :3759

        } else if (era.get(`talent:${target}:85`) == 1) { // :3761

          if (era_flag.assi > 0 && era_flag.assiplay) { // :3763
            await era.printAndWait(`收到命令后面露悲戚地放空了腰腿的力量、助手的肉棒一下子把${target_name}的处女象征贯穿了。`); // :3764

          } else if (era.get(`talent:${target}:314`) == 9) { // :3766
            await era.printAndWait(`「嗯~…没关系呢~…这种程度…完全、不在意啦…呜啊…啊~哈呜…！」`); // :3767
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`); // :3768
            await era.printAndWait(`「啊~啊啊啊啊~…魔王大人的大肉棒…全部…插进里面啦…啊啊…好幸福${heart(1)}」`); // :3769
            await era.printAndWait(`${target_name}两手捧着脸颊、开心地扭来扭去。`); // :3770
            await era.printAndWait(`「魔王大人的魔力…大股的流进来了…啊哈${heart(1)}…啊啊~…啊啊啊~${heart(1)}」`); // :3771
            await era.printAndWait(`完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，用小穴吞吐着${player_name}的肉棒………`); // :3772

          } else { // :3774
            await era.printAndWait(`「啊~…啊啊~哈啊………全、全部插进来啦…${heart(1)}」`); // :3775
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。`); // :3776
            await era.printAndWait(`「哈啊…哈啊…俺、俺…这样一来就完全变成、主人的东西了唷…啊~…啊啊啊嗯${heart(1)}」`); // :3777
            await era.printAndWait(`${player_name}被少女可爱的（努力）姿态打动，温柔的抱紧了她。`); // :3778
            await era.printAndWait(`「主人…稍微再这样一会…只、只要再稍稍一下就好…感觉很温暖呢…${heart(1)}」`); // :3779
            await era.printAndWait(`抱着${target_name}手臂抬了起来，轻轻擦掉了少女眼角的泪珠、一遍又一遍的抚摸着她的头………`); // :3780
          } // :3781

        } else { // :3783

          if (era_flag.assi > 0 && era_flag.assiplay) { // :3785
            await era.printAndWait(`被${master_name}按住肩膀、哭叫不止的${target_name}被助手侵犯了………`); // :3786

          } else if (era.get(`talent:${target}:314`) == 9) { // :3788
            await era.printAndWait(`「啊啊~哈啊啊…啊、啊啊啊…俺、俺…这样子…啊啊~！」`); // :3789
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、背上的翅膀竭力的伸展着。`); // :3790
            await era.printAndWait(`「好、好痛…魔王大人…啊啊~…请、请放过………啊、啊呜！？」`); // :3791
            await era.printAndWait(`${player_name}向${target_name}连接的部分直接输入魔力。${target_name}的眼神渐渐变得湿润了。`); // :3792
            await era.printAndWait(`「魔王大人的魔力…大股的流进来了呢…哈啊~${heart(1)}…啊啊~…哈嗯${heart(1)}」`); // :3793
            await era.printAndWait(`完全成为了${player_name}之物的魔族少女带着愉悦的泪痕，用小穴吞吐着${player_name}的肉棒………`); // :3794
          } else { // :3795
            await era.printAndWait(`「嗯哈~哈啊啊…啊、啊啊~…俺、俺…这样子…啊啊~！」`); // :3796
            await era.printAndWait(`${target_name}忍耐着疼痛慢慢放下了腰、破瓜的疼痛让她的眉头蹙成了一团。`); // :3797
            await era.printAndWait(`「好、好痛…主人…啊啊~…请、请原谅呜………」`); // :3798
          } // :3799
        } // :3800

      } else { // :3802

        if (era.get(`talent:${target}:76`) == 1) { // :3804
          await era.printAndWait(`「哈啊…哈啊…啊嗯~…哈啊啊~…主人…啊~啊啊啊…啊啊啊~${heart(1)}」`); // :3805
          await era.printAndWait(`${target_name}带着愉悦的表情在${player_name}身上舞动着腰肢………`); // :3806

        } else if (era.get(`talent:${target}:85`) == 1) { // :3808
          await era.printAndWait(`「啊~…啊呜呜~…好、好厉害嗯…肚子里面…主人的鸡巴好大…${heart(1)}」`); // :3809
          await era.printAndWait(`${target_name}怜爱的抚摸着自己小腹上因为吞掉${player_name}的鸡巴而凸起的部分………`); // :3810

        } else { // :3812
          await era.printAndWait(`「啊啊~…这样子…很~…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰犯规啦！」`); // :3813
          await era.printAndWait(`${target_name}被连续的突刺着，发出了悲鸣………`); // :3814
        } // :3815
      } // :3816
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :3817
      era.set(`cflag:${target}:335`, 1); // :3817
      return 0; // :3818

    } else { // :3820

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:335`) <= 5 || era.get('flag:7') == 2)) { // :3822
        if (rand_n(4) == 0) { // :3823
          if (era.get(`talent:${target}:314`) == 9) { // :3825
            await era.printAndWait(`${target_name}每当被从下面抽插时就不禁张开翅膀发出娇喊。`); // :3825
          } // :3825
          await era.printAndWait(`「啊啊嗯~…啊~啊呜~…哈啊啊嗯${heart(1)}…啊唏噫！…深…插太深了…要、要坏了呃呃呃${heart(1)}」`); // :3826
          await era.printAndWait(`${target_name}大幅度的反仰着背部发出了娇喘。而${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`); // :3827
          await era.printAndWait(`「弄坏吧${heart(1)}…把俺弄坏掉吧${heart(1)}…主人啊啊~${heart(1)}…啊啊~…啊啊~…嗯~…嗯啊啊啊~啊~噫嘿${heart(1)}」`); // :3828
        } else if (rand_n(3) == 0) { // :3829
          if (era.get(`talent:${target}:314`) == 9) { // :3831
            await era.printAndWait(`青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。`); // :3831
          } // :3831
          await era.printAndWait(`「主人啊…啊啊~…喜欢…鸡巴好喜欢${heart(1)}…最喜欢大鸡巴${heart(1)}…啊啊~啊~${heart(1)}…啊哈啊啊~${heart(1)}」`); // :3832
          await era.printAndWait(`${target_name}跨坐在${player_name}激烈的上下起伏着，享受着用小穴吞吐鸡巴的快感。`); // :3833
          await era.printAndWait(`「啊啊~…鸡巴最高~${heart(1)}…最棒了！${heart(1)}…一辈子这样插着鸡巴就好了${heart(1)}」`); // :3834
        } else if (rand_n(2) == 0) { // :3835
          await era.printAndWait(`「啊哈~啊啊~…哈啊嗯~…再继续向上插进来${heart(1)}…啊啊~${heart(1)}…俺、俺要飞掉啦呜呜呜~${heart(1)}」`); // :3836
          await era.printAndWait(`${target_name}随着${player_name}的抽插快乐的大喊着。`); // :3837
          await era.printAndWait(`「啊啊~${heart(1)}…咕唔…啊咿…俺的子宫被大鸡巴插进去了${heart(1)}…要对主人的鸡巴着迷了${heart(1)}」`); // :3838
          if (era.get(`talent:${target}:314`) == 9) { // :3840
            await era.printAndWait(`${target_name}的魔族之眼闪闪发光，随着${player_name}的动作一下一下的娇喘着………`); // :3840
          } // :3840
        } else { // :3841
          await era.printAndWait(`「啊~啊啊啊~…啊哈啊…主人啊啊…大鸡巴好舒服…${heart(1)} 最喜欢鸡巴了${heart(1)}」`); // :3842
          await era.printAndWait(`${target_name}自己动着腰、献媚似的雪雪娇呼着。`); // :3843
          if (era.get(`talent:${target}:314`) == 9) { // :3845
            await era.printAndWait(`身负双翼的少女十分享受叹了口气。`); // :3845
          } // :3845
          await era.printAndWait(`「啊哈啊…啊啊~…啊啊啊嗯${heart(1)} 就这样…在俺的小穴里面射出一大堆吧…${heart(1)}」`); // :3846
          await era.printAndWait(`像熟练妓女一样扭动着腰肢的少女露出了淫猥的笑容………`); // :3847
        } // :3848
        // CFLAG:335  = 8（变量语义：CFLAG 族，335） // :3849
        era.set(`cflag:${target}:335`, 8); // :3849

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:335`) <= 5 || era.get('flag:7') == 2)) { // :3851
        await era.printAndWait(`「啊嘿呀啊～${heart(1)}…嗯~…啊啊哈啊~${heart(1)}…啊啊嗯~！」`); // :3852
        await era.printAndWait(`${target_name}腰部的动作还有些青涩、偶尔还会蹙蹙眉头，露出一丝苦色。`); // :3853
        await era.printAndWait(`「啊啊啊~…主人…一起变得更加舒服吧…啊~啊啊啊~${heart(1)}」`); // :3854
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :3855
        era.set(`cflag:${target}:335`, 7); // :3855

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:335`) <= 4 || era.get('flag:7') == 2)) { // :3857
        if (rand_n(4) == 0) { // :3858
          if (era.get(`talent:${target}:314`) == 9) { // :3860
            await era.printAndWait(`${target_name}每当被从下面抽插时就不禁张开翅膀发出娇喊。`); // :3860
          } // :3860
          await era.printAndWait(`「啊啊~${heart(1)}…啊呜~…呜呜呜~…噫呀啊啊啊~${heart(1)}…已、已经去了了了${heart(1)}」`); // :3861
          await era.printAndWait(`${target_name}大幅度的反仰着背部发出了娇喘。而${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`); // :3862
          await era.printAndWait(`「更…更激烈的话哈啊${heart(1)}…啊~…啊啊啊~…放货咱（放过俺）${heart(1)}…放货咱啦（放过俺吧）${heart(1)}…啊啊~哎嘿呀${heart(1)}」`); // :3863
        } else if (rand_n(3) == 0) { // :3864
          if (era.get(`talent:${target}:314`) == 9) { // :3866
            await era.printAndWait(`青色的肌肤上一粒粒的汗珠冒了出来、散发着淫靡的香气。`); // :3866
          } // :3866
          await era.printAndWait(`「嗯~…啊啊~…喜欢喜欢${heart(1)}…最喜欢了哦${heart(1)}…主人啊${heart(1)}」`); // :3867
          await era.printAndWait(`${target_name}趴在${master_name}身上，轻轻舔吻着、自己上下摆动着腰臀。`); // :3868
          await era.printAndWait(`「嗯啾…啾…啊哈啊…哈啊…啊呜呜嗯~${heart(1)}…好棒~…大鸡巴进到好深的地方来了${heart(1)}」`); // :3869
        } else if (rand_n(2) == 0) { // :3870
          await era.printAndWait(`「啊啊~…嗯~…啊~啊啊~…主人${heart(1)}…更多${heart(1)}…更多的插进来…${heart(1)}」`); // :3871
          await era.printAndWait(`${target_name}随着${player_name}的抽插快乐的大喊着。`); // :3872
          await era.printAndWait(`「最…最里面都被插入了哟…俺的肚子里面也成为主人的东西了呢${heart(1)}」`); // :3873
          if (era.get(`talent:${target}:314`) == 9) { // :3875
            await era.printAndWait(`${target_name}的魔族之眼闪闪发光，随着${player_name}的动作一下一下的娇喘着………`); // :3875
          } // :3875
        } else { // :3876
          await era.printAndWait(`「啊~…啊哈啊~…啊啊啊~…咿呀呜呜~…${heart(1)} 啊啊~主人~好棒~…好…棒${heart(1)}」`); // :3877
          await era.printAndWait(`${target_name}自己扭动着腰肢，想要掩饰羞涩一样大声娇呼着。`); // :3878
          if (era.get(`talent:${target}:314`) == 9) { // :3880
            await era.printAndWait(`身负双翼的少女十分享受叹了口气。`); // :3880
          } // :3880
          await era.printAndWait(`「呼唔…啊哈啊啊啊~${heart(1)}…主人…在俺的小穴里面射出一大堆吧…${heart(1)}」`); // :3881
        } // :3882
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3883
        era.set(`cflag:${target}:335`, 6); // :3883

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:335`) <= 4 || era.get('flag:7') == 2)) { // :3885
        await era.printAndWait(`「啊~…啊啊~${heart(1)}…嗯~…啊啊哈啊~${heart(1)}…嗯~！」`); // :3886
        await era.printAndWait(`${target_name}生硬的扭着腰肢、蹙着眉头，露出一丝苦色。`); // :3887
        await era.printAndWait(`「主人…对、对不起…还、稍微有点难受…嗯~嗯嗯~！」`); // :3888
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3889
        era.set(`cflag:${target}:335`, 5); // :3889

      } else if (era.get(`mark:${target}:2`) == 3 && era.get(`abl:${target}:2`) >= 3 && (era.get(`cflag:${target}:335`) <= 3 || era.get('flag:7') == 2)) { // :3891
        if (rand_n(3) == 0) { // :3892
          await era.printAndWait(`「嗯~…啊啊啊~…哈呜~…！好舒服…好…棒呢…♪」`); // :3893
          await era.printAndWait(`${target_name}熟练地用腰吞贪取着快乐。`); // :3894
          await era.printAndWait(`「主人的东西…在深处动着…啊~啊啊啊~…啊哈啊～♪」`); // :3895
        } else if (rand_n(2) == 0) { // :3896
          await era.printAndWait(`「呀~…呀啊~…这样被抽查的话…唏啊！…啊噫…！」`); // :3897
          await era.printAndWait(`${player_name}如同不让她逃掉一样将其双手抓住就这样紧追不舍地发起了进攻。`); // :3898
          await era.printAndWait(`「啊~…啊啊啊~…呀啊~…俺、俺…要…要去…要去…啊哈啊啊~♪」`); // :3899
        } else { // :3900
          await era.printAndWait(`「啊~…啊啊~…哈啊…哈啊…嗯~…！腰、腰它…擅自动起来惹…啊~♪啊啊~♪」`); // :3901
          await era.printAndWait(`${target_name}一边扭动着腰肢一边发出了叹息。`); // :3902
          await era.printAndWait(`「啊啊~…俺、俺的肚子里…主人的子种汁满满的出来了………」`); // :3903
        } // :3904
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :3905
        era.set(`cflag:${target}:335`, 4); // :3905

      } else if (era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:335`) <= 2 || era.get('flag:7') == 2)) { // :3907
        await era.printAndWait(`「嗯~…啊啊~…哈啊…哈啊…嗯~…会好好…动、动起来的…的说…啊~啊啊~…！」`); // :3908
        await era.printAndWait(`${target_name}一边扭动着腰肢一边发出了叹息。`); // :3909
        await era.printAndWait(`「啊啊~…俺、俺的肚子里…主人的好多……」`); // :3910
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :3911
        era.set(`cflag:${target}:335`, 3); // :3911

      } else if (era.get(`cflag:${target}:335`) <= 1 || era.get('flag:7') == 2) { // :3913
        await era.printAndWait(`「啊啊~…这样的姿势…很…很羞耻啦…啊~咿呀…啊呜呜~！突、突然顶腰不行！」`); // :3914
        await era.printAndWait(`${target_name}被抽插着发出了悲鸣。`); // :3915
        await era.printAndWait(`「噫~…咕…啊啊~…停、停下啊…啊~…啊咕唔！」`); // :3916
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :3917
        era.set(`cflag:${target}:335`, 2); // :3917
      } // :3918
      return 0; // :3919
    } // :3920
  } // :3921




  if (era_flag.selectcom == 35) { // :3926

    if (era.get(`cflag:${target}:336`) == 0) { // :3928

      if (era.get(`abl:${target}:16`) >= 3) { // :3930
        await era.printAndWait(`「唔哇啊~…用那么昂贵的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢...？」`); // :3931
        await era.printAndWait(`${target_name}下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。`); // :3932
        await era.printAndWait(`「俺会…帮主人将身体弄得干干净净的…」`); // :3933
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3935
          await era.printAndWait(`「俺会用俺大大胸部来帮您洗澡噢~…啊啊~…胸部要被压坏了呜~…」`); // :3935
        } // :3935

      } else { // :3937
        await era.printAndWait(`「唔哇啊~…用那么漂亮的澡堂洗澡也没问题啊…啊、嗯、嗯~、那么俺用肥皂帮您擦身了噢...？」`); // :3938
        await era.printAndWait(`${target_name}下意识觉得为什么要那么奢侈而迷惑地同时开始了侍奉。`); // :3939
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3941
          await era.printAndWait(`「哈啊…啊啊啊…胸部要被压坏了呜~………」`); // :3941
        } // :3941
      } // :3942
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :3943
      era.set(`cflag:${target}:336`, 1); // :3943
      return 0; // :3944

    } else { // :3946

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:336`) <= 4 || era.get('flag:7') == 2)) { // :3948
        await era.printAndWait(`${target_name}往自己身上来回涂满了肥皂后慢慢往${master_name}抱了过去开始侍奉起来了。`); // :3949
        await era.printAndWait(`「啊啊~…啊啊啊嗯~${heart(1)}…主人啊~、只是帮主人洗澡而已…变得舒服起来了唔呜~${heart(1)}」`); // :3950
        await era.printAndWait(`「只是仅仅贴着主人的身体而已…就感觉要去了呢呜~${heart(1)}」`); // :3951
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3952
          await era.printAndWait(`${target_name}丰满的胸部压在${player_name}的背后变形了。`); // :3953
          await era.printAndWait(`「啊~啊啊~啊啊嗯~…俺的胸部…好舒服啊~${heart(1)}」`); // :3954
        } // :3955
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :3956
        era.set(`cflag:${target}:336`, 5); // :3956

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:336`) <= 3 || era.get('flag:7') == 2)) { // :3958
        await era.printAndWait(`「哈啊…啊啊…主~主人~…用俺的身体全部变得干干净净的吧~…${heart(1)}」`); // :3959
        await era.printAndWait(`${target_name}往自己身上来回涂满了肥皂后慢慢往${master_name}抱了过去开始侍奉起来了。`); // :3960
        await era.printAndWait(`「俺会…帮主人将身体弄得干干净净的…」`); // :3961
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3963
          await era.printAndWait(`「俺的胸部舒服吗？…呀啊嗯~…呜、呜嗯~…用俺的胸部将手指弄干净吧~${heart(1)}」`); // :3963
        } // :3963
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :3964
        era.set(`cflag:${target}:336`, 4); // :3964

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:336`) <= 2 || era.get('flag:7') == 2)) { // :3966
        await era.printAndWait(`「啊啊啊…肥皂的味道好香啊…哈啊…哈啊…………」`); // :3967
        await era.printAndWait(`${target_name}往身体上用肥皂擦了几下后开始对${player_name}侍奉起来了。`); // :3968
        await era.printAndWait(`「要…要变干净了噢~…」`); // :3969
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3971
          await era.printAndWait(`「俺会用俺大大胸部来帮您洗澡噢~……啊啊~…胸部要被压坏了~…」`); // :3971
        } // :3971
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :3972
        era.set(`cflag:${target}:336`, 3); // :3972

      } else if (era.get(`cflag:${target}:336`) <= 1 || era.get('flag:7') == 2) { // :3974
        await era.printAndWait(`「啊啊啊…肥皂滑溜溜地…要变成奇怪的感觉了啊………」`); // :3975
        await era.printAndWait(`${target_name}往身体上用肥皂擦了几下后开始对${player_name}侍奉起来了。`); // :3976
        if (era.get(`talent:${target}:110`) || era.get(`talent:${target}:114`)) { // :3978
          await era.printAndWait(`「哈啊…啊啊啊…胸部要被压坏了呜~………」`); // :3978
        } // :3978
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :3979
        era.set(`cflag:${target}:336`, 2); // :3979
      } // :3980
      return 0; // :3981
    } // :3982
  } // :3983




  if (era_flag.selectcom == 36) { // :3988

    if (era.get(`cflag:${target}:337`) == 0) { // :3990

      if (era.get(`talent:${target}:76`) == 1) { // :3992
        if (era.get(`abl:${target}:3`) >= 3) { // :3993
          await era.printAndWait(`「啊呀啊嗯~…肛门被主人的给塞满了~${heart(1)}…好棒啊~${heart(1)}…俺好幸福啊~${heart(1)}」`); // :3994
          await era.printAndWait(`跨在${player_name}身上的${target_name}舔着嘴唇十分下流地看着${player_name}、为了品味更强烈的快感而前后晃动起了那小巧的屁股………`); // :3995
        } else { // :3996
          await era.printAndWait(`「啊啊~…全、全部进去了~…主人的大鸡巴~…啊啊~…啊~…嗯呜呜~」`); // :3997
          await era.printAndWait(`跨在${player_name}身上的${target_name}露出了稍微痛苦的表情，慢慢地晃动起了腰部………`); // :3998
        } // :3999

      } else if (era.get(`talent:${target}:85`) == 1) { // :4001
        if (era.get(`abl:${target}:3`) >= 3) { // :4002
          await era.printAndWait(`「啊~${heart(1)}…啊呜呜~…连屁股的里面…都被主人的给塞满了啊嗯~${heart(1)}」`); // :4003
          await era.printAndWait(`跨在${player_name}身上的${target_name}如同享受一样慢慢地前后摇晃着腰部………`); // :4004
        } else { // :4005
          await era.printAndWait(`「哈啊~…啊啊~…这、这样子舒服吗？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~${heart(1)}」`); // :4006
          await era.printAndWait(`跨在${player_name}身上努力晃动腰部的${target_name}露出稍微痛苦的表情………`); // :4007
        } // :4008

      } else { // :4010
        if (era.get(`abl:${target}:3`) >= 3) { // :4011
          await era.printAndWait(`「啊啊啊~…全部都进去啊…啊啊啊~…主人的…啊啊~…啊~啊啊啊~！」`); // :4012
          await era.printAndWait(`跨在${player_name}身上的${target_name}发出娇喘声的同时晃动着腰部………`); // :4013
        } else { // :4014
          await era.printAndWait(`「啊唔呜呜~…呜~…啊啊啊…不、不要啊…屁股…要坏掉了啊啊…！」`); // :4015
          await era.printAndWait(`跨在${player_name}身上的${target_name}流着眼泪的同时被侵犯着肛门………`); // :4016
        } // :4017
      } // :4018
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :4019
      era.set(`cflag:${target}:337`, 1); // :4019
      return 0; // :4020

    } else { // :4022

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:337`) <= 7 || era.get('flag:7') == 2)) { // :4024
        if (rand_n(3) == 0) { // :4025
          await era.printAndWait(`${target_name}的双手被抓住的情况下不断地被从下往上抽插、每次往上捅的时候少女就会翻起了白眼发出了如同野兽一样的叫声。`); // :4026
          await era.printAndWait(`「哈哈~…啊呜呜~…哈呀嗯~…呀~呀啊啊~…啊啊~…啊啊啊啊啊啊…肛穴要荣坏掉了呜${heart(1)}…要坏掉了呜呜…${heart(1)}」`); // :4027
          await era.printAndWait(`少女发出了如果是曾经认识少女的人肯定无法相信的如同野兽一般的呻吟、而这个少女${target_name}则在${player_name}的腰上变得凌乱不堪起来了。`); // :4028
          await era.printAndWait(`「啊啊啊啊~…肛穴被侵犯了好棒~${heart(1)}…好想被一直侵犯下去啊~${heart(1)}」`); // :4029
        } else if (rand_n(2) == 0) { // :4030
          await era.printAndWait(`${target_name}的腰蠢蠢欲动地跨在了${player_name}的身上。`); // :4031
          await era.printAndWait(`「我的肛穴…会变得那么淫乱完全是主人的错来的啊~${heart(1)}…要负起责任噢${heart(1)}」`); // :4032
          await era.printAndWait(`抚摸着流着眼泪的同时向这边撒娇的${target_name}的脑袋、${player_name}开始往上抽插起来了。`); // :4033
          await era.printAndWait(`「啊哈呀啊嗯~${heart(1)}…这个…就是这个啊~${heart(1)}…将肛穴侵犯到融化掉为止吧~${heart(1)}」`); // :4034
        } else { // :4035
          await era.printAndWait(`「啊啊啊~…肛穴好棒啊啊~${heart(1)}…往俺的肛穴里用精子灌得满满的吧~${heart(1)}」`); // :4036
          await era.printAndWait(`${target_name}十分粗暴，激烈地晃动着腰部贪图着肛门的快感。`); // :4037
          await era.printAndWait(`「大鸡巴~${heart(1)}…大鸡巴最喜欢了~${heart(1)}…而且会往俺的肛穴里射精的大鸡巴最棒了~${heart(1)}」`); // :4038
          await era.printAndWait(`${player_name}看见少女这样的姿态不由得叹了口气，不断地往上抽插直到少女满意了为止………`); // :4039
        } // :4040
        // CFLAG:337  = 8（变量语义：CFLAG 族，337） // :4041
        era.set(`cflag:${target}:337`, 8); // :4041

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:337`) <= 7 || era.get('flag:7') == 2)) { // :4043
        if (rand_n(2) == 0) { // :4044
          await era.printAndWait(`「啊嗯~…不、不行…动起来是不行的啊~…啊啊啊~…嗯~${heart(1)}…这样子做的话~…会很棒的噢…${heart(1)}」`); // :4045
          await era.printAndWait(`${target_name}舔着嘴唇如同做着圆周运动地一样晃动着腰部、那湿润的瞳孔仿佛在告诉这样子做真的会很舒服的样子。`); // :4046
          await era.printAndWait(`「啊啊啊啊…舒服的感觉…扩散到全身了~${heart(1)}…俺会做更加舒服的事情的啦~…大鸡巴最喜欢了~…${heart(1)}」`); // :4047
        } else { // :4048
          await era.printAndWait(`「啊呀啊嗯~…肛门被主人的给塞满了哈嗯~${heart(1)}…好棒啊~${heart(1)}…俺好幸福啊~${heart(1)}」`); // :4049
          await era.printAndWait(`跨在${player_name}身上的${target_name}舔着嘴唇、为了品味快感而将她的小屁股前后摇起来了。`); // :4050
          await era.printAndWait(`「嗯~…好深啊~…大鸡巴进到深处来了啊~…啊~啊啊~…好喜欢~${heart(1)}…大鸡巴好喜欢~${heart(1)}」`); // :4051
        } // :4052
        // CFLAG:337  = 8（变量语义：CFLAG 族，337） // :4053
        era.set(`cflag:${target}:337`, 8); // :4053

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:337`) <= 6 || era.get('flag:7') == 2)) { // :4055
        await era.printAndWait(`「啊啊~…全、全部都进去了呜…主人的大鸡巴~…啊啊~…啊~…唔呜呜呜~」`); // :4056
        await era.printAndWait(`跨在${player_name}身上的${target_name}露出了稍微痛苦的表情慢慢地摇动起了腰部。`); // :4057
        await era.printAndWait(`「如果是俺最喜欢的大鸡巴的话…完全没问题…的噢~…啊~啊啊啊~${heart(1)}」`); // :4058
        if (era.get(`talent:${target}:0`) == 1) { // :4060
          await era.printAndWait(`（因为是最喜欢的…明明小穴那里也好想要来的…啊啊、真是坏心眼呢………）`); // :4060
        } // :4060
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :4061
        era.set(`cflag:${target}:337`, 7); // :4061

      } else if (era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:337`) <= 5 || era.get('flag:7') == 2)) { // :4063
        if (rand_n(3) == 0) { // :4064
          await era.printAndWait(`${target_name}被抓住双手不断地被往上抽插着、每当被插上去的时候就会翻出白眼，发出十分色情的娇喘声。`); // :4065
          await era.printAndWait(`「哈啊啊~…啊呜呜~…唔~…呀~呀啊啊~…啊啊~…啊啊啊啊啊…肛穴要融化掉了${heart(1)}…要坏掉了呜呜~…${heart(1)}」`); // :4066
          await era.printAndWait(`少女发出了曾经认识她的人绝对想象不出来的淫乱的声音、${target_name}在${player_name}的腰上跳着淫乱的舞蹈。`); // :4067
          await era.printAndWait(`「啊啊啊啊~…肛穴被侵犯地好爽啊~${heart(1)}…好想被一直侵犯下去啊哈嗯~${heart(1)}」`); // :4068
        } else if (rand_n(2) == 0) { // :4069
          await era.printAndWait(`蠢蠢欲动的${target_name}跨坐在${master_name}的身上。`); // :4070
          await era.printAndWait(`「啊啊啊…更加地侵犯俺吧~…俺的肛穴嗯~${heart(1)}…变得那么下流完全是主人的原因的噢~${heart(1)}…啊嗯~${heart(1)}」`); // :4071
          await era.printAndWait(`完全变成肛门狂的${target_name}自己晃动着臀部沉浸在肛门的快感之中。`); // :4072
          await era.printAndWait(`「啊啊啊啊…要融化了呜~…肛穴要融化了呜…${heart(1)}」`); // :4073
        } else { // :4074
          await era.printAndWait(`「哈呀啊~…肛穴好棒啊啊啊~${heart(1)}…往俺的肛穴里面将精子全部射进去吧~${heart(1)}」`); // :4075
          await era.printAndWait(`${target_name}甚至有些粗暴地激烈晃动腰部贪婪地享受着肛门的快感。`); // :4076
          await era.printAndWait(`「往里面射到…将肛穴变得黏黏糊糊要融化掉的程度吧~${heart(1)}」`); // :4077
        } // :4078
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :4079
        era.set(`cflag:${target}:337`, 6); // :4079

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:337`) <= 4 || era.get('flag:7') == 2)) { // :4081
        if (rand_n(2) == 0) { // :4082
          await era.printAndWait(`「嗯啊~…啊啊啊…哈呜…屁股好棒啊~${heart(1)}…真的好棒啊~…${heart(1)}」`); // :4083
          await era.printAndWait(`${target_name}的肛门好像在催促射精一样不断地夹紧着阴茎、每当这个时候都会发出十分色情的呻吟。`); // :4084
          await era.printAndWait(`「主人…更加…更加欺负我的屁股吧~${heart(1)}」`); // :4085
        } else { // :4086
          await era.printAndWait(`「啊~${heart(1)}…啊呜呜~…屁股的里面都…被主人的给塞满了呢~${heart(1)}」`); // :4087
          await era.printAndWait(`跨在${player_name}身上的${target_name}慢慢地如同享受一般将腰前后来回摇晃着。`); // :4088
          await era.printAndWait(`「好舒服呢哈啊嗯~…主人的大鸡巴全部塞进来吧~…啊啊~啊~…哈呜呜~${heart(1)}」`); // :4089
        } // :4090
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :4091
        era.set(`cflag:${target}:337`, 5); // :4091

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:337`) <= 3 || era.get('flag:7') == 2)) { // :4093
        await era.printAndWait(`「哈啊~…啊啊~...这、这样的感觉怎样呀~？ 嗯~…唔呜…啊啊啊~…啊~…哈啊~${heart(1)}」`); // :4094
        await era.printAndWait(`跨在${player_name}身上的${target_name}一脸好像有点难受的表情拼命地晃动着腰部。`); // :4095
        await era.printAndWait(`「我会…让主人…变得更加舒服的啦~…${heart(1)}」`); // :4096
        if (era.get(`talent:${target}:0`) == 1) { // :4097
          await era.printAndWait(`「所、所以啦…想要被主人称赞嘛~…呐啊~…啊呜嗯~${heart(1)}」`); // :4098
          await era.printAndWait(`${target_name}在被侵犯着肛门的时候、用手指将自己没有被贯通的蜜穴张开撒起娇来了………`); // :4099
        } // :4100
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :4101
        era.set(`cflag:${target}:337`, 4); // :4101

      } else if (era.get(`abl:${target}:3`) >= 3 && (era.get(`cflag:${target}:337`) <= 2 || era.get('flag:7') == 2)) { // :4103
        await era.printAndWait(`「啊啊啊~…全部都进去了~…啊啊啊~…主人的那个…啊啊~…啊~啊啊啊~！」`); // :4104
        await era.printAndWait(`跨在${player_name}身上的${target_name}一边晃动着腰部一边发出了呻吟。`); // :4105
        await era.printAndWait(`「啊~…呀啊~…腰…自己动起来了~…呀~哈呀~…啊啊啊~♪」`); // :4106
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :4107
        era.set(`cflag:${target}:337`, 3); // :4107

      } else if (era.get(`cflag:${target}:337`) <= 1 || era.get('flag:7') == 2) { // :4109
        await era.printAndWait(`「啊呜~…唔~…这样的…啊啊~…啊唔~…嗯呜呜~！」`); // :4110
        await era.printAndWait(`跨在${player_name}身上的${target_name}流着眼泪的同时被侵犯着肛门………`); // :4111
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :4112
        era.set(`cflag:${target}:337`, 2); // :4112
      } // :4113
      return 0; // :4114
    } // :4115
  } // :4116




  if (era_flag.selectcom == 37) { // :4121

    if (era.get(`cflag:${target}:338`) == 0) { // :4123

      if (era.get(`abl:${target}:16`) >= 3) { // :4125
        await era.printAndWait(`「好、好的…俺会非常努力…地、地舔那里的………」`); // :4126
        await era.printAndWait(`${target_name}颤抖着将舌头伸出来开始舔起来了………`); // :4127

      } else { // :4129
        await era.printAndWait(`「啊啊~…这样的…不要啊…好脏…好脏啊…嗯~啊呜呜………」`); // :4130
        await era.printAndWait(`${target_name}十分犹豫地将舌头伸出来了，然后用舌头伸向了${player_name}的肛门………`); // :4131
      } // :4132
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4133
      era.set(`cflag:${target}:338`, 1); // :4133
      return 0; // :4134

    } else { // :4136

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:338`) <= 4 || era.get('flag:7') == 2)) { // :4138
        await era.printAndWait(`「主人…用我的舌头变得舒服起来吧~${heart(1)}」`); // :4139
        await era.printAndWait(`${target_name}十分欣喜地将湿漉漉的舌头伸向了${player_name}的肛门。`); // :4140
        await era.printAndWait(`「啊啊嗯~…俺会让主人的肛门里面都变得十分干净的啦~${heart(1)} 呸咯~…嗯噗~…嗯~嗯噗呜~${heart(1)}」`); // :4141
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4142
        era.set(`cflag:${target}:338`, 5); // :4142

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:338`) <= 3 || era.get('flag:7') == 2)) { // :4144
        await era.printAndWait(`「俺会让主人的肛门…变得十分地干净漂亮的~绮丽${heart(1)}」`); // :4145
        await era.printAndWait(`${target_name}十分欣喜地将湿漉漉的舌头伸向了${player_name}的肛门。`); // :4146
        await era.printAndWait(`「啊啊~…连每一片褶皱…都会弄得干干净净地~${heart(1)} 呸咯~…噗啾~…嗯哼唔~${heart(1)}」`); // :4147
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4148
        era.set(`cflag:${target}:338`, 4); // :4148

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:338`) <= 2 || era.get('flag:7') == 2)) { // :4150
        await era.printAndWait(`「好、好的…俺会非常努力…地、地舔那里的………」`); // :4151
        await era.printAndWait(`${target_name}颤抖着将舌头伸出来开始舔起来了………`); // :4152
        await era.printAndWait(`「嗯啾~…呸咯~…呸咯…嗯~…哈啊…哈啊…啊啊~」`); // :4153
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4154
        era.set(`cflag:${target}:338`, 3); // :4154

      } else if (era.get(`cflag:${target}:338`) <= 1 || era.get('flag:7') == 2) { // :4156
        await era.printAndWait(`「这样的…明明好脏来的…嗯~啊呜呜……啊啊…呸咯~………」`); // :4157
        await era.printAndWait(`${target_name}十分犹豫地将舌头伸出来了，然后用舌头伸向了${player_name}的肛门………`); // :4158
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4159
        era.set(`cflag:${target}:338`, 2); // :4159
      } // :4160
      return 0; // :4161
    } // :4162
  } // :4163




  if (era_flag.selectcom == 40) { // :4168

    if (era.get(`cflag:${target}:341`) == 0) { // :4170
      await era.printAndWait(`「呀啊…我、我不是坏孩子啊！」`); // :4171
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :4172
      era.set(`cflag:${target}:341`, 1); // :4172
      return 0; // :4173

    } else { // :4175

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:341`) <= 4 || era.get('flag:7') == 2)) { // :4177
        await era.printAndWait(`「呀嗯…啊啊啊哈啊嗯…再更多地打吧${heart(1)}」`); // :4178
        await era.printAndWait(`${target_name}每次被打屁股时都左右摇晃着她的屁股。`); // :4179
        await era.printAndWait(`「多多地${heart(1)}…打我的屁股吧${heart(1)}…惩罚我吧${heart(1)}」`); // :4180
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :4181
        era.set(`cflag:${target}:341`, 5); // :4181

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:341`) <= 3 || era.get('flag:7') == 2)) { // :4183
        await era.printAndWait(`「对不起…全部都是我的不对…啊啊哈啊嗯${heart(1)}」`); // :4184
        await era.printAndWait(`虽然屁股已经被打得又红又肿、${target_name}还是享受着打屁股的责罚。`); // :4185
        await era.printAndWait(`「啊啊…屁股…好痛啊…啊啊啊${heart(1)}」`); // :4186
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :4187
        era.set(`cflag:${target}:341`, 4); // :4187
        return 0; // :4188

      } else if (era.get(`mark:${target}:0`) == 3 && era.get(`mark:${target}:2`) == 3 && (era.get(`cflag:${target}:341`) <= 2 || era.get('flag:7') == 2)) { // :4190
        await era.printAndWait(`「啊…哈～…哈啊…请再…多打几下………」`); // :4191
        await era.printAndWait(`虽然屁股已经被打得又红又肿、${target_name}还是承受着打屁股的责罚。`); // :4192
        await era.printAndWait(`「我是个坏孩子…坏孩子………」`); // :4193
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :4194
        era.set(`cflag:${target}:341`, 3); // :4194
        return 0; // :4195

      } else if (era.get(`cflag:${target}:341`) <= 1 && era.get('flag:7') == 2) { // :4197
        await era.printAndWait(`「呀啊…我、我不是坏孩子啊！」`); // :4198
        await era.printAndWait(`「呜呜…啊…嗯…呜咕………」`); // :4199
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :4200
        era.set(`cflag:${target}:341`, 2); // :4200
      } // :4201
      return 0; // :4202
    } // :4203
  } // :4204




  if (era_flag.selectcom == 41) { // :4209

    if (era.get(`cflag:${target}:342`) == 0) { // :4211

      if (era.get(`talent:${target}:76`) == 1) { // :4213
        await era.printAndWait(`「啊啊啊…请原谅、原谅我吧…主人！」`); // :4214

      } else if (era.get(`talent:${target}:85`) == 1) { // :4216
        await era.printAndWait(`「啊…不要打我啊…啊啊、对不起对不起」`); // :4217

      } else { // :4219
        await era.printAndWait(`「呀啊…咕呜…不要啊…已经够了啊…不要再打了啊！」`); // :4220
      } // :4221
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :4222
      era.set(`cflag:${target}:342`, 1); // :4222
      return 0; // :4223

    } else { // :4225

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:342`) <= 8 || era.get('flag:7') == 2)) { // :4227
        await era.printAndWait(`「主人…更加…更加…请赐予我的身体更多的主人的疼爱吧${heart(1)}」`); // :4228
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着、少女发出了愉悦的尖叫。`); // :4229
        await era.printAndWait(`「啊啊${heart(1)}…更多地${heart(1)}…只是被主人鞭笞着就要去了啊${heart(1)}」`); // :4230
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :4231
        era.set(`cflag:${target}:342`, 9); // :4231

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:342`) <= 7 || era.get('flag:7') == 2)) { // :4233
        await era.printAndWait(`「主人…更加…更加…请赐予我的身体更多的主人的疼爱吧${heart(1)}」`); // :4234
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着、少女发出了愉悦的尖叫。`); // :4235
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :4236
        era.set(`cflag:${target}:342`, 8); // :4236

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:342`) <= 6 || era.get('flag:7') == 2)) { // :4238
        await era.printAndWait(`「啊啊啊…请原谅、原谅我吧…主人！」`); // :4239
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭打着………`); // :4240
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :4241
        era.set(`cflag:${target}:342`, 7); // :4241

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:342`) <= 5 || era.get('flag:7') == 2)) { // :4243
        await era.printAndWait(`「啊…哈…呼…主人…被毫不留情地打了呢${heart(1)}」`); // :4244
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着、少女发出带着哭音的喘息。`); // :4245
        await era.printAndWait(`「啊嗯${heart(1)}…啊啊啊${heart(1)}…感受到了哦、主人对我的爱${heart(1)}」`); // :4246
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :4247
        era.set(`cflag:${target}:342`, 6); // :4247

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:342`) <= 4 || era.get('flag:7') == 2)) { // :4249
        await era.printAndWait(`「啊…哈…呼…主人…被毫不留情地打了呢${heart(1)}」`); // :4250
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着、少女发出带着哭音的喘息………`); // :4251
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :4252
        era.set(`cflag:${target}:342`, 5); // :4252

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:342`) <= 3 || era.get('flag:7') == 2)) { // :4254
        await era.printAndWait(`「啊…不要打我啊…啊啊、对不起对不起」`); // :4255
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着………`); // :4256
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :4257
        era.set(`cflag:${target}:342`, 4); // :4257

      } else if (era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:342`) <= 2 || era.get('flag:7') == 2)) { // :4259
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着。`); // :4260
        await era.printAndWait(`「啊啊哈…嗯啊…啊嗯…啊啊…哈啊嗯」`); // :4261
        await era.printAndWait(`被多次鞭打的少女露出了一脸心醉神迷的表情………`); // :4262
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :4263
        era.set(`cflag:${target}:342`, 3); // :4263

      } else if (era.get(`cflag:${target}:335`) <= 1 || era.get('flag:7') == 2) { // :4265
        await era.printAndWait(`「呀啊…咕呜…不要啊…已经够了啊…不要再打了啊！」`); // :4266
        await era.printAndWait(`${target_name}年幼的身体被毫不留情地鞭笞着………`); // :4267
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :4268
        era.set(`cflag:${target}:342`, 2); // :4268
      } // :4269
      return 0; // :4270
    } // :4271
  } // :4272




  if (era_flag.selectcom == 42) { // :4277

    if (era.get(`cflag:${target}:343`) == 0) { // :4279

      if (era.get(`talent:${target}:76`) == 1) { // :4281
        await era.printAndWait(`「啊…好、好痛啊…主人…啊咕」`); // :4282

      } else if (era.get(`talent:${target}:85`) == 1) { // :4284
        await era.printAndWait(`「住、住手…主人…我、我…什么坏事都没做啊…」`); // :4285

      } else { // :4287
        await era.printAndWait(`「咿…好痛…好痛啊！」`); // :4288
      } // :4289
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :4290
      era.set(`cflag:${target}:343`, 1); // :4290
      return 0; // :4291

    } else { // :4293

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:343`) <= 8 || era.get('flag:7') == 2)) { // :4295
        await era.printAndWait(`「呀${heart(1)} 啊哈啊…主人…被刺得好舒服${heart(1)}」`); // :4296
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷。`); // :4297
        await era.printAndWait(`「被刺得好舒服…啊…主人的针…好舒服噢${heart(1)}」`); // :4298
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :4299
        era.set(`cflag:${target}:343`, 9); // :4299

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:343`) <= 7 || era.get('flag:7') == 2)) { // :4301
        await era.printAndWait(`「呀${heart(1)} 啊哈啊…主人…被刺得好舒服${heart(1)}」`); // :4302
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷………`); // :4303
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :4304
        era.set(`cflag:${target}:343`, 8); // :4304

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:343`) <= 6 || era.get('flag:7') == 2)) { // :4306
        await era.printAndWait(`「主人…啊…好、好痛啊…」`); // :4307
        await era.printAndWait(`${target_name}流着泪向${player_name}请求原谅………`); // :4308
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :4309
        era.set(`cflag:${target}:343`, 7); // :4309

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:343`) <= 5 || era.get('flag:7') == 2)) { // :4311
        await era.printAndWait(`「呜咕…啊…嗯…更加多地…刺我把…主人${heart(1)}」`); // :4312
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷。`); // :4313
        await era.printAndWait(`「让、让我…更加…多地…领受主人赐予的疼痛吧${heart(1)}」`); // :4314
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :4315
        era.set(`cflag:${target}:343`, 6); // :4315

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:343`) <= 4 || era.get('flag:7') == 2)) { // :4317
        await era.printAndWait(`「呜咕…啊…嗯…更加多地…刺我把…主人${heart(1)}」`); // :4318
        await era.printAndWait(`针刺带来的疼痛让${target_name}感到心醉神迷………`); // :4319
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :4320
        era.set(`cflag:${target}:343`, 5); // :4320

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:343`) <= 3 || era.get('flag:7') == 2)) { // :4322
        await era.printAndWait(`「住、住手…主人…我、我…什么坏事都没做啊…」`); // :4323
        await era.printAndWait(`${target_name}流着泪向${player_name}请求原谅………`); // :4324
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :4325
        era.set(`cflag:${target}:343`, 4); // :4325

      } else if (era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:343`) <= 2 || era.get('flag:7') == 2)) { // :4327
        await era.printAndWait(`「啊啊…真的…好痛…啊…啊啊呜」`); // :4328
        await era.printAndWait(`${target_name}被刺得鲜血直流、发出带着哭音的喘息。`); // :4329
        await era.printAndWait(`「哈…哈…啊呜…嗯…呀」`); // :4330
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :4331
        era.set(`cflag:${target}:343`, 3); // :4331

      } else if (era.get(`cflag:${target}:343`) <= 1 || era.get('flag:7') == 2) { // :4333
        await era.printAndWait(`「对不起、对不起、请原谅我把…真的好痛啊………！」`); // :4334
        await era.printAndWait(`${target_name}被刺得鲜血直流、哭喊着………`); // :4335
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :4336
        era.set(`cflag:${target}:343`, 2); // :4336
      } // :4337
      return 0; // :4338
    } // :4339
  } // :4340





  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) { // :4346

    if (era.get(`cflag:${target}:344`) == 0) { // :4348

      if (era.get(`talent:${target}:76`) == 1) { // :4350
        await era.printAndWait(`「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`); // :4351

      } else if (era.get(`talent:${target}:85`) == 1) { // :4353
        await era.printAndWait(`「啊嗯…不要…好害怕………」`); // :4354

      } else { // :4356
        await era.printAndWait(`「住、住手啊…不要做奇怪的事啊………」`); // :4357
      } // :4358
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4359
      era.set(`cflag:${target}:344`, 1); // :4359
      return 0; // :4360

    } else { // :4362

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:344`) <= 8 || era.get('flag:7') == 2)) { // :4364
        await era.printAndWait(`「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`); // :4365
        await era.printAndWait(`${target_name}一边用舌头舔了舔嘴唇一边戴上了眼罩………`); // :4366
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4367
        era.set(`cflag:${target}:344`, 9); // :4367

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:344`) <= 7 || era.get('flag:7') == 2)) { // :4369
        await era.printAndWait(`「一边舔嘴唇一边被戴上眼罩」`); // :4370
        await era.printAndWait(`${target_name}带上了眼罩………`); // :4371
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4372
        era.set(`cflag:${target}:344`, 8); // :4372

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:344`) <= 6 || era.get('flag:7') == 2)) { // :4374
        await era.printAndWait(`「不、不要…戴上这个会被做奇怪的事情的吧？…………呜呼呼、来吧${heart(1)}」`); // :4375
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4376
        era.set(`cflag:${target}:344`, 7); // :4376

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:344`) <= 5 || era.get('flag:7') == 2)) { // :4378
        await era.printAndWait(`「啊嗯…不要…好害怕………」`); // :4379
        await era.printAndWait(`${target_name}一边用舌头舔了舔嘴唇一边戴上了眼罩………`); // :4380
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4381
        era.set(`cflag:${target}:344`, 6); // :4381

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:344`) <= 4 || era.get('flag:7') == 2)) { // :4383
        await era.printAndWait(`「啊嗯…不要…好害怕………」`); // :4384
        await era.printAndWait(`${target_name}戴上了眼罩………`); // :4385
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4386
        era.set(`cflag:${target}:344`, 5); // :4386

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:344`) <= 3 || era.get('flag:7') == 2)) { // :4388
        await era.printAndWait(`「啊嗯…不要…好害怕………」`); // :4389
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4390
        era.set(`cflag:${target}:344`, 4); // :4390

      } else if (era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:344`) <= 2 || era.get('flag:7') == 2)) { // :4392
        await era.printAndWait(`「住、住手啊…不要做、做、奇怪的事啊………」`); // :4393
        await era.printAndWait(`${target_name}带上了眼罩………`); // :4394
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4395
        era.set(`cflag:${target}:344`, 3); // :4395

      } else if (era.get(`cflag:${target}:344`) <= 1 || era.get('flag:7') == 2) { // :4397
        await era.printAndWait(`「住、住手啊…不要做奇怪的事啊………」`); // :4398
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4399
        era.set(`cflag:${target}:344`, 2); // :4399
      } // :4400
      return 0; // :4401
    } // :4402

  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) { // :4404

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:380`) < 3 || era.get('flag:7') == 2)) { // :4406
      await era.printAndWait(`「哈…哈…呜嗯………」`); // :4407
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :4408
      era.set(`cflag:${target}:380`, 3); // :4408

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:380`) < 2 || era.get('flag:7') == 2)) { // :4410
      await era.printAndWait(`「哈…哈…主人………」`); // :4411
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :4412
      era.set(`cflag:${target}:380`, 2); // :4412

    } else if (era.get(`cflag:${target}:380`) < 1 || era.get('flag:7') == 2) { // :4414
      await era.printAndWait(`「哈…哈…终于摘下来了…」`); // :4415
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :4416
      era.set(`cflag:${target}:380`, 1); // :4416
    } // :4417
    return 0; // :4418
  } // :4419





  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) { // :4425

    if (era.get(`cflag:${target}:345`) == 0) { // :4427

      if (era.get(`talent:${target}:76`) == 1) { // :4429
        await era.printAndWait(`「嗯~…啊~…嗯啊嗯~…好紧啊呜………」`); // :4430

      } else if (era.get(`talent:${target}:85`) == 1) { // :4432
        await era.printAndWait(`「好、好可怕啊…请不要…弄得太紧了………」`); // :4433

      } else { // :4435
        await era.printAndWait(`「啊~…啊啊~…不要…不要了啊…不要啊…」`); // :4436
      } // :4437
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :4438
      era.set(`cflag:${target}:345`, 1); // :4438
      return 0; // :4439

    } else { // :4441

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:345`) <= 8 || era.get('flag:7') == 2)) { // :4443
        await era.printAndWait(`虽然${target_name}幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女露出了舒服而荡漾的表情。`); // :4444
        await era.printAndWait(`「主…人…俺、俺要…变得奇怪起来了啊${heart(1)}…只是被绑住而已…就好像要去了样子啊…${heart(1)}」`); // :4445
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :4446
        era.set(`cflag:${target}:345`, 9); // :4446

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:345`) <= 7 || era.get('flag:7') == 2)) { // :4448
        await era.printAndWait(`虽然${target_name}幼小的身躯被绳子给紧紧地捆绑住了、但是其紧缚的感觉让少女身体蠢蠢欲动起来了。`); // :4449
        await era.printAndWait(`「啊~啊啊~…主人~…绑得…更加地紧也可以噢…绳子…勒进肉里面也可以噢…${heart(1)}」`); // :4450
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :4451
        era.set(`cflag:${target}:345`, 8); // :4451

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:345`) <= 6 || era.get('flag:7') == 2)) { // :4453
        await era.printAndWait(`${target_name}幼小的身躯被绳子给紧紧地捆绑住了、呼出炽热的喘息的同时不停的娇喘着。`); // :4454
        await era.printAndWait(`「哈啊啊~${heart(1)}…主人…做更多…H的事情吧~…${heart(1)}」`); // :4455
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :4456
        era.set(`cflag:${target}:345`, 7); // :4456

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:345`) <= 5 || era.get('flag:7') == 2)) { // :4458
        await era.printAndWait(`「啊啊啊…主人~${heart(1)} 更加用力的绑住俺吧，将俺的身心都绑住吧~${heart(1)}」`); // :4459
        await era.printAndWait(`被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}如同狗一样将舌头伸出来向${player_name}献媚起来了………`); // :4460
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :4461
        era.set(`cflag:${target}:345`, 6); // :4461

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:345`) <= 4 || era.get('flag:7') == 2)) { // :4463
        await era.printAndWait(`「哈啊…哈啊…主人~${heart(1)} 主人~${heart(1)} 绳子…勒进去了呜~………${heart(1)}」`); // :4464
        await era.printAndWait(`被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}的两条大腿在不断地互相摩擦着………`); // :4465
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :4466
        era.set(`cflag:${target}:345`, 5); // :4466

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:345`) <= 3 || era.get('flag:7') == 2)) { // :4468
        await era.printAndWait(`「哈啊…哈啊…好、好可怕啊…主人…将这个绳子解开吧……」`); // :4469
        await era.printAndWait(`被绳子紧紧绑住的同时还被让其保持正坐的姿态，${target_name}一脸难受的表情请求着原谅………`); // :4470
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :4471
        era.set(`cflag:${target}:345`, 4); // :4471

      } else if (era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:345`) <= 2 || era.get('flag:7') == 2)) { // :4473
        await era.printAndWait(`「啊~…被绑得那么紧的话…哈啊…啊啊啊…」`); // :4474
        await era.printAndWait(`${target_name}幼小的身躯被紧紧地捆绑住并且被推到在了地板上、而这个少女则因为绳子勒进肉的感觉而不断喘息着………`); // :4475
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :4476
        era.set(`cflag:${target}:345`, 3); // :4476

      } else if (era.get(`cflag:${target}:345`) <= 1 || era.get('flag:7') == 2) { // :4478
        await era.printAndWait(`「啊~…啊啊~…不要啊…不要啦啊…拜托了不要啊…」`); // :4479
        await era.printAndWait(`幼小的身躯被紧紧地捆绑住并且被推到在了地板上、${target_name}因为恐怖而颤抖着………`); // :4480
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :4481
        era.set(`cflag:${target}:345`, 2); // :4481
      } // :4482
      return 0; // :4483
    } // :4484

  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) { // :4486

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:385`) < 3 || era.get('flag:7') == 2)) { // :4488
      await era.printAndWait(`「哈啊~…好辛苦来的啊………」`); // :4489
      await era.printAndWait(`${target_name}被解开绳子后就露出了放了一口气的表情………`); // :4490
      if (era.get(`abl:${target}:21`) >= 3) { // :4492
        await era.printAndWait(`………然而、${player_name}并没有看漏沾在那绳子上粘嗒嗒的爱液。`); // :4492
      } // :4492
      // CFLAG:385  = 3（变量语义：CFLAG 族，385） // :4493
      era.set(`cflag:${target}:385`, 3); // :4493

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:385`) < 2 || era.get('flag:7') == 2)) { // :4495
      await era.printAndWait(`「啊啊…痕迹还留着呢………」`); // :4496
      await era.printAndWait(`${target_name}被解开绳子后就露出了放了一口气的表情………`); // :4497
      if (era.get(`abl:${target}:21`) >= 3) { // :4499
        await era.printAndWait(`………然而、${player_name}并没有看漏沾在那绳子上粘嗒嗒的爱液。`); // :4499
      } // :4499
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :4500
      era.set(`cflag:${target}:385`, 2); // :4500

    } else if (era.get(`cflag:${target}:385`) < 1 || era.get('flag:7') == 2) { // :4502
      await era.printAndWait(`「哈啊…哈啊…」`); // :4503
      await era.printAndWait(`${target_name}被解开绳子后就露出了放了一口气的表情………`); // :4504
      if (era.get(`abl:${target}:21`) >= 3) { // :4506
        await era.printAndWait(`………然而、${player_name}并没有看漏这个少女因为感到不足而发出了叹息的这件事。`); // :4506
      } // :4506
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :4507
      era.set(`cflag:${target}:385`, 1); // :4507
    } // :4508
    return 0; // :4509
  } // :4510





  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) { // :4516

    if (era.get(`cflag:${target}:346`) == 0) { // :4518

      if (era.get(`talent:${target}:76`) == 1) { // :4520
        await era.printAndWait(`「嗯唔嗯呜呜~…${heart(1)}」`); // :4521
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4522

      } else if (era.get(`talent:${target}:85`) == 1) { // :4524
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`); // :4525
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4526

      } else { // :4528
        await era.printAndWait(`「等、不、不要…嗯…嗯呜唔呜…………」`); // :4529
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4530
      } // :4531
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :4532
      era.set(`cflag:${target}:346`, 1); // :4532
      return 0; // :4533

    } else { // :4535

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:346`) <= 8 || era.get('flag:7') == 2)) { // :4537
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`); // :4538
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4539
        await era.printAndWait(`是因为变得兴奋了吗、口水从口枷的缝隙间滴落下来………`); // :4540
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :4541
        era.set(`cflag:${target}:346`, 9); // :4541

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:346`) <= 7 || era.get('flag:7') == 2)) { // :4543
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`); // :4544
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4545
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :4546
        era.set(`cflag:${target}:346`, 8); // :4546

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:346`) <= 6 || era.get('flag:7') == 2)) { // :4548
        await era.printAndWait(`「嗯唔呜噗嗯~…${heart(1)}」`); // :4549
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4550
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :4551
        era.set(`cflag:${target}:346`, 7); // :4551

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 5 && (era.get(`cflag:${target}:346`) <= 5 || era.get('flag:7') == 2)) { // :4553
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔${heart(1)}」`); // :4554
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4555
        await era.printAndWait(`是因为变得兴奋了吗、口水从口枷的缝隙间滴落下来………`); // :4556
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :4557
        era.set(`cflag:${target}:346`, 6); // :4557

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:346`) <= 4 || era.get('flag:7') == 2)) { // :4559
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`); // :4560
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4561
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :4562
        era.set(`cflag:${target}:346`, 5); // :4562

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:346`) <= 3 || era.get('flag:7') == 2)) { // :4564
        await era.printAndWait(`「哈呜噗…嗯…嗯哼唔…哼唔…${heart(1)}」`); // :4565
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地表情看着${player_name}………`); // :4566
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :4567
        era.set(`cflag:${target}:346`, 4); // :4567

      } else if (era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:346`) <= 2 || era.get('flag:7') == 2)) { // :4569
        await era.printAndWait(`「啊唔~…嗯~…嗯噗呜…哼唔………」`); // :4570
        await era.printAndWait(`被戴上口枷后，${target_name}就一脸恍惚地样子了………`); // :4571
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :4572
        era.set(`cflag:${target}:346`, 3); // :4572

      } else if (era.get(`cflag:${target}:346`) <= 1 || era.get('flag:7') == 2) { // :4574
        await era.printAndWait(`「等、不、不要…嗯…嗯呜唔呜…………」`); // :4575
        await era.printAndWait(`被戴上口枷后，${target_name}流着眼泪眺望着这边………`); // :4576
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :4577
        era.set(`cflag:${target}:346`, 2); // :4577
      } // :4578
      return 0; // :4579
    } // :4580

  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) { // :4582

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:386`) < 3 || era.get('flag:7') == 2)) { // :4584
      await era.printAndWait(`「嗯呸啊………哈啊…哈啊…」`); // :4585
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :4586
      era.set(`cflag:${target}:386`, 3); // :4586

    } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:386`) < 2 || era.get('flag:7') == 2)) { // :4588
      await era.printAndWait(`「嗯啊啊啊…帮俺将口水擦掉吧…${heart(1)}」`); // :4589
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :4590
      era.set(`cflag:${target}:386`, 2); // :4590

    } else if (era.get(`cflag:${target}:386`) < 1 || era.get('flag:7') == 2) { // :4592
      await era.printAndWait(`「咳~…咳咳~…再、再也不要了………」`); // :4593
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :4594
      era.set(`cflag:${target}:386`, 1); // :4594
    } // :4595
    return 0; // :4596
  } // :4597





  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) { // :4603

    if (era.get(`cflag:${target}:347`) == 0) { // :4605

      if (era.get(`talent:${target}:76`) == 1) { // :4607
        await era.printAndWait(`「啊呜呜…肚子变得好难受…好难受啊…」`); // :4608

      } else if (era.get(`talent:${target}:85`) == 1) { // :4610
        await era.printAndWait(`「啊呜呜~…俺会忍耐的…会忍耐的啦啊~…！」`); // :4611

      } else { // :4613
        await era.printAndWait(`「呀啊~…唔~…啊呜呜~…肚子好难受~…好难受啊………」`); // :4614
      } // :4615
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :4616
      era.set(`cflag:${target}:347`, 1); // :4616
      return 0; // :4617

    } else { // :4619

      if (era.get(`talent:${target}:76`) == 1 && era.get(`abl:${target}:3`) >= 3 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:347`) <= 6 || era.get('flag:7') == 2)) { // :4621
        await era.printAndWait(`「更多~…灌到极限肚子变得满满的也可以噢………${heart(1)}」`); // :4622
        await era.printAndWait(`${target_name}虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。`); // :4623
        await era.printAndWait(`「哈啊哈啊…啊哈啊…${heart(1)} 做更多的…H的事情吧~…俺是主人的东西来的啦~…啊啊嗯~${heart(1)}」`); // :4624
        await era.printAndWait(`断断续续的肛门快感所带来的刺激让${target_name}的脑内变得荡漾起来了，少女一脸恍惚地诱惑起了${player_name}………`); // :4625
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4626
        era.set(`cflag:${target}:347`, 7); // :4626

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:347`) <= 5 || era.get('flag:7') == 2)) { // :4628
        await era.printAndWait(`「嗯哼唔~…肚子变得好奇怪…不、不行了噢…再这样下去的话………」`); // :4629
        await era.printAndWait(`${target_name}因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。`); // :4630
        await era.printAndWait(`「啊啊~…但是就这样…对俺做更加下流的事情吧~………${heart(1)}」`); // :4631
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4632
        era.set(`cflag:${target}:347`, 6); // :4632

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:3`) >= 3 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:347`) <= 4 || era.get('flag:7') == 2)) { // :4634
        await era.printAndWait(`「啊哈啊~${heart(1)} 肚、肚子里…变得满满的了噢~…啊、啊啊啊………${heart(1)}」`); // :4635
        await era.printAndWait(`${target_name}虽然被灌进了大量的灌肠液、然而肛门带来的快感超越了疼痛，少女变得恍惚了起来。`); // :4636
        await era.printAndWait(`「啊嗯~…塞子被紧紧地塞进去了啊${heart(1)}…啊哈啊~…啊啊~…还不能排出来吗？」`); // :4637
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4638
        era.set(`cflag:${target}:347`, 5); // :4638

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:347`) <= 3 || era.get('flag:7') == 2)) { // :4640
        await era.printAndWait(`「哈啊~…哈啊~…不、不行了啊…这、这样的…肚子…变奇怪了啊~」`); // :4641
        await era.printAndWait(`${target_name}因为灌肠所带来的异常的腹痛和便意而变得奇怪起来了。`); // :4642
        await era.printAndWait(`「啊啊啊~…主人…啊、那种地方…不想让主人看到啊…真的不想被看到啦~！」`); // :4643
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4644
        era.set(`cflag:${target}:347`, 4); // :4644

      } else if (era.get(`abl:${target}:3`) >= 3 && era.get(`abl:${target}:21`) >= 3 && (era.get(`cflag:${target}:347`) <= 2 || era.get('flag:7') == 2)) { // :4646
        await era.printAndWait(`「啊啊啊~…屁、屁股烧起来呜呜~…啊啊~…啊啊啊啊~」`); // :4647
        await era.printAndWait(`${target_name}因为被灌进了大量的灌肠液而露出了一脸恍惚的神情。`); // :4648
        await era.printAndWait(`「啊哈啊啊~…这、这样子…被灌进那么多的话…俺、俺已经…已经…变得奇怪起来了………」`); // :4649
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4650
        era.set(`cflag:${target}:347`, 3); // :4650

      } else if (era.get(`cflag:${target}:347`) <= 1 || era.get('flag:7') == 2) { // :4652
        await era.printAndWait(`「已…已经不行了啊~…原谅俺吧~………！」`); // :4653
        await era.printAndWait(`${target_name}的肛门被塞进了塞子、正在一跳一跳地痉挛着。`); // :4654
        await era.printAndWait(`「呀~…唔~…啊呜呜~…肚子好难受…好难受啊啊~………」`); // :4655
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4656
        era.set(`cflag:${target}:347`, 2); // :4656
      } // :4657
      return 0; // :4658
    } // :4659
  } // :4660




  if (era_flag.selectcom == 55) { // :4665

    if (era.get(`cflag:${target}:356`) == 0) { // :4667

      if (era.get(`talent:${target}:76`) == 1) { // :4669
        await era.printAndWait(`「俺被做怎样的事情…都完全没问题的噢…♪」`); // :4670

      } else if (era.get(`talent:${target}:85`) == 1) { // :4672
        await era.printAndWait(`「就像平常那样…对、对俺做点什么吧………」`); // :4673

      } else { // :4675
        await era.printAndWait(`「不、不要看着这边啊…~！」`); // :4676
      } // :4677
      await era.print(''); // :4678

      if (era.get(`tequip:${target}:11`)) { // :4681
        await era.printAndWait(`${target_name}的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。`); // :4681
      } // :4681

      if (era.get(`tequip:${target}:13`)) { // :4684
        await era.printAndWait(`${target_name}的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。`); // :4684
      } // :4684

      if (era.get(`tequip:${target}:19`)) { // :4687
        await era.printAndWait(`${target_name}的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。`); // :4687
      } // :4687

      if (era.get(`tequip:${target}:14`)) { // :4690
        await era.printAndWait(`${target_name}的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。`); // :4690
      } // :4690

      if (era.get(`tequip:${target}:15`)) { // :4693
        await era.printAndWait(`${target_name}的乳头正带着乳头夹在给予着乳头刺激中。`); // :4693
      } // :4693

      if (era.get(`tequip:${target}:16`)) { // :4696
        await era.print(`${target_name}的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。`); // :4696
      } // :4696

      if (era.get(`tequip:${target}:17`)) { // :4699
        await era.printAndWait(`${target_name}的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。`); // :4699
      } // :4699

      if (era.get(`tequip:${target}:43`)) { // :4702
        await era.printAndWait(`${target_name}被戴上了眼罩。`); // :4702
      } // :4702

      if (era.get(`tequip:${target}:44`)) { // :4705
        await era.printAndWait(`${target_name}的身体被绳子给捆绑着。`); // :4705
      } // :4705

      if (era.get(`tequip:${target}:46`)) { // :4708
        await era.printAndWait(`${target_name}的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。`); // :4708
      } // :4708

      if (era.get(`tequip:${target}:49`)) { // :4711
        await era.printAndWait(`${target_name}的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。`); // :4711
      } // :4711

      if (era.get(`tequip:${target}:53`)) { // :4714
        await era.printAndWait(`接着、${target_name}这样的姿态始终被录像着………`); // :4714
      } // :4714
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :4715
      era.set(`cflag:${target}:356`, 1); // :4715
      return 0; // :4716

    } else { // :4718

      if (era.get(`talent:${target}:76`) == 1 && era.get(`palam:${target}:5`) >= era.get('palamlv:3') && (era.get(`cflag:${target}:356`) <= 5 || era.get('flag:7') == 2)) { // :4720
        await era.printAndWait(`「主人~…不要玩弄俺啦…真、真是的…已经要变得奇怪起来了啊~………！」`); // :4721
        await era.printAndWait(`${target_name}的两条大腿互相摩擦着、一脸十分难受的看着这边………`); // :4722
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :4723
        era.set(`cflag:${target}:356`, 6); // :4723

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:356`) <= 4 || era.get('flag:7') == 2)) { // :4725
        await era.printAndWait(`「俺被做怎样的事情…都完全没问题的噢…♪」`); // :4726
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :4727
        era.set(`cflag:${target}:356`, 5); // :4727

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`palam:${target}:5`) >= era.get('palamlv:3') && (era.get(`cflag:${target}:356`) <= 3 || era.get('flag:7') == 2)) { // :4729
        await era.printAndWait(`「唔啊…嗯…什、什么都没有啦~…不、不要看这边啦………！」`); // :4730
        await era.printAndWait(`${target_name}两腿蹭来蹭去并用双手按住了两腿之间的样子………`); // :4731
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :4732
        era.set(`cflag:${target}:356`, 4); // :4732

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:356`) <= 2 || era.get('flag:7') == 2)) { // :4734
        await era.printAndWait(`「就像平常那样…对、对俺做点什么吧………」`); // :4735
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :4736
        era.set(`cflag:${target}:356`, 3); // :4736

      } else if (era.get(`cflag:${target}:356`) <= 1 || era.get('flag:7') == 2) { // :4738
        await era.printAndWait(`「不、不要看着这边啊…~！」`); // :4739
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :4740
        era.set(`cflag:${target}:356`, 2); // :4740
      } // :4741
      await era.print(''); // :4742

      if (era.get(`tequip:${target}:11`)) { // :4745
        await era.printAndWait(`${target_name}的小穴内有蠕虫在蠕动着、它在腔内毫不留情来回钻着。`); // :4745
      } // :4745

      if (era.get(`tequip:${target}:13`)) { // :4748
        await era.printAndWait(`${target_name}的直肠里有蠕虫在蠕动着、它毫不留情地蹂蹑着少女的肛门。`); // :4748
      } // :4748

      if (era.get(`tequip:${target}:19`)) { // :4751
        await era.printAndWait(`${target_name}的肛门里被塞进了钢珠、少女的肛门在一抽一抽地抖动着。`); // :4751
      } // :4751

      if (era.get(`tequip:${target}:14`)) { // :4754
        await era.printAndWait(`${target_name}的阴蒂正带着电动阴蒂夹在给予着阴蒂刺激中。`); // :4754
      } // :4754

      if (era.get(`tequip:${target}:15`)) { // :4757
        await era.printAndWait(`${target_name}的乳头正带着乳头夹在给予着乳头刺激中。`); // :4757
      } // :4757

      if (era.get(`tequip:${target}:16`)) { // :4760
        await era.print(`${target_name}的胸部被戴上了榨乳器，榨乳器正不断地吸出母乳中。`); // :4760
      } // :4760

      if (era.get(`tequip:${target}:17`)) { // :4763
        await era.printAndWait(`${target_name}的阴茎被套上了飞机杯，而且好像现在就要射精一样抽动着。`); // :4763
      } // :4763

      if (era.get(`tequip:${target}:43`)) { // :4766
        await era.printAndWait(`${target_name}被戴上了眼罩。`); // :4766
      } // :4766

      if (era.get(`tequip:${target}:44`)) { // :4769
        await era.printAndWait(`${target_name}的身体被绳子给捆绑着。`); // :4769
      } // :4769

      if (era.get(`tequip:${target}:46`)) { // :4772
        await era.printAndWait(`${target_name}的肚子因为灌肠液而发出了咕噜咕噜的声音、如果将塞子拔掉的话可能会立马就会喷出来的样子。`); // :4772
      } // :4772

      if (era.get(`tequip:${target}:49`)) { // :4775
        await era.printAndWait(`${target_name}的肛门塞进了电极棒、每当轻轻的电流流过的时候括约肌就会抖动一下。`); // :4775
      } // :4775

      if (era.get(`tequip:${target}:53`)) { // :4778
        await era.printAndWait(`接着、${target_name}这样的姿态始终被录像着………`); // :4778
      } // :4778
      return 0; // :4779
    } // :4780
  } // :4781






  if (era_flag.selectcom == 56) { // :4788

    if (era.get(`cflag:${target}:357`) == 0) { // :4790
      if (era.get(`tequip:${target}:53`) == 1) { // :4791

        await era.print(`${player_name}催促着${target_name}进行自我介绍、`); // :4793
        if (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5) { // :4794
          await era.print(`${target_name}将自己的本名和接下来要进行的性体验`); // :4795
          if (era.get(`abl:${target}:31`) >= 3) { // :4797
            await era.print(`、甚至是连自慰时妄想的事情`); // :4797
          } // :4797
          await era.print(`十分欣喜地全部说了出来……`); // :4798
          await era.print(`只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……`); // :4799
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4800
          era.set('tflag:32 |', 2); // :4800
        } else if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)) { // :4801
          await era.print(`${target_name}面向水晶说起了淫猥的话语`); // :4802
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4803
          era.set('tflag:32 |', 2); // :4803
        } else if (era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 3 || era.get(`abl:${target}:11`) >= 4 || era.get(`abl:${target}:17`) >= 2) { // :4804
          await era.print(`${target_name}对着水晶球进行了自我介绍`); // :4805
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4806
          era.set('tflag:32 |', 2); // :4806
        } else { // :4807
          await era.printAndWait(`哭泣着对着水晶球请求帮助………`); // :4808
          await era.printAndWait(`「姐姐救救我吧…好想快点回到村子里去啊………」`); // :4809
        } // :4810
      } else { // :4811
        await era.print(`${player_name}`); // :4812
        if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 5) && era.get('tflag:60')) { // :4813
          await era.print(`向少女搭话后、${target_name}晃动着腰部说起了充满爱意的话语`); // :4814
        } else if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5) && era.get('tflag:60')) { // :4815
          await era.print(`向少女搭话后、${target_name}一边晃着腰一边不停地说着下流的话语`); // :4816
        } else if ((era.get(`palam:${target}:4`) >= era.get('palamlv:4') || era.get(`abl:${target}:10`) >= 5 || era.get(`talent:${target}:85`)) && era.get(`palam:${target}:5`) >= era.get('palamlv:4')) { // :4817
          await era.print(`向少女搭话后、${target_name}发出了`); // :4818
          if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`) || era.get(`tequip:${target}:14`) || era.get(`tequip:${target}:15`) || era.get(`tequip:${target}:16`) || era.get(`tequip:${target}:17`)) { // :4819
            await era.print(`快乐的`); // :4820
          } else if (era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`)) { // :4821
            await era.print(`痛苦的`); // :4822
          } // :4823
          await era.print(`的声音、拼命地向着${player_name}说了起来`); // :4824
        } else if (era.get(`palam:${target}:4`) >= era.get('palamlv:4') || era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 5) { // :4825
          await era.print(`向少女搭话后、${target_name}如同打发无聊一样发起了牢骚`); // :4826
        } else if (era.get(`palam:${target}:4`) >= era.get('palamlv:2') ||  era.get(`abl:${target}:10`) >= 3) { // :4827
          await era.print(`向少女搭话后、${target_name}一点一点地说起了话`); // :4828
        } else { // :4829
          await era.print(`向少女搭话后、${target_name}根本没有听进耳朵里的样子…`); // :4830
        } // :4831
      } // :4832
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4833
      era.set(`cflag:${target}:357`, 1); // :4833
      return 0; // :4834

    } else { // :4836
      if (era.get(`tequip:${target}:53`) == 1) { // :4837

        await era.print(`${player_name}催促着${target_name}进行自我介绍、`); // :4839
        if (era.get(`talent:${target}:89`) || era.get(`abl:${target}:17`) >= 5) { // :4840
          await era.print(`${target_name}将自己的本名和接下来要进行的性体验`); // :4841
          if (era.get(`abl:${target}:31`) >= 3) { // :4843
            await era.print(`、甚至是连自慰时妄想的事情`); // :4843
          } // :4843
          await era.print(`十分欣喜地全部说了出来……`); // :4844
          await era.print(`只因为想象着这个水晶球会散布在村子里，少女的股间就变得湿润起来了……`); // :4845
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4846
          era.set('tflag:32 |', 2); // :4846
        } else if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5)) { // :4847
          await era.print(`${target_name}面向水晶说起了淫猥的话语`); // :4848
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4849
          era.set('tflag:32 |', 2); // :4849
        } else if (era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 3 || era.get(`abl:${target}:11`) >= 4 || era.get(`abl:${target}:17`) >= 2) { // :4850
          await era.print(`${target_name}对着水晶球进行了自我介绍`); // :4851
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :4852
          era.set('tflag:32 |', 2); // :4852
        } else { // :4853
          await era.printAndWait(`哭泣着对着水晶球请求帮助………`); // :4854
          await era.printAndWait(`「姐姐救救我吧…好想快点回到村子里去啊………」`); // :4855
        } // :4856
      } else { // :4857
        await era.print(`${player_name}`); // :4858
        if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 5) && era.get('tflag:60')) { // :4859
          await era.print(`向少女搭话后，${target_name}晃动着腰部说起了充满爱意的话语`); // :4860
        } else if (era.get(`palam:${target}:5`) >= era.get('palamlv:4') && (era.get(`talent:${target}:76`) || era.get(`abl:${target}:11`) >= 5) && era.get('tflag:60')) { // :4861
          await era.print(`向少女搭话后，${target_name}一边晃着腰一边不停地说着下流的话语`); // :4862
        } else if ((era.get(`palam:${target}:4`) >= era.get('palamlv:4') || era.get(`abl:${target}:10`) >= 5 || era.get(`talent:${target}:85`)) && era.get(`palam:${target}:5`) >= era.get('palamlv:4')) { // :4863
          await era.print(`向少女搭话后，${target_name}发出了`); // :4864
          if (era.get(`tequip:${target}:11`) || era.get(`tequip:${target}:13`) || era.get(`tequip:${target}:14`) || era.get(`tequip:${target}:15`) || era.get(`tequip:${target}:16`) || era.get(`tequip:${target}:17`)) { // :4865
            await era.print(`快乐的`); // :4866
          } else if (era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`)) { // :4867
            await era.print(`痛苦的`); // :4868
          } // :4869
          await era.print(`的声音、拼命地向着${player_name}说了起来`); // :4870
        } else if (era.get(`palam:${target}:4`) >= era.get('palamlv:4') || era.get(`talent:${target}:85`) || era.get(`abl:${target}:10`) >= 5) { // :4871
          await era.print(`向少女搭话后，${target_name}如同打发无聊一样发起了牢骚`); // :4872
        } else if (era.get(`palam:${target}:4`) >= era.get('palamlv:2') ||  era.get(`abl:${target}:10`) >= 3) { // :4873
          await era.print(`向少女搭话后，${target_name}十分胆怯地说起了话`); // :4874
        } else { // :4875
          await era.print(`向少女搭话后，${target_name}根本没有听进耳朵里的样子…`); // :4876
        } // :4877
      } // :4878
      return 0; // :4879
    } // :4880
  } // :4881





  if (era_flag.selectcom == 123) { // :4887

    if (era.get(`cflag:${target}:360`) == 0) { // :4889

      if (era.get(`talent:${target}:76`) == 1) { // :4891
        await era.printAndWait(`「啊嗯~…俺会好好地侍奉的…胸部也好嘴巴也好都是主人的东西来的噢${heart(1)}」`); // :4892
        if (era.get(`talent:${target}:109`)) { // :4893
          await era.printAndWait(`「嗯啾呜~…啊啊嗯~${heart(1)}…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~${heart(1)}」`); // :4894
          await era.printAndWait(`${target_name}一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4895
        } else if (era.get(`talent:${target}:110`)) { // :4896
          await era.printAndWait(`「啊哈啊…大大的胸部被侵犯着…还在吮吸着${heart(1)}…好好吃啊~…啊呜呜~${heart(1)}」`); // :4897
          await era.printAndWait(`${target_name}一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4898
        } else if (era.get(`talent:${target}:114`)) { // :4899
          await era.printAndWait(`「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢${heart(1)}…啊嗯呜…嗯呜~嗯~嗯嗯~${heart(1)}」`); // :4900
          await era.printAndWait(`${target_name}一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4901
        } else { // :4902
          await era.printAndWait(`「嗯~…啊啊...能用胸部夹住来侍奉好高兴啊~${heart(1)} 啊呜嗯~…啾呜呜~啾~${heart(1)}」`); // :4903
          await era.printAndWait(`${target_name}一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………`); // :4904
        } // :4905

      } else if (era.get(`talent:${target}:85`) == 1) { // :4907
        await era.printAndWait(`「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…${heart(1)}」`); // :4908
        if (era.get(`talent:${target}:109`)) { // :4909
          await era.printAndWait(`「啊啊嗯~…胸部被一蹭一蹭地呢${heart(1)}…嗯啾~…啾~…啾呜呜~${heart(1)}」`); // :4910
          await era.printAndWait(`${target_name}一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4911
        } else if (era.get(`talent:${target}:110`)) { // :4912
          await era.printAndWait(`「哈呜呜嗯~…胸部好烫啊~${heart(1)}…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…${heart(1)}」`); // :4913
          await era.printAndWait(`${target_name}一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4914
        } else if (era.get(`talent:${target}:114`)) { // :4915
          await era.printAndWait(`「啊哈~…埋进俺的胸部里了呢${heart(1)}…但是看吧…这样做的话就可以看见胸部了…啊唔呜~${heart(1)}」`); // :4916
          await era.printAndWait(`${target_name}一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4917
        } else { // :4918
          await era.printAndWait(`「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~${heart(1)}…哈唔…嗯~嗯嗯~${heart(1)}」`); // :4919
          await era.printAndWait(`${target_name}一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………`); // :4920
        } // :4921

      } else if (era.get(`abl:${target}:16`) >= 3) { // :4923
        await era.printAndWait(`「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」`); // :4924
        if (era.get(`talent:${target}:109`)) { // :4925
          await era.printAndWait(`${target_name}一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4926
        } else if (era.get(`talent:${target}:110`)) { // :4927
          await era.printAndWait(`「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」`); // :4928
          await era.printAndWait(`${target_name}一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4929
        } else if (era.get(`talent:${target}:114`)) { // :4930
          await era.printAndWait(`「啾~…啾呜呜~…只能品尝前面一点而已啊………」`); // :4931
          await era.printAndWait(`${target_name}一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4932
        } else { // :4933
          await era.printAndWait(`${target_name}一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………`); // :4934
        } // :4935

      } else { // :4937
        await era.printAndWait(`「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」`); // :4938
        if (era.get(`talent:${target}:109`)) { // :4939
          await era.printAndWait(`${target_name}往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4940
        } else if (era.get(`talent:${target}:110`)) { // :4941
          await era.printAndWait(`「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」`); // :4942
          await era.printAndWait(`${target_name}一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4943
        } else if (era.get(`talent:${target}:114`)) { // :4944
          await era.printAndWait(`「不要再将我的大胸部当成玩具了啊………」`); // :4945
          await era.printAndWait(`${target_name}一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4946
        } else { // :4947
          await era.printAndWait(`${target_name}一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………`); // :4948
        } // :4949
      } // :4950
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :4951
      era.set(`cflag:${target}:360`, 1); // :4951
      return 0; // :4952

    } else { // :4954

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:360`) <= 4 || era.get('flag:7') == 2)) { // :4956
        await era.printAndWait(`「啊嗯~…俺会好好的侍奉的…胸部也好嘴巴也好都是主人的东西来的噢${heart(1)}」`); // :4957
        if (era.get(`talent:${target}:109`)) { // :4958
          await era.printAndWait(`「嗯啾呜~…啊啊嗯~${heart(1)}…要来了啊…更加的蹭一下吧~…啊唔呜~…啾唔~啾唔呜~${heart(1)}」`); // :4959
          await era.printAndWait(`${target_name}一脸荡漾地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4960
        } else if (era.get(`talent:${target}:110`)) { // :4961
          await era.printAndWait(`「啊哈啊…大大的胸部被侵犯着…还在吮吸着${heart(1)}…好好吃啊~…啊呜呜~${heart(1)}」`); // :4962
          await era.printAndWait(`${target_name}一脸荡漾地、对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4963
        } else if (era.get(`talent:${target}:114`)) { // :4964
          await era.printAndWait(`「得要给在侵犯俺这个超大的胸部的阴茎好好地侍奉才可以呢${heart(1)}…啊嗯呜…嗯呜~嗯~嗯嗯~${heart(1)}」`); // :4965
          await era.printAndWait(`${target_name}一脸荡漾地、对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4966
        } else { // :4967
          await era.printAndWait(`「嗯~…啊啊...能用胸部夹住来侍奉好高兴啊~${heart(1)} 啊呜嗯~…啾呜呜~啾~${heart(1)}」`); // :4968
          await era.printAndWait(`${target_name}一脸荡漾地、用胸部夹住阴茎进行着口腔侍奉………`); // :4969
        } // :4970
        if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :4972
          // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :4972
          era.set(`cflag:${target}:360`, 5); // :4972
        } // :4972

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:360`) <= 3 || era.get('flag:7') == 2)) { // :4974
        await era.printAndWait(`「嗯啾呜~…变得舒服起来吧~…主人的大鸡巴…最喜欢了…${heart(1)}」`); // :4975
        if (era.get(`talent:${target}:109`)) { // :4976
          await era.printAndWait(`「啊啊嗯~…胸部被一蹭一蹭地呢${heart(1)}…嗯啾~…啾~…啾呜呜~${heart(1)}」`); // :4977
          await era.printAndWait(`${target_name}一脸恍惚地、往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4978
        } else if (era.get(`talent:${target}:110`)) { // :4979
          await era.printAndWait(`「哈呜呜嗯~…胸部好烫啊~${heart(1)}…主人的大鸡巴…好热啊…啊嗯~…啾唔~啾唔~…${heart(1)}」`); // :4980
          await era.printAndWait(`${target_name}一脸恍惚地、对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4981
        } else if (era.get(`talent:${target}:114`)) { // :4982
          await era.printAndWait(`「啊哈~…埋进俺的胸部里了呢${heart(1)}…但是看吧…这样做的话就可以看见胸部了…啊唔呜~${heart(1)}」`); // :4983
          await era.printAndWait(`${target_name}一脸恍惚地、对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4984
        } else { // :4985
          await era.printAndWait(`「哈啊…哈啊…俺的胸部…舒服吗？ 嗯呜嗯啾呜~${heart(1)}…哈唔…嗯~嗯嗯~${heart(1)}」`); // :4986
          await era.printAndWait(`${target_name}一脸恍惚地、用胸部夹住阴茎进行着口腔侍奉………`); // :4987
        } // :4988

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:360`) <= 2 || era.get('flag:7') == 2)) { // :4990
        await era.printAndWait(`「嗯~…唔、唔嗯…用俺的胸部和嘴巴…变得舒服起来吧~………啾唔~…啾唔~」`); // :4991
        if (era.get(`talent:${target}:109`)) { // :4992
          await era.printAndWait(`${target_name}一脸很高兴的样子往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :4993
        } else if (era.get(`talent:${target}:110`)) { // :4994
          await era.printAndWait(`「啊啊~…嗯啾呜~…啾噗呜~…啾~啾唔~…啾啪哈啊~…胸部也…好舒服噢~………」`); // :4995
          await era.printAndWait(`${target_name}一脸很高兴的样子对被巨乳夹着的阴茎进行着口腔侍奉………`); // :4996
        } else if (era.get(`talent:${target}:114`)) { // :4997
          await era.printAndWait(`「啾~…啾呜呜~…只能品尝前面一点而已啊………」`); // :4998
          await era.printAndWait(`${target_name}一脸很高兴的样子对埋在爆乳里的阴茎进行着口腔侍奉………`); // :4999
        } else { // :5000
          await era.printAndWait(`${target_name}一脸很高兴的样子用胸部夹住阴茎进行着口腔侍奉………`); // :5001
        } // :5002
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :5003
        era.set(`cflag:${target}:360`, 3); // :5003

      } else if (era.get(`cflag:${target}:360`) <= 1 || era.get('flag:7') == 2) { // :5005
        await era.printAndWait(`「啊呜呜…不要将俺的胸部当成玩具啊………啊啊…呸咯…啾~…啊唔呜………」`); // :5006
        if (era.get(`talent:${target}:109`)) { // :5007
          await era.printAndWait(`${target_name}往用胸部摩擦着的阴茎的前端不断地亲吻着………`); // :5008
        } else if (era.get(`talent:${target}:110`)) { // :5009
          await era.printAndWait(`「我的大胸部…才不是为了这种事情而存在的…嗯呜呜呜………」`); // :5010
          await era.printAndWait(`${target_name}一脸悲伤地对被巨乳夹着的阴茎进行着口腔侍奉………`); // :5011
        } else if (era.get(`talent:${target}:114`)) { // :5012
          await era.printAndWait(`「不要再将我的大胸部当成玩具了啊………」`); // :5013
          await era.printAndWait(`${target_name}一脸悲伤地对埋在爆乳里的阴茎进行着口腔侍奉………`); // :5014
        } else { // :5015
          await era.printAndWait(`${target_name}一脸悲伤地胸用胸部夹住阴茎进行着口腔侍奉………`); // :5016
        } // :5017
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :5018
        era.set(`cflag:${target}:360`, 2); // :5018
      } // :5019
      return 0; // :5020
    } // :5021
  } // :5022



  if (era_flag.selectcom == 125) { // :5026

    if (era.get(`cflag:${target}:361`) == 0) { // :5028

      if (era.get(`talent:${target}:76`) == 1) { // :5030
        await era.printAndWait(`「哈唔嗯…嗯唔嗯唔~…好吃~${heart(1)}…大鸡巴好好吃啊~${heart(1)}…俺的那里也…一抽地${heart(1)}好有感觉呢~${heart(1)}」`); // :5031
        await era.printAndWait(`${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、进行着激烈的自慰………`); // :5032

      } else if (era.get(`talent:${target}:85`) == 1) { // :5034
        await era.printAndWait(`「啊嗯唔…嗯呜…好好吃啊…大鸡巴~${heart(1)}…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢${heart(1)}…啾唔~${heart(1)}」`); // :5035
        await era.printAndWait(`${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、抚摸着自己的股间………`); // :5036

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5038
        await era.printAndWait(`「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」`); // :5039
        await era.printAndWait(`${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`); // :5040

      } else { // :5042
        await era.printAndWait(`「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」`); // :5043
        await era.printAndWait(`${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`); // :5044
      } // :5045
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :5046
      era.set(`cflag:${target}:361`, 1); // :5046
      return 0; // :5047

    } else { // :5049

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:361`) <= 4 || era.get('flag:7') == 2)) { // :5051
        await era.printAndWait(`「哈唔嗯…嗯唔嗯唔~…好吃~${heart(1)}…大鸡巴好好吃啊~${heart(1)}…俺的那里也…一抽地${heart(1)}好有感觉呢~${heart(1)}」`); // :5052
        await era.printAndWait(`${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、进行着激烈的自慰………`); // :5053
        if (era.get(`talent:${target}:0`) == 1) { // :5055
          await era.printAndWait(`「啊啊…快点将俺侵犯了嘛~${heart(1)}…好想要…大鸡巴啊~${heart(1)}…啊唔呜嗯~…啾噜~啾噜~…呸咯~${heart(1)}」`); // :5055
        } // :5055
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :5056
        era.set(`cflag:${target}:361`, 5); // :5056

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:361`) <= 3 || era.get('flag:7') == 2)) { // :5058
        await era.printAndWait(`「啊嗯唔…嗯呜…好好吃啊…大鸡巴~${heart(1)}…嗯~嗯嗯~…哈啊哈啊…啊啊~…大鸡巴~…好喜欢${heart(1)}…啾唔~${heart(1)}」`); // :5059
        await era.printAndWait(`${target_name}十分欣喜地舔舐着${player_name}的阴茎同时、抚摸着自己的股间………`); // :5060
        if (era.get(`talent:${target}:0`) == 1) { // :5062
          await era.printAndWait(`「啊啊…嗯~…啊啊…主人…将俺的处女夺走了吧~${heart(1)}…已经要变得奇怪起来了啊…啊唔呜…嗯~嗯嗯~${heart(1)}」`); // :5062
        } // :5062
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :5063
        era.set(`cflag:${target}:361`, 4); // :5063

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:361`) <= 2 || era.get('flag:7') == 2)) { // :5065
        await era.printAndWait(`「哈啊~…哈啊嗯~…嗯唔~…啾唔~…呸咯~…啊啊…好好地看一下我自慰的样子啦………」`); // :5066
        await era.printAndWait(`${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`); // :5067
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :5068
        era.set(`cflag:${target}:361`, 3); // :5068

      } else if (era.get(`cflag:${target}:361`) <= 1 || era.get('flag:7') == 2) { // :5070
        await era.printAndWait(`「啊呜嗯~…嗯啾呜…哈~…好的…俺会连口交也一起做的…嗯~…嗯唔呜………」`); // :5071
        await era.printAndWait(`${target_name}按照命令的那样吮吸着${player_name}的阴茎的同时、用手指摩擦着自己的股间………`); // :5072
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :5073
        era.set(`cflag:${target}:361`, 2); // :5073
      } // :5074
      return 0; // :5075
    } // :5076
  } // :5077




  if (era_flag.selectcom == 126) { // :5082

    if (era.get(`cflag:${target}:362`) == 0) { // :5084

      if (era.get(`talent:${target}:76`) == 1) { // :5086
        await era.printAndWait(`「大鸡巴…好好吃${heart(1)}…在俺的嘴巴里将精液都射进来吧…主人…${heart(1)}」`); // :5087

      } else if (era.get(`talent:${target}:85`) == 1) { // :5089
        await era.printAndWait(`「主人~…请变得更加舒服起来吧~${heart(1)} 嗯啾~…啾~…啊啊…变得那么硬起来了呀…${heart(1)}」`); // :5090

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5092
        await era.printAndWait(`「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」`); // :5093

      } else { // :5095
        await era.printAndWait(`「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」`); // :5096
      } // :5097
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :5098
      era.set(`cflag:${target}:362`, 1); // :5098
      return 0; // :5099

    } else { // :5101

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:362`) <= 4 || era.get('flag:7') == 2)) { // :5103
        await era.printAndWait(`「大鸡巴…好好吃${heart(1)}…在俺的嘴巴里将精液都射进来吧…主人…${heart(1)}」`); // :5104
        await era.printAndWait(`${target_name}用黏糊糊的舌头缠绕住并且用手撸起了阴茎。`); // :5105
        await era.printAndWait(`「嗯啾呜呜~…感觉到大鸡巴一跳一跳的了呢${heart(1)}…俺会给主人好好地撸的啦…请变得更加舒服起来吧~${heart(1)}」`); // :5106
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :5107
        era.set(`cflag:${target}:362`, 5); // :5107

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:362`) <= 3 || era.get('flag:7') == 2)) { // :5109
        await era.printAndWait(`「主人~…请变得更加舒服起来吧~${heart(1)} 嗯啾~…啾~…啊啊…变得那么硬起来了呀…${heart(1)}」`); // :5110
        await era.printAndWait(`${target_name}用舌头缠绕住了龟头并且慢慢撸起了阴茎。`); // :5111
        await era.printAndWait(`「啾~…啾唔~…啊啊唔…嗯噗~${heart(1)}…嗯呜呜…嗯噗呜…${heart(1)}」`); // :5112
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :5113
        era.set(`cflag:${target}:362`, 4); // :5113

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:362`) <= 2 || era.get('flag:7') == 2)) { // :5115
        await era.printAndWait(`「啊啊唔…嗯~…嗯噗呜~…这样…做的话…会变得…舒服起来的吗…？」`); // :5116
        await era.printAndWait(`${target_name}笨拙地伸出了手开始拼命地侍奉起来了………`); // :5117
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :5118
        era.set(`cflag:${target}:362`, 3); // :5118

      } else if (era.get(`cflag:${target}:362`) <= 1 || era.get('flag:7') == 2) { // :5120
        await era.printAndWait(`「哈啊…哈啊…嗯啾~…啾唔~…好的、俺会…用手让你变得舒服…起来…的………」`); // :5121
        await era.printAndWait(`${target_name}一边笨拙地用手上下撸着一边亲吻龟头前端………`); // :5122
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :5123
        era.set(`cflag:${target}:362`, 2); // :5123
      } // :5124
      return 0; // :5125
    } // :5126
  } // :5127





  if (era_flag.selectcom == 127) { // :5133

    if (era.get(`cflag:${target}:363`) == 0) { // :5135

      if (era.get(`talent:${target}:76`) == 1) { // :5137
        await era.printAndWait(`「嗯啾噜呜~${heart(1)}…啾噗~啾噗~啾噗~…嗯噗呜呜${heart(1)}…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…${heart(1)}」`); // :5138
        await era.printAndWait(`${target_name}嘟着小嘴、一边弄出下流的声响一边吮吸着${player_name}的阴茎。`); // :5139
        await era.printAndWait(`「啊啊…大鸡巴~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`); // :5140

      } else if (era.get(`talent:${target}:85`) == 1) { // :5142
        await era.printAndWait(`「嗯唔~噗唔~${heart(1)}…啾咯噗~…啾噗~${heart(1)}…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~${heart(1)}…呸咯…嗯唔噗呜${heart(1)}」`); // :5143
        await era.printAndWait(`「啊啊…主人的大鸡巴好好吃啊…${heart(1)}」`); // :5144

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5146
        await era.printAndWait(`「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」`); // :5147

      } else { // :5149
        await era.printAndWait(`「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」`); // :5150
      } // :5151
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :5152
      era.set(`cflag:${target}:363`, 1); // :5152
      return 0; // :5153

    } else { // :5155

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:363`) <= 4 || era.get('flag:7') == 2)) { // :5157
        await era.printAndWait(`「嗯啾噜呜~${heart(1)}…啾噗~啾噗~啾噗~…嗯噗呜呜${heart(1)}…呸咯…啾呜呜~…啊啊啊…用俺的嘴巴变得舒服起来吧~…${heart(1)}」`); // :5158
        await era.printAndWait(`${target_name}嘟着小嘴、一边弄出下流的声响一边吮吸着${player_name}的阴茎。`); // :5159
        await era.printAndWait(`「啊啊…大鸡巴~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}」`); // :5160
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :5161
        era.set(`cflag:${target}:363`, 5); // :5161

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:363`) <= 3 || era.get('flag:7') == 2)) { // :5163
        await era.printAndWait(`「嗯唔~噗唔~${heart(1)}…啾咯噗~…啾噗~${heart(1)}…嗯噗呜~…啾呜呜~啾噗~啾呜呜~啾噗~${heart(1)}…呸咯…嗯唔噗呜${heart(1)}」`); // :5164
        await era.printAndWait(`${target_name}嘟着小嘴吮吸着${player_name}的阴茎。`); // :5165
        await era.printAndWait(`「啊啊…主人的大鸡巴好好吃啊…${heart(1)}」`); // :5166
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :5167
        era.set(`cflag:${target}:363`, 4); // :5167

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:363`) <= 2 || era.get('flag:7') == 2)) { // :5169
        await era.printAndWait(`「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…俺会…更加的吮吸的…所以请不要做恐怖的事情啦………」`); // :5170
        await era.printAndWait(`${target_name}因为自己嘴巴弄出的下流的声音而流着眼泪的情况下吮吸着………`); // :5171
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :5172
        era.set(`cflag:${target}:363`, 3); // :5172

      } else if (era.get(`cflag:${target}:363`) <= 1 || era.get('flag:7') == 2) { // :5174
        await era.printAndWait(`「嗯啾噜~…啾噗~…啾噗~…嗯噗呜…啊啊…为什么要俺做这样的事情…好、好的、俺会更加地吮吸的啦…」`); // :5175
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :5176
        era.set(`cflag:${target}:363`, 2); // :5176
      } // :5177
      return 0; // :5178
    } // :5179
  } // :5180




  if (era_flag.selectcom == 69) { // :5185

    if (era.get(`cflag:${target}:364`) == 0) { // :5187

      if (era.get(`talent:${target}:76`) == 1) { // :5189
        await era.print(`「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的`); // :5190
        if (era.get(`talent:${player}:122`) || era.get(`talent:${player}:121`) || (era.get(`talent:${player}:122`) == 0 && era.get('item:PBAND') == 1)) { // :5191
          await era.print(`大鸡巴`); // :5192
        } else { // :5193
          await era.print(`花蕾`); // :5194
        } // :5195
        await era.printAndWait(`的啦~${heart(1)}」`); // :5196
        await era.printAndWait(`${target_name}的小屁股十分可爱地摇晃着往${player_name}的脸上压了下去………`); // :5197

      } else if (era.get(`talent:${target}:85`) == 1) { // :5199
        await era.printAndWait(`「俺会侍奉主人的啦…恶作剧的话…可是不行的噢${heart(1)}…啊啊~嗯啊啊嗯~${heart(1)} 唔～唔噢～～」`); // :5200
        await era.print(`${target_name}吮吸起${player_name}的`); // :5201
        if (era.get(`talent:${player}:122`) || era.get(`talent:${player}:121`)) { // :5202
          await era.print(`阴茎`); // :5203
        } else if (era.get(`talent:${player}:122`) == 0 && era.get('item:PBAND') == 1 && rand_n(3) == 0) { // :5204
          await era.print(`假阳具`); // :5205
        } else { // :5206
          await era.print(`阴唇`); // :5207
        } // :5208
        await era.printAndWait(`，而${player_name}也没有停下来继续着口腔侍奉。`); // :5209

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5211
        await era.printAndWait(`「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」`); // :5212
        await era.printAndWait(`${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`); // :5213

      } else { // :5215
        await era.printAndWait(`「啊嗯~…这样舔不行啊…嗯~、好、好的、俺会好好的舔的啦…………~！」`); // :5216
        await era.printAndWait(`${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`); // :5217
      } // :5218
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :5219
      era.set(`cflag:${target}:364`, 1); // :5219
      return 0; // :5220

    } else { // :5222

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:364`) <= 4 || era.get('flag:7') == 2)) { // :5224
        await era.printAndWait(`「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的大鸡巴的啦~${heart(1)}」`); // :5225
        await era.printAndWait(`${target_name}的小屁股十分可爱地摇晃着往${player_name}的脸上压了下去………`); // :5226
        await era.printAndWait(`「嗯~…啊噗唔~…好舒服啊…主人的大鸡巴居然变得那么雄伟了…俺开动了~${heart(1)}」`); // :5227
        await era.printAndWait(`「嗯啾~…啾噗呜~…咕啾…啊啊…真好吃${heart(1)}…肉棒真好吃${heart(1)}…啊啊也来玩弄我的小穴吧${heart(1)}」`); // :5228
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :5229
        era.set(`cflag:${target}:364`, 5); // :5229

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:364`) <= 3 || era.get('flag:7') == 2)) { // :5231
        await era.printAndWait(`「俺会侍奉主人的啦…恶作剧的话…可是不行的噢${heart(1)}…啊啊~嗯啊啊嗯~${heart(1)} 唔～唔噢～～」`); // :5232
        await era.print(`${target_name}吮吸起${player_name}的`); // :5233
        if (era.get(`talent:${player}:122`) || era.get(`talent:${player}:121`)) { // :5234
          await era.print(`阴茎`); // :5235
        } else if (era.get(`talent:${player}:122`) == 0 && era.get('item:PBAND') == 1 && rand_n(3) == 0) { // :5236
          await era.print(`假阳具`); // :5237
        } else { // :5238
          await era.print(`阴唇`); // :5239
        } // :5240
        await era.printAndWait(`，而${player_name}也没有停下来继续着口腔侍奉。`); // :5241
        await era.printAndWait(`「嗯啾呜~…啾噗~啾噗~…呸咯~${heart(1)}…这里…很舒服对吧…？嗯呜~啊啊~…俺那里也很舒服~${heart(1)}」`); // :5242
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :5243
        era.set(`cflag:${target}:364`, 4); // :5243

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:364`) <= 2 || era.get('flag:7') == 2)) { // :5245
        await era.printAndWait(`「啊啊~…会侍奉不了的啦…不要这么地恶作剧啦…！」`); // :5246
        await era.printAndWait(`${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`); // :5247
        await era.printAndWait(`「啊唔嗯~…嗯~…嗯啾呜~…哈啊…大鸡巴…好好吃啊…嗯啾~啾唔~…呀啊嗯~」`); // :5248
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :5249
        era.set(`cflag:${target}:364`, 3); // :5249

      } else if (era.get(`cflag:${target}:364`) <= 1 || era.get('flag:7') == 2) { // :5251
        await era.printAndWait(`「啊嗯~…嗯噗~…不，不要舔那个地方啦…嗯~…啾唔~…呸咯~…呸咯~…」`); // :5252
        await era.printAndWait(`${target_name}因为在股间不断舔舐的黏糊糊的舌头而颤抖着继续口腔侍奉着………`); // :5253
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :5254
        era.set(`cflag:${target}:364`, 2); // :5254
      } // :5255
      return 0; // :5256
    } // :5257
  } // :5258




  if (era_flag.selectcom == 124) { // :5263

    if (era.get(`cflag:${target}:365`) == 0) { // :5265

      if (era.get(`talent:${target}:76`) == 1) { // :5267
        await era.printAndWait(`「哈啊哈啊…要用俺的喉咙来侍奉了噢${heart(1)} 嗯唔…嗯噗~嗯噗呜~......噗呜呜${heart(1)}」`); // :5268
        await era.printAndWait(`${target_name}用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。`); // :5269
        await era.printAndWait(`「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~${heart(1)}」`); // :5270
        await era.printAndWait(`（大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~${heart(1)}）`); // :5271

      } else if (era.get(`talent:${target}:85`) == 1) { // :5273
        await era.printAndWait(`「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢${heart(1)}」`); // :5274
        await era.printAndWait(`${target_name}舔了舔嘴唇后将阴茎吞进了喉咙深处。`); // :5275
        await era.printAndWait(`「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜${heart(1)}…（好好吃啊…主人的大鸡巴好好吃啊~…${heart(1)}）」`); // :5276

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5278
        await era.printAndWait(`「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」`); // :5279
        await era.printAndWait(`${target_name}拼命地将阴茎吞到了喉咙深处………`); // :5280

      } else { // :5282
        await era.printAndWait(`「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」`); // :5283
        await era.printAndWait(`${target_name}好像很难受的样子但还是将阴茎吞了下去………`); // :5284
      } // :5285
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :5286
      era.set(`cflag:${target}:365`, 1); // :5286
      return 0; // :5287

    } else { // :5289

      if (era.get(`talent:${target}:76`) == 1) { // :5291
        await era.printAndWait(`「哈啊哈啊…要用俺的喉咙来侍奉了噢${heart(1)} 嗯唔…嗯噗~嗯噗呜~......噗呜呜${heart(1)}」`); // :5292
        await era.printAndWait(`${target_name}用嘴唇贴近了龟头、慢慢地将阴茎吞进了喉咙深处。`); // :5293
        await era.printAndWait(`「嗯噗噗唔~…嗯~…嗯~…嗯噗呜~…嗯唔呜呜~…啾呜呜~啾呜呜呜呜~${heart(1)}」`); // :5294
        await era.printAndWait(`（大鸡巴侵犯着喉咙深处呢…脑袋的变得晕乎乎起来了啊~${heart(1)}）`); // :5295

      } else if (era.get(`talent:${target}:85`) == 1) { // :5297
        await era.printAndWait(`「嗯哈啊啊嗯~…大鸡巴~…全部都要吞下了噢${heart(1)}」`); // :5298
        await era.printAndWait(`${target_name}舔了舔嘴唇后将阴茎吞进了喉咙深处。`); // :5299
        await era.printAndWait(`「嗯唔唔~…嗯~嗯噗呜~…嗯~嗯~呜呜呜呜${heart(1)}…（好好吃啊…主人的大鸡巴好好吃啊~…${heart(1)}）」`); // :5300

      } else if (era.get(`abl:${target}:16`) >= 3) { // :5302
        await era.printAndWait(`「啊啊嗯~…嗯噗~…嗯噗呜~…呜哈啊…哈啊哈啊…俺会…全部都吃下去的…嗯~嗯唔呜呜~♪」`); // :5303
        await era.printAndWait(`${target_name}拼命地将阴茎吞到了喉咙深处………`); // :5304

      } else { // :5306
        await era.printAndWait(`「嗯唔呜呜…嗯~…嗯~…嗯噗呜呜…~…好、好的~…俺会…全部都吃下去的…嗯噗呜…嗯噗呜呜~」`); // :5307
        await era.printAndWait(`${target_name}好像很难受的样子但还是将阴茎吞了下去………`); // :5308
      } // :5309
      return 0; // :5310
    } // :5311
  } // :5312







  if (era_flag.selectcom == 80) { // :5320

    if (era.get(`cflag:${target}:381`) == 0) { // :5322

      if (era.get(`abl:${target}:16`) >= 3) { // :5324
        await era.printAndWait(`「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」`); // :5325
        await era.printAndWait(`${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`); // :5326

      } else { // :5328
        await era.printAndWait(`「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」`); // :5329
        await era.printAndWait(`${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`); // :5330
      } // :5331
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :5332
      era.set(`cflag:${target}:381`, 1); // :5332
      return 0; // :5333

    } else { // :5335

      if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:381`) <= 4 || era.get('flag:7') == 2)) { // :5337
        await era.printAndWait(`「嗯噗~嗯噗呜~${heart(1)}…嗯~嗯~嗯唔呜呜~…嗯噗呜~…嗯噗呜~${heart(1)}…嗯啾噜呜~啾噗呜~${heart(1)}」`); // :5338
        await era.printAndWait(`（啊啊…连俺的喉咙…都变成主人的东西了~${heart(1)}…大鸡巴好好吃啊~…${heart(1)}）`); // :5339
        await era.printAndWait(`${target_name}一脸恍惚地被侵犯着喉咙深处………`); // :5340

      } else if (era.get(`talent:${target}:85`) == 1 && era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:381`) <= 3 || era.get('flag:7') == 2)) { // :5342
        await era.printAndWait(`「嗯噗~…嗯唔~…嗯噗呜无~…嗯~嗯~呜呜呜~${heart(1)}…嗯~…嗯噗~…啊啊~…更加地…做吧~…${heart(1)}」`); // :5343
        await era.printAndWait(`${target_name}流着眼泪用喉咙深处来侍奉着${master_name}的阴茎………`); // :5344
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :5345
        era.set(`cflag:${target}:381`, 4); // :5345

      } else if (era.get(`abl:${target}:16`) >= 3 && (era.get(`cflag:${target}:381`) <= 2 || era.get('flag:7') == 2)) { // :5347
        await era.printAndWait(`「俺…俺会…努力的…所以请不要太粗鲁地…呜~呜唔~呜呜…嗯呜呜呜~！」`); // :5348
        await era.printAndWait(`${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`); // :5349
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :5350
        era.set(`cflag:${target}:381`, 3); // :5350

      } else if (era.get(`cflag:${target}:381`) <= 1 || era.get('flag:7') == 2) { // :5352
        await era.printAndWait(`「嗯噗呜呜~！？嗯~…嗯噗~…恩呜呜呜呜呜~…不、不要…嗯唔呜呜~！」`); // :5353
        await era.printAndWait(`${target_name}因为喉咙深处被强硬地塞进了阴茎而翻起了白眼………`); // :5354
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :5355
        era.set(`cflag:${target}:381`, 2); // :5355
      } // :5356
      return 0; // :5357
    } // :5358
  } // :5359






  if (era_flag.selectcom == 87) { // :5366


    if (era.get(`cflag:${target}:348`) == 0) { // :5369

      if (era_flag.assi > 0 && era_flag.assiplay) { // :5371
        await era.print(''); // :5372

      } else if (era.get(`talent:${target}:76`) == 1) { // :5374

        if (era.get(`cflag:${target}:7`) & P) { // :5376
          await era.printAndWait(`「呜~…啊呜~！」`); // :5377
          await era.printAndWait(`${target_name}因为在皮肤上第一次穿孔而发出了悲鸣。`); // :5378

          if (P == 1) { // :5380
            await era.printAndWait(`「啊嗯~…乳头变得太敏感了真是令人苦恼啊~${heart(1)}」`); // :5381
            await era.printAndWait(`${target_name}轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………`); // :5382

          } else if (P == 2) { // :5384
            await era.printAndWait(`「嗯哼哼、真时髦啊，好棒呢~${heart(1)}」`); // :5385
            await era.printAndWait(`${target_name}抚摸着肚子的周围………`); // :5386

          } else if (P == 4) { // :5388
            await era.printAndWait(`「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~${heart(1)}」`); // :5389
            await era.printAndWait(`${target_name}因为阴唇环的刺激而发情了………`); // :5390

          } else if (P == 8) { // :5392
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5393
              await era.printAndWait(`「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」`); // :5394
              await era.printAndWait(`${target_name}的阴茎被装上了阴茎环、一脸恍惚的样子………`); // :5395
            } else { // :5396
              await era.printAndWait(`「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊${heart(1)}」`); // :5397
              await era.printAndWait(`${target_name}的阴蒂被装上了阴蒂环、一脸恍惚的样子………`); // :5398
            } // :5399

          } else if (P == 16) { // :5401
            await era.printAndWait(`「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」`); // :5402
            await era.printAndWait(`${target_name}如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………`); // :5403

          } else if (P == 32) { // :5405
            await era.printAndWait(`「啊哈哈~…有种大人的感觉~♪」`); // :5406
            await era.printAndWait(`${target_name}舔着在嘴唇上的唇环确认着唇环的样子………`); // :5407

          } else if (P == 64) { // :5409
            await era.printAndWait(`「呐呐…这样子真的很漂亮吗？…？」`); // :5410
            await era.printAndWait(`${target_name}被戴上了鼻环后，不断地抿着鼻子………`); // :5411
          } // :5412

        } else { // :5414
          await era.printAndWait(`${target_name}取掉环后，不停地摩擦着环的痕迹………`); // :5415
        } // :5416

      } else if (era.get(`talent:${target}:85`) == 1) { // :5418

        if (era.get(`cflag:${target}:7`) & P) { // :5420
          await era.printAndWait(`「啊~…啊呜~！」`); // :5421
          await era.printAndWait(`${target_name}因为在皮肤上第一次穿孔而发出了小小的悲鸣。`); // :5422

          if (P == 1) { // :5424
            await era.printAndWait(`「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~${heart(1)}」`); // :5425
            await era.printAndWait(`${target_name}让两个乳头勃起来、乳环晃动了一下发出了光芒………`); // :5426

          } else if (P == 2) { // :5428
            await era.printAndWait(`「真是美妙的礼物啊，真是非常感谢呢♪」`); // :5429
            await era.printAndWait(`${target_name}抚摸着带上环的肚脐周围………`); // :5430

          } else if (P == 4) { // :5432
            await era.printAndWait(`「俺、俺的身体…变得太色情了啊…啊…啊啊…${heart(1)}」`); // :5433
            await era.printAndWait(`${target_name}的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………`); // :5434

          } else if (P == 8) { // :5436
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5437
              await era.printAndWait(`「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…${heart(1)}」`); // :5438
              await era.printAndWait(`${target_name}的阴茎的被穿上了阴茎环、脸颊变得通红起来了………`); // :5439
            } else { // :5440
              await era.printAndWait(`「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…${heart(1)}」`); // :5441
              await era.printAndWait(`${target_name}的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………`); // :5442
            } // :5443

          } else if (P == 16) { // :5445
            await era.printAndWait(`「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」`); // :5446
            await era.printAndWait(`${target_name}直勾勾地看着在自己舌尖上的舌环………`); // :5447

          } else if (P == 32) { // :5449
            await era.printAndWait(`「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…${heart(1)}」`); // :5450
            await era.printAndWait(`${target_name}舔着在嘴唇上的唇环确认着唇环的样子后、向${player_name}撒娇起来了~………`); // :5451

          } else if (P == 64) { // :5453
            await era.printAndWait(`「呐啊…这样适合吗？………这样真的跟俺合适吗？」`); // :5454
            await era.printAndWait(`${target_name}被戴上了鼻环后，不断地抿着鼻子………`); // :5455
          } // :5456

        } else { // :5458
          await era.printAndWait(`${target_name}取掉环后，好像很寂寞地摩擦着环的痕迹………`); // :5459
        } // :5460

      } else { // :5462

        if (era.get(`cflag:${target}:7`) & P) { // :5464
          await era.printAndWait(`「不要~…啊~啊呀啊啊啊啊~！」`); // :5465
          await era.printAndWait(`${target_name}因为在皮肤上第一次穿孔而发出了悲鸣、流下了眼泪。`); // :5466

          if (P == 1) { // :5468
            await era.printAndWait(`「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」`); // :5469
            await era.printAndWait(`${target_name}因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………`); // :5470

          } else if (P == 2) { // :5472
            await era.printAndWait(`「哈啊哈啊…这样的才没有问题呢………」`); // :5473
            await era.printAndWait(`${target_name}因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………`); // :5474

          } else if (P == 4) { // :5476
            await era.printAndWait(`「呀嗯~…呀啊…好过分啊…这样的………」`); // :5477
            await era.printAndWait(`${target_name}因为阴唇穿了环而流下了眼泪………`); // :5478

          } else if (P == 8) { // :5480
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5481
              await era.printAndWait(`「不要啊…为什么…为什么啊…这样的绝对不要啊！」`); // :5482
              await era.printAndWait(`${target_name}的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………`); // :5483
            } else { // :5484
              await era.printAndWait(`「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」`); // :5485
              await era.printAndWait(`${target_name}的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………`); // :5486
            } // :5487

          } else if (P == 16) { // :5489
            await era.printAndWait(`「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」`); // :5490
            await era.printAndWait(`${player_name}将正在哭泣的${target_name}的舌头抓住、确定着舌环的位置………`); // :5491

          } else if (P == 32) { // :5493
            await era.printAndWait(`「呜呜………已经，请原谅我吧………」`); // :5494
            await era.printAndWait(`${target_name}的嘴唇被穿上了环、唇环微微地散发着光芒………`); // :5495

          } else if (P == 64) { // :5497
            await era.printAndWait(`「俺，俺才…不是家畜来的…是人类来的啊………」`); // :5498
            await era.printAndWait(`${target_name}被穿上了如同牛的鼻环一样的环而流下了眼泪………`); // :5499
          } // :5500

        } else { // :5502
          await era.printAndWait(`${target_name}擦拭着取下环后的痕迹………`); // :5503
        } // :5504
      } // :5505
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :5506
      era.set(`cflag:${target}:348`, 1); // :5506
      return 0; // :5507

    } else { // :5509

      if (era_flag.assi > 0 && era_flag.assiplay) { // :5511
        await era.print(''); // :5512

      } else if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:348`) <= 3 || era.get('flag:7') == 2)) { // :5514

        if (era.get(`cflag:${target}:7`) & P) { // :5516

          if (P == 1) { // :5518
            await era.printAndWait(`「啊嗯~…乳头变得太敏感了真是令人苦恼啊~${heart(1)}」`); // :5519
            await era.printAndWait(`${target_name}轻轻地摇晃着胸部。勃起的乳头上的乳环发出了微微的光芒………`); // :5520

          } else if (P == 2) { // :5522
            await era.printAndWait(`「嗯哼哼、真时髦啊，好棒呢~${heart(1)}」`); // :5523
            await era.printAndWait(`${target_name}抚摸着肚子的周围………`); // :5524

          } else if (P == 4) { // :5526
            await era.printAndWait(`「啊啊…啊啊…被做了这样的事情后…就只能考虑SEX的事情了啊~${heart(1)}」`); // :5527
            await era.printAndWait(`${target_name}因为阴唇环的刺激而发情了………`); // :5528

          } else if (P == 8) { // :5530
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5531
              await era.printAndWait(`「大鸡巴居然变得那么雄伟起来了…啊啊、好想快点SEX啊~♪」`); // :5532
              await era.printAndWait(`${target_name}的阴茎被装上了阴茎环、一脸恍惚的样子………`); // :5533
            } else { // :5534
              await era.printAndWait(`「呀~…呀啊嗯~…太有感觉了…要一直都勃起来了啊${heart(1)}」`); // :5535
              await era.printAndWait(`${target_name}的阴蒂被装上了阴蒂环、一脸恍惚的样子………`); // :5536
            } // :5537

          } else if (P == 16) { // :5539
            await era.printAndWait(`「嗯啊啊嗯~…这样口交的话就真的会变得舒服起来吗？」`); // :5540
            await era.printAndWait(`${target_name}如同展示着处于舌尖的舌环一样十分下流得舔着嘴唇………`); // :5541

          } else if (P == 32) { // :5543
            await era.printAndWait(`「啊哈哈~…有种大人的感觉~♪」`); // :5544
            await era.printAndWait(`${target_name}舔着在嘴唇上的唇环确认着唇环的样子………`); // :5545

          } else if (P == 64) { // :5547
            await era.printAndWait(`「呐呐…这样子真的很漂亮吗？…？」`); // :5548
            await era.printAndWait(`${target_name}被戴上了鼻环后，不断地抿着鼻子………`); // :5549
          } // :5550

        } else { // :5552
          await era.printAndWait(`${target_name}取掉环后，不停地摩擦着环的痕迹………`); // :5553
        } // :5554
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :5555
        era.set(`cflag:${target}:348`, 4); // :5555

      } else if (era.get(`talent:${target}:85`) == 1 && (era.get(`cflag:${target}:348`) <= 2 || era.get('flag:7') == 2)) { // :5557

        if (era.get(`cflag:${target}:7`) & P) { // :5559

          if (P == 1) { // :5561
            await era.printAndWait(`「俺的乳头…请好好地…更加地疼爱俺的乳头吧~…主人~${heart(1)}」`); // :5562
            await era.printAndWait(`${target_name}让两个乳头勃起来、乳环晃动了一下发出了光芒………`); // :5563

          } else if (P == 2) { // :5565
            await era.printAndWait(`「真是美妙的礼物啊，真是非常感谢呢♪」`); // :5566
            await era.printAndWait(`${target_name}抚摸着带上环的肚脐周围………`); // :5567

          } else if (P == 4) { // :5569
            await era.printAndWait(`「俺、俺的身体…变得太色情了啊…啊…啊啊…${heart(1)}」`); // :5570
            await era.printAndWait(`${target_name}的阴唇打上了阴唇环之后阴唇好像被伸长了一样、爱液从大腿内侧流下来了………`); // :5571

          } else if (P == 8) { // :5573
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5574
              await era.printAndWait(`「哈啊哈哈…被戴上了环之后…大鸡巴太有感觉了啊…${heart(1)}」`); // :5575
              await era.printAndWait(`${target_name}的阴茎的被穿上了阴茎环、脸颊变得通红起来了………`); // :5576
            } else { // :5577
              await era.printAndWait(`「哈啊哈啊…俺、俺要…要变得奇怪起来了…要变不回去了啊~…${heart(1)}」`); // :5578
              await era.printAndWait(`${target_name}的阴蒂被穿上了阴蒂环、脸颊变得通红起来了………`); // :5579
            } // :5580

          } else if (P == 16) { // :5582
            await era.printAndWait(`「嗯啊嗯~…嗯哼…怎么样啊~…跟俺合适吗~？」`); // :5583
            await era.printAndWait(`${target_name}直勾勾地看着在自己舌尖上的舌环………`); // :5584

          } else if (P == 32) { // :5586
            await era.printAndWait(`「啊啊…想要在俺变漂亮的嘴唇上…被好好地亲吻一顿啊~…${heart(1)}」`); // :5587
            await era.printAndWait(`${target_name}舔着在嘴唇上的唇环确认着唇环的样子后、向${player_name}撒娇起来了~………`); // :5588

          } else if (P == 64) { // :5590
            await era.printAndWait(`「呐啊…这样适合吗？………这样真的跟俺合适吗？」`); // :5591
            await era.printAndWait(`${target_name}被戴上了鼻环后，不断地抿着鼻子………`); // :5592
          } // :5593

        } else { // :5595
          await era.printAndWait(`${target_name}好像有点寂寞似的抚摸着取掉环的伤痕………`); // :5596
        } // :5597
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :5598
        era.set(`cflag:${target}:348`, 3); // :5598

      } else if (era.get(`cflag:${target}:348`) <= 1 || era.get('flag:7') == 2) { // :5600

        if (era.get(`cflag:${target}:7`) & P) { // :5602

          if (P == 1) { // :5604
            await era.printAndWait(`「哈啊…哈啊…不要啊…乳头…已经要坏掉了啊………」`); // :5605
            await era.printAndWait(`${target_name}因为穿上乳头上的乳环而带来的强烈的疼痛而流下了眼泪………`); // :5606

          } else if (P == 2) { // :5608
            await era.printAndWait(`「哈啊哈啊…这样的才没有问题呢………」`); // :5609
            await era.printAndWait(`${target_name}因为穿上肚脐上的环而带来的强烈的疼痛而流下了眼泪………`); // :5610

          } else if (P == 4) { // :5612
            await era.printAndWait(`「呀嗯~…呀啊…好过分啊…这样的………」`); // :5613
            await era.printAndWait(`${target_name}因为阴唇穿了环而流下了眼泪………`); // :5614

          } else if (P == 8) { // :5616
            if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :5617
              await era.printAndWait(`「不要啊…为什么…为什么啊…这样的绝对不要啊！」`); // :5618
              await era.printAndWait(`${target_name}的阴茎被穿上了环、用魔力是取不下来的特质阴茎环微微地发着光芒………`); // :5619
            } else { // :5620
              await era.printAndWait(`「啊~…啊啊啊…这样的…俺要忍不住了…坏掉了呜…要坏掉了啊呜………」`); // :5621
              await era.printAndWait(`${target_name}的阴蒂被穿上了环、用魔力是取不下来的特质阴蒂环微微地发着光芒………`); // :5622
            } // :5623

          } else if (P == 16) { // :5625
            await era.printAndWait(`「为什么啊…被做这样的事情的话……嗯噗…噗唔~…呜呜…呜呜呜呜呜~………」`); // :5626
            await era.printAndWait(`${player_name}将正在哭泣的${target_name}的舌头抓住、确定着舌环的位置………`); // :5627

          } else if (P == 32) { // :5629
            await era.printAndWait(`「呜呜………已经，请原谅我吧………」`); // :5630
            await era.printAndWait(`${target_name}的嘴唇被穿上了环、唇环微微地散发着光芒………`); // :5631

          } else if (P == 64) { // :5633
            await era.printAndWait(`「俺，俺才…不是家畜来的…是人类来的啊………」`); // :5634
            await era.printAndWait(`${target_name}被穿上了如同牛的鼻环一样的环而流下了眼泪………`); // :5635
          } // :5636

        } else { // :5638
          await era.printAndWait(`${target_name}擦拭着取下环后的痕迹………`); // :5639
        } // :5640
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :5641
        era.set(`cflag:${target}:348`, 2); // :5641
      } // :5642
    } // :5643
    return 0; // :5644
  } // :5645








}

// @KOJO_MESSAGE_PALAMCNG_5 // :5654
async function KOJO_MESSAGE_PALAMCNG_5() {

  if (era_flag.assi > 0 && era_flag.assiplay) { // :5657
    return 0; // :5657
  } // :5657

  if (era.get(`tequip:${target}:45`)) { // :5660
    return 0; // :5660
  } // :5660

  if (era.get('tflag:899')) { // :5663
    return 0; // :5663
  } // :5663

  if (era.get(`tequip:${target}:89`)) { // :5666
    return 0; // :5666
  } // :5666

  if (era.get(`tequip:${target}:90`)) { // :5669
    return 0; // :5669
  } // :5669

  if (era.get(`tequip:${target}:55`)) { // :5671
    return 0; // :5672
  } // :5673

  if (era.get(`talent:${target}:9`) == 1) { // :5676
    return 0; // :5676
  } // :5676








  // 赋值 A = UP:11 + UP:12 // :5685
  if (era.get('tflag:3') == 1 && era.get(`cflag:${target}:229`) == 0) { // :5686

    if (era.get('tflag:20') == 1) { // :5688

      if (era.get(`talent:${target}:76`) == 1 && (A < 500 || era.get('tflag:150') == 1)) { // :5690
        await era.printAndWait(`「主人的肉棒…把我征服了啊…啊啊…哈嗯…${heart(1)}」`); // :5691
        await era.printAndWait(`${target_name}的小穴一边颤抖、一边紧紧吸住${master_name}的阴茎………`); // :5692

      } else if (era.get(`talent:${target}:85`) == 1 && (A < 500 || era.get('tflag:150') == 1)) { // :5694
        await era.printAndWait(`「主人的…进到小穴里面…啊呜…更加…激烈地…所以不要紧的啊啊…」`); // :5695
        await era.printAndWait(`${target_name}那还未成熟的小穴勉强接受了${master_name}的阴茎………`); // :5696

      } else { // :5698
        await era.printAndWait(`被破处的疼痛难以承受、使得${target_name}咬着嘴唇哭泣。`); // :5699
        await era.printAndWait(`「呜呜…好疼啊…拔出去…拔出去啊………」`); // :5700
      } // :5701

    } else { // :5703

      if (era.get(`talent:${target}:76`) == 1) { // :5705
        await era.printAndWait(`「哈啊…哈啊啊………比想象的要来的不疼啊、这个」`); // :5706
        await era.printAndWait(`「但是下次…主人的肉棒…请侵犯我的小穴${heart(1)}」`); // :5707
        await era.printAndWait(`${target_name}一边流着泪一边说出值得赞扬的话………`); // :5708

      } else if (era.get(`talent:${target}:85`) == 1) { // :5710
        await era.printAndWait(`「啊啊…要是主人的…肉、肉棒…该多好………」`); // :5711
        await era.printAndWait(`${target_name}看起来有些悲伤………`); // :5712

      } else { // :5714
        await era.printAndWait(`「这、这样的…不要…啊咕…呼…呜呜呜…………」`); // :5715
        await era.printAndWait(`被破处的疼痛难以承受、使得${target_name}咬着嘴唇哭泣。`); // :5716
      } // :5717
    } // :5718
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :5719
    era.set(`cflag:${target}:229`, 1); // :5719
  } // :5720




  // 赋值 P = PALAM:3 + UP:3 // :5725
  if (P > era.get('palamlv:2') && era.get(`cflag:${target}:221`) == 0) { // :5726

    if (era.get(`talent:${target}:85`) == 1) { // :5728

      if (era_flag.selectcom == 50) { // :5730
        await era.printAndWait(`倒在${target_name}身上的润滑油让她不知如何是好………`); // :5731
        await era.printAndWait(`「咿呀…有、有点冷………啊啊…黏糊糊的………」`); // :5732
        await era.printAndWait(`―――润滑第一次超过了LV2。`); // :5733

      } else { // :5735
        await era.printAndWait(`「哈…哈…啊…已经这么湿了………」`); // :5736
        await era.printAndWait(`从${target_name}淌出的蜜汁让她不知如何是好………`); // :5737
        await era.printAndWait(`―――润滑第一次超过了LV2。`); // :5738
      } // :5739

    } else { // :5741

      if (era_flag.selectcom == 50) { // :5743
        await era.printAndWait(`倒在${target_name}身上的润滑油让她不知如何是好………`); // :5744
        await era.printAndWait(`「住、住手…好冷…这、这黏乎乎的是什么呀………」`); // :5745
        await era.printAndWait(`―――润滑第一次超过了LV2。`); // :5746

      } else { // :5748
        await era.printAndWait(`「住…住手…不要看…不要看啊………」`); // :5749
        await era.printAndWait(`${target_name}的小穴滴落着蜜汁、现在这种从来没有过的身体反应让少女不知如何是好………`); // :5750
        await era.printAndWait(`―――润滑第一次超过了LV2。`); // :5751
      } // :5752
    } // :5753
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :5754
    era.set(`cflag:${target}:221`, 1); // :5754
  } // :5755




  // 赋值 P = PALAM:5 + UP:5 // :5760
  if (P > era.get('palamlv:2') && era.get(`cflag:${target}:222`) == 0) { // :5761

    if (era.get(`talent:${target}:85`) == 1) { // :5763

      if (era_flag.selectcom == 51) { // :5765
        await era.printAndWait(`「哈…啊…好、好奇怪…想要抱紧…主人的…心情…要溢出来了………」`); // :5766
        await era.printAndWait(`${target_name}咽下令人变得坦率的媚药。药好像马上就见效了。`); // :5767
        await era.printAndWait(`「主人啊…啊~哈~…请抱住我………」`); // :5768
        await era.printAndWait(`―――欲情第一次超过了LV2。`); // :5769

      } else { // :5771
        await era.printAndWait(`「主人啊…我、我…主人的…想、想要………」`); // :5772
        await era.printAndWait(`${target_name}的眼睛向上翻着、像是索求着什么而催促着………`); // :5773
        await era.printAndWait(`―――欲情第一次超过了LV2。`); // :5774
      } // :5775

    } else { // :5777

      if (era_flag.selectcom == 51) { // :5779
        await era.printAndWait(`「呜…咳咳…你、你让我喝了什么！………咕哎！？」`); // :5780
        await era.printAndWait(`${target_name}被强迫着喝下媚药、不知如何是好、药好像马上就见效了。`); // :5781
        await era.printAndWait(`「不要啊…怎么回事…我的身体…变得…奇怪…了」`); // :5782
        await era.printAndWait(`―――欲情第一次超过了LV2。`); // :5783

      } else { // :5785
        await era.printAndWait(`「啊呜…咕…总觉得哪里变得好奇怪…到底是什么啊………」`); // :5786
        await era.printAndWait(`${target_name}的脸红红的、两只手扭扭捏捏不知道该放在哪里………`); // :5787
        await era.printAndWait(`―――欲情第一次超过了LV2。`); // :5788
      } // :5789
    } // :5790
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :5791
    era.set(`cflag:${target}:222`, 1); // :5791
  } // :5792




  // 赋值 P = PALAM:8 + UP:8 // :5797
  if (P > era.get('palamlv:2') && era.get(`cflag:${target}:223`) == 0) { // :5798

    if (era.get(`talent:${target}:85`) == 1) { // :5800
      await era.printAndWait(`「啊…真、真是的…不要…主人………」`); // :5801
      await era.printAndWait(`察觉到了自己正在做多么丢脸的事………`); // :5802
      await era.printAndWait(`―――耻情第一次超过了LV2。`); // :5803

    } else { // :5805
      await era.printAndWait(`「住…住手…不要看啊………」`); // :5806
      await era.printAndWait(`暴露着屈辱的姿态的${target_name}发出悲鸣………`); // :5807
      await era.printAndWait(`―――耻情第一次超过了LV2。`); // :5808
    } // :5809
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :5810
    era.set(`cflag:${target}:223`, 1); // :5810
  } // :5811




  // 赋值 P = PALAM:10 + UP:10 // :5816
  if (P > era.get('palamlv:2') && era.get(`cflag:${target}:224`) == 0) { // :5817

    if (era.get(`talent:${target}:85`) == 1) { // :5819
      await era.printAndWait(`「啊啊…拜托你了…再、再这样下去………」`); // :5820
      await era.printAndWait(`${target_name}对调教的残酷感到恐怖………`); // :5821
      await era.printAndWait(`―――恐怖第一次超过了LV2。`); // :5822

    } else { // :5824
      await era.printAndWait(`「已…已经…不要啊…好可怕啊………」`); // :5825
      await era.printAndWait(`${target_name}对调教的残酷感到恐怖………`); // :5826
      await era.printAndWait(`―――恐怖第一次超过了LV2。`); // :5827
    } // :5828
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :5829
    era.set(`cflag:${target}:224`, 1); // :5829
  } // :5830




  if (era.get('nowex:0') > 0 && era.get(`cflag:${target}:225`) == 0) { // :5835

    if (era.get(`talent:${target}:85`) == 1) { // :5837
      await era.printAndWait(`「哈…啊…不要…住、住手…再这样下去…啊哈啊啊啊啊~${heart(1)}」`); // :5838
      await era.printAndWait(`${target_name}尝到了刺激阴蒂达到初次高潮的滋味。`); // :5839
      await era.printAndWait(`「哈~${heart(1)}…哈~${heart(1)}…哈~${heart(1)}…主人…再…${heart(1)}」`); // :5840
      await era.printAndWait(`少女贪婪地索求着进一步的快感………`); // :5841

    } else { // :5843
      await era.printAndWait(`「啊…哈…嘻…哈啊啊啊啊啊啊啊！」`); // :5844
      await era.printAndWait(`${target_name}尝到了刺激阴蒂达到初次高潮的滋味。`); // :5845
      await era.printAndWait(`「什…什么…这…什么啊…哈…啊…啊啊啊啊…」`); // :5846
      await era.printAndWait(`少女沉浸在第一次高潮的余韵里、显得有些困惑………`); // :5847
    } // :5848
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :5849
    era.set(`cflag:${target}:225`, 1); // :5849
  } // :5850




  if (era.get('nowex:1') > 0 && era.get(`cflag:${target}:226`) == 0) { // :5855

    if (era.get(`talent:${target}:76`) == 1) { // :5857
      await era.printAndWait(`「啊啊啊小穴${heart(1)} 来嘛${heart(1)} 小穴不行呜呜呜${heart(3)}」`); // :5858
      await era.printAndWait(`${target_name}的阴道里被阴茎插入发出了第一次阴道高潮的叫声、阴道口痉挛似的缩紧了。`); // :5859
      await era.printAndWait(`「啊啊啊…我的小穴…已经记住肉棒的味道了啊…${heart(1)} 想要尝更多的肉棒…要去了…${heart(1)}」`); // :5860
      await era.printAndWait(`${target_name}翻着白眼沉浸在高潮的余韵里………`); // :5861

    } else if (era.get(`talent:${target}:85`) == 1) { // :5863
      await era.printAndWait(`「啊嘻呀啊啊…要、要来了${heart(1)}…肉棒就在身边呜${heart(1)}」`); // :5864
      await era.printAndWait(`${target_name}的阴道里被阴茎插入发出了第一次阴道高潮的叫声、阴道口痉挛似的缩紧了。`); // :5865
      await era.printAndWait(`「咿嘻…啊啊…主人…咿…去了呢…现在…厉害的要来了…${heart(1)}」`); // :5866
      await era.printAndWait(`${target_name}品味着余韵、向${player_name}撒着娇………`); // :5867

    } else { // :5869
      await era.printAndWait(`「啊…嘻咿…不、不要…嘻咿…要、要变得奇怪了…我…我…啊啊啊啊~！」`); // :5870
      await era.printAndWait(`${target_name}尝到了刺激阴道达到初次高潮的滋味、表情呆滞地沉浸在高潮的余韵里。`); // :5871
      await era.printAndWait(`「啊啊…这是什么啊…身体…还真是可笑啊………」`); // :5872
    } // :5873
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :5874
    era.set(`cflag:${target}:226`, 1); // :5874

  } else if (era.get('nowex:1') > 0 && era.get(`cflag:${target}:226`) == 1) { // :5876

    if (era.get(`talent:${target}:76`) == 1 && era.get('tflag:60') == 1) { // :5878
      await era.printAndWait(`「啊呜呜…小穴要去了…去了啊${heart(1)} 肉棒让我的小穴好舒服${heart(1)}」`); // :5879
      await era.printAndWait(`${target_name}的阴道里被阴茎插入发出了高潮的叫声、阴道口痉挛似的缩紧了。`); // :5880
      await era.printAndWait(`「肉棒好棒…没有什么比肉棒更好了啊…${heart(1)}」`); // :5881
      await era.printAndWait(`${target_name}露出完全成为了雌性的脸………`); // :5882

    } else if (era.get(`talent:${target}:85`) == 1 && era.get('tflag:60') == 1) { // :5884
      await era.printAndWait(`「啊啊啊…不、不可以哟${heart(1)}…如、如果再这样动下去的话${heart(1)}…哎呀啊那样啊嗯…咿嘻咕咿咿${heart(1)}」`); // :5885
      await era.printAndWait(`${target_name}一被阴茎插入阴道深处就发出了绝顶的呻吟声、痉挛似的收紧了阴道口。`); // :5886
      await era.printAndWait(`「啊…主人${heart(1)} 要去了…已经…小穴要去了啊…${heart(1)}」`); // :5887
      await era.printAndWait(`${target_name}双腿痉挛、品味着余韵………`); // :5888

    } else { // :5890
      await era.printAndWait(`「啊…嘻咿…不、不要…已…已经…小穴要不行了…嗯嘻嘻呀、要去了啊！」`); // :5891
      await era.printAndWait(`${target_name}尝到了刺激阴道达到高潮的滋味、表情呆滞地沉浸在高潮的余韵里。`); // :5892
    } // :5893
  } // :5894




  if (era.get('nowex:2') > 0 && era.get(`cflag:${target}:227`) == 0) { // :5899

    if (era.get(`talent:${target}:76`) == 1) { // :5901
      await era.printAndWait(`「呀哈${heart(1)}…啊啊啊嘻呀${heart(1)}…肛门要去了${heart(1)} 屁股小穴要去了啊${heart(1)}」`); // :5902
      await era.printAndWait(`${target_name}品味着出生以来的第一次肛门高潮。腰在快感中颤抖、肛门一次又一次地抽动这。`); // :5903
      await era.printAndWait(`「肛门粘乎乎地要去了啊…${heart(1)} 再玩弄我的肛门啊${heart(1)}」`); // :5904

    } else if (era.get(`talent:${target}:85`) == 1) { // :5906
      await era.printAndWait(`「啊啊${heart(1)}…嘿嘿嘿${heart(1)}…屁股啊…不行不行、已经、不要再玩弄了啊${heart(1)}」`); // :5907
      await era.printAndWait(`${target_name}品味着出生以来的第一次肛门高潮。腰在快感中颤抖、肛门一次又一次地抽动这。`); // :5908
      await era.printAndWait(`「屁股…要融化啦${heart(1)} 主人………${heart(1)}」`); // :5909

    } else { // :5911
      await era.printAndWait(`「啊、呀嘻…不要啊讨厌…屁股…再这样下去…不要玩弄啊…啊啊啊哈呀啊！」`); // :5912
      await era.printAndWait(`${target_name}被反复调教肛门的结果、品尝到了第一次的肛门高潮。强烈的快感让少女连话都说不清了。`); // :5913
      await era.printAndWait(`「咿嘻…呼嘻…屁股好奇怪…要坏掉了………」`); // :5914
    } // :5915
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :5916
    era.set(`cflag:${target}:227`, 1); // :5916
  } // :5917




  if (era.get('nowex:3') > 0 && era.get(`cflag:${target}:228`) == 0) { // :5922

    if (era.get(`talent:${target}:76`) == 1) { // :5924

      if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :5926
        await era.printAndWait(`「嘻呀${heart(1)}…胸部…胸部要裂开了…啊哈啊啊呀${heart(1)}」`); // :5927
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`); // :5928
        await era.printAndWait(`「胸部这么大真是…太好…了…${heart(1)}」`); // :5929
      } else { // :5930
        await era.printAndWait(`「呀啊啊…${heart(1)} 胸、胸部…好、好厉害…好爽～…${heart(1)}」`); // :5931
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`); // :5932
        await era.printAndWait(`「胸部好舒服…请让我更加舒服啊${heart(1)}」`); // :5933
      } // :5934

    } else if (era.get(`talent:${target}:85`) == 1) { // :5936

      if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :5938
        await era.printAndWait(`「更…请更多的玩弄胸部…再…用力做哟…${heart(1)}」`); // :5939
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`); // :5940
        await era.printAndWait(`「啊…原来胸部大…是这么舒服的啊…${heart(1)}」`); // :5941
      } else { // :5942
        await era.printAndWait(`「啊…再…玩弄…啊啊啊…胸部…要变得奇怪了${heart(1)}」`); // :5943
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`); // :5944
        await era.printAndWait(`「主人…请让胸部…更加舒服…啊${heart(1)}」`); // :5945
      } // :5946

    } else { // :5948

      if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :5950
        await era.printAndWait(`「不…不要啊…这、这样刺激胸部…要…要去了…去、去了啊啊啊！」`); // :5951
        await era.printAndWait(`${target_name}的巨乳受到刺激、第一次高潮了………`); // :5952
        await era.printAndWait(`「啊…啊…这样的不要啊…我的胸部…要回不去了………」`); // :5953
        await era.printAndWait(`少女尽可能地呵护着巨乳、未知的快感的残滓中颤抖着………`); // :5954
      } else { // :5955
        await era.printAndWait(`「啊啊…这、这是什么啊…好、好奇怪…胸部变得好奇怪啊！？」`); // :5956
        await era.printAndWait(`${target_name}的胸部受到刺激、第一次高潮了………`); // :5957
        await era.printAndWait(`「我的…胸部…好…舒服………」`); // :5958
      } // :5959
    } // :5960
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :5961
    era.set(`cflag:${target}:228`, 1); // :5961
  } // :5962







}

// @KOJO_MESSAGE_MARKCNG_5 // :5970
async function KOJO_MESSAGE_MARKCNG_5() {

  if (era_flag.assi > 0 && era_flag.assiplay) { // :5973
    return 0; // :5973
  } // :5973

  if (era.get(`tequip:${target}:45`)) { // :5976
    return 0; // :5976
  } // :5976

  if (era.get('tflag:899')) { // :5979
    return 0; // :5979
  } // :5979

  if (era.get(`tequip:${target}:89`)) { // :5982
    return 0; // :5982
  } // :5982

  if (era.get(`tequip:${target}:90`)) { // :5985
    return 0; // :5985
  } // :5985

  if (era.get(`talent:${target}:9`) == 1) { // :5988
    return 0; // :5988
  } // :5988

  if (era.get(`tequip:${target}:55`)) { // :5991
    return 0; // :5991
  } // :5991




  if (era.get('tflag:22') == 3 && era.get(`cflag:${target}:297`) == 0) { // :5996

    if (era.get(`talent:${target}:85`) == 1) { // :5998
      await era.printAndWait(`「啊咕…主、主人…痛…好痛…已经…不行…了啊………」`); // :5999
      await era.printAndWait(`${target_name}临近承受痛苦的极限、嚎啕大哭起来。`); // :6000
      await era.printAndWait(`「我、我…做了什么不好的事吗…？」`); // :6001
    } else { // :6002
      await era.printAndWait(`「不要啊…痛的…不要啊…再这样下去…请原谅我啊………」`); // :6003
      await era.printAndWait(`${target_name}临近承受痛苦的极限、嚎啕大哭起来………`); // :6004
    } // :6005
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :6006
    era.set(`cflag:${target}:297`, 1); // :6006
  } // :6007




  if (era.get('tflag:23') == 3 && era.get(`cflag:${target}:298`) == 0) { // :6012

    if (era.get(`talent:${target}:85`) == 1 || era.get(`talent:${target}:76`) == 1) { // :6014
      await era.printAndWait(`「啊…呜…啊啊…满满地…被强迫着要去了啊…啊啊…主人啊…${heart(1)}」`); // :6015
      await era.printAndWait(`${target_name}被多次刻上快乐的印记、露出一副完全成为了雌性的表情………`); // :6016
    } else { // :6017
      await era.printAndWait(`「呜啊…啊…啊啊…呼啊啊啊…已、已经…想要高潮…咿嘻…呀啊啊」`); // :6018
      await era.printAndWait(`${target_name}被多次刻上快乐的印记、露出一副完全成为了雌性的表情………`); // :6019
    } // :6020
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :6021
    era.set(`cflag:${target}:298`, 1); // :6021
  } // :6022




  if (era.get('tflag:24') == 3 && era.get(`cflag:${target}:299`) == 0) { // :6027

    if (era.get(`talent:${target}:85`) == 1) { // :6029
      await era.printAndWait(`「啊…不妙…只有主人、我的主人啊…${heart(1)}」`); // :6030
      await era.printAndWait(`${target_name}出神地凝视着${master_name}、已经不会再违抗了吧………`); // :6031
    } else { // :6032
      await era.printAndWait(`「对不起…对不起…已经…不会再违抗主人了…再也不会说嚣张的话了啊………」`); // :6033
      await era.printAndWait(`反复的调教让疲惫的${target_name}向你许下了屈服的誓言………`); // :6034
    } // :6035
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :6036
    era.set(`cflag:${target}:299`, 1); // :6036
  } // :6037




  if (era.get('tflag:21') == 3 && era.get(`cflag:${target}:300`) == 0) { // :6042

    if (era.get(`talent:${target}:85`) == 1) { // :6044
      await era.printAndWait(`「不要啊…真是的…不要碰”我”啊！」`); // :6045
      await era.printAndWait(`好像有些做过头了、${target_name}带着反抗心怒视着${master_name}。`); // :6046
      await era.printAndWait(`「这、这样的…已经受够了…讨厌！」`); // :6047
    } else { // :6048
      await era.printAndWait(`「呜呜呜…呜咕…真是的…离我远点…离我远点啊………！」`); // :6049
      await era.printAndWait(`${target_name}的眼里泛着泪光、怒视着${master_name}。`); // :6050
      await era.printAndWait(`「真是的…不要碰我啊…」`); // :6051
    } // :6052
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :6053
    era.set(`cflag:${target}:300`, 1); // :6053
  } // :6054





}

// @SELF_KOJO_K5 // :6060
async function SELF_KOJO_K5() {



  if (era.get('tflag:13') == 1) { // :6064

    if (Q == 1) { // :6066
      await era.print(`「被${assi_name}大人…满满地…抚摸着啊…${heart(1)}」`); // :6067
      await era.printAndWait(`${target_name}如同渴求着${assi_name}的残渣一般让股间贴近她的手指………`); // :6068

    } else if (Q == 2) { // :6070
      await era.print(`「狗狗的肉棒…好想要啊${heart(1)}…只用手指什么的根本不能满足啊………」`); // :6071
      await era.printAndWait(`${target_name}用手指自慰着、不过似乎完全没有过瘾的样子………`); // :6072

    } else { // :6074

      if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:261`) <= 6 || era.get('flag:7') == 2)) { // :6076
        await era.printAndWait(`「啊嘻咿咿…${heart(1)} 屁股小穴…还想要被更多地侵犯啊${heart(1)}…想要被侵犯啊${heart(1)}」`); // :6077
        await era.printAndWait(`${target_name}一边沉浸在调教的余韵里一边玩弄着肛门………`); // :6078
        // CFLAG:261  = 6（变量语义：CFLAG 族，261） // :6079
        era.set(`cflag:${target}:261`, 6); // :6079

      } else if (era.get(`talent:${target}:76`) && (era.get(`cflag:${target}:261`) < 5 || era.get('flag:7') == 2)) { // :6081

        if (era.get(`talent:${target}:0`) == 1) { // :6083
          await era.printAndWait(`「啊哈…主人…明明只是想要被侵犯小穴${heart(1)}…啊啊啊…忍不了了…忍不了了啊${heart(1)}」`); // :6084
          await era.printAndWait(`${target_name}的手指在小穴里搅动着却没有弄破处女膜。`); // :6085
          await era.printAndWait(`「再不快点的话…我就自己…把它弄破了啦${heart(1)}…啊啊啊${heart(1)}」`); // :6086
        } else { // :6087
          await era.printAndWait(`「嘻呀${heart(1)}…趁主人的气味还残留着…把气味印刻在这里${heart(1)}」`); // :6088
          await era.printAndWait(`${target_name}拨开小穴、把手指插了进去、来回搅弄着。`); // :6089
          await era.printAndWait(`「主人的汗也好唾液也好…全部都是…玛奥的东西哦…${heart(1)}」`); // :6090
        } // :6091
        // CFLAG:261  = 5（变量语义：CFLAG 族，261） // :6092
        era.set(`cflag:${target}:261`, 5); // :6092

      } else if (era.get(`talent:${target}:76`) == 1 && era.get(`talent:${target}:77`) == 1 && (era.get(`cflag:${target}:261`) <= 4 || era.get('flag:7') == 2)) { // :6094
        await era.printAndWait(`「屁、屁股小穴${heart(1)}…屁股小穴好舒服哟${heart(1)}…我…已、已经不行了…要疯了啊…屁股小穴要翻开了啊${heart(1)}」`); // :6095
        await era.printAndWait(`或许是主人看不到的原因、${target_name}激烈地肛门自慰着、完全停不下来。`); // :6096
        await era.printAndWait(`「哦${heart(1)}…哦哦哦${heart(1)}…快感蔓延开来了${heart(1)}…蔓延开来啦${heart(1)}…这里…想要粗大的肉棒啊${heart(1)}」`); // :6097
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :6098
        era.set(`cflag:${target}:261`, 4); // :6098

      } else if (era.get(`talent:${target}:85`) && (era.get(`cflag:${target}:261`) < 3 || era.get('flag:7') == 2)) { // :6100
        if (era.get(`talent:${target}:0`) == 1) { // :6101
          await era.printAndWait(`「啊啊…被主人调教…被注视…被触碰…我…已经这么湿了啊…${heart(1)}`); // :6102
          await era.printAndWait(`或许是主人看不到的原因、${target_name}激烈地自慰着、完全停不下来。`); // :6103
          await era.printAndWait(`「啊…嗯…主人啊…快点来…夺去…我的处女啊${heart(1)}…再不快点的话…我就…就自己动手了啦…啊啊啊${heart(1)}」`); // :6104
        } else { // :6105
          await era.printAndWait(`「主人啊${heart(1)}…主人啊${heart(1)}…想要…你看着我啊${heart(1)}…想要你注视着我啊！」`); // :6106
          await era.printAndWait(`或许是主人看不到的原因、${target_name}激烈地自慰着、完全停不下来。`); // :6107
          await era.printAndWait(`「一想到主人小穴都已经一片泥泞了${heart(1)} 自己的手指什么的根本满足不了啊${heart(1)}」`); // :6108
          await era.printAndWait(`少女的手指在小穴里来回搅弄着、爱液飞溅得床上到处都是………`); // :6109
        } // :6110
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :6111
        era.set(`cflag:${target}:261`, 3); // :6111

      } else if (era.get(`abl:${target}:31`) >= 3 && (era.get(`cflag:${target}:261`) < 2 || era.get('flag:7') == 2)) { // :6113
        await era.printAndWait(`「哈啊啊${heart(1)}…玩弄那里…受不了…舒服到受不了啊…」`); // :6114
        await era.printAndWait(`「这样舒服的事情根本不想停下来啊………${heart(1)}」`); // :6115
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :6116
        era.set(`cflag:${target}:261`, 2); // :6116

      } else if (era.get(`cflag:${target}:261`) < 1 || era.get('flag:7') == 2) { // :6118
        await era.printAndWait(`「这样的事…好想做…却做不了啊…身体好难受…不、不行啊………」`); // :6119
        await era.printAndWait(`${target_name}一边幽幽地哭泣一边自慰着………`); // :6120
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :6121
        era.set(`cflag:${target}:261`, 1); // :6121
      } // :6122
    } // :6123
  } // :6124




  if (era.get('tflag:13') == 2) { // :6129

    if (era.get(`talent:${target}:76`) && (era.get(`cflag:${target}:262`) < 5 || era.get('flag:7') == 2)) { // :6131
      await era.printAndWait(`「姐姐大人啊…${heart(1)} 姐姐大人啊…${heart(1)}」`); // :6132
      await era.printAndWait(`少女和${assi_name}身体重合、激烈地性交着。`); // :6133
      await era.printAndWait(`「好舒服啊…好喜欢性交${heart(1)}…最喜欢性交了…${heart(1)}」`); // :6134
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :6135
      era.set(`cflag:${target}:262`, 5); // :6135

    } else if (era.get(`talent:${target}:85`) && (era.get(`cflag:${target}:262`) < 4 || era.get('flag:7') == 2)) { // :6137
      await era.printAndWait(`「这种事…明明不能做的…主人…真是坏心眼…让我做这种事………」`); // :6138
      await era.printAndWait(`${assi_name}按倒了少女、把手指伸向了少女的小穴。`); // :6139

      if (era.get('tflag:23') == 3) { // :6141
        await era.printAndWait(`少女一边流着泪一边抗拒着、然而身体上被刻上的快乐的刻印却不容许她这样做。`); // :6142
        await era.printAndWait(`「呜啊…啊${heart(1)}…那里…不可以…不可以啊…所以啊………${heart(1)}」`); // :6143
        await era.printAndWait(`看着慢慢张开双腿的少女、${assi_name}窃笑着。`); // :6144
        await era.printAndWait(`「不…不是的…感觉什么的…才没有啦………${heart(1)}」`); // :6145

      } else { // :6147
        await era.printAndWait(`少女一边被${assi_name}玩弄着一边拼命忍住不发出呻吟。`); // :6148
        await era.printAndWait(`「呜…咕…呜啊…啊啊…」`); // :6149
        await era.print(`${assi_name}看着那样的少女、感到很满意`); // :6150
        if (era_flag.time == 0) { // :6151
          await era.printAndWait(`直到天黑一直都在玩弄着少女………`); // :6152
        } else { // :6153
          await era.printAndWait(`整个晚上都在玩弄着少女………`); // :6154
        } // :6155
      } // :6156
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :6157
      era.set(`cflag:${target}:262`, 4); // :6157

    } else if (era.get(`abl:${target}:33`) >= 3 && (era.get(`cflag:${target}:262`) < 3 || era.get('flag:7') == 2)) { // :6159
      await era.printAndWait(`「呜呼呼…勇者大人啊…我会好好地侍奉你的${heart(1)}」`); // :6160
      await era.printAndWait(`少女谄媚的声音在房间里响起、${assi_name}看着努力侍奉的少女、从内心深处感到高兴。`); // :6161
      await era.printAndWait(`「啊嗯…我可以称呼您为姐姐大人吗？」`); // :6162
      await era.printAndWait(`${assi_name}一边点头一边温柔地抚摸着少女的头………`); // :6163
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :6164
      era.set(`cflag:${target}:262`, 3); // :6164

    } else if (era.get(`abl:${target}:22`) >= 3 && (era.get(`cflag:${target}:262`) < 2 || era.get('flag:7') == 2)) { // :6166
      await era.printAndWait(`「嗯…哈…啊…啊啊…勇者大人…多亲亲我吧${heart(1)}」`); // :6167
      await era.printAndWait(`${target_name}的身体被亲吻得娇喘连连。`); // :6168
      await era.printAndWait(`从平凡的村娘被原勇者${assi_name}连续不断地玩弄着这番淫靡的景象中、能够感受到${assi_name}无休止的堕落着………`); // :6169
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :6170
      era.set(`cflag:${target}:262`, 2); // :6170

    } else if (era.get(`cflag:${target}:262`) < 1 || era.get('flag:7') == 2) { // :6172
      await era.printAndWait(`「嗯…啊啊…我、我是真的…真的…不喜欢啊…但、但是………！」`); // :6173
      await era.printAndWait(`${target_name}一边这么说着一边却和${assi_name}交缠着双腿………`); // :6174
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :6175
      era.set(`cflag:${target}:262`, 1); // :6175
    } // :6176
  } // :6177




  if (era.get('tflag:13') == 3) { // :6182

    if (era.get(`talent:${target}:76`) == 1 && (era.get(`cflag:${target}:263`) < 4 || era.get('flag:7') == 2)) { // :6184
      await era.printAndWait(`「啊嗯…精液${heart(1)}…还想要更多主人的精液哟………${heart(1)}」`); // :6185
      await era.printAndWait(`只有一次射精并不能让${target_name}感到满足、于是她又把阴茎含进了嘴里并用舌头套弄着、让阴茎再一次地射出了精液。`); // :6186
      await era.printAndWait(`「啾噗${heart(1)}…啾噗${heart(1)}…啾呜呜${heart(1)}…嗯…再勃起得更有精神一点啊…还要给我吃更多的精液哟${heart(1)}」`); // :6187
      await era.printAndWait(`强行把阴茎咽到喉咙深处使得少女可爱的脸有点变形、显得十分淫荡。`); // :6188
      await era.printAndWait(`「嗯咕…啾噗…嗯咕嗯咕${heart(1)} 肉棒好好吃…好好吃…${heart(1)}」`); // :6189
      // CFLAG:263  = 4（变量语义：CFLAG 族，263） // :6190
      era.set(`cflag:${target}:263`, 4); // :6190

    } else if (era.get(`talent:${target}:85`) && (era.get(`cflag:${target}:263`) < 3 || era.get('flag:7') == 2)) { // :6192
      await era.printAndWait(`「嗯啊…啾噗…嗯咕…嗯咕…${heart(1)}」`); // :6193
      await era.printAndWait(`${target_name}用舌头精心清理着${master_name}的阴茎。`); // :6194
      await era.printAndWait(`「啊嗯…这里也残留着呢${heart(1)} 主人的精液…很美味哟…${heart(1)}」`); // :6195
      await era.printAndWait(`少女一副如果放着不管的话能侍奉肉棒一整天的样子………`); // :6196
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :6197
      era.set(`cflag:${target}:263`, 3); // :6197

    } else if (era.get(`abl:${target}:16`) >= 5 && (era.get(`cflag:${target}:263`) < 2 || era.get('flag:7') == 2)) { // :6199
      await era.printAndWait(`「嗯噗…啾噗…啾…啾…全部都会…好好舔干净的…乖乖等着………就可以了啦」`); // :6200
      await era.printAndWait(`${target_name}热诚地进行着早安口交之后的清理、连一滴精液也不想残留下来的样子。`); // :6201
      await era.printAndWait(`「嗯…啾…啾…啊…哈啊…早、早上好、主人………」`); // :6202
      await era.printAndWait(`少女害羞地向你问好、高高兴兴地从房间里出去了………`); // :6203
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :6204
      era.set(`cflag:${target}:263`, 2); // :6204

    } else if (era.get(`cflag:${target}:263`) < 1 || era.get('flag:7') == 2) { // :6206
      await era.printAndWait(`「哈…哈…早上好哦、主人…啊…从早上开始就这么浓郁了…………」`); // :6207
      await era.printAndWait(`${target_name}擦着脸上的精液、快要哭出来的样子………`); // :6208
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :6209
      era.set(`cflag:${target}:263`, 1); // :6209
    } // :6210
  } // :6211




  if (era.get('tflag:13') == 4) { // :6216

    if (era.get(`abl:${target}:2`) >= 4 && (era.get(`cflag:${target}:264`) < 2 || era.get('flag:7') == 2)) { // :6218
      await era.printAndWait(`${target_name}看起来已经十分习惯和${master_name}做爱了。少女的小穴被抽插时发出了清亮甜美的呻吟。`); // :6219
      await era.printAndWait(`「主人啊…再…请再激烈一些…把我的小穴弄得乱七八糟的吧${heart(1)}」`); // :6220
      await era.printAndWait(`${target_name}缠绕在${master_name}腰上的双腿快由于快感不住地颤抖。`); // :6221
      await era.printAndWait(`「哈啊${heart(1)} 好喜欢和主人做爱了${heart(1)} 最喜欢和主人做爱了${heart(1)}」`); // :6222
      if (s >= 3) { // :6224
        await era.printAndWait(`${target_name}被中出之后看上去十分满足………`); // :6224
      } // :6224
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :6225
      era.set(`cflag:${target}:264`, 2); // :6225

    } else if (era.get(`cflag:${target}:264`) < 1 || era.get('flag:7') == 2) { // :6227
      await era.printAndWait(`「主人啊…${heart(1)} 全部…全部都射进来………${heart(1)}」`); // :6228
      await era.printAndWait(`「哈…啊…嗯啊嗯…好高兴${heart(1)} 被你抱在怀里真的好高兴…${heart(1)}」`); // :6229
      await era.printAndWait(`「啊…啊啊…啊嗯…${heart(1)} 这么多${heart(1)}」`); // :6230
      await era.printAndWait(`${target_name}张开双腿拨弄着淌出的精液………`); // :6231
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :6232
      era.set(`cflag:${target}:264`, 1); // :6232
    } // :6233
  } // :6234




  if (era.get('tflag:13') == 5) { // :6239
    if (era.get(`cflag:${target}:265`) < 1 || era.get('flag:7') == 2) { // :6240
      await era.printAndWait(`「欸嘿嘿…一起睡吧${heart(1)}」`); // :6241
      await era.printAndWait(`「对我动手动脚…也是可以的哟…${heart(1)}」`); // :6242
      await era.printAndWait(`${target_name}带着献媚的眼神、走进了房间………`); // :6243
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :6244
      era.set(`cflag:${target}:265`, 1); // :6244
    } // :6245
  } // :6246









  if (era.get('tflag:13') == 6) { // :6256

    if (era.get(`talent:${target}:85`)) { // :6258

      if (era.get(`talent:${target}:314`) == 9) { // :6260

        if (S >= 1000000) { // :6262
          await era.printAndWait(`被魔界的某位贵族买下的${target_name}、在这之后………`); // :6263
          await era.printAndWait(`………`); // :6264
          await era.printAndWait(`……`); // :6265
          await era.printAndWait(`…`); // :6266
          await era.printAndWait(`听闻有传言说是作为宠姬被疼爱着。`); // :6267
          await era.printAndWait(`没有教养、但充满魅力的特质正是主人所喜爱的地方。`); // :6268


          await era.printAndWait(`据说已经怀上了主人的孩子、很快就要分娩了。`); // :6271
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6272

        } else if (S >= 500000) { // :6274
          await era.printAndWait(`被某位魔族的收藏家买下的${target_name}、在这之后………`); // :6275
          await era.printAndWait(`………`); // :6276
          await era.printAndWait(`……`); // :6277
          await era.printAndWait(`…`); // :6278
          await era.printAndWait(`听闻有传言说是和收藏家结婚了、也很受孩子们欢迎。`); // :6279
          await era.printAndWait(`现在好像做着出色的魔族的「母亲」。`); // :6280
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6281

        } else if (S >= 100000) { // :6283
          await era.printAndWait(`被某位魔族的商人买下的${target_name}、在这之后………`); // :6284
          await era.printAndWait(`………`); // :6285
          await era.printAndWait(`……`); // :6286
          await era.printAndWait(`…`); // :6287
          await era.printAndWait(`作为商人的情人和接待道具度过每一天。`); // :6288
          await era.printAndWait(`过着不知道是否幸福却很富足的日子、只要商人不破产的话应该能这样好好生活下去的吧。`); // :6289
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6290

        } else { // :6292
          await era.printAndWait(`被某位魔族的农户买下的${target_name}、在这之后………`); // :6293
          await era.printAndWait(`………`); // :6294
          await era.printAndWait(`……`); // :6295
          await era.printAndWait(`…`); // :6296
          await era.printAndWait(`有传言说是成为了不停生育的奴隶。`); // :6297
          await era.printAndWait(`生出了好几个孩子增加了农场的劳动力、主人对此感到很高兴。`); // :6298
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6299
        } // :6300

      } else { // :6302

        if (S >= 1000000) { // :6304
          await era.printAndWait(`被魔界的某位贵族买下的${target_name}、在这之后………`); // :6305
          await era.printAndWait(`………`); // :6306
          await era.printAndWait(`……`); // :6307
          await era.printAndWait(`…`); // :6308
          await era.printAndWait(`有传言说每晚都被贵族儿子的玩伴们疼爱着。`); // :6309
          await era.printAndWait(`据说因为${target_name}年龄相近的原因还找到了恋人。`); // :6310
          await era.printAndWait(`如果她真的希望这种关系的话、在她前方迎接她的应该是充满苦难的路吧、不过已经和${master_name}没有关系了。`); // :6311
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6312

        } else if (S >= 500000) { // :6314
          await era.printAndWait(`被某位魔族的富豪买下的${target_name}、在这之后………`); // :6315
          await era.printAndWait(`………`); // :6316
          await era.printAndWait(`……`); // :6317
          await era.printAndWait(`…`); // :6318
          await era.printAndWait(`听闻有传言说作为那个家里的宠物受到了特别的疼爱、与看门狗生下了好几个孩子。`); // :6319
          await era.printAndWait(`富豪似乎成为了她的饲养员。`); // :6320
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6321

        } else if (S >= 100000) { // :6323
          await era.printAndWait(`被某位魔族的商人买下的${target_name}、在这之后………`); // :6324
          await era.printAndWait(`………`); // :6325
          await era.printAndWait(`……`); // :6326
          await era.printAndWait(`…`); // :6327
          await era.printAndWait(`被送到了商人开的妓院里。`); // :6328
          await era.printAndWait(`因为被好好调教过的人类幼女奴隶非常罕见的原因、据说常客非常多。`); // :6329
          await era.printAndWait(`也许有一天能替自己贖身、恢复自由之身过日子也说不定呢。`); // :6330


          await era.printAndWait(`但是${master_name}和${target_name}再也不会有见过面………`); // :6333

        } else { // :6335
          await era.printAndWait(`被某个魔族的农场买下的${target_name}、在这之后………`); // :6336
          await era.printAndWait(`………`); // :6337
          await era.printAndWait(`……`); // :6338
          await era.printAndWait(`…`); // :6339
          if (era.get(`talent:${target}:110`) == 1 || era.get(`talent:${target}:114`) == 1 || era.get(`talent:${target}:119`) == 1) { // :6340
            await era.printAndWait(`由于肥大化的胸部、被作为牛奴隶送到了牛圈里。`); // :6341
            await era.printAndWait(`据说用牛魔兽的精子受精、通过注射药物使得乳房更加肥大化、每天都被榨取牛奶。`); // :6342
          } else { // :6343
            await era.printAndWait(`为了制作出新品种的家畜而和所有家畜交配。`); // :6344
            await era.printAndWait(`虽然现在还没有实验成果、但将来应该会有意想不到的新品牌出现吧。`); // :6345
          } // :6346
          await era.printAndWait(`于是${master_name}和${target_name}在这之后再也没有见过面………`); // :6347
        } // :6348
      } // :6349

    } else if (era.get(`mark:${target}:3`) == 3) { // :6351

      if (era.get(`talent:${target}:314`) == 9) { // :6353
        await era.printAndWait(`挣扎着的${target_name}被担当护卫的魔物摁在地上。但是她目露凶光向这边喊了起来。`); // :6354
        await era.printAndWait(`「你们总有一天会因为没有把我杀了而感到后悔的！」`); // :6355
        await era.printAndWait(`「把她活活撕碎了去喂野狗！」`); // :6356
        await era.printAndWait(`于是${target_name}再也不会再次出现在${master_name}面前了吧………`); // :6357

      } else { // :6359
        await era.printAndWait(`挣扎着的${target_name}被担当护卫的魔物摁在地上。但是她目露凶光向这边喊了起来。`); // :6360
        await era.printAndWait(`「你们总有一天会因为没有把我杀了而感到后悔的！」`); // :6361
        await era.printAndWait(`「把她活活撕碎了去喂野狗！」`); // :6362
        await era.printAndWait(`于是${target_name}再也不会出现在${master_name}的面前了吧………`); // :6363
      } // :6364

    } else if (era.get(`talent:${target}:76`)) { // :6366

      if (era.get(`talent:${target}:314`) == 9) { // :6368

        if (S >= 1000000) { // :6370
          await era.printAndWait(`被某位魔族的将军买下的${target_name}、在这之后………`); // :6371
          await era.printAndWait(`………`); // :6372
          await era.printAndWait(`……`); // :6373
          await era.printAndWait(`…`); // :6374
          await era.printAndWait(`有传言说她被连在魔族中也算是性欲旺盛的兽人将军不停地干到现在、${target_name}好像是坏掉了。`); // :6375
          await era.printAndWait(`可是通过激烈的调教、${target_name}成为了可以称之为艺术品的性奴隶、好像任何行为都能给她带来快感。`); // :6376
          await era.printAndWait(`将军非常中意变成了那样的${target_name}、赏赐给她性奴专用的房间、每晚都会好好地享用她。`); // :6377
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6378

        } else if (S >= 500000) { // :6380
          await era.printAndWait(`被某个魔族的高级娼馆买下的${target_name}、在这之后………`); // :6381
          await era.printAndWait(`………`); // :6382
          await era.printAndWait(`……`); // :6383
          await era.printAndWait(`…`); // :6384
          await era.printAndWait(`听闻有传言说因为能玩特殊play而成为了十分受欢迎的娼妇。`); // :6385
          await era.printAndWait(`之后被某位大财主贖身、作为他的第五个妻子幸福地生活着。`); // :6386
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6387

        } else if (S >= 100000) { // :6389
          await era.printAndWait(`被某个魔族的黑帮买下的${target_name}、在这之后………`); // :6390
          await era.printAndWait(`………`); // :6391
          await era.printAndWait(`……`); // :6392
          await era.printAndWait(`…`); // :6393
          await era.printAndWait(`有传言说是作为黑帮的专属娼妇生活着。`); // :6394
          await era.printAndWait(`与好几个男人发生关系来抑制淫荡的身体因欲求不满而产生的疼痛、很幸福的样子。`); // :6395
          await era.printAndWait(`但是${target_name}与帮会里的年轻成员相恋了、他们计划从帮会里出逃可惜失败了、两人被抓后有着非常凄惨的结局。`); // :6396
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6397

        } else { // :6399
          await era.printAndWait(`被某个魔族的酒馆买下的${target_name}、在这之后………`); // :6400
          await era.printAndWait(`………`); // :6401
          await era.printAndWait(`……`); // :6402
          await era.printAndWait(`…`); // :6403
          await era.printAndWait(`每天晚上都被客人叫到房间里、过着快乐的日子。`); // :6404
          await era.printAndWait(`由于会把食物带到店前去吃、酒馆老板对她的评价多少有点不好………`); // :6405
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6406
        } // :6407

      } else { // :6409

        if (S >= 1000000) { // :6411
          await era.printAndWait(`被某位魔族的将军买下的${target_name}、在这之后………`); // :6412
          await era.printAndWait(`………`); // :6413
          await era.printAndWait(`……`); // :6414
          await era.printAndWait(`…`); // :6415
          await era.printAndWait(`听闻有传言说将军在买下${target_name}后、三天三夜没有迈出房门一步、在房间里玩弄着她`); // :6416
          await era.printAndWait(`然后在处理工作时也常常让少女随时侍奉在身旁。`); // :6417
          await era.printAndWait(`想必早晚会正式成为将军的侧室吧、当然这又将会是一个新的故事。`); // :6418
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6419

        } else if (S >= 500000) { // :6421
          await era.printAndWait(`被某个魔族的学院买下的${target_name}、在这之后………`); // :6422
          await era.printAndWait(`………`); // :6423
          await era.printAndWait(`……`); // :6424
          await era.printAndWait(`…`); // :6425
          await era.printAndWait(`有传言说作为教材和学生们的性欲处理工具每天都被射入大量精液。`); // :6426
          await era.printAndWait(`听说生下的孩子也被关在饲育小屋里精心培育这。`); // :6427
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6428

        } else if (S >= 100000) { // :6430
          await era.printAndWait(`被某个魔族的低级娼馆买下的${target_name}、在那之后………`); // :6431
          await era.printAndWait(`………`); // :6432
          await era.printAndWait(`……`); // :6433
          await era.printAndWait(`…`); // :6434
          await era.printAndWait(`有传言说因为在有特殊癖好的客人中人气非常高的缘故、她得到了很好的待遇。`); // :6435
          await era.printAndWait(`作为前辈的妓女们也十分疼爱她。`); // :6436
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6437

        } else { // :6439
          await era.printAndWait(`被某位魔族的矿主买下的${target_name}、在那之后………`); // :6440
          await era.printAndWait(`………`); // :6441
          await era.printAndWait(`……`); // :6442
          await era.printAndWait(`…`); // :6443
          await era.printAndWait(`有传言说每晚都被矿工们轮奸。`); // :6444
          await era.printAndWait(`被迫接受兽欲的少女觉得再也没有什么是比死更快乐的了。`); // :6445
          await era.printAndWait(`于是${master_name}和${target_name}再也没有见过面………`); // :6446
        } // :6447
      } // :6448

    } else { // :6450
      if (era.get(`talent:${target}:314`) == 9) { // :6451
        await era.printAndWait(`「好想见姐姐…好想回到村子里去………」`); // :6452
        await era.printAndWait(`被卖出的魔族奴隶${target_name}就这样消失在了黑暗的世界之中………`); // :6453
      } else { // :6454
        await era.printAndWait(`「好想见姐姐…好想回到村子里去………」`); // :6455
        await era.printAndWait(`被卖出的人类奴隶${target_name}就这样消失在了黑暗的世界之中………`); // :6456
      } // :6457
    } // :6458
  } // :6459





  if (era.get('tflag:13') == 11) { // :6465
    if (era.get(`cflag:${target}:271`) == 0) { // :6466

      if (era.get(`talent:${target}:9`) == 1) { // :6468
        await era.printAndWait(`「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子里哟…啊哈…啊哈哈哈哈………」`); // :6469
        await era.printAndWait(`可怜的${target_name}好像没能接受怀孕的事实………`); // :6470

      } else if (era.get(`talent:${target}:85`) && era.get(`cflag:${target}:102`) == 1) { // :6472

        if (era.get(`talent:${target}:314`) == 9) { // :6474
          await era.printAndWait(`「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`); // :6475
          await era.printAndWait(`${target_name}害羞地抚摩着腹部看着${master_name}。`); // :6476
          await era.printAndWait(`「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`); // :6477
          await era.printAndWait(`${master_name}温柔地抱住了喜极而泣的${target_name}。`); // :6478
          await era.printAndWait(`「成为魔族…原来是这么高兴的事呀…一定会生下精神的孩子的………」`); // :6479
        } else { // :6480
          await era.printAndWait(`「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`); // :6481
          await era.printAndWait(`${target_name}害羞地抚摩着腹部看着${master_name}。`); // :6482
          await era.printAndWait(`「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`); // :6483
          await era.printAndWait(`${master_name}温柔地抱住了喜极而泣的${target_name}。`); // :6484
        } // :6485

      } else if (era.get(`talent:${target}:76`) && era.get(`cflag:${target}:102`) == 1) { // :6487

        if (era.get(`talent:${target}:314`) == 9) { // :6489
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6490
          await era.printAndWait(`「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`); // :6491
          await era.printAndWait(`怜爱地抚摸着肌肤完全变成了青色的肚子。`); // :6492
          await era.printAndWait(`「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`); // :6493
          await era.printAndWait(`${target_name}一边高兴地挥动着尾巴一边报告了自己怀孕的情况………`); // :6494
        } else { // :6495
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6496
          await era.printAndWait(`「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`); // :6497
          await era.printAndWait(`少女一边用舌头舔着嘴唇一边怜爱地抚摸着肚子`); // :6498
          await era.printAndWait(`「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`); // :6499
          await era.printAndWait(`${target_name}一边高兴地笑着一边报告了自己怀孕的情况………`); // :6500
        } // :6501

      } else if (era.get(`cflag:${target}:102`) == 5) { // :6503
        if (era.get(`talent:${target}:136`) == 1) { // :6504
          await era.printAndWait(`「一直这么做的话怀上狗狗的孩子也没办法啦」`); // :6505
          await era.printAndWait(`${target_name}一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子………`); // :6506
        } else { // :6507
          await era.printAndWait(`「啊啊啊…怀上了狗狗的孩子…这是为什么啊…啊啊！」`); // :6508
        } // :6509

      } else if (era.get(`cflag:${target}:102`) == 7) { // :6511
        await era.printAndWait(`「我、我有了狂王的孩子…？骗、骗人…肯定是骗人的………」`); // :6512

      } else if (era.get(`talent:${target}:85`)) { // :6514

        if (era.get(`talent:${target}:314`) == 9) { // :6516
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`); // :6517
          await era.printAndWait(`${target_name}表情很不安、背上的翅膀无力地下垂着。`); // :6518
          await era.printAndWait(`「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`); // :6519
          await era.printAndWait(`${master_name}温柔地安慰着青色肌肤上淌满泪水的${target_name}………`); // :6520
        } else { // :6521
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`); // :6522
          await era.printAndWait(`${target_name}表情很不安、看着${master_name}向他报告自己怀孕了的情况。`); // :6523
          await era.printAndWait(`「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`); // :6524
          await era.printAndWait(`${master_name}温柔地安慰着不停流着眼泪的${target_name}………`); // :6525
        } // :6526

      } else if (era.get(`talent:${target}:76`)) { // :6528

        if (era.get(`talent:${target}:314`) == 9) { // :6530
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6531
          await era.printAndWait(`「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`); // :6532
          await era.printAndWait(`一边欸嘿嘿地笑着一边怜爱地抚摸着青色肌肤的肚子。`); // :6533
          await era.printAndWait(`「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`); // :6534
          await era.printAndWait(`${target_name}眯起了魔族的眼睛、露出了微笑………`); // :6535
        } else { // :6536
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6537
          await era.printAndWait(`「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`); // :6538
          await era.printAndWait(`一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子。`); // :6539
          await era.printAndWait(`「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`); // :6540
          await era.printAndWait(`${target_name}露出了微笑………`); // :6541
        } // :6542

      } else if (era.get(`mark:${target}:3`) == 3) { // :6544
        await era.printAndWait(`「为、为什么我会…怎么看…都…都是你的错啊！」`); // :6545
        await era.printAndWait(`${target_name}以厌恶的眼神瞪着${master_name}。`); // :6546
        await era.printAndWait(`「魔物的孩子什么的我是绝对不会生下来的…！」`); // :6547

      } else { // :6549

        if (era.get(`talent:${target}:314`) == 9) { // :6551
          await era.printAndWait(`「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`); // :6552
          await era.printAndWait(`${target_name}无助地抱着双肩。`); // :6553
          await era.printAndWait(`「一定是…是因为成为了魔族…才会怀孕的…太过分了…实在是太过分了啦………」`); // :6554
        } else { // :6555
          await era.printAndWait(`「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`); // :6556
          await era.printAndWait(`${target_name}无助地抱着双肩………`); // :6557
        } // :6558
      } // :6559
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :6560
      era.set(`cflag:${target}:271`, 1); // :6560

    } else { // :6562

      if (era.get(`talent:${target}:9`) == 1) { // :6564
        await era.printAndWait(`「欸嘿嘿…啊哈…啊哈………魔族的孩子…在我的肚子里哟…啊哈…啊哈哈哈哈………」`); // :6565
        await era.printAndWait(`可怜的${target_name}好像没能接受怀孕的事实………`); // :6566

      } else if (era.get(`talent:${target}:85`) && era.get(`cflag:${target}:102`) == 1) { // :6568

        if (era.get(`talent:${target}:314`) == 9) { // :6570
          await era.printAndWait(`「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`); // :6571
          await era.printAndWait(`${target_name}害羞地抚摩着腹部看着${master_name}。`); // :6572
          await era.printAndWait(`「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`); // :6573
          await era.printAndWait(`${master_name}温柔地抱住了喜极而泣的${target_name}。`); // :6574
          await era.printAndWait(`「成为魔族…原来是这么高兴的事呀…一定会生下精神的孩子的………」`); // :6575
        } else { // :6576
          await era.printAndWait(`「啊！那、那个……我、我…好像怀上主人的孩子了呢…${heart(1)}」`); // :6577
          await era.printAndWait(`${target_name}害羞地抚摩着腹部看着${master_name}。`); // :6578
          await era.printAndWait(`「会、会加油的…会、会生下来的…我绝对会把孩子生下来的………」`); // :6579
          await era.printAndWait(`${master_name}温柔地抱住了喜极而泣的${target_name}。`); // :6580
        } // :6581

      } else if (era.get(`talent:${target}:76`) && era.get(`cflag:${target}:102`) == 1) { // :6583

        if (era.get(`talent:${target}:314`) == 9) { // :6585
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6586
          await era.printAndWait(`「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`); // :6587
          await era.printAndWait(`怜爱地抚摸着肌肤完全变成了青色的肚子。`); // :6588
          await era.printAndWait(`「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`); // :6589
          await era.printAndWait(`${target_name}一边高兴地挥动着尾巴一边报告了自己怀孕的情况………`); // :6590
        } else { // :6591
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6592
          await era.printAndWait(`「欸嘿嘿…因为做了那种事…就有了小宝宝了噢…主人${heart(1)}」`); // :6593
          await era.printAndWait(`少女一边用舌头舔着嘴唇一边怜爱地抚摸着肚子`); // :6594
          await era.printAndWait(`「主人的孩子就在这里噢…生孩子会是一种怎样的乐趣呢………${heart(1)}」`); // :6595
          await era.printAndWait(`${target_name}一边高兴地笑着一边报告了自己怀孕的情况………`); // :6596
        } // :6597

      } else if (era.get(`cflag:${target}:102`) == 5) { // :6599
        if (era.get(`talent:${target}:136`) == 1) { // :6600
          await era.printAndWait(`「一直这么做的话怀上狗狗的孩子也没办法啦」`); // :6601
          await era.printAndWait(`${target_name}一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子………`); // :6602
        } else { // :6603
          await era.printAndWait(`「啊啊啊…怀上了狗狗的孩子…这是为什么啊…啊啊！」`); // :6604
        } // :6605

      } else if (era.get(`cflag:${target}:102`) == 7) { // :6607
        await era.printAndWait(`「我、我有了狂王的孩子…？骗、骗人…肯定是骗人的………」`); // :6608

      } else if (era.get(`talent:${target}:85`)) { // :6610

        if (era.get(`talent:${target}:314`) == 9) { // :6612
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`); // :6613
          await era.printAndWait(`${target_name}表情很不安、背上的翅膀无力地下垂着。`); // :6614
          await era.printAndWait(`「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`); // :6615
          await era.printAndWait(`${master_name}温柔地安慰着青色肌肤上淌满泪水的${target_name}………`); // :6616
        } else { // :6617
          await era.printAndWait(`「那、那个…我好像怀孕了…但是…那个…」`); // :6618
          await era.printAndWait(`${target_name}表情很不安、看着${master_name}向他报告自己怀孕了的情况。`); // :6619
          await era.printAndWait(`「那个…仔细地想了下…大概不是主人的…但、但是…只有孩子、我不想打掉………」`); // :6620
          await era.printAndWait(`${master_name}温柔地安慰着不停流着眼泪的${target_name}………`); // :6621
        } // :6622

      } else if (era.get(`talent:${target}:76`)) { // :6624

        if (era.get(`talent:${target}:314`) == 9) { // :6626
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6627
          await era.printAndWait(`「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`); // :6628
          await era.printAndWait(`一边欸嘿嘿地笑着一边怜爱地抚摸着青色肌肤的肚子。`); // :6629
          await era.printAndWait(`「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`); // :6630
          await era.printAndWait(`${target_name}眯起了魔族的眼睛、露出了微笑………`); // :6631
        } else { // :6632
          await era.printAndWait(`和往常一样一脸心神荡漾的${target_name}看着${master_name}。`); // :6633
          await era.printAndWait(`「欸嘿嘿…主人啊…我好像怀孕了呀…${heart(1)}」`); // :6634
          await era.printAndWait(`一边没心没肺欸嘿嘿地笑着一边怜爱地抚摸着肉眼可见鼓起的肚子。`); // :6635
          await era.printAndWait(`「和别人做了那么多次…也不知道是谁的孩子哟…但是我可以把他生下来的吧？」`); // :6636
          await era.printAndWait(`${target_name}露出了微笑………`); // :6637
        } // :6638

      } else if (era.get(`mark:${target}:3`) == 3) { // :6640
        await era.printAndWait(`「为、为什么我会…怎么看…都…都是你的错啊！」`); // :6641
        await era.printAndWait(`${target_name}以厌恶的眼神瞪着${master_name}。`); // :6642
        await era.printAndWait(`「魔物的孩子什么的我是绝对不会生下来的啊…！」`); // :6643

      } else { // :6645

        if (era.get(`talent:${target}:314`) == 9) { // :6647
          await era.printAndWait(`「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`); // :6648
          await era.printAndWait(`${target_name}无助地抱着双肩。`); // :6649
          await era.printAndWait(`「一定是…是因为成为了魔族…才会怀孕的…太过分了…实在是太过分了啦………」`); // :6650
        } else { // :6651
          await era.printAndWait(`「啊…怎么这样…我、我怀孕了啊…怎么办啊…好害怕…我好害怕………」`); // :6652
          await era.printAndWait(`${target_name}无助地抱着双肩………`); // :6653
        } // :6654
      } // :6655
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :6656
      era.set(`cflag:${target}:271`, 1); // :6656
    } // :6657
  } // :6658




  if (era.get('tflag:13') == 12) { // :6663
    if (era.get(`cflag:${target}:272`) == 0) { // :6664

      if (era.get(`talent:${target}:9`) == 1) { // :6666
        await era.printAndWait(`「啊呀呀啊啊…哈啊…精神的小宝宝出生了哟…看呐…姐姐……哈…哈………」`); // :6667
        await era.printAndWait(`精神已经完全混乱的${target_name}嘴里说着莫名其妙的话………`); // :6668

      } else if (era.get(`talent:${target}:85`) && era.get(`cflag:${target}:102`) == 1) { // :6670

        if (era.get(`talent:${target}:314`) == 9) { // :6672
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`); // :6673
          await era.printAndWait(`${target_name}那魔族的黄色眼瞳中流下喜悦的泪水、不停地喘息着。`); // :6674
          await era.printAndWait(`「啊…要生更多…主人的………魔王大人的孩子要生更多………」`); // :6675
        } else { // :6676
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`); // :6677
          await era.printAndWait(`${target_name}流下喜悦的泪水、喘着粗气。`); // :6678
          await era.printAndWait(`「啊…要生更多…主人的………魔王大人的孩子要生更多………」`); // :6679
          await era.printAndWait(`就这样少女成为了被诅咒的魔物的母亲………`); // :6680
        } // :6681

      } else if (era.get(`talent:${target}:76`) && era.get(`cflag:${target}:102`) == 1) { // :6683

        if (era.get(`talent:${target}:314`) == 9) { // :6685
          await era.printAndWait(`「啊嗯…啊啊…啊哈…特别有精神的宝宝哟…${heart(1)}」`); // :6686
          await era.printAndWait(`生完孩子的${target_name}艰难地呼吸着。`); // :6687
          await era.printAndWait(`「因为还在肚子里的时候就很闹腾呢…总是能感觉得到呢…${heart(1)}」`); // :6688
          await era.printAndWait(`青色的肌肤上浮起汗珠、脸上浮现出笑容。`); // :6689
          await era.printAndWait(`「啊嗯…这样的话又想生了…生更多的………${heart(1)}」`); // :6690
        } else { // :6691
          await era.printAndWait(`「啊…我、我的小穴…撑开了…变成这样了………${heart(1)}」`); // :6692
          await era.printAndWait(`大概是因为人类的身体、而且还是以少女的身体生出魔物的缘故吧、${target_name}虚脱了。`); // :6693
          await era.printAndWait(`「主人的小宝宝…十分精神…我已经…哈…哈…${heart(1)}」`); // :6694
          await era.printAndWait(`${master_name}轻轻地抚摸着${target_name}的头让她慢慢陷入沉睡………`); // :6695
        } // :6696

      } else if (era.get(`cflag:${target}:102`) == 5) { // :6698
        if (era.get(`talent:${target}:136`) == 1) { // :6699
          await era.printAndWait(`「生出来了啊…可爱的小狗崽生出来了啊${heart(1)}」`); // :6700
        } else { // :6701
          await era.printAndWait(`「哈啊啊…直到最后都没舍弃希望…真的是狗狗的小宝宝啊………」`); // :6702
        } // :6703

      } else if (era.get(`cflag:${target}:102`) == 7) { // :6705
        await era.printAndWait(`「哈啊…出、出生了…狂王大人的小宝宝…啊呀啊啊」`); // :6706

      } else if (era.get(`talent:${target}:85`)) { // :6708

        if (era.get(`talent:${target}:314`) == 9) { // :6710
          await era.printAndWait(`「生出了精神的小宝宝………」`); // :6711
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}作出产报告。`); // :6712
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`); // :6713
        } else { // :6714
          await era.printAndWait(`「生出了精神的小宝宝………」`); // :6715
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}作出产报告。`); // :6716
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`); // :6717
        } // :6718

      } else if (era.get(`talent:${target}:76`)) { // :6720

        if (era.get(`talent:${target}:314`) == 9) { // :6722
          await era.printAndWait(`「啊啊啊…生孩子原来是这么的舒服…呐…再让我怀孕…我还要怀上更多的孩子…${heart(1)}」`); // :6723
          await era.printAndWait(`${target_name}的魔族的黄色眼瞳水汪汪地、向${master_name}乞求着………`); // :6724
        } else { // :6725
          await era.printAndWait(`「哈啊…生下魔物的孩子原来是这么的舒服…下次想生下主人的孩子哟…${heart(1)}」`); // :6726
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}乞求着………`); // :6727
        } // :6728

      } else if (era.get(`mark:${target}:3`) == 3 && era.get(`cflag:${target}:102`) == 1) { // :6730
        await era.printAndWait(`「不…不要啊…生下你的孩子什么的不要啊…！」`); // :6731
        await era.printAndWait(`事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`); // :6732
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`); // :6733

      } else if (era.get(`mark:${target}:3`) == 3) { // :6735
        await era.printAndWait(`「不…不要啊…生孩子什么的不要啊…！」`); // :6736
        await era.printAndWait(`事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`); // :6737
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`); // :6738

      } else { // :6740

        if (era.get(`talent:${target}:314`) == 9) { // :6742
          await era.printAndWait(`${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`); // :6743
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`); // :6744
          await era.printAndWait(`${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`); // :6745
        } else { // :6746
          await era.printAndWait(`${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`); // :6747
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`); // :6748
          await era.printAndWait(`${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`); // :6749
        } // :6750
      } // :6751
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :6752
      era.set(`cflag:${target}:272`, 1); // :6752

    } else { // :6754

      if (era.get(`talent:${target}:9`) == 1) { // :6756
        await era.printAndWait(`「啊呀呀啊啊…哈啊…精神的小宝宝出生了哟…看呐…姐姐……哈…哈………」`); // :6757
        await era.printAndWait(`精神已经完全混乱的${target_name}嘴里说着莫名其妙的话………`); // :6758

      } else if (era.get(`talent:${target}:85`) && era.get(`cflag:${target}:102`) == 1) { // :6760

        if (era.get(`talent:${target}:314`) == 9) { // :6762
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`); // :6763
          await era.printAndWait(`${target_name}那魔族的黄色眼瞳中流下喜悦的泪水、不停地喘息着。`); // :6764
          await era.printAndWait(`「啊…要生更多…主人的………魔王大人的孩子要生更多………」`); // :6765
        } else { // :6766
          await era.printAndWait(`「生出来啦…啊啊…我的小宝宝出生了哟………」`); // :6767
          await era.printAndWait(`${target_name}流下喜悦的泪水、喘着粗气。`); // :6768
          await era.printAndWait(`「啊…要生更多…主人的………魔王大人的孩子要生更多………」`); // :6769
          await era.printAndWait(`就这样少女成为了被诅咒的魔物的母亲………`); // :6770
        } // :6771

      } else if (era.get(`talent:${target}:76`) && era.get(`cflag:${target}:102`) == 1) { // :6773

        if (era.get(`talent:${target}:314`) == 9) { // :6775
          await era.printAndWait(`「啊嗯…啊啊…啊哈…特别有精神的宝宝哟…${heart(1)}」`); // :6776
          await era.printAndWait(`生完孩子的${target_name}艰难地呼吸着。`); // :6777
          await era.printAndWait(`「因为还在肚子里的时候就很闹腾呢…总是能感觉得到呢…${heart(1)}」`); // :6778
          await era.printAndWait(`青色的肌肤上浮起汗珠、脸上浮现出笑容。`); // :6779
          await era.printAndWait(`「啊嗯…这样的话又想生了…生更多的………${heart(1)}」`); // :6780
        } else { // :6781
          await era.printAndWait(`「啊…我、我的小穴…撑开了…变成这样了………${heart(1)}」`); // :6782
          await era.printAndWait(`大概是因为人类的身体、而且还是以少女的身体生出魔物的缘故吧、${target_name}虚脱了。`); // :6783
          await era.printAndWait(`「主人的小宝宝…十分精神…我已经…哈…哈…${heart(1)}」`); // :6784
          await era.printAndWait(`${master_name}轻轻地抚摸着${target_name}的头让她慢慢陷入沉睡………`); // :6785
        } // :6786

      } else if (era.get(`cflag:${target}:102`) == 5) { // :6788
        if (era.get(`talent:${target}:136`) == 1) { // :6789
          await era.printAndWait(`「生出来了啊…可爱的小狗崽生出来了啊${heart(1)}」`); // :6790
        } else { // :6791
          await era.printAndWait(`「哈啊啊…直到最后都没舍弃希望…真的是狗狗的小宝宝啊………」`); // :6792
        } // :6793

      } else if (era.get(`cflag:${target}:102`) == 7) { // :6795
        await era.printAndWait(`「哈啊…出、出生了…狂王大人的小宝宝…啊呀啊啊」`); // :6796

      } else if (era.get(`talent:${target}:85`)) { // :6798

        if (era.get(`talent:${target}:314`) == 9) { // :6800
          await era.printAndWait(`「生出了精神的小宝宝………」`); // :6801
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}作出产报告。`); // :6802
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`); // :6803
        } else { // :6804
          await era.printAndWait(`「生出了精神的小宝宝………」`); // :6805
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}作出产报告。`); // :6806
          await era.printAndWait(`「但是下次…想生主人的孩子哟………」`); // :6807
        } // :6808

      } else if (era.get(`talent:${target}:76`)) { // :6810

        if (era.get(`talent:${target}:314`) == 9) { // :6812
          await era.printAndWait(`「啊啊啊…生孩子原来是这么的舒服…呐…再让我怀孕…我还要怀上更多的孩子…${heart(1)}」`); // :6813
          await era.printAndWait(`${target_name}的魔族的黄色眼瞳水汪汪地、向${master_name}乞求着………`); // :6814
        } else { // :6815
          await era.printAndWait(`「哈啊…生下魔物的孩子原来是这么的舒服…下次想生下主人的孩子哟…${heart(1)}」`); // :6816
          await era.printAndWait(`${target_name}一脸沉醉地向${master_name}乞求着………`); // :6817
        } // :6818

      } else if (era.get(`mark:${target}:3`) == 3 && era.get(`cflag:${target}:102`) == 1) { // :6820
        await era.printAndWait(`「不…不要啊…生下你的孩子什么的不要啊…！」`); // :6821
        await era.printAndWait(`事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`); // :6822
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`); // :6823

      } else if (era.get(`mark:${target}:3`) == 3) { // :6825
        await era.printAndWait(`「不…不要啊…生孩子什么的不要啊…！」`); // :6826
        await era.printAndWait(`事到如今${target_name}手脚被捆着、一边挣扎一边生下了孩子。`); // :6827
        await era.printAndWait(`「讨厌…不要…我不要生孩子啊………」`); // :6828

      } else { // :6830

        if (era.get(`talent:${target}:314`) == 9) { // :6832
          await era.printAndWait(`${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`); // :6833
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`); // :6834
          await era.printAndWait(`${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`); // :6835
        } else { // :6836
          await era.printAndWait(`${target_name}刚怀孕时还十分抗拒，不过到了临月就完全老实下来了。`); // :6837
          await era.printAndWait(`「像这样生孩子什么的…从来就没想过啊………」`); // :6838
          await era.printAndWait(`${target_name}怜爱地抚摸着鼓起的肚子、就这样平安的生下了孩子………`); // :6839
        } // :6840
      } // :6841
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :6842
      era.set(`cflag:${target}:272`, 1); // :6842
    } // :6843
  } // :6844




  if (era.get('tflag:13') == 13) { // :6849

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) { // :6851

      if (era.get(`talent:${target}:153`)) { // :6853
        await era.printAndWait(`「在我的肚子里孕育着新生命什么的…总感觉不可思议呐」`); // :6854
        await era.printAndWait(`${target_name}迎接着临月抚摸着高高鼓起的肚子………`); // :6855

      } else if (era.get(`talent:${target}:154`)) { // :6857
        await era.printAndWait(`「看啊、这么可爱的小宝宝哦${heart(1)}」`); // :6858
        await era.printAndWait(`${target_name}哄着孩子………`); // :6859
      } // :6860
    } // :6861
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :6862
    era.set(`cflag:${target}:273`, 1); // :6862
  } // :6863




  if (era.get('tflag:13') == 14) { // :6868

    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) { // :6870
      await era.printAndWait(`「已经要从我身边离开了呢………」`); // :6871
    } // :6872
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :6873
    era.set(`cflag:${target}:274`, 1); // :6873
  } // :6874






  if (era.get('tflag:13') == 999) { // :6881

    if (era.get(`talent:${target}:85`)) { // :6883
      await era.printAndWait(''); // :6884

    } else { // :6886
      await era.printAndWait(''); // :6887
    } // :6888
  } // :6889




  if (era.get('tflag:13') == 998) { // :6894

    if (era.get(`talent:${target}:85`)) { // :6896
      await era.printAndWait(''); // :6897

    } else { // :6899
      await era.printAndWait(''); // :6900
    } // :6901
  } // :6902




  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :6907
  era.set('tflag:13', 0); // :6907

  return 0; // :6909
















































}

// @DUNGEON_RYOUZYOKU_K5 // :6958
async function DUNGEON_RYOUZYOKU_K5() {



  await era.printAndWait(`「我、我明明顺路来到这里而已…！」`); // :6962

  if (era.get(`talent:${target}:0`) == 1) { // :6964

    await era.printAndWait(`「不要啊…我、我在这种地方………！」`); // :6966
    await era.printAndWait(`${target_name}挥动着孱弱的双臂、不过轻易就被按住了……`); // :6967

    await era.printAndWait(`「那、那样的肉棒…一点也不吓人唔…哇啊啊！」`); // :6969
  } else { // :6970

    await era.printAndWait(`「不要啊…放开我！」`); // :6972
    await era.printAndWait(`${target_name}挥动着孱弱的双臂、不过轻易就被按住了……`); // :6973

    await era.printAndWait(`「呼、哼、这样的…完全没问题……！」`); // :6975
  } // :6976

  return 0; // :6978


}

// @DUNGEON_RYOUZYOKU_AFTER_K5 // :6981
async function DUNGEON_RYOUZYOKU_AFTER_K5() {




  if (era.get(`talent:${target}:0`) == 1) { // :6986

    await era.printAndWait(`「啊…已、已经受够了啊……」`); // :6988
    await era.printAndWait(`${target_name}被残忍地凌辱了、不过好像还是处女……`); // :6989


    if (era.get(`exp:${target}:1`) > 20) { // :6992
      await era.printAndWait(`${target_name}的肛门被强硬地拨开、里面的肉都翻了出来……`); // :6993
      await era.printAndWait(`「啊…屁股…已、已经…坏掉…坏掉了啊……」`); // :6994
    } // :6995

    if (era.get(`exp:${target}:22`) > 20) { // :6997
      await era.printAndWait(`「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脱臼了……」`); // :6998
      await era.printAndWait(`${target_name}有时候已经张不开嘴了……`); // :6999
    } // :7000

    if (era.get(`exp:${target}:20`) > 20) { // :7002
      await era.printAndWait(`「咕哎…哦哎哎…动物的味道…嗯咕哎哎……」`); // :7003
      await era.printAndWait(`${target_name}吐出了嘴里的精液……`); // :7004
    } // :7005
  } else { // :7006

    await era.printAndWait(`「啊、啊啊…这样的好脏啊……」`); // :7008
    await era.printAndWait(`${target_name}被残忍地凌辱了……`); // :7009


    if (era.get(`exp:${target}:0`) > 20) { // :7012
      await era.printAndWait(`「啊…哎呀…哎呀啊…本小姐的那里…坏掉…坏掉的啊……」`); // :7013
      await era.printAndWait(`${target_name}的宫颈被扯了出来、大量粘液从里边溢了出来…`); // :7014
    } // :7015

    if (era.get(`exp:${target}:1`) > 20) { // :7017
      await era.printAndWait(`${target_name}的肛门被强硬地拨开、里面的肉都翻了出来……`); // :7018
      await era.printAndWait(`「啊…屁股…已、已经…坏掉…坏掉了啊……」`); // :7019
    } // :7020


    if (era.get(`exp:${target}:22`) > 20) { // :7023
      await era.printAndWait(`「嗯哎…嗯哦…哦哎哎……啊、下巴…快要脱臼了……」`); // :7024
      await era.printAndWait(`${target_name}有时候已经张不开嘴了……`); // :7025
    } // :7026


    if (era.get(`exp:${target}:20`) > 20) { // :7029
      await era.printAndWait(`「咕哎…哦哎哎…动物的味道…嗯咕哎哎……」`); // :7030
      await era.printAndWait(`${target_name}吐出了嘴里的精液……`); // :7031
    } // :7032
  } // :7033


}

// @BENKI_KOUJO_K5 // :7036
async function BENKI_KOUJO_K5() {




  if (era.get('flag:62') == 0) { // :7041


    if (era.get(`talent:${a}:76`) == 1) { // :7044
      await era.printAndWait(`「啊嗯${heart(1)} 请给我更多的肉棒…把我弄得更加黏乎乎的吧…${heart(1)}」`); // :7045

    } else if (era.get(`talent:${a}:85`)) { // :7047
      await era.printAndWait(`「咿嘻…不、不要…主人啊…再也不会做坏事了…快点…救救我……」`); // :7048

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7050
      await era.printAndWait(`「啊…还有这么多小鸡鸡哦…${heart(1)}」`); // :7051

    } else { // :7053
      await era.printAndWait(`「咳…咳咳…请、请放过我……」`); // :7054
    } // :7055
  } else if (era.get('flag:62') == 1) { // :7056


    if (era.get(`talent:${a}:76`) == 1) { // :7059
      await era.printAndWait(`「啊啊…姐姐大人…请再多使用我的身体…${heart(1)}」`); // :7060

    } else if (era.get(`talent:${a}:85`)) { // :7062
      await era.printAndWait(`「嗯…嗯啊…再、再这样下去…不、不可以……要回不去了……」`); // :7063

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7065
      await era.printAndWait(`「是、知道了…更多的侍奉……」`); // :7066

    } else { // :7068
      await era.printAndWait(`「啊那样的…啊……你、想怎么样就怎么样吧……」`); // :7069
    } // :7070
  } else if (era.get('flag:62') == 2) { // :7071


    if (era.get(`talent:${a}:76`) == 1) { // :7074
      await era.printAndWait(`「啊嗯…哈啊${heart(1)} 更多地侵犯我啊${heart(1)} 用动物肉棒让我怀孕吧${heart(1)}」`); // :7075

    } else if (era.get(`talent:${a}:85`)) { // :7077
      await era.printAndWait(`「呕…动物的味道…不能忍受…呕哦哦哦${heart(1)}」`); // :7078

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7080
      await era.printAndWait(`「好喜欢动物肉棒…请再多让我侍奉它！」`); // :7081

    } else { // :7083
      await era.printAndWait(`「啊…哈啊…染上动物的气味了……」`); // :7084
    } // :7085
  } else if (era.get('flag:62') == 3) { // :7086


    if (era.get(`talent:${a}:76`) == 1) { // :7089
      await era.printAndWait(`「啊啊…被当成便器也可…可以哟${heart(1)}…更…更多地侵犯我啊${heart(1)}」`); // :7090

    } else if (era.get(`talent:${a}:85`)) { // :7092
      await era.printAndWait(`「哈…哈…那里被精液射得满满的……${heart(1)}」`); // :7093

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7095
      await era.printAndWait(`「再…请再射给我更多…精液很好吃哦……」`); // :7096

    } else { // :7098
      await era.printAndWait(`「坏、坏掉了呜…再这样下去会坏掉的……」`); // :7099
    } // :7100
  } else if (era.get('flag:62') == 4) { // :7101


    if (era.get(`talent:${a}:76`) == 1) { // :7104
      await era.printAndWait(`「在小穴里…射出更多${heart(1)}……用更多的精液把我弄的更加黏乎乎的吧…${heart(1)}」`); // :7105

    } else if (era.get(`talent:${a}:85`)) { // :7107
      await era.printAndWait(`「哈啊…啊…小穴里…精液满满的…啊哈哈……」`); // :7108

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7110
      await era.printAndWait(`「请让我那边变得更加的舒服啊咿……」`); // :7111

    } else { // :7113
      await era.printAndWait(`「哎呀啊…我的那里…要变成笨蛋了呜……」`); // :7114
    } // :7115
  } else if (era.get('flag:62') == 5) { // :7116


    if (era.get(`talent:${a}:76`) == 1) { // :7119
      await era.printAndWait(`「啊…哈啊…请…请更多地侵犯我的肛门啊哎…${heart(1)}」`); // :7120

    } else if (era.get(`talent:${a}:85`)) { // :7122
      await era.printAndWait(`「啊…撑开成这样…肛门…请更多地使用……${heart(1)}」`); // :7123

    } else if (era.get(`abl:${a}:16`) >= 5) { // :7125
      await era.printAndWait(`「是哟…我…是大家的肛门小穴便器…♪」`); // :7126

    } else { // :7128
      await era.printAndWait(`「啊…呼啊…我…真的变成便器了……」`); // :7129
    } // :7130
  } // :7131

  return 0; // :7133



}

// @DUNGEON_VICTORY_K5 // :7137
async function DUNGEON_VICTORY_K5() {




  if (era.get(`talent:${a}:76`) == 1) { // :7142

    await era.printAndWait(`「啊哈哈…快点来侵犯我啊…${heart(1)}」`); // :7144
    await era.print(''); // :7145

    if (rand_n(3) == 0) { // :7147
      await era.printAndWait(`「喂喂、能让我满足的男人不存在的话！？ 女人也是可以的哟${heart(1)}」`); // :7148
    } else if (rand_n(2) == 0) { // :7149
      await era.printAndWait(`「干脆、直接坐马车到魔王那边去吧${heart(1)}」`); // :7150
    } else { // :7151
      await era.printAndWait(`「真是的！尸体的话就不能勃起了！」`); // :7152
    } // :7153

    if ((era.get(`base:${a}:0`) * 100 / era.get(`maxbase:${a}:0`) < 50) || (era.get(`base:${a}:1`) * 100 / era.get(`maxbase:${a}:1`) < 50)) { // :7155

      await era.printAndWait(`${target_name}倚靠着墙壁瘫倒下来。`); // :7157
      await era.printAndWait(`「…………如果就这样倒下的话就不会被袭击了吧${heart(1)}」`); // :7158
    } else { // :7159

      await era.printAndWait(`${target_name}依靠着墙壁坐了下来。`); // :7161
      await era.printAndWait(`「再向深处进发被更多怪物侵犯或许也不错…${heart(1)}」`); // :7162
    } // :7163
  } else { // :7164

    await era.printAndWait(`「我、只是被派到这里来的而已…」`); // :7166
    await era.print(''); // :7167

    if (rand_n(3) == 0) { // :7169
      await era.printAndWait(`「喂喂、不想受伤的话就赶快逃走哦！」`); // :7170
    } else if (rand_n(2) == 0) { // :7171
      await era.printAndWait(`「等等！这边正在和魔王大人说话呢所以别来打扰我哟！」`); // :7172
    } else { // :7173
      await era.printAndWait(`「啊啊！已经！……累了唔！」`); // :7174
    } // :7175

    if ((era.get(`base:${a}:0`) * 100 / era.get(`maxbase:${a}:0`) < 50) || (era.get(`base:${a}:1`) * 100 / era.get(`maxbase:${a}:1`) < 50)) { // :7177

      await era.printAndWait(`${target_name}倚靠着墙壁瘫倒下来。`); // :7179
      await era.printAndWait(`「…再这样下去就危险了」`); // :7180
    } else { // :7181

      await era.printAndWait(`${target_name}依靠着墙壁坐了下来。`); // :7183
      await era.printAndWait(`「呼呜…只要稍微休息下就绝对没问题了！」`); // :7184
    } // :7185
  } // :7186

  return 0; // :7188



}

// @DUNGEON_ATTACK_K5 // :7192
async function DUNGEON_ATTACK_K5() {




  if (era.get(`cflag:${target}:1`) == 2) { // :7197

    if (rand_n(3) == 0) { // :7199
      await era.printAndWait(`「即使有阻碍也！」`); // :7200
    } else if (rand_n(2) == 0) { // :7201
      await era.printAndWait(`「厉害的一击要来了哟！」」`); // :7202
    } else { // :7203
      await era.printAndWait(`「这就是我认真的一击！」`); // :7204
    } // :7205
  } else { // :7206

    if (rand_n(3) == 0) { // :7208
      await era.printAndWait(`「抱歉呢勇者姐姐！」`); // :7209
    } else if (rand_n(2) == 0) { // :7210
      await era.printAndWait(`「姐姐们也会成为魔王大人的僕人哟！」`); // :7211
    } else { // :7212
      await era.printAndWait(`「不要因为我小就小看我啊！」`); // :7213
    } // :7214
  } // :7215



  return 0; // :7219







}

// @COLOSSEUM_KOJO_5 // :7227
async function COLOSSEUM_KOJO_5() {



  if (era_flag.selectcom == 55) { // :7231

    if (era.get(`base:${target}:1`) <= 0) { // :7233
      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // :7234
    } else { // :7235
      await era.printAndWait(`${target_name}看着死斗场里狂热的氛围和之后要对战的对手、吓得直哆嗦……`); // :7236
    } // :7237
    return 0; // :7238
  } // :7239



  if (era_flag.selectcom == 56) { // :7243

    if (era.get(`base:${target}:1`) <= 0) { // :7245

      if (era_flag.assi > 0 && era_flag.assiplay) { // :7247
        await era.printAndWait(`「呼…呼…已、已经不行了………哈啊啊……」`); // :7248
        await era.printAndWait(`精疲力尽的${target_name}瘫坐着不动、抽泣着……`); // :7249
      } else { // :7250
        await era.printAndWait(`「不要、不要啊…不要过来…！」`); // :7251
        await era.printAndWait(`精疲力尽的${target_name}瘫坐着不动、抽泣着……`); // :7252
      } // :7253
    } else { // :7254

      if (era_flag.assi > 0 && era_flag.assiplay) { // :7256
        await era.printAndWait(`「不、不要啊…勇者大人是不可能战胜的……」`); // :7257
        await era.printAndWait(`${target_name}看着被${master_name}命令全副武装的${assi_name}、一副快要哭出来的样子……`); // :7258
      } else { // :7259
        await era.printAndWait(`「救、救救我啊…主人…我、我什么坏事都没做啊……」`); // :7260
        await era.printAndWait(`${target_name}看着丑陋的怪物们、向${master_name}乞求帮助……`); // :7261
      } // :7262
    } // :7263
    return 0; // :7264
  } // :7265




  if (era_flag.selectcom == 31) { // :7270

    if (era_flag.assi > 0 && era_flag.assiplay) { // :7272
      await era.printAndWait(`「啊…因、因为有好好地吮吸…所以不会痛啦……嗯嗯咕呜……」`); // :7273
      await era.print(`舔着${assi_name}的`); // :7274
      if (era.get(`talent:${assi}:121`) == 1 || era.get(`talent:${assi}:122`) == 1) { // :7276
        await era.print(`阴茎`); // :7276
      } // :7276
      if (era.get(`talent:${assi}:121`) != 1 && era.get(`talent:${assi}:122`) != 1 && era.get('item:PBAND') == 1) { // :7278
        await era.print(`假阳具`); // :7278
      } // :7278
      await era.printAndWait(`${target_name}露出心旷神怡的表情……`); // :7279
    } else { // :7280
      await era.printAndWait(`「啊…噗…嗯嗯呜哦…咳咳…呜呜呜……」`); // :7281
      await era.printAndWait(`${target_name}吮吸着散发出令人作呕的气味的阴茎……`); // :7282
    } // :7283
    return 0; // :7284
  } // :7285



  if (era_flag.selectcom == 5) { // :7289

    if (era_flag.assi > 0 && era_flag.assiplay) { // :7291
      await era.printAndWait(`「住…住手…勇者姐姐…啊！」`); // :7292
      await era.printAndWait(`${target_name}任由${assi_name}摆布……`); // :7293
    } else { // :7294
      await era.printAndWait(`「哎呀…放开我…啊啊…好、好痛…啊！」`); // :7295
      await era.printAndWait(`${target_name}的胸被用力揉捏、发出了痛苦的呻吟……`); // :7296
    } // :7297
    return 0; // :7298
  } // :7299



  if (era_flag.selectcom == 21) { // :7303

    if (era_flag.assi > 0 && era_flag.assiplay) { // :7305
      await era.printAndWait(`「不要啊…好过分…已经够了啦…哎呀啊！」`); // :7306
      await era.print(`${assi_name}一边听着哀嚎`); // :7307
      if (era.get(`talent:${assi}:121`) == 1 || era.get(`talent:${assi}:122`) == 1) { // :7309
        await era.print(`阴茎`); // :7309
      } // :7309
      if (era.get(`talent:${assi}:121`) != 1 && era.get(`talent:${assi}:122`) != 1 && era.get('item:PBAND') == 1) { // :7311
        await era.print(`假阳具`); // :7311
      } // :7311
      await era.printAndWait(`继续毫不留情地蹂躏着${target_name}的阴道……`); // :7312

    } else if (era.get('tflag:400') == 206) { // :7314
      await era.printAndWait(`「啊…啊哈…咕嘿…咕哎哎……」`); // :7315
      await era.printAndWait(`可怜的${target_name}一边发出蛤蟆被弄碎时发出的惨叫一边任由怪物摆弄……`); // :7316
    } else { // :7317
      await era.printAndWait(`「哈…哈啊…坏掉了要坏掉了！」`); // :7318
      await era.printAndWait(`${target_name}被怪物侵犯着……`); // :7319
    } // :7320
    return 0; // :7321
  } // :7322




  if (era_flag.selectcom == 27) { // :7327

    if (era_flag.assi > 0 && era_flag.assiplay) { // :7329
      await era.printAndWait(`「不要啊…不能插那边啊…已经够了啦…哎呀啊！」`); // :7330
      await era.print(`${assi_name}一边听着哀嚎`); // :7331
      if (era.get(`talent:${assi}:121`) == 1 || era.get(`talent:${assi}:122`) == 1) { // :7333
        await era.print(`阴茎`); // :7333
      } // :7333
      if (era.get(`talent:${assi}:121`) != 1 && era.get(`talent:${assi}:122`) != 1 && era.get('item:PBAND') == 1) { // :7335
        await era.print(`假阳具`); // :7335
      } // :7335
      await era.printAndWait(`继续毫不留情地蹂躏着${target_name}的肛门……`); // :7336

    } else if (era.get('tflag:400') == 206) { // :7338
      await era.printAndWait(`「啊…啊哈…咕嘿…咕哎哎……」`); // :7339
      await era.printAndWait(`可怜的${target_name}一边发出蛤蟆被弄碎时发出的惨叫一边任由怪物摆弄……`); // :7340
    } else { // :7341
      await era.printAndWait(`「咿…咿…屁股…屁股要裂开来了！」`); // :7342
      await era.printAndWait(`${target_name}被怪物侵犯着肛门……`); // :7343
    } // :7344
    return 0; // :7345
  } // :7346




  if (era_flag.selectcom == 51) { // :7351
    await era.printAndWait(`「啊…身、身体好烫…啊啊…！」`); // :7352
    return 0; // :7353
  } // :7354


  return 0; // :7357



}

// @NTR_KOUJO_K5 // :7361
async function NTR_KOUJO_K5() {


  if (era.get(`cflag:${target}:650`) == 0) { // :7365
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :7365
    era.set(`cflag:${target}:650`, 1); // :7365
  } // :7365

  if (P == 1) { // :7367

    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7369
      await era.printAndWait(`「不要啊！我的第一次要献给魔王大人的啊…啊…嘻咿！」`); // :7370
    } else { // :7371
      await era.printAndWait(`「为什么…我明明只是个村娘…啊咿…哈…啊啊啊哈！」`); // :7372
    } // :7373
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :7374
    era.set(`cflag:${target}:651`, 1); // :7374

  } else if (P == 2) { // :7376
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7377
      await era.printAndWait(`「好难受…明明好难受、可是…为什么…肛门被侵犯…这样的…嘻咿…咿…咿嘻${heart(1)}」`); // :7378
    } else { // :7379
      await era.printAndWait(`「不是的…我…的屁股有感觉什么的…啊…啊♪啊♪」`); // :7380
    } // :7381
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :7382
    era.set(`cflag:${target}:652`, 1); // :7382

  } else if (P == 3) { // :7384
    if (era.get(`talent:${target}:136`)) { // :7385
      await era.printAndWait(`「哎呀嗯…被看见了…被狗狗干到高潮的地方被看到了啊${heart(1)}」`); // :7386
    } else if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7387
      await era.printAndWait(`「不要…不要看…不要看…嘻咿…啊啊…这么深的地方…被侵犯…救救我…救救我啊魔王大人………」`); // :7388
    } else { // :7389
      await era.printAndWait(`「为什么…我看到的这么多…不合道理啊…狗狗的小鸡鸡…全部都由我来…哈…呀啊！」`); // :7390
    } // :7391
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :7392
    era.set(`cflag:${target}:653`, 1); // :7392

  } else if (P == 4) { // :7394
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7395
      await era.printAndWait(`「对不起魔王大人…我…被狂王大人…侵犯地…好有感觉…已经变成这样的小姑娘什么的…忘了我吧…啊啊${heart(1)}」`); // :7396
    } else { // :7397
      await era.printAndWait(`「啊啊嗯…狂王大人啊…我的小穴…再多侵犯几次啊♪」`); // :7398
    } // :7399
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :7400
    era.set(`cflag:${target}:654`, 1); // :7400

  } else if (P == 5) { // :7402
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7403
      await era.printAndWait(`「嗯呼呼…我的小穴和肛门你们都能插进来所以${heart(1)}」`); // :7404
      await era.printAndWait(`「啊…就是那样…哟…虽然我还是个孩子但…还请不要和我客气…啊啊啊嗯${heart(1)}」`); // :7405
    } else { // :7406
      await era.printAndWait(`「嘻咿咿咿！那里和屁股都…要坏掉…坏掉了啦…但是…好舒服…脑袋要变得奇怪了♪」」`); // :7407
    } // :7408
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :7409
    era.set(`cflag:${target}:655`, 1); // :7409

  } else if (P == 6) { // :7411
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7412
      await era.printAndWait(`「被魔王玩弄的我…请多施舍给我一点你们的怜悯…拜托了…小穴以外的免费干也可以哟…哈啊…十分感谢${heart(1)}」`); // :7413
    } else { // :7414
      await era.printAndWait(`「哈啊…被各位玩弄之后…魔王遗留在我身体里的污秽被净化了…所以…请更多地…更多地使用我吧…♪」`); // :7415
    } // :7416
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :7417
    era.set(`cflag:${target}:656`, 1); // :7417

  } else if (P == 7) { // :7419
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7420
      await era.printAndWait(`「魔王大人…对不起呢、我已经成为狂王大人的东西了…今后也会以侍奉狂王大人为生」`); // :7421
      await era.printAndWait(`「魔王大人关于我的事…请全部都忘了吧………啊…狂王大人…啊哈…呜…呼呜${heart(1)}」`); // :7422
    } else { // :7423
      await era.printAndWait(`「是…会更多地…侍奉狂王大人的…嗯…嗯啾…啾啪………♪」`); // :7424
    } // :7425
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :7426
    era.set(`cflag:${target}:657`, 1); // :7426

  } else if (P == 20) { // :7428
    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) { // :7429
      if (era.get(`cflag:${target}:102`) == 1) { // :7430
        await era.printAndWait(`「魔王大人的小宝宝…还给我…把我的小宝宝…还给我………」`); // :7431
      } else { // :7432
        await era.printAndWait(`「啊啊啊…小宝宝要生出来了…魔王大人也在看啊…呀啊啊啊…」`); // :7433
      } // :7434
    } else { // :7435
      await era.printAndWait(`「啊…哈啊…我…在这里被大家看着…已经、不行了………」`); // :7436
    } // :7437
  } // :7438
  return 0; // :7439

}

// @EXUCUTION_KOUJO_K5 // :7441
async function EXUCUTION_KOUJO_K5() {


  if (era.get('tflag:16') == 4) { // :7444
    await era.printAndWait(`「不、不要…以后一直…变成怪物们的肉便器什么的…不要啊………」`); // :7445

  } else if (era.get('tflag:16') == 5) { // :7447
    await era.printAndWait(`「让我这种人成为战斗人员什么的要我怎么做啊………」`); // :7448

  } else if (era.get('tflag:16') == 6) { // :7450
    await era.printAndWait(`「呜呜呜…处罚什么的…为什么…究竟是为什么啊………」`); // :7451

  } else if (era.get('tflag:16') == 7) { // :7453
    await era.printAndWait(''); // :7454
  } // :7455


}

// @MUSEUM_KOUJO_K5 // :7458
async function MUSEUM_KOUJO_K5() {


  if (era.get('tflag:500') == 0) { // :7461
    await era.printAndWait(`「把我变成石像放在身边什么的…魔王大人的想法我完全不明白啊…请不要做那样的事啊………」`); // :7462

  } else if (era.get('tflag:500') == 1) { // :7464
    await era.printAndWait(`「剥制标本…那是对鸟和狐狸什么的才会做的事情啊」`); // :7465

  } else if (era.get('tflag:500') == 2) { // :7467
    await era.printAndWait(''); // :7468

  } else if (era.get('tflag:500') == 3) { // :7470
    await era.printAndWait(''); // :7471

  } else if (era.get('tflag:500') == 4) { // :7473
    await era.printAndWait(''); // :7474

  } else if (era.get('tflag:500') == 5) { // :7476
    await era.printAndWait(''); // :7477

  } else if (era.get('tflag:500') == 6) { // :7479
    await era.printAndWait(''); // :7480

  } else if (era.get('tflag:500') == 7) { // :7482
    await era.printAndWait(''); // :7483

  } else if (era.get('tflag:500') == 8) { // :7485
    await era.printAndWait(''); // :7486

  } else if (era.get('tflag:500') == 9) { // :7488
    await era.printAndWait(''); // :7489
  } // :7490


}

// @BANISHMENT_KOUJO_K5 // :7493
async function BANISHMENT_KOUJO_K5() {



  if (era.get('tflag:510') == 0) { // :7497
    await era.printAndWait(`「这样终于…终于能回到姐姐身边去了………」`); // :7498

  } else if (era.get('tflag:510') == 1) { // :7500
    await era.printAndWait(''); // :7501

  } else if (era.get('tflag:510') == 2) { // :7503
    await era.printAndWait(''); // :7504

  } else if (era.get('tflag:510') == 3) { // :7506
    await era.printAndWait(''); // :7507

  } else if (era.get('tflag:510') == 4) { // :7509
    await era.printAndWait(''); // :7510
  } // :7511


}

// @PUBLIC_EXUCUTION_KOUJO_K5 // :7514
async function PUBLIC_EXUCUTION_KOUJO_K5() {



  if (era.get('tflag:520') == 0) { // :7518
    await era.printAndWait(`「在骗我吧…一直干我到死为止什么的…不…不要…不要啊！」`); // :7519

  } else if (era.get('tflag:520') == 1) { // :7521
    await era.printAndWait(`「明明什么坏事都没做…为什么…要赐我绞首刑啊…魔王大人………」`); // :7522

  } else if (era.get('tflag:520') == 2) { // :7524
    await era.printAndWait(''); // :7525
  } // :7526


}

// @GROTESQUE_KOUJO_K5 // :7529
async function GROTESQUE_KOUJO_K5() {



  if (era.get('tflag:530') == 0) { // :7533
    await era.printAndWait(''); // :7534

  } else if (era.get('tflag:530') == 1) { // :7536
    await era.printAndWait(''); // :7537

  } else if (era.get('tflag:530') == 2) { // :7539
    await era.printAndWait(''); // :7540

  } else if (era.get('tflag:530') == 3) { // :7542
    await era.printAndWait(''); // :7543

  } else if (era.get('tflag:530') == 4) { // :7545
    await era.printAndWait(''); // :7546

  } else if (era.get('tflag:530') == 5) { // :7548
    await era.printAndWait(''); // :7549

  } else if (era.get('tflag:530') == 6) { // :7551
    await era.printAndWait(''); // :7552
  } // :7553


}

// @ENTERENEMY_KOUJO_K5 // :7556
async function ENTERENEMY_KOUJO_K5() {



  if (era.get(`talent:${a}:76`) == 1) { // :7560
    await era.printAndWait(`「那个~…”等会你乖乖地在那个洞里被干”被那位大人这样吩咐过了${heart(1)}」`); // :7561
  } else { // :7562
    await era.printAndWait(`「那个~过会能带我去魔王大人那里吗？」`); // :7563
  } // :7564


}

// @GOHOUBI_REQUEST_KOUJO_K5 // :7567
async function GOHOUBI_REQUEST_KOUJO_K5() {

  if (era.get(`cflag:${a}:504`) == 0) { // :7569

    await era.printAndWait(`「那个、想要钱作为奖赏、尽可能多的钱」`); // :7571
  } else if (era.get(`cflag:${a}:504`) == 1 || era.get(`cflag:${a}:504`) == 2 || era.get(`cflag:${a}:504`) == 3) { // :7572

    await era.print(`「如果打倒勇者姐姐的话请给我奖赏、好想和`); // :7574
    if (era.get(`cflag:${a}:504`) == 1) { // :7575
      await era.print(`犬`); // :7576
    } else if (era.get(`cflag:${a}:504`) == 2) { // :7577
      await era.print(`豚`); // :7578
    } else if (era.get(`cflag:${a}:504`) == 3) { // :7579
      await era.print(`马`); // :7580
    } // :7581
    await era.printAndWait(`做爱啊♪」`); // :7582
  } else if (era.get(`cflag:${a}:504`) == 4) { // :7583

    await era.printAndWait(`「事后给本小姐一个吻就可以哟♪」`); // :7585
  } else if (era.get(`cflag:${a}:504`) == 5) { // :7586

    await era.printAndWait(`「奖赏的话、想要和魔王大人做爱啊」`); // :7588
  } else if (era.get(`cflag:${a}:504`) == 6) { // :7589

    await era.printAndWait(`「能喝到魔王大人的精液的话不管什么都能做哟」`); // :7591
  } else if (era.get(`cflag:${a}:504`) == 7) { // :7592

    await era.printAndWait(`「奖赏是乱交派对就好！」`); // :7594
  } else if (era.get(`cflag:${a}:504`) == 8) { // :7595

    await era.printAndWait(`「如果平安回来的话、想要喝魔王大人的尿尿哦」`); // :7597
  } else if (era.get(`cflag:${a}:504`) == 9) { // :7598

    await era.printAndWait(`「奖赏？我想要去狩猎童贞♪」`); // :7600
  } // :7601

}

// @GOHOUBI_AFTER_KOUJO_K5 // :7603
async function GOHOUBI_AFTER_KOUJO_K5() {





  if (era.get('tflag:18') == 0) { // :7609
    await era.printAndWait(`「真小气！」`); // :7610

  } else if (era.get('tflag:18') == 1) { // :7612
    await era.printAndWait(`「欸嘿嘿、是奖赏徽章啊」`); // :7613
  } else if (era.get('tflag:18') == 2) { // :7614

    if (era.get(`cflag:${a}:504`) == 0) { // :7616
      await era.printAndWait(`「那个、虽然想把这个钱给姐姐但………」`); // :7617

    } else if (era.get(`cflag:${a}:504`) == 1) { // :7619

      if (era.get(`talent:${a}:0`) == 1) { // :7621
        await era.printAndWait(`「啊啊啊！和小狗肛交好棒啊！好舒服！」`); // :7622
      } else { // :7623
        await era.printAndWait(`「啊啊啊！和小狗做爱好棒啊！好舒服！」`); // :7624
      } // :7625

    } else if (era.get(`cflag:${a}:504`) == 2) { // :7627

      if (era.get(`talent:${a}:0`) == 1) { // :7629
        await era.printAndWait(`「啊啊啊！和猪肛交好棒啊！好舒服！」`); // :7630
      } else { // :7631
        await era.printAndWait(`「啊啊啊！和猪做爱好棒啊！好舒服！」`); // :7632
      } // :7633

    } else if (era.get(`cflag:${a}:504`) == 3) { // :7635

      if (era.get(`talent:${a}:0`) == 1) { // :7637
        await era.printAndWait(`「啊啊啊！和马肛交好棒啊！好舒服！」`); // :7638
      } else { // :7639
        await era.printAndWait(`「啊啊啊！和马做爱好棒啊！好舒服！」`); // :7640
      } // :7641

    } else if (era.get(`cflag:${a}:504`) == 4) { // :7643
      await era.printAndWait(`「作为奖励的吻…感觉不一样呢………这样的…或许更喜欢也不一定呢」`); // :7644

    } else if (era.get(`cflag:${a}:504`) == 5) { // :7646

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) { // :7648
        await era.printAndWait(`「啊嗯！比平时还要激烈！呼啊！喜欢哟！最喜欢了！」`); // :7649

      } else { // :7651
        await era.printAndWait(`「啊嗯！比平时还要激烈！呼啊！喜欢哟！最喜欢了！」`); // :7652
      } // :7653

    } else if (era.get(`cflag:${a}:504`) == 6) { // :7655
      await era.printAndWait(`「呼呜…哈啊…魔王大人的精液美味得要让我发狂了♪」`); // :7656

    } else if (era.get(`cflag:${a}:504`) == 7) { // :7658

      if (era.get(`talent:${a}:0`) == 1) { // :7660
        await era.printAndWait(`「哈啊…还想要乱交派对………必须努力打倒勇者姐姐♪」`); // :7661
      } else { // :7662
        await era.printAndWait(`「哈啊…还想要乱交派对………必须努力打倒勇者姐姐♪」`); // :7663
      } // :7664

    } else if (era.get(`cflag:${a}:504`) == 8) { // :7666
      await era.printAndWait(`「承蒙款待、尿尿很美味哟、魔王大人${heart(1)}」`); // :7667

    } else if (era.get(`cflag:${a}:504`) == 9) { // :7669

      if (era.get(`abl:${a}:2`) > era.get(`abl:${a}:3`)) { // :7671
        await era.printAndWait(`「呜呼呼、魔王大人的女人让你成为男人的感想如何呀？」`); // :7672

      } else { // :7674
        await era.printAndWait(`「变得这么拼命地扭动着腰还真是可爱啊、你」`); // :7675
      } // :7676
    } else { // :7677
    } // :7678
  } // :7679

}

// @OSIOKI_KOUJO_K5 // :7681
async function OSIOKI_KOUJO_K5() {





  if (era.get('tflag:18') == 0) { // :7687
    await era.printAndWait(`「十、十分感谢！十分感谢您！」`); // :7688

  } else if (era.get('tflag:18') == 1) { // :7690

    if (era.get(`abl:${a}:21`) >= 3) { // :7692
      await era.printAndWait(`「啊呜…呜呃…啊呜…好厉害…电椅好棒${heart(1)}」`); // :7693
    } else { // :7694
      await era.printAndWait(`「呜嘻咿咿咿！不要啊啊啊！请放过我吧！」`); // :7695
    } // :7696

  } else if (era.get('tflag:18') == 2) { // :7698

    if (era.get(`abl:${a}:17`) >= 4) { // :7700
      await era.printAndWait(`「啊嗯、真是的${heart(1)} 虽然可以看但是触摸禁止哟♪」`); // :7701
    } else { // :7702
      await era.printAndWait(`「呜哦哦咕…不要看…不要笑啊！」`); // :7703
    } // :7704

  } else if (era.get('tflag:18') == 3) { // :7706

    if (era.get(`abl:${a}:17`) >= 6) { // :7708
      await era.printAndWait(`「啊嗯…哈啊…再多看看我…请再多看看我啊${heart(1)}」`); // :7709
    } else { // :7710
      await era.printAndWait(`「呜啊啊啊啊…呜呃呃呃啊」`); // :7711
    } // :7712

  } else if (era.get('tflag:18') == 4) { // :7714

    if (era.get(`abl:${a}:21`) >= 3) { // :7716
      await era.printAndWait(`「被魔王大人打的快要高潮了！请再多处罚我吧！」`); // :7717
    } else { // :7718
      await era.printAndWait(`「对不起！对不起！下次不会再失败了！」`); // :7719
    } // :7720

  } else if (era.get('tflag:18') == 5) { // :7722

    if (era.get(`talent:${a}:88`) == 1 || era.get(`talent:${a}:76`) == 1) { // :7724
      await era.printAndWait(`「尿尿好好吃…♪」`); // :7725
    } else { // :7726
      await era.printAndWait(`「呜…好臭要被熏死了………」`); // :7727
    } // :7728

  } else if (era.get('tflag:18') == 6) { // :7730
    await era.printAndWait(`「讨厌啊、要想起从前的事了」`); // :7731

  } else if (era.get('tflag:18') == 7) { // :7733
    await era.printAndWait(`「呐、习惯了之后完全没问题嘛」`); // :7734

  } else if (era.get('tflag:18') == 8) { // :7736
    await era.printAndWait(`「咕呜呜呜！已经、已经不行了！要疯掉了！我已经要疯掉了！已经什么都呜啊啊啊！」`); // :7737

  } else if (era.get('tflag:18') == 9) { // :7739
    await era.printAndWait(`「嘎哦～♪嘎哦～♪」`); // :7740
  } // :7741



}

// @GOBI_KOUJO_K5, ARG:0 // :7745
async function GOBI_KOUJO_K5() {


  if (arg_0 == 1) { // :7748

    await era.print(`的噢~♪`); // :7750
  } else if (arg_0 == 2) { // :7751

    await era.print(`的啊！`); // :7753
  } else if (arg_0 == 3) { // :7754

    await era.print(`来着……。`); // :7756
  } else if (arg_0 == 4) { // :7757

    await era.print(`来的呢……。`); // :7759
  } else if (arg_0 == 5) { // :7760

    await era.print(`的啊……。`); // :7762
  } else { // :7763


    if (rand_n(3) == 0) { // :7766
      await era.print(`来着。`); // :7767
    } else if (rand_n(2) == 0) { // :7768
      await era.print(`的啊。`); // :7769
    } else { // :7770
      await era.print(`的噢。`); // :7771
    } // :7772
  } // :7773




}

// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====
// 1. :94 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
// 2. :338 CALL K5_KOJO2 —— 口上文件里多为存根调用，人工定存根名
// 3. :339 CALL K5_FUKU —— 口上文件里多为存根调用，人工定存根名
// 4. :399 CALL K5_KOJO2 —— 口上文件里多为存根调用，人工定存根名
// 5. :400 CALL K5_FUKU —— 口上文件里多为存根调用，人工定存根名
// 6. :489 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 7. :493 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 8. :507 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 9. :511 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 10. :566 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 11. :570 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 12. :583 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 13. :587 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 14. :641 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 15. :643 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 16. :652 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 17. :664 同名函数 @EVENTEND 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTEND', …) 注册，参照 ere/kojo/kojo-k5.js
// 18. :788 CALL COLOSSEUM_KOJO_5 —— 口上文件里多为存根调用，人工定存根名
// 19. :918 局部变量 P = PALAM:3 + UP:3 —— 单字母局部变量，JS 侧声明与赋值人工定
// 20. :920 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 21. :927 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 22. :933 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 23. :939 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 24. :945 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 25. :951 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 26. :957 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 27. :992 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 28. :997 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 29. :1011 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 30. :1032 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 31. :1037 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 32. :1051 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 33. :1064 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 34. :1075 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 35. :1095 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
// 36. :1149 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
// 37. :2332 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 38. :2338 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 39. :2357 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 40. :2365 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 41. :2490 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 42. :2496 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 43. :2512 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 44. :2518 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 45. :2537 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 46. :2596 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 47. :2602 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 48. :2620 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 49. :2625 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 50. :2716 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 51. :2721 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 52. :2746 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 53. :2750 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 54. :2850 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 55. :2856 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 56. :2870 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 57. :2889 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 58. :2895 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 59. :2907 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 60. :2983 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 61. :2989 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 62. :3003 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 63. :3023 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 64. :3029 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 65. :3043 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 66. :3120 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 67. :3126 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 68. :3140 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 69. :3162 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 70. :3168 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 71. :3182 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 72. :3262 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 73. :3268 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 74. :3287 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 75. :3320 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 76. :3326 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 77. :3345 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 78. :3420 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 79. :3443 RAND RAND:100 → rand_n(100)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 80. :3507 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 81. :3511 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 82. :3523 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 83. :3527 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 84. :3596 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 85. :3625 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 86. :3823 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 87. :3829 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 88. :3835 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 89. :3858 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 90. :3864 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 91. :3870 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 92. :3892 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 93. :3896 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 94. :4025 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 95. :4030 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 96. :4044 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 97. :4064 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 98. :4069 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 99. :4082 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 100. :4720 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
// 101. :4729 表达式寻址 PALAMLV:3 → era.get('palamlv:3')——族名直译，语义与归属人工定
// 102. :4801 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 103. :4813 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 104. :4815 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 105. :4817 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 106. :4817 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 107. :4825 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 108. :4827 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 109. :4847 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 110. :4859 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 111. :4861 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 112. :4863 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 113. :4863 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 114. :4871 表达式寻址 PALAMLV:4 → era.get('palamlv:4')——族名直译，语义与归属人工定
// 115. :4873 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 116. :5191 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 117. :5204 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 118. :5204 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 119. :5236 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 120. :5236 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 121. :5685 局部变量 A = UP:11 + UP:12 —— 单字母局部变量，JS 侧声明与赋值人工定
// 122. :5725 局部变量 P = PALAM:3 + UP:3 —— 单字母局部变量，JS 侧声明与赋值人工定
// 123. :5726 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 124. :5760 局部变量 P = PALAM:5 + UP:5 —— 单字母局部变量，JS 侧声明与赋值人工定
// 125. :5761 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 126. :5797 局部变量 P = PALAM:8 + UP:8 —— 单字母局部变量，JS 侧声明与赋值人工定
// 127. :5798 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 128. :5816 局部变量 P = PALAM:10 + UP:10 —— 单字母局部变量，JS 侧声明与赋值人工定
// 129. :5817 表达式寻址 PALAMLV:2 → era.get('palamlv:2')——族名直译，语义与归属人工定
// 130. :5835 表达式寻址 NOWEX:0 → era.get('nowex:0')——族名直译，语义与归属人工定
// 131. :5855 表达式寻址 NOWEX:1 → era.get('nowex:1')——族名直译，语义与归属人工定
// 132. :5876 表达式寻址 NOWEX:1 → era.get('nowex:1')——族名直译，语义与归属人工定
// 133. :5899 表达式寻址 NOWEX:2 → era.get('nowex:2')——族名直译，语义与归属人工定
// 134. :5922 表达式寻址 NOWEX:3 → era.get('nowex:3')——族名直译，语义与归属人工定
// 135. :7147 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 136. :7149 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 137. :7169 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 138. :7171 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 139. :7199 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 140. :7201 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 141. :7208 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 142. :7210 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 143. :7277 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 144. :7310 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 145. :7334 表达式寻址 ITEM:PBAND → era.get('item:PBAND')——族名直译，语义与归属人工定
// 146. :7745 函数参数 @GOBI_KOUJO_K5, ARG:0 —— 参数声明已剥（JS 函数签名人工定）
// 147. :7748 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 148. :7751 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 149. :7754 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 150. :7757 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 151. :7760 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 152. :7766 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 153. :7768 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
