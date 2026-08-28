/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */
/**
 * @file DUNGEON_BITCH.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/迷宮/DUNGEON_BITCH.ERB
 *
 * == 已有门面名的下标（复核时可升级为门面读写，裁定一） ==
 *   cflag:1 = 状态（facade-names）
 *   cflag:120 = 卖春积极性（facade-names）
 *   cflag:151 = 善恶值（facade-names）
 *   cflag:16 = 初吻对象（facade-names）
 *   cflag:2 = 好感度（facade-names）
 *   cflag:501 = 侵攻阶层（facade-names）
 *   cflag:580 = 所持金（facade-names）
 *   flag:5 = 游戏设定（facade-names）
 *
 * == 复核标记（431 处） ==
 * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法
 * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，
 * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW
 * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），
 * 复核成果不会被重跑覆盖。
 *   1. :3 函数参数 @DUNGEON_BITCH(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   2. :5 未知语句 #LOCALSIZE 1
 *   3. :6 未知语句 #LOCALSSIZE 1
 *   4. :12 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "DUNGEON") —— 局部/自定义变量，人工映射
 *   5. :13 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") —— 局部/自定义变量，人工映射
 *   6. :27 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   7. :28 CALL LOG_TRY_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
 *   8. :29 CALL SELL_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
 *   9. :34 RAND RAND(1, 16) → 1 + rand_n(16 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   10. :36 CALL DUNGEON_ANIMAL(ARG) —— 口上文件里多为存根调用，人工定存根名
 *   11. :40 RAND RAND:36 → rand_n(36)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   12. :42 CALL SELF_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
 *   13. :47 CALL DUNGEON_WORK(ARG) —— 口上文件里多为存根调用，人工定存根名
 *   14. :53 函数参数 @HEROINE_BITCH(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   15. :55 未知语句 #LOCALSIZE 1
 *   16. :56 未知语句 #LOCALSSIZE 1
 *   17. :62 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "TOWN") —— 局部/自定义变量，人工映射
 *   18. :63 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") —— 局部/自定义变量，人工映射
 *   19. :69 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   20. :70 CALL LOG_TRY_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
 *   21. :71 CALL SELL_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
 *   22. :76 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   23. :77 CALL 强制肉偿(ARG) —— 口上文件里多为存根调用，人工定存根名
 *   24. :79 RAND RAND:36 → rand_n(36)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   25. :81 CALL SELF_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
 *   26. :97 函数参数 @SELL_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
 *   27. :98 未知语句 #LOCALSIZE 1
 *   28. :99 未知语句 #LOCALSSIZE 1
 *   29. :113 变量语义 KYAKU = FI_CULC_BITCH(ARG, "KYAKU", PLACE) —— 局部/自定义变量，人工映射
 *   30. :116 未知语句 VARSET PLAY
 *   31. :117 未知语句 VARSET MAN
 *   32. :118 未知语句 VARSET GIRL
 *   33. :119 未知语句 VARSET CHECK
 *   34. :123 未知语句 FOR LCOUNT, 0, 100
 *   35. :124 变量语义 PREV_EXP:LCOUNT = EXP:ARG:LCOUNT —— 局部/自定义变量，人工映射
 *   36. :125 未知语句 NEXT
 *   37. :126 未知语句 FOR LCOUNT, 0, 20
 *   38. :127 变量语义 PREV_JUEL:LCOUNT = JUEL:ARG:LCOUNT —— 局部/自定义变量，人工映射
 *   39. :128 未知语句 NEXT
 *   40. :129 变量语义 PREV_KARMA = CFLAG:ARG:151 —— 局部/自定义变量，人工映射
 *   41. :132 未知语句 SETBIT CHECK, 0
 *   42. :135 变量语义 PREV_MONEY = CFLAG:ARG:580 —— 局部/自定义变量，人工映射
 *   43. :137 变量语义 PREV_MONEY = MONEY —— 局部/自定义变量，人工映射
 *   44. :140 变量语义 PREV_MONEY = CFLAG:ARG:580 —— 局部/自定义变量，人工映射
 *   45. :144 未知语句 FOR LCOUNT, 0, KYAKU
 *   46. :146 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", PLACE) —— 局部/自定义变量，人工映射
 *   47. :147 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", PLACE) —— 局部/自定义变量，人工映射
 *   48. :148 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   49. :149 未知语句 CONTINUE
 *   50. :152 变量语义 LOCAL = FI_TRY_BITCH(ARG, PLACE) —— 局部/自定义变量，人工映射
 *   51. :157 未知语句 CONTINUE
 *   52. :159 变量语义 LOCALS = %FS_BITCH("PLAY", LOCAL)% —— 局部/自定义变量，人工映射
 *   53. :163 未知语句 CONTINUE
 *   54. :167 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", LOCALS) —— 局部/自定义变量，人工映射
 *   55. :168 变量语义 PLAY:LOCAL + = PLAY —— 局部/自定义变量，人工映射
 *   56. :169 未知语句 SETBIT CHECK, LOCAL
 *   57. :172 CALL PROFIT_BITCH(ARG, PLACE, LOCALS, PLAY) —— 口上文件里多为存根调用，人工定存根名
 *   58. :176 变量语义 MAN = RESULT:1 —— 局部/自定义变量，人工映射
 *   59. :177 未知语句 MAN:MAN ++
 *   60. :178 未知语句 SETBIT CHECK, (10 + MAN)
 *   61. :181 变量语义 GIRL = RESULT:1 —— 局部/自定义变量，人工映射
 *   62. :182 未知语句 GIRL:GIRL ++
 *   63. :183 未知语句 SETBIT CHECK, (20 + GIRL)
 *   64. :186 CALL EXP_BITCH(ARG, PLACE, LOCALS, PLAY) —— 口上文件里多为存根调用，人工定存根名
 *   65. :188 未知语句 NEXT
 *   66. :191 变量语义 PLAY = 0 —— 局部/自定义变量，人工映射
 *   67. :192 变量语义 PLAY = SUMARRAY(PLAY) —— 局部/自定义变量，人工映射
 *   68. :198 变量语义 MAN = 0 —— 局部/自定义变量，人工映射
 *   69. :199 变量语义 MAN = SUMARRAY(MAN) —— 局部/自定义变量，人工映射
 *   70. :200 变量语义 GIRL = 0 —— 局部/自定义变量，人工映射
 *   71. :201 变量语义 GIRL = SUMARRAY(GIRL) —— 局部/自定义变量，人工映射
 *   72. :205 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   73. :206 未知语句 VARSET LOCALS
 *   74. :208 变量语义 LOCALS = %FS_LOG_BITCH("DUNGEON_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% —— 局部/自定义变量，人工映射
 *   75. :212 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   76. :215 变量语义 LOCALS = %FS_LOG_BITCH("DUNGEON_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% —— 局部/自定义变量，人工映射
 *   77. :217 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   78. :219 变量语义 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% —— 局部/自定义变量，人工映射
 *   79. :220 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   80. :223 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   81. :224 未知语句 VARSET LOCALS
 *   82. :225 数组元素 PLAY:6 —— 局部数组元素（#DIM PLAY），JS 侧用 play[6] 访问，人工核
 *   83. :229 变量语义 LOCALS = %FS_LOG_BITCH("TOWN_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% —— 局部/自定义变量，人工映射
 *   84. :232 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   85. :235 变量语义 LOCALS = %FS_LOG_BITCH("TOWN_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% —— 局部/自定义变量，人工映射
 *   86. :237 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   87. :239 变量语义 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% —— 局部/自定义变量，人工映射
 *   88. :240 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
 *   89. :241 数组元素 PLAY:6 —— 局部数组元素（#DIM PLAY），JS 侧用 play[6] 访问，人工核
 *   90. :247 变量语义 LOCAL = -1 * PLAY —— 局部/自定义变量，人工映射
 *   91. :248 CALL KARMA, ARG, LOCAL —— 口上文件里多为存根调用，人工定存根名
 *   92. :250 CALL LOG_AFTER_BITCH(ARG, CHECK) —— 口上文件里多为存根调用，人工定存根名
 *   93. :253 未知语句 FOR LCOUNT, 0, 100
 *   94. :254 数组元素 PREV_EXP:LCOUNT —— 局部数组元素（#DIM PREV_EXP），JS 侧用 prev_exp[lcount] 访问，人工核
 *   95. :255 未知语句 CONTINUE
 *   96. :256 插值 未知插值 %EXPNAME:LCOUNT, 16, RIGHT% —— 保真锁会红，须人工定归一
 *   97. :257 未知语句 NEXT
 *   98. :258 未知语句 FOR LCOUNT, 0, 20
 *   99. :259 数组元素 PREV_JUEL:LCOUNT —— 局部数组元素（#DIM PREV_JUEL），JS 侧用 prev_juel[lcount] 访问，人工核
 *   100. :260 未知语句 CONTINUE
 *   101. :261 插值 未知插值 %PALAMNAME:LCOUNT, 12, RIGHT% —— 保真锁会红，须人工定归一
 *   102. :262 未知语句 NEXT
 *   103. :263 未知语句 WAIT
 *   104. :268 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   105. :271 变量语义 LOCAL = CFLAG:ARG:580 - PREV_MONEY —— 局部/自定义变量，人工映射
 *   106. :272 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   107. :275 变量语义 LOCAL = MONEY - PREV_MONEY —— 局部/自定义变量，人工映射
 *   108. :277 变量语义 LOCAL = LOCAL/10*9 —— 局部/自定义变量，人工映射
 *   109. :278 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   110. :280 变量语义 LOCAL = LOCAL/10*9 —— 局部/自定义变量，人工映射
 *   111. :281 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   112. :284 未知语句 LOCAL /= 2 + 1
 *   113. :285 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   114. :287 未知语句 LOCAL /= 2
 *   115. :288 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   116. :291 变量语义 MONEY -= LOCAL —— 局部/自定义变量，人工映射
 *   117. :296 变量语义 LOCAL = CFLAG:ARG:580 - PREV_MONEY —— 局部/自定义变量，人工映射
 *   118. :298 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   119. :301 变量语义 LOCAL = PREV_KARMA - CFLAG:ARG:151 —— 局部/自定义变量，人工映射
 *   120. :308 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   121. :315 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   122. :321 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   123. :334 函数参数 @EXP_BITCH(ARG, PLACE, TYPE, PLAY) —— 参数声明已剥（JS 函数签名人工定）
 *   124. :335 未知语句 #LOCALSIZE 1
 *   125. :336 未知语句 #LOCALSSIZE 1
 *   126. :420 函数参数 @PROFIT_BITCH(ARG, PLACE, TYPE, PLAY) —— 参数声明已剥（JS 函数签名人工定）
 *   127. :421 未知语句 #LOCALSIZE 1
 *   128. :422 未知语句 #LOCALSSIZE 1
 *   129. :433 变量语义 PAY = (FI_CULC_BITCH(ARG, "RATE", TYPE) + CFLAG:ARG:501) * FI_CULC_BITCH(ARG, "RATE", "KARMA") / 5 —— 局部/自定义变量，人工映射
 *   130. :436 变量语义 PAY = 5 * (1 + CFLAG:ARG:501 + FI_CULC_BITCH(ARG, "RATE", TYPE)) —— 局部/自定义变量，人工映射
 *   131. :439 变量语义 PAY = FI_CULC_BITCH(ARG, "RATE", "KARMA") * FI_CULC_BITCH(ARG, "RATE", TYPE) / 5 —— 局部/自定义变量，人工映射
 *   132. :447 变量语义 GIRL = RAND(1, 6) —— 局部/自定义变量，人工映射
 *   133. :450 变量语义 PAY -= 10 —— 局部/自定义变量，人工映射
 *   134. :452 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
 *   135. :455 变量语义 MAN = RAND(1, 6) —— 局部/自定义变量，人工映射
 *   136. :458 变量语义 PAY -= 10 —— 局部/自定义变量，人工映射
 *   137. :460 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
 *   138. :465 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
 *   139. :468 变量语义 PAY += 5 —— 局部/自定义变量，人工映射
 *   140. :470 变量语义 PAY = PAY * PLAY —— 局部/自定义变量，人工映射
 *   141. :478 变量语义 MONEY += PAY —— 局部/自定义变量，人工映射
 *   142. :497 函数参数 @DUNGEON_WORK(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   143. :498 未知语句 #LOCALSIZE 1
 *   144. :499 未知语句 #LOCALSSIZE 1
 *   145. :500 变量语义 LOCAL = (CFLAG:ARG:9 * 20) + 100 —— 局部/自定义变量，人工映射
 *   146. :502 未知语句 LOCAL /= 10
 *   147. :504 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   148. :506 未知语句 DATAFORM 研磨宝石的
 *   149. :507 未知语句 DATAFORM 制作工艺品的
 *   150. :508 未知语句 DATAFORM 抄写书籍的
 *   151. :509 未知语句 DATAFORM 制作手工的
 *   152. :510 未知语句 ENDDATA
 *   153. :513 变量语义 MONEY += LOCAL —— 局部/自定义变量，人工映射
 *   154. :519 函数参数 @DUNGEON_ANIMAL(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   155. :520 未知语句 #LOCALSIZE 1
 *   156. :521 未知语句 #LOCALSSIZE 1
 *   157. :523 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", "ANIMAL") —— 局部/自定义变量，人工映射
 *   158. :524 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   159. :526 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   160. :526 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   161. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   162. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   163. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   164. :530 CALL LOG_BITCH_ANIMAL(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
 *   165. :531 未知语句 WAIT
 *   166. :534 插值 未知插值 %EXPNAME:56% —— 保真锁会红，须人工定归一
 *   167. :535 插值 未知插值 %EXPNAME:0% —— 保真锁会红，须人工定归一
 *   168. :536 插值 未知插值 %EXPNAME:5% —— 保真锁会红，须人工定归一
 *   169. :542 插值 未知插值 %PALAMNAME:1% —— 保真锁会红，须人工定归一
 *   170. :543 插值 未知插值 %PALAMNAME:6% —— 保真锁会红，须人工定归一
 *   171. :544 插值 未知插值 %PALAMNAME:8% —— 保真锁会红，须人工定归一
 *   172. :549 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   173. :553 变量语义 LOCAL = -1 * PLAY —— 局部/自定义变量，人工映射
 *   174. :555 CALL KARMA, ARG, LOCAL —— 口上文件里多为存根调用，人工定存根名
 *   175. :560 函数参数 @SELF_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
 *   176. :561 未知语句 #LOCALSIZE 1
 *   177. :562 未知语句 #LOCALSSIZE 1
 *   178. :565 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   179. :566 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", "SELF") —— 局部/自定义变量，人工映射
 *   180. :570 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   181. :572 变量语义 LOCAL = 1 —— 局部/自定义变量，人工映射
 *   182. :574 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   183. :574 表达式寻址 ITEM:22 → era.get('item:22')——族名直译，语义与归属人工定
 *   184. :576 变量语义 LOCAL = 2 —— 局部/自定义变量，人工映射
 *   185. :579 RAND RAND(1, 40) → 1 + rand_n(40 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   186. :581 未知语句 DATAFORM 想起%CALLNAME:MASTER%的事
 *   187. :582 未知语句 DATAFORM 一次次呼唤着%CALLNAME:MASTER%的名字
 *   188. :583 未知语句 DATAFORM 想起了上次的调教
 *   189. :584 未知语句 DATAFORM 想象着下一次的调教
 *   190. :585 未知语句 ENDDATA
 *   191. :586 变量语义 LOCAL = 3 —— 局部/自定义变量，人工映射
 *   192. :589 RAND RAND(1, 5) → 1 + rand_n(5 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   193. :591 未知语句 DATAFORM 如饥似渴，一副十分想要的样子
 *   194. :592 未知语句 DATAFORM 无法满足的欲望，心情变得十分急躁
 *   195. :593 未知语句 DATAFORM 不自觉地张开着嘴巴
 *   196. :594 未知语句 DATAFORM 根本不在意口水滴落下来的样子
 *   197. :595 未知语句 DATAFORM 根本不在意口水流下来的样子
 *   198. :596 未知语句 DATAFORM 一脸恍惚的样子
 *   199. :597 未知语句 DATAFORM 一脸沉浸在欲望中的快乐表情
 *   200. :598 未知语句 DATAFORM 红晕慢慢爬上了脸颊
 *   201. :599 未知语句 DATAFORM 欲望高涨，身体如同火烧一般
 *   202. :600 未知语句 DATAFORM 呆滞的眼神
 *   203. :601 未知语句 DATAFORM 充满情欲的眼睛，变得水汪汪的
 *   204. :602 未知语句 DATAFORM 突然将双腿张开
 *   205. :603 未知语句 DATAFORM 身体一颤一颤的
 *   206. :604 未知语句 DATAFORM 将股间张得大大的
 *   207. :605 未知语句 DATAFORM 不知不觉的扭动着腰肢
 *   208. :606 未知语句 DATAFORM 欲求不满的摇动着腰肢
 *   209. :607 未知语句 DATAFORM 腰部下流的扭动着
 *   210. :608 未知语句 DATAFORM 仰起喉咙
 *   211. :609 未知语句 DATAFORM 时不时从嘴边发出呻吟
 *   212. :610 未知语句 DATAFORM 爱液浸湿了床具
 *   213. :611 未知语句 DATAFORM 涂满了溢出来的爱液
 *   214. :612 未知语句 DATAFORM 十分粗野的撕扯着衣服，双乳若隐若现
 *   215. :613 未知语句 DATAFORM 挣扎在绝顶的边缘
 *   216. :614 未知语句 ENDDATA
 *   217. :615 变量语义 LOCAL = 4 —— 局部/自定义变量，人工映射
 *   218. :619 未知语句 DATAFORM 努力地忍住声音
 *   219. :620 未知语句 DATAFORM 拼命地将气息憋住
 *   220. :621 未知语句 DATAFORM 注意着周围的动静
 *   221. :622 未知语句 DATAFORM 想着要停下来也...
 *   222. :623 未知语句 DATAFORM 用踌躇的动作
 *   223. :624 未知语句 DATAFORM 迷惑地将手指重合了起来
 *   224. :625 未知语句 DATAFORM 牢牢地将嘴唇重合起来
 *   225. :626 未知语句 DATAFORM 懒洋洋地低下了头
 *   226. :627 未知语句 DATAFORM 烦恼地皱了皱眉头
 *   227. :628 未知语句 ENDDATA
 *   228. :629 变量语义 LOCAL = 5 —— 局部/自定义变量，人工映射
 *   229. :640 CALL LOG_BITCH_SELF(ARG, PLACE, LOCAL) —— 口上文件里多为存根调用，人工定存根名
 *   230. :641 未知语句 WAIT
 *   231. :644 插值 未知插值 %EXPNAME:10% —— 保真锁会红，须人工定归一
 *   232. :651 插值 未知插值 %PALAMNAME:0% —— 保真锁会红，须人工定归一
 *   233. :653 插值 未知插值 %PALAMNAME:4% —— 保真锁会红，须人工定归一
 *   234. :654 插值 未知插值 %PALAMNAME:5% —— 保真锁会红，须人工定归一
 *   235. :662 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   236. :665 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   237. :673 函数参数 @FI_TRY_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
 *   238. :678 未知语句 VARSET PLAY
 *   239. :681 未知语句 FOR LCOUNT, 1, 7
 *   240. :682 变量语义 LOCALS = %FS_BITCH("PLAY", LCOUNT)% —— 局部/自定义变量，人工映射
 *   241. :683 变量语义 PLAY:LCOUNT = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) —— 局部/自定义变量，人工映射
 *   242. :685 变量语义 PLAY:LCOUNT + = FI_CULC_BITCH(ARG, "RATE", "KARMA") / FI_CULC_BITCH(ARG, "RATE", LOCALS) —— 局部/自定义变量，人工映射
 *   243. :688 变量语义 PLAY:LCOUNT = 0 —— 局部/自定义变量，人工映射
 *   244. :689 未知语句 NEXT
 *   245. :691 变量语义 PLAY:0 = SUMARRAY(PLAY) + FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") —— 局部/自定义变量，人工映射
 *   246. :694 未知语句 FOR LCOUNT, 1, 6
 *   247. :695 变量语义 LOCALS = %FS_BITCH("PLAY", LCOUNT)% —— 局部/自定义变量，人工映射
 *   248. :696 变量语义 PLAY:LCOUNT = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) —— 局部/自定义变量，人工映射
 *   249. :699 变量语义 PLAY:LCOUNT = 0 —— 局部/自定义变量，人工映射
 *   250. :700 未知语句 NEXT
 *   251. :701 变量语义 PLAY:0 = SUMARRAY(PLAY) —— 局部/自定义变量，人工映射
 *   252. :705 变量语义 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") / MAX(1, ABL:ARG:10) —— 局部/自定义变量，人工映射
 *   253. :707 变量语义 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") —— 局部/自定义变量，人工映射
 *   254. :712 变量语义 PLAY = 1 —— 局部/自定义变量，人工映射
 *   255. :714 变量语义 LOCAL = RAND:PLAY —— 局部/自定义变量，人工映射
 *   256. :715 未知语句 FOR LCOUNT, 1, 7
 *   257. :716 数组元素 PLAY:LCOUNT —— 局部数组元素（#DIM PLAY），JS 侧用 play[lcount] 访问，人工核
 *   258. :717 未知语句 RETURNF LCOUNT
 *   259. :718 变量语义 LOCAL -= PLAY:LCOUNT —— 局部/自定义变量，人工映射
 *   260. :719 未知语句 NEXT
 *   261. :720 未知语句 RETURNF 0
 *   262. :727 函数参数 @FI_CULC_BITCH(ARG, ARGS, ARGS:1) —— 参数声明已剥（JS 函数签名人工定）
 *   263. :729 未知语句 #LOCALSIZE 1
 *   264. :730 未知语句 #LOCALSSIZE 1
 *   265. :740 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   266. :741 变量语义 LOCAL = 250 + CFLAG:ARG:151 —— 局部/自定义变量，人工映射
 *   267. :742 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   268. :743 变量语义 LOCAL = 250 + CFLAG:ARG:151 —— 局部/自定义变量，人工映射
 *   269. :745 未知语句 THROW 未知的文字%ARGS:1%
 *   270. :748 未知语句 LOCAL /= (1 + ABL:ARG:37)
 *   271. :751 未知语句 TIMES LOCAL, 0.7
 *   272. :754 未知语句 TIMES LOCAL, 0.5
 *   273. :756 未知语句 TIMES LOCAL, 0.7
 *   274. :761 变量语义 LOCAL += 999 —— 局部/自定义变量，人工映射
 *   275. :764 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
 *   276. :765 未知语句 RETURNF LOCAL
 *   277. :768 变量语义 LOCAL = ABL:ARG:37 * 5 —— 局部/自定义变量，人工映射
 *   278. :770 未知语句 LOCAL ++
 *   279. :772 未知语句 LOCAL ++
 *   280. :775 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
 *   281. :777 变量语义 LOCAL += (TALENT:ARG:76 + TALENT:ARG:180 + TALENT:ARG:181) * 30 —— 局部/自定义变量，人工映射
 *   282. :778 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   283. :782 变量语义 LOCAL += 2000 —— 局部/自定义变量，人工映射
 *   284. :784 变量语义 LOCAL += 1000 —— 局部/自定义变量，人工映射
 *   285. :786 变量语义 LOCAL += 500 —— 局部/自定义变量，人工映射
 *   286. :788 变量语义 LOCAL += 250 —— 局部/自定义变量，人工映射
 *   287. :790 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
 *   288. :792 变量语义 LOCAL += 50 —— 局部/自定义变量，人工映射
 *   289. :794 变量语义 LOCAL += 20 —— 局部/自定义变量，人工映射
 *   290. :796 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
 *   291. :798 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   292. :803 变量语义 LOCAL += 2000 —— 局部/自定义变量，人工映射
 *   293. :805 变量语义 LOCAL += 1000 —— 局部/自定义变量，人工映射
 *   294. :807 变量语义 LOCAL += 500 —— 局部/自定义变量，人工映射
 *   295. :809 变量语义 LOCAL += 250 —— 局部/自定义变量，人工映射
 *   296. :811 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
 *   297. :813 变量语义 LOCAL += 50 —— 局部/自定义变量，人工映射
 *   298. :815 变量语义 LOCAL += 20 —— 局部/自定义变量，人工映射
 *   299. :817 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
 *   300. :821 变量语义 LOCAL += 1500 / (25 - ABL:ARG:11 - ABL:ARG:37) —— 局部/自定义变量，人工映射
 *   301. :823 表达式下标 CFLAG:(ARG:0):533 —— 括号表达式下标（CFLAG），人工核角色维/一维归属
 *   302. :823 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
 *   303. :824 未知语句 TIMES LOCAL, 0.75
 *   304. :827 未知语句 LOCAL *= 10 + ABL:ARG:10 * 2
 *   305. :828 未知语句 LOCAL /= 10
 *   306. :831 未知语句 TIMES LOCAL, 0.75
 *   307. :835 未知语句 THROW 未知的文字%ARGS:1%
 *   308. :840 变量语义 LOCAL += (CFLAG:ARG:120 * 100) - 5 —— 局部/自定义变量，人工映射
 *   309. :842 变量语义 LOCAL = 1 —— 局部/自定义变量，人工映射
 *   310. :846 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
 *   311. :847 未知语句 RETURNF LOCAL
 *   312. :850 变量语义 LOCAL = RAND:6 —— 局部/自定义变量，人工映射
 *   313. :854 变量语义 LOCAL -= 3 —— 局部/自定义变量，人工映射
 *   314. :856 变量语义 LOCAL -= 2 —— 局部/自定义变量，人工映射
 *   315. :858 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
 *   316. :861 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
 *   317. :863 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
 *   318. :865 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
 *   319. :867 变量语义 LOCAL += 4 —— 局部/自定义变量，人工映射
 *   320. :874 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
 *   321. :877 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
 *   322. :880 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
 *   323. :883 变量语义 LOCAL += (ABL:ARG:15 + ABL:ARG:17 + ABL:ARG:37) / 6 —— 局部/自定义变量，人工映射
 *   324. :884 变量语义 LOCAL += TALENT:ARG:23 + TALENT:ARG:28 + TALENT:ARG:31 + TALENT:ARG:33 —— 局部/自定义变量，人工映射
 *   325. :885 变量语义 LOCAL -= TALENT:ARG:21 + TALENT:ARG:22 + TALENT:ARG:24 + TALENT:ARG:27 + TALENT:ARG:30 —— 局部/自定义变量，人工映射
 *   326. :886 变量语义 LOCAL += TALENT:ARG:91 + TALENT:ARG:92 + TALENT:ARG:113 —— 局部/自定义变量，人工映射
 *   327. :887 变量语义 LOCAL += TALENT:ARG:83 + TALENT:ARG:87 + TALENT:ARG:88 —— 局部/自定义变量，人工映射
 *   328. :889 未知语句 LOCAL ++
 *   329. :891 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
 *   330. :894 未知语句 LOCAL ++
 *   331. :896 未知语句 LOCAL ++
 *   332. :898 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
 *   333. :901 未知语句 LOCAL ++
 *   334. :902 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   335. :904 变量语义 LOCAL -= TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 —— 局部/自定义变量，人工映射
 *   336. :908 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
 *   337. :910 变量语义 LOCAL += 4 —— 局部/自定义变量，人工映射
 *   338. :912 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
 *   339. :914 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
 *   340. :916 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
 *   341. :918 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
 *   342. :920 变量语义 LOCAL -= 2 —— 局部/自定义变量，人工映射
 *   343. :922 变量语义 LOCAL -= 3 —— 局部/自定义变量，人工映射
 *   344. :924 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   345. :925 变量语义 LOCAL += TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 —— 局部/自定义变量，人工映射
 *   346. :928 未知语句 LOCAL *= 10 + ABL:ARG:10
 *   347. :929 未知语句 LOCAL /= 10
 *   348. :932 未知语句 TIMES LOCAL, 0.5
 *   349. :935 未知语句 THROW 未知的文字%ARGS:1%
 *   350. :940 未知语句 TIMES LOCAL, 1.5
 *   351. :943 变量语义 LOCAL = MAX(LOCAL, 0) —— 局部/自定义变量，人工映射
 *   352. :944 未知语句 RETURNF LOCAL
 *   353. :950 未知语句 RETURNF 0
 *   354. :953 未知语句 RETURNF 0
 *   355. :955 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   356. :964 未知语句 RETURNF 0
 *   357. :969 未知语句 RETURNF 0
 *   358. :972 未知语句 RETURNF 0
 *   359. :979 未知语句 RETURNF 0
 *   360. :982 未知语句 RETURNF 0
 *   361. :985 未知语句 RETURNF 0
 *   362. :992 表达式寻址 ITEM:22 → era.get('item:22')——族名直译，语义与归属人工定
 *   363. :993 未知语句 RETURNF 0
 *   364. :996 未知语句 RETURNF 0
 *   365. :999 未知语句 RETURNF 0
 *   366. :1002 未知语句 RETURNF 0
 *   367. :1004 未知语句 RETURNF 1
 *   368. :1008 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   369. :1009 变量语义 LOCAL = ABL:ARG:31 + RAND:(ABL:ARG:11 + 1) —— 局部/自定义变量，人工映射
 *   370. :1010 未知语句 LOCAL /= 3
 *   371. :1011 变量语义 LOCAL += TALENT:ARG:60 + TALENT:ARG:74 + TALENT:ARG:272 —— 局部/自定义变量，人工映射
 *   372. :1014 未知语句 TIMES LOCAL, 1.5
 *   373. :1017 未知语句 TIMES LOCAL, 1.2
 *   374. :1019 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
 *   375. :1020 未知语句 RETURNF LOCAL
 *   376. :1022 变量语义 LOCAL = 1 + RAND:3 —— 局部/自定义变量，人工映射
 *   377. :1023 变量语义 LOCAL += TALENT:ARG:63 + TALENT:ARG:64 —— 局部/自定义变量，人工映射
 *   378. :1024 变量语义 LOCAL += (TALENT:ARG:76 + TALENT:ARG:272) * 2 —— 局部/自定义变量，人工映射
 *   379. :1025 变量语义 LOCAL += (ABL:ARG:16 + ABL:ARG:37) / 3 —— 局部/自定义变量，人工映射
 *   380. :1027 表达式下标 FLAG:(CFLAG:ARG:501 + 349) —— 括号表达式下标（FLAG），人工核角色维/一维归属
 *   381. :1028 未知语句 TIMES LOCAL, 1.2
 *   382. :1029 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   383. :1032 变量语义 LOCAL += ABL:ARG:32 / 3 —— 局部/自定义变量，人工映射
 *   384. :1035 变量语义 LOCAL += ABL:ARG:32 / 2 —— 局部/自定义变量，人工映射
 *   385. :1037 未知语句 LOCAL ++
 *   386. :1039 未知语句 LOCAL ++
 *   387. :1042 未知语句 TIMES LOCAL, 1.5
 *   388. :1045 变量语义 LOCAL += (ABL:ARG:0 + ABL:ARG:22) / 3 —— 局部/自定义变量，人工映射
 *   389. :1046 变量语义 LOCAL += TALENT:ARG:81 + TALENT:ARG:82 —— 局部/自定义变量，人工映射
 *   390. :1047 未知语句 LOCAL *= (10 + ABL:ARG:33)
 *   391. :1048 未知语句 LOCAL /= 10
 *   392. :1051 变量语义 LOCAL += (ABL:ARG:3 + ABL:ARG:30) / 3 —— 局部/自定义变量，人工映射
 *   393. :1054 未知语句 TIMES LOCAL, 1.5
 *   394. :1057 变量语义 LOCAL += (ABL:ARG:2 + ABL:ARG:30) / 3 —— 局部/自定义变量，人工映射
 *   395. :1060 未知语句 TIMES LOCAL, 1.5
 *   396. :1063 变量语义 LOCAL += (ABL:ARG:30 + ABL:ARG:39) / 3 —— 局部/自定义变量，人工映射
 *   397. :1065 变量语义 LOCAL += TALENT:ARG:124 + (TALENT:ARG:317 == 12) —— 局部/自定义变量，人工映射
 *   398. :1068 未知语句 TIMES LOCAL, 1.5
 *   399. :1072 变量语义 LOCAL -= 5 —— 局部/自定义变量，人工映射
 *   400. :1075 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
 *   401. :1076 未知语句 RETURNF LOCAL
 *   402. :1079 变量语义 LOCAL = 1 + RAND:3 —— 局部/自定义变量，人工映射
 *   403. :1080 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   404. :1083 变量语义 LOCAL += ABL:ARG:32 + 4 —— 局部/自定义变量，人工映射
 *   405. :1086 未知语句 TIMES LOCAL, 1.5
 *   406. :1089 变量语义 LOCAL += ABL:ARG:32 + 3 —— 局部/自定义变量，人工映射
 *   407. :1091 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
 *   408. :1094 未知语句 TIMES LOCAL, 2.0
 *   409. :1097 变量语义 LOCAL += ABL:ARG:0 + ABL:ARG:22 —— 局部/自定义变量，人工映射
 *   410. :1098 未知语句 LOCAL *= (10 + ABL:ARG:33)
 *   411. :1099 未知语句 LOCAL /= 10
 *   412. :1102 变量语义 LOCAL += ABL:ARG:3 + ABL:ARG:30 —— 局部/自定义变量，人工映射
 *   413. :1105 未知语句 TIMES LOCAL, 2.0
 *   414. :1108 变量语义 LOCAL += ABL:ARG:2 + ABL:ARG:30 —— 局部/自定义变量，人工映射
 *   415. :1111 未知语句 TIMES LOCAL, 2.0
 *   416. :1114 变量语义 LOCAL += ABL:ARG:30 + ABL:ARG:39 —— 局部/自定义变量，人工映射
 *   417. :1117 未知语句 TIMES LOCAL, 2.0
 *   418. :1120 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
 *   419. :1121 未知语句 LOCAL *= 5
 *   420. :1122 未知语句 RETURNF LOCAL
 *   421. :1126 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
 *   422. :1130 未知语句 RETURNF (250 + CFLAG:ARG:151)
 *   423. :1133 未知语句 RETURNF 1
 *   424. :1136 未知语句 RETURNF 2
 *   425. :1139 未知语句 RETURNF 3
 *   426. :1142 未知语句 RETURNF 4
 *   427. :1145 未知语句 RETURNF 11
 *   428. :1150 函数参数 @SHOW_BUTTON_BICH_LEVEL(NUM, ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   429. :1172 函数参数 @SET_BICH_LEVEL(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   430. :1177 未知语句 INPUT
 *   431. :1199 SKIP块 [SKIPSTART]（:1199）～[SKIPEND]（:3132）——预处理跳过块，整段转注释
 */

