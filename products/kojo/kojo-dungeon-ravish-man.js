/* eslint-disable no-undef, no-unused-vars, no-irregular-whitespace, no-redeclare, no-unreachable, no-dupe-else-if */
/**
 * @file DUNGEON_RYOUZYOKU_MAN.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB
 *
 * == 已有门面名的下标（复核时可升级为门面读写，裁定一） ==
 *   cflag:16 = 初吻对象（facade-names）
 *
 * == 复核标记（274 处） ==
 * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法
 * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，
 * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW
 * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），
 * 复核成果不会被重跑覆盖。
 *   1. :1 函数参数 @ORC_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   2. :4 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   3. :5 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   4. :8 未知语句 DATAFORM 『喂！闭嘴……别吵啦！快点喝下去！』
 *   5. :9 未知语句 DATAFORM 『舔个……干净……』
 *   6. :10 未知语句 DATAFORM 『打得都勃起了……』
 *   7. :11 未知语句 ENDDATA
 *   8. :16 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   9. :17 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   10. :18 未知语句 MON_NUM *= 2
 *   11. :24 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   12. :91 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   13. :94 未知语句 DATAFORM 阴茎
 *   14. :95 未知语句 DATAFORM 脏污的阴茎
 *   15. :96 未知语句 DATAFORM 带肉刺的阴茎
 *   16. :97 未知语句 DATAFORM 巨根
 *   17. :98 未知语句 DATAFORM 蘑菇似的阴茎
 *   18. :99 未知语句 ENDDATA
 *   19. :106 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   20. :107 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   21. :109 未知语句 MON_NUM *= 2
 *   22. :138 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   23. :143 未知语句 DATAFORM 『兄弟们，把所有的穴都塞满哦！』
 *   24. :144 未知语句 DATAFORM 『嘿，简直像三明治一样』
 *   25. :145 未知语句 DATAFORM 『连耳朵，都给你灌满精液咯』
 *   26. :146 未知语句 ENDDATA
 *   27. :148 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   28. :150 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   29. :155 未知语句 DATAFORM 阴茎
 *   30. :156 未知语句 DATAFORM 脏污的阴茎
 *   31. :157 未知语句 DATAFORM 带肉刺的阴茎
 *   32. :158 未知语句 DATAFORM 巨根
 *   33. :159 未知语句 DATAFORM 蘑菇似的阴茎
 *   34. :160 未知语句 ENDDATA
 *   35. :162 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   36. :162 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   37. :178 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   38. :187 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   39. :198 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   40. :217 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   41. :258 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   42. :263 未知语句 DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』
 *   43. :264 未知语句 DATAFORM 『猪就要有，猪的样子』
 *   44. :265 未知语句 DATAFORM 『你只是，比我们还低级的，家畜罢了！』
 *   45. :266 未知语句 ENDDATA
 *   46. :268 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   47. :293 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   48. :301 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   49. :303 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   50. :312 CALL GOBI_KOUJO, 1 —— 口上文件里多为存根调用，人工定存根名
 *   51. :315 CALL GOBI_KOUJO, 5 —— 口上文件里多为存根调用，人工定存根名
 *   52. :322 CALL GOBI_KOUJO, 1 —— 口上文件里多为存根调用，人工定存根名
 *   53. :325 CALL GOBI_KOUJO, 5 —— 口上文件里多为存根调用，人工定存根名
 *   54. :332 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   55. :341 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   56. :343 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   57. :346 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   58. :351 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   59. :358 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   60. :359 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   61. :372 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   62. :374 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   63. :378 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   64. :380 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   65. :387 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   66. :397 未知语句 WAIT
 *   67. :401 函数参数 @SLIME_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   68. :405 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   69. :406 RAND RAND:6 → rand_n(6)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   70. :407 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   71. :416 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   72. :418 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   73. :423 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   74. :425 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   75. :428 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   76. :431 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   77. :434 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   78. :444 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   79. :446 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   80. :451 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   81. :453 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   82. :463 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   83. :465 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   84. :468 未知语句 WAIT
 *   85. :471 函数参数 @INSECT_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   86. :475 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   87. :476 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   88. :478 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   89. :486 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   90. :488 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   91. :492 未知语句 WAIT
 *   92. :495 函数参数 @IVY_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   93. :498 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   94. :499 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   95. :501 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   96. :508 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   97. :517 未知语句 WAIT
 *   98. :520 函数参数 @SYOKUSYU_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   99. :524 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   100. :525 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   101. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   102. :530 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   103. :532 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   104. :538 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   105. :540 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   106. :548 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   107. :550 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   108. :558 函数参数 @FAILY_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   109. :562 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   110. :563 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   111. :567 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   112. :576 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   113. :584 未知语句 WAIT
 *   114. :587 函数参数 @GIANT_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   115. :594 未知语句 DATAFORM 『瓦全的　变成了　灰机杯了呀』
 *   116. :595 未知语句 DATAFORM 『巨人肉棒的　形状　几住了哇』
 *   117. :596 未知语句 DATAFORM 『嘿嘿　已经　淋乱不糠了啊』
 *   118. :597 未知语句 DATAFORM 『已经　不是巨人阴茎　就没滑　满足　了吗？』
 *   119. :598 未知语句 DATAFORM 『和巨人肉棒　挺搭的　肉棒套子　嘛』
 *   120. :599 未知语句 ENDDATA
 *   121. :604 未知语句 DATAFORM 『哈哈　熟络起来了欸』
 *   122. :605 未知语句 DATAFORM 『又垒了呀……专用的 灰机杯』
 *   123. :606 未知语句 DATAFORM 『正愁呢　来得正好』
 *   124. :607 未知语句 DATAFORM 『没用的哦　向巨人　反抗啥的……』
 *   125. :608 未知语句 DATAFORM 冒险者意识到了自己是无法抵抗巨人那压倒性的体型的矮小种族……
 *   126. :609 未知语句 DATAFORM 面对巨大雄性的体型、冒险者的武器从手中落下、呆呆地跪坐在地上
 *   127. :610 未知语句 ENDDATA
 *   128. :613 未知语句 DATAFORM 『看起来值得凌辱一番。』
 *   129. :614 未知语句 DATAFORM 『忍不住了！』
 *   130. :615 未知语句 DATAFORM 『屁股反正也是能用的穴啊？』
 *   131. :616 未知语句 DATAFORM 『要让我满足哦！』
 *   132. :617 未知语句 DATAFORM 『真是太小啦！』
 *   133. :618 未知语句 ENDDATA
 *   134. :620 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   135. :625 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   136. :634 未知语句 WAIT
 *   137. :639 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   138. :641 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   139. :648 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   140. :649 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   141. :650 未知语句 MON_NUM *= 2
 *   142. :660 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   143. :662 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   144. :668 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   145. :670 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   146. :687 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   147. :690 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   148. :694 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   149. :696 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   150. :707 未知语句 WAIT
 *   151. :710 函数参数 @MAN_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   152. :717 未知语句 DATAFORM 『已经、离不开我们了吗』
 *   153. :718 未知语句 DATAFORM 『嘿嘿、今儿也会好好疼你』
 *   154. :719 未知语句 DATAFORM 『对黑暗世界、还习惯吗』
 *   155. :720 未知语句 DATAFORM 『又来被侵犯了吗』
 *   156. :721 未知语句 DATAFORM 『又来寻欢啊…不知道过去的自己见到现在这样、会怎么想啊？』
 *   157. :722 未知语句 ENDDATA
 *   158. :727 未知语句 DATAFORM 『哦、又来啦』
 *   159. :728 未知语句 DATAFORM 『怕不是故意输掉的吧？』
 *   160. :729 未知语句 DATAFORM 『这么喜欢我们的肉棒吗？』
 *   161. :730 未知语句 DATAFORM 『真是心口不一』
 *   162. :731 未知语句 DATAFORM 冒险者默默服从着魔族男人们的要求……
 *   163. :732 未知语句 DATAFORM 魔族男人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边
 *   164. :733 未知语句 ENDDATA
 *   165. :736 未知语句 DATAFORM 『真是好家伙啊！』
 *   166. :737 未知语句 DATAFORM 『真是喜欢啊！？』
 *   167. :738 未知语句 DATAFORM 『好兄弟，欢迎来到黑暗的世界。』
 *   168. :739 未知语句 DATAFORM 『别怨了，是你们先打下来的。』
 *   169. :740 未知语句 DATAFORM 『有想过会变成这样吗？』
 *   170. :741 未知语句 ENDDATA
 *   171. :744 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   172. :747 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   173. :750 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   174. :751 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   175. :753 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   176. :762 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   177. :764 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   178. :767 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   179. :794 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   180. :796 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   181. :805 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   182. :811 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   183. :814 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   184. :817 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   185. :829 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   186. :831 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   187. :833 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   188. :835 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   189. :839 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   190. :852 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   191. :854 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   192. :856 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   193. :857 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   194. :861 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   195. :862 局部变量 Y += 10 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   196. :867 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   197. :868 局部变量 Y += 10 —— 单字母局部变量，JS 侧声明与赋值人工定
 *   198. :877 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   199. :879 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   200. :883 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   201. :890 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   202. :900 未知语句 WAIT
 *   203. :903 函数参数 @BEAST_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   204. :910 未知语句 DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意
 *   205. :911 未知语句 DATAFORM 魔兽慢慢地靠近了冒险者、爬到了土下座着的冒险者身上……
 *   206. :912 未知语句 DATAFORM 冒险者对逐渐熟悉了与兽相交的自己惊诧不已
 *   207. :913 未知语句 DATAFORM 被魔兽的眼睛凝视着、冒险者只能伏下身子、将腰抬了起来
 *   208. :914 未知语句 DATAFORM 冒险者已经无法从野兽粗暴的交尾中、脱身了……
 *   209. :915 未知语句 ENDDATA
 *   210. :920 未知语句 DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……
 *   211. :921 未知语句 DATAFORM 魔兽静静的、像确认什么似的盯着冒险者
 *   212. :922 未知语句 DATAFORM 冒险者这次也在与魔兽交尾的想象中、感受着奇妙的背德感
 *   213. :923 未知语句 DATAFORM 魔兽的眼睛、像是在期待着什么似的、渐渐被欲望的颜色扭曲了
 *   214. :924 未知语句 DATAFORM 冒险者想起了几次兽交的经历、股间硬了起来……
 *   215. :925 未知语句 DATAFORM 魔兽静静的靠近冒险者、冷眼下看着一蹶不振的冒险者
 *   216. :926 未知语句 ENDDATA
 *   217. :929 未知语句 DATAFORM 『咕噜咕噜噜』
 *   218. :930 未知语句 DATAFORM 冒险者吃不消野兽的臭味。
 *   219. :931 未知语句 DATAFORM 冒险者还未能接受自己被野兽扑倒的事实。
 *   220. :932 未知语句 DATAFORM 『嘎哦～呜～～』
 *   221. :933 未知语句 DATAFORM 冒险者因野兽的粗暴而感到恐惧。
 *   222. :934 未知语句 ENDDATA
 *   223. :937 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   224. :940 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   225. :942 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   226. :946 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   227. :960 函数参数 @BRAIN_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   228. :967 未知语句 DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……
 *   229. :968 未知语句 DATAFORM 食脑魔在媚态的食粮跟前、发出了奇妙的笑声
 *   230. :969 未知语句 DATAFORM 冒险者沉浸在大脑在改造所致的异次元的快乐中、空洞的双眼里闪烁着期待的神色……
 *   231. :970 未知语句 DATAFORM 食脑魔舔了舔舌头。看来这份食粮、给它带来了捕食的喜悦
 *   232. :971 未知语句 DATAFORM 冒险者对即将开始的异次元的快乐兴奋不已、甚至已经失禁了
 *   233. :972 未知语句 ENDDATA
 *   234. :977 未知语句 DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……
 *   235. :978 未知语句 DATAFORM 食脑魔在玩坏了的食粮跟前、发出了令人不寒而栗的笑声
 *   236. :979 未知语句 DATAFORM 冒险者感到自己的大脑、已经到达了无可挽回的地步
 *   237. :980 未知语句 DATAFORM 食脑魔在战栗的食粮跟前、舔了舔舌头。冒险者默默地看着这一切……
 *   238. :981 未知语句 DATAFORM 冒险者想起了食脑魔所带来的异次元地快乐、咬紧了牙关……
 *   239. :982 未知语句 ENDDATA
 *   240. :985 未知语句 DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。
 *   241. :986 未知语句 DATAFORM 冒险者狂乱地挣扎着，企图逃避食脑魔。
 *   242. :987 未知语句 DATAFORM 冒险者拼命地乞求着饶命。
 *   243. :988 未知语句 DATAFORM 冒险者直接精神崩溃，痴痴地笑着。
 *   244. :989 未知语句 DATAFORM 冒险者因为过度的恐惧而失禁了。
 *   245. :990 未知语句 ENDDATA
 *   246. :993 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   247. :995 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
 *   248. :999 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   249. :1006 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   250. :1007 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   251. :1012 未知语句 WAIT
 *   252. :1015 函数参数 @HORSE_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
 *   253. :1022 未知语句 DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……
 *   254. :1023 未知语句 DATAFORM 馬凑近了败倒的冒险者、将勃起的阴茎伸到了眼前
 *   255. :1024 未知语句 DATAFORM 冒险者意识到了自己变得毫不抵触与馬相交的事实、露出了令人作呕的笑容……
 *   256. :1025 未知语句 DATAFORM 馬粗暴地对待冒险者、冒险者也好不挣扎的接受了……
 *   257. :1026 未知语句 DATAFORM 冒险者对馬的粗暴行径、在心中感到了一丝悸动……
 *   258. :1027 未知语句 ENDDATA
 *   259. :1032 未知语句 DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……
 *   260. :1033 未知语句 DATAFORM 馬看着放弃抵抗的冒险者、轻蔑地笑了起来
 *   261. :1034 未知语句 DATAFORM 冒险者回想起与馬相交的自己、惊诧不已
 *   262. :1035 未知语句 DATAFORM 馬大声嘶吼着、冒险者胆怯不已、手中的武器落在了地上……
 *   263. :1036 未知语句 DATAFORM 冒险者脑中铭刻下了馬的粗暴行径、变得无法抵抗了……
 *   264. :1037 未知语句 ENDDATA
 *   265. :1040 未知语句 DATAFORM 『唔哦哦！』
 *   266. :1041 未知语句 DATAFORM 冒险者吃不消马的臭味。
 *   267. :1042 未知语句 DATAFORM 冒险者还未能接受自己被马扑倒的事实。
 *   268. :1043 未知语句 DATAFORM 『吁！』
 *   269. :1044 未知语句 DATAFORM 冒险者因马的粗暴而感到恐惧。
 *   270. :1045 未知语句 ENDDATA
 *   271. :1048 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
 *   272. :1052 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   273. :1056 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
 *   274. :1067 未知语句 WAIT
 */

