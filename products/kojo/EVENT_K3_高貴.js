/**
 * @file EVENT_K3_高貴.ERB 的口上转译产物（issue #107 原型，待复核）
 *
 * 源: target/ERB/口上/EVENT_K3_高貴.ERB
 *
 * == 复核标记（207 处） ==
 * 本文件由 tools/kojo-transpiler.js 生成。以下位置是机械转换无法
 * 确定的，须 agent 逐字对照 ERB 源复核（裁定 7：agent 逐字对照，
 * 不是抽查）。复核成果 = 在本文件内改写成最终形态，并把本 REVIEW
 * 清单逐条删掉；转译器默认不覆盖本文件（产物边界，issue #10），
 * 复核成果不会被重跑覆盖。
 *   1. :95 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
 *   2. :398 CALL K3_KOJO2 —— 口上文件里多为存根调用，人工定存根名
 *   3. :415 未知语句 SETCOLOR 255,204,255
 *   4. :417 未知语句 RESETCOLOR
 *   5. :423 未知语句 SETCOLOR 255,204,255
 *   6. :425 未知语句 RESETCOLOR
 *   7. :434 未知语句 SETCOLOR 255,204,255
 *   8. :436 未知语句 RESETCOLOR
 *   9. :439 未知语句 SETCOLOR 255,204,255
 *   10. :441 未知语句 RESETCOLOR
 *   11. :445 未知语句 SETCOLOR 255,204,255
 *   12. :447 未知语句 RESETCOLOR
 *   13. :450 未知语句 SETCOLOR 255,204,255
 *   14. :452 未知语句 RESETCOLOR
 *   15. :458 未知语句 SETCOLOR 255,204,255
 *   16. :460 未知语句 RESETCOLOR
 *   17. :462 未知语句 SETCOLOR 255,204,255
 *   18. :464 未知语句 RESETCOLOR
 *   19. :473 未知语句 SETCOLOR 255,204,255
 *   20. :475 未知语句 RESETCOLOR
 *   21. :482 未知语句 SETCOLOR 255,204,255
 *   22. :484 未知语句 RESETCOLOR
 *   23. :487 未知语句 SETCOLOR 255,204,255
 *   24. :489 未知语句 RESETCOLOR
 *   25. :494 未知语句 SETCOLOR 255,204,255
 *   26. :496 未知语句 RESETCOLOR
 *   27. :497 未知语句 SETCOLOR 255,204,255
 *   28. :499 未知语句 RESETCOLOR
 *   29. :510 未知语句 SETCOLOR 255,204,255
 *   30. :512 未知语句 RESETCOLOR
 *   31. :517 未知语句 SETCOLOR 255,204,255
 *   32. :519 未知语句 RESETCOLOR
 *   33. :525 未知语句 SETCOLOR 255,204,255
 *   34. :527 未知语句 RESETCOLOR
 *   35. :595 CALL K3_KOJO2 —— 口上文件里多为存根调用，人工定存根名
 *   36. :790 同名函数 @EVENTEND 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTEND', …) 注册，参照 ere/kojo/kojo-k5.js
 *   37. :890 CALL COLOSSEUM_KOJO_3 —— 口上文件里多为存根调用，人工定存根名
 *   38. :904 CALL DOG_KOJO_3 —— 口上文件里多为存根调用，人工定存根名
 *   39. :1013 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
 *   40. :1160 变量语义 P = PALAM:3 + UP:3 —— 局部/自定义变量，人工映射
 *   41. :2475 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
 *   42. :2635 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
 *   43. :3184 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
 *   44. :4538 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   45. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   46. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   47. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   48. :4540 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   49. :4540 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   50. :4541 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   51. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   52. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   53. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   54. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   55. :4545 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   56. :4545 插值 未知插值 %SELF_CALL(TARGET,5)% —— 保真锁会红，须人工定归一
 *   57. :4545 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   58. :4546 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   59. :4546 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   60. :4549 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   61. :4549 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   62. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   63. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   64. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   65. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   66. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   67. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   68. :4551 插值 未知插值 %SELF_CALL(TARGET,3)% —— 保真锁会红，须人工定归一
 *   69. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   70. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   71. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   72. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   73. :4556 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   74. :4556 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   75. :4560 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   76. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   77. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   78. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   79. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   80. :4584 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   81. :4600 假名残留 归一后仍含日文假名：っ —— 查 lang-table 是否应收
 *   82. :4650 未知语句 REPEAT CHARANUM
 *   83. :4653 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   84. :4661 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   85. :4662 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   86. :4664 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   87. :4665 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   88. :4665 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   89. :4667 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   90. :4667 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   91. :4668 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   92. :4673 未知语句 REND
 *   93. :4677 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   94. :4677 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   95. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   96. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   97. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   98. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   99. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   100. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   101. :4686 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   102. :4688 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   103. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   104. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   105. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   106. :4696 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   107. :4696 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   108. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   109. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   110. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   111. :4743 未知语句 REPEAT CHARANUM
 *   112. :4763 未知语句 REND
 *   113. :4790 未知语句 REPEAT CHARANUM
 *   114. :4797 未知语句 REND
 *   115. :4822 未知语句 REPEAT CHARANUM
 *   116. :4829 未知语句 REND
 *   117. :5225 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
 *   118. :6671 变量语义 LOCAL = TALENT:320 —— 局部/自定义变量，人工映射
 *   119. :6673 变量语义 LOCAL:1 = LOCAL % 10 —— 局部/自定义变量，人工映射
 *   120. :6675 变量语义 LOCAL:3 = LOCAL % 1000 —— 局部/自定义变量，人工映射
 *   121. :6676 变量语义 LOCAL:3 / = 100 —— 局部/自定义变量，人工映射
 *   122. :6678 变量语义 LOCAL:4 = LOCAL % 10000 —— 局部/自定义变量，人工映射
 *   123. :6679 变量语义 LOCAL:4 / = 1000 —— 局部/自定义变量，人工映射
 *   124. :6681 变量语义 LOCAL:5 = LOCAL % 1000000 —— 局部/自定义变量，人工映射
 *   125. :6682 变量语义 LOCAL:5 / = 100000 —— 局部/自定义变量，人工映射
 *   126. :6684 变量语义 LOCAL:6 = LOCAL % 10000000 —— 局部/自定义变量，人工映射
 *   127. :6685 变量语义 LOCAL:6 / = 1000000 —— 局部/自定义变量，人工映射
 *   128. :6687 变量语义 LOCAL:7 = LOCAL % 100000000 —— 局部/自定义变量，人工映射
 *   129. :6688 变量语义 LOCAL:7 / = 10000000 —— 局部/自定义变量，人工映射
 *   130. :6690 变量语义 LOCAL:8 = LOCAL % 1000000000 —— 局部/自定义变量，人工映射
 *   131. :6691 变量语义 LOCAL:8 / = 100000000 —— 局部/自定义变量，人工映射
 *   132. :6693 变量语义 LOCAL:9 = LOCAL:5 + LOCAL:6 + LOCAL:7 + LOCAL:8 —— 局部/自定义变量，人工映射
 *   133. :7104 变量语义 P = PALAM:3 + UP:3 —— 局部/自定义变量，人工映射
 *   134. :7135 变量语义 P = PALAM:5 + UP:5 —— 局部/自定义变量，人工映射
 *   135. :7166 变量语义 P = PALAM:8 + UP:8 —— 局部/自定义变量，人工映射
 *   136. :7183 变量语义 P = PALAM:10 + UP:10 —— 局部/自定义变量，人工映射
 *   137. :7246 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   138. :7246 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   139. :7247 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   140. :7247 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   141. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   142. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   143. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   144. :7290 插值 未知插值 %SELF_CALL(TARGET,4)% —— 保真锁会红，须人工定归一
 *   145. :7296 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
 *   146. :7326 变量语义 A = UP:11 + UP:12 —— 局部/自定义变量，人工映射
 *   147. :7672 CALL SELL_MATURO_K0 —— 口上文件里多为存根调用，人工定存根名
 *   148. :7692 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
 *   149. :7697 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
 *   150. :7728 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
 *   151. :7733 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
 *   152. :8086 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   153. :8087 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   154. :8105 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   155. :8106 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   156. :8125 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   157. :8126 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   158. :8127 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   159. :8145 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   160. :8146 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   161. :8147 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   162. :8165 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   163. :8166 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   164. :8167 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   165. :8185 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   166. :8186 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   167. :8187 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   168. :8206 CALL BENKI_PLAYER_NAME —— 口上文件里多为存根调用，人工定存根名
 *   169. :8207 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   170. :8208 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   171. :8209 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   172. :8209 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   173. :8228 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   174. :8230 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   175. :8249 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   176. :8251 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   177. :8270 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   178. :8272 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   179. :8782 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   180. :8785 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   181. :8788 插值 未知插值 %SELF_CALL_FIRST(A)% —— 保真锁会红，须人工定归一
 *   182. :8788 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   183. :8791 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   184. :8800 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   185. :8803 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   186. :8814 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   187. :8817 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   188. :8820 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   189. :8823 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   190. :8823 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   191. :8826 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   192. :8840 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   193. :8843 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   194. :8847 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   195. :8852 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   196. :8854 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   197. :8860 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   198. :8862 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   199. :8868 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   200. :8870 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   201. :8879 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   202. :8886 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   203. :8931 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   204. :8947 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   205. :8955 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   206. :8961 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
 *   207. :8974 函数参数 @GOBI_KOUJO_K3, ARG:0 —— 参数声明已剥（JS 函数签名人工定）
 */

'use strict';

// 需要复核 agent 补的导入（产物初稿不 require，保真锁会红）：
// const era = require('#/era-electron');
// const { heart, self_call, self_call_first } = require('#/kojo/kojo-text');
// const { chara_callname } = require('#/utils/callname-utils');
// 以及 target_name / player_name / assi_name / master_name / sc() / scf()
// 的取值（%SAVESTR:TARGET% 等插值的 JS 侧表达式）。
/**
 * =================================================
 * eramaou専用口上
 * =================================================
 * 高贵口上　最終更新2014/08/16
 * 加筆者:maouの口上人１号
 * -------------------------------------------------------------------------------
 * 【ライセンス詳細】
 * 	・基本項目(許可する項目を"○"に、許可しない項目を"×"に変更してください。)
 * 	+----+----+-------------------------------+
 * 	|番号|許可|ライセンス内容                 |
 * 	+----+----+-------------------------------+
 * 	|   1| ○ | 処理上のバグ修正              |
 * 	+----+----+-------------------------------+
 * 	|   2| ○ | 口上の誤字・脱字の修正        |
 * 	+----+----+-------------------------------+
 * 	|   3| ○ | 口上まとめへの収録            |
 * 	+----+----+-------------------------------+
 * 	|   4| ○ | 口上の新規追加                |
 * 	+----+----+-------------------------------+
 * 	|   5| ○ | 既存口上の改変                |
 * 	+----+----+-------------------------------+
 * 	|   6| ○ | 改変した口上の自由な再配布    |
 * 	+----+----+-------------------------------+
 * 	|   7| ○ | 口上内容の移植・転載          |
 * 	+----+----+-------------------------------+
 * 
 * 【ライセンス特記】
 * 特に无。ライセンスフリー。加筆・改変・流用・再配布等も可（許可不要）
 * -------------------------------------------------------------------------------
 * まずX1とX2をキャラ番号に置換し、Y1を助手のキャラ番号に置換してください
 * ただし、キャラ番号が一桁のキャラの場合、X1,Y1は1、X2は01のように変える必要があります
 * コマンド内の各条件の下にあるPRINTFORMWの後ろに、半角スペースを置いてセリフを追加してください。
 * 口上を追加しないコマンドには行頭に『;』をつけたほうが、
 * 予期せぬ不具合などが起こるのをある程度防げるかもしれません
 * 最後になりますが、read meもできるかぎり読んで下さい
 * eratohoU専用口上テンプレートを改造して流用
 * erapoke専用口上テンプレート（簡略版）をさらに改造
 * -------------------------------------------------
 * -------------------------------------------------
 * 高贵口上
 * （コンセプトなどがあればここに書いておくと、加筆する際の目安になるでしょう）
 * 気品の高い育ちのよさそうな娘
 * 作成メモ
 * CFLAG:360～365をフェラ連携口上に使用
 * 【淫乱】陥落すると、徹底的に堕落するが言葉の端々にそれっぽさが残る
 * 【爱慕】陥落すると、主人に性的に尽くすような爱
 * イメージはペリ犬
 * 种族がエルフ（TALENT:TARGET:314 == 1）の時の口上追加
 * 【淫乱】がついたらダークエルフ（TALENT:TARGET:314 == 7）
 * 調教開始時、調教終了時の台詞に口上追加
 * 【爱慕】もしくは【淫乱】時の初吻、处女喪失正常位、处女喪失背后位、处女喪失骑乘位の口上追加
 * 【爱慕】もしくは【淫乱】時のアナル正常位、アナル背后位の初回に口上追加
 * 売却時に口上追加
 * 初調教時 CFLAG:201に种族ごとの台詞を追加
 * CFLAG:370を魔族スイッチとして使用
 * CFLAG:372以降に着脱フラグ
 * 壶虫 CFLAG:312　CFLAG:372
 * 肛门虫 CFLAG:314　CFLAG:374
 * 阴蒂夹 CFLAG:315　CFLAG:375
 * ニプルキャップ CFLAG:316　CFLAG:376
 * 榨乳器(母乳体质のみ) CFLAG:317　CFLAG:377
 * 飞机杯(扶她/男人のみ) CFLAG:318　CFLAG:378
 * 肛珠 CFLAG:320　CFLAG:379
 * 眼罩 CFLAG:344　CFLAG:380
 * 绳子 CFLAG:345　CFLAG:385
 * 口塞 CFLAG:346　CFLAG:386
 * 故郷に恋人がいる場合（TALENT:TARGET:317 == 4）調教開始時、キス、正常位、背后位、骑乘位に口上追加
 * 助手、野良犬、触手調教時、崩坏時に口上スキップ
 * 
 * 一人称＝わたくし
 * ペニス＝オチンチン、ペニス　女性器＝あそこ、オマンコ　アナル＝アナル、ケツマンコ
 * 
 * ;追記者／兽奸追加してみました
 * ;追記者／爱撫を回数で進行形式に。爱撫一つで挫折した、とも言えます
 * ;追記者／自己扒开を条件を満たしている連文をずらずら並べる形に
 * ;追記者／兽奸　浣腸　寄生に追記
 * -------------------------------------------------
 * --------------------------------------------------
 * 口上ファイルの存在判定（X2をキャラ番号に置換）
 * --------------------------------------------------
 */

// @EVENTTRAIN // :81
function EVENTTRAIN() {
  // #PRI（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :82
  // FLAG:103  = 1（变量语义：FLAG 族，103） // :83
  era.set('flag:103', 1); // :83
  if (FLAG:7 == 0) { // :85
    // FLAG:7  = 2（变量语义：FLAG 族，7） // :85
    era.set('flag:7', 2); // :85
  } // :85


// @EVENTEND // :87
function EVENTEND() {
  // #LATER（事件优先级修饰符，JS 侧用 on() 的 TIER 表达） // :88
  // FLAG:103  = 0（变量语义：FLAG 族，103） // :89
  era.set('flag:103', 0); // :89

  // -------------------------------------------------- // :91
  // EVENTTRAIN関係（X1をキャラ番号に置換） // :92
  // 調教開始時のセリフ CFLAG 201～219を使用 // :93
  // ------------------------------------------------- // :94

// @EVENTTRAIN // :95
function EVENTTRAIN() {
  if (FLAG:7 <= 0) { // :97
    return 0; // :97
  } // :97
  if (TALENT:163 != 1) { // :99
    return 0; // :99
  } // :99

  // ------------------------------------------------- // :101
  // 初調教時 CFLAG:201 // :102
  // ------------------------------------------------- // :103
  if (CFLAG:201 == 0) { // :104
    era.drawLine(); // :105
    // 高贵エルフ // :106
    if (TALENT:TARGET:314 == 1) { // :107
      // エルフの領域征服フラグ // :108
      if (FLAG:87 >= 1) { // :109
        await era.printAndWait(`「就算…就算${sc()}的国家覆灭了也好…也不会向你这种家伙屈服呢………」`); // :110
        await era.printAndWait(`${target_name}哪怕知道自己的国家被你占领了也好，也没有崩溃掉，保持着毅然的态度。`); // :111
        await era.printAndWait(`「而且…最重要的是${sc()}才不是什么为了成为你的慰安妇的玩具来的…！」`); // :112
        await era.printAndWait(`但是，你十分清楚${target_name}进到牢笼里的时候，因为恐惧和悲伤而哭着颤抖着身体………`); // :113
      } else { // :114
        await era.printAndWait(`「！请不要触碰${sc()}」`); // :115
        await era.printAndWait(`「以为${sc()}是谁来的啊！？」`); // :116
        await era.printAndWait(`「对被称为精灵族的姬勇士的${target_name}来说………」`); // :117
        await era.print(''); // :118
        await era.printAndWait(`「…………！」`); // :119
        await era.printAndWait(`「是啊…你就是魔王…哼哼、以为这样就能让${sc()}怎么样了吗？」`); // :120
        await era.printAndWait(`${target_name}无畏的笑着，哪怕在败北的时候被俘也好………`); // :121
      } // :122
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :123
      era.set(`cflag:${target}:201`, 1); // :123
      // 人狼 // :124
    } else if (TALENT:TARGET:314 == 2) { // :125
      await era.printAndWait(`「哼~…快点将${sc()}放开，这样至少会让你轻松一点死掉呢。」`); // :126
      await era.printAndWait(`人狼的${target_name}哪怕被抓住也表现出了一脸有余裕的样子。`); // :127
      await era.printAndWait(`看来对于自身的肉体强韧有着很大的自信啊…不过，很快就会明白这种事情在这里没有意义的吧………`); // :128
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :129
      era.set(`cflag:${target}:201`, 1); // :129
      // 吸血鬼 // :130
    } else if (TALENT:TARGET:314 == 3) { // :131
      await era.printAndWait(`「呼哼…被这样抓到的还是第一次来着…跟你这种下贱的东西做对手还是让人兴趣缺缺啊」`); // :132
      await era.printAndWait(`吸血鬼的${target_name}冷冷地看着你。`); // :133
      await era.printAndWait(`「快点将${sc()}放开呐」`); // :134
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :135
      era.set(`cflag:${target}:201`, 1); // :135
      // デュラハン // :136
    } else if (TALENT:TARGET:314 == 4) { // :137
      await era.printAndWait(`「原谅什么的…怎样哭喊求饶你才会原谅呢？」`); // :138
      await era.printAndWait(`作为无头骑士的${target_name}比想象地还要冷静。`); // :139
      await era.printAndWait(`（看着吧…肯定会找到机会逃出这里的………）`); // :140
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :141
      era.set(`cflag:${target}:201`, 1); // :141
      // ドラゴン // :142
    } else if (TALENT:TARGET:314 == 5) { // :143
      await era.printAndWait(`「呃…要不是力量被封印住的话，像你这种家伙一瞬间就会消失了…！」`); // :144
      await era.printAndWait(`龙少女的${target_name}用憎恨的眼神瞪着你。`); // :145
      await era.printAndWait(`「对于将${sc()}关在这种地方的事情，必定会让你后悔的！！」`); // :146
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :147
      era.set(`cflag:${target}:201`, 1); // :147
      // 天使 // :148
    } else if (TALENT:TARGET:314 == 6) { // :149
      await era.printAndWait(`「呃…不管怎样对待${sc()}都好、${sc()}也不会屈服的！」`); // :150
      await era.printAndWait(`「${sc()}的身体可是伟大的父亲的东西来的！」`); // :151
      await era.printAndWait(`作为天使的${target_name}哪怕力量被封印了也没有改变态度………`); // :152
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :153
      era.set(`cflag:${target}:201`, 1); // :153
      // 魔族 // :154
    } else if (TALENT:TARGET:314 == 9) { // :155
      await era.printAndWait(`「骗…骗人…${sc()}居然…居然变成了如此污秽的魔族了………」`); // :156
      await era.printAndWait(`看来${target_name}还没有被改造成为魔族，成为魔族其中一员的自觉啊。`); // :157
      await era.printAndWait(`沉浸在震惊和悲伤的${target_name}注意到你的存在后用魔族的眼睛瞪向了你。`); // :158
      await era.printAndWait(`「绝对…绝对不会原谅你的…！」`); // :159
      await era.printAndWait(`还以为成为了魔族就会安分下来了、看来会变得更加有趣起来了………`); // :160
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :161
      era.set(`cflag:${target}:201`, 1); // :161
      // 魔族スイッチ１ // :162
      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :163
      era.set(`cflag:${target}:370`, 1); // :163
      // ホビット // :164
    } else if (TALENT:TARGET:314 == 10) { // :165
      await era.printAndWait(`「快点将${sc()}放开！」`); // :166
      await era.printAndWait(`哪怕跟霍比特人一样小的身体、${target_name}强势的态度也没有改变………`); // :167
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :168
      era.set(`cflag:${target}:201`, 1); // :168
      // ドワーフ // :169
    } else if (TALENT:TARGET:314 == 11) { // :170
      await era.printAndWait(`「将${sc()}放了的话可是会有赎金的噢！」`); // :171
      await era.printAndWait(`这样的提案你对此嗤之以鼻、向着作为矮人的${target_name}慢慢地靠近了………`); // :172
      // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :173
      era.set(`cflag:${target}:201`, 1); // :173
      // それ以外（人間） // :174
    } else { // :175
      await era.printAndWait(`「这种事情…不可能…不可能来的啊！」`); // :176
      await era.printAndWait(`${target_name}被扔进了这辈子都没有考虑过的恶劣环境里、歇斯底里地哭喊着。`); // :177
      await era.printAndWait(`看来得从头教育一下，在这种活着是怎样的一件事情来着………`); // :178
    } // :179
    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :180
    era.set(`cflag:${target}:201`, 1); // :180
    return 1; // :181
    // ------------------------------------------------- // :182
    // 魔族化（１回のみ）初回調教後魔族化、陥落前 CFLAG:370 // :183
    // ------------------------------------------------- // :184
  } else if (CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :185
    await era.printAndWait(`「哪怕被改造成这种样子也好…还不能自我了断什么的………」`); // :186
    await era.printAndWait(`按照你所希望的那样，${target_name}被改造成了魔族，成为了魔族的新的一员了。`); // :187
    await era.printAndWait(`哪怕无法相信般幸运地逃到地面上了也好，她也不会被人类社会而接纳了吧。`); // :188
    await era.printAndWait(`「不，不要过来这边…………」`); // :189
    if (MARK:2 == 3) { // :191
      await era.printAndWait(`「不要…不要再将${sc()}当成玩具了………」`); // :191
    } // :191
    // 魔族スイッチ２ // :192
    // CFLAG:370  = 2（变量语义：CFLAG 族，370） // :193
    era.set(`cflag:${target}:370`, 2); // :193
    return 1; // :194

    // ------------------------------------------------- // :196
    // NTR再捕獲 CFLAG:650～660 // :197
    // ------------------------------------------------- // :198
  } else if (CFLAG:201 >= 1 && CFLAG:650 == 1) { // :199
    if (TALENT:85 || TALENT:76) { // :200
      era.drawLine(); // :201
      await era.printAndWait(`看到那个水晶球的事情告诉了${target_name}后，${target_name}的脸色就变了。`); // :202
      await era.printAndWait(`「啊啊…魔王大人…请…请原谅${target_name}………那个时候是…是没有办法的事情来得………」`); // :203
      await era.printAndWait(`「让${sc()}做任何事情补偿都可以…所以…所以请原谅不贞的${sc()}吧…………」`); // :204
      // NTRスイッチ解除 // :205
      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :206
      era.set(`cflag:${target}:650`, 0); // :206
    } else { // :207
      era.drawLine(); // :208
      await era.printAndWait(`「又再抓回来调教什么的…对于背叛者赐予死刑不好吗？」`); // :209
      await era.printAndWait(`${target_name}讽刺般笑着………`); // :210
      // NTRスイッチ解除 // :211
      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :212
      era.set(`cflag:${target}:650`, 0); // :212
    } // :213
    return 1; // :214
    // ------------------------------------------------- // :215
    // 屈服刻印（各Lv一回のみ） CFLAG:201 // :216
    // ------------------------------------------------- // :217
    // 屈服刻印Lv1 // :218
  } else if (CFLAG:201 < 2 && MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :219
    era.drawLine(); // :220
    // 高贵エルフ // :221
    if (TALENT:TARGET:314 == 1) { // :222
      await era.printAndWait(`「哼~、这种程度的事情${sc()}才…！」`); // :223
      await era.printAndWait(`哪怕坐在地板上${target_name}反抗的态度也可见一斑………`); // :224
      // それ以外 // :225
    } else { // :226
      await era.printAndWait(`「${sc()}不要再触碰我了！…无礼之徒！」`); // :227
      await era.printAndWait(`${target_name}哪怕身体颤抖着也用毅然的态度目不转睛地盯着你………`); // :228
    } // :229
    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :230
    era.set(`cflag:${target}:201`, 2); // :230
    return 1; // :231

    // 屈服刻印Lv2 // :233
  } else if (CFLAG:201 < 3 && MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :234
    era.drawLine(); // :235
    // 高贵エルフ // :236
    if (TALENT:TARGET:314 == 1) { // :237
      await era.printAndWait(`「呃…${scf()}、请不要触碰${sc()}………！」`); // :238
      await era.printAndWait(`虽然说着强势的台词，但是${target_name}胆怯地看着你………`); // :239
      // それ以外 // :240
    } else { // :241
      await era.printAndWait(`「不会认输…才不会认输呐…」`); // :242
      await era.printAndWait(`${target_name}趴在了地板上，但是哪怕这样还是没有屈服的样子………`); // :243
    } // :244
    // CFLAG:201  = 3（变量语义：CFLAG 族，201） // :245
    era.set(`cflag:${target}:201`, 3); // :245
    return 1; // :246

    // 屈服刻印Lv3 // :248
  } else if (CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :249
    era.drawLine(); // :250
    // 高贵エルフ // :251
    if (TALENT:TARGET:314 == 1) { // :252
      await era.printAndWait(`「不，不要靠近过来…不要对${sc()}…做残酷的事情…」`); // :253
      await era.printAndWait(`「拜托了…请…不要做残酷的事情………」`); // :254
      await era.printAndWait(`${target_name}瘫倒在了地板上，因为恐怖而颤抖着………`); // :255
      // それ以外 // :256
    } else { // :257
      await era.printAndWait(`「已经…输掉了…也没关系了吗…」`); // :258
      await era.printAndWait(`恍惚的${target_name}这样喃喃自语着………`); // :259
    } // :260
    // CFLAG:201  = 4（变量语义：CFLAG 族，201） // :261
    era.set(`cflag:${target}:201`, 4); // :261
    return 1; // :262

    // 淫乱 // :264
  } else if (CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT:TARGET:314 != 9) { // :265
    era.drawLine(); // :266
    // 高贵ダークエルフ // :267
    if (TALENT:TARGET:314 == 7) { // :268
      await era.printAndWait(`${target_name}在冰冷的地板上正坐着。`); // :269
      await era.printAndWait(`「主人~…那个…那个…」`); // :270
      await era.printAndWait(`${target_name}的眼神飘忽不定，拼命地想要说出话来。`); // :271
      await era.printAndWait(`「${scf()}…${sc()}想…想要…主人、主人的、大、大鸡巴…请主人赏，赏赐…」`); // :272
      await era.printAndWait(`${target_name}咕噜地吞了一口口水、眼睛盯着${player_name}的股间。`); // :273
      await era.printAndWait(`「${sc()}是…没有主人的大鸡巴的话…就无法活下…可怜而淫乱的精灵来的………」`); // :274
      await era.printAndWait(`${target_name}的双目慢慢地失去了理性的光芒。`); // :275
      await era.printAndWait(`「请…怜悯…怜悯一下吧~………」`); // :276
      await era.printAndWait(`${target_name}一边说着一边土下座，${target_name}的屁股正淫乱地左右摇晃着………`); // :277
      // それ以外 // :278
    } else { // :279
      await era.printAndWait(`「啊啊嗯~…主人哈嗯~…」`); // :280
      await era.printAndWait(`${target_name}露出了可爱的笑容像你抱了过来。`); // :281
      await era.printAndWait(`「怎么都…怎么都忍不住呐…请对${sc()}淫靡而下流的身体…赐予调教吧…」`); // :282
      await era.printAndWait(`${target_name}露出了虽然淫乱却还残留着高贵的样子像你撒起了娇………`); // :283
    } // :284
    // CFLAG:201  = 5（变量语义：CFLAG 族，201） // :285
    era.set(`cflag:${target}:201`, 5); // :285
    return 1; // :286

    // 淫乱+魔族化 // :288
  } else if (TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1) { // :289
    era.drawLine(); // :290
    // 調教前から魔族 // :291
    if (CFLAG:370 == 1) { // :292
      await era.printAndWait(`「啊啊~…从以前就开始想了~…魔王大人的味道闻起来怎么那么好啊~…${heart(1)}」`); // :293
      await era.printAndWait(`${target_name}魔族的瞳孔湿润了起来、也不隐藏自己在发情的这件事情向你走了过来。`); // :294
      await era.printAndWait(`「侍奉…请让${sc()}来侍奉吧…${heart(1)} 想要给魔王大人的身体好好地侍奉呢~${heart(1)}」`); // :295
      await era.printAndWait(`${target_name}依偎在你的身上，在你的耳朵，脖子，胸口等地方降下了亲吻之雨。`); // :296
      await era.printAndWait(`「啊啊~…已经忍不住了呀~…${heart(1)} 大鸡巴、想要大鸡巴~${heart(3)}」`); // :297
      await era.printAndWait(`看着完全堕落了的${target_name}、你如同鄙视地一般朝她笑了起来。`); // :298
      await era.printAndWait(`「啊哈嗯~…请不要用这种眼神看着~…${sc()}只是…想要大鸡巴而已嘛…${heart(1)}」`); // :299
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :300
      era.set(`cflag:${target}:201`, 6); // :300
      return 1; // :301
      // 調教後に魔族 // :302
    } else if (CFLAG:370 == 2) { // :303
      await era.printAndWait(`「最近，给魔王大人侍奉的时候…心里感觉特别地安定呢…${heart(1)}」`); // :304
      await era.printAndWait(`${target_name}魔族的瞳孔湿润了起来、靠向了你。`); // :305
      await era.printAndWait(`「啊啊~…不行了…已经离不开魔王大人的身边了…${heart(3)}」`); // :306
      await era.printAndWait(`轻轻依偎在${master_name}的身边后用手掌温柔地抚摸起了${master_name}的身体。`); // :307
      await era.printAndWait(`「请让我…更多侍奉吧…${heart(1)} 请将…${sc()}弄脏吧…${heart(1)}」`); // :308
      await era.printAndWait(`完全堕落的${target_name}嘴边流下了唾液向你撒起了娇………`); // :309
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :310
      era.set(`cflag:${target}:201`, 6); // :310
      return 1; // :311
      // 陥落後に魔族化 // :312
    } else { // :313
      await era.printAndWait(`「啊哈呜~…${heart(1)} 成为魔族原来是这样的感觉啊${heart(1)}」`); // :314
      await era.printAndWait(`你一来到${target_name}的表情就变得H了起来、好像立马就会从嘴边流下口水了。`); // :315
      await era.printAndWait(`「魔王大人的魔力…渗进了${sc()}的身体里了…啊啊~${heart(1)}」`); // :316
      await era.printAndWait(`「啊啊…脑袋里好热…已经不行了…小穴和肛穴都好…都想要被好好地干一番啊${heart(1)}」`); // :317
      await era.printAndWait(`${target_name}好像现在立马就会开始自慰起来般发情了………`); // :318
      if (TALENT:TARGET:0 == 1) { // :319
        await era.printAndWait(`${target_name}将最后如同没有的自尊心给扔掉了、将两条腿大幅度的敞开了。`); // :320
        await era.printAndWait(`「魔王大人~…请将大鸡巴塞进${heart(1)} ${sc()}的魔王大人专用处女小穴里吧~${heart(1)}」`); // :321
        await era.printAndWait(`「拜托了啦~…如果不行的话…就让魔物们或者狗狗们侵犯好了~~~${heart(1)}」`); // :322
        await era.printAndWait(`看来已经是抑制不住了的样子、是时候好好疼爱疼爱了吧………`); // :323
      } // :324
      // CFLAG:201  = 6（变量语义：CFLAG 族，201） // :325
      era.set(`cflag:${target}:201`, 6); // :325
      return 1; // :326
    } // :327

    // 爱慕 // :329
  } else if (CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0 && TALENT:TARGET:314 != 9) { // :330
    era.drawLine(); // :331
    // 高贵エルフ // :332
    if (TALENT:TARGET:314 == 1) { // :333
      await era.printAndWait(`「啊啊~…我这个${sc()}居然…居然会有这样的感觉什么的………」`); // :334
      await era.printAndWait(`${target_name}展露出了至今都没有见过的温柔的表情向你看了过来。`); // :335
      await era.printAndWait(`「魔王大人…${sc()}…想要跟你永远在一起呢~…如果，可以的话………」`); // :336
      await era.printAndWait(`迅速地向你靠近的${target_name}、在你的耳边用精灵语小声地说着什么。`); // :337
      await era.printAndWait(`貌似包含了什么恋慕的意义在里面，但是因为是精灵语所以细节部分不是很清楚。`); // :338
      await era.printAndWait(`${target_name}长长的耳朵全部变红了，轻轻地离开了突然呆住的你的身旁………`); // :339
      await era.print(''); // :340
      await era.printAndWait(`「请让${sc()}一直伺候在您的身旁吧………」`); // :341
      // それ以外 // :342
    } else { // :343
      await era.printAndWait(`「啊、魔王大人………」`); // :344
      await era.printAndWait(`${target_name}的脸上并没有一丝的恐惧而是温柔地看着你………`); // :345
      await era.printAndWait(`「那、那个…我有个…请求来着………」`); // :346
      await era.print(''); // :347
      await era.printAndWait(`「…用亲爱的来称呼您也…没关系吗…？」`); // :348
    } // :349
    // CFLAG:201  = 7（变量语义：CFLAG 族，201） // :350
    era.set(`cflag:${target}:201`, 7); // :350
    return 1; // :351

    // 爱慕+魔族化 // :353
  } else if (TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 0) { // :354
    era.drawLine(); // :355
    // 調教前から魔族 // :356
    if (CFLAG:370 == 1) { // :357
      await era.printAndWait(`${target_name}向你靠近后、用十分自然地动作俯下身亲吻了${master_name}的脚趾甲。`); // :358
      await era.printAndWait(`那个动作完全没有一丝犹豫。在被${target_name}平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，${target_name}看着你可爱地笑了起来。`); // :359
      await era.printAndWait(`「魔王大人…${sc()}…会像你发誓保证永远的忠诚的…${heart(1)}」`); // :360
      await era.print(''); // :361
      await era.printAndWait(`你稍微想了一下后，温柔地抚摸了${target_name}的脸颊作为你的回答。`); // :362
      await era.printAndWait(`「啊啊~…啊啊~…${sc()}…好幸福啊~…${heart(1)}」`); // :363
      await era.printAndWait(`${target_name}的尾巴摇晃着，身体因为喜悦而颤抖着………`); // :364
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :365
      era.set(`cflag:${target}:201`, 8); // :365
      return 1; // :366
      // 調教後に魔族 // :367
    } else if (CFLAG:370 == 2) { // :368
      await era.printAndWait(`${target_name}向你靠近后、用十分自然的动作来亲吻${master_name}的脚趾甲。`); // :369
      await era.printAndWait(`她的动作没有任何的犹豫。在被${target_name}平时都完全想象不出来、居然会做出如此谦卑的动作的你面前，${target_name}看着你可爱地笑了起来。`); // :370
      await era.printAndWait(`「啊啊~…${sc()}的住所、已经…只能是这里了…${heart(1)}」`); // :371
      await era.printAndWait(`${target_name}就像狗一样在你的脚边谄媚着。那个姿态已经是一点高贵的样子都没有了。`); // :372
      await era.printAndWait(`「啊啊…啊啊…请让${target_name}一直在魔王大人的身边吧…${heart(1)}」`); // :373
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :374
      era.set(`cflag:${target}:201`, 8); // :374
      return 1; // :375
      // 陥落後に魔族 // :376
    } else { // :377
      await era.printAndWait(`「啊啊~…终于成为了魔族了呐~~${heart(1)} 好高兴呢~~~${heart(1)}」`); // :378
      await era.printAndWait(`${target_name}因为太过开心而颤抖着、张开了翅膀甩起了尾巴向你展现着她的身姿。`); // :379
      await era.printAndWait(`「想要一直这样下去呢…更多地侍奉您…大人您的孩子…想要…想要的说………${heart(1)}」`); // :380
      await era.printAndWait(`就像是疼爱系少女的一样露出了羞涩的笑容、作为原勇者的她成为了魔族的新成员，向你撒起了娇………`); // :381
      // CFLAG:201  = 8（变量语义：CFLAG 族，201） // :382
      era.set(`cflag:${target}:201`, 8); // :382
      return 1; // :383
    } // :384

    // 崩坏 // :386
  } else if (TALENT:TARGET:9 == 1 && CFLAG:201 < 9) { // :387
    era.drawLine(); // :388
    await era.printAndWait(`「不要…不要~…请将我从这里放出来吧…父亲大人！！母亲大人！！…啊啊~！啊~！啊啊啊啊啊～！！！」」`); // :389
    await era.printAndWait(`${target_name}用两手不断地向墙壁敲打着。那双手已经鲜血淋漓了。`); // :390
    await era.printAndWait(`${target_name}坏掉的精神已经回不到以前了吧………`); // :391
    // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :392
    era.set(`cflag:${target}:201`, 9); // :392
    return 1; // :393


    // 助手の有無をチェック（いない場合は二回目以降へ飛ぶ） // :396
  } else if (ASSI < 0) { // :397
    // CALL K3_KOJO2 // :398

    // ------------------------------------------------- // :400
    // 簡易助手口上 CFLAG:202～210 // :401
    // Ynを調教対象X1との会話が発生する助手のキャラ番号に変更する // :402
    // 会話が発生する助手を2人以上に増やす場合は、 // :403
    // コピー＆ペーストをしてCFLAGの数を203、204と増やす（210が上限） // :404
    // ------------------------------------------------- // :405
    // 助手村娘A // :406
  } else if (NO:ASSI == 17) { // :407
    // ELSEIF ASSI > 0 // :408
    era.drawLine(); // :409
    // IF talent:ASSI:165 // :410
    // 初めて // :411
    if (CFLAG:202 == 0) { // :412
      // 調教対象が崩坏 // :413
      if (TALENT:TARGET:9 == 1) { // :414
        // RAW: SETCOLOR 255,204,255 // :415
        await era.printAndWait(`『…主人、这个人已经坏掉了哦』`); // :416
        // RAW: RESETCOLOR // :417
        // 既に淫乱持ちで淫乱取得時初口上（陥落イベント）が発生済み // :418
      } else if (TALENT:TARGET:76 == 1 && CFLAG:201 >= 5) { // :419
        await era.printAndWait(`${master_name}将${assi_name}带过来后、${target_name}感到些许奇怪。`); // :420
        await era.printAndWait(`「啊啦？那个孩子是………嗯哼哼~、你也被主人做了各种各样的事情了吧~…」`); // :421
        await era.printAndWait(`懒散地床上起来后，${target_name}整理着自己凌乱的头发。`); // :422
        // RAW: SETCOLOR 255,204,255 // :423
        await era.printAndWait(`『哎~~、果然是这样吗？…今天呢~、是跟姐姐一起玩耍的噢，主人这么说的呢♪』`); // :424
        // RAW: RESETCOLOR // :425
        await era.printAndWait(`${assi_name}将${target_name}如同撒娇一般抱住后就这样推到了………`); // :426
        // 既に爱持ちで爱取得時初口上（陥落イベント）が発生済み // :427
      } else if (TALENT:TARGET:85 == 1 && CFLAG:201 >= 7) { // :428
        await era.printAndWait(`${master_name}将${assi_name}带过来后、${target_name}向这边瞪了过来。`); // :429
        await era.printAndWait(`「明明已经有了${sc()}…却还要带那个孩子过来…！」`); // :430
        // 助手に爱有り // :431
        if (TALENT:ASSI:85 == 1) { // :432
          await era.printAndWait(`如果是以前村女的那一会的话以${target_name}的眼力就会晕过去了吧、但是${assi_name}轻松的招架住了。`); // :433
          // RAW: SETCOLOR 255,204,255 // :434
          await era.printAndWait(`『哇啊~好可怕~、不行的哦~“原”勇者大人、摆出这么一张因为嫉妒而发狂的表情~♪』`); // :435
          // RAW: RESETCOLOR // :436
          await era.printAndWait(`「啊…${scf()}、${sc()}、才、才没有嫉妒什么的呢………」`); // :437
          await era.printAndWait(`可能是因为在${master_name}的面前露出了这样的表情而感到羞耻的${target_name}“啪”地用两手遮住了脸。`); // :438
          // RAW: SETCOLOR 255,204,255 // :439
          await era.printAndWait(`『所以作为同样都喜欢主人的同伴、我们更加地搞好关系吧~？呐~？』`); // :440
          // RAW: RESETCOLOR // :441
          await era.printAndWait(`${assi_name}抓住这样的${target_name}的间隙将她推到了………`); // :442
          // その他 // :443
        } else { // :444
          // RAW: SETCOLOR 255,204,255 // :445
          await era.printAndWait(`『啊哈哈~…大姐姐嫉妒了~♪ 明明不管是不是我的主人，魔王大人也没关系，和谁抱在一起都一样嘛~♪』`); // :446
          // RAW: RESETCOLOR // :447
          await era.printAndWait(`「不，不要乱开玩笑…你不知道${sc()}对那位大人有多………啊啊~、快将手放开」`); // :448
          await era.printAndWait(`${assi_name}将${target_name}的手抓住强行抱了过来。`); // :449
          // RAW: SETCOLOR 255,204,255 // :450
          await era.printAndWait(`『但是今天…俺在魔王大人的面前、将大姐姐给抱住了哦…${heart(1)}』`); // :451
          // RAW: RESETCOLOR // :452
        } // :453
        // それ以外 // :454
      } else { // :455
        await era.printAndWait(`${master_name}将${assi_name}带过来后、${target_name}就一直瞪着这边。`); // :456
        await era.printAndWait(`「将这样的小姑娘带过来…到底想要干嘛呢…！」`); // :457
        // RAW: SETCOLOR 255,204,255 // :458
        await era.printAndWait(`『呜哇~…真是一副了不起的样子呢~…初次见面，大姐姐、今天是由玛奥来调教的噢………』`); // :459
        // RAW: RESETCOLOR // :460
        await era.printAndWait(`「什…请…请别在那里胡闹了！！」`); // :461
        // RAW: SETCOLOR 255,204,255 // :462
        await era.printAndWait(`『才没有在胡闹哦~...这可是主人的命令来的嘛♪』`); // :463
        // RAW: RESETCOLOR // :464
        await era.printAndWait(`${assi_name}将因不愿意而撇着嘴的${target_name}推到了………`); // :465
      } // :466
      // CFLAG:202  = 1（变量语义：CFLAG 族，202） // :467
      era.set(`cflag:${target}:202`, 1); // :467
      return 1; // :468
      // 二回目以降 // :469
    } else if (CFLAG:202 == 1 && FLAG:7 == 2) { // :470
      // 調教対象が崩坏 // :471
      if (TALENT:TARGET:9 == 1) { // :472
        // RAW: SETCOLOR 255,204,255 // :473
        await era.printAndWait(`『已经坏掉了的话…那就弄得更加坏掉也没关系吧★』`); // :474
        // RAW: RESETCOLOR // :475
        // 爱慕 // :476
      } else if (TALENT:TARGET:85 == 1) { // :477
        await era.printAndWait(`${master_name}将${assi_name}带到这里来后、${target_name}不知道为什么摆出了一副伤心的表情。`); // :478
        await era.printAndWait(`「再也不说魔王大人您任性了…哈啊………」`); // :479
        // 助手に爱有り // :480
        if (TALENT:ASSI:85 == 1) { // :481
          // RAW: SETCOLOR 255,204,255 // :482
          await era.printAndWait(`『别摆出这样阴暗的表情嘛…俺只是想要跟勇者大人搞好关系而已嘛~~♪』`); // :483
          // RAW: RESETCOLOR // :484
          await era.printAndWait(`「啊啊~…不，不行的…${sc()}的身体是…那位大人的…嗯~」`); // :485
          await era.printAndWait(`${target_name}的脸颊被抚摸着、不情愿地将身体交给了${assi_name}。`); // :486
          // RAW: SETCOLOR 255,204,255 // :487
          await era.printAndWait(`『看吧~…俺们关系变好的话~、主人也会高兴的………♪』`); // :488
          // RAW: RESETCOLOR // :489
          await era.printAndWait(`${master_name}对${assi_name}使了一下眼色后，${assi_name}便将${target_name}推倒了………`); // :490
        } else { // :491
          await era.printAndWait(`「啊啊~…但是…请至少、请至少不要在大人的面前……做这样的事情……」`); // :492
          await era.printAndWait(`${target_name}只能在${master_name}和${assi_name}的面前微弱地呻吟而已。`); // :493
          // RAW: SETCOLOR 255,204,255 // :494
          await era.printAndWait(`『（啊啊~…主人是想要看这个人的这种表情啊~………♪）』`); // :495
          // RAW: RESETCOLOR // :496
          // RAW: SETCOLOR 255,204,255 // :497
          await era.printAndWait(`『不是的哦～、这可是主人的命令来的啦…来变得淫乱起来吧~♪』`); // :498
          // RAW: RESETCOLOR // :499
          await era.printAndWait(`${assi_name}将正微弱抵抗的${target_name}给推倒了………`); // :500
        } // :501
        // 淫乱 // :502
      } else if (TALENT:TARGET:76 == 1) { // :503
        await era.printAndWait(`${master_name}将${assi_name}带过来后、${target_name}不知道为什么一副很高兴的样子。`); // :504
        await era.printAndWait(`「啊啊~…快来这边吧…」`); // :505
        // 助手に淫乱有り // :506
        if (TALENT:ASSI:76 == 1) { // :507
          await era.printAndWait(`「在主人的面前…让我们都变得淫乱起来吧…♪」`); // :508
          await era.printAndWait(`可能在助手的身上感觉到了相同的气息吧，${target_name}不像样地将双腿给摊开了。`); // :509
          // RAW: SETCOLOR 255,204,255 // :510
          await era.printAndWait(`『啊哈哈~…在主人的面前做个爽、称赞得个爽吧~………♪』`); // :511
          // RAW: RESETCOLOR // :512
          await era.printAndWait(`${target_name}和${assi_name}就像蛇一样互相缠绕在一起了………`); // :513
        } else { // :514
          await era.printAndWait(`「${sc()}想要…将${assi_name}酱的技术铭刻在身体里啊~…♪」`); // :515
          await era.printAndWait(`${target_name}从嘴边露出了淫靡的笑声，将身体摊开了。`); // :516
          // RAW: SETCOLOR 255,204,255 // :517
          await era.printAndWait(`『啊哈嗯~…大姐姐~~…今天也做个爽吧~~………』`); // :518
          // RAW: RESETCOLOR // :519
          await era.printAndWait(`${assi_name}将${target_name}就像宠溺一样抱住她就这样将其推倒了………`); // :520
        } // :521
        // それ以外 // :522
      } else { // :523
        await era.printAndWait(`${master_name}将${assi_name}带到这里来后、${target_name}脸上露出了一副貌似放弃了的表情。`); // :524
        // RAW: SETCOLOR 255,204,255 // :525
        await era.printAndWait(`『呜呼呼~…不管大姐姐怎么说不要都好，俺都会好好玩弄大姐姐的~♪』`); // :526
        // RAW: RESETCOLOR // :527
        await era.printAndWait(`${assi_name}一副完全沉浸在调教原勇者的乐趣里的样子。`); // :528
        if (MARK:2 == 3) { // :529
          await era.printAndWait(`「已经…随便你们好了………」`); // :530
          await era.printAndWait(`看着如同放弃了一般横躺着的${target_name}，${assi_name}的施虐心受到了更强烈的刺激………`); // :531
        } else { // :532
          await era.printAndWait(`「哈呜~…呃呜~~…真，真是屈辱啊………」`); // :533
          await era.printAndWait(`在这个房间里${target_name}不能充分地使用力量，只能在${assi_name}的身下挣扎而已………`); // :534
        } // :535
      } // :536
      return 1; // :537
    } // :538
    // 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ // :539
    // ELSE // :540
    // CALL K3_KOJO2 // :541
    // ENDIF // :542
    // 助手○○（○○にY1のキャラ名を入れる） // :543
    // ELSEIF NO:ASSI == Y1 // :544
    // 	DRAWLINE // :545
    // 	;初めて // :546
    // 	IF CFLAG:202 == 0 // :547
    // 		;既に爱持ちで爱取得時初口上（陥落イベント）が発生済み // :548
    // 		IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5 // :549
    // 			PRINTFORMW // :550
    // 		;それ以外 // :551
    // 		ELSE // :552
    // 			PRINTFORMW // :553
    // 		ENDIF // :554
    // 		CFLAG:202 = 1 // :555
    // 		RETURN 1 // :556
    // 	;二回目以降 // :557
    // 	ELSE CFLAG:202 == 1 && FLAG:7 ==2 // :558
    // 		;爱慕 // :559
    // 		IF TALENT:TARGET:85 == 1 // :560
    // 			PRINTFORMW // :561
    // 		;それ以外 // :562
    // 		ELSE // :563
    // 			PRINTFORMW // :564
    // 		ENDIF // :565
    // 		RETURN 1 // :566
    // 	ENDIF // :567
    // 助手○○（○○にY2のキャラ名を入れる） // :568
    // ELSEIF NO:ASSI == Y2 // :569
    // 	DRAWLINE // :570
    // 	;初めて // :571
    // 	IF CFLAG:203 == 0 // :572
    // 		;既に爱持ちで爱取得時初口上（陥落イベント）が発生済み // :573
    // 		IF TALENT:TARGET:85 == 1 && CFLAG:201 >= 5 // :574
    // 			PRINTFORMW // :575
    // 		;それ以外 // :576
    // 		ELSE // :577
    // 			PRINTFORMW // :578
    // 		ENDIF // :579
    // 		CFLAG:203 = 1 // :580
    // 		RETURN 1 // :581
    // 	;二回目以降 // :582
    // 	ELSE CFLAG:203 == 1 && FLAG:7 ==2 // :583
    // 		;爱慕 // :584
    // 		IF TALENT:TARGET:85 == 1 // :585
    // 			PRINTFORMW // :586
    // 		;それ以外 // :587
    // 		ELSE // :588
    // 			PRINTFORMW // :589
    // 		ENDIF // :590
    // 		RETURN 1 // :591
    // 	ENDIF // :592
    // 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ // :593
  } else { // :594
    // CALL K3_KOJO2 // :595
  } // :596


  // ------------------------------------------------- // :599
  // 調教開始時（2回目以降、X1をキャラ番号に変更する） CFLAG无 // :600
  // ------------------------------------------------- // :601

// @K3_KOJO2 // :602
function K3_KOJO2() {
  // 崩坏 // :603
  if (TALENT:TARGET:9 == 1 && FLAG:7 == 2) { // :604
    era.drawLine(); // :605
    await era.printAndWait(`「父亲大人…请原谅…父亲大人…${sc()}…${sc()}已经…啊啊啊啊啊啊啊！」`); // :606
    await era.printAndWait(`在精神崩溃了的${target_name}的身上已经期待不了像样的反应了吧………`); // :607
    return 1; // :608

    // 反抗刻印Lv3 // :610
  } else if (MARK:3 == 3 && FLAG:7 == 2) { // :611
    era.drawLine(); // :612
    // 高贵エルフ // :613
    if (TALENT:TARGET:314 == 1) { // :614
      await era.printAndWait(`「呃…！敢摸一下试试…${target_name}会将你的喉咙给咬断的…！」`); // :615
      await era.printAndWait(`${target_name}用好像随时都会飞扑过来的眼神瞪着这边………`); // :616
      // それ以外 // :617
    } else { // :618
      await era.printAndWait(`「你这个人渣！」`); // :619
      await era.printAndWait(`${target_name}的怒火仿佛能看到地一样熊熊燃烧着………`); // :620
    } // :621
    return 1; // :622

    // 屈服刻印Lv0 // :624
  } else if (MARK:2 == 0 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :625
    era.drawLine(); // :626
    // 高贵エルフ // :627
    if (TALENT:TARGET:314 == 1) { // :628
      await era.printAndWait(`「真是肮脏…不要看过来！」`); // :629
      await era.printAndWait(`${target_name}紧咬着牙，怒视着${player_name}………`); // :630
      // それ以外 // :631
    } else { // :632
      // 故郷に恋人がいる場合 // :633
      if (TALENT:TARGET:317 == 4) { // :634
        await era.printAndWait(`「能触碰${sc()}的人…也就只有那个人而已！」`); // :635
        await era.printAndWait(`${target_name}用如同看着污垢之物的眼神看着${player_name}………`); // :636
      } else { // :637
        await era.printAndWait(`「请不要用你那肮脏的手来触碰${sc()}…」`); // :638
        await era.printAndWait(`${target_name}用鼻子‘哼’地一声，一副不爽的样子将脸撇向一边………`); // :639
      } // :640
    } // :641
    return 1; // :642

    // 屈服刻印Lv1 // :644
  } else if (MARK:2 == 1 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :645
    era.drawLine(); // :646
    // 高贵エルフ // :647
    if (TALENT:TARGET:314 == 1) { // :648
      await era.printAndWait(`「哼、哼嗯…这点小事…！」`); // :649
      await era.printAndWait(`${target_name}还是一副强硬的样子………`); // :650
      // それ以外 // :651
    } else { // :652
      // 故郷に恋人がいる場合 // :653
      if (TALENT:TARGET:317 == 4) { // :654
        await era.printAndWait(`「居然被这种下贱的人给触碰了身体…${target_name}真的是对不起那个人啊………」`); // :655
        await era.printAndWait(`${target_name}一副气愤地样子盯着这边………`); // :656
      } else { // :657
        await era.printAndWait(`「被这种下贱的家伙给…」`); // :658
        await era.printAndWait(`${target_name}阴沉着脸、抚摸自己起了鸡皮疙瘩的皮肤………`); // :659
      } // :660
    } // :661
    return 1; // :662

    // 屈服刻印Lv2 // :664
  } else if (MARK:2 == 2 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :665
    era.drawLine(); // :666
    // 高贵エルフ // :667
    if (TALENT:TARGET:314 == 1) { // :668
      await era.printAndWait(`「呜……${sc()}才…不会在这种地方……」`); // :669
      await era.printAndWait(`${target_name}还没有抛弃希望的样子、不过看来差不到要到极限了………`); // :670
      // それ以外 // :671
    } else { // :672
      // 故郷に恋人がいる場合 // :673
      if (TALENT:TARGET:317 == 4) { // :674
        await era.printAndWait(`「啊…啊啊…至少请再温柔一点…吧………」`); // :675
        await era.printAndWait(`${target_name}一副稍微有点放弃了地样子喃喃自语着………`); // :676
      } else { // :677
        await era.printAndWait(`「……今……今天也要…」`); // :678
        await era.printAndWait(`${target_name}一副稍微有点放弃了地样子喃喃自语着………`); // :679
      } // :680
    } // :681
    return 1; // :682

    // 屈服刻印Lv3＋爱無し // :684
  } else if (MARK:2 == 3 && TALENT:TARGET:85 == 0 && FLAG:7 == 2 && TALENT:TARGET:76 == 0) { // :685
    era.drawLine(); // :686
    // 高贵エルフ // :687
    if (TALENT:TARGET:314 == 1) { // :688
      await era.printAndWait(`「如果不做太过分的事情的话…就没关系………」`); // :689
      await era.printAndWait(`${target_name}一副已经完全放弃了的样子………`); // :690
      // それ以外 // :691
    } else { // :692
      // 故郷に恋人がいる場合、なおかつ侵攻度が５０００を越えている場合。 // :693
      if (TALENT:TARGET:317 == 4 && FLAG:81 >= 5000) { // :694
        await era.printAndWait(`「拜、拜托了…对${sc()}的身体随便做什么都没关系…但是……」`); // :695
        await era.printAndWait(`「……至少放过，在那条街…那条街的那个人的孩子的生命…………」`); // :696
        await era.printAndWait(`${target_name}一副为了故乡的恋人而献上自己身体的虚伪样子、看着用这种理由抱过来的${target_name}你感到十分的满意………`); // :697
      } else { // :698
        await era.printAndWait(`「${target_name}明白了…随便怎么做都可以了....」`); // :699
        await era.printAndWait(`${target_name}好像下定决心了、坦率地顺从着${player_name}………`); // :700
      } // :701
    } // :702
    return 1; // :703
    // 淫乱 // :704
  } else if (TALENT:TARGET:76 == 1 && FLAG:7 == 2) { // :705
    era.drawLine(); // :706
    // 高贵ダークエルフ // :707
    if (TALENT:TARGET:314 == 7) { // :708
      // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :709
      if (RAND:3 == 0) { // :710
        await era.printAndWait(`「啊啊~主人~…热得忍不了了~…请用大鸡鸡…塞满${target_name}吧${heart(3)}」`); // :711
        await era.printAndWait(`${target_name}匍匐在${master_name}的脚边着、将自己的脸埋在了股间，自傲的长耳朵被压到扭曲了也不管………`); // :712
      } else if (RAND:2 == 0) { // :713
        await era.printAndWait(`「哈啊~…嗯~…身体…好热啊~${heart(3)}」`); // :714
        await era.printAndWait(`「自慰居然会那么舒服什么的~…已经…已经…啊啊~${heart(3)}」`); // :715
        await era.printAndWait(`「啊嗯~…主人…敬请欣赏....淫乱的堕落女精灵的小穴之舞吧…${heart(5)}」`); // :716
        await era.printAndWait(`${target_name}擅自开始了自慰…对于这样不懂事的姑娘一定要好好惩罚一下才可以………`); // :717
      } else { // :718
        await era.printAndWait(`「请负起将${sc()}的身体变得如此淫乱的责任吧…哈呜嗯~…${heart(1)}」`); // :719
        await era.printAndWait(`「啊啊~…${sc()}的这个胸部也好…屁股也好…那里也好…都是主人的东西来的…${heart(3)}」`); // :720
        await era.printAndWait(`${target_name}舔着嘴唇、长长的耳朵一抽一抽地靠向了${master_name}………`); // :721
      } // :722
      // それ以外 // :723
    } else { // :724
      // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :725
      if (RAND:3 == 0) { // :726
        await era.printAndWait(`「啊~主人~${heart(1)}　今天用${sc()}的嘴巴来侍奉也没有关系吧~${heart(3)}」`); // :727
        await era.printAndWait(`${target_name}在${player_name}的耳边撒娇般轻声说着………`); // :728
      } else if (RAND:2 == 0) { // :729
        await era.printAndWait(`「主人~~…${heart(1)}　对淫乱而又下流的${target_name}…」`); // :730
        await era.printAndWait(`「好好地惩罚一下吧~${heart(3)}」`); // :731
        await era.printAndWait(`${target_name}用双手将自己的桃尻掰开，诱惑着${player_name}………`); // :732
      } else { // :733
        await era.printAndWait(`「哈啊…哈啊…快点~…主人~…请给予大鸡巴吧~…${heart(1)}」`); // :734
        await era.printAndWait(`「${sc()}的身体哪里都可以…让主人舒服起来的哦~~${heart(1)}」`); // :735
      } // :736
    } // :737
    return 1; // :738
    // 爱慕 // :739
  } else if (TALENT:TARGET:85 == 1 && FLAG:7 == 2) { // :740
    era.drawLine(); // :741
    // ☆　寄生 // :742
    if (CFLAG:TARGET:230 >= 1 && (TALENT:TARGET:190 == 1 || TALENT:TARGET:191 == 1)) { // :743
      if (RAND:3 == 0) { // :744
        await era.print(`「嗯哼哼~…居然长得那么大了呢~${heart(1)}」`); // :745
        await era.printAndWait(`${target_name}很怜爱地、抚摸着因为蠕虫寄生而怀孕膨胀了的肚子………`); // :746
      } else if (RAND:2 == 0) { // :747
        await era.print(`「被大人植入在肚子里面的孩子们~、正在不停地长大着呢~${heart(1)}」`); // :748
        await era.printAndWait(`${target_name}眯着眼睛、怜爱地抚摸着因为寄生虫的卵而膨胀变大的肚子……`); // :749
      } else { // :750
        await era.print(`「在${target_name}的肚子里面的孩子……能快一点出来活动就好了呢~${heart(1)}」`); // :751
        await era.printAndWait(`${target_name}一副恍惚地表情、抚摸着因为塞满着蠕虫的卵而膨胀起来的肚子……`); // :752
      } // :753
      // 高贵エルフ // :754
    } else if (TALENT:TARGET:314 == 1) { // :755
      // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :756
      if (RAND:3 == 0) { // :757
        await era.printAndWait(`「已经…故乡什么的…已经怎么样都可以了…」`); // :758
        await era.printAndWait(`「请让${sc()}一直呆在这里吧………」`); // :759
      } else if (RAND:2 == 0) { // :760
        await era.printAndWait(`「啊~…魔王大人~♪」`); // :761
        await era.printAndWait(`「一直、在等待这您的到来呢…撒、请快点来这边吧…」`); // :762
      } else { // :763
        await era.printAndWait(`「哈啊~…为什么…为什么会如此地恋慕身为魔族之王的那个大人呢………」`); // :764
        await era.printAndWait(`「${sc()}就这样…堕落到地狱也没有关系………」`); // :765
        await era.printAndWait(`「………呜啊啊！？刚、刚刚的都听到了吗？请请请、请都忘掉吧！！！」`); // :766
      } // :767
      // それ以外 // :768
    } else { // :769
      // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :770
      if (RAND:3 == 0) { // :771
        await era.printAndWait(`「大人~、今天也要做对吧~…♪」`); // :772
        await era.printAndWait(`${target_name}将你的手放在脸颊上，可爱地用脸蹭着你的手心………`); // :773
      } else if (RAND:2 == 0) { // :774
        await era.printAndWait(`「大人、等…等您已经等了好久了啊~…」`); // :775
        await era.printAndWait(`${target_name}眼睛微微闭着，向你的脸轻轻亲了一下………`); // :776
      } else { // :777
        await era.printAndWait(`「请温柔一点......温柔地做吧~…」`); // :778
        await era.printAndWait(`${target_name}用手指玩弄着自己的发鬓，好像很害羞地请求道………`); // :779
      } // :780
    } // :781
    return 1; // :782
  } // :783
  return 0; // :784

  // ------------------------------------------------- // :786
  // EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用 // :787
  // 調教終了時のセリフ // :788
  // ------------------------------------------------- // :789

// @EVENTEND // :790
function EVENTEND() {
  // ;追記者／回数メッセージをクリア（よく理解しないままに足しています） // :791
  if (CFLAG:301 >= 1) { // :793
    // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :793
    era.set(`cflag:${target}:301`, 1); // :793
  } // :793

  if (FLAG:7 <= 0) { // :796
    return 0; // :796
  } // :796
  if (TALENT:163 != 1) { // :798
    return 0; // :798
  } // :798

  // キャラ死亡時は口上をスキップ // :800
  if (BASE:0 <= 0) { // :802
    return 0; // :802
  } // :802

  // -------------------------------------------------- // :804
  // 調教終了時のセリフ // :805
  // -------------------------------------------------- // :806
  // 崩坏 // :807
  if (TALENT:TARGET:9 == 1 && FLAG:7 == 2) { // :808
    era.drawLine(); // :809
    await era.printAndWait(`「呜…呃呜…黑暗的…不要…狭窄的…不要………」`); // :810
    await era.printAndWait(`${target_name}的脸被眼泪和口水弄得一塌糊涂地横躺在那里………`); // :811
    return 1; // :812

    // 反抗刻印Lv3+爱无+淫乱无 // :814
  } else if (MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :815
    era.drawLine(); // :816
    await era.printAndWait(`「……真是无法置信」`); // :817
    return 1; // :818

    // 屈服刻印Lv1以下+爱无+淫乱无 // :820
  } else if (MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :821
    era.drawLine(); // :822
    await era.printAndWait(`「终于结束了啊………」`); // :823
    return 1; // :824

    // 屈服刻印Lv2+爱无+淫乱无 // :826
  } else if (MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :827
    era.drawLine(); // :828
    await era.printAndWait(`「到底打算继续到什么时候呐…？」`); // :829
    return 1; // :830

    // 屈服刻印Lv3+爱无+淫乱无 // :832
  } else if (MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0) { // :833
    era.drawLine(); // :834
    await era.printAndWait(`「这种程度才不会屈服…来的………」`); // :835
    return 1; // :836

    // 淫乱(体力500以上) // :838
  } else if (TALENT:TARGET:76 == 1 && BASE:0 >= 500) { // :839
    era.drawLine(); // :840
    // 高贵ダークエルフ // :841
    if (TALENT:TARGET:314 == 7) { // :842
      await era.printAndWait(`「啊~…${sc()}的身体…比起人类来还更加结实一点的啦………」`); // :843
      await era.printAndWait(`「所以请更加不留情面地做H的事情吧………」`); // :844
    } else { // :845
      await era.printAndWait(`「啊嗯~…更多…请继续做更多H的事情吧~………」`); // :846
    } // :847
    return 1; // :848
    // 淫乱(体力500未満) // :849
  } else if (TALENT:TARGET:76 == 1 && BASE:0 <= 500) { // :850
    era.drawLine(); // :851
    // 高贵ダークエルフ // :852
    if (TALENT:TARGET:314 == 7) { // :853
      await era.printAndWait(`「哈啊…哈啊…太舒服了…脑子里都要融化掉了啊~${heart(1)}」`); // :854
    } else { // :855
      await era.printAndWait(`「哈啊…哈啊…那里…还有…感觉着呢~${heart(1)}」`); // :856
    } // :857
    return 1; // :858
    // 爱慕(体力500以上) // :859
  } else if (TALENT:TARGET:85 == 1 && BASE:0 >= 500) { // :860
    era.drawLine(); // :861
    // 高贵エルフ // :862
    if (TALENT:TARGET:314 == 1) { // :863
      await era.printAndWait(`「嗯啊~…${sc()}…没想到自己的欲望居然会那么深…」`); // :864
      await era.printAndWait(`「…请更加用力地疼爱${sc()}吧………」`); // :865
    } else { // :866
      await era.printAndWait(`「啊啦、更加用力地疼爱${sc()}也没关系的说......」`); // :867
    } // :868
    return 1; // :869
    // 爱慕(体力500未満) // :870
  } else if (TALENT:TARGET:85 == 1 && BASE:0 <= 500) { // :871
    era.drawLine(); // :872
    // 高贵エルフ // :873
    if (TALENT:TARGET:314 == 1) { // :874
      await era.printAndWait(`「啊哈啊嗯~…果然、最喜欢大人您了~…♪」`); // :875
    } else { // :876
      await era.printAndWait(`「十分满足的说…♪」`); // :877
    } // :878
    return 1; // :879
  } // :880
  return 0; // :881

  // -------------------------------------------------- // :883
  // @KOJO_MESSAGE_COM関係（X1をキャラ番号に置換） // :884
  // コマンド実行時に出力されます // :885
  // -------------------------------------------------- // :886

// @KOJO_MESSAGE_COM_3 // :887
function KOJO_MESSAGE_COM_3() {
  // 死斗场中は専用口上 // :888
  if (TEQUIP:55) { // :889
    // CALL COLOSSEUM_KOJO_3 // :890
    return 0; // :891
  } // :892
  // 助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる） // :893
  if (ASSI > 0 && ASSIPLAY) { // :895
    return 0; // :895
  } // :895
  // 口塞着用時には口上をスキップする // :896
  if (TEQUIP:45 && SELECTCOM != 45) { // :898
    return 0; // :898
  } // :898
  // 失神時には口上をスキップする // :899
  if (TFLAG:899) { // :901
    return 0; // :901
  } // :901
  // 兽奸PLAY中は専用口上 // :902
  if (TEQUIP:89) { // :903
    // CALL DOG_KOJO_3 // :904
    return 0; // :905
  } // :906
  // 崩坏した場合は口上をスキップする // :907
  if (TALENT:TARGET:9 == 1) { // :909
    return 0; // :909
  } // :909
  // 触手調教中は口上をスキップする // :910
  if (TEQUIP:90) { // :912
    return 0; // :912
  } // :912

  // ------------------------------------------------- // :914
  // コマンド実行時のセリフ CFLAG 301～400を使用 // :915
  // ------------------------------------------------- // :916
  // ------------------------------------------------- // :917
  // 爱撫 CFLAG:301 // :918
  // ------------------------------------------------- // :919
  if (SELECTCOM == 0) { // :920
    // 初めて // :921
    if (CFLAG:301 == 0) { // :922
      // 屈服刻印Lv2以上 // :923
      if (MARK:2 >= 2) { // :924
        await era.printAndWait(`「嗯呼嗯~…啊~…呃~…请更加温柔…一…点……哈啊嗯~！」`); // :925
        // それ以外 // :926
      } else { // :927
        await era.printAndWait(`「不，不要触摸…呃呜…呜呃呜~~~………」`); // :928
      } // :929
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :930
      era.set(`cflag:${target}:301`, 1); // :930
      return 0; // :931
      // 二回目以降 // :932
    } else { // :933
      // 淫乱 // :934
      if (TALENT:TARGET:76 == 1 && (CFLAG:301 <= 599 || FLAG:7 == 2)) { // :935
        // ;ランダムで口上が変化する // :936
        if (RAND:3 == 0) { // :937
          await era.printAndWait(`「呜哈嗯啊~…主人~…请更加摩擦那里吧~${heart(1)}」`); // :938
          await era.printAndWait(`${target_name}张开自己的双腿，诱导着${player_name}的手………`); // :939
          await era.printAndWait(`「${sc()}的身体是…被下流的抚摸了的话…就会热得要燃烧起来了${heart(3)}」`); // :940
          await era.printAndWait(`${target_name}淫乱地蠕动着身体、接受着${player_name}的爱抚………`); // :941
        } else if (RAND:2 == 0) { // :942
          await era.printAndWait(`「啊、啊啊~……主人~…这里、这里~……请用、主人的手指来、好好地欺负一下~……」`); // :943
          await era.print(`${player_name}开始爱抚后、${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。`); // :944
          await era.printAndWait(`慢慢将手靠近蜜穴后、期待让${target_name}的腰部颤抖了起来、呼吸变得凌乱了。`); // :945
          await era.printAndWait(`「啊哈啊嗯~…${heart(1)} 好棒……果然,主人的手指，真的好美妙啊~${heart(3)}」`); // :946
        } else { // :947
          await era.printAndWait(`「啊嗯~、嗯~、呜~…！更、更多、激烈地…更多、请更加粗暴地做吧~……啊~、啊、啊……！」`); // :948
          await era.print(`${target_name}将生来的高贵姿态完全扔掉了，不像样的将双脚敞开、沉醉在了${player_name}的爱抚之下。`); // :949
          await era.printAndWait(`${target_name}只是贪图着给予的快乐而已、如同用淫猥之声演奏的乐器一样，娇喘的音高随着爱抚的手指动作而一上一下。`); // :950
          await era.printAndWait(`「啊啊~！请将${sc()}下流的身体、玩弄地翻来覆去吧……........直到坏掉为止......！」`); // :951
        } // :952
        // CFLAG:301  = 600（变量语义：CFLAG 族，301） // :953
        era.set(`cflag:${target}:301`, 600); // :953
        // 爱慕 // :954
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:301 <= 499 || FLAG:7 == 2)) { // :955
        // ;ランダムで口上が変化する // :956
        if (RAND:3 == 0) { // :957
          await era.printAndWait(`「啊~…嗯~…${player_name}太…太过温柔了…感觉有点害怕呀~………♪」`); // :958
          await era.printAndWait(`${target_name}每当被${master_name}触摸后都会发出娇喘………`); // :959
          await era.printAndWait(`「啊啊…喜欢…喜欢的说…被做了这样的事情…${sc()}…已经~…♪」`); // :960
          await era.printAndWait(`${target_name}的娇喘慢慢变成越来越急促的喘息声………`); // :961
        } else if (RAND:2 == 0) { // :962
          await era.printAndWait(`「啊哈……啊啊、${player_name}…请……更加地、用自己喜欢的方式来、抚摸吧~……」`); // :963
          await era.print(`${target_name}让${player_name}更加容易抚摸而将脚张开，将身子靠向了你。`); // :964
          await era.print(`还不仅仅如此、是为了更加感受到爱抚带来的刺激吧、`); // :965
          await era.printAndWait(`${player_name}的手触碰到的部位、都会向着手压过去。`); // :966
          await era.printAndWait(`「${target_name}的身体，已经变成仅仅是被${player_name}大人抚摸就能感到无上的愉悦感的身体了……${heart(1)}」`); // :967
        } else { // :968
          await era.printAndWait(`「啊、啊嗯~、${player_name}大人的手……最喜欢的、最令人怜爱的手……哈啊啊~${heart(1)}」`); // :969
          await era.print(`${target_name}将自己的手放在了${player_name}手的上方、开始对自己的身体爱抚了起来。`); // :970
          await era.printAndWait(`为了感受到更加强烈的刺激而将${player_name}手用力地向下压、还轻轻地用手指对${player_name}的手背爱抚着。`); // :971
          await era.printAndWait(`「让${sc()}的心折服了的、残酷的手……教给${sc()}的身体、如何感受淫乐的温柔的手……」`); // :972
          await era.printAndWait(`「呜啊~、嗯~…${sc()}会……任由这只手的摆布的……被这只手引导的话、不管堕落到哪里都愿意……${heart(1)}」`); // :973
        } // :974
        // CFLAG:301  = 500（变量语义：CFLAG 族，301） // :975
        era.set(`cflag:${target}:301`, 500); // :975
        // 屈服刻印Lv3 // :976
      } else if (MARK:2 == 3 && (CFLAG:301 <= 399 || FLAG:7 == 2)) { // :977
        // ;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数） // :978
        if (CFLAG:301 <= 400) { // :979
          // ;快乐刻印Lv3 // :980
          if (MARK:1 == 3) { // :981
            await era.printAndWait(`「啊~…${scf()}、${sc()}的……身体……已经、太舒服了…完全……反抗不了了呀……」`); // :982
            await era.print(`${target_name}发出了屈服宣言和喘息混合起来的娇喘，将身子托付给了正在爱抚的双手。`); // :983
            await era.printAndWait(`${player_name}稍微提高正在爱抚的手的力度后、就如同${target_name}自己所说的那样根本不反抗，直率地发出了大声的娇喘。`); // :984
            await era.printAndWait(`「啊哈~…啊~！啊、呜啊~……！被，被这么地、爱抚的话…${sc()}要……啊哈呜~……！」`); // :985
          } else { // :986
            await era.printAndWait(`「哈啊…啊~…嗯~…啊呃嗯~…为、为什么…会那么舒服的…呢……啊~♪」`); // :987
          } // :988
          // CFLAG:301  = 401（变量语义：CFLAG 族，301） // :989
          era.set(`cflag:${target}:301`, 401); // :989
        } else if (CFLAG:301 == 401) { // :990
          // ;快乐刻印Lv3 // :991
          if (MARK:1 == 3) { // :992
            await era.printAndWait(`「啊、啊啊…为、为什么……嗯~、为什么、这么……温柔地、抚摸呢……啊~……」`); // :993
            await era.print(`被不停重复地给予着不太强烈，也不太弱的刺激、${target_name}全身的皮肤都冒出湿润的汗。`); // :994
            await era.printAndWait(`蜜穴微微地渗出了水滴、用手指稍微粗鲁一点的话，便出现了哔啦哔啦的水声。`); // :995
            await era.printAndWait(`「不要嗯~…声音、怎么会……像这样、被弄出声音来…的话、嗯…快…快要羞死了${sc()}……」`); // :996
          } else { // :997
            await era.printAndWait(`「啊…温柔的、抚摸的话……就不会、就不会抵抗了…啊~！当、当然、其…其他的也……」`); // :998
            await era.print(`温柔地用手来回抚摸后、${target_name}为了更加享受抚摸带来的感觉的那样将眼睛闭上了。`); // :999
            await era.printAndWait(`然后伴随着细微的喘息声、恍惚地喃喃自语着。`); // :1000
            await era.printAndWait(`「但，但是…如果可以做得到的话、请温柔地……${sc()}也会、害怕疼的……啊哈嗯、啊嗯~…嗯嗯、嗯~……」`); // :1001
          } // :1002
          // CFLAG:301  = 402（变量语义：CFLAG 族，301） // :1003
          era.set(`cflag:${target}:301`, 402); // :1003
        } else if (CFLAG:301 == 402) { // :1004
          await era.printAndWait(`「啊、啊嗯~、啊……哈啊…哈啊……啊哈唔！？嗯~、突、突然，变快的话……啊呼嗯呜~！」`); // :1005
          await era.print(`对于习惯了爱抚的速度、而放松了的${target_name}、突然加快了爱抚的速度。`); // :1006
          await era.printAndWait(`被变化带来的快乐的波浪玩弄、${target_name}先前还用憎恨的眼神看着${player_name}、而现在眼睛却湿润了起来，依靠着${player_name}。`); // :1007
          await era.printAndWait(`「哈呜嗯~！嗯~、那…那个手在……将${sc()}的身体、弄出了下流的声音了……啊、嗯…${player_name}的…啊~！」`); // :1008
          // CFLAG:301  = 403（变量语义：CFLAG 族，301） // :1009
          era.set(`cflag:${target}:301`, 403); // :1009
        } else { // :1010
          // ;ランダムで口上が変化する // :1011
          if (RAND:3 == 0) { // :1012
            await era.printAndWait(`「哈啊啊~…啊啊啊~…被、被这么地…这么地…爱抚了的话……${sc()}…%SELF_CALL(TARGET, 1)%、已经……嗯嗯~！」`); // :1013
          } else if (RAND:2 == 0) { // :1014
            await era.printAndWait(`「哼唔呜~……！嗯呜~！嗯~嗯~嗯~！嗯呜呜~……已经…太过舒服了、${sc()}要…啊啊~……！」`); // :1015
          } else { // :1016
            await era.printAndWait(`「好、好棒……是的、那里……就是那里来的、那里~……啊~！那里、好舒服的啊~……啊嗯~！」`); // :1017
          } // :1018
        } // :1019
        // ;屈服刻印Lv2＆快乐刻印Lv3 // :1020
      } else if (MARK:2 == 2 && MARK:1 == 3 && (CFLAG:301 <= 299 || FLAG:7 == 2)) { // :1021
        // ;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数） // :1022
        if (CFLAG:301 <= 300) { // :1023
          await era.printAndWait(`「哈呜呜嗯~…嗯~、嗯…不、不行…要、要忍不住了…啊~、啊……！」`); // :1024
          await era.print(`只是稍微地给蜜穴挠了一下痒、${target_name}的身体就大幅度地颤抖起来了。`); // :1025
          await era.printAndWait(`是因为被铭刻在身体深处的愉悦的记忆被引出来了吧、颤抖着大声地娇喘起来了。`); // :1026
          await era.printAndWait(`「啊~、啊……！不行~、忍…忍不……忍不住……了啊…哈啊嗯~…！」`); // :1027
          // CFLAG:301  = 301（变量语义：CFLAG 族，301） // :1028
          era.set(`cflag:${target}:301`, 301); // :1028
        } else if (CFLAG:301 == 301) { // :1029
          await era.printAndWait(`「请，请原…哈呜啊~！请原谅…嗯~！原谅了……！再这样…再这样、被抚摸了的话……」`); // :1030
          await era.print(`${target_name}微弱地扭动着身体、想要尝试逃离${player_name}的双手。`); // :1031
          await era.printAndWait(`但是、被温柔地抚摸而失去了力气、又回到了${player_name}的手的旁边将身体靠了过去。`); // :1032
          await era.printAndWait(`「请，请不要…改变……再这样下去、${sc()}就要…啊、这个……哼啊~、那个…太舒服了……啊啊~……」`); // :1033
          // CFLAG:301  = 302（变量语义：CFLAG 族，301） // :1034
          era.set(`cflag:${target}:301`, 302); // :1034
        } else if (CFLAG:301 == 302) { // :1035
          await era.printAndWait(`「啊、啊啊…已经、不行……已经…忍…不住了……啊、嗯、啊啊~……！」`); // :1036
          await era.print(`现在已经将厌恶感什么的给忘记了吧、${target_name}貌似习惯被触碰了的那样，将身体交给爱抚的双手。`); // :1037
          await era.printAndWait(`双腿的绷紧的肌肉一跳一跳地、但是完全没有抵抗，只是快乐带来的反射而已，而且还从嘴边漏出了淫艳的娇喘声。`); // :1038
          await era.printAndWait(`「再，再这样下去的话……${sc()}…${scf()}、${sc()}要……啊嗯~、嗯~…嗯哈呜嗯~……！」`); // :1039
          // CFLAG:301  = 303（变量语义：CFLAG 族，301） // :1040
          era.set(`cflag:${target}:301`, 303); // :1040
        } else { // :1041
          // ;ランダムで口上が変化する // :1042
          if (RAND:3 == 0) { // :1043
            await era.printAndWait(`「呀…！嗯~、嗯呀~……啊~、忍…忍耐……啊哈~！啊~、啊~啊~……啊！」`); // :1044
          } else if (RAND:2 == 0) { // :1045
            await era.printAndWait(`「这~、这样~…嗯~、明明被，当成玩具来…呼嗯~、呜啊啊~……！」`); // :1046
          } else { // :1047
            await era.printAndWait(`「哈~、啊……啊~、啊啊啊……！啊、呜啊~、不要啊~……」`); // :1048
          } // :1049
        } // :1050
        // それ以外 // :1051
      } else if (MARK:2 <= 1 && (CFLAG:301 <= 1 || FLAG:7 == 2)) { // :1052
        // ;追記者／回数で口上が進む（CFLAG:301　百の桁は大別？（改変前の数値）／一の桁が回数） // :1053
        if (CFLAG:301 <= 200) { // :1054
          // ;快乐刻印Lv3 // :1055
          if (MARK:1 == 3) { // :1056
            await era.printAndWait(`「啊嗯~、嗯~……明明…应该…感觉恶心来的……应该感觉、恶心来的呀…！」`); // :1057
            await era.print(`${target_name}大声地发出了困惑的声音，但是身体实实在在地对爱抚有所反应。`); // :1058
            await era.printAndWait(`如同在服从着${player_name}的手指那样、摇摇晃晃地晃动着腰部。`); // :1059
            await era.printAndWait(`「嗯呜……呼~、呜…不行……啊~！明明、那么令人恶心……的事情……」`); // :1060
            // 屈服刻印Lv2 // :1061
          } else if (MARK:2 == 2) { // :1062
            await era.printAndWait(`「哈呜…这样的…只是要忍耐而已…而已…嗯~！」`); // :1063
          } else { // :1064
            await era.printAndWait(`「感觉真恶心…不要在…这样…触，触碰了…！」`); // :1065
          } // :1066
          // CFLAG:301  = 201（变量语义：CFLAG 族，301） // :1067
          era.set(`cflag:${target}:301`, 201); // :1067
        } else if (CFLAG:301 == 201) { // :1068
          // ;快乐刻印Lv3 // :1069
          if (MARK:1 == 3) { // :1070
            await era.printAndWait(`「不、不要啊…啊哈唔、呀~…！不、不要摸啊……啊~、啊啊…！」`); // :1071
          } else { // :1072
            await era.printAndWait(`「不是，说了、不要摸了没听到吗…嗯~！说了不要摸了啊…！」`); // :1073
          } // :1074
          await era.print(`${target_name}将眼睛闭起来、安静地忍耐着爱抚带来的刺激。`); // :1075
          await era.printAndWait(`${player_name}轻轻地抚摸了一下${target_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`); // :1076
          await era.printAndWait(`「啊呜…！呃呜、呜~…怎、怎么……嗯嗯~！」`); // :1077
          // CFLAG:301  = 202（变量语义：CFLAG 族，301） // :1078
          era.set(`cflag:${target}:301`, 202); // :1078
        } else if (CFLAG:301 == 202) { // :1079
          // ;快乐刻印Lv3 // :1080
          if (MARK:1 == 3) { // :1081
            await era.printAndWait(`「已，已经…啊~！快、不要…啊啊！快住手吧……！」`); // :1082
            await era.print(`哪怕嘴上说着一堆拒绝的话语、${target_name}的瞳孔也因为快乐而湿润了起来。`); // :1083
            await era.printAndWait(`每次触碰都会让${target_name}的话语中断、身体颤抖起来喘息也变得急促起来了。`); // :1084
          } else { // :1085
            await era.printAndWait(`「够、够了…嗯嗯~……哼嗯~、呜……请，请适可而止吧…！」`); // :1086
            await era.print(`${target_name}的眼中、厌恶的神情并没有消失。`); // :1087
            await era.printAndWait(`但是也没有压抑着住无情的爱抚带来的刺激、而从嘴边漏出了颤抖的娇喘声。`); // :1088
          } // :1089
          await era.printAndWait(`「为、为什么…啊~、这…这样……这样的、事情……啊嗯~……」`); // :1090
          // CFLAG:301  = 203（变量语义：CFLAG 族，301） // :1091
          era.set(`cflag:${target}:301`, 203); // :1091
        } else { // :1092
          // ;ランダムで口上が変化する // :1093
          if (RAND:3 == 0) { // :1094
            await era.printAndWait(`「呀…啊、不要啊……请、请快住手，停下来吧…」`); // :1095
          } else if (RAND:2 == 0) { // :1096
            await era.printAndWait(`「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`); // :1097
          } else { // :1098
            await era.printAndWait(`「嗯~、嗯~嗯~……明明…说了、快住手了……啊嗯~……」`); // :1099
          } // :1100
        } // :1101
      } // :1102
      return 0; // :1103
    } // :1104
  } // :1105

  // ------------------------------------------------- // :1107
  // 舔阴 CFLAG:302 // :1108
  // ------------------------------------------------- // :1109
  if (SELECTCOM == 1) { // :1110
    // 初めて // :1111
    if (CFLAG:302 == 0) { // :1112
      // 处女 // :1113
      if (TALENT:TARGET:0 == 1) { // :1114
        await era.printAndWait(`「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」`); // :1115
        // それ以外 // :1116
      } else { // :1117
        await era.printAndWait(`「啊啊…怎么会…舌头…哈呜…啊~…啊呜~~~~！」`); // :1118
      } // :1119
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :1120
      era.set(`cflag:${target}:302`, 1); // :1120
      return 0; // :1121
      // 二回目以降 // :1122
    } else { // :1123
      // 淫乱 // :1124
      if (TALENT:TARGET:76 == 1 && (CFLAG:302 <= 4 || FLAG:7 == 2)) { // :1125
        await era.printAndWait(`「哈啊啊…更加地…更加地...将小穴弄得更加黏糊糊地吧${heart(1)}…更加地欺负小穴吧哈呜~~${heart(3)}」`); // :1126
        await era.printAndWait(`${target_name}将${player_name}的头按住晃动着腰。`); // :1127
        await era.printAndWait(`「请更加地…欺负${target_name}的小穴吧~…将变态${target_name}的小穴弄得乱七八糟的吧啊啊~！${heart(3)}」`); // :1128
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :1129
        era.set(`cflag:${target}:302`, 5); // :1129
        // 爱慕 // :1130
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:302 <= 3 || FLAG:7 == 2)) { // :1131
        await era.printAndWait(`「啊啊~…那里明明…那么脏来的啊♪………不行…的啊…那么地…啊嗯~♪」`); // :1132
        await era.printAndWait(`${target_name}哪怕耳朵红透了也好，也继续接受着${player_name}的爱抚。`); // :1133
        await era.printAndWait(`「嗯呜啊~…哼啊啊啊！~…腰要…腰要飘起来了~${heart(1)}」`); // :1134
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :1135
        era.set(`cflag:${target}:302`, 4); // :1135
        // 屈服刻印Lv3 // :1136
      } else if (MARK:2 == 3 && (CFLAG:302 <= 2 || FLAG:7 == 2)) { // :1137
        await era.printAndWait(`「呜啊~…啊~…呜呼啊~…更加地…温柔地爱抚吧…哼唔啊~…啊~啊啊~♪」`); // :1138
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :1139
        era.set(`cflag:${target}:302`, 3); // :1139
        // それ以外（屈服刻印Lv3未満） // :1140
      } else if (CFLAG:302 <= 1 || FLAG:7 == 2) { // :1141
        await era.printAndWait(`「不、不要…请停下来吧！哪怕舔这种地方也好…哼呜啊啊啊~！」`); // :1142
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :1143
        era.set(`cflag:${target}:302`, 2); // :1143
      } // :1144
      return 0; // :1145
    } // :1146
  } // :1147

  // ------------------------------------------------- // :1149
  // アナル爱撫 CFLAG:303 // :1150
  // ------------------------------------------------- // :1151
  if (SELECTCOM == 2) { // :1152
    // 初めて // :1153
    if (CFLAG:303 == 0) { // :1154
      await era.printAndWait(`「呜，呜哇啊！？那、那里是不行的！」`); // :1155
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :1156
      era.set(`cflag:${target}:TARGET:303`, 1); // :1156
      return 0; // :1157
      // 二回目以降 // :1158
    } else { // :1159
      // 赋值 P = PALAM:3 + UP:3 // :1160
      // 淫乱+润滑Lv2以上 // :1161
      if (TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && (CFLAG:303 <= 6 || FLAG:7 == 2)) { // :1162
        await era.printAndWait(`「啊啊~${heart(1)}…啊~${heart(1)}…哈呜啊啊啊~${heart(3)}」`); // :1163
        await era.printAndWait(`${target_name}每当被弯曲的手指来回扣着尻穴内壁时都会漏出欢喜的娇喘。`); // :1164
        await era.printAndWait(`「尻穴小穴${heart(1)} 更加玩弄尻穴吧~~~${heart(3)}」`); // :1165
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :1166
        era.set(`cflag:${target}:303`, 7); // :1166
        // 淫乱+润滑Lv2未満 // :1167
      } else if (TALENT:TARGET:76 == 1 && P < PALAMLV:2 && (CFLAG:303 <= 5 || FLAG:7 == 2)) { // :1168
        await era.printAndWait(`「嗯啊~……哈啊嗯~${heart(1)}　指尖在…嗯~…在挖着…啊~${heart(1)}这个嗯~~~~${heart(1)}」`); // :1169
        await era.printAndWait(`${target_name}的尻穴虽然还没有完全湿润，不过手指越是抽插越能进入${target_name}的尻穴的深处。`); // :1170
        await era.printAndWait(`「恩呜呜~…更加地…${heart(1)}　进到里面去来回抽插吧${heart(3)}」`); // :1171
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :1172
        era.set(`cflag:${target}:303`, 6); // :1172
        // 爱慕+润滑Lv2以上 // :1173
      } else if (TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && (CFLAG:303 <= 4 || FLAG:7 == 2)) { // :1174
        await era.printAndWait(`「啊~哈嗯~啊啊~…这、这个部位…才不是用来塞进什么东西的地方来的呀………」`); // :1175
        await era.printAndWait(`虽然嘴上说着这样的话，但是${target_name}一点都不讨厌地接受着${player_name}的手指。`); // :1176
        await era.printAndWait(`「哈嗯~♪……啊·~…不是…这个…才不是对${player_name}大人的手指感到舒…哼啊啊~…啊啊~…哈啊嗯~♪」`); // :1177
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :1178
        era.set(`cflag:${target}:303`, 5); // :1178
        // 爱慕+润滑Lv2未満 // :1179
      } else if (TALENT:TARGET:85 == 1 && P < PALAMLV:2 && (CFLAG:303 <= 3 || FLAG:7 == 2)) { // :1180
        await era.printAndWait(`「嗯呜~....请更加…温柔地………」`); // :1181
        await era.printAndWait(`「哈啊啊啊~…嗯呜呜~…没错…这样的…很舒服啊~………${heart(1)}」`); // :1182
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :1183
        era.set(`cflag:${target}:303`, 4); // :1183
        // 润滑Lv2以上＋A感覚Lv3以上 // :1184
      } else if (P >= PALAMLV:2 && ABL:3 >= 3 && (CFLAG:303 <= 2 || FLAG:7 == 2)) { // :1185
        await era.printAndWait(`${target_name}的尻穴被塞进了手指而全身颤抖起来了。`); // :1186
        await era.printAndWait(`「啊呜呜~！…不，不是…才没有感觉…」`); // :1187
        await era.printAndWait(`「呜嗯啊~！啊~啊啊~哈啊啊啊啊~~${heart(1)}」`); // :1188
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :1189
        era.set(`cflag:${target}:303`, 3); // :1189
        // それ以外（爱無し、润滑Lv2未満、A感覚Lv3未満） // :1190
      } else if (CFLAG:223 <= 1 || FLAG:7 == 2) { // :1191
        await era.printAndWait(`「嗯呜~…请，请快住手啊…那种地方不管怎么做都不会…呜啊啊~啊啊~！」`); // :1192
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :1193
        era.set(`cflag:${target}:303`, 2); // :1193
      } // :1194
      return 0; // :1195
    } // :1196
  } // :1197

  // ------------------------------------------------- // :1199
  // 自慰 CFLAG304 // :1200
  // ------------------------------------------------- // :1201
  if (SELECTCOM == 3) { // :1202
    // 初めて // :1203
    if (CFLAG:304 == 0) { // :1204
      await era.printAndWait(`「居然…不能不做这样的事情…这是……何等的…屈辱啊…」`); // :1205
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :1206
      era.set(`cflag:${target}:TARGET:304`, 1); // :1206
      return 0; // :1207
      // 二回目以降 // :1208
    } else { // :1209
      // 淫乱＋处女 // :1210
      if (TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && (CFLAG:304 <= 8 || FLAG:7 == 2)) { // :1211
        await era.printAndWait(`「啊啊${heart(1)}　您真是的…真的是恶魔来的呀…${heart(1)}」`); // :1212
        await era.printAndWait(`「${sc()}的身心…明明....都变得…如此地淫乱了…啊啊~${heart(1)}也不拿走${sc()}重要的东西什么的~${heart(1)}」`); // :1213
        await era.printAndWait(`${target_name}将腰抬高，向${master_name}诱惑而用手将蜜穴给张开。`); // :1214
        await era.printAndWait(`「啊啊~…明明…在这里有处女膜来的~${heart(1)}」`); // :1215
        await era.printAndWait(`「拜托了${heart(1)}请将${sc()}的…淫乱小穴…用${master_name}大人的大鸡巴来贯穿了吧~~~${heart(5)}」`); // :1216
        await era.printAndWait(`${target_name}一边将腰部左右地晃动着一边在${master_name}的面前自慰着………`); // :1217
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :1218
        era.set(`cflag:${target}:304`, 9); // :1218
        // 淫乱＋自慰中毒Lv3以上 // :1219
      } else if (TALENT:TARGET:76 == 1 && ABL:31 >= 3 && (CFLAG:304 <= 7 || FLAG:7 == 2)) { // :1220
        // 壶虫or肛门虫 // :1221
        if (TEQUIP:11 || TEQUIP:13) { // :1222
          await era.printAndWait(`「啊哼嗯~~…按摩器自慰最~棒~了~啊嗯~${heart(1)}」`); // :1223
          await era.printAndWait(`${target_name}留着口水继续着自慰………`); // :1224
        } else { // :1225
          // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1226
          if (RAND:3 == 0) { // :1227
            await era.printAndWait(`「啊啊…主人…请看一下吧~~~…${heart(1)}」`); // :1228
            await era.printAndWait(`「小穴的里面${heart(1)}要伸手指进去了哦~~~……${heart(1)}」`); // :1229
            await era.printAndWait(`「嗯哈啊啊~…不行了~…小穴自慰停不下来了${heart(3)}」`); // :1230
          } else if (RAND:2 == 0) { // :1231
            await era.printAndWait(`「哈啊~…啊~…啊啊~…这么的…舒服的事情嗯~…谁都没有告诉${target_name}啊嗯~…${heart(1)}」`); // :1232
            await era.printAndWait(`「小穴“库啪”地打开了~嗯哦嗯~${heart(1)}将手指塞进深处后~${heart(1)}」`); // :1233
            await era.printAndWait(`「只要再将小豆豆弄一下的话…哈嗯~${heart(1)}要舒服死了~${heart(1)}」`); // :1234
            await era.printAndWait(`「为什么大家…不做这么舒服的事情呢~？${heart(1)}」`); // :1235
          } else { // :1236
            await era.printAndWait(`「啊啊啊啊~…对不起…只用自己的手指就得那么舒服真是对不起~~~${heart(1)}」`); // :1237
            await era.printAndWait(`「但是停不下来呢~~${heart(1)} 这么舒服的事情，根本停不下来呀~~~${heart(1)}」`); // :1238
            await era.printAndWait(`「哪怕没有主人的命令也好…也会一整天玩弄自己的小穴真的是非常对不起呜~~~~~~${heart(1)}」`); // :1239
            await era.printAndWait(`${target_name}连你根本不知道的事情也说都了出来………`); // :1240
          } // :1241
        } // :1242
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :1243
        era.set(`cflag:${target}:304`, 8); // :1243
        // 淫乱＋自慰中毒Lv3未満 // :1244
      } else if (TALENT:TARGET:76 == 1 && ABL:31 < 3 && (CFLAG:304 <= 6 || FLAG:7 == 2)) { // :1245
        // 壶虫or肛门虫 // :1246
        if (TEQUIP:11 || TEQUIP:13) { // :1247
          await era.printAndWait(`「啊啊啊啊~…要不行了…那里要不行啊~~~…${heart(1)}」`); // :1248
          await era.printAndWait(`${target_name}流着口水沉浸在按摩器自慰着………`); // :1249
        } else { // :1250
          // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1251
          if (RAND:2 == 0) { // :1252
            await era.printAndWait(`「啊啊~…手指…手指擅自动起来了呀~~~…${heart(1)}」`); // :1253
            await era.printAndWait(`「这个手指…这个手指如果是主人的大鸡巴的话${heart(1)}　就会…就会变地更加舒服起来了呀~~${heart(1)}」`); // :1254
          } else { // :1255
            await era.printAndWait(`「啊啊~…虽然玩弄小穴也不错来的…但是好想要主人的大鸡巴呀~~…${heart(1)}」`); // :1256
            await era.printAndWait(`${target_name}自慰的同时，用着炽热的视线看着${target_name}股间的阴茎………`); // :1257
          } // :1258
        } // :1259
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :1260
        era.set(`cflag:${target}:304`, 7); // :1260
        // 爱＋处女 // :1261
      } else if (TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && (CFLAG:304 <= 5 || FLAG:7 == 2)) { // :1262
        await era.printAndWait(`「啊啊~…呜哈~…啊…${heart(1)}」`); // :1263
        await era.printAndWait(`${target_name}每次轻轻地抚摸自己的蜜穴后就会大声地呻吟一下。`); // :1264
        await era.printAndWait(`「如果大人您再不做的话~…${target_name}就要自己弄破了噢~…${heart(1)}」`); // :1265
        await era.printAndWait(`${target_name}说完扑哧一笑、将手指塞向了深处。`); // :1266
        await era.printAndWait(`「哈嗯~${heart(1)}…唔哼哼~、只是开玩笑的噢~………啊嗯~~~${heart(1)}」`); // :1267
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :1268
        era.set(`cflag:${target}:304`, 6); // :1268
        // 爱＋自慰中毒Lv3以上 // :1269
      } else if (TALENT:TARGET:85 == 1 && ABL:31 >= 3 && (CFLAG:304 <= 4 || FLAG:7 == 2)) { // :1270
        // 壶虫or肛门虫 // :1271
        if (TEQUIP:11 || TEQUIP:13) { // :1272
          await era.printAndWait(`「自慰器…自慰器用起来好舒服啊嗯~${heart(1)}」`); // :1273
          await era.printAndWait(`${target_name}嘴边流下了口水沉浸在了按摩器自慰中………`); // :1274
        } else { // :1275
          // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1276
          if (RAND:3 == 0) { // :1277
            await era.printAndWait(`「唔啊~…啊~哈啊~…明明...这样的…不行…来的…${heart(1)}」`); // :1278
            await era.printAndWait(`「啊啊~…但是…是魔王大人的命令来的…啊~啊啊~哈啊嗯~${heart(1)}」`); // :1279
            await era.printAndWait(`${target_name}哪怕嘴上说着这么多的借口，但还是忘我地自慰着………`); // :1280
          } else if (RAND:2 == 0) { // :1281
            await era.printAndWait(`「啊啊…请更加…更加地看这边吧~…请看着${sc()}淫荡下流的哪里吧~${heart(1)}」`); // :1282
            await era.printAndWait(`${target_name}每当将手指伸进蜜穴里后便会有下流的水声响起、爱液不提地滴到了地板上………`); // :1283
          } else { // :1284
            await era.printAndWait(`「啊啊~…玩弄的话…明明在这样玩弄下去的话就要回不来了的~~…${heart(1)}」`); // :1285
            await era.printAndWait(`「不行了嗯~~…已经…手指已经停不下来了~${heart(1)}…主人…请看着吧~！」`); // :1286
          } // :1287
        } // :1288
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :1289
        era.set(`cflag:${target}:304`, 5); // :1289
        // 爱＋自慰中毒Lv3未満 // :1290
      } else if (TALENT:TARGET:85 == 1 && ABL:31 < 3 && (CFLAG:304 <= 3 || FLAG:7 == 2)) { // :1291
        // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1292
        if (RAND:2 == 0) { // :1293
          await era.printAndWait(`「啊哈啊~…${heart(1)}　被喜欢的人给…看到了羞耻的地方什么的…」`); // :1294
          await era.printAndWait(`「居然是那么舒服的事情来的呀…请更加地…更加地看着${sc()}自慰的姿态吧~~~${heart(1)}」`); // :1295
        } else { // :1296
          await era.printAndWait(`「啊啊~…因为命令而自己安慰自己什么的…居然会那么舒服呀~~…${heart(1)}」`); // :1297
          await era.printAndWait(`「主人~${heart(1)} 请更加地…疼爱${sc()}吧…啊~啊啊啊~嗯~${heart(1)}」`); // :1298
        } // :1299
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :1300
        era.set(`cflag:${target}:304`, 4); // :1300
        // 屈服刻印Lv3+自慰中毒Lv1以上 // :1301
      } else if (MARK:2 == 3 &&ABL:31 >= 1 && (CFLAG:304 <= 2 || FLAG:7 == 2)) { // :1302
        // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1303
        if (RAND:2 == 0) { // :1304
          await era.printAndWait(`「明明…不行…来的…但是...为什么…手却…停不下来呀~………啊嗯~！」`); // :1305
        } else { // :1306
          await era.printAndWait(`「好、的…更加深地~…啊啊~啊~…啊嗯嗯唔！」`); // :1307
          await era.printAndWait(`${target_name}顺从着${master_name}的指示摩擦着蜜穴、一点一点地开发着敏感度………`); // :1308
        } // :1309
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :1310
        era.set(`cflag:${target}:304`, 3); // :1310
        // それ以外（爱無し、自慰中毒Lv1未満） // :1311
      } else if (CFLAG:304 <= 1 || FLAG:7 == 2) { // :1312
        // ランダムで口上が変化する（使わない場合はすべて同じにすればよい） // :1313
        if (RAND:2 == 0) { // :1314
          await era.printAndWait(`「呃呜…呜~…啊~…这样的一点也…哼呜~…啊~…哈呜~！」`); // :1315
        } else { // :1316
          await era.printAndWait(`「啊啊…哈啊~…居然让${target_name}做这样的事情…给${target_name}记住吧…啊啊~…啊~…嗯~」`); // :1317
        } // :1318
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :1319
        era.set(`cflag:${target}:304`, 2); // :1319
      } // :1320
      return 0; // :1321
    } // :1322
  } // :1323

  // ------------------------------------------------- // :1325
  // 胸爱撫 CFLAG:306 // :1326
  // ------------------------------------------------- // :1327
  if (SELECTCOM == 5) { // :1328
    // 初めて // :1329
    if (CFLAG:306 == 0) { // :1330
      // 母乳体质 // :1331
      if (TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0) { // :1332
        // 爱＆淫乱 // :1333
        if (TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1) { // :1334
          await era.printAndWait(`「胸部！要漏出来了呀~…${heart(1)}」`); // :1335
          // それ以外（愛無し） // :1336
        } else { // :1337
          await era.printAndWait(`「嗯呜...母乳居然…那么多………」`); // :1338
        } // :1339
      } else { // :1340
        // ☆改造　6/17 // :1341
        // 乳头ピアス+抖M气质Lv3 // :1342
        if (CFLAG:7 & 1 && ABL:21 >= 3) { // :1343
          await era.print(`「啊啊~${heart(1)} 被那么用力地揉的话~${heart(1)}」`); // :1344
          await era.printAndWait(`「就会有感觉了~${heart(1)}」`); // :1345
          if (TALENT:TARGET:85 == 1) { // :1347
            await era.printAndWait(`${target_name}好像想要炫耀爱的证明一样、自满地将胸前的乳头环摇晃起来了。`); // :1347
          } // :1347
          // 愛＆淫乱 // :1348
        } else if (TALENT:TARGET:85 == 1 && TALENT:TARGET:76 == 1) { // :1349
          await era.printAndWait(`「哼啊啊…请更加地…抚摸胸部吧~~…♪」`); // :1350
          await era.printAndWait(`「只是被${master_name}大人抚摸而已就感觉要融化掉了呀${heart(1)}」`); // :1351
          // それ以外（爱無し） // :1352
        } else { // :1353
          await era.printAndWait(`「嗯呜…不要…弄得那么疼………」`); // :1354
        } // :1355
      } // :1356
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :1357
      era.set(`cflag:${target}:TARGET:306`, 1); // :1357
      return 0; // :1358
      // 二回目以降 // :1359
    } else { // :1360
      // 母乳体质 // :1361
      if (TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 == 0) { // :1362
        // 淫乱 // :1363
        if (TALENT:TARGET:76 == 1 && (CFLAG:306 <= 4 || FLAG:7 == 2)) { // :1364
          await era.printAndWait(`「主人，请…请再喝多一点奶吧~${heart(1)}」`); // :1365
          await era.printAndWait(`「只是让主人喝着奶…就…就要去了呀…${heart(1)}」`); // :1366
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1367
          era.set(`cflag:${target}:306`, 5); // :1367
          // 爱慕 // :1368
        } else if (TALENT:TARGET:85 == 1 && (CFLAG:306 <= 3 || FLAG:7 == 2)) { // :1369
          await era.printAndWait(`「啊嗯~…可以的哦~…请再喝更多一点吧…${sc()}的可爱的大人………${heart(1)}」`); // :1370
          await era.printAndWait(`「${sc()}的奶…啊嗯~…全部…都是大人你的东西来的~…${heart(1)}」`); // :1371
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1372
          era.set(`cflag:${target}:306`, 4); // :1372
          // B感覚Lv3以上 // :1373
        } else if (ABL:1 >= 3 && (CFLAG:306 <= 2 || FLAG:7 == 2)) { // :1374
          await era.printAndWait(`「啊啊~…啊呜呜~…！请…请原谅${sc()}吧！」`); // :1375
          await era.printAndWait(`「再这样…被吸着奶的话…${sc()}…${sc()}…啊哈呜嗯~~~~~！」`); // :1376
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1377
          era.set(`cflag:${target}:306`, 3); // :1377
          // それ以外（爱無し、B感覚Lv3未満） // :1378
        } else if (CFLAG:306 <= 1 || FLAG:7 == 2) { // :1379
          await era.printAndWait(`「啊哈呜…不要...请不要…吸得...弄出声音来啊！」`); // :1380
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1381
          era.set(`cflag:${target}:306`, 2); // :1381
        } // :1382
      } else { // :1383
        // 淫乱 // :1384
        if (TALENT:TARGET:76 == 1 && (CFLAG:306 <= 4 || FLAG:7 == 2)) { // :1385
          await era.printAndWait(`「啊哈啊啊~…要融化掉了~${heart(1)}」`); // :1386
          await era.printAndWait(`「主人，请更加地…随心所欲地做吧~…啊~…啊啊~${heart(1)}」`); // :1387
          // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :1388
          era.set(`cflag:${target}:306`, 5); // :1388
          // 爱慕 // :1389
        } else if (TALENT:TARGET:85 == 1 && (CFLAG:306 <= 3 || FLAG:7 == 2)) { // :1390
          await era.printAndWait(`「啊嗯~…可以的哦…更加用力地揉…也没有关系的噢…啊~哈啊嗯啊啊啊~♪」`); // :1391
          await era.printAndWait(`「嗯呜~♪这样的真的可以哦~…啊~…是的噢…更加…用力地可以的噢${heart(1)}」`); // :1392
          // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :1393
          era.set(`cflag:${target}:306`, 4); // :1393
          // B感覚Lv3以上 // :1394
        } else if (ABL:1 >= 3 && (CFLAG:306 <= 2 || FLAG:7 == 2)) { // :1395
          await era.printAndWait(`「啊啊~…胸部…胸部居然会那么有感觉什么的…」`); // :1396
          await era.printAndWait(`「哈嗯~…请，请不要欺负胸部…啊~啊啊~！」`); // :1397
          // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :1398
          era.set(`cflag:${target}:306`, 3); // :1398
          // それ以外（爱無し、B感覚Lv3未満） // :1399
        } else if (CFLAG:306 <= 1 || FLAG:7 == 2) { // :1400
          await era.printAndWait(`「不…不要…唔…不要再…欺负胸部…啊~…啊啊~！」`); // :1401
          // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :1402
          era.set(`cflag:${target}:306`, 2); // :1402
        } // :1403
      } // :1404
      return 0; // :1405
    } // :1406
  } // :1407

  // ------------------------------------------------- // :1409
  // 接吻 CFLAG:307 // :1410
  // ------------------------------------------------- // :1411
  if (SELECTCOM == 6) { // :1412
    // 初吻 // :1413
    if (CFLAG:307 == 0 && TFLAG:13) { // :1414
      // 淫乱かつ主人 // :1415
      if (TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0) { // :1416
        // 高贵ダークエルフ // :1417
        if (TALENT:TARGET:314 == 7) { // :1418
          await era.printAndWait(`${master_name}抓住${target_name}的下巴将她的脸转了过来、强行地将嘴唇重合了起来。`); // :1419
          await era.printAndWait(`「嗯唔…嗯啾~…嗯呼~…嗯呼嗯~…~！…嗯唔~…嗯~嗯嗯~~呜~…呜~~！！！${heart(1)}」`); // :1420
          await era.printAndWait(`${target_name}通红着脸沉浸在和${master_name}的亲吻当中。`); // :1421
          await era.printAndWait(`「嗯哈啊啊~…啊啊…好棒…${sc()}淫乱的嘴唇能献给主人您真是荣幸呢~…${heart(3)}」`); // :1422
          // それ以外 // :1423
        } else { // :1424
          // 故郷に恋人がいる場合 // :1425
          if (TALENT:TARGET:317 == 4) { // :1426
            await era.printAndWait(`「嗯呼呜~${heart(1)} 嗯呜~…啾呜~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`); // :1427
            await era.printAndWait(`${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`); // :1428
            await era.printAndWait(`「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`); // :1429
            await era.printAndWait(`${target_name}沉浸在了和${master_name}亲吻之中，脑海里的故乡的恋人就好像已经不在了一样………`); // :1430
          } else { // :1431
            await era.printAndWait(`「嗯呼~${heart(1)} 嗯啾…啾~…啾呼~…呸咯~…嗯~嗯~嗯嗯嗯~${heart(1)}」`); // :1432
            await era.printAndWait(`${target_name}环抱着${master_name}、热情地将舌头缠绕起来。`); // :1433
            await era.printAndWait(`「亲吻原来…是会让人变得那么淫乱的感觉的啊…啊啊…还要…${heart(3)}」`); // :1434
          } // :1435
        } // :1436
        // 爱かつ主人 // :1437
      } else if (TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == 0) { // :1438
        // 高贵エルフ // :1439
        if (TALENT:TARGET:314 == 1) { // :1440
          await era.printAndWait(`「那、那个、${sc()}那个所谓的心理准备还没…啊嗯~！」`); // :1441
          await era.printAndWait(`趁着${target_name}还在迷惑的时候将其抱住后、${master_name}直接将她的嘴唇夺走了。`); // :1442
          await era.printAndWait(`「嗯呼~…嗯…嗯呜~…嗯…啾…啾…噗哈~…啊啊~…啊~…♪」`); // :1443
          await era.printAndWait(`「真、真是的…真是那个…对大人您真是无奈了呀…啊嗯~！」`); // :1444
          await era.printAndWait(`${master_name}再次将这个有点小啰嗦的精灵族小姑娘的嘴唇给夺走了………`); // :1445
          // それ以外 // :1446
        } else { // :1447
          // 故郷に恋人がいる場合 // :1448
          if (TALENT:TARGET:317 == 4) { // :1449
            await era.printAndWait(`「嗯哼哼~…这是${sc()}的初吻来的噢~………♪」`); // :1450
            await era.printAndWait(`「啊嗯~…噗~请不要那么坏心眼啦…真的是初吻来的嘛…不管是第二回…还是第三回都是…${heart(1)}」`); // :1451
            await era.printAndWait(`${target_name}可爱地微笑了一下后，便不停地跟${master_name}亲吻了起来………`); // :1452
          } else { // :1453
            await era.printAndWait(`「嗯呜~…是、是的…能否再来一次吗？」`); // :1454
            await era.printAndWait(`「${target_name}想要…好好地记住大人您的吻………」`); // :1455
            await era.printAndWait(`${target_name}可爱地微笑了一下后，再度跟${master_name}亲吻了一下………`); // :1456
          } // :1457
        } // :1458
        // それ以外 // :1459
      } else { // :1460
        // 故郷に恋人がいる場合、なおかつ侵攻度が５０００を越えている場合。 // :1461
        if (TALENT:TARGET:317 == 4 && FLAG:81 >= 5000) { // :1462
          await era.printAndWait(`「亲、亲吻的话…真的会…放那个人走对吧………」`); // :1463
          await era.printAndWait(`${target_name}将自己的吻和在故乡的恋人的生命放在天枰衡量了一下、便向${master_name}献出了嘴唇。`); // :1464
          await era.printAndWait(`「嗯~…嗯呜~…~！………已、已经…够了吧…」`); // :1465
          await era.printAndWait(`「！…怎，怎么能…那么卑鄙…让${scf()}、${sc()}自己来做什么的…唔…呜呜呜~………」`); // :1466
          await era.printAndWait(`${target_name}的身体颤抖着，自己上前亲吻了${master_name}………`); // :1467
        } else { // :1468
          await era.printAndWait(`「啊啊…啊…${sc()}的…初吻被………」`); // :1469
        } // :1470
      } // :1471
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1472
      era.set(`cflag:${target}:307`, 1); // :1472
      return 0; // :1473
      // （調教では）初めて // :1474
    } else if (CFLAG:307 == 0) { // :1475
      // 淫乱 // :1476
      if (TALENT:TARGET:76 == 1) { // :1477
        await era.printAndWait(`「嗯呜~…嗯啾~…嗯呼~...哼啊~…啊啊…非常地舒服呢~………${heart(1)}」`); // :1478
        await era.printAndWait(`${target_name}的脸红得发烫，沉醉在和${master_name}的亲吻之中。`); // :1479
        await era.printAndWait(`「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`); // :1480
        // 愛 // :1481
      } else if (TALENT:TARGET:85 == 1) { // :1482
        await era.printAndWait(`「哈啊啊~…和喜欢的对方亲吻什么的居然会那么舒服来的呀…♪」`); // :1483
        await era.printAndWait(`「啊啊…请再…亲更多次吧~………」`); // :1484
        // それ以外 // :1485
      } else { // :1486
        await era.printAndWait(`「嗯呜~…这，这样的…才不算什么呢！…！」`); // :1487
      } // :1488
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :1489
      era.set(`cflag:${target}:307`, 1); // :1489
      return 0; // :1490
      // 二回目以降 // :1491
    } else { // :1492
      // 淫乱 // :1493
      if (TALENT:TARGET:76 == 1 && (CFLAG:307 <= 4 || FLAG:7 == 2)) { // :1494
        await era.printAndWait(`「嗯唔…嗯啾~…嗯噗…呼啊…啊啊~…非常的舒服啊~………${heart(1)}」`); // :1495
        await era.printAndWait(`${target_name}脸红得发烫，沉醉在和${master_name}的亲吻之中。`); // :1496
        await era.printAndWait(`「${sc()}的嘴唇…全部都是主人的东西来的…请更加的…渴求${sc()}的嘴唇吧~~${heart(1)}」`); // :1497
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :1498
        era.set(`cflag:${target}:307`, 5); // :1498
        // 爱慕 // :1499
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:307 <= 3 || FLAG:7 == 2)) { // :1500
        await era.printAndWait(`「嗯~…嗯啾~…啾~…哈啊啊~…感觉脑袋里变得一片空白了呢~…♪」`); // :1501
        await era.printAndWait(`「啊啊啊…只是亲吻就变得那么舒服什么的………${heart(1)}」`); // :1502
        await era.printAndWait(`${target_name}如同说梦话地一样喃喃自语着，可见多么地沉浸在亲吻之中………`); // :1503
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :1504
        era.set(`cflag:${target}:307`, 4); // :1504
        // 顺从Lv2以上 // :1505
      } else if (ABL:10 >=2 && (CFLAG:307 <= 2 || FLAG:7 == 2)) { // :1506
        await era.printAndWait(`「好、的…亲吻…对吧…嗯~…哈啊啊…还、还要更多吗？」`); // :1507
        await era.printAndWait(`「真、真是没有办法呢…嗯啾…啾…啾…♪」`); // :1508
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :1509
        era.set(`cflag:${target}:307`, 3); // :1509
        // それ以外 // :1510
      } else if (CFLAG:307 <= 1 || FLAG:7 == 2) { // :1511
        await era.printAndWait(`「哈啊…哈啊…这样…这样的………」`); // :1512
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :1513
        era.set(`cflag:${target}:307`, 2); // :1513
      } // :1514
      return 0; // :1515
    } // :1516
  } // :1517

  // ------------------------------------------------- // :1519
  // 自己扒开 CFLAG:308 // :1520
  // ------------------------------------------------- // :1521
  if (SELECTCOM == 7) { // :1522
    // 初めて // :1523
    if (CFLAG:308 == 0) { // :1524
      // 淫乱 // :1525
      if (TALENT:TARGET:76 == 1) { // :1526
        await era.printAndWait(`「啊啊嗯~…${sc()}的小穴深处…被主人看到了啊~~${heart(1)}」`); // :1527
        // 爱慕 // :1528
      } else if (TALENT:TARGET:85 == 1) { // :1529
        await era.printAndWait(`…这样的…自己张开那里让大人您看什么的…明明…很羞耻，的事情来的`); // :1530
        // それ以外（爱無し） // :1531
      } else { // :1532
        await era.printAndWait(`「不，不行了啊…已经不能再张开了…哈呜！…${sc()}明、明白了…会张得…更大的………」`); // :1533
      } // :1534
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :1535
      era.set(`cflag:${target}:TARGET:308`, 1); // :1535
      return 0; // :1536
      // ;ビデオくぱぁ // :1537
    } else if (TEQUIP:53 == 1) { // :1538
      // ;爱も淫乱も無い // :1539
      if (TALENT:TARGET:76 == 0 && TALENT:TARGET:85 == 0) { // :1540
        // ;露出癖Lv5以上 // :1541
        if (ABL:17 >= 5) { // :1542
          await era.printAndWait(`「啊啊~、好奇怪呀~…明明这样好羞耻来的…为什么………」`); // :1543
          await era.printAndWait(`一副被命令、没有办法才……地这么一副样子的${target_name}、看着放在自己面前的水晶球身体“噗噜”地颤抖了。`); // :1544
          await era.printAndWait(`「一想到要被好多人看到后…身，身体就要变得…啊啊~${heart(1)} 啊啊啊~${heart(1)}」`); // :1545
        } else { // :1546
          await era.printAndWait(`「呜……」`); // :1547
          await era.printAndWait(`不甘心地咬着自己得下嘴唇、${target_name}向着眼前的水晶球张开了自己的秘处。`); // :1548
        } // :1549
      } else { // :1550
        // ;第一声・淫乱か // :1551
        if (TALENT:TARGET:76 == 1) { // :1552
          await era.printAndWait(`「嗯哼~${heart(1)} ${target_name}明白了~。就按照主人说的那样、给大~家、大饱眼福一下吧~」`); // :1553
          // ;第一声・爱か // :1554
        } else if (TALENT:TARGET:85 == 1) { // :1555
          await era.printAndWait(`「啊啊……虽然感到十分地羞耻、但是会按照${master_name}所说的那样……」`); // :1556
        } // :1557
        // ;本分冒頭・处女にして牝犬にして时常发情 // :1558
        if (TALENT:TARGET:0 == 1 && TALENT:TARGET:136 == 1 && TALENT:TARGET:271 == 1) { // :1559
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、处女小穴来的…`); // :1560
          await era.print(`还没有被某位人的粗壮之物给贯穿的处女小穴来的、想要魔王大人给予名为快乐的诱饵而、`); // :1561
          await era.print(`一直都像这样不像样地流着口水黏糊糊的样子、的雌犬小穴来的。`); // :1562
          // ;本分冒頭・处女にして时常发情 // :1563
        } else if (TALENT:TARGET:0 == 1 && TALENT:TARGET:271 == 1) { // :1564
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、处女小穴来的…`); // :1565
          await era.print(`明明还没有被某个人的粗壮之物给贯穿、因为没法忘记魔王大人给予的愉悦、所以一直都这么黏糊糊的…`); // :1566
          // ;本分冒頭・处女 // :1567
        } else if (TALENT:TARGET:0 == 1) { // :1568
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、、处女小穴来的…`); // :1569
          // ;本分冒頭・牝犬にして时常发情 // :1570
        } else if (TALENT:TARGET:136 == 1 && TALENT:TARGET:271 == 1) { // :1571
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、小穴来的…`); // :1572
          await era.print(`就像这样、一直都不知羞耻地流着口水黏糊糊的、贪欲的雌犬小穴来的。`); // :1573
          // ;本分冒頭・牝犬 // :1574
        } else if (TALENT:TARGET:136 == 1) { // :1575
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…淫乱雌犬${target_name}的、小穴来的…`); // :1576
          // ;本分冒頭・时常发情 // :1577
        } else if (TALENT:TARGET:271 == 1) { // :1578
          await era.print(`正在看的大家……能不能看见呢~？这个、${sc()}的…${target_name}的小穴是、一直都是黏糊糊的噢~。`); // :1579
          await era.print(`要说为什么的话、那是因为魔王大人一直都将快乐和愉悦交给${sc()}的原因…`); // :1580
          // ;本分冒頭・その他 // :1581
        } else { // :1582
          await era.print(`「正在看的大家……能不能看见呢~？这个就是、${sc()}的…${target_name}的、小穴来的…`); // :1583
        } // :1584
        // ;露出狂 // :1585
        if (TALENT:TARGET:89 == 1) { // :1586
          await era.print(`只是想象被看到就会、不断地变湿了的、下流的小穴…`); // :1587
          await era.print(`明明都没有在大家的面前…不对、只有魔王大人的视线也会很快就会湿掉了。`); // :1588
        } // :1589
        // ;弄乳狂にして非处女 // :1590
        if (TALENT:TARGET:78 == 1 && TALENT:TARGET:0 == 0) { // :1591
          await era.print(`魔王大人虽然让、${sc()}喜欢是上弄胸部的快感……`); // :1592
          await era.print(`但是这里也一样、最喜欢做了，不管是被欺负也好，还是被疼爱也好…${heart(1)}`); // :1593
          // ;弄乳狂にして处女 // :1594
        } else if (TALENT:TARGET:78 == 1 && TALENT:TARGET:0 == 1) { // :1595
          await era.print(`因为魔王大人教会了${sc()}胸部的真正用法，弄胸部就会不行了………`); // :1596
          await era.print(`所以说还没有对这里调教过、不知道以后用这里侍奉能不能符合魔王大人的喜好、十分地担心……`); // :1597
        } // :1598
        // ;性爱狂にして非处女 // :1599
        if (TALENT:TARGET:75 == 1 && TALENT:TARGET:0 == 0) { // :1600
          await era.print(`因为被魔王大人抽插了不知道多少次了、所以变得最喜欢结合的交配狂了。`); // :1601
          // ;性爱狂にして处女（あり得ない？） // :1602
        } else if (TALENT:TARGET:75 == 1 && TALENT:TARGET:0 == 1) { // :1603
          await era.print(`想要让魔王大人来擦来擦去、一直都痒地不行呢。`); // :1604
        } // :1605
        // ;自慰狂 // :1606
        if (TALENT:TARGET:74 == 1) { // :1607
          await era.print(`因为不管什么时候都会想要快乐而痒得不行、一不留神就自慰起来了啊。`); // :1608
          await era.print(`就像这样一样……嗯~、嗯~……`); // :1609
        } // :1610
        // ;受虐狂にして非处女 // :1611
        if (TALENT:TARGET:88 == 1 && TALENT:TARGET:0 == 0) { // :1612
          await era.print(`不管被多么粗鲁的抽插过……不对、不管做出怎样痛苦的事情、${sc()}的这里都会流出开心的泪水。`); // :1613
          // ;受虐狂にして处女 // :1614
        } else if (TALENT:TARGET:88 == 1 && TALENT:TARGET:0 == 1) { // :1615
          await era.print(`不管被鞭子打也好、还是被拿针刺都好、${sc()}的这里都会流出开心的泪水。`); // :1616
        } // :1617
        // ;尻穴狂にしてアナルバイブ使用中 // :1618
        if (TALENT:TARGET:77 == 1 && TEQUIP:13) { // :1619
          await era.print(`不只是前面、后面也是很厉害的噢、${sc()}。看吧…现在里面也有着那么有精神的肛门虫在里面呢`); // :1620
          // ;さらに处女 // :1621
          if (TALENT:TARGET:0 == 1) { // :1622
            await era.print(`因为魔王大人只专心调教这边的原因、所以变成了如此下流的肛穴了呀。`); // :1623
            await era.print(`不只是用来侍奉的小穴来的、${sc()}自身也会有感觉的、不知道多少次因为太有感觉而恍惚了…唔哼哼~${heart(1)}`); // :1624
            // ;非处女 // :1625
          } else { // :1626
            await era.print(`前面也好、后面也好…小穴也好、肛穴也好、身体全部都被魔王大人、给予了调教了${heart(1)}`); // :1627
          } // :1628
          // ;尻穴狂 // :1629
        } else if (TALENT:TARGET:77 == 1) { // :1630
          await era.print(`不只是前面，后面也很厉害的噢、${sc()}。因为魔王大人只专注调教这边的原因、${sc()}的肛穴…`); // :1631
          // ;さらに处女 // :1632
          if (TALENT:TARGET:0 == 1) { // :1633
            await era.print(`已经、完全变成了只为侍奉而用的肛穴了。${sc()}自身也，也变得奇怪地敏感起来了…唔哼哼${heart(1)}`); // :1634
            // ;非处女 // :1635
          } else { // :1636
            await era.print(`跟小穴一样、肛穴也……不对、不只是肛穴，全身都被魔王大人蹂蹑过，给予了调教了${heart(1)}`); // :1637
          } // :1638
        } // :1639
        await era.print(`只要是魔王大人的命令来的话、${sc()}一定会在这里…用这个`); // :1640
        // ;爱 // :1641
        if (TALENT:TARGET:85 == 1) { // :1643
          await era.print(`魔王大人专用`); // :1643
        } // :1643
        // ;淫乱 // :1644
        if (TALENT:TARGET:76 == 1) { // :1646
          await era.print(`淫乱`); // :1646
        } // :1646
        // ;牝犬 // :1647
        if (TALENT:TARGET:136 == 1) { // :1649
          await era.print(`牝犬`); // :1649
        } // :1649
        // ;时常发情 // :1650
        if (TALENT:TARGET:271 == 1) { // :1652
          await era.print(`贪欲`); // :1652
        } // :1652
        // ;处女 // :1653
        if (TALENT:TARGET:0 == 1) { // :1655
          await era.print(`处女`); // :1655
        } // :1655
        await era.print(`小穴来、给今天看到的大家侍奉也说不定呢。`); // :1656
        await era.print(`当然，不管那是、在野外垂死的最底层居民也好、还是满身污臭的亚人也好……`); // :1657
        // ;讨厌男人にして兽奸中毒5lv以上 // :1658
        if (TALENT:TARGET:82 == 1 && ABL:39 >= 5) { // :1659
          await era.print(`啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。还不如狗更好呢。`); // :1660
          await era.print(`哪怕是这样、只要魔王大人下命令的话……${sc()}就会、打从欣喜接受其命令。`); // :1661
          // ;讨厌男人 // :1662
        } else if (TALENT:TARGET:82 == 1) { // :1663
          await era.print(`啊啊……但是、被魔王之外的男人抱住什么的、还是觉得有点毛骨悚然呢。`); // :1664
          await era.print(`哪怕是这样、只要魔王大人下命令的话……${sc()}就会、打从欣喜接受其命令。`); // :1665
        } // :1666
        await era.printAndWait(`当然、如果你没有对魔王大人抱有绝对的忠诚的话……真是没有缘分的话题呢、对吧」`); // :1667
      } // :1668
      // ;通常くぱぁ // :1669
      // ;爱か淫乱があって、二回目以降の最初 // :1670
    } else if (CFLAG:308 <= 99 && (TALENT:TARGET:76 == 1 || TALENT:TARGET:85 == 1)) { // :1671
      // ;第一声・淫乱か // :1672
      if (TALENT:TARGET:76 == 1) { // :1673
        await era.printAndWait(`「是的、请看吧、主人~${heart(1)}」`); // :1674
        // ;第一声・爱か // :1675
      } else if (TALENT:TARGET:85 == 1) { // :1676
        await era.printAndWait(`「啊啊~……虽然很害羞来着、${master_name}想要看的话……」`); // :1677
      } // :1678
      // ;本分冒頭・处女にして牝犬にして时常发情 // :1679
      if (TALENT:TARGET:0 == 1 && TALENT:TARGET:136 == 1 && TALENT:TARGET:271 == 1) { // :1680
        await era.print(`「觉得怎样呢~…？想要魔王大人将其贯穿、一直都像这样`); // :1681
        await era.print(`不知羞耻地流着口水黏糊糊得、雌犬处女小穴来的${heart(1)}`); // :1682
        // ;本分冒頭・处女にして时常发情 // :1683
      } else if (TALENT:TARGET:0 == 1 && TALENT:TARGET:271 == 1) { // :1684
        await era.print(`「觉得怎样呢…？就像所见的那样、还是处女来的噢…想要让魔王大人快一点将其贯穿、`); // :1685
        await era.print(`一直都像这样、黏糊糊地等待着都快要等不住了呢~${heart(1)}`); // :1686
        // ;本分冒頭・处女 // :1687
      } else if (TALENT:TARGET:0 == 1) { // :1688
        await era.print(`「觉得怎样呢…？就像所见的那样、还是处女来的噢…`); // :1689
        await era.print(`想要让魔王大人快一点将其贯穿、这么地一抽一抽地呢${heart(1)}`); // :1690
        // ;本分冒頭・牝犬にして时常发情 // :1691
      } else if (TALENT:TARGET:136 == 1 && TALENT:TARGET:271 == 1) { // :1692
        await era.print(`「觉得怎样呢~…？就像这也、一直都流着口水黏糊糊的、贪欲的雌犬小穴来的贪欲。`); // :1693
        // ;本分冒頭・牝犬 // :1694
      } else if (TALENT:TARGET:136 == 1) { // :1695
        await era.print(`「请吧~、请鉴赏吧~…这样不知羞耻的雌犬小穴也可以的话、请随便……`); // :1696
        // ;本分冒頭・时常发情 // :1697
      } else if (TALENT:TARGET:271 == 1) { // :1698
        await era.print(`「请吧~、请鉴赏吧~…一直都黏糊糊的，贪欲的发情小穴也可以的话、请随便……`); // :1699
        // ;露出狂 // :1700
      } else if (TALENT:TARGET:89 == 1) { // :1701
        await era.print(`「只是视线而已、就会变得那么湿的${sc()}的小穴也可以的话……${sc()}自己也就、拜托您了……`); // :1702
        // ;本分冒頭・その他 // :1703
      } else { // :1704
        await era.print(`「请吧~、请鉴赏吧~…${sc()}的全部、都是魔王大人的东西来的啦……`); // :1705
      } // :1706
      // ;弄乳狂にして非处女 // :1707
      if (TALENT:TARGET:78 == 1 && TALENT:TARGET:0 == 0) { // :1708
        await era.print(`不只是胸部而已、这边也请调教到发狂吧~。`); // :1709
        // ;弄乳狂にして处女 // :1710
      } else if (TALENT:TARGET:78 == 1 && TALENT:TARGET:0 == 1) { // :1711
        await era.print(`只是胸部还是不满足呢、也请充分地调教这边吧。`); // :1712
      } // :1713
      // ;性爱狂にして非处女 // :1714
      if (TALENT:TARGET:75 == 1 && TALENT:TARGET:0 == 0) { // :1715
        await era.print(`也请别只是看而已、激烈地抽插也是可以的哦？不对、很想要做啊…已经、快点、快点…！`); // :1716
        // ;性爱狂にして处女（あり得ない？） // :1717
      } else if (TALENT:TARGET:75 == 1 && TALENT:TARGET:0 == 1) { // :1718
        await era.print(`也请别只是看而已、就想要在这里感受魔王大人呢。给${sc()}、教给真正的抽插狂吧~…！`); // :1719
      } // :1720
      // ;自慰狂 // :1721
      if (TALENT:TARGET:74 == 1) { // :1722
        await era.print(`啊啊~…！就这样也好、也好想要自慰、好想自慰地不行……！`); // :1723
      } // :1724
      // ;受虐狂 // :1725
      if (TALENT:TARGET:88 == 1) { // :1727
        await era.print(`不管被怎样粗鲁地做都没有关系得啦……不管怎样的狂风大雨、${sc()}都会感觉到愉悦的…！`); // :1727
      } // :1727
      if (TEQUIP:11 || TEQUIP:13) { // :1729
        await era.print(`像这种蠕虫什么的、根本不够呢…！根本不满足嘛~…！`); // :1729
      } // :1729
      // ;尻穴狂 // :1730
      if (TALENT:TARGET:77 == 1) { // :1732
        await era.print(`小穴不行的话、肛穴也没有关系。请、请对${sc()}……！`); // :1732
      } // :1732
      // ;淫乱か // :1733
      if (TALENT:TARGET:76 == 1) { // :1734
        await era.print(`请用主人的、又热又粗的东西贯穿吧${heart(1)}`); // :1735
        await era.printAndWait(`请怜悯一下吧、请抽插身体的深处吧${heart(1)}」`); // :1736
        // ;爱か // :1737
      } else if (TALENT:TARGET:85 == 1) { // :1738
        await era.print(`请用${master_name}的、又热又粗的东西贯穿吧~${heart(1)}`); // :1739
        await era.printAndWait(`请抱住${sc()}、深处的里面想要被贯穿呢~${heart(1)}」`); // :1740
      } // :1741
      // ;それ以降（二回目以降） // :1742
    } else { // :1743
      // 淫乱 // :1744
      if (TALENT:TARGET:76 == 1 && (CFLAG:308 <= 104 || FLAG:7 == 2)) { // :1745
        await era.printAndWait(`「啊啊啊~…主人${heart(1)}」`); // :1746
        await era.printAndWait(`「如果实在忍不住了的话…就这样${sc()}推倒吧…强奸到失神也没有关系的噢${heart(3)}」`); // :1747
        await era.printAndWait(`${target_name}露出了一脸淫猥的表情诱惑着${master_name}………`); // :1748
        // CFLAG:306  = 105（变量语义：CFLAG 族，306） // :1749
        era.set(`cflag:${target}:306`, 105); // :1749
        // 爱慕 // :1750
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:308 <= 103 || FLAG:7 == 2)) { // :1751
        await era.printAndWait(`「啊啊啊~…居然必须要 给喜欢的对方...看这种地方什么的…♪」`); // :1752
        await era.printAndWait(`「虽然很害羞…但是我会加油张开的${heart(1)} 请鉴赏吧~${heart(1)}」`); // :1753
        await era.printAndWait(`${target_name}脸通红着张开自己的秘处………`); // :1754
        // CFLAG:306  = 104（变量语义：CFLAG 族，306） // :1755
        era.set(`cflag:${target}:306`, 104); // :1755
        // 露出癖Lv3以上 // :1756
      } else if (ABL:17 >= 3 && (CFLAG:308 <= 102 || FLAG:7 == 2)) { // :1757
        await era.printAndWait(`「啊啊~、好奇怪的啊~…这样的事情明明很害羞来的…为什么………」`); // :1758
        await era.printAndWait(`「一明白实在被看到的话…啊啊~身体就变热起来了…啊啊~${heart(1)} 啊啊啊~${heart(1)}」`); // :1759
        // CFLAG:306  = 103（变量语义：CFLAG 族，306） // :1760
        era.set(`cflag:${target}:306`, 103); // :1760
        // それ以外（爱無し、露出癖Lv3未満） // :1761
      } else if (CFLAG:306 <= 101 || FLAG:7 == 2) { // :1762
        await era.printAndWait(`「呜嗯~…怎、怎样…这样的话…就已经满足了吧？」`); // :1763
        await era.printAndWait(`「想、想看的话，那就看更多一点就好了啊…！」`); // :1764
        // CFLAG:306  = 102（变量语义：CFLAG 族，306） // :1765
        era.set(`cflag:${target}:306`, 102); // :1765
      } // :1766
      return 0; // :1767
    } // :1768
  } // :1769

  // ------------------------------------------------- // :1771
  // 插入手指 CFLAG:309 // :1772
  // ------------------------------------------------- // :1773
  if (SELECTCOM == 8) { // :1774
    // 初めて // :1775
    if (CFLAG:TARGET:309 == 0) { // :1776
      // 淫乱 // :1777
      if (TALENT:TARGET:76 == 1) { // :1778
        await era.printAndWait(`「啊啊~${heart(1)} 主人的手指…在${sc()}的小穴里…${heart(1)}」`); // :1779
        // 屈服刻印Lv3+爱 // :1780
      } else if (MARK:2 == 3 && TALENT:TARGET:85 == 1) { // :1781
        await era.printAndWait(`「好的~…${sc()}没关系的啦~…请按照大人您想要的做吧~…嗯~…那里…好棒…的说~唔嗯~♪」`); // :1782
        // それ以外 // :1783
      } else { // :1784
        await era.printAndWait(`「啊啊~…不行…不行的啊啊…伸地那么进去的…唔哈啊啊啊！」`); // :1785
      } // :1786
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :1787
      era.set(`cflag:${target}:TARGET:309`, 1); // :1787
      return 0; // :1788
      // 二回目以降 // :1789
    } else { // :1790
      // 淫乱 // :1791
      if (TALENT:TARGET:76 == 1 && (CFLAG:309 <= 4 || FLAG:7 == 2)) { // :1792
        await era.printAndWait(`「嗯哈啊~${heart(1)} 啊~${heart(1)} 更加抽插那里吧~${heart(1)}」`); // :1793
        await era.printAndWait(`「请用主人的手指来…扣着${sc()}淫乱的小穴吧哈呜呜呜呜哎哎哎~~~~${heart(3)}」`); // :1794
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :1795
        era.set(`cflag:${target}:309`, 5); // :1795
        // 爱＋屈服刻印Lv3 // :1796
      } else if (TALENT:TARGET:85 == 1 && MARK:2 == 3 && (CFLAG:309 <= 3 || FLAG:7 == 2)) { // :1797
        await era.printAndWait(`「啊~啊啊~…嗯~${heart(1)} 那里…非常的舒服呀~~${heart(1)}」`); // :1798
        await era.printAndWait(`「请更加地…请更加粗野地程度…扣${sc()}得那里吧~…啊~哈~哈啊啊啊嗯~♪」`); // :1799
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :1800
        era.set(`cflag:${target}:309`, 4); // :1800
        // 屈服刻印Lv3 // :1801
      } else if (MARK:2 == 3 && (CFLAG:309 <= 2 || FLAG:7 == 2)) { // :1802
        await era.printAndWait(`「啊啊~…将腰抬得更高什么的…哈嗯呜~！？」`); // :1803
        await era.printAndWait(`「才、才不是呢~…那里才不是有感觉的地方呢…哈呜~哈呜~啊呜~啊呜嗯啊啊哈啊啊哈啊~～～～！！！」`); // :1804
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :1805
        era.set(`cflag:${target}:309`, 3); // :1805
        // それ以外 // :1806
      } else if (CFLAG:309 <= 1 || FLAG:7 == 2) { // :1807
        await era.printAndWait(`「啊啊~…手指在…那么的…粗鲁地做…嗯…呜…啊啊~…」`); // :1808
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1809
        era.set(`cflag:${target}:309`, 2); // :1809
      } // :1810
      return 0; // :1811
    } // :1812
  } // :1813



  // ------------------------------------------------- // :1817
  // 舔肛 CFLAG:310 // :1818
  // ------------------------------------------------- // :1819
  if (SELECTCOM == 9) { // :1820
    // 初めて // :1821
    if (CFLAG:310 == 0) { // :1822
      // 淫乱 // :1823
      if (TALENT:TARGET:76 == 1) { // :1824
        await era.printAndWait(`「哈嗯呜~…主人~${heart(1)}」`); // :1825
        await era.printAndWait(`「啊啊~明明不干净的肛穴被舔着…却还会有感觉……真是……${heart(1)}」`); // :1826
        // 爱慕 // :1827
      } else if (TALENT:TARGET:85 == 1) { // :1828
        await era.printAndWait(`「不、不行的呀…舔那种地方的话…哈呜嗯~♪」`); // :1829
        await era.printAndWait(`「好、好痒呀~、这、这样的~…啊~啊啊啊啊~${heart(1)}」`); // :1830
        // それ以外（爱無し） // :1831
      } else { // :1832
        await era.printAndWait(`「哈呜嗯~！居、居然舔那种地方什么的…脑、脑袋变奇怪了吗！」`); // :1833
      } // :1834
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1835
      era.set(`cflag:${target}:TARGET:310`, 1); // :1835
      return 0; // :1836
      // 二回目以降 // :1837
    } else { // :1838
      // 淫乱 // :1839
      if (TALENT:TARGET:76 == 1 && (CFLAG:310 <= 4 || FLAG:7 == 2)) { // :1840
        await era.printAndWait(`「嗯哈啊~…更加…更加往肛穴的深处…哈嗯呜~用舌头来侵犯吧~！请用舌头来侵犯吧~~~！」`); // :1841
        await era.printAndWait(`「啊啊啊~…肛穴好舒服啊~…只是被呸咯呸咯地舔了而已…只是这样理性就要飞走啦~~${heart(5)}」`); // :1842
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1843
        era.set(`cflag:${target}:310`, 5); // :1843
        // 爱慕 // :1844
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:310 <= 3 || FLAG:7 == 2)) { // :1845
        await era.printAndWait(`「啊啊~…这么的…专注地舔着那里的话…${sc()}…真的要感觉到奇怪的…♪」`); // :1846
        await era.printAndWait(`「啊啊~…用舌头来挖吧…更加地…侵犯着肛穴吧~~………♪」`); // :1847
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1848
        era.set(`cflag:${target}:310`, 4); // :1848
        // 屈服刻印Lv3 // :1849
      } else if (MARK:2 == 3 && (CFLAG:310 <= 2 || FLAG:7 == 2)) { // :1850
        await era.printAndWait(`「呜嗯~…啊~啊啊啊~…不要啊…不要再舔下去了呀~…嗯嗯~！」`); // :1851
        await era.printAndWait(`「要变得…奇怪起来了呀………」`); // :1852
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1853
        era.set(`cflag:${target}:310`, 3); // :1853
        // それ以外（屈服刻印Lv3未満） // :1854
      } else if (CFLAG:310 <= 1 || FLAG:7 == 2) { // :1855
        await era.printAndWait(`「啊啊~…不、不要…说了不要了啊…啊~啊啊~！」`); // :1856
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1857
        era.set(`cflag:${target}:310`, 2); // :1857
      } // :1858
      return 0; // :1859
    } // :1860
  } // :1861


  // ------------------------------------------------- // :1864
  // 振动宝石 CFLAG:311 // :1865
  // ------------------------------------------------- // :1866
  if (SELECTCOM == 10) { // :1867
    // 初めて // :1868
    if (CFLAG:TARGET:311 == 0) { // :1869
      // 淫乱 // :1870
      if (TALENT:TARGET:76 == 1) { // :1871
        await era.printAndWait(`「嗯哼呜呜~！？啊啊~啊~…哈啊恩~…！那个小玩具…好棒呀~${heart(1)}」`); // :1872
        // 屈服刻印Lv3+爱 // :1873
      } else if (MARK:2 == 3 && TALENT:TARGET:85 == 1) { // :1874
        await era.printAndWait(`「啊~…啊啊嗯~♪…是、是的没问题的~…请更加…用力压下去吧…请将${sc()}当成玩具来玩耍吧~…♪」`); // :1875
        // それ以外 // :1876
      } else { // :1877
        await era.printAndWait(`「呜呀~…这、这是什么啊、哪个是…不、不要…不要压下去…啊~啊啊啊啊啊~！」`); // :1878
      } // :1879
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1880
      era.set(`cflag:${target}:TARGET:311`, 1); // :1880
      return 0; // :1881
      // 二回目以降 // :1882
    } else { // :1883
      // 淫乱 // :1884
      if (TALENT:TARGET:76 == 1 && (CFLAG:311 <= 4 || FLAG:7 == 2)) { // :1885
        await era.printAndWait(`「${sc()}的小阴蒂…请更加地…更加地欺负那里吧~…${heart(1)}」`); // :1886
        await era.printAndWait(`「啊啊~…一抽一抽的要来了${heart(1)} 来了呀~~${heart(1)}」`); // :1887
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1888
        era.set(`cflag:${target}:311`, 5); // :1888
        // 爱＋屈服刻印Lv3 // :1889
      } else if (TALENT:TARGET:85 == 1 && MARK:2 == 3 && (CFLAG:311 <= 3 || FLAG:7 == 2)) { // :1890
        await era.printAndWait(`「啊啊啊~…啊啊~嗯~…哼啊啊~…${heart(1)}　哈啊…哈啊…啊啊、为什么停下来了呢？」`); // :1891
        await era.printAndWait(`「情更加地…请更加地玩弄吧~…将${sc()}的身体当成玩具来玩弄吧~${heart(1)}」`); // :1892
        await era.printAndWait(`「…哈呜啊啊~♪…小阴蒂…小阴蒂好舒服呀~${heart(3)}」`); // :1893
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1894
        era.set(`cflag:${target}:311`, 4); // :1894
        // 屈服刻印Lv3 // :1895
      } else if (MARK:2 == 3 && (CFLAG:311 <= 2 || FLAG:7 == 2)) { // :1896
        await era.printAndWait(`「啊~…哈呜嗯~…啊啊呜~…哪怕想要逃开也好…腰、腰部，腰部却自己就~♪」`); // :1897
        await era.printAndWait(`「哈呜啊啊~…是、是的…${sc()}会忍住的…啊~啊啊啊～！」`); // :1898
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1899
        era.set(`cflag:${target}:311`, 3); // :1899
        // それ以外 // :1900
      } else if (CFLAG:311 <= 1 || FLAG:7 == 2) { // :1901
        await era.printAndWait(`「这，这样的…只是哔哩哔哩地…一点也…哈啊~…啊啊~…嗯嗯~！」`); // :1902
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1903
        era.set(`cflag:${target}:311`, 2); // :1903
      } // :1904
      return 0; // :1905
    } // :1906
  } // :1907

  // ------------------------------------------------- // :1909
  // 壶虫 CFLAG:312　CFLAG:372 // :1910
  // ------------------------------------------------- // :1911
  // 開始時 // :1912
  if (SELECTCOM == 11 && TEQUIP:11) { // :1913
    // 初めて // :1914
    if (CFLAG:TARGET:312 == 0) { // :1915
      // 处女 // :1916
      if (TALENT:0 == 1) { // :1917
        // 淫乱 // :1918
        if (TALENT:76 == 1) { // :1919
          await era.printAndWait(`「啊啊啊~…好棒…的啊~…用那个丑恶的蠕虫…将${sc()}的处女给夺走对吧~…${heart(1)}」`); // :1920
          await era.printAndWait(`「如果主人那么觉得这样好的话…那就这样做吧~………♪」`); // :1921
          await era.printAndWait(`「所以…嗯~…嗯呜！！？啊…啊啊…嗯呜…呜呜呜呜呜~！」`); // :1922
          await era.printAndWait(`${master_name}打断了${target_name}的话语直接将阴道虫强行塞了进去………`); // :1923
          // 爱慕 // :1924
        } else if (TALENT:85 == 1) { // :1925
          await era.printAndWait(`「啊哈呜嗯~…不行啊…不行…只有这个…哈啊…啊~！」`); // :1926
          await era.printAndWait(`${master_name}毫不留情地将阴道虫往${target_name}的深处塞了进去。`); // :1927
          await era.printAndWait(`「嗯呜…哈呜…啊啊~…啊~啊啊啊啊啊啊啊啊啊啊啊！！！」`); // :1928
          await era.printAndWait(`被丑恶到极致的蠕虫给夺走处女的${target_name}只在不停地留着眼泪………`); // :1929
          // それ以外 // :1930
        } else { // :1931
          await era.printAndWait(`「呜嗯…呜…哈啊…哈啊…被这种东西…${sc()}的第一次给…………」`); // :1932
        } // :1933
        // 非处女 // :1934
      } else { // :1935
        // 淫乱 // :1936
        if (TALENT:76 == 1) { // :1937
          await era.printAndWait(`「嗯呜~…怎么会这样…一下就到里面去了呜呜呜呜呜呜呜${heart(1)}」`); // :1938
          await era.printAndWait(`${target_name}的深处进去了一只阴道虫后身体就不停得颤抖着………`); // :1939
          // 爱慕 // :1940
        } else if (TALENT:85 == 1) { // :1941
          await era.printAndWait(`「啊啊~…居然还有这样得东西…嗯呜~…不，不行的啊♪不能在里面动…哈呜嗯♪啊呜呜呜♪」`); // :1942
          await era.printAndWait(`喜欢恶作剧的阴道虫在${target_name}的蜜穴里面激烈地蠕动着来回钻着………`); // :1943
          // それ以外 // :1944
        } else { // :1945
          await era.printAndWait(`「不，不要…好恶心…不要嗯呜啊啊…啊啊呜…在里面动着啊啊啊…啊啊~！」`); // :1946
        } // :1947
      } // :1948
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1949
      era.set(`cflag:${target}:312`, 1); // :1949
      return 0; // :1950
      // 二回目以降 // :1951
    } else { // :1952
      // 淫乱 // :1953
      if (TALENT:TARGET:76 == 1 && (CFLAG:312 <= 4 || FLAG:7 == 2)) { // :1954
        await era.printAndWait(`「唔啊啊~…蠕虫先生在…${sc()}的小穴的深处…噢~…哦吼~${heart(1)}」`); // :1955
        await era.printAndWait(`「在和子宫口…亲吻着呢…噢噢${heart(1)} 啊啊~…嗯哼~${heart(1)}」`); // :1956
        await era.printAndWait(`${target_name}因为阴道虫进到了深处而漏出了满足的呻吟………`); // :1957
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1958
        era.set(`cflag:${target}:312`, 5); // :1958
        // 爱慕 // :1959
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:312 <= 3 || FLAG:7 == 2)) { // :1960
        await era.printAndWait(`「啊~…真是…比起这种东西…还是大人您的大鸡巴比较好呢…啊嗯~♪」`); // :1961
        await era.printAndWait(`「啊啊~…不行…在里面动不行啊…啊啊~…魔王大人坏心眼~………${heart(1)}」`); // :1962
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1963
        era.set(`cflag:${target}:312`, 4); // :1963
        // V感覚Lv3以上 // :1964
      } else if (ABL:2 >= 3 && (CFLAG:312 <= 2 || FLAG:7 == 2)) { // :1965
        await era.printAndWait(`「嗯~…哈啊啊…被这种…下等的蠕虫给…将${sc()}的身体给…啊啊~哼嗯~♪」`); // :1966
        await era.printAndWait(`「才、才不是呢…感觉舒服什么…啊呜呀啊啊~${heart(1)}」`); // :1967
        await era.printAndWait(`每当阴道虫在腔内闹腾起来的时候${target_name}便漏出了可爱的声音………`); // :1968
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1969
        era.set(`cflag:${target}:312`, 3); // :1969
        // それ以外 // :1970
      } else if (CFLAG:312 <= 1 || FLAG:7 == 2) { // :1971
        await era.printAndWait(`「不、不要啊…请不要再…这样欺负${sc()}的…那里了…嗯哈呜~嗯呜~不行啊哎~！不能在里面动哎！」`); // :1972
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1973
        era.set(`cflag:${target}:312`, 2); // :1973
      } // :1974
      return 0; // :1975
    } // :1976
    // 脱着時 // :1977
  } else if (SELECTCOM == 11 && TEQUIP:11 == 0) { // :1978
    // 淫乱 // :1979
    if (TALENT:TARGET:76 == 1 && (CFLAG:372 < 3 || FLAG:7 == 2)) { // :1980
      await era.printAndWait(`「啊哈啊…阴道的穴被…被扩地那么大了呀…${heart(1)}」`); // :1981
      await era.printAndWait(`「下次会放什么东西进去呐~？」`); // :1982
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1983
      era.set(`cflag:${target}:372`, 3); // :1983
      // 爱慕 // :1984
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:372 < 2 || FLAG:7 == 2)) { // :1985
      await era.printAndWait(`「哈啊啊…小穴变得寂寞起来了呀………」`); // :1986
      await era.printAndWait(`「会给代替的东西吧~…嗯哼哼哼~${heart(1)}」`); // :1987
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1988
      era.set(`cflag:${target}:372`, 2); // :1988
      // それ以外 // :1989
    } else if (CFLAG:372 < 1 || FLAG:7 == 2) { // :1990
      await era.printAndWait(`「呜啊…啊啊………哈啊…哈啊…哈啊…」`); // :1991
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1992
      era.set(`cflag:${target}:372`, 1); // :1992
    } // :1993
    return 0; // :1994
  } // :1995



  // ------------------------------------------------- // :1999
  // 振动杖 CFLAG:313 // :2000
  // ------------------------------------------------- // :2001
  if (SELECTCOM == 12) { // :2002
    // 初めて // :2003
    if (CFLAG:313 == 0) { // :2004
      // 淫乱 // :2005
      if (TALENT:76 == 1) { // :2006
        await era.printAndWait(`「等，等下…难、难道…要将那个振动着的棒…塞到${sc()}的…呜嗯~、果、果然是这样嘛~………♪」`); // :2007
        await era.printAndWait(`「啊~…啊~…嗯~…哼呜~…嗯~…啊啊、这、这个…好棒呀~…${heart(1)}」`); // :2008
        await era.printAndWait(`「…哼啊啊啊~！？不、不行了~~、突、突然变强什么的不行呜呜呜~！？」`); // :2009
        // 爱慕 // :2010
      } else if (TALENT:85 == 1) { // :2011
        await era.printAndWait(`「啊嗯~…哈呀嗯呜~！？啊啊~…请不要用这种...东西...来欺负${sc()}吧………」`); // :2012
        await era.printAndWait(`${player_name}往${target_name}的胸部还有脚放上了振动之杖，享受着${target_name}的反应。`); // :2013
        await era.printAndWait(`「啊~…嗯呜~…这、这样的事情已经…啊啊~！」`); // :2014
        await era.printAndWait(`振动之杖直接塞到了${target_name}蜜穴里面开始强烈震动起来。`); // :2015
        await era.printAndWait(`「哈啊呜~！嗯呀啊啊！？不、不行了~~…不要…呜呀~呜嗯~呜嗯~呜呀啊啊啊啊！？！？」`); // :2016
        // それ以外 // :2017
      } else { // :2018
        await era.printAndWait(`「呀呜呜嗯~…不、不要再压下去…不、不行嗯~~…！」`); // :2019
      } // :2020
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :2021
      era.set(`cflag:${target}:313`, 1); // :2021
      return 0; // :2022
      // 二回目以降 // :2023
    } else { // :2024
      // 淫乱 // :2025
      if (TALENT:76 == 1 && (CFLAG:313 <= 4 || FLAG:7 == 2)) { // :2026
        await era.printAndWait(`「啊~啊哈啊~…嗯~…嗯呜呜呜~${heart(1)}」`); // :2027
        await era.printAndWait(`「果然${sc()}的身体…被那么强烈的刺激了的话${heart(1)} 啊~${heart(1)} 啊啊~${heart(1)}」`); // :2028
        await era.printAndWait(`「就会变得更加舒服起来了啊啊~~~${heart(3)}…请更加地…欺负${sc()}吧${heart(5)}」`); // :2029
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :2030
        era.set(`cflag:${target}:313`, 5); // :2030
        // 爱慕 // :2031
      } else if (TALENT:85 == 1 && (CFLAG:313 <= 3 || FLAG:7 == 2)) { // :2032
        await era.printAndWait(`「啊啊~…哈啊~…啊~…嗯~…请不要…那么地欺负${sc()}吧…哼嗯~…呼啊啊啊~！？」`); // :2033
        await era.printAndWait(`${target_name}的身体被振动之杖给予的快乐而颤抖着。`); // :2034
        await era.printAndWait(`「啊啊啊~${heart(1)} 不行…不行的啊…真的是…啊~啊啊啊~${heart(3)}」`); // :2035
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :2036
        era.set(`cflag:${target}:313`, 4); // :2036
        // 屈服刻印Lv3 // :2037
      } else if (MARK:2 == 3 && (CFLAG:313 <= 2 || FLAG:7 == 2)) { // :2038
        await era.printAndWait(`「哈呜~…拜托了…请不要再这样...啊~…${sc()}…真的要…啊啊~哈呜啊啊~…嗯~${heart(1)}」`); // :2039
        await era.printAndWait(`「不要啊啊啊啊…震动不行…不行的啦~~………${heart(1)}」`); // :2040
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :2041
        era.set(`cflag:${target}:313`, 3); // :2041
        // それ以外 // :2042
      } else if (CFLAG:313 <= 1 || FLAG:7 == 2) { // :2043
        await era.printAndWait(`「哈嗯呜~…原，原谅${sc()}…那、那个…压下去的话…就会变奇怪起来了…啊啊~哈嗯呜啊啊~！」`); // :2044
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :2045
        era.set(`cflag:${target}:313`, 2); // :2045
      } // :2046
      return 0; // :2047
    } // :2048
  } // :2049

  // ------------------------------------------------- // :2051
  // 肛门虫 CFLAG:314　CFLAG:374 // :2052
  // ------------------------------------------------- // :2053
  // 開始時 // :2054
  if (SELECTCOM == 13 && TEQUIP:13) { // :2055
    // 初めて // :2056
    if (CFLAG:TARGET:314 == 0) { // :2057
      // 淫乱 // :2058
      if (TALENT:TARGET:76 == 1) { // :2059
        await era.printAndWait(`「啊啊啊~…肛穴在…被侵犯着呢~~…${heart(1)}」`); // :2060
        await era.printAndWait(`「请让可爱的蠕虫酱…将${sc()}的肛穴弄得更加舒服起来吧~~${heart(3)}」`); // :2061
        // 爱慕 // :2062
      } else if (TALENT:TARGET:85 == 1) { // :2063
        await era.printAndWait(`「啊啊…${sc()}的屁股…再被扩大着啊…啊嗯~…嗯啊啊啊~！」`); // :2064
        await era.printAndWait(`「啊~哈啊~啊嗯~！…请、请不要这样欺负那里啊~………」`); // :2065
        // それ以外 // :2066
      } else { // :2067
        await era.printAndWait(`「不，不要…屁股在被…啊啊~…好奇怪感觉~…要变奇怪了啊~………」`); // :2068
      } // :2069
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :2070
      era.set(`cflag:${target}:TARGET:314`, 1); // :2070
      return 0; // :2071
      // 二回目以降 // :2072
    } else { // :2073
      // 淫乱＋A感覚Lv3以上 // :2074
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:314 <= 6 || FLAG:7 == 2)) { // :2075
        await era.printAndWait(`「嗯哦啊啊~${heart(5)}」`); // :2076
        await era.printAndWait(`「啊哼嗯~…啊啊~肛穴…肛穴好棒呀~~噢噢~${heart(1)}」`); // :2077
        await era.printAndWait(`「被下等的蠕虫给挖着肛穴…脑袋好像要变奇怪了啊呜呜~~${heart(3)}」`); // :2078
        // CFLAG:314  = 7（变量语义：CFLAG 族，314） // :2079
        era.set(`cflag:${target}:314`, 7); // :2079
        // 淫乱 // :2080
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:314 <= 5 || FLAG:7 == 2)) { // :2081
        await era.printAndWait(`「嗯哼唔~…肛穴里蠕虫酱完全钻进去了~~…${heart(1)}」`); // :2082
        await era.printAndWait(`「哼啊啊啊啊~…在里面…活蹦乱跳着呢~…${heart(1)}」`); // :2083
        await era.printAndWait(`「主人~…${sc()}已经…不行…肛、肛穴要变得不行了啊！」`); // :2084
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :2085
        era.set(`cflag:${target}:314`, 6); // :2085
        // 爱＋A感覚Lv3以上 // :2086
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:314 <= 4 || FLAG:7 == 2)) { // :2087
        await era.printAndWait(`「哈啊~…嗯~…嗯哼~…不行~…魔王大人…请不要看着那里~………」`); // :2088
        await era.printAndWait(`「不干净的洞…变得那么舒服的样子被看到了的话…${sc()}会羞耻地要死掉了…」`); // :2089
        await era.printAndWait(`${target_name}的肛穴的深处里正塞进一只肛门虫，而这只肛门虫则复杂地蠕动着自己得身躯。`); // :2090
        await era.printAndWait(`「哈嗯呜~~♪不、不行~…屁股…哼啊啊啊~要变奇怪了啊~~~！」`); // :2091
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :2092
        era.set(`cflag:${target}:314`, 5); // :2092
        // 爱慕 // :2093
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:314 <= 3 || FLAG:7 == 2)) { // :2094
        await era.printAndWait(`「啊啊~…蠕虫…嗯呜~…在屁股得小穴里…啊啊~…蠕动着…哈呜」`); // :2095
        await era.printAndWait(`钻进${target_name}的肛穴深处的肛门虫正在复杂地蠕动着。`); // :2096
        await era.printAndWait(`「哈呀啊啊啊！？…这样得…感觉到…要感觉到啦…哈呜嗯~${heart(1)}」`); // :2097
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :2098
        era.set(`cflag:${target}:314`, 4); // :2098
        // A感覚Lv3以上 // :2099
      } else if (ABL:3 >= 3 && (CFLAG:314 <= 2 || FLAG:7 == 2)) { // :2100
        await era.printAndWait(`「哦、哦哈啊~♪…肮脏的洞里…居然变得那么舒服起来了…啊啊~哼啊啊嗯~♪」`); // :2101
        await era.printAndWait(`「这、这肯定魔王的原因来的…这肯定是魔王施展的魔法${sc()}才会变成这样的…」`); // :2102
        await era.printAndWait(`「哼唔…原谅…原谅那里吧…屁股的洞再这样下去的话要不行了啊啊啊啊！」`); // :2103
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :2104
        era.set(`cflag:${target}:314`, 3); // :2104
        // それ以外 // :2105
      } else if (CFLAG:314 <= 1 || FLAG:7 == 2) { // :2106
        await era.printAndWait(`「啊哈啊…唔呜呜…呜呜~…这…样的…的事情…绝对不会原谅…的啊…啊啊~！」`); // :2107
        await era.printAndWait(`在${target_name}的深处肛门虫正在欢喜地蠕动中、凌辱着${target_name}的肛门………`); // :2108
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :2109
        era.set(`cflag:${target}:314`, 2); // :2109
      } // :2110
      return 0; // :2111
    } // :2112
    // 脱着時 // :2113
  } else if (SELECTCOM == 13 && TEQUIP:13 == 0) { // :2114
    // 淫乱 // :2115
    if (TALENT:TARGET:76 == 1 && (CFLAG:374 < 4 || FLAG:7 == 2)) { // :2116
      await era.printAndWait(`「嗯哈啊啊~～………${heart(1)}」`); // :2117
      await era.printAndWait(`${target_name}发出了不满的叹息。`); // :2118
      await era.printAndWait(`「${sc()}的肛穴…就这样变得空荡荡的了~………唔哼哼~${heart(1)}」`); // :2119
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :2120
      era.set(`cflag:${target}:374`, 4); // :2120
      // 爱慕 // :2121
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:374 < 3 || FLAG:7 == 2)) { // :2122
      await era.printAndWait(`「哈啊…哈啊…啊啊~…屁股的洞居然…那么…舒服………」`); // :2123
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :2124
      era.set(`cflag:${target}:374`, 3); // :2124
      // A感覚Lv3以上 // :2125
    } else if (ABL:3 >= 3 && (CFLAG:374 < 2 || FLAG:7 == 2)) { // :2126
      await era.printAndWait(`「啊哈嗯~…更、更多~………♪」`); // :2127
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :2128
      era.set(`cflag:${target}:374`, 2); // :2128
      // それ以外 // :2129
    } else if (CFLAG:374 < 1 || FLAG:7 == 2) { // :2130
      await era.printAndWait(`「啊啊…好、好难受…来的………」`); // :2131
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :2132
      era.set(`cflag:${target}:374`, 1); // :2132
    } // :2133
    return 0; // :2134
  } // :2135

  // ------------------------------------------------- // :2137
  // 阴蒂夹 CFLAG:315　CFLAG:375 // :2138
  // ------------------------------------------------- // :2139
  // 開始時 // :2140
  if (SELECTCOM == 14 && TEQUIP:14) { // :2141
    // 初めて // :2142
    if (CFLAG:315 == 0) { // :2143
      // 淫乱 // :2144
      if (TALENT:76 == 1) { // :2145
        await era.printAndWait(`「哈嗯呜~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊~${heart(1)}」`); // :2146
        // 爱慕 // :2147
      } else if (TALENT:85 == 1) { // :2148
        await era.printAndWait(`「哈嗯呜~！…不，不行的啊…那里被吸得那么紧的话…啊啊~！」`); // :2149
        // それ以外 // :2150
      } else { // :2151
        await era.printAndWait(`「以为用这种东西…就能将${sc()}怎么样了吗…哈啊啊呜~！？吸、吸地那么紧…呜唔~」`); // :2152
      } // :2153
      // CFLAG:315  = 1（变量语义：CFLAG 族，315） // :2154
      era.set(`cflag:${target}:315`, 1); // :2154
      return 0; // :2155
      // 二回目以降 // :2156
    } else { // :2157
      // 淫乱 // :2158
      if (TALENT:76 == 1 && (CFLAG:315 <= 3 || FLAG:7 == 2)) { // :2159
        await era.printAndWait(`「哈嗯呜~…用、用这种阴蒂夹将阴蒂酱夹住什么的…要变奇怪了啊~${heart(1)}」`); // :2160
        await era.printAndWait(`「啊啊…请更加地…欺负淫乱的阴蒂酱吧~${heart(1)}」`); // :2161
        // CFLAG:315  = 4（变量语义：CFLAG 族，315） // :2162
        era.set(`cflag:${target}:315`, 4); // :2162
        // 爱慕 // :2163
      } else if (TALENT:85 == 1 && (CFLAG:315 <= 2 || FLAG:7 == 2)) { // :2164
        await era.printAndWait(`「哈嗯~！…不、不行的啊~…那里被吸得那么紧的话…啊啊~！」`); // :2165
        await era.printAndWait(`「啊啊~…脑袋要变奇怪了啊~…♪」`); // :2166
        // CFLAG:315  = 3（变量语义：CFLAG 族，315） // :2167
        era.set(`cflag:${target}:315`, 3); // :2167
        // それ以外 // :2168
      } else if (CFLAG:315 <= 1 || FLAG:7 == 2) { // :2169
        await era.printAndWait(`「哈嗯呜~…不、不行~…振动…不行…的啊………」`); // :2170
        // CFLAG:315  = 2（变量语义：CFLAG 族，315） // :2171
        era.set(`cflag:${target}:315`, 2); // :2171
      } // :2172
      return 0; // :2173
    } // :2174
    // 脱着時 // :2175
  } else if (SELECTCOM == 14 && TEQUIP:14 == 0) { // :2176
    // 淫乱 // :2177
    if (TALENT:TARGET:76 == 1 && (CFLAG:375 < 3 || FLAG:7 == 2)) { // :2178
      await era.printAndWait(`「啊啊~…还没有满足呢~…这次就用主人的手来~………${heart(1)}」`); // :2179
      // CFLAG:375  = 3（变量语义：CFLAG 族，375） // :2180
      era.set(`cflag:${target}:375`, 3); // :2180
      // 爱慕 // :2181
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:375 < 2 || FLAG:7 == 2)) { // :2182
      await era.printAndWait(`「啊啊…${sc()}...可能已经不行了…♪」`); // :2183
      // CFLAG:375  = 2（变量语义：CFLAG 族，375） // :2184
      era.set(`cflag:${target}:375`, 2); // :2184
      // それ以外 // :2185
    } else if (CFLAG:375 < 1 || FLAG:7 == 2) { // :2186
      await era.printAndWait(`「哈啊…哈啊…终于…拿掉了………」`); // :2187
      // CFLAG:375  = 1（变量语义：CFLAG 族，375） // :2188
      era.set(`cflag:${target}:375`, 1); // :2188
    } // :2189
    return 0; // :2190
  } // :2191


  // ------------------------------------------------- // :2194
  // ニプルキャップ CFLAG:316　CFLAG:376 // :2195
  // ------------------------------------------------- // :2196
  // 開始時 // :2197
  if (SELECTCOM == 15 && TEQUIP:15) { // :2198
    // 初めて // :2199
    if (CFLAG:316 == 0) { // :2200
      // 淫乱 // :2201
      if (TALENT:76 == 1) { // :2202
        await era.printAndWait(`「啊啊~…请将乳头…更加尽情地~…${heart(1)}」`); // :2203
        // 愛 // :2204
      } else if (TALENT:85 == 1) { // :2205
        await era.printAndWait(`「哈呜~…！请不要欺负乳头~…${heart(1)}」`); // :2206
        // それ以外 // :2207
      } else { // :2208
        await era.printAndWait(`「哈呜呜~…这样的…不行！」`); // :2209
        await era.printAndWait(`「乳，乳头…肿起来了啊…啊啊~！」`); // :2210
      } // :2211
      // CFLAG:316  = 1（变量语义：CFLAG 族，316） // :2212
      era.set(`cflag:${target}:316`, 1); // :2212
      return 0; // :2213
      // 二回目以降 // :2214
    } else { // :2215
      // 淫乱 // :2216
      if (TALENT:76 == 1 && (CFLAG:316 <= 3 || FLAG:7 == 2)) { // :2217
        await era.printAndWait(`「啊啊~…请将乳头…更加尽情地~…${heart(1)}」`); // :2218
        await era.printAndWait(`「哈啊啊…乳头…好舒服啊啊~…${heart(1)}」`); // :2219
        // CFLAG:316  = 4（变量语义：CFLAG 族，316） // :2220
        era.set(`cflag:${target}:316`, 4); // :2220
        // 愛 // :2221
      } else if (TALENT:85 == 1 && (CFLAG:316 <= 2 || FLAG:7 == 2)) { // :2222
        await era.printAndWait(`「哈呜嗯~…！请不要欺负乳头~…${heart(1)}」`); // :2223
        await era.printAndWait(`「胸部…一抽一抽地~…不行…要变得不行了呜~~${heart(1)}」`); // :2224
        // CFLAG:316  = 3（变量语义：CFLAG 族，316） // :2225
        era.set(`cflag:${target}:316`, 3); // :2225
        // それ以外 // :2226
      } else if (CFLAG:316 <= 1 || FLAG:7 == 2) { // :2227
        await era.printAndWait(`「明，明明说了…不行来的…嗯~嗯嗯~…啊啊啊~！」`); // :2228
        // CFLAG:316  = 2（变量语义：CFLAG 族，316） // :2229
        era.set(`cflag:${target}:316`, 2); // :2229
      } // :2230
      return 0; // :2231
    } // :2232
    // 脱着時 // :2233
  } else if (SELECTCOM == 15 && TEQUIP:15 == 0) { // :2234
    // 淫乱 // :2235
    if (TALENT:TARGET:76 == 1 && (CFLAG:376 < 3 || FLAG:7 == 2)) { // :2236
      await era.printAndWait(`「哈啊啊啊~…乳头居然变成那么不像样子了…${heart(1)}」`); // :2237
      // CFLAG:376  = 3（变量语义：CFLAG 族，376） // :2238
      era.set(`cflag:${target}:376`, 3); // :2238
      // 愛 // :2239
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:376 < 2 || FLAG:7 == 2)) { // :2240
      await era.printAndWait(`「哈啊…哈啊…哈嗯…胸部好难受的啊…♪」`); // :2241
      // CFLAG:376  = 2（变量语义：CFLAG 族，376） // :2242
      era.set(`cflag:${target}:376`, 2); // :2242
      // それ以外 // :2243
    } else if (CFLAG:376 < 1 || FLAG:7 == 2) { // :2244
      await era.printAndWait(`「哈啊…哈啊…乳头…好奇怪啊………」`); // :2245
      // CFLAG:376  = 1（变量语义：CFLAG 族，376） // :2246
      era.set(`cflag:${target}:376`, 1); // :2246
    } // :2247
    return 0; // :2248
  } // :2249


  // ------------------------------------------------- // :2252
  // 榨乳器(母乳体质のみ) CFLAG:317　CFLAG:377 // :2253
  // ------------------------------------------------- // :2254
  // 開始時 // :2255
  if (SELECTCOM == 16 && TEQUIP:16) { // :2256
    // 初めて // :2257
    if (CFLAG:317 == 0) { // :2258
      // 淫乱 // :2259
      if (TALENT:76 == 1) { // :2260
        await era.printAndWait(`「啊啊嗯~…啊~啊啊…奶居然…出来那么多了呀~${heart(1)}」`); // :2261
        await era.printAndWait(`${target_name}的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………`); // :2262
        // 愛 // :2263
      } else if (TALENT:85 == 1) { // :2264
        await era.printAndWait(`「嗯~…啊啊~…居然出来那么多什么的…真是奇怪呢…啊嗯~${heart(1)}」`); // :2265
        await era.printAndWait(`从${target_name}的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………`); // :2266
        // それ以外 // :2267
      } else { // :2268
        await era.printAndWait(`「不要啊…母乳应该给小宝宝喝的呀…啊~…啊啊啊~………」`); // :2269
        await era.printAndWait(`从${target_name}的乳头渗出了母乳、一点一点地将奶罐给装满了………`); // :2270
      } // :2271
      // CFLAG:317  = 1（变量语义：CFLAG 族，317） // :2272
      era.set(`cflag:${target}:317`, 1); // :2272
      return 0; // :2273
      // 二回目以降 // :2274
    } else { // :2275
      // 淫乱 // :2276
      if (TALENT:76 == 1 && (CFLAG:317 <= 3 || FLAG:7 == 2)) { // :2277
        await era.printAndWait(`「嗯哈呜~…哈嗯呜~…从胸部射出来居然会那么舒服…不管怀孕多少次都没关系了啦~${heart(1)}」`); // :2278
        await era.printAndWait(`${target_name}的乳头如同射精一样不停地将母乳射出来、很快就将奶罐给装满了………`); // :2279
        // CFLAG:317  = 4（变量语义：CFLAG 族，317） // :2280
        era.set(`cflag:${target}:317`, 4); // :2280
        // 愛 // :2281
      } else if (TALENT:85 == 1 && (CFLAG:317 <= 2 || FLAG:7 == 2)) { // :2282
        await era.printAndWait(`「胸部出来好多了啊~…啊~啊啊~…要出来了啊啊~…${heart(1)}」`); // :2283
        await era.printAndWait(`${target_name}的乳头渗出了浓厚的母乳、一点一点地将奶罐给装满了………`); // :2284
        // CFLAG:317  = 3（变量语义：CFLAG 族，317） // :2285
        era.set(`cflag:${target}:317`, 3); // :2285
        // それ以外 // :2286
      } else if (CFLAG:317 <= 1 || FLAG:7 == 2) { // :2287
        await era.printAndWait(`「不要啊…母乳应该给小宝宝喝的呀…啊~…啊啊啊~………」`); // :2288
        await era.printAndWait(`${target_name}的乳头渗出了母乳、一点一点地将奶罐给装满了………`); // :2289
        // CFLAG:317  = 2（变量语义：CFLAG 族，317） // :2290
        era.set(`cflag:${target}:317`, 2); // :2290
      } // :2291
      return 0; // :2292
    } // :2293
    // 脱着時 // :2294
  } else if (SELECTCOM == 16 && TEQUIP:16 == 0) { // :2295
    // 淫乱 // :2296
    if (TALENT:TARGET:76 == 1 && (CFLAG:377 < 3 || FLAG:7 == 2)) { // :2297
      await era.printAndWait(`「啊啊嗯~…只要一点点也就够了请让${target_name}喝一口吧…♪」`); // :2298
      // CFLAG:377  = 3（变量语义：CFLAG 族，377） // :2299
      era.set(`cflag:${target}:377`, 3); // :2299
      // 愛 // :2300
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:377 < 2 || FLAG:7 == 2)) { // :2301
      await era.printAndWait(`「哈啊哈啊…只喝一口也没有关系，请大人您尝一尝吧~…♪」`); // :2302
      // CFLAG:377  = 2（变量语义：CFLAG 族，377） // :2303
      era.set(`cflag:${target}:377`, 2); // :2303
      // それ以外 // :2304
    } else if (CFLAG:377 < 1 || FLAG:7 == 2) { // :2305
      await era.printAndWait(`「啊啊…居然出来…那么多的母乳了………」`); // :2306
      // CFLAG:377  = 1（变量语义：CFLAG 族，377） // :2307
      era.set(`cflag:${target}:377`, 1); // :2307
    } // :2308
    return 0; // :2309
  } // :2310


  // ------------------------------------------------- // :2313
  // 飞机杯(扶她/男人のみ) CFLAG:318　CFLAG:378 // :2314
  // ------------------------------------------------- // :2315
  // 開始時 // :2316
  // IF SELECTCOM == 17 && TEQUIP:17 // :2317
  // 初めて // :2318
  // 	IF CFLAG:318 == 0 // :2319
  // 淫乱 // :2320
  // 		IF TALENT:76 == 1 // :2321
  // 			PRINTFORMW // :2322
  // 爱慕 // :2323
  // 		ELSEIF TALENT:85 == 1 // :2324
  // 			PRINTFORMW // :2325
  // それ以外 // :2326
  // 		ELSE // :2327
  // 			PRINTFORMW // :2328
  // 		ENDIF // :2329
  // 		CFLAG:318 = 1 // :2330
  // 		RETURN 0 // :2331
  // 二回目以降 // :2332
  // 	ELSE // :2333
  // 淫乱 // :2334
  // 		IF TALENT:76 == 1 && (CFLAG:318 <= 3 || FLAG:7 == 2) // :2335
  // 			PRINTFORMW // :2336
  // 			CFLAG:318 = 4 // :2337
  // 爱慕 // :2338
  // 		ELSEIF TALENT:85 == 1 && (CFLAG:318 <= 2 || FLAG:7 == 2) // :2339
  // 			PRINTFORMW // :2340
  // 			CFLAG:318 = 3 // :2341
  // それ以外 // :2342
  // 		ELSEIF CFLAG:318 <= 1 || FLAG:7 == 2 // :2343
  // 			PRINTFORMW // :2344
  // 			CFLAG:318 = 2 // :2345
  // 		ENDIF // :2346
  // 		RETURN 0 // :2347
  // 	ENDIF // :2348
  // 終了時 // :2349
  // ELSEIF SELECTCOM == 17 && TEQUIP:17 == 0 // :2350
  // 淫乱 // :2351
  // 	IF TALENT:TARGET:76 == 1 && (CFLAG:378 < 3 || FLAG:7 == 2) // :2352
  // 		PRINTFORMW // :2353
  // 		CFLAG:378 = 3 // :2354
  // 爱慕 // :2355
  // 	ELSEIF TALENT:TARGET:85 == 1 && (CFLAG:378 < 2 || FLAG:7 == 2) // :2356
  // 		PRINTFORMW // :2357
  // 		CFLAG:378 = 2 // :2358
  // それ以外 // :2359
  // 	ELSEIF CFLAG:378 < 1 || FLAG:7 == 2 // :2360
  // 		PRINTFORMW // :2361
  // 		CFLAG:378 = 1 // :2362
  // 	ENDIF // :2363
  // 	RETURN 0 // :2364
  // ENDIF // :2365


  // ------------------------------------------------- // :2368
  // 肛珠 CFLAG:320　CFLAG:379 // :2369
  // ------------------------------------------------- // :2370
  // 開始時 // :2371
  if (SELECTCOM == 19 && TEQUIP:19) { // :2372
    // 初めて // :2373
    if (CFLAG:TARGET:320 == 0) { // :2374
      // 淫乱 // :2375
      if (TALENT:TARGET:76 == 1) { // :2376
        await era.printAndWait(`「嗯哈噢噢噢~…${heart(1)}」`); // :2377
        await era.printAndWait(`「小球…进去了…啊啊~…嗯哈啊啊~…${heart(1)}」`); // :2378
        // 愛 // :2379
      } else if (TALENT:TARGET:85 == 1) { // :2380
        await era.printAndWait(`「啊啊~…又要欺负屁股了对吧~…嗯~…呼哈~…啊啊~${heart(1)}」`); // :2381
        // それ以外 // :2382
      } else { // :2383
        await era.printAndWait(`「哈呜~…屁股的洞洞里…塞进这种东西是不…啊啊~呀啊啊啊~！」`); // :2384
      } // :2385
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :2386
      era.set(`cflag:${target}:TARGET:320`, 1); // :2386
      return 0; // :2387
      // 二回目以降 // :2388
    } else { // :2389
      // 淫乱＋A感覚Lv3以上 // :2390
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:320 <= 6 || FLAG:7 == 2)) { // :2391
        await era.printAndWait(`「啊嗯~…嗯哈嗯~${heart(1)}」`); // :2392
        await era.printAndWait(`「往肛穴里…塞进了好多小球了呀~${heart(1)}」`); // :2393
        await era.printAndWait(`「在里面…转来转去地动呢~…哈啊啊~${heart(1)} ${sc()}的屁股好像要不行了呀啊啊~${heart(1)}」`); // :2394
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :2395
        era.set(`cflag:${target}:320`, 7); // :2395
        // 淫乱 // :2396
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:320 <= 5 || FLAG:7 == 2)) { // :2397
        await era.printAndWait(`「小球…进去了~…啊啊~…嗯哈啊啊~…${heart(1)}」`); // :2398
        await era.printAndWait(`「啊啊~…在肛穴里面转来转去呢~…哈啊啊~…${heart(1)}」`); // :2399
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :2400
        era.set(`cflag:${target}:320`, 6); // :2400
        // 愛＋A感覚Lv3以上 // :2401
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:320 <= 4 || FLAG:7 == 2)) { // :2402
        await era.printAndWait(`「啊啊~…屁股被欺负居然那么有感觉什么的~…♪」`); // :2403
        await era.printAndWait(`「魔王大人~…虽然是这种喜欢被欺负肛穴无可救药的变态来的…但也请让${target_name}呆在您的身旁吧~${heart(1)}」`); // :2404
        await era.printAndWait(`${target_name}摇晃着拉珠从肛穴露出的那一部分${master_name}撒起了娇………`); // :2405
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :2406
        era.set(`cflag:${target}:320`, 5); // :2406
        // 爱慕 // :2407
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:320 <= 3 || FLAG:7 == 2)) { // :2408
        await era.printAndWait(`「啊啊~…又要欺负屁股了对吧~…嗯~…哈啊~…啊啊~${heart(1)}」`); // :2409
        await era.printAndWait(`「好过分…的说…这么欺负屁股的话…啊嗯~♪」`); // :2410
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :2411
        era.set(`cflag:${target}:320`, 4); // :2411
        // A感覚Lv3以上 // :2412
      } else if (ABL:3 >= 3 && (CFLAG:320 <= 2 || FLAG:7 == 2)) { // :2413
        await era.printAndWait(`「哼嗯呜~…怎么能这样…啊啊~…肚子的里面…已经变得一抽一抽的了呀~…♪」`); // :2414
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :2415
        era.set(`cflag:${target}:320`, 3); // :2415
        // それ以外 // :2416
      } else if (CFLAG:320 <= 1 || FLAG:7 == 2) { // :2417
        await era.printAndWait(`「好难、好难受啊…肚子的里面…好难受啊啊…………」`); // :2418
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :2419
        era.set(`cflag:${target}:320`, 2); // :2419
      } // :2420
      return 0; // :2421
    } // :2422
    // 脱着時 // :2423
  } else if (SELECTCOM == 19 && TEQUIP:19 == 0) { // :2424
    // 淫乱 // :2425
    if (TALENT:TARGET:76 == 1 && (CFLAG:379 < 4 || FLAG:7 == 2)) { // :2426
      await era.printAndWait(`「哈啊恩~…肛穴…好像往外翻了………${heart(3)}」`); // :2427
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :2428
      era.set(`cflag:${target}:379`, 4); // :2428
      // 愛 // :2429
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:379 < 3 || FLAG:7 == 2)) { // :2430
      await era.printAndWait(`「哈呜呀啊啊~……♪　请更加地…欺负屁股吧~${heart(1)}」`); // :2431
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :2432
      era.set(`cflag:${target}:379`, 3); // :2432
      // A感覚Lv3以上 // :2433
    } else if (ABL:3 >= 3 && (CFLAG:379 < 2 || FLAG:7 == 2)) { // :2434
      await era.printAndWait(`「嗯哼唔~…不行~…屁股被欺负的话…就要变得不行了啊~…」`); // :2435
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :2436
      era.set(`cflag:${target}:379`, 2); // :2436
      // それ以外 // :2437
    } else if (CFLAG:379 < 1 || FLAG:7 == 2) { // :2438
      await era.printAndWait(`「啊啊啊~…啊~…哈啊…哈啊…」`); // :2439
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :2440
      era.set(`cflag:${target}:379`, 1); // :2440
    } // :2441
    return 0; // :2442
  } // :2443

  // ------------------------------------------------- // :2445
  // 正常位 CFLAG:321 // :2446
  // ------------------------------------------------- // :2447
  if (SELECTCOM == 20) { // :2448
    // 初めて // :2449
    if (CFLAG:TARGET:321 == 0) { // :2450
      // 处女 // :2451
      if (TALENT:0 == 1) { // :2452
        // 淫乱 // :2453
        if (TALENT:76 == 1) { // :2454
          // 高贵ダークエルフ // :2455
          if (TALENT:TARGET:314 == 7) { // :2456
            await era.printAndWait(`「啊啊啊…主人~…非常感谢主人…将淫乱的堕落精灵的…处女小穴给贯穿掉…真的是非常感谢~${heart(1)}」`); // :2457
            await era.printAndWait(`${target_name}眼角流出了眼泪抱住了${player_name}。`); // :2458
            await era.printAndWait(`「哼啊…啊…不、不要…${sc()}…明明…是第一次来的…嗯~…啊~…却立马对主人的大鸡巴有感觉了~…哈呜嗯~${heart(1)}」`); // :2459
            await era.printAndWait(`「啊啊~…主人的大鸡巴好热~…啊啊~不行~…明明只是大鸡鸡进去了而已...脑袋…变得…奇怪起来了~${heart(3)}」`); // :2460
            await era.printAndWait(`「嗯呜~${heart(1)}…请就这样…往淫乱小穴里…用主人的大鸡巴来，做上标记吧~！」`); // :2461
            await era.printAndWait(`${target_name}好像为了让${player_name}不逃掉的一样，用双腿将${player_name}的腰给缠住………`); // :2462
            // それ以外 // :2463
          } else { // :2464
            // 故郷に恋人がいる場合 // :2465
            if (TALENT:TARGET:317 == 4) { // :2466
              await era.printAndWait(`「啊啊啊~…终于…终于得到了主人的大鸡巴了~…${heart(1)}」`); // :2467
              await era.printAndWait(`「好高兴…好高兴的说~…如果能…能更加早侵犯 ${target_name}就更好了~~${heart(1)}」`); // :2468
              await era.printAndWait(`${target_name}说着这样的话的时候也在忍耐着破瓜之疼。`); // :2469
              await era.printAndWait(`「撒~…请更加…更加像野兽一样地侵犯吧~${heart(1)}让${target_name}成为主人的东西吧~${heart(3)}」`); // :2470
              await era.printAndWait(`${target_name}再也没有想起在故乡的恋人了………`); // :2471
            } else { // :2472
              await era.printAndWait(`「哈啊恩~…终于…给予大鸡巴了呀~…${heart(1)}」`); // :2473
              await era.printAndWait(`「主人…${target_name}的淫乱处女小穴的味道怎样呀~？」`); // :2474
              await era.printAndWait(`「%SELF_CALL(TARGET, 1)%…主人的大鸡巴只是刚刚进去就已经去了好多次了呀~…${heart(3)}」`); // :2475
              await era.printAndWait(`${target_name}说着这样的话的时候也在忍耐着破瓜之疼………`); // :2476
            } // :2477
          } // :2478
          // 爱慕 // :2479
        } else if (TALENT:85 == 1) { // :2480
          // 高贵エルフ // :2481
          if (TALENT:TARGET:314 == 1) { // :2482
            await era.printAndWait(`「和魔王…大人…做这样的事情什么的~…啊啊~${heart(1)}」`); // :2483
            await era.printAndWait(`「${sc()}…没、没关系的~…请按照自己想要得…动吧~…嗯嗯~………！」`); // :2484
            await era.printAndWait(`${target_name}眼睛流下了泪水一脸痛苦的样子，用力地紧紧抱住了${player_name}。`); // :2485
            await era.printAndWait(`「啊啊~…这、这样的没有关系的啦…快点…请让${scf()}、${sc()}…成为、大人您的东西吧………${heart(3)}」`); // :2486
            await era.printAndWait(`${target_name}长长的耳朵完全变得通红起来，将自己交给了${player_name}………`); // :2487
            // それ以外 // :2488
          } else { // :2489
            // 故郷に恋人がいる場合 // :2490
            if (TALENT:TARGET:317 == 4) { // :2491
              await era.printAndWait(`「哈呜嗯~…好、好深的说…啊~啊啊啊…能感受到…大、大人的东西~${heart(1)}」`); // :2492
              await era.printAndWait(`${player_name}将${target_name}的处女膜给捅破了、因为太疼在${player_name}的背后挠出了抓痕。`); // :2493
              await era.printAndWait(`「啊啊~…啊~~${heart(1)}…啊啊啊~～${heart(1)}………好、好热~…好像要变奇怪了啊~…${heart(1)}」`); // :2494
              await era.printAndWait(`「这样，${sc()}…就变成了大人您东西来的了…绝对…不会离开您的身边…啊啊~…更多…请更加地${heart(1)}」`); // :2495
              await era.printAndWait(`${target_name}一瞬间好像想起了某个重要的人，但是很快就忘记掉了………`); // :2496
            } else { // :2497
              await era.printAndWait(`「嗯~…啊啊~…${heart(1)}」`); // :2498
              await era.printAndWait(`「${scf()}、${sc()}没关系的啊~…就像平时一样…毫不留情地将${sc()}…哼啊~…啊~啊啊啊啊～！！！」`); // :2499
              await era.printAndWait(`${player_name}毫不留情地将阴茎插了过去、将${target_name}的处女膜给捅破了。`); // :2500
              await era.printAndWait(`「哈啊…哈啊啊…啊啊...这样，${sc()}就成为了大人您的东西了啊…${heart(1)}」`); // :2501
            } // :2502
          } // :2503
          // それ以外 // :2504
        } else { // :2505
          // 故郷に恋人がいる場合 // :2506
          if (TALENT:TARGET:317 == 4) { // :2507
            await era.printAndWait(`「啊啊~…不要啊~…哈呜…哈呜~…再这样…插进去的话…${sc()}的处女就…啊~啊啊啊啊~！」`); // :2508
            await era.printAndWait(`${player_name}无视掉${target_name}的悲鸣直接将${target_name}的处女给夺走了。`); // :2509
            await era.printAndWait(`「哈啊…哈啊…已经、已经没有脸再见那个人了…呜呜~…呜呜呜呜呜呜~………」`); // :2510
            await era.printAndWait(`听着${target_name}的哭声${player_name}继续侵犯着………`); // :2511
          } else { // :2512
            await era.printAndWait(`「唔呜呜…！………啊啊~…大，大鸡巴在…${sc()}的里面………」`); // :2513
            await era.printAndWait(`「不、不行的啊…还、还不可以动…啊~啊~！哈啊呜呜~！」`); // :2514
          } // :2515
        } // :2516
        // 非处女 // :2517
      } else { // :2518
        // 淫乱 // :2519
        if (TALENT:76 == 1) { // :2520
          await era.printAndWait(`「嗯哈啊嗯~…！请更加地…去侵犯${sc()}的淫乱小穴吧~${heart(1)}」`); // :2521
          await era.printAndWait(`「啊啊~…果然…被侵犯…嘴巴了…${heart(3)}」`); // :2522
          await era.printAndWait(`${target_name}抱住${player_name}发出了娇喘………`); // :2523
          // 爱慕 // :2524
        } else if (TALENT:85 == 1) { // :2525
          await era.printAndWait(`「啊嗯~…嗯~…像这样…将大人您抱住什么的…十分愉快呢~…${heart(1)}」`); // :2526
          await era.printAndWait(`「啊~！…呀，呀嗯~…这、这么地…突然那么激烈得话…嗯~啊~哈啊嗯~${heart(1)}」`); // :2527
          // それ以外 // :2528
        } else { // :2529
          await era.printAndWait(`「哈啊…男人都是像这样…做的对吧…嗯~…嗯~…嗯哼唔~………」`); // :2530
        } // :2531
      } // :2532
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :2533
      era.set(`cflag:${target}:321`, 1); // :2533
      return 0; // :2534
      // 二回目以降 // :2535
    } else { // :2536
      // 淫乱 // :2537
      if (TALENT:TARGET:76 == 1 && (CFLAG:321 <= 5 || FLAG:7 == 2)) { // :2538
        if (RAND:3 == 0) { // :2539
          await era.printAndWait(`「请弄得…更加死去活来地吧~${heart(1)}」`); // :2540
          await era.printAndWait(`「就这在小穴的深处里面射出来吧~…请让${sc()}…去…去了吧~${heart(1)}」`); // :2541
          await era.printAndWait(`${target_name}不停地发出愉悦的娇喘，从${target_name}的身上一点高贵气息都看不到了………`); // :2542
        } else if (RAND:2 == 0) { // :2543
          await era.printAndWait(`「啊哈嗯唔~…哈唉呜~…小穴SEX…最棒了啊~${heart(1)}…请更多地…更加地侵犯那里吧~${heart(1)}」`); // :2544
          await era.printAndWait(`「请播种子进去吧…好想被播种子进去啦~${heart(1)}…精液~…请给精液给${sc()}吧~~…呀~…呀啊啊~…啊~啊啊啊~${heart(1)}」`); // :2545
          await era.printAndWait(`${target_name}如同雌犬一样不断地呻吟着………`); // :2546
        } else { // :2547
          await era.printAndWait(`「嗯哈啊~…好舒服~~…${heart(1)}」`); // :2548
          await era.printAndWait(`「小穴SEX最棒了啊~~~${heart(3)}」`); // :2549
          await era.printAndWait(`兴奋起来的${target_name}伸出了舌头，舔起了${player_name}的脸。`); // :2550
          await era.printAndWait(`「哈啊啊~${heart(1)} 请往${sc()}的~${heart(1)} 淫乱小穴里~${heart(1)} 播下种子吧~~${heart(1)}」`); // :2551
        } // :2552
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :2553
        era.set(`cflag:${target}:321`, 6); // :2553
        // 爱慕 // :2554
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:321 <= 4 || FLAG:7 == 2)) { // :2555
        if (RAND:3 == 0) { // :2556
          await era.printAndWait(`${target_name}将${player_name}紧紧地抱住，感受着腔内带来的快感而娇喘着。`); // :2557
          await era.printAndWait(`「喜欢…好喜欢的啊~~${heart(1)}…所以…请更加激烈地…疼爱${sc()}吧~${heart(1)}」`); // :2558
          await era.printAndWait(`「啊啊~…那里…那里好棒啊啊~…让${sc()}的身体…更加地成为${player_name}大人的东西吧~~${heart(1)}」`); // :2559
        } else if (RAND:2 == 0) { // :2560
          await era.printAndWait(`「啊哈啊…大鸡巴…居然…塞到了这么深…啊~…啊哈呜嗯~${heart(1)}」`); // :2561
          await era.printAndWait(`「${sc()}的那里…要记下大鸡巴的形状了呀~~…${heart(1)} 」`); // :2562
          await era.printAndWait(`${player_name}侵犯着${target_name}、每当腔内深处被顶到${target_name}都会从嘴边漏出一声娇喘………`); // :2563
        } else { // :2564
          await era.printAndWait(`「啊哈啊~…啊啊~…${player_name}大人………请更多地…拥抱也没有关系吧~~…？」`); // :2565
          await era.printAndWait(`「像、像这样抱住的话…就更感觉会更加舒服呢~…啊嗯~…嗯~…哈啊啊~………${heart(1)}」`); // :2566
          await era.printAndWait(`${target_name}用双手将${player_name}来回、好像很舒服地呻吟着………`); // :2567
        } // :2568
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :2569
        era.set(`cflag:${target}:321`, 5); // :2569
        // 屈服刻印Lv3＋V感覚Lv3以上 // :2570
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:321 <= 3 || FLAG:7 == 2)) { // :2571
        await era.printAndWait(`「啊~…啊啊~…恩呜呜…将腿…张得更开…什么的…啊啊~！」`); // :2572
        await era.printAndWait(`「啊啊~啊~…哈呜~好深啊~…到顶了呀~~…啊啊~啊~！」`); // :2573
        await era.printAndWait(`${target_name}不像样地不断呻吟着………`); // :2574
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :2575
        era.set(`cflag:${target}:321`, 4); // :2575
        // 屈服刻印Lv3 // :2576
      } else if (MARK:2 == 3 && (CFLAG:321 <= 2 || FLAG:7 == 2)) { // :2577
        await era.printAndWait(`「啊~…啊啊啊~…嗯呜呜…将腿…张得更开…什么的…啊啊~！」`); // :2578
        await era.printAndWait(`「不行…不行啊~…再这样…侵犯下去的话………」`); // :2579
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :2580
        era.set(`cflag:${target}:321`, 3); // :2580
        // それ以外 // :2581
      } else if (CFLAG:321 <= 1 || FLAG:7 == 2) { // :2582
        await era.printAndWait(`「哈呜~…嗯呜~…嗯嗯呜~…再这样下去…就绝对不会原谅你了………」`); // :2583
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :2584
        era.set(`cflag:${target}:321`, 2); // :2584
      } // :2585
      return 0; // :2586
    } // :2587
  } // :2588


  // ------------------------------------------------- // :2591
  // 背后位 CFLAG:322 // :2592
  // ------------------------------------------------- // :2593
  if (SELECTCOM == 21) { // :2594
    // 初めて // :2595
    if (CFLAG:TARGET:322 == 0) { // :2596
      // 处女 // :2597
      if (TALENT:0 == 1) { // :2598
        // 淫乱 // :2599
        if (TALENT:76 == 1) { // :2600
          // 高贵ダークエルフ // :2601
          if (TALENT:TARGET:314 == 7) { // :2602
            await era.printAndWait(`${target_name}将屁股抬得高高的，诱惑着${player_name}。`); // :2603
            await era.printAndWait(`「撒~…主人…请品尝淫乱堕落精灵族的…处女屁股吧~${heart(3)}」`); // :2604
            await era.printAndWait(`「想要主人的大鸡巴…的堕落的精灵族的屁股堕落~…快点侵犯吧~~${heart(1)}」`); // :2605
            await era.printAndWait(''); // :2606
            await era.printAndWait(`「………拜、拜托了~…这、这个样子…很羞耻的啦………」`); // :2607
            await era.printAndWait(`看着没有被理睬差不多要哭出来的${target_name}兴奋起来的${player_name}抓住${target_name}的腰部后，毫不犹豫直接将阴茎往腔内插进去了`); // :2608
            await era.printAndWait(`「哈啊呜~！？这、这样…突然就${heart(1)}…噢~…嗯噢噢噢噢~${heart(5)}」`); // :2609
            // それ以外 // :2610
          } else { // :2611
            // 故郷に恋人がいる場合 // :2612
            if (TALENT:TARGET:317 == 4) { // :2613
              await era.printAndWait(`${target_name}将自己的屁股用双手扒开诱惑着${player_name}。`); // :2614
              await era.printAndWait(`「啊啊~…${sc()}的…处，处女膜能看到吗…是为了让主人捅破而存在的噢${heart(1)}」`); // :2615
              await era.printAndWait(`「前一个情人也没有给的${sc()}的小穴…一抽一抽地~…想要被主人侵犯呢~${heart(1)}…啊~啊啊啊~${heart(1)}」`); // :2616
              await era.printAndWait(`听着${target_name}诱惑的话语，${player_name}抓住${target_name}的腰，毫不留情地将腔内蹂蹑起来了。`); // :2617
              await era.printAndWait(`「哈呜嗯~…主人的${heart(1)}…大鸡巴${heart(1)}…大鸡巴~${heart(1)}…到里面…来了………啊啊啊啊~${heart(5)}」`); // :2618
              await era.printAndWait(`${target_name}再也没有想起故乡的恋人了………`); // :2619
            } else { // :2620
              await era.printAndWait(`${target_name}将自己的屁股用双手扒开诱惑着${player_name}。`); // :2621
              await era.printAndWait(`「啊啊~…${sc()}的…处，处女膜能看到吗…是为了让主人捅破而存在的噢${heart(1)}」`); // :2622
              await era.printAndWait(`「啊~、不要的呀~…没想到真的能看到里面啊~…${scf()}、${sc()}…不、不要…只是被看着就${heart(1)}」`); // :2623
              await era.printAndWait(`看着，被看着就好像要去了的${target_name}就兴奋起来的${player_name}抓住${target_name}的腰好不犹豫地将阴茎塞进了腔内。`); // :2624
              await era.printAndWait(`「嘎哈啊~…啊~…啊啊啊~…大鸡巴${heart(1)}…大鸡巴${heart(1)}…到里面…来了………啊啊啊啊~${heart(5)}」`); // :2625
            } // :2626
          } // :2627
          // 爱慕 // :2628
        } else if (TALENT:85 == 1) { // :2629
          // 高贵エルフ // :2630
          if (TALENT:TARGET:314 == 1) { // :2631
            await era.printAndWait(`「啊~…啊啊…从后面…侵犯${sc()}对吧~…${heart(1)}」`); // :2632
            await era.printAndWait(`「明，明白了…${sc()}会…成为大人您的东西的${heart(3)}」`); // :2633
            await era.printAndWait(`${player_name}将${target_name}的腰抓住、毫不留情地将阴茎往里面塞。`); // :2634
            await era.printAndWait(`「啊啊~…啊~…哈啊啊啊~…到里面…来了…%SELF_CALL(TARGET, 1)%…真的成为了魔王的…嗯啊~哈啊啊啊~！」`); // :2635
            await era.printAndWait(`${target_name}长长的耳朵颤抖着，发出了欢快的娇喘………`); // :2636
            // それ以外 // :2637
          } else { // :2638
            // 故郷に恋人がいる場合 // :2639
            if (TALENT:TARGET:317 == 4) { // :2640
              await era.printAndWait(`「啊啊~…这种不知羞耻的姿势…哪怕在那个人的面前也没有做过的说…${heart(1)}」`); // :2641
              await era.printAndWait(`${target_name}好像很高兴的样子摇晃着屁股诱惑着${player_name}。`); // :2642
              await era.printAndWait(`「已经…只能给${sc()}看到这样的样子…的说…请拿下${scf()}、${sc()}的贞洁吧…${heart(1)}」`); // :2643
              await era.printAndWait(`${player_name}将${target_name}的腰抓住，结果${target_name}发出了好像期待已久的甜美呻吟。`); // :2644
              await era.printAndWait(`「是这样啊~${heart(1)} 这个是…让${sc()}真的成为大人您的东西的重要…仪式来的对吧…${heart(1)}」`); // :2645
              await era.printAndWait(`「哈嗯呜~${heart(1)} 大鸡巴${heart(1)}…到深处…哈呜嗯~…进、进来~…进来了呀啊~${heart(1)}」`); // :2646
            } else { // :2647
              await era.printAndWait(`「啊~…这种姿势来做什么的…不行…不行的呀~…♪」`); // :2648
              await era.printAndWait(`${target_name}虽然嘴上这么说，但还是很高兴的摇晃着屁股。`); // :2649
              await era.printAndWait(`「啊嗯~…撒~…快点将${sc()}变成大人你的东西吧~！」`); // :2650
              await era.printAndWait(`腰被抓住后${target_name}发出了甘甜的娇喘声诱惑着${player_name}、等待着侵犯的到来。`); // :2651
              await era.print(''); // :2652
              await era.printAndWait(`「啊~啊啊~…到深处了…大鸡巴~！到深处了啊~~！…哈啊啊~啊~啊啊啊啊啊啊啊啊~～～～！！！」`); // :2653
            } // :2654
          } // :2655
          // それ以外 // :2656
        } else { // :2657
          // 故郷に恋人がいる場合 // :2658
          if (TALENT:TARGET:317 == 4) { // :2659
            await era.printAndWait(`「哈…哈啊…原，请原谅…${sc()}还有…重要的人…啊~啊啊~…不要啊啊啊~！」`); // :2660
            await era.printAndWait(`${player_name}将${target_name}向后推倒后，直接从后面毫不留情地将处女给夺走了。`); // :2661
            await era.printAndWait(`「这、这样得…骗…骗人得…啊~…哈~…呜~…呜哈啊嗯呜~！」`); // :2662
            await era.printAndWait(`听着${target_name}的哭声${player_name}继续侵犯下去了………`); // :2663
          } else { // :2664
            await era.printAndWait(`「这种姿势什么的…简直…就像狗一样…啊啊~…嗯唔唔唔！！」`); // :2665
            await era.printAndWait(`「啊啊~…${scf()}、${sc()}…明明…是第一次来的………」`); // :2666
            await era.printAndWait(`${player_name}将${target_name}的头往床上压下去，毫不留情地对准腰部抽插起来………`); // :2667
          } // :2668
        } // :2669
        // 非处女 // :2670
      } else { // :2671
        // 淫乱 // :2672
        if (TALENT:76 == 1) { // :2673
          await era.printAndWait(`「啊啊~…快点~呜~…进来吧~${heart(1)}」`); // :2674
          await era.printAndWait(`「就像汪酱一样…侵犯${target_name}吧${heart(3)}」`); // :2675
          // 愛 // :2676
        } else if (TALENT:85 == 1) { // :2677
          await era.printAndWait(`「啊嗯~…屁股…就那么喜欢吗~…？」`); // :2678
          await era.printAndWait(`「啊啊~…请、请吧…就这样将后面给…侵犯了吧~…${heart(1)}」`); // :2679
          // それ以外 // :2680
        } else { // :2681
          await era.printAndWait(`「这种姿势什么的…就像是…狗一样犬…啊啊~…嗯唔唔唔唔！！」`); // :2682
          await era.printAndWait(`${player_name}将${target_name}的脑袋往下压下去毫不留情地对准腰部抽插起来………`); // :2683
        } // :2684
      } // :2685
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :2686
      era.set(`cflag:${target}:322`, 1); // :2686
      return 0; // :2687
      // 二回目以降 // :2688
    } else { // :2689
      // 淫乱 // :2690
      if (TALENT:TARGET:76 == 1 && (CFLAG:322 <= 5 || FLAG:7 == 2)) { // :2691
        if (TEQUIP:44 == 1) { // :2692
          if (RAND:2 == 0) { // :2693
            await era.printAndWait(`「被绑住就会有感觉了啊~…请对淫乱的${target_name}的小穴……尽情地处罚吧~${heart(1)}」`); // :2694
          } else { // :2695
            await era.printAndWait(`「${target_name}最喜欢…被捆绑着侵犯了~……喜欢到完全忍不住的程度~${heart(1)}」`); // :2696
          } // :2697
          if (RAND:3 == 0) { // :2698
            await era.printAndWait(`「请…请更加粗鲁地做吧~${heart(1)}」`); // :2699
          } else if (RAND:2 == 0) { // :2700
            await era.printAndWait(`「哈啊~${heart(1)} 真是好棒的啊~${heart(3)}」`); // :2701
          } else { // :2702
            await era.printAndWait(`「${sc()}是…让大鸡巴插进来，侍奉大鸡巴的肉便器来的~${heart(3)}」`); // :2703
          } // :2704
        } else { // :2705
          if (RAND:3 == 0) { // :2706
            await era.printAndWait(`「啊哈啊嗯~…就像野兽一样SEX最喜欢了${heart(1)}」`); // :2707
            await era.printAndWait(`「更加…请更加侵犯那里吧~${heart(3)}」`); // :2708
            await era.printAndWait(`就像野兽一样发出了淫乱的娇喘声的${target_name}的身上已经完全看不到以往的高贵姿态了………`); // :2709
          } else if (RAND:2 == 0) { // :2710
            await era.printAndWait(`「啊啊啊~${heart(1)} 好喜欢被主人给侵犯呢~${heart(1)}」`); // :2711
            await era.printAndWait(`「被这样做的话…${sc()}…就能感觉到自己就是为了被大鸡巴插而出生的~${heart(1)}」`); // :2712
          } else { // :2713
            await era.printAndWait(`「请尽情地侵犯...野兽般的${target_name}的小穴吧~…${heart(1)}」`); // :2714
            await era.printAndWait(`「恩哈呜嗯~…啊啊啊~${heart(1)}」`); // :2715
            await era.printAndWait(`「就像野兽一样${heart(1)} 野兽SEX最棒了~~${heart(3)}」`); // :2716
          } // :2717
        } // :2718
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :2719
        era.set(`cflag:${target}:322`, 6); // :2719
        // 爱慕 // :2720
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:322 <= 4 || FLAG:7 == 2)) { // :2721
        if (RAND:3 == 0) { // :2722
          await era.printAndWait(`「啊~…哈啊~…啊啊~…虽然说…喜欢怎样都行也好…」`); // :2723
          await era.printAndWait(`「从后面…就像野兽一样…哈呜~…哈呜~${heart(1)} 哈啊嗯~${heart(1)}」`); // :2724
          await era.printAndWait(`「啊啊~…啊~…啊啊~♪…请更加更多地做吧~${heart(3)}」`); // :2725
        } else if (RAND:2 == 0) { // :2726
          await era.printAndWait(`「恩呜呜~…呜哼~…啊啊~…！」`); // :2727
          await era.printAndWait(`「请更尽情的做吧~${heart(1)} 就这样播下种子…让${sc()}怀孕了吧~~~${heart(1)}」`); // :2728
        } else { // :2729
          await era.printAndWait(`「啊~啊~啊啊啊~嗯哼嗯~${heart(1)}」`); // :2730
          await era.printAndWait(`「从背后被这样…侵犯着…还会高兴什么的…${heart(1)}」`); // :2731
          await era.printAndWait(`「${sc()}…已经要变得不行了呀~${heart(3)}」`); // :2732
        } // :2733
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :2734
        era.set(`cflag:${target}:322`, 5); // :2734
        // 屈服刻印Lv3＋V感覚Lv3以上 // :2735
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:322 <= 3 || FLAG:7 == 2)) { // :2736
        await era.printAndWait(`「啊啊~…明明是、这么…屈辱的样子…嗯呜~…啊~嗯~…」`); // :2737
        await era.printAndWait(`「却有感觉…什么的…${scf()}、${sc()}…已经…不行了啊~…啊~…啊~啊啊~嗯啊啊~！」`); // :2738
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :2739
        era.set(`cflag:${target}:322`, 4); // :2739
        // 屈服刻印Lv3 // :2740
      } else if (MARK:2 == 3 && (CFLAG:322 <= 2 || FLAG:7 == 2)) { // :2741
        await era.printAndWait(`「请、请将…${sc()}的那里…侵犯了吧~…嗯呜…呜~呜呜呜~！」`); // :2742
        await era.printAndWait(`${target_name}被侵犯地眼泪都流下来了………`); // :2743
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :2744
        era.set(`cflag:${target}:322`, 3); // :2744
        // それ以外 // :2745
      } else if (CFLAG:322 <= 1 || FLAG:7 == 2) { // :2746
        await era.printAndWait(`「啊啊~…${sc()}…就像是狗一样…嗯~啊~啊啊啊~！」`); // :2747
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :2748
        era.set(`cflag:${target}:322`, 2); // :2748
      } // :2749
      return 0; // :2750
    } // :2751
  } // :2752



  // ------------------------------------------------- // :2756
  // 对面座位 CFLAG:323 // :2757
  // ------------------------------------------------- // :2758
  if (SELECTCOM == 22) { // :2759
    if (CFLAG:TARGET:323 == 0) { // :2760
      // 处女 // :2761
      if (TALENT:0 == 1) { // :2762
        // 淫乱 // :2763
        if (TALENT:76 == 1) { // :2764
          await era.printAndWait(''); // :2765
          // 爱慕 // :2766
        } else if (TALENT:85 == 1) { // :2767
          await era.printAndWait(''); // :2768
          // それ以外 // :2769
        } else { // :2770
          await era.printAndWait(''); // :2771
        } // :2772
        // 非处女 // :2773
      } else { // :2774
        // 淫乱 // :2775
        if (TALENT:76 == 1) { // :2776
          await era.printAndWait(`「嗯…啊~…啊嗯~…请更加地…往上顶吧~…${heart(1)}」`); // :2777
          await era.printAndWait(`「${sc()}…从腰往下的部位都融化掉动不了了呀…${heart(1)}」`); // :2778
          await era.printAndWait(`${target_name}一脸沉浸在淫乱中的表情抱了过来………`); // :2779
          // 爱慕 // :2780
        } else if (TALENT:85 == 1) { // :2781
          await era.printAndWait(`「喜欢…好喜欢啊~…啊啊啊~…啾~…啾~…嗯哼唔~…♪」`); // :2782
          await era.printAndWait(`${target_name}将双手来回抱住了${player_name}的脖子尽情地撒着娇。`); // :2783
          await era.printAndWait(`「这个姿势…真是相爱得好姿势呢~…${heart(1)}」`); // :2784
          // それ以外 // :2785
        } else { // :2786
          await era.printAndWait(`「恩呀唔！从，从下面往上顶不行啊、不行来的啊………！」`); // :2787
        } // :2788
      } // :2789
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :2790
      era.set(`cflag:${target}:323`, 1); // :2790
      return 0; // :2791
      // 二回目以降 // :2792
    } else { // :2793
      // 淫乱 // :2794
      if (TALENT:TARGET:76 == 1 && (CFLAG:323 <= 5 || FLAG:7 == 2)) { // :2795
        if (RAND:3 == 0) { // :2796
          await era.printAndWait(`「嗯~…啊~…啊嗯~…请请更加地…往上顶吧~…${heart(1)}」`); // :2797
          await era.printAndWait(`「${sc()}…从腰往下的部位都融化掉动不了了呀…${heart(1)}」`); // :2798
          await era.printAndWait(`${target_name}一脸沉浸在淫乱中的表情抱了过来………`); // :2799
        } else if (RAND:2 == 0) { // :2800
          await era.printAndWait(`「啊~…嗯~${heart(1)} 哈啊~${heart(1)}…好，好棒的啊~${heart(1)}」`); // :2801
          await era.printAndWait(`「${sc()}的…的小穴${heart(1)} 被主人的大鸡巴给塞满了啊${heart(3)}」`); // :2802
          await era.printAndWait(`「嗯哼唔~…想奉献上一个吻给主人呢~…嗯啾~…啾~…啾呜~${heart(1)}」`); // :2803
        } else { // :2804
          await era.printAndWait(`「啊啊~…啊嗯~…♪腰自己就动起来了…完全停不下来了啊~${heart(1)}」`); // :2805
          await era.printAndWait(`「${sc()}的淫乱小穴是…为了将大鸡巴吞下才存在的呀~${heart(1)} 完全没有问题吧~？」`); // :2806
          await era.printAndWait(`「啊啊~…已经~…已经~…感觉真的要变得不行了~………♪」`); // :2807
        } // :2808
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :2809
        era.set(`cflag:${target}:323`, 6); // :2809
        // 爱慕 // :2810
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:323 <= 4 || FLAG:7 == 2)) { // :2811
        if (RAND:3 == 0) { // :2812
          await era.printAndWait(`「嗯啾~…嗯啾…嗯哼~…还想要…更多的…kiss………${heart(1)}」`); // :2813
          await era.printAndWait(`「啊嗯~…不、不行的啊…难得${sc()}可以…哈呜嗯~${heart(1)}」`); // :2814
          await era.printAndWait(`「啊啊~…已、已经…再从下面…往上顶的话…哈~…嗯~…嗯~…啊啊啊………♪」`); // :2815
          await era.printAndWait(`${target_name}摇动着腰部、每当腔内的深处被顶到的话，就露出一副荡漾的表情………`); // :2816
        } else if (RAND:2 == 0) { // :2817
          await era.printAndWait(`「${sc()}会好好动起来的啦~…所以大人请完全交给${sc()}吧${heart(1)}」`); // :2818
          await era.printAndWait(`${target_name}轻轻地舔了一下嘴唇，开始前后摇晃起了牙签哦不。`); // :2819
          await era.printAndWait(`「啊~…啊嗯~…嗯~…请用力地…将${sc()}…抱住吧…${heart(3)}」`); // :2820
        } else { // :2821
          await era.printAndWait(`「喜欢…好喜欢啊~…啊啊啊…啾~…啾~…嗯呼嗯~…♪」`); // :2822
          await era.printAndWait(`${target_name}将双手来回抱住了${player_name}的脖子尽情地撒着娇。`); // :2823
          await era.printAndWait(`「这个姿势…真是相爱得好姿势呢~${heart(3)}」`); // :2824
        } // :2825
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :2826
        era.set(`cflag:${target}:323`, 5); // :2826
        // 屈服刻印Lv3＋V感覚Lv3以上 // :2827
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:323 <= 3 || FLAG:7 == 2)) { // :2828
        await era.printAndWait(`「不、不要啊…怎么会…腰自己就…嗯~…好、好的…会抱住…大人你…的啦…」`); // :2829
        await era.printAndWait(`「啊~…啊啊~♪…嗯~…好奇怪…那里…居然好舒服…啊啊嗯~♪」`); // :2830
        await era.printAndWait(`「不行~…腰要~…啊~啊啊~！」`); // :2831
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :2832
        era.set(`cflag:${target}:323`, 4); // :2832
        // 屈服刻印Lv3 // :2833
      } else if (MARK:2 == 3 && (CFLAG:323 <= 2 || FLAG:7 == 2)) { // :2834
        await era.printAndWait(`「是的…会好好动起来的…请、请不要从下往上顶………」`); // :2835
        await era.printAndWait(`「嗯呼呜~…呜~…呀~…哈啊啊~………」`); // :2836
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :2837
        era.set(`cflag:${target}:323`, 3); // :2837
        // それ以外 // :2838
      } else if (CFLAG:323 <= 1 || FLAG:7 == 2) { // :2839
        await era.printAndWait(`「呼~…呜啊~…啊~…这种姿势…进到…深处了…不要…请、请不要动起来啊………」`); // :2840
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :2841
        era.set(`cflag:${target}:323`, 2); // :2841
      } // :2842
      return 0; // :2843
    } // :2844
  } // :2845


  // ------------------------------------------------- // :2848
  // 背面座位 CFLAG:324 // :2849
  // ------------------------------------------------- // :2850
  if (SELECTCOM == 23) { // :2851
    if (CFLAG:TARGET:324 == 0) { // :2852
      // 处女 // :2853
      if (TALENT:0 == 1) { // :2854
        // 淫乱 // :2855
        if (TALENT:76 == 1) { // :2856
          await era.printAndWait(''); // :2857
          // 爱慕 // :2858
        } else if (TALENT:85 == 1) { // :2859
          await era.printAndWait(''); // :2860
          // それ以外 // :2861
        } else { // :2862
          await era.printAndWait(''); // :2863
        } // :2864
        // 非处女 // :2865
      } else { // :2866
        // 淫乱 // :2867
        if (TALENT:76 == 1) { // :2868
          await era.printAndWait(`「啊嗯~…从后面…被从下往上插…十分得棒呢~…♪」`); // :2869
          await era.printAndWait(`「请将那里…弄得更加乱七八糟地吧~${heart(1)}」`); // :2870
          // 愛 // :2871
        } else if (TALENT:85 == 1) { // :2872
          await era.printAndWait(`「嗯呜~…请、请再温柔一点~…这么粗鲁地~…啊~…哈呜~♪」`); // :2873
          await era.printAndWait(`「这，这么地…粗鲁的话怎么可能会有…哈啊呜~${heart(1)}…哈呀嗯呜~${heart(1)}」`); // :2874
          // それ以外 // :2875
        } else { // :2876
          await era.printAndWait(`「啊~…啊啊~…进到…里面了…嗯呜呜！」`); // :2877
        } // :2878
      } // :2879
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :2880
      era.set(`cflag:${target}:324`, 1); // :2880
      return 0; // :2881
      // 二回目以降 // :2882
    } else { // :2883
      // 淫乱 // :2884
      if (TALENT:TARGET:76 == 1 && (CFLAG:324 <= 5 || FLAG:7 == 2)) { // :2885
        if (RAND:3 == 0) { // :2886
          await era.printAndWait(`「哈呀呜…嗯~嗯唔呜~…${heart(1)}」`); // :2887
          await era.printAndWait(`「大鸡巴…啊啊~…能非常感受到形状呢~${heart(1)}」`); // :2888
          await era.printAndWait(`${target_name}在被从下往上抽插的途中好像很怜爱地样子来回抚摸着自己肚子………`); // :2889
        } else if (RAND:2 == 0) { // :2890
          await era.printAndWait(`「请更加…请更加地欺负那里吧~~…${sc()}最喜欢被大鸡巴欺负了~${heart(1)}」`); // :2891
          await era.printAndWait(`「哈呀啊~…好、好棒啊~${heart(1)} 小穴要坏掉了呜呜呜呜~~~${heart(3)}」`); // :2892
          await era.printAndWait(`被从下往上抽插着而不断说着淫猥的话语的${target_name}的身上完全感受不到以往的一丝高贵姿态了………`); // :2893
        } else { // :2894
          await era.printAndWait(`「啊~…啊嗯~${heart(1)} 哈啊~${heart(1)} 嗯啊啊~${heart(1)}」`); // :2895
          await era.printAndWait(`「好棒…好棒的啊！~${heart(1)} 请更加地…欺负小穴吧~${heart(1)}」`); // :2896
        } // :2897
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :2898
        era.set(`cflag:${target}:324`, 6); // :2898
        // 爱慕 // :2899
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:324 <= 4 || FLAG:7 == 2)) { // :2900
        if (RAND:3 == 0) { // :2901
          await era.printAndWait(`「啊~…嗯呼~♪ 啊啊~…腰、腰自己就…动起来了啊~~…♪」`); // :2902
          await era.printAndWait(`「请从后面…牢牢地抱住${sc()}吧~………♪」`); // :2903
          await era.printAndWait(`「嗯哈啊~…啊~${heart(1)} 啊~${heart(1)} 啊啊啊啊嗯~${heart(3)}」`); // :2904
        } else if (RAND:2 == 0) { // :2905
          await era.printAndWait(`「喜欢，好喜欢得啊~${heart(1)} 被大人你抱住什么的…最喜欢了~${heart(3)}」`); // :2906
          await era.printAndWait(`「哈啊啊~…嗯~…大人你的手…好温柔…${sc()}…要变得更加不行了呀………♪」`); // :2907
          await era.printAndWait(`${target_name}如同撒娇一样发出了娇喘晃动起了腰部………`); // :2908
        } else { // :2909
          await era.printAndWait(`每当${target_name}被${player_name}从下往上抽插就会从嘴边漏出娇喘。`); // :2910
          await era.printAndWait(`「啊哈呀哈啊~♪ 噢~…噢噢~${heart(1)} 啊啊~${heart(1)}」`); // :2911
          await era.printAndWait(`「被温柔…抱着…然后被贯穿~…太幸福了~…感觉就要去了啊~…${heart(3)}」`); // :2912
        } // :2913
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :2914
        era.set(`cflag:${target}:324`, 5); // :2914
        // 屈服刻印Lv3＋V感覚Lv3以上 // :2915
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:324 <= 3 || FLAG:7 == 2)) { // :2916
        await era.printAndWait(`「好，好的…会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」`); // :2917
        await era.printAndWait(`「嗯哈呀呜呜~♪…好、好的…往、往深处塞进去…好、好难受啊啊………」`); // :2918
        await era.printAndWait(`「啊~…嗯~啊啊嗯~！…啊啊~嗯~…哼啊啊啊~♪」`); // :2919
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :2920
        era.set(`cflag:${target}:324`, 4); // :2920
        // 屈服刻印Lv3 // :2921
      } else if (MARK:2 == 3 && (CFLAG:324 <= 2 || FLAG:7 == 2)) { // :2922
        await era.printAndWait(`「好、好的……会更加…将双腿张开的…啊、不、不要！请不要将那种地方给张开啊」`); // :2923
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :2924
        era.set(`cflag:${target}:324`, 3); // :2924
        // それ以外 // :2925
      } else if (CFLAG:324 <= 1 || FLAG:7 == 2) { // :2926
        await era.printAndWait(`「哈啊…哈啊啊…啊、小穴…被扩大了…啊~啊啊~！」`); // :2927
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :2928
        era.set(`cflag:${target}:324`, 2); // :2928
      } // :2929
      return 0; // :2930
    } // :2931
  } // :2932

  // ------------------------------------------------- // :2934
  // 逆强奸 CFLAG:325 // :2935
  // ------------------------------------------------- // :2936
  if (SELECTCOM == 24) { // :2937
    if (CFLAG:TARGET:325 == 0) { // :2938
      // 处女 // :2939
      if (TALENT:PLAYER:0 == 1) { // :2940
        // 淫乱 // :2941
        if (TALENT:76 == 1) { // :2942
          await era.printAndWait(`「${player_name}的处女小穴${heart(1)} ${sc()}会好好地疼爱的噢~${heart(3)}」`); // :2943
          await era.printAndWait(`「疼的只有最初而已噢~${heart(1)} 撒~…请用下流的声音哭出来吧~${heart(3)} 」`); // :2944
          // 愛 // :2945
        } else if (TALENT:85 == 1) { // :2946
          await era.printAndWait(''); // :2947
          // それ以外 // :2948
        } else { // :2949
          await era.printAndWait(`「居然想要做这样的事情什么的……」`); // :2950
          await era.printAndWait(`「真是够恶趣味的呢……」`); // :2951
        } // :2952
        // 非处女 // :2953
      } else { // :2954
        // 淫乱 // :2955
        if (TALENT:76 == 1) { // :2956
          await era.printAndWait(''); // :2957
          // 愛 // :2958
        } else if (TALENT:85 == 1) { // :2959
          await era.printAndWait(''); // :2960
          // それ以外 // :2961
        } else { // :2962
          await era.printAndWait(''); // :2963
        } // :2964
      } // :2965
      // CFLAG:325  = 1（变量语义：CFLAG 族，325） // :2966
      era.set(`cflag:${target}:325`, 1); // :2966
      return 0; // :2967
      // 二回目以降 // :2968
    } else { // :2969
      // 淫乱 // :2970
      if (TALENT:TARGET:76 == 1 && (CFLAG:325 <= 5 || FLAG:7 == 2)) { // :2971
        await era.printAndWait(''); // :2972
        // CFLAG:325  = 6（变量语义：CFLAG 族，325） // :2973
        era.set(`cflag:${target}:325`, 6); // :2973
        // 愛 // :2974
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:325 <= 4 || FLAG:7 == 2)) { // :2975
        await era.printAndWait(''); // :2976
        // CFLAG:325  = 5（变量语义：CFLAG 族，325） // :2977
        era.set(`cflag:${target}:325`, 5); // :2977
        // 屈服刻印Lv3＋抖S气质Lv1以上 // :2978
      } else if (MARK:2 == 3 && ABL:20 >= 3 && (CFLAG:325 <= 3 || FLAG:7 == 2)) { // :2979
        if (RAND:2 == 0) { // :2980
          await era.printAndWait(`「哼嗯~哼嗯~${heart(1)}」`); // :2981
          await era.printAndWait(`「${sc()}会好好地调教你，让你也变成出色的雌豚噢~${heart(1)}」`); // :2982
        } else { // :2983
          await era.printAndWait(`「被${sc()}侵犯地有感觉了吧~？」`); // :2984
          await era.printAndWait(`「来吧~…快说被${sc()}侵犯地很舒服吧~」`); // :2985
        } // :2986
        // CFLAG:325  = 4（变量语义：CFLAG 族，325） // :2987
        era.set(`cflag:${target}:325`, 4); // :2987
        // 屈服刻印Lv3 // :2988
      } else if (MARK:2 == 3 && (CFLAG:325 <= 2 || FLAG:7 == 2)) { // :2989
        await era.printAndWait(`「真是没有办法呢~…哈啊~${heart(1)}」`); // :2990
        await era.printAndWait(`「这是命令来的嘛…真是没法反抗${sc()}呢……${heart(1)}」`); // :2991
        // CFLAG:325  = 3（变量语义：CFLAG 族，325） // :2992
        era.set(`cflag:${target}:325`, 3); // :2992
        // それ以外 // :2993
      } else if (CFLAG:325 <= 1 || FLAG:7 == 2) { // :2994
        if (RAND:2 == 0) { // :2995
          await era.printAndWait(`「至少…会用不怎么痛的方式来疼爱你吧」`); // :2996
        } else { // :2997
          await era.printAndWait(`「呜唔…这样的行为、恶趣味也请适可而止一点啊」`); // :2998
        } // :2999
        // CFLAG:325  = 2（变量语义：CFLAG 族，325） // :3000
        era.set(`cflag:${target}:325`, 2); // :3000
      } // :3001
      return 0; // :3002
    } // :3003
  } // :3004


  // ------------------------------------------------- // :3007
  // 正常位肛交 CFLAG:327 // :3008
  // ------------------------------------------------- // :3009
  if (SELECTCOM == 26) { // :3010
    // 初めて // :3011
    if (CFLAG:TARGET:327 == 0) { // :3012
      // 淫乱 // :3013
      if (TALENT:TARGET:76 == 1) { // :3014
        // 高贵ダークエルフ // :3015
        if (TALENT:TARGET:314 == 7) { // :3016
          await era.printAndWait(`「啊啊~…${sc()}居然…因为肛穴被塞进了大鸡巴…而感觉到高兴什么的${heart(1)}」`); // :3017
          await era.printAndWait(`${target_name}垂着舌头、沉浸在了肛门被侵犯的感觉里………`); // :3018
          await era.printAndWait(`「主人~…请往淫乱的堕落精灵的肛穴用精液射地满满得吧~${heart(1)}」`); // :3019
          await era.printAndWait(`「请将${sc()}变成主人专用的肛穴奴隶吧~~${heart(5)}」`); // :3020
          // それ以外 // :3021
        } else { // :3022
          await era.printAndWait(`「哈啊啊~♪…肛穴将整只大鸡巴都吞下去了啊~${heart(3)}」`); // :3023
          await era.printAndWait(`${target_name}淫乱地笑着，用双腿夹住${player_name}的腰部。`); // :3024
          await era.printAndWait(`「撒~…请往${sc()}的肛穴里面～射一堆用来标记的精液吧~${heart(1)}」`); // :3025
        } // :3026
        // 爱慕 // :3027
      } else if (TALENT:TARGET:85 == 1) { // :3028
        // 高贵エルフ // :3029
        if (TALENT:TARGET:314 == 1) { // :3030
          await era.printAndWait(`「啊啊~…这样…${sc()}的…肛门…被侵犯着…嗯嗯~${heart(1)}」`); // :3031
          await era.printAndWait(`${target_name}的长耳朵完全变得通红起来、忍受着屈辱的肛门虐待。`); // :3032
          await era.printAndWait(`「${scf()}、${sc()}…没、没有关系的…${heart(1)}」`); // :3033
          await era.printAndWait(`「不，不过哪怕是这样…也请…温柔一点………${heart(3)}」`); // :3034
          // それ以外 // :3035
        } else { // :3036
          await era.printAndWait(`「啊啊~…大鸡巴…进去了呃…嗯呜呜~${heart(1)}」`); // :3037
          await era.printAndWait(`「哈啊…啊啊…会忍耐…会好好地…忍耐住得…所以………」`); // :3038
          await era.printAndWait(`「请…尽情地享受吧~…${heart(3)}」`); // :3039
        } // :3040
        // それ以外（爱無し） // :3041
      } else { // :3042
        await era.printAndWait(`「哈啊啊啊~！？那、那里才不是将大鸡巴塞进去的地方来的啊~」`); // :3043
        await era.printAndWait(`「不、不要啊…不要啊啊啊~」`); // :3044
      } // :3045
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :3046
      era.set(`cflag:${target}:TARGET:327`, 1); // :3046
      return 0; // :3047
      // 二回目以降 // :3048
    } else { // :3049
      // 淫乱＋A感覚Lv3以上 // :3050
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:327 <= 6 || FLAG:7 == 2)) { // :3051
        if (RAND:3 == 0) { // :3052
          await era.printAndWait(`「哈呜啊~${heart(1)} 请更加地…将肛穴给扩大了吧~~${heart(1)}」`); // :3053
          await era.printAndWait(`「啊啊…肛穴太舒服了真的太对不起了${heart(1)}」`); // :3054
          await era.printAndWait(`「但是，但是…肛穴被侵犯了的话真的会变得不行了呀~${heart(1)}」`); // :3055
        } else if (RAND:2 == 0) { // :3056
          await era.printAndWait(`「啊~啊~哼啊啊~${heart(1)} 肛穴强奸…再做多一点吧~${heart(3)}」`); // :3057
          await era.printAndWait(`${target_name}从嘴边不像样地留着口水和${player_name}沉浸在了肛门虐待的快乐之中。`); // :3058
          await era.printAndWait(`${target_name}的脑袋中已经只剩下肛穴给予的快乐的样子………`); // :3059
        } else { // :3060
          await era.printAndWait(`「啊哈啊~…啊~啊~啊啊~…来回抽插着${heart(1)} 在来回抽插着~${heart(1)}」`); // :3061
          await era.printAndWait(`「肛穴…要变得不行了~${heart(1)} 要变成SEX专用的穴来了${heart(1)}」`); // :3062
          await era.printAndWait(`「啊啊~${heart(1)} 啊嗯~${heart(1)} 啊哈啊啊啊~${heart(3)}」`); // :3063
        } // :3064
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :3065
        era.set(`cflag:${target}:327`, 7); // :3065
        // 淫乱 // :3066
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:327 <= 5 || FLAG:7 == 2)) { // :3067
        await era.printAndWait(`「啊~啊~哼啊啊~${heart(1)} 肛穴强奸…再做多一点吧~${heart(1)}」`); // :3068
        await era.printAndWait(`「${sc()}的肛穴…被再干多一点的话…里面的形状就会更加贴合主人的大鸡巴的形状了~${heart(3)}」`); // :3069
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :3070
        era.set(`cflag:${target}:327`, 6); // :3070
        // 爱＋A感覚Lv3以上 // :3071
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:327 <= 4 || FLAG:7 == 2)) { // :3072
        if (RAND:2 == 0) { // :3073
          await era.printAndWait(`「啊~、嗯~…啊啊~…居然…${sc()}的肛穴居然有感觉起来了…嗯~、哼啊啊嗯~${heart(3)}」`); // :3074
          await era.printAndWait(`「啊啊~、请不要看着…贪图肛穴给予的快乐而摆出一副不像样姿态的、${sc()}的脸…请、请不要看…哈呜嗯~${heart(1)}」`); // :3075
          await era.printAndWait(`「明，明明说了…不能看了…坏、坏心…啊啊嗯~${heart(3)}」`); // :3076
        } else { // :3077
          await era.printAndWait(`「不，不行的啊~…肛穴居然那么有感觉不行的啊~~~♪」`); // :3078
          await era.printAndWait(`「所以…请不要用宏伟的大鸡巴来将${sc()}敏感的肛穴给操地去死活来的…这样就要不行了，就要坏掉了啊~♪」`); // :3079
          await era.printAndWait(`「啊哈呀啊嗯~♪…要去了，要去了啊啊~…肛门SEX…好棒呀啊~~${heart(5)}」`); // :3080
        } // :3081
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :3082
        era.set(`cflag:${target}:327`, 5); // :3082
        // 爱慕 // :3083
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:327 <= 3 || FLAG:7 == 2)) { // :3084
        await era.printAndWait(`「不、不行的啊~…肛门居然那么有感觉不行的啊~………」`); // :3085
        await era.printAndWait(`「哈呀呜呜~…突，突然就动起来不行啊~…坏心眼呜~坏心眼呜~♪」`); // :3086
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :3087
        era.set(`cflag:${target}:327`, 4); // :3087
        // A感覚Lv3以上 // :3088
      } else if (ABL:3 >= 3 && (CFLAG:327 <= 2 || FLAG:7 == 2)) { // :3089
        await era.printAndWait(`「啊啊~…为…为什么…屁股的洞…会有感觉来的…明明不可以的…」`); // :3090
        await era.printAndWait(`「嗯呜~…不、不行~…那样…激烈地…哈嗯呜啊嗯呜哈嗯呜~」`); // :3091
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :3092
        era.set(`cflag:${target}:327`, 3); // :3092
        // それ以外（爱無し、A感覚Lv3未満） // :3093
      } else if (CFLAG:327 <= 1 || FLAG:7 == 2) { // :3094
        await era.printAndWait(`「拜，拜托了…拜托了啊…肛门被扩张…很痛苦的啊…啊~啊啊~」`); // :3095
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :3096
        era.set(`cflag:${target}:327`, 2); // :3096
      } // :3097
      return 0; // :3098
    } // :3099
  } // :3100


  // ------------------------------------------------- // :3103
  // 背后位アナル CFLAG:328 // :3104
  // ------------------------------------------------- // :3105
  if (SELECTCOM == 27) { // :3106
    // 初めて // :3107
    if (CFLAG:TARGET:328 == 0) { // :3108
      // 淫乱 // :3109
      if (TALENT:TARGET:76 == 1) { // :3110
        // 高贵ダークエルフ // :3111
        if (TALENT:TARGET:314 == 7) { // :3112
          await era.printAndWait(`「嗯哈啊~…请激烈地侵犯...${heart(1)} 淫乱的堕落精灵的屁股吧~${heart(1)}」`); // :3113
          await era.printAndWait(`${target_name}就像让${player_name}看到屁股一样用双手将自己的屁股张开了。${player_name}接受了她的诱惑从后面插进了肛门里了。`); // :3114
          await era.printAndWait(`「哈呀呜~从肛穴里面进来了~大鸡巴进来了~${heart(3)}」`); // :3115
          await era.printAndWait(`「嗯呜~…啊啊~…${sc()}的肛穴…被当成飞机杯着呢${heart(1)}」`); // :3116
          await era.printAndWait(`「被当成飞机杯也可以的~…请尽情地变得舒服起来吧~${heart(5)}」`); // :3117
          // それ以外 // :3118
        } else { // :3119
          await era.printAndWait(`「请尽情地侵犯~${heart(1)} ${player_name}的肛穴吧~${heart(1)}」`); // :3120
          await era.printAndWait(`「请更加地欺负屁股吧${heart(1)} 屁股被欺负的话就会舒服得不行了啊~${heart(1)}」`); // :3121
          await era.printAndWait(`「哈呀啊~…好厉害，大鸡巴好厉害啊~${heart(3)}」`); // :3122
        } // :3123
        // 爱慕 // :3124
      } else if (TALENT:TARGET:85 == 1) { // :3125
        // 高贵エルフ // :3126
        if (TALENT:TARGET:314 == 1) { // :3127
          await era.printAndWait(`「呀啊啊~…肛、肛门是不行的啊…哈呜~…啊~啊啊啊~！」`); // :3128
          await era.printAndWait(`「哼~…啊…啊啊${heart(1)} …被大鸡巴侵犯着呢~${heart(1)}哈啊嗯~${heart(1)}」`); // :3129
          await era.printAndWait(`「才…才不是呢…${scf()}、${sc()}……被干肛穴…而感到高兴什么的...才没有呢...哈呀啊啊~${heart(1)}」`); // :3130
          await era.printAndWait(`「哈呀啊~${heart(1)}啊哈嗯~${heart(1)} 对、对不起啊呜呜呜~…」`); // :3131
          await era.printAndWait(`「作为工口精灵族的${target_name}是一个…肛穴被侵犯就感到快乐的大变态来的…啊~啊啊啊~${heart(1)}」`); // :3132
          // それ以外 // :3133
        } else { // :3134
          await era.printAndWait(`「啊啊~…这种姿势…真的是很害羞来的啊…啊啊~…那里是…${heart(1)}」`); // :3135
          await era.printAndWait(`「不，不行的啊…肛穴是不行的啊~…哈呜~…啊~啊啊啊~！」`); // :3136
          await era.printAndWait(`「哼啊~…啊…啊啊${heart(1)} …大鸡巴…进到深处了~${heart(1)}」`); // :3137
          await era.printAndWait(`「啊啊嗯~${heart(1)} 被从后面侵犯着肛穴…却高兴起来了~…」`); // :3138
        } // :3139
        // それ以外（爱無し） // :3140
      } else { // :3141
        await era.printAndWait(`「请、请快住手…这种姿势…${sc()}才不会有感觉…啊啊~…不…不要啊~！」`); // :3142
      } // :3143
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3144
      era.set(`cflag:${target}:TARGET:328`, 1); // :3144
      return 0; // :3145
      // 二回目以降 // :3146
    } else { // :3147
      // 淫乱＋A感覚Lv3以上 // :3148
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:328 <= 6 || FLAG:7 == 2)) { // :3149
        if (RAND:3 == 0) { // :3150
          await era.printAndWait(`「嗯哈啊啊~…用汪汪风格来被侵犯肛穴最喜欢了~${heart(1)}」`); // :3151
          await era.printAndWait(`「主人~…请更加地…请更加地将大鸡巴塞进来吧${heart(1)}」`); // :3152
          await era.printAndWait(`「啊啊~…已经${heart(1)}…除了大鸡巴之外${heart(1)} 什么都想不了了啊~${heart(3)}」`); // :3153
        } else if (RAND:2 == 0) { // :3154
          await era.printAndWait(`「啊哈啊~肛穴要去了啊啊啊啊~………嗯哼唔~${heart(1)}」`); // :3155
          await era.printAndWait(`${target_name}发出了满足的娇喘后继续被从后面侵犯着。`); // :3156
          await era.printAndWait(`「更多地…请更像野兽地那样侵犯${sc()}吧~~${heart(1)}」`); // :3157
          await era.printAndWait(`「嗯哈啊~${heart(1)} 噢~噢噢~哦哦哦哦哦~！」`); // :3158
        } else { // :3159
          await era.printAndWait(`「啊啊~…嗯啊啊~…肛穴…完全变成了SEX用的小穴了~${heart(1)}」`); // :3160
          await era.printAndWait(`「主人~…请尽情地使用SEX的小穴来享受吧～${heart(3)}」`); // :3161
          await era.printAndWait(`「只有${sc()}变得舒服起来开心起来…那就不公平了啊~${heart(1)}」`); // :3162
        } // :3163
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3164
        era.set(`cflag:${target}:328`, 7); // :3164
        // 淫乱 // :3165
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:328 <= 5 || FLAG:7 == 2)) { // :3166
        await era.printAndWait(`「嗯哈啊啊~…用汪汪风格来被侵犯肛穴最喜欢了~${heart(1)}」`); // :3167
        await era.printAndWait(`「主人~…请更加地…请更加地将大鸡巴塞进来吧${heart(1)}」`); // :3168
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3169
        era.set(`cflag:${target}:328`, 6); // :3169
        // 爱＋A感覚Lv3以上 // :3170
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:328 <= 4 || FLAG:7 == 2)) { // :3171
        if (RAND:2 == 0) { // :3172
          await era.printAndWait(`「啊啊~…嗯哼~…不、不行…啊啊~…肛门居然变得那么舒服起来了………${heart(1)}」`); // :3173
          await era.printAndWait(`「哈啊啊~……请更加侵犯那里吧~…${heart(3)}」`); // :3174
        } else { // :3175
          await era.printAndWait(`「啊啊~…这样…明明不要的~…肛穴要融化掉了~…${heart(1)}」`); // :3176
          await era.printAndWait(`「不行~…屁股自己就~…恩哈呜~${heart(1)}」`); // :3177
          await era.printAndWait(`「啊啊~…不行~…已经要不行了啊~…已经随便怎样都好了啊~！」`); // :3178
        } // :3179
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3180
        era.set(`cflag:${target}:328`, 5); // :3180
        // 爱慕 // :3181
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:328 <= 3 || FLAG:7 == 2)) { // :3182
        await era.printAndWait(`「啊啊~…嗯哼~…不、不行…啊啊~…肛门居然变得那么舒服起来了……${heart(1)}」`); // :3183
        await era.printAndWait(`「%SELF_CALL(TARGET, 1)%…真的是…要变成野兽了~…啊嗯~♪」`); // :3184
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3185
        era.set(`cflag:${target}:328`, 4); // :3185
        // A感覚Lv3以上 // :3186
      } else if (ABL:3 >= 3 && (CFLAG:328 <= 2 || FLAG:7 == 2)) { // :3187
        await era.printAndWait(`「啊~啊啊~啊啊啊~${heart(1)} 屁股…要融化掉了啊~荡…${heart(1)}」`); // :3188
        await era.printAndWait(`「啊~♪…嗯哼唔~…${sc()}已经…作为一只野兽…也可以了啊~…${heart(1)}」`); // :3189
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3190
        era.set(`cflag:${target}:328`, 3); // :3190
        // それ以外（爱無し、A感覚Lv3未満） // :3191
      } else if (CFLAG:328 <= 1 || FLAG:7 == 2) { // :3192
        await era.printAndWait(`「这~…样啊~…${sc()}…变成了野兽…还不如了啊…啊~…啊啊~」`); // :3193
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3194
        era.set(`cflag:${target}:328`, 2); // :3194
      } // :3195
      return 0; // :3196
    } // :3197
  } // :3198


  // ------------------------------------------------- // :3201
  // 对面座位アナル CFLAG:329 // :3202
  // ------------------------------------------------- // :3203
  if (SELECTCOM == 28) { // :3204
    // 初めて // :3205
    if (CFLAG:TARGET:329 == 0) { // :3206
      // 淫乱 // :3207
      if (TALENT:TARGET:76 == 1) { // :3208
        await era.printAndWait(`「嗯真是的…在侵犯着肛穴的时候还想要调情什么的${heart(1)}」`); // :3209
        await era.printAndWait(`「主人真是H呢~…${heart(1)}」`); // :3210
        // 爱慕 // :3211
      } else if (TALENT:TARGET:85 == 1) { // :3212
        await era.printAndWait(`「啊~…嗯~…哈啊…连根部…都进去了…呜啊~…啊！」`); // :3213
        await era.printAndWait(`「啊不、不行的啊…请，请不要看着${player_name}脸啊~！~」`); // :3214
        await era.printAndWait(`${target_name}好像很害羞地抱住了${player_name}………`); // :3215
        // それ以外（爱無し） // :3216
      } else { // :3217
        await era.printAndWait(`「啊，啊啊…用这种姿势…对屁股的洞…嗯哼~…嗯哼唔………」`); // :3218
        await era.printAndWait(`「好、好的、会好好地将整根塞进去的…啊啊~请不要动起来」`); // :3219
      } // :3220
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :3221
      era.set(`cflag:${target}:TARGET:329`, 1); // :3221
      return 0; // :3222
      // 二回目以降 // :3223
    } else { // :3224
      // 淫乱＋A感覚Lv3以上 // :3225
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:329 <= 6 || FLAG:7 == 2)) { // :3226
        if (RAND:3 == 0) { // :3227
          await era.printAndWait(`「嗯哼唔~${heart(1)} 肛穴被塞进了大鸡巴了~～${heart(1)}」`); // :3228
          await era.printAndWait(`「啊啊~…已经忍耐不了了呀~…要开始动了噢…${sc()}要自己就变得舒服起来了噢~${heart(1)}」`); // :3229
          await era.printAndWait(`${target_name}就像所说的那样晃动起了腰部、自己享受起了快乐的味道………`); // :3230
        } else if (RAND:2 == 0) { // :3231
          await era.printAndWait(`「啊~啊啊~…连根部都…完全塞进了啊~${heart(1)}」`); // :3232
          await era.printAndWait(`「啊啊啊~…${sc()}1的肛门…完全变成肛穴了呀~${heart(3)}」`); // :3233
          await era.printAndWait(`完全不知道羞耻吐露着淫猥的话语的${target_name}身上、完全感受不到过去的高贵姿态了………`); // :3234
        } else { // :3235
          await era.printAndWait(`「哈啊啊~…肛穴要融化掉了~${heart(1)} 因为大鸡巴塞进来了所以肛穴很高兴呢${heart(1)}」`); // :3236
          await era.printAndWait(`「啊哈啊…怎么样啊~？肛穴…就像这样收紧的话是不是很舒服呀~${heart(3)}」`); // :3237
        } // :3238
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :3239
        era.set(`cflag:${target}:329`, 7); // :3239
        // 淫乱 // :3240
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:329 <= 5 || FLAG:7 == 2)) { // :3241
        await era.printAndWait(`「啊啊~…肛穴被完全扩大了啊~${heart(1)}」`); // :3242
        await era.printAndWait(`「肛穴感受着大鸡巴…变得黏糊糊起来了呀~${heart(3)}」`); // :3243
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :3244
        era.set(`cflag:${target}:329`, 6); // :3244
        // 爱＋A感覚Lv3以上 // :3245
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:329 <= 4 || FLAG:7 == 2)) { // :3246
        if (RAND:2 == 0) { // :3247
          await era.printAndWait(''); // :3248
          await era.printAndWait(`「啊啊~…${sc()}…才不是那么淫乱来的…${heart(1)}」`); // :3249
          await era.printAndWait(`「但是屁股里…啊哈啊~…整根大鸡巴都塞进去了…却还会高兴什么的~…${heart(1)}」`); // :3250
          await era.printAndWait(`「请不要…讨厌${sc()}…啊啊~…嗯~哈啊嗯~${heart(3)}」`); // :3251
        } else { // :3252
          await era.printAndWait(`「啊啊~…${sc()}的身体…这种地方也…变成相爱的地方了呀~${heart(1)}」`); // :3253
          await era.printAndWait(`「嗯~…♪ 更加…激烈地抽插那里，也没有关系的~${heart(1)}」`); // :3254
        } // :3255
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :3256
        era.set(`cflag:${target}:329`, 5); // :3256
        // 爱慕 // :3257
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:329 <= 3 || FLAG:7 == 2)) { // :3258
        await era.printAndWait(`「啊啊啊~…屁股被…大鸡巴给塞满了啊~…♪」`); // :3259
        await era.printAndWait(`「这、这个…只是很难受所以才抱着而已啦~…啊~啊哈啊嗯~${heart(1)}」`); // :3260
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :3261
        era.set(`cflag:${target}:329`, 4); // :3261
        // A感覚Lv3以上 // :3262
      } else if (ABL:3 >= 3 && (CFLAG:329 <= 2 || FLAG:7 == 2)) { // :3263
        await era.printAndWait(`「哈啊嗯~…明明整根大鸡巴都塞进屁股里面了…♪ 为什么…为什么还会那么舒服呢~~？！」`); // :3264
        await era.printAndWait(`「不，不行的啊、动、动起来什么的不行啊」`); // :3265
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :3266
        era.set(`cflag:${target}:329`, 3); // :3266
        // それ以外（愛無し、A感覚Lv3未満） // :3267
      } else if (CFLAG:329 <= 1 || FLAG:7 == 2) { // :3268
        await era.printAndWait(`「啊啊~…屁股…再被扩大着…好、好难受啊…」`); // :3269
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :3270
        era.set(`cflag:${target}:329`, 2); // :3270
      } // :3271
      return 0; // :3272
    } // :3273
  } // :3274

  // ------------------------------------------------- // :3276
  // 背面座位肛交 CFLAG:330 // :3277
  // ------------------------------------------------- // :3278
  if (SELECTCOM == 29) { // :3279
    // 初めて // :3280
    if (CFLAG:TARGET:330 == 0) { // :3281
      // 淫乱 // :3282
      if (TALENT:TARGET:76 == 1) { // :3283
        await era.printAndWait(`「啊啊~…请插上来吧~${heart(1)}」`); // :3284
        await era.printAndWait(`「肛穴被扩大了~…正在吞下大鸡巴着呢~${heart(1)}」`); // :3285
        await era.printAndWait(`「啊嗯~${heart(1)} 肛穴被侵犯真是太棒了啊${heart(1)}」`); // :3286
        // 愛 // :3287
      } else if (TALENT:TARGET:85 == 1) { // :3288
        await era.printAndWait(`「啊~…啊啊~…屁股的洞…什么的…真的是…不、不行的啊~…啊啊~」`); // :3289
        await era.printAndWait(`「这种…姿势来…恩哈呜~…被侵犯什么的…明明…不要来的…啊啊~${heart(1)}」`); // :3290
        // それ以外（愛無し） // :3291
      } else { // :3292
        await era.printAndWait(`「不…不要啊…那么地…将腿张开的话…啊~啊啊~！进去了哈呜~~！？」`); // :3293
      } // :3294
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :3295
      era.set(`cflag:${target}:TARGET:330`, 1); // :3295
      return 0; // :3296
      // 二回目以降 // :3297
    } else { // :3298
      // 淫乱＋A感覚Lv3以上 // :3299
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:330 <= 6 || FLAG:7 == 2)) { // :3300
        if (RAND:2 == 0) { // :3301
          await era.printAndWait(`「啊啊嗯~${heart(1)} 肛穴…更加地侵犯一下吧啊~${heart(1)}」`); // :3302
          await era.printAndWait(`「哈啊~…更加激烈地侵犯比较好呢~${heart(1)} 更多地…更多地~…${heart(1)}」`); // :3303
          await era.printAndWait(`「请到坏掉为止，不停地侵犯吧${heart(3)}」`); // :3304
        } else { // :3305
          await era.printAndWait(`「啊~啊啊~…嗯~…腰部完全停不下来啊~${heart(3)}」`); // :3306
          await era.printAndWait(`「肛穴太舒服了…是个腰部自己就会动起来的淫乱奴隶真是对不起~${heart(1)}」`); // :3307
          await era.printAndWait(`「处罚，请处罚吧啊~${heart(1)} 请给淫乱肛穴处罚吧~${heart(1)}」`); // :3308
        } // :3309
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :3310
        era.set(`cflag:${target}:330`, 7); // :3310
        // 淫乱 // :3311
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:330 <= 5 || FLAG:7 == 2)) { // :3312
        await era.printAndWait(`「啊啊~…肛穴被侵犯的话…脚自己就会张开了呀~~…${heart(1)}」`); // :3313
        await era.printAndWait(`「哈呜哈啊~${heart(1)} 啊~…哈啊啊嗯~${heart(1)} 请更加…侵犯吧~${heart(1)}」`); // :3314
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :3315
        era.set(`cflag:${target}:330`, 6); // :3315
        // 爱＋A感覚Lv3以上 // :3316
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:330 <= 4 || FLAG:7 == 2)) { // :3317
        if (RAND:2 == 0) { // :3318
          await era.printAndWait(`「啊啊~…请温柔地抱住吧~…♪」`); // :3319
          await era.printAndWait(`「屁股…太过舒服了…感觉…要去了~${heart(1)} 啊~啊啊~嗯呼呜嗯~${heart(1)}」`); // :3320
          await era.printAndWait(`「啊啊~…连屁股的洞…都要变得不行了~~${heart(1)}」`); // :3321
        } else { // :3322
          await era.printAndWait(`「嗯哈啊${heart(1)} 被从后面抱着…就这样被侵犯着屁股什么的…${heart(1)}」`); // :3323
          await era.printAndWait(`「不行的啊~…真的…啊啊~${heart(1)} 要融化掉了…腰往下的地方都要融化掉了腰${heart(1)}」`); // :3324
        } // :3325
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :3326
        era.set(`cflag:${target}:330`, 5); // :3326
        // 爱慕 // :3327
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:330 <= 3 || FLAG:7 == 2)) { // :3328
        await era.printAndWait(`「啊啊啊~…明明在被温柔地抱着呢${heart(1)}却被侵犯着屁股什么的~ ${heart(1)}」`); // :3329
        await era.printAndWait(`「啊啊~…脑袋变得迷迷糊糊起来了~…${heart(1)}」`); // :3330
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :3331
        era.set(`cflag:${target}:330`, 4); // :3331
        // A感覚Lv3以上 // :3332
      } else if (ABL:3 >= 3 && (CFLAG:330 <= 2 || FLAG:7 == 2)) { // :3333
        await era.printAndWait(`「啊~啊啊啊~…屁股…有种奇怪的舒服的感觉…嗯~！啊啊~嗯~~！」`); // :3334
        await era.printAndWait(`「屁股要…变得…满满得了~…为什么~…嗯哼~………♪」`); // :3335
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :3336
        era.set(`cflag:${target}:330`, 3); // :3336
        // それ以外（愛無し、A感覚Lv3未満） // :3337
      } else if (CFLAG:330 <= 1 || FLAG:7 == 2) { // :3338
        await era.printAndWait(`「嗯呜~…这、这样的…不要…的啊…啊啊~不要动起来啊动~」`); // :3339
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :3340
        era.set(`cflag:${target}:330`, 2); // :3340
      } // :3341
      return 0; // :3342
    } // :3343
  } // :3344

  // ------------------------------------------------- // :3346
  // 手淫 CFLAG:331 // :3347
  // ------------------------------------------------- // :3348
  if (SELECTCOM == 30) { // :3349
    // 初めて // :3350
    if (CFLAG:TARGET:331 == 0) { // :3351
      // 淫乱 // :3352
      if (TALENT:TARGET:76 == 1) { // :3353
        await era.printAndWait(`「啊哈啊~…勃起的大鸡巴…十分地热啊~${heart(1)}」`); // :3354
        await era.printAndWait(`「温柔地摩擦好？还是激烈地比较好呢~？」`); // :3355
        await era.printAndWait(`${target_name}漏出了恶作剧的笑容舔了舔嘴唇握住了阴茎………`); // :3356
        // 愛 // :3357
      } else if (TALENT:TARGET:85 == 1) { // :3358
        await era.printAndWait(`「啊啊~…好惹啊~…热地好像手都要烫伤了${heart(1)}」`); // :3359
        await era.printAndWait(`「为了不伤到大鸡巴会温柔得做的…请尽情地享受吧~${heart(1)}」`); // :3360
        // 奉仕精神Lv3以上 // :3361
      } else if (ABL:TARGET:16 >= 3) { // :3362
        await era.printAndWait(`「啊啊~…这么烫…好、好的…会温柔…地、地做的啦………」`); // :3363
        // それ以外（侍奉精神Lv3未満） // :3364
      } else { // :3365
        await era.printAndWait(`「呜呜~…居，居然要握住这种东西…啊啊~…好、好烫…的啊………」`); // :3366
      } // :3367
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3368
      era.set(`cflag:${target}:TARGET:331`, 1); // :3368
      return 0; // :3369
      // 二回目以降 // :3370
    } else { // :3371
      // 淫乱＋侍奉精神Lv3以上 // :3372
      if (TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 6 || FLAG:7 == 2)) { // :3373
        if (TALENT:PLAYER:318 == 1) { // :3374
          // 巨根 // :3375
          await era.printAndWait(`「雄伟的大肉棒……把这放到女人的阴道里……咽口水${heart(1)}」`); // :3376
        } else if (TALENT:PLAYER:318 == 2) { // :3377
          // 短小包茎 // :3378
          await era.printAndWait(`「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢${heart(1)}　这样子还不够挑逗女人哦？${heart(1)}」`); // :3379
        } else if (TALENT:PLAYER:318 == 3) { // :3380
          // 包茎 // :3381
          await era.printAndWait(`「最喜欢剥开……包茎的外皮了${heart(1)}　味道简直让人受不了${heart(1)}」`); // :3382
        } else if (TALENT:PLAYER:318 == 4) { // :3383
          // 馬ペニス // :3384
          await era.printAndWait(`「这样的马肉棒，插进来的话一定会让女人疯掉的吧${heart(1)}」`); // :3385
        } // :3386
        if (RAND:2 == 0) { // :3387
          await era.printAndWait(`「啊哈啊~…大鸡巴~${heart(1)} ${sc()}会更加加油地撸的…${heart(1)}」`); // :3388
          await era.printAndWait(`「请尽情地射出来…变得舒服起来吧${heart(1)}」`); // :3389
        } else { // :3390
          await era.printAndWait(`「啊啊~…明明只是用手握住侍奉而已…${sc()}的那里就湿掉了真是毫无办法呢~${heart(1)}」`); // :3391
          await era.printAndWait(`「哈啊啊~…看着大鸡巴变舒服起来…${sc()}也都…啊啊~${heart(3)}」`); // :3392
        } // :3393
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :3394
        era.set(`cflag:${target}:331`, 7); // :3394
        // 淫乱 // :3395
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:331 <= 5 || FLAG:7 == 2)) { // :3396
        await era.printAndWait(`「啊哈啊…大鸡巴…哈啊…居然那么地烫呢~…${heart(1)}」`); // :3397
        await era.printAndWait(`「啊啊~…只是握着就要忍不住了啊…主人~…${heart(1)}」`); // :3398
        await era.printAndWait(`压榨着阴茎的${target_name}一脸好像很难受的样子看着你………`); // :3399
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :3400
        era.set(`cflag:${target}:331`, 6); // :3400
        // 爱＋侍奉精神Lv5 // :3401
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:331 <= 4 || FLAG:7 == 2)) { // :3402
        if (TALENT:PLAYER:318 == 1) { // :3403
          // 巨根 // :3404
          await era.printAndWait(`「雄伟的大肉棒啊……把这个插进${sc()}的里面来……咽口水${heart(1)}」`); // :3405
        } else if (TALENT:PLAYER:318 == 2) { // :3406
          // 短小包茎 // :3407
          await era.printAndWait(`「小孩子似的鲜肉棒棒，拼尽全力地勃起着呢${heart(1)}　真是可爱${heart(1)}」`); // :3408
        } else if (TALENT:PLAYER:318 == 3) { // :3409
          // 包茎 // :3410
          await era.printAndWait(`「就喜欢剥开……包茎的外皮了${heart(1)}　你的味道真是让人受不了${heart(1)}」`); // :3411
        } else if (TALENT:PLAYER:318 == 4) { // :3412
          // 馬ペニス // :3413
          await era.printAndWait(`「这样的马肉棒，插进来的话一定会让我疯掉的吧${heart(1)}」`); // :3414
        } // :3415
        if (RAND:2 == 0) { // :3416
          await era.printAndWait(`「啊啊~♪…明明只是用手握住侍奉而已…脑袋就变得奇怪起来了♪」`); // :3417
          await era.printAndWait(`「居然让${target_name}变得那么H起来…这个大鸡巴真是坏呢~${heart(1)}」`); // :3418
          await era.printAndWait(`「${target_name}会专注地侍奉的~…在大人您满足之前…会一直侍奉下去的…${heart(3)}」`); // :3419
        } else { // :3420
          await era.printAndWait(`「啊哈啊~♪大鸡巴舒服吗~？」`); // :3421
          await era.printAndWait(`「只是撸着大鸡巴…${sc()}好像也变得舒服起来了呀♪」`); // :3422
          await era.printAndWait(`「撒~…请变得更加舒服起来吧${heart(3)}」`); // :3423
        } // :3424
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :3425
        era.set(`cflag:${target}:331`, 5); // :3425
        // 爱慕 // :3426
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:331 <= 3 || FLAG:7 == 2)) { // :3427
        await era.printAndWait(`「啊啊…给大鸡巴侍奉真是高兴呢~…${heart(1)}」`); // :3428
        await era.printAndWait(`「${sc()}的手中这个顽皮的家伙~…啊啊~一跳一跳地~…真是一个十分可爱得东西呢~${heart(1)}」`); // :3429
        await era.printAndWait(`「${sc()}…会让大人您更加舒服起来的~${heart(1)}」`); // :3430
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :3431
        era.set(`cflag:${target}:331`, 4); // :3431
        // 侍奉精神Lv3以上 // :3432
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 2 || FLAG:7 == 2)) { // :3433
        await era.printAndWait(`「啊啊~…大鸡巴…居然那么热…啊啊…总觉得…气氛好奇怪了呢~♪」`); // :3434
        await era.printAndWait(`「这样做的话…就会变舒服起来对吧~…？」`); // :3435
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :3436
        era.set(`cflag:${target}:331`, 3); // :3436
        // それ以外（侍奉精神Lv3未満） // :3437
      } else if (CFLAG:331 <= 1 || FLAG:7 == 2) { // :3438
        await era.printAndWait(`「哈啊…哈啊…好，好热…这个…手好像要变奇怪了啊………」`); // :3439
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :3440
        era.set(`cflag:${target}:331`, 2); // :3440
      } // :3441
      return 0; // :3442
    } // :3443
  } // :3444


  // ------------------------------------------------- // :3447
  // 口交 CFLAG:332 // :3448
  // ------------------------------------------------- // :3449
  if (SELECTCOM == 31) { // :3450
    // 初めて // :3451
    if (CFLAG:TARGET:332 == 0) { // :3452
      // 淫乱 // :3453
      if (TALENT:TARGET:76 == 1) { // :3454
        await era.printAndWait(`「哈呜嗯~${heart(1)} 大鸡巴…随便怎样舔都可以对吧~${heart(1)}」`); // :3455
        await era.printAndWait(`「${target_name}会尽~情地…用嘴巴来侍奉的~${heart(1)}…啊啊~唔嗯…哈唔嗯~${heart(1)}」`); // :3456
        await era.printAndWait(`${target_name}好像很高兴地将嘴巴张开口水就立马流下来滴到了将要含下去的阴茎上………`); // :3457
        // 爱慕 // :3458
      } else if (TALENT:TARGET:85 == 1) { // :3459
        await era.printAndWait(`「虽，虽然很害羞来的…${target_name}会侍奉…这个…又热又硬的东西的~…${heart(1)}」`); // :3460
        await era.printAndWait(`「嗯啊~…哈嗯~…嗯~…嗯嗯呜…哈啊…嗯~…啾呜~${heart(1)} 啾呜~${heart(1)}」`); // :3461
        await era.printAndWait(`${target_name}很高兴继续着对阴茎的侍奉………`); // :3462
        // 奉仕精神Lv3以上 // :3463
      } else if (ABL:TARGET:16 >= 3) { // :3464
        await era.printAndWait(`「是、是的…${heart(1)}会…侍奉的…的……呜嗯嗯……」`); // :3465
        await era.printAndWait(`「嗯哈啊~…嗯~…嗯哼~…嗯~…哈啊啊…啊啊~」`); // :3466
        // それ以外（奉仕精神Lv3未満） // :3467
      } else { // :3468
        await era.printAndWait(`「嗯呜…明，明明都这样了…还要用${scf()}、${sc()}的嘴巴来…啊啊…好、好过分的啊…嗯…啾…啾呜…」`); // :3469
      } // :3470
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :3471
      era.set(`cflag:${target}:TARGET:332`, 1); // :3471
      return 0; // :3472
      // 二回目以降 // :3473
    } else { // :3474
      // 淫乱 // :3475
      if (TALENT:TARGET:76 == 1 && (CFLAG:332 <= 4 || FLAG:7 == 2)) { // :3476
        if (RAND:3 == 0) { // :3477
          await era.printAndWait(`「啊哈啊~~…会好好地吮吸大鸡巴的噢~～${heart(1)}」`); // :3478
          await era.printAndWait(`「嗯呜~…嗯哼呜呜~…嗯啾~…啾噗嗯~…啾~…嗯~${heart(1)}嗯~${heart(1)}嗯~${heart(3)}」`); // :3479
          await era.printAndWait(`${target_name}一副下流地姿态用嘴巴侍奉阴茎………`); // :3480
        } else if (RAND:2 == 0) { // :3481
          await era.printAndWait(`${target_name}只是闻着阴茎的味道、表情就变得荡漾起来了。`); // :3482
          await era.printAndWait(`「大鸡巴~…嗯啾~${heart(1)} 好喜欢~…大鸡巴好喜欢~${heart(3)}」`); // :3483
          await era.printAndWait(`「啊啊~…大鸡巴…太喜欢了啊~~…${heart(1)} 啊啊~…不行了~…哈呜嗯~…啾噜啾呜...啾呜呜呜~${heart(3)}」`); // :3484
        } else { // :3485
          await era.printAndWait(`${target_name}很高兴地含下出现在眼前的阴茎。`); // :3486
          await era.printAndWait(`「嗯呜~…啾~${heart(1)} 啾~${heart(1)} 啾呜~~${heart(1)} 大鸡巴…大鸡巴…好好吃啊~~${heart(3)}」`); // :3487
          await era.printAndWait(`「精液${heart(1)}…请尽情地${heart(1)} 将全部的精液都射出来吧~${heart(1)}」`); // :3488
        } // :3489
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :3490
        era.set(`cflag:${target}:332`, 5); // :3490
        // 爱慕 // :3491
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:332 <= 3 || FLAG:7 == 2)) { // :3492
        if (RAND:3 == 0) { // :3493
          await era.printAndWait(`「嗯哼唔~…好热好硬的东西哈啊~~${heart(1)} 请用${sc()}嘴巴来…尽情地享受吧${heart(1)}」`); // :3494
          await era.printAndWait(`${target_name}好像很高兴地一样眯着眼睛将阴茎放入了嘴巴里。`); // :3495
          await era.printAndWait(`「哈呜嗯${heart(1)} 嗯~${heart(1)} 嗯呼呜~${heart(1)}…啾~…啾噗…呸咯~♪」`); // :3496
        } else if (RAND:2 == 0) { // :3497
          await era.printAndWait(`「啊哈啊~…其实最喜欢用嘴巴侍奉了呢~${heart(1)}」`); // :3498
          await era.printAndWait(`「因为~…将那么可爱阴茎放进嘴里后…就会一跳一跳地好像很舒服地一样动着呢~…啊呜嗯${heart(1)}」`); // :3499
          await era.printAndWait(`「嗯呜嗯~♪嗯~嗯嗯~…啾呜~…啾噗呜~…呸咯~…噗哈啊~…呐~~${heart(1)} 已经上瘾了呢~${heart(1)}」`); // :3500
        } else { // :3501
          await era.printAndWait(`「啊啊…是个最喜欢大鸡巴的变态真是对不起…${heart(1)}」`); // :3502
          await era.printAndWait(`「但是~…吮吸…停不下来呐~…${heart(1)} 嗯啾…啾~…啾噗~…呜哼呜呼~♪」`); // :3503
          await era.printAndWait(`「嗯~嗯~嗯呼呜~…啊啊~…请原谅吧~…请将精~液射到${target_name}的嘴巴里吧~${heart(3)}」`); // :3504
        } // :3505
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :3506
        era.set(`cflag:${target}:332`, 4); // :3506
        // 侍奉精神Lv3以上 // :3507
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:332 <= 2 || FLAG:7 == 2)) { // :3508
        await era.print(`「哈啊…哈啊…嗯啾~…啾~…啾噗嗯~…是、是的…专注于…前端…的对吧~…」`); // :3509
        await era.printAndWait(`「哈啊啊~…啊啊~…先走汁…出来好多了~♪ 嗯啾~…啾~♪」`); // :3510
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :3511
        era.set(`cflag:${target}:332`, 3); // :3511
        // それ以外（奉仕精神Lv3未満） // :3512
      } else if (CFLAG:332 <= 1 || FLAG:7 == 2) { // :3513
        await era.printAndWait(`「这样的…明、明明不要的…啾~…啾~…呸咯…」`); // :3514
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :3515
        era.set(`cflag:${target}:332`, 2); // :3515
      } // :3516
      return 0; // :3517
    } // :3518
  } // :3519

  // ------------------------------------------------- // :3521
  // 乳交 CFLAG:333 // :3522
  // ------------------------------------------------- // :3523
  if (SELECTCOM == 32) { // :3524
    // 初めて // :3525
    if (CFLAG:TARGET:333 == 0) { // :3526
      // 淫乱 // :3527
      if (TALENT:TARGET:76 == 1) { // :3528
        await era.printAndWait(`「用胸部来侍奉什么的~…${heart(1)}」`); // :3529
        await era.printAndWait(`「嗯哼哼~…请用${sc()}下流的胸部来、尽情地享受吧~${heart(3)}」`); // :3530
        // 愛 // :3531
      } else if (TALENT:TARGET:85 == 1) { // :3532
        await era.printAndWait(`「真、真是的…用胸部来，夹住什么的~…♪」`); // :3533
        await era.printAndWait(`「虽然早就习惯了大人您的变态癖好了…嗯、是的、当然会好好地给大人侍奉的啦~~${heart(1)}」`); // :3534
        await era.printAndWait(`${target_name}露出了如同恶作剧一般地笑容、用胸部将阴茎夹住了………`); // :3535
        // 侍奉精神Lv3以上 // :3536
      } else if (ABL:TARGET:16 >= 3) { // :3537
        await era.printAndWait(`「用，用胸部来夹住什么的…啊~…嗯~…胸部好热啊~…♪」`); // :3538
        // それ以外（奉仕精神Lv3未満） // :3539
      } else { // :3540
        await era.printAndWait(`「呜…这、这样的会感觉到舒服吗………？」`); // :3541
      } // :3542
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :3543
      era.set(`cflag:${target}:TARGET:333`, 1); // :3543
      return 0; // :3544
      // 二回目以降 // :3545
    } else { // :3546
      // 淫乱＋侍奉精神Lv5 // :3547
      if (TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:332 <= 6 || FLAG:7 == 2)) { // :3548
        if (RAND:2 == 0) { // :3549
          await era.printAndWait(`「啊啊~…大鸡巴好热啊~…胸部好舒服的啊~${heart(1)}」`); // :3550
          await era.printAndWait(`「嗯~…啊嗯~…大鸡巴好像也很舒服的样子啊~~~♪」`); // :3551
          if (TALENT:TARGET:110 == 1 || TALENT:TARGET:114 == 1 || TALENT:TARGET:119 == 1) { // :3553
            await era.printAndWait(`「请在${sc()}柔软的胸部上…尽情地射出来吧~~${heart(1)}」`); // :3553
          } // :3553
          await era.printAndWait(`${target_name}一脸荡漾的表情继续着侍奉………`); // :3554
        } else { // :3555
          await era.printAndWait(`「嗯哼哼呜~…用胸部做很舒服吗~？」`); // :3556
          await era.printAndWait(`「感觉到大鸡巴好烫而且硬邦邦的…${sc()}太舒服了好像要变奇怪了呀~${heart(1)}」`); // :3557
          await era.printAndWait(`${target_name}将舌头下流地伸出来、好像现在就会将阴茎吞下去………`); // :3558
        } // :3559
        // CFLAG:333  = 7（变量语义：CFLAG 族，333） // :3560
        era.set(`cflag:${target}:333`, 7); // :3560
        // 淫乱 // :3561
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:332 <= 5 || FLAG:7 == 2)) { // :3562
        await era.printAndWait(`「啊啊~…大鸡巴好热啊~…胸部好舒服啊~${heart(1)}」`); // :3563
        await era.printAndWait(`「嗯~…啊嗯~…大鸡巴好像也很舒服的样子啊~~~♪」`); // :3564
        if (TALENT:TARGET:110 == 1 || TALENT:TARGET:114 == 1 || TALENT:TARGET:119 == 1) { // :3566
          await era.printAndWait(`「请在${sc()}柔软的胸部上…尽情地射出来吧~~${heart(1)}」`); // :3566
        } // :3566
        await era.printAndWait(`${target_name}一脸荡漾的表情继续着侍奉………`); // :3567
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :3568
        era.set(`cflag:${target}:333`, 6); // :3568
        // 爱＋侍奉精神Lv5 // :3569
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:333 <= 4 || FLAG:7 == 2)) { // :3570
        if (RAND:2 == 0) { // :3571
          await era.printAndWait(`「嗯~…啊啊~…要用${sc()}的胸部来侍奉的对吧~♪」`); // :3572
          if (TALENT:TARGET:110 == 1 || TALENT:TARGET:114 == 1 || TALENT:TARGET:119 == 1) { // :3574
            await era.printAndWait(`「…明明…以前只觉得这种东西只是妨碍而已~${heart(1)}」`); // :3574
          } // :3574
          await era.printAndWait(`「能给大人您派上用场真是好高兴呢~${heart(3)}」`); // :3575
        } else { // :3576
          await era.printAndWait(`「啊啊~…请用${sc()}的胸部来…尽情地享受吧~${heart(1)}」`); // :3577
          await era.printAndWait(`「这个胸部是为了大人您而存在得…终于明白了呢~${heart(3)}」`); // :3578
        } // :3579
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :3580
        era.set(`cflag:${target}:333`, 5); // :3580
        // 爱慕 // :3581
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:333 <= 3 || FLAG:7 == 2)) { // :3582
        await era.printAndWait(`「嗯~…啊啊~…要用${sc()}的胸部来侍奉的对吧~♪」`); // :3583
        if (TALENT:TARGET:110 == 1 || TALENT:TARGET:114 == 1 || TALENT:TARGET:119 == 1) { // :3585
          await era.printAndWait(`「…明明…以前只觉得这种东西只是妨碍而已~${heart(1)}」`); // :3585
        } // :3585
        await era.printAndWait(`「能给大人您派上用场真是好高兴呢~${heart(3)}」`); // :3586
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :3587
        era.set(`cflag:${target}:333`, 4); // :3587
        // 侍奉精神Lv3以上 // :3588
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:333 <= 2 || FLAG:7 == 2)) { // :3589
        await era.printAndWait(`「嗯~...会好好地用♪……啊啊~…是、是的~…会用胸部来侍奉的~…」`); // :3590
        await era.printAndWait(`「啊~…好、好奇怪啊…碰到大鸡巴的地方…好热…好舒服啊~…嗯~♪」`); // :3591
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :3592
        era.set(`cflag:${target}:333`, 3); // :3592
        // それ以外（奉仕精神Lv3未満） // :3593
      } else if (CFLAG:333 <= 1 || FLAG:7 == 2) { // :3594
        await era.printAndWait(`「哈啊…哈啊…胸部…好热…的啊………」`); // :3595
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :3596
        era.set(`cflag:${target}:333`, 2); // :3596
      } // :3597
      return 0; // :3598
    } // :3599
  } // :3600


  // ------------------------------------------------- // :3603
  // 股间性交 CFLAG:334 // :3604
  // ------------------------------------------------- // :3605
  if (SELECTCOM == 33) { // :3606
    // 初めて // :3607
    if (CFLAG:TARGET:334 == 0) { // :3608
      // 淫乱 // :3609
      if (TALENT:TARGET:76 == 1) { // :3610
        await era.printAndWait(`「啊~…嗯呜~…${sc()}什么时候都准备好来着的~…也不插进来…就这样做什么的…${heart(1)}」`); // :3611
        await era.printAndWait(`「啊~啊~啊啊~…啊啊~…在摩擦着呢~…${heart(1)}」`); // :3612
        // 愛有り // :3613
      } else if (TALENT:TARGET:85 == 1) { // :3614
        await era.printAndWait(`「啊啊~…真的好害羞啊~…♪」`); // :3615
        await era.printAndWait(`「将大鸡巴用股间夹住…来侍奉什么的♪」`); // :3616
        await era.printAndWait(`${target_name}虽然嘴上说着这样的话，但其实很高兴地用股间来侍奉着………`); // :3617
        // それ以外（愛無し） // :3618
      } else { // :3619
        await era.printAndWait(`「啊啊~…不、不要啊啊…${sc()}的爱液…居然漏出来了………」`); // :3620
      } // :3621
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :3622
      era.set(`cflag:${target}:TARGET:334`, 1); // :3622
      return 0; // :3623
      // 二回目以降 // :3624
    } else { // :3625
      // 淫乱+处女 // :3626
      if (TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && (CFLAG:334 <= 5 || FLAG:7 == 2)) { // :3627
        await era.printAndWait(`「啊啊嗯~…${heart(1)} ${sc()}的小穴想要被怎样做…明白的吧~？」`); // :3628
        await era.printAndWait(`「明明这个…淫乱小穴的深处…想…想要被大鸡巴抽插地死去活来的，明明想要献上处女来的~♪」`); // :3629
        await era.printAndWait(`「主人~...拜托了~…快点…快点…请侵犯了${sc()}吧~~~${heart(3)}」`); // :3630
        await era.printAndWait(`哪怕意识变得奇怪起来了、${target_name}也没有停止用股间侍奉………`); // :3631
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :3632
        era.set(`cflag:${target}:334`, 6); // :3632
        // 淫乱 // :3633
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:334 <= 4 || FLAG:7 == 2)) { // :3634
        await era.printAndWait(`「啊啊~…好热的啊~…明明给大鸡巴酱侍奉才可以~啊嗯~${heart(1)}」`); // :3635
        await era.printAndWait(`「只是夹着而已…爱液就停不下来了啊~~${heart(1)} 啊啊~…是个淫乱小穴真的是对不起${heart(1)}」`); // :3636
        await era.printAndWait(`「啊~…哈呜~…哈呜~…嗯啊啊啊~${heart(1)} 会、会好好地用股间来侍奉的~~♪」`); // :3637
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :3638
        era.set(`cflag:${target}:334`, 5); // :3638
        // 爱有り+处女 // :3639
      } else if (TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && (CFLAG:334 <= 3 || FLAG:7 == 2)) { // :3640
        await era.printAndWait(`「啊啊~…嗯哼唔~…不要…不要的啊~…明明${sc()}还是…处女来的啊~…♪」`); // :3641
        await era.printAndWait(`「大鸡巴的形状，还有热度…啊啊~…都要用股间记下来了呀~${heart(3)}」`); // :3642
        await era.printAndWait(`「请原谅…请原谅${sc()}吧~…再继续这样的侍奉的话，脑袋就要变奇怪了呀~」`); // :3643
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :3644
        era.set(`cflag:${target}:334`, 4); // :3644
        // 愛有り // :3645
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:334 <= 2 || FLAG:7 == 2)) { // :3646
        await era.printAndWait(`「哈啊~…好热啊~…大鸡巴好热啊啊~………${heart(1)}」`); // :3647
        await era.printAndWait(`${target_name}的脸变得通红发烫、慢慢地动起了腰部。`); // :3648
        await era.printAndWait(`「啊啊~…已经…已经要忍不住了啊~…大鸡巴…请给大鸡巴吧~${heart(3)}」`); // :3649
        await era.printAndWait(`${player_name}抓住${target_name}的腰，如同拒绝插进去一样，用阴茎摩擦着${target_name}的蜜穴………`); // :3650
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :3651
        era.set(`cflag:${target}:334`, 3); // :3651
        // それ以外（爱無し） // :3652
      } else if (CFLAG:334 <= 1 || FLAG:7 == 2) { // :3653
        await era.printAndWait(`「啊~…嗯~…这、这样…明明只是被大鸡巴摩擦着而已………」`); // :3654
        await era.printAndWait(`「爱、爱液…黏糊糊地…停不下来了呀~………」`); // :3655
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :3656
        era.set(`cflag:${target}:334`, 2); // :3656
      } // :3657
      return 0; // :3658
    } // :3659
  } // :3660


  // ------------------------------------------------- // :3663
  // 骑乘位 CFLAG:335 // :3664
  // ------------------------------------------------- // :3665
  if (SELECTCOM == 34) { // :3666
    // 初めて // :3667
    if (CFLAG:TARGET:335 == 0) { // :3668
      // 处女 // :3669
      if (TALENT:0 == 1) { // :3670
        // 淫乱 // :3671
        if (TALENT:TARGET:76 == 1) { // :3672
          // 高贵ダークエルフ // :3673
          if (TALENT:TARGET:314 == 7) { // :3674
            await era.printAndWait(`${target_name}兴奋地舔着嘴唇坐在了${player_name}的身上。`); // :3675
            await era.printAndWait(`「啊啊啊${heart(1)}…”自己献上处女吧~”像这样这样的命令什么的…主人可知道${sc()}到底等了这样命令等了多久了呀~${heart(1)}」`); // :3676
            await era.printAndWait(`「除了主人之外从来没有给别人看过摸过的主人专属小穴来的噢…${heart(1)}」`); // :3677
            await era.printAndWait(`${target_name}呵呵地笑着用双手将小穴给张开了。`); // :3678
            await era.printAndWait(`「请，请看一下…${sc()}的处女小穴…是要吃掉主人的大鸡巴的地方来的${heart(3)}」`); // :3679
            await era.printAndWait(`${target_name}慢慢地将腰部坐下来…阴茎往着还没有习惯的腔穴的里面慢慢地挤进去。`); // :3680
            await era.printAndWait(`「噢~、噢噢噢~${heart(3)}到深、深处了…已经全部都进到里面去了啊啊~${heart(5)}」`); // :3681
            await era.printAndWait(`${target_name}的处女膜被一点一点地捅破穿过、将${player_name}的阴茎全部吞了进去。`); // :3682
            await era.printAndWait(`「呜嗯~…啊~…哈啊~…啊、啊啊啊啊啊~～${heart(5)} 进、进去了啊~…${heart(1)}」`); // :3683
            // それ以外 // :3684
          } else { // :3685
            // 故郷に恋人がいる場合 // :3686
            if (TALENT:TARGET:317 == 4) { // :3687
              await era.printAndWait(`「接，接下来…很荣幸将淫乱${target_name}的处女小穴…奉献给主人~…${heart(1)}」`); // :3688
              await era.printAndWait(`${target_name}脸通红着用双手将蜜穴张开。`); // :3689
              await era.printAndWait(`「………其实${sc()}、在故乡里有着婚约者呢…名字？样子？…那种东西…已经都忘掉了呀~…${heart(1)}」`); // :3690
              await era.printAndWait(`「因为…接下来${sc()}会一直都是主人的东西来的了呀~${heart(1)}」`); // :3691
              await era.printAndWait(`${target_name}将阴茎对准了蜜穴、慢慢地将腰部降下来了。`); // :3692
              await era.printAndWait(`「啊啊~…${sc()}已经…是主人的东西来的了呀${heart(1)} 请一直…使唤${sc()}吧…${heart(3)}」`); // :3693
            } else { // :3694
              await era.printAndWait(`「接、接下来…很荣幸将淫乱${target_name}的处女小穴…奉献给主人~…${heart(1)}」`); // :3695
              await era.printAndWait(`${target_name}脸通红着用双手将蜜穴张开。`); // :3696
              await era.printAndWait(`「啊啊~…从今以后…小穴要被操到死去活来的日子要到了对吧~${heart(1)}」`); // :3697
              await era.printAndWait(`「早中晚从不休息…一直都被主人给侵犯的日子…啊啊~${heart(1)}…啊啊啊~${heart(1)}」`); // :3698
              await era.printAndWait(`${target_name}将阴茎对准了蜜穴、慢慢地将腰部降下来了。`); // :3699
              await era.printAndWait(`${target_name}处女膜被一点一点地捅破穿过、将${player_name}的阴茎全部吞了进去。`); // :3700
              await era.printAndWait(`「啊~…啊啊…好棒…好棒啊~…主人的全部…都好想要啊~~…啊~啊啊啊~${heart(1)}」`); // :3701
            } // :3702
          } // :3703
          // 爱慕 // :3704
        } else if (TALENT:TARGET:85 == 1) { // :3705
          // 高贵エルフ // :3706
          if (TALENT:TARGET:314 == 1) { // :3707
            await era.printAndWait(`「虽，虽然…明白大人您是魔王来的…~！」`); // :3708
            await era.printAndWait(`「但，但是自己将处女献上什么的………太、太不知羞耻了！」`); // :3709
            await era.printAndWait(`长长的耳朵的前端完全变得通红的${target_name}，一边抱怨着，一边在你身上扒开了自己的蜜穴。`); // :3710
            await era.printAndWait(`「但，但是…啊嗯~${heart(1)}…大人您…嗯~${heart(1)}…无论如何…都~${heart(1)}…要${target_name}这样做的话…啊啊~${heart(1)}」`); // :3711
            await era.printAndWait(`每当${target_name}的蜜穴摩擦着阴茎的时候都会发出H的娇喘、长长的耳朵好像很害羞地一样一抖一抖地。`); // :3712
            await era.printAndWait(`「魔、魔王大人…拜托…请将精灵族的…姑、姑娘一直保护到现在的…纯、纯洁给…夺…嗯~…夺走吧~~${heart(5)}」`); // :3713
            await era.printAndWait(`${target_name}说完后就自己将腰压下来、为了献上处女而将异物塞进了的腔内的深处………`); // :3714
            // それ以外 // :3715
          } else { // :3716
            // 故郷に恋人がいる場合 // :3717
            if (TALENT:TARGET:317 == 4) { // :3718
              await era.printAndWait(`「啊啊~${heart(1)} 是、是的…${sc()}作为原勇者的${target_name}的…不为了其它人而是为了大人您而留下来的处女现在奉献给您~${heart(1)}」`); // :3719
              await era.printAndWait(`${target_name}就像骑马一样骑在${player_name}身上，用一只手撑住保持平衡，然后用另一只手将${player_name}的阴茎对准蜜穴。`); // :3720
              await era.printAndWait(`「请让${sc()}…成为…大人您的东西吧~~${heart(1)}」`); // :3721
              await era.printAndWait(`${target_name}慢慢地将腰扭动着压下去。${player_name}的阴茎将其处女膜捅破穿过、${target_name}的脸因为破瓜之痛而扭曲了。`); // :3722
              await era.printAndWait(`「嗯呜~…！啊啊~…请让${sc()}一直呆在大人您的身旁吧………${heart(1)}」`); // :3723
              await era.printAndWait(`${target_name}突然感到了心塞了一下、而那个原因早就被她所忘记了………`); // :3724
            } else { // :3725
              await era.printAndWait(`「啊啊啊~${heart(1)} 哈啊…啊啊~…居然是…这样地一种方式献上纯洁什么的…${heart(1)}」`); // :3726
              await era.printAndWait(`「不过…请让${sc()}成为大人您的东西吧…${heart(1)} 请在${sc()}的身体里刻上大人您的印记吧~${heart(1)}」`); // :3727
              await era.printAndWait(`${player_name}将${target_name}的腰部抓住，强硬地往下拉、将${target_name}的处女膜给捅破了。`); // :3728
              await era.printAndWait(`「哼唔啊啊~…！啊啊~…请从今以后...好好地珍惜${sc()}的这里吧~……${heart(1)}」`); // :3729
            } // :3730
          } // :3731
          // それ以外（爱無し） // :3732
        } else { // :3733
          // 故郷に恋人がいる場合 // :3734
          if (TALENT:TARGET:317 == 4) { // :3735
            await era.printAndWait(`「啊啊~…不要…不要啊…这样啊…啊啊~…啊…不、不行…的啊…哼唔…哼呜呜！」`); // :3736
            await era.printAndWait(`「对不起…真的...对不起………${scf()}、${sc()}太弱…的原因…啊啊…啊…………啊哼…哼啊啊！」`); // :3737
            await era.printAndWait(`${target_name}一边向着故乡的恋人道歉一边被${player_name}从下往上地抽插侵犯着………`); // :3738
          } else { // :3739
            await era.printAndWait(`「呜…这，这样得…不、不行的啊…请、请原谅吧…自己来做什么的…完全不行啊………」`); // :3740
            await era.printAndWait(`${player_name}将${target_name}的腰抓住后，直接强硬地插进去了………`); // :3741
          } // :3742
        } // :3743
        // 非处女 // :3744
      } else { // :3745
        // 淫乱 // :3746
        if (TALENT:76 == 1) { // :3747
          await era.printAndWait(`「啊啊~…${target_name}会好好侍奉主人的~${heart(1)} 」`); // :3748
          await era.printAndWait(`「请尽情享受淫乱${target_name}的淫乱的舞蹈吧~…${heart(1)}」`); // :3749
          // 愛 // :3750
        } else if (TALENT:85 == 1) { // :3751
          await era.printAndWait(`「啊~、请不要这样盯着看啦~…${heart(1)}」`); // :3752
          await era.printAndWait(`「连接在一起的地方…啊~啊啊啊~…♪ 好像要融化掉了呀~…${heart(1)}」`); // :3753
          // それ以外 // :3754
        } else { // :3755
          await era.printAndWait(`「啊~啊啊啊...不、不行的啊~~…再这样…就太羞耻了动不了了…啊~啊啊啊~！请不要向上顶啊啊~」`); // :3756
        } // :3757
      } // :3758
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :3759
      era.set(`cflag:${target}:TARGET:335`, 1); // :3759
      return 0; // :3760
      // 二回目以降 // :3761
    } else { // :3762
      // 淫乱 // :3763
      if (TALENT:TARGET:76 == 1 && (CFLAG:335 <= 5 || FLAG:7 == 2)) { // :3764
        if (RAND:4 == 0) { // :3765
          await era.printAndWait(`「啊啊~…腰要…停不下来了啊~${heart(1)} 主人~…太舒服了~…呜~${heart(1)}啊啊~${heart(1)}」`); // :3766
          await era.printAndWait(`「变成喜欢大鸡巴的淫乱女人真是对不起…在去之前${heart(1)}在去之前腰都不会停下来的啊啊~~${heart(3)}」`); // :3767
        } else if (RAND:3 == 0) { // :3768
          await era.printAndWait(`「嗯哼唔~${heart(1)} ${sc()}…好喜欢这种姿势啊…因为......因为啦~${heart(1)}」`); // :3769
          await era.printAndWait(`「能十分地感觉到…小穴…将大鸡巴给吞下去了呢~${heart(3)}啊啊~…好舒服啊啊~${heart(1)}」`); // :3770
        } else if (RAND:2 == 0) { // :3771
          await era.printAndWait(`「啊啊~${heart(1)}…那么淫乱真的很对不起~…自己就…随便地…变得舒服起来了真是对不起${heart(1)}」`); // :3772
          await era.printAndWait(`「大鸡巴太舒服了呀~~…啊啊~…请用大鸡巴…更多地…操到${sc()}失神为止吧~~${heart(1)}」`); // :3773
        } else { // :3774
          await era.printAndWait(`「噢~噢~哦哈啊啊~${heart(1)}…啊啊~…不行不行不行不行~${heart(1)} 不行的啊~${heart(1)}」`); // :3775
          await era.printAndWait(`「再这样…大鸡巴塞进去的话…呜嗯呜啊啊~${heart(1)}」`); // :3776
          await era.printAndWait(`「整个人都要变奇怪了…脑袋里只能…想到大鸡巴而已了…${heart(3)}」`); // :3777
        } // :3778
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :3779
        era.set(`cflag:${target}:335`, 6); // :3779
        // 爱慕 // :3780
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:335 <= 4 || FLAG:7 == 2)) { // :3781
        if (RAND:4 == 0) { // :3782
          await era.printAndWait(`「大人您…不用动也没关系的啦啊~~…${heart(1)}」`); // :3783
          await era.printAndWait(`请将${sc()}所～有都交给${sc()}吧~${heart(1)} 啊~${heart(1)} 恶作剧可不行的呀~」`); // :3784
          await era.print(`「${sc()}会让大鸡巴…变得…嗯呜~…舒服起来的…啊~啊啊哈啊~…啊啊啊~…嗯~${heart(3)}」`); // :3785
        } else if (RAND:3 == 0) { // :3786
          await era.printAndWait(`「啊啊~…喜欢…好喜欢的啊~…${heart(1)} 像这样自己动起来的话…哦~噢噢~${heart(1)}」`); // :3787
          await era.printAndWait(`「就会明白…哦哈啊~${heart(1)} 大鸡巴进到了，进到了深处了啊~${heart(1)}」`); // :3788
          await era.printAndWait(`「哈嗯呜~…不行~…腰停不下来了啊~${heart(1)}在去之前完全停不下来啊~~${heart(1)}」`); // :3789
        } else if (RAND:2 == 0) { // :3790
          await era.printAndWait(`「啊~…啊啊~…真的是对不起${heart(1)} 因为大鸡巴塞到了里面去了…所以在去之前…腰完全停不下来的啊~${heart(1)}」`); // :3791
          await era.printAndWait(`「是个H的小穴真是对不起${heart(1)} 但是，但是…怎么都停不下来啊啊~${heart(1)}」`); // :3792
        } else { // :3793
          await era.printAndWait(`「啊啊~…就这样…根本不想离开了啊~~…${heart(1)}」`); // :3794
          await era.printAndWait(`「好想一直一直就这样…腰部融化跟大人您合为一体呀~…${heart(3)}」`); // :3795
        } // :3796
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :3797
        era.set(`cflag:${target}:335`, 5); // :3797
        // 屈服刻印Lv3＋V感覚Lv3以上 // :3798
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:335 <= 3 || FLAG:7 == 2)) { // :3799
        if (RAND:3 == 0) { // :3800
          await era.printAndWait(`「嗯哈啊~${heart(1)} 进…进到了…深处了呀~${heart(1)}」`); // :3801
          await era.printAndWait(`「啊啊~…这么…下流的样子…明明…完全不想晃动起腰部来的~…♪」`); // :3802
        } else if (RAND:2 == 0) { // :3803
          await era.printAndWait(`「啊哈啊~…♪ 啊~啊啊~嗯哼~${heart(1)} 进到了…深处了~…嗯嗯~♪」`); // :3804
          await era.printAndWait(`「明明…不能动的…腰却…自己动起来了啊~………♪」`); // :3805
        } else { // :3806
          await era.printAndWait(`「啊啊~…请、请不要看着啊…♪」`); // :3807
          await era.printAndWait(`「大鸡巴…太舒服了…请不要看着腰晃动的地方啦…啊啊~啊~♪」`); // :3808
        } // :3809
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :3810
        era.set(`cflag:${target}:335`, 4); // :3810
        // 屈服刻印Lv3 // :3811
      } else if (MARK:2 == 3 && (CFLAG:335 <= 2 || FLAG:7 == 2)) { // :3812
        await era.printAndWait(`「${sc()}会、会自己动的啦…请不要在下面往上，哈啊~…啊~啊啊~」`); // :3813
        await era.printAndWait(`「哼~…啊~…啊嗯~…嗯~…♪」`); // :3814
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :3815
        era.set(`cflag:${target}:335`, 3); // :3815
        // それ以外（愛無し、従順Lv5未満） // :3816
      } else if (CFLAG:335 <= 1 || FLAG:7 == 2) { // :3817
        await era.printAndWait(`「哈啊~啊…嗯~…明明…已经动不了…哈呜嗯~…啊啊…请不要欺负${sc()}………」`); // :3818
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :3819
        era.set(`cflag:${target}:335`, 2); // :3819
      } // :3820
      return 0; // :3821
    } // :3822
  } // :3823


  // ------------------------------------------------- // :3826
  // 全身擦洗 CFLAG:336 // :3827
  // ------------------------------------------------- // :3828
  if (SELECTCOM == 35) { // :3829
    // 初めて // :3830
    if (CFLAG:TARGET:336 == 0) { // :3831
      // 侍奉精神Lv3以上 // :3832
      if (ABL:TARGET:16 >= 3) { // :3833
        await era.printAndWait(`「嗯哼哼~…真是正好呢~、将每一个角落…都洗的干干净净地吧~${heart(1)}」`); // :3834
        await era.printAndWait(`「啊啊嗯~…那、那里是不能碰的啦~…♪」`); // :3835
        // それ以外 // :3836
      } else { // :3837
        await era.printAndWait(`「${scf()}、${sc()}只用身体来帮忙洗澡什么的…真、真是不知羞耻的事情啊！」`); // :3838
        await era.printAndWait(`${player_name}觉得，嘴上这么说但是已经在做准备的${target_name}是多么地惹人疼爱………`); // :3839
      } // :3840
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :3841
      era.set(`cflag:${target}:TARGET:336`, 1); // :3841
      return 0; // :3842
      // 二回目以降 // :3843
    } else { // :3844
      // 淫乱＋侍奉精神Lv5 // :3845
      if (TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:336 <= 4 || FLAG:7 == 2)) { // :3846
        await era.printAndWait(`「啊哈啊恩~…泡泡滑滑的真是舒服呢~${heart(1)}」`); // :3847
        await era.printAndWait(`「啊~${heart(1)}…嗯哼唔~${heart(1)}…唔哼哼~…啊啊嗯~、不能做恶作剧啦~${heart(1)}」`); // :3848
        await era.printAndWait(`${target_name}虽然仔细地洗着澡，但是不停地从蜜穴流出来得爱液都浪费掉了………`); // :3849
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :3850
        era.set(`cflag:${target}:336`, 5); // :3850
        // 愛＋奉仕精神Lv5 // :3851
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:336 <= 3 || FLAG:7 == 2)) { // :3852
        await era.printAndWait(`「嗯哼唔~${heart(1)} 大人请就这样坐着不动噢~${heart(1)}」`); // :3853
        await era.printAndWait(`「${sc()}会好好地帮大人洗干净的…哈嗯呜~…啊、那、那、那种地方也不用洗得很干净吧…哈嗯呜~${heart(1)}」`); // :3854
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :3855
        era.set(`cflag:${target}:336`, 4); // :3855
        // 侍奉精神Lv3以上 // :3856
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:336 <= 2 || FLAG:7 == 2)) { // :3857
        await era.printAndWait(`「嗯哼哼~…非常容易出泡泡呢~、这个肥皂…用起来十分地舒服呢~…」`); // :3858
        await era.printAndWait(`「啊啊嗯~…那、那里是不能摸得啦~…♪」`); // :3859
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :3860
        era.set(`cflag:${target}:336`, 3); // :3860
        // それ以外 // :3861
      } else if (CFLAG:336 <= 1 || FLAG:7 == 2) { // :3862
        await era.printAndWait(`「在、在洗澡的途中，如果…做、做什么奇怪的事情的话可是会让你好看的…啊、哈嗯呜~！！」`); // :3863
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :3864
        era.set(`cflag:${target}:336`, 2); // :3864
      } // :3865
      return 0; // :3866
    } // :3867
  } // :3868


  // ------------------------------------------------- // :3871
  // 骑乘位アナル CFLAG:337 // :3872
  // ------------------------------------------------- // :3873
  if (SELECTCOM == 36) { // :3874
    // 初めて // :3875
    if (CFLAG:TARGET:337 == 0) { // :3876
      // 淫乱 // :3877
      if (TALENT:TARGET:76 == 1) { // :3878
        await era.printAndWait(`「嗯哼哼~${heart(1)}…${target_name}会用肛穴来好好侍奉大人您的~${heart(1)}」`); // :3879
        await era.printAndWait(`「请尽情地变得舒服起来吧~${heart(3)}」`); // :3880
        // 愛 // :3881
      } else if (TALENT:TARGET:85 == 1) { // :3882
        await era.printAndWait(`「啊嗯~…啊啊~${heart(1)} 肛穴在…扩大着…呜嗯~…哈呜嗯~~…${heart(1)}」`); // :3883
        await era.printAndWait(`「哈啊恩~~${heart(1)} 大鸡巴…连根部都吞进去了呀~~~${heart(1)}」`); // :3884
        // それ以外（愛無し） // :3885
      } else { // :3886
        await era.printAndWait(`「呜啊…啊啊~…不要啊…屁股的洞在…扩、扩大着…哈呜，啊呜呜呜~」`); // :3887
      } // :3888
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :3889
      era.set(`cflag:${target}:TARGET:337`, 1); // :3889
      return 0; // :3890
      // 二回目以降 // :3891
    } else { // :3892
      // 淫乱＋A感覚Lv3以上 // :3893
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:337 <= 6 || FLAG:7 == 2)) { // :3894
        if (RAND:2 == 0) { // :3895
          await era.printAndWait(`「啊啊~${heart(1)} 主人…肛穴变得那么舒服真是对不起呜~${heart(1)}」`); // :3896
          await era.printAndWait(`「肛穴要…不行~${heart(1)}不行的呀~${heart(1)} 腰自己就动起来了呀${heart(1)}」`); // :3897
          await era.printAndWait(`「嗯啊啊~${heart(1)}请处罚不懂事的${sc()}吧！请尽情地处罚吧~~${heart(1)}」`); // :3898
        } else { // :3899
          await era.printAndWait(`「嗯~嗯哼啊~${heart(1)} 肛穴…在被侵犯着…在被侵犯着呢~${heart(3)}」`); // :3900
          await era.printAndWait(`${target_name}淫乱的笑着，淫猥地上下晃动着腰、肛穴正紧紧地挤压着阴茎。`); // :3901
          await era.printAndWait(`「啊啊~…弄坏掉吧…将${sc()}弄坏掉吧${heart(3)}」`); // :3902
        } // :3903
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :3904
        era.set(`cflag:${target}:337`, 7); // :3904
        // 淫乱 // :3905
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:337 <= 5 || FLAG:7 == 2)) { // :3906
        await era.printAndWait(`「嗯哈啊嗯~…肛穴SEX最棒了呀~~${heart(1)}」`); // :3907
        await era.printAndWait(`「呜哼哼~${heart(1)} 肛穴…居然会那么有感觉什么的…${sc()}是个淫乱的姑娘真是对不起~${heart(1)}」`); // :3908
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :3909
        era.set(`cflag:${target}:337`, 6); // :3909
        // 愛＋A感覚Lv3以上 // :3910
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:337 <= 4 || FLAG:7 == 2)) { // :3911
        if (RAND:2 == 0) { // :3912
          await era.printAndWait(`「啊啊~…肛门居然会那么地有感觉~…${heart(1)}」`); // :3913
          await era.printAndWait(`「哈啊嗯~${heart(1)}阴茎完美地和肛门重合了~${heart(1)}…啊啊~${heart(1)} 嗯~…不行~…腰要动起来了~~${heart(1)}」`); // :3914
        } else { // :3915
          await era.printAndWait(`「啊啊~${heart(1)} 真是对不起~…${sc()}是个肛门敏感的变态姑娘真的是对不起~~${heart(1)}」`); // :3916
          await era.printAndWait(`「啊啊嗯~${heart(1)} 哎~？…变得更加舒服也没关系吗…？」`); // :3917
          await era.printAndWait(`「大人~非常感谢…${sc()}…就要变成肛门有感觉的变态了~~${heart(3)}」`); // :3918
        } // :3919
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :3920
        era.set(`cflag:${target}:337`, 5); // :3920
        // 爱慕 // :3921
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:337 <= 3 || FLAG:7 == 2)) { // :3922
        await era.printAndWait(`「嗯啊啊~…请使用${sc()}H的肛门小穴来…尽~情地…变得舒服起来吧~~${heart(1)}」`); // :3923
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :3924
        era.set(`cflag:${target}:337`, 4); // :3924
        // A感覚Lv3以上 // :3925
      } else if (ABL:3 >= 3 && (CFLAG:337 <= 2 || FLAG:7 == 2)) { // :3926
        await era.printAndWait(`「啊啊嗯~…屁股的小穴…有感觉了~…${sc()}…要，要尽情地动起来了哦…${heart(1)}」`); // :3927
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :3928
        era.set(`cflag:${target}:337`, 3); // :3928
        // それ以外（愛無し、A感覚Lv3未満） // :3929
      } else if (CFLAG:337 <= 1 || FLAG:7 == 2) { // :3930
        await era.printAndWait(`「嗯呜~...啊啊…阴茎…连根部都…塞进去了…不、不行、不行的啊！」`); // :3931
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :3932
        era.set(`cflag:${target}:337`, 2); // :3932
      } // :3933
      return 0; // :3934
    } // :3935
  } // :3936


  // ------------------------------------------------- // :3939
  // 肛门侍奉 CFLAG:338 // :3940
  // ------------------------------------------------- // :3941
  if (SELECTCOM == 37) { // :3942
    // 初めて // :3943
    if (CFLAG:TARGET:338 == 0) { // :3944
      // 侍奉精神Lv3以上 // :3945
      if (ABL:TARGET:16 >= 3) { // :3946
        await era.printAndWait(`「啊啊…${sc()}…这种事情…还没有做过呢…啊啊~♪」`); // :3947
        await era.printAndWait(`${target_name}对着肛门用嘴巴侍奉起来了………`); // :3948
        // それ以外（奉仕精神Lv3未満） // :3949
      } else { // :3950
        await era.printAndWait(`「呜~…居，居然要用嘴巴往这种地方…嗯、恩呜呜…」`); // :3951
      } // :3952
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :3953
      era.set(`cflag:${target}:TARGET:338`, 1); // :3953
      return 0; // :3954
      // 二回目以降 // :3955
    } else { // :3956
      // 淫乱＋侍奉精神Lv5 // :3957
      if (TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:338 <= 4 || FLAG:7 == 2)) { // :3958
        await era.printAndWait(`「嗯呼呜~…主人的肛穴…${sc()}会尽情地侍奉起来得${heart(1)}」`); // :3959
        await era.printAndWait(`「啊啊~…每一片皱纹…都会舔干净${heart(3)}」`); // :3960
        await era.printAndWait(`「啾啾呜~…呸咯噢~…哦哈啊~…肛门里面的东西好好吃…嗯~嗯呃呜~${heart(1)}」`); // :3961
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :3962
        era.set(`cflag:${target}:338`, 5); // :3962
        // 愛＋奉仕精神Lv5 // :3963
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:338 <= 3 || FLAG:7 == 2)) { // :3964
        await era.print(`「啊啊~…连屁股的穴都要侍奉什么的…${heart(1)}」`); // :3965
        await era.print(`「嗯啾…嗯啾…嗯呼呜~…会更加呸咯呸咯地舔噢~${heart(1)}」`); // :3966
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :3967
        era.set(`cflag:${target}:338`, 4); // :3967
        // 侍奉精神Lv3以上 // :3968
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:338 <= 2 || FLAG:7 == 2)) { // :3969
        await era.printAndWait(`「嗯哈啊…啊~…嗯~…啾~…啾呜~…」`); // :3970
        await era.printAndWait(`「啊啊~…${sc()}的嘴巴…嗯~…嗯呼嗯~………」`); // :3971
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :3972
        era.set(`cflag:${target}:338`, 3); // :3972
        // それ以外（奉仕精神Lv3未満） // :3973
      } else if (CFLAG:338 <= 1 || FLAG:7 == 2) { // :3974
        await era.printAndWait(`「嗯啾…呸咯…啾…嗯呃………」`); // :3975
        await era.printAndWait(`「啊~…啊啊~…请、请原谅，已经…请原谅吧………」`); // :3976
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :3977
        era.set(`cflag:${target}:338`, 2); // :3977
      } // :3978
      return 0; // :3979
    } // :3980
  } // :3981

  // ------------------------------------------------- // :3983
  // 足交 CFLAG:339 // :3984
  // ------------------------------------------------- // :3985
  if (SELECTCOM == 38) { // :3986
    // 初めて // :3987
    if (CFLAG:TARGET:339 == 0) { // :3988
      await era.printAndWait(`「想要被踩吗~？……真是奇怪的兴趣来的呢~」`); // :3989
      // CFLAG:TARGET:339  = 1（变量语义：CFLAG 族，TARGET:339） // :3990
      era.set(`cflag:${target}:TARGET:339`, 1); // :3990
      return 0; // :3991
      // 二回目以降 // :3992
    } else { // :3993
      // 淫乱＋抖S气质Lv3 // :3994
      if (TALENT:TARGET:76 == 1 && ABL:20 >= 3 && (CFLAG:339 <= 4 || FLAG:7 == 2)) { // :3995
        if (RAND:2 == 0) { // :3996
          await era.print(`「哼哼~${heart(1)}`); // :3997
        } else { // :3998
          await era.print(`「这样做很舒服对吧~？`); // :3999
        } // :4000
        if (RAND:2 == 0) { // :4001
          await era.printAndWait(`哭吧~…哭得更好听一点吧~」`); // :4002
        } else { // :4003
          await era.printAndWait(`想要被做什么事情快说出来让${scf()}听听啊~、变态桑~」`); // :4004
        } // :4005
        if (RAND:2 == 0) { // :4006
          await era.printAndWait(`「如果说出来的话就让你更加爽噢~${heart(1)}」`); // :4007
        } else { // :4008
          await era.printAndWait(`「如果说出来的话就让你感受一下被夹紧的感觉噢~${heart(1)}」`); // :4009
        } // :4010
        // CFLAG:TARGET:339  = 5（变量语义：CFLAG 族，TARGET:339） // :4011
        era.set(`cflag:${target}:TARGET:339`, 5); // :4011
        // 愛＋抖S气质Lv3 // :4012
      } else if (TALENT:TARGET:85 == 1 && ABL:20 >= 3 && (CFLAG:339 <= 3 || FLAG:7 == 2)) { // :4013
        // 助手 // :4014
        if (ASSI > 0 && ASSIPLAY) { // :4015
          await era.printAndWait(`「${scf()}会好好地疼爱你、直到无法反抗为止的哦~」`); // :4016
          await era.printAndWait(`「请做好觉悟吧~${heart(3)}」`); // :4017
        } else { // :4018
          await era.printAndWait(`「哼哼哼~${heart(1)} 只是去干还不满足吗？」`); // :4019
          await era.printAndWait(`「居然还想要被虐什么的，真是下流的家伙呢${heart(1)}」`); // :4020
        } // :4021
        // CFLAG:TARGET:339  = 4（变量语义：CFLAG 族，TARGET:339） // :4022
        era.set(`cflag:${target}:TARGET:339`, 4); // :4022
        return 0; // :4023
        // 抖S气质Lv1以上 // :4024
      } else if (ABL:20 >= 1 && (CFLAG:339 <= 2 || FLAG:7 == 2)) { // :4025
        if (RAND:2 == 0) { // :4026
          await era.printAndWait(`「来吧…想要被踩对吧~？」`); // :4027
        } else { // :4028
          await era.printAndWait(`「想被${scf()}踩对吧|~？」`); // :4029
        } // :4030
        if (RAND:3 == 0) { // :4031
          await era.printAndWait(`「你真是令人鄙夷地变态受虐狂呢~」`); // :4032
        } else if (RAND:2 == 0) { // :4033
          await era.printAndWait(`「你真是无可奈何的变态来的呢~」`); // :4034
        } else { // :4035
          await era.printAndWait(`「你真的是个最差劲的渣滓呢~」`); // :4036
        } // :4037
        // CFLAG:TARGET:339  = 3（变量语义：CFLAG 族，TARGET:339） // :4038
        era.set(`cflag:${target}:TARGET:339`, 3); // :4038
        return 0; // :4039
        // それ以外 // :4040
      } else if (CFLAG:339 <= 1 || FLAG:7 == 2) { // :4041
        if (RAND:2 == 0) { // :4042
          await era.printAndWait(`「要用脚来做嘛？？」`); // :4043
        } else { // :4044
          await era.printAndWait(`「想要用脚来做的吗？？」`); // :4045
        } // :4046
        if (RAND:2 == 0) { // :4047
          await era.printAndWait(`「完全无法理解呢……」`); // :4048
        } else { // :4049
          await era.printAndWait(`「真是无法理解呢……」`); // :4050
        } // :4051
        // CFLAG:TARGET:339  = 2（变量语义：CFLAG 族，TARGET:339） // :4052
        era.set(`cflag:${target}:TARGET:339`, 2); // :4052
      } // :4053
      return 0; // :4054
    } // :4055
  } // :4056


  // ------------------------------------------------- // :4059
  // 打屁股 CFLAG:341 // :4060
  // ------------------------------------------------- // :4061
  if (SELECTCOM == 40) { // :4062
    // 初めて // :4063
    if (CFLAG:TARGET:341 == 0) { // :4064
      await era.printAndWait(`「不要啊！？ 请、不要打${target_name}！好疼啊！」`); // :4065
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :4066
      era.set(`cflag:${target}:TARGET:341`, 1); // :4066
      return 0; // :4067
      // 二回目以降 // :4068
    } else { // :4069
      // 淫乱＋受虐狂っ気Lv3 // :4070
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:341 <= 4 || FLAG:7 == 2)) { // :4071
        await era.printAndWait(`「嗯呜嗯~${heart(1)}啊~${heart(1)}啊~${heart(1)}啊啊嗯~~${heart(3)}」`); // :4072
        await era.printAndWait(`${target_name}的屁股不知道被用手掌拍打了多少次、已经变得非常的红肿了。`); // :4073
        await era.printAndWait(`「做喂母猪真素真素对不齐…请更加处罚…请更加处罚${sc()}吧~${heart(1)}」`); // :4074
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :4075
        era.set(`cflag:${target}:TARGET:341`, 5); // :4075
        // 愛＋マゾっ気Lv3 // :4076
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:341 <= 3 || FLAG:7 == 2)) { // :4077
        await era.printAndWait(`「哈呜~${heart(1)} 啊啊嗯~${heart(1)} 哈啊啊~…${heart(1)}」`); // :4078
        await era.printAndWait(`「啊啊~…魔王大人~…请更加地…处罚…${target_name}吧${heart(1)}」`); // :4079
        await era.printAndWait(`${target_name}每当被打到的时候都一脸好像要融化的啊嘿颜的样子………`); // :4080
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :4081
        era.set(`cflag:${target}:TARGET:341`, 4); // :4081
        return 0; // :4082
        // 苦痛刻印Lv3+屈服刻印Lv3 // :4083
      } else if (MARK:0 == 3 && MARK:2 == 3 && (CFLAG:341 <= 2 || FLAG:7 == 2)) { // :4084
        await era.printAndWait(`「啊啊~…啊~…是，是的…${target_name}会好好地…为了更好被打到…将屁股…抬高起来的…啊啊~！」`); // :4085
        await era.printAndWait(`${target_name}将屁股高高地抬起来，如同在引诱着你的责打而摇晃着屁股………`); // :4086
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :4087
        era.set(`cflag:${target}:TARGET:341`, 3); // :4087
        return 0; // :4088
        // それ以外 // :4089
      } else if (CFLAG:341 <= 1 || FLAG:7 == 2) { // :4090
        await era.printAndWait(`「请，请原谅…请不要再打了…啊~啊啊啊~！」`); // :4091
        await era.printAndWait(`${target_name}的屁股不知道被打了多少次，变得十分地红肿、她的眼角不停地流着泪珠………`); // :4092
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :4093
        era.set(`cflag:${target}:TARGET:341`, 2); // :4093
      } // :4094
      return 0; // :4095
    } // :4096
  } // :4097


  // ------------------------------------------------- // :4100
  // 鞭 CFLAG:342 // :4101
  // ------------------------------------------------- // :4102
  if (SELECTCOM == 41) { // :4103
    // 初めて // :4104
    if (CFLAG:TARGET:342 == 0) { // :4105
      // 淫乱 // :4106
      if (TALENT:76 == 1) { // :4107
        await era.printAndWait(`「啊嗯~…啊~啊啊~…请处罚${target_name}吧~…${heart(1)}」`); // :4108
        // 愛 // :4109
      } else if (TALENT:85 == 1) { // :4110
        await era.printAndWait(`「啊啊~…哈呜嗯~…啊啊~…呀啊啊~${heart(1)}」`); // :4111
        await era.printAndWait(`「啊啊~…这样的…只是…疼一下而已………」`); // :4112
        // それ以外 // :4113
      } else { // :4114
        await era.printAndWait(`「啊啊~…哈呜…啊啊~…不要啊………被打的不要………」`); // :4115
      } // :4116
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :4117
      era.set(`cflag:${target}:TARGET:342`, 1); // :4117
      return 0; // :4118
      // 二回目以降 // :4119
    } else { // :4120
      // 淫乱＋受虐狂っ気Lv5以上 // :4121
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:342 <= 8 || FLAG:7 == 2)) { // :4122
        await era.printAndWait(`「嗯呜${heart(1)} 更加…更加用力地打下来吧~${heart(1)}」`); // :4123
        await era.printAndWait(`「啊啊~${heart(1)} 哪怕被打了…也会变得好舒服呢~${heart(1)}」`); // :4124
        await era.printAndWait(`${target_name}每当鞭子打下来后，爱液便会飞散出来………`); // :4125
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :4126
        era.set(`cflag:${target}:TARGET:342`, 9); // :4126
        // 淫乱＋マゾっ気Lv3以上 // :4127
      } else if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:342 <= 7 || FLAG:7 == 2)) { // :4128
        await era.printAndWait(`「嗯哈啊啊~${heart(1)} ${sc()}是一只鞭子挥下来就会有感觉的母猪来的${heart(1)}」`); // :4129
        await era.printAndWait(`「请打到失去意识吧~${heart(1)}」`); // :4130
        await era.printAndWait(`${target_name}每当被鞭子打到就会发出娇喘、${player_name}的鞭子就会更加用力挥下去………`); // :4131
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :4132
        era.set(`cflag:${target}:TARGET:342`, 8); // :4132
        // 淫乱 // :4133
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:342 <= 6 || FLAG:7 == 2)) { // :4134
        await era.printAndWait(`「啊嗯~…啊~啊~…请更加用力处罚${sc()}吧…${heart(1)}」`); // :4135
        await era.printAndWait(`${target_name}每当被打到一下身体就出扭动起来………`); // :4136
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :4137
        era.set(`cflag:${target}:TARGET:342`, 7); // :4137
        // 愛＋マゾっ気Lv5以上 // :4138
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:342 <= 5 || FLAG:7 == 2)) { // :4139
        await era.printAndWait(`「啊啊~…啊~…啊啊啊啊~${heart(1)}…哈啊…哈啊…啊啊…被打到的地方…正在一抽一抽的${heart(1)}」`); // :4140
        await era.printAndWait(`「更加欺负${sc()}…请更加欺负${sc()}吧…${heart(1)}」`); // :4141
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :4142
        era.set(`cflag:${target}:TARGET:342`, 6); // :4142
        // 愛＋マゾっ気Lv3以上 // :4143
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:342 <= 4 || FLAG:7 == 2)) { // :4144
        await era.printAndWait(`「哈啊啊~…嗯~…嗯~${heart(1)} 好棒…的呀~啊哈~…${heart(1)}」`); // :4145
        await era.printAndWait(`${target_name}每当鞭子挥下去就会从蜜穴流出爱液………`); // :4146
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :4147
        era.set(`cflag:${target}:TARGET:342`, 5); // :4147
        // 爱慕 // :4148
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:342 <= 3 || FLAG:7 == 2)) { // :4149
        await era.printAndWait(`「请原谅…请原谅${target_name}吧………」`); // :4150
        await era.printAndWait(`${target_name}身体颤抖着，好像很害怕的样子，………`); // :4151
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :4152
        era.set(`cflag:${target}:TARGET:342`, 4); // :4152
        // マゾっ気Lv3以上 // :4153
      } else if (ABL:21 >= 3 && (CFLAG:342 <= 2 || FLAG:7 == 2)) { // :4154
        await era.printAndWait(`「嗯哈恩~…啊啊~…明明在被打着…啊啊~...明明应该很疼来的…♪」`); // :4155
        await era.printAndWait(`${target_name}每次被打到的时候都紧紧合住双腿、一脸好像在忍耐着什么东西的样子………`); // :4156
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :4157
        era.set(`cflag:${target}:TARGET:342`, 3); // :4157
        // それ以外 // :4158
      } else if (CFLAG:335 <= 1 || FLAG:7 == 2) { // :4159
        await era.printAndWait(`「不、不要啊…已经…被打的不要啊…不要啊………」`); // :4160
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :4161
        era.set(`cflag:${target}:TARGET:342`, 2); // :4161
      } // :4162
      return 0; // :4163
    } // :4164
  } // :4165


  // ------------------------------------------------- // :4168
  // 针 CFLAG:343 // :4169
  // ------------------------------------------------- // :4170
  if (SELECTCOM == 42) { // :4171
    // 初めて // :4172
    if (CFLAG:TARGET:343 == 0) { // :4173
      // 淫乱 // :4174
      if (TALENT:76 == 1) { // :4175
        await era.printAndWait(`「哈呜…不，不行的啊…请、请原谅…请原谅${sc()}吧！！！」`); // :4176
        // 愛 // :4177
      } else if (TALENT:85 == 1) { // :4178
        await era.printAndWait(`「${scf()}、${sc()}到底…做了什么错事了吗…啊~啊啊~啊啊啊啊~！」`); // :4179
        // それ以外 // :4180
      } else { // :4181
        await era.printAndWait(`「哈呜~…用、用这种东西到底想要干什么…难、难道…不要~不要不要啊啊啊啊啊！」`); // :4182
      } // :4183
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :4184
      era.set(`cflag:${target}:TARGET:343`, 1); // :4184
      return 0; // :4185
      // 二回目以降 // :4186
    } else { // :4187
      // 淫乱＋受虐狂っ気Lv5以上 // :4188
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:343 <= 8 || FLAG:7 == 2)) { // :4189
        await era.printAndWait(`「啊~…啊啊~…哈啊嗯~${heart(1)}…好奇怪啊~…明明好痛来的…明明好痛来的呀${heart(1)}」`); // :4190
        await era.printAndWait(`${target_name}柔弱的皮肤渗出血来了也发出了愉悦的呻吟………`); // :4191
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :4192
        era.set(`cflag:${target}:TARGET:343`, 9); // :4192
        // 淫乱＋マゾっ気Lv3以上 // :4193
      } else if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:343 <= 7 || FLAG:7 == 2)) { // :4194
        await era.printAndWait(`「啊啊~…针…在一转一转地…麻，麻掉了…要麻掉了…${heart(1)}」`); // :4195
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`); // :4196
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :4197
        era.set(`cflag:${target}:TARGET:343`, 8); // :4197
        // 淫乱 // :4198
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:343 <= 6 || FLAG:7 == 2)) { // :4199
        await era.printAndWait(`「啊啊~…对不起…作为一个下流的奴隶真是对不起…请原谅${sc()}吧………」`); // :4200
        await era.printAndWait(`${target_name}因为尖锐的苦痛而哭泣起来了………`); // :4201
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :4202
        era.set(`cflag:${target}:TARGET:343`, 7); // :4202
        // 愛＋マゾっ気Lv5以上 // :4203
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:343 <= 5 || FLAG:7 == 2)) { // :4204
        await era.printAndWait(`「嗯哈啊~…请更加…更多地…刺…进去吧~…${heart(1)}」`); // :4205
        await era.printAndWait(`柔软的皮肤流出了鲜血，${target_name}发出了愉悦的声音………`); // :4206
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :4207
        era.set(`cflag:${target}:TARGET:343`, 6); // :4207
        // 爱＋受虐狂っ気Lv3以上 // :4208
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:343 <= 4 || FLAG:7 == 2)) { // :4209
        await era.printAndWait(`「嗯哼~…针…好深…好深呀~…嗯哈呜~${heart(1)}」`); // :4210
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`); // :4211
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :4212
        era.set(`cflag:${target}:TARGET:343`, 5); // :4212
        // 愛 // :4213
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:343 <= 3 || FLAG:7 == 2)) { // :4214
        await era.printAndWait(`「原谅…请原谅${target_name}吧…疼什么的…真的不要呀…不要…不要啊………」`); // :4215
        await era.printAndWait(`${target_name}因为尖锐的苦痛而哭泣起来了………`); // :4216
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :4217
        era.set(`cflag:${target}:TARGET:343`, 4); // :4217
        // マゾっ気Lv3以上 // :4218
      } else if (ABL:21 >= 3 && (CFLAG:343 <= 2 || FLAG:7 == 2)) { // :4219
        await era.printAndWait(`「啊啊~…麻，麻掉了…要麻掉了…${heart(1)}」`); // :4220
        await era.printAndWait(`${target_name}对自己麻痹的感觉迷惑起来了………`); // :4221
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :4222
        era.set(`cflag:${target}:TARGET:343`, 3); // :4222
        // それ以外 // :4223
      } else if (CFLAG:343 <= 1 || FLAG:7 == 2) { // :4224
        await era.printAndWait(`「嗯呜！…不要不要不要啊啊啊啊啊！」`); // :4225
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :4226
        era.set(`cflag:${target}:TARGET:343`, 2); // :4226
      } // :4227
      return 0; // :4228
    } // :4229
  } // :4230

  // ------------------------------------------------- // :4232
  // 眼罩 CFLAG:344　CFLAG:380 // :4233
  // ------------------------------------------------- // :4234
  // 開始時 // :4235
  if (SELECTCOM == 43 && TEQUIP:43) { // :4236
    // 初めて // :4237
    if (CFLAG:TARGET:344 == 0) { // :4238
      // 淫乱 // :4239
      if (TALENT:76 == 1) { // :4240
        await era.printAndWait(''); // :4241
        // 爱慕 // :4242
      } else if (TALENT:85 == 1) { // :4243
        await era.printAndWait(''); // :4244
        // それ以外 // :4245
      } else { // :4246
        await era.printAndWait(''); // :4247
      } // :4248
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4249
      era.set(`cflag:${target}:TARGET:344`, 1); // :4249
      return 0; // :4250
      // 二回目以降 // :4251
    } else { // :4252
      // 淫乱＋受虐狂っ気Lv5以上 // :4253
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:344 <= 8 || FLAG:7 == 2)) { // :4254
        await era.printAndWait(''); // :4255
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4256
        era.set(`cflag:${target}:TARGET:344`, 9); // :4256
        // 淫乱＋受虐狂っ気Lv3以上 // :4257
      } else if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:344 <= 7 || FLAG:7 == 2)) { // :4258
        await era.printAndWait(''); // :4259
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4260
        era.set(`cflag:${target}:TARGET:344`, 8); // :4260
        // 淫乱 // :4261
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:344 <= 6 || FLAG:7 == 2)) { // :4262
        await era.printAndWait(''); // :4263
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4264
        era.set(`cflag:${target}:TARGET:344`, 7); // :4264
        // 爱＋受虐狂っ気Lv5以上 // :4265
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:344 <= 5 || FLAG:7 == 2)) { // :4266
        await era.printAndWait(''); // :4267
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4268
        era.set(`cflag:${target}:TARGET:344`, 6); // :4268
        // 爱＋受虐狂っ気Lv3以上 // :4269
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:344 <= 4 || FLAG:7 == 2)) { // :4270
        await era.printAndWait(''); // :4271
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4272
        era.set(`cflag:${target}:TARGET:344`, 5); // :4272
        // 爱慕 // :4273
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:344 <= 3 || FLAG:7 == 2)) { // :4274
        await era.printAndWait(''); // :4275
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4276
        era.set(`cflag:${target}:TARGET:344`, 4); // :4276
        // 受虐狂っ気Lv3以上 // :4277
      } else if (ABL:21 >= 3 && (CFLAG:344 <= 2 || FLAG:7 == 2)) { // :4278
        await era.printAndWait(''); // :4279
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4280
        era.set(`cflag:${target}:TARGET:344`, 3); // :4280
        // それ以外 // :4281
      } else if (CFLAG:344 <= 1 || FLAG:7 == 2) { // :4282
        await era.printAndWait(''); // :4283
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4284
        era.set(`cflag:${target}:TARGET:344`, 2); // :4284
      } // :4285
      return 0; // :4286
    } // :4287
    // 終了時 // :4288
  } else if (SELECTCOM == 43 && TEQUIP:43 == 0) { // :4289
    // 淫乱 // :4290
    if (TALENT:TARGET:76 == 1 && (CFLAG:380 < 3 || FLAG:7 == 2)) { // :4291
      await era.printAndWait(''); // :4292
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :4293
      era.set(`cflag:${target}:380`, 3); // :4293
      // 爱慕 // :4294
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:380 < 2 || FLAG:7 == 2)) { // :4295
      await era.printAndWait(''); // :4296
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :4297
      era.set(`cflag:${target}:380`, 2); // :4297
      // それ以外 // :4298
    } else if (CFLAG:380 < 1 || FLAG:7 == 2) { // :4299
      await era.printAndWait(''); // :4300
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :4301
      era.set(`cflag:${target}:380`, 1); // :4301
    } // :4302
    return 0; // :4303
  } // :4304


  // ------------------------------------------------- // :4307
  // 绳子 CFLAG345　CFLAG:385 // :4308
  // ------------------------------------------------- // :4309
  // 開始時 // :4310
  if (SELECTCOM == 44 && TEQUIP:44) { // :4311
    // 初めて // :4312
    if (CFLAG:TARGET:345 == 0) { // :4313
      // 淫乱 // :4314
      if (TALENT:76 == 1) { // :4315
        await era.printAndWait(`「啊啊恩~…请更加用力地将${sc()}绑住吧~${heart(1)}」`); // :4316
        // 愛 // :4317
      } else if (TALENT:85 == 1) { // :4318
        await era.printAndWait(`「明明不用做这种情况…${sc()}早就是大人您的东西来的了…${heart(1)}」`); // :4319
        // それ以外 // :4320
      } else { // :4321
        await era.printAndWait(`「啊啊~…快、快点解开啊！」`); // :4322
      } // :4323
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :4324
      era.set(`cflag:${target}:TARGET:345`, 1); // :4324
      return 0; // :4325
      // 二回目以降 // :4326
    } else { // :4327
      // 淫乱＋受虐狂っ気Lv5以上 // :4328
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:345 <= 8 || FLAG:7 == 2)) { // :4329
        await era.printAndWait(`「嗯哈嗯~…更加…用力地绑…也没关系的啊~~${heart(1)}」`); // :4330
        await era.printAndWait(`「啊啊~…然后就这样被侵犯的话${heart(1)}…就真的是最棒得了~~${heart(3)}」`); // :4331
        await era.printAndWait(`${target_name}被捆绑到爱液流遍了大腿………`); // :4332
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :4333
        era.set(`cflag:${target}:TARGET:345`, 9); // :4333
        // 淫乱＋マゾっ気Lv3以上 // :4334
      } else if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:345 <= 7 || FLAG:7 == 2)) { // :4335
        await era.printAndWait(`「哈啊${heart(1)}哈啊${heart(1)} 绳子…陷进肉里了${heart(1)}」`); // :4336
        await era.printAndWait(`「啊啊~…啊啊~…已，已经…啊啊…主人~…${heart(3)}」`); // :4337
        await era.printAndWait(`${target_name}坐立不安地好像期待着什么东西一样看着你………`); // :4338
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :4339
        era.set(`cflag:${target}:TARGET:345`, 8); // :4339
        // 淫乱 // :4340
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:345 <= 6 || FLAG:7 == 2)) { // :4341
        await era.printAndWait(`「啊啊…绳子连…胸部都陷进去了…${heart(1)}」`); // :4342
        await era.printAndWait(`${target_name}因为被捆绑着而高兴………`); // :4343
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :4344
        era.set(`cflag:${target}:TARGET:345`, 7); // :4344
        // 愛＋マゾっ気Lv5以上 // :4345
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:345 <= 5 || FLAG:7 == 2)) { // :4346
        await era.printAndWait(`「哈啊~…哈啊~…啊啊~…不行…不行的啊~${heart(1)}`); // :4347
        await era.printAndWait(`「小穴被绳子捆绑着…明明很难受来的…啊~啊啊~…哈嗯~~${heart(1)}」`); // :4348
        await era.printAndWait(`${target_name}被粗绳捆绑住后露出了发情的母狗一样的啊嘿颜呻吟起来了………`); // :4349
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :4350
        era.set(`cflag:${target}:TARGET:345`, 6); // :4350
        // 爱＋受虐狂っ気Lv3以上 // :4351
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:345 <= 4 || FLAG:7 == 2)) { // :4352
        await era.printAndWait(`「啊啊~…更加的…收紧一点吧~~…${heart(1)}」`); // :4353
        await era.printAndWait(`「被捆绑住后…就更加能感受到…${target_name}是大人您的东西来的…${heart(3)}」`); // :4354
        await era.printAndWait(`${target_name}一脸好像很舒服的样子地被捆绑着………`); // :4355
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :4356
        era.set(`cflag:${target}:TARGET:345`, 5); // :4356
        // 愛 // :4357
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:345 <= 3 || FLAG:7 == 2)) { // :4358
        await era.printAndWait(`「啊啊~…${sc()}…在被大人您捆绑着呢…${heart(1)}」`); // :4359
        await era.printAndWait(`${target_name}一脸恍惚地样子被捆绑着………`); // :4360
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :4361
        era.set(`cflag:${target}:TARGET:345`, 4); // :4361
        // 受虐狂っ気Lv3以上 // :4362
      } else if (ABL:21 >= 3 && (CFLAG:345 <= 2 || FLAG:7 == 2)) { // :4363
        await era.printAndWait(`「啊啊恩~…绳子…请再${heart(1)}收紧一点吧~~…${heart(1)}」`); // :4364
        await era.printAndWait(`${target_name}每当绳子收地更紧的时候就露出了更加淫荡的声音………`); // :4365
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :4366
        era.set(`cflag:${target}:TARGET:345`, 3); // :4366
        // それ以外 // :4367
      } else if (CFLAG:345 <= 1 || FLAG:7 == 2) { // :4368
        await era.printAndWait(`「哈啊~…哈啊~…请原谅…绳子好紧啊……请将绳子给解开吧~~~………」`); // :4369
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :4370
        era.set(`cflag:${target}:TARGET:345`, 2); // :4370
      } // :4371
      return 0; // :4372
    } // :4373
    // 終了時 // :4374
  } else if (SELECTCOM == 44 && TEQUIP:44 == 0) { // :4375
    // 淫乱 // :4376
    if (TALENT:TARGET:76 == 1 && (CFLAG:385 < 2 || FLAG:7 == 2)) { // :4377
      await era.printAndWait(`「哈啊…哈啊…啊啊…绳子装明明不错来的…${heart(1)}」`); // :4378
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :4379
      era.set(`cflag:${target}:385`, 2); // :4379
      // 愛 // :4380
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:385 < 2 || FLAG:7 == 2)) { // :4381
      await era.printAndWait(`「啊啊嗯~…明明想要被捆住…一整天都没有关系来的${heart(1)}」`); // :4382
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :4383
      era.set(`cflag:${target}:385`, 2); // :4383
      // それ以外 // :4384
    } else if (CFLAG:385 < 1 || FLAG:7 == 2) { // :4385
      await era.printAndWait(`「哈啊哈啊…啊啊…绳子的勒痕…那么地…」`); // :4386
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :4387
      era.set(`cflag:${target}:385`, 1); // :4387
    } // :4388
    return 0; // :4389
  } // :4390


  // ------------------------------------------------- // :4393
  // 口塞 CFLAG:346　CFLAG:386 // :4394
  // ------------------------------------------------- // :4395
  // 開始時 // :4396
  if (SELECTCOM == 45 && TEQUIP:45) { // :4397
    // 初めて // :4398
    if (CFLAG:TARGET:346 == 0) { // :4399
      // 淫乱 // :4400
      if (TALENT:76 == 1) { // :4401
        await era.printAndWait(`「嗯~…嗯呃~…嗯呼嗯~…嗯嗯~${heart(1)}」`); // :4402
        // 愛 // :4403
      } else if (TALENT:85 == 1) { // :4404
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼…嗯嗯~${heart(1)}」`); // :4405
        // それ以外 // :4406
      } else { // :4407
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`); // :4408
      } // :4409
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :4410
      era.set(`cflag:${target}:TARGET:346`, 1); // :4410
      return 0; // :4411
      // 二回目以降 // :4412
    } else { // :4413
      // 淫乱＋受虐狂っ気Lv5以上 // :4414
      if (TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:346 <= 8 || FLAG:7 == 2)) { // :4415
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4416
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :4417
        era.set(`cflag:${target}:TARGET:346`, 9); // :4417
        // 淫乱＋マゾっ気Lv3以上 // :4418
      } else if (TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:346 <= 7 || FLAG:7 == 2)) { // :4419
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4420
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :4421
        era.set(`cflag:${target}:TARGET:346`, 8); // :4421
        // 淫乱 // :4422
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:346 <= 6 || FLAG:7 == 2)) { // :4423
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4424
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :4425
        era.set(`cflag:${target}:TARGET:346`, 7); // :4425
        // 爱＋受虐狂っ気Lv5以上 // :4426
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:346 <= 5 || FLAG:7 == 2)) { // :4427
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4428
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :4429
        era.set(`cflag:${target}:TARGET:346`, 6); // :4429
        // 爱＋受虐狂っ気Lv3以上 // :4430
      } else if (TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:346 <= 4 || FLAG:7 == 2)) { // :4431
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4432
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :4433
        era.set(`cflag:${target}:TARGET:346`, 5); // :4433
        // 爱慕 // :4434
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:346 <= 3 || FLAG:7 == 2)) { // :4435
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~${heart(1)}」`); // :4436
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :4437
        era.set(`cflag:${target}:TARGET:346`, 4); // :4437
        // 受虐狂っ気Lv3以上 // :4438
      } else if (ABL:21 >= 3 && (CFLAG:346 <= 2 || FLAG:7 == 2)) { // :4439
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`); // :4440
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :4441
        era.set(`cflag:${target}:TARGET:346`, 3); // :4441
        // それ以外 // :4442
      } else if (CFLAG:346 <= 1 || FLAG:7 == 2) { // :4443
        await era.printAndWait(`「嗯~…嗯呜~…嗯呼~…嗯嗯~」`); // :4444
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :4445
        era.set(`cflag:${target}:TARGET:346`, 2); // :4445
      } // :4446
      return 0; // :4447
    } // :4448
    // 終了時 // :4449
  } else if (SELECTCOM == 45 && TEQUIP:45 == 0) { // :4450
    // 淫乱 // :4451
    if (TALENT:TARGET:76 == 1 && (CFLAG:386 < 3 || FLAG:7 == 2)) { // :4452
      await era.printAndWait(`「嗯哈啊…哈啊…哈啊…哈啊…主人…${heart(1)}」`); // :4453
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :4454
      era.set(`cflag:${target}:386`, 3); // :4454
      // 愛 // :4455
    } else if (TALENT:TARGET:85 == 1 && (CFLAG:386 < 2 || FLAG:7 == 2)) { // :4456
      await era.printAndWait(`「嗯哈啊…哈啊…哈啊…哈啊…好难受来的啊…${heart(1)}」`); // :4457
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :4458
      era.set(`cflag:${target}:386`, 2); // :4458
      // それ以外 // :4459
    } else if (CFLAG:386 < 1 || FLAG:7 == 2) { // :4460
      await era.printAndWait(`「嗯哈啊…哈啊…哈啊…哈啊…」`); // :4461
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :4462
      era.set(`cflag:${target}:386`, 1); // :4462
    } // :4463
    return 0; // :4464
  } // :4465


  // ------------------------------------------------- // :4468
  // 灌肠+肛塞 CFLAG:347　CFLAG:387 // :4469
  // ------------------------------------------------- // :4470
  // 開始時 // :4471
  if (SELECTCOM == 46 && TEQUIP:46) { // :4472
    // 初めて // :4473
    if (CFLAG:TARGET:347 == 0) { // :4474
      // 淫乱 // :4475
      if (TALENT:TARGET:76 == 1) { // :4476
        await era.printAndWait(`「啊啊~…进来了呀~~~${heart(1)}…啊啊~${heart(1)}浣肠液${heart(1)}好热~~好舒服~~${heart(1)}」`); // :4477
        // 愛 // :4478
      } else if (TALENT:TARGET:85 == 1) { // :4479
        await era.printAndWait(`「不，不行的呀…${scf()}、${sc()}…肚子的感觉便奇怪了~啊啊~…好烫！浣肠液好烫呀~~~」`); // :4480
        // それ以外 // :4481
      } else { // :4482
        await era.printAndWait(`「啊~啊~…嗯呃啊…肚子…好难受…请、请快停下来………」`); // :4483
      } // :4484
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :4485
      era.set(`cflag:${target}:TARGET:347`, 1); // :4485
      return 0; // :4486
      // 二回目以降 // :4487
    } else { // :4488
      // 淫乱＋A感覚Lv3以上＋受虐狂っ気Lv3以上 // :4489
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:347 <= 6 || FLAG:7 == 2)) { // :4490
        await era.printAndWait(`「啊哈啊~…${heart(1)} 好热…好热好厉害啊~${heart(1)}」`); // :4491
        await era.printAndWait(`「啊哈哦~${heart(1)}不要不要…肚子要~${heart(1)} 请不要那么温柔地${heart(1)} 抚摸肚子了${heart(1)}」`); // :4492
        await era.printAndWait(`「啊~…噢噢~…肚子…好、好多进去了…嗯~噢噢~${heart(3)}」`); // :4493
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :4494
        era.set(`cflag:${target}:347`, 7); // :4494
        // 淫乱 // :4495
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:347 <= 5 || FLAG:7 == 2)) { // :4496
        await era.printAndWait(`「啊啊~…好热的~…正在进来呀~${heart(1)} 哈呜~好烫好热呀~${heart(1)}」`); // :4497
        await era.printAndWait(`「啊啊啊~…主人~…肚子里面的东西…请尽情地看着吧~${heart(1)}」`); // :4498
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :4499
        era.set(`cflag:${target}:347`, 6); // :4499
        // 愛＋A感覚Lv3以上＋マゾっ気Lv3以上 // :4500
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:347 <= 4 || FLAG:7 == 2)) { // :4501
        await era.printAndWait(`「啊~啊啊啊~…嗯~…肚子…在咕噜咕噜地响着呢…${heart(1)}」`); // :4502
        await era.printAndWait(`「啊啊~就这样…将不像样的姿态给暴露出来了呀~…${heart(1)}」`); // :4503
        await era.printAndWait(`「大人您的话…就没有关系的~~…啊啊~…请…请看着吧~${heart(1)}」`); // :4504
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :4505
        era.set(`cflag:${target}:347`, 5); // :4505
        // 爱慕 // :4506
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:347 <= 3 || FLAG:7 == 2)) { // :4507
        await era.printAndWait(`「啊~啊啊啊~…嗯~…肚子…在咕噜咕噜地响着呢…${heart(1)}」`); // :4508
        await era.printAndWait(`「真，真的…好难受的…请原谅一下…哈啊…呃呜………」`); // :4509
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :4510
        era.set(`cflag:${target}:347`, 4); // :4510
        // A感覚Lv3以上＋マゾっ気Lv3以上 // :4511
      } else if (ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:347 <= 2 || FLAG:7 == 2)) { // :4512
        await era.printAndWait(`「啊啊~…肚，肚子里面…突然变奇怪起来了…屁，屁股…变，变奇怪了…请救救${sc()}吧！」`); // :4513
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :4514
        era.set(`cflag:${target}:347`, 3); // :4514
        // それ以外 // :4515
      } else if (CFLAG:347 <= 1 || FLAG:7 == 2) { // :4516
        if (TEQUIP:54 == 1 && PREVCOM == 46) { // :4517
          await era.printAndWait(`「真、真的不要了啊，赤裸着，在人前，排泄什呃，肚子，肚子好疼啊啊啊！」`); // :4518
        } else if (PREVCOM == 46) { // :4519
          await era.printAndWait(`「不、不要啊！　不要再那样了啊啊…肚子、进来了啊………」`); // :4520
        } else { // :4521
          await era.printAndWait(`「肚子…好、好难受啊…请，请不要再这样欺负${sc()}了………」`); // :4522
        } // :4523
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :4524
        era.set(`cflag:${target}:347`, 2); // :4524
      } // :4525
      return 0; // :4526
    } // :4527
    // 終了時 // :4528
  } else if (SELECTCOM == 46 && TEQUIP:46 == 0) { // :4529
    // 初めて // :4530
    if (CFLAG:TARGET:387 == 0) { // :4531
      // 淫乱＋A感覚Lv3以上＋マゾっ気Lv3以上 // :4532
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3) { // :4533
        // 野外プレイ時＋撮影中 // :4534
        if (TEQUIP:54 == 1 && TEQUIP:53 == 1) { // :4535
          if (TEQUIP:44 == 0) { // :4537
            await era.printAndWait(`${target_name}用自己的手扒开了菊穴，展示着本应羞于见人的排泄场面……`); // :4537
          } // :4537
          await era.printAndWait(`「哈啊啊啊、嗯哦唔、嗯吼噢噢噢唔%UNICODE(0x2764) *1%」`); // :4538
          await era.printAndWait(`「咿…哈噢哦唔呜呜嗯%UNICODE(0x2764) *1%　好好看着哦%UNICODE(0x2764) *1%　好好录下来哦%UNICODE(0x2764) *1%」`); // :4539
          await era.printAndWait(`「粪便把菊穴给、撑开了啊%UNICODE(0x2764) *1%　拉出来了啊…%UNICODE(0x2764) *1%」`); // :4540
          await era.printAndWait(`「像狗一样，在外面随地排泄…请看看因此觉得舒服了的、污秽的母兽啊…唔%UNICODE(0x2764) *1%」`); // :4541
          // 野外プレイ時 // :4542
        } else if (TEQUIP:54 == 1) { // :4543
          await era.printAndWait(`「哦欧唔…%UNICODE(0x2764) *1%　啊%UNICODE(0x2764) *1%　啊%UNICODE(0x2764) *1%　嗯嗯…啊昂…吼哦、吼唔噢噢噢噢%UNICODE(0x2764) *1%」`); // :4544
          await era.printAndWait(`「来了、拉出来了啦%UNICODE(0x2764) *1%　在人前、张开着菊、菊穴…粪便…嗯、%SELF_CALL(TARGET,5)%呃%UNICODE(0x2764) *1%」`); // :4545
          await era.printAndWait(`「这样好舒服哦%UNICODE(0x2764) *1%　要上瘾了啊呜呜呜…%UNICODE(0x2764) *1%」`); // :4546
          // 撮影中 // :4547
        } else if (TEQUIP:53 == 1) { // :4548
          await era.printAndWait(`「${target_name}的喷粪秀%UNICODE(0x2764) *1%　请一定要好好看着哦…%UNICODE(0x2764) *1%」`); // :4549
          await era.printAndWait(`「哦吼%UNICODE(0x2764) *1%　嘤嘤咿咿、咕唔%UNICODE(0x2764) *1%　要拉出来了%UNICODE(0x2764) *1%　拉出来了吧%UNICODE(0x2764) *1%」`); // :4550
          await era.printAndWait(`「刺溜刺溜的%UNICODE(0x2764) *1%　乱成一团了…%UNICODE(0x2764) *1%　%SELF_CALL(TARGET,3)%、要变成白痴了啊……%UNICODE(0x2764) *1%」`); // :4551
          // それ以外 // :4552
        } else { // :4553
          await era.printAndWait(`${target_name}因为初次强制排泄调教的快感而全身颤抖起来……`); // :4554
          await era.printAndWait(`「哈嗷嗷嗷啊啊嗷嗷唔%UNICODE(0x2764) *1%　真是耻辱极了%UNICODE(0x2764) *1%　太耻辱了%UNICODE(0x2764) *1%」`); // :4555
          await era.printAndWait(`「这才是和变态淫乱奴隶的${sc()}相称的调教啊%UNICODE(0x2764) *1%　这样的、才够过分啊%UNICODE(0x2764) *1%」`); // :4556
        } // :4557
        // 淫乱 // :4558
      } else if (TALENT:TARGET:76 == 1) { // :4559
        await era.printAndWait(`「就算${sc()}是主人的奴隶，还是个变态，这…这也，太过头了吧啊啊啊%UNICODE(0x2764) *1%」`); // :4560
        await era.printAndWait(`「啊%UNICODE(0x2764) *1%　啊%UNICODE(0x2764) *1%　嗷嗷、啊%UNICODE(0x2764) *1%　拉、拉出来了…停不下来…出来了、好多啊啊啊啊……%UNICODE(0x2764) *1%」`); // :4561
        // 愛 // :4562
      } else if (TALENT:TARGET:85 == 1) { // :4563
        await era.printAndWait(`「请、请不要看啊……唯独不想让主人大人看到的啊……嗯、嗯咕呜呜呜！　不要看啊啊啊啊！！」`); // :4564
        // A感覚Lv3以上＋マゾっ気Lv3以上 // :4565
      } else if (ABL:3 >= 3 && ABL:21 >= 3) { // :4566
        if (TALENT:成为勇者前的生活 == 5 || TALENT:成为勇者前的生活 == 7 || TALENT:成为勇者前的生活 == 9 || TALENT:成为勇者前的生活 == 20) { // :4567
          if (TALENT:成为勇者前的生活 == 5) { // :4568
            await era.print(`「从娼妇`); // :4569
          } else if (TALENT:成为勇者前的生活 == 7) { // :4570
            await era.print(`「从乞丐`); // :4571
          } else if (TALENT:成为勇者前的生活 == 9) { // :4572
            await era.print(`「从贫民`); // :4573
          } else if (TALENT:成为勇者前的生活 == 20) { // :4574
            await era.print(`「从奴隶`); // :4575
          } // :4576
          await era.printAndWait(`成为了勇者，就能摆脱以前的生活…才对的啊…」`); // :4577
          await era.printAndWait(`「${scf()}、${sc()}，怎么就落到这个地步…呢…」`); // :4578
          if (TEQUIP:53 == 1) { // :4580
            await era.printAndWait(`「啊啊啊、被拍下来了啊…${sc()}的耻辱的、样子…怎么这样…怎么…」`); // :4580
          } // :4580
          await era.printAndWait(`「噫！　呀…呀啊啊啊啊…强制排泄什么的…怎么…怎么会…这么…舒服…的啊啊……」`); // :4581
        } else { // :4582
          await era.print(`在初次强制排泄的耻辱中，${target_name}记住了这混乱的快感……`); // :4583
          await era.printAndWait(`「不、不是吧！　这种事应该不会舒服才…啊？　嗷嗷？　哈、啊啊啊…啊啊啊啊嗷%UNICODE(0x2764) *1%」`); // :4584
        } // :4585
        // それ以外 // :4586
      } else { // :4587
        if (TALENT:成为勇者前的生活 == 5 || TALENT:成为勇者前的生活 == 7 || TALENT:成为勇者前的生活 == 9 || TALENT:成为勇者前的生活 == 20) { // :4588
          await era.print(`「不、不要啊！　这这这、这样子的、比`); // :4589
          if (TALENT:成为勇者前的生活 == 5) { // :4590
            await era.print(`娼妇`); // :4591
          } else if (TALENT:成为勇者前的生活 == 7) { // :4592
            await era.print(`乞丐`); // :4593
          } else if (TALENT:成为勇者前的生活 == 9) { // :4594
            await era.print(`贫民`); // :4595
          } else if (TALENT:成为勇者前的生活 == 20) { // :4596
            await era.print(`奴隶`); // :4597
          } // :4598
          await era.printAndWait(`还不如的待遇！！」`); // :4599
          await era.printAndWait(`「${scf()}、${sc()}っ，都成为勇者…成为勇者摆脱这些了啊…呀、呀啊啊啊！？」`); // :4600
          if (TEQUIP:53 == 1) { // :4602
            await era.printAndWait(`「…啊、不要拍啊…唔、${sc()}的这幅模样…请不要记录下来啊啊…！」`); // :4602
          } // :4602
          await era.printAndWait(`「啊啊啊啊…！　停、停下啊…已经、出不来了、出、啊啊啊啊啊啊、啊嗷嗷嗷嗷…不要啊……」`); // :4603
          // 野外プレイ時＋撮影中 // :4604
        } else if (TEQUIP:54 == 1 && TEQUIP:53 == 1) { // :4605
          await era.print(`用水晶球记录了全裸只戴了项圈的${target_name}在初次地下城里排泄的样子……`); // :4606
          await era.printAndWait(`「这样子的、这样子的绝对不可原谅啊…唔、绝对…绝对的…！」`); // :4607
          await era.printAndWait(`「总有一天…绝对、要破坏掉那个水晶球…啊啊啊啊啊、出来了…快停下、快停下啊……」`); // :4608
          // 野外プレイ時 // :4609
        } else if (TEQUIP:54 == 1) { // :4610
          await era.printAndWait(`「认输了…至少、去厕所、再…呃！　啊啊啊啊…不、不要啊啊！！」`); // :4611
          await era.printAndWait(`「这样…耻辱的、在地下城里…漏出来了什么的…咕呜呜…啊啊啊！！」`); // :4612
          // 撮影中 // :4613
        } else if (TEQUIP:53 == 1) { // :4614
          await era.print(`记忆的水晶球完整的把${target_name}的痴态，由始至终的记录了下来……`); // :4615
          await era.printAndWait(`「在连厕所都没有的地方…在人前、暴露着这样的丑态…这样的、这、样…」`); // :4616
          await era.printAndWait(`「不行了…呜！　又、又拉了、泄出来了…啊啊啊、不要看…啊！！」`); // :4617
          // それ以外 // :4618
        } else { // :4619
          await era.printAndWait(`「这、这是…这样子的啊、真是什么调教方式都有呢魔王、…呜呜！！」`); // :4620
          await era.printAndWait(`「啊啊啊…明明不是野猫野狗、竟然在没有厕所的地方、让${sc()}这幅丑态…」`); // :4621
          await era.printAndWait(`「…啊、啊啊啊！　又要、出来…出来了啊…！！」`); // :4622
        } // :4623
      } // :4624
      // CFLAG:TARGET:387  = 1（变量语义：CFLAG 族，TARGET:387） // :4625
      era.set(`cflag:${target}:TARGET:387`, 1); // :4625
      return 0; // :4626
      // 二回目以降 // :4627
    } else { // :4628
      // 淫乱＋A感覚Lv3以上＋マゾっ気Lv3以上 // :4629
      if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:387 <= 6 || FLAG:7 == 2)) { // :4630
        // 野外プレイ時 // :4631
        if (TEQUIP:54 == 1) { // :4632
          // 共通喘ぎ // :4633
          if (RAND:2 == 0) { // :4634
            await era.print(`「哈唉呜~${heart(1)}`); // :4635
          } else { // :4636
            await era.print(`「哈唉呜~${heart(1)}`); // :4637
          } // :4638
          if (RAND:2 == 0) { // :4639
            await era.print(`嗯哦哦哦~${heart(3)}`); // :4640
          } else { // :4641
            await era.print(`哦吼噢噢~${heart(3)}`); // :4642
          } // :4643
          if (RAND:2 == 0) { // :4644
            await era.printAndWait(`噢噢噢哦~${heart(3)}」`); // :4645
          } else { // :4646
            await era.printAndWait(`啊啊啊~${heart(3)}」`); // :4647
          } // :4648
          // 最深部に勇者進入時＋露出癖Lv5以上 // :4649
          // RAW: REPEAT CHARANUM // :4650
          if (CFLAG:COUNT:1 == 2 && CFLAG:COUNT:501 == 9 && ABL:17 >= 5) { // :4651
            if (RAND:3 == 0) { // :4652
              await era.print(`「…哈、啊哈%UNICODE(0x2764) *1%　一想到${sc()}拉出来的东西、要是让探索中的勇者`); // :4653
              if (RAND:3 == 0) { // :4654
                await era.print(`找到`); // :4655
              } else if (RAND:2 == 0) { // :4656
                await era.print(`一不小心捡到`); // :4657
              } else { // :4658
                await era.print(`无意中踩到`); // :4659
              } // :4660
              await era.printAndWait(`了的话…吼吼噢噢噢噢%UNICODE(0x2764) *1%」`); // :4661
              await era.printAndWait(`「实在是…非常的、令人兴奋不已啊%UNICODE(0x2764) *1%」`); // :4662
            } else if (RAND:2 == 0) { // :4663
              await era.printAndWait(`「光着身子、散着步、${sc()}、愉快的拉臭臭%UNICODE(0x2764) *1%」`); // :4664
              await era.printAndWait(`「快要靠近的的勇者…马上就要%UNICODE(0x2764) *1%　看到${sc()}拉臭臭的样子啦啊啊…%UNICODE(0x2764) *1%」`); // :4665
            } else { // :4666
              await era.printAndWait(`「主人大人、还有其他的各位、来看看吧%UNICODE(0x2764) *1%　哦、哦哦、哦吼吼哦…%UNICODE(0x2764) *1%」`); // :4667
              await era.printAndWait(`「全裸的${target_name}、在地下城…从菊穴拉出臭臭来了…请好好看着这不雅的姿态吧%UNICODE(0x2764) *1%」`); // :4668
            } // :4669
            // CFLAG:387  = 7（变量语义：CFLAG 族，387） // :4670
            era.set(`cflag:${target}:387`, 7); // :4670
            return 0; // :4671
          } // :4672
          // RAW: REND // :4673
          // 撮影中 // :4674
          if (TEQUIP:53 == 1) { // :4675
            if (RAND:3 == 0) { // :4676
              await era.printAndWait(`「拍下来啦%UNICODE(0x2764) *1%　${target_name}的、野外排泄…被拍下来了啦%UNICODE(0x2764) *1%」`); // :4677
            } else if (RAND:2 == 0) { // :4678
              await era.printAndWait(`「出来了出来了…%UNICODE(0x2764) *1%　嗷嗷%UNICODE(0x2764) *1%　再多看看啊…再多拍一些啊%UNICODE(0x2764) *1%」`); // :4679
            } else { // :4680
              await era.printAndWait(`「野外露出%UNICODE(0x2764) *1%　还野外排泄了…太有感觉了%UNICODE(0x2764) *1%　请再多拍一些哦……%UNICODE(0x2764) *1%」`); // :4681
            } // :4682
            // それ以外(野外プレイ時) // :4683
          } else { // :4684
            if (RAND:3 == 0) { // :4685
              await era.printAndWait(`「在这种…地方…${sc()}拉了这么多…太有感觉了…%UNICODE(0x2764) *1%」`); // :4686
            } else if (RAND:2 == 0) { // :4687
              await era.printAndWait(`「主人大人…${sc()}的…野外排泄…看吧…看着吧啊啊啊…%UNICODE(0x2764) *1%」`); // :4688
            } else { // :4689
              await era.printAndWait(`「停不下来啊%UNICODE(0x2764) *1%　光着身子…拉了好多…野外排泄%UNICODE(0x2764) *1%　好多…%UNICODE(0x2764) *1%」`); // :4690
            } // :4691
          } // :4692
          // 野外プレイ時でない // :4693
        } else { // :4694
          if (RAND:2 == 0) { // :4695
            await era.printAndWait(`「停不下来…根本停不下来啊…%UNICODE(0x2764) *1%　拉臭臭…好舒服啊…%UNICODE(0x2764) *1%」`); // :4696
          } else { // :4697
            await era.printAndWait(`「嗯嗯…吼…吼哦%UNICODE(0x2764) *1%　哈啊啊、嘤咿咿%UNICODE(0x2764) *1%　灌肠灌了好多出来…好棒%UNICODE(0x2764) *1%」`); // :4698
          } // :4699
        } // :4700
        // CFLAG:387  = 7（变量语义：CFLAG 族，387） // :4701
        era.set(`cflag:${target}:387`, 7); // :4701
        // 淫乱 // :4702
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:387 <= 5 || FLAG:7 == 2)) { // :4703
        // 野外プレイ時 // :4704
        if (TEQUIP:54 == 1) { // :4705
          // 共通喘ぎ // :4706
          if (RAND:2 == 0) { // :4707
            await era.print(`「哈唉呜~${heart(1)}`); // :4708
          } else { // :4709
            await era.print(`「哈唉呜~${heart(1)}`); // :4710
          } // :4711
          if (RAND:2 == 0) { // :4712
            await era.print(`嗯哦哦哦~${heart(3)}`); // :4713
          } else { // :4714
            await era.print(`哦吼噢噢~${heart(3)}`); // :4715
          } // :4716
          if (RAND:2 == 0) { // :4717
            await era.printAndWait(`噢噢噢哦~${heart(3)}」`); // :4718
          } else { // :4719
            await era.printAndWait(`啊啊啊~${heart(3)}」`); // :4720
          } // :4721
          if (RAND:2 == 0) { // :4722
            await era.printAndWait(`「主人~…哈唉呜~${heart(1)} 请，请不要看着那里~${heart(3)}」`); // :4723
          } else { // :4724
            await era.printAndWait(`「停…停不下来啊~~……在这种地方…${scf()}要、要拉出来了呀啊啊啊~${heart(3)}」`); // :4725
          } // :4726
          // 淫乱それ以外 // :4727
        } else { // :4728
          await era.printAndWait(`「哈啊~${heart(1)} 主人…要、要拉出来了呀啊啊啊~${heart(3)}」`); // :4729
        } // :4730
        // CFLAG:387  = 6（变量语义：CFLAG 族，387） // :4731
        era.set(`cflag:${target}:387`, 6); // :4731
        // 愛＋A感覚Lv3以上＋マゾっ気Lv3以上 // :4732
        // ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:387 <= 4 || FLAG:7 == 2) // :4733
        // 	PRINTFORMW // :4734
        // 	CFLAG:387 = 5 // :4735
        // 愛 // :4736
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:387 <= 3 || FLAG:7 == 2)) { // :4737
        await era.printAndWait(`「啊啊啊~、请不要看着那里……要、要拉出来了……真的……不要看啊嗷嗷」`); // :4738
        // CFLAG:387  = 4（变量语义：CFLAG 族，387） // :4739
        era.set(`cflag:${target}:387`, 4); // :4739
        // A感覚Lv3以上＋マゾっ気Lv3以上 // :4740
      } else if (ABL:3 >= 3 && ABL:21 >= 3 && (CFLAG:387 <= 2 || FLAG:7 == 2)) { // :4741
        // 野外プレイ時＋最深部に勇者進入時 // :4742
        // RAW: REPEAT CHARANUM // :4743
        if (TEQUIP:54 == 1 && CFLAG:COUNT:1 == 2 && CFLAG:COUNT:501 == 9 && ABL:17 >= 5) { // :4744
          if (RAND:3 == 0) { // :4745
            await era.printAndWait(`「啊啊啊啊啊啊啊…！　好舒服啊啊…！　怪物也好其他的勇者也行啊…！」`); // :4746
            await era.printAndWait(`「光着身子、在地下城、${sc()}排便的样子…好、好想被看到啊♪」`); // :4747
          } else if (RAND:2 == 0) { // :4748
            await era.printAndWait(`「明明不可以的、可是、好舒服噢噢噢噢…唔♪」`); // :4749
            await era.printAndWait(`「在还有其他人的气息的地下城里…光着身子拉臭臭…要上瘾了啊啊…♪」`); // :4750
          } else { // :4751
            await era.printAndWait(`「啊啊啊啊、停不下来啊啊…！　谁、有谁要过来了！　可是拉得停不下来啊！」`); // :4752
            await era.printAndWait(`「在地下城、裸体排便、不想停不下来…太舒服了啊啊啊啊…♪」`); // :4753
          } // :4754
          // CFLAG:387  = 3（变量语义：CFLAG 族，387） // :4755
          era.set(`cflag:${target}:387`, 3); // :4755
          return 0; // :4756
        } else if (TEQUIP:54 == 1 && CFLAG:COUNT:1 == 2 && CFLAG:COUNT:501 == 9) { // :4757
          await era.printAndWait(`「啊啊…！　这、这瞬间也有可能、会碰上在地下城探索中的其他勇者、的啊…！」`); // :4758
          await era.printAndWait(`「明明光着身子…在野外…排便、不想停下来、啊！　啊啊啊、怎么会这么舒服啊啊啊！？」`); // :4759
          // CFLAG:387  = 3（变量语义：CFLAG 族，387） // :4760
          era.set(`cflag:${target}:387`, 3); // :4760
          return 0; // :4761
        } // :4762
        // RAW: REND // :4763
        // 野外プレイ時 // :4764
        if (TEQUIP:54 == 1) { // :4765
          if (RAND:3 == 0) { // :4766
            await era.printAndWait(`「在外面…在地下城里…光着身子的这幅丑态、${scf()}、${sc()}……竟然」`); // :4767
          } else if (RAND:2 == 0) { // :4768
            await era.printAndWait(`「请原谅…请原谅我啊！！　啊、啊啊啊啊啊、出来了…出来了啊啊啊啊…唔！？　啊、啊嗷嗷嗷♪」`); // :4769
          } else { // :4770
            await era.printAndWait(`「啊…啊啊、泄出来了…！　连衣服都没穿的在地下城里…可是、怎么会、这么舒服…啊啊！」`); // :4771
          } // :4772
          // それ以外（A感覚Lv3以上＋マゾっ気Lv3以上） // :4773
        } else { // :4774
          await era.print(`「不、骗人的吧！　像这样子动着…慢慢排出来、菊穴、还蠕动`); // :4775
          if (RAND:3 == 0) { // :4776
            await era.printAndWait(`着……竟然…」`); // :4777
          } else if (RAND:2 == 0) { // :4778
            await era.printAndWait(`着……唔！」`); // :4779
          } else { // :4780
            await era.printAndWait(`着…明明不可以的……」`); // :4781
          } // :4782
        } // :4783
        // CFLAG:387  = 3（变量语义：CFLAG 族，387） // :4784
        era.set(`cflag:${target}:387`, 3); // :4784
        // それ以外 // :4785
      } else if (CFLAG:387 <= 1 || FLAG:7 == 2) { // :4786
        // 屈服刻印Lv3 // :4787
        if (MARK:2 == 3) { // :4788
          // 野外プレイ時＋最深部に勇者進入時 // :4789
          // RAW: REPEAT CHARANUM // :4790
          if (TEQUIP:54 == 1 && CFLAG:COUNT:1 == 2 && CFLAG:COUNT:501 == 9) { // :4791
            await era.printAndWait(`「求求您了、只有这点请不要…啊！　啊、啊啊啊啊…！？　出、出来了…！」`); // :4792
            await era.printAndWait(`「停下来…${sc()}拉出来的东西、要被其他勇者看见了啊呜呜呜呜……！！」`); // :4793
            // CFLAG:387  = 2（变量语义：CFLAG 族，387） // :4794
            era.set(`cflag:${target}:387`, 2); // :4794
            return 0; // :4795
          } // :4796
          // RAW: REND // :4797
          // 野外プレイ時＋撮影中 // :4798
          if (TEQUIP:54 == 1 && TEQUIP:53 == 1) { // :4799
            await era.print(`一丝不挂的${target_name}在地下城里不停地排便着……`); // :4800
            await era.printAndWait(`「请原谅我…请原谅…${sc()}的…这、这幅模样…请不要记录下来啊…」`); // :4801
            // 野外プレイ時 // :4802
          } else if (TEQUIP:54 == 1) { // :4803
            await era.printAndWait(`「不要、不要啊…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」`); // :4804
            // 撮影中 // :4805
          } else if (TEQUIP:53 == 1) { // :4806
            await era.printAndWait(`「呜呜…别看啊、至少…请不要拍、啊……」`); // :4807
            // それ以外 // :4808
          } else { // :4809
            await era.print(`「原、原谅我…啊啊啊啊！！`); // :4810
            if (RAND:3 == 0) { // :4811
              await era.printAndWait(`又要…出来了、出…快停下来啊……！！」`); // :4812
            } else if (RAND:2 == 0) { // :4813
              await era.printAndWait(`请、请怜悯下…！　啊？　啊啊、不要啊啊……」`); // :4814
            } else { // :4815
              await era.printAndWait(`不要…请原俩…啊啊啊！　啊啊啊……」」`); // :4816
            } // :4817
          } // :4818
          // 屈服刻印Lv3未満 // :4819
        } else { // :4820
          // 野外プレイ時＋最深部に勇者進入時 // :4821
          // RAW: REPEAT CHARANUM // :4822
          if (TEQUIP:54 == 1 && CFLAG:COUNT:1 == 2 && CFLAG:COUNT:501 == 9) { // :4823
            await era.printAndWait(`「啊啊、停下停下来啊啊…！　不要拉出来啊、啊…！　啊、啊啊…！？」`); // :4824
            await era.printAndWait(`「不、不然的话！　${sc()}的排泄物、就要被其他勇者看到了啊啊啊……！！」`); // :4825
            // CFLAG:387  = 2（变量语义：CFLAG 族，387） // :4826
            era.set(`cflag:${target}:387`, 2); // :4826
            return 0; // :4827
          } // :4828
          // RAW: REND // :4829
          // 野外プレイ時＋撮影中 // :4830
          if (TEQUIP:54 == 1 && TEQUIP:53 == 1) { // :4831
            await era.printAndWait(`「快、快停下啊！　这…这样的姿态被拍下来什么的…啊啊啊啊！？」`); // :4832
            // 野外プレイ時 // :4833
          } else if (TEQUIP:54 == 1) { // :4834
            await era.printAndWait(`「不、不要哇…在地下城里、连衣服都没穿、啊啊啊…停不下来、停下来……啊」`); // :4835
            // 撮影中 // :4836
          } else if (TEQUIP:53 == 1) { // :4837
            await era.printAndWait(`「厕所、快点去厕所…不行、在这里拍什么的…请原谅、啊啊啊、不要啊啊啊……！！」`); // :4838
          } else { // :4839
            await era.printAndWait(`「请、请原谅…啊啊啊啊~！！」`); // :4840
          } // :4841
        } // :4842
        // CFLAG:387  = 2（变量语义：CFLAG 族，387） // :4843
        era.set(`cflag:${target}:387`, 2); // :4843
      } // :4844
      return 0; // :4845
    } // :4846
  } // :4847

  // ------------------------------------------------- // :4849
  // 放置PLAY CFLAG:356 // :4850
  // ------------------------------------------------- // :4851
  if (SELECTCOM == 55) { // :4852
    // 初めて // :4853
    if (CFLAG:356 == 0) { // :4854
      // 助手 // :4855
      if (ASSI > 0 && ASSIPLAY) { // :4856
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`); // :4857
        // 愛 // :4858
      } else if (TALENT:85 == 1) { // :4859
        await era.printAndWait(`「哈啊哈啊…要…休息了吗...？」`); // :4860
        await era.printAndWait(`${target_name}不满地微眯着眼，看着${player_name}………`); // :4861
        // 淫乱 // :4862
      } else if (TALENT:76 == 1) { // :4863
        await era.printAndWait(`「哈啊…啊啊…主人~…拜，拜托了呀~…啊啊~…至、至少抱一下吧~~~…」`); // :4864
        await era.printAndWait(`${target_name}的眼睛湿润起来，向${player_name}撒起娇来了………`); // :4865
        // それ以外 // :4866
      } else { // :4867
        await era.printAndWait(`「嗯~………什么也不做吗？」`); // :4868
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`); // :4869
      } // :4870
      await era.print(''); // :4871
      // ワーム // :4872
      if (TEQUIP:11) { // :4874
        await era.printAndWait(`在${target_name}的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。`); // :4874
      } // :4874
      // アナルワーム // :4875
      if (TEQUIP:13) { // :4877
        await era.printAndWait(`在${target_name}的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。`); // :4877
      } // :4877
      // 肛珠 // :4878
      if (TEQUIP:19) { // :4880
        await era.printAndWait(`在${target_name}的肛门里有着拉珠、导致肛门一抽一抽地。`); // :4880
      } // :4880
      // 電動クリキャップ // :4881
      if (TEQUIP:14) { // :4883
        await era.printAndWait(`${target_name}的阴蒂戴上了电动阴蒂夹，不停地给${target_name}带来刺激。`); // :4883
      } // :4883
      // ニプルクリップローター // :4884
      if (TEQUIP:15) { // :4886
        await era.printAndWait(`${target_name}带在乳头上的跳蛋正不停地给予她刺激。`); // :4886
      } // :4886
      // 榨乳器 // :4887
      if (TEQUIP:16) { // :4889
        await era.print(`${target_name}的胸部正戴上了榨乳器而不停地被吸出母乳。`); // :4889
      } // :4889
      // オナホール // :4890
      if (TEQUIP:17) { // :4892
        await era.printAndWait(`${target_name}的阴茎被套上了飞机杯，好像下一秒就要射了一样一抽一抽地。`); // :4892
      } // :4892
      // アイマスク // :4893
      if (TEQUIP:43) { // :4895
        await era.printAndWait(`${target_name}正在带着眼罩。`); // :4895
      } // :4895
      // 縄 // :4896
      if (TEQUIP:44) { // :4898
        await era.printAndWait(`${target_name}的身体处于在被绳子捆绑住的状态。`); // :4898
      } // :4898
      // 灌肠+肛塞 // :4899
      if (TEQUIP:46) { // :4901
        await era.printAndWait(`${target_name}的肚子因为浣肠液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。`); // :4901
      } // :4901
      // 肛门电极 // :4902
      if (TEQUIP:49) { // :4904
        await era.printAndWait(`${target_name}的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。`); // :4904
      } // :4904
      // ビデオカメラ // :4905
      if (TEQUIP:53) { // :4907
        await era.printAndWait(`还有、这样的${target_name}的姿态由始至终都被录下来了………`); // :4907
      } // :4907
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :4908
      era.set(`cflag:${target}:356`, 1); // :4908
      return 0; // :4909
      // 二回目以降 // :4910
    } else { // :4911
      // 助手 // :4912
      if (ASSI > 0 && ASSIPLAY) { // :4913
        await era.printAndWait(`「………什么都不做吗？」`); // :4914
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`); // :4915
        // 淫乱＋欲情Lv3以上 // :4916
      } else if (TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && (CFLAG:356 <= 5 || FLAG:7 == 2)) { // :4917
        await era.printAndWait(`「好，好过分啊…用这种眼神看着这边…啊啊~啊~…明明，${scf()}、${sc()}…已经、变、变得奇怪起来了~………${heart(1)}」`); // :4918
        await era.printAndWait(`${target_name}已经完全被欲望支配了，明明什么都没有干就快要去了的样子………`); // :4919
        // CFLAG:356  = 6（变量语义：CFLAG 族，356） // :4920
        era.set(`cflag:${target}:356`, 6); // :4920
        // 淫乱 // :4921
      } else if (TALENT:76 == 1 && (CFLAG:356 <= 4 || FLAG:7 == 2)) { // :4922
        await era.printAndWait(`「哈啊…啊啊…主人~…拜，拜托了…啊啊…请，请抱一下${player_name}吧…」`); // :4923
        await era.printAndWait(`${target_name}湿润着眼睛向${player_name}撒起了娇………`); // :4924
        // CFLAG:356  = 5（变量语义：CFLAG 族，356） // :4925
        era.set(`cflag:${target}:356`, 5); // :4925
        // 爱＋欲情Lv3以上 // :4926
      } else if (TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && (CFLAG:356 <= 3 || FLAG:7 == 2)) { // :4927
        await era.printAndWait(`「不要休息了啦…快点…将${sc()}…啊嗯~…将${sc()}啊~………${heart(1)}」`); // :4928
        await era.printAndWait(`${target_name}完全忍受不了被放置play的样子………`); // :4929
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :4930
        era.set(`cflag:${target}:356`, 4); // :4930
        // 愛 // :4931
      } else if (TALENT:85 == 1 && (CFLAG:356 <= 2 || FLAG:7 == 2)) { // :4932
        await era.printAndWait(`「哈啊哈啊…要…休息了吗…？」`); // :4933
        await era.printAndWait(`${target_name}不满地眯着眼睛、看向${player_name}………`); // :4934
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :4935
        era.set(`cflag:${target}:356`, 3); // :4935
        // それ以外 // :4936
      } else if (CFLAG:356 <= 1 || FLAG:7 == 2) { // :4937
        await era.printAndWait(`「………什么都不做吗？」`); // :4938
        await era.printAndWait(`${target_name}一脸若无其事地看着这边………`); // :4939
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :4940
        era.set(`cflag:${target}:356`, 2); // :4940
      } // :4941
      await era.print(''); // :4942
      // ワーム // :4943
      if (TEQUIP:11) { // :4945
        await era.printAndWait(`${target_name}的蜜穴里的穴蠕虫正在蠕动着、毫不留情地在腔内来回钻着。`); // :4945
      } // :4945
      // アナルワーム // :4946
      if (TEQUIP:13) { // :4948
        await era.printAndWait(`${target_name}的肛门里的肛门虫正在蠕动着、毫不留情地在腔内来回钻着。`); // :4948
      } // :4948
      // アナルビーズ // :4949
      if (TEQUIP:19) { // :4951
        await era.printAndWait(`${target_name}的肛门里有着拉珠、导致肛门一抽一抽地。`); // :4951
      } // :4951
      // 電動クリキャップ // :4952
      if (TEQUIP:14) { // :4954
        await era.printAndWait(`${target_name}的阴蒂戴上了电动阴蒂夹，不停地给${target_name}带来刺激。`); // :4954
      } // :4954
      // ニプルクリップローター // :4955
      if (TEQUIP:15) { // :4957
        await era.printAndWait(`${target_name}带在乳头上的跳蛋正不停地给予她刺激。`); // :4957
      } // :4957
      // 榨乳器 // :4958
      if (TEQUIP:16) { // :4960
        await era.print(`${target_name}的胸部正戴上了榨乳器而不停地被吸出母乳。`); // :4960
      } // :4960
      // オナホール // :4961
      if (TEQUIP:17) { // :4963
        await era.printAndWait(`${target_name}的阴茎被套上了飞机杯，好像下一秒就要射出来了一样一抽一抽地。`); // :4963
      } // :4963
      // アイマスク // :4964
      if (TEQUIP:43) { // :4966
        await era.printAndWait(`${target_name}正在带着眼罩。`); // :4966
      } // :4966
      // 縄 // :4967
      if (TEQUIP:44) { // :4969
        await era.printAndWait(`${target_name}的身体处于在被绳子捆绑住的状态。`); // :4969
      } // :4969
      // 灌肠+肛塞 // :4970
      if (TEQUIP:46) { // :4972
        await era.printAndWait(`${target_name}的肚子因为浣肠液的原因咕噜咕噜地响着、如果将塞子拔出来的话肯定会立马喷出来了吧。`); // :4972
      } // :4972
      // アナル電極 // :4973
      if (TEQUIP:49) { // :4975
        await era.printAndWait(`${target_name}的肛门里插着电极棒、每当轻微地电流刺激一下，括约肌就会抽搐一下。`); // :4975
      } // :4975
      // ビデオカメラ // :4976
      if (TEQUIP:53) { // :4978
        await era.printAndWait(`还有、这样的${target_name}的姿态由始至终都被录下来了………`); // :4978
      } // :4978
      return 0; // :4979
    } // :4980
  } // :4981

  // ------------------------------------------------- // :4983
  // 交谈 CFLAG:357 // :4984
  // 「会話」はある意味最も口上が生きるコマンドかも // :4985
  // event_train_message_bから流用 // :4986
  // ------------------------------------------------- // :4987
  if (SELECTCOM == 56) { // :4988
    // 初めて // :4989
    if (CFLAG:357 == 0) { // :4990
      // ビデオ自己紹介 // :4991
      if (TEQUIP:53 == 1) { // :4992
        await era.print(`${master_name}催促着${target_name}开始自我介绍。`); // :4993
        if (RAND:3 == 0 && (TALENT:89 || ABL:17 >= 5)) { // :4994
          await era.print(`${target_name}将自己的本名、接下来要进行的性体验`); // :4995
          if (ABL:31 >= 3) { // :4997
            await era.print(`还有手淫时妄想的内容`); // :4997
          } // :4997
          await era.print(`之类的兴高采烈地说个不停……`); // :4998
          await era.print(`${target_name}只是因为想象着水晶球在故乡传播开的画面股间就湿润了……`); // :4999
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5000
          era.set('tflag:32 |', 2); // :5000
        } else if (TALENT:TARGET:76 == 1) { // :5001
          await era.print(`${target_name}对着水晶球说起了淫猥的话语`); // :5002
          await era.printAndWait(`「嗨、嗨~各位」`); // :5003
          await era.printAndWait(`「故乡的大家、有看到吗~？」`); // :5004
          await era.printAndWait(`「接下来…要和在这里的魔王大人做很多H的事情呢${heart(1)}」`); // :5005
          await era.printAndWait(`「${sc()}被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧${heart(1)}」`); // :5006
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5007
          era.set('tflag:32 |', 2); // :5007
        } else if (TALENT:TARGET:85 == 1) { // :5008
          await era.print(`${target_name}对着水晶球进行了自我介绍`); // :5009
          await era.printAndWait(`「嗨，嗨~」`); // :5010
          await era.printAndWait(`「故乡的大家、又看到吗？」`); // :5011
          await era.printAndWait(`「在这里的这位大人…就是众所皆知的…魔王大人…来的${heart(1)}」`); // :5012
          await era.printAndWait(`「今天…作为${sc()}的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧~${heart(1)}」`); // :5013
          await era.printAndWait(`${target_name}被${master_name}抱住后、就不停地向${master_name}的脸颊亲吻了起来………`); // :5014
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5015
          era.set('tflag:32 |', 2); // :5015
        } else if (PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5)) { // :5016
          await era.print(`${target_name}对着水晶球说起了淫猥的话语`); // :5017
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5018
          era.set('tflag:32 |', 2); // :5018
        } else if (ABL:10 >= 3 || ABL:11 >= 4 || ABL:17 >= 2) { // :5019
          await era.print(`${target_name}对着水晶球开始了自我介绍`); // :5020
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5021
          era.set('tflag:32 |', 2); // :5021
        } else { // :5022
          await era.printAndWait(`${target_name}岔开了视线什么都没说。`); // :5023
        } // :5024
      } else { // :5025
        await era.print(`${player_name}`); // :5026
        if (PALAM:5 >= PALAMLV:4 && (TALENT:85 || ABL:10 >= 5) && TFLAG:60) { // :5027
          await era.print(`向其搭话后，${target_name}摇晃着腰说起了恋慕的话语`); // :5028
        } else if (PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5) && TFLAG:60) { // :5029
          await era.print(`向其搭话后，${target_name}摇晃着腰说起了淫猥的话语`); // :5030
        } else if ((PALAM:4 >= PALAMLV:4 || ABL:10 >= 5 || TALENT:85 || TALENT:76) && PALAM:5 >= PALAMLV:4) { // :5031
          await era.print(`向其搭话后，${target_name}发出了`); // :5032
          if (TEQUIP:11 || TEQUIP:13 || TEQUIP:14 || TEQUIP:15 || TEQUIP:16 || TEQUIP:17) { // :5033
            await era.print(`欢喜的`); // :5034
          } else if (TEQUIP:44 || TEQUIP:49) { // :5035
            await era.print(`苦痛的`); // :5036
          } // :5037
          await era.print(`叫声，拼命地向你回话了。`); // :5038
          // 淫乱 // :5039
        } else if (TALENT:TARGET:76 == 1) { // :5040
          await era.print(`向其搭话后，${target_name}有点害羞地向你撒娇地一样靠近过来了。`); // :5041
          await era.printAndWait(`「主人…请随意地对${sc()}任何事情吧………${heart(1)}」`); // :5042
        } else if (PALAM:4 >= PALAMLV:4 || TALENT:85 || ABL:10 >= 5) { // :5043
          await era.print(`向其搭话后，${target_name}融洽地向你回话了。`); // :5044
          await era.printAndWait(`「请对${sc()}下任何的命令吧~………${heart(1)}」`); // :5045
        } else if (PALAM:4 >= PALAMLV:2 ||  ABL:10 >= 3) { // :5046
          await era.print(`向其搭话后，${target_name}就担惊受怕地样子向你回话了`); // :5047
          await era.printAndWait(`「啊、是、是的…」`); // :5048
        } else { // :5049
          await era.print(`向其搭话后，${target_name}好像根本没有听到一样………`); // :5050
        } // :5051
      } // :5052
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :5053
      era.set(`cflag:${target}:357`, 1); // :5053
      return 0; // :5054
      // 二回目以降 // :5055
    } else { // :5056
      // ビデオ自己紹介 // :5057
      if (TEQUIP:53 == 1) { // :5058
        await era.print(`${master_name}催促着${target_name}快点开始介绍。`); // :5059
        if (PALAM:5 >= PALAMLV:4 && (TALENT:85 || ABL:10 >= 5) && TFLAG:60) { // :5060
          await era.print(`${target_name}晃动着腰部开始说起了恋慕的话语。`); // :5061
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5062
          era.set('tflag:32 |', 2); // :5062
        } else if (PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5) && TFLAG:60) { // :5063
          await era.print(`${target_name}晃动着腰部说起了淫猥的话语。`); // :5064
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5065
          era.set('tflag:32 |', 2); // :5065
        } else if (RAND:3 == 0 && (TALENT:89 || ABL:17 >= 5)) { // :5066
          await era.print(`${target_name}将自己的本名、接下来要进行的性体验`); // :5067
          if (ABL:31 >= 3) { // :5069
            await era.print(`还有手淫时妄想的内容`); // :5069
          } // :5069
          await era.print(`之类的兴高采烈地说个不停……`); // :5070
          await era.print(`${target_name}只是因为想象到水晶球在故乡传播开的样子股间就湿润了……`); // :5071
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5072
          era.set('tflag:32 |', 2); // :5072
        } else if (TALENT:TARGET:76 == 1) { // :5073
          await era.print(`${target_name}对着水晶球说起了淫猥的话语。`); // :5074
          await era.printAndWait(`「嗨，嗨~各位」`); // :5075
          await era.printAndWait(`「故乡的大家、有看到吗~？」`); // :5076
          await era.printAndWait(`「接下来…要和在这里的魔王大人做很多H的事情呢${heart(1)}」`); // :5077
          await era.printAndWait(`「${sc()}被魔王大人调教…变成了怎样一个淫乱的女人…请大家好好鉴赏吧${heart(1)}」`); // :5078
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5079
          era.set('tflag:32 |', 2); // :5079
        } else if (TALENT:TARGET:85 == 1) { // :5080
          await era.print(`${target_name}对着水晶球开始了自我介绍`); // :5081
          await era.printAndWait(`「嗨，嗨~」`); // :5082
          await era.printAndWait(`「故乡的大家、有看到吗~？」`); // :5083
          await era.printAndWait(`「在这里的这位大人…就是众所皆知的…魔王大人…来的${heart(1)}」`); // :5084
          await era.printAndWait(`「今天…作为${sc()}的…恋人来…证明我们到底有多么地相亲相爱…请大家好好地见证吧~${heart(1)}」`); // :5085
          await era.printAndWait(`${target_name}被${master_name}抱住后、就不停地向${master_name}的脸颊亲吻了起来………`); // :5086
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5087
          era.set('tflag:32 |', 2); // :5087
        } else if (PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5)) { // :5088
          await era.print(`${target_name}对着水晶球说起了淫猥的话语`); // :5089
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5090
          era.set('tflag:32 |', 2); // :5090
        } else if (ABL:10 >= 3 || ABL:11 >= 4 || ABL:17 >= 2) { // :5091
          await era.print(`${target_name}对着水晶球开始了自我介绍`); // :5092
          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |） // :5093
          era.set('tflag:32 |', 2); // :5093
        } else { // :5094
          await era.printAndWait(`${target_name}岔开了视线什么都没说。`); // :5095
        } // :5096
      } else { // :5097
        await era.print(`${player_name}`); // :5098
        if (PALAM:5 >= PALAMLV:4 && (TALENT:85 || ABL:10 >= 5) && TFLAG:60) { // :5099
          await era.print(`向其搭话后，${target_name}摇晃着腰说起了恋慕的话语`); // :5100
        } else if (PALAM:5 >= PALAMLV:4 && (TALENT:76 || ABL:11 >= 5) && TFLAG:60) { // :5101
          await era.print(`向其搭话后，${target_name}摇晃着腰说起了淫猥的话语`); // :5102
        } else if ((PALAM:4 >= PALAMLV:4 || ABL:10 >= 5 || TALENT:85 || TALENT:76) && PALAM:5 >= PALAMLV:4) { // :5103
          await era.print(`向其搭话后，${target_name}发出了`); // :5104
          if (TEQUIP:11 || TEQUIP:13 || TEQUIP:14 || TEQUIP:15 || TEQUIP:16 || TEQUIP:17) { // :5105
            await era.print(`欢喜的`); // :5106
          } else if (TEQUIP:44 || TEQUIP:49) { // :5107
            await era.print(`苦痛的`); // :5108
          } // :5109
          await era.print(`叫声，拼命地向你回话了。`); // :5110
          // 淫乱 // :5111
        } else if (TALENT:TARGET:76 == 1) { // :5112
          await era.print(`向其搭话后，${target_name}有点害羞地向你撒娇地一样靠近过来了。`); // :5113
          await era.printAndWait(`「主人…请随意地对${sc()}任何事情吧………${heart(1)}」`); // :5114
        } else if (PALAM:4 >= PALAMLV:4 || TALENT:85 || ABL:10 >= 5) { // :5115
          await era.print(`向其搭话后，${target_name}融洽地向你回话了。`); // :5116
          await era.printAndWait(`「请对${sc()}下任何的命令吧~………${heart(1)}」`); // :5117
        } else if (PALAM:4 >= PALAMLV:2 ||  ABL:10 >= 3) { // :5118
          await era.print(`向其搭话后，${target_name}就担惊受怕地样子向你回话了`); // :5119
          await era.printAndWait(`「啊、是、是的…」`); // :5120
        } else { // :5121
          await era.print(`向其搭话后，${target_name}好像根本没有听到一样………`); // :5122
        } // :5123
      } // :5124
      return 0; // :5125
    } // :5126
  } // :5127

  // ------------------------------------------------- // :5129
  // 乳夹口交 CFLAG:360 // :5130
  // ------------------------------------------------- // :5131
  if (SELECTCOM == 123) { // :5132
    // 初めて // :5133
    if (CFLAG:TARGET:360 == 0) { // :5134
      // 淫乱 // :5135
      if (TALENT:TARGET:76 == 1) { // :5136
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。`); // :5137
        await era.printAndWait(`「嗯哈恩~…只用一根大鸡巴就能侵犯${sc()}的胸部还有嘴巴什么的…真是太棒了…嗯~嗯哼唔~…就呜呜~${heart(1)}」`); // :5138
        // 愛 // :5139
      } else if (TALENT:TARGET:85 == 1) { // :5140
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。`); // :5141
        await era.printAndWait(`「啊哈啊嗯~${heart(1)} ${target_name}好~好~地…亲吻${player_name}大人的大鸡巴的~${heart(1)}」`); // :5142
        // 侍奉精神Lv3以上 // :5143
      } else if (ABL:TARGET:16 >= 3) { // :5144
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、舔着胸部峰峦之间露出来的龟头。`); // :5145
        await era.printAndWait(`「嗯呼呜~…${heart(1)} 请让${target_name}来侍奉大鸡巴吧~${heart(1)}」`); // :5146
        // それ以外（奉仕精神Lv3未満） // :5147
      } else { // :5148
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。`); // :5149
        await era.printAndWait(`「啊啊~…这样…不知羞耻的…啾~…啾~…嗯呜嗯~………」`); // :5150
      } // :5151
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :5152
      era.set(`cflag:${target}:TARGET:360`, 1); // :5152
      return 0; // :5153
      // 二回目以降 // :5154
    } else { // :5155
      // 淫乱 // :5156
      if (TALENT:TARGET:76 == 1 && (CFLAG:360 <= 4 || FLAG:7 == 2)) { // :5157
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、吮吸起了在胸部峰峦之间露出来的龟头。`); // :5158
        await era.printAndWait(`「嗯哈恩~…只用一根大鸡巴就能侵犯${sc()}的胸部还有嘴巴什么的…真是太棒了…嗯~嗯哼唔~…就呜呜~${heart(1)}」`); // :5159
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :5160
        era.set(`cflag:${target}:360`, 5); // :5160
        // 愛 // :5161
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:360 <= 3 || FLAG:7 == 2)) { // :5162
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、温柔地亲吻胸部峰峦之间露出来的龟头。`); // :5163
        await era.printAndWait(`「啊哈啊嗯~${heart(1)} ${target_name}好~好~地…亲吻${player_name}大人的大鸡巴的~${heart(1)}」`); // :5164
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :5165
        era.set(`cflag:${target}:360`, 4); // :5165
        // 侍奉精神Lv3以上 // :5166
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:360 <= 2 || FLAG:7 == 2)) { // :5167
        if (RAND:2 == 0) { // :5168
          await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、从胸部之间伸出来的阴茎前端陶醉地舔着。`); // :5169
        } else { // :5170
          await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎包裹住、用舌尖舔着埋藏在胸部里的阴茎。`); // :5171
        } // :5172
        if (RAND:2 == 0) { // :5173
          await era.printAndWait(`「嗯呼呜~…${heart(1)} 非常感谢让${sc()}来侍奉大鸡巴啊~${heart(1)}」`); // :5174
        } else { // :5175
          await era.printAndWait(`「真是没办法呢~${heart(1)} …${sc()}的胸部就那么地舒服吗~？」`); // :5176
        } // :5177
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :5178
        era.set(`cflag:${target}:360`, 3); // :5178
        // それ以外（侍奉精神Lv3未満） // :5179
      } else if (CFLAG:360 <= 1 || FLAG:7 == 2) { // :5180
        await era.printAndWait(`${target_name}用胸部将${player_name}的阴茎夹住、用嘴巴含住了胸部峰峦之间露出来的龟头。`); // :5181
        await era.printAndWait(`「啊啊~…这样…不知羞耻的…啾~…啾~…嗯呜嗯~………」`); // :5182
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :5183
        era.set(`cflag:${target}:360`, 2); // :5183
      } // :5184
      return 0; // :5185
    } // :5186
  } // :5187
  // ------------------------------------------------- // :5188
  // 口交时自慰 CFLAG:361 // :5189
  // ------------------------------------------------- // :5190
  if (SELECTCOM == 125) { // :5191
    // 初めて // :5192
    if (CFLAG:TARGET:361 == 0) { // :5193
      // 淫乱 // :5194
      if (TALENT:TARGET:76 == 1) { // :5195
        await era.printAndWait(`${target_name}用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。`); // :5196
        await era.printAndWait(`「哈啊${heart(1)} 嗯呜~…啾呼呜~${heart(1)} 啊啊~…大鸡巴…好吃${heart(1)}」`); // :5197
        // 愛 // :5198
      } else if (TALENT:TARGET:85 == 1) { // :5199
        await era.printAndWait(`${target_name}就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。`); // :5200
        await era.printAndWait(`「嗯哈啊${heart(1)}…一边吸着一边自慰什么的…真是下流呢~…${heart(3)}」`); // :5201
        // 侍奉精神Lv3以上 // :5202
      } else if (ABL:TARGET:16 >= 3) { // :5203
        await era.printAndWait(`${target_name}如同命令的那样一边口交一边自慰起来了。`); // :5204
        await era.printAndWait(`「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`); // :5205
        // それ以外（奉仕精神Lv3未満） // :5206
      } else { // :5207
        await era.printAndWait(`${target_name}如同命令的那样一边口交一边自慰起来了。`); // :5208
        await era.printAndWait(`「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`); // :5209
      } // :5210
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :5211
      era.set(`cflag:${target}:TARGET:361`, 1); // :5211
      return 0; // :5212
      // 二回目以降 // :5213
    } else { // :5214
      // 淫乱 // :5215
      if (TALENT:TARGET:76 == 1 && (CFLAG:361 <= 4 || FLAG:7 == 2)) { // :5216
        await era.printAndWait(`${target_name}用一只手伸向了自己的蜜穴、还直接将阴茎含入口中，就这样吮吸着开始了自慰。`); // :5217
        await era.printAndWait(`「哈啊${heart(1)} 嗯呜~…啾呼呜~${heart(1)} 啊啊~…大鸡巴…好吃${heart(1)}」`); // :5218
        await era.printAndWait(`${target_name}好像很兴奋地一样流着口水、如同为了弄出声音一样爱抚着自己的蜜穴………`); // :5219
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :5220
        era.set(`cflag:${target}:361`, 5); // :5220
        // 爱慕 // :5221
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:361 <= 3 || FLAG:7 == 2)) { // :5222
        await era.printAndWait(`${target_name}就如同命令的那样将一只手伸向自己的蜜穴、一边自慰着一边将阴茎含入了口中。`); // :5223
        await era.printAndWait(`「嗯哈啊${heart(1)}…一边吸着一边自慰什么的…真是下流呢~…${heart(3)}」`); // :5224
        await era.printAndWait(`「但是、%SELF_CALL(TARGET, 1)%…为了${player_name}大人的话…不管怎样H而下流的事情都会做的…嗯啊啊~…哈呜~${heart(1)}」`); // :5225
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :5226
        era.set(`cflag:${target}:361`, 4); // :5226
        // 侍奉精神Lv3以上 // :5227
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:361 <= 2 || FLAG:7 == 2)) { // :5228
        await era.printAndWait(`${target_name}如同命令的那样一边口交一边自慰起来了。`); // :5229
        await era.printAndWait(`「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`); // :5230
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :5231
        era.set(`cflag:${target}:361`, 3); // :5231
        // それ以外（奉仕精神Lv3未満） // :5232
      } else if (CFLAG:361 <= 1 || FLAG:7 == 2) { // :5233
        await era.printAndWait(`${target_name}如同命令的那样一边口交一边自慰起来了。`); // :5234
        await era.printAndWait(`「嗯唔嗯~~…嗯啾~…啾呜~…啊~…哈啊…哈啊…${target_name}明，明白了…${target_name}会好好地…一边口交…一边自慰的…」`); // :5235
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :5236
        era.set(`cflag:${target}:361`, 2); // :5236
      } // :5237
      return 0; // :5238
    } // :5239
  } // :5240

  // ------------------------------------------------- // :5242
  // 手搓口交 CFLAG:362 // :5243
  // ------------------------------------------------- // :5244
  if (SELECTCOM == 126) { // :5245
    // 初めて // :5246
    if (CFLAG:TARGET:362 == 0) { // :5247
      // 淫乱 // :5248
      if (TALENT:TARGET:76 == 1) { // :5249
        await era.printAndWait(`${target_name}淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。`); // :5250
        await era.printAndWait(`「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`); // :5251
        // 愛 // :5252
      } else if (TALENT:TARGET:85 == 1) { // :5253
        await era.printAndWait(`${target_name}用湿润的眼睛盯着${player_name}看、将龟头含入口中后，用双手套弄起了阴茎。`); // :5254
        await era.printAndWait(`「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`); // :5255
        // 奉仕精神Lv3以上 // :5256
      } else if (ABL:TARGET:16 >= 3) { // :5257
        await era.printAndWait(`${target_name}将龟头含入了口中、用双手套弄起了阴茎。`); // :5258
        await era.printAndWait(`「嗯啾~…啾~呸咯~…嗯哼唔~…啊啊~…大鸡巴好烫啊…♪」`); // :5259
        // それ以外（侍奉精神Lv3未満） // :5260
      } else { // :5261
        await era.printAndWait(`${target_name}将龟头含入了口中、用双手套弄起了阴茎。`); // :5262
      } // :5263
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :5264
      era.set(`cflag:${target}:TARGET:362`, 1); // :5264
      return 0; // :5265
      // 二回目以降 // :5266
    } else { // :5267
      // 淫乱 // :5268
      if (TALENT:TARGET:76 == 1 && (CFLAG:362 <= 4 || FLAG:7 == 2)) { // :5269
        await era.printAndWait(`${target_name}淫乱的笑着将阴茎握入手中、轻轻地套弄后将龟头含撸了口中。`); // :5270
        await era.printAndWait(`「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`); // :5271
        await era.printAndWait(`「怎么样呀~？大鸡巴被套弄着…是不是很舒服呀~？${sc()}…手还有嘴巴都变得好烫了…感觉整个人都要不行了~~${heart(3)}」`); // :5272
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :5273
        era.set(`cflag:${target}:362`, 5); // :5273
        // 愛 // :5274
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:362 <= 3 || FLAG:7 == 2)) { // :5275
        await era.printAndWait(`${target_name}用湿润的眼睛盯着${player_name}看、将龟头含入口中后，用双手套弄起了阴茎。`); // :5276
        await era.printAndWait(`「嗯~嗯呜~${heart(1)}啾~…啾呜~…呸咯~${heart(1)}」`); // :5277
        await era.printAndWait(`「啊啊~${heart(1)} ${target_name}会更加地…更加地侍奉大鸡巴的~${heart(1)}」`); // :5278
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :5279
        era.set(`cflag:${target}:362`, 4); // :5279
        // 侍奉精神Lv3以上 // :5280
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:362 <= 2 || FLAG:7 == 2)) { // :5281
        await era.printAndWait(`${target_name}将龟头含入了口中、用双手套弄起了阴茎。`); // :5282
        await era.printAndWait(`「嗯啾~…啾~呸咯~…嗯呜嗯~…啊啊~…啊啊~…大鸡巴好烫啊~…♪」`); // :5283
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :5284
        era.set(`cflag:${target}:362`, 3); // :5284
        // それ以外（奉仕精神Lv3未満） // :5285
      } else if (CFLAG:362 <= 1 || FLAG:7 == 2) { // :5286
        await era.printAndWait(`${target_name}将龟头含入了口中、用双手套弄起了阴茎。`); // :5287
        await era.printAndWait(`「嗯啾~…啾~呸咯~…嗯呜嗯~…啊啊~……这样的…嗯~……啾呜~…」`); // :5288
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :5289
        era.set(`cflag:${target}:362`, 2); // :5289
      } // :5290
      return 0; // :5291
    } // :5292
  } // :5293


  // ------------------------------------------------- // :5296
  // 真空口交 CFLAG:363 // :5297
  // ------------------------------------------------- // :5298
  if (SELECTCOM == 127) { // :5299
    // 初めて // :5300
    if (CFLAG:TARGET:363 == 0) { // :5301
      // 淫乱 // :5302
      if (TALENT:TARGET:76 == 1) { // :5303
        await era.printAndWait(`${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5304
        await era.printAndWait(`「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`); // :5305
        // 愛 // :5306
      } else if (TALENT:TARGET:85 == 1) { // :5307
        await era.printAndWait(`${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5308
        await era.printAndWait(`「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`); // :5309
        // 奉仕精神Lv3以上 // :5310
      } else if (ABL:TARGET:16 >= 3) { // :5311
        await era.printAndWait(`${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5312
        await era.printAndWait(`「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`); // :5313
        // それ以外（侍奉精神Lv3未満） // :5314
      } else { // :5315
        await era.printAndWait(`${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5316
        await era.printAndWait(`「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`); // :5317
      } // :5318
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :5319
      era.set(`cflag:${target}:TARGET:363`, 1); // :5319
      return 0; // :5320
      // 二回目以降 // :5321
    } else { // :5322
      // 淫乱 // :5323
      if (TALENT:TARGET:76 == 1 && (CFLAG:363 <= 4 || FLAG:7 == 2)) { // :5324
        await era.printAndWait(`${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5325
        await era.printAndWait(`「啾唔嗯~~~${heart(1)}…恩呼嗯~…啾呜~${heart(1)}…啾呜嗯~呜呜~~${heart(1)}」`); // :5326
        await era.printAndWait(`「嗯唔呜嗯~${heart(1)} 啾呜~…啾噜呜嗯~~…${heart(1)} 精液~…${target_name}会全部吸出来的~${heart(1)}」`); // :5327
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :5328
        era.set(`cflag:${target}:363`, 5); // :5328
        // 愛 // :5329
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:363 <= 3 || FLAG:7 == 2)) { // :5330
        await era.printAndWait(`${target_name}将阴茎塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5331
        await era.printAndWait(`「啾呜嗯~${heart(1)} 啾嗯啾呜~~${heart(1)} 唔呜嗯~${heart(1)} 啾啾~…啾呜呜呜~${heart(1)}」`); // :5332
        await era.printAndWait(`「嗯哈啊~${heart(1)} 精液~…${target_name}会全部吸出来的~${heart(1)}」`); // :5333
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :5334
        era.set(`cflag:${target}:363`, 4); // :5334
        // 侍奉精神Lv3以上 // :5335
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:363 <= 2 || FLAG:7 == 2)) { // :5336
        await era.printAndWait(`${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5337
        await era.printAndWait(`「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`); // :5338
        await era.printAndWait(`「嗯哈啊~…精液~…会全部吸出来的~…唔哼哼~${heart(1)}」`); // :5339
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :5340
        era.set(`cflag:${target}:363`, 3); // :5340
        // それ以外（奉仕精神Lv3未満） // :5341
      } else if (CFLAG:363 <= 1 || FLAG:7 == 2) { // :5342
        await era.printAndWait(`${target_name}将阴茎勉强地塞到了喉咙深处、一边弄出下流的声音一边吮吸着。`); // :5343
        await era.printAndWait(`「嗯啾呜~…呜嗯~…啾噜嗯~啾唔哼~…嗯啾呜呜呜~！」`); // :5344
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :5345
        era.set(`cflag:${target}:363`, 2); // :5345
      } // :5346
      return 0; // :5347
    } // :5348
  } // :5349

  // ------------------------------------------------- // :5351
  // 六九式 CFLAG:364 // :5352
  // ------------------------------------------------- // :5353
  if (SELECTCOM == 69) { // :5354
    // 初めて // :5355
    if (CFLAG:TARGET:364 == 0) { // :5356
      // 淫乱 // :5357
      if (TALENT:TARGET:76 == 1) { // :5358
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎。`); // :5359
        await era.printAndWait(`「嗯啊啊嗯~${heart(1)} 做恶作剧…可是不行的噢~${heart(1)} 让${target_name}更加吮吸大鸡巴吧~${heart(3)}」`); // :5360
        // 愛 // :5361
      } else if (TALENT:TARGET:85 == 1) { // :5362
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}一边忍耐着蜜穴带来的快感一边吮吸着阴茎。`); // :5363
        await era.printAndWait(`「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了~…${heart(1)}」`); // :5364
        // 奉仕精神Lv3以上 // :5365
      } else if (ABL:TARGET:16 >= 3) { // :5366
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}因为蜜穴带来的快感而娇喘连连。`); // :5367
        await era.printAndWait(`「嗯哈呜嗯~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀~…哈嗯呀呜~~${heart(1)}」`); // :5368
        // それ以外（侍奉精神Lv3未満） // :5369
      } else { // :5370
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}摇晃屁股来忍耐着蜜穴带来的快感。`); // :5371
        await era.printAndWait(`「嗯…要、要不行了啊…请原谅${target_name}吧………」`); // :5372
      } // :5373
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :5374
      era.set(`cflag:${target}:TARGET:364`, 1); // :5374
      return 0; // :5375
      // 二回目以降 // :5376
    } else { // :5377
      // 淫乱 // :5378
      if (TALENT:TARGET:76 == 1 && (CFLAG:364 <= 4 || FLAG:7 == 2)) { // :5379
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}每当蜜穴传来一阵刺激后就会紧紧地吸着阴茎`); // :5380
        await era.printAndWait(`「嗯啊啊啊~${heart(1)} 恶作剧…可是不行的噢~${heart(1)} 让${target_name}更加吮吸大鸡巴吧~${heart(3)}`); // :5381
        await era.printAndWait(`「嗯哼嗯~${heart(1)} 啾噜啾噜${heart(1)}啾噜~…呸咯~…嗯呜嗯~嗯~嗯嗯嗯~${heart(1)}」`); // :5382
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :5383
        era.set(`cflag:${target}:364`, 5); // :5383
        // 愛 // :5384
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:364 <= 3 || FLAG:7 == 2)) { // :5385
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}一边忍耐着蜜穴带来的快感一边吮吸着阴茎。`); // :5386
        await era.printAndWait(`「嗯哈啊…恶作剧…可是不行的啊…因为不能侍奉大鸡巴了~…${heart(1)}」`); // :5387
        await era.printAndWait(`「真是…真是坏呢~${heart(1)}…啾噜噜${heart(1)} 啾呜~…呸咯~${heart(3)}」`); // :5388
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :5389
        era.set(`cflag:${target}:364`, 4); // :5389
        // 侍奉精神Lv3以上 // :5390
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:364 <= 2 || FLAG:7 == 2)) { // :5391
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}因为蜜穴带来的快感而娇喘连连。`); // :5392
        await era.printAndWait(`「嗯哈呜嗯~…不、不行的啊…这、这样就不能侍奉大鸡巴了呀~…哈嗯呀呜~~${heart(1)}」`); // :5393
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :5394
        era.set(`cflag:${target}:364`, 3); // :5394
        // それ以外（奉仕精神Lv3未満） // :5395
      } else if (CFLAG:364 <= 1 || FLAG:7 == 2) { // :5396
        await era.printAndWait(`${target_name}和${player_name}互相贪婪地用嘴巴舔着对方的股间。${target_name}摇晃屁股来忍耐着蜜穴带来的快感。`); // :5397
        await era.printAndWait(`「嗯…要、要不行了啊…请原谅${target_name}吧………」`); // :5398
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :5399
        era.set(`cflag:${target}:364`, 2); // :5399
      } // :5400
      return 0; // :5401
    } // :5402
  } // :5403

  // ------------------------------------------------- // :5405
  // 深喉 CFLAG:365 // :5406
  // ------------------------------------------------- // :5407
  if (SELECTCOM == 124) { // :5408
    // 初めて // :5409
    if (CFLAG:TARGET:365 == 0) { // :5410
      // 淫乱 // :5411
      if (TALENT:TARGET:76 == 1) { // :5412
        await era.printAndWait(`${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`); // :5413
        await era.printAndWait(`「嗯呜嗯~${heart(1)}…恩呼嗯~…嗯~嗯嗯嗯~${heart(1)}…呜哈啊啊~${heart(1)}」`); // :5414
        // 愛 // :5415
      } else if (TALENT:TARGET:85 == 1) { // :5416
        await era.printAndWait(`${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`); // :5417
        await era.printAndWait(`「嗯呜嗯~${heart(1)} 嗯啾噜嗯~${heart(1)} 唔呜啊嘛~${heart(1)} 啾呜~~~…啾噜呜呜呜呜~~~~${heart(1)}」`); // :5418
        // 奉仕精神Lv3以上 // :5419
      } else if (ABL:TARGET:16 >= 3) { // :5420
        await era.printAndWait(`${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`); // :5421
        await era.printAndWait(`「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜嗯~…嗯~嗯~嗯呜呜呜呜呜！！」`); // :5422
        // それ以外（侍奉精神Lv3未満） // :5423
      } else { // :5424
        await era.printAndWait(`${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`); // :5425
        await era.printAndWait(`「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~……嗯~嗯~嗯嗯嗯嗯嗯~～～！？」`); // :5426
      } // :5427
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :5428
      era.set(`cflag:${target}:TARGET:365`, 1); // :5428
      return 0; // :5429
      // 二回目以降 // :5430
    } else { // :5431
      // 淫乱 // :5432
      if (TALENT:TARGET:76 == 1 && (CFLAG:363 <= 4 || FLAG:7 == 2)) { // :5433
        await era.printAndWait(`${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`); // :5434
        await era.printAndWait(`「嗯呜嗯~${heart(1)}…恩呼嗯~…嗯~嗯嗯嗯~${heart(1)}…呜哈啊啊~${heart(1)}」`); // :5435
        await era.printAndWait(`「${sc()}的嘴巴是…大鸡巴专用通道来的${heart(1)} 嗯呜嗯哈啊~…嗯~嗯~嗯嗯~~～${heart(1)}」`); // :5436
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :5437
        era.set(`cflag:${target}:365`, 5); // :5437
        // 愛 // :5438
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:363 <= 3 || FLAG:7 == 2)) { // :5439
        await era.printAndWait(`${target_name}将阴茎塞进了喉咙深处、用嘴唇吮吸着根部。`); // :5440
        await era.printAndWait(`「嗯呜嗯~${heart(1)} 嗯啾噜嗯~${heart(1)} 唔呜啊嘛~${heart(1)} 啾呜~~~…啾噜呜呜呜呜~~~~${heart(1)}」`); // :5441
        await era.printAndWait(`「嗯哈啊~${heart(1)} 不行的啊~…因为大鸡巴的味道…脑袋…要变得奇怪起来了…${heart(1)}」`); // :5442
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :5443
        era.set(`cflag:${target}:365`, 4); // :5443
        // 侍奉精神Lv3以上 // :5444
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:363 <= 2 || FLAG:7 == 2)) { // :5445
        await era.printAndWait(`${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`); // :5446
        await era.printAndWait(`「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~…嗯~！嗯~！嗯呜呜呜呜~~！」`); // :5447
        await era.printAndWait(`「嗯哈啊~…不由自主地塞到了喉咙深处去了呢…呜呼呼~、更多地帮您做吧~${heart(1)}」`); // :5448
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :5449
        era.set(`cflag:${target}:365`, 3); // :5449
        // それ以外（奉仕精神Lv3未満） // :5450
      } else if (CFLAG:363 <= 1 || FLAG:7 == 2) { // :5451
        await era.printAndWait(`${target_name}想尽办法将阴茎勉强塞进了喉咙深处、喘不过气地开始了口腔侍奉。`); // :5452
        await era.printAndWait(`「嗯呜~！？嗯~…嗯噗~…嗯嗯~…嗯呜呃~…嗯~嗯~嗯嗯嗯嗯嗯~～～～～！？」`); // :5453
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :5454
        era.set(`cflag:${target}:365`, 2); // :5454
      } // :5455
      return 0; // :5456
    } // :5457
  } // :5458


  // ------------------------------------------------- // :5461
  // 强制口交 CFLAG:381 // :5462
  // ------------------------------------------------- // :5463
  if (SELECTCOM == 80) { // :5464
    // 初めて // :5465
    if (CFLAG:TARGET:381 == 0) { // :5466
      // 淫乱 // :5467
      if (TALENT:TARGET:76 == 1) { // :5468
        await era.printAndWait(`「嗯哼呜~${heart(1)} 嗯呜~${heart(1)} 嗯呼~…嗯呜呜~~~~${heart(1)}」`); // :5469
        await era.printAndWait(`${target_name}忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着………`); // :5470
        // 奉仕精神Lv3以上 // :5471
      } else if (ABL:TARGET:16 >= 3) { // :5472
        await era.printAndWait(`「嗯呼呜~…嗯哼~…呜噗嗯~~…嗯噗呜~…嗯~嗯~嗯~~嗯嗯嗯~~～！」`); // :5473
        await era.printAndWait(`${target_name}的嘴巴就被这样侵犯着………`); // :5474
        // それ以外 // :5475
      } else { // :5476
        await era.printAndWait(`「嗯~…嗯噗~…噗哈呜~…原、原谅我…嗯呜噗~！？」`); // :5477
        await era.printAndWait(`${target_name}因为喉咙的深处被抽插着流下眼泪………`); // :5478
      } // :5479
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :5480
      era.set(`cflag:${target}:TARGET:381`, 1); // :5480
      return 0; // :5481
      // 二回目以降 // :5482
    } else { // :5483
      // 淫乱 // :5484
      if (TALENT:TARGET:76 == 1 && (CFLAG:381 <= 4 || FLAG:7 == 2)) { // :5485
        await era.printAndWait(`「嗯呼~${heart(1)} 恩噗呜~${heart(1)} 嗯嗯呜~…恩噗呜嗯嗯~~${heart(1)}」`); // :5486
        await era.printAndWait(`${target_name}忍耐着喉咙被激烈抽插的感觉、用灵巧的舌头侍奉着。`); // :5487
        await era.printAndWait(`「噗啊~~${heart(1)}…非常感谢主人…噗嗯啊~…使用这个主人专用的嘴巴小穴~${heart(1)}」`); // :5488
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :5489
        era.set(`cflag:${target}:381`, 5); // :5489
        // 愛＋奉仕精神Lv5 // :5490
      } else if (TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:381 <= 3 || FLAG:7 == 2)) { // :5491
        await era.printAndWait(`「嗯哼唔~…嗯呜~…嗯噗嗯~…恩噗呜嗯~…嗯~嗯~嗯~嗯嗯嗯~～！」`); // :5492
        await era.printAndWait(`${target_name}喉咙深处被抽插着、就这样被侵犯着嘴巴。`); // :5493
        await era.printAndWait(`「啊哈啊~${heart(1)} ${sc()}的嘴巴~…已经变成小穴了…嘴巴小穴~…${heart(1)}」`); // :5494
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :5495
        era.set(`cflag:${target}:381`, 4); // :5495
        // 侍奉精神Lv3以上 // :5496
      } else if (ABL:TARGET:16 >= 3 && (CFLAG:381 <= 2 || FLAG:7 == 2)) { // :5497
        await era.printAndWait(`「嗯哼唔~…嗯呜~…噗嗯哈啊~…嗯噗呜啊~…嗯~嗯~嗯~嗯嗯嗯~～！」`); // :5498
        await era.printAndWait(`${target_name}喉咙深处被抽插着、就这样被侵犯着嘴巴。`); // :5499
        await era.printAndWait(`「啊嗯~啊嗯啊~…没，没关系的~…请更多地使用${target_name}的嘴巴吧♪」`); // :5500
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :5501
        era.set(`cflag:${target}:381`, 3); // :5501
        // それ以外 // :5502
      } else if (CFLAG:381 <= 1 || FLAG:7 == 2) { // :5503
        await era.printAndWait(`「嗯~…嗯呜~…噗呜啊…喉咙…喉咙好辛苦啊…原、原谅…嗯呜~…嗯~！呜呼呜呜呜~！」`); // :5504
        await era.printAndWait(`${target_name}因为喉咙的深处被抽插着流下眼泪………`); // :5505
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :5506
        era.set(`cflag:${target}:381`, 2); // :5506
      } // :5507
      return 0; // :5508
    } // :5509
  } // :5510

  // -------------------------------------------------------- // :5512
  // 穿环　CFLAG:348 // :5513
  // ピアスをしていたかという記憶は参照しない // :5514
  // 処理の問題でEVENT_TRAIN_MESSAGE_B.ERBとは着脱のフラグが逆 // :5515
  // -------------------------------------------------------- // :5516
  if (SELECTCOM == 87) { // :5517
    // 初めて // :5518
    // ピアスが初めてという設定だけど念のために外した場合の分岐も有り。 // :5519
    if (CFLAG:TARGET:348 == 0) { // :5520
      // 助手 // :5521
      if (ASSI > 0 && ASSIPLAY) { // :5522
        await era.print(''); // :5523
        // 淫乱 // :5524
      } else if (TALENT:TARGET:76 == 1) { // :5525
        // 装着する // :5526
        if (CFLAG:7 & P) { // :5527
          await era.printAndWait(`${target_name}因为第一次在皮肤上开洞而发出了悲鸣。`); // :5528
          // 両乳头 // :5529
          if (P == 1) { // :5530
            await era.printAndWait(`「啊啊…好漂亮的乳环啊~…乳头已经勃起地那么厉害了…${heart(1)}」`); // :5531
            await era.printAndWait(`${target_name}轻轻地摇动着胸部。乳环微微地闪着微光………`); // :5532
            // おへそ // :5533
          } else if (P == 2) { // :5534
            await era.printAndWait(`「哈啊…啊啊…真是好棒的礼物呢…好高兴啊~………♪」`); // :5535
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`); // :5536
            // ラビア // :5537
          } else if (P == 4) { // :5538
            await era.printAndWait(`「啊~…嗯~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢~~…${heart(1)}」`); // :5539
            await era.printAndWait(`${target_name}因为阴唇环的刺穿而发情起来了………`); // :5540
            // ペニスorクリトリス // :5541
          } else if (P == 8) { // :5542
            if (TALENT:121 || TALENT:122) { // :5543
              await era.printAndWait(`「啊哈~…啊啊啊~…被做了那么棒的事情后…要忍不住了啊~~${heart(1)}」`); // :5544
              await era.printAndWait(`${target_name}因为阴茎被打环后、露出了恍惚的表情………`); // :5545
            } else { // :5546
              await era.printAndWait(`「啊啊~…${sc()}已经…只能想到…SEX的事情而已了啊~~~${heart(1)}」`); // :5547
              await era.printAndWait(`${target_name}的阴蒂被打孔后、露出了恍惚的表情………`); // :5548
            } // :5549
            // 舌先 // :5550
          } else if (P == 16) { // :5551
            await era.printAndWait(`「嗯呜~…${sc()}会用这条变漂亮的舌头更多地侍奉魔王大人的~…${heart(1)}」`); // :5552
            await era.printAndWait(`${sc()}就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇`); // :5553
            // 唇 // :5554
          } else if (P == 32) { // :5555
            await era.printAndWait(`「嗯哼嗯~…适不适合呀~~~？」`); // :5556
            await era.printAndWait(`${target_name}舔着自己的唇确认唇环的存在………`); // :5557
            // 鼻穴 // :5558
          } else if (P == 64) { // :5559
            await era.printAndWait(`「嗯哼哼~…真是个漂亮的鼻环呢~~♪」`); // :5560
            await era.printAndWait(`${target_name}不停地擦拭着鼻环………`); // :5561
          } // :5562
          // 取り外し // :5563
        } else { // :5564
          await era.printAndWait(`${target_name}抚摸着拿掉环后的痕迹………`); // :5565
        } // :5566
        // 爱慕 // :5567
      } else if (TALENT:TARGET:85 == 1) { // :5568
        // 装着する // :5569
        if (CFLAG:7 & P) { // :5570
          await era.printAndWait(`${target_name}因为第一次在皮肤上开洞而发出了小声的悲鸣。`); // :5571
          // 両乳头 // :5572
          if (P == 1) { // :5573
            await era.printAndWait(`「啊…啊啊…居然将那么棒的东西送给${sc()}乳头…啊…啊啊…太有感觉了啊~♪」`); // :5574
            await era.printAndWait(`${target_name}两个乳头都勃起来了、结果让乳环一闪一闪的地发着光………`); // :5575
            // おへそ // :5576
          } else if (P == 2) { // :5577
            await era.printAndWait(`「大人您给予得礼物…${sc()}会好好对待下来的~…♪」`); // :5578
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`); // :5579
            // ラビア // :5580
          } else if (P == 4) { // :5581
            await era.printAndWait(`「啊啊…爱液要…漏出来了啊~…太、太有感觉了啊~~…啊啊…啊~${heart(1)}」`); // :5582
            await era.printAndWait(`${target_name}被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………`); // :5583
            // ペニスorクリトリス // :5584
          } else if (P == 8) { // :5585
            if (TALENT:121 || TALENT:122) { // :5586
              await era.printAndWait(`「哈啊…哈啊…小鸡鸡…变得好奇怪了…${sc()}的小鸡鸡…啊、啊啊啊~～${heart(1)}」`); // :5587
              await era.printAndWait(`${target_name}因为阴茎被打上了环、脸颊变得通红起来………`); // :5588
            } else { // :5589
              await era.printAndWait(`「不，不行的啊~~~…被做这样的事情的话${sc()}…已经…变得淫乱起来了啊…${heart(1)}」`); // :5590
              await era.printAndWait(`${target_name}因为阴蒂被打上了环、脸颊变得通红起来………`); // :5591
            } // :5592
            // 舌先 // :5593
          } else if (P == 16) { // :5594
            await era.printAndWait(`「哈啊…哈啊…好像已经固定好了呢…啊…啊啊~…♪」`); // :5595
            await era.printAndWait(`${player_name}抓住了${target_name}的舌头、检查着舌环的状况………`); // :5596
            // 唇 // :5597
          } else if (P == 32) { // :5598
            await era.printAndWait(`「呐~…${target_name}担心有没有好好地固定住呢…所以请用kiss来测试一下吧…${heart(1)}」`); // :5599
            await era.printAndWait(`${target_name}舔了一下唇环确定了后、向${player_name}撒起了娇………`); // :5600
            // 鼻穴 // :5601
          } else if (P == 64) { // :5602
            await era.printAndWait(`「………因为是主人给予的礼物来的…${target_name}会好好珍惜的………」`); // :5603
            await era.printAndWait(`${target_name}擦拭着鼻环………`); // :5604
          } // :5605
          // 取り外し // :5606
        } else { // :5607
          await era.printAndWait(`${target_name}貌似有点伤心地抚摸着被拿掉环后的痕迹………`); // :5608
        } // :5609
        // それ以外 // :5610
      } else { // :5611
        // 装着する // :5612
        if (CFLAG:7 & P) { // :5613
          await era.printAndWait(`${target_name}因为第一次皮肤上开洞而发出了悲鸣、留下了眼泪。`); // :5614
          // 両乳头 // :5615
          if (P == 1) { // :5616
            await era.printAndWait(`「不要…不要啊…不要…对乳头做那么过分的事情…呜~呜呜~………」`); // :5617
            await era.printAndWait(`${target_name}因为乳环带来的强烈疼痛而留下了眼泪………`); // :5618
            // おへそ // :5619
          } else if (P == 2) { // :5620
            await era.printAndWait(`「居，居然在这种地方穿环什么的…真、真是羞耻啊………」`); // :5621
            await era.printAndWait(`${target_name}因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………`); // :5622
            // ラビア // :5623
          } else if (P == 4) { // :5624
            await era.printAndWait(`「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊~…嗯~…呜啊~」`); // :5625
            await era.printAndWait(`${target_name}因为阴唇穿上了环而哗啦啦地流下了眼泪………`); // :5626
            // ペニスorクリトリス // :5627
          } else if (P == 8) { // :5628
            if (TALENT:121 || TALENT:122) { // :5629
              await era.printAndWait(`「已，已经…嫁不出去了啊………」`); // :5630
              await era.printAndWait(`${target_name}的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………`); // :5631
            } else { // :5632
              await era.printAndWait(`「拜，拜托了…什么都会做的…请将…环拿掉吧…${scf()}、${sc()}…要变奇怪了啊…啊啊~！」`); // :5633
              await era.printAndWait(`${target_name}的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………`); // :5634
            } // :5635
            // 舌先 // :5636
          } else if (P == 16) { // :5637
            await era.printAndWait(`「不要…呸呜咯…请呼要拉胡来呜~………」`); // :5638
            await era.printAndWait(`${player_name}将${target_name}的舌头抓住、确定着舌环………`); // :5639
            // 唇 // :5640
          } else if (P == 32) { // :5641
            await era.printAndWait(`「呜呜~…居然${sc()}的嘴唇上打上了这种东西………」`); // :5642
            await era.printAndWait(`${target_name}的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………`); // :5643
            // 鼻穴 // :5644
          } else if (P == 64) { // :5645
            await era.printAndWait(`「居然对${sc()}…对${sc()}做出屈辱的事情………呜呜呜~~」`); // :5646
            await era.printAndWait(`${target_name}的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………`); // :5647
          } // :5648
          // 取り外し // :5649
        } else { // :5650
          await era.printAndWait(`${target_name}擦拭着拿掉环后的痕迹………`); // :5651
        } // :5652
      } // :5653
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :5654
      era.set(`cflag:${target}:TARGET:348`, 1); // :5654
      return 0; // :5655
      // 二回目以降 // :5656
    } else { // :5657
      // 助手 // :5658
      if (ASSI > 0 && ASSIPLAY) { // :5659
        await era.print(''); // :5660
        // 淫乱 // :5661
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:348 <= 3 || FLAG:7 == 2)) { // :5662
        // 装着する // :5663
        if (CFLAG:7 & P) { // :5664
          // 両乳头 // :5665
          if (P == 1) { // :5666
            await era.printAndWait(`「啊啊…好漂亮的乳环啊~…乳头已经勃起地那么厉害了…${heart(1)}」`); // :5667
            await era.printAndWait(`${target_name}轻轻地摇动着胸部。乳环微微地闪着微光………`); // :5668
            // おへそ // :5669
          } else if (P == 2) { // :5670
            await era.printAndWait(`「哈啊…啊啊…真是好棒的礼物呢…好高兴啊~………♪」`); // :5671
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`); // :5672
            // ラビア // :5673
          } else if (P == 4) { // :5674
            await era.printAndWait(`「啊~…嗯~…这样做的话，不管什么时候都是都会有感觉了…真是困扰呢~~…${heart(1)}」`); // :5675
            await era.printAndWait(`${target_name}因为阴唇环的刺穿而发情起来了………`); // :5676
            // ペニスorクリトリス // :5677
          } else if (P == 8) { // :5678
            if (TALENT:121 || TALENT:122) { // :5679
              await era.printAndWait(`「啊哈~…啊啊啊~…被做了那么棒的事情后…要忍不住了啊~~${heart(1)}」`); // :5680
              await era.printAndWait(`${target_name}因为阴茎被打环后、露出了恍惚的表情………`); // :5681
            } else { // :5682
              await era.printAndWait(`「啊啊~…${sc()}已经…只能想到…SEX的事情而已了啊~~~${heart(1)}」`); // :5683
              await era.printAndWait(`${target_name}的阴蒂被打孔后、露出了恍惚的表情………`); // :5684
            } // :5685
            // 舌先 // :5686
          } else if (P == 16) { // :5687
            await era.printAndWait(`「嗯呜~…${sc()}会用这条变漂亮的舌头更多地侍奉魔王大人的~…${heart(1)}」`); // :5688
            await era.printAndWait(`${sc()}就像炫耀着舌尖的舌环一样下流地舔着自己的嘴唇………`); // :5689
            // 唇 // :5690
          } else if (P == 32) { // :5691
            await era.printAndWait(`「嗯哼嗯~…适不适合呀~~~？」`); // :5692
            await era.printAndWait(`${target_name}舔着自己的唇确认唇环的存在………`); // :5693
            // 鼻穴 // :5694
          } else if (P == 64) { // :5695
            await era.printAndWait(`「嗯哼哼~…真是个漂亮的鼻环呢~~♪」`); // :5696
            await era.printAndWait(`${target_name}不停地擦拭着鼻环………`); // :5697
          } // :5698
          // 取り外し // :5699
        } else { // :5700
          await era.printAndWait(`${target_name}抚摸着拿掉环后的痕迹………`); // :5701
        } // :5702
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :5703
        era.set(`cflag:${target}:348`, 4); // :5703
        // 爱慕 // :5704
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:348 <= 2 || FLAG:7 == 2)) { // :5705
        // 装着する // :5706
        if (CFLAG:7 & P) { // :5707
          // 両乳头 // :5708
          if (P == 1) { // :5709
            await era.printAndWait(`「啊…啊啊…居然将那么棒的东西送给${sc()}乳头…啊…啊啊…太有感觉了啊~♪」`); // :5710
            await era.printAndWait(`${target_name}两个乳头都勃起来了、结果让乳环一闪一闪的地发着光`); // :5711
            // おへそ // :5712
          } else if (P == 2) { // :5713
            await era.printAndWait(`「大人您给予得礼物…${sc()}会好好对待下来的~…♪」`); // :5714
            await era.printAndWait(`${target_name}抚摸着肚脐的周围………`); // :5715
            // ラビア // :5716
          } else if (P == 4) { // :5717
            await era.printAndWait(`「啊啊…爱液要…漏出来了啊~…太、太有感觉了啊~~…啊啊…啊~${heart(1)}」`); // :5718
            await era.printAndWait(`${target_name}被打上了为了延长阴唇般的阴唇环、爱液流地整个大腿都是了………`); // :5719
            // ペニスorクリトリス // :5720
          } else if (P == 8) { // :5721
            if (TALENT:121 || TALENT:122) { // :5722
              await era.printAndWait(`「哈啊…哈啊…小鸡鸡…变得好奇怪了…${sc()}的小鸡鸡…啊、啊啊啊~～${heart(1)}」`); // :5723
              await era.printAndWait(`${target_name}因为阴茎被打上了环、脸颊变得通红起来………`); // :5724
            } else { // :5725
              await era.printAndWait(`「不，不行的啊~~~…被做这样的事情的话${sc()}…已经…变得淫乱起来了啊…${heart(1)}」`); // :5726
              await era.printAndWait(`${target_name}因为阴蒂被打上了环、脸颊变得通红起来………`); // :5727
            } // :5728
            // 舌先 // :5729
          } else if (P == 16) { // :5730
            await era.printAndWait(`「哈啊…哈啊…好像已经固定好了呢…啊…啊啊~…♪」`); // :5731
            await era.printAndWait(`${player_name}将${target_name}的舌头抓住、确定着舌环………`); // :5732
            // 唇 // :5733
          } else if (P == 32) { // :5734
            await era.printAndWait(`「呐~…${target_name}担心有没有好好地固定住呢…所以请用kiss来测试一下吧…${heart(1)}」`); // :5735
            await era.printAndWait(`${target_name}舔了一下唇环确定了后、向${player_name}撒起了娇………`); // :5736
            // 鼻穴 // :5737
          } else if (P == 64) { // :5738
            await era.printAndWait(`「………因为是主人给予的礼物来的…${target_name}会好好珍惜的………」`); // :5739
            await era.printAndWait(`${target_name}擦拭着鼻环………`); // :5740
          } // :5741
          // 取り外し // :5742
        } else { // :5743
          await era.printAndWait(`${target_name}貌似有点伤心地抚摸着被拿掉环后的痕迹.………`); // :5744
        } // :5745
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :5746
        era.set(`cflag:${target}:348`, 3); // :5746
        // それ以外 // :5747
      } else if (CFLAG:348 <= 1 || FLAG:7 == 2) { // :5748
        // 装着する // :5749
        if (CFLAG:7 & P) { // :5750
          // 両乳头 // :5751
          if (P == 1) { // :5752
            await era.printAndWait(`「不要…不要啊…不要…对乳头做那么过分的事情…呜~呜呜~………」`); // :5753
            await era.printAndWait(`${target_name}因为乳环带来的强烈疼痛而留下了眼泪………`); // :5754
            // おへそ // :5755
          } else if (P == 2) { // :5756
            await era.printAndWait(`「居，居然在这种地方穿环什么的…真、真是羞耻啊………」`); // :5757
            await era.printAndWait(`${target_name}因为肚脐穿环带来的疼痛让眼睛被泪水给模糊了………`); // :5758
            // ラビア // :5759
          } else if (P == 4) { // :5760
            await era.printAndWait(`「拿掉…请拿下来吧…这种地方被穿环了的话…啊啊~…嗯~…呜啊~」`); // :5761
            await era.printAndWait(`${target_name}因为阴唇穿上了环而哗啦啦地流下了眼泪………`); // :5762
            // ペニスorクリトリス // :5763
          } else if (P == 8) { // :5764
            if (TALENT:121 || TALENT:122) { // :5765
              await era.printAndWait(`「已，已经…嫁不出去了啊………」`); // :5766
              await era.printAndWait(`${target_name}的阴茎被穿上孔、阴茎环正闪烁着沉闷的光………`); // :5767
            } else { // :5768
              await era.printAndWait(`「拜，拜托了…什么都会做的…请将…环拿掉吧…${scf()}、${sc()}…要变奇怪了啊…啊啊~！」`); // :5769
              await era.printAndWait(`${target_name}的阴蒂被穿上了孔、阴蒂环正闪烁着沉闷的光………`); // :5770
            } // :5771
            // 舌先 // :5772
          } else if (P == 16) { // :5773
            await era.printAndWait(`「不要…呸呜咯…请呼要拉胡来呜~………」`); // :5774
            await era.printAndWait(`${player_name}将${target_name}的舌头抓住、确定着舌环………`); // :5775
            // 唇 // :5776
          } else if (P == 32) { // :5777
            await era.printAndWait(`「呜呜~…居然${sc()}的嘴唇上打上了这种东西………」`); // :5778
            await era.printAndWait(`${target_name}的水灵灵的嘴唇被打上了环、唇环正发着沉闷的光………`); // :5779
            // 鼻穴 // :5780
          } else if (P == 64) { // :5781
            await era.printAndWait(`「居然对${sc()}…对${sc()}做出屈辱的事情………呜呜呜~~」`); // :5782
            await era.printAndWait(`${target_name}的鼻子打上了跟牛的环一样的鼻环、眼泪哗啦啦地流下来了………`); // :5783
          } // :5784
          // 取り外し // :5785
        } else { // :5786
          await era.printAndWait(`${target_name}擦拭着拿掉环后的痕迹………`); // :5787
        } // :5788
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :5789
        era.set(`cflag:${target}:348`, 2); // :5789
      } // :5790
    } // :5791
    return 0; // :5792
  } // :5793


  // ------------------------------------------------- // :5796
  // @DOG_KOJO関係（X1をキャラ番号に置換） // :5797
  // 兽奸PLAY用口上を独立させました // :5798
  // ------------------------------------------------- // :5799

// @DOG_KOJO_3 // :5800
function DOG_KOJO_3() {

  // ------------------------------------------------- // :5802
  // 兽奸爱撫 CFLAG:301 // :5803
  // ------------------------------------------------- // :5804
  if (SELECTCOM == 0) { // :5805
    // 初めて // :5806
    if (CFLAG:301 == 0) { // :5807
      // 牝犬 // :5808
      if (TALENT:TARGET:136 == 1) { // :5809
        await era.printAndWait(`「欢迎~~……嗯~、没、没错……嗯嗯~……！」`); // :5810
        // 淫乱 // :5811
      } else if (TALENT:TARGET:76 == 1) { // :5812
        await era.printAndWait(`「啊啊…魔王大人想要试试，${sc()}能被野狗弄成怎样淫乱下流的样子对吧、……啊嗯！」`); // :5813
        // 屈服刻印Lv3 // :5814
      } else if (MARK:2 == 3) { // :5815
        await era.printAndWait(`「这，这样的……被狗什么的…再怎么说也……呜啊啊啊~……！」`); // :5816
        // 屈服刻印Lv2以上 // :5817
      } else if (MARK:2 >= 2) { // :5818
        await era.printAndWait(`「为…为什么、${sc()}要受到这样的……！」`); // :5819
        // それ以外 // :5820
      } else { // :5821
        await era.printAndWait(`「不……不要啊！才…才不要做这种事情！！」`); // :5822
      } // :5823
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :5824
      era.set(`cflag:${target}:301`, 1); // :5824
      return 0; // :5825
      // 二回目以降 // :5826
    } else { // :5827
      // 牝犬にして結婚相手が野良犬 // :5828
      if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900 && (CFLAG:301 <= 7 || FLAG:7 == 2)) { // :5829
        await era.printAndWait(`「啊哈啊…${heart(1)} 来吧、老公大人啊…啊、啊啊啊~…」`); // :5830
        // CFLAG:301  = 8（变量语义：CFLAG 族，301） // :5831
        era.set(`cflag:${target}:301`, 8); // :5831
        // 牝犬 // :5832
      } else if (TALENT:TARGET:136 == 1 && (CFLAG:301 <= 6 || FLAG:7 == 2)) { // :5833
        await era.printAndWait(`「能侍奉作为魔王大人的雌犬的${sc()}什么的、真是一条幸运的野狗呢……嗯哼哼♪」`); // :5834
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :5835
        era.set(`cflag:${target}:301`, 7); // :5835
        // 淫乱 // :5836
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:301 <= 5 || FLAG:7 == 2)) { // :5837
        await era.printAndWait(`「啊哈啊…狗狗的舌头、好大……呜哈啊、真令人兴奋呢♪」`); // :5838
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :5839
        era.set(`cflag:${target}:301`, 6); // :5839
        // 爱慕 // :5840
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:301 <= 4 || FLAG:7 == 2)) { // :5841
        await era.printAndWait(`「魔王大人…狗作为对象什么的、嗯！不要啊、啊~……！」`); // :5842
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :5843
        era.set(`cflag:${target}:301`, 5); // :5843
        // 屈服刻印Lv3 // :5844
      } else if (MARK:2 == 3 && (CFLAG:301 <= 3 || FLAG:7 == 2)) { // :5845
        await era.printAndWait(`「呜啊…啊…啊啊啊……不要啊……」`); // :5846
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :5847
        era.set(`cflag:${target}:301`, 4); // :5847
        // 屈服刻印Lv2 // :5848
      } else if (MARK:2 == 2 && (CFLAG:301 <= 2 || FLAG:7 == 2)) { // :5849
        await era.printAndWait(`「已、已经…呜呜……请、请住手吧……」`); // :5850
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :5851
        era.set(`cflag:${target}:301`, 3); // :5851
        // それ以外 // :5852
      } else if (MARK:2 <= 1 && (CFLAG:301 <= 1 || FLAG:7 == 2)) { // :5853
        await era.printAndWait(`「快、快离开！这个……呜呜~……！」`); // :5854
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :5855
        era.set(`cflag:${target}:301`, 2); // :5855
      } // :5856
      return 0; // :5857
    } // :5858
  } // :5859

  // ------------------------------------------------- // :5861
  // 兽奸舔阴 CFLAG:302 // :5862
  // ------------------------------------------------- // :5863
  if (SELECTCOM == 1) { // :5864
    // 初めて // :5865
    if (CFLAG:302 == 0) { // :5866
      // 牝犬 // :5867
      if (TALENT:TARGET:136 == 1) { // :5868
        await era.printAndWait(`「是这里哦、明白了吧？…啊嗯~、没、没错……嗯哈嗯~……！」`); // :5869
        // 淫乱 // :5870
      } else if (TALENT:TARGET:76 == 1) { // :5871
        await era.printAndWait(`「啊哈…这么地闻着那儿的味道……呜嗯~♪嗯~、没、没错……就是，这样舔……」`); // :5872
        // 処女 // :5873
      } else if (TALENT:TARGET:0 == 1) { // :5874
        await era.printAndWait(`「哈呜啊！不要啊……不要！不要呀啊啊！」`); // :5875
        // それ以外 // :5876
      } else { // :5877
        await era.printAndWait(`「啊呜……不、不要…在做什……呜啊啊！不要啊！」`); // :5878
      } // :5879
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :5880
      era.set(`cflag:${target}:302`, 1); // :5880
      return 0; // :5881
      // 二回目以降 // :5882
    } else { // :5883
      // 牝犬にして結婚相手が野良犬 // :5884
      if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900 && (CFLAG:302 <= 6 || FLAG:7 == 2)) { // :5885
        await era.printAndWait(`「来吧…老公大人~${heart(1)} 就像平常地一样、这里…啊哈嗯啊~！真，真熟练呢~~~…${heart(1)}」`); // :5886
        // CFLAG:302  = 7（变量语义：CFLAG 族，302） // :5887
        era.set(`cflag:${target}:302`, 7); // :5887
        // 牝犬 // :5888
      } else if (TALENT:TARGET:136 == 1 && (CFLAG:302 <= 5 || FLAG:7 == 2)) { // :5889
        await era.printAndWait(`「有着母狗的味道对吧~？　哼哼~…没错、那里……啊呜嗯~！啊、啊啊~♪」`); // :5890
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :5891
        era.set(`cflag:${target}:302`, 6); // :5891
        // 淫乱 // :5892
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:302 <= 4 || FLAG:7 == 2)) { // :5893
        await era.printAndWait(`「哼啊~……不只是小豆豆而已、整个小穴都……啊哈嗯~……♪」`); // :5894
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :5895
        era.set(`cflag:${target}:302`, 5); // :5895
        // 爱慕 // :5896
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:302 <= 3 || FLAG:7 == 2)) { // :5897
        await era.printAndWait(`「果，果然还是、${master_name}的手指、更加…啊~！嗯啊啊~……！」`); // :5898
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :5899
        era.set(`cflag:${target}:302`, 4); // :5899
        // 屈服刻印Lv3 // :5900
      } else if (MARK:2 == 3 && (CFLAG:302 <= 2 || FLAG:7 == 2)) { // :5901
        await era.printAndWait(`「哈呜！呜…呜…！」`); // :5902
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :5903
        era.set(`cflag:${target}:302`, 3); // :5903
        // それ以外（屈服刻印Lv3未満） // :5904
      } else if (CFLAG:302 <= 1 || FLAG:7 == 2) { // :5905
        await era.printAndWait(`「请快住手！不…不要啊……！」`); // :5906
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :5907
        era.set(`cflag:${target}:302`, 2); // :5907
      } // :5908
      return 0; // :5909
    } // :5910
  } // :5911


  // ------------------------------------------------- // :5914
  // 兽奸胸爱撫 CFLAG:306 // :5915
  // ------------------------------------------------- // :5916
  if (SELECTCOM == 5) { // :5917
    // 初めて // :5918
    if (CFLAG:306 == 0) { // :5919
      // ;母乳体质 // :5920
      if (TALENT:130 == 1) { // :5921
        // 牝犬 // :5922
        if (TALENT:TARGET:136 == 1) { // :5923
          await era.printAndWait(`「啊啊~…对狗狗的味道、对狗狗的舌头有反应了……${sc()}的乳房…母狗的奶要渗出来了啊${heart(1)}」`); // :5924
          // 淫乱 // :5925
        } else if (TALENT:TARGET:76 == 1) { // :5926
          await era.printAndWait(`「明明是野狗作对象来的……淫乱的${sc()}的胸部、居然会溢出那么多的奶出来…${heart(1)}」`); // :5927
          // それ以外 // :5928
        } else { // :5929
          await era.printAndWait(`「不、不要…这样的不要啊……啊啊……明明讨厌来着、胸部却……」`); // :5930
        } // :5931
        // 牝犬 // :5932
      } else if (TALENT:TARGET:136 == 1) { // :5933
        await era.printAndWait(`「同样都是狗狗来的嘛…哼哼哼~${heart(1)} 可以的哦、请舔吧~……」`); // :5934
        // 淫乱 // :5935
      } else if (TALENT:TARGET:76 == 1) { // :5936
        await era.printAndWait(`「啊嗯~、明明是野狗来的…明明是野狗来的~、身体却有反应了~…」`); // :5937
        // それ以外 // :5938
      } else { // :5939
        await era.printAndWait(`「不要…！不要、在舔哪里呢……！」`); // :5940
      } // :5941
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :5942
      era.set(`cflag:${target}:TARGET:306`, 1); // :5942
      return 0; // :5943
      // 二回目以降 // :5944
    } else { // :5945
      // ;牝犬にして結婚相手が野良犬さらに母乳体质 // :5946
      if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900 && TALENT:130 == 1 && (CFLAG:306 <= 7 || FLAG:7 == 2)) { // :5947
        await era.printAndWait(`「啊哈啊~！老，老公大人真是的${heart(1)} 这样舔来舔去的话、乳房…乳房要~${heart(1)}」`); // :5948
        // CFLAG:306  = 8（变量语义：CFLAG 族，306） // :5949
        era.set(`cflag:${target}:306`, 8); // :5949
        // 牝犬にして結婚相手が野良犬 // :5950
      } else if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900 && (CFLAG:306 <= 6 || FLAG:7 == 2)) { // :5951
        await era.printAndWait(`「啊啊~…好温柔啊~好温柔啊~、老公大人${heart(1)} 更加地、用力地疼爱${sc()}，也可以的哦…${heart(1)}」`); // :5952
        // CFLAG:306  = 7（变量语义：CFLAG 族，306） // :5953
        era.set(`cflag:${target}:306`, 7); // :5953
        // 牝犬 // :5954
      } else if (TALENT:TARGET:136 == 1 && (CFLAG:306 <= 5 || FLAG:7 == 2)) { // :5955
        await era.printAndWait(`「嗯~、比起乳房来…更加、像野兽一样嘛…啊啊、同样都是狗来的嘛、更加地…」`); // :5956
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :5957
        era.set(`cflag:${target}:306`, 6); // :5957
        // 淫乱 // :5958
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:306 <= 4 || FLAG:7 == 2)) { // :5959
        await era.printAndWait(`「啊嗯嗯~、嗯~、明明是野狗来的……真是的~、乳头居然…变成这样了呀~♪」`); // :5960
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :5961
        era.set(`cflag:${target}:306`, 5); // :5961
        // 愛 // :5962
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:306 <= 3 || FLAG:7 == 2)) { // :5963
        await era.printAndWait(`「嗯~、总觉得……有点舒服、又有点难受的…嗯~！」`); // :5964
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :5965
        era.set(`cflag:${target}:306`, 4); // :5965
        // 屈服刻印Lv3 // :5966
      } else if (MARK:2 == 3 && (CFLAG:306 <= 2 || FLAG:7 == 2)) { // :5967
        await era.printAndWait(`「呜~！嗯…嗯呜~…！」`); // :5968
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :5969
        era.set(`cflag:${target}:306`, 3); // :5969
        // それ以外（屈服刻印Lv3未満） // :5970
      } else if (CFLAG:306 <= 1 || FLAG:7 == 2) { // :5971
        await era.printAndWait(`「真、真是好恶心啊……！」`); // :5972
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :5973
        era.set(`cflag:${target}:306`, 2); // :5973
      } // :5974
      return 0; // :5975
    } // :5976
  } // :5977

  // ------------------------------------------------- // :5979
  // 兽奸キス CFLAG:307 // :5980
  // ------------------------------------------------- // :5981
  // ☆改造　06/17 // :5982
  if (SELECTCOM == 6) { // :5983
    // 初吻 // :5984
    if (CFLAG:307 == 0 && TFLAG:13) { // :5985
      // 牝犬にして結婚相手が野良犬 // :5986
      if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900) { // :5987
        await era.print(`「啊啊~……${target_name}可爱的老公大人…」`); // :5988
        await era.printAndWait(`「只是和老公大人接吻……不像样的雌犬的身体热地就像着火一样了~${heart(1)}」`); // :5989
        await era.printAndWait(`${target_name}和野狗的舌头互相缠绕在一起、露出一脸陶醉的微笑。`); // :5990
        // 牝犬 // :5991
      } else if (TALENT:TARGET:136 == 1) { // :5992
        await era.printAndWait(`「第一次的kiss、对象居然是野狗…啊啊~、不管是身体还是心理都完全是母狗来的了…♪${heart(1)}」`); // :5993
        // 淫乱 // :5994
      } else if (TALENT:TARGET:76 == 1) { // :5995
        await era.printAndWait(`「吻被、野狗给夺走了…而且、还是第一次…哈啊啊~…要兴奋起来了啊~${heart(1)}」`); // :5996
        // それ以外 // :5997
      } else { // :5998
        await era.printAndWait(`「不、不要……！　呜呜~…怎么会……第一次…居然是，这样的野狗做对象什么的……」`); // :5999
      } // :6000
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :6001
      era.set(`cflag:${target}:307`, 1); // :6001
      return 0; // :6002
      // （調教では）初めて // :6003
    } else if (CFLAG:307 == 0) { // :6004
      // 牝犬 // :6005
      if (TALENT:TARGET:136 == 1) { // :6006
        // PRINTFORMW 「初めての口づけが、野良犬相手…ああ、もう身も心も牝犬ですわね…♪」 // :6007
        await era.printAndWait(`「和野狗亲吻什么的、心脏还会小鹿乱撞什么的……唔哼哼~、${target_name}身心都变成雌犬了呢~${heart(1)}」`); // :6008
        // 淫乱 // :6009
      } else if (TALENT:TARGET:76 == 1) { // :6010
        // PRINTFORMW 「野良犬に、唇を奪われるなんて…それも、初めての…はぁあ…興奮してしまいますわ」 // :6011
        await era.printAndWait(`「被野狗给、将嘴唇给夺走什么的……哈啊~…兴奋地好像身体都要燃起来了呀~」`); // :6012
        // それ以外 // :6013
      } else { // :6014
        // PRINTFORMW 「いっ、いや……！　ううっ…そんな……初めてが…こんな、野良犬相手だなんて……」 // :6015
        await era.printAndWait(`「怎么能……和野狗亲吻什么的……」`); // :6016
      } // :6017
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :6018
      era.set(`cflag:${target}:307`, 1); // :6018
      return 0; // :6019
      // 二回目以降 // :6020
    } else { // :6021
      // 牝犬 // :6022
      if (TALENT:TARGET:136 == 1 && (CFLAG:307 <= 5 || FLAG:7 == 2)) { // :6023
        // PRINTFORML %SAVESTR:TARGET%は一心不乱に野良犬と舌を絡ませている // :6024
        // PRINTFORMW 「あはぁ、いぬくさい…いい匂い…」 // :6025
        if (RAND:2 == 0) { // :6026
          await era.print(`「哈啊~…真是好棒啊~${heart(1)}」`); // :6027
        } else { // :6028
          await era.print(`「嗯~…好像要融化掉了一样啊~${heart(1)}」`); // :6029
        } // :6030
        await era.print(`${target_name}`); // :6031
        if (RAND:2 == 0) { // :6032
          await era.print(`一脸陶醉的表情`); // :6033
        } else { // :6034
          await era.print(`专心地`); // :6035
        } // :6036
        await era.printAndWait(`和野狗用舌头缠绕在一起了。`); // :6037
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :6038
        era.set(`cflag:${target}:307`, 6); // :6038
        // 淫乱 // :6039
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:307 <= 4 || FLAG:7 == 2)) { // :6040
        // PRINTFORMW 「犬とキスだなんて…魔王様変わってるね」 // :6041
        await era.printAndWait(`「是魔王大人的命令的话…会欢喜地顺从的~」`); // :6042
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :6043
        era.set(`cflag:${target}:307`, 5); // :6043
        // 愛 // :6044
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:307 <= 3 || FLAG:7 == 2)) { // :6045
        // PRINTFORMW 「魔王様のことがわかりません…」 // :6046
        if (RAND:2 == 0) { // :6047
          await era.printAndWait(`「为什么啊……魔王大人……」`); // :6048
        } else { // :6049
          await era.printAndWait(`「这是在测试${target_name}的爱意吗……魔王大人……」`); // :6050
        } // :6051
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :6052
        era.set(`cflag:${target}:307`, 4); // :6052
        // 顺从Lv2以上 // :6053
      } else if (ABL:10 >=2 && (CFLAG:307 <= 2 || FLAG:7 == 2)) { // :6054
        // PRINTFORMW 「はい…犬とキスします…」 // :6055
        if (RAND:2 == 0) { // :6056
          await era.printAndWait(`「和野狗亲吻什么的……」`); // :6057
        } else { // :6058
          await era.printAndWait(`「${target_name}明白了…会和狗亲吻的……」`); // :6059
        } // :6060
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :6061
        era.set(`cflag:${target}:307`, 3); // :6061
        // それ以外 // :6062
      } else if (CFLAG:307 <= 1 || FLAG:7 == 2) { // :6063
        // PRINTFORMW 「いやだぁ…くさい…勘弁してくれ…」 // :6064
        await era.printAndWait(`「好臭啊…啊啊~、这样的……」`); // :6065
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :6066
        era.set(`cflag:${target}:307`, 2); // :6066
      } // :6067
      return 0; // :6068
    } // :6069
  } // :6070

  // 	;------------------------------------------------- // :6072
  // 	;兽奸舔肛 CFLAG:310 // :6073
  // 	;------------------------------------------------- // :6074
  // ☆改造　06/17 // :6075
  if (SELECTCOM == 9) { // :6076
    // 初めて // :6077
    if (CFLAG:310 == 0) { // :6078
      // 牝犬 // :6079
      if (TALENT:TARGET:136 == 1) { // :6080
        // PRINTFORMW 「お尻舐められて…ううっ、ごめんね、わんちゃん…」 // :6081
        await era.printAndWait(`「啊啊…屁股、更多更加尽情地、呸咯呸咯地舔吧~${heart(1)}」`); // :6082
        // 淫乱 // :6083
      } else if (TALENT:TARGET:76 == 1) { // :6084
        // PRINTFORMW 「ひゃっ、やだぁ」 // :6085
        await era.printAndWait(`「哈呜~…那、那里是~啊嗯~${heart(1)}」`); // :6086
        // 愛 // :6087
      } else if (TALENT:TARGET:85 == 1) { // :6088
        // PRINTFORMW 「うーん、犬に…」 // :6089
        await era.printAndWait(`「好、好羞耻啊……」`); // :6090
        // それ以外（愛無し） // :6091
      } else { // :6092
        // PRINTFORMW 「や、やめろぉ！　どこ舐めてる！」 // :6093
        await era.printAndWait(`「不要啊……请原、请原谅${target_name}吧……」`); // :6094
      } // :6095
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :6096
      era.set(`cflag:${target}:TARGET:310`, 1); // :6096
      return 0; // :6097
      // 二回目以降 // :6098
    } else { // :6099
      // 牝犬 // :6100
      if (TALENT:TARGET:136 == 1 && (CFLAG:310 <= 5 || FLAG:7 == 2)) { // :6101
        // PRINTFORML %SAVESTR:TARGET%は尻穴を両手で広げて犬の舌を受け入れた // :6102
        // PRINTFORMW 「はぁ…はぁ…いいよぉ…」 // :6103
        await era.print(`「哈啊…更尽情地、舔吧~…弄湿那里吧~……」`); // :6104
        await era.printAndWait(`「请处罚一下……${target_name}的不像样的屁股吧~」`); // :6105
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :6106
        era.set(`cflag:${target}:310`, 6); // :6106
        // 淫乱 // :6107
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:310 <= 4 || FLAG:7 == 2)) { // :6108
        // PRINTFORMW 「犬の舐めかたって…へん」 // :6109
        await era.printAndWait(`「真是奇怪的感觉呢~……」`); // :6110
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :6111
        era.set(`cflag:${target}:310`, 5); // :6111
        // 愛 // :6112
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:310 <= 3 || FLAG:7 == 2)) { // :6113
        // PRINTFORMW 「どういうことでしょう…こんな…」 // :6114
        await era.printAndWait(`「如果魔王大人希望这样的话……${target_name}会忍耐下来的」`); // :6115
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :6116
        era.set(`cflag:${target}:310`, 4); // :6116
        // 屈服刻印Lv3 // :6117
      } else if (MARK:2 == 3 && (CFLAG:310 <= 2 || FLAG:7 == 2)) { // :6118
        // PRINTFORMW 「はい…尻穴差し出します…」 // :6119
        await era.printAndWait(`「如果是魔王大人的命令来的话……那就没有办法了呢……」`); // :6120
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :6121
        era.set(`cflag:${target}:310`, 3); // :6121
        // それ以外（屈服刻印Lv3未満） // :6122
      } else if (CFLAG:310 <= 1 || FLAG:7 == 2) { // :6123
        // PRINTFORMW 「ぎゃぁ！　そんなとこ舐めるなんて…やめてくれぇ」 // :6124
        await era.printAndWait(`「哼呜~…为什么要做这样的事情啊……」`); // :6125
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :6126
        era.set(`cflag:${target}:310`, 2); // :6126
      } // :6127
      return 0; // :6128
    } // :6129
  } // :6130
  //  // :6131
  // 	;------------------------------------------------- // :6132
  // 	;兽奸背后位 CFLAG:322 // :6133
  // 	;------------------------------------------------- // :6134
  if (SELECTCOM == 21) { // :6135
    // 初めて // :6136
    if (CFLAG:TARGET:322 == 0) { // :6137
      // 处女 // :6138
      if (TALENT:0 == 1) { // :6139
        // 牝犬 // :6140
        if (TALENT:136 == 1) { // :6141
          // PRINTFORML %SAVESTR:TARGET%は完全に牝犬となって尻を振った // :6142
          // PRINTFORML 「処女捧げますぅ！　%SELF_CALL(TARGET)%のおま○こはお犬様専用です！　種付けしてぇ！」 // :6143
          // PRINTFORMW 交尾の喜びに打ち震え口からよだれを垂らして%SAVESTR:TARGET%は宣言した // :6144
          await era.print(`「好高兴啊~${heart(1)} 将第一次先给犬大人什么的~……请、请粗鲁地侵犯${sc()}这只雌犬吧~${heart(3)}」`); // :6145
          await era.printAndWait(`色情地四肢着地地趴在地上摇晃着屁股、浮现一副陶醉而恍惚的表情的${target_name}从嘴边流出了口水，还将舌头伸出来乱晃。`); // :6146
          // 淫乱 // :6147
        } else if (TALENT:76 == 1) { // :6148
          // PRINTFORMW 「犬相手に初めてを…%SELF_CALL(TARGET)%らしいか」 // :6149
          await era.printAndWait(`「初次的对象是野狗什么的~……对呢、作为献上像${target_name}这样的淫乱处女的对象还真是不错呢~${heart(1)}」`); // :6150
          // 愛 // :6151
        } else if (TALENT:85 == 1) { // :6152
          // PRINTFORMW 「魔王様に捧げたかったのに…」 // :6153
          await era.printAndWait(`「魔王大人……希望这样做的话，那${target_name}就接受其命运……」`); // :6154
          // それ以外 // :6155
        } else { // :6156
          // PRINTFORMW 「や、め…やめろおおおおおお！！」 // :6157
          await era.printAndWait(`「不要啊啊~！！」`); // :6158
        } // :6159
        // 非処女 // :6160
      } else { // :6161
        // 牝犬 // :6162
        if (TALENT:136 == 1) { // :6163
          // PRINTFORML %SAVESTR:TARGET%は完全に牝犬となって尻を振った // :6164
          // PRINTFORML 「%SELF_CALL(TARGET)%のおま○こはお犬様専用です！　交尾してぇ！　種付けしてぇ！」 // :6165
          // PRINTFORMW 交尾の喜びに打ち震え口からよだれを垂らして%SAVESTR:TARGET%は宣言した // :6166
          await era.print(`「是的…${sc()}的小穴是狗大人专用的 以后每天都会交尾的${heart(1)}」`); // :6167
          // 淫乱 // :6168
        } else if (TALENT:76 == 1) { // :6169
          // PRINTFORMW 「えっ、犬と…まぁ、いいけど」 // :6170
          await era.printAndWait(`「和狗做吗？ 呵呵…很期待呢${heart(1)}」`); // :6171
          // 愛 // :6172
        } else if (TALENT:85 == 1) { // :6173
          // PRINTFORMW 「魔王様…なんで%SELF_CALL(TARGET)%がこんな目に…」 // :6174
          await era.printAndWait(`「咕…魔王大人、请再考虑一下……」`); // :6175
          // それ以外 // :6176
        } else { // :6177
          // PRINTFORMW 「や、め…やめろおおおおおお！！」 // :6178
          await era.printAndWait(`「和狗什么的…不要啊！！」`); // :6179
        } // :6180
      } // :6181
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :6182
      era.set(`cflag:${target}:322`, 1); // :6182
      return 0; // :6183
      // 二回目以降 // :6184
    } else { // :6185
      // 牝犬 // :6186
      if (TALENT:TARGET:136 == 1 && (CFLAG:322 <= 6 || FLAG:7 == 2)) { // :6187
        if (TEQUIP:53) { // :6188
          // 撮影中 // :6189
          await era.print(`「请看吧${heart(1)} 狗肉棒插进了${sc()}的小穴里……${heart(3)}」`); // :6190
          await era.print(`「狗肉棒${heart(1)} 深深地插进来了${heart(2)} 真正的交尾啊${heart(3)}」`); // :6191
          await era.print(`${target_name}四脚着地、一边向水晶球实况转播一边被狗侵犯着。`); // :6192
          await era.printAndWait(`2匹野兽就那样互相寻求着沉溺在了肉欲里……`); // :6193
        } else if (RAND:3 == 0) { // :6194
          await era.print(`「啊嗯~${heart(1)} 想要更加更加激烈地做呢~${heart(3)}」`); // :6195
          await era.print(`${target_name}四肢着地跪在地上、从背后被狗侵犯着。`); // :6196
          await era.printAndWait(`两头野兽也不在意周围的视线，互相追求着对方，沉浸在了肉欲当中……`); // :6197
        } else if (RAND:2 == 0) { // :6198
          await era.print(`「啊啊啊~${heart(1)} 狗狗的大鸡巴嘴巴了${heart(3)}」`); // :6199
          await era.printAndWait(`${target_name}将作为人类的尊严完全丢掉了，作为一头野兽享受着被野狗侵犯所带来的快乐。`); // :6200
        } else { // :6201
          await era.print(`「请塞进来吧${heart(1)} 塞进${target_name}这个狗狗大人专用的肉便器里吧~${heart(1)} 」`); // :6202
          await era.printAndWait(`如同邀请野狗一样将屁股生出来、让野狗看见那已经濡湿了的蜜穴，${target_name}露出了妖艳的笑容。`); // :6203
        } // :6204
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :6205
        era.set(`cflag:${target}:322`, 7); // :6205
        // 淫乱 // :6206
      } else if (TALENT:TARGET:76 == 1 && (CFLAG:322 <= 5 || FLAG:7 == 2)) { // :6207
        // PRINTFORMW 「犬とセックスするのも経験のうちかな…」 // :6208
        await era.printAndWait(`「相比魔王大人派过来的魔物们来说…狗什么的真的不算什么呢」`); // :6209
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :6210
        era.set(`cflag:${target}:322`, 6); // :6210
        // 愛 // :6211
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:322 <= 4 || FLAG:7 == 2)) { // :6212
        // PRINTFORMW 「犬もいいけど…魔王様ぁ」 // :6213
        if (RAND:2 == 0) { // :6214
          await era.printAndWait(`「魔王大人…${target_name}会一生都努力侍奉您的、所以……请大发慈悲吧」`); // :6215
        } else { // :6216
          await era.printAndWait(`「请…请不要看着${target_name}的这种样子……」`); // :6217
        } // :6218
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :6219
        era.set(`cflag:${target}:322`, 5); // :6219
        // 屈服刻印Lv3＋V感覚Lv3以上 // :6220
      } else if (MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:322 <= 3 || FLAG:7 == 2)) { // :6221
        // PRINTFORMW 「信じられない…わたし、交尾してる…」 // :6222
        await era.printAndWait(`「哈啊~…~……才，才没有对狗的鸡巴有感觉了呢……」`); // :6223
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :6224
        era.set(`cflag:${target}:322`, 4); // :6224
        // 屈服刻印Lv3 // :6225
      } else if (MARK:2 == 3 && (CFLAG:322 <= 2 || FLAG:7 == 2)) { // :6226
        // PRINTFORMW 「はい…交尾します…」 // :6227
        await era.printAndWait(`「这不是开玩笑来的对吧……」`); // :6228
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :6229
        era.set(`cflag:${target}:322`, 3); // :6229
        // それ以外 // :6230
      } else if (CFLAG:322 <= 1 || FLAG:7 == 2) { // :6231
        // PRINTFORMW 「嫌だ…こんなの…ひどすぎる…」 // :6232
        await era.printAndWait(`「请、请原谅${target_name}了吧…拜托了、拜托了……」`); // :6233
        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :6234
        era.set(`cflag:${target}:322`, 2); // :6234
      } // :6235
      return 0; // :6236
    } // :6237
  } // :6238

  // ------------------------------------------------- // :6240
  // 兽奸背后位アナル CFLAG:328 // :6241
  // ------------------------------------------------- // :6242
  if (SELECTCOM == 27) { // :6243
    // 初めて // :6244
    if (CFLAG:TARGET:328 == 0) { // :6245
      // 牝犬 // :6246
      if (TALENT:TARGET:136 == 1) { // :6247
        await era.print(`${target_name}晃动着屁股引诱着野狗`); // :6248
        //  PRINTFORMW 「虽然是后面的穴来的…也请收下吧~♪」 // :6249
        await era.printAndWait(`「${sc()}的不净之穴在这边${heart(1)}」`); // :6250
        // 淫乱 // :6251
      } else if (TALENT:TARGET:76 == 1) { // :6252
        //  PRINTFORMW 「和狗肛交…是吗......」 // :6253
        await era.printAndWait(`「这种肮脏的行为、还是第一次♪」`); // :6254
        // 爱慕 // :6255
      } else if (TALENT:TARGET:85 == 1) { // :6256
        //  PRINTFORMW 「狗和屁股什么的…」 // :6257
        await era.printAndWait(`「这种肮脏的行为、还是第一次♪」`); // :6258
        // それ以外（爱無し） // :6259
      } else { // :6260
        //  PRINTFORMW 「想要干什么…骗人的吧…？」 // :6261
        await era.printAndWait(`「这种肮脏的行为、我不想干啊……」`); // :6262
      } // :6263
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :6264
      era.set(`cflag:${target}:TARGET:328`, 1); // :6264
      return 0; // :6265
      // 二回目以降 // :6266
    } else { // :6267
      // 牝犬＋A感覚Lv3以上 // :6268
      if (TALENT:TARGET:136 == 1 && ABL:3 >= 3 && (CFLAG:328 <= 6 || FLAG:7 == 2)) { // :6269
        if (TEQUIP:53) { // :6270
          await era.print(`${target_name}通过水晶球看着自己和不净之物联系在一起的光景`); // :6271
          await era.print(`「请欣赏吧…${sc()}的肛门小穴被狗肉棒插到了深处…」`); // :6272
          await era.print(`「${sc()}…有感觉了${heart(1)} 请欣赏因为不净之穴在含着狗肉棒而有感觉的${sc()}吧${heart(1)}」`); // :6273
          await era.printAndWait(`${target_name}带着快乐得快要融化了的表情实况转播自己的行为`); // :6274
        } else if (RAND:2 == 0) { // :6275
          await era.print(`${target_name}因为肛穴的感觉而融化掉了`); // :6276
          await era.print(`「狗狗大人的大鸡巴…塞满了${sc()}的粪穴了呀…♪」`); // :6277
          await era.printAndWait(`到了这种程度的话，${target_name}已经变不回来了吧`); // :6278
        } else { // :6279
          await era.print(`${target_name}兴奋地将屁股给张开了`); // :6280
          await era.print(`「狗狗大人~…如果${sc()}的粪穴没关系的话请使用吧…」`); // :6281
          await era.printAndWait(`${target_name}向野兽献媚的姿态简直连畜生都不如`); // :6282
        } // :6283
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :6284
        era.set(`cflag:${target}:328`, 7); // :6284
        // 淫乱＋A感覚Lv3以上 // :6285
      } else if (TALENT:TARGET:76 == 1 && ABL:3 >= 3 && (CFLAG:328 <= 5 || FLAG:7 == 2)) { // :6286
        //  PRINTFORMW 「跟狗狗做…也好舒服啊~」 // :6287
        await era.printAndWait(`「因为这种肮脏的行为而有感觉的${sc()}…是变态啊」`); // :6288
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :6289
        era.set(`cflag:${target}:328`, 6); // :6289
        // 爱＋A感覚Lv3以上 // :6290
      } else if (TALENT:TARGET:85 == 1 && ABL:3 >= 3 && (CFLAG:328 <= 4 || FLAG:7 == 2)) { // :6291
        //  PRINTFORMW 「是魔王大人的大鸡巴就好了…」 // :6292
        await era.printAndWait(`「因为这种肮脏的行为而有感觉的${sc()}…是变态啊」`); // :6293
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :6294
        era.set(`cflag:${target}:328`, 5); // :6294
        // 爱慕 // :6295
      } else if (TALENT:TARGET:85 == 1 && (CFLAG:328 <= 3 || FLAG:7 == 2)) { // :6296
        //  PRINTFORMW 「魔王大人…为什么…」 // :6297
        await era.printAndWait(`「这是多么肮脏啊」`); // :6298
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :6299
        era.set(`cflag:${target}:328`, 4); // :6299
        // A感覚Lv3以上 // :6300
      } else if (ABL:3 >= 3 && (CFLAG:328 <= 2 || FLAG:7 == 2)) { // :6301
        //  PRINTFORMW 「屁股被…狗狗的…呜呜~」 // :6302
        await era.printAndWait(`「用狗的东西…做这么肮脏的行为…才不会有感觉的…」`); // :6303
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :6304
        era.set(`cflag:${target}:328`, 3); // :6304
        // それ以外（爱無し、A感覚Lv3未満） // :6305
      } else if (CFLAG:328 <= 1 || FLAG:7 == 2) { // :6306
        //  PRINTFORMW 「这样的…简直疯掉了…」 // :6307
        await era.printAndWait(`「好肮脏啊…」`); // :6308
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :6309
        era.set(`cflag:${target}:328`, 2); // :6309
      } // :6310
      return 0; // :6311
    } // :6312
  } // :6313
  //  // :6314
  // 	;------------------------------------------------- // :6315
  // 	;兽奸手淫 CFLAG:331 // :6316
  // 	;------------------------------------------------- // :6317
  // 	IF SELECTCOM == 30 // :6318
  // 		;初めて // :6319
  // 		IF CFLAG:TARGET:331 == 0 // :6320
  // 			;淫乱 // :6321
  // 			IF TALENT:TARGET:76 == 1 // :6322
  // 				PRINTFORMW // :6323
  // 			;爱慕 // :6324
  // 			ELSEIF TALENT:TARGET:85 == 1 // :6325
  // 				PRINTFORMW // :6326
  // 			;侍奉精神Lv3以上 // :6327
  // 			ELSEIF ABL:TARGET:16 >= 3 // :6328
  // 				PRINTFORMW // :6329
  // 			;それ以外（侍奉精神Lv3未満） // :6330
  // 			ELSE // :6331
  // 				PRINTFORMW // :6332
  // 			ENDIF // :6333
  // 			CFLAG:TARGET:331 = 1 // :6334
  // 			RETURN 0 // :6335
  // 		;二回目以降 // :6336
  // 		ELSE // :6337
  // 			;牝犬＋侍奉精神Lv3以上 // :6338
  // 			IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 6 || FLAG:7 == 2) // :6339
  // 				IF RAND:2 == 0 // :6340
  // 					PRINTFORMW // :6341
  // 				ELSE // :6342
  // 					PRINTFORMW // :6343
  // 				ENDIF // :6344
  // 				CFLAG:331 = 7 // :6345
  // 			;淫乱＋侍奉精神Lv3以上 // :6346
  // 			ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 5 || FLAG:7 == 2) // :6347
  // 				IF RAND:2 == 0 // :6348
  // 					PRINTFORMW // :6349
  // 				ELSE // :6350
  // 					PRINTFORMW // :6351
  // 				ENDIF // :6352
  // 				CFLAG:331 = 6 // :6353
  // 			;爱＋侍奉精神Lv5 // :6354
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:331 <= 4 || FLAG:7 == 2) // :6355
  // 				IF RAND:2 == 0 // :6356
  // 					PRINTFORMW // :6357
  // 				ELSE // :6358
  // 					PRINTFORMW // :6359
  // 				ENDIF // :6360
  // 				CFLAG:331 = 5 // :6361
  // 			;爱＋侍奉精神Lv3以上 // :6362
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 3 || FLAG:7 == 2) // :6363
  // 				PRINTFORMW // :6364
  // 				CFLAG:331 = 4 // :6365
  // 			;侍奉精神Lv3以上 // :6366
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && (CFLAG:331 <= 2 || FLAG:7 == 2) // :6367
  // 				PRINTFORMW // :6368
  // 				CFLAG:331 = 3 // :6369
  // 			;それ以外（侍奉精神Lv3未満） // :6370
  // 			ELSEIF CFLAG:331 <= 1 || FLAG:7 == 2 // :6371
  // 				PRINTFORMW // :6372
  // 				CFLAG:331 = 2 // :6373
  // 			ENDIF // :6374
  // 			RETURN 0 // :6375
  // 		ENDIF // :6376
  // 	ENDIF // :6377
  //  // :6378
  // 	;------------------------------------------------- // :6379
  // 	;兽奸口交 CFLAG:332 // :6380
  // 	;------------------------------------------------- // :6381
  // 	IF SELECTCOM == 31 // :6382
  // 		;初めて // :6383
  // 		IF CFLAG:TARGET:332 == 0 // :6384
  // 			;淫乱 // :6385
  // 			IF TALENT:TARGET:76 == 1 // :6386
  // 				PRINTFORMW // :6387
  // 			;爱慕 // :6388
  // 			ELSEIF TALENT:TARGET:85 == 1 // :6389
  // 				PRINTFORMW // :6390
  // 			;侍奉精神Lv3以上 // :6391
  // 			ELSEIF ABL:TARGET:16 >= 3 // :6392
  // 				PRINTFORMW // :6393
  // 			;それ以外（侍奉精神Lv3未満） // :6394
  // 			ELSE // :6395
  // 				PRINTFORMW // :6396
  // 			ENDIF // :6397
  // 			CFLAG:TARGET:332 = 1 // :6398
  // 			RETURN 0 // :6399
  // 		;二回目以降 // :6400
  // 		ELSE // :6401
  // 			;牝犬＋侍奉精神Lv5 // :6402
  // 			IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:332 <= 6 || FLAG:7 == 2) // :6403
  // 					PRINTFORMW // :6404
  // 				CFLAG:332 = 7 // :6405
  // 			;淫乱＋侍奉精神Lv5 // :6406
  // 			ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:332 <= 5 || FLAG:7 == 2) // :6407
  // 					PRINTFORMW // :6408
  // 				CFLAG:332 = 6 // :6409
  // 			;淫乱 // :6410
  // 			ELSEIF TALENT:TARGET:76 == 1 && (CFLAG:332 <= 4 || FLAG:7 == 2) // :6411
  // 					PRINTFORMW // :6412
  // 				CFLAG:332 = 5 // :6413
  // 			;爱＋侍奉精神Lv5 // :6414
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:332 <= 3 || FLAG:7 == 2) // :6415
  // 					PRINTFORML // :6416
  // 					PRINTFORMW // :6417
  // 				CFLAG:332 = 4 // :6418
  // 			;侍奉精神Lv3以上 // :6419
  // 			ELSEIF ABL:TARGET:16 >= 3 && (CFLAG:332 <= 2 || FLAG:7 == 2) // :6420
  // 				PRINTFORML // :6421
  // 				PRINTFORMW // :6422
  // 				CFLAG:332 = 3 // :6423
  // 			;それ以外（侍奉精神Lv3未満） // :6424
  // 			ELSEIF CFLAG:332 <= 1 || FLAG:7 == 2 // :6425
  // 				PRINTFORMW // :6426
  // 				CFLAG:332 = 2 // :6427
  // 			ENDIF // :6428
  // 			RETURN 0 // :6429
  // 		ENDIF // :6430
  // 	ENDIF // :6431
  //  // :6432
  // 	;------------------------------------------------- // :6433
  // 	;兽奸骑乘位 CFLAG:335 // :6434
  // 	;------------------------------------------------- // :6435
  // 	IF SELECTCOM == 34 // :6436
  // 		;初めて // :6437
  // 		IF CFLAG:TARGET:335 == 0 // :6438
  // 			;处女 // :6439
  // 			IF TALENT:0 == 1 // :6440
  // 				;牝犬 // :6441
  // 				IF TALENT:TARGET:136 == 1 // :6442
  // 					PRINTFORMW // :6443
  // 				;淫乱 // :6444
  // 				ELSEIF TALENT:TARGET:76 == 1 // :6445
  // 					PRINTFORMW // :6446
  // 				;爱慕 // :6447
  // 				ELSEIF TALENT:TARGET:85 == 1 // :6448
  // 					PRINTFORMW // :6449
  // 				;それ以外（爱無し） // :6450
  // 				ELSE // :6451
  // 					PRINTFORMW // :6452
  // 				ENDIF // :6453
  // 			;非处女 // :6454
  // 			ELSE // :6455
  // 				;牝犬 // :6456
  // 				IF TALENT:TARGET:136 == 1 // :6457
  // 					PRINTFORMW // :6458
  // 				;淫乱 // :6459
  // 				ELSEIF TALENT:76 == 1 // :6460
  // 					PRINTFORMW // :6461
  // 				;爱慕 // :6462
  // 				ELSEIF TALENT:85 == 1 // :6463
  // 					PRINTFORMW // :6464
  // 				;それ以外 // :6465
  // 				ELSE // :6466
  // 					PRINTFORMW // :6467
  // 				ENDIF // :6468
  // 			ENDIF // :6469
  // 			CFLAG:TARGET:335 = 1 // :6470
  // 			RETURN 0 // :6471
  // 		;二回目以降 // :6472
  // 		ELSE // :6473
  // 			;牝犬 // :6474
  // 			IF TALENT:TARGET:136 == 1 && (CFLAG:335 <= 6 || FLAG:7 == 2) // :6475
  // 				IF RAND:3 == 0 // :6476
  // 					PRINTFORMW // :6477
  // 				ELSEIF RAND:2 == 0 // :6478
  // 					PRINTFORMW // :6479
  // 				ELSE // :6480
  // 					PRINTFORMW // :6481
  // 				ENDIF // :6482
  // 				CFLAG:335 = 7 // :6483
  // 			;淫乱 // :6484
  // 			ELSEIF TALENT:TARGET:76 == 1 && (CFLAG:335 <= 5 || FLAG:7 == 2) // :6485
  // 				IF RAND:4 == 0 // :6486
  // 					PRINTFORMW // :6487
  // 				ELSEIF RAND:3 == 0 // :6488
  // 					PRINTFORMW // :6489
  // 				ELSEIF RAND:2 == 0 // :6490
  // 					PRINTFORMW // :6491
  // 				ELSE // :6492
  // 					PRINTFORMW // :6493
  // 				ENDIF // :6494
  // 				CFLAG:335 = 6 // :6495
  // 			;爱慕 // :6496
  // 			ELSEIF TALENT:TARGET:85 == 1 && (CFLAG:335 <= 4 || FLAG:7 == 2) // :6497
  // 				IF RAND:4 == 0 // :6498
  // 					PRINTFORML // :6499
  // 				ELSEIF RAND:3 == 0 // :6500
  // 					PRINTFORMW // :6501
  // 				ELSEIF RAND:2 == 0 // :6502
  // 					PRINTFORMW // :6503
  // 				ELSE // :6504
  // 					PRINTFORMW // :6505
  // 				ENDIF // :6506
  // 				CFLAG:335 = 5 // :6507
  // 			;屈服刻印Lv3＋V感覚Lv3以上 // :6508
  // 			ELSEIF MARK:2 == 3 && ABL:2 >= 3 && (CFLAG:335 <= 3 || FLAG:7 == 2) // :6509
  // 				IF RAND:4 == 0 // :6510
  // 					PRINTFORMW // :6511
  // 				ELSEIF RAND:3 == 0 // :6512
  // 					PRINTFORMW // :6513
  // 				ELSEIF RAND:2 == 0 // :6514
  // 					PRINTFORMW // :6515
  // 				ELSE // :6516
  // 					PRINTFORMW // :6517
  // 				ENDIF // :6518
  // 				CFLAG:335 = 4 // :6519
  // 			;屈服刻印Lv3 // :6520
  // 			ELSEIF MARK:2 == 3 && (CFLAG:335 <= 2 || FLAG:7 == 2) // :6521
  // 				PRINTFORML // :6522
  // 				PRINTFORMW // :6523
  // 				CFLAG:335 = 3 // :6524
  // 			;それ以外（爱無し、顺从Lv5未満） // :6525
  // 			ELSEIF CFLAG:335 <= 1 || FLAG:7 == 2 // :6526
  // 				PRINTFORMW // :6527
  // 				CFLAG:335 = 2 // :6528
  // 			ENDIF // :6529
  // 			RETURN 0 // :6530
  // 		ENDIF // :6531
  // 	ENDIF // :6532
  //  // :6533
  // 	;------------------------------------------------- // :6534
  // 	;兽奸肛门侍奉 CFLAG:338 // :6535
  // 	;------------------------------------------------- // :6536
  // 	IF SELECTCOM == 37 // :6537
  // 		;初めて // :6538
  // 		IF CFLAG:TARGET:338 == 0 // :6539
  // 			;侍奉精神Lv3以上 // :6540
  // 			IF ABL:TARGET:16 >= 3 // :6541
  // 				PRINTFORMW // :6542
  // 			;それ以外（侍奉精神Lv3未満） // :6543
  // 			ELSE // :6544
  // 				PRINTFORMW // :6545
  // 			ENDIF // :6546
  // 			CFLAG:TARGET:338 = 1 // :6547
  // 			RETURN 0 // :6548
  // 		;二回目以降 // :6549
  // 		ELSE // :6550
  // 			;牝犬＋侍奉精神Lv5 // :6551
  // 			IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:338 <= 5 || FLAG:7 == 2) // :6552
  // 					PRINTFORMW // :6553
  // 				CFLAG:338 = 6 // :6554
  // 			;淫乱＋侍奉精神Lv5 // :6555
  // 			ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:338 <= 4 || FLAG:7 == 2) // :6556
  // 					PRINTFORMW // :6557
  // 				CFLAG:338 = 5 // :6558
  // 			;爱＋侍奉精神Lv5 // :6559
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && (CFLAG:338 <= 3 || FLAG:7 == 2) // :6560
  // 					PRINTFORML // :6561
  // 				CFLAG:338 = 4 // :6562
  // 			;侍奉精神Lv3以上 // :6563
  // 			ELSEIF ABL:TARGET:16 >= 3 && (CFLAG:338 <= 2 || FLAG:7 == 2) // :6564
  // 				PRINTFORMW // :6565
  // 				CFLAG:338 = 3 // :6566
  // 			;それ以外（侍奉精神Lv3未満） // :6567
  // 			ELSEIF CFLAG:338 <= 1 || FLAG:7 == 2 // :6568
  // 				PRINTFORMW // :6569
  // 				CFLAG:338 = 2 // :6570
  // 			ENDIF // :6571
  // 			RETURN 0 // :6572
  // 		ENDIF // :6573
  // 	ENDIF // :6574
  //  // :6575
  // 	;------------------------------------------------- // :6576
  // 	;兽奸眼罩 CFLAG:344　CFLAG:380 // :6577
  // 	;------------------------------------------------- // :6578
  // 	;開始時 // :6579
  // 	IF SELECTCOM == 43 && TEQUIP:43 // :6580
  // 		;初めて // :6581
  // 		IF CFLAG:TARGET:344 == 0 // :6582
  // 			;牝犬 // :6583
  // 			IF TALENT:136 == 1 // :6584
  // 				PRINTFORMW // :6585
  // 			;淫乱 // :6586
  // 			ELSEIF TALENT:76 == 1 // :6587
  // 				PRINTFORMW // :6588
  // 			;爱慕 // :6589
  // 			ELSEIF TALENT:85 == 1 // :6590
  // 				PRINTFORMW // :6591
  // 			;それ以外 // :6592
  // 			ELSE // :6593
  // 				PRINTFORMW // :6594
  // 			ENDIF // :6595
  // 			CFLAG:TARGET:344 = 1 // :6596
  // 			RETURN 0 // :6597
  // 		;二回目以降 // :6598
  // 		ELSE // :6599
  // 			;牝犬 // :6600
  // 			IF TALENT:TARGET:136 == 1 && (CFLAG:344 <= 9 || FLAG:7 == 2) // :6601
  // 				PRINTFORMW // :6602
  // 				CFLAG:TARGET:344 = 10 // :6603
  // 			;淫乱＋受虐狂っ気Lv5以上 // :6604
  // 			ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && (CFLAG:344 <= 8 || FLAG:7 == 2) // :6605
  // 				PRINTFORMW // :6606
  // 				CFLAG:TARGET:344 = 9 // :6607
  // 			;淫乱＋受虐狂っ気Lv3以上 // :6608
  // 			ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && (CFLAG:344 <= 7 || FLAG:7 == 2) // :6609
  // 				PRINTFORMW // :6610
  // 				CFLAG:TARGET:344 = 8 // :6611
  // 			;淫乱 // :6612
  // 			ELSEIF TALENT:TARGET:76 == 1 && (CFLAG:344 <= 6 || FLAG:7 == 2) // :6613
  // 				PRINTFORMW // :6614
  // 				CFLAG:TARGET:344 = 7 // :6615
  // 			;爱＋受虐狂っ気Lv5以上 // :6616
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && (CFLAG:344 <= 5 || FLAG:7 == 2) // :6617
  // 				PRINTFORMW // :6618
  // 				CFLAG:TARGET:344 = 6 // :6619
  // 			;爱＋受虐狂っ気Lv3以上 // :6620
  // 			ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && (CFLAG:344 <= 4 || FLAG:7 == 2) // :6621
  // 				PRINTFORMW // :6622
  // 				CFLAG:TARGET:344 = 5 // :6623
  // 			;爱慕 // :6624
  // 			ELSEIF TALENT:TARGET:85 == 1 && (CFLAG:344 <= 3 || FLAG:7 == 2) // :6625
  // 				PRINTFORMW // :6626
  // 				CFLAG:TARGET:344 = 4 // :6627
  // 			;受虐狂っ気Lv3以上 // :6628
  // 			ELSEIF ABL:21 >= 3 && (CFLAG:344 <= 2 || FLAG:7 == 2) // :6629
  // 				PRINTFORMW // :6630
  // 				CFLAG:TARGET:344 = 3 // :6631
  // 			;それ以外 // :6632
  // 			ELSEIF CFLAG:344 <= 1 || FLAG:7 == 2 // :6633
  // 				PRINTFORMW // :6634
  // 				CFLAG:TARGET:344 = 2 // :6635
  // 			ENDIF // :6636
  // 			RETURN 0 // :6637
  // 		ENDIF // :6638
  // 	;終了時 // :6639
  // 	ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0 // :6640
  // 		;牝犬 // :6641
  // 		IF TALENT:TARGET:136 == 1 && (CFLAG:380 < 3 || FLAG:7 == 2) // :6642
  // 			PRINTFORMW // :6643
  // 			CFLAG:380 = 4 // :6644
  // 		;淫乱 // :6645
  // 		ELSEIF TALENT:TARGET:76 == 1 && (CFLAG:380 < 3 || FLAG:7 == 2) // :6646
  // 			PRINTFORMW // :6647
  // 			CFLAG:380 = 3 // :6648
  // 		;爱慕 // :6649
  // 		ELSEIF TALENT:TARGET:85 == 1 && (CFLAG:380 < 2 || FLAG:7 == 2) // :6650
  // 			PRINTFORMW // :6651
  // 			CFLAG:380 = 2 // :6652
  // 		;それ以外 // :6653
  // 		ELSEIF CFLAG:380 < 1 || FLAG:7 == 2 // :6654
  // 			PRINTFORMW // :6655
  // 			CFLAG:380 = 1 // :6656
  // 		ENDIF // :6657
  // 		RETURN 0 // :6658
  // 	ENDIF // :6659
  //  // :6660
  // ------------------------------------------------- // :6661
  // 獣姦会話 CFLAG:357 // :6662
  // いぬと会話は出来ないので自己紹介のみ // :6663
  // ------------------------------------------------- // :6664
  // 2015/10/18加筆 // :6665
  if (SELECTCOM == 56) { // :6666
    // 初めて // :6667
    if (CFLAG:357 == 0) { // :6668
      if (TEQUIP:53) { // :6669
        // 家族設定のロード // :6670
        // 赋值 LOCAL = TALENT:320 // :6671
        // 家族設定の有無 // :6672
        // 赋值 LOCAL:1  = LOCAL % 10 // :6673
        // 娘の有無 // :6674
        // 赋值 LOCAL:3  = LOCAL % 1000 // :6675
        // 赋值 LOCAL:3 / = 100 // :6676
        // 息子の有無 // :6677
        // 赋值 LOCAL:4  = LOCAL % 10000 // :6678
        // 赋值 LOCAL:4 / = 1000 // :6679
        // 姉の有無 // :6680
        // 赋值 LOCAL:5  = LOCAL % 1000000 // :6681
        // 赋值 LOCAL:5 / = 100000 // :6682
        // 兄の有無 // :6683
        // 赋值 LOCAL:6  = LOCAL % 10000000 // :6684
        // 赋值 LOCAL:6 / = 1000000 // :6685
        // 妹の有無 // :6686
        // 赋值 LOCAL:7  = LOCAL % 100000000 // :6687
        // 赋值 LOCAL:7 / = 10000000 // :6688
        // 弟の有無 // :6689
        // 赋值 LOCAL:8  = LOCAL % 1000000000 // :6690
        // 赋值 LOCAL:8 / = 100000000 // :6691
        // 兄弟姉妹がいるかのフラグ // :6692
        // 赋值 LOCAL:9  = LOCAL:5 + LOCAL:6 + LOCAL:7 + LOCAL:8 // :6693
        // ビデオ自己紹介 // :6694
        // 牝犬で結婚相手が野良犬 // :6695
        if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900) { // :6696
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6697
          await era.printAndWait(`「今天${sc()}和丈夫大人的……关系和睦的、交尾，请您欣赏」`); // :6698
          if (TALENT:人妻) { // :6700
            await era.printAndWait(`「亲爱的、你看到了吗？　${sc()}现在正和这么棒的丈夫大人互相疼爱着呢♪」`); // :6700
          } // :6700
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`); // :6701
          await era.printAndWait(`「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`); // :6702
          await era.printAndWait(`「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`); // :6703
          // 子供へのあいさつ // :6704
          if (LOCAL:3 && LOCAL:4) { // :6705
            await era.printAndWait(`「${sc()}是有女儿和儿子的♪　看啊～♪　妈妈和狗结婚了啊♪」`); // :6706
            await era.printAndWait(`「这是你们的……新爸爸哦♪」`); // :6707
          } else if (LOCAL:3) { // :6708
            await era.printAndWait(`「${sc()}是有女儿♪　看啊～♪　妈妈和狗结婚了啊♪」`); // :6709
            await era.printAndWait(`「这是你的……新爸爸哦♪」`); // :6710
          } else if (LOCAL:4) { // :6711
            await era.printAndWait(`「${sc()}是有儿子♪　看啊～♪　妈妈和狗结婚了啊♪」`); // :6712
            await era.printAndWait(`「这是你的……新爸爸哦♪」`); // :6713
          } // :6714

          if (LOCAL:9 > 0) { // :6716
            await era.print(`「${sc()}是有`); // :6717
            if (LOCAL:5 && LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6718
              await era.print(`姐姐，哥哥，弟弟，妹妹`); // :6719
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:7) { // :6720
              await era.print(`姐姐，哥哥，妹妹`); // :6721
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:8) { // :6722
              await era.print(`姐姐，哥哥，弟弟`); // :6723
            } else if (LOCAL:5 && LOCAL:7 && LOCAL:8) { // :6724
              await era.print(`姐姐，弟弟，妹妹`); // :6725
            } else if (LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6726
              await era.print(`哥哥，弟弟，妹妹`); // :6727
            } else if (LOCAL:5 && LOCAL:6) { // :6728
              await era.print(`姐姐和哥哥`); // :6729
            } else if (LOCAL:5 && LOCAL:8) { // :6730
              await era.print(`姐姐和弟弟`); // :6731
            } else if (LOCAL:5 && LOCAL:7) { // :6732
              await era.print(`姐姐和妹妹`); // :6733
            } else if (LOCAL:6 && LOCAL:8) { // :6734
              await era.print(`哥哥和弟弟`); // :6735
            } else if (LOCAL:6 && LOCAL:7) { // :6736
              await era.print(`哥哥和妹妹`); // :6737
            } else if (LOCAL:7 && LOCAL:8) { // :6738
              await era.print(`弟弟和妹妹`); // :6739
            } else if (LOCAL:5) { // :6740
              await era.print(`姐姐`); // :6741
            } else if (LOCAL:6) { // :6742
              await era.print(`哥哥`); // :6743
            } else if (LOCAL:7) { // :6744
              await era.print(`妹妹`); // :6745
            } else if (LOCAL:8) { // :6746
              await era.print(`弟弟`); // :6747
            } else { // :6748
              await era.print(`兄弟姐妹`); // :6749
            } // :6750
            await era.printAndWait(`的♪」`); // :6751

            if (LOCAL:5 && LOCAL:6) { // :6753
              await era.printAndWait(`「姐姐哥哥♪　你们重要的妹妹${target_name}堕落成母狗了♪」`); // :6754
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6755
            } else if (LOCAL:5) { // :6756
              await era.printAndWait(`「姐姐♪　你重要的妹妹${target_name}堕落成母狗了♪」`); // :6757
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6758
            } else if (LOCAL:6) { // :6759
              await era.printAndWait(`「哥哥♪　你重要的妹妹${target_name}堕落成母狗了♪」`); // :6760
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」`); // :6761
            } // :6762

            if (LOCAL:7 && LOCAL:8) { // :6764
              await era.printAndWait(`「可爱的弟弟和妹妹♪　你们的姐姐毫不在乎的在和动物交尾♪」`); // :6765
              await era.printAndWait(`「今后会充分的进行性教育♪　以后也会送映像过去的记得要看哦♪」`); // :6766
            } else if (LOCAL:7) { // :6767
              await era.printAndWait(`「可爱的妹妹♪　你的姐姐毫不在乎的在和动物交尾♪」`); // :6768
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`); // :6769
            } else if (LOCAL:8) { // :6770
              await era.printAndWait(`「可爱的弟弟♪　你的姐姐毫不在乎的在和动物交尾♪」`); // :6771
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`); // :6772
            } // :6773

          } // :6775
          // 牝犬 // :6776
        } else if (TALENT:TARGET:136 == 1) { // :6777
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6778
          await era.printAndWait(`「今天${sc()}和主人大人的……关系和睦的、交尾，请您欣赏」`); // :6779
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`); // :6780
          await era.printAndWait(`「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`); // :6781
          await era.printAndWait(`「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`); // :6782
          // 子供へのあいさつ // :6783
          if (LOCAL:3 && LOCAL:4) { // :6784
            await era.printAndWait(`「${sc()}是有女儿和儿子的♪　看啊～♪　妈妈服从于狗了♪」`); // :6785
            await era.printAndWait(`「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6786
          } else if (LOCAL:3) { // :6787
            await era.printAndWait(`「${sc()}是有女儿的♪　看啊～♪　妈妈服从于狗了♪」`); // :6788
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6789
          } else if (LOCAL:4) { // :6790
            await era.printAndWait(`「${sc()}是有儿子的♪　看啊～♪　妈妈服从于狗了♪」`); // :6791
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6792
          } // :6793

          if (LOCAL:9 > 0) { // :6795
            await era.print(`「${sc()}是有`); // :6796
            if (LOCAL:5 && LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6797
              await era.print(`姐姐，哥哥，弟弟，妹妹`); // :6798
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:7) { // :6799
              await era.print(`姐姐，哥哥，妹妹`); // :6800
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:8) { // :6801
              await era.print(`姐姐，哥哥，弟弟`); // :6802
            } else if (LOCAL:5 && LOCAL:7 && LOCAL:8) { // :6803
              await era.print(`姐姐，弟弟，妹妹`); // :6804
            } else if (LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6805
              await era.print(`哥哥，弟弟，妹妹`); // :6806
            } else if (LOCAL:5 && LOCAL:6) { // :6807
              await era.print(`姐姐和哥哥`); // :6808
            } else if (LOCAL:5 && LOCAL:8) { // :6809
              await era.print(`姐姐和弟弟`); // :6810
            } else if (LOCAL:5 && LOCAL:7) { // :6811
              await era.print(`姐姐和妹妹`); // :6812
            } else if (LOCAL:6 && LOCAL:8) { // :6813
              await era.print(`哥哥和弟弟`); // :6814
            } else if (LOCAL:6 && LOCAL:7) { // :6815
              await era.print(`哥哥和妹妹`); // :6816
            } else if (LOCAL:7 && LOCAL:8) { // :6817
              await era.print(`弟弟和妹妹`); // :6818
            } else if (LOCAL:5) { // :6819
              await era.print(`姐姐`); // :6820
            } else if (LOCAL:6) { // :6821
              await era.print(`哥哥`); // :6822
            } else if (LOCAL:7) { // :6823
              await era.print(`妹妹`); // :6824
            } else if (LOCAL:8) { // :6825
              await era.print(`弟弟`); // :6826
            } else { // :6827
              await era.print(`兄弟姐妹`); // :6828
            } // :6829
            await era.printAndWait(`的♪」`); // :6830

            if (LOCAL:5 && LOCAL:6) { // :6832
              await era.printAndWait(`「姐姐哥哥♪　你们重要的妹妹${target_name}堕落成母狗了♪」`); // :6833
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6834
            } else if (LOCAL:5) { // :6835
              await era.printAndWait(`「姐姐♪　你重要的妹妹${target_name}堕落成母狗了♪」`); // :6836
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6837
            } else if (LOCAL:6) { // :6838
              await era.printAndWait(`「哥哥♪　你重要的妹妹${target_name}堕落成母狗了♪」`); // :6839
              await era.printAndWait(`「请欣赏血脉相连的妹妹和野兽性交的身姿吧、哥哥看着来手淫吧♪」`); // :6840
            } // :6841

            if (LOCAL:7 && LOCAL:8) { // :6843
              await era.printAndWait(`「可爱的弟弟和妹妹♪　你们的姐姐毫不在乎的在和动物交尾♪」`); // :6844
              await era.printAndWait(`「今后会充分的进行性教育♪　以后也会送映像过去的记得要看哦♪」`); // :6845
            } else if (LOCAL:7) { // :6846
              await era.printAndWait(`「可爱的妹妹♪　你的姐姐毫不在乎的在和动物交尾♪」`); // :6847
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`); // :6848
            } else if (LOCAL:8) { // :6849
              await era.printAndWait(`「可爱的弟弟♪　你的姐姐毫不在乎的在和动物交尾♪」`); // :6850
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`); // :6851
            } // :6852

          } // :6854
          // 淫乱 // :6855
        } else if (TALENT:TARGET:76 == 1) { // :6856
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6857
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`); // :6858
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`); // :6859
          // 愛 // :6860
        } else if (TALENT:TARGET:85 == 1) { // :6861
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6862
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`); // :6863
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`); // :6864
          // それ以外 // :6865
        } else { // :6866
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6867
          await era.printAndWait(`「今天……唔、${sc()}和野狗……不、不行」`); // :6868
          await era.printAndWait(`「饶了我吧……饶了我吧……」`); // :6869
        } // :6870
      } // :6871
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :6872
      era.set(`cflag:${target}:357`, 1); // :6872
      return 0; // :6873
      // 二回目以降 // :6874
    } else { // :6875
      if (TEQUIP:53) { // :6876
        // ビデオ自己紹介 // :6877
        // 牝犬で結婚相手が野良犬 // :6878
        if (TALENT:TARGET:136 == 1 && CFLAG:601 == 900 && (CFLAG:306 <= 5 || FLAG:7 == 2)) { // :6879
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6880
          await era.printAndWait(`「今天${sc()}和丈夫大人的……关系和睦的、交尾，请您欣赏」`); // :6881
          if (TALENT:人妻) { // :6883
            await era.printAndWait(`「亲爱的、你看到了吗？　${sc()}今天也想要变成野兽哦♪♪」`); // :6883
          } // :6883
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`); // :6884
          await era.printAndWait(`「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`); // :6885
          await era.printAndWait(`「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`); // :6886
          // 子供へのあいさつ // :6887
          if (LOCAL:3 && LOCAL:4) { // :6888
            await era.printAndWait(`「${sc()}是有女儿和儿子的♪　看啊～♪　新爸爸的大鸡巴♪」`); // :6889
            await era.printAndWait(`「为了制造出你们的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`); // :6890
          } else if (LOCAL:3) { // :6891
            await era.printAndWait(`「${sc()}是有女儿的♪　看啊～♪　新爸爸的大鸡巴♪」`); // :6892
            await era.printAndWait(`「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`); // :6893
          } else if (LOCAL:4) { // :6894
            await era.printAndWait(`「${sc()}是有儿子的♪　看啊～♪　新爸爸的大鸡巴♪」`); // :6895
            await era.printAndWait(`「为了制造出你的新的弟弟妹妹、我会和新的爸爸一起努力造孩子的♪」`); // :6896
          } // :6897

          if (LOCAL:9 > 0) { // :6899
            await era.print(`「${sc()}是有`); // :6900
            if (LOCAL:5 && LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6901
              await era.print(`姐姐，哥哥，弟弟，妹妹`); // :6902
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:7) { // :6903
              await era.print(`姐姐，哥哥，妹妹`); // :6904
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:8) { // :6905
              await era.print(`姐姐，哥哥，弟弟`); // :6906
            } else if (LOCAL:5 && LOCAL:7 && LOCAL:8) { // :6907
              await era.print(`姐姐，弟弟，妹妹`); // :6908
            } else if (LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6909
              await era.print(`哥哥，弟弟，妹妹`); // :6910
            } else if (LOCAL:5 && LOCAL:6) { // :6911
              await era.print(`姐姐和哥哥`); // :6912
            } else if (LOCAL:5 && LOCAL:8) { // :6913
              await era.print(`姐姐和弟弟`); // :6914
            } else if (LOCAL:5 && LOCAL:7) { // :6915
              await era.print(`姐姐和妹妹`); // :6916
            } else if (LOCAL:6 && LOCAL:8) { // :6917
              await era.print(`哥哥和弟弟`); // :6918
            } else if (LOCAL:6 && LOCAL:7) { // :6919
              await era.print(`哥哥和妹妹`); // :6920
            } else if (LOCAL:7 && LOCAL:8) { // :6921
              await era.print(`弟弟和妹妹`); // :6922
            } else if (LOCAL:5) { // :6923
              await era.print(`姐姐`); // :6924
            } else if (LOCAL:6) { // :6925
              await era.print(`哥哥`); // :6926
            } else if (LOCAL:7) { // :6927
              await era.print(`妹妹`); // :6928
            } else if (LOCAL:8) { // :6929
              await era.print(`弟弟`); // :6930
            } else { // :6931
              await era.print(`兄弟姐妹`); // :6932
            } // :6933
            await era.printAndWait(`的♪」`); // :6934

            if (LOCAL:5 && LOCAL:6) { // :6936
              await era.printAndWait(`「姐姐哥哥♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :6937
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6938
            } else if (LOCAL:5) { // :6939
              await era.printAndWait(`「姐姐♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :6940
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6941
            } else if (LOCAL:6) { // :6942
              await era.printAndWait(`「哥哥♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :6943
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :6944
            } // :6945

            if (LOCAL:7 && LOCAL:8) { // :6947
              await era.printAndWait(`「可爱的弟弟和妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :6948
              await era.printAndWait(`「有好好的学习H的事情吗♪　以后也会一直送映像过去的记得要看哦♪」`); // :6949
            } else if (LOCAL:7) { // :6950
              await era.printAndWait(`「可爱的妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :6951
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`); // :6952
            } else if (LOCAL:8) { // :6953
              await era.printAndWait(`「可爱的弟弟♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :6954
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`); // :6955
            } // :6956

          } // :6958

          // CFLAG:357  = 6（变量语义：CFLAG 族，357） // :6960
          era.set(`cflag:${target}:357`, 6); // :6960
          // 牝犬 // :6961
        } else if (TALENT:TARGET:136 == 1 && (CFLAG:357 <= 4 || FLAG:7 == 2)) { // :6962
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :6963
          await era.printAndWait(`「今天${sc()}和主人大人的……关系和睦的、交尾，请您欣赏」`); // :6964
          await era.printAndWait(`这么说着的${target_name}把脸颊贴向了野狗`); // :6965
          await era.printAndWait(`「唔呼……好期待呢。母狗的${sc()}稍稍动了动腰……」`); // :6966
          await era.printAndWait(`「流着口水发情的身姿、请您一边尽情欣赏一边手淫吧♪」`); // :6967

          // 子供へのあいさつ // :6969
          if (LOCAL:3 && LOCAL:4) { // :6970
            await era.printAndWait(`「${sc()}是有女儿和儿子的♪　看啊～♪　妈妈对狗发情了♪」`); // :6971
            await era.printAndWait(`「你们的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6972
          } else if (LOCAL:3) { // :6973
            await era.printAndWait(`「${sc()}是有女儿的♪　看啊～♪　妈妈对狗发情了♪」`); // :6974
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6975
          } else if (LOCAL:4) { // :6976
            await era.printAndWait(`「${sc()}是有儿子的♪　看啊～♪　妈妈对狗发情了♪」`); // :6977
            await era.printAndWait(`「你的妈妈身为雌性的姿态、请尽情欣赏吧♪」`); // :6978
          } // :6979

          if (LOCAL:9 > 0) { // :6981
            await era.print(`「${sc()}是有`); // :6982
            if (LOCAL:5 && LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6983
              await era.print(`姐姐，哥哥，弟弟，妹妹`); // :6984
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:7) { // :6985
              await era.print(`姐姐，哥哥，妹妹`); // :6986
            } else if (LOCAL:5 && LOCAL:6 && LOCAL:8) { // :6987
              await era.print(`姐姐，哥哥，弟弟`); // :6988
            } else if (LOCAL:5 && LOCAL:7 && LOCAL:8) { // :6989
              await era.print(`姐姐，弟弟，妹妹`); // :6990
            } else if (LOCAL:6 && LOCAL:7 && LOCAL:8) { // :6991
              await era.print(`哥哥，弟弟，妹妹`); // :6992
            } else if (LOCAL:5 && LOCAL:6) { // :6993
              await era.print(`姐姐和哥哥`); // :6994
            } else if (LOCAL:5 && LOCAL:8) { // :6995
              await era.print(`姐姐和弟弟`); // :6996
            } else if (LOCAL:5 && LOCAL:7) { // :6997
              await era.print(`姐姐和妹妹`); // :6998
            } else if (LOCAL:6 && LOCAL:8) { // :6999
              await era.print(`哥哥和弟弟`); // :7000
            } else if (LOCAL:6 && LOCAL:7) { // :7001
              await era.print(`哥哥和妹妹`); // :7002
            } else if (LOCAL:7 && LOCAL:8) { // :7003
              await era.print(`弟弟和妹妹`); // :7004
            } else if (LOCAL:5) { // :7005
              await era.print(`姐姐`); // :7006
            } else if (LOCAL:6) { // :7007
              await era.print(`哥哥`); // :7008
            } else if (LOCAL:7) { // :7009
              await era.print(`妹妹`); // :7010
            } else if (LOCAL:8) { // :7011
              await era.print(`弟弟`); // :7012
            } else { // :7013
              await era.print(`兄弟姐妹`); // :7014
            } // :7015
            await era.printAndWait(`的♪」`); // :7016

            if (LOCAL:5 && LOCAL:6) { // :7018
              await era.printAndWait(`「姐姐哥哥♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :7019
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :7020
            } else if (LOCAL:5) { // :7021
              await era.printAndWait(`「姐姐♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :7022
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :7023
            } else if (LOCAL:6) { // :7024
              await era.printAndWait(`「哥哥♪　你们重要的妹妹${target_name}今天也正在发情中♪」`); // :7025
              await era.printAndWait(`「请欣赏血脉相连的妹妹像野兽性交的身姿吧、如果可以的话就送来断绝关系书信吧♪」`); // :7026
            } // :7027

            if (LOCAL:7 && LOCAL:8) { // :7029
              await era.printAndWait(`「可爱的弟弟和妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :7030
              await era.printAndWait(`「有好好的学习H的事情吗♪　以后也会一直送映像过去的记得要看哦♪」`); // :7031
            } else if (LOCAL:7) { // :7032
              await era.printAndWait(`「可爱的妹妹♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :7033
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　在故乡被欺负被强奸了的话就来魔王大人这里吧♪」`); // :7034
            } else if (LOCAL:8) { // :7035
              await era.printAndWait(`「可爱的弟弟♪　今天也送去了你们的姐姐发情的身姿的影像了♪」`); // :7036
              await era.printAndWait(`「我是个变态的姐姐真对不起♪　看着女人作为雌性的身姿、手淫一下可爱的包茎肉棒吧♪」`); // :7037
            } // :7038

          } // :7040

          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :7042
          era.set(`cflag:${target}:357`, 5); // :7042
          // 淫乱 // :7043
        } else if (TALENT:TARGET:76 == 1 && (CFLAG:357 <= 3 || FLAG:7 == 2)) { // :7044
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :7045
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`); // :7046
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`); // :7047
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :7048
          era.set(`cflag:${target}:357`, 4); // :7048
          // 愛 // :7049
        } else if (TALENT:TARGET:85 == 1 && (CFLAG:357 <= 2 || FLAG:7 == 2)) { // :7050
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :7051
          await era.printAndWait(`「今天请欣赏${sc()}和野狗的交尾」`); // :7052
          await era.printAndWait(`「虽然很不习惯、请您一边欣赏一边手淫♪」`); // :7053
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :7054
          era.set(`cflag:${target}:357`, 3); // :7054
          // それ以外 // :7055
        } else if (CFLAG:357 <= 1 || FLAG:7 == 2) { // :7056
          await era.printAndWait(`「观赏这个的大家、初次见面。${sc()}是${target_name}」`); // :7057
          await era.printAndWait(`「今天……唔、${sc()}和野狗……不、不行」`); // :7058
          await era.printAndWait(`「饶了我吧……饶了我吧……」`); // :7059
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :7060
          era.set(`cflag:${target}:357`, 2); // :7060
        } // :7061
      } // :7062
      return 0; // :7063
    } // :7064
  } // :7065
  return 0; // :7066



  // ------------------------------------------------- // :7070
  // @KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換） // :7071
  // パラメータ変動をトリガーにした口上 // :7072
  // パラメータ変動後に口上を発動します // :7073
  // ------------------------------------------------- // :7074

// @KOJO_MESSAGE_PALAMCNG_3 // :7075
function KOJO_MESSAGE_PALAMCNG_3() {
  // 助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる） // :7076
  if (ASSI > 0 && ASSIPLAY) { // :7078
    return 0; // :7078
  } // :7078
  // 口塞着用時には口上をスキップする // :7079
  if (TEQUIP:45) { // :7081
    return 0; // :7081
  } // :7081
  // 失神時には口上をスキップする // :7082
  if (TFLAG:899) { // :7084
    return 0; // :7084
  } // :7084
  // 崩坏した場合は口上をスキップする // :7085
  if (TALENT:TARGET:9 == 1) { // :7087
    return 0; // :7087
  } // :7087
  // 兽奸PLAY中は口上をスキップする。 // :7088
  if (TEQUIP:89) { // :7090
    return 0; // :7090
  } // :7090
  // 触手調教中は口上をスキップする // :7091
  if (TEQUIP:90) { // :7093
    return 0; // :7093
  } // :7093
  // 死斗场中は口上をスキップする // :7094
  if (TEQUIP:55) { // :7096
    return 0; // :7096
  } // :7096

  // ------------------------------------------------- // :7098
  // パラメータ変動時のセリフ CFLAG 221～260を使用 // :7099
  // ------------------------------------------------- // :7100
  // ------------------------------------------------- // :7101
  // 初めて润滑がLV2超えた CFLAG:221 // :7102
  // ------------------------------------------------- // :7103
  // 赋值 P = PALAM:3 + UP:3 // :7104
  if (P > PALAMLV:2 && CFLAG:TARGET:221 == 0) { // :7105
    // 爱慕 // :7106
    if (TALENT:TARGET:85 == 1) { // :7107
      // 润滑液を使った場合 // :7108
      if (SELECTCOM == 50) { // :7109
        await era.printAndWait(`「哈嗯呜~…好、冷啊~…而且还黏糊糊地~~…」`); // :7110
        await era.printAndWait(`―――第一次超过了润滑lv2了。`); // :7111
        // それ以外 // :7112
      } else { // :7113
        await era.printAndWait(`「啊哈啊~…股间…黏糊糊湿哒哒地…${heart(1)}」`); // :7114
        await era.printAndWait(`―――第一次超过了润滑lv2了。`); // :7115
      } // :7116
      // それ以外 // :7117
    } else { // :7118
      // 润滑液を使った場合 // :7119
      if (SELECTCOM == 50) { // :7120
        await era.printAndWait(`「这，这种液体什么的…才，才不舒服呢………」`); // :7121
        await era.printAndWait(`―――第一次超过了润滑lv2了。`); // :7122
        // それ以外 // :7123
      } else { // :7124
        await era.printAndWait(`「啊~…这，这个难道是…漏，漏了…啊啊…」`); // :7125
        await era.printAndWait(`―――第一次超过了润滑lv2了。`); // :7126
      } // :7127
    } // :7128
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :7129
    era.set(`cflag:${target}:TARGET:221`, 1); // :7129
  } // :7130

  // ------------------------------------------------- // :7132
  // 初めて欲情がLV2超えた CFLAG:222 // :7133
  // ------------------------------------------------- // :7134
  // 赋值 P = PALAM:5 + UP:5 // :7135
  if (P > PALAMLV:2 && CFLAG:222 == 0) { // :7136
    // 爱慕 // :7137
    if (TALENT:TARGET:85 == 1) { // :7138
      // しあわせ草を使った場合 // :7139
      if (SELECTCOM == 51) { // :7140
        await era.printAndWait(`「不，不行…被这种药…输给这种药不行…明明不可以来的…${heart(1)}」`); // :7141
        await era.printAndWait(`―――第一次超过了欲情lv2了。`); // :7142
        // それ以外 // :7143
      } else { // :7144
        await era.printAndWait(`「啊、啊啊…忍，忍耐…不住了啦…请抱，抱一下好吗~………」`); // :7145
        await era.printAndWait(`―――第一次超过了欲情lv2了。`); // :7146
      } // :7147
      // それ以外 // :7148
    } else { // :7149
      // しあわせ草を使った場合 // :7150
      if (SELECTCOM == 51) { // :7151
        await era.printAndWait(`「真，真是卑鄙…输给这种药…可不行的…....明明不行的…」`); // :7152
        await era.printAndWait(`―――第一次超过了欲情lv2了。`); // :7153
        // それ以外 // :7154
      } else { // :7155
        await era.printAndWait(`「哈啊…啊啊~…稍，稍微摸一下…也可以吧………」`); // :7156
        await era.printAndWait(`―――第一次超过了欲情lv2了。`); // :7157
      } // :7158
    } // :7159
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :7160
    era.set(`cflag:${target}:222`, 1); // :7160
  } // :7161

  // ------------------------------------------------- // :7163
  // 初めて耻情がLV2超えた CFLAG:223 // :7164
  // ------------------------------------------------- // :7165
  // 赋值 P = PALAM:8 + UP:8 // :7166
  if (P > PALAMLV:2 && CFLAG:223 == 0) { // :7167
    // 爱慕 // :7168
    if (TALENT:TARGET:85 == 1) { // :7169
      await era.printAndWait(`「哈呜~${heart(1)} 请、请不要看过来…」`); // :7170
      await era.printAndWait(`―――第一次超过了耻情lv2了。`); // :7171
      // それ以外 // :7172
    } else { // :7173
      await era.printAndWait(`「看，看过来可不行啊………」`); // :7174
      await era.printAndWait(`―――第一次超过了耻情lv2了。`); // :7175
    } // :7176
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :7177
    era.set(`cflag:${target}:223`, 1); // :7177
  } // :7178

  // ------------------------------------------------- // :7180
  // 初めて恐怖がLV2超えた CFLAG:224 // :7181
  // ------------------------------------------------- // :7182
  // 赋值 P = PALAM:10 + UP:10 // :7183
  if (P > PALAMLV:2 && CFLAG:224 == 0) { // :7184
    // 爱慕 // :7185
    if (TALENT:TARGET:85 == 1) { // :7186
      await era.printAndWait(`「啊，啊啊…不，不要过来…请不要过来…」`); // :7187
      await era.printAndWait(`―――第一次超过了恐怖LV2了。`); // :7188
      // それ以外 // :7189
    } else { // :7190
      await era.printAndWait(`「啊，啊啊…不，不要过来…请不要过来…」`); // :7191
      await era.printAndWait(`―――第一次超过了恐怖LV2了。`); // :7192
    } // :7193
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :7194
    era.set(`cflag:${target}:224`, 1); // :7194
  } // :7195

  // ------------------------------------------------- // :7197
  // 初めて阴蒂绝顶 CFLAG:225 // :7198
  // ------------------------------------------------- // :7199
  if (NOWEX:0 > 0 && CFLAG:225 == 0) { // :7200
    // 爱慕 // :7201
    if (TALENT:TARGET:85 == 1) { // :7202
      await era.printAndWait(`「嗯啊呜~${heart(1)} 这，这就是要去了的意思吧…${heart(1)}」`); // :7203
      await era.printAndWait(`看来${target_name}第一次因为小豆豆的刺激而高潮了。`); // :7204
      // それ以外 // :7205
    } else { // :7206
      await era.printAndWait(`「啊~不要不要…感觉…要来了…要来了啊~…啊啊~啊~啊啊啊～！」`); // :7207
      await era.printAndWait(`看来${target_name}第一次因为小豆豆的刺激而高潮了。`); // :7208
    } // :7209
    // CFLAG:225  = 1（变量语义：CFLAG 族，225） // :7210
    era.set(`cflag:${target}:225`, 1); // :7210
  } // :7211

  // ------------------------------------------------- // :7213
  // 初めて私处绝顶 CFLAG:226 // :7214
  // ------------------------------------------------- // :7215
  if (NOWEX:1 > 0 && CFLAG:226 == 0) { // :7216
    // 淫乱 // :7217
    if (TALENT:TARGET:76 == 1) { // :7218
      await era.printAndWait(`「啊~啊啊~…有什么要来了~要来了~…从小穴那儿来了~${heart(1)}」`); // :7219
      await era.printAndWait(`「欺负，请更加地欺负吧~~~${heart(3)}」`); // :7220
      await era.printAndWait(`「嗯哈啊~${heart(1)}啊~啊啊嗯~嗯哈啊啊啊啊啊嗯啊嗯啊~~~${heart(3)}」`); // :7221
      await era.printAndWait(`${target_name}因为第一次阴道高潮而大声地叫了起来………`); // :7222
      // 愛 // :7223
    } else if (TALENT:TARGET:85 == 1) { // :7224
      await era.printAndWait(`「啊~…不行~~…不行的啊~~~…小穴~…再这样下去…哈呜嗯~${heart(1)}」`); // :7225
      await era.printAndWait(`「呜哈嗯啊~~${heart(1)} 呜~…嗯哈~…啊啊~…不，不行~~…啊啊~…啊~…啊啊啊嗯~~${heart(3)}」`); // :7226
      await era.printAndWait(`「嗯呜哎嗯~…呜哈呜~~…又，又要来了~~${heart(1)} 啊~…啊~啊啊~啊~…哈嗯啊啊啊啊啊啊~～～～！！！」`); // :7227
      await era.printAndWait(`${target_name}因为第一次的阴道高潮而感到舒服………`); // :7228
      // それ以外 // :7229
    } else { // :7230
      await era.printAndWait(`「哈啊~…不要~要啊啊~…要来了…要来了啊~~…小穴…再这样…做下去的话${heart(1)}」`); // :7231
      await era.printAndWait(`「哈呜…要来了…真的要来了…哈呜嗯~~…啊~啊啊啊啊~${heart(1)}」`); // :7232
      await era.printAndWait(`${target_name}因为第一次的阴道高潮而靠在你的肩膀喘息着………`); // :7233
    } // :7234
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :7235
    era.set(`cflag:${target}:TARGET:226`, 1); // :7235
  } // :7236

  // ------------------------------------------------- // :7238
  // 初めて肛门绝顶 CFLAG:227 // :7239
  // ------------------------------------------------- // :7240
  if (NOWEX:2 > 0 && CFLAG:227 == 0) { // :7241
    // 淫乱 // :7242
    if (TALENT:TARGET:76 == 1) { // :7243
      // 浣腸器＋プラグ解除時(強制脱糞時)にA感覚Lv0で絶頂 // :7244
      if (SELECTCOM == 46 && TEQUIP:46 == 0 && ABL:3 == 0) { // :7245
        await era.printAndWait(`「出来了%UNICODE(0x2764) *1%　粗的玩意拉出来啦～%UNICODE(0x2764) *1%」`); // :7246
        await era.printAndWait(`「厉、好厉害哇%UNICODE(0x2764) *1%　菊穴、去了…一边拉一边去了啊%UNICODE(0x2764) *1%」`); // :7247
        await era.printAndWait(`「菊穴、好厉害%UNICODE(0x2764) *1%　嗯哈啊啊嗯%UNICODE(0x2764) *1%　菊穴要化了啊啊…要变成肉穴、变成肉穴了嗷嗷嗷%UNICODE(0x2764) *1%」`); // :7248
        await era.printAndWait(`${target_name}迎来了初次的菊花高潮的同时把粪便喷得到处都是。满身污物一脸恍惚地沉浸在菊花高潮当中……`); // :7249
        // 淫乱それ以外 // :7250
      } else { // :7251
        await era.printAndWait(`「啊哈嗯嗯~~~…肛门小穴...请更加地玩弄吧~~~~${heart(1)}」`); // :7252
        await era.printAndWait(`「肛门小穴融化了~…要融化掉了~~${heart(3)}」`); // :7253
        await era.printAndWait(`「啊~啊啊~${heart(1)}嗯哈啊嗯~~${heart(1)}肛门小穴要去了要去了要要去去去了了了了了~~~~${heart(5)}」`); // :7254
        await era.printAndWait(`${target_name}带着淫荡无比的神色，第一次因为后庭而高潮了…………`); // :7255
      } // :7256
      // 愛 // :7257
    } else if (TALENT:TARGET:85 == 1) { // :7258
      await era.printAndWait(`「嗯呀哈~…啊啊~…啊啊嗯~~…不要不要~~${heart(1)}」`); // :7259
      await era.printAndWait(`「啊~~…屁股…要去了~…呜~呜~${heart(1)}啊啊啊啊啊~～～～！！！！」」`); // :7260
      await era.printAndWait(`「哈~…${sc()}因为…屁股而去了的都是…都，都是因为大人你啊………」`); // :7261
      await era.printAndWait(`${target_name}好像是第一次因为肛门而高潮的样子被看到了，所以闹起了别扭………`); // :7262
      // それ以外 // :7263
    } else { // :7264
      // 浣腸器＋プラグ装着時にA感覚Lv0で絶頂 // :7265
      if (SELECTCOM == 46 && TEQUIP:46 && ABL:3 == 0) { // :7266
        await era.printAndWait(`排泄小穴在尚未开发且习惯的情况下获得了性的快感`); // :7267
        await era.printAndWait(`而且逐渐意识到自己被肛门中逆流的液体搅到了高潮的事实、让${target_name}颇受打击……`); // :7268
        await era.printAndWait(`「嘤咦啊啊…不要…不要！　请把、把这个拔出去啊…${scf()}、${sc()}、要变奇怪了……啊！？」`); // :7269
        // 浣腸器＋プラグ装着時で絶頂 // :7270
      } else if (SELECTCOM == 46 && TEQUIP:46) { // :7271
        await era.printAndWait(`在腹中流动着的灌肠液的刺激下、${target_name}初次达到了菊花高潮`); // :7272
        await era.printAndWait(`「好舒服…屁股、菊花、${sc()}、被灌肠弄坏了啊…！」`); // :7273
        // 浣腸器＋プラグ解除時(強制脱糞時)にA感覚Lv0＋気力0で絶頂 // :7274
      } else if (SELECTCOM == 46 && TEQUIP:46 == 0 && ABL:3 == 0 && BASE:1 == 0) { // :7275
        await era.printAndWait(`从脱力抽搐着的菊花里、肠内残余的脏污液体全都喷了出来`); // :7276
        await era.printAndWait(`能阻止的方法还是气力、现在${target_name}完全没有了`); // :7277
        // 涙もろい // :7278
        if (TALENT:44 == 1) { // :7279
          await era.printAndWait(`在初次尝肛门排泄绝顶的困惑中、早已泣不成声……`); // :7280
        } else { // :7281
          await era.printAndWait(`污物喷出的同时全身颤抖了起来、肛门绝顶的余韵令其困惑不已……`); // :7282
        } // :7283
        await era.printAndWait(`「唔、呜呜…！　${scf()}、${sc()}…屁股…排便、竟然会、舒服什么的…啊啊啊啊啊……！！」`); // :7284
        // 浣腸器＋プラグ解除時(強制脱糞時)にA感覚Lv0で絶頂 // :7285
      } else if (SELECTCOM == 46 && TEQUIP:46 == 0 && ABL:3 == 0) { // :7286
        await era.printAndWait(`刺溜！　噗噜噜噜噜！　哔呜哔呜哔呜！`); // :7287
        await era.printAndWait(`肛门发出不雅的声音的同时、${target_name}烦恼着排泄所带来的快感`); // :7288
        await era.printAndWait(`排泄快感在菊花开发过程中很容易获得、相反地在强制排便时获得的意外也是有的……`); // :7289
        await era.printAndWait(`「${scf()}、%SELF_CALL(TARGET,4)%！　明明是这幅丑态、屁股…骗人…骗人的吧……！」`); // :7290
        await era.printAndWait(`「啊啊啊、别出来啊！　出来了、好舒服…骗、骗人的吧！　啊啊啊啊、为什么会舒服啊啊……！？」`); // :7291
        // 浣腸器＋プラグ解除時(強制脱糞時)で絶頂 // :7292
      } else if (SELECTCOM == 46 && TEQUIP:46 == 0) { // :7293
        await era.printAndWait(`排泄感所带来的解放感与便随着的肛门快感、${target_name}在排泄着粪便的同时初次尝到了菊花绝顶的滋味……`); // :7294
        await era.printAndWait(`「啊啊啊！？　好厉害、不是吧、屁股…竟然、好舒服啊…！！」`); // :7295
        await era.printAndWait(`「出来了…拉出来了、这、好舒服…不…不要…！　不……%UNICODE(0x2764) *1%」`); // :7296
        // それ以外 // :7297
      } else { // :7298
        await era.printAndWait(`「呜！…呜啊啊啊~…不行…变得不行了！…屁，屁股那里…再这样下去…原酿~…原~酿~我！」`); // :7299
        await era.printAndWait(`${target_name}第一次因为菊花而高潮的样子、身体颤抖着，不知道发出了多少次悲鸣………`); // :7300
      } // :7301
    } // :7302
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :7303
    era.set(`cflag:${target}:227`, 1); // :7303
  } // :7304

  // ------------------------------------------------- // :7306
  // 初めて乳房绝顶 CFLAG:228 // :7307
  // ------------------------------------------------- // :7308
  if (NOWEX:3 > 0 && CFLAG:228 == 0) { // :7309
    // 爱慕 // :7310
    if (TALENT:TARGET:85 == 1) { // :7311
      await era.printAndWait(`「哈嗯啊~…胸部~…要融化掉了~${heart(1)} 哈唉呜~${heart(1)} 有什么要来，要来了！…啊啊嗯~${heart(1)}」`); // :7312
      await era.printAndWait(`${target_name}第一次因为胸部刺激而高潮了………`); // :7313
      // それ以外 // :7314
    } else { // :7315
      await era.printAndWait(`「啊~啊啊~…不，不行的~…再这样刺激胸部的话~…啊啊哈呜嗯~~…要，要融化掉了………」`); // :7316
      await era.printAndWait(`${target_name}第一次因为胸部刺激而高潮了………`); // :7317
    } // :7318
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :7319
    era.set(`cflag:${target}:TARGET:228`, 1); // :7319
  } // :7320


  // ------------------------------------------------- // :7323
  // 处女喪失(处女のみ) CFLAG:229 // :7324
  // ------------------------------------------------- // :7325
  // 赋值 A = UP:11 + UP:12 // :7326
  if (TFLAG:3 == 1 && CFLAG:229 == 0) { // :7327
    // 主人による处女喪失 // :7328
    if (TFLAG:20 == 1) { // :7329
      // 淫乱かつ反抗刻印取得せず // :7330
      if (TALENT:TARGET:76 == 1 && (A < 500 || TFLAG:150 == 1)) { // :7331
        await era.printAndWait(`「啊哈嗯~${heart(1)}…主人~…${sc()}的淫乱处女小穴的使用感觉怎么呢~…？」`); // :7332
        await era.printAndWait(`「从今天开始~…以后请用${sc()}的小穴来做舒服的事情吧~${heart(1)}」`); // :7333
        await era.printAndWait(`${target_name}露出淫乱的表情向你撒娇起来了………`); // :7334
        // 愛かつ反発刻印取得せず // :7335
      } else if (TALENT:TARGET:85 == 1 && (A < 500 || TFLAG:150 == 1)) { // :7336
        await era.printAndWait(`「哈啊~…哈啊~…将处女献给大人你什么的~…${heart(1)}」`); // :7337
        await era.printAndWait(`「从今以后就请多多指教了~…${heart(1)}」`); // :7338
        await era.printAndWait(`${target_name}露出了很高兴的表情向你撒起了娇………`); // :7339
        // それ以外 // :7340
      } else { // :7341
        await era.printAndWait(`「啊啊…${sc()}…已经回不了故乡了呀…呜呜~…呜呜~………」`); // :7342
        await era.printAndWait(`${target_name}为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………`); // :7343
      } // :7344
      // 主人以外による处女喪失 // :7345
    } else { // :7346
      // 淫乱 // :7347
      if (TALENT:TARGET:76 == 1) { // :7348
        await era.printAndWait(`「哈嗯~${heart(1)}…终于不是处女了~…♪」`); // :7349
        await era.printAndWait(`「可以的哦…从今以后就请好好地疼爱这个淫乱的小穴吧${heart(1)}」`); // :7350
        // 愛 // :7351
      } else if (TALENT:TARGET:85 == 1) { // :7352
        await era.printAndWait(`「哈啊…哈啊…为什么${sc()}…居然会想让大人…来夺走自己的处女…」`); // :7353
        await era.printAndWait(`「哈啊…真是笨蛋呢……（哭）」`); // :7354
        // それ以外 // :7355
      } else { // :7356
        await era.printAndWait(`「啊啊~…${sc()}…已经回不了故乡了…呜呜~…呜呜~………」`); // :7357
        await era.printAndWait(`${target_name}为了不让你看见将脸遮起来‘呜呜’地流下了眼泪………`); // :7358
      } // :7359
    } // :7360
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :7361
    era.set(`cflag:${target}:TARGET:229`, 1); // :7361
  } // :7362

  // ------------------------------------------------- // :7364
  // 寄生 CFLAG:230 // :7365
  // ------------------------------------------------- // :7366
  if (((NOWEX:0 && CFLAG:225 == 1) || (NOWEX:1 && CFLAG:226 == 1) || (NOWEX:2 && CFLAG:227 == 1) || (NOWEX:3 && CFLAG:228 == 1)) && (TALENT:TARGET:190 == 1 || TALENT:TARGET:191 == 1)) { // :7367
    if (CFLAG:TARGET:230 >= 100) { // :7368
      if (RAND:3 == 0) { // :7369
        await era.print(`「啊啊~${heart(1)} 要、要生出来了呀~${heart(3)}」`); // :7370
        await era.printAndWait(`「……请不要、看着……${target_name}的这种样子~……」`); // :7371
      } else if (RAND:2 == 0) { // :7372
        await era.print(`「不、不行……要生出来了啊啊啊~${heart(1)}」`); // :7373
      } else { // :7374
        await era.printAndWait(`「……撒、现在就将${target_name}可爱的孩子们生出来了~${heart(3)}」`); // :7375
      } // :7376
    } else if (CFLAG:TARGET:230 == 75) { // :7377
      await era.print(`「……我的身体、总觉得有点奇怪啊……」`); // :7378
      await era.printAndWait(`「不管怎样生…怎样生都好、都满足不了啊~……想要生更多…更多的蛋出来了啊~……」`); // :7379
    } else { // :7380
      // 両穴 // :7381
      if (TALENT:TARGET:190 == 1 && TALENT:TARGET:191 == 1) { // :7382
        await era.print(`「啊啊~…我的`); // :7383
        if (RAND:2 == 0) { // :7384
          await era.print(`两个小穴`); // :7385
        } else { // :7386
          await era.print(`小穴还有屁股`); // :7387
        } // :7388
        await era.printAndWait(`都要生出来、要生出来了啊~……啊啊~！！」`); // :7389
        // 私处寄生 // :7390
      } else if (TALENT:TARGET:190 == 1) { // :7391
        if (RAND:1 == 0) { // :7392
          await era.printAndWait(`「嗯呜~…啊啊~、被这样刺激了的话、要、要生出来了啊啊~、啊啊啊~！！」`); // :7393
        } else { // :7394
          await era.printAndWait(''); // :7395
        } // :7396
        // 直肠寄生 // :7397
      } else { // :7398
        if (RAND:2 == 0) { // :7399
          await era.printAndWait(`「哈呜~、要、要从屁股里、出来了啊啊啊~！！」`); // :7400
        } else { // :7401
          await era.printAndWait(`「哈呜~、要从${target_name}的屁股里…啊啊、生、生出来了啊啊~！！」`); // :7402
        } // :7403
      } // :7404
    } // :7405
    // CFLAG:TARGET:230 + = 1（变量语义：CFLAG 族，TARGET:230 +） // :7406
    era.set(`cflag:${target}:TARGET:230 +`, 1); // :7406
  } // :7407

  // ------------------------------------------------- // :7409
  // @KOJO_MESSAGE_MARKCNG関係（X1をキャラ番号に置換） // :7410
  // 刻印変動をトリガーにした口上 // :7411
  // 刻印変動後に口上を発動します // :7412
  // ------------------------------------------------- // :7413

// @KOJO_MESSAGE_MARKCNG_3 // :7414
function KOJO_MESSAGE_MARKCNG_3() {
  // 助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる） // :7415
  if (ASSI > 0 && ASSIPLAY) { // :7417
    return 0; // :7417
  } // :7417
  // 口塞着用時には口上をスキップする（OFFだと口を塞いでるのに喋りまくる） // :7418
  if (TEQUIP:45) { // :7420
    return 0; // :7420
  } // :7420
  // 失神時には口上をスキップする // :7421
  if (TFLAG:899) { // :7423
    return 0; // :7423
  } // :7423
  // 兽奸PLAY中は口上をスキップする。 // :7424
  if (TEQUIP:89) { // :7426
    return 0; // :7426
  } // :7426
  // 触手調教中は口上をスキップする // :7427
  if (TEQUIP:90) { // :7429
    return 0; // :7429
  } // :7429
  // 崩坏した場合は口上をスキップする // :7430
  if (TALENT:TARGET:9 == 1) { // :7432
    return 0; // :7432
  } // :7432
  // 死斗场中は口上をスキップする // :7433
  if (TEQUIP:55) { // :7435
    return 0; // :7435
  } // :7435
  // ------------------------------------------------- // :7436
  // 苦痛刻印Lv3取得 CFLAG:297 // :7437
  // ------------------------------------------------- // :7438
  if (TFLAG:22 == 3 && CFLAG:297 == 0) { // :7439
    // 爱慕 // :7440
    if (TALENT:85 == 1) { // :7441
      await era.printAndWait(`「哈嗯呜~！…请更，请更多地…在${sc()}的身体上刻下印记吧………」`); // :7442
    } else { // :7443
      await era.printAndWait(`「啊嗯~！…好，痛…好疼的…不，不行的…的说…」`); // :7444
    } // :7445
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :7446
    era.set(`cflag:${target}:297`, 1); // :7446
  } // :7447

  // ------------------------------------------------- // :7449
  // 快乐刻印Lv3取得 CFLAG:298 // :7450
  // ------------------------------------------------- // :7451
  if (TFLAG:23 == 3 && CFLAG:298 == 0) { // :7452
    // 爱慕 // :7453
    if (TALENT:85 == 1) { // :7454
      await era.printAndWait(`「啊啊啊~…不行~…再这样…舒服下去的话…真的要…离不开了…${heart(1)}」`); // :7455
    } else { // :7456
      await era.printAndWait(`「哈啊…哈呜呜~…这样…好舒服的事情…还是第一次来的…${heart(1)}」`); // :7457
    } // :7458
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :7459
    era.set(`cflag:${target}:298`, 1); // :7459
  } // :7460

  // ------------------------------------------------- // :7462
  // 屈服刻印Lv3取得 CFLAG:299 // :7463
  // ------------------------------------------------- // :7464
  if (TFLAG:24 == 3 && CFLAG:299 == 0) { // :7465
    // 爱慕 // :7466
    if (TALENT:85 == 1) { // :7467
      await era.printAndWait(`「啊啊…${sc()}会…好好听命令得…自己的立场…明白的…${sc()}明白的………」`); // :7468
    } else { // :7469
      await era.printAndWait(`「啊啊~…不，不会再反抗了…绝对…绝对不会再次反抗了………」`); // :7470
    } // :7471
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :7472
    era.set(`cflag:${target}:299`, 1); // :7472
  } // :7473

  // ------------------------------------------------- // :7475
  // 反抗刻印Lv3取得 CFLAG:300 // :7476
  // ------------------------------------------------- // :7477
  if (TFLAG:21 == 3 && CFLAG:300 == 0) { // :7478
    // 爱慕 // :7479
    if (TALENT:85 == 1) { // :7480
      await era.printAndWait(`${target_name}无言地盯着你看………`); // :7481
    } else { // :7482
      await era.printAndWait(`${target_name}无言地瞪着你………`); // :7483
    } // :7484
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :7485
    era.set(`cflag:${target}:300`, 1); // :7485
  } // :7486


  // ------------------------------------------------- // :7489
  // イベント口上集（X1、X2をキャラ番号に置換する） CFLAG 261～296 // :7490
  // ------------------------------------------------- // :7491

// @SELF_KOJO_K3 // :7492
function SELF_KOJO_K3() {
  // ------------------------------------------------- // :7493
  // 調教後自慰 CFLAG:261 // :7494
  // ------------------------------------------------- // :7495
  if (TFLAG:13 == 1) { // :7496
    // 爱がなくかつ助手とのレズセックス後なら百合气质×20%で助手 // :7497
    if (Q == 1) { // :7498
      await era.print(`「嗯~…嗯哈~…${sc()}…居然想着女孩子…做这样的事情什么的…${heart(1)}」`); // :7499
      await era.print(`残留着的欲望之火让${target_name}的身体还在一点一点地燃烧着………`); // :7500
      // 上に該当せずかつ愛がなくアイテムに野良犬があれば、兽奸中毒×20%で野良犬 // :7501
    } else if (Q == 2) { // :7502
      await era.print(`「狗狗的…想要啊~…啊啊~…${sc()}比狗和畜生还要低贱啊~…啊啊~${heart(1)}」`); // :7503
      await era.print(`堕落的愉悦让${target_name}哪怕觉得苦恼也不会停下自慰………`); // :7504
      // その他 // :7505
    } else { // :7506
      // 淫乱 // :7507
      if (TALENT:76 && (CFLAG:261 < 4 || FLAG:7 == 2)) { // :7508
        await era.printAndWait(`「哼嗯~…不管是小穴${heart(1)}…还是肛穴${heart(1)}…都好热啊…${heart(3)}」`); // :7509
        await era.printAndWait(`「好想被大鸡鸡继续啪啪啪啊…${heart(1)}啊啊啊嗯~~…只是手指根本不够嘛………」`); // :7510
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :7511
        era.set(`cflag:${target}:261`, 4); // :7511
        // 爱慕 // :7512
      } else if (TALENT:85 && (CFLAG:261 < 3 || FLAG:7 == 2)) { // :7513
        await era.printAndWait(`「还想……还想要更多……${heart(1)}」`); // :7514
        await era.printAndWait(`「嗯哈嗯~${heart(1)} 身体…好热…好痒…啊啊~${heart(1)} 大人~${heart(3)}」`); // :7515
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :7516
        era.set(`cflag:${target}:261`, 3); // :7516
        // 自慰中毒Lv3以上 // :7517
      } else if (ABL:31 >= 3 && (CFLAG:261 < 2 || FLAG:7 == 2)) { // :7518
        await era.printAndWait(`「哈嗯~${heart(1)} 身体好热啊~…手指停不下来呀~${heart(1)}」`); // :7519
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :7520
        era.set(`cflag:${target}:261`, 2); // :7520
        // それ以外 // :7521
      } else if (CFLAG:261 < 1 || FLAG:7 == 2) { // :7522
        await era.printAndWait(`「啊啊~…身体~…好热好痒啊…！」`); // :7523
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :7524
        era.set(`cflag:${target}:261`, 1); // :7524
      } // :7525
    } // :7526
  } // :7527
  // ------------------------------------------------- // :7528
  // レズプレイ CFLAG:262 // :7529
  // ------------------------------------------------- // :7530
  if (TFLAG:13 == 2) { // :7531
    // 淫乱 // :7532
    if (TALENT:76 && (CFLAG:262 < 5 || FLAG:7 == 2)) { // :7533
      await era.printAndWait(`「嗯哼哼…女孩子之间的SEX、也很不错呢${heart(1)}」`); // :7534
      await era.printAndWait(`「不知道你会用什么声音来呻吟呢~？」`); // :7535
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :7536
      era.set(`cflag:${target}:262`, 5); // :7536
      // 愛 // :7537
    } else if (TALENT:85 && (CFLAG:262 < 4 || FLAG:7 == 2)) { // :7538
      await era.printAndWait(`「嗯~…哈…啊啊…只有那位大人才可以…这种声音…啊啊~${heart(1)}」`); // :7539
      await era.printAndWait(`「明明不想听到来着…嗯~嗯~…哈啊啊啊啊啊嗯~~${heart(3)}」`); // :7540
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :7541
      era.set(`cflag:${target}:262`, 4); // :7541
      // レズ中毒Lv3以上 // :7542
    } else if (ABL:33 >= 3 && (CFLAG:262 < 3 || FLAG:7 == 2)) { // :7543
      await era.printAndWait(`「嗯哼哼哼…撒…一起享受吧~${heart(1)} 享受百合的喜悦吧~${heart(1)}」`); // :7544
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :7545
      era.set(`cflag:${target}:262`, 3); // :7545
      // 百合气质Lv3以上 // :7546
    } else if (ABL:22 >= 3 && (CFLAG:262 < 2 || FLAG:7 == 2)) { // :7547
      await era.printAndWait(`「哼啊啊~…和女孩子做…居然会那么舒服什么的…${heart(1)}」`); // :7548
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :7549
      era.set(`cflag:${target}:262`, 2); // :7549
      // それ以外 // :7550
    } else if (CFLAG:262 < 1 || FLAG:7 == 2) { // :7551
      await era.printAndWait(`「啊~…这，这样的不奇怪吗…和女孩子做什么的………」`); // :7552
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :7553
      era.set(`cflag:${target}:262`, 1); // :7553
    } // :7554
  } // :7555

  // ------------------------------------------------- // :7557
  // 朝フェラ CFLAG:263 // :7558
  // ------------------------------------------------- // :7559
  if (TFLAG:13 == 3) { // :7560
    // 淫乱 // :7561
    if (TALENT:76 == 1 && (CFLAG:263 < 4 || FLAG:7 == 2)) { // :7562
      await era.printAndWait(`「啊哈嗯~${heart(1)} 早上好啊~、主人…呸咯~${heart(1)}」`); // :7563
      await era.printAndWait(`「还在${heart(1)} 继续着早上的口交侍奉呢所以…请不用在意~${heart(1)}」`); // :7564
      await era.printAndWait(`${target_name}一脸淫乱地将阴茎塞进了喉咙的深处，。`); // :7565
      await era.printAndWait(`「嗯呃…啾噜啾噜嗯~…呸噜嗯~${heart(1)}…嗯嗯~…嗯啊嗯嗯啊嗯噗嗯~…嗯噗呜呜~嗯~${heart(3)}」`); // :7566
      // CFLAG:263  = 4（变量语义：CFLAG 族，263） // :7567
      era.set(`cflag:${target}:263`, 4); // :7567
      // 愛 // :7568
    } else if (TALENT:85 && (CFLAG:263 < 3 || FLAG:7 == 2)) { // :7569
      await era.printAndWait(`「啾噜嗯~…啾啾~…啾噜噜嗯~…啊啊嗯~${heart(1)} 早上好~~。我最爱的大人~${heart(3)}」`); // :7570
      await era.printAndWait(`「这个大鸡鸡~~${heart(1)}…${target_name}会用嘴巴来弄干净的~…请在等一下吧~${heart(1)}」`); // :7571
      await era.printAndWait(`${target_name}疼爱地用舔舐来清洁着阴茎。`); // :7572
      await era.printAndWait(`「嗯哼哼~…如果兴奋起来了话…就请这样侵犯${sc()}的嘴巴吧~${heart(1)}」`); // :7573
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :7574
      era.set(`cflag:${target}:263`, 3); // :7574
      // 侍奉精神Lv5以上 // :7575
    } else if (ABL:16 >= 5 && (CFLAG:263 < 2 || FLAG:7 == 2)) { // :7576
      await era.printAndWait(`「早上好、主人${heart(1)}」`); // :7577
      await era.printAndWait(`「哈嗯~哈嗯~……${target_name}会用嘴巴来弄干净的，请就这样等一下吧~${heart(1)}」`); // :7578
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :7579
      era.set(`cflag:${target}:263`, 2); // :7579
      // それ以外 // :7580
    } else if (CFLAG:263 < 1 || FLAG:7 == 2) { // :7581
      await era.printAndWait(`「嗯哈~…哈啊~…哈嗯~…哈嗯~…对，对不起…因为实在是太厉害的大鸡鸡了不小心………${heart(1)}」`); // :7582
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :7583
      era.set(`cflag:${target}:263`, 1); // :7583
    } // :7584
  } // :7585

  // ------------------------------------------------- // :7587
  // 調教後セックス CFLAG:264 // :7588
  // ------------------------------------------------- // :7589
  if (TFLAG:13 == 4) { // :7590
    // V感覚Lv4以上 // :7591
    if (ABL:2 >= 4 && (CFLAG:264 < 2 || FLAG:7 == 2)) { // :7592
      await era.printAndWait(`「哈啊~…哈啊~…身体按捺不住呢…小穴痒地不行不行地呢${heart(1)}」`); // :7593
      await era.printAndWait(`「请更多地…更多地…侵犯吧！」`); // :7594
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :7595
      era.set(`cflag:${target}:264`, 2); // :7595
      // それ以外 // :7596
    } else if (CFLAG:264 < 1 || FLAG:7 == 2) { // :7597
      await era.printAndWait(`「哈啊…哈啊…身体按捺不住呢…小穴痒地受不了了呢${heart(1)}」`); // :7598
      await era.printAndWait(`「所，所以啦…请抱，抱一下吧………」`); // :7599
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :7600
      era.set(`cflag:${target}:264`, 1); // :7600
    } // :7601
  } // :7602

  // ------------------------------------------------- // :7604
  // 夜這い CFLAG:265 // :7605
  // ------------------------------------------------- // :7606
  if (TFLAG:13 == 5) { // :7607
    if (CFLAG:265 < 1 || FLAG:7 == 2) { // :7608
      await era.printAndWait(`「晚，晚上好……啊……${scf()}、${sc()}…是来给主人抱抱来的${heart(1)}」`); // :7609
      await era.printAndWait(`「身体痒地受不了…迫使${sc()}来的…${heart(1)}」`); // :7610
      await era.printAndWait(`「请给予好色又不要脸的…雌、雌奴隶…同情与怜悯吧………${heart(1)}」`); // :7611
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :7612
      era.set(`cflag:${target}:265`, 1); // :7612
    } // :7613
  } // :7614

  // ------------------------------------------------- // :7616
  // 売却 // :7617
  // ------------------------------------------------- // :7618
  if (TFLAG:13 == 6) { // :7619
    // 牝犬 // :7620
    if (TALENT:136) { // :7621
      await era.printAndWait(`直到告知要被卖掉的时候${target_name}仍和「丈夫」你侬我侬的交合着`); // :7622
      await era.printAndWait(`「十分感谢……您教导${sc()}理解了美好的兽爱世界」`); // :7623
      await era.printAndWait(`和爱侣一同爬入笼子里的${target_name}静静地跪在地上行了最后一礼`); // :7624
      // 愛+反発刻印Lv3未満 // :7625
    } else if (TALENT:85 && MARK:3 < 3) { // :7626
      // 高贵エルフ // :7627
      if (TALENT:TARGET:314 == 1) { // :7628
        await era.printAndWait(`被告知要被卖掉的瞬间、${target_name}的瞳孔放大地呆住了。`); // :7629
        await era.printAndWait(`看来被说了什么并没有理解得样子。`); // :7630
        await era.printAndWait(`没有办法只好再将事实重复了一次、${target_name}便开始大声地哭喊着。`); // :7631
        await era.print(`………………`); // :7632
        await era.printAndWait(`你用护卫的怪物强行将${target_name}压制住后`); // :7633
        await era.printAndWait(`向${target_name}的长而美丽的耳朵…没错…在她自满的美丽的耳朵上打上了用于拍卖标码的耳环。`); // :7634
        await era.printAndWait(`一打上耳环后、如同断了念头一样${target_name}安静了下来……………`); // :7635
        // 魔界将軍・魔界神官 // :7636
      } else if (TALENT:210 || TALENT:211) { // :7637
        await era.printAndWait(`「竟、竟然……都已经做好作为魔王大人的左右手随时准备奉献的准备了……」`); // :7638
        await era.printAndWait(`「竟然……不可能的……那个誓约……那份授勋……到底算什么啊」`); // :7639
        await era.printAndWait(`已然泣不成声的${target_name}手被奴隶商人拉了起来。`); // :7640
        await era.printAndWait(`${target_name}会哭到什么时候呢……。`); // :7641
        // その他 // :7642
      } else { // :7643
        await era.printAndWait(`「骗、骗人…拜，拜托了…是开玩笑的吧………」`); // :7644
        await era.printAndWait(`你下令让怪物抓住${target_name}将她带到了马车的旁边。`); // :7645
        await era.printAndWait(`「不要，不要啊…这绝对是骗人的！」`); // :7646
        await era.printAndWait(`「${scf()}、${sc()}想…想和大人你在一起来的啊…呜呜呜！」`); // :7647
      } // :7648
      // 反抗刻印Lv3 // :7649
    } else if (MARK:3 == 3) { // :7650
      await era.printAndWait(`「给我记住…给我记住啊！…哪怕死了也…混蛋…！！」`); // :7651
      // 淫乱 // :7652
    } else if (TALENT:76) { // :7653
      // 高贵ダークエルフ // :7654
      if (TALENT:TARGET:314 == 7) { // :7655
        await era.printAndWait(`「没什么…对于堕落了的身体这件事来说…并没有任何的后悔来的…」`); // :7656
        await era.printAndWait(`「但是、已经不能再见到大人你稍微有点寂寞呢…稍微借用一下时间…可以吗？」`); // :7657
        await era.printAndWait(`${target_name}紧紧地抱着你，深深地拥吻着。`); // :7658
        await era.printAndWait(`「嗯哼哼、再见了~………要保重噢、魔王大人…………」`); // :7659
        // その他 // :7660
      } else { // :7661
        await era.printAndWait(`「啊啊嗯~…主人的大鸡巴的味道…还想要享受更多来着呢………${heart(1)}」`); // :7662
        await era.printAndWait(`「这就再见了实在是太寂寞了…${heart(1)}」`); // :7663
        await era.printAndWait(`「………真的、在这里的生活………觉得有点快乐的啊………」`); // :7664
      } // :7665
      // それ以外 // :7666
    } else { // :7667
      await era.printAndWait(`「${sc()}…接下来…会变成怎样呢………？」`); // :7668
    } // :7669
    await era.print(''); // :7670
    if (TALENT:122 != 1) { // :7672
      // CALL SELL_MATURO_K0 // :7672
    } // :7672
  } // :7673

  // ------------------------------------------------- // :7675
  // 妊娠発覚 CFLAG:271 // :7676
  // CFLAG:102→誰によって妊娠させられたか（マスター = 1, 助手 = 2, 奴隷 = 3, 客 = 4, 犬 = 5, 怪物・触手 = 6, 狂王 = 7） // :7677
  // ------------------------------------------------- // :7678
  if (TFLAG:13 == 11) { // :7679
    if (CFLAG:271 == 0) { // :7680
      // 崩坏してしまった場合 // :7681
      if (TALENT:9 == 1) { // :7682
        await era.printAndWait(`「啊哈哈~…啊哈哈~…啊哈哈哈哈哈哈哈哈！…为什么？…为什么？…为什么肚子居然膨胀成这么大了呢？」`); // :7683
        await era.printAndWait(`${target_name}发狂地笑着………`); // :7684
        // 父親が主人で母親が愛持ち // :7685
      } else if (TALENT:85 && CFLAG:102 == 1) { // :7686
        await era.printAndWait(`「啊啊~…真，真是困扰了呢~~…那个人的孩子…居然怀上了~…啊啊~…真不敢相信啊~${heart(1)}」`); // :7687
        await era.printAndWait(`「怎么可能会怀上呢…都要…放弃了来着…‥…」`); // :7688
        // 父親が助手 // :7689
      } else if (CFLAG:102 == 2) { // :7690
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`); // :7691
        await era.printAndWait(`「呜呜…这难道是…%CSTR:2%桑的………」`); // :7692
        await era.printAndWait(`${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`); // :7693
        // 父親が奴隷 // :7694
      } else if (CFLAG:102 == 3) { // :7695
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`); // :7696
        await era.printAndWait(`「呜呜…这难道是…%CSTR:2%桑的………」`); // :7697
        await era.printAndWait(`${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`); // :7698
        // 父親が野良犬 // :7699
      } else if (CFLAG:102 == 5) { // :7700
        if (TALENT:136 == 1) { // :7701
          await era.printAndWait(`「居然怀上了可爱的狗宝宝种子真是幸福呢~♪」`); // :7702
        } else { // :7703
          await era.printAndWait(`「怎么会…${sc()}居然怀上了那个野狗的孩子…骗、骗人的………」`); // :7704
        } // :7705
        // 父親が狂王 // :7706
      } else if (CFLAG:102 == 7) { // :7707
        await era.printAndWait(`「${scf()}、${sc()}居然怀上了狂王的孩子…骗人…怎么会…」`); // :7708
        // その他 // :7709
      } else { // :7710
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了………」`); // :7711
        await era.printAndWait(`「但是…该怎么说才好啊…啊啊、啊啊………」`); // :7712
      } // :7713
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7714
      era.set(`cflag:${target}:271`, 1); // :7714
      // 2回目 // :7715
    } else { // :7716
      // 崩坏してしまった場合 // :7717
      if (TALENT:9 == 1) { // :7718
        await era.printAndWait(`「啊哈哈…啊哈哈…啊哈哈哈哈哈哈哈哈哈！…为什么？…为什么呢？…为什么肚子居然膨胀成这么大了呢？」`); // :7719
        await era.printAndWait(`${target_name}发狂地笑着………`); // :7720
        // 父親が主人で母親が愛持ち // :7721
      } else if (TALENT:85 && CFLAG:102 == 1) { // :7722
        await era.printAndWait(`「啊啊~…真，真是困扰了呢~~…那个人的孩子…居然怀上了~…啊啊~…真不敢相信啊~${heart(1)}」`); // :7723
        await era.printAndWait(`「怎么可能会怀上呢…都要…放弃了来着…‥……」`); // :7724
        // 父親が助手 // :7725
      } else if (CFLAG:102 == 2) { // :7726
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`); // :7727
        await era.printAndWait(`「呜呜…这难道是…%CSTR:2%桑的………」`); // :7728
        await era.printAndWait(`${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`); // :7729
        // 父親が奴隷 // :7730
      } else if (CFLAG:102 == 3) { // :7731
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好地跟主人，解释一下才可以………」`); // :7732
        await era.printAndWait(`「呜呜…这难道是…%CSTR:2%桑的………」`); // :7733
        await era.printAndWait(`${target_name}貌似对腹里的孩子的父亲是谁有着线索的样子………`); // :7734
        // 父親が野良犬 // :7735
      } else if (CFLAG:102 == 5) { // :7736
        if (TALENT:136 == 1) { // :7737
          await era.printAndWait(`「居然怀上了可爱的狗宝宝种子真是幸福呢~♪」`); // :7738
        } else { // :7739
          await era.printAndWait(`「怎么会…${sc()}居然怀上了那个野狗的孩子…骗、骗人的………」`); // :7740
        } // :7741
        // 父親が狂王 // :7742
      } else if (CFLAG:102 == 7) { // :7743
        await era.printAndWait(`「${scf()}、${sc()}居然怀上了狂王的孩子…骗人…怎么会…」`); // :7744
        // その他 // :7745
      } else { // :7746
        await era.printAndWait(`「啊啊~…骗人…${scf()}、${sc()}…居然怀孕了什么的…要，要好好的跟主人…解释一下才可以了……」`); // :7747
        await era.printAndWait(`「但是…该怎么说才好啊…啊啊、啊啊………」`); // :7748
      } // :7749
      // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :7750
      era.set(`cflag:${target}:271`, 1); // :7750
    } // :7751
  } // :7752


  // ------------------------------------------------- // :7755
  // 出産 CFLAG:272 // :7756
  // CFLAG:102→誰によって妊娠させられたか（マスター = 1, 助手 = 2, 奴隷 = 3, 客 = 4, 犬 = 5, 怪物・触手 = 6） // :7757
  // ------------------------------------------------- // :7758
  if (TFLAG:13 == 12) { // :7759
    if (CFLAG:272 == 0) { // :7760
      // 崩坏している場合 // :7761
      if (TALENT:9 == 1) { // :7762
        await era.printAndWait(`「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈~啊哈~啊哈哈哈哈哈哈哈！」`); // :7763
        // 父親が主人で母親が愛持ち // :7764
      } else if (TALENT:85 && CFLAG:102 == 1) { // :7765
        await era.printAndWait(`「哈啊…哈啊…啊啊…果然…跟${sc()}想象一样的小宝宝…跟大人你一摸一样呢${heart(1)}」`); // :7766
        // 父親が助手 // :7767
      } else if (CFLAG:102 == 2) { // :7768
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7769
        // 父親が奴隷 // :7770
      } else if (CFLAG:102 == 3) { // :7771
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7772
        // 父親が野良犬 // :7773
      } else if (CFLAG:102 == 5) { // :7774
        if (TALENT:136 == 1) { // :7775
          await era.printAndWait(`「要、要生出来了、可爱的狗宝宝~♪」`); // :7776
        } else { // :7777
          await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7778
        } // :7779
        // 父親が狂王 // :7780
      } else if (CFLAG:102 == 7) { // :7781
        await era.printAndWait(`「要、要生出来了、狂王大人的孩子…但是…」`); // :7782
        // その他 // :7783
      } else { // :7784
        await era.printAndWait(`「呜…呜呜…${sc()}的小宝宝要………」`); // :7785
      } // :7786
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7787
      era.set(`cflag:${target}:272`, 1); // :7787
      // 2回目 // :7788
    } else { // :7789
      // 崩坏している場合 // :7790
      if (TALENT:9 == 1) { // :7791
        await era.printAndWait(`「嗯哈啊啊嗯…有什么要出来了…要出来了…啊哈~啊哈~啊哈哈哈哈哈哈哈！」`); // :7792
        // 父親が主人で母親が愛持ち // :7793
      } else if (TALENT:85 && CFLAG:102 == 1) { // :7794
        await era.printAndWait(`「哈啊…哈啊…啊啊…果然…跟${sc()}想象一样的小宝宝…跟大人你一摸一样呢${heart(1)}」`); // :7795
        // 父親が助手 // :7796
      } else if (CFLAG:102 == 2) { // :7797
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7798
        // 父親が奴隷 // :7799
      } else if (CFLAG:102 == 3) { // :7800
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7801
        // 父親が野良犬 // :7802
      } else if (CFLAG:102 == 5) { // :7803
        if (TALENT:136 == 1) { // :7804
          await era.printAndWait(`「要、要生出来了、可爱的狗宝宝~♪」`); // :7805
        } else { // :7806
          await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7807
        } // :7808
        // 父親が狂王 // :7809
      } else if (CFLAG:102 == 7) { // :7810
        await era.printAndWait(`「要、要生出来了、狂王大人的孩子…但是…」`); // :7811
        // その他 // :7812
      } else { // :7813
        await era.printAndWait(`「呜…呜呜~…${sc()}的小宝宝要………」`); // :7814
      } // :7815
      // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :7816
      era.set(`cflag:${target}:272`, 1); // :7816
    } // :7817
  } // :7818

  // ------------------------------------------------- // :7820
  // 育児室 CFLAG:273 // :7821
  // ------------------------------------------------- // :7822
  if (TFLAG:13 == 13) { // :7823
    // 陥落済 // :7824
    if (TALENT:85 || TALENT:76) { // :7825
      // 妊娠中 // :7826
      if (TALENT:153) { // :7827
        await era.printAndWait(`「还有一会就要生出来了、敬请期待吧~♪」`); // :7828
        await era.printAndWait(`${target_name}摸着迎接临盆的而变大的肚子………`); // :7829
        // 育児中 // :7830
      } else if (TALENT:154) { // :7831
        await era.printAndWait(`「啊啊、我可爱的小宝宝！真不想放手呢！」`); // :7832
        await era.printAndWait(`${target_name}抱着一个小孩子………`); // :7833
      } // :7834
    } // :7835
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :7836
    era.set(`cflag:${target}:273`, 1); // :7836
  } // :7837

  // ------------------------------------------------- // :7839
  // 親離れ時 CFLAG:274 // :7840
  // ------------------------------------------------- // :7841
  if (TFLAG:13 == 14) { // :7842
    // 陥落済 // :7843
    if (TALENT:85 || TALENT:76) { // :7844
      await era.printAndWait(`「（哭）…为什么，要从${sc()}的身边离开呢………」`); // :7845
    } // :7846
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :7847
    era.set(`cflag:${target}:274`, 1); // :7847
  } // :7848


  // ------------------------------------------------- // :7851
  // 死亡 // :7852
  // ------------------------------------------------- // :7853
  if (TFLAG:13 == 999) { // :7854
    // 爱慕 // :7855
    if (TALENT:85) { // :7856
      await era.printAndWait(''); // :7857
      // それ以外 // :7858
    } else { // :7859
      await era.printAndWait(''); // :7860
    } // :7861
  } // :7862

  // ------------------------------------------------- // :7864
  // 寿命による消滅 // :7865
  // ------------------------------------------------- // :7866
  if (TFLAG:13 == 998) { // :7867
    // 爱慕 // :7868
    if (TALENT:85) { // :7869
      await era.printAndWait(''); // :7870
      // それ以外 // :7871
    } else { // :7872
      await era.printAndWait(''); // :7873
    } // :7874
  } // :7875

  // -------------------------------------------------- // :7877
  // フラグ初期化 // :7878
  // -------------------------------------------------- // :7879
  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :7880
  era.set('tflag:13', 0); // :7880

  return 0; // :7882

  // ------------------------------------------------- // :7884
  // @単体エンディング関係(X1、X2をキャラ番号に置換する) // :7885
  // まだ未実装です // :7886
  // ------------------------------------------------- // :7887
  // @SINGLE_ENDING_K3 // :7888
  // DRAWLINE // :7889
  // PRINTFORMW ―――単体エンド条件達成――― // :7890
  // PRINTFORMW ………… // :7891
  // PRINTFORMW ……… // :7892
  // PRINTFORMW …… // :7893
  // PRINTFORMW // :7894


  // PRINTFORMW // :7897
  // PRINTFORMW 　　　　　　　　―― Ending No.1X2 (○○エンド) // :7898

  // CALL GAME_CONTINUE // :7900
  // RETURN 0 // :7901


  // ------------------------------------------------------------------------------------------------------------------------------ // :7904
  // ここからeramaou追加口上 // :7905
  // ------------------------------------------------------------------------------------------------------------------------------ // :7906
  // ------------------------------------------------------- // :7907

// @DUNGEON_RYOUZYOKU_K3 // :7908
function DUNGEON_RYOUZYOKU_K3() {
  // ------------------------------------------------------- // :7909
  // ダンジョンで陵辱される前の一言 // :7910


  if (TALENT:0 == 1) { // :7913
    // 处女 // :7914
    await era.printAndWait(`「${sc()}的第一次…骗人…骗人的…」`); // :7915

    if (TALENT:21 == 1 || TALENT:22 == 1) { // :7917

      // 無関心・感情乏しいなら何か言って終了 // :7919
      await era.printAndWait(`「全部…都结束了啊…」`); // :7920

      return 0; // :7922
    } else if (TALENT:17 ==1 || TALENT:31 == 1 || TALENT:36 == 1) { // :7923

      // 低姿态・看轻贞操・不知羞耻なら身体を売って命乞いをする // :7925
      await era.printAndWait(`「不管用${sc()}的哪个地方都没关系…只要留下小命的话......！」`); // :7926

      // A敏感もしくはA経験有りならならアナルを使うことを提案する // :7928
      if (TALENT:106 == 1 || EXP:1 > 0) { // :7930
        await era.printAndWait(`「哈啊…比起前面来说屁股会更加舒服的、就这样好吧！」`); // :7930
      } // :7930

      // フェラ経験有りならなら口での奉仕をアピールする // :7932
      if (EXP:22 > 0) { // :7934
        await era.printAndWait(`「会用嘴巴来做的…请饶过…${sc()}的小命......！」`); // :7934
      } // :7934

    } else if (TALENT:11 == 1 || TALENT:12 == 1 || TALENT:15 == 1 || TALENT:30 == 1 || TALENT:34 == 1) { // :7936

      // 反抗心・刚强・高姿态・看重贞操・抵抗なら // :7938
      // チ○ポになんか絶対負けない！系の精神的抵抗をする // :7939
      await era.printAndWait(`「…嘛、只是一张膜女人的价值才不会改变呢！」`); // :7940

    } else if (TALENT:10 == 1 || TALENT:26 == 1) { // :7942

      // 胆怯・悲观的なら自分の運命に絶望する // :7944
      await era.printAndWait(`「若是知道如此的话…早就应该将处女丢掉才对啊…」`); // :7945

    } else { // :7947

      // その他何か適当に性格によって // :7949
      await era.printAndWait(`「以为${scf()}、${sc()}是谁啊！？」`); // :7950

    } // :7952
  } else { // :7953
    // 非处女 // :7954
    await era.printAndWait(`「不要、不要啊！　${sc()}对这种事情…」`); // :7955

    if (TALENT:21 == 1 || TALENT:22 == 1) { // :7957

      // 冷漠・感情淡薄なら何か言って終了 // :7959
      await era.printAndWait(`「这是一场梦来的…」`); // :7960

      return 0; // :7962
    } else if (TALENT:17 ==1 || TALENT:31 == 1 || TALENT:36 == 1) { // :7963

      // 低姿态・看轻贞操・不知羞耻なら身体を売って命乞いをする // :7965
      await era.printAndWait(`「只要是${sc()}的身体不管怎样都没关系…只要留下小命的话......！」`); // :7966

      // A敏感もしくはA経験有りならならアナルを使うことを提案する // :7968
      if (TALENT:106 == 1 || EXP:1 > 0) { // :7970
        await era.printAndWait(`「${sc()}…屁股的那边也可以的噢、会满足你们的…」`); // :7970
      } // :7970

      // フェラ経験有りならなら口での奉仕をアピールする // :7972
      if (EXP:22 > 0) { // :7974
        await era.printAndWait(`「用嘴巴的多少都会做的！　请饶过…${sc()}的小命！」`); // :7974
      } // :7974

    } else if (TALENT:11 == 1 || TALENT:12 == 1 || TALENT:15 == 1 || TALENT:30 == 1 || TALENT:34 == 1) { // :7976

      // 反抗心・刚强・高姿态・看重贞操・抵抗なら // :7978
      // チ○ポになんか絶対負けない！系の精神的抵抗をする // :7979
      await era.printAndWait(`「真是不巧呢、处女什么的早就丢掉了、真、真是残念呢！」`); // :7980

    } else if (TALENT:10 == 1 || TALENT:26 == 1) { // :7982

      // 臆病・悲観的なら自分の運命に絶望する // :7984
      await era.printAndWait(`「不要啊！　杀......杀掉${sc()}吧！」`); // :7985

    } else { // :7987

      // その他何か適当に性格によって // :7989
      await era.printAndWait(`「居然${sc()}受到这种屈辱…绝对不会原谅的！」`); // :7990

    } // :7992
  } // :7993

  return 0; // :7995

  // ------------------------------------------------------- // :7997

// @DUNGEON_RYOUZYOKU_AFTER_K3 // :7998
function DUNGEON_RYOUZYOKU_AFTER_K3() {
  // ------------------------------------------------------- // :7999
  // ダンジョンで陵辱された後の一言 // :8000


  if (TALENT:0 == 1) { // :8003
    // 处女 // :8004
    await era.printAndWait(`「太好了…还是…没问题的…」`); // :8005

    if (TALENT:21 == 1 || TALENT:22 == 1) { // :8007

      // 冷漠・感情淡薄なら何か言って終了 // :8009
      await era.printAndWait(`「只要我还活着就…」`); // :8010

      return 0; // :8012
    } // :8013

    // アナルを弄られすぎた感想 // :8015
    if (EXP:1 > 20) { // :8016
      await era.printAndWait(`「屁股…已经…不行…」`); // :8017
      await era.printAndWait(`「咕呜…呜哎哎~~」`); // :8018
    } // :8019

    // フェラしすぎた感想 // :8021
    if (EXP:22 > 20) { // :8023
      await era.printAndWait(`「…已经不知道吃了多少根…呜哎哎~~」`); // :8023
    } // :8023

    // 精液の味 // :8025
    if (EXP:20 > 20) { // :8027
      await era.printAndWait(`「这么…残酷的事情…」`); // :8027
    } // :8027
  } else { // :8028
    // 非处女 // :8029
    await era.printAndWait(`「结束了吗…？」`); // :8030

    if (TALENT:21 == 1 || TALENT:22 == 1) { // :8032

      // 冷漠・感情淡薄なら何か言って終了 // :8034
      await era.printAndWait(`（已经…不想再思考了…）`); // :8035

      return 0; // :8037
    } // :8038

    // 膣を苛められすぎた感想 // :8040
    if (EXP:0 > 20) { // :8041
      await era.printAndWait(`「这样的事情做得再多…也没有用的…」`); // :8042
      await era.printAndWait(`「这种…这种事情…」`); // :8043
    } // :8044

    // アナルを弄られすぎた感想 // :8046
    if (EXP:1 > 20) { // :8047
      await era.printAndWait(`「屁股要…好痛苦…」`); // :8048
      await era.printAndWait(`「请停下…」`); // :8049
    } // :8050

    // フェラしすぎた感想 // :8052
    if (EXP:22 > 20) { // :8054
      await era.printAndWait(`「喔哎哎~…居然要舔那种东西…」`); // :8054
    } // :8054

    // 精液の味 // :8056
    if (EXP:20 > 20) { // :8058
      await era.printAndWait(`「不要…再将我…弄脏了…」`); // :8058
    } // :8058
  } // :8059

  // ----------------------------------- // :8061

// @BENKI_KOUJO_K3 // :8062
function BENKI_KOUJO_K3() {
  // ----------------------------------- // :8063
  // 肉便器口上。キャラはA // :8064
  // FLAG:62を使用。行動の詳細はBENKI.ERBで // :8065
  // FLAG:62 = 0 最下層モンスター奉仕 // :8066
  // FLAG:62 = 1 レズ便器 // :8067
  // FLAG:62 = 2 獣姦便器 // :8068
  // FLAG:62 = 3 両穴便器 // :8069
  // FLAG:62 = 4 膣便器 // :8070
  // FLAG:62 = 5 アナル便器 // :8071
  // FLAG:62 =  6 フェラ便器 // :8072

  // FLAG:62 =  7 獣姦配信 // :8074
  // FLAG:62 =  8 娼婦購入配信 // :8075
  // FLAG:62 =  9 野外露出配信 // :8076
  // FLAG:62 = 10 公衆便所配信 // :8077
  // FLAG:62 = 11 アナル拡張配信 // :8078
  // FLAG:62 = 12 自慰配信 // :8079

  if (FLAG:62 == 0) { // :8081
    // 最下層民凌辱 // :8082
    // 常識改変 // :8083
    if (FLAG:63 == 1) { // :8084
      await era.printAndWait(`「呵呵…别那么吃惊嘛这没什么的哦♪」`); // :8085
      await era.printAndWait(`「『就算对象是污秽的贱民也会做最高级的侍奉』…在%SELF_CALL(A)%家里可是『当然』的啊」`); // :8086
      await era.printAndWait(`「来、向%SELF_CALL(A)%掏出那丑陋脏污的鸡巴吧♪好啦、快点嘛${heart(1)}」`); // :8087
      // 淫乱 // :8088
    } else if (TALENT:A:76 == 1) { // :8089
      await era.printAndWait(''); // :8090
      // 愛 // :8091
    } else if (TALENT:A:85) { // :8092
      await era.printAndWait(''); // :8093
      // 奉仕精神Lv5以上 // :8094
    } else if (ABL:A:16 >= 5) { // :8095
      await era.printAndWait(''); // :8096
      // それ以外 // :8097
    } else { // :8098
      await era.printAndWait(''); // :8099
    } // :8100
  } else if (FLAG:62 == 1) { // :8101
    // レズ便器 // :8102
    // 常識改変 // :8103
    if (FLAG:63 == 1) { // :8104
      await era.printAndWait(`「被魔王大人催眠了…？才不是、这是%SELF_CALL(A)%『自愿』的」`); // :8105
      await era.printAndWait(`「居然『可以成为向往的百合便器』什么的…%SELF_CALL(A)%真是太『幸福』了啊♪」`); // :8106
      await era.printAndWait(`「啊…果然比起鸡巴还是跟女孩子做爱最棒了啊${heart(1)}」`); // :8107
      // 淫乱 // :8108
    } else if (TALENT:A:76 == 1) { // :8109
      await era.printAndWait(''); // :8110
      // 愛 // :8111
    } else if (TALENT:A:85) { // :8112
      await era.printAndWait(''); // :8113
      // 奉仕精神Lv5以上 // :8114
    } else if (ABL:A:16 >= 5) { // :8115
      await era.printAndWait(''); // :8116
      // それ以外 // :8117
    } else { // :8118
      await era.printAndWait(''); // :8119
    } // :8120
  } else if (FLAG:62 == 2) { // :8121
    // 獣姦 // :8122
    // 常識改変 // :8123
    if (FLAG:63 == 1) { // :8124
      await era.printAndWait(`「『低贱母兽』%SELF_CALL(A)%的身体、『要让野兽享用才能发挥真正的价值』…」`); // :8125
      await era.printAndWait(`「这对肉便器%SELF_CALL(A)%来说是『当然』的…更何况这可是最『幸福』${heart(1)}」`); // :8126
      await era.printAndWait(`「竟然知道%SELF_CALL(A)%喜欢『被野兽阴茎用后背位狂艹』…魔王大人还真是懂行啊♪」`); // :8127
      // 淫乱 // :8128
    } else if (TALENT:A:76 == 1) { // :8129
      await era.printAndWait(''); // :8130
      // 愛 // :8131
    } else if (TALENT:A:85) { // :8132
      await era.printAndWait(''); // :8133
      // 奉仕精神Lv5以上 // :8134
    } else if (ABL:A:16 >= 5) { // :8135
      await era.printAndWait(''); // :8136
      // それ以外 // :8137
    } else { // :8138
      await era.printAndWait(''); // :8139
    } // :8140
  } else if (FLAG:62 == 3) { // :8141
    // A+Vプレイ // :8142
    // 常識改変 // :8143
    if (FLAG:63 == 1) { // :8144
      await era.printAndWait(`「常识改变？…在说什么啊…随意使用肉便器%SELF_CALL(A)%的身体不是『理所当然』的吗…」`); // :8145
      await era.printAndWait(`「因为%SELF_CALL(A)%的身体、可是有很多人用的重要的『共有物』啊♪肉穴还是菊穴都请尽情使用吧♪」`); // :8146
      await era.printAndWait(`「啊…能被那么多的人光顾、%SELF_CALL(A)%真是『非常高兴』啊${heart(1)}」`); // :8147
      // 淫乱 // :8148
    } else if (TALENT:A:76 == 1) { // :8149
      await era.printAndWait(''); // :8150
      // 愛 // :8151
    } else if (TALENT:A:85) { // :8152
      await era.printAndWait(''); // :8153
      // 奉仕精神Lv5以上 // :8154
    } else if (ABL:A:16 >= 5) { // :8155
      await era.printAndWait(''); // :8156
      // それ以外 // :8157
    } else { // :8158
      await era.printAndWait(''); // :8159
    } // :8160
  } else if (FLAG:62 == 4) { // :8161
    // Vプレイ // :8162
    // 常識改変 // :8163
    if (FLAG:63 == 1) { // :8164
      await era.printAndWait(`「%SELF_CALL(A)%的身体、特别是肉穴可是有很多人用的重要的『共有物』啊…请尽情使用吧${heart(1)}」`); // :8165
      await era.printAndWait(`「诶？常识改变？…在说什么啊…%SELF_CALL(A)%可『没有被魔王大人催眠』哟？」`); // :8166
      await era.printAndWait(`「今天也能被那么多的人光顾、%SELF_CALL(A)%真是『非常高兴』啊${heart(1)}」`); // :8167
      // 淫乱 // :8168
    } else if (TALENT:A:76 == 1) { // :8169
      await era.printAndWait(''); // :8170
      // 愛 // :8171
    } else if (TALENT:A:85) { // :8172
      await era.printAndWait(''); // :8173
      // 奉仕精神Lv5以上 // :8174
    } else if (ABL:A:16 >= 5) { // :8175
      await era.printAndWait(''); // :8176
      // それ以外 // :8177
    } else { // :8178
      await era.printAndWait(''); // :8179
    } // :8180
  } else if (FLAG:62 == 5) { // :8181
    // Aプレイ // :8182
    // 常識改変 // :8183
    if (FLAG:63 == 1) { // :8184
      await era.printAndWait(`「%SELF_CALL(A)%的身体、特别是菊穴可是有很多人用的重要的『共有物』啊…请尽情使用吧${heart(1)}」`); // :8185
      await era.printAndWait(`「诶？常识改变？…在说什么啊…%SELF_CALL(A)%可『没有被魔王大人催眠』哟？」`); // :8186
      await era.printAndWait(`「今天也能被那么多的人光顾、%SELF_CALL(A)%真是『非常高兴』啊${heart(1)}」`); // :8187
      // 淫乱 // :8188
    } else if (TALENT:A:76 == 1) { // :8189
      await era.printAndWait(''); // :8190
      // 愛 // :8191
    } else if (TALENT:A:85) { // :8192
      await era.printAndWait(''); // :8193
      // 奉仕精神Lv5以上 // :8194
    } else if (ABL:A:16 >= 5) { // :8195
      await era.printAndWait(''); // :8196
      // それ以外 // :8197
    } else { // :8198
      await era.printAndWait(''); // :8199
    } // :8200
  } else if (FLAG:62 == 6) { // :8201
    // フェラプレイ // :8202
    // 常識改変 // :8203
    if (FLAG:63 == 1) { // :8204
      await era.print(`「请`); // :8205
      // CALL BENKI_PLAYER_NAME // :8206
      await era.printAndWait(`大人的大鸡巴、用%SELF_CALL(A)%的嘴巴肉穴做做『施舍』吧${heart(1)}」`); // :8207
      await era.printAndWait(`「常识改变？…说的什么啊…%SELF_CALL(A)%可是『出名的见到大鸡巴就想吸一口』哦？」`); // :8208
      await era.printAndWait(`「这是只有变成了肉便器的%SELF_CALL(A)%才做得来的、更何况这是最符合%SELF_CALL(A)%的『工作』啊♪」`); // :8209
      // 淫乱 // :8210
    } else if (TALENT:A:76 == 1) { // :8211
      await era.printAndWait(''); // :8212
      // 愛 // :8213
    } else if (TALENT:A:85) { // :8214
      await era.printAndWait(''); // :8215
      // 奉仕精神Lv5以上 // :8216
    } else if (ABL:A:16 >= 5) { // :8217
      await era.printAndWait(''); // :8218
      // それ以外 // :8219
    } else { // :8220
      await era.printAndWait(''); // :8221
    } // :8222
  } else if (FLAG:62 == 7) { // :8223
    // 獣姦配信 // :8224
    // 常識改変 // :8225
    if (FLAG:63 == 1) { // :8226
      await era.printAndWait(`「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`); // :8227
      await era.printAndWait(`「%SELF_CALL(A)%完全败给了伟大的魔王大人、身心都被进行了淫乱的调教…」`); // :8228
      await era.printAndWait(`「就在不久前、终于成了贪恋野兽阴茎的肉便器啦${heart(1)}」`); // :8229
      await era.printAndWait(`「%SELF_CALL(A)%的人生已经混乱不堪了…就在这一直和野兽交合来抚慰下吧${heart(1)}」`); // :8230
      // 淫乱 // :8231
    } else if (TALENT:A:76 == 1) { // :8232
      await era.printAndWait(''); // :8233
      // 愛 // :8234
    } else if (TALENT:A:85) { // :8235
      await era.printAndWait(''); // :8236
      // 奉仕精神Lv5以上 // :8237
    } else if (ABL:A:16 >= 5) { // :8238
      await era.printAndWait(''); // :8239
      // それ以外 // :8240
    } else { // :8241
      await era.printAndWait(''); // :8242
    } // :8243
  } else if (FLAG:62 == 9) { // :8244
    // 野外露出配信 // :8245
    // 常識改変 // :8246
    if (FLAG:63 == 1) { // :8247
      await era.printAndWait(`「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`); // :8248
      await era.printAndWait(`「%SELF_CALL(A)%完全败给了伟大的魔王大人、被洗脑成了肉便器…」`); // :8249
      await era.printAndWait(`「就在前不久、终于成了热衷于在野外赤身裸体的露出狂啦${heart(1)}」`); // :8250
      await era.printAndWait(`「%SELF_CALL(A)%的人生虽然已经混乱不堪了…但今后会一直赤身裸体的所以一点问题也没有咯${heart(1)}」`); // :8251
      // 淫乱 // :8252
    } else if (TALENT:A:76 == 1) { // :8253
      await era.printAndWait(''); // :8254
      // 愛 // :8255
    } else if (TALENT:A:85) { // :8256
      await era.printAndWait(''); // :8257
      // 奉仕精神Lv5以上 // :8258
    } else if (ABL:A:16 >= 5) { // :8259
      await era.printAndWait(''); // :8260
      // それ以外 // :8261
    } else { // :8262
      await era.printAndWait(''); // :8263
    } // :8264
  } else if (FLAG:62 == 12) { // :8265
    // 自慰配信 // :8266
    // 常識改変 // :8267
    if (FLAG:63 == 1) { // :8268
      await era.printAndWait(`「观看这个水晶球的各位…名门之后、${target_name}已经不再是勇者了…」`); // :8269
      await era.printAndWait(`「%SELF_CALL(A)%完全败给了伟大的魔王大人、被彻头彻尾地开发了身体…」`); // :8270
      await era.printAndWait(`「现在不过是只知道自慰的、变态自慰狂罢了${heart(1)}」`); // :8271
      await era.printAndWait(`「各位请多看看吧、看看这正兴奋不已地自慰着的卑微的%SELF_CALL(A)%吧${heart(1)}」`); // :8272
      // 淫乱 // :8273
    } else if (TALENT:A:76 == 1) { // :8274
      await era.printAndWait(''); // :8275
      // 愛 // :8276
    } else if (TALENT:A:85) { // :8277
      await era.printAndWait(''); // :8278
      // 奉仕精神Lv5以上 // :8279
    } else if (ABL:A:16 >= 5) { // :8280
      await era.printAndWait(''); // :8281
      // それ以外 // :8282
    } else { // :8283
      await era.printAndWait(''); // :8284
    } // :8285
  } // :8286

  return 0; // :8288

  // ----------------------------------- // :8290

// @DUNGEON_VICTORY_K3 // :8291
function DUNGEON_VICTORY_K3() {
  // ----------------------------------- // :8292
  // 戦闘勝利時 // :8293

  // 決め台詞 // :8295
  await era.printAndWait(`「呵呵～赢啦！♪」`); // :8296

  if (TALENT:21 == 1 || TALENT:22 == 1) { // :8298

    // 冷漠・感情淡薄なら何か言って終了 // :8300
    await era.printAndWait(`「……」`); // :8301

    return 0; // :8303
  } else if (TALENT:11 == 1 || TALENT:12 == 1 || TALENT:15 == 1 || TALENT:30 == 1 || TALENT:34 == 1) { // :8304

    // 反抗心・刚强・高姿态・看重贞操・抵抗なら勝利宣言 // :8306
    if (RAND:3 == 0) { // :8307
      await era.printAndWait(`「真是对不起了~♪」`); // :8308
    } else if (RAND:2 == 0) { // :8309
      await era.printAndWait(`「真是不像样……」`); // :8310
    } else { // :8311
      await era.printAndWait(`「完全没有可能会输嘛！」`); // :8312
    } // :8313

  } else if (TALENT:10 == 1 || TALENT:26 == 1) { // :8315

    // 胆怯・悲观的なら命からがら的な弱気セリフで終了 // :8317
    await era.printAndWait(`「该怎么说好呢……」`); // :8318

    return 0; // :8320
  } else { // :8321

    // その他何か適当に性格によって // :8323
    if (RAND:3 == 0) { // :8324
      await era.printAndWait(`「真是肮脏…！」`); // :8325
    } else if (RAND:2 == 0) { // :8326
      await era.printAndWait(`「看到了吗！」`); // :8327
    } else { // :8328
      await era.printAndWait(`「也就只是这种东西而已嘛♪」`); // :8329
    } // :8330

  } // :8332

  if ((BASE:A:0 * 100 / MAXBASE:A:0 < 50) || (BASE:A:1 * 100 / MAXBASE:A:1 < 50)) { // :8334
    // ピンチかも // :8335
    await era.printAndWait(`（但是…差点......？！？）`); // :8336
  } else { // :8337
    // 余裕余裕 // :8338
    await era.printAndWait(`「祝你愉快~♪」`); // :8339
  } // :8340

  return 0; // :8342

  // ----------------------------------- // :8344

// @DUNGEON_ATTACK_K3 // :8345
function DUNGEON_ATTACK_K3() {
  // ----------------------------------- // :8346
  // 攻撃時のセリフ // :8347

  // 最初に一言 // :8349
  if (CFLAG:1 == 2) { // :8350
    // 侵攻中 // :8351
    if (TALENT:21 == 1 || TALENT:22 == 1) { // :8352

      // 冷漠・感情淡薄なら何か言って終了 // :8354
      await era.printAndWait(`「……」`); // :8355

      return 0; // :8357
    } else if (TALENT:11 == 1 || TALENT:12 == 1 || TALENT:15 == 1 || TALENT:30 == 1 || TALENT:34 == 1) { // :8358

      // 反抗心・刚强・高姿态・看重贞操・抵抗なら威勢のいいセリフ // :8360
      if (TALENT:278) { // :8361
        // 光の能力者 // :8362
        await era.printAndWait(`「就让${sc()}的光来抹杀你吧！」`); // :8363
      } else if (RAND:3 == 0) { // :8364
        await era.printAndWait(`「才不会输的!！」`); // :8365
      } else if (RAND:2 == 0) { // :8366
        await era.printAndWait(`「区区你这样的家伙！」`); // :8367
      } else { // :8368
        await era.printAndWait(`「${sc()}的力量……好好地见识一下吧！」`); // :8369
      } // :8370

    } else if (TALENT:10 == 1 || TALENT:26 == 1) { // :8372

      // 胆怯・悲观的なら命からがら的な弱気セリフ // :8374
      if (TALENT:256) { // :8375
        // 虚弱 // :8376
        await era.printAndWait(`「咳呜咳呜……偏偏这种时候……」`); // :8377
      } else { // :8378
        await era.printAndWait(`「呜啊、还、还不想死啊……」`); // :8379
      } // :8380

      return 0; // :8382
    } else { // :8383

      // その他何か適当に性格によって // :8385
      if (TALENT:258) { // :8386
        // 俊足 // :8387
        await era.printAndWait(`「跟得上${sc()}的速度吗？」`); // :8388
      } else if (RAND:3 == 0) { // :8389
        await era.printAndWait(`「会加油的！」`); // :8390
      } else if (RAND:2 == 0) { // :8391
        await era.printAndWait(`「到${sc()}的回合了！」`); // :8392
      } else { // :8393
        await era.printAndWait(`「才不会输呢！」`); // :8394
      } // :8395

    } // :8397
  } else { // :8398
    // その他・迎撃中 // :8399
    if (TALENT:21 == 1 || TALENT:22 == 1) { // :8400

      // 冷漠・感情淡薄なら何か言って終了 // :8402
      await era.printAndWait(`「……」`); // :8403

      return 0; // :8405
    } else if (TALENT:11 == 1 || TALENT:12 == 1 || TALENT:15 == 1 || TALENT:30 == 1 || TALENT:34 == 1) { // :8406

      // 反抗心・刚强・高姿态・看重贞操・抵抗なら威勢のいいセリフ // :8408
      if (RAND:3 == 0) { // :8409
        await era.printAndWait(`「向魔王大人屈服吧！」`); // :8410
      } else if (RAND:2 == 0) { // :8411
        await era.printAndWait(`「不要再做无用的抵抗了！」`); // :8412
      } else { // :8413
        await era.printAndWait(`「${sc()}新的力量……好好地见识一下吧！」`); // :8414
      } // :8415

    } else if (TALENT:10 == 1 || TALENT:26 == 1) { // :8417

      // 胆怯・悲观的なら命からがら的な弱気セリフ // :8419
      await era.printAndWait(`「神圣的力量……呜呜」`); // :8420

      return 0; // :8422
    } else { // :8423

      // その他何か適当に性格によって // :8425
      if (RAND:3 == 0) { // :8426
        await era.printAndWait(`「你也总有一天会明白的」`); // :8427
      } else if (RAND:2 == 0) { // :8428
        await era.printAndWait(`「美妙的力量啊……」`); // :8429
      } else { // :8430
        await era.printAndWait(`「啊啊……这涌上来的力量……！」`); // :8431
      } // :8432

    } // :8434
  } // :8435



  return 0; // :8439

  // ------------------------------------------------- // :8441
  // @COLOSSEUM_KOJO関係（X1をキャラ番号に置換） // :8442
  // 死斗场用口上を独立させました // :8443
  // ------------------------------------------------- // :8444

// @COLOSSEUM_KOJO_3 // :8445
function COLOSSEUM_KOJO_3() {
  // ------------------------------------------------- // :8446
  // 放置PLAY CFLAG: // :8447
  // ------------------------------------------------- // :8448
  if (SELECTCOM == 55) { // :8449
    // 気力０以下 // :8450
    if (BASE:1 <= 0) { // :8451
      await era.printAndWait(`${target_name}连站起来的力气都没有的样子……`); // :8452
    } else { // :8453
      await era.printAndWait(`${target_name}被角斗场的热气和被接下来要战斗的对手凝视着而吓得直发抖……`); // :8454
    } // :8455
    return 0; // :8456
  } // :8457
  // ------------------------------------------------- // :8458
  // 交谈 CFLAG: // :8459
  // ------------------------------------------------- // :8460
  if (SELECTCOM == 56) { // :8461
    // 気力０以下 // :8462
    if (BASE:1 <= 0) { // :8463
      // 助手が調教中の場合 // :8464
      if (ASSI > 0 && ASSIPLAY) { // :8465
        await era.printAndWait(`「请，请不要继续下去了……」`); // :8466
        await era.printAndWait(`气力用尽了的${target_name}在角斗场的土地之上喘气已经是极限了的样子……`); // :8467
      } else { // :8468
        await era.printAndWait(`「不…不要啊……被那么侵犯了什么的…不要啊……」`); // :8469
        await era.printAndWait(`气力用尽了的${target_name}在角斗场的土地之上喘气已经是极限了的样子……`); // :8470
      } // :8471
    } else { // :8472
      // 助手が調教中の場合 // :8473
      if (ASSI > 0 && ASSIPLAY) { // :8474
        await era.printAndWait(`「跟${assi_name}做对手什么的…根本不知道啊……」`); // :8475
        await era.printAndWait(`${target_name}看着收到${master_name}的指令而武装起来的${assi_name}留下了冷汗……`); // :8476
      } else { // :8477
        await era.printAndWait(`「居，居然会有这么丑陋的生物存在什么的……！」`); // :8478
        await era.printAndWait(`${target_name}看到了在角斗场上丑陋的生物感到了恐惧……`); // :8479
      } // :8480
    } // :8481
    return 0; // :8482
  } // :8483

  // ------------------------------------------------- // :8485
  // 口交 CFLAG: // :8486
  // ------------------------------------------------- // :8487
  if (SELECTCOM == 31) { // :8488
    // 助手が調教中の場合 // :8489
    if (ASSI > 0 && ASSIPLAY) { // :8490
      await era.printAndWait(`「啊哼嗯…嗯呜…再、再这样做的话…呜噗嗯！？嗯噗嗯嗯噗嗯……！」`); // :8491
      await era.print(`${assi_name}用`); // :8492
      if (TALENT:ASSI:121 == 1 || TALENT:ASSI:122 == 1) { // :8494
        await era.print(`大鸡巴`); // :8494
      } // :8494
      if (TALENT:ASSI:121 != 1 && TALENT:ASSI:122 != 1 && ITEM:PBAND == 1) { // :8496
        await era.print(`假阳具`); // :8496
      } // :8496
      await era.printAndWait(`让${target_name}吸着，露出了愉悦的表情……`); // :8497
    } else { // :8498
      await era.printAndWait(`「啊啊…这，这么臭的东西…嗯呜…嗯噗…嗯啾…噗噜呸……」`); // :8499
      await era.printAndWait(`${target_name}舔舐着闻着就让人想吐的味道的阴茎……`); // :8500
    } // :8501
    return 0; // :8502
  } // :8503
  // ------------------------------------------------- // :8504
  // 胸爱撫 CFLAG: // :8505
  // ------------------------------------------------- // :8506
  if (SELECTCOM == 5) { // :8507
    // 助手が調教中の場合 // :8508
    if (ASSI > 0 && ASSIPLAY) { // :8509
      await era.printAndWait(`「哈呜~…呜…哪，哪怕被做这样的事情${sc()}也…啊呜~！」`); // :8510
      await era.printAndWait(`${target_name}的胸部，被持续地揉着……`); // :8511
    } else { // :8512
      await era.printAndWait(`「快…快放开手！${sc()}才不会因为这种事情…呜呼嗯！！」`); // :8513
      await era.printAndWait(`${target_name}因为胸部被大力地揉着而从嘴边漏出了痛苦的声音……`); // :8514
    } // :8515
    return 0; // :8516
  } // :8517
  // ------------------------------------------------- // :8518
  // 背后位 CFLAG: // :8519
  // ------------------------------------------------- // :8520
  if (SELECTCOM == 21) { // :8521
    // 助手が調教中の場合 // :8522
    if (ASSI > 0 && ASSIPLAY) { // :8523
      await era.printAndWait(`「啊啊~！不，不行的啊…这样…强行做这样的…啊啊啊啊！」`); // :8524
      await era.print(`${assi_name}一边听着悲鸣一边用`); // :8525
      if (TALENT:ASSI:121 == 1 || TALENT:ASSI:122 == 1) { // :8527
        await era.print(`大鸡巴`); // :8527
      } // :8527
      if (TALENT:ASSI:121 != 1 && TALENT:ASSI:122 != 1 && ITEM:PBAND == 1) { // :8529
        await era.print(`假阳具`); // :8529
      } // :8529
      await era.printAndWait(`将${target_name}的小穴毫不留情地侵犯着……`); // :8530
      // トロル // :8531
    } else if (TFLAG:400 == 206) { // :8532
      await era.printAndWait(`「噶啊…呃哈啊…呃啊啊…呜啊啊啊……」`); // :8533
      await era.printAndWait(`可怜的${target_name}发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……`); // :8534
    } else { // :8535
      await era.printAndWait(`「不…不要啊…这样的…${scf()}、${sc()}的…啊啊！」`); // :8536
      await era.printAndWait(`${target_name}继续被怪物侵犯着……`); // :8537
    } // :8538
    return 0; // :8539
  } // :8540

  // ------------------------------------------------- // :8542
  // 背后位アナル CFLAG: // :8543
  // ------------------------------------------------- // :8544
  if (SELECTCOM == 27) { // :8545
    // 助手が調教中の場合 // :8546
    if (ASSI > 0 && ASSIPLAY) { // :8547
      await era.printAndWait(`「啊啊~！啊~啊啊~！屁股…要坏掉了啊~…~！」`); // :8548
      await era.print(`${assi_name}一边听着悲鸣一边用`); // :8549
      if (TALENT:ASSI:121 == 1 || TALENT:ASSI:122 == 1) { // :8551
        await era.print(`大鸡巴`); // :8551
      } // :8551
      if (TALENT:ASSI:121 != 1 && TALENT:ASSI:122 != 1 && ITEM:PBAND == 1) { // :8553
        await era.print(`假阳具`); // :8553
      } // :8553
      await era.printAndWait(`将${target_name}的肛穴毫不留情地侵犯着……`); // :8554
      // 巨魔 // :8555
    } else if (TFLAG:400 == 206) { // :8556
      await era.printAndWait(`「呃啊…呃哈啊…呜呃…呜呃呃呃……」`); // :8557
      await era.printAndWait(`可怜的${target_name}发出了如同蟾蜍被碾碎了一样的声音，继续被巨魔侵犯着……`); // :8558
    } else { // :8559
      await era.printAndWait(`「不…不要啊…这样的…${scf()}、${sc()}的…啊啊！的肛门啊啊啊！」`); // :8560
      await era.printAndWait(`${target_name}继续被怪物侵犯着肛门……`); // :8561
    } // :8562
    return 0; // :8563
  } // :8564

  // ------------------------------------------------- // :8566
  // 媚药史莱姆（しあわせ草） // :8567
  // ------------------------------------------------- // :8568
  if (SELECTCOM == 51) { // :8569
    await era.printAndWait(`「这种…区区媚薬而已……啊呜嗯！」`); // :8570
    return 0; // :8571
  } // :8572


  return 0; // :8575


  // ----------------------------------- // :8578

// @NTR_KOUJO_K3 // :8579
function NTR_KOUJO_K3() {
  // ----------------------------------- // :8580
  // NTRフラグ // :8581
  if (CFLAG:650 == 0) { // :8583
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :8583
    era.set(`cflag:${target}:650`, 1); // :8583
  } // :8583

  // 处女喪失 // :8585
  if (P == 1) { // :8586
    // 陥落済 // :8587
    if (TALENT:76 || TALENT:85) { // :8588
      await era.printAndWait(`「啊啊…对不起…对不起…魔王大人啊……」`); // :8589
      await era.printAndWait(`${target_name}流着眼泪对无法将纯洁献给${master_name}的事情不停地道歉………`); // :8590
    } else { // :8591
      await era.printAndWait(`「快，快停下来…不、不要继续下去了…啊啊啊…不要啊啊啊！」`); // :8592
    } // :8593
    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :8594
    era.set(`cflag:${target}:651`, 1); // :8594
    // 处女アナルプレイ // :8595
  } else if (P == 2) { // :8596
    if (TALENT:76 || TALENT:85) { // :8597
      await era.printAndWait(`「啊啊~~…肛门…有感觉了…明明不可以的…啊…啊啊~…嗯~！」`); // :8598
    } else { // :8599
      await era.printAndWait(`「狂王大人…玩笑…过分了…哇…啊啊啊啊！」`); // :8600
    } // :8601
    // CFLAG:652  = 1（变量语义：CFLAG 族，652） // :8602
    era.set(`cflag:${target}:652`, 1); // :8602
    // 兽奸ショー // :8603
  } else if (P == 3) { // :8604
    if (TALENT:136) { // :8605
      await era.printAndWait(`「啊啊~~♪…请继续看着被狗侵犯还会有感觉的${sc()}吧~~${heart(1)}」`); // :8606
    } else if (TALENT:76 || TALENT:85) { // :8607
      await era.printAndWait(`「啊啊…居然被这样对待…魔王大人…救…命………」`); // :8608
    } else { // :8609
      await era.printAndWait(`「不要看呀…不要看呀…哈啊哈啊哈啊嗯！腰…不要这样动啊…啊嗯啊啊啊~！」`); // :8610
    } // :8611
    // CFLAG:653  = 1（变量语义：CFLAG 族，653） // :8612
    era.set(`cflag:${target}:653`, 1); // :8612
    // Vプレイ // :8613
  } else if (P == 4) { // :8614
    if (TALENT:76 || TALENT:85) { // :8615
      await era.printAndWait(`「啊~…哈~…啊嗯啊~…被狂王大人侵犯什么的…十分舒服的说~…${heart(1)}」`); // :8616
    } else { // :8617
      await era.printAndWait(`「狂王大人~…更加…请更多侵犯${sc()}吧…请更加侵犯${sc()}吧~~~~……♪」`); // :8618
    } // :8619
    // CFLAG:654  = 1（变量语义：CFLAG 族，654） // :8620
    era.set(`cflag:${target}:654`, 1); // :8620
    // VA乱交プレイ // :8621
  } else if (P == 5) { // :8622
    if (TALENT:76 || TALENT:85) { // :8623
      await era.printAndWait(`「大家~~~…请更多…请更多地侵犯${sc()}吧…不管是肛穴还是小穴都想要被大家侵犯呢${heart(1)}」`); // :8624
    } else { // :8625
      await era.printAndWait(`「啊啊~…这样…这样淫乱的…啊哈嗯呜~~~！肛门…肛门是不行的呀~…♪」`); // :8626
    } // :8627
    // CFLAG:655  = 1（变量语义：CFLAG 族，655） // :8628
    era.set(`cflag:${target}:655`, 1); // :8628
    // 公衆便女 // :8629
  } else if (P == 6) { // :8630
    if (TALENT:76 || TALENT:85) { // :8631
      await era.printAndWait(`「咕嗯噗呼…给予精液真是非常感谢♪　…啊嗯~~咕嗯~…请往小穴里将精液都射出来吧~~${heart(1)}」`); // :8632
    } else { // :8633
      await era.printAndWait(`「哈啊哈啊~…是的…${sc()}的小穴是免费的哦…不管射多少都没关系的~~~♪」`); // :8634
    } // :8635
    // CFLAG:656  = 1（变量语义：CFLAG 族，656） // :8636
    era.set(`cflag:${target}:656`, 1); // :8636
    // 狂王性欲処理 // :8637
  } else if (P == 7) { // :8638
    if (TALENT:76 || TALENT:85) { // :8639
      await era.printAndWait(`「哈啊~…啊嗯啊~…对不起魔王大人…${sc()}被狂王大人抱着…嗯~哈嗯~…♪」`); // :8640
      await era.printAndWait(`「成为了狂王大人的仆人了呢…${heart(1)} 啊啊~…${sc()}会…更多地侍奉狂王大人的~${heart(1)}」`); // :8641
      await era.printAndWait(`这样说着的${target_name}再次开始了对狂王的侍奉………`); // :8642
    } else { // :8643
      await era.printAndWait(`「啊啊~…狂王大人~…感觉舒服吗~~？ 嗯哼哼~~……${sc()}会让狂热大人更加舒服起来的呀~~~~♪」`); // :8644
    } // :8645
    // CFLAG:657  = 1（变量语义：CFLAG 族，657） // :8646
    era.set(`cflag:${target}:657`, 1); // :8646
    // NTR公開出産 // :8647
  } else if (P == 20) { // :8648
    if (TALENT:76 || TALENT:85) { // :8649
      if (CFLAG:102 == 1) { // :8650
        await era.printAndWait(`「不要啊！那个人的孩子！快回去！快回去啦！」`); // :8651
      } else { // :8652
        await era.printAndWait(`「呜呜呜…被做了这种事情，${sc()}已经…呜呜呜」`); // :8653
      } // :8654
    } else { // :8655
      await era.printAndWait(`「${sc()}连肚子的里面都是狂王大人的东西了呀~…啊啊~♪」`); // :8656
    } // :8657
  } // :8658
  return 0; // :8659

  // ----------------------------------- // :8661

// @EXUCUTION_KOUJO_K3 // :8662
function EXUCUTION_KOUJO_K3() {
  // ----------------------------------- // :8663
  // 肉便器刑 // :8664
  if (TFLAG:16 == 4) { // :8665
    await era.printAndWait(`「哈啊！${sc()}居然成为了怪物的慰安妇什么的…啊…不要…不要啊啊~！」`); // :8666
    // 戦闘員化 // :8667
  } else if (TFLAG:16 == 5) { // :8668
    await era.printAndWait(`「${sc()}在…${sc()}在消失着………」`); // :8669
    // 晒し台刑 // :8670
  } else if (TFLAG:16 == 6) { // :8671
    await era.printAndWait(`「只要能忍受地了真的就能解放${sc()}了对吧？」`); // :8672
    // 記憶を消して解放する // :8673
  } else if (TFLAG:16 == 7) { // :8674
    await era.printAndWait(''); // :8675
  } // :8676

  // ----------------------------------- // :8678

// @MUSEUM_KOUJO_K3 // :8679
function MUSEUM_KOUJO_K3() {
  // ----------------------------------- // :8680
  // 石化 // :8681
  if (TFLAG:500 == 0) { // :8682
    await era.printAndWait(`「把${sc()}变成石头当装饰什么的…真是…十分地恶趣味啊………」`); // :8683
    // 剥製化 // :8684
  } else if (TFLAG:500 == 1) { // :8685
    await era.printAndWait(`「到这种地方来才不是为了被剥制的啊！」`); // :8686
    // 蝋人形化 // :8687
  } else if (TFLAG:500 == 2) { // :8688
    await era.printAndWait(''); // :8689
    // 人形化(マネキン) // :8690
  } else if (TFLAG:500 == 3) { // :8691
    await era.printAndWait(`「很、很让人害羞的啊…快点结束本小姐这种耻辱的…」`); // :8692
    // 人形化(球体間接) // :8693
  } else if (TFLAG:500 == 4) { // :8694
    await era.printAndWait(`「让尊贵的${sc()}、变成人偶…哪、哪里…搞、错……了……吧…啊…」`); // :8695
    // 金属化 // :8696
  } else if (TFLAG:500 == 5) { // :8697
    await era.printAndWait(''); // :8698
    // 氷像化 // :8699
  } else if (TFLAG:500 == 6) { // :8700
    await era.printAndWait(''); // :8701
    // 宝石化 // :8702
  } else if (TFLAG:500 == 7) { // :8703
    await era.printAndWait(''); // :8704
    // 家具化 // :8705
  } else if (TFLAG:500 == 8) { // :8706
    await era.printAndWait(''); // :8707
    // 絵画封印 // :8708
  } else if (TFLAG:500 == 9) { // :8709
    await era.printAndWait(''); // :8710
  } // :8711

  // ----------------------------------- // :8713

// @BANISHMENT_KOUJO_K3 // :8714
function BANISHMENT_KOUJO_K3() {
  // 処刑内容はBANISHMENT.ERBを参照してください。 // :8715
  // ----------------------------------- // :8716
  // 追放 // :8717
  if (TFLAG:510 == 0) { // :8718
    await era.printAndWait(`${sc()}的…${sc()}的力量…完全…没有了啊………」`); // :8719
    // 男体化 // :8720
  } else if (TFLAG:510 == 1) { // :8721
    await era.printAndWait(''); // :8722
    // 記憶消去 // :8723
  } else if (TFLAG:510 == 2) { // :8724
    await era.printAndWait(''); // :8725
    // 小動物化 // :8726
  } else if (TFLAG:510 == 3) { // :8727
    await era.printAndWait(''); // :8728
    // 元の生活に戻す // :8729
  } else if (TFLAG:510 == 4) { // :8730
    await era.printAndWait(''); // :8731
  } // :8732

  // ----------------------------------- // :8734

// @PUBLIC_EXUCUTION_KOUJO_K3 // :8735
function PUBLIC_EXUCUTION_KOUJO_K3() {
  // 処刑内容はPUBLIC_EXUCUTION.ERBを参照してください。 // :8736
  // ----------------------------------- // :8737
  // 陵辱処刑 // :8738
  if (TFLAG:520 == 0) { // :8739
    await era.printAndWait(`「已经…什么都…感觉不到了…啊…啊啊啊啊…${sc()}的…噶………咳咳」`); // :8740
    // 絞首刑 // :8741
  } else if (TFLAG:520 == 1) { // :8742
    await era.printAndWait(`「这样终于能轻松了呢………」`); // :8743
    // 魂粉砕 // :8744
  } else if (TFLAG:520 == 2) { // :8745
    await era.printAndWait(''); // :8746
  } // :8747

  // ----------------------------------- // :8749

// @GROTESQUE_KOUJO_K3 // :8750
function GROTESQUE_KOUJO_K3() {
  // 内容はGROTESQUE.ERBを参照してください。 // :8751
  // ----------------------------------- // :8752
  // 四肢切断刑 // :8753
  if (TFLAG:530 == 0) { // :8754
    await era.printAndWait(''); // :8755
    // 内臓陵辱刑 // :8756
  } else if (TFLAG:530 == 1) { // :8757
    await era.printAndWait(''); // :8758
    // ギロチン刑 // :8759
  } else if (TFLAG:530 == 2) { // :8760
    await era.printAndWait(''); // :8761
    // 火あぶりの刑 // :8762
  } else if (TFLAG:530 == 3) { // :8763
    await era.printAndWait(''); // :8764
    // 食肉刑 // :8765
  } else if (TFLAG:530 == 4) { // :8766
    await era.printAndWait(''); // :8767
    // 死霊化 // :8768
  } else if (TFLAG:530 == 5) { // :8769
    await era.printAndWait(''); // :8770
    // ゾンビ化 // :8771
  } else if (TFLAG:530 == 6) { // :8772
    await era.printAndWait(''); // :8773
  } // :8774

  // ----------------------------------- // :8776

// @ENTERENEMY_KOUJO_K3 // :8777
function ENTERENEMY_KOUJO_K3() {
  // ----------------------------------- // :8778
  // ダンジョン攻略開始時 // :8779
  if (TALENT:A:21 == 1 || TALENT:A:22 == 1) { // :8780
    // 冷漠・感情淡薄なら何か言って終了 // :8781
    await era.printAndWait(`「………%SELF_CALL(A)%会打倒魔王的」`); // :8782
  } else if (TALENT:A:11 == 1 || TALENT:A:12 == 1 || TALENT:A:15 == 1 || TALENT:A:30 == 1 || TALENT:A:34 == 1) { // :8783
    // 反抗的・気丈・プライド高い・貞操観念・抵抗 // :8784
    await era.printAndWait(`「噢吼～吼吼吼！魔王什么的%SELF_CALL(A)%用一根手指头就能打败给你看~！」`); // :8785
  } else if (TALENT:A:10 == 1 || TALENT:A:26 == 1) { // :8786
    // 臆病・悲観的 // :8787
    await era.printAndWait(`「%SELF_CALL_FIRST(A)%、只凭%SELF_CALL(A)%真的能将魔王给打倒吗…？」`); // :8788
  } else { // :8789
    // その他何か適当に性格によって // :8790
    await era.printAndWait(`「%SELF_CALL(A)%绝对不会输给…魔王什么的！！」`); // :8791
  } // :8792

  // ----------------------------------- // :8794

// @GOHOUBI_REQUEST_KOUJO_K3 // :8795
function GOHOUBI_REQUEST_KOUJO_K3() {
  // ----------------------------------- // :8796
  // 迎撃時のご褒美要求 // :8797
  if (CFLAG:A:504 == 0) { // :8798
    // お金 // :8799
    await era.printAndWait(`「%SELF_CALL(A)%想要钱当报酬的说」`); // :8800
  } else if (CFLAG:A:504 == 1 || CFLAG:A:504 == 2 || CFLAG:A:504 == 3) { // :8801
    // 兽奸要求 // :8802
    await era.print(`「%SELF_CALL(A)%…这场战斗完后想要跟…`); // :8803
    if (CFLAG:A:504 == 1) { // :8804
      await era.print(`狗`); // :8805
    } else if (CFLAG:A:504 == 2) { // :8806
      await era.print(`猪`); // :8807
    } else if (CFLAG:A:504 == 3) { // :8808
      await era.print(`马`); // :8809
    } // :8810
    await era.printAndWait(`交配想得受不了了~…！」`); // :8811
  } else if (CFLAG:A:504 == 4) { // :8812
    // キス // :8813
    await era.printAndWait(`「如果打倒了勇者的话…请给%SELF_CALL(A)%亲吻当奖品吧~~~」`); // :8814
  } else if (CFLAG:A:504 == 5) { // :8815
    // セックス // :8816
    await era.printAndWait(`「回来了，请让%SELF_CALL(A)%火热的身体平静下来吧~~」`); // :8817
  } else if (CFLAG:A:504 == 6) { // :8818
    // ザーメン // :8819
    await era.printAndWait(`「请为%SELF_CALL(A)%保存着多多的精液吧~~」`); // :8820
  } else if (CFLAG:A:504 == 7) { // :8821
    // 乱交 // :8822
    await era.printAndWait(`「%SELF_CALL(A)%期待着为了%SELF_CALL(A)%而展开的性交派对哦~」`); // :8823
  } else if (CFLAG:A:504 == 8) { // :8824
    // 小水 // :8825
    await era.printAndWait(`「能治愈%SELF_CALL(A)%战后的饥渴…只有魔王大人的小便哦」`); // :8826
  } else if (CFLAG:A:504 == 9) { // :8827
    // 童貞狩り // :8828
    await era.printAndWait(`「童贞的大鸡巴…作为胜利的报酬是不是很好呀~？」`); // :8829
  } // :8830

  // ----------------------------------- // :8832

// @GOHOUBI_AFTER_KOUJO_K3 // :8833
function GOHOUBI_AFTER_KOUJO_K3() {
  // ----------------------------------- // :8834
  // 迎撃成功時 // :8835
  // DUNGEON_AFTER.ERBを参照 // :8836

  // 放置PLAY // :8838
  if (TFLAG:18 == 0) { // :8839
    await era.printAndWait(`「难得%SELF_CALL(A)%…什，什么都没有啦」`); // :8840
    // 勲章授与 // :8841
  } else if (TFLAG:18 == 1) { // :8842
    await era.printAndWait(`「哼哼哼~、要得到多少个勋章才能给%SELF_CALL(A)%奖赏呢~？」`); // :8843
  } else if (TFLAG:18 == 2) { // :8844
    // お金を渡す // :8845
    if (CFLAG:A:504 == 0) { // :8846
      await era.printAndWait(`「非常地感谢。那个…这个钱%SELF_CALL(A)%想要送回老家可以吗………」`); // :8847
      // 犬と兽奸 // :8848
    } else if (CFLAG:A:504 == 1) { // :8849
      // 处女 // :8850
      if (TALENT:A:0 == 1) { // :8851
        await era.printAndWait(`「哈嗯呜~！%SELF_CALL(A)%是最喜欢跟狗狗肛交的变态来的~${heart(1)}」`); // :8852
      } else { // :8853
        await era.printAndWait(`「哈嗯呜~！%SELF_CALL(A)%是最喜欢和狗狗做爱的变态来的~${heart(1)}」`); // :8854
      } // :8855
      // 豚と兽奸 // :8856
    } else if (CFLAG:A:504 == 2) { // :8857
      // 处女 // :8858
      if (TALENT:A:0 == 1) { // :8859
        await era.printAndWait(`「哈啊嗯呜~！%SELF_CALL(A)%是最喜欢跟猪肛交的大变态来的~${heart(1)}」`); // :8860
      } else { // :8861
        await era.printAndWait(`「哈啊嗯哈~！%SELF_CALL(A)%是最喜欢跟猪做H的事情的变态来的~~${heart(1)}」`); // :8862
      } // :8863
      // 馬と兽奸 // :8864
    } else if (CFLAG:A:504 == 3) { // :8865
      // 处女 // :8866
      if (TALENT:A:0 == 1) { // :8867
        await era.printAndWait(`「啊呜啊嗯呜呜~~~！%SELF_CALL(A)%是最喜欢跟马肛交的大变态来的~~${heart(1)}」`); // :8868
      } else { // :8869
        await era.printAndWait(`「啊呜啊嗯呜呜~~~！%SELF_CALL(A)%是最喜欢跟马SEX的大变态来的${heart(1)}」`); // :8870
      } // :8871
      // キス // :8872
    } else if (CFLAG:A:504 == 4) { // :8873
      await era.printAndWait(`，今天的KISS十分地甜蜜呢`); // :8874
      // セックス // :8875
    } else if (CFLAG:A:504 == 5) { // :8876
      // 膣とペニス // :8877
      if (ABL:A:2 > ABL:A:3) { // :8878
        await era.printAndWait(`「奖励SEX最棒了~…啊啊嗯~~~！啊嗯~~~…请给%SELF_CALL(A)%更多的SEX吧~~！」`); // :8879
        // アナルとペニス // :8880
      } else { // :8881
        await era.printAndWait(`「啊嗯~~！肛交SEX好棒，好舒服啊嗯~${heart(1)}」`); // :8882
      } // :8883
      // ザーメン // :8884
    } else if (CFLAG:A:504 == 6) { // :8885
      await era.printAndWait(`「精液对于%SELF_CALL(A)%是最棒的奖励来的呀~~${heart(1)}」`); // :8886
      // 乱交 // :8887
    } else if (CFLAG:A:504 == 7) { // :8888
      // 处女 // :8889
      if (TALENT:A:0 == 1) { // :8890
        await era.printAndWait(`「啊、啊啊啊嗯~~…乱交派对真是太棒了呀~~…${heart(1)}」`); // :8891
      } else { // :8892
        await era.printAndWait(`「啊、啊哈啊嗯~…乱交派对真是最棒的呀~~~…${heart(1)}」`); // :8893
      } // :8894
      // おしっこ // :8895
    } else if (CFLAG:A:504 == 8) { // :8896
      await era.printAndWait(`「咕嗯~咕嗯~呜哼~…谢谢魔王大人~魔王大人的小便好好喝的说~♪」`); // :8897
      // 童貞狩り // :8898
    } else if (CFLAG:A:504 == 9) { // :8899
      // 膣 // :8900
      if (ABL:A:2 > ABL:A:3) { // :8901
        await era.printAndWait(`「啊啊~~…童真狩猎要变成癖好了呀~~♪」`); // :8902
        // アナル // :8903
      } else { // :8904
        await era.printAndWait(`「呜哼哼~~、想要塞进小穴那里是吧~？　真是残念呢、小穴那是属于魔王大人的东西来的~♪」`); // :8905
      } // :8906
    } else { // :8907
    } // :8908
  } // :8909
  // ------------------------------ // :8910

// @OSIOKI_KOUJO_K3 // :8911
function OSIOKI_KOUJO_K3() {
  // ----------------------------- // :8912
  // 迎撃失敗時のおしおき // :8913
  // DUNGEON_AFTER.ERBを参照 // :8914

  // 放置PLAY // :8916
  if (TFLAG:18 == 0) { // :8917
    await era.printAndWait(`「得、得救了呀………」`); // :8918
    // 弱電気椅子刑 // :8919
  } else if (TFLAG:18 == 1) { // :8920
    // 受虐狂っ気Lv3以上 // :8921
    if (ABL:A:21 >= 3) { // :8922
      await era.printAndWait(`「哔哩哔哩地！啊~~哈啊~~~！哔哩~${heart(1)}」`); // :8923
    } else { // :8924
      await era.printAndWait(`「不，不要啊~~~！电什么的不要啊！啊哇哇哇哇哇」`); // :8925
    } // :8926
    // 路上自慰刑 // :8927
  } else if (TFLAG:18 == 2) { // :8928
    // 露出癖Lv4以上 // :8929
    if (ABL:A:17 >= 4) { // :8930
      await era.printAndWait(`「请看着%SELF_CALL(A)%的自慰来好好地撸一发吧~~♪　啊，触碰可是严禁的噢」`); // :8931
    } else { // :8932
      await era.printAndWait(`「啊、啊啊啊…在那么多人的面前自慰什么的…脑袋好像要沸腾一样了………」`); // :8933
    } // :8934
    // 路上脱糞刑 // :8935
  } else if (TFLAG:18 == 3) { // :8936
    // 露出癖Lv6以上 // :8937
    if (ABL:A:17 >= 6) { // :8938
      await era.printAndWait(`「哦吼吼…在被大家注目着自慰什么，真是受不了啊~${heart(1)}」`); // :8939
    } else { // :8940
      await era.printAndWait(`「“长着一张好脸蛋，出来的味道连鼻子都要臭歪了什么的”…好过分、好过分啊………」`); // :8941
    } // :8942
    // 鞭打ち刑 // :8943
  } else if (TFLAG:18 == 4) { // :8944
    // 受虐狂っ気Lv3以上 // :8945
    if (ABL:A:21 >= 3) { // :8946
      await era.printAndWait(`「啊哈嗯呜~~！请用鞭子将%SELF_CALL(A)%打到气绝为止吧~~${heart(1)}」`); // :8947
    } else { // :8948
      await era.printAndWait(`「已经不要了啊~！不要再打了啊啊！」`); // :8949
    } // :8950
    // 人間小便器刑 // :8951
  } else if (TFLAG:18 == 5) { // :8952
    // 受虐狂or淫乱 // :8953
    if (TALENT:A:88 == 1 || TALENT:A:76 == 1) { // :8954
      await era.printAndWait(`「哈呼嗯~、哼嗯~…小便对脸蛋是有美容效果的噢、所以请往%SELF_CALL(A)%的脸上尿尿吧~♪」`); // :8955
    } else { // :8956
      await era.printAndWait(`「呜噗嗯…呜嗯…咕嗯…呜呜呜…不要…不要了啊………」`); // :8957
    } // :8958
    // トイレ掃除刑 // :8959
  } else if (TFLAG:18 == 6) { // :8960
    await era.printAndWait(`「为什么要让%SELF_CALL(A)%做这样的…」`); // :8961
    // ご飯抜き刑 // :8962
  } else if (TFLAG:18 == 7) { // :8963
    await era.printAndWait(`「不吃饭的话就没有力气了啊………」`); // :8964
    // 媚薬放置刑 // :8965
  } else if (TFLAG:18 == 8) { // :8966
    await era.printAndWait(`「已经，已经忍不住了啊！拜托了啊！不管是谁都可以啊！请，请给我大鸡巴吧！」`); // :8967
    // 未定 // :8968
  } else if (TFLAG:18 == 9) { // :8969
    await era.printAndWait(`「啊呜呃嗯啊～不要啊～」`); // :8970
  } // :8971

  // ------------------------------ // :8973

// @GOBI_KOUJO_K3, ARG:0 // :8974
function GOBI_KOUJO_K3() {
  // ----------------------------- // :8975

  if (ARG:0 == 1) { // :8977
    // 喜んで誇らしげに // :8978
    await era.print(`的噢~♪`); // :8979
  } else if (ARG:0 == 2) { // :8980
    // 怒って // :8981
    await era.print(`的啊！`); // :8982
  } else if (ARG:0 == 3) { // :8983
    // 悲しんで // :8984
    await era.print(`来着……。`); // :8985
  } else if (ARG:0 == 4) { // :8986
    // 恥ずかしそうに // :8987
    await era.print(`来的……呢~。`); // :8988
  } else if (ARG:0 == 5) { // :8989
    // 情けなさそうに // :8990
    await era.print(`的噢……呜~。`); // :8991
  } else { // :8992
    // デフォルト // :8993
    // ARG:0==0を含む // :8994
    if (RAND:3 == 0) { // :8995
      await era.print(`的说。`); // :8996
    } else if (RAND:2 == 0) { // :8997
      await era.print(`噢。`); // :8998
    } else { // :8999
      await era.print(`噢。`); // :9000
    } // :9001
  } // :9002





}

// ===== 复核清单（转译器生成，agent 逐条处理后删除） =====
// 1. :95 同名函数 @EVENTTRAIN 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTTRAIN', …) 注册，参照 ere/kojo/kojo-k5.js
// 2. :398 CALL K3_KOJO2 —— 口上文件里多为存根调用，人工定存根名
// 3. :415 未知语句 SETCOLOR 255,204,255
// 4. :417 未知语句 RESETCOLOR
// 5. :423 未知语句 SETCOLOR 255,204,255
// 6. :425 未知语句 RESETCOLOR
// 7. :434 未知语句 SETCOLOR 255,204,255
// 8. :436 未知语句 RESETCOLOR
// 9. :439 未知语句 SETCOLOR 255,204,255
// 10. :441 未知语句 RESETCOLOR
// 11. :445 未知语句 SETCOLOR 255,204,255
// 12. :447 未知语句 RESETCOLOR
// 13. :450 未知语句 SETCOLOR 255,204,255
// 14. :452 未知语句 RESETCOLOR
// 15. :458 未知语句 SETCOLOR 255,204,255
// 16. :460 未知语句 RESETCOLOR
// 17. :462 未知语句 SETCOLOR 255,204,255
// 18. :464 未知语句 RESETCOLOR
// 19. :473 未知语句 SETCOLOR 255,204,255
// 20. :475 未知语句 RESETCOLOR
// 21. :482 未知语句 SETCOLOR 255,204,255
// 22. :484 未知语句 RESETCOLOR
// 23. :487 未知语句 SETCOLOR 255,204,255
// 24. :489 未知语句 RESETCOLOR
// 25. :494 未知语句 SETCOLOR 255,204,255
// 26. :496 未知语句 RESETCOLOR
// 27. :497 未知语句 SETCOLOR 255,204,255
// 28. :499 未知语句 RESETCOLOR
// 29. :510 未知语句 SETCOLOR 255,204,255
// 30. :512 未知语句 RESETCOLOR
// 31. :517 未知语句 SETCOLOR 255,204,255
// 32. :519 未知语句 RESETCOLOR
// 33. :525 未知语句 SETCOLOR 255,204,255
// 34. :527 未知语句 RESETCOLOR
// 35. :595 CALL K3_KOJO2 —— 口上文件里多为存根调用，人工定存根名
// 36. :790 同名函数 @EVENTEND 重复定义（ERB 事件函数可多重定义）——JS 侧需改 on('EVENTEND', …) 注册，参照 ere/kojo/kojo-k5.js
// 37. :890 CALL COLOSSEUM_KOJO_3 —— 口上文件里多为存根调用，人工定存根名
// 38. :904 CALL DOG_KOJO_3 —— 口上文件里多为存根调用，人工定存根名
// 39. :1013 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
// 40. :1160 变量语义 P = PALAM:3 + UP:3 —— 局部/自定义变量，人工映射
// 41. :2475 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
// 42. :2635 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
// 43. :3184 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
// 44. :4538 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 45. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 46. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 47. :4539 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 48. :4540 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 49. :4540 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 50. :4541 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 51. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 52. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 53. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 54. :4544 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 55. :4545 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 56. :4545 插值 未知插值 %SELF_CALL(TARGET,5)% —— 保真锁会红，须人工定归一
// 57. :4545 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 58. :4546 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 59. :4546 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 60. :4549 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 61. :4549 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 62. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 63. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 64. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 65. :4550 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 66. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 67. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 68. :4551 插值 未知插值 %SELF_CALL(TARGET,3)% —— 保真锁会红，须人工定归一
// 69. :4551 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 70. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 71. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 72. :4555 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 73. :4556 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 74. :4556 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 75. :4560 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 76. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 77. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 78. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 79. :4561 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 80. :4584 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 81. :4600 假名残留 归一后仍含日文假名：っ —— 查 lang-table 是否应收
// 82. :4650 未知语句 REPEAT CHARANUM
// 83. :4653 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 84. :4661 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 85. :4662 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 86. :4664 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 87. :4665 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 88. :4665 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 89. :4667 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 90. :4667 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 91. :4668 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 92. :4673 未知语句 REND
// 93. :4677 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 94. :4677 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 95. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 96. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 97. :4679 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 98. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 99. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 100. :4681 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 101. :4686 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 102. :4688 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 103. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 104. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 105. :4690 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 106. :4696 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 107. :4696 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 108. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 109. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 110. :4698 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 111. :4743 未知语句 REPEAT CHARANUM
// 112. :4763 未知语句 REND
// 113. :4790 未知语句 REPEAT CHARANUM
// 114. :4797 未知语句 REND
// 115. :4822 未知语句 REPEAT CHARANUM
// 116. :4829 未知语句 REND
// 117. :5225 插值 未知插值 %SELF_CALL(TARGET, 1)% —— 保真锁会红，须人工定归一
// 118. :6671 变量语义 LOCAL = TALENT:320 —— 局部/自定义变量，人工映射
// 119. :6673 变量语义 LOCAL:1 = LOCAL % 10 —— 局部/自定义变量，人工映射
// 120. :6675 变量语义 LOCAL:3 = LOCAL % 1000 —— 局部/自定义变量，人工映射
// 121. :6676 变量语义 LOCAL:3 / = 100 —— 局部/自定义变量，人工映射
// 122. :6678 变量语义 LOCAL:4 = LOCAL % 10000 —— 局部/自定义变量，人工映射
// 123. :6679 变量语义 LOCAL:4 / = 1000 —— 局部/自定义变量，人工映射
// 124. :6681 变量语义 LOCAL:5 = LOCAL % 1000000 —— 局部/自定义变量，人工映射
// 125. :6682 变量语义 LOCAL:5 / = 100000 —— 局部/自定义变量，人工映射
// 126. :6684 变量语义 LOCAL:6 = LOCAL % 10000000 —— 局部/自定义变量，人工映射
// 127. :6685 变量语义 LOCAL:6 / = 1000000 —— 局部/自定义变量，人工映射
// 128. :6687 变量语义 LOCAL:7 = LOCAL % 100000000 —— 局部/自定义变量，人工映射
// 129. :6688 变量语义 LOCAL:7 / = 10000000 —— 局部/自定义变量，人工映射
// 130. :6690 变量语义 LOCAL:8 = LOCAL % 1000000000 —— 局部/自定义变量，人工映射
// 131. :6691 变量语义 LOCAL:8 / = 100000000 —— 局部/自定义变量，人工映射
// 132. :6693 变量语义 LOCAL:9 = LOCAL:5 + LOCAL:6 + LOCAL:7 + LOCAL:8 —— 局部/自定义变量，人工映射
// 133. :7104 变量语义 P = PALAM:3 + UP:3 —— 局部/自定义变量，人工映射
// 134. :7135 变量语义 P = PALAM:5 + UP:5 —— 局部/自定义变量，人工映射
// 135. :7166 变量语义 P = PALAM:8 + UP:8 —— 局部/自定义变量，人工映射
// 136. :7183 变量语义 P = PALAM:10 + UP:10 —— 局部/自定义变量，人工映射
// 137. :7246 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 138. :7246 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 139. :7247 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 140. :7247 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 141. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 142. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 143. :7248 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 144. :7290 插值 未知插值 %SELF_CALL(TARGET,4)% —— 保真锁会红，须人工定归一
// 145. :7296 插值 未知插值 %UNICODE(0x2764) *1% —— 保真锁会红，须人工定归一
// 146. :7326 变量语义 A = UP:11 + UP:12 —— 局部/自定义变量，人工映射
// 147. :7672 CALL SELL_MATURO_K0 —— 口上文件里多为存根调用，人工定存根名
// 148. :7692 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
// 149. :7697 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
// 150. :7728 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
// 151. :7733 插值 未知插值 %CSTR:2% —— 保真锁会红，须人工定归一
// 152. :8086 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 153. :8087 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 154. :8105 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 155. :8106 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 156. :8125 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 157. :8126 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 158. :8127 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 159. :8145 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 160. :8146 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 161. :8147 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 162. :8165 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 163. :8166 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 164. :8167 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 165. :8185 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 166. :8186 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 167. :8187 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 168. :8206 CALL BENKI_PLAYER_NAME —— 口上文件里多为存根调用，人工定存根名
// 169. :8207 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 170. :8208 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 171. :8209 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 172. :8209 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 173. :8228 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 174. :8230 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 175. :8249 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 176. :8251 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 177. :8270 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 178. :8272 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 179. :8782 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 180. :8785 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 181. :8788 插值 未知插值 %SELF_CALL_FIRST(A)% —— 保真锁会红，须人工定归一
// 182. :8788 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 183. :8791 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 184. :8800 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 185. :8803 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 186. :8814 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 187. :8817 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 188. :8820 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 189. :8823 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 190. :8823 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 191. :8826 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 192. :8840 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 193. :8843 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 194. :8847 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 195. :8852 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 196. :8854 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 197. :8860 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 198. :8862 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 199. :8868 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 200. :8870 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 201. :8879 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 202. :8886 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 203. :8931 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 204. :8947 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 205. :8955 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 206. :8961 插值 未知插值 %SELF_CALL(A)% —— 保真锁会红，须人工定归一
// 207. :8974 函数参数 @GOBI_KOUJO_K3, ARG:0 —— 参数声明已剥（JS 函数签名人工定）