'use strict';

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。


// @DUNGEON_BITCH(ARG) // :3
async function DUNGEON_BITCH() {

  // RAW: #LOCALSIZE 1 // :5
  // RAW: #LOCALSSIZE 1 // :6
  // #DIM SEIKOU（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :7
  // #DIM SIPPAI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :8
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) { // :10
    return 0; // :10
  } // :10

  // 赋值 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "DUNGEON") // :12
  // 赋值 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") // :13




  if (era.get(`cflag:${arg}:1`) == 2) { // :18
    if (!era.get(`exp:${arg}:74`)) { // :20
      return 0; // :20
    } // :20
    if (SEIKOU <= 100) { // :22
      return 0; // :22
    } // :22
  } // :23


  if (era.get(`cflag:${arg}:120`)) { // :26
    if (rand_n(SEIKOU + SIPPAI) < SEIKOU) { // :27
      // CALL LOG_TRY_BITCH(ARG, "DUNGEON") // :28
      // CALL SELL_BITCH(ARG, "DUNGEON") // :29
    } // :30
  } // :31


  if ((1 + rand_n(16 - 1)) < era.get(`abl:${arg}:39`)) { // :34
    if (FI_CULC_BITCH(ARG, "ABLE", "ANIMAL")) { // :36
      // CALL DUNGEON_ANIMAL(ARG) // :36
    } // :36
  } // :37


  if (rand_n(36) <= era.get(`abl:${arg}:11`) + era.get(`abl:${arg}:31`) + (era.get(`talent:${arg}:60`) * 10)) { // :40
    if (FI_CULC_BITCH(ARG, "ABLE", "SELF")) { // :42
      // CALL SELF_BITCH(ARG, "DUNGEON") // :42
    } // :42
  } // :43


  if (era.get(`cflag:${arg}:500`) == 0 && era.get(`cflag:${arg}:1`) == 3) { // :47
    // CALL DUNGEON_WORK(ARG) // :47
  } // :47





}

// @HEROINE_BITCH(ARG) // :53
async function HEROINE_BITCH() {

  // RAW: #LOCALSIZE 1 // :55
  // RAW: #LOCALSSIZE 1 // :56
  // #DIM SEIKOU（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :57
  // #DIM SIPPAI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :58
  if (era.get(`base:${arg}:0`) < 300 || era.get(`base:${arg}:1`) < 100) { // :60
    return 0; // :60
  } // :60

  // 赋值 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "TOWN") // :62
  // 赋值 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") // :63




  if (era.get(`cflag:${arg}:120`)) { // :68
    if (SEIKOU > 100 && rand_n(SEIKOU + SIPPAI) < SEIKOU) { // :69
      // CALL LOG_TRY_BITCH(ARG, "TOWN") // :70
      // CALL SELL_BITCH(ARG, "TOWN") // :71
    } // :72
  } // :73


  if (era.get(`cflag:${arg}:582`) < -10000 && !era.get(`talent:${arg}:0`) && !rand_n(3)) { // :77
    // CALL 强制肉偿(ARG) // :77
  } // :77

  if (rand_n(36) <= era.get(`abl:${arg}:11`) + era.get(`abl:${arg}:31`) + (era.get(`talent:${arg}:60`) * 10)) { // :79
    if (FI_CULC_BITCH(ARG, "ABLE", "SELF")) { // :81
      // CALL SELF_BITCH(ARG, "TOWN") // :81
    } // :81
  } // :82














}

// @SELL_BITCH(ARG, PLACE) // :97
async function SELL_BITCH() {
  // RAW: #LOCALSIZE 1 // :98
  // RAW: #LOCALSSIZE 1 // :99
  // #DIMS PLACE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :100
  // #DIM LCOUNT（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :101
  // #DIM KYAKU（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :102
  // #DIM SEIKOU（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :103
  // #DIM SIPPAI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :104
  // #DIM PLAY, 7（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :105
  // #DIM MAN, 6（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :106
  // #DIM GIRL, 6（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :107
  // #DIM PREV_EXP, 100（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :108
  // #DIM PREV_JUEL, 20（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :109
  // #DIM PREV_KARMA（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :110
  // #DIM PREV_MONEY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :111
  // #DIM CHECK（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :112
  // 赋值 KYAKU = FI_CULC_BITCH(ARG, "KYAKU", PLACE) // :113

  if (KYAKU) { // :115
    // RAW: VARSET PLAY // :116
    // RAW: VARSET MAN // :117
    // RAW: VARSET GIRL // :118
    // RAW: VARSET CHECK // :119



    // RAW: FOR LCOUNT, 0, 100 // :123
    // 赋值 PREV_EXP:LCOUNT  = EXP:ARG:LCOUNT // :124
    // RAW: NEXT // :125
    // RAW: FOR LCOUNT, 0, 20 // :126
    // 赋值 PREV_JUEL:LCOUNT  = JUEL:ARG:LCOUNT // :127
    // RAW: NEXT // :128
    // 赋值 PREV_KARMA = CFLAG:ARG:151 // :129

    if (PLACE == "DUNGEON") { // :131
      // RAW: SETBIT CHECK, 0 // :132

      if (era.get(`cflag:${arg}:1`) == 2) { // :134
        // 赋值 PREV_MONEY = CFLAG:ARG:580 // :135
      } else { // :136
        // 赋值 PREV_MONEY = MONEY // :137
      } // :138
    } else { // :139
      // 赋值 PREV_MONEY = CFLAG:ARG:580 // :140
    } // :141


    // RAW: FOR LCOUNT, 0, KYAKU // :144

    // 赋值 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", PLACE) // :146
    // 赋值 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", PLACE) // :147
    if (rand_n(SEIKOU + SIPPAI) >= SEIKOU) { // :149
      // RAW: CONTINUE // :149
    } // :149


    // 赋值 LOCAL = FI_TRY_BITCH(ARG, PLACE) // :152



    if (!LOCAL) { // :157
      // RAW: CONTINUE // :157
    } // :157

    // 赋值 LOCALS = %FS_BITCH("PLAY", LOCAL)% // :159


    if (!FI_CULC_BITCH(ARG, "ABLE", LOCALS)) { // :163
      // RAW: CONTINUE // :163
    } // :163



    // 赋值 PLAY = FI_CULC_BITCH(ARG, "PLAY", LOCALS) // :167
    // 赋值 PLAY:LOCAL + = PLAY // :168
    // RAW: SETBIT CHECK, LOCAL // :169


    // CALL PROFIT_BITCH(ARG, PLACE, LOCALS, PLAY) // :172
    switch (RESULT) { // :173

    case 1: { // :175
      // 赋值 MAN = RESULT:1 // :176
      // RAW: MAN:MAN ++ // :177
      // RAW: SETBIT CHECK, (10 + MAN) // :178

      break; // :180
      } // :180
      case 2: { // :180
        // 赋值 GIRL = RESULT:1 // :181
        // RAW: GIRL:GIRL ++ // :182
        // RAW: SETBIT CHECK, (20 + GIRL) // :183
        break; // :184
        } // :184
    } // :184

    // CALL EXP_BITCH(ARG, PLACE, LOCALS, PLAY) // :186

    // RAW: NEXT // :188


    // 赋值 PLAY = 0 // :191
    // 赋值 PLAY = SUMARRAY(PLAY) // :192



    if (PLAY > 0) { // :196

      // 赋值 MAN = 0 // :198
      // 赋值 MAN = SUMARRAY(MAN) // :199
      // 赋值 GIRL = 0 // :200
      // 赋值 GIRL = SUMARRAY(GIRL) // :201


      if (PLACE == "DUNGEON") { // :204
        await era.print(`%SAVESTR:ARG%`); // :205
        // RAW: VARSET LOCALS // :206
        if (MAN) { // :208
          // 赋值 LOCALS = %FS_LOG_BITCH("DUNGEON_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% // :208
        } // :208

        if (GIRL) { // :210
          if (MAN) { // :211
            await era.print(`%LOCALS%、`); // :212
            await era.print(`于是`); // :213
          } // :214
          // 赋值 LOCALS = %FS_LOG_BITCH("DUNGEON_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% // :215
        } // :216
        await era.print(`以%LOCALS%为对手`); // :217

        // 赋值 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% // :219
        await era.printAndWait(`%LOCALS%进行着`); // :220

      } else { // :222
        await era.print(`%SAVESTR:ARG%`); // :223
        // RAW: VARSET LOCALS // :224
        if (PLAY == play[6]) { // :225
          await era.printAndWait(`进行了{PLAY:6}次兽交秀。`); // :226
        } else { // :227
          if (MAN) { // :229
            // 赋值 LOCALS = %FS_LOG_BITCH("TOWN_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% // :229
          } // :229
          if (GIRL) { // :230
            if (MAN) { // :231
              await era.print(`%LOCALS%、`); // :232
              await era.print(`于是`); // :233
            } // :234
            // 赋值 LOCALS = %FS_LOG_BITCH("TOWN_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% // :235
          } // :236
          await era.print(`以%LOCALS%为对手`); // :237

          // 赋值 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% // :239
          await era.printAndWait(`%LOCALS%进行着`); // :240
          if (play[6]) { // :241
            await era.printAndWait(`并且进行了{PLAY:6}次兽奸表演`); // :242
          } // :243
        } // :244
      } // :245

      // 赋值 LOCAL = -1 * PLAY // :247
      // CALL KARMA, ARG, LOCAL // :248

      // CALL LOG_AFTER_BITCH(ARG, CHECK) // :250

      await era.print(`～经验与点数变化～`); // :252
      // RAW: FOR LCOUNT, 0, 100 // :253
      if (prev_exp[lcount] == era.get(`exp:${arg}:LCOUNT`)) { // :255
        // RAW: CONTINUE // :255
      } // :255
      await era.print(`%EXPNAME:LCOUNT, 16, RIGHT%：{PREV_EXP:LCOUNT, 30, RIGHT}→{EXP:ARG:LCOUNT, 30, RIGHT}`); // :256
      // RAW: NEXT // :257
      // RAW: FOR LCOUNT, 0, 20 // :258
      if (prev_juel[lcount] == era.get(`juel:${arg}:LCOUNT`)) { // :260
        // RAW: CONTINUE // :260
      } // :260
      await era.print(`%PALAMNAME:LCOUNT, 12, RIGHT%点数：{PREV_JUEL:LCOUNT, 30, RIGHT}→{JUEL:ARG:LCOUNT, 30, RIGHT}`); // :261
      // RAW: NEXT // :262
      // RAW: WAIT // :263

      if (PLACE == "DUNGEON") { // :265
        // EXP:0:80 + = PLAY（变量语义：EXP 族，0:80 +） // :266
        era.set(`exp:${target}:0:80 +`, PLAY); // :266
        // EXP:ARG:80 + = PLAY（变量语义：EXP 族，ARG:80 +） // :267
        era.set(`exp:${arg}:80 +`, PLAY); // :267
        await era.printAndWait(`%SAVESTR:ARG%淫荡行为成为了魔王和奴隶们的力量（经验值＋{PLAY}）`); // :268

        if (era.get(`cflag:${arg}:1`) == 2) { // :270
          // 赋值 LOCAL = CFLAG:ARG:580 - PREV_MONEY // :271
          await era.printAndWait(`%SAVESTR:ARG%获得了{LOCAL}数量的金币`); // :272
        } else { // :273

          // 赋值 LOCAL = MONEY - PREV_MONEY // :275
          if (era.get(`cflag:${arg}:2`) >= 5000) { // :276
            // 赋值 LOCAL = LOCAL/10*9 // :277
            await era.printAndWait(`基于对魔王的爱意，%SAVESTR:ARG%将卖得收入的九成都上交了。献上了{LOCAL}点资金。`); // :278
          } else if (era.get(`cflag:${arg}:2`) >= 3000) { // :279
            // 赋值 LOCAL = LOCAL/10*9 // :280
            await era.printAndWait(`基于对魔王的感情，%SAVESTR:ARG%将卖得收入的七成都上交了。献上了{LOCAL}点资金。`); // :281
          } else { // :282
            if (LOCAL % 2) { // :283
              // RAW: LOCAL /= 2 + 1 // :284
              await era.printAndWait(`%SAVESTR:ARG%将卖得收入的一半上交了。献上了{LOCAL}点资金。`); // :285
            } else { // :286
              // RAW: LOCAL /= 2 // :287
              await era.printAndWait(`%SAVESTR:ARG%将卖得收入的一半上交了。献上了{LOCAL}点资金。`); // :288
            } // :289
          } // :290
          // 赋值 MONEY -= LOCAL // :291
          // EX_FLAG:4444 - = LOCAL（变量语义：EX_FLAG 族，4444 -） // :292
          era.set(`ex_flag:${target}:4444 -`, LOCAL); // :292
          // CFLAG:ARG:580 + = LOCAL（变量语义：CFLAG 族，ARG:580 +） // :293
          era.set(`cflag:${arg}:580 +`, LOCAL); // :293
        } // :294
      } else { // :295
        // 赋值 LOCAL = CFLAG:ARG:580 - PREV_MONEY // :296
        // EXP:ARG:80 + = LOCAL（变量语义：EXP 族，ARG:80 +） // :297
        era.set(`exp:${arg}:80 +`, LOCAL); // :297
        await era.printAndWait(`获得了%SAVESTR:ARG%{LOCAL}点的金钱以及经验值。`); // :298
      } // :299

      // 赋值 LOCAL = PREV_KARMA - CFLAG:ARG:151 // :301
      if (LOCAL) { // :303
        await era.printAndWait(`然后，善恶值减少了{ABS(LOCAL)}。`); // :303
      } // :303


    } else { // :306
      if (!era.get(`exp:${arg}:74`) && era.get(`cflag:${arg}:151`) > 100) { // :307
        await era.printAndWait(`%SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里赶走了。`); // :308
      } else if (era.get(`cflag:${arg}:151`) > 50) { // :309
        await era.printAndWait(`在下不定决心而烦恼的时候，时间不断地流失掉了...`); // :310
      } else if (era.get(`cflag:${arg}:151`) > 0) { // :311
        await era.printAndWait(`然而，根本没有勇气发出声音，说自己在卖春的这种事情。`); // :312
      } else { // :313
        await era.print(`{KYAKU}人群的声音嘈杂着、`); // :314
        await era.printAndWait(`交涉终了，一个人也没有买下%SAVESTR:ARG%，就这样子离开了`); // :315
      } // :316
    } // :317

  } else { // :319
    if (!era.get(`exp:${arg}:74`) && era.get(`cflag:${arg}:151`) > 100) { // :320
      await era.printAndWait(`%SAVESTR:ARG%醒来后，将不知羞耻的想法从脑袋里赶走了。`); // :321
    } else if (era.get(`cflag:${arg}:151`) > 50) { // :322
      await era.printAndWait(`在下不定决心而烦恼的时候，时间不断地流失掉了...`); // :323
    } else if (era.get(`cflag:${arg}:151`) > 0) { // :324
      await era.printAndWait(`然而，根本没有勇气发出声音，说自己在卖春的这种事情。`); // :325
    } else { // :326
      await era.printAndWait(`于是、一个对象也没有找到`); // :327
    } // :328
  } // :329




}

// @EXP_BITCH(ARG, PLACE, TYPE, PLAY) // :334
async function EXP_BITCH() {
  // RAW: #LOCALSIZE 1 // :335
  // RAW: #LOCALSSIZE 1 // :336
  // #DIMS PLACE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :337
  // #DIMS TYPE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :338
  // #DIM PLAY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :339
  switch (TYPE) { // :340
  case "HAND": { // :341
    // EXP:ARG:20 + = PLAY（变量语义：EXP 族，ARG:20 +） // :342
    era.set(`exp:${arg}:20 +`, PLAY); // :342
    // EXP:ARG:74 + = PLAY（变量语义：EXP 族，ARG:74 +） // :343
    era.set(`exp:${arg}:74 +`, PLAY); // :343
    if (PLACE == "DUNGEON") { // :344
      // JUEL:ARG:7 + = PLAY * 5（变量语义：JUEL 族，ARG:7 +） // :345
      era.set(`juel:${arg}:7 +`, PLAY * 5); // :345
    } else { // :346
      // JUEL:ARG:7 + = PLAY（变量语义：JUEL 族，ARG:7 +） // :347
      era.set(`juel:${arg}:7 +`, PLAY); // :347
    } // :348
    if (era.get(`talent:${arg}:62`)) { // :350
      // JUEL:ARG:9 + = PLAY（变量语义：JUEL 族，ARG:9 +） // :350
      era.set(`juel:${arg}:9 +`, PLAY); // :350
    } // :350
    if (era.get(`talent:${arg}:47`)) { // :352
      // JUEL:ARG:5 + = PLAY * 5（变量语义：JUEL 族，ARG:5 +） // :352
      era.set(`juel:${arg}:5 +`, PLAY * 5); // :352
    } // :352
    break; // :353
    } // :353
    case "ORAL": { // :353
      // EXP:ARG:22 + = PLAY（变量语义：EXP 族，ARG:22 +） // :354
      era.set(`exp:${arg}:22 +`, PLAY); // :354
      // EXP:ARG:20 + = PLAY（变量语义：EXP 族，ARG:20 +） // :355
      era.set(`exp:${arg}:20 +`, PLAY); // :355
      // EXP:ARG:74 + = PLAY（变量语义：EXP 族，ARG:74 +） // :356
      era.set(`exp:${arg}:74 +`, PLAY); // :356
      if (PLACE == "DUNGEON") { // :357
        // JUEL:ARG:7 + = PLAY * 10（变量语义：JUEL 族，ARG:7 +） // :358
        era.set(`juel:${arg}:7 +`, PLAY * 10); // :358
      } else { // :359
        // JUEL:ARG:7 + = PLAY（变量语义：JUEL 族，ARG:7 +） // :360
        era.set(`juel:${arg}:7 +`, PLAY); // :360
      } // :361
      if (era.get(`talent:${arg}:62`)) { // :363
        // JUEL:ARG:9 + = PLAY（变量语义：JUEL 族，ARG:9 +） // :363
        era.set(`juel:${arg}:9 +`, PLAY); // :363
      } // :363
      if (era.get(`talent:${arg}:47`)) { // :364
        // EXP:8 + = PLAY（变量语义：EXP 族，8 +） // :365
        era.set(`exp:${target}:8 +`, PLAY); // :365
        // JUEL:ARG:5 + = PLAY * 10（变量语义：JUEL 族，ARG:5 +） // :366
        era.set(`juel:${arg}:5 +`, PLAY * 10); // :366
      } // :367
      break; // :368
      } // :368
      case "LES": { // :368
        // EXP:ARG:40 + = PLAY（变量语义：EXP 族，ARG:40 +） // :369
        era.set(`exp:${arg}:40 +`, PLAY); // :369
        // EXP:ARG:74 + = PLAY（变量语义：EXP 族，ARG:74 +） // :370
        era.set(`exp:${arg}:74 +`, PLAY); // :370
        if (PLACE == "DUNGEON") { // :371
          // EXP:ARG:2 + = PLAY * (1 + ABL:ARG:10) / 5（变量语义：EXP 族，ARG:2 +） // :372
          era.set(`exp:${arg}:2 +`, PLAY * (1 + era.get(`abl:${arg}:10`)) / 5); // :372
          // JUEL:ARG:0 + = PLAY * 100 * (1 + ABL:ARG:10)（变量语义：JUEL 族，ARG:0 +） // :373
          era.set(`juel:${arg}:0 +`, PLAY * 100 * (1 + era.get(`abl:${arg}:10`))); // :373
          // JUEL:ARG:5 + = PLAY * 200（变量语义：JUEL 族，ARG:5 +） // :374
          era.set(`juel:${arg}:5 +`, PLAY * 200); // :374
        } else { // :375
          // EXP:ARG:2 + = PLAY * (1 + ABL:ARG:10) / 10（变量语义：EXP 族，ARG:2 +） // :376
          era.set(`exp:${arg}:2 +`, PLAY * (1 + era.get(`abl:${arg}:10`)) / 10); // :376
          // JUEL:ARG:0 + = PLAY * 10 * ABL:ARG:10（变量语义：JUEL 族，ARG:0 +） // :377
          era.set(`juel:${arg}:0 +`, PLAY * 10 * era.get(`abl:${arg}:10`)); // :377
          // JUEL:ARG:5 + = PLAY * 15（变量语义：JUEL 族，ARG:5 +） // :378
          era.set(`juel:${arg}:5 +`, PLAY * 15); // :378
        } // :379
        break; // :380
        } // :380
        case "ANAL": { // :380
          // EXP:ARG:1 + = PLAY（变量语义：EXP 族，ARG:1 +） // :381
          era.set(`exp:${arg}:1 +`, PLAY); // :381
          // EXP:ARG:5 + = PLAY（变量语义：EXP 族，ARG:5 +） // :382
          era.set(`exp:${arg}:5 +`, PLAY); // :382
          // EXP:ARG:74 + = PLAY（变量语义：EXP 族，ARG:74 +） // :383
          era.set(`exp:${arg}:74 +`, PLAY); // :383
          if (PLACE == "DUNGEON") { // :384
            // JUEL:ARG:2 + = PLAY * 200（变量语义：JUEL 族，ARG:2 +） // :385
            era.set(`juel:${arg}:2 +`, PLAY * 200); // :385
            // JUEL:ARG:5 + = PLAY * 250（变量语义：JUEL 族，ARG:5 +） // :386
            era.set(`juel:${arg}:5 +`, PLAY * 250); // :386
          } else { // :387
            // JUEL:ARG:2 + = PLAY * 10（变量语义：JUEL 族，ARG:2 +） // :388
            era.set(`juel:${arg}:2 +`, PLAY * 10); // :388
            // JUEL:ARG:5 + = PLAY * 15（变量语义：JUEL 族，ARG:5 +） // :389
            era.set(`juel:${arg}:5 +`, PLAY * 15); // :389
          } // :390
          break; // :391
          } // :391
          case "SEX": { // :391
            // EXP:ARG:0 + = PLAY（变量语义：EXP 族，ARG:0 +） // :392
            era.set(`exp:${arg}:0 +`, PLAY); // :392
            // EXP:ARG:5 + = PLAY（变量语义：EXP 族，ARG:5 +） // :393
            era.set(`exp:${arg}:5 +`, PLAY); // :393
            // EXP:ARG:74 + = PLAY（变量语义：EXP 族，ARG:74 +） // :394
            era.set(`exp:${arg}:74 +`, PLAY); // :394
            if (PLACE == "DUNGEON") { // :395
              // JUEL:ARG:1 + = PLAY * 200（变量语义：JUEL 族，ARG:1 +） // :396
              era.set(`juel:${arg}:1 +`, PLAY * 200); // :396
              // JUEL:ARG:5 + = PLAY * 250（变量语义：JUEL 族，ARG:5 +） // :397
              era.set(`juel:${arg}:5 +`, PLAY * 250); // :397
            } else { // :398
              // JUEL:ARG:1 + = PLAY * 10（变量语义：JUEL 族，ARG:1 +） // :399
              era.set(`juel:${arg}:1 +`, PLAY * 10); // :399
              // JUEL:ARG:5 + = PLAY * 15（变量语义：JUEL 族，ARG:5 +） // :400
              era.set(`juel:${arg}:5 +`, PLAY * 15); // :400
            } // :401
            break; // :402
            } // :402
            case "ANIMAL": { // :402
              // EXP:56 + = PLAY（变量语义：EXP 族，56 +） // :403
              era.set(`exp:${target}:56 +`, PLAY); // :403
              // EXP:0 + = PLAY（变量语义：EXP 族，0 +） // :404
              era.set(`exp:${target}:0 +`, PLAY); // :404
              // EXP:5 + = PLAY（变量语义：EXP 族，5 +） // :405
              era.set(`exp:${target}:5 +`, PLAY); // :405
              // JUEL:1 + = PLAY * 200（变量语义：JUEL 族，1 +） // :406
              era.set(`juel:${target}:1 +`, PLAY * 200); // :406
              // JUEL:6 + = PLAY * 300（变量语义：JUEL 族，6 +） // :407
              era.set(`juel:${target}:6 +`, PLAY * 300); // :407
              // JUEL:8 + = PLAY * 200（变量语义：JUEL 族，8 +） // :408
              era.set(`juel:${target}:8 +`, PLAY * 200); // :408




              break; // :413
              } // :413
  } // :413






}

// @PROFIT_BITCH(ARG, PLACE, TYPE, PLAY) // :420
async function PROFIT_BITCH() {
  // RAW: #LOCALSIZE 1 // :421
  // RAW: #LOCALSSIZE 1 // :422
  // #DIMS PLACE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :423
  // #DIMS TYPE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :424
  // #DIM PLAY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :425
  // #DIM PAY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :426
  // #DIM GIRL（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :427
  // #DIM MAN（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :428

  if (PLACE == "DUNGEON") { // :430

    if (era.get(`cflag:${arg}:1`) == 2) { // :432
      // 赋值 PAY = (FI_CULC_BITCH(ARG, "RATE", TYPE) + CFLAG:ARG:501) * FI_CULC_BITCH(ARG, "RATE", "KARMA") / 5 // :433

    } else { // :435
      // 赋值 PAY = 5 * (1 + CFLAG:ARG:501 + FI_CULC_BITCH(ARG, "RATE", TYPE)) // :436
    } // :437
  } else { // :438
    // 赋值 PAY = FI_CULC_BITCH(ARG, "RATE", "KARMA") * FI_CULC_BITCH(ARG, "RATE", TYPE) / 5 // :439
  } // :440

  switch (TYPE) { // :442

  case "ANIMAL": { // :444

    break; // :446
    } // :446
    case "LES": { // :446
      // 赋值 GIRL = RAND(1, 6) // :447
      switch (GIRL) { // :448
      case 3: { // :449
        // 赋值 PAY -= 10 // :450
        break; // :451
        } // :451
        case 4: { // :451
          // 赋值 PAY += 10 // :452
          break; // :453
          } // :453
      } // :453
      break; // :454
      } // :454
      default: { // :454
        // 赋值 MAN = RAND(1, 6) // :455
        switch (MAN) { // :456
        case 3: { // :457
          // 赋值 PAY -= 10 // :458
          break; // :459
          } // :459
          case 4: { // :459
            // 赋值 PAY += 10 // :460
            break; // :461
            } // :461
        } // :461
        break; // :462
        } // :462
  } // :462

  if (!era.get(`exp:${arg}:74`)) { // :465
    // 赋值 PAY += 10 // :465
  } // :465

  if (era.get(`talent:${arg}:0`)) { // :468
    // 赋值 PAY += 5 // :468
  } // :468

  // 赋值 PAY = PAY * PLAY // :470


  if (PLACE == "DUNGEON") { // :473

    if (era.get(`cflag:${arg}:1`) == 2) { // :475
      // CFLAG:ARG:580 + = PAY（变量语义：CFLAG 族，ARG:580 +） // :476
      era.set(`cflag:${arg}:580 +`, PAY); // :476
    } else { // :477
      // 赋值 MONEY += PAY // :478
      // EX_FLAG:4444 + = PAY（变量语义：EX_FLAG 族，4444 +） // :479
      era.set(`ex_flag:${target}:4444 +`, PAY); // :479
    } // :480
  } else { // :481
    // CFLAG:ARG:580 + = PAY（变量语义：CFLAG 族，ARG:580 +） // :482
    era.set(`cflag:${arg}:580 +`, PAY); // :482
  } // :483

  switch (TYPE) { // :485
  case "ANIMAL": { // :486
    return 0; // :487
    break; // :488
    } // :488
    case "LES": { // :488
      return 2, GIRL; // :489
      break; // :490
      } // :490
      default: { // :490
        return 1, MAN; // :491
        break; // :492
        } // :492
  } // :492




}