'use strict';

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。
// @ORC_RYOU男(ARG) // :1
async function ORC_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :2

  // 赋值 MON_NUM = E:(B + 99) // :4
  if (rand_n(5) == 0) { // :5

    await era.print(`ATAW`); // :7
    // RAW: DATAFORM 『喂！闭嘴……别吵啦！快点喝下去！』 // :8
    // RAW: DATAFORM 『舔个……干净……』 // :9
    // RAW: DATAFORM 『打得都勃起了……』 // :10
    // RAW: ENDDATA // :11

    if (era.get(`talent:${arg}:52`)) { // :13

      await era.printAndWait(`『呃……这家伙，简直就是经验丰富的娼妓嘛～』`); // :15
      await era.printAndWait(`%SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。`); // :16
      await era.printAndWait(`兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。`); // :17
      // RAW: MON_NUM *= 2 // :18
    } // :19

    if (era.get(`talent:${arg}:种族`) == 4) { // :22
      await era.print(`无头骑士的`); // :22
    } // :22

    await era.print(`%SAVESTR:ARG%`); // :24

    if (era.get(`talent:${arg}:种族`) == 4) { // :26
      await era.print(`身体被固定住了，只剩下脑袋来像飞机杯似的`); // :27
    } else { // :28
      await era.print(`全裸地`); // :29
    } // :30
    await era.printAndWait(`侍奉着兽人们的阴茎。`); // :31
    await era.printAndWait(`只要喝掉所有{MON_NUM}只兽人的精液的话，它们就答应不侵犯他的下体………`); // :32

    if (era.get(`cflag:${arg}:131`) > 5) { // :34

      if (era.get(`talent:${arg}:13`)) { // :36

        await era.print(`毫无犹豫、`); // :38
      } else if (era.get(`talent:${arg}:14`)) { // :39

        await era.print(`小心翼翼地、`); // :41
      } else if (era.get(`talent:${arg}:17`)) { // :42

        await era.print(`一边土下座扭着腰部的`); // :44
      } else if (era.get(`talent:${arg}:35`)) { // :45

        await era.print(`期待与羞耻将脸染红的`); // :47
      } else { // :48
        await era.print(`面露期待的`); // :49
      } // :50
    } else if (era.get(`cflag:${arg}:131`) > 2) { // :51

      if (era.get(`talent:${arg}:13`)) { // :53

        await era.print(`老实遵从于兽人的`); // :55
      } else if (era.get(`talent:${arg}:14`)) { // :56

        await era.print(`煞有其事地、`); // :58
      } else if (era.get(`talent:${arg}:17`)) { // :59

        await era.print(`不住向阴茎献媚的`); // :61
      } else if (era.get(`talent:${arg}:35`)) { // :62

        await era.print(`面对阴茎羞红了脸的`); // :64
      } else { // :65
        await era.print(`已然无法反抗的`); // :66
      } // :67
    } else { // :68
      if (era.get(`talent:${arg}:11`)) { // :69

        await era.print(`带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，`); // :71
        await era.print(`恐怖点数+{MON_NUM * 10}`); // :72
        // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :73
        era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :73
      } else if (era.get(`talent:${arg}:13`)) { // :74

        await era.print(`迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，`); // :76
        await era.print(`耻情点数+{MON_NUM * 10}`); // :77
        // JUEL:ARG:8 + = MON_NUM * 10（变量语义：JUEL 族，ARG:8 +） // :78
        era.set(`juel:${arg}:8 +`, MON_NUM * 10); // :78
      } else if (era.get(`talent:${arg}:14`)) { // :79

        await era.print(`提心吊胆地`); // :81
      } else if (era.get(`talent:${arg}:17`)) { // :82

        await era.print(`嘿嘿媚笑着`); // :84
      } else if (era.get(`talent:${arg}:35`)) { // :85

        await era.print(`不敢直视肉棒而闭上了眼睛`); // :87
      } // :88
    } // :89

    await era.print(`%SAVESTR:ARG%把`); // :91

    await era.print(`ATA`); // :93
    // RAW: DATAFORM 阴茎 // :94
    // RAW: DATAFORM 脏污的阴茎 // :95
    // RAW: DATAFORM 带肉刺的阴茎 // :96
    // RAW: DATAFORM 巨根 // :97
    // RAW: DATAFORM 蘑菇似的阴茎 // :98
    // RAW: ENDDATA // :99

    await era.print(`含了下去，`); // :101

    if (era.get(`talent:${arg}:52`)) { // :103

      await era.printAndWait(`『呃……这家伙，简直就是经验丰富的娼妓嘛～』`); // :105
      await era.printAndWait(`%SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。`); // :106
      await era.printAndWait(`兽人抵受不住他那灵活的舌头，射在%SAVESTR:ARG%的嘴里了。`); // :107

      // RAW: MON_NUM *= 2 // :109
    } else if (era.get(`talent:${arg}:21`)) { // :110

      await era.print(`像工作一样地奉仕着，`); // :112
    } else if (era.get(`talent:${arg}:36`)) { // :113

      await era.print(`不禁发出了粗俗的声音，`); // :115
    } else if (era.get(`talent:${arg}:50`)) { // :116

      await era.print(`很快地抓住了奉仕的诀窍，`); // :118
    } else if (era.get(`talent:${arg}:62`)) { // :119

      await era.print(`忍受着腥臭味，`); // :121
    } else if (era.get(`talent:${arg}:63`)) { // :122

      await era.print(`拼命地用舌头奉仕着，`); // :124
    } // :125

    await era.print(`奉仕持续了下去……`); // :127

    await era.print(`口交经验+{MON_NUM}`); // :129
    await era.print(`精液经验+{MON_NUM}`); // :130
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :131
    era.set(`exp:${arg}:22 +`, MON_NUM); // :131
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :132
    era.set(`exp:${arg}:20 +`, MON_NUM); // :132

    if (era.get(`cflag:${target}:16`) == -1) { // :135
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :135
      era.set(`cflag:${target}:16`, 995); // :135
    } // :135


  } else if (rand_n(4) == 0) { // :138



    await era.print(`ATAW`); // :142
    // RAW: DATAFORM 『兄弟们，把所有的穴都塞满哦！』 // :143
    // RAW: DATAFORM 『嘿，简直像三明治一样』 // :144
    // RAW: DATAFORM 『连耳朵，都给你灌满精液咯』 // :145
    // RAW: ENDDATA // :146

    await era.printAndWait(`%SAVESTR:ARG%被{MON_NUM}只兽人用积存已久的精液，将嘴巴、肛门……所有能用的穴，注满了精液……`); // :148
    await era.printAndWait(`他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`); // :149
    await era.printAndWait(`%SAVESTR:ARG%的脸和性器都用精液化上了妆。兽人们看着他这样子，开怀大笑。`); // :150

    await era.print(`兽人的`); // :152

    await era.print(`ATA`); // :154
    // RAW: DATAFORM 阴茎 // :155
    // RAW: DATAFORM 脏污的阴茎 // :156
    // RAW: DATAFORM 带肉刺的阴茎 // :157
    // RAW: DATAFORM 巨根 // :158
    // RAW: DATAFORM 蘑菇似的阴茎 // :159
    // RAW: ENDDATA // :160

    await era.print(`插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出来的精液在%SAVESTR:ARG%的`); // :162

    if (era.get(`cflag:${arg}:42`) == 83) { // :164
      await era.print(`眼镜上飞撒着……`); // :165
    } else if (era.get(`talent:${arg}:魅力点`) == 2) { // :166
      await era.print(`可爱的眼睛上飞撒着……`); // :167
    } else if (era.get(`talent:${arg}:魅力点`) == 3) { // :168
      await era.print(`漂亮的鼻子里喷了出来……`); // :169
    } else if (era.get(`talent:${arg}:魅力点`) == 22) { // :170
      await era.print(`光鲜亮丽的头发上飞撒着……`); // :171
    } else { // :172
      await era.print(`脸上飞撒着……`); // :173
    } // :174
    await era.print(''); // :175
    if (era.get(`talent:${arg}:12`)) { // :176

      await era.printAndWait(`%SAVESTR:ARG%咬着嘴唇忍受着凌辱……`); // :178
      await era.printAndWait(`在那刚强的脸上，精液无情地飞撒着。`); // :179
      await era.print(`苦痛点数+{MON_NUM * 10}`); // :180
      // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :181
      era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :181

    } else if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) { // :183

      await era.printAndWait(`在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。`); // :185
      await era.printAndWait(`『喔！这家伙有感觉了哦！』`); // :186
      await era.printAndWait(`%SAVESTR:ARG%被快感冲击着，忍不住主动扭着腰。`); // :187
      await era.print(`欲情点数+{MON_NUM * 10}`); // :188
      // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :189
      era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :189

    } else { // :191
      await era.printAndWait(`他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`); // :192

    } // :194


    await era.printAndWait(''); // :197
    await era.print(`兽人们把润滑液涂在了%SAVESTR:ARG%的`); // :198

    if (era.get(`talent:${arg}:魅力点`) == 21) { // :200
      await era.print(`漂亮的`); // :201
    } else if (era.get(`talent:${arg}:魅力点`) == 14) { // :202
      await era.print(`漂亮的屁股的缝隙中的`); // :203
    } else if (era.get(`talent:${arg}:魅力点`) == 23) { // :204
      await era.print(`大的屁股的缝隙中的`); // :205
    } else if (era.get(`talent:${arg}:125`)) { // :206
      await era.print(`无毛额`); // :207
    } else if (era.get(`talent:${arg}:248`)) { // :208
      await era.print(`肌肉明显的两腿间的`); // :209
    } else if (era.get(`talent:${arg}:阴毛状态`) > 200) { // :210
      await era.print(`从阴阜到肛门都被茂密的阴毛所覆盖的`); // :211
    } else if (era.get(`talent:${arg}:阴毛状态`) > 150) { // :212
      await era.print(`长着茂盛的阴毛的`); // :213
    } // :214

    await era.print(`性器和肛门上`); // :216
    await era.print(`在%SAVESTR:ARG%的`); // :217

    if (era.get(`talent:${arg}:99`)) { // :219

      await era.print(`魁梧的身体上`); // :221
    } else if (era.get(`talent:${arg}:100`)) { // :222

      await era.print(`娇小的身体上`); // :224
    } else if (era.get(`talent:${arg}:115`)) { // :225

      await era.print(`松松垮垮的身体上`); // :227
    } else if (era.get(`talent:${arg}:248`)) { // :228

      await era.print(`紧致的身体上`); // :230
    } else if (era.get(`talent:${arg}:256`)) { // :231

      await era.print(`窈窕的身体上`); // :233
    } else if (era.get(`talent:${arg}:体型`) <= 100) { // :234
      await era.print(`纤细的身体上`); // :235
    } else if (era.get(`talent:${arg}:体型`) > 200) { // :236
      await era.print(`肉感的身体上`); // :237
    } else { // :238
      await era.print(`身体上`); // :239
    } // :240

    await era.print(`像要挤爆他似的激烈地持续侵犯着……`); // :242

    await era.printAndWait(`他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`); // :244

    await era.print(`苦痛点数+{MON_NUM * 10}`); // :246
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :247
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :247
    await era.print(`肛门经验+{MON_NUM}`); // :248
    await era.print(`口交经验+{MON_NUM}`); // :249
    await era.print(`精液经验+{MON_NUM}`); // :250
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :251
    era.set(`exp:${arg}:1 +`, MON_NUM); // :251
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :252
    era.set(`exp:${arg}:22 +`, MON_NUM); // :252
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :253
    era.set(`exp:${arg}:20 +`, MON_NUM); // :253

    if (era.get(`cflag:${target}:16`) == -1) { // :256
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :256
      era.set(`cflag:${target}:16`, 995); // :256
    } // :256

  } else if (rand_n(3) == 0) { // :258



    await era.print(`ATAW`); // :262
    // RAW: DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』 // :263
    // RAW: DATAFORM 『猪就要有，猪的样子』 // :264
    // RAW: DATAFORM 『你只是，比我们还低级的，家畜罢了！』 // :265
    // RAW: ENDDATA // :266

    await era.print(`%SAVESTR:ARG%全裸地四肢着地趴在地下、`); // :268

    if (era.get(`talent:${arg}:10`) || era.get(`talent:${arg}:14`)) { // :270

      await era.print(`浑身颤抖着、`); // :272
    } else if (era.get(`talent:${arg}:11`)) { // :273

      await era.print(`怒目圆睁着、`); // :275
    } else if (era.get(`talent:${arg}:13`)) { // :276

      await era.print(`拼命服从着、`); // :278
    } else if (era.get(`talent:${arg}:17`)) { // :279

      await era.print(`拼命献媚着、`); // :281
    } else if (era.get(`talent:${arg}:35`)) { // :282

      await era.print(`羞红了脸、`); // :284
    } // :285

    await era.printAndWait(`屈辱地模仿猪叫……`); // :287

    await era.printAndWait(`{MON_NUM}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。`); // :289

    if (era.get(`abl:${arg}:17`)) { // :291

      await era.printAndWait(`%SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上述行为。`); // :293
      await era.printAndWait(`好像因为被视奸，而有了感觉。`); // :294
      await era.print(`耻情点数+{MON_NUM * 10}`); // :295
      // JUEL:ARG:8 + = MON_NUM * 10（变量语义：JUEL 族，ARG:8 +） // :296
      era.set(`juel:${arg}:8 +`, MON_NUM * 10); // :296
    } // :297

    if (era.get(`abl:${arg}:21`)) { // :299

      await era.printAndWait(`%SAVESTR:ARG%好像因为被骂而有了感觉。`); // :301
      await era.printAndWait(`『明明就是母猪，还说自己是冒险者！』`); // :302
      await era.printAndWait(`%SAVESTR:ARG%连眼神都湿润了～`); // :303
      await era.print(`欲情点数+{MON_NUM * 10}`); // :304
      // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :305
      era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :305
    } // :306

    await era.print(`『猪`); // :308
    if (era.get(`talent:${arg}:17`)) { // :309


      // CALL GOBI_KOUJO, 1 // :312
    } else { // :313

      // CALL GOBI_KOUJO, 5 // :315
    } // :316
    await era.print(`还自称冒险者……简直傻了`); // :317

    if (era.get(`talent:${arg}:17`)) { // :319


      // CALL GOBI_KOUJO, 1 // :322
    } else { // :323

      // CALL GOBI_KOUJO, 5 // :325
    } // :326

    await era.printAndWait(`噗噗，噗嘻！』`); // :328

    if (era.get(`talent:${arg}:17`)) { // :330

      await era.printAndWait(`%SAVESTR:ARG%抛弃了自尊心，拼命地求饶着。`); // :332
      await era.print(`屈服点数+{MON_NUM * 10}`); // :333
      // JUEL:ARG:6 + = MON_NUM * 10（变量语义：JUEL 族，ARG:6 +） // :334
      era.set(`juel:${arg}:6 +`, MON_NUM * 10); // :334
    } // :335

    await era.print(`耻情点数+{MON_NUM * 10}`); // :337
    await era.print(`屈服点数+{MON_NUM * 10}`); // :338
    // JUEL:ARG:8 + = MON_NUM * 10（变量语义：JUEL 族，ARG:8 +） // :339
    era.set(`juel:${arg}:8 +`, MON_NUM * 10); // :339
    // JUEL:ARG:6 + = MON_NUM * 10（变量语义：JUEL 族，ARG:6 +） // :340
    era.set(`juel:${arg}:6 +`, MON_NUM * 10); // :340
  } else if (rand_n(2) == 0) { // :341
    await era.printAndWait(`『来试试，看能放多粗的东西进去？』`); // :342
    await era.printAndWait(`%SAVESTR:ARG%感受到了自己身上的危机，拼命地哀求着。`); // :343
    await era.printAndWait(`不过，他的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。`); // :344
    await era.printAndWait(`其中一只兽人，拿起他的心爱的武器用柄的那端捅入他的后穴。`); // :345
    await era.printAndWait(`%SAVESTR:ARG%的喊叫声，回响在{MON_NUM}只兽人的耳边。`); // :346

    if (era.get(`talent:${arg}:40`)) { // :348

      await era.printAndWait(`「好痛……不要啊……呜哇哇哇哇哇哇！」`); // :350
      await era.printAndWait(`%SAVESTR:ARG%受不了痛楚，高声哭喊着。`); // :351
      await era.print(`苦痛点数+{MON_NUM * 10}`); // :352
      // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :353
      era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :353
    } // :354

    if (era.get(`abl:${arg}:21`)) { // :356

      await era.printAndWait(`%SAVESTR:ARG%在痛楚中感到了愉悦。`); // :358
      await era.printAndWait(`难道自己是个潜在的性变态？这么想着，%SAVESTR:ARG%对自身的反应感到害怕。`); // :359
      await era.print(`欲情点数+{MON_NUM * 10}`); // :360
      // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :361
      era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :361
    } // :362

    await era.print(`肛门经验+{MON_NUM}`); // :364
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :365
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :366
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :367
    era.set(`exp:${arg}:1 +`, MON_NUM); // :367
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :368
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :368
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :369
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :369
  } else { // :370
    await era.printAndWait(`『抬起屁股！然后说：请用！』`); // :371
    await era.printAndWait(`%SAVESTR:ARG%用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。`); // :372
    await era.printAndWait(`他完全被淹没在{MON_NUM}只兽人之中，兽人们大笑着，轮流侵犯他的嘴巴和肛门。`); // :373
    await era.printAndWait(`%SAVESTR:ARG%的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。`); // :374

    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) { // :376

      await era.printAndWait(`随着凌辱的持续，%SAVESTR:ARG%的前端里渐渐滴出了体液。`); // :378
      await era.printAndWait(`『别这么快就去了啊！老子都不知道操哭多少人了。』`); // :379
      await era.printAndWait(`%SAVESTR:ARG%呼出了炽热的气息，双腿直抖着。`); // :380
      await era.print(`欲情点数+{MON_NUM * 10}`); // :381
      // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :382
      era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :382

    } else if (era.get(`talent:${arg}:11`)) { // :384

      await era.printAndWait(`『喂！把腰抬起来！还没完呢！』`); // :386
      await era.printAndWait(`%SAVESTR:ARG%用冰冷的目光瞪了兽人们一眼。`); // :387
    } // :388

    await era.print(`肛门经验+{MON_NUM}`); // :390
    await era.print(`口交经验+{MON_NUM}`); // :391
    await era.print(`精液经验+{MON_NUM}`); // :392
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :393
    era.set(`exp:${arg}:1 +`, MON_NUM); // :393
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :394
    era.set(`exp:${arg}:22 +`, MON_NUM); // :394
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :395
    era.set(`exp:${arg}:20 +`, MON_NUM); // :395
  } // :396
  // RAW: WAIT // :397
  return 0; // :398


}

// @SLIME_RYOU男(ARG) // :401
async function SLIME_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :402


  // 赋值 MON_NUM = E:(B + 99) // :405
  if (rand_n(6) == 0) { // :406
    await era.printAndWait(`黏液侵犯着%SAVESTR:ARG%的嘴巴和肛门，并灌入了黏液。`); // :407
    await era.print(`肛门经验+{MON_NUM}`); // :408
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :409
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :410
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :411
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :411
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :412
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :412
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :413
    era.set(`exp:${arg}:1 +`, MON_NUM); // :413


  } else if (rand_n(5) == 0) { // :416
    await era.printAndWait(`黏液杀到了冒险者的嘴巴里。`); // :417
    await era.printAndWait(`%SAVESTR:ARG%感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了他的内脏，从内部蹂躏着他。`); // :418
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :419
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :420
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :421
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :421
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :422
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :422
  } else if (rand_n(4) == 0) { // :423
    await era.printAndWait(`黏液杀到了冒险者的肛门里。`); // :424
    await era.printAndWait(`%SAVESTR:ARG%被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。`); // :425
    if (era.get(`cflag:${arg}:131`) > 5) { // :426

      await era.printAndWait(`%SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐快感之中……`); // :428
    } else if (era.get(`cflag:${arg}:131`) > 3) { // :429

      await era.printAndWait(`%SAVESTR:ARG%已然被粘液攻陷了……`); // :431
    } else if (era.get(`cflag:${arg}:131`) > 0) { // :432

      await era.printAndWait(`%SAVESTR:ARG%开始习惯被粘液涌入的感觉……`); // :434
    } else { // :435
      await era.printAndWait(`冒险者在肛虐的痛苦中癫狂地惨叫着。`); // :436
    } // :437
    await era.print(`肛门经验+{MON_NUM}`); // :438
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :439
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :440
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :441
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :441
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :442
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :442
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :443
    era.set(`exp:${arg}:1 +`, MON_NUM); // :443
  } else if (rand_n(3) == 0) { // :444
    await era.printAndWait(`被全裸地四脚着地压在地上，黏液逆流到肛门里了。`); // :445
    await era.printAndWait(`%SAVESTR:ARG%腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。`); // :446
    await era.print(`耻情点数+{MON_NUM * 10}`); // :447
    await era.print(`屈服点数+{MON_NUM * 10}`); // :448
    // JUEL:ARG:8 + = MON_NUM * 10（变量语义：JUEL 族，ARG:8 +） // :449
    era.set(`juel:${arg}:8 +`, MON_NUM * 10); // :449
    // JUEL:ARG:6 + = MON_NUM * 10（变量语义：JUEL 族，ARG:6 +） // :450
    era.set(`juel:${arg}:6 +`, MON_NUM * 10); // :450
  } else if (rand_n(2) == 0) { // :451
    await era.printAndWait(`黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。`); // :452
    await era.printAndWait(`%SAVESTR:ARG%坚强地试图站起来。`); // :453
    await era.printAndWait(`但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。`); // :454
    await era.print(`肛门经验+{MON_NUM}`); // :455
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :456
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :457
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :458
    era.set(`exp:${arg}:1 +`, MON_NUM); // :458
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :459
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :459
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :460
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :460
  } else { // :461
    await era.printAndWait(`冒险者被包在黏液里，只露出头部发出呜呜的呻吟。`); // :462
    await era.printAndWait(`看来没人相救的话，%SAVESTR:ARG%要被消化在黏液里了。`); // :463
    await era.printAndWait(`但黏液持续的爱抚着身体，可能也会让他溶化在快感之中。`); // :464
    await era.printAndWait(`黏液的麻痹成分，渐渐把%SAVESTR:ARG%遭受凌辱的苦痛身体治愈了。`); // :465
    // BASE:ARG:0 + = 100（变量语义：BASE 族，ARG:0 +） // :466
    era.set(`base:${arg}:0 +`, 100); // :466
  } // :467
  // RAW: WAIT // :468
  return 0; // :469

}