// @DUNGEON_WORK(ARG) // :497
async function DUNGEON_WORK() {
  // RAW: #LOCALSIZE 1 // :498
  // RAW: #LOCALSSIZE 1 // :499
  // 赋值 LOCAL = (CFLAG:ARG:9 * 20) + 100 // :500
  if (era.get(`cflag:${arg}:0`) == 0) { // :502
    // RAW: LOCAL /= 10 // :502
  } // :502
  if (era.get('flag:5') & 32) { // :503
    await era.print(`%SAVESTR:ARG%从事了`); // :504
    await era.print(`ATA`); // :505
    // RAW: DATAFORM 研磨宝石的 // :506
    // RAW: DATAFORM 制作工艺品的 // :507
    // RAW: DATAFORM 抄写书籍的 // :508
    // RAW: DATAFORM 制作手工的 // :509
    // RAW: ENDDATA // :510
    await era.printAndWait(`副业{LOCAL}点收入。`); // :511
  } // :512
  // 赋值 MONEY += LOCAL // :513
  // EX_FLAG:4444 + = LOCAL（变量语义：EX_FLAG 族，4444 +） // :514
  era.set(`ex_flag:${target}:4444 +`, LOCAL); // :514




}

// @DUNGEON_ANIMAL(ARG) // :519
async function DUNGEON_ANIMAL() {
  // RAW: #LOCALSIZE 1 // :520
  // RAW: #LOCALSSIZE 1 // :521
  // #DIM PLAY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :522
  // 赋值 PLAY = FI_CULC_BITCH(ARG, "PLAY", "ANIMAL") // :523
  await era.print(`%SAVESTR:ARG%无法压抑兽交的欲望`); // :524
  await era.printAndWait(`悄悄寻找着兽穴...`); // :525
  await era.printAndWait(`%SAVESTR:ARG%进入了野兽的巢穴，像母狗一样趴在地上，扭动着身躯引诱着发情的野兽。在野兽舌头的舔舐润滑后，令人兴奋的喘息和呜咽伴随着野兽的咆哮和肉体的撞击声缭绕在兽穴内，%SAVESTR:ARG%比真正的雌兽还要卖力的摇晃着屁股，逢迎着非人的巨大阳具的刺激。`); // :526
  await era.printAndWait(`随后%SAVESTR:ARG%翻身将野兽压倒在地，主动跨坐在野兽的阴茎上扭动着自己的身体，同时将自己的乳首送到野兽嘴边享受着口舌的舔舐。粗暴的动作使%SAVESTR:ARG%骑在野兽上陷入了恍惚，口水不由自主的流淌出来，无与伦比的快感让%SAVESTR:ARG%成为了一具供野兽发泄性欲的肉娃娃。`); // :527
  await era.printAndWait(`忘我地与野兽样的魔物交尾了{PLAY}次…`); // :528

  // CALL LOG_BITCH_ANIMAL(ARG, "DUNGEON") // :530
  // RAW: WAIT // :531


  await era.print(`%EXPNAME:56%＋{PLAY}`); // :534
  await era.print(`%EXPNAME:0%＋{PLAY}`); // :535
  await era.print(`%EXPNAME:5%＋{PLAY}`); // :536
  // EXP:ARG:56 + = PLAY（变量语义：EXP 族，ARG:56 +） // :537
  era.set(`exp:${arg}:56 +`, PLAY); // :537
  // EXP:ARG:0 + = PLAY（变量语义：EXP 族，ARG:0 +） // :538
  era.set(`exp:${arg}:0 +`, PLAY); // :538
  // EXP:ARG:5 + = PLAY（变量语义：EXP 族，ARG:5 +） // :539
  era.set(`exp:${arg}:5 +`, PLAY); // :539


  await era.print(`%PALAMNAME:1%点数＋{PLAY*200}`); // :542
  await era.print(`%PALAMNAME:6%点数＋{PLAY*300}`); // :543
  await era.printAndWait(`%PALAMNAME:8%点数＋{PLAY*200}`); // :544
  // JUEL:ARG:1 + = PLAY * 200（变量语义：JUEL 族，ARG:1 +） // :545
  era.set(`juel:${arg}:1 +`, PLAY * 200); // :545
  // JUEL:ARG:6 + = PLAY * 300（变量语义：JUEL 族，ARG:6 +） // :546
  era.set(`juel:${arg}:6 +`, PLAY * 300); // :546
  // JUEL:ARG:8 + = PLAY * 200（变量语义：JUEL 族，ARG:8 +） // :547
  era.set(`juel:${arg}:8 +`, PLAY * 200); // :547

  await era.printAndWait(`%SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量（经验值＋{PLAY}）`); // :549
  // EXP:0:80 + = PLAY（变量语义：EXP 族，0:80 +） // :550
  era.set(`exp:${target}:0:80 +`, PLAY); // :550
  // EXP:ARG:80 + = PLAY（变量语义：EXP 族，ARG:80 +） // :551
  era.set(`exp:${arg}:80 +`, PLAY); // :551

  // 赋值 LOCAL = -1 * PLAY // :553
  await era.printAndWait(`（善恶值减少了：{LOCAL}）`); // :554
  // CALL KARMA, ARG, LOCAL // :555




}

// @SELF_BITCH(ARG, PLACE) // :560
async function SELF_BITCH() {
  // RAW: #LOCALSIZE 1 // :561
  // RAW: #LOCALSSIZE 1 // :562
  // #DIMS PLACE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :563
  // #DIM PLAY（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :564
  await era.printAndWait(`%SAVESTR:ARG%无法压抑性欲，自慰了起来`); // :565
  // 赋值 PLAY = FI_CULC_BITCH(ARG, "PLAY", "SELF") // :566



  if (!era.get(`talent:${arg}:85`) && era.get(`abl:${arg}:22`) > rand_n(5)) { // :570
    await era.print(`想象着跟女人的交合`); // :571
    // 赋值 LOCAL = 1 // :572

  } else if (era.get('item:22') && !era.get(`talent:${arg}:85`) && era.get(`abl:${arg}:39`) > rand_n(5)) { // :574
    await era.print(`陷入了跟野兽交尾的幻想`); // :575
    // 赋值 LOCAL = 2 // :576


  } else if (PLACE == "DUNGEON" && (1 + rand_n(40 - 1)) < era.get(`cflag:${arg}:10`)) { // :579
    await era.print(`ATA`); // :580
    // RAW: DATAFORM 想起%CALLNAME:MASTER%的事 // :581
    // RAW: DATAFORM 一次次呼唤着%CALLNAME:MASTER%的名字 // :582
    // RAW: DATAFORM 想起了上次的调教 // :583
    // RAW: DATAFORM 想象着下一次的调教 // :584
    // RAW: ENDDATA // :585
    // 赋值 LOCAL = 3 // :586


  } else if ((1 + rand_n(5 - 1)) < era.get(`abl:${arg}:31`)) { // :589
    await era.print(`ATA`); // :590
    // RAW: DATAFORM 如饥似渴，一副十分想要的样子 // :591
    // RAW: DATAFORM 无法满足的欲望，心情变得十分急躁 // :592
    // RAW: DATAFORM 不自觉地张开着嘴巴 // :593
    // RAW: DATAFORM 根本不在意口水滴落下来的样子 // :594
    // RAW: DATAFORM 根本不在意口水流下来的样子 // :595
    // RAW: DATAFORM 一脸恍惚的样子 // :596
    // RAW: DATAFORM 一脸沉浸在欲望中的快乐表情 // :597
    // RAW: DATAFORM 红晕慢慢爬上了脸颊 // :598
    // RAW: DATAFORM 欲望高涨，身体如同火烧一般 // :599
    // RAW: DATAFORM 呆滞的眼神 // :600
    // RAW: DATAFORM 充满情欲的眼睛，变得水汪汪的 // :601
    // RAW: DATAFORM 突然将双腿张开 // :602
    // RAW: DATAFORM 身体一颤一颤的 // :603
    // RAW: DATAFORM 将股间张得大大的 // :604
    // RAW: DATAFORM 不知不觉的扭动着腰肢 // :605
    // RAW: DATAFORM 欲求不满的摇动着腰肢 // :606
    // RAW: DATAFORM 腰部下流的扭动着 // :607
    // RAW: DATAFORM 仰起喉咙 // :608
    // RAW: DATAFORM 时不时从嘴边发出呻吟 // :609
    // RAW: DATAFORM 爱液浸湿了床具 // :610
    // RAW: DATAFORM 涂满了溢出来的爱液 // :611
    // RAW: DATAFORM 十分粗野的撕扯着衣服，双乳若隐若现 // :612
    // RAW: DATAFORM 挣扎在绝顶的边缘 // :613
    // RAW: ENDDATA // :614
    // 赋值 LOCAL = 4 // :615

  } else { // :617
    await era.print(`ATA`); // :618
    // RAW: DATAFORM 努力地忍住声音 // :619
    // RAW: DATAFORM 拼命地将气息憋住 // :620
    // RAW: DATAFORM 注意着周围的动静 // :621
    // RAW: DATAFORM 想着要停下来也... // :622
    // RAW: DATAFORM 用踌躇的动作 // :623
    // RAW: DATAFORM 迷惑地将手指重合了起来 // :624
    // RAW: DATAFORM 牢牢地将嘴唇重合起来 // :625
    // RAW: DATAFORM 懒洋洋地低下了头 // :626
    // RAW: DATAFORM 烦恼地皱了皱眉头 // :627
    // RAW: ENDDATA // :628
    // 赋值 LOCAL = 5 // :629
  } // :630

  if (era.get(`talent:${arg}:121`) == 1 || era.get(`talent:${arg}:122`) == 1 || era.get(`talent:${arg}:326`) == 1) { // :632

    await era.print(`握住肉棒捋了起来`); // :634
  } // :635

  await era.printAndWait(`自慰了{PLAY}次。`); // :637


  // CALL LOG_BITCH_SELF(ARG, PLACE, LOCAL) // :640
  // RAW: WAIT // :641


  await era.print(`%EXPNAME:10%＋{PLAY}`); // :644
  // EXP:ARG:10 + = PLAY（变量语义：EXP 族，ARG:10 +） // :645
  era.set(`exp:${arg}:10 +`, PLAY); // :645


  if (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) { // :648
    await era.print(`阴茎点数＋{PLAY * 500}`); // :649
  } else { // :650
    await era.print(`%PALAMNAME:0%点数＋{PLAY * 500}`); // :651
  } // :652
  await era.print(`%PALAMNAME:4%点数＋{PLAY * 100}`); // :653
  await era.printAndWait(`%PALAMNAME:5%点数＋{PLAY * 250}`); // :654
  // JUEL:ARG:0 + = PLAY * 500（变量语义：JUEL 族，ARG:0 +） // :655
  era.set(`juel:${arg}:0 +`, PLAY * 500); // :655
  // JUEL:ARG:4 + = PLAY * 100（变量语义：JUEL 族，ARG:4 +） // :656
  era.set(`juel:${arg}:4 +`, PLAY * 100); // :656
  // JUEL:ARG:5 + = PLAY * 250（变量语义：JUEL 族，ARG:5 +） // :657
  era.set(`juel:${arg}:5 +`, PLAY * 250); // :657

  if (PLACE == "DUNGEON") { // :659
    // EXP:ARG:80 + = PLAY（变量语义：EXP 族，ARG:80 +） // :660
    era.set(`exp:${arg}:80 +`, PLAY); // :660
    // EXP:0:80 + = PLAY（变量语义：EXP 族，0:80 +） // :661
    era.set(`exp:${target}:0:80 +`, PLAY); // :661
    await era.printAndWait(`%SAVESTR:ARG%的淫荡行为成为了魔王和奴隶们的力量（经验值＋{PLAY}）`); // :662
  } else { // :663
    // EXP:ARG:80 + = PLAY（变量语义：EXP 族，ARG:80 +） // :664
    era.set(`exp:${arg}:80 +`, PLAY); // :664
    await era.printAndWait(`%SAVESTR:ARG%获得了{PLAY}点经验值。`); // :665
  } // :666






}

// @FI_TRY_BITCH(ARG, PLACE) // :673
async function FI_TRY_BITCH() {
  // #FUNCTION（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :674
  // #DIMS PLACE（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :675
  // #DIM LCOUNT（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :676
  // #DIM PLAY, 7（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :677
  // RAW: VARSET PLAY // :678
  if (PLACE == "TOWN") { // :679

    // RAW: FOR LCOUNT, 1, 7 // :681
    // 赋值 LOCALS = %FS_BITCH("PLAY", LCOUNT)% // :682
    // 赋值 PLAY:LCOUNT  = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) // :683

    // 赋值 PLAY:LCOUNT + = FI_CULC_BITCH(ARG, "RATE", "KARMA") / FI_CULC_BITCH(ARG, "RATE", LOCALS) // :685

    if (!FI_CULC_BITCH(ARG, "ABLE", LOCALS)) { // :688
      // 赋值 PLAY:LCOUNT  = 0 // :688
    } // :688
    // RAW: NEXT // :689

    // 赋值 PLAY:0  = SUMARRAY(PLAY) + FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") // :691
  } else if (PLACE == "DUNGEON") { // :692

    // RAW: FOR LCOUNT, 1, 6 // :694
    // 赋值 LOCALS = %FS_BITCH("PLAY", LCOUNT)% // :695
    // 赋值 PLAY:LCOUNT  = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) // :696

    if (!FI_CULC_BITCH(ARG, "ABLE", LOCALS)) { // :699
      // 赋值 PLAY:LCOUNT  = 0 // :699
    } // :699
    // RAW: NEXT // :700
    // 赋值 PLAY:0  = SUMARRAY(PLAY) // :701


    if (era.get(`cflag:${arg}:500`) == 1) { // :704
      // 赋值 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") / MAX(1, ABL:ARG:10) // :705
    } else { // :706
      // 赋值 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") // :707
    } // :708
  } // :709

  if (PLAY <= 0) { // :712
    // 赋值 PLAY = 1 // :712
  } // :712

  // 赋值 LOCAL = RAND:PLAY // :714
  // RAW: FOR LCOUNT, 1, 7 // :715
  if (LOCAL < play[lcount]) { // :717
    // RAW: RETURNF LCOUNT // :717
  } // :717
  // 赋值 LOCAL -= PLAY:LCOUNT // :718
  // RAW: NEXT // :719
  // RAW: RETURNF 0 // :720






}