// @INSECT_RYOU男(ARG) // :471
async function INSECT_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :472


  // 赋值 MON_NUM = E:(B + 99) // :475
  if (rand_n(2) == 0) { // :476
    await era.printAndWait(`『叽吱叽吱叽吱……』`); // :477
    await era.printAndWait(`%SAVESTR:ARG%的嘴巴被输卵管插入了，被播下了卵。`); // :478
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :479
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :480
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :481
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :481
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :482
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :482

  } else { // :484
    await era.printAndWait(`『叽吱叽吱叽吱……』`); // :485
    await era.printAndWait(`%SAVESTR:ARG%的肛门被输卵管插入了，被播下了卵。`); // :486
    await era.printAndWait(`不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。`); // :487
    await era.printAndWait(`{MON_NUM}只节肢动物轮流扑在%SAVESTR:ARG%身上，从臀部到背部全被卵覆盖了。`); // :488
    await era.print(`肛门经验+{MON_NUM}`); // :489
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :490
    era.set(`exp:${arg}:1 +`, MON_NUM); // :490
  } // :491
  // RAW: WAIT // :492
  return 0; // :493

}

// @IVY_RYOU男(ARG) // :495
async function IVY_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :496

  // 赋值 MON_NUM = E:(B + 99) // :498
  if (rand_n(2) == 0) { // :499
    await era.printAndWait(`藤蔓勒住了冒险者的脖子。`); // :500
    await era.printAndWait(`%SAVESTR:ARG%呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。`); // :501
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :502
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :503
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :504
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :504
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :505
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :505
  } else { // :506
    await era.printAndWait(`藤蔓在冒险者的肛门里扎根了。`); // :507
    await era.printAndWait(`%SAVESTR:ARG%的肛门被蹂躏着，发出了喊破喉咙的惨叫声。`); // :508
    await era.printAndWait(`藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。`); // :509
    await era.print(`肛门经验+{MON_NUM}`); // :510
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :511
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :512
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :513
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :513
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :514
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :514
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :515
    era.set(`exp:${arg}:1 +`, MON_NUM); // :515
  } // :516
  // RAW: WAIT // :517
  return 0; // :518

}

// @SYOKUSYU_RYOU男(ARG) // :520
async function SYOKUSYU_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :521


  // 赋值 MON_NUM = E:(B + 99) // :524
  if (rand_n(4) == 0) { // :525
    await era.printAndWait(`触手伸进了冒险者的嘴巴里。`); // :526
    await era.printAndWait(`%SAVESTR:ARG%的喉咙被大量的体液灌入，呛到了。不久，他的意识开始模糊了。`); // :527
    await era.print(`欲情点数+{MON_NUM * 10}`); // :528
    // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :529
    era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :529
  } else if (rand_n(3) == 0) { // :530
    await era.printAndWait(`触手伸进了冒险者的肛门里。`); // :531
    await era.printAndWait(`%SAVESTR:ARG%的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，他的意识开始模糊了。`); // :532
    await era.printAndWait(`不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。`); // :533
    await era.print(`肛门经验+{MON_NUM}`); // :534
    await era.print(`欲情点数+{MON_NUM * 10}`); // :535
    // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :536
    era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :536
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :537
    era.set(`exp:${arg}:1 +`, MON_NUM); // :537
  } else if (rand_n(2) == 0) { // :538
    await era.printAndWait(`触手把冒险者绑了起来，吊在半空。`); // :539
    await era.printAndWait(`%SAVESTR:ARG%的嘴巴也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。`); // :540
    await era.printAndWait(`……不久，地上滴落的液体里，开始出现了触手体液之外的东西。`); // :541
    await era.print(`肛门经验+{MON_NUM}`); // :542
    await era.print(`欲情点数+{MON_NUM * 10}`); // :543
    // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :544
    era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :544
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :545
    era.set(`exp:${arg}:1 +`, MON_NUM); // :545
  } else { // :546
    await era.printAndWait(`冒险者被触手吸着乳头，不断的挤奶。`); // :547
    await era.printAndWait(`%SAVESTR:ARG%带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。`); // :548
    await era.printAndWait(`不久之后他感到乳房发胀，触手顺势开始了榨乳。`); // :549
    await era.printAndWait(`不久之后，%SAVESTR:ARG%母乳开始无法抑制地从乳头喷出。`); // :550
    await era.print(`喷奶经验+1`); // :551
    // EXP:ARG:54 + = 1（变量语义：EXP 族，ARG:54 +） // :552
    era.set(`exp:${arg}:54 +`, 1); // :552
  } // :553
  await era.printAndWait(`触手经验+{MON_NUM}`); // :554
  // EXP:ARG:55 + = MON_NUM（变量语义：EXP 族，ARG:55 +） // :555
  era.set(`exp:${arg}:55 +`, MON_NUM); // :555
  return 0; // :556

}

// @FAILY_RYOU男(ARG) // :558
async function FAILY_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :559


  // 赋值 MON_NUM = E:(B + 99) // :562
  if (rand_n(2) == 0) { // :563
    await era.printAndWait(`『所谓的冒险者真是牢不可破啊！』`); // :564
    await era.printAndWait(`妖精拿出了一根和自己身高相等的假阳具。`); // :565
    await era.printAndWait(`『小哥哥来享受这边的穴吧！』`); // :566
    await era.printAndWait(`%SAVESTR:ARG%的惨叫回响在洞窟里……`); // :567
    await era.print(`肛门经验+{MON_NUM}`); // :568
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :569
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :570
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :571
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :571
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :572
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :572
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :573
    era.set(`exp:${arg}:1 +`, MON_NUM); // :573
  } else { // :574
    await era.printAndWait(`『小哥哥的里面，是什么模样呢？』`); // :575
    await era.printAndWait(`%SAVESTR:ARG%的后处被妖精钻入了。妖精对他的反应感到相当有趣，不断地玩弄着后处内的皱褶。`); // :576
    await era.print(`肛门经验+{MON_NUM}`); // :577
    await era.print(`苦痛点数+{MON_NUM * 10}`); // :578
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :579
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :580
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :580
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :581
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :581
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :582
    era.set(`exp:${arg}:1 +`, MON_NUM); // :582
  } // :583
  // RAW: WAIT // :584
  return 0; // :585

}

// @GIANT_RYOU男(ARG) // :587
async function GIANT_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :588


  if (era.get(`cflag:${arg}:131`) > 5) { // :591

    await era.print(`ATAW`); // :593
    // RAW: DATAFORM 『瓦全的　变成了　灰机杯了呀』 // :594
    // RAW: DATAFORM 『巨人肉棒的　形状　几住了哇』 // :595
    // RAW: DATAFORM 『嘿嘿　已经　淋乱不糠了啊』 // :596
    // RAW: DATAFORM 『已经　不是巨人阴茎　就没滑　满足　了吗？』 // :597
    // RAW: DATAFORM 『和巨人肉棒　挺搭的　肉棒套子　嘛』 // :598
    // RAW: ENDDATA // :599
  } else if (era.get(`cflag:${arg}:131`) > 3) { // :600


    await era.print(`ATAW`); // :603
    // RAW: DATAFORM 『哈哈　熟络起来了欸』 // :604
    // RAW: DATAFORM 『又垒了呀……专用的 灰机杯』 // :605
    // RAW: DATAFORM 『正愁呢　来得正好』 // :606
    // RAW: DATAFORM 『没用的哦　向巨人　反抗啥的……』 // :607
    // RAW: DATAFORM 冒险者意识到了自己是无法抵抗巨人那压倒性的体型的矮小种族…… // :608
    // RAW: DATAFORM 面对巨大雄性的体型、冒险者的武器从手中落下、呆呆地跪坐在地上 // :609
    // RAW: ENDDATA // :610
  } else { // :611
    await era.print(`ATAW`); // :612
    // RAW: DATAFORM 『看起来值得凌辱一番。』 // :613
    // RAW: DATAFORM 『忍不住了！』 // :614
    // RAW: DATAFORM 『屁股反正也是能用的穴啊？』 // :615
    // RAW: DATAFORM 『要让我满足哦！』 // :616
    // RAW: DATAFORM 『真是太小啦！』 // :617
    // RAW: ENDDATA // :618
  } // :619
  // 赋值 MON_NUM = E:(B + 99) // :620


  if (MON_NUM == 1) { // :623
    await era.print(`『喝下去哦』`); // :624
    await era.print(`%SAVESTR:ARG%侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。`); // :625
    await era.print(`绝顶了的巨人，把精液从头到脚浇了他一身。`); // :626
    await era.print(`口交经验+1`); // :627
    await era.print(`精液经验+1`); // :628
    // EXP:ARG:22 + = 1（变量语义：EXP 族，ARG:22 +） // :629
    era.set(`exp:${arg}:22 +`, 1); // :629
    // EXP:ARG:20 + = 1（变量语义：EXP 族，ARG:20 +） // :630
    era.set(`exp:${arg}:20 +`, 1); // :630

    if (era.get(`cflag:${target}:16`) == -1) { // :633
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :633
      era.set(`cflag:${target}:16`, 995); // :633
    } // :633
    // RAW: WAIT // :634
    return 0; // :635
  } // :636


  if (rand_n(3) == 0) { // :639
    await era.printAndWait(`『快点啊！』`); // :640
    await era.printAndWait(`%SAVESTR:ARG%拼命地舔舐着巨人的阴茎。`); // :641
    await era.printAndWait(`他拼命地哀求着，请饶了他，不然一定会被玩坏。`); // :642
    await era.printAndWait(`必须快点搞定这{MON_NUM}只巨人，不然不知道他们什么时候会改变主意。`); // :643

    if (era.get(`talent:${arg}:52`)) { // :645

      await era.printAndWait(`『哦！小东西，你很擅长用舌头嘛！』`); // :647
      await era.printAndWait(`%SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般的好技术。`); // :648
      await era.printAndWait(`巨人被他灵活的舌头弄射了，精液像喷泉一样，从%SAVESTR:ARG%的头顶淋到脚底。`); // :649
      // RAW: MON_NUM *= 2 // :650
    } // :651

    await era.print(`口交经验+{MON_NUM}`); // :653
    await era.print(`精液经验+{MON_NUM}`); // :654
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :655
    era.set(`exp:${arg}:22 +`, MON_NUM); // :655
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :656
    era.set(`exp:${arg}:20 +`, MON_NUM); // :656

    if (era.get(`cflag:${target}:16`) == -1) { // :659
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :659
      era.set(`cflag:${target}:16`, 995); // :659
    } // :659
  } else if (rand_n(2) == 0) { // :660
    await era.printAndWait(`『哦！小东西，叫得不错嘛！』`); // :661
    await era.printAndWait(`%SAVESTR:ARG%的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让他声嘶力竭地惨叫着，晕了过去。肛门处流出了鲜血。`); // :662
    await era.printAndWait(`『又一个坏掉了吗？用点回复药或许可以再来几下。』`); // :663
    await era.printAndWait(`插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有{MON_NUM}只巨人为止……`); // :664

    if (era.get(`talent:${arg}:34`)) { // :666

      await era.printAndWait(`%SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地抓了回来。`); // :668
      await era.printAndWait(`『喂！这里有个想逃跑的！抓住他！』`); // :669
      await era.printAndWait(`%SAVESTR:ARG%被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……`); // :670
      await era.print(`恐怖点数+{MON_NUM * 10}`); // :671
      // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :672
      era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :672

    } // :674

    await era.print(`肛门经验+{MON_NUM}`); // :676
    await era.print(`精液经验+{MON_NUM}`); // :677
    await era.print(`肛门扩张经验+{MON_NUM}`); // :678
    await era.print(`异常经验+1`); // :679
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :680
    era.set(`exp:${arg}:1 +`, MON_NUM); // :680
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :681
    era.set(`exp:${arg}:20 +`, MON_NUM); // :681
    // EXP:ARG:50 + = 1（变量语义：EXP 族，ARG:50 +） // :682
    era.set(`exp:${arg}:50 +`, 1); // :682
    // EXP:ARG:53 + = MON_NUM（变量语义：EXP 族，ARG:53 +） // :683
    era.set(`exp:${arg}:53 +`, MON_NUM); // :683
  } else { // :684
    await era.printAndWait(`『我想到好主意了』`); // :685
    await era.printAndWait(`巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。`); // :686
    await era.printAndWait(`%SAVESTR:ARG%对未知状况非常恐惧。`); // :687
    await era.printAndWait(`巨人端着一大盆精液，对他说，`); // :688
    await era.printAndWait(`『不想死的话，就全部喝光。』`); // :689
    await era.printAndWait(`%SAVESTR:ARG%脸上血色褪尽。`); // :690

    if (era.get(`talent:${arg}:11`)) { // :692

      await era.printAndWait(`%SAVESTR:ARG%用冷淡的眼神瞪着巨人，表示不从。`); // :694
      await era.printAndWait(`『看来还不明白啊！』`); // :695
      await era.printAndWait(`巨人用巨大的手掌按着%SAVESTR:ARG%的头，直接把头按入水盆里。`); // :696
      await era.printAndWait(`「咕噜，咕噜，咕咕噜」`); // :697
      await era.printAndWait(`巨人把他的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。`); // :698
      await era.print(`恐怖点数+{MON_NUM * 10}`); // :699
      // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :700
      era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :700

    } // :702

    await era.print(`精液经验+{MON_NUM * 10}`); // :704
    // EXP:ARG:20 + = MON_NUM * 10（变量语义：EXP 族，ARG:20 +） // :705
    era.set(`exp:${arg}:20 +`, MON_NUM * 10); // :705
  } // :706
  // RAW: WAIT // :707
  return 0; // :708

}