// @FI_CULC_BITCH(ARG, ARGS, ARGS:1) // :727
async function FI_CULC_BITCH() {
  // #FUNCTION（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :728
  // RAW: #LOCALSIZE 1 // :729
  // RAW: #LOCALSSIZE 1 // :730
  switch (ARGS) { // :731

  case "SIPPAI": { // :733






    if (era.get('args:1') == "TOWN") { // :740
      // 赋值 LOCAL = 250 + CFLAG:ARG:151 // :741
    } else if (era.get('args:1') == "DUNGEON") { // :742
      // 赋值 LOCAL = 250 + CFLAG:ARG:151 // :743
    } else { // :744
      // RAW: THROW 未知的文字%ARGS:1% // :745
    } // :746

    // RAW: LOCAL /= (1 + ABL:ARG:37) // :748

    if (era.get(`talent:${arg}:76`)) { // :751
      // RAW: TIMES LOCAL, 0.7 // :751
    } // :751

    if (era.get(`talent:${arg}:181`)) { // :753
      // RAW: TIMES LOCAL, 0.5 // :754
    } else if (era.get(`talent:${arg}:180`)) { // :755
      // RAW: TIMES LOCAL, 0.7 // :756
    } // :757


    if (era.get(`cflag:${arg}:120`) == 0) { // :761
      // 赋值 LOCAL += 999 // :761
    } // :761


    // 赋值 LOCAL = MAX(LOCAL, 1) // :764
    // RAW: RETURNF LOCAL // :765

    break; // :767
    } // :767
    case "SEIKOU": { // :767
      // 赋值 LOCAL = ABL:ARG:37 * 5 // :768
      if (era.get(`exp:${arg}:74`)) { // :770
        // RAW: LOCAL ++ // :770
      } // :770
      if (era.get(`cflag:${arg}:151`) < -100) { // :772
        // RAW: LOCAL ++ // :772
      } // :772

      if (era.get(`talent:${arg}:204`)) { // :775
        // 赋值 LOCAL += 100 // :775
      } // :775

      // 赋值 LOCAL += (TALENT:ARG:76 + TALENT:ARG:180 + TALENT:ARG:181) * 30 // :777
      if (era.get('args:1') == "TOWN") { // :778

        switch (era.get(`cflag:${arg}:580`) + era.get(`cflag:${arg}:581`) + era.get(`cflag:${arg}:582`)) { // :780
        case IS < -40000: { // :781
          // 赋值 LOCAL += 2000 // :782
          break; // :783
          } // :783
          case IS < -20000: { // :783
            // 赋值 LOCAL += 1000 // :784
            break; // :785
            } // :785
            case IS < -10000: { // :785
              // 赋值 LOCAL += 500 // :786
              break; // :787
              } // :787
              case IS < -5000: { // :787
                // 赋值 LOCAL += 250 // :788
                break; // :789
                } // :789
                case IS < 0: { // :789
                  // 赋值 LOCAL += 100 // :790
                  break; // :791
                  } // :791
                  case IS < 5000: { // :791
                    // 赋值 LOCAL += 50 // :792
                    break; // :793
                    } // :793
                    case IS < 10000: { // :793
                      // 赋值 LOCAL += 20 // :794
                      break; // :795
                      } // :795
                      default: { // :795
                        // 赋值 LOCAL += 5 // :796
                        break; // :797
                        } // :797
        } // :797
      } else if (era.get('args:1') == "DUNGEON") { // :798

        if (era.get(`cflag:${arg}:1`) == 2) { // :800
          switch (era.get(`cflag:${arg}:580`) + era.get(`cflag:${arg}:581`) + era.get(`cflag:${arg}:582`)) { // :801
          case IS < -40000: { // :802
            // 赋值 LOCAL += 2000 // :803
            break; // :804
            } // :804
            case IS < -20000: { // :804
              // 赋值 LOCAL += 1000 // :805
              break; // :806
              } // :806
              case IS < -10000: { // :806
                // 赋值 LOCAL += 500 // :807
                break; // :808
                } // :808
                case IS < -5000: { // :808
                  // 赋值 LOCAL += 250 // :809
                  break; // :810
                  } // :810
                  case IS < 0: { // :810
                    // 赋值 LOCAL += 100 // :811
                    break; // :812
                    } // :812
                    case IS < 5000: { // :812
                      // 赋值 LOCAL += 50 // :813
                      break; // :814
                      } // :814
                      case IS < 10000: { // :814
                        // 赋值 LOCAL += 20 // :815
                        break; // :816
                        } // :816
                        default: { // :816
                          // 赋值 LOCAL += 5 // :817
                          break; // :818
                          } // :818
          } // :818

        } else { // :820
          // 赋值 LOCAL += 1500 / (25 - ABL:ARG:11 - ABL:ARG:37) // :821

          if (era.get(`cflag:${arg}:1`) == 3 && era.get(`cflag:${arg_0}:533`) > 1) { // :823
            // RAW: TIMES LOCAL, 0.75 // :824

          } else if (era.get(`cflag:${arg}:500`) == 1) { // :826
            // RAW: LOCAL *= 10 + ABL:ARG:10 * 2 // :827
            // RAW: LOCAL /= 10 // :828

          } else { // :830
            // RAW: TIMES LOCAL, 0.75 // :831
          } // :832
        } // :833
      } else { // :834
        // RAW: THROW 未知的文字%ARGS:1% // :835
      } // :836


      if (era.get(`cflag:${arg}:120`) > 0) { // :839
        // 赋值 LOCAL += (CFLAG:ARG:120 * 100) - 5 // :840
      } else { // :841
        // 赋值 LOCAL = 1 // :842
      } // :843


      // 赋值 LOCAL = MAX(LOCAL, 1) // :846
      // RAW: RETURNF LOCAL // :847

      break; // :849
      } // :849
      case "KYAKU": { // :849
        // 赋值 LOCAL = RAND:6 // :850

        switch (era.get(`cflag:${arg}:151`)) { // :852
        case IS > 180: { // :853
          // 赋值 LOCAL -= 3 // :854
          break; // :855
          } // :855
          case IS > 130: { // :855
            // 赋值 LOCAL -= 2 // :856
            break; // :857
            } // :857
            case IS > 80: { // :857
              // 赋值 LOCAL -= 1 // :858
              break; // :859
              } // :859
              case IS > 30: { // :859
                break; // :860
                } // :860
                case IS > -20: { // :860
                  // 赋值 LOCAL += 1 // :861
                  break; // :862
                  } // :862
                  case IS > -70: { // :862
                    // 赋值 LOCAL += 2 // :863
                    break; // :864
                    } // :864
                    case IS > -120: { // :864
                      // 赋值 LOCAL += 3 // :865
                      break; // :866
                      } // :866
                      default: { // :866
                        // 赋值 LOCAL += 4 // :867
                        break; // :868
                        } // :868
        } // :868


        switch (era.get(`talent:${arg}:315`)) { // :871
        case 5: { // :872

          // 赋值 LOCAL += 2 // :874
          break; // :875
          } // :875
          case 7: { // :875

            // 赋值 LOCAL += 1 // :877
            break; // :878
            } // :878
            case 2: // :878
            case 8: // :878
            case 12: { // :878

              // 赋值 LOCAL -= 1 // :880
              break; // :881
              } // :881
        } // :881

        // 赋值 LOCAL += (ABL:ARG:15 + ABL:ARG:17 + ABL:ARG:37) / 6 // :883
        // 赋值 LOCAL += TALENT:ARG:23 + TALENT:ARG:28 + TALENT:ARG:31 + TALENT:ARG:33 // :884
        // 赋值 LOCAL -= TALENT:ARG:21 + TALENT:ARG:22 + TALENT:ARG:24 + TALENT:ARG:27 + TALENT:ARG:30 // :885
        // 赋值 LOCAL += TALENT:ARG:91 + TALENT:ARG:92 + TALENT:ARG:113 // :886
        // 赋值 LOCAL += TALENT:ARG:83 + TALENT:ARG:87 + TALENT:ARG:88 // :887
        if (era.get(`talent:${arg}:110`)) { // :889
          // RAW: LOCAL ++ // :889
        } // :889
        if (era.get(`talent:${arg}:114`)) { // :891
          // 赋值 LOCAL += 2 // :891
        } // :891
        if (era.get(`talent:${arg}:100`)) { // :892
          if (era.get(`talent:${arg}:10`)) { // :894
            // RAW: LOCAL ++ // :894
          } // :894
          if (era.get(`talent:${arg}:109`)) { // :896
            // RAW: LOCAL ++ // :896
          } // :896
          if (era.get(`talent:${arg}:116`)) { // :898
            // 赋值 LOCAL += 2 // :898
          } // :898
        } // :899
        if (era.get(`talent:${arg}:99`) && era.get(`talent:${arg}:248`)) { // :901
          // RAW: LOCAL ++ // :901
        } // :901
        if (era.get('args:1') == "TOWN") { // :902

          // 赋值 LOCAL -= TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 // :904

          switch (era.get(`cflag:${arg}:580`) + era.get(`cflag:${target}:581`) + era.get(`cflag:${target}:582`)) { // :906
          case IS < -40000: { // :907
            // 赋值 LOCAL += 5 // :908
            break; // :909
            } // :909
            case IS < -20000: { // :909
              // 赋值 LOCAL += 4 // :910
              break; // :911
              } // :911
              case IS < -10000: { // :911
                // 赋值 LOCAL += 3 // :912
                break; // :913
                } // :913
                case IS < -5000: { // :913
                  // 赋值 LOCAL += 2 // :914
                  break; // :915
                  } // :915
                  case IS < 0: { // :915
                    // 赋值 LOCAL += 1 // :916
                    break; // :917
                    } // :917
                    case IS < 5000: { // :917
                      // 赋值 LOCAL -= 1 // :918
                      break; // :919
                      } // :919
                      case IS < 10000: { // :919
                        // 赋值 LOCAL -= 2 // :920
                        break; // :921
                        } // :921
                        default: { // :921
                          // 赋值 LOCAL -= 3 // :922
                          break; // :923
                          } // :923
          } // :923
        } else if (era.get('args:1') == "DUNGEON") { // :924
          // 赋值 LOCAL += TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 // :925

          if (era.get(`cflag:${arg}:500`) == 1) { // :927
            // RAW: LOCAL *= 10 + ABL:ARG:10 // :928
            // RAW: LOCAL /= 10 // :929
          } else { // :930
            if (era.get(`talent:${arg}:85`)) { // :932
              // RAW: TIMES LOCAL, 0.5 // :932
            } // :932
          } // :933
        } else { // :934
          // RAW: THROW 未知的文字%ARGS:1% // :935
        } // :936


        if (era.get(`talent:${arg}:204`)) { // :940
          // RAW: TIMES LOCAL, 1.5 // :940
        } // :940


        // 赋值 LOCAL = MAX(LOCAL, 0) // :943
        // RAW: RETURNF LOCAL // :944

        break; // :946
        } // :946
        case "ABLE": { // :946


          if (ARG < 0) { // :950
            // RAW: RETURNF 0 // :950
          } // :950

          if (era.get(`base:${arg}:0`) < 500) { // :953
            // RAW: RETURNF 0 // :953
          } // :953

          switch (era.get('args:1')) { // :955

          case "SELF": { // :957

            break; // :959
            } // :959
            case "HAND": { // :959

              break; // :961
              } // :961
              case "ORAL": { // :961

                if (era.get(`cflag:${arg}:16`) == -1) { // :964
                  // RAW: RETURNF 0 // :964
                } // :964

                break; // :966
                } // :966
                case "LES": { // :966

                  if (era.get(`abl:${arg}:22`) < 2 || era.get(`abl:${arg}:0`) < 3 || era.get(`abl:${arg}:10`) < 2 || era.get(`abl:${arg}:11`) < 2) { // :969
                    // RAW: RETURNF 0 // :969
                  } // :969

                  if (era.get(`abl:${arg}:33`) == 0) { // :972
                    // RAW: RETURNF 0 // :972
                  } // :972

                  break; // :974
                  } // :974
                  case "ANAL": { // :974

                    break; // :976
                    } // :976
                    case "SEX": { // :976

                      if (era.get(`talent:${arg}:0`) || era.get(`talent:${arg}:122`) == 1) { // :979
                        // RAW: RETURNF 0 // :979
                      } // :979

                      if (era.get(`cflag:${arg}:42`) == 79 && (era.get(`cflag:${arg}:40`) & 64)) { // :982
                        // RAW: RETURNF 0 // :982
                      } // :982

                      if (era.get(`talent:${arg}:273`)) { // :985
                        // RAW: RETURNF 0 // :985
                      } // :985


                      break; // :988
                      } // :988
                      case "ANIMAL": { // :988



                        if (era.get('item:22') == 0) { // :993
                          // RAW: RETURNF 0 // :993
                        } // :993

                        if (era.get(`talent:${arg}:0`) || era.get(`talent:${arg}:122`) == 1) { // :996
                          // RAW: RETURNF 0 // :996
                        } // :996

                        if (era.get(`cflag:${arg}:42`) == 79 && (era.get(`cflag:${arg}:40`) & 64)) { // :999
                          // RAW: RETURNF 0 // :999
                        } // :999

                        if (era.get(`talent:${arg}:273`)) { // :1002
                          // RAW: RETURNF 0 // :1002
                        } // :1002
                        break; // :1003
                        } // :1003
          } // :1003
          // RAW: RETURNF 1 // :1004

          break; // :1006
          } // :1006
          case "PLAY": { // :1006

            if (era.get('args:1') == "SELF") { // :1008
              // 赋值 LOCAL = ABL:ARG:31 + RAND:(ABL:ARG:11 + 1) // :1009
              // RAW: LOCAL /= 3 // :1010
              // 赋值 LOCAL += TALENT:ARG:60 + TALENT:ARG:74 + TALENT:ARG:272 // :1011

              if (era.get(`talent:${arg}:74`)) { // :1014
                // RAW: TIMES LOCAL, 1.5 // :1014
              } // :1014

              if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`) || era.get(`talent:${arg}:326`)) { // :1017
                // RAW: TIMES LOCAL, 1.2 // :1017
              } // :1017

              // 赋值 LOCAL = MAX(LOCAL, 1) // :1019
              // RAW: RETURNF LOCAL // :1020
            } // :1021
            // 赋值 LOCAL = 1 + RAND:3 // :1022
            // 赋值 LOCAL += TALENT:ARG:63 + TALENT:ARG:64 // :1023
            // 赋值 LOCAL += (TALENT:ARG:76 + TALENT:ARG:272) * 2 // :1024
            // 赋值 LOCAL += (ABL:ARG:16 + ABL:ARG:37) / 3 // :1025

            if (era.get(`flag:${era.get(`cflag:${arg}:501`) + 349}`) == 507) { // :1028
              // RAW: TIMES LOCAL, 1.2 // :1028
            } // :1028
            switch (era.get('args:1')) { // :1029

            case "HAND": { // :1031
              // 赋值 LOCAL += ABL:ARG:32 / 3 // :1032

              break; // :1034
              } // :1034
              case "ORAL": { // :1034
                // 赋值 LOCAL += ABL:ARG:32 / 2 // :1035
                if (era.get(`exp:${arg}:22`)) { // :1037
                  // RAW: LOCAL ++ // :1037
                } // :1037
                if (era.get(`talent:${arg}:52`)) { // :1039
                  // RAW: LOCAL ++ // :1039
                } // :1039

                if (era.get(`talent:${arg}:47`)) { // :1042
                  // RAW: TIMES LOCAL, 1.5 // :1042
                } // :1042

                break; // :1044
                } // :1044
                case "LES": { // :1044
                  // 赋值 LOCAL += (ABL:ARG:0 + ABL:ARG:22) / 3 // :1045
                  // 赋值 LOCAL += TALENT:ARG:81 + TALENT:ARG:82 // :1046
                  // RAW: LOCAL *= (10 + ABL:ARG:33) // :1047
                  // RAW: LOCAL /= 10 // :1048

                  break; // :1050
                  } // :1050
                  case "ANAL": { // :1050
                    // 赋值 LOCAL += (ABL:ARG:3 + ABL:ARG:30) / 3 // :1051

                    if (era.get(`talent:${arg}:77`)) { // :1054
                      // RAW: TIMES LOCAL, 1.5 // :1054
                    } // :1054

                    break; // :1056
                    } // :1056
                    case "SEX": { // :1056
                      // 赋值 LOCAL += (ABL:ARG:2 + ABL:ARG:30) / 3 // :1057

                      if (era.get(`talent:${arg}:75`)) { // :1060
                        // RAW: TIMES LOCAL, 1.5 // :1060
                      } // :1060

                      break; // :1062
                      } // :1062
                      case "ANIMAL": { // :1062
                        // 赋值 LOCAL += (ABL:ARG:30 + ABL:ARG:39) / 3 // :1063

                        // 赋值 LOCAL += TALENT:ARG:124 + (TALENT:ARG:317 == 12) // :1065

                        if (era.get(`talent:${arg}:136`)) { // :1068
                          // RAW: TIMES LOCAL, 1.5 // :1068
                        } // :1068
                        break; // :1069
                        } // :1069
            } // :1069

            if (!era.get(`exp:${arg}:74`)) { // :1072
              // 赋值 LOCAL -= 5 // :1072
            } // :1072


            // 赋值 LOCAL = MAX(LOCAL, 1) // :1075
            // RAW: RETURNF LOCAL // :1076

            break; // :1078
            } // :1078
            case "KAKURITU": { // :1078
              // 赋值 LOCAL = 1 + RAND:3 // :1079
              switch (era.get('args:1')) { // :1080

              case "HAND": { // :1082
                // 赋值 LOCAL += ABL:ARG:32 + 4 // :1083

                if (era.get(`talent:${arg}:85`) && !(era.get(`talent:${arg}:180`) || era.get(`talent:${arg}:181`))) { // :1086
                  // RAW: TIMES LOCAL, 1.5 // :1086
                } // :1086

                break; // :1088
                } // :1088
                case "ORAL": { // :1088
                  // 赋值 LOCAL += ABL:ARG:32 + 3 // :1089
                  if (era.get(`talent:${arg}:52`)) { // :1091
                    // 赋值 LOCAL += 3 // :1091
                  } // :1091

                  if (era.get(`talent:${arg}:47`)) { // :1094
                    // RAW: TIMES LOCAL, 2.0 // :1094
                  } // :1094

                  break; // :1096
                  } // :1096
                  case "LES": { // :1096
                    // 赋值 LOCAL += ABL:ARG:0 + ABL:ARG:22 // :1097
                    // RAW: LOCAL *= (10 + ABL:ARG:33) // :1098
                    // RAW: LOCAL /= 10 // :1099

                    break; // :1101
                    } // :1101
                    case "ANAL": { // :1101
                      // 赋值 LOCAL += ABL:ARG:3 + ABL:ARG:30 // :1102

                      if (era.get(`talent:${arg}:77`)) { // :1105
                        // RAW: TIMES LOCAL, 2.0 // :1105
                      } // :1105

                      break; // :1107
                      } // :1107
                      case "SEX": { // :1107
                        // 赋值 LOCAL += ABL:ARG:2 + ABL:ARG:30 // :1108

                        if (era.get(`talent:${arg}:75`)) { // :1111
                          // RAW: TIMES LOCAL, 2.0 // :1111
                        } // :1111

                        break; // :1113
                        } // :1113
                        case "ANIMAL": { // :1113
                          // 赋值 LOCAL += ABL:ARG:30 + ABL:ARG:39 // :1114

                          if (era.get(`talent:${arg}:136`)) { // :1117
                            // RAW: TIMES LOCAL, 2.0 // :1117
                          } // :1117
                          break; // :1118
                          } // :1118
              } // :1118

              // 赋值 LOCAL = MAX(LOCAL, 1) // :1120
              // RAW: LOCAL *= 5 // :1121
              // RAW: RETURNF LOCAL // :1122


              break; // :1125
              } // :1125
              case "RATE": { // :1125
                switch (era.get('args:1')) { // :1126


                case "KARMA": { // :1129
                  // RAW: RETURNF (250 + CFLAG:ARG:151) // :1130

                  break; // :1132
                  } // :1132
                  case "HAND": { // :1132
                    // RAW: RETURNF 1 // :1133

                    break; // :1135
                    } // :1135
                    case "ORAL": // :1135
                    case "LES": { // :1135
                      // RAW: RETURNF 2 // :1136

                      break; // :1138
                      } // :1138
                      case "ANAL": { // :1138
                        // RAW: RETURNF 3 // :1139

                        break; // :1141
                        } // :1141
                        case "SEX": { // :1141
                          // RAW: RETURNF 4 // :1142

                          break; // :1144
                          } // :1144
                          case "ANIMAL": { // :1144
                            // RAW: RETURNF 11 // :1145
                            break; // :1146
                            } // :1146
                } // :1146
                break; // :1147
                } // :1147
  } // :1147


}

// @SHOW_BUTTON_BICH_LEVEL(NUM, ARG) // :1150
async function SHOW_BUTTON_BICH_LEVEL() {
  // #DIM NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :1151





  await era.print(`[{NUM}] 卖春积极性 -`); // :1157

  if (era.get(`cflag:${arg}:120`) == 0) { // :1159
    await era.print(`没有`); // :1160
  } else if (era.get(`cflag:${arg}:120`) == 1) { // :1161
    await era.print(`普通`); // :1162
  } else { // :1163
    await era.print(`{CFLAG:ARG:120}等级`); // :1164
  } // :1165

  await era.print(''); // :1167

  return 0; // :1169


}

// @SET_BICH_LEVEL(ARG) // :1172
async function SET_BICH_LEVEL() {


  await era.print(`请设定等级`); // :1175
  await era.print(`[0] [1] [2] [3] [4] [5]`); // :1176
  // RAW: INPUT // :1177

  if (RESULT < 0) { // :1179
    return 0; // :1180
  } else if (RESULT > 5) { // :1181
    return 0; // :1182
  } // :1183

  // CFLAG:ARG:120  = RESULT（变量语义：CFLAG 族，ARG:120） // :1185
  era.set(`cflag:${arg}:120`, RESULT); // :1185

  if (RESULT == 0) { // :1187
    await era.printAndWait(`卖春积极性变成没有了`); // :1188
  } else if (RESULT == 1) { // :1189
    await era.printAndWait(`卖春积极性变成普通了`); // :1190
  } else { // :1191
    await era.printAndWait(`卖春积极性变为等级{RESULT}了`); // :1192
  } // :1193

  return 0; // :1195



  // [SKIPSTART] ～ [SKIPEND]（预处理指令，块内不装载） // :1199
  // SKIP ;ダンジョン内でのイベント奴隷用 // :1200
  // SKIP ;-------------------------------------- // :1201
  // SKIP @DUNGEON_BITCH // :1202
  // SKIP ;-------------------------------------- // :1203
  // SKIP TARGET = A // :1204
  // SKIP SIF BASE:0 < 300 // :1205
  // SKIP 	RETURN 0 // :1206
  // SKIP SIF BASE:1 < 100 // :1207
  // SKIP 	RETURN 0 // :1208
  // SKIP  // :1209
  // SKIP IF CFLAG:500 != 1 // :1210
  // SKIP 	;売春以外 // :1211
  // SKIP ELSEIF CFLAG:42 == 79 && (CFLAG:40 & 64) && FLAG:37 // :1212
  // SKIP 	;貞操帯 // :1213
  // SKIP 	CALL DUNGEON_ANAL // :1214
  // SKIP ELSEIF TALENT:273 // :1215
  // SKIP 	;貞操封印 // :1216
  // SKIP 	CALL DUNGEON_ANAL // :1217
  // SKIP ELSEIF ABL:TARGET:2 >= ABL:TARGET:3 // :1218
  // SKIP 	;V感覚>=A感覚 // :1219
  // SKIP 	CALL DUNGEON_SEX // :1220
  // SKIP ELSEIF ABL:TARGET:3 > 3 // :1221
  // SKIP 	;A感覚3超 // :1222
  // SKIP 	CALL DUNGEON_ANAL // :1223
  // SKIP ENDIF // :1224
  // SKIP  // :1225
  // SKIP N = 0 // :1226
  // SKIP IF CFLAG:500 == 1 && ABL:TARGET:33 >= 1 // :1227
  // SKIP 	CALL DUNGEON_LES // :1228
  // SKIP 	N = RESULT // :1229
  // SKIP ENDIF // :1230
  // SKIP  // :1231
  // SKIP SIF ABL:TARGET:31 >= 1 // :1232
  // SKIP 	CALL DUNGEON_SELF // :1233
  // SKIP  // :1234
  // SKIP  // :1235
  // SKIP SIF ABL:TARGET:39 >= 1 // :1236
  // SKIP 	CALL DUNGEON_ANIMAL // :1237
  // SKIP A = TARGET // :1238
  // SKIP  // :1239
  // SKIP ;ついでに内職 // :1240
  // SKIP SIF CFLAG:A:500 == 0 && CFLAG:A:1 == 3 // :1241
  // SKIP 	CALL DUNGEON_WORK // :1242
  // SKIP  // :1243
  // SKIP RETURN 0 // :1244
  // SKIP  // :1245
  // SKIP ;ダンジョン外で勇者が売春する用 // :1246
  // SKIP ;-------------------------------------- // :1247
  // SKIP @HEROINE_BITCH // :1248
  // SKIP ;-------------------------------------- // :1249
  // SKIP ;TARGET = A // :1250
  // SKIP ;体力の判定 // :1251
  // SKIP SIF BASE:0 < 300 // :1252
  // SKIP 	RETURN 0 // :1253
  // SKIP SIF BASE:1 < 100 // :1254
  // SKIP 	RETURN 0 // :1255
  // SKIP  // :1256
  // SKIP ;まさかの時の兽奸ショー // :1257
  // SKIP CALL HEROINE_ANIMAL_SHOW // :1258
  // SKIP SIF RESULT == 1 // :1259
  // SKIP 	RETURN 0 // :1260
  // SKIP  // :1261
  // SKIP IF RAND:3 == 0 // :1262
  // SKIP 	;やりやすいオーラル売春 // :1263
  // SKIP 	CALL HEROINE_BICH_ORAL	 // :1264
  // SKIP ELSEIF TALENT:0 || TALENT:273 // :1265
  // SKIP 	;处女・貞操封印 // :1266
  // SKIP 	CALL HEROINE_BICH_ANAL // :1267
  // SKIP ELSEIF CFLAG:42 == 79 && (CFLAG:40 & 64) // :1268
  // SKIP 	;貞操帯 // :1269
  // SKIP 	CALL HEROINE_BICH_ANAL // :1270
  // SKIP ELSEIF ABL:TARGET:2 >= ABL:TARGET:3 // :1271
  // SKIP 	CALL HEROINE_BICH_SEX // :1272
  // SKIP ELSEIF ABL:TARGET:3 > 3 // :1273
  // SKIP 	CALL HEROINE_BICH_ANAL // :1274
  // SKIP ELSEIF RAND:3 == 0 // :1275
  // SKIP 	CALL HEROINE_BICH_SEX // :1276
  // SKIP ELSEIF RAND:2 == 0 // :1277
  // SKIP 	CALL HEROINE_BICH_ANAL // :1278
  // SKIP ELSE // :1279
  // SKIP 	CALL HEROINE_BICH_ORAL // :1280
  // SKIP ENDIF // :1281
  // SKIP RETURN 0 // :1282
  // SKIP  // :1283
  // SKIP  // :1284
  // SKIP ;------------------------------- // :1285
  // SKIP @DUNGEON_SEX // :1286
  // SKIP #DIM PLAY // :1287
  // SKIP #DIM PAY // :1288
  // SKIP #DIM MEN // :1289
  // SKIP ;------------------------------- // :1290
  // SKIP ;ダンジョン売春 // :1291
  // SKIP  // :1292
  // SKIP ;調教対象が空だとダメ // :1293
  // SKIP SIF TARGET < 0 // :1294
  // SKIP 	RETURN 0 // :1295
  // SKIP ;处女だと男人ダメ // :1296
  // SKIP SIF TALENT:0 || TALENT:122 == 1 // :1297
  // SKIP 	RETURN 0 // :1298
  // SKIP ;貞操帯だとダメ // :1299
  // SKIP SIF CFLAG:42 == 79 && (CFLAG:40 & 64) // :1300
  // SKIP 	RETURN 0 // :1301
  // SKIP ;貞操封印だとダメ // :1302
  // SKIP SIF TALENT:273 // :1303
  // SKIP 	RETURN 0 // :1304
  // SKIP ;瀕死だとダメ // :1305
  // SKIP SIF BASE:0 < 500 // :1306
  // SKIP 	RETURN 0 // :1307
  // SKIP  // :1308
  // SKIP ;性交回数 // :1309
  // SKIP PLAY = 0 // :1310
  // SKIP ;代金 // :1311
  // SKIP PAY = 0 // :1312
  // SKIP ;客 // :1313
  // SKIP MEN = RAND:5 // :1314
  // SKIP  // :1315
  // SKIP ;妓女のドレスボーナス // :1316
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :1317
  // SKIP 	PLAY += 1 // :1318
  // SKIP  // :1319
  // SKIP ;V感覚 // :1320
  // SKIP IF ABL:2 == 4 // :1321
  // SKIP 	PLAY += 1 // :1322
  // SKIP ELSEIF ABL:2 == 5 // :1323
  // SKIP 	PLAY += 2 // :1324
  // SKIP ELSEIF ABL:2 >= 6 // :1325
  // SKIP 	PLAY += 3 // :1326
  // SKIP ENDIF // :1327
  // SKIP  // :1328
  // SKIP ;性交中毒によるボーナス // :1329
  // SKIP SIF ABL:30 // :1330
  // SKIP 	PLAY += ABL:30 / 2 + 1 // :1331
  // SKIP  // :1332
  // SKIP ;回数が0以下なら終了 // :1333
  // SKIP ;SIF PLAY <= 0 // :1334
  // SKIP ;	RETURN 0 // :1335
  // SKIP  // :1336
  // SKIP ;欲望ＬＶ５以上侍奉精神５以上で+1 // :1337
  // SKIP SIF ABL:11 >= 5 && ABL:16 >= 5 // :1338
  // SKIP 	PLAY += 2 // :1339
  // SKIP ;欲望ＬＶ４以上侍奉精神４以上で+1 // :1340
  // SKIP SIF ABL:11 == 4 && ABL:16 >= 4 // :1341
  // SKIP 	PLAY += 1 // :1342
  // SKIP  // :1343
  // SKIP ;欲望ＬＶ７以上私处感觉ＬＶ６以上で+1（下と合わせて+2） // :1344
  // SKIP SIF ABL:11 >= 7 && ABL:5 >= 6 // :1345
  // SKIP 	PLAY += 1 // :1346
  // SKIP ;欲望ＬＶ４以上私处感觉ＬＶ３以上で+1 // :1347
  // SKIP SIF ABL:11 >= 4 && ABL:2 >= 3 // :1348
  // SKIP 	PLAY += 1 // :1349
  // SKIP  // :1350
  // SKIP ;爱、淫乱によるボーナス // :1351
  // SKIP SIF TALENT:85 // :1352
  // SKIP 	PLAY += 1 // :1353
  // SKIP SIF TALENT:76 // :1354
  // SKIP 	PLAY += 1 // :1355
  // SKIP  // :1356
  // SKIP ;性爱狂によるボーナス // :1357
  // SKIP SIF TALENT:75 // :1358
  // SKIP 	PLAY += 2 // :1359
  // SKIP  // :1360
  // SKIP ;接受快感、否定快感 // :1361
  // SKIP IF TALENT:70 // :1362
  // SKIP 	PLAY += 1 // :1363
  // SKIP ELSEIF TALENT:71 // :1364
  // SKIP 	PLAY -= 2 // :1365
  // SKIP ENDIF // :1366
  // SKIP  // :1367
  // SKIP ;看轻贞操、看重贞操 // :1368
  // SKIP IF TALENT:31 // :1369
  // SKIP 	PLAY += 1 // :1370
  // SKIP ELSEIF TALENT:30 // :1371
  // SKIP 	PLAY -= 2 // :1372
  // SKIP ENDIF // :1373
  // SKIP  // :1374
  // SKIP ;卖淫中毒によるボーナス // :1375
  // SKIP SIF ABL:37 > 0 // :1376
  // SKIP 	PLAY += ABL:37 // :1377
  // SKIP  // :1378
  // SKIP ;妓女によるボーナス // :1379
  // SKIP SIF TALENT:180 // :1380
  // SKIP 	PLAY += 1 // :1381
  // SKIP  // :1382
  // SKIP ;倾城によるボーナス // :1383
  // SKIP SIF TALENT:181 // :1384
  // SKIP 	PLAY += 2 // :1385
  // SKIP  // :1386
  // SKIP ;肉便器によるボーナス // :1387
  // SKIP SIF TALENT:204 // :1388
  // SKIP 	PLAY += 1 // :1389
  // SKIP  // :1390
  // SKIP IF TALENT:315 == 5 // :1391
  // SKIP 	;元妓女の場合ボーナス // :1392
  // SKIP 	PLAY += 2 // :1393
  // SKIP ELSEIF TALENT:315 == 7 // :1394
  // SKIP 	;元物乞いの場合ボーナス // :1395
  // SKIP 	PLAY += 1 // :1396
  // SKIP ELSEIF TALENT:315 == 2 // :1397
  // SKIP 	;元修道女 // :1398
  // SKIP 	PLAY -= 1 // :1399
  // SKIP ELSEIF TALENT:315 == 8 // :1400
  // SKIP 	;元貴族 // :1401
  // SKIP 	PLAY -= 1 // :1402
  // SKIP ELSEIF TALENT:315 == 12 // :1403
  // SKIP 	;元聖女 // :1404
  // SKIP 	PLAY -= 1 // :1405
  // SKIP ENDIF // :1406
  // SKIP  // :1407
  // SKIP ;善恶值による積極性 // :1408
  // SKIP IF CFLAG:151 > 150 // :1409
  // SKIP 	PLAY -= 3 // :1410
  // SKIP ELSEIF CFLAG:151 > 100 // :1411
  // SKIP 	PLAY -= 2 // :1412
  // SKIP ELSEIF CFLAG:151 > 50 // :1413
  // SKIP 	PLAY -= 1 // :1414
  // SKIP ELSEIF CFLAG:151 > 0 // :1415
  // SKIP 	;変動无 // :1416
  // SKIP ELSEIF CFLAG:151 > -50 // :1417
  // SKIP 	PLAY += 1 // :1418
  // SKIP ELSEIF CFLAG:151 > -100 // :1419
  // SKIP 	PLAY += 2 // :1420
  // SKIP ELSEIF CFLAG:151 > -150 // :1421
  // SKIP 	PLAY += 3 // :1422
  // SKIP ELSE // :1423
  // SKIP 	PLAY += 4 // :1424
  // SKIP ENDIF // :1425
  // SKIP  // :1426
  // SKIP ;回数が0以下になっていたら終了 // :1427
  // SKIP SIF PLAY <= 0 // :1428
  // SKIP 	RETURN 0 // :1429
  // SKIP  // :1430
  // SKIP DRAWLINE // :1431
  // SKIP PRINTFORM %SAVESTR:TARGET% // :1432
  // SKIP ;卖淫中毒か淫乱 // :1433
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :1434
  // SKIP 	PRINTFORM 无法压抑性欲，向 // :1435
  // SKIP ELSE // :1436
  // SKIP 	PRINTFORM 遵从命令，向 // :1437
  // SKIP ENDIF // :1438
  // SKIP IF MEN == 0 // :1439
  // SKIP 	PRINT 兽人 // :1440
  // SKIP ELSEIF MEN == 1 // :1441
  // SKIP 	PRINT 魔族男人 // :1442
  // SKIP ELSEIF MEN == 2 // :1443
  // SKIP 	PRINT 魔族少年 // :1444
  // SKIP 	;収入減 // :1445
  // SKIP 	PAY -= 10 // :1446
  // SKIP ELSEIF MEN == 3 // :1447
  // SKIP 	PRINT 魔族暴发户 // :1448
  // SKIP 	;収入ボーナス // :1449
  // SKIP 	PAY += 20 // :1450
  // SKIP ELSE // :1451
  // SKIP 	PRINT 妖精商人 // :1452
  // SKIP ENDIF // :1453
  // SKIP PRINTFORML 卖身了， // :1454
  // SKIP PRINTFORMW 在冰冷的床上，卖了{PLAY}次… // :1455
  // SKIP  // :1456
  // SKIP CALL DUNGEON_SEX_LOG, MEN // :1457
  // SKIP  // :1458
  // SKIP PRINTFORML %EXPNAME:0%＋{PLAY} // :1459
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :1460
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :1461
  // SKIP PRINTFORML %PALAMNAME:1%点数＋{PLAY*200} // :1462
  // SKIP PRINTFORMW %PALAMNAME:5%点数＋{PLAY*250} // :1463
  // SKIP EXP:0 += PLAY // :1464
  // SKIP EXP:5 += PLAY // :1465
  // SKIP EXP:74 += PLAY // :1466
  // SKIP JUEL:1 += PLAY*200 // :1467
  // SKIP JUEL:5 += PLAY*250 // :1468
  // SKIP PRINTFORML %SAVESTR:TARGET%的放荡行为成为了魔王和奴隶们的力量(经验值+{PLAY}) // :1469
  // SKIP EXP:0:80 += PLAY // :1470
  // SKIP EXP:TARGET:80 += PLAY // :1471
  // SKIP PAY += PLAY * 50 // :1472
  // SKIP SIF PAY <= 0 // :1473
  // SKIP 	PAY = 1 // :1474
  // SKIP PRINTFORMW 获得了%SAVESTR:TARGET%卖身的{PAY}点。 // :1475
  // SKIP MONEY += PAY // :1476
  // SKIP FALG:4444 += PAY // :1477
  // SKIP PRINTW (善恶值减少:-1) // :1478
  // SKIP CALL KARMA, TARGET, -1 // :1479
  // SKIP RETURN 1 // :1480
  // SKIP  // :1481
  // SKIP ;-------------------------------- // :1482
  // SKIP @DUNGEON_ANAL // :1483
  // SKIP #DIM PLAY // :1484
  // SKIP #DIM PAY // :1485
  // SKIP #DIM MEN // :1486
  // SKIP ;-------------------------------- // :1487
  // SKIP ;ダンジョンアナル // :1488
  // SKIP ;調教対象が空だとダメ // :1489
  // SKIP SIF TARGET < 0 // :1490
  // SKIP 	RETURN 0 // :1491
  // SKIP ;瀕死だとダメ // :1492
  // SKIP SIF BASE:0 < 500 // :1493
  // SKIP 	RETURN 0 // :1494
  // SKIP  // :1495
  // SKIP ;性交回数 // :1496
  // SKIP PLAY = 0 // :1497
  // SKIP ;代金 // :1498
  // SKIP PAY = 0 // :1499
  // SKIP ;客 // :1500
  // SKIP MEN = RAND:5 // :1501
  // SKIP  // :1502
  // SKIP ;妓女のドレスボーナス // :1503
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :1504
  // SKIP 	PLAY += 1 // :1505
  // SKIP  // :1506
  // SKIP ;肛门感觉 // :1507
  // SKIP IF ABL:3 == 4 // :1508
  // SKIP 	PLAY += 1 // :1509
  // SKIP ELSEIF ABL:3 == 5 // :1510
  // SKIP 	PLAY += 2 // :1511
  // SKIP ELSEIF ABL:3 >= 6 // :1512
  // SKIP 	PLAY += 3 // :1513
  // SKIP ENDIF // :1514
  // SKIP  // :1515
  // SKIP ;性交中毒によるボーナス // :1516
  // SKIP SIF ABL:30 // :1517
  // SKIP 	PLAY += ABL:30 / 2 + 1 // :1518
  // SKIP  // :1519
  // SKIP ;回数が0以下なら終了 // :1520
  // SKIP ;SIF PLAY <= 0 // :1521
  // SKIP ;	RETURN 0 // :1522
  // SKIP  // :1523
  // SKIP ;欲望ＬＶ５以上侍奉精神５以上で+1 // :1524
  // SKIP SIF ABL:11 >= 5 && ABL:16 >= 5 // :1525
  // SKIP 	PLAY += 2 // :1526
  // SKIP ;欲望ＬＶ４以上侍奉精神４以上で+1 // :1527
  // SKIP SIF ABL:11 == 4 && ABL:16 >= 4 // :1528
  // SKIP 	PLAY += 1 // :1529
  // SKIP  // :1530
  // SKIP ;欲望ＬＶ７以上私处感觉ＬＶ６以上で+1（下と合わせて+2） // :1531
  // SKIP SIF ABL:11 >= 7 && ABL:5 >= 6 // :1532
  // SKIP 	PLAY += 1 // :1533
  // SKIP ;欲望ＬＶ４以上私处感觉ＬＶ３以上で+1 // :1534
  // SKIP SIF ABL:11 >= 4 && ABL:2 >= 3 // :1535
  // SKIP 	PLAY += 1 // :1536
  // SKIP  // :1537
  // SKIP ;爱、淫乱によるボーナス // :1538
  // SKIP SIF TALENT:85 // :1539
  // SKIP 	PLAY += 1 // :1540
  // SKIP SIF TALENT:76 // :1541
  // SKIP 	PLAY += 1 // :1542
  // SKIP  // :1543
  // SKIP ;尻穴狂によるボーナス // :1544
  // SKIP SIF TALENT:75 // :1545
  // SKIP 	PLAY += 2 // :1546
  // SKIP  // :1547
  // SKIP ;接受快感、否定快感 // :1548
  // SKIP IF TALENT:70 // :1549
  // SKIP 	PLAY += 1 // :1550
  // SKIP ELSEIF TALENT:71 // :1551
  // SKIP 	PLAY -= 2 // :1552
  // SKIP ENDIF // :1553
  // SKIP  // :1554
  // SKIP ;看轻贞操、看重贞操 // :1555
  // SKIP IF TALENT:31 // :1556
  // SKIP 	PLAY += 1 // :1557
  // SKIP ELSEIF TALENT:30 // :1558
  // SKIP 	PLAY -= 2 // :1559
  // SKIP ENDIF // :1560
  // SKIP  // :1561
  // SKIP ;卖淫中毒によるボーナス // :1562
  // SKIP SIF ABL:37 > 0 // :1563
  // SKIP 	PLAY += ABL:37 // :1564
  // SKIP  // :1565
  // SKIP ;妓女によるボーナス // :1566
  // SKIP SIF TALENT:180 // :1567
  // SKIP 	PLAY += 1 // :1568
  // SKIP  // :1569
  // SKIP ;倾城によるボーナス // :1570
  // SKIP SIF TALENT:181 // :1571
  // SKIP 	PLAY += 2 // :1572
  // SKIP  // :1573
  // SKIP ;肉便器によるボーナス // :1574
  // SKIP SIF TALENT:204 // :1575
  // SKIP 	PLAY += 1 // :1576
  // SKIP  // :1577
  // SKIP IF TALENT:315 == 5 // :1578
  // SKIP 	;元妓女の場合ボーナス // :1579
  // SKIP 	PLAY += 2 // :1580
  // SKIP ELSEIF TALENT:315 == 7 // :1581
  // SKIP 	;元物乞いの場合ボーナス // :1582
  // SKIP 	PLAY += 1 // :1583
  // SKIP ENDIF // :1584
  // SKIP  // :1585
  // SKIP ;善恶值による積極性 // :1586
  // SKIP IF CFLAG:151 > 150 // :1587
  // SKIP 	PLAY -= 3 // :1588
  // SKIP ELSEIF CFLAG:151 > 100 // :1589
  // SKIP 	PLAY -= 2 // :1590
  // SKIP ELSEIF CFLAG:151 > 50 // :1591
  // SKIP 	PLAY -= 1 // :1592
  // SKIP ELSEIF CFLAG:151 > 0 // :1593
  // SKIP 	;変動无 // :1594
  // SKIP ELSEIF CFLAG:151 > -50 // :1595
  // SKIP 	PLAY += 1 // :1596
  // SKIP ELSEIF CFLAG:151 > -100 // :1597
  // SKIP 	PLAY += 2 // :1598
  // SKIP ELSEIF CFLAG:151 > -150 // :1599
  // SKIP 	PLAY += 3 // :1600
  // SKIP ELSE // :1601
  // SKIP 	PLAY += 4 // :1602
  // SKIP ENDIF // :1603
  // SKIP  // :1604
  // SKIP ;回数が0以下になっていたら終了 // :1605
  // SKIP SIF PLAY <= 0 // :1606
  // SKIP 	RETURN 0 // :1607
  // SKIP  // :1608
  // SKIP DRAWLINE // :1609
  // SKIP PRINTFORM %SAVESTR:TARGET% // :1610
  // SKIP ;卖淫中毒か淫乱 // :1611
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :1612
  // SKIP 	PRINTFORM 无法压抑性欲，向 // :1613
  // SKIP ELSE // :1614
  // SKIP 	PRINTFORM 遵从命令，向 // :1615
  // SKIP ENDIF // :1616
  // SKIP IF MEN == 0 // :1617
  // SKIP 	PRINT 兽人 // :1618
  // SKIP ELSEIF MEN == 1 // :1619
  // SKIP 	PRINT 魔族男人 // :1620
  // SKIP ELSEIF MEN == 2 // :1621
  // SKIP 	PRINT 魔族少年 // :1622
  // SKIP 	;収入減 // :1623
  // SKIP 	PAY -= 10 // :1624
  // SKIP ELSEIF MEN == 3 // :1625
  // SKIP 	PRINT 魔族暴发户 // :1626
  // SKIP 	;収入ボーナス // :1627
  // SKIP 	PAY += 20 // :1628
  // SKIP ELSE // :1629
  // SKIP 	PRINT 妖精商人 // :1630
  // SKIP ENDIF // :1631
  // SKIP PRINTFORML 卖菊了， // :1632
  // SKIP PRINTFORMW 在冰冷的床上，卖了{PLAY}次… // :1633
  // SKIP  // :1634
  // SKIP CALL DUNGEON_ANAL_LOG, MEN // :1635
  // SKIP  // :1636
  // SKIP PRINTFORML %EXPNAME:1%＋{PLAY} // :1637
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :1638
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :1639
  // SKIP PRINTFORML %PALAMNAME:2%点数＋{PLAY*200} // :1640
  // SKIP PRINTFORMW %PALAMNAME:5%点数＋{PLAY*250} // :1641
  // SKIP EXP:1 += PLAY // :1642
  // SKIP EXP:5 += PLAY // :1643
  // SKIP EXP:74 += PLAY // :1644
  // SKIP JUEL:2 += PLAY*200 // :1645
  // SKIP JUEL:5 += PLAY*250 // :1646
  // SKIP  // :1647
  // SKIP PRINTFORML %SAVESTR:TARGET%的放荡行为成为了魔王和奴隶们的力量(经验值+{PLAY}) // :1648
  // SKIP EXP:0:80 += PLAY // :1649
  // SKIP EXP:TARGET:80 += PLAY // :1650
  // SKIP  // :1651
  // SKIP PAY += PLAY * 50 // :1652
  // SKIP SIF PAY <= 0 // :1653
  // SKIP 	PAY = 1 // :1654
  // SKIP PRINTFORMW 获得了%SAVESTR:TARGET%卖身的{PAY}点。 // :1655
  // SKIP MONEY += PAY // :1656
  // SKIP EX_FLAG:4444 += PAY // :1657
  // SKIP PRINTW (善恶值减少:-2) // :1658
  // SKIP CALL KARMA, TARGET, -2 // :1659
  // SKIP  // :1660
  // SKIP RETURN 1 // :1661
  // SKIP  // :1662
  // SKIP  // :1663
  // SKIP  // :1664
  // SKIP  // :1665
  // SKIP ;-------------------------------- // :1666
  // SKIP @DUNGEON_LES // :1667
  // SKIP #DIM PLAY // :1668
  // SKIP #DIM PAY // :1669
  // SKIP #DIM GIRL // :1670
  // SKIP ;-------------------------------- // :1671
  // SKIP ;ダンジョンレズ // :1672
  // SKIP ;調教対象が空だとダメ // :1673
  // SKIP SIF TARGET < 0 // :1674
  // SKIP 	RETURN 0 // :1675
  // SKIP ;百合气质2以上、C感覚3以上、欲望2以上、技巧2以上が必要 // :1676
  // SKIP SIF ABL:22 < 2 || ABL:0 < 3 || ABL:10 < 2 || ABL:11 < 2 // :1677
  // SKIP 	RETURN 0 // :1678
  // SKIP ;調教キャラに百合中毒必要 // :1679
  // SKIP SIF ABL:33 == 0 // :1680
  // SKIP 	RETURN 0 // :1681
  // SKIP ;瀕死だとダメ // :1682
  // SKIP SIF BASE:0 < 500 // :1683
  // SKIP 	RETURN 0 // :1684
  // SKIP  // :1685
  // SKIP ;レズプレイ回数 // :1686
  // SKIP PLAY = 0 // :1687
  // SKIP ;代金 // :1688
  // SKIP PAY = 0 // :1689
  // SKIP ;客 // :1690
  // SKIP GIRL = RAND:5 // :1691
  // SKIP  // :1692
  // SKIP ;妓女のドレスボーナス // :1693
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :1694
  // SKIP 	PLAY += 1 // :1695
  // SKIP  // :1696
  // SKIP  // :1697
  // SKIP ;百合中毒 // :1698
  // SKIP IF ABL:33 == 1 // :1699
  // SKIP 	PLAY += 1 // :1700
  // SKIP ELSEIF ABL:33 == 2 // :1701
  // SKIP 	PLAY += 2 // :1702
  // SKIP ELSEIF ABL:33 == 3 // :1703
  // SKIP 	PLAY += 3 // :1704
  // SKIP ELSEIF ABL:33 == 4 // :1705
  // SKIP 	PLAY += 5 // :1706
  // SKIP ELSEIF ABL:33 == 5 // :1707
  // SKIP 	PLAY += 7 // :1708
  // SKIP ELSEIF ABL:33 >= 6 // :1709
  // SKIP 	PLAY += 9 // :1710
  // SKIP ENDIF // :1711
  // SKIP  // :1712
  // SKIP  // :1713
  // SKIP ;回数が0以下なら終了 // :1714
  // SKIP SIF PLAY <= 0 // :1715
  // SKIP 	RETURN 0 // :1716
  // SKIP  // :1717
  // SKIP ;百合气质によるボーナス // :1718
  // SKIP SIF ABL:22 >= 5 // :1719
  // SKIP 	PLAY += 1 // :1720
  // SKIP  // :1721
  // SKIP ;欲望ＬＶ７以上で+1（下と合わせて+2） // :1722
  // SKIP SIF ABL:11 >= 7 && ABL:5 >= 6 // :1723
  // SKIP 	PLAY += 1 // :1724
  // SKIP ;欲望ＬＶ４以上で+1 // :1725
  // SKIP SIF ABL:11 >= 4 && ABL:2 >= 3 // :1726
  // SKIP 	PLAY += 1 // :1727
  // SKIP  // :1728
  // SKIP  // :1729
  // SKIP ;保守的、戒备森严によるペナルティ // :1730
  // SKIP SIF TALENT:24 // :1731
  // SKIP 	PLAY -= 1 // :1732
  // SKIP SIF TALENT:27 // :1733
  // SKIP 	PLAY -= 1 // :1734
  // SKIP  // :1735
  // SKIP  // :1736
  // SKIP ;双性恋、淫乱によるボーナス // :1737
  // SKIP SIF TALENT:81 // :1738
  // SKIP 	PLAY += 2 // :1739
  // SKIP SIF TALENT:76 // :1740
  // SKIP 	PLAY += 1 // :1741
  // SKIP  // :1742
  // SKIP ;接受快感、否定快感 // :1743
  // SKIP IF TALENT:70 // :1744
  // SKIP 	PLAY += 1 // :1745
  // SKIP ELSEIF TALENT:71 // :1746
  // SKIP 	PLAY -= 2 // :1747
  // SKIP ENDIF // :1748
  // SKIP  // :1749
  // SKIP ;卖淫中毒によるボーナス // :1750
  // SKIP SIF ABL:37 > 0 // :1751
  // SKIP 	PLAY += ABL:37 // :1752
  // SKIP  // :1753
  // SKIP ;妓女によるボーナス // :1754
  // SKIP SIF TALENT:180 // :1755
  // SKIP 	PLAY += 1 // :1756
  // SKIP  // :1757
  // SKIP ;倾城によるボーナス // :1758
  // SKIP SIF TALENT:181 // :1759
  // SKIP 	PLAY += 2 // :1760
  // SKIP  // :1761
  // SKIP ;肉便器によるボーナス // :1762
  // SKIP SIF TALENT:204 // :1763
  // SKIP 	PLAY += 1 // :1764
  // SKIP  // :1765
  // SKIP IF TALENT:315 == 5 // :1766
  // SKIP 	;元妓女の場合ボーナス // :1767
  // SKIP 	PLAY += 2 // :1768
  // SKIP ELSEIF TALENT:315 == 7 // :1769
  // SKIP 	;元物乞いの場合ボーナス // :1770
  // SKIP 	PLAY += 1 // :1771
  // SKIP ENDIF // :1772
  // SKIP  // :1773
  // SKIP ;善恶值による積極性 // :1774
  // SKIP IF CFLAG:151 > 150 // :1775
  // SKIP 	PLAY -= 3 // :1776
  // SKIP ELSEIF CFLAG:151 > 100 // :1777
  // SKIP 	PLAY -= 2 // :1778
  // SKIP ELSEIF CFLAG:151 > 50 // :1779
  // SKIP 	PLAY -= 1 // :1780
  // SKIP ELSEIF CFLAG:151 > 0 // :1781
  // SKIP 	;変動无 // :1782
  // SKIP ELSEIF CFLAG:151 > -50 // :1783
  // SKIP 	PLAY += 1 // :1784
  // SKIP ELSEIF CFLAG:151 > -100 // :1785
  // SKIP 	PLAY += 2 // :1786
  // SKIP ELSEIF CFLAG:151 > -150 // :1787
  // SKIP 	PLAY += 3 // :1788
  // SKIP ELSE // :1789
  // SKIP 	PLAY += 4 // :1790
  // SKIP ENDIF // :1791
  // SKIP  // :1792
  // SKIP ;回数が0以下になっていたら終了 // :1793
  // SKIP SIF PLAY <= 0 // :1794
  // SKIP 	RETURN 0 // :1795
  // SKIP  // :1796
  // SKIP PRINTFORMW %SAVESTR:TARGET% // :1797
  // SKIP ;卖淫中毒か淫乱 // :1798
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :1799
  // SKIP 	PRINTFORM 渴望女人，向 // :1800
  // SKIP ELSE // :1801
  // SKIP 	PRINTFORM 遵从命令，向 // :1802
  // SKIP ENDIF // :1803
  // SKIP  // :1804
  // SKIP IF GIRL == 0 // :1805
  // SKIP 	PRINT 淫魔 // :1806
  // SKIP ELSEIF GIRL == 1 // :1807
  // SKIP 	PRINT 魔族女人 // :1808
  // SKIP ELSEIF GIRL == 2 // :1809
  // SKIP 	PRINT 妖精的女乞丐 // :1810
  // SKIP 	;収入減 // :1811
  // SKIP 	PAY -= 10 // :1812
  // SKIP ELSEIF GIRL == 3 // :1813
  // SKIP 	PRINT 魔族的贵妇人 // :1814
  // SKIP 	;収入ボーナス // :1815
  // SKIP 	PAY += 20 // :1816
  // SKIP ELSE // :1817
  // SKIP 	PRINT 魔族的女祭司 // :1818
  // SKIP ENDIF // :1819
  // SKIP  // :1820
  // SKIP PRINTFORML 卖身了， // :1821
  // SKIP PRINTFORMW 貌似百合了{PLAY}次。 // :1822
  // SKIP  // :1823
  // SKIP CALL DUNGEON_LES_LOG, GIRL // :1824
  // SKIP  // :1825
  // SKIP PRINTFORML %EXPNAME:40%＋{PLAY} // :1826
  // SKIP SIF N*100*ABL:10/500 > 0 // :1827
  // SKIP 	PRINTFORML %EXPNAME:2%＋{PLAY*100*ABL:10/500} // :1828
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :1829
  // SKIP PRINTFORML %PALAMNAME:0%点数＋{PLAY*100*ABL:10} // :1830
  // SKIP PRINTFORML %PALAMNAME:5%点数＋{PLAY*200} // :1831
  // SKIP  // :1832
  // SKIP EXP:40 += PLAY // :1833
  // SKIP EXP:2 += PLAY*100*ABL:10/500 // :1834
  // SKIP EXP:74 += PLAY // :1835
  // SKIP JUEL:0 += PLAY*100*ABL:10 // :1836
  // SKIP JUEL:5 += PLAY*200 // :1837
  // SKIP  // :1838
  // SKIP PRINTFORML %SAVESTR:TARGET%的放荡行为成为了魔王和奴隶们的力量(经验值+{PLAY}) // :1839
  // SKIP EXP:0:80 += PLAY // :1840
  // SKIP EXP:TARGET:80 += PLAY // :1841
  // SKIP  // :1842
  // SKIP PAY += PLAY * 50 // :1843
  // SKIP SIF PAY <= 0 // :1844
  // SKIP 	PAY = 1 // :1845
  // SKIP PRINTFORMW 获得了%SAVESTR:TARGET%卖身的{PAY}点。 // :1846
  // SKIP MONEY += PAY // :1847
  // SKIP FALG:4444 += PAY // :1848
  // SKIP RETURN 1 // :1849
  // SKIP  // :1850
  // SKIP ;------------------------------------- // :1851
  // SKIP @DUNGEON_SELF // :1852
  // SKIP #DIM PLAY // :1853
  // SKIP ;------------------------------------- // :1854
  // SKIP ;ダンジョンでの自慰 // :1855
  // SKIP ;調教対象が空だとダメ // :1856
  // SKIP SIF TARGET < 0 // :1857
  // SKIP 	RETURN 0 // :1858
  // SKIP ;阴蒂感觉が3以上、欲望が2以上ないとダメ // :1859
  // SKIP SIF ABL:0 < 3 || ABL:11 < 2 // :1860
  // SKIP 	RETURN 0 // :1861
  // SKIP ;从不自慰があるとダメ // :1862
  // SKIP SIF TALENT:150 // :1863
  // SKIP 	RETURN 0 // :1864
  // SKIP ;瀕死だとダメ // :1865
  // SKIP SIF BASE:0 < 500 // :1866
  // SKIP 	RETURN 0 // :1867
  // SKIP  // :1868
  // SKIP PLAY = 0 // :1869
  // SKIP  // :1870
  // SKIP ;自慰中毒 // :1871
  // SKIP IF ABL:31 == 1 // :1872
  // SKIP 	PLAY += 1 // :1873
  // SKIP ELSEIF ABL:31 == 2 // :1874
  // SKIP 	PLAY += 2 // :1875
  // SKIP ELSEIF ABL:31 == 3 // :1876
  // SKIP 	PLAY += 4 // :1877
  // SKIP ELSEIF ABL:31 == 4 // :1878
  // SKIP 	PLAY += 6 // :1879
  // SKIP ELSEIF ABL:31 == 5 // :1880
  // SKIP 	PLAY += 9 // :1881
  // SKIP ELSEIF ABL:31 >= 6 // :1882
  // SKIP 	PLAY += 14 // :1883
  // SKIP ENDIF // :1884
  // SKIP  // :1885
  // SKIP ;容易自慰で欲望ＬＶ３以上 // :1886
  // SKIP SIF TALENT:60 && ABL:11 >= 3 // :1887
  // SKIP 	PLAY += 1 // :1888
  // SKIP  // :1889
  // SKIP ;欲望ＬＶ５以上露出癖４以上で+1（下と合わせて+2） // :1890
  // SKIP SIF ABL:11 >= 5 && ABL:17 >= 4 // :1891
  // SKIP 	PLAY += 1 // :1892
  // SKIP ;欲望ＬＶ４以上露出癖３以上で+1（下と合わせて+2） // :1893
  // SKIP SIF ABL:11 >= 4 && ABL:17 >= 3 // :1894
  // SKIP 	PLAY += 1 // :1895
  // SKIP  // :1896
  // SKIP ;回数が0以下なら終了 // :1897
  // SKIP SIF PLAY <= 0 // :1898
  // SKIP 	RETURN 0 // :1899
  // SKIP  // :1900
  // SKIP ;自慰狂によるボーナス // :1901
  // SKIP SIF TALENT:74 // :1902
  // SKIP 	TIMES PLAY , 1.50 // :1903
  // SKIP  // :1904
  // SKIP ;低姿态、开放によるボーナス // :1905
  // SKIP SIF TALENT:17 // :1906
  // SKIP 	PLAY += 1 // :1907
  // SKIP SIF TALENT:33 // :1908
  // SKIP 	PLAY += 1 // :1909
  // SKIP  // :1910
  // SKIP ;高姿态、克制、压抑によるペナルティ // :1911
  // SKIP SIF TALENT:15 // :1912
  // SKIP 	PLAY -= 1 // :1913
  // SKIP SIF TALENT:20 // :1914
  // SKIP 	PLAY -= 1 // :1915
  // SKIP SIF TALENT:32 // :1916
  // SKIP 	PLAY -= 1 // :1917
  // SKIP  // :1918
  // SKIP ;接受快感、否定快感 // :1919
  // SKIP IF TALENT:70 // :1920
  // SKIP 	PLAY += 1 // :1921
  // SKIP ELSEIF TALENT:71 // :1922
  // SKIP 	PLAY -= 2 // :1923
  // SKIP ENDIF // :1924
  // SKIP  // :1925
  // SKIP ;淫乱によるボーナス // :1926
  // SKIP SIF TALENT:76 // :1927
  // SKIP 	PLAY += 1 // :1928
  // SKIP  // :1929
  // SKIP ;回数が0以下になっていたら終了 // :1930
  // SKIP SIF PLAY <= 0 // :1931
  // SKIP 	RETURN 0 // :1932
  // SKIP  // :1933
  // SKIP DRAWLINE // :1934
  // SKIP  // :1935
  // SKIP  // :1936
  // SKIP ;調教後オナニーの妄想の相手 // :1937
  // SKIP ;愛がなくかつレズっ気×20%でレズ // :1938
  // SKIP IF TALENT:85 == 0 && ABL:22 > RAND:5 // :1939
  // SKIP 	PRINTFORML 妄想着百合，自慰了{PLAY}次。 // :1940
  // SKIP ;上に該当せずかつ愛がなくアイテムに野良犬があれば、兽奸中毒×20%で野良犬 // :1941
  // SKIP ELSEIF TALENT:85 == 0 && ABL:39 > RAND:5 && ITEM:22 // :1942
  // SKIP 	PRINTFORML 妄想着与野兽交配，自慰了{PLAY}次。 // :1943
  // SKIP ;それ以外なら主人 // :1944
  // SKIP ELSE // :1945
  // SKIP 	PRINTFORML 想着%CALLNAME:MASTER%的事，自慰了{PLAY}次。 // :1946
  // SKIP ENDIF // :1947
  // SKIP  // :1948
  // SKIP  // :1949
  // SKIP ;自慰経験 // :1950
  // SKIP PRINTFORML %EXPNAME:10%＋{PLAY} // :1951
  // SKIP EXP:10 += PLAY // :1952
  // SKIP  // :1953
  // SKIP ;珠経験 // :1954
  // SKIP PRINTFORML %PALAMNAME:0%点数＋{PLAY*500} // :1955
  // SKIP PRINTFORML %PALAMNAME:4%点数＋{PLAY*100} // :1956
  // SKIP PRINTFORMW %PALAMNAME:5%点数＋{PLAY*250} // :1957
  // SKIP JUEL:0 += PLAY*500 // :1958
  // SKIP JUEL:4 += PLAY*100 // :1959
  // SKIP JUEL:5 += PLAY*250 // :1960
  // SKIP  // :1961
  // SKIP 	 // :1962
  // SKIP PRINTFORMW %SAVESTR:TARGET%的放荡行为成为了魔王和奴隶们的力量(经验值+{PLAY}) // :1963
  // SKIP EXP:0:80 += PLAY // :1964
  // SKIP EXP:TARGET:80 += PLAY // :1965
  // SKIP  // :1966
  // SKIP RETURN 1 // :1967
  // SKIP  // :1968
  // SKIP  // :1969
  // SKIP ;-------------------------------- // :1970
  // SKIP @DUNGEON_ANIMAL // :1971
  // SKIP #DIM PLAY // :1972
  // SKIP ;-------------------------------- // :1973
  // SKIP ;ダンジョン兽奸 // :1974
  // SKIP  // :1975
  // SKIP ;調教対象が空だとダメ // :1976
  // SKIP SIF TARGET < 0 // :1977
  // SKIP 	RETURN 0 // :1978
  // SKIP  // :1979
  // SKIP ;兽奸经验が50以上ないとダメ // :1980
  // SKIP SIF EXP:56 < 50 // :1981
  // SKIP 	RETURN 0 // :1982
  // SKIP  // :1983
  // SKIP ;处女や男人だとダメ // :1984
  // SKIP SIF TALENT:0 || TALENT:122 == 1 // :1985
  // SKIP 	RETURN 0 // :1986
  // SKIP  // :1987
  // SKIP ;貞操帯だとダメ // :1988
  // SKIP SIF CFLAG:42 == 79 && (CFLAG:40 & 64) // :1989
  // SKIP 	RETURN 0 // :1990
  // SKIP  // :1991
  // SKIP ;ITEM:野狗がないとダメ // :1992
  // SKIP SIF ITEM:22 == 0 // :1993
  // SKIP 	RETURN 0 // :1994
  // SKIP ;瀕死だとダメ // :1995
  // SKIP SIF BASE:0 < 500 // :1996
  // SKIP 	RETURN 0 // :1997
  // SKIP  // :1998
  // SKIP PLAY = 0 // :1999
  // SKIP  // :2000
  // SKIP ;兽奸中毒 // :2001
  // SKIP IF ABL:39 == 0 // :2002
  // SKIP 	PLAY -= 2 // :2003
  // SKIP ELSEIF ABL:39 == 1 // :2004
  // SKIP 	PLAY -= 1 // :2005
  // SKIP ELSEIF ABL:39 == 2 // :2006
  // SKIP 	PLAY += 0 // :2007
  // SKIP ELSEIF ABL:39 == 3 // :2008
  // SKIP 	PLAY += 1 // :2009
  // SKIP ELSEIF ABL:39 == 4 // :2010
  // SKIP 	PLAY += 2 // :2011
  // SKIP ELSEIF ABL:39 == 5 // :2012
  // SKIP 	PLAY += 3 // :2013
  // SKIP ELSEIF ABL:39 >= 6 // :2014
  // SKIP 	PLAY += 4 // :2015
  // SKIP ENDIF // :2016
  // SKIP  // :2017
  // SKIP ;动物耳朵で欲望ＬＶ３以上 // :2018
  // SKIP SIF TALENT:124 && ABL:11 >= 3 // :2019
  // SKIP 	PLAY += 1 // :2020
  // SKIP  // :2021
  // SKIP ;かわいい動物が好きで欲望ＬＶ４以上 // :2022
  // SKIP SIF  TALENT:317 == 12 && ABL:11 >= 4 // :2023
  // SKIP 	PLAY += 1 // :2024
  // SKIP  // :2025
  // SKIP ;欲望ＬＶ５以上露出癖４以上で+1（下と合わせて+2） // :2026
  // SKIP SIF ABL:11 >= 5 && ABL:17 >= 4 // :2027
  // SKIP 	PLAY += 1 // :2028
  // SKIP ;欲望ＬＶ４以上露出癖３以上で+1 // :2029
  // SKIP SIF ABL:11 >= 4 && ABL:17 >= 3 // :2030
  // SKIP 	PLAY += 1 // :2031
  // SKIP  // :2032
  // SKIP ;牝犬によるボーナス // :2033
  // SKIP SIF TALENT:136 // :2034
  // SKIP 	PLAY += 2 // :2035
  // SKIP  // :2036
  // SKIP ;回数が0以下なら終了 // :2037
  // SKIP SIF PLAY <= 0 // :2038
  // SKIP 	RETURN 0 // :2039
  // SKIP  // :2040
  // SKIP ;低姿态、开放、动物耳朵によるボーナス // :2041
  // SKIP SIF TALENT:17 // :2042
  // SKIP 	PLAY += 1 // :2043
  // SKIP SIF TALENT:33 // :2044
  // SKIP 	PLAY += 1 // :2045
  // SKIP SIF TALENT:124 // :2046
  // SKIP 	PLAY += 1 // :2047
  // SKIP  // :2048
  // SKIP ;高姿态、克制、压抑、反感污臭によるペナルティ // :2049
  // SKIP SIF TALENT:15 // :2050
  // SKIP 	PLAY -= 1 // :2051
  // SKIP SIF TALENT:20 // :2052
  // SKIP 	PLAY -= 1 // :2053
  // SKIP SIF TALENT:32 // :2054
  // SKIP 	PLAY -= 1 // :2055
  // SKIP SIF TALENT:62 && TALENT:64 == 0 // :2056
  // SKIP 	PLAY -= 2 // :2057
  // SKIP  // :2058
  // SKIP ;接受快感、否定快感 // :2059
  // SKIP IF TALENT:70 // :2060
  // SKIP 	PLAY += 1 // :2061
  // SKIP ELSEIF TALENT:71 // :2062
  // SKIP 	PLAY -= 2 // :2063
  // SKIP ENDIF // :2064
  // SKIP  // :2065
  // SKIP ;淫乱によるボーナス // :2066
  // SKIP SIF TALENT:76 // :2067
  // SKIP 	PLAY += 1 // :2068
  // SKIP  // :2069
  // SKIP ;牝犬によるボーナスその２ // :2070
  // SKIP SIF TALENT:136 // :2071
  // SKIP 	TIMES PLAY , 1.50 // :2072
  // SKIP  // :2073
  // SKIP ;回数が0以下になっていたら終了 // :2074
  // SKIP SIF PLAY <= 0 // :2075
  // SKIP 	RETURN 0 // :2076
  // SKIP  // :2077
  // SKIP DRAWLINE // :2078
  // SKIP PRINTFORM %SAVESTR:TARGET%无法抑制兽奸的欲望， // :2079
  // SKIP PRINTFORML 和野兽交配了{PLAY}次。 // :2080
  // SKIP  // :2081
  // SKIP ;兽奸经验 // :2082
  // SKIP PRINTFORML %EXPNAME:56%＋{PLAY} // :2083
  // SKIP PRINTFORML %EXPNAME:0%＋{PLAY} // :2084
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :2085
  // SKIP EXP:56 += PLAY // :2086
  // SKIP EXP:0 += PLAY // :2087
  // SKIP EXP:5 += PLAY // :2088
  // SKIP  // :2089
  // SKIP ;珠経験 // :2090
  // SKIP PRINTFORML %PALAMNAME:1%点数＋{PLAY*200} // :2091
  // SKIP PRINTFORML %PALAMNAME:6%点数＋{PLAY*300} // :2092
  // SKIP PRINTFORMW %PALAMNAME:8%点数＋{PLAY*200} // :2093
  // SKIP JUEL:1 += A*200 // :2094
  // SKIP JUEL:6 += A*300 // :2095
  // SKIP JUEL:8 += A*200 // :2096
  // SKIP  // :2097
  // SKIP PRINTFORMW %SAVESTR:TARGET%的放荡行为成为了魔王和奴隶们的力量(经验值+{PLAY}) // :2098
  // SKIP EXP:0:80 += PLAY // :2099
  // SKIP EXP:TARGET:80 += PLAY // :2100
  // SKIP  // :2101
  // SKIP PRINTW (善恶值减少:-2) // :2102
  // SKIP CALL KARMA, TARGET, -2 // :2103
  // SKIP  // :2104
  // SKIP RETURN 1 // :2105
  // SKIP  // :2106
  // SKIP ;-------------------------------------- // :2107
  // SKIP @DUNGEON_WORK // :2108
  // SKIP ;-------------------------------------- // :2109
  // SKIP ;内職 // :2110
  // SKIP  // :2111
  // SKIP M = (CFLAG:A:9 * 20) + 100 // :2112
  // SKIP  // :2113
  // SKIP IF FLAG:5 & 32 // :2114
  // SKIP 	PRINTFORM %SAVESTR:A%从事了 // :2115
  // SKIP 	IF RAND:4 == 0 // :2116
  // SKIP 		PRINT 研磨宝石的 // :2117
  // SKIP 	ELSEIF RAND:3 == 0 // :2118
  // SKIP 		PRINT 制作工艺品的 // :2119
  // SKIP 	ELSEIF RAND:2 == 0 // :2120
  // SKIP 		PRINT 抄写书籍的 // :2121
  // SKIP 	ELSE // :2122
  // SKIP 		PRINT 制作手工的 // :2123
  // SKIP 	ENDIF // :2124
  // SKIP 	PRINTFORMW 副业，获得了{M}点收入。 // :2125
  // SKIP ENDIF // :2126
  // SKIP  // :2127
  // SKIP MONEY += M // :2128
  // SKIP FALG:4444 += M // :2129
  // SKIP RETURN 0 // :2130
  // SKIP  // :2131
  // SKIP ;------------------------------- // :2132
  // SKIP @HEROINE_BICH_SEX // :2133
  // SKIP #DIM PLAY // :2134
  // SKIP #DIM PAY // :2135
  // SKIP #DIM MEN // :2136
  // SKIP ;------------------------------- // :2137
  // SKIP ;ダンジョン外の勇者売春 // :2138
  // SKIP  // :2139
  // SKIP ;調教対象が空だとダメ // :2140
  // SKIP SIF TARGET < 0 // :2141
  // SKIP 	RETURN 0 // :2142
  // SKIP ;处女や男人だとダメ // :2143
  // SKIP SIF TALENT:0 || TALENT:122 == 1 // :2144
  // SKIP 	RETURN 0 // :2145
  // SKIP ;貞操帯だとダメ // :2146
  // SKIP SIF CFLAG:42 == 79 && (CFLAG:40 & 64) // :2147
  // SKIP 	RETURN 0 // :2148
  // SKIP ;貞操封印だとダメ // :2149
  // SKIP SIF TALENT:273 // :2150
  // SKIP 	RETURN 0 // :2151
  // SKIP ;瀕死だとダメ // :2152
  // SKIP SIF BASE:0 < 500 // :2153
  // SKIP 	RETURN 0 // :2154
  // SKIP ;未経験の場合善恶值がある程度まで低くないとダメ // :2155
  // SKIP ;回数補正に変更 // :2156
  // SKIP ; SIF CFLAG:151 > 50 && EXP:74 == 0 // :2157
  // SKIP 	; RETURN 0 // :2158
  // SKIP  // :2159
  // SKIP ;性交回数 // :2160
  // SKIP ;初期値は低い // :2161
  // SKIP PLAY = -2 // :2162
  // SKIP ;代金 // :2163
  // SKIP PAY = 0 // :2164
  // SKIP ;客 // :2165
  // SKIP MEN = RAND:5 // :2166
  // SKIP  // :2167
  // SKIP ;未経験の場合ペナルティ // :2168
  // SKIP SIF EXP:74 == 0 // :2169
  // SKIP 	PLAY -= 3 // :2170
  // SKIP  // :2171
  // SKIP ;妓女のドレスボーナス // :2172
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :2173
  // SKIP 	PLAY += 1 // :2174
  // SKIP  // :2175
  // SKIP ;V感覚 // :2176
  // SKIP IF ABL:2 == 4 // :2177
  // SKIP 	PLAY += 1 // :2178
  // SKIP ELSEIF ABL:2 == 5 // :2179
  // SKIP 	PLAY += 2 // :2180
  // SKIP ELSEIF ABL:2 >= 6 // :2181
  // SKIP 	PLAY += 3 // :2182
  // SKIP ENDIF // :2183
  // SKIP  // :2184
  // SKIP ;性交中毒によるボーナス // :2185
  // SKIP SIF ABL:30 // :2186
  // SKIP 	PLAY += ABL:30 / 2 + 1 // :2187
  // SKIP  // :2188
  // SKIP ;回数が0以下なら終了 // :2189
  // SKIP ;SIF PLAY <= 0 // :2190
  // SKIP ;	RETURN 0 // :2191
  // SKIP  // :2192
  // SKIP ;欲望ＬＶ５以上侍奉精神５以上で+1 // :2193
  // SKIP SIF ABL:11 >= 5 && ABL:16 >= 5 // :2194
  // SKIP 	PLAY += 2 // :2195
  // SKIP ;欲望ＬＶ４以上侍奉精神４以上で+1 // :2196
  // SKIP SIF ABL:11 == 4 && ABL:16 >= 4 // :2197
  // SKIP 	PLAY += 1 // :2198
  // SKIP  // :2199
  // SKIP ;欲望ＬＶ７以上私处感觉ＬＶ６以上で+1（下と合わせて+2） // :2200
  // SKIP SIF ABL:11 >= 7 && ABL:5 >= 6 // :2201
  // SKIP 	PLAY += 1 // :2202
  // SKIP ;欲望ＬＶ４以上私处感觉ＬＶ３以上で+1 // :2203
  // SKIP SIF ABL:11 >= 4 && ABL:2 >= 3 // :2204
  // SKIP 	PLAY += 1 // :2205
  // SKIP  // :2206
  // SKIP ;爱、淫乱によるボーナス // :2207
  // SKIP SIF TALENT:85 // :2208
  // SKIP 	PLAY += 1 // :2209
  // SKIP SIF TALENT:76 // :2210
  // SKIP 	PLAY += 1 // :2211
  // SKIP  // :2212
  // SKIP ;性爱狂によるボーナス // :2213
  // SKIP SIF TALENT:75 // :2214
  // SKIP 	PLAY += 2 // :2215
  // SKIP  // :2216
  // SKIP ;接受快感、否定快感 // :2217
  // SKIP IF TALENT:70 // :2218
  // SKIP 	PLAY += 1 // :2219
  // SKIP ELSEIF TALENT:71 // :2220
  // SKIP 	PLAY -= 2 // :2221
  // SKIP ENDIF // :2222
  // SKIP  // :2223
  // SKIP ;看轻贞操、看重贞操 // :2224
  // SKIP IF TALENT:31 // :2225
  // SKIP 	PLAY += 1 // :2226
  // SKIP ELSEIF TALENT:30 // :2227
  // SKIP 	PLAY -= 2 // :2228
  // SKIP ENDIF // :2229
  // SKIP  // :2230
  // SKIP ;卖淫中毒によるボーナス // :2231
  // SKIP SIF ABL:37 > 0 // :2232
  // SKIP 	PLAY += ABL:37 // :2233
  // SKIP  // :2234
  // SKIP ;妓女によるボーナス // :2235
  // SKIP SIF TALENT:180 // :2236
  // SKIP 	PLAY += 1 // :2237
  // SKIP  // :2238
  // SKIP ;倾城によるボーナス // :2239
  // SKIP SIF TALENT:181 // :2240
  // SKIP 	PLAY += 2 // :2241
  // SKIP  // :2242
  // SKIP ;肉便器によるボーナス // :2243
  // SKIP SIF TALENT:204 // :2244
  // SKIP 	PLAY += 1 // :2245
  // SKIP  // :2246
  // SKIP ;正太控の場合、客が少年になる // :2247
  // SKIP IF TALENT:正太控 // :2248
  // SKIP 	MEN = 2 // :2249
  // SKIP 	PLAY += 1 // :2250
  // SKIP ENDIF // :2251
  // SKIP  // :2252
  // SKIP IF TALENT:315 == 5 // :2253
  // SKIP 	;元妓女の場合ボーナス // :2254
  // SKIP 	PLAY += 3 // :2255
  // SKIP ELSEIF TALENT:315 == 7 // :2256
  // SKIP 	;元物乞いの場合ボーナス // :2257
  // SKIP 	PLAY += 2 // :2258
  // SKIP ELSEIF TALENT:315 == 2 // :2259
  // SKIP 	;元修道女 // :2260
  // SKIP 	PLAY -= 1 // :2261
  // SKIP ELSEIF TALENT:315 == 8 // :2262
  // SKIP 	;元貴族 // :2263
  // SKIP 	PLAY -= 1 // :2264
  // SKIP ELSEIF TALENT:315 == 12 // :2265
  // SKIP 	;元聖女 // :2266
  // SKIP 	PLAY -= 1 // :2267
  // SKIP ENDIF // :2268
  // SKIP  // :2269
  // SKIP ;善恶值による積極性 // :2270
  // SKIP IF CFLAG:151 > 150 // :2271
  // SKIP 	PLAY -= 3 // :2272
  // SKIP ELSEIF CFLAG:151 > 100 // :2273
  // SKIP 	PLAY -= 2 // :2274
  // SKIP ELSEIF CFLAG:151 > 50 // :2275
  // SKIP 	PLAY -= 1 // :2276
  // SKIP ELSEIF CFLAG:151 > 0 // :2277
  // SKIP 	;変動无 // :2278
  // SKIP ELSEIF CFLAG:151 > -50 // :2279
  // SKIP 	PLAY += 1 // :2280
  // SKIP ELSEIF CFLAG:151 > -100 // :2281
  // SKIP 	PLAY += 2 // :2282
  // SKIP ELSEIF CFLAG:151 > -150 // :2283
  // SKIP 	PLAY += 3 // :2284
  // SKIP ELSE // :2285
  // SKIP 	PLAY += 4 // :2286
  // SKIP ENDIF // :2287
  // SKIP  // :2288
  // SKIP ;借金による強制 // :2289
  // SKIP IF CFLAG:582 >= 0 // :2290
  // SKIP 	PLAY -= 3 // :2291
  // SKIP ELSEIF CFLAG:582 > -1000 // :2292
  // SKIP 	PLAY -= 2 // :2293
  // SKIP ELSEIF CFLAG:582 > -2000 // :2294
  // SKIP 	PLAY -= 1 // :2295
  // SKIP ELSEIF CFLAG:582 > -3000 // :2296
  // SKIP 	;変動无 // :2297
  // SKIP ELSEIF CFLAG:582 > -4000 // :2298
  // SKIP 	PLAY += 1 // :2299
  // SKIP ELSEIF CFLAG:582 > -6000 // :2300
  // SKIP 	PLAY += 2 // :2301
  // SKIP ELSEIF CFLAG:582 > -8000 // :2302
  // SKIP 	PLAY += 3 // :2303
  // SKIP ELSEIF CFLAG:582 > -11000 // :2304
  // SKIP 	PLAY += 4 // :2305
  // SKIP ELSEIF CFLAG:582 > -15000 // :2306
  // SKIP 	PLAY += 5 // :2307
  // SKIP ELSEIF CFLAG:582 > -20000 // :2308
  // SKIP 	PLAY += 6 // :2309
  // SKIP ELSE // :2310
  // SKIP 	PLAY += 7 // :2311
  // SKIP ENDIF // :2312
  // SKIP  // :2313
  // SKIP ;回数が0以下になっていたら終了 // :2314
  // SKIP SIF PLAY <= 0 // :2315
  // SKIP 	RETURN 0 // :2316
  // SKIP  // :2317
  // SKIP DRAWLINE // :2318
  // SKIP  // :2319
  // SKIP IF TALENT:成为勇者前的生活 == 8 // :2320
  // SKIP 	;貴族 // :2321
  // SKIP 	PRINT 身为贵族的 // :2322
  // SKIP ELSEIF TALENT:成为勇者前的生活 == 12 // :2323
  // SKIP 	;聖女 // :2324
  // SKIP 	PRINT 身为圣女的 // :2325
  // SKIP ELSEIF TALENT:魅力点 == 23 // :2326
  // SKIP 	;大きな尻 // :2327
  // SKIP 	PRINT 拥有丰满臀部的 // :2328
  // SKIP ELSE // :2329
  // SKIP 	;特に何もない場合髪色 // :2330
  // SKIP 	PRINTFORM %GET_LOOK_INFO(TARGET, "头发颜色")%的 // :2331
  // SKIP ENDIF // :2332
  // SKIP  // :2333
  // SKIP PRINTFORM %SAVESTR:TARGET% // :2334
  // SKIP ;卖淫中毒か淫乱 // :2335
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :2336
  // SKIP 	PRINTFORM 无法压抑性欲，向 // :2337
  // SKIP ELSEIF CFLAG:582 < -4000 // :2338
  // SKIP 	PRINTFORM 债台高筑，向 // :2339
  // SKIP ELSE // :2340
  // SKIP 	PRINTFORM 冒险资金见底，向 // :2341
  // SKIP ENDIF // :2342
  // SKIP IF MEN == 0 // :2343
  // SKIP 	PRINT 村民 // :2344
  // SKIP ELSEIF MEN == 1 // :2345
  // SKIP 	PRINT 冒险者 // :2346
  // SKIP ELSEIF MEN == 2 // :2347
  // SKIP 	PRINT 村里少年 // :2348
  // SKIP 	;収入減 // :2349
  // SKIP 	PAY -= 10 // :2350
  // SKIP ELSEIF MEN == 3 // :2351
  // SKIP 	PRINT 街边暴发户 // :2352
  // SKIP 	;収入ボーナス // :2353
  // SKIP 	PAY += 20 // :2354
  // SKIP ELSE // :2355
  // SKIP 	PRINT 奸商 // :2356
  // SKIP ENDIF // :2357
  // SKIP IF PLAY <= 1 // :2358
  // SKIP PRINTFORML 卖身了， // :2359
  // SKIP PRINTFORMW 似乎和客人去了后巷的小旅馆… // :2360
  // SKIP ELSE // :2361
  // SKIP PRINTFORML 卖身了， // :2362
  // SKIP PRINTFORMW 被客人们搂着去了后巷的小旅馆… // :2363
  // SKIP PRINTFORMW %SAVESTR:TARGET%仰臥著用雙腿用力的夾住趴在自己身上的客人的腰，發出著甜蜜的大聲的呻吟聲… // :2364
  // SKIP PRINTFORMW 随即被翻过身来，被人從背後抓着乳房像狗一樣侵犯着肛门… // :2365
  // SKIP PRINTFORMW 同时在客人们笑骂其胸部只是裝飾，是無用之物後，%SAVESTR:TARGET%因被命令著而不得不用胸部進行著奉仕，口中也被陽具插入，頭被前後搖晃著套弄起來… // :2366
  // SKIP PRINTFORMW 被騎乗位的体勢侵犯著的%SAVESTR:TARGET%拚命地抑制住自己的呻吟聲，套弄着兩側站著的男人們的阳具，同时被抽插着乳沟，喉咙被巨大的阳具突入…%SAVESTR:TARGET%感到一陣窒息… // :2367
  // SKIP PRINTFORMW 随后%SAVESTR:TARGET%被客人们抱了起来，双腿被客人像洋娃娃一样架在肩上，前后被同时插入，乳房则像面团一样被肆意揉捏着变成各种淫靡的形状… // :2368
  // SKIP PRINTFORMW %SAVESTR:TARGET%的後面與前面被同時突刺，身體連續不斷地前後搖動著。搖晃著的身體隨著每次陽具在阴道和尻穴中的突刺，迎來异样的高潮，同时尻穴和阴道内也被射入了精液… // :2369
  // SKIP PRINTFORMW 在客人走后，%SAVESTR:TARGET%躺在满是淫液的床上，全身塗滿了白濁的液體。被射入尻穴与阴道深处的精液伴隨著卑猥的聲音緩緩地流了出来… // :2370
  // SKIP ENDIF // :2371
  // SKIP  // :2372
  // SKIP PRINTFORML %EXPNAME:0%＋{PLAY} // :2373
  // SKIP PRINTFORML %EXPNAME:1%＋{PLAY} // :2374
  // SKIP PRINTFORML %EXPNAME:22%＋{PLAY} // :2375
  // SKIP PRINTFORML %EXPNAME:20%＋{PLAY} // :2376
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :2377
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :2378
  // SKIP PRINTFORML %PALAMNAME:1%点数＋{PLAY*10} // :2379
  // SKIP PRINTFORML %PALAMNAME:2%点数＋{PLAY*10} // :2380
  // SKIP PRINTFORML %PALAMNAME:22%点数＋{PLAY*15} // :2381
  // SKIP PRINTFORMW %PALAMNAME:5%点数＋{PLAY*15} // :2382
  // SKIP PRINTFORMW %PALAMNAME:7%点数＋{PLAY*15} // :2383
  // SKIP EXP:0 += PLAY // :2384
  // SKIP EXP:1 += PLAY // :2385
  // SKIP EXP:22 += PLAY // :2386
  // SKIP EXP:20 += PLAY*3 // :2387
  // SKIP EXP:5 += PLAY // :2388
  // SKIP EXP:74 += PLAY // :2389
  // SKIP JUEL:1 += PLAY*10 // :2390
  // SKIP JUEL:2 += PLAY*10 // :2391
  // SKIP JUEL:22 += PLAY*15 // :2392
  // SKIP JUEL:5 += PLAY*15 // :2393
  // SKIP JUEL:7 += PLAY*15 // :2394
  // SKIP  // :2395
  // SKIP PAY += PLAY * 500 // :2396
  // SKIP SIF PAY <= 0 // :2397
  // SKIP 	PAY = 1 // :2398
  // SKIP PRINTFORMW %SAVESTR:TARGET%获得了{PAY}点的金钱以及经验值。 // :2399
  // SKIP EXP:TARGET:80 += PAY / 50 // :2400
  // SKIP CFLAG:580 += PAY // :2401
  // SKIP PRINTW (善恶值减少:-1) // :2402
  // SKIP CALL KARMA, TARGET, -1 // :2403
  // SKIP RETURN 1 // :2404
  // SKIP  // :2405
  // SKIP ;-------------------------------- // :2406
  // SKIP @HEROINE_BICH_ANAL // :2407
  // SKIP #DIM PLAY // :2408
  // SKIP #DIM PAY // :2409
  // SKIP #DIM MEN // :2410
  // SKIP ;-------------------------------- // :2411
  // SKIP ;ダンジョン外アナル売春 // :2412
  // SKIP ;調教対象が空だとダメ // :2413
  // SKIP SIF TARGET < 0 // :2414
  // SKIP 	RETURN 0 // :2415
  // SKIP ;瀕死だとダメ // :2416
  // SKIP SIF BASE:0 < 500 // :2417
  // SKIP 	RETURN 0 // :2418
  // SKIP ;未経験の場合善恶值がある程度まで低くないとダメ // :2419
  // SKIP ; SIF CFLAG:151 > 50 && EXP:74 == 0 // :2420
  // SKIP 	; RETURN 0 // :2421
  // SKIP  // :2422
  // SKIP ;性交回数 // :2423
  // SKIP ;初期値は低い // :2424
  // SKIP PLAY = -2 // :2425
  // SKIP ;代金 // :2426
  // SKIP PAY = 0 // :2427
  // SKIP ;客 // :2428
  // SKIP MEN = RAND:5 // :2429
  // SKIP  // :2430
  // SKIP ;未経験の場合ペナルティ // :2431
  // SKIP ;アナルは一般性癖じゃないので若干抵抗が大きい // :2432
  // SKIP SIF EXP:74 == 0 // :2433
  // SKIP 	PLAY -= 4 // :2434
  // SKIP  // :2435
  // SKIP ;妓女のドレスボーナス // :2436
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :2437
  // SKIP 	PLAY += 1 // :2438
  // SKIP  // :2439
  // SKIP ;肛门感觉 // :2440
  // SKIP IF ABL:3 == 4 // :2441
  // SKIP 	PLAY += 1 // :2442
  // SKIP ELSEIF ABL:3 == 5 // :2443
  // SKIP 	PLAY += 2 // :2444
  // SKIP ELSEIF ABL:3 >= 6 // :2445
  // SKIP 	PLAY += 3 // :2446
  // SKIP ENDIF // :2447
  // SKIP  // :2448
  // SKIP ;性交中毒によるボーナス // :2449
  // SKIP SIF ABL:30 // :2450
  // SKIP 	PLAY += ABL:30 / 2 + 1 // :2451
  // SKIP  // :2452
  // SKIP ;回数が0以下なら終了 // :2453
  // SKIP ;SIF PLAY <= 0 // :2454
  // SKIP ;	RETURN 0 // :2455
  // SKIP  // :2456
  // SKIP ;欲望ＬＶ５以上侍奉精神５以上で+1 // :2457
  // SKIP SIF ABL:11 >= 5 && ABL:16 >= 5 // :2458
  // SKIP 	PLAY += 2 // :2459
  // SKIP ;欲望ＬＶ４以上侍奉精神４以上で+1 // :2460
  // SKIP SIF ABL:11 == 4 && ABL:16 >= 4 // :2461
  // SKIP 	PLAY += 1 // :2462
  // SKIP  // :2463
  // SKIP ;欲望ＬＶ７以上私处感觉ＬＶ６以上で+1（下と合わせて+2） // :2464
  // SKIP SIF ABL:11 >= 7 && ABL:5 >= 6 // :2465
  // SKIP 	PLAY += 1 // :2466
  // SKIP ;欲望ＬＶ４以上私处感觉ＬＶ３以上で+1 // :2467
  // SKIP SIF ABL:11 >= 4 && ABL:2 >= 3 // :2468
  // SKIP 	PLAY += 1 // :2469
  // SKIP  // :2470
  // SKIP ;爱、淫乱によるボーナス // :2471
  // SKIP SIF TALENT:85 // :2472
  // SKIP 	PLAY += 1 // :2473
  // SKIP SIF TALENT:76 // :2474
  // SKIP 	PLAY += 1 // :2475
  // SKIP  // :2476
  // SKIP ;尻穴狂によるボーナス // :2477
  // SKIP SIF TALENT:75 // :2478
  // SKIP 	PLAY += 2 // :2479
  // SKIP  // :2480
  // SKIP ;接受快感、否定快感 // :2481
  // SKIP IF TALENT:70 // :2482
  // SKIP 	PLAY += 1 // :2483
  // SKIP ELSEIF TALENT:71 // :2484
  // SKIP 	PLAY -= 2 // :2485
  // SKIP ENDIF // :2486
  // SKIP  // :2487
  // SKIP ;看轻贞操、看重贞操 // :2488
  // SKIP IF TALENT:31 // :2489
  // SKIP 	PLAY += 1 // :2490
  // SKIP ELSEIF TALENT:30 // :2491
  // SKIP 	PLAY -= 2 // :2492
  // SKIP ENDIF // :2493
  // SKIP  // :2494
  // SKIP ;卖淫中毒によるボーナス // :2495
  // SKIP SIF ABL:37 > 0 // :2496
  // SKIP 	PLAY += ABL:37 // :2497
  // SKIP  // :2498
  // SKIP ;妓女によるボーナス // :2499
  // SKIP SIF TALENT:180 // :2500
  // SKIP 	PLAY += 1 // :2501
  // SKIP  // :2502
  // SKIP ;倾城によるボーナス // :2503
  // SKIP SIF TALENT:181 // :2504
  // SKIP 	PLAY += 2 // :2505
  // SKIP  // :2506
  // SKIP ;肉便器によるボーナス // :2507
  // SKIP SIF TALENT:204 // :2508
  // SKIP 	PLAY += 1 // :2509
  // SKIP  // :2510
  // SKIP ;正太控の場合、客が少年になる // :2511
  // SKIP IF TALENT:正太控 // :2512
  // SKIP 	MEN = 2 // :2513
  // SKIP 	PLAY += 1 // :2514
  // SKIP ENDIF // :2515
  // SKIP  // :2516
  // SKIP  // :2517
  // SKIP IF TALENT:315 == 5 // :2518
  // SKIP 	;元妓女の場合ボーナス // :2519
  // SKIP 	PLAY += 3 // :2520
  // SKIP ELSEIF TALENT:315 == 7 // :2521
  // SKIP 	;元物乞いの場合ボーナス // :2522
  // SKIP 	PLAY += 2 // :2523
  // SKIP ENDIF // :2524
  // SKIP  // :2525
  // SKIP ;善恶值による積極性 // :2526
  // SKIP IF CFLAG:151 > 150 // :2527
  // SKIP 	PLAY -= 3 // :2528
  // SKIP ELSEIF CFLAG:151 > 100 // :2529
  // SKIP 	PLAY -= 2 // :2530
  // SKIP ELSEIF CFLAG:151 > 50 // :2531
  // SKIP 	PLAY -= 1 // :2532
  // SKIP ELSEIF CFLAG:151 > 0 // :2533
  // SKIP 	;変動无 // :2534
  // SKIP ELSEIF CFLAG:151 > -50 // :2535
  // SKIP 	PLAY += 1 // :2536
  // SKIP ELSEIF CFLAG:151 > -100 // :2537
  // SKIP 	PLAY += 2 // :2538
  // SKIP ELSEIF CFLAG:151 > -150 // :2539
  // SKIP 	PLAY += 3 // :2540
  // SKIP ELSE // :2541
  // SKIP 	PLAY += 4 // :2542
  // SKIP ENDIF // :2543
  // SKIP  // :2544
  // SKIP ;借金による強制 // :2545
  // SKIP IF CFLAG:582 >= 0 // :2546
  // SKIP 	PLAY -= 3 // :2547
  // SKIP ELSEIF CFLAG:582 > -1000 // :2548
  // SKIP 	PLAY -= 2 // :2549
  // SKIP ELSEIF CFLAG:582 > -2000 // :2550
  // SKIP 	PLAY -= 1 // :2551
  // SKIP ELSEIF CFLAG:582 > -3000 // :2552
  // SKIP 	;変動无 // :2553
  // SKIP ELSEIF CFLAG:582 > -4000 // :2554
  // SKIP 	PLAY += 1 // :2555
  // SKIP ELSEIF CFLAG:582 > -6000 // :2556
  // SKIP 	PLAY += 2 // :2557
  // SKIP ELSEIF CFLAG:582 > -8000 // :2558
  // SKIP 	PLAY += 3 // :2559
  // SKIP ELSEIF CFLAG:582 > -11000 // :2560
  // SKIP 	PLAY += 4 // :2561
  // SKIP ELSEIF CFLAG:582 > -15000 // :2562
  // SKIP 	PLAY += 5 // :2563
  // SKIP ELSEIF CFLAG:582 > -20000 // :2564
  // SKIP 	PLAY += 6 // :2565
  // SKIP ELSE // :2566
  // SKIP 	PLAY += 7 // :2567
  // SKIP ENDIF // :2568
  // SKIP  // :2569
  // SKIP ;回数が0以下になっていたら終了 // :2570
  // SKIP SIF PLAY <= 0 // :2571
  // SKIP 	RETURN 0 // :2572
  // SKIP  // :2573
  // SKIP DRAWLINE // :2574
  // SKIP  // :2575
  // SKIP IF TALENT:成为勇者前的生活 == 8 // :2576
  // SKIP 	;貴族 // :2577
  // SKIP 	PRINT 身为贵族的 // :2578
  // SKIP ELSEIF TALENT:成为勇者前的生活 == 12 // :2579
  // SKIP 	;聖女 // :2580
  // SKIP 	PRINT 身为圣女的 // :2581
  // SKIP ELSEIF TALENT:魅力点 == 23 // :2582
  // SKIP 	;大きな尻 // :2583
  // SKIP 	PRINT 拥有丰满臀部的 // :2584
  // SKIP ELSE // :2585
  // SKIP 	;特に何もない場合髪色 // :2586
  // SKIP 	PRINTFORM %GET_LOOK_INFO(TARGET, "头发颜色")%的 // :2587
  // SKIP ENDIF // :2588
  // SKIP  // :2589
  // SKIP PRINTFORM %SAVESTR:TARGET% // :2590
  // SKIP ;卖淫中毒か淫乱 // :2591
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :2592
  // SKIP 	PRINTFORM 无法压抑性欲，向 // :2593
  // SKIP ELSEIF CFLAG:582 < -4000 // :2594
  // SKIP 	PRINTFORM 债台高筑，向 // :2595
  // SKIP ELSE // :2596
  // SKIP 	PRINTFORM 冒险资金见底，向 // :2597
  // SKIP ENDIF // :2598
  // SKIP IF MEN == 0 // :2599
  // SKIP 	PRINT 村民 // :2600
  // SKIP ELSEIF MEN == 1 // :2601
  // SKIP 	PRINT 冒险者 // :2602
  // SKIP ELSEIF MEN == 2 // :2603
  // SKIP 	PRINT 村里少年 // :2604
  // SKIP 	;収入減 // :2605
  // SKIP 	PAY -= 10 // :2606
  // SKIP ELSEIF MEN == 3 // :2607
  // SKIP 	PRINT 街边暴发户 // :2608
  // SKIP 	;収入ボーナス // :2609
  // SKIP 	PAY += 20 // :2610
  // SKIP ELSE // :2611
  // SKIP 	PRINT 奸商 // :2612
  // SKIP ENDIF // :2613
  // SKIP ;PRINTFORML 卖菊了， // :2614
  // SKIP ;PRINTFORMW 似乎到后巷的小旅馆卖了{PLAY}次… // :2615
  // SKIP IF PLAY <= 1 // :2616
  // SKIP PRINTFORML 卖菊了， // :2617
  // SKIP PRINTFORMW 似乎到后巷的小旅馆卖了{PLAY}次… // :2618
  // SKIP ELSE // :2619
  // SKIP PRINTFORML 卖菊了， // :2620
  // SKIP PRINTFORMW 被客人们搂着去了后巷的小旅馆… // :2621
  // SKIP PRINTFORMW %SAVESTR:TARGET%忍受着屈辱，跪在床上，像母狗一样摇动着屁股… // :2622
  // SKIP PRINTFORMW %SAVESTR:TARGET%被客人們從背後抱住，肛門被淩辱，就像狗一樣被侵犯著… // :2623
  // SKIP PRINTFORMW 每次臀瓣與客人的腰肢發生撞擊，四肢著地趴著的%SAVESTR:TARGET%都會提高口中漏出的愉悅的呻吟聲… // :2624
  // SKIP PRINTFORMW %SAVESTR:TARGET%的臀部被客人像揉面一般地揉撫著，瘋狂忘我地聳動著腰部，呼吸逐漸變得粗重而凌亂… // :2625
  // SKIP PRINTFORMW 随后客人躺在地上，让%SAVESTR:TARGET%坐上来自己动。%SAVESTR:TARGET%跨坐在男人的腰上扭動著自己的身體，乳首也被旁边的男人揉搓吸吮着… // :2626
  // SKIP PRINTFORMW 在客人走后，%SAVESTR:TARGET%的全身塗滿了白濁的液體，像被丟棄的人偶一般癱倒在床上，尻穴深处被射入的精液伴隨著卑猥的聲音在緩緩地流了出来… // :2627
  // SKIP ENDIF // :2628
  // SKIP  // :2629
  // SKIP PRINTFORML %EXPNAME:1%＋{PLAY} // :2630
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :2631
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :2632
  // SKIP PRINTFORML %PALAMNAME:2%点数＋{PLAY*10} // :2633
  // SKIP PRINTFORMW %PALAMNAME:5%点数＋{PLAY*15} // :2634
  // SKIP PRINTFORMW %PALAMNAME:7%点数＋{PLAY*15} // :2635
  // SKIP EXP:1 += PLAY // :2636
  // SKIP EXP:5 += PLAY // :2637
  // SKIP EXP:74 += PLAY // :2638
  // SKIP JUEL:2 += PLAY*10 // :2639
  // SKIP JUEL:5 += PLAY*15 // :2640
  // SKIP JUEL:7 += PLAY*15 // :2641
  // SKIP  // :2642
  // SKIP PAY += PLAY * 350 // :2643
  // SKIP SIF PAY <= 0 // :2644
  // SKIP 	PAY = 1 // :2645
  // SKIP  // :2646
  // SKIP PRINTFORMW %SAVESTR:TARGET%获得了{PAY}点的金钱以及经验值。 // :2647
  // SKIP EXP:TARGET:80 += PAY / 50 // :2648
  // SKIP CFLAG:580 += PAY // :2649
  // SKIP  // :2650
  // SKIP PRINTW (善恶值减少:-2) // :2651
  // SKIP CALL KARMA, TARGET, -2 // :2652
  // SKIP  // :2653
  // SKIP RETURN 1 // :2654
  // SKIP  // :2655
  // SKIP ;-------------------------------- // :2656
  // SKIP @HEROINE_BICH_ORAL // :2657
  // SKIP #DIM PLAY // :2658
  // SKIP #DIM PAY // :2659
  // SKIP #DIM MEN // :2660
  // SKIP ;-------------------------------- // :2661
  // SKIP ;ダンジョン外フェラ売春 // :2662
  // SKIP ;ハードルがだいぶ低い // :2663
  // SKIP  // :2664
  // SKIP ;調教対象が空だとダメ // :2665
  // SKIP SIF TARGET < 0 // :2666
  // SKIP 	RETURN 0 // :2667
  // SKIP ;瀕死だとダメ // :2668
  // SKIP SIF BASE:0 < 500 // :2669
  // SKIP 	RETURN 0 // :2670
  // SKIP  // :2671
  // SKIP ;性交回数 // :2672
  // SKIP ;初期値は低い // :2673
  // SKIP PLAY = -2 // :2674
  // SKIP ;代金 // :2675
  // SKIP PAY = 0 // :2676
  // SKIP ;客 // :2677
  // SKIP MEN = RAND:5 // :2678
  // SKIP  // :2679
  // SKIP ;未経験の場合ペナルティ // :2680
  // SKIP ;若干抵抗が少ない // :2681
  // SKIP SIF EXP:74 == 0 // :2682
  // SKIP 	PLAY -= 2 // :2683
  // SKIP  // :2684
  // SKIP ;妓女のドレスボーナス // :2685
  // SKIP SIF (CFLAG:40 & 28) && CFLAG:41 == 203 // :2686
  // SKIP 	PLAY += 1 // :2687
  // SKIP  // :2688
  // SKIP ;侍奉技术 // :2689
  // SKIP PLAY += ABL:侍奉技术 // :2690
  // SKIP  // :2691
  // SKIP ;侍奉精神によるボーナス // :2692
  // SKIP PLAY += ABL:侍奉精神 // :2693
  // SKIP  // :2694
  // SKIP ;精液中毒によるボーナス // :2695
  // SKIP PLAY += ABL:精液中毒 // :2696
  // SKIP  // :2697
  // SKIP ;欲望ＬＶ４以上で+1 // :2698
  // SKIP SIF ABL:11 == 4 // :2699
  // SKIP 	PLAY += 1 // :2700
  // SKIP  // :2701
  // SKIP ;欲望ＬＶ５以上で+1 // :2702
  // SKIP SIF ABL:11 >= 5 // :2703
  // SKIP 	PLAY += 1 // :2704
  // SKIP  // :2705
  // SKIP ;欲望ＬＶ７以上で+1 // :2706
  // SKIP SIF ABL:11 >= 7 // :2707
  // SKIP 	PLAY += 1 // :2708
  // SKIP  // :2709
  // SKIP ;愛、淫乱によるボーナス // :2710
  // SKIP SIF TALENT:85 // :2711
  // SKIP 	PLAY += 1 // :2712
  // SKIP SIF TALENT:76 // :2713
  // SKIP 	PLAY += 1 // :2714
  // SKIP  // :2715
  // SKIP ;喜欢精液によるボーナス // :2716
  // SKIP SIF TALENT:喜欢精液 // :2717
  // SKIP 	PLAY += 2 // :2718
  // SKIP  // :2719
  // SKIP ;快感に坦率、否定快感 // :2720
  // SKIP IF TALENT:70 // :2721
  // SKIP 	PLAY += 1 // :2722
  // SKIP ELSEIF TALENT:71 // :2723
  // SKIP 	PLAY -= 2 // :2724
  // SKIP ENDIF // :2725
  // SKIP  // :2726
  // SKIP ;看轻贞操、看重贞操 // :2727
  // SKIP IF TALENT:31 // :2728
  // SKIP 	PLAY += 1 // :2729
  // SKIP ELSEIF TALENT:30 // :2730
  // SKIP 	PLAY -= 2 // :2731
  // SKIP ENDIF // :2732
  // SKIP  // :2733
  // SKIP ;卖淫中毒によるボーナス // :2734
  // SKIP SIF ABL:37 > 0 // :2735
  // SKIP 	PLAY += ABL:37 // :2736
  // SKIP  // :2737
  // SKIP ;擅用舌头によるボーナス // :2738
  // SKIP SIF TALENT:擅用舌头 // :2739
  // SKIP 	PLAY += 1 // :2740
  // SKIP  // :2741
  // SKIP ;不怕污臭、反感污臭 // :2742
  // SKIP IF TALENT:不怕污臭 // :2743
  // SKIP 	PLAY += 1 // :2744
  // SKIP ELSEIF TALENT:反感污臭 // :2745
  // SKIP 	PLAY -= 2 // :2746
  // SKIP ENDIF // :2747
  // SKIP  // :2748
  // SKIP ;妓女によるボーナス // :2749
  // SKIP SIF TALENT:180 // :2750
  // SKIP 	PLAY += 1 // :2751
  // SKIP  // :2752
  // SKIP ;倾城によるボーナス // :2753
  // SKIP SIF TALENT:181 // :2754
  // SKIP 	PLAY += 2 // :2755
  // SKIP  // :2756
  // SKIP ;肉便器によるボーナス // :2757
  // SKIP SIF TALENT:204 // :2758
  // SKIP 	PLAY += 1 // :2759
  // SKIP  // :2760
  // SKIP ;正太控の場合、客が少年になる // :2761
  // SKIP IF TALENT:正太控 // :2762
  // SKIP 	MEN = 2 // :2763
  // SKIP 	PLAY += 1 // :2764
  // SKIP ENDIF // :2765
  // SKIP  // :2766
  // SKIP  // :2767
  // SKIP IF TALENT:315 == 5 // :2768
  // SKIP 	;元妓女の場合ボーナス // :2769
  // SKIP 	PLAY += 3 // :2770
  // SKIP ELSEIF TALENT:315 == 7 // :2771
  // SKIP 	;元物乞いの場合ボーナス // :2772
  // SKIP 	PLAY += 2 // :2773
  // SKIP ENDIF // :2774
  // SKIP  // :2775
  // SKIP ;善恶值による積極性 // :2776
  // SKIP IF CFLAG:151 > 150 // :2777
  // SKIP 	PLAY -= 3 // :2778
  // SKIP ELSEIF CFLAG:151 > 100 // :2779
  // SKIP 	PLAY -= 2 // :2780
  // SKIP ELSEIF CFLAG:151 > 50 // :2781
  // SKIP 	PLAY -= 1 // :2782
  // SKIP ELSEIF CFLAG:151 > 0 // :2783
  // SKIP 	;変動无 // :2784
  // SKIP ELSEIF CFLAG:151 > -50 // :2785
  // SKIP 	PLAY += 1 // :2786
  // SKIP ELSEIF CFLAG:151 > -100 // :2787
  // SKIP 	PLAY += 2 // :2788
  // SKIP ELSEIF CFLAG:151 > -150 // :2789
  // SKIP 	PLAY += 3 // :2790
  // SKIP ELSE // :2791
  // SKIP 	PLAY += 4 // :2792
  // SKIP ENDIF // :2793
  // SKIP  // :2794
  // SKIP ;借金による強制 // :2795
  // SKIP IF CFLAG:582 >= 0 // :2796
  // SKIP 	PLAY -= 3 // :2797
  // SKIP ELSEIF CFLAG:582 > -500 // :2798
  // SKIP 	PLAY -= 2 // :2799
  // SKIP ELSEIF CFLAG:582 > -1500 // :2800
  // SKIP 	PLAY -= 1 // :2801
  // SKIP ELSEIF CFLAG:582 > -2500 // :2802
  // SKIP 	;変動无 // :2803
  // SKIP ELSEIF CFLAG:582 > -3500 // :2804
  // SKIP 	PLAY += 1 // :2805
  // SKIP ELSEIF CFLAG:582 > -4500 // :2806
  // SKIP 	PLAY += 2 // :2807
  // SKIP ELSEIF CFLAG:582 > -6000 // :2808
  // SKIP 	PLAY += 3 // :2809
  // SKIP ELSEIF CFLAG:582 > -9000 // :2810
  // SKIP 	PLAY += 4 // :2811
  // SKIP ELSEIF CFLAG:582 > -12000 // :2812
  // SKIP 	PLAY += 5 // :2813
  // SKIP ELSEIF CFLAG:582 > -16000 // :2814
  // SKIP 	PLAY += 6 // :2815
  // SKIP ELSE // :2816
  // SKIP 	PLAY += 7 // :2817
  // SKIP ENDIF // :2818
  // SKIP  // :2819
  // SKIP ;回数が0以下になっていたら終了 // :2820
  // SKIP SIF PLAY <= 0 // :2821
  // SKIP 	RETURN 0 // :2822
  // SKIP  // :2823
  // SKIP DRAWLINE // :2824
  // SKIP  // :2825
  // SKIP IF TALENT:成为勇者前的生活 == 8 // :2826
  // SKIP 	;貴族 // :2827
  // SKIP 	PRINT 身为贵族的 // :2828
  // SKIP 	PAY += 20 // :2829
  // SKIP ELSEIF TALENT:成为勇者前的生活 == 12 // :2830
  // SKIP 	;聖女 // :2831
  // SKIP 	PRINT 身为圣女的 // :2832
  // SKIP 	PAY += 20 // :2833
  // SKIP ELSEIF TALENT:魅力点 == 23 // :2834
  // SKIP 	;大きな尻 // :2835
  // SKIP 	PRINT 拥有丰满臀部的 // :2836
  // SKIP 	PAY += 10 // :2837
  // SKIP ELSE // :2838
  // SKIP 	;特に何もない場合髪色 // :2839
  // SKIP 	PRINTFORM %GET_LOOK_INFO(TARGET, "头发颜色")%的 // :2840
  // SKIP ENDIF // :2841
  // SKIP  // :2842
  // SKIP PRINTFORM %SAVESTR:TARGET% // :2843
  // SKIP ;卖淫中毒か淫乱 // :2844
  // SKIP IF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :2845
  // SKIP 	PRINTFORM 无法压抑性欲，向 // :2846
  // SKIP ELSEIF CFLAG:582 < -4000 // :2847
  // SKIP 	PRINTFORM 债台高筑，向 // :2848
  // SKIP ELSE // :2849
  // SKIP 	PRINTFORM 冒险资金见底，向 // :2850
  // SKIP ENDIF // :2851
  // SKIP IF MEN == 0 // :2852
  // SKIP 	PRINT 村民 // :2853
  // SKIP ELSEIF MEN == 1 // :2854
  // SKIP 	PRINT 冒险者 // :2855
  // SKIP ELSEIF MEN == 2 // :2856
  // SKIP 	PRINT 村里少年 // :2857
  // SKIP 	;収入減 // :2858
  // SKIP 	PAY -= 10 // :2859
  // SKIP ELSEIF MEN == 3 // :2860
  // SKIP 	PRINT 街边暴发户 // :2861
  // SKIP 	;収入ボーナス // :2862
  // SKIP 	PAY += 20 // :2863
  // SKIP ELSE // :2864
  // SKIP 	PRINT 奸商 // :2865
  // SKIP ENDIF // :2866
  // SKIP IF PLAY <= 1 // :2867
  // SKIP PRINTFORML 卖嘴巴了…… // :2868
  // SKIP PRINTFORMW 在后巷里，吹了{PLAY}次箫…… // :2869
  // SKIP ELSE // :2870
  // SKIP PRINTFORML 卖嘴巴了， // :2871
  // SKIP PRINTFORMW %SAVESTR:TARGET%跪在地上將客人的陽具吞入口中，用舌頭仔細地舔舐著。頭突然被用手緊緊的按住，随后腥臭的精液在口中爆发了… // :2872
  // SKIP PRINTFORMW 还没等其缓过神来，另一位客人就将陽具继续插入，按着%SAVESTR:TARGET%的頭前後搖晃著套弄起來，胸部被肆意揉捏，空著的雙手則握著其他客人的陽具，為他們進行手淫奉仕… // :2873
  // SKIP PRINTFORMW 在粗重的喘息声中，客人们陆续射精，%SAVESTR:TARGET%的双手和乳房都沾满了白浊腥臭的精液，更多的精液沿著%SAVESTR:TARGET%的嘴角垂流而下… // :2874
  // SKIP PRINTFORMW %SAVESTR:TARGET%的全身都沾滿了髒亂腥臭的精液。行為結束後的客人們把肉棒貼近%SAVESTR:TARGET%，命令她自己用嘴把肉棒上殘留的污垢舔舐乾淨… // :2875
  // SKIP PRINTFORMW 客人們終於滿足了之後，留下嫖资將%SAVESTR:TARGET%放置在原地陸續離開了… // :2876
  // SKIP ENDIF // :2877
  // SKIP PRINTFORML %EXPNAME:22%＋{PLAY} // :2878
  // SKIP PRINTFORML %EXPNAME:20%＋{PLAY} // :2879
  // SKIP PRINTFORML %EXPNAME:74%＋{PLAY} // :2880
  // SKIP PRINTFORMW %PALAMNAME:7%点数＋{PLAY} // :2881
  // SKIP IF TALENT:反感污臭 // :2882
  // SKIP 	;苦痛 // :2883
  // SKIP 	PRINTFORMW %PALAMNAME:9%点数＋{PLAY} // :2884
  // SKIP 	JUEL:9 += PLAY // :2885
  // SKIP ENDIF // :2886
  // SKIP EXP:口交经验 += PLAY // :2887
  // SKIP EXP:精液经验 += PLAY // :2888
  // SKIP EXP:74 += PLAY // :2889
  // SKIP JUEL:7 += PLAY // :2890
  // SKIP  // :2891
  // SKIP PAY += PLAY * 250 // :2892
  // SKIP SIF PAY <= 0 // :2893
  // SKIP 	PAY = 1 // :2894
  // SKIP PRINTFORMW %SAVESTR:TARGET%获得了{PAY}点的金钱以及经验值。 // :2895
  // SKIP EXP:80 += PAY // :2896
  // SKIP CFLAG:580 += PAY // :2897
  // SKIP  // :2898
  // SKIP PRINTW (善恶值减少:-1) // :2899
  // SKIP CALL KARMA, TARGET, -1 // :2900
  // SKIP  // :2901
  // SKIP RETURN 1 // :2902
  // SKIP  // :2903
  // SKIP ;-------------------------------- // :2904
  // SKIP @HEROINE_ANIMAL_SHOW // :2905
  // SKIP #DIM PLAY // :2906
  // SKIP #DIM PAY // :2907
  // SKIP ;-------------------------------- // :2908
  // SKIP ;兽奸ショー出演 // :2909
  // SKIP  // :2910
  // SKIP ;調教対象が空だとダメ // :2911
  // SKIP SIF TARGET < 0 // :2912
  // SKIP 	RETURN 0 // :2913
  // SKIP  // :2914
  // SKIP ;ITEM:野良犬がないとダメ // :2915
  // SKIP ;魔王様の犬とは違う犬だけど // :2916
  // SKIP ;性癖フィルター用に // :2917
  // SKIP SIF ITEM:22 == 0 // :2918
  // SKIP 	RETURN 0 // :2919
  // SKIP  // :2920
  // SKIP ;処女だとダメ // :2921
  // SKIP SIF TALENT:0  // :2922
  // SKIP 	RETURN 0 // :2923
  // SKIP  // :2924
  // SKIP ;貞操帯だとダメ // :2925
  // SKIP SIF CFLAG:42 == 79 && (CFLAG:40 & 64) // :2926
  // SKIP 	RETURN 0 // :2927
  // SKIP  // :2928
  // SKIP ;瀕死だとダメ // :2929
  // SKIP SIF BASE:0 < 500 // :2930
  // SKIP 	RETURN 0 // :2931
  // SKIP  // :2932
  // SKIP PLAY = -3 // :2933
  // SKIP  // :2934
  // SKIP ;兽奸中毒 // :2935
  // SKIP IF ABL:39 == 0 // :2936
  // SKIP 	PLAY -= 2 // :2937
  // SKIP ELSEIF ABL:39 == 1 // :2938
  // SKIP 	PLAY -= 1 // :2939
  // SKIP ELSEIF ABL:39 == 2 // :2940
  // SKIP 	PLAY += 0 // :2941
  // SKIP ELSEIF ABL:39 == 3 // :2942
  // SKIP 	PLAY += 1 // :2943
  // SKIP ELSEIF ABL:39 == 4 // :2944
  // SKIP 	PLAY += 2 // :2945
  // SKIP ELSEIF ABL:39 == 5 // :2946
  // SKIP 	PLAY += 3 // :2947
  // SKIP ELSEIF ABL:39 >= 6 // :2948
  // SKIP 	PLAY += 4 // :2949
  // SKIP ENDIF // :2950
  // SKIP  // :2951
  // SKIP ;動物耳で欲望ＬＶ３以上 // :2952
  // SKIP SIF TALENT:124 && ABL:11 >= 3 // :2953
  // SKIP 	PLAY += 1 // :2954
  // SKIP  // :2955
  // SKIP ;かわいい動物が好きで欲望ＬＶ４以上 // :2956
  // SKIP SIF  TALENT:317 == 12 && ABL:11 >= 4 // :2957
  // SKIP 	PLAY += 1 // :2958
  // SKIP  // :2959
  // SKIP ;兽奸経験が50以上 // :2960
  // SKIP SIF EXP:56 >= 50 // :2961
  // SKIP 	PLAY += 2 // :2962
  // SKIP  // :2963
  // SKIP ;欲望ＬＶ５以上露出癖４以上で+1（下と合わせて+2） // :2964
  // SKIP SIF ABL:11 >= 5 && ABL:17 >= 4 // :2965
  // SKIP 	PLAY += 1 // :2966
  // SKIP ;欲望ＬＶ４以上露出癖３以上で+1 // :2967
  // SKIP SIF ABL:11 >= 4 && ABL:17 >= 3 // :2968
  // SKIP 	PLAY += 1 // :2969
  // SKIP  // :2970
  // SKIP ;牝犬によるボーナス // :2971
  // SKIP SIF TALENT:136 // :2972
  // SKIP 	PLAY += 2 // :2973
  // SKIP  // :2974
  // SKIP ;カルマによる積極性 // :2975
  // SKIP IF CFLAG:151 > 150 // :2976
  // SKIP 	PLAY -= 3 // :2977
  // SKIP ELSEIF CFLAG:151 > 100 // :2978
  // SKIP 	PLAY -= 2 // :2979
  // SKIP ELSEIF CFLAG:151 > 50 // :2980
  // SKIP 	PLAY -= 1 // :2981
  // SKIP ELSEIF CFLAG:151 > 0 // :2982
  // SKIP 	;変動なし // :2983
  // SKIP ELSEIF CFLAG:151 > -50 // :2984
  // SKIP 	PLAY += 1 // :2985
  // SKIP ELSEIF CFLAG:151 > -100 // :2986
  // SKIP 	PLAY += 2 // :2987
  // SKIP ELSEIF CFLAG:151 > -150 // :2988
  // SKIP 	PLAY += 3 // :2989
  // SKIP ELSE // :2990
  // SKIP 	PLAY += 4 // :2991
  // SKIP ENDIF // :2992
  // SKIP  // :2993
  // SKIP ;借金による強制 // :2994
  // SKIP IF CFLAG:582 >= 0 // :2995
  // SKIP 	PLAY -= 3 // :2996
  // SKIP ELSEIF CFLAG:582 > -1000 // :2997
  // SKIP 	PLAY -= 2 // :2998
  // SKIP ELSEIF CFLAG:582 > -2000 // :2999
  // SKIP 	PLAY -= 1 // :3000
  // SKIP ELSEIF CFLAG:582 > -3000 // :3001
  // SKIP 	;変動なし // :3002
  // SKIP ELSEIF CFLAG:582 > -4000 // :3003
  // SKIP 	PLAY += 1 // :3004
  // SKIP ELSEIF CFLAG:582 > -6000 // :3005
  // SKIP 	PLAY += 2 // :3006
  // SKIP ELSEIF CFLAG:582 > -8000 // :3007
  // SKIP 	PLAY += 3 // :3008
  // SKIP ELSEIF CFLAG:582 > -11000 // :3009
  // SKIP 	PLAY += 4 // :3010
  // SKIP ELSEIF CFLAG:582 > -15000 // :3011
  // SKIP 	PLAY += 6 // :3012
  // SKIP ELSEIF CFLAG:582 > -20000 // :3013
  // SKIP 	PLAY += 8 // :3014
  // SKIP ELSEIF CFLAG:582 > -25000 // :3015
  // SKIP 	PLAY += 10 // :3016
  // SKIP ELSE // :3017
  // SKIP 	PLAY += 12 // :3018
  // SKIP ENDIF // :3019
  // SKIP  // :3020
  // SKIP  // :3021
  // SKIP ;回数が0以下なら終了 // :3022
  // SKIP SIF PLAY <= 0 // :3023
  // SKIP 	RETURN 0 // :3024
  // SKIP  // :3025
  // SKIP ;プライド低い、解放、動物耳によるボーナス // :3026
  // SKIP SIF TALENT:17 // :3027
  // SKIP 	PLAY += 1 // :3028
  // SKIP SIF TALENT:33 // :3029
  // SKIP 	PLAY += 1 // :3030
  // SKIP SIF TALENT:124 // :3031
  // SKIP 	PLAY += 1 // :3032
  // SKIP  // :3033
  // SKIP ;プライド高い、自制心、抑圧、汚臭敏感によるペナルティ // :3034
  // SKIP SIF TALENT:15 // :3035
  // SKIP 	PLAY -= 1 // :3036
  // SKIP SIF TALENT:20 // :3037
  // SKIP 	PLAY -= 1 // :3038
  // SKIP SIF TALENT:32 // :3039
  // SKIP 	PLAY -= 1 // :3040
  // SKIP SIF TALENT:62 && TALENT:64 == 0 // :3041
  // SKIP 	PLAY -= 2 // :3042
  // SKIP  // :3043
  // SKIP ;快感に素直、快感の否定 // :3044
  // SKIP IF TALENT:70 // :3045
  // SKIP 	PLAY += 1 // :3046
  // SKIP ELSEIF TALENT:71 // :3047
  // SKIP 	PLAY -= 2 // :3048
  // SKIP ENDIF // :3049
  // SKIP  // :3050
  // SKIP ;淫乱によるボーナス // :3051
  // SKIP SIF TALENT:76 // :3052
  // SKIP 	PLAY += 1 // :3053
  // SKIP  // :3054
  // SKIP ;牝犬によるボーナスその２ // :3055
  // SKIP SIF TALENT:136 // :3056
  // SKIP 	TIMES PLAY , 1.50 // :3057
  // SKIP  // :3058
  // SKIP ;回数が0以下になっていたら終了 // :3059
  // SKIP SIF PLAY <= 0 // :3060
  // SKIP 	RETURN 0 // :3061
  // SKIP  // :3062
  // SKIP DRAWLINE // :3063
  // SKIP IF TALENT:成为勇者前的生活 == 8 // :3064
  // SKIP 	;貴族 // :3065
  // SKIP 	PRINT 身为贵族的 // :3066
  // SKIP ELSEIF TALENT:成为勇者前的生活 == 12 // :3067
  // SKIP 	;聖女 // :3068
  // SKIP 	PRINT 身为圣女的 // :3069
  // SKIP ELSEIF TALENT:魅力点 == 23 // :3070
  // SKIP 	;大きな尻 // :3071
  // SKIP 	PRINT 拥有丰满臀部的 // :3072
  // SKIP ELSE // :3073
  // SKIP 	;特に何もない場合髪色 // :3074
  // SKIP 	PRINTFORM %GET_LOOK_INFO(TARGET, "头发颜色")%的 // :3075
  // SKIP ENDIF // :3076
  // SKIP  // :3077
  // SKIP PRINTFORM %SAVESTR:TARGET% // :3078
  // SKIP  // :3079
  // SKIP IF TALENT:136 // :3080
  // SKIP 	;牝犬 // :3081
  // SKIP 	PRINTFORM 无法抑制兽奸的欲望， // :3082
  // SKIP ELSEIF ABL:TARGET:37 == 1 || TALENT:TARGET:76 == 1 // :3083
  // SKIP 	;売春中毒か淫乱 // :3084
  // SKIP 	PRINTFORM 无法压抑性欲， // :3085
  // SKIP ELSEIF CFLAG:582 < -4000 // :3086
  // SKIP 	PRINTFORM 债台高筑， // :3087
  // SKIP ELSE // :3088
  // SKIP 	PRINTFORM 冒险资金见底， // :3089
  // SKIP ENDIF // :3090
  // SKIP PRINTFORML 出演了兽奸秀………… // :3091
  // SKIP PRINTFORMW 在观众的面前和狗交配了{PLAY}次。 // :3092
  // SKIP ;兽奸経験 // :3093
  // SKIP PRINTFORML %EXPNAME:56%＋{PLAY} // :3094
  // SKIP EXP:56 += PLAY // :3095
  // SKIP IF TALENT:TARGET:122 // :3096
  // SKIP 	PRINTFORML %EXPNAME:1%＋{PLAY} // :3097
  // SKIP 	EXP:1 += PLAY // :3098
  // SKIP ELSE // :3099
  // SKIP 	PRINTFORML %EXPNAME:0%＋{PLAY} // :3100
  // SKIP 	EXP:0 += PLAY // :3101
  // SKIP ENDIF // :3102
  // SKIP PRINTFORML %EXPNAME:5%＋{PLAY} // :3103
  // SKIP EXP:5 += PLAY // :3104
  // SKIP  // :3105
  // SKIP ;珠経験 // :3106
  // SKIP IF TALENT:TARGET:122 // :3107
  // SKIP 	PRINTFORML %PALAMNAME:2%点数＋{PLAY*200} // :3108
  // SKIP 	JUEL:2 += PLAY*200 // :3109
  // SKIP ELSE // :3110
  // SKIP 	PRINTFORML %PALAMNAME:1%点数＋{PLAY*200} // :3111
  // SKIP 	JUEL:1 += PLAY*200 // :3112
  // SKIP ENDIF // :3113
  // SKIP PRINTFORML %PALAMNAME:6%点数＋{PLAY*300} // :3114
  // SKIP PRINTFORMW %PALAMNAME:8%点数＋{PLAY*200} // :3115
  // SKIP  // :3116
  // SKIP JUEL:6 += PLAY*300 // :3117
  // SKIP JUEL:8 += PLAY*200 // :3118
  // SKIP  // :3119
  // SKIP PAY += PLAY * 5000 // :3120
  // SKIP SIF PAY <= 0 // :3121
  // SKIP 	PAY = 1 // :3122
  // SKIP PRINTFORMW %SAVESTR:TARGET%获得了{PAY}点金钱及{PLAY * 100}点经验值。 // :3123
  // SKIP EXP:80 += PLAY * 100 // :3124
  // SKIP CFLAG:580 += PAY // :3125
  // SKIP  // :3126
  // SKIP PRINTW (善恶值减少:-2) // :3127
  // SKIP CALL KARMA, TARGET, -2 // :3128
  // SKIP  // :3129
  // SKIP RETURN 1 // :3130
  // SKIP  // :3131
  // SKIP [SKIPEND] // :3132



}

// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====
// 1. :3 函数参数 @DUNGEON_BITCH(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 2. :5 未知语句 #LOCALSIZE 1
// 3. :6 未知语句 #LOCALSSIZE 1
// 4. :12 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "DUNGEON") —— 局部/自定义变量，人工映射
// 5. :13 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") —— 局部/自定义变量，人工映射
// 6. :27 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 7. :28 CALL LOG_TRY_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
// 8. :29 CALL SELL_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
// 9. :34 RAND RAND(1, 16) → 1 + rand_n(16 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 10. :36 CALL DUNGEON_ANIMAL(ARG) —— 口上文件里多为存根调用，人工定存根名
// 11. :40 RAND RAND:36 → rand_n(36)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 12. :42 CALL SELF_BITCH(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
// 13. :47 CALL DUNGEON_WORK(ARG) —— 口上文件里多为存根调用，人工定存根名
// 14. :53 函数参数 @HEROINE_BITCH(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 15. :55 未知语句 #LOCALSIZE 1
// 16. :56 未知语句 #LOCALSSIZE 1
// 17. :62 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", "TOWN") —— 局部/自定义变量，人工映射
// 18. :63 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") —— 局部/自定义变量，人工映射
// 19. :69 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 20. :70 CALL LOG_TRY_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
// 21. :71 CALL SELL_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
// 22. :76 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 23. :77 CALL 强制肉偿(ARG) —— 口上文件里多为存根调用，人工定存根名
// 24. :79 RAND RAND:36 → rand_n(36)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 25. :81 CALL SELF_BITCH(ARG, "TOWN") —— 口上文件里多为存根调用，人工定存根名
// 26. :97 函数参数 @SELL_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
// 27. :98 未知语句 #LOCALSIZE 1
// 28. :99 未知语句 #LOCALSSIZE 1
// 29. :113 变量语义 KYAKU = FI_CULC_BITCH(ARG, "KYAKU", PLACE) —— 局部/自定义变量，人工映射
// 30. :116 未知语句 VARSET PLAY
// 31. :117 未知语句 VARSET MAN
// 32. :118 未知语句 VARSET GIRL
// 33. :119 未知语句 VARSET CHECK
// 34. :123 未知语句 FOR LCOUNT, 0, 100
// 35. :124 变量语义 PREV_EXP:LCOUNT = EXP:ARG:LCOUNT —— 局部/自定义变量，人工映射
// 36. :125 未知语句 NEXT
// 37. :126 未知语句 FOR LCOUNT, 0, 20
// 38. :127 变量语义 PREV_JUEL:LCOUNT = JUEL:ARG:LCOUNT —— 局部/自定义变量，人工映射
// 39. :128 未知语句 NEXT
// 40. :129 变量语义 PREV_KARMA = CFLAG:ARG:151 —— 局部/自定义变量，人工映射
// 41. :132 未知语句 SETBIT CHECK, 0
// 42. :135 变量语义 PREV_MONEY = CFLAG:ARG:580 —— 局部/自定义变量，人工映射
// 43. :137 变量语义 PREV_MONEY = MONEY —— 局部/自定义变量，人工映射
// 44. :140 变量语义 PREV_MONEY = CFLAG:ARG:580 —— 局部/自定义变量，人工映射
// 45. :144 未知语句 FOR LCOUNT, 0, KYAKU
// 46. :146 变量语义 SEIKOU = FI_CULC_BITCH(ARG, "SEIKOU", PLACE) —— 局部/自定义变量，人工映射
// 47. :147 变量语义 SIPPAI = FI_CULC_BITCH(ARG, "SIPPAI", PLACE) —— 局部/自定义变量，人工映射
// 48. :148 RAND RAND:(SEIKOU + SIPPAI) → rand_n(SEIKOU + SIPPAI)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 49. :149 未知语句 CONTINUE
// 50. :152 变量语义 LOCAL = FI_TRY_BITCH(ARG, PLACE) —— 局部/自定义变量，人工映射
// 51. :157 未知语句 CONTINUE
// 52. :159 变量语义 LOCALS = %FS_BITCH("PLAY", LOCAL)% —— 局部/自定义变量，人工映射
// 53. :163 未知语句 CONTINUE
// 54. :167 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", LOCALS) —— 局部/自定义变量，人工映射
// 55. :168 变量语义 PLAY:LOCAL + = PLAY —— 局部/自定义变量，人工映射
// 56. :169 未知语句 SETBIT CHECK, LOCAL
// 57. :172 CALL PROFIT_BITCH(ARG, PLACE, LOCALS, PLAY) —— 口上文件里多为存根调用，人工定存根名
// 58. :176 变量语义 MAN = RESULT:1 —— 局部/自定义变量，人工映射
// 59. :177 未知语句 MAN:MAN ++
// 60. :178 未知语句 SETBIT CHECK, (10 + MAN)
// 61. :181 变量语义 GIRL = RESULT:1 —— 局部/自定义变量，人工映射
// 62. :182 未知语句 GIRL:GIRL ++
// 63. :183 未知语句 SETBIT CHECK, (20 + GIRL)
// 64. :186 CALL EXP_BITCH(ARG, PLACE, LOCALS, PLAY) —— 口上文件里多为存根调用，人工定存根名
// 65. :188 未知语句 NEXT
// 66. :191 变量语义 PLAY = 0 —— 局部/自定义变量，人工映射
// 67. :192 变量语义 PLAY = SUMARRAY(PLAY) —— 局部/自定义变量，人工映射
// 68. :198 变量语义 MAN = 0 —— 局部/自定义变量，人工映射
// 69. :199 变量语义 MAN = SUMARRAY(MAN) —— 局部/自定义变量，人工映射
// 70. :200 变量语义 GIRL = 0 —— 局部/自定义变量，人工映射
// 71. :201 变量语义 GIRL = SUMARRAY(GIRL) —— 局部/自定义变量，人工映射
// 72. :205 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 73. :206 未知语句 VARSET LOCALS
// 74. :208 变量语义 LOCALS = %FS_LOG_BITCH("DUNGEON_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% —— 局部/自定义变量，人工映射
// 75. :212 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 76. :215 变量语义 LOCALS = %FS_LOG_BITCH("DUNGEON_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% —— 局部/自定义变量，人工映射
// 77. :217 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 78. :219 变量语义 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% —— 局部/自定义变量，人工映射
// 79. :220 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 80. :223 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 81. :224 未知语句 VARSET LOCALS
// 82. :225 数组元素 PLAY:6 —— 局部数组元素（#DIM PLAY），JS 侧用 play[6] 访问，人工核
// 83. :229 变量语义 LOCALS = %FS_LOG_BITCH("TOWN_MAN", MAN:1, MAN:2, MAN:3, MAN:4, MAN:5)% —— 局部/自定义变量，人工映射
// 84. :232 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 85. :235 变量语义 LOCALS = %FS_LOG_BITCH("TOWN_GIRL", GIRL:1, GIRL:2, GIRL:3, GIRL:4, GIRL:5)% —— 局部/自定义变量，人工映射
// 86. :237 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 87. :239 变量语义 LOCALS = %FS_LOG_BITCH("PLAYNAME", PLAY:1, PLAY:2, PLAY:3, PLAY:4, PLAY:5)% —— 局部/自定义变量，人工映射
// 88. :240 插值 未知插值 %LOCALS% —— 保真锁会红，须人工定归一
// 89. :241 数组元素 PLAY:6 —— 局部数组元素（#DIM PLAY），JS 侧用 play[6] 访问，人工核
// 90. :247 变量语义 LOCAL = -1 * PLAY —— 局部/自定义变量，人工映射
// 91. :248 CALL KARMA, ARG, LOCAL —— 口上文件里多为存根调用，人工定存根名
// 92. :250 CALL LOG_AFTER_BITCH(ARG, CHECK) —— 口上文件里多为存根调用，人工定存根名
// 93. :253 未知语句 FOR LCOUNT, 0, 100
// 94. :254 数组元素 PREV_EXP:LCOUNT —— 局部数组元素（#DIM PREV_EXP），JS 侧用 prev_exp[lcount] 访问，人工核
// 95. :255 未知语句 CONTINUE
// 96. :256 插值 未知插值 %EXPNAME:LCOUNT, 16, RIGHT% —— 保真锁会红，须人工定归一
// 97. :257 未知语句 NEXT
// 98. :258 未知语句 FOR LCOUNT, 0, 20
// 99. :259 数组元素 PREV_JUEL:LCOUNT —— 局部数组元素（#DIM PREV_JUEL），JS 侧用 prev_juel[lcount] 访问，人工核
// 100. :260 未知语句 CONTINUE
// 101. :261 插值 未知插值 %PALAMNAME:LCOUNT, 12, RIGHT% —— 保真锁会红，须人工定归一
// 102. :262 未知语句 NEXT
// 103. :263 未知语句 WAIT
// 104. :268 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 105. :271 变量语义 LOCAL = CFLAG:ARG:580 - PREV_MONEY —— 局部/自定义变量，人工映射
// 106. :272 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 107. :275 变量语义 LOCAL = MONEY - PREV_MONEY —— 局部/自定义变量，人工映射
// 108. :277 变量语义 LOCAL = LOCAL/10*9 —— 局部/自定义变量，人工映射
// 109. :278 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 110. :280 变量语义 LOCAL = LOCAL/10*9 —— 局部/自定义变量，人工映射
// 111. :281 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 112. :284 未知语句 LOCAL /= 2 + 1
// 113. :285 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 114. :287 未知语句 LOCAL /= 2
// 115. :288 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 116. :291 变量语义 MONEY -= LOCAL —— 局部/自定义变量，人工映射
// 117. :296 变量语义 LOCAL = CFLAG:ARG:580 - PREV_MONEY —— 局部/自定义变量，人工映射
// 118. :298 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 119. :301 变量语义 LOCAL = PREV_KARMA - CFLAG:ARG:151 —— 局部/自定义变量，人工映射
// 120. :308 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 121. :315 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 122. :321 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 123. :334 函数参数 @EXP_BITCH(ARG, PLACE, TYPE, PLAY) —— 参数声明已剥（JS 函数签名人工定）
// 124. :335 未知语句 #LOCALSIZE 1
// 125. :336 未知语句 #LOCALSSIZE 1
// 126. :420 函数参数 @PROFIT_BITCH(ARG, PLACE, TYPE, PLAY) —— 参数声明已剥（JS 函数签名人工定）
// 127. :421 未知语句 #LOCALSIZE 1
// 128. :422 未知语句 #LOCALSSIZE 1
// 129. :433 变量语义 PAY = (FI_CULC_BITCH(ARG, "RATE", TYPE) + CFLAG:ARG:501) * FI_CULC_BITCH(ARG, "RATE", "KARMA") / 5 —— 局部/自定义变量，人工映射
// 130. :436 变量语义 PAY = 5 * (1 + CFLAG:ARG:501 + FI_CULC_BITCH(ARG, "RATE", TYPE)) —— 局部/自定义变量，人工映射
// 131. :439 变量语义 PAY = FI_CULC_BITCH(ARG, "RATE", "KARMA") * FI_CULC_BITCH(ARG, "RATE", TYPE) / 5 —— 局部/自定义变量，人工映射
// 132. :447 变量语义 GIRL = RAND(1, 6) —— 局部/自定义变量，人工映射
// 133. :450 变量语义 PAY -= 10 —— 局部/自定义变量，人工映射
// 134. :452 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
// 135. :455 变量语义 MAN = RAND(1, 6) —— 局部/自定义变量，人工映射
// 136. :458 变量语义 PAY -= 10 —— 局部/自定义变量，人工映射
// 137. :460 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
// 138. :465 变量语义 PAY += 10 —— 局部/自定义变量，人工映射
// 139. :468 变量语义 PAY += 5 —— 局部/自定义变量，人工映射
// 140. :470 变量语义 PAY = PAY * PLAY —— 局部/自定义变量，人工映射
// 141. :478 变量语义 MONEY += PAY —— 局部/自定义变量，人工映射
// 142. :497 函数参数 @DUNGEON_WORK(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 143. :498 未知语句 #LOCALSIZE 1
// 144. :499 未知语句 #LOCALSSIZE 1
// 145. :500 变量语义 LOCAL = (CFLAG:ARG:9 * 20) + 100 —— 局部/自定义变量，人工映射
// 146. :502 未知语句 LOCAL /= 10
// 147. :504 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 148. :506 未知语句 DATAFORM 研磨宝石的
// 149. :507 未知语句 DATAFORM 制作工艺品的
// 150. :508 未知语句 DATAFORM 抄写书籍的
// 151. :509 未知语句 DATAFORM 制作手工的
// 152. :510 未知语句 ENDDATA
// 153. :513 变量语义 MONEY += LOCAL —— 局部/自定义变量，人工映射
// 154. :519 函数参数 @DUNGEON_ANIMAL(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 155. :520 未知语句 #LOCALSIZE 1
// 156. :521 未知语句 #LOCALSSIZE 1
// 157. :523 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", "ANIMAL") —— 局部/自定义变量，人工映射
// 158. :524 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 159. :526 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 160. :526 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 161. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 162. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 163. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 164. :530 CALL LOG_BITCH_ANIMAL(ARG, "DUNGEON") —— 口上文件里多为存根调用，人工定存根名
// 165. :531 未知语句 WAIT
// 166. :534 插值 未知插值 %EXPNAME:56% —— 保真锁会红，须人工定归一
// 167. :535 插值 未知插值 %EXPNAME:0% —— 保真锁会红，须人工定归一
// 168. :536 插值 未知插值 %EXPNAME:5% —— 保真锁会红，须人工定归一
// 169. :542 插值 未知插值 %PALAMNAME:1% —— 保真锁会红，须人工定归一
// 170. :543 插值 未知插值 %PALAMNAME:6% —— 保真锁会红，须人工定归一
// 171. :544 插值 未知插值 %PALAMNAME:8% —— 保真锁会红，须人工定归一
// 172. :549 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 173. :553 变量语义 LOCAL = -1 * PLAY —— 局部/自定义变量，人工映射
// 174. :555 CALL KARMA, ARG, LOCAL —— 口上文件里多为存根调用，人工定存根名
// 175. :560 函数参数 @SELF_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
// 176. :561 未知语句 #LOCALSIZE 1
// 177. :562 未知语句 #LOCALSSIZE 1
// 178. :565 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 179. :566 变量语义 PLAY = FI_CULC_BITCH(ARG, "PLAY", "SELF") —— 局部/自定义变量，人工映射
// 180. :570 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 181. :572 变量语义 LOCAL = 1 —— 局部/自定义变量，人工映射
// 182. :574 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 183. :574 表达式寻址 ITEM:22 → era.get('item:22')——族名直译，语义与归属人工定
// 184. :576 变量语义 LOCAL = 2 —— 局部/自定义变量，人工映射
// 185. :579 RAND RAND(1, 40) → 1 + rand_n(40 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 186. :581 未知语句 DATAFORM 想起%CALLNAME:MASTER%的事
// 187. :582 未知语句 DATAFORM 一次次呼唤着%CALLNAME:MASTER%的名字
// 188. :583 未知语句 DATAFORM 想起了上次的调教
// 189. :584 未知语句 DATAFORM 想象着下一次的调教
// 190. :585 未知语句 ENDDATA
// 191. :586 变量语义 LOCAL = 3 —— 局部/自定义变量，人工映射
// 192. :589 RAND RAND(1, 5) → 1 + rand_n(5 - 1)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 193. :591 未知语句 DATAFORM 如饥似渴，一副十分想要的样子
// 194. :592 未知语句 DATAFORM 无法满足的欲望，心情变得十分急躁
// 195. :593 未知语句 DATAFORM 不自觉地张开着嘴巴
// 196. :594 未知语句 DATAFORM 根本不在意口水滴落下来的样子
// 197. :595 未知语句 DATAFORM 根本不在意口水流下来的样子
// 198. :596 未知语句 DATAFORM 一脸恍惚的样子
// 199. :597 未知语句 DATAFORM 一脸沉浸在欲望中的快乐表情
// 200. :598 未知语句 DATAFORM 红晕慢慢爬上了脸颊
// 201. :599 未知语句 DATAFORM 欲望高涨，身体如同火烧一般
// 202. :600 未知语句 DATAFORM 呆滞的眼神
// 203. :601 未知语句 DATAFORM 充满情欲的眼睛，变得水汪汪的
// 204. :602 未知语句 DATAFORM 突然将双腿张开
// 205. :603 未知语句 DATAFORM 身体一颤一颤的
// 206. :604 未知语句 DATAFORM 将股间张得大大的
// 207. :605 未知语句 DATAFORM 不知不觉的扭动着腰肢
// 208. :606 未知语句 DATAFORM 欲求不满的摇动着腰肢
// 209. :607 未知语句 DATAFORM 腰部下流的扭动着
// 210. :608 未知语句 DATAFORM 仰起喉咙
// 211. :609 未知语句 DATAFORM 时不时从嘴边发出呻吟
// 212. :610 未知语句 DATAFORM 爱液浸湿了床具
// 213. :611 未知语句 DATAFORM 涂满了溢出来的爱液
// 214. :612 未知语句 DATAFORM 十分粗野的撕扯着衣服，双乳若隐若现
// 215. :613 未知语句 DATAFORM 挣扎在绝顶的边缘
// 216. :614 未知语句 ENDDATA
// 217. :615 变量语义 LOCAL = 4 —— 局部/自定义变量，人工映射
// 218. :619 未知语句 DATAFORM 努力地忍住声音
// 219. :620 未知语句 DATAFORM 拼命地将气息憋住
// 220. :621 未知语句 DATAFORM 注意着周围的动静
// 221. :622 未知语句 DATAFORM 想着要停下来也...
// 222. :623 未知语句 DATAFORM 用踌躇的动作
// 223. :624 未知语句 DATAFORM 迷惑地将手指重合了起来
// 224. :625 未知语句 DATAFORM 牢牢地将嘴唇重合起来
// 225. :626 未知语句 DATAFORM 懒洋洋地低下了头
// 226. :627 未知语句 DATAFORM 烦恼地皱了皱眉头
// 227. :628 未知语句 ENDDATA
// 228. :629 变量语义 LOCAL = 5 —— 局部/自定义变量，人工映射
// 229. :640 CALL LOG_BITCH_SELF(ARG, PLACE, LOCAL) —— 口上文件里多为存根调用，人工定存根名
// 230. :641 未知语句 WAIT
// 231. :644 插值 未知插值 %EXPNAME:10% —— 保真锁会红，须人工定归一
// 232. :651 插值 未知插值 %PALAMNAME:0% —— 保真锁会红，须人工定归一
// 233. :653 插值 未知插值 %PALAMNAME:4% —— 保真锁会红，须人工定归一
// 234. :654 插值 未知插值 %PALAMNAME:5% —— 保真锁会红，须人工定归一
// 235. :662 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 236. :665 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 237. :673 函数参数 @FI_TRY_BITCH(ARG, PLACE) —— 参数声明已剥（JS 函数签名人工定）
// 238. :678 未知语句 VARSET PLAY
// 239. :681 未知语句 FOR LCOUNT, 1, 7
// 240. :682 变量语义 LOCALS = %FS_BITCH("PLAY", LCOUNT)% —— 局部/自定义变量，人工映射
// 241. :683 变量语义 PLAY:LCOUNT = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) —— 局部/自定义变量，人工映射
// 242. :685 变量语义 PLAY:LCOUNT + = FI_CULC_BITCH(ARG, "RATE", "KARMA") / FI_CULC_BITCH(ARG, "RATE", LOCALS) —— 局部/自定义变量，人工映射
// 243. :688 变量语义 PLAY:LCOUNT = 0 —— 局部/自定义变量，人工映射
// 244. :689 未知语句 NEXT
// 245. :691 变量语义 PLAY:0 = SUMARRAY(PLAY) + FI_CULC_BITCH(ARG, "SIPPAI", "TOWN") —— 局部/自定义变量，人工映射
// 246. :694 未知语句 FOR LCOUNT, 1, 6
// 247. :695 变量语义 LOCALS = %FS_BITCH("PLAY", LCOUNT)% —— 局部/自定义变量，人工映射
// 248. :696 变量语义 PLAY:LCOUNT = FI_CULC_BITCH(ARG, "KAKURITU", LOCALS) —— 局部/自定义变量，人工映射
// 249. :699 变量语义 PLAY:LCOUNT = 0 —— 局部/自定义变量，人工映射
// 250. :700 未知语句 NEXT
// 251. :701 变量语义 PLAY:0 = SUMARRAY(PLAY) —— 局部/自定义变量，人工映射
// 252. :705 变量语义 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") / MAX(1, ABL:ARG:10) —— 局部/自定义变量，人工映射
// 253. :707 变量语义 PLAY:0 + = FI_CULC_BITCH(ARG, "SIPPAI", "DUNGEON") —— 局部/自定义变量，人工映射
// 254. :712 变量语义 PLAY = 1 —— 局部/自定义变量，人工映射
// 255. :714 变量语义 LOCAL = RAND:PLAY —— 局部/自定义变量，人工映射
// 256. :715 未知语句 FOR LCOUNT, 1, 7
// 257. :716 数组元素 PLAY:LCOUNT —— 局部数组元素（#DIM PLAY），JS 侧用 play[lcount] 访问，人工核
// 258. :717 未知语句 RETURNF LCOUNT
// 259. :718 变量语义 LOCAL -= PLAY:LCOUNT —— 局部/自定义变量，人工映射
// 260. :719 未知语句 NEXT
// 261. :720 未知语句 RETURNF 0
// 262. :727 函数参数 @FI_CULC_BITCH(ARG, ARGS, ARGS:1) —— 参数声明已剥（JS 函数签名人工定）
// 263. :729 未知语句 #LOCALSIZE 1
// 264. :730 未知语句 #LOCALSSIZE 1
// 265. :740 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 266. :741 变量语义 LOCAL = 250 + CFLAG:ARG:151 —— 局部/自定义变量，人工映射
// 267. :742 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 268. :743 变量语义 LOCAL = 250 + CFLAG:ARG:151 —— 局部/自定义变量，人工映射
// 269. :745 未知语句 THROW 未知的文字%ARGS:1%
// 270. :748 未知语句 LOCAL /= (1 + ABL:ARG:37)
// 271. :751 未知语句 TIMES LOCAL, 0.7
// 272. :754 未知语句 TIMES LOCAL, 0.5
// 273. :756 未知语句 TIMES LOCAL, 0.7
// 274. :761 变量语义 LOCAL += 999 —— 局部/自定义变量，人工映射
// 275. :764 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
// 276. :765 未知语句 RETURNF LOCAL
// 277. :768 变量语义 LOCAL = ABL:ARG:37 * 5 —— 局部/自定义变量，人工映射
// 278. :770 未知语句 LOCAL ++
// 279. :772 未知语句 LOCAL ++
// 280. :775 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
// 281. :777 变量语义 LOCAL += (TALENT:ARG:76 + TALENT:ARG:180 + TALENT:ARG:181) * 30 —— 局部/自定义变量，人工映射
// 282. :778 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 283. :782 变量语义 LOCAL += 2000 —— 局部/自定义变量，人工映射
// 284. :784 变量语义 LOCAL += 1000 —— 局部/自定义变量，人工映射
// 285. :786 变量语义 LOCAL += 500 —— 局部/自定义变量，人工映射
// 286. :788 变量语义 LOCAL += 250 —— 局部/自定义变量，人工映射
// 287. :790 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
// 288. :792 变量语义 LOCAL += 50 —— 局部/自定义变量，人工映射
// 289. :794 变量语义 LOCAL += 20 —— 局部/自定义变量，人工映射
// 290. :796 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
// 291. :798 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 292. :803 变量语义 LOCAL += 2000 —— 局部/自定义变量，人工映射
// 293. :805 变量语义 LOCAL += 1000 —— 局部/自定义变量，人工映射
// 294. :807 变量语义 LOCAL += 500 —— 局部/自定义变量，人工映射
// 295. :809 变量语义 LOCAL += 250 —— 局部/自定义变量，人工映射
// 296. :811 变量语义 LOCAL += 100 —— 局部/自定义变量，人工映射
// 297. :813 变量语义 LOCAL += 50 —— 局部/自定义变量，人工映射
// 298. :815 变量语义 LOCAL += 20 —— 局部/自定义变量，人工映射
// 299. :817 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
// 300. :821 变量语义 LOCAL += 1500 / (25 - ABL:ARG:11 - ABL:ARG:37) —— 局部/自定义变量，人工映射
// 301. :823 表达式下标 CFLAG:(ARG:0):533 —— 括号表达式下标（CFLAG），人工核角色维/一维归属
// 302. :823 局部参数 ARG:0 → arg_0（JS 局部变量，形参名人工定）
// 303. :824 未知语句 TIMES LOCAL, 0.75
// 304. :827 未知语句 LOCAL *= 10 + ABL:ARG:10 * 2
// 305. :828 未知语句 LOCAL /= 10
// 306. :831 未知语句 TIMES LOCAL, 0.75
// 307. :835 未知语句 THROW 未知的文字%ARGS:1%
// 308. :840 变量语义 LOCAL += (CFLAG:ARG:120 * 100) - 5 —— 局部/自定义变量，人工映射
// 309. :842 变量语义 LOCAL = 1 —— 局部/自定义变量，人工映射
// 310. :846 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
// 311. :847 未知语句 RETURNF LOCAL
// 312. :850 变量语义 LOCAL = RAND:6 —— 局部/自定义变量，人工映射
// 313. :854 变量语义 LOCAL -= 3 —— 局部/自定义变量，人工映射
// 314. :856 变量语义 LOCAL -= 2 —— 局部/自定义变量，人工映射
// 315. :858 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
// 316. :861 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
// 317. :863 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
// 318. :865 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
// 319. :867 变量语义 LOCAL += 4 —— 局部/自定义变量，人工映射
// 320. :874 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
// 321. :877 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
// 322. :880 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
// 323. :883 变量语义 LOCAL += (ABL:ARG:15 + ABL:ARG:17 + ABL:ARG:37) / 6 —— 局部/自定义变量，人工映射
// 324. :884 变量语义 LOCAL += TALENT:ARG:23 + TALENT:ARG:28 + TALENT:ARG:31 + TALENT:ARG:33 —— 局部/自定义变量，人工映射
// 325. :885 变量语义 LOCAL -= TALENT:ARG:21 + TALENT:ARG:22 + TALENT:ARG:24 + TALENT:ARG:27 + TALENT:ARG:30 —— 局部/自定义变量，人工映射
// 326. :886 变量语义 LOCAL += TALENT:ARG:91 + TALENT:ARG:92 + TALENT:ARG:113 —— 局部/自定义变量，人工映射
// 327. :887 变量语义 LOCAL += TALENT:ARG:83 + TALENT:ARG:87 + TALENT:ARG:88 —— 局部/自定义变量，人工映射
// 328. :889 未知语句 LOCAL ++
// 329. :891 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
// 330. :894 未知语句 LOCAL ++
// 331. :896 未知语句 LOCAL ++
// 332. :898 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
// 333. :901 未知语句 LOCAL ++
// 334. :902 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 335. :904 变量语义 LOCAL -= TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 —— 局部/自定义变量，人工映射
// 336. :908 变量语义 LOCAL += 5 —— 局部/自定义变量，人工映射
// 337. :910 变量语义 LOCAL += 4 —— 局部/自定义变量，人工映射
// 338. :912 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
// 339. :914 变量语义 LOCAL += 2 —— 局部/自定义变量，人工映射
// 340. :916 变量语义 LOCAL += 1 —— 局部/自定义变量，人工映射
// 341. :918 变量语义 LOCAL -= 1 —— 局部/自定义变量，人工映射
// 342. :920 变量语义 LOCAL -= 2 —— 局部/自定义变量，人工映射
// 343. :922 变量语义 LOCAL -= 3 —— 局部/自定义变量，人工映射
// 344. :924 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 345. :925 变量语义 LOCAL += TALENT:ARG:244 + TALENT:ARG:245 + TALENT:ARG:246 + TALENT:ARG:247 + TALENT:ARG:259 + TALENT:ARG:260 —— 局部/自定义变量，人工映射
// 346. :928 未知语句 LOCAL *= 10 + ABL:ARG:10
// 347. :929 未知语句 LOCAL /= 10
// 348. :932 未知语句 TIMES LOCAL, 0.5
// 349. :935 未知语句 THROW 未知的文字%ARGS:1%
// 350. :940 未知语句 TIMES LOCAL, 1.5
// 351. :943 变量语义 LOCAL = MAX(LOCAL, 0) —— 局部/自定义变量，人工映射
// 352. :944 未知语句 RETURNF LOCAL
// 353. :950 未知语句 RETURNF 0
// 354. :953 未知语句 RETURNF 0
// 355. :955 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 356. :964 未知语句 RETURNF 0
// 357. :969 未知语句 RETURNF 0
// 358. :972 未知语句 RETURNF 0
// 359. :979 未知语句 RETURNF 0
// 360. :982 未知语句 RETURNF 0
// 361. :985 未知语句 RETURNF 0
// 362. :992 表达式寻址 ITEM:22 → era.get('item:22')——族名直译，语义与归属人工定
// 363. :993 未知语句 RETURNF 0
// 364. :996 未知语句 RETURNF 0
// 365. :999 未知语句 RETURNF 0
// 366. :1002 未知语句 RETURNF 0
// 367. :1004 未知语句 RETURNF 1
// 368. :1008 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 369. :1009 变量语义 LOCAL = ABL:ARG:31 + RAND:(ABL:ARG:11 + 1) —— 局部/自定义变量，人工映射
// 370. :1010 未知语句 LOCAL /= 3
// 371. :1011 变量语义 LOCAL += TALENT:ARG:60 + TALENT:ARG:74 + TALENT:ARG:272 —— 局部/自定义变量，人工映射
// 372. :1014 未知语句 TIMES LOCAL, 1.5
// 373. :1017 未知语句 TIMES LOCAL, 1.2
// 374. :1019 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
// 375. :1020 未知语句 RETURNF LOCAL
// 376. :1022 变量语义 LOCAL = 1 + RAND:3 —— 局部/自定义变量，人工映射
// 377. :1023 变量语义 LOCAL += TALENT:ARG:63 + TALENT:ARG:64 —— 局部/自定义变量，人工映射
// 378. :1024 变量语义 LOCAL += (TALENT:ARG:76 + TALENT:ARG:272) * 2 —— 局部/自定义变量，人工映射
// 379. :1025 变量语义 LOCAL += (ABL:ARG:16 + ABL:ARG:37) / 3 —— 局部/自定义变量，人工映射
// 380. :1027 表达式下标 FLAG:(CFLAG:ARG:501 + 349) —— 括号表达式下标（FLAG），人工核角色维/一维归属
// 381. :1028 未知语句 TIMES LOCAL, 1.2
// 382. :1029 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 383. :1032 变量语义 LOCAL += ABL:ARG:32 / 3 —— 局部/自定义变量，人工映射
// 384. :1035 变量语义 LOCAL += ABL:ARG:32 / 2 —— 局部/自定义变量，人工映射
// 385. :1037 未知语句 LOCAL ++
// 386. :1039 未知语句 LOCAL ++
// 387. :1042 未知语句 TIMES LOCAL, 1.5
// 388. :1045 变量语义 LOCAL += (ABL:ARG:0 + ABL:ARG:22) / 3 —— 局部/自定义变量，人工映射
// 389. :1046 变量语义 LOCAL += TALENT:ARG:81 + TALENT:ARG:82 —— 局部/自定义变量，人工映射
// 390. :1047 未知语句 LOCAL *= (10 + ABL:ARG:33)
// 391. :1048 未知语句 LOCAL /= 10
// 392. :1051 变量语义 LOCAL += (ABL:ARG:3 + ABL:ARG:30) / 3 —— 局部/自定义变量，人工映射
// 393. :1054 未知语句 TIMES LOCAL, 1.5
// 394. :1057 变量语义 LOCAL += (ABL:ARG:2 + ABL:ARG:30) / 3 —— 局部/自定义变量，人工映射
// 395. :1060 未知语句 TIMES LOCAL, 1.5
// 396. :1063 变量语义 LOCAL += (ABL:ARG:30 + ABL:ARG:39) / 3 —— 局部/自定义变量，人工映射
// 397. :1065 变量语义 LOCAL += TALENT:ARG:124 + (TALENT:ARG:317 == 12) —— 局部/自定义变量，人工映射
// 398. :1068 未知语句 TIMES LOCAL, 1.5
// 399. :1072 变量语义 LOCAL -= 5 —— 局部/自定义变量，人工映射
// 400. :1075 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
// 401. :1076 未知语句 RETURNF LOCAL
// 402. :1079 变量语义 LOCAL = 1 + RAND:3 —— 局部/自定义变量，人工映射
// 403. :1080 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 404. :1083 变量语义 LOCAL += ABL:ARG:32 + 4 —— 局部/自定义变量，人工映射
// 405. :1086 未知语句 TIMES LOCAL, 1.5
// 406. :1089 变量语义 LOCAL += ABL:ARG:32 + 3 —— 局部/自定义变量，人工映射
// 407. :1091 变量语义 LOCAL += 3 —— 局部/自定义变量，人工映射
// 408. :1094 未知语句 TIMES LOCAL, 2.0
// 409. :1097 变量语义 LOCAL += ABL:ARG:0 + ABL:ARG:22 —— 局部/自定义变量，人工映射
// 410. :1098 未知语句 LOCAL *= (10 + ABL:ARG:33)
// 411. :1099 未知语句 LOCAL /= 10
// 412. :1102 变量语义 LOCAL += ABL:ARG:3 + ABL:ARG:30 —— 局部/自定义变量，人工映射
// 413. :1105 未知语句 TIMES LOCAL, 2.0
// 414. :1108 变量语义 LOCAL += ABL:ARG:2 + ABL:ARG:30 —— 局部/自定义变量，人工映射
// 415. :1111 未知语句 TIMES LOCAL, 2.0
// 416. :1114 变量语义 LOCAL += ABL:ARG:30 + ABL:ARG:39 —— 局部/自定义变量，人工映射
// 417. :1117 未知语句 TIMES LOCAL, 2.0
// 418. :1120 变量语义 LOCAL = MAX(LOCAL, 1) —— 局部/自定义变量，人工映射
// 419. :1121 未知语句 LOCAL *= 5
// 420. :1122 未知语句 RETURNF LOCAL
// 421. :1126 表达式寻址 ARGS:1 → era.get('args:1')——族名直译，语义与归属人工定
// 422. :1130 未知语句 RETURNF (250 + CFLAG:ARG:151)
// 423. :1133 未知语句 RETURNF 1
// 424. :1136 未知语句 RETURNF 2
// 425. :1139 未知语句 RETURNF 3
// 426. :1142 未知语句 RETURNF 4
// 427. :1145 未知语句 RETURNF 11
// 428. :1150 函数参数 @SHOW_BUTTON_BICH_LEVEL(NUM, ARG) —— 参数声明已剥（JS 函数签名人工定）
// 429. :1172 函数参数 @SET_BICH_LEVEL(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 430. :1177 未知语句 INPUT
// 431. :1199 SKIP块 [SKIPSTART]（:1199）～[SKIPEND]（:3132）——预处理跳过块，整段转注释