// @MAN_RYOU男(ARG) // :710
async function MAN_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :711


  if (era.get(`cflag:${arg}:131`) > 5) { // :714

    await era.print(`ATAW`); // :716
    // RAW: DATAFORM 『已经、离不开我们了吗』 // :717
    // RAW: DATAFORM 『嘿嘿、今儿也会好好疼你』 // :718
    // RAW: DATAFORM 『对黑暗世界、还习惯吗』 // :719
    // RAW: DATAFORM 『又来被侵犯了吗』 // :720
    // RAW: DATAFORM 『又来寻欢啊…不知道过去的自己见到现在这样、会怎么想啊？』 // :721
    // RAW: ENDDATA // :722
  } else if (era.get(`cflag:${arg}:131`) > 3) { // :723


    await era.print(`ATAW`); // :726
    // RAW: DATAFORM 『哦、又来啦』 // :727
    // RAW: DATAFORM 『怕不是故意输掉的吧？』 // :728
    // RAW: DATAFORM 『这么喜欢我们的肉棒吗？』 // :729
    // RAW: DATAFORM 『真是心口不一』 // :730
    // RAW: DATAFORM 冒险者默默服从着魔族男人们的要求…… // :731
    // RAW: DATAFORM 魔族男人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边 // :732
    // RAW: ENDDATA // :733
  } else { // :734
    await era.print(`ATAW`); // :735
    // RAW: DATAFORM 『真是好家伙啊！』 // :736
    // RAW: DATAFORM 『真是喜欢啊！？』 // :737
    // RAW: DATAFORM 『好兄弟，欢迎来到黑暗的世界。』 // :738
    // RAW: DATAFORM 『别怨了，是你们先打下来的。』 // :739
    // RAW: DATAFORM 『有想过会变成这样吗？』 // :740
    // RAW: ENDDATA // :741
  } // :742

  // 赋值 MON_NUM = E:(B + 99) // :744


  if (rand_n(5) == 0) { // :747

    await era.printAndWait(`『屁股露出来，抬高点！』`); // :749
    await era.printAndWait(`%SAVESTR:ARG%露出了屈辱的神色，向魔族男人翘起了屁股。`); // :750
    await era.printAndWait(`%SAVESTR:ARG%全裸地侍奉着兽人们的阴茎。只要喝掉所有{MON_NUM}个男人的精液的话，它们就答应不侵犯他的后穴………`); // :751
    await era.printAndWait(`『嘴巴张开点！鸡鸡都被你弄脏了，弄干净！』`); // :752
    await era.printAndWait(`%SAVESTR:ARG%依照吩咐，用嘴巴侍奉着阴茎……`); // :753
    await era.print(`口交经验+{MON_NUM}`); // :754
    await era.print(`精液经验+{MON_NUM}`); // :755
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :756
    era.set(`exp:${arg}:22 +`, MON_NUM); // :756
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :757
    era.set(`exp:${arg}:20 +`, MON_NUM); // :757

    if (era.get(`cflag:${target}:16`) == -1) { // :760
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :760
      era.set(`cflag:${target}:16`, 995); // :760
    } // :760

  } else if (rand_n(4) == 0) { // :762

    await era.printAndWait(`%SAVESTR:ARG%被强行宣布为肉便器，全身都被写满了淫秽的话语。`); // :764


    await era.print(`%SAVESTR:ARG%的身上，被写着`); // :767
    await era.print(`【最喜欢阴茎】`); // :768
    if (era.get(`talent:${arg}:22`) || era.get(`talent:${arg}:21`)) { // :769

      await era.print(`【性冷淡便器】`); // :771
    } // :772

    if (era.get(`talent:${arg}:24`) || era.get(`talent:${arg}:30`)) { // :774

      await era.print(`【看似忠贞的便器出道】`); // :776
    } // :777

    if (era.get(`talent:${arg}:42`)) { // :779

      await era.print(`【又粘又湿】`); // :781
    } // :782

    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) { // :784

      await era.print(`【愉悦的脸】`); // :786
    } // :787

    if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`)) { // :789

      await era.print(`【有鸡鸡的奴隶】`); // :791
    } // :792

    if (rand_n(3) == 0) { // :794
      await era.print(`【操我】`); // :795
    } else if (rand_n(2) == 0) { // :796
      await era.print(`【肛门免费】`); // :797
    } else { // :798
      await era.print(`【母猪】`); // :799
    } // :800

    await era.print(`之类的话。`); // :802

    await era.printAndWait(`络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。`); // :804
    await era.printAndWait(`当被最后一人抱着的时候，%SAVESTR:ARG%已经失去了任何表情，成为全身的穴都流出着精液的下流便器了。`); // :805
    await era.printAndWait(`地下城里，充斥着{MON_NUM}人份的精液和体液的异样臭味。魔族男人对原冒险者重生成为肉便器相当欢迎。`); // :806


    if (era.get(`talent:${arg}:244`)) { // :809

      await era.printAndWait(`%SAVESTR:ARG%的蓝色肌肤，被沾满了精液……`); // :811
    } else if (era.get(`talent:${arg}:253`)) { // :812

      await era.printAndWait(`%SAVESTR:ARG%健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……`); // :814
    } else if (era.get(`talent:${arg}:255`)) { // :815

      await era.printAndWait(`%SAVESTR:ARG%美丽的白皙肌肤被精液玷污了……`); // :817
    } // :818

    await era.print(`肛门经验+{MON_NUM}`); // :820
    await era.print(`口交经验+{MON_NUM}`); // :821
    await era.print(`精液经验+{MON_NUM}`); // :822
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :823
    era.set(`exp:${arg}:1 +`, MON_NUM); // :823
    // EXP:ARG:22 + = MON_NUM（变量语义：EXP 族，ARG:22 +） // :824
    era.set(`exp:${arg}:22 +`, MON_NUM); // :824
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :825
    era.set(`exp:${arg}:20 +`, MON_NUM); // :825

    if (era.get(`cflag:${target}:16`) == -1) { // :828
      // CFLAG:16  = 995（变量语义：CFLAG 族，16） // :828
      era.set(`cflag:${target}:16`, 995); // :828
    } // :828
  } else if (rand_n(3) == 0) { // :829
    await era.printAndWait(`『明明是冒险者，却忍不住了吗？』`); // :830
    await era.printAndWait(`%SAVESTR:ARG%的肛门被灌入了灌肠液，忍受着强烈的便意。`); // :831
    await era.printAndWait(`『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』`); // :832
    await era.printAndWait(`%SAVESTR:ARG%拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。`); // :833
    await era.printAndWait(`肛门里的污物，终于无法忍耐地飞散而出。`); // :834
    await era.printAndWait(`魔族男人们看到这样，毫不留情地说着侮蔑的话，%SAVESTR:ARG%在这份屈辱中泣不成声。`); // :835

    if (era.get(`talent:${arg}:62`)) { // :837

      await era.printAndWait(`%SAVESTR:ARG%因自己拉出的东西的味道而皱起眉头，羞愧欲死。`); // :839
      await era.print(`苦痛点数+{MON_NUM * 10}`); // :840
      // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :841
      era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :841
    } // :842

    await era.print(`耻情点数+{MON_NUM * 10}`); // :844
    await era.print(`屈服点数+{MON_NUM * 10}`); // :845
    await era.print(`自慰经验+1`); // :846
    await era.print(`调教自慰经验+1`); // :847
    // JUEL:ARG:8 + = MON_NUM * 10（变量语义：JUEL 族，ARG:8 +） // :848
    era.set(`juel:${arg}:8 +`, MON_NUM * 10); // :848
    // JUEL:ARG:6 + = MON_NUM * 10（变量语义：JUEL 族，ARG:6 +） // :849
    era.set(`juel:${arg}:6 +`, MON_NUM * 10); // :849
    // EXP:ARG:10 + = 1（变量语义：EXP 族，ARG:10 +） // :850
    era.set(`exp:${arg}:10 +`, 1); // :850
    // EXP:ARG:11 + = 1（变量语义：EXP 族，ARG:11 +） // :851
    era.set(`exp:${arg}:11 +`, 1); // :851
  } else if (rand_n(2) == 0) { // :852
    await era.printAndWait(`『那个冒险者大人，在舔我的肛门哦！』`); // :853
    await era.printAndWait(`%SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对于生命安全的保证。`); // :854
    await era.printAndWait(`『你的尊严，真不值钱呢！』`); // :855
    await era.printAndWait(`%SAVESTR:ARG%拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。`); // :856
    await era.printAndWait(`侍奉结束之后，%SAVESTR:ARG%还被迫要说出淫秽的话语。他忍无可忍地大哭着，宣布自己喜欢舔肛。`); // :857

    if (era.get(`talent:${arg}:17`)) { // :859

      await era.printAndWait(`自尊心低下的%SAVESTR:ARG%，拼命地说着自己是舔肛用奴隶。`); // :861
      // 赋值 Y += 10 // :862
    } // :863

    if (era.get(`talent:${arg}:62`)) { // :865

      await era.printAndWait(`%SAVESTR:ARG%因为舔肛而恶心地吐了。`); // :867
      // 赋值 Y += 10 // :868
    } // :869

    await era.print(`苦痛点数+{MON_NUM * 10}`); // :871
    await era.print(`恐怖点数+{MON_NUM * 10}`); // :872
    // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :873
    era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :873
    // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :874
    era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :874
  } else { // :875
    await era.printAndWait(`『这个为了保命就来者不拒的娼妓！』`); // :876
    await era.printAndWait(`%SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和骂声之中。`); // :877
    await era.printAndWait(`『说！说我是个相对于做冒险者，更喜欢做娼妓的淫乱贱婊！』`); // :878
    await era.printAndWait(`%SAVESTR:ARG%在激烈的抽插中，不断地重复着屈辱的台词。`); // :879

    if (era.get(`talent:${arg}:17`)) { // :881

      await era.printAndWait(`%SAVESTR:ARG%拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……`); // :883
      await era.print(`屈服点数+{MON_NUM * 10}`); // :884
      // JUEL:ARG:6 + = MON_NUM * 10（变量语义：JUEL 族，ARG:6 +） // :885
      era.set(`juel:${arg}:6 +`, MON_NUM * 10); // :885
    } // :886

    if (era.get(`abl:${arg}:21`) > 0) { // :888

      await era.printAndWait(`说着过激的言语，%SAVESTR:ARG%的心里产生了情欲。`); // :890
      await era.print(`欲情点数+{MON_NUM * 10}`); // :891
      // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :892
      era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :892
    } // :893

    await era.print(`肛门经验+{MON_NUM}`); // :895
    await era.print(`精液经验+{MON_NUM}`); // :896
    // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :897
    era.set(`exp:${arg}:1 +`, MON_NUM); // :897
    // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :898
    era.set(`exp:${arg}:20 +`, MON_NUM); // :898
  } // :899
  // RAW: WAIT // :900
  return 0; // :901

}

// @BEAST_RYOU男(ARG) // :903
async function BEAST_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :904


  if (era.get(`cflag:${arg}:131`) > 5) { // :907

    await era.print(`ATAW`); // :909
    // RAW: DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意 // :910
    // RAW: DATAFORM 魔兽慢慢地靠近了冒险者、爬到了土下座着的冒险者身上…… // :911
    // RAW: DATAFORM 冒险者对逐渐熟悉了与兽相交的自己惊诧不已 // :912
    // RAW: DATAFORM 被魔兽的眼睛凝视着、冒险者只能伏下身子、将腰抬了起来 // :913
    // RAW: DATAFORM 冒险者已经无法从野兽粗暴的交尾中、脱身了…… // :914
    // RAW: ENDDATA // :915
  } else if (era.get(`cflag:${arg}:131`) > 3) { // :916


    await era.print(`ATAW`); // :919
    // RAW: DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息…… // :920
    // RAW: DATAFORM 魔兽静静的、像确认什么似的盯着冒险者 // :921
    // RAW: DATAFORM 冒险者这次也在与魔兽交尾的想象中、感受着奇妙的背德感 // :922
    // RAW: DATAFORM 魔兽的眼睛、像是在期待着什么似的、渐渐被欲望的颜色扭曲了 // :923
    // RAW: DATAFORM 冒险者想起了几次兽交的经历、股间硬了起来…… // :924
    // RAW: DATAFORM 魔兽静静的靠近冒险者、冷眼下看着一蹶不振的冒险者 // :925
    // RAW: ENDDATA // :926
  } else { // :927
    await era.print(`ATAW`); // :928
    // RAW: DATAFORM 『咕噜咕噜噜』 // :929
    // RAW: DATAFORM 冒险者吃不消野兽的臭味。 // :930
    // RAW: DATAFORM 冒险者还未能接受自己被野兽扑倒的事实。 // :931
    // RAW: DATAFORM 『嘎哦～呜～～』 // :932
    // RAW: DATAFORM 冒险者因野兽的粗暴而感到恐惧。 // :933
    // RAW: ENDDATA // :934
  } // :935

  // 赋值 MON_NUM = E:(B + 99) // :937

  await era.printAndWait(`『噢！』`); // :939
  await era.printAndWait(`野兽们，开始轮番兽奸%SAVESTR:ARG%。`); // :940
  await era.printAndWait(`「啊！呜！不要啊……啊啊啊！」`); // :941
  await era.printAndWait(`%SAVESTR:ARG%无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……`); // :942

  if (era.get(`talent:${arg}:314`) == 2) { // :944

    await era.printAndWait(`身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱……`); // :946
    await era.print(`欲情点数+{MON_NUM * 10}`); // :947
    // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :948
    era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :948
  } // :949
  await era.print(`肛门经验+{MON_NUM}`); // :950
  await era.print(`苦痛点数+{MON_NUM * 10}`); // :951
  await era.print(`恐怖点数+{MON_NUM * 10}`); // :952
  // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :953
  era.set(`exp:${arg}:1 +`, MON_NUM); // :953
  // JUEL:ARG:9 + = MON_NUM * 10（变量语义：JUEL 族，ARG:9 +） // :954
  era.set(`juel:${arg}:9 +`, MON_NUM * 10); // :954
  // JUEL:ARG:10 + = MON_NUM * 10（变量语义：JUEL 族，ARG:10 +） // :955
  era.set(`juel:${arg}:10 +`, MON_NUM * 10); // :955
  await era.printAndWait(`兽奸经验+{MON_NUM}`); // :956
  // EXP:ARG:56 + = MON_NUM（变量语义：EXP 族，ARG:56 +） // :957
  era.set(`exp:${arg}:56 +`, MON_NUM); // :957
  return 0; // :958

}

// @BRAIN_RYOU男(ARG) // :960
async function BRAIN_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :961


  if (era.get(`cflag:${arg}:131`) > 5) { // :964

    await era.print(`ATAW`); // :966
    // RAW: DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起…… // :967
    // RAW: DATAFORM 食脑魔在媚态的食粮跟前、发出了奇妙的笑声 // :968
    // RAW: DATAFORM 冒险者沉浸在大脑在改造所致的异次元的快乐中、空洞的双眼里闪烁着期待的神色…… // :969
    // RAW: DATAFORM 食脑魔舔了舔舌头。看来这份食粮、给它带来了捕食的喜悦 // :970
    // RAW: DATAFORM 冒险者对即将开始的异次元的快乐兴奋不已、甚至已经失禁了 // :971
    // RAW: ENDDATA // :972
  } else if (era.get(`cflag:${arg}:131`) > 3) { // :973


    await era.print(`ATAW`); // :976
    // RAW: DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了…… // :977
    // RAW: DATAFORM 食脑魔在玩坏了的食粮跟前、发出了令人不寒而栗的笑声 // :978
    // RAW: DATAFORM 冒险者感到自己的大脑、已经到达了无可挽回的地步 // :979
    // RAW: DATAFORM 食脑魔在战栗的食粮跟前、舔了舔舌头。冒险者默默地看着这一切…… // :980
    // RAW: DATAFORM 冒险者想起了食脑魔所带来的异次元地快乐、咬紧了牙关…… // :981
    // RAW: ENDDATA // :982
  } else { // :983
    await era.print(`ATAW`); // :984
    // RAW: DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。 // :985
    // RAW: DATAFORM 冒险者狂乱地挣扎着，企图逃避食脑魔。 // :986
    // RAW: DATAFORM 冒险者拼命地乞求着饶命。 // :987
    // RAW: DATAFORM 冒险者直接精神崩溃，痴痴地笑着。 // :988
    // RAW: DATAFORM 冒险者因为过度的恐惧而失禁了。 // :989
    // RAW: ENDDATA // :990
  } // :991

  // 赋值 MON_NUM = E:(B + 99) // :993

  if (rand_n(2) == 0) { // :995

    await era.printAndWait(`食脑魔咬住冒险者的头，开始支配他的精神。`); // :997
    await era.printAndWait(`「啊…啊…啊…啊…啊……」`); // :998
    await era.printAndWait(`%SAVESTR:ARG%眼珠上翻，伸出舌头，脱粪了。`); // :999
    await era.print(`肛门经验+{MON_NUM * 10}`); // :1000
    await era.print(`异常经验+1`); // :1001
    // EXP:ARG:50 + = 1（变量语义：EXP 族，ARG:50 +） // :1002
    era.set(`exp:${arg}:50 +`, 1); // :1002
    // EXP:ARG:1 + = MON_NUM * 10（变量语义：EXP 族，ARG:1 +） // :1003
    era.set(`exp:${arg}:1 +`, MON_NUM * 10); // :1003
  } else { // :1004
    await era.printAndWait(`食脑魔的触手缠绕着冒险者，他死命地挣扎，却无法挣脱。`); // :1005
    await era.printAndWait(`食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里，往脑髓注入媚药成分。`); // :1006
    await era.printAndWait(`%SAVESTR:ARG%被过度的快感弄失禁了，成了废人。`); // :1007
    await era.printAndWait(`幸好，躯干还是完好的。`); // :1008
    await era.print(`异常经验+1`); // :1009
    // EXP:ARG:50 + = 1（变量语义：EXP 族，ARG:50 +） // :1010
    era.set(`exp:${arg}:50 +`, 1); // :1010
  } // :1011
  // RAW: WAIT // :1012
  return 0; // :1013

}

// @HORSE_RYOU男(ARG) // :1015
async function HORSE_RYOU男() {
  // #DIM MON_NUM（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :1016


  if (era.get(`cflag:${arg}:131`) > 5) { // :1019

    await era.print(`ATAW`); // :1021
    // RAW: DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎…… // :1022
    // RAW: DATAFORM 馬凑近了败倒的冒险者、将勃起的阴茎伸到了眼前 // :1023
    // RAW: DATAFORM 冒险者意识到了自己变得毫不抵触与馬相交的事实、露出了令人作呕的笑容…… // :1024
    // RAW: DATAFORM 馬粗暴地对待冒险者、冒险者也好不挣扎的接受了…… // :1025
    // RAW: DATAFORM 冒险者对馬的粗暴行径、在心中感到了一丝悸动…… // :1026
    // RAW: ENDDATA // :1027
  } else if (era.get(`cflag:${arg}:131`) > 3) { // :1028


    await era.print(`ATAW`); // :1031
    // RAW: DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎…… // :1032
    // RAW: DATAFORM 馬看着放弃抵抗的冒险者、轻蔑地笑了起来 // :1033
    // RAW: DATAFORM 冒险者回想起与馬相交的自己、惊诧不已 // :1034
    // RAW: DATAFORM 馬大声嘶吼着、冒险者胆怯不已、手中的武器落在了地上…… // :1035
    // RAW: DATAFORM 冒险者脑中铭刻下了馬的粗暴行径、变得无法抵抗了…… // :1036
    // RAW: ENDDATA // :1037
  } else { // :1038
    await era.print(`ATAW`); // :1039
    // RAW: DATAFORM 『唔哦哦！』 // :1040
    // RAW: DATAFORM 冒险者吃不消马的臭味。 // :1041
    // RAW: DATAFORM 冒险者还未能接受自己被马扑倒的事实。 // :1042
    // RAW: DATAFORM 『吁！』 // :1043
    // RAW: DATAFORM 冒险者因马的粗暴而感到恐惧。 // :1044
    // RAW: ENDDATA // :1045
  } // :1046

  // 赋值 MON_NUM = E:(B + 99) // :1048

  await era.printAndWait(`养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。`); // :1050
  await era.printAndWait(`『你很有素质嘛～看在这个份上，就用魔法让你好受些。』`); // :1051
  await era.printAndWait(`%SAVESTR:ARG%不得不用肛门承受着兽奸……`); // :1052

  if (era.get(`talent:${arg}:314`) == 2) { // :1054

    await era.printAndWait(`身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱……`); // :1056
    await era.print(`欲情点数+{MON_NUM * 10}`); // :1057
    // JUEL:ARG:5 + = MON_NUM * 10（变量语义：JUEL 族，ARG:5 +） // :1058
    era.set(`juel:${arg}:5 +`, MON_NUM * 10); // :1058
  } // :1059

  await era.print(`肛门经验+{MON_NUM}`); // :1061
  await era.print(`精液经验+{MON_NUM}`); // :1062
  await era.printAndWait(`兽奸经验+{MON_NUM}`); // :1063
  // EXP:ARG:1 + = MON_NUM（变量语义：EXP 族，ARG:1 +） // :1064
  era.set(`exp:${arg}:1 +`, MON_NUM); // :1064
  // EXP:ARG:20 + = MON_NUM（变量语义：EXP 族，ARG:20 +） // :1065
  era.set(`exp:${arg}:20 +`, MON_NUM); // :1065
  // EXP:ARG:56 + = MON_NUM（变量语义：EXP 族，ARG:56 +） // :1066
  era.set(`exp:${arg}:56 +`, MON_NUM); // :1066
  // RAW: WAIT // :1067
  return 0; // :1068


}

// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====
// 1. :1 函数参数 @ORC_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 2. :4 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 3. :5 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 4. :8 未知语句 DATAFORM 『喂！闭嘴……别吵啦！快点喝下去！』
// 5. :9 未知语句 DATAFORM 『舔个……干净……』
// 6. :10 未知语句 DATAFORM 『打得都勃起了……』
// 7. :11 未知语句 ENDDATA
// 8. :16 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 9. :17 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 10. :18 未知语句 MON_NUM *= 2
// 11. :24 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 12. :91 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 13. :94 未知语句 DATAFORM 阴茎
// 14. :95 未知语句 DATAFORM 脏污的阴茎
// 15. :96 未知语句 DATAFORM 带肉刺的阴茎
// 16. :97 未知语句 DATAFORM 巨根
// 17. :98 未知语句 DATAFORM 蘑菇似的阴茎
// 18. :99 未知语句 ENDDATA
// 19. :106 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 20. :107 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 21. :109 未知语句 MON_NUM *= 2
// 22. :138 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 23. :143 未知语句 DATAFORM 『兄弟们，把所有的穴都塞满哦！』
// 24. :144 未知语句 DATAFORM 『嘿，简直像三明治一样』
// 25. :145 未知语句 DATAFORM 『连耳朵，都给你灌满精液咯』
// 26. :146 未知语句 ENDDATA
// 27. :148 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 28. :150 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 29. :155 未知语句 DATAFORM 阴茎
// 30. :156 未知语句 DATAFORM 脏污的阴茎
// 31. :157 未知语句 DATAFORM 带肉刺的阴茎
// 32. :158 未知语句 DATAFORM 巨根
// 33. :159 未知语句 DATAFORM 蘑菇似的阴茎
// 34. :160 未知语句 ENDDATA
// 35. :162 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 36. :162 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 37. :178 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 38. :187 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 39. :198 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 40. :217 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 41. :258 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 42. :263 未知语句 DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』
// 43. :264 未知语句 DATAFORM 『猪就要有，猪的样子』
// 44. :265 未知语句 DATAFORM 『你只是，比我们还低级的，家畜罢了！』
// 45. :266 未知语句 ENDDATA
// 46. :268 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 47. :293 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 48. :301 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 49. :303 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 50. :312 CALL GOBI_KOUJO, 1 —— 口上文件里多为存根调用，人工定存根名
// 51. :315 CALL GOBI_KOUJO, 5 —— 口上文件里多为存根调用，人工定存根名
// 52. :322 CALL GOBI_KOUJO, 1 —— 口上文件里多为存根调用，人工定存根名
// 53. :325 CALL GOBI_KOUJO, 5 —— 口上文件里多为存根调用，人工定存根名
// 54. :332 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 55. :341 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 56. :343 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 57. :346 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 58. :351 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 59. :358 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 60. :359 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 61. :372 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 62. :374 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 63. :378 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 64. :380 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 65. :387 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 66. :397 未知语句 WAIT
// 67. :401 函数参数 @SLIME_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 68. :405 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 69. :406 RAND RAND:6 → rand_n(6)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 70. :407 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 71. :416 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 72. :418 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 73. :423 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 74. :425 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 75. :428 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 76. :431 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 77. :434 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 78. :444 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 79. :446 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 80. :451 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 81. :453 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 82. :463 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 83. :465 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 84. :468 未知语句 WAIT
// 85. :471 函数参数 @INSECT_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 86. :475 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 87. :476 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 88. :478 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 89. :486 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 90. :488 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 91. :492 未知语句 WAIT
// 92. :495 函数参数 @IVY_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 93. :498 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 94. :499 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 95. :501 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 96. :508 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 97. :517 未知语句 WAIT
// 98. :520 函数参数 @SYOKUSYU_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 99. :524 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 100. :525 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 101. :527 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 102. :530 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 103. :532 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 104. :538 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 105. :540 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 106. :548 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 107. :550 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 108. :558 函数参数 @FAILY_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 109. :562 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 110. :563 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 111. :567 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 112. :576 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 113. :584 未知语句 WAIT
// 114. :587 函数参数 @GIANT_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 115. :594 未知语句 DATAFORM 『瓦全的　变成了　灰机杯了呀』
// 116. :595 未知语句 DATAFORM 『巨人肉棒的　形状　几住了哇』
// 117. :596 未知语句 DATAFORM 『嘿嘿　已经　淋乱不糠了啊』
// 118. :597 未知语句 DATAFORM 『已经　不是巨人阴茎　就没滑　满足　了吗？』
// 119. :598 未知语句 DATAFORM 『和巨人肉棒　挺搭的　肉棒套子　嘛』
// 120. :599 未知语句 ENDDATA
// 121. :604 未知语句 DATAFORM 『哈哈　熟络起来了欸』
// 122. :605 未知语句 DATAFORM 『又垒了呀……专用的 灰机杯』
// 123. :606 未知语句 DATAFORM 『正愁呢　来得正好』
// 124. :607 未知语句 DATAFORM 『没用的哦　向巨人　反抗啥的……』
// 125. :608 未知语句 DATAFORM 冒险者意识到了自己是无法抵抗巨人那压倒性的体型的矮小种族……
// 126. :609 未知语句 DATAFORM 面对巨大雄性的体型、冒险者的武器从手中落下、呆呆地跪坐在地上
// 127. :610 未知语句 ENDDATA
// 128. :613 未知语句 DATAFORM 『看起来值得凌辱一番。』
// 129. :614 未知语句 DATAFORM 『忍不住了！』
// 130. :615 未知语句 DATAFORM 『屁股反正也是能用的穴啊？』
// 131. :616 未知语句 DATAFORM 『要让我满足哦！』
// 132. :617 未知语句 DATAFORM 『真是太小啦！』
// 133. :618 未知语句 ENDDATA
// 134. :620 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 135. :625 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 136. :634 未知语句 WAIT
// 137. :639 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 138. :641 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 139. :648 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 140. :649 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 141. :650 未知语句 MON_NUM *= 2
// 142. :660 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 143. :662 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 144. :668 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 145. :670 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 146. :687 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 147. :690 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 148. :694 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 149. :696 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 150. :707 未知语句 WAIT
// 151. :710 函数参数 @MAN_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 152. :717 未知语句 DATAFORM 『已经、离不开我们了吗』
// 153. :718 未知语句 DATAFORM 『嘿嘿、今儿也会好好疼你』
// 154. :719 未知语句 DATAFORM 『对黑暗世界、还习惯吗』
// 155. :720 未知语句 DATAFORM 『又来被侵犯了吗』
// 156. :721 未知语句 DATAFORM 『又来寻欢啊…不知道过去的自己见到现在这样、会怎么想啊？』
// 157. :722 未知语句 ENDDATA
// 158. :727 未知语句 DATAFORM 『哦、又来啦』
// 159. :728 未知语句 DATAFORM 『怕不是故意输掉的吧？』
// 160. :729 未知语句 DATAFORM 『这么喜欢我们的肉棒吗？』
// 161. :730 未知语句 DATAFORM 『真是心口不一』
// 162. :731 未知语句 DATAFORM 冒险者默默服从着魔族男人们的要求……
// 163. :732 未知语句 DATAFORM 魔族男人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边
// 164. :733 未知语句 ENDDATA
// 165. :736 未知语句 DATAFORM 『真是好家伙啊！』
// 166. :737 未知语句 DATAFORM 『真是喜欢啊！？』
// 167. :738 未知语句 DATAFORM 『好兄弟，欢迎来到黑暗的世界。』
// 168. :739 未知语句 DATAFORM 『别怨了，是你们先打下来的。』
// 169. :740 未知语句 DATAFORM 『有想过会变成这样吗？』
// 170. :741 未知语句 ENDDATA
// 171. :744 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 172. :747 RAND RAND:5 → rand_n(5)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 173. :750 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 174. :751 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 175. :753 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 176. :762 RAND RAND:4 → rand_n(4)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 177. :764 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 178. :767 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 179. :794 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 180. :796 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 181. :805 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 182. :811 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 183. :814 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 184. :817 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 185. :829 RAND RAND:3 → rand_n(3)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 186. :831 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 187. :833 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 188. :835 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 189. :839 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 190. :852 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 191. :854 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 192. :856 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 193. :857 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 194. :861 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 195. :862 局部变量 Y += 10 —— 单字母局部变量，JS 侧声明与赋值人工定
// 196. :867 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 197. :868 局部变量 Y += 10 —— 单字母局部变量，JS 侧声明与赋值人工定
// 198. :877 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 199. :879 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 200. :883 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 201. :890 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 202. :900 未知语句 WAIT
// 203. :903 函数参数 @BEAST_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 204. :910 未知语句 DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意
// 205. :911 未知语句 DATAFORM 魔兽慢慢地靠近了冒险者、爬到了土下座着的冒险者身上……
// 206. :912 未知语句 DATAFORM 冒险者对逐渐熟悉了与兽相交的自己惊诧不已
// 207. :913 未知语句 DATAFORM 被魔兽的眼睛凝视着、冒险者只能伏下身子、将腰抬了起来
// 208. :914 未知语句 DATAFORM 冒险者已经无法从野兽粗暴的交尾中、脱身了……
// 209. :915 未知语句 ENDDATA
// 210. :920 未知语句 DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……
// 211. :921 未知语句 DATAFORM 魔兽静静的、像确认什么似的盯着冒险者
// 212. :922 未知语句 DATAFORM 冒险者这次也在与魔兽交尾的想象中、感受着奇妙的背德感
// 213. :923 未知语句 DATAFORM 魔兽的眼睛、像是在期待着什么似的、渐渐被欲望的颜色扭曲了
// 214. :924 未知语句 DATAFORM 冒险者想起了几次兽交的经历、股间硬了起来……
// 215. :925 未知语句 DATAFORM 魔兽静静的靠近冒险者、冷眼下看着一蹶不振的冒险者
// 216. :926 未知语句 ENDDATA
// 217. :929 未知语句 DATAFORM 『咕噜咕噜噜』
// 218. :930 未知语句 DATAFORM 冒险者吃不消野兽的臭味。
// 219. :931 未知语句 DATAFORM 冒险者还未能接受自己被野兽扑倒的事实。
// 220. :932 未知语句 DATAFORM 『嘎哦～呜～～』
// 221. :933 未知语句 DATAFORM 冒险者因野兽的粗暴而感到恐惧。
// 222. :934 未知语句 ENDDATA
// 223. :937 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 224. :940 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 225. :942 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 226. :946 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 227. :960 函数参数 @BRAIN_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 228. :967 未知语句 DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……
// 229. :968 未知语句 DATAFORM 食脑魔在媚态的食粮跟前、发出了奇妙的笑声
// 230. :969 未知语句 DATAFORM 冒险者沉浸在大脑在改造所致的异次元的快乐中、空洞的双眼里闪烁着期待的神色……
// 231. :970 未知语句 DATAFORM 食脑魔舔了舔舌头。看来这份食粮、给它带来了捕食的喜悦
// 232. :971 未知语句 DATAFORM 冒险者对即将开始的异次元的快乐兴奋不已、甚至已经失禁了
// 233. :972 未知语句 ENDDATA
// 234. :977 未知语句 DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……
// 235. :978 未知语句 DATAFORM 食脑魔在玩坏了的食粮跟前、发出了令人不寒而栗的笑声
// 236. :979 未知语句 DATAFORM 冒险者感到自己的大脑、已经到达了无可挽回的地步
// 237. :980 未知语句 DATAFORM 食脑魔在战栗的食粮跟前、舔了舔舌头。冒险者默默地看着这一切……
// 238. :981 未知语句 DATAFORM 冒险者想起了食脑魔所带来的异次元地快乐、咬紧了牙关……
// 239. :982 未知语句 ENDDATA
// 240. :985 未知语句 DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。
// 241. :986 未知语句 DATAFORM 冒险者狂乱地挣扎着，企图逃避食脑魔。
// 242. :987 未知语句 DATAFORM 冒险者拼命地乞求着饶命。
// 243. :988 未知语句 DATAFORM 冒险者直接精神崩溃，痴痴地笑着。
// 244. :989 未知语句 DATAFORM 冒险者因为过度的恐惧而失禁了。
// 245. :990 未知语句 ENDDATA
// 246. :993 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 247. :995 RAND RAND:2 → rand_n(2)——随机源需注入（参照 kojo-k5.js 的 rand 参数）
// 248. :999 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 249. :1006 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 250. :1007 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 251. :1012 未知语句 WAIT
// 252. :1015 函数参数 @HORSE_RYOU男(ARG) —— 参数声明已剥（JS 函数签名人工定）
// 253. :1022 未知语句 DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……
// 254. :1023 未知语句 DATAFORM 馬凑近了败倒的冒险者、将勃起的阴茎伸到了眼前
// 255. :1024 未知语句 DATAFORM 冒险者意识到了自己变得毫不抵触与馬相交的事实、露出了令人作呕的笑容……
// 256. :1025 未知语句 DATAFORM 馬粗暴地对待冒险者、冒险者也好不挣扎的接受了……
// 257. :1026 未知语句 DATAFORM 冒险者对馬的粗暴行径、在心中感到了一丝悸动……
// 258. :1027 未知语句 ENDDATA
// 259. :1032 未知语句 DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……
// 260. :1033 未知语句 DATAFORM 馬看着放弃抵抗的冒险者、轻蔑地笑了起来
// 261. :1034 未知语句 DATAFORM 冒险者回想起与馬相交的自己、惊诧不已
// 262. :1035 未知语句 DATAFORM 馬大声嘶吼着、冒险者胆怯不已、手中的武器落在了地上……
// 263. :1036 未知语句 DATAFORM 冒险者脑中铭刻下了馬的粗暴行径、变得无法抵抗了……
// 264. :1037 未知语句 ENDDATA
// 265. :1040 未知语句 DATAFORM 『唔哦哦！』
// 266. :1041 未知语句 DATAFORM 冒险者吃不消马的臭味。
// 267. :1042 未知语句 DATAFORM 冒险者还未能接受自己被马扑倒的事实。
// 268. :1043 未知语句 DATAFORM 『吁！』
// 269. :1044 未知语句 DATAFORM 冒险者因马的粗暴而感到恐惧。
// 270. :1045 未知语句 ENDDATA
// 271. :1048 变量语义 MON_NUM = E:(B + 99) —— 局部/自定义变量，人工映射
// 272. :1052 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 273. :1056 插值 未知插值 %SAVESTR:ARG% —— 保真锁会红，须人工定归一
// 274. :1067 未知语句 WAIT
